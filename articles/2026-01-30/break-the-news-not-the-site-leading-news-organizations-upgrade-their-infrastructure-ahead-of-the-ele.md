---
title: "Break the news, not the site: Leading news organizations upgrade their infrastructure ahead of the election"
source: "https://vercel.com/blog/break-the-news-not-the-site"
publishedDate: "2024-10-31"
category: "frontend"
feedName: "Vercel"
author: "Alina Weinstein"
---

4 min read

Oct 31, 2024

Performance at the speed of the news, powered by Code and Theory and Vercel

When major political developments unfold, millions rush to news websites, putting immense pressure on digital infrastructure. With global audiences, slow-loading websites or crashes during a major event can be catastrophic for a news organization.

[Code and Theory](https://www.codeandtheory.com/) has digitally transformed more than 200 newsrooms. As a leading technology and creative agency, Code and Theory has over 20 years of helping Fortune 500 clients including JPMorganChase, Pfizer, NFL, NBC, MARS, and more, navigate the complexities of modern web development.

For them, [Next.js](https://nextjs.org/) is the go-to framework for building best-in-class web experiences, especially when building high-stakes platforms. Relying on Vercel’s managed platform means Code and Theory’s clients don’t have to worry about infrastructure when traffic surges. Instead, they get high uptime, security, and the flexibility to scale without investing in dedicated DevOps.

> The brand is not just a single touchpoint - it's the sum of every interaction. If the website is slow and clunky, it can really tarnish their perception of the brand.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2Exx8dd8T6wcZkAGkwl9Ni/4cb9520a3e91ea4bb458280731386a1a/David_DiCamillo.jpeg)
> 
> **David DiCamillo,** CTO - Code and Theory

Let's explore how two leading media organizations leverage Vercel to transform their digital presence and meet the demands of today's fast-paced news environment.

## [Link to heading](#realclearpolitics-)**RealClearPolitics**

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2vT3SdQyBUDwwrCsNmruOb%2F874c87cb61f4969f6335f3ae575cb150%2FScreenshot_2024-11-07_at_1.27.51_PM.png&w=1920&q=75)

RealClearPolling visualizes politics for engaged discourse, helping the general public to get better informed on how the polling shifts leading into the election.

**Challenge:** After Code and Theory designed and developed RealClearPolitics' digital experience, the agency split the polling data off into a stand-alone site called [RealClearPolling](https://www.realclearpolling.com/). RealClearPolling faced significant challenges with legacy infrastructure; its custom-built PHP CMS led to performance issues, complicated content updates, and risky deployments. Also, managing their AWS infrastructure had become increasingly overwhelming for their developers.

**Solution:** Code and Theory migrated RealClearPolling to a modern tech stack, including Contentful for content management and Next.js for the frontend—all served on Vercel's infrastructure. [Git based workflows](https://vercel.com/docs/deployments/git) streamline deployments, significantly enhancing the development process.

**Results:** The new website boasts improved performance, easier content management, and a simplified deployment process.

-   **Content presentation:** Interactive charts and graphs made aggregated data easier to understand and load quickly thanks to Next.js caching
    
-   **Faster time to market:** The entire migration was completed in just three months, showcasing the speed and agility of Vercel's platform
    
-   **Future migrations**: The success of this project sparked a "lightbulb moment" for RealClearPolitics, wanting to leverage Next.js and Vercel across their entire portfolio
    

## [Link to heading](#minnesota-star-tribune)**Minnesota Star Tribune**

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1o2Cyvqq0GGId7HkYuXVmd%2F7c145ad6ee73dfdab41cbaefb9ea4b7c%2FOverview_Star_Trib.png&w=1920&q=75)

A leading news organization, first published 157 years ago, recently modernized their digital presence with a Vercel-powered website relaunch.

**Challenge:** Facing a tight deadline, the [Minnesota Star Tribune](https://www.startribune.com/) was looking to modernize their PHP and AWS-based stack, which was expensive and difficult to manage. They also had separate mobile and desktop sites, which resulted in managing two completely separate codebases and was negatively impacting their SEO. Additionally, they wanted to reduce their infrastructure costs and their reliance on DevOps resources.

**Solution:** The Minnesota Star Tribune partnered with Code and Theory to modernize their platform using Next.js and Vercel. This move consolidated their web and mobile codebases, enabling faster deployments and provided cleaner content restructuring through Vercel's redirects. Vercel's [preview deployments](https://vercel.com/products/previews) streamlined the Minnesota Star Tribune's development, fostering collaboration and iterative design, especially for complex graphic elements. The result was a fully responsive site with easier news navigation and a seamless cross-device experience.

**Results:** The update delivered a visually striking homepage with optimized story hierarchy and an enhanced photojournalism showcase. With the reimagined breaking news experience, they saw faster loading times across desktop and mobile, and improved accessibility for all users.

-   **Impressive conversion boost**: Reaching 30-50% of their monthly new subscriber goal within 24 hours of launch
    
-   **Repurposing of DevOps resources:** Reducing web DevOps from three people to one person, and shifting resources to other priority projects
    
-   **Trusted availability**: Handling a major traffic spike during the VP pick announcement without even a blip on load times
    
-   **Improved Core Web Vitals**: Significantly improving by 30%, with scores now ranging in the 80s-90s out of 100
    

## [Link to heading](#key-benefits-of-next.js-and-vercel-for-news-organizations)Key benefits of Next.js and Vercel for news organizations

Code and Theory prioritizes website performance and security as a top concern in every project, recognizing its impact on brand reputation. Leveraging Next.js and Vercel helps ensure that no matter the traffic surge (time, day, size, expected, or unexpected), readers will experience enhanced performance, accessing critical information instantly, without worrying about undifferentiated infrastructure.

-   **Speed:** Vercel's global edge network and built-in optimizations deliver lightning-fast website speeds, ensuring readers get the information they need instantly
    
-   [**Incremental Static Regeneration (ISR)**](https://vercel.com/blog/isr-a-flexible-way-to-cache-dynamic-content)**:** Allows for updating static content without rebuilding the entire site—perfect for sites that need to frequently update content without compromising on performance
    
-   **Automatic static optimization:** Next.js automatically determines which pages can be static and which need server-side rendering, crucial for sites that have a mix of static content (like evergreen articles) and dynamic content (like breaking news)
    
-   **Effortless scalability:** Vercel automatically scales to handle any traffic load, guaranteeing a smooth user experience even during peak demand
    
-   **Reliability:** Vercel's serverless infrastructure eliminates the risk of downtime, ensuring news organizations can always reach their audience
    

> We have invested in creating an accelerator on Vercel’s Next.js as we have found the cycle time we are able to achieve in creating and iterating new features is a distinct advantage as compared to other software and platform combinations. I’ve never seen a company like Vercel that is so action-oriented and focused on helping product organizations ship features faster and allowing any organization to do more with less.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4Jn5iEMxjYB7efCzX1Y3pz/1bd8abdc366109329b77e911dc5bff88/Kenton-3.jpg)
> 
> **Kenton Jacobsen,** Head of Engineering - Code and Theory

In the relentless race to break news, Code and Theory and Vercel are transforming news websites into digital platforms that withstand massive traffic surges, deliver instant loading times, and provide a highly-available experience. For RealClearPolitics and the Minnesota Star Tribune, the result is a more responsive, resilient, and reader-focused news ecosystem that allows them to better serve their audience and handle the demands of the election.

[

**Looking to upgrade your infrastructure?**

Connect with a Next.js expert and learn about Vercel's best-in-class tooling for site performance and org-wide collaboration.

Contact us



](https://vercel.com/contact)