---
title: Quên mật khẩu Admin WordPress | Cách lấy lại pass WordPress
date: 2016-05-27T15:11:06+07:00
author: letrungdo
template: "post"
slug: "quen-mat-khau-admin-wordpress-reset-pass-wp-admin"
cover: "../../images/2016/05/reset_pass_wp-admin.jpg"
categories:
  - Web
tags:
  - Wordpress
---

<p style="text-align: justify;">
  Bình thường tôi hay lưu mật khẩu các tài khoản lên Chrome nên cũng không cần nhớ pass làm gì. Hôm bữa dọn cache lỡ xóa hết mật khẩu trên Chrome nên giờ quên mật khẩu Admin WordPress luôn. Cách lấy lại pass có rất nhiều cách như sau.
</p>

<h2 style="text-align: justify;">
  Cách lấy pass thông thường khi quên mật khẩu Admin WordPress
</h2>

<p style="text-align: justify;">
  <strong>Cách 1:</strong> Nếu bạn có liên kết trang web của bạn với WordPress.com thì wp-adimin của bạn sẽ có thêm nút <strong>Log in with WordPress.com </strong>chọn và đăng nhập bằng tài khoản đó.
</p>

<img class="aligncenter size-full wp-image-2005" src="/media/2016/05/pass_Wordpress.png" alt="" width="635" height="500" />

<p style="text-align: justify;">
  <strong>Cách 2:</strong> Chọn "<strong>Bạn quên mật khẩu?</strong>" rồi nhập email hoặc tên đăng nhập rồi bấm gửi. Thư  sẽ được gửi về mail và bạn nhấp vào link trong mail để đặt lại mật khẩu.
</p>

<h2 class="entry-title" style="text-align: justify;">
  Cách lấy mật khẩu admin WordPress bằng phpMyAdmin
</h2>

<p style="text-align: justify;">
  Nếu nếu bạn chờ thư cả ngày cũng không thấy đâu thì làm theo cách này. Đây là chủ đề chính trong bài này, vì 2 cách trên quá quen thuộc với 1 tài khoản.
</p>

<p style="text-align: justify;">
  Đăng nhập vào host rồi chọn <strong>phpMyAdmin</strong>. Nếu bạn quên luôn pass phpMyAdmin thì có thể chọn <strong>MySQL Management</strong>. Tìm đúng tên Database của bạn và chọn <strong>modify password</strong> sau đó nhập lại mật khẩu mới và lưu lại.
</p>

<img class="aligncenter size-full wp-image-2006" src="/media/2016/05/modify_pass.png" alt="" width="587" height="256" />

<p style="text-align: justify;">
  Sau khi đăng nhập vào <strong>phpMyAdmin</strong> chọn tên Database phù hợp -> Chọn tên bảng là <strong>wp_users</strong> (lưu ý wp_ do mỗi người đặt lúc cài WordPress).
</p>

<img class="aligncenter size-full wp-image-2007" src="/media/2016/05/phpMyAdmin.png" alt="" width="943" height="339" srcset="/media/2016/05/phpMyAdmin.png 943w, /media/2016/05/phpMyAdmin-768x276.png 768w" sizes="(max-width: 943px) 100vw, 943px" />

<p style="text-align: justify;">
  Bạn thấy cột <strong>user_pass </strong>có chứa rất nhiều các ký tự. Đó là mật khẩu của bạn đã được mã hóa sang mã MD5.
</p>

<p style="text-align: justify;">
  Vì MD5 là mã băm, nên bạn không thể chuyển chuỗi đó ngược lại thành pass được. Mã md5 đó đã trộn thêm 1 trường salt ngẫu nhiên nên nếu bạn có một CSDL lớn chứa các pass đã chuyển sang MD5 thì có dùng cách ánh xạ ngược lại cũng không ăn thua.
</p>

<p style="text-align: justify;">
  Cách giả quyết là thay chuỗi đó bằng chuỗi mật khẩu mới đã mã hóa.
</p>

Có nhiều công cụ giúp bạn chuyển text sang md5. Bạn vào <a href="http://www.miraclesalad.com/webtools/md5.php" target="_blank" rel="noopener">webtools/md5.php</a> để chyển pass sang md5.

<p style="text-align: justify;">
  Có thể dùng mã dưới đây cho nhanh: [pass là: "matkhau"]
</p>

```code
a788f6d55914857d4b97c1de99cb896b
```

<p style="text-align: justify;">
  Sau đó quay lại database chọn edit và nhập mã bạn mới chuyển đổi vào <strong>user_pass</strong> rồi nhấn <strong>Go</strong> để cập nhật.
</p>

<p>
  <img class="aligncenter size-full wp-image-2008" src="/media/2016/05/pass_MD5.png" alt="" width="964" height="519" srcset="/media/2016/05/pass_MD5.png 964w, /media/2016/05/pass_MD5-768x413.png 768w" sizes="(max-width: 964px) 100vw, 964px" />
</p>

<p style="text-align: justify;">
  Cuối cùng đăng nhập vào WordPress bằng pass mới đó. Bạn nên vào đổi lại pass ngay trên WordPress để có thêm chuỗi salt giúp bảo mật cao hơn.
</p>

<p style="text-align: justify;">
  <strong>Cách khác</strong>: Khi quên mật khẩu Admin WordPress bạn có thể nhờ bên quản trị host reset pass giùm.
</p>
