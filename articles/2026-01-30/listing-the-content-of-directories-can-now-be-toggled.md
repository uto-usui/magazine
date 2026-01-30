---
title: "Listing the content of directories can now be toggled"
source: "https://vercel.com/changelog/listing-the-content-of-directories-can-now-be-toggled"
publishedDate: "2021-01-12"
category: "frontend"
feedName: "Vercel"
author: "Naoyuki Kanezawa"
---

1 min read

Jan 12, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F79n0iL1rQ6UKg6HNsgJoAh%2Fdc9a825baf45c64fd4d50c22a79b4d4f%2Fog-image.png&w=1920&q=75)

Until now, directories used to list the directory's contents whenever their path was visited (provided they didn't contain an index file).

In cases where this was considered a security issue, turning off the Directory Listing required configuring a rewrite rule in `vercel.json`.

As of today, the Directory Listing is **disabled for all newly created Projects** and can be toggled on the "Advanced" page in the Project Settings.

Check out [the documentation](https://vercel.com/docs/edge-network/directory-listing) as well.