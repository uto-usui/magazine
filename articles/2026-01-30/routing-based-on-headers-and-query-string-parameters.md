---
title: "Routing based on Headers and Query String Parameters"
source: "https://vercel.com/changelog/routing-based-on-headers-and-query-string-parameters"
publishedDate: "2021-06-02"
category: "frontend"
feedName: "Vercel"
author: "JJ Kasper"
---

1 min read

Jun 2, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5jkFJHi22W9A7F4bZt24Ou%2F247858dc3fcc341e8eb0707e3c93cdd9%2FFrame.png&w=1920&q=75)

At Vercel, our goal is to provide you with the best performance for your web projects, while still allowing for the most flexibility possible when it comes to tailoring responses to users.

As part of these efforts, we're now launching a new sub property called `has` for `rewrites`, `redirects`, and `headers` (in `vercel.json` or `next.config.js`), which allows for routing conditionally based on the values of headers, cookies, and query string parameters.

Combined with features like SSG, ISR, or cached SSR, it can be used in cases like these:

-   Responding differently based on a cookie that was set in the visitor's browser (`Cookie` header) or the type of device the visitor is using (`User-Agent` header).
    
-   Responding differently based on the geographical location of the visitor ([Geo-IP headers](https://vercel.com/changelog/ip-geolocation-for-serverless-functions)).
    
-   Redirecting users directly to their dashboard if they're logged in (`Cookie` header).
    
-   Redirecting old browsers to prevent serving unsupported pages (`User-Agent` header).
    

Check out the [documentation](https://vercel.com/docs/configuration#project/redirects) and [Next.js announcement](https://nextjs.org/blog/next-10-2#routing-based-on-headers-and-query-string-parameters) to learn more.