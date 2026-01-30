---
title: "Server-side sandboxing: Containers and seccomp"
source: "https://www.figma.com/blog/server-side-sandboxing-containers-and-seccomp/"
publishedDate: "2023-10-24"
category: "design"
feedName: "Figma Blog"
---

[**Seccomp**](https://en.wikipedia.org/wiki/Seccomp), short for secure computing mode, can restrict the system calls a program is allowed to make.

As a quick refresher, unlike VMs, container isolation happens at the operating system (OS) layer and typically relies on the host’s OS features for security isolation, such as kernel features like namespaces, cgroups, or privilege dropping.

While features like image processing and data parsing are core to applications like Figma, they introduce risks that security teams have to mitigate. It’s expensive and unrealistic to prevent security vulnerabilities entirely, so we use server-side sandboxing (also known as [workload isolation](https://fly.io/blog/sandboxing-and-workload-isolation/)), which we cover in detail [here](https://www.figma.com/blog/server-side-sandboxing-an-introduction/)

. We’ve already

[explored VMs as a sandboxing primitive

![A castle has two large towers on either side of one small tower in the middle. The middle tower projects an image of another castle with a millipede in it.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AHOWplRnYDxAIz48D1xaEmdlFD08DBsbBSMkCE1SEVFWESgpCBkZBDc2CmNgE1dVETQzDTM3Hk1aTGZ/fwCItNB5natnfG1eZDJlZRhvbhZbWxJCQw5dYROdpSGhqiFkahVCQw1SUhBhYRNSUhVKUSxdcWZ1l6GDrcIAk7/Qj7zRiK+7gJh+foU7goIdfH0Yen4Zoakh0Nkq1N0qqbQifYIac3QXbnEeaHFAcIh7gqi2jbrVkL7bAKa+j5+9o5e8upK2spCnf5WeRpygJ6uyI8jTKdniK9/qLNLfK661I5SXI4aRR4SfjYqzwZG8zZa9v5q8rQC/wVW3vl2tvXOiu42atpacs3+qtVHByDLV3yza5Svh7i3d6i3CyS6mr0eXrX2VtaWZu6mgu5SqunGxuVkAz8lcy8FOv7lEqKpJmqdeorV2qrtxucVSzdg52OQv2ucu0tszvMVHq7prpbl9oK9qoKlUsLRIvLs9wb06AMe1X9StRMmmOJuWR4yUU6urULi3VLe8WL7HSsbPNcbOMsDGQbq9Vbu6XLa1WJyhUZOYR7KrO8W2OsC2QgB7YS6ncB+5jDeZoHiOo4uyo1jPpDHOrTnEtD+3szO2szPEtT7QrzzVqDfAp1OZpoGRpIWpnlWpiTCKdy4ANCgMW0QUjIJPk66ikLK3q6Z80Zky3pgd1J8nvqkwvKsw0qIp4Zgd25cot6NrlLCwkLKwkpZqbVokQDQQAFtZEWtqIoiVXYuqmoissZyukbylQ82cHMecJbOkOrKkNsacItCaGsShMqetfoyvsoqpoI+dZnRzKVlWEQCsqB+sqiukrE2OoGmJoHydr3WysUC8ryK3riuoqT+opzm3rSe8riG2rzSksmyNpoWJmmyfqVCrqi+qpSAN80vu8OZ2bwAAAABJRU5ErkJggg==)![A castle has two large towers on either side of one small tower in the middle. The middle tower projects an image of another castle with a millipede in it.](https://cdn.sanity.io/images/599r6htc/regionalized/e88d98cfc3ac526120576da99b498d190286a00a-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Server-side sandboxing: Virtual machines

With so many sandboxing options, it’s daunting to choose the right one. Here, we dive into the virtual machine (VM) security model for sandboxing, including the engineering trade-offs to consider and how we use them at Figma to achieve security isolation.



](https://www.figma.com/blog/server-side-sandboxing-virtual-machines/)

, so we’ll turn our attention to containers and seccomp and unpack some ways we implement container-level security isolation at Figma.

We’ll evaluate container isolation as we did with VMs, mainly considering two security questions:

-   Can a malicious job inside the container break out and affect the host system?
-   Even if it can’t, can it use the container’s permissions to access other systems or otherwise do harm?

## [The container-to-host attack surface](#the-container-to-host-attack-surface)

Three components—runtime implementation, the OS primitives and interface available to the runtime, and runtime configuration—generally make up the attack surface for a container escape. By default, containers are not automatically secure sandboxes because the level of isolation provided depends very much on these three factors. A kernel vulnerability, a bug in the runtime implementation, and/or a runtime misconfiguration might allow a malicious workload to modify files and execute code on its host.

[**Docker**](https://docs.docker.com/desktop/install/linux-install/) is a platform for running container applications.

For example, on Linux-based systems, **Docker** uses the “runC” runtime, which can make use of kernel features such as namespaces, cgroups, privilege dropping, seccomp, mandatory access control via [SELinux](https://github.blog/2023-07-05-introduction-to-selinux/#:~:text=In%20contrast%2C%20SELinux%20MAC%20assigns,context%20of%20a%20Unix%20file.) or [AppArmor](https://apparmor.net/), to provide isolation properties. Docker’s runtime configuration manages how such features are used and configured.

Unlike commodity VM solutions, containers place a much greater responsibility on the user to correctly configure the desired level of isolation. More control over security configuration also means more room to make mistakes. (“With great power…” as they say.) While many container systems have more secure default configurations than before, which may work for some sandboxing use cases, the responsibility is on the user—you—to check and make the necessary changes.

## [Compromised containers](#compromised-containers)

As with VMs, placing a potentially compromised workload in a container is not necessarily sufficient for security. You need to strengthen the container configuration to prevent host takeover, and the overall container infrastructure architecture should limit the impact of a compromised container. For example, one approach could involve containers without mounted network devices, credentials, or access to other data. In this case, you’d place the containers into their own isolated network with an orchestration system to safely pass input into the container and to consume the output through a controlled channel.

## [The seccomp security model](#the-seccomp-security-model)

[**nsjail**](https://nsjail.dev/) is a commandline tool that leverages Linux namespaces, capabilities, filesystem restrictions, cgroups, resource limits, and seccomp to achieve isolation. [**firejail**](https://firejail.wordpress.com/) is a Set owner User ID (SUID) that allows you to sandbox different processes.

As we shared in our [introduction to server-side sandboxing](https://www.figma.com/blog/server-side-sandboxing-an-introduction/)

, the idea behind seccomp-only sandboxes is that many programs do pure computation, and thus do not need dynamic access to the filesystem or to make network calls at all. For these programs, we can rely _just_ on seccomp to restrict the system calls that they need, ideally limiting the actions they can take to allocating memory, producing output, and exiting. Seccomp is a powerful isolation primitive used in many commonly used applications like Android, Chrome, and Firefox. In fact, seccomp can be combined with containerization to provide robust, multilayered sandbox-focused systems, such as [**nsjail**](https://nsjail.dev/) and [**firejail**](https://firejail.wordpress.com/).

![A millipede tried to get through four walls stacked side by side, each with windows at different heights. The millipede tries to get the food that's between the third and fourth wall, but can't make it past the second wall.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAACgUlEQVQokW2S60sUYRTG5z+Kyg/RhyIwM1hdFYkoFEosDCQM0m6CSKBl7PvOzO7OdcfZ3bm8c9mdncvO7qwzs1tZoJlFkeZl9V+JXfuQFTwcOA/nPOd8+GGgefSPjv9n/qU2bLUxEB2A+OBPF8TtTj09CuLD034bxAcY8N8T1Tq+tgGa+52b4W6q9hE0trqJ3RdaRyD6AWvrMNjqRDQ7LR68JTwPI8oSg17Q1kq67sPoOwg+42aOtDjY2Di5A+OfmVqFLr1OuxUY7hDhJlMXRWdW0B5iZElgpBlBGefNR6SLoP+OUFZoeTrjyTDe7SwH62xpPo/GKDtPBqHgL5te0rYvqmgII0sio8zmlVFRGaaMl9D1CeWVULzB2Ut49AXEbehVWfleQRml7Rzj85o94lTOupVzSEtiaZPl5UlF7ZVRL2fOkZ5FawsFJcHZizDcTkX7hGuuqrcldZh2OL6Kq6Wkqveb5SudZdLkGWlaQVcrVo/kPMh4Bq/NFfLXaLQI6p9WGjukU0DlQd1M0DbLelA2hySUMMxepCcxElHZ4nMJjTh2j2pPsDpeEMa0bE8xe4eVRVx30zquW9eNUj9tpThnQbcuW+UzjtWj6YMYxcxx1ITC91nFC6pwM5++r2T6EHtJJW+p+PRqdoGS3hStu6o5lKs8ywczhp+w3QuufR5pAxhFPVnFx1EqYeADCjGZo56y4mPaWM4aMiOJtFQk7RpVFbnSPONCLuL5kBVqS5IzJWpTGKzUM5rKSjlOytGaidtNUG2BYBNEe6lwD6ztgngfhl+hH8PgAx5/g80dPNwm6w3StbBUF71UdNjl9IS+Nozb8Dfkxx3CWl1mT+MJ48Nf5MLweKdezOwAAAAASUVORK5CYII=)![A millipede tried to get through four walls stacked side by side, each with windows at different heights. The millipede tries to get the food that's between the third and fourth wall, but can't make it past the second wall.](https://cdn.sanity.io/images/599r6htc/regionalized/71861a850b40e1ea669b9630d54fd75297a253a7-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

The **syscall interface** is the interface between a program and the kernel.

For the seccomp-only approach, the attack surface consists of two elements: the kernel’s seccomp implementation and **system call (syscall)** interface, and the allowed list of syscalls. Thus, while the attack surface is far simpler to reason about than with hypervisors or containerization primitives, seccomp-only sandboxes come with significant constraints. It is your responsibility to determine whether your program can be safely isolated _just_ with seccomp and which syscalls are safe, while still enabling your program to function correctly.

Often, you’ll need to rewrite your program to not require dangerous syscalls or apply other sandboxing primitives to provide a more robust defense. Identifying which system calls are safe and which are dangerous can get complicated. The original version of seccomp, for instance, allowed only exit, sigreturn, read and write calls, under the theory that truly “pure” compute needed only these to function and that this reduced kernel attack surface enough to be defensible. Unfortunately, many things that engineers consider to be pure compute require more system calls.

In particular, writing code without the ability to allocate heap memory is a pretty drastic change in many developers’ working models—and language runtimes, core libraries, or tracing helpers often want to know the current system time. These operations seem innocuous, but every incremental increase in allowed system calls results in extra kernel attack surface to consider. At Figma, we restrict programs to writing output to already-open file descriptors, exiting, allocating memory and fetching the current time—and thus avoiding complex or less well-covered areas of the system such as the filesystem, network and socket management, or the keychain.

![A crane is moving bricks from a cube over to a blue castle that's currently under construction.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAIAAAC9o5sfAAAACXBIWXMAAC4jAAAuIwF4pT92AAAB8UlEQVQokV3P22vTYBjH8f4lbkvSjVIHwgbqsFNRhgdQEYtueCUTh94o0yrMdtPhbKvLoU3TpKe0TdKcm/Z90zdp07Ibr2Tu0huZf4u0VBDhe/NcfOD3hIYe/l99iPchFvQmJ8JHPt5zMJ4k8nsXZPK2yt9V5TUXnBt6ROivISbhPsQdjXBUzLXmPGeuD7CRhwNr9vN+NJHa/FLhcqrIWwc2uBH8g8cFCIf2Qqu+aMiRroV19BlLmQEWoSvRnWTsWTKZ4K092c8Bzew9HKAJHriEa4WhTngWZisLFX6l2Vx12mctY7ZUOFMsLufL6y9TW093s9v51vsayEHdROtT3GkvVcu3qsxVrTDPpbEPu6sMH1fNmG5EBH6RZO9lKh8TFPuaM/bNbxl4zHqO2XsUoHAoQITRvkbXtnPslvD1SurN8ru3MZZfU/SLsrYiNq8L4gYlU2mjn3FPyNEv6uiUG0BjPDscCjy8C85L1oOGGi81nhwUUlkuUW3EFeVSvXlZbNwsyc8ZxyaDn9TR70mn3MCd4vHPaN7vRVy4JIEXOdhmuqhg0hVpUxTvVOsbBS1LweAQfSf9Yzo4oYc/ir5quveneOjhIw/ro2gLPGa7Ag1MptNgtbQgveKVnbzN0XYtqwiHeo0BEgulMvhkg7UAEX8AducmhpEhuPUAAAAASUVORK5CYII=)![A crane is moving bricks from a cube over to a blue castle that's currently under construction.](https://cdn.sanity.io/images/599r6htc/regionalized/76be9f763b9ef66cba866cf131b2e44c235c87d2-2160x925.png?w=1632&h=699&q=75&fit=max&auto=format)

## [Engineering considerations](#engineering-considerations)

In our [introduction to server-side sandboxing](https://www.figma.com/blog/server-side-sandboxing-an-introduction/)

, we shared some questions for you and your team as you consider different sandboxing solutions and their trade-offs. Let’s evaluate containers and seccomp through that lens.

#### [Environment](#environment)

Out of the box, containers tend to provide a more restricted environment compared to VMs. Some programs may not work at all or may require modification to function correctly; for example, if they have specialized hardware, operating system, or rendering requirements. A seccomp-based approach requires workloads to run in a Linux system with kernel support for it.

#### [Security and performance](#security-and-performance)

While containers and seccomp present security and performance trade-offs, direct comparison is more complicated and nuanced than with VMs.

##### [Containers](#containers)

**gVisor** is an open source sandbox that’s compatible with Linux.

Overall, it’s not straightforward to compare the level of security isolation provided by VMs versus containerization. For example, you could argue that the attack surface of a hypervisor is usually smaller than for an OS kernel, or discuss the number of [kernel exploits](https://en.wikipedia.org/wiki/Dirty_COW) in [recent years](https://securitylabs.datadoghq.com/articles/dirty-pipe-container-escape-poc/) that would have allowed a container escape. On the other hand, there are [bugs](https://www.cve.org/CVERecord?id=CVE-2015-3456) that allow a VM breakout without attacking the hypervisor itself, and newer technologies like **[gVisor](https://gvisor.dev/)** can reduce the attack surface available to containers by interposing its own hardened kernel between the OS kernel and the container process. While VMs should overall provide very strong host-guest isolation with few configuration options, typically you’ll still need to bring your own orchestration and contend with higher performance overhead. By contrast, containerization can also provide quite strong host-guest isolation and can provide fine-grained controls to do so, but will require you to correctly configure everything.

Also, as with VMs, how fine-grained your security isolation needs to be will affect the performance hit of using containers. It will also impact how much container orchestration you need to build. Generally, setting up and tearing down VMs should result in a lower performance cost than VMs. For example, the startup time of nsjail is typically on the order of small fractions of a second, tens to low hundreds of milliseconds. There is, however, still a long tail of startup times, and initializing a language runtime within the container can take substantially longer.

##### [Seccomp](#seccomp)

Similarly, it’s not straightforward to compare the level of security isolation provided by VMs and containerization vs seccomp only; seccomp heavily depends on the kernel’s syscall interface and the allowlist that you configure. For example, allowing the \`ptrace\` syscall is [not safe on older Linux kernel versions](https://man7.org/linux/man-pages/man2/seccomp.2.html) as it can allow a sandbox escape. Overall, it is possible to achieve extremely strong isolation if only minimal syscalls are allowed. Because syscall filtering is cheap, seccomp-only sandboxes can have significantly less performance overhead than hypervisor or container-based solutions.

#### [Development costs and friction](#development-costs-and-friction)

Containers and seccomp come with a hefty set of development and tuning costs, especially compared to VMs.

##### [Containers](#containers)

For adopting container-based sandboxes, there are two major challenges: configuration and orchestration.

Compared to VMs, correctly configuring your security boundaries for a container-based sandbox can require much more technical expertise and experimentation. There’s a long checklist of best practices to follow, such as dropping privileges, putting the process in a new Linux namespace, and restricting mount points, to name a few. It’s important to understand what each of these defenses do, and what guarantees they provide (and what they do not).

Safely sandboxing a complex program requires a deep understanding of how the program functions and how it interacts with system resources—like which filesystem locations they read from and write to, and which capabilities they need—and how to apply available container features to minimize the available attack surface. You may need to iterate by trial-and-error to arrive at a functional and suitably secure configuration, which can add up to a non-trivial amount of work.

Security configuration is only a part of the adoption cost of sandboxing. For both VMs and containers, you may need to build your own system to manage your worker pool, safely input your workload data, and securely extract the output.

##### [Seccomp](#seccomp)

Compared to VMs and containers, which can often be used as a drop-in sandboxing solution, adopting a seccomp-only sandbox requires much more customization. The engineering cost largely depends on how suitable seccomp is for sandboxing your program. To create the seccomp allowlist, you need to either know all possible syscalls that the program can make, or more typically, empirically construct this list by running the program with a tool like \`strace\` on a representative corpus of inputs to exercise all possible codepaths.

Currently, [one notable constraint](https://lwn.net/Articles/822256/) of seccomp is that it can only filter syscall arguments at the top level and can’t dereference pointer arguments or do other more complicated argument processing. Consequently, seccomp can’t selectively filter some syscalls such as \`openat\` based on the resource being opened because it requires dereferencing a pointer argument. In turn, you may have to rewrite the program to be more amenable to seccomp so it makes all the risky syscalls before doing the dangerous work of processing user input. (We discuss an example of how we did this in RenderServer further below.) Of course, rewriting the program is only an option if you have the source code and may not be feasible for many commodity programs.

One other benefit of the seccomp-only approach is that you can typically invoke the sandboxed program directly without having to worry about additional orchestration or plumbing.

#### [Maintenance and operational overhead](#maintenance-and-operational-overhead)

Both containers and seccomp take operational resources, and engineers outside the security team may need to update the program or develop new features for it. While this is less of an issue for containers, seccomp allowlists can be brittle. New program behavior may require adding more syscalls to the allowlist if they don’t significantly increase attack surface or significant rewriting if the new syscalls do add unacceptable attack surface.

Also, monitoring and debugging seccomp-only sandboxes can be particularly tricky. Kernel logs will indicate when a process is killed by seccomp and which syscall caused the problem, without providing much more context. It can be laborious and frustrating to debug and reproduce the issue. There are a number of reasons why it might fail: an overlooked syscall in a seldom-used codepath; recently-introduced behavior that requires a new syscall; a system change—like an upgraded library or kernel; an architectural difference between test environments and production; even a very rare instance in which the program was maliciously exploited. Good continuous integration (CI) testing for seccomp can help catch some but not all problems like this early.

## [Container-based sandboxing at Figma](#container-based-sandboxing-at-figma)

At Figma, we now use [nsjail](https://github.com/google/nsjail) for use cases where container-level security isolation is appropriate. But arriving there has been a journey, and we’ve had to evaluate our own set of trade-offs.

### [Using an nsjail sandbox](#using-an-nsjail-sandbox)

Our primary use case for nsjail is to isolate RenderServer, a server version of the Figma editor written in C++ that we use to provide features like thumbnailing. RenderServer has a complex set of features, leverages Graphics Processing Units (GPU) acceleration to perform rendering, and is used in multiple backend services. When we first thought about how to sandbox RenderServer, we briefly considered [Docker](https://www.docker.com/), but soon realized that it would add significant upfront development work and complexity. For example, we would need to create a new service that sandboxes the RenderServer binary inside a secure Docker configuration, create an orchestration system to manage the service, and re-architect various services to make a network call to the RenderServer service instead of invoking the binary directly. A separate service might be a reasonable long term investment but didn’t allow us the flexibility to explore different options based on evolving needs. Instead, we adopted nsjail as a drop-in solution so that we could focus our efforts on securely configuring it for our needs.

This configuration leverages all of the sandboxing capabilities that nsjail offers. For each user request, nsjail starts a new RenderServer process in a new user, pid, mount, and network namespace with no network access. Nsjail will also restrict the RenderServer process to only be able to access specific filesystem mount points, such as the input file, libraries, and output folder. And of course, nsjail uses seccomp-bpf to enforce a strict list of syscalls.

When we first rolled out the sandboxed version of RenderServer to production, good monitoring and feature flag control allowed for a smooth deployment. On initial deployment, we saw a low but still significant number of job errors and after investigation, we observed that many errors were correlated with input files that contained large images and resulted in output files that were exactly 1 MB in size. Very suspicious! It turned out that we had not read the nsjail documentation carefully enough and that by default, `rlimit_fsize` was set to 1 MB. One quick PR later, our sandboxed RenderServer was functioning normally.

Not surprisingly, we also had to update our seccomp allowlist several times during the rollout. We hit very rare codepaths in the complex RenderServer codebase—which serves user traffic at large scale—that we didn’t encounter during testing or internal use.

### [Using seccomp only](#using-seccomp-only)

Eventually, we explored a seccomp-only sandbox approach for certain RenderServer use cases that did not require GPU acceleration both to reduce performance overhead and the complexity of operating nsjail. The main challenge at the outset was that we could not sufficiently restrict RenderServer’s filesystem access with seccomp alone, due to file I/O being spread out in many places across various feature codepaths in RenderServer.

Here is a basic example to illustrate the problem: Suppose we want to use RenderServer to help users export their Figma file as an SVG. In this scenario, the risky step that must be sandboxed is the processing of the Figma file, which might contain malicious input planted by an attacker who wants to hack Figma. A combination of RenderServer and various third-party libraries written in memory-unsafe languages, mostly in C++, handle processing. RenderServer will first finish generating the preview image before writing it to an output file. In case RenderServer becomes compromised by the image processing step, we want to apply a seccomp filter before image processing to prevent the compromised RenderServer process from doing malicious things such as opening and reading other sensitive files on the system. However, if we do that—by configuring our seccomp filter to prevent syscalls like `openat`—RenderServer would stop working correctly because seccomp would also terminate it upon opening other files such as its designated output file.

We refactored RenderServer to reorder all file opens so that they occur before any image processing happens on potentially dangerous user input—which was a lot of work. Ultimately, the refactor allowed us to add a restrictive seccomp filter via libseccomp to prevent RenderServer from doing anything else other than read from and write to only resources that it’s allowed to access. This new version of RenderServer is far easier to test and debug, and it runs significantly faster than the previous iteration using nsjail. But, it also introduces constraints on engineers who wish to add new features or improvements to RenderServer. This locks RenderServer into being a single-threaded application, and means we can’t dynamically load fonts or images later in the runtime.

Container-based and seccomp sandboxes can be lighter weight solutions for application security isolation but come with important trade-offs for development and maintenance overhead. For more on different sandboxing options, read our [introduction to server-side sandboxing](https://www.figma.com/blog/server-side-sandboxing-an-introduction/)

and our

[deep dive on VMs

![A castle has two large towers on either side of one small tower in the middle. The middle tower projects an image of another castle with a millipede in it.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AHOWplRnYDxAIz48D1xaEmdlFD08DBsbBSMkCE1SEVFWESgpCBkZBDc2CmNgE1dVETQzDTM3Hk1aTGZ/fwCItNB5natnfG1eZDJlZRhvbhZbWxJCQw5dYROdpSGhqiFkahVCQw1SUhBhYRNSUhVKUSxdcWZ1l6GDrcIAk7/Qj7zRiK+7gJh+foU7goIdfH0Yen4Zoakh0Nkq1N0qqbQifYIac3QXbnEeaHFAcIh7gqi2jbrVkL7bAKa+j5+9o5e8upK2spCnf5WeRpygJ6uyI8jTKdniK9/qLNLfK661I5SXI4aRR4SfjYqzwZG8zZa9v5q8rQC/wVW3vl2tvXOiu42atpacs3+qtVHByDLV3yza5Svh7i3d6i3CyS6mr0eXrX2VtaWZu6mgu5SqunGxuVkAz8lcy8FOv7lEqKpJmqdeorV2qrtxucVSzdg52OQv2ucu0tszvMVHq7prpbl9oK9qoKlUsLRIvLs9wb06AMe1X9StRMmmOJuWR4yUU6urULi3VLe8WL7HSsbPNcbOMsDGQbq9Vbu6XLa1WJyhUZOYR7KrO8W2OsC2QgB7YS6ncB+5jDeZoHiOo4uyo1jPpDHOrTnEtD+3szO2szPEtT7QrzzVqDfAp1OZpoGRpIWpnlWpiTCKdy4ANCgMW0QUjIJPk66ikLK3q6Z80Zky3pgd1J8nvqkwvKsw0qIp4Zgd25cot6NrlLCwkLKwkpZqbVokQDQQAFtZEWtqIoiVXYuqmoissZyukbylQ82cHMecJbOkOrKkNsacItCaGsShMqetfoyvsoqpoI+dZnRzKVlWEQCsqB+sqiukrE2OoGmJoHydr3WysUC8ryK3riuoqT+opzm3rSe8riG2rzSksmyNpoWJmmyfqVCrqi+qpSAN80vu8OZ2bwAAAABJRU5ErkJggg==)![A castle has two large towers on either side of one small tower in the middle. The middle tower projects an image of another castle with a millipede in it.](https://cdn.sanity.io/images/599r6htc/regionalized/e88d98cfc3ac526120576da99b498d190286a00a-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Server-side sandboxing: Virtual machines

With so many sandboxing options, it’s daunting to choose the right one. Here, we dive into the virtual machine (VM) security model for sandboxing, including the engineering trade-offs to consider and how we use them at Figma to achieve security isolation.



](https://www.figma.com/blog/server-side-sandboxing-virtual-machines/)

.

If you enjoy this type of technical work, consider [working with us on the Figma security team](https://www.figma.com/careers/#job-openings)!