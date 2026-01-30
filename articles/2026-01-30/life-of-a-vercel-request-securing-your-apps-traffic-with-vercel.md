---
title: "Life of a Vercel request: Securing your app's traffic with Vercel"
source: "https://vercel.com/blog/life-of-a-request-securing-your-apps-traffic-with-vercel"
publishedDate: "2024-12-05"
category: "frontend"
feedName: "Vercel"
author: "Dan Fein"
---

4 min read

Dec 5, 2024

In any given week, Vercel Firewall blocks over one billion malicious connections—proactively safeguarding your app before the first request arrives. Defining access rules ensures your infrastructure scales only for legitimate traffic, keeping resources secure and associated costs in check.

With Vercel, application protection is integrated into every step of the request lifecycle. It starts with the platform-wide Vercel Firewall—active by default for all users—and extends to Deployment Protection and the Web Application Firewall (WAF) which give you granular security control and defense-in-depth.

[

**Catch up: Read Part I**

Life of a Vercel request: What happens when a user presses enter

Read now



](https://vercel.com/blog/life-of-a-vercel-request-what-happens-when-a-user-presses-enter)

## [Link to heading](#the-first-line-of-defense:-vercel's-platform-wide-firewall)The first line of defense: Vercel's platform-wide firewall

When requests reach Vercel’s globally distributed Points of Presence (PoP), the Vercel Firewall immediately inspects those requests. This automated, system-wide protection is designed to block threats like Distributed Denial of Service (DDoS) attacks, malicious TCP connections, and other common infrastructure abuses before they escalate.

The Firewall employs a multi-layered approach to address different types of malicious activity:

-   **Network-layer protection (Layer 3):** Detects and blocks large-scale DDoS or [SYN flood](https://en.wikipedia.org/wiki/SYN_flood) attacks targeting your app
    
-   **Transport-layer protection (Layer 4):** Prevents malicious traffic, such as [UDP floods](https://en.wikipedia.org/wiki/UDP_flood_attack), from progressing into your infrastructure
    
-   **Application-layer protection (Layer 7):** Mitigates targeted attacks, including [HTTP floods](https://en.wikipedia.org/wiki/HTTP_Flood) or [Slowloris](https://en.wikipedia.org/wiki/Slowloris_\(cyber_attack\)) attempts
    

### [Link to heading](#scalable-and-reliable-usage-protections)Scalable and reliable usage protections

The firewall integrates with Vercel’s globally distributed PoPs, ensuring that attacks are mitigated close to their source. This minimizes the impact on application resources and prevents unnecessary costs from malicious traffic.

The platform-wide firewall is fully managed by Vercel and requires no configuration, offering enterprise-grade security out of the box and allowing developers to focus on building their application rather than managing infrastructure.

This first layer of defense is free to all customers, on all plans, and helps block hundreds of millions of illegitimate requests daily, saving customers time and money. When threats are blocked at the platform level—like a [recent DDoS attack that peaked at 1.37 Tbps](https://vercel.com/blog/preventing-infrastructure-abuse-with-vercel-firewall) and was mitigated without downtime or manual intervention—your app stays untouched, and no usage costs are incurred.

At this early stage in the request lifecycle, Vercel Firewall enforces blocks already activated by your WAF to stop repeat offenders (called persistent actions, more on this below). System defenses, [IP Blocks](https://vercel.com/docs/security/vercel-waf/ip-blocking), and WAF persistent actions all operate without incurring any usage costs.

### [Link to heading](#deployment-protection:-evaluating-requests-before-the-waf)Deployment Protection: Evaluating requests before the WAF

After passing through the platform-wide Firewall, which blocks large-scale attacks and infrastructure-level threats, requests are evaluated by [Deployment Protection](https://vercel.com/docs/security/deployment-protection). This project-level security layer determines whether a request is permitted to proceed based on deployment-specific access rules.

Part of what sets Vercel apart is its framework-defined infrastructure, which enables rapid deployment of web applications. Every commit automatically provisions its own infrastructure across environments like preview, staging, and production. While these environments can be publicly accessible, Deployment Protection lets you control access—by Vercel account, password protection, or a range of trusted IPs—ensuring only authorized users can interact with your deployments.

## [Link to heading](#the-next-layer:-customizable-web-application-firewall)The next layer: Customizable Web Application Firewall

During [this year's Black Friday–Cyber Monday weekend](https://vercel.com/blog/black-friday-cyber-monday-2024-recap), Vercel’s platform processed over 86 billion requests, blocking over 6 billion threats, or ~8% of total inbound requests. Most were stopped by system defenses, with the rest managed by customer-defined web application firewall rules.

While the platform-wide firewall delivers global protections, web applications often require more tailored security measures. This is where the Vercel WAF comes in—providing developers with a flexible, defense-in-depth security strategy with the flexibility to implement their own business logic to determine which traffic to serve.

-   [**Attack Challenge Mode**](https://vercel.com/docs/security/attack-challenge-mode): Activates a "Security Checkpoint" page to verify a user’s browser before granting access, with subsequent requests bypassing the checkpoint
    
-   [**Custom rules engine**](https://vercel.com/docs/security/vercel-waf/custom-rules): Enables granular traffic control by combining parameters and actions, letting developers define which traffic to allow or block
    

### [Link to heading](#customizing-per-request-rule-logic)**Customizing per-request rule logic**

Every request that reaches your app tells a story: where it came from, what it wants, and whether it belongs. The Web Application Firewall (WAF) lets you take charge of this narrative, giving your team the tools to act decisively at every step.

The WAF supports over 15 customizable parameters—including IP addresses, geolocation, user agents, and headers—so you can fine-tune defenses for your app’s unique needs. Paired with actions like logging, issuing challenges, or outright blocking, these parameters let you enforce precise security measures at scale.

For example:

-   Block unwanted IP ranges targeting critical endpoints
    
-   Rate-limit high-frequency requests by region or device
    
-   Apply rules to specific paths with framework-aware targeting
    
-   Log rules to test logic and traffic behavior before applying actions
    

Each rule runs in the order you define, giving you control over priority and execution. Manage configurations programmatically via the [Vercel Firewall API](https://vercel.com/docs/rest-api/endpoints/security) or [Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/firewall_config) to stay in sync with your workflows.

Some threats should only be acted on a per-request basis while others require immediate and ongoing intervention. [Persistent actions](https://vercel.com/docs/security/vercel-waf/custom-rules#persistent-actions) ensure malicious requests are blocked early and kept out for an extended period. These blocks stop repeat offenders at the edge, reducing resource usage by preventing further processing—and therefore not counting against edge requests, data transfer, or other usage metrics, ensuring efficient and consistent security enforcement without impacting performance.

Finally, once a request passes through custom WAF rules customers can activate rules that are managed by Vercel, like the OWASP Core Ruleset which helps protect against common vulnerabilities like SQL injection, cross-site scripting (XSS), and other OWASP Top 10 threats.

### [Link to heading](#building-a-web-that's-secure-by-default)Building a web that's secure by default

Altogether, there are many components within the early stages of a request's lifecycle that are automatically in place by Vercel and proactively set by customers to secure your app from serving undesired requests.

The Vercel Firewall, Deployment Protection, and the Web Application Firewall (WAF) are cornerstones of our vision for a secure by default web. We’re committed to continuous innovation, ensuring our defenses evolve to counter new threats while making security effortless for developers. This commitment extends to proactive investments in WAF technologies and edge infrastructure, helping developers stay ahead in a shifting threat landscape.