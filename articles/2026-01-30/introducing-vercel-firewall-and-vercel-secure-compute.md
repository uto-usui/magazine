---
title: "Introducing Vercel Firewall and Vercel Secure Compute"
source: "https://vercel.com/blog/vercel-security"
publishedDate: "2023-05-02"
category: "frontend"
feedName: "Vercel"
author: "Ty Sbano"
---

3 min read

May 2, 2023

We're bringing more enterprise-grade offerings for enhanced security of your applications and infrastructure.

Finding the right balance between developer experience and robust enterprise-grade security can be challenging. Developers want tools that streamline workflows and enhance productivity, while organizations prioritize security measures to protect sensitive data and meet compliance standards. At Vercel, we believe you can have the best of both worlds—exceptional developer experience and top-tier security.

Today we're excited to announce [Vercel Secure Compute](https://vercel.com/changelog/improve-infrastructure-security-with-vercel-secure-compute) and [Vercel Firewall](https://vercel.com/docs/security/vercel-firewall), in addition to existing security features in Vercel's frontend cloud, to enhance the protection of your applications and infrastructure.

-   Private connections with Vercel Secure Compute
    
-   DDoS mitigation and IP Blocking with Vercel Firewall
    
-   Seamless authentication through partnerships with leading security providers
    

## [Link to heading](#secure-connections:-https-and-secure-compute)Secure connections: HTTPS and Secure Compute

Secure connections are crucial when transmitting data between your application and backend infrastructure, whether you're handling user login credentials, processing payment information, or exchanging sensitive data with APIs.

We believe every application should be secure by default. That's why we encrypt data in transit and at rest with free, always-on SSL. This is a best-in-class security practice given to every customer and project on Vercel out of the box.

When it comes to securing connections between Serverless Functions and backend cloud infrastructure, some customers have additional regulations that require private infrastructure.

We're excited to introduce [Vercel Secure Compute](https://vercel.com/changelog/improve-infrastructure-security-with-vercel-secure-compute) for [Enterprise](https://vercel.com/enterprise) customers. By enabling Secure Compute, your deployments and builds will be placed in a private network with dedicated IP addresses and logically separated from other networks.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2mfvViu6tUDjCvIFRrRGkh%2Fa5f1f19a2a36295e316e70a87b351503%2Fdiagram__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F24xFB9T5QNl9SthCbMzR9p%2F83cbe985aa8793ddcac66629d6f456bd%2Fdiagram.png&w=1920&q=75)

With Secure Compute, you can create connections between your [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions), deployment builds, and backend cloud infrastructure to further restrict access to authorized sources.

[

**Get started**

For more information about IP blocking or Secure Compute on Vercel Enterprise, or if you require support for VPC peering or VPN connections, please contact our sales team.

Contact Us



](https://vercel.com/contact/sales)

## [Link to heading](#the-vercel-firewall)The Vercel Firewall

As your web applications become more interconnected and accessible, they also become more vulnerable to external threats. Among these threats, distributed denial-of-service (DDoS) attacks are particularly concerning, causing significant downtime, damage of user trust, and financial and reputational losses.

To help protect your applications from these threats, we're happy to introduce new capabilities to the Vercel Firewall: a security solution designed to defend your frontend cloud deployments. Vercel Firewall offers powerful DDoS mitigation capabilities to defend your applications so that they can remain available and responsive even in the face of large-scale DDoS attacks.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5IQm1dn6VInczYf2Mbmkp2%2Fc34b8879b76bbed92cfb65890b928900%2FIPOG_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3MI23NU0klasbSGR4EhV6X%2Fff56af345411d551f614fff2f428a4cd%2FIPOG_-_Dark.png&w=1920&q=75)

Our new custom firewall rules for [IP blocking](https://vercel.com/docs/security/vercel-waf/ip-blocking) allow you to restrict access to your applications or websites based on the IP addresses of incoming requests. This means you can block malicious actors via IP addresses from viewing your site, preventing unauthorized access or unwanted traffic.

By using IP blocking in conjunction with our automated DDoS mitigation, Enterprise users can further strengthen security posture and maintain control over who can access your applications and websites.

## [Link to heading](#authentication-and-authorization)Authentication and authorization

Authentication and authorization form the foundation of access control, ensuring that only trusted users can interact with your application and only perform actions within their designated permissions.

Thanks to a new era of robust, developer-first tooling like [Auth.js](https://authjs.dev/), [Clerk](https://vercel.com/integrations/clerk), and [Auth0](https://vercel.com/templates/auth0), you can manage auth with just a few lines of code.

> As a team and as a business we need to keep evolving with our customers and the threat landscape to ensure we are at the forefront of identity and security for our customers.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2z37RqIXrl5USshXUKHPX9/8bfb231453fa8a7c442cb597443756ea/image.png)
> 
> **Jameeka Green Aaron,** Chief Information Security Officer at Auth0

## [Link to heading](#continuous-monitoring-and-audits)Continuous monitoring and audits

While implementing robust security measures is essential for safeguarding your web applications, security is not a one-time effort—it requires continuous monitoring and vigilance.

We understand the critical role that monitoring plays in the security and performance of your frontend cloud deployments. That's why we introduced [Vercel Monitoring](https://vercel.com/docs/concepts/observability/monitoring/overview) and [Logs](https://vercel.com/docs/concepts/observability/runtime-logs), a comprehensive monitoring solution designed to provide you with actionable insights into your application's behavior, performance, and security.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6zN668NpMqmUu9VXM1XEA3%2F2c35188e100dae87c6e16518e93cf311%2FMonitoring_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7x6fy5fqRS6iDEAUHtSLpP%2Feb04820ad74408607983d870bc1c0b81%2FMonitoring_-_Dark.png&w=1920&q=75)

With Monitoring, you can quickly identify and diagnose issues, optimize performance, and ensure a seamless user experience. Whether you're seeing increased bandwidth and web traffic spikes or performance degradation on a request path, Vercel Monitoring provides visibility into Serverless Functions, API endpoints, or static assets. This makes it easier to form data-driven decisions and continuously improve your application.

Security is a cornerstone of successful frontend cloud adoption, and Vercel is dedicated to providing robust solutions that empower organizations to build and deploy with confidence. As we continue to innovate and expand our offerings, we remain committed to supporting you on your development journey, helping you create secure, performant, and resilient web applications that deliver exceptional experiences to users around the world.

[

**Take the next step**

Reach out to an expert to learn more about security on Vercel for your Enterprise.

Get in Touch



](https://vercel.com/contact/sales)