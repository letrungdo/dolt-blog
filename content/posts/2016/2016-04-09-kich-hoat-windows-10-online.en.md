---
noAds: true
title: Activate Windows 10 Online Using Windows 7, 8, 8.1 MAK Keys
date: 2016-04-09T17:41:01+07:00
author: letrungdo
template: "post"
slug: "kich-hoat-windows-10-online"
lang: "en"
cover: "../../images/2016/04/active-windows-10.jpg"
categories:
  - Tricks
tags:
  - Windows
---

<p style="text-align: justify;">
  Finding direct online activation keys for Windows 10 can be rare, often requiring users to find <a href="/tag/key-mak/" target="_blank" rel="noopener noreferrer"><strong>MAK keys</strong></a> with 0 online activations remaining to perform phone activation. However, phone activation requires calling automated IVR lines.
</p>

<p style="text-align: justify;">
  Here is a method to activate genuine Windows 10 Pro licenses online using Windows 7 or Windows 8.1 MAK keys (even if remaining online count shows 0).
</p>

# Guide to Activating Windows 10 Online

### Step 1: Find a Windows 7, 8, or 8.1 Pro MAK Key

<div>
  You can download the <a href="https://drive.google.com/uc?export=download&id=0B13VnLlrzn7LUDExdmxVYXAxNG8" target="_blank" rel="noopener noreferrer">PIDKey tool</a> to <strong>check remaining activation counts for MAK keys.</strong>
</div>

<div>
  Communities sharing active keys:
</div>

<div>
  <p>
    <a href="https://www.facebook.com/Share-Key-Gi%C3%BAp-Activate-Windows-v%C3%A0-Office-T%E1%BA%A5t-C%E1%BA%A3-C%C3%A1c-Phi%C3%AAn-B%E1%BA%A3n-906023256104032/" target="_blank" rel="noopener">Share Key & Help Activate Windows & Office</a>
  </p>
  <p>
    <a href="http://www.fb.com/groups/trogiup24h/" target="_blank" rel="noopener noreferrer">Windows & Office License Key Sharing Group</a>
  </p>
</div>

<div>
  Updated MAK key list for Windows 10, 7, 8, 8.1 and Office:
</div>

<p style="text-align: center;">
  <strong><span class="td_text_highlight_marker_red td_text_highlight_marker td_text_highlight_marker_green" style="color: #ff0000;"><a href="https://goo.gl/y5VcCX" target="_blank" rel="noopener">WINDOWS & OFFICE MAK KEY LIST</a></span></strong>
</p>

### Step 2: Activating Windows 10 Online

Connect to internet – Open Command Prompt as Administrator (CMD Admin).

Execute the following commands sequentially:

```bash
slmgr.vbs -upk

slmgr.vbs /ipk KNXB4-F82M9-TB3X9-P9PQ6-RRG6Y

slui 3
```

When the key input window pops up, enter your Windows 7, 8, or 8.1 MAK key.

Wait briefly for Microsoft verification, then click Next.

> If activation isn't complete, execute: `slmgr /ato` in CMD.

<div>
  <strong>Note:</strong> Active internet connection is required. Windows 10 must be Pro edition version 1511 or newer.
</div>

<div>
  Check Windows version by running `winver` in CMD. Use <a href="http://go.microsoft.com/fwlink/?LinkId=691209" target="_blank" rel="noopener noreferrer">Media Creation Tool 1511</a> to update build if needed.
</div>

### _**Video Guide for Online Windows 10 Activation**_

<span style="color: #ff0000; background-color: #00ff00;"><strong>Update</strong>: <a href="/kich-hoat-ban-quyen-windows-va-office-qua-web/" target="_blank" rel="noopener">How to Activate Windows and Office via Web</a></span>
