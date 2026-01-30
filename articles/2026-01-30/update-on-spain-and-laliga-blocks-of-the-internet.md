---
title: "Update on Spain and LALIGA blocks of the internet"
source: "https://vercel.com/blog/update-on-spain-and-laliga-blocks-of-the-internet"
publishedDate: "2025-04-15"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

3 min read

Apr 15, 2025

[A Spanish court has granted LALIGA](https://cybernews.com/news/spain-laliga-streaming-piracy-campaign/) the power to block IP addresses associated with unauthorized football streaming—without distinguishing between infringing and non-infringing services. As a result, legitimate, unrelated websites that people depend on are now inaccessible in Spain.

**April 18 update**: We are working closely with LALIGA to promptly remove illegal streaming content that infringes on LALIGA’s copyrights. IP addresses `66.33.60.129` and `76.76.21.142` are no longer blocked, and no action is required by Vercel customers. Additionally, in the past seven days, Vercel has not received any takedown notices related to LALIGA content. This reflects our continued commitment to a zero-tolerance policy for illegal content on our platform.

In December 2024, Commercial Court No. 6 of Barcelona authorized LALIGA to require Spanish ISPs, including Movistar, Vodafone, and Orange, to block IP addresses associated with unauthorized football streaming. The court upheld this ruling in March 2025, [reinforcing LALIGA's authority to enforce these blocks](https://www.laliga.com/en-GB/news/commercial-court-no-6-of-barcelona-upholds-the-judgment-issued-in-favour-of-laliga-and-dismisses-the-annulments-filed-by-cloudflare-and-rootedcon?utm_source=chatgpt.com). Recently, enforcement has widened, and Vercel infrastructure is now being affected.

Users in Spain now face indiscriminate internet blocking, with legitimate websites becoming inaccessible due to their association with shared IP addresses.

This includes services that have no connection to piracy, highlighting the collateral damage of such broad enforcement actions.

## [Link to heading](#indiscriminate-blocking:-a-blanket-form-of-censorship)Indiscriminate blocking: a blanket form of censorship

This isn't a narrowly scoped takedown. LALIGA is a private organization triggering IP-wide blocks that impact critical infrastructure, developers, and businesses—without review, due process, or transparency. These blocks are primarily enforced during LALIGA matchdays, typically on weekends and select weekdays, when live broadcasts occur.

ISP-level blocking of individual sites is common. Typically, this is done by inspecting the [Server Name Indication (SNI)](https://en.wikipedia.org/wiki/Server_Name_Indication) header during the TLS handshake. SNI contains the hostname in plaintext before encryption, allowing ISPs to block specific domains while leaving other traffic on the same IP untouched, even while the actual traffic is encrypted.

But that’s not what’s happening here. Spanish ISPs are blocking entire IPs, ignoring SNI and making no effort to distinguish between hosts. Any website or service behind a blocked IP is taken offline, regardless of its legitimacy.

What started as an anti-piracy measure has become an unaccountable form of internet censorship. There’s no distinction between targeted enforcement and mass collateral damage. IPs are being blocklisted wholesale.

## [Link to heading](#what-this-means-for-developers-on-vercel)What this means for developers on Vercel

Spanish ISPs are enforcing a court order tied to LALIGA by blocking entire IP ranges, not specific domains or content. These blocked IPs for users from a subset of ISPs include:

-   `66.33.60.129`
    
-   `76.76.21.142`
    

These IPs serve lawful content, used by businesses like Spanish startup [Tinybird](https://www.tinybird.co/), [Hello Magazine](https://www.hellomagazine.com/), and others operating on Vercel, despite no affiliations with piracy in any form. This affects users in Spain, using Spanish ISPs, while users in neighboring countries remain unaffected.

This issue isn’t isolated to Vercel. Cloudflare, GitHub Pages, and BunnyCDN are also affected.

## [Link to heading](#where-we-stand)Where we stand

Users shouldn’t be blocked from legitimate websites and apps, and developers shouldn’t lose access to their audience because of a private entity.

Vercel actively monitors and removes illegal content across our platform. We operate a dedicated abuse team that responds promptly to reports submitted via our [abuse form](https://vercel.com/abuse). This team investigates and takes down infringing deployments, including phishing, malware, copyright and trademark violations—anything that violates Vercel's Acceptable Use Policy with the [Terms of Service](https://vercel.com/legal/terms).

We remain committed to providing fast, secure infrastructure for modern web applications. Likewise, we expect enforcement efforts to do the same: targeted, transparent, and technically sound. We are in contact with LALIGA and are collaborating to remove illegal content in accordance with the court order.

We’re exploring mitigation strategies to restore access for Spanish users and continue to advocate for an open and permissionless web. If you are impacted by this, please don’t hesitate to [join the open discussion](https://community.vercel.com/t/ip-address-block-in-spain/8795), contact support, or reach out to your CSM.