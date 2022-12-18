---
template: "post"
title: Top useful Flutter packages grouped by feature
date: 2022-12-18T21:22:00+07:00
author: letrungdo
slug: "top-useful-flutter-packages-grouped-by-feature"
cover: "../../images/2022/12/useful-flutter-packages.jpeg"
keywords: "flutter packages, flutter webview, flutter pdf viewer"
categories:
  - Flutter
tags:
  - Flutter
---

With a certain feature, there can be many packages for you to choose from. How to find the right library that implements quickly and has few bugs. I will categorize them based on work experience.

## 1. Flutter PDF Viewer

- Package: <a href="https://pub.dev/packages/flutter_pdfview" target="_blank" rel="nofollow noopener noreferrer">flutter_pdfview</a>

#### Pros:

Hyperlink handle

#### Cons:

Apk size is too large.

- ref: <a href="https://github.com/endigo/flutter_pdfview/issues/183" target="_blank" rel="nofollow noopener noreferrer">endigo/flutter_pdfview/issues/183</a>

### Setup:

```dart
PDFView(
  pageFling: false,
  pageSnap: false,
  filePath: _remotePDFpath,
  onRender: (_) {
   // Stop loading
  },
  // onError, onPageError (Android only)
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
      // fix: init scroll top
      Future.delayed(const Duration(milliseconds: 50), () {
        controller.setPage(0);
      });
    }
  },
  autoSpacing: Platform.isIOS,
),
```

#### Download file:

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

#### Pros:

Official webview lib of Flutter

#### Cons:

- Few platform-specific features

#### - No singleton mode in webview_flutter iOS

- ref: <a href="https://github.com/flutter/flutter/issues/94591" target="_blank" rel="nofollow noopener noreferrer">flutter/issues/94591</a>

- path fix: <a href="https://github.com/guide-flutter/plugins/tree/webview_flutter_wkwebview" target="_blank" rel="nofollow noopener noreferrer">guide-flutter/plugins/tree/webview_flutter_wkwebview</a>

#### - Android setTextZoom, setMinimumFontSize

- path fix: <a href="https://github.com/guide-flutter/plugins/tree/webview_flutter_android" target="_blank" rel="nofollow noopener noreferrer">guide-flutter/plugins/tree/webview_flutter_android</a>

Add below code in pubspec.yaml to apply path fix

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

#### Parse cookies in headers of http response

- ref: <a href="https://zenn.dev/kato_shinya/articles/how-to-handle-multiple-set-cookie-with-dart" target="_blank" rel="nofollow noopener noreferrer">how-to-handle-multiple-set-cookie-with-dart</a>

```dart
String _getSetCookie(final Map<String, dynamic> headers) {
  for (final key in headers.keys) {
    // システムによって返却される "set-cookie" のケースはバラバラです。
    if (key.toLowerCase() == 'set-cookie') {
      return headers[key] as String;
    }
  }

  return '';
}
```

```dart
/// The regex pattern for splitting the set-cookie header.
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
      cookie.domain ??= Constants.DomainUrl; // need to set domain if cookie.domain = null
      cookies.add(cookie);
      debugPrint("__cookie ${cookie.name}:${cookie.secure}");
    } catch (e) {
      debugPrint(e.toString());
    }
  }
  return cookies;
}
```

#### Set cookies to Webview

Need to use third package: <a href="https://pub.dev/packages/webview_cookie_manager" target="_blank" rel="nofollow noopener noreferrer">webview_cookie_manager</a>

```dart
Future<void> _syncCookies(List<Cookie> cookies) async {
  final cookieManager = WebviewCookieManager();
  if (Platform.isAndroid) {
    // Clear old cookies avoid duplication, (iOS no need & iOS < 12.4 hangs app with clearCookies)
    await cookieManager.clearCookies();

    // https://pub.dev/packages/webview_cookie_manager#secure-attribute
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

## 3. Flutter Jailbreak or Root detection

- Package: <a href="https://pub.dev/packages/flutter_jailbreak_detection" target="_blank" rel="nofollow noopener noreferrer">flutter_jailbreak_detection</a>

#### Path fix:

```yaml
flutter_jailbreak_detection:
  git:
    url: https://github.com/guide-flutter/flutter_jailbreak_detection.git
```

## 4. Flutter Gen app icon

- Package: <a href="https://pub.dev/packages/flutter_launcher_icons" target="_blank" rel="nofollow noopener noreferrer">flutter_launcher_icons</a>

#### Config yaml

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

## 5. Flutter UI display a reasonable layout on different screen sizes

- Package: <a href="https://pub.dev/packages/flutter_screenutil" target="_blank" rel="nofollow noopener noreferrer">flutter_screenutil</a>

### Warning: Do not use ScreenUtilInit for individual pages, this will raise a bug if the page has an input text field

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
            // Setting font does not change with system font size
            data: MediaQuery.of(context).copyWith(textScaleFactor: 1.0, boldText: false),
            child: child ?? const SizedBox.shrink(),
          );
        },
      );
    },
  );
```
