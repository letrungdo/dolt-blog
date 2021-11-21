---
template: "post"
title: Hướng dẫn deploy wordpress lên AWS EC2 Linux 2
description: Hướng dẫn deploy Wordpress lên AWS EC2 Linux 2. Đã từng thử qua WordPress Bitnami trên AWS Marketplace nhưng phát sinh một số lỗi và khó fix.
date: 2021-11-19T21:25:00+00:00
author: letrungdo
slug: "huong-dan-deploy-wordpress-len-aws-ec2-linux-2"
cover: "../../images/2021/11/deploy-wordpress-to-aws-ec2-linux-2.jpg"
keywords: "Deploy Wordpress EC2, Wordpress EC2 Linux 2"
categories:
  - DevOps
tags:
  - AWS
  - EC2
  - Wordpress
---

Mình đã từng thử qua WordPress Bitnami trên AWS Marketplace nhưng phát sinh một số lỗi và khó fix. Bài viết này sẽ hướng dẫn các bạn deploy Wordpress lên AWS EC2 Linux 2 thủ công nhưng sẽ dễ bảo trì về sau.

## Bước 1: Tạo mới một instance
Truy cập vào https://console.aws.amazon.com/ec2/

Từ EC2 Dashboard chọn Launch Instance. Chọn "Amazon Linux 2 AMI (HVM), SSD Volume Type"<br/>
Chọn t2.micro (Free tier eligible)<br/>
Chọn <b>Review and Launch</b><br/>
...<br/>
Chú ý sau khi Launch xong thì vào tab Security chọn Security groups và Edit inbound rules thêm type HTTP và source Custom là 0.0.0.0/0

> Ref: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-launch-instance

## Bước 2: Kết nối vào instance
Có nhiều cách để kết nối vào instance của EC2. Có 2 cách phổ biến sau:
1. Kết nối qua SSH:<br/>
Vào EC2 > Instances
Nhấn buton Connect. Chuyển sang tab SSH client. Ở đây có đầy đủ thông tin hướng dẫn để connnect vào SSH
Mỏ terminal và nhập vào tương tự như dưới

```bash
ssh -i "path/xxx.pem" ec2-user@ec2-xxxx.us-east-2.compute.amazonaws.com
```
2. Kết nối qua Cyberduck:<br/>
Chọn SFTP (SSH File Transfer Protoco)
Nhập thông tin server là Public IPv4 DNS và SSH Private Key là file xxx.pem của bạn. Username là ec2-user

> Ref: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html

## Bước 3: Cài LAMP web server lên Amazon Linux 2
Cài Apache web server với PHP và MariaDB được gọi ngắn gọn là LAMP.

Connect qua SSH và chạy các lệnh sau:

### Cài apache, php, mariadb
```bash
sudo yum update -y
sudo amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2
sudo yum install -y httpd mariadb-server
sudo systemctl start httpd
sudo systemctl enable httpd
```

### Cài phân quyền file

```bash
sudo usermod -a -G apache ec2-user
```
Logout ra và login lại vào SSH chạy tiếp
```bash
groups
```
Nếu hiện ec2-user adm wheel apache systemd-journal là ok

```bash
sudo chown -R ec2-user:apache /var/www
sudo chmod 2775 /var/www && find /var/www -type d -exec sudo chmod 2775 {} \;
find /var/www -type f -exec sudo chmod 0664 {} \;
```

### Bảo mật cơ sở dữ liệu
```bash
sudo systemctl start mariadb
sudo mysql_secure_installation
```
Khi nhập lệnh trên sẽ hỏi xác nhập password. Bạn để trống và nhấn Enter.<br/>
Nhập Y cho toàn bộ các câu hỏi. Chú ý phần set password mới thì lưu lại pw mới đó để phục vụ sau này connect vào database bằng user root

### Cài phpMyAdmin
```bash
sudo yum install php-mbstring php-xml -y
sudo systemctl restart httpd
sudo systemctl restart php-fpm
cd /var/www/html
wget https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz
mkdir phpMyAdmin && tar -xvzf phpMyAdmin-latest-all-languages.tar.gz -C phpMyAdmin --strip-components 1
rm phpMyAdmin-latest-all-languages.tar.gz
```
Vào /var/www/html/phpMyAdmin đổi tên config.sample.inc.php thành config.inc.php

> Ref: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html

## Bước 4: Cài WordPress lên AWS EC2
Vào Public IPv4 address/phpMyAdmin login với user là root, password là pw đã tạo trước đó ở bước 3<br/>
Tạo 1 db mới với tên tuỳ ý

```bash
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
cp -r wordpress/* /var/www/html/
sudo vim /etc/httpd/conf/httpd.conf
```
Tìm đến đoạn <Directory "/var/www/html"><br/>
Nhập i để chuyển sang insert mode và sửa <b>AllowOverride None</b> thành <b>AllowOverride All</b>
Sau đó lưa lại bằng cách nhấn ESC và gõ :w và Enter

```bash
sudo yum install php-gd
sudo chown -R apache /var/www
sudo chgrp -R apache /var/www
sudo chmod 2775 /var/www
find /var/www -type d -exec sudo chmod 2775 {} \;
find /var/www -type f -exec sudo chmod 0664 {} \;
sudo systemctl restart httpd
sudo service httpd restart
```

Cuối cùng là trỏ domain bạn về Public IPv4 address và truy cập sẽ hiện bước nhập database name.<br/>
Nhập tên database đã tạo trước đó. Host để mặc định là localhost.<br/>
User là root và password là pw đã tạo trước đó ở bước 3<br/>
Xong bấm Install là ok.

> Ref: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hosting-wordpress.html

## Cách update PHP 7.2 lên PHP 7.4

```bash
sudo amazon-linux-extras disable php7.2
sudo amazon-linux-extras disable lamp-mariadb10.2-php7.2
sudo amazon-linux-extras enable php7.4
sudo yum clean metadata
sudo yum install php-cli php-pdo php-fpm php-json php-mysqlnd
sudo systemctl restart httpd
sudo systemctl restart php-fpm
```

Gõ php -v nếu hiện như dưới là ok
> PHP 7.4.21 (cli) (built: Jul  7 2021 17:35:08) ( NTS )

> Ref: https://greggborodaty.com/amazon-linux-2-upgrading-from-php-7-2-to-php-7-4/
