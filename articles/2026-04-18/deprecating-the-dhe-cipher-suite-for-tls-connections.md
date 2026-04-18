---
title: "Deprecating the DHE cipher suite for TLS connections"
source: "https://vercel.com/changelog/deprecating-the-dhe-cipher-suite-for-tls-connections"
publishedDate: "2026-03-12"
category: "frontend"
feedName: "Vercel"
author: "Matthew Stanciu"
---

1 min read

Mar 12, 2026

On June 30th, 2026, Vercel will remove support for the legacy `DHE-RSA-AES256-GCM-SHA384` cipher suite.

This cipher may still be used by automated systems, security scanners, and HTTP clients with non-standard TLS configurations.

After this date, clients using TLS 1.2 will only be able to connect to the Vercel network with [our six remaining cipher suites](https://vercel.com/docs/cdn-security/encryption#supported-ciphers):

-   `ECDHE-ECDSA-AES128-GCM-SHA256`
    
-   `ECDHE-RSA-AES128-GCM-SHA256`
    
-   `ECDHE-ECDSA-AES256-GCM-SHA384`
    
-   `ECDHE-RSA-AES256-GCM-SHA384`
    
-   `ECDHE-ECDSA-CHACHA20-POLY1305`
    
-   `ECDHE-RSA-CHACHA20-POLY1305`
    

Modern clients and TLS 1.3 connections are unaffected.

If you operate integrations or automated systems that connect to a domain hosted on Vercel over TLS 1.2, verify that your TLS client supports at least one of the above cipher suites. Modern TLS libraries support these by default.