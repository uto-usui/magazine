---
title: "Encrypted Client Hello (ECH) is now supported on Vercel CDN"
source: "https://vercel.com/changelog/encrypted-client-hello-now-supported-on-vercel-cdn"
publishedDate: "2026-08-14"
category: "frontend"
feedName: "Vercel"
author: "Faryal Siddiqui"
---

Vercel CDN now supports Encrypted Client Hello (ECH) for domains managed by Vercel DNS. ECH encrypts the Server Name Indication (SNI) in the TLS handshake, the last part of an HTTPS connection that revealed which hostname a client was connecting to. With ECH, network observers see a connection to Vercel's shared ECH hostname, `vercel-ech.com`.

ECH is managed at the platform level and enables automatically where supported. Recent versions of Chrome, Edge, and Firefox [support Encrypted Client Hello](https://support.mozilla.org/en-US/kb/understand-encrypted-client-hello).

Learn more about ECH and how Vercel CDN protects your application in the [CDN encryption](https://vercel.com/docs/cdn-security/encryption#encrypted-client-hello-ech) documentation.