---
title: "Vercel security roundup: improved bot defenses, DoS mitigations, and insights"
source: "https://vercel.com/blog/vercel-security-roundup-improved-bot-defenses-dos-mitigations-and-insights"
publishedDate: "2025-05-23"
category: "frontend"
feedName: "Vercel"
author: "Liz Hurder"
---

4 min read

May 23, 2025

Billions of attacks blocked while cutting response time and expanding control

Since February, Vercel blocked 148 billion malicious requests from 108 million unique IP addresses. Every deployment automatically inherits these protections, keeping your workloads **secure by default** and enabling your team to focus on shipping rather than incidents.  
Our real-time DDoS filtering, managed Web Application Firewall (WAF), and enhanced visibility ensure consistent, proactive security.

Here's what's new since February.

## [Link to heading](#waf-performance-insights)WAF performance insights

Since our [last update](https://vercel.com/blog/vercel-security-roundup-faster-defenses-and-better-visibility-for-your-apps), Vercel WAF mitigated over **148 billion** malicious requests, a 70% increase quarter-over-quarter. These requests originated from over 108 million unique IP addresses, a staggering 468% increase that signals a sharp rise in distributed activity.

The largest volumes of malicious traffic originated from:

-   **United States**: 55 billion
    
-   **Ireland**: 29 billion
    
-   **Singapore**: 7 billion
    
-   **Hong Kong**: 5 billion
    
-   **Germany**: 3 billion
    

This quarter's insights highlight shifting global threat trends, with notable increases in malicious activity emerging in new geographies. At the same time, other regions like Australia (previously among the top sources of malicious traffic) dropped out of the top five.

Attack volumes and unique IPs have grown dramatically. This reinforces the importance of automatic global protections with Vercel to ensure your deployments remain secure by default.

## [Link to heading](#key-security-enhancements)Key security enhancements

### [Link to heading](#advanced-bot-protection)Advanced bot protection

Our new [Bot Filter](https://vercel.com/docs/bot-protection#bot-filter-managed-ruleset) entered public beta, free for all users on all plans. Bot Filter is a managed WAF ruleset that you can activate with one click, immediately challenging non-browser bot traffic without disrupting critical automations such as verified webhook providers (Googlebot, Stripe, PayPal) and internal cron jobs.

You can preview which requests Bot Filter would block using log-only mode, improving performance by ensuring your application resources remain available for legitimate users. If you have feedback on this beta feature, leave a comment in the [Vercel Community](https://community.vercel.com/t/feedback-thread-for-bot-filter-public-beta/9174).

### [Link to heading](#faster-denial-of-service-mitigation)Faster denial-of-service mitigation

We introduced [Protectd](https://vercel.com/blog/protectd-evolving-vercels-always-on-denial-of-service-mitigations), a powerful update to our denial-of-service (DoS) mitigation infrastructure. Protectd analyzes roughly 550,000 events per second globally, significantly accelerating our ability to mitigate Layer 7 attacks.

The result is a median mitigation time of just 2.5 seconds and a P99 of around 3.5 seconds, blocking sophisticated attacks that traditional CDNs often miss. Protectd operates transparently and immediately benefits all deployments without any configuration required.

## [Link to heading](#comprehensive-sdlc-security-guidance)Comprehensive SDLC security guidance

Our new _Secure every step of a modern SDLC_ whitepaper, is a comprehensive resource that clearly outlines how Vercel's built-in security features apply to every phase of software development, from planning and coding to deployment and monitoring. This whitepaper aims to simplify compliance discussions and helps streamline secure application development.

[

**Read the Secure SDLC whitepaper**

Building, deploying, and operating secure applications on Vercel.

Read now



](https://assets.vercel.com/image/upload/v1745532177/front/security/Secured_modern_SDLC.pdf)

## [Link to heading](#proactive-vulnerability-management-and-account-security)Proactive vulnerability management and account security

In recent months, Vercel proactively hardened our platform against high-severity vulnerabilities in open-source frameworks, ensuring that customer applications remained secure without requiring manual intervention. We still recommend updating to the latest patched versions of the affected packages and frameworks.

-   **React Router and Remix vulnerabilities** [**CVE-2025-43864 and CVE-2025-43865**](https://vercel.com/changelog/protection-against-react-router-and-remix-vulnerabilities-cve-2025-43864)**:** Vercel proactively deployed mitigation to the Vercel Firewall, and purged any potentially impacted caches, to protect customers against CVEs that can lead to cache poisoning denial of service and stored cross-site scripting attacks
    
-   **React Router vulnerability** [**CVE-2025-31137**](https://vercel.com/changelog/protection-against-react-router-vulnerability-cve-2025-31137)**:** Our platform architecture prevented exposure to this CVE that allows URL manipulation
    
-   **SAMLStorm** [**CVE-2025-29774 and CVE-2025-29775**](https://vercel.com/changelog/vercel-firewall-protects-against-the-samlstorm-vulnerability)**:** We deployed a security update to the Vercel Firewall that mitigated this SAML authentication bypass risk
    
-   **Next.js middleware vulnerabilities CVE-2025-29927 and CVE-2025-30218:** While Vercel was not affected by [CVE-2025-29927](https://vercel.com/changelog/vercel-firewall-proactively-protects-against-vulnerability-with-middleware), during our analysis we identified a low serverity issue, [CVE-2025-30218](https://vercel.com/changelog/cve-2025-30218), at the edge, which we patched and disclosed early to our infrastructure provider partners
    
-   **Multi-Factor Authentication (MFA):** Strengthen your account security by [adding a second factor](https://vercel.com/changelog/mfa-is-now-available) using TOTP apps like Google Authenticator or Authy alongside existing Passkeys
    

## [Link to heading](#firewall-usability-improvements)Firewall usability improvements

We’ve rolled out several Firewall updates to give teams more flexibility and control over rule creation, finer control during active threats, and deeper visibility into malicious or unexpected traffic patterns.

Verified bots and cron jobs now [bypass Attack Challenge Mode](https://vercel.com/changelog/attack-challenge-mode-now-allows-verified-bots-and-vercel-cron-jobs), ensuring core services like payments and analytics aren’t interrupted during security incidents. Custom Firewall rules [now support the logical `OR` operator](https://vercel.com/changelog/vercel-firewall-rule-builder-now-supports-or-for-rule-condition-groups), reducing configuration complexity, especially in use cases where multiple conditions must be grouped more flexibly.

System bypass rules [have also been expanded](https://vercel.com/changelog/improvements-to-vercel-firewall-system-bypass-rules), allowing you to apply them to preview domains with increased limits, offering greater flexibility for deployment using external proxies. Finally, the Firewall dashboard now includes [IP enrichment](https://vercel.com/changelog/ip-address-details-added-in-the-vercel-firewall-dashboard). Hover over any IP address to see ASN, location, and other metadata. This gives teams faster insight and more control when investigating traffic.

## [Link to heading](#online-session:-protecting-your-traffic-with-the-vercel-firewall)Online session: Protecting your traffic with the Vercel Firewall

We hosted an online session, _Protecting your traffic with the Vercel Firewall_. Watch the recording to learn practical guidance on DDoS and bot protection strategies, effective traffic control and threat mitigation techniques, and previews into the product roadmap.

## [Link to heading](#looking-ahead)Looking ahead

At this year’s RSA Conference, we sat down with security teams to talk through what’s shaping web security in 2025. Conversations focused on securing the software supply chain, applying AI-driven automation inside security teams (not just in business processes) and ensuring that emerging practices such as vibe coding are built with security in mind from the start.

These conversations continue to shape our ongoing work across the Vercel platform and in tools like v0 to ensure every deployment is secure by default.

### [Link to heading](#upcoming-events)**Upcoming events**

We’re continuing these conversations at [Vercel Ship](https://vercel.com/ship) on June 25th. Join us in New York City or steam online for live demos, technical discussions, and insights from customers who rely on Vercel to secure their applications.

### [Link to heading](#open-roles)Open roles

We're also expanding our team to continue enhancing the security and availability of your applications. If you're passionate about secure web infrastructure, explore our current open roles:

[

**Learn about security that scales with you**

The Vercel Firewall delivers multi-layer protection against application-layer attacks, DDoS threats, and bots. Visit our security page to sign up for a demo or add firewall rules today

Learn more



](https://vercel.com/security)