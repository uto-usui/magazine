---
title: "How Makeswift improved CI speed by 65% with Turborepo"
source: "https://vercel.com/blog/how-makeswift-improved-ci-speed-by-65-with-turborepo"
publishedDate: "2023-02-22"
category: "frontend"
feedName: "Vercel"
author: "Kiana Lewis"
---

2 min read

Feb 22, 2023

Trusted by companies like Caterpillar and Render, [Makeswift](https://www.makeswift.com/) prides itself on providing easy visual or no-code Next.js site builders for their clients. When their small team began struggling with lengthy build times and a subpar dev experience, they turned to [Turborepo](https://turbo.build/repo). After adopting Turborepo, Makeswift **improved overall CI pipeline time by 65%**.

Makeswift initially relied on a custom build process comprised of Kubernetes and Bazel. They had a "multi-monorepo" setup and, before Turborepo, used a combination of GitHub Actions ignoring file globs and clever Docker builds to manage their tasks. These _mostly_ worked but were difficult to worth with and maintain.

Once CI times climbed towards 20 minutes in Bazel, the team began optimizing their build process, workflow, and overall development experience. They spent months trying to create a solution that would work with their original setup, but soon realized it would take more configuration than their team could handle.

After finding Turborepo, the switch was swift. Pipeline tasks, including linting, typechecking, building, codegen, dev, generate, pre-commit, and pre-push, are all scheduled, locally and in CI, without developers ever having to think about them.

> Turborepo just worked. We couldn’t have asked for an easier set up, it was great.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/66kEFOSJLqHKYCT0HrZU38/085ad958f62b3d50ae243ca0e6d71803/image.png)
> 
> **Miguel Oller Cofounder and CEO**

### [Link to heading](#how-makeswift-uses-turborepo-and-vercel)How Makeswift uses Turborepo and Vercel

Makeswift’s developers need to iterate as quickly as possible—averaging around 50 builds a day and daily deployments to production. **Before adopting Turborepo, their time from commit to deploy took around 20 minutes. Now, that time is down to less than one minute.** Since Vercel creates a Preview Deployment for each pull request, their iteration time improved dramatically, making internal code reviews and collaboration much smoother.

Turborepo has made Makeswift’s local development experience better, too. Their team is able to spin up an end-to-end stack using just one command, rather than handling multiple terminals to run their development environment. All of this time saved is dev time Makeswift can now use to create their next new feature or prep for an upcoming release.

### [Link to heading](#what’s-next:-further-optimization)What’s next: further optimization

While Makeswift was the first Turborepo customer, they’re still looking forward to exploring more that Turborepo and Vercel has to offer. They’re excited to start using [Vercel Edge Middleware](https://vercel.com/features/edge-functions) for multi-tenancy and features like internal packages and publishing to npm in their open-source repo.

Would your team's platform benefit from faster iterations and seamless scaling? [Get in touch](https://vercel.com/contact/sales).