---
title: "Track server-side custom events with Vercel Web Analytics"
source: "https://vercel.com/changelog/track-server-side-custom-events-with-vercel-web-analytics"
publishedDate: "2023-10-06"
category: "frontend"
feedName: "Vercel"
author: "Chris Widmaier"
---

1 min read

Oct 6, 2023

Vercel Web Analytics now supports tracking custom events on the server-side, in addition to existing support for client-side tracking.

app/page.tsx

```
import { track } from '@vercel/analytics/server';export default function FeedbackPage() {  async function submitFeedback(data: FormData) {    'use server';    await track('Feedback', {      message: data.get('feedback') as string,    });  }  return (    <form action={submitFeedback}>      <input type="text" name="feedback" placeholder="Feedback" />      <button type="submit">Submit Feedback</button>    </form>  );}
```

Tracking a server-side event with a Server Action in Next.js.

Events can now be tracked from [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), [API Routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes), and [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations) when using Next.js (or other frameworks like SvelteKit and Nuxt) through the `track` function.

Custom event tracking is available for Pro and Enterprise users.

[Check out the documentation](https://vercel.com/docs/analytics/custom-events) to learn more.