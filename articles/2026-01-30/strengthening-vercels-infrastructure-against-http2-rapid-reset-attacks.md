---
title: "Strengthening Vercel's Infrastructure against HTTP/2 Rapid Reset Attacks"
source: "https://vercel.com/changelog/strengthening-vercels-infrastructure-against-http-2-rapid-reset-attacks"
publishedDate: "2023-10-11"
category: "frontend"
feedName: "Vercel"
author: "Abdel Sabbah"
---

1 min read

Oct 11, 2023

At Vercel, we consistently monitor and update our security protocols to address emerging threats. A new vulnerability, known as the HTTP/2 Rapid Reset Attack ([CVE-2023-44487](https://www.cve.org/CVERecord?id=CVE-2023-44487)), has the potential to disrupt HTTP/2-enabled web servers.

Rapid Reset is a vulnerability possible in the HTTP/2 protocol involving quickly initiating and canceling streams. It can be used to launch large denial-of-service attacks, negatively affecting performance and availability.

We've taken proactive steps to refine our infrastructure and strengthen our defenses. Our improved system can now more efficiently handle the HTTP/2 Rapid Reset Attack.

An essential component of our defense strategy is inline network traffic monitoring, where we identify malicious TCP connections and terminate them. Limiting abuse over a single connection has enabled Vercel to protect against HTTP/2 Rapid Reset Attack.

Combining our existing system with new improvements, all applications on Vercel are even further resistant to the HTTP/2 Rapid Reset Attack.

We want to assure you that your web assets are protected against the HTTP/2 Rapid Reset Attack. We're committed to consistently improving our security measures in response to new threats to ensure safety and reliability for all users.