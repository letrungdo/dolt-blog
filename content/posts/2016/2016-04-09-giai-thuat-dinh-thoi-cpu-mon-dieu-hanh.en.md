---
title: CPU Scheduling Algorithms in Operating Systems
date: 2016-04-09T19:22:49+07:00
author: letrungdo
template: "post"
slug: "giai-thuat-dinh-thoi-cpu-mon-dieu-hanh"
lang: "en"
cover: "../../images/2016/04/bai-tap-he-dieu-hanh.jpg"
categories:
  - Documents
---

<p id="id4559514" style="text-align: justify;">
  To solve CPU scheduling algorithm problems in <a href="https://en.wikipedia.org/wiki/Operating_system" target="_blank" rel="noopener">Operating Systems</a>, we must understand definitions of <strong><span style="color: #ff6600;">non-preemptive scheduling</span></strong> and <strong><span style="color: #99cc00;">preemptive scheduling</span></strong>.
</p>

<p id="id5615504" class="para" style="text-align: justify;">
  Scheduling algorithms determine CPU allocation switches between processes. Operating systems implement scheduling mechanisms based on non-preemptive or preemptive principles.
</p>

<p id="id3699378" class="para" style="text-align: justify;">
  <strong class="emphasis">Non-preemptive Scheduling</strong>: Once a process receives CPU allocation, it retains exclusive control until execution completes or it voluntarily yields CPU control.
</p>

<p id="id3791327" class="para" style="text-align: justify;">
  <strong>Preemptive Scheduling</strong>: Allows suspending an active process. Higher priority incoming processes can interrupt and claim CPU control from currently running processes at any time without warning.
</p>

<h2 id="id4559514" style="text-align: justify;">
  1. First-In, First-Out (FIFO) / FCFS Scheduling Algorithm
</h2>

<p style="text-align: justify;">
  CPU is allocated to the earliest process requesting CPU in the ready queue. Follows strict <strong>non-preemptive scheduling</strong>.
</p>

<p style="text-align: justify;">
  <img class="aligncenter" src="http://i18.photobucket.com/albums/b109/pieras/fifo.jpg" alt="scheduling algorithm" width="626" height="421" />
</p>

<ul style="text-align: justify;">
  <li>
    Turnaround Time: P1=24, P2=26, P3=28
  </li>
  <li>
    Average Turnaround Time: (24 + 26 + 28)/3 = 26
  </li>
  <li>
    Waiting Time: P1=0, P2=23, P3=24
  </li>
  <li>
    Average Waiting Time: (0 + 23 + 24)/3 = 15.67
  </li>
</ul>

<h2 style="text-align: justify;">
  2. Round Robin (RR) Scheduling Algorithm
</h2>

<p style="text-align: justify;">
  The scheduler allocates CPU time slices (quantums) cyclically across all ready processes. This is a <strong>preemptive scheduling</strong> algorithm: when a process consumes its allotted time quantum, the OS preempts the CPU and assigns it to the next process. Unfinished processes return to the tail of the ready queue.
</p>

<p style="text-align: justify;">
  <img class="aligncenter" src="http://i18.photobucket.com/albums/b109/pieras/rr.jpg" alt="scheduling algorithm" width="673" height="441" />
</p>

<ul style="text-align: justify;">
  <li>
    Turnaround Time: P1=30, P2=6, P3=8
  </li>
  <li>
    Average Turnaround Time: (30 + 6 + 8)/3 = 14.67
  </li>
  <li>
    Waiting Time: P1=6, P2=3, P3=5
  </li>
  <li>
    Average Waiting Time: (6 + 3 + 5)/3 = 4.67
  </li>
</ul>

<h2 style="text-align: justify;">
  3. Priority Scheduling Algorithm
</h2>

<p style="text-align: justify;">
  The process with highest priority is allocated CPU first. Can be implemented as <strong>non-preemptive</strong> or <strong>preemptive</strong>. Preemptive priority scheduling yields CPU when higher priority processes arrive in ready queue.
</p>

<p style="text-align: justify;">
  <img class="aligncenter" src="http://i18.photobucket.com/albums/b109/pieras/douutien.jpg" alt="scheduling algorithm" width="651" height="454" />
</p>

<ul style="text-align: justify;">
  <li>
    <strong>Non-preemptive Case</strong><br /> * Turnaround Time: P1=24, P2=26, P3=28<br /> * Average Turnaround Time: (24 + 26 + 28)/3 = 26<br /> * Waiting Time: P1=0, P2=23, P3=25<br /> * Average Waiting Time: (0 + 23 + 25)/3 = 16
  </li>
  <li>
    <strong>Preemptive Case</strong>:<br /> * Turnaround Time: P1=30, P2=3, P3=5<br /> * Average Turnaround Time: (30 + 3 + 5)/3 = 12.67<br /> * Waiting Time: P1=6, P2=0, P3=2<br /> * Average Waiting Time: (6 + 0 + 2)/3 = 2
  </li>
</ul>

<h2 style="text-align: justify;">
  4. Shortest-Job-First (SJF) Scheduling Algorithm
</h2>

<p style="text-align: justify;">
  Priority $p$ is assigned as inverse of required execution time $t$: $p = 1/t$. CPU is assigned to the process requiring shortest execution burst time. Can be <strong>non-preemptive</strong> or <strong>preemptive</strong> (Shortest-Remaining-Time-First / SRTF).
</p>

<p style="text-align: justify;">
  <img class="aligncenter" src="http://i18.photobucket.com/albums/b109/pieras/sjf.jpg" alt="scheduling algorithm" width="544" height="467" />
</p>

<ul style="text-align: justify;">
  <li>
    <strong>Non-preemptive Case</strong><br /> * Turnaround Time: P1=6, P2=19, P3=10, P4=5<br /> * Average Turnaround Time: (6 + 19 + 10 + 5)/4 = 10<br /> * Waiting Time: P1=0, P2=11, P3=6, P4=3<br /> * Average Waiting Time: (0 + 11 + 6 + 3)/4 = 5
  </li>
  <li>
    <strong>Preemptive Case:</strong><br /> * Turnaround Time: P1=8, P2=19, P3=10, P4=2<br /> * Average Turnaround Time: (8 + 19 + 10 + 2)/4 = 9.75<br /> * Waiting Time: P1=2, P2=11, P3=6, P4=0<br /> * Average Waiting Time: (2 + 11 + 6 + 0)/4 = 4.75
  </li>
</ul>
