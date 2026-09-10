---
title: "Naming the middle"
source: "https://newsletter.baselinedesign.com/naming-the-middle/"
publishedDate: "2026-09-10"
category: "design"
feedName: "Sidebar"
---

On an intro call with a product team a few months ago, I watched their lead designer hunt for a background color in the variables panel. I asked what they were looking for, and without looking up, he said "I can never find what I need in there".

That comment told me the vocabulary didn’t match how they thought about their work. Every selection becomes a small search. And that’s the problem this post is about.

## The Three-Tier Stack

Joey has covered the groundwork in two posts. [How I Think About Starting With Variables](https://www.baselinedesign.com/posts/how-i-think-about-starting-with-variables?ref=newsletter.baselinedesign.com) uses a non-interactive vs interactive split as the way in for anyone new to variables. [How I Organize Variables in Figma](https://newsletter.baselinedesign.com/baseline-22-tips-for-organizing-variables-in-figma/) walks through the tier structure itself, along with aliasing and why you should hide primitives. As a quick refresher:

-   **Primitives** describe values — `Blue/500`, `Space/16`
-   **Semantics** describe roles — `Text/Primary`, `Surface/Interactive`
-   **Component-scoped** tokens describe ownership — `Button/Background/Hover`

Most systems we work with only need the first two. A third tier earns its place when a specific component needs something the semantic layer can’t cover, or when a brand or theme layer sits between the semantic and its underlying value.

Donnie D’Amato’s [article on truly semantic tokens](https://blog.damato.design/posts/truly-semantic/?ref=newsletter.baselinedesign.com) is one of my favorite pieces on what belongs in the middle tier.

## The Common Failure Shapes

There are two failure shapes that we see time and time again.

The first is too many semantics. A careful team ends up with 150 to 300 tokens in the collection. Every context gets its own: `Text/Interactive/OnDark/Hover`, `Text/Interactive/OnLight/Pressed`, and dozens of siblings. A designer opens the picker and the names all bleed together. So they reach past the semantic layer, grab a primitive, or pick something that looks close enough. This is where the drift begins. 

The second is too few. A team keeps the collection short, 20 or 30 tokens: `Text/Primary`, `Text/Secondary`, `Surface/Default`. It looks clean, but it falls over the first time a component needs to differ from the default. Component-scoped tokens fill the gap: `Button/Background/Secondary`, `Toast/Border/Error`. Six months later, there are 400 of them, carrying the meaning the semantic layer should have carried.

Nate Baldwin frames these two shapes as "too generic" and "too specific" in [his piece](https://www.designsystemscollective.com/when-semantic-tokens-are-no-longer-semantic-d65ef16fadd7?ref=newsletter.baselinedesign.com) on the same problem.

Both shapes come from the same miss. Names that hold up describe the decision a designer is making about the interface. Elements get renamed, colors get rebranded. The decision persists.

## Naming the Decision

When a team asks me to help think through the semantic layer, I often start from wireframes and rough designs, and ask one question about each element: what is a designer deciding here? _That’s_ what the token names.

A designer might call a section of a page a "card", but that identifies the element, not the decision. The decision underneath is closer to "this is an elevated surface for grouped content". That’s what a semantic token names — something like `Surface/Elevated`. Rename the card to a panel next quarter and the token still fits, because the decision hasn’t changed.

Sometimes what a designer is deciding only holds for one component. Something like "this is the padding on the small button" is what component-scoped tokens are for: `Button/Padding/Small`.

And sometimes the honest answer is that no new name is needed. If an existing semantic already fits, that’s the signal to stop. A couple of rules to follow from this:

-   **Semantic names should describe purpose:** `Color/Blue/Primary` names the color. Rebrand to green and the name is wrong. `Color/Action/Primary` names the purpose, and it holds whatever color sits underneath.
-   **Component-scoped tokens work as a release valve:** Reach for one when a component genuinely diverges from the semantic layer. Reaching for one because you can’t find the right semantic is a signal the semantic is either missing, or misnamed.

## Designing for the Machine

Naming the decision matters more now that the reader isn’t only human. The current wave of AI tools are pulling design system context into design and code workflows, which means an agent is reading the same names your team is.

A designer looking at a button in their canvas can infer what `Surface/Interactive` is for from the surrounding context: the layout, the state, the neighboring elements, the intent of the screen. An agent working from metadata alone has none of that — the visual ambiguity a designer resolves without thinking often stays unresolved for a model.

`Text/Primary` on its own doesn’t say much. A description like _'default body color on light surfaces; not for links, interactive text, or emphasis states'_ gives a designer context to make the right selection, and gives an agent enough to do the same without guessing.

That kind of description used to be treated as optional. But with another reader in the room, it’s become part of the vocabulary.

## The Litmus Test

Here’s a check I run when I’m helping shape a semantic layer. Show a designer new to the system an element in a wireframe, and ask which semantic they’d reach for. The pause is what I’m looking for.

The lead designer on that call knew the system inside out, but they were still stuck at the picker. What they needed were names they could reach for without stopping to think.

Thanks for reading, and see you next week! 👋💛  
— Murphy

💌

****In Case You Missed It****  
We opened an inbox! If there's something you or your team are working through, whether that's making the case for a design system internally, figuring out where AI fits in your workflow, or something else entirely, we'd love to hear it. [Send it our way](https://tally.so/r/Bzj8QA?ref=newsletter.baselinedesign.com) and we'll answer in the newsletter at whatever length the question warrants.