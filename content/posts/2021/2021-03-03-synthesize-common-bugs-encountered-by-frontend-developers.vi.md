---
template: "post"
title: Tổng hợp các lỗi thường gặp của lập trình viên Frontend
date: 2021-03-03T08:10:00+07:00
author: letrungdo
slug: "synthesize-common-bugs-encountered-by-frontend-developers"
lang: "vi"
cover: "../../images/2021/03/frontend-bugs.jpg"
keywords: "common bugs, frontend bugs, loi thuong gap frontend"
categories:
  - Bugs
  - Dev
---

Dưới đây là các lỗi thường gặp khi lập trình ứng dụng web.

## 1. window.open

Bạn cần gọi `window.open` kết quả trực tiếp từ một sự kiện `onclick` (sự kiện của người dùng)... bạn không thể thực hiện xử lý bất đồng bộ trước rồi mới gọi `window.open` trong kết quả trả về của nó.

## 2. Lỗi Invalid Date trong Safari

new Date("YYYY.MM.DD HH:mm") // không hoạt động trên Safari
new Date("MM.DD.YYYY") // không hoạt động trên Safari

new Date("MM/DD/YYYY HH:mm:ss") // hoạt động trên Safari
new Date("MM/DD/YYYY") // hoạt động trên Safari
new Date("YYYY/MM/DD") // hoạt động trên Safari

## 3. Jest test thất bại trong Pipeline build

Nguyên nhân: Múi giờ trên server khác với môi trường local.
Giải pháp tốt nhất: thêm `TZ=UTC` vào script test:

```json
"test": "TZ=UTC jest"
```

## 4. Văn bản không tự xuống dòng khi quá dài

Đối với văn bản cần xuống dòng, hãy chú ý kiểm thử trường hợp văn bản được viết liền không có khoảng trắng như: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

=> Nên đặt CSS:

```css
word-break: break-word;
```

## 5. Kiểm tra giá trị kiểu số (Check number)

Đối với giá trị kiểu number khi kiểm tra null hoặc rỗng, không nên dùng `if(value)` hoặc `value ? a : b`.
Bởi vì nếu `value = 0` thì `if(0)` sẽ trả về `false`.
