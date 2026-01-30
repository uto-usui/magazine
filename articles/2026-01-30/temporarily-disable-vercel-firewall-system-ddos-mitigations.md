---
title: "Temporarily disable Vercel Firewall system DDoS mitigations"
source: "https://vercel.com/changelog/temporarily-disable-vercel-firewall-system-ddos-mitigations"
publishedDate: "2024-11-27"
category: "frontend"
feedName: "Vercel"
author: "Sage Abraham"
---

1 min read

Nov 27, 2024

Pro and Enterprise customers now have the ability to temporarily disable all automatic system mitigations, including DDoS mitigations, by the Vercel Firewall.

We strongly recommend against disabling protections. However, if you feel like the protections are blocking legitimate traffic this feature presents a break-glass option. This may be particularly applicable if you have a proxy in front of Vercel that provides DDoS protection and which may interfere with Vercel's protection.

To temporarily disable system mitigations, visit the [Firewall tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall&title=Firewall+tab) within the Vercel dashboard and click the ellipsis menu at the top right to access additional options. Once you confirm that you would like to temporarily disable all system mitigations, all traffic to your project will bypass Vercel Firewall system DDoS mitigations for a period of 24 hours.

Vercel Firewall's system defenses are automatically enabled for all projects on all plans, [mitigating billions of malicious connection attempts every week](https://vercel.com/blog/preventing-infrastructure-abuse-with-vercel-firewall), and preventing resource abuse. Customers must exercise extreme caution when disabling automated defenses as no attack will be blocked.

**Please note that you are responsible for all usage fees incurred when using this feature, including illegitimate traffic that may otherwise have been blocked.**

Learn more about [Vercel Firewall's automatic DDoS mitigation](https://vercel.com/docs/security/ddos-mitigation#bypass-system-level-mitigations).