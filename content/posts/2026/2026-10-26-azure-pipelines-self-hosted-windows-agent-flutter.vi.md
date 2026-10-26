---
template: "post"
title: "Dựng Self-hosted Windows Agent trên Azure Pipelines cho Flutter Desktop: 10 lỗi gặp phải và cách sửa"
date: 2026-10-26T17:00:00+07:00
author: letrungdo
slug: "azure-pipelines-self-hosted-windows-agent-flutter"
lang: "vi"
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

App Flutter Desktop của mình (Windows, đóng gói **MSIX**) được build trên **Microsoft-hosted agent** của Azure Pipelines. Mọi thứ vẫn ổn cho tới lúc nhìn hóa đơn: mỗi parallel job hosted tốn **40$/tháng**, còn số phút miễn phí lại dùng chung cho mọi project trong organization. Khi các project khác đã dùng hết số phút đó thì mọi lần build đều phải trả tiền.

**Self-hosted agent** thì khác: bạn build trên máy Windows của chính mình, **không tính tiền theo phút**, parallel job self-hosted đầu tiên **miễn phí** (mỗi job thêm 15$/tháng), và cache của Flutter, NuGet, pub được giữ lại giữa các lần build.

Có một vấn đề: pipeline viết cho hosted agent mặc định rất nhiều thứ mà một máy Windows mới không có. Bài này tổng hợp 10 lỗi mình gặp khi chuyển một pipeline Flutter Windows thực tế (Classic editor + task group) sang self-hosted agent, theo đúng thứ tự xuất hiện, kèm cách sửa từng lỗi.

---

## 1. "Đã thêm agent nhưng không chọn được trong pipeline"

Trong Classic pipeline, dropdown **Agent pool** chỉ cho chọn **pool**, không chọn được từng agent. Nếu agent mới nằm trong pool `Default` thì chọn `Default`, pool sẽ tự phân job cho agent.

Nếu job vẫn chạy trên máy hosted, kiểm tra:

- **Agent job → Agent pool**: cài đặt ở cấp job ghi đè cài đặt ở cấp pipeline. Phải để `<inherit from pipeline>` hoặc `Default`, không được là `Azure Pipelines`.
- **Ghim một agent cụ thể** bằng demand trên job: `Agent.Name equals <tên-agent>`.
- **Quyền dùng pool**: *Project Settings → Agent pools → Default → Security → Pipeline permissions*. Ở lần chạy đầu có thể phải bấm **Permit** trên trang run.

---

## 2. `No agent found in pool Default which satisfies the specified demands: sh`

```
##[error]No agent found in pool Default which satisfies the specified demands: sh, Agent.Version -gtVersion 2.182.1
```

Task **Shell Script** (`ShellScript@2`) yêu cầu capability `sh`. Kể cả khi `PATH` đã có `C:\Program Files\Git\bin` (chứa `sh.exe`), **agent trên Windows vẫn không quét `sh`**: trên Windows, agent chỉ dò một danh sách tool cố định (git, npm, msbuild, Visual Studio…).

**Cách sửa:** thêm user capability.
*Agent pools → Default → (agent) → Capabilities → User capabilities → Add*:

| Name | Value |
|---|---|
| `sh` | `C:\Program Files\Git\bin\sh.exe` |

Không cần khởi động lại agent.

---

## 3. `mv : Could not find a part of the path` (đường dẫn `C:\hostedtoolcache` bị viết cứng)

```
mv -Force "windows-x64-release\*" "C:\hostedtoolcache\windows\Flutter\$(FlutterVersion)\windows\flutter\bin\cache\artifacts\engine\windows-x64-release\"
```

Pipeline thay Flutter engine bằng bản build riêng. Script viết cứng đường dẫn tool cache của máy hosted, nhưng trên self-hosted agent, task **Flutter Install** cài Flutter vào thư mục tool của agent (`C:\agent\_work\_tool`).

**Cách sửa:** dùng biến có sẵn. Trên máy hosted, biến này có giá trị `C:\hostedtoolcache\windows`, nên cùng một script chạy được trên cả hai loại máy:

```powershell
mv -Force "windows-x64-release\*" "$(Agent.ToolsDirectory)\Flutter\$(FlutterVersion)\windows\flutter\bin\cache\artifacts\engine\windows-x64-release\"
```

> Tìm `hostedtoolcache` trong các script của bạn. Chỗ nào xuất hiện thì chỗ đó sẽ lỗi khi chuyển sang self-hosted.

---

## 4. `No .NET SDKs were found`

```
The application 'restore' does not exist or is not a managed .dll or .exe.
No .NET SDKs were found.
```

Một step restore gói NuGet của Windows App SDK bằng `dotnet restore` trên một project tạm `net8.0-windows`. Máy có .NET **runtime** nhưng chưa có **SDK**.

**Cách sửa:**

```powershell
winget install Microsoft.DotNet.SDK.8
dotnet --list-sdks                         # phải có dòng 8.0.xxx
Get-Service vstsagent* | Restart-Service   # agent chỉ đọc PATH lúc khởi động
```

(Cũng có thể thêm task `UseDotNet@2`, nhưng với máy dùng lâu dài thì cài sẵn một lần sẽ gọn và nhanh hơn.)

---

## 5. Task Bash gọi nhầm WSL: `Windows Subsystem for Linux has no installed distributions`

```
C:\WINDOWS\system32\bash.exe -c pwd
Windows Subsystem for Linux has no installed distributions.
```

Task **Bash** (`Bash@3`) dùng file `bash` đầu tiên tìm thấy trong `PATH`. `C:\WINDOWS\system32` đứng trước `C:\Program Files\Git\bin`, nên nó chọn `bash.exe` của **WSL** thay vì Git Bash.

**Cách sửa (chỉ ảnh hưởng agent):** tạo file `.path` trong thư mục gốc của agent. Agent dùng nội dung file này làm `PATH` cho mọi job.

```powershell
$p = [Environment]::GetEnvironmentVariable('Path','Machine')
"C:\Program Files\Git\bin;$p" | Set-Content -NoNewline C:\agent\.path
Get-Service vstsagent* | Restart-Service
```

Sau khi sửa, log phải in ra `"C:\Program Files\Git\bin\bash.exe" -c pwd`.

> Ghi chú thêm: script CI của mình dùng `fvm flutter` khi máy có FVM. Máy build có cài FVM nên bước analyze bắt đầu clone thêm một bản Flutter SDK. Đây không phải lỗi, nhưng nghĩa là có thêm một bản SDK chưa được patch. Thêm điều kiện `[ -z "$TF_BUILD" ]` nếu muốn CI luôn dùng SDK của task Flutter Install.

---

## 6. `could not lock config file C:/Program Files/Git/etc/gitconfig: Permission denied`

```
error: could not lock config file C:/Program Files/Git/etc/gitconfig: Permission denied
```

Script build bắt đầu bằng `git config --system core.longpaths true`. Service của agent chạy bằng **NetworkService**, tài khoản này không ghi được vào `Program Files`. Script không bật `set -e` nên build vẫn chạy tiếp, nhưng long path không được bật. Sau này build có thể lỗi *Filename too long*.

**Cách sửa:** chạy một lần bằng quyền Administrator, đồng thời bật long path của Windows:

```powershell
git config --system core.longpaths true
New-ItemProperty -Path HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem `
  -Name LongPathsEnabled -Value 1 -PropertyType DWORD -Force
```

---

## 7. Ký MSIX: `Exception calling ".ctor" with "2" argument(s): "Access denied."`

```
new-object : Exception calling ".ctor" with "2" argument(s): "Access denied."
#2  SignTool._getCertificateSubjectByFile (package:msix/src/sign_tool.dart:145:47)
```

App Windows build xong, nhưng `dart run msix:create` lỗi khi đọc chứng chỉ ký. Nó gọi `new X509Certificate2(<pfx>, <password>)`, và lệnh này cần **kho khóa (key store) của user** để nạp private key. **NetworkService** không có kho khóa dùng được.

**Cách sửa:** cho service của agent chạy bằng **tài khoản user thật**: `services.msc` → *Azure Pipelines Agent (…)* → **Log On** → *This account*: `.\<user>` cùng mật khẩu của user đó.

Hai chỗ dễ nhầm:

- Dùng **mật khẩu** của tài khoản, không dùng **PIN** của Windows Hello. Với Microsoft account thì dùng mật khẩu của tài khoản Microsoft (tài khoản passwordless sẽ không dùng được, khi đó hãy tạo một local user riêng).
- Kiểm tra tên tài khoản bằng `whoami` (ví dụ `machine\user` thì nhập `.\user`).

---

## 8. `Logon failure: the user has not been granted the requested logon type`

```
This service account does not have the required user right "Log on as a service."
```

Thông thường `services.msc` tự cấp quyền này khi đổi tài khoản. Lần này nó không cấp.

**Cách sửa:** `secpol.msc` → *Local Policies → User Rights Assignment* → **Log on as a service** → thêm user. Kiểm tra thêm mục **Deny log on as a service**: user không được có trong mục này. Sau đó start service.

(Windows Home không có `secpol.msc`. Khi đó có thể cấp quyền `SeServiceLogonRight` bằng `secedit`, hoặc chạy lại `config.cmd --runAsService --windowsLogonAccount ...`, lệnh này tự cấp quyền.)

---

## 9. `fatal: detected dubious ownership in repository`

```
fatal: detected dubious ownership in repository at 'C:/agent/_work/_tool/Flutter/3.29.3/windows/flutter'
'...' is owned by: NT AUTHORITY/NETWORK SERVICE
but the current user is: MACHINE/user
Error: Unable to determine engine version...
```

Lỗi này phát sinh từ bước 7. Mọi thứ trong `_work` được tạo lúc agent còn chạy bằng NetworkService. Giờ agent chạy bằng user khác, nên Git chặn thao tác trên repo do user khác sở hữu, và Flutter không đọc được phiên bản engine của chính nó.

**Cách sửa:** xóa bản SDK đã cache để lần chạy sau cài lại bằng tài khoản mới, và chuyển quyền sở hữu phần còn lại:

```powershell
Remove-Item -Recurse -Force C:\agent\_work\_tool\Flutter
takeown /f C:\agent\_work /r /d y | Out-Null
icacls C:\agent\_work /setowner "MACHINE\user" /t /q
```

Nếu máy chỉ dùng để build, có thể chạy thêm `git config --global --add safe.directory '*'` bằng tài khoản của agent.

> Bài học: **chọn tài khoản chạy service trước lần build đầu tiên.** Đổi sau thì phải xóa cache.

---

## 10. Bẫy ẩn: `git apply` trên một SDK được giữ lại

Máy hosted luôn bắt đầu từ trạng thái sạch ở mỗi lần build. **Self-hosted agent thì giữ lại tool cache.** Pipeline của mình patch Flutter SDK (`git apply cursor_spacing.diff`, `windows_pan_zoom.diff`). Tới lần build thứ hai, SDK đã có patch rồi nên `git apply` báo lỗi *patch does not apply*.

**Cách sửa:** để step chạy lại nhiều lần vẫn cho cùng kết quả (idempotent):

```bash
git apply --reverse --check cursor_spacing.diff 2>/dev/null || git apply cursor_spacing.diff
git apply --reverse --check windows_pan_zoom.diff 2>/dev/null || git apply windows_pan_zoom.diff
```

Nếu kiểm tra ngược (`--reverse --check`) thành công nghĩa là patch đã được áp, nên bỏ qua; nếu không thì áp như bình thường. Cách này chạy đúng trên cả máy hosted lẫn self-hosted. (Lệnh `mv -Force` khi thay engine vốn đã chạy lại được nhiều lần.)

---

## Thêm: Windows Defender mà không cần tắt

Tắt *Real-time protection* bằng tay chỉ có tác dụng tạm thời: Windows sẽ tự bật lại sau một thời gian. Muốn tắt vĩnh viễn thì phải tắt Tamper Protection và dùng Group Policy, và như vậy máy đang giữ chứng chỉ ký của bạn sẽ không được bảo vệ.

Cách tốt hơn là **thêm ngoại lệ (exclusion)** cho thư mục và tiến trình build. Build nhanh gần như khi tắt Defender, và ngoại lệ được lưu lâu dài:

```powershell
# Chạy bằng quyền Administrator. Thay <user> bằng tài khoản chạy service của agent.
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

Nếu build vẫn chậm, chạy `Get-MpPerformanceReport` để xem Defender đang tốn thời gian quét những gì.

---

## Checklist: chuẩn bị máy Windows trước lần build đầu tiên

1. Cài **Git for Windows**, **.NET SDK 8+**, **Visual Studio 2022** (Desktop development with C++), và **CMake** nếu cần.
2. Đăng ký agent **chạy dạng service bằng tài khoản user thật** (không dùng NetworkService), và cấp quyền **Log on as a service**.
3. Thêm user capability **`sh`**.
4. Tạo file **`C:\agent\.path`** với `C:\Program Files\Git\bin` đứng đầu.
5. Chạy `git config --system core.longpaths true` và bật **LongPathsEnabled**.
6. Thêm **ngoại lệ cho Defender**.
7. Trong pipeline: thay `C:\hostedtoolcache` bằng **`$(Agent.ToolsDirectory)`**, và sửa mọi step có thay đổi SDK để **chạy lại nhiều lần vẫn đúng**.

## Kết luận

Từng lỗi riêng lẻ đều không khó sửa. Tất cả đều xuất phát từ một điểm: **mỗi lần build, hosted agent là một máy admin mới tinh, có sẵn đủ tool; self-hosted agent thì không có điều nào trong số đó.** Máy thiếu tool, chạy bằng tài khoản service bị giới hạn quyền, và giữ lại trạng thái giữa các lần build. Nếu tính trước ba khác biệt này thì việc chuyển đổi chỉ mất một buổi chiều. Đổi lại, bạn có các lần build không tốn tiền theo phút và chạy nhanh hơn nhờ cache có sẵn.
