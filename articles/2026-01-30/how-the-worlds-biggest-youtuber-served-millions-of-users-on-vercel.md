---
title: "How the world’s biggest YouTuber served millions of users on Vercel"
source: "https://vercel.com/blog/serving-millions-of-users-on-the-new-mrbeast-storefront"
publishedDate: "2022-09-29"
category: "frontend"
feedName: "Vercel"
author: "Julian Benegas"
---

3 min read

Sep 29, 2022

_How do you build a site to support peak traffic, when peak traffic means a fanbase of over 100 million Youtube subscribers? In this guest post, Julian Benegas, Head of Development at basement.studio, walks us through balancing performance, entertainment, and keeping "the buying flow" as the star of the show for MrBeast's new storefront.  
_  

It all started with a call from a media & TV company. Their merchandiser had big news to share—they were leading a new campaign for MrBeast, and [our studio](https://basement.studio/) would be designing and developing the storefront where his immense fanbase would shop.

> Anyone would be scared when confronted with a challenge this big, but when you have a dream team like ours, you can put those fears to rest.” 
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/2QxRXIwGYm3QFeN6YstfC7/32fafa6ce7420b49aa1bfcfb5612e08d/1642689754082.jpeg)
> 
> **Jose Rago,** Founder & Partner at basement.studio

With MrBeast's almost 200 million followers across social channels, we knew Vercel could handle traffic, but we had never handled as much as MrBeast would bring.

However, keeping the site up alone wasn’t enough. We needed to give every visitor a delightful shopping experience. That meant a top-notch experience in terms of both design and performance, with fun mini-games to make it feels like a MrBeast video. Most importantly, it had to direct users to buy.

[

**Rely on the fastest frontend platform during peak traffic.**

Chat with an expert to learn how Vercel can support your own fast, dynamic site.

Contact Sales



](https://vercel.com/contact/sales)

## [Link to heading](#taking-it-to-the-lab-)**Taking it to the lab** 

While designing the site, we had both concrete requirements and more abstract ones. The media company proposed the sitemap and content structure, then left it up to us to be creative. Their main goal: making sure people had fun on the site. 

After several brainstorming sessions, Lambo Jump was born—an infinite runner with similar mechanics to Google’s famous _“No Internet Connection T-REX Game”_, but with MrBeast style. We also knew that we couldn’t compromise the site’s performance because of this, so we loaded Lambo Jump’s JavaScript immediately when the user pressed the “play” button.

The game was a huge success, with MrBeast fans sharing their scores on Twitter, and some of them even filming YouTube videos about their experience playing it.

While Lambo Jump was a good initial idea, we wanted something more. Inspired by the “Cookie Clicker” game, we came up with “Slap to Win”: a game where visitors would “slap” members of the MrBeast crew. The media company's team loved it, and suggested the game rewards could be actual products.

## [Link to heading](#challenges-along-the-way)**Challenges along the way**

While it was the perfect combination—engaging visitors with a fun game that had real, redeemable rewards—we had one outstanding concern. Tech-savvy users could hack “Slap to Win” ([which they did](https://github.com/nismo1337/shopmrbeastslaptowin)), and we were giving away real products as a result. We worked together with the media & TV company to incorporate game rules and rolled them out quickly on Vercel, ensuring that prizes would only be redeemable alongside other purchases and players would be able to redeem only one prize per purchase.

We also solved the game’s logic server-side. With the help of Shopify’s Admin API, we created discount codes for the products that users redeemed, and luckily for our developers, Shopify’s Discounts API has fine-grain controls that allowed us to set rules exactly as we wanted to.  

## [Link to heading](#development-and-pre-launch-stack)**Development and pre-launch stack**

Throughout the project, success came down to three key tools: Vercel, Shopify, Axiom. 

### [Link to heading](#vercel)**Vercel**

Vercel not only helped us iterate faster and deliver the site to all of our users—their Customer Success team also worked alongside us to ensure everything was set up correctly from our side and theirs. When asked if we’d be able to keep the site up despite high-volume and unpredictable traffic, we knew we could rely on Vercel to make it happen. We actually set a record on the Vercel platform for the most requested site in the span of a week. Stressful, but still, a great achievement.   

**Shopify** 

[Shopify](https://vercel.com/integrations/shopify) is our go-to ecommerce provider, and their wide suite of features covered all our needs. We leveraged their [Storefront API](https://shopify.dev/api/storefront), with a library built by us to connect to it in a type-safe manner: [react-dropify](https://github.com/basementstudio/react-dropify). They served all of MrBeast’s traffic just fine. 

**Axiom**

[Axiom](https://vercel.com/integrations/axiom) is a newcomer to “the basement stack” ™. They provide observability at scale, which allowed us to monitor everything that was happening on the site at all times. We created a Launch Dashboard which observed different metrics and errors and gave us the confidence to know everything was performing as it should.

## [Link to heading](#the-beast-and-100-million-subscribers)**The Beast and 100 million subscribers**

Creating a merchandising experience for 100 million subscribers is a big ask. Thanks to Vercel, Shopify, Axiom, and the media & TV company's team, we stuck to our mantra: make it cool, and make it perform. In the end, the work speaks for itself.