---
title: "The Directory Listing feature will be disabled for older projects"
source: "https://vercel.com/changelog/the-directory-listing-feature-will-be-disabled-for-older-projects"
publishedDate: "2021-02-08"
category: "frontend"
feedName: "Vercel"
author: "Leo Lamprecht"
---

1 min read

Feb 8, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4GqQcMLQXjWIm5ZhkDWDoB%2Faa59bc933862799edac2d572204c5213%2Fpreview.png&w=1920&q=75)

Last month, Vercel [announced](https://vercel.com/changelog/listing-the-content-of-directories-can-now-be-toggled) that the Directory Listing feature could now be toggled directly from the Project Settings and that it would be disabled for newly created Projects.

In favor of security, and to prevent unexpected behavior for older Projects, the Directory Listing feature will be disabled for all Projects that were created before January 12th 2021, which is the release date of the respective Project Setting.

The change will be applied on **March 8th 2021**.

Because the Directory Listing feature allows for accessing the source code of a Deployment if no [index file](https://vercel.com/docs/edge-network/directory-listing#disabling-directory-listing-on-a-specific-directory) is present within it, it's safer to disable it by default. If you want, however, you can turn the feature back on right afterwards, if you're relying on it.

Check out [the documentation](https://vercel.com/docs/edge-network/directory-listing) as well.