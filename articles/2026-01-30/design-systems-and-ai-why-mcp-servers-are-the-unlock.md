---
title: "Design systems and AI: Why MCP servers are the unlock"
source: "https://www.figma.com/blog/design-systems-ai-mcp/"
publishedDate: "2025-08-06"
category: "design"
feedName: "Figma Blog"
---

![Circular diagram with three connected arrow segments forming a loop. The segments are labeled clockwise: 'More robust DS' in red, 'Better AI output' in blue, and 'Improved AI/DS support' in green. The background is black.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC8UlEQVR4nK2U/09TVxiH7zn3lmsvq+1trXxpsaNYlRaKAhOIiZFNWFxjF1ghKrTGoY0xBpkjBjadTG0JoltQMxKUORMMWdaZLVmBGH/Q7Q97lltgaRBIjfvhzTk5ec+Tz3ve93wURVH4n0PZNkFYIcTq+j5AYUGEQAqBKmUhrP06/J2AQgjsuk6V203E5+OjmhpaKyupdzqp0HV0KQs5JQFVKTGdTjqiUS7H4/x45gzzfX086e5murmZCzU1HHI4cGhaQbGyHVAKids0+azzYx6Nj/Nyaorla9fIpVLk4nFWOjtZaWlhKhTiaHU1DsPYTGlRmXY77R2HmZnK8M/icxYnJhiJxehtaiJx4ABjDQ383tbO65NxMn39NIbD2HR9I3QVJqXE4/OSGO5nfmmWxz/dJdF1nEBFBS7DwGW3E3K5SB5qYXHsW3KPn3J6MIXH6y3cLYIqKEIpHFY2+ul5OMDoy2/ou9yL31+Fpqr/ddemagRr67gy9h0Ly2/4+vtJAsG6zRWqmoq/vZaeX5IkX1zkYG8rhrO8aEwsqMTp8XIilebui1dcvTdLsD6yCixWuA4MtAU5Nf8lQ7lhmhNtGK7youRV4Aee3Rw5NcTIszxnbz9gz/7w2wqtkoUqqI746Z9OMZq/QXw0QVWdD82mIQpvJJE2HXNvhCPDtxh4skT38E127QluAZQCs8pNVzrG9T/uML4wwacDMQKhD3G5TQzTg1EbxteTpmM6xyf3f6M+dhrD5VkDFjdlreyyHWXsb60nnb3EzPIs9399wMiNq/QMDhL54hze8xn82T8J/7DMvqHrmHVhVM229WBbUIfLQeuxw3yVGeVZfoG/3iwxn1+h9+dXVM78jZnN4z13k52RNjR7eXEzNv961vg4nA4am6MMDiXJTmeZnJ3j88wcFelJ9ONJymobUDeHsaU56LqOd7eX0L4QDdEmAuEo5f69yJ0ehFVmqeagbLCvwkit2ZfV6W1ApRlsMbyU3JKA7xL/AphvF/G2790KAAAAAElFTkSuQmCC)![Circular diagram with three connected arrow segments forming a loop. The segments are labeled clockwise: 'More robust DS' in red, 'Better AI output' in blue, and 'Improved AI/DS support' in green. The background is black.](https://cdn.sanity.io/images/599r6htc/regionalized/82dd142dbab925653c5291f2f33b0f5f5b4de78f-527x527.png?w=527&h=527&q=75&fit=max&auto=format)

When AI agents have design context from Figma, they make your design system even more effective—ultimately resulting in better code output.

For years, design systems have been the scaffolding that enables product development teams to scale design decisions and bridge design and engineering. The ingredients that make for a successful design system—better communication, extensive documentation, shared patterns and languages—are also the foundation for effectively leveraging AI. Just as design systems help design and engineering teams understand brand guidelines, best practices, patterns, and code, they give AI agents the context they need to produce not just _any_ output, but the _right_ output. And when AI agents can build with your design context, they create a flywheel effect: AI strengthens your design system, which powers better AI code generation.

A great example of this in practice is [Figma’s MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/)

, which brings context from Figma to your IDE. This context includes information like style and variable usage, [variable code syntax](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections#code_syntax), and [Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect), so the more your designs utilize your team’s design system—and the more connected the design and code sides of your design system are—the more useful the MCP server becomes. And if your organization has yet to build a robust design system, the Figma MCP server can also be a helpful tool to kickstart the process by supporting token and component implementation.

## [Design systems are the lingua franca between design and AI](#design-systems-are-the-lingua-franca-between)

As LLMs make it easier to go from idea to execution, the true differentiator for great products becomes not just functionality, but craft—the kind that reflects clear intent, visual identity, and thoughtful user experience. Design systems enable that level of craft to scale across an organization. They lay the groundwork for elegant, accessible, and usable interfaces, enabling teams to move quickly without sacrificing quality or consistency. They also ensure that we don’t all end up shipping the same generic UIs cobbled together from the same pool of AI-generated parts.

Great design systems provide:

-   **Scalable foundations:** Defined tokens for color, spacing, typography, and more, so visual expression is consistent across platforms and touchpoints
-   **Reusable components**: Built to flex across use cases, while maintaining a shared source of truth
-   **Built-in accessibility**: Experiences that are inclusive by design

For organizations already reaping the benefits of a robust design system—or even looking to justify the time and resources it takes to build and maintain one—those benefits are even greater when paired with AI tooling. With design systems, AI agents don’t just help you build products faster, but also generate outputs that are aligned with and informed by the patterns and best practices designers and developers have thoughtfully crafted.

As more companies adopt AI tools in their product development stacks, design systems will increasingly serve as the connective tissue that guides these tools toward better outcomes. They’re how organizations will bring AI closer to their brand, their standards, and their teams.

## [A new level of speed and accuracy](#a-new-level-of-speed-and-accuracy)

Code generation is currently the most common use case for AI in product development: According to Figma’s recent [AI report](https://www.figma.com/blog/figma-2025-ai-report-perspectives/), 68% of developers are using AI to write code. But only 32% of designers and developers say they _trust_ the output. Why? Because context is everything.

Asking an AI agent to generate code without design system context is like asking a new engineer to start shipping code before onboarding. It might technically work—but it won’t align with how your team actually builds.

### [Why this matters](#why-this-matters)

When an AI agent generates code _with_ design system context, it can:

-   **Reuse existing components and patterns:** Reducing duplication and inconsistency
-   **Apply design tokens automatically:** Aligning code with brand and accessibility standards
-   **Give developers high-quality starting code:** Helping engineers work fast and with greater accuracy
-   **Shorten feedback loops:** Bridge design and engineering by reducing misinterpretations and time spent on QA

This is where Figma’s MCP server comes in. When a Figma frame is inspected, the MCP server sends contextual information—like components, styles, and variables—to your AI agent. If those elements are mapped to code via Code Connect and variable code syntax, the agent can pull from real code resources. If not, the server still provides styling context, helping the agent write design-informed code from scratch.

And now, with the addition of [automated design system rule generation](https://youtu.be/qLyv9UO51bI?t=1380), the MCP server can scan your codebase and output a structured rules file—outlining token definitions, component libraries, style hierarchies, and naming conventions. This file acts as a system-level guide for the agent, reducing ambiguity and ensuring generated code adheres to your team’s standards. Instead of prompting AI tools with every little detail—spacing, tokens, naming conventions—developers can focus on building, while AI fills in the blanks with system-informed defaults.

Annotations are additional pieces of context that the Figma MCP server provides to your AI agents. Teams who use annotations to add context about accessibility, interaction behavior, or even content will see that information be reflected in their design-informed codegen.

## [Building better design systems](#building-better-design-systems)

Figma’s MCP server doesn’t just help developers write better code—it unlocks powerful new ways for design systems teams to build, manage, and evolve their systems, with AI as a partner. It can help teams use agents to:

### [1\. Generate component code that’s in line with company standards](#_1-generate-component-code-that-s-in-line-with)

Above all, the Figma MCP server helps AI agent output adhere to your team’s existing patterns. They can:

-   Combine MCP context for a new component design with the code of existing components to implement the new component code in a way that is aligned with established standards.
-   Generate code that matches the languages and frameworks that your teams are using, instead of being limited to the default output of React and Tailwind.

This context not only accelerates component creation and revision, but also underscores the importance of workflows that enhance design and code alignment.

### [2\. Automate design token work](#_2-automate-design-token-work)

With the Figma MCP server, AI agents can identify where to apply—or introduce—design tokens. They can:

-   Suggest where to use design tokens in cases where they are not already applied.
-   Use context from designs and the codebase to make sure that design tokens created comply with the standards you’ve already defined.
-   Help you write scripts and automations using the [plugin](https://www.figma.com/plugin-docs/) and [REST API](https://www.figma.com/developers/api#variables) to build out better design token workflows for your teams.

Whether you're just getting started with tokens or refining a mature system, the Figma MCP server can help accelerate token adoption and usage both in design and code.

### [3\. Audit and improve alignment](#_3-audit-and-improve-alignment)

Part of maintaining an effective design system is ensuring alignment between design and code. With the Figma MCP server, an AI agent can use design context to help audit differences between your designs and codebase. They can:

-   Audit usage of design tokens in code compared to the selected design and vice versa.
-   Flag how to improve layer names to better align Figma components with code components.
-   Suggest improvements to Figma props for better alignment with code.
-   Make your code responsive and identify potential issues in the design earlier.

Here's how you can utilize the Figma MCP server to help AI agents generate suggestions for prop alignment between design and code:

If you’ve already set up Code Connect, you’ll get generated code that matches your existing patterns and designs even more closely. For those just starting to implement Code Connect, the Figma MCP server can help make that onboarding process smoother by providing more structure and suggestions upfront.

## [Looking ahead](#looking-ahead)

We’re only scratching the surface of what’s possible when design systems and AI work together. This isn’t just a shift in tooling—it’s a shift in how we build. By embedding systems-level thinking into our AI workflows, we can empower teams to move faster on the redundant work, opening up more space for teams to focus on building thoughtful, beautifully designed products that people love.