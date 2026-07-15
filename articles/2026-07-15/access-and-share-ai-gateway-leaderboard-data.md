---
title: "Access and share AI Gateway leaderboard data"
source: "https://vercel.com/changelog/open-data-and-shareable-charts-for-ai-gateway-leaderboards"
publishedDate: "2026-07-14"
category: "frontend"
feedName: "Vercel"
author: "Josh Wolk"
---

We are making the data behind the [AI Gateway leaderboards](https://vercel.com/ai-gateway/leaderboards) open under the [CC BY 4.0 license](https://creativecommons.org/licenses/by/4.0/). You can now download or query the data through the `leaderboard-export` API endpoint and render any chart as a shareable image.

The AI Gateway leaderboards show how AI is used in production, ranking traffic for models, labs, apps, and providers. Data is aggregated daily across trillions of tokens, so you can see what gets adopted and how that changes over time. For deeper analysis, see the [July AI Gateway Production Index](https://vercel.com/blog/ai-gateway-production-index-july-2026).

## [Copy link to heading](#what's-ranked)What's ranked

There are four leaderboards, each with its own metrics:

Leaderboard

Ranks

Metrics

[Models](https://vercel.com/ai-gateway/leaderboards/models)

Individual models

Requests, token volume, spend, images or videos generated

[Labs](https://vercel.com/ai-gateway/leaderboards/labs)

Model labs

Requests, token volume, spend, images or videos generated

[Apps](https://vercel.com/ai-gateway/leaderboards/apps)

Opted-in apps built on the AI Gateway

Token volume, spend

[Providers](https://vercel.com/ai-gateway/leaderboards/providers)

Inference providers

Token volume, spend

The four leaderboards and the metrics each one ranks.

Models and labs can be filtered by modality (text, image, video) and show a daily percentage share over time; apps and providers are aggregated across all modalities and show a ranked top list.

## [Copy link to heading](#open-data)Open data

The data behind the leaderboards is open, published under [Creative Commons Attribution 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You are free to use, share, and adapt it, including commercially, as long as you give credit, link to the license, and indicate if changes were made.

Every chart and ranked list has a download button that exports the current view as a CSV.

For programmatic access, use the export endpoint, which returns the same data and is cached for 24 hours:

```
# Full export, all datasetscurl "https://vercel.com/api/ai/leaderboard-export"# A single datasetcurl "https://vercel.com/api/ai/leaderboard-export?dataset=models"# A single dataset, filtered by modalitycurl "https://vercel.com/api/ai/leaderboard-export?dataset=models&modality=image"
```

Querying the export endpoint: the full export, one dataset, and one dataset narrowed by modality.

For models and labs, each row is one entity's daily share of a single metric. One response includes rows for `requests`, `tokens`, `spend`, `imageCount`, and `videoCount`, so filter on the `metric` field to pull out the series you want.

```
{  "date": "2026-05-10",  "group": "model",  "name": "Gemini 3 Flash",  "metric": "tokens",  "modality": "text",  "share_percent": 23.9}
```

One row from the models dataset: a model's daily share of a single metric.

## Share a chart

Every chart has a share button that turns the current view into an image. Pick an aspect ratio (landscape, square, or portrait), then download it as a PNG or copy it to your clipboard. The image includes the legend, title, and AI Gateway branding.

![Top models by token volume, shared as a landscape image](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3DTMZu6hvzRGsXP6X0OGxP%2F00fe346c9197baeccc9da6d45a8f28e0%2Ftop-models-by-token-volume-2m.png&w=1920&q=75)

A shared chart image: top models by token volume.

[View the leaderboards](https://vercel.com/ai-gateway/leaderboards) or read the [AI Production Index](https://vercel.com/blog/ai-gateway-production-index-july-2026).