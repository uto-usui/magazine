---
title: "Sapienz Receives ISSTA 2026 Impact Paper Award"
source: "https://engineering.fb.com/2026/10/15/developer-tools/sapienz-issta-2026-impact-paper-award-meta/"
publishedDate: "2026-10-15"
category: "engineering"
feedName: "Meta Engineering"
---

Ke Mao, Mark Harman, and Yue Jia have been recognized with the ACM SIGSOFT International Symposium on Software Testing and Analysis **(****ISSTA) 2026** [Most Influential Paper Award](https://www.issta.org/#impact) for their 2016 research, “[Sapienz: multi-objective automated testing for Android applications.](https://dl.acm.org/doi/10.1145/2931037.2931054)” The recognition celebrates a decade of impact from work that began at University College London and went on to become testing infrastructure at Meta.

[Sapienz](https://engineering.fb.com/2018/05/02/developer-tools/sapienz-intelligent-automated-software-testing-at-scale/) automatically tests apps to find crashes and helps engineers reproduce them in fewer steps, making failures easier to investigate. The original research combined three goals: exploring more of an app, finding more crashes, and reducing the number of steps needed to trigger them. In its evaluation on 1,000 popular Google Play apps, Sapienz found 558 previously unknown crashes.

Within 17 months of publication, Sapienz was deployed at scale at Meta. Today, it runs millions of tests daily across Meta’s platforms, surfaces thousands of unique crashes each week, and helps safeguard hundreds of app releases each month, supporting product reliability and quality.

Sapienz’s applications quickly expanded beyond crash detection. By using test accounts with synthetic conversations, it became the app-exploration engine for [dynamic taint analysis](https://dl.acm.org/doi/epdf/10.1145/3663529.3663824) at WhatsApp. 

We shared Sapienz’s journey in October in our ISSTA 2026 keynote delivered by Ke Mao, “Finding the Bugs Users Would Find: From Sapienz to Autonomous Agents.” Beyond detecting crashes, large language model (LLM) agents can now explore apps and reason about whether their behavior matches what users should expect, extending automated testing from reliability to functional correctness and, increasingly, automated repair. Sapienz’s core ideas of multi-objective exploration and actionable fault revelation carry over directly. A decade on, those founding principles still hold true.

As part of Meta’s overall privacy and risk management program, this work reflects our ongoing efforts to ensure privacy considerations are at the heart of our product development process, helping teams identify risks earlier in the development lifecycle, apply safeguards more consistently, and build privacy protections into each new innovation from the start.