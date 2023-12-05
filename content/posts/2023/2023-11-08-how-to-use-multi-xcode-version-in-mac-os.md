---
template: "post"
title: How to use multi Xcode version in macOs
date: 2023-11-08T10:20:00+07:00
author: letrungdo
slug: "how-to-use-multi-xcode-version-in-mac-os"
cover: "../../images/2023/09/multi-xcode-version.jpg"
keywords: "multi Xcode version"
categories:
  - Flutter
tags:
  - Xcode
---

### Cách dùng các version Xcode cũ trên macOS version mới

1. Tải Xcodes từ <a href="https://github.com/XcodesOrg/XcodesApp" target="_blank">github.com/XcodesOrg/XcodesApp</a>

   - Tải qua Xcodes sẽ nhanh hơn (up to 16 connections) và có thể retry khi network error

2. Chọn version Xcode muốn cài rồi tải về, xong nhấn active là có thể run build qua version Xcode đã chọn đó.

Có thể không làm theo #1 #2 mà tự tìm nguồn tải về rồi select version Xcode qua terminal bằng lệnh sau:

Ví dụ Xcode của bạn có version Xcode-14.1.0

```bash
sudo xcode-select -s /Applications/Xcode-14.1.0.app
```

Do macOS mới chặn mở Xcode trực tiếp khi open qua app icon, nên để mở Xcode phải chạy qua terminal bằng lệnh sau:

```bash
/Applications/Xcode-14.1.0.app/Contents/MacOS/Xcode
```
