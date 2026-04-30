---
title: "The accessibility problem isn’t design. It’s engineering."
source: "https://gbbns.co/journal/accessibility-problem-isnt-design/"
publishedDate: "2026-04-29"
category: "design"
feedName: "Sidebar"
---

The European Accessibility Act came into force on 28 June 2025. Teams audited their components, ran Axe, added ARIA attributes, and ticked boxes. Compliance documents were written. Statements were published in footers. And then most of them moved on.

Nine months later, it’s worth asking what actually changed.

Accessibility isn’t a design problem with a checklist solution. It never was. The specs were written, the components annotated, the guidelines documented. And then engineering shipped something broken anyway. The design was right. The code wasn’t. It’s the same story on almost every team, in almost every organisation, repeated endlessly while the industry pretends the problem is about awareness.

It isn’t about awareness. It’s about who’s writing the front-end code, and whether they’re qualified to write it.

* * *

Somewhere in most organisations there is a designer who cares about accessibility. They annotate their components. They specify focus states, label associations, heading structures. They do the work.

And then engineering builds something else entirely.

Not out of malice. Out of a fundamental skills gap that the industry created, normalised, and is now actively accelerating.

The full-stack engineer has become the default hire. One person, one salary, covering the database, the API, the back-end logic, and the front-end interface. Efficient on paper. Straightforward to justify in a headcount meeting. And quietly catastrophic for the quality of what gets built.

Because front-end isn’t a layer. It’s a specialism. Semantic HTML, document structure, keyboard interaction, ARIA, the relationship between visual design and accessible implementation - these aren’t things you absorb by proximity or pick up in an afternoon. They require years of focused attention. They require someone whose job it is to care about them, not someone who gets to them after the back-end is done.

The full-stack engineer doesn’t have that depth. They can’t. They’re stretched across too many concerns, context-switching too frequently, and operating in a discipline they were never trained in. The front-end work gets done last, under time pressure, by someone who fundamentally doesn’t understand what makes it hard. The result is exactly what you’d expect: div soup where semantic elements should be, heading structures that skip levels or don’t exist, interactive elements with no keyboard support, ARIA attributes cargo-culted from a Stack Overflow answer by someone who had no idea what they were doing.

This isn’t an edge case. It’s the norm. And the industry built it deliberately in pursuit of cheaper, leaner teams.

The audit finds it eventually. But by then, real people have already been excluded.

* * *

## The Accelerant

Now add AI to that picture.

Copilot doesn’t know your design system. It doesn’t know your component architecture, your token structure, or the accessibility decisions baked into your foundations. It has no context for any of it. What it does have is a vast dataset of code - including a vast dataset of inaccessible code - and the ability to generate confident, plausible-looking output faster than anyone can meaningfully review it.

For an engineer who understands front-end, that’s a powerful tool. They can evaluate the output critically. They know when it’s wrong, why it’s wrong, and how to correct it. The tool amplifies existing expertise. It makes good engineers faster.

That is not what is happening on most teams.

For an engineer without front-end foundations, Copilot isn’t a productivity tool. It’s a mechanism for generating broken code at scale with complete confidence. The output looks clean. It passes a cursory review conducted by someone with exactly the same blind spots. Nobody in the chain - not the engineer, not the reviewer, not the lead who approved the PR - has the knowledge to see the problem. So it ships. And because it arrived quickly and looked professional, nobody questions it.

This is what makes the current moment so dangerous. It was always possible for an under-qualified engineer to write inaccessible front-end. But there were limits. It took time. The gaps were sometimes visible. Somebody occasionally noticed.

AI removes every one of those friction points. It produces more broken code, faster, at greater scale, with more conviction than any engineer could manage alone. The interface fails a screen reader user. The keyboard trap goes unnoticed. The heading structure is a disaster. And the team that shipped it is proud of how quickly they moved.

Automated accessibility tooling catches around 30 percent of issues, according to research by the UK Government Digital Service. The rest require human judgment: someone with the craft knowledge to find what the tools can’t see. When that person isn’t on the team, the other 70 percent stays broken indefinitely. Copilot won’t find it. Axe won’t find it. A real user will.

And a real user just did.

* * *

## The Wrong Fix

Here is the uncomfortable truth about the European Accessibility Act. Compliance with it is not the same as being accessible. Not even close.

WCAG 2.2 AA is a floor. A low one. It’s a set of technical criteria that can be audited, documented, and signed off by a legal team that has never used a screen reader. It says nothing about whether a real person, with a real disability, using real assistive technology, can actually complete a journey through your product with any degree of dignity or independence. You can pass every single checkpoint and still build something that excludes the people it’s supposed to serve.

That is precisely what the checklist mentality produces. Not accessible products. Defensible ones. A compliance statement in the footer. A report that satisfies procurement. A document that keeps legal quiet until the next audit cycle. The minimum viable defence, dressed up as progress.

Inclusion asks different questions entirely. Not “does this pass?” but “can someone who relies on a screen reader complete this journey without hitting a wall?” Not “is this labelled?” but “does this label make sense in context to someone who can’t see the visual relationship?” Not “did we run Axe?” but “did we test with a real person, and did we listen to what they told us?”

Those questions can’t be answered by a tool. They can’t be answered by a designer working in Figma. They can’t be answered by a compliance report. They can only be answered by someone with the front-end depth to understand how the implementation behaves in the real world, across real devices, with real assistive technology.

Compliance is what you get when you treat accessibility as a legal problem. Inclusion is what you get when you treat it as an engineering one. The industry has spent years optimising for the former and wondering why the latter remains out of reach.

* * *

## The Fix

So what does the fix look like?

It starts with the industry being honest about what it has done. It stripped out front-end specialists in favour of cheaper generalists, told itself that full-stack was the future, and is now surprised that the front-end is broken. That’s not bad luck. That’s a predictable consequence of a deliberate decision. Fixing it requires acknowledging that the decision was wrong.

It means treating front-end as a specialism again. Hiring people who have that depth. People who understand semantic HTML not because they looked it up last week, but because they’ve spent years understanding why it matters and what breaks without it. People who can look at a component and know - before the audit, before the user research, before the complaint lands - where it’s going to fail and why.

It means not outsourcing that judgment to a tool. AI can help. Automated testing can help. But neither can substitute for craft knowledge. The tools are only as useful as the person interpreting their output, and right now, on most teams, that person doesn’t exist.

The European Accessibility Act didn’t create this problem. It just made it legally uncomfortable to keep ignoring it. Teams that respond by ticking boxes will keep producing accessible-on-paper, broken-in-practice interfaces, and will keep being surprised when real users can’t use them. Teams that respond by treating accessibility as an engineering discipline - one that requires genuine front-end expertise, embedded in the process from the start, not audited in at the end - will build something worth using.

That’s the difference. It was always the difference. And no amount of AI-generated code, automated tooling, or compliance documentation will close that gap until the industry stops pretending that front-end is a layer anyone can handle.

It isn’t. It never was.