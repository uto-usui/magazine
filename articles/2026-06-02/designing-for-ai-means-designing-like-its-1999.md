---
title: "Designing for AI means designing like it’s 1999"
source: "https://uxdesign.cc/designing-for-ai-means-designing-like-its-1999-da9c53d24644"
publishedDate: "2026-06-01"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

## That means looking back at the unfinished, handmade web to reinvent how we design for AI — and who we become — now.

[

![Patrick Neeman](https://miro.medium.com/v2/resize:fill:64:64/1*U32tjPkRoauSxUDHLAZZGQ.png)



](https://medium.com/@usabilitycounts?source=post_page---byline--da9c53d24644---------------------------------------)

13 min read

6 days ago

1

If you [designed for the web in 1999](https://webflow.com/blog/90s-website-design), you remember the feeling while the Hamster Dance video was playing in the background.

Pages were handmade — for a lot of us, the WYSIWYG editor was Notepad — the conventions were improvised, the JavaScript was rough, and some of the most popular things online were [gloriously, defiantly pointless](https://originalhampster.ytmnd.com/), like the Hamster Dance.

The browser wars were still on, so a layout that worked in Netscape often broke in Internet Explorer — and you couldn’t always trust two versions of the same browser to render a page the same way. We had all the tags — [FRAME, MARQUEE and BLINK](https://www.w3.org/TR/2014/REC-html5-20141028/obsolete.html).

The tools we now treat as basic weren’t there yet either. CSS technically existed, but browser support was so patchy you couldn’t really lay out a page with it — serious layouts meant nesting tables inside tables and propping them open with invisible single-pixel spacer GIFs.

“Responsive design” wouldn’t even be [named for another decade](https://alistapart.com/article/responsive-web-design/); you built a site for one screen size — 640 by 480 — and everyone on a different one squinted or scrolled sideways.

You shipped something, watched people get confused, and changed it.

You were improvising the medium and inventing its toolkit at the same time, which is a strange way to work and, in hindsight, the whole opportunity. And it looks a lot like now.

> “History never repeats itself, but it does often rhyme.” — Mark Twain

There’s a bigger pattern underneath this, and the venture capitalist John Doerr has a name for it and has made a lot of money off of it. He describes technology as arriving in roughly thirteen-year [tsunamis](https://idrisbello.com/2018/12/09/an-evening-with-john-doerr-why-he-is-betting-on-ai-and-amazon/).

Doerr’s timeline seems about right, but it seems to be about 14 years apart:

-   **1980:** The microchip, the PC and the [hamburger menu](https://en.wikipedia.org/wiki/Hamburger_button).
-   **1994:** The internet — the wave we were all surfing, poorly.
-   **2007:** Mobile and cloud computing, breaking together.
-   **2022:** AI, the one he says is breaking.

> If the cadence holds, we aren’t in the calm middle of that wave. We’re at the front of it, holding on to our surfboard for dear life. But it’s our wave to surf.

We have extraordinary capability and almost no shared conventions for handing it to people — no settled patterns, no agreed vocabulary (ambient, really? They’re just fancy Cron Jobs), half the tooling still being written as we use it, literally by the technology itself. The tools are remarkable; the ground under them is soft, shifting like a tech quicksand.

That isn’t a complaint. It’s an invitation.

The conventions that will eventually feel obvious — the ones the next generation of designers inherit without thinking about them — don’t exist yet.

> The conventions are still unclaimed, and the people building in this stretch are the ones who get to set them.

You aren’t adapting to a future someone else has already drawn up — you’re one of the people drawing it.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/1*nxy7ndJoN_ehm3aP-ZlxSA.png)

A standard can win and still be a moving target. Build so you can change the plug without rebuilding the machine.

## Standards and Protocols Haven’t Settled Yet

In 1999 you picked a side in the browser wars and hoped your layout survived the other one. Bet wrong, a lot — on a proprietary plugin, a tag only one browser supported, on Flash ([which was 99% bad](https://www.nngroup.com/articles/flash-99-percent-bad/) according to Jakob Nielsen) — and you rebuilt.

Today the equivalent is choosing among protocols that are barely a year old, backed by companies still feeling out how they’ll cooperate (or not, altogether).

The Model Context Protocol is the clearest case.

Anthropic released it in late 2024, and within a year [ChatGPT, Cursor, Gemini, and Microsoft Copilot had adopted it, with more than 10,000 public servers running against it](https://anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation). Then, in December 2025, Anthropic handed it to a new foundation under the Linux Foundation for neutral governance.

> That’s real convergence, and faster than the web ever managed — HTML and CSS took years to stabilize. It will do the same here.

It’s also the lesson: even the standard that won changed hands inside twelve months, and the layers stacked around it — authentication, permissions, agent-to-agent messaging — are still being ironed out.

A protocol can be the obvious choice and still be a draft.

### Then and now

-   **Then:** The web’s standards didn’t exist yet, and the ones that mattered took years to settle. You bet on a browser, a plugin, a proprietary tag, and then waited to find out whether the rest of the industry would follow you or strand you. The danger was the vacuum — building something real on top of nothing anyone had agreed to.
-   **Now:** The standards arrive fast, sometimes within weeks, which feels like progress. But they keep changing hands and shifting shape while you build on them, and the layers around them — auth, permissions, agent-to-agent messaging — stay contested. The danger has flipped: it isn’t the absence of a standard, it’s committing to one that’s still a moving target.

### Accepting it

Build against today’s standard, but behind a thin adapter you control. When the spec moves, you rewrite a connector, not your product.

Press enter or click to view image in full size

![Chat is the first guess, not the final form. The interface that wins is the one you stop noticing.](https://miro.medium.com/v2/resize:fit:700/1*P2Flh7GHd_52opVoPuLlYg.png)

Chat is the first guess, not the final form. The interface that wins is the one you stop noticing.

## The Interaction Paradigm Is Still Being Invented

We defaulted to chat the way early sites defaulted to the page — because it was what shipped first, not because it was right. For years the web bent everything it touched into a scrolling document: forms, storefronts, video, software all crammed into the shape of a page until better patterns slowly emerged.

Chat is doing the same thing now. We pour research, coding, drafting, and decision-making into a single conversation thread, because the thread is what we have. It’s really a command line that learned to speak English — powerful, and still a guess.

A text box is a thin interface for something this capable. By mid-2025, [ChatGPT alone was handling about 18 billion messages a week from 700 million users](https://www.nber.org/system/files/working_papers/w34255/w34255.pdf), and the overwhelming majority still happens through typed back-and-forth.

> Voice, background agents, AI folded invisibly into existing tools — all of it is being tried, none of it has won.

This is the part designers should find thrilling. Nobody has decided yet what the dominant way to work with a model looks like.

### Then and now

-   **Then:** The open question was how to arrange information and actions on a page — where the navigation lived, how a person scanned it, how they moved from one screen to the next. Hard work, but the page sat still while you figured it out, and the patterns you landed on stayed put once you found them.
-   **Now:** The question is how a person should hold a conversation with a system that talks back, decides, and sometimes acts on its own. That’s harder, because the interface itself improvises — the same input can produce a different response twice — so you’re designing an interaction whose other half won’t behave identically each time you test it.

### Accepting it

The chat window is not the destination. Prototype the same task three ways — conversational, embedded, ambient — and let people show you which one disappears into their work by building that prototype at warp speed and testing it.

Press enter or click to view image in full size

![The foundation keeps moving. Design for where it’s heading, not where it is today.](https://miro.medium.com/v2/resize:fit:700/1*XzTRc6ovrRE_QN2K9Yt6Og.png)

The foundation keeps moving. Design for where it’s heading, not where it is today.

## Everyone’s Building on Infrastructure That’s Changing Under Them

The hardest thing about 1999 wasn’t the browsers. It was that the whole platform kept moving — connection speeds, screen sizes, what a server could do — so a design that made sense in spring looked dated by fall.

Pull up the era on the [Internet Archive’s Wayback Machine](https://web.archive.org/) and you can watch big sites rebuild themselves again and again, chasing a target that wouldn’t hold still. You want proof? I had to design [this](https://web.archive.org/web/19980123054419/https://www.bayareacouncil.org/) for a 8-bit video card.

The models underneath us move faster than that. [METR, a research nonprofit, found that the length of task a frontier model can complete on its own has been roughly doubling every seven months](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/). The thing you designed around in January is materially more capable by summer.

## Get Patrick Neeman’s stories in your inbox

Join Medium for free to get updates from this writer.

Remember me for faster sign in

That sounds like good news, and it is. But it quietly invalidates your design.

> The careful handoffs you built around the model’s weak spots, the places you inserted a human, the tasks you ruled out as too hard — those choices were right for a model that no longer exists.

Assumptions don’t fail loudly here. They just expire which is both a good and bad thing.

### Then and now

-   **Then:** The platform underneath you improved — faster connections, bigger screens, more capable servers — and that mostly helped. Your design aged and started to look dated, but it kept working. The floor rose without pulling the rug out from under what you’d already shipped.
-   **Now:** The platform gets smarter, not just faster, and that cuts both ways. A more capable model can quietly invalidate the decisions you made around its old limits — the handoffs, the human checkpoints, the tasks you ruled out as too hard — so an upgrade you didn’t ask for can turn yesterday’s careful design into the wrong design overnight.

### Accepting it

Design for where the puck is going. Build for the capability you’ll plausibly have in two or three model generations, and make the parts most likely to change the easiest parts to replace.

Press enter or click to view image in full size

![Today’s price is a subsidy, not a settled cost. Build for the day the meter runs true.](https://miro.medium.com/v2/resize:fit:700/1*9zQF4JI5LVGP0Q4C1H_3KA.png)

Today’s price is a subsidy, not a settled cost. Build for the day the meter runs true.

## We’re Still Working Out the Business Model

In 1999 nobody knew how the web would pay for itself. Subscriptions, banner ads, e-commerce, “eyeballs” — every theory had backers, and most were wrong. The ones that stuck reshaped what got built: the ad model gave us free everything, and the surveillance that came with it.

AI is in the same fog, with bigger numbers. The labs are spending more to answer you than they charge: [by early 2026, Anthropic’s margins had reportedly swung from about negative-94% in 2024 to roughly +40% in 2025, while OpenAI was projected to burn around $14 billion in 2026](https://www.axios.com/2026/03/12/ai-models-costs-ipo-pricing).

Consumer subscriptions remain heavily subsidized — a familiar move, like the cheap early Uber rides that venture money quietly paid for. It looks a lot like 1999 where Pets.com was shipping [50 pounds of dog food, cross country, for free](https://en.wikipedia.org/wiki/Pets.com).

That subsidy won’t last forever, and pricing will reset.

The features that feel free today — long context, dozens of tool calls per task, an agent left running all afternoon — are exactly the ones most exposed when the economics rationalize. What you can afford to build today may cost very differently tomorrow.

### Then and now

-   **Then:** The web spent years not knowing how it would pay for itself, but the experiment ran on relatively modest budgets, and the losses were survivable while the answers shook out. When the ad model finally won, it reshaped what got built — and most teams had time to see it coming and adjust.
-   **Now:** AI is running the same experiment at a vastly larger scale and burn rate, with the cost of every interaction sitting right under the product. Because the numbers are so big and the subsidy so heavy, the reckoning arrives sooner and lands harder — pricing will reset beneath the features that feel free today, and it won’t wait politely for you to be ready for it.

### Accepting it

Know your cost per interaction, not just your headcount. Design experiences that stay viable if the price of a model call doubles — and be honest about which features only pencil out while someone else is paying.

Press enter or click to view image in full size

![The demo is the easy 80%. The product lives in the other 20%.](https://miro.medium.com/v2/resize:fit:700/1*618MXDMMXTClNtpw19r7zQ.png)

The demo is the easy 80%. The product lives in the other 20%.

## The Gap Between Hype and Reliable Execution Is Wide

Demos are easy, even more so now.

The web was full of dazzling Flash intros in 1999 that fell apart the moment a real person tried to do something — and most of us learned to hunt for the “skip intro” button. AI has its own version of that gap, and right now it’s wide.

Really wide. Double wide. Mobile home wide.

[MIT’s 2025 “State of AI in Business” study found that about 95% of generative-AI pilots delivered no measurable impact on the bottom line](https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo). The models usually weren’t the problem; integration, workflow fit, and reliability were — the unglamorous work of fitting a tool to how people actually operate.

Here’s the hard part for designers. A system that’s brilliant 90% of the time and confidently wrong the other 10% is harder to build around than one that simply breaks.

> Visible failure tells the user when to stop trusting it. Confident, fluent, wrong does the opposite — it earns trust exactly when it shouldn’t and we have to solve for that.

The product isn’t the impressive answer. It’s everything around the answer that helps a person tell the good 80% from the bad 20%.

### Then and now

-   **Then:** The gap between demo and reality was mostly cosmetic. A Flash intro dazzled and then fell apart; a page looked better than it worked. But the failure was visible — you could see the seams, and so could users, who learned to distrust the flashy thing and route around it fast.
-   **Now:** The gap is more dangerous precisely because it hides. A confident, fluent, wrong answer looks exactly like a confident, fluent, right one, so the failure doesn’t announce itself the way a broken layout does. The work shifts from making the output impressive to helping a person tell the good output from the bad — which is the harder design problem by far.

### Accepting it

Design for the failure, not the demo. Decide in advance where a human checks the work, make the model’s uncertainty visible, and build the graceful recovery before you build the impressive path.

Press enter or click to view image in full size

![We’ve found a hundred small uses and not yet the one. The dark door is the work.](https://miro.medium.com/v2/resize:fit:700/1*2WGaKEMXNGPS1ANBkluzvQ.png)

We’ve found a hundred small uses and not yet the one. The dark door is the work.

## Nobody Agrees on What the “Killer App” Actually Is — and We Know It Isn’t Chat

Every new platform spends its early years hunting for the thing it’s truly for. The web had its false starts — web portals, “push” media, branded “channels” that were going to replace the browser — and serious money chased each one (PointCast was briefly the future of media) before search, commerce, and social turned out to be the shapes that mattered. The killer app is almost always obvious in hindsight and almost never the thing the hype named at the time.

AI is mid-hunt. Look at what people actually do with it: in [OpenAI’s large 2025 usage study, the most common activities were writing, practical guidance, and information-seeking](https://www.nber.org/system/files/working_papers/w34255/w34255.pdf) — useful, but spread across dozens of small jobs rather than one defining one.

> Chat is the container we ship them in. It isn’t the killer app.

The killer app is probably something chat is currently standing in for, poorly. You won’t name it from the top down. It’ll show up as a job done so well it stops feeling like “using AI” at all.

### Then and now

-   **Then:** The web found its defining shapes by trial and error, burning through portals, push media, and branded “channels” before search, commerce, and social turned out to be what mattered. Costly, but the dead ends were at least legible as dead ends — once people stopped using them, you knew.
-   **Now:** AI is earlier in the same hunt, with one twist that makes it trickier. Its most natural-feeling interface — conversation — is good enough at standing in for everything that it may be hiding the real app rather than revealing it. The thing that feels like the answer could be the very thing keeping you from finding it.

### Accepting it

Watch where people fight the interface to get something done — exporting, re-pasting, working around it. Those friction points are the unbuilt product. Design toward the job, not the chat log.

## This Is a Time of Reinvention — Including Your Own

None of this is a warning. It’s an invitation — an invitation to code again, to build the thing before anyone has worked out the right way to build it.

The reason 1999 was such a good time to be a designer is the same reason now is: the medium hadn’t hardened, so the work mattered more. The conventions we take for granted on the web — the shopping cart, the news feed, the login — were invented by someone making a reasonable guess and watching what happened. You can still see those early guesses preserved in places like the [Web Design Museum](https://www.webdesignmuseum.org/). They weren’t discovered. They were tried.

We’re in that stretch again.

The standards are soft, the models keep moving, the business model is unproven, and nobody knows the killer app. That isn’t a reason to wait. It’s the clearest signal we have that the things worth building haven’t been built yet — and the same goes for the people who’ll build them.

It also means more work. In a settled medium you reach for a proven pattern and move on.

> Here there isn’t one yet, so you end up inventing the approach — the tooling, the conventions, the answer to how the thing should even work — instead of borrowing it.

That’s slower and less certain than building on what already exists. It’s also the point. The extra effort is what invention costs, and right now it actually buys you something.

And the medium isn’t the only thing getting reinvented.

The people who came through 1999 well are the ones who kept reinventing themselves — hand-coders who became information architects, table-layout obsessives who picked up CSS, then interaction design, then whatever the next wave demanded.

The durable skill was never a particular tool. It was the willingness to become someone a little different every few years. This moment asks the same of you.

> Some of what you’re good at today won’t matter much in a decade, and some of what will matter can’t be taught yet, because no one has worked it out.

So you reinvent the work, and you reinvent yourself along with it — and the second is the harder, more lasting bet.

Experiment.

Be wrong usefully.

Reinvent the medium, and reinvent yourself with it. The rules get written by whoever shows up to write them.