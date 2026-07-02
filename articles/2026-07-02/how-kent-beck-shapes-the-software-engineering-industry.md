---
title: "How Kent Beck shapes the software engineering industry"
source: "https://newsletter.pragmaticengineer.com/p/how-kent-beck-shapes-the-software"
publishedDate: "2026-07-01"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/ddHQQtjIOpw), [Spotify](https://open.spotify.com/episode/3M6hgR5zBT4699tAceSHaG)**, **and [Apple](https://podcasts.apple.com/us/podcast/how-kent-beck-shapes-the-software-engineering-industry/id1769051199?i=1000775036869).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!YCsL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39bdfbb4-fb73-41d8-83cb-0ca4832aed49_1280x80.png)

](https://substackcdn.com/image/fetch/$s_!YCsL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39bdfbb4-fb73-41d8-83cb-0ca4832aed49_1280x80.png)

**• [Antithesis](https://antithesis.com/pragmatic).** If you’re using agents to code, the problem isn’t writing the code but making sure that nothing broke. Antithesis runs your whole system in a hostile environment and identifies hard-to-find bugs before users hit them in production. Teams like Jane Street, Fly.io, and the etcd community use agents safely and ship better code, faster, with Antithesis. [Learn more.](https://antithesis.com/pragmatic)**• [WorkOS](https://workos.com/)** – make your app and agents Enterprise Ready, with SSO, SCIM, RBAC, and more. [Get started.  
](https://workos.com/)**[  
](https://workos.com/)• [turbopuffer](http://turbopuffer.com/pragmatic).** A vector and full-text search engine built on object storage. It’s fast, cheap, and extremely scalable. It’s never been better to try it out: last week, they dropped their base price from $64 per month to $16 per month. [Give it a spin now](http://turbopuffer.com/pragmatic).

Few have made as big an impact on software engineering as this week’s guest on the Pragmatic Engineer podcast, Kent Beck. He created Extreme Programming, pioneered test-driven development (TDD), co-created JUnit, and is one of the authors of the famous ‘Agile Manifesto’. But these days, he’s re-examining many ideas for the age of AI, and says we’re failing to accumulate trust during this new era at the same high rate as new code is being accumulated.

Longtime readers will remember how Kent and I bonded over our co-authored article in our [response to McKinsey on measuring engineering productivity](https://newsletter.pragmaticengineer.com/p/measuring-developer-productivity), and Kent was on the podcast a year ago, talking [about TDD and AI.](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)

[

![](https://substackcdn.com/image/fetch/$s_!tWh5!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F609eb4ad-7a79-4bdd-958b-a7e01d9a062f_2048x1349.png)

](https://substackcdn.com/image/fetch/$s_!tWh5!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F609eb4ad-7a79-4bdd-958b-a7e01d9a062f_2048x1349.png)

_With Kent Beck, in the studio_

**Today’s episode is the previously untold story of Kent’s remarkable career and how he became the industry legend he is today.** We start with Kent’s journey from discovering Smalltalk in the early days of personal computing, to helping define modern software engineering practices. We explore the origins of TDD, design patterns, Extreme Programming, and Agile – along with some lessons learned at Apple and Facebook.

Kent explains why he believes software engineering is about _far more_ than writing code, why no one yet knows exactly how engineers should work alongside AI agents, and how his “explore, expand, extract” framework can help engineers navigate major technology shifts.

Here are 12 rarely-told stories and observations from Kent:

**1\. Coding is only a small part of software engineering – the rest can’t be automated.** Kent rebuts the claim that coding – and eventually the whole software engineering craft – will vanish. He believes coding is only part of what we do, and a small part of it, too. Through your work, you also build confidence, make connections with other people, and develop your personal understanding of the domain. This will remain important, even if we develop our skills in other areas than coding.

**2\. Lesser-known story: fired by Apple.** Kent joined the tech giant in 1987, drawn in by Smalltalk, whose language was taking off at the time. Xerox had handed the language to a few companies to see who could run with it, and Apple was one. But Apple’s customers wanted C and Pascal compilers instead, so the Smalltalk project went nowhere. Kent joined a team building a programming language for kids, but says he was eventually fired because he was in “punk mode” and wanted to do things his own way, instead of being a team player.

**3\. Kent used to keep a thesaurus close at hand.** When working at Tektronix in the late 1980s with [Ward Cunningham](https://en.wikipedia.org/wiki/Ward_Cunningham) (the creator of the first wiki, and a pioneer in design patterns), they built HotDraw, a graphical editor with a boxes-and-arrows model. For naming core abstractions, Beck chose “drawing object,” “drawing handle,” etc. But Ward cared intensely about nomenclature and hunted for better vocabulary, so they kept a physical thesaurus which was well thumbed. Beck recalls they became pretty obsessed about the names of things.

**4\. TDD wasn’t ‘invented’ so much as ‘rediscovered’ by Kent.** As a kid, Kent read one of his father’s programming books from the tape-to-tape era, when an input tape like time cards was fed through a payroll program to produce an output tape, such as one with checks. The book’s advice was to take a real input tape and manually type the expected output tape before writing the program. He read this, didn’t understand it, and forgot about it.

Years later, Kent built SUnit, a small testing framework, and randomly remembered the input-tape trick, so mapped it onto SUnit. If he followed the pattern, he’d write the test before the code. He laughed out loud at this because it seemed like such a stupid idea: why write a test that’s guaranteed to fail, when the classes and methods aren’t even defined yet? But when he did, he found his anxiety about programming vanished. This is when he became a TDD convert.

**5\. Kent invented Extreme Programming (XP) while on the Chrysler payroll project.** Kent threw away a codebase that didn’t work and restarted the project with a new methodology. He paired with others, and used his own ideas for testing. Later, he coined the new methodology’s name by deliberately picking one that he knew would be unpopular with the tech establishment of the day: “extreme programming” was born.

**6\. The Agile Manifesto came together in a messy way.** In 2001, a loose group of folks who rejected waterfall development gathered at Snowbird, Utah, to rethink programming. Kent recalls this summit proceeded badly as everyone pushed contradictory ideas. During a break, Martin Fowler and Jim Highsmith stayed behind, and when the others returned, they found the values written on the whiteboard. Kent’s contribution was the word “daily”: “Business people and developers must work together daily throughout the project.”

**7\. Calling it “agile” was an error.** Kent objected to the word “agile” at the time, and still does today, since nobody claims they prefer “rigid” development, and everyone says they’re “agile”, even when they’re not. He would’ve preferred a less spacious term, like with “extreme programming”: after all, it’s hard to call yourself an “extreme programmer” without actually following that methodology.

**8\. The Dotcom Bust hit very hard.** The day before the 9/11 terror attack in 2001, Kent had eight months of consulting work booked at top rates and was finishing work on a house in rural Oregon. The next day, everything was canceled, just as big bills fell due. He burned out into depression and was left unable to program for years, in what was a “lost decade.”

**9\. At 50, Kent joined Facebook and realized nobody cared about testing or TDD.** At Facebook, Kent found a company that barely did any form of unit testing, while running a massive, stable, and fast-growing site. He signed up to teach a TDD class at a hackathon — he wrote the book, after all! The classes either side of his in the schedule both filled up, but the TDD class got zero signups, not even a pity one. He made the decision to forget everything he knew and to relearn software engineering as it was at Facebook. In the end, he stayed seven years.

**10\. Building software products has three phases: explore, expand, extract**. This is Kent’s “3X” model. ‘Explore’ means trying many cheap uncorrelated experiments, ‘expand’ involves focusing on the one thing that’s working and overcoming obstacle after obstacle, while ‘extract’ is a repeatable playbook and economies of scale. How you code, hire, and organize differs across each phase.

**11\. Kent has always been an anxious programmer.** He describes himself as chronically anxious because the more complex the code is, the more he knows it could break. This was the fuel behind testing and TDD, which are approaches designed to soothe an anxious mind.

**12\. Kent sees himself as a “tree shaker, not a jelly maker.”** He starts things like patterns, SUnit, JUnit, TDD, XP, 3X, then pushes them until they take off, before moving on to the next thing. It’s his defining trait, and may explain his enormous output, and also why he abandoned TDD just as it peaked.

**+1:** **The human part is the most important one in software engineering.** As Kent explained:

> “This is the biggest cosmic, practical joke ever. As young people, we were promised: “Okay, here’s this computer and once you’ve completely understand this computer, you’ll be fine. That’s all you need to do.”
> 
> So I set out the first part of my career just to become the best programmer that I could be because that’s what it would take to be successful. And then you realize: sorry, there’s this whole human side. Your ability to affect change in the world is gated by your ability to communicate with, to soothe, to understand other human beings. And those are exactly the skills that I thought I didn’t need to learn!
> 
> So I was promised: just understand the computer and you’ll be successful. And then someone went “just kidding, understand people!” And now I was in a position of being ten years behind.”

-   [Measuring developer productivity? A response to McKinsey](https://newsletter.pragmaticengineer.com/p/measuring-developer-productivity) – co-written with Kent Beck
    
-   [TDD, AI agents and coding with Kent Beck](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)
    
-   [Paying down tech debt](https://newsletter.pragmaticengineer.com/p/paying-down-tech-debt)
    
-   [The past and future of modern backend practices](https://newsletter.pragmaticengineer.com/p/the-past-and-future-of-backend-practices)
    

[00:00](https://www.youtube.com/watch?v=ddHQQtjIOpw) Intro

[03:47](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=227s) Human engineers aren’t going away

[08:00](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=480s) Kent’s path into tech

[13:50](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=830s) Undergraduate and graduate studies

[17:21](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=1041s) Kent’s first programming job

[18:54](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=1134s) The rise and fall of Smalltalk

[27:04](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=1624s) Working with Ward Cunningham

[37:36](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=2256s) Design patterns

[44:05](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=2645s) Working at Apple

[51:08](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=3068s) CRC Cards

[59:29](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=3569s) Testing tools in the language

[1:04:22](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=3862s) The C3 project with Martin Fowler

[1:09:54](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=4194s) Extreme Programming

[1:16:25](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=4585s) Developing TDD

[1:25:07](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=5107s) Writing the Agile Manifesto

[1:30:00](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=5400s) Agile’s impact

[1:32:40](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=5560s) Agile’s downside

[1:37:32](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=5852s) The Dotcom Bust

[1:44:30](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=6270s) Lessons from working at Facebook

[1:59:44](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=7184s) Kent’s ‘Good to Great’ program at Facebook

[2:06:07](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=7567s) Soft skills engineers need to learn

[2:09:30](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=7770s) AI and the challenges of acceleration

[2:15:53](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=8153s) Explore, expand, extract

[2:22:33](https://www.youtube.com/watch?v=ddHQQtjIOpw&t=8553s) What Kent is excited about

**Where to find Kent Beck:**

• X: [https://x.com/kentbeck](https://x.com/kentbeck)

• LinkedIn: [https://www.linkedin.com/in/kentbeck](https://www.linkedin.com/in/kentbeck/)

• Website: [https://kentbeck.com](https://kentbeck.com/)

• GitHub: [https://github.com/kentbeck](https://github.com/kentbeck)

• Newsletter:

**Mentions during the episode:**

• TDD, AI agents and coding with Kent Beck: [https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)

• Anthropic CEO Predicts AI Will End Coding and Software Engineering:

[

![X avatar for @GergelyOrosz](https://substackcdn.com/image/fetch/$s_!iuo8!,w_40,h_40,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F673095429748350976%2Fei5eeouV.png)

Gergely Orosz@GergelyOrosz

The only people who believe any of this are non-coders. I tried to build a game (an area I’m an n00b in.) The results are amusingly disastrous - I never before coded a decent game. But I’ll crack out backend services w AI rapidly - because I coded dozens of them before…

![X avatar for @aiedge_](https://substackcdn.com/image/fetch/$s_!lOzC!,w_20,h_20,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fpbs.substack.com%2Fprofile_images%2F1910271186442846208%2FvrYKSYRn.jpg)

AI Edge @aiedge\_

Anthropic CEO (Dario Amodei): "Coding is going away first, then all of software engineering." What do you think about this?

5:29 PM · Apr 26, 2026 · 792K Views

345 Replies · 493 Reposts · 6.71K Likes





](https://x.com/GergelyOrosz/status/2048454331645481034)

• _Extreme Programming Explained: Embrace Change_: [https://www.amazon.com/Extreme-Programming-Explained-Embrace-Change/dp/0321278658](https://www.amazon.com/Extreme-Programming-Explained-Embrace-Change/dp/0321278658)

• _Tidy First?: A Personal Exercise in Empirical Software Design_: [https://www.amazon.com/Tidy-First-Personal-Exercise-Empirical/dp/1098151240](https://www.amazon.com/Tidy-First-Personal-Exercise-Empirical/dp/1098151240)

• _Test Driven Development: By Example_: [https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530](https://www.amazon.com/Test-Driven-Development-Kent-Beck/dp/0321146530)

• Tektronics: [https://www.tek.com/](https://www.tek.com/)

• Ward Cunningham on LinkedIn: [https://www.linkedin.com/in/wardcunningham](https://www.linkedin.com/in/wardcunningham)

• Design Principles Behind Smalltalk: [https://www.cs.virginia.edu/~evans/cs655/readings/smalltalk.html](https://www.cs.virginia.edu/~evans/cs655/readings/smalltalk.html)

• Kotlin: [https://kotlinlang.org](https://kotlinlang.org/)

• Swift: [https://www.swift.org](https://www.swift.org/)

• Prolog: [https://en.wikipedia.org/wiki/Prolog](https://en.wikipedia.org/wiki/Prolog)

• The Timeless Way of Building: [https://www.amazon.com/Timeless-Way-Building-Christopher-Alexander/dp/0195024028](https://www.amazon.com/Timeless-Way-Building-Christopher-Alexander/dp/0195024028)

• Notes on the Synthesis of Form: [https://www.amazon.com/Notes-Synthesis-Form-Harvard-Paperbacks/dp/0674627512](https://www.amazon.com/Notes-Synthesis-Form-Harvard-Paperbacks/dp/0674627512)

• Larry Tesler: [https://en.wikipedia.org/wiki/Larry\_Tesler](https://en.wikipedia.org/wiki/Larry_Tesler)

• PARC: [https://en.wikipedia.org/wiki/PARC\_(company)](https://en.wikipedia.org/wiki/PARC_\(company\))

• August 1981 issue of Byte featuring Smalltalk: [https://vintageapple.org/byte/pdf/198108\_Byte\_Magazine\_Vol\_06-08\_Smalltalk.pdf](https://vintageapple.org/byte/pdf/198108_Byte_Magazine_Vol_06-08_Smalltalk.pdf)

• Class-responsibility-collaboration (CRC) cards: [https://en.wikipedia.org/wiki/Class-responsibility-collaboration\_card](https://en.wikipedia.org/wiki/Class-responsibility-collaboration_card)

• MasPar: [https://en.wikipedia.org/wiki/MasPar](https://en.wikipedia.org/wiki/MasPar)

• Cray: [https://en.wikipedia.org/wiki/Cray](https://en.wikipedia.org/wiki/Cray)

• JUnit: [https://en.wikipedia.org/wiki/JUnit](https://en.wikipedia.org/wiki/JUnit)

• Erich Gamma: [https://en.wikipedia.org/wiki/Erich\_Gamma](https://en.wikipedia.org/wiki/Erich_Gamma)

• OOPSLA: [https://en.wikipedia.org/wiki/OOPSLA](https://en.wikipedia.org/wiki/OOPSLA)

• C3: [https://www.martinfowler.com/bliki/C3.html](https://www.martinfowler.com/bliki/C3.html)

• How AI will change software engineering – with Martin Fowler: [https://newsletter.pragmaticengineer.com/p/martin-fowler](https://newsletter.pragmaticengineer.com/p/martin-fowler)

• Cycles of disruption in the tech industry: with software pioneers Kent Beck & Martin Fowler: [https://newsletter.pragmaticengineer.com/p/cycles-of-disruption-in-the-tech](https://newsletter.pragmaticengineer.com/p/cycles-of-disruption-in-the-tech)

• The third golden age of software engineering – thanks to AI, with Grady Booch: [https://newsletter.pragmaticengineer.com/p/the-third-golden-age-of-software](https://newsletter.pragmaticengineer.com/p/the-third-golden-age-of-software)

• Ivar Jacobson’s website: [https://www.ivarjacobson.com](https://www.ivarjacobson.com/)

• James Rumbaugh: [https://en.wikipedia.org/wiki/James\_Rumbaugh](https://en.wikipedia.org/wiki/James_Rumbaugh)

• Ron Jeffries’ website: [https://ronjeffries.com](https://ronjeffries.com/)

• The Agile Manifesto: [https://agilealliance.org/agile101/the-agile-manifesto](https://agilealliance.org/agile101/the-agile-manifesto)

• Jim Highsmith on LinkedIn: [https://www.linkedin.com/in/jhighsmith](https://www.linkedin.com/in/jhighsmith)

• Gusto: [https://gusto.com](https://gusto.com/)

—

Production and marketing by [Pen Name](https://penname.co/).