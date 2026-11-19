---
title: "Designing with html"
source: "https://shiftnudge.com/archive/26905760"
publishedDate: "2026-11-18"
category: "design"
feedName: "Sidebar"
---

Last week, I released a [free skill file](https://shiftnudge.com/skill?utm_source=kit&utm_medium=email&utm_campaign=newsletter_2026_11_09_skill_page&utm_content=skill). It gives you and your agents a little sample of the 16 Shift Nudge principles, and almost 500 people have grabbed it so far. They found out about it mostly from an [Instagram reel](https://www.instagram.com/reel/DfU8X7iv2CL/) and a [post I made on X](https://x.com/mds/status/2118052287708836320).

The big idea is that you can show your agent a screenshot, a page or a Figma frame, and it will give you a quick little design review. It names what’s off, tells you which principle it’s seeing through, and gets you thinking about ways to critique your own design.

If you haven’t downloaded it yet, you can [grab the skill file here](https://shiftnudge.com/skill). The zip includes a README that shows you where to install it. _(It’s a small sliver of the Shift Nudge MCP, which has the full design training and 88 more principles.)_

Today, I want to talk about what I believe is a big part of the future of design.

I designed and built the new [skill file page](https://shiftnudge.com/skill?utm_source=kit&utm_medium=email&utm_campaign=newsletter_2026_11_09_skill_page&utm_content=skill-page) in about a week, and I did it all inside the browser without any additional design tools.

Fig. 1

![The pills raining into NUDGE](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/xonSAqbsYXDibAsuAvQXGs/email)

The skill is called _/nudge_, so I started with an idea using the word nudge. I wanted to be able to nudge the word nudge, sort of like a blobby organic shape. Something I could hover across and make wobble. If I grabbed it, it would bubble up. Just something I could pull apart and play with, kind of like the squishy toys my kids are using all the time these days.

The first version of the page was exactly that. The word NUDGE as giant wobbly text, with the 16 principles falling in as pills you could grab and throw around. I also turned them into numbers and tiny little pills so I could play around with it. It was super fun. Then I started adding more, like the color bleeding into the letters.

Fig. 2

![A pill dragged through NUDGE, gripping and stretching the letters](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/bBknPXm8DqCpFfFE649AFb/email)

Fig. 3

![Color left by the pills inside the letters](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/7AK6AzLnVJ4RwcP1SHJKx7/email)

Early on, I wasn’t even sure how I was going to turn this into a website. I was like a kid with some crayons, just playing, having fun and exploring. That’s how a lot of my ideas start. I’m channeling some creativity and curating what’s fun and what’s cool as I go.

To tune the physics, I used a panel of live sliders right on the build. Things like how fast the pills move, or how much color bleeds when a pill hits the blob. You can feel every change instantly.

It’s the same as adjusting a font size in a canvas tool. Once a value feels right, I copy and paste it into Claude in the terminal, the same way I teach in the Shift Nudge Claude Code curriculum. Claude updates the full build, and that’s now what I’m building with. I’m working on the finished product, so there’s nothing to translate from a canvas into code later.

Fig. 4

![The panel of live sliders open beside the NUDGE jelly](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/uAAqAgXLUuThE2QSNnbxsL/email)

But then I needed to build an actual page around it. This is where I had Claude generate a bunch of ideas by making HTML labs pages, each with 10 or 20 versions I could scroll through. I’d ask for something like “Generate 12 versions of these form fields, all with varying degrees of negative space.” Or “Generate 12 giant concepts for the hero.” You can go as tiny or as large as you want.

Some of it is bad. You have to be good at curating what looks good, and what supports your vision. Even a quick generation can give you an idea, or expose a thread worth pulling. Then you can hone in on one and generate 12 more, or go in a different direction.

The hero ideas mostly missed, and I cut almost all of them.

Fig. 5

![Nine hero concepts from the labs](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/uNHuSbaaVCNY69gBngnZjD/email)

The form ideas went better. My button already had an arrow in a little circle. One of the generated form ideas flipped it to a dark circle on a light button, and I really liked it. That’s still the Send it button today. From there, I picked the form style I liked best and methodically added the headline, the bullets, the helper text, and so on.

Fig. 6

![Nine form field ideas from the labs](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/pr9Nsiw2Uo7jkjqHqFnTxt/email)

I also had it generate the page content, like a full column of the body. A few of those came back as chat bubbles, and that’s how I ended up on the chat thread.

Fig. 7

![Nine page content ideas from the labs, including chat bubbles](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/fQS9ABG86Hj4YWQAv6ZDQV/email)

Then I tried whole versions of the page.

Fig. 8

![Nine whole-page versions from the labs](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/ogC88adB66aNhLFL4W8zAc/email)

I curated all of that down to only three options. I loved the Swiss grid pages, and they still didn’t fit this page. Anything with too much going on got cut too. That’s Restraint, one of the 16 principles. What can be removed before anything is added?

Fig. 9

![The three page versions I kept: the conversation, polished, and the single column](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/JaUE3owBmmSSn1i1mK15E/email)

The one I kept coming back to was the chat thread. Texting with a friend and getting information as quickly as possible is a very strong idea. How few words can I use to explain this? The chat bubbles were simple, and they went nicely with the pills and the blobby shape.

Fig. 10

![The /skill page as a chat thread](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/bV9EKj2G1pU9Bd9a6a2bhE/email)

That’s also when I changed the word NUDGE into a blob I could play around with, so it wasn’t quite as distracting. As I built out the page, I realized I needed to explain the skill in words, very quickly. That’s Clarity. The purpose of a page should read before its style.

I liked the blob in its own contained box. But I wanted to see it as a whole-page experience, so I moved it behind everything. That let the pills bounce off the rest of the page too, like the headline, the chat bubbles and the buttons. It all felt like one cohesive thing.

Even the three I kept were still not quite where I ended up. So I kept refining until I got it closer to this. A lot of that was figuring out the best composition for the form and the More button.

Fig. 11

![The blob behind the whole page](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/e4CLPVsGaSGtdqESqnfujn/email)

And I spent eight commits in about an hour on one button. On a phone, when you scroll, the Get it button pins to the top of the screen, widens, and changes to “Get the free skill.” Scroll back up, and it lands back in its spot.

That might sound like a lot of time for one button. That button is how people get to the form while they’re scrolling and exploring. The whole reason someone is on that page is to get the file, so that’s where I spent the time.

Fig. 12

![The Get it button on a phone, before scrolling, halfway pinned, and fully pinned](https://embed.filekitcdn.com/e/qDFmPVRGbLQHs1gJ11riB8/cBTw88VxEj5VfnQfwQHpj5/email)

Thirty-six commits later, the page was live. I explored ideas directly in HTML and built on top of whatever worked.

Doing it all in the live build helps you understand what it feels like as you scroll around and interact with it. It works for a big site concept, and it works for tiny decisions too.

There’s still an incredible amount of design effort going into this. There’s no single magical skill file, or single magical prompt, that’s going to get you to a fantastic end product. I’m still using all of my design knowledge as I’m cutting, manipulating, shifting and prompting all over the place.

So, the future of design. You don’t have to code to work this way. The closer you can get to the code, moving things around with your prompting and your voice, the better you get at directing these models. Use them as a new canvas, or as one more tool alongside your canvas. I still design on a canvas when I need it.

Developers are already adapting. AI models are writing most of their code, and they’re building new frameworks to test it at the speed these models move. These models are designing now too. A lot of that design is bad, and a lot of it is good. We need to figure out how to use it, so we’re not stuck going 5 miles an hour while something else goes 5 million.

Canvas tools exist because we needed a way to draw pictures of what something might look like. The goal is always a finished, built product. Figma and other canvas tools are still very powerful, the same way handwritten journals are still around after decades of typing. New tools that go really fast are worth learning too, and I’m going to explore this way of working a lot more.

Michelangelo talked about carving David by removing stone until nothing but David was left. Design is a lot like that. You cut things away until nothing is left except what needs to be there.

Practical design wisdom delivered weekly.