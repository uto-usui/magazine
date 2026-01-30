---
title: "How Core Web Vitals affect SEO"
source: "https://vercel.com/blog/how-core-web-vitals-affect-seo"
publishedDate: "2024-01-19"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

8 min read

Jan 19, 2024

Understanding your application's Google page experience ranking and Lighthouse scores.

Core Web Vitals influence how your application's pages rank on Google. Here, we'll dive into what they are, how they’re measured, and how your users and search ranking are impacted by them.

Malte Ubl is the CTO of Vercel and former Director of Google Search responsible for shipping the “Page Experience” ranking rollout—which heavily utilizes Core Web Vitals. That said, everything written here is publicly documented and linked where appropriate.

[

**Need to optimize your metrics?**

Adopting Next.js or Vercel’s world-class managed infrastructure are great ways to improve your Core Web Vitals.

Talk to an Expert



](https://vercel.com/contact/sales)

## [Link to heading](#how-google-ranks-based-on-page-speed)How Google ranks based on page speed

Your site’s ranking in Google Search is impacted by Google’s page experience ranking system, which evaluates the performance of your site based on Google’s [Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals) metrics.

Google collects Core Web Vitals by observing how real users interact with your website and reporting that back to its servers (more detail about how this works below).

We call this type of data _field data_ because it gets collected from real users browsing your site. This is different from _lab data_, which is the result of tests run in a "lab setting" to determine how well your site performs. Google’s Lighthouse is an example of a lab test.

Maybe the most important takeaway of this article is this:

> Google only considers the Core Web Vitals field data when ranking your site. Google does not consider your Lighthouse score in any way for search ranking.
> 
> ![](https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/4I3D6ciHcP1X0ZzKOZqlk4/7387a540e406212761f5c92bcd61df37/5f217a8e6bc2c80d3780360e_CBm5_MB7_400x400.jpg)

### [Link to heading](#contextualizing-search-ranking-factors)Contextualizing search ranking factors

[Page experience](https://developers.google.com/search/docs/appearance/page-experience) is a ranking factor in Google Search that utilizes Core Web Vitals to determine how your website performs relative to other sites. Page experience is one of many ranking factors in Google Search, which all get aggregated together to determine your site's ranking on a search result page.

Relevancy to the query and [quality of the content](https://vercel.com/blog/nextjs-seo-playbook#content-strategies) are substantially more important factors than page experience. However, for scenarios where you and your competitors have very similar relevancy, page experience may decide who comes out on top.

Where page experience and Core Web Vitals are unique is that:

-   You can improve these metrics through your own work.
    
-   Google is transparent about how well you’re doing.
    

Core Web Vitals are much less of a black box than other ranking factors. Optimizing them involves far less “guesswork” than improving relevancy and is easier to measure than content quality.

On top of that, improving Core Web Vitals improves user experience, [which drives conversion](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud#why-do-you-need-speed).

### [Link to heading](#how-to-see-your-application’s-core-web-vitals)How to see your application’s Core Web Vitals

The authoritative data source for how well your entire app performs for page experience rankings is [Google Search Console](https://search.google.com/search-console).

![The Core Web Vitals page of Google Search Console.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6DSsIMSGVUi6xtL6hvIFx4%2Fe9f54eae5dcc0e7c3f5aaf6e734bea6d%2FScreenshot-2024-01-18-at-7.45.50-AM.png&w=1920&q=75)

The Core Web Vitals page of Google Search Console.

A simple way to access per-page data is Google’s [PageSpeed Insights](https://pagespeed.web.dev/), which is grouped into two main sections: Core Web Vitals and Lighthouse.

## [Link to heading](#field-data:-core-web-vitals)Field data: Core Web Vitals

In the top section of PageSpeed Insights, labeled “Discover what your real users are experiencing,” Google collects global field data of the 75th percentile of actual users who have accessed your application in the last 28 days from Chrome browser (desktop and Android mobile devices).

Google uses the first three metrics of this real-world data—Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS)—to alter the rank of your application based on the scores. Note that as of March 12, 2024, [INP has replaced First Input Delay (FID)](https://developers.google.com/search/blog/2023/05/introducing-inp).

These three Core Web Vitals are the _only_ data Google uses to affect the rank of your app based on its web performance, and the scores seen here are exactly the numbers Google uses, albeit averaged into a group with [similarly-performing pages on your application](https://support.google.com/webmasters/answer/9205520).

You’ll also notice there are tabs for both desktop and mobile. This is because Google [ranks your application separately](https://developers.google.com/search/blog/2021/11/bringing-page-experience-to-desktop#:~:text=This%20means%20the,factor%20for%20desktop.) for mobile users vs. desktop users, based on the mobile and desktop versions of your site respectively.

![The mobile Core Web Vitals for google.com.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F16sa9uNHdhR0bz8Npj707T%2Fb8a45543b3346c1dd65a5109fb35984c%2F1920xVariable.png&w=1920&q=75)![The mobile Core Web Vitals for google.com.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2MQEt0ITfq0LZYh6IwHtOW%2F32cbdf0b87c629f0b605c9ac67f6eead%2F1920xVariable-1.png&w=1920&q=75)

The mobile Core Web Vitals for google.com.

The three metrics beneath the Core Web Vitals can offer further insight into user experience, but do not impact the rank of your application in search.

### [Link to heading](#which-users-are-included-in-core-web-vitals-field-data)Which users are included in Core Web Vitals field data?

The [Chrome User Experience Report (CrUX)](https://developer.chrome.com/docs/crux/) is the official dataset of Google’s Core Web Vitals program, and [its collection methodology](https://developer.chrome.com/docs/crux/methodology) is publicly documented. Notably, to be included in the report:

-   Pages must be “[sufficiently popular](https://developer.chrome.com/docs/crux/methodology#popularity-eligibility)” and “[publicly discoverable](https://developer.chrome.com/docs/crux/methodology#discoverability-eligibility).” Whether your pages meet popularity thresholds can be determined via the CWV report in Search Console.
    
-   Users must enable [usage statistic reporting](https://support.google.com/chrome/answer/96817), [sync their browser history](https://support.google.com/chrome/answer/185277) (be signed in to Chrome), and not set a [Sync passphrase](https://support.google.com/chrome/answer/165139?co=GENIE.Platform%3DAndroid#zippy=%2Ccreate-a-passphrase).
    
-   Users must use Chrome on either desktop or Android.
    

**This last bullet means that none of your iPhone users are counted.** This may be relevant insofar that in some markets Android phones skew slower than iPhones, and so a larger percentage of the slower visits to your site may be counted.

If your application does not have enough real user data, then your Core Web Vitals cannot be measured and will not be considered in ranking your application.

### [Link to heading](#does-it-matter-where-my-users-are-coming-from)Does it matter where my users are coming from?

Another frequent question is: Does it matter where my users are coming from? Do I get penalized if I have lots of users in countries with slower internet connectivity?

It _does_ matter where your users are coming from. The point of field data is that it reflects your real users, and all users from all global regions are counted equally.

The good news is that internet connectivity and device performance have been improving worldwide, and with an edge network like Vercel’s, you can [deliver great performance to every user on the planet](https://vercel.com/blog/the-user-experience-of-the-frontend-cloud).

### [Link to heading](#caveat:-28-day-sliding-window)Caveat: 28-day sliding window

Google collects Core Web Vitals data on a 28-day sliding window. Your score is essentially the average score of the last 28 days. If you make an improvement—or make things worse—it’s going to be a month before you understand the full impact of that action.

[See below](#a-quicker-way-to-iterate-on-core-web-vitals-vercel-speed-insights) how Vercel's Speed Insight can help you get faster access to updated CWV data, so you can react to changes in realtime and prevent ranking regressions.

## [Link to heading](#lab-data:-lighthouse)Lab data: Lighthouse

In the second section of PageSpeed Insights, labeled “Diagnose performance issues,” Google simulates the performance of your application within Lighthouse, which is the same tool found in Chrome DevTools.

This is a completely distinct section from the field data scores above and is meant as suggestions for improvement if you’re not already meeting Google’s standards for real users.

To reiterate, **nothing in Lighthouse counts toward your site’s search ranking.** It gives optional guidance that can help you avoid common pitfalls in web app development.

![The mobile Lighthouse scores for google.com.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2G2WeMfjOPvHSZuDcatUXO%2F7ca2645e41648efc3e77bb84f2564f60%2F1920xVariable-2.png&w=1920&q=75)![The mobile Lighthouse scores for google.com.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F56HjW2PLkBuDplFL4bF51R%2F82d5b9a87f43f90fa2a5bf6334e5998d%2F1920xVariable-3.png&w=1920&q=75)

The mobile Lighthouse scores for google.com.

The [Lighthouse performance score](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)—one of the most noticeable numbers on the page—is a weighted score of First Contentful Paint (FCP), [Speed Index](https://developer.chrome.com/en/docs/lighthouse/performance/speed-index/), LCP, Total Blocking Time (TBT), and CLS. Note that, after weighting, actual Core Web Vitals only represent 50% of this score, and INP is not accounted for.

Results here come from a device emulating a Moto G Power with a throttled network connection, which has specs that likely vary greatly from your actual users’ devices.

This and other [challenges associated with lab data](https://web.dev/articles/lab-and-field-data-differences) (such as not accounting for what page a user may be coming from before navigating to the reported page), make Lighthouse scores not suitable as your only UX metric.

For instance, Total Blocking Time (TBT) as a metric often does not reflect real user experience. This is because [modern frameworks like React interrupt execution](https://vercel.com/blog/how-react-18-improves-application-performance) if there is a user event—and hence deliver [good INP](https://vercel.com/blog/improving-interaction-to-next-paint-with-react-18-and-suspense)—but the lab test cannot know that when it is observing how much CPU is being used without real user interactions.

### [Link to heading](#interpreting-your-lighthouse-scores)Interpreting your Lighthouse scores

Despite challenges with lab data, Lighthouse still provides useful information, especially in narrowing down which parts of your application may be causing issues for your users. For instance:

-   **Performance** - If your Core Web Vitals are not in an acceptable range, Lighthouse [points to possible issues](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/), like linking scripts that may be blocking the main thread for too long. It also displays which exact element is being counted as causing your LCP.
    
-   **Accessibility** - Lighthouse spots [common errors](https://developer.chrome.com/docs/lighthouse/accessibility/scoring) such as unnamed links or form fields without labels. It can also screenshot elements that don’t have a high enough contrast ratio or links that don’t have enough space to tap.
    
-   **Best Practices** - This Lighthouse category is a bit of a catch-all for suggestions that
    
    [improve the security and usability](https://developer.chrome.com/docs/lighthouse/best-practices/doctype) of your applications. Information here will help browsers parse your code more easily and help to prevent some (but not nearly all) common vulnerabilities like XSS.
    
-   **SEO** - Lighthouse offers advice here about the [technical portion of your SEO](https://developer.chrome.com/docs/lighthouse/seo/meta-description)—the technical ways to help search engines crawl your site. These checks can be very helpful in debugging why your site may not be ranking as you expect, but they’re far from exhaustive in addressing all factors that may affect your app’s SEO.
    

### [Link to heading](#a-quicker-way-to-iterate-on-core-web-vitals:-vercel-speed-insights)A quicker way to iterate on Core Web Vitals: Vercel Speed Insights

Google’s data is the authoritative source for how your application is ranking in search and performing for your real users. However, as we mentioned above, the data that Google makes available uses a 28-day sliding window.

This means that if you ship an improvement or a regression it can take up to one month to see the full impact. And then, if you need to ship a fix for a regression, it can take yet another month for Google to pick up the improvement.

To maximize your iteration velocity, Vercel created [Speed Insights](https://vercel.com/docs/speed-insights). Since Chromium browsers expose Core Web Vital metrics as users access your site, the Speed Insights package installed on your site accesses these to report your real-time data. Then, you can react quickly, discovering and fixing problems the moment they appear.

![A snapshot of the Speed Insights tab from the project view.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7r7znmO3TDQuT3WS5zhGWc%2F54520cb9d737796ee4e7d5d0dd350cc1%2Fres-chart-light.png&w=1920&q=75)![A snapshot of the Speed Insights tab from the project view.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4Ll4chYpMzSQcnFxZjMs7U%2F21a1b35566eae7b0de55a16204cee9bb%2Fres-chart-dark.png&w=1920&q=75)

A snapshot of the Speed Insights tab from the project view.

Just like all Vercel features tied to [unlimited immutable deployments](https://vercel.com/blog/the-developer-experience-of-the-frontend-cloud), you can view Speed Insights on a per-deployment or even per-branch basis, allowing you to easily see the effect of each `git push` on application performance.

Unlike Google’s PageSpeed Insights, you can filter data to smaller windows than the past 28 days, allowing you to see the immediate effects of your changes or to measure arbitrary timespans correlated to large codebase changes.

You can also view individual routes of your application and view data by the 75th percentile of users (Google’s standard) and 90th, 95th, and 99th.

Furthermore, you can filter results by global region, allowing you to better allocate resources to where your actual users reside.

![Geographic map of the P75 score where the color intensity indicates the relative amount of data points per country.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F29MfL1SpmgVWK8Nl98RJiz%2Fdcd1683e20b8dcd6825c64be2f390ca5%2Fcountry-map-light.png&w=1920&q=75)![Geographic map of the P75 score where the color intensity indicates the relative amount of data points per country.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4txoehjjKXtgVNdJAaBfcI%2F12c800f7d61b137d7f7efe855caa408f%2Fcountry-map-dark.png&w=1920&q=75)

Geographic map of the P75 score where the color intensity indicates the relative amount of data points per country.

To ensure that the Speed Insights feature can be used despite many different regulatory limitations around the world, we've designed it in such a way that it provides you with information without being tied to, or associated with, any individual visitor or IP address.

## [Link to heading](#further-reading:-optimizing-core-web-vitals)Further reading: Optimizing Core Web Vitals

Now that you have an overview of what Core Web Vitals are, how to measure them, and how they impact your application, you may be wondering, “How do I optimize each metric?”

We've written [deep dive into the topic](https://vercel.com/resources/how-vercel-improves-your-websites-search-engine-ranking), specific to JavaScript frameworks and Vercel tooling.

We also recommend Google’s technical guides on optimizing individual metrics: [Largest Contentful Paint (LCP)](https://web.dev/articles/optimize-lcp), [Cumulative Layout Shift (CLS)](https://web.dev/articles/optimize-cls), and [Interaction to Next Paint (INP)](https://web.dev/articles/optimize-inp).

## [Link to heading](#takeaways)Takeaways

-   Improving Core Web Vitals is the most transparent ranking factor in Google Search, since you have direct access to the underlying data used by Google to rank your site.
    
-   Only Core Web Vitals count for Google’s search ranking. Your Lighthouse score is ignored.
    
-   Google’s data uses a 28-day sliding window. For improving your site speed at a
    
    [higher iteration velocity](https://vercel.com/blog/iterating-from-design-to-deploy), Vercel’s Speed Insights gets you real-time, easily filterable access to your Core Web Vitals.
    

[

**Your metrics, better with Vercel.**

Our team obsesses over performance. We'll help you find opportunities to improve your application's Core Web Vitals.

Talk to an Expert



](https://vercel.com/contact/sales)