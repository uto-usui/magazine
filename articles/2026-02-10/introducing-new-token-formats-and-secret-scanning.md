---
title: "Introducing new token formats and secret scanning"
source: "https://vercel.com/changelog/new-token-formats-and-secret-scanning"
publishedDate: "2026-02-09"
category: "frontend"
feedName: "Vercel"
author: "Mark Roberts"
---

1 min read

Feb 9, 2026

![A token entity when the token has been discovered by a secret scan](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2F4uTElUhAQIfSy1Dz0aYV%2F5b928d345986a03807360c23c72703c0%2Fchangelog-light.png&w=1920&q=75)![A token entity when the token has been discovered by a secret scan](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7wC8HklW6LbxN33ijP0kJz%2F1b9dde652d16c2071d5aa3f2919552ea%2Fchangelog-dark.png&w=1920&q=75)

When Vercel API credentials are accidentally committed to public GitHub repositories, gists and npm packages, Vercel now automatically revokes them to protect your account from unauthorized access.

When the exposed credentials are detected, you'll receive notifications and can review any discovered [tokens](https://vercel.com/account/settings/tokens) and [API keys](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys\&title=AI+Gateway+API+keys) in your dashboard. This detection is powered by [GitHub secret scanning](https://docs.github.com/en/code-security/concepts/secret-security/about-secret-scanning) and brings an extra layer of security to all Vercel and v0 users.

As part of this change, we've also updated token and API key formats to make them visually identifiable. Each credential type now includes a prefix:

We recommend reviewing your [tokens](https://vercel.com/account/settings/tokens) and [API keys](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys\&title=AI+Gateway+API+keys) regularly, rotating long-lived credentials, and revoking unused ones.

[Learn more](https://vercel.com/docs/accounts) about account security.