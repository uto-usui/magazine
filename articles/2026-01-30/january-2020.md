---
title: "January 2020"
source: "https://vercel.com/blog/changelog-january-2020"
publishedDate: "2020-01-01"
category: "frontend"
feedName: "Vercel"
---

1 min read

Jan 1, 2020

## [Link to heading](#deployments)Deployments

-   New deployments will now automatically receive the latest Node.js version [available on Vercel](https://zeit.co/docs/runtimes#official-runtimes/node-js/node-js-version) at that point in time.
    

## [Link to heading](#domains)Domains

-   When deleting a project, all of its Production Domains will now made unavailable as well (no content will be served from them anymore).
    
-   Domains that are never properly configured will now be automatically deleted after 7 days, instead of 3.
    
-   When creating a new project, its default Production Domain is now made one word shorter if the combination is available.
    

## [Link to heading](#other)Other

-   Adding support for a new framework to Vercel is now only a matter of creating a single Pull Request for the [zeit/now](https://github.com/zeit/now) repository.
    
-   As of Now CLI 16.7.3, all files starting with `.env` are not uploaded. Previously, only files specifically named `.env` were not uploaded.
    
-   New endpoints for retrieving a [realtime stream of all requests for a deployment](https://zeit.co/docs/api/#endpoints/logs/stream-serverless-function-logs) and retrieving all [failed requests](https://zeit.co/docs/api/#endpoints/logs/fetch-failed-requests-for-serverless-function) are now available.