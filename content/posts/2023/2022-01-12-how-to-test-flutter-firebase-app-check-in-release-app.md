---
template: "post"
title: How to test flutter firebase app check in release app
date: 2023-01-12T16:22:00+07:00
author: letrungdo
slug: "how-to-test-flutter-firebase-app-check-in-release-app"
cover: "../../images/2023/01/flutter-firebase-app-check.jpeg"
keywords: "flutter firebase app check, firebase app check"
categories:
  - Flutter
tags:
  - Flutter
---

To make sure when releasing to the app store or play store, the app check works properly, then we need to check to get the token successfully when the app build is in release mode.

If you use flutter <a href="https://pub.dev/packages/firebase_app_check" target="_blank">firebase_app_check</a> library, please note the following issues

Flutter firebase_app_check, using the default providers: Play Integrity on Android, Device Check on Apple platforms.

However, in the old version firebase_app_check 0.0.9+1, on Android using Safety Net provider.
Safety Net provider is deprecated and will be removed in a future release. Play Integrity is the recommended provider.

> Implement code:

```dart
// init
await Firebase.initializeApp();
await FirebaseAppCheck.instance.activate(
  androidProvider: kDebugMode ? AndroidProvider.debug : AndroidProvider.playIntegrity,
);

// get appCheckToken
String? appCheckToken;
try {
  appCheckToken = await FirebaseAppCheck.instance.getToken();
} catch (e) {}
debugPrint("appCheckToken: $appCheckToken");
```

### Using App Check with DeviceCheck on iOS

Note that flutter ios uses Device Check not App Attest

> ref: <a href="https://firebase.google.com/docs/app-check/ios/devicecheck-provider?authuser=1&hl=en" target="_blank">docs/app-check/ios/devicecheck-provider</a>

### Using App Check with Play Integrity on Android

Note that flutter android uses Play Integrity not Safety Net

> ref: <a href="https://firebase.google.com/docs/app-check/android/play-integrity-provider?authuser=1&hl=en" target="_blank">docs/app-check/android/play-integrity-provider</a>

AppCheck Play Integrity can only get tokens successfully if installed through play store. If you install it directly from the apk or through the app center..., you cannot get the token.
As for Safety Net, you can get the token successfully even if you install it directly from the apk.

In <a href="https://play.google.com/console" target="_blank">play.google.com/console</a>, after linking with firebase project in <b>App integrity</b>, you need to create an <b>Internal testing</b> to be able to install app from play store and can get token successfully.


# Related content

#### Create an upload keystore

> ref: <a href="https://docs.flutter.dev/deployment/android#create-an-upload-keystore" target="_blank">android#create-an-upload-keystore</a>

#### Reference the keystore from the app

> ref: <a href="https://docs.flutter.dev/deployment/android#reference-the-keystore-from-the-app" target="_blank">android#reference-the-keystore-from-the-app</a>

#### Configure signing in gradle

> ref: <a href="https://docs.flutter.dev/deployment/android#configure-signing-in-gradle" target="_blank">android#configure-signing-in-gradle</a>
