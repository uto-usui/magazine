---
title: "Two-Factor Authentication (2FA) is now available"
source: "https://vercel.com/changelog/2fa-is-now-available"
publishedDate: "2025-04-03"
category: "frontend"
feedName: "Vercel"
author: "Enric Pallerols"
---

1 min read

Apr 3, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F33KrpLek9fxzZH2j8My3Om%2Fa8be109a3e443affd2aa87ab8d769555%2FCleanShot_2025-04-03_at_09.09.56_2x__3_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F10XTL4B0PwHtJxUC9VZyzk%2Fa48255bdeab5f176049d88479d127270%2FCleanShot_2025-04-03_at_09.10.03_2x__1_.png&w=1920&q=75)

Users can now secure their accounts using Two-Factor Authentication (2FA) with Time-based One-Time Passwords (TOTP), commonly provided by authenticator apps like Google Authenticator or Authy. Your current Passkeys (WebAuthn keys) can also be used as second factors. 2FA adds an extra security layer to protect your account even if the initial login method is compromised.

**To Enable 2FA:**

1.  Navigate to [Authentication](https://vercel.com/account/settings/authentication) in Account Settings and enable 2FA
    
2.  Log in using your existing method (email OTP or Git provider) as your first factor
    
3.  Complete authentication with a TOTP authenticator as your second factor  
    

**Important information:**

-   **Passkey logins (WebAuthn)** are inherently two-factor and won't prompt for additional verification
    
-   **Team-scoped SAML SSO logins** delegate authentication responsibility to your identity provider (IdP) and won't require an additional factor within Vercel  
    

Visit your [account settings](https://vercel.com/account/settings/authentication) to enable 2FA today, or check out our [documentation](https://vercel.com/docs/two-factor-authentication) to learn more.