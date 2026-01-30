---
title: "2025 in Review"
source: "https://kentcdodds.com/blog/2025-in-review"
publishedDate: "2025-12-03"
category: "frontend"
feedName: "Kent C. Dodds"
---

I like to write these reviews as a way to take stock, celebrate the wins, learn from the mistakes, and set direction for what comes next.

2025 was a big year for me professionally. I made a major pivot in focus from EpicReact/EpicWeb toward EpicAI and the Model Context Protocol (MCP). This year was exhilarating, exhausting, and (in a few ways) heartbreaking.

And personally? We welcomed our 6th child, which has been a huge blessing and a huge time commitment (newborn season is real).

## [The pivot: from "websites" to "Jarvis"](#the-pivot-from-websites-to-jarvis)

I told this story in [a talk I gave at Remix Jam](https://kentcdodds.com/talks/interactive-mcp-with-react-router), and it really captures how I got here.

Last year, my friend [Ryan Florence](https://x.com/ryanflorence) and I drove together to [React Conf 2024](https://conf2024.react.dev/). It was one of those long drives where you solve the world's problems between snacks and bathroom breaks. We talked a lot about React, what the future of Remix/React Router might be, and (more broadly) the future of user interaction.

At React Conf, [Evan Bacon](https://x.com/baconbrix) gave [a demo](https://youtu.be/djhEgxQf3Kw?si=E0UTGOFKL-ufC2Pp&t=677) that lodged itself in my brain. Asking questions to AI and getting text back is neat, but the better user experience is when the response is _interactive_. Native UI, not just paragraphs. (I made an article/video about this later: [The Future of AI Interaction: Beyond Just Text](https://www.epicai.pro/the-future-of-ai-interaction-beyond-just-text-w22ps)).

Fast forward a few months. I'd just finished [Epic Web Conf 2025](https://www.epicweb.dev/conf/2025) and my head was full of web/React/React Router thoughts. Ryan was supposed to speak, but he got sick, so I brought all his swag to his house the next day and we chatted. That conversation went straight back to the "future of interaction" topic and we basically reduced it down to one word: **Jarvis**.

Jarvis (Iron Man's assistant) isn't "a chatbot." Jarvis is the interface. Jarvis knows you, keeps context across your life, and can _do things_.

And in that conversation, Ryan told me about the Model Context Protocol (MCP). That weekend flipped a switch for me. Everything before was React and Remix and React Router and then suddenly I was like: "This is it. We can actually do this now. We can make a huge leap into a new way users interact with software."

For the last couple years, the industry message has been: "Add a chatbot to your app." I think we're leaving that era. The next era is: **Add your app to the chatbot.**

Users don't want to visit five different apps and re-explain themselves five different times. They want one assistant that can coordinate across services. And for that to work, we need a standard protocol that lets _all of us_ plug in, not just the biggest companies with bespoke integrations.

That's the core idea that pulled me toward EpicAI and MCP.

## [EpicAI: a new home for the MCP era](#epicai-a-new-home-for-the-mcp-era)

In March, I launched [EpicAI.pro](https://www.epicai.pro/).

This year felt like going from "I think this is important" to "oh wow, this is _definitely_ important" in real time.

Some highlights:

-   **Posts**: I wrote a bunch on EpicAI. If you want the list, they're all on the [EpicAI posts page](https://www.epicai.pro/posts).
-   **Workshops**: We ran a bunch of MCP workshops. The full list is on the [events page](http://epicai.pro/events).
-   **Self-paced workshop launch**: I'm really proud of [Epic MCP: From Scratch to Production](https://www.epicai.pro/workshops/epic-mcp-from-scratch-to-production).

This whole effort has been about helping people build _real_ MCP servers (things that can stand up in production) and helping them catch the vision for what MCP unlocks when combined with great UI.

Things just keep happening to confirm this is the direction people are going. There are plenty of nay-sayers and skeptics outside of the MCP community, but all the right players are participating and in 2026 we're going to see an explosion of MCP-powered apps (mostly thanks to ChatGPT's adoption of [MCP Apps](https://blog.modelcontextprotocol.io/posts/2025-11-21-mcp-apps/) I think).

## [Epic Workshop App improvements (and the new CLI experience)](#epic-workshop-app-improvements-and-the-new-cli-experience)

A huge part of making EpicAI (and Epic Web) content actually _usable_ is the Epic Workshop App (a.k.a. epicshop). We (me, contributors, Copilot, and Cursor) made a bunch of improvements throughout 2025, but the biggest win (in my opinion) was the **new CLI experience**.

Over the year, the CLI got dramatically smoother and more capable: it was renamed to `epicshop`, the commands were flattened/simplified, and a lot of the workflow became **interactive** (picking workshops/subcommands, opening the workshop in your editor, choosing custom clone destinations, better guidance messages, and a bunch of cross-platform polish (especially on Windows).

You can now manage your workshops by simply running `npx epicshop` and I think that's cool.

On top of that, the app itself kept leveling up too. Things like improved error handling, better update flows, quality-of-life shortcuts, richer "presence" information, and even MCP-related upgrades (including MCP server improvements).

If you're curious about the details, the full release notes live in the [epicshop repo](https://github.com/epicweb-dev/epicshop/releases), but the headline is: it's becoming a _real_ product-quality experience for running workshops locally (and that matters a lot when you're teaching people to build real things).

## [Epic Stack updates](#epic-stack-updates)

Even with my focus shifting hard toward EpicAI, the [Epic Stack](https://github.com/epicweb-dev/epic-stack) kept moving forward in a big way this year (huge thanks to everyone who helped).

Some highlights from the 2025 releases:

-   We moved the stack forward with **React Router v7** and the surrounding improvements to keep things modern and maintainable.
-   We added **passkeys**, made a bunch of security/performance improvements, and shipped a pile of quality-of-life fixes.
-   We made some meaningful infrastructure/tooling changes, like moving image storage to **Tigris** and adding **image optimization** via `openimg`.
-   We upgraded to **Tailwind v4**.
-   Later in the year we migrated from `remix-flat-routes` to `react-router-auto-routes` and added `react-router-devtools`.

If you want the full blow-by-blow, the release notes are all here: [Epic Stack releases](https://github.com/epicweb-dev/epic-stack/releases).

Seriously: thank you to everyone who opened issues, submitted PRs, reviewed, and helped keep the stack healthy. The Epic Stack is better because of your contributions.

## [Epic Web Conf 2025 (and why it hurts)](#epic-web-conf-2025-and-why-it-hurts)

In March we ran [Epic Web Conf 2025](https://www.epicweb.dev/conf/2025) in Salt Lake City. We did a workshop day and a conference day, and (as always) the people made it special.

(Also, [here's last year's photos](https://x.com/kentcdodds/status/1785412481906778248), because I forgot to write a year in review for 2024 😅).

I also lost money on this event. I'm gutted that I can't run it again for the foreseeable future.

There are a lot of reasons for that, but the simplest is: I can't afford to keep splitting my focus and I can't afford to keep losing money. I love running events, but I need to be responsible about what I commit to.

## [Epic Web Camp (2024 + the cancelled 2025)](#epic-web-camp-2024--the-cancelled-2025)

[Epic Web Camp](https://www.epicweb.dev/camp) happened in 2024 and it was a beyond special experience:

We were going to do it again in 2025 (the video even had dates!), but I had to cancel for the same reasons I'm not running the conference: I need to avoid splitting my focus and I need to avoid losing money.

Honestly between this and the conference, I'm more gutted about the camp. It was just such a great experience. I hope to bring it back one day.

On another note, I did actually run an unofficial Epic Web Family Camp thing this year. The venue for Epic Web Camp is the Aspen Grove Family Camp and during the summer they run week-long camps for families to come up and do things together so I did this:

[![Kent C. Dodds ⚡ avatar](https://pbs.twimg.com/profile_images/1567269493608714241/6ACZo99k_bigger.jpg)

Kent C. Dodds ⚡ @kentcdodds

](https://x.com/kentcdodds)

> Ok, I've put together a form to gauge actual interest and get emails for specific individuals to reach out to if I decide to do this. If you'd like to have the coolest summer vacations (basically a cruise in the mountains), let me know your interest here: [EpicWebCamp 2025 interest sign up](https://docs.google.com/forms/d/e/1FAIpQLSdWt0ZI5dTNuYErN6KxaXq-g8gXbfFC5WeheDvmC5vmvRSq6g/viewform?usp=send_form)

[![Referenced media](https://lh4.googleusercontent.com/yedcLLYcaTG4Q8iadMCywSgEedReutp3HzeGSGuUcsuwTQ1C_idhPRB5JtClfr7PgF4q2QG_w7vl_po=w1200-h630-p)

EpicWebCamp 2025 interest sign up

This does not secure you a spot at the camp. I’m just determining interest levels in the community to help me know whether I should do this. Check this thread for more details (and a video I made for the 2024 non-family camp edition featuring some of what Aspen Grove has to offer). TL;DR on Aspen Grove: Aspen Grove Family Camp, run by BYU and located in Provo Canyon Utah (https://maps.app.goo.gl/JKiEbFYMBAtNWY8p7), offers a week long mountain retreat focused on family bonding and community. Families enjoy a mix of activities tailored for all ages, with kids engaged in their own fun while parents participate in adult-only activities like hiking, crafts, and social events. These adult activities foster not just relaxation but also the chance to build friendships with other people at the camp. Families come together for meals and evening programs, creating shared memories, while the camp’s structure also allows for the development of meaningful connections with other families, strengthening both family ties and adult friendships. It should be noted that Aspen Grove Family Camp has a religious foundation rooted in BYU’s Latter-Day Saint values, with Sundays featuring optional worship services, including a family sacrament meeting and other faith-based activities. For those who prefer not to participate in religious services, the camp offers a peaceful environment to enjoy nature, relax, or engage in quiet activities independently or with family, ensuring an inclusive experience for all attendees. While the camp experience is focused on families, you’re more than welcome to come solo! We’ll have room(s) for solo attendees to lodge with each other. Pricing: I will charge a bit on top of the regular camp pricing to pay for matching shirts for everyone attending. I do not plan on making money on this experience and I do not plan on getting sponsors for this either. For details on camp pricing, see: https://aspengrove.byu.edu/family-camp-2023-dates-pricing Here’s the TL;DR on pricing: Adults (19+): $950 Teens (12-18): $835 Children (9-11): $700 Children (5-8): $600 Children (3-4): $535 Infants (0-2): $400 So for a family of two adults and three kids ages 1, 5, and 8, you can expect to pay: $3,500 + a bit more for shirts. Date: Camp is pretty filled up most weeks in the summertime. We’re planning on August 2-8th 2025 We need to act pretty quickly to grab the remaining slots before they’re taken.

docs.google.com



](https://docs.google.com/forms/d/e/1FAIpQLSdWt0ZI5dTNuYErN6KxaXq-g8gXbfFC5WeheDvmC5vmvRSq6g/viewform?usp=send_form)

[![Kent C. Dodds ⚡ avatar](https://pbs.twimg.com/profile_images/1567269493608714241/6ACZo99k_bigger.jpg)

Kent C. Dodds ⚡ @kentcdodds

](https://x.com/kentcdodds)

> #EpicWebCamp hasn't even happened yet, and I'm thinking about next year already. I'm thinking about doing it during the regular family camp that Aspen Grove runs in the summertime. I'm trying to decide if we could get people there. Please reply to the details below:

[2](https://x.com/kentcdodds/status/1821919843643511248) [](https://x.com/intent/retweet?tweet_id=1821919843643511248)[21](https://x.com/intent/like?tweet_id=1821919843643511248)[](https://x.com/kentcdodds/status/1821919843643511248)

[1](https://x.com/kentcdodds/status/1822029048815722509) [](https://x.com/intent/retweet?tweet_id=1822029048815722509)[19](https://x.com/intent/like?tweet_id=1822029048815722509)[](https://x.com/kentcdodds/status/1822029048815722509)

We had a couple families join us and we had an amazing time and I even made some new life-long friends as well.

We'll see what we can do in the future here.

## [Talks, travel, and a whole lot of planes](#talks-travel-and-a-whole-lot-of-planes)

I can't say I "didn't travel a ton" this year 😅

Here are my TripIt stats for 2025:

-   Distance traveled: **58,698 miles**
-   Total days: **60**
-   Total trips: **16**
-   Countries/regions visited: **7**
-   Cities visited: **18**

For talks, I keep an updated list on my [talks page](https://kentcdodds.com/talks), but a few 2025 highlights were:

-   The MCP/Jarvis arc (including ["The New User Interaction Model"](https://kentcdodds.com/talks/the-new-user-interaction-model))
-   Remix Jam: ["Interactive MCP with React Router"](https://kentcdodds.com/talks/interactive-mcp-with-react-router)
-   MCP Developers Summit: ["Please Make Jarvis (so I don't have to)"](https://kentcdodds.com/talks/please-make-jarvis-so-i-dont-have-to)
-   React Conf 2025: ["React Router's take on RSC"](https://kentcdodds.com/talks/react-routers-take-on-rsc)

## [Podcasting, interviews, and my own shows](#podcasting-interviews-and-my-own-shows)

I did a bunch of podcast appearances this year. The canonical list lives on my [appearances page](https://kentcdodds.com/appearances), but here are a few 2025 standouts:

-   **Dry Run (Cloudflare Developers Podcast)**: We built an MCP server together and talked through what it takes to make one real. This is one of my favorite "show, don't tell" formats: [Dry Run: Create an MCP Server with Kent C. Dodds](https://www.youtube.com/watch?v=B-HEItnoLg0)
-   **Software Huddle**: We talked about building Jarvis and the broader direction of agents + standards: [It's time to build Jarvis with Kent C. Dodds](https://www.youtube.com/watch?v=a5eo0OIJlXo)
-   **ConTejas Code**: AI, MCP, and agents. This was at the very start of my MCP move. Basically the whole pivot in one conversation: [Kent C. Dodds: AI, MCP, and Agents](https://www.youtube.com/watch?v=bDylSXfVIVM&list=PLEJpU2pV0Lie1VWU1unMg_7FRQ1gqFmAZ)

And here are the other 2025 episodes (linked from the appearances page):

-   The Programming Podcast: [How GREAT Senior Software Engineers Think! (Steal these 9 TIPS!) Kent C. Dodds](https://www.youtube.com/watch?v=kEIG3n5W8_Q&list=PLhSJZbh9flb2wOaiiprOplVF6PQLLL5kP)
-   Coding Adda Podcast: [How To Succeed As A Developer - Lessons from Kent C Dodds | Episode 24](https://www.youtube.com/watch?v=ilmRsX2X7zM&list=PLI7xwGSSw_fIRv8Q4nz77IqgqhRxTBbBW)
-   Guidance Counselor 2.0: [Episode 425 - Start Showing Up and Get Off Your Couch w/ Kent Dodds](https://open.spotify.com/episode/2qdwNKjiVZODYnWHp5GJEj?si=qIu5ktErRbet4DvGvm_eGA)
-   HTML All The Things Podcast: [AI Has Broken the Web Developer Job Market w/ Kent C. Dodds](https://www.htmlallthethings.com/podcasts/ai-has-broken-the-web-developer-job-market-w-kent-c-dodds)
-   Next Gen Web Podcast: [AI in programming, Remix, Next.js, PESPA & more with Kent C. Dodds | THE NEXT GEN WEB PODCAST #12](https://www.youtube.com/watch?v=Y_zsigyj1So)

Also, two fun personal milestones for my own podcasts:

-   Season 6 of [Chats with Kent](https://kentcdodds.com/chats/06) is the speakers of Epic Web Conf 2025.
-   Almost all of season 5 of [Calls with Kent](https://kentcdodds.com/calls/05) happened in 2025.

## [My most engaged-with posts](#my-most-engaged-with-posts)

I've had some posts this year get a surprising amount of engagement. A few of my favorites.

MCP was definitely a standout topic and things kept happening all year to confirm my pivot was the right direction.

[![Kent C. Dodds ⚡ avatar](https://pbs.twimg.com/profile_images/1567269493608714241/6ACZo99k_bigger.jpg)

Kent C. Dodds ⚡ @kentcdodds

](https://x.com/kentcdodds)

> OpenAI just dropped the Apps SDK, built on MCP. This is the future of how users will interact with your apps. You won’t need to build a chatbot anymore. OpenAI is the chatbot. You just expose your tools through MCP. Exciting progress toward Jarvis!

[](https://x.com/kentcdodds/status/1975308821196386507)

[46](https://x.com/kentcdodds/status/1975308821196386507) [](https://x.com/intent/retweet?tweet_id=1975308821196386507)[768](https://x.com/intent/like?tweet_id=1975308821196386507)[](https://x.com/kentcdodds/status/1975308821196386507)

I announced the arrival of our 6th child:

I also made a couple jokes about "starting at Microsoft" (I was actually just visiting for Microsoft MCP Dev Day / VS Code Summit):

And here are the rest. I'm not going to annotate every one here, but if you want to browse what resonated most this year, this is a fun little time capsule:

[![Kent C. Dodds ⚡ avatar](https://pbs.twimg.com/profile_images/1567269493608714241/6ACZo99k_bigger.jpg)

Kent C. Dodds ⚡ @kentcdodds

](https://x.com/kentcdodds)

> What if instead of fighting with Oracle over the JavaScript trademark, we just all stop calling it JavaScript and just call it TypeScript instead?

[92](https://x.com/kentcdodds/status/1933690536105554385) [](https://x.com/intent/retweet?tweet_id=1933690536105554385)[1,237](https://x.com/intent/like?tweet_id=1933690536105554385)[](https://x.com/kentcdodds/status/1933690536105554385)

[![Kent C. Dodds ⚡ avatar](https://pbs.twimg.com/profile_images/1567269493608714241/6ACZo99k_bigger.jpg)

Kent C. Dodds ⚡ @kentcdodds

](https://x.com/kentcdodds)

> In my new house, I didn't even have them run a gas line to the house at all. I think we'll look back on this time and think it was crazy that we piped this stuff straight into our homes.

[331](https://x.com/kentcdodds/status/1909904087845372259) [](https://x.com/intent/retweet?tweet_id=1909904087845372259)[1,935](https://x.com/intent/like?tweet_id=1909904087845372259)[](https://x.com/kentcdodds/status/1909904087845372259)

[![Kent C. Dodds ⚡ avatar](https://pbs.twimg.com/profile_images/1567269493608714241/6ACZo99k_bigger.jpg)

Kent C. Dodds ⚡ @kentcdodds

](https://x.com/kentcdodds)

> All running on a $5 VPS

[![tobi lutke avatar](https://pbs.twimg.com/profile_images/1999293930936909824/_HWYanot_bigger.jpg)

tobi lutke @tobi

](https://x.com/tobi)

> Congratulations to our merchants on another record breaking Black Friday. LFG → Merchants total Black Friday sales were $6.2 billion, up 25% YoY → Edge peaked at 489 million requests per minute. App servers handled a peak of 117 million requests per minute, up 40% from last

[126](https://x.com/tobi/status/1994767758392009124) [](https://x.com/intent/retweet?tweet_id=1994767758392009124)[3,080](https://x.com/intent/like?tweet_id=1994767758392009124)[](https://x.com/tobi/status/1994767758392009124)

[26](https://x.com/kentcdodds/status/1994776802284421237) [](https://x.com/intent/retweet?tweet_id=1994776802284421237)[951](https://x.com/intent/like?tweet_id=1994776802284421237)[](https://x.com/kentcdodds/status/1994776802284421237)

## [CodeTV: Web Dev Challenge (No Keyboards Allowed)](#codetv-web-dev-challenge-no-keyboards-allowed)

I made my second appearance on CodeTV's Web Dev Challenge: [No Keyboards Allowed](https://codetv.dev/series/web-dev-challenge/s2/e10-no-keyboards-allowed)

It's a really fun format and I always enjoy seeing what gets built under pressure. Thanks [Jason](https://x.com/jlengstorf) for having me!

## [Listening: Pocket Casts, audiobooks, podcasts, and scriptures](#listening-pocket-casts-audiobooks-podcasts-and-scriptures)

I listen to basically everything in one place: [Pocket Casts](https://pocketcasts.com/).

I use custom-built software I made to turn my audiobooks into an RSS feed so I can listen to them in Pocket Casts alongside my podcasts. I even listen to my scriptures in the same app.

My Pocket Casts stats for the year:

-   Minutes listened: **62,518** (that's 1,042 hours of audio! 😱)
-   Episodes listened: **1,469**

Most listened-to feeds:

-   My audiobooks
-   [Syntax.fm](https://syntax.fm/)
-   [Ride the Lightning (Tesla and EV Podcast)](https://www.patreon.com/cw/teslapodcast)
-   [The Ancient Tradition Podcast](https://theancienttradition.com/)
-   [The Diary of a CEO](https://www.youtube.com/@TheDiaryOfACEO)

Scripture listening highlights:

-   I listened to the entire [Book of Mormon](https://www.churchofjesuschrist.org/study/scriptures/bofm)
-   Almost all of the [Old Testament](https://www.churchofjesuschrist.org/study/scriptures/ot)
-   The entire [Doctrine and Covenants](https://www.churchofjesuschrist.org/study/scriptures/dc-testament)

## [Personal](#personal)

The biggest personal highlight of 2025 was welcoming our 6th child. I don't post pictures of my kids online, but I'll say (again): I'm incredibly grateful for my wife and kids.

The last couple months of 2025 required a ton of my time because of the new baby, and I expect early 2026 to be similar. That reality is going to shape what I say "yes" to for a bit (especially travel).

## [Looking ahead to 2026](#looking-ahead-to-2026)

I'm excited about 2026. I'm also trying to be realistic about time, energy, and focus.

Here are the big things I'm planning right now:

### [Intro to TypeScript Programming (local college)](#intro-to-typescript-programming-local-college)

I'm working with a local college to build out a curriculum for their **"Intro to TypeScript Programming"** class. With the arrangement, I get to keep 100% of the IP. Think of it like they're asking me to write a textbook which they will use in their class. They actually used [EpicReact.dev](https://www.epicreact.dev/) in 2025 and it was a great success!

What this means is I'll be able to make this available to you and your friends as well!

Doing more truly-intro content is something I've wanted to do for a _long_ time. I even mentioned it years ago as part of my "KCD EDU" dream:

> For a long time now, I've wanted to create a place where I could help get someone from 0 to hero in software development...

([context here](https://kentcdodds.com/blog/2010s-decade-in-review#kcd-edu))

This will likely be **5 workshops**, and I plan to make them available on EpicWeb.dev in the first half of 2026.

### [Free substantial updates to EpicAI (a new promise for me)](#free-substantial-updates-to-epicai-a-new-promise-for-me)

I also promised to update [the self-paced workshop series on EpicAI.pro](https://kentcdodds.com/workshops/epic-mcp-from-scratch-to-production) in the first half of 2026 **for free**.

I've never promised free substantial updates in the past, so this is a new kind of commitment for me. I don't like promising my future to anyone. But MCP is changing so fast that I felt like an exception was warranted.

So my first half of 2026 is going to be very busy!

## [Conclusion](#conclusion)

Thanks for following along with me. I'm grateful for the people who cheer me on, the people who challenge my ideas, and the people who build alongside me.

Onward to 2026.