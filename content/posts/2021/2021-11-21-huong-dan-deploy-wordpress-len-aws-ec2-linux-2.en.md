---
template: "post"
title: Guide to Deploying WordPress on AWS EC2 Linux 2
description: WordPress Bitnami on AWS Marketplace is easy to install but incurs some issues. Guide to deploying WordPress on AWS EC2 Linux 2 using LAMP and Docker Compose.
date: 2021-11-21T22:40:00+00:00
author: letrungdo
slug: "huong-dan-deploy-wordpress-len-aws-ec2-linux-2"
lang: "en"
cover: "../../images/2021/11/deploy-wordpress-to-aws-ec2-linux-2.jpg"
keywords: "Deploy Wordpress EC2, Wordpress EC2 Linux 2"
categories:
  - DevOps
tags:
  - AWS
  - EC2
  - Wordpress
---

I tried WordPress Bitnami on AWS Marketplace, but encountered some issues that were difficult to fix.<br/>
This article will guide you through deploying WordPress on AWS EC2 Linux 2 using two methods: LAMP and Docker Compose.

## I. Create a New Instance

Access https://console.aws.amazon.com/ec2/

From the EC2 Dashboard, select Launch Instance. Choose "Amazon Linux 2 AMI (HVM), SSD Volume Type"<br/>
Select t2.micro (Free tier eligible)<br/>
Select <b>Review and Launch</b><br/>
...<br/>
Note: After launching, go to the Security tab, select Security groups, and Edit inbound rules to add type HTTP with source Custom set to 0.0.0.0/0.

> Ref: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-launch-instance

## II. Connect to the Instance

There are multiple ways to connect to an EC2 instance. Here are two popular methods:

1. Connecting via SSH:<br/>
   Go to EC2 > Instances
   Click the Connect button. Switch to the SSH client tab. There you will find complete instructions to connect via SSH.
   Open your terminal and enter a command similar to the one below:

```bash
ssh -i "path/xxx.pem" ec2-user@ec2-xxxx.us-east-2.compute.amazonaws.com
```

2. Connecting via Cyberduck:<br/>
   Select SFTP (SSH File Transfer Protocol)
   Enter server details as Public IPv4 DNS and SSH Private Key as your xxx.pem file. Username is ec2-user

> Ref: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstances.html

# Method 1: Deploy WordPress to AWS EC2 Linux 2 using LAMP

Installing Apache, MySQL, and PHP on Linux is briefly called LAMP.

Connect via SSH and run the following commands:

### Install Apache, PHP, and MariaDB

```bash
sudo yum update -y
sudo amazon-linux-extras install -y lamp-mariadb10.2-php7.2 php7.2
sudo yum install -y httpd mariadb-server
sudo systemctl start httpd
sudo systemctl enable httpd
```

### Configure File Permissions

```bash
sudo usermod -a -G apache ec2-user
```

Logout and log back into SSH, then run:

```bash
groups
```

If it displays ec2-user adm wheel apache systemd-journal, it's good to go.

```bash
sudo chown -R ec2-user:apache /var/www
sudo chmod 2775 /var/www && find /var/www -type d -exec sudo chmod 2775 {} \;
find /var/www -type f -exec sudo chmod 0664 {} \;
```

### Secure the Database

```bash
sudo systemctl start mariadb
sudo mysql_secure_installation
```

When running the command above, it will ask for password confirmation. Leave it blank and press Enter.<br/>
Enter Y for all questions. Make sure to save the new password when setting it, as you will need it later to connect to the database with the root user.

### Install phpMyAdmin

```bash
sudo yum install php-mbstring php-xml -y
sudo systemctl restart httpd
sudo systemctl restart php-fpm
cd /var/www/html
wget https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz
mkdir phpMyAdmin && tar -xvzf phpMyAdmin-latest-all-languages.tar.gz -C phpMyAdmin --strip-components 1
rm phpMyAdmin-latest-all-languages.tar.gz
```

In /var/www/html/phpMyAdmin, rename config.sample.inc.php to config.inc.php

> Ref: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-lamp-amazon-linux-2.html

### Install WordPress on AWS EC2

Go to Public IPv4 address/phpMyAdmin and log in with user root and the password created in step 3<br/>
Create a new database with any name you like

```bash
wget https://wordpress.org/latest.tar.gz
tar -xzf latest.tar.gz
cp -r wordpress/* /var/www/html/
sudo vim /etc/httpd/conf/httpd.conf
```

Find the line <Directory "/var/www/html"><br/>
Press i to enter insert mode and change <b>AllowOverride None</b> to <b>AllowOverride All</b>
Then save by pressing ESC, typing :w and pressing Enter

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

Finally, point your domain to the Public IPv4 address and when accessed, the database configuration screen will appear.<br/>
Enter the database name created earlier. Host defaults to localhost.<br/>
User is root and password is the one created in step 3.<br/>
Once done, click Install and you're good to go.

> Ref: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hosting-wordpress.html

### How to Upgrade PHP 7.2 to PHP 7.4

```bash
sudo amazon-linux-extras disable php7.2
sudo amazon-linux-extras disable lamp-mariadb10.2-php7.2
sudo amazon-linux-extras enable php7.4
sudo yum clean metadata
sudo yum install php-cli php-pdo php-fpm php-json php-mysqlnd
sudo systemctl restart httpd
sudo systemctl restart php-fpm
```

Type php -v; if it displays as below, it's successful:

> PHP 7.4.21 (cli) (built: Jul 7 2021 17:35:08) ( NTS )

> Ref: https://greggborodaty.com/amazon-linux-2-upgrading-from-php-7-2-to-php-7-4/

<br/><br/>

# Method 2: Deploy WordPress to AWS EC2 Linux 2 using Docker Compose

Open terminal and run the following commands:

```bash
sudo yum update
sudo amazon-linux-extras install docker
sudo systemctl start docker
sudo usermod -a -G docker ec2-user
exit
```

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

The latest version at the time of writing is 1.29.2. Visit https://docs.docker.com/compose/install/#install-compose-on-linux-systems to get a newer version.

```bash
mkdir wordpress
vi ~/wordpress/docker-compose.yml
```

Press key i to switch to insert mode and paste the code snippet below:

```yml
version: "3.9"

services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: yourpassword
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    volumes:
      - wordpress_data:/var/www/html
    ports:
      - "80:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    restart: always
    ports:
      - 3333:80
    environment:
      PMA_HOST: db
      MYSQL_ROOT_PASSWORT: yourpassword
volumes:
  db_data: {}
  wordpress_data: {}
```

Replace yourpassword with your new password.

Press ESC and type :wq to save and exit.

```bash
cd ~/wordpress/
docker-compose up --build -d
```

> Ref: https://qiita.com/HyunwookPark/items/92d10899cd19f2f06f91

After finishing, go to Security groups and open port 3333 to access phpMyAdmin.
