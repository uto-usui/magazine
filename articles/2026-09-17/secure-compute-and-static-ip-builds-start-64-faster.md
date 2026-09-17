---
title: "Secure Compute and Static IP builds start 64% faster"
source: "https://vercel.com/changelog/secure-compute-and-static-ip-builds-start-64-faster"
publishedDate: "2026-09-16"
category: "frontend"
feedName: "Vercel"
author: "Ali Smesseim"
---

Builds using [Secure Compute](https://vercel.com/docs/networking/secure-compute) or [Static IPs](https://vercel.com/docs/networking/static-ips) now start 64% faster, with the average time from deployment creation to build start dropping from 6.7 seconds to 2.4 seconds.

Previously, each build waited for a new build container to boot with its network configuration. These builds now use prewarmed build containers, with your network configuration attached when the build starts.

The improvement is applied automatically to builds using Secure Compute or Static IPs, with no configuration changes required.

Learn more about [Secure Compute](https://vercel.com/docs/security/secure-compute) and [Static IPs](https://vercel.com/docs/connectivity/static-ips).