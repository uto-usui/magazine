---
title: "Our $1 million hacker challenge for React2Shell"
source: "https://vercel.com/blog/our-million-dollar-hacker-challenge-for-react2shell"
publishedDate: "2025-12-19"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

8 min read

Dec 19, 2025

In the weeks following React2Shell's disclosure, our firewall blocked over 6 million exploit attempts targeting deployments running vulnerable versions of Next.js, with 2.3 million in a single 24-hour period at peak.

This was possible thanks to Seawall, the deep request inspection layer of the Vercel Web Application Firewall (WAF). We worked with 116 security researchers to find every WAF bypass they could, paying out over $1 million and shipping 20 unique updates to our WAF in 48 hours as new techniques were reported. The bypass techniques they discovered are now permanent additions to our firewall, protecting every deployment on the platform.

But WAF rules are only the first line of defense. **We are now disclosing for the first time an additional defense-in-depth against RCE on the Vercel platform** that operates directly on the compute layer. Data from this defense-in-depth allows us to state with high confidence that the WAF was extraordinarily effective against exploitation of React2Shell.

This post is about what we built to protect our customers and what it means for security on Vercel going forward.

## [Link to heading](#what-we-are-defending-against)What we are defending against

This strange looking payload is responsible for many sleepless nights across the industry:

```
{  0: {    status: "resolved_model",    reason: 0,    _response: {      _prefix: "console.log('☠️')//",      _formData: {        get: "$1:then:constructor",      },    },    then: "$1:then",    value: '{"then":"$B"}',  },  1: "$@0",}
```

Example PoC of the React2Shell exploit

That's the React2Shell payload. Send this to any server running vulnerable React Server Components and that `console.log('☠️')` string gets evaluated server-side. That string can be replaced with virtually anything. Run programs, extract secrets, make network calls. CVE-2025-55182 scored a 10.0 out of 10.0. It's just about as bad as it gets.

After the CVE was responsibly disclosed, the countdown clock started. We knew bad actors would race to exploit it, so we engaged our industry partners like AWS, Google, Microsoft, Cloudflare, Netlify, Fastly, Deno, and others before the public knew anything was wrong. Mutual cooperation meant that by the time coordinated public disclosure took place, every major platform provider already had mitigations in place, ensuring as many users as possible were protected before they patched.

But we also knew what was coming. When a vulnerability gets disclosed, security researchers, malicious actors, and curious bystanders start examining the affected code paths, looking for bypasses and related vulnerabilities. Within days, researchers identified two additional vulnerabilities in React Server Components, requiring more patches and WAF updates.

We needed defenses that could adapt.

## [Link to heading](#the-$50k-bounty)The $50k bounty

Rather than wait for WAF bypasses to surface in the wild, we decided to take control of the patch cycle and pay the best security researchers in the world to find them for us first.

Within hours of the decision, we had a public bug bounty program live on HackerOne. Launching a program like this typically takes weeks. HackerOne's team worked around the clock to make it happen, and according to co-founder Michiel Prins, it was one of the fastest public program launches in their history.

We offered $50,000 for every unique technique that bypassed our WAF protections. The bounty was deliberately high to help redirect researcher energy toward responsible disclosure instead of black market sales, and to turn the people who were going to be probing our defenses anyway into collaborators.

The program worked. 116 researchers participated, submitting 156 reports. By the time the program closed, we had validated 38 responsible disclosures and paid out $1 million across 20 unique bypass techniques. We shared these techniques with other platform providers so they could harden their own defenses. What we learned didn't just protect Vercel customers.

## [Link to heading](#seawall:-hardening-our-waf)Seawall: Hardening our WAF

Seawall is the deep request inspection layer of our WAF, examining request payloads rather than just headers and blocking malicious patterns before they reach your application.

After each HackerOne report, we followed a repeatable process. Reproduce the bypass. Convert it into a test case. Update the rules to block it. Deploy globally. Wait for the next report. Repeat. We shipped 20 updates to Seawall in the first 48 hours after the bounty program launched, with average response time dropping from two hours to thirty minutes per finding as we refined our process.

Most reports came in during the first 24 hours as researchers tested novel variations. A smaller batch in the second 24 hours. Then a trickle of increasingly sophisticated techniques over the following days as people dug deeper into edge cases.

One thing that surprised us was how useful AI turned out to be for the work of reproducing reports. The submissions generally rely on subtle nuances that are easy to miss, and the exploitation conditions can be very specific. Modern AI models are remarkably good at teasing out those details and converting them into reproducible test cases. Every validated report became a Go-based unit test that now runs on CI whenever Seawall changes. The techniques researchers discovered during this program will continue protecting customers long after the bounty ended.

## [Link to heading](#adding-to-our-defense-in-depth-strategy)Adding to our defense-in-depth strategy

To protect customers further, we deployed a second layer of defense that operates directly on the compute layer. This runtime mitigation layer operates inside the application itself, not at the WAF layer. For this reason it does not rely on heuristics and instead directly eliminates the code evaluation vector targeted by the attack.

React2Shell relies on the fact that JavaScript functions have a `constructor` property which can be used to eval code at runtime. The runtime mitigation denies this code execution during React rendering, breaking the attack vector at its core. We expected that legitimate applications would never use this capability, and when we trialed the mitigation we saw nothing touching this code path in practice, so we knew it was safe to deploy.

Deno's team was the first to ship a runtime mitigation, and their willingness to share details gave us confidence in the direction we were already exploring. We adapted our implementation for Node.js, validated at scale that it was safe to deploy, then shared it back to other platform providers so that they could benefit from it as well.

Dedicated logging was set up to fire whenever the runtime mitigation triggered, with automatic alerts to the security team. If an attacker found a WAF bypass that actually worked in production, the runtime mitigation would catch it and we'd know immediately.

Today, this mitigation covers 96% of traffic on Vercel. Through the logging from the second layer of defense in place, we actually know when the WAF gets bypassed in practice, and so we can state with high confidence that Vercel's WAF was highly effective against exploitation of React2Shell.

## [Link to heading](#stopping-the-most-sophisticated-bypasses)Stopping the most sophisticated bypasses

The HackerOne program attracted talented researchers from around the world. Thanks to everyone who participated and helped make Seawall stronger.

The core job of a WAF protecting against React2Shell is to identify malicious payloads while allowing legitimate ones. Actually executing the code to check isn't an option, so pattern matching and parsing have to be enough. For researchers, that means finding ways to hide the exploit from pattern matching.

[Lachlan Davidson](https://github.com/lachlan2k/), the original discoverer of React2Shell, and his research partner [Sylvie](https://hackerone.com/sy1vi3) submitted two bypasses that we want to walk through here. They demonstrate both the challenges of building a secure WAF and the creativity of the security research involved.

### [Link to heading](#recursive-utf-encoding)Recursive UTF encoding

Many bypasses try to confuse the parser by replacing regular characters with their Unicode representation in JSON. This is relatively easy to normalize and most WAFs do so by default.

But what if you could Unicode encode the Unicode encoding? And then do it again?

Lachlan and Sylvie discovered that an exploit gadget that could force the React flight protocol to perform repeated JSON decoding of the same string. Any WAF robust against N layers of Unicode encoding could be defeated by using the gadget N+1 times. Seawall now recursively decodes until the payload is fully normalized, closing this class of bypass entirely.

Notably, this and similar bypasses also relied on extremely subtle behaviors of JavaScript's built-in ReadableStream class where it is possible to construct errored stream chunks that, against default behavior, do not terminate stream processing and then relying on the fact the stringification as part of stream error message can be leveraged into a function call exploit gadget.

### [Link to heading](#accessing-constructor-without-the-colon)Accessing constructor without the colon

The core RCE gadget of React2Shell accesses the constructor property of a function using the React flight protocol's colon-based property access syntax. That is why the exploit contains the string `:constructor`, and WAF protections detect bad payloads based on this string.

One way to bypass this would be to find an entirely different exploit chain that doesn't use the constructor property, but nobody has been able to find one. Lachlan found another way: going from `:constructor` to `constructor`. Notice the missing colon?

They did this by discovering a way to do property access and string manipulation using similar gadgets specific to the webpack modules in context for RSC parsing. A WAF can detect this approach by targeting strings further up the attack chain, but it demonstrates the power an attacker has in obfuscating payloads beyond the original proof of concept.

## [Link to heading](#helping-customers-upgrade:-security-as-a-product-experience)Helping customers upgrade: Security as a product experience

Defense in depth bought time, but the only true fix was getting people to upgrade. We shipped a [security bulletin](https://vercel.com/kb/bulletin/react2shell) to serve as the single source of truth, dashboard banners to help identify vulnerable deployments, a CLI tool (`npx fix-react2shell-next`) to help patch vulnerable apps, and automated PRs via Vercel Agent to automate that process as much as possible.

## [Link to heading](#looking-ahead)Looking ahead

React2Shell tested our security infrastructure in ways we couldn’t have simulated. We came out of this with a battle-hardened WAF, a runtime defense layer that we can adapt for future vulnerabilities, and a playbook for responding to the next critical CVE.

The bypass techniques researchers discovered during the HackerOne program are now permanent additions to our firewall. The cross-industry collaboration set a template for how platforms can work together when the web is under attack. The tools shipped to help customers upgrade are now part of how we respond to any security incident.

But platform protections only buy time. They're a first line of defense, not a replacement for patching. If you're running a vulnerable version of Next.js, patch now.

The next critical vulnerability will come, and when it does, Vercel customers can be confident that we will have protections in place while they patch.

## [Link to heading](#credits)Credits

First and foremost, thank you to [Lachlan Davidson](https://github.com/lachlan2k/) for responsibly disclosing React2Shell. He continued to probe our defenses after disclosure and submitted some of the most sophisticated bypasses we saw.

Thank you to every researcher who participated in our HackerOne program: hakikiwidya, [luhko](https://hackerone.com/luhko), [lachlan2k](https://hackerone.com/lachlan2k), [sy1vi3](https://hackerone.com/sy1vi3), [maple3142](https://hackerone.com/maple3142), [hacktronresearch](https://hackerone.com/hacktronresearch), [bugra](https://hackerone.com/bugra), [lonecat](https://hackerone.com/lonecat), [ryotak](https://hackerone.com/ryotak), [ch1axan](https://hackerone.com/ch1axan), [chilaxan](https://hackerone.com/chilaxan), [cjm00n](https://hackerone.com/cjm00n), [francisconeves97](https://hackerone.com/francisconeves97), [phithon](https://hackerone.com/phithon), [shubs](https://hackerone.com/shubs), and [hashkitten](https://hackerone.com/hashkitten).

This response wouldn't have been possible without our partners:

-   **HackerOne** mobilized their team to launch our bug bounty program in under six hours. This process typically takes weeks.
    
-   **Latacora IntrusionOps** provided critical incident response support, helping with triage, validation, and reproduction of submissions as they came in.
    

Special thanks to [Marten Abrahamsen](https://www.linkedin.com/in/martenabrahamsen), Vercel CFO, for approving the $1 million bounty payout.