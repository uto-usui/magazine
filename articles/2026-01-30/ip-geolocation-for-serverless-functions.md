---
title: "IP Geolocation for Serverless Functions"
source: "https://vercel.com/changelog/ip-geolocation-for-serverless-functions"
publishedDate: "2021-03-05"
category: "frontend"
feedName: "Vercel"
author: "Naoyuki Kanezawa"
---

1 min read

Mar 5, 2021

![with cercel → vercel](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4ly1RA8BEua41bGT2Y91wE%2F5b9d0a1d214045dcd8897d96df4af174%2FGeoIP_OG_Image__1_.png&w=1920&q=75)

Requests received by Serverless Functions on [Pro and Enterprise Teams](https://vercel.com/pricing) are now enriched with headers containing information about the geographic location of the visitor:

-   `X-Vercel-IP-Country` – The 2-letter country code of the IP sending the request.
    
-   `X-Vercel-IP-Country-Region` – The [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) region code associated to the IP.
    
-   `X-Vercel-IP-City` – The city name associated to the IP.
    

As an example, a request from Tokyo is now enriched with the following headers:

```
X-Vercel-IP-Country: JPX-Vercel-IP-Country-Region: 13X-Vercel-IP-City: Tokyo
```

This feature is now automatically activated for all new and existing Serverless Functions on [Pro and Enterprise Teams](https://vercel.com/pricing) — no code or configuration change needed.

Check out [the documentation](http://vercel.com/docs/edge-network/headers#request-headers) as well.