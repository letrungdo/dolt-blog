---
title: Giải thuật định thời CPU môn Hệ điều hành
date: 2016-04-09T19:22:49+07:00
author: letrungdo
template: "post"
slug: "giai-thuat-dinh-thoi-cpu-mon-dieu-hanh"
cover: "../images/2016/04/bai-tap-he-dieu-hanh.jpg"
categories:
  - Documents
---
<p id="id4559514" style="text-align: justify;">
  Để giải được các bài tập về giải thuật định thời CPU môn <a href="https://vi.wikipedia.org/wiki/H%E1%BB%87_%C4%91i%E1%BB%81u_h%C3%A0nh" target="_blank" rel="noopener">Hệ điều hành</a> thì trước tiên ta nên xem định nghĩa của <strong><span style="color: #ff6600;">điều phối độc quyền</span></strong> và <strong><span style="color: #99cc00;">điều phối không độc quyền</span></strong> (<span style="color: #ff6600;">nonpreemptive</span>/ <span style="color: #99cc00;">preemptive</span>)
</p>

<p id="id5615504" class="para" style="text-align: justify;">
  Thuật toán điều phối cần xem xét và quyết định thời điểm chuyển đổi CPU giữa các tiến trình. Hệ điều hành có thể thực hiện cơ chế điều phối theo nguyên lý <em class="emphasis">độc quyền </em>hoặc <em class="emphasis">không độc quyền</em>.
</p>

<p id="id3699378" class="para" style="text-align: justify;">
  <strong class="emphasis">Điều phối độc quyền </strong>(<span style="color: #ff0000;">không ưu tiên</span>): Cho phép một tiến trình khi nhận được CPU sẽ có quyền độc chiếm CPU đến khi hoàn tất xử lý hoặc tự nguyện giải phóng CPU.
</p>

<p id="id3791327" class="para" style="text-align: justify;">
  <strong>Điều phối không độc quyền</strong> (<span style="color: #99cc00;">Ưu tiên</span>): Cho phép tạm dừng hoạt động của một tiến trình đang sẵn sàng xử lý. Khi một tiến trình nhận được CPU, nó vẫn được sử dụng CPU đến khi hoàn tất hoặc tự nguyện giải phóng CPU, nhưng một tiến trình khác có độ ưu tiên có thể dành quyền sử dụng CPU của tiến trình ban đầu. Như vậy tiến trình có thể bị tạm dừng hoạt động bất cứ lúc nào mà không được báo trước, để tiến trình khác xử lý.
</p>

<h2 id="id4559514" style="text-align: justify;">
  1. Giải thuật định thời First In, First Out (FIFO)
</h2>

<p style="text-align: justify;">
  CPU được cấp phát cho tiến trình đầu tiên trong hàng đợi sẵn sàng có yêu cầu, là tiến trình được đưa vào hệ thống sớm nhất. Đây là giải thuật định thời theo <strong>nguyên tắc độc quyền</strong>.
</p>

<p style="text-align: justify;">
  <img class="aligncenter" src="http://i18.photobucket.com/albums/b109/pieras/fifo.jpg" alt="giải thuật định thời" width="626" height="421" />
</p>

<ul style="text-align: justify;">
  <li>
    Thời gian xử lý: P1=24, P2=26, P3=28
  </li>
  <li>
    Thời gian xử lý trung bình: (24 + 26 +28)/3=26
  </li>
  <li>
    Thời gian đợi: P1=0, P2=23, P3 = 24
  </li>
  <li>
    Thời gian đợi trung bình: (0+23+24)/3 = 15.67
  </li>
</ul>

<h2 style="text-align: justify;">
  2. Giải thuật định thời Round Robin(RR)
</h2>

<p style="text-align: justify;">
  Bộ định thời lần lượt cấp phát cho từng tiến trình trong danh sách một khoảng thời gian sử dụng CPU gọi là quantum. Đây là một giải thuật định thời <strong>không độc quyền</strong> : khi một tiến trình sử dụng CPU đến hết thời gian quantum dành cho nó, hệ điều hành thu hồi CPU và cấp cho tiến trình kế tiếp trong danh sách. Nếu tiến trình bị khóa hay kết thúc trước khi sử dụng hết thời gian quantum, hệ điều hành cũng lập tức cấp phát CPU cho tiến trình khác. Khi tiến trình tiêu thụ hết thời gian CPU dành cho nó mà chưa hoàn tất, tiến trình được đưa trở lại vào cuối danh sách sẵn sàng để đợi được cấp CPU trong lượt kế tiếp.
</p>

<p style="text-align: justify;">
  <img class="aligncenter" src="http://i18.photobucket.com/albums/b109/pieras/rr.jpg" alt="giải thuật định thời" width="673" height="441" />
</p>

<ul style="text-align: justify;">
  <li>
    Thời gian xử lý: P1=30, P2=6, P3=8
  </li>
  <li>
    Thời gian xử lý trung bình: (30+6+8)/3 = 14.67
  </li>
  <li>
    Thời gian đợi: P1=6, P2=3, P3=5
  </li>
  <li>
    Thời gian đợi trung bình: (6+3+5)/3=4.67
  </li>
</ul>

<h2 style="text-align: justify;">
  3. Giải thuật định thời ưu tiên
</h2>

<p style="text-align: justify;">
  Tiến trình có độ ưu tiên cao nhất sẽ được chọn để cấp phát CPU đầu tiên. Giải thuật định thời với độ ưu tiên có thể theo <strong>nguyên tắc độc quyền</strong> hay <strong>không độc quyền</strong>. Giải thuật này sẽ thu hồi CPU từ tiến trình hiện hành để cấp phát cho tiến trình mới nếu độ ưu tiên của tiến trình này cao hơn tiến trình hiện hành. Chèn tiến trình mới vào danh sách sẵn sàng, và tiến trình hiện hành vẫn tiếp tục xử lý hết thời gian dành cho nó.
</p>

<p style="text-align: justify;">
  <img class="aligncenter" src="http://i18.photobucket.com/albums/b109/pieras/douutien.jpg" alt="giải thuật định thời" width="651" height="454" />
</p>

<ul style="text-align: justify;">
  <li>
     <strong>Trường hợp độc quyền</strong><br /> * Thời gian xử lý: P1=24, P2=26, P3=28<br /> * Thời gian xử lý trung bình: (24+26+28)/3=26<br /> * Thời gian đợi: P1=0, P2=23, P3=25<br /> * Thời gian đợi trung bình: (0+23+25)/3=16
  </li>
  <li>
    <strong>Trường hợp không độc quyền</strong>:<br /> * Thời gian xử lý: P1=30, P2=3, P3=5<br /> * Thời gian xử lý trung bình: (30+3+5)/3=12.67<br /> * Thời gian đợi: P1=6, P2=0, P3=2<br /> * Thời gian đợi trung bình: (6 + 0 + 2)/3=2
  </li>
</ul>

<h2 style="text-align: justify;">
  4. Giải thuật định thời công việc ngắn nhất (Shortest-job-first SJF)
</h2>

<p style="text-align: justify;">
  Độ ưu tiên p được gán cho mỗi tiến trình là nghịch đảo của thời gian xử lý t mà tiến trình yêu cầu : p = 1/t. Khi CPU được tự do, nó sẽ được cấp phát cho tiến trình yêu cầu ít thời gian nhất để kết thúc- tiến trình ngắn nhất. Giải thuật này cũng có thể <strong>độc quyền</strong> hay<strong> không độc quyền</strong>. Sự chọn lựa xảy ra khi có một tiến trình mới được đưa vào danh sách sẵn sàng trong khi một tiến trình khác đang xử lý. Giải thuật SJF không độc quyền sẽ dừng hoạt động của tiến trình hiện hành, trong khi giải thuật độc quyền sẽ cho phép tiến trình hiện hành tiếp tục xử lý.
</p>

<p style="text-align: justify;">
  <img class="aligncenter" src="http://i18.photobucket.com/albums/b109/pieras/sjf.jpg" alt="giải thuật định thời" width="544" height="467" />
</p>

<ul style="text-align: justify;">
  <li>
    <strong>Trường hợp độc quyền</strong><br /> * Thời gian xử lý : P1=6, P2=19, P3=10, P4=5<br /> * Thời gian xử lý trung bình : (6+19+10+5)/4=10<br /> * Thời gian đợi: P1=0, P2=11, P3=6 ; P4=3<br /> * Thời gian đợi trung bình: (0+11+6+3)/4=5
  </li>
  <li>
    <strong>Trường hợp không độc quyền:</strong><br /> * Thời gian xử lý : P1=8, P2=19, P3=10, P4=2<br /> * Thời gian xử lý trung bình: (8+19+10+2)/4=9.75<br /> * Thời gian đợi: P1=2, P2=11, P3=6, P4=0<br /> * Thời gian đợi trung bình: (2+11+6+0)/4=4.75
  </li>
</ul>

<p style="text-align: justify;">
  <em>Mong bài viết này sẽ giúp các bạn hiểu được các giải thuật định thời CPU...</em>
</p>