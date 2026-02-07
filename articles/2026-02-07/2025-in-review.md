---
title: "2025 in Review"
source: "https://tkdodo.eu/blog/2025-in-review"
publishedDate: "2025-12-26"
category: "frontend"
feedName: "TkDodo"
---

![A close up of the number 2025 with flowers on it](https://tkdodo.eu/blog/static/f96c22a9166c271fabba1f1b5ff29705/bbe0c/2025.jpg "A close up of the number 2025 with flowers on it")

-   [한국어](https://chapdo.vercel.app/posts/%EB%B2%88%EC%97%AD-2025-in-Review/)
-   [Add translation](https://github.com/TkDodo/blog/blob/main/CONTRIBUTING.md#translations)

It's that time of the year again - the time where I look back at what I did in the last 12 months. The good, the great and the perfect. Because, to be honest, 2025 was an amazing year for me. Let's start with my new job:

## Sentry 👨‍💻[](#sentry-)

On January 7th, I joined the Design Engineering Team at Sentry as a part-time contractor after working for a startup in Vienna for the last decade. This was by far the biggest change in my career ever, which was exciting and terrifying at the same time. But, what can I say: I really enjoy working at Sentry. Everyone in the Vienna office is super nice and welcoming, the work is challenging and rewarding, and I even got to travel to San Francisco for a week, which is the first time I left Europe since I've had kids.

I already wrote about what we do in the Design Engineering Team in my blog post [Designing Design Systems](https://tkdodo.eu/blog/designing-design-systems#design-engineering) earlier this year, but in case this sounds a bit abstract, here's a concrete but non-exhaustive list of things I helped ship this year that I am quite proud of:

### The Sentry re-design[](#the-sentry-re-design)

In case you haven't seen it yet - [Sentry has a bold new look](https://blog.sentry.io/sentry-has-a-bold-new-look/), and the Design Engineering team was responsible for rolling it out to the whole platform. This went hand in hand with building S.C.R.A.P.S - our new design language and the design system (Standardized Collection of Reusable Assets & Patterns for Sentry).

The name is quite fitting as we've literally pulled the first version together from existing "shared components" we've found all over the codebase. This also means we have a lot of work ahead of us, making APIs and documentation better as well as providing new patterns that are just outright missing.

### Improving the Sentry codebase[](#improving-the-sentry-codebase)

We've put quite a bit of effort into trying to make the Sentry codebase better for everyone, as it has organically grown with little oversight over the last 10 or so years. This year, we've enabled [type-aware linting](https://github.com/getsentry/sentry/pull/88072), turned on [noImplicitAny](https://github.com/getsentry/sentry/pull/83366) and introduced [knip](https://knip.dev/) to remove a lot of unused code. This project, which took [a lot of effort](https://github.com/getsentry/sentry/pulls?q=is%3Apr+author%3ATkDodo+%E2%9C%82%EF%B8%8F+is%3Aclosed) over a couple of months, also inspired me to write the talk Dead Code Shouldn't Exist, which I will be giving at various conferences [next year](#2026-outlook-).

### Improving the Sentry product[](#improving-the-sentry-product)

We've also put some work into making Sentry faster for everyone. ⚡ This includes features like [route intent preloading](https://github.com/getsentry/sentry/pull/102574), [automatic virtualization](https://github.com/getsentry/sentry/pull/104805) for our Select component and using [shared layouts](https://github.com/getsentry/sentry/pull/100915) to avoid a flashing loading spinner during first navigation.

And we're in the process of replacing the home-grown URL state solution with [nuqs](https://nuqs.dev/), which is an ongoing migration that will also have a positive perf impact thanks to its support for [shallow routing](https://nuqs.dev/docs/options#shallow). This has led me to become an active contributor to nuqs, as I got a bunch of [features and fixes](https://github.com/47ng/nuqs/pulls?q=is%3Apr+author%3ATkDodo+is%3Aclosed) merged this year. So, it is true that one of the best ways to contribute to open source is by helping out with the tools you love and that you actively need. Shout out to [François Best](https://github.com/franky47) for guiding me through the nuqs codebase. He is literally the Best. 🙌

## Open Source 🔓[](#open-source-)

On the one hand, it feels like open source has slowed down for me this year. For [TanStack Query](https://tanstack.com/query/latest), pretty much nothing happened. Although, we started the year on v5.62.11 and are now on v5.90.12, so that means we must've shipped some features, but I guess it was nothing groundbreaking. [staleTime:'static'](https://github.com/TanStack/query/releases/tag/v5.79.0) and [timeoutManager](https://tanstack.com/query/latest/docs/reference/timeoutManager) come to mind but they are both quite niche, so I wouldn't be surprised if you haven't use them yet. Oh, there's also [streamedQuery](https://tanstack.com/query/latest/docs/reference/streamedQuery) which was a nice addition. I guess sometimes, we just forget how long a year really is, and looking back like this, we realize how much has actually happened. 😅

Also, yes, I have an unsorted list for what might become a v6 someday, but I'm in no rush here. I will post a public discussion once I'm sufficiently confident on what needs to be done. Usage has spiked thanks to AI, and most people are _very happy_ with the library as it is. The improvements that are left to be done are either very small, or for edge-cases that don't come up a lot. I wouldn't say Query is "feature complete", but it's very likely "good enough" for what users currently try to do.

On the other hand, there is one thing looming over me, and that is of course [Async React](https://www.youtube.com/watch?v=zyVRg2QR6LA&t=30858s).

### Async React[](#async-react)

React has shipped a lot of new features recently: Suspense, `useTransition` & View Transitions, `use`, `useOptimistic` and Actions. If you've seen Ricky's talk, you can see that these features are really great and quite powerful if used correctly, but you can probably also see in the demo that the APIs are a bit low-level and aren't as easy to use as we'd hope.

In [part two](https://www.youtube.com/live/p9OcztRyDl0?t=30728s) of his talk, he concludes that we need three things to make this better: Async React support in our design component libraries, our routers and our data-fetching libraries by default. Basically, app developers will not need to worry about those low-level APIs once existing libraries provide a good abstraction of them and integrate with them seamlessly.

As someone who works on all three of these - TanStack Router, TanStack Query and Sentry Scraps - that's terrifying.😂 It means I need to figure out a lot of things going forward. At least for now, that seems like a "future me" problem. Expect more blog posts on this next year as the [async react working group](https://github.com/reactwg/async-react) ramps up and we collectively get a better understanding of the topic.

## Public Appearances 🗣️[](#public-appearances-%EF%B8%8F)

I gave the talk [React Query API Design - Lessons Learned](https://www.youtube.com/watch?v=l3PxErcKeAI) at React Paris and a workshop called [React Query - Beyond the Basics](https://github.com/TkDodo/react-query-beyond-the-basics) for React Summit Amsterdam and React Advanced London. This was the first time I did a workshop, and I was positively surprised about the experience. I love teaching patterns about React Query and I think I'm uniquely qualified given my experience with it. Preparing the workshop took a lot of work (more than prepping a talk), but seeing how everyone took away something from those four hours no matter their experience level made it totally worth it.

So if you want me to to give that workshop for you too, in person or remote, please do [reach out](https://tkdodo.eu/cdn-cgi/l/email-protection#8ffbe4ebe0ebe0cfebe0fde9e2eae6fcfbeafda1ececb0fcfaede5eaecfbb2ddeaeeecfbaabdbfdefaeafdf6aabdbfcdeaf6e0e1ebaabdbffbe7eaaabdbfcdeefce6ecfcaabdbff8e0fde4fce7e0ff).

## Blogging 📚[](#blogging-)

I tried to blog regularly, and despite having a lot of work, I managed to write eleven blogposts - almost one per month. I do have another one lined up about [TanStack Router](https://tanstack.com/router/latest) that I _cannot_ publish yet , because it references APIs that don't exist and need to be implemented first, so I guess that counts as #12.

I even made it to the front page of Hacker News, as you can see in this beautiful statistic:

[

![Avatar for TkDodo](https://tkdodo.eu/blog/static/f5315ea49d7e41077957b8c547d2dedb/37851/1021430.jpg)

Dominik 🔮

@

tkdodo.eu

PoV: A day on the orange site in July 🟠

![Unique Visitor stats, showing a huge outlier for one day in July](https://tkdodo.eu/blog/static/87f805dfe57cfc8f6bc79211fbee2993/d6451/bafkreiazq5owsx6neqzgvjquwenob6su4kgd7zzl3z5ytfq4oywwjwbis4.jpg)

\-

Oct 13, 2025



](https://bsky.app/profile/tkdodo.eu/post/3m33upgcdjc2c)

It even lead to me going back on the PodRocket podcast talking about [Is React's useCallback Hook Useless?](https://www.youtube.com/watch?v=XDC4aBn10Lk).

Despite that, [traffic to my blog](https://plausible.io/tkdodo.eu?period=year) started to go down by a quarter year over year. I think this is mostly because of AI giving you answers directly, which means a lot of people don't need to go read blogposts anymore. It's nice to see though that the visit duration and views per visit are both trending upwards 📈, which indicates people that decide to do visit my blog like what they see.

## Running 🏃‍♂️[](#running-%EF%B8%8F)

2025 is the year I started to take running seriously. I signed up for the [Wachau Half Marathon](https://www.wachaumarathon.com/bewerbe/halbmarathon/) in September and began training towards that in March. I started with 2-3 times a week and ramped up to 4 times a week during summer.

I did a couple of 10k races to prepare myself for the longer distances and to get a feeling for how different it was gonna be to actually compete in a race. I didn't want to believe it, but just the presence of others, the people cheering for you and the "race mentality" really makes you go faster than you ever thought you could during training.

For example, I finished my best training 10k in 59:21, but my PR, which happened in a race, comes in at 51:56.

I also ran the 21.1k distance once in July with a friend, finishing in 2:07:04. My goal for the race was to finish in under 2 hours, so a training run being in that area meant I could probably get there while racing.

Sadly, it never got to that. The only time I got sick this year was one week before the race. 😭 I was feeling better after three days, but still decided to listen to my body and skip the race. It's not worth jeopardizing one's health, and I was scheduled to travel to [React Prague - The Spark](https://guild.host/events/the-spark-twri2g) a couple of days after that, and I didn't want to miss that.

Looking back, the stats tell me that I got quite a bit better at running too. Beginning of the year, my base runs were typically 5km at about 6:30 pace. Now, I usually run at a 5:40 pace easily. That is - with the same heart rate of around 150bpm.

The year isn't over yet, but my watch tells me I ran just over 1k kilometers (1007km) in 142 running activities so far. For next year, I do want to finally get that half marathon race done, and I want to consistently run 100 km per month.

## 2026 Outlook 👀[](#2026-outlook-)

Interestingly, I have a lot of my travel for 2026 sorted out already. I will be on the road quite a bit more than this year. If you're at any of these events and want to meet up, let me know:

-   March 26 & 27: [React Paris](https://react.paris/)
-   May 14 & 15: [JsHeroes](https://jsheroes.io/)
-   June 5: [React Norway](https://reactnorway.com/)
-   June 11 & 12: [JsNation](https://jsnation.com/) & [React Summit](https://reactsummit.com/)
-   September 11: [ZurichJs](https://conf.zurichjs.com/)

I also have a couple of CFPs still unanswered, so maybe I'll be at another european event or two that I don't yet know about.

## Happy New Year 🎉[](#happy-new-year-)

With that, I like to wish y'all a happy new year, and yes, of course I'm going to really re-write my blog in [Astro](https://astro.build/) in 2026. Just like I did for the last four years. 😉

* * *

That's it for today. Feel free to reach out to me on [bluesky](https://bsky.app/profile/tkdodo.eu) if you have any questions, or just leave a comment below. ⬇️

Like the monospace font in the code blocks?

[

![Bytes - the JavaScript Newsletter that doesn't suck](https://tkdodo.eu/blog/static/af2e4efdec2a9cf31764170231582f59/1f097/bytes.jpg)

](https://bytes.dev/?r=dom)