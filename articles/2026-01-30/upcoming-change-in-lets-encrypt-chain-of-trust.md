---
title: "Upcoming change in Let's Encrypt Chain of Trust"
source: "https://vercel.com/changelog/upcoming-change-in-lets-encrypt-chain-of-trust"
publishedDate: "2024-04-18"
category: "frontend"
feedName: "Vercel"
author: "Shohei Maeda"
---

2 min read

Apr 18, 2024

**Important:** This change does _**not**_ impact customers currently using custom certificates issued by commercial CAs and using them on Vercel via the [custom certificate](https://vercel.com/docs/projects/domains/custom-SSL-certificate) feature.

Vercel uses [Let's Encrypt](https://letsencrypt.org/) as its certificate authority (CA) to auto-provision TLS certificates to enable secure connections by default. When using custom domains in your Vercel app, traffic between clients and Vercel Edge Network is encrypted and protected using the auto-provisioned Let's Encrypt certificate.

[As planned](https://letsencrypt.org/2023/07/10/cross-sign-expiration.html), on **September 30th, 2024**, the current Let’s Encrypt cross-sign [DST Root CA X3](https://letsencrypt.org/certificates/) root certificate issued by IdenTrust will expire and no longer be available. Considering the small proportion of internet users with older devices today, Let's Encrypt has decided to officially sunset this cross-sign certificate chain. This change has been planned by Let's Encrypt over the past few years, under their mission of providing safe and secure communication to everyone who uses the Web. You can read more about this change in their [blog post](https://letsencrypt.org/2023/07/10/cross-sign-expiration.html).

After **September 30th, 2024**, clients accessing your websites hosted on Vercel must be able to trust the latest [ISRG Root X1](https://letsencrypt.org/certificates/) root certificate from their local trust store. Modern operating systems and browsers trust this certificate, and it should not cause any noticeable impacts on your users. However, some older devices, such as Android 7.0 or earlier, may be unable to trust the new chain by default.

You can check more details about this change and review remedy options in our [public announcement](https://github.com/orgs/vercel/discussions/6374) on the GitHub community forum.