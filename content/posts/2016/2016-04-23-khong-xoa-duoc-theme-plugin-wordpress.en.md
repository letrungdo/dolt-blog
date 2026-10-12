---
title: Cannot Delete Theme or Plugin in WordPress
date: 2016-04-23T23:42:00+07:00
author: letrungdo
template: "post"
guid: /?p=174
slug: "khong-xoa-duoc-theme-plugin-wordpress"
lang: "en"
cover: "../../images/2016/04/perm.png"
categories:
  - Web
tags:
  - Wordpress
---

When upgrading a WordPress theme, I attempted to remove the old theme directory before uploading the new update. However, deleting it failed both via WordPress dashboard and via <a href="https://en.wikipedia.org/wiki/DirectAdmin" target="_blank" rel="noopener"><strong>DirectAdmin</strong></a> file manager, throwing the following error message:

<table style="height: 201px;" width="823" cellspacing="0" cellpadding="5">
  <tr>
    <td align="center" valign="middle">
      <p align="center">
        Unable to delete files
      </p>
    </td>
  </tr>
  
  <tr>
    <td align="center" valign="middle" height="1">
    </td>
  </tr>
  
  <tr>
    <td align="center" valign="top">
      <p align="center">
        <b>Details</b>
      </p>
      <p align="center">
        Unable to delete directory /domains/tđ.vn/public_html/wp-content/themes/glamour: <b>The directory /domains/tđ.vn/public_html/wp-content/themes/glamour is not empty</b>
      </p>
    </td>
  </tr>
</table>

## Simple Solution to Fix Theme Deletion Errors

Simply adjust file/directory permissions (**perm**) in your web hosting file manager.

Steps: Log into **DirectAdmin**, open File Manager, navigate to your website root directory.

Go to **wp-content** > **themes**

Locate the undeletable theme directory (`glamour` in this example).

<img class="aligncenter size-full wp-image-2076" src="/media/2016/04/perm.png" alt="" width="780" height="490" srcset="/media/2016/04/perm.png 780w, /media/2016/04/perm-768x482.png 768w" sizes="(max-width: 780px) 100vw, 780px" />

The theme folder permissions were set to **577**, preventing file removal commands from executing.

Set permissions (**Set Permission**) back to default value **755**.

*Note*: If sub-files still fail to delete, recursively apply `755` permission to all child subfolders and files inside the theme directory before deleting.

### What is Perm / Permission?

Perm or Permission is commonly referred to as **chmod**.

Chmod configures access rights (read, write, execute) for files and directories on Linux web servers. Default recommended web host permissions are `644` for files and `755` for directories.

Permissions breakdown:

- "Read": value `4`
- "Write": value `2`
- "Execute": value `1`

- User: File/directory owner
- Group: User group
- World / Others: Everyone else

Example: `755` permission for directories means:  
7 = 4 + 2 + 1: Owner has Read, Write, and Execute rights.  
5 = 4 + 0 + 1: Group members have Read and Execute rights.  
5 = 4 + 0 + 1: Others have Read and Execute rights.
