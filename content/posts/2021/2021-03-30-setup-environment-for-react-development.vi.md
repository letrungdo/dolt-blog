---
template: "post"
title: Thiết lập môi trường phát triển ứng dụng React
date: 2021-03-30T15:30:16+07:00
author: letrungdo
slug: "setup-environment-for-react-development"
lang: "vi"
cover: "../../images/2021/03/react-vscode.jpg"
keywords: "vs code extension cho react, môi trường phát triển react"
categories:
  - Dev
tags:
  - Nextjs
  - Reactjs
---

Đây là bài viết nhanh hướng dẫn cách thiết lập môi trường để lập trình React. Nội dung chính tập trung vào việc sử dụng React trong Visual Studio Code.

## 1. Cài đặt Node.js và Yarn

- Cài đặt <a href="https://nodejs.org/en/download" target="_blank" rel="nofollow noopener noreferrer">Node.js</a>. Khi cài đặt Node.js, công cụ npm đi kèm cũng sẽ tự động được cài đặt.
- Cài đặt <a href="https://classic.yarnpkg.com/en/docs/install" target="_blank" rel="nofollow noopener noreferrer">Yarn</a>

```bash
npm install --global yarn
```

## 2. Cài đặt Git CLI & VS Code

- Tải về <a href="https://git-scm.com/downloads" target="_blank" rel="nofollow noopener noreferrer">Git CLI</a>
- Tải về <a href="https://code.visualstudio.com/Download" target="_blank" rel="nofollow noopener noreferrer">VS Code</a>

## 3. Sử dụng React trong Visual Studio Code

VS Code được tích hợp sẵn hỗ trợ cho JavaScript, TypeScript và Node.js.

### 3.1. Các Extension khuyên dùng

1. <a href="https://code.visualstudio.com/docs/nodejs/reactjs-tutorial#_debugging-react" target="_blank" rel="nofollow noopener noreferrer">Debugger for Chrome</a>
2. <a href="https://code.visualstudio.com/docs/nodejs/reactjs-tutorial#_linting" target="_blank" rel="nofollow noopener noreferrer">ESLint</a>
3. Prettier - Code formatter
4. vscode-icons
5. Auto Import
6. Auto Close Tag
7. Auto Rename Tag
8. Import Cost
9. TODO Highlight
10. GitLens

### 3.2. Cấu hình tự động định dạng code khi lưu (Format on Save)

Mở file <a href="https://code.visualstudio.com/docs/getstarted/settings" target="_blank" rel="nofollow noopener noreferrer">settings.json</a>
và chỉnh sửa như bên dưới:

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

## 4. Các công cụ thường dùng trong quá trình phát triển

- <a href="https://jsonblob.com" target="_blank" rel="nofollow noopener noreferrer">JSON Blob</a>: JSON Blob được tạo ra để hỗ trợ phát triển song song client/server. Các dữ liệu response dạng mock JSON có thể định nghĩa trực tiếp bằng trình soạn thảo online, sau đó phía client sử dụng API của JSON Blob để lấy và cập nhật dữ liệu mock.
- <a href="chrome://inspect/#devices" target="_blank" rel="nofollow noopener noreferrer">Chrome Inspect Devices</a>: Dùng để debug từ xa trên thiết bị Android.
  Bạn có thể cài extension <a href="https://chrome.google.com/webstore/detail/inspect-devices/gekjjfijolflhgbhjggpflnklibhkmjh?hl=vi" target="_blank" rel="nofollow noopener noreferrer">Inspect Devices</a> để mở nhanh hơn.
- <a href="https://jsonutils.com" target="_blank" rel="nofollow noopener noreferrer">JSON Utilities</a>: JSON Utils là website giúp sinh các class JavaScript, TypeScript... từ JSON. Ngoài ra công cụ này còn giúp làm sạch file JSON và cung cấp trình xem dữ liệu trực quan trong quá trình phát triển.
