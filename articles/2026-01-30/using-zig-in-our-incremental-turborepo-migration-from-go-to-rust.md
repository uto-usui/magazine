---
title: "Using Zig in our incremental Turborepo migration from Go to Rust"
source: "https://vercel.com/blog/how-we-continued-porting-turborepo-to-rust"
publishedDate: "2023-09-08"
category: "frontend"
feedName: "Vercel"
author: "Nicholas Yang"
---

11 min read

Sep 8, 2023

Learn how we're cross-compiling a Rust-Go-Rust sandwich to six platforms.

We’ve been porting [Turborepo](https://turbo.build/repo), the high-performance build system for JavaScript and TypeScript, from Go to Rust. We talked about [how we started the porting process](https://vercel.com/blog/how-turborepo-is-porting-from-go-to-rust?nxtPslug=how-turborepo-is-porting-from-go-to-rust), so now let’s talk about how we began porting our two main commands: `run` and `prune`.

## [Link to heading](#since-last-time)Since last time

When we last left off, we had begun our port by implementing global `turbo` and command line argument parsing in Rust. Because of issues around static linking and [Go’s incompatibility with `musl`](https://vercel.com/blog/how-turborepo-is-porting-from-go-to-rust?nxtPslug=how-turborepo-is-porting-from-go-to-rust#alpine-linux), an essential requirement for compatibility with Alpine Linux, we split Turborepo into two binaries: one Rust and one Go.

After that, we ported the auxiliary commands like `login`, `link`, `unlink`. These were fairly simple to port since they only required a basic HTTP client and some configuration management. We were able to move them in [one](https://github.com/vercel/turbo/pull/3500) or [two](https://github.com/vercel/turbo/pull/3372) pull requests at a time.

## [Link to heading](#run-and-prune)`run` and `prune`

However, after these commands, we ended up with a problem: How could we port `run` and `prune`? `run` and `prune` are the commands that do the majority of the work in `turbo`. `run`, well, runs your tasks, like `build`, `lint`, and `test`. `prune` takes your Turborepo and produces a subset of it that only contains a single package and its dependencies. This is helpful when you want to only use a specific package, such as in a Docker container, and don’t want to copy the entire Turborepo into the container.

![A graph showing a full monorepo with abstract packages, and another directed graph showing a subset of the monorepo after running `turbo prune` on the monorepo](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6M2qxtAbYdqEjXB2Q5jvQH%2F79aee710c6339e0ca1e3252f5188d553%2FInlineGraphic_1920x1755-Light.png&w=1920&q=75)![A graph showing a full monorepo with abstract packages, and another directed graph showing a subset of the monorepo after running `turbo prune` on the monorepo](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1zMYjFYb68b5N019HJZMka%2F78d6d06ad5f4086f0e8342404958f2e3%2FInlineGraphic_1920x1755-Dark.png&w=1920&q=75)

A graph showing a full monorepo with abstract packages, and another directed graph showing a subset of the monorepo after running \`turbo prune\` on the monorepo

As such, they’re quite large chunks of code. `run`, for instance, does the following:

1.  Processes configuration from command line arguments, your `turbo.json` files, environment variables, etc.
    
2.  Spins up a dependency graph of the various packages in your Turborepo, i.e. the package graph.
    
3.  Determines which packages have been modified.
    
4.  Figures out which tasks need to be run and in which order, using a task dependency graph, i.e. the [Task Graph](https://turbo.build/repo/docs/core-concepts/monorepos/task-graph).
    
5.  Executes the tasks in parallel.
    
6.  Saves the outputs of these tasks to file system cache and/or remote cache.
    
7.  Produces a summary of this execution.
    

And this is a simplified, high-level version! In reality, there’s a lot more going on such as filtering, dry runs, hashing, and more. We couldn’t move these commands in one or two pull requests like we could with the auth commands from before. We needed a way to move them incrementally.

## [Link to heading](#strategies-for-incremental-migration)Strategies for incremental migration

We considered a few strategies for moving `run` and `prune` to Rust, all based on [principles of incremental migration](https://vercel.com/blog/incremental-migrations).

### [Link to heading](#option-1:-the-same-strategy)Option 1: The same strategy

The first strategy that we considered was to continue what we were already doing for command-line parsing: Do more work in the Rust code and pass the result to the Go code. However, this had a fatal flaw. Almost all of the work that we were doing in `run` involved either the package dependency graph or the task dependency graph. Graphs can get large extremely quickly, so serializing them over JSON would induce a lot of overhead.

Also, from a stability perspective, the package graph is the core abstraction within `turbo`. We needed to build up enough infrastructure and testing to make sure that it was rock-solid before we could ship a ported version.

### [Link to heading](#option-2:-write-from-scratch)Option 2: Write from scratch

Another option would be to build up a Rust version of `run` / `prune` from scratch, then switch over once it’s completed. We didn’t want to do this, since, as stated in [the previous blog post](https://vercel.com/blog/how-turborepo-is-porting-from-go-to-rust?nxtPslug=how-turborepo-is-porting-from-go-to-rust), we weren’t confident that we could produce a full rewrite that kept the same behavior.

### [Link to heading](#option-3:-trampoline)Option 3: Trampoline

We also had some ideas that involved reusing our existing infrastructure, such as creating a [trampoline](https://en.wikipedia.org/wiki/Trampoline_\(computing\)) where the Go binary would have an entry-point function that could redirect to different parts of the `run` pipeline, so the Rust code could call the Go binary, get a result, process that more, then call the Go binary again. This would allow us to reuse the two binary setup that we already had. If you’re familiar with JavaScript callbacks, you can think of this as the Rust code producing events that the Go code handles with a callback.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F782aAuMFAgEPH3WppVHwkl%2F9c86341c3636c75f1db3023613e9f939%2FInlineGraphic_1920x800-Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5HROFxNePOJwgdaPoR2QPi%2F0499b81d4ef4bfa8fd54eca832b5a8d4%2FInlineGraphic_1920x800-Dark.png&w=1920&q=75)

### [Link to heading](#option-4:-use-the-daemon)Option 4: Use the daemon

Similarly to the previous option, we considered adapting Turborepo’s daemon for porting. The daemon is a performance optimization that runs in the background and watches the files in your Turborepo. That way, when you run a task, `turbo` already knows which files have changed and, therefore, which tasks to run. Our strategy would be to port the daemon to Rust, and then add more and more functionality to the daemon, such as having it create the package graph and task graph. However, the daemon is meant as an optional performance improvement, so making it an essential part of the `run` pipeline would be a significant shift in architecture.

## [Link to heading](#the-winning-solution:-the-go-sandwich)The winning solution: The Go sandwich

After considering these options, we settled on building what we call the “Rust-Go-Rust sandwich” or the “Go sandwich” for short. It consists of a Rust binary that calls a Go binary, which in turn calls Rust libraries that are statically linked into the Go binary. This allows us to split up the `run` and `prune` code between the two languages and port individual dependencies. This way, we could tackle `run` and `prune` incrementally, allowing for better testing and debugging through the migration.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1lj0CpxgLAhFZJFcfjXm18%2Fd3157c696ad31fc0a44ea5db1f632375%2FInlineGraphic_1920x983-Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2mM5usfA7hWsByVENFrAV6%2F77d645a6431d867b0b662d3c38ad62bb%2FInlineGraphic_1920x983-Dark.png&w=1920&q=75)

The Rust dependencies that we’ve ported are contained in [the `turborepo-ffi` crate](https://github.com/vercel/turbo/tree/main/crates/turborepo-ffi). We compile that crate to a C static library, (a `staticlib` in Rust terms). From there, we link it to our Go binary using CGO. [Unlike last time](https://vercel.com/blog/how-turborepo-is-porting-from-go-to-rust#alpine-linux), we didn’t run into any [segfault issues](https://en.wikipedia.org/wiki/Segmentation_fault) because, while linking Go to Rust is broken with `musl`, linking Rust to Go is fine.

To communicate between Go and Rust, we decided to use `protobuf`, as it was platform-independent, relatively compact, and had an explicit schema that could be used to generate Rust and Go types, keeping our types in sync across languages. This was especially important since we had a lot more surface area between Rust and Go than when we were porting the command line arguments.

Finally, we modified our build process so that we could toggle the Go sandwich on or off. That way, we could always revert back to the Go code if we encountered bugs in the Rust implementation. This did mean that we had to keep the Go code around, but we knew that this was ultimately temporary.

## [Link to heading](#sandwich-porting-process)Sandwich porting process

Let’s walk through an example of porting to Rust. We have code to include environment variables in what’s called our global hash, which determines whether or not we have a global change that necessitates re-running all of our tasks. This is a nice, self-contained chunk of code, so it was a good candidate for porting.

To start, we needed to determine what exactly we wanted to port. Ideally, we should be porting non-trivial chunks, as we don’t want to be inducing the `protobuf` overhead for a trivial function—but it shouldn’t be so large that it’s out of the scope of a single PR. In this case, we decided to port the `getGlobalHashableEnvVars` function, which takes [the user's environment variable configuration](https://turbo.build/repo/docs/reference/configuration#globalenv) and determines which environment variables to provide as inputs to the global hash.

Next, we split up the existing code into the [old Go implementation (`global_hash_go.go`)](https://github.com/vercel/turbo/pull/5166/files#diff-815f123763ca59163acca24037c949086b06fe07f203032c6a38eddeaec3c189) and the new Go code that calls [the Rust implementation (`global_hash_rust.go`)](https://github.com/vercel/turbo/pull/5166/files#diff-d0541bae6afdec09cfb6913066410385b55d2976b45112856700f92fe52ac707). We use [Go build tags](https://pkg.go.dev/go/build#hdr-Build_Constraints) to decide which implementation to build so we can always toggle back to the old Go implementation if the new Rust implementation contains a bug.

Then, we wrote the [Rust implementation](https://github.com/vercel/turbo/pull/5166/files#diff-6ee8c8df758308489eee2fb88a16392ed765a1de5a2817c4d668e13a6f6db552), added the necessary input and output types to our [`protobuf` schema](https://github.com/vercel/turbo/pull/5166/files#diff-19682a19ede4a33835e912c03c79aba9bbc9c09c7fcd427961d633c8b396ed14), created an [exported function in `turborepo-ffi`](https://github.com/vercel/turbo/pull/5166/files#diff-1e11b40725ad470dde0277e05ba9df21c1c3ce99230845ba1f7e967d774846f2), and called that function in [`ffi.go`](https://github.com/vercel/turbo/pull/5166/files#diff-573c0c60a25977ffa8b2216634274494ba12038f32e1ddec7f3d87a4a1f5e2d4). And of course, [we made sure to write tests](https://github.com/vercel/turbo/pull/5166/files#diff-06a37a82a5abdbea12d8798e27a56c182923a5a8dfde4b70cb650d93e680252e)! If you want to check out the full process, you can [find the pull request here](https://github.com/vercel/turbo/pull/5166/files#diff-815f123763ca59163acca24037c949086b06fe07f203032c6a38eddeaec3c189).

With all of this setup, we were able to port more and more pieces of `run` and `prune` to Rust in a relatively straightforward process. However, when it came to shipping the Go sandwich, we ran into some release issues. Here’s how we solved them with an unlikely ally.

## [Link to heading](#the-turborepo-release-process)The Turborepo release process

Turborepo is distributed as a native binary on Windows, Linux, and macOS for both x86-64 and aarch64, the two predominant CPU architectures. Doing the math, that's 6 targets to build and support—not an easy task. As we detailed in [our post about why we’re moving from Go to Rust](https://vercel.com/blog/turborepo-migration-go-rust), it’s quite difficult to write code that handles low-level features like file systems and processes in a cross-platform manner. However, what’s more challenging is building and releasing this cross-platform code for 6 different targets, especially when you’re using two different languages with two different toolchains.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6afOhcJzamIi2TCT4v0ysO%2Fd624d42ffa5b5ee74de1e05c54403a03%2FInlineGraphic_1920x1006-Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2wWkh8h0i01eW3LIme3ums%2F671b5015f90b70dcca7cfaa3d6fd298c%2FInlineGraphic_1920x1006-Dark.png&w=1920&q=75)

Generally, when you write code and build it, you are doing a native compilation. You're building the code for the operating system and architecture of the computer that you're currently using. This works just fine for local development; you build and immediately run it on your computer. But for releases, this process needs to change. We can’t spin up 6 different machines for each of the targets we support. It would take a really long time, and waste compute resources, and our release pipeline is on GitHub Actions which does not support `aarch64` anyway.

Instead, we do what’s called a cross-compilation. Cross-compilation involves building your code for an operating system and/or architecture that is **not** the same as the computer you're currently using. For instance, you can cross-compile an x86-64 Linux binary on an aarch64 macOS computer.

To handle cross-compilation for our Go code, we use a tool called Go Releaser. As the name indicates, Go Releaser releases Go code by building binaries for multiple targets, then releases them (in our case to npm).

## [Link to heading](#go-sandwich-complications)Go sandwich complications

With the Go sandwich, we had a new problem: how can we release a hybrid Go-Rust binary?

We had designed our Go sandwich to use a Rust crate, `turborepo-ffi`, compiled to a `staticlib`, a native C library, which we then linked to our Go code via CGO. This worked just fine locally. However, when it came to releasing, we ran into a few issues.

### [Link to heading](#windows-arm)Windows ARM

As you may recall [from the last post](https://vercel.com/blog/how-turborepo-is-porting-from-go-to-rust#windows-difficulties), there are two main toolchains with Windows: [Microsoft Visual C++ (MSVC)](https://en.wikipedia.org/wiki/Microsoft_Visual_C%2B%2B) and [Minimalist GNU for Windows (MinGW)](https://en.wikipedia.org/wiki/MinGW). The former, MSVC, is written and maintained by Microsoft with a specific Application Binary Interface (ABI), while the latter, MinGW, ports the GNU software suite to Windows. MinGW has its own ABI meaning things compiled for MSVC and for MinGW are not interoperable.

Unfortunately, Go only uses MinGW, while Rust only has support for MSVC on ARM. This meant that we could not link the two languages. Fortunately, Windows on ARM comes with x86-64 emulation, so we could release an x86-64 binary for Windows and let the operating system work its magic to have it run on ARM. There is a performance impact associated, but only until we reach a full Rust binary, or Rust releases a MinGW ARM target.

### [Link to heading](#c-dependencies)C Dependencies

The second challenge arose when using C dependencies within our Rust code. The process of native compilation typically involves compilers creating object files, which are then linked—or combined—together to form a binary. However, in our case, `turborepo-ffi` is compiled into an object file, not a binary. As a result, it can't directly link its own C dependencies.

Let's [take `zlib` as an example](https://www.zlib.net/). If `turborepo-ffi` uses `zlib` as a C dependency, it doesn't directly link `zlib` within its own object file. Instead, it expects that when you integrate `turborepo-ffi` into a binary (in this case, the Go binary) you'll also supply it with an object file containing the compiled version of `zlib`. This expectation arises from the fact that C static libraries are not standalone entities but are designed to be inputs to a linker, serving as building blocks in the creation of a binary.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ZMgbQpn4yjThalCteDJ4U%2Fb1339bf1cef3a9c78382265d98e2c9cf%2FInlineGraphic_1920x1175-Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FjGZezmIq0YE9OCKnXqajo%2F4df86384910616216930d7452634b1bc%2FInlineGraphic_1920x1175-Dark.png&w=1920&q=75)

Okay, understood, don’t use C dependencies in `turborepo-ffi`. Well, that’s not so easy. Many libraries such as `git2` and `openssl` use C dependencies. Even Rust itself uses C dependencies! To handle stack unwinding after a panic, Rust uses a library called `libunwind`. There’s no escaping C no matter how hard you try.

As we’ve emphasized before, this is all much simpler with native compilation. Either the pre-built libraries are already installed on your computer, or they’re easily installable with your system package manager (`apt-get`, `brew`, `apk`, etc.).

With cross-compilation, this all goes out the window. You can’t easily install pre-built libraries for different platforms than your native one. You can build from source (more cross-compilation!) but C compilers are not usually the greatest at statically linked cross-compilation.

But it turns out there’s an exception.

## [Link to heading](#enter-zig-cc)Enter `zig cc`

You may have heard of Zig, a new systems programming language that’s been gaining some adoption recently. It’s fast, simple, and most importantly, has great interoperability with C. So much so, that it actually comes with its own C compiler, `zig cc`.

But `zig cc` is no ordinary C compiler. It’s a C compiler that has **easy, out-of-the-box support for cross-compilation**. As we just saw, cross-compilation in C is quite painful, requiring installing a compiler for a specific target (or building it from source), finding versions of libraries for the target platform, and writing a whole lot of compiler flag magic.

Erasing all of these concerns practically made us jump with joy. `zig cc` even comes with a nice long list of targets that it handles out of the box, with bundled libraries—including, you guessed it, all of the targets that we need to build!

I’ll admit, there was some skepticism about using Zig to build our codebase. Would using Zig _and_ Go _and_ Rust be too much programmer hipsterism? Would Hacker News and developer Twitter judge us too harshly?

But the ultimate test is whether the code works. And indeed it worked! Zig allowed us to build our Go sandwich for all our supported platforms, including the C dependencies. Zig is even smart enough to bundle a platform-specific version of `libunwind`, so all you have to do is pass the flag `-lunwind` and it’ll just work.

On the Go side, we had to pass some flags to indicate that instead of Go linking everything, we wanted to rely on an external linker, i.e. Zig. The [magic combination](https://github.com/vercel/turbo/blob/main/cli/cross-release.yml#L34) here was `linkmode external -extldflags="-static"`.

With the help of just _one more_ language toolchain, we were able to ship our Go sandwich to our users and continue on our porting journey. The first version of `turbo` shipped with the Go sandwich was [version 1.8.6](https://github.com/vercel/turbo/releases/tag/v1.8.4).

## [Link to heading](#why-all-the-effort)Why all the effort?

This may seem like a lot of complexity to accommodate a port—an entire new toolchain along with `protobuf` is nothing to sneeze at—but it allowed us to fulfill our top-line goal: keep shipping code to users. A complete rewrite would have stalled the release of new features for months and risked accumulating unused code. No matter how much testing, no matter how rigorous your type system, code that is not used is code that is ripe for bugs. The Go sandwich ensured that as we ported code, each new piece was actively used and validated.