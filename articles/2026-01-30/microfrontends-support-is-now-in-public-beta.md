---
title: "Microfrontends support is now in Public Beta"
source: "https://vercel.com/changelog/microfrontends-support-is-now-in-public-beta"
publishedDate: "2025-08-06"
category: "frontend"
feedName: "Vercel"
author: "Mark Knichel"
---

1 min read

Aug 6, 2025

[Microfrontends](https://vercel.com/docs/microfrontends) support is now available in [Public Beta](https://vercel.com/docs/release-phases#public-beta). Microfrontends allow you to split large applications into smaller ones so that developers can move more quickly.

This support lets teams and large apps build and test independently, while Vercel assembles and routes the app into a single experience. This reduces build times, supports parallel development, and enables gradual legacy migration.

Developers can use the [Vercel Toolbar](https://vercel.com/docs/microfrontends/managing-microfrontends/vercel-toolbar) to iterate and test their apps independently, while navigations between microfrontends benefit from [prefetching and prerendering](https://vercel.com/docs/microfrontends/managing-microfrontends#optimizing-navigations-between-microfrontends) for fast transitions between the applications.

To get started with microfrontends, clone [one of our examples](https://vercel.com/templates/microfrontends) or follow the [quickstart](https://vercel.com/docs/microfrontends/quickstart) guide:

1.  In the Vercel dashboard, navigate to the [Microfrontends tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fsettings%2Fmicrofrontends&title=Try+Microfrontends) in Settings
    
2.  Create a microfrontends group containing all of your microfrontend projects
    
3.  Add the `@vercel/microfrontends` [package](https://npmjs.org/@vercel/microfrontends) to each microfrontend application
    
4.  Add a `microfrontends.json` configuration file to the default app, test in Preview, and deploy to Production when ready
    

microfrontends.json

```
{  "dashboard": {},  "docs": {    "routing": [{      "paths": ["/docs", "/docs/:path*"]    }]  }],  "marketing": {    "routing": [{      "paths": ["/home", "/pricing"]    }]  }}
```

Microfrontends configuration file routing paths to three different applications

Learn more about microfrontends in [our docs](https://vercel.com/docs/microfrontends), or [contact Vercel](https://vercel.com/contact/sales) or your account team directly for more information.