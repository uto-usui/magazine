---
title: "Is Agentic now tailors its audit by site type"
source: "https://vercel.com/changelog/is-agentic-report-categories"
publishedDate: "2026-09-16"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

[Is Agentic](https://is-agentic.com/) reports now let you view your checks through one of four site types: Docs & content, Business, App, or Commerce.

For example, the Commerce view highlights payment and checkout standards like x402, UCP, and ACP, while the App view highlights API discovery, authentication, error handling, and SDK support.

Your score stays the same in every view, and you can change views on an existing report without rescanning. Only the highlighted checks change, so you can focus on what matters for your kind of site while keeping scores comparable across sites.

To set the default view, add a single meta tag to your page's `<head>`:

```
<meta name="is-agentic-site-type" content="app">
```

Set the value to match your site type:

-   `content` for Docs & content
    
-   `business` for Business
    
-   `app` for App
    
-   `store` for Commerce
    

The tag only sets which view readers see first. It doesn't add points or change your score. If no type is declared, Is Agentic infers one and shows which type it chose.

Run a check at [is-agentic.com](https://is-agentic.com/) or read the [documentation](https://is-agentic.com/docs#declare-site-type).