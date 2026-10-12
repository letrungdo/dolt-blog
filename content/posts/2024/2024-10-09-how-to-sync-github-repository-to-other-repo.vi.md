---
template: "post"
title: "Cách đồng bộ (sync) GitHub repository sang repository khác"
date: 2024-10-09T11:55:00+07:00
author: letrungdo
slug: "how-to-sync-github-repository-to-other-repo"
lang: "vi"
cover: "../../images/2024/10/sync-git-repo.jpg"
keywords: "sync git repo, dong bo github repository"
categories:
  - Github Action
---

Để đồng bộ một repository GitHub từ Tài khoản A sang Tài khoản B, bạn có thể sử dụng một vài phương pháp khác nhau tùy thuộc vào sở thích và yêu cầu của bạn. Dưới đây là cách tiếp cận phổ biến sử dụng SSH để Xác thực.

### Hướng dẫn từng bước để Thiết lập Xác thực SSH

### 1. Tạo cặp khóa SSH (SSH Key Pair)

Trên máy cục bộ của bạn, mở terminal và tạo một cặp khóa SSH mới dành riêng cho tác vụ này:

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Khi được hỏi, hãy lưu các khóa vào một tệp mới (ví dụ: ~/.ssh/github_actions_key). Để trống mật khẩu (passphrase).

Thao tác này sẽ tạo ra hai tệp:

- github_actions_key (khóa riêng tư - private key)
- github_actions_key.pub (khóa công khai - public key)

### 2. Thêm Khóa công khai vào Repository của Tài khoản B

- Đi tới repository trong Tài khoản B mà bạn muốn đồng bộ hóa đến.
- Chuyển đến **Settings > Deploy keys**.
- Nhấp vào **Add deploy key**, cung cấp tiêu đề và dán nội dung của tệp github_actions_key.pub.
- Bật tùy chọn **Allow write access** để đảm bảo quyền push và lưu khóa lại.

### 3. Thêm Khóa riêng tư làm Secret trong Repository của Tài khoản A

- Đi tới repository của Tài khoản A nơi bạn muốn thiết lập GitHub Action.
- Chuyển đến **Settings > Secrets and variables > Actions** và nhấp vào **New repository secret**.
- Đặt tên cho secret, ví dụ: SSH_PRIVATE_KEY.
- Mở tệp khóa riêng tư (github_actions_key) trong trình chỉnh sửa văn bản, sao chép nội dung của nó và dán vào secret.

### 4. Cấu hình GitHub Action Workflow để Sử dụng Khóa SSH

- Trong repository của Tài khoản A, tạo hoặc cập nhật tệp workflow GitHub Action của bạn để sử dụng khóa SSH cho việc xác thực. Dưới đây là một ví dụ:

```yaml
name: Sync to Account B with SSH

on:
  push:
    branches:
      - main

jobs:
  sync:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/github_actions_key
          chmod 600 ~/.ssh/github_actions_key
          ssh-keyscan github.com >> ~/.ssh/known_hosts
          echo "IdentityFile ~/.ssh/github_actions_key" >> ~/.ssh/config

      - name: Push to Target Repo
        run: |
          git remote add newTarget git@github.com:username/repository-name.git
          git push newTarget --all
          git push newTarget --tags

      - name: Cleanup SSH Key
        run: |
          rm -f ~/.ssh/github_actions_key
```
