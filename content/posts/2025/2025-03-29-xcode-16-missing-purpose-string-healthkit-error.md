---
template: "post"
title: Xcode 16 Validation Error "Missing purpose string in Info.plist" when not using HealthKit
date: 2025-03-29T15:10:00+08:00
author: letrungdo
slug: "xcode-16-missing-purpose-string-healthkit-error"
cover: "../../images/2025/03/missing-purpose-string-healthkit.png"
keywords: "Xcode 16, validation error, Validation failed, Info.plist, NSHealthShareUsageDescription, HealthKit, Flutter, provisioning profile, Apple App Store, binary validation"
categories:
  - Dev
  - Flutter
tags:
  - Xcode
---

Recently, some developers using Xcode 16 to validate their iOS applications have encountered a rather frustrating error during the submission process to Apple App Store Connect. This error appears even when the application does not use any APIs related to HealthKit.

## How to fix Missing purpose string in Info.plist

When performing binary validation on Xcode 16, you might receive an error message with a 409 status code like this:

```log
Validation failed (409)
Missing purpose string in Info.plist. Your app's code references one or more APIs that access sensitive user data, or the app has one or more entitlements that permit such access.
The Info.plist file for the "Runner.app" bundle should contain a NSHealthShareUsageDescription key with a user-facing purpose string explaining clearly and completely why your app needs the data.
If you're using external libraries or SDKs, they may reference APIs that require a purpose string.
While your app might not use these APIs, a purpose string is still required.
For details, visit: https://developer.apple.com/documentation/uikit/protecting_the_user_s_privacy/requesting_access_to_protected_resources.（ID: 4e189c8f-8d9f-4665-b816-a9e426e07ae7）
```

The noteworthy point is that, in this specific case, the application was developed using Flutter and does not have any code directly using HealthKit. Even a thorough check of the source code and third-party SDKs does not reveal the presence of HealthKit APIs.

### The Unexpected Cause:

After investigation, the root cause of the issue was identified: **The HealthKit capability is enabled in the application's provisioning profile.**

<img src="/media/2025/03/provisioning_profile_include_healthkit.jpg" class="aligncenter size-full" alt="provisioning profile include HealthKit" />

Even if your application doesn't actually use HealthKit features, having this capability enabled in the provisioning profile still causes Apple to require the `NSHealthShareUsageDescription` key in the `Info.plist` file. This is a user privacy protection mechanism, ensuring that any application with the potential to access sensitive data (whether it uses it or not) clearly explains the purpose of accessing that data.

### The Simple Solution:

The solution to this error is straightforward if you have correctly identified the cause:

**Disable the HealthKit capability in your application's provisioning profile.**

Here are the steps to take (depending on your provisioning profile management process):

1.  **Access the Apple Developer Portal:** Log in to your Apple Developer account.
2.  **Navigate to Certificates, Identifiers & Profiles:** Select this section.
3.  **Choose Profiles:** Find and select the provisioning profile your application is using.
4.  **Edit Profile:** Edit this profile.
5.  **Locate Capabilities:** Browse through the list of enabled capabilities.
6.  **Disable HealthKit:** If HealthKit is selected, deselect it.
7.  **Generate and Download the Profile:** After disabling HealthKit, regenerate the profile and download the new version.
8.  **Update Xcode:** In Xcode, ensure that your project is using the updated provisioning profile. You might need to refresh the signing settings.
9.  **Re-run Validation:** Perform the binary validation again. The "Missing purpose string in Info.plist" error related to HealthKit should disappear.

### Conclusion:

The "Missing purpose string in Info.plist" validation error when not using HealthKit can be confusing for developers.

However, understanding that Apple requires a purpose string declaration for any capability enabled in the provisioning profile, even if not directly used in the code, will help you quickly find the solution.

Double-check your provisioning profile if you encounter a similar situation!
