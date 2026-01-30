---
title: "The developer experience of the Frontend Cloud"
source: "https://vercel.com/blog/the-developer-experience-of-the-frontend-cloud"
publishedDate: "2023-12-21"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

10 min read

Dec 21, 2023

Part 3 of the developer's guide to a future-proofed stack.

In a large team, creating new code should never be scary. Finding where to place code shouldn't be difficult. And _deploying_ new code certainly shouldn't break anything.

**Ideally, your codebase feels transparent: easy to create, adjust, and monitor.**

The Frontend Cloud offers a complete [Developer Experience (DX) Platform](https://vercel.com/products/dx-platform), so you don't have to spend so much developer time curating and maintaining systems that can be easily automated.

Instead, you get centrally-located and collaborative tooling—Git-based workflows with automatic staging environments and more—where you can easily leverage the self-serve tools in front of you that just work by default.

[

**The web's Developer Experience Platform**

Traditional deployment tools weren’t built for Frontend development. Get the DX Platform that has teams shipping 6x faster.

Explore the Product



](https://vercel.com/products/dx-platform)

## [Link to heading](#git-based-workflow)Git-based workflow

Vercel's Frontend Cloud uses [framework-defined infrastructure (FdI)](https://vercel.com/blog/framework-defined-infrastructure) to automatically transform your [framework code](https://vercel.com/blog/the-foundations-of-the-frontend-cloud#why-fit-your-frontend-into-a-framework) into a globally served application. But how do you integrate your existing codebase with the Frontend Cloud?

The answer turns out to be straightforward: GitHub ([or any Git version control provider](https://vercel.com/docs/deployments/git)). Adding your repo to the Frontend Cloud is as easy as [adding an integration on GitHub](https://vercel.com/docs/getting-started-with-vercel/import).

This allows for immutable, persistent infrastructure provisioned for every single `git push` any developer makes within your codebase. Because of [serverless architecture's ability to scale to zero](https://vercel.com/blog/the-foundations-of-the-frontend-cloud#what-is-serverless-architecture), these deployments don't take up resources when unused.

The best part is that each deployment, when visited, exists in **true-to-production conditions**, with access to [the Frontend Cloud’s global infrastructure](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud#vercel's-edge-network).

Any code you push to any branch can therefore be observed as its own unique deployment.

## [Link to heading](#observability)Observability

![The frontend cloud gives you updates about your application's speed for your actual user base—in realtime.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FaXkbXGD4P2Bu8deOW7Wsk%2F5995b833bed1d04e24e530816d1b6179%2Fres-chart-light.png&w=1920&q=75)![The frontend cloud gives you updates about your application's speed for your actual user base—in realtime.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7FDUfsSuFQ7yOyAe7FetIq%2F11209597bd1ed65072fd35a4c28262c1%2Fres-chart-dark.png&w=1920&q=75)

The frontend cloud gives you updates about your application's speed for your actual user base—in realtime.

Crucial to application transparency is the ability to see how your deployed code is performing _in realtime for your actual users_. The Frontend Cloud gives centrally-located tools to [monitor usage](https://vercel.com/docs/observability/monitoring), [track performance](https://vercel.com/docs/speed-insights), and [decipher user traffic](https://vercel.com/docs/analytics)—all in service of helping you make better decisions and iterate faster.

You also have access to a [robust integration marketplace](https://vercel.com/integrations) to quickly plug in observability tools you may already be using.

Keep in mind that all these tools are available, like everything else, on a _per-deployment_ basis. This makes [experimentation far easier to maintain](#decouple-deploy-from-release) and keeps the focus on the developer, who wants to see how a specific change affects the application.

![Custom (and saveable) monitoring queries mean you can visualize data from any deployment in all the detail you need.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6wmgJ9Pg12nEMFGPDlYuHK%2Fe4a60b0fbcd89c21d05b064ff2ed757a%2Fset-groupby-light.png&w=1920&q=75)![Custom (and saveable) monitoring queries mean you can visualize data from any deployment in all the detail you need.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6pY1VCMfGRRPBSbTzsHZNd%2Fb828f5c0b42c502d44ec6dd11c7c97fe%2Fset-groupby-dark.png&w=1920&q=75)

Custom (and saveable) monitoring queries mean you can visualize data from any deployment in all the detail you need.

This level of code transparency means bugs are easy to find, and with the Frontend Cloud’s [focus on developer velocity](https://vercel.com/blog/iterating-from-design-to-deploy), they’re also quick to fix. Code should never be a mystery, and everyone on your team—developer or not—should have easy access to the iteration process.

## [Link to heading](#collaboration)Collaboration

Within the Frontend Cloud, role-based access to secure deployments is managed from a central dashboard, where you can see vital information about all branches, merges, and pushes of your repo, as well as the deployments themselves.

Since there’s production infrastructure for each deployment, accessing that deployment is as simple as navigating to its automatically provisioned URL.

The power of this can’t be understated: Any unreleased version of your application—or an experiment or side project—can instantly be shared with whichever team members or external clients need to see it in a true-to-production environment.

![The frontend cloud brings the feedback cycle right to the relevant page of your application.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F65mduKyyiUWWrobNP9Ox50%2F4053d80bd70dc977bd0e617dd12e7e0a%2Fold-hero-light.png&w=1920&q=75)![The frontend cloud brings the feedback cycle right to the relevant page of your application.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7FGJuh1f88DGOfZB8naf9s%2F8000ae907800d8750bcb587aaf78c507%2Fold-hero-dark.png&w=1920&q=75)

The frontend cloud brings the feedback cycle right to the relevant page of your application.

Plus, that environment comes with more features, such as:

-   [Figma-like commenting](https://vercel.com/docs/workflow-collaboration/comments) tied directly to DOM elements on the deployment. Feedback—from technical and non-technical stakeholders alike—can be addressed directly on the real webpage and converted to tickets in Slack, Linear, or Jira. They can also optionally [block further deployments](https://vercel.com/docs/workflow-collaboration/comments/integrations).
    
-   The ability to [see even unpublished CMS content](https://vercel.com/docs/workflow-collaboration/draft-mode).
    
-   [Direct-on-page (WYSIWYG) editing](https://vercel.com/docs/workflow-collaboration/visual-editing) of CMS content.
    

In the Frontend Cloud, the [iteration process is truly collaborative](https://vercel.com/blog/iterating-from-design-to-deploy), with all stakeholders having access exactly as they need.

> Comments have greatly improved our feedback process both internally among our marketers and designers and externally with our global clients—everything happens in the Preview and nothing gets lost in screenshots being sent back and forth.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/1KQggExNEEPQ0DlcjoYLVe/dedf677230fca524dba83c8993f5b959/1644931074596.jpeg)
> 
> **Wunderman Thompson**

## [Link to heading](#unlimited-environments)Unlimited environments

Since each deployment, when unused, doesn’t take up substantive resources, the Frontend Cloud can take things a step further: providing [unlimited deployment environments](https://vercel.com/docs/deployments/environments) for different kinds of work.

Each immutable environment gets its own set of environment variables (`.env`), meaning you can have significantly different deploys, just by tweaking these variables. Hydrow, for instance, uses this to [create a completely separate “authoring” environment](https://vercel.com/customers/hydrow), away from the tweaks of developers, allowing content creators to work in a truly WYSIWYG space, saving hours of time for each piece of content.

This translates to production, too, since **any environment can be assigned to a domain.** Wunderman Thompson uses this strategy to [deploy fully localized versions of their websites all from the same CMS](https://vercel.com/blog/wunderman-thompson-composable-workflow), just by tweaking a language variable.

## [Link to heading](#decouple-deploy-from-release)Decouple deploy from release

Within the Frontend Cloud, it’s good to think about [decoupling your deploys from your releases](https://vercel.com/blog/how-to-scale-a-large-codebase). Deploys are an unlimited resource, full of testing opportunities in a true-to-prod environment. Releases are just for the end-user—upgrades or new features that go live and affect customers.

Companies like Upstart make 12,000 deployments per month, but only 1,000 of those are actual releases to consumers. These deployments offer them the ability to run end-to-end testing, share work easily among colleagues, and generally have a more public, iterative workflow.

However, you can also release to some of your end users without releasing to all. To keep iteration velocity high, you need the confidence to deploy code early and often ([and be able to rollback](https://vercel.com/docs/deployments/instant-rollback)). Feature flags further separate deployments from releases, by making code in your deployment render [only after meeting your custom conditions](https://vercel.com/blog/how-to-scale-a-large-codebase#releasing-with-confidence-through-feature-flags).

These flags can be easily toggled on/off by developers, allowing your team to experiment without rebuilding the code. They also allow you to roll out new features to select customers, to make sure the release works with a few before releasing to all.

The power of unlimited environments plus unlimited [fast-as-edge feature flags](https://vercel.com/blog/zero-cls-experiments-nextjs-edge-config) makes your codebase truly a joy to experiment with and develop great features—if it’s accessible to use, kept organized, and safe to scale.

## [Link to heading](#monorepos)Monorepos

With all this power, how do you keep your teams organized? At Vercel, we’ve helped [thousands of large organizations](https://vercel.com/customers) scale up and manage their codebases, and we believe that monorepos are the optimal code architecture for frontends.

![Monorepos gather your org's code into one place, maximizing reusability, conformance, and efficiency.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fe1Auy4RWpEoTstm8p0F1C%2F03e2aaa06a0dfdb882ec5aaa16dfeb61%2Flight-arch.png&w=1920&q=75)![Monorepos gather your org's code into one place, maximizing reusability, conformance, and efficiency.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7gHd2neyIGRJ6qP3yG7NEK%2F1e9c990fdc2196fff5d8ea7daa612e31%2Fdark-arch.png&w=1920&q=75)

Monorepos gather your org's code into one place, maximizing reusability, conformance, and efficiency.

A [monorepo](https://vercel.com/docs/monorepos) is a codebase with multiple projects contained in a single unified repository. Instead of having possibly hundreds of codebases on a per-project basis, monorepos allow for new and existing engineers to onboard in a single place, set up their local environment, and contribute to any project.

Historically, though, monorepos have only been for the largest companies, like Google or Meta. The tooling and best practices have not been accessible to all teams until the past few years.

With the advent of open-source build tools like [Turborepo](https://turbo.build/repo/docs), teams of any size can adopt and manage monorepos without hassle. Turborepo takes the lessons and development workflows from the giants of the web and brings them to every developer.

Turborepo is a high-performance build system with sensible defaults and robust escape hatches for custom configuration. It simplifies splitting your codebase into different sections, such as a component library, frontend slices for each team, and any other shared business logic.

When a team makes a change to their section of the UI, only the code they’ve changed will build or trigger CI runs, thanks to Turborepo’s powerful caching system. No more wasted time (and money) waiting for scripts or builds to complete for unrelated changes.

![With Turborepo, if a build has been cached on any user's machine, the cache is available to all users within the monorepo.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6JNwougI01yPReklxb57Ld%2F884503b7c842c111459942319594247a%2Fremote-cache-changelog-light-mode-v4.jpg&w=1920&q=75)![With Turborepo, if a build has been cached on any user's machine, the cache is available to all users within the monorepo.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F52dMlnYirtCWOcHRCxFfrz%2Fba05d86c8a72487ff008c44e11acc43e%2Fremote-cache-changelog-dark-mode-v4.jpg&w=1920&q=75)

With Turborepo, if a build has been cached on any user's machine, the cache is available to all users within the monorepo.

Each team can own their part of the UI, with appropriate code reviews, scripts, and tests just for that section of the codebase. When any code needs to be reused across different teams, it's just an `import` statement away.

Monorepos are a superpower when you need to make updates across shared code, or sweeping changes that affect different parts of the UI. You can orchestrate a single change to roll out code safely (ideally behind a [feature flag](#decouple-deploy-from-release)), without breaking existing versions.

Turborepo also handles [running your tasks in the correct order](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)—a common pain point with monorepos. No need to remember if you built package A before running package B. Turborepo understands your dependency graph and when to run each script.

Finally, Turborepo uses a shared Remote Cache between all members of your team, meaning that if one team member's computer has done the work to run tasks, compile, or build your application, those results are shared between all machines. The Vercel team, for instance, by using the [Vercel Remote Cache](https://vercel.com/blog/vercel-remote-cache-turbo), saved **25,000 hours of compute time last month.**

## [Link to heading](#conformance)Conformance

So, your code is highly accessible to all engineers. But this creates another challenge: how do you know who owns what code? If a new engineer makes a PR that includes a piece of code their team doesn’t own, who do they reach out to?

![Visualize who owns code in your organization.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2pyZBaZm7Dn93Hm4ClkSgH%2Ff33e7975418fc9b5dba9b5c2e2f4b4a7%2Fcode-owners-light.png&w=1920&q=75)![Visualize who owns code in your organization.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5umwKrRzzMmt2cnNJMfssv%2F2435ee95234a8700f1fe4a544d3f2876%2FConformance.png&w=1920&q=75)

Visualize who owns code in your organization.

The Frontend Cloud allows you to [build conformance rules](https://vercel.com/blog/introducing-conformance) directly into your codebase and track who is responsible for maintaining certain parts of the application.

Onboarding and interaction with the codebase should be a safe and straightforward experience for all, and anyone who needs assistance, regardless of department, should know exactly where to turn.

The [Frontend Cloud has you covered](https://vercel.com/docs/workflow-collaboration/vercel-spaces#code-owners), with tools that provide detailed information about what team owns what, who to contact, and how to review code from different departments.

But let’s say an engineer doesn’t want to deal with the hassle of reaching out to the right people in the org, especially for a tiny change. [This is why the Frontend Cloud provides ways to manage conformance](https://vercel.com/docs/workflow-collaboration/vercel-spaces#conformance) (linting rules and other CI/CD tasks) from an easy location, to prevent errors from ever making it into the codebase.

![Frontend clouds should provide a bird's eye view of your code that makes it easy to dive into the details you need.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FW0G00NgaSotsrOvs4eOy8%2F8dde2fb41af6b95331570a6980e936c2%2Fdashboard-light.png&w=1920&q=75)![Frontend clouds should provide a bird's eye view of your code that makes it easy to dive into the details you need.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1kSSehmHLGqLXhNbiGLosO%2F38506ab2ddf1ea91631d9fdcac2c0fe4%2Fdashboard-dark.png&w=1920&q=75)

Frontend clouds should provide a bird's eye view of your code that makes it easy to dive into the details you need.

Errors in build can be easy to debug, too, with [each build having its own shareable run log](https://vercel.com/docs/workflow-collaboration/vercel-spaces#runs). This makes it far easier to optimize builds in the first place since each unique run can be compared.

[

**Ready to move fast and break nothing?**

Try out Conformance with your enterprise team.

Contact Us



](https://vercel.com/contact/sales)

## [Link to heading](#testing)Testing

Then, we have a set of challenges that come from decoupled architecture. Yes, [decoupling the frontend and backend](https://vercel.com/blog/the-foundations-of-the-frontend-cloud#why-decouple-the-frontend-from-the-backend...) is a better way to work, but how do you make sure your frontend and backend align perfectly, 100% of the time?

Luckily, end-to-end testing through CI/CD is [easy to set up in the Frontend Cloud](https://vercel.com/guides/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment). Even though your frontend and backend are decoupled, because you have each instance of your application running in a true-to-prod environment, you can use fully automated services like Github Actions to test the app within that environment, before ever merging to production.

Any test, as preferred, can be [mandatory to pass before deploying to production](https://vercel.com/docs/observability/checks-overview), but they don’t have to block non-production builds. A failing test, then, has a full deployment dedicated to it, where your team can more easily see what’s going wrong.

![You can implement various checks that run after successful deployments to the frontend cloud. They can define your application's quality metrics, run end-to-end tests, investigate APIs' reliability, and directly check your deployment code.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7bH5b5HKmv6dc9KOK7wE33%2Fcd8aa8656982de448f4ea54465ea8cea%2Fchecks-overview-light.png&w=1920&q=75)![You can implement various checks that run after successful deployments to the frontend cloud. They can define your application's quality metrics, run end-to-end tests, investigate APIs' reliability, and directly check your deployment code.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F455Ay3dlTo9MLTGBczuyGT%2Fa1ce404a3dfcfa1d8e2abed1be810e6e%2Fchecks-overview-dark.png&w=1920&q=75)

You can implement various checks that run after successful deployments to the frontend cloud. They can define your application's quality metrics, run end-to-end tests, investigate APIs' reliability, and directly check your deployment code.

End-to-end testing is vital to implement on large codebases where teams share code within a monorepo. Since changes can sometimes ripple out or have unexpected effects on other teams, building [Atomic components](https://atomicdesign.bradfrost.com/chapter-2/) that are easy to test is a recommended pattern within the Frontend Cloud.

With testing coverage of your application, individual teams can be freed up to have even better DX, since anyone can push changes with confidence they aren’t breaking anything in the codebase.

## [Link to heading](#version-skew)Version skew

Another more subtle challenge can arise with decoupled frontends: version skew.

Version skew happens whenever two components of a software system communicate, but they aren’t running at exactly the same version. Often this is benign, but it can lead to hard-to-predict problems.

Imagine, for example, that your app has a form. One day you realize you misspelled the name of the email field. It’s not a huge deal because the code on the backend that reads the field has the same misspelling. But still, you decide to fix the spelling on both backend and frontend.

Now, we have potential version skew: if a user loaded the form before the change, but submits it after the deployment happened, they will get an error because the email field won’t be recognized (the backend expects the new spelling and the frontend sends the old name).

![Applications are bound to the version that originally generated them every time a user initially navigates to the app. Subsequent requests from this instance of the app are then automatically routed to be served from that same version.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4O1RHFyU8EGloe7ChDv9jE%2Fe3703c055afe8d2b875e3049e4bb6ecf%2Fnested-layouts-dark.png&w=1920&q=75)![Applications are bound to the version that originally generated them every time a user initially navigates to the app. Subsequent requests from this instance of the app are then automatically routed to be served from that same version.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FA6NLRmFsDZfS3dE98GXm9%2F4ffabb4dde1bcd32aa8784fe127ee6ca%2Fnested-layouts-dark.png&w=1920&q=75)

Applications are bound to the version that originally generated them every time a user initially navigates to the app. Subsequent requests from this instance of the app are then automatically routed to be served from that same version.

The Frontend Cloud [provisions infrastructure to protect from version skew](https://vercel.com/blog/version-skew-protection), ensuring that users are always sent to the backend that matches the frontend version.

## [Link to heading](#third-party-tooling)Third-party tooling

Standardized architecture in the Frontend Cloud also opens the door to a massive ecosystem of third-party tooling:

-   Any plugins, community or commercial, written for [your framework](https://vercel.com/docs/frameworks#list-of-supported-frameworks) work by default, since they by definition must output to your framework code.
    
-   Integrations to tools, such as CMS, databases, analytics, ecommerce, and more, become easy to set up and manage from within your framework code. Your codebase can [integrate or exchange an ever-growing number of these tools without fuss](https://vercel.com/integrations).
    

Crucially, since all these tools can easily be swapped out for each other, **you gain a truly future-proof codebase, without vendor lock-in**.

### [Link to heading](#what-about-ai)What about AI?

At Vercel, we're working on AI-driven solutions to speed up existing tools and enhance workflows. We’re continually excited to [innovate within the AI ecosystem](https://v0.dev/).

![Vercel's v0, now available in public beta, allows users to leverage AI to generate starter UIs—complete with the ability to copy and paste the working code directly into your product.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5rqTluvrfjmz2YbHwIAgB6%2Fec9361b27273fd928060b6b9b6e7cf9b%2FScreenshot_2023-11-01_at_1.24.02_PM.png&w=1920&q=75)![Vercel's v0, now available in public beta, allows users to leverage AI to generate starter UIs—complete with the ability to copy and paste the working code directly into your product.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4pSNgSQ7yKbDOsJf7IX9a9%2F2bcd7110314d5a2ff2e9e83af9096d8f%2FScreenshot_2023-11-01_at_1.23.05_PM.png&w=1920&q=75)

Vercel's v0, now available in public beta, allows users to leverage AI to generate starter UIs—complete with the ability to copy and paste the working code directly into your product.

We see AI as the future of software development, and we're actively researching ways to securely integrate machine learning into our product to make the automation of the Frontend Cloud even _more_ efficient.

Even without generative AI features, the Frontend Cloud is the [best way to deploy AI-driven applications onto the web](https://vercel.com/blog/introducing-the-vercel-ai-sdk)_**.**_ Features like Edge Functions (which allow extended streaming from sources like OpenAI) and the speed and efficiency of the Frontend Cloud workflow allow for rapid adoption of and iteration with an ever-changing ecosystem of AI tools.

![Vercel's AI SDK offers an interoperable, streaming-enabled, edge-ready software development kit for AI apps built with JavaScript.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F42J8rRC9NDw0UnLhoNXkUZ%2F4d17d6d7fee81c4758a299d65a0ea1a0%2FIntroducing_Vercel_AI_SDK__1_..png&w=1920&q=75)![Vercel's AI SDK offers an interoperable, streaming-enabled, edge-ready software development kit for AI apps built with JavaScript.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2zjH2XK0KD1C6lGEwloMkt%2F8aeba6332540157c80ffb41f16a25a15%2FIntroducing_Vercel_AI_SDK.png&w=1920&q=75)

Vercel's AI SDK offers an interoperable, streaming-enabled, edge-ready software development kit for AI apps built with JavaScript.

If you want to build AI-driven applications, the Frontend Cloud will give you the [fastest time-to-market](https://vercel.com/ai) and best user experience.

[

**v0 is now open for everyone.**

Generate UI in seconds with text or images. What will you ship?

Napkin Sketch Time



](https://v0.dev/)

## [Link to heading](#dx-takeaways)DX takeaways

In this section, we’ve covered why the Frontend Cloud gives better DX through:

-   A familiar Git-based workflow
    
-   Unlimited, production-grade preview environments
    
-   Extremely high observability of your application
    
-   Native collaboration
    
-   Built-in experimentation through environments and feature flags
    
-   Accessible monorepo support to deduplicate effort and onboard faster
    
-   Conformance rules to help engineers stay organized in large codebases
    
-   Automatic end-to-end testing to make sure bugs don’t make it to production
    
-   Easy integration with best-in-class third-party tools, including the latest AI models
    

Perhaps the most important takeaway is this: if you’re not using the Frontend Cloud, you’re spending a lot of time tinkering with infrastructure that should be fully automated—globally at industry-leading speeds.

In the final article of this series (to be published soon), we'll dive into the core promises of the Frontend Cloud: reliability and security.