---
template: "post"
title: "Setting Up a Self-hosted Windows Agent on Azure Pipelines for Flutter Desktop: 10 Errors and How to Fix Them"
date: 2026-10-26T17:00:00+07:00
author: letrungdo
slug: "azure-pipelines-self-hosted-windows-agent-flutter"
cover: "../../images/2026/10/azure-self-hosted-agent-cover.png"
categories:
  - Dev
tags:
  - Azure DevOps
  - CI/CD
  - Flutter
  - Windows
  - DevOps
---

Our Flutter Desktop app (Windows, packaged as **MSIX**) was built on **Microsoft-hosted agents** in Azure Pipelines. That works fine until the bill arrives: every hosted parallel job costs **$40/month**, and the free minutes are shared across every project in the organization. Once other projects have used them up, every build has to be paid for.

A **self-hosted agent** is a different deal: you run the build on your own Windows machine, there is **no per-minute charge**, the first self-hosted parallel job is **free** (each extra one is $15/month), and Flutter, NuGet and pub caches stay on disk between builds.

The catch: a pipeline written for hosted agents assumes many things that are not true on a fresh Windows machine. This post lists the 10 errors I hit while moving a real Flutter Windows pipeline (Classic editor + task groups) to a self-hosted agent, in the order they appeared, with the fix for each.

---

## 1. "I added the agent but can't select it in the pipeline"

In a Classic pipeline, the **Agent pool** dropdown lets you pick a **pool**, not an individual agent. If your new agent is in the `Default` pool, select `Default`, and the pool picks the agent for you.

If the job still goes to a hosted machine, check:

- **Agent job → Agent pool**: the job-level setting overrides the pipeline-level one. It should be `<inherit from pipeline>` or `Default`, not `Azure Pipelines`.
- **Pin a specific agent** with a demand on the job: `Agent.Name equals <your-agent-name>`.
- **Pool permissions**: *Project Settings → Agent pools → Default → Security → Pipeline permissions*. On the first run you may also need to click **Permit** on the run page.

---

## 2. `No agent found in pool Default which satisfies the specified demands: sh`

```
##[error]No agent found in pool Default which satisfies the specified demands: sh, Agent.Version -gtVersion 2.182.1
```

A **Shell Script** task (`ShellScript@2`) demands the capability `sh`. Even when `C:\Program Files\Git\bin` (which contains `sh.exe`) is in `PATH`, **the Windows agent does not scan for `sh`**: on Windows the agent only detects a fixed list of tools (git, npm, msbuild, Visual Studio…).

**Fix:** add it as a user capability.
*Agent pools → Default → (agent) → Capabilities → User capabilities → Add*:

| Name | Value |
|---|---|
| `sh` | `C:\Program Files\Git\bin\sh.exe` |

No restart is needed.

---

## 3. `mv : Could not find a part of the path` (hard-coded `C:\hostedtoolcache`)

```
mv -Force "windows-x64-release\*" "C:\hostedtoolcache\windows\Flutter\$(FlutterVersion)\windows\flutter\bin\cache\artifacts\engine\windows-x64-release\"
```

We replace the Flutter engine with a custom build. The script hard-coded the hosted tool cache path, but on a self-hosted agent the **Flutter Install** task puts Flutter in the agent's own tools directory (`C:\agent\_work\_tool`).

**Fix:** use the predefined variable. On hosted agents it resolves to `C:\hostedtoolcache\windows`, so the same script works on both:

```powershell
mv -Force "windows-x64-release\*" "$(Agent.ToolsDirectory)\Flutter\$(FlutterVersion)\windows\flutter\bin\cache\artifacts\engine\windows-x64-release\"
```

> Search your scripts for `hostedtoolcache`. Every hit is a bug waiting for a self-hosted agent.

---

## 4. `No .NET SDKs were found`

```
The application 'restore' does not exist or is not a managed .dll or .exe.
No .NET SDKs were found.
```

A step restores the Windows App SDK NuGet packages with `dotnet restore` on a temporary `net8.0-windows` project. The machine had the .NET **runtime**, but not the **SDK**.

**Fix:**

```powershell
winget install Microsoft.DotNet.SDK.8
dotnet --list-sdks                         # must show 8.0.xxx
Get-Service vstsagent* | Restart-Service   # the agent reads PATH on start
```

(Alternatively, add a `UseDotNet@2` task, but on a long-lived machine installing it once is simpler and faster.)

---

## 5. Bash task runs WSL: `Windows Subsystem for Linux has no installed distributions`

```
C:\WINDOWS\system32\bash.exe -c pwd
Windows Subsystem for Linux has no installed distributions.
```

The **Bash** task (`Bash@3`) uses the first `bash` it finds in `PATH`. `C:\WINDOWS\system32` comes before `C:\Program Files\Git\bin`, so it picked **WSL's** `bash.exe` instead of Git Bash.

**Fix (only affects the agent):** create a `.path` file in the agent's root folder. The agent uses it as `PATH` for every job.

```powershell
$p = [Environment]::GetEnvironmentVariable('Path','Machine')
"C:\Program Files\Git\bin;$p" | Set-Content -NoNewline C:\agent\.path
Get-Service vstsagent* | Restart-Service
```

The log should now show `"C:\Program Files\Git\bin\bash.exe" -c pwd`.

> Side note: our CI script picks `fvm flutter` when FVM is installed. The build machine had FVM, so the analyze step started cloning a second Flutter SDK. That isn't an error, but it means a second, unpatched SDK. Guard it with `[ -z "$TF_BUILD" ]` if you want CI to always use the SDK from the Flutter Install task.

---

## 6. `could not lock config file C:/Program Files/Git/etc/gitconfig: Permission denied`

```
error: could not lock config file C:/Program Files/Git/etc/gitconfig: Permission denied
```

The build script starts with `git config --system core.longpaths true`. The agent service ran as **NetworkService**, which cannot write into `Program Files`. Because the script has no `set -e`, the build continued, but long paths stayed disabled, so it would have failed later with *Filename too long*.

**Fix:** set it once as Administrator, and enable Windows long paths too:

```powershell
git config --system core.longpaths true
New-ItemProperty -Path HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem `
  -Name LongPathsEnabled -Value 1 -PropertyType DWORD -Force
```

---

## 7. MSIX signing: `Exception calling ".ctor" with "2" argument(s): "Access denied."`

```
new-object : Exception calling ".ctor" with "2" argument(s): "Access denied."
#2  SignTool._getCertificateSubjectByFile (package:msix/src/sign_tool.dart:145:47)
```

The Windows app built fine, but `dart run msix:create` failed while reading the signing certificate. It calls `new X509Certificate2(<pfx>, <password>)`, which needs a **user key store** to load the private key into. **NetworkService** doesn't have a usable one.

**Fix:** run the agent service as a **real user account**: `services.msc` → *Azure Pipelines Agent (…)* → **Log On** → *This account*: `.\<user>` and that user's password.

Two traps:

- Use the account's **password**, not the Windows Hello **PIN**. For a Microsoft account, it's the Microsoft account password (passwordless accounts won't work; create a local user instead).
- Check the account name with `whoami` (e.g. `machine\user`, so enter `.\user`).

---

## 8. `Logon failure: the user has not been granted the requested logon type`

```
This service account does not have the required user right "Log on as a service."
```

Normally `services.msc` grants this right automatically. This time it didn't.

**Fix:** `secpol.msc` → *Local Policies → User Rights Assignment* → **Log on as a service** → add the user. Also make sure the user isn't listed under **Deny log on as a service**. Then start the service.

(On Windows Home, which has no `secpol.msc`, you can grant `SeServiceLogonRight` with `secedit`, or re-run `config.cmd --runAsService --windowsLogonAccount ...`, which grants it for you.)

---

## 9. `fatal: detected dubious ownership in repository`

```
fatal: detected dubious ownership in repository at 'C:/agent/_work/_tool/Flutter/3.29.3/windows/flutter'
'...' is owned by: NT AUTHORITY/NETWORK SERVICE
but the current user is: MACHINE/user
Error: Unable to determine engine version...
```

This comes from step 7. Everything under `_work` was created by NetworkService. Now that the agent runs as a different user, Git refuses to operate on repositories owned by someone else, and Flutter can't read its own engine version.

**Fix:** delete the cached SDK so it's re-installed under the new account, and take ownership of the rest:

```powershell
Remove-Item -Recurse -Force C:\agent\_work\_tool\Flutter
takeown /f C:\agent\_work /r /d y | Out-Null
icacls C:\agent\_work /setowner "MACHINE\user" /t /q
```

On a dedicated build box you can also run `git config --global --add safe.directory '*'` as the agent user.

> Lesson: **choose the service account before the first build.** Switching later costs you a cache wipe.

---

## 10. Hidden trap: `git apply` on a persistent SDK

Hosted agents start from a clean machine for every build. **Self-hosted agents keep the tool cache.** Our pipeline patches the Flutter SDK (`git apply cursor_spacing.diff`, `windows_pan_zoom.diff`). On the second build, the SDK is already patched and `git apply` fails with *patch does not apply*.

**Fix:** make the step idempotent:

```bash
git apply --reverse --check cursor_spacing.diff 2>/dev/null || git apply cursor_spacing.diff
git apply --reverse --check windows_pan_zoom.diff 2>/dev/null || git apply windows_pan_zoom.diff
```

If the reverse check passes, the patch is already in, so skip it; otherwise apply it. This works on hosted and self-hosted agents alike. (`mv -Force` for the engine swap is already idempotent.)

---

## Bonus: Windows Defender without turning it off

Turning off *Real-time protection* by hand doesn't last: Windows turns it back on after a while. Disabling it permanently needs Tamper Protection off plus a Group Policy, and it leaves a machine that holds your signing certificate unprotected.

The better option is **exclusions** for build folders and processes. Builds get almost as fast as with Defender off, and the exclusions persist:

```powershell
# Run as Administrator. Replace <user> with the agent's service account.
$paths = @(
  "C:\agent",
  "C:\Program Files\Git",
  "C:\Program Files\dotnet",
  "C:\Users\<user>\AppData\Local\Pub\Cache",
  "C:\Users\<user>\.nuget",
  "C:\Users\<user>\AppData\Local\NuGet",
  "C:\Users\<user>\AppData\Local\fvm",
  "C:\Users\<user>\AppData\Local\Temp"
)
$paths | ForEach-Object { Add-MpPreference -ExclusionPath $_ }

$procs = @(
  "dart.exe", "dartaotruntime.exe", "flutter.bat",
  "cmake.exe", "ninja.exe", "msbuild.exe", "cl.exe", "link.exe", "lib.exe",
  "dotnet.exe", "nuget.exe", "MakeAppx.exe", "signtool.exe",
  "git.exe", "bash.exe", "sh.exe", "Agent.Listener.exe", "Agent.Worker.exe"
)
$procs | ForEach-Object { Add-MpPreference -ExclusionProcess $_ }

Get-MpPreference | Select-Object -ExpandProperty ExclusionPath
```

Use `Get-MpPerformanceReport` if builds are still slow, to see what Defender is spending time on.

---

## Checklist: prepare the Windows machine before the first build

1. Install **Git for Windows**, **.NET SDK 8+**, **Visual Studio 2022** (Desktop development with C++), and **CMake** if needed.
2. Register the agent **as a service under a real user account** (not NetworkService), and grant **Log on as a service**.
3. Add the **`sh`** user capability.
4. Create **`C:\agent\.path`** with `C:\Program Files\Git\bin` first.
5. Run `git config --system core.longpaths true` and enable **LongPathsEnabled**.
6. Add **Defender exclusions**.
7. In the pipeline: replace `C:\hostedtoolcache` with **`$(Agent.ToolsDirectory)`**, and make every SDK-modifying step **idempotent**.

## Conclusion

None of these errors were hard to fix on their own. They come from one thing: **a hosted agent is a fresh, fully-equipped admin machine for every build, and a self-hosted agent is none of those.** It's missing tools, it runs under a restricted service account, and it keeps state between builds. If you plan for those three differences up front, the move takes an afternoon. In exchange you get builds that cost nothing per minute and run faster thanks to the warm caches.
