---
template: "post"
title: Unlock bootloader Asus Zenfone Max M2
date: 2023-12-23T20:15:00+07:00
author: letrungdo
slug: "unlock-bootloader-asus-zenfone-max-m2"
cover: "../../images/2023/12/unlock-bootloader-zenfone-max-m2.jpg"
keywords: "Unlock bootloader Asus"
categories:
  - Phones
tags:
  - Custom ROM
---

Currently, Asus Zenfone Max M2 only stops at Android 9. And the bootloader unlock tool was also removed from the homepage by Asus, so I share how to unlock bootloader for Asus Zenfone Max M2 / Pro M2 via command line.

#### Unlock bootloader Asus Zenfone Max M2 / Pro M2

Download file <a href="https://drive.google.com/file/d/1qBeRUYEtNdifoNg5m6DU7dfh2DqtG2eh/view?usp=sharing" target="_blank">unlock.zip</a>

Connect device with laptop/pc via usb & enable usb debug.

Then unzip unlock.zip and run

```bash
adb reboot bootloader
cd /path/to/unlock
```

> MacOS

```bash
chmod +x unlock.sh
unlock.sh
```

> Windows
> run unlock.cmd

> ref: <a href="https://xdaforums.com/t/unlook-bootloader-asus-zenfone-max-m2-unofficial.3886206/" target="_blank">unlook-bootloader-asus-zenfone-max-m2-unofficial</a>

#### Install custom ROM for Asus Zenfone Max M2

Talking about custom ROM, I immediately think of Pixel Experience ROM. This ROM is pure Google so it's as smooth as the Google Pixel ROM
Download link and instructions for installing custom recovery are below

<a href="https://get.pixelexperience.org/X01AD" target="_blank">ROM download</a> |
<a href="https://wiki.pixelexperience.org/devices/X01AD/install/" target="_blank">Custom recovery</a>
