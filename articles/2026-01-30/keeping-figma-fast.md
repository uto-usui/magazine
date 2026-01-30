---
title: "Keeping Figma fast"
source: "https://www.figma.com/blog/keeping-figma-fast/"
publishedDate: "2023-08-29"
category: "design"
feedName: "Figma Blog"
---

August 29, 2023

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACH0lEQVQokW2SSU9TURSA+wdsCStNJC5cuGJl2LjVlTEYtN6H0I0uSCCaaEg0MQ5NlBhBJbRAB4ewoRMgCAGDEfra19daOrcPSiGNG//HZ95ALeLiy7lDzpdzzr02e6wfR1TCEZFwhIUZo//BuJfojEpc/OLC/e0h8e1xSnGvxbSB7XiCMJJaZyGBY16YMSToDAu6lwZ5sHGfr1tj5OMeSvI0JXmGsoEu1EUhS6Sv2ysMCTrmLUKCC7HbDK+PsLL1iqLspZKYoST7KMkByrLP2JvCoyr+adOuEzE5F+vHtTZEZMtNIeExknXKCV0YNKIp1Ns0KrTmZ9ERlehaFHQvS/QsuxCrQ3z88ZRsYopK0k8l6aOanD2BrX1GR4PvCAvOLwoGNwd4m7xDMDFCZPs5qjxJJRmgonwyoi6otWEKw8eFpyISZ6K3cK4PEFZHqRWf0Cg+oqZOUDWqClBVglQV/3GhYmK+stWm/iXOLggurznxyvcoZN7RzL/kMPeCXXWKmuJrQxcE0NTPaOqH1rnNHjX/4ekFwaW1mwxv9zKbdqFkxqj/fM9B7hl7mfFWgmahC7X0HI3iCvVcBC0VMCvsWhL0rDrp/96HN9tLRutjrzLK/o6Hw7ybRtaNlvKiKX60lCVMmfLdzByNwhL1nRC1VMC4s13ZuMHr9DU2q1fZb1znd/0uv4oTNPOTNIuPqWfe/JWdwI+mBtFSOj52VQ9/AMOiTudeRKRjAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/bb2254ecf6496316f94e482cf1470f6e4c8d83da-3264x1837.png?rect=1,0,3262,1837&w=1632&h=919&q=75&fit=max&auto=format)

When a laptop crashed in an empty office, we knew it was time to overhaul our performance testing framework.

1.  [The little MacBook that could...until it could no more](https://www.figma.com/blog/keeping-figma-fast/#the-little-macbook-that-could-until-it-could-no)
2.  [Our dream setup](https://www.figma.com/blog/keeping-figma-fast/#our-dream-setup)
3.  [Embracing performance work in a remote-first world](https://www.figma.com/blog/keeping-figma-fast/#embracing-performance-work-in-a-remote-first-world)
4.  [A tale of two workstreams](https://www.figma.com/blog/keeping-figma-fast/#a-tale-of-two-workstreams)
5.  [The work ahead](https://www.figma.com/blog/keeping-figma-fast/#the-work-ahead)

**Illustrations by Rose Wong.**

In 2018, all we needed was a single MacBook. At least, that’s all we needed to run our entire in-house performance testing system. The laptop looped the same couple of test scenarios over and over, and reported any changes and timings every hour or so to a shared dashboard. [We wrote all about it](https://www.figma.com/blog/figma-faster/)

and the optimizations we made, timed with a major performance overhaul to WebAssembly.

In 2018, we [discovered](https://www.figma.com/blog/figma-faster/) that restructuring our document renderer and ironing out WebAssembly bugs made Figma 3x faster.

At the time, what we outlined was sufficient. So was the single laptop. Five years on, a lot has changed. Figma’s codebase has become larger and more complex, and Figma has expanded to include plugins, community features, a new product (FigJam), a workspace for developers (Dev Mode), and [too many updates to count](https://www.figma.com/release-notes/). Our team is distributed around the world, far beyond the bounds of a single laptop. As we’ve scaled, we’ve realized we need a more sophisticated approach.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAYHBQj/xAAhEAACAgIBBQEBAAAAAAAAAAACAwEEAAURBhIhIzFBof/EABUBAQEAAAAAAAAAAAAAAAAAAAED/8QAGREAAwADAAAAAAAAAAAAAAAAAAECERIT/9oADAMBAAIRAxEAPwBp3W3vJZQRqrC0k85EiIe7jxmbtt/1BrXU5dsEtWxwqIYXxzE/clfWO22NG/XGjaMWIju5mf2cX7XUW9usTN60bAA4OI5j7GENajU4Z0Rb3PvL2f3DJmqXWUqcMzwYwXksMk7RXmz/2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4cad57473a76fdc6d0254d48e1c992a1079943f1-4032x3024.jpg?w=4032&h=3024&q=75&fit=max&auto=format)

Running tests on a single laptop is [common practice](https://www.reddit.com/r/ProgrammerHumor/comments/11u7tp7/linux_ideapad_server/) for smaller companies. We always try to keep our processes lean and avoid over-engineering, so this approach worked for us until recently.

## [The little MacBook that could...until it could no more](#the-little-macbook-that-could-until-it-could-no)

A **granular performance test** checks detail at scale. In one of our newer tests, we simulated rapid panning around a file with 100 multiplayer editors moving layers and typing new text simultaneously.

This realization happened gradually, and then all at once. First, it became clear that the few large design files we used for testing could no longer represent an ever-growing number of product features, not to mention their edge cases. The best practice would be to run a **granular performance test** specific to each feature, but our team’s expansion to more than 400 engineers and managers made that unsustainable. We increasingly shipped more changes daily, which meant that no single person—or laptop—could keep track of every change that went into a release.

In early 2020, like so many companies, we started working remotely. But that same MacBook stayed plugged in and running at our office in San Francisco. In October, it overheated. We tried setting up the same tests on another laptop, but we couldn’t get them to run smoothly. We knew that it was time to rethink our testing system and come up with an approach built for scale.

![A Figma file with many screens](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9ElEQVQ4jX2Sy27TQBSG80wkTqRu2CFAAgnSRFnQ2HGQGoeuEZQVi6zYQHMrl2dAQoqIWycskLpOHN9mxsmz/OicsXNpKxafZubM79/nMoU0+YRfP9/ix7czfP96hstRB4OL1+h/af+Xi8/2vRRu/n7Eu3MLL2vP0Gg8h92qwW7VYZnHsMxqtup9yzpG267Dtuu8N5tVNE9eHFDwrj6g1a6icvQQtXoDvV4Pw+EIg8HwDhQfjy+Z0WjMsX5/cEDBc89hmk9RqVTgOA4mkwmWyyUWi8W90N2OBbN/X/Dc9zh59QjF4gN0Oh24rosoirbEcXyH/fvollZn2HyMUqmI09MOfk9dhGGEIAx5DcMQQRDA930mWK10jOMhAtbkhNrQMp/AMAw4ThfX3gxpumaklPznreFyiRUbUjYJhFSsU2kKIQRrt4ZlMuy+wWw2R7reICWRlFxGkiSQQkAKyR/qmIBSKdL1mlc6HxgaRgldMpz/YSNdUrDtDZkSeR+TREIqhThJsAqCrEW3SibDORsqLcjMyJTEhB5ADCEkZxYngrVR9qODDOnZXHsel0UopRguV0omLzkvm6A4mVNl2ymTIT2b6XTKjdfN32W537988qzzV7wnHWW6G0q5zBnmhjRVWklMGWw2elDUR3o6fO/r1adzFvsHmwcWMnBhMdoAAAAASUVORK5CYII=)![A Figma file with many screens](https://cdn.sanity.io/images/599r6htc/regionalized/93fa729b869d5b4b35f65a51234c433d677ca878-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

An example of one of the design files we used for testing in 2018

## [Our dream setup](#our-dream-setup)

It was daunting to overhaul the system, but the silver lining is that it gave us the opportunity to go back to the drawing board and dream up our ideal system. We started by outlining the key challenges we needed to address: a growing number of features that can impact performance, difficulty operating testing hardware, and a dearth of accurate performance metrics. Through that lens, we came up with a few requirements.

First, we wanted a system that could test every proposed code change in our main monorepo so we could spot performance regressions across all product features early in the development cycle. This would allow us to approach performance proactively, instead of reactively fixing bugs that users report after a feature goes live. Proactive performance is something that’s core to our work at Figma, and that we embody in many other areas of our engineering work. We know that many of our users spend hours a day in Figma; even a small lag can cause major hiccups in their workflows.

Running many tests in parallel (also called **parallel runs**) is a common way to reduce the time spent waiting for the [Continuous Integration (CI)](https://www.atlassian.com/continuous-delivery/continuous-integration) to complete. At Figma, we already use parallelization on cloud-hosted CI runners for every other type of testing.

Running performance tests on real hardware for every pull request would require around 100 identical runners at peak.

Next, the system had to run fast. We decided that any performance guardrail check would need to finish in under 10 minutes—anything beyond that would get in the way of the fast-paced development that’s so central to our engineering culture. To achieve this goal, we’d have to embrace **parallel runs**, requiring us to simultaneously run dozens of performance stress scenarios.

![A FigJam file with tons of colorful sticky notes](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACcElEQVQokU3R227aCBRG4bz/E4x619FU7Wg6laI0UUiBOLY52RgbB4PBxmcbg8GAcyilF2tEJlV6se62Pv3SPjPKkklZYhcFs3KDX+0JHh5e8qtfPb4031e4p6oK//UmqB5fOt15VcXZfVkS73ZEi4womrFaBmx2JatyTZalpGFJEh7woifMdIeS71CWD0zyiuWiYp88so33ZHGOk6WcWWXJ5vmZ/QmZWyynOnnsE4cBU3OC1UkZtx7p9/ZcGgv+Gi/4015TtzaERsGuv2GtLJkOpsij+//B7eHAj8OBTZQQjwaEUx3HdlB7AfJtQrdZIItrvigh74w5f5gpl/0V03ZOKuWEUo7adbgcDN/A4+HINl6R3pvEls7cmtNTEpqyj9ieI3Q8LhSbzwOLL4bPNyXHkDNmYs5MXKF0XK5U/Tfw+UjlrSn6Hqt+QKCFyKrNhabx1Whxo7aRZBWtPcbsRmjtDE3OsIQ1drPEEF1aivEb+PSTytlSdCIKKSFo+zS0Hp9GV3ycnFPTrxnfdYlvXTJxiSvl6HKCIa6wbveM5AWa6r2BP0+gW5B1bLI7F681p67f8bf1D5/Gn/lmNHEkk7jpEQs5nrBAl2b0ZI+htGHUX6MOX7/8a+HGK/D7DnE3wFdcRP2WC+OcS71Ooz9Ab7kMxYCBlGAKM4ZCB0NQsQUXR4mwzYiz0St4eDqy8Armpk9ihcSjMfdaA7XTRmmdHpNx04s511L+HSQ02gbjRo20ds2iJpIIJlnHf1t4+H5kGa8IJxMyxyKdGngDAaczZiJX9Ls7ro2MD5Oc99MFV0OLmSywrV9R3tRY1gcUdxH/AY3mDQktNV37AAAAAElFTkSuQmCC)![A FigJam file with tons of colorful sticky notes](https://cdn.sanity.io/images/599r6htc/regionalized/004a5da1938be4f29d572a5d186529e0c820d4ae-1608x904.png?rect=1,0,1607,904&w=528&h=297&q=75&fit=max&auto=format)

One of the early stress tests we created in FigJam

![A Figma file with tons of comment pins](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACyElEQVQokR2SXU8aCRiF55d56abdO3btjbXaoBWbBdM2grQWiBYGZEbk2yIizAzDIN9fAwqLiLVptmu3m+z/eTbM5ZucvDnnOUfo93ooaplc7pzc5zNURaFYVKx7MDD58vCN4fCGVquDXtaRolH8vo+Inw7ZcWzjcu2iqhq6XsGz70WY/jml3e5S1qskk2mymQyaoqCWSvS7PQyjiiyfoKkaZt/kslAklUwRP43xemcHu30TKSqTSWfZ3t5BeHz8h7v5F4bDMVrZQNcN61G71abf61O8LCKGQhh6hevhCFmS8Xrfs+/xsLr6nNXVNV5tvcLhcLCxsYEwnz8wm90znc5ptbrUruqYgyGDvkmz2Sab/UzA7yceT6AoGoFAwHK2tvacpaUllpeXWfl9hWfPVtjatCNcj8ZMxlNupzPMgUmn08U0h5jmyEKRPcux5/aw7XiNZ/89kiQRk2XevX2LzWZj027n6PAQny/A3t4ewteHb9zd3TOZTBnfTJjN7pjdzuh2+9RqDRRFJRgK43Tu4nTtEgqFLH7BYJCwGEFTVCp6hWhU5sOHA4RGvUE2m6NY0hhPbvnx4yd/f39kNLpB1cokEkmCwRDHxxKRcIRjUUSORixXC57dTgejYuBxe7C/fIkQFkO4XC7CkSidTo/vfz3y89//mN7OKRZLxONxUqkU6XSGbDpDrVqhflW15nN09MkqsVarI0sSAd9HhNPTBF6vl2hUonBRsJq9v/9KtzugUCiilEpW7MUuLy+LjG8WzMeUtTKaptMfXNNotrnI56kaBsL5+QVutxuXy4nL+QdhUaRavaJUUi0ufr8fMSSy0J2d5cjl8mhamapRtYY/nkypN1rETmKkkgmEk9gp6+vr/Pr0CU+f/MKLF2tk0hmazRY+f4DfbDbevXlDPn+BKEbweLzE4ymrsEWadrtNpWJwcHDA1tYm/wP8HF6uBwnzBgAAAABJRU5ErkJggg==)![A Figma file with tons of comment pins](https://cdn.sanity.io/images/599r6htc/regionalized/1755c4da8ed0ba3889059625647a30ac2c5c5658-1608x904.png?rect=1,0,1607,904&w=528&h=297&q=75&fit=max&auto=format)

A stress test with 5,000 comment pins

Lastly, we needed a way to discuss and compare performance. We wanted the ability to reveal the most subtle changes in performance on real hardware, collect CPU profiles, and share links to all this data to drive decisions and continue improving the model moving forward.

These requirements might sound straightforward, but fine-tuning performance for Figma can be nuanced. Figma’s foundation on the web, combined with the way people use Figma—with tons of distributed collaborators—can make for a uniquely tricky environment. We often contend with massive client data sets, dozens of screens at a time, and constant rendering. Many of our performance challenges more closely resemble those in the [gaming world](https://www.figma.com/blog/how-figma-draws-inspiration-from-the-gaming-world/)

than ones you might encounter in typical applications.

## [Embracing performance work in a remote-first world](#embracing-performance-work-in-a-remote-first-world)

With these goals in mind, we turned our attention to the _how_. Initially, it was just the core working group, which is typical of engineering projects at Figma. While many other folks helped guide, review, and approve our work at different intervals, as a rule, we always try to keep the working group as lean as possible so we can move quickly. After taking a realistic look at what we could deliver in the first six months of work, our strategy was to get to the big, impactful wins quickly, while also planning to build a system that could sustain long-term growth.

We thought about how to scale the single MacBook and considered building a device farm with many identical laptops running tests on every commit. As we considered what it would take to execute that, we realized that it would be expensive, in terms of both hardware and maintenance. Running a device farm is incredibly challenging with a small team: Not only do you need to ensure every test laptop is nurtured with the right cooling, network bandwidth, and system updates, but you also need to replace hardware as older laptops start to degrade. Even if we ran all tests on virtual machines, we’d still need seemingly endless engineering resources to tame the performance variance.

Counting **CPU instructions** is great for tracking performance of a traditional algorithm but, in practice, other hardware can become a bottleneck.

Figma is a graphics-heavy application with a lot of work split between CPU and GPU. The speed of moving data between CPU, GPU, and main memory can slow things down, too (commonly called **“I/O” for “input and output”** speeds).

In talking to internal experts and doing our own research, we learned that some performance testing **counts CPU instructions** executed by the program to deterministically detect regressions, but found challenges with this approach, too. For one, our application is a combination of WASM/WebGL and HTML/JS/CSS code running in a variety of browsers with their own interpreters and just-in-time optimizers. Furthermore, Figma’s editor was not always constrained by CPU—sometimes it would be GPU, and rarely **I/O**.

![A cloud at the top and a row of computers at the bottom, both connected by unifying system in the middle.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAADEklEQVQokT2Ra0+TBwCF+zdMuL3t2wtQKJReQSqjgKWXUSiUMlpEOruCgzp0YQw2GLPrBBHRipfsIlnaTQWzOQ2Zk9At2ZLphs4pbjFZQCVBZqblDzxLMdmHk5wv5+RcJNKcXDIQ8wSMOj29PftJJhJ8+80Vxj8+gsftxqw3YNLpedXhJBaNklpKcevmLc6ePoPL7kAhFbc9ZLl5SDJGupJSvJ5mYtHDpJYWWX/yiKcbG/xx9y5fX57nzMwMM/E483Nz/H7nNv9sPmUrnebPBw84dXKalqZGdCUlyAUpEpUop8HpYmpykh9SN1j9e5l/n62wlV5lK73Gs817PHn0K4/XfmNz4z7p5/fZevEXL56vsf74Hj+m5jg2PkRTg518uQKJQiZStbOSfV1BxkaHOR3/gIvJD1n8Ls7yzQQPV75gffVL1lcv8XAlwfIvJ1i6foz5CxOcPTXA2Pt7CXW5se4qRyWKSDK9FVIZhUoVWk0xlWYdjrpy2ltr6e1uZDLm5/rVQywujHF8IkSkx07AV4XLZsJiVlOmUaBWiiik0pcbZsYUsnPJy8rZRoaLgkChUo6+tIB2r4nZc50kZwfZG3Bj1KpRK+UoBOF/nZCVjZCds33MdkK5IFCgkKItEqk0FeKsMxDw7qIvbGMy1sr3V/tZXBhl+miYyP4m/G21OGzlVJbr0Go05CvyEQXZy4RymZJSYxVWl5uW1jrCod2MxPZw4tMQn58PcuXSALd/mubOz8e5dnmQr2YHuPhJP/FYB5HuJjoDLvxeC1ZLEflyGRJ1kYFq/yjNw0la3jiEr8NJ+EiAvnOddL/jZORtPwuJaW5cOEl0KMDIQR/zU318driD0J7dHHjTxsxRGwd7K9BpC5AYdK/QFo4TfO8aNs9b1Fh2EnrdQTjipt5moM1Zxvmol+TEa3R69NTU6Qj2NtDeY8dUrcPeWM2BkS4CkQ5KTBVILKYa9gWG6Q5+RI2lgfqyMoYcVt511eLQF+OxZjPet4Op/h346rMoNKuQ+sxI/WaEimJURiualgGKmwdRGO38B0rY5udNvNEZAAAAAElFTkSuQmCC)![A cloud at the top and a row of computers at the bottom, both connected by unifying system in the middle.](https://cdn.sanity.io/images/599r6htc/regionalized/c7e3f545b7e026ce88965427504b8dccc6e7cc0c-3217x1811.png?rect=2,0,3214,1811&w=804&h=453&q=75&fit=max&auto=format)

We shipped a cloud-based system and a hardware system, both connected by the same CI system.

After considering a few different approaches, we ultimately decided to ship two systems: A cloud-based system would handle mass testing, covering our bases for the majority of situations, and a hardware system would be highly targeted, tackling situations that required more precision. They would be connected by the same CI system, and engineers across product teams would run the same suite of performance test scenarios across them.

### [(1) Cloud-based system](#_1-cloud-based-system)

There are many ways to mitigate some noise aspects of VMs, like dedicated hosts or RAM disks, [like Dropbox did](https://dropbox.tech/infrastructure/keeping-sync-fast-with-automated-performance-regression-detectio).

The first system runs in GPU-enabled virtual machines, in a headless Chromium process on every code change in every pull request. Virtual machines (VMs) can be tricky for testing performance due to the noise levels of virtualized hardware, loud neighbors on the same underlying host, and inconsistencies in measurement, which all pose problems for accurately timing complex applications. These factors can add a good amount of variance to performance, so we set a 20% pass margin to skip the noise and catch the most egregious and obvious regressions. We decided to only rely on the VM-based system for spotting really large regressions (e.g. a rendering algorithm accidentally turning from _O(n)_ into _O(n^2))_. Running in VMs also allowed us to run many tests in parallel to hit the 10 minute feedback cycle.

While building out this system, we had to make a design decision about whether to test components separately (we already had a practice of compiling the C++ editor into a stand-alone binary for tests) or together, end-to-end, in the browser (we already do this for integration testing). We opted for the latter—full in-browser testing with a real GPU. This approach allowed us to capture complex issues involving WebGL rendering, CSS affecting browser layout algorithms, and even accidental misuses of React hooks.

In the future, we could go as far as testing with production backend services, but that requires a lot more engineering investment. [Meta illustrates](https://engineering.fb.com/2016/08/31/web/browserlab-automated-regression-detection-for-the-web/) the complexities of catching issues end-to-end beyond the browser.

### [(2) Hardware system](#_2-hardware-system)

The second system runs on a small array of test laptops that includes older machines, or those that don’t have the latest hardware (think: older MacBooks, outdated Windows laptops, Chromebooks) and allows our developers to schedule custom runs of any test scenario through the same scheduling system in CI. While it has a slower queue, this system accommodates on-demand runs where consistent user-like hardware adds confidence:

A **hot path** is a code path that is performance-critical, something that occurs many times every second.

-   Bisecting a subtle regression that made its way to staging or production
-   Comparing day-over-day changes to performance on realistic devices
-   Experimenting on various approaches to improve the “**hot paths**” such as canvas rendering

We added a handful of features—shared by both systems—on top of that foundation. While these features weren’t critical to how the systems function, they helped us better understand and report out on performance:

-   Two types of test scenarios: those that stress local edits, and those that receive a stream of simulated multiplayer changes
-   A detailed HTML report with recorded metrics that’s easy to link to for internal sharing
-   A CPU profile for any run to help us gain a deeper understanding of the bottlenecks

Overall, our approach combined virtual and real hardware, allowing us to guardrail the majority of regressions while providing the tools to our engineers to collaborate on hot areas or suspect code changes remotely.

## [A tale of two workstreams](#a-tale-of-two-workstreams)

After scoping these two approaches and spending six months on design and development, the system went live in October 2022. From there, we focused on collaborating with a few specific performance-focused projects. Here are two case studies on performance, directly from the teammates who led these workstreams.

### [Improving rendering performance](#improving-rendering-performance)

_Andrew Chan, Software Engineer, Figma_

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAABYlAAAWJQFJUiTwAAACEElEQVQokVWR309ScRjG+Yc0S6utwXS11mq17rTVqK36A+yyteqmy276sfMFoYaJGmoxERihyZEY+QtELRXEI+g5eLSWJasMkU87R9fWxfvevHs+7/O8r6Ve1KiT+Ff1Uo0Gsc9xxy5W1xa2FwtYPQmsnR+wvZzH5tI56fhNg6hiasX/WkudVDMHjY4KNleZCx6dVu8qN3qy3OxNYffFaOsL0do/RNvrKNc6J7C7crQJlYviC82iTJOocOTQmMVoR0WVM+7vXO/JcncwzvORAL2xAQaib/CGQnSEY4hhmWeRME/6/Dg8IaQOmYfSNLdEnnPObRrF3iFQGMB9Wlw7XPEq3BtM8jYZYCblIx3zERsKEgiP45fnGIxPEBqOIAeD+Hvf88CZ5qpU5LRjh2Oiasa3GHGNMly2uH/S7tcJTi4xP5thPDFJODpBX3QG39giQ8nPJKYypFMZfCOL3O7Sae74RZOjakY2OGZk86CixllPhUcjZZILX8kubJKZ1hifXCU+lSOezjL1aZnFnMLySgF5TuXx6Db2/l2s7oMH1RsODfIpd5XL3RXu+H/wanSdmVmFQr5EIbeFktNZya+hKAWKxSKaqrKuasznNfypLe5HdjjfuWuezXR4wrlnbpESZcY+Kiy9kymMyajZLBtaiZK2QUnTTJCmaWzqOmuqhjy3ytNYkfbANy51/aHJeQD8C5JO5hvN0hLBAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/096a3d2d2bd2908e2895ec2114033cbccad07d7a-3264x1399.png?rect=1,0,3262,1399&w=1632&h=700&q=75&fit=max&auto=format)

Unlike most of the applications built in the browser, Figma renders a lot of content using WebGL, a programming interface that allows lower-level control over rendering quality and performance at the cost of complexity. There are unique challenges that come along with this, and we’re constantly exploring new ways to improve performance and rendering speed—especially on slower devices that might not have the most powerful graphics card or CPU.

We recently developed stress test scenarios for rendering complex scenes—like thousands of layers edited by 50 multiplayer users—and took a very deep dive into CPU and GPU profiles. There were some techniques that worked well for some hardware configurations, but added too much overhead on others; based on these investigations, we identified which rendering sub-systems to focus on. After all, there is a wide variety of combinations of different CPUs, GPUs, drivers, operating systems, and even browser behaviors that can affect performance.

We needed to validate every optimization idea as quickly as possible: Is it actually as impactful as we think? Are there any unintended consequences that bring performance down in older or less performant devices? Validating our ideas with runs on real hardware was the key to prioritizing time-consuming engineering work. In benchmarking low-fidelity prototypes, we learned that many ideas that we initially thought were great candidates turned out to be less impactful—or even harmful—on older computers.

After a few rounds of quick experimentation, we turned our attention to time-slicing of rendering, which showed promising results. With Figma’s [multiplayer technology](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)

, in which multiple people can edit a file at once, Figma’s rendering engine has to quickly respond to remote and local edits alike. To do that, the new algorithm prioritizes local edits and operations over rendering changes produced by other users—just like how modern computers allocate computing time among applications. While this approach remained almost unnoticeable on the latest machines, slower devices saw an improvement on perceived frame rate.

Throughout our development process, we constantly benchmarked the optimized code path against the baseline and the original prototype. We wanted to make sure that we maintained the desired increase in FPS and some custom metrics we introduced specifically for this project as we iterated on implementation and fine-tuned UX trade-offs. With our team split across New York and San Francisco, it was crucial to have convenient access to test machines, track progress through periodic benchmarks, and support our intuition with experimental data.

### [Speeding up FigJam](#speeding-up-figjam)

_Sean Marney, Software Engineer, Figma_

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAABYlAAAWJQFJUiTwAAACHUlEQVQokT2S20tTAQDG/Xt66KHXnrc5w65sZaIQRSaV5YUGIhUlknkdRi5NVCi72EXT0JBcZzartTkdOs8Zp5nXqTtnOqdjc45fnKk9fHxvP77v48vaixhIb+jRfG/DkPFUOJvEvJGYbCQ2r2cnpGM7pCO8pONPUIck61he0BFd1mQgvpbNIScrfQBJa8CIntSKkaTnLImBAuLvC4kLZpLBHJRQNkNiLlXOU1QIubyZMiIFz+CeKcYrFrG1dnIfmEl2QE+FjcSnTMR7ikg2lJN8XEHi+XW2xi/wO2jC4rnE0YFCjnw0Yxk7xwfPbWqGe6kb6WFGLiIVMewD0xGtslbzPFHBwmZ3PTFbM7HWZqJdNYj2Ep75b5A3Ucmxr+UcHymm0llCi6OTm30BLIMevk/fJaHkHCbUs7t6mtjMHVThBcrwIMrQIOqXfuaEdt5571E6+wCzvx6Tr5YyXzVPvW20/nDT4FjilXsU+W85u6pR21CrmsOOfI3Ir3YUxwhhxzcUh52Vn/3YfVbui9UUiA1clKzcCjTyRLTR5RVocy3wdnKS6blGtsPmzHRZe6qBxEI+mxN1KGOfUQR7RuvOIbzeNlr8D7ki1pInWbkaaKRWstI19Yl2l0y3R8YpvURdvZyZLANMrZ8gNluG6nyNIowSFvbTLbp66Z9+RKlYTZ7YRL5kxRKop8PfQafbg80Vos83ztxiFUk19//1/gG5qeysbO46iwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/5c9ff903954900c0c3f2d31af3f107c05aba2084-3265x1399.png?rect=0,1,3265,1398&w=1632&h=699&q=75&fit=max&auto=format)

Since sharing our [approach to performance](https://www.figma.com/blog/figma-faster/)

in 2018, we’ve gone through some big changes, including launching another product: FigJam. Figma’s existing rendering and

[multiplayer interaction systems

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAC4jAAAuIwF4pT92AAADN0lEQVQokU2TfVCTBQDGX3FcCsUyNYMQM5UOrInE5MoP6jQ8Qq7+MM8vQLqIvWOT7Tb5OCNheTjcSe5lLx9DoK6WZGAsdjMv3cWJLVAOJG8Camhx+XHVFaUNas/TEd3VH8/z3/P76/kJggYQCv4XDRCuBeYZ/sSKtyaQLv2A197vx0rpBOaWd+IB4yDCC+9CECf/3RCCZjozW2G6wkRgji6EhaYprCz/FS/X3Ebue9ex092N7J52iD1OZLQZsEzagyVWE2IrJEQVn0G4bgyzxV8QpglCKAjNwBXaEGLM97Cu6icWNF9j7Wdues872HHJydKAneJIFYv9Fu76MJepdWlUyWuZUruRq205XHLgMOebO6nU9XGOOM4wzR8UlHuDWGsZgdh4hse/aMC3w1sxMZ6KkZsFcH1zGEfPlaKyoxjb7IVYX/MSkmqfwxo5BemyCs/bX0RCVS4S95dhqdmFCN04hIXG35BhPY99ra30dhvx800VJ+8m8NZ3Zvr7m+n90spjXRbmO/P5qpTKzQ4V06VEZknLuUF+mi/YV/EVWwrVlWY+VDRMYZHpPt5oGoXL5+fA5RbcubGbt8f2sHfgI7q7+/j1pT76hjpZcjKPO5oSmFcfx3wpmtvscdzsiGee9BjFd2O45qCWc6eBMfsmUdHxIwaHR3n9qgdXhg7w4gULW71nWXFimO19AbYNnmb2ST03OZ/l9vonmC0v5hZ5OTPkeL4uxzBPXkr1IT0jDVdmgOXHA/D31uHCVznw+dLgOZuDus8/hrbLjTd9x7CzywWV1IgV1iKsr8lElkONTfVJSG5Mhro5CWktKUiyGRFlCECINgdhaj5Fz+lMuk89yib346z6ZDv17R8wvauBiZ9aGVfrYVTxKCMNA4wta+fqykNUV4tcdnQHo51ZfKZlI1fZTFQaAhQWGIPIkbw40rYV+13rsLshFxuqG/HUO71YfOQc5lf3IKLke4RppyBo/oJC/B2R+nE8YuzHw6UeKC11eLK6DPFvO/CgbgxChG4KyeUXkWmzI/WgE7ElfkTqb0GhvYdw3X0oCicxSxP6z4Tp8/5jRwiCGMTswjuIKhqCUn8ZCs0E/gYRQh9DYJRgRgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4f5f4622404623975baf500a70df1d67afd1bf5d-2784x1566.png?w=2784&h=1566&q=75&fit=crop&crop=focalpoint&auto=format)

### How Figma draws inspiration from the gaming world

Engineering Manager Alice Ching discusses the parallels between developing gaming interfaces and building Figma and FigJam, and why our tech stack is more similar to a game engine’s tech stack than a web stack.



](https://www.figma.com/blog/how-figma-draws-inspiration-from-the-gaming-world/#engineers-as-digital-world-builders)

provided a solid foundation for launch; now that FigJam has been out in the world for over two years, we can see that the optimizations we originally created for Figma aren’t quite optimized for FigJam. For example, users are more likely to quickly add tons of sticky notes and recluster them in FigJam, compared to iterating on designs within a few frames in Figma. As we continued optimizing the system for Figma and FigJam, we had to be careful not to create an optimization that only worked for one part of the product: An optimization benefiting a solo designer creating a complex mockup in Figma may not be helpful for hundreds of people participating in a quick whiteboard session in FigJam.

As we iterated on FigJam in the early days, we’d fix issues reactively, in response to customer reports or changes in production metrics. But we knew there was a better way. With the help of our new testing framework, we wrote tests covering the majority of essential user flows, and automatically found issues before they hit production—most often before they were even merged into the codebase. During the initial setup, we encountered some headaches (no one likes new, flaky tests), but ultimately the tests proved extremely valuable for preventing regressions from completely innocent-seeming code.

For example: Did you know that `background-filter: blur(0)` can fix a variety of Safari rendering bugs but [can also subtly affect its layer compositing speed](https://twitter.com/finerflame/status/1636163183898673152?s=20)? I didn’t, nor did the developer who tried to update our sticky page curl animation’s CSS to make it more realistic and more clearly a sticky note. In fact, I’d go so far as to say that pretty much no one should need to know that.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACuUlEQVQ4jW2TaW/bRhRF+f//QIwCTpoUbdACMVoUaOq4TZwGsesttiQrUmSuIiVS4nAbLsPNOAVlA0GAfjh4M2/uvfO+PK3vG/qupu9a+q77StsgkwRT17FMg5W7xLEtkjiiawdtS98++vpHT9+h9Z3igeZb2opKZkSeT+wsiR2LreuQZyldO7wr+qb8Gvro0+77koEhoFUVKi8oYon0U7J1QuoJMtsn93xUGtE1Bfed4r4rud+dq4d7/4BW9yWqK5CyIvQLfC9mcRZy82vI9GTLxBR8siL0VYyQMalKyeucos7JqwxZpUglqdqSegh0lMRWkrsoZ+KmXNsh7//Z8sdPgsPjkANd8NJJeLuOuA59xpHPPIu4y2K+JILP0ZZZIjDLnGVToU0im3FkcRNaXAUGl77OmWHwcWpyYtgcr13eBT4XYsNI+EyiDbM0Yp7GzNOIaSy4jQSzNGaRZ2gz/wPj1REj7/WOsXfIZPWG29UR0/U75v5H7jYXWGKEE81YJQZB5hLmAUmZkqoSIXN8IVgLgTZxD7iyX3Bu7XNu7nNh7nNpPuXSfMaV9T2frBfc2D8yXv7MrXvAZ+93Fv4bnPAUIQ3qRlIWBcE6wHM9tNHyl13QibHHifGEU2OPfx851Z98i7HHmfEdF+YzxstXOOE5WRWQyRh36aLrBtqt9xtX9g+cW093XFjDZM93DMYzc5h86D/f6a6dl4zdV8zXf7KKR+RKIGXKyvUwDAPN2Lxn7h8yW7/e1UVwhB68Rd8cswj+3hkXwV+Y2w844gwvviZIp4RSR1YbmlZRFiX+yse2HbQgnROkMzbZl51I5CZx4ZAULvFAviQpVmTlhkLFqEZStyXNsAjDdvQdVVmxCbZ4noeWllvySlCqhKqW1E1B3Va7nwfqVlHVNapuaLuO7n9QSpEkKdsw4j/L9roTwRS7WgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/d38808e911b1b25d3958adfca87387eeae2d3d21-1512x946.png?rect=1,0,1511,946&w=1080&h=676&q=75&fit=max&auto=format)

A "GPU layers" mode in Safari that we used used to fix a bug that had to do with a CSS animation of the sticky note corner curl

We don’t usually go looking for CSS changes when we find performance degradations, but thanks to our suite of automated tests, we were able to find this bug while it was still ingesting on our staging platform and make a fix before it ever impacted users. The tests run often enough, on the HEAD of our codebase, that we could see a significant spike in frame lengths for core user behaviors. As a result, we were able to identify the exact code change that caused the issue.

Other times, performance issues may make it further in the process before they’re caught. For example, if a test is temporarily disabled, we won’t get an automated alert about it. Luckily, we can run these tests on older commits, using real hardware in the remotely accessible lab. That means that even these issues can be sussed out, using `git bisect` to narrow down the commits until we get to a single culprit! At one point, we had an optimization that a…certain engineer wrote...with my initials. While the optimization was great for the 50th percentile of frame rate, it had issues in the 90th percentile, only on specific machines. This meant that while our default system couldn’t catch it, a manual run of a few tests would spot the issue within 10 or so runs of the tests.

## [The work ahead](#the-work-ahead)

Performance is a tricky area. Things you expect to be the bottleneck often aren’t. And things you’d never suspect of causing a performance issue can take you by surprise. That’s why it’s so important to establish testing and benchmarking frameworks. We’re now at the point where no one person knows the nuances of all our products and features—and we can’t expect them to! Still, our work impacts our teammates’ work, and vice versa. More than anything, we need to focus on systematically addressing these concerns—it’s essential to maintaining development velocity.

We’ve come a long way since that single MacBook. Since these improvements went live, we’ve focused on empowering domain experts to drive performance-improving initiatives and putting checks in place to ensure it does not regress over time. With the arrival of remote on-demand test runs, detailed reporting, and carefully picked metrics, we can collaborate on performance-sensitive code across teams and time zones. Plus, we can expand on our existing foundation, rather than reinventing the wheel.

If this project sounds interesting, [check out our open roles](https://www.figma.com/careers/)—we’re hiring!

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)