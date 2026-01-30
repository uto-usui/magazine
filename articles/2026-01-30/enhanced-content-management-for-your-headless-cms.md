---
title: "Enhanced content management for your headless CMS"
source: "https://vercel.com/blog/enhanced-content-management-for-headless-cmses"
publishedDate: "2023-06-22"
category: "frontend"
feedName: "Vercel"
author: "wits"
---

2 min read

Jun 22, 2023

See new content before it's published, review, and edit in real-time with Draft Mode and Visual Editing on Vercel.

Today we’re excited to announce updates to [Draft Mode](https://vercel.com/docs/workflow-collaboration/draft-mode), making it easier to see your latest content changes before they’re published.

Draft Mode goes hand in hand with [Visual Editing](https://vercel.com/blog/visual-editing), our real-time content editing feature for websites using headless Content Management Systems (CMSes). When you make changes through Visual Editing, you can guarantee that your edits will show up the next time the page is viewed in Draft Mode.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5NOcPKiBNbmnhAHfeVOBem%2F7f743f5ab8a7083b48e061d41de76ca9%2FEdit_Mode-inline-light1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2QGz1ghJsvG25JqNj9MlRB%2F3fbd9cf28266963dd77c366425b88b5c%2FEdit_Mode-inline-dark1.png&w=1920&q=75)

## [Link to heading](#what-is-draft-mode)**What is Draft Mode?**

[Draft Mode](https://vercel.com/docs/workflow-collaboration/draft-mode) is a simplified, more powerful version of Preview Mode (previous) that's integrated into the Vercel toolbar on deployments. This makes the integration into sites easier for publishers on all plans while also giving you the ability to:

-   Easily server-render previews of static pages
    
-   Protect your unpublished content from being viewed publicly
    
-   Integrate with any headless provider of your choice
    

When generating blog posts from a headless CMS, you can now have an unpublished draft post that bypasses [Incremental Static Regeneration](https://vercel.com/docs/concepts/incremental-static-regeneration) (ISR) and is not cached. This means that the draft content you write in the CMS is immediately available to your website so you can share a link with someone or edit the draft.

Before Draft Mode, you had to keep refreshing the page until you hit the revalidate period to see the latest draft content, or you would have to configure an API endpoint and hook up a button and use on demand revalidation.

[

**See how teams are using Draft Mode**

Learn how the team at Formidable enabled marketers, designers, and other collaborators to edit website content without needing to involve developers with Draft Mode and Sanity CMS.

Learn more



](https://formidable.dev/blog/2023/powering-our-website-s-evolution-next-js-app-router-and-sanity-cms-in-action/)

## [Link to heading](#updates-on-visual-editing)**Updates on Visual Editing**

Visual Editing was another big step in bringing accessible collaboration to web development with a direct connection to your headless CMS. Since [Vercel Ship](https://vercel.com/ship), we have been working to onboard new customers like HashiCorp, Sonos, and Tome and we're happy to share that Visual Editing is now in public beta for Pro and Enterprise teams.

[

**Get started**

Learn more about how you can uplevel your digital experience with Vercel's Visual Editing, currently in beta for Pro and Enterprise customers. ⁡⁣‌‍‍⁢𝅵‍‍⁡⁢⁡⁠‍𝅳⁠‌⁣𝅴𝅹⁡‍‍⁡𝅸

Contact Us



](https://vercel.com/contact/sales)

Additionally, we’re excited that more CMSes have been able to adopt the content source-mapping technology to enable Visual Editing. In addition to our launch partner, [Sanity](https://www.sanity.io/blog/visual-editing-sanity-vercel?utm_source=vercel.com&utm_medium=referral&utm_campaign=may-vercel-launch), Visual Editing can now be used with the following headless CMSes:

We look forward to even more CMSes adopting the Visual Editing functionality to bring real-time content editing to everyone across the software development process. We've made the documentation public for supporting Visual Editing in your CMS, [get started](https://vercel.com/docs/workflow-collaboration/visual-editing/cms-guide) today.