---
template: "post"
title: How to disable auto backup in Flutter app
date: 2023-08-16T11:00:00+07:00
author: letrungdo
slug: "how-to-disable-auto-backup-in-flutter-app"
lang: "en"
cover: "../../images/2023/08/turn-off-auto-backup.jpg"
keywords: "Turn off auto backup iOS, Turn off auto backup Android, Turn off auto backup Flutter"
categories:
  - Flutter
tags:
  - Turn off auto backup
---
How to turn off the Auto Backup feature (Storage data). When changing devices, preventing storage data migration during restore from backup.

## 1. Turn off auto backup Android
Edit `android/app/src/main/AndroidManifest.xml`

```xml
<application
    android:allowBackup="false"
    android:fullBackupContent="false"
    android:dataExtractionRules="@xml/data_extraction_rules"
    ...
```

Create new file `android/app/src/main/res/xml/data_extraction_rules.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
    <cloud-backup>
        <exclude domain="root" />
        <exclude domain="file" />
        <exclude domain="database" />
        <exclude domain="sharedpref" />
        <exclude domain="external" />
    </cloud-backup>
    <device-transfer>
        <exclude domain="root" />
        <exclude domain="file" />
        <exclude domain="database" />
        <exclude domain="sharedpref" />
        <exclude domain="external" />
    </device-transfer>
</data-extraction-rules>
```

## 2. Turn off auto backup iOS
Edit `ios/Runner/AppDelegate.swift`

```swift
@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {
    ...

    // Disable iCloud backup
    disableICloudBackup()

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  private func disableICloudBackup() {
      do {
          try setExcludeFromICloudBackup(filePath: NSHomeDirectory() + "/Library")
          try setExcludeFromICloudBackup(filePath: NSHomeDirectory() + "/Documents")
      } catch {
          print("Couldn't disable iCloud Backup")
      }
  }
    
  private func setExcludeFromICloudBackup(filePath: String) throws {
      let url = NSURL.fileURL(withPath: filePath) as NSURL
      try url.setResourceValue(true, forKey: URLResourceKey.isExcludedFromBackupKey)
  }
}
```

## 3. How to test auto backup
1. Prepare 2 iPhone devices (Device A and Device B). Note that Device A must have an iOS version lower than or equal to Device B's iOS version.
2. Sign in to iCloud on Device A, then install the app via TestFlight.
3. Factory reset Device B and log in to the same iCloud account as Device A (for manual setup). Or place Device B next to Device A for auto setup.
4. Choose to restore from nearby device or restore from iCloud.
5. On Device B, after restore completes, reinstall the app from TestFlight.

> PS:
■ Regarding iOS backup methods for Transfer directly from iPhone Device A → Device B, there are 3 types:

- ① Backup via iCloud
- ② Direct transfer from iPhone to iPhone
- ③ Backup via Mac

■ For methods ① and ②, you can prevent app data migration following the [Turn off auto backup iOS](#2-turn-off-auto-backup-ios) solution above.

■ For method ③, app data still gets transferred...

=> If you use `flutter_secure_storage`, you need to configure this additional option:
```dart
IOSOptions _getIOSOptions() => const IOSOptions(accessibility: KeychainAccessibility.first_unlock_this_device);
```

> How to test case ③:
- Back up: https://support.apple.com/en-vn/guide/iphone/iph3ecf67d29/ios
- Restore: https://support.apple.com/en-us/HT201252
