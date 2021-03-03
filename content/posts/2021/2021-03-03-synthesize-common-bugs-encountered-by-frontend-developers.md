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


