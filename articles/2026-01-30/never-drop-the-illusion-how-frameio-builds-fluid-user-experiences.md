---
title: "Never drop the illusion: How Frame.io builds fluid user experiences"
source: "https://vercel.com/blog/frameio-never-drop-the-illusion"
publishedDate: "2024-06-11"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

5 min read

Jun 11, 2024

Frame.io's users "see in milliseconds," so every interaction, animation, and frame within a user's web experience matters.

#### 6x faster

Preview builds & deployment

#### 4 million

Expected Frame.io v4 users

[Talk to an Expert](https://vercel.com/contact/sales)

When Hollywood giants and global brands collaborate on video, they demand a seamless, high-performing experience — and [Frame.io](https://frame.io/), an Adobe company, delivers.

Their users work with high-quality video content and operate on a different level of perception—they "see in milliseconds" and sweat the details. To meet the needs of their users, Frame.io commits itself to delivering web applications that feel as responsive and powerful as their desktop counterparts.

This vision led them to move away from the popular "make it work, make it right, make it fast" approach and find a solution that works for them and their users.

## [Link to heading](#seeing-in-milliseconds-required-a-new-approach)**Seeing in milliseconds required a new approach**

Seeing in milliseconds highlights the understanding that even the slightest delay or dropped frame can disrupt the creative flow for video pros.

This realization led Frame.io to embrace a new guiding principle: "How it feels = how it works." If the application doesn't feel good to use, it’s just as bad as when a feature isn’t functioning correctly.

> How it feels is as important as how it works. For us, performance is a feature. If it doesn’t feel good, it’s not working.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/svMvNREMxjZatP17esVXv/7da99c0ce4871f8057a903951636347d/1638570191257.jpeg)
> 
> **Charlton Roberts,** Senior Manager of Product Engineering at Frame.io

Frame.io refers to their approach to building performant UIs as "Fluid UI." Influenced by Apple’s [Designing Fluid Interfaces](https://developer.apple.com/videos/play/wwdc2018/803), Fluid UI rests on three core principles: instant, smooth, and coordinated.

-   **Instant:** The UI must respond to user input within 100ms, providing immediate feedback that their action has been registered. To achieve this, they leverage React features like `useState`, `useOptimistic`, and the Next.js Router Cache, while minimizing unnecessary re-renders with `useMemo` and `useCallback`
    
-   **Smooth:** All animations should run at a consistent 60 fps, mimicking the fluidity of natural motion and creating a visually pleasing experience. This involves utilizing React's `useTransition` Hook, opting for CSS-only solutions whenever possible, and building stable UI components that minimize DOM manipulation
    
-   **Coordinated:** UI elements should move in sync, creating a cohesive and intuitive flow. Transitions and animations should feel like a natural extension of the user's actions. This requires carefully orchestrating animations and transitions for related UI elements, ensuring they occur in sync and contribute to a cohesive user experience
    

To ensure these principles translate into a consistently smooth user experience, Frame.io adopted Next.js [App Router](https://nextjs.org/docs/app), and uses Vercel and their own platform to constantly monitor application performance.

Vercel's automatic [Preview Deployments](https://vercel.com/docs/deployments/preview-deployments) allow developers to evaluate the performance impact of code changes in a production-like environment, catching and addressing regressions early on. Previously, waiting for previews could take Frame.io up to 40 minutes. But Vercel significantly reduces this time by over 6x to around 6 minutes, enabling faster iteration cycles and quicker identification of potential issues.

[

**Build, deploy, and iterate—seamlessly.**

Traditional deployment tools weren’t built for frontend development. Get the DX Platform that has teams shipping 6x faster.

Learn More



](https://vercel.com/products/dx-platform)

The team at Frame.io believes in the power of dogfooding, so they use Frame.io to analyze and improve the performance of Frame.io itself. By uploading screen recordings and analyzing them frame by frame, they can pinpoint even the slightest performance bottlenecks and address them directly.

This constant feedback loop ensures that the team implements Fluid UI principles effectively and that the result is a truly seamless user experience.

## [Link to heading](#engineering-for-scale-and-performance)**Engineering for scale and performance**

Building for Fluid UI isn't just about adhering to a set of principles; it demands a fundamental shift in mindset and a dedicated framework that permeates the entire development process.

Frame.io approaches this challenge with a forward-thinking mentality, embodied in an "instant and infinity" philosophy: They design for scalability from day one, anticipating massive datasets and building their architecture to handle millions of items without breaking a sweat. This laser focus on user experience is further enabled by tools like Vercel, which handle critical performance optimizations out of the box.

> A lot of the value we get from Vercel is things we don't have to think about. Initial load performance is just as important as interaction performance, but we spend so much less time thinking about load performance because of the optimizations Vercel offers us.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/svMvNREMxjZatP17esVXv/7da99c0ce4871f8057a903951636347d/1638570191257.jpeg)
> 
> **Charlton Roberts,** Senior Manager of Product Engineering at Frame.io

Features like Vercel's global [Edge Network](https://vercel.com/docs/edge-network/overview), [static asset revalidation](https://vercel.com/docs/incremental-static-regeneration), and easy configuration of cache headers allow Frame.io's product engineers to focus on building features rather than spending weeks configuring infrastructure with the Site Reliability Engineering (SRE) team. This frees up valuable engineering resources to concentrate on delivering the best possible user experience.

But it's not just about handling scale—it's also about prioritizing the right work. Frame.io understands that every task impacts the user experience, so they prioritize ruthlessly, focusing on what matters most to their users. This often means deferring noncritical tasks, ensuring that the application remains snappy and responsive even under heavy load.

[

**Focus on features, not infrastructure.**

Build performant, personalized customer experiences with scalable infrastructure and secure data handling on any device, in any location.

Learn More



](https://vercel.com/solutions/web-apps)

To further enhance the user experience, Frame.io embraces anticipation. They preload resources and data, ensuring a smoother, more responsive experience that feels almost instantaneous. And to keep the UI humming along smoothly, they offload tasks from the main thread whenever possible, preventing UI jank (which impacts [core web vitals](https://vercel.com/resources/how-vercel-improves-your-websites-search-engine-ranking) like Cumulative Layout Shift) and maintaining that crucial responsiveness.

## [Link to heading](#the-job's-never-done:-continuous-improvement-and-minimizing-downtime)The job's never done: continuous improvement and minimizing downtime

Frame.io also recognizes the importance of continuous improvement, so they utilize [feature flags](https://vercel.com/blog/feature-flags) to control the release of new features, ensuring they meet performance standards before being unleashed upon the world, while regular audits with [Vercel Speed Insights](https://vercel.com/docs/speed-insights) or [Conformance](https://vercel.com/docs/workflow-collaboration/conformance) help identify and address regressions to ensure the application remains performant over time.

This commitment to continuous improvement extends to deployment practices as well. With thousands of users relying on Frame.io at any given time, zero-downtime deployments are crucial.

Vercel's [Skew Protection](https://vercel.com/docs/deployments/skew-protection) feature helps mitigate the risks associated with deploying at scale, ensuring a seamless transition for all users and minimizing the potential for disruption. This allows Frame.io to confidently ship updates knowing that their users will experience minimal, if any, interruption.

Frame.io doesn't shy away from complex performance challenges. They allocate dedicated resources and time to tackle these head-on, knowing that conquering these challenges is essential to delivering a truly exceptional user experience.

## [Link to heading](#shared-expectations-and-dedicated-resources:-the-keys-to-success)Shared expectations and dedicated resources: the keys to success

Frame.io recognizes that Fluid UI is crucial for a great user experience, especially for demanding applications. They prioritize performance by tracking metrics, identifying bottlenecks, and empowering developers to create a seamless experience.

This focus allows users to focus on what matters: their work. Other teams can learn from this approach, building web applications that feel as responsive and powerful as desktop software.