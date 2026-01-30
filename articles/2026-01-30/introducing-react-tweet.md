---
title: "Introducing React Tweet"
source: "https://vercel.com/blog/introducing-react-tweet"
publishedDate: "2023-07-25"
category: "frontend"
feedName: "Vercel"
author: "Luis Alvarez"
---

2 min read

Jul 25, 2023

Embed tweets into your React application without sacrificing performance.

Introducing [`react-tweet`](https://react-tweet.vercel.app/) – embed tweets into any React application with a single line of code, without sacrificing performance.

app/page.tsx

```
import { Tweet } from 'react-tweet'export default function Page() {  return <Tweet id="1683920951807971329" />}
```

The resulting tweet – statically generated, no iframes required:

Some benefits of using `react-tweet`:

-   35x less client-side JavaScript than the Twitter's Native embed
    
-   Support for React Server Components
    
-   Built-in data fetching and caching
    
-   Works with any React framework – [Next.js](https://nextjs.org/), Vite, and Create React App
    

## [Link to heading](#improving-embeds-with-server-components)Improving embeds with Server Components

Historically, embedding tweets has required using [Twitter's embedded iframe](https://publish.twitter.com/). This loads `560kb` worth of client-side JavaScript, which slows site performance and causes layout shift.

With `react-tweet`, you no longer need to use iframes. Instead, all you need is a simple React component that is compatible with [Next.js](https://nextjs.org/), Vite, and Create React App:

app/page.tsx

```
import { Tweet } from 'react-tweet'export default function Page() {  return <Tweet id="1683920951807971329" />}
```

The resulting embedded tweet has several advantages:

-   No layout shift or scrolling jumps ([Cumulative Layout Shift](https://vercel.com/docs/concepts/speed-insights#cumulative-layout-shift-cls))
    
-   Improved UX with instantly visible tweets in the browser (no lazy loading)
    
-   Build with the powerful React component abstraction.
    

To demonstrate this performance improvement, here's a comparison between the native Twitter embed, iframe embed, and `react-tweet`:

### [Link to heading](#native-twitter-embed)**Native Twitter embed**

-   Demo URL: [https://without-react-tweet.vercel.app/](https://without-react-tweet.vercel.app/)
    
-   Client-side JavaScript needed: `560kb`
    

### [Link to heading](#twitter-embed-with-iframe)**Twitter embed with iframe**

### [Link to heading](#react-tweet)**`react-tweet`**

-   Demo URL: [https://with-react-tweet.vercel.app/](https://with-react-tweet.vercel.app/)
    
-   Client-side JavaScript needed: `16kb`
    

## [Link to heading](#how-react-tweet-works)How `react-tweet` works

Under the hood, `react-tweet` reverse-engineers the Twitter's Embed API to fetch data for a given tweet and renders it in the same style as Twitter's embedded iframe.

You don't need to rely on Twitter API v2 to fetch tweets on your own, saving you money and making it easier to add tweets to your site.

## [Link to heading](#get-started-with-react-tweet)Get started with `react-tweet`

Try out `react-tweet` today by running the following command:

```
npm i react-tweet
```

[Check out the documentation](https://react-tweet.vercel.app/) to learn more.