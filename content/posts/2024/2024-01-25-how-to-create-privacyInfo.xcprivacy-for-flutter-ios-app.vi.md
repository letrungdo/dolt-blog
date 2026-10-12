---
template: "post"
title: "Cách tạo file PrivacyInfo.xcprivacy cho ứng dụng Flutter iOS"
date: 2024-01-25T09:30:00+07:00
author: letrungdo
slug: "how-to-create-privacyInfo.xcprivacy-for-flutter-ios-app"
lang: "vi"
cover: "../../images/2024/01/privacy_manifest_files.jpg"
keywords: "Privacy manifest file"
categories:
  - Flutter
---

Tệp Privacy manifest, có tên là PrivacyInfo.xcprivacy đã được đề cập tại <a href="https://developer.apple.com/documentation/bundleresources/privacy_manifest_files" target="_blank">developer.apple.com/documentation/bundleresources/privacy_manifest_files</a>

### 1. Tạo file PrivacyInfo.xcprivacy mặc định cho ứng dụng Flutter iOS

<a href="https://github.com/flutter/engine/blob/main/shell/platform/darwin/ios/framework/PrivacyInfo.xcprivacy" target="_blank">Đây là tệp</a> mà Flutter đã biên dịch và đưa vào Flutter.framework, vì vậy ứng dụng của tôi sẽ lấy toàn bộ nội dung này và đưa vào PrivacyInfo.xcprivacy

> Tham khảo: <a href="https://github.com/flutter/flutter/issues/131494" target="_blank">flutter/issues/131494</a>

### 2. Quét thư mục được chỉ định để tìm khả năng sử dụng "iOS required reason API"

Tải xuống tệp required_reason_api_scanner.sh và chạy lệnh:

```sh
sh required_reason_api_scanner.sh directory_name
```

> Đối với các đường dẫn bắt đầu bằng ios/Pods, có thể bỏ qua và không cần phân tích.
> Kết quả phân tích sẽ dựa trên <a href="https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api" target="_blank">describing_use_of_required_reason_api</a> và thêm vào PrivacyInfo.xcprivacy

> Tham khảo: <a href="https://github.com/Wooder/ios_17_required_reason_api_scanner" target="_blank">github.com/Wooder/ios_17_required_reason_api_scanner</a>
