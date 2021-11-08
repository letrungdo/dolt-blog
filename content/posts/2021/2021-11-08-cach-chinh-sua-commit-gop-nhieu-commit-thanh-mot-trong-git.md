---
template: "post"
title: Cách chỉnh sửa commit, gộp nhiều commit thành một trong git
date: 2021-11-08T15:20:22+02:00
author: letrungdo
slug: "cach-chinh-sua-commit-gop-nhieu-commit-thanh-mot-trong-git"
cover: "../../images/2021/11/git-rebase.webp"
keywords: "git rebabse, git merge history"
categories:
  - Git
tags:
  - Rebase
---
Bài viết này sẽ hướng dẫn các bạn cách push nội dung chỉnh sửa gộp chung với commit trước đó mà không tạo thêm commit mới.
Và cách gọp các commit cũ thành 1 commit duy nhất để làm gọn git history.

## Cách push nội dung chỉnh sửa gộp chung với commit trước đó
Mở terminal và nhập lệnh sau:

```bash
git add .
git commit --amend --no-edit
git push --force
```

## Cách gọp các commit cũ thành 1 commit duy nhất
Ví dụ: Git của bạn có 10 commit bắt đầu từ commitID commitID1 -> commitID2 -> ... -> commitID10
Bạn muốn gộp commitID4 đến commitID8 thành 1 commit thì làm các bước như dưới:

```bash
git rebase -i commitID10
```
Sau đó sẽ hiển thị tương tự như này:

```bash
pick a00a16b add page download-osmosis-notes # add mterial-ui
pick 6379f63 update ui
pick 181fbf3 update ui
pick b3ab886 fix flicker css
pick 509b655 no need AppBar
pick 0b852b9 update readme
```

Bạn dùng bàn phím sửa chữ pick thành s ở các commit nào muốn gộp chung. Kết quả như sau:
```bash
pick a00a16b add page download-osmosis-notes # add mterial-ui
s 6379f63 update ui
s 181fbf3 update ui
s b3ab886 fix flicker css
pick 509b655 no need AppBar
pick 0b852b9 update readme
```

Sau khi sửa xong thì nhấn phím ESC và gõ
```bash
:x
```
nhấn enter.

Gõ tiếp lệnh cuối là ok:
```bash
git push --force
```
