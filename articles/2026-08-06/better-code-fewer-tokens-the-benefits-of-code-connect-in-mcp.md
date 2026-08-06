---
title: "Better code, fewer tokens: The benefits of Code Connect in MCP"
source: "https://www.figma.com/blog/the-benefits-of-code-connect-in-mcp/"
publishedDate: "2026-08-05"
category: "design"
feedName: "Figma Blog"
---

Coding agents are getting much better at turning designs into code. But without [the right context](https://www.figma.com/blog/why-you-should-care-about-design-context/)

, they often rebuild your UI from primitives instead of using the production code components your team already maintains. This can make the output look right, while still being wrong for your codebase. It can also make the agent spend more time (and tokens) searching, guessing, debugging, and rewriting.

When agents work with the Figma MCP server, [Code Connect](https://developers.figma.com/docs/code-connect/quickstart-guide/) can provide them with additional context by connecting Figma components to real components in your codebase. If Code Connect is set up, agents receive production-relevant code snippets in the MCP response, instead of only a React representation of the visual design.

![An illustration showing Figma component properties mapped to code component props through Code Connect, visualizing the relationship between design and code.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGBAf/xAAhEAABAwMEAwAAAAAAAAAAAAABAAIDBBFBBQYhMRMUUf/EABQBAQAAAAAAAAAAAAAAAAAAAAT/xAAeEQABBAIDAQAAAAAAAAAAAAACAAEDEQQSITFBwf/aAAwDAQACEQMRAD8A6bQeKp2uK4tBlJ7GLYSaWtJheA22eFZbepGN2XDHYEGIk8ZUXVxNibZg7KYUojjm5d+Ic80+pSAVC138pYqnXTBII2hpsBe4yhJtUjHuOP0BCEGSTi3KXBlbRC7v4v/Z)![An illustration showing Figma component properties mapped to code component props through Code Connect, visualizing the relationship between design and code.](https://cdn.sanity.io/images/599r6htc/regionalized/311ff7abd938dd49d3c1752368f4190f543082a2-3264x2176.jpg?w=1080&h=720&q=75&fit=max&auto=format)

We originally built Code Connect to improve the design-to-code process for human developers. But today many teams and role types are doing this kind of work with coding agents. So we set out to measure whether, and how much, Code Connect improves agents’ performance.

In our evals, we found that just like with human developers, Code Connect helps agents adhere to a company’s design systems and produce better outputs, faster. We tested design-to-code tasks with agents using Figma’s MCP server, both with and without Code Connect templates set up.

We found that with Code Connect:

-   The median task duration was reduced by 19.6%
-   Code quality increased by a full point on a Likert scale of 1–4
-   Token usage for the median task was reduced by 29.5%

This post walks through how Code Connect provides context for agents, how we ran the evals, and what we learned along the way.

## [How Code Connect enriches Figma’s MCP server response](#how-code-connect-enriches-figma-s-mcp-server)

###### Case study: Coinbase

The Coinbase Design Systems (CDS) team architects and maintains the core design components, tokens, and infrastructure that drive consistency and efficiency across Coinbase's largest consumer products. As the engineers moved to agent-driven development, they invested in Code Connect so agents build with the right components instead of reinventing them.

To measure the impact, Frontend Engineer Erich Kuerschner ran the same design, prompt, and model with and without Code Connect. “Without Code Connect, the agent would sometimes fabricate its own version of components: say, build a stepper out of progress bars,” says Erich. “With it, the agent sees accurate representations of the design as code and literal import statements pointing directly to the correct CDS components to use, so the output code quality vastly improved and we saved tokens at the same time.”

[Figma’s MCP server](https://www.figma.com/blog/the-tldr-on-mcp/)

lets coding agents retrieve structured context about a design. One of the key tools, `get_design_context`, gives the agent a code description in React of what is on the canvas. The output is visually correct, but because the agent doesn’t know how this maps to components in your codebase, three things tend to happen:

-   The agent makes up a new component from scratch.
-   The agent picks the wrong component from your design system.
-   The agent finds the correct component eventually, but does unnecessary work in the process, which uses extra tokens.

When Code Connect templates have been set up, the Figma MCP server substitutes parts of the generated React with production-accurate code snippets. Instead of guessing, the agent now has real code to use from your codebase. It’s told exactly which component to import, and which property values to pass in.

Here’s an example of the difference in practice. With no Code Connect, Figma’s MCP will pass the coding agent React like this:

TypeScript

```
<div role="tablist" className="flex gap-1 rounded-md bg-gray-100">
  <button className="bg-white shadow rounded">Design</button>
  <button className="text-gray-600">Code</button>
</div>
```

With Code Connect, the coding agent receives an accurate snippet of code that draws from your existing design system, and all it needs to do is use it in the correct place:

TypeScript

```
<SegmentedControl value="design" options={["Design", "Code"]} />
```

## [How we measured the impact of Code Connect](#how-we-measured-the-impact-of-code-connect)

We built an eval harness that runs the same set of design-to-code tasks in two ways: one with no Code Connect, and one with Code Connect templates. For each of our 27 test cases we measured code quality, token usage, and duration.

We tested two design systems, both React-based: Simple Design System (SDS), Figma’s example design system, and Figma Pattern Library (FPL), our larger and more complex internal design system. SDS is very well Code Connected; on average, the MCP responses we tested consisted of 20% Code Connect snippets. FPL is an example of a realistic design system with more patchy Code Connect coverage, where Code Connect made up around 6% of the responses.

The LLM judges tested the end result against snippets of code we know to be accurate, and what we’d like the agent to produce in the ideal case. These were scored against the following rubric of code quality metrics:

1.  `Correctness: Does the implementation correctly fulfill the task requirements? Are there bugs, logic errors, or missing functionality?`
2.  `Code Quality: Is the code clean, idiomatic, and well-organized? Does it follow conventions for the language/framework being used?`
3.  `Maintainability: Is the code readable, well-structured, and easy to modify? Are variable/function names descriptive? Is complexity managed well?`
4.  `Completeness: Does the implementation cover all aspects of the task? Are edge cases handled appropriately?`
5.  `Best Practices: Proper error handling, type safety, performance considerations, accessibility, and security? No unnecessary complexity or dead code?`

The end score was a 1–4 Likert scale:

1.  `Broken: The code has syntax errors, crashes, or completely fails to implement the task.`
2.  `Poor: The code partially works but has significant issues—bad patterns, missing error handling, poor structure, or major correctness problems.`
3.  `Good: Solid implementation with minor issues—slight style inconsistencies, small missed edge cases, or minor redundancies.`
4.  `Excellent: Clean, idiomatic, well-structured code that correctly implements the task and follows best practices.`

Some of these runs contained complex designs to implement. End-to-end, some runs (including running all variants multiple times, to discount any outlier cases) took over 24 hours to complete. On the model side, we tested both Claude Sonnet 4.5 and Claude Opus 4.7.

## [The results](#the-results)

Compared to the baseline without Code Connect, the tasks using Code Connect templates delivered these median results in terms of the end-to-end agent run, when using `get_design_context`:

-   **Code quality**: +1, from 2 to 3, on a 1–4 Likert scale
-   **Token usage**: -29.5%
-   **Duration**: -19.6%

Given these are median numbers, they do hide some of the trends we saw between different cases. The single biggest factor that moved numbers was Code Connect coverage—this is a mix of how much of the handoff designs are comprised of design system components, and how many of those components are Code Connected. The higher these two things are, the greater the proportion of Code Connect snippets rather than plain React in the `get_design_context` tool response, and in turn the better the results looked.

It’s also worth noting that Simple Design System is an easier case for an LLM. Because it’s our example design system, things already match up well between design and code in terms of component and property names. Even with that being true, we saw greater improvements than with our FPL design system, because Code Connect coverage was higher in SDS. In the SDS case we’ve Code Connected almost all of the components.

When Code Connect coverage is high, agents tend to make fewer exploratory tool calls and spend less time grepping for component and icon names. In the FPL example below, the runs without Code Connect inspected `node_modules`, ran broad greps for icon names, and in several runs hand-built the tab bar from scratch and churned on custom CSS. With Code Connect, the agent reached straight for the real Tabs and Button components, finishing in ~77% of the time and ~62% of the tokens.

![Figma's Assets panel displaying the design state used as the Code Connect example, with no team libraries available.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAACXBIWXMAABYlAAAWJQFJUiTwAAACNUlEQVR4nMWVW2vUQBhA+/9fxW1hwW79Ae2DFJ9EbJXaRqFdxWpLL7rJJunmMrlvMskcmdlWtPSSRcGEwwS+jzPfzGRmVmxW+Zes3B8cPMCyQjXEUc+YMrobtY7NsJ/QYYjXbhI0O4hun0Qd/IHoDgjkLl63eS0dPCQcmN5n9Rvi7AdFFdJ0CZKM9pqmS8lr10inatRDyAZBvUcUeyRJQtPUKKWABUp1NG2G6CyTaz8uHBHJfdI8IEszqqqibVsjXaCFqRl6b6HoLKq5IMtysiyjrhdVarq2o6qF6dTpN+RFhUnqI4QgL3Ij1FVKKZGNpKoT4rZHhRMGuGoDL3vLyelnzs7OzTyWZWmoqpJ5NaesBaK1cPsJn+OKXcbjj4yPPjF1XYIgIIoi0iwlLwqKKjYVPiq0r1d5Vu5hO+dcnF9gTya4U4cr3yOOQtI0JS8jYrmEMGwO8KMrLqczLh2fiXuF7c1w/AA/FMR5SCT7ziEjvLmF5cRsHRdsHedsnxRsn+S8+Fbw8rRk7Am8uveijJhWFq++pwyOJE8OG9aOpOHpoWRtLHn9I8WZW2YBJ31+m1BaOHnG16jlS9Sa9lh/h4vWyVIC2XunbJCoD0hyFJ3ebLfezsR0zlLC1gj1/r39KBP7n8IRibLMUaWHd3PK/I6O6ZyewnVi9Y45Hg36LExvkVDjmRydaz8s1Azx1RaR2iVW7xF3EKkdfNXrxF79JXVYv/dO0TF9VfS6U26G/jjL3Hp/wU+4tgWFKiulIgAAAABJRU5ErkJggg==)![Figma's Assets panel displaying the design state used as the Code Connect example, with no team libraries available.](https://cdn.sanity.io/images/599r6htc/regionalized/c3126d25622709541162e5a1e389d9c1038d98ea-1056x1320.png?w=528&h=660&q=75&fit=max&auto=format)

Figma design

![Figma's Assets panel without the Code Connect indicator, showing an empty state with no team libraries available.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAACXBIWXMAABYlAAAWJQFJUiTwAAACNklEQVR4nK2V7U/TUBSH+f8/mxklkfIPgNHPJgIaYFsIE4nRQAJb39Z1a2+79b3nMb2DRUG2QmzyfGjOL0/Pve3t2TJ5zf9k6+liZw3PFco2lrzDlh1sjMfIjs60FG7jVntM8gOC6gQl3b8I6y5+eagzS2lnnbCjn+5lB0yjW+aJT1ErKuIVRRUxz2384ghbDEzZJGQXPztmOnNQSlGUOSArRGotDeuezpobO8RgVp4SxT5RFJNmKXVdISIrlsJuS6EYBFWPJA2Iokh3mec5dV1rqqoiyUOm5SlWs+Q2HfrpMY57i+M4hGFImqZaes8iC/QqbNnQ4YgOjuxihwecD3pcXHzH8zzdacNisSBJEi0Mqi7OpiXfC8fxF37+uuDy8gfD4VB3OvY8gjAkimPm6ayd0Lx7y9PilIlvYZo2tm3hOjbe2GXqT1BhqD+noGz7UtjFy7tcT3z6NyH924DBKOCbGTAwAy7tiFE4wy+6bffQwEp7fLpRdM4yXp1lvBlkvB3kdM4ztgc5n4dKZ5rtGW0UYuDmPc7GER+uSt5flXy8bqjYvyr5cF3pWpNpvYdB3UcVMX5aa6Z3+Mnyvqk1mdZ7GEmfUubUItTCA0TXlDxDqKRPxbw5uX+c4tVp1rUXCx9fzxYaKOnpX5VQP+pvKYx1pqVwh0C+kuFSoCiJHqDIcXWmyZrrhcs/9lj2mckRgZwQ/oOZHDKWPZ01NwuXUosn5gmGrlla1nrqrZt46yffmjH6Mn4DrrkE7YBPbE4AAAAASUVORK5CYII=)![Figma's Assets panel without the Code Connect indicator, showing an empty state with no team libraries available.](https://cdn.sanity.io/images/599r6htc/regionalized/e5344543807fce6b2e7d94211bc7a82acd3d2214-1056x1320.png?w=528&h=660&q=75&fit=max&auto=format)

UI using Figma’s MCP with no Code Connect

![Figma's Assets panel showing the Code Connect indicator, signaling that code-connected components are available.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAACXBIWXMAABYlAAAWJQFJUiTwAAACO0lEQVR4nMWV7U/UQBCH+f+/Gg+SS6T4B8AHQ/xkjKBBrppwFyMKEZBr71qu15dtr2+73cd0eYkS4HrRxDa/bJOZPDOz251Zc1jnX2rtcWPvCa0K1H1c/YIJ1sPSmzj0uwFd+nhqm6DeI24OSfTgD8XNgEDu4zXbN9DeU8CeiT6r3hGllyyKOXWTIElRN6obQVZNDXSirQ5AtgiqA8LII0kS6rpCaw1cS+uGWqXEjW18neVAi1AeIrIZIhHkeY5S0kCv1VApYUrvBtQWkRqQlxFCCOI4pizLO6BSDXkVm6CmZN0lw/qQWPhEUUyWpVRVhVIKKSWylhRVYoIuzXBMj6newkvfc3L6hbMfZ2Yf27JbFUVOWZQmw1jZTLsBXzKN9xmNPjMcjZhMJwRBQBiGiFSQLRYsishkuBTo3JzyrDjAcc84Pz/HGY+ZTlyufI8onJt9zfKQSK4AnNcD/PCKi8mMC9dnPL3C8Wa4foA/j4myOaHsuodYeKWN7UbsHC/YOc7YPVmwe5Lx6vuC16c5Iy/GqzofisWksHnzU9AbSp4d1WwMpdHzI8nGSPL2UuCWtjnAcZcfey5t3CzlW6j4GiqzHrff8+vVTQWB7HxTtkj0JyQZmqa9bPfexthan5WAygDb+3v/0cb2P4EWibZNq2rLu+0yv6u1tT4dgZtE+gMlHjVtLxT3lFDhGZ/W13ka2KqPr3cI9T6R/kj8gEK9h687dez1O6jL5qMzpbW1o6LTTLktfblWmXp/oV/i6gVf2M1d3wAAAABJRU5ErkJggg==)![Figma's Assets panel showing the Code Connect indicator, signaling that code-connected components are available.](https://cdn.sanity.io/images/599r6htc/regionalized/f0189566dbceb52db96cc604ec61786dbfc93d34-1056x1320.png?w=528&h=660&q=75&fit=max&auto=format)

UI using Figma’s MCP with Code Connect

The code quality results are just as interesting. Without Code Connect, the coding agent hand-built the tabs and buttons as raw React code and CSS. Even though it looks visually close, it’s not even functional—the tabs aren’t interactive, but instead hardcoded to look like the designs, including the selected state! Also, note the slight differences between icons and padding, details that are critical to a high-quality product; the runs with Code Connect got much closer to the original.

Here is an example code snippet from the result without Code Connect:

TypeScript

```
{/* Plain divs for the tabs */}
<div className="lv-tabs">
  <div className="lv-tab lv-tab-inactive"><span className="lv-tab-text-inactive">File</span></div>
  <div className="lv-tab lv-tab-active"><span className="lv-tab-text-active">Assets</span></div>
</div>

…


{/* Raw button element */}
<button className="lv-browse-btn">
  <span className="lv-browse-btn-text">Browse team libraries</span>
</button>

…

/* CSS: ~300 more lines*/
.lv-tab { display: flex; align-items: center; gap: 4px; height: 24px; padding: 0 8px; border-radius: var(--radius-medium, 5px); }
.lv-tab-inactive { background: var(--color-bg, white); }
```

With Code Connect, the coding agent correctly imported and used design system components, producing more succinct, higher-quality code:

TypeScript

```
{/* Usage of the FPL tab component */}
const [tabPropsMap, tabPanelPropsMap, tabManager] = Tabs.useTabs<'firstTab' | 'secondTab'>(
  { firstTab: true, secondTab: true },
  { defaultActive: 'secondTab' },
)

<Tabs.TabStrip manager={tabManager}>
  <Tabs.Tab {...tabPropsMap.firstTab}>File</Tabs.Tab>
  <Tabs.Tab {...tabPropsMap.secondTab}>Assets</Tabs.Tab>
</Tabs.TabStrip>

…


{/* Usage of the FPL Button component */}
<Button variant="primary" width="fill" onClick={() => {}}>
  Browse team libraries
</Button>
```

## [Takeaways for anyone building with LLMs](#takeaways-for-anyone-building-with-llms)

Agents do not automatically know what “good” code means inside your company—you have to give them the correct context. Left to their own devices, they’ll spend time and tokens looking for the right components in your design system, or they’ll happily rebuild them from scratch. The result might look correct visually, but the code might not be what you’d want committed to your codebase. To do a good job, agents need more explicit, structured context—in this case, a real code snippet for how to implement the component in your codebase.

If you’re already using the Figma MCP server, you can Code Connect more of your design system to get from design to code faster, at lower cost, and with a higher-quality output. You can follow the guide [here](https://developers.figma.com/docs/code-connect/quickstart-guide/).