---
title: "Guide to Flashing Stock SKY ROM & Fixing Bootloop on All SKY Devices"
date: 2016-05-24T23:14:51+07:00
author: letrungdo
template: "post"
slug: "huong-dan-cai-rom-sky"
lang: "en"
cover: "../../images/2016/05/up_rom_sky.jpg"
categories:
  - Bugs
  - Phones
---

This is a universal ROM flashing guide for all SKY Pantech models from A600 to A920. Installing official stock SKY ROM safely resolves bootloop issues quickly. If your phone gets stuck on logo or encounters system errors, follow these steps.

While multiple flashing tools exist, offline flashing using **PDL** is the most reliable method.

# Guide to Installing Official Stock SKY ROM via PDL

### Step 1: Download Required Files for Flashing Process

Visit <a href="http://www.kimcloud.kr/pantech/_binx/" target="_blank" rel="noopener">kimcloud.kr/pantech/\_binx/</a> to **download the matching Stock ROM version** for your device model. Each model usually has 3 variants (K, L, S); verify your exact variant before downloading.

Next, **convert the `.BINX` file to a `.PDL` file** using these tools:

Download: <a href="https://drive.google.com/uc?export=download&id=0B1mDBJH6BWKlalpJWjBueEgxelk" target="_blank" rel="noopener">BINX2PDL</a> or <a href="https://drive.google.com/uc?export=download&id=0B1mDBJH6BWKlS2pHcl9mVkNXc3c" target="_blank" rel="noopener">tool-convert-binx-pdl-1.3</a>

Download and install USB Drivers so PC recognizes the phone: <a href="https://drive.google.com/uc?export=download&id=0B1mDBJH6BWKlUkZRZUJuX19Ecms" target="_blank" rel="noopener">Download Drivers</a>

Download PDL_OS to flash the `.PDL` ROM file to your phone: <a href="https://drive.google.com/uc?export=download&id=0B1mDBJH6BWKlZS1ydnZiOTFiOHc" target="_blank" rel="noopener">Download PDL_OS</a>

### Step 2: Flash the ROM

Boot the phone into **S/W Upgrading** mode by powering off device, then holding key combinations:

- A770, 760, 810, 800, 820: **Power** | **Volume+** | **Search**
- A830 and newer: **Power** | **Volume+** | **Volume-**

Connect the phone to PC via USB cable.

Open downloaded PDL_OS (internet connection required on PC for tool initialization). Interface looks like this:

<img class="aligncenter size-full wp-image-1989" src="/media/2016/05/PDL_Os.png" alt="" width="763" height="405" />

Click **Open File** and select your converted `.PDL` file.

If prompted for a model code/password, <a href="https://drive.google.com/uc?export=download&id=0B1mDBJH6BWKlenlrdWVyR1Zhekk" target="_blank" rel="noopener"><strong>download this file</strong></a> to find the code corresponding to your device model.

- Choose **Download** if you want to keep internal data intact.
- Choose **Download + F/S Erase** if you want a clean wipe installation.

_Flashing takes approximately 5 minutes. You can upgrade or downgrade system versions safely without risking bootloops._
