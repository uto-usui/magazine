---
title: "BotID uncovers hidden SEO poisoning"
source: "https://vercel.com/blog/botid-uncovers-hidden-seo-poisoning"
publishedDate: "2025-09-22"
category: "frontend"
feedName: "Vercel"
author: "Andrew Qu"
---

3 min read

Sep 22, 2025

Your traffic is spiking and you spot suspicious bot activity in your logs. You deploy [BotID](https://vercel.com/botid) expecting to find malicious scrapers, but the results show verified Google bots. Normal crawlers doing their job. But then you notice what they're actually searching for on your site. Queries that have nothing to do with your business. What do you do?

This exact scenario recently played out at one of the largest financial institutions in the world. What they discovered was a years-old SEO attack still generating suspicious traffic patterns.

## [Link to heading](#malicious-looking-search-queries)Malicious-looking search queries

The institution's security team was seeing significant bot traffic hitting their deployments with weird and malicious-looking search queries. The volume was concerning and the queries had nothing to do with financial services. They needed to stop this traffic in a reliable way.

They implemented [BotID](https://vercel.com/docs/botid)'s invisible CAPTCHA to mitigate the surge in bot traffic and identify the problematic sources before it could impact their systems further.

## [Link to heading](#what-botid-revealed)What BotID revealed

The results from BotID were unexpected. The suspicious traffic was not from malicious scrapers or attack infrastructure. Instead, every request originated from [bots.fyi-verified](https://bots.fyi/) Google crawlers, including Googlebot, Google AdsBot, and other legitimate Google services.

```
international shipping from uk to usa royal mail✅【TG：@-----】✅【欧美7折代付】【7折代缴Fedex】lucky activate sim card✅【TG客服@----】✅【全球SIM定制】【源头批发】JPNTT Docomo电商注册卡TG飞机@----2025年全球接码注册TG飞机@----8位顺子靓号（----.vip）estes express lines colorado springs reviews✅【TG：@-----】✅【7折付关税】【7折代付快递费】your香港卡✅【TG客服@----】✅【全球SIM定制】【源头批发】data sim hong kong✅【TG：@-----】✅【双向Esim】【货源稳定】estes express lines colorado springs reviews✅【TG：@-----】✅【7折付关税】【7折代付快递费】秦皇岛google外贸推广【TG飞机∶@-----】INS,FACEBOOK代推广】秦皇岛google外贸推广【Tpostnl hk✅【TG：@----】✅【7折付关税】【7折代付快递费】💘Google account for sale ❤T:----❤ Main business: foreign trade website construction Google SEO [white hat, bag ranking] Gambling home page does all kinds of extrapolation sohow to find tracking number on amazon after delivery✅【TG：@----】✅【欧美7折代付】【7折代缴Fedex】注册whats注册教程2025TG飞机@----注册闲鱼注册教程2025TG飞机@----shopee注册接码🔥〖✈️TG：@----〗🔥〖全球直达〗〖源头直码〗东欧接码注册卡预付费短信卡TG✈@----日本OCN Mobile ONE短信卡TG飞机@----牙买加双向短信🔥〖✈️TG：@----〗🔥〖双向短信〗〖定制接码〗日本Excite Mobile语音卡TG飞机@----北美接码注册卡0月租短信卡TG✈@----JPUQ Mobile跨境电商手机卡TG飞机@----
```

A short list of the queries being searched for

Why would verified Google bots be making these strange search queries on a financial institution's website?

## [Link to heading](#understanding-seo-poisoning)Understanding SEO poisoning

Digging deeper into their site's history revealed the answer. Years ago, before moving to Vercel, their previous infrastructure had been compromised through SEO poisoning.

SEO poisoning is an attack where malicious actors manipulate a website to get search engines to index specific content. Attackers create URLs with malicious query parameters that get crawled and indexed by search engines. For example, if your site has search functionality at `/search?q=`, attackers generate thousands of URLs like `/search?q=spam-keyword` and trick search engines into indexing these pages.

The poisoned pages can then appear in search results, directing traffic to spam or malicious content hosted on legitimate domains.

## [Link to heading](#legacy-indexing-persists)Legacy indexing persists

In this case, Google had indexed thousands of malicious search pages from the compromised site years earlier. Even though the institution had migrated to completely new infrastructure on Vercel, Google's index still contained these poisoned URLs.

Google's bots were systematically attempting to re-crawl these indexed pages, generating the suspicious search queries in their current logs. What appeared to be an active attack was actually Google trying to refresh stale indexed content from a historical compromise.

## [Link to heading](#a-targeted-solution)A targeted solution

With BotID providing clear identification of legitimate Google traffic, the team could implement the right approach:

1.  Update `robots.txt` to disallow crawling of search parameter patterns
    
2.  Submit removal requests through Google Search Console for the poisoned indexed pages
    
3.  Monitor de-indexing progress while allowing legitimate Google crawlers to continue normal operations
    

Without proper bot identification, they might have spent significant effort trying to block Google's crawlers, which would be both impossible and harmful to their search visibility.

## [Link to heading](#the-importance-of-bot-identification)The importance of bot identification

This case demonstrates why bot identification matters just as much as bot blocking. Vercel's verified bot registry powering BotID prevented misidentifying legitimate crawlers while revealing the root cause of suspicious traffic patterns.

The institution's problem wasn't current malicious activity but historical technical debt manifesting through search engine behavior.

When you encounter suspicious bot patterns, understanding the traffic source can be more valuable than immediately blocking it. Proper identification reveals whether you're dealing with an active threat or a symptom of deeper issues.

[

**Understand what your bot traffic is actually telling you**

Detect and stop advanced bots before they reach your most sensitive routes. Easy to implement, hard to bypass.

Get started



](https://vercel.com/botid)