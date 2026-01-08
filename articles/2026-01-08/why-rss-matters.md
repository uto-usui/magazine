---
title: "Why RSS matters"
source: "https://werd.io/why-rss-matters/"
publishedDate: "2026-01-06"
category: "design"
feedName: "Sidebar"
---

The future of the web depends on simple, open standards.

[![Ben Werdmuller](https://werd.io/content/images/size/w160/2025/06/IMG_5699-4.jpeg)](https://werd.io/author/benwerd/)

![Illustration of lots of friendly people with megaphones](https://werd.io/content/images/size/w1200/2025/12/papermax-studio-M3N2R6bKWnw-unsplash.jpg)

Yesterday morning, I woke up and checked my news app while still in bed. The headlines from ProPublica, The New York Times, and The Guardian loaded instantly: a curated stream of stories updated overnight. I scrolled through, tapped on a few pieces, then switched over to my podcast app to queue up something for my morning gym session. I queued up three new episodes: one from [Search Engine](https://www.searchengine.show/?ref=werd.io), the first episode of [the new ProPublica Narrated podcast](https://podcasts.apple.com/us/podcast/propublica-narrated/id1858752858?ref=werd.io), and an episode of [Revolution.Social](https://revolution.social/?ref=werd.io).

A treadmill run later, I sat down at my laptop. Slack notifications ticked through updates for software we depend on, and [Reeder](https://reeder.app/?ref=werd.io) showed me the latest from the publications and blogs I follow.

Throughout my morning, I hadn’t visited a single source website directly. I hadn’t refreshed anything manually. Everything had just appeared, delivered automatically from each source to the app I'd chosen to read it in. My information diet runs on feeds.

A single core standard powers all of it. When people think about RSS, they most often associate it with the [long-departed Google Reader](https://www.theverge.com/23778253/google-reader-death-2013-rss-social?ref=werd.io) — but it’s far from dead. From direct subscriptions to syndication into apps that aggregate and re-present content, RSS remains the standard for feeds. It’s the glue that holds the timely web together.

Most people know RSS powers blogs and podcasts. But it powers popular news apps too, from aggregated headlines on [MSN](https://www.msn.com/?ref=werd.io) or in [SmartNews](https://www.smartnews.com/en?ref=werd.io) to up-to-date headlines in business services like [Lexis Nexis](https://www.lexisnexis.com/en-us?ref=werd.io) or [Bloomberg](https://www.bloomberg.com/professional/terminal-overview/?ref=werd.io). It’s also widely used to keep track of status updates of all kinds: weather, software updates, infrastructure uptime, and so on. Most of this activity happens behind the scenes. Publishers often think of feeds as an afterthought, but entire industries rely on them. It’s a workhorse that's become essential infrastructure for the web.

Even for something as simple as consuming news, RSS beats the alternatives. [As Molly White wrote earlier this year](https://www.citationneeded.news/curate-with-rss/?ref=werd.io):

> What if you could take all your favorite newsletters, ditch the data collection, and curate your own newspaper? It could include independent journalists, bloggers, mainstream media, worker-owned media collectives, and just about anyone else who publishes online. Even podcast episodes, videos from your favorite YouTube channels, and online forum posts could slot in, too. Only the stuff you want to see, all in one place, ready to read at your convenience. No email notifications interrupting your peace (unless you want them), no pressure to read articles immediately. Wouldn’t that be nice?

Yes, it would. And it is.

And yet, despite being everywhere, RSS is somehow invisible. It’s the plumbing of the web: essential, reliable, and routinely underestimated. Most people who consume news this way don't know they're using RSS, and a surprising number of people who work in media don't know they’re dependent on it for much of their reach and many of their partnerships.

That invisibility has created a misconception, in some quarters, that RSS is a relic. But the opposite is true: we’ve never relied on it more. And as the social web fractures, as platforms wall off content, and as AI agents begin remixing everything they can ingest, our dependence on neutral, open standards for distributing information is about to become existential.

It’s the strongest standard we have for feeds that syndicate content as published, without intermediation by third-party interests who seek to optimize for attention. Every RSS subscription represents a direct relationship between publisher and consumer, whether that consumer is a reader or a business partner.

But to be frank, it’s got terrible PR: it _feels_ like a part of the old web (Google Reader, Web 2.0, Blogger, _et al_) even though it powers much of the modern one. And standards that enable direct publisher–reader relationships are inconvenient for companies whose business depends on sitting in the middle. Consequently, it’s under threat. The result will be that publishers will lose distribution sovereignty, and readers will lose one of the last tools that puts them, not algorithms, in control.

If we want an internet where publishers retain autonomy and readers retain agency, we need to treat RSS not as legacy plumbing but as strategic infrastructure. That means three things:

1.  Protect and optimize our existing RSS infrastructure.
2.  Build and support better, more sophisticated RSS-powered applications.
3.  Consider the intersections between RSS and the wider social web.

Let’s discuss those in turn.

### Protect and optimize our existing RSS infrastructure

If your publishing platform was built with the open web in mind, it already supports RSS. [WordPress](https://wordpress.org/?ref=werd.io) powers [43% of the web](https://wordpress.com/blog/2025/04/17/wordpress-market-share/?ref=werd.io) — including the website for my employer, [ProPublica](https://propublica.org/?ref=werd.io), and many other newsrooms — and has well-formed feeds built in. Similarly, platforms like [Ghost](https://ghost.org/?ref=werd.io) were built with great feeds in mind. Even [Medium](https://medium.com/?ref=werd.io), which puts much of its content behind a paywall, does a good job of providing feeds for its articles and publications. That’s important: although there’s been a lot of focus on email newsletters lately, I know that I receive more readers via RSS than email — and _vastly_ more once I incorporate news portals that my site is syndicated to. Having a feed — or better, multiple feeds for topics, categories, etc — gives you a much bigger potential audience.

But not everything provides them. [Beehiiv](https://beehiiv.com/?ref=werd.io), the newsletter platform, supports the standard but leaves it off by default. [Tracy Durnell has written a template letter to ask authors to turn it on](https://tracydurnell.com/2025/12/05/email-template-to-ask-beehiiv-newsletters-to-enable-rss/?ref=werd.io). Sites built on services like Squarespace or Webflow often provide only rudimentary or crippled RSS feeds, if they offer them at all. And the newer generation of no-code or “vibe coding” tools frequently omit feeds entirely — not out of hostility, but because they don’t imagine syndication as part of the publishing experience. The result is predictable: content published on these platforms simply cannot travel. It won’t appear in aggregators, apps, readers, or enterprise workflows, and its reach is dramatically limited.

Where feeds _are_ present, it’s important that they’re performant, and that they’re accessible to aggregators. Some sites provide feeds but accidentally block access through overactive use of bot or scraper prevention, negating the point of having them to begin with. On others, they take minutes to load. If you’re going to provide syndication, your feeds need to be snappy. They need to update as soon as new content is published. And they need to be available to all.

It’s also important to prioritize syndication methods that use RSS. For example, many “podcasts” have chosen to partner directly with streaming services rather than provide an open RSS feed. Whether these should even be _called_ podcasts is in doubt; what’s not is that they’ve allowed those streaming services to intermediate their audiences. If they change their business priorities, those publishers could fully lose their audiences; it’s also a choice that weakens disintermediated freedom to subscribe for everyone else in the ecosystem.

Feeds have always been powerful for consumption. But the internet is a conversation, and the next generation of RSS-powered applications should unlock its potential for creation and collaboration. They should let publishers work together, readers become curators, and communities form around shared sources rather than platform feeds. 

The good news is, we’re beginning to see what this could look like.

I have a long-standing dream to create an open source newswire made up of non-profit news sources that allow their content to be republished for free. ProPublica is one; [The 19th](https://19thnews.org/?ref=werd.io), [the Markup](https://themarkup.org/?ref=werd.io), [Grist](https://grist.org/?ref=werd.io), and a few others all allow their content to be syndicated for free on any other website under a Creative Commons license.

What if you could read up-to-date content from all of these sources inside your own CMS and — with a click of a button — republish any articles you think your audience would enjoy? That, to me, is a non-obvious but exciting use of RSS feeds that would increase the reach and impact of these newsrooms and allow a thousand curation sites to flourish: local news hubs, topic-specific digests, niche expertise communities, and entirely new kinds of collaborative publications. In a world where platforms increasingly determine what audiences see, tools like this would let newsrooms collaborate on their own terms, without intermediaries.

Dave Winer’s [Feedland](https://docs.feedland.com/?ref=werd.io) is another interesting use of feeds: rather than keeping your subscriptions private, you can discover what your friends are subscribed to and, through them, find new publications and sources. In this world, the act of subscribing becomes the act of promoting sources you care about. It’s a social approach that comes close to following / followed lists on a traditional social media profile. A public subscription graph turns following into a decentralized discovery mechanism, with no algorithm or invisible ranking.

We also just need better, more fully-featured, less confusing consumer feed readers. Even apps like [Reeder](https://reeder.app/?ref=werd.io) — my personal favorite — tend to complicate the experience by allowing you to pick multiple back-ends and subscribe to lots of different kinds of source formats. [Feedly](https://feedly.com/?ref=werd.io) is loved by many, but [positioned itself as a way to keep track of strikes and protests against your company](https://www.citationneeded.news/feedly-launches-strikebreaking-as/?ref=werd.io) a few years ago, marketing features to help companies monitor and respond to labor organizing. Even beyond this distasteful misstep, it has tried to be a corporate signals platform rather than a consumer tool.

We need a beautiful, straightforward feed reader designed for consumers who don’t care about the underlying technology but know they don’t want someone else’s algorithm getting between them and the content they want to read. In other words, we need a feed reader designed for the mainstream — not just the power users who remember Google Reader.

What these approaches share is a commitment to keeping power distributed. Unlike platform-based solutions, they don't require anyone to sit in the middle. Publishers retain control, readers retain choice, and the infrastructure remains open to anyone who wants to build on it.

One of RSS’s biggest strengths is how simple it is. You can build an RSS-powered app in an afternoon. That means it’s easy to pick up, it’s easy to innovate with, and a new ecosystem of apps can build quickly. We just need some tentpole services to organize around.

RSS doesn’t exist in a vacuum. Over the past few years, a new generation of social web protocols has emerged — ActivityPub, AT Protocol, Nostr, and others — all of which share a basic intuition: the future of online communication should be decentralized, interoperable, and user-controlled.

ActivityPub, the protocol that powers Mastodon and much of the fediverse, is built around the idea of following updates from actors you care about. AT Protocol, which underpins Bluesky, lets users move their identity and social graph between services. Nostr focuses on simple, portable events that anyone can publish and anyone can subscribe to. All of these ecosystems are built on the premise that you should be able to read — and move — your social world wherever you like.

Sound familiar?

In fact, Mastodon and Bluesky both support RSS feeds, and make it relatively easy (if you know the feature exists) to follow peoples’ profiles in a feed reader. That means you don’t need to be a Mastodon or Bluesky member to follow profiles you care about: you can just plug them into your reader of choice. And those platforms don't _need_ to be a part of an interaction at all. If you have both inbound feeds and a feed of your own content publishing out, [without heavy requirements for metadata](https://textcasting.org/?ref=werd.io), [that’s a fairly complete social web in its own right](http://scripting.com/2025/06/28/211301.html?ref=werd.io).

This implies another opportunity, which is still relatively untapped: RSS can serve as a simple layer of connective tissue between today’s social protocols. It’s already universal, already well understood, and already deployed everywhere. Rather than reinventing syndication for each protocol, we could treat RSS as the common denominator. RSS lacks the complexity of ActivityPub or AT Protocol, which is a core strength. It’s a simple, universal transport format that everything can speak.

If the social web of the past decade was defined by walled gardens and algorithmic feeds, the next decade could be defined by interoperable layers, where RSS plays the same role for publishing that SMTP plays for email: a basic, universal substrate that everything else can build on.

The important thing about the open social web is not which protocol “wins.” It’s whether we build an ecosystem where publishers keep control of their distribution and readers keep control of their attention. RSS remains one of the strongest tools we have to make that possible.

RSS has always worked quietly in the background. In a moment when the web is being reshaped by enclosure, consolidation, and algorithmic mediation, its reliability is exactly what we need. It offers a simple, durable way for publishers to keep control of their distribution and for readers to keep control of their attention, without permission, platform lock-in, or hidden agendas. If we treat RSS not as a relic of an earlier web but as the strategic infrastructure it already is, it can continue to anchor a more open, more resilient, and more humane internet for decades to come.