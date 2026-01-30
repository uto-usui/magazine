---
title: "Enhanced geolocation information for Vercel Functions"
source: "https://vercel.com/changelog/enhanced-geolocation-information-available-for-vercel-functions"
publishedDate: "2022-08-03"
category: "frontend"
feedName: "Vercel"
author: "Naoyuki Kanezawa"
---

1 min read

Aug 3, 2022

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F50nAiGL5BxoLbhd6VTUdY5%2Fe09c392ecda9ae6bfa41e18189872097%2FGeoIP_OG_Image.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1v720DvUc6PTZL4LzyuskT%2Fe058227a816bcc03c798c34cdd49ac65%2FGeoIP_OG_Image_-_DARK.png&w=1920&q=75)

Requests received by Serverless and Edge Functions are now enriched with headers containing information about the timezone of the visitor:

As an example, a request from Tokyo is now enriched with the following headers:

```
X-Vercel-IP-Latitude: 37.7749X-Vercel-IP-Longitude: -122.4194 X-Vercel-IP-Timezone: Japan
```

This header is now automatically activated for all new and existing Vercel Functions for all plans — no code or configuration change needed.

Check out [the documentation](http://vercel.com/docs/edge-network/headers#request-headers) as well.