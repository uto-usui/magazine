---
title: "Mitigating Denial of Wallet risks with Vercel"
source: "https://vercel.com/blog/mitigating-denial-of-wallet-risks-with-vercel"
publishedDate: "2025-01-24"
category: "frontend"
feedName: "Vercel"
author: "Ty Sbano"
---

4 min read

Jan 24, 2025

Unlike traditional cyberattacks that target code or infrastructure vulnerabilities, Denial of Wallet (DoW) attacks focus on draining a service's operational budget.

At Vercel, we're building controls and anomaly detection to help you defend against these threats and protect your applications.

## [Link to heading](#what-is-a-denial-of-wallet-\(dow\)-attack)What is a Denial of Wallet (DoW) attack?

DoW attacks exploit cloud scalability to drive up operational costs. [Introduced by OWASP in 2017](https://owasp.org/www-project-serverless-top-10/), these attacks inflate resource consumption—such as bandwidth or compute power—to inflict financial damage. Unlike Denial of Service (DoS) attacks, which disrupt availability, DoW targets your budget, threatening profitability and long-term sustainability.

At its core, a DoW attack is an exhaustion of financial accounts, services, or credits on a cloud-based system. Without the proper protections, these attacks could erroneously charge organizations an uncapped amount. This is especially relevant in elastic cloud environments where costs scale with usage.

### [Link to heading](#how-dow-attacks-work)How DoW attacks work

DoW attacks exploit auto-scaling applications by generating illegitimate requests while staying below rate-limiting thresholds. Attackers avoid detection by distributing their requests across multiple IP addresses and by slowing the request rate to mimic legitimate traffic. This leads to unnecessary scaling of cloud resources and inflated service costs, leaving organizations to pay for traffic that yields no business value.

Attackers can exploit API endpoints and trigger expensive backend operations, such as database writes, third-party API calls, or resource-intensive computations, by repeatedly sending requests to drive usage and costs.

### [Link to heading](#the-impact:-more-than-just-dollars-and-cents)The impact: More than just dollars and cents

For startups and small businesses, a DoW attack can lead to unforeseen financial strain, diverting funds away from other initiatives. Even larger organizations are not immune, as such attacks can lead to significant disruptions—especially during critical periods like product launches or [seasonal events such as Black Friday-Cyber Monday](https://vercel.com/blog/black-friday-cyber-monday-2024-recap).

The impact spans multiple areas:

-   **Operational disruption:** When a company is forced to divert resources to investigate and mitigate cost-related incidents, other projects stall
    
-   **Reputation damage:** Attacks shake customer confidence, threatening the relationships and trust you've built
    
-   **Investor concerns:** Financial instability makes stakeholders wary, especially in a climate where companies must demonstrate responsible budget management
    

## [Link to heading](#our-defensive-playbook:-preparing-for-dow-attacks)Our defensive playbook: Preparing for DoW attacks

Vercel’s [secure by default position](https://vercel.com/resources/iterating-towards-secure-by-default) governs our approach to mitigating DoW attacks. Our layered security tooling helps detect sophisticated attacks and minimize their impact on your business. The following built-in features work together to identify and block malicious traffic while maintaining optimal performance for legitimate users, limiting the economic damage of these attacks.

### [Link to heading](#rate-limiting:-your-first-line-of-defense)Rate limiting: Your first line of defense

Vercel gives you granular control over [API rate limiting](https://vercel.com/guides/securing-ai-app-rate-limiting#why-do-you-need-rate-limiting), letting you set limits on incoming requests. By capping the traffic to your backend, you can protect against runaway costs caused by automated scripts or malicious actors. It’s like placing a valve on a pipeline—you decide the acceptable flow rate and Vercel enforces it.

Rate limits can be adjusted dynamically—without the need to redeploy—to handle a new feature or an unexpected surge in traffic.

### [Link to heading](#vercel-web-application-firewall-\(waf\))Vercel Web Application Firewall (WAF)

[Vercel's WAF](https://vercel.com/docs/security/vercel-waf) actively identifies and blocks malicious traffic. It defends against common vulnerabilities like SQL injection and XSS while adding the DoW layer of protection with [challenge-response protocols](https://vercel.com/docs/security/attack-challenge-mode) for suspicious activity. This ensures your system scales only for legitimate users.

Our [ready-made firewall templates](https://vercel.com/templates?type=vercel-firewall) simplify this setup—ensuring digital efficiency while keeping your budget intact.

### [Link to heading](#spend-controls-and-real-time-monitoring)Spend controls and real-time monitoring

Vercel prioritizes cost transparency and control, providing tools to proactively manage your spending:

-   **Real-time usage monitoring**: Gain visibility into your resource consumption, so you can quickly spot anomalies. If an unexpected spike occurs, you’ll be the first to know
    
-   **Budget alerts and spend limits**: Define thresholds to monitor spending and enforce caps, preventing unexpected costs from escalating into financial strain
    

These [spend-management controls](https://vercel.com/docs/pricing/spend-management) ensure that your spending limits protect you against unexpected costs.

### [Link to heading](#bot-protection:-keeping-automated-threats-at-bay)Bot Protection: Keeping automated threats at bay

Automated bots are often the culprits behind DoW attacks. Vercel takes a multifaceted approach to bot protection:

-   **Behavioral analysis**: By observing request patterns, Vercel can distinguish between human users and malicious bots
    
-   **Challenge-based verification**: Techniques like CAPTCHAs or browser-based Javascript challenges ensure that bots can’t easily inflate your costs, adding a friction layer to deter automated abuse
    
-   **Adaptive filtering**: Vercel analyses signatures of bots mimicking legitimate user behavior to stop low-quality traffic at the platform level
    

With [continuously improving detection](https://vercel.com/changelog/vercel-firewall-now-stops-ddos-attacks-up-to-40x-faster), these protective layers ensure your infrastructure is used as intended and shielded from malicious scripts.

## [Link to heading](#securing-your-cloud-costs-with-vercel)Securing your cloud costs with Vercel

As the threat landscape evolves, DoW attacks pose a significant economic risk to cloud-based applications. Vercel's security approach arms you with tools that protect both your infrastructure and your budget through multiple layers of defense:

-   Granular API rate limiting to control traffic and prevent cost escalation
    
-   Vercel Web Application Firewall (WAF) that filters malicious traffic and ensures scaling only occurs for legitimate requests
    
-   Real-time monitoring and configurable spending limits for proactive budget control
    
-   Advanced bot protection through behavioral analysis and challenge-based verification
    

With Vercel's secure by default platform, you can scale your digital presence confidently, safeguarded from the financial risks of DoW attacks. Our built-in security features keep cloud elasticity an asset, so you can focus on growing your business.

[

**Security that scales with you**

Explore our comprehensive suite of security tooling to protect your application workloads.

Learn more



](https://vercel.com/security)