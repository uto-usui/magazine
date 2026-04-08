---
title: "Cycles of disruption in the tech industry: with software pioneers Kent Beck & Martin Fowler"
source: "https://newsletter.pragmaticengineer.com/p/cycles-of-disruption-in-the-tech"
publishedDate: "2026-04-07"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

The recent [Pragmatic Summit](https://www.pragmaticsummit.com/) saw two legends of software development share a stage in what was one of the most popular sessions at our debut live event in San Francisco. In front of a packed audience, Martin Fowler and Kent Beck tackled a range of highly-relevant topics, with me hosting proceedings.

Martin and Kent go back decades, and Martin jokes that his career is “mostly about writing down Kent Beck’s ideas.” They first collaborated in the 1990s, and each has published influential books – ‘_Extreme Programming Explained’_ and _‘Test-Driven Development’_ by Kent, and _‘Refactoring’_ and _‘Patterns of Enterprise Application Architecture’_ by Martin.

At the Pragmatic Summit, they each shared a wealth of hard-earned learnings and decades-worth of perspective, along with a healthy dose of skepticism. Needless to say, the conversation did not disappoint, and this article summarizes what we discussed in their own words. You can also [check out the full recording](https://youtu.be/CZs8J1ZD0CE).

We cover:

1.  **Technology shifts similar to AI.** The arrival of the microprocessor, introduction of object-oriented languages, the Internet, and agile software development principles were all major changes – but one big difference was that it took time for these technologies to be adopted. Not so with AI.
    
2.  **Agile and AI similarities.** With Agile, company incentives were often misaligned, “snake oil” vendors were everywhere, and a “mid pack” of developers who resisted the change saw their career prospects hit. These trends look likely to repeat with AI.
    
3.  **What’s happening inside companies**. There’s some confusion – and even panic – at large companies, while AI tools don’t work nearly as well on large and complex codebases as on greenfield projects. Also, a “re-soloing” of software development is inbound.
    
4.  **Avoiding burnout with AI agents**. Set and maintain boundaries, and pay attention. Martin suggests to catch when you start producing “negative value”: that’s when to take a break.
    
5.  **Unhealthy performance metrics.** Companies are starting to measure things like frequency of pull requests – when they should be looking to quantify outcomes and results.
    
6.  **Lower quality on purpose?** It seems every business is optimizing for speed with AI, but quality can get dropped. Also: building features is more obvious with AI, than investing in “futures.”
    
7.  **Test-Driven Development (TDD): tests no longer optional?** Kent pioneered TDD, and today it’s more relevant than ever for working with AI.
    
8.  **Thriving in an AI-native industry.** Focus on working with agents to express your craft, try to get more enjoyment in _understanding_ your domain, and take on more ambitious work.
    

[

![](https://substackcdn.com/image/fetch/$s_!6D40!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe801e0ca-cd70-4ed7-9d94-9ca1e44509a1_1594x1452.png)

](https://substackcdn.com/image/fetch/$s_!6D40!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe801e0ca-cd70-4ed7-9d94-9ca1e44509a1_1594x1452.png)

_Martin Fowler (center), Kent Beck (right), and me at The Pragmatic Summit_

_Before we start, a programming note: this week, there will be no The Pulse on Thursday — I’ll be attending [AI Engineer Europe](https://www.ai.engineer/europe) in London on Thursday and Friday, including doing a fireside chat, and hosting one with Linear CTO Tuomas Artman._

**Do you recall a tech change as similarly promising and unpredictable as AI?**

**Martin:** “Nothing has hit with the magnitude of AI. This is a whole size different from anything we’ve faced before. On a smaller scale, we were very much involved in the growth of object oriented languages, which scared a lot of people. It didn’t scare us so much because we were part of it.

Looking back, the internet had a huge impact on us all, and of course, Agile software development, too. Agile had a very big impact on a lot of organizations: you could tell by how hard they resisted it. We had to persuade people of the importance of these technological changes; yes, even the internet! It may sound surprising but there were people who didn’t think it was important.

The thing about AI is that today there is no argument about how important it is.”

[

![](https://substackcdn.com/image/fetch/$s_!NR_1!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F819fa7b4-c3f3-4ab7-9a89-263e19893663_1600x1067.png)

](https://substackcdn.com/image/fetch/$s_!NR_1!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F819fa7b4-c3f3-4ab7-9a89-263e19893663_1600x1067.png)

_Martin Fowler (left) speaks at the Summit_

**Kent:** “The other analogy I have is the introduction of the microprocessor. Before that, computers were big boxes; you couldn’t move them around. If you wanted another computer, you’d mortgage your house for it. Having a computer was a _big_ deal.

I was a kid in Silicon Valley with my dad as a programmer when the Intel 4004 hit the market \[in 1971\]. We went: “Wait a minute, that _chip_ is a computer? Oh my goodness!” The possibilities of computing suddenly expanded thanks to it. If you could figure out how to write software on this chip and figure out how to design hardware around this thing, you could suddenly do things you hadn’t even imagined.

And so I think part of AI is this expansion of imagination. I’m writing projects that are ridiculously ambitious: I’m working on a persistent [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk). I’m writing library-quality code for Rust.”

[

![](https://substackcdn.com/image/fetch/$s_!Kug2!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F334ad5f3-31fe-4454-b222-7b256dfde10d_1390x808.png)

](https://substackcdn.com/image/fetch/$s_!Kug2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F334ad5f3-31fe-4454-b222-7b256dfde10d_1390x808.png)

_Kent predicts AI will expand software engineering like the Intel 4004 did. Source: [Intel](https://www.intel.com/content/www/us/en/history/virtual-vault/articles/the-intel-4004.html)_

**What was the feeling in the industry during those revolutions, and the differences between professionals who thrived back then and those who didn’t?**

**Martin:** “There was a mix of people chasing the hype and those saying, “this new thing is nothing special.” I think you’ve always got to have that balance of skepticism and curiosity, and to be selective about it. I mean, I have been completely skeptical about some big changes: Blockchain was one I was extremely skeptical about.

My skepticism is well-rooted because I’ve seen so much “snake oil” over the years. In fact, my skepticism has to be absolute and total, which means I have to be skeptical about my skepticism! To be that skeptical also requires curiosity: you’ve got to be curious enough to say “how do I probe in order to detect signs of something useful?”

You also need to be aware that your early interactions may not actually be a _true_ signal. When I started playing around with AI, it was with GitHub Copilot a year and a half ago. I was pretty unimpressed; it would give you something wonderful, but most of the time it gave you such garbage that you would just delete it right away. If that had been my only impression of AI, I would’ve immediately flipped the “[bozo bit](https://en.wikipedia.org/wiki/Bozo_bit)” on it, like I did with blockchain.”

**Kent:** “Here’s the thing, the capabilities of AI can change week to week. I’ll try something with Gemini one week and it fails miserably. Then Claude Code works pretty well, and then it doesn’t. And then I try Gemini for the same thing and it works, when it hadn’t worked last week!

People want an answer, but the answer’s always changing. In this environment, you can’t possibly have _the_ answer. That’s the bad news, but the good news is that nobody else has the answer either. So, you’re just as smart as everybody else because we’re all equally ignorant.”

**In 2001, the ‘Agile Manifesto’ came out, of which you were both co-authors. I think many companies are expecting the same thing with AI as Agile promised: better, faster, cheaper software. But how did Agile adoption really play out?**

[

![](https://substackcdn.com/image/fetch/$s_!o3em!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe4d78ab-2662-4ef7-b18f-a25317de5dd5_1600x1067.png)

](https://substackcdn.com/image/fetch/$s_!o3em!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ffe4d78ab-2662-4ef7-b18f-a25317de5dd5_1600x1067.png)

_Full house: The conversation with Martin (left) and Kent (right) drew a large audience_

**Kent:** “It turns out people don’t want faster, cheaper, better! Inside some companies, the incentives are misaligned with actually achieving that. And so as geeks trying to achieve these improvements and saying: “it’s 40% better, 12% cheaper and less fattening,” people will punish you if that doesn’t align with _their_ incentives inside organizations.

In the ideal organization, everybody would care about the same things, but that’s just not the way it works! So, if AI is coming along to promise the same things, we’re going to see the same reaction as before.”

**Martin:** “An obvious difference is the sheer magnitude and speed there is with AI. Also, I think there will be a big difference between people who use it well and people who use it badly. The trick is figuring out how to use it well and putting the effort in to learn. There will be a big distinction between those two groups.

But I suspect there will still be some similarities with Agile. The core notions behind Agile and extreme programming are solid and good, but a huge snake-oil industry appeared around it – the “Agile industrial complex”, as I refer to it. This is also happening with AI right now, and it’s often hard to see the difference between snake oil and the real stuff.”

**Kent:** “AI is an amplifier. If you’re young and learning quickly, AI can amplify your learning. I personally think this is the golden age of the junior programmer. I get people coming to me all the time saying things like “my son started his second year in CS and wants to go into something more commercial like art history.” And I’d say, “this is like if you’re a carpenter and they just introduced the circular saw and you think, ‘oh, well, carpentry is over. Anybody can build a house now.’ Well, no! Now, you have more powerful tools. You have less of the crummy work to do.

I think that young people are going to learn faster, and experienced folks who are working effectively are going to work quicker and more effectively.”

**Kent:** My concern is that there’s a “middle” of people who got into programming as a way to make money. If we look back at the Dotcom crash, there was a “mid pack” of such people who ended up going into real estate, more or less. But today, I don’t know where that “middle” will go, and it’s also much bigger now than 25 years ago.”

**Martin:** “But that middle has also been “flushed out” to some degree by retrenchment in the software industry at the [end of the zero interest rate period](https://newsletter.pragmaticengineer.com/p/zirp). So, that’s an interesting difference because we’ve had these things occurring at once: the AI boom, and the economic headwinds of the past 2-3 years.

This is an interesting mix that wasn’t present in the ‘90s with the Dotcom Boom. Back then, it was pretty much _all_ a solid boom.”

**Kent:** “Another interesting confluence of factors is the periodic, “we can get rid of all the programmers, woo-hoo” trend, which started with Cobol in the 1970s. With Cobol, business analysts were supposedly going to be able to write the programs, and the logic was that we wouldn’t need programmers anymore. That comes back repeatedly.

Agile, however, was definitely _not_ a “let’s get rid of programmers” trend. With Agile, we wanted programmers to be more _effective_ in their jobs. And since we started it, and were programmers, we were able to push that agenda pretty effectively.

However, today the “get rid of programmers” trend is repeating. As programmers, it behooves us to think about why they keep wanting to get rid of us. Some of that’s about us as programmers, and some of it not. Still, we should think about why people periodically want to axe us. In the end, this trend amps up the fear factor that everybody’s experiencing.”

[

![](https://substackcdn.com/image/fetch/$s_!fZXk!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4c75e55a-42f8-42be-bac8-5af9c6d7ab19_1600x1067.png)

](https://substackcdn.com/image/fetch/$s_!fZXk!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4c75e55a-42f8-42be-bac8-5af9c6d7ab19_1600x1067.png)

_In the middle of the discussion_

**Kent:** “A big trend is the “re-soloing” \[reduced in-person collaboration\] of programming.

A big part of extreme programming (XP) was creating a safe social environment for basically antisocial people. On an XP team, people are talking to each other for hours a day, and are happy to do so because it’s set up to be a positive experience.

Now, I see programmers saying, “I’ve got six agents, so really I’m managing a team.” No, you’re not: you’re using six tools at once, which is fine, but it’s very different from having a conversation with somebody who sees things slightly differently, or has a different energy level from you on the day.

We used to have programmers in individual offices with doors, and you’d shut the door and slide the pizza underneath. That was easy to manage, but then along came this messy, social, complicated, chaotic process of software development, which just happened to produce really good results.

But now, instead of 50 people on my team, I can have five and they don’t have to talk to each other, and each can have 10 agents. Is that the same? No, it’s not.”

[

![](https://substackcdn.com/image/fetch/$s_!NdVf!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97d1f960-88db-4779-bee7-6511138902c0_1600x1062.png)

](https://substackcdn.com/image/fetch/$s_!NdVf!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F97d1f960-88db-4779-bee7-6511138902c0_1600x1062.png)

_Swag: As well as the usual merch at the Summit, there were books by speakers, including Martin and Kent_

**Martin:** “Are we seeing two-pizza teams \[of 5-10 people\] becoming one-pizza teams because agents don’t eat pizza, or do we see two-pizza teams staying and becoming much more effective and capable? My bet is on more effective two-pizza teams.

We’re beginning to see some interesting feedback in terms of pair programming. With pair programming, is it one human and the genie (AI) programming, or is it two humans and one genie? If it’s two of us, perhaps we can control the genie a bit better, and we also have interaction.

I’ll be very interested in reports of people trying to control genies in pairs, possibly even beyond pairs. There’s also the whole ‘mob programming’ thing, and how that will go with genies. I don’t necessarily think that one person and many genies is the right answer.”

**Kent**: “My experience of pairing with two humans, plus one or more genies, has been very positive. And the fact the AI is slow is really nice. Every time models come out and are faster, I’m like, “Oh, there’s less time to talk.” When the AI goes away for three minutes, we can talk about our philosophy of naming, or how we express conditionals, or about what we should be doing next. But if it pops back in 15 seconds, you don’t have time for that conversation.”

**Do you find yourself getting close to burnout, especially when spinning up multiple threads? Do you have strategies for managing the mental impact?**