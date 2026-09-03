---
title: "AWS PrivateLink is now available on Pro and Enterprise"
source: "https://vercel.com/changelog/aws-privatelink-is-now-available-on-pro-and-enterprise"
publishedDate: "2026-09-01"
category: "frontend"
feedName: "Vercel"
author: "Miroslav Simulcik"
---

[AWS PrivateLink](https://vercel.com/docs/networking/privatelink) is now available for Pro and Enterprise teams as part of Advanced Networking. It allows Vercel Functions and builds to connect to AWS-hosted services without sending traffic over the public internet.

Use it to reach AWS-hosted databases such as RDS, Aurora, and Neon; SaaS services such as Snowflake and MongoDB Atlas; internal services behind an AWS Network Load Balancer; and S3 or DynamoDB through gateway endpoints.

To configure PrivateLink, open your project's [Networking settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fnetworking) and enable **Advanced Networking**. Select New Connection, then enter the service name and region.

![Enable Advanced Networking to configure AWS PrivateLink for a project.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1jpf3iDaNi6DAZw0R1bdOX%2F96706a538cbb5295f7bbd51b0ca42cfb%2Flight__2_.png&w=1920&q=95)![Enable Advanced Networking to configure AWS PrivateLink for a project.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6LnMPnYoklF7bMp7IGHOFh%2F0dc6551313ee5f3d031d94adac88a62d%2Fdark__2_.png&w=1920&q=95)

Enable Advanced Networking to configure AWS PrivateLink for a project.

The service must accept connections from all AWS principals or allowlist the IAM role Vercel provides for your team.

Vercel creates the connection and provides a stable hostname. Use this hostname from your Functions and builds to reach the service privately.

Pricing:

-   The first AWS PrivateLink connection is included with Advanced Networking. Each additional connection costs $30 per month.
    
-   PrivateLink data transfer costs $0.04 per GB.
    

Learn more in the [AWS PrivateLink documentation](https://vercel.com/docs/networking/privatelink).