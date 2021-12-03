---
title: Cài đặt Lets Encrypt Certificate trên Shared Hosting
date: 2018-12-30T11:46:57+07:00
author: letrungdo
template: "post"
slug: "cai-dat-lets-encrypt-certificate"
cover: "../../images/2016/07/lets-encrypt.png"
categories:
  - Web
---

Giao thức https hiện nay được nhiều website sử dụng cho an toàn thông tin và SEO tốt hơn. Hiện nay chứng chỉ SSL có giá rất cao, cài đặt Lets Encrypt Certificate sẽ giúp bạn có https miễn phí và mãi mãi.

Để dùng giao thức https cho web thì có thể dùng DNS của Cloudflare, nhưng chứng chỉ của nó không hỗ trợ trên Windows XP. Khi truy cập vào báo lỗi sau:

<img class="aligncenter size-full" src="/media/2016/07/https-cloudflare.png" alt=""  />

Vậy nên giải pháp thay thế https Cloudflare tốt nhất là  Let's Encrypt Certificate. Chứng chỉ này có thời hạn là 3 tháng. Sau đó có thể gia hạn lại dùng tiếp.

## Chuẩn bị:

- **1 hệ điều hành nhân Linux để chạy lấy chứng chỉ Let's Encrypt:** Trong bài này, tôi sẽ sử dụng Ubuntu 16.04 TLS cài trên máy ảo VMWare
- **1 host sử dụng cPanel hay Direct Admin..:** Host của bạn phải có cho phép cài chứng chỉ SSL bằng tay.
- **Nộp truy cập tải lên máy chủ** . Tôi sử dụng SFTP.

**Lưu ý:** Một số host có tích hợp Let's Encrypt Certificate nên không cần làm các bước bên dưới, chỉ cần vào Cpanel kích hoạt nó lên.

Sau đây là danh sách một số host có tích hợp Let's Encrypt Certificate: Digistar.vn, DreamHost, Hawk Host, StableHost, SiteGround

## Cài đặt Lets Encrypt Certificate

1. Mở terminal trong Ubuntu và gõ: <pre class="brush: plain; title: ; notranslate" title="">git clone https://github.com/letsencrypt/letsencrypt</pre>

2. Gõ lệnh <pre class="brush: plain; title: ; notranslate" title="">cd letsencrypt</pre>


    để chuyển đến thư mục letsencrypt</li> </ol>

    ## Tạo chứng chỉ Let's Encrypt

    <li value="3">
      Bên trong thư mục letsencrypt, gõ:
    </li>

    <pre class="brush: plain; title: ; notranslate" title="">./letsencrypt-auto certonly -a manual --rsa-key-size 4096 -d tđ.vn -d www.tđ.vn</pre>

    **Lưu ý:** Thay thế tđ.vn thành tên trang web của bạn.

    Khi chạy lệnh trên có yêu cầu nhập pass.

    <li value="4">
      Để đăng nhập IP của bạn. Chọn Yes.
    </li>

<img class="aligncenter size-full" src="/media/2016/07/ip-being-logged.png" alt="" /> 
    
    Chọn xong sẽ hiện các dòng sau:
    
    <pre class="brush: plain; title: ; notranslate" title="">Make sure your web server displays the following content at
/.well-known/acme-challenge/VVGHpfFleFEuueHABqr9OcD2ZGfH4L4jRFWOSncsi90 before continuing:

VVGHpfFleFEuueHABqr9OcD2ZGfH4L4jRFWOSncsi90.OIJ_M0M1cYuFvxiH27g0JChuKjdZmxsV3g97nTZFUOw

If you don't have HTTP server configured, you can run the following
command on the target server (as root):

mkdir -p /tmp/certbot/public_html/.well-known/acme-challenge
cd /tmp/certbot/public_html
printf "%s" VVGHpfFleFEuueHABqr9OcD2ZGfH4L4jRFWOSncsi90.OIJ_M0M1cYuFvxiH27g0JChuKjdZmxsV3g97nTZFUOw &amp;amp;amp;amp;amp;amp;amp;gt; .well-known/acme-challenge/tto8T43hHvnZCk3pcPFcUNhp7-z3B07aoeWZmExO-nI

# run only once per server:

\$(command -v python2 || command -v python2.7 || command -v python2.6) -c \
"import BaseHTTPServer, SimpleHTTPServer; \
s = BaseHTTPServer.HTTPServer(('', 80), SimpleHTTPServer.SimpleHTTPRequestHandler); \
s.serve_forever()"
Press ENTER to continue</pre>

Bây giờ bạn không được nhấn Enter. Nó yêu cầu up lên host các thư mục và file theo yêu cầu trên để xác nhận quền sở hữu tên miền.

## Xác nhận Quyền sở hữu tên miền

5.  Tạo các thư mục trong root của host như sau: .well-known/acme-challenge

6.  Tạo file có tên là: VVGHpfFleFEuueHABqr9OcD2ZGfH4L4jRFWOSncsi90

Và nội dung trong file là:

 <pre class="brush: plain; title: ; notranslate" title="">VVGHpfFleFEuueHABqr9OcD2ZGfH4L4jRFWOSncsi90.OIJ_M0M1cYuFvxiH27g0JChuKjdZmxsV3g97nTZFUOw</pre>

Kết quả: <a href="/.well-known/acme-challenge/VVGHpfFleFEuueHABqr9OcD2ZGfH4L4jRFWOSncsi90" target="_blank" rel="noopener">/.well-known/acme-challenge/VVGHpfFleFEuueHABqr9OcD2ZGfH4L4jRFWOSncsi90</a>

**Lưu ý**: Tên file và nội dung trong file sẽ khác nhau ở mỗi tên miền, ở trên chỉ là ví dụ. Tên file không có phần mở rộng.

7.  Một khi bạn đã làm xong, quay trở lại nhấn Enter. Nếu thành công sẽ hiện ra thông báo sau.

<img class="aligncenter size-full" src="/media/2016/07/Congratulations-letsencrypt.png" alt="" />

## Lấy chứng chỉ Let's Encrypt

Nhập

 <pre class="brush: plain; title: ; notranslate" title="">sudo nautilus</pre>

Dùng trình quản lý file truy cập vào đường dẫn sau:  /etc/letsencrypt/live/tđ.vn

<img class="aligncenter size-full" src="/media/2016/07/Lets-Encrypt-cert.png" alt="" />

## Cài đặt Lets Encrypt trong cPanel

Đăng nhập vào cPanel của bạn. Sao chép và dán các thông tin SSL từ các file này vào bảng điều khiển cPanel SSL:

- privkey.pem: Private Key, bạn không được cung cấp cho bất cứ người nào khác. File này dùng để up lên server để làm khóa mã hóa/giải mã.
- cert.pem: Certificate (CRT) Chứng chỉ SSL, Sử dụng cho Apache < 2.4.8
- chain.pem : Certificate Authority Bundle: (CABUNDLE) Chứng chỉ của Let’s Encrypt, dùng cho Apache < 2.4.8
- fullchain.pem : Chứa tất cả các chứng chỉ, bao gồm Let’s Encrypt và cert.pem. Dùng cho Apache >= 2.4.8

Có thể dùng gedit để mở và sao chép nội dung của các tập tin .pem: Nhấn chuột phải chọn Open With Other App...

## Mẹo: Chuyển http sang https

Thêm các dòng sau vào .htaccess của bạn:

<pre class="brush: plain; title: ; notranslate" title=""># BEGIN Force SSL
# This should be the first rule before other rules
&lt;IfModule mod_rewrite.c&gt;
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^/?(.\*) https://%{SERVER_NAME}/$1 [R,L]
&lt;/IfModule&gt;

# END Force SSL</pre>

<span style="color: #ff0000;"><strong>Update</strong>: </span>Hiện nay có một số tool online giúp lấy chứng chỉ Let's Encrypt cực kì đơn giản.

Link: https://www.sslforfree.com/
