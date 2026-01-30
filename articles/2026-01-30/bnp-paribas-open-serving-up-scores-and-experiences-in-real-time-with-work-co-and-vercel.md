---
title: "BNP Paribas Open: Serving up scores and experiences in real time with Work & Co and Vercel"
source: "https://vercel.com/blog/bnp-paribas-open-serving-up-scores-and-experiences-in-real-time-with-work"
publishedDate: "2024-10-22"
category: "frontend"
feedName: "Vercel"
author: "Alina Weinstein"
---

5 min read

Oct 22, 2024

#### 83,000 new user accounts

Between the launch and tournament's end

#### Real-time tracking

For their fanbase of millions

[Talk to an Expert](https://vercel.com/contact/sales)

The prestigious BNP Paribas Open, held annually in Indian Wells, California, attracts top tennis talent and a global audience. To match its world-class status, the tournament required a significant digital upgrade, enabling dynamic, real-time tracking and engagement with hundreds of players for their fanbase of millions.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5Kb01SBZJfZHUQQuRVtaPx%2F49b04509ca863bf668cf513de955004f%2FBNP-PR-01-Hero__2_.png&w=1920&q=75)

Real-time updates with the new, unified website and mobile app experience.

## [Link to heading](#setting-the-stage)**Setting the stage**

The BNP Paribas Open hadn’t seen a digital refresh since 2018 and the marketing team recognized that it was time for a transformation.

"Our website and mobile app were operating on separate CMS platforms, which created significant challenges in maintaining consistency across our digital touch points," recalled Philippe Dore, CMO, BNP Paribas Open. As the expectations of guests evolved, an off-the-shelf solution could not deliver the premium, customized experience needed.

Launched in summer 2023 during the tournament's annual platform review, this ambitious project involved various stakeholders, including marketing and executive leaders, tournament sponsors, ATP/WTA Tour officials, and key partners like AXS Ticketing. The project began in the summer of 2023 as part of the event’s annual review of all tournament marketing platforms and materials.

## [Link to heading](#partnering-for-success)**Partnering for success**

The search for the right digital design and technology partner led the BNP Paribas Open team to [Work & Co](https://work.co/), the globally renowned leader for digital products and experiences. The company’s track record with partners like Apple, Gatorade, and especially its work with the PGA TOUR, really caught their attention as they needed a partner who understood the nuances of working with a sport that has quick-moving live scores and hundreds of players to keep track of digitally.

Work & Co began conversations with the BNP Paribas Open team in June 2023, with development officially kicking off a couple months later. The goal was ambitious: Within four months, launch a new website and mobile apps for iOS and Android by mid-February, just weeks before the tournament in early March.

## [Link to heading](#challenges-with-existing-platform)**Challenges with existing platform**

The BNP Paribas Open team faced several critical challenges with their digital platforms:

-   **Real-time updates:** The system needed to be capable of delivering up-to-the-minute scores, schedules, and player information—essential for engaging tennis fans
    
-   **Inflexibility:** Off-the-shelf systems (WordPress for the website and a white-labeled solution for the mobile app) lacked custom functionality beyond the typical blog paradigm
    
-   **SEO challenges:** Limited customization hindered SEO, impacting both internal site search and external search engine visibility
    
-   **Slow content time to market**: Content creation relied on a network of custom WordPress taxonomies and was disconnected from the independently managed mobile app content, slowing down the publishing process
    
-   **Personalization limitations:** The BNP Paribas Open, known as "Tennis Paradise," strives to provide exclusive, behind-the-scenes access. However, the disparate platforms prevented unified user profiles and personalized experiences, fragmenting user journeys and leaving missed opportunities for deeper fan engagement and data-driven decision making
    

## [Link to heading](#enter-vercel)**Enter Vercel**

![Open](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2vNMcX6pzo4OlHg6a2IY1l%2Fc6d943c9fef2c3b7d9f6bb1a2560e0c1%2FBNP-PR-04-Web__3_.png&w=1920&q=75)

Between the February launch and the tournament's end, 83,000 new user accounts were created. The new architecture was able to handle millions of users.

Work & Co chose Vercel to power the BNP Paribas Open's frontend transformation for several reasons.

### [Link to heading](#scalability-and-performance)**Scalability and performance**

Scalability was a critical concern for the BNP Paribas Open, needing a platform that could effortlessly handle the explosive surge in demand from the off-season lull to millions of users during the tournament.

During the tournament, both the website and app need to provide real-time match scores to millions of fans while maintaining uptime and performance. Vercel's serverless functions and flexible edge network delivered a consistent, real-time experience to users worldwide, even at a [heavy peak load](https://vercel.com/blog/the-resiliency-of-the-frontend-cloud).

### [Link to heading](#rapid-development-and-deployment)**Rapid development and deployment**

With a tight four month timeline to deliver new digital experiences for both web and mobile, the team needed a solution that would allow them to focus on development without getting bogged down by deployment or infrastructure issues. Vercel provided this efficiency, enabling the team to focus on what mattered: their web and mobile apps.

### [Link to heading](#flexible-deployment-process)**Flexible deployment process**

Launching a new platform to a large audience inevitably involves challenges, like feature rollouts or bugs. Vercel’s deployment process made it easy to quickly promote or roll back deployments as needed. This capability allowed the team to address issues within minutes of discovering them, ensuring minimal disruption to users.

### [Link to heading](#integrated-ecosystem)**Integrated ecosystem**

Having CDN, static pages, dynamic functions, data, and CI/CD all on one platform proved efficient and saved considerable development time. Vercel's integrated storage solutions, such as Redis and Supabase, provided a significant advantage as the team didn't have to spend resources on extra database management outside of Vercel.

### [Link to heading](#simplified-vendor-management)**Simplified vendor management**

From a procurement and invoicing perspective, using Vercel as a single vendor for multiple services (CDN, database hosting, etc.) simplified contracts, billing, and vendor management, reducing onboarding and overhead costs. This consolidation streamlined the administrative aspects of the project, allowing the team to focus more on development and less on managing multiple service providers.

> Vercel was integral to the replatforming strategy from day one. We knew that, to deliver the caliber of experience guests expected in the timeframe we had, we needed a platform that could seamlessly handle the complexities of scalability, deployment agility, and real-time performance, all while allowing us to focus entirely on building the best possible digital experiences.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5obPzpdCoGrObQQq1TIWr8/9b3719d7ab2de4e9c9cede986ed8b757/Nick_Lee__Work___Co.jpeg)
> 
> **Nick Lee,** Technology Partner - Work & Co

## [Link to heading](#loving-the-results-with-next.js-and-vercel)**Loving the results with Next.js and Vercel**

By choosing Vercel, the BNP Paribas Open team was able to create a scalable, high-performance digital platform that could handle the demands of a world-class tennis tournament and provide an exceptional user experience for fans around the globe.

Between the February launch and the tournament's end, 83,000 new user accounts were created with significant improvements in page load times and user engagement across all devices. The new architecture proved its scalability, handling millions of users and unexpected traffic surges, like the memorable [bee incident](https://bnpparibasopen.com/news/the-hero-of-tennis-paradise-local-beekeeper-indian-wells) on court.

SEO saw a boost thanks to server-side rendering, leading to better indexing and higher search rankings. Personalized content experiences allowed fans to filter content by favorite players, while unified content delivery across web and mobile streamlined content management, enabling the editorial team to create SEO-friendly pages easily.

> The ability for fans to filter content by their favorite players and create a personalized experience was a huge win for us. It really bridged the gap between our brand and our fans.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3MFOus83wD8P84ILv4jnxa/cc557489047b6d6957304e2d7b298589/Philippe_Dore.jpeg)
> 
> **Philippe Dore,** CMO - BNP Paribas Open

## [Link to heading](#advice-to-cmo’s-&-cdo’s)**Advice to CMO’s & CDO’s**

Reflecting on the project, Philippe Dore offered advice for other CMOs and CDOs considering a digital transformation:

-   **“Embrace personalization”:** Fans demand curated, personalized content. Invest in the infrastructure to deliver truly individual user experiences that keep them coming back
    
-   **“If you build it, they will come”:** We stuck to our belief in embracing this personalized experience and prioritized making it easy for fans to create an account. The results were successful and our fans embraced this in return, with nearly half of users across our digital properties opting to create an account
    
-   **“Test, test, test”:** With such intricate live scoring mechanisms and pulling together a variety of different content streams, we knew that testing was going to be critical before launch. Testing began early on during the build process where applicable to ensure we had accounted for as many bugs as possible by the time launch rolled around
    
-   **“Be ready to evolve”:** Launch is just the start. Have an action plan to gather feedback after launch so you inform changes and improvements in the future
    

The BNP Paribas Open’s digital transformation, powered by [Next.js on Vercel](https://vercel.com/frameworks/nextjs), has set a new standard for fan engagement in tennis. By integrating cutting-edge technology and focusing on personalization, the tournament delivered a high-performance platform that enhances both on-site and global audience experiences. This transformation demonstrates how strategic tech investments can create immersive, tailored experiences that drive long-term engagement with modern fans.  

[

**No matter the traffic.**

Our experts will analyze your specific use case and ensure that Vercel keeps your site available to your users in every circumstance.

Contact Us



](https://vercel.com/contact/sales)