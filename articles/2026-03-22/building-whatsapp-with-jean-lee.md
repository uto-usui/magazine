---
title: "Building WhatsApp with Jean Lee"
source: "https://newsletter.pragmaticengineer.com/p/building-whatsapp-with-jean-lee"
publishedDate: "2026-03-18"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/5Kn32cIWPSY), [Spotify](https://open.spotify.com/episode/56bXJZveAm2QfPViN8FPuk), and [Apple](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id1769051199).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!Gh57!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

](https://substackcdn.com/image/fetch/$s_!Gh57!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

• **[Statsig](http://statsig.com/pragmatic)** – ⁠ The unified platform for flags, analytics, experiments, and more. Stop switching between different tools, and have them all in one place.

• **[Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer)** – The makers of SonarQube, the industry standard for automated code review. Sonar helps reduce outages, improve security, and lower risks associated with AI and agentic coding. [See how Sonar](https://www.sonarsource.com/pragmatic/) is empowering the Agent Centric Development Cycle with new products and capabilities that strengthen the guide, verify, and solve phases of development.

• **[WorkOS](https://workos.com/)** – Everything you need to make your app enterprise ready. Skip the rebuild for enterprise features. Keep shipping. Visit [WorkOS.com](http://workos.com/).

How did a tiny team of 30 engineers build the world-famous messaging app more than a decade ago, and what can dev teams learn from that feat today? [Jean Lee](http://linkedin.com/in/jeanklee) was engineer #19 at [WhatsApp](https://www.whatsapp.com/), joining when the company was still small, with almost no formal processes. She helped it scale to hundreds of millions of users, went through the $19B acquisition by Facebook, and later worked at Meta.

In this episode of _Pragmatic Engineer_, I talk with Jean about what it was like building WhatsApp. When Facebook bought WhatsApp in 2014, only around 30 engineers supported hundreds of millions of users across eight platforms.

We discuss how the founders kept things simple, saying “no” to most feature requests for years. Jean explains why WhatsApp chose Erlang for the backend, why the team avoided cross-platform abstractions, and how charging users $1 per year paid everyone’s salaries, while keeping growth intentionally slow.

Jean also shares what the Facebook acquisition was like on the inside, how she dealt with sudden personal wealth, and what it was like transitioning from an IC to a manager at Facebook – including the reality of calibration meetings and performance reviews.

We also discuss how AI enables smaller engineering teams, and why WhatsApp’s experience suggests ownership and trust might matter more than tools.

Ten takeaways from Jean that I find the most interesting:

**1\. WhatsApp built a billion-dollar business with a tiny team, and no AI tools.** WhatsApp served 450 million users with only 30 engineers, long before AI tools existed. Jean says: “I wonder if being able to move fast is independent from AI. When you’re small, you’re just more efficient.”

**2\. WhatsApp had no code reviews after in-place.** WhatsApp cofounder, Brian Acton, reviewed the very first pull request of each new hire, and after that, there were no more code reviews. Jean recounts how Brian reviewed her debut PR in extreme detail. This first (and only!) review set the bar high, and she wrote code to that standard from then on.

**3\. WhatsApp had close to zero formal processes**. WhatsApp had no Scrum, no Agile, no TDD (test driven development), and no formal code reviews beyond the first commit. In contrast, Skype had 1,000 engineers and mandatory Scrum training, but WhatsApp still outcompeted it and won. Jean’s response to hearing of all the formal processes Skype used in order to execute faster: “I’m surprised to hear they thought they were shipping faster because of it.” Perhaps process is often a substitute for trust, not quality?”

**4\. WhatsApp’s office had a countdown display showing days since the last outage.** When an outage happened, no emails were sent around, and no meetings were called. The number simply reset to zero. Avoiding outages was on everyone’s mind as a result. This is an example of how visible metrics can create accountability without bureaucracy.

**5\. WhatsApp delayed video calling for years, until it was extremely polished.** Contrary to the “launch early, then iterate” mantra, WhatsApp held features like video calling back. They also tested features extensively with family members before releasing anything publicly, as part of their refusal to launch something of less than top-notch quality.

**6\. Saying “no” to features was a competitive advantage.** WhatsApp’s CEO, Jan Koum, rejected 99% of feature requests from the team. While competitors shipped dozens of shiny, new features, WhatsApp ruthlessly prioritized reliability and simplicity. Jan repeatedly told the team what the mission was. “I want a grandma living in the countryside to be able to use our app”, he said.

**7\. WhatsApp’s team was older and more experienced than most startups at the time.** In 2014 when Facebook acquired WhatsApp, only four out of the 30 engineers were less than 30 years old. Perhaps part of the reason for WhatsApp’s stunning success was having an unusually experienced team from the start.

**8\. AI won’t replace the human touch in engineering management**. Jean sees areas such as OKR management, documentation, and performance data gathering as domains in which AI can take on most of the work. But she believes that understanding and unblocking engineers is best done person-to-person, not by AI.

**9\. Posting about your work on Meta’s “internal Facebook” site affects career growth there.** Jean noted that engineers at the social media giant who regularly posted about their launches and learnings enjoyed a sizable advantage in performance calibration reviews.

**10\. Jean’s advice to new grads: invest in the fundamentals.** “Tools come and go, languages come and go, but foundations don’t go anywhere,” she says.

-   [How Meta built Threads](https://newsletter.pragmaticengineer.com/p/building-the-threads-app)
    
-   [How Big Tech runs tech projects and the curious absence of Scrum](https://newsletter.pragmaticengineer.com/p/project-management-in-tech)
    
-   [Performance calibrations at tech companies](https://newsletter.pragmaticengineer.com/p/performance-calibrations)
    
-   [Software engineers leading projects](https://newsletter.pragmaticengineer.com/p/engineers-leading-projects-part-2)
    

([00:00](https://www.youtube.com/watch?v=5Kn32cIWPSY)) Intro

([01:39](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=99s)) Early years in tech

([06:18](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=378s)) Becoming engineer #19 at WhatsApp

([13:53](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=833s)) WhatsApp’s tech stack

([18:09](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=1089s)) WhatsApp’s unique ways of working

([25:27](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=1527s)) Countdown displays and outages

([27:07](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=1627s)) Why WhatsApp won

([28:53](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=1733s)) The Facebook acquisition

([33:13](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=1993s)) Life after acquisition

([39:27](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=2367s)) Working at Facebook in London

([44:07](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=2647s)) Transitioning to management

([47:27](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=2847s)) Performance reviews as a manager

([53:29](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=3209s)) After Facebook

([58:53](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=3533s)) AI’s impact on engineering

([1:02:34](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=3754s)) Jean’s advice to new grads and startups

([1:06:45](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=4005s)) Empowering employees

([1:08:17](https://www.youtube.com/watch?v=5Kn32cIWPSY&t=4097s)) Book recommendations

**Where to find Jean Lee:**

• Substack: [https://exaltitude.substack.com](https://exaltitude.substack.com/%20%20%E2%80%A2%20LinkedIn:%20https://www.linkedin.com/in/jeanklee%20%20%E2%80%A2%20YouTube:%20https://www.youtube.com/@exaltitude%20%20%E2%80%A2%20Website:%20https://www.exaltitude.io)

• LinkedIn: [https://www.linkedin.com/in/jeanklee](https://www.linkedin.com/in/jeanklee)

• YouTube: [https://www.youtube.com/@exaltitude](https://www.youtube.com/@exaltitude)

• Website: [https://www.exaltitude.io](https://www.exaltitude.io/)

**Mentions during the episode:**

• WhatsApp: [https://www.whatsapp.com](https://www.whatsapp.com/)

• KakaoTalk: [https://en.wikipedia.org/wiki/KakaoTalk](https://en.wikipedia.org/wiki/KakaoTalk)

• Jan Koum: [https://en.wikipedia.org/wiki/Jan\_Koum](https://en.wikipedia.org/wiki/Jan_Koum)

• Brian Acton on LinkedIn: [https://www.linkedin.com/in/brianacton](https://www.linkedin.com/in/brianacton)

• Yahoo: [https://www.yahoo.com](https://www.yahoo.com/)

• Sequoia: [https://sequoiacap.com](https://sequoiacap.com/)

• Cocktail Flow: [https://cocktailflow.com](https://cocktailflow.com/)

• KaiOS: [https://en.wikipedia.org/wiki/KaiOS](https://en.wikipedia.org/wiki/KaiOS)

• Erlang: [https://www.erlang.org](https://www.erlang.org/)

• Ericsson: [https://www.ericsson.com](https://www.ericsson.com/)

• Erlang Factory 2014 - That’s ‘Billion’ with a ‘B’: Scaling to the Next Level at WhatsApp:

• WeChat: [https://www.wechat.com](https://www.wechat.com/)

• Skype: [https://en.wikipedia.org/wiki/Skype](https://en.wikipedia.org/wiki/Skype)

• What is Scrum?: [https://www.scrum.org/resources/what-scrum-module](https://www.scrum.org/resources/what-scrum-module)

• Mark Zuckerberg: [https://en.wikipedia.org/wiki/Mark\_Zuckerberg](https://en.wikipedia.org/wiki/Mark_Zuckerberg)

• Wealthfront: [https://www.wealthfront.com](https://www.wealthfront.com/)

• A Random Walk Down Wall Street: The Best Investment Guide That Money Can Buy: [https://www.amazon.com/Random-Walk-Down-Wall-Street/dp/1324051132](https://www.amazon.com/Random-Walk-Down-Wall-Street/dp/1324051132)

• Surrounded by Idiots: The Four Types of Human Behavior and How to Effectively Communicate with Each in Business: [https://www.amazon.com/Surrounded-Idiots-Revised-Expanded-Effectively/dp/1250420458](https://www.amazon.com/Surrounded-Idiots-Revised-Expanded-Effectively/dp/1250420458)

• Performance Calibrations at Tech Companies: Part 1: [https://newsletter.pragmaticengineer.com/p/performance-calibrations](https://newsletter.pragmaticengineer.com/p/performance-calibrations)

• Performance Calibrations at Tech Companies: Part 2: [https://newsletter.pragmaticengineer.com/p/performance-calibrations-part-2](https://newsletter.pragmaticengineer.com/p/performance-calibrations-part-2)

• Anthropic: [https://www.anthropic.com](https://www.anthropic.com/)

• _What Color Is Your Parachute? for College: Pave Your Path from Major to Meaningful Work_: [https://www.amazon.com/What-Color-Your-Parachute-College/dp/1984857568](https://www.amazon.com/What-Color-Your-Parachute-College/dp/1984857568)

—

Production and marketing by [Pen Name](https://penname.co/).