---
title: "Designing for security and usability: Figma's modern endpoint strategy"
source: "https://www.figma.com/blog/figmas-modern-endpoint-strategy/"
publishedDate: "2025-04-04"
category: "design"
feedName: "Figma Blog"
---

A common misconception in security is that stricter measures alone lead to stronger protection. In fact, usability is just as crucial in keeping systems safe. When security policies slow people down, they often find workarounds that introduce risk. Take complex password policies as an example. When forced to create complex, frequently changing passwords, people resort to insecure behaviors like writing them down on sticky notes or reusing passwords across accounts.

**Endpoint security** protects company devices, like laptops, from threats. It keeps systems safe with tools like monitoring, access controls, and malware prevention.

When we implement corporate security initiatives at Figma, we keep the user experience for Figmates top-of-mind. This helps protect us from anti-patterns and non-compliance, and it’s also the right thing to do for the company. Security is about helping the company succeed, and we can’t succeed if poorly designed controls get in the way of Figmates doing their best work. On the flip side, if they are bought into the security that helps them do their jobs, then they’re more likely to work with us—and ultimately make the security program more effective.

## [Device quarantine, allowlisting, and access controls](#device-quarantine-allowlisting-and-access-controls)

Endpoint security is often associated with friction and frustration for employees: being locked out of your device, blocked from your application, and waiting for IT to resolve your ticket. But it doesn’t have to be this way. The following examples explore how we design for usability when implementing controls that protect employees’ devices. 

### [Endpoint Security Baseline: Self-service solutions to protect company devices](#endpoint-security-baseline-self-service-solutions)

Figma’s Endpoint Security Baseline (ESB) is a set of security controls that keep corporate devices secure. Functions include keeping browsers updated, disabling remote login functionality, and ensuring no kernel extensions are running. Our goal in designing the ESB was to enforce rigid security policies, preventing out-of-compliance devices from accessing internal systems—and we wanted to provide a great UX for Figmates at the same time.

A **kernel extension** is a bundle that lets developers load code directly into the macOS kernel, where it can perform low-level tasks like exfiltrating data, disabling security protections, and stealing credentials.

The ESB immediately detects important security risks, like a kernel extension being installed on a user’s device, using OSQuery, a SQL-like query tool for system-level data. When such an issue is found, the ESB puts the device into quarantine, preventing it from accessing privileged systems like AWS, GitHub, and GSuite.

At this point, rather than requiring the user to file a ticket with IT, the ESB goes a step further. We automate as much as possible, attempting to automatically fix the issue before messaging the user. If we still need the user's help, the ESB messages the user in Slack and provides self-service remediation options. When it detects that the device is in a safe state, it immediately restores access.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAADAUlEQVR4nDXS3U9TZxwHcP4D/4Dd7EqXGIzhYlvkQqKJxk2TLVk0JhohmTOocclkpoSh3SZGtEiB8TK1KFK6skJtaSn0xZXSt/PynJ5znnOe5zl9enpaDmW8rNQys8RLA7q7780n31/y+zZgQpNIHIevBuHihLIUVnmAkUryiOShCCU+pyoIkQLUClCjiFCVUJgvKFoBE9qACPUp6VbJ8Znc3wKHLsDxHhiYU5kcQjIDxNiSwosyLbIrFaa8yutl3lhhzbWcUVb3cH5BZa5Jzv2wdx+68xG6d0Rx3JDn3TDDcZwQW5I5QSwWmWolXa+kq6VUrZSumcA0VI02YEJzKpqWk23Q1agOH8DOz7XkSZi4Cl56QJxneUmUoY7gpqBus8o/Cfh6TtxelEoiIrQBY6pKGsPJThC1cJ7z0vI32sqxbOqIu9fqd6RZgHJ5wmA9DlaDXCUUWRXsuvEbphlMCh9wLpNl4o7ggmU4MdglpL98MXng8tlzndd93mghZK6Ob6x3rW+3b1W7xfW5QQOPYA1gvIvzMshyiwPZqTPc5GE23OpcdrU+6Gv66vSpK22PB14WRzeq3f9Wz9XrFzdr/dENtqdYmMAE7jYrElz+80nQesb3w8fJh4f0aAcTDz4e9Fs6hjq7R6buRqRfaP5H3WyXajbfDm+tbtwySrOY4N1XiQwf7PnZ8UXz2NFPAt+fgrO9qeeBQNdfno6oyzLv6QwFreGlkZDmf1FVbtd32rd2rHp5AROyi3MZ1v/TnbHmlqHDTd4rZ5efP3r26/D9S7a+bwd+tzx12z2hmUhGTKCtef2/P4pvnfSNH1UYpP2PfV23hz5t7jvYOP3dhaRnYsblHrHZn/b3zkyMxiMhTlXYTZOtm/y2wdVKTN0Ea4aap3tnsyB43zZ6+mv78RPTt26ysbAggFQ8EA+Mxrx9ydiMgBFb+Zsx14RiGRhmdm0dlEz1/TyhpCR9gbmBYa/NHnG5cxxQVCSLHMhGU6+8mURYVBSRFmWt8H7YEtXhXsaEvgMg3zOPnuXTYQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/f04060167b18785b876c1addb8a29e425bca8518-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

This approach ensures that Figmates remain productive and secure—devices can recover quickly, and never have access to sensitive data while in a vulnerable state.

### [Santa rollout: Enhancing security without disrupting workflows](#santa-rollout-enhancing-security-without)

Santa is a [**binary allowlisting tool for macOS**](https://github.com/northpolesec/santa) that’s quickly gaining traction in the security engineering community. It works to protect a fleet of devices from malware risks by ensuring that only approved applications can run. It also has advantages like being open source, flexible, and tamper resistant, as it operates as a protected system extension.

As we looked to adopt Santa for the reasons above, we wanted to be careful about how we rolled it out to all Figmates. Figmates run a range of applications and programs, and rolling out an allowlist would hinder productivity.

So we took a data-driven approach to the rollout using Santa’s Monitor Mode. This feature lets you observe which binaries are being run before you enter Lockdown Mode and turn on your allowlist.

**Here’s what we learned from the data:**

-   Perhaps unsurprisingly, the vast majority of binaries and applications were coming from Figmates in Engineering. Most Figmates in other departments ran standard apps like Slack and Chrome. We could easily compile a short allowlist of these apps.
-   During development, each time a program is compiled and run, it creates a new binary. This meant we needed to build a way to automatically allowlist binaries that our engineers created.
-   Engineers use a lot of productivity tools! We built a list of the common ones and gave them a security review, then added them to the allowlist.

After building our data-driven allowlist, we ran the numbers: if we turned on Lockdown Mode for everyone, **90% of devices wouldn’t have a single program blocked**. To address the remaining long tail of applications, we built a self-service approval workflow in Slack.

With this approach, we gradually rolled out Santa to all the engineers who had been at Figma for over six months, drastically improving the security of our devices—and most people didn’t even notice!

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAACjklEQVR4nEXSy4/TRgAG8P2DuJVLz5V6hEPVU6EHKnFDRVoJqd0LJ6RWKqXlsVsOFNjgbEiyZL1Jxo8Zj8fztsdve5yk/wwKUJC+60/6pO87sMPODrumknnyr1o/JLPnietqJuuq7fpN2w1lXglM8Hwajx9L94GBj+p03fe9HXYHe2y3tXbV+Q1y/DX48xZyXivCsqzIizov6lQbgeLw1fP17z/ET67KN9/m0eOurezw3ydcibF0vsFPrnh/347O3uxxmn/EWZoziBfHj0ZH19YPv5Jn1wpy0nXNF1xyR0yui+ktCUYSYSPTqmrbbmham2rjzt89OPrlzo/X/7j/k3f+l1Gw6+3n2puSnorJd+n6KFNJnHCqVNX1vd0aUy2X4OnTZ3d/vnvzxs3Dw8OTk3/WwDNF1dvtQW+3ZZHz4JhMvlfgHsHzs8VsjFZhnZq+Z1ydTWanI8cZv3WciTOevD4dvZ3OpMr2uKnLBAPgHsfrX434jfORC+bnSTgrklWtAsUXy5XnhwkVjEuS8NXKW66Ayat97cpgipwIzhJ2oVNXpT7lhCoVGPmupBMBp2DpBwhCHIQoCBEAfhiiomw+YL3W0UtFfUYFIQkhFMeUJFyojGWFi8j0YgkhxjGFKEZRDEMUIVyW9R4b6cdwhEUItfQ5DRkjTAqe5aJu6MBBChY+TXia5kplWhtKWBSg3JR7rFPhxstT7b0o4YsinOjYiyVDWRF3LdtIpMBiiWEkhd6HqyhE3uVKq9Ta7UHd9klpLisxq+m8YRdaXFwSb0EMq7t6k2oTAj8EPoYRRhGGUQB86AVZVvy/87Dr7Lazm85uyrpnScZZ1jT7GzStLfLKmCLPq48xpiyLum0HO+zeAwmFQpCWfw1uAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/709d72fb6fe30ae30811518ee2592d8c02dbcac1-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

### [Just-in-time access with Opal](#just-in-time-access-with-opal)

When it comes to controlling access to corporate resources, like SaaS apps and production environments, companies often end up in one of two modes:

-   **Wild West:** There are very few guardrails, making it easy for anyone to gain access to production. This approach allows companies to move fast, but has obvious security risks and can lead to breaches.
-   **Locked down by process:** Most engineers who’ve worked at large companies will be able to call to mind a few times they had to jump through burdensome hoops to gain access to the applications or environments they needed to get work done. This impacts productivity, and worse, it causes anti-patterns like running production services out of development environments or deploying “shadow IT,” which accounts for [11% of all security incidents](https://www.infosecurity-magazine.com/news/85-firms-cyber-incidents-11-shadow/).

To avoid falling into either of these camps, we implement just-in-time (JIT) role-based access controls using [Opal](https://www.opal.dev/). This allows people to request access when they need it, and if they are pre-approved based on their role, they’ll receive access that automatically expires after a period of time that we’ve configured, such as one hour. JIT access balances UX and security: There’s less process required to get access, and we reduce the number of privileged credentials sitting around on Figmates’ devices where they can be scooped up by malware.

Furthermore, with Opal, we can write our access policies using Config as Code (CAC), ensuring that they’re version-controlled, auditable, and easily adapted as needed.

Plain text

module "app\_users" {
  source      = "modules/group"
  name        = "#GitHub"
  description = "Access to Github"
  approvals = \[{ type="PREAPPROVE", val=module.rbac.roles\["Dept-DataScience"\]}\]
  autoadd = \[ module.rbac.roles\["Dept-Engineering"\] \]
  review\_settings = {
    review\_stages = \[{ type="VP\_ENGINEERING\_REVIEW" }\]
  }
}

Example Config as Code (CAC) policy for GitHub for illustrative purposes. Engineers should always be able to access GitHub, whereas data science teams are pre-approved for JIT access. Other roles require approval by a VP of Engineering.

## [Better UX leads to better security](#better-ux-leads-to-better-security)

By designing systems with usability in mind, it’s possible to create security policies that employees will actually follow. Here are a few key lessons from our approach:

-   **Prioritize usable security:** Security shouldn’t frustrate users. Instead, find ways to build security into workflows without adding unnecessary friction.
-   **Automate where possible:** Removing manual processes makes security enforcement faster and less disruptive.
-   **Leverage self-service tools:** Giving employees the ability to resolve security issues on their own speeds up response times and improves compliance.
-   **Roll out changes gradually:** Security initiatives are more successful when introduced progressively, rather than forcing abrupt, disruptive changes.

[![A pixelated flower](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADDElEQVR4nG2U3VMaZxTGvQVMW5sJTW3SmjZX2pnEDCKShBiLTigqGCEq7LLALq4rIF8LAnGBgF9V22nSJpl+zTTepdPkrpf9234dMFo0Xjzzvu+Z9zzznDPnOT1mYYRjmNpn2IZJsJ3EOgifeZ/NEf5Hz/Hlg9AIVnGUftnJgHiPIWmGYTXADXWG6/EpLkbuYhHsJ4kWYZReYQxL2IG5K35CaF1wcVNcxKWl8Ed0dPUH9uq/8aT2PfFchVvLQfoiY5jfqbdK4wwm/HwV9/KhePt9wv5HAVxzTwn6/iTn/4PDxF/8W/ubN81D9h8/ZTGjcS02gaXz386g6iVaUZnJSnwiTWAKdxOKY/SH4kxMvyR+26DhyvLav8U/6havSk0Oqg0KxSyTq0Guxe7zUcSJLe2jupchZizzWcyNKXxUdo9ZdPCx5mGwtIonV0eWBBpLEr8vNHmh1GjpBVqVEs1ymbyeYz4lMSh7cObnaTzXUXeSXJUnOwrb6nvMESdXSvOM/5LA/2ucpe0ghR2dg9LPFLUqoXSMtJ6kXmzyOPuczNounhWFKV2i+bKMtpfm825Ck+jgUsrN8P4sD148ZOEgQPKnLMbmFkJa486yj9BalFJ2l7z6lszKIUFtnZmCxpNnFdTtdwpDxwrbIyCOMqC5mDYCaDsK+mYSwyiyqqd4lImS1JMYpW6FCdw5kY39PHJd5cqpHnYGd4SByDiBxCK6qlBf1Wis65QbBnprg8pmnUqzQaZaJLAWPeph7iG1H/MstzSuxo9KPjU2l6V7OMRvCfoesOb3kVNkMnqB9VqF8u4myndN7lcUvlTc9IlO7Nk56s+KqNup90tuo1e0Y10a5WvvMJPuEQI+L3IggK5E0Y0yc60qA3oYS9SJOWxnSJtGriXxF2UuR8/OYQc2LGEbF4O3+GLexo2wm3HRx6y2hHdD46ahcikzi0VydFrUdspQws/1+PT5TunGBcFOX+wOVuUb+lem+DTloU+b4oJ8F7N41Py2r9te7hUcpzx+LuHxFjGJ9lPb5OxmOQ//AbnaPvLaxzpaAAAAAElFTkSuQmCC)![A pixelated flower](https://cdn.sanity.io/images/599r6htc/regionalized/e85478d82728490083efe8027723e309ed0cb3fd-2048x1536.png?w=2048&h=1536&q=75&fit=max&auto=format)](https://www.figma.com/careers/)