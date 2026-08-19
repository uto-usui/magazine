---
title: "Accessibility getting dropped in the process"
source: "https://buttondown.com/nic-steenhout/archive/accessibility-getting-dropped-in-the-process/"
publishedDate: "2026-08-17"
category: "design"
feedName: "Sidebar"
---

This newsletter is a bit different than previous ones. Rather than my usual collection of shorter articles and updates, it’s devoted to one longer piece. The question behind it kept growing the more I thought about it, and it deserved more space than my usual format allows.

Let's dive in.

## In this newsletter

1.  [When accessible designs become inaccessible products](#process)
2.  [Wrapping up](#wrap)

## When accessible designs become inaccessible products

### It started with a question

Every now and then, I find myself reviewing a design before development begins. Sometimes the conversation ends with a reassuring conclusion: yes, this can be implemented accessibly.

![Line and wash sketch. Two racers in a relay race, viewed in profile. We only see part of the racers, not their heads, not their feet. They are on a running track. Each racer has an arm outstretched towards each other. The baton they are passing is falling toward the ground. The baton has the numeronym a11y written on its side. There is a stadium in the background, and some green trees. The text Dropping accessibility in the process titles the sketch. Dated and signed 26-08-05 NS.](https://assets.buttondown.email/images/0c59d13a-2be4-42ce-bc20-562c1390ff5a.jpg?w=960&fit=max)

The relay isn't over until accessibility crosses the finish line.

It's worth paying attention to the wording. Not "this is accessible." Not "this will be accessible." "This can be implemented accessibly."

The teams feel it a satisfying answer at the time. The design doesn't prevent accessibility. The interaction pattern can work. Everyone leaves the meeting with the same understanding: the concept is sound, and the rest is a matter of building it well.

Then development happens.

Weeks or months later, I audit the finished feature, and the result is often surprising. Informative images have no alternative text. A modal doesn't keep keyboard focus. Dynamic updates aren't announced to screen readers. Parts of the interface can't be reached from the keyboard.

None of those problems were inevitable. They weren't built into the design. Somewhere between approving the concept and shipping the feature, accessibility slipped away.

It's easy to explain this away by saying developers don't care about accessibility. I don't think that's true. It's just as easy to say they need more training. Sometimes that's true, but it doesn't explain what happened here.

The developers on this project had worked on accessible products before. They weren't starting from zero.

So what happened?

The more I thought about it, the less interested I became in the individual bugs. Missing alt text, broken focus management, and missing announcements were symptoms. The real question was how a team could start with a design that could be implemented accessibly and still end up with a product that wasn't.

### An accessible design is only the beginning

Design reviews and accessibility audits answer different questions.

A design review asks whether an idea can be implemented accessibly. It's about possibility. A good review identifies patterns that can work well for disabled users and flags ideas that can't.

What it usually doesn't do is document every implementation detail needed to achieve that outcome. Many of those decisions belong in development. Exactly how keyboard focus is managed, which changes are announced to assistive technologies, or how a custom component exposes its semantics are implementation details. Someone still has to make those decisions, document them, and verify that they happened.

That's why a design review can honestly conclude that a feature can be implemented accessibly while saying nothing about whether it eventually will be.

### Knowing about accessibility isn't the same as building accessibly

It's tempting to assume that once developers have been exposed to accessibility, they'll apply that knowledge every time they build a feature. Software development doesn't work that way.

Developers juggle business logic, APIs, state management, performance, testing, bug fixes, and deadlines. Unless accessibility becomes part of everyday engineering practice, it competes for attention with everything else. That's true of almost every aspect of software quality. Knowledge alone rarely changes outcomes. Feedback loops and shared expectations do.

### Typing isn't the same as navigating

I've occasionally heard people argue that developers should naturally understand keyboard accessibility because they spend all day using a keyboard.

Writing code with a keyboard and navigating an interface without a mouse are different skills. You don't learn about tab order because you know your editor's shortcuts. You don't discover focus management because you use Vim or VS Code efficiently. You don't understand when a screen reader needs a live region simply because your hands never leave the keys.

Several developers on this project would describe themselves as power keyboard users. That didn't translate into building keyboard-friendly interfaces, and it was never going to on its own. Recognizing that doesn't excuse the outcome. It explains why "just use the keyboard" was never going to teach anyone what disabled users actually experience.

### Accessibility disappears during the handoffs

I don't believe anyone consciously decided to ignore accessibility on this project. It disappeared during the transitions between stages.

-   The design team owned the design.
-   Developers owned writing the code.
-   QA owned testing the feature.
-   Accessibility owned the audit.

Each stage had an owner. What didn't have an owner was carrying accessibility from one stage to the next.

The design established that the feature could be accessible. Development focused on building it. QA verified that it worked. Accessibility didn't see the feature again until the final audit.

The implementation details that mattered to disabled users weren't deliberately removed. They simply weren't carried forward. Or even just implemented. That's what made this a workflow problem rather than a people problem.

### The audit wasn't too strict. It came too late.

The timing of the audit turned out to matter as much as anything it found.

The team has no early warning system when the first accessibility checkpoint after design is a comprehensive audit near the end of development.

Imagine finding your first performance problems the week before release, or running your first security review after all the code is already written. Most teams wouldn't accept that because fixing problems gets more expensive the longer they survive.

Accessibility deserves the same treatment.

When the first meaningful review happens at the end of a project, the audit isn't creating work. It's revealing weeks or months of implementation decisions that nobody checked along the way.

### People pay attention to what gets reviewed

Developers focus on what generates feedback. Code review comments on architecture, naming, performance, and test coverage. QA verifies behaviour. Automated tests run on every build.

Those checkpoints teach a team what quality means, whether anyone intends that lesson or not.

If accessibility only shows up as a report after development is finished, it naturally becomes something people think about after development is finished. Not because they stopped caring, but because the workflow never asked them to think about it sooner.

### So what would I change?

I'm not interested in finding someone to blame for this. I'm interested in where the workflow could have caught these problems earlier.

#### During design

When a design is approved as "can be implemented accessibly," the accessibility requirements should be written down alongside the visual specification. Focus order, keyboard behaviour, announcements, semantics, and state changes shouldn't live in someone's memory or meeting notes. They should become part of the design itself.

From there, those details become acceptance criteria. Vague intentions get lost. Specific, testable criteria become part of the same definition of done as everything else the team already checks.

#### During development

Someone needs to own the transition from design to implementation. "This can be implemented accessibly" should never be the last accessibility sentence spoken about a feature. Someone should be responsible for confirming that the implementation still matches the intent.

Teams also shouldn't be solving the same accessibility problems over and over. A shared library of accessible components means developers spend less time reinventing focus management, disclosure widgets, and other complex patterns, and more time building features.

Automated accessibility checks belong in the build pipeline as well. They won't catch everything, but they'll consistently catch many common issues before anyone reaches the final audit.

#### During validation

Accessibility needs another checkpoint before launch.

It doesn't have to be a full audit. A focused review while a feature is still under active development can catch missing keyboard support, broken announcements, or implementation mistakes while they're still inexpensive to fix.

Accessibility should also be visible in the reviews that already happen. Code review, feature review, and QA don't need entirely new ceremonies. They need accessibility to become part of the conversations they're already having.

None of this depends on finding who missed it at the end. It depends on giving accessibility an owner at every handoff, not just the last one.

## Wrapping up

That's it for now! I hope you enjoyed the newsletter. I'd love to get feedback - What was good? What could be improved? What topic would you like me to talk about? I'm not making any promise, but if a topic you suggest catches my fancy, I'll share my opinion on it. Just hit reply to this email, or send an email at [\[email protected\]](https://buttondown.com/nic-steenhout/archive/accessibility-getting-dropped-in-the-process/info@nicolas-steenhout.com). I read every response. And a reminder that my content is Human Generated Content #HumanGeneratedContent