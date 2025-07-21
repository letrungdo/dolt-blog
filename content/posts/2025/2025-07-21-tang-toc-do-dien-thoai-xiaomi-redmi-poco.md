---
template: "post"
title: "Tăng tốc độ điện thoại Xiaomi, Redmi, Poco không cần root"
date: 2025-07-21T10:00:00+07:00
author: letrungdo
slug: "tang-toc-do-dien-thoai-xiaomi-redmi-poco"
cover: "../../images/2025/07/xiaomi-speed-boost-cover.png"
categories:
  - Phones
---

Điện thoại Xiaomi, Redmi, Poco sau một thời gian sử dụng thường bị chậm đi do nhiều nguyên nhân như: quá nhiều app chạy ngầm, bloatware hệ thống, hoặc do các giới hạn hiệu năng mặc định. Bài viết này sẽ hướng dẫn bạn 2 cách hiệu quả để tăng tốc độ điện thoại mà không cần root máy.

## 1. Bật chế độ Speed Mode (Chế độ siêu cấp)

Speed Mode là một tính năng ẩn của Xiaomi cho phép tối ưu hiệu năng CPU/GPU và giảm các giới hạn về năng lượng. Đây là cách bật:

### Yêu cầu:

- Máy tính có cài ADB (Android Debug Bridge)
- Bật USB Debugging trên điện thoại

### Các bước thực hiện:

1. **Kết nối điện thoại với máy tính qua USB**

2. **Chạy lệnh ADB để bật Speed Mode:**

```bash
adb shell settings put secure speed_mode_enable 1
```

3. **Bật thêm các tối ưu hiệu năng khác (tùy chọn):**

```bash
# Tắt giới hạn CPU/GPU
adb shell settings put global powercfg_enable 0

# Bật chế độ hiệu năng cao
adb shell settings put global power_mode 2

# Giảm các hiệu ứng animation để UI mượt hơn
adb shell settings put global window_animation_scale 0.5
adb shell settings put global transition_animation_scale 0.5
adb shell settings put global animator_duration_scale 0.5
```

4. **Khởi động lại điện thoại:**

```bash
adb reboot
```

5. **Sau khi khởi động xong, vào Settings và tìm kiếm:**
   - Gõ "speed mode" hoặc "chế độ siêu cấp"
   - Bật tính năng này lên

### Lưu ý:

- Pin sẽ hao nhanh hơn khi bật Speed Mode
- Máy có thể nóng hơn khi sử dụng nặng
- Để tắt Speed Mode, thay đổi giá trị từ 1 thành 0

## 2. Xóa Bloatware với Canta + Shizuku

Bloatware là các app hệ thống không cần thiết được cài sẵn bởi Xiaomi. Việc xóa chúng sẽ giải phóng RAM, bộ nhớ và cải thiện hiệu năng đáng kể.

### Cài đặt Shizuku:

1. **Tải và cài Shizuku từ Google Play Store**

2. **Bật Wireless Debugging:**

   - Vào Settings → Developer options
   - Bật "Wireless debugging"

3. **Khởi động Shizuku:**

   - Mở app Shizuku
   - Chọn "Start via Wireless debugging"
   - Nhấn "Pairing"
   - Cho phép quyền thông báo

4. **Ghép nối thiết bị:**

   - Quay lại Developer options → Wireless debugging
   - Chọn "Pair device with pairing code"
   - Nhập mã hiển thị trong thông báo của Shizuku
   - Nhấn "Send"

5. **Trong Shizuku, nhấn "Start" để khởi động dịch vụ**

### Cài đặt và sử dụng Canta:

1. **Tải Canta từ F-Droid hoặc GitHub** (chưa có trên Play Store)

2. **Mở Canta và cấp quyền:**

   - Cấp các quyền app yêu cầu
   - Ủy quyền cho Canta trong Shizuku

3. **Xóa Bloatware:**
   - Trong Canta, bạn sẽ thấy danh sách tất cả app
   - Tìm các app có nhãn "Recommended" (khuyến nghị xóa)
   - Chọn các app không cần thiết
   - Nhấn biểu tượng thùng rác để xóa

### Danh sách Bloatware an toàn để xóa:

**Xiaomi Apps:**

- Mi Browser (com.mi.globalbrowser)
- Mi Music (com.miui.player)
- Mi Store (com.mi.global.shop)
- GetApps (com.xiaomi.mipicks)
- Mi Video (com.miui.videoplayer)

**Google Apps không cần thiết:**

- YouTube Music (com.google.android.apps.youtube.music)
- Google Photos (nếu bạn dùng Gallery khác)
- Chrome (nếu bạn dùng trình duyệt khác)

**Apps khác:**

- Netflix (com.netflix.mediaclient)
- Facebook Services (com.facebook.services)
- Opera Mini (com.opera.mini.native)

### Lưu ý quan trọng:

- **KHÔNG XÓA** các app hệ thống quan trọng như Launcher, Gallery, Camera mặc định
- Nếu muốn xóa app mặc định, hãy cài app thay thế trước
- Shizuku cần khởi động lại sau mỗi lần reboot
- Canta lưu file APK của app đã xóa để phòng trường hợp cần cài lại

## Kết luận

Với 2 phương pháp trên, bạn có thể cải thiện đáng kể hiệu năng của điện thoại Xiaomi, Redmi, Poco mà không cần root. Speed Mode giúp tăng sức mạnh phần cứng, còn việc xóa bloatware giúp giải phóng tài nguyên hệ thống. Kết hợp cả hai sẽ mang lại trải nghiệm mượt mà hơn rất nhiều.

Hãy nhớ backup dữ liệu quan trọng trước khi thực hiện và cẩn thận khi xóa các app hệ thống. Chúc bạn thành công!
