---
title: "How to supercharge your design system with slots"
source: "https://www.figma.com/blog/supercharge-your-design-system-with-slots/"
publishedDate: "2026-03-05"
category: "design"
feedName: "Figma Blog"
---

Design systems promise consistency at scale. But as they grow, the guardrails meant to protect the brand can begin to limit expression, so teams find workarounds to bring back individuality. Libraries swell. Variants multiply. Instances get detached. What starts as a system for cohesion becomes a system people circumvent.

Designer Advocate, Brett McMillin, shows you how to get hands-on with our slots [playground file](https://www.figma.com/community/file/1610367877471727305).

That’s where [slots](https://www.figma.com/community/file/1610367877471727305) come in. They make design systems more flexible and easier to scale. With slots, designers can customize components, like menu options, buttons, or icons without detaching, so content can flex without breaking structure. This mirrors how components are built in code. Developers dynamically inject content and compose within a stable structure rather than duplicating it. Bringing that model into design makes components behave more like they do in production—simplifying implementation, clarifying handoff, and making systems easier for automation and AI to interpret.

Here’s what this unlocks across teams:

-   **For design system managers:** fewer variants, less maintenance, and stronger alignment to production
-   **For designers:** more creative freedom inside the design system—not outside it
-   **For developers:** predictable structures that map directly to code

We introduced slots at [Schema 2025](https://www.figma.com/blog/schema-2025-design-systems-recap/) and it's now available in open beta.

Since we announced slots at Schema, we've been collaborating with early testers to understand how slots can improve their workflows. In this guide, we share five field-tested tips gleaned from building and evolving slots with our users—so you can be more expressive without compromising the integrity of your design system.

## [1\. Start with the most-used components for the biggest immediate payoff](#_1-start-with-the-most-used-components-for-the)

###### Field note:

Start with components people detach the most—that’s where slots will deliver immediate value.

Early users consistently saw the biggest wins by starting where teams were already working around the design system. For many teams, that meant focusing on foundational components like dialogs, menus, modals, cards, and panels. Across those teams, two patterns showed up again and again.

First, teams used slots to customize components with repeating elements. Menus and lists often contain hidden layers to account for every possible item count. You might ship a list with three visible rows but have seven more hidden just in case. And when someone needs an eleventh item? They detach. With slots, authors can include only what’s needed. Designers can add more items as content grows without bloating the base component or breaking the connection.

Second, slots helped manage components with many configurations. Modals and cards are classic variant magnets. Titles, descriptions, media, buttons—every possible combination turns into another property (prop) or variant. Slots let you keep the structure intact while swapping or inserting the content you need, dramatically reducing variant divergence.

Slots create the most impact in places where structure stays consistent but content changes frequently. Instead of rolling them out across your entire system, start by focusing on a few high-traffic components. You should prioritize components that:

-   Appear frequently across screens
-   Are duplicated across your system
-   Have accumulated excessive variants
-   Need to support different types of content

![UI design mockup showing a large dark panel titled “Panel Title” with a centered plus icon and pink selection outline. Arrows point from this main panel to multiple smaller dark-themed interface panels on the right, including Filter, Downloads, Up Next, Discover, Reviews, Dashboard, Play History, Notification, and Player screens, each displaying different layouts such as lists, charts, media artwork, and buttons.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACgklEQVR4nI2T20+SARjG+Ru8aq2tm7ZmbdmNdj64Vm3kIS0TwmWAclBA9ENI+lQ+IkcUnVyWa3bYWl131ET9FOSMAl4kkvqv/Jof3tvFs73buz3vs/d5HtX29jZ7Yf3PH1LxODFZJpVIkFherszxOInlGFF5gVwmw99yGdVeZFubm8QWFwlJPlxWCyG/hN87hGC1EvSNErjvZcBiZvLFC9aKRVTlcplcOoMciRCZnlawEImwks2ys9u5Ov39Gyathit1tVg6dBi1WlquXsVm0NOluUXD+XP43G5WczlUa4UCHybeMNhtwarRYW7T4Ooy8+ntFIV8nlKpxMzPHzgMelrqLyJYzHjsNqydnYwMuhDMJjqamwhJEoXVVVS5VJqHwhANR09Qf6CaC/sP03TsFGFRIptKU9ooKYr990SsHUaGBTcOg4GO5kbu2ex4eh10t9/m2VhQEaDKJlNIPQLqg8e5UnWEy1XVNB6qJeQeJpNMsV5aJyrHmAi/Z8T1nBF3gLutN1CfOakQi04PTqOdiScvKRYKuwodbpoO1XJtXw3qfTW0HjlN2CuRSaYVwng0wbtXnwmOvOaRL0x/t4nO1ut4nU5El5c+s4NXz8YrhMV8gY8vXzN0x4LQplcgGmx8mXxPYbXyw7mZ34j9Loy3NAwPCAz12bHr7yAKA1iMJm62tBEY9VVM2XFyJZ1laXYeeWZWQXRugXx2hfJGWXH619evmHTtqM/WYdPrsHdpMWjUCD0G9Np2Gi5fYtTjVpKxZw43t7aILso8fuDDY7cSHvMTDoqMSU7GnwYISiLegV6mJsYrOfzfpiTjyyzJC6QScZLxGImYTDq525TFeXKZtNKUf8MebozNaQ2/AAAAAElFTkSuQmCC)![UI design mockup showing a large dark panel titled “Panel Title” with a centered plus icon and pink selection outline. Arrows point from this main panel to multiple smaller dark-themed interface panels on the right, including Filter, Downloads, Up Next, Discover, Reviews, Dashboard, Play History, Notification, and Player screens, each displaying different layouts such as lists, charts, media artwork, and buttons.](https://cdn.sanity.io/images/599r6htc/regionalized/3b967a15c2bee32ae90ca07e805c6375437a617e-1184x624.png?rect=1,0,1183,624&w=804&h=424&q=75&fit=max&auto=format)

From filter lists to dashboards to music players—same structure, different content.

## [2\. Use pre-filled slots to clarify next steps](#_2-use-pre-filled-slots-to-clarify-next-steps)

###### Field note:

Default content adds context. Empty slots signal action. Use both intentionally.

When authoring a slot, decide whether it should include default content. This gives designers context and often requires no edits at all. For example, if an icon is always in the top right corner of a card, why make people insert it every time? In early testing, this was the most common setup—especially for components where content is predictable but occasionally changes.

On the other hand, an empty slot makes it explicit that designers need to add something. This mirrors many current system patterns, especially where teams have been simulating similar behavior with instance swap. It’s a clear signal that content is required.

There’s no single right answer. Some systems will default to filled slots. Others will prefer empty ones. Many will use both depending on the component. Choose the setup that matches how your team actually works.

Once that decision is clear, creating a slot is straightforward:

-   **Start with a parent component:** Slots can only live inside a main component, not directly on the canvas. Start by creating or opening the component you want to make more flexible.
-   **Insert a frame:** Put a frame in the parent component. Slots are built from frames that are morphed into a special layer. You can’t convert a rectangle on the canvas into a slot.
-   **Convert the frame into a slot:** Right-click and convert the frame into a slot, or use the shortcut (Shift + Command + S). That’s it. Now you’re ready to configure it.

![UI design in Figma showing two large card components side by side. The left card contains a gray checkerboard image placeholder and a pink highlighted content area labeled 128 × 64. The right card displays a product example with stacked Bartlett pears, the title “Bartlett pears,” price “$1.99/ea,” origin text, and an “Add to basket” button. Both cards are outlined with pink selection borders.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABF0lEQVR4nK2TzUrDQBRG+/5v4Et04QMIiuBCqSBGkNISm6SZTNN0kjuTn6bxSJMiLlpowMVh/i6HO8w3EyHgP5lcPPwOEf5wXP/ujRV2EdIqbKuxB92PplFs3YpU5uwqf6i5VmgPMbbKEGewZY6UORuT8BV8sJg/slYe+T7Cnun2glBhyx1FUSAiiBWUjvj07nl7nuL7M0y9Pnv9ySWhK3dIIYNQBKV8vJcps4cblosnTD2iQ9cqKsmpt446c5TGkiYhS++O+estcfRO0cSnRwquEzbG0MZCq4QmEyRLydQKo1dYSbBtcr3QdmvKUlNnm57KpbhK9yInGtfovmZEDkOkC7H7geO8pw0GulPNqGD34T4x4qf8AIvbRSKMylJOAAAAAElFTkSuQmCC)![UI design in Figma showing two large card components side by side. The left card contains a gray checkerboard image placeholder and a pink highlighted content area labeled 128 × 64. The right card displays a product example with stacked Bartlett pears, the title “Bartlett pears,” price “$1.99/ea,” origin text, and an “Add to basket” button. Both cards are outlined with pink selection borders.](https://cdn.sanity.io/images/599r6htc/regionalized/431ccf5c54a65563cfd8961fc60384c498179480-1920x1080.png?rect=0,1,1920,1079&w=804&h=452&q=75&fit=max&auto=format)

A slot that is empty (left) and a slot with default content (right). Both work!

## [3\. Make it clear what belongs in each slot](#_3-make-it-clear-what-belongs-in-each-slot)

###### Field note:

Preferred instances add guidance to open slots—use them by default.

The most successful users paired slots with clear signals about what belongs inside them. Without direction, a slot can feel ambiguous—slowing teams down and leading to inconsistent usage. That’s where preferred instances come in. Think of preferred instances as guardrails, not constraints. They guide usage while preserving the flexibility that makes slots powerful in the first place. If people have to ask what goes in a modal every time, the slot needs guidance.

When authoring a component, you can recommend specific component instances for a slot from the props panel, just like instance swap today. These appear by default when designers click the “+” button inside the slot, giving them a curated set of options to choose from. For most systems, preferred instances should be the default approach because they bring:

-   **Faster workflows:** Designers choose from a short, curated set instead of searching the entire library.
-   **Stronger consistency:** Approved components get used in predictable ways, building cohesion across design outputs.
-   **Easier handoff:** Developers see familiar components in predictable places, reducing questions like, “Is this custom?”

## [4\. Think beyond individual components](#_4-think-beyond-individual-components)

###### Field note:

If you’re duplicating layouts to handle variation, that layout probably needs slots.

Slots aren’t just for buttons and menus. Early testers got the most leverage when they scaled up slots for larger components, too—like page sections and layout components that define headers, sidebars, content regions, and footers. The overall layout stays intact, while each predefined region remains flexible and swappable. Maybe your product page has a hero region that holds a video, multiple static images, or a combination of both depending on the needs of a launch. Instead of creating separate layout components for every variation or detaching to make structural edits within a page region, you can define a single layout and let slots handle the differences in content. The result is reusable page frameworks that scale across product surfaces without multiplying components. Slots work at every level of your design system, from a single element to larger layout components. The principle stays the same: Keep the structure consistent and the content flexible.

## [5\. Align design and code with slots](#_5-align-design-and-code-with-slots)

###### Field note:

When design structure mirrors production structure, handoff gets faster—and ambiguity disappears.

Early testers consistently pointed to structural alignment as one of the biggest advantages of slots. The more closely a component mirrored production, the smoother everything downstream became. In code, container components—like dialogs, menus, and cards—are built to accept content within defined regions. Slots bring that same pattern into design, making it clearer what content belongs where and how components are meant to be used. Instead of approximating flexibility with variants and detaches, designers work with components the way engineers actually build them.

That shared structure reduces interpretation. Engineers can clearly see what content is intended for each region. Designers can build layouts that reflect how components function in production. The gap between mock and implementation narrows. It makes systems easier for automation and AI agents to reason about—because structure is explicit rather than implied.

Learn more about implementing [Code Connect](https://github.com/figma/code-connect) in your design system and stay tuned for upcoming MCP support.

Slots are also supported in [Code Connect](https://www.figma.com/blog/introducing-code-connect/)

, where they appear directly in code snippets. Engineers can immediately see how a slot-based component maps to production, making handoff more predictable and implementation faster. When structure stays consistent and content stays flexible, teams move with less friction—especially in container components where variation is expected.

To get the most out of this alignment, define slot regions intentionally and mirror how your components are structured in code. The closer those models match, the fewer translation layers your team has to manage.

[Learn more](https://help.figma.com/hc/en-us/articles/38231200344599) about how slots work—from the smallest elements to entire frameworks. The possibilities are wide open. Where will slots make the biggest impact in your system? The components everyone detaches? The buttons that need flexible icons? The full-page layouts your team starts from scratch every time? We can’t wait to hear where slots fit in your design system.