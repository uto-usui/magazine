---
title: "On teaching AI how you work"
source: "https://karlkoch.me/writing/on-teaching-ai-how-you-work/"
publishedDate: "2026-08-26"
category: "design"
feedName: "Sidebar"
---

I’ve been writing down how interfaces should feel, how HTML should carry behaviour and how AI drafts should be judged. Essays are good at teaching people but awkward to paste into every new chat; skills package the same judgement so an agent can discover it, load the relevant slice and apply it without me re-explaining five years of notes.

## The collection

I published the set at [`kemiljk/skills`](https://github.com/kemiljk/skills): eleven skills, one repository, MIT licensed.

Two of them already existed as standalone repos:

-   [`fluid-design`](https://github.com/kemiljk/fluid-design)
-   [`modern-css-html`](https://github.com/kemiljk/modern-css-html)

Those remain the public names. The consolidated versions are tighter, with clearer triggers, smaller activated files, examples moved into references and an explicit precedence rule between motion taste and platform-native CSS.

Eight more encode lessons from the writing that kept reappearing whenever I reviewed AI output:

Skill

Job

`semantic-html-first`

Prefer native elements and platform contracts

`interface-affordances`

Make possible actions perceptible across input modes

`write-first-design`

Decide in prose before pixels or code

`design-engineering`

Handshake between design intent and production code

`product-delight`

Anticipation and reliability over decorative novelty

`subtractive-design`

Remove anything without a demonstrable purpose

`ai-output-judgement`

Treat generated work as a draft with a last-mile review

`prototype-to-production`

Harden happy paths for real edge cases

The eleventh is `dxe`, which doesn’t encode taste of its own; it runs the other ten.

Browse and compose them here:

## Install the lot

Ten narrow lenses were fine while I was picking one at a time, but I kept reaching for the same install command in every new repo and then forgetting which machine had which subset. So the recommended path is now global and complete:

```
npx skills add kemiljk/skills -g --all
```

Check what landed, and update later:

```
npx skills ls -g
npx skills update -g
```

Selective installs still work, and are still right when you’re committing skills into a shared repo rather than onto your own machine:

```
npx skills add kemiljk/skills --list

npx skills add kemiljk/skills -g \
  --skill fluid-design \
  --skill modern-css-html \
  --skill ai-output-judgement
```

Drop the `-g` to commit them into a project so a team picks up the same constraints. You can also target particular agents with `-a cursor -a claude-code`.

## One command for the whole pass

The thing I got wrong the first time was assuming I’d compose skills by hand, but in practice I never did. I’d invoke one, get a narrow answer, and forget that the subtractive pass or the production hardening existed until something shipped badly.

`dxe` is the fix, and it’s named after [d×e](https://designengineer.xyz/) because it’s the same argument in executable form. One short name, one full-suite pass over a repo or a scoped path. It reads every sibling `SKILL.md` and stops if any are missing, which is why the global `--all` install is the prerequisite rather than a suggestion.

Prompt

Behaviour

`dxe`

Full workspace review; propose fixes

`dxe src/components`

Scope to that path

`dxe review`

Findings only; no edits

`dxe fix`

Findings, then high-confidence fixes

You get back one report rather than ten opinions: a hypothesis for what the pass is improving, findings by severity with each one tied to the skill that caught it, the subtractive cuts stated explicitly, and the remaining work ordered.

Use a single skill when you want a narrow lens. Use `dxe` when you want the argument applied end to end.

## Composition

Skills overlap on purpose, but without precedence they become noise. `dxe` runs this order, and it’s the same order to follow by hand:

1.  **Intent**: `write-first-design` and `subtractive-design` decide whether the work should exist.
2.  **Platform**: `semantic-html-first` and `modern-css-html` choose native materials.
3.  **Feel**: `fluid-design`, `interface-affordances` and `product-delight` shape interaction quality.
4.  **Bridge**: `design-engineering` maps design structure onto code structure, so taste stays attached to tokens and rendering rather than to a handoff document.
5.  **Shipping**: `ai-output-judgement` and `prototype-to-production` catch the median draft before it escapes.

When motion taste and CSS purity disagree, fluid design owns the desired behaviour and modern CSS owns the most native implementation that can still deliver it. JavaScript earns its place for interruption, velocity and gesture continuity that CSS can’t express.

## Migration from the standalone repos

If you already installed `kemiljk/fluid-design` or `kemiljk/modern-css-html`, point new installs at the collection:

```
npx skills add kemiljk/skills -g --skill fluid-design
npx skills add kemiljk/skills -g --skill modern-css-html
```

The skill names stay the same, while the internals are improved: less repetition, clearer review checklists and references instead of one oversized file.

## Essays and skills

Essays still carry the stories, demos and reasons; skills carry the executable part: triggers, defaults, rejections and exit checks. If the collection works, I spend less time retyping “use tokens”, “prefer native buttons” and “springs not linear 300ms”, and collaborators get the same constraints without sitting through the archive. `dxe` is the version of that I actually use day to day; the individual skills are what it’s made of.

## When to steal this

Build a personal skills collection when you notice yourself repeating the same review comments across AI drafts, pasting essay excerpts into prompts, maintaining multiple overlapping instruction files or teaching the same taste to different tools.

Start from writing you already trust. Compress it into triggers, rules and checks. Keep examples in references. Publish the set so other people can install the judgement without inheriting the whole archive.