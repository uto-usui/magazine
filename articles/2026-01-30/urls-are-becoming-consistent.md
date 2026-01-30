---
title: "URLs are becoming consistent"
source: "https://vercel.com/changelog/urls-are-becoming-consistent"
publishedDate: "2021-01-20"
category: "frontend"
feedName: "Vercel"
author: "Leo Lamprecht"
---

1 min read

Jan 20, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4GZidztG472t1wLDWQSrlp%2F6810101c096475be450c2779c253095f%2FNew_URLs_OG_Image.png&w=1920&q=75)

A lot of feedback we've gathered has shown that the URLs Vercel currently provides you with are too complicated. As part of our strategy for making them simpler, we're starting with applying a consistent format on **February 20th 2021**:

-   **Custom Domains and Automatic URLs** ending in `now.sh` will instead end in `vercel.app`.
    
-   **Automatic Deployment URLs** like `project-d418mhwf5.vercel.app` will gain the slug of the owner Vercel scope to match Automatic Branch URLs: `project-d418mhwf5-team.vercel.app`.
    
-   **Automatic Branch URLs** like `project-git-update.team.vercel.app` will lose their second subdomain level in favor of a dash: `project-git-update-team.vercel.app`.
    
-   **Automatic Project URLs** like `project.team.vercel.app` and **Automatic Team Member URLs** like `project-user.team.vercel.app` will be adjusted like Automatic Branch URLs.
    

It is recommended to not rely on any of the Automatic URLs for Production use cases and instead use [Custom Domains](https://vercel.com/docs/custom-domains) for that. If that's not possible, please ensure any program sending requests to these URLs supports 308 redirects – like modern browsers do.