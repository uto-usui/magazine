---
title: "How to make sure a designer never files a bug again"
source: "https://unsung.aresluna.org/how-to-make-sure-a-designer-never-files-a-bug-again/"
publishedDate: "2026-02-16"
category: "design"
feedName: "Sidebar"
---

-   The UI for filing bugs is inscrutable and has too many hoops to jump through.
-   No one does anything unless every field has been filed meticulously and there is a clear repro.
-   The designer is ridiculed if the thing isn’t actually a bug, is a duplicate, or if it was filed in the wrong place.
-   Front-end bugs are automatically “minor” or “nice to have”s without listening (as there is no loss of functionality, and no data loss).
-   The designer is always responsible for stating how it _should_ work, without being able to say “I am not sure why, but this started feeling off and it’s in an important place. Can we investigate?”
-   “This is as designed” is an automatic conversation ender.
-   The tiniest of external reports, social posts, or blog posts, immediately are prioritized higher than in-house experience.
-   Once every few years, a designer gets 20+ demotivating automated emails saying 20+ bugs they filed over the years have been closed automatically during a purge, without any word of explanation.
-   Simple human touches like “thanks for filing!” or “nice catch!” never enter the picture.
-   Engineers never file design bugs themselves.

If you’re an engineer, I can sense you might be getting frustrated, as most bullet points I listed look like extra work. I agree with you. It is. This post is as much about process, as it is about culture and the incentives it establishes. The best places I’ve worked were filled with shared trust and treated bugs as a joined responsibility of everyone, rather than a black-and-white division into “filers“ and “fixers,” with the ultimate end goal always being user’s experience – nothing else.

I also understand this dives right into an age-old tension between manufacture and craft. Bug-fixing processes have to be well-oiled bureaucracies with very specific rules so that they don’t turn into a pile of vibes and Brownian motions. But design (and, by extension, a lot of front-end) doesn’t work like that. Design needs room for taste, for careful exceptions, for escalation of immesurable things, and for a certain flexibility in even the basic definitions.

If it’s a tiny, but embarrassing bug, or a flow killer, or a thing that bothers your most valuable group of users, or something appearing in a well-trafficked place – it is no longer tiny. If it’s working as intended, but _it feels buggy to the user_ – it ought to be a bug. If it’s a long-standing bug, it should be considered as [cumulative damage already done](https://unsung.aresluna.org/the-autocorrect-battle-of-wills/), not “oh, this has been like this for a long time, no one cares.” If there’s a shaky repro, but the bug feels important, you need to work from principles or analyze the code. If it’s something no one mentioned externally (ergo: why fix it?), consider a lot of bugs rankle but never get reported, particularly if your company doesn’t project an external presence of caring about feedback and acting upon it. _cough cough_ Apple _cough cough cough cough cough dies coughing_

Of course, designers have responsibilities in the process also, among them mutual respect and understanding of engineering, clarity of communication (particularly about things that are hard to reason about mathematically), seeing patterns that could be grouped into bigger bug bundles to make fixing more efficient, (occasionally!) helping figure out a fix if the obvious fix isn’t available, and shared understanding with their team about what actually matters. There is always a thousand details that could be better, but for every thousand only a hundred might actually be worthwhile. Flooding the bug process with irrelevant minutiae that won’t realistically ever be fixed is not very helpful.

This is the only way I know of to capture the full spectrum of bugs that ruin software – from front-end to back-end, from visual/​interactive quality to works-or-not functionality, from what can be measured to what never will be. And this is not just about designers, of course. It’s not even about any non-engineering function. Design serves everyone; if your bug-filing UI or your process or your definitions are not well-designed or -balanced, I strongly believe you’re also hurting engineers on your team. And you’re _definitely_ hurting your users.