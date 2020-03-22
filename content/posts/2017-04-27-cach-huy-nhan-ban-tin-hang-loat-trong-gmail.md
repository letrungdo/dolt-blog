---
title: Cách hủy nhận bản tin hàng loạt trong Gmail
date: 2017-04-27T18:59:42+07:00
author: letrungdo
template: "post"
slug: "cach-huy-nhan-ban-tin-hang-loat-trong-gmail"
cover: "../images/2017/04/Gmail-Unsubscribe-Cover.png"
categories:
  - Tricks
tags:
  - Gmail Unsubscribe
---
Bạn nhận được quá nhiều thư rác, thư quảng cáo. Do thường hay đăng ký các tài khoản trên mạng, nên việc hủy nhận bản tin quảng cáo từng cái một rất tốn thời gian. <a href="https://unroll.me/" target="_blank" rel="noopener noreferrer"><strong>Unroll.me</strong></a> là dịch vụ trực tuyến miễn phí có tính năng **hủy nhận bản tin hàng loạt trong Gmail**. Tuy nhiên <span class="FullNameGroup"><a href="https://twitter.com/labnol/status/856193422578679808" target="_blank" rel="noopener noreferrer"><strong class="fullname show-popup-with-id " data-aria-label-part="">Amit Agarwal</strong>‏</a> nói rằng </span>Unroll.me đang âm thầm bán dữ liệu Gmail của bạn cho Uber.

<img class="aligncenter wp-image-138 size-full" src="/media/2017/04/huy-nhan-ban-tin-hang-loat-gmail.png" alt="hủy nhận bản tin hàng loạt trong Gmail unroll.me" width="598" height="459" /> 

Nếu điều này làm bạn lo lắng, dưới đây là hướng dẫn đơn giản để hủy nhận bản tin hàng loạt trong Gmail tốt nhất.

## Gmail Unsubscribe - Hủy nhận bản tin hàng loạt trong Gmail

<a href="https://github.com/labnol/unsubscribe-gmail#640353x2x2r2u29484w2u274u284u203" target="_blank" rel="noopener noreferrer">Source</a>: Tác giả: **Amit Agarwal**

Đây là một Google Script đơn giản phân tích nội dung hàng loạt email và tìm các liên kết để bỏ đăng ký. Nếu một liên kết hủy đăng ký được tìm thấy, tập lệnh sẽ mở liên kết và email của bạn sẽ tự động hủy đăng ký.

**Bước 1**: <a href="https://docs.google.com/spreadsheets/d/18hVYvHMeM1R7a_leHxGGjp2qzgRSd_-o7HxTF4-CM70/copy" target="_blank" rel="nofollow noopener noreferrer">Nhấp vào đây</a> để sao chép **Gmail Unsubscriber** vào Google Drive của bạn.

**Bước 2**: Chọn _Gmail Unsubscriber_ ** **trong Google Sheet và chọn _Configure_

<img class="aligncenter size-full" src="/media/2017/04/Gmail-Unsubscriber.png" alt="" /> 

Cho phép tập lệnh truy cập vào tài khoản Gmail của bạn.<figure id="attachment_140" aria-describedby="caption-attachment-140" style="width: 602px" class="wp-caption aligncenter">

<img class="size-full" src="/media/2017/04/Gmail-Unsubscriber-Allow.png" alt="" /> <figcaption id="caption-attachment-140" class="wp-caption-text">Chọn Allow</figcaption></figure> 

**Bước 3**: Vào Hộp thư đến trong Gmail của bạn, tạo mới nhãn Gmail với tên bạn đặt ở bước 2 (_mặc định_ là **Unsubscribe**** **)

Cách tạo nhãn: Vào <a href="https://mail.google.com/mail/u/0/#settings/labels" target="_blank" rel="noopener noreferrer">https://mail.google.com/mail/u/0/#settings/labels</a>, chọn **Create new label**, đặt tên label là **Unsubscribe => Create**

<img class="aligncenter size-full" src="/media/2017/04/Create-new-label.png" alt="" /> 

Tất cả các email được đánh dấu nhãn này sẽ tự động hủy đăng ký trong vòng 10-15 phút.

Kết quả sẽ được cập nhật trong _file Google Sheet_ bạn lấy ở **bước 1**.

<img class="aligncenter size-full" src="/media/2017/04/gmail-unsubscriber-kq.png" alt="" /> 

_Ưu điểm_: không bị mất cắp thông tin

_Nhược điểm_: Còn hạn chế một số bản tin không thể hủy đăng ký tự động được.