---
title: "Creating a robust platform for documentation with Next.js and Vercel"
source: "https://vercel.com/blog/creating-a-robust-platform-for-documentation-with-next-js-and-vercel"
publishedDate: "2024-04-10"
category: "frontend"
feedName: "Vercel"
author: "Peri Langlois"
---

3 min read

Apr 10, 2024

Learn how Teleport unlocked a new customer acquisition channel by overhauling and migrating their documentation.

[Teleport](https://goteleport.com/blog/open-core-vs-saas-intro/), an open-core platform for secure infrastructure access, sought to unify and enhance their website and documentation. They needed a framework that could support dynamic content, provide a smooth developer experience, and ultimately provide a robust and up-to-date resource for their customers.

The team chose [Next.js](https://vercel.com/solutions/nextjs) and Vercel due to their compatibility with Teleport’s existing React-based frontend, their ease of integration, and their support for both static and dynamic rendering methods.

## [Link to heading](#migrating-to-serverless-hosting)**Migrating to serverless hosting**

Teleport’s documentation and website were previously split across MkDocs and Hugo, platforms that limited the team’s ability to implement dynamic components and manage documentation versions effectively. Teleport required a solution that could:

-   Integrate with a CMS for easy content updates
    
-   Support complex dynamic pages
    
-   Automate deployments through GitHub
    

Each of these features were challenging to implement with their existing setup. Teleport partnered with [Evil Martians](https://evilmartians.com/), a development consultancy, and leveraged their extensive experience in open source and Next.js to assist in migrating to Next.js and hosting on Vercel.

This migration met Teleport’s need for a serverless hosting solution that can integrate with GitHub for automated production deployments and can spin up unlimited Preview deployments on demand. At the same time, it ensured compliance with GDPR and met high [security standards](https://vercel.com/security) like SOC 2 Type II.

> Vercel-based Teleport docs and website are a huge success. Our engineers deploy multiple times per day without thinking about it, while always having the ability to preview their work. Before Vercel, deployment of docs was a manual process. Our docs teams and external contributors did not have a way to preview or collaborate with engineering. Vercel unlocked all those workflows and collaboration points for us. We could not be happier.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4Bfpka2sfKBmQ8EE97e3aV/234d8b98d0d6a7ef9d25668d2bf6c12b/image.png)
> 
> **CTO at Teleport**

## [Link to heading](#the-clear-value-of-custom-documentation)The clear value of custom documentation

The move to Next.js allowed Teleport to centralize their documentation and website under a single framework, streamlining development and ensuring brand consistency.

Next.js features like client routing, [server-side rendering (SSR)](https://vercel.com/docs/frameworks/nextjs#server-side-rendering-ssr), and inbuilt automatic SEO—along with `next/image` for [image optimization](https://vercel.com/docs/image-optimization)—significantly improved site performance and end user experience. Moreover, the ability to update content in real time without a full site rebuild via [CMS hooks](https://vercel.com/docs/integrations/cms) was a noted advantage in helping the team move faster.

Teleport and Evil Martians developed a custom documentation solution to address specific needs:

-   **Versioning**: Ability to build docs for different Teleport versions from Markdown files in various repository branches, simplifying the process of backporting changes and ensuring documentation remains up to date with code changes
    
-   **Migration ease**: Maintaining old MkDocs syntax during migration to avoid manual transfer and editing of a vast number of documents
    
-   **Dynamic features**: Introduction of new dynamic features such as shared user variables for code snippets, automated linking between doc versions, custom code blocks, and Mermaid.js charts, enhancing the documentation's utility and user engagement
    

## [Link to heading](#enhanced-collaboration-and-security-)**Enhanced collaboration and security** 

Vercel significantly cut down Teleport's build queue times by **more than 60%**. It also allowed for **3x more concurrent builds**, enabling developers to work on and deploy different parts of the application without delays. This efficiency was crucial for maintaining the team’s rapid development cycle.

Security enhancements were major, with Vercel's [Firewall](https://vercel.com/docs/security/vercel-firewall) and DDoS mitigation safeguarding Teleport’s digital assets. Additionally, the integration of [single sign-on (SSO)](https://vercel.com/docs/security/saml#authenticating-with-saml-sso) via Okta streamlined access management within Teleport's engineering team, ensuring that only authorized team members could make changes.

## [Link to heading](#a-new-customer-acquisition-channel)A new customer acquisition channel

With Vercel and Evil Martians, Teleport significantly improved their documentation portal, turning it into a key traffic and customer acquisition channel.

The Next.js and Vercel-powered platform streamlined Teleport’s deployment processes, allowing for multiple daily updates, easy previewing of changes, and enhanced collaboration across teams. The team has praised the move for its seamless deployment process and the collaboration and workflow benefits it enabled.

[

**Ready to get started?**

Our experts are here to help you explore how Vercel can safeguard your critical web applications and propel your business forward.

Contact Us



](https://vercel.com/contact/sales)