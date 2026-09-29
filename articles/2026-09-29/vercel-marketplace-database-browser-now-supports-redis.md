---
title: "Vercel Marketplace database browser now supports Redis"
source: "https://vercel.com/changelog/vercel-marketplace-database-browser-now-supports-redis"
publishedDate: "2026-09-25"
category: "frontend"
feedName: "Vercel"
author: "James Clarke"
---

You can now run Redis commands, browse keys, and inspect values directly in the Vercel dashboard using the [Marketplace database browser](https://vercel.com/changelog/query-and-manage-marketplace-databases-from-the-dashboard).

Both the [Redis](https://vercel.com/marketplace/redis) and [Upstash for Redis](https://vercel.com/marketplace/upstash/upstash-kv) integrations in Vercel Marketplace are supported, so you no longer need `redis-cli` or a separate database UI.

From your project, open **Infrastructure > Storage** and select a Redis database. The database page now includes two new tabs:

-   **CLI:** Run Redis commands and inspect the results. Run multiple commands by separating them with newlines or semicolons, with support for `MULTI`/`EXEC` transactions.
    
-   **Browser:** Browse keys in a flat list or grouped by prefix, and filter them by type or pattern. Select a key to inspect its value and metadata, including its type, TTL, encoding, and size. Supported value types include string, JSON, hash, list, set, and sorted set.
    

![Browse Redis keys and inspect their values and metadata from the Vercel dashboard.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3JWidjSashse6LRLhl0Np%2F0164f52e95e6bb6aa6643912d8050be1%2Fredis-light.png&w=1920&q=95)![Browse Redis keys and inspect their values and metadata from the Vercel dashboard.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5aoZ9WDiL7nPcEY5tRTa0C%2Fd9123fe53b6ba102b59b76a786b4779d%2Fredis-dark.png&w=1920&q=95)

Browse Redis keys and inspect their values and metadata from the Vercel dashboard.

These tabs are currently available only to team members with the Owner role. Learn more in the [Marketplace storage documentation](https://vercel.com/docs/marketplace-storage).