---
title: "The Frontend Cloud: Powering resiliency for global web applications"
source: "https://vercel.com/blog/the-resiliency-of-the-frontend-cloud"
publishedDate: "2024-02-29"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

9 min read

Feb 29, 2024

Ensure business continuity and customer trust with an unbreakable web foundation.

Modern web apps are global, omni-channel and fast. Above all else they must be _available at all times._ Every second of website downtime translates to lost revenue and eroded customer trust.

﻿Leveraging Vercel's Frontend Cloud allows you to:

-   [Effortlessly scale to meet even the highest demand](#scale-to-infinity-\(and-back-down-to-zero\))
    
-   [Decrease pressure and reliance on backend providers](#high-availability-by-default)
    
-   [Actively and automatically defend against threats to your infrastructure](#built-for-security-methods-of-attack-mitigation)
    
-   [Have peace of mind that any service interruption will be rapidly and responsibly resolved](#maintaining-peace-of-mind-incident-response)
    

[

**No matter the traffic.**

Our experts will analyze your specific use case and ensure that Vercel keeps your site available to your users in every circumstance.

Contact Us



](https://vercel.com/contact/sales)

## [Link to heading](#scale-to-infinity-\(and-back-down-to-zero\))Scale to infinity (and back down to zero)

We say _scale to infinity_ a lot in Vercel’s marketing materials. It’s a fun phrase, but what does it mean for your site's massive traffic spikes, such as [Black Friday](https://vercel.com/resources/how-to-prepare-your-site-for-black-friday-traffic#see-it-in-action-nzxt-scales-for-black-friday-with-no-downtime) or [a major swag drop](https://vercel.com/blog/serving-millions-of-users-on-the-new-mrbeast-storefront)?

> To keep up with our incredibly spiky traffic and the sheer amount of data streaming in, we need a solution that has the primary benefit of static sites—easy and instant scalability—with the benefit of dynamic sites—responsive to quickly-changing data—without rebuilding the whole project.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/7tv9Zxec6QDA8MHAj7bUhZ/62cd231f3c006d3b7576a1df4c245809/images)
> 
> **Tyler Fisher,** Principal Software Engineer

In contrast to traditional server-based environments, where resource allocation and load balancing are manual infrastructure concerns that can limit application responsiveness and scalability, the [serverless architecture of the Frontend Cloud](https://vercel.com/blog/the-foundations-of-the-frontend-cloud#what-is-serverless-architecture) dynamically manages compute resources for each request.

**This ensures that each interaction, regardless of the number of users or the intensity of demand, is processed with the same efficiency and speed.** It also means that you only pay for the traffic your site experiences. No more preallocation guessing games or load-balancing.

Plus, your whole website—whether static or dynamic, gets [granularly cached on Vercel’s Edge Network](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud), which has [18 compute-capable data](https://vercel.com/docs/edge-network/regions) centers across the globe, with [over 100 points of presence (POPs)](https://vercel.com/docs/edge-network/regions#regions-and-content-delivery) to route traffic to your users with maximal efficiency.

**There’s no reason that millions of user requests couldn’t go through at any given time**, and thanks to serverless and intelligent caching, all end-users get the same low-latency experience. Your business can seamlessly handle traffic spikes without any manual intervention.

We say you can _scale_ _to infinity_ because we haven’t found a practical limit. We say you can scale to zero because your business costs should be predictable, even if traffic isn't.

> Vercel is the best and easiest platform for high-traffic product launches. Our site handled a 350% traffic spike flawlessly without thinking too hard on our backend infrastructure.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/19NEge335ArEg0xHYJcRgJ/8aa9b36867eb1d4583a25c00369fa806/blush_logo_2.png)
> 
> **Jason Donnette,** Co-founder

With Vercel's serverless infrastructure and Edge Network capabilities, major clients such as Under Armour, Sonos, and NZXT have drastically increased site performance, even during peak traffic events like Black Friday and Cyber Monday. NZXT, for instance, experienced a 20% improvement in page performance at _peak_ traffic.

Vercel has also been the platform of choice for _The Washington Post_ during the [high-stakes election night](https://vercel.com/customers/washington-post-next.js-vercel-engineering-at-the-speed-of-breaking-news), who noted that, with Vercel, "it was the smoothest election night anyone could remember."

[

**Scale without limits.**

Let's discuss how Vercel handles your application's demand, freeing you to focus on building innovative applications, not managing infrastructure.

Contact Us



](https://vercel.com/contact/sales)

## [Link to heading](#high-availability-by-default)High availability by default

Scalability is only one part of network resiliency. Just as challenging is ensuring your application stays up even if major providers go down.

Architecting and sustaining "four nines uptime" (99.99%) multi-region cloud infrastructure is inherently complex and costly. Vercel simplifies this with [built-in high-availability features](https://vercel.com/blog/effortless-high-availability-for-dynamic-frontends) that require no additional setup or maintenance overhead.

### [Link to heading](#regional-failover)**Regional failover**

In the case of a large-scale regional cloud outage, Vercel enables applications to switch to backup regions automatically. This works both for traffic routing _and_ the execution of serverless functions.

For traffic, Vercel’s use of [optimized global Anycast routing](https://vercel.com/blog/effortless-high-availability-for-dynamic-frontends#initiating-at-edge-optimized-global-routing) automatically directs user requests to the nearest available network edge, in the rare event of a full-region outage.

With serverless functions, customers often run their primary compute in a single or small number of regions, to maintain proximity to their data. This is why Vercel allows choosing your specific [Function Failover](https://vercel.com/docs/functions/configuring-functions/region#automatic-failover) region, for as little disruption to end users as possible.

![Vercel Functions can automatically failover to the next healthy region.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F73E2VtKMiFQdc0TWrwALLN%2F2ffa45c47f1af6486ed39f9634db867b%2FCron_-_Light__1_.png&w=1920&q=75)![Vercel Functions can automatically failover to the next healthy region.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4b2AOibC1Fqr1mIA8UYw3I%2F9edad61a3902738eab2cab7a0d90b307%2FCron_-_Dark__1_.png&w=1920&q=75)

Vercel Functions can automatically failover to the next healthy region.

### [Link to heading](#durable-caching)**Durable caching**

Vercel’s Edge Network [automatically and granularly caches](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud#vercel's-edge-network) your application as your users access it. For instance, with Next.js, if one piece of component-level data changes, Vercel can recache just that component, without an application redeploy.

This means you don't need to roundtrip to your backend for the majority of the time users see data. **Granular, durable caching greatly reduces demand on your backend infrastructure and helps prevent it from buckling under traffic spikes.**

If, however, any of your backend providers do go down, Vercel's Edge Network will continue to serve your cached content in a `stale-if-error` state indefinitely. This ensures uninterrupted, fast-as-static read access for users. While this cached content might be temporarily out-of-date, it provides a significantly better user experience than downtime.

Plus, once your backend provider returns online, the Frontend Cloud will once again granularly update your data, without an application redeploy or even (with Next.js) a page reload.

### [Link to heading](#backend-failover)Backend failover

When you need to ensure high availability for backend, [Vercel’s Edge Config](https://vercel.com/docs/storage/edge-config) allows pushing configuration updates to your global compute fleet with minimal latency and _without requiring redeployment_. This makes it ideal for the failover of your application to a backup system.

For instance, if your primary database has an outage, you can use Edge Config to quickly re-route your compute to use a new database address. You have extensive tooling to configure data redundancy and customize where to send your users in case of failure.

### [Link to heading](#instant-rollback)Instant rollback

If, for any reason, a mission-critical bug makes it to your production deployment, Vercel offers the ability to instantly roll back to any previous deployment—without a rebuild.

There are [many ways to set up testing](https://vercel.com/blog/the-developer-experience-of-the-frontend-cloud#testing) and even [create smart Conformance rulesets](https://vercel.com/blog/the-developer-experience-of-the-frontend-cloud#conformance) to ensure pushes to prod never bring you down, but the big red button is always there if you need it.

![With Instant Rollback you can quickly revert to a previous production deployment, making it easier to fix breaking changes.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3JEhweT5UIYswp7WRSKEoP%2F026052f99caefc83656b515c3a996c21%2FInstant_Rollback_-_Light_Mode.png&w=1920&q=75)![With Instant Rollback you can quickly revert to a previous production deployment, making it easier to fix breaking changes.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4XIYQMxt9cbMmKQnl8oVFy%2F0ff472f8001ccde68984f910959cab24%2FInstant_Rollback_-_Light_Mode__1_.png&w=1920&q=75)

With Instant Rollback you can quickly revert to a previous production deployment, making it easier to fix breaking changes.

### [Link to heading](#resiliency-testing)Resiliency testing

Vercel conducts [recurring resiliency testing](https://vercel.com/docs/security#resiliency-testing) for all network infrastructure. These tests, which simulate regional failures, also benchmark recovery time and alert on any disruptions.

It’s this level of service that lets Vercel’s Frontend Cloud be trusted by so many industry leaders. Customers such as Unity, [Box.com](http://box.com/), Patreon, Notion, and [Loom](https://vercel.com/customers/loom-headless-with-nextjs) rely on Vercel for seamless service with zero downtime.

> Last Black Friday and Cyber Monday was the first in NZXT’s 20-year history with zero downtime. That literally translates to millions of dollars.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/01qtzFO3wzCnV7THL8zweS/3b979b89f8a7a6094f0328962c7df320/NZXT_logo.png)
> 
> **Director of Engineering,** NZXT

## [Link to heading](#built-for-security:-methods-of-attack-mitigation)Built for security: Methods of attack mitigation

But what if someone _tries_ to take your app down? With large-scale applications come high business costs for any point of failure.

That’s why Vercel's Frontend Cloud takes a multi-faceted approach to security that includes [industry-standard compliance measures](https://vercel.com/docs/security#), [data encryption](https://vercel.com/docs/security#data-encryption), and [threat detection in its infrastructure](https://vercel.com/docs/security/vercel-waf).

### [Link to heading](#managed-infrastructure)**Managed infrastructure**

_Managed infrastructure_ means that Vercel is [responsible for your application’s underlying infrastructure](https://vercel.com/docs/security/shared-responsibility), including its security and availability.

**Because the Frontend Cloud has specialized teams dedicated to maintaining and protecting its infra, this weight gets lifted off your organization.**

The security measures of the Frontend Cloud are based on years of learning, implementation, battle-testing, and compliance—and implemented in your codebase by default.

### [Link to heading](#threat-detection)Threat detection

Since the Frontend Cloud brings [underlying infrastructure into one cohesive environment](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud#how-does-caching-work), it can also comprehensively search that infrastructure for connected patterns of malicious behavior.

Vercel Firewall offers [robust Distributed Denial of Service (DDoS) mitigation](https://vercel.com/docs/security/ddos-mitigation) through continuous monitoring of traffic. DDoS mitigation blocks harmful traffic while allowing legitimate requests to pass through, and dynamically scales resources during a DDoS attack to absorb the increased traffic, preventing applications or websites from ever being overwhelmed.

With [Attack Challenge Mode](https://vercel.com/docs/security/attack-challenge-mode), you can further protect against DDoS attacks and quickly lock down traffic by challenging requests, minimizing the chance that malicious bots get through. When temporarily enabled, all visitors to your site will see a challenge screen before they are allowed through.

![Vercel Firewall allows you to write custom IP blocking rules.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6AyOhvbySmnax3bTWHOCBR%2F759e82815988ac00fbaa1d301af12258%2FIPOG_-_Light.png&w=1920&q=75)![Vercel Firewall allows you to write custom IP blocking rules.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ufMZnimCduLfCLnNiUj0p%2Fbddd6fc54f1d37af2ed6cafd3783d059%2FIPOG_-_Dark.png&w=1920&q=75)

Vercel Firewall allows you to write custom IP blocking rules.

Additionally, custom firewall rules for [IP blocking](https://vercel.com/docs/security/firewall-rules#ip-blocking) allow you to restrict access to your applications or websites based on the IP addresses of incoming requests. This means you can block malicious actors via IP addresses from viewing your site, preventing unauthorized access or unwanted traffic.

When possible, the Frontend Cloud also offers [proactive protection against major provider vulnerabilities](https://vercel.com/changelog/vercel-firewall-proactively-protects-against-vulnerability-in-the-clerk-sdk). Vercel works hard to ensure that [vulnerabilities are patched](https://vercel.com/changelog/vercel-has-proactively-protected-against-a-vulnerability-in-the-sentry-next) at the network level while the provider creates an official patch.

### [Link to heading](#isolated-systems-and-private-connections)Isolated systems and private connections

Next is the idea of “[zero trust](https://www.crowdstrike.com/cybersecurity-101/cloud-security/cloud-security-best-practices/)”—the Frontend Cloud isolates all systems by default. Each serverless function, for instance, is inherently isolated from every other function, which means attacks don't spread across systems.

This concept is stretched across all Vercel’s infrastructure, where unique systems don’t keep open access to each other, but rather reestablish conditional connections per request.

If your organization needs more assurance, Vercel's Frontend Cloud offers [isolated build infrastructure](https://vercel.com/docs/security#do-enterprise-accounts-run-on-a-different-infrastructure) and even [entire private networks](https://vercel.com/docs/security/secure-compute) for enterprise customers.

![With Secure Compute, you can create connections between your Vercel Serverless Functions, deployment builds, and backend cloud infrastructure to further restrict access to authorized sources.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4vybCXVjYgoa7DEedlSB7j%2F0296e8cfbb4a847864a4149ee6dcbec5%2Fdiagram__1_.png&w=1920&q=75)![With Secure Compute, you can create connections between your Vercel Serverless Functions, deployment builds, and backend cloud infrastructure to further restrict access to authorized sources.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4TBU3ii91BqXLPSJ4gtf6S%2Fb5168907807fb269c13e4def4cb95419%2Fdiagram.png&w=1920&q=75)

With Secure Compute, you can create connections between your Vercel Serverless Functions, deployment builds, and backend cloud infrastructure to further restrict access to authorized sources.

Within Vercel's Frontend Cloud, you can create private connections between Serverless Functions and your backend cloud, such as databases and other private infrastructure.‌ This also allows you to securely connect your frontend on Vercel to services like Kubernetes, Terraform, and more.

### [Link to heading](#deployment-authentication-and-saml-sso)Deployment Authentication and SAML SSO

Your deployments within the frontend cloud also benefit from zero-trust architecture and access to them is restricted by default. Vercel offers various methods of authentication for more [fine-grained control of your deployment protection](https://vercel.com/docs/security/deployment-protection).

One such authentication method, for enterprise users, is [Vercel’s SAML Single Sign-On (SSO) integration](https://vercel.com/docs/security/saml), which enhances security and efficiency for your entire business.

By providing a unified login across various applications, SAML SSO reduces security risks, eliminating the need for multiple credentials and lowering the chance of phishing or other unauthorized access.

SAML SSO also centralizes access management, streamlining the onboarding process, permission adjustments, and compliance adherence—all of which optimize IT resources.

This all, in turn, improves employee productivity, reducing login interruptions in day-to-day responsibilities.

[

**Industry-leading security.**

Learn more about Vercel's robust security and DDoS mitigation for your critical applications.

Talk with an Expert



](https://vercel.com/contact/sales)

## [Link to heading](#maintaining-peace-of-mind:-service-interruption-response)Maintaining peace of mind: Service interruption response

When the unexpected occurs, Vercel's robust service interruption response process ensures timely resolution and transparent communication with customers.

-   **Proactive monitoring and early detection:** Vercel's infrastructure is closely monitored for potential anomalies. Alerting systems signal issues early, allowing our teams to respond before they escalate into widespread incidents.
    
-   **Swift initial response:** When an incident is detected, a dedicated response team is assembled immediately. This team includes engineers, product experts, and communication specialists with deep knowledge of Vercel's infrastructure.
    
-   **Structured triage and prioritization:** Incidents are classified based on impact and severity to prioritize the most critical issues. This structured approach allows for efficient resource allocation and faster resolutions.
    
-   **Transparent and timely updates:** On our [public status page](https://www.vercel-status.com/), we commit to providing regular and clear updates about service degradation and issues impacting the platform. This includes details on incident status, the scope of impact, and steps being taken to resolve the situation.
    
-   **Post-incident analysis:** We conduct a thorough root-cause analysis (RCA) to identify the underlying causes of incidents and prevent future occurrences. Lessons learned are used to continuously enhance our incident response and overall system reliability.
    
-   **Commitment to reliability:** Vercel's uptime history demonstrates our dedication to maintaining a robust and resilient platform. You can find [historical incident reports](https://www.vercel-status.com/history) on our status page, allowing you to make informed decisions.
    

Knowing that Vercel has a comprehensive incident response plan empowers you to focus on building and innovating rather than worrying about downtime. Our rapid response procedures aim to reduce the reach and duration of problems, protecting your end-users from negative experiences.

**We understand that your business relies on Vercel. Our Incident Response Process reflects our commitment to being a steadfast steward of your critical applications.**

## [Link to heading](#why-choose-the-frontend-cloud)Why choose the Frontend Cloud?

In this article, we discussed the Frontend Cloud’s resiliency, through the lenses of application scalability, network availability, and infrastructure security.

We explored how the Frontend Cloud:

-   Can process millions of user requests at a given time in its globally distributed data centers.
    
-   Lessens the load on your backend infrastructure and keeps your application fully available, even if multiple service providers go down.
    
-   Adopts a multi-faceted approach to security, with a zero-trust model—backed by industry-accepted compliance certifications and attestations.
    
-   Is regularly battle-tested by huge companies conducting business around the globe without interruption.
    
-   Responds efficiently and transparently to service degradation, ensuring you can focus on building your product.
    

Vercel's Frontend Cloud empowers you to deliver an effortless and secure customer experience, no matter the circumstance. It's the foundation for business continuity, growth, and resilience.

[

**Ready to get started?**

Our experts are here to help you explore how Vercel can safeguard your critical web applications and propel your business forward.

Contact Us



](https://vercel.com/contact/sales)