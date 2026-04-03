---
title: "Scaling Uber with Thuan Pham (Uber’s first CTO)"
source: "https://newsletter.pragmaticengineer.com/p/scaling-uber-with-thuan-pham-ubers"
publishedDate: "2026-04-01"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/3jjRNVfm3V4), [Spotify](https://open.spotify.com/episode/13v42Y6P0TH36fVxZsMVmc), and [Apple](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id1769051199).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!Gh57!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

](https://substackcdn.com/image/fetch/$s_!Gh57!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

• **[Statsig](http://statsig.com/pragmatic)** – ⁠ The unified platform for flags, analytics, experiments, and more.Stop switching between different tools, and have them all in one place.

• **[WorkOS](https://workos.com/)** – Everything you need to make your app enterprise ready. WorkOS gives you APIs to ship enterprise features in days: features like authentication, SSO, SCIM, RBAC, audit logs. Visit [WorkOS.com](http://workos.com/)

• **[Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer)** – The makers of SonarQube, the industry standard for automated code review. [Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer) helps reduce outages, improve security, and lower risks associated with AI and agentic coding. [See how SonarQube Advanced Security](https://www.sonarsource.com/products/sonarqube/advanced-security/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-advanced-security&utm_content=podcast-sonarqube-advanced-security&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer) is empowering the Agent Centric Development Cycle (AC/DC) with new capabilities like malicious package detection to provide the same rigorous guardrails for AI agents as you would for a human developer.

[Thuan Pham](https://www.linkedin.com/in/thuanqpham/) was Uber’s first and longest-serving CTO, and today he’s the CTO of Faire, a B2B wholesale platform. Back when Thuan joined Uber, it had around 40 engineers and 30,000 rides per day, and the system crashed multiple times a week. Over seven years, he helped rebuild the system, move it from a monolith to microservices, and scaled the engineering organization behind it. _I had the privilege of working with Thuan for four of those seven years. Later, the very first issue of The Pragmatic Engineer newsletter was a [deepdive into Uber’s Program and Platform split](https://newsletter.pragmaticengineer.com/p/program-platform-split-uber). This episode of the podcast contains a nice “full circle” moment, where Thuan shares even more details about why Uber chose to embrace that structure._

We discuss what it takes to operate and build in that kind of environment. Thuan explains how he divided his time at Uber into three “tours of duty,” from stabilizing a fragile system, to re-architecting it, and scaling the org.

We go deep into the platform-and-program split, the Helix app rewrite, and what it took to launch Uber in China in just five months (the original estimate was 18 months). We also cover Uber’s in-house tools and explain why they were necessary to support rapid growth.

Finally, we discuss his role today as CTO of Faire, how the company is using AI, and how he sees AI changing software engineering.

14 takeaways from Thuan that I find the most interesting:

**1\. Your professional reputation is a compounding asset that pays off unpredictably**. Bill Gurley recruited Thuan to Uber based on knowing him from a startup a decade earlier. Similarly, when Thuan needed to hire for critical infrastructure teams at Uber, he reached out to engineers at VMware whom he’d previously worked with, and they followed him to the ridesharing app because they trusted him.

**2\. The program/platform split came before microservices**. The concept of cross-functional “program” teams and dedicated “platform” teams became necessary because an org split across backend, frontend and mobile engineers slowed down in execution speed when Uber grew to around 100 engineers. Every feature required negotiating bandwidth across the mobile, backend, and dispatch teams. Thuan, Travis Kalanick, and Jeff Holden literally used color-coded sticky notes with people’s names to reorganize into self-sufficient teams. We cover more about this split in the deepdive, [The Platform and Program split at Uber.](https://newsletter.pragmaticengineer.com/p/program-platform-split-uber)

**3\. Microservices at Uber were more about surviving hypergrowth than anything else.** Uber needed to decompose its massive monolith called “API.” To do so, a simple rule was applied: anything new needed to be built outside of the monolith so that no team blocked another. Teams started to build microservices, but decomposing the monolith took a good two years. Fun fact: in 2026, Uber has somewhat fewer microservices (around 4,500) than back in 2016 (around 5,000).

**4\. When retiring a monolith, sometimes it gets even bigger before shrinking.** After Uber decided to pull services out of the massive monolith, it still kept growing because the business kept adding features! There was an ugly middle phase before the monolith started to shrink. Keep this in mind if you look into decomposing a monolith.

**5\. Expect multiple rewrites during hypergrowth.** The right architecture depends on how fast a product and company are growing. At Uber, repeated rewrites were common because each one “bought” another window of survival for the company. Thuan’s recommendation is to understand that a rewrite simply means a company is outrunning its existing architecture: this is not necessarily a bad thing!

**6\. Controversial launch advice: start with the hardest launch first.** When Uber rolled out in China, Travis insisted on starting with Chengdu, the _largest_ launch city. Looking back, it was scary but also helpful, as launching in the “hardest” city first gave the team confidence and made subsequent city launches much easier.

**7\. Travis Kalanick spent 30+ hours interviewing Thuan.** This took place over two weeks, as a series of one-on-ones. The sessions became a simulation of working together: disagreeing, aligning, and working things out. I’ve yet to hear of such an intense – and technical! – recruitment process by another CEO.

**8\. Uber is the only major company that had a “Senior 1” and “Senior 2” level – and Thuan is unapologetic.** Thuan introduced the Senior 1 (L5A) and Senior 2 (L5B) levels because the jump from senior (L5) to Staff (L6) became very big, and larger than between previous levels. One problem this split level created was that Uber’s L5B was akin to Google’s and Facebook’s L6/E6. Thuan resisted the title inflation of just renaming L5B to ‘Staff’.

**9\. Name your services clearly; you don’t work at a “Mickey Mouse shop.”** As Uber grew more complex, whimsical service names (like “Mustafa”) made navigating systems more tricky, and onboarding for new joiners more painful. Thuan sent a company-wide email which called for professional-sounding naming conventions, and reminded everyone that Uber was not a “Mickey Mouse shop.” The email didn’t fully solve the issue, but did force the growing org to take itself more seriously.

**10\. Great engineering talent is global, so bring the opportunity to developers.** During Thuan’s time, Uber opened nine engineering offices worldwide in order to access world-class talent. For example, the relatively small Denmark office built and operated core parts of Uber’s infrastructure, such as the trip datastore, [Schemaless](https://www.uber.com/blog/schemaless-part-two-architecture/).

**11\. What’s the most important part of a CTO’s job?** Thuan thinks that it’s to build a high-talent-density team, and to “see around the corner” 18–24 months in advance. As he puts it: “your team handles the six-month problems, while you figure out what the organization needs to look like two years from now.”

**12\. The hardest use case of AI in software engineering is building new features on legacy codebases.** At Faire, Thuan’s team uses “swarm coding” (orchestrated AI agents working in parallel) and some engineers there have doubled their output in three months. But generating greenfield code is easy; the real challenge is dealing with millions of lines of code and building features on top with all those existing dependencies.

**13\. AI raises the floor, but doesn’t change what makes engineers great.** AI enables people who can’t code to produce decent apps, but great engineers are still finding ways to leverage AI tools and accelerate even more. The differentiators remain the same as before AI: curiosity, fearlessness, and a willingness to innovate and learn new things.

**14\. Thuan’s career advice: think of it in phases.** Each segment of your career has different priorities, which Thuan sees like this:

-   First 5–10 years: seek maximum learning and push yourself hard.
    
-   Mid-career as a senior/staff engineer: seek roles to make an outsized impact in, perhaps at a smaller company.
    
-   In leadership roles: teach and coach others, and bring them along with you.
    

-   [How Uber uses AI for development: inside look](https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development)
    
-   [The Platform and Program split at Uber](https://newsletter.pragmaticengineer.com/p/program-platform-split-uber)
    
-   [How Uber is measuring engineering productivity](https://newsletter.pragmaticengineer.com/p/uber-eng-productivity)
    
-   [Inside Uber’s move to the cloud](https://newsletter.pragmaticengineer.com/p/uber-move-to-cloud)
    
-   [Uber’s crazy YOLO app rewrite, from the front seat](https://blog.pragmaticengineer.com/uber-app-rewrite-yolo/)
    
-   [How Uber built its observability platform](https://newsletter.pragmaticengineer.com/p/how-uber-built-its-observability-platform)
    
-   [Developer experience at Uber](https://newsletter.pragmaticengineer.com/p/developer-experience-at-uber) with Gautam Korlam
    
-   [Uber’s engineering level change](https://newsletter.pragmaticengineer.com/p/the-scoop-46)
    

([00:00](https://www.youtube.com/watch?v=3jjRNVfm3V4)) Intro

([05:32](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=332s)) Getting into tech

([16:09](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=969s)) The dot-com bust

([20:42](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=1242s)) VMware

([26:29](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=1589s)) Getting hired by Travis at Uber

([33:22](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=2002s)) Early days at Uber and scaling challenges

([40:57](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=2457s)) Uber’s China launch

([47:12](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=2832s)) The platform and program split

([50:26](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=3026s)) From monolith to microservices

([53:38](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=3218s)) Internal tools at Uber

([57:05](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=3425s)) Helix: Uber’s mobile app rewrite

([59:55](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=3595s)) Thuan’s email about naming

([1:02:03](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=3723s)) Org structure changes under

([1:06:34](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=3994s)) Thuan’s work philosophy

([1:12:23](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=4343s)) The “three tours of duty” at Uber

([1:15:37](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=4537s)) Why Thuan left Uber

([1:17:34](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=4654s)) Coupang and Nubank

([1:21:59](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=4919s)) Faire

([1:25:31](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=5131s)) How Faire uses AI

([1:28:24](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=5304s)) AI’s impact on software engineering

([1:31:09](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=5469s)) The role of the CTO

([1:35:13](https://www.youtube.com/watch?v=3jjRNVfm3V4&t=5713s)) Career advice

**Where to find Thuan Pham:**

• LinkedIn: [https://www.linkedin.com/in/thuanqpham](https://www.linkedin.com/in/thuanqpham)

**Mentions during the episode:**

• HP Labs: [https://www.hp.com/hk-en/shop/tech-takes/post/what-is-hp-labs](https://www.hp.com/hk-en/shop/tech-takes/post/what-is-hp-labs)

• Silicon Graphics: [https://en.wikipedia.org/wiki/Silicon\_Graphics](https://en.wikipedia.org/wiki/Silicon_Graphics)

• Miro: [https://miro.com](https://miro.com/)

• VMware: [https://www.vmware.com](https://www.vmware.com/)

• Bill Gurley on LinkedIn: [https://www.linkedin.com/in/billgurley](https://www.linkedin.com/in/billgurley)

• Travis Kalanick on X: [https://x.com/travisk](https://x.com/travisk)

• DiDi: [https://web.didiglobal.com](https://web.didiglobal.com/)

• The Platform and Program Split at Uber: A Milestone Special: [https://newsletter.pragmaticengineer.com/p/the-platform-and-program-split-at](https://newsletter.pragmaticengineer.com/p/the-platform-and-program-split-at)

• Rewriting Uber Engineering: The Opportunities Microservices Provide: [https://www.uber.com/blog/building-tincup-microservice-implementation](https://www.uber.com/blog/building-tincup-microservice-implementation)

• Up: Portable Microservices Ready for the Cloud: [https://www.uber.com/blog/up-portable-microservices-ready-for-the-cloud](https://www.uber.com/blog/up-portable-microservices-ready-for-the-cloud/)

• How Uber Built its Observability Platform: [https://newsletter.pragmaticengineer.com/p/how-uber-built-its-observability-platform](https://newsletter.pragmaticengineer.com/p/how-uber-built-its-observability-platform)

• The Uber Engineering Tech Stack, Part I: The Foundation: [https://www.uber.com/blog/tech-stack-part-one-foundation](https://www.uber.com/blog/tech-stack-part-one-foundation)

• How Ringpop from Uber Engineering Helps Distribute Your Application: [https://www.uber.com/blog/ringpop-open-source-nodejs-library](https://www.uber.com/blog/ringpop-open-source-nodejs-library)

• PostgreSQL: [https://en.wikipedia.org/wiki/PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL)

• MySQL: [https://www.mysql.com](https://www.mysql.com/)

• Uber’s Crazy YOLO App Rewrite, From the Front Seat: [https://blog.pragmaticengineer.com/uber-app-rewrite-yolo](https://blog.pragmaticengineer.com/uber-app-rewrite-yolo)

• Hypergrowth startups: Uber and CloudKitchens with Charles-Axel Dein: [https://newsletter.pragmaticengineer.com/p/high-growth-startups-uber-and-cloudkitchens](https://newsletter.pragmaticengineer.com/p/high-growth-startups-uber-and-cloudkitchens)

• Coupang: [https://www.aboutcoupang.com](https://www.aboutcoupang.com/)

• Nubank: [https://international.nubank.com.br](https://international.nubank.com.br/)

• Max Rhodes on LinkedIn: [https://www.linkedin.com/in/max-rhodes](https://www.linkedin.com/in/max-rhodes)

• Sequoia: [https://sequoiacap.com](https://sequoiacap.com/)

• Wyan Gretzky’s quote: [https://www.brainyquote.com/quotes/wayne\_gretzky\_383282](https://www.brainyquote.com/quotes/wayne_gretzky_383282)

—

Production and marketing by [Pen Name](https://penname.co/).