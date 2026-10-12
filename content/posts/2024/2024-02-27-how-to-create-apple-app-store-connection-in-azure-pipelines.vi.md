---
template: "post"
title: "Cách tạo kết nối Apple App Store Connection trong Azure Pipelines"
date: 2024-02-27T16:52:00+07:00
author: letrungdo
slug: "how-to-create-apple-app-store-connection-in-azure-pipelines"
lang: "vi"
cover: "../../images/2024/02/app-store-connect.jpg"
keywords: "apple app store connection"
categories:
  - Flutter
---

### Thử triển khai ứng dụng iOS lên TestFlight qua Azure DevOps - Gặp lỗi build

Cách khắc phục là mã hóa base64 toàn bộ tệp .p8 khi bạn thêm nó vào Service Connection. Mặc dù tệp .p8 tải xuống từ cổng Apple Developer trông giống như đã được mã hóa base64, nhưng nó cần phải được mã hóa lại, bao gồm cả phần "-----BEGIN PRIVATE KEY-----".

Liên kết được chia sẻ bởi @hlf0506 ( https://damienaicheh.github.io/azure/devops/2021/10/27/configure-azure-devops-app-store-en.html ) cung cấp hướng dẫn cách thực hiện việc này (được sao chép bên dưới):

Liên quan đến API_KEY_ENCODED để tạo ra nó, chỉ cần mã hóa nội dung của tệp .p8 nguyên bản. Không thay đổi định dạng của tệp nếu không sẽ không hoạt động. Để chuyển đổi khóa của bạn sang base64, hãy đặt tệp vào tệp txt và chạy một trong các lệnh bên dưới, tùy thuộc vào HĐH của bạn. Bạn sẽ nhận được một tệp chứa chuỗi base64 đại diện cho khóa API của bạn.

Windows

> certutil -encode data.txt tmp.b64 && findstr /v /c:- tmp.b64 > data.b64 && del tmp.b64

Mac

> base64 -i data.txt -o data.b64

Ubuntu

> base64 data.txt > data.b64
