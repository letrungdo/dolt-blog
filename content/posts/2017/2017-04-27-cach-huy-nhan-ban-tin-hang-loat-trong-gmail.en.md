---
title: How to Mass Unsubscribe Newsletters in Gmail
date: 2017-04-27T18:59:42+07:00
author: letrungdo
template: "post"
slug: "cach-huy-nhan-ban-tin-hang-loat-trong-gmail"
lang: "en"
cover: "../../images/2017/04/Gmail-Unsubscribe-Cover.png"
categories:
  - Tricks
---

You receive too much spam and promotional mail. Because of registering accounts online, manually unsubscribing from every single email newsletter takes a lot of time. <a href="https://unroll.me/" target="_blank" rel="noopener noreferrer"><strong>Unroll.me</strong></a> is a free online service offering **mass newsletter unsubscription in Gmail**. However, <span class="FullNameGroup"><a href="https://twitter.com/labnol/status/856193422578679808" target="_blank" rel="noopener noreferrer"><strong class="fullname show-popup-with-id " data-aria-label-part="">Amit Agarwal</strong></a> reported</span> that Unroll.me was quietly selling user Gmail data to Uber.

<img class="aligncenter wp-image-138 size-full" src="/media/2017/04/huy-nhan-ban-tin-hang-loat-gmail.png" alt="mass unsubscribe newsletters in Gmail unroll.me" width="598" height="459" />

If this concerns you, here is a simple guide to safely mass unsubscribe from newsletters in Gmail.

## Gmail Unsubscriber - Mass Unsubscribe Newsletters in Gmail

<a href="https://github.com/labnol/unsubscribe-gmail#640353x2x2r2u29484w2u274u284u203" target="_blank" rel="noopener noreferrer">Source</a>: Author: **Amit Agarwal**

This is a simple Google Script that analyzes email contents in bulk and extracts unsubscribe links. If an unsubscribe link is found, the script opens it and automatically unsubscribes your email address.

**Step 1**: <a href="https://docs.google.com/spreadsheets/d/18hVYvHMeM1R7a_leHxGGjp2qzgRSd_-o7HxTF4-CM70/copy" target="_blank" rel="nofollow noopener noreferrer">Click here</a> to copy **Gmail Unsubscriber** to your Google Drive.

**Step 2**: Open _Gmail Unsubscriber_ in Google Sheets and select _Configure_.

<img class="aligncenter size-full" src="/media/2017/04/Gmail-Unsubscriber.png" alt="" />

Authorize the script to access your Gmail account.<figure id="attachment_140" aria-describedby="caption-attachment-140" style="width: 602px" class="wp-caption aligncenter">

<img class="size-full" src="/media/2017/04/Gmail-Unsubscriber-Allow.png" alt="" /> <figcaption id="caption-attachment-140" class="wp-caption-text">Select Allow</figcaption></figure>

**Step 3**: Go to your Gmail Inbox and create a new Gmail label matching the label name set in Step 2 (_default_ is **Unsubscribe**).

How to create a label: Go to <a href="https://mail.google.com/mail/u/0/#settings/labels" target="_blank" rel="noopener noreferrer">mail.google.com/mail/u/0/#settings/labels</a>, click **Create new label**, name the label **Unsubscribe => Create**.

<img class="aligncenter size-full" src="/media/2017/04/Create-new-label.png" alt="" />

All emails tagged with this label will automatically be unsubscribed within 10-15 minutes.

Results will be logged directly inside the _Google Sheet file_ you copied in **Step 1**.

<img class="aligncenter size-full" src="/media/2017/04/gmail-unsubscriber-kq.png" alt="" />

_Pros_: Complete privacy without data theft risks.

_Cons_: Some newsletters without standardized unsubscribe links cannot be processed automatically.
