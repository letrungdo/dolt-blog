---
title: "Disable VinaphoneWifi on VNPT iGate GW040 Modem Router"
date: 2016-07-09T14:35:28+07:00
author: letrungdo
template: "post"
slug: "tat-vinaphonewifi-modem-igate-gw040-vnpt"
lang: "en"
cover: "../../images/2016/07/VvinaphoneWifi.png"
categories:
  - Tricks
---

<p style="text-align: justify;">
  After installing VNPT fiber internet with an <strong>iGate GW040</strong> modem, you may notice two Wi-Fi broadcast signals. One is your customized Wi-Fi network name, while the second named <strong>VinaphoneWifi</strong> cannot be connected to. <a href="/cach-dang-nhap-vao-modem-wifi/" target="_blank" rel="noopener">Logging in</a> to the modem configuration using the default account (username and password admin) allows modifying settings, but VinaphoneWifi persists even after restarting or resetting the modem.
</p>

<img class="aligncenter size-full wp-image-1916" src="/media/2016/07/VvinaphoneWifi.png" alt="" width="1160" height="617" srcset="/media/2016/07/VvinaphoneWifi.png 1160w, /media/2016/07/VvinaphoneWifi-768x408.png 768w" sizes="(max-width: 1160px) 100vw, 1160px" />

## How to Disable VinaphoneWifi on VNPT iGate GW040 Modem Router

Open your browser and navigate to <a href="http://192.168.1.1/" target="_blank" rel="noopener">192.168.1.1</a>. If you are already logged in, click **logout**.

<img class="aligncenter size-full wp-image-1917" src="/media/2016/07/operator.png" alt="" width="428" height="302" />

Enter both username and password as: **operator**

Once logged in with this account, you can freely edit or disable the Wireless - Guest/Virtual Access Points for **VinaphoneWifi**.

**Note**: If you intend to reset the iGate GW040 modem, create a backup first. Go to **Management > Settings > Backup**, click Backup Settings and save `backupsettings.conf` to restore later if needed. Alternatively, note down your **SLIC** code and **PPP Username and Password**.
