---
title: "Why Rust is different, with Alice Ryhl"
source: "https://newsletter.pragmaticengineer.com/p/why-rust-is-different-with-alice"
publishedDate: "2026-05-20"
category: "engineering"
feedName: "The Pragmatic Engineer"
author: "Gergely Orosz"
---

**Listen and watch now on [YouTube](https://youtu.be/q9xD36NCtZ8), [Spotify](https://open.spotify.com/episode/0iReyylj72BKPaUD1hE5FG), and [Apple](https://podcasts.apple.com/us/podcast/why-rust-is-different-with-alice-ryhl/id1769051199?i=1000768769667).** See the episode transcript at the top of this page, and timestamps for the episode at the bottom.

[

![](https://substackcdn.com/image/fetch/$s_!E4-f!,w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcea314b0-b7f7-469d-aaf4-2d8a6bb172bf_1200x105.png)

](https://substackcdn.com/image/fetch/$s_!E4-f!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcea314b0-b7f7-469d-aaf4-2d8a6bb172bf_1200x105.png)

• **[Antithesis](https://antithesis.com/pragmatic)** – if you write Rust code, check out [Hegel-Rust](https://hegel.dev/): a free, open-source property-based testing library for Rust, built by the team behind Hypothesis. It’s now [maintained by Antithesis](https://antithesis.com/blog/2026/hegel/). If you try Hegel and like it, your Hegel tests will run in [Antithesis](https://antithesis.com/pragmatic) as written, as well.

• **[Sentry](https://sentry.io/pragmatic)** – application monitoring software built by developers, for developers. I’ve used Sentry for 10 years now, starting back at Uber. It shows you the full context on issues: stack traces, user actions, environment details, and more. A new, recent feature: [Seer](https://sentry.io/lp/seer), their debugging agent — I like it! [Check out Sentry.](https://sentry.io/pragmatic)

• **[Craft Conference](https://craft-conf.com/2026)**: meet myself, Kent Beck, Hillel Wayne and other standout speakers on 4 June, in Budapest, Hungary, at the conference dedicated to the art and science of software delivery craft. [See details.](https://craft-conf.com/2026)

Rust is one of the most admired programming languages around – and also one of the hardest to learn. What makes developers stick with it?

In this episode of The Pragmatic Engineer Podcast, I sit down with Alice Ryhl, a software engineer on Google’s Android Rust team, and a core maintainer of Tokio, which is the most widely-used async runtime in Rust.

We discuss what makes Rust different from other languages like TypeScript, Go, and C++, and why so many developers say that “once it compiles, it works.” We go deep into memory safety, ownership, borrowing, unsafe Rust, and Cargo.

We also cover how Rust is governed by RFCs, feature flags, its six-week release cycle, how engineers get paid to work on the language, and also look into how Rust’s use inside the Linux kernel is progressing.

Here are 12 of my most interesting takeaways from talking with Alice:

**1\. Open source contributions can open career doors.** Alice landed her Google job not by sending in an application, but by spending years answering questions on Rust forums, and contributing to documentation and code. She also became a maintainer of Tokio while a college student. One day, an email arrived in her inbox, asking: “do you want to work on the Android Rust team?”

**2\. Reliability is the backend pitch for choosing Rust over TypeScript.** Alice is adamant that Rust is a backend language and not a TypeScript replacement on the frontend. Rust’s design for minimizing errors and maximizing reliability can make it a better choice than TypeScript on the backend.

**3\. Rust over C++ for development is a strong choice for avoiding a host of security vulnerabilities.** In C++, a trivial off-by-one error in an array can become a massive security vulnerability. In contrast, Rust’s memory safety eliminates an entire class of such bugs, unless you are brave – or foolhardy – enough to use an “unsafe” keyword, that is!

**4\. Rust was designed to turn implicit failures into compile errors.** Where other languages allow you to forget something, Rust makes an omission into a compilation error for things like null checks, uninitialized variables, or error propagation with the ‘?’ character. If you mess something up, it’s almost certain your program will not compile. If it does, at the very least you should see a lint warning. _We previously covered how Andrey Breslav, creator of Kotlin, [purposely made null safety an important part of Kotlin](https://newsletter.pragmaticengineer.com/p/the-programming-language-after-kotlin)._

**5\. The hardest part of learning Rust is not syntax, but data structure design.** Alice observes that newcomers reflexively build cyclic object graphs, like a Book object referencing Page objects that refer back to the Book. Such cyclic graphs are possible in Rust, but its ownership model makes this hard, meaning that Rust novices end up battling the compiler. Obvious solutions are to use structs and understand how ownership works in Rust.

**6\. Refactoring in Rust is safe and easy, thanks to the compiler.** Alice: “I change a return type or struct field, then just fix the compiler errors until the compiler stops shouting. And then once I’ve done that, I’ve updated every place I need to update.” Rust’s focus on correctness makes refactoring it more straightforward than dynamically-typed languages and Java-style typed ones are to refactor.

**7\. Rust may be optimal for AI agents because of the compiler’s high-quality feedback loop.** Alice’s refactoring trick of just doing what the compiler says also applies to agents: they can talk to the compiler, be told what to fix, and iterate. Combined with Rust blocking entire bug classes by design, this makes it one of the better languages for agent-generated code.

**8\. “Editions” allow Rust to make breaking changes without ‘breaking’ anyone’s code.** Rust editions (2015, 2018, 2021, 2024) can be mixed freely across crates. A library on the 2021 edition works seamlessly with a binary on the 2024 edition. This is how Rust evolves syntax (like adding async/await as keywords) without forcing an ecosystem-wide migration.

**9\. Rust’s governance precludes a “benevolent dictator for life”.** Unlike with Python and Linux, teams in Rust self-organize and delegate to each other. Tough questions are hashed out at in-person events like ‘Rust All Hands’. It’s a good illustration that open source projects can thrive across different structures.

**10\. Rust in the Linux kernel has graduated from “experimental.”** At December 2025’s Linux Kernel Maintainer Summit, the kernel community agreed Rust is no longer experimental. Combined with US Department of Defense regulations pushing agencies away from non-memory-safe languages, this means we should see more Rust in the Linux kernel and everywhere else, too.

**11\. AI code review may matter more than AI code generation in safety-critical codebases.** The kernel community is experimenting with AI bots that review mailing-list patches. Maintainers reportedly find them impressive, especially for kernel code; an area where quality and reliability has always been more important than quantity. It’s interesting that AI might be helpful as an extra quality gate.

**12\. Risk of AI-assisted Rust: false fluency.** Since Rust’s compiler is so strict, code that compiles can be assumed to be correct. However, Alice describes AI agents adding Rust versions of C build flags with no purpose! She also cautions that junior engineers using AI to learn Rust run the risk of not understanding why the compiler accepts the code they produce.

**•** [The past and future of modern backend practices](https://newsletter.pragmaticengineer.com/p/the-past-and-future-of-backend-practices)

**•** [How Kotlin was built](https://newsletter.pragmaticengineer.com/p/the-programming-language-after-kotlin) with Andrey Breslav

**•** [How Swift was built](https://newsletter.pragmaticengineer.com/p/from-swift-to-mojo-and-high-performance) with Chris Lattner

**•** [How Linux is built](https://newsletter.pragmaticengineer.com/p/how-linux-is-built-with-greg-kroah) with Greg KH

([00:00](https://www.youtube.com/watch?v=q9xD36NCtZ8)) Intro

([04:09](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=249s)) Tokio: an overview

([05:11](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=311s)) What Alice likes about Rust

([12:48](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=768s)) Rust for TypeScript engineers

([13:51](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=831s)) Moving from C++ to Rust

([14:34](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=874s)) Memory safety

([18:12](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=1092s)) Garbage collection tradeoffs

([21:46](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=1306s)) Ownership, references, and borrowing

([26:59](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=1619s)) Unsafe in Rust

([31:21](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=1881s)) Crates and Cargo

([35:55](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=2155s)) Language design and RFCs

([43:02](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=2582s)) Building new features

([46:30](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=2790s)) Editions vs. versions

([49:47](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=2987s)) Getting paid to work on Rust

([51:27](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=3087s)) Contributing to Rust

([53:03](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=3183s)) Rust in the Linux kernel

([55:45](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=3345s)) AI use cases for Rust

([1:01:35](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=3695s)) Learning Rust

([1:03:54](https://www.youtube.com/watch?v=q9xD36NCtZ8&t=3834s)) Book recommendation

**Where to find Alice Ryhl:**

• LinkedIn: [https://www.linkedin.com/in/aliceryhl](https://www.linkedin.com/in/aliceryhl)

• Website: [https://ryhl.io](https://ryhl.io/)

**Mentions during the episode:**

• Rust: [https://rust-lang.org](https://rust-lang.org/)

• Tokio: [https://tokio.rs](https://tokio.rs/)

• Minecraft: [https://www.minecraft.net](https://www.minecraft.net/)

• Rust Users Forum: [https://users.rust-lang.org](https://users.rust-lang.org/)

• Null’s creator regrets inventing it: [https://news.ycombinator.com/item?id=12427069](https://news.ycombinator.com/item?id=12427069)

• PHP: [https://www.php.net](https://www.php.net/)

• Go: [https://go.dev](https://go.dev/)

• TypeScript: [https://www.typescriptlang.org](https://www.typescriptlang.org/)

• C++: [https://en.wikipedia.org/wiki/C%2B%2B](https://en.wikipedia.org/wiki/C%2B%2B)

• Pip: [https://pypi.org/project/pip](https://pypi.org/project/pip)

• Why Cargo Exists: [https://doc.rust-lang.org/cargo/guide/why-cargo-exists.html](https://doc.rust-lang.org/cargo/guide/why-cargo-exists.html)

• Linus Torvalds: [https://en.wikipedia.org/wiki/Linus\_Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds)

• Rust Week: [https://2026.rustweek.org](https://2026.rustweek.org/)

• Inside Amazon’s Engineering Culture: [https://newsletter.pragmaticengineer.com/p/amazon](https://newsletter.pragmaticengineer.com/p/amazon)

• How Linux is built with Greg Kroah-Hartman: [https://newsletter.pragmaticengineer.com/p/how-linux-is-built-with-greg-kroah](https://newsletter.pragmaticengineer.com/p/how-linux-is-built-with-greg-kroah)

• Community Grants Program: [https://rustfoundation.org/media/tag/community-grants-program](https://rustfoundation.org/media/tag/community-grants-program)

• Zulip: [https://forge.rust-lang.org/platforms/zulip.html](https://forge.rust-lang.org/platforms/zulip.html)

• The Linux Kernel Archives: [https://www.kernel.org](https://www.kernel.org/)

• Linux Plumbers Conference: [https://lpc.events](https://lpc.events/)

• Gemini: [https://gemini.google.com/app](https://gemini.google.com/app)

• _The Rust Programming Language_: [https://doc.rust-lang.org/book](https://doc.rust-lang.org/book)

• _Rust for Rustaceans: Idiomatic Programming for Experienced Developers_: [https://www.amazon.com/Rust-Rustaceans-Programming-Experienced-Developers/dp/1718501854](https://www.amazon.com/Rust-Rustaceans-Programming-Experienced-Developers/dp/1718501854)

• Rustlings: [https://rustlings.rust-lang.org](https://rustlings.rust-lang.org/)

—

Production and marketing by [Pen Name](https://penname.co/).