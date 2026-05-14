---
title: "TypeScript, C# and Turbo Pascal with Anders Hejlsberg"
source: "https://newsletter.pragmaticengineer.com/p/typescript-c-and-turbo-pascal-with"
publishedDate: "2026-05-13"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/K-Xv8D8NjTk), [Spotify](https://open.spotify.com/episode/4EHEUwTLM0N4K8qC1xoBED), and [Apple](https://podcasts.apple.com/us/podcast/the-pragmatic-engineer/id17https://podcasts.apple.com/us/podcast/typescript-c-and-turbo-pascal-with-anders-hejlsberg/id176905119969051199).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!YCsL!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39bdfbb4-fb73-41d8-83cb-0ca4832aed49_1280x80.png)

](https://substackcdn.com/image/fetch/$s_!YCsL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F39bdfbb4-fb73-41d8-83cb-0ca4832aed49_1280x80.png)

**• [Antithesis](https://antithesis.com/pragmatic) –** verify your system’s correctness in the development loop. Build, extend and deploy mission-critical systems: without human review or traditional integration tests, all while avoiding embarrassing outages. Antithesis goes far beyond code review and runs your _complete_ system, exhaustively analyzing its behavior, and exposes bugs as quickly as agents introduce them. [Learn more](http://antithesis.com/pragmatic).

**• [WorkOS](https://workos.com/) –** Anders has spent decades thinking in programming languages — WorkOS speaks the same language when it comes to enterprise infrastructure: SSO, SCIM, RBAC, and more, built right so you never have to. [See how](https://workos.com/).

**• [turbopuffer](https://turbopuffer.com/pragmatic) –** a ridiculously scalable, fast and cheap vector and full-text search engine. Cursor moved to turbopuffer after their existing vector database couldn’t keep up with the number of codebases they were adding. This move cut their semantic search costs by 95%, and they have [so many good things to say](https://turbopuffer.com/customers/cursor) about turbopuffer. [Check it out](https://turbopuffer.com/pragmatic).

Anders Hejlsberg is a living legend and one of the most influential programming language designers of all time. He created Turbo Pascal, Delphi, C#, and also TypeScript. As well as that, he spent nearly a decade at the pioneering dev tools company, Borland, and is now in his 30th year of working at Microsoft, where he’s a Technical Fellow.

In this episode, we discuss what it takes to build programming languages that developers love to use, and trace his career from writing his first compiler to creating Turbo Pascal and Delphi, and helping to pioneer modern software development through C# and TypeScript.

Anders details how C# was designed by a small group of experienced language designers who met a few hours each week, and he explains why tooling was just as important as the language for TypeScript’s success, and what he has learned from building languages which stay relevant for decades.

We also look into how Anders uses AI today, which language features suit AI-assisted development, and what he thinks is changing in the craft of software engineering as developers move further away from writing code line by line.

_It was special for me as well to talk with Anders: because my first-ever programming language was Turbo Pascal, and my first paying job was at a C# shop, back in the day. And I write most of my backend services using TypeScript, today._

Here are 14 of my most interesting takeaways from talking with Anders:

**1\. The first computers had zero abstractions on top of the hardware**. Anders started programming on an HP 2100 with 32K of memory and a paper tape boot loader. “Things were so simple. You could see all the way to the bottom. There was just no layering. It was right on top of the hardware,” he says. The past 50 years of computing have been a process of adding layers above the hardware.

**2\. Turbo Pascal won by being more than “just” a compiler.** Anders also built an IDE to edit Turbo Pascal programs in, and a debugger to troubleshoot them with. In later languages which Anders designed, he always focused on the entire developer workflow, not just compilation.

**3\. “10x better for 1/10th of the price” is a proven winner.** This is what Turbo Pascal did: it sold for $49.95 when competing compilers cost $500, and it was faster and more interactive than competitors’ products. Conveniently, the low price tag also killed off piracy

**4\. The first Turbo Pascal “debugger” was an elegant hack.** The compiler printed the program counter address on a runtime error. Then you could re-run the compiler in a mode that stopped at that address, and the IDE would show which line was being syntactically processed at that point. There were no line maps or debuggers built for this debugging experience: Constraints force creativity!

**5\. C# might have not existed without a famous court case.** Microsoft originally hired Anders to architect its Java tools (Visual J++), but the Sun versus Microsoft lawsuit (1997-2001) meant Microsoft could not build on top of Java, as the company that owned Java’s IP (Sun) sued MS for alleged unauthorized changes to the Java language. Microsoft realized it had to build a new language that combined VB’s productivity with C++’s power. This led to C# and .NET.

**6\. The original C# design team numbered only six.** They held three meetings per week which lasted two hours each, during which they debated what to build. Anders believes that designing even large languages does not require a large team; it’s the right experience that matters most. In that group, this meant folks who had built languages before.

**7\. C# introduced the async/await pattern that many languages later ran with.** Anders said this pattern spread to so many other languages because compilers can generate state machines that humans hate writing. Manual state machines require moving all stack states into objects and wrapping logic in a giant case statement. Devs generally loath doing this by hand, and async/await lets developers write sequential-looking code while the compiler does the painful rewrite behind the scenes.

**8\. TypeScript exists because Anders refused to build Script# for the Outlook.com team.** Microsoft’s Outlook.com team asked Anders’ C# team to productize “Script#,” a language to cross-compile C# to JavaScript. Anders and the C# team pushed back, suggesting that a better approach was to fix JavaScript. Anders felt strongly that to be attractive to the best-of-breed developers in the JavaScript ecosystem, you want people to write _JavaScript_, and not another language like C#.

**9\. Open development on GitHub made TypeScript much better.** TypeScript was open source from the beginning in 2012 on CodePlex, Microsoft’s open source platform. There was not much community activity there, and in 2014, the project moved to GitHub with its large, active community. “Open development” on GitHub is what Anders credits for making TypeScript as good as it has become.

**10\. The TypeScript compiler breaks many traditional practices**. The compiler is built to support [lazy evaluations](https://www.educative.io/answers/what-is-lazy-evaluation-in-typescript), and [deferred imports](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-9.html), and is functional by necessity. For example, with 500 files open, the compiler keeps abstract syntax trees (ASTs) cached for 499, and rebuilds just the one being edited. It only resolves the minimum types needed for the cursor’s current position.

**11\. Training data volume is what makes AI great at TypeScript and Python.** Anders says the language best suited for AI is the one that AI has seen the most in its training set. How well AI agents work in a specific language largely depends on how much of that language exists on the internet. It has less to do with the design of a language.

**12\. But AI is limited for writing compilers – for now, at least.** On Anders’ team, AI is limited in terms of seeing the “big picture”; for example, how types, symbols, binding, and parsing all relate. It’s because LLM training sets don’t contain much about compilers as yet.

**13\. Reviewing code could be the future of the craft.** Anders predicts we’ll all be project managers in the future, managing armies of junior programmers, aka agents, which generate reams of code. Anders admits he is less interested in reviewing code, personally, but reckons code review could be made much more interesting; for example, AI generating commentary that guides reviewers through changes.

**14\. Designing a programming language is a 10-year play.** As Anders puts it:

> “Version one is great, but has all sorts of issues. You’ve got to do version two, but it’s not until version three that it really starts to be great. Then you’ve got to convince people to adopt it.”

• [Microsoft’s developer tools roots](https://newsletter.pragmaticengineer.com/p/microsofts-developer-tools-roots)

• [50 Years of Microsoft and developer tools](https://newsletter.pragmaticengineer.com/p/50-years-of-microsoft) with Scott Guthrie

• [How Linux is built](https://newsletter.pragmaticengineer.com/p/how-linux-is-built-with-greg-kroah) with Greg Kroah-Hartman

• [How will AI change operating systems? Part 1: Ubuntu and Linux](https://newsletter.pragmaticengineer.com/p/ubuntu-and-ai)

• [How Uber uses AI for development: inside look](https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development)

([00:00](https://www.youtube.com/watch?v=K-Xv8D8NjTk)) Intro

([02:48](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=168s)) How Anders got into programming

([05:40](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=340s)) Building his first compiler

([07:44](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=464s)) Turbo Pascal

([12:25](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=745s)) Delphi

([14:53](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=893s)) Joining Microsoft

([19:41](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=1181s)) Building C#

([29:11](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=1751s)) Async/await

([34:01](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=2041s)) The rise of JavaScript

([37:52](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=2272s)) Building TypeScript

([42:58](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=2578s)) How the TypeScript compiler works

([48:30](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=2910s)) JavaScript’s strengths and weaknesses

([52:18](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=3138s)) How Anders uses AI

([56:03](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=3363s)) What language features work well with AI

([1:02:49](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=3769s)) How software craftsmanship is changing

([1:07:49](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=4069s)) Performance and efficiency

([1:09:29](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=4169s)) Anders’ tool stack

([1:11:30](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=4290s)) A 30-year career at Microsoft

([1:13:40](https://www.youtube.com/watch?v=K-Xv8D8NjTk&t=4420s)) Book recommendation

**Where to find Anders Hejlsberg:**

• X: [https://x.com/ahejlsberg](https://x.com/ahejlsberg)

• LinkedIn: [https://www.linkedin.com/in/ahejlsberg](https://www.linkedin.com/in/ahejlsberg)

• GitHub: [https://github.com/ahejlsberg](https://github.com/ahejlsberg)

**Mentions during the episode:**

• Turbo Pascal: [https://en.wikipedia.org/wiki/Turbo\_Pascal](https://en.wikipedia.org/wiki/Turbo_Pascal)

• Borland: [https://en.wikipedia.org/wiki/Borland](https://en.wikipedia.org/wiki/Borland)

• Delphi: [https://en.wikipedia.org/wiki/Delphi\_(software)](https://en.wikipedia.org/wiki/Delphi_\(software\))

• Visual Basic: [https://learn.microsoft.com/en-us/dotnet/visual-basic](https://learn.microsoft.com/en-us/dotnet/visual-basic)

• Skype: [https://en.wikipedia.org/wiki/Skype](https://en.wikipedia.org/wiki/Skype)

• J++: [https://en.wikipedia.org/wiki/Visual\_J%2B%2B](https://en.wikipedia.org/wiki/Visual_J%2B%2B)

• Java: [https://en.wikipedia.org/wiki/Java\_(programming\_language)](https://en.wikipedia.org/wiki/Java_\(programming_language\))

• Legal Newsroom Archive: Sun Microsystems Inc. and Microsoft: [https://news.microsoft.com/case-archives/sun-microsystems-inc-and-microsoft](https://news.microsoft.com/case-archives/sun-microsystems-inc-and-microsoft)

• .NET: [https://dotnet.microsoft.com](https://dotnet.microsoft.com/)

• Roslyn: [https://en.wikipedia.org/wiki/Roslyn\_(compiler)](https://en.wikipedia.org/wiki/Roslyn_\(compiler\))

• Async/await: [https://en.wikipedia.org/wiki/Async/await](https://en.wikipedia.org/wiki/Async/await)

• Go: [https://go.dev/](https://go.dev/)

• JavaScript: [https://en.wikipedia.org/wiki/JavaScript](https://en.wikipedia.org/wiki/JavaScript)

• Brendan Eich’s website: [https://brendaneich.com](https://brendaneich.com/)

• Steve Ballmer on X: [https://x.com/Steven\_Ballmer](https://x.com/Steven_Ballmer)

• Luke Hoban’s website: [https://lukehoban.com](https://lukehoban.com/)

• TypeScript: [https://www.typescriptlang.org](https://www.typescriptlang.org/)

• GitHub: [https://github.com](https://github.com/)

• Language Server Protocol: [https://en.wikipedia.org/wiki/Language\_Server\_Protocol](https://en.wikipedia.org/wiki/Language_Server_Protocol)

• Caml: [https://caml.inria.fr](https://caml.inria.fr/)

• PHP: [https://www.php.net](https://www.php.net/)

• A_lgorithms + Data Structures = Programs_: [https://www.cl72.org/110dataAlgo/Algorithms%20%20%20Data%20Structures%20=%20Programs%20%5BWirth%201976-02%5D.pdf](https://www.cl72.org/110dataAlgo/Algorithms%20%20%20Data%20Structures%20=%20Programs%20%5BWirth%201976-02%5D.pdf)

—

Production and marketing by [Pen Name](https://penname.co/).