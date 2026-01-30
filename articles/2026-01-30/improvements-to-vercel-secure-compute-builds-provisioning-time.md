---
title: "Improvements to Vercel Secure Compute builds provisioning time"
source: "https://vercel.com/changelog/improvements-to-vercel-secure-compute-builds-provisioning-time"
publishedDate: "2024-11-08"
category: "frontend"
feedName: "Vercel"
author: "Guðmundur Bjarni Ólafsson"
---

1 min read

Nov 8, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F71XMhFZWGlLBGcMtFyRADA%2F3e3e327f9272078f7de6995bf2f70ad0%2FSelf-serve_Secure_Compute_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2dvWNlepO6XpPeAfuNEQzS%2F7f2e5c0e973e70a010972e81c902ceb9%2FSelf-serve_Secure_Compute_Dark.png&w=1920&q=75)

[Provisioning time](https://vercel.com/docs/security/secure-compute#build-delay) for [Vercel Secure Compute](https://vercel.com/docs/security/secure-compute#vercel-secure-compute) builds has decreased from 1-2 minutes to under 5 seconds—a 20x speed improvement.

These builds require provisioning of build containers with custom configurations for each customer’s security needs. Now, this tailored container-generation process is significantly faster, reducing overall deployment times.

Additionally, builds are consolidated closer to the Secure Compute regions such as Frankfurt, Sao Paulo, Oregon, N. Virginia, Sydney, or Ireland, enhancing efficiency even further.

Learn more about [Vercel Secure Compute](https://vercel.com/docs/security/secure-compute#vercel-secure-compute).