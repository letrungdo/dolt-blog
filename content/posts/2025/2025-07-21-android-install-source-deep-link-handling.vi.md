---
template: "post"
title: "Xác định nguồn cài đặt App và xử lý Deep Link trong lần đầu mở ứng dụng Android"
date: 2025-07-21T14:00:00+07:00
author: letrungdo
slug: "android-install-source-deep-link-handling"
lang: "vi"
cover: "../../images/2025/07/android-install-referrer-cover.png"
categories:
  - Dev
tags:
  - Android
  - Deep Link
  - Adjust
  - Firebase Dynamic Links
  - Install Referrer
---

Khi phát triển ứng dụng Android, việc xác định nguồn cài đặt và xử lý đúng cách các deep link trong lần đầu tiên mở ứng dụng là cực kỳ quan trọng để theo dõi các chiến dịch marketing và cải thiện trải nghiệm người dùng. Bài viết này sẽ tìm hiểu cách phân biệt các nguồn cài đặt khác nhau và quản lý các thách thức xử lý deep link phát sinh trong lần đầu mở ứng dụng.

## Tìm hiểu về Android Install Referrer API

Android Install Referrer API là một dịch vụ được cung cấp bởi Google Play giúp các nhà phát triển xác định nguồn gốc cài đặt của ứng dụng. API này rất cần thiết cho việc đo lường chiến dịch (attribution tracking), cho phép nhà phát triển hiểu được chiến dịch marketing, trang web hay ứng dụng nào đã dẫn dắt người dùng cài đặt ứng dụng. API cung cấp thông tin referrer đã được chuyển đến Google Play khi người dùng nhấp vào liên kết dẫn đến việc cài đặt ứng dụng.

Khi người dùng cài đặt ứng dụng lần đầu tiên, thường có 3 kịch bản phổ biến:

1. **Cài đặt qua link Adjust** - Khi người dùng nhấp vào liên kết theo dõi của Adjust từ một quảng cáo hoặc chiến dịch
2. **Cài đặt qua Firebase Dynamic Link** - Khi người dùng đi theo liên kết Firebase Dynamic Link dẫn đến Play Store
3. **Cài đặt từ tìm kiếm trên Play Store** - Khi người dùng tự tìm kiếm và cài đặt ứng dụng một cách tự nhiên (organic) trên Play Store

## Phân biệt giữa các nguồn cài đặt

Install Referrer API trả về các chuỗi định dạng URL referrer khác nhau cho từng nguồn cài đặt, cho phép nhà phát triển nhận biết và phân loại chúng tương ứng:

### Cài đặt qua link Adjust
Khi một ứng dụng được cài đặt thông qua liên kết theo dõi của Adjust, URL referrer chứa các tham số cụ thể của Adjust:
- Định dạng phản hồi: `com.android.installreferrer.api.ReferrerDetails@[hash]`
- Chuỗi URL Referrer: `adjust_reftag=cyt0ilQKOybFk`

Sự xuất hiện của tham số `adjust_reftag` chỉ ra rõ ràng rằng lượt cài đặt bắt nguồn từ một liên kết chiến dịch của Adjust, bao gồm cả thẻ theo dõi chiến dịch.

### Cài đặt qua Firebase Dynamic Link
Firebase Dynamic Links tạo ra một chuỗi referrer khác:
- Định dạng phản hồi: `com.android.installreferrer.api.ReferrerDetails@[hash]`
- Chuỗi URL Referrer: `utm_source=(not%20set)&utm_medium=(not%20set)`

Các giá trị "(not set)" của các tham số UTM là đặc trưng của các lượt cài đặt qua Firebase Dynamic Link khi không cung cấp các tham số chiến dịch cụ thể.

### Tìm kiếm tự nhiên trên Play Store
Lượt cài đặt tự nhiên thông qua tìm kiếm trên Play Store có chuỗi định dạng riêng:
- Định dạng phản hồi: `com.android.installreferrer.api.ReferrerDetails@[hash]`
- Chuỗi URL Referrer: `utm_source=google-play&utm_medium=organic`

Sự kết hợp giữa `utm_source=google-play` và `utm_medium=organic` chỉ ra rõ ràng đây là lượt cài đặt tự nhiên thông qua tìm kiếm trên Play Store.

## Thách thức xử lý Deep Link trong lần đầu mở ứng dụng

Khi xử lý deep link trong lần mở ứng dụng đầu tiên, nhà phát triển phải đối mặt với một thách thức độc đáo. Logic xử lý deep link của ứng dụng (`handleAppLinks`) có thể bị kích hoạt từ nhiều điểm vào khác nhau:

1. **onCreate()** - Được gọi khi Activity lần đầu tiên được tạo
2. **onNewIntent()** - Được gọi khi Activity nhận một Intent mới trong khi đang chạy
3. **setOnDeferredDeeplinkResponseListener()** - Callback của Adjust SDK dành cho các deferred deep link

### Vấn đề bị kích hoạt nhiều lần (Multiple Invocation Problem)

Trong lần cài đặt đầu tiên qua liên kết Adjust, cả 3 phương thức nêu trên có thể cùng cố gắng xử lý cùng một deep link, tiềm ẩn rủi ro gây điều hướng lặp lại hoặc các hành vi xung đột. Điều này xảy ra do:

- Hệ thống Android có thể chuyển intent deep link đến `onCreate()` hoặc `onNewIntent()`
- Đồng thời, Adjust SDK xử lý deferred deep link và kích hoạt callback của nó
- Nếu không có sự điều phối thích hợp, ứng dụng có thể xử lý cùng một deep link nhiều lần

### Hiểu về Deferred Deep Links

Phương thức `setOnDeferredDeeplinkResponseListener` đặc biệt quan trọng đối với các lượt cài đặt lần đầu. Callback này của Adjust SDK:

- Chỉ chạy một lần duy nhất trong lần mở ứng dụng đầu tiên sau khi cài đặt
- Chạy bất đồng bộ, thường là sau khi `onCreate()` và `onNewIntent()` đã thực thi xong
- Giao tiếp với máy chủ Adjust để lấy dữ liệu deep link ban đầu
- Trả về một giá trị boolean xác định xem Adjust có nên tự động mở một Activity mới hay không

Khi callback trả về `true`, Adjust sẽ cố gắng mở một Activity mới với deep link. Trả về `false` giúp nhà phát triển có toàn quyền kiểm soát luồng điều hướng.

### Triển khai chiến lược thực thi một lần duy nhất

Để đảm bảo deep link chỉ được xử lý đúng một lần trong lần đầu mở app, nhà phát triển cần triển khai cơ chế điều phối để:

1. **Theo dõi trạng thái thực thi** - Duy trì một biến cờ (flag) để đánh dấu xem deep link đã được xử lý hay chưa
2. **Ưu tiên nguồn xử lý** - Ưu tiên callback deferred deep link của Adjust khi có sẵn
3. **Triển khai logic thời gian** - Xử lý tính chất bất đồng bộ của callback từ Adjust
4. **Ngăn ngừa Race Conditions** - Sử dụng đồng bộ hóa để tránh các vấn đề thực thi đồng thời

Cách tiếp cận chung bao gồm:
- Xử lý ngay lập tức deep link từ callback của Adjust khi nhận được
- Lưu trữ tạm thời các deep link đến từ `onCreate()` hoặc `onNewIntent()`
- Triển khai cơ chế trì hoãn để chờ callback tiềm năng từ Adjust
- Chỉ xử lý deep link đã lưu trữ nếu không nhận được callback nào từ Adjust

## Thực hành tốt nhất và các lưu ý

### Theo dõi nguồn cài đặt
- Lưu trữ nguồn cài đặt đã xác định để phục vụ phân tích dữ liệu và phân khúc người dùng sau này
- Sử dụng nguồn cài đặt để tùy chỉnh trải nghiệm onboarding cho người dùng
- Theo dõi tỷ lệ chuyển đổi và hành vi người dùng dựa trên nguồn cài đặt

### Quản lý Deep Link
- Triển khai xử lý lỗi chặt chẽ cho các deep link bị lỗi hoặc không hợp lệ
- Xem xét các trường hợp đặc biệt như cập nhật ứng dụng hoặc cài đặt lại
- Kiểm thử kỹ lưỡng trên các kịch bản cài đặt khác nhau
- Giám sát việc xử lý deep link trên môi trường sản phẩm để kịp thời phát hiện sự cố

### Tối ưu hóa hiệu năng
- Giảm thiểu thời gian chờ callback từ Adjust để duy trì độ phản hồi mượt mà của ứng dụng
- Tùy chỉnh cơ chế timeout cho các thao tác phụ thuộc vào mạng
- Lưu bộ nhớ đệm (cache) dữ liệu nguồn cài đặt để tránh gọi API lặp đi lặp lại

### Cân nhắc về an ninh
- Kiểm tra tính hợp lệ của nội dung deep link trước khi xử lý
- Triển khai xác thực phù hợp cho các hành động nhạy cảm kích hoạt từ deep link
- Thận trọng với các deep link kích hoạt hành động tự động

## Kết luận

Thành công trong việc xác định nguồn cài đặt ứng dụng và xử lý deep link trong lần đầu mở ứng dụng đòi hỏi sự triển khai cẩn thận và cân nhắc kỹ các trường hợp biên. Bằng cách tận dụng Android Install Referrer API và triển khai chiến lược xử lý deep link có điều phối, các nhà phát triển có thể:

- Đo lường chính xác các lượt cài đặt ứng dụng về đúng nguồn gốc chiến dịch
- Mang lại trải nghiệm chuyển tiếp deep link mượt mà cho người dùng mới
- Tránh các hành vi điều hướng trùng lặp hoặc xung đột
- Thu thập dữ liệu phân tích giá trị để tối ưu hóa marketing

Điểm then chốt là hiểu rõ bản chất bất đồng bộ của các hệ thống này và triển khai cơ chế điều phối phù hợp để đảm bảo trải nghiệm người dùng liền mạch ngay từ khoảnh khắc cài đặt.
