---
title: Install PHP File Manager on OpenShift v3
date: 2017-09-22T15:51:28+07:00
author: letrungdo
template: "post"
slug: "cai-quan-ly-file-cho-php-tren-openshift-v3"
lang: "en"
cover: "../../images/2017/09/quan-ly-file-openshift-v3.png"
categories:
  - Web
tags:
  - Openshift
  - Wordpress
---

<a href="/huong-dan-su-dung-openshift-v3-toan-tap/" target="_blank" rel="noopener"><strong>OpenShift v3</strong></a> no longer uses the SFTP file transfer protocol to manage files like <a href="/hosting-free/openshift/" target="_blank" rel="noopener">OpenShift v2</a> did. Uploading source code can be difficult for those who know nothing about Docker. So today I will guide you on how to **install PHP file manager on OpenShift v3**, helping you upload source code quickly and easily.

# Guide to Install PHP File Manager on OpenShift v3

## Step 1: Create a PHP project with Git Repository Distro-Manager

We will use the file manager source code by author IzeroCs at: <a href="https://github.com/IzeroCs/Distro-Manager" target="_blank" rel="noopener">github.com/IzeroCs/Distro-Manager</a>

<img class="aligncenter wp-image-263 size-full" src="/media/2017/09/tao-project-php.png" alt="Install PHP file manager on OpenShift v3" width="957" height="488" srcset="/media/2017/09/tao-project-php.png 957w, /media/2017/09/tao-project-php-768x392.png 768w" sizes="(max-width: 957px) 100vw, 957px" />

Fill in project name; in the * Git Repository URL line, enter the following link:

```bash
https://github.com/IzeroCs/Distro-Manager
```

Then click Create.

Wait a moment for the build process to complete; you will be assigned a URL pointing to your host as shown.

```bash
http://php-do.193b.starter-ca-central-1.openshiftapps.com
```

<img class="aligncenter size-full" src="/media/2017/09/php-build-complete.png" alt="Install PHP file manager on OpenShift v3" />

## Step 2: Access PHP File Manager on OpenShift

Go to the newly assigned URL address, add **/manager** at the end of the path to access the host.

Example: **http://php-do.193b.starter-ca-central-1.openshiftapps.com/manager**

Enter the assigned default username and password. After logging in, you should change login credentials for security.

The interface after logging in looks like below.

<img class="aligncenter size-full" src="/media/2017/09/quan-ly-file-openshift-v3.png" alt="PHP file manager on OpenShift v3" />

To upload code, compress everything into a `.zip` file for faster upload. Once uploaded, click on the archive file and choose extract.

**Distro-Manager** has all essential features for managing PHP files: rename, upload files, extract, permissions, delete, edit, copy, and create new files.
