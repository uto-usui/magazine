---
title: "How Coinbase used Code Connect to guide agents and shrink token costs"
source: "https://www.figma.com/blog/how-coinbase-used-code-connect-to-shrink-token-costs/"
publishedDate: "2026-09-02"
category: "design"
feedName: "Figma Blog"
---

The Coinbase Design System (CDS) team supports the largest U.S. cryptocurrency exchange across mobile and web for consumers and businesses. They’ve scaled a design system for quality, consistency, and accessibility—but what needs to change when its primary users shift from engineers to agents? Technical Lead Erich Kuerschner saw an opportunity to improve agent output with the [Figma MCP server](https://www.figma.com/blog/the-tldr-on-mcp/)

,

[Code Connect

![An abstract illustration of a central hub with tube-like connections stretching between city buildings, symbolizing a network linking systems across an urban landscape.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFA//EACQQAAIBBAECBwAAAAAAAAAAAAECAwAEBREGITEHEjNBUmHB/8QAFQEBAQAAAAAAAAAAAAAAAAAABQT/xAAeEQACAQMFAAAAAAAAAAAAAAAAARECA2EEBRMiQf/aAAwDAQACEQMRAD8AY5VbPkbK0ifbI5YSddAj7pfM8bxOJjxxwNvcWCIAJklHqE+6j9q/eopuMbEQDG04BU9jVvxTAiveOtGArGfyHXx12pDc3Fc4DNF2sNrJDDxgaJXYorbJWcAu21GBvrRQnI34SuD/2Q==)![An abstract illustration of a central hub with tube-like connections stretching between city buildings, symbolizing a network linking systems across an urban landscape.](https://cdn.sanity.io/images/599r6htc/regionalized/13aeb37a574d8fe89b2d6ccc8b8137b36cf46ceb-3264x1836.jpg?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Better code, fewer tokens: The benefits of Code Connect in MCP

When going from design to code, agents lack the context of your production components. With Code Connect in Figma’s MCP, they get that context. We measured its impact on token usage, task duration, and code quality.



](https://www.figma.com/blog/the-benefits-of-code-connect-in-mcp/)

, and CDS’ own agent skills. To test this, he ran an evaluation and found that on average, Code Connect cut costs by 22.5% and task completion time by about 22%.

“The tests showed us that Code Connect often reduces the number of tokens your agent needs to spend while converting a Figma design into code,” he says. “The quality of that code is noticeably better, thanks to the better context Code Connect provides.” Here’s how the CDS team adapted for new engineering workflows with Code Connect, and measured its impact on time, quality, and cost.

## [Bringing Code Connect into agentic workflows](#bringing-code-connect-into-agentic-workflows)

The CDS team already had a few agent skills that teach agents to follow their design system’s best practices: choosing the right components for the job, avoiding deprecated components and patterns, using CDS design tokens, and more. They had built an internal prototyping playground on top of those skills, so anything made there stuck to CDS by default. But both were tuned for writing code from scratch. Another common workflow was still underserved: turning a Figma design into production-quality CDS code. Product engineers told the team that the process was slow, inaccurate, and too unpredictable to bring into their regular workflows.

Code Connect was the obvious lever, but CDS hadn’t updated their mappings since before the release of the Figma MCP server. What existed was out of date, and many new components had no templates at all. “Based on what I’d heard about Code Connect, it was a way to improve the reliability of design-to-code workflows without having to rely solely on our agent skills,” says Erich.

Fully adopting and modernizing the Code Connect setup would involve updates to hundreds of components across mobile and web. Erich used Claude Code to build an agentic workflow that took a list of Figma components and worked through them in parallel, with the [`figma-code-connect`](https://developers.figma.com/docs/code-connect/quickstart-guide/#write-template-files-with-an-ai-coding-agent) skill writing the templates. “In about four hours, we went from having a few of our components migrated to the newer Code Connect format to full coverage of our design system,” he says.

![A Figma Dev Mode example of a Bitcoin asset inside a progress ring](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACEElEQVQokV2TO2tVQRSF70+zthItDKidhRYpbKwsFAQRG/+AlRaCJoJoUCQJGgQNYqGgJlFjEaIimnPm/dgzn8zcy414YDFzZuCbNXuvmYgUiggiGckJSYGS02ytICJ471FK4ZxDcqaUMldtoxRSLERXmKTQJgF/8BO3956w+5r4Y5ukB1JohwghBLRSGG06tB3gfSCESIixjzEKOVcmXkfs/g767R30s0vYlQu4jeuEz8+J40EH5pTwVqPHATWOKK1RxjGYyGgjxid8A0phYn/9QG/eQi+dxC0t4B6cxt47hlu/TNx7h8TYSxGcQY8KNSqsdR0yOkGFgkuVJBUplYn69g71aBFz+whh9SLh5TXc/RPYpVP4T0+QYMk545qjwWJsIDXX0iB0SYXaVZmMX96gHp7D3j3aYXHzJu7BAnr5DHZ7jRx9b1hz9XswDDYRciWXJrpKrVRmQPN9F/XiBnZ5Af90Eb9yDnv/OHr9Km5/i5xy73RMiQMT+aUzg59es4HDDD536EeD+foKvXEd8/g85uFZ9NoVzM4GQSkkT6PTCm5i5Y8rHdjmNlV8mjqdO4xO8Eph9z9ittYwn1axex/ww0jyLTaHwObGzdRA7T/maTPmDiUVchJSTMTgu3JMfa3BWmgbsIe8VEptdSuzxsgc1r4OPEy9/KfD19BfRCt8rZRSSSnjnceHgPyz1/b/AmcYP7BdnxcbAAAAAElFTkSuQmCC)![A Figma Dev Mode example of a Bitcoin asset inside a progress ring](https://cdn.sanity.io/images/599r6htc/regionalized/b06f08c589d317b3929ac75baca4e46841f9cb32-1882x1012.png?rect=1,0,1881,1012&w=1080&h=581&q=75&fit=max&auto=format)

A Code Connect mapping for a CDS component

Today, every CDS component in Figma is connected to its sibling in code via Code Connect. Code Connect is part of every component workflow on the CDS engineering team. The team uses Figma MCP server to pull design specs, create or update components in code, and keep components’ corresponding Code Connect templates in sync with the latest changes.

## [Setting up the evaluation](#setting-up-the-evaluation)

It was time to benchmark the quality of agent outputs against token usage and time spent on implementation, with and without Code Connect. “We wanted to understand what Code Connect was getting us, and whether it would help address our product engineers’ concerns about the reliability of the design-to-code workflow, ” says Erich.

He used the same design, prompt, and model (Sonnet 4.6) for three runs in a blank codebase, resetting after each one to “make sure there were no lingering clues for the next agent to nibble on,” he says. He also had to control for prompt caching, which had the potential to impact the experiment, producing positive test results for reasons unrelated to Code Connect. The prompt was simple and intentionally vague: `Implement this design from Figma`, with a link to the design file.

![A “Your personal details” form with fields for name, country, date of birth, and Social Security number](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVQ4ja2U3W7TQBCF+968CS/QG6644wpRJOCiTSkgIhGFoiR1HCf+9/7vzEG7totBRdQVlo7W9o6/OTMrzxkRrYioIyJmZgRp41BUAkUlIbSD1B5Vo3EqJcrGQmqCpz6WiBgIC9VE9PkMwApAB4T9Pkgqg21yxGZ3QFm3aDuFTmgo7WDsCMN4cQACqAE8DNTaIs1ybLYJkjRDcshxzJuYyDkfYyYX/xU4RlhrkR1PWK9v8f3HBrv9CYdjjboRUMrA+/D9DIdKKazXa7y5uMDl5RXukhRFWaNpBYyx6Ns2A2itRZIk+Hhzg+VyiVOeQ0o1wGjav8eVTIPLqqpQ1XW8994PsD7pLCAPLoOrAHPORdhUs4HGjED9n4DWRpg2Bm4o98lAmgCD07F/Qb96+YQeKq3jOkI8UXQbnicHw/92SH0Pw4GEku+hzBEaNAvIcUBYtK1A07TohIDWAexgnYvAeT0kRic10qzALkmxTzMc82L4W7rofnbJrZC4S8PESZDsUxyyE7JTjqpqovvHAjkozDgpJedFyUVRcScEK6VZac3GWPbe38ci5I/zEDUNwG8A2iFLVAiw1pIQgpRS5PumPShi+M6wrxUqofEpABdESJi5nIqISudc6b0viX7fGxX2qs6V17dUvP5Kuy8ben9GhJfe0wfv6dp7WkxF1OvP9738Qiq1WG3bxfNXdvHsnN6dv6UXPwHoDBV7VhksVgAAAABJRU5ErkJggg==)![A “Your personal details” form with fields for name, country, date of birth, and Social Security number](https://cdn.sanity.io/images/599r6htc/regionalized/e186e8339bb81378e7d5bbdc4814ecd95850e73d-1304x1314.png?w=1080&h=1088&q=75&fit=max&auto=format)

The design Coinbase used for the Code Connect evaluation comprised a wide variety of components.

The goal was to use a design that wasn’t too simple (like a button with an input), or too complex (like an entire mobile app home screen), but that landed somewhere in the middle.

There were a couple of traps, too, says Erich: “In the header of our contrived example, we used the CDS Stepper component, which has dozens of properties, and is quite complex in the code. What was most important was having a wide variety of components, including ones which had been common challenges for agents to get right. For example, agents had been notorious for hallucinating illustration and icon names. After completing our adoption of Code Connect, that problem disappeared overnight.”

> Agents had been notorious for hallucinating illustration and icon names. After completing our adoption of Code Connect, that problem disappeared overnight.

Erich Kuerschner, Technical Lead, Coinbase

## [Measuring the ROI of Code Connect](#measuring-the-roi-of-code-connect)

Across both visual and code outputs, the two main factors Erich looked at were component choice and design system adherence. “With Code Connect, component selection was excellent,” he says. Agents consistently used the right components—even tricky ones, like the ListCell and Stepper—instead of building them by hand with primitives: “One common mistake we saw agents making without Code Connect was building the Stepper component with two progress bars and labels.” He checked whether agents used the right design tokens, using semantic colors and sizing, say, instead of styling with CSS or inline styles.

![A table showing that on average, Code Connect resulted in a 11.5% decrease in tokens used, a 22.3% decrease in time to implementation, and a 22.5% decrease in cost.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAACXBIWXMAAAsSAAALEgHS3X78AAADXUlEQVQ4jWWSWU9bVxSFDwIhM0rAi41ACBASwwu8MIjhgb8Chr8XX9958LUNHnGQSkOYTaBV0iRMNaQYqL2qdeAS2j582l57n7Pv2vtYDAwM/D01NVVfXFzE8vKyZGlpCXNzcxgeHkYoFEJDQwOEEBL+bm5uRmdnJ7q7uyU9PT31rq6uWltb26MYHBysT05OYnp6GjMzM5ifn8fCwgJmZ2cxNDSElpYWNDY2oqmpSUbChq2trWhvb5d0dHTIGAqFamJkZARjY2MYHR2VjI+PY2JiQubYMBwOIxKJoL+/H729vVIz9vX1yRiJRORvEg6H62JtbQ3RaBQrKyv/g3nWyfr6uiTQrL2tR6NRrK6uQui6Dk3TEI/HoSjKK9SmacJxHBl5xrIsqQ3DgKqqUtu2jaAHzwnf90E8z4Pruq8wl06nsbm5iVQq9S+dTCal3tjYkAQ9mBd0EriLxWKv0AG/SBd0QE1ngdtAGy9uCfOCXyXsHnyZ0FUmk0E+n5eRTrLZrNR0yTvMZ7PZV6fMCx7I5XKywANMEupisYjt7W1sbW3JRqVSSWrmeYexVCqhUChIqAVH4hiE9jkeoeZe6ZYPwXPcbSKReH0oRs/zZC14MBHsIXipYB/Mvb1AzRdlUzbjeWrn5dWD/Yr/jvt2HxwjGOntiM97zaJQKMp1sEZ4TrxtlE6nkE6lZKQOmjBmMpso5PNS0wDvBE0ymYwkl81BqLoBVdcR13QocQ1KXIXCv4BuwLId2K4Hw7SlNi0HluNCNy2omiHzpu1C002wj2aYEDG/gJifRyyRwzsvi3fuM0oiDy29BSOzDTW9BcV/0ZvvoaaL8g7z2sZ7KMkCFL+AeLIIYX74Cv3XLzB2vkDf+Qz9lxd2PsPc/Qr38ArO/iXMD3/A3ruAd3QNZ/9Cakb38ArWx2+wdr/JurCPbmHs3/xk7/qZ/Rs4x3fwzx7hnVZhHVbglv9C8vxJRuuoAu/0Hv7ZA+zjO1hHt3DL93VhHVbq+t6VbKKT3UsJtXvyA8nfnuCUf0Ddu4R5XEHi7AHW8S3iexewTm7hfapCO7iC8vE76zWROK3W2JkuWPTK98+cVuGfPyH1ew3Op3vEDy+hnfwJ7/wBZvkOsYMLGOUKvLMq9OObeuzge007un78B93+WV5WUsMzAAAAAElFTkSuQmCC)![A table showing that on average, Code Connect resulted in a 11.5% decrease in tokens used, a 22.3% decrease in time to implementation, and a 22.5% decrease in cost.](https://cdn.sanity.io/images/599r6htc/regionalized/82d5cf15ea9529ba885483c8d634ec30b723c8de-1380x1328.png?rect=1,0,1379,1328&w=804&h=774&q=75&fit=max&auto=format)

The three runs showed that Code Connect made the same job cheaper and faster. On average, it cut token use by 11.5%, time to implementation by 22.3%, and cost by 22.5%, with every run improving by these measures. The evaluation made it clear that agent skills and Code Connect have different jobs:

-   **CDS agent skills shape how the agent implements a solution.** From choosing the right pattern to avoiding deprecations, these decisions ensure high-quality outputs, especially at scale.
-   **Code Connect gives the agent the best possible context when starting from designs.** With component context upfront, it spent fewer tokens searching and guessing, which resulted in cost and time savings regardless of agent skills.

Outside of their tests with Code Connect, the CDS team regularly evaluates their design system skills to make sure changes to those skills don’t cause problems for agents. They’ve noticed that with each new generation of models, agents are getting better at using CDS without relying on skills. Eric sees the evals as a way to prepare for a time when skills may no longer be necessary—the quality of context, however, will always matter. “You don’t want to be stuck without Code Connect in that future,” he says, “because we’ve seen what happens: The agent can go wild in how it interprets the design.”

Learn more about [Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect), which is available on Organization and Enterprise plans for Full or Dev seats.