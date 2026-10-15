---
title: "Worth building"
source: "https://armstr.ng/writing/worth-building"
publishedDate: "2026-10-12"
category: "design"
feedName: "Sidebar"
---

[Writing](https://armstr.ng/writing)

What changes when a tool doesn't have to pay for itself

October 5, 2026 3 minute read [Discussed on Hacker News](https://news.ycombinator.com/item?id=49971952)

Years ago, if an app annoyed me, I shrugged and dealt with it. I could sometimes have fixed it or built my own, but the annoyance rarely justified the effort. With LLMs that calculation has changed, and this past weekend it changed for a domain lookup tool.

Occasionally I need to check DNS records or registration info for a domain. At my computer I use `dig` or `whois`. Otherwise I Google "domain lookup tool," click on one, and paste in the domain. Most of what comes up is slow, buried in upsells, and unpleasant to use for something that should be simple.

![](https://armstr.ng/_astro/8ad414aee13f7e50a58d87907fb972a367dfb4d3a5bb659be63950a4b716074e_Z1kr33T.png)

They aren't badly made -- they're well made for a different job. A domain lookup answers a question nobody pays to ask, so many of the free tools that show up in search are the ones a sales funnel justifies: the lookup brings in someone who might buy a domain or hosting, and the page is built to rank for "domain lookup tool" and to sell. The tools you find are the ones built to be found. Being good at the lookup was never what paid for them.

I wanted something I'd actually enjoy using, so I opened Claude Code and built [heade.rs](https://heade.rs/). In three prompts and about an hour I had a first working version deployed to Cloudflare: DNS and registration records, live latency, email configuration, HTTPS details. The rest of the day went into making it feel good: animations, graphics, an interface I like looking at. It costs less than a cup of coffee a month to run. It doesn't have to sell anything, so it can just be good.

![](https://armstr.ng/_astro/713aeca5e5a7aac4469922bb7b483fa3e8e23a66211816145d55f608c5f660dc_Z29qe4t.png)

The [heade.rs](http://heade.rs/) overview page

![](https://armstr.ng/_astro/b52f0edf4a37eb72cbf5ac040d9a6dd432b054b70ac1c8d45f931481f6fc703e_ZGIgNd.png)

Tabs for deep-dives

Before, a project like this needed justifying. I'd have asked whether I'd use it enough to make the time worthwhile. If I expected to spend weeks on it, I'd have started thinking about other users, pricing, how it could pay for itself. A small annoyance would have become a much bigger commitment; a weekend is much easier to justify. I wanted it to exist, and that was enough.

A few hours used to get a programmer a script; now it gets a polished app, and it gets a non-programmer something instead of nothing. More people can clear the bar, and more ideas clear it: [small tools that solve a personal annoyance](https://armstr.ng/projects), weird ideas you're curious about, things you build simply because you'd enjoy having them or the world would be more beautiful if they existed. The audience can be one person.

The same economics cut the other way: heade.rs will probably not rank for "domain lookup tool," and neither will most things built like it. Cheaper software means more people shipping, and another demo in a crowded feed is easy to scroll past. If you want to reach more people, you still have to give them a reason to care. I'm more interested when someone explains what bothered them, what they made, and the choices they cared about along the way. The story gives me a reason to try the thing.

Sometimes sharing a personal project leads somewhere unexpected. Four years ago [Paragraph](https://paragraph.com/) started as something I built for myself, then other people wanted to use it too. I'm glad I shared it.

But I also like that [heade.rs](https://heade.rs/) doesn't need to follow that path. If it stays a little tool I use occasionally to look up a domain, it was still worth building.