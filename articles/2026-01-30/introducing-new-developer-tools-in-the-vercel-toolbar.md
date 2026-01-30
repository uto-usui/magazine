---
title: "Introducing new developer tools in the Vercel Toolbar"
source: "https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar"
publishedDate: "2024-05-23"
category: "frontend"
feedName: "Vercel"
author: "Sam Saliba"
---

4 min read

May 23, 2024

Learn about the new tools for accessibility, interaction timing, and Open Graph images—and the ability to use the toolbar in production.

Vercel’s Frontend Cloud is all about giving you and your team the tools to prioritize the user experience—so you can focus on what makes your product great and quickly iterate together with your team.

This collaboration hasn’t always been easy. Either you’re relying on screenshots or simulated experiences, or it requires separate infrastructure to spin up and maintain complex staging pipelines. It can waste weeks of developer time, and at larger organizations, it can mean spending up to 30% more just on the dev, test, and staging environments.

Vercel integrates deployments directly into your workflow. Whether you use GitHub, Azure DevOps, or your own CI system, Vercel automates the deployment process. Every change committed results in a [live URL](https://vercel.com/docs/deployments/preview-deployments)—a standalone environment to share with collaborators.

This approach allows for faster iteration, enabling you to ship smaller changes without dependencies across teams or branches. Additionally, it facilitates real-world testing across browsers and interactions, ensuring that you can experience your product exactly as your users would.

![The Vercel Toolbar can be programmed to appear on any of your web pages in any environment.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F26VEIp7QztM32VQpsWN7L%2Ffda22cb46483e2df1d3bbf2863d55141%2FToolbar_in_Production.jpg&w=1920&q=75)![The Vercel Toolbar can be programmed to appear on any of your web pages in any environment.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3NROvt8I6jwYwZP36IWFgv%2Fdd01d7b4ff5ccb5bc4bda8287a4941bd%2FToolbar_in_Production-1.jpg&w=1920&q=75)

The Vercel Toolbar can be programmed to appear on any of your web pages in any environment.

Beyond automating CI/CD, the Vercel Toolbar offers a suite of tools designed to enhance collaboration and streamline development. And today, we’re announcing some new additions:

-   Accessibility tool
    
-   Open Graph tool
    
-   Interaction timing tool
    
-   Toolbar in production extension
    

## [Link to heading](#enhancing-developer-and-user-experiences)Enhancing developer and user experiences

The Vercel Toolbar is designed to improve collaboration and support your efforts to enhance accessibility and optimize performance. By incorporating it into your workflow, you can prioritize the user experience, iterate quickly, and deliver flawless products.

### [Link to heading](#accessibility-audits)Accessibility audits

Accessibility is a critical aspect of web development, and Vercel makes it easier than ever to ensure usability and compliance.

The Vercel Toolbar automatically checks your deployments against [Web Content Accessibility Guidelines 2.1](https://www.w3.org/TR/WCAG21/) Level A and AA rules, grouping them by impact as defined by [Deque axe](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-21-level-a--aa-rules). The accessibility audit reporting provides detailed information about failing elements and their associated rules, and you can turn on recording to track issues as you navigate the page.

![The accessibility audit tool is available on any page of your website and groups issues by impact.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4OWJGYm0tfvFIKNwTFJ41v%2Fffffcdeac627a160e0dedc5d1e044dc0%2FAccessibility_Audit__1_.jpg&w=1920&q=75)![The accessibility audit tool is available on any page of your website and groups issues by impact.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FyLHjznOBU5OOlh43ahpdT%2F6c3ba0dc81e53ba60254f451c421cacb%2FAccessibility_Audit-1__1_.jpg&w=1920&q=75)

The accessibility audit tool is available on any page of your website and groups issues by impact.

### [Link to heading](#open-graph-previews)Open Graph previews

The OG tool lets you see exactly how your OG cards will look on social platforms like X, Slack, Facebook, and LinkedIn.

This tool also provides information on any missing metadata your page needs to generate complete link previews.

![The OG tool generates previews of social media link cards for any of your web pages.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fdv7Pya0ZOgGm4fZ9UWIwe%2F447e05d0713978c5dfadb9e0c32d371d%2FOpen_Graph__OG___2_.jpg&w=1920&q=75)![The OG tool generates previews of social media link cards for any of your web pages.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1Ut4PwXS4lAKUKJdNp2I2J%2Fae2f8403f8fd95e2ea94182092c4883c%2FOpen_Graph__OG_-1.jpg&w=1920&q=75)

The OG tool generates previews of social media link cards for any of your web pages.

### [Link to heading](#interaction-timing-tool)Interaction timing tool

You can optimize your website's responsiveness and user experience by measuring and improving Interaction to Next Paint (INP). INP observes the latency of all click, tap, and keyboard interactions on a page, and reports on their durations.

A low INP means the page can consistently respond quickly to the vast majority of user interactions. Ensuring your pages respond quickly means providing your users with the best experiences and preventing them from exiting your site early.

![The interaction timing tool allows you to see and optimize your website's responsiveness.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ObTheZzdUptReJndkwY7q%2F1106b1833736cf127d05ddc878f7d902%2FInteraction_Timing__INP___2_.jpg&w=1920&q=75)![The interaction timing tool allows you to see and optimize your website's responsiveness.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6BiR4lsr8UjRdnctLEdyMi%2Fbefc48f7adbd7647551fa74157d9d4ea%2FInteraction_Timing__INP_-1.jpg&w=1920&q=75)

The interaction timing tool allows you to see and optimize your website's responsiveness.

### [Link to heading](#using-the-toolbar-in-production)Using the toolbar in production

Lastly, you can really customize your workflows by leveraging the toolbar in production with our new, [zero-config Chrome extension](https://vercel.com/docs/workflow-collaboration/vercel-toolbar/in-production-and-localhost#adding-the-toolbar-using-the-chrome-extension). This means that if you encounter an issue, suggestion, or typo while using your site, you can quickly flag it.

Tools like INP, layout shift, accessibility audits, and feature flag overrides can now be evaluated on your live site, providing additional insights. When in production, the toolbar is only visible to team members, making it the perfect internal bug-reporting tool.

## [Link to heading](#the-toolbar-toolkit-keeps-growing)The toolbar toolkit keeps growing

These new additions join an already robust set of tooling:

-   [Comments](https://vercel.com/docs/workflow-collaboration/comments): Give feedback directly on deployments with the Vercel Toolbar. Comment on anything from pricing pages to documentation and add screenshots and emojis for context. Then, convert comments into tickets in your tracking system (Linear, Jira, GitHub, or Slack) so you can close the loop quickly.
    
-   [Content](https://vercel.com/docs/integrations/cms): For teams using Vercel as the head for their headless applications, the toolbar provides a quick link to view and edit content in your CMS. When editable content is detected, a pencil icon appears, allowing you to link directly to that field in your CMS. Plus, you can toggle Draft Mode to preview changes before they go live—perfect for blog posts and landing page updates.
    
-   [Layout shift](https://vercel.com/docs/workflow-collaboration/layout-shift-tool): Identify and analyze layout shifts on your page, and get a summary of what caused the shift and how many elements were affected. You can replay and animate these shifts to see them again.
    
-   [Quick links](https://vercel.com/docs/workflow-collaboration/vercel-toolbar#using-the-command-menu): Switch between branches on preview and production branches or navigate to other deployments, teams, and projects.
    

Explore the Vercel Toolbar today and experience truly collaborative iteration in your development. Visit our [documentation](https://vercel.com/docs/workflow-collaboration/vercel-toolbar) to learn more and start enhancing your projects with Vercel's powerful tools. With Vercel, iterating on your product is no longer a separate step—it's a seamless part of your workflow.