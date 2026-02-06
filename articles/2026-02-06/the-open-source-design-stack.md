---
title: "The open source design stack"
source: "https://piccalil.li/blog/the-open-source-design-stack/?ref=main-rss-feed"
publishedDate: "2026-02-05"
category: "css"
feedName: "Piccalilli"
author: "Scott Riley"
---

Design tooling is in a pretty weird place right now. On the one hand, we’ve evolved from the struggle bus days of trying to wrangle Adobe products into doing something useful, and design tools have never felt more robust and seamless than they do right now.

On the other hand, SaaS has turned the web into a clusterfuck of aspiring monopolies, subscription models, yearly price hikes and AI pivots that literally no one asked for. Design tooling has not avoided such a fate.

We have, ostensibly, one ‘serious’ option when it comes to professional design work: use Figma, and go fuck yourself. This article could easily be 2,000 words of anti-Figma diatribe, and while that would definitely make me feel better, it wouldn’t really be useful, and in a shocking turn of events, I am trying my best to write something useful.

With the incessant push for profit, growth and shareholder appeasement, picking tools from a small pot of SaaS options that we’ve somehow convinced ourselves are the only viable solutions on the market is an increasingly frustrating exercise.

This is even more stark when we look at the relatively slim pickings we have when it comes to our design tools. Figma’s aforementioned chokehold on the industry leaves us beholden to whatever decisions eventually trickle down from the boardroom obsession with money above all else. Recent releases of their abysmal AI tooling and [their](https://uxdesign.cc/figma-sites-when-accessibility-is-an-afterthought-070ba3b41553) [frankly irredeemable](https://forum.figma.com/ask-the-community-7/figmasite-is-bad-42173) ‘Sites’ offering show us that these decisions don’t always benefit us.

When I was putting the plan together for the [Mindful Design course](https://piccalil.li/mindful-design?utm_medium=author-promo) (which feels like a decade ago at this point, wild that it’s been less than a year) I desperately wanted to avoid using Figma. Not only would I be implicitly advocating for any tool shown or used in the course, I’d also be asking people to use them themselves and, subsequently, pay for them.

This was honestly a weird position to be in. Up until that point I hadn’t really considered how much I was locked in to the Figma ecosystem. All my early stage design work was in FigJam, and the idea there was an alternative to Figma for large-scale prototypes and product design was something I never really reckoned with to any serious degree.

[Advert![Complete CSS. Take your CSS skills beyond the next level. Available now!](https://piccalil.b-cdn.net/images/ads/complete-css-ad-landscape-free-lessons.png?format=webp)](https://piccalil.li/complete-css/lessons/3?utm_source=piccalilli&utm_medium=graphical-ad)

Nevertheless, the goal was simple: find a set of tools that were either open source, free, or affordable that also wouldn’t require compromising on quality, and allow for industry-standard output. I decided early on that if I couldn’t create something I wouldn’t be happy putting in front of a client, then it was out of contention.

With that in mind, the first few months of planning the course revolved around breaking out of the Figma ecosystem and putting as many free and open source tools to the test as we could. Now, the fact this article _exists_ shows that we succeeded on that front, but what I honestly didn’t expect was that the experience would be so good (and honestly quite liberating) that I’d actually be switching my whole design setup to free and open source tools.

## [Open source isn’t perfect](#open-source-isnt-perfect)

One last bit of exposition-dumping before we dive in to the wonderful world of not paying SaaS leeches a monthly fee to be rooted in an extractive ecosystem: **open source is not a silver bullet**. Open source tools aren’t charities, they’re not inherently democratised, and they often come with their own sets of problems and frustrations. As most developers can attest to, as liberating as open source tooling can be, it can just as easily lead to infuriatingly fragmented and inconsistent setups.

Open source also does not guarantee ethics. Many open source projects are funded and in many cases owned by for-profit companies, many of whom are actually fucking horrible and use their contributions to free and open source offerings to essentially FOSS-wash their reputation. Yes, I’m looking at you, Vercel and Meta.

This was yet another consideration when I was trying out tools: are they owned or maintained by complete pricks? If so, maybe don’t use them.

I’m saying this now, because I know for everyone with a rose-tinted view who sees Free and Open Source (FOSS) as purely altruistic philanthropy, there’s someone on the other side ready to be contrarian and ‘well actually’ about how, for example, React is open source, and is funded by the same people who ushered in a brand new flavour of mindfuck technocratic capitalism.

With all that in mind, let’s drag me away kicking and screaming from the political discourse and into that previously promised writing of something useful.

[Advert![JavaScript for Everyone. Truly understand how JavaScript works. Available now. ](https://piccalil.b-cdn.net/images/ads/js4e-ad-landscape-post-launch.png?format=webp)](https://piccalil.li/javascript-for-everyone?utm_source=piccalilli&utm_medium=in-article-ad)

## [The design ‘stack’](#the-design-stack)

Confession time: I’ve branded myself as a full-stack designer for a while now. I like the term full-stack developer and I like applying it to my role as ‘a designer who is a little bit shit at everything’. While your development ‘stack’ might include back-end and front-end frameworks (or good old HTML and CSS), the design ‘stack’ I believe includes everything from early stage research to final prototyping and hand-over, and arguably into more ‘front of the front-end’ things like design tokens and coded components.

When I talk about an open source design stack, then, I’m talking about using free and open source tools to assist with every stage of a design process. I’m going to break the rest of this article into the various stages of the design process, and the tools I like to use to be a little bit shit at everything there.

## [Planning and briefing](#planning-and-briefing)

Every good project should start with a few words. I don’t really care if that’s a couple of sentences explaining an idea or a meticulous, multi-page spec document that covers all the bases. One of the worst things I think anyone can do is try and draw their idea out in rectangles before they can even explain that idea succinctly in words.

A good brief, good early stage documentation, and a place to write down any ideas that come to mind throughout your project are all essential. So, in a rather anticlimactic turn of events, the first thing we’re going to look for is something we can write words in.

### Scott’s favourite: AFFiNE

[AFFiNE](https://affine.pro/) (laborious casing aside) is basically a better, FOSS version of Notion. You can self-host or use their pretty generous free hosted version. Alternatively, if you don’t need cloud sync or collaboration, you can use it purely with local IndexedDB storage.

Their heavily-marketed AI assistant is a paid monthly extra and doesn’t come as part of the standard offering, which is fantastic, because you can fucking ignore it forever.

![A screenshot of the ‘AFFiNE’ interface, showing a whiteboard-style infinite canvas, with a text post on the left and two connected sticky notes on the right, illustrating how the product can be used to write text and visually brainstorm at the same time.](https://piccalil.b-cdn.net/images/blog/affine.png?auto=format&w=1500)

It’s an interesting spin on Notion’s collaborative, block-based document + centralised database structure in that they’ve just randomly slapped a whiteboarding tool into the app. Because why the fuck not? (Okay, it’s actually really good, and you can absolutely use it for all your brainstorming needs.)

I still really like Notion and I found it hard to break away at first, but given that I rarely need/want my data stored in a cloud DB, I was quickly enamoured with Affine’s no-sign-in, no-cloud-storage offering.

Other tools in this space include [Appflowy](https://github.com/AppFlowy-IO/AppFlowy) and [Docmost](https://docmost.com/).

## [Research and synthesis](#research-and-synthesis)

If you don’t start your projects with at least a bit of observational research you absolutely should. If you do start your projects with research, do more. Thanks.

I split research into two broad themes, _conducting_ and _synthesis_. For _conducting_ research, the main goal is capturing raw data. For me, that’s almost always simply recordings of my observational research sessions.

Where the ‘magic’ of a research phase lies in in the _synthesis_ phase. This is where we take all of our raw data and collate it in a way that actually makes sense, informs our problem space, and helps us make decisions. Think things like affinity maps, empathy maps, and Object Orientated User Experience (OOUX) boards.

### Scott’s favourite for conducting: Jitsi Meet

My requirements for conducting research are pretty minimal: can I talk to another human and record that conversation? With that in mind, 99% of my remote research sessions have been Google Meet calls, because it’s kinda just the default, innit?

However, recently I’ve had success with [Jitsi Meet](https://meet.jit.si/), which is essentially Google Meet without the Google shenanigans. I don’t know what more to say here: you start a call, you invite someone else to that call, and you talk to them.

I don’t like recording calls to the cloud, so all my calls are recorded and saved locally via [OBS](https://obsproject.com/).

### Scott’s favourite for synthesis: tldraw

Okay, noticing a theme now, apparently normal casing is rare in open source tool naming. Aside from that, [tldraw](https://www.tldraw.com/) (often stylised as _tl;draw_ which I kinda love) is a _fantastic_ whiteboarding tool out the box.

Heading to [tldraw.com](https://www.tldraw.com/) will get you straight into a gorgeous whiteboarding experience, but the tldraw project is far more than that, essentially positioning itself as an ‘[infinite canvas SDK](https://github.com/tldraw/tldraw)’. Essentially, the whiteboarding tool is the ‘flagship demo’ for the possibilities of the SDK, and we can use it for free. Lucky us.

![Screenshot of the tldraw interface. An infinite canvas whiteboard, containing a 2x2 ranking grid workshop. The screen is split into four quadrants, and several sticky notes are placed into each quadrant.](https://piccalil.b-cdn.net/images/blog/tldraw.png?auto=format&w=1500)

I have to give a big shoutout here to [Excalidraw](https://excalidraw.com/) as well. Another fantastic infinite-canvas whiteboarding tool, with my favourite approach to onboarding I think I’ve ever seen. Similar to Affine, everything is saved locally to browser storage, something I’m a huge, huge fan of.

![Screenshot of the Excalidraw interface. An empty state is show, will various onboarding ‘helper’ text placed close to the UI elements they’re describing, including ‘Pick a tool & start drawing!’ below the tool UI, ‘Shortcuts & help’ near a help icon, and ‘Export, preferences, languages, …’ near a menu icon. The centre of the screen shows options for ‘Open’, ‘Help’, ‘Live collaboration’, and ‘Sign up’.](https://piccalil.b-cdn.net/images/blog/excalidraw.png?auto=format&w=1500)

## [Prototypes](#prototypes)

As much as I love writing and whiteboarding tools, I think we can all acknowledge that the main character of the design process is your prototyping tool. I’m including digital wireframes in this, too, because the only true wireframes are done on A3 paper with the chunkiest fucking Sharpie you can find.

The supposedly flagship part of our process requires a tool capable of matching the lofty standards of _\[checks notes\]_ being able to draw the correct rectangles.

### Scott’s fav: HTML and CSS

I am once again [begging you to learn how to code](https://piccalil.li/blog/the-time-for-designers-to-learn-to-code-is-now/). For me, the best tool for designing things that will eventually live in the browser, is the browser itself. HTML and CSS are not hard to learn. People just massively over-complicate front-end tooling these days. If you can learn how to use Figma’s acid trip of a variables panel, you can learn the basics of semantic HTML and how to style it with CSS.

### Scott’s (other) fav: Penpot

Okay, probably the ‘real’ answer here, and the design tool that I am most excited by and most unabashedly fanboyish about. Penpot is an absolutely _fantastic_ design tool. It’s basically Figma but _good_. It’s also designed and built by people who _actually understand_ what designing and building for the web looks like.

[Penpot](https://penpot.app/) not only matches Figma in almost every case that actually matters, it exceeds it in many of the most important areas of designing for the web. I could write a whole piece purely based on what Penpot gets right that Figma gets wrong, but a few highlights include (but are not limited to):

-   Being able to add margins to elements in a layout (_honestly_, this alone makes my life infinitely easier)
-   Tokens that actually match the design tokens format module spec
-   Tokens that can be exported as JSON natively without shitting the bed or relying on jank plugins
-   Being able to reference token aliases _and_ perform mathematical operations in token definitions (hello, [logarithmic type scales](https://www.youtube.com/watch?v=3mXSJVrWfgw))
-   A 1:1 representation of the CSS box model and faithful representations of CSS grid and flexbox
-   Their glorious, fabulous, wonderful approach to Typography tokens

Penpot was honestly the biggest surprise for me when putting [the course](https://piccalil.li/mindful-design?utm_medium=author-promo) together and putting these tools through their paces. I was kinda convinced that I’d come crawling back to Figma as soon as the course was done, that Penpot would be a welcome distraction but ultimately fall short somewhere down the line. After all, they’re a small team, with an open source product, competing against Figma, who are ostensibly worth an absolute colossal fuck tonne of money.

![Screenshot of the Penpot UI. A panel on the left lists the pages of a document at the top, and the layers within the selected page underneath. The centre panel shows an in-progress design. The design consists of an illustration, a heading that reads ‘What are you grateful for today?’, a text box for a user to enter their response, and two buttons; ‘Next’ and ‘Skip for today’. The right panel contains the editable properties of the selected element, in this case the sizing and layout options, followed by specific typography settings, and a colour picker to set the element’s colour.](https://piccalil.b-cdn.net/images/blog/penpot.png?auto=format&w=1500)

After my first few forays into Penpot I kinda thought that was the case. “Look at me. Right again,” is what I _would_ have said if I didn’t roll my sleeves up, get rid of the Figma-brain, forgive the admittedly less-than-stunning UI design, and give it an honest stab at working for me.

After a couple of weeks in Penpot, I found myself actively dreading opening Figma to do my ‘real’ work. Back to constantly being reminded of their shitty AI tools. Back to autolayout being an absolute disaster. Back to their keyboard shortcuts being changed around what feels like every two weeks.

Penpot is a breath of fresh air. There’s enough there now to actively replace all but the most locked-in Figma projects, and they’re improving things in meaningful ways, not actively destroying the things that made the product good in the first place, which seems to be Figma’s approach over the last 18 months.

All of my design work outside of _The One Big Client That Is So Locked In To The Figma Ecosystem It Would Cost A Hundred Grand To Unfuck_ is now done either directly in code, or in Penpot. I’ve even been able to cancel my Figma subscription. What a day that was.

All of that is to say, if you’re a web, product or UI designer and find yourself increasingly jaded with what Figma has become, you owe it to yourself to [give Penpot a whirl](https://penpot.app/).

## [The other bits](#the-other-bits)

I’m pretty chill when it comes to my process and tools. Give me a big stack of paper, something to write words into, somewhere I can lash sticky notes around, and something I can draw rectangles in and I’m happy.

I also don’t do much in the way of visual or brand design these days, to the delight of my much-more-talented friends who have had to find increasingly creative ways to tell me to fuck off with my ‘first pass at a logo for this project’ DMs.

Unfortunately, for visual design and brand design in particular, there really aren’t that many options. No one seems to be doing anything interesting in the space, so much so that GIMP is still the most-recommended tool when it comes to traditional visual design (a la Photoshop). I love GIMP, but come on, it’s pure, unadulterated “I see your stepdad’s been on the Linux forums again” vibes.

**Editor’s note:** I’ll allow it.

For vector work, we’re eating even less well. Inkscape does a passable impression of if the good parts of Illustrator all somehow fell out the app, but it’s dated and horrible in its own way. If all you need to do is tweak an SVG then it’s _fine_, but a quick poll of my contacts showed responses that ranged from ‘meh’ to ‘are you back on your meds yet?’

Visual and brand designers: I’m sorry. Really.

## [Breaking away from SaaS](#breaking-away-from-saas)

Hopefully that’s been a decent run-down of the tools we have at our disposal that aren’t paywalled by the money-guzzling vampires that prop up the SaaS landscape. While open source tooling isn’t the silver bullet that many folks naively believe it to be, it’s a damn sight better for us, the consumer, than the brainchild of technofeudalism and hypercapitalism.

The market right now is one of monopolies. Where any big player that is remotely threatened by a startup can buy or acqui-hire their way to devouring any competition. So much so that there’s a non-zero number of startups being formed with the express intention of nipping at the heels of Figma, Vercel and the like in the hopes of being swept up for an undisclosed fee. Which is embarrassing but okay lads go wild.

When the market is [this many layers of fucked](https://www.wheresyoured.at/dot-com-bubble/), we’re lucky that we have alternatives. By using, supporting and contributing to nice products built by nice people, we can go some way to making open source a viable and sustainable model in whatever future in which we find ourselves.

We also need to move away from seeing open source tools as ‘hobby’ projects. Penpot are showing that it’s possible to monetize open source design tooling without turning into absolute shitheels, and folks like Ghost and GitBook are uniquely positioned to be market leaders backed by open source offerings.

The future can be bright for open source tooling, we just need to break away from the exploitative and extractive machinations of venture-capital-backed SaaS monstrosities.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_

[Advert![Mindful Design. Learn to design for real humans. Available now](https://piccalil.b-cdn.net/images/ads/md-ad-landscape-post-launch.jpg?format=webp)](https://piccalil.li/mindful-design?utm_source=piccalilli&utm_medium=graphical-ad)