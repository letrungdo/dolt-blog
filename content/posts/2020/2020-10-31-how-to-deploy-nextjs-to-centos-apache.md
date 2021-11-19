---
template: "post"
title: How to Deploy Nextjs to CentOS Apache. Apache to Nginx Webserver
date: 2020-10-31T12:15:00+07:00
author: letrungdo
slug: "how-to-deploy-nextjs-to-centos-apache"
cover: "../../images/2020/10/nextjs-centos-nginx.png"
keywords: "Deploy Nextjs to CentOS, CentOS Nginx"
categories:
  - DevOps
tags:
  - Nextjs
---
Currently there are many automated deploy support services for Nextjs such as Vercel, Netlify, AWS...
But vercel cannot deploy if the nextjs custom server. Netlify does not have basic authen. There is a fee for AWS.

For the purpose of serving product testing before release. I will guide you to deploy nextjs to your own server.

## A. Static HTML Export => Apache
If build using next export, copy all files inside out directory to /var/www/html

But next export will pretty much limit the features that nextjs brings. 
So I will guide you to configure Nginx to run the next build.

## B. Servervside renders at runtime => Nginx
Login to ssh:
```bash
> ssh <USER>@<IP> -p<PORT>
```
### 1. Config Nginx
To add the CentOS EPEL repository, open terminal and use the following command:
```bash
> sudo yum install epel-release
```
Install Nginx using the following yum command:
```bash
> sudo yum install nginx
```
Nginx does not start on its own. To get Nginx running, type:
```bash
> sudo systemctl start nginx
```
Install Nodejs
```bash
> sudo yum install nodejs
```
#### Handling error when start nginx
The error basically means that some other application is using those default ports. You can check that using:
```bash
> sudo netstat -tulpn
```
Get the PID of the process that already using that port and send signal with kill command.
```bash
> sudo kill -2 <PID>
```
#### Note if you turn off the wrong PID of ssh, you can re-enable it with the following command
Starting SSH Service:
```bash
> sudo systemctl start sshd
```
### 2. Adjust Firewall Settings
```bash
> sudo yum install ufw
> sudo ufw app list
> sudo ufw allow 'Nginx HTTP'
```
#### Handling Error:ERROR: Could not find a profile matching 'Nginx Full'
```bash
> vi /etc/ufw/applications.d/nginx.ini
```
Place this inside file
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
Then run the following command to update:
```bash
> ufw app update nginx
> ufw app info 'Nginx HTTP'
> sudo ufw allow 'Nginx HTTP'
```

#### Allow HTTP and HTTPS traffic:
```bash
> sudo firewall-cmd --permanent --zone=public --add-service=http
> sudo firewall-cmd --permanent --zone=public --add-service=https
> sudo firewall-cmd --reload
```

#### Handling firewall-cmd: command not found
```bash
> sudo yum install firewalld
> sudo systemctl start firewalld
> sudo systemctl enable firewalld
> sudo systemctl status firewalld
```
#### Handling firewall not running
```bash
> sudo systemctl restart dbus
> sudo systemctl restart firewalld
```

#### Handling ERROR: initcaps [Errno 2] ip6tables v1.4.21: can't initialize ip6tables table `filter': Table does not exist (do you need to insmod?) Perhaps ip6tables or your kernel needs to be upgraded.
This error you can ignore. Despite the error, the app still runs normally.
```bash
> sudo yum update
```

### 3. Configure Nginx as a Reverse Proxy
Edit /etc/nginx/nginx.conf
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

### 4. Keep your application alive forever
Install PM2:
```bash
> sudo npm install -g pm2
```
Now run the Next.js website application using PM2. 
Make sure you've navigated into the /website project directory:
```bash
> cd website
> pm2 start --name=renew npm -- start
```
or run with custom script in package.json
```bash
> pm2 start npm --name=renew -- run "script-name"
```
Display the new build:
```bash
> pm2 restart renew
```

### 5. Nginx: Enable Basic Auth
```bash
> yum -y install httpd-tools
> Edit /etc/nginx/nginx.conf
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

##### Complete nginx.conf file with Basic Auth not required IP list
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

> Tip: How can I perform a git pull without re-entering password?
```bash
> git config credential.helper store 
```