---
title: "Enterprise Managed Users is now generally available"
source: "https://vercel.com/changelog/enterprise-managed-users"
publishedDate: "2026-08-11"
category: "frontend"
feedName: "Vercel"
author: "Ana Jovanova"
---

Enterprise Managed Users (EMU) gives organizations full control over the Vercel accounts tied to their verified domains.  
It makes the organization's identity provider the single source of truth for authentication and account lifecycle, so accounts on company domains are governed centrally rather than owned by individuals.

**Now generally available**

-   **IdP-enforced sign-in:** Managed users sign in through SAML SSO only. All other login methods, including email OTP, GitHub, Google, and GitLab, no longer work for managed accounts.
    
-   **SCIM provisioning & lifecycle**: Directory Sync creates, updates, and deprovisions managed users automatically, keeping accounts in sync with your IdP.
    
-   **Owned by your organization**: Profile settings are managed through your IdP rather than by the individual.
    
-   **Self-serve enablement:** Turn EMU on for a verified domain in Team Settings under Security & Privacy, and extend it across multiple eligible teams in a single step.
    

Requires an Enterprise plan, enforced SAML SSO, active Directory Sync, and at least one verified domain.

**In Beta, available on request**

-   **Hobby team transition**: Members with an existing personal account on a newly managed domain are guided to add a personal email (keeping their hobby projects) or delete the account, then continue to their work through SSO.
    
-   **Automatic conversion**: Personal accounts with no content or activity are archived automatically, and their owners land in a new managed account at their next SSO sign-in.
    

To request access, contact your account team.

Learn more in the [Enterprise Managed Users](https://vercel.com/docs/security/enterprise-managed-users) and [Hobby team transition](https://vercel.com/docs/security/enterprise-managed-users-account-update) docs.