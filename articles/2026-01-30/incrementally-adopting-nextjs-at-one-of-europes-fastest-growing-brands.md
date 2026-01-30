---
title: "Incrementally adopting Next.js at one of Europe's fastest growing brands"
source: "https://vercel.com/blog/incrementally-adopting-next-js-at-one-of-europes-fastest-growing-brands"
publishedDate: "2023-06-23"
category: "frontend"
feedName: "Vercel"
author: "Kiana Lewis"
---

3 min read

Jun 23, 2023

Learn how reMarkable's tech stack allows them to improve their developer experience while also delivering great UX.

## Products Used

Next.js

Preview Deployments

ISR

Integrations

While [reMarkable](https://remarkable.com/), pioneers of the next-generation paper tablet, can credit much of their initial success to their original website, they knew they’d need to improve key elements of their stack and workflow to reach new heights. The team opted for a composable stack—comprised of [Sanity](https://vercel.com/integrations/sanity), Next.js, and Vercel—to meet the needs of their developers while empowering their content creators to deliver truly delightful digital experiences.

## [Link to heading](#the-case-for-headless:-empowering-every-team-to-create)**The case for headless: empowering every team to create**

reMarkable’s developers were excited to benefit from the flexibility and power of a modern composable architecture. After migrating from Gatsby, Vercel and [Sanity](https://vercel.com/integrations/sanity) allowed reMarkable to speed up build times with a faster frontend stack. The improvements to their web team’s development experience allowed them to ship faster and more efficiently.

### [Link to heading](#streamlined-review-cycles)**Streamlined review cycles**

The design team had always used Figma to display new site designs for stakeholders to review. However, the static, Figma mockup is just a fragment of what the team wanted to show. [Vercel Preview Deployments](https://vercel.com/features/previews) helped speed up review cycles, facilitate more stakeholder feedback, and really show what reMarkable’s team can do. While they still use Figma, Previews paired with instant content updates from Sanity give them a whole other dimension to showcase ideas and get buy-in.

> Preview comments have been a great tool for us to collaborate. It’s been an easy way for us to push changes. We can tell stakeholders: Just log in and comment straight on the solution.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/77EV6nol7DkV5drKH8xxqJ/e2d50eac9b69b765eed3e378e680b423/image.png)
> 
> **Kristi Faye-Lund,** Full Stack Developer at reMarkable

### [Link to heading](#self-sufficient-editorial-team)**Self-sufficient editorial team**

If reMarkable’s editorial team wanted to make certain website changes in the past, they’d need the help of developers and designers. As reMarkable Full-Stack Developer Kristi shares, "We didn't want to have so many dependencies in the process. We wanted our content people to actually be able to work on _content—_not wait for a developer." With Sanity as part of their composable architecture, content creators can create as many custom landing pages as they need on their own. This allows their entire organization to move faster, with less tech debt. 

### [Link to heading](#faster-builds-for-faster-ships)**Faster builds for faster ships**

Development builds were slow to start in the beginning, and at times, reMarkable’s engineers would have to start them multiple times to get them going. After switching to Vercel, the initial startup time of development builds dropped. John, full-stack developer at reMarkable, explains, “This was a dramatic change that improved the lives of all our developers. It makes working on projects much more pleasant.” Production times improved as well through Next.js—going from **5m 55s** to just **39s**.

### [Link to heading](#de-risking-headless-transition-with-an-incremental-migration-)**De-risking headless transition with an incremental migration** 

reMarkable’s developers chose to incrementally migrate from Gatsby to Next.js and Sanity so they could ensure a smooth, manageable transition. First, they modified their website’s structure as much as possible to prepare for the change, moving to a pages folder and lifting the datafetching to the pages-level. They then started their development in a separate branch, with rewriting the queries as the main bulk of work. Once that chunk of work was done, they swapped in the new framework, and onboarded the rest of the development team. This allowed them to move to a new stack, in place, only changing hosting and a few other parameters on the outside. No long living branches or new repos needed. 

Going forward, reMarkable’s team is excited to continue future-proofing their content structure. They’re ready to achieve new levels of success with their freshly-empowered editorial team, and the eCommerce brand is eager to continue making strides with their agile composable stack.

[

**Ready to redefine your digital experiences with Vercel?**

If you're curious about how Vercel can uplift your team's specific use case, our experts are ready for a conversation.

Let's Talk



](https://vercel.com/contact/sales)