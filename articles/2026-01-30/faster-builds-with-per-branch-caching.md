---
title: "Faster builds with per-branch caching"
source: "https://vercel.com/changelog/faster-builds-with-per-branch-caching"
publishedDate: "2021-03-16"
category: "frontend"
feedName: "Vercel"
author: "Igor Klopov"
---

1 min read

Mar 16, 2021

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F23gr0SrgFRqyGvGwSQ9YYZ%2F257c9348b5395d9a395feb2459479254%2FBuild_cache_partitioned_by_git_branch.png&w=1920&q=75)

The Build Step now considers the current Git branch when reading and writing the cache.

Since the first push to a branch will create a deployment without a branch-specific cache, it will read from the Production branch's cache. Subsequent pushes to that branch will read from its own branch-specific cache.

This means that Preview branches will no longer write to the Production branch's cache. This leads to faster builds because changing dependencies in one branch won't change the cache of another branch.

In addition, we no longer delete the build cache when a build fails. Instead, you can manually trigger a build without cache by using the "Redeploy" button on the Dashboard.

Our tests with a large Next.js app brought down incremental build times from **13 minutes** to **4 minutes**.

Check out [the documentation](https://vercel.com/docs/build-step#caching) as well.