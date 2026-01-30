---
title: "Finishing Turborepo's migration from Go to Rust"
source: "https://vercel.com/blog/finishing-turborepos-migration-from-go-to-rust"
publishedDate: "2024-02-12"
category: "frontend"
feedName: "Vercel"
author: "Nicholas Yang"
---

8 min read

Feb 12, 2024

Unlocking the future of your build system with Rust-based Turbo.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3fR6rnVnzNePwvZvCQzroj%2F1deb3de620724566fb2c39def24d5315%2FTurborepo_video_series_frame__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3fR6rnVnzNePwvZvCQzroj%2F1deb3de620724566fb2c39def24d5315%2FTurborepo_video_series_frame__1_.png&w=1920&q=75)

Here’s how we finished this port and shipped the first all-Rust version of `turbo`.

## [Link to heading](#since-last-time)Since last time

At the end of [our previous article](https://vercel.com/blog/how-we-continued-porting-turborepo-to-rust), we had completed the “Rust-Go-Rust sandwich”, or “Go sandwich” for short, and shipped it with some help from Zig. The sandwich allowed us to keep incrementally porting individual pieces of Turborepo. Since then, we ported more components such as:

-   File Hashing: Turborepo’s mechanism for creating a fingerprint of the content in your repository to make cache comparisons fast.
    
-   Lockfile analysis: If the dependencies installed in your repository change, Turborepo needs to account for it.
    
-   [Cache Signature Verification](https://turbo.build/repo/docs/core-concepts/remote-caching#artifact-integrity-and-authenticity-verification): Add your own private key to file hashes for an additional layer of security.
    

## [Link to heading](#reaching-the-limits-of-the-go-sandwich)Reaching the limits of the Go sandwich

However, as we completed these components, we started to reach the limit of what the sandwich could handle. For example, mixing asynchronous, multi-threaded code across languages wasn’t going to be viable. The Go sandwich got us to this point but, with so much of our code now moved to Rust, the sandwich had fulfilled its purpose.

Therefore, we decided to build what we called “the run outline,” an all-Rust version of our `run` command with most of the functionality stubbed out (replaced with a fake, simple version). We gated this behind a feature flag, so we could build it for our local versions but not ship it to users just yet.

It was time to complete the switch to all Rust.

### [Link to heading](#building-the-package-graph)Building the package graph

The first big piece that we added to our run outline was the package graph. The package graph is a graph data structure of all the packages in your Turborepo, where the graph’s nodes are your packages and the edges are the dependency relationships between them. This allows us to deeply understand your monorepo and cache work so you never do it twice.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2cXaj9HJhsPRQDsXt7culF%2Fc1b1c90b4ed5c38073458c84de0848ef%2FTurborepo_video_series__4_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2cXaj9HJhsPRQDsXt7culF%2Fc1b1c90b4ed5c38073458c84de0848ef%2FTurborepo_video_series__4_.png&w=1920&q=75)

When we ported the package graph, we noticed that Rust’s features allowed us to build better types that more accurately model your repository. For example, in Go, we designated the workspace root (where your lockfile lives) with a magic string (`//`). Package names were stored as strings, so to check for the workspace root, we checked if the name was equal to `//`.

In Rust, we were able to model this as an enum. [Enums in Rust](https://doc.rust-lang.org/book/ch06-00-enums.html) allow you to create a type that could be one of multiple values. In this case, our package name could either be the root package or a different package with a name. We can model this as:

```
enum PackageName {  Root,  Other(String)}
```

Not only is this more efficient, it also ensures correctness. Whenever a package name is used in the Rust code, we have to handle the workspace root case or the compiler will complain. In Go, it was a lot more tempting to use strings and handle cases in an ad-hoc manner, leaving more room for error.

### [Link to heading](#the-prune-command)The `prune` command

With the package graph completed, we were ready to tackle the all-Rust version of `prune`. The `prune` command lets you remove everything from your Turborepo except a single package and its dependencies. If you run `turbo prune web-app`, you’ll create an `out` folder with **only** the code and dependencies for your web application.

![A graph showing a full monorepo with abstract packages, and another directed graph showing a subset of the monorepo after running `turbo prune` on the monorepo](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6M2qxtAbYdqEjXB2Q5jvQH%2F79aee710c6339e0ca1e3252f5188d553%2FInlineGraphic_1920x1755-Light.png&w=1920&q=75)![A graph showing a full monorepo with abstract packages, and another directed graph showing a subset of the monorepo after running `turbo prune` on the monorepo](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1zMYjFYb68b5N019HJZMka%2F78d6d06ad5f4086f0e8342404958f2e3%2FInlineGraphic_1920x1755-Dark.png&w=1920&q=75)

A graph showing a full monorepo with abstract packages, and another directed graph showing a subset of the monorepo after running \`turbo prune\` on the monorepo

This is particularly useful for building Docker images where you’d like to keep the size of your image small. We’re also excited about building functionality on top of this command like using pruned lockfiles to only install the dependencies for the application that you care about.

Fortunately, we had already ported most of the lockfile code via the sandwich, so it was just a matter of connecting our existing pieces. If you look at the [pull request](https://github.com/vercel/turbo/pull/5531), we were able to merge prune with relatively little iteration. This was because the Go sandwich had allowed us to build up the Rust dependencies and test them in our existing Go code.

## [Link to heading](#hashing-tasks-for-the-run-command)Hashing tasks for the `run` command

Once we had completed `prune`, we reached one of the core pieces of Turborepo: hashing. Hashing is what allows Turborepo to determine whether you have run a task already.

### [Link to heading](#what-is-hashing)What is hashing?

A hashing algorithm takes some data, and produces a single value, known as a hash. With a very high degree of probability, these hashes will be unique to the input data. You end up with a **fingerprint** of your data that can be quickly compared to other fingerprints.

This is advantageous since hashes can be created quickly and are easy to compare against each other. Hashing shows up in a lot of different places, whether that’s mapping keys to values in a hash map, efficiently storing different versions of your code in git, or safely storing passwords.

### [Link to heading](#hashing-in-turborepo)Hashing In Turborepo

We use hashing to implement our cache. When you use [`turbo run`](https://turbo.build/repo/docs/reference/command-line-reference/run) , Turborepo takes all of the different inputs that goes into building your packages, like source code, environment variables, and dependencies, and sends them through the hashing algorithm.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6IyNyfVi4bJzNE0tN10Yp0%2Fd1aaee3339ee91d9964df9faf631286c%2FTurborepo_video_series__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6IyNyfVi4bJzNE0tN10Yp0%2Fd1aaee3339ee91d9964df9faf631286c%2FTurborepo_video_series__1_.png&w=1920&q=75)

We do this at two levels:

-   At the global level, we produce a hash that determines if you’ve changed something that affects
    
    **the entire repository.**
    
-   We also create many task hashes to determine if you’ve changed something for a specific task. The global hash is included in calculating these hashes so it can potentially change all of them.
    

To use these hashes for your cache, we store outputs of your task in a tar file, a special file type that compresses an entire folder into one file. We store that file in both the local filesystem and in [Vercel Remote Cache](https://vercel.com/docs/monorepos/remote-caching), indexed by this task hash.

When it comes time to run a task, we first produce this task hash, and check if it’s in either the filesystem or the Remote Cache. If it is, we restore the task’s outputs in milliseconds. Otherwise, we run the task and store the outputs in the cache for next time.

### [Link to heading](#ensuring-hash-stability-while-porting-run-and-prune)Ensuring hash stability while porting `run` and `prune`

When it came to porting the hashing code, we wanted the hashes to stay the same between Rust and Go. It doesn't make sense for Turborepo users to miss cache just because the language that was used to write the tool changed under the hood. We had to prioritize stability.

To keep hashes stable, we turned to Capnproto, a cross-platform, cross-language serialization format that is defined byte for byte. Moreover, capnproto has great support for Go and Rust!

After refactoring our hashing code to use Capnproto for both Rust and Go, we set up our CI to run our tasks on both code paths and compare the two hashes. If they ever diverged, our CI would fail and we would need to make some fixes.

## [Link to heading](#reaching-the-finish-line)Reaching the finish line

When we started running the hash comparison code, we weren’t surprised to find we had bugs. Some bugs were minor, like ensuring `null` values contribute to the hash correctly. However, some bugs were more foundational like detecting which packages had changes or handling the `--filter` flag so you can only do the work you're looking for.

We were glad to see our approach pay off here as these would have been incredibly difficult bugs to find otherwise. In the end, we were able to validate that our Rust hashing code was working and matched the Go behavior.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FSvwONmK2JE6hJPtLI9nKR%2F6a27cb381fb7fb17bd47557486b86fa3%2FTurborepo_Solution.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FSvwONmK2JE6hJPtLI9nKR%2F6a27cb381fb7fb17bd47557486b86fa3%2FTurborepo_Solution.png&w=1920&q=75)

Overall, this approach really paid off for us. We found a lot of bugs that otherwise we would have struggled to find. We were able to validate that our code was working and matched the Go behavior.

## [Link to heading](#dogfooding-our-way-to-a-release)Dogfooding our way to a release

At this point, we had ported enough code to run our tasks in our own CI behind a `--experimental-rust-codepath` flag. We began running our integration tests on the Rust codepath and burning down the test failures until we matched the Go version, log line for log line, output for output. Once all our tests were passing, we published a canary version and used it in Vercel’s internal monorepo. Once we reached 72 hours of no reported errors, we shipped Turborepo 1.11!

## [Link to heading](#what-we-learned)What we learned

Looking back, the port was a major success. We managed to port about 70k lines of Go to Rust in 15 months with minimal disruption to users. Our porting strategies such as the Rust shim and the Go sandwich allowed us to incrementally port code for as long as possible.

With that said, there are probably a few things we would have done differently with our newfound knowledge:

-   Invest in a single serialization format from the start. We took an iterative approach, starting with JSON, then using Protocol Buffers, and finally finishing with Capnproto. In the end, we realized that Capnproto would have served us best right from the beginning. We only discovered its value for our case near the end.
    
-   Ship each porting strategy faster. We waited a little too long to figure out our release strategy for the Rust shim and the Go sandwich. This meant that there were times where we had ported code that we could not ship to users due to release management bugs. If we had shipped an absolutely minimal version of each porting strategy as early as possible, we wouldn't have had these issues.
    
-   Realize the importance of code quality **before** porting. By and large, our Go code was in a good state with comprehensive testing and a fairly straightforward architecture. However, we came in thinking that we could refactor while porting, but that turned out not to be the case. Looking back, we might have been able to port faster had we improved our testing story and removed some bloat from the Go code before we started.
    
-   Fully specify core Turborepo behaviors like globbing, file watching, and hashing. We discovered many cases during the port where it wasn't clear whether some behavior in these areas was accidental or intentional in the Go code. It would have helped to uncover these undocumented and untested scenarios that are now codified in Rust. We also could have solidified our cross-platform support, specifically for our Windows testing.
    

## [Link to heading](#the-future-of-turbo)The future of Turbo

We’re incredibly excited for the future that Rust will bring to Turborepo and Turbopack users. We’re finding new opportunities every day to create great features, ensure improved stability of your codebase, and make your CI faster than ever before.

We’re also looking forward to integrating Turborepo even deeper into the [Vercel Developer Experience Platform](https://vercel.com/products/dx-platform). With [the recent release of Conformance and Code Owners](https://vercel.com/blog/introducing-conformance), engineering organizations are shipping higher quality code faster, even as their codebase scales.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fgz46AmeBFhXW1t1PHczp1%2F39d1567ca23f704102f41c53b18e9abe%2FTurborepo_video_series_dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5qy4yLAiGLZXlka9awHIcl%2Fc8c746ca5b1555b1bd1d8f67d907f0a4%2FTurborepo_video_series_dark__1_.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Fgz46AmeBFhXW1t1PHczp1%2F39d1567ca23f704102f41c53b18e9abe%2FTurborepo_video_series_dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5qy4yLAiGLZXlka9awHIcl%2Fc8c746ca5b1555b1bd1d8f67d907f0a4%2FTurborepo_video_series_dark__1_.png&w=1920&q=75)