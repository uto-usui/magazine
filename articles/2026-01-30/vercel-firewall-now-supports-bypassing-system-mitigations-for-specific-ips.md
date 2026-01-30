---
title: "Vercel Firewall now supports bypassing system mitigations for specific IPs"
source: "https://vercel.com/changelog/vercel-firewall-now-supports-bypassing-system-mitigations-for-specific-ips"
publishedDate: "2024-12-20"
category: "frontend"
feedName: "Vercel"
author: "Sage Abraham"
---

1 min read

Dec 20, 2024

Pro and Enterprise customers can now configure firewall rules to bypass system mitigations, including DDoS protection, for specific IPs and CIDR ranges.

We strongly recommend against bypassing protections. However, if you feel like the protections are blocking legitimate traffic, this feature presents a break-glass option. This may be particularly applicable if you have a proxy in front of Vercel that provides DDoS protection and which may interfere with Vercel's protection.

To configure system bypass rules:

1.  Navigate to the [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall&title=Firewall+tab) in the Vercel dashboard
    
2.  Click **Configure** at the top right to access the configuration page
    
3.  Use the **System Bypass Rules** section at the bottom to specify the IP address or CIDR range to bypass mitigations for your production domains
    

Please note that you are responsible for all usage fees incurred when using this feature, including illegitimate traffic that may otherwise have been blocked.

Pro customers can set up to 3 bypass rules and Enterprise customers can set up to 5.

Learn more about [Vercel Firewall's automatic DDoS mitigation](https://vercel.com/docs/security/ddos-mitigation#bypass-system-level-mitigations).