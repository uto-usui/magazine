---
title: "Server-side sandboxing: Virtual machines"
source: "https://www.figma.com/blog/server-side-sandboxing-virtual-machines/"
publishedDate: "2023-10-24"
category: "design"
feedName: "Figma Blog"
---

A **VM** is a guest virtual computer that behaves like a real physical computer with its own memory, disk, and CPU.

**Seccomp** can restrict the system calls a program is allowed to make.

At Figma, rather than try to prevent security vulnerabilities entirely, we employ server-side sandboxing (also known as [workload isolation](https://fly.io/blog/sandboxing-and-workload-isolation/)), to minimize these security risks. In [our overview of server-side sandboxing](https://www.figma.com/blog/server-side-sandboxing-an-introduction/)

, we introduced the idea of application sandboxing, explained why it’s useful, and briefly discussed three different high-level technical approaches:

[VMs

![A castle has two large towers on either side of one small tower in the middle. The middle tower projects an image of another castle with a millipede in it.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AHOWplRnYDxAIz48D1xaEmdlFD08DBsbBSMkCE1SEVFWESgpCBkZBDc2CmNgE1dVETQzDTM3Hk1aTGZ/fwCItNB5natnfG1eZDJlZRhvbhZbWxJCQw5dYROdpSGhqiFkahVCQw1SUhBhYRNSUhVKUSxdcWZ1l6GDrcIAk7/Qj7zRiK+7gJh+foU7goIdfH0Yen4Zoakh0Nkq1N0qqbQifYIac3QXbnEeaHFAcIh7gqi2jbrVkL7bAKa+j5+9o5e8upK2spCnf5WeRpygJ6uyI8jTKdniK9/qLNLfK661I5SXI4aRR4SfjYqzwZG8zZa9v5q8rQC/wVW3vl2tvXOiu42atpacs3+qtVHByDLV3yza5Svh7i3d6i3CyS6mr0eXrX2VtaWZu6mgu5SqunGxuVkAz8lcy8FOv7lEqKpJmqdeorV2qrtxucVSzdg52OQv2ucu0tszvMVHq7prpbl9oK9qoKlUsLRIvLs9wb06AMe1X9StRMmmOJuWR4yUU6urULi3VLe8WL7HSsbPNcbOMsDGQbq9Vbu6XLa1WJyhUZOYR7KrO8W2OsC2QgB7YS6ncB+5jDeZoHiOo4uyo1jPpDHOrTnEtD+3szO2szPEtT7QrzzVqDfAp1OZpoGRpIWpnlWpiTCKdy4ANCgMW0QUjIJPk66ikLK3q6Z80Zky3pgd1J8nvqkwvKsw0qIp4Zgd25cot6NrlLCwkLKwkpZqbVokQDQQAFtZEWtqIoiVXYuqmoissZyukbylQ82cHMecJbOkOrKkNsacItCaGsShMqetfoyvsoqpoI+dZnRzKVlWEQCsqB+sqiukrE2OoGmJoHydr3WysUC8ryK3riuoqT+opzm3rSe8riG2rzSksmyNpoWJmmyfqVCrqi+qpSAN80vu8OZ2bwAAAABJRU5ErkJggg==)![A castle has two large towers on either side of one small tower in the middle. The middle tower projects an image of another castle with a millipede in it.](https://cdn.sanity.io/images/599r6htc/regionalized/e88d98cfc3ac526120576da99b498d190286a00a-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Server-side sandboxing: Virtual machines

With so many sandboxing options, it’s daunting to choose the right one. Here, we dive into the virtual machine (VM) security model for sandboxing, including the engineering trade-offs to consider and how we use them at Figma to achieve security isolation.



](https://www.figma.com/blog/server-side-sandboxing-virtual-machines/)

,

[containers, and secure computing mode

![The inside of a castle tower has four rooms on two different levels, each with their own window. A millipede tries to get to the center of the tower, can't access the drawbridge.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AEwvEVFFKltWMEtEG3JUDs6BC/iKBv2GBPyJBPaMB/SLCPuHBP6GBPuIBdqCCIVcDFJIGmBbMVJKMDMlFgBkRyKKbDKdgjd2bzhuZyuvhh3jjw/2iQfyhgbXfwjTfQjvgwb6hwbtjArBiBd8byl1cTichDmJbzhLPysAelgorHwsvZI+iYZgaXNRlIo0xpcd3IwR3IYNt3wOtHsN3YMM5YcO0JEXoYsucXtThYdjuZJCqn4yY1EyAG5LHYZeHo1rMGloVFtmT4SBNqaNIbOCGcGOH7ekJ7ikJsaNHrx+GayIHYiBMl9sU2ZqWopsNINeIlNBJQBMLw1EMBBENBc3NSVKTSl+eCaagxyeeyCnkEOtuWawuWCsjzmidR+efxyEeiRQVCo1NiZAMxk9LRIsIBAATDEPWUEaZk8kS0UsVVYlkoghsZYeqYYok41kkK+plLCakYZOn3cisY4em44hXV4gQ0EiW0wgUkIdMCUUAGpMIpluKa6GPX14XWVuS5SOMLKYIZ9/JIJ+YIOmtYamqH54T5VxIbORIJyRKmtyO3NzRKOINZZ4LFhIJwB7WyyufSu+lT+Oi2Zqd1iJhjmhiCGSciOAfWKGqbeJqaiLgFKneiG1jB+UhC5yc0KIgUi3ljOtii5vWzAAbFAjh2giknopdXM8Y2c8iHgvrn8bsXokm5F1jbTFk7SurpZT0IgbyIoal3srbGMvdGUnkXgfinIkXU4nAFA0DUE0DT42DTw3EltLG6VxG9yDDeCIHrqec5m3wJ+2psedSuyKEeaHDa53HmNQHj81EEE3C0A2DzUpEABSLAIvGwIiEwEuGwRwRAnOdgn5hgX0iRPQmFSqrJuvq4nWlzj2iQr6hwXSdwx4Sw4zIAYkFAIoFgIyGwPRKANfCuC/aQAAAABJRU5ErkJggg==)![The inside of a castle tower has four rooms on two different levels, each with their own window. A millipede tries to get to the center of the tower, can't access the drawbridge.](https://cdn.sanity.io/images/599r6htc/regionalized/33740a40342c74e22034a5ba24de386948311d5e-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Server-side sandboxing: Containers and seccomp

Containers and secure computing mode (seccomp) are sandboxing primitives that offer a lighter weight alternative to virtual machines (VMs). Here we cover the differences between them, and how we use both at Figma to achieve security isolation.



](https://www.figma.com/blog/server-side-sandboxing-containers-and-seccomp/)

(**seccomp**). For sandboxing using VMs, we mainly care about two security questions:

-   Can a malicious job inside the VM break out of the VM?
-   Even if a malicious job can’t break out of the VM, can it use the VM’s permissions to access other systems or otherwise do harm?

## [The VM security model](#the-vm-security-model)

To answer these questions, we have to examine the two main relevant boundaries in the VM security model: the hypervisor and the VM’s own permissions.

A **hypervisor** manages VMs and allows you to run many of them at once on a single physical machine.

A **VM escape** is when a virtual program breaks out of the isolation of a VM and accesses the host system.

First, the **hypervisor** correctly separates both the host system from guest VMs, as well as the guest VMs from other guest VMs. For many sandboxing use cases, this security boundary is more than sufficient and unlikely to be the weak link in a broader security system. However, because hypervisors tend to mediate many operating system (OS) and hardware operations, they often expose a large and complex attack surface. Sometimes, vulnerabilities allow for guest VMs to take over the host, as in **VM escapes**, or to interact with or ascertain information about other guests.

![A castle projects an image of three towers.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAADGklEQVQokSXO328SBwDA8fsH1FgtUOA47lfhaFl88sVM97JkWeKDyxZnnFn2MJto3LSzvqmJdiaW/pKtQ4P9yREK5X4Ad0JLD+gdPY6j3NFruR7W1lUTR+L+iGXb+zeffIHNDFTmYSGPrefR9TxaLmIbFby0jglrmCjiGxVcWMXKAraxgZfW/m+wEo/UWM9uog94s9C7nez7j0CEAiorPr0dkBWfJPXrZqBpEKKIq5pfNwNVqV/Io2LO20y5Xi/Z/pw7BVgxu0XajIRDoUFxFdF3iYNusGUGGpp/vxu03g+qTZ95OHDQDapbPpGHtZTLIm3tuENPuYBNFlIYcCvtqlPuagHRDeLwr6B5MNBqE4cfP9n/ENR2iM67wYMPQVX1SRysUqBKgzIL1VgIMEm7nnSqFFhlocorpCrh+g6xvUe0zID1fnDv7aDeJoxOoLlNiGWswsMyCzUodzvuOJrtAT7+fqwbOX70ssck7Q0KlLPezSIqV3FF9dU1f73pV+q+moTLBURhPf8+x+xHsz3dyIm/Z44BnSXb4dypd9GTR9GeNwunrZitlXTWslApj2azKMeh5TyqZDxGos8ibZ1F2/5C7+vFXjPuMJadQCUHS1mvwni20m4t6dbiWIMcqKX8Ao3QcQ+dgNYZXFoJyomgkkQV2iNnICnnrXBIiUcBIYWsMQhHIdQyRCf9KeorMj2yQn+Xp84UY95CHM3Qn8aZW0vMCJ35gmdxNg1zNFJk0FIKA5QILDyHI7+6bt84PfxL/+iL4fEsP5N7GaOGmNjXafLyHD3yjGemcpnwwvdPRuEH92yzT92lF3A9ggDGNKKE4Oc/Oy+dP372LHR1+O5juhYqNCa51XCGe5bhJzhhfHXn0Ur52k/XPv/M/uPFk+Q9d2MCMaZRoD0J74zD4iNo7GrvxXPQ5es3R5eFqUJruqD9VlTCa/XJvDZVMB4ucpeufPPtBXt0yF5/4t2dQNpTCLD31GWNuToh9+Z9R/gHz4M7V/6Yj86n00sMucJNL2dn5qnEHEWFozMPb3w5P+TcetxnhcC9MdAMgf8AB2igVDcndqUAAAAASUVORK5CYII=)![A castle projects an image of three towers.](https://cdn.sanity.io/images/599r6htc/regionalized/1e07ffb255daa40f3131da0187a8126082b7e515-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

**Bare-metal instances** are workloads that need access to the hardware or server.

Use cases that involve building specialized hypervisors—or otherwise require a thorough understanding of the hypervisor attack surface—are complicated, but there are many resources like [this one](https://www.virtasant.com/blog/hypervisors-a-comprehensive-guide) that offer helpful overviews.

For example, consider that most large cloud Infrastructure as a service (IaaS) providers—like AWS or Microsoft Azure—rely on VMs as a key primitive to isolate tenants. If your system runs in this type of cloud provider and you don’t limit yourself to **bare-metal instances**, then your security model has to rely on the hypervisor security boundary to some extent anyway.

Second, VM escapes aside, simply placing a compromised workload inside a VM may be insufficient. You’ll need other controls if, for example, a malicious job in the VM can still make network calls to exfiltrate data or call other services with the VM’s credentials. While we often have limited ability to modify the hypervisor itself, we can configure the VM’s capabilities to reduce the blast radius of a malicious job taking over the VM. For example, you can (and should) restrict network access, minimize the VM’s permissions to contact other services, and limit the lifetime of the VM’s credentials—and of the VM itself.

![A millipede slithers between spikes rising up from the ground.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAIAAAC9o5sfAAAACXBIWXMAAC4jAAAuIwF4pT92AAACHklEQVQokR2RW2/SYACGe60JDk8MJ2pbTg0BOhBMNOKW4bIZk+mVV/6SLWhwk2VAW2CUo3PANsmcZI64GIzCXNmgtP3afuXg/DMGb9+8z3vxvIhGYXB9qh/S/wlP/I3oL1Yu9VeuqO9vqRQusoSYJdQkrtFYn8bUhEVgHVLaDplxotEYAuPoYG2yHzbKebdSdWrR68Ply4OQXozZ2p+CvXpALdo0GtUovMd6T/cXu9WHatqiUf9hlULldRMfJdq1ean1WCqi8ttrg2WdELGcfFkSWk9hxQ4ZVKEsXH6mUX/NHc2BrFWlMcjgiMCSfJbk065exa8cuEHB2kkQ4sYd+G5STDmkslPOW6WsXcoQnbS3VQhwBVJI26Q8IeesyMnnl+fHC6DsUjYtSsossu7T/YWzg0dK1DB8o4OrN8UYxpc8UsmhxExg1chH7p7n7vPHM8o3N9I8etX7NQ+qbqHgFopkN/+Aqy91G7N8BgMbpkHU2F8zqDQ6YKYuIldHlAEksfZ2oNt8Bn97kN4Hv1x2iVvTXG2x931OKpPitheUnZ0cyVWDcs03pG6MQrpRaALGUeXQpxy6xC0S7HjhHoFoDK4xuMB6uK/PpeYs3CFgEocMzmd8XP2F+OMJyN4DYYMYvt1mffzPoNogYd48fiuBI31mLF1O2oWPHnnXCbPm8RyNgZRDKPnlXZfCmpU4CuK4kHZJe9Nqxa5t4ho97vwD924avGu1t1UAAAAASUVORK5CYII=)![A millipede slithers between spikes rising up from the ground.](https://cdn.sanity.io/images/599r6htc/regionalized/95bba7e0e15e500222d74e924111dd85f0c1b382-2160x925.png?w=1632&h=699&q=75&fit=max&auto=format)

## [Engineering considerations](#engineering-considerations)

In our [introduction to server-side sandboxing](https://www.figma.com/blog/server-side-sandboxing-an-introduction/)

, we shared a list of questions that map to the main factors for you and your team to consider different sandboxing solutions and their trade-offs: environment, security and performance, development costs and friction, and maintenance and operational overhead. With those factors in mind, let’s evaluate VMs.

##### [Environment](#environment)

Since VMs can run full-fledged operating systems, they provide a significant advantage: Most workloads probably require little to no modification to execute in that environment. You may even require a full VM if you need to run certain workloads—like converting a text document to a PDF—that involve third-party software such as office productivity suites or web browsers.

##### [Security and performance](#security-and-performance)

Creating and running a full VM tends to have a greater impact on performance compared to other sandboxing primitives, like [containers or seccomp](https://www.figma.com/blog/server-side-sandboxing-containers-and-seccomp/)

. One of the main reasons is that VMs require granular isolation, and isolating every workload means a significant setup and teardown cost per workload, as well as increased latency to wait for a VM to become ready from cold start. Keeping a warmed-up pool of available VM workers helps to address the cold start problem, but adds overhead—it’s complex to implement and operate this kind of orchestration system. Also, the performance impact of a full VM often correlates to increased monetary costs compared to lighter weight options. You might ask yourself whether every individual workload needs to be isolated, or if some level of sandbox sharing across different workloads (i.e. those belonging to the same user) would be acceptable.

##### [Development costs and friction](#development-costs-and-friction)

Since full VMs often allow you to run an entire OS, many types of workloads require little to no modification to run inside of a VM compared to more restrictive sandboxing techniques. Specialized VMs like [Firecracker](https://firecracker-microvm.github.io/), a security-focused VM technology built by Amazon, may require [a custom runtime](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-modify.html) to support your workload.

##### [Maintenance and operational overhead](#maintenance-and-operational-overhead)

Overall, VMs usually don’t make debugging more painful or add much additional development cost for engineers actively modifying workload code. There are many well established ways to provide engineers with access to common debugging techniques, and the tooling is generally quite usable.

However, it can be complicated to manage, operate, and orchestrate a VM cluster or service for sandboxing. Doing this well may require reliability engineering knowledge and experience. For instance, managing VM orchestration directly often requires deep visibility into core internals of the underlying systems, particularly involved tracking on each VM’s state, and tuning for unexpected sources of performance degradation. Depending on the performance constraints, this orchestration system may also be responsible for complex routing decisions around which user requests to associate with which VMs. While VMs can work mostly out-of-the-box as a drop-in sandboxing solution in many situations, they often require additional development and maintenance costs.

## [How we use VMs at Figma](#how-we-use-vms-at-figma)

At Figma, for situations where virtualization-based sandboxing is appropriate, we rely on AWS Lambda, which uses Firecracker. While we lean on AWS Lambda to handle most of the details of virtualization management, we still have to make interesting, ongoing trade-offs. For example, to ensure that Lambda is a viable option for those who want to use them in a synchronous core serving path, AWS has chosen to reuse individual VMs from the same tenant for multiple requests: Firecracker offers reasonably quick VM boot times, but the overheads are still too high to pay on many core workflows. However, we have minimal control over routing at this level. For many workloads, this is a reasonable security trade-off.

At Figma, we use Lambdas to perform stateless handling for functionality such as fetching external images for use in the Figma canvas, or for fetching link metadata and converting or resizing associated images for [link previews in FigJam](https://help.figma.com/hc/en-us/articles/4414079911575-Add-link-previews-in-FigJam). For these operations, low latency is important—when users add content to the Figma canvas, they expect to [see it quickly](https://www.figma.com/blog/keeping-figma-fast/). Further, much of the code involved in performing these operations comes in the form of large open-source libraries. It would both be expensive at the outset and require substantial ongoing maintenance work to maintain a fork to fit them into a less generic sandboxing primitive.

For the link metadata fetcher, we frequently need to resize images or convert them into a format that the Figma frontend understands and can render. To do this, we fetch data from the third-party link and run an image processing library in an AWS Lambda—which also means a Firecracker VM. As this execution environment runs with no special privileges in our AWS account outside our production VPC, exploitation of vulnerabilities in our link fetching logic or in ImageMagick won’t grant any ability to speak to Figma’s internal services or leverage the new position to touch anything outside of the Lambda execution environment.

Unlike our experience with nsjail, which [we cover in detail here](https://www.figma.com/blog/server-side-sandboxing-containers-and-seccomp/)

, we have to do relatively little sandbox tuning for these virtualization use cases. Since there is no allowlist of system calls (syscalls) to manage, there’s no concern about rarely evaluated codepaths. With that said, there are some gotchas that we always need to avoid. First, the Lambda environment includes [a localhost HTTP listener](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html) that will give any caller the contents of the request that triggered the Lambda, or allow any caller within the Lambda environment to forge a response. While we can’t prevent code executing within the Lambda from calling this API, we don’t want an server-side request forgery (SSRF) vulnerability to give this power, so we needed to ensure our application code wouldn’t make requests to localhost. Second, Lambdas run within a cloud environment, not as “raw” compute: It’s easy to configure Lambdas so that they _do_ have special privileges, whether by being within your internal network or by granting them identity and access management (IAM) permissions to touch other cloud resources.

With our sandboxing approach, we also had to iterate on performance and resource limit tuning. When we first implemented this Lambda, calls to it could take up to 10 seconds—a significantly higher latency than we wanted for this feature. As the Lambda runtime warmed up, our average latencies got lower, but we also had to invest direct engineering efforts into ensuring that we were minimizing startup and processing costs as much as possible and to minimize contention on [the Lambda concurrency limit](https://docs.aws.amazon.com/lambda/latest/dg/lambda-concurrency.html), which is a shared quota among all Lambdas in an AWS account and region.

There’s no one right approach to sandboxing, but understanding the trade-offs and engineering considerations can help you choose the best solution for your team. For more on different sandboxing primitives, read our [overview of server-side sandboxing](https://www.figma.com/blog/server-side-sandboxing-an-introduction/)

and our

[deep dive into containers and seccomp

![The inside of a castle tower has four rooms on two different levels, each with their own window. A millipede tries to get to the center of the tower, can't access the drawbridge.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9AEwvEVFFKltWMEtEG3JUDs6BC/iKBv2GBPyJBPaMB/SLCPuHBP6GBPuIBdqCCIVcDFJIGmBbMVJKMDMlFgBkRyKKbDKdgjd2bzhuZyuvhh3jjw/2iQfyhgbXfwjTfQjvgwb6hwbtjArBiBd8byl1cTichDmJbzhLPysAelgorHwsvZI+iYZgaXNRlIo0xpcd3IwR3IYNt3wOtHsN3YMM5YcO0JEXoYsucXtThYdjuZJCqn4yY1EyAG5LHYZeHo1rMGloVFtmT4SBNqaNIbOCGcGOH7ekJ7ikJsaNHrx+GayIHYiBMl9sU2ZqWopsNINeIlNBJQBMLw1EMBBENBc3NSVKTSl+eCaagxyeeyCnkEOtuWawuWCsjzmidR+efxyEeiRQVCo1NiZAMxk9LRIsIBAATDEPWUEaZk8kS0UsVVYlkoghsZYeqYYok41kkK+plLCakYZOn3cisY4em44hXV4gQ0EiW0wgUkIdMCUUAGpMIpluKa6GPX14XWVuS5SOMLKYIZ9/JIJ+YIOmtYamqH54T5VxIbORIJyRKmtyO3NzRKOINZZ4LFhIJwB7WyyufSu+lT+Oi2Zqd1iJhjmhiCGSciOAfWKGqbeJqaiLgFKneiG1jB+UhC5yc0KIgUi3ljOtii5vWzAAbFAjh2giknopdXM8Y2c8iHgvrn8bsXokm5F1jbTFk7SurpZT0IgbyIoal3srbGMvdGUnkXgfinIkXU4nAFA0DUE0DT42DTw3EltLG6VxG9yDDeCIHrqec5m3wJ+2psedSuyKEeaHDa53HmNQHj81EEE3C0A2DzUpEABSLAIvGwIiEwEuGwRwRAnOdgn5hgX0iRPQmFSqrJuvq4nWlzj2iQr6hwXSdwx4Sw4zIAYkFAIoFgIyGwPRKANfCuC/aQAAAABJRU5ErkJggg==)![The inside of a castle tower has four rooms on two different levels, each with their own window. A millipede tries to get to the center of the tower, can't access the drawbridge.](https://cdn.sanity.io/images/599r6htc/regionalized/33740a40342c74e22034a5ba24de386948311d5e-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Server-side sandboxing: Containers and seccomp

Containers and secure computing mode (seccomp) are sandboxing primitives that offer a lighter weight alternative to virtual machines (VMs). Here we cover the differences between them, and how we use both at Figma to achieve security isolation.



](https://www.figma.com/blog/server-side-sandboxing-containers-and-seccomp/)

.

If you enjoy this type of technical work, consider [working with us on the Figma security team!](https://www.figma.com/careers/#job-openings)