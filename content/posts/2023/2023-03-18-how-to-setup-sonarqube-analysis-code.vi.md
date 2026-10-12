---
template: "post"
title: "Cách cài đặt SonarQube phân tích mã nguồn"
date: 2023-03-18T10:12:00+07:00
author: letrungdo
slug: "how-to-setup-sonarqube-analysis-code"
lang: "vi"
cover: "../../images/2023/03/sonarqube.jpg"
keywords: "sonarqube, sonar-scanner"
categories:
  - DevOps
tags:
  - Sonarqube
---

## Cài đặt Sonarqube trên MacOS

#### Yêu cầu trước:
- Cài đặt Docker: https://docs.docker.com/desktop/install/mac-install

#### Kéo (pull) hình ảnh Sonarqube qua Docker:

```sh
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 sonarqube
```

hoặc

```sh
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 -e SONARQUBE_JDBC_USERNAME=sonar -e SONARQUBE_JDBC_PASSWORD=sonar -e SONARQUBE_JDBC_URL=jdbc:postgresql://localhost/sonar sonarqube
```

#### Khởi động Sonarqube:

```sh
docker start sonarqube
```

#### Cách sử dụng Sonarqube
Truy cập vào http://localhost:9000
Đăng nhập với username & password = admin

##### 1. Tạo project mới & Tạo token

<img class="aligncenter size-full" src="/media/2023/03/sonar-scanner.jpg" alt="sonar-scanner" />

##### 2. Tải sonar scanner: https://docs.sonarqube.org/9.9/analyzing-source-code/scanners/sonarscanner/

sau đó giải nén tệp & di chuyển vào /Users/xxx

Mở tệp /Users/xxx/.zshrc và thêm thư mục bin vào biến môi trường PATH:

```sh
 export PATH="$PATH:$HOME/sonar-scanner/bin"
```

##### 3. Chạy phân tích mã nguồn với SonarQube
Chuyển thư mục (cd) đến thư mục gốc của dự án và chạy lệnh:

```sh
sonar-scanner \
  -Dsonar.projectKey=test \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=sqp_79738bde96b1adb965512a861fbfbbb022f582af
```
