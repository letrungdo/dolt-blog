---
template: "post"
title: Setup environment for react development
date: 2021-03-30T15:30:16+07:00
author: letrungdo
slug: "setup-environment-for-react-development"
cover: "../../images/2021/03/react-vscode.jpg"
keywords: "vs code extension for react, environment for react development"
categories:
  - Dev
tags:
  - Nextjs
  - Reactjs
---

This is a quick post to show how to setup environment for react development. The main content is about using React in Visual Studio Code.

## 1. Install Node.js and yarn

- Install <a href="https://nodejs.org/en/download" target="_blank" rel="nofollow noopener noreferrer">Node.js</a>. When installing nodejs, it installs the included npm.
- Install <a href="https://classic.yarnpkg.com/en/docs/install" target="_blank" rel="nofollow noopener noreferrer">yarn</a>

```bash
npm install --global yarn
```

## 2. Install the Git CLI & VS Code

- Download <a href="https://git-scm.com/downloads" target="_blank" rel="nofollow noopener noreferrer">Git CLI</a>
- Download <a href="https://code.visualstudio.com/Download" target="_blank" rel="nofollow noopener noreferrer">Vs Code</a>

## 3. Using React in Visual Studio Code

VS Code comes with built-in support for JavaScript, TypeScript and Node.js.

### 3.1. Recommended Extensions

1. <a href="https://code.visualstudio.com/docs/nodejs/reactjs-tutorial#_debugging-react" target="_blank" rel="nofollow noopener noreferrer">Debugger for Chrome</a>
2. <a href="https://code.visualstudio.com/docs/nodejs/reactjs-tutorial#_linting" target="_blank" rel="nofollow noopener noreferrer">Eslint</a>
3. Prettier - Code formatter
4. vscode-icons
5. Auto Import
6. Auto Close Tag
7. Auto Rename Tag
8. Import Cost
9. TODO Highlight
10. GitLens

### 3.2. Setting auto format code on save

Open <a href="https://code.visualstudio.com/docs/getstarted/settings" target="_blank" rel="nofollow noopener noreferrer">settings.json</a>
and edit as below

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

## 4. Commonly Tools used during development

- <a href="https://jsonblob.com" target="_blank" rel="nofollow noopener noreferrer">JSON blob</a>: JSON Blob was created to help parallelize client/server development. Mock JSON responses can be defined using the online editor and then clients can use the JSON Blob API to retrieve and update the mock responses.
- <a href="chrome://inspect/#devices" target="_blank" rel="nofollow noopener noreferrer">Chrome Inspect Devices</a>: Remote debug Android devices.
  You can install <a href="https://chrome.google.com/webstore/detail/inspect-devices/gekjjfijolflhgbhjggpflnklibhkmjh?hl=vi" target="_blank" rel="nofollow noopener noreferrer">Inspect Devices</a> extension to open it faster.
- <a href="https://jsonutils.com" target="_blank" rel="nofollow noopener noreferrer">JSON Utilities</a>: JSON Utils is a site for generating Javascript, Typescript... classes from JSON. It will also clean up your JSON and show a data viewer to assist you while you are developing.
