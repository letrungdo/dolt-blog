---
title: Không xóa được theme trong WordPress
date: 2016-04-23T23:42:00+07:00
author: letrungdo
template: "post"
guid: /?p=174
slug: "khong-xoa-duoc-theme-plugin-wordpress"
cover: "../../images/2016/04/perm.png"
categories:
  - Web
tags:
  - Wordpress
---

Mình đang dùng theme premium trên mạng chia sẽ miễn phí. Khi theme có bản update, mình gỡ theme cũ xuống để up theme mới, nhưng xóa mãi không được. Vào <a href="https://en.wikipedia.org/wiki/DirectAdmin" target="_blank" rel="noopener"><strong>Direct Admin</strong></a> xóa thì vẫn không xóa được theme. Nó hiện ra thông báo lỗi như sau:

<table style="height: 201px;" width="823" cellspacing="0" cellpadding="5">
  <tr>
    <td align="center" valign="middle">
      <p align="center">
        Unable to delete files
      </p>
    </td>
  </tr>
  
  <tr>
    <td align="center" valign="middle" height="1">
    </td>
  </tr>
  
  <tr>
    <td align="center" valign="top">
      <p align="center">
        <b>Details</b>
      </p>
      <p align="center">
        Unable to delete directory /domains/tđ.vn/public_html/wp-content/themes/glamour: <b>The directory /domains/tđ.vn/public_html/wp-content/themes/glamour is not empty</b>
      </p>
    </td>
  </tr>
</table>

## Cách sửa lỗi không xóa được theme rất đơn giản

Chỉ cần thay đổi giá trị "**perm**" trong chỗ quản lý File là xong thôi.

Các bạn làm như sau: Đăng nhập vào** Direct Admin **chọn chỗ quản lí File, chọn thư mục chứa trang web của bạn.

Vào **wp-content** > **themes**

Trong thư mục theme này bạn chọn thư mục theme mà bạn xóa không được. Ở đây của mình là **glaroum**

<img class="aligncenter size-full wp-image-2076" src="/media/2016/04/perm.png" alt="" width="780" height="490" srcset="/media/2016/04/perm.png 780w, /media/2016/04/perm-768x482.png 768w" sizes="(max-width: 780px) 100vw, 780px" />

Thư mục theme glamour của mình "**perm**". đang có giá trị **577** do đó không thể xóa được cái này.

Bạn tìm thấy nút **set Permission** có **giá trị mặc định** là **755** nên chỉ cần bấm set Permission là xong. Nếu giá trị này khác ở trên thì bạn sửa lại là 755 rồi set.

_**Lưu ý**_: nếu xóa vẫn không được thì bạn set permission hết tất cả các thư mục con của theme đó là 755 rồi xóa luôn 1 lần là xong.

### Vậy perm là gì?

Perm hay Permission còn thường được gọi là **Chmod**

Chmod nghĩa là thiết lập quyền (xem, xóa …) trên file hay thư mục. Để phù hợp với cấu hình bảo mật của **Host**, thường thì mặc định chmod theo chuẩn 644 với file, 755 với floder.

Perm có các quyền sau:

- "Read" (Đọc): được biểu diễn bằng số 4
- "Write" (Ghi / Chỉnh sửa): được biểu diễn bằng số 2
- "Execute" (Thực thi): được biểu diễn bằng số 1

- User: Chủ sở hữu của file/thư mục
- Group: Nhóm mà User là thành viên
- Word: Những người còn lại

Ví dụ: Chmod = 755 cho các thư mục có nghĩa là:  
7 = 4 + 2 + 1 : Người sở hữu thư mục có quyền đọc thư mục (read); chỉnh sửa thư mục (write); liệt kê các thư mục và file bên trong (execute)  
5 = 4 + 0 + 1 : Những người cùng nhóm chỉ có quyền đọc thư mục (read); liệt kê các thư mục và file bên trong (execute)  
5 = 4 + 0 + 1 : Những người còn lại chỉ có quyền đọc thư mục (read); liệt kê các thư mục và file bên trong (execute)

_**Kết luận:**_ Vì một lí do nào đó mình cũng không rõ tại sao thư mục theme của mình lại tự động bị đổi thông số "perm" gây ra không xóa được theme. Mong bạn đọc cùng bình luận sâu hơn về vấn đề này.
