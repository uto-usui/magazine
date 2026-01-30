---
title: "Iterating from design to deploy: the shape of future builders"
source: "https://vercel.com/blog/iterating-from-design-to-deploy"
publishedDate: "2023-07-13"
category: "frontend"
feedName: "Vercel"
author: "Alasdair Monk"
---

6 min read

Jul 13, 2023

Guillermo Rauch's talk at Figma Config 2023.

In a world of accelerating digital innovation, we need tools that transform the web development landscape. In his recent [Figma Config keynote](https://config.figma.com/video-on-demand/6329925612112), Guillermo Rauch spoke about how we at Vercel enable builders—non-developers included—to tighten the cycle of design and deploy.

Below, we’ll dive behind the scenes of the talk and give you tangible ways to try out Vercel’s Frontend Cloud.

## [Link to heading](#why-develop-on-the-web)**Why develop on the web?**

Vercel enables you to deploy to the web because we believe it’s the past, present, and future of applications.

The web isn't just an information hub; it's a dynamic and inclusive platform for creators to build, deploy, and interact with a range of applications and services. Here's why it's compelling to develop on:

-   **Open-source**: Unlike proprietary ecosystems, the web's open-source nature provides developers with unmatched freedom and flexibility. They can collaborate, innovate, and contribute without constraints, which makes the Web evolve faster than any other platform.
    
-   **Universality**: The web is available across various devices like desktops, mobiles, TVs, and wearables. It offers a single source of truth for designs, ensuring cross-platform compatibility. It’s global, transcending geographic, economic, and technological barriers.
    
-   **Interactivity**: The web is shifting from static websites to dynamic applications. For instance, a single hyperlink can lead to a complete web-building experience, allowing users to transition from being passive consumers to active creators.
    
-   **Inclusivity**: Above its technical merits, the web's true strength lies in its capacity to empower individuals. By welcoming everyone to participate, it encourages a more inclusive and innovative technological future.
    

The biggest problem with the web, then, is the obstacles in place for non-engineers between design and deploy. Without code, non-engineers are severely limited in the types of applications they can create.

## [Link to heading](#design-first,-engineering-second)Design first, engineering second

Building on the web may be the best place to build, but it’s always required a whole lot of engineering.

However, the complex nature of development is changing. The solid engineering foundation we’ve been building for the past few decades—think backend cloud tech like AWS or Kubernetes—has come to a maturity that enables us to work design first, engineering second.

A key player in this paradigm shift has been React. By turning abstract JavaScript functions into tangible, reusable components, React opened the door to a frontend-first approach. This allows teams to create dynamic, user-centric interfaces, while more or less slotting in backend solutions.

Today, the best online experiences are those that use team-designed components to offer user-facing personalization that allows for deep connection. Think endless scrolling on Twitter, swiping on TikTok, or Instagram’s minimalism. All prioritize the frontend experience.

To keep up with modern user expectations, design must remain the top priority, and it must evolve rapidly. The shift from engineering to design is not just a trend; it’s a journey towards a more engaging, personal, and ultimately, human digital experience.

## [Link to heading](#making-the-web-faster)**Making the web faster**

Better designs may make for better experiences, but connecting with a slow application is a difficult proposition. In today’s attention economy, engagement is everything and speed holds engagement.

Top-ranking apps’ load time is measured in milliseconds.

![As cited in a recent study by Deloitte, an improvement in load time of just 100ms can result in an 8% increase in your app’s customer conversion.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FvYB3K7dWZhCdUpcXtkOgC%2F1bc086350f3340eff09beb0e8001d96e%2Fmilliseconds.png&w=1920&q=75)

As cited in a recent study by Deloitte, an improvement in load time of just 100ms can result in an 8% increase in your app’s customer conversion.

Add to this that search engines want to show fast, low bounce rate sites as their top results, and you find that milliseconds make millions.

### [Link to heading](#the-frontend-cloud)**The Frontend Cloud**

Making a high-performing, well-designed site requires more than just an assortment of individual open-source tools; it demands an integrated ecosystem.

This is the primary goal of Vercel’s Frontend Cloud: to facilitate a unified, seamless user **and** developer experience. It allows numerous solutions—CMS, database, shop, auth, you name it—to smoothly integrate with popular frameworks such as Next.js and SvelteKit.

![Bring your favorite framework and full-stack tools. We'll wire it all together with our Frontend Cloud.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7hrKwfQhxLytq7BPdIL6gc%2Fa101611125239781463e3b9f634ae755%2FFEC.png&w=1920&q=75)

Bring your favorite framework and full-stack tools. We'll wire it all together with our Frontend Cloud.

However, unlike a “walled garden” approach, Vercel’s frontend cloud guarantees cohesion while bringing together top-tier closed- and open-source tools from every sector of web design, allowing for true interchangeability of tools.

You can focus on creating your frontend, adding other pre-built solutions only as needed. You get to pick the solutions that best align with your unique vision, without compromising on design.

### [Link to heading](#framework-defined-infrastructure)Framework-defined infrastructure

Frameworks are good at reducing the organizational load on your team’s developers. Using Next.js, SvelteKit, or Vue frees team members up to focus on designing powerful UX. However, frameworks lose value if they don’t work out-of-the-box with your eventual deployment environment.

Vercel takes the view that deployment infrastructure itself should be framework-defined, meaning that you never have custom brew solutions on cloud architecture.

![Devs shouldn't have to manage intricate architecture; follow your favorite framework and the rest is up to us.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1nDV5bevFbDYVNS3RkJ8zs%2F0be4ef78acb4d3e640645b031d9d76e4%2Fprimitives.png&w=1920&q=75)

Devs shouldn't have to manage intricate architecture; follow your favorite framework and the rest is up to us.

Your framework code—everything that framework is capable of—just _works_ when deployed to Vercel. That’s what we mean when we say we’re the native Next.js solution (in addition to being its creator and maintainer).

We leverage all those years of infrastructure engineering to provide the best solutions behind the scenes: CDNs, serverless tech, dynamic data on the Edge, and the list goes on. Developers shouldn’t have to reinvent the wheel every time they want to roll out a new product.

## [Link to heading](#making-the-web,-faster)Making the web, faster

The key to a more interactive and personal web lies in the ability to iterate rapidly. The faster your team can fail and learn from failure, the faster you can have a truly great product.

![Vercel makes testing of your app in a real-world environment easily available to anyone you choose, meaning your team can make the product better, faster.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4h0Jlt10BzAwA7L5QckCa6%2Ff7d676d4171a15a27a90dc970e67b31d%2Fiteration_velocity.png&w=1920&q=75)

Vercel makes testing of your app in a real-world environment easily available to anyone you choose, meaning your team can make the product better, faster.

As discussed above, Vercel enables quick cycles through our Frontend Cloud’s native integrations and framework-defined infra. However, with Vercel’s seamless [Git integration](https://vercel.com/docs/concepts/deployments/git), all team members can interact with _every_ change in a live preview. (Put in developer-speak, every Git commit across every branch of your repo leads to a unique Vercel deployment that can be interacted with in a true-to-prod environment.)

Truly, we're finished with the age of, "Well, it worked on _my_ machine."

### [Link to heading](#side-by-side-collaboration)**Side-by-side collaboration**

Those true-to-life previews don’t stay read-only, though. Taking inspiration from collaborative tools like Figma, Notion, and Google Docs, Vercel has made iterating a whole-team activity.

-   **Deployment URLs** - Links to specific Preview Deployments can be easily shared with any project stakeholders, on-team or off. Everyone works from the same source of truth and can test across even the toughest environments—like that pesky web browser that pops up within Twitter.
    
-   **Comments** - Preview deployments include Figma-like [comments](https://vercel.com/docs/workflow-collaboration/comments) that, thanks to framework-defined infra, stick to the actual DOM elements of the webpage. This means you can stick comments anywhere that everyone else can see in real time.
    
-   **Issue Tracking** - Comments alone can be hard to track, so we’ve made sure they integrate directly with [Linear](https://linear.app/), which in turn can be integrated into many other of your team’s favorite tools.
    
-   **Visual Editing** - When enabled, [Visual Editing](https://vercel.com/docs/workflow-collaboration/draft-mode) allows you to see where every dynamic component comes from in your CMS. On large products, it’s easy to spend ten minutes finding where to edit content, but now you can click right into where the edits need to happen.
    
-   **Build Blocking** - Thanks to Vercel’s CI/CD automation, preview comments from any team member can _block_ new deployments from being made, much like developers have always been able to ask each other for changes to be made before a feature is merged.
    

Blurring these traditional lines between design and engineering means that all team members can work side-by-side to bring highly creative products to life, working together in real time to optimize productivity.

### [Link to heading](#a-note-on-ai)A note on AI

The tightly integrated approach talked about throughout this article also opens the door to directly integrating AI in design. We’re actively building AI solutions across our product, including the ability to adjust your apps on the fly from the Preview Deployments themselves.

Stay tuned for more developments.

![In the near future, Vercel plans to make AI available to speed up simple code tasks directly from Preview Deployments.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2wIjiRDgsU2UDVvlqtcbGW%2F558817fa11dcdf5ca1232b65ab1c7aa0%2FFrame_94.png&w=1920&q=75)

In the near future, Vercel plans to make AI available to speed up simple code tasks directly from Preview Deployments.

## [Link to heading](#the-future-is-you,-empowered)**The future is you, empowered**

We’re entering a new era: one where creativity, efficiency, and technology unite to forge remarkable digital experiences.

In this new world of real-time collaboration, everyone on your team has the power to contribute, innovate, and effect change.

[

**Start building securely**

Our experts can help you navigate Vercel for your team's unique needs.

Contact Us



](https://vercel.com/contact/sales)