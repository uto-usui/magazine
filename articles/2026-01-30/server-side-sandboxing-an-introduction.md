---
title: "Server-side sandboxing: An introduction"
source: "https://www.figma.com/blog/server-side-sandboxing-an-introduction/"
publishedDate: "2023-10-24"
category: "design"
feedName: "Figma Blog"
---

**Image processing, parsing, compression, and thumbnailing**—creating a small thumbnail image of a large design file—are common image or data processing operations.

Often, the libraries that perform these operations are written in **memory-unsafe languages** like C++. Many popular libraries have a history of memory corruption vulnerabilities.

[**ImageTragick**](https://imagetragick.com/) was a famous, critical security vulnerability in the commonly used [**ImageMagick**](https://imagemagick.org/index.php) library discovered in 2016. It allowed remote code execution in any services that ran ImageMagick on user-provided images server-side.

Buggy software is a fact of life, security threats are inevitable, and it’s nearly impossible to prevent all vulnerabilities. To power services for users, feature-rich apps rely on potentially risky software like image processing, **parsing, compression**, **and thumbnailing libraries** inside their infrastructure. Third parties frequently implement this software—which is seldom designed to handle hostile user input—in **memory-unsafe languages**. It’s no surprise that critical vulnerabilities like **ImageTragick** have appeared in the wild.

Fortunately, application-level sandboxing (also known as [workload isolation](https://fly.io/blog/sandboxing-and-workload-isolation/)) can be a powerful defense in these scenarios. In the past, sandboxing technologies were often expensive, immature, and operationally fickle, so only the most resourced security organizations could leverage them effectively at scale. This is one of the reasons why teams significantly underused sandboxing, despite its effectiveness as a pillar of a layered defense-in-depth architecture. Sandboxing remains an active area of research, and security teams have recently invested in developing more usable and stable solutions. Today, there is a surfeit of ways to virtualize, contain, and isolate processing.

With so many options, it can be daunting to choose the right combination of sandboxing techniques and make informed trade-offs for isolating your workloads. We’ve had to make these same trade-offs and experiment with deploying different primitives at Figma. In this article, we’ll explain what sandboxing is and why you might want to use it. We’ll cover a high-level overview of several common sandboxing primitives, including each of their inner workings and security properties, and provide a lightweight questionnaire to help you think about how to evaluate trade-offs when considering different sandboxing approaches.

## [Server-side sandboxing, explained](#server-side-sandboxing-explained)

Some critical features in modern SaaS applications introduce inherent risks that security teams have to mitigate. For example, at Figma, we create tools for product teams to brainstorm, create, and ship designs together. On the client side, we rely on various browser sandboxing technologies, like [WebAssembly](https://webassembly.org/docs/security/), and techniques to provide a secure and responsive editing experience. But on the server side, we rely on our own libraries to provide the design features our users need, such as RenderServer, a stripped-down server-side version of the Figma editor written in C++. We also use third-party libraries to process user-generated graphical data, which could contain malicious input.

At Figma, we don’t want to run jobs on potentially malicious input directly inside our infrastructure. If we did, one serious bug could allow that job to access user data from other jobs, make requests to other production services, or move laterally and compromise additional components of production. One solution would be to rewrite all of our unsafe code in a memory-safe language and leverage program analysis techniques to prove its correctness and security properties. But as with many other complex real-world systems, this would require pulling resources away from other critical security projects and in turn present a number of other trade-offs. (Even then, there’s still a risk that we might inadvertently introduce a security bug anyway, because no methods are foolproof. We’re all human.)

It’s expensive and unrealistic to rely entirely on preventing security vulnerabilities. Instead, we also use sandboxing to mitigate the impact of those bugs when they do come up. While there are many different strategies we could use, sandboxing also allows us to minimize and better manage the external interfaces and resources that a compromised workload can access, effectively containing an attack to the affected system.

![On the left, a diagram explains virtual machines with a castle (labeled infrastructure) that leads up to a tower (hypervisor) and then up again to three different guest OS systems. On the right, a diagram explains containers, with a castle as infrastructure that leads up to an operating system bridge, then up again to three different container engines.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAAC4UlEQVQokT2Q7U8ScQDH739IM4vD4+54ulb2MFu11uteVFttLd+0tXLVH9DWapVMxQO5+/3ugUsQFERUJEE8HHrGRAxwenIH3F0T/5pGtd5+t8/3CWkBvMpglRBWD2F7IeyAwRqMo8xgNdbRAbgJcQPg7dCQHkA12qbRNj2AdhiHyREmRyKGROg5l1Zw6WmyWXBq687WsrO55dIzTkMkTIB3gOM4ZKsHBxrB8w26vxG4oDFDJsRNjkDMGGnue8wjr7XjNg695k+PpXjME8rY8ZjfCAvgbeA4ZC5W2b59tq86c+5nqP+EQQ3wF46QvxR394jqHni7OnXWpM5q3q5KWbLbkohebRZrBwdUf9+PCbQ6YdP8/Z0Zm/EvWSB+JcnTTfep4j498HYPvGeKp5t3W3HS5HqbWyx2Qg9WxgfXPrnyn8iqb1ANou1/MMRNnrBmyfY82UgQRwnCjJO9zD+kAfE6dBRZNEujqz5sxYet0ugWsB9x/+GeDa4BRzlor8wMtSFu/RUh3oF4hcPWxKF1YN+atMt++zJAMyJaE3qHIwYkdOhpQkoNkTX/pfq0TWVcTXhZh24DEi1IKpx3RaQ2GWd5AtudxDKsKy1SFcFjcCTShNRu+NFG5FURPi5N3SxN39rknxZmX+2FH+jQcwyvZqVnkei7jPikzNzZYe4lw6Pfom9l6WGL8yKH3MhqyhfOyWIqLoW/SJJPWFqUvufyifcqd63O311cmgG5kpien49NzMX9cGUFrMvZxAeNH0Ya/O10RgCKQcvqVEb2r23RxSYsnWTTkyp/oybcT2VjjGLRshrIKYHcLl3UQUnLpP1N4TpyyI9k05NheQ9sbPO5OT4/z278kAo7+cUPKn+9IdxdXQ7x8j5bUMLFVFhOs4WyWNhdX/yoCcOIyl0pRV8sLfhi0Y/J2MtkfCwW+7q8MK5EnmvcZZW7JkdfJxemotHPifhYIv5mbu5rasG3HRnVeeo3202fDoYM8egAAAAASUVORK5CYII=)![On the left, a diagram explains virtual machines with a castle (labeled infrastructure) that leads up to a tower (hypervisor) and then up again to three different guest OS systems. On the right, a diagram explains containers, with a castle as infrastructure that leads up to an operating system bridge, then up again to three different container engines.](https://cdn.sanity.io/images/599r6htc/regionalized/5ca4c6c72fbadec0de1fae64dc43b905fe40a597-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

## [Common sandboxing approaches](#common-sandboxing-approaches)

[**Seccomp**](https://en.wikipedia.org/wiki/Seccomp), short for secure computing mode, can restrict the system calls a program is allowed to make.

There are several approaches to building a security sandbox: virtual machines (VMs), containers, and secure computing mode (**seccomp**). These solutions get complicated quickly, so we’re sharing a brief overview here before we dive into the pros and cons of [VMs](https://www.figma.com/blog/server-side-sandboxing-virtual-machines/)

and

[containers and seccomp

![The inside of a castle tower has four rooms on two different levels, each with their own window. A millipede tries to get to the center of the tower, can't access the drawbridge.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AEwvEVFFKltWMEtEG3JUDs6BC/iKBv2GBPyJBPaMB/SLCPuHBP6GBPuIBdqCCIVcDFJIGmBbMVJKMDMlFgBkRyKKbDKdgjd2bzhuZyuvhh3jjw/2iQfyhgbXfwjTfQjvgwb6hwbtjArBiBd8byl1cTichDmJbzhLPysAelgorHwsvZI+iYZgaXNRlIo0xpcd3IwR3IYNt3wOtHsN3YMM5YcO0JEXoYsucXtThYdjuZJCqn4yY1EyAG5LHYZeHo1rMGloVFtmT4SBNqaNIbOCGcGOH7ekJ7ikJsaNHrx+GayIHYiBMl9sU2ZqWopsNINeIlNBJQBMLw1EMBBENBc3NSVKTSl+eCaagxyeeyCnkEOtuWawuWCsjzmidR+efxyEeiRQVCo1NiZAMxk9LRIsIBAATDEPWUEaZk8kS0UsVVYlkoghsZYeqYYok41kkK+plLCakYZOn3cisY4em44hXV4gQ0EiW0wgUkIdMCUUAGpMIpluKa6GPX14XWVuS5SOMLKYIZ9/JIJ+YIOmtYamqH54T5VxIbORIJyRKmtyO3NzRKOINZZ4LFhIJwB7WyyufSu+lT+Oi2Zqd1iJhjmhiCGSciOAfWKGqbeJqaiLgFKneiG1jB+UhC5yc0KIgUi3ljOtii5vWzAAbFAjh2giknopdXM8Y2c8iHgvrn8bsXokm5F1jbTFk7SurpZT0IgbyIoal3srbGMvdGUnkXgfinIkXU4nAFA0DUE0DT42DTw3EltLG6VxG9yDDeCIHrqec5m3wJ+2psedSuyKEeaHDa53HmNQHj81EEE3C0A2DzUpEABSLAIvGwIiEwEuGwRwRAnOdgn5hgX0iRPQmFSqrJuvq4nWlzj2iQr6hwXSdwx4Sw4zIAYkFAIoFgIyGwPRKANfCuC/aQAAAABJRU5ErkJggg==)![The inside of a castle tower has four rooms on two different levels, each with their own window. A millipede tries to get to the center of the tower, can't access the drawbridge.](https://cdn.sanity.io/images/599r6htc/regionalized/33740a40342c74e22034a5ba24de386948311d5e-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Server-side sandboxing: Containers and seccomp

Containers and secure computing mode (seccomp) are sandboxing primitives that offer a lighter weight alternative to virtual machines (VMs). Here we cover the differences between them, and how we use both at Figma to achieve security isolation.



](https://www.figma.com/blog/server-side-sandboxing-containers-and-seccomp/)

in more detail.

![Many arched windows show different scenes, including ladders, stairs, and a millipede behind bars.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAIAAAC9o5sfAAAACXBIWXMAAC4jAAAuIwF4pT92AAACMElEQVQokQElAtr9AJVpGa2EHa6FIYtpHnNhF5F8FZqCFYd/GJOhQ53Amo26y3iJkIRbKqZcB6BaB5RqDrGtH8XGJbavI6OoJACSZhireRyqeyCGYB14UA+oZwm2bwmVbw6bniqqw2mSuKZug4luVzGTYRKRYRN+ZBSdmB24siGxqiOhqCUAblEfjW42jXE7eFcllVYM0XAE3XcEtHAIlYkXn601iqBdZ3BZfGIspXgboncegmcdhXIXpYcUo40Xgn8ZAExTT3KEhXeKiGxlR55fEdl1BN13BLZsBo16EpudII2OJm1lJIdlHat5HaN1IYReHoxaD7pvCLBsCHZOCABggJOCrL+Rt6eFjVGLYBSwZAizZQiXYgqTgBWnnB2jmB6EfR13ZSWJbzyDbD16ViOtYgvheQTYcwSqXAMAbI+kjrSrq8d1mKEyeWIUkWITmGcUf2ATh3kWno8bpZ0gio4raXVWdYqPdYiCdWY6sGYM3XcF2nYFvGcEAFdva4uiYqa3O4uNHIFpF6J4G6d7HohoG3pmFZBzEpV6Enl3MW+Lh4ixvJO0joiIO5FmD7JzC7JxC4tUBgBdZiiXmymlpyGBfRiFZheodhuodh6IYBqEVw6vaAetZgZ9XyxxhoWStJipwFmUmyaDehahjxmejBhsXg8AiYwbsZ8atqAZl4wahGkXlGQYkWMZglYUpF8K23cE2HUEoWgjc3hkhp1gnqwwkJcdlZQdtK8isKshiIYaSk7gX2Bs2boAAAAASUVORK5CYII=)![Many arched windows show different scenes, including ladders, stairs, and a millipede behind bars.](https://cdn.sanity.io/images/599r6htc/regionalized/a55afafc1ff2178db907237a195c318d7ecc91bf-2160x925.png?w=1632&h=699&q=75&fit=max&auto=format)

### [Virtual machines](#virtual-machines)

A VM is a guest virtual computer that behaves like a real physical computer with its own memory, disk, and CPU. VMs have been around for decades, and today, there are various types of virtualization and different approaches to implementation. Typically, the interface between the guest VM and the host system is a **hypervisor** which manages execution of the guest VM and provides an interface for the guest to access host hardware resources. At Figma, we’ve primarily used [**Firecracker**](https://firecracker-microvm.github.io/) as an isolation primitive via our use of [AWS Lambdas](https://aws.amazon.com/lambda/).

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AHOWplRnYDxAIz48D1xaEmdlFD08DBsbBSMkCE1SEVFWESgpCBkZBDc2CmNgE1dVETQzDTM3Hk1aTGZ/fwCItNB5natnfG1eZDJlZRhvbhZbWxJCQw5dYROdpSGhqiFkahVCQw1SUhBhYRNSUhVKUSxdcWZ1l6GDrcIAk7/Qj7zRiK+7gJh+foU7goIdfH0Yen4Zoakh0Nkq1N0qqbQifYIac3QXbnEeaHFAcIh7gqi2jbrVkL7bAKa+j5+9o5e8upK2spCnf5WeRpygJ6uyI8jTKdniK9/qLNLfK661I5SXI4aRR4SfjYqzwZG8zZa9v5q8rQC/wVW3vl2tvXOiu42atpacs3+qtVHByDLV3yza5Svh7i3d6i3CyS6mr0eXrX2VtaWZu6mgu5SqunGxuVkAz8lcy8FOv7lEqKpJmqdeorV2qrtxucVSzdg52OQv2ucu0tszvMVHq7prpbl9oK9qoKlUsLRIvLs9wb06AMe1X9StRMmmOJuWR4yUU6urULi3VLe8WL7HSsbPNcbOMsDGQbq9Vbu6XLa1WJyhUZOYR7KrO8W2OsC2QgB7YS6ncB+5jDeZoHiOo4uyo1jPpDHOrTnEtD+3szO2szPEtT7QrzzVqDfAp1OZpoGRpIWpnlWpiTCKdy4ANCgMW0QUjIJPk66ikLK3q6Z80Zky3pgd1J8nvqkwvKsw0qIp4Zgd25cot6NrlLCwkLKwkpZqbVokQDQQAFtZEWtqIoiVXYuqmoissZyukbylQ82cHMecJbOkOrKkNsacItCaGsShMqetfoyvsoqpoI+dZnRzKVlWEQCsqB+sqiukrE2OoGmJoHydr3WysUC8ryK3riuoqT+opzm3rSe8riG2rzSksmyNpoWJmmyfqVCrqi+qpSAN80vu8OZ2bwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/e88d98cfc3ac526120576da99b498d190286a00a-3264x1836.png?w=3264&h=1836&q=75&fit=max&auto=format)

### [Containers](#containers)

[**nsjail**](https://nsjail.dev/) is a commandline tool that leverages Linux namespaces, capabilities, filesystem restrictions, cgroups, resource limits, and seccomp to achieve isolation.

Unlike VMs, container isolation happens at the operating system (OS) layer and typically relies on the host’s OS features for isolation, such as kernel features like namespaces, cgroups, or privilege dropping. Depending on the implementation, containers tend to require less performance overhead compared to VMs because they can call the host OS’s system calls (syscalls) directly rather than having to execute in the context of a full hypervisor. At Figma, in use cases where container-level security isolation is appropriate, we primarily use [**nsjail**](https://nsjail.dev/).

### [Seccomp](#seccomp)

A seccomp-driven approach recognizes that many isolatable programs are doing pure computation, and thus do not need dynamic access to any disk or network at all. This approach significantly reduces the set of features needed and associated performance overhead to achieve the desired level of isolation. To do this safely at Figma, we restrict the system calls the program is allowed to make using the seccomp feature built into the kernel, producing an allowlist of permitted operations by the underlying program. Ideally, this limits the program to simply allocate memory, produce its output, and exit. We built this directly using [libseccomp](https://github.com/seccomp/libseccomp) into portions of the Figma codebase.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AEwvEVFFKltWMEtEG3JUDs6BC/iKBv2GBPyJBPaMB/SLCPuHBP6GBPuIBdqCCIVcDFJIGmBbMVJKMDMlFgBkRyKKbDKdgjd2bzhuZyuvhh3jjw/2iQfyhgbXfwjTfQjvgwb6hwbtjArBiBd8byl1cTichDmJbzhLPysAelgorHwsvZI+iYZgaXNRlIo0xpcd3IwR3IYNt3wOtHsN3YMM5YcO0JEXoYsucXtThYdjuZJCqn4yY1EyAG5LHYZeHo1rMGloVFtmT4SBNqaNIbOCGcGOH7ekJ7ikJsaNHrx+GayIHYiBMl9sU2ZqWopsNINeIlNBJQBMLw1EMBBENBc3NSVKTSl+eCaagxyeeyCnkEOtuWawuWCsjzmidR+efxyEeiRQVCo1NiZAMxk9LRIsIBAATDEPWUEaZk8kS0UsVVYlkoghsZYeqYYok41kkK+plLCakYZOn3cisY4em44hXV4gQ0EiW0wgUkIdMCUUAGpMIpluKa6GPX14XWVuS5SOMLKYIZ9/JIJ+YIOmtYamqH54T5VxIbORIJyRKmtyO3NzRKOINZZ4LFhIJwB7WyyufSu+lT+Oi2Zqd1iJhjmhiCGSciOAfWKGqbeJqaiLgFKneiG1jB+UhC5yc0KIgUi3ljOtii5vWzAAbFAjh2giknopdXM8Y2c8iHgvrn8bsXokm5F1jbTFk7SurpZT0IgbyIoal3srbGMvdGUnkXgfinIkXU4nAFA0DUE0DT42DTw3EltLG6VxG9yDDeCIHrqec5m3wJ+2psedSuyKEeaHDa53HmNQHj81EEE3C0A2DzUpEABSLAIvGwIiEwEuGwRwRAnOdgn5hgX0iRPQmFSqrJuvq4nWlzj2iQr6hwXSdwx4Sw4zIAYkFAIoFgIyGwPRKANfCuC/aQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/33740a40342c74e22034a5ba24de386948311d5e-3264x1836.png?w=3264&h=1836&q=75&fit=max&auto=format)

## [Finding the best fit](#finding-the-best-fit)

Sandboxing is not without its challenges. The options outlined above all make different trade-offs between security, ease of development and maintenance, and runtime performance. For instance, while a seccomp-driven approach offers generally strong security properties and minimal runtime overhead, it may involve substantial initial development cost. Meanwhile, a container-driven approach has more potential security pitfalls and often reduced runtime performance, but is likely far easier to ship.

Below we’ve outlined the questions that will help you match your team’s needs to the right sandboxing solution. Once you have a sense of the different high-level trade-offs, our in-depth discussions on [VMs](https://www.figma.com/blog/server-side-sandboxing-virtual-machines/)

and

[containers and seccomp

![The inside of a castle tower has four rooms on two different levels, each with their own window. A millipede tries to get to the center of the tower, can't access the drawbridge.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AEwvEVFFKltWMEtEG3JUDs6BC/iKBv2GBPyJBPaMB/SLCPuHBP6GBPuIBdqCCIVcDFJIGmBbMVJKMDMlFgBkRyKKbDKdgjd2bzhuZyuvhh3jjw/2iQfyhgbXfwjTfQjvgwb6hwbtjArBiBd8byl1cTichDmJbzhLPysAelgorHwsvZI+iYZgaXNRlIo0xpcd3IwR3IYNt3wOtHsN3YMM5YcO0JEXoYsucXtThYdjuZJCqn4yY1EyAG5LHYZeHo1rMGloVFtmT4SBNqaNIbOCGcGOH7ekJ7ikJsaNHrx+GayIHYiBMl9sU2ZqWopsNINeIlNBJQBMLw1EMBBENBc3NSVKTSl+eCaagxyeeyCnkEOtuWawuWCsjzmidR+efxyEeiRQVCo1NiZAMxk9LRIsIBAATDEPWUEaZk8kS0UsVVYlkoghsZYeqYYok41kkK+plLCakYZOn3cisY4em44hXV4gQ0EiW0wgUkIdMCUUAGpMIpluKa6GPX14XWVuS5SOMLKYIZ9/JIJ+YIOmtYamqH54T5VxIbORIJyRKmtyO3NzRKOINZZ4LFhIJwB7WyyufSu+lT+Oi2Zqd1iJhjmhiCGSciOAfWKGqbeJqaiLgFKneiG1jB+UhC5yc0KIgUi3ljOtii5vWzAAbFAjh2giknopdXM8Y2c8iHgvrn8bsXokm5F1jbTFk7SurpZT0IgbyIoal3srbGMvdGUnkXgfinIkXU4nAFA0DUE0DT42DTw3EltLG6VxG9yDDeCIHrqec5m3wJ+2psedSuyKEeaHDa53HmNQHj81EEE3C0A2DzUpEABSLAIvGwIiEwEuGwRwRAnOdgn5hgX0iRPQmFSqrJuvq4nWlzj2iQr6hwXSdwx4Sw4zIAYkFAIoFgIyGwPRKANfCuC/aQAAAABJRU5ErkJggg==)![The inside of a castle tower has four rooms on two different levels, each with their own window. A millipede tries to get to the center of the tower, can't access the drawbridge.](https://cdn.sanity.io/images/599r6htc/regionalized/33740a40342c74e22034a5ba24de386948311d5e-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Server-side sandboxing: Containers and seccomp

Containers and secure computing mode (seccomp) are sandboxing primitives that offer a lighter weight alternative to virtual machines (VMs). Here we cover the differences between them, and how we use both at Figma to achieve security isolation.



](https://www.figma.com/blog/server-side-sandboxing-containers-and-seccomp/)

will help you better understand more specific engineering considerations.

##### [Environment](#environment)

-   Does your workload need to run inside a specific OS or other specialized environment?

##### [Security and performance](#security-and-performance)

-   How strong of a sandbox do you need?
-   How much attack surface are you willing to accept?
-   What level of isolation do you need? (e.g. Do you need to isolate each job? Or only between users? Or only between projects, teams, or organizations among your users?)
-   Are you willing to accept some trade-offs between level of isolation and performance, and developmental complexity?
-   How much latency can you tolerate?
-   What is your budget for compute and other infrastructure costs?

##### [Development costs and friction](#development-costs-and-friction)

-   Do you have the expertise to modify your workload code to craft a tailor-made sandboxing solution, or do you need an off-the-shelf, drop-in solution? Is something between these two extremes acceptable?
-   How much development cost and complexity are you willing to take on?

##### [Maintenance and operational overhead](#maintenance-and-operational-overhead)

-   Is your workload code under active development?
-   Are you willing to run your own service, and do you have the resources to do it?
-   Will another team own this system, and are they willing to bear the operational overhead and additional complexity?
-   What level of debugging access will engineers require?

Isolating dangerous or insecure workloads is a key tool for security teams. At Figma, sandboxing allows us to build valuable new product features for users while minimizing both risk to our infrastructure and the cost of each new feature. For a more in-depth look at sandboxing primitives, check out our guide to [VMs](https://www.figma.com/blog/server-side-sandboxing-virtual-machines/)

and

[containers and seccomp

![The inside of a castle tower has four rooms on two different levels, each with their own window. A millipede tries to get to the center of the tower, can't access the drawbridge.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AEwvEVFFKltWMEtEG3JUDs6BC/iKBv2GBPyJBPaMB/SLCPuHBP6GBPuIBdqCCIVcDFJIGmBbMVJKMDMlFgBkRyKKbDKdgjd2bzhuZyuvhh3jjw/2iQfyhgbXfwjTfQjvgwb6hwbtjArBiBd8byl1cTichDmJbzhLPysAelgorHwsvZI+iYZgaXNRlIo0xpcd3IwR3IYNt3wOtHsN3YMM5YcO0JEXoYsucXtThYdjuZJCqn4yY1EyAG5LHYZeHo1rMGloVFtmT4SBNqaNIbOCGcGOH7ekJ7ikJsaNHrx+GayIHYiBMl9sU2ZqWopsNINeIlNBJQBMLw1EMBBENBc3NSVKTSl+eCaagxyeeyCnkEOtuWawuWCsjzmidR+efxyEeiRQVCo1NiZAMxk9LRIsIBAATDEPWUEaZk8kS0UsVVYlkoghsZYeqYYok41kkK+plLCakYZOn3cisY4em44hXV4gQ0EiW0wgUkIdMCUUAGpMIpluKa6GPX14XWVuS5SOMLKYIZ9/JIJ+YIOmtYamqH54T5VxIbORIJyRKmtyO3NzRKOINZZ4LFhIJwB7WyyufSu+lT+Oi2Zqd1iJhjmhiCGSciOAfWKGqbeJqaiLgFKneiG1jB+UhC5yc0KIgUi3ljOtii5vWzAAbFAjh2giknopdXM8Y2c8iHgvrn8bsXokm5F1jbTFk7SurpZT0IgbyIoal3srbGMvdGUnkXgfinIkXU4nAFA0DUE0DT42DTw3EltLG6VxG9yDDeCIHrqec5m3wJ+2psedSuyKEeaHDa53HmNQHj81EEE3C0A2DzUpEABSLAIvGwIiEwEuGwRwRAnOdgn5hgX0iRPQmFSqrJuvq4nWlzj2iQr6hwXSdwx4Sw4zIAYkFAIoFgIyGwPRKANfCuC/aQAAAABJRU5ErkJggg==)![The inside of a castle tower has four rooms on two different levels, each with their own window. A millipede tries to get to the center of the tower, can't access the drawbridge.](https://cdn.sanity.io/images/599r6htc/regionalized/33740a40342c74e22034a5ba24de386948311d5e-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Server-side sandboxing: Containers and seccomp

Containers and secure computing mode (seccomp) are sandboxing primitives that offer a lighter weight alternative to virtual machines (VMs). Here we cover the differences between them, and how we use both at Figma to achieve security isolation.



](https://www.figma.com/blog/server-side-sandboxing-containers-and-seccomp/)

, where we explore several common sandboxing technologies and share our experiences using them in production.

Scaling our security is essential for Figma’s success. If you’re interested in working on projects like this, [we’re hiring](https://www.figma.com/careers/#job-openings)!