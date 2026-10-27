---
template: "post"
title: "CI/CD nào rẻ nhất cho app mobile 2026: So sánh Codemagic, Bitrise, GitHub Actions và Azure Pipelines (chi phí thực tế)"
description: "So sánh chi phí các dịch vụ CI/CD cho app mobile năm 2026 (native iOS, native Android, Flutter, React Native): gói miễn phí, giá macOS và Linux, Xcode Cloud và Expo EAS, và cùng một khối lượng build thì mỗi nơi tốn bao nhiêu, kèm biểu đồ."
date: 2026-10-27T18:30:00+07:00
author: letrungdo
slug: "mobile-ci-cd-comparison-codemagic-bitrise-github-actions-azure-pipelines"
lang: "vi"
cover: "../../images/2026/10/mobile-ci-cd-comparison-cover.png"
keywords: "ci cd mobile, ci cd cho app mobile, codemagic vs bitrise, codemagic vs github actions, ci cd ios, ci cd android, ci cd react native, ci cd flutter, giá xcode cloud, giá eas build"
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

Dù bạn viết app bằng **Swift**, **Kotlin**, **Flutter** hay **React Native**, chi phí CI cho mobile đều xoay quanh một điều: **build iOS bắt buộc phải chạy trên macOS**, và phút build macOS là loại đắt nhất trong CI. Build Android, test và lint chạy tốt trên máy Linux giá rẻ. Hóa đơn cao hay thấp chủ yếu do phần build iOS.

Bài này so sánh 4 dịch vụ CI đa năng mà team mobile hay dùng nhất: **Codemagic**, **Bitrise**, **GitHub Actions** và **Azure Pipelines**, cộng thêm hai lựa chọn dành riêng cho từng nền tảng: **Xcode Cloud** (nền tảng Apple) và **Expo EAS Build** (React Native). Bạn sẽ thấy gói miễn phí, bảng giá, và **cùng một khối lượng build** thì mỗi nơi tốn bao nhiêu, kèm biểu đồ.

> Toàn bộ giá lấy từ trang pricing chính thức của từng hãng vào ngày **27/10/2026**, đơn vị USD. Giá CI thay đổi khá thường xuyên, nên hãy kiểm tra lại các link ở cuối bài trước khi quyết định.

---

## Tóm tắt nhanh

| Nếu bạn... | Nên chọn |
|---|---|
| Làm app **chỉ có Android** | **GitHub Actions** hoặc **Azure Pipelines**: phút Linux rẻ, gói miễn phí thường đủ dùng |
| Làm app **native iOS** và không muốn tốn tiền setup | **Xcode Cloud** (25 giờ miễn phí/tháng kèm Apple Developer Program) |
| Dùng **Expo / React Native** và không muốn đụng tới Xcode | **Expo EAS Build** |
| Làm một mình, stack nào cũng được, muốn setup ít nhất | **Codemagic** (500 phút macOS miễn phí/tháng) |
| Để code trên GitHub và muốn mọi thứ ở một chỗ | **GitHub Actions** |
| Làm nhiều app mobile, cần thư viện step lớn và công cụ phát hành | **Bitrise** |
| Muốn chi phí cố định thấp nhất, hoặc đang dùng Azure DevOps | **Azure Pipelines** |
| Có sẵn một chiếc Mac để chạy liên tục | **Self-hosted agent** trên GitHub Actions hoặc Azure Pipelines |

---

## Mỗi stack cần gì từ CI

| Stack | Build Android | Build iOS | Ghi chú |
|---|---|---|---|
| **Native Android** (Kotlin/Java) | Linux | — | Không cần Mac. Trường hợp rẻ nhất. |
| **Native iOS** (Swift/Obj-C) | — | macOS | Có thêm lựa chọn Xcode Cloud. |
| **Flutter** | Linux | macOS | Một codebase, hai bản build. |
| **React Native** | Linux | macOS | Dự án Expo có thể dùng thêm EAS Build. |
| **Kotlin Multiplatform, .NET MAUI, Ionic/Capacitor** | Linux | macOS | Chia giống Flutter và React Native. |

Cả 4 dịch vụ đa năng đều build được mọi stack trong bảng. Khác nhau ở chỗ bạn phải tự cấu hình bao nhiêu: Codemagic và Bitrise có sẵn step cho các stack mobile phổ biến, còn GitHub Actions và Azure Pipelines chỉ đưa bạn một cái máy, bạn tự viết script build.

---

## Bảng so sánh

| | Codemagic | Bitrise | GitHub Actions | Azure Pipelines |
|---|---|---|---|---|
| **Gói miễn phí** | 500 phút macOS M2/tháng (cá nhân) | Hobby: 300 credit/tháng, 1 app private | 2.000 phút/tháng (gói Free, repo private) | 1 job hosted với 1.800 phút/tháng + 1 job self-hosted không giới hạn phút |
| **Cách tính tiền** | Theo phút, hoặc gói cố định theo năm | Gói tháng (+ giá phút theo loại máy) | Theo phút | Theo parallel job (không giới hạn phút) |
| **Giá macOS** | $0,095/phút (M2), $0,114/phút (M4) | Theo gói | $0,062/phút (3–4 core) | Nằm trong $40/tháng mỗi job |
| **Giá Linux** | $0,045/phút | Theo gói | $0,006/phút (2 core) | Nằm trong $40/tháng mỗi job |
| **Setup cho mobile** | CI chuyên mobile; dùng UI hoặc `codemagic.yaml` | CI chuyên mobile; có sẵn step | CI đa năng; action cộng đồng + script tự viết | CI đa năng; task trên Marketplace + script tự viết |
| **Tự động ký iOS** | Có | Có | Không (tự làm / fastlane) | Không (tự làm / fastlane) |
| **Self-hosted** | Không (chỉ cloud) | Không (chỉ cloud) | Có, GitHub không thu phí | Có, 1 job miễn phí, sau đó $15/job/tháng |
| **Thời gian build tối đa** | 120 phút | 90 phút (Hobby), 210 phút (gói trả phí) | — | — |

---

## Codemagic

Codemagic là CI chỉ dành cho app mobile. Ban đầu làm cho Flutter, giờ build được cả React Native, native iOS, native Android, Ionic và các stack khác. Bạn có thể tạo workflow ngay trên giao diện web mà không cần viết YAML, hoặc lưu cấu hình trong `codemagic.yaml` trong repo. Ký code iOS có thể để Codemagic tự xử lý bằng **App Store Connect API key**, và việc đẩy lên TestFlight / App Store và Google Play đều có sẵn.

**Giá:**
- **Free** (cá nhân): **500 phút macOS M2/tháng**, 1 build đồng thời, giới hạn 120 phút mỗi build.
- **Pay as you go**: Mac mini M2 **$0,095/phút**, M4 **$0,114/phút**, Linux và Windows **$0,045/phút**. Thêm mỗi build đồng thời: $49/tháng.
- **Fixed price**: từ **$3.990/năm** (M2, không giới hạn phút, 3 build đồng thời).

**Ưu điểm:** setup ít nhất, gói free rộng rãi, ký iOS gần như không phải đụng tay.
**Lưu ý:** giá phút macOS cao nhất trong 4 dịch vụ, và giá Linux gấp 7 lần GitHub, nên team chỉ làm Android sẽ trả nhiều hơn cần thiết. Gói cố định (~$333/tháng) chỉ có lợi khi dùng khoảng **3.500 phút M2 mỗi tháng** trở lên.

---

## Bitrise

Bitrise là CI chuyên cho app mobile. **Thư viện step** có đủ cho native iOS (Xcode Archive, CocoaPods, SPM), native Android (Gradle), Flutter, React Native…, cùng các step ký code và đẩy lên TestFlight, Google Play. Bitrise còn bán riêng **Release Management** và **CodePush**.

**Giá:**
- **Hobby** (miễn phí): 300 credit/tháng, 1 app private, giới hạn 90 phút mỗi build.
- **Starter**: **$89/tháng** nếu trả theo năm (**$99** nếu trả theo tháng). Phù hợp tới khoảng **100 build/tháng**, tối đa 3 app private, 4 build đồng thời.
- **Pro**: từ **$200/tháng** trả theo năm, 250–2.000 build/tháng, không giới hạn app private.

**Ưu điểm:** giá cố định theo tháng, dễ lên ngân sách; công cụ mobile mạnh cho mọi stack.
**Lưu ý:** các gói tính theo **số build** và **số app**. Nếu build Android và iOS thành 2 build riêng thì 100 lần release sẽ thành 200 build, và bạn phải lên gói Pro.

---

## GitHub Actions

Nếu code đã nằm trên GitHub thì Actions là lựa chọn mặc định: không cần thêm tài khoản, còn check pull request, release và secrets đều ở một chỗ. Hãy chạy Android trên Linux và iOS trên macOS thành hai job riêng, để chỉ phần cần macOS mới phải trả giá macOS:

```yaml
jobs:
  android:
    runs-on: ubuntu-latest      # rẻ: $0.006/phút
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { distribution: temurin, java-version: 17 }
      # Native / React Native: ./gradlew bundleRelease (trong thư mục android/ với RN)
      # Flutter: flutter build appbundle (sau subosito/flutter-action)
      - run: ./gradlew bundleRelease

  ios:
    runs-on: macos-latest       # đắt: $0.062/phút
    steps:
      - uses: actions/checkout@v4
      # Native / React Native: fastlane gym, hoặc xcodebuild archive
      # Flutter: flutter build ipa
      - run: bundle exec fastlane ios release
```

**Giá (repo private):**
- Phút miễn phí: **2.000/tháng** với gói Free, **3.000** với Pro/Team.
- Vượt mức: Linux 2 core **$0,006/phút**, Windows **$0,010/phút**, macOS 3–4 core **$0,062/phút**, macOS M2 Pro (5 core) **$0,102/phút**.
- **Repo public**: runner tiêu chuẩn miễn phí.
- **Self-hosted runner**: tài liệu billing của GitHub hiện ghi là **miễn phí**. Tháng 12/2025 GitHub từng thông báo thu $0,002/phút cho self-hosted runner, sau đó đã hoãn lại, nên bạn nên theo dõi thêm.

**Ưu điểm:** giá theo phút rẻ nhất cả Linux lẫn macOS; hệ sinh thái cực lớn.
**Lưu ý:** bạn phải tự viết và bảo trì phần ký iOS (certificate, provisioning profile, keychain), thường dùng fastlane `match`. Ngoài ra phút macOS ngốn hạn mức miễn phí nhanh hơn phút Linux rất nhiều.

---

## Azure Pipelines

Azure Pipelines tính tiền theo **parallel job** chứ không theo phút. Mỗi job Microsoft-hosted trả phí là **$40/tháng, không giới hạn phút**, dùng được cho Linux, Windows lẫn macOS. Với team build đều đặn, đây thường là hóa đơn thấp nhất trong 4 dịch vụ. Có sẵn task cho Gradle và Xcode, cộng extension trên Marketplace để đẩy lên App Store và Google Play, nên native, Flutter hay React Native đều chạy được.

**Giá:**
- **Miễn phí**: 1 parallel job Microsoft-hosted với **1.800 phút/tháng**, cộng 1 parallel job **self-hosted** **không giới hạn phút**.
- Thêm 1 job Microsoft-hosted: **$40/tháng**, không giới hạn phút.
- Thêm 1 job self-hosted: **$15/tháng**.

**Ưu điểm:** giá cố định, dễ dự đoán; job self-hosted miễn phí rất hợp nếu bạn có sẵn Mac; dùng chung tốt với phần còn lại của Azure DevOps (Boards, Repos, Artifacts).
**Lưu ý:** agent macOS Microsoft-hosted có thể khởi động chậm hơn các CI chuyên mobile. Organization mới có thể phải **gửi yêu cầu** để được cấp job hosted miễn phí trước khi chạy pipeline đầu tiên. Ngoài ra, hai kiểu Classic editor và YAML lúc đầu khá dễ gây rối.

Mình đã dùng Azure Pipelines cho các dự án mobile nhiều năm. Nếu chọn hướng này, các bài sau sẽ giúp bạn qua những chỗ hay gặp lỗi:
- [Azure Pipelines all in one](/azure-pipelines-all-in-one/)
- [Cách tạo Apple App Store connection trong Azure Pipelines](/how-to-create-apple-app-store-connection-in-azure-pipelines/)
- [Dựng self-hosted Windows agent cho Flutter Desktop: 10 lỗi và cách sửa](/azure-pipelines-self-hosted-windows-agent-flutter/)

---

## Lựa chọn riêng cho từng nền tảng

### Xcode Cloud (native iOS và các nền tảng Apple khác)

CI của chính Apple, tích hợp sẵn trong Xcode và App Store Connect. Ký code và upload TestFlight gần như không phải setup.
- **25 giờ compute miễn phí mỗi tháng** kèm Apple Developer Program ($99/năm).
- Trả phí: **$49,99/tháng** cho 100 giờ, **$99,99** cho 250 giờ, **$399,99** cho 1.000 giờ.
- Chỉ build cho nền tảng Apple, phần Android phải dùng CI khác. Dự án Flutter và React Native vẫn chạy được, nhưng phải tự viết script (`ci_scripts/ci_post_clone.sh`) để cài SDK và dependency.

### Expo EAS Build (React Native / Expo)

Dịch vụ build trên cloud của Expo. EAS lo phần build native và chứng chỉ iOS cho cả dự án Expo lẫn React Native thuần, bạn không cần mở Xcode. EAS tính tiền **theo số build**, không theo phút:
- **Free**: tối đa 15 build Android và 15 build iOS mỗi tháng, hàng đợi ưu tiên thấp.
- **Starter**: **$19/tháng**, kèm **$45** credit build. **Production**: **$199/tháng**, kèm **$225**.
- Giá mỗi build (máy medium): **Android $1**, **iOS $2**. Máy large giá gấp đôi.

---

## Chi phí thực tế: cùng một khối lượng build trên mỗi dịch vụ

**Kịch bản A: app lên cả hai store** (React Native, Flutter, hoặc hai app native riêng). **100 lần chạy pipeline mỗi tháng**, mỗi lần build:
- **iOS** trên macOS: 15 phút
- **Android** trên Linux: 10 phút

Tổng cộng **1.500 phút macOS + 1.000 phút Linux** mỗi tháng. Tính theo giá niêm yết, **chưa trừ** phút miễn phí.

<figure class="bar-chart">
<figcaption class="bar-chart-title">Kịch bản A: chi phí mỗi tháng cho iOS + Android (USD)</figcaption>
<div class="bar-chart-row" title="Mac self-hosted: $0 phí CI"><span class="bar-chart-label">Mac self-hosted<small>Azure hoặc GitHub</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:0%"></span></span><span class="bar-chart-value">$0</span></div>
<div class="bar-chart-row" title="Azure Pipelines: $40/tháng"><span class="bar-chart-label">Azure Pipelines<small>1 job hosted</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:14.6%"></span></span><span class="bar-chart-value">$40</span></div>
<div class="bar-chart-row" title="Bitrise Starter: $89–99/tháng"><span class="bar-chart-label">Bitrise Starter<small>gộp 1 build</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:32.5%"></span></span><span class="bar-chart-value">$89–99</span></div>
<div class="bar-chart-row" title="GitHub Actions: $99/tháng"><span class="bar-chart-label">GitHub Actions</span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:36.1%"></span></span><span class="bar-chart-value">$99</span></div>
<div class="bar-chart-row" title="Codemagic: $187,50/tháng"><span class="bar-chart-label">Codemagic<small>pay as you go</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:68.4%"></span></span><span class="bar-chart-value">$187,50</span></div>
<div class="bar-chart-row" title="Bitrise Pro: $200/tháng"><span class="bar-chart-label">Bitrise Pro<small>2 build riêng</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:73%"></span></span><span class="bar-chart-value">$200</span></div>
<div class="bar-chart-row" title="Expo EAS Starter: $274/tháng"><span class="bar-chart-label">Expo EAS Starter<small>chỉ React Native</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:100%"></span></span><span class="bar-chart-value">$274</span></div>
<p class="bar-chart-note">GitHub: 1.500 × $0,062 + 1.000 × $0,006. Codemagic: 1.500 × $0,095 + 1.000 × $0,045. EAS: $19 + (100 × $2 + 100 × $1 − $45 credit).</p>
</figure>

**Kịch bản B: chỉ Android** (native Android, hoặc nửa Android của app đa nền tảng). 100 build × 10 phút = **1.000 phút Linux** mỗi tháng. Ở đây gói miễn phí quyết định nhiều, nên biểu đồ này tính **sau khi trừ** phút miễn phí.

<figure class="bar-chart">
<figcaption class="bar-chart-title">Kịch bản B: chi phí mỗi tháng chỉ cho Android, sau khi trừ gói free (USD)</figcaption>
<div class="bar-chart-row" title="Azure Pipelines: $0, nằm trong 1.800 phút miễn phí"><span class="bar-chart-label">Azure Pipelines<small>free 1.800 phút</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:0%"></span></span><span class="bar-chart-value">$0</span></div>
<div class="bar-chart-row" title="GitHub Actions: $0, nằm trong 2.000 phút miễn phí"><span class="bar-chart-label">GitHub Actions<small>free 2.000 phút</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:0%"></span></span><span class="bar-chart-value">$0</span></div>
<div class="bar-chart-row" title="Codemagic: $45/tháng"><span class="bar-chart-label">Codemagic<small>Linux $0,045/phút</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:50.6%"></span></span><span class="bar-chart-value">$45</span></div>
<div class="bar-chart-row" title="Expo EAS Starter: $74/tháng"><span class="bar-chart-label">Expo EAS Starter<small>chỉ React Native</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:83.1%"></span></span><span class="bar-chart-value">$74</span></div>
<div class="bar-chart-row" title="Bitrise Starter: $89–99/tháng"><span class="bar-chart-label">Bitrise Starter</span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:100%"></span></span><span class="bar-chart-value">$89–99</span></div>
<p class="bar-chart-note">Gói Hobby miễn phí của Bitrise (300 credit, 1 app private) có thể đủ cho app Android nhỏ; trang giá không ghi 1 credit bằng bao nhiêu phút.</p>
</figure>

**Kịch bản C: chỉ native iOS.** 100 build × 15 phút = **1.500 phút macOS** (25 giờ) mỗi tháng. Giá niêm yết.

<figure class="bar-chart">
<figcaption class="bar-chart-title">Kịch bản C: chi phí mỗi tháng chỉ cho native iOS (USD)</figcaption>
<div class="bar-chart-row" title="Xcode Cloud: $0, nằm trong 25 giờ miễn phí"><span class="bar-chart-label">Xcode Cloud<small>25 giờ free</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:0%"></span></span><span class="bar-chart-value">$0</span></div>
<div class="bar-chart-row" title="Azure Pipelines: $40/tháng"><span class="bar-chart-label">Azure Pipelines<small>1 job hosted</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:28.1%"></span></span><span class="bar-chart-value">$40</span></div>
<div class="bar-chart-row" title="Bitrise Starter: $89–99/tháng"><span class="bar-chart-label">Bitrise Starter</span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:62.5%"></span></span><span class="bar-chart-value">$89–99</span></div>
<div class="bar-chart-row" title="GitHub Actions: $93/tháng"><span class="bar-chart-label">GitHub Actions</span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:65.3%"></span></span><span class="bar-chart-value">$93</span></div>
<div class="bar-chart-row" title="Codemagic: $142,50/tháng"><span class="bar-chart-label">Codemagic<small>M2, pay as you go</small></span><span class="bar-chart-track"><span class="bar-chart-bar" style="width:100%"></span></span><span class="bar-chart-value">$142,50</span></div>
<p class="bar-chart-note">Xcode Cloud tính giờ compute cho mọi action (build, test, archive), nên workflow có chạy test sẽ dùng quá 25 giờ.</p>
</figure>

Những điều biểu đồ không thể hiện:
- **Tốc độ cũng là tiền.** Máy Apple Silicon nhanh hơn, build xong trong 8 phút thay vì 15 phút, sẽ làm thay đổi phép tính theo phút. Codemagic và Bitrise đều có máy M4.
- **Số build đồng thời.** Job $40 của Azure chỉ chạy một build mỗi lúc. Nếu cần chạy iOS và Android song song, bạn cần thêm job thứ hai (1.800 phút miễn phí có thể đủ cho phần Android).
- **Thời gian của bạn.** Codemagic, Bitrise, Xcode Cloud và EAS lo phần ký iOS cho bạn. Trên GitHub Actions và Azure Pipelines, lần đầu setup ký code chạy được có thể mất cả ngày.

---

## Các chi phí ẩn cần tính trước

1. **Apple Developer Program**: $99/năm cho mọi app iOS, lựa chọn nào cũng phải trả.
2. **Máy Mac cho self-hosted agent**: nếu build hằng ngày, một chiếc Mac mini hoàn vốn khá nhanh, nhưng bạn phải tự lo cập nhật macOS, nâng cấp Xcode và dọn ổ đĩa.
3. **Giới hạn thời gian build**: Codemagic dừng build ở 120 phút, Bitrise Hobby ở 90 phút. App lớn có nhiều dependency native có thể chạm ngưỡng này.
4. **Cache**: cache Gradle, CocoaPods / SPM, npm và pub có thể giảm một nửa thời gian build. Hãy xem mỗi gói cho bao nhiêu dung lượng cache (ví dụ Codemagic Free: 3 GB mỗi build).

---

## Chọn thế nào?

- **Native Android** → **GitHub Actions** hoặc **Azure Pipelines**. Phút Linux rẻ, gói miễn phí thường đủ cho team nhỏ.
- **Native iOS** → bắt đầu với 25 giờ miễn phí của **Xcode Cloud**. Khi dùng vượt mức thì chuyển sang GitHub Actions hoặc Mac self-hosted.
- **React Native dùng Expo** → **EAS Build** để ít việc nhất; khi hóa đơn theo build tăng cao thì chuyển sang GitHub Actions hoặc Azure Pipelines.
- **Flutter hoặc stack đa nền tảng, làm một mình** → **Codemagic Free**. 500 phút macOS tương đương khoảng 30 lần build iOS mỗi tháng, gần như không phải setup.
- **Code trên GitHub, team nhỏ** → **GitHub Actions**. Giá theo phút rẻ nhất, toàn bộ workflow nằm trong repo.
- **Agency hoặc team có nhiều app** → **Bitrise**. Giá cố định theo gói và thư viện step cho mobile rất mạnh.
- **Build đều đặn mỗi ngày / đang dùng Azure DevOps** → **Azure Pipelines**. $40/tháng cho số phút hosted không giới hạn rất khó tìm được chỗ rẻ hơn.
- **Có sẵn máy Mac** → chạy **self-hosted agent** trên Azure Pipelines (1 job miễn phí) hoặc GitHub Actions, phí CI gần như bằng 0.

## Kết luận

Với stack nào thì hóa đơn CI mobile cũng chủ yếu là **hóa đơn macOS**. App chỉ có Android thường build được miễn phí. Với iOS, 25 giờ free của Xcode Cloud, giá theo phút của GitHub Actions và job không giới hạn phút của Azure Pipelines là những lựa chọn rẻ nhất. Codemagic, Bitrise và EAS đắt hơn, nhưng bù lại bạn tiết kiệm được nhiều giờ setup ký iOS và bảo trì pipeline. Hãy tự tính với công thức ở trên (**số phút macOS × giá + số phút Linux × giá**) trước khi chọn.

**Trang giá chính thức (kiểm tra ngày 27/10/2026):**
- [Giá Codemagic](https://codemagic.io/pricing/)
- [Giá Bitrise](https://bitrise.io/pricing)
- [Billing GitHub Actions](https://docs.github.com/en/billing/concepts/product-billing/github-actions) và [giá runner](https://docs.github.com/en/billing/reference/actions-runner-pricing)
- [Giá Azure DevOps Services](https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/)
- [Xcode Cloud](https://developer.apple.com/xcode-cloud/)
- [Giá Expo EAS](https://expo.dev/pricing)
