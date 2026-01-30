---
title: "Domains now include their `www` counterpart"
source: "https://vercel.com/changelog/domains-now-include-their-www-counterpart"
publishedDate: "2021-04-02"
category: "frontend"
feedName: "Vercel"
author: "Paco Coursey"
---

1 min read

Apr 2, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7txR2YfPOxNaMNmbBy1Ntr%2F6ebccfdda144c18ffca8ed1374f03001%2FWWW_Redirect_OG_Image.png&w=1920&q=75)

Adding a domain to a project will now also suggest adding its `www` counterpart. This ensures visitors can always access your site, regardless of whether they type `www` when entering the domain, or not.

Using a `www` domain guarantees that the [Vercel Edge Network](https://vercel.com/blog/new-edge-dev-infrastructure#our-new-edge-infrastructure) can reliably and securely route incoming traffic as quickly as possible, so redirecting non-`www` to the `www` domain is recommended. Redirecting the other way works too if you prefer a cleaner URL address.

Existing domains are not affected by this change, but we recommend ensuring that your project already has a `www` redirect in place.

Check out [the documentation](https://vercel.com/docs/custom-domains#redirecting-domains) as well.