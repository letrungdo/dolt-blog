---
title: Không đọc được file .chm trong Windows
date: 2016-05-07T10:15:17+07:00
author: letrungdo
template: "post"
slug: "khong-doc-duoc-file-chm-trong-windows"
cover: "../images/2016/05/chm.png"
categories:
  - Bugs
---
<p style="text-align: justify;">
  Không đọc được file .chm? Bạn tìm được một cuốn tài liệu ebook hay trên mạng với định dạng (.chm) nhưng khi mở tài liệu ra chỉ có đề mục còn nội dụng thì không có.<img class="aligncenter size-full wp-image-2039" src="/media/2016/05/chm-1.png" alt="" width="94" height="93" />
</p>

<p style="text-align: justify;">
  Trước khi giúp bạn khắc phục mình nói sơ qua về chi tiết về định dạng CHM:
</p>

<ul style="text-align: justify;">
  <li>
    CHM là viết tắt của <a href="http://en.wikipedia.org/wiki/Microsoft_Compiled_HTML_Help">Compiled HTML</a> và là một định dạng giới thiệu bởi Microsoft được sử dụng bởi các ứng dụng Windows để cung cấp tài liệu hướng dẫn.
  </li>
  <li>
    CHM là một tài liệu tập hợp các trang HTML, nén và đóng gói như một tập tin duy nhất. Các tập tin được nén bằng <a href="http://en.wikipedia.org/wiki/LZX_(algorithm)">thuật toán LZX</a> . Tài liệu CHM cũng chứa các tập tin bổ sung như chỉ mục tìm kiếm trước khi xây dựng, bảng nội dung cấu trúc v.v.
  </li>
</ul>

# 1. Không đọc được file .chm, file không có nội dung

<img class="aligncenter size-full wp-image-2040" src="/media/2016/05/chm-file-about.png" alt="" width="752" height="544" srcset="/media/2016/05/chm-file-about.png 752w, /media/2016/05/chm-file-about-74x55.png 74w" sizes="(max-width: 752px) 100vw, 752px" /> 

<p style="text-align: justify;">
  <em><strong>Nguyên nhân:</strong></em> Do tính năng bảo mật và bản chất của các file .chm. Một sồ file .chm có bản chất remote dữ liệu từ 1 số server hay 1 số máy chủ online hoặc 1 Database nào đó trên chính PC của bạn, và kể từ khi Windows XP chính thức đc Update hotfix KB896358 thì hiện tượng không thể xem được file .chm đã bắt đầu xuất hiện và các phiên bản windows mới cũng vậy.
</p>

<p style="text-align: justify;">
  Đây là tính năng bảo mật được cho là rất cần thiết, vì có 1 số file .chm khi Open sẽ Remote tới Server nào đó, và có thể là hiểm họa để kéo những Backdoor hoặc Trojan tới máy bạn
</p>

<h2 style="text-align: justify;">
  Để giải quyết vấn đề này có 2 cách như sau:
</h2>

<p style="text-align: justify;">
  <strong>Cách 1:</strong> Tại khung thông báo đầu tiên khi mở file .chm các bạn bỏ tick như hình
</p>

<p style="text-align: justify;">
  <img class="aligncenter wp-image-914 size-full" src="https://tđ.vnmedia/2016/05/chm.png" alt="Không đọc được file .chm" width="466" height="344" /><br /> Sau đó Click Open và mở bình thường.
</p>

<p style="text-align: justify;">
  <strong>Cách 2:</strong> Các bạn Click phải vào 1 file .chm bất kỳ chọn Properties và click vào Unblock sau đó OK.
</p>

<img class="aligncenter size-full wp-image-2041" src="/media/2016/05/unlock-chm-file.png" alt="" width="363" height="509" /> 

<h1 style="text-align: justify;">
  2. Một số lỗi khác:
</h1>

<h3 style="text-align: justify;">
  Không đọc được file .chm do file hh.exe bị lỗi hoặc không tìm thấy
</h3>

<p style="text-align: justify;">
  Không tìm được chương trình Open file .chm, file chương trình Open .chm là hh.exe bị lỗi hoặc bị xóa do virus.
</p>

<ul style="text-align: justify;">
  <li>
    <strong>Cách 1:</strong> Các bạn chỉ cần tìm file này từ 1 máy cài Windows cùng phiên bản Copy đè vào<br /> C:Windows
  </li>
  <li>
    <strong>Cách 2:</strong> Hoặc bỏ đĩa DVD vào ổ, vào Search gõ: cmd rồi Click phải vào cmd.exe chọn Run as administrator. Trong Command Prompt gõ: sfc/scannow. Rồi Enter và chờ chương trình Scan xong, khởi động lại máy, Open thử 1 file .chm
  </li>
  <li>
    <strong>Cách 3:</strong> Trong cửa sổ Command Prompt gõ lần lượt từng dòng lệnh sau rồi enter:<br /> regsvr32 %systemroot%system32hhctrl.ocx<br /> regsvr32 %systemroot%system32itss.dll
  </li>
</ul>

<h3 style="text-align: justify;">
  Không đọc được file .chm do file hhctrl.ocx bị lỗi
</h3>

<p style="text-align: justify;">
  Do tập tin hhctrl.ocx ở thư mục System32 bị lỗi hoặc bị cài đè lên file gốc của Windows bởi những phần mềm khác với phiên bản không tương thích. Để khắc phục, bạn làm theo các bước sau: tải về tập tin hhctrl.ocx tại trang Web: <a href="http://webketoan.com/redirect.php?http://freeware.it-mate.co.uk/?Cat=OCX_Files" target="_blank" rel="nofollow noopener" data-proxy-href="proxy.php?link=http%3A%2F%2Ffreeware.it-mate.co.uk%2F%3FCat%3DOCX_Files&hash=57dce8fd8960fb98be58d7f605cedae6">http://freeware.it-mate.co.uk/?Cat=OCX_Files</a>. Hoặc tìm máy có cùng phiên bản windows khác để lấy file hhctrl.oxc<br /> - Sao chép tập tin này vào thư mục C:windowssystem32.<br /> Trong hộp thoại Run, bạn gõ dòng lệnh “regsvr32 c:windowssystem32hhctrl.ocx” rồi nhấn OK, bạn phải thấy được bản thông báo đăng ký thành công, nếu không thành công, bạn cần phải tìm phiên bản khác. Sau đó khởi động lại máy tính.
</p>

<h3 style="text-align: justify;">
  Không đọc được file .chm có tiêu đề tiếng việt
</h3>

<p style="text-align: justify;">
  <em><strong>Nguyên nhân:</strong></em> do chưa thiết lập tiếng viêt cho máy tính.
</p>

<ul style="text-align: justify;">
  <li>
    Vào Control Panel -> Regional & Language Tab Options
  </li>
  <li>
    Tab Languages => đánh dấu chọn Install file for complex script => OK
  </li>
  <li>
    Tab Regional Options => chọn Vietnam/Vietnamese
  </li>
  <li>
    Tab Advanced: chọn Vietnamese
  </li>
  <li>
    Tab Languages => Details
  </li>
  <li>
    Tab Settings: bổ sung “kiểu nhập” Vietnamese => chọn làm mặc định
  </li>
  <li>
    Tab Advanced: chọn extend support
  </li>
</ul>

<p style="text-align: justify;">
  <em><strong>Lưu ý:</strong></em> bạn nên thường xuyên kiểm tra tùy chọn Extend support, nếu tính năng này bị disable => việc thể hiện tiếng Việt sẽ gặp khó khăn.
</p>

<h2 style="text-align: justify;">
  Nếu làm các cách trên không được
</h2>

<p style="text-align: justify;">
  Bạn có thể tải về một trong các phần mềm sau hỗ trợ đọc file .chm rất tốt
</p>

<p style="text-align: justify;">
  <a href="https://blog.kowalczyk.info/software/sumatrapdf/free-pdf-reader.html">Sumatra PDF</a> hỗ trợ xem file CHM kể từ phiên bản 1.9. Sumatra là miễn phí, mã nguồn mở và hỗ trợ nhiều định dạng khác như PDF, ePub, MOBI, XPS, DjVu, CBR, CBZ.
</p>

<p style="text-align: justify;">
  <a href="http://xchm.sourceforge.net/">Xchm</a> là một nền tảng mã nguồn mở, CHM người xem. Nó hoạt động trên Windows, Mac và Linux.
</p>

<p style="text-align: justify;">
  <a href="http://www.fbreader.org/win32">FBReader</a> là một nền tảng mã nguồn mở, eBook reader mà cũng có thể đọc các file CHM.
</p>

<p style="text-align: justify;">
  <a href="http://www.extrachm.com/">ExtraCHM</a> là một CHM reader thương mại.
</p>

<p style="text-align: justify;">
  <a href="http://www.beyondchm.com/">Beyond CHM</a> là một thương mại, nhiều tab CHM đọc và biên tập.
</p>

<p style="text-align: justify;">
  <a href="http://www.ultrachm.com/">UltraCHM</a> là một CHM xem thương mại.
</p>

<p style="text-align: justify;">
  <a href="http://www.mobipocket.com/en/downloadsoft/productdetailsreader.asp">Mobipocket Reader</a> hỗ trợ định dạng CHM (trong số những người khác).
</p>