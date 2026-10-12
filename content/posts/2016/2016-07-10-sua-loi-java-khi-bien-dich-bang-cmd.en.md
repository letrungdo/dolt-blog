---
title: Fix Java Error Could not find or load main class
date: 2016-07-10T08:14:20+07:00
author: letrungdo
template: "post"
slug: "sua-loi-java-khi-bien-dich-bang-cmd"
lang: "en"
cover: "../../images/2016/07/error-java-helloworld.png"
categories:
  - Bugs
---

When starting to learn <a href="/hoc-lap-trinh/java" target="_blank" rel="noopener">JAVA</a>, everyone goes through their first **HelloWorld** program, learning to compile `HelloWorld.java` using `javac` and `java` commands in Command Prompt (CMD). You might encounter this error: "Error: Could not find or load main class HelloWorld". Fixing this **Java error** is very simple as it is a syntax mismatch error.

## How to Fix Java "Error: Could not find or load main class HelloWorld"

<img class="aligncenter size-full wp-image-1912" src="/media/2016/07/Error-Could-not-find-or-load-main-class.png" alt="" width="705" height="159" />

When running `javac`, no error appears, but running `java` afterwards produces the following output:

```bash
C:\Users\DoAh\Desktop\Java_Workspace>javac HelloWorld.java
C:\Users\DoAh\Desktop\Java_Workspace>java HelloWorld
Error: Could not find or load main class HelloWorld
C:\Users\DoAh\Desktop\Java_Workspace>
```

You need to **change the class name** to match the **.java file name**.

**Example**:

Inside file `HelloWorld.java`, you have the following code:

```java
class HelloWorldApp {
  public static void main(String[] args) {
    System.out.println("Hello World!"); // Display the string.
  }
}
```

When you execute `javac HelloWorld.java`, Java creates a compiled file named `HelloWorldApp.class` (using the class name as the output filename).

Therefore, when you subsequently execute `java HelloWorld`, it throws "Error: Could not find or load main class HelloWorld" because `HelloWorld.class` does not exist.

To fix it, rename the file to `HelloWorldApp.java` or execute `java HelloWorldApp` instead.
