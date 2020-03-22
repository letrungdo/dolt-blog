---
title: Sửa lỗi java Error Could not find or load main class
date: 2016-07-10T08:14:20+07:00
author: letrungdo
template: "post"
slug: "sua-loi-java-khi-bien-dich-bang-cmd"
cover: "../images/2016/07/error-java-helloworld.png"
categories:
  - Bugs
---
Mới bắt đầu học <a href="/hoc-lap-trinh/java" target="_blank" rel="noopener">JAVA</a>, chắc chắn bạn nào cũng đi qua bài đầu tiên **HelloWorld**. Học cách biên dịch tập tin HelloWorld.java bằng 2 lệnh **javac** và **java** trong Command Prompt (CMD). Có thể gặp lỗi sau: "Error: Could not find or load main class HelloWorld". Cách **sửa lỗi java** này rất đơn giản, là lỗi cú pháp.

## Cách sửa lỗi JAVA "Error: Could not find or load main class HelloWorld"

<img class="aligncenter size-full wp-image-1912" src="/media/2016/07/Error-Could-not-find-or-load-main-class.png" alt="" width="705" height="159" /> 

Khi chạy 2 lệnh javac thì không báo lỗi, chạy tiếp java thì xuất hiện lỗi như sau:

<pre class="brush: plain; title: ; notranslate" title="">C:\Users\DoAh\Desktop\Java_Workspace&gt;javac HelloWorld.java

C:\Users\DoAh\Desktop\Java_Workspace&gt;java HelloWorld
Error: Could not find or load main class HelloWorld

C:\Users\DoAh\Desktop\Java_Workspace&gt;</pre>

Bạn **sửa lại tên class** trùng với **tên file**.java

**Ví dụ**:

Trong file HelloWorld.java có nội dụng sau:

<pre class="brush: java; title: ; notranslate" title="">class HelloWorldApp {
public static void main(String[] args) {
System.out.println("Hello World!"); // Display the string.
}
}</pre>

Khi bạn chạy lệnh javac HelloWorld.java thì nó sẽ tạo ra file tên **HelloWorldApp**.class(Lấy tên của class làm tên file).

Vì vậy khi bạn chạy tiếp lệnh **java HelloWorld** thì chắc chắn sẽ báo lỗi "Error: Could not find or load main class HelloWorld" vì không tìm thấy **HelloWorld.class**

Nên bạn sửa lại tên file là HelloWorldApp.java hoặc chạy lệnh java HelloWorldApp mới chạy được.