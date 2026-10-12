---
template: "post"
title: Hướng dẫn tạo thư viện UI component với React Typescript & Rollup
date: 2021-03-30T11:08:00+07:00
author: letrungdo
slug: "how-to-build-component-library-with-react-typescript-rollup"
lang: "vi"
cover: "../../images/2021/03/react-component-library.jpg"
keywords: "react component library, react storybook, react rollup typescript"
categories:
  - Dev
tags:
  - Nextjs
  - Reactjs
---

Nội dung chính của bài viết hướng dẫn cách tạo một thư viện UI bằng React TypeScript + Rollup.

## Các tính năng:

- Storybook phục vụ phát triển giao diện UI
- Emotion để viết CSS trong JS
- Jest Enzyme phục vụ kiểm thử (testing)
- Babel để biên dịch mã nguồn (transpiling)
- Rollup để đóng gói (bundling)

## 1. Cấu trúc thư mục chính

- src
  - lib
    - index.ts
    - Component1
      - index.tsx
      - Component1.stories.tsx
      - Component1.test.tsx
    - Component2
      - index.tsx
      - Component2.stories.tsx
      - Component3.test.tsx
    - ...
- package.json
- rollup.config.js
- tsconfig-lib.json
- tsconfig.json

## 2. Cấu hình build Rollup

```bash
npm init
```

Chỉnh sửa file package.json:

```json
{
  ...
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
      "dist"
  ],
  "scripts": {
      "build": "rm -rf dist && rollup -c",
      ...
  }
  ...
}
```

```bash
npm i @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-image @rollup/plugin-node-resolve rollup rollup-plugin-sass rollup-plugin-typescript2 -D
```

Tạo file rollup.config.js ở thư mục gốc project với nội dung bên dưới:

```js
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import resolve from "@rollup/plugin-node-resolve";
import sass from "rollup-plugin-sass";
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

export default [
  {
    input: ["src/index.ts"],
    output: [
      {
        dir: "dist",
        format: "cjs",
        exports: "auto",
      },
    ],
    preserveModules: true,
    plugins: [
      typescript({ tsconfig: "tsconfig-lib.json" }),
      sass({
        insert: true,
      }),
      image(),
      babel({
        babelHelpers: "bundled",
        presets: ["@babel/preset-env", "@babel/preset-react"],
        extensions: [".js"],
        exclude: ["node_modules/**"],
      }),
      resolve(),
      commonjs(),
    ],
    external: [...Object.keys(pkg.peerDependencies || {})],
  },
];
```

Để xem toàn bộ mã nguồn, vui lòng tham khảo <a href="https://github.com/letrungdo/react-ui-component-lib" target="_blank" rel="noopener noreferrer">repository này</a>

## 3. Cách sử dụng thư viện UI

Import local phục vụ phát triển
Tại project UI chạy:

```bash
npm run build
yarn link
```

Tại project Frontend chạy:

```bash
yarn link <ui-name>
```

Ví dụ: yarn link @letrungdo/web-ui

## 4. Giảm dung lượng khi import

Nếu sử dụng VS Code, bạn nên cài extension <a href="https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost" target="_blank" rel="nofollow noopener noreferrer">Import Cost</a> để xem dung lượng gói package được import:

```js
import { Label } from "@letrungdo/web-ui/dist/lib/Label"; // 2.4K (gzipped: 1.1K)
import { Label } from "@letrungdo/web-ui"; // 3.9K (gzipped: 1.4K)
```

Trên đây là hai cách import => Nên chọn cách 1 để giảm dung lượng bundle.
