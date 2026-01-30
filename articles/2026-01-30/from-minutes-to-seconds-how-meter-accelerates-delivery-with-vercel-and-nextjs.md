---
title: "From minutes to seconds: How Meter accelerates delivery with Vercel and Next.js"
source: "https://vercel.com/blog/from-minutes-to-seconds-how-meter-accelerates-delivery-with-vercel-and-next"
publishedDate: "2024-11-26"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

2 min read

Nov 26, 2024

From complex deployments to streamlined workflows, learn how Meter builds with rapid innovation.

[Meter](https://www.meter.com/) provides a full-stack networking solution that makes it easy for any business, organization, or school—of any size—to get access to the internet. They have two application layers built on top of their vertically integrated technical architecture: Meter [Command](https://www.meter.com/command), a generative UI for IT and Networking teams, and Meter [Dashboard](https://www.meter.com/dashboard), their main web interface. Meter’s adoption of Vercel has enhanced performance, simplified workflows, and empowered their team to iterate rapidly—not only across Command and Dashboard, but throughout their interconnected stack of hardware, software, and operations.

## [Link to heading](#choosing-vercel-for-speed-and-integrations)Choosing Vercel for speed and integrations

Prior to migrating, Meter’s Dashboard product was hosted through various AWS solutions, with long build times and limited visibility into changes. When evaluating options, Meter's team prioritized fast iteration, speed of deployment, and the seamless integration that Vercel provides for both frontend and backend processes.

![Meter's web application, an intuitive dashboard for network management, hosted on Vercel.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fac8MYoFRAptK7U60G2Fqy%2Fce2dfe48a1c4eba5b341b01b830859f3%2Fmeter-dashboard-firewall.png&w=1920&q=75)

Meter's web application, an intuitive dashboard for network management, hosted on Vercel.

### [Link to heading](#monorepo-management-made-easier)Monorepo management made easier

The team implemented a two-phase migration of Dashboard to Vercel, first transferring over core components and then integrating additional features. Challenges such as managing remote caching and consolidating to a monorepo were handled with Vercel’s support for React, Vite builds, and [previews for every feature branch](https://vercel.com/docs/deployments/preview-deployments).

Today, all of Meter's deployed assets live in a unified repository, enabling easier code management and collaboration across teams. Improved build times—**down from over 10 minutes to less than a minute**—and Vercel’s [flexible rollback capabilities](https://vercel.com/docs/deployments/instant-rollback#performing-an-instant-rollback-on-a-deployment) have increased the reliability and scalability of their deployments.

![Command's current tech stack and architecture.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6zzNXNDZJxZxYyZo9xvNHl%2Ffb3cc8f5a3a208576cb0e183c0b0fb66%2Fmeter_architecture_diagram_light_mode.png&w=1920&q=75)![Command's current tech stack and architecture.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3yAdekAqVfHntnbF7tiMRW%2F0a0d72663ece0e8d3c329e1fcda5a95d%2Fmeter_architecture_diagram_dark_mode.png&w=1920&q=75)

Command's current tech stack and architecture.

### [Link to heading](#moving-and-shipping-faster)Moving and shipping faster

Since the Dashboard migration, the team has noted substantial benefits in CI/CD iteration speed, which helps them quickly push and review code in a production-like environment. Vercel's integrated [git workflow](https://vercel.com/docs/deployments/git) allows for daily production pushes, enabling faster feature releases and reduced need for manual QA.

Meter built Command, on Next.js and Vercel. Command enables Meter users to get information about their networks, take action, and create custom, real-time software—all in natural language and at the speed of a web search.

Vercel and Next.js allow for rapid iteration on the frontend and easily sync with the backend data processing that powers these interactions via Next.js' [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes). The engineering team can focus on refining the model architecture that powers the product’s backend without worrying about underlying infrastructure details.

The ability to push changes quickly, view updates immediately on their dev site, and iterate efficiently has been transformative for the team working on Command. Vercel ensures that Command remains performant by maintaining a clear separation between client-side and server-side logic, while still allowing seamless communication between the two.

## [Link to heading](#get-started-with-vercel)Get started with Vercel

Meter’s engineering team has observed a marked increase in performance, scalability, and user experience. With every feature branch previewed and reviewed before going live, the team has found a reliable process for maintaining high standards across their products.

As Meter continues to refine its vertically integrated hardware, firmware, and software stack, the streamlined workflow and increased speed on Vercel will enable them to deliver even more powerful products to their customers and partners.

[

**Looking to upgrade your infrastructure?**

Connect with a Next.js expert and learn about Vercel's best-in-class tooling for site performance and org-wide collaboration.

Contact us



](https://vercel.com/contact)