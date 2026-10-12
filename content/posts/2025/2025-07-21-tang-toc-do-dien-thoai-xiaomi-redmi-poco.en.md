---
template: "post"
title: "Speed Up Xiaomi, Redmi, Poco Phones Without Root"
date: 2025-07-21T10:00:00+07:00
author: letrungdo
slug: "tang-toc-do-dien-thoai-xiaomi-redmi-poco"
lang: "en"
cover: "../../images/2025/07/xiaomi-speed-boost-cover.png"
categories:
  - Phones
---

Xiaomi, Redmi, and Poco phones often slow down after some time due to various reasons such as too many background apps, system bloatware, or default performance limits. This article will guide you through 2 effective methods to speed up your phone without needing root access.

## 1. Enable Speed Mode

Speed Mode is a hidden feature on Xiaomi devices that optimizes CPU/GPU performance and reduces power constraints. Here is how to enable it:

### Requirements:

- Computer with ADB (Android Debug Bridge) installed
- USB Debugging enabled on your phone

### Steps:

1. **Connect your phone to your computer via USB**

2. **Run ADB command to enable Speed Mode:**

```bash
adb shell settings put secure speed_mode_enable 1
```

3. **Enable additional performance optimizations (optional):**

```bash
# Disable CPU/GPU limits
adb shell settings put global powercfg_enable 0

# Enable high performance mode
adb shell settings put global power_mode 2

# Reduce animation scales for smoother UI
adb shell settings put global window_animation_scale 0.5
adb shell settings put global transition_animation_scale 0.5
adb shell settings put global animator_duration_scale 0.5
```

4. **Reboot your phone:**

```bash
adb reboot
```

5. **After rebooting, go to Settings and search:**
   - Type "speed mode" or "chế độ siêu cấp"
   - Toggle this feature on

### Notes:

- Battery will drain faster when Speed Mode is enabled
- Device might get warmer during heavy usage
- To disable Speed Mode, change the value from 1 to 0

## 2. Remove Bloatware with Canta + Shizuku

Bloatware consists of unnecessary system apps pre-installed by Xiaomi. Removing them frees up RAM, storage, and improves performance significantly.

### Installing Shizuku:

1. **Download and install Shizuku from Google Play Store**

2. **Enable Wireless Debugging:**

   - Go to Settings → Developer options
   - Enable "Wireless debugging"

3. **Start Shizuku:**

   - Open the Shizuku app
   - Select "Start via Wireless debugging"
   - Tap "Pairing"
   - Allow notification permissions

4. **Pair the device:**

   - Return to Developer options → Wireless debugging
   - Select "Pair device with pairing code"
   - Enter the code shown in Shizuku's notification
   - Tap "Send"

5. **In Shizuku, tap "Start" to launch the service**

### Installing and using Canta:

1. **Download Canta from F-Droid or GitHub** (not on Play Store yet)

2. **Open Canta and grant permissions:**

   - Grant required app permissions
   - Authorize Canta in Shizuku

3. **Remove Bloatware:**
   - In Canta, you will see a list of all apps
   - Look for apps labeled "Recommended" (recommended for uninstallation)
   - Select unnecessary apps
   - Tap the trash bin icon to uninstall

### List of Bloatware Safe to Remove:

**Xiaomi Apps:**

- Mi Browser (com.mi.globalbrowser)
- Mi Music (com.miui.player)
- Mi Store (com.mi.global.shop)
- GetApps (com.xiaomi.mipicks)
- Mi Video (com.miui.videoplayer)

**Unnecessary Google Apps:**

- YouTube Music (com.google.android.apps.youtube.music)
- Google Photos (if you use another Gallery)
- Chrome (if you use another browser)

**Other Apps:**

- Netflix (com.netflix.mediaclient)
- Facebook Services (com.facebook.services)
- Opera Mini (com.opera.mini.native)

### Important Notes:

- **DO NOT REMOVE** critical system apps like default Launcher, Gallery, or Camera
- If you want to remove a default app, install a replacement app first
- Shizuku needs to be restarted after every reboot
- Canta keeps APK files of uninstalled apps in case you need to reinstall them

## Conclusion

With the two methods above, you can significantly improve the performance of your Xiaomi, Redmi, or Poco phone without rooting. Speed Mode boosts hardware power, while debloating frees up system resources. Combining both will deliver a much smoother experience.

Remember to backup important data before performing these steps and be careful when uninstalling system apps. Good luck!
