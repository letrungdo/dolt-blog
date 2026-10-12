---
title: Forgot WordPress Admin Password | How to Reset WP Admin Password
date: 2016-05-27T15:11:06+07:00
author: letrungdo
template: "post"
slug: "quen-mat-khau-admin-wordpress-reset-pass-wp-admin"
lang: "en"
cover: "../../images/2016/05/reset_pass_wp-admin.jpg"
categories:
  - Web
tags:
  - Wordpress
---

<p style="text-align: justify;">
  Normally I save passwords in Chrome so I don't need to memorize them. Recently while clearing browser cache, saved Chrome passwords were removed and I forgot my WordPress admin password. Here are several methods to recover it.
</p>

<h2 style="text-align: justify;">
  Standard Methods when Forgot WordPress Admin Password
</h2>

<p style="text-align: justify;">
  <strong>Method 1:</strong> If your site is linked with WordPress.com, your wp-admin screen will display a <strong>Log in with WordPress.com</strong> button. Click it to log in with your connected account.
</p>

<img class="aligncenter size-full wp-image-2005" src="/media/2016/05/pass_Wordpress.png" alt="" width="635" height="500" />

<p style="text-align: justify;">
  <strong>Method 2:</strong> Click "<strong>Lost your password?</strong>", enter your email or username, and submit. A reset link will be emailed to your inbox.
</p>

<h2 class="entry-title" style="text-align: justify;">
  Resetting WordPress Admin Password via phpMyAdmin
</h2>

<p style="text-align: justify;">
  If reset emails fail to arrive, use this direct database method.
</p>

<p style="text-align: justify;">
  Log into hosting control panel and open <strong>phpMyAdmin</strong>. If you also forgot phpMyAdmin credentials, open <strong>MySQL Management</strong>, locate your database name, select <strong>modify password</strong>, set a new password and save.
</p>

<img class="aligncenter size-full wp-image-2006" src="/media/2016/05/modify_pass.png" alt="" width="587" height="256" />

<p style="text-align: justify;">
  After entering <strong>phpMyAdmin</strong>, select your target Database -> open table <strong>wp_users</strong> (table prefix varies depending on initial setup).
</p>

<img class="aligncenter size-full wp-image-2007" src="/media/2016/05/phpMyAdmin.png" alt="" width="943" height="339" srcset="/media/2016/05/phpMyAdmin.png 943w, /media/2016/05/phpMyAdmin-768x276.png 768w" sizes="(max-width: 943px) 100vw, 943px" />

<p style="text-align: justify;">
  You will see column <strong>user_pass</strong> containing an encrypted MD5 hash.
</p>

<p style="text-align: justify;">
  Because MD5 is a one-way hash, you cannot reverse the hash back into plain text. WordPress hashes also incorporate salt parameters.
</p>

<p style="text-align: justify;">
  The solution is overwriting that hash string with a freshly hashed new password.
</p>

Many online tools convert plain text to MD5. Visit <a href="http://www.miraclesalad.com/webtools/md5.php" target="_blank" rel="noopener">webtools/md5.php</a> to convert your new password to MD5.

<p style="text-align: justify;">
  You can use this sample MD5 hash (for plain text password <code>matkhau</code>):
</p>

```text
a788f6d55914857d4b97c1de99cb896b
```

<p style="text-align: justify;">
  Return to database table row, select Edit, paste the new MD5 hash string into <strong>user_pass</strong>, set function type to MD5 if available or paste direct hash, then click <strong>Go</strong> to save.
</p>

<p>
  <img class="aligncenter size-full wp-image-2008" src="/media/2016/05/pass_MD5.png" alt="" width="964" height="519" srcset="/media/2016/05/pass_MD5.png 964w, /media/2016/05/pass_MD5-768x413.png 768w" sizes="(max-width: 964px) 100vw, 964px" />
</p>

<p style="text-align: justify;">
  Finally, log into WordPress using your new password. Change it again inside WordPress user profile settings to re-salt the password properly.
</p>

<p style="text-align: justify;">
  <strong>Alternative</strong>: You can contact hosting support to assist in resetting admin credentials.
</p>
