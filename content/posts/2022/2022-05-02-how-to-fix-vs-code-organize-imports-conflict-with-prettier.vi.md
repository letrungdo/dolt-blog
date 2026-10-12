---
template: "post"
title: Cách sửa lỗi xung đột giữa VSCode organizeImports và Prettier
date: 2022-05-02T12:52:11+07:00
author: letrungdo
slug: "how-to-fix-vs-code-organize-imports-conflict-with-prettier"
lang: "vi"
cover: "../../images/2022/05/organizeImports-conflict-with-prettier.jpg"
keywords: "organizeImports conflict with prettier, xung đột VSCode organizeImports"
categories:
  - Dev
tags:
  - VSCode
  - Reactjs
---

Extension Prettier bị xung đột với cài đặt organizeImports trong VSCode khi bật tính năng tự động sắp xếp import khi lưu file.

<img class="size-full" src="/media/2022/05/organizeImports-conflict-with-prettier.gif" alt="xung đột organizeImports với prettier" />

### Cách sửa lỗi xung đột giữa VSCode organizeImports và Prettier

Mở VSCode: Chọn View > Command Palette... > Nhập Preferences: Open Settings (JSON)
và chỉnh sửa cấu hình như bên dưới:

```json
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.codeActionsOnSave": {
   "source.fixAll.eslint": true,
   "source.organizeImports": true
},
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
],
"editor.formatOnSave": true
```
