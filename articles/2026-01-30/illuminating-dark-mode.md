---
title: "Illuminating dark mode"
source: "https://www.figma.com/blog/illuminating-dark-mode/"
publishedDate: "2022-07-21"
category: "design"
feedName: "Figma Blog"
---

###### Dark Mode vs. Light Mode: Which Is Better?

In people with normal vision (or corrected-to-normal vision), visual performance tends to be better with light mode, whereas some people with cataract and related disorders may perform better with dark mode. On the flip side, long-term reading in light mode may be associated with myopia ([Nielsen Norman Group, 2020](https://www.nngroup.com/articles/dark-mode/)).

Over the last couple of years, [one feature emerged](https://forum.figma.com/t/launched-figma-dark-mode-theme/229) as our top user request: dark mode. Designers were tired of being assailed with a bright screen when working on Figma files late into the night, and [studies have shown](https://www.nngroup.com/articles/dark-mode/) that people with visual impairments find dark mode more legible than light mode. (Visual contrasts are a core tenet of the [W3C Accessibility Guidelines \[WCAG\] 3.0 standards](https://www.w3.org/TR/wcag-3.0/), and we wanted to make sure our dark mode efforts satisfied those requirements.) That meant that delivering dark mode for us was more than just answering a user request—it mapped back to Figma’s core mission of [making design accessible to all](https://www.figma.com/blog/a-step-forward-in-our-accessibility-efforts/)

.

So, after months of toiling over the right approach, we [shipped dark mode](https://www.youtube.com/watch?v=JUTFghsG8nI&t=1638s) in May. Product Manager Jacob Miller and Product Designer Ryhan Hassan detailed [the product and design challenges of implementing dark mode](https://www.youtube.com/watch?v=1DTnojio89Y) at Config 2022, our annual conference. Not only did dark mode surface thorny UI questions—which Jacob and Ryhan talked all about—it required a significant engineering lift. As they said in their talk, “One of the hardest things about dark mode is that people think it’s easy.”

## [The complexities of color](#the-complexities-of-color)

On the surface, implementing dark mode seemed like a straightforward front-end change: Simply swap every light color for a dark one. But we quickly discovered that the project was much more complex than that. We wanted to build a solution that wouldn’t just solve the existing need for a new feature, but would be flexible enough to scale with us as the product evolved. Doing so would make it easier to onboard new engineers, tackle unforeseen challenges, and introduce new themes down the road. The trick was developing an approach that would be easy to implement and maintain, while also ensuring that it was regression proof. In other words, we didn’t want to break things across the app while trying to experiment with different solutions.

These considerations informed two main goals for the workstream: Enable Figmates to design and develop new features in dark mode out of the box, _and_ make it easy to introduce new themes to Figma and FigJam. And, we wanted to do both while building for the future state of Figma.

#### [Understanding the challenges](#understanding-the-challenges)

As the engineering lead for dark mode, I wrestled with which challenges to tackle first: those specific to the UI, and those pertaining to the scope of the entire project. Before we even thought about writing a line of code, each team member audited the surfaces in the Figma app to see how difficult it would be to recreate those pieces in dark mode.

Some UI decisions were straightforward. For example, we immediately knew we wanted the light panels in the editor to become dark in dark mode, with light icons and text as foreground elements. We also decided that we needed toolbars and menus that were already dark in light mode to stay dark.

There were also many product considerations, from which parts of Figma should support dark mode, to how dark mode would impact the core UI. Jacob puzzled over whether we should constrain our project to solely focus on the Figma editor, where designers spend the majority of their days; we thought about whether it made sense to shift user-generated canvas content, such as the canvas background, when users switched themes; we wondered whether colors rendered by our C++ engine that powers the editor, such as the canvas transparency grid, would need to shift.

#### [Scoping a systematic approach](#scoping-a-systematic-approach)

After doing this upfront work, we were overwhelmed by the sheer scope of the Figma app. At project kickoff, there were ten product engineering teams at Figma. Each team owned significant parts of Figma’s UI, including aspects like modals, panels, and toolbars. Every piece of UI potentially contained states that were only visible in complex edge cases, various views, and hidden submodals and dropdowns. For each surface in scope, we needed to be sure that its various states were included as well. We also had to cleanly and systematically refactor the many shared components in our UI library to support dark mode when they were used on a dark mode-supported surface, but remain unchanged in other surfaces.

Given the many variables, it became obvious that our engineering team—consisting of Software Engineer [Qi Linzhi](https://twitter.com/linzhiq), Engineering Manager [Rachel Miller](https://www.linkedin.com/in/rachel-miller-44630233/), and me—couldn’t approach dark mode as a one-time effort by our team alone. Not only would it be a cross-functional initiative, but whatever technical solution we aligned on would need to be easy for other engineers to understand and implement.

#### [Defining the schema](#defining-the-schema)

As we dove into the project, the biggest challenge was creating a set of variables to re-theme the Figma app in dark mode. Since every light color doesn’t exactly map to a dark one, and vice versa, we had to differentiate in code between surfaces that shift between light and dark depending on theme (e.g. side panels in the editor), versus those that always remained dark (e.g. toolbars and menus).

We proposed injecting a set of CSS custom variables into our web app that would dynamically change values as the user toggled themes. These variables would need to reflect the semantic role of the UI element they applied to, as opposed to the literal color they appeared in. For example, instead of using a variable called `figmaWhite`, we needed one called `background-color`, since the color assignment doesn’t stay white. Using semantic tokens was an especially clear choice given that it's a standard industry practice for theming—[iOS and macOS expose their own set of tokens](https://developer.apple.com/design/human-interface-guidelines/foundations/color#system-colors) for app developers.

Our challenge with semantic tokens lay in defining a naming schema that made sense for Figma. The naming had to satisfy some requirements:

-   **Define a minimal but sufficient set of token variables.** This set of variables needed to describe the various color use cases in our app. For example, because **menus** and **toolbars** are always dark in Figma regardless of theme, but **panels** change colors depending on mode, the colors used by each of these surfaces had to use different semantic tokens. If there were too many, the process of choosing a token would get overwhelming and inconsistent. Too few, and engineers and designers would likely require us to add more tokens over time to satisfy their use cases.
-   **Follow a predictable naming structure.** A clear naming schema would help engineers and designers choose a token to apply when building a design in Figma or in code.
-   **Use distinct tokens for background and foreground elements**. This helps us update all icon or text colors at once, for instance, if we wanted to improve the color contrast of our app.
-   **Allow complex inheritance structures for tokens.** For example, if we wanted more specific versions of a token to point to the same value as the `default` version of that token, we could specify that.

###### [With these considerations in mind, we developed the following semantic token schema:](#with-these-considerations-in-mind-we-developed)

Plain text

Type | UI Element | Color role | Prominence | Interaction

###### [where:](#where)

Plain text

Type { bg, text, icon, border }
UI Element { default, menu, toolbar, tooltip }
Color role {default, brand, selected, design, figjam, component, assistive, danger, warning, success, disabled, info }
Prominence { default, secondary, tertiary, strong }
Interaction { default, hover, pressed }

![A table detailing the five sets of semantic tokens and their descriptions](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAABrUlEQVQ4ja2UaXKDMAyFOUNbwICN8YYxTZf7X+51nlJnmE6XpO0PRTZSPj8kmcaMI/w8wxkDqzXcPCMsi3juvbViizFijMn+Q+48TdDDgCYuFq97wZ6SBJL3KOuKFLwk5xixpSTrul9DEOgl13s5nOIaqjvljBzCu6IZZY3IMSA6AoLsuT4fSLCVXPqyJkTnRN2kFJr6ypQ8dB0WPWFfPZLjsxHJWzyVKKDFaORgkf0MPShYPaEkj2ANxr7D2PdoSGZt6PuHB4Fs0WExPKBFdBavpyIqeXAODmtYMKleoMlZ2GmEatszkDKpkhsC6amWnkms1fPjLrXia1IV8xmrENW2l/82xwfd/b3445rAp32XxlRQjR+tr0DW7bOE9u7uAjztRYAsy8e87lYgO0tgyasorLFfAxdjsOcsCllbPvsKOKkrgYRxmAlkDb8Gqu+BtctUyNtQm/KnGvp3ID1z/9wUby0etyzN+SyvuxUYODbbJl61/wCM1uJlywjzDPUfCp3WKMHD6fPI3ARsD+NQ14xr1WM4dPfbwT7e5WvteOerXb42/PnJOLC0a/LeAA8KBSxJOF73AAAAAElFTkSuQmCC)![A table detailing the five sets of semantic tokens and their descriptions](https://cdn.sanity.io/images/599r6htc/regionalized/17e58e1cf96e68b32831263c84b01fa6e32468e8-1608x1608.png?w=804&h=804&q=75&fit=max&auto=format)

An internal doc showing the semantic token schema and their descriptions

###### [Token names were then composed by concatenating each level (omitting “default” levels), like so:](#token-names-were-then-composed-by-concatenating)

Plain text

color-bg-menu-secondary-hovered

Differentiating by type meant that we could now apply different color assignments to foreground objects (like text and icons) versus backgrounds.

UI Element allowed us to distinguish between pieces of UI that were always dark, such as **menus** and **toolbars**, versus those that toggled between light and dark, such as **default** panels. Accordingly, menu colors did not invert in dark mode. However, since we subtly shift accent colors between light and dark mode, we needed to alter accent colors in dark mode for menus, so we still wanted to apply semantic tokens in menus.

Once we defined the schema, Ryhan began to iterate on color definitions for each semantic token for dark mode and a new, improved-contrast version of light mode. In parallel, we knew we needed a way to seamlessly populate the tokens into our codebase with each iteration of the color tokens. Each of our apps is built and released independently, so it was necessary to have multiple target outputs: CSS tokens for the web app, and Swift and XML files for our mobile apps. (While mobile apps weren’t explicitly in scope for this project, we needed to make our token definitions available in mobile-specific views so that their colors were consistent with the web app.)

![A series of color options, from dark blue to light purple](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAABYlAAAWJQFJUiTwAAABNklEQVQYlW2P21KCYAAGfYJQERCEHwQE8wAiCmqeatQyy6kZp3z/F9nGyvSii73cne8rJElCL+7RanUIGiGe5+O6Lo7jYBg6N5KEVJRRNYEpOkTRiLjbw6jW0ComQmsSBUPSOEWRZQpBENBoBHiuT91xsW0HIcQ3uq4jSUVKsopuhTjhlDTfMOjnWIZNTfNp1HKG7RXjwQRNUSic5T8sgWVZl2CxRFnRMd2YoL8jX76TDSbYpocw2rSdNdPeG3fZgqqiUjjJ1whx5idYLJWpaDXqtynJ4sBi+8kon+JYPq6IGbT2rMZH5qMlVVX9b+E5fAmqVYOwmzLfHnjcf5DnE+q2R+BFzLI9zw9HZuP57+WTfMVl6TlYQlE1wlaXxXrH6umFJOljmTa+22Sar9ncv5KlGXK5zBfhe6x1/0P5+QAAAABJRU5ErkJggg==)![A series of color options, from dark blue to light purple](https://cdn.sanity.io/images/599r6htc/regionalized/0d7fe7aba892e38b8f1da70addbd799abe171e3c-3920x1290.png?w=1632&h=537&q=75&fit=max&auto=format)

Ryhan iterated on color definitions for each semantic token

We built a pipeline that allowed us to export the semantic tokens for each theme in the [Design Tokens Format Module](https://design-tokens.github.io/community-group/format/) (DTFM) spec. Many companies are aligning on this spec for an intermediary token format, which will allow our tokens to work seamlessly with other products in the future. From the DTFM-formatted JSON files, we then produced target outputs for each of our codebases.

### [Migrating to semantic tokens](#migrating-to-semantic-tokens)

Prior to dark mode, our codebase included a rudimentary set of color variables that were defined as PostCSS simple variables. PostCSS simple variables are directly substituted with their assigned hex codes at build time. A variable like `$figmaBlue` showed up as `#0d99ff` in the output CSS stylesheet seen by the browser. Accordingly, PostCSS variables did not suit our purpose of dynamically assigning colors based on the theme at runtime. In order to make dark mode happen with semantic tokens, we’d need to replace every instance of a PostCSS color variable in the app with CSS custom variables. Our initial audit showed there were about _5100_ instances, which was daunting.

And, this would mostly be manual refactoring, as opposed to applying find-and-replacements. This is because replacing a PostCSS variable with our CSS custom property variables was not one-to-one: We were going from a small set of variables representing color literals (e.g. `figmaBlack`, `figmaWhite`), to a larger, more specific set of variables representing semantic usage (e.g. `background-brand`, `text-secondary`). Each color had to be inspected to ensure that the correct semantic variable was used to replace it.

While there were hackier approaches that might have worked, the upfront investment was worth it. This foundation opened up the doors to future themes, which could be defined and applied by simply reassigning colors to each token, rather than refactoring code.

With that, we had an approach. The next step was execution.

## [Dark Mode Week](#dark-mode-week)

We decided to divide and conquer, asking engineers from each product engineering team to contribute to the initiative. Once we had a systematic way of defining colors for Figma’s web surfaces and understood the end state we needed the app to be in, we wanted to see how much progress we could make towards our goal in a week. _Dark Mode Week_ was born.

This approach allowed us to spread the refactoring cost, making it more efficient. What might have taken a small group of engineers months to complete ended up taking forty engineers a single week. In fact, by the end of Dark Mode Week, we estimated our progress at 80% of surfaces that were in scope for the project!

### [A strong foundation](#a-strong-foundation)

Semantic tokens also laid the groundwork for the future of building colors at Figma—the library was synced in code and to our internal design system. We wanted to make sure every product team had engineers who were familiar with the new library, to help onboard their teammates and help enforce best practices when applying the tokens.

It was also important that every corner of Figma—even obscure ones—were captured in the dark mode migration. By asking product engineers familiar with each feature to refactor their surface areas, we mitigated the risk that corner cases would get migrated with bugs, or overlooked entirely.

Involving engineers from every product engineering team made dark mode a coordination-heavy project. This posed a unique set of challenges compared to typical large-scale projects, in which a small, dedicated group of engineers defined parallelizable tasks to accomplish and worked towards completing them. For example, we needed to quickly onboard forty engineers onto the refactor process, without duplicating tasks or introducing regressions in production.

### [Tooling and automation](#tooling-and-automation)

To prevent color regressions in production, we added three new themes to the codebase: _Dark mode, Light mode (new), and Debug mode_. The existing theme that users saw in production became _Legacy mode_. Thanks to CSS custom property fallbacks, we had the option of leaving the old PostCSS variable as the fallback argument when the CSS custom properties weren’t assigned. In legacy mode, we simply didn’t assign values to our semantic tokens, so the fallbacks would apply. This way, we prevented regressions to the version of light mode users saw in production as we proceeded with the migration.

SCSS

```
/* Previously */
color: $figmaBlue;

/* Now */
color: var(--color-text-brand, $figmaBlue);
/* falls back to $figmaBlue in legacy mode */
```

What was debug mode, you might ask? This was an Easter egg we provided engineers with during migration, where every token was assigned to a randomly generated, brightly saturated hue. It was often difficult to discern whether a surface had already been converted to use semantic tokens. By toggling on debug mode, the engineer could instantly see if their surface was converted.

Plus, it was _delightful_:

![A Figma file with a bright blue background and grey canvas, with pink accents](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA1UlEQVQokeXSv0oDQRCA8Xsyz0guFmksJL5FSBOCkHcR7EQIIiS7kWQnZLnFy9mmuT9JcXvP8Um0Mlh4cJ3F1wzDjykmGDxY7h4t41nKi8nZxZ7UnVfx4apf5p65lExfE26fV9w8CUGkllzrN0bbmNU+41B6joe/Z/cF062jrzWR0gShLOhsFMPEIkWGrz11g1yZc5/E9Izicr0gCI3iShTDd4vkGZX3+AbFRc5k54hEE5oTKD/B01LdBCy/we6mbVD+5YUX0vaFX2/TBpg6ekbTXSo+Adzw5kKlQKxRAAAAAElFTkSuQmCC)![A Figma file with a bright blue background and grey canvas, with pink accents](https://cdn.sanity.io/images/599r6htc/regionalized/9fec8defc4530a388666e2bbf907a15936286621-3336x1950.png?rect=2,0,3332,1950&w=528&h=309&q=75&fit=max&auto=format)

A look at debug mode, which had a randomly generated, brightly saturated hue

We also built a web app that would surface the dark and light mode color assignments for each of the 350 semantic tokens and had some lightweight search functionality. By mapping both the searched color and the semantic token colors to the [CIELAB color space](https://en.wikipedia.org/wiki/CIELAB_color_space), we could surface the semantic tokens with the closest matching perceptual distance to the queried color in light mode. This helped engineers narrow down the set of candidate tokens, and gave them reasonable certainty that they weren’t changing light mode colors drastically as they refactored.

Finally, we needed to ensure that dark mode would be supported on features built post-Dark Mode Week. To accomplish this, we added a linter that runs as part of our CI pipeline. The linter would error on a PR when a color was assigned without using a semantic token. This way, we knew that new code that applied colors was using semantic tokens, and thus supported Dark Mode.

### [Staging beta and polish](#staging-beta-and-polish)

Shortly after Dark Mode Week, we were ready for our internal beta. We automatically fielded each internal user at Figma into one of three modes: dark, light, or legacy. This would help us catch regressions to legacy mode or bugs in either new mode.

![Instructions in an internal Slack channel about how to test dark mode](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACAElEQVQokZ2RTU8TURSG+zOATjvTmbZz78zt9LuVVCqJQFybGBHUoH9AhfqRSKAmuNW40/gPrCbddNulJCgB3VgWCJtuYQXdOO9rZqpIjDHo4sm5i3Of+95zIhPVImrjVZTKVbheHrbMICVcWGkHZkogkfyJDcMaEpwTP86GlWbMSGIsluCoZjDiCIlcLodiqYJ8oYxsLo+Ml4WrMpDShS0cCCFhC4mULZFMBzjhI/FECnEjSU23fgljuhUm8nIlZPNFqMxQppQL6TgQ0oVSCp6n4LgKtlRICXUijBlJxgwL0bjJQBqJxs0wetAUfDlfrKBYPodypYpCqYJMtgDhKAjphAmttISZkuEd3UwHUgbi00IKJ8Pz9UlevTbPxcYDLq80ubL6hI+XVzl/Y4HKKzDo03QrrH9iLJYYCjXdxPTMJaytPUW73cbHzU30ejvY3f2KL70dvHz1GuO1CxiJ6sGcMKoZv8PTROKGxfnrN9npdLi/v8/Dw0MOBgP6/jceHx+z9fYd65NTHInqJyn+RiTY0sKt2+x2u+z3+zw4OAhFvu+H9U0rEF78F6F1knBvby8UDhP6PDr6D6Gmm5yanmGz2WSr1eL79XVubW1z+9Nnbmx84LPnL1gdnwjncybhcMsu6/Ua5+ZmeXdxiY37j7jUeMg79xq8fGWWwvXOLPwOl6OLSy73eI8AAAAASUVORK5CYII=)![Instructions in an internal Slack channel about how to test dark mode](https://cdn.sanity.io/images/599r6htc/regionalized/cbaf34baa72402ef891443b2ec3dacf560e45b53-1710x928.png?w=1080&h=586&q=75&fit=max&auto=format)

We had a dedicated channel in Slack to test out dark mode and surface any bugs

We anticipated a long tail of polish work that would take dark mode from 80% complete to 100% complete. The Figma app contains so many disparate surfaces—from panels and subpanels in the editor, to modals in the file browser, to billing and onboarding flows. To fully support Dark Mode, we wanted to be sure that we had covered them all.

The following few months were spent covering dark mode bugs, refining our token schema, and polishing dark mode for complex surfaces like on-canvas guides. Our internal beta was successful in helping us get dark mode to the quality bar we wanted to reach before shipping it publicly. All in all, folks around the company helped us spot and fix nearly 100 polish tasks related to dark mode.

Over time, the product ambiguities we started out with crystallized into clear paths forward. In terms of user-generated canvas content, we realized that the simplest approach for a multiplayer product would be to constrain dark mode to objects that are not user-editable, leaving canvas colors untouched when a user switches themes in Figma. We selectively applied some color updates to colors rendered by our C++ engine in the editor in dark mode, such as blues used for selection and purples used for component highlights.

## [Turning features into systems](#turning-features-into-systems)

The cross-functional approach that was core to Dark Mode Week allowed us to ship dark mode for almost every surface in the Figma app while providing support for future features.

At Figma, most of our engineering projects are completed by small groups of engineers who focus on a particular part of the product or infrastructure, whether that’s [LiveGraph](https://www.figma.com/blog/livegraph-real-time-data-fetching-at-figma/)

,

[animations in the prototyping viewer

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB/UlEQVQokY3R+0tTARQH8Psn7nrv3TPTbQpz3k33bK49mrmF293V3GTLpakrr1viiOlQnOE0hCjoAVLSL0UqBpEJUcvY+YZNjA2CfvhwDofDOXAOw6sAs+ETUoFZPJ4yojzuwYhYg0l9Cg3bgKDCpfNenm3GZo0gsK0YTccvBMQdLCYiWJaCqI6GsR2RkLetwWU4hJqrg+XruKI+hVX7GRb1CfRcHRzbAMcSOBVaMF3aE0wGZ7AwGkXaWUbFm8deLITX0RtYdBXhFmuwONYRd5dQvjaHkquAuGUXDuNb2DrfY8BwgEH9EQZ1x3DojsGIxneYiyVwN3wHmb5tFMQ1ZIbmMS+FsSVfx6Y8hJVxJ54kfdifsGFPdmEjmIbifIi8fQUPxHUs9G9AsVahWDfBhGw1KPFhTPvzuG9fhexegnq4gN5sDsrUNJ5KGWyFsyj6lpDzl5D2PMJ4fw3JnueQzC+RNJ17dYlJBe/RshSkgn+GZgM5sssp4rNFsmeeUXTkI8XEA/J1HpFF+5Wuar6TXvhBeq5Oho6zCz9bMKtjXuzILlRuJjGWvA3LZAF9t95gwPEN5i6CTmh+r/34/8Lsp3vpRdJLSjRLvkiVetwfyNh9RnoeJKiIeBX9iQL7f5jDhIsq0QkKeXap2/SFtEKDBBbNQW3NPIu/+cWydr8B7hbkTbRbRwcAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/e5b6f5cd1dd316db01406f3e014a4c5ffa10b9e5-4240x2000.png?w=4240&h=2000&q=75&fit=crop&crop=focalpoint&auto=format)

### How Figma put the bounce in spring animations

An inside look at how Figma engineers used the laws of physics to bring spring animations to life.



](https://www.figma.com/blog/how-we-built-spring-animations/)

, or

[the new comments experience

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAABp0lEQVQokYWR7UtTYRiH95/1L7hxdpy6dMedFuJLSUIfhBJZZuskEVgO5qabjnAzXS7wpVUq+FJC+UVBhlsFKipGqPN4pueK49kmmbEPF78H7vt3wcNtsVt1DIQKsFsppE51ZR6pVsMtaciuS6SbGtXi2bUdu1XHUnwUB6LtnNtuFW/HIX0vfhMOHBAb+k48miY0nKUn8IMHj3bxyCcXu0KF2f2PUMfl1OjyHhLu3yfq/0kimuHb/CKZ1QSp5STKVArf2Aqdvu2LXaGcsLlB5ZX/F119a3i8SdqUWcZHV9lYmCA1PUhrIEFLbBJlaJ2mhlwZofWctrsq4df7tI9+5EboKVWDIeLJBdKLE3yYCXMv+JY78UmUyBqN5YU6rS0nxMb2iCytcP/TCMrcOEufp9j8muD98jueGV9+84WHj7eoqzktCC8pCY2DGEPZpfKk+wB/cIvn/Vl6gxkiA2mGBzbwBzP4XmZp79hBlo4LRzEvXRKKtjyi7ayEQ9Coc+a4JR3jqTfSRC6kuzaH06Ei2rS/eiZ5LFX2I67iMBCOqBTM/IdrOkX+AFw79HTahVeHAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/6a8a9c3ed7c8ea08ed481f292d23ae744a9ce52c-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### Stay in the flow with redesigned comments

Today, we’re introducing updates to comments to make it more intuitive for teams to share, manage, and act on relevant feedback.



](https://www.figma.com/blog/stay-in-the-flow-with-redesigned-comments/)

. But once in a while, a project like dark mode comes along where we simultaneously want to build a new feature _and_ introduce a new pattern of designing and engineering.

That cross-team coordination paid off. The community response to dark mode was invigorating, from users who appreciated the improvement in color contrast compared to light mode, to others who could finally design in the dark without flipping to a bright Figma page.

Of course, our work isn't done. Figma’s semantic token schema is used by hundreds of engineers, who build dozens of features, daily. As we develop more and increasingly complex features at Figma, our color schema requires continuous iteration to support our evolving codebase’s needs. And, the insights we learned from building dark mode will stick with us as we continue to integrate user feedback into Figma. Lesson number one? The simplest requests might have the most complex answers.

If this project sounds interesting to you, [check out our open roles](https://www.figma.com/careers/)—we’re hiring across engineering and beyond!