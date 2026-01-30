---
title: "Managing 275 thousand pages and 8 million assets at top speed with ISR"
source: "https://vercel.com/blog/managing-275-thousand-pages-and-8-million-assets-with-isr"
publishedDate: "2024-09-17"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

3 min read

Sep 17, 2024

How digital agency Americaneagle.com helped Mecum Auctions transform their digital presence with over 120M annual page views.

As the world’s leading in-person car auction enterprise, [Mecum Auction Company](https://www.mecum.com/) has sold some of the most famous vehicles in the world. And while their digital platform had capably evolved over the years, it was hitting its limit, hindering their ability to create listings quickly. With the help of digital agency [Americaneagle.com](https://www.americaneagle.com/), Mecum adopted a new, composable stack—giving them confidence that their website would be fast, performant, and reliable.  

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F65hmD3YGyygOTaApl5dERW%2F7568af029664501c6f5a9bccf2b3a2d2%2FCleanShot_2024-07-24_at_14.00.54.png&w=1920&q=75)

### [Link to heading](#the-need-for-scalability,-speed,-and-more)**The need for scalability, speed, and more**

The Mecum ecosystem manages the auction process on a massive scale, especially during their two-day auction events held twice a year. The inventory includes 8 million assets—ranging from cars to trucks—spread across 275,000 individual listing pages or "lots", with hundreds of updates made daily, attracting over 120 million views annually.

Overall, Mecum set out to redesign their entire digital platform so that it would enable their teams to automatically generate pages, update and create content without the help of IT, and provide faster digital experiences for their end users.  

### [Link to heading](#the-solutions-that-make-up-the-architecture)**The solutions that make up the architecture**

Americaneagle.com designed an architecture that would scale and grow with Mecum, while delivering speed and performance. Going headless allowed the team to keep the foundational layers of their system the same, while creating a composable layer that would deliver the flexibility and user experience the team required.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3RnbyHQUGYRP028Zl8tLrq%2F84a99ca0b4332c52453881ccbc2d6e8e%2F1920w_x_vh.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FT1waiQ6cBthisrzQ4jRBy%2Fc54fec572b9dad0b3f38e5a9a90c0569%2F1920w_x_vh-1.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6I7PMy3Q2MXzokOzAp2X95%2Fff7091ebb55edfc7e88d1af73f4e2297%2F414w_x_vh.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F754In8ZoHzDMRSKYO614K0%2F6faf26f57503c94e12f31f97a5e61bb6%2F414w_x_vh-1.png&w=1920&q=75)

**Dataflow and content management:** The architecture begins with Salesforce as the primary data source. It pushes data into both WordPress and Algolia, creating a foundation for content management and search capabilities.

-   Algolia powers the search experience and provides intelligent recommendations for lots, enhancing user engagement and discovery.
    
-   WordPress serves as the central Content Management System (CMS), handling both marketing content pages and enrichment for individual lot pages. This allows Mecum's marketing team to create and manage content efficiently without IT intervention.
    
-   Marketing teams can independently launch new content and campaigns much quicker.  
    There is no need to leave the CMS environment, streamlining the content creation process and bringing flexibility to update and create content without additional support.  
    

**Vercel and Incremental Static Regeneration (ISR):** At the heart of Mecum's content velocity strategy is Vercel's Frontend Cloud, which serves all pages and implements ISR for lot pages.

-   ISR is central to Mecum's content strategy. Instead of pre-generating all 275,000 lot pages (which would be time-consuming and resource-intensive), pages are generated on-demand as users request them.
    
-   Once a lot page is generated, it's cached and served to subsequent users without regeneration, improving performance and reducing server load.
    
-   ISR allows for setting a revalidation period, after which the next request triggers a background regeneration of the page. This ensures that car information stays up-to-date without affecting the user experience.
    

The team chose WordPress as their CMS for its flexibility and content creation experience, and because WordPress [integrates well with Vercel](https://vercel.com/guides/wordpress-with-vercel). After crafting a design strategy within WordPress to efficiently use pre-structured components, their marketing team can choose from more than 50 custom components to build a variety of page layouts. Now, they can independently launch new content and campaigns much quicker without leaving the CMS.  

> Our new website represents the next step in the digital transformation for Mecum. Mecum.com is an ever growing digital platform where we craft an incredible digital experience for our users. We are incredibly excited to see our digital experience continue to develop in the coming years.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3HnlEKKBxc6dbNZIPwLvwR/ba4c2fe3e5b1b305fc7cf23fb6b13ac7/Cade_Cannon.jpeg)
> 
> **Cade Canon,** Director of IT at Mecum Auctions

By redesigning their digital platform, Mecum has significantly improved in how they manage and deliver content. Vercel's Frontend Cloud allows their teams to create and update content without relying on IT support, allowing them to focus on making the best auction experience possible for buyers.

Mecum's new digital platform shows how strategic technology choices can drive efficiency and scalability, while prioritizing the best user experience.

[

**Take the first step towards modernizing your tech stack**

Talk to an expert to learn how you can make your website faster and more reliable on Vercel.

Contact Sales



](https://vercel.com/contact/sales)