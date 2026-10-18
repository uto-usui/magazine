---
title: "Vercel Connect now supports Secure Compute"
source: "https://vercel.com/changelog/vercel-connect-secure-compute"
publishedDate: "2026-10-15"
category: "frontend"
feedName: "Vercel"
author: "Dima Voytenko"
---

[Vercel Connect](https://vercel.com/connect) now supports [Secure Compute](https://vercel.com/docs/networking/secure-compute), allowing connectors to reach providers with IP allowlists, such as Salesforce and Snowflake.

With Secure Compute routing enabled, Connect’s provider requests use the selected network’s dedicated static IP addresses instead of Connect’s shared IPs. Requests to obtain and refresh access tokens follow that route; your app’s direct API routing is unchanged by this setting. Credential management stays the same, so you don’t need to store long-lived provider secrets in your app or build OAuth flows yourself.

To enable Secure Compute routing for a supported connector and all projects that use it:

-   Open your connector’s [Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fconnect%2F%5Bconnector%5D%2Fsettings&title=Vercel%20Connect%20Secure%20Compute) in the Vercel dashboard.
    
-   Under **Secure Compute Routing**, choose an existing network.
    
-   If your provider uses an IP allowlist, add the selected network’s displayed IP addresses to it in the provider’s settings.
    
-   Save your changes in Connect.
    

Requests for initial connector creation and all provider discovery requests bypass the selected network and connect directly to providers. If the selected network is unavailable, routed requests fail instead of falling back to Connect’s shared IPs.

Read the [Secure Compute routing documentation](https://vercel.com/docs/connect/concepts/connectors#secure-compute-routing) for configuration details.