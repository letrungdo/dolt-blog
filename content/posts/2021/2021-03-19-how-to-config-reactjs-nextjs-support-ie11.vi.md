---
template: "post"
title: Hướng dẫn cấu hình ReactJS NextJS hỗ trợ trình duyệt IE 11
date: 2021-03-19T09:10:00+07:00
author: letrungdo
slug: "how-to-config-reactjs-nextjs-support-ie11"
lang: "vi"
cover: "../../images/2021/03/nextjs-reactjs-support-ie11.png"
keywords: "reactjs support ie 11, nextjs support ie 11, reactjs ho tro ie 11"
categories:
  - Dev
tags:
  - Nextjs
  - Reactjs
---

Hiện tại IE 11 có rất ít người dùng, nhưng do yêu cầu của nhiều dự án vẫn cần hỗ trợ IE 11.
Tôi sẽ hướng dẫn chi tiết từng bước cấu hình hỗ trợ IE 11 cho ReactJS và NextJS.

## 1. Browserslist trong package.json

Thêm ie 11 vào cấu hình browserslist:

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

## 2. Sử dụng react-app-polyfill

Nếu bạn đang dùng Create React App, bạn không cần cài thêm gói npm này.

```bash
> npm install react-app-polyfill
```

Lưu ý phải import dòng này ở dòng đầu tiên trong src/index.js:

```js
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
```

## 3. Hỗ trợ var() css

```bash
> npm install react-app-polyfill
```

Import và gọi cssVars trong src/index.js:

```js
import cssVars from "css-vars-ponyfill";

cssVars();
```

## 4. Hỗ trợ URLSearchParams

Lưu ý phải import dòng này ở dòng đầu tiên trong src/index.js:

```js
import "core-js/features/url-search-params";
```
