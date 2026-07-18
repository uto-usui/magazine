---
title: "The cost of saying yes has changed"
source: "https://github.blog/engineering/the-cost-of-saying-yes-has-changed/"
publishedDate: "2026-07-17"
category: "engineering"
feedName: "GitHub Engineering"
author: "Dalia Abuadas"
---

The most expensive part of a small feature request used to be writing the code. Now it’s usually the meeting about whether or not to write the code.

That’s a real shift, and it quietly breaks a lot of engineering instincts. Engineers learn early that most “small asks” aren’t small: they need tests, a rollout plan, someone to think through the edge cases and own the behavior after it ships. A two-hour change can become a two-week distraction if it touches the wrong part of the system. So we push back. Is this really needed? Does it belong in this release? Does it change a contract we already agreed to? I’m not giving that instinct up.

But it rests on an assumption that’s quietly breaking, which is that writing the first version of the code is the expensive step. For a specific class of change, it no longer is. If you can tell those changes apart from the rest, you can replace “is this in scope?” with a question you can answer in thirty minutes instead of a two-day debate.

## The debate often costs more than the patch

Here’s a pattern I keep seeing. Someone asks for a small change such as surfacing a `last_active_at` timestamp that already exists in the backend on a settings page. The team spends forty minutes in a thread. One person says it sounds risky. Someone remembers a related migration from two years ago. Someone mentions the deadline. Eventually we land on “probably a day or two, could be more,” with low confidence, primarily because nobody has actually tried it.

That process made sense when trying was the expensive part. You had to stop what you were doing, load the context into your head, make the change by hand, write the tests, then discover the second- and third-order consequences. When the first attempt is cheap, defending the boundary can cost more than crossing it.

An agent can produce that first patch in the time the thread takes to warm up. It’s not free and definitely not automatically correct. But it is cheap enough that the smart move is often to stop guessing and look at a real diff.

## The first patch is a price check, not the product

The mistake is to treat the generated patch as the deliverable. It isn’t. It’s a probe. It turns an abstract scope argument into a concrete artifact you can interrogate:

-   Does it touch the files you expected, or does it sprawl across five packages?
-   Are the tests obvious, or does the change resist being tested?
-   Does it preserve the existing abstractions?
-   Does it quietly require a new product decision?
-   Would you be comfortable owning this behavior six months from now?

Those are better questions than “does this feel like scope creep?” because now you’re arguing from evidence instead of vibes. If the `last_active_at` field comes back as a four-line diff with a passing test, ship it. The debate was the expensive part. However, if that same request comes back touching the auth middleware, you’ve learned the request was never small. Not only that, you learned this in thirty minutes instead of two days.

This is not letting the AI decide. It’s using the AI to make human judgment cheaper and better-informed.

## Cheap to write is not the same as cheap to own

Here’s the trap, and it’s the most important distinction of the AI era. A **change is not cheap just because the code was cheap to generate. It’s cheap only if a human can confidently review and own the result.**

A thousand-line diff that technically passes but nobody wants to own is not a cheap change. It’s a deferred cost. So the dividing line in that case isn’t “can an agent write this?” It’s “can a person validate it?”

-   Adding a display field that already exists in the backend is usually cheap.
-   Changing authorization behavior is not cheap, no matter how clean the diff.
-   Refactoring a well-tested helper is usually cheap.
-   Changing data-retention semantics is not cheap.

Plenty of changes still deserve a hard no even when the code is trivial. This includes anything that moves the product contract, creates a support burden, or touches privacy, billing, or compliance. AI lowers the cost of _producing_ a candidate. It does nothing to lower the cost of _owning_ one.

## Move scope discipline closer to the evidence

Traditionally, scope discipline happened before implementation, because implementation was the expensive thing to protect. Now some of that discipline can move to review. That doesn’t mean skipping planning. It means being precise about which planning actually pays off.

Before relitigating a small change, ask for a constrained attempt. The constraints are the whole point.

Produce the smallest possible patch. Keep it behind the existing feature flag. Don’t change the public contract. Add or update tests. List every file you touched and call out anything risky.

If the agent can’t produce a clean patch under those constraints, the request was bigger than you thought, and you know it carries a real ownership cost before anyone commits to it. If it can, that tells you something too. Either way you’ve replaced “is this in scope?” with “here’s what it costs. Do we want to pay it?”

## The new skill is pricing uncertainty

The best engineers in an AI-assisted world won’t be the ones who say yes to everything, and they won’t be the ones who reflexively say no. They’ll be the ones who can price uncertainty fast. They’ll know when a request is a product decision wearing an implementation costume, when review will be harder than writing, and when a change is small enough that the fastest responsible answer is to just try it.

That last one is genuinely new. “Try it and see” used to mean pulling a developer off other work. Now, for the right kind of task, it means handing an agent a bounded assignment and using the result to make a better call. Less time guessing, more time supervising. Less time treating implementation as a black box, more time evaluating concrete artifacts.

Scope creep is still real. But “no, because any new code is too expensive” is a much weaker argument than it was two years ago. The cost of producing code has dropped. The cost of understanding, reviewing, and owning it didn’t. So the question worth asking shifted from “is this more work?” to “where’s the real cost?” And sometimes, for a small, bounded change, the real cost is just finding out.

The cost of saying yes has changed. The cost of saying no should change with it.

## Written by

 ![Dalia Abuadas](https://avatars.githubusercontent.com/u/5923128?v=4&s=200)

Dalia is a software engineer on GitHub's Copilot Agent Control Plane team, building the subagent governance layer for Copilot customers.

## Related posts

## Explore more from GitHub

![Docs](https://github.blog/wp-content/uploads/2024/07/Icon-Circle.svg)

### Docs

Everything you need to master GitHub, all in one place.

[Go to Docs](https://docs.github.com/)

![GitHub](https://github.blog/wp-content/uploads/2024/07/recirculation-github-icon.svg)

### GitHub

Build what’s next on GitHub, the place for anyone from anywhere to build anything.

[Start building](https://github.com/)

![Customer stories](https://github.blog/wp-content/uploads/2024/07/Icon_da43dc.svg)

### Customer stories

Meet the companies and engineering teams that build with GitHub.

[Learn more](https://github.com/customer-stories)

![GitHub Universe 2026](https://github.blog/wp-content/uploads/2025/06/Universe26-Icon.svg)

### GitHub Universe 2026

Join us October 28-29 in San Francisco or online for GitHub Universe, our flagship developer event uniting people, agents, and the world’s code.

[Register now](https://githubuniverse.com/?utm_source=Blog&utm_medium=GitHub&utm_campaign=module_uni_26)