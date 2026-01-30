---
title: "Bot Protection is now generally available"
source: "https://vercel.com/changelog/bot-protection-is-now-generally-available"
publishedDate: "2025-06-05"
category: "frontend"
feedName: "Vercel"
author: "Sage Abraham"
---

1 min read

Jun 5, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1tYq7nl28sgyHtXs9779zX%2Fc1067162ed7542009c5c1b255d34b928%2FOG_Card_-_mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4GDMXsTKpF7MZGlyIOHFB3%2Faaee3d104d47a1bc41a99cab60bb0206%2FOG_Card_-_mobile_dark.png&w=1920&q=75)

Vercel Web Application Firewall's [Bot Protection managed ruleset](https://vercel.com/docs/bot-management#bot-protection-managed-ruleset) is now generally available for all users, at no additional cost.

Bot Protection helps reduce automated traffic from non-browser sources and allows you to respond based on two action choices:

-   **Log Only Action:** Logs identified bot traffic in the Firewall tab without blocking requests
    
-   **Challenge Action:** Serves a [browser challenge](https://vercel.com/docs/vercel-firewall/firewall-concepts#challenge) to traffic from non-browser sources. [Verified bots](https://vercel.com/docs/bot-protection#verified-bots) are automatically excluded
    

During the beta period, Bot Protection challenged over 650 million requests of potential non-browser requests.

Bot Protection complements Vercel's existing mitigations, which already block common threats like DDoS attacks, low quality traffic, and spoofed traffic. It adds an extra layer of protection for any automated traffic that is not clearly malicious.

Learn more about the [Bot Protection managed ruleset](https://vercel.com/docs/vercel-waf/managed-rulesets) and the [Vercel Firewall.](https://vercel.com/docs/vercel-firewall) If you'd like your [bot to be verified as well, head over to bots.fyi.](https://bots.fyi/new-bot)