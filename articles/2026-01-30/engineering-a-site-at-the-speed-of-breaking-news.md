---
title: "Engineering a site at the speed of breaking news"
source: "https://vercel.com/blog/washington-post-next.js-vercel-engineering-at-the-speed-of-breaking-news"
publishedDate: "2023-07-27"
category: "frontend"
feedName: "Vercel"
author: "Greta Workman"
---

3 min read

Jul 27, 2023

The Washington Post paid off tech debt by migrating to Next.js and Vercel between primary season and the 2022 US midterm elections. It reaped dividends.

Many Vercel and Next.js users deal with large swaths of data. But few wrangle data in the way The Washington Post Elections Engineering team does.

Knowing their platform must be fast and visually compelling—all while handling constant updates from thousands of federal, state, and local elections—The Post moved to Next.js and Vercel for the 2022 US midterm elections.  

### [Link to heading](#the-unique-challenges-of-a-newsroom-engineer)The unique challenges of a newsroom engineer

Tyler Fisher is a Principal Software Engineer on the Election Engineering team. He elevates and innovates how The Post uses political and election data. “We do that by building data pipelines, predictive models, and compelling visuals for readers,” Fisher says. “Essentially, we build infrastructure for all election results pages.”

A close partner of The Post’s newsroom, the team processes the constant stream of data from thousands of elections nationwide on November 8—US Election Day—while handling traffic spikes from engaged users. 

The engineers need to "match the speed of The Post's formidable newsroom," according to Anthony Pesce, Engineering Manager of the Election Engineering team. They stay constantly attuned to reporters’ needs and the stories they want to tell on election night—which are always in flux.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5LJZrNICFCKjcxlTfRiLil%2F9f34d75f242091dac2bd164bd353cada%2FBlog_Graphic-V2.png&w=1920&q=75)

Before Vercel, The Post’s rendering layer was deployed on AWS using an ECS cluster. In order to fine-tune the data updates needed for such a heavy workload, the team orchestrated an intricate revalidation system leveraging SQS and EC2.

“It was complex and there were onboarding hurdles for new developers and fine tune performance. And it was expensive. Vercel took a lot of that load off of us,” says Fisher. 

### [Link to heading](#moving-to-vercel-for-fast-iteration-and-smooth-collaboration)Moving to Vercel for fast iteration and smooth collaboration

Above all, The Post team knows that they have a hard deadline of November 8. “There’s no pushing a release by a couple days or weeks,” says Fisher. “It’s an immovable deadline.”

Prior to the 2022 elections season, the Election Engineering team’s previous solution was already Next.js-based. They had small a window between end of primary season and November general election where they had time to go all-in on Vercel, with four goals in mind:

1.  Migrate to [Next.js 12,](https://nextjs.org/blog/next-13) to take full advantage of [Incremental Static Regeneration](https://vercel.com/docs/concepts/incremental-static-regeneration/overview)
    
2.  Host [development and production environments](https://vercel.com/docs/concepts/deployments/environments) to streamline stakeholder review and ease the burden of infrastructure management
    
3.  Rewrite their frontend in TypeScript to catch errors before they happen
    
4.  Improve the quality of test coverage and documentation
    

Vercel’s [collaboration tooling](https://vercel.com/features/previews) is integral to the team’s success as well. With stakeholders like political editors, reporters, and graphics teams all working together, they “have to review, test, and deploy rapidly, because every second matters,” says Fisher. “We love the ability to integrate our stakeholders into the process.”

![With Figma-like commenting, Vercel's Preview Comments feature empowers stakeholders from all areas of the business to collaborate with developers. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2nLEfGTbrsSloT3rRfZfsM%2F37f7ec0bc62a427866077feca6788a47%2FBlog_Graphic-R2.png&w=1920&q=75)

With Figma-like commenting, Vercel's Preview Comments feature empowers stakeholders from all areas of the business to collaborate with developers.

### [Link to heading](#spiky-traffic,-streaming-data)Spiky traffic, streaming data

For The Post’s Election Engineering team, Vercel proved to be a perfect fit for their platform. Fast iteration via seamless collaboration is key for them, as is the platform’s unique ability to handle hefty data and aggressive traffic spikes. 

“To keep up with both our incredibly spiky traffic and the sheer amount of data streaming in, we need a solution that has the primary benefit of static sites—easy and instant scalability—with the benefit of dynamic sites—responsive to quickly changing data—without rebuilding the entire project,” says Fisher.

This resulted in a flawless election night presentation of over 1,000 individual elections spread across 52 different results pages—all hosted on Vercel. 

### [Link to heading](#a-huge-election-night-win)A huge election night win

Midterm election night went off without a hitch for Fisher’s team at The Washington Post, even with a rewrite that he risked implementing at the last moment.

“Our highest data load page was for the US House of Representatives, which has roughly 400 races on one page. That’s a lot of data. We had been using a websocket solution to update the page while the user was on it, and it was lagging like crazy. So, I rewrote the solution at the last second. It held up and worked really well!”

“Our night was a lot simpler because of Vercel and Next.js. It was a huge win for us,” Fisher says.

Pesce adds that on Vercel, **“it was the smoothest election night anyone could remember.”**  

[

**Looking to pay off tech debt?**

Connect with a Next.js expert and learn about Vercel's best-in-class tooling for site performance and org-wide collaboration.

Contact Us



](https://vercel.com/contact)