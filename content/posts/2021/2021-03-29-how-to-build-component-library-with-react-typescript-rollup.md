---
template: "post"
title: How to build component library with React Typescript & Rollup
date: 2021-03-30T11:08:00+02:00
author: letrungdo
slug: "how-to-build-component-library-with-react-typescript-rollup"
cover: "../../images/2021/03/react-component-library.png"
keywords: "react component library, react storybook, react rollup typescript"
categories:
  - Dev
tags:
  - Nextjs
  - Reactjs
---
The main content is how to create an ui library with react typescript + rollup.

## Features:
- Storybook for UI development
- Emotion for write CSS in JS
- Jest Enzyme for testing
- Babel for transpiling
- Rollup for bundling

## 1. Main Directory Structure
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

## 2. Config Rollup build
```bash
npm init
```
Edit package.json:
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
Create rollup.config.js in root project with below content:
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
        external: [
            ...Object.keys(pkg.peerDependencies || {}),
        ],
    },
];
```
For the full source code, please refer to the following repo: https://github.com/letrungdo/react-ui-component-lib

## 3. How to use UI lib
Local import for development
In UI project run
```bash
npm run build
yarn link
```
In Frontend project run
```bash
yarn link <ui-name>
```
Ex: yarn link @letrungdo/web-ui

## 4. Reduce size when importing
If use VS Code you should install Import Cost extension to view the size of the imported package:
https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost

```js
import { Label } from "@letrungdo/web-ui/dist/lib/Label"; // 2.4K (gzipped: 1.1K)
import { Label } from "@letrungdo/web-ui"; // 3.9K (gzipped: 1.4K)
```

Above are two ways to import. => Should choose method 1 to reduce size.
