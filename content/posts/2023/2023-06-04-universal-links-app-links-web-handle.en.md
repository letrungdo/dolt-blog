---
template: "post"
title: Universal links App links - Web handle
date: 2023-06-04T10:11:20+07:00
author: letrungdo
slug: "universal-links-app-links-web-handle"
lang: "en"
cover: "../../images/2023/06/universal_links_app_links.jpg"
keywords: "Universal links, App links"
categories:
  - Web
tags:
  - Universal links, App links
---
This article will guide you to write a simple system similar to Firebase Dynamic Links.
The purpose is to handle link clicks opening App Store (iOS) or Play Store (Android) if the app is not installed on the device; conversely, if the app is installed, clicking the link opens the app.

Since Universal Links are supported on iOS 9 and above,
and App Links are supported on Android 6.0 and above, this article only supports those OS versions mentioned above.

### I. Handle App links open Play store

```js
const androidPackageName="yourAndroidPackageName"
const uniDomain="https://myownpersonaldomain.com"
<a href={`intent://${uniDomain}#Intent;package=${androidPackageName};scheme=https;S.browser_fallback_url=https://play.google.com/store/apps/details?id=${androidPackageName};end`}>Open</a>;
```

In the link above, when clicked, the browser will automatically open Play Store if the app is not installed.

### II. Handle Universal links open App store
For iOS, the browser does not support auto-detect like Android.
When clicking the link, if the app is not installed, the browser opens that link directly. If the app is installed, the browser does not open the link but opens the app directly.

=> Therefore, we need to write additional code for the target destination of the link.

> Ex: The following simple fallback page will redirect to the App Store link
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

> Reference source: 
<a href="https://github.com/letrungdo/uni_links_web" target="_blank">github.com/letrungdo/uni_links_web</a>
