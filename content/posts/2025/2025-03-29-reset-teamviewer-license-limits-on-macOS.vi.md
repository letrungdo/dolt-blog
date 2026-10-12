---
template: "post"
title: "Sửa lỗi giới hạn thời gian TeamViewer trên macOS"
date: 2025-03-29T10:00:00+08:00
author: letrungdo
slug: "reset-teamviewer-license-limits-on-macOS"
lang: "vi"
cover: "../../images/2025/03/teamviewer_license-limit.jpg"
keywords: "teamviewer license limits, loi teamviewer macos"
categories:
  - Softwares
  - Tricks
---

Bạn có gặp phải thông báo lỗi gây ức chế "**Your license limits the maximum session duration to a partner, immediate reconnects are blocked. Please try later or upgrade your license.**" khi sử dụng phiên bản TeamViewer miễn phí trên thiết bị macOS của mình? Đây là sự cố phổ biến đối với những người dùng dựa vào giấy phép miễn phí cho mục đích cá nhân, vì nó áp đặt các hạn chế về thời lượng phiên và cấm kết nối lại ngay lập tức.

### Khắc phục giới hạn thời gian giấy phép miễn phí của TeamViewer trên macOS

Các bước có thể giải quyết lỗi giới hạn giấy phép TeamViewer trên macOS:

Tải xuống tệp này: <a download="TeamViewer-15-id-changer-for-mac.py" href="/media/2025/03/TeamViewer-15-id-changer-for-mac.py" target="_blank" rel="noopener">**TeamViewer-15-id-changer-for-mac.py**</a>

> Tham khảo: <a href="https://gist.github.com/idarek/10cbc4fc28dd6a9db146122a1fe520a2" target="_blank">gist.github.com/idarek/10cbc4fc28dd6a9db146122a1fe520a2</a>

Mở **Terminal** và gõ:

```bash
sudo python3
```

Kéo và thả tệp **TeamViewer-15-id-changer-for-mac.py** vào cửa sổ Terminal. Thao tác này sẽ tự động thêm đường dẫn của tệp vào sau lệnh sudo python.

Nhấn phím Enter để thực thi lệnh.

Nhập Mật khẩu của bạn: Bạn sẽ được yêu cầu nhập mật khẩu quản trị viên macOS của mình. Nhập mật khẩu và nhấn Enter.

> Lưu ý: các ký tự mật khẩu sẽ không hiển thị trong Terminal.

Sau khi quá trình hoàn tất, hãy khởi động lại thiết bị macOS của bạn để các thay đổi có hiệu lực.

> Cân nhắc quan trọng và Tuyên bố miễn trừ trách nhiệm:

Tự chịu rủi ro khi sử dụng: Như đã đề cập ở trên, việc sử dụng "TeamViewer-15-id-changer-for-mac.py" như vậy có thể rủi ro và có thể vi phạm điều khoản dịch vụ của TeamViewer. Nó có thể dẫn đến việc tài khoản TeamViewer của bạn bị khóa hoặc các sự cố ngoài dự kiến khác.
Hiệu quả có thể khác nhau: Hiệu quả của phương pháp này có thể phụ thuộc vào phiên bản TeamViewer bạn đang sử dụng. TeamViewer có thể triển khai các bản cập nhật khiến các giải pháp thay thế này không còn hiệu quả.
