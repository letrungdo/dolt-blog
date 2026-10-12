---
template: "post"
title: Tự động Build & Deploy Nextjs với Azure Pipelines qua SSH
date: 2020-10-31T20:32:22+07:00
author: letrungdo
slug: "auto-build-and-deploy-nextjs-with-azure-pipelines-via-ssh"
lang: "vi"
cover: "../../images/2020/10/azure-pipelines-ssh.png"
keywords: "Deploy Nextjs with Azure Pipelines, tu dong deploy nextjs azure"
categories:
  - DevOps
tags:
  - Nextjs
---

Trong [bài viết trước](/how-to-deploy-nextjs-to-centos-apache), tôi đã hướng dẫn cách deploy NextJS lên CentOS.
Trong bài viết này, tôi sẽ hướng dẫn bạn tự động build và deploy NextJS lên server bằng Azure Pipelines.

Bài viết sẽ không giới thiệu lại Azure Pipelines là gì hay cách tạo mới pipeline.
Nếu bạn là người mới, bạn có thể tham khảo tại <a href="https://docs.microsoft.com/en-us/azure/devops/pipelines/get-started/" target="_blank" rel="nofollow noopener">đây</a>.

### Thêm task SSH

Tôi thích dùng trình chỉnh sửa giao diện (classic editor) để tạo pipeline mà không cần dùng file YAML.

<img src="/media/2020/azure-pipelines-ssh.png" class="aligncenter size-full" alt="azure pipelines ssh" />

#### 1. Thêm Service connection

Bấm vào nút "manage" (mục 1) để tạo kết nối SSH tới server.

#### 2, 3. Thêm script

Chọn "Inline Script" (mục 2) và dán đoạn mã bên dưới vào:

```bash
cd /var/www/html/your-source-code
git checkout .
git pull
npm i
npm run build
pm2 restart yourapp
```

Đoạn lệnh trên có nghĩa là bạn trỏ tới thư mục chứa mã nguồn, reset lại các file có thay đổi. Sau đó pull về mã nguồn mới nhất. Cài đặt các gói npm và build mã nguồn.

Cuối cùng để PM2 cập nhật lại bản build vừa được tạo.

#### 4. Ngăn chặn thất bại khi có STDERR (Prevent Fail on STDERR)

Nếu tùy chọn này được chọn, tiến trình build sẽ thất bại khi các lệnh hoặc script trên máy chủ từ xa ghi dữ liệu ra luồng STDERR.

#### File yaml hoàn chỉnh

```yaml
- task: SSH@0
  displayName: "Run shell inline on remote machine"
  inputs:
    sshEndpoint: "your-ssh-endpoint"
    runOptions: inline
    inline: |
      cd /var/www/html/your-source-code
      git checkout .
      git pull
      npm i
      npm run build
      pm2 restart yourapp
    failOnStdErr: false
```

#### 5. Tự động chạy pipeline khi merge vào nhánh develop

Chọn tab Triggers.  
Tích chọn Enable continuous integration. Nhập thông tin Branch specification: develop
<img src="/media/2020/azure-pipelines-trigger.png" class="aligncenter size-full" alt="azure pipelines trigger" />

> Mẹo: Bạn có thể thêm task "Post to Slack" để gửi thông báo khi tiến trình build hoàn tất.
