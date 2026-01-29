---
title: "Some thoughts about tool design and AI"
source: "https://blog.vbuckenham.com/some-thoughts-about-tool-design-and-ai/"
publishedDate: "2026-01-28"
category: "design"
feedName: "Sidebar"
---

Okay, so fair warning, this is a post about AI tooling from someone who does not use it much! I feel underqualified to write this post. But I think it'll be interesting to look back on. And being underqualified to write something should not stop me from doing so. Not on my own personal blog. Anyway, let's get into it:

The normative form for interacting with what we think of as "AI" is something like this:

-   there's a chat
-   you type a question
-   you wait for a few seconds
-   you start seeing an answer. you start reading it
-   you read or scan some more tens of seconds longer, while the rest of the response appears
-   you maybe study the response in more detail
-   you respond
-   the loop continues

If you do this all day... you probably need to subscribe to the service. Each query costs real money to produce (as opposed to the standard expectation for web services, which is "virtually free").

Coders use a slightly different version of this, where they connect the documents they're working on to the AI so the AI can operate directly upon them. And then they only do the typing & reviewing part on the order of every minutes, instead. But this flow of asking questions and waiting for a response is still very much present.

* * *

Now, when I think about the properties a good tool has, what I personally run through when thinking about how to improve tooling, I think of the following things \[^1\]:

### Low latency

The smaller the gap between trying something and seeing whether it works, the better. Different processes can vary in terms of how big this feedback loop is by orders of magnitudes. If you write a movie script, you're not gonna properly see how that turns into a film for years. And by then it's too late. Seems very scary to make a movie, to me! If you type on a computer that's lagging and the letters take half a second to appear, that's very annoying, and you're probably going to make more errors than otherwise. But always: the less latency, the better. And there are step changes, too, where you can get fast enough to fall into a different perceptual category. Once things have a small enough delay, then we stop seeing them as something that happens _after_, and we start seeing them as something that happens _while_. And that's much better. Or, if you go from tens of seconds to single digit numbers of seconds, then there's much less scope to get distracted while waiting - again, much better.

### Direct manipulation

If I'm working on a videogame, and I'm working with a artist, I want that artist to be able to put their art in the game themselves. Partly because it means less boring work for me, but mostly because there's a ton of small decisions you need to make when you do that, and I want their eyes to be making those small decisions instead of mine. Oh, this is a little too big, it throws the composition off. This colour looks a little muddy on this background. What if this light was a little dimmer. I can make these decisions, but worse. Because they have better eyes for these things than mine - that's why I'm working with them! Or, we can wait for me to do it, then they see it, and then I make the changes. But each change done that way is a bit of a drag. An extra task on the todo list. And if it's a tiny tiny nit... not worth it.

So - it's best if the artist can directly manipulate the art in the game. Can get feedback in real time on how the thing works. I guess this is another way of talking about latency, really. You can only get lower latency if you can see the results of your actions as you're making them. Like, I am typing this on a keyboard, and watching the letters appear on screen. That's technically not direct manipulation, but the two processes are so entangled and can happen simultaneously, so it's as if they're the same. If I typed a chunk of words, and then had to go to a different thing to see the words appear and then edit them - the feedback loop has been increased, and the experience is worse.

### Cheap or free

I work across a lot of fields and I use a lot of different tools. And I so much prefer my tools to be free. Partly because it's less money and who doesn't like spending less money. But also - it means in the future I am much more likely to have access to it. If it's a subscription - it's only worth paying it while I'm actively using it. If it's a one-off purchase... well, will it stop working when I upgrade my OS? Will I be able to dig out the license? Will they have went bust? If I need to share the working files with someone, will _they_ be able to edit them? I will pay for useful software, don't get me wrong... but paid for software is less useful than the equivalent software, but free.

* * *

Honestly, I think you can see where I'm going with this. The current normative design for AI tooling matches badly against all three of these principles. You have to wait for a response (streaming in the reply as it's generated is a good trick to lower the latency, but the need for the trick shows how hard they're working up against it here). You don't have direct control of the output, but operate at a remove - describing changes rather than doing them directly. And control of the models is out of your hands, and you are thinking about usage limits, even if you are on a free plan.

But! I don't think this is all the ways that AI can be used. As a comparison:

This is a cutting edge AI model... which can be used by directly interacting with the video. It's structured in a kind of complicated way such that the interaction can have minimal latency (there is more latency when bringing in a new image or bit of footage, but the interaction has lower latency). And it's an open source model, so if you build something with it (and host it yourself, which is admittedly a huge pain and quite expensive) it will keep working into the future.

So when I look at the future of AI tooling, this is the kind of stuff I get excited by. I wrote about why I'm bullish on [local models](https://blog.vbuckenham.com/keep-your-models-close/) before - they're not fashionable right now, but I still do believe that this is a better long term bet than the current hosted models.

Whereas... I saw [this incredible (derogatory) Steve Yegge blog post](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04) going around yesterday the other week and the primary thing I take away from it is that so much of the complexity within it is to work around the fact that the agents he is using take a long time to show results. The complexity is there because he wants a lot of work to happen in parallel. He wants a lot of work to happen in parallel because it means that the critical section (him) can be kept busy reviewing and planning. The mental overhead that the system imposes is pretty huge - it would be less if the system was more sequential, such that only one change was happening at any one time - but that's a worthwhile tradeoff for removing the many periods of idle time that would otherwise occur with the current speed of LLMs.

(The two other big factors in the design are the psychological affect of using the system - it's exciting! stuff is always happening! you don't need to use willpower to keep it moving! - and the unreliability of any particular AI agent. So you need to layer on agents watching the agents, and agents watching the agents that watch the agents... But these factors are less germane to my point in this post.)

Of course, it's all very well to say "this would be better if it was faster" - everyone agrees with that already. It's another thing to actually make it faster. But I do also think that the AI tooling which has these properties have a very different feeling to those that do. "Slop" comes from this gap between intent and execution being filled by the AI. Systems where the user is more directly manipulating the system avoid this. You are no longer reviewing the output, you are shaping it directly. The space for vague and bad details to get added and waved through is smaller. I guess it's notable that the positive example I gave was on doing a defined task on a visual image, whereas the negative example was on working on a large codebase of text. Direct manipulation gets harder as you move up levels of abstraction (but "is this fish" is pretty abstract compared to "this pixel has colour #45e282", so it's not like we're not dealing with abstraction at all in the visual realm). I always got a little frustrated that the tooling we ended up with for image generation was "write text" -> convert to high dimensional vector -> generate image from high dimensional vector. There's tooling we can develop to allow more direct manipulation of the high dimensional vector! It'll take time to think through, it'll require some learning on behalf of the users, but... a lot of these users are up for learning new things if it'll help them generate better things. Are there equivalents when it comes to generating code? I think there must be. If we start analysing codebases with vector embedding tools, can we start deriving properties of the code? Can we start structuring things so that the tests are treated fundamentally differently to the implementing code? Do we need to use the leaky unreliable abstraction of LLM prompting to perform edits?

* * *

Some links I collected while thinking about this:

An AI tool... adds a shortcut so that common things don't actually use AI, in the name of reducing latency:

[

Instant Actions added to Substage

![](https://static.ghost.org/v5.0.0/images/link-icon.svg)

![](https://blog.vbuckenham.com/content/images/thumbnail/social-preview.jpg)

](https://joethephish.me/blog/substage-instant-actions/)

Matt Webb ruminates on the different pacing of AI agents. A different kind of scratching at the design problem of having useful but very _slow_ kinds of software running

[

The natural home for AI agents is your Reminders app

Posted on Thursday 15 Jan 2026. 1,177 words, 17 links. By Matt Webb.

![](https://static.ghost.org/v5.0.0/images/link-icon.svg)Interconnected, a blog by Matt Webb

![](https://blog.vbuckenham.com/content/images/thumbnail/reminders.png)

](https://interconnected.org/home/2026/01/15/reminders)

Maggie Appleton looks critically at that Gas Town post, pulling out some future design patterns from the chaos. Again, a lot of it comes from agents working concurrently (because they are too slow to run sequentially) and how to manage the consequences of that. Also some smart stuff about how it manages the limited context window of LLMs.

[

Gas Town’s Agent Patterns, Design Bottlenecks, and Vibecoding at Scale

On agent orchestration patterns, why design and critical thinking are the new bottlenecks, and whether we should let go of looking at code

![](https://blog.vbuckenham.com/content/images/icon/apple-touch-icon-2.png)

![](https://blog.vbuckenham.com/content/images/thumbnail/gastown.png)

](https://maggieappleton.com/gastown)

[Naomi Alderman on the locus of AI services](https://bsky.app/profile/naomialderman.bsky.social/post/3mc7xi4dh3224) - whether the AI gets into all the tools, or the LLM agent subsumes the tools. With the current model of "slap an LLM on it", the agent subsuming other things make sense - but I think the more powerful future is the tools just getting better from more particular and more useful AI getting integrated.

[A comic from Amy Marie Stadelmann](https://www.instagram.com/p/DTSuKQJlFbq/?img_index=1), an artist reflecting on the fucked up iteration loops that AI prompting has, and how unviable they are for them.

And a demo that is directly battling that latency problem:

> prototyping co-drawing with Gemini Flash 3 at Google in these demos "thinking" is disabled, which makes the model return tokens very quickly (all videos are realtime), and I find these rapid responses pretty good for the use-cases I'm experimenting with, like: executing simple diagrams ...
> 
> — [Szymon Kaliski (@szymonkaliski.com)](https://bsky.app/profile/did:plc:oqrselno2rvqfwsfhj6l6u43?ref_src=embed) [2026-01-12T13:04:25.959Z](https://bsky.app/profile/did:plc:oqrselno2rvqfwsfhj6l6u43/post/3mca43vptnk2x?ref_src=embed)

* * *

\[1: I should actually also do this comparison with the list of points I came up with for this talk, on making specifically "creative tools" - tools to encourage novice users to make art.

[https://www.youtube.com/watch?v=APajJQGv-Ig](https://www.youtube.com/watch?v=APajJQGv-Ig)

But these points are more specifically for that type of tool, whereas these I think apply to any kind of tool.\]