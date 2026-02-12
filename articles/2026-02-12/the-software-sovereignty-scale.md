---
title: "The software sovereignty scale"
source: "https://dri.es/the-software-sovereignty-scale"
publishedDate: "2026-02-11"
category: "design"
feedName: "Sidebar"
---

Digital sovereignty depends less on where software comes from and more on who controls it. This post introduces a scale showing which technologies can never be taken away.

![A five-level digital sovereignty scale ranked from A to E. A represents copyleft open source with distributed copyright, B copyleft open source with a single copyright holder, C permissive open source, D European proprietary software, and E foreign proprietary software. Higher grades indicate greater control and sovereignty.](https://dri.es/files/images/blog/software-sovereignty-scale.png)

"Buy European" is becoming Europe's rallying cry for digital sovereignty. The logic is intuitive: if you want independence from American technology, buy from European companies instead.

However, I think "Buy European" gets one thing right and one thing wrong. It's right that Europe benefits from a stronger technology industry. But buying European does not guarantee sovereignty.

Sovereignty is _not_ about where a company is headquartered or where software was originally written. It is about who ultimately controls the technology.

The right question to ask about any technology: can someone take the software away from me?

When evaluating sovereignty, it is not enough to ask how much control you have today. You also need to ask how much of that control is structurally protected, built into the legal and community foundations, so it can't be taken away tomorrow.

The proposed scale measures structural protection. It is not a ranking of openness, nor does it capture every dimension of sovereignty. An Open Source license is highly beneficial for sovereignty, but not sufficient on its own. The scale also does not imply that one license is always better than another.

The most important distinction in the scale is between Open Source and proprietary. All three green grades give you the freedom to use, modify, and maintain the software independently. The differences between A, B, and C are real, but relatively minor. They reflect how structurally protected that freedom is against acquisition, relicensing, or loss of critical funding.

I used five levels, modeled on Europe's familiar A-through-E labels for [energy efficiency](https://en.wikipedia.org/wiki/European_Union_energy_label) and [food nutrition](https://en.wikipedia.org/wiki/Nutri-Score), from structurally sovereign to fully dependent. Frameworks like the [European Commission's Cloud Sovereignty Framework](https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en?filename=Cloud-Sovereignty-Framework.pdf) do not yet make these structural distinctions. This scale aims to improve on what exists and is used today, and I expect it to improve further through scrutiny and feedback.

Type

Can someone take it away?

Examples

A

**Copyleft + distributed copyright**

**No.** Relicensing often requires consent from hundreds of contributors, making it practically impossible. All derivatives must be Open Source forever.

Linux, Drupal, WordPress

B

**Copyleft + single copyright holder**

**No,** but a single copyright holder can relicense future versions.

MySQL → MariaDB

C

**Permissive Open Source**

**No,** but the license allows proprietary derivatives that can shift value away from the open project.

Redis (relicensed), Valkey (fork)

D

**European proprietary software**

**Yes.** A single acquisition transfers all control. Funding can disappear. You're a customer, not a stakeholder.

Skype

E

**Foreign proprietary software**

**Already taken.** Subject to the vendor's pricing, roadmap, and their government's jurisdiction. You're a customer, not a stakeholder.

Microsoft, Oracle, Salesforce

### Jurisdictional obligations change with ownership

At the bottom, **grade E**, is foreign proprietary software: no source code, no right to modify, and no alternative if the vendor changes terms. Your vendor is subject to its home government's jurisdiction, and by extension, so is your data.

**Grade D** is European proprietary software, which is where "Buy European" usually comes in. It has real benefits: European jurisdiction, GDPR alignment, local accountability, and it keeps investment circulating in the European ecosystem. As someone who has started companies and [invests in startups](https://dri.es/angel-investments), I want more technology companies to succeed, not fewer. But "European" can be a temporary property of a company: it can change with a single board meeting.

[Skype](https://en.wikipedia.org/wiki/Skype) was founded by a Swede and a Dane, built by Estonian engineers, and headquartered in Luxembourg. eBay acquired it in 2005, and Microsoft acquired it in 2011. The eBay transaction turned a world-leading European technology into an American one, and it was cemented with the Microsoft deal.

So ownership and jurisdiction matter, but they're not enough. A European company can be acquired tomorrow. Open Source offers something more important: it separates the code from any single company or country.

### Not all Open Source is equally sovereign

Open Source is what makes real sovereignty possible. At the same time, Open Source sovereignty exists on a spectrum. The level of protection comes down to two legal levers: the _license_ itself, and the _copyright ownership_, which determines who has the power to change the license.

**Grade C** is Open Source under a [permissive license](https://en.wikipedia.org/wiki/Permissive_software_license) like BSD, MIT, or Apache. You can view the code and fork it if needed, but the license does not require improvements to remain open. A company can take the code, build on it, and release a proprietary version.

If a closed commercial version becomes the standard through branding, hosted services, or enterprise features, governments that depend on it can become legally and operationally locked in again. They are back at grade E.

[Redis](https://en.wikipedia.org/wiki/Redis) shows how this dynamic unfolds. It was Open Source under a BSD license for fifteen years. In March 2024, Redis Ltd. [relicensed it under restrictive terms](https://redis.io/blog/redis-adopts-dual-source-available-licensing/) that the [Open Source Initiative](https://opensource.org/) does not approve as Open Source.

Fortunately, the community forked the last open version as [Valkey](https://en.wikipedia.org/wiki/Valkey), and Valkey is thriving. That is the strength of permissive Open Source: you can escape when terms change. Governments were fortunate Redis was forked, but the structural risk remains.

**Grade B** is Open Source under a [copyleft license](https://en.wikipedia.org/wiki/Copyleft) like the GPL, with a single copyright holder.

Copyleft adds a protection permissive licenses lack: any derivative of released code must also remain Open Source. For policymakers, this is a meaningful upgrade.

This is the level that saved MySQL. [MySQL AB](https://dri.es/the-history-of-mysql-ab), the Swedish company behind MySQL, released it under the GPL, so when Oracle acquired MySQL through the Sun Microsystems deal, the GPL ensured the code remained open. Michael Widenius, MySQL's original creator, took the code and built [MariaDB](https://en.wikipedia.org/wiki/MariaDB). Oracle got the brand, but the world kept the code.

And because MariaDB inherited MySQL's GPL license, it must stay open too. No future acquirer can make MariaDB proprietary. That is the difference between copyleft and a permissive license: copyleft lets someone fork _and_ forces all forks to stay open.

But grade B still has one limitation. The single copyright holder can release future versions under a different license. The existing code is protected by the GPL, but the project's future license is controlled by whoever holds the copyright.

Some projects amplify this risk by requiring contributors to sign a [Contributor License Agreement](https://en.wikipedia.org/wiki/Contributor_license_agreement), or CLA, which grants the project owner the right to relicense contributed code. [Elasticsearch](https://en.wikipedia.org/wiki/Elasticsearch), founded in Amsterdam, used its CLA in 2021 to relicense from Apache 2.0 to a non-open-source license, despite having over 1,500 contributors.

Finally, **grade A** is copyleft Open Source with distributed copyright ownership. When hundreds or thousands of contributors each own their portion of the code, relicensing requires the consent of every one of them. For anyone who refuses, the project must rewrite their contributions from scratch. The more contributors who independently own parts of the code, the harder relicensing becomes.

[Drupal](https://www.drupal.org/) has had contributions from tens of thousands of people [across 25 years](https://dri.es/25-years-of-drupal-what-i-have-learned), which makes relicensing structurally impossible. No acquisition, no board vote, no change in strategy can take these projects away from the people who build and depend on them. Copyleft projects with fewer independent contributors can be easier to relicense. Drupal's code is structurally sovereign by design.

### Sovereignty is a long-term commitment

Moving from E to D is progress. Moving from D to C is what really matters. Above C, the scale highlights smaller but still important tradeoffs, so when governments choose a lower grade, they do so knowingly rather than unknowingly.

An Open Source project that loses important funding often needs investment to remain viable. But unlike acquisition or relicensing, funding risk is largely within the EU's control through [government procurement](https://dri.es/funding-open-source-for-digital-sovereignty) and [public investment](https://dri.es/funding-open-source-like-public-infrastructure).

### Recommendation for the European Commission

Sovereignty involves many things: data location, supply chains, technical talent, and standards. Licensing and copyright form the structural foundation because they determine whether legal independence is even possible.

The [European Commission's Cloud Sovereignty Framework](https://commission.europa.eu/document/download/09579818-64a6-4dd5-9577-446ab6219113_en?filename=Cloud-Sovereignty-Framework.pdf) reflects this broader view. It evaluates cloud software across eight sovereignty objectives, including Technology Sovereignty, which asks whether software is "accessible under open licenses". This is the most important step, but it treats open licensing as binary: either software is open or it isn't.

I would encourage the Commission to strengthen its Technology Sovereignty objective in two ways:

1.  **Distinguish between license types.** Permissive licenses (BSD, MIT, Apache) place no obligation on derivatives to remain open. Copyleft licenses (GPL, AGPL) require derivative works to be released under the same open terms.
    
2.  **Assess copyright concentration and relicensing risk.** A project with a single copyright holder or a Contributor License Agreement can be relicensed regardless of its current license. A project with distributed copyright ownership cannot. This is the difference between a revocable and an irrevocable commitment to openness.
    

In follow-up posts, I will share two more recommendations for the Commission's framework: one about the relationship between the eight sovereignty objectives, and one about infrastructure jurisdiction. Together, these three posts aim to help strengthen what is already a serious and welcome effort. If you'd like, you can [subscribe](https://dri.es/subscribe) to follow along.

I think the Software Sovereignty Scale should be part of European procurement policy. When a government selects a content management system for its public websites or a database for its national health records, it should know the structural sovereignty grade of the technology it depends on.

For critical software, the question is simple: how easy is it for someone to take the software away from us?

_Special thanks to [Sachiko Muto](https://www.linkedin.com/in/sachikomuto/) and [Bert Boerland](https://www.drupal.org/u/g%C3%A1bor-hojtsy) for their review and contributions to this blog post._