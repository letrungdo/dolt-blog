---
template: "post"
title: Synthesize common bugs encountered by frontend developers
date: 2021-03-03T08:10:00+07:00
author: letrungdo
slug: "synthesize-common-bugs-encountered-by-frontend-developers"
cover: "../../images/2021/03/frontend-bugs.jpg"
keywords: "common bugs, frontend bugs"
categories:
  - Bugs
  - Dev
---
Below are the common bugs encountered when coding the web.

## 1. window.open
You need to call window.open as a direct result of a onclick event (user event)... you can't do something before async, and then on a result of that do the window.open

## 2. Invalid date in safari
new Date("YYYY.MM.DD HH:mm") // doesn't work in safari
new Date("MM.DD.YYYY") // doesn't work in safari

new Date("MM/DD/YYYY HH:mm:ss") // work in safari
new Date("MM/DD/YYYY") // work in safari
new Date("YYYY/MM/DD") // work in safari

## 3. Jest tests failing in Pipeline build
Cause: Different time zone than local.
Best solution: add TZ=UTC into script test
```json
"test": "TZ=UTC jest"
```

## 4. Text cannot get line breaks when it is too long
For text that needs line breaks, pay attention to test the case where the text is written contiguous such as: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

=> Should set css:
```css
word-break: break-word
```

## 5. Check number
For value type number to check null or empty, it is not allowed if(value) or value ? a : b
Because if value = 0 then if(0) return false
