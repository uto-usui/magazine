---
title: "Install Marketplace Integrations from the Vercel CLI"
source: "https://vercel.com/changelog/install-marketplace-integrations-from-the-vercel-cli"
publishedDate: "2024-09-19"
category: "frontend"
feedName: "Vercel"
author: "Luka Hartwig"
---

1 min read

Sep 19, 2024

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3EDdCNmsjPssRnvSta0tY8%2F4542a7965db5b9430363855b613b08a5%2Fcli_light.gif&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3sz3jOCIxTvYetPySP5kF7%2F8e0893af9eaa1231017cec4cced2469b%2Fcli__1_.gif&w=1920&q=75)

You can now install integrations from the Vercel Marketplace directly through the Vercel CLI.

The [Vercel Marketplace](https://vercel.com/blog/introducing-the-vercel-marketplace) offers [native integrations](https://vercel.com/docs/integrations#native-integrations) that allow you to use provider products —currently Supabase, Redis, and EdgeDB—directly from the Vercel dashboard without leaving the platform or creating separate accounts.

Running the **`vc i`** command will:

-   Install the integration (e.g. **`vc i supabase`** to install Supabase)
    
-   Automatically provision resources as part of the integration installation, as required by the provider products
    
-   Get enhanced error messages in the terminal for troubleshooting of any installation issues
    

Check out the [documentation](https://vercel.com/docs/cli/install) to learn more.