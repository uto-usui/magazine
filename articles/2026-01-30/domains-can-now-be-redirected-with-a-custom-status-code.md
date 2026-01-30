---
title: "Domains can now be redirected with a custom status code"
source: "https://vercel.com/changelog/domains-can-now-be-redirected-with-a-custom-status-code"
publishedDate: "2021-02-18"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Feb 18, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6WKp5N55zyb3F0npPKWsY9%2F9b4286f7fdc022961f4c84f22fb69011%2Fredirect-status-code-og-image.png&w=1920&q=75)

You can now select a temporary or permanent **status code** for [Domain Redirects](https://vercel.com/blog/redirecting-domains).

There are some subtle differences between these [status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections):

-   **307 Temporary Redirect:** Not cached by client, method and body never changed.
    
-   **302 Found:** Not cached by client, method may or may not be changed to GET.
    
-   **308 Permanent Redirect:** Cached by client, method and body never changed.
    
-   **301 Moved Permanently:** Cached by client, method may or may not be changed to GET.
    

We recommend using status code 307 or 308 to avoid the ambiguity of non-GET methods, which is necessary when your application needs to redirect a public API.

Check out [the documentation](https://vercel.com/docs/custom-domains#redirecting-domains) as well.