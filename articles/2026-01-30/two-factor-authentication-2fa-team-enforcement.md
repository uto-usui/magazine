---
title: "Two-factor authentication (2FA) team enforcement"
source: "https://vercel.com/changelog/2fa-team-enforcement"
publishedDate: "2025-06-19"
category: "frontend"
feedName: "Vercel"
author: "Enric Pallerols"
---

1 min read

Jun 19, 2025

![2FA Team Enforcement - Dark](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7DsTA0DGk06KJrT4sNkTD3%2F6498cfeed8b37131cf18bc7655259a2d%2FMFA_-_Light.png&w=1920&q=75)![2FA Team Enforcement - Dark](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fb5DcjGg91I0g0GldVwlRN%2F48cdac9b97bf66c6899f0df084104caa%2FMFA_-_Dark.png&w=1920&q=75)

Teams can now require all members to enable two-factor authentication (2FA) for added security.

Team owners can enable enforcement in the [**Security & Privacy**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity&title=Go+to+Security+%26+Privacy) section of team settings.

**Owner controls**

-   View and filter each member’s 2FA status in the [team members settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fmembers&title=Go+to+Members)
    

**Member restrictions**

Once enforcement is enabled, members without 2FA will be restricted from:

-   Triggering builds from pull requests
    
-   Accessing new preview deployments
    
-   Viewing the team dashboard
    
-   Making API requests
    
-   Using access tokens
    

**Enforcement lock-in & visibility**

-   Members of a team with 2FA enforcement cannot disable 2FA unless they leave the team
    
-   In each user’s account settings, teams that require 2FA are now listed for clarity
    

[Enable 2FA enforcement](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity&title=Go+to+Security+%26+Privacy) today, and [learn more in our docs](https://vercel.com/docs/two-factor-enforcement).