---
title: Xác định tên font chữ trên web nhanh nhất
date: 2016-05-23T19:54:42+07:00
author: letrungdo
template: "post"
slug: "xac-dinh-ten-font-chu-tren-web-hinh-anh"
cover: "../../images/2016/05/what-font.png"
categories:
  - Tricks
---
<p style="text-align: justify;">
  Bạn đi đâu đó hoặc lướt web thấy các font chữ rất đẹp. Bạn muốn có nó mà không biết font đó tên gì để tìm&nbsp;tải về dùng. Sau đây là các công cụ giúp bạn xác định tên font chữ nhanh và chính xác&nbsp;nhất.
</p>

<h1 style="text-align: justify;">
  Xác định tên font chữ trên web
</h1>

<p style="text-align: justify;">
  Cách dễ nhất để xác định phông chữ trên các trang web là cài thêm <strong>tiện ích mở rộng</strong> WhatFont cho trình duyệt.
</p>

<p style="text-align: justify;">
  Vào link sau:&nbsp;<a href="https://chrome.google.com/webstore/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm">WhatFont</a>&nbsp;và bấm "Thêm vào Chrome" > "Thêm tiện ích".
</p>

<p style="text-align: justify;">
  Để sử dụng ứng dụng, bạn click vào biểu tượng&nbsp;<img class="size-full wp-image-2016 aligncenter" src="/media/2016/05/wf.png" alt="" width="33" height="34" />&nbsp;ngay góc trên bên phải của trình duyệt để kích hoạt, bấm F5 để tải lại trang. Sau đó chỉ cần rê chuột vào font chữ nào thì tên font sẽ hiện ngay ra.
</p>

<p style="text-align: justify;">
  Như hình trên nó hiện tên font là "omnes-pro"
</p>

<p style="text-align: justify;">
  <em><strong>Cách khác</strong>:</em> Bạn có thể vào trang&nbsp;chengyinliu.com/whatfont.html bấm vào&nbsp;nút <strong>What font</strong>. Để tiện các bạn&nbsp;kéo thả vào Bookmark sau này dùng.&nbsp;Cách này dùng được cho mọi trình duyệt
</p>

<p style="text-align: justify;">
  Hoặc tự thêm một dấu trang tên whatfont vào bookmark dán địa chỉ bên dưới và lưu lại.
</p>

<pre class="brush: jscript; title: ; notranslate" title="">javascript:(function(){var d=document,s=d.createElement('scr'+'ipt'),b=d.body,l=d.location;s.setAttribute('src','http://chengyinliu.com/wf.js?o='+encodeURIComponent(l.href)+'&amp;amp;amp;amp;amp;amp;amp;amp;amp;amp;t='+(new Date().getTime()));b.appendChild(s)})();</pre>