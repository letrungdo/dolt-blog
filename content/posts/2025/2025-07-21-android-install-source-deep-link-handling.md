---
template: "post"
title: "Identifying App Install Sources and Handling Deep Links on First Launch in Android"
date: 2025-07-21T14:00:00+07:00
author: letrungdo
slug: "android-install-source-deep-link-handling"
cover: "../../images/2025/07/android-install-referrer-cover.png"
categories:
  - Dev
tags:
  - Android
  - Deep Link
  - Adjust
  - Firebase Dynamic Links
  - Install Referrer
---

When developing Android applications, identifying the installation source and properly handling deep links on first app launch is crucial for tracking marketing campaigns and improving user experience. This article explores how to distinguish between different installation sources and manage deep link handling challenges that arise during the initial app launch.

## Understanding Android Install Referrer API

The Android Install Referrer API is a service provided by Google Play that helps developers identify where their app installations originated. This API is essential for attribution tracking, allowing developers to understand which marketing campaigns, websites, or other apps drove users to install their application. The API provides referrer information that was passed to Google Play when the user clicked on a link that led to the app installation.

When a user installs an app for the first time, there are typically three common scenarios:

1. **Installation via Adjust link** - When users click on an Adjust tracking link from an advertisement or campaign
2. **Installation via Firebase Dynamic Link** - When users follow a Firebase Dynamic Link that leads to the Play Store
3. **Installation from Play Store search** - When users discover and install the app organically through Play Store search

## Distinguishing Between Install Sources

The Install Referrer API returns different referrer URL patterns for each installation source, allowing developers to identify and categorize them accordingly:

### Adjust Link Installation
When an app is installed through an Adjust tracking link, the referrer URL contains specific Adjust parameters:
- Response format: `com.android.installreferrer.api.ReferrerDetails@[hash]`
- Referrer URL pattern: `adjust_reftag=cyt0ilQKOybFk`

The presence of `adjust_reftag` parameter clearly indicates that the installation originated from an Adjust campaign link, which includes the campaign tracking tag.

### Firebase Dynamic Link Installation
Firebase Dynamic Links produce a different referrer pattern:
- Response format: `com.android.installreferrer.api.ReferrerDetails@[hash]`
- Referrer URL pattern: `utm_source=(not%20set)&utm_medium=(not%20set)`

The "(not set)" values for UTM parameters are characteristic of Firebase Dynamic Link installations where specific campaign parameters weren't provided.

### Play Store Organic Search
Organic installations through Play Store search have their own distinct pattern:
- Response format: `com.android.installreferrer.api.ReferrerDetails@[hash]`
- Referrer URL pattern: `utm_source=google-play&utm_medium=organic`

The combination of `utm_source=google-play` and `utm_medium=organic` clearly indicates an organic installation through Play Store search.

## Deep Link Handling Challenges on First Launch

When handling deep links during the first app launch, developers face a unique challenge. The app's deep link handling logic (`handleAppLinks`) can be triggered from multiple entry points:

1. **onCreate()** - Called when the activity is first created
2. **onNewIntent()** - Called when the activity receives a new intent while running
3. **setOnDeferredDeeplinkResponseListener()** - Adjust SDK's callback for deferred deep links

### The Multiple Invocation Problem

During a first-time installation via an Adjust link, all three methods mentioned above may attempt to handle the same deep link, potentially causing duplicate navigation or conflicting behaviors. This happens because:

- The Android system may deliver the deep link intent to `onCreate()` or `onNewIntent()`
- Simultaneously, the Adjust SDK processes the deferred deep link and triggers its callback
- Without proper coordination, the app might process the same deep link multiple times

### Understanding Deferred Deep Links

The `setOnDeferredDeeplinkResponseListener` is particularly important for first-time installations. This Adjust SDK callback:

- Only executes once during the app's first launch after installation
- Runs asynchronously, often after `onCreate()` and `onNewIntent()` have already executed
- Communicates with Adjust servers to retrieve the original deep link data
- Returns a boolean value that determines whether Adjust should open a new activity

When the callback returns `true`, Adjust will attempt to open a new activity with the deep link. Returning `false` gives developers full control over the navigation flow.

### Implementing a Single Execution Strategy

To ensure deep links are handled only once during first launch, developers need to implement a coordination mechanism that:

1. **Tracks execution state** - Maintains a flag to indicate whether a deep link has already been processed
2. **Prioritizes sources** - Gives preference to the Adjust deferred deep link callback when available
3. **Implements timing logic** - Accounts for the asynchronous nature of the Adjust callback
4. **Prevents race conditions** - Uses synchronization to avoid concurrent execution issues

The general approach involves:
- Immediately processing deep links from the Adjust callback when received
- Temporarily storing deep links from `onCreate()` or `onNewIntent()`
- Implementing a delay mechanism to wait for potential Adjust callbacks
- Processing stored deep links only if no Adjust callback is received

## Best Practices and Considerations

### Installation Source Tracking
- Store the identified installation source for future analytics and user segmentation
- Use the installation source to customize the onboarding experience
- Track conversion rates and user behavior based on installation source

### Deep Link Management
- Implement robust error handling for malformed or invalid deep links
- Consider edge cases such as app updates or reinstallations
- Test thoroughly across different installation scenarios
- Monitor deep link handling in production to identify issues

### Performance Optimization
- Minimize the delay waiting for Adjust callbacks to maintain app responsiveness
- Consider implementing timeout mechanisms for network-dependent operations
- Cache installation source data to avoid repeated API calls

### Security Considerations
- Validate deep link contents before processing
- Implement proper authentication for sensitive deep link actions
- Be cautious with deep links that trigger automatic actions

## Conclusion

Successfully identifying app installation sources and handling deep links during first launch requires careful implementation and consideration of various edge cases. By leveraging the Android Install Referrer API and implementing a coordinated deep link handling strategy, developers can:

- Accurately attribute app installations to their sources
- Provide seamless deep linking experiences for new users
- Avoid duplicate or conflicting navigation behaviors
- Gather valuable analytics for marketing optimization

The key is understanding the asynchronous nature of these systems and implementing proper coordination mechanisms to ensure a smooth user experience from the moment of installation.