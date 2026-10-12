---
template: "post"
title: Hướng dẫn Deploy NextJS lên CentOS Apache. Chuyển Apache sang Nginx Webserver
date: 2020-10-31T12:15:00+07:00
author: letrungdo
slug: "how-to-deploy-nextjs-to-centos-apache"
lang: "vi"
cover: "../../images/2020/10/nextjs-centos-nginx.png"
keywords: "Deploy Nextjs to CentOS, CentOS Nginx, deploy nextjs centos"
categories:
  - DevOps
tags:
  - Nextjs
---

Hiện tại có rất nhiều dịch vụ hỗ trợ deploy tự động cho NextJS như Vercel, Netlify, AWS...
Tuy nhiên Vercel không thể deploy nếu NextJS dùng custom server. Netlify không có basic auth. AWS thì mất phí.

Nhằm mục đích phục vụ kiểm thử sản phẩm trước khi phát hành, bài viết này sẽ hướng dẫn bạn cách deploy NextJS lên server riêng của mình.

## A. Static HTML Export => Apache

Nếu build bằng `next export`, hãy copy tất cả các file bên trong thư mục `out` vào `/var/www/html`.

Tuy nhiên, `next export` sẽ hạn chế khá nhiều tính năng mà NextJS mang lại.
Vì vậy, tôi sẽ hướng dẫn bạn cấu hình Nginx để chạy bản build của NextJS.

## B. Server-side rendering runtime => Nginx

Đăng nhập qua SSH:

```bash
> ssh <USER>@<IP> -p<PORT>
```

### 1. Cấu hình Nginx

Để thêm repository CentOS EPEL, mở terminal và sử dụng lệnh sau:

```bash
> sudo yum install epel-release
```

Cài đặt Nginx bằng lệnh yum:

```bash
> sudo yum install nginx
```

Nginx không tự khởi động. Để chạy Nginx, gõ lệnh:

```bash
> sudo systemctl start nginx
```

Cài đặt Node.js:

```bash
> sudo yum install nodejs
```

#### Xử lý lỗi khi khởi động Nginx

Lỗi này về cơ bản có nghĩa là một ứng dụng khác đang sử dụng các port mặc định đó. Bạn có thể kiểm tra bằng:

```bash
> sudo netstat -tulpn
```

Lấy PID của process đang sử dụng port đó và gửi tín hiệu bằng lệnh kill:

```bash
> sudo kill -2 <PID>
```

#### Lưu ý nếu tắt nhầm PID của SSH, bạn có thể bật lại bằng lệnh sau:

Khởi động lại SSH Service:

```bash
> sudo systemctl start sshd
```

### 2. Tùy chỉnh cài đặt Firewall

```bash
> sudo yum install ufw
> sudo ufw app list
> sudo ufw allow 'Nginx HTTP'
```

#### Xử lý lỗi: ERROR: Could not find a profile matching 'Nginx Full'

```bash
> vi /etc/ufw/applications.d/nginx.ini
```

Dán nội dung này vào trong file:

```nginx
[Nginx HTTP]
title=Web Server
description=Enable NGINX HTTP traffic
ports=80/tcp

[Nginx HTTPS] \
title=Web Server (HTTPS) \
description=Enable NGINX HTTPS traffic
ports=443/tcp

[Nginx Full]
title=Web Server (HTTP,HTTPS)
description=Enable NGINX HTTP and HTTPS traffic
ports=80,443/tcp
```

Sau đó chạy lệnh sau để cập nhật:

```bash
> ufw app update nginx
> ufw app info 'Nginx HTTP'
> sudo ufw allow 'Nginx HTTP'
```

#### Cho phép lưu lượng HTTP và HTTPS:

```bash
> sudo firewall-cmd --permanent --zone=public --add-service=http
> sudo firewall-cmd --permanent --zone=public --add-service=https
> sudo firewall-cmd --reload
```

#### Xử lý lỗi firewall-cmd: command not found

```bash
> sudo yum install firewalld
> sudo systemctl start firewalld
> sudo systemctl enable firewalld
> sudo systemctl status firewalld
```

#### Xử lý lỗi firewall không hoạt động

```bash
> sudo systemctl restart dbus
> sudo systemctl restart firewalld
```

#### Xử lý ERROR: initcaps [Errno 2] ip6tables v1.4.21: can't initialize ip6tables table `filter': Table does not exist (do you need to insmod?) Perhaps ip6tables or your kernel needs to be upgraded.

Lỗi này bạn có thể bỏ qua. Mặc dù báo lỗi nhưng ứng dụng vẫn chạy bình thường.

```bash
> sudo yum update
```

### 3. Cấu hình Nginx làm Reverse Proxy

Chỉnh sửa `/etc/nginx/nginx.conf`

```nginx
server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        # server_name  _;
        # root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        #include /etc/nginx/default.d/*.conf;

        location / {
            # reverse proxy for next server
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;

            # we need to remove this 404 handling
            # because next's _next folder and own handling
            # try_files $uri $uri/ =404;
        }

        # error_page 404 /404.html;
        # location = /404.html {
        # }

        # error_page 500 502 503 504 /50x.html;
        # location = /50x.html {
        # }
    }
```

```bash
> sudo systemctl restart nginx
```

### 4. Giữ ứng dụng luôn hoạt động (Keep Alive)

Cài đặt PM2:

```bash
> sudo npm install -g pm2
```

Bây giờ hãy khởi chạy ứng dụng Next.js bằng PM2.
Đảm bảo bạn đã di chuyển vào thư mục dự án `/website`:

```bash
> cd website
> pm2 start --name=renew npm -- start
```

hoặc chạy với script tùy chỉnh trong `package.json`:

```bash
> pm2 start npm --name=renew -- run "script-name"
```

Cập nhật bản build mới:

```bash
> pm2 restart renew
```

### 5. Nginx: Bật Basic Auth

```bash
> yum -y install httpd-tools
> Chỉnh sửa /etc/nginx/nginx.conf
```

```nginx
server_names_hash_bucket_size 512;
location / {
    auth_basic            "Basic Auth";
    auth_basic_user_file  "/etc/nginx/.htpasswd";

    ...
}
```

```bash
> htpasswd -c /etc/nginx/.htpasswd username
> systemctl restart nginx
```

##### File nginx.conf hoàn chỉnh không yêu cầu Basic Auth cho danh sách IP whitelist

```nginx
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;
    server_names_hash_bucket_size 512;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    geo $authentication {
        default "Authentication required";
        192.168.1.56 "off";
        ....[whitelist IP]
    }

    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        # server_name  _;
        # root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        #include /etc/nginx/default.d/*.conf;

        location / {
            auth_basic            $authentication;
            auth_basic_user_file  "/etc/nginx/.htpasswd";

            # reverse proxy for next server
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;

            # we need to remove this 404 handling
            # because next's _next folder and own handling
            # try_files $uri $uri/ =404;
        }

        # error_page 404 /404.html;
        # location = /404.html {
        # }

        # error_page 500 502 503 504 /50x.html;
        # location = /50x.html {
        # }
    }
}
```

> Mẹo: Làm thế nào để thực hiện git pull mà không cần nhập lại mật khẩu?

```bash
> git config credential.helper store
```
