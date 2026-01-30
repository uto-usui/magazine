---
title: "Faster CDN proxying to external origins"
source: "https://vercel.com/changelog/faster-cdn-proxying-to-external-origins"
publishedDate: "2025-05-23"
category: "frontend"
feedName: "Vercel"
author: "Casey Gowrie"
---

1 min read

May 23, 2025

We’ve optimized connection pooling in our CDN to reduce latency when connecting to external backends, regardless of traffic volume.

-   **Lower latency**: Improved connection reuse and TLS session resumption reduce response times by up to 60% in some regions, with a 15–30% average improvement.
    
-   **Reduced origin load**: 97% connection reuse and more efficient TLS resumption significantly cut the number of new handshakes required.
    

This is now live across all Vercel deployments at no additional cost.