---
title: "Vercel AI Gateway plugin for WordPress"
source: "https://vercel.com/changelog/vercel-ai-gateway-plugin-for-wordpress"
publishedDate: "2026-05-20"
category: "frontend"
feedName: "Vercel"
author: "Felix Arntz"
---

1 min read

May 20, 2026

The [Vercel AI Gateway plugin](https://wordpress.org/plugins/vercel-ai-gateway-provider/) gives any WordPress site access to hundreds of models from 40+ providers through a single API key. Providers include Anthropic, Google, OpenAI, xAI, DeepSeek, MiniMax, Moonshot AI, and more.

The plugin is implemented as a connector for the new [WordPress AI Client](https://make.wordpress.org/core/2026/03/24/introducing-the-ai-client-in-wordpress-7-0/), which requires WordPress 7.0, released today.

## [Link to heading](#what-this-enables)What this enables

-   **Any AI-powered plugin works automatically.** Plugins built on the WordPress AI Client pick up the connector without their own provider integrations or API keys.
    
-   **One key, many providers.** Manage a single AI Gateway key in **Settings > Connectors** instead of credentials per provider.
    
-   **Multi-modal content generation.** Text, structured JSON, image generation and editing, and video, all through the same prompt builder.
    
-   **Automatic fallbacks.** AI features stay online during provider outages.
    
-   **Dynamic model discovery.** New models become available without a plugin update.
    
-   **Unified billing and observability** across providers, at provider prices.
    

## [Link to heading](#getting-started)Getting started

1.  Install the [Vercel AI Gateway plugin](https://wordpress.org/plugins/vercel-ai-gateway-provider) on your WordPress site
    
2.  Add your [AI Gateway](https://vercel.com/ai-gateway) API key under **Settings > Connectors**
    

To call AI Gateway directly from your own code:

```
$excerpt = wp_ai_client_prompt( 'Write a 2-sentence excerpt for this post: ' . $post->post_content )    ->using_provider( 'ai_gateway' )    ->generate_text();
```

Writing a two-sentence excerpt for a WordPress blog post

See the [plugin documentation](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/wordpress) for more details, including examples for text, structured JSON output, image generation, and video.