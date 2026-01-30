---
title: "WordPress monolith to Vercel: How Personio elevated site performance and efficiency"
source: "https://vercel.com/blog/from-wordpress-monolith-to-vercel-personio-elevates-site-performance"
publishedDate: "2024-03-18"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

3 min read

Mar 18, 2024

Personio's transition to a headless architecture with Vercel + Next.js enhanced their website's UX.

As Europe's leading all-in-one HR solution for small and midsized organizations, [Personio](https://www.personio.com/) is committed to the highest standards of both user experience and application security.

By migrating their site from a monolithic WordPress implementation to a composable stack of Vercel, Next.js, and Contentful, they were able to significantly boost site performance while ensuring uptime and reliability.

## [Link to heading](#from-wordpress-to-composable)**From WordPress to composable**

Despite their web team's agility and quick turnaround time, limited developer resources and budget constraints impacted Personio's ability to innovate on their WordPress site for six years. The need for a more flexible stack was clear.

Through a selective evaluation process, Personio’s ultimate decision was simple: Contentful for their flexible CMS, and Next.js and Vercel as the powerful framework and platform behind it.

## [Link to heading](#increased-performance-and-traffic-gains)**Increased performance and traffic gains**

Over time, Personio accumulated massive tech debt and extra code by continuously building on and adding to their original WordPress theme. Though the team was still quick to deploy, site speed took a hit.

Mobile performance was particularly affected by persistent issues with [Cumulative Layout Shift (CLS)](https://vercel.com/docs/concepts/analytics/web-vitals#cumulative-layout-shift-cls). The switch to Vercel quickly addressed these problems and more.

After launching their Italian website in 2022, Personio saw a rapid increase in traffic. Their [Core Web Vitals](https://vercel.com/analytics)—and especially CLS—experienced a significant boost, **consistently seeing improvements of more than 90%**.

These enhancements were also observed across Personio’s five other domains. The team now benefits from real data on Core Web Vitals, offering a more effective, data-driven approach to their optimization strategy. Specifically on mobile, there was a **29% improvement in their Largest Contentful Paint (LCP) score**.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3PDs7DAugSDEzMPP859EoV%2F64da578ac0bc982b765369d3f21ae0fc%2Fpersonio_metrics.jpg&w=1920&q=75)

Since migrating their site to Vercel, Personio has received top marks and reviews for the increased speed and improved user experience. The platform's seamless background operation allows Personio's developers to concentrate on critical projects without the burden of managing infrastructure concerns.

> We have full confidence in our site on Vercel. We have roughly 100% uptime, and we’ve never experienced any outages. Deployments to production are very robust, and we haven’t seen any problems. Vercel is quite invisible, which is the best case scenario.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1YgaTzlgxjOMhBzsJIDHF4/a1a7f55e1a870c1fabd59ab8fcaadf5f/personio.png)
> 
> **Peter Rosell,** Senior Full Stack Engineer

## [Link to heading](#security-by-default-)Security by default 

As an HR company, Personio adheres to stringent security protocols. By integrating Next.js, Personio has significantly elevated their site security, with capabilities such as server-side rendering and static generation reducing exposure to vulnerabilities that client-rendered sites might face.

Additionally, Vercel's hosting environment enhances Personio's security with features like automatic HTTPS, end-to-end encryption for data in transit, and [robust DDoS protection](https://vercel.com/docs/security/ddos-mitigation) via global Edge Network.

This shift towards a more controlled and internally managed security framework allows Personio to tailor its security measures more closely to the unique requirements and risks of the HR industry. It marks a strategic move away from dependency on third-party security solutions, offering Personio increased agility in implementing and updating security protocols.

This not only strengthens their defense against potential cybersecurity threats, but also builds trust among users and clients who rely on Personio for the safe handling of their HR processes and data.

## [Link to heading](#a-better-developer-experience-)A better developer experience 

The transition to Vercel has also upgraded the developer experience within the team, streamlining internal processes and fostering a more collaborative environment. With [Vercel Preview Deployments](https://vercel.com/features/previews) and commenting functionality, developers can engage in real-time feedback and discussions directly in preview environments, ensuring a more integrated and efficient review process.

Furthermore, the headless architecture enabled by Vercel provides the development team with the flexibility to rapidly implement new features and updates. This move supports a more agile development strategy, allowing Personio to quickly adapt and innovate in the fast-evolving HR tech landscape, keeping their platform dynamic and on the cutting edge.

[

**Upgrade your workflow today**

Reach out to learn more about how you can improve your frontend workflow and empower your team to ship better web experiences with Vercel.

Contact Us



](https://vercel.com/contact/sales)