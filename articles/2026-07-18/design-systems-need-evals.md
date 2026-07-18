---
title: "Design systems need evals"
source: "https://blog.murphytrueman.com/design-systems-need-evals/"
publishedDate: "2026-07-17"
category: "design"
feedName: "Sidebar"
---

Design systems have spent years borrowing from how software gets built. Versioning, semantic naming, explicit contracts, deprecation cycles. The API framing I [wrote about last year](https://blog.murphytrueman.com/your-next-design-system-user/) was the same premise, treating a component library as an interface other systems consume rather than a folder of pictures. Most of that borrowing is now considered normal practice. The next thing to take comes from a different part of the stack.

When you let an agent generate against your system, you're running a model you don't control against rules you wrote, and hoping the output respects them. That's the same problem the people shipping LLM features have been dealing with for a couple of years. One of their answers is evals.

An eval is a test for output you can't predict. You hold a set of inputs constant, run them through the model, and check the results against assertions about what a good answer contains. [promptfoo](https://www.promptfoo.dev/?ref=blog.murphytrueman.com), acquired by OpenAI in March, made these cheap to write and run in CI on every change. Because the same input can produce a different output next time, you run each case several times for nondeterministic tasks and watch for the result that wavers.

## What this looks like for a design system

Look at the inputs you already have — [Code Connect](https://developers.figma.com/docs/code-connect/?ref=blog.murphytrueman.com) maps your Figma components to real code and, through the MCP server, carries per-component instructions on props, accessibility, and usage. [AGENTS.md](https://agents.md/?ref=blog.murphytrueman.com) holds the conventions and commands that apply across the repo. It hands off from there to the token and component files that carry the detail. Skills give the agent step-by-step procedures for tasks specific to your system.

Together they're the prompt. They tell the agent what your system is and how to use it, but neither of them tell you whether the agent listened.

You can write the cleanest AGENTS.md on the internet and still have no idea whether the component that shipped this morning came from your library, or got hand-rolled as a div with a hardcoded blue. There's a line in [Figma's own documentation](https://developers.figma.com/docs/code-connect/code-connect-ui-setup/?ref=blog.murphytrueman.com) that gives the game away — Code Connect has a preview that shows what the model would generate for a component. The docs warn that the preview runs in a different context to real usage, so the actual output may differ. The preview is a guess about a guess. The only way to know what the agent does under real conditions is to run it under real conditions and look.

The more rules you give an agent, the harder they get to follow. [Researchers benchmarked](https://arxiv.org/abs/2505.16944?ref=blog.murphytrueman.com) how well agents follow instructions in real agentic tasks. The best model followed fewer than a third of them in full, and adherence fell further as the instructions grew longer and packed in more constraints. The more carefully you specify your system, the more you need a way to confirm the specification survived contact with the model.

## What you actually test

A design system eval is a list of the jobs you'd expect an agent to handle, each written as a prompt and paired with checks on what comes back. Something like building an onboarding step, or adding a confirmation before someone deletes their account. For each one, you assert two kinds of thing.

The first kind is mechanical. It checks the props the agent used against the real component API, resolves every colour and spacing value to a token instead of a hardcoded guess, and confirms it reached for a library component rather than hand-rolling the markup. Accessibility belongs here too: a confirmation dialog with no accessible name, or a destructive button without a label, is something you catch by reading the structure rather than judging the intent.

Most eval tools ship `contains` and `regex` assertions, which only skim the surface. A real check validates the generated code against your actual system — the component APIs and the token set — so an invented prop or a raw hex value gets caught where a string search would miss it.

Checks like that run in milliseconds, and they catch the small inconsistencies that accumulate into [entropy](https://blog.murphytrueman.com/design-system-entropy/) before anyone notices. Tune it too strictly and the same check will flag code that's actually fine, so it needs tending like any other part of the system.

The second kind is judgement, which is much harder to check. You're asking whether the agent picked the right component for the intent — say, a confirmation dialog over a generic modal — and whether the flow handles the empty and error states rather than only the happy path. There's no regex for any of that. Eval tooling reaches for a model acting as a judge here, one LLM scoring another against a rubric. It tracks human judgement well on narrow checks and gets shakier once the calls become subjective, which earns it a place in the suite without making it the last word on taste.

The prompts matter as much as the assertions, and should read like the ones your team actually types, underspecified and intent-level rather than a component-by-component spec. Spell out which component to use and the eval only shows the agent can follow orders, not whether your system steers it there on its own. Meta's Astryx keeps the expected components hidden from the agent, so a pass reflects your system guiding the choice rather than the prompt naming it.

One case looks like this:

```
# illustrative. the built-in contains and regex assertions are the crude floor;
# the real check is the javascript one below.
tests:
  - vars:
      prompt: "Add a confirmation before someone deletes their account."
    assert:
      - type: javascript
        # a real check validates the generated code against your system,
        # every prop valid against the component's actual API, every colour and spacing
        # value resolved to a token, no hand-rolled markup where a component exists
        value: file://assertions/validate-against-system.js
      - type: llm-rubric
        value: "Reaches for the confirmation dialog over a generic modal"
      - type: llm-rubric
        value: "Avoids default focus on the destructive action and provides a clear cancel path"
```

The `javascript` check is the one that knows your system. You write it yourself, against your own components and tokens, rather than pulling it off the shelf. The rubrics cover the judgement calls: whether the agent chose the confirmation pattern, and whether it composed it safely.

This is the line I drew in [an earlier piece](https://blog.murphytrueman.com/your-design-system-might-be-ai-ready/) about a design system being AI-ready while the organisation around it isn't. Each part an agent produces can individually pass every automated check, and the whole still comes out mediocre, confusing, or inaccessible. A token-perfect button can sit inside a broken flow. No eval suite closes that gap, and selling it as though it does would be a lie. What the suite does is clear the mechanical failures off the table, so the person reviewing the work spends their attention on the judgement calls instead of hunting for hardcoded colours. It narrows what a human has to look at. It doesn't remove the human.

## Why it has to run more than once

You run a suite instead of a single check because the thing underneath you keeps moving. Your rules can sit untouched for a month while the model behind the agent gets updated and starts treating your tokens differently. Someone trims three lines out of AGENTS.md to keep it short, and silently breaks a behaviour nobody re-tests. None of these surface in a code review unless someone happens to be looking at exactly the right file on exactly the right day. A regression suite checks every time, on every change. That's the whole reason LLM teams run theirs in CI rather than by hand.

In practice it sits where your other gates sit. Someone opens a pull request renaming a prop on your dialog component. The suite runs against the new build, and six of the twelve prompts come back with the agent still emitting the old name, because Code Connect is pointing at a mapping nobody updated. The pull request doesn't merge until the mapping is fixed, or the prompts are. Whoever renamed the prop finds out on the branch, rather than three sprints later in someone else's feature.

Some of this is already being built, just not as a shared practice. Meta's [Astryx](https://astryx.atmeta.com/?ref=blog.murphytrueman.com), open-sourced in June, takes its vibe tests furthest, running the same prompt across different system configurations and measuring how faithfully each one gets rebuilt. Kaelig Deloumeau-Prigent wired an evaluate stage into an [eight-agent pipeline](https://www.kaelig.fr/design-system-components-with-ai-agent-teams/?ref=blog.murphytrueman.com) for the Intuit Design System, checking tokens and accessibility on every generated component. Both sit next to grounding, the other half of the answer, where a tool like [v0](https://v0.dev/?ref=blog.murphytrueman.com) refuses to emit a component or token it can't verify in the first place. The two solve different problems. Grounding prevents many failures at generation by feeding the agent verified knowledge. Evals catch the ones that still get through, and keep catching them as the models and rules move underneath. Most teams have neither.

So the ground isn't empty. What's missing is the expectation that a design system with agents pointed at it ships with a regression suite the same way it ships with a changelog. We spent the past year getting our systems ready for agents. The part that checks they were listening is still nobody's job in particular.

* * *

Thanks for reading! If you enjoyed this article, subscribing is the best way to keep up with new posts. And if it was useful, passing it on to someone who'd find it relevant is always appreciated.

You can find me on [LinkedIn](https://linkedin.com/in/murphytrueman?ref=blog.murphytrueman.com), [X](https://x.com/murphytrueman?ref=blog.murphytrueman.com), and [Bluesky](https://bsky.app/profile/murphytrueman.com?ref=blog.murphytrueman.com).