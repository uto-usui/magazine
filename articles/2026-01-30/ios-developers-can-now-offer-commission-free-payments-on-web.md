---
title: "iOS developers can now offer commission-free payments on web"
source: "https://vercel.com/blog/ios-developers-can-now-offer-commission-free-payments-on-web"
publishedDate: "2025-05-01"
category: "frontend"
feedName: "Vercel"
author: "Fernando Rojo"
---

3 min read

May 1, 2025

Yesterday, a federal court made a decisive ruling in Epic Games v. Apple: Apple violated a 2021 injunction by continuing to restrict developers from linking to external payment methods, and by imposing a 27% fee when they did.

The ruling represents a major shift for native app developers.

### [Link to heading](#why-does-it-matter)Why does it matter?

Apple’s App Store has operated as a tightly controlled marketplace. Until now, developers couldn’t even tell users they could pay elsewhere. Apple’s 30% cut (the so-called "Apple Tax") meant higher prices for consumers, smaller margins for developers, and less freedom overall.

After the 2021 injunction, Apple introduced a system called StoreKit External Purchase Link API. This surfaced a system disclosure sheet, a "scare screen," warning users that they were about to leave the app. **Even worse, Apple still applied a 27% commission to these off-platform transactions.**

This effectively killed price competition: developers who already paid 3–6% to third-party payment processors now had to add another 27% on top, making it impossible to offer lower prices on the web.

Apple also tightly controlled how and where these links could appear. They couldn’t be placed inline with normal purchase flows. Instead, developers were forced to bury them in a separate section of the app. And once tapped, users were pushed into a generic browser session, forced to log in again and manually search for the item they originally wanted to buy. Meanwhile, Apple’s scare screen front-ran the whole experience to steer users back toward Apple’s own payment system.

![Example of a system warning shown before opening an external payment link which adds friction and undermines trust in alternative payment options.
](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2kYPda3aPq9dVjkcmMqMqV%2F7cba9b0aa4fa9fc24a4d8533ac83cbff%2Fimage__8_.png&w=1920&q=75)

Example of a system warning shown before opening an external payment link which adds friction and undermines trust in alternative payment options.

Yesterday's ruling ends that. It confirms that developers are allowed to guide users to external payment pages, and that Apple can’t tax or obstruct those transactions.

### [Link to heading](#what-changes-now)What changes now

-   **In-app steering is allowed**: Developers can include dynamic, context-aware links that take users directly to external payment pages.
    
-   **No more Apple tax**: Apple can no longer charge a 27% fee on payments it doesn’t process.
    
-   **User experience improves**: No scare screens. No redirects that lead nowhere. Just straightforward, frictionless checkout flows.
    

Developers can own the payment experience, offer better pricing, and build direct relationships with their users.

### [Link to heading](#what-this-unlocks-for-native-developers-and-their-users)What this unlocks for native developers and their users

For native developers, this unlocks real choice. You can stick with Apple’s in-app payments, or you can route users to your own checkout experience. One you design, one you own.

It also unlocks opportunity. For some, that means passing savings on to users. For others, it’s the margin needed to stay profitable or reinvest in their product. Users benefit too. Expect to see more transparent pricing, new discount models, and an improved purchase flow across games, media, productivity apps, and more.

### [Link to heading](#a-moment-for-the-web)A moment for the web

While this ruling isn’t about the web specifically, it opens a new role for it. The browser is no longer just a fallback; it's now a viable surface for mobile commerce.

﻿Without App Store restrictions, native developers can embrace the web to build checkout flows that are fast, secure, and customizable.

### [Link to heading](#a-starter-kit-for-web-payments)A starter kit for web payments

To help teams get started, we're releasing a starter kit for using Vercel for web payments in native apps. Our goal is to help you build checkout flows optimized for conversion, performance, and developer control.

**You can still use Apple Pay.**

The starter kit includes support for Apple Pay on the web. You can offer Apple Pay as part of your external checkout flow, separate from Apple's in-app purchase (IAP) system. Apple Pay is fully supported in Safari and, as of iOS 16, in other third-party browsers like Chrome and Firefox on iOS devices.

Whether you’re extending a native app or launching a new product, you now have a direct, open path to collect payments on the web.

[

**iOS Web Payments Starter Kit**

Everything you need to launch fast, secure, and scalable payment flows on the web. Connected to Stripe Checkout and easily deployed on Vercel.

Deploy now



](https://vercel.com/templates/Next.js/ios-web-payments-starter)

### [Link to heading](#what's-next)What's next

At Vercel, we believe in giving developers the tools and platform to:

-   Make external payment pages feel fast and polished
    
-   Deliver performance and reliability at global scale
    
-   Control their stack and grow their business, without gatekeepers
    

We believe in openness. Not in opposition to native, but in connection with it. Vercel is ready to support native developers by bridging their apps with the open web.

This ruling doesn’t tear down a walled garden, but it opens a gate. Now it’s up to developers to walk through.