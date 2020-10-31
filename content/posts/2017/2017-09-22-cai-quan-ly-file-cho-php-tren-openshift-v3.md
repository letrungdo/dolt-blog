---
title: Cài quản lý file cho PHP trên Openshift v3
date: 2017-09-22T15:51:28+07:00
author: letrungdo
template: "post"
slug: "cai-quan-ly-file-cho-php-tren-openshift-v3"
cover: "../../images/2017/09/quan-ly-file-openshift-v3.png"
categories:
  - Web
tags:
  - Openshift
  - Wordpress
---
<a href="/huong-dan-su-dung-openshift-v3-toan-tap/" target="_blank" rel="noopener"><strong>Openshift v3</strong></a> không còn dùng giao thức truyền file SFTP để quản lý file như <a href="/hosting-free/openshift/" target="_blank" rel="noopener">Openshift  v2</a> nữa. Việc up source code lên sẽ khó khăn với các bạn chưa biết gì về Docker. Nên hôm nay mình sẽ hướng dẫn các bạn cách **cài quản lý file cho PHP trên Openshift v3**. Giúp up source code lên nhanh chóng và dễ dàng.

# Hướng dẫn cài quản lý File cho PHP trên Openshift v3

## Bước 1: Tạo project PHP với Git Repository Distro-Manager

Ta sẽ dùng mã nguồn quản lý file của tác giả IzeroCs tại địa chỉ: <a href="https://github.com/IzeroCs/Distro-Manager" target="_blank" rel="noopener">https://github.com/IzeroCs/Distro-Manager</a>

<img class="aligncenter wp-image-263 size-full" src="/media/2017/09/tao-project-php.png" alt="Cài quản lý file cho PHP trên Openshift v3" width="957" height="488" srcset="/media/2017/09/tao-project-php.png 957w, /media/2017/09/tao-project-php-768x392.png 768w" sizes="(max-width: 957px) 100vw, 957px" /> 

Điền tên project, ở dòng * Git Repository URL: nhập link sau:

<pre>https://github.com/IzeroCs/Distro-Manager</pre>

Xong nhấn Create.

Chờ một lát cho quá trình build hoàn thành, bạn sẽ được cấp cho 1 url trỏ đến host của bạn như hình.

<pre>http://php-do.193b.starter-ca-central-1.openshiftapps.com</pre>

<img class="aligncenter size-full" src="/media/2017/09/php-build-complete.png" alt="Cài quản lý file cho PHP trên Openshift v3" /> 

## Bước 2: Truy cập vào quản lý file PHP trên Openshift

Bạn vào địa chỉ url mới được cấp, thêm **/manager** phía sau đường dẫn để truy cập vào host.

Ví dụ: **http://php-do.193b.starter-ca-central-1.openshiftapps.com/manager**

Nhập tên đăng nhâp và mật khẩu mặt định được cấp. Sau khi đăng nhập xong bạn cần đổi thông tin đăng nhập để bảo mật.

Giao diện sau khi login như dưới.

<img class="aligncenter size-full" src="/media/2017/09/quan-ly-file-openshift-v3.png" alt="quản lý file cho PHP trên Openshift v3" /> 

&nbsp;

Để up code, bạn nên nén hết lại thành file .zip để up cho nhanh. Up xong bấm vào file nén và chọn giải nén.

**Distro-Manager** có đầy đủ các chức năng cần thiết để quản lý file cho PHP: Đổi tên, upload file, giải nén, phân quyền, xóa, sửa, sao chép, tạo file mới.