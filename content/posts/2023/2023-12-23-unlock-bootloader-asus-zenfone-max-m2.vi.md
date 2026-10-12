---
template: "post"
title: "Unlock bootloader Asus Zenfone Max M2"
date: 2023-12-23T20:15:00+07:00
author: letrungdo
slug: "unlock-bootloader-asus-zenfone-max-m2"
lang: "vi"
cover: "../../images/2023/12/unlock-bootloader-zenfone-max-m2.jpg"
keywords: "Unlock bootloader Asus"
categories:
  - Phones
tags:
  - Custom ROM
---

Hiện tại Asus Zenfone Max M2 chỉ dừng lại ở Android 9. Công cụ mở khóa bootloader chính thức cũng đã bị Asus gỡ khỏi trang chủ, nên mình chia sẻ cách mở khóa bootloader cho Asus Zenfone Max M2 / Pro M2 bằng dòng lệnh.

#### Unlock bootloader Asus Zenfone Max M2 / Pro M2

Tải file <a href="https://drive.google.com/file/d/1qBeRUYEtNdifoNg5m6DU7dfh2DqtG2eh/view?usp=sharing" target="_blank">unlock.zip</a>

Kết nối thiết bị với laptop/pc qua usb & bật gỡ lỗi usb (usb debug).

Sau đó giải nén unlock.zip và chạy:

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
> chạy unlock.cmd

> Tham khảo: <a href="https://xdaforums.com/t/unlook-bootloader-asus-zenfone-max-m2-unofficial.3886206/" target="_blank">unlook-bootloader-asus-zenfone-max-m2-unofficial</a>

#### Cài đặt custom ROM cho Asus Zenfone Max M2

Nói về custom ROM, mình lập tức nghĩ đến Pixel Experience ROM. ROM này là Android thuần Google nên nó mượt mà như ROM trên Google Pixel.
Link tải và hướng dẫn cài đặt custom recovery ở bên dưới:

<a href="https://get.pixelexperience.org/X01AD" target="_blank">Tải ROM</a> |
<a href="https://wiki.pixelexperience.org/devices/X01AD/install/" target="_blank">Custom recovery</a>
