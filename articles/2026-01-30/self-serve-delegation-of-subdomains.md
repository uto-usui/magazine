---
title: "Self-serve delegation of subdomains"
source: "https://vercel.com/changelog/self-serve-delegation-of-subdomains"
publishedDate: "2022-05-02"
category: "frontend"
feedName: "Vercel"
author: "Mark Glagola"
---

1 min read

May 2, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3Joki7vxAWQjBbKxuftNq5%2Fbc50a4fcf05280f9e4f559a1855d5833%2Fself-serve-delegation-of-subdomains-22-05-04-LIGHT.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fq9JXAY4ch2WuFUPws0JC0%2Fce3845c295e075eb3d4d6910629549b1%2Fself-serve-delegation-of-subdomains-22-05-04-DARK.png&w=1920&q=75)

If you host multiple subdomains on Vercel throughout separate accounts, you are now able to verify ownership of those subdomains in a self-serve manner via the Vercel Dashboard and API. Adding a subdomain to a project no longer requires the apex domain. Ownership is established via a token that is generated when the subdomain is added to a project and published in the domain owner’s DNS records. This change makes it easier to share domains for Platforms, teams, and collaborators on Vercel.

To learn more check out the [UI docs](https://vercel.com/docs/concepts/projects/custom-domains#verification-challenge) or REST API docs to [add a domain to a project](https://vercel.com/docs/rest-api#endpoints/projects/add-a-domain-to-a-project) and [verify that domain](https://vercel.com/docs/rest-api#endpoints/projects/verify-project-domain) if needed.