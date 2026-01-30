---
title: "Vercel WAF upgrade brings persistent actions, rate limiting, and API control"
source: "https://vercel.com/blog/vercel-waf-upgrade-brings-persistent-actions-rate-limiting-and-api-control"
publishedDate: "2024-10-02"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

4 min read

Oct 2, 2024

New Firewall capabilities reduce effects of DDoS attacks and enhance traffic control

At Vercel Ship, [we introduced](https://vercel.com/blog/introducing-the-vercel-waf) the new [Web Application Firewall (WAF)](https://vercel.com/docs/security/vercel-waf), an application-layer firewall that complements our platform-wide firewall. This enables our customers to implement custom or managed rulesets, such as protection against the OWASP Top 10 risks.

Since its release, Vercel’s WAF has blocked billions of malicious requests, demonstrating its resilience and reliability across a wide variety of use cases, from small startups to large enterprise deployments.

Today we're announcing:

-   **Persistent actions**: Block repeat offenders by applying rules across all matching requests for a customizable duration.
    
-   **Rate limiting**: Set request limits on specific endpoints to prevent API abuse while maintaining performance for legitimate users.
    
-   **Firewall API**: Programmatically control WAF settings to automate security workflows and integrate with third-party tools.
    

## [Link to heading](#bringing-new-enhancements-to-vercel-web-application-firewall)Bringing new enhancements to Vercel Web Application Firewall

These improvements further enable Vercel customers to serve desired traffic while taking action against anything else.

Vercel’s Challenge page, originally exclusive to the Vercel WAF, verifies browsers to ensure only legitimate users access applications. This feature is now extended to the broader Vercel Firewall, enhancing automated bot management and DDoS protection across the platform.

A key advantage of Vercel’s WAF is instant rule propagation. While traditional firewalls may take up to 20 minutes to apply updates globally, leaving applications vulnerable, Vercel’s Edge Network propagates rules worldwide in just 300 milliseconds—securing applications immediately.

Why does this matter? Because attackers look for short gaps in security. The ability to enforce rules instantly cuts off their window of opportunity and ensures your security policies are always active, no matter where the request is coming from.

[

**Block AI Bots - Firewall Rule**

Add a custom rule to your project's Firewall to detect common AI bots. This rule defaults to 'Log.' Change it to 'Deny' to block these bots.

Add Firewall Rule



](https://vercel.com/templates/vercel-firewall/block-ai-bots-firewall-rule)

## [Link to heading](#adding-persistence-to-rule-actions)**Adding persistence to rule actions**

Previously, each request was evaluated individually, even if similar ones had been blocked moments before. Now, with [persistent actions](https://vercel.com/docs/security/vercel-waf/custom-rules#persistent-actions), rules are applied to all matching requests for a customizable duration. This enhancement allows your firewall to remember malicious behavior, blocking it earlier in the lifecycle and preventing requests from consuming Vercel Edge resources unnecessarily.

Persistent actions are critical in defending against repeat offenders. Instead of wasting time and resources on redundant evaluations, Vercel’s WAF blocks threats as soon as they’re identified. This keeps your application efficient and focused on delivering for real users.

## [Link to heading](#rate-limiting-to-control-request-frequency)**Rate limiting to control request frequency**

With the growth of API-first architectures, controlling the flow of traffic is more important than ever. [Rate limiting](https://vercel.com/docs/security/vercel-waf/rate-limiting) is now [generally available](https://vercel.com/changelog/vercel-waf-rate-limiting-now-generally-available) in Vercel’s WAF, allowing you to set precise request limits for specific endpoints. This means you can prevent API abuse without disrupting the experience for legitimate users.

Persistent actions can be combined with rate limiting, allowing you to quickly block bad actors once identified, reducing resource strain efficiently.

You can set up both per-endpoint and general API rules for better traffic control. For example:

-   `/api/user` allows 5 requests per minute
    
-   `/api/*` allows 100 requests per minute
    

Requests containing `/api` would first be checked against `/api/user`. If the limit is exceeded, the action (e.g., log, block, challenge, or deny) would be applied immediately. If the request passes, it would then be checked against `/api/*`, and the action would be triggered if that limit is exceeded.

This layered approach provides precise control over specific endpoints while enforcing broader API limits.

![Granular rate limiting configuration to set actions, algorithms, time windows, request limits, and tracking keys, allowing precise control of traffic flow and safeguarding your APIs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4NCRulFX2koPWmjckJlp8S%2F6169f3d5ebe55612043a6e1f7f5e3356%2FRate_Limit_-_Light.png&w=1920&q=75)![Granular rate limiting configuration to set actions, algorithms, time windows, request limits, and tracking keys, allowing precise control of traffic flow and safeguarding your APIs.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3mQcM10HGxdtOLW8Bnv389%2F42da05730436490dcb74ea67af5a560d%2FRate_Limit_-_Dark.png&w=1920&q=75)

Granular rate limiting configuration to set actions, algorithms, time windows, request limits, and tracking keys, allowing precise control of traffic flow and safeguarding your APIs.

## [Link to heading](#programmatic-control-with-the-firewall-api)**Programmatic control with the Firewall API**

With the new [Firewall API](https://vercel.com/docs/rest-api/endpoints/security), you can now programmatically control WAF settings, automating your security workflows and integrating with third-party tools. This API lets you automatically adjust rules based on real-time traffic, helping you stay agile as conditions change.

For instance, if you have your own intelligence feeds or anomaly detection systems, you could programmatically create rules without any manual intervention. This level of automation is critical for teams running large-scale applications, providing flexibility and peace of mind.

The API covers the full range of Firewall features, so you can manage your WAF even when you’re not actively monitoring it. This is especially valuable for teams responsible for mission-critical applications that can’t afford downtime.

## [Link to heading](#why-vercel’s-approach-is-different)Why Vercel’s approach is different

What sets Vercel apart is the seamless integration of security with development. Unlike traditional WAF solutions that slow down deployment or require complex setups, Vercel’s WAF fits naturally into your development workflow. Security shouldn’t be a burden—it should work for you, not against you.

Vercel’s WAF is designed for speed and flexibility. Deploy security rules instantly and manage them programmatically. This means your team can focus on what matters: building, deploying, and iterating quickly, while knowing your app is protected from threats.

At Vercel, our goal is a web that’s secure by default. These WAF enhancements are a key part of that vision, ensuring you have the control and protection you need to keep your application fast, secure, and focused on serving real users.

[

**Rate Limit API Requests - Firewall Rule**

Add a custom rule to your project's Firewall to rate limit API requests. This rule defaults to 'Log.' Change it to 'Deny' to actually block these requests.

Add Firewall Rule



](https://vercel.com/templates/vercel-firewall/rate-limit-api-requests-firewall-rule)