---
title: "Security through design: Creating the improved Firewall experience"
source: "https://vercel.com/blog/security-through-design-improved-firewall-experience"
publishedDate: "2025-11-24"
category: "frontend"
feedName: "Vercel"
author: "Sage Abraham"
---

3 min read

Nov 24, 2025

At Vercel, we believe security should be intuitive, not intimidating. The best security tool is the one that's actually used. It should be clear, useful, and never in the way.

But that's not always the norm. Security tooling can often feel like a tradeoff against shipping velocity. When UX is an afterthought, teams leave tools off or in "logging mode" forever, even when risks are high.

That's why we've redesigned the Vercel Firewall experience from the ground up. The new UI helps you see more, do more, and feel confident in your app's resilience to attacks.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5OfyrGDRbu8dDDI8paXA55%2F3e4d80b02a3f11a2ee824af5fea6b2bd%2FSimple_Hero_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F565guRl0NdV19cNkdqAOvz%2F2855cd22e5c5f29c85ec2e05bf5d1aed%2FSimple_Hero_-_Dark.png&w=1920&q=75)

## [Link to heading](#designing-for-every-vercel-user)**Designing for every Vercel user**

The redesign started with listening. Users told us:

-   I want to easily see active DDoS events
    
-   I need more information on what the Firewall blocked
    
-   I need a faster way to investigate traffic alerts or spikes
    

Developers, SREs, and security teams all use the Firewall for maintenance and troubleshooting. They configure rules, monitor traffic, and respond to unusual activity.

The new Firewall UI is designed for everyone using Vercel. It surfaces clear, actionable information, simplifies navigation, and helps teams resolve issues quickly when it matters most.

## [Link to heading](#a-better-way-to-see-and-secure-your-traffic)**A better way to see and secure your traffic**

The new design brings together visibility, context, and control in one view.

-   **A redesigned overview page** provides a unified, high-signal view of Firewall activity
    
-   **New sidebar navigation** offers one click to Overview, Traffic, Rules, and Audit Log
    
-   **Key activity and alert feeds** surface unusual patterns and potential threats
    
-   **Improved inspection tools** make it faster to move from alert to insight
    

### [Link to heading](#a-new-overview-for-all-security-events)A new overview for all security events

The [Overview page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall&title=Firewall+tab) is your high-level control center for the Firewall. It gives you a clear, birds-eye view of your site’s security posture. The traffic chart remains at the top, and we now surface the most important information based on recent activity.

Four tables surface key Firewall activity so you can see the current state and act quickly when needed:

-   Alerts shows recently mitigated DDoS attacks
    
-   Rules displays top rule activity by volume
    
-   Events list mitigations taken by Firewall
    
-   Denied IPs show blocked connections by client IP
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2egKDjMp3O6Irg7XHpGpbA%2F181ff542bceb0dc08890c739388336ea%2FOverview_-_Isolated_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7iZn7ikJD6fLIGrgmVdKiB%2Fd1258d8971d2661e49749459d40607c9%2FOverview_-_Isolated_-_Dark.png&w=1920&q=75)

### [Link to heading](#comprehensive-traffic-intelligence)Comprehensive traffic intelligence

The new Traffic page focuses entirely on understanding activity across your site. You can now drill down into the detection signals that you care about the most, and filter those signals based on specific mitigation actions on the traffic tab. These updates make it easier to spot patterns or anomalies before they become problems.

We now surface dedicated feeds for:

-   Top IPs
    
-   Top JA4 digests
    
-   Top AS names
    
-   Top User Agents
    
-   Top Request Paths
    
-   Rules with most activity
    

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FEBNY8cPYD9Qhe3VwuYC0a%2F8b7a0aaeb8877d7527c27a9b9ba91b00%2FTraffic_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6xHKYYErgh5wliSut9wW7o%2F77fbac199ae06fd61ed41ba786eb341b%2FTraffic_-_Dark.png&w=1920&q=75)

### [Link to heading](#dedicated-rules-and-activity)Dedicated rules and activity

Firewall Rules now have a dedicated tab on the sidebar. You can see and manage all of your WAF custom rules in this view, including [Bot Protection](https://vercel.com/docs/bot-management#bot-protection-managed-ruleset), [Managed Rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets), [IP Blocking](https://vercel.com/docs/vercel-firewall/vercel-waf/ip-blocking), and more. We’ve also moved the Audit Log to a dedicated tab for full visibility into Firewall changes.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7FMQErs18TCnZixtqDIlhT%2Fe84f8e92492616bb54ebf985a8d91d3a%2FRules_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2Z2fbbw4NnpHAy56Y66crB%2F68c84a7c36d657eb62af3044b43026c0%2FRules_-_Dark.png&w=1920&q=75)

### [Link to heading](#faster-event-inspection)Faster event inspection

Clicking an alert or event now opens a detailed view directly in the page. You can dive deeper into Firewall activity and investigate suspicious traffic or DDoS attacks without context switching, helping you diagnose issues faster and take action immediately.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2rzBWRGV3IwFatBFXWXbZA%2Fb519a44542c813475ee895f33bd6280d%2FEvent_-_Isolated_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F27N4FwCM0bLUswPVCnQfuB%2Fe62a9681144d6c3ca8c8e155c8b0a9c8%2FEvent_-_Isolated_-_Dark.png&w=1920&q=75)

## [Link to heading](#security-designed-for-you)**Security designed for you**

Security is usability. When tools are clear and well-designed, teams act faster and stay safer, without sacrificing shipping velocity.

We'd love your feedback. Explore the new Firewall experience today in your [Vercel Dashboard](https://vercel.com/dashboard) and share your thoughts in the [Vercel Community](https://vercel.com/community).