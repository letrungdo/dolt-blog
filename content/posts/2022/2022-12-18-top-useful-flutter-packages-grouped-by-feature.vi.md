---
template: "post"
title: "Top thư viện Flutter hữu ích được phân loại theo tính năng"
date: 2022-12-18T21:22:00+07:00
author: letrungdo
slug: "top-useful-flutter-packages-grouped-by-feature"
lang: "vi"
cover: "../../images/2022/12/useful-flutter-packages.jpeg"
keywords: "flutter packages, flutter webview, flutter pdf viewer"
categories:
  - Flutter
tags:
  - Flutter
---

Với một tính năng nhất định, có thể có nhiều package cho bạn lựa chọn. Làm sao để tìm đúng thư viện triển khai nhanh chóng và ít lỗi. Mình sẽ phân loại chúng dựa trên kinh nghiệm làm việc.

## 1. Trình xem PDF Flutter (Flutter PDF Viewer)

- Package: <a href="https://pub.dev/packages/flutter_pdfview" target="_blank" rel="nofollow noopener noreferrer">flutter_pdfview</a>

#### Ưu điểm:

Xử lý được hyperlink

#### Nhược điểm:

Dung lượng APK quá lớn.

- Tham khảo: <a href="https://github.com/endigo/flutter_pdfview/issues/183" target="_blank" rel="nofollow noopener noreferrer">endigo/flutter_pdfview/issues/183</a>

### Thiết lập:

```dart
PDFView(
  pageFling: false,
  pageSnap: false,
  filePath: _remotePDFpath,
  onRender: (_) {
   // Stop loading
  },
  // onError, onPageError (Chỉ Android)
  // https://github.com/endigo/flutter_pdfview/blob/780a3d30e27c6a0610f9ad74630d6155fe4ee355/CHANGELOG.md#1005
  onError: (error) {
    debugPrint("onError ${error.toString()}");
    _handleError();
  },
  onPageError: (page, error) {
    debugPrint("onPageError ${error.toString()}");
    _handleError();
  },
  preventLinkNavigation: true,
  onLinkHandler: (uri) {
    debugPrint("onLinkHandler $uri");
    if (uri == null || uri.isEmpty) return;
    launchUrl(Uri.parse(uri), mode: LaunchMode.platformDefault);
  },
  onViewCreated: (PDFViewController controller) {
    if (Platform.isIOS) {
      // Sửa lỗi: cuộn lên đầu lúc khởi tạo
      Future.delayed(const Duration(milliseconds: 50), () {
        controller.setPage(0);
      });
    }
  },
  autoSpacing: Platform.isIOS,
),
```

#### Tải xuống tệp:

```dart
Future<File?> _createFileOfPdfUrl(String url) async {
  try {
    var res = await http.get(Uri.parse(url));
    if (res.statusCode != 200 || res.body.startsWith("<?xml version=") || res.body.startsWith("<!DOCTYPE html")) {
      throw Exception('statusCode ${res.statusCode}_${res.reasonPhrase}');
    }
    final filePath = await _getPdfFilePath;
    File file = File(filePath);
    await file.writeAsBytes(res.bodyBytes, flush: true);
    return file;
  } catch (e) {
    debugPrint(e.toString());
    return null;
  }
}
```

## 2. Flutter Webview

- Package: <a href="https://pub.dev/packages/webview_flutter" target="_blank" rel="nofollow noopener noreferrer">webview_flutter</a>

#### Ưu điểm:

Thư viện webview chính thức của Flutter

#### Nhược điểm:

- Ít tính năng đặc thù cho từng nền tảng

#### - Không có chế độ singleton trong webview_flutter iOS

- Tham khảo: <a href="https://github.com/flutter/flutter/issues/94591" target="_blank" rel="nofollow noopener noreferrer">flutter/issues/94591</a>

- Bản vá: <a href="https://github.com/guide-flutter/plugins/tree/webview_flutter_wkwebview" target="_blank" rel="nofollow noopener noreferrer">guide-flutter/plugins/tree/webview_flutter_wkwebview</a>

#### - Android setTextZoom, setMinimumFontSize

- Bản vá: <a href="https://github.com/guide-flutter/plugins/tree/webview_flutter_android" target="_blank" rel="nofollow noopener noreferrer">guide-flutter/plugins/tree/webview_flutter_android</a>

Thêm mã bên dưới vào pubspec.yaml để áp dụng bản vá:

```yaml
dependency_overrides:
  webview_flutter_android:
    git:
      url: https://github.com/guide-flutter/plugins.git
      path: packages/webview_flutter/webview_flutter_android
      ref: webview_flutter_android
  webview_flutter_wkwebview:
    git:
      url: https://github.com/guide-flutter/plugins.git
      path: packages/webview_flutter/webview_flutter_wkwebview
      ref: webview_flutter_wkwebview
```

#### Phân tích cookie trong header phản hồi HTTP

- Tham khảo: <a href="https://zenn.dev/kato_shinya/articles/how-to-handle-multiple-set-cookie-with-dart" target="_blank" rel="nofollow noopener noreferrer">how-to-handle-multiple-set-cookie-with-dart</a>

```dart
String _getSetCookie(final Map<String, dynamic> headers) {
  for (final key in headers.keys) {
    if (key.toLowerCase() == 'set-cookie') {
      return headers[key] as String;
    }
  }

  return '';
}
```

```dart
final _regexSplitSetCookies = RegExp(
  r"""(?<!expires=\w{3}|"|')\s*,\s*(?!"|')""",
  caseSensitive: false,
);
List<Cookie> fromCookiesString(String? cookiesString) {
  final cookieList = cookiesString?.split(_regexSplitSetCookies) ?? [];
  final List<Cookie> cookies = [];
  for (var e in cookieList) {
    try {
      final cookie = Cookie.fromSetCookieValue(e);
      cookie.domain ??= Constants.DomainUrl;
      cookies.add(cookie);
      debugPrint("__cookie ${cookie.name}:${cookie.secure}");
    } catch (e) {
      debugPrint(e.toString());
    }
  }
  return cookies;
}
```

#### Thiết lập cookie cho Webview

Cần sử dụng package bên thứ ba: <a href="https://pub.dev/packages/webview_cookie_manager" target="_blank" rel="nofollow noopener noreferrer">webview_cookie_manager</a>

```dart
Future<void> _syncCookies(List<Cookie> cookies) async {
  final cookieManager = WebviewCookieManager();
  if (Platform.isAndroid) {
    await cookieManager.clearCookies();

    final gCookieDomain = groupBy(cookies, (c) => c.domain);
    for (var domain in gCookieDomain.keys) {
      final cks = gCookieDomain[domain] ?? [];
      final gCookieSecure = groupBy(cks, (c) => c.secure);

      for (var isSecure in gCookieSecure.keys) {
        final ckks = gCookieSecure[isSecure]?.toList() ?? [];
        if (ckks.isNotEmpty) {
          debugPrint("_______Cookie: ${ckks.toString()}");
          await cookieManager.setCookies(ckks, origin: isSecure ? 'https://$domain' : null);
        }
      }
    }
  } else {
    await cookieManager.setCookies(cookies);
  }
}
```

## 3. Phát hiện Jailbreak hoặc Root trong Flutter

- Package: <a href="https://pub.dev/packages/flutter_jailbreak_detection" target="_blank" rel="nofollow noopener noreferrer">flutter_jailbreak_detection</a>

#### Bản vá đường dẫn:

```yaml
flutter_jailbreak_detection:
  git:
    url: https://github.com/guide-flutter/flutter_jailbreak_detection.git
```

## 4. Tự động tạo Icon cho ứng dụng Flutter

- Package: <a href="https://pub.dev/packages/flutter_launcher_icons" target="_blank" rel="nofollow noopener noreferrer">flutter_launcher_icons</a>

#### Cấu hình yaml

```yaml
# gen app icon
flutter_icons:
  android: true
  image_path_ios: "assets/icon/icon_ios.png"
  image_path_android: "assets/icon/icon_android.png"
  min_sdk_android: 23
  adaptive_icon_background: "#ffffff"
  adaptive_icon_foreground: "assets/icon/icon_adaptive_foreground.png"

  ios: true
  remove_alpha_ios: true
```

## 5. Giao diện Flutter hiển thị hợp lý trên nhiều kích thước màn hình

- Package: <a href="https://pub.dev/packages/flutter_screenutil" target="_blank" rel="nofollow noopener noreferrer">flutter_screenutil</a>

### Cảnh báo: Không sử dụng ScreenUtilInit cho từng trang riêng lẻ, việc này sẽ gây lỗi nếu trang đó có ô nhập liệu text

```dart
import 'dart:ui' as ui;

@override
Widget build(BuildContext context) {
  return ScreenUtilInit(
    designSize: Size(375, 812 + MediaQueryData.fromWindow(ui.window).padding.bottom),
    minTextAdapt: true,
    builder: (BuildContext context, Widget? child) {
      return MaterialApp.router(
        builder: (context, child) {
          return MediaQuery(
            data: MediaQuery.of(context).copyWith(textScaleFactor: 1.0, boldText: false),
            child: child ?? const SizedBox.shrink(),
          );
        },
      );
    },
  );
```
