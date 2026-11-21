---
title: "Apps I’ve Vibe-Coded Lately That Are Pretty Damn Useful To Me, Actually"
source: "https://blog.master.dev/apps-ive-vibe-coded-lately-that-are-pretty-damn-useful-to-me-actually/"
publishedDate: "2026-11-21"
category: "css"
feedName: "Frontend Masters Blog"
author: "Chris Coyier"
---

> **Note:** Full content could not be retrieved. [Read the original article](https://blog.master.dev/apps-ive-vibe-coded-lately-that-are-pretty-damn-useful-to-me-actually/)

I’m sure you’re all _very impressed_ that _I can type out what I want_ to an AI agent and it’ll do work for me.

Amazing stuff, right? Well, I’m not here to show off my prompting skills, as much as I know y’all could use it. I think what’s valuable is seeing what other people are building that’s actually useful.

I’m not talking about _the main thing._ Your primary project. The big dog. That, you need to have dialed. That’s where your real engineering and design muscle is going. You know, the one where you deeply care about the code, sweat the details, do the research, and wake up thinking about.

I’m talking about little stuff. Stuff that would be nice, but you just never found the time to actually do. Stuff that _might_ have value, but working on the big dog is just so much more worthy of your time. Or stuff that would just be annoying to code in the past and you couldn’t prioritize. Now the math on what is worth coding has changed, so talking about what makes the cut now is more interesting.

## A Social Media Watcher

CodePen has social accounts across Bluesky, Mastodon, X, LinkedIn, Instagram, Facebook, TikTok, YouTube, and Threads. That’s a lot to try and stay on top of. Definitely too much to expect _every team member_ to do.

My goal was to build a cloud function on a CRON that would gather any direct engagement on these platforms and send the messages/links to a Slack channel so our whole team could see it and respond personally.

Every one of them, except for TikTok, has APIs available to access stuff like replies. But each one is different. This is the kind of thing that would be obnoxious to code by hand, but is straightforward work for an LLM.

This ended up taking me weeks of poking at it to get done, because each one required some human work in the form of provisioning API keys and, in some cases, waiting for approval of “apps”.

![Slack workspace showing the CodePen #social\_media channel with social media notifications and messages about CodePen tools.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/Screenshot-2026-11-20-at-9.06.33-AM.png?resize=910%2C1024&quality=80&ssl=1)

Every app is a little different.

-   X requires you to put a few bucks in an account because their API is paid.
-   LinkedIn required app approval, which took ~2 weeks.
-   YouTube is weird because you have to check a big swath of recent videos and just look for comments you haven’t seen before.
-   Getting the right permissions and keys on all the Meta apps was easily the most awkward.

In the end, I’m really happy with how it all works.

It uses Cloudflare Workers because:

-   It’s easily executable code, great for this purpose
-   We already use them for a bunch of other stuff
-   It needs to remember stuff between runs, and it can use a K:V store for that
-   There are a bunch of API keys involved that need to be kept secure, and Cloudflare has a Secrets Store just for that
-   They can run on a CRON

## A Fancy Weekly Business Metrics Report

We have tons of data available to us at CodePen, from our own database to a variety of third-party services we use (e.g. Cloudflare, Stripe, Postmark, Front, Sentry, Notion, etc). We’ve also built all sorts of reporting tools for us over the years. We get an idea to track a certain metric, and we do it.

Honestly, a lot of the reporting is spread out. We can log into Cloudflare, Stripe, or Postmark and look at their reporting tools and dashboards. They all do a decent job, but that’s disseminated. We’ve got our own admin site where we’ve built a bunch of bespoke reporting dashboards. We use [redash](https://redash.io/) for building out database-powered dashboards. I wouldn’t call it a _mess_ since there is a rhyme to the reason, but it does mean all this data **doesn’t always get looked at with equal regularity.**

So I built One Report to Rule Them All. It works like this:

1.  Programmatically, it looks at everything, and it saves JSON data snapshots.
2.  Then it has an LLM look at the snapshot (and previous snapshots), purposefully looking for data anomalies and interesting standout bits of data.
3.  It produces general insight that it attaches to the data snapshot where relevant.
4.  Then the JSON data is templated into a very fancy website that produces a scrolling dashboard of charts, insights, raw data, etc.
5.  The website becomes a Pen, naturally, via our [API](https://blog.codepen.io/docs/api/api-v2/).

![CodePen editor displaying a preview of The CodePen Report newsletter dated Nov 2–8, 2026, with collaboration settings and code files visible.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/Screenshot-2026-11-20-at-1.45.58-PM.png?resize=958%2C1024&quality=80&ssl=1)

My goal, of course, is to automate this completely. Like our social media checker, it should generate the report, produce the Pen, and send it to our #general channel in Slack for us all to see. I’m like 90% there, but like everything, there are some harder human parts left I haven’t prioritized yet. I only mention that out of solidarity — I’m just _sure_ y’all have projects in this _so close_ state.

I think **keeping the entire team seeing these important numbers across everything we’ve already decided we care about** is pretty darn good.

## A Pre-Send Email Link Checker

We’ve got a whole fancy system for sending HTML email at CodePen that we’ve built ourselves and honed over the years. It even includes a nuclear submarine-style two-approval system for sending emails, ensuring human accountability for the quality of what goes out.

But a little automated help is nice too!

I wired up a little that…

1.  For any given HTML email, finds all the `<a>` anchor links in it.
2.  Programmatically fetches the links to make sure they’re real, not malformed, and return a normal status code.
3.  If the link fails, that’s just flagged as a problem immediately
4.  For links that pass, an LLM then checks them contextually. The surrounding text is the context; the link is visited and read, and the system tries to determine whether the link “makes sense.”
5.  A chart is generated with the results.

![Link Check results table showing two mismatched CodePen links flagged for review and multiple verified links marked OK](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/695401372-bc796750-1670-410a-aee0-52fb881067aa.png?resize=917%2C1024&quality=80&ssl=1)

Some links get a “**Look**” status, meaning something should be human-verified before it goes out. Sometimes a link can look correct at a glance but actually be

This has already caught a number of links we dinked up, which makes me 😬 about how many dinked-up links I’ve approved in emails in the past.

## A Sentry Error Auto Fixer Factory

This one is just so stupid easy.

I’ve been wanting to do it forever and just never got around to it. Then I saw that Anthropic has **Claude Duet** in preview now, which is its version of an always-on agent thingy. I guess it’s like Grok Bot or Meta Muse? I haven’t used those yet, so I can’t vouch for that statement.

So I just… asked it to do this.

![Dark-mode mobile chat screenshot showing Claude discussing Sentry projects and GitHub repository access.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/image.png?resize=471%2C1024&quality=80&ssl=1)

So now, every day at 11:23am, it goes through our Sentry (because it has Sentry’s MCP connected), and if there are errors with clear fixes, it makes a draft PR on GitHub to fix them (because it has GitHub’s MCP connected).

I’ve only had it running for a couple of days, but it’s done about 5 good PRs that went straight through. Turns out my co-founder has been doing his version of the same thing for longer, so honestly our Sentry is pretty clean already. I know this is so simple it’s almost silly to mention, but sometimes even ridiculously easy ideas have a big impact, so there you have it.

Little bonus thing we’ve done: whenever we report to Sentry from anywhere, we log whether a user is `pro` or not. That way, if we see an error that affects a paying user, we can prioritize it highest.

## WordPress Plugins to GitHub

I’ve had bookmarked as a TODO for a million years the [10up GitHub Actions plugin](https://github.com/10up/action-wordpress-plugin-deploy) for deploying WordPress plugins to the WordPress.org directory.

See, WordPress plugins use Subversion, not Git. Isn’t that wild? It’s gotta be one of the biggest boulders of technical debt out there. I’m sure nobody likes it, and apparently there’s no way off. My first startup job used Subversion so I have a smidge of experience, but when I have to update my plugins, it still feels like I’m re-learning it every time, because I use it so little.

With the 10up GitHub Actions plugin installed, I can have a normal Git repo for my WordPress plugins, and commits to `main` can push new versions to the WordPress.org directory like you’d expect it to work. The Subversion dance happens in the GitHub Action.

![GitHub repository page for the private codepen-embed-block WordPress plugin, showing its file list and project details](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/Screenshot-2026-11-20-at-4.19.55-PM.png?resize=1024%2C609&quality=80&ssl=1)

But did I ever get around to actually doing it? Nope.

But now that LLMs are so good, I could finally just be like: _yo, move these two plugins to their own private GitHub repos and set up this action._ I like to pay the extra token to say _yo._ And of course it knows exactly what to do and just does it.

[![WordPress Plugin Directory page for CodePen Embed Block by Chris Coyier](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/Screenshot-2026-11-20-at-4.20.14-PM.png?resize=1024%2C809&quality=80&ssl=1)](https://wordpress.org/plugins/codepen-embed-block/)

Big high five to [10up](https://10up.com/) for the GitHub Action. I have no idea why it doesn’t have a billion stars.

## And by the way…

I don’t have an extra Mac Mini under my desk. I don’t have 10 AI subscriptions. I rarely run more than one agent at a time. I run them on my computer when I’m working, so they stop when I close my laptop and drive to a coffee shop.

I _want_ to “level up” and use my AI more effectively. I’d bet most of you are fancier than me. I need to finish Sabrina’s [Practical AI Agent Workflows](https://master.dev/courses/ai-agent-workflows/) course!

### [Practical AI Agent Workflows](https://master.dev/courses/ai-agent-workflows/)

Build AI workflows and agent systems that balance context, reliability, and cost. Explore the tools, memory, retrieval, planning, and reflection that make single agents effective. Compare single and multi-agent patterns and choose, test, and improve the right architecture for each task.

![Sabrina Goldfarb](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/thumb%402x.webp?fit=500%2C500&quality=80&ssl=1)

Sabrina Goldfarb GitHub

But I also feel like I can move at a pace that feels comfortable for me. When I see an opportunity for more firepower that suits a need I have, I’m gonna take it. To be honest, I already feel pretty darn productive, but also quite exhausted at the end of the week. My brain needs a good bit of touch grass time to recharge.