---
title: "From CDNs to Frontend Clouds"
source: "https://vercel.com/blog/from-cdns-to-frontend-clouds"
publishedDate: "2024-09-20"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

7 min read

Sep 20, 2024

How UX demands and DIY infrastructure headaches shaped the next generation of web application delivery

Web apps today are judged on six core principles: **speed**, **global presence**, **scalability**, **dynamism**, **reliability**, and **security**. Users and businesses now expect excellence in all six categories, making them non-negotiable.

As user experiences have become more engaging and dynamic, the limitations of Content Delivery Networks (CDNs) and Infrastructure as Code (IaC)—once the industry standards for application delivery—are becoming increasingly apparent.

CDNs, designed for static content, fail to meet the demands of modern, interactive and real-time web applications. At the same time, while IaC enables programmatic management, its use for web applications often leads to building undifferentiated tooling and systems rather than dedicating those resources to more bespoke, complex infrastructure challenges.

These technologies have not kept pace with the evolving web, leading to an emerging and compelling solution: [frontend clouds](https://vercel.com/blog/the-foundations-of-the-frontend-cloud) that abstract away complex infrastructure, enabling next-generation content, experiences, and application delivery. This shift allows developers to focus on what truly matters—innovating to enhance web applications, drive business value, and delight users.

## [Link to heading](#from-a-static-to-dynamic-web)**From a static to dynamic web**

When we first started putting our businesses online, the web was a set of static brochures. We didn't have interactivity or complex routing logic, content wasn't frequently updated, and sites were controlled by a single person—the webmaster.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2df8ImMpHoFF6tTmOsKf79%2F7cb86ba9da390a80cb4256f3215e8458%2FFrame_32.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5JZL0qIe7Wbja2kzC2hZx4%2F803adc64d0ac385501b78912e2438175%2FFrame_31.png&w=1920&q=75)

With the rise of JavaScript, along with tools like jQuery to simplify it and AJAX for browser-to-backend communication, the web became more dynamic and complex, and the webmaster role split into two distinct positions: one focused on user experiences and the other on systems infrastructure.

﻿Later, as sites became true digital storefronts and interactive marketplaces, frameworks like Django, Laravel, and Ruby on Rails streamlined development but required more understanding of server-side concepts. Once again, functionalities split. We saw the rise of _frontend_ and _backend_ specialities, and organizations had to staff these roles as well as the connective tissue between them (e.g. DevOps).

The growth and efficacy of traditional CDNs, which became the industry standard for static sites and assets, leveled off as web_sites_ evolved into dynamic web _apps_. While still vital for static content, they struggled with frequently updated, real-time, and dynamic data. The tools for managing and delivering web applications lagged behind the growing demands of the frontend.

For dynamic web apps using server-side rendering (SSR) and databases, developers often rely on CDNs and set high `Cache-Control TTLs` for faster delivery. However, this leads to caching entire groups of pages, requiring frequent data changes to be handled through slow and unreliable purges, leading to inconsistent content—users may see outdated information or miss their own updates. Even with advanced settings like Vary headers and surrogate keys, the cache remains too static, causing high cache misses.

Local development with CDNs can also be challenging, as it can't be run on localhost. This makes it difficult to fully preview and test cache-control strategies, such as how assets are cached and invalidated globally. Without a staging or preview environment that mirrors real-world CDN behavior, developers can encounter the same issues described earlier—stale content, cache misses, or incorrect purging once the app is deployed. This lack of control over real-time caching strategies further complicates delivering dynamic content efficiently.

Certain features—such as cache invalidation, CDN routing, or techniques like ESI (Edge Side Includes)—cannot be fully replicated locally. This limitation means that testing and previewing cache behavior must be done in a real environment (like a preview deployment), where the CDN's edge infrastructure is active. Without this, critical performance features won’t reproduce correctly in local environments. This leaves developers unable to manage or test these optimizations, which often live in the purview of another team. As a result, CDNs can feel like a form of "shipping the org chart," creating friction between development and infrastructure operations.

As a result, developers often turn to client-side solutions to handle personalization, real-time updates, and experimentation. By offloading these tasks to the client, the burden shifts to the user's device, which can lead to slower pages, layout shifts, and performance issues—especially on slower networks. In many cases, the server could have handled these dynamic elements more effectively, providing a faster and more consistent experience without shifting these tasks to the client.

Overall, despite aiming to create the best user experiences and deliver business value, companies often spend significant time and money on undifferentiated technology and infrastructure. Web application requirements introduced recurring challenges, including complex yet repetitive Infrastructure as Code (IaC) and associated steep learning curves, security concerns, and cost control. These issues led to duplicated efforts across the industry, leaving fewer resources to drive innovations that help businesses realize their goals and delight users.

### [Link to heading](#meta-frameworks-and-the-frontend-engineer-comeback)Meta-frameworks and the frontend engineer comeback

JavaScript's (and its increasingly popular alternative, TypeScript's) capabilities continued to expand significantly—with tools like Node.js and React—giving rise to meta-frameworks like Next.js, Astro, Nuxt, SvelteKit, Remix, Vite, Gatsby and others. These advancements allow frontend developers to fully embrace full-stack development with features such as server-side rendering, static site generation, API routes, file-based routing, built-in CSS support, and more. Combined with a large community and ecosystem, these tools give developers the ability to efficiently manage both frontend and backend development, enhancing their control over the entire application stack.

Tasks that once separated roles due to complexity became simpler, allowing frontend and backend responsibilities to merge back into a single but far more versatile frontend engineer role. These engineers, fluent in JavaScript and no longer constrained by the need to master multiple language, now managed a larger portion of the application stack without compromising quality or speed. This shift led to development teams with greater efficiency, faster iteration cycles, and more cohesive end-to-end user experiences.

## [Link to heading](#the-core-principles-of-application-delivery)**The core principles of application delivery**

One crucial piece of the puzzle remained: infrastructure.

While developers embraced modern frameworks and a full-stack approach, the infrastructure needed to support these applications often remained slow, complex, and fragmented.

A silver lining through this period of intense investment in infrastructure was the development of key principles for application delivery. These principles, shaped by shared challenges and goals, were universally recognized by developers, infrastructure teams, and business leaders as essential for optimal user experiences and application delivery excellence:

-   **Fast:** Applications must load quickly and respond to interactions instantaneously for globally dispersed users. This requires optimized and intelligent code, data handling, caching strategies, and distributed infrastructure.
    
-   **Global**: Applications must be physically close to users worldwide to ensure minimal latency and maximum performance for all regions. This requires distributed infrastructure that leverages edge networks and nearby data centers.
    
-   **Scalable:** As user bases grow, applications must handle increased traffic without compromising performance. This means scalable infrastructure that can adapt to fluctuating demands.
    
-   **Dynamic:** Content should be fresh, engaging, and personalized for each user, whether dynamically updated or efficiently delivered as static content. This requires leveraging real-time data where applicable, implementing smart caching and revalidation strategies, and employing dynamic rendering techniques.
    
-   **Reliable:** Downtime is unacceptable. Users and businesses expect applications to be available and responsive 24/7. This demands robust infrastructure, fault-tolerant systems, and proactive monitoring.
    
-   **Secure:** Protecting user data and corporate IP is paramount. Applications and their underlying infrastructure must be built with comprehensive security measures to safeguard sensitive information at every level.
    

Together, these core principles help organizations achieve **exceptional user experiences, unparalleled application performance, and a resilient foundation for future growth.**

Despite substantial resources for each team, the complex interplay of frontend, backend, and infrastructure development made consistently achieving any or all of the six principles challenging, costly, complex, and sometimes seemingly impossible to implement.

## [Link to heading](#frontend-clouds-and-framework-defined-infrastructure)**Frontend clouds and framework-defined infrastructure**

Frontend developers needed solutions to simplify deployments and manage infrastructure more easily, leading to the rise of _frontend clouds_. These platforms streamlined tooling and simplified deployment architectures, empowering developers to own end-to-end user experiences without the burdens and headaches of infrastructure.

Vercel's frontend cloud, for example, uses Framework Defined Infrastructure to generate and manage infrastructure outputs without any developer intervention. This abstraction frees developers from infrastructure concerns, allowing them to focus on innovation, differentiated user experiences, and **for the first time, consistently achieve all six core principles of application delivery: speed, global presence, scalability, dynamism, reliability, and security.**

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6hSduWtDZdWduClIEsuvlR%2Fe8e6f650c3e9b1e23c3058715480880f%2FFrame_30.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2s3XbjPgBx1pXAvwAGHoGf%2Fde838ed6cbc4b717e1a7703a3bed037d%2FFrame_29.png&w=1920&q=75)

This desire to bridge the frontend-backend gap, fueled by JavaScript's full-stack capabilities and technologies like Vercel's [framework-defined infrastructure](https://vercel.com/blog/framework-defined-infrastructure), requires deep integration of developer tools.

Modern frontend frameworks integrated with frontend clouds blur the lines between development and infrastructure. Developers now indirectly define the underlying architecture by writing framework code. Code-level optimizations translate into infrastructure-level enhancements, eliminating the need for manual configuration or deep infrastructure expertise. Optimal performance becomes the new standard, achieved by default.

Frontend frameworks and their required infrastructure now evolve in lockstep, seamlessly integrating the latest innovations while simplifying developer experiences. This allows organizations to focus on what matters most: crafting exceptional user experiences and delivering unparalleled business value.

Frontend clouds address the previously mentioned limitations of traditional CDNs by integrating caching strategies and performance optimizations directly into the developer’s workflow. This ensures that behaviors—such as cache invalidation, routing, and dynamic content handling—are accurately tested in both development and preview environments, overcoming the disconnect between local testing and real-world performance.

By reducing the risks of inconsistent behavior and improving the developer experience (DX), frontend clouds streamline the deployment process. When issues arise, Vercel’s instant rollback ensures a smooth return to a previously known good state through atomic rollbacks, providing precise control and minimizing disruption across the deployment.

![Over time, frontend and backend roles diverged and resources became distributed, but with frontend clouds managing infrastructure, engineers can focus on core differentiation while delivering exceptional applications.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2NkVW0OA6UhiMxG36iijQm%2Fbf699fb9ec0fc82b673ff567f3ed0556%2FApp_Del_Light.png&w=1920&q=75)![Over time, frontend and backend roles diverged and resources became distributed, but with frontend clouds managing infrastructure, engineers can focus on core differentiation while delivering exceptional applications.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F774EcWe3BxejLrlU6VSoUR%2Fc9f121232cc6f60a55aed77c0d4170d0%2FApp_Del_Dark.png&w=1920&q=75)

Over time, frontend and backend roles diverged and resources became distributed, but with frontend clouds managing infrastructure, engineers can focus on core differentiation while delivering exceptional applications.

### [Link to heading](#leading-the-charge-redefining-application-delivery)**Leading the charge redefining application delivery**

For years, the six core principles of exceptional application delivery—scalability, security, performance, dynamism, global presence, and reliability—felt like a moving target. Developers understood their importance, but achieving all six simultaneously often felt like a zero-sum game. Compromises were made, sacrifices accepted, and the full potential of the web remained tantalizingly out of reach.

Frontend cloud technology is transforming businesses of all sizes, from startups to global enterprises. By building on decades of technological advancements—from CDNs to cloud infrastructure—Vercel simplifies and enhances these foundations, ensuring they are ready for the present and future.

Managing infrastructure—like serverless functions, edge caching, automatic scaling, and security measures such as Vercel Firewall—and adapting to emerging rendering strategies like Partial Pre-Rendering in Next.js and Server Islands in Astro ensures continuous evolution while upholding the core principles.

With Vercel, developers don't choose between these principles; they achieve them all, simultaneously, through the simplicity of framework code. The code that brings their frontend vision to life also dictates the infrastructure that powers it. This is how Vercel is reshaping the landscape of application delivery, enabling experiences that were once unimaginable to become the new standard.