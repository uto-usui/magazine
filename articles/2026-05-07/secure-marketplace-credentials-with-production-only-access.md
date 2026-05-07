---
title: "Secure Marketplace credentials with Production-only access"
source: "https://vercel.com/changelog/secure-marketplace-credentials-with-production-only-access"
publishedDate: "2026-05-06"
category: "frontend"
feedName: "Vercel"
author: "Tony Pan"
---

1 min read

May 6, 2026

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2GrtDK23fmDWYJXxCJRH0R%2Fa1a8f046842a7f74ea41f75670991a61%2FScreenshot_2026-05-04_at_10.11.40%25C3%25A2__AM.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1agoU3KM9ERTky29APGeFg%2Fd5c4ab8341cc06aa81cae74a2060a397%2FScreenshot_2026-05-04_at_10.12.00%25C3%25A2__AM.png&w=1920&q=75)

You can now secure native integration resources by restricting where they can be used. Setting a resource to **Production only** removes non-production access and protects credentials as [sensitive environment variables](https://vercel.com/docs/environment-variables/sensitive-environment-variables), so secret values are no longer readable from the dashboard or CLI.

From the integration resource **Settings**, select **Allowed Environments → Production only** and save. We recommend that you rotate the secrets of the integration resource after saving.

Once applied:

-   Development and Preview connections are removed
    
-   New non-production connections are blocked
    
-   Connections without a Production target are disconnected
    
-   Credentials are protected and no longer readable
    

Reverting this setting requires **Owner permissions**. Owners can re-enable Development and Preview access from Settings and reconnect projects if needed. You may be be prompted to reauthenticate with an MFA challenge. To learn more, read the [documentation](https://vercel.com/docs/integrations/install-an-integration/secure-your-resource).