---
title: "AI SDK and AI Gateway now integrated in GitHub Actions"
source: "https://vercel.com/changelog/ai-sdk-and-ai-gateway-now-integrated-in-github-actions"
publishedDate: "2025-09-08"
category: "frontend"
feedName: "Vercel"
author: "Gregor Martynus"
---

1 min read

Sep 8, 2025

You can now use the `vercel/ai-action@v2` [GitHub Action](https://github.com/marketplace/actions/vercel-ai) to access the [AI SDK](https://ai-sdk.dev/) and [AI Gateway](https://vercel.com/ai-gateway), generating text or structured JSON directly in your workflows by specifying a `prompt`, `model`, and `api-key`.

This integration enables new AI powered use cases for Github Actions, like summarizing what made it into a release, a light PR code review, comment moderation, or finding duplicate or relevant issues. For example, you can use it to triage issues like:

triage.yml

```
on:  issues:    types: [opened]jobs:  generate-text:    runs-on: ubuntu-latest    steps:      - uses: vercel/ai-action@v2        id: prompt        with:          model: "openai/gpt-5"          api-key: ${{ secrets.AI_GATEWAY_API_KEY }}          prompt: |            Is this an urgent issue? Say "yes" if it's preventing a user from doing something critical.            Issue Title: ${{ github.event.issue.title }}            Issue Body: ${{ github.event.issue.body }}      - if: steps.prompt.outputs.text == 'yes'        run: gh issue edit ${{ github.event.issue.html_url }} --add-label urgent        env:          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Learn more and see examples in the [Github Actions marketplace](https://github.com/marketplace/actions/vercel-ai) or [view the source code](https://github.com/vercel/ai-action).

[

**Start using Vercel AI Gateway**

Unify access to hundreds of AI models through one endpoint with automatic failover, simplified authentication, and no key management.

Get an API Key



](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%2Fapi-keys%3Futm_source%3Dai_gateway_landing_page&title=Get+an+API+Key)