---
title: "Improvements and fixes"
source: "https://vercel.com/changelog/january-2023"
publishedDate: "2023-01-23"
category: "frontend"
feedName: "Vercel"
author: "Jarryd McCree"
---

1 min read

Jan 23, 2023

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5Q6iTwx2CBd0pFrD9vzZWK%2Fe537e396e236e5daa54a31ff7056a77d%2Fpapercuts-dark.png&w=1920&q=75)

-   **Image Optimization:** Source images for Vercel Image Optimization can now be viewed on the [Usage tab](https://vercel.com/docs/concepts/limits/usage).
    
-   **Vercel CLI:** Shipped [v28.12.7](https://github.com/vercel/vercel/releases/tag/vercel%4028.12.7) with improved [Gatsby support](https://vercel.com/changelog/improved-support-for-gatsby-sites).
    
-   **Python Runtime for Vercel Functions:** Improved documentation and [examples](https://vercel.com/templates/python) for using the Python Runtime for Vercel Serverless Functions.
    
-   **Edge Functions:** Improved source map resolution and filtering
    
    for more readable and actionable errors.
    
-   **Docs search:** Improved search in docs by making `CMD+K` the default, enhancing the accuracy and relevance of search results, and including path-based recommendations.
    
-   **Changes to** `.vercelignore`**:** Created a `.vercelignore` file in the "root directory" to fix a bug that caused deployments sourced from git to not properly resolve the `.vercelignore` when a "root directory" has been set.