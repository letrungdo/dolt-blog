---
template: "post"
title: "Accelerating PC App E2E Testing: Replacing Appium with Native Accessibility APIs"
date: 2026-10-13T10:00:00+07:00
author: letrungdo
slug: "speed-up-pc-app-e2e-testing-replacing-appium"
cover: "../../images/2026/10/e2e-testing-cover.png"
categories:
  - Dev
tags:
  - Flutter
  - E2E Testing
  - Automation
  - Python
  - Testing
---

When automating End-to-End (E2E) testing for Desktop applications (PC apps on Windows and macOS)—especially complex applications featuring multi-window layouts and real-time UI updates—**Appium** (via WinAppDriver on Windows or Mac2/WebDriverAgent on macOS) is traditionally the default choice.

However, as the test suite scales to hundreds of test cases, Appium often becomes a major performance bottleneck: execution times skyrocket, element lookups on rich UI trees become painfully slow, and background driver sessions frequently crash.

This article shares a proven architectural solution: **Eliminating Appium completely** in favor of direct interaction with **Native OS Accessibility APIs** (Windows UI Automation & macOS Accessibility API). The results are remarkable: **test execution speeds increased by 3x to over 10x**, enabling a suite of over 700 test cases to complete in under 30 minutes completely offline.

---

## Why Appium Struggles on Desktop Applications

Appium is designed as a cross-platform abstraction layer adhering to the WebDriver protocol. When applied to complex desktop applications, this architecture introduces severe performance overhead:

### 1. Protocol Overhead & High Latency
Every simple interaction like `click()`, `find_element()`, or `type()` must traverse multiple hops:
`Test Script (Python/JS)` ➔ `Appium Server (Node.js)` ➔ `Driver Daemon (WinAppDriver / WebDriverAgentMac)` ➔ `OS API` ➔ Response returned via HTTP REST.

Sending continuous HTTP requests adds significant latency to every test step.

### 2. Extremely Slow Accessibility Tree Traversals
On desktop windows containing 200+ active UI nodes (such as data tables or real-time charts):
- **On Windows**: WinAppDriver's XPath and `page_source` queries inspect properties element-by-element sequentially. A simple element search can take anywhere from **16 to 75 seconds**!
- **On macOS**: The Mac2 driver communicates over HTTP to WebDriverAgentMac, taking **0.3s - 0.5s** per lookup and over **2s** just to type text into an input field.

### 3. Session Instability and Flakiness
Background daemons like `WebDriverAgentMac` or `WinAppDriver` frequently enter stale states, throwing `Failed to launch` or `Could not proxy command` errors that disrupt automated CI/CD pipelines.

---

## The Solution: Direct Native Accessibility API Integration

To solve these issues at the root, the solution is to build a lightweight **Custom Python Driver** that interfaces directly with the native operating system APIs without any intermediary server daemon.

```
┌─────────────────────────────────────────────────────────┐
│              Pytest Test Suite (Python)                 │
│         Uses a Unified Platform-Agnostic Driver         │
└────────────────────────────┬────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│    Windows Driver     │         │     macOS Driver      │
│  UIAutomationCore.dll │         │ ApplicationServices   │
│   (comtypes / Win32)  │         │   (pyobjc / Quartz)   │
└───────────┬───────────┘         └───────────┬───────────┘
            │                                 │
            ▼                                 ▼
┌─────────────────────────────────────────────────────────┐
│                 Desktop App Under Test                  │
│       (Receives Native Events: Click, Typing, Scroll)   │
└─────────────────────────────────────────────────────────┘
```

### 1. Windows: Leveraging UI Automation Core via `comtypes`
Instead of relying on PowerShell/HTTP traversals, the new driver calls `UIAutomationCore.dll` directly using Python's `comtypes`:

- **Single Cached Tree Read**: By using `ElementFromHandleBuildCache` with `TreeScope_Subtree`, the entire UI hierarchy of a complex window (~200 nodes) is fetched into memory in **~0.3 seconds** (compared to 16–75s with Appium).
- **Native Input Simulation**: Uses Win32 API (`SendInput`) to send true mouse events and Unicode keystrokes, completely avoiding input method editor (IME) interference or dropped characters.

### 2. macOS: Direct Accessibility API via `pyobjc`
On macOS, the driver interacts directly with `ApplicationServices` (`AXUIElement`) and `Quartz` via `pyobjc`:

- **Ultra-Fast Tree Walks**: Calling `AXUIElementCopyMultipleAttributeValues` scans all application windows in just **10ms - 60ms**.
- **Hardware-Level Event Generation**: Uses `CGEvent` to issue precise mouse clicks at element centers and send Unicode strings directly while ensuring the application is frontmost.

---

## Supporting Architecture for High-Speed E2E Testing

Replacing the driver driver is only half the battle. To achieve maximum speed and 100% test reliability, the overall test infrastructure incorporates several key patterns:

### 1. In-App Offline Fake Server
All API requests and WebSocket channels (e.g., real-time pushes) are served by an **in-process fake server compiled directly into E2E builds** (controlled via flags like `--dart-define=E2E=true`).
- **Benefits**: Zero network dependency, complete immunity to backend downtime or network flakiness.
- **Scenario Mocking**: Easily simulates error conditions (network timeouts, session expirations, transaction failures) deterministically.

### 2. Zero-Impact Test ID Strategy
UI elements (for instance in Flutter) are tagged using `Semantics(identifier/label = testId)`.
- **In E2E Builds**: The test ID surfaces in the first line of the accessibility label (`test.id\nVisible Text`).
- **In Production Release**: Compile-time flags completely tree-shake all mock code and test identifiers, leaving production binaries untouched.

### 3. Isolated Run Environments
Each test execution initializes a clean, isolated application data folder (`<appSupport>/e2e/<runId>/`). This guarantees that local database state, secure storage, and settings do not bleed between tests.

### 4. Direct Native Shell Automation (File Dialogs & External Browser)
System operations like Open/Save File Dialogs or external browser links are handled directly by the driver via OS APIs:
- Intercepts and populates file paths in native OS File Dialogs.
- Captures evidence screenshots when external browsers open, then automatically closes browser tabs to return focus to the app.

---

## Performance Benchmarks: Appium vs. Native Accessibility Driver

Here is a performance comparison measured on the exact same test hardware:

| Action / Scenario | Appium (WinAppDriver / Mac2) | Native Accessibility Driver | Speedup Factor |
|---|---|---|---|
| **App Startup to Login Screen** | ~7.3 seconds | **1.9 seconds** | **~3.8x faster** |
| **Text Field Input** | ~2.0 seconds / field | **0.2 - 0.4 seconds** | **5x - 10x faster** |
| **Control Lookup & Click** | 0.3s - 1.0s (up to 16s+) | **~0.01 seconds** | **30x - 100x faster** |
| **Complex Journey Test (Order Journey)** | ~24.0 seconds | **6.7 seconds** | **~3.5x faster** |
| **Full Test Suite Run (~700 test cases)** | Several hours (frequent timeouts) | **~29 minutes** | **100% Passing & Reliable** |

---

## Conclusion & Key Takeaways

Transitioning from **Appium** to **Native OS Accessibility APIs** was a game-changer for desktop app automation:

1. **Performance at Scale Matters**: As test suites grow to hundreds of test cases, small 0.5s delays compound into hours of pipeline wait time. Going native removes unnecessary middleware latency.
2. **Rock-Solid Stability**: Eliminating intermediary HTTP daemons removes flakiness and session crash issues.
3. **Clean Abstraction**: Adopting the Page Object Model with a unified `Driver` interface allows test scripts to be written once and run seamlessly across both Windows and macOS.

If your team faces performance bottlenecks or flakiness with desktop E2E automation, building a lightweight native driver based on OS Accessibility APIs is an investment that pays off immensely!
