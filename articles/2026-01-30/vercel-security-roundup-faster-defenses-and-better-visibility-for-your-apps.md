---
title: "Vercel security roundup: Faster defenses and better visibility for your apps"
source: "https://vercel.com/blog/vercel-security-roundup-faster-defenses-and-better-visibility-for-your-apps"
publishedDate: "2025-02-21"
category: "frontend"
feedName: "Vercel"
author: "Liz Hurder"
---

4 min read

Feb 21, 2025

Billions of attacks blocked while strengthening defenses, improving response times, and adding visibility for developers

Every second, Vercel blocks attacks before they reach your applications—keeping businesses online and developers focused on shipping, not security incidents.

Vercel’s security capabilities combine **real-time DDoS mitigation, a powerful Web Application Firewall (WAF), and seamless SIEM integrations** to provide always-on protection without added complexity.

Here’s what happened in the last quarter.

## [Link to heading](#vercel's-waf-blocks-87-billion-attacks-)**Vercel's WAF blocks 87 billion attacks**

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4LqCQGJoNQ3PmYAW8xrWB8%2F12a4eab3cc085e7569a484a1114c21cd%2FAttacks_mitigated_LM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2iVUQ7IWsVf7U6bJqwKjwr%2F390a49230dfb43abcae2efb6012f6f6f%2FAttacks_mitigated_DM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1TwEl7FMDSZhbhnbJ8ZmlF%2F42ab0d9234c9ad6b46007a18381e0bd4%2FAttacked_mitigated_mobile_LM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4SjC2y5kR7CvSjWbd0vWOM%2F18efd373468f0abe68df3f7d0857e859%2FAttacked_mitigated_mobile_DM.png&w=1920&q=75)

In the last quarter of 2024, Vercel’s WAF automatically mitigated **87 billion attacks from 19 million unique IPs**—blocking malicious traffic before it ever reached customer applications. Our platform security combines multiple layers of protection:

-   [Vercel’s firewall](https://vercel.com/docs/security/vercel-firewall) offers network-wide Layer 3 and Layer 4 protection, automatically mitigating DDoS threats and TCP-based attacks before they can reach applications. This is enabled for every customer on any plan tier
    
-   [Vercel’s WAF](https://vercel.com/security/web-application-firewall) provides comprehensive Layer 7 security, identifying and mitigating threats like SQL injection, cross-site scripting (XSS), and bot-driven attacks, all without degrading performance
    

[

**Understand how Vercel secures your app**

From network protections to Layer 7 granular controls, learn how Vercel's infrastructure provides multi-layered protection for your application.

Learn more



](https://vercel.com/blog/life-of-a-request-securing-your-apps-traffic-with-vercel)

### [Link to heading](#waf-impact-at-a-glance:)**WAF impact at a glance:**

-   **22 billion requests** stopped in the US from **3.6 million** unique IPs, highlighting the region's high volume of automated and targeted attacks
    
-   **16 billion requests** mitigated in Germany, reflecting growing security challenges in the European market
    
-   **13 billion requests** blocked in Singapore, showcasing the increasing need for protection in high-traffic global hubs
    

These numbers show increasing modern cyber threats and the need for proactive defenses. Vercel’s WAF prevents attacks before causing application downtime, protecting user experiences and reducing infrastructure strain. Automated threat detection and real-time mitigation ensure security without compromising performance.

## [Link to heading](#strengthening-your-defenses:-more-control,-faster-mitigation)**Strengthening your defenses: more control, faster mitigation**

Over the past quarter, we’ve focused on strengthening our security defenses while giving developers more customizations, increasing visibility and granular control.

### [Link to heading](#enhanced-threat-mitigation)Enhanced threat mitigation

Vercel Firewall is now faster and more effective at stopping threats. By processing malicious traffic in real time and improving mitigation features, we’re neutralizing high-volume and low-and-slow attacks earlier, reducing costs, and preventing threats from reaching your application.

-   [DDoS Protection is now 40x faster](https://vercel.com/changelog/vercel-firewall-now-stops-ddos-attacks-up-to-40x-faster) thanks to real-time stream processing that blocks malicious traffic and [mitigates DDoS attacks](https://vercel.com/docs/security/ddos-mitigation) earlier
    
-   [Improved WAF Responses](https://vercel.com/changelog/clients-blocked-by-persistent-actions-now-receive-a-403-forbidden-response) by returning a 403 Forbidden response for persistent threats, making enforcement clearer to end-users
    

### [Link to heading](#improved-visibility-and-alerting)Improved visibility and alerting

Understanding where and when security events are occurring is crucial to stopping them quickly. In the past three months, we’ve expanded monitoring and alerting capabilities to make it easier for teams to make informed decisions.

-   [Vercel Firewall DDoS mitigation notifications](https://vercel.com/changelog/introducing-vercel-firewall-notifications) let you receive alerts when the Vercel Firewall detects and automatically mitigates a DDoS attack on your Vercel project. These notifications help teams monitor traffic patterns, review attack logs, and take further action, if needed
    
-   The [Project Overview](https://vercel.com/changelog/preview-firewall-status-and-web-analytics-from-project-overview) page now provides a preview of your app’s Firewall status and other information from the past 24 hours
    
-   More granular [Firewall data is now available](https://vercel.com/changelog/enhanced-firewall-data-now-available-in-monitoring) in your Monitoring or Observability Plus tab, allowing you to filter blocked requests by actions, and see more details like IP Country and User Agent
    

### [Link to heading](#compliance-and-access-security)Compliance and access security

Vercel has added more ways to improve your security visibility and help customers meet compliance standards.

-   Enterprise customers can configure a [real-time audit log stream](https://vercel.com/docs/observability/audit-log#custom-siem-log-streaming) to their existing Security Information and Event Management (SIEM) tools, such as Datadog or Splunk
    
-   To support our customers in meeting the requirements of the Payment Card Industry Data Security Standard (PCI DSS), [Vercel has successfully completed](https://vercel.com/changelog/upgraded-pci-dss-version-3-2-1-to-4-0) our Self-Assessment Questionnaire Attestation of Compliance (SAQ-D AOC) for Service Providers under PCI DSS v4.0
    

## [Link to heading](#building-a-more-secure-web-together-with-the-vercel-community-)Building a more secure web together with the Vercel Community

Our Community team recently hosted a Community Session demonstrating Vercel Firewall's capabilities and explaining how Vercel provides platform-wide protection against common web attacks—including [DDoS attacks](https://youtu.be/0ku2bedYeWU?t=451) and [malicious bots](https://youtu.be/0ku2bedYeWU?t=923).

Have questions about the session? Join discussion on the [Vercel Community Forum](https://vercel.community/t/how-to-protect-your-vercel-site-from-common-attacks/4652).

## [Link to heading](#looking-ahead-)Looking ahead

As we look across the ever-evolving security landscape, our Chief Information Security Officer Ty Sbano see three challenges the web will face in the coming year:

-   **DDoS attacks are intensifying:** Vercel is seeing larger and more sophisticated attempts to cause app outages, increase costs, and disrupt business
    
-   **Bots are becoming more sophisticated:** With the rise of AI and agentic agents, global internet traffic has shifted and it’s making it harder to identify real users and automated bots
    
-   **Layer 8 is emerging as the Human Layer:** The traditional networking [OSI model](https://en.wikipedia.org/wiki/OSI_model) ends at the Application (Layer 7), but security tools still require human intelligence to understand and tune business logic
    

To meet these emerging threats, we will continue to develop product features and internal programs that safeguard our customers and protect the end-user experience.

Additionally, we will be creating opportunities for customers directly connect with Vercel in the security space:

-   Connect with us in April at [RSAC 2025](https://www.rsaconference.com/), where you can stop by our booth to learn and demo security products with the team.
    
-   If you are a customer with a security story, you can [apply to speak](https://ship-2025-cfp.vercel.app/) at Vercel Ship, our flagship conference in NYC this June
    
-   We’re hiring a [Security Researcher](https://vercel.com/careers/security-researcher-us-5401260004) and expanding our Edge engineering team with a [Software Engineer](https://vercel.com/careers/software-engineer-edge-amer-5179639004) and [Engineering Manager](https://vercel.com/careers/engineering-manager-edge-us-5386919004).
    

[

**Learn about security that scales with you**

The Vercel Firewall delivers multi-layer protection against application-layer attacks, DDoS threats, and bots. Visit our security page to sign up for a demo or add firewall rules today

Learn more



](https://vercel.com/security)