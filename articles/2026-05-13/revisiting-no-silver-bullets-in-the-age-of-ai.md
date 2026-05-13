---
title: "Revisiting “No Silver Bullets” in the age of AI"
source: "https://newsletter.pragmaticengineer.com/p/revisiting-no-silver-bullets-in-the"
publishedDate: "2026-05-12"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

_Before we start, some news: my tech compensation site focused on tech total compensation (TC) in Europe, [TechPays has been acquired by Levels.fyi](https://blog.pragmaticengineer.com/techpays-has-been-acquired-levels-fyi/)! TechPays was a project I’ve been building on the side with engineering manager [Zsombor Erdődy-Nagy](https://www.linkedin.com/in/rzsombor/) for a few years, and both of us are pleased that the site found a new and welcoming home. [Read more.](https://blog.pragmaticengineer.com/techpays-has-been-acquired-levels-fyi/)_

Four decades ago, the writer of ‘_The Mythical Man-Month’_ (1975), drew on folklore about werewolves to publish a paper about the prospects of a so-called _silver bullet_ for software development that would make professionals much more productive at their craft.

[

![](https://substackcdn.com/image/fetch/$s_!fo1L!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11e17bb3-f81c-4b30-930b-202e336226a6_800x510.png)

](https://substackcdn.com/image/fetch/$s_!fo1L!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F11e17bb3-f81c-4b30-930b-202e336226a6_800x510.png)

_The Werewolf of Eschenbach, Germany, line engraving, 1685. This image appears in the “No Silver Bullets” chapter of Mythical Man-Month (1995)_

Frederick P. Brooks published _“No Silver Bullet – Essence and Accident in Software Engineering”_ in 1986, and as the title suggests, it is pessimistic about the existence of any silver bullets. The term refers to a super weapon capable of dropping otherwise near-unstoppable werewolves and other creepy supernatural beings in European folk tales.

Since its release, this paper might have become even better-known than Mythical Man-Month (MMM). In 1995, the second edition of that book included Brooks’ later essay as chapter 17, along with an additional chapter of reflections.

In this article, we look into whether the essay was correct in its disbelief in silver bullets, or whether any did indeed slay the beast of unproductivity for developers over the course of time. Also, how does AI agents generating so much code, as of today, challenge the entire premise – or not?

We cover:

1.  **“No silver bullets” – why has it held up?** No single new technology or methodological breakthrough by itself introduced magnitudes-of-improvement to the areas that really matter in software engineering. Is that unusual?
    
2.  **Is SRE a silver bullet?** Google’s Search team introduced the SRE discipline, and won orders-of-magnitude superior reliability to its competitors. But why only Google Search?
    
3.  **Was open source + GitHub a silent silver bullet?** No development had a bigger impact on the wider tech industry than the open source wave since the 2010s. Has it been a silent silver bullet, an overlooked cause?
    
4.  **Could AI be a silver bullet?** At first glance, AI generates 100x-or-more code output. But productivity, reliability, and simplicity improvements are a bit unimpressive – at least for now.
    

Brooks was a computer scientist who led IBM’s System/360 and OS/360 operating systems development, _‘The Mythical Man-Month’_ was published in 1975. Last year, we did a deepdive into this engineering classic ([Part 1](https://newsletter.pragmaticengineer.com/p/what-changed-in-50-years-of-computing), [Part 2](https://newsletter.pragmaticengineer.com/p/what-changed-in-50-years-of-computing-8d0), [Part 3](https://newsletter.pragmaticengineer.com/p/mythical-man-month-part-3), [Part 4](https://newsletter.pragmaticengineer.com/p/mythical-man-month-part-4)), delving into its predictions and legacy.

The paper delves into folklore for its motif, a ‘silver bullet,’ and uses it to pose the question of whether there would be any “silver bullets” on the horizon (in 1986) that could be similarly fatal to software engineering complexity. From the [paper](https://www.cs.unc.edu/techreports/86-020.pdf) (emphasis mine:)

> “Of all the monsters who fill the nightmares of our folklore, none terrify more than werewolves, because they transform unexpectedly from the familiar into horrors. For these, one seeks bullets of silver that can magically lay them to rest.
> 
> The familiar software project has something of this character (at least as seen by the non-technical manager), usually innocent and straightforward, but capable of becoming a monster of missed schedules, blown budgets, and flawed products. So, we hear desperate cries for a silver bullet, something to make software costs drop as rapidly as computer hardware costs do.
> 
> But, as we look to the horizon of a decade hence, we see no silver bullet. **There is no single development, in either technology or management technique, which by itself promises even one order of magnitude improvement in productivity, in reliability, in simplicity**.
> 
> Skepticism is not pessimism, however. Although we see no startling breakthroughs, and indeed, believe such to be inconsistent with the nature of software, many encouraging innovations are under way. A disciplined, consistent effort to develop, propagate, and exploit them should indeed yield an order-of-magnitude improvement. There is no royal road, but there is a road.
> 
> The first step toward the management of disease was replacement of demon theories and humor theories by the germ theory. That very step, the beginning of hope, in itself dashed all hopes of magical solutions. It told workers that progress would be made stepwise, at great effort, and that a persistent, unremitting care would have to be paid to a discipline of cleanliness. So it is with software engineering today.”

In 1995, Brooks revisited his idea that silver bullets weren’t real in the software domain. From the _Mythical Man-Month’s_ anniversary edition:

> “No Silver Bullet” asserts and argues that no single software engineering development will produce an order-of-magnitude improvement in programming productivity within ten years (from the paper’s publication in 1986). We are now nine years into that decade, so it is timely to see how this prediction is holding up.
> 
> Whereas The Mythical Man-Month generated many citations but little argument, “No Silver Bullet” has occasioned rebuttal papers, letters to journal editors, and letters and essays that continue to this day.
> 
> Most of these attack the central argument that there is no magical solution, and my clear opinion that there cannot be one. Most agree with most of the arguments in “NSB,” but then go on to assert that there is indeed a silver bullet for the software beast, which the author has invented. As I reread the early responses today, I can’t help noticing that the nostrums pushed so vigorously in 1986 and 1987 have not had the dramatic effects claimed.”

Brooks re-concluded that there had been no technological breakthroughs of the type postulated in NSB.

**But motivation can also have silver bullet-like effects** and always has had, he found via more research into scientific evidence that motivation _can_ boost productivity. In his own words:

> “Since “NSB,” Bruce Blum has drawn my attention to the 1959 work of Herzberg, Mausner, and Sayderman.
> 
> They find that motivational factors can increase productivity. On the other hand, environmental and accidental factors, no matter how positive, cannot; but these factors can decrease productivity when negative. “NSB” argues that much software progress has been the removal of such negative factors: stunningly awkward machine languages, batch processing with long turnaround times, poor tools, and severe memory constraints.”

Today, it’s a long time since the mid-nineties; with the benefit of hindsight, were there any silver bullets flying between then and 2022, which fit the bill as slayers of unproductiveness? I suggest a few, below. _If you can name other silver bullets since the launch of Windows 95, please do so in the comments!_

-   **Version control:** (late 1990s.) CVS, Subversion, and later, Git. Version control allowed engineers to collaborate much more fluently, leading to more teamwork and – in some cases – less full-on solo labor.
    
-   **IDEs**: (early 2000s). Modern IDEs like Visual Studio, IntelliJS, and others make context-rich editing easy and fast. They also allow for faster, less error-prone refactoring and more efficient debugging.
    
-   **CI/CD and automated testing**: (mid-2000s). CI systems started to spread during the 2000s with the likes of CruiseControl (2000s) → Jenkins and SaaS CI solutions from the 2010s (e.g., Travis CI, CircleCI, GitLab CI, GitHub Actions).
    
-   **Open source and package managers**: (2010s). Open source has been around for decades, but GitHub’s rapid adoption made it easier to create and discover, coupled with package managers in the Node, Python, and other language ecosystems to build on top of open source solutions.
    
-   **StackOverflow:** (2010s). The popular programming Q&A site made it easier to get unstuck by finding solutions to common problems, with the capability to ask questions and get responses from the large user community within hours. By 2025, the site [was pretty much dead.](https://newsletter.pragmaticengineer.com/p/the-pulse-134)
    
-   **Cloud**: (early 2010s). AWS launched in 2006, then Azure and Google Cloud in 2008, and they went mainstream in the 2010s. Today, cloud is everywhere, and increasingly more infrastructure startups build on top of hyperscalers (the biggest public cloud platforms), such as Vercel / Netlify (platform-as-a-service), Supabase / Turbopuffer (databases) and others.
    
-   **Platform teams & DevEx teams**: (mid-2010s). Mid-sized and larger tech companies created dedicated platform teams to own infrastructure and internal platforms. In the 2020s, larger tech companies have created ‘Developer Experience’ teams to build better internal dev tools and workflows. _We previously covered [Uber’s program/platform split](https://newsletter.pragmaticengineer.com/p/program-platform-split-uber), and [Uber’s developer experience evolution](https://newsletter.pragmaticengineer.com/p/developer-experience-at-uber)._
    
-   **SRE**: the Site Reliability Engineer (SRE) profession grew during the 2010s, much influenced by Google.
    

These technologies increased developer efficiency and productivity, but none by itself was a productivity accelerator in isolation.

Obviously, by 2022 the craft of building software had developed greatly since ‘_No Silver Bullets’_ came out; and was more efficient, faster, and more collaborative than ever. One highly anecdotal way to identify this is via the disappearance of cake from some tech workplaces. Back in the day, cake was distributed at work for major product milestones being hit: the shipping of a new product was often marked with awards and tasty baked treats – at least on teams building browsers, like the IE and Firefox teams.

But by the 2010s, shipping frequency had increased by so much and was an everyday, unremarkable occurrence at some places, [according to](https://limpet.net/mbrubeck/2012/10/26/mozilla-ie10-cake.html) Matt Brubeck, a former engineer on the Firefox team:

> “Back when Firefox 2 was released (six years ago this week!), the Internet Explorer team started a friendly tradition of sending Mozilla a cake as congratulations. This continued for Firefox 3 and Firefox 4. After Firefox switched from major releases once or twice a year to incremental updates every six weeks, they sent us a cupcake for the next few updates instead. :)” _Mozilla engineer, Matt Brubeck_

[

![](https://substackcdn.com/image/fetch/$s_!IXA7!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7f525e98-c75e-4e3e-a5e1-5b7db3a6e5a5_1828x1354.png)

](https://substackcdn.com/image/fetch/$s_!IXA7!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7f525e98-c75e-4e3e-a5e1-5b7db3a6e5a5_1828x1354.png)

Fruits of success: Cake for Mozilla Firefox team in 2006 after shipping Firefox 1

Today, Firefox ships a stable version about once a month, as does Chrome. In this context, marking each release with more cake could inadvertently cause some health issues on the team – too much cake, that is! From this September, Chrome [will switch](https://developer.chrome.com/blog/chrome-two-week-release) to shipping every two weeks.

**Agile and Scrum is worth a mention**; not as a technology, but a methodology: Scrum encourages teams to move in smaller cycles and deliver more frequently, via sprints that typically range from a week to a month. In the early 2000s, this methodology spread quickly and brought efficiency improvements to many tech companies. However, by the early 2020s, many startups and some of Big Tech had moved on, as covered in [How Big Tech runs tech projects and the curious absence of Scrum](https://newsletter.pragmaticengineer.com/p/project-management-in-tech):

> “Scrum got in the way of shipping on a daily basis. The whole idea of Scrum revolves around Sprints, of committing to tasks at the beginning of the sprint, working on these during the sprint, and demoing what we did at the end.
> 
> The process felt unnatural and like it had been forced on a fast-moving web team. We soon moved to a more fluid way of working, taking the Kanban approach. We stopped caring about sprints, and dropped most rituals that come with Scrum. We just cared about knowing what we’re working on now, and what it was we’d get done next.”

Basically, Scrum worked and still does so for teams wanting to shorten shipping cadence from months to weeks. But for teams shipping daily, it often gets in the way.

**One area that improved significantly has been the pace of shipping incremental software.** In 1975, shipping software several times per day with elements like version control, CI/CD, feature flags and engineers being oncall, might have sounded far-fetched. Back then, software delivery was measured in months and years. In this way, we’ve perhaps made improvements overall in the regions of 10x to 100x over the years.

But that came via combinations of new tools like version control and CI/CD, new approaches & methodologies, and testing – and also from shifting constraints; for example, it’s now possible to revert backend changes rapidly, and code shipped in binaries can be controlled by feature flags in many cases.

Even so, improvements were mainly in iteration speed and not necessarily in the complexity of the software shipped. With all that progress, shipping complex and high-quality software still takes comparable time, often years, as 50 years ago. A prime example is the upcoming video game, Grand Theft Auto VI, probably by now the most highly-anticipated game ever, which is set to launch in November, after at least six years – and potentially 12 – of total development time:

-   Initial planning [started](https://thegameswiki.com/gta6/wiki/development-history) in 2014 (12 years of development)
    
-   Development [started](https://gamerant.com/gta-6-development-start-date-when/) in earnest in 2020 (circa six years of full-on development)
    
-   The studio, Rockstar, [confirmed](https://x.com/RockstarGames/status/1489617718009606150) development was underway in February 2022 (at least 4.5 years of full development)
    

[

![](https://substackcdn.com/image/fetch/$s_!HM_E!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1f94d3b7-70e6-4fac-a07d-7c4d315b5578_1100x350.png)

](https://substackcdn.com/image/fetch/$s_!HM_E!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1f94d3b7-70e6-4fac-a07d-7c4d315b5578_1100x350.png)

GTA VI: more ambitious but also slower

The video game development timeline is as long as it ever was, and even longer, as developers strive to meet players’ expectations on things like graphics, lighting, and physics. GTA 6 looks like being the most complex installment in the long-running series. So, perhaps there’s not been much change in software delivery timelines because when we have more capabilities to work with, the goals get more ambitious and the bar for “standout” software keeps rising.

Brooks’s definition of a silver bullet:

> “A single development, in either technology or management technique, which by itself promises even one order of magnitude improvement in productivity, in reliability, in simplicity.”

In simplicity and productivity terms, I struggle to name a single approach that delivered a 10x-or-more improvement by itself. But in the area of reliability, one company that has pioneered novel approaches since the 2000s is Google. Google.com is probably the single most reliable piece of internet software of all. In the last 15 years, Google Search has suffered a single outage, [on 8 August 2022](https://www.gadgets360.com/internet/news/google-search-maps-photos-drive-youtube-experiencing-outages-in-some-parts-of-the-world-3238156), which lasted around an hour. Otherwise, there have been no global outages (of course, there have been several [for other Google services](https://en.wikipedia.org/wiki/Google_services_outages#December_2020_services_outage)).

In 2003, Google created the ‘Site Reliability Engineering’ (SRE) role. SRE veteran, Dave O’Connor, [shared with us](https://newsletter.pragmaticengineer.com/p/reliability-engineering?):

> “The fervent belief of Google’s founders was that speed and reliability mattered more than features. This belief was coupled with the understanding that we couldn’t achieve it traditionally, which made it an existential issue. The level of investment in building out all layers of the serving stack was a case of “because we can”, but also “because we have to, as nowhere else does what we need”.
> 
> There was never a question of whether traditional ‘ops’ would work at Google. We needed a specialized role, staffed by folks familiar with the problem space and engineering methods required to make it work.
> 
> In 2003, the SRE role was born. Ben Treynor Sloss had been tasked with building Google’s “production team” and in his own words, he built “what happens when you ask a software engineer to design an operations team.” This turned into the birth of the SRE function at Google. From the outset, SRE was staffed in varying measures by systems/operations experts and software engineers. A large part of the remit of the team was to build the tools and practices required to operate Google’s fleet.”

Over time, the rest of the industry caught on to SRE and DevOps. From our [SRE deepdive](https://newsletter.pragmaticengineer.com/p/reliability-engineering):

> “Eventually, other companies caught onto the scaling issues, especially the hyperscalers. Each had their own approach, but over time, the notion grew industry-wide that making things reliable was a real-life engineering discipline, not simply ‘ops’.
> 
> This step saw a number of terms coined to describe this engineering, including ‘DevOps’. At its core, this was the notion that the disciplines and practices of reliability engineering should be ingrained into the overall engineering organization. At places other than Google, this mostly took the form of combined developer/operations roles (i.e. “you build it, you run it”), which differed from Google’s implementation, but the practices were similar.
> 
> Around this time, Google started opening up about SRE, eventually publishing the first SRE book, and follow ups. Conferences such as USENIX SRECon, Devops Days, and other movements have solidified reliability engineering as a discipline that scales well beyond Google. Indeed, the company has become a consumer of many state-of-the-art developments.”

**So, at Google Search, the SRE role could be described as a genuine silver bullet for the tech giant.** The company’s obsession with reliability helped it build what is probably the most reliable public-facing service of all. On the assumption that SRE plays a significant role in the approach, I would feel comfortable with calling SRE a silver bullet for Google Search.

SRE, as a concept, is commonplace across Google, but the reliability of its other services is not so impressive. For example, Google Cloud has had many outages, and Gmail also goes down every now and then. I’m sure that without SRE, reliability would be worse, but in general, Google services’ availability these days is probably a magnitude higher than the availability of most online services in the 2000s.

Similarly, GitHub has an SRE role but the service is [at zero nines of availability](https://newsletter.pragmaticengineer.com/p/the-pulse-github-breaks), partially explained by a 3.5x increase in load in two years. But in other ways, the zero nines is [likely self-inflicted.](https://blog.pragmaticengineer.com/the-pulse-ai-load-breaks-github/)

**This makes me wonder if the existence of silver bullets depends greatly on teams and individual contexts.** SRE seems like a good case to consider:

-   a “silver bullet” for Google Search
    
-   … but not for other Google services
    
-   … and definitely not for the broader industry
    

Could it be that when implemented in the right place, in the right way, and with the correct investment, then SRE – and an incredible focus on reliability – will yield a 10x-or-higher increase in reliability?

My hunch is that Google Search has such standout reliability not just because of SRE, but because Search might be the only organization in Google with reliability as a founding value, embedded in the team’s culture, with unmatched investments of time and money.

Google has published [several books](https://sre.google/books/) that explain their techniques and practices, but for other teams to get those results, they would need to invest similarly in reliability.

Perhaps there’s a silver bullet which is easily missed: open source. In [the first-ever Pragmatic Engineer Podcast episode](https://newsletter.pragmaticengineer.com/p/ai-tools-for-software-engineers-simon-willison), I asked software engineer Simon Willison what the biggest “productivity leaps” have been during his career. He [named](https://youtu.be/uRuLgar5XZw?si=YHz3z6En7ADv4DRu&t=2141) open source: