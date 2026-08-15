---
title: "You don't have a design system"
source: "https://mattrothenberg.com/notes/you-dont-have-a-design-system/"
publishedDate: "2026-08-14"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

Most product organizations accumulate the same quiet problem: teams ship visual experiences that ought to be consistent but aren’t. Teams pull from the same component library and the same set of tokens, yet the resulting screens still don’t match. What drifts is the _shape_ of the thing: how a page is organized, what a dangerous action feels like, when something belongs in a table instead of a list.

Settings pages are a curiously useful example. One team may stack cards down the page, another puts groups of elements in tabs. One saves changes automatically, another requires an explicit Save button. One has a sticky bar that appears when the surrounding form goes dirty, another does not. All of these are reasonable. The same component library and token set can still produce different answers to the same question: what should a settings page be here? The missing work is choosing an answer, making it canonical, and putting it where the next builder will find it.

There are probably plenty of reasons this happens, and I don’t pretend to know them all. But a design-systems lens makes one part easier to see: a true system has to **carry decisions forward**, not just ship components.

As it happens, agents make missing decisions visible quickly. Give several of them the same library, keep them from seeing each other’s work, and compare the decisions they make. I tried that with three simple settings prompts: one for a project-management product, one for a traffic product, and one for billing.

> **Projects.** Build out the Settings page. Users should be able to edit workspace details, manage notification preferences, and delete their workspace.
> 
> **Edge.** Build out the Settings page. Users should be able to configure alert channels and thresholds, control which regions traffic fails over to, and purge the cache.
> 
> **Billing.** Build out the Settings page. Users should be able to update the payment method and the invoice email, set a tax ID, and close the account.

Beyond the prompt, the setup was identical: the same component library ([shadcn/ui](https://ui.shadcn.com/) on [Base UI](https://base-ui.com/)), token layer, and app shell. That was the whole world each agent could see: no existing Settings page to copy and no other work to inspect. The library gave them parts, not shared decisions about how the product should behave.

Flip between runs with the tabs or arrow keys. Whatever moves is the drift.

All three share a visual language, but the layout tells a different story. Some settings live behind tabs; others sit in cards or a long form. It feels less like one product with three settings pages than three teams answering the same questions separately. Yet every agent used the same library according to its API, and a token linter would likely pass all three. The failure is not in the components; it is in the composition. Nobody gave them a canonical answer to what a settings page _should_ be.

That disagreement isn’t a failure of taste. It is what happens when several established patterns could plausibly fit the same screen. Flo Guo puts the work this way:

> interface design is pattern recognition: discernment of which form to apply and when, and sometimes (rarely) pattern creation. most interface problems have already been solved.

[@floguo](https://x.com/floguo/status/2079638673470246992)

Each agent chose a workable pattern. The problem is that they chose _different_ ones. A component library provides parts, not canonical decisions. Make a decision once and carry it forward. Otherwise, three competent builders produce three defensible answers.

Josh Puckett made the same observation at a bigger scale, counting six main features in X built on four different view architectures. The conclusion:

> Much of the talk about design systems over the last decade has focused on components and lower level things, but I think the more important design work is actually at this architectural level that so few seem to be concerned with.

[@joshpuckett](https://x.com/joshpuckett/status/2083612048865513677)

I think that’s right, though the failure may be narrower than “people don’t care about architecture.” People do make these decisions. Someone chose tabs; someone else chose commit-on-change, probably for good reasons. The missing step is making the choice canonical and putting it somewhere the next builder will find it. Otherwise the only record is a screen someone already shipped, and the next person makes the call again from scratch.

## The decisions nobody captured

[Atomic design](https://atomicdesign.bradfrost.com/table-of-contents/) gave us a useful hierarchy a decade ago: atoms compose into molecules, molecules into organisms, organisms into templates and pages. The useful claim, chemistry aside, is that a system needs the larger patterns too, not just the components inside them.

But look at where most of us spend our energy on the daily, and it’s easy to see why. A button is a tractable problem. It has states, variants, a token for every value, and a Storybook page where you can see all of it at once. You can finish a button, and finishing things is very satisfying. You can even tweet a picture of a fancy looking button and get ~1k likes from the design community.

Those larger patterns resist all of that. A settings page isn’t a component with props. It’s a set of judgment calls: what belongs together, and how hard it should be to change something. You can’t always list those out exhaustively, and it’s a hard problem to solve definitively. So they often remain as precedent, transmitted by pointing at an existing screen and saying “just like that one.”

## Make the decision reusable

A team building settings should not have to decide from scratch whether a setting is a row, a card, or a form. They should not have to decide how changes save or how destructive actions work. Those are product patterns, and the design system should own them. Without that guidance, each team makes a reasonable choice, and the product ends up with several different versions of settings.

The work is to turn repeated judgment into something a team can reuse. Atomic design offers a useful structure for it. At each step, the pieces below become a repeatable pattern by resolving one new question about how they work together.

**Atoms.** Buttons, switches, inputs, and selects. This is the part a component library already handles well: the states are finite, and you can see them all on one Storybook page.

Switch

Checkbox

Input

Select

RadioGroup

Button

**Molecules.** The small behaviors that recur. Turning off backups asks for confirmation. A workspace URL tells you as you type whether it will work.

Moleculesan atom plus a decision — turn the switch off, and try typing “acme”

ConfirmableSwitch

ValidatedInput

meridian.app/

Available

ConfirmableDelete

**Organisms.** The layout that makes settings feel like settings. Each setting has a name and explanation, with its control opposite. When space runs out, the row stacks.

SettingsGroup + SettingsRow

### Workspace

Workspace URL

Used for shared links and API references.

meridian.app/

Available

Automatic backups

Nightly snapshots of every project in this workspace.

Default project visibility

New projects inherit this unless changed.

**Template.** The page itself: a readable column, a heading, groups in a fixed order, and the destructive action last. This is what makes two settings pages in the same product feel like the same product.

Settings

Manage your workspace, notifications, and account preferences.

### Workspace

Workspace URL

Used for shared links and API references.

meridian.app/

Available

Default project visibility

New projects inherit this unless changed.

Automatic backups

Nightly snapshots of every project in this workspace.

### Notifications

Mentions

When someone @mentions you in a comment.

Daily digest

A morning summary of activity across your projects.

Weekly report

An emailed rollup of progress, sent Monday mornings.

### Danger zone

Destructive actions sit last, after everything reversible.

Delete this workspace

Permanently removes Acme Labs and all of its projects, data, and members.

Together, the controls, behaviors, row layout, and page frame answer the questions a team would otherwise answer again from scratch.

Naming those layers gives the system a shared vocabulary. `ValidatedInput` means a text field that checks itself; `ConfirmableSwitch` means a switch that asks before a consequential change; `SettingRow` means a label, description, and control arranged in a particular way. An agent can read that vocabulary as context, just as a person can, and use it without having to infer those decisions from scratch.

## What changes when you write it down

I did not write a skill or make any ticket more specific. The next three agents got the same three tickets, the same frontend brief, the same component library, and the same app shell – plus that vocabulary and its rules for a settings page.

```
/**
 * Rules for every Meridian settings page:
 *
 * - Use SettingsFrame. Do not set a different page width or header layout.
 * - Put related settings in SettingSections. Do not use tabs or a card per setting.
 * - Put identity or account details first. Put "Danger zone" last.
 * - Each SettingRow has a label, a short description, and one control. The
 *   control sits beside the text and stacks below it in a narrow container.
 * - Save each row when its value changes. Do not add Save or Cancel buttons.
 * - Use ValidatedInput for text that must be checked. Use ConfirmableSwitch
 *   only when turning a switch off costs the user something.
 * - Destructive actions open a dialog. Require the user to type the name of
 *   the thing they are deleting before enabling the final button.
 *
 * The ticket decides which settings exist. These rules decide how they appear.
 */
export function SettingsFrame({ children }: { children: React.ReactNode }) {
```

Flip between runs with the tabs or arrow keys. Whatever moves is the drift.

Same tickets, same library. This time, shared rules settled the questions of layout, behavior, and user interaction, so the three pages read (more than before) as one coherent product.

## Build it, then say it

Put each recurring decision in the pattern that can enforce it. `SettingsFrame` fixes the content column and header; `SettingRow` fixes the relationship between a label and its control; the template fixes the order of sections. A builder who uses those patterns inherits those decisions instead of making them again.

Code can make some choices unavoidable: a shared frame fixes the page shape, and a shared row fixes its layout. But code alone cannot explain why tabs are forbidden or why changes save immediately. State those rules beside the patterns, wherever people and agents will encounter them. To find what is still missing, give the same ordinary ticket to a few fresh builders and compare the decisions they had to make.

I predict that ‘agentic’ design-system work will make this loop routine: agents can build against the rules, verify the result, and evaluate which remaining ambiguities still produce divergent but plausible screens.

## Tissue into bone

Ryan Singer has a useful image for this:

> System design is largely about leveraging parts that already work. Deciding what to continue to lean on. That’s how tissue turns into bone.

[@rjs](https://x.com/rjs/status/2083553380178289023)

The decision to lay out each setting as a labeled row was tissue while it lived in someone’s judgment. Making it a shared pattern turned it into bone: the next builder inherits the decision instead of making it again.

That is the difference. A component library gives builders reusable parts; a design system makes recurring decisions about structure, behavior, and user interaction canonical. When those decisions live only in a shipped screen or somebody’s head, agents expose the gap quickly: they build from what you encoded and make reasonable but different inferences everywhere else.

I’d be curious to hear how other teams are capturing these decisions, and which ones still keep escaping the system.