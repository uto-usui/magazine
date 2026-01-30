---
title: "Reminder of legacy environment variable secrets sunset"
source: "https://vercel.com/changelog/legacy-environment-variable-secrets-sunset-reminder"
publishedDate: "2024-04-29"
category: "frontend"
feedName: "Vercel"
author: "Ana Jovanova"
---

2 min read

Apr 29, 2024

This is a reminder for legacy secrets deprecation. On **May 1st, 2024** secrets will be automatically converted to sensitive Environment Variables for Preview and Production environments. Secrets attached to Development environments **will not** be migrated.

-   **Existing legacy secrets will be automatically converted.** You do not need to manually take action for non-development values. Read below to view your impacted projects.
    
-   **All Environment Variables remain securely encrypted.** The majority of Vercel workloads have moved from the legacy secrets functionality.
    

**Why are legacy secrets being sunset?**

Our legacy secrets were encrypted values global for your entire team and could only be managed through the CLI. Based on your feedback, we have since:

-   Made all Environment Variables encrypted by default
    
-   Added [Sensitive Environment Variables](https://vercel.com/docs/projects/environment-variables/sensitive-environment-variables) to prevent values from being decrypted by users
    
-   Added [Shared Environment Variables](https://vercel.com/docs/projects/environment-variables/shared-environment-variables) to reuse truly global values across teams
    

**When will I no longer be able to use secrets?**

On **May 1st, 2024**, [secrets](https://vercel.com/docs/projects/environment-variables/sensitive-environment-variables) will be removed from Vercel CLI:

-   Existing secrets added to the **Preview** and **Production** environments will be converted to Sensitive Environment Variables
    
-   Existing secrets added to the **Development** environment will not be migrated for your security. If you have a secret shared between all environments, including Development, it will not be migrated. These values must be manually migrated.
    

**How can I migrate to Sensitive Environment Variables?**

Secrets for Preview and Production environments will be automatically migrated.

For secrets which contain the Development environment, you should create new [Sensitive Environment Variables](https://vercel.com/docs/projects/environment-variables/sensitive-environment-variables), as these values will not be automatically migrated for your security. If you need to share Environment Variables across projects, you can [make them shared](https://vercel.com/docs/projects/environment-variables/shared-environment-variables).

**How can I understand if I’m affected?**

To list projects using secrets that will be automatically converted, run:

Terminal

```
vercel secrets ls
```

View the secrets added to your Vercel teams.