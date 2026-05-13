---
title: "The boring internet"
source: "https://www.terrygodier.com/the-boring-internet"
publishedDate: "2026-05-12"
category: "design"
feedName: "Sidebar"
---

You have noticed that the internet is dying.

Twitter changed hands, changed names, and changed shape, and the version of it you knew is gone. Reddit went public. Google search now returns generated answers stapled to half a dozen ads. Instagram is bots making content for bots.

Discord servers you joined in 2019 have gone quiet. The blogs you read in 2012 redirect to parked domains. The forums where you learned what you know got bought, gutted, redesigned, and left to rot.

This is real. You are not imagining it.

The places you spent your younger years are gone or unrecognizable, and the places you use now are visibly straining under a flood of machine-generated text nobody asked for. There is a low ambient grief about it, and a faint guilt, something like:

“I should be doing something. I should be somewhere else. I want the old thing back.”

I want to tell you a thing that I think is true, and that I think will make you feel better.

> The internet is not dying.  
> A commercial veneer glued on top of it is dying.

The layer where every human activity became a venture-backed destination, every destination became a feed, every feed became ad inventory, and every ad market became a machine for producing more things to interrupt you with.

Underneath that layer is another internet: older, slower, less polished, harder to monetize, and much harder to kill.

It is not utopia. It is full of spam, abandoned servers, broken clients, hostile nodes, strange old commands, half-maintained software, and people arguing in plain text about things no normal person should care about.

But it has one enormous advantage over the platforms that replaced it in your imagination.

No one owns it.

## The Layers

You can see the layers if you draw them out.

services

things you can be priced out of

GmailGitHubCloudflareAWSStripeAuth0CDNsVercel

protocols

things no one can take from you

HTTPSMTPIRCRSSIcecastNTPUsenetDNSBGPSSHFTPNNTPWebDAVGeminiFingerTCPUDPPOP3IMAPXMPP

a thin commercial crust on something much larger

The platform layer is the loudest and the youngest. It is culturally dominant. It is where most of the screenshots come from. It is where the arguments happen and where the panic lives.

It is also a thin commercial crust on top of older, quieter machinery.

Under the platform layer is the service layer: the companies that own infrastructure but do not always need to become the destination. Gmail. GitHub. Cloudflare. AWS. CDNs. Payment processors. Identity providers.

These things are not innocent. They are not outside the market. Some of them are enormous, and some of them have more power than anyone should be comfortable with.

They don’t need to become the place where your whole social life happens. Cloudflare does not need you to scroll Cloudflare. AWS does not need you to post memes.

Under that is the protocol layer.

This is the old machinery. Not pure. Not beautiful. Not easy to use. A lot of it is ugly, ancient, underspecified, overcomplicated, and held together by conventions nobody remembers writing down.

But it has a different shape.

Most of these protocols were designed from the 1970s through the early web era by small groups of people solving immediate problems.

“How do we send mail between machines?”

“How do we ask who is logged in?”

“How do we move hypertext across a network?”

“How do we synchronize time?”

“How do we publish a stream of updates?”

“How do we broadcast audio?”

They were built mostly by nerds with no business plan, no venture capital, and no permission.

> The protocols belong to no one. They can’t be acquired. They can’t be taken public.

The reason your mee-maw and your bank and your boss can all reach you at the same email address is that the protocol that made it possible was published more than forty years ago, and the people who published it did not successfully capture it inside of one company.

## Tuning In

Rusty Hodge has been running an internet radio station called SomaFM out of San Francisco since 2000. The station is independent, listener-supported, ad-free, and curated by actual people with actual taste. For more than two decades, people around the world have been listening.

SomaFM runs on boring internet radio infrastructure: open streams, playlist files, direct URLs, Icecast servers.

When you press play on a SomaFM stream, your browser does not ask a social graph whether the song is relevant. No algorithm decides what plays next because it predicts you are likely to remain engaged for another seven minutes. No advertiser shapes the rotation. No platform tries to convert the moment into a growth loop.

A person makes choices and broadcasts them.

You tune in or you do not. That’s the whole transaction.

Here’s SomaFM’s live stream. Press play and a small server in San Francisco starts handing you a song.

For the purpose of this essay, I set up my own internet radio station featuring the latest album of music I wrote, recorded, and produced.

You can listen live, streaming (miraculously!) from a small computer in New York.

Spotify launched years after SomaFM. It was supposed to make stations like these obsolete. It did not.

The reason is structural.

Spotify has to extract enough value from listeners to satisfy public-market investors. Over time, it will be pressured to transform, bundle, optimize, and extract more from the same act of listening. SomaFM has to cover bandwidth costs and keep Rusty fed.

My station has an even lower bar. It’s just for fun. It can be tiny. It can be pointless. It can run for a while, make a few people smile, and disappear without becoming a failed startup.

This distinction matters.

some things

need to become enormous to survive.

other things

survive because they never needed to become enormous.

## Fossils Still Load-Bearing

SMTP1982

email — the federation that didn't lose

Still federated. Still belongs to no one. Still the only mass communication system on earth where any provider can reach any other provider without permission from the company that owns the network.

Email is not clean. Email is full of spam, phishing, AI-generated sales sludge, fake invoices, newsletters you swear you never signed up for, and random dudes asking whether you have fifteen minutes to discuss pipeline optimization.

But that is the point.

Email did not survive because nobody abused it. Email survived because abuse did not turn it into one company.

Spam can ruin an inbox. A bad provider can ruin a service. A policy change can ruin deliverability for a domain. Gmail can make life worse for everybody by becoming too powerful.

> But no one can ruin email in a product meeting.

That is what survival looks like at the protocol layer. Not purity. Persistence.

IRC1988

chat — before chat became a workplace surface

The chat protocol that predates Slack by decades. The old networks are mostly gone or changed beyond recognition, but IRC itself is not gone. Libera Chat and other networks are still active every day. Open-source projects still use it. Rooms descended from IRC culture still shape how technical communities get things done.

It’s not fashionable. It’s not welcoming in the way modern software tries to be welcoming. It has commands. It has norms. There’s a culture and a learning curve. You can absolutely enter the wrong room, say the wrong thing, and discover that nobody there has any interest in making the experience smooth for you.

And yet it remains one of the few places online where chat still feels like chat instead of a workplace surface.

Usenet1980

threaded conversation — the original shape of the social internet

Less alive than the others, but the bones are warm.

The shape of nearly every threaded discussion you have ever read descends from it: named groups, posts, replies, quotations, arguments accreting around a topic until the topic itself disappears under the argument.

Reddit did not invent this shape. Reddit made it legible to a later web, walled it off, and monetized it better.

Usenet is what the social internet looked like before the social internet had product managers tasked with growth and viral loops.

RSS1999

syndication — the protocol that survived its own death

Google Reader was discontinued in 2013, and a generation of people decided RSS was over. It wasn’t over — it just stopped being fashionable.

RSS still delivers news sites, changelogs, newsletters, video, and the quiet daily output of people who still publish on their own sites.

It’s also the distribution substrate for podcasting, a medium now consumed by enormous numbers of people, most of whom never see the feed.

NTP1985

time — the protocol that synchronizes the clocks

Every device you own needs to know what time it is. So does your bank, your calendar, your router, your security certificates, your deployment logs, your authentication tokens, and the payment terminal at the coffee shop.

Almost every modern system assumes time is boringly, invisibly correct.

NTP was shaped for decades by David Mills and a small orbit of maintainers, volunteers, students, and institutions. It became so essential, and so commercially unglamorous, that almost everyone depended on it while almost no one thought about it.

That’s another kind of boring.

Not abandoned. Load-bearing.

Finger1971

presence — the first status update

The deepest cut on the list. The kind of thing you bring up at dinner if you want everyone to look at you with concern.

Finger is a protocol from before the web for asking: what is this person up to right now?

It was the first status update. Before feeds, before away messages, before AIM profiles, before Twitter bios, before Slack status, before stories, before /now pages, there was a little command that asked a machine for a person’s _.plan_.

It is barely alive. It is a fossil you can still run.

I set up a server with a finger service on it that you can try right now. Open your terminal and type:

`finger tg@finger.terrygodier.com`

and see what comes back.

a protocol from before the web, still answering

There are more. DNS, the protocol that turns _terrygodier.com_ into a number. BGP, the protocol that decides how packets actually get from one continent to another. SSH, the protocol that lets you step into a machine far away as if distance were a local inconvenience.

NNTP. FTP. WebDAV. Gemini. The whole neighborhood of the IndieWeb.

Most are older than the kids on TikTok and still running.

## Why They Survive

The reason these systems survived is also the reason they are surviving the AI flood, and the reason they will probably outlive most of what is being built today.

boring

adjective.

Of a technology: too useful to disappear, too uncool to hype, too federated to acquire, and too awkward to turn cleanly into a platform.

The single most reliable predictor of digital survival.

The boring internet survives for three reasons, none of them romantic.

First: it has no CEO.

Nobody can sell it. Nobody can pivot it. Nobody can take it public and gut it for shareholders. Nobody can call an all-hands meeting and explain that, going forward, the protocol will prioritize video.

This is not because protocols are magically democratic. Many are governed badly. Some are captured in practice by big companies. Some are maintained by exhausted volunteers. Some are trapped in standards bodies where good ideas go to be slowly discussed to death.

But the decision-making is distributed among the people who use it, implement it, maintain it, extend it, argue about it, and occasionally abandon it.

This is slow. This is frustrating. This produces committees, mailing lists, drafts, forks, incompatible clients, flame wars, and astonishingly ugly configuration files.

It is also why the thing is still here.

Second: it is too federated to centralize.

There is no single email server. No single IRC network. No single RSS endpoint. No single website. No single Icecast directory. No single DNS server that is “the internet.”

There are many of each.

platform

one switch flips the lights on every node

protocol

one neighborhood burns; the rest keeps posting

You cannot kill a federated thing by killing one node, the way you can kill a platform by changing one company.

You can damage it. You can neglect it. You can make parts of it unusable. You can create enormous power concentrations around it. Google can dominate email hosting. Cloudflare can sit in front of half the web. Spotify can intermediate podcasts. Apple can shape how feeds are discovered. Bad actors can flood open systems with garbage.

The failure mode is different. A platform fails in public. One acquisition, one pricing change, one API shutdown, one new owner, and suddenly the place you used to live has different locks on the doors.

A protocol fails unevenly. This server goes down or that client stops working. This network gets weird or that provider becomes hostile. One neighborhood burns while another one keeps posting through it.

> That isn’t perfect. But it’s better than a single switch.

Third: it is too awkward to fully extract.

Machine-generated garbage does not spread evenly. Search. Social. Video. Shopping. Feeds. Anywhere a human glance can be measured, packaged, auctioned, and sold, machines will arrive to manufacture more things for humans to glance at.

Boring protocols are not immune to this. Email proves the opposite.

The boring internet isn’t protected by innocence. It’s protected by awkwardness.

There is no global RSS feed to poison. No central IRC timeline to optimize. No Finger For You page. No Icecast engagement graph deciding that your ambient drone station should pivot to reaction content because thirteen percent more users remained active through minute four.

Every property that made these protocols feel old and uncool to you in 2014

is part of what’s keeping them alive in 2026.

## What I’m Building

I’ve spent the last year building things on this layer.

[Current](https://www.terrygodier.com/current) is an RSS reader. Not a social app pretending to be a reader. Not a recommendation engine wrapped around articles. A reader. It takes feeds from sites you choose and shows them to you.

[Sourcefeed](https://www.sourcefeed.app/) and [Byline](https://www.bylinespec.org/) live in the same neighborhood: small tools for publishing, reading, and moving through the web without pretending the web needs to become a platform again.

These aren’t acts of nostalgia. I don’t want to teleport to 1999 with a beige computer and pretend everything was better when getting online made a noise.

I am trying to build on the part of the internet that still has the properties I want software to have: durable, legible, user-shaped, hostile to enclosure, and quiet enough that a single person can still understand the whole thing.

I’m not the only one. Personal sites are coming back. RSS feeds are coming back. Webrings are coming back. People are remembering that a website can be a home or a place instead of a profile.

Mastodon is, for all its quirks, a federated SMTP-shaped thing for short messages and not a platform in the old sense.

Small internet radio stations still broadcast from servers with ugly URLs. Newsletters still arrive through SMTP. Software projects still publish changelogs through feeds.

Communities still gather in places too small to be interesting to investors.

## You Are Standing In It

You are reading this in a web browser.

Take a moment and notice what is around you.

1.  the page reached you HTTP1991
    
    three decades old, still serving every webpage you have ever read.
    
2.  the clock in the corner stayed accurate NTP1985
    
    right now, your computer thinks it is .
    
3.  you probably found this essay through RSS1999
    
    the same protocol family that delivers podcasts and blogs to people who may never know it exists.
    
4.  the audio you heard came over Icecast2001
    
    from a server I run, broadcasting music I made.
    
5.  if you signed up, your address travels by SMTP1982
    
    still federated. still belongs to no one.
    
6.  if you ran the command, you used Finger1971
    
    a protocol from before the web. the first status update.
    

Six old systems, all passing quietly under your hand.

You did not just read about the boring internet.

You used it.

The internet you grew up on is not gone.

Some of its commercial superstructure is, and more of it will go. The next decade is going to be strange for any company whose value proposition was: _we host the place where you talk to your friends_.

The platforms will keep mutating. The feeds will keep filling. The slop will keep rising. The grief is real and you are not wrong to feel it.

But the actual internet — the protocols, the federated services, the plain-text commands, the open feeds, the small servers, the personal sites, the things people built when _user_ and _developer_ were sometimes the same word — is still right there.

It was not demolished.

It was buried under a louder layer for a while.

Now the louder layer is thinning out.

You do not have to wait for someone to rebuild what you lost.

You are standing in it.