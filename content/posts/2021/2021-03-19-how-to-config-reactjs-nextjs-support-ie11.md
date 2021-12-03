---
template: "post"
title: How to config reactjs nextjs support IE 11
date: 2021-03-19T09:10:00+07:00
author: letrungdo
slug: "how-to-config-reactjs-nextjs-support-ie11"
cover: "../../images/2021/03/nextjs-reactjs-support-ie11.png"
keywords: "reactjs support ie 11, nextjs support ie 11"
categories:
  - Dev
tags:
  - Nextjs
  - Reactjs
---

Currently IE 11 has very few users, but due to the requirement of many projects that need support IE 11.
I will detail how to step by step configuring support IE 11 for reactjs and nextjs.

## 1. Browserslist in package.json

Add ie 11 into browserslist

```json
"browserslist": {
    "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
    ],
    "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version",
        "ie 11"
    ]
}
```

## 2. Use react-app-polyfill

If you are using Create React App, you do not need to install this npm.

```bash
> npm install react-app-polyfill
```

Import this must be the first line in src/index.js

```js
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
```

## 3. Support var() css

```bash
> npm install react-app-polyfill
```

Import and call cssVars in src/index.js

```js
import cssVars from "css-vars-ponyfill";

cssVars();
```

## 4. Support URLSearchParams

Import this must be the first line in src/index.js

```js
import "core-js/features/url-search-params";
```
