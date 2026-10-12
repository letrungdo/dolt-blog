---
template: "post"
title: "Lỗi Xcode 16 Validation 'Missing purpose string in Info.plist' khi không sử dụng HealthKit"
date: 2025-03-29T15:10:00+08:00
author: letrungdo
slug: "xcode-16-missing-purpose-string-healthkit-error"
lang: "vi"
cover: "../../images/2025/03/missing-purpose-string-healthkit.png"
keywords: "Xcode 16, validation error, Validation failed, Info.plist, NSHealthShareUsageDescription, HealthKit, Flutter, provisioning profile, Apple App Store, binary validation"
categories:
  - Dev
  - Flutter
tags:
  - Xcode
---

Gần đây, một số nhà phát triển sử dụng Xcode 16 để xác thực (validate) ứng dụng iOS của họ đã gặp phải một lỗi khá gây ức chế trong quá trình tải ứng dụng lên Apple App Store Connect. Lỗi này xuất hiện ngay cả khi ứng dụng không sử dụng bất kỳ API nào liên quan đến HealthKit.

## Cách sửa lỗi Missing purpose string in Info.plist

Khi thực hiện xác thực tệp nhị phân (binary validation) trên Xcode 16, bạn có thể nhận được một thông báo lỗi với mã trạng thái 409 như thế này:

```log
Validation failed (409)
Missing purpose string in Info.plist. Your app's code references one or more APIs that access sensitive user data, or the app has one or more entitlements that permit such access.
The Info.plist file for the "Runner.app" bundle should contain a NSHealthShareUsageDescription key with a user-facing purpose string explaining clearly and completely why your app needs the data.
If you're using external libraries or SDKs, they may reference APIs that require a purpose string.
While your app might not use these APIs, a purpose string is still required.
For details, visit: https://developer.apple.com/documentation/uikit/protecting_the_user_s_privacy/requesting_access_to_protected_resources.（ID: 4e189c8f-8d9f-4665-b816-a9e426e07ae7）
```

Điểm đáng lưu ý là trong trường hợp cụ thể này, ứng dụng được phát triển bằng Flutter và không hề có bất kỳ đoạn mã nào trực tiếp sử dụng HealthKit. Ngay cả khi kiểm tra kỹ lưỡng mã nguồn và các SDK của bên thứ ba cũng không thấy sự hiện diện của các API HealthKit.

### Nguyên nhân không ngờ:

Sau khi điều tra, nguyên nhân gốc rễ của vấn đề đã được xác định: **Tính năng (Capability) HealthKit được bật trong Provisioning Profile của ứng dụng.**

<img src="/media/2025/03/provisioning_profile_include_healthkit.jpg" class="aligncenter size-full" alt="provisioning profile include HealthKit" />

Ngay cả khi ứng dụng của bạn không thực sự sử dụng các tính năng của HealthKit, việc bật capability này trong provisioning profile vẫn khiến Apple yêu cầu key `NSHealthShareUsageDescription` trong tệp `Info.plist`. Đây là cơ chế bảo vệ quyền riêng tư của người dùng, đảm bảo rằng bất kỳ ứng dụng nào có tiềm năng truy cập dữ liệu nhạy cảm (dù có dùng hay không) đều phải giải thích rõ ràng mục đích truy cập dữ liệu đó.

### Giải pháp đơn giản:

Giải pháp cho lỗi này rất đơn giản nếu bạn đã xác định đúng nguyên nhân:

**Tắt tính năng HealthKit trong Provisioning Profile của ứng dụng.**

Dưới đây là các bước thực hiện (tùy thuộc vào quy trình quản lý provisioning profile của bạn):

1.  **Truy cập Apple Developer Portal:** Đăng nhập vào tài khoản Apple Developer của bạn.
2.  **Chuyển đến Certificates, Identifiers & Profiles:** Chọn mục này.
3.  **Chọn Profiles:** Tìm và chọn provisioning profile mà ứng dụng của bạn đang sử dụng.
4.  **Edit Profile:** Chỉnh sửa profile này.
5.  **Tìm mục Capabilities:** Duyệt qua danh sách các capability được bật.
6.  **Tắt HealthKit:** Nếu HealthKit đang được chọn, hãy bỏ chọn nó.
7.  **Generate và Tải về Profile:** Sau khi tắt HealthKit, hãy tạo lại (generate) profile và tải về phiên bản mới.
8.  **Cập nhật Xcode:** Trong Xcode, hãy đảm bảo rằng dự án của bạn đang sử dụng provisioning profile đã được cập nhật. Bạn có thể cần phải làm mới (refresh) cài đặt signing.
9.  **Chạy lại Validation:** Thực hiện lại quá trình binary validation. Lỗi "Missing purpose string in Info.plist" liên quan đến HealthKit sẽ biến mất.

### Kết luận:

Lỗi xác thực "Missing purpose string in Info.plist" khi không sử dụng HealthKit có thể gây bối rối cho các nhà phát triển.

Tuy nhiên, việc hiểu rằng Apple yêu cầu khai báo chuỗi mục đích cho bất kỳ capability nào được bật trong provisioning profile, ngay cả khi không trực tiếp sử dụng trong mã nguồn, sẽ giúp bạn nhanh chóng tìm ra giải pháp.

Hãy kiểm tra lại provisioning profile của bạn nếu bạn gặp phải tình huống tương tự!
