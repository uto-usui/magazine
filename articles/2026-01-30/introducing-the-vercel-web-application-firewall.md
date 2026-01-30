---
title: "Introducing the Vercel Web Application Firewall"
source: "https://vercel.com/blog/introducing-the-vercel-waf"
publishedDate: "2024-05-23"
category: "frontend"
feedName: "Vercel"
author: "Andrew Barba"
---

3 min read

May 23, 2024

Application-aware, Vercel-native protection that brings the web one step closer to being secure by default.

In any given week, Vercel blocks around 1 billion suspicious TCP connections, with some days seeing upwards of 7 billion malicious requests. The Vercel Firewall has been silently mitigating DDoS and Layer 3/4 attacks, but it's been operating as a black box with limited transparency.

We believe security should be built into every step of the development process. This is why we're dedicated to improving our security suite by giving you greater visibility and the control you need to understand and manage your sites hosted on Vercel.

Today, we're introducing the Vercel Web Application Firewall (WAF), adding an extra layer of defense against a wider range of web threats directly within the Vercel platform, so you can deliver modern web experiences with uncompromising speed, scalability, and protection.

## [Link to heading](#next-level-security,-seamlessly-integrated)**Next-level security, seamlessly integrated**

The Vercel-native WAF provides first-party security at the edge—reducing latency and ensuring only legitimate users access your application. Embedded in the Vercel ecosystem, the WAF deploys automatically, with no additional routing rules, external tools, or complex integrations required.

**All plans** now offer granular Layer 7 control over application entry points to block unwanted traffic, plus the new [Attack Challenge Mode](https://vercel.com/docs/security/attack-challenge-mode) and existing real-time [DDoS mitigation](https://vercel.com/docs/security/ddos-mitigation) via our platform-wide firewall.

![The new Vercel Firewall.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4RLSBW3B7KIz8zkum2MP7N%2F2d333b901ce8720725c8ad5f95ef77a2%2FFirewall_Blog_-_Hero_-_Light.png&w=1920&q=75)![The new Vercel Firewall.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4RshEIkQBqPUQyMBo3BCi1%2F199f985c0a517e51728e9d298e5dcc11%2FFirewall_Blog_-_Hero_-_Dark.png&w=1920&q=75)

The new Vercel Firewall.

## [Link to heading](#powerful-features-for-comprehensive-protection)**Powerful features for comprehensive protection**

The Vercel WAF protects your apps from diverse threats with a powerful feature set, including:

-   **Customizable rules engine:** Define granular rules based on path, user agent, IP address, geolocation, JA4 fingerprints, and target paths to control how traffic is handled. For example, you could create a rule to block all traffic from a specific country, only allow access to certain paths based on user roles, or only allow connections from a known list of browsers
    
-   **Framework-aware rules:** Define rules based on your frameworks' routes rather than fiddling with regular expressions or prefixes
    
-   **Managed rulesets:** Enterprise customers can enable managed rulesets designed to combat specific use cases, including prevention against the OWASP Top 10 risks
    
-   **Observability:** Gain insights into key security metrics for streamlined security management, allowing you to monitor threats and connections being managed by your WAF and the platform-wide firewall in real-time, ensuring comprehensive protection and operational transparency
    
-   **Rate limiting (beta):** Enforce frequency limitations on users attempting to access your application, ensuring even legitimate users access resources as you intend
    
-   **Instant propagation:** Firewall changes are reflected globally within 300ms
    
-   **Instant rollback:** Instantly revert to previous ruleset configurations to revert unintended rule creation
    

![You can add firewall rules directly inside the Vercel dashboard.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4KhFtIZLAtqaDz1QFwMpUB%2F6b814d47ff1d2a54770a8d53da0ed5ca%2FFirewall_Blog_-_Custom_Rules_-_Light.png&w=1920&q=75)![You can add firewall rules directly inside the Vercel dashboard.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1Mvp9OFJtZUZ2FC8G4eemM%2F99b85df553883bbd70b9aeea9caba202%2FFirewall_Blog_-_Custom_Rules_-_Dark.png&w=1920&q=75)

You can add firewall rules directly inside the Vercel dashboard.

## [Link to heading](#secure-by-default:-the-vercel-approach)**Secure by default: The Vercel approach**

Security is a foundational pillar of everything we build at Vercel. Our commitment to security enables your team to focus on rapid iteration while remaining secure.

Our vision for Vercel security is that we empower a web that's secure by default. To achieve this vision, we're continuously investing in both new and existing security solutions. The introduction of the WAF represents an important moment in our journey towards leading security for the Frontend Cloud.

This can be achieved by leveraging Vercel's unique [framework-defined infrastructure (FdI)](https://vercel.com/blog/framework-defined-infrastructure) and inherent understanding of your application. Through FdI, the Vercel WAF is able to leverage a deep understanding of your application, which paves the way for intelligent decision-making based on the context and content of every edge request.

## [Link to heading](#security-without-compromise)**Security without compromise**

The Vercel WAF empowers you to build and deploy secure applications without sacrificing performance, ease of use, or search engine optimization (SEO).

[

**Ready to experience next-level security?**

Explore the Vercel WAF documentation and start securing your applications today.

Learn more



](https://vercel.com/docs/security/vercel-waf)