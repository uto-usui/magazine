---
title: "Rate limiting now available on Hobby, with higher included usage on Pro"
source: "https://vercel.com/changelog/rate-limiting-now-available-on-hobby-with-higher-included-usage-on-pro"
publishedDate: "2025-05-23"
category: "frontend"
feedName: "Vercel"
author: "Dany Volk"
---

1 min read

May 23, 2025

Rate limiting now has higher included usage and broader availability to help protect your applications from abuse and manage traffic effectively.

The first 1,000,000 allowed rate limit requests per month are now included. Hobby teams also get 1 free rate limit rule per project, up to the same included allotment.

These changes are now effective and have been automatically applied to your account.

Learn more about [configuring rate limits](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting) or [create a new rate limiting rule](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Fconfigure%2Frule%2Fnew%3Ftemplate%3D%257B%2522name%2522%253A%2522%2522%252C%2522description%2522%253A%2522%2522%252C%2522active%2522%253Atrue%252C%2522conditionGroup%2522%253A%255B%257B%2522conditions%2522%253A%255B%257B%2522type%2522%253A%2522path%2522%252C%2522op%2522%253A%2522eq%2522%252C%2522value%2522%253A%2522%2522%257D%255D%257D%255D%252C%2522action%2522%253A%257B%2522mitigate%2522%253A%257B%2522action%2522%253A%2522rate_limit%2522%252C%2522rateLimit%2522%253A%257B%2522action%2522%253A%2522rate_limit%2522%252C%2522algo%2522%253A%2522fixed_window%2522%252C%2522window%2522%253A%252260%2522%252C%2522limit%2522%253A%2522100%2522%252C%2522keys%2522%253A%255B%2522ip%2522%255D%257D%257D%257D%257D%26sig%3D2825f99d28265a07949590b6c8a4521d8ec0d62e&title=Create+a+rate+limit+rule) now.