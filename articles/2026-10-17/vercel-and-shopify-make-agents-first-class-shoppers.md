---
title: "Vercel and Shopify make agents first-class shoppers"
source: "https://vercel.com/blog/vercel-and-shopify-make-agents-first-class-shoppers"
publishedDate: "2026-10-16"
category: "frontend"
feedName: "Vercel"
author: "Boris Besemer"
---

Agents already shop on the web, but they often use pages and tools originally built for people and search engines. Building a better shopping experience for agents means treating them as first-class shoppers, with product information they can read directly and tools designed for agents to shop.

Today, [Vercel Shop](https://vercel.shop/), our open source [Next.js](https://nextjs.org/) storefront template for [Shopify](https://www.shopify.com/), is generally available. Teams can launch storefronts optimized for how people, search engines, and agents interact with them.

![Shopify CEO Tobi Lütke and Vercel CEO Guillermo Rauch discuss the future of agent commerce at Vercel Ship SF.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6IYP6eGY0fuU4VDkRXbpq3%2Fead48b2929de00a2f5e24cc8af18381f%2FVercel_Ship_Cam2_08725_HiRes.jpg&w=1920&q=95)

Shopify CEO Tobi Lütke and Vercel CEO Guillermo Rauch discuss the future of agent commerce at Vercel Ship SF.

Vercel Shop is built on [Shopify’s Hydrogen SDK](https://shopify.dev/docs/api/hydrogen). The SDK gives teams access to the store’s product catalog, cart and order management, payments, and checkout to build custom storefronts. Earlier this year, [Vercel and Shopify announced plans to rebuild Hydrogen](https://vercel.com/blog/vercel-and-shopify-are-rebuilding-hydrogen) to work across JavaScript frameworks. Today, the rebuilt SDK is generally available.

> Checkouts are ridiculously hard to get right. It's one of those pieces of software that actually does need 20 years of tinkering with. And Shopify has always been very open, and so we invite people to remix pieces from our checkout just as much as you want. Basically taking all the infrastructure that Shopify built, and you can build whatever you want with it.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/5khT9ZOTukirEKCG4wkCIM/44da57b50ac571672118459e98149e81/_HWYanot_400x400.jpg)Tobias Lütke Co-Founder and Chief Executive Officer (CEO) of Shopify

## [Copy link to heading](#give-agents-the-information-and-tools-they-need)Give agents the information and tools they need

Vercel Shop makes product pages available as [machine-readable content](https://vercel.shop/docs/anatomy/aeo-geo), including price, availability, and options. The same product URL can serve a visual page to people or product information that agents can read without interpreting the page’s layout. The template also includes structured data embedded in pages and sitemaps to help search and answer engines discover and understand the products.

Shopify co-developed the [Universal Commerce Protocol](https://ucp.dev/) (UCP), which gives agents a standard way to search a store’s catalog, read product details, check availability, build a cart, and get a checkout link. Vercel Shop makes these capabilities discoverable at the merchant’s own domain, so agents can use MCP to search products and build carts without navigating the site.

## [Copy link to heading](#customize-the-experience-for-all-customers)Customize the experience for all customers

Vercel Shop brings the store’s product catalog, cart, and checkout together with a Next.js storefront, product information and shopping tools for agents, and a shopping assistant powered by [eve](https://vercel.com/eve). The storefront and assistant live in the same codebase, so teams can customize the store’s design and how the assistant helps shoppers.

[Skills included in the template](https://vercel.shop/docs/getting-started/extending-with-agents) guide coding agents through setup, customization, and template updates. Teams can create an experience where shoppers browse product pages or ask the assistant to find products and add them to their cart. Both share the same cart, so shoppers keep what they’ve added as they move between experiences.

> You can build a highly custom, well-designed, agent-ready experience with Vercel Shop. It runs on Next.js, it's built on Shopify, and it's freaking fast.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/27XHQudM8gCc2byKwFFMCT/5d8a8aa70d60c49020d13eee568d8103/guillermo-rauch-128.jpg)Guillermo Rauch Founder & CEO @ Vercel

## [Copy link to heading](#storefronts-built-with-shopify-and-vercel)Storefronts built with Shopify and Vercel

Today, we launched our merch store at [vercel.store](https://vercel.store/) with limited-edition drops. It’s built on Vercel Shop. The store’s shopping agent helps shoppers find products, add them to their cart, and continue to checkout.

Shopify, Next.js, and Vercel already power storefronts for brands including AG1, Bombas, and PAIGE. When PAIGE [re-architected its ecommerce platform](https://vercel.com/customers/how-paige-grew-revenue-by-22-with-shopify-next-js-and-vercel), it saw a 22% increase in revenue and a 76% increase in conversion over Black Friday and Cyber Monday, with no downtime.

## [Copy link to heading](#get-started-with-vercel-shop)Get started with Vercel Shop

Create a storefront:

```
pnpm create next-app@latest my-store --example https://github.com/vercel/shop
```

Get started with [Vercel Shop](https://vercel.shop/). Check the [documentation](https://vercel.shop/docs) to connect your Shopify store and configure the storefront.