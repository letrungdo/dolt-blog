---
title: Artificial Intelligence Midterm Exam Study Guide with Answers
date: 2017-04-15T18:25:41+07:00
author: letrungdo
template: "post"
slug: "tai-lieu-thi-giua-ky-tri-tue-nhan-tao"
lang: "en"
cover: "../../images/2017/04/tri-tue-nhan-tao.png"
categories:
  - Documents
  - HUIT
---

This article provides an **Artificial Intelligence midterm exam study guide** for students. The contents are summarized concisely with detailed algorithm illustrations.

# Artificial Intelligence Midterm Exam Study Guide

## What is a Heuristic Function?

Heuristic is an evaluation function estimating the likelihood of reaching a solution. Denoted as `h`.

## 1. Breadth-First Search (BFS)

Breadth-first search uses the FIFO (First In, First Out) mechanism — QUEUE — First in, First out.

### Executing BFS Algorithm

<img class="aligncenter size-full wp-image-1881" src="/media/2017/04/thuat-toan-bfs.png" alt="" width="835" height="467" srcset="/media/2017/04/thuat-toan-bfs.png 835w, /media/2017/04/thuat-toan-bfs-768x430.png 768w, /media/2017/04/thuat-toan-bfs-470x264.png 470w, /media/2017/04/thuat-toan-bfs-215x120.png 215w, /media/2017/04/thuat-toan-bfs-300x168.png 300w, /media/2017/04/thuat-toan-bfs-414x232.png 414w" sizes="(max-width: 835px) 100vw, 835px" />

## 2. Depth-First Search (DFS)

LIFO (Last In, First Out) — STACK — Last in, First out.

Why can **Depth-First Search** potentially get stuck in infinite loops?

-> Because child states are generated continuously, increasing depth infinitely. Resolved by capping maximum search depth.

### Executing DFS Algorithm

<img class="aligncenter size-full wp-image-1882" src="/media/2017/04/thuat-toan-dfs.png" alt="" width="832" height="454" srcset="/media/2017/04/thuat-toan-dfs.png 832w, /media/2017/04/thuat-toan-dfs-768x419.png 768w" sizes="(max-width: 832px) 100vw, 832px" />

## 3. Iterative Deepening Search (IDS)

Like DFS but with depth limit boundaries.

**Example:**

1. Depth limit = 0

<img class="aligncenter size-full wp-image-1885" src="/media/2017/04/tim-kiem-sau-dan.png" alt="" width="520" height="127" />

2. Depth limit = 1

<img class="aligncenter size-full wp-image-1802" src="https://tđ.vnmedia/2017/04/tim-kiem-sau-dan-1.png" alt="iterative deepening search" width="1061" height="118" />  
3. Depth limit = 2

<img class="aligncenter size-full wp-image-1884" src="/media/2017/04/tim-kiem-sau-dan-2.png" alt="" width="1072" height="255" srcset="/media/2017/04/tim-kiem-sau-dan-2.png 1072w, /media/2017/04/tim-kiem-sau-dan-2-768x183.png 768w" sizes="(max-width: 1072px) 100vw, 1072px" />

## 4. Hill-Climbing Search

**Hill-climbing search** is a specialized variant of depth-first search without backtracking. The next state is chosen using a Heuristic evaluation function.

Unlike depth-first search, hill climbing does not store all child nodes, saving only a single chosen state if available.

- Better state choice: Simple Hill Climbing
- Best state choice: Steepest-Ascent Hill Climbing

### 4.1 Simple Hill Climbing

Simple hill climbing selects the very first successor state found that evaluates better than the current state.

Steps of Simple Hill Climbing:

**Step 1**: If initial state (T0) is goal state: exit and report success.  
Otherwise, set current state (Ti) to initial state (T0).

**Step 2**: Loop until goal state is reached or no valid next state (Tk) exists from current state:

a) Set Tk as a valid successor state of current state Ti.

b) Evaluate new state Tk:

- If it is goal state, return it and exit.
- If it is not goal state but evaluates better than current state, set it as current state.
- If it is not better than current state, continue loop iteration.

### 4.2 Steepest-Ascent Hill Climbing

Similar to simple hill climbing, except **steepest-ascent hill climbing** evaluates all valid outgoing branches and selects the single best state among available successors.

<img class="aligncenter size-full wp-image-1888" src="/media/2017/04/leo-doi-doc-dung.png" alt="" width="679" height="456" srcset="/media/2017/04/leo-doi-doc-dung.png 679w, /media/2017/04/leo-doi-doc-dung-300x200.png 300w, /media/2017/04/leo-doi-doc-dung-130x86.png 130w" sizes="(max-width: 679px) 100vw, 679px" />

**Sample Problem:**

H(n) = |Goal x-coord – n x-coord| + |Goal y-coord – n y-coord|  
n:=S  
h(S)=|4-1|+|4-1|= 6 (min)  
h(A)=|4-2|+|4-3|= 3 (min) < h(S)  
NextS = A  
n:=A  
h(B)=|4-2|+|4-4|=2 (min) h(C)=|4-2|+|4-2|=4  
h(B)<h(A)  
NextA = B  
n:=B  
h(E)=|4-3|+|4-4|=1 (min) < h(B)  
NextB = E  
n:=E  
h(G)=|4-4|+|4-4|=0 (min) h(H)=|4-3|+|4-3|=2  
h(G)<h(E)  
NextE = G (Goal - Stop)

## 5. GTS Algorithm (Greedy-Traveling Salesman)

### 5.1 GTS1

Find path with lowest cost traversing n vertices given a cost matrix starting from a specified vertex v.

### Sample Problem:

<img class="aligncenter size-full wp-image-1806" src="https://tđ.vnmedia/2017/04/gts1.png" alt="" width="758" height="510" /><img class="aligncenter size-full wp-image-1807" src="https://tđ.vnmedia/2017/04/gts2.png" alt="" width="797" height="509" /> 5.2. GTS2

Similar to GTS1, but this algorithm evaluates paths starting from all vertices v, then selects the best overall path.

## 6. Graph Coloring Optimization Algorithm

**Algorithm**: Repeat the following steps until all vertices are colored:

**Step 1**: Choose uncolored vertex with highest degree and paint with color `i`.  
**Step 2**: Degree reduction:  
Colored vertex: degree = 0  
Adjacent vertices: degree := degree – 1  
**Step 3**: Mark adjacent vertices (whose degree was decremented) as forbidden from taking color `i`.

**Example**: Task assignment, work schedule, tournament scheduling:

A scientific conference has 9 different topic sessions, each taking 1 time slot.  
The following topic pairs/sets cannot run concurrently: AE, BC, CD, ED, ABD, AHI, BHI, DFI, DHI, FGH.  
Construct a schedule minimizing total required time slots. Hint: color count = required time slots.

=> Solution:  
<img class="aligncenter size-full wp-image-1808" src="https://tđ.vnmedia/2017/04/to-mau-do-thi.png" alt="" width="541" height="354" /><img class="aligncenter size-full wp-image-1809" src="https://tđ.vnmedia/2017/04/giai-thuat-to-mau-do-thi.png" alt="" width="832" height="470" /> Conclusion:  
Slot 1: G, D; Slot 2: C, E, H; Slot 3: A, F; Slot 4: B; Slot 5: I

## 7. AT Algorithm (Algorithm for Tree)

**Steps of AT Algorithm:**

**Step 1**:

- For all vertices n, all cost values g(n) are initially unknown.
- Open starting vertex, call it S. Set g(S) = 0.  
**Step 2**: Choose open vertex with smallest corresponding cost g, call it N.
- If N is goal: path from initial node to N is shortest path with cost g(N). Stop (Success).
- If no open vertices remain: problem tree has no path to goal. Stop (Fail).
- If tie occurs (multiple vertices N share identical minimum g(N)): check if any of them is goal.  
  If yes: path from initial node to node N is shortest with cost g(N). Stop (Success).  
  If no: arbitrarily pick one of those vertices and call it N.  
**Step 3**: Close vertex N and expand outgoing successor nodes from N. For every successor node S from N calculate:  
  g(S) = g(N) + cost(N->S)  
**Step 4**: Return to Step 2.

## 8. AKT Algorithm – Search with Knowledge (Algorithm for Knowledgeable Tree Search)

**Example:**

**Tower of Hanoi Problem with n = 2**

Let `n` be total number of disks to move, `m` be number of disks correctly placed on 3rd peg, `k` be number of disks incorrectly placed on 3rd peg.

You must move misplaced disks out of peg 3 (k disks), then move incorrectly placed disks into correct position (n-m-k disks), and finally place k misplaced disks back.

Thus the formula is: h = k + (n-m-k) + k = n-m+k.

<img class="aligncenter size-full wp-image-1810" src="https://tđ.vnmedia/2017/04/thap-ha-noi-at.png" alt="" width="731" height="488" />

<img class="aligncenter size-full wp-image-1811" src="https://tđ.vnmedia/2017/04/thap-ha-noi-at_.png" alt="" width="682" height="612" />

## 9. A\* Search Algorithm – Pathfinding on General Graphs

**Steps of A\* Algorithm:**  
**Step 1**:  
– Initial state: g, h, f values unknown for vertices.  
– Open initial node S, set g(S) = 0  
– Estimate heuristic h(S)  
– Set f(S) = h(S) + g(S)  
**Step 2**: Choose open vertex with smallest f(S), call it N.

- If N is goal: path from initial node to node N is shortest with cost g(N). Stop (Success).
- If no open nodes exist: graph has no valid path to goal. Stop (Fail).
- If tie occurs with multiple nodes sharing minimum f(S): check if any is goal node.

* If yes: path from initial node to N is shortest with cost g(N). Stop (Success).
* If no: pick one arbitrarily and call it N.  
**Step 3**:  
– Close node N, and for each successor node S from N calculate:  
– g'(S) = g(N) + cost(S->N)  
– If node S is already open and g(S) <= g'(S), ignore S  
– Otherwise open S and set g(S) = g'(S), compute h(S) and f(S) = g(S) + h(S)  
**Step 4**: Return to Step 2.

<span class="td_text_highlight_marker_red td_text_highlight_marker">Download complete AI Midterm Study Guide:</span> <a href="https://drive.google.com/file/d/1UNEO40JLvU_xkg5DuERLw-6xiiGyvQa5/view?usp=sharing" target="_blank" rel="noopener">AI Midterm Review</a>
