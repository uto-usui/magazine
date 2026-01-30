---
title: "Why Turborepo is migrating from Go to Rust"
source: "https://vercel.com/blog/turborepo-migration-go-rust"
publishedDate: "2023-03-07"
category: "frontend"
feedName: "Vercel"
author: "Anthony Shew"
---

7 min read

Mar 7, 2023

How we're aligning our tools to our work.

[Turborepo](https://turbo.build/repo?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_migration_go_rust) is a high-performance build system for JavaScript and TypeScript codebases. We're reimagining build systems, taking inspiration from tools like Buck and Bazel, to make them accessible for everyone. At the heart of Turborepo is a very simple idea: **never do the same work twice**. We accomplish this through incremental builds, parallel execution, and [Remote Caching](https://vercel.com/docs/concepts/monorepos/remote-caching).

![Turborepo's caching makes your longest builds near-instant.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5TgiSCR5iYGGiUvsTX4YnN%2F44f8526434a809f90c82e027c4b2f490%2FGroup_10783__2_.png&w=1920&q=75)![Turborepo's caching makes your longest builds near-instant.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5ScqdkNT2gTsTfU4h6rAL%2F5eb6f1a152264846c9d025c9d7fd2798%2FGroup_10784__2_.png&w=1920&q=75)

Turborepo's caching makes your longest builds near-instant.

As usage has grown and product needs have shifted, we've decided to start an incremental migration from Go to Rust in [the 1.7 version](https://turbo.build/blog/turbo-1-7-0?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_migration_go_rust). In this article, you'll learn about our motivations for this migration and problems that we are finding Rust solves for our team.

## [Link to heading](#why-are-we-migrating)**Why are we migrating?**

The original decision for Turborepo to use Go followed in the footsteps of [`esbuild`](https://esbuild.github.io/). As a JavaScript bundler written in Go, `esbuild` is fast and avoids much of the initialization overhead of Node.js. Additionally, Go's developer experience is tailored for iteration, something we needed as we learned more and more about what developers wanted from `turbo`.

In the early days of Turborepo, these properties of Go gave us exactly what we needed for the project to be successful. However, as [the Turborepo codebase](https://github.com/vercel/turbo?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_migration_go_rust) has scaled and merged with [Turbopack](https://vercel.com/blog/turbopack), Go has begun to underserve both our core team and users in the areas that matter most to Turbo.

## [Link to heading](#comparing-go-and-rust)Comparing Go and Rust

We've been working on several other migrations lately and have enjoyed the opportunity to refine our approach:

In any major technical migration, there's _a lot_ to consider and the decision shouldn't be taken lightly. In particular, a language migration is quite demanding, asking you to weigh dimensions like the strengths, weaknesses, and community of a given language according to your specific business and technical context.

In our case, we needed to compare Go and Rust to figure out which language was going to serve us best.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6snVMarBzLScd5R6Y4jK1X%2Fd39f38e1889d69bc464a028d25adf195%2FLight__2_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6rfToXAnieMRqtRzK45IZe%2Fc1622a7f1db8c7fc973eb11a0f92f926%2F1920x700__1_.png&w=1920&q=75)

### [Link to heading](#go's-language-design-priorities)Go's language design priorities

Go's strength is network computing in data centers and it **excels** at this task, powering these workloads at the world's largest scales. The goroutine-per-request model, Context API, and the standard library inclusion of server infrastructure is testament to this community focus.

Additionally, Go favors simplicity over expressiveness. A side effect of that decision means more errors are caught at runtime where other languages might catch them at compilation. With a service running in a data center, you can roll back, fix, and roll forward at your convenience. But, when building software that users install, the cost of each mistake is higher.

For us, it's worth using tools that prioritize up-front correctness. We fully recognize the mismatch of **Go's priorities** and **what we are prioritizing** as a problem that we created for ourselves to solve.

### [Link to heading](#our-needs-align-with-rust)Our needs align with Rust

The Rust language and community has prioritized correctness over API abstraction—a tradeoff that we care a lot about when working with:

-   Process management
    
-   Filesystems
    
-   Other low level OS concepts
    
-   Shipping software to our users' machines
    

This means additional complexity is surfaced into our codebase, but it's _necessary_ complexity for the problems we're trying to solve.

Rust's type system and safety features allow us to put guardrails in place in our codebase where we need them. The language's expressiveness allows our developers to encode constraints that catch errors at compile time rather than in GitHub issues.

### [Link to heading](#comparing-by-example:-file-permissions)Comparing by example: file permissions

Go's preference for simplicity at the filesystem was creating problems for us when it came to file permissions. Go lets users set a Unix-style file permission code: a short number that describes who can read, write, or execute a file.

```
> ls -l turbo.json-rw-r--r--  1 anthonyshew  users  247 Jan 1 00:01 turbo.json
```

While this sounds convenient, this abstraction does not work across platforms; Windows actually doesn't have the precise concept of file permissions. Go ends up allowing us to set a file permission code on Windows, even when doing so will have no effect.

In contrast, Rust's explicitness in this area not only made things simpler for us but also more correct. If you want to set a file permission code in Rust, you have to explicitly annotate the code as Unix-only. If you don't, the code won't even compile on Windows. This surfacing of complexity helps us understand what our code is doing before we ever ship our software to users.

## [Link to heading](#rust's-strong-\(and-growing\)-ecosystem)Rust's strong (and growing) ecosystem

Rust has a fantastic ecosystem of high-quality, open-source crates (Rust's equivalent to an npm package) that have clear focus on what we care about. An example of where we benefit from this alignment is when we have to interface with native libraries written in C or C++.

As we've built out Turborepo, we've started to rely more often on native C packages like [`zstd`](https://github.com/facebook/zstd), a library that helps us compress our cache files. Interoperating with these native libraries in Go requires the use of CGO, which switches us from a pure Go toolchain to a much slower C toolchain. Moreover, this switch is a **global** process, meaning that if we use a single native library, we have to build our entire codebase with CGO.

[

**Check out Turbo on GitHub**

Enter the Turboverse.

Star the Repo



](https://github.com/vercel/turbo?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_migration_go_rust)

In Rust, this interfacing with native C libraries is far more contained. Libraries such as [`bindgen`](https://github.com/rust-lang/rust-bindgen) or [`cxx`](https://github.com/dtolnay/cxx) create safe wrappers and don't require global changes to our builds. Even better, many libraries come with this wrapper already generated.

For example, we ported our `git` interface using the [`git2`](https://github.com/rust-lang/git2-rs) crate. `git2` interfaces with the C library [`libgit2`](https://libgit2.org/) underneath the hood, but exposes a safe, idiomatic Rust API. This allows us to get the benefits of both the Rust and C ecosystems while still maintaining a great internal developer experience.

### [Link to heading](#the-turbo-ecosystem)The Turbo ecosystem

Internally, we share a codebase and work closely with the [Turbopack](https://vercel.com/blog/turbopack) team.

For their work, Rust was a clear choice from day one. This meant that, as we both continued our work on build tooling for JavaScript and TypeScript codebases, we were solving the same problems twice: once in Go and once in Rust.

[

**Connect with the community**

Stay up to date with the latest in build tooling.

Join Discord



](https://discord.gg/w2N4Da9nZy?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_migration_go_rust)

Getting aligned means both teams can ship faster by sharing development and maintenance of common utilities in our problem space. For instance, we're taking a lot of inspiration from the Turbopack team when it comes to file-watching so we can build a feature for smart hot-reloading across workspaces sooner.

## [Link to heading](#rust-makes-the-core-team-happier)Rust makes the core team happier

Another great perk: our team **wants** to write Rust. It's a language that solves what we care about and brings us joy. The fact that we enjoy writing Rust is valuable, by itself, in more ways than one.

-   Happier developers deliver better software. Your brain is [better at complex problem-solving](https://www.psychologicalscience.org/news/releases/a-positive-mood-allows-your-brain-to-think-more-creatively.html) when it's happy.
    
-   If we're happier while we work, we're much less likely to burn out.
    
-   Rust's efficiency means [less energy consumption](https://aws.amazon.com/blogs/opensource/sustainability-with-rust/), letting us do our part in global sustainability.
    

## [Link to heading](#rust-makes-other-developers-happier)Rust makes other developers happier

Looking at the past seven years of [StackOverflow survey results](https://insights.stackoverflow.com/survey), we're not alone.

We also made this choice with _future_ developers of Turborepo in mind.

Web developers are **strongly** looking towards Rust as a second language to learn after JavaScript, making it more accessible for those coming from JS-tooling-in-JS land. This enables web-focused developers to be able to get involved, enabling the Turbo community to grow.

## [Link to heading](#continuing-the-migration)Continuing the migration

We're migrating incrementally, so it's not a complete rewrite overnight.

Right now, we have what we call a "Rust-Go-Rust Sandwich." Rust is the entry point, allowing us to choose whether the implementation for a particular command is in Rust or Go. Our Go code is able to call Rust code, too, giving us paths to keep Go around but always be able to get to Rust. Check out [the turborepo-ffi crate](https://github.com/vercel/turbo/tree/d5665f6eeb85bfb131d9913a46194e3743d5b93d/crates/turborepo-ffi?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_migration_go_rust) and [ffi.g](https://github.com/vercel/turbo/blob/d5665f6eeb85bfb131d9913a46194e3743d5b93d/cli/internal/ffi/ffi.go?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_migration_go_rust)[o](https://github.com/vercel/turbo/blob/d5665f6eeb85bfb131d9913a46194e3743d5b93d/cli/internal/ffi/ffi.go?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_migration_go_rust) to learn more.

We're excited about what Rust has already unlocked for our team and can't wait to finish the oxidation and [carcinization](https://www.google.com/search?q=define+carcinization&oq=define+carcinization&aqs=chrome..69i57.4146j1j7&sourceid=chrome&ie=UTF-8) of our codebase.

If you're a high-performance engineering team building developer tooling or doing systems work and you're debating Rust or Go, we hope our experience can be a helpful reference for you.

## [Link to heading](#try-out-turborepo-today)Try out Turborepo today

Turborepo 1.8 was recently released with more features written in Rust. Learn more about what's new to the Turboverse on [the 1.8 release post](https://turbo.build/blog/turbo-1-8-0?utm_source=vercel_site&utm_medium=blog&utm_campaign=turbo_migration_go_rust).

If you're looking to create a distributed caching system for your team and CI in three minutes, you can [check out our post here](https://vercel.com/blog/vercel-remote-cache-turbo).

[

**Want to get started with your team?**

Build 85% faster.

Let's Talk



](https://vercel.com/contact/sales)