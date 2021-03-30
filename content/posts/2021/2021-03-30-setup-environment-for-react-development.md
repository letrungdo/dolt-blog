---
template: "post"
title: Setup environment for react development
date: 2021-03-30T15:30:16+07:00
author: letrungdo
slug: "setup-environment-for-react-development"
cover: "../../images/2021/03/react-vscode.png"
keywords: "vs code extension for react, environment for react development"
categories:
  - Dev
tags:
  - Nextjs
  - Reactjs
---
This is a quick post to show how to setup environment for react development. The main content is about using React in Visual Studio Code.
## 1. Install Node.js and yarn
- Install Node.js at https://nodejs.org/en/download. When installing nodejs, it installs the included npm.
- Install [yarn](https://classic.yarnpkg.com/en/docs/install):
```bash
npm install --global yarn
```

## 2. Install the Git CLI & VS Code
Download Git CLI from https://git-scm.com/downloads.
Download Vs Code: https://code.visualstudio.com/Download

## 3. Using React in Visual Studio Code
VS Code comes with built-in support for JavaScript, TypeScript and Node.js.

### 3.1. Recommended Extensions
1. [Debugger for Chrome](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial#_debugging-react)
2. [Eslint](https://code.visualstudio.com/docs/nodejs/reactjs-tutorial#_linting)
3. Prettier - Code formatter
4. vscode-icons
5. Auto Import
6. Auto Close Tag
7. Auto Rename Tag
8. Import Cost
9. TODO Highlight
10. GitLens

### 3.2. Setting auto format code on save
Open settings.json follow link: https://code.visualstudio.com/docs/getstarted/settings
Edit settings.json as below
```json
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
