---
title: "HTTPS DNS records are now supported in Vercel DNS"
source: "https://vercel.com/changelog/https-dns-records-are-now-supported-in-vercel-dns"
publishedDate: "2024-01-08"
category: "frontend"
feedName: "Vercel"
author: "Shohei Maeda"
---

1 min read

Jan 8, 2024

You can now create `HTTPS` DNS records in Vercel DNS.

The new `HTTPS` DNS record type, also known as SVCB or Service Binding record, has recently been published as [RFC 9460](https://datatracker.ietf.org/doc/rfc9460/).

This record type is designed for the HTTP protocol to improve client performance and privacy in establishing secure connections. The record can include additional information about the target server, such as supported ALPN protocols (e.g., HTTP/2, HTTP/3, etc), which can eliminate the need for protocol negotiation/upgrade between client and server to minimize the number of round trips.

Since the `HTTPS` record type is still a new standard, not all HTTP clients can support it. Learn more in [our documentation](https://vercel.com/docs/projects/domains/working-with-dns#dns-records).