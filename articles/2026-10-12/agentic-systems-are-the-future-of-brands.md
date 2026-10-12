---
title: "Agentic systems are the future of brands"
source: "https://agentic.littleplains.com/"
publishedDate: "2026-10-08"
category: "design"
feedName: "Sidebar"
---

[![Little Plains](https://agentic.littleplains.com/assets/lp/lp-logo-480.png)](https://littleplains.com/) 

Designers, marketers, and agents working from one shared system.

**Every page, UI, and campaign your team ships is another decision about what your brand is. We’re making more of those decisions than ever, with more people, and more agents involved.**

Agentic Brand Systems are how we can turn each touchpoint into a stronger extension of a brand’s living source of truth.

Most brand owners reading this will think it can wait. It can't. The math is already starting to compound against you.

Picture a company a month after a successful raise. Two founders and a couple of engineers have become a team with new hires in product, marketing, and brand.

In their first week, the product designer opens the design system. It has not been updated in months, although the live product has changed twice since. The new marketer opens the Canva folder for an upcoming campaign. They find several logos, copy from different eras of the company, and a read-only voice document owned by someone who no longer works there. Across the room, the head of brand opens the agency's Figma guidelines. The founder has been making new pages with AI every week, so the file is already behind the site.

Everyone is trying to do good work. They are just working from different versions of the company.

The usual fix is another meeting, a new PDF, or one person who becomes the answer to every brand question. Then that person goes on vacation, a new tool arrives, or the company launches something the guidelines never anticipated.

Now an agent is in the room too. It does not know which file is current. It will make a reasonable choice and keep going.

I have sat on both sides of this table, at an agency and inside a company. I know exactly how each of those people feels, and I want to say:

**These scenarios can end. Today.**

Make the account settings screen

Without the kit

With Sonata’s kit

1.  `voice-and-tone.md`Italics fall on possessive adjectives.
2.  `voice-and-tone.md`The voice says we got your back.
3.  `color.md`Accents are support. They color a badge, a bullet, a chart series, a single state.
4.  `layout.md`Buttons, badges, fields and pills are fully round…

The same request, with and without the kit.

## Stop Guessing & Stop Drifting

A brand guideline might show a homepage with a green accent. But when a product designer reaches the settings screen, it doesn’t tell them whether green belongs on a primary button, an alert, or nowhere at all. They can ask the person who designed the homepage. More often, they have to make the call themselves.

Give the same assignment to an agent and it guesses at a much higher rate. The result may look completely competent. However, each unsupported choice moves the work a little closer to what a generic product would do. It’s not slop, it’s just…mid.

We saw a human version of that disconnect after handing off a digital system for a global open-source organization earlier this year. After project completion, their team sent us good questions almost every day. How should a hover state behave? Do these tokens map to Figma variables? The `readme` says one thing about width, but the live layout does another. Which one should we follow? Each question exposed a decision that had been made during the work but had not made it into the handoff.

Production used to be slow enough for someone to catch a lot of this drift. Today a founder can make a deck in an afternoon, growth can ship a landing page before lunch, and agents can generate variations of both. A company can make more small brand decisions in a month than it once made in a year. If the reasons behind the original decisions are missing, speed compounds the guessing.

Clayton Christensen and Michael Raynor [wrote about](https://www.library.hbs.edu/working-knowledge/six-keys-to-building-new-markets-by-unleashing-disruptive-innovation) how systems move between tightly integrated wholes and specialized parts. The parts give teams more freedom, but only when they can still work together.

Brand has lived through its own fragmentation.

The thinking is in a strategy deck, the logo is in Air, the interface is in Figma, the techniques are in Flora, the campaign is in Canva, and the live product is in code. A team needs the freedom of all those tools. It also needs a common place for the decisions that connect them.

Over the past year, we have been documenting our process of building brands and software for the agentic age: [A New Tomorrow, Today](https://littleplains.com/writings/a-new-tomorrow-today), [Building Brand Systems for Humans and Agents](https://littleplains.com/writings/building-brand-systems-for-humans-and-agents-today), [The HTML Brand,](https://littleplains.com/writings/the-html-brand-the-rise-of-input-based-outcomes) and [Building a Knowledge Product](https://littleplains.com/writings/building-a-knowledge-product).

Today we are sharing our latest chapter: the files, the process, and how to end the plague of drifting brands, through modern agentic systems of record.

## What is an Agentic Brand System?

Pick a prompt. The agent reads what it needs from Sonata’s kit and builds it.

At [Little Plains](http://www.littleplains.com/), we deliver kits as part of each engagement. They contains the brand's positioning and voice, the visual rules and assets, and the components people use to make new work. Importantly, the system explains why each rule exists, where they applies, and how to make a call when the guidelines don’t cover it.

The kit is a collection of _visual_ and _verbal_ guidance, assets, and working code that a person can browse, and an agent can read. The site and guidelines make the system easy to explore; the files give people and agents the values, instructions, and working code to use it. Both matter: one helps you understand the brand, the other helps you make with it.

The important distinction is a picture shows what someone decided for one page, whereas a usable system gives the next person enough context to make a good decision for a page nobody has drawn yet.

The brand kit we built for [Sonata](http://www.sonata.health/) makes this tangible. The verbal files hold the promise, the approved lines, and the vocabulary. Sonata says “healthspan” rather than “longevity,” and “your health story” rather than “dashboard.” A marketer asking an agent for a launch email should not have to paste those choices into every prompt. The kit tells the agent where to find them before it writes.

Open any file in Sonata’s kit.

On the visual side, `visual-system.json` holds the color, type, spacing, radius, and effects values. Those values generate `tokens.css`, and the guidance files explain when to use them. Beside the brand kit is a product kit with real React components, including their states and behavior. The team can build with them, and change them as they go.

“Source of truth” only means something if the pieces stay connected. The color in Figma should match the value in code, and the guidelines should say where to use it and why.

Say the team decides Sonata’s warm secondary color should take up less of a page. They update the color rule, record why it changed, and check the components and pages that use it. If the color value changes too, the CSS tokens can be regenerated from the visual system.

That doesn’t mean every page and deck updates itself. Some values can sync; someone still has to review how the new rule works in each place.

## One Kit, Many Outputs

Sonata's art direction uses one flower. It starts as the subject, softens, and eventually fills the frame as a field of color. A conventional guide could show those three states and a few approved layouts. The kit goes further. It explains that copy belongs on the softened or field state because the complete flower is already the subject of the page.

Now ask for a page that hasn't been designed. The agent reads that rule, chooses an image state, and places the headline accordingly. Anyone on the team can make the same call without asking the person who made the original layout.

The kit tells the agent what to read for the job. A campaign request calls for positioning, voice, and art direction; a product screen calls for tokens, components, and interface rules. It doesn’t need every file every time, but it does need to know where to start.

brand/readme.md

Where to start

Read `magic_trick.md` first. Then, depending on what you are making:

brand/readme.mdhow-to-prompt.mdmagic\_trick.md

brand/agent/verbal/concepts.mdpositioning.mdvoice-and-tone.md

brand/agent/visual/art-direction.mdbrandmark.mdcolor.mdeffects.mdfonts.cssgraphic-elements.mdlayout.mdmotion.jsonmotion.mdtokens.csstypography.mdvisual-system.json

What it makes

Prevention-first care_Your_ health story begins today.Your care team already knows your history, your goals, and what matters to you.

![](https://agentic.littleplains.com/assets/motion/sonata-hero-blurred.jpg)A Care Team That Already Knows You

![Sonata](https://agentic.littleplains.com/assets/sonata-lockup-black.svg)

Sonata’s readme tells the agent what to read for each job.

For QAing before we hand over a kit, we give the file to a fresh agent with no other project context and ask it to make something new. We look at what it gets right and where it makes something up. If it gets a decision wrong, we add what’s missing to the kit or make it clearer which file to read. Without fixing that output prevents the next person from having the same gap.

A landing page nobody designed, built only from the pieces the team has approved.

## Ship With Confidence

Don't one-shot a generative kit and expect production grade outputs!

Also, kits shouldn't be assembled during the last week of a project. Set them up at the beginning. Research, interviews, and competitive work should still happen. The strategy, verbal identity, visual direction, and components are still overseen by (talented) people. As the decisions land, put the value and the reasoning in the place the team will build from.

This process changes the work done during the engagement.

On a recent launch site, we used agentic tools to prototype a page in browser while the direction was still open, bringing the motion, copy, and product demo together in a working experience. An animation looked good by itself but competed with the headline beside it, so we changed it before the design was settled. It's very hard to going back to approving static work after this.

The kit also records what changed and why. Months later, someone should be able to find out why a component behaves a certain way, or why we changed an animation when it sat beside the headline, without reconstructing the decision from old files. Claude and Codex can read the same source and suggest different answers, but your team still decides which answer is right and whether it belongs in the system. You can also update reasoning as you go!

little-plains/**sonata-brand**Private

### Commits

main

The kit’s history.

At handoff, the client gets the source files, the usable components, a way to browse the system, documentation, and training in the tools their team uses.

Our test is simple: the client should be able to operate without us. This rarely happens right away, but this is the frontier and we're all building together. A bit of communication back and forth usually gets the recipient there.

When it is working, it's awesome.

A founder put one of our kits into Cursor and asked it to make a landing page. The result used the right type, motion, interaction states, and voice. The open-source organization now uses a content tool built from its system to configure headers, apply its image treatment, and make layouts within the brand’s rules. Its team has also used the system for an outdoor campaign.

A content tool built on the brand system. Editors pick a header layout and treat photos, and every option stays inside the brand’s rules.

Another client added recipes and automated checks to its kit, then used the kit to rebuild its Figma component library and compare the result with the library its designers had made.

At [Haven](https://www.havenpanels.com/), the kit has reached screens on the factory floor (see the video at the bottom of the article).

One request, and the new system lands on a working product.

Those outcomes matter more to us than a beautiful handoff presentation. The client is building with the brand after our team leaves the room.

Our value increasingly should be in the definition and guidance of a brand, at the input level, less at the output stage.

## What Comes Next

Maintenance, right now is be the hardest part of this work.

We're working with the talented team at [Flora](https://flora.ai/) to help solve this, with an exciting new release from them coming next month.

Today, after handoff, a new team, channel, or use case will raise questions the first kit does not always answer. Some need a clearer rule or a new component; others need someone to make a decision. That's ok! We're building with clients and compounding our knowledge week over week.

At Little Plains, we do not have one standard kit for every brand. The structure can become more reliable while the decisions inside it remain specific to the company.

We are working through who approves a change when the client, another studio, and an agent can all suggest one. For now, we support the systems after launch, add the missing guidance, and make sure the client owns what we have built together.

The next step is easy to describe and much harder to make dependable: change one approved decision and have the relevant website modules, ads, decks, and product screens follow it. When this works consistently, it's magical.

Color and type values are easier to connect across tools; voice and art direction need more judgment, and each destination has its own constraints. We are working toward that wider reach, with the team reviewing how each change takes shape in the work.

art-direction.md

\## Rules

\- One flower per surface. Two flowers compete and neither reads.

\- A flower placed as an object inside a layout is never cropped through its bloom. Crop the stem and the leaves. A flower used as a band ground is a different case, and the rule there is in the next section.

\- Do not recolor a flower to an accent. The color comes from the editing formula, and an accent-tinted flower reads as a different brand.

![](https://agentic.littleplains.com/assets/motion/sonata-hero-full.jpg)![](https://agentic.littleplains.com/assets/product/ground.jpg)

Welcome![](https://agentic.littleplains.com/assets/product/x.svg)

We’re so glad  
you’re here, Sarah.

![](https://agentic.littleplains.com/assets/product/symbol.svg)

You’ve chosen to invest in your health at the highest level. This is precision medicine backed by genomic science and expert care.

![](https://agentic.littleplains.com/assets/product/arrow-right.svg)

Product

![](https://agentic.littleplains.com/assets/motion/sonata-hero-full.jpg)

![](https://agentic.littleplains.com/assets/sonata-logotype-black.svg)Join Now

Healthcare Built  
For Your Biology

SONATA maps your biology and delivers real clinical care.

Website

![](https://agentic.littleplains.com/assets/motion/sonata-hero-full.jpg)![](https://agentic.littleplains.com/assets/motion/sonata-hero-blurred.jpg)![](https://agentic.littleplains.com/assets/sonata-logotype-black.svg)

A Care Team That Already Knows You

04

Deck

Add one rule, and the site, the deck, and the product screen all follow it.

The opportunity in front of brand teams and studios is guiding each new piece of work to make the system more useful for the next person. When you achieve this your brand will hit escape velocity.

A new page can test a rule, a campaign can reveal a missing one, and a product screen can give the team a component it can use again.

**If you are commissioning a brand, ask what your team will receive, how a new hire will use it, how an agent will find the right guidance, and how the system will change after launch.**

**If you are building a brand, start testing this out now!**

At your next handoff, ask for the decisions behind the work.

Sonata’s brand and product work, all made from one shared system.

A message from Haven’s factory floor, where the production screens are built with their kit.

## Let's Talk

We're always here to talk. Our goal is to help build the next generation of great brands, and the best branding practices for the agentic age.

Sincerely,  
Emmett Shine, Alex Leiphart, Leo Music, Jamal Tobias, & Little Plains

[hello@littleplains.co](mailto:hello@littleplains.co)