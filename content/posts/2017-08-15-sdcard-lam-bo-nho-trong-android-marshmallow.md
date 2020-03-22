---
title: Dùng thẻ nhớ làm bộ nhớ trong cho Android Marshmallow
date: 2017-08-15T08:59:21+07:00
author: letrungdo
template: "post"
slug: "sdcard-lam-bo-nho-trong-android-marshmallow"
cover: "../images/2017/08/cach-dung-the-nho-lam-bo-nho-trong.png"
categories:
  - Phones
---
Trong Android 6.0 (Marshmallow) có thêm chức năng dùng thẻ nhớ như là bộ nhớ trong (Internal Mode) để cài ứng dụng. Các ứng dụng được di chuyển 100% dung lượng qua phân vùng thẻ nhớ này. Đặc biệt máy bạn không cần root hay cài các ứng dụng Link2SD hay Apps2SD. Trong một số máy đã ẩn đi tính năng này. Bài viết sẽ hướng dẫn bạn cách để kích hoạt tính năng **dùng thẻ nhớ làm bộ nhớ trong** cho các máy đã ẩn đi tính năng này.

## Dùng ADB viết lệnh kích hoạt dùng thẻ nhớ làm bộ nhớ trong

### Bước 1: Bật chế độ gỡ rối USB

Bạn phải kích tính năng nhà phát triển bằng cách vào phần **giới thiệu về điện thoại** bấm liên tục 7 lần vào dòng **số bản dựng**. Quay lại menu Cài đặt sẽ hiện lên mục Tùy chọn nhà phát triển. Bấm vào tìm gỡ rối USB và bật lên.

### Bước 2: Cài driver flashboot và ADB Driver

[Driver Flashtool](https://drive.google.com/file/d/0B8jAxVjd7NNoN0N1WEpfeHYwMDA/view?usp=sharing)

[Fastboot ADB](https://drive.google.com/file/d/0B_rW-FQMXTO7ZENXM3B3NUhBVmM/view)

[ADB Driver](https://drive.google.com/file/d/0B_rW-FQMXTO7a2k0Wm5pWDBhOTg/view)

### Bước 3: Dùng ADB chạy lần lượt các lệnh sau

<pre>adb devices</pre>

Chạy lệnh này trên điện thoại nhấn cho phép gỡ lỗi USB. Trên máy tính sẽ hiện tên thiết bị.

<pre>adb shell
sm list-disks</pre>

Lệnh này sẽ hiện dòng **disk:179,64** là thẻ nhớ của bạn

<pre>sm partition disk:179,64 mixed 50</pre>

Số 50 có nghĩa là dùng 50% dung lượng thẻ nhớ làm bộ nhớ trong cài apps.

<img class="aligncenter size-full" src="/media/2017/08/dung-the-nho-lam-bo-nho-trong.png" alt="" /> 

<img class="aligncenter size-full" src="/media/2017/08/cach-dung-the-nho-lam-bo-nho-trong.png" alt="" /> 

Như trên là 1 thẻ nhớ 16GB được chia làm 2 phân vùng. Phân vùng Thẻ SD của bộ nhớ thiết bị có định dạng là ext4 nên bạn cắm vào máy tính Windows sẽ không thấy phân vùng này.

## Chuyển ứng dụng vào thẻ nhớ vừa tạo

Mặc định các ứng dụng cho phép lưu vào thẻ nhớ thì khi cài sẽ tự động cài vào thẻ nhớ bạn vừa phân vùng.

Còn nếu máy bạn đã root thì vào Cài đặt > Ứng dụng: Chọn 1 app > Nhấn vào mục **Lưu trữ**. Chọn Thay đổi > Thẻ SD. Ứng dụng sẽ chuyển qua thẻ nhớ 100%.

Một số model nên áp dụng: <a href="/tag/sony-xperia/" target="_blank" rel="noopener"><strong>Sony Xperia M4 Aqua</strong></a>