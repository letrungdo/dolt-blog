---
template: "post"
title: How to disable auto backup in Flutter app
date: 2023-08-16T11:00:00+07:00
author: letrungdo
slug: "how-to-disable-auto-backup-in-flutter-app"
cover: "../../images/2023/08/turn-off-auto-backup.jpg"
keywords: "Turn off auto backup iOS, Turn off auto backup Android, Turn off auto backup Flutter"
categories:
  - Flutter
tags:
  - Turn off auto backup
---
Cách turn of tính năng Auto Backup (Storage data). Khi thay đổi loại device, không muốn cho migrate nội dung của storage lúc khôi phục từ backup.

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
1. Chuẩn bị 2 device iphone (Device A và device B). Lưu ý device A phải có version iOS thấp hơn hoặc bằng version iOS của device B.
2. Đăng nhập iCloud vào device A, sau đó cài app qua TestFlight.
3. Reset factory device B và login vào cùng iCloud với device A (đối với setup manual). Hoặc để device B cạnh device A để auto setup.
4. Chọn khôi phục từ device gần bên hoặc khôi phục từ iCloud.
5. Ở device B, sau khi khôi phục xong thì cài lại app từ TestFlight

> Ps:
■ Về iOS cách backup Transfer directly from iPhone Device A　→ Device B thì sẽ có 3 loại như sau:

- ① Backup thông qua iCloud
- ② Transfer trực tiếp từ iPhone sang iPhone
- ③ Backup thông qua Mac

■ Về cách ①②, có thể chặn không cho migrate app data theo đối ứng [Turn off auto backup iOS](#2-turn-off-auto-backup-ios) ở trên.

■ Về cách ③ app data vẫn bị transfer・・・・・・・A

=> Nếu bạn dùng `flutter_secure_storage` thì cần config thêm option này:
```dart
IOSOptions _getIOSOptions() => const IOSOptions(accessibility: KeychainAccessibility.first_unlock_this_device);
```

> Cách test case ③:
- Back up: https://support.apple.com/en-vn/guide/iphone/iph3ecf67d29/ios
- Restore: https://support.apple.com/en-us/HT201252
