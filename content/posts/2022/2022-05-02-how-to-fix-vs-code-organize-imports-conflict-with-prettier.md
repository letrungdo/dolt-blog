---
template: "post"
title: How to fix VSCode organizeImports conflict with prettier
date: 2022-05-02T12:52:11+07:00
author: letrungdo
slug: "how-to-fix-vs-code-organize-imports-conflict-with-prettier"
cover: "../../images/2022/05/organizeImports-conflict-with-prettier.jpg"
keywords: "organizeImports conflict with prettier, VSCode organizeImports conflict"
categories:
  - Dev
tags:
  - VSCode
  - Reactjs
---

Prettier extensions conflicts with the the organizeImports setting in VSCode, when organize imports on save is enabled.

<img class="size-full" src="/media/2022/05/organizeImports-conflict-with-prettier.gif" alt="organizeImports conflict with prettier" />

### How to fix VSCode organizeImports conflict with prettier

Open VsCode: Select View > Command Palette... > Enter Preferences: Open Settings (JSON)
and edit as below

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
