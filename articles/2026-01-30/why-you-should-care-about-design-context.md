---
title: "Why you should care about design context"
source: "https://www.figma.com/blog/why-you-should-care-about-design-context/"
publishedDate: "2025-09-24"
category: "design"
feedName: "Figma Blog"
---

September 24, 2025

![Abstract digital artwork with bold blocks of blue, green, and red forming organic shapes within a grid.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAAClklEQVR4nAXB6U7aAAAA4D7ZlmVZNrNsggcgzJaCgAgUBAGhHE6UQw65ylkotCBtOVQOLxARh9vQmCUuc0eWObPs395h3wd8cc7drImbkdUomfLSVCtkedBy7nXcZgDdIvJlt22kmo+7PGCmrY6SVcPSd/6zH4LnVYtGhePAzbr4dhXsrpmyMSyQI3ZC3r5TfepQMR53NIalvHbaoAs6QvJYBQnhGb2lsyAaQty+HIx47MBBXHcU0MaxpInoaqmBmTywkWWUJC34rh0rWxObOswnC9cEsa4g0lkIFFQR1OeS9hS8HiIAPnrgo4DKSVEQ+wlkb8W1MVx/D9VHcOVSk2siJR9Yd89SLCd98TrVmyzi3LpVQyhZ69xgmQvcWflXKBhMRmRMV1w7k7KnMvoCZs6l5YEO39MX4nI6BJWTwlyJn8vz6XX+rn4lq21YwaF+GmiFTSNUmfaHtFRV0aBU7I66tC+n95ZKdWuiiEYzSKK4mCzIYnk4nhMV/ULa4fDbjjULfYMIIHDfybo5HiRUO8eyfVrRqCjopoTpysuHxmzJlCAW0yycqYFYWxjt8TIVHrmNej0trZp1KoG+T/MOVYdiaUmjDe4fiutDqHr5pjaEmIEm30YydZBiBDQxQ7Q4qdFktsPJl42+4MmS5AKZBa42oBsznA1tGKkcQu2pqHM1eaqlaEMx9zaef7uN69OYGo8osLIkvCvZZqRB2m33jcHZX3NPgQ9u+G5FeIYizKYD9we96UIsHKs7DR1UcWDRHBo1LYOSMRlStk3M5ioum0md+Ugm/zk98VvwBLiz8u6102NUduLSVQKurRxBBje+LU79gV7cIvzPat6DaOJaJqScVnZVdy2eGsunvs6//Pfq0d+Zx/8Bi2xqMhkGG/QAAAAASUVORK5CYII=)![Abstract digital artwork with bold blocks of blue, green, and red forming organic shapes within a grid.](https://cdn.sanity.io/images/599r6htc/regionalized/9bad32f11ca223cf75e1285e2c55afe43518bfd6-1632x918.png?w=1632&h=918&q=75&fit=max&auto=format)

As developers increasingly use agentic coding tools, the structure and clarity of design files matters more than ever. By thoughtfully organizing your work, you can help your developer counterparts build more efficiently and accurately.

Hero illustration by Cynthia Alfonso

Landing on a clear design direction takes time and attention to detail, but it’s just one piece of the bigger picture. That same level of care should extend to the handoff process. Now, as more developers use [Figma’s Dev Mode MCP server](https://www.figma.com/blog/introducing-figmas-dev-mode-mcp-server/)

to bring

[design context

![Illustration showing a UI component called Card connected to code with import statements and a visual preview.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC0klEQVR4nHWQ208TCRSH+VNKW2ZKWyiUDrgbxWhQ4ya7xmeNS0z2YX1xEyNBkZuiAu0SlfWGiuzQlouxlBbqCkoQUKgVLyi9zCjxwdXEpLsg0Iovn5mBxCcfvvxykpMvv3Nyvqgy2YSPzLyPxdlbvI2M8cr3mJdyjLkNlNuTpKMDaLtfXsvr+R1yPqe6WXnZy6dnfXx8GOKVP8ZUm8qEe4FJzwKT7gWeXJ3j/ViEbMLLmiKzpnTrfE7JrKVkPXUUTZj06sLluT4WZwO8uz+KGpxEHZhCDT7UU2udjgbJxP1kEn4ycd86CR9Zbd4gm/STo527Gu9nVQmypA7xX3KIdGKYdFwjQjoR4f9UhE9qhOU3EVYXhsm+CZJ5HWBZDbGkhFnUUMMsqWFyskkvq6kBPir3efFkhOmpIaLTw8Si/xCbucvM9B1mHt3R83F0lPiLcT6k7vLvfJhnM2EejAUYHwswMR5k4sGgJvSxkhpEeT5K7+1eLnVe57pXpquvhxs+Hy3nz1FdX09VXS3VDY00e1r5+5qbm5dPc/LUCQ4fPcLhqiP8UX1UZ0MYIj47QlePTNuVy1y41sFfHVf5s/0Cvx36nW0VFZRv2872HTvZtXs3e3/5iT0/76JiRwVbtm5lc3k5ZZt/pOSHsvWTV5QQyef36An067LWNg8tZ0/ibmmi8uBBSsvKKC524pIkJEliU6mLUsmJ01lMocOBvaAA0ZqPWRQ2GiqDJJ6O0N3vp7W9ndq6Ws7UH+Oc+wy/VlZS6ChCtFjIt1mx5FuwWEREUSDPnIfJaMZoNGHIzcVgMHz7YTwWoUvupKm5hRM1NXiaGrnoaebA/n1YCwoxiiImq0BuvgmDaCbXbCbPlIdgEhGNGgKCUW/oZSUVZH46RGfHJRrqGzleVUVzXQ3nTzdQuX8fRdImBIcD0WVDKLUiSDbEIjs2uwOH3UmJvQTJ5sJlK+ErLoBgA2lnQFsAAAAASUVORK5CYII=)![Illustration showing a UI component called Card connected to code with import statements and a visual preview.](https://cdn.sanity.io/images/599r6htc/regionalized/de69a4c6d25a647e3e05f1161324998aefb1cc2d-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)

### Design context, everywhere you build

Our latest updates to the Figma MCP server and Code Connect bring Figma design context anywhere you work.



](https://www.figma.com/blog/design-context-everywhere-you-build/)

into agentic coding tools, designers play a bigger role in making that process smoother. The clearer your files, the better these tools can interpret and translate your work into accurate code. Here, we’re sharing three best practices to give developers—and the AI agents they use—the context they need to go from design to production.

## [1\. Invest in foundations](#_1-invest-in-foundations)

We’ve long talked about the importance of [building a design system](https://www.figma.com/blog/design-systems/). Components and variables for color, sizing, spacing, and typography create repeatable patterns that save time and ensure consistency at scale. But to unlock even more efficiencies, you need to link these foundations directly to code. Figma’s documentation capabilities like [Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect) and [code syntax](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables-and-collections#code_syntax) help bring that codebase context into Figma. Code Connect links components to their coded counterparts and surfaces accurate snippets in Dev Mode, while code syntax defines how variables should be written across web and native codebases.

[![Abstract geometric artwork in yellow, green, blue, and black](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAADDElEQVR4nCXSXU+bBQCG4f4FXcpYNWMkujZZNNEYoNDPEYjAGEJLWUs73pbSvi2ltLQU2sIWDVBkQF3p3ITF42XGEU02zDwAuhVkGo3TRJehBsYKMmRM2PFtKgfX6Z08ySOJp2tZuKdm/Y8ynqyWsvZbCb//9B5ffV1OdMSI3dpNe30MtyGE2+/AMtqGMemgOdlOS8qJOe3EOWEjfKEBT7gGSf/lOhYWtWyvl7O3eejZEyXZrIaPkg4EVxrB8gWuts/xhiMICTvGMTuNH9sxXHJgmhSxTgQRhtycizYjiSTrmZ/Xs7OuZn9Lw8G2hheban5YOc1wyofTP0uH+2dCnm8Z8/URFt+n2qKnpFmH0lxNjejFGp2hNZ7mbMSDJHb5A5ayVTzP6dnf0vPvpp6dNS33Fyv5MNmNu2cOj3+VQX+W6+1hwlXv8LaiCFnxcU6clFOmE7AItxA6b2Lw9yDp/6SRTKaafzYOg3m7T3WsLFcxnA7iidylM/QXF4PLTNvDuJWnKJYVcKSggMJjMt6Uq9Fqe2gy9GIRbfngWRbmT7OzpmJ/U8X+lpq9XH5yJYlPA3j67uIN/smF7izTbQFcZQqKZFJelUopOHoU2etvoFBUUKmrwuqsRTIwVcfykoa9XBkHfx/a3ShlKathaKoLMTyH6HvMgPc+V20hXCWnKCqU8soRKYWFr3FSrkGjDtDUFMLqMSOJpurIZDTsbpRzsJ2n5HlOyYPvtIxcyQdv4/Y+Iu5Z5Lo9RLjyXd6SF3HsxHGK5QrK9Q4swpfYfTdo6QkgiaXOcC+jY/epipfbKl4+U/EiV8H3KzpGrvjoCN7C6fqRkPgN4/4++jtrqLHqKTXpqbBUUefxcD52DdvgFI1REUlksoE7c/U8etjE6q9GHj808MuDBmZnz9CfcCG4pxBab+ASZvBFenGOCZwbF/7/onFMwHSpA9t4F/ZhF+a4CYk9ZmRoVGT66kVmriX4LD1ManyQ+ICIIyAgWLpw1vciGvyIvvNYE62YJgVME4daJttwjJoJDdTj7a3lPwY+EGeML6SRAAAAAElFTkSuQmCC)![Abstract geometric artwork in yellow, green, blue, and black](https://cdn.sanity.io/images/599r6htc/regionalized/a2f802412d2021361dcf69062446985e12c73135-2664x1498.png?w=2664&h=1498&q=75&fit=max&auto=format)](https://www.figma.com/blog/design-systems/)

[Learn more](https://www.figma.com/blog/design-systems/) about building, scaling, and maintaining a successful design system.

With [Figma’s Dev Mode MCP server,](https://www.figma.com/blog/design-systems-ai-mcp/)

AI agents can access this additional context in Figma to generate more accurate code. For example, when a card component in your design system connects to code and uses shared variables for spacing, color, and typography, the MCP server can give an AI agent the exact context it needs to generate that card in production-ready code. Instead of searching across your entire codebase to find the right pieces, AI agents can pull them directly and generate code faster, saving time for developers and improving accuracy. And, because the context is built into your Figma libraries, the benefits scale across your organization so that anyone creating new UIs gets the right code context automatically.

![Figma showing variable code syntax in the Edit variable menu and in Dev Mode.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAACxLAAAsSwGlPZapAAAC10lEQVR4nJWSS2/TQBSF/YMa2+Px2I5fcRzStHEebhHiUUSSliZtiqqibhpIJVoJaEMECIEorLroFlIhsQLBggqpS9L+HMsHzaTisYPFkX3vXH1z5sxIO+/eYW0wQKPXm+heD83793Cr18Otra2/xNdb9/tY6m9jsd9Hq9/H4vY27r58iSdfvqavx+NE4kW90YBfLMItFOAXp5EvVxDMVuBPl+GXyghmIiG/FCGYraIQ1VGIamIuH9Vwbf0udo8/pAc/xol0ZzjEdByDahpUVYXOTLjBDPywBjsXIeuX4eYr8PLVizqCx+swgu3PwPJnES0sYePVQbr/6XMirQ2HKNbr0DQNiqpCowy2W4AbzCLrTcN0LsHJleDly7D9kqizXhGOX4TlhjDtEE44g2qjla483kuk1cEAhUoFqqJgKpOBLMuglIEZJgjRQAhF1nbguB503YCiEqhEA9V1IcYMUEphB0F6ZbWbSKv7+wKocODUFDKZjHDLdF1EQFQVruPA81wwpkNRZCiyMlkjRMA0QmB5Xjrf7iRSlzusVv8AygKo/wIqcC0TnmPDNLlrImZ5PPxf06iYMx0nnWu3J8BLtZpo8uPKmczFoCZqVZ6CQ2V4pg6DMREN73Mgd2dZFnRKBTBebifS2pMhinEMnTFoVAfh7gwDpmWBMgaqETiMwM0aMLjDi8sTL0LXfwNdN425w63DQ9zY3ESt2US1MVG8uITLy8uYW7qNerOJuNXA3GIL9VYL0cIC/FJJbCZOQnk0BIbrpfOdTiI9/XaChx8/Ymc0woP3E+2MjrF7fCy+oj/ivYl6R0e4vrGBrO+DaBTUMKExA9kgTOdXVhLpzdkZDsbjfxKffXZyguXdXXhhOHk2pinc2kE+ne9cAP9JHHh+juffv2Nlbw9hpQLb9+HkcvxCeAzp1fX1/wBynZ/jxekpNt+8xZVuV+TOM45u3sRcu512Hj1KfgLCpExhJJMAdQAAAABJRU5ErkJggg==)![Figma showing variable code syntax in the Edit variable menu and in Dev Mode.](https://cdn.sanity.io/images/599r6htc/regionalized/1471864f1e46a385c12ab60066621c8d6e71a1ad-4076x2928.png?rect=2,0,4073,2928&w=804&h=578&q=75&fit=max&auto=format)

Variable code syntax gives both designers and AI coding tools a clear source of truth for colors, typography, and states.

![Figma showing a component playground with editable props and connected React code.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAACXBIWXMAACxLAAAsSwGlPZapAAADCUlEQVR4nJ2V204aURSG54WAmT0nRrBaztRWyyDQBDAl1fRCk5qotVZDFInVEKtpqiIm9VQTjRq4Mt565QVa0CdQE5/jb/YeQKpQay++LGaz55u11qzJ5rIXF6hRLt/9fipl417uweJTaCDmvp2eYvb4GOlCAdP5PKYODzF5cPDv7Btx5ugI1MVNFwp4NzGB7t5e6IkEunp60BmPN+VVhZexGDqi0Ro9o6NI5fPgxre30RWLQWtpgaZpsFqtUP+CoqqQFQVEJCCKBNGqgBcJfKEQxjY3wY1vbaEzGmUiq6oasQmqqkKRZRAiwGwxQ5BFyJoKIorwdnfj08ZGnVDTWIbNqAplWQYv8DCZTBAIMbJWFLyIRDB2X8gyUFRWFt1Uha5XodeCIDAhEQiriq4bwrqS7XY7nI7n8Hrc8Ho98Pl8DL/PB4/Hg7a2ZyxLmiEhBBaLBTzPQxJFiKLIevhHyR0v/PjwPoHkUD9SyXEsLCxgeXkF2WwWmUwGicRbtLa2MiEVUKHZbAYRBPYA2sPR9XVwnzc32Vt+Ew5jfmoMucwk9n6uo1wu4/r6Bre3tyiVSkhPT8PhcECSJCagMiqVJIk9hGVIhTRDJoxE8CU1ifm5GWxt/ECp9AtXV9e4ublBsVhEKpWqCVmGfKVkSWRCfyh8J6Ql+/1+9PX1YWBgACMjw5ibncXiwiIrPZ1OIx6Psz7Tm+WKlGYqCDyLPiqs76HNZkN7exvLwuF0wOVywe1ys+h0Oln/6EthJUoyFEUDkZRaLz3BoNHD+sFmY3FvZO6PDRXS0bK22EFkFSazhY2QW9cfCutpOtiSxKLVZoeoqDDz9KuxwK03yPAxDCEtV4GqtUBSVQhEAi8QeLpDhnByfx/RwUH4g8HH0XV4AwH4Ajq8ehCegA5312u4OjsR7u9Hcm8P3NeTEyR3d/Exl2vM2ppB5XqEslqJuRyGs6sYymYxsbOD+ZMTcCulEpbOz/G9WGzI0tkZ48F6hfp9K+Vy3RFwedmQ1Qp3a8be6nrt/+oR8N+HUhN+Axqy+bA4PZ3eAAAAAElFTkSuQmCC)![Figma showing a component playground with editable props and connected React code.](https://cdn.sanity.io/images/599r6htc/regionalized/8915051fd1a55f9823888fbd0543d10d40ffbdfd-3360x3676.png?rect=1,0,3359,3676&w=804&h=880&q=75&fit=max&auto=format)

Code Connect links Figma components to code components, documenting how variants and properties map between them.

## [2\. Structure your files for dev consumption](#_2-structure-your-files-for-dev-consumption)

Taking time to set up page hierarchies and name each frame and layers can feel tedious, but getting the file structure right is well worth the effort. Being intentional about layouts, naming, and hierarchy not only helps while you’re designing, but also translates to helpful context for MCP and developers.

Here are some key tips to keep in mind when structuring your files:

-   **Create frames** **for different breakpoints**. Create frames for different breakpoints. Adding frames for major visual differences—for example, if you’re collapsing a navigation bar into a menu icon—helps make responsive behavior explicit.
-   [**Leverage auto layout**](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout). Auto layout helps define how designs will respond to different viewpoint widths, breakpoints, and additional text. Whenever possible, apply auto layout to vertical lists, horizontal rows, and grid layouts. For items that need to break the flow, you can [set layers to ignore auto layout](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout#ignore) and [apply resizing constraints](https://help.figma.com/hc/en-us/articles/360039957734-Apply-constraints-to-define-how-layers-resize) to them.
-   **Keep layer structures clean.** Layer hygiene helps maintain a clear hierarchy, and avoiding unnecessary groups or frames makes your files easier to navigate.
-   **Name your layers.** Layers help AI and developers understand what each element represents. When layer names are unclear, AI is more likely to misinterpret the design, creating downstream problems for developers. Clear naming allows AI agents to generate code with more accuracy—for example, calling something a “card,” “row,” or “avatar” is more useful than “Frame 1337.” If you’re short on time, [Figma’s AI layer renaming](https://help.figma.com/hc/en-us/articles/24004711129879-Rename-layers-with-AI) can help you rename layers in a matter of seconds.

![Comparison of poor, good, and best layer naming and structure in Figma.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAACxLAAAsSwGlPZapAAACZ0lEQVR4nIWUeVPTYBCH+f5fgFNhFIQWLFgBOcXxKCMIaJOQNk2T9C5pm6PN1cLM4yQcdkSnf/xm3mw2z252992pGUHgmUSRuQfNjmlOEJ7Osc+/vp362zAvSaxIEikhz7ogkFWuOdBljioqR9UKR9Uq+9UqG6rKgiRNBi5KEhsXF6SOD8l8OuF74RcVs0jLatDuO5i+T93zOG21eCXLTE8CLokiqS+fWVpZZnU9zY+rS0yzhmN3GAz6DEcjvNGIn50Oy4XCZOCiILCWy/Em85b01ia5yyu0dpt6r0fLcej4Ps1JGU7n88w8aEEUWc7nWTs/J3V2RlYSOdR1jisVPtZqnNRqSR0zqsqL/9XwpSiyKstsKEriuFUus66USMkyGUUhWy7zXtN4p2mkFYV0sUimVGJTVRP/dKnE0vX1PTAejS1V5bLZpGiaqJaFYtuctdt8rdeRbm7QbBvDdSlaFrlmk9NGg0Kng+64GP0+QrdLVtOSMUuAB5UKDceh73n4YchgOKTsOBR6PXqeRxCGSTOcKKJgWUlQ1/OJohGj2zvMIOCwWv0DjB+ajoPneUTDIf5ohO66SaaW7+P7fmJ3o4iibaM5DgM/IAoibm/v6AYhR7Ua84/AbU1DMk2MXo+661IdDMh3u1xbFnYYEgQBw3Gg6zAIQ6Jw+BwYF/K1LCd13C6X2dV1dnSdrK7zrdWi4rpJ9rHi86VpJsHq/T5td8BN36NsO+waxv0vx8BZQXi6u4+Kr1XcvT3DYF/X2dM0Puh6MgFxt/cNgwP9/t2OprFSLCacZ4M9rmQhjC+GseUwHjyxP8zhb+GDx6rW+iuzAAAAAElFTkSuQmCC)![Comparison of poor, good, and best layer naming and structure in Figma.](https://cdn.sanity.io/images/599r6htc/regionalized/1ba23241044016c819749e40f4f8e00ea5fef67e-6720x4540.png?rect=0,1,6720,4539&w=804&h=543&q=75&fit=max&auto=format)

An intended card design with three different approaches to structuring and naming its layers

In the image above, the file labeled “poor” is most likely to confuse AI agents when they generate code because it lacks meaningful names and a clear hierarchy of elements. The middle image is an improvement, with helpful layer names and the use of auto layout to define spatial relationships, which makes it easier for AI agents to generate quality code. Still, the structure creates variability in the output. The “best” example shows a well-organized file with clear naming, logical structure, and reusable patterns. With this setup, AI agents generate quality code that pulls directly from your codebase’s components and variables, resulting in more precise outputs.

Communicating interactive elements of your design is just as important as communicating static ones. Adding annotations to capture desired functionality gives AI agents the context to understand not only what something should look like, but also how it should behave. Clear notes on states, transitions, and dynamic content reduce guesswork and bring the output closer to your intent on the first pass.

![Mobile app dashboard mockup with content, interaction, and development annotations.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABrElEQVR4nJ3S/08ScRzHcf/R1ubvpW5t9hM1fzAr+yaWwtDZRv1QMHSlOCi8MVYKns37HANsnAfjjgNOuFMRjn54ttFv1ib0w+uX996vxw/vvSdWheB6AkIQEoJYqUi2opO3TPJ1g31dI1YsEhLqcOdf3YnrgzfyIc9SSRZ3d4jJOcqWSefCxblwqdgNklqZ9XyegDoiuPQ9gy+8wezKMuFEknK1zrnj0L80sJ1TUlqJwNERy7LMyvHxzeBr+ZCnyQRP4ttEsjLKzyaVqond/IbRkNjMScx9jDK3ucXSwf7N4DCKwpoq2DnRkLUzChWTauOAcl0ivBvhzqMFpvx+FiVpRFCI4Z0Smk7JalOzOzTPa5w2CqxH33F76i6TPh8LicR4YErXqXcculdX9LwetabFWiTKrekZJh88/D+w4XTwvD6DwS+MVpv3X1LMvHzFvWCQ5+n0mGBFx3IdPM9jMBhg2i0+pPeYDa5y/+0GLzKZ8cCvuo7hdOj2e1z2u1TPLLZ+5Hj8+RPz8Tj+bHZ0MKSqxDWNUquJ4TrU3DYF22S7fEJIKH9+UFH+An8DFdvTH0dUnWcAAAAASUVORK5CYII=)![Mobile app dashboard mockup with content, interaction, and development annotations.](https://cdn.sanity.io/images/599r6htc/regionalized/94b9acd3f51afb12178118821e94e6e402b2c90e-1680x919.png?rect=1,0,1679,919&w=804&h=440&q=75&fit=max&auto=format)

Marking up functionality and interaction details helps ensure your design translates correctly in code.

Consider writing annotations if your design leverages:

-   **Interactive elements:** Describe moments of interactivity on click or hover, or if a specific cursor should be used.
-   **Conditional states:** Call out scenarios when a state change is caused by a user action, or a certain condition. For example, a "submit" button is disabled until the required fields are validated.
-   **Dynamic content**: If your design contains static placeholder content that’s meant to be dynamic, provide instructions to pull from a data source.

When functionality is documented as clearly as visuals, you set MCP up to generate code that brings your full design intent to life.

Ultimately, taking steps to add design system context, structure, naming, and clearly written annotations is invaluable—not only for improving developer understanding, but also for providing the right context to agentic coding tools. Even when working with these agentic coding tools, clear communication between designers and developers is essential for alignment and clarity.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYHBQj/xAAjEAACAQQBBAMBAAAAAAAAAAABAgMABAUGEQcSMVETIXFh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKSLeNfsIYbLXA73c0nhowAOfdcnqHsuSh12S0yqCISIe1oyGDfw+qidP03NZS8gv8ZbO8UT8l3PC1oG4aZnNk1+O0s4FV4XLOrHgn8NBlepb9Lr+GSwjx8M6ozN3t5PNKn8tg7zD5CaxvYniniPDKw+6UHrXpZGsWm41UAAZO4/tV/gHilKDGeq2JtLnavmlj5keBCT7+zSlKD/2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/8e5d8fe1d2473a140601b8274a63ad67b3a075be-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Thomas Lowry works on advocacy at Figma. He is a digital designer, and also likes front-end development, cycling, and woodworking.

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)