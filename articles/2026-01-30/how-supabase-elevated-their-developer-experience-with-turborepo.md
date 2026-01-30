---
title: "How Supabase elevated their developer experience with Turborepo"
source: "https://vercel.com/blog/how-supabase-elevated-their-developer-experience-with-turborepo"
publishedDate: "2023-01-24"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

2 min read

Jan 24, 2023

[Supabase](https://supabase.com/) is an open-source alternative to Firebase that provides all the backend features you need to ship a project in a weekend. Their growing 60-person development team has been using [Next.js on Vercel](https://vercel.com/solutions/nextjs) from the beginning to quickly ship their documentation, marketing site, and dashboard to thousands users. Yet with a user base that continues to grow, the team is ready to ship even faster.

![Turborepo + Supabase](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2bfQ1mCGmxMdKUKQDjqdrL%2Fbc6a1db8c16c6228cadd141528215510%2FFrame_427319365.png&w=1920&q=75)![Turborepo + Supabase](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6HBJLPzdkc8JKqdFPsL85w%2F0b7e4792bc15d7320fe7414c799696a1%2FFrame_427319363__2_.png&w=1920&q=75)

Turborepo + Supabase

Making changes to their UI has never been easier with [Turborepo](https://turbo.build/repo). Before, something as simple as changing the class name of a UI component required their devs to make updates in the repo, create an npm release, then pull the code back in from npm to finally deploy to production. It was a complex process with too much overhead for such a simple change.

Now, a single developer can make one change in one place in one pull request—lowering the barrier to entry for contributions and dramatically improving their developer experience. The entire Supabase system can be ran locally with one terminal command and Supabase community members can, from outside the core organization, contribute meaningful code that is ready to be deployed to production in one pass.

> Before Turborepo, making a change to the UI required a careful process and several steps. Now that we’re using Turborepo, our Tailwind, TypeScript, and linting configuration all just magically work in our repo. No one needs to manage it, and it all just works. It's amazing.”
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2TMTtgwqvmI2msvHWoso2Y/06868a75ac9ebdd1826d0897013d4de0/CleanShot_2023-01-19_at_14.42.41_2x.png)
> 
> **Terry Sutton,** Frontend Developer

Supabase’s developers also take advantage of [Vercel Preview Deployments](https://vercel.com/features/previews) with commenting capabilities to enable collaboration with external teams. By sharing a live link and gathering stakeholder feedback via comments, this distributed team of 60 can deliver expert-level work quickly.

As part of a company that deploys hundreds of times per day during peak season, the ability to streamline this process was a game changer for Jonathan and his team. 

> Part of what’s great about Vercel and Next.js is that you can just open a PR, merge, and it’s live.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4zyPaXyA81F6eC7hop2BER/510b11339e1f18eeeefaa62dc5d9dea4/CleanShot_2023-01-19_at_15.06.39_2x.png)
> 
> **Jonathan Summers-Muir,** Frontend Developer

So what’s next for Supabase’s dev team? They’re looking forward to exploring more of what Turborepo has to offer: Remote Caching on Vercel, build time improvements, and more. 

**If you’d like to experience how Turborepo and Vercel can improve your own developer experience,** [**get in touch**](https://vercel.com/contact)**.**