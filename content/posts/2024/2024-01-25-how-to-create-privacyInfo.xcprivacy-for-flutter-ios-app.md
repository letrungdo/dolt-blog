---
template: "post"
title: How to create PrivacyInfo.xcprivacy file for Flutter iOS app
date: 2024-01-25T9:30:00+07:00
author: letrungdo
slug: "how-to-create-privacyInfo.xcprivacy-for-flutter-ios-app"
cover: "../../images/2024/01/privacy_manifest_files.jpg"
keywords: "Privacy manifest file"
categories:
  - Flutter
---

Privacy manifest file, named PrivacyInfo.xcprivacy has been mentioned at <a href="https://developer.apple.com/documentation/bundleresources/privacy_manifest_files" target="_blank">developer.apple.com/documentation/bundleresources/privacy_manifest_files</a>

### 1. Create default PrivacyInfo.xcprivacy file for Flutter iOS app

<a href="https://github.com/flutter/engine/blob/main/shell/platform/darwin/ios/framework/PrivacyInfo.xcprivacy" target="_blank">This is the file</a> that Flutter has compiled and put into Flutter.framework, so my app will take all of this content and put it into PrivacyInfo.xcprivacy

> ref: <a href="https://github.com/flutter/flutter/issues/131494" target="_blank">flutter/issues/131494</a>

### 2. Scans the given directory for possible use of "iOS required reason API"

Download file required_reason_api_scanner.sh and run command

```sh
sh required_reason_api_scanner.sh directory_name
```

> For paths starting with ios/Pods, they can be ignored and do not need to be analyzed.
> Analysis results will be based on <a href="https://developer.apple.com/documentation/bundleresources/privacy_manifest_files/describing_use_of_required_reason_api" target="_blank">describing_use_of_required_reason_api</a> and add to PrivacyInfo.xcprivacy

> ref: <a href="https://github.com/Wooder/ios_17_required_reason_api_scanner" target="_blank">github.com/Wooder/ios_17_required_reason_api_scanner</a>
