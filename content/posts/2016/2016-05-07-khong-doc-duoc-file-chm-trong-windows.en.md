---
title: Cannot Read .chm Files in Windows
date: 2016-05-07T10:15:17+07:00
author: letrungdo
template: "post"
slug: "khong-doc-duoc-file-chm-trong-windows"
lang: "en"
cover: "../../images/2016/05/chm.png"
categories:
  - Bugs
---

<p style="display: flex">
  <img src="/media/2016/05/chm-1.png" alt="chm icon" />
  Cannot open or read .chm files? You downloaded an ebook or documentation file in .chm format, but opening it shows table of contents while main content pane remains blank.
</p>

<p style="text-align: justify;">
  Before diving into solutions, here is an overview of the CHM format:
</p>

<ul style="text-align: justify;">
  <li>
    CHM stands for <a href="http://en.wikipedia.org/wiki/Microsoft_Compiled_HTML_Help" target="_blank" rel="nofollow noopener noreferrer">Compiled HTML Help</a>, a proprietary format introduced by Microsoft for application help documentation.
  </li>
  <li>
    CHM bundles HTML pages, index tables, and search indices into a single file compressed via <a href="http://en.wikipedia.org/wiki/LZX_(algorithm)" target="_blank" rel="nofollow noopener noreferrer">LZX compression algorithm</a>.
  </li>
</ul>

# 1. Blank Content Pane in .chm Files

<img class="aligncenter size-full wp-image-2040" src="/media/2016/05/chm-file-about.png" alt="" width="752" height="544" srcset="/media/2016/05/chm-file-about.png 752w, /media/2016/05/chm-file-about-74x55.png 74w" sizes="(max-width: 752px) 100vw, 752px" />

<p style="text-align: justify;">
  <em><strong>Cause:</strong></em> Security blocking rules introduced by Windows (specifically starting from hotfix KB896358). Because CHM files can contain active HTML/scripts linking to remote network resources, Windows flags downloaded CHM files from external sources as untrusted by default.
</p>

<h2 style="text-align: justify;">
  Two Methods to Fix This Issue:
</h2>

<p style="text-align: justify;">
  <strong>Method 1:</strong> Uncheck "Always ask before opening this file" in the security prompt popup upon launching the CHM file.
</p>

<p style="text-align: justify;">
  <img class="aligncenter wp-image-914 size-full" src="/media/2016/05/chm.png" alt="Cannot read .chm file" width="466" height="344" /><br /> Then click Open.
</p>

<p style="text-align: justify;">
  <strong>Method 2:</strong> Right-click the `.chm` file, select **Properties**, click **Unblock** at the bottom of General tab, then click **OK**.
</p>

<img class="aligncenter size-full wp-image-2041" src="/media/2016/05/unlock-chm-file.png" alt="" width="363" height="509" />

<h1 style="text-align: justify;">
  2. Other Common Errors:
</h1>

<h3 style="text-align: justify;">
  Corrupted or Missing `hh.exe` System Handler
</h3>

<p style="text-align: justify;">
  The default HTML Help executable (`hh.exe`) is corrupted or removed by antivirus software.
</p>

<ul style="text-align: justify;">
  <li>
    <strong>Method 1:</strong> Copy `hh.exe` from another working PC running the same Windows version into `C:\Windows\`.
  </li>
  <li>
    <strong>Method 2:</strong> Run Command Prompt as Administrator (`cmd.exe`) and execute system file checker: `sfc /scannow`. Restart PC upon completion.
  </li>
  <li>
    <strong>Method 3:</strong> In Command Prompt (Admin), register DLL components:
    <br /> `regsvr32 %systemroot%\system32\hhctrl.ocx`
    <br /> `regsvr32 %systemroot%\system32\itss.dll`
  </li>
</ul>

<h3 style="text-align: justify;">
  Corrupted `hhctrl.ocx` Library
</h3>

<p style="text-align: justify;">
  `hhctrl.ocx` in System32 directory is corrupted or overwritten. Replace `hhctrl.ocx` in `C:\Windows\System32\` from a working PC of same OS build, then run `regsvr32 c:\windows\system32\hhctrl.ocx` in Run/CMD.
</p>

<h3 style="text-align: justify;">
  CHM Files with Vietnamese Unicode Characters in Filename/Path
</h3>

<p style="text-align: justify;">
  Ensure System Locale is configured properly in Control Panel -> Region & Language options. Alternatively, rename the CHM file and folder paths to non-accented ASCII characters.
</p>

<h2 style="text-align: justify;">
  Third-Party Readers
</h2>

<p style="text-align: justify;">
  You can also use open-source third-party document readers that render CHM files natively:
</p>

<p style="text-align: justify;">
  <a href="https://www.sumatrapdfreader.org/download-free-pdf-viewer.html" target="_blank" rel="nofollow noopener noreferrer">Sumatra PDF</a> supports CHM, PDF, ePub, MOBI, XPS, DjVu, CBR, CBZ.
</p>

<p style="text-align: justify;">
  <a href="http://xchm.sourceforge.net/" target="_blank" rel="nofollow noopener noreferrer">xCHM</a> is a lightweight cross-platform CHM reader for Windows, Mac, and Linux.
</p>

<p style="text-align: justify;">
  <a href="http://www.fbreader.org/win32" target="_blank" rel="nofollow noopener noreferrer">FBReader</a> e-book reader with CHM support.
</p>
