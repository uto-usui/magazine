---
title: "Improved CLI experience when linking and creating environment variables​​​​‌‍​‍​‍‌‍ ‌​‍‌‍‍‌‌‍‌‌‍‍‌‌‍‍​‍​‍​‍‍​‍​‍‌‍​‌‍ ‌‍‍‌‌​‌‍‌‌‌‍‍‌‌​‌‍‌‍‌‌‌‌‍​​‍‍‌‍​‌‍ ‌‍‌​‍​‍​‍​​‍​‍‌‍‍​‌​‍‌‍‌‌‌‍‌‍​‍​‍​‍‍​‍​‍‌‍‍​‌‌​‌‌​‌​​‌​​‍‍​‍ ​‍"
source: "https://vercel.com/changelog/improved-cli-experience-when-linking-and-creating-environment-variables"
publishedDate: "2025-10-05"
category: "frontend"
feedName: "Vercel"
author: "Cody Wong"
---

1 min read

Oct 5, 2025

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3OScAkqGSSQeyvR1Hi45if%2Ff8a2bbbd026f957560d3715b96222a98%2Fray-so-export.png&w=1920&q=75)

Here are some of the key improvements introduced in version 50.0.0:

-   After successfully linking a project, the CLI now prompts you to pull your Project’s Environment Variables to keep your local setup aligned with your deployed configuration.
    
-   Input for new Environment Variables is now masked during interactive entry
    
-   When connecting to an existing project with `link`, the CLI now shows an interactive selector if you have fewer than 100 Projects.
    
-   Fixed an issue where `vc link --repo` would incorrectly prefix project names.
    
-   Commands that support the `ls` argument now have standardized behavior. Extra or unexpected arguments will consistently produce a clear error and exit early, ensuring predictable and reliable results across all `ls` commands. This change may require updates to scripts that depended on the previous behavior.