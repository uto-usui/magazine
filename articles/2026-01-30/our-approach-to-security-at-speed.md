---
title: "Our approach to security at speed"
source: "https://www.figma.com/blog/our-approach-to-security-at-speed/"
publishedDate: "2022-10-13"
category: "design"
feedName: "Figma Blog"
---

On the Figma security team, our goal is to help Figmates ship new products and features as securely as possible—all without slowing them down. We wanted to share our operating model, which prioritizes transparency, decentralized and reusable solutions, and earning trust over mandating processes.

## [Systematically assessing risk](#systematically-assessing-risk)

Last year, the FigJam team built [rich previews for links](https://help.figma.com/hc/en-us/articles/4414079911575-Add-link-previews-in-FigJam#h_01FP9FS4QZ8ZHGJQV11FK961J8). A user can paste a link into FigJam and instead of only seeing link text like [https://figma.com](https://figma.com/) they see a tile that includes the icon, description, and other metadata from the linked site.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAAsTAAALEwEAmpwYAAABgUlEQVQokYWSXW+bMBSG+///TC52Me1il41SVYm0ZNIqaIAQf0DA2Mbm+BM2FZSqm1D3yLeP3+P3+OH3nXEcAUAI0fe91nqYYZKfqzJHBa1J1zHZ99baaZoW5eGjbIyRUi4yADjnBmswq1/O6fOP4+Puab9/JgR77xf/L7nv+6IokiRJ0/RyuXDOjbVciuQ1+/74tPmy+fZ1c35NrHMrMuf8dDptt9vdbnc4HLIs45wLIRAmL0l6PO5//dzf6sqHsDK21hpjnGVZnudFUSCEulmuK4qvV3QtKcFSyhjjSrJzznwAAIy1g9YNupL8XBHSNI1WKsa4kuycA4Claq21UkppraTkNRU1VVIMw+BW256myTnXdR2ltKoqSinGmBDS3G5KCm9NjCHOrMvee8YYulOWJUKobVsACCGMMY4z63IIQSnF2nY5bdsyxqSUxhhrrff+MzmGAMPQL/9EKZgxxnjv4z32k+QIYN56mk3vfQhv73x3/jO2vW9rmfMflrve5T//MOcR2iUnrwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/b64061c179555b773a987172928bf66011e14c0f-1600x1002.png?rect=1,0,1598,1002&w=804&h=504&q=75&fit=max&auto=format)

We take an integrated approach to make sure any new features like rich preview links are secure. That includes periodically reviewing upcoming new features and workflows to identify potential security risks and reaching out to the appropriate teams to better understand and help them secure their projects. We also host security team office hours three times a week to answer questions and discuss upcoming product launches. Before office hours, we ask Figmates to answer a three-question survey called “ThreatJam,” which lives in a FigJam file:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAIAAAB2/0i6AAAACXBIWXMAAAsTAAALEwEAmpwYAAABYUlEQVQYlV2PbWsTQRSF9///GxEUhJYaWlKVqE1tg4Q2WZPNzM7szu683zszd5RUEOnz8XAeOKfxznrn/AvWOecRE5VcACCEcA6tlYJx3k5Kaq31fEZrbYxpJtkbrSfjJ+219cYhBEzWRjX6UfpBWtmrvuP8V8uOOy72vdxzKUZlrW2Cs9ZBK+GZg7LJhhwmg89bePgef3yLD3dxcx+6PRPdp0N3dRgWbFrymdmQU2qIakQ6jGkn0uyLixTkCOtVvLmM1xewvILP17jfnuTp8ijeHPVb5j70/hRyrbWptRaqAckBRSQXyUsV1quw/BhvF/HLTVzdYvvEBr5gwzvu3vf+QngW8++/8j9SOcthnGCzxvuvebfNxzZ3h6SEVOJxnO5mWGt8NDin8lrOhTwQKJ23G3r6WfVcESpCin7Wg3LapGIzuUzn0a/k8vIffSTZ11FWxEpUiRCjNoMPphDRf/0/4kbA+dr8JnQAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/320a44644904ba02b077abae17ba8e7104f45264-1600x619.png?w=804&h=311&q=75&fit=max&auto=format)

The questions prompt Figma’s product teams to share information with the security team so we can assess potential risks, from the possibility of compromised vendor components to misconfigured cloud resources. For example, the team that built rich preview links reached out to us for advice on how to fetch the link metadata to include in previews. After seeing their responses to the survey and discussing live at office hours, we identified the potential for malicious users to:

-   Enter internal Figma server links to leak internal resources (a vulnerability known as server-side request forgery or SSRF)
-   Use Figma’s resources to send requests to a linked site taking it offline (a.k.a. denial of service or DoS)
-   Link to sites with malicious HTML that deface or run on FigJam

To prevent these attacks, we suggested isolating the scraping and parsing code that handles user input in a cloud function. The cloud function runs code in a separate virtual computer on a separate virtual network. This isolates it from the rest of Figma’s infrastructure and prevents SSRF attacks from having any impact. This capability is one of many security advantages of cloud-native infrastructure.

To limit our traffic to linked sites, we use the built-in cloud function rate limiting, save the scraped data for a limited time, and only allow requests to the standard HTTP and HTTPS ports. For malicious HTML we limit parsing to specific tags, and reuse existing work to secure plugins and widgets to safely embed the link metadata (previously discussed [here](https://www.figma.com/blog/how-we-built-the-figma-plugin-system/)

and

[here

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAACeklEQVQoz0XOa0hTYRjA8aNWire0zKFNYSkSqaixUgS30tJorq2lopZZmN2JVZQ5RLMPBilISEaoEaEZQhcbXcwPm+Gl0FRIpSgIK6HwQztzsUJ3/h0H0Qs/Hnjg+fMK9ZfPcrdFz0jPFmaeJDDXH4FrKAjPyAqY0oBow+328GVW4n3vKN/OHEA0qPiZr2SiIJWmI8VotRpCQ0NZEx6OYDamYW2KYb4/BPegP6J9NV+fJ/DpsZpvfaW4JntwjE8y1jOJtfYBL4pKGMhWYc+KpDsrlipNMnuS4kiPDPYSHuVHMdMYhrtvJYv2Vcxak3jYYqHZcp8uSzsfr1ThqD/KZ3MlfaVl1G3bTkmCkkJVOObkKG5ujaY7Q0HX1nV0bolA+F6kYv5iLI4mBbPNyVivVdNgGefcyQWaygeZKCzGaYpH3LuBYf0mKjNTUCoURK9bS7l6I7bcOH7sVjKvi/ESFiqUiCeUOE6vZ7Qyh8ulbRw/PMH5UzM0HOzlpeEIH/RamYbn+mxO5OWgVqu9zLpMRvcnsHAoil8yl0z40xrMst83QhisjqdEa2RzyjF27bhAue4qtbo2rhu6aDHeo7Wik/bGO3S0d3C7o52nHRa+3krlt7cR5CVIdh+kAR888hxsDSAvPYTwMAUZGdsp2ldPsWGMUoNImclF/aUFxt44EUUnTqfIr7lnLL7Nku99+dcRpBEBXgt4hgVe3fIlW+1LYKA/mxITyd1pRq8bx2SQKDRBbQ1MT/P/Oe3yQivf+8ByRyZIcgiZZ0jAdkNAmybg5+dLQEAgMco8sjUDFBiXKDJJ1NVITL2T8HgkJGkJyWFDmtIiDcu/kxvL/gKlmcGu/XQ4lAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/0b8018e50e309a8e484f8d36e4909f6710a33aad-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### An update on plugin security

Learn about Figma's response to the security vulnerabilities that were reported in a 3rd-party library that we use for plugin security



](https://www.figma.com/blog/an-update-on-plugin-security/)

). Following through on our recommendations, we provided links to code and documentation to help the team get started and review the code they wrote. Using cloud function features helped them quickly ship link previews while also addressing the potential attacks.

While we offer a set of customized recommendations to each team, we aim to decentralize decision making and create scalable solutions so that we’re not solving the same problem over and over again. This means that we focus on building libraries, frameworks, and mental models for other teams. Once we work with a team on a solution, oftentimes other teams will use it as a case study. For example, after we partnered with the FigJam team on link metadata fetching, other engineering teams have reused the pattern to implement similar functionality.

We also make office hours notes available to all Figmates, so that other teams can understand the thinking behind our guidance and get context on the work we do. Sharing information is key to creating a culture where security isn’t a blocker, but an enabler.

## [Defending against phishing and unintended information disclosures](#defending-against-phishing-and-unintended)

In addition to identifying product risks, we’re also responsible for helping a growing number of Figmates secure their devices and data. Our security team is small, so we rely on technical controls that effectively counter known attacks. For example, to mitigate the risk of phishing, Figmates are only able to access internal sites with a password-less second factor, scoped only to work on the site they’re accessing. When someone joins Figma, we send them a hardware authenticator key and help them register biometric authenticators—like Apple’s Touch ID or Windows Hello—on their laptop and phone.

When they access an internal site, it issues a challenge, their authenticator prompts them to tap or touch their key or device to prove their identity, and the authenticator signs and returns a response for the site to validate. These [FIDO2 / WebAuthn](https://webauthn.guide/) technologies augment our training with best-in-class phishing defenses, and are faster and more convenient than having Figmates remember and enter passwords and codes. Figmates have even made their own keychains to hold the hardware keys.

As a result, we can spend less time worrying about Figmate behavior and more time working on Figma itself.

Another example of this is our approach to document security. We anticipated that employees might inadvertently share internal documents with people outside the company or forget to lock down sharing permissions that could leak sensitive information. We’ve found that an automated detective control can provide a faster response time than manual intervention, so we wrote a bot to help scale this process. When a Figmate makes a document publicly available, they receive a Slack message confirming that they meant to make it public, along with directions on how to limit sharing.

What used to be a manual process that involved user training and individual outreach, has become a totally automated exercise that educates as it secures our document infrastructure.

## [Building for scale](#building-for-scale)

Figma has doubled in size over the past year—and so has the security team. We're continuing to find ways to make it easier for new members of our team to get up to speed quickly, and free up time for them to focus on other priorities in the process.

Our team is comfortable writing code, so we can rely on services with APIs to reuse and combine our tools and data. Since Figma runs in a public cloud, we can plug in vendors that use the cloud APIs. And to minimize operational toil, we prefer serverless cloud functions for our internal security tools (like sending the Figma Security Bot notifications above), instead of processes that require us to manually review alerts.

Beyond the initiatives here, we also work on a range of other projects, including tracking and incorporating data into our team planning, managing our bug bounty program, running penetration tests, monitoring security incidents or near misses, and building static and dynamic analysis tools. Our approach will evolve and grow with Figma, keeping the platform secure as it scales. We’re always looking for new Figmates to work with, if you’re interested take a look at [our open positions](https://www.figma.com/careers/).