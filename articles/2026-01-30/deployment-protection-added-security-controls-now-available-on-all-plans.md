---
title: "Deployment Protection: Added security controls now available on all plans"
source: "https://vercel.com/blog/protecting-deployments"
publishedDate: "2022-12-19"
category: "frontend"
feedName: "Vercel"
author: "Kit Foster"
---

3 min read

Dec 19, 2022

Today we're thrilled to announce added privacy controls across all plans, including the ability to secure their preview deployments behind [Vercel Authentication](https://vercel.com/docs/concepts/deployments/deployment-protection#vercel-authentication) with just one click.

-   Protect previews for free across all plans with [Deployment Protection](https://vercel.com/docs/concepts/deployments/deployment-protection)
    
-   New ways to access and collaborate with [Shareable Links](https://vercel.com/docs/concepts/deployments/deployment-protection#shareable-links-\(beta\)) and Vercel Authentication
    
-   [Advanced Deployment Protection](https://vercel.com/docs/concepts/deployments/advanced-deployment-protection): Better E2E testing, private Production Deployments, and Password Protection
    

Alongside this announcement, we're adding a new set of features that make it frictionless for team members and external collaborators to work together on protected previews: [Shareable Links](https://vercel.com/docs/concepts/deployments/deployment-protection#shareable-links-\(beta\)), and [Advanced Deployment Protection](https://vercel.com/docs/concepts/deployments/advanced-deployment-protection#), now available to Pro teams and included in Enterprise plans.

## [Link to heading](#deployment-protection)**Deployment Protection**

Deployment protection offers flexible ways to make [Preview Deployments](https://vercel.com/docs/concepts/deployments/preview-deployments) private and accessible with Vercel Authentication or Shareable Links.

[Vercel Authentication](https://vercel.com/docs/concepts/deployments/deployment-protection#vercel-authentication) allows all Vercel users to log in with a Vercel account across the platform. Teams can now share protected previews with each other without having to enter additional security credentials. The same Vercel account they use to log in will work with their team's Preview Deployments. This provides an easy and frictionless way to collaborate while protecting pre-release products.

Vercel Authentication is replacing the existing “[SSO Protection](https://vercel.com/docs/concepts/security#sso-protection)” feature Enterprise customers use today. SAML SSO, that is using an external identity provider to log in along with directory sync, will continue to be a feature only available in the Enterprise plan.

![Share private preview deployments with people outside your team without the need to log in](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3YhocGQXMhBmUZMbCgt3rN%2Fedc79f3110f1b5a6e4094bb9ce53142d%2FBlog_-_Popover_Dark.png&w=1920&q=75)

Share private preview deployments with people outside your team without the need to log in

### [Link to heading](#shareable-links-\(beta\))**Shareable Links (Beta)**

We're also introducing [Shareable Links](https://vercel.com/docs/concepts/deployments/deployment-protection#shareable-links), a new way to share Preview Deployments with people _outside_ your Vercel Team. This feature allows external collaborators a way to access Preview Deployments without the need to enter additional credentials, by adding a query string to Preview URLs.

While a Vercel Account is not required to access deployment via Shareable Link, you'll still need to log into a Vercel account to collaborate with Comments.

Unlimited Shareable Links are available to Pro and Enterprise customers, and Hobby users can take advantage of 1 link at a time. These are configurable in your Vercel Dashboard.

## [Link to heading](#announcing-advanced-deployment-protection)**Announcing Advanced Deployment Protection**

Based on customer feedback from existing Password Protection users, we are making it easier for Teams and agencies to develop, preview, and test their applications, securely.

Today we're introducing [Advanced Deployment Protection](https://vercel.com/docs/concepts/deployments/deployment-protection#advanced-deployment-protection), made for teams with strong security requirements, or teams that need to grant programmatic access to the secured Preview Deployments. Advanced Deployment Protection can be added to any Pro plan for $150, and is included with all Enterprise plans. Current Password Protection users will automatically get upgraded to Advanced Deployment Protection.

![The header secret can be used to grant access to end to end testing tools](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4rjSlsyF5VUxoKbYwRdF77%2F7ae431ca09dfb7ab7d296beebffd89ea%2FBlog_-_Bypass_Dark.png&w=1920&q=75)

The header secret can be used to grant access to end to end testing tools

### [Link to heading](#bypass-for-automation-\(beta\))**Bypass for Automation (beta)**

As part of Advanced Deployment Protection, we are offering customers a header secret that can be used to grant secure access to previews programmatically. 

The header secret, for example, can be used to grant access to E2E (end-to-end) testing tools. E2E testing allows developers to simulate a real customer usage scenario through an automated tool. Users of these tools often struggle to allow these automated tools to access protected services.

### [Link to heading](#password-protection)**Password Protection**

For added security, Advanced Deployment Protection users are able to enforce a password to grant access to their Preview Deploys. Passwords can be configured in your Vercel dashboard.

### [Link to heading](#private-production-deployments-\(beta\))**Private Production Deployments (Beta)**

In some cases, customers need to lock down a Production Deployment. This could be the case of an internal tool, or a completely new domain launch on Vercel. By ticking a single box, production deployments can now also be protected in the same way as a Preview Deployment would. 

### [Link to heading](#next-steps)Next steps

For now, deployment protection needs to be turned on manually. To get started, head to your project settings and enable protect preview deployments under deployment settings.  
  
Learn more in the [documentation](https://www.vercel.com/docs/concepts/deployments/deployment-protection).