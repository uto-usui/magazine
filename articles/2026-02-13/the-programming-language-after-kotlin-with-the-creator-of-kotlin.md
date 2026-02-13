---
title: "The programming language after Kotlin – with the creator of Kotlin"
source: "https://newsletter.pragmaticengineer.com/p/the-programming-language-after-kotlin"
publishedDate: "2026-02-12"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/ZggUn2mNqMU), [Spotify](https://open.spotify.com/episode/5vPcvIKI63g1SnqZdZCXsL), and [Apple](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id1769051199).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!Gh57!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

](https://substackcdn.com/image/fetch/$s_!Gh57!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd9835d46-a4d0-40e1-a16b-dba8068fd6ad_800x70.png)

• **[Statsig](http://statsig.com/pragmatic)** — ⁠ The unified platform for flags, analytics, experiments, and more. Stop switching between different tools, and have them all in one place. [Check out Statsig.](http://statsig.com/pragmatic)

• **[Sonar](https://www.sonarsource.com/pragmatic/?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-ai&utm_content=podcast-sonar-ai-lp&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer)** – The makers of SonarQube, the industry standard for automated code review. Join me online at the [Sonar Summit on March 3rd](http://sonarsource.com/pragmatic/sonarsummit?utm_medium=paid&utm_source=pragmaticengineer&utm_campaign=ss-sonar-summit26&utm_content=podcast-sonar-summit&utm_term=ww-all-x&s_category=Paid&s_source=Paid%20Other&s_origin=pragmaticengineer), where I and other eng leaders and devs will share practical strategies for the AI era.

• **[WorkOS](https://workos.com/)** – Everything you need to make your app enterprise ready. Ready-built infrastructure you can use, like SSO for enterprise buyers, MCP auth for agentic workflows, or protection against free trial abuse with Radar. [Check out WorkOS.](https://workos.com/)

Andrey Breslav is the creator of Kotlin and the founder of [CodeSpeak](https://www.codespeak.dev/), a new programming language that aims to reduce boilerplate by replacing trivial code with concise, plain-English descriptions. He led Kotlin’s design at JetBrains through its early releases, shaping both the language and its compiler as Kotlin grew into a core part of the Android ecosystem.

In this episode, we talk about what it takes to design and evolve a programming language in production. We discuss the influences behind Kotlin, the tradeoffs that shaped it, and why interoperability with Java became so central to its success.

Andrey also explains why he is building CodeSpeak as a response to growing code complexity in an era of LLM agents. He believes keeping humans in control of the software development lifecycle will matter even more as AI becomes more capable. Andrey also closed our converstion with a message to software engineers sceptical about AI:

> “There is quite a bit of skill to using these AI coding tools. You can learn it, you can get a lot better at it. Do not necessarily believe everyone on Twitter: some people claim crazy things! Still, you can be very productive with these things when you use them well, and it’s absolutely worth investing into that.
> 
> In the future, it will still be engineers building complex systems. Keep that in mind: it’s not like we all go to nothing.”

Here are 10 things that were new to me on the history of Kotlin, and ideas from Andrey I paid special attention to:

**1\. Kotlin was born because Java stagnated for six years.** By 2010, the last _major_ Java release was Java 5 (2004). Java 6 (released in 2006) made zero language changes, Java 7 (released in 2011) made minor ones, and lambdas didn’t arrive until 2014. Meanwhile C# had lambdas, properties, and more — creating a clear market opening.

**2\. Kotlin’s first version was not a compiler: it was an IDE plugin.** In a smart move, Andrey decided to build an IDE plugin that utilized IntelliJ’s parsing infrastructure first. This let Andrey demo the language interactively before anything could compile.! As he recalled: “I could show off the language as if it existed because it had some tooling, but I couldn’t compile anything.”

**3\. The initial Kotlin team was almost entirely made up of new grads.** Andrey hired some of his former university students to work on Kotlin. Many became core contributors who built foundational parts of the language. _I found this story inspiring: it’s a reminder that you don’t need lots of experience to build durable things, as long as you are a fast learner._

**4\. Kotlin used a parser hack from C# to keep angle brackets for generics,** and solved a “mathematically unresolvable” grammar ambiguity. The < symbol is both “less than” and “generic type.”

[

![](https://substackcdn.com/image/fetch/$s_!qI0n!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd7b4bf44-5355-4f13-8549-8d6b52308a0d_1380x442.png)

](https://substackcdn.com/image/fetch/$s_!qI0n!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd7b4bf44-5355-4f13-8549-8d6b52308a0d_1380x442.png)

Kotlin took inspiration from C# for its generics implementation

Java worked around it awkwardly (requiring a dot prefix), Scala used square brackets. Kotlin and C# simply disambiguate ad hoc in the parser, keeping familiar syntax.

**5\. Smart casts were inspired by an obscure language called Gosu.** [Smart casts](https://medium.com/@arshamjafari85/title-kotlins-smart-casts-unveiling-the-magic-of-type-inference-6a323fbde3a8) is a pleasant language feature in Kotlin, which is rare to see in other typesafe languages: after an `if (x is String)` check, Kotlin automatically treats `x` as `String` inside the branch — eliminating the redundant cast that litters Java code.

[

![](https://substackcdn.com/image/fetch/$s_!mQ1q!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F162bb3e6-1915-4cb3-827e-35d669c5ba34_1274x354.png)

](https://substackcdn.com/image/fetch/$s_!mQ1q!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F162bb3e6-1915-4cb3-827e-35d669c5ba34_1274x354.png)

Smart casts in Kotlin

Under the hood, this language feature hides a pretty complicated algorithm, but it eliminates enormous amounts of noise.

**6\. Omitting the ternary operator is Andrey’s biggest design regret.** This is the ternary operator, present in most languages:

[

![](https://substackcdn.com/image/fetch/$s_!pCLy!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F298a2a5a-2248-4c7c-ba0f-cca8f98ee096_844x250.png)

](https://substackcdn.com/image/fetch/$s_!pCLy!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F298a2a5a-2248-4c7c-ba0f-cca8f98ee096_844x250.png)

The ternary operator in Java

In Kotlin, Andrey removed it because if was already an expression, freeing up **?** and **:** for nullable types and type annotations made sense. But **if**, as an expression, turned out to be verbose. Andrey noted: “by the time I agreed \[that removing the operator was a mistake\], it was too late because you can’t retrofit the ternary operator in the current syntax.”

**7\. Kotlin adding Android support was accidenta.** An Android developer literally asked the team "does Kotlin work on Android?," the Kotlin team checked, and theirtoolchain crashed. The Android tools were stricter than the JVM because Android developers "actually read the spec" (ha!) Ironically, this strictness made Android a great testing environment for validating Kotlin's bytecode correctness, and it was the reason the Kotlin team fixed up Kotlin to also compile on the stricter Android JVM.

**8\. Andrey is building a new programming language, but one based on English.** [CodeSpeak](https://www.codespeak.dev/) is neither a formal language, nor just prompting. It’s designed for engineers, not casual users, and aims to shrink typical application code by roughly 10x. What remains is “the essence of software engineering” — only the things the human uniquely knows about what needs to happen, because “everything else, the machine knows as well.”

**9\. 2026 will be the year of the IDE comeback vs terminal-based tools.** While Andrey praised Claude Code as “a complete breakthrough of what you can do in a terminal,” but argued that we can work better, as devs, inside specialized environments. He expects new development environments built from the ground up for agent-first workflows.

**10\. There’s demand to teach how to use AI coding skills better.** As Andrey told me: “There are people who can prompt it much better than others. They cannot always articulate why their prompts work better, but you can learn it.”

Andrey also urged all software engineers to push past initial skepticism and invest in learning, while ignoring the most outrageous social media claims on the future of software engineering.

-   [Cross-platform mobile development](https://newsletter.pragmaticengineer.com/p/cross-platform-mobile-development)
    
-   [How Swift was built](https://newsletter.pragmaticengineer.com/p/from-swift-to-mojo-and-high-performance) – with Chris Lattner, the creator of the language
    
-   [Building Reddit’s iOS and Android app](https://newsletter.pragmaticengineer.com/p/building-reddits-ios-and-android)
    
-   [Notion: going native on iOS and Android](https://newsletter.pragmaticengineer.com/p/notion-going-native-on-ios-and-android)
    
-   [Is there a drop in native iOS and Android hiring at startups?](https://newsletter.pragmaticengineer.com/p/native-vs-cross-platform)
    

([00:00](https://www.youtube.com/watch?v=ZggUn2mNqMU)) Intro

([01:02](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=62s)) Why Kotlin was created

([06:26](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=386s)) Dynamic vs. static languages

([09:27](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=567s)) Andrey joins the Kotlin project

([14:26](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=866s)) Designing a new language

([19:40](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=1180s)) Frontend vs. Backend in language design

([21:05](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=1265s)) Why is it named Kotlin?

([24:37](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=1477s)) Kotlin vs. Java tradeoffs

([28:32](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=1712s)) Null safety

([31:24](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=1884s)) Kotlin’s influences

([39:12](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=2352s)) Smartcasts

([40:42](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=2442s)) Features Kotlin left out

([44:54](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=2694s)) Bidirectional Java interoperability

([55:01](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=3301s)) The Kotlin timeline

([58:00](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=3480s)) Kotlin’s development process

([1:07:20](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=4040s)) From Java to Android developers

([1:12:12](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=4332s)) How Android became Kotlin-first

([1:18:20](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=4700s)) CodeSpeak: a language for LLMs

([1:24:07](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=5047s)) LLMs and new languages

([1:28:20](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=5300s)) How software engineering is changing with AI

([1:36:12](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=5772s)) Developer tools of the future

([1:39:00](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=5940s)) Andrey’s advice for junior engineers and students

([1:42:32](https://www.youtube.com/watch?v=ZggUn2mNqMU&t=6152s)) Rapid fire round

**Where to find Andrey Breslav:**

• X: [https://x.com/abreslav](https://x.com/abreslav)

• LinkedIn: [https://www.linkedin.com/in/abreslav](https://www.linkedin.com/in/abreslav)

• Website: [https://www.abreslav.com](https://www.abreslav.com/)

**Mentions during the episode:**

• Kotlin: [https://kotlinlang.org](https://kotlinlang.org/)

• Scala: [https://www.scala-lang.org](https://www.scala-lang.org/)

• C#: [https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/overview](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/overview)

• Groovy: [https://groovy-lang.org](https://groovy-lang.org/)

• CodeSpeak: [https://www.codespeak.dev](https://www.codespeak.dev/)

• Borland: [https://en.wikipedia.org/wiki/Borland](https://en.wikipedia.org/wiki/Borland)

• JetBrains: [https://www.jetbrains.com](https://www.jetbrains.com/)

• MPS: [https://www.jetbrains.com/mps](https://www.jetbrains.com/mps)

• Max Shafirov on LinkedIn: [https://www.linkedin.com/in/maximshafirov](https://www.linkedin.com/in/maximshafirov)

• Creating The Best Programming Language: The Story of Kotlin:

• Dmitry Jemerov on X: [https://x.com/intelliyole](https://x.com/intelliyole)

• Go: [https://go.dev](https://go.dev/)

• Ceylon: [https://en.wikipedia.org/wiki/Ceylon\_(programming\_language)](https://en.wikipedia.org/wiki/Ceylon_\(programming_language\))

• Tony Hoare: [https://en.wikipedia.org/wiki/Tony\_Hoare](https://en.wikipedia.org/wiki/Tony_Hoare)

• Shoulders of Giants: Languages Kotlin Learned From | Andrey Breslav @ Kotlin Dev Day Amsterdam 2022:

• Gosu: [https://en.wikipedia.org/wiki/Gosu\_(programming\_language)](https://en.wikipedia.org/wiki/Gosu_\(programming_language\))

• Russ Tate’s website: [https://rosstate.org](https://rosstate.org/)

• Swift: [https://www.swift.org](https://www.swift.org/)

• Google I/O 2017: Empowering developers to build the best experiences across platforms: [https://android-developers.googleblog.com/2017/05/google-io-2017-empowering-developers-to.html](https://android-developers.googleblog.com/2017/05/google-io-2017-empowering-developers-to.html)

• From Swift to Mojo and high-performance AI Engineering with Chris Lattner: [https://newsletter.pragmaticengineer.com/p/from-swift-to-mojo-and-high-performance](https://newsletter.pragmaticengineer.com/p/from-swift-to-mojo-and-high-performance)

• Cursor: [https://cursor.com](https://cursor.com/)

• Junie: [https://www.jetbrains.com/junie](https://www.jetbrains.com/junie)

• _Zen and the Art of Motorcycle Maintenance: An Inquiry into Values_: [https://www.amazon.com/Zen-Art-Motorcycle-Maintenance-Inquiry/dp/0061673730](https://www.amazon.com/Zen-Art-Motorcycle-Maintenance-Inquiry/dp/0061673730)

—

Production and marketing by [Pen Name](https://penname.co/).