---
title: "Expanded Role-Based Access Control (RBAC) for Enterprise teams"
source: "https://vercel.com/changelog/expanded-role-based-access-control-rbac-for-enterprise-teams"
publishedDate: "2025-10-10"
category: "frontend"
feedName: "Vercel"
author: "Bel Curcio"
---

1 min read

Oct 10, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3jNpcfyZg4gXF7Hkb6wVgB%2Fe6f657a84de92c4d845b426089d4c81c%2FRBAC_Extended_Roles_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4ftz8871zNKzOy6uiB3TPp%2F708bf7af7c6075f852c0d16723de6016%2FRBAC_Extended_Roles_-_Dark.png&w=1920&q=75)

Vercel’s Role-Based Access Control (RBAC) system now supports multiple roles per user and introduces extended permissions for finer-grained access control across Enterprise teams.

What’s new:

-   **Multi-role support:** Assign multiple roles to a single user within Enterprise teams.
    
-   **Security role:** A new team role dedicated to managing security and compliance settings.
    
-   **Extended permissions:** Add granular capabilities that layer on top of team and project roles for precise control.
    
-   **Access groups integration:** Access Groups now support team roles and extended permissions in Directory Sync mappings.
    

The new extended permissions include:

-   **Create Project:** Create new projects.
    
-   **Full Production Deployment:** Deploy, rollback, and promote to production.
    
-   **Usage Viewer:** View usage, prices, and invoices (read-only).
    
-   **Integration Manager:** Install and manage integrations and storage.
    
-   **Environment Manager:** Create and manage project environments.
    
-   **Environment Variable Manager:** Create and manage environment variables.
    

Extended permissions apply when paired with a compatible team role.  
  
Learn more in the [Role-Based Access Control documentation.](https://vercel.com/docs/rbac/access-roles/extended-permissions)