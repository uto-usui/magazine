---
title: "AI has torched the market for junior programmers"
source: "https://seldo.com/posts/ai-has-torched-the-market-for-junior-programmers/"
publishedDate: "2026-07-10"
category: "design"
feedName: "Sidebar"
---

In early 2025 I predicted that [AI will create many, many more programmers](https://seldo.com/posts/ai-effect-on-programming-jobs/), and that new programming jobs would look different. In March I checked in and found startups [substituting compute for labor at record rates](https://seldo.com/posts/do-ai-enabled-companies-need-fewer-people/), with the wave of new jobs nowhere in sight. This post is the next check-in, and I have good news and bad news.

The bad news: AI has torched the market for junior programmers. The good news: the long tail of new programmers I predicted **has** materialized, but with a big twist: **they don't call themselves programmers**. Let me show you the data, and see if you believe me.

## The market for young programmers has collapsed

Here's the single most important chart about AI and programming jobs, built from ADP payroll data by Stanford's Digital Economy Lab. It tracks employment of US software developers by age, indexed to October 2022:

![Chart: US software developer employment by age, ADP payroll data indexed to October 2022. Ages 22-25 fall 19% from peak while ages 41-49 rise 14%.](https://seldo.com/uploads/2026/1%20the%20torching.png)

Developers aged 22 to 25 are down 19% from their late-2022 peak. Every cohort over 30 grew over the same period, with 41-to-49-year-olds up 14%. This isn't a firm-level fluke: after controlling for shocks at the individual company level, the Stanford team still finds a 16% relative employment decline for young workers in AI-exposed jobs, and the decline concentrates specifically in occupations where AI _automates_ work rather than augments it. Software development is just the poster child.

Other data points in the same direction. Entry-level software postings are down 28% from their 2022 peaks. Computer science graduates now have a 6.1% unemployment rate, higher than liberal arts majors, a sentence that would have gotten you laughed out of any career counseling office in 2019.

One detail worth noticing in that chart: the junior line doesn't fall off a cliff when ChatGPT launches. It peaks a couple of months before, drifts down through 2023, and then deteriorates fastest in 2024 and early 2025, which is when coding assistants stopped autocompleting lines and started completing tickets. Agentic programming is what really turned up the heat, not ChatGPT.

There are other suspects, of course. The same period saw the ZIRP unwind, the Section 174 tax change, and a post-pandemic hiring correction, and only about 4.5% of 2025's announced layoffs were actually attributed to AI by the companies doing the laying off. But the Stanford results survive controls for firm-level shocks and interest rate exposure, and none of those confounders explains why the damage is so precisely concentrated among 22-to-25-year-olds in AI-automatable occupations while their 40-year-old colleagues thrive. With ageism in tech being alive and well you would certainly have expected the opposite if the market were just tough for programmers in general.

## And yet nothing else is down

Further evidence that this is specifically about programming jobs comes if you look at the wider economy, and in fact even if you look at only "computer jobs" without specifying **programming** specifically.

Total US employment grew 0.8% from May 2024 to May 2025. Computer and mathematical occupations grew 1.3%, faster than the economy. The count of employed software developers, per the BLS, went from 1.53 million in May 2022 to 1.69 million in May 2025, up 10% right through the AI era. Careful studies in the US, Denmark, and by Anthropic itself find no relationship between AI exposure and aggregate employment; the Danish study, using government payroll records, can rule out effects bigger than about 1%.

How can both things be true? Weight the age bands by their share of the workforce and you get your answer:

![Chart: the same employment data with age bands weighted by workforce share. Total developer employment rises 4.4% while the 22-25 band falls 19%.](https://seldo.com/uploads/2026/2%20the%20average.png)

Total developer employment is up 4.4% since October 2022. Juniors (here defined by age rather than experience, a big caveat) are only about 8% of the developer workforce, so a catastrophe for them barely moves the average. Even if you double what percentage of the workforce you think they are, the aggregate stays positive. This is why every study that looks at averages finds nothing and every study that looks at juniors finds carnage. They’re looking at different parts of the same data.

## The title is dying, not the work

It gets more interesting when you look at _which_ job titles are shrinking. Same BLS data, May 2024 to May 2025:

![Chart: US employment change by occupation, May 2024 to May 2025. Computer programmers down 16%, web developers down 11%, QA testers down 6.5%, while data scientists rise 12% and systems analysts rise 4.4%.](https://seldo.com/uploads/2026/3%20the%20titles.png)

The occupation "computer programmer," the BLS category for people who write code to someone else's specification, fell 16% in a single year. The BLS had projected that occupation to decline 6% _per decade_. My people, the web developers, fell 11%, and QA testers 6.5%. Meanwhile data scientists grew 12%, systems analysts 4.4%, and the broad "software developer" category grew 2%.

The jobs disappearing are the ones where the work product is code written to spec. The jobs growing are the ones where the work product is judgment about what code should exist. AI is eating a very specific kind of programming job.

## The long tail showed up. It just doesn't have the job title.

Back in 2025 I wrote that AI is a new abstraction layer, and like every abstraction layer before it, it would create vastly more developers building vastly more software. I also wrote that we should call these new people "software developers," because giving them some other name would create gatekeeping where none needs to exist.

I believe I was right -- a huge new body of developers has turned up. But **they don't use that title.**

The software boom is real and it is measurable. GitHub added 36 million new accounts in the last Octoverse year, its fastest growth ever, more than one new developer per second, and 121 million new repositories, the biggest year for repository creation in the platform's history, and that’s shown up as their infrastructure creaking at the joints. Eighty percent of those new arrivals used Copilot within their first week. The single biggest developer influx ever recorded arrived AI-native, at exactly the moment paid junior hiring collapsed.

My favorite evidence is the App Store, because publishing an iOS app is a costly, gated act: a $99 developer fee, a review process, a working binary. It measures shipped software, not tutorials.

![Chart: new iOS App Store submissions per year. An eight-year decline from the 2016 peak reverses in 2025 with 24% growth.](https://seldo.com/uploads/2026/4%20the%20app%20store.png)

New App Store submissions declined for eight consecutive years after peaking in 2016. In 2025 they grew 24%, the first real growth since the peak, and in Q1 2026 iOS submissions were up 80% year over year. The surge is so large that Apple's review times have stretched from two days to weeks. And the category mix shifted toward productivity, utilities, and lifestyle apps, which is exactly what you'd expect from first-timers solving their own problems rather than studios chasing game revenue.

Who are these people? According to Vercel, 63% of vibe-coding users are non-developers. Lovable says 60% of its users are “non-developers”, and its users create over 100,000 new projects every day. Replit claims 50 million people have used its platform. These are marketers, founders, teachers, analysts, and product managers, and they are writing software, which in my book makes them developers. They just don't identify that way, and more importantly it's not their job title, and job titles are what labor statistics count.

So the long tail of new developers materialized, on schedule and at scale. But it materialized as a _capability_ spreading through every job title instead of as headcount in one job title. A marketing manager who vibe-codes her own attribution dashboard shows up in the BLS data as a marketing manager. The market that collapsed is the market for the credential. The activity is booming.

## Where does the next generation of senior devs come from?

So my 2025 prediction scores as: right about the developers, wrong about the title. Which sounds like a happy ending until you ask what happens next.

The career on-ramp for professional software engineers used to work like this: you got hired to write mediocre code, a senior engineer reviewed it, you slowly absorbed judgment through repetition and correction, and a decade later you were the senior engineer. That chain is now broken. AI now writes the mediocre code, so nobody hires the junior developer, so nobody is in the queue to become the senior who reviews things.

Meanwhile millions of new builders are shipping with no one reviewing anything. A Veracode study found 45% of AI-generated code fails basic OWASP security tests. An audit of vibe-coded apps found 10% with critical row-level security flaws exposing user data. Apple is drowning in submissions it can't review fast enough. The software is getting built. The judgment layer is not keeping up with it, and the mechanism that used to build it, apprenticeship inside employment, has collapsed.

There are a few promising green shoots in the scorched landscape for junior devs. IBM is tripling entry-level hiring on the theory that AI-equipped juniors can do formerly senior work, redesigning the junior role around customer contact and specification rather than typing. But on the other hand, Salesforce hired zero engineers last fiscal year. Those are the two candidate futures, and which one wins determines whether the profession has senior developers in 2036.

## Is a turnaround already happening?

One logical outcome of a market that doesn’t hire junior developers is that we would start feeling the pain and correct ourselves. That maybe, maybe is already happening. Indeed's postings data actually bottomed in May 2025 and has risen for thirteen straight months, up 10% year over year.

![Chart: US software development job postings on Indeed, February 2020 = 100. Postings peak in early 2022, bottom in May 2025 at 62, and rise for 13 months to 72.](https://seldo.com/uploads/2026/5%20the%20turnaround.png)

If the 22-to-25 employment line turns upwards in Stanford's next update, it may be that the market has found a new equilibrium. Look for other major employers ramping up programs like IBM’s. If we don’t see them, we are going to have to create them, or this whole boom in software creation will turn to bust.

## We have to rebuild the ladder

We are not watching the death of programming. We are watching programming stop being a job title and become a capability, the same way "typist" stopped being a job title when it became a thing everyone was expected to know. That transition is going fine for everyone except the people who were about to start climbing the old ladder when we set it on fire. They're the ones we owe a new ladder, and if we don’t build it for them, we will also feel the pain.

* * *

**Sources**

-   Brynjolfsson, Chandar & Chen, ["Canaries in the Coal Mine?"](https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/), Stanford Digital Economy Lab, Nov 2025 (age series digitized from Figure 1)
-   [BLS Occupational Employment and Wage Statistics](https://www.bls.gov/oes/tables.htm), national files, May 2022 through May 2025
-   [Indeed Hiring Lab job postings tracker](https://github.com/hiring-lab/job_postings_tracker) (raw data, through June 2026)
-   [GitHub Octoverse 2025](https://github.blog/news-insights/octoverse/octoverse-a-new-developer-joins-github-every-second-as-ai-leads-typescript-to-1/)
-   Appfigures, App Store release data: [2025 annual](https://appfigures.com/resources/insights/20251205) and [Q1 2026 via TechCrunch](https://techcrunch.com/2026/04/18/the-app-store-is-booming-again-and-ai-may-be-why/)
-   Yale Budget Lab, ["Evaluating the Impact of AI on the Labor Market"](https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs) (rolling updates)
-   Humlum & Vestergaard, ["Large Language Models, Small Labor Market Effects"](https://www.nber.org/papers/w33777), NBER Working Paper 33777, 2025
-   Anthropic, ["Labor market impacts of AI"](https://www.anthropic.com/research/labor-market-impacts), 2026
-   Vercel, Lovable, and Replit user-composition disclosures, compiled by [Hostinger](https://www.hostinger.com/blog/vibe-coding-statistics) and [Panto](https://www.getpanto.ai/blog/lovable-statistics); Lovable security audit figures via [Taskade's State of Vibe Coding](https://www.taskade.com/blog/state-of-vibe-coding)
-   Veracode, [2025 GenAI Code Security Report](https://www.veracode.com/resources/analyst-reports/2025-genai-code-security-report/)
-   Federal Reserve Bank of New York, ["The Labor Market for Recent College Graduates"](https://www.newyorkfed.org/research/college-labor-market); CS-grad unemployment discussion via [Stack Overflow blog](https://stackoverflow.blog/2025/12/26/ai-vs-gen-z/)
-   Oxford Economics / Challenger, Gray & Christmas layoff attribution data, [via Fortune](https://fortune.com/2026/02/02/ai-labor-market-yale-budget-lab-ai-washing/)
-   IBM entry-level hiring and Salesforce engineering freeze, [via CNN Business](https://www.cnn.com/2026/04/08/tech/ai-software-developer-jobs)
-   Age-band weights derived from ACS PUMS 2024 via [Data USA](https://datausa.io/profile/soc/software-developers); methodology and full data [are available](https://seldo.com/uploads/2026/k-shaped-dev-market-data.zip)