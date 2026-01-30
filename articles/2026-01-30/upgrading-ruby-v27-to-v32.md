---
title: "Upgrading Ruby v2.7 to v3.2"
source: "https://vercel.com/changelog/upgrading-ruby-v2-7-to-v3-2"
publishedDate: "2023-11-22"
category: "frontend"
feedName: "Vercel"
author: "Nathan Rajlich"
---

1 min read

Nov 22, 2023

Gemfile

```
source "https://rubygems.org"ruby "~> 3.2.x"
```

Ruby v3.2 is now generally available, and is the new default runtime version for Ruby based [Builds](https://vercel.com/docs/deployments/builds) and [Serverless Functions](https://vercel.com/docs/functions/serverless-functions). Additionally, Ruby v2.7 will be discontinued on December 7th, 2023.

-   Existing deployments that use Ruby v2.7 _will continue to work_
    
-   New deployments will use Ruby v3.2 by default, or if `ruby "~> 3.2.x"` is defined in the `‌Gemfile`
    
-   After December 7th, 2023, new deployments that define `ruby "~> 2.7.x"` in the `‌Gemfile` will no longer build
    

Only the minor version (`3.2`) is guaranteed, meaning we will always use the latest patch version available within the minor range.

[Read the documentation](https://vercel.com/docs/functions/serverless-functions/runtimes/ruby) for more.