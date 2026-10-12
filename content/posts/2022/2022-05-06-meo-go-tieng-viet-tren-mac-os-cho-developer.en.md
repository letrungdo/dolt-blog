---
template: "post"
title: Tips for Vietnamese Input Method on macOS for Developers
date: 2022-05-06T23:12:00+07:00
author: letrungdo
slug: "meo-go-tieng-viet-tren-mac-os-cho-developer"
lang: "en"
cover: "../../images/2022/05/loi-go-tieng-viet-tren-mac-os.jpg"
keywords: "vietnamese input error macos, exclude apps vietnamese input"
categories:
  - Tricks
tags:
  - VSCode
---

Currently, the default Vietnamese input engine on macOS has quite a few annoying bugs.
Today, I will guide you on how to fix this Vietnamese typing error by using an alternative app.

After trying out various apps, EVKey turned out to be the top choice that fixes almost all typing glitches.
In addition, it allows automatic application exclusion, so you don't need to manually toggle Vietnamese input on and off.

### Steps to Install Vietnamese Input Method on macOS

- Download EVKey at this address: <a href="https://evkeyvn.com" target="_blank" rel="nofollow noopener noreferrer">https://evkeyvn.com</a>

- Delete the default input method

<img class="size-full" src="/media/2022/05/xoa-bo-go-mac-dinh.jpg" alt="Delete default input method" />

### Configure the Input Method with the Following Steps

<img class="size-full" src="/media/2022/05/cai-dat-go-tieng-viet.jpg" alt="Input method configuration" />

1. Open EVKey and switch to the System tab
2. Select start with OS and uncheck "Show dialog on startup" so that when turning on the computer, this window won't pop up.
3. App exclusion is a very useful feature for developers.
4. Select apps where Vietnamese typing should be disabled to exclude them, then save.
