---
template: "post"
title: "Cách kiểm thử Flutter Firebase App Check trong ứng dụng Release"
date: 2023-01-12T16:22:00+07:00
author: letrungdo
slug: "how-to-test-flutter-firebase-app-check-in-release-app"
lang: "vi"
cover: "../../images/2023/01/flutter-firebase-app-check.jpeg"
keywords: "flutter firebase app check, firebase app check"
categories:
  - Flutter
tags:
  - Flutter
---

Để đảm bảo khi phát hành lên App Store hoặc Play Store, App Check hoạt động chính xác, chúng ta cần kiểm tra việc lấy token thành công khi bản build ứng dụng ở chế độ release.

Nếu bạn sử dụng thư viện Flutter <a href="https://pub.dev/packages/firebase_app_check" target="_blank">firebase_app_check</a>, vui lòng lưu ý các vấn đề sau:

Flutter firebase_app_check sử dụng các provider mặc định: Play Integrity trên Android, Device Check trên nền tảng Apple.

Tuy nhiên, trong phiên bản cũ firebase_app_check 0.0.9+1, trên Android sử dụng Safety Net provider.
Safety Net provider đã bị ngưng hỗ trợ và bị gỡ bỏ. Play Integrity là provider được khuyến nghị.

> Mã nguồn triển khai:

```dart
// Khởi tạo
await Firebase.initializeApp();
await FirebaseAppCheck.instance.activate(
  androidProvider: kDebugMode ? AndroidProvider.debug : AndroidProvider.playIntegrity,
);

// Lấy appCheckToken
String? appCheckToken;
try {
  appCheckToken = await FirebaseAppCheck.instance.getToken();
} catch (e) {}
debugPrint("appCheckToken: $appCheckToken");
```

### Sử dụng App Check với DeviceCheck trên iOS

Lưu ý rằng Flutter iOS sử dụng Device Check chứ không phải App Attest.

> Tham khảo: <a href="https://firebase.google.com/docs/app-check/ios/devicecheck-provider?authuser=1&hl=en" target="_blank">docs/app-check/ios/devicecheck-provider</a>

### Sử dụng App Check với Play Integrity trên Android

Lưu ý rằng Flutter Android sử dụng Play Integrity chứ không phải Safety Net.

> Tham khảo: <a href="https://firebase.google.com/docs/app-check/android/play-integrity-provider?authuser=1&hl=en" target="_blank">docs/app-check/android/play-integrity-provider</a>

AppCheck Play Integrity chỉ có thể lấy token thành công nếu ứng dụng được cài đặt thông qua Play Store. Nếu bạn cài đặt trực tiếp từ file APK hoặc qua App Center..., bạn không thể lấy được token.
Đối với Safety Net, bạn có thể lấy token thành công ngay cả khi cài đặt trực tiếp từ file APK.

Trong <a href="https://play.google.com/console" target="_blank">play.google.com/console</a>, sau khi liên kết với dự án Firebase trong <b>App integrity</b>, bạn cần tạo một bản **Internal testing** để có thể cài đặt ứng dụng từ Play Store và lấy token thành công.


# Nội dung liên quan

#### Tạo upload keystore

> Tham khảo: <a href="https://docs.flutter.dev/deployment/android#create-an-upload-keystore" target="_blank">android#create-an-upload-keystore</a>

#### Tham chiếu keystore từ ứng dụng

> Tham khảo: <a href="https://docs.flutter.dev/deployment/android#reference-the-keystore-from-the-app" target="_blank">android#reference-the-keystore-from-the-app</a>

#### Cấu hình signing trong gradle

> Tham khảo: <a href="https://docs.flutter.dev/deployment/android#configure-signing-in-gradle" target="_blank">android#configure-signing-in-gradle</a>
