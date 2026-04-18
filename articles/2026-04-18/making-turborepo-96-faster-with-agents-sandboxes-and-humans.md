---
title: "Making Turborepo 96% faster with agents, sandboxes, and humans"
source: "https://vercel.com/blog/making-turborepo-ninety-six-percent-faster-with-agents-sandboxes-and-humans"
publishedDate: "2026-03-30"
category: "frontend"
feedName: "Vercel"
author: "Anthony Shew"
---

10 min read

Mar 30, 2026

[Turborepo](https://turborepo.dev/blog/2-9) is now 81-91% faster to compute its task graph in our repositories, scaling with repo size. On our 1,000+ package monorepo, `turbo run` now feels instant. Time to First Task is now 11x faster.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F72XP91bf3KWJdeKfkFI60P%2Fc72c40ac1095a23e7ae663eb1615d145%2Fimprovements-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FpXjzPIfWwhqmTFhEKpa93%2F5bcf2150127268b941b132eed3281534%2Fimprovements-dark.png&w=1920&q=75)

After testing my changes with some open source Turborepos and asking Vercel customers to try canary releases on their repositories, I found the performance improvement could get as high as 96% depending on the size and complexity of the repository.

The process behind earning these performance gains is worth sharing, because it wasn't one optimization or one technique. It was eight days of mixing AI agents, Vercel Sandboxes, and typical, boring engineering practices.

## [Link to heading](#how-turborepo-schedules-your-tasks)How Turborepo schedules your tasks

Every `turbo run` starts by analyzing your monorepo's structure, scripts, and dependencies to build a task graph. That graph determines execution order, creates parallelism, and powers caching so you never repeat the same work twice.

![Sequential vs parallel task scheduling with Turborepo](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2lcBJ7U2aCScl9ybEA5sca%2Fecf1144d4eda9a3c41e2ecf79ebfdc0b%2Fseq-parallel-light.png&w=1920&q=75)![Sequential vs parallel task scheduling with Turborepo](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7JmObzM6TU3rHeETVjkGCd%2Fb81beb026e0dff7cf1912ae01ce60102%2Fseq-parallel-dark.png&w=1920&q=75)

Sequential vs parallel task scheduling with Turborepo

Building the task graph is overhead you pay before your repository's work begins. The larger the repo, the higher the cost. On our 1,000-package monorepo, that cost was around 10 seconds on an M4 Pro Max. I don't know about you, but I found that unacceptable.

## [Link to heading](#starting-with-unattended-agents)Starting with unattended agents

I wanted to see what agents could do about this without much guidance. I spun up 8 background coding agents from my phone before bed, each targeting a different part of the Rust codebase I suspected was too slow.

> Look for a performance speedup in our Rust code. It has to be something that is well-tested, and on our hot path. Make sure to add benches to check your work. I'm particularly interested in our hashing code.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_48,h_48,q_75/contentful/image/e5382hct74si/44aWAiRXFU9jhyEy5ewcNk/cbf8ba502bcd7f56761f2e2e3b268af4/anthony-shew-128.jpg)
> 
> **Anthony Shew**

In each prompt, I replaced the part of the codebase I was interested in with a new target. I was curious what the agents would accomplish with plenty of ambiguity, as a baseline.

By morning, 3 of the 8 had produced outputs that I could turn into shippable wins:

-   [PR #11872](https://github.com/vercel/turborepo/pull/11872) netted a ~25% reduction in wall-clock time, reducing allocation pressure through hashing by reference instead of cloning an entire `HashMap`.
    
-   [PR #11874](https://github.com/vercel/turborepo/pull/11874) replaced `twox-hash`, one of our Rust dependency crates, with `xxhash-rust`. A near 1:1 replacement that uses a faster hashing algorithm, creating a ~6% win.
    
-   [PR #11878](https://github.com/vercel/turborepo/pull/11878) came from an existing `TODO` comment that we hadn't gotten to yet. We needed to replace an unnecessary [Floyd-Warshall algorithm](https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm) with a multi-source depth-first search (DFS). This wasn't on the hot path of `turbo run`, but my prompts didn't specify _which hot path_, did they? Fair.
    

These are undoubtedly meaningful successes, but reviewing all 8 chat sessions and code outputs taught me just as much about where unattended, state-of-the-art agents without proper context engineering will fall short today.

-   The agent never realized it could benchmark the improvements on the Turborepo codebase itself. Turborepo dogfoods Turborepo, so it could have easily built a binary and run it right on the source code to get end-to-end results.
    
-   The agent would hyperfixate on the first idea that it came up with and force it to work, rather than backing up and thinking abstractly about the problem (even though the chat logs showed it trying to do so).
    
-   The agent would chase the biggest number it could get, creating microbenchmarks that were relatively meaningless when it came to real-world performance. It would then crank out a 97% improvement for the benchmark, which actually amounted to a 0.02% real-world improvement.
    
-   Never once did an agent write a regression test.
    
-   Never once did an agent use the `--profile` flag in the `turbo` CLI.
    

The agents running unattended produced some good wins, but I could tell this wouldn't be sustainable. We needed stronger testing, and a better verification loop. I had to be more involved.

## [Link to heading](#making-profiling-work-for-agents-and-humans)Making profiling work for agents and humans

The first normal engineering thing I did was take a profile. Shocking, I know.

I ran `turbo run build --profile` on our largest repo and opened the trace in [Perfetto](https://ui.perfetto.dev/).

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1jZmPa2qTLrA0gQd62tFeV%2F461cfea27c75b74d0758cc32d7cf36d7%2FCleanShot_2026-03-30_at_14.02.48.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F33vsLb4shcgnmWfu1YwWt%2Fbf4e16bba937f9c0a84cdf19455d749b%2FCleanShot_2026-03-26_at_16.35.45_2x.png&w=1920&q=75)

Flame graphs are informative, but can be slow to work with. As much as I do enjoy reading flame graphs and grinding out a win, Turborepo has a lot of shipping to do. I have a duty to users of Turborepo to work efficiently and effectively, using the best tools that I have at my disposal.

### [Link to heading](#maybe-chrome-tracing-json-isn't-the-best-format)Maybe Chrome Tracing JSON isn't the best format

Turborepo's profiles are JSON files in Chrome Trace Event Format.

profile.json

```
[  {"ph":"M","pid":1,"name":"process_name","args":{"name":"turbo 2.8.21-canary.9"}},  {"ph":"M","pid":1,"name":"process_labels","args":{"labels":"macos, 14 CPUs"}},  {"ph":"M","pid":1,"name":"thread_name","tid":0,"args":{"name":"main"}},  {"ph":"e","pid":1,"ts":8.167,"name":"enable_chrome_tracing","cat":"turborepo_lib::tracing","tid":0,"id":1,".file":"crates/turborepo-lib/src/tracing.rs",".line":325},  {"ph":"b","pid":1,"ts":52.917,"name":"shim_run","cat":"turborepo_lib::shim","tid":0,"id":2251799813685249,".file":"crates/turborepo-lib/src/shim.rs",".line":224},  {"ph":"b","pid":1,"ts":58.959,"name":"run_with_args","cat":"turborepo_shim::run","tid":0,"id":2251799813685249,".file":"crates/turborepo-shim/src/run.rs",".line":189},  {"ph":"i","pid":1,"ts":77.584,"name":"event crates/turborepo-shim/src/run.rs:223","cat":"turborepo_shim::run","tid":0,"s":"t",".file":"crates/turborepo-shim/src/run.rs",".line":223},  {"ph":"b","pid":1,"ts":78.792,"name":"repo_inference","cat":"turborepo_shim::run","tid":0,"id":2251799813685249,".file":"crates/turborepo-shim/src/run.rs",".line":251},  {"ph":"b","pid":1,"ts":88.209,"name":"infer","cat":"turborepo_repository::inference","tid":0,"id":2251799813685249,".file":"crates/turborepo-repository/src/inference.rs",".line":76},  {"ph":"i","pid":1,"ts":130.375,"name":"event crates/turborepo-repository/src/package_json.rs:166","cat":"turborepo_repository::package_json","tid":0,"s":"t",".file":"crates/turborepo-repository/src/package_json.rs",".line":166},  {"ph":"b","pid":1,"ts":456.709,"name":"parse","cat":"biome_json_parser","tid":0,"id":2251799813685249,".file":"/Users/runner/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/biome_json_parser-0.5.7/src/lib.rs",".line":32},  {"ph":"e","pid":1,"ts":546.042,"name":"parse","cat":"biome_json_parser","tid":0,"id":2251799813685249,".file":"/Users/runner/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/biome_json_parser-0.5.7/src/lib.rs",".line":32},  {"ph":"i","pid":1,"ts":5418.584,"name":"event crates/turborepo-repository/src/package_json.rs:166","cat":"turborepo_repository::package_json","tid":0,"s":"t",".file":"crates/turborepo-repository/src/package_json.rs",".line":166},  // Many more lines of JSON...]
```

An abbreviated Chrome Tracing profile created by Turborepo

An LLM can theoretically read through and parse all this, but...well...just look at it. Function identifiers split across lines, irrelevant metadata mixed in with timing data, not grep-friendly. I pointed an agent at the file and watched it struggle through `grep` calls, trying to piece together function names from different lines, unsuccessfully trying to filter out noise. It was fumbling through this file in the same way I would.

One of my favorite heuristics for working with coding agents is that if something is poorly designed for me to work with, it's poorly designed for an agent, too. This isn't necessarily a comment about work quantity, but more so about interfaces. If something is hard for me to read, it stands to reason it's hard for an agent to read, too. This idea has its limits, but you'll see it quickly pay dividends in a moment.

### [Link to heading](#building-llm-friendly-profiles)Building LLM-friendly profiles

A week prior, I saw [a tweet from Jarred Sumner](https://x.com/jarredsumner/status/2013915593683132607?s=20) about how Bun shipped a new flag: [`--cpu-prof-md`](https://bun.com/docs/project/benchmarking#markdown-output). It outputs profiles as Markdown, which easily fits into my view of how agents work best.

In [#11880](https://github.com/vercel/turborepo/pull/11880), I added a new `turborepo-profile-md` crate that generates a companion `.md` file alongside every trace. Hot functions sorted by self-time, call trees sorted by total-time, caller/callee relationships. All greppable, all on single lines.

profile.md

```
# CPU Profile| Duration | Spans | Functions || 21.6s    | 871   | 97        |**Top 10:** `visit_recv_wait` 69.8%, `put` 30.6%, `build_http_client` 0.6%, `capture_scm_state` 0.5%, `find_untracked_files` 0.2%, `repo_index_untracked_await` 0.2%, `walk_glob` 0.2%, `cache_save` 0.1%, `parse_lockfile` 0.1%, `hash_scope` 0.1%## Hot Functions (Self Time)| Self%  | Self     | Total% | Total    | Function            | Location                                                 || 69.8%  | 15.1s    | 69.8%  | 15.1s    | `visit_recv_wait`   | `crates/turborepo-lib/src/task_graph/visitor/mod.rs:358` || 30.6%  | 6.6s     | 30.6%  | 6.6s     | `put`               | `crates/turborepo-cache/src/fs.rs:196`                   || 0.6%   | 127.0ms  | 0.6%   | 127.0ms  | `build_http_client` | `crates/turborepo-api-client/src/lib.rs:623`             || 0.5%   | 109.1ms  | 0.5%   | 109.1ms  | `capture_scm_state` | `crates/turborepo-lib/src/run/builder.rs:573`            |## Call Tree (Total Time)| Total% | Total    | Self%  | Self     | Function                    | Location                                                         || 69.9%  | 15.1s    | 0.0%   | 10us     | `run`                       | `crates/turborepo-lib/src/run/mod.rs:876`                        || 69.9%  | 15.1s    | 0.0%   | 447us    | `execute_visitor`           | `crates/turborepo-lib/src/run/mod.rs:659`                        || 69.8%  | 15.1s    | 0.0%   | 1.7ms    | `visit`                     | `crates/turborepo-lib/src/task_graph/visitor/mod.rs:315`         || 69.8%  | 15.1s    | 69.8%  | 15.1s    | `visit_recv_wait`           | `crates/turborepo-lib/src/task_graph/visitor/mod.rs:358`         || 30.6%  | 6.6s     | 0.0%   | 171us    | `cache worker: cache PUT`   | `crates/turborepo-cache/src/async_cache.rs:80`                   || 30.6%  | 6.6s     | 30.6%  | 6.6s     | `put`                       | `crates/turborepo-cache/src/fs.rs:196`                           || 0.6%   | 127.0ms  | 0.0%   | 8us      | `http_client_init`          | `crates/turborepo-api-client/src/shared_http_client.rs:68`       || 0.6%   | 127.0ms  | 0.6%   | 127.0ms  | `build_http_client`         | `crates/turborepo-api-client/src/lib.rs:623`                     || 0.5%   | 109.1ms  | 0.5%   | 109.1ms  | `capture_scm_state`         | `crates/turborepo-lib/src/run/builder.rs:573`                    |
```

An abbreviated Markdown profile from Turborepo

The difference in the agent's output quality was dramatic. Same model, same codebase, same data, same agent harness. Different format, **radically** better optimization suggestions. The profile data was finally in a format that both I and the agent could read at a glance.

### [Link to heading](#the-iterative-loop)The iterative loop

With Markdown profiles, I settled into a rhythm.

1.  Put the agent in Plan Mode with instructions to create a profile and find hotspots in the Markdown output
    
2.  Review the proposed optimizations and decide which ones were worth pursuing
    
3.  Have the agent implement the good proposal(s)
    
4.  Validate with end-to-end `hyperfine` benchmarks
    
5.  Make a PR
    
6.  Repeat
    

This loop produced over 20 performance PRs in four days. The wins fell into three categories. I'll give some examples.

**Parallelization** was the largest. Building the git index, walking the filesystem for glob matches, parsing lockfiles, and loading `package.json` files were all sequential operations that could run concurrently. PRs [#11889](https://github.com/vercel/turborepo/pull/11889), [#11902](https://github.com/vercel/turborepo/pull/11902), [#11927](https://github.com/vercel/turborepo/pull/11927), and [#11918](https://github.com/vercel/turborepo/pull/11918) parallelized these hot paths.

**Allocation elimination** removed redundant copies and clones throughout the pipeline, including reference-based hashing in SCM operations ([#11916](https://github.com/vercel/turborepo/pull/11916)), pre-compiling glob exclusion filters ([#11891](https://github.com/vercel/turborepo/pull/11891)), and using a shared HTTP client instead of constructing a new one per request ([#11929](https://github.com/vercel/turborepo/pull/11929)).

**Syscall reduction** batched per-package git subprocess calls into a single repo-wide index ([#11887](https://github.com/vercel/turborepo/pull/11887)), replaced git subprocesses with `libgit2` library calls ([#11938](https://github.com/vercel/turborepo/pull/11938)), and then replaced `libgit2` with the faster `gix-index` altogether ([#11950](https://github.com/vercel/turborepo/pull/11950)).

Again, it's typical, normal, boring software engineering stuff. I did try to turn this into a [Ralph Wiggum loop](https://ghuntley.com/ralph/) but it repeatedly made too many mistakes. The combination of the model, the harness, and the loop simply weren't dependable enough, and could move so much code out from underneath me too quickly. Maybe if I were working on a sideproject, I would have accepted it, but Turborepo powers some of the largest repositories in the world. I have to be fast **and** responsible.

### [Link to heading](#your-source-code-is-the-best-feedback-loop)Your source code is the best feedback loop

The most interesting pattern I noticed during this phase was how the codebase itself served as the agent's strongest feedback mechanism.

I'd point out a performance issue in code the agent was working on. We'd fix it together. Then I'd ask, "Do you see anywhere else where we can improve in the same way?" The agent would find more instances of the same pattern across the codebase. Depending on the size of the changes, I would either add the change to the PR or write it down to do later.

In places where the existing code had a sloppy pattern, the agent would write new code in the same style. Once I corrected one instance, the agent followed the correction going forward. In future conversations, without any memory or context carrying across chats, the agent would see the merged improvements in the source and stop reproducing the old patterns.

Over time, I noticed the agent spontaneously writing tests when I wasn't expecting it to. I saw it creating abstractions that matched what I would have done, which wasn't happening before. I would revisit a place in the codebase where the agent had previously been ineffective, and, with no changes to model or harness, it would produce better code outputs.

It turns out your own source code is the best reinforcement learning out there.

### [Link to heading](#hitting-a-wall-at-85%)Hitting a wall at 85%

By the end of the week, Turborepo was roughly 85% faster on our largest repo. Before I started, I had arbitrarily set a goal of 95% better. The remaining gains were feeling within reach.

The problem became measurement. I had been running all benchmarks on my MacBook, and the [`hyperfine`](https://github.com/sharkdp/hyperfine) reports were getting increasingly noisy. As the code gets faster, system noise matters more. Syscalls, memory, and disk I/O all have their variance.

The profiles were noisy too. I had gotten the codebase to a point where the individual functions were fast enough that background activity on my laptop was drowning out any good signal.

Was the change I made _really_ 2% faster, or did I just get lucky with a quiet run? I couldn't confidently distinguish real improvements from noise. I needed a quieter lab for my science.

## [Link to heading](#vercel-sandbox-for-benchmarking)Vercel Sandbox for benchmarking

[Vercel Sandboxes](https://vercel.com/sandbox) are ephemeral Linux containers that only have what you put in them. No background daemons, no Slack notifications pulling CPU, no background programs making network requests. The machine's resources are entirely focused on what you're running.

I wrote a bash script that automated the entire benchmarking workflow. I'll put an abbreviated version of [the full gist](https://gist.github.com/anthonyshew/e949bce0932fbc520cb3ee0a1ad59de1) below.

bench.sh

```
# Cross-compile Turborepo binaries for Linux on macOS using Zigzig cc -target x86_64-linux-gnu ...cargo build --release --target x86_64-unknown-linux-gnu# Create a Sandbox from a snapshot with test repos pre-loadedsandbox create --snapshot turbo-bench-snapshot# Upload both binaries (main and branch) into the Sandboxsandbox cp ./target/release/turbo-main sandbox:/usr/local/bin/turbo-mainsandbox cp ./target/release/turbo-branch sandbox:/usr/local/bin/turbo-branch# Run hyperfine comparing both binaries across test repossandbox exec -- hyperfine \  --warmup 2 --runs 15 \  'turbo-main run build --dry' \  'turbo-branch run build --dry'# Generate Markdown profiles for both and download reportssandbox exec -- turbo-main run build --profile=main-profilesandbox exec -- turbo-branch run build --profile=branch-profilesandbox cp sandbox:/reports/ ./local-reports/
```

Sandbox benchmarking workflow

You'll notice that, at the end of this script, I'm downloading the profiles back to my laptop. My agent could then inspect the benchmark results and Markdown profiles locally, and I could confidently tell whether a change was a real improvement or noise.

One caveat: Vercel Sandboxes don't guarantee dedicated hardware today. Comparing reports from different Sandbox instances might not be useful. All comparisons should come from a single instance where both binaries run under identical conditions.

### [Link to heading](#breaking-through-the-wall)Breaking through the wall

With clean signal from Sandbox, I could see real breakthroughs in low-level changes that were invisible on my noisy laptop.

**Stack-allocated git OIDs (**[#11984](https://github.com/vercel/turborepo/pull/11984)**)**

Every file in the git index stored its 40-character SHA-1 hash as a heap-allocated `String`. On our largest repo, `new_from_gix_index` alone was creating over 10,000 individual 40-byte heap allocations.

scm/lib.rs

```
/// Fixed-size stack-allocated type for SHA-1 hex strings./// Clone is a 40-byte memcpy instead of alloc + memcpy.#[derive(Clone, Copy, PartialEq, Eq, Hash)]pub struct OidHash([u8; 40]);impl OidHash {    pub fn from_hex_str(s: &str) -> Self {        let mut buf = [0u8; 40];        buf.copy_from_slice(s.as_bytes());        Self(buf)    }}impl std::ops::Deref for OidHash {    type Target = str;    fn deref(&self) -> &str {        // SAFETY: OidHash is always constructed from valid ASCII hex bytes.        unsafe { std::str::from_utf8_unchecked(&self.0) }    }}
```

Stack-allocated OidHash type

`OidHash` implements `Deref<Target=str>` so existing consumers work unchanged, and `Copy` means cloning is a 40-byte `memcpy` on the stack instead of a heap allocation. Profile data showed `new_from_gix_index` self-time dropped 15% and `get_package_file_hashes_from_index` dropped 17%.

**Repo size**

**Before**

**After**

**Change**

~1,000 packages

1.463s ± 0.052s

1.466s ± 0.027s

Same speed, 48% less variance

~125 packages

658.6ms ± 144.6ms

592.1ms ± 62.9ms

10% faster, 57% less variance

6 packages

96.8ms ± 46.7ms

75.0ms ± 18.4ms

22% faster, 61% less variance

The most notable improvement across all three sizes was the reduction in run-to-run variance, which agrees with our theory of less allocator pressure and more predictable performance.

**Syscall elimination (**[#11985](https://github.com/vercel/turborepo/pull/11985)**)**

Every cache fetch was performing three syscalls: `stat(.tar)`, which returned `ENOENT`, then `stat(.tar.zst)`, then `open(.tar.zst)`. Weird pattern.

After some digging, I figured out that the `.tar` fallback existed for cache artifacts from Turborepo's Golang era (2021-2022). No modern version writes uncompressed cache entries, and cache entries rotate out constantly.

cache/fs.rs

```
// Before: 3 syscalls per cache hitlet cache_path = if uncompressed_cache_path.exists() {  // stat(.tar) → ENOENT    uncompressed_cache_path} else if compressed_cache_path.exists() {               // stat(.tar.zst) → OK    compressed_cache_path};let mut cache_reader = CacheReader::open(&cache_path)?;  // open(.tar.zst)// After: 1 syscall per cache hitlet mut cache_reader = match CacheReader::open(&cache_path) {  // open(.tar.zst)    Ok(reader) => reader,    Err(CacheError::IO(ref e, _))        if e.kind() == std::io::ErrorKind::NotFound => {        return Ok(None);  // cache miss    }    Err(e) => return Err(e),};
```

Eliminating redundant syscalls in cache fetch

Across 962 cache fetches on our largest repo, `fetch` self-time dropped from 200.5ms to 129.6ms, a 35% reduction.

**Move instead of clone (**[#11986](https://github.com/vercel/turborepo/pull/11986)**)**

The visitor dispatch loop was deep-cloning a `(String, HashMap<String, String>)` from a precomputed map for each of roughly 1,700 tasks. Since each task ID appears exactly once in the dispatch stream, `HashMap::remove()` can move the value out at zero cost instead of cloning.

## [Link to heading](#results)Results

After eight days, Time to First Task on our largest repo dropped from 8.1 seconds to 716 milliseconds.

**Repo size**

**v2.8.0**

**v2.9.0**

**Improvement**

~1,000 packages

8.1s

0.716s

91% faster

132 packages

1.9s

0.361s

81% faster

6 packages

0.676s

0.132s

80% faster

I estimate this would have taken at least two months without agents, but I hope this article shows you that they didn't do the work for me. I was leading the entire time, deciding what to profile, which proposals to pursue, when to change tools, and when to change strategy. But the combination of my existing engineering knowledge, giving agents better tooling, and a clean benchmarking environment let me move at a pace that wouldn't have been possible six months ago.

## [Link to heading](#released-in-turborepo-2.9)Released in Turborepo 2.9

These performance gains are now stable and ready for you to use. [Visit the Turborepo 2.9 release post](https://turborepo.dev/blog/2-9) to learn more about the latest in Turborepo.