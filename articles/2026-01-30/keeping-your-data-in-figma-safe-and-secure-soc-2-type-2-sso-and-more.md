---
title: "Keeping your data in Figma safe and secure: SOC 2 Type 2, SSO, and more"
source: "https://www.figma.com/blog/keeping-your-data-in-figma-safe-and-secure/"
publishedDate: "2019-08-27"
category: "design"
feedName: "Figma Blog"
---

**Update January 28, 2020**

When we first wrote this post, we had achieved our SOC 2 Type 1 certification and were in the process of pursuing SOC 2 Type 2.

Today, we’re excited to share that Figma has successfully completed our SOC 2 Type 2 certification.

You may be wondering, what’s the difference?

You can think of SOC 2 Type 1 as a snapshot in time report. While valuable, SOC 2 Type 2 provides additional assurance of data security, because it requires an audit of how internal controls are working over time. Figma also secured a SOC 3 report, which summarizes the SOC 2 Type 2 report, and can be [downloaded here](https://app.conveyor.com/datarooms/9dbf4de8-de63-4b95-b8fb-52a1cd414792).

We are committed to protecting our customers’ data and design IP, and will continue to invest in our platform security.

At Figma, we focus on building new features that our customers love to use, like Smart Selection, GIFs in prototypes, plugins, and many more. But we are just as invested in what happens behind the scenes that keeps your data and design IP safe.

The Infrastructure team's mission is to build a platform that is powerful, fast, and secure. That way we can support faster innovation and snappier user experience. To achieve this mission, the safety and security of users' data is paramount for us; it is the cornerstone for the trust you place in us when you store your design IP with Figma.

To accomplish this, security is part of everything we do. It’s top of mind in how we work, treat customer data, and develop our product. Here are a few recent security improvements we’ve made to Figma:

## [We got SOC 2 Type 1 certified](#we-got-soc-2-type-1-certified)

We’re pleased to announce that we’ve successfully completed our SOC 2 Type 1 certification! In case you’re new to SaaS security, here’s why this is important to you. SOC 2 is the standard for security compliance for software companies in the United States. Its guidelines and policies are designed to help businesses like Figma protect customer data that’s stored in the cloud.

In order for companies to be SOC 2 certified, they must undergo an audit of their infrastructure, software, HR processes, and policies around handling customer data to ensure they have all the necessary security procedures and controls in place. Getting SOC 2 Type 1 certification is only the first step. We are currently pursuing SOC 2 Type 2 certification, where we continue to validate and demonstrate our security operations over time. Stay tuned in the latter part of 2019 for more SOC 2 updates.

## [We’re ready for our European customers](#we-re-ready-for-our-european-customers)

Whether you’re already headquartered in Europe or looking to expand internationally, Figma is ready for you. As Figma’s customer base continues to grow quickly throughout Europe, we must meet the security and compliance requirements in the European Union and beyond. Figma complies with data protection requirements and is certified under both the EU-US Privacy Shield Framework and the Swiss-US Privacy Shield Frameworks.

## [Security is top priority for every new feature](#security-is-top-priority-for-every-new-feature)

Since the [launch of Figma Plugins](https://www.figma.com/blog/introducing-figma-plugins/)

, it’s been incredibly exciting to see our customers build plugins on our platform. But opening up our platform meant we had to be thoughtful about what we give developers access to, so we can uphold our standards around security, stability, and performance.

Rudi Chen, one of the software engineers behind our plugins platform, recently wrote a [great in-depth article](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/)

on our engineering approach. Security was the top priority, perhaps even at the expense of additional platform capabilities. For example, we made sure Figma Plugins could only access a single design file and never a user’s entire account; one plugin also cannot access another plugin’s data. The team also made the decision to not allow a Figma Plugin to change the Figma UI, leading to potential user misdirection (and making the user vulnerable to phishing attacks).

Without spoiling more of [Rudi’s post](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/)

, I highly encourage you to dive in and read about what our team learned and the technical risks we took in our development journey.

## [SAML + Figma = 👍](#saml-figma)

Lastly, we know your organization requires a certain level of enterprise security. Integrations with your preferred SAML SSO provider not only makes logging into Figma easier, but it enables you to securely deploy Figma to your entire organization and control all user access. We now integrate with OneLogin, along with previously-supported Okta and Microsoft Azure Active Directory.

Looking for more good reads?\- Peruse all the details regarding our [security](https://www.figma.com/security/) and [privacy](https://www.figma.com/privacy/) policies\- Check out the latest product updates on our [What’s New page](https://www.figma.com/whats-new/)\- [Contact sales](https://www.figma.com/organization/) for a 1:1 chat about Figma Organization