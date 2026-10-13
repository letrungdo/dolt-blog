---
template: "post"
title: "Tăng tốc E2E Test cho Desktop App: Tạm biệt Appium, chuyển sang Native Accessibility API"
date: 2026-10-13T10:00:00+07:00
author: letrungdo
slug: "speed-up-pc-app-e2e-testing-replacing-appium"
lang: "vi"
cover: "../../images/2026/10/e2e-testing-cover.png"
categories:
  - Dev
tags:
  - Flutter
  - E2E Testing
  - Automation
  - Python
  - Testing
---

Khi tự động hóa kiểm thử End-to-End (E2E) cho các ứng dụng Desktop (PC App trên Windows và macOS) - đặc biệt là các ứng dụng phức tạp với nhiều cửa sổ, giao diện cập nhật thời gian thực (real-time UI) - **Appium** (thông qua WinAppDriver trên Windows hoặc Mac2/WebDriverAgent trên macOS) thường là lựa chọn phổ biến hàng đầu.

Tuy nhiên, khi quy mô bộ test mở rộng lên hàng trăm test case, Appium bộc lộ những điểm yếu chết người về hiệu năng: thời gian chạy quá lâu, phản hồi chậm chạp khi tìm kiếm phần tử trên giao diện phức tạp và thường xuyên gặp lỗi ngắt kết nối session.

Bài viết này chia sẻ giải pháp kiến trúc mới: **Loại bỏ hoàn toàn Appium** và chuyển sang giao tiếp trực tiếp với **Native Accessibility API** của hệ điều hành (Windows UI Automation & macOS Accessibility API). Kết quả đạt được hết sức ấn tượng: **tốc độ test tăng từ 3x đến hơn 10x**, toàn bộ bộ test hơn 700 test cases hoàn thành chỉ trong chưa đầy 30 phút.

---

## Tại sao Appium lại trở thành "Nút thắt cổ chai" trên Desktop App?

Appium được thiết kế như một lớp trừu tượng hóa (abstraction layer) theo chuẩn WebDriver để kiểm thử đa nền tảng. Khi áp dụng cho ứng dụng PC Desktop, kiến trúc này gặp phải các vấn đề nghiêm trọng:

### 1. Chi phí trung gian (Overhead) và Độ trễ mạng quá cao
Mỗi thao tác đơn giản như `click()`, `find_element()`, hay `type()` trong Appium đều phải trải qua hàng loạt bước trung gian:
`Test Script (Python/JS)` ➔ `Appium Server (Node.js)` ➔ `Driver Daemon (WinAppDriver / WebDriverAgentMac)` ➔ `OS API` ➔ Trả kết quả ngược lại theo đường HTTP REST.

Việc gửi các request HTTP liên tục tạo ra độ trễ (latency) không đáng có cho từng bước tương tác.

### 2. Thao tác duyệt cây Accessibility quá chậm
Trên các màn hình ứng dụng Desktop phức tạp (chứa 200–300 nodes giao diện, các bảng dữ liệu cập nhật liên tục):
- **Trên Windows**: Các truy vấn XPath hoặc `page_source` của WinAppDriver phải đọc thuộc tính từng element một cách tuần tự. Một câu lệnh tìm kiếm đơn giản có thể mất từ **16 giây đến 75 giây** chỉ để định vị 1 phần tử!
- **Trên macOS**: Driver Mac2 gửi lệnh qua HTTP đến WebDriverAgentMac, mất khoảng **0.3s - 0.5s** cho mỗi lần lookup, và tốn hơn **2s** chỉ để gõ một chuỗi văn bản vào ô text field.

### 3. Sự thiếu ổn định của Session
Các daemon như `WebDriverAgentMac` hoặc `WinAppDriver` dễ rơi vào trạng thái treo (stale session), báo lỗi `Failed to launch` hoặc `Could not proxy command`, khiến các luồng CI/CD tự động bị sập vô cớ.

---

## Giải pháp: Giao tiếp trực tiếp với Native Accessibility API của OS

Để giải quyết triệt để vấn đề, chiến lược được lựa chọn là xây dựng một **Custom Driver mỏng nhẹ bằng Python**, tương tác trực tiếp với API gốc của từng hệ điều hành mà không cần qua bất kỳ server trung gian nào.

```
┌─────────────────────────────────────────────────────────┐
│              Pytest Test Suite (Python)                 │
│         Sử dụng chung giao diện Driver thống nhất       │
└────────────────────────────┬────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│    Windows Driver     │         │     macOS Driver      │
│  UIAutomationCore.dll │         │ ApplicationServices   │
│   (comtypes / Win32)  │         │   (pyobjc / Quartz)   │
└───────────┬───────────┘         └───────────┬───────────┘
            │                                 │
            ▼                                 ▼
┌─────────────────────────────────────────────────────────┐
│                 Desktop App Under Test                  │
│       (Nhận Native Events: Click, Typing, Scroll)       │
└─────────────────────────────────────────────────────────┘
```

### 1. Windows: Tận dụng UI Automation Core via `comtypes`
Thay vì để WinAppDriver duyệt từng phần tử qua PowerShell/HTTP, driver mới gọi trực tiếp vào `UIAutomationCore.dll` của Windows sử dụng thư viện `comtypes` trong Python:

- **Cache toàn bộ cây UI trong 1 lần gọi**: Sử dụng `ElementFromHandleBuildCache` kết hợp với `TreeScope_Subtree`. Toàn bộ cấu trúc cây giao diện của một cửa sổ lớn (chứa ~200 nodes) được tải về bộ nhớ chỉ trong **~0.3 giây** (so với 16–75s của Appium).
- **Gõ phím & Click chuẩn Native**: Sử dụng Win32 API (`SendInput`) để gửi các sự kiện chuột và phím Unicode thực sự. Điều này loại bỏ hoàn toàn hiện tượng gõ sót ký tự hoặc xung đột với bộ gõ Tiếng Việt / Nhật trên hệ thống.

### 2. macOS: Tận dụng Accessibility API via `pyobjc`
Trên macOS, driver giao tiếp trực tiếp với framework `ApplicationServices` (`AXUIElement`) và `Quartz` thông qua `pyobjc`:

- **Đọc cây giao diện siêu tốc**: Lệnh `AXUIElementCopyMultipleAttributeValues` cho phép quét toàn bộ các cửa sổ của ứng dụng chỉ trong **10ms - 60ms**.
- **Mô phỏng sự kiện phần cứng chuẩn**: Sử dụng `CGEvent` để phát sự kiện click chuột tại tọa độ center của element và gửi keypress dưới dạng Unicode string, chỉ khi ứng dụng đang ở trạng thái active trên cùng.

---

## Kiến trúc bổ trợ giúp bộ E2E Test đạt tốc độ tối đa

Việc thay đổi Driver chỉ là một nửa chặng đường. Để bộ E2E test đạt tốc độ vượt trội và độ tin cậy 100%, kiến trúc test cần kết hợp đồng bộ các yếu tố sau:

### 1. In-App Offline Fake Server (Loại bỏ phụ thuộc Network)
Mọi cuộc gọi API và kết nối WebSocket (như dữ liệu đẩy real-time) đều được xử lý bởi một **Fake Server tích hợp sẵn ngay bên trong bản build E2E** (kích hoạt qua flag biên dịch như `--dart-define=E2E=true`).
- **Ưu điểm**: Không cần mạng internet, không sợ backend lag hay downtime.
- **Linh hoạt**: Dễ dàng giả lập các kịch bản lỗi (mất mạng, hết hạn phiên đăng nhập, lỗi giao dịch) một cách tức thì thông qua cấu hình scenario.

### 2. Chiến lược Test ID không ảnh hưởng đến Production
Giao diện ứng dụng (ví dụ với Flutter) gán các Test ID thông qua thuộc tính `Semantics(identifier/label = testId)`.
- **Bản E2E**: Quét và ánh xạ Test ID vào dòng đầu tiên của nhãn Accessibility (`test.id\nText hiển thị`). Driver chỉ cần tìm kiếm theo Test ID này.
- **Bản Release Production**: Flag biên dịch loại bỏ toàn bộ code giả lập và Test ID (tree-shaken), đảm bảo file binary sản phẩm hoàn toàn sạch sẽ và tối ưu dung lượng.

### 3. Quản lý môi trường test cô lập (Isolated Environment)
Mỗi lần chạy test case, ứng dụng tự động khởi tạo trên một thư mục dữ liệu riêng biệt (`<appSupport>/e2e/<runId>/`). Nhờ đó, trạng thái dữ liệu (database, cài đặt, cache) của các test case không bao giờ bị chồng chéo hay ảnh hưởng lẫn nhau.

### 4. Tự động hóa cả các thao tác OS Native (File Dialog & Browser)
Các test case thường gặp như chọn file lưu/mở (Open/Save File Dialog) hoặc mở liên kết ngoài trình duyệt Web được driver xử lý trực tiếp qua API hệ điều hành:
- Tự động bắt và điền đường dẫn vào OS File Dialog.
- Đợi trình duyệt ngoài mở ra, chụp ảnh bằng chứng (evidence screenshot), rồi tự động đóng tab trình duyệt để trả lại không gian cho ứng dụng.

---

## So sánh hiệu năng: Appium vs. Native Accessibility Driver

Dưới đây là bảng số liệu đo đạc thực tế khi chạy bộ kiểm thử trên cùng một cấu hình máy:

| Thao tác / Kịch bản | Appium (WinAppDriver / Mac2) | Native Accessibility Driver | Mức độ cải thiện |
|---|---|---|---|
| **Khởi chạy app đến màn hình chính** | ~7.3 giây | **1.9 giây** | **Nhanh hơn ~3.8x** |
| **Nhập liệu vào Text Field** | ~2.0 giây / ô | **0.2 - 0.4 giây** / ô | **Nhanh hơn 5x - 10x** |
| **Tìm kiếm & Click UI Control** | 0.3s - 1.0s (lên tới 16s+) | **~0.01 giây** | **Nhanh hơn 30x - 100x** |
| **Luồng giao dịch phức tạp (Order Journey)** | ~24.0 giây | **6.7 giây** | **Nhanh hơn ~3.5x** |
| **Tổng thời gian chạy toàn bộ Suite (~700 test cases)** | Nhiều giờ (thường xuyên timeout) | **~29 phút** | **Hoàn thành mượt mà** |

---

## Tổng kết & Bài học kinh nghiệm

Chuyển đổi từ **Appium** sang **Native Accessibility API** là một bước đi mang tính bước ngoặt cho dự án kiểm thử Desktop App:

1. **Hiệu năng là ưu tiên số 1**: Khi bộ test phát triển lên hàng trăm kịch bản, từng độ trễ nhỏ 0.5s sẽ tích tụ thành hàng giờ chờ đợi. Đi thẳng vào API gốc của OS giúp loại bỏ hoàn toàn độ trễ thừa.
2. **Độ ổn định tuyệt đối**: Không còn các lỗi vặt do crash server trung gian hay mất kết nối WebDriver session.
3. **Mã nguồn test gọn gàng**: Áp dụng mô hình Page Object Model (POM) kết hợp với interface `Driver` dùng chung giúp mã nguồn test viết một lần nhưng chạy mượt mà trên cả Windows và macOS.

Nếu team của bạn đang gặp bế tắc về tốc độ và độ ổn định khi tự động hóa test cho ứng dụng PC/Desktop, việc xây dựng một mảng tương tác Native Driver dựa trên Accessibility API chắc chắn là chiến lược rất đáng để đầu tư!
