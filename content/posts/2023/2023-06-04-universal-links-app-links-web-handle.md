---
template: "post"
title: Universal links App links - Web handle
date: 2023-06-04T10:11:20+07:00
author: letrungdo
slug: "universal-links-app-links-web-handle"
cover: "../../images/2023/06/universal_links_app_links.jpg"
keywords: "Universal links, App links"
categories:
  - Web
tags:
  - Universal links, App links
---
Bài viết này sẽ hướng dẫn các bạn viết một hệ thống đơn giản tương tự Firebase Dynamic Links.
Mục đính handle việc click link sẽ mở App store (iOS) or Play store (Android) nếu app chưa được cài đặt vào device, ngược lại nếu đã cài app thì nhấn link sẽ mở app.

Do Universal links support từ iOS 9 trở lên.
App Links support từ Android 6.0 trở lên nên bài viết này chỉ support các OS nêu trên.

### I. Handle App links open Play store

```js
const androidPackageName="yourAndroidPackageName"
const uniDomain="https://myownpersonaldomain.com"
<a href={`intent://${uniDomain}#Intent;package=${androidPackageName};scheme=https;S.browser_fallback_url=https://play.google.com/store/apps/details?id=${androidPackageName};end`}>Open</a>;
```

Ở link trên khi nhấn link thì trình duyệt sẽ tự mở Play store nếu chưa cài app.

### II. Handle Universal links open App store
Đối với iOS thì browser không support tự detect như Android.
Khi nhấn vào link, nếu app chưa cài thì browser sẽ mở link đó luôn. Nếu app đã cài thì browser không mở link mà chỉ mở app.

=> Từ đó thì chúng ta cần viết thêm code cho đích chuyển đến của link.

> Ex: Trang fallback đơn giản sau sẽ redirect đến link App store
> Link: 

```html
<!DOCTYPE html>
<html>
  <meta http-equiv="refresh" content="0; url=https://apps.apple.com/app/id1661234567?mt=8" />
  <title>Universal links fallback</title>
  <head> </head>
  <body>
  </body>
</html>
```

> Source tham khảo: 
<a href="https://github.com/letrungdo/uni_links_web" target="_blank">github.com/letrungdo/uni_links_web</a>
