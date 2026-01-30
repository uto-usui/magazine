---
title: "Quality software at scale with Vercel Spaces"
source: "https://vercel.com/blog/vercel-spaces"
publishedDate: "2023-05-03"
category: "frontend"
feedName: "Vercel"
author: "Mark Knichel"
---

3 min read

May 3, 2023

Unite your team with powerful tools and conventions for better collaboration and faster iteration in large codebases.

As companies and codebases grow, it becomes hard to sustain a fast release cycle without letting errors slip in to production. It shouldn't be this way. We should be able to move fast _without_ breaking things—making quick updates while retaining great performance, security, and accessibility.

Today, we're introducing Vercel Spaces, the biggest evolution of Vercel's workflow yet. Introducing powerful tools and conventions designed to integrate with your [monorepo](https://vercel.com/blog/monorepos) setup, to help you scale efficiently while retaining quality.

With [Vercel Spaces](https://vercel.com/docs/workflow-collaboration/vercel-spaces), you'll find insights on your development workflows, code health and build logs, and brand new functionality to boost efficiency and remove blockers with **Conformance**, **Code Owners**, and **Vercel Runs**. These products, currently available in early private beta for Enterprises, can be used with Vercel regardless of where you host your application.

![The Spaces Dashboard surfaces information about the codebase and development workflows to developers. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5qPrxG8cweeuH8jNJ9ng2q%2Fafd4a2eb7548b702fcf8f59a55f41b0e%2FSpacesLight.jpg&w=1920&q=75)![The Spaces Dashboard surfaces information about the codebase and development workflows to developers. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F56ZG88WvFTiq9aYamjntZf%2F7ddb1b46d90d3d477e37c1697ab67ccc%2FSpacesDark.jpg&w=1920&q=75)

The Spaces Dashboard surfaces information about the codebase and development workflows to developers.

[

**Get started**

If you're interested in Vercel Spaces, it is available for early access for Vercel Enterprise customers. Contact our team to learn more.

Contact Us



](https://vercel.com/contact/sales)

## [Link to heading](#reimagining-vercel-for-large-codebases)Reimagining Vercel for large codebases

Teams need a single place to find information about code, owners, and build logs.

As more teams turned to monorepos to efficiently scale projects, it became clear that we needed to rethink how our dashboard surfaced their data. Spaces provides new monorepo and code-first views in the Vercel dashboard, making it easy to improve collaboration and productivity.

With the Spaces Dashboard, we've designed a workspace to make information discovery easier, help with cross-team collaboration, and ensure a better onboarding experience for new team members.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3p00ab2sRPBgnmYzwIRy6R%2F1e50d883c3cba2871431e74885fdadc3%2FSpacesOverviewLight.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1ADhYvFtvLflxYaJr9p4pI%2F56463d8a1d4a2ae4aa42950ebd0c15af%2FSpacesOverviewDark.jpg&w=1920&q=75)

### [Link to heading](#better-best-practices:-conformance-for-your-code)Better best practices: Conformance for your code

Maintaining frontend code quality is hard to do at scale. With [Conformance](https://vercel.com/docs/workflow-collaboration/vercel-spaces#conformance), Vercel Spaces will automate detection of critical issues for your frontend products early in the development lifecycle and prevent them from ever reaching production.

We do this by codifying and extending Vercel's deep knowledge of the framework ecosystem and tools like [Next.js](https://vercel.com/solutions/nextjs) and [Turbopack](https://turbo.build/pack) to automatically identify the most common issues impacting product and code quality.

For example, Conformance will detect when imports can be moved to be lazy loaded to reduce bundle sizes and improve page performance or when important security headers are missing from your Next.js application before merging to production.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7cZFRecK5hsxsjKe3K3rOH%2F39cd51a49cb781b575d0290ee932244e%2FSpacesConformanceLight.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7Jz4eVymav4bQMXHADlb2d%2Fd11c4051ea0e56cd9d5507751c76138a%2FSpacesConformanceDark.jpg&w=1920&q=75)

### [Link to heading](#granularly-defined-code-ownership-with-code-owners)Granularly-defined code ownership with Code Owners

As a company grows, it can become difficult for any one person to be familiar with the entire codebase. As the growing teams start to specialize, it can be a common pain point to not know who is responsible for a given piece of code anymore.

With [Code Owners](https://vercel.com/docs/workflow-collaboration/vercel-spaces#code-owners), Vercel Spaces will help your organization collaborate better by making it easy to find who is responsible for code and make sure that code changes are reviewed by the right people, all the time.

Code Owners files are colocated with the code which makes it easy to contact the owner of a piece of code. Since code owners are stored in the directory tree of the code, code owners who are higher up in the directory tree act as broader stewards over the codebase and are the fallback if owners files go out of date. Additionally, Code Owners is integrated into Git hosting platforms to automatically add the appropriate people to code reviews. Code Owners also provides flexible reviewer selection algorithms, such as round robin assignment, team assignment, primary on-call assignment, and more.

![Visualize who owns code in your organization.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6u6ipu9aOUrPFhjiQaM0mN%2Fd43bffa2f57a9287d2127e5a6e54e6ef%2FSpacesOwnersLight.jpg&w=1920&q=75)![Visualize who owns code in your organization.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FGktqQF8RgDu0mJbf6YieX%2F66263dd6d03b2be5c3aca60e4872d43c%2FSpacesOwnersDark.jpg&w=1920&q=75)

Visualize who owns code in your organization.

### [Link to heading](#a-better-way-to-debug:-vercel-runs)A better way to debug: Vercel Runs

You may be familiar with the pain of scrolling through endless terminal logs to find the source of a build failure. [Vercel Runs](https://vercel.com/docs/workflow-collaboration/vercel-spaces#runs) offers a better solution, a new system for sending a user’s builds from any tool (local, continuous integration (CI), or deployments) to Vercel for visualization all in one dashboard. You'll get an easier way to debug a task through an interactive UI, and stores historical build logs allowing you to easily look back at past runs or view aggregate insights.

It includes the ability to debug individual builds, see insights from aggregate information, and improve the critical path by fixing slow tasks, such as bottleneck tasks. Any build tool will be able to integrate with the Vercel Runs API. This means that Turborepo users, for example, can send their Turbo runs data to Vercel dashboard for visualization with an easy reference to old builds to help debug issues.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FSn1kfO2arVm6mc1meP7c7%2F45c62a8cd30ceab5196ec16bfccc5670%2FSpacesRunsLight.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F16AbjPkaRQVHYwVU2WJRtz%2F384dfa946683e11a7823fd039125e742%2FSpacesRunsDark.jpg&w=1920&q=75)

Vercel Spaces gives you the tools to move fast as a team—without breaking things. Get started today.

[

**Get started**

If you're interested in Vercel Spaces, it is available for early access for Vercel Enterprise customers. Contact our team to learn more.

Contact Us



](https://vercel.com/contact/sales)