---
template: "post"
title: "Best CI/CD for Mobile Apps in 2026: Codemagic vs Bitrise vs GitHub Actions vs Azure Pipelines (Real Cost Compared)"
description: "A 2026 cost comparison of CI/CD services for mobile apps (native iOS, native Android, Flutter, React Native): free tiers, macOS and Linux prices, Xcode Cloud and Expo EAS, and what the same workload costs on each, with charts."
date: 2026-10-27T18:30:00+07:00
author: letrungdo
slug: "mobile-ci-cd-comparison-codemagic-bitrise-github-actions-azure-pipelines"
cover: "../../images/2026/10/mobile-ci-cd-comparison-cover.png"
keywords: "mobile ci cd, best ci cd for mobile apps, codemagic vs bitrise, codemagic vs github actions, ios ci cd, android ci cd, react native ci cd, flutter ci cd, xcode cloud pricing, eas build pricing"
categories:
  - Dev
tags:
  - CI/CD
  - iOS
  - Android
  - Flutter
  - React Native
  - GitHub Actions
  - Azure DevOps
  - DevOps
---

Whether you build with **Swift**, **Kotlin**, **Flutter** or **React Native**, mobile CI cost comes down to one fact: **iOS builds need macOS**, and macOS build minutes are the most expensive minutes in CI. Android builds, tests and lint run happily on cheap Linux machines. The iOS build is what drives the bill.

This post compares the four general-purpose services mobile teams use most: **Codemagic**, **Bitrise**, **GitHub Actions** and **Azure Pipelines**. It also covers two stack-specific options: **Xcode Cloud** (Apple platforms) and **Expo EAS Build** (React Native). You get the free tiers, the prices, and what the **same workload** costs on each, with charts.

> All prices are taken from each vendor's official pricing page on **October 27, 2026**, in USD. CI pricing changes often, so check the links at the end before you commit.

---

## TL;DR

| If you... | Pick |
|---|---|
| Build an **Android-only** app | **GitHub Actions** or **Azure Pipelines**: Linux minutes are cheap and the free tier often covers everything |
| Build a **native iOS** app and want zero setup cost | **Xcode Cloud** (25 free compute hours/month with the Apple Developer Program) |
| Use **Expo / React Native** and want builds without touching Xcode | **Expo EAS Build** |
| Are a solo developer on any stack and want the least setup | **Codemagic** (500 free macOS minutes/month) |
| Keep code on GitHub and want one place for everything | **GitHub Actions** |
| Run many mobile apps and want a large step library plus release tooling | **Bitrise** |
| Want the lowest fixed monthly cost, or already use Azure DevOps | **Azure Pipelines** |
| Own a Mac that can stay on | A **self-hosted agent** on GitHub Actions or Azure Pipelines |

---

## What your stack needs from CI

| Stack | Android build | iOS build | Notes |
|---|---|---|---|
| **Native Android** (Kotlin/Java) | Linux | — | No Mac needed at all. The cheapest case. |
| **Native iOS** (Swift/Obj-C) | — | macOS | Xcode Cloud is an extra option. |
| **Flutter** | Linux | macOS | One codebase, two builds. |
| **React Native** | Linux | macOS | Expo projects can also use EAS Build. |
| **Kotlin Multiplatform, .NET MAUI, Ionic/Capacitor** | Linux | macOS | Same split as Flutter and React Native. |

All four general-purpose services can build every stack in this table. The difference is how much you configure yourself: Codemagic and Bitrise ship ready-made steps for the common mobile stacks, while GitHub Actions and Azure Pipelines give you a machine and you script the build.

---

## Quick comparison

| | Codemagic | Bitrise | GitHub Actions | Azure Pipelines |
|---|---|---|---|---|
| **Free tier** | 500 macOS M2 min/month (individuals) | Hobby: 300 credits/month, 1 private app | 2,000 min/month (Free plan, private repos) | 1 hosted job with 1,800 min/month + 1 self-hosted job, unlimited minutes |
| **Pricing model** | Per minute, or fixed yearly | Monthly plan (+ per-minute machine rates) | Per minute | Per parallel job (unlimited minutes) |
| **macOS price** | $0.095/min (M2), $0.114/min (M4) | Plan-based | $0.062/min (3–4 core) | Included in $40/month per job |
| **Linux price** | $0.045/min | Plan-based | $0.006/min (2-core) | Included in $40/month per job |
| **Mobile setup** | Mobile-only CI; workflow UI or `codemagic.yaml` | Mobile-only CI; ready-made steps | Generic CI; community actions + your own scripts | Generic CI; Marketplace tasks + your own scripts |
| **Automatic iOS signing** | Yes | Yes | No (DIY / fastlane) | No (DIY / fastlane) |
| **Self-hosted option** | No (cloud only) | No (cloud only) | Yes, no GitHub charge | Yes, 1 job free, then $15/job/month |
| **Max build time** | 120 min | 90 min (Hobby), 210 min (paid) | — | — |

---

## Codemagic

Codemagic is a CI built only for mobile apps. It started with Flutter, and now also builds React Native, native iOS, native Android, Ionic and other stacks. You can set up a workflow in the web UI without writing YAML, or keep it in `codemagic.yaml` in the repo. iOS code signing can be handled for you with an **App Store Connect API key**, and publishing to TestFlight / App Store and Google Play is built in.

**Pricing:**
- **Free** (individuals): **500 macOS M2 minutes/month**, 1 concurrent build, 120-minute build limit.
- **Pay as you go**: Mac mini M2 **$0.095/min**, M4 **$0.114/min**, Linux and Windows **$0.045/min**. Extra concurrency is $49/month each.
- **Fixed price**: from **$3,990/year** (M2, unlimited minutes, 3 concurrent builds).

**Good:** least setup, generous free tier, iOS signing that just works.
**Watch out:** the highest per-minute macOS price of the four, and Linux is 7× GitHub's price, so Android-only teams pay more than they need to. The fixed plan (~$333/month) only pays off at around **3,500 M2 minutes per month**.

---

## Bitrise

Bitrise is a CI built for mobile apps. Its **step library** covers native iOS (Xcode Archive, CocoaPods, SPM), native Android (Gradle), Flutter, React Native and more, plus steps for code signing and deploying to TestFlight and Google Play. It also sells **Release Management** and **CodePush** as separate products.

**Pricing:**
- **Hobby** (free): 300 credits/month, 1 private app, 90-minute build limit.
- **Starter**: **$89/month** billed yearly (**$99** monthly). Recommended for up to **100 builds/month**, up to 3 private apps, 4 concurrent builds.
- **Pro**: from **$200/month** billed yearly, 250–2,000 builds/month, unlimited private apps.

**Good:** a flat monthly price that is easy to budget; strong mobile tooling for every stack.
**Watch out:** plans are sized by **number of builds** and **number of apps**. If you build Android and iOS as separate builds, 100 releases count as 200 builds, which pushes you from Starter to Pro.

---

## GitHub Actions

If your code is already on GitHub, Actions is the default choice: no extra account, and pull request checks, releases and secrets all live in one place. Run Android on Linux and iOS on macOS as two jobs, so you only pay macOS prices for the part that needs it:

```yaml
jobs:
  android:
    runs-on: ubuntu-latest      # cheap: $0.006/min
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: 17 }
      # Native / React Native: ./gradlew bundleRelease (in android/ for RN)
      # Flutter: flutter build appbundle (after subosito/flutter-action)
      - run: ./gradlew bundleRelease

  ios:
    runs-on: macos-latest       # expensive: $0.062/min
    steps:
      - uses: actions/checkout@v4
      # Native / React Native: fastlane gym, or xcodebuild archive
      # Flutter: flutter build ipa
      - run: bundle exec fastlane ios release
```

**Pricing (private repositories):**
- Included minutes: **2,000/month** on Free, **3,000** on Pro/Team.
- Beyond that: Linux 2-core **$0.006/min**, Windows **$0.010/min**, macOS 3–4 core **$0.062/min**, macOS M2 Pro (5-core) **$0.102/min**.
- **Public repositories**: standard runners are free.
- **Self-hosted runners**: GitHub's billing docs currently say usage on self-hosted runners is **free**. GitHub announced a $0.002/min platform charge for self-hosted runners in December 2025, then postponed it, so keep an eye on it.

**Good:** the cheapest pay-per-minute prices on both Linux and macOS; huge ecosystem.
**Watch out:** you write and maintain the iOS signing setup yourself (certificates, provisioning profiles, keychain), usually with fastlane `match`. Also, macOS minutes use up the included allowance much faster than Linux minutes.

---

## Azure Pipelines

Azure Pipelines charges per **parallel job**, not per minute. A paid Microsoft-hosted job costs **$40/month with unlimited minutes**, on Linux, Windows or macOS. For a team with steady builds, that is usually the lowest bill of the four. Built-in tasks cover Gradle and Xcode, and Marketplace extensions add App Store and Google Play publishing, so native, Flutter and React Native projects all work.

**Pricing:**
- **Free**: 1 Microsoft-hosted parallel job with **1,800 minutes/month**, plus 1 **self-hosted** parallel job with **unlimited minutes**.
- Extra Microsoft-hosted job: **$40/month**, unlimited minutes.
- Extra self-hosted job: **$15/month**.

**Good:** a fixed, predictable price; the free self-hosted job is ideal if you own a Mac; works well with the rest of Azure DevOps (Boards, Repos, Artifacts).
**Watch out:** Microsoft-hosted macOS agents can be slower to start than the dedicated mobile CIs. New organizations may have to **request** the free hosted job before their first pipeline can run. The Classic editor and YAML options can also be confusing at first.

I have used Azure Pipelines for mobile projects for years. If you go this way, these posts cover the parts that usually go wrong:
- [Azure Pipelines all in one](/en/azure-pipelines-all-in-one/)
- [How to create an Apple App Store connection in Azure Pipelines](/en/how-to-create-apple-app-store-connection-in-azure-pipelines/)
- [Setting up a self-hosted Windows agent for Flutter Desktop: 10 errors and fixes](/en/azure-pipelines-self-hosted-windows-agent-flutter/)

---

## Stack-specific options

### Xcode Cloud (native iOS, and other Apple platforms)

Apple's own CI, built into Xcode and App Store Connect. Signing and TestFlight upload need almost no setup.
- **25 compute hours/month free** with the Apple Developer Program ($99/year).
- Paid: **$49.99/month** for 100 hours, **$99.99** for 250 hours, **$399.99** for 1,000 hours.
- It only builds Apple platforms. Your Android build needs another CI. Flutter and React Native projects can run on it, but only with custom scripts (`ci_scripts/ci_post_clone.sh`) that install the SDK and dependencies.

### Expo EAS Build (React Native / Expo)

Expo's cloud build service. It handles native builds and iOS credentials for Expo and bare React Native projects, so you never open Xcode. It charges **per build**, not per minute:
- **Free**: up to 15 Android and 15 iOS builds/month, low-priority queue.
- **Starter**: **$19/month** including **$45** of build credit. **Production**: **$199/month** including **$225**.
- Per build (medium worker): **Android $1**, **iOS $2**. Large workers cost double.

---

## Real cost: the same workload on each service

**Workload A — an app on both stores** (React Native, Flutter, or separate native apps). **100 pipeline runs per month**, each building:
- **iOS** on macOS: 15 minutes
- **Android** on Linux: 10 minutes

That is **1,500 macOS minutes + 1,000 Linux minutes** per month. List prices, **before** free minutes.

<figure class="bar-chart">
<figcaption class="bar-chart-title">Workload A: monthly cost for iOS + Android (USD)</figcaption>
<div class="bar-chart-row" title="Self-hosted Mac: $0 in CI fees"><span class="bar-chart-label">Self-hosted Mac<small>Azure or GitHub</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:0%"></span></span><span class="bar-chart-value">$0</span></div>
<div class="bar-chart-row" title="Azure Pipelines: $40/month"><span class="bar-chart-label">Azure Pipelines<small>1 hosted job</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:14.6%"></span></span><span class="bar-chart-value">$40</span></div>
<div class="bar-chart-row" title="Bitrise Starter: $89–99/month"><span class="bar-chart-label">Bitrise Starter<small>1 combined build</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:32.5%"></span></span><span class="bar-chart-value">$89–99</span></div>
<div class="bar-chart-row" title="GitHub Actions: $99/month"><span class="bar-chart-label">GitHub Actions</span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:36.1%"></span></span><span class="bar-chart-value">$99</span></div>
<div class="bar-chart-row" title="Codemagic: $187.50/month"><span class="bar-chart-label">Codemagic<small>pay as you go</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:68.4%"></span></span><span class="bar-chart-value">$187.50</span></div>
<div class="bar-chart-row" title="Bitrise Pro: $200/month"><span class="bar-chart-label">Bitrise Pro<small>2 separate builds</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:73%"></span></span><span class="bar-chart-value">$200</span></div>
<div class="bar-chart-row" title="Expo EAS Starter: $274/month"><span class="bar-chart-label">Expo EAS Starter<small>React Native only</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:100%"></span></span><span class="bar-chart-value">$274</span></div>
<p class="bar-chart-note">GitHub: 1,500 × $0.062 + 1,000 × $0.006. Codemagic: 1,500 × $0.095 + 1,000 × $0.045. EAS: $19 + (100 × $2 + 100 × $1 − $45 credit).</p>
</figure>

**Workload B — Android only** (native Android, or the Android half of a cross-platform app). 100 builds × 10 minutes = **1,000 Linux minutes** per month. Here the free tiers matter, so this chart is **after** free minutes.

<figure class="bar-chart">
<figcaption class="bar-chart-title">Workload B: monthly cost for Android only, after free tier (USD)</figcaption>
<div class="bar-chart-row" title="Azure Pipelines: $0, fits the 1,800 free minutes"><span class="bar-chart-label">Azure Pipelines<small>free 1,800 min</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:0%"></span></span><span class="bar-chart-value">$0</span></div>
<div class="bar-chart-row" title="GitHub Actions: $0, fits the 2,000 free minutes"><span class="bar-chart-label">GitHub Actions<small>free 2,000 min</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:0%"></span></span><span class="bar-chart-value">$0</span></div>
<div class="bar-chart-row" title="Codemagic: $45/month"><span class="bar-chart-label">Codemagic<small>Linux $0.045/min</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:50.6%"></span></span><span class="bar-chart-value">$45</span></div>
<div class="bar-chart-row" title="Expo EAS Starter: $74/month"><span class="bar-chart-label">Expo EAS Starter<small>React Native only</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:83.1%"></span></span><span class="bar-chart-value">$74</span></div>
<div class="bar-chart-row" title="Bitrise Starter: $89–99/month"><span class="bar-chart-label">Bitrise Starter</span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:100%"></span></span><span class="bar-chart-value">$89–99</span></div>
<p class="bar-chart-note">Bitrise's free Hobby plan (300 credits, 1 private app) may cover a small Android app; its credit-to-minute rate is not listed on the pricing page.</p>
</figure>

**Workload C — native iOS only.** 100 builds × 15 minutes = **1,500 macOS minutes** (25 hours) per month. List prices.

<figure class="bar-chart">
<figcaption class="bar-chart-title">Workload C: monthly cost for native iOS only (USD)</figcaption>
<div class="bar-chart-row" title="Xcode Cloud: $0, fits the 25 free compute hours"><span class="bar-chart-label">Xcode Cloud<small>25 free hours</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:0%"></span></span><span class="bar-chart-value">$0</span></div>
<div class="bar-chart-row" title="Azure Pipelines: $40/month"><span class="bar-chart-label">Azure Pipelines<small>1 hosted job</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:28.1%"></span></span><span class="bar-chart-value">$40</span></div>
<div class="bar-chart-row" title="Bitrise Starter: $89–99/month"><span class="bar-chart-label">Bitrise Starter</span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:62.5%"></span></span><span class="bar-chart-value">$89–99</span></div>
<div class="bar-chart-row" title="GitHub Actions: $93/month"><span class="bar-chart-label">GitHub Actions</span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:65.3%"></span></span><span class="bar-chart-value">$93</span></div>
<div class="bar-chart-row" title="Codemagic: $142.50/month"><span class="bar-chart-label">Codemagic<small>M2, pay as you go</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:100%"></span></span><span class="bar-chart-value">$142.50</span></div>
<p class="bar-chart-note">Xcode Cloud counts compute hours across all actions (build, test, archive), so a workflow that also runs tests will use more than 25 hours.</p>
</figure>

What the charts do not show:
- **Speed is money too.** A faster Apple Silicon machine that finishes in 8 minutes instead of 15 changes the per-minute math. Codemagic and Bitrise both offer M4 machines.
- **Concurrency.** The $40 Azure job runs one build at a time. If iOS and Android must run in parallel, you need a second job (the free 1,800 minutes may be enough for Android).
- **Your time.** Codemagic, Bitrise, Xcode Cloud and EAS handle iOS signing for you. On GitHub Actions and Azure Pipelines, the first working signing setup can take a day.

---

## Hidden costs to plan for

1. **Apple Developer Program**: $99/year for any iOS app, on every option.
2. **A Mac for self-hosted agents**: a Mac mini pays for itself quickly if you build daily, but you are now the one running OS updates, Xcode upgrades and disk cleanup.
3. **Build time limits**: Codemagic stops builds at 120 minutes, Bitrise Hobby at 90. Large apps with many native dependencies can get close.
4. **Cache**: Gradle, CocoaPods / SPM, npm and pub caches can cut build time in half. Check how much cache each plan includes (for example Codemagic Free: 3 GB per build).

---

## How to choose

- **Native Android** → **GitHub Actions** or **Azure Pipelines**. Linux minutes are cheap and the free tier usually covers a small team.
- **Native iOS** → start with **Xcode Cloud**'s free 25 hours. Move to GitHub Actions or a self-hosted Mac when you outgrow it.
- **React Native with Expo** → **EAS Build** for the least work; move the builds to GitHub Actions or Azure Pipelines when the per-build bill grows.
- **Flutter or any cross-platform stack, solo developer** → **Codemagic Free**. 500 macOS minutes is about 30 iOS builds per month, with almost no setup.
- **Code on GitHub, small team** → **GitHub Actions**. Cheapest pay-per-minute prices, and the whole workflow stays in the repo.
- **Agency or team with several apps** → **Bitrise**. Flat pricing per plan and a strong mobile step library.
- **Steady builds every day / already on Azure DevOps** → **Azure Pipelines**. $40/month for unlimited hosted minutes is hard to beat.
- **You own a Mac** → a **self-hosted agent** on Azure Pipelines (1 job free) or GitHub Actions brings CI fees close to zero.

## Conclusion

On every stack, the mobile CI bill is mostly the **macOS bill**. Android-only apps can often build for free. For iOS, Xcode Cloud's free hours, GitHub Actions' per-minute price and Azure Pipelines' unlimited-minute job are the cheapest routes. Codemagic, Bitrise and EAS cost more, but you get back the hours you would spend on iOS signing and pipeline upkeep. Run your own numbers with the formula above (**macOS minutes × price + Linux minutes × price**) before you choose.

**Official pricing pages (checked October 27, 2026):**
- [Codemagic pricing](https://codemagic.io/pricing/)
- [Bitrise pricing](https://bitrise.io/pricing)
- [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions) and [runner pricing](https://docs.github.com/en/billing/reference/actions-runner-pricing)
- [Azure DevOps Services pricing](https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/)
- [Xcode Cloud](https://developer.apple.com/xcode-cloud/)
- [Expo EAS pricing](https://expo.dev/pricing)
