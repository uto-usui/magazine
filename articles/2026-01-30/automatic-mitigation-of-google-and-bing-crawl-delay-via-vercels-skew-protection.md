---
title: "Automatic mitigation of Google and Bing crawl delay, via Vercel’s Skew Protection"
source: "https://vercel.com/changelog/automatic-mitigation-of-crawler-delay-via-skew-protection"
publishedDate: "2025-04-08"
category: "frontend"
feedName: "Vercel"
author: "Steven Salat"
---

1 min read

Apr 8, 2025

Google and Bing web crawlers occasionally crawl a document, but render it up to several weeks later using a headless browser. This delay between document crawl and assets download (which happens during render) can cause indexing failures if the website has been re-deployed since the crawl.

**Vercel now automatically protects against such indexing failures** for projects that have [Skew Protection](https://vercel.com/docs/skew-protection) enabled.

This was achieved by extending the maximum age for Skew Protection to 60 days for requests coming from major search engine bots, such as Googlebot and Bingbot. This means that assets deployed up to 60 days ago will still be accessible to search engines when they render your document.

Regardless of the maximum age configured in the dashboard, Pro and Enterprise accounts using Skew Protection will automatically be protected from this delay, thereby improving SEO.

Learn more about [Skew Protection](https://vercel.com/docs/skew-protection) and [enable it in your project](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fadvanced%23skew-protection&title=Enable+Skew+Protection). Also, check out our [SEO research on how Google handles JavaScript throughout the indexing process](https://vercel.com/blog/how-google-handles-javascript-throughout-the-indexing-process), which provides a deeper dive into the search rendering process.