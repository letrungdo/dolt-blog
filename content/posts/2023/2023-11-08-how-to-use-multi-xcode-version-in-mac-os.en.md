---
template: "post"
title: How to use multi Xcode version in macOS
date: 2023-11-08T10:20:00+07:00
author: letrungdo
slug: "how-to-use-multi-xcode-version-in-mac-os"
lang: "en"
cover: "../../images/2023/09/multi-xcode-version.jpg"
keywords: "multi Xcode version"
categories:
  - Flutter
tags:
  - Xcode
---

### How to use older Xcode versions on new macOS versions

1. Download Xcodes from <a href="https://github.com/XcodesOrg/XcodesApp" target="_blank">github.com/XcodesOrg/XcodesApp</a>

   - Downloading via Xcodes will be faster (up to 16 connections) and can retry when experiencing network errors

2. Select the Xcode version you want to install and download it, then click active so you can run builds using that selected Xcode version.

Alternatively, instead of following #1 and #2, you can find a download source yourself and select the Xcode version via terminal using the following command:

For example, if your Xcode version is Xcode-14.1.0:

```bash
sudo xcode-select -s /Applications/Xcode-14.1.0.app
```

Because newer macOS blocks opening Xcode directly when opening via app icon, to open Xcode you must run it via terminal using the following command:

```bash
/Applications/Xcode-14.1.0.app/Contents/MacOS/Xcode
```
