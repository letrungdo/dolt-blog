---
title: 'Cài đặt Wifi Marketing cho Router rẻ tiền &#8211; Dùng Nodogsplash'
date: 2017-06-25T13:27:09+07:00
author: letrungdo
template: "post"
slug: "cai-dat-wifi-marketing-cho-router-re-tien"
cover: "../images/2017/06/wifi-maketing-voi-nodogsplash.png"
categories:
  - Tricks
tags:
  - 'Error: No such file or directory'
  - Nodogsplash
  - nodogsplash probably not started
  - Wifi
  - Wifi Marketing
---
<a href="/tag/wifi-marketing/" target="_blank" rel="noopener"><strong>Wifi Marketing</strong></a> là hình thức quảng cáo thông qua Wifi. Khi kết nối vào WiFi thì bạn sẽ được dẫn tới 1 trang web có chứa hình ảnh, nội dung quảng cáo. Để dùng được wifi thì bạn cần bấm vào quảng cáo hoặc một số hình thức đăng nhập khác... Với các Router loại thường thì firmware gốc của nhà sản xuất không có tính năng Wifi Marketing. Vì vậy bài viết này sẽ giúp các bạn **cài đặt Wifi Marketing** cho modem router của mình.

# Cài firmware OpenWRT cho router

Firmware **OpenWRT** hiểu đơn giản là một hệ điều hành quản lý router, có nhiều tính năng hơn firmware gốc của nhà sản xuất.

Trang chủ: <a href="https://openwrt.org/" target="_blank" rel="noopener">https://openwrt.org/</a>

Danh sách các thiết bị hỗ trợ: <a href="https://wiki.openwrt.org/toh/start" target="_blank" rel="noopener">https://wiki.openwrt.org/toh/start</a>

Các bạn phải xác đúng tên và phiên bản của router.

Các bước để cài firmware các bạn có thể tự tìm hiểu.

_**Một số ý chính:**_

Firmware OpenWRT có tên file dạng ".....squashfs-factory.bin" dành để update từ firmware gốc lên.

File có tên dạng ".....squashfs-sysupgrade.bin" để **cài lại firmware gốc** khi đang ở firmware OpenWrt

**Lưu ý**: Khi update phải đổi tên firmware thành tên ngắn lại mới update được.

_Ví dụ_: **openwrt-15.05.1-ar71xx-generic-tl-wr941nd-v5-squashfs-factory.bin** đổi lại thành **factory.bin**

# Cài đặt Wifi Marketing cho Router

## Cài nodogsplash

**Nodogsplash** là gói phần mềm cho phép tạo trang wifi marketting để đăng nhập vào wifi.

Cài nodogsplash qua SSH như sau:

Tải **PuTTY** để chạy lện SSH ở đây: <a href="https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html" target="_blank" rel="noopener">https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html</a>

Mở PuTTY và nhập hostname: Host name tùy vào bạn đặt IP của router, thường là 192.168.1.1

Chọn loại kết nối là SSH > Open

<img class="aligncenter size-full" src="/media/2017/06/putty-login-router-ssh.png" alt="" /> 

Bạn nhập pass xong sẽ ra giao diện như bên dưới.

<img class="aligncenter size-full" src="/media/2017/06/root-openwrt.png" alt="" /> 

Để cài nodogsplash, bạn nhập lần lượt từng lệnh và nhấn Enter

<pre>opkg update</pre>

<pre>opkg install nodogsplash</pre>

**Một số lệnh cho nodogsplash**

  * Cho phép nodogsplash chạy khi router khởi động:

<pre>/etc/init.d/nodogsplash enable</pre>

  * Thay đổi một số thiết lập của Nodogsplash:

<pre>vim /etc/nodogsplash/nodogsplash.conf</pre>

  * Khởi động nodogsplash:

<pre>/etc/init.d/nodogsplash start</pre>

  * Dừng nodogsplash:

<pre>/etc/init.d/nodogsplash stop</pre>

  * Gỡ cài đặt nodogsplash:

<pre>opkg remove nodogsplash</pre>

  * Xem tình trạng của nodogsplash:

<pre><span class="crayon-e">ndsctl </span><span class="crayon-e">status</span></pre>

### Cấu hình Nodogsplash {#nodogsplash_configuration_file}

Các phiên bản cũ sẽ dùng /etc/nodogsplash/nodogsplash.conf.

Bản 0.9_beta9.9.9-5 của Chaos Calmer 15.05 dùng /etc/config/nodogsplash.

<div>
  <p>
    Bạn có thể dùng cấu hình cũ bằng cách xóa #trước dòng
  </p>
  
  <p>
    #option config '/etc/nodogsplash/nodogsplash.conf' và copy file nodogsplash.conf từ <a href="https://github.com/nodogsplash/nodogsplash/blob/master/resources/nodogsplash.conf" target="_blank" rel="noopener">đây</a> về chỉnh sửa cho phù hợp.
  </p>
</div>

## Lỗi nodogsplash probably not started (Error: No such file or directory)

Bạn cần tải phần mềm <a href="https://winscp.net/eng/download.php" target="_blank" rel="noopener"><strong>WinSCP</strong> </a>để truy cập vào host trên router để chỉnh sửa file bên trong router.

Chọn File Protocol là **SCP**, nhập hostname, user name và pass. Nhấn Save rồi Login.

<img class="aligncenter size-full" src="/media/2017/06/login-router.png" alt="" /> 

Tìm đến thư mục** /etc/config **mở file **nodogsplash** và tìm đến dòng sau:

<pre># Set to 1 to enable nodogsplash
 option enabled 0</pre>

Sửa **option enabled 0** thành **option enabled 1** rồi lưu lại.

## Chỉnh sửa giao diện wifi marketing

Vào thư mục **/etc/nodogsplash/htdocs** để chỉnh lại giao diện .html cho phù hợp.

_Lưu ý_: Nodogsplash sử dụng web server không hỗ trợ css, js nên bạn không bỏ file css, js trong thư mục /etc/nodogsplash/htdocs/ được.

Nên cần bỏ js và css trong thư mục **/www/nodogsplash-static**. Và phải cấu hình lại file **nodogsplash.conf **trong thư mục /etc/nodogsplash/

**FirewallRuleSet preauthenticated-users**: là cho phép dùng các dịch vụ web nào khi chỉ mới kết nối vào wifi, chưa chưa đăng nhập vào wifi từ trang **splash.html.**

  * FirewallRule allow tcp port 80 to **192.168.0.1**

Thay 192.168.1.1 thành IP router của bạn.

_Tham khảo_:

<div id="crayon-594f4b607972d829043135" class="crayon-syntax crayon-theme-vs2012 crayon-font-droid-sans-mono crayon-os-pc print-yes notranslate crayon-wrapped" data-settings=" minimize scroll-always wrap">
  https://github.com/nodogsplash/nodogsplash
</div>

<div data-settings=" minimize scroll-always wrap">
  https://wiki.openwrt.org/doc/howto/wireless.hotspot.nodogsplash
</div>