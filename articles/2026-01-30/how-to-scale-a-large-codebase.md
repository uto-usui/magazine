---
title: "How to scale a large codebase"
source: "https://vercel.com/blog/how-to-scale-a-large-codebase"
publishedDate: "2023-11-16"
category: "frontend"
feedName: "Vercel"
author: "Lee Robinson"
---

8 min read

Nov 16, 2023

Recommendations for building and scaling large software projects.

Scaling a codebase is an integral, and inevitable, part of growing a software company.

You may have heard many terms thrown around as answers — monoliths, monorepos, micro frontends, module federation, and more.

At Vercel, we’ve helped [thousands of large organizations](https://vercel.com/customers) evolve their codebases, and we have an opinion on the optimal way to build software.

In this post, we’ll share common issues encountered when scaling a codebase over time, useful open-source tools you can leverage, and the best practices and architectural patterns to follow.

This post will cover:

-   [**Organizing and reusing code across teams with monorepos**](#organizing-and-reusing-code-across-teams-with-monorepos)
    
-   [**Releasing with confidence through feature flags**](#releasing-with-confidence-through-feature-flags)
    
-   [**De-risking experimentation with incremental builds**](#de-risking-experimentation-with-incremental-builds)
    
-   [**Releasing code without affecting existing versions through Skew Protection**](#deploying-code-without-breaking-existing-versions-through-skew-protection)
    
-   [**Incrementally adopting new technology**](#incrementally-adopting-new-technology)
    

## [Link to heading](#where-teams-struggle-today)Where teams struggle today

Teams struggle to evolve their codebase without sacrificing iteration velocity.

It's common to see frontend performance degrade over time as multiple teams work on a single large codebase. Releasing code can become time-consuming, taking anywhere from a few hours to several days.

Teams often lack confidence in releasing code, particularly if new features are not behind [feature flags](#releasing-with-confidence-through-feature-flags). Each team may end up developing their own configuration and tooling for every new project, rather than reusing and sharing common bits among teams.

It can be challenging to even _find_ the code when there are dozens, hundreds, or even thousands of repositories to sift through. On top of this, frontend teams may then struggle to share code across different teams and parts of the UI.

While there isn’t one single solution to fix all of these issues, we believe in an architecture that _increases_ velocity, rather than slowing it over time.

## [Link to heading](#what-success-can-look-like)What success can look like

Many teams are starting their transformation from a large, monolithic codebase.

Monoliths have lots of great qualities, so it’s important to not throw out an architecture based on the latest trends. Instead, focus on the pain points you’re seeing and understand the ideal state for software development at your company.

For example, success might look like:

-   Releasing new changes frequently, with fast iterations
    
-   Adopting new technology easily into the existing codebase
    
-   Enabling teams to independently work on different parts of the UI
    
-   Sharing and reusing scripts and configuration, rather than reinventing every time
    

Regardless of your stage of growth, we believe you don’t need to sacrifice any of these points. We’ll talk about some of the tradeoffs later on, but let’s first start with the core architecture choice that enables this: a **monorepo**.

## [Link to heading](#organizing-and-reusing-code-across-teams-with-monorepos)Organizing and reusing code across teams with monorepos

Scaling a large codebase begins with making it easy for _anyone_ to locate code and make contributions. We don’t want to give up this quality of monoliths.

But a single, monolithic codebase, rather than smaller, independent pieces organized inside a monorepo, violates two of the points on our success criteria.

Monoliths make it difficult to:

-   Adopt new technology in the monolith without major, [big bang migrations](#incrementally-adopting-new-technology)
    
-   Enable teams to independently work on different parts of the UI
    

Our recommendation is to adopt a monorepo architecture.

### [Link to heading](#what-is-a-monorepo)What is a monorepo?

Monorepos are codebases with multiple projects contained in a single unified repository.

Instead of having 100+ separate codebases, a new engineer on your team has a single place to onboard, set up their local development environment, and start contributing on day one.

### [Link to heading](#aren't-monorepos-only-for-the-biggest-companies)Aren't monorepos only for the biggest companies?

Historically, yes. Companies like Google and Meta use monorepos to manage their incredibly large codebases. The tooling and best practices for enabling this architecture were not easily accessible to all teams until recently.

Now, open source build tools like [Turborepo](https://turbo.build/repo/docs) enable teams of all sizes to adopt monorepos.

Turborepo takes the lessons and development workflows from the giants of the web and brings them to every developer. It simplifies monorepos and makes them accessible to all.

### [Link to heading](#why-use-turborepo)Why use Turborepo?

Turborepo is a high-performance build system with sensible defaults and robust escape hatches for custom configuration. It simplifies splitting your codebase into different sections, like your component library, your frontend slices for each team, and any other shared business logic.

When a team makes a change to their section of the UI, only the code they’ve changed will build or trigger CI runs, thanks to Turborepo’s powerful caching system. No more wasted time (and money) waiting for scripts or builds to complete for unrelated changes.

![Turborepo's caching makes your longest builds near-instant.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5TgiSCR5iYGGiUvsTX4YnN%2F44f8526434a809f90c82e027c4b2f490%2FGroup_10783__2_.png&w=1920&q=75)![Turborepo's caching makes your longest builds near-instant.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5ScqdkNT2gTsTfU4h6rAL%2F5eb6f1a152264846c9d025c9d7fd2798%2FGroup_10784__2_.png&w=1920&q=75)

Turborepo's caching makes your longest builds near-instant.

Each team can own their part of the UI, with appropriate code reviews and ownership just for that section of the codebase. When they need to reuse code across different teams, it's just an `import` statement away.

Monorepos are a superpower when you need to make updates across shared code, or larger sweeping changes that affect different parts of the UI. You can orchestrate a single change to roll out code safely, without breaking existing versions, and ideally behind a feature flag.

Turborepo also handles running your tasks in the correct order—a common pain point with monorepos. No need to remember if you built package A before running package B. Turborepo understands your dependency graph and how to orchestrate running your scripts.﻿

### [Link to heading](#recommendations)Recommendations

-   **Monorepo tooling:** [Turborepo](https://turbo.build/repo/docs/core-concepts/monorepos)
    
-   **Build scripts:** [Turborepo](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
    
-   **Code generation:** [Turborepo](https://turbo.build/repo/docs/core-concepts/monorepos/code-generation)
    
-   **Package manager:** [pnpm](https://pnpm.io/)
    
-   **Conformance tooling:** [Vercel](https://vercel.com/docs/workflow-collaboration/conformance)
    

## [Link to heading](#releasing-with-confidence-through-feature-flags)Releasing with confidence through feature flags

Monorepos enable teams to independently release code, whether it’s a single component or an entire piece of an application. To keep iteration velocity high, you need confidence to deploy code early and often ([and rollback!](https://vercel.com/docs/deployments/instant-rollback)). We believe the correct solution to separate deployments from releases is feature flags.

### [Link to heading](#what-are-feature-flags)What are feature flags?

Feature flags help your team safely release new code and experiment with changes.

This architecture separates the deployment of new code from releasing features. You can change the UI and behavior of the application without needing to redeploy.

Compile-time checks in your monorepo ensure safety and performance, without sacrificing the ability to change runtime behavior through feature flags. The best of both worlds.

Revisiting our success criteria, flags enable releasing new changes frequently, with fast iterations.

### [Link to heading](#do-feature-flags-slow-down-my-application)Do feature flags slow down my application?

It’s valid to question if dynamically reading flags to see which features are enabled will affect site performance. We’ve been obsessed with this problem and how to enable global feature flags with low latency. Here’s the architecture we recommend.

Regardless of the flag provider you choose, flag values should be **pushed to low-latency data storage in every region**. With Vercel, this is 18 regions and 190+ points of presence globally.

Low latency reads are important as flag values are read dynamically on every request. With Vercel, feature flag values are stored in Edge Config. Most reads take **~5ms**, with **99% of reads happening in ~15ms**. When flags change in your provider, changes are automatically synchronized (through integrations) and pushed to all Edge Network regions.

> The combination of Vercel Edge Config and the LaunchDarkly integration for Vercel lets us update our feature flagging configurations comfortably and automatically push them to our Edge Config store in real time. We are able to change the UI and behavior of our application without the need to re-deploy, which keeps us highly flexible. The low latency that Edge Config provides reduces the overhead of fetching flag configurations over HTTP, allowing us to have minimal latency and create a better experience for our users.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/brDUyKDecgCrpUQLPDxU6/b68985eb79c602e2572d9cf93d4972bd/image.png)
> 
> **Vincent Derks,** Lead Engineer at Joyn

### [Link to heading](#recommendations)Recommendations

-   **Feature flag providers:** [LaunchDarkly, Statsig, Hypertune, and more](https://vercel.com/docs/storage/edge-config/edge-config-integrations)
    
-   **Feature flag storage:** [Vercel Edge Config](https://vercel.com/docs/storage/edge-config)
    
-   **CDN / Edge Network:** [Vercel](https://vercel.com/docs/edge-network/overview)
    

## [Link to heading](#de-risking-experimentation-with-incremental-builds)De-risking experimentation with incremental builds

High-performance teams experiment and iterate quickly. However, long build and deploy times slow everyone down and inhibit experimentation.

The only way to scale a large codebase is to make it as incremental as possible, reusing work that’s already been completed (through caching) and only running code that’s changed.

As your application grows in size, so, too, do all parts of your build process:

-   Type checking, testing, prerendering static pages, bundling assets together
    
-   Downloading and installing dependencies, restoring build caches
    
-   Uploading build outputs, populating build caches
    

With incremental builds through Turborepo, we can avoid re-computing work by separating each “microfrontend” or shared library into its own package.

### [Link to heading](#how-do-incremental-builds-with-turborepo-work)How do incremental builds with Turborepo work?

Turborepo schedules independent tasks to execute in parallel. The result of each task is fingerprinted and cached to avoid re-computing the same work.

When any of the inputs change, Turborepo invalidates the task and re-executes it. These value changes can then propagate throughout the entire graph of dependencies, updating the graph with minimal re-execution.

Turborepo is able to save work that’s already been done in a remote cache, enabling faster CI times across all builds (and in local development). Turborepo’s remote cache on Vercel has already saved customers [**over a decade of CI time**](https://vercel.com/blog/vercel-remote-cache-turbo). That’s time your team gets back to build better product experiences.

### [Link to heading](#recommendations)Recommendations

-   **Incremental builds:** [Turborepo](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
    
-   **Running tasks:** [Turborepo](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
    
-   **CI/CD:** [Vercel](https://vercel.com/docs/deployments/builds)
    
-   **Remote Cache:** [Vercel](https://vercel.com/docs/monorepos/remote-caching)
    

## [Link to heading](#deploying-code-without-breaking-existing-versions-through-skew-protection)Deploying code without breaking existing versions through skew protection

High performance teams have confidence releasing new code frequently. However, there’s a widely known and accepted side effect to releasing frequently: version skew.

### [Link to heading](#what-is-version-skew)What is version skew?

[Version skew](https://www.industrialempathy.com/posts/version-skew/) occurs when different versions of your application run on client and server, causing application errors and other unexpected behavior.

For example, imagine your newest deployment modifies the data structure by adding a required field to a user's profile. Older clients wouldn't expect this new field, leading to errors when they submit it.

### [Link to heading](#how-can-we-prevent-version-skew)How can we prevent version skew?

At Vercel, we’ve had the opportunity to work with thousands of teams facing this problem, with customers deploying over 6 million times per month.

Vercel's Skew Protection resolves this problem at the platform and framework layer by using [version locking](https://www.industrialempathy.com/posts/version-skew/#version-locking), which ensures the client and server use the exact same version. In our example, outdated clients continue to communicate with servers that understand the old data structure, while updated clients are served the most recent deployment.

Learn more about [how skew protection works](https://vercel.com/blog/version-skew-protection#the-mechanism-explained).

### [Link to heading](#recommendations:)Recommendations:

-   **Skew protection:** [Vercel](https://vercel.com/docs/deployments/skew-protection)
    

## [Link to heading](#incrementally-adopting-new-technology)Incrementally adopting new technology

The era of large-scale, [one-time migrations](https://vercel.com/blog/incremental-migrations#understanding-big-bang-migrations) is over. The risk and cost of a failed migration are too high. The most responsible way to evolve a large codebase is through [incremental migrations](https://vercel.com/blog/incremental-migrations). This requires your codebase to be composed of smaller, independent pieces that can be updated or replaced over time.

A composable architecture allows your team to choose the best tools for the job and continue to evolve them as needed. Most architectures today comprise the best tools for each use case across different cloud verticals.

Vercel's frontend cloud connects and orchestrates all these composable pieces to deliver your user-facing product experience. Our goal is to make it as fast as possible for your engineering team to iterate changes and safely release code.

### [Link to heading](#recommendations)Recommendations

## [Link to heading](#applying-this-strategy-for-your-team)Applying this strategy for your team

Scaling a codebase isn't just about managing growth—it’s about building a foundation to raise the baseline for iteration velocity. It's about making sure that your team can keep delivering value to your customers, no matter how large your organization becomes.

With the right tools and strategies, it can be transformational for your business. The biggest challenge is the organizational change required to make this change. It requires a shift in mindset. It's about viewing these challenges not as obstacles, but as opportunities for continuous iteration and improvement.

Embrace monorepos, leverage feature flags, implement incremental builds, and adopt skew protection to achieve the success criteria:

-   Releasing new changes frequently, with fast iterations
    
-   Adopting new technology easily into the existing codebase
    
-   Enabling teams to independently work on different parts of the UI
    
-   Sharing and reusing scripts and configuration, rather than reinventing every time
    

If you want to learn more about these practices, [we'd love to speak with you](https://vercel.com/contact/sales) and help your team adopt these patterns.