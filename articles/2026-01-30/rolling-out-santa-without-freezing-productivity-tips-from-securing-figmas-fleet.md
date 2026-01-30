---
title: "Rolling out Santa without freezing productivity: Tips from securing Figma’s fleet "
source: "https://www.figma.com/blog/rolling-out-santa-without-freezing-productivity/"
publishedDate: "2025-07-02"
category: "design"
feedName: "Figma Blog"
---

Figma is committed to building a secure and seamless environment for our users and employees. As part of this mission, we recently scaled **Santa**, an open-source binary authorization tool, across all Figma laptops.

One of the biggest objections to binary authorization tooling is that it can be very disruptive for employees. We had those concerns, too. Here’s how we use Santa to strengthen our endpoint security while ensuring Figmates can stay in the flow of their work and access all the tools they need every day. We’ll cover how we got started with Santa, tips for building a data-driven ruleset using monitoring mode, how to give users self-service tools to get unblocked, and the staged rollout plan that helped us avoid disruptions.

[![Colorful abstract illustration composed of interlocking human-like shapes. Figures include a purple foot and hand, a green torso with a purple polka-dotted tie, and an oval-faced character wearing a brown fedora and gray suit, waving with a smiling expression. The composition blends surreal elements with cartoonish style against a light gray background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACg0lEQVR4nBXCTU/TYAAA4P4ZTx68efBkYtSjV2O8mRhMgOiygzpRzIYMZAxEYINNYGzLtjLGNtrZjX2x2nUf7du+fd+26z66DxSNGYi/wPjkIbBqgHqHP+k1T7sK7Kia3m4XB6O9/jBsmmEVpYS6JModwRw2z37IHVPVDPx/S9UMAiktjjFo74Da+F6KDwVO7/QSPy/tvcvX1aG92ExwLK6LsKLxbBsB3MXQQEhHSMe4RUAAcod0yFX0vjT8trPkXo8HrHyxF71wzLTsnmqa4xWukjhOvj+hA1JexqwucQpgoSKqBOCz8Z3ZTdfG4oxkfzFadpxvx858BpgYhe6jtTfiUUGuCKeecuw5H/FBsgkzWGIgYGSlrhIiG2eiM2Qw+Gm5Z7NeWC3jZx/Nx5XqbSN0A60+AN7PtX2R2+yz6x2KQhEgpRQxBQAto6ZGSHVGYKN5hnUtDqyTf6Ysv+8uKteY+HXgvlWbv1OYm445EpEl5atfT2fQoVhPN05CTDFelAVEIAgg4Ojj6jubNj0xfmq7uOnrXS9nHta2LJXNJ4zb6p33zTnTyytFX5BPlIqpPOkLUAdJCSgERlBgD6J+0mbRJqeuHi1c3aN+TWEYVPIJIbtTpUOxMOX2UAtrR+71dCCcjJAR/5dsmoKKSmBY56m5oOuD8y1YWB056MZKO58bZ+D5sdz+JiIJNFmZpRtMIhuLxncD4a3tiM9fYHII6wSSazVqlt59lSbzZa7aMD3a2Hn2d2k09hpmUdU13NPxSEUdKArNUq6QjJKpKMmdslhtEQiKQnmrlnMCPqVrJbO/3x/s9ochc0C2DB5rLbnTBf0+7HaxZigQN2rNWrUuA6hqxj9gOt/PONiNsgAAAABJRU5ErkJggg==)![Colorful abstract illustration composed of interlocking human-like shapes. Figures include a purple foot and hand, a green torso with a purple polka-dotted tie, and an oval-faced character wearing a brown fedora and gray suit, waving with a smiling expression. The composition blends surreal elements with cartoonish style against a light gray background.](https://cdn.sanity.io/images/599r6htc/regionalized/49e381545423c4606a2cb8dffe274858c44f0578-3264x1836.png?w=3264&h=1836&q=75&fit=max&auto=format)](https://www.figma.com/blog/figmas-modern-endpoint-strategy/)

To learn more about how we design our corporate security with the user experience in mind, check out our article on Figma’s [modern endpoint strategy](https://www.figma.com/blog/figmas-modern-endpoint-strategy/).

## [Binary authorization: One piece of the endpoint security puzzle](#binary-authorization-one-piece-of-the-endpoint)

Malware on endpoint devices is a common entry point for cyberattacks, often serving as the first step in large-scale data breaches. **Binary authorization** is a process that restricts devices to running only approved applications. It doesn’t cover non-binary code, like scripts, extensions, or plugins that an allowed binary can run, so it’s only one part of a layered security approach. But binary authorization significantly reduces the attack surface, because security teams only need to vet, harden, and monitor applications within the allowed set.

[Santa](https://northpole.dev/intro) is a macOS security tool originally developed by Google that enables binary authorization. You can use Santa in either monitoring mode, where it passively records data about binaries, or lockdown mode, where it applies a set of allowlist rules.

It’s worth noting that Santa also supports **file access authorization (FAA)**, restricting access to specific files and ensuring that only approved applications or processes can interact with them. We’ve leveraged this to secure browser cookies on Figma laptops—a prime target for attackers. By locking down cookie access to only the browser application, we significantly reduce the risk of credential theft, even from scripts attempting unauthorized access.

Since it has essentially zero impact on users’ workflows, we implemented FAA first to get an early win. Once Santa was deployed to Figma’s fleet for FAA, we took the next step: turning on Santa in monitoring mode to inform our plans around binary authorization.

![Abstract 3D illustration featuring various geometric shapes inside layered containers. Red cubes, yellow rounded shapes, and green spheres are arranged within overlapping blue, yellow, and green compartments, suggesting data or process organization.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAC4jAAAuIwF4pT92AAADh0lEQVR4nE3MbVATBBzH8b1IrzfVXS9703XXw11GBcmJFczhAXWQKbDQJZuIhDg4nCAON2RAigkETBjOYBMQHNHYbBsbAypcOOoWDxmwoS63IZBah/bgy28Hnlcvvvf73//FRxAOh3nULSIRP5HIDOHQHMFfbzA3N4fX68XtdmOz2bDb7IyOjOLz+VhY8BMKXScSCRAO3yQcDq07gsfgGrayPMrd22YWr7u4OuaitU3HYU05shMKpKWF7C+Wk39UQUV1NSZTJ/O/2PltycLSkptQeIZQKPg/cNHP7YiLlWsmFoe/xNXaQnFRAcIjEqJqpcSq9hJfKiGhRMLugzk0aU4w5fiCyDUt/sBJ5gNGgsHJ/8AbN/2MT3kYtLuYbOpmvKSKU4XF7KlRkHC+hLf1cj4yHCK/Q4FSo8RYXsfQWRM9A33oXRW4PGXMTDsQhENh/P5ZPFe+xvhVByc7LPTU9TCgrqVcVYv49Dne0bcTbWpG6mqkzHmOQ63tKKp7yWv0kNY3ReGglm57LhaLFsFCwM/4VRNDtkJcndlYztdg6W/D6GxAYWtlx2UrCYPDiMYcyHxmDk5YybC7SB1wk+QcZ9f4N9T7KrnoyELbXoXA4xnlsk2BbyKR5R8TWbmSTnA6l+lgPiMROZdCZRhDanoXj2MLVWH/uY3e7y9wYbKR9lk1bT/I0bl28OnFnVQZaxGYzL2caRIzNLSFO+EE/rkl5O+J91n9Vsofs3ncuyfm94dJrD5M5sHSJ9wf03Kn+yyB/iKslhSU2jjeU24hsTKd0s4GBO3mXrKOipFXvsWAI47AmJC7ukxWT6lY7W/hwbySP1fTuP+XkOXgx/j7NHhVFbQfySbr8DZePBDHU7J3eUkhRmH4HIHe0c9WpYwXcraSqoxD/Vk8XWUZOEtVjGp1jNgqcXjTMXmFaG3JlNVlskcuJjY3lWdzRGzIEfJEdjwvF+ykVHcGgd5pJqbyABtyRTydJ+T5AiExBcmIinaTcmw/SZosEmqS2awR8sqxbTxXKOKZvO1szBWtQxvFW3kyJZpXd21Heboagek7J5laFa+pZWxSPSpKJeNN9T5iKnKIVu/jDZWUqONSNj2uXMrrJRKi8zPYLEkj9oMkPpRk0dDchMA78xMGt5U6Sxf1A13rW2ftpt7aRf3aWtbqWt/1/9pt7qTxkoEmo55mvQ5tawsdBgPu4WH+BSAXxm2osY21AAAAAElFTkSuQmCC)![Abstract 3D illustration featuring various geometric shapes inside layered containers. Red cubes, yellow rounded shapes, and green spheres are arranged within overlapping blue, yellow, and green compartments, suggesting data or process organization.](https://cdn.sanity.io/images/599r6htc/regionalized/5a71531f4070ca8a4f51a3d180d5499b98db3cf7-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

Binary authorization is a powerful layer, but it’s just one part of our broader strategy to protect Figma’s fleet while maintaining a seamless user experience.

Santa’s allowlist supports multiple [rule types](https://northpole.dev/features/binary-authorization/):

**Binary**: Use a binary’s hash (SHA-256) for precise control. Any tampering of the binary on disk invalidates the rule.

**TeamID**: Permit all binaries signed by an Apple developer team (e.g., Google’s EQHXZ8M8AV).

**SigningID**: Allow binaries signed by a specific developer signing identity (e.g., EQHXZ8M8AV:com.google.Chrome).

**Compiler/Transitive**: Automatically allow binaries created by specified compilers, ideal for development environments.

**PathRegex**: Allow or block based on file paths. Use sparingly due to bypass risks.

## [Laying the foundation: Santa in monitoring mode](#laying-the-foundation-santa-in-monitoring-mode)

We were initially unsure whether we could roll out binary authorization with minimal disruption to Figmates. So we started by deploying Santa in **monitoring mode** across our fleet. This allowed us to collect data on every binary execution without blocking anything. The insights were invaluable, revealing patterns in how our team used software and helping us craft a tailored allowlist.

We started with **SigningID** and **TeamID** rules, which leverage Apple’s developer certificates to identify trusted applications and publishers. By creating rules for our Figma-approved applications (e.g., Zoom, Slack, Chrome, Notion, and GitHub), we were able to cover the majority of binary executions on Figma devices. Encouraged, we analyzed the remaining data to refine our allowlist and prepare for lockdown mode, where unapproved binaries would be blocked.

### [TeamID vs. SigningID: Navigating the tradeoffs](#teamid-vs-signingid-navigating-the-tradeoffs)

Building our global allowlist revealed nuanced tradeoffs, particularly when choosing between TeamID and SigningID rules. TeamID rules, which permit all binaries signed by a developer’s Apple Developer Team ID, simplify management for applications with multiple Signing IDs—common in apps with separate executables for main binaries, helper tools, or update mechanisms. Maintaining individual SigningID rules for each component can be labor intensive and risks missing when updates introduce new Signing IDs.

However, TeamID rules are inherently broad because they correspond to an entire company. For example, allowing LogMeIn, Inc.’s Team ID (`GFNFVT632V`) for GoTo Meeting would also permit LogMeIn Rescue, a remote access tool. SigningID rules offer precision, ensuring only specific application identities are allowed.

Our approach to balancing this tension was to default to SigningID rules, reserving TeamID rules for highly trusted developers with suites of apps we wanted to allow or complex apps where managing multiple Signing IDs was impractical. To mitigate Team ID risks, we implemented a more rigorous review process for new TeamID rules, analyzing the developer’s application portfolio to ensure no unintended binaries were allowed.

### [Expanding our allowlist](#expanding-our-allowlist)

When analyzing the remaining `UNKNOWN` events in monitoring mode (binaries that would be blocked in lockdown mode), we identified three main categories of findings:

1.  Binaries signed by an Apple Developer identity (“developer-signed”) for which we didn’t yet have a TeamID or SigningID rule
2.  Unsigned (including [`adhoc`](https://developer.apple.com/documentation/security/seccodesignatureflags/adhoc) signed) binaries built locally
3.  Unsigned binaries from package managers or repositories (e.g., Homebrew, Terraform plugins, npm, GitHub releases)

To address these, we took a multi-pronged approach:

-   **Proactive review:** We reviewed developer-signed applications installed on more than three devices, categorizing them into global allow rules or global block rules. For apps that didn’t fit into either category (for example, a personal finance app that didn’t have a business use, but would be OK to allow on a per-user basis), we decided to block the application initially, but allow the user to approve it in a self-service manner—more on this later!
-   **Compiler rules:** We added rules for compilers to cover locally built binaries, ensuring developers could work uninterrupted.
-   **Package rules:** Packages distributed through tools like Homebrew posed a challenge—updates would change a binary’s SHA-256 hash, triggering blocks. To solve this, we created a custom Package Rule system.

#### [The Package Rule workflow](#the-package-rule-workflow)

Our Package Rule system dynamically generates Binary (SHA-256) rules for packages from their official sources like Homebrew or GitHub. Here’s how it works:

-   For each package, we define a Package rule with a `package_type` (e.g., `homebrew`) and identifier (e.g., `vim`). These rules are defined in the same GitHub repository where we manage the rest of our Santa global rules and configuration as code.
-   A custom workflow fetches the latest SHA-256 hash from the official source or downloads the package to compute it.
-   The workflow runs every 30 minutes on macOS runners to ensure rules stay current. It’s important here to use the same architecture that you support within your fleet—ARM, x86, or both—to get the correct SHA-256 values.
-   New Binary rules are distributed to the fleet, preventing blocks when packages update.

Example Package rules:

JSON

```
 [
   {
      package_type: "homebrew",
      package: "vim",
   },
   {
      package_type: "github",
      package: "rust-lang/rust-analyzer",
   }
]
```

## [Minimizing disruption: A user-centric approach](#minimizing-disruption-a-user-centric-approach)

As outlined in our [previous post](https://www.figma.com/blog/figmas-modern-endpoint-strategy/)

, security must balance protection with usability. Before proceeding with the rollout, we looked for ways to minimize disruptions for employees.

A **sync server** is used to programmatically update and distribute Santa rules and configuration to a fleet of devices. We built customizations on top of the open source sync server [Rudolph](https://github.com/airbnb/rudolph).

Due to our work developing an allowlist in monitoring mode, we believed that blocked binaries should be rare. But when a binary is blocked, users need a fast, intuitive way to resolve the issue. Instead of customizing Santa’s client-side GUI, we leveraged our Enterprise Slack—accessible exclusively on Figma-managed devices—as our primary interface.

When Santa blocks an application, the **sync server** receives the block event and checks the binary against malware databases (e.g., ReversingLabs) and other risk and policy indicators.

Our custom Santa Slack app also offers flexibility to impose stricter policies as needed, e.g., for users whose roles make them more likely to be targeted by attackers.

If those checks pass, the user receives a Slack message via our custom Santa app, offering options to either approve the application (which creates a machine-specific rule), do nothing, or flag it as malware.

If the app fails our checks, the user is notified that it was blocked, with the option to follow up with the security team if needed.

![A macOS pop-up from the Santa security app informing the user that the ‘santa_block_demo’ application has been blocked and can be allowed via Slack.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAAB4klEQVR4nHWTSW/bMBSE82cSSRQXcRW1WLIWV7aTFkaBXoouORYF/P+PU5B2laSNDx8IgY/zhm+ouyx9QIBkyUqeJfCUYOQUjuVglICzHDTP3tS9Jrvq3L23yUiCQ8Hx3RnMWsIaFSkEQ07Sm6IkSy6CobMs+HrQaYldaXFqKky1R3PFlxZGS2hVxNVoBa1kPPvXfRQUnKKuSgzbDtO4jczTgGU3Yb+b8eHKbh4xjluMQx9rwtp3LSrv4khWwTAjJQWc1dHJpm1iYWgw9B36boNtf6EPdG2sCSasUf87XMMg6SpeeRvFndHxit6Z6MSXJjYuBI+1+T8zfTeUYN85g6apYI2GkkV0E76DmCxEFLsZClm5diMZmBCQxkEoAy4klHVQ1oMXCjmlN9O+e7luSDsFyzNQSkC5AJMWtDBgQoJJAyod8kKDCxHHIqUE4wKEvLi9COYMVNaQfoJpdrBtYIHZHCDrBcr3KH2Nqq7h6wp932G/XzAvR/jNjELp16GkSEWFpPkKOv+GOZ7hns5wj2fIwxn59Au8+4KmGy/PZRpwPC44nT7h8ekjhnmJjcLTi4JZmiDhDvflZzy0P0D7n+DDcyTrn3HffEPqjtC2ugQTHHZtfEKbtkZde5TOxCDDr/cHpFJ/VKGwZqUAAAAASUVORK5CYII=)![A macOS pop-up from the Santa security app informing the user that the ‘santa_block_demo’ application has been blocked and can be allowed via Slack.](https://cdn.sanity.io/images/599r6htc/regionalized/1f318c9455829fa4bf618129b9a94cca21d9cfe9-2206x1320.png?w=804&h=481&q=75&fit=max&auto=format)

This is the popup users see when an application is blocked. Clicking Open Santa App will take them to our custom Santa Slack app.

![Slack notification from the Santa app blocking an untrusted application named ‘santa_block_demo’, with options to allow, block, or flag as malware.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAABb0lEQVR4nH2RyW4UMRRF61O6usrl8myXa+gpnSgsEGKDQOIbkPj/9UF2miaBiMX1s95w7/N1cxQjF2WJxiOVRQhF1w20e0Hbipd4vw817l7lu35ESEPXS3ZtT/MtTHxfDjxtJ1LecH5CmYDUjlH7GxzaBLSNqCrsbnV37xFSV/LmYjzPaeHhcGJdj4SY63BpKsQFxkVSXsnLER/nmvsj5qtA3VIoml4orA2sy8o8zzjnGUdDP+g7ylBeDizbGRcyw2jf1PtBV7JKuBcKbQM5L4SQUMowDIoi9LtJjpaYFuK01e1eE3R/oSmHNp6UMt4HjDJo/YJRmepNLzVD8U15+tvT/kuojCPmTJozcZpIUyKliRhTtcPogK+IKGnfbP8P4V6MiOLb6YB+uqAfzrhtq59Qfj3Fhatf+eJPfPVnLmpCCk2x6l3CtpPsnKd9PNJ+vNJ+uCC2BRszPs2kMPNJr/zQV37qRz4PGd0pytx7+AVbrQ8Rxdse6wAAAABJRU5ErkJggg==)![Slack notification from the Santa app blocking an untrusted application named ‘santa_block_demo’, with options to allow, block, or flag as malware.](https://cdn.sanity.io/images/599r6htc/regionalized/9f52565626651839b0bd93548c3a746a2123ad2d-1440x662.png?rect=1,0,1439,662&w=804&h=370&q=75&fit=max&auto=format)

Our Santa Slack app lets the user self-approve a blocked application if it passes our standard security checks.

### [Ensuring fast rule sync](#ensuring-fast-rule-sync)

To ensure approvals take effect quickly, we faced a challenge: Santa’s default sync interval (60 seconds) was too slow, leading to repeated blocks. Google’s internal solution for Santa at the time used Firebase Cloud Messaging, but this wasn’t publicly available. As a workaround, we developed a package that can trigger the `santactl sync` command on a device via an API call to our MDM server, allowing the device to retrieve the new self-approved rules. This reduced the time from approval to rule enforcement to around three seconds.

### [Limits on self-approved applications](#limits-on-self-approved-applications)

While Santa’s self-service flow empowers users to approve new applications, we maintain other limits on these self-approved applications to ensure meaningful security outcomes, particularly around macOS TCC (Transparency, Consent, and Control) permissions. If an application requests sensitive permissions like Accessibility or Full Disk Access, our endpoint security system (built on osquery) automatically detects and unsets the new permission until the security team reviews it.

After review, we update Santa’s rules and our application permission allowlist. We may decide to globally block an application due to the new permissions it requests—these cases, while rare, will require users to follow up with the security team for approval.

## [Rolling out Santa: A phased approach](#rolling-out-santa-a-phased-approach)

Communication was key to a successful rollout. At a company all-hands, we presented real-world examples of breaches caused by endpoint malware, explained why Santa mattered, and discussed how to handle blocks.

We also knew some users might encounter excessive blocks during the rollout, so we built an **escape hatch**. Using the Slack command `/santa disable`, users could temporarily switch their machine to monitoring mode. This allowed us to investigate and resolve issues without disrupting workflows.

We rolled out lockdown mode in phases, across a total timeframe of around three months:

-   **10% cohort:** We started with users who had zero unknown binaries in the past month.
-   **25%, 50%, and 70% cohorts:** We gradually included users with fewer than 10 unique unknown binaries, addressing issues as they arose, and enabling lockdown mode for all new hires when we reached the 70% mark. The final 30% included engineers and data scientists, and because of the tools they use, creating rules for these groups was more difficult. As one example, Anaconda signs each Python binary locally with `codesign` ad-hoc signing in the user workspace, generating unique hashes per machine. Options like a Compiler rule for `codesign` or a PathRegex rule for the Python binary’s install path were more permissive than we wanted fleet wide. We addressed this by enhancing our sync server to support group-based rule sets, scoping permissive Compiler or PathRegex rules to specific groups needing these tools.

Figma’s **Endpoint Security Baseline (ESB)** is a set of security controls that keep corporate devices secure. ESB enforces security policies, preventing out-of-compliance devices from accessing internal systems.

-   **98% cohort:** Having onboarded most of the company, we paused for a month to investigate machines left with more than 10 unknown binaries and those that used the `/santa disable` escape hatch, adding global, group, or machine-specific rules as needed.
-   **100% cohort:** Once we hit 100%, we retired the `/santa disable` command and made lockdown mode part of our **Endpoint Security Baseline.**

![Stylized rollout chart illustrating stages of feature deployment. Green and yellow stacked bands show milestones: 10% users with no unknown binaries, 25%-50% cohort growth, 70% new hires in lockdown mode, 98% complex cases reviewed, and 100% full deployment marked 'Santa on everyone'.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAC4jAAAuIwF4pT92AAACmklEQVR4nJ3S/0vUcBzHcf+YfhHs26loRkVQYKhJEEFfDIy+EkH0XZQKKis7E+oHK+Ois9QSLLjSTvNL6u3O23anm9vtbtt5N7OIgn4K+u0Zm2BCEOUPHzYGe+z1er9X4DgOKzn5fN67zs3NYRgGqVTKuy9YCea+mE6n0XWdVEonkUggy7L3rOB/EuVyuaVE8XgcQRA8bHp6BlVVyWQy/wa6mGVZaNosiqIyM6MwFY8zGZlESkQw0iK2nfI+WPC3NNlsdimVrmtIkuQlE+UYQ5ERgv3dvPrQhm614ziTOE7+T9DFTNP0KiSTSTRNwzItr87sbBJNH0RIdnCtu5GdN+po7NrBtH2EhYW35JeDy2fkDlsURWKxmIcahkZ2bor8fDefvzQQT++ivn0zq06XcTTgQ7L2srAQWgRdyLZtb+1uLdMysS3LQ6WEzLAwzjvhJap5la/f9/DjZwUz8+s49rSUoqZy6jqKCcn7yWTfLIJuKheTZBlRlFBUFTWlMypFeRDq5uTD6xx/VMcLYRPpz6vJfSsiaq+jub+cg4EKDjwu50rfIcaS/V5LD3Tn425QVSViyfc8Hwly/vkVqv0HKblcyZabFZx6tp5b/Wu5PeCjNeyjM+qjVyrmUt8G6gPH6Iu8+70UO5tFScnElB4GxAbuhXdzoXcrp7o2cqannBOdZWy7U8LqpmIKG0upbCuhM1qE8rGQtiEfdR2H6Z0YWATzjoNqaLya7ONhuInO8X2ElSomjGoimVpiZi0vojXsv1/DmnM1FJ7dSVVLLT3CDoyPWwmMbOdM8CwhYRjHq5zPIaoJgkMvaXt9n66xVhSzhflP7vHjfGpF1P20h/w0PvFzMdBKS+9dRhN+MrlmwlM3CQ4+JarI3t/yC3kWRuqoyfk3AAAAAElFTkSuQmCC)![Stylized rollout chart illustrating stages of feature deployment. Green and yellow stacked bands show milestones: 10% users with no unknown binaries, 25%-50% cohort growth, 70% new hires in lockdown mode, 98% complex cases reviewed, and 100% full deployment marked 'Santa on everyone'.](https://cdn.sanity.io/images/599r6htc/regionalized/a2a36206db2aa3b6186f1475228d6d12ca1e0c56-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

## [Santa in action, one year later](#santa-in-action-one-year-later)

After over a year in lockdown mode, here’s what Santa looks like at Figma:

-   **100% fleet coverage:** All laptops in lockdown mode
-   **Global allowlist:** ~150 rules (e.g., Slack, Zoom, Chrome) using Signing ID and Team ID
-   **Global blocklist:** ~50 rules, including software like unapproved remote access tools
-   **Package rules:** ~80,000 Binary rules generated from our ~200 Package rules
-   **Compiler rules:** ~10, supporting developer workflows
-   **PathRegex rules:** ~50, tightly scoped to minimize risks but used expediently for rollout; we aim to reduce these over time
-   **Personal rules:** Median of 3 per user
-   **P95 blocks per week:** Steady state of 3–4, with over 90% resolved via self-service

We’ve had to navigate a few roadbumps along the way. For one, as Package rules grew to ~80,000 Binary rules, initial sync times for new machines reached several minutes, occasionally causing connection drops mid-sync. This left devices with incomplete rule sets, blocking apps that should be allowed.

We mitigated this by adding [static allowlist rules in the configuration](https://northpole.dev/configuration/keys#StaticRules) for critical applications (e.g., MDM, Chrome, Slack, and Zoom), ensuring functionality regardless of sync state. Over time, we’ll continue to improve Package rule maintenance, with work planned to expire rules for older package versions and improve sync performance.

One of our pain points with Santa has been a particular edge case for Compiler rules in the case of using `go run` during local development (detailed in this [GitHub issue](https://github.com/google/santa/issues/1327)). In short, Compiler rules work when using `go build` and then running the binary created as a result; but using `go run` to compile and execute the binary immediately creates a race condition where Santa isn’t able to create a Binary rule for the compiled binary before it’s executed, resulting in a block for the user. We’ve worked around the issue by updating scripts to avoid `go run` or adding PathRegex rules for now.

## [Key takeaways for your Santa rollout](#key-takeaways-for-your-santa-rollout)

If you’re considering a binary authorization rollout with UX as a priority, here’s what we learned:

-   **Include an escape hatch:** Allow users to switch to monitoring mode during the rollout to derisk disruptions.
-   **Automate package updates:** Build a workflow like our Package Rule system or manage package versions centrally to handle frequent updates.
-   **Avoid path-based rules:** Opt for Compiler or Package rules whenever possible, and when using path-based rules, scope them tightly to specific paths and only the machines that require them.
-   **Monitor and alert:** Proactively track block events (e.g., more than three blocks per day) with alerts to assist users before issues escalate. Monitor rule counts to ensure devices sync all rules, preventing incomplete sets that cause unexpected blocks. Alert on sync failures to detect machines not connecting to the sync server, ensuring the self-service approval flow remains functional.
-   **Stage changes with pilot groups:** Santa version updates or major configuration changes can disrupt users. Mitigate risks by testing these changes with a small pilot group first. Our pilot approach has repeatedly caught potential issues early.

Rolling out binary authorization across Figma’s fleet was a significant step in strengthening our endpoint security. By combining data-driven rule creation, automated workflows, and a user-friendly self-service model, we achieved robust protection with minimal disruption. We hope our journey inspires others to explore binary authorization as a powerful tool for securing their fleets.

![A stylized graphic design featuring a large gray flower-like shape surrounded by colorful geometric shapes and pixels on a green background, with "877A7A" displayed vertically on the right side.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADDElEQVR4nG2U3VMaZxTGvQVMW5sJTW3SmjZX2pnEDCKShBiLTigqGCEq7LLALq4rIF8LAnGBgF9V22nSJpl+zTTepdPkrpf9234dMFo0Xjzzvu+Z9zzznDPnOT1mYYRjmNpn2IZJsJ3EOgifeZ/NEf5Hz/Hlg9AIVnGUftnJgHiPIWmGYTXADXWG6/EpLkbuYhHsJ4kWYZReYQxL2IG5K35CaF1wcVNcxKWl8Ed0dPUH9uq/8aT2PfFchVvLQfoiY5jfqbdK4wwm/HwV9/KhePt9wv5HAVxzTwn6/iTn/4PDxF/8W/ubN81D9h8/ZTGjcS02gaXz386g6iVaUZnJSnwiTWAKdxOKY/SH4kxMvyR+26DhyvLav8U/6havSk0Oqg0KxSyTq0Guxe7zUcSJLe2jupchZizzWcyNKXxUdo9ZdPCx5mGwtIonV0eWBBpLEr8vNHmh1GjpBVqVEs1ymbyeYz4lMSh7cObnaTzXUXeSXJUnOwrb6nvMESdXSvOM/5LA/2ucpe0ghR2dg9LPFLUqoXSMtJ6kXmzyOPuczNounhWFKV2i+bKMtpfm825Ck+jgUsrN8P4sD148ZOEgQPKnLMbmFkJa486yj9BalFJ2l7z6lszKIUFtnZmCxpNnFdTtdwpDxwrbIyCOMqC5mDYCaDsK+mYSwyiyqqd4lImS1JMYpW6FCdw5kY39PHJd5cqpHnYGd4SByDiBxCK6qlBf1Wis65QbBnprg8pmnUqzQaZaJLAWPeph7iG1H/MstzSuxo9KPjU2l6V7OMRvCfoesOb3kVNkMnqB9VqF8u4myndN7lcUvlTc9IlO7Nk56s+KqNup90tuo1e0Y10a5WvvMJPuEQI+L3IggK5E0Y0yc60qA3oYS9SJOWxnSJtGriXxF2UuR8/OYQc2LGEbF4O3+GLexo2wm3HRx6y2hHdD46ahcikzi0VydFrUdspQws/1+PT5TunGBcFOX+wOVuUb+lem+DTloU+b4oJ8F7N41Py2r9te7hUcpzx+LuHxFjGJ9lPb5OxmOQ//AbnaPvLaxzpaAAAAAElFTkSuQmCC)![A stylized graphic design featuring a large gray flower-like shape surrounded by colorful geometric shapes and pixels on a green background, with "877A7A" displayed vertically on the right side.](https://cdn.sanity.io/images/599r6htc/regionalized/e85478d82728490083efe8027723e309ed0cb3fd-2048x1536.png?w=2048&h=1536&q=75&fit=max&auto=format)