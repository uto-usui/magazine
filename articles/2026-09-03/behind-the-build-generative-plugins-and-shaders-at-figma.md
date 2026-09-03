---
title: "Behind the build: Generative plugins and shaders at Figma"
source: "https://www.figma.com/blog/how-we-built-generative-plugins-and-shaders/"
publishedDate: "2026-09-01"
category: "design"
feedName: "Figma Blog"
---

We brought [generative plugins and shaders](https://www.figma.com/blog/agent-custom-tools-context-skills/#build-your-own-tools)

to the canvas because we wanted to give you a way to design the tools you need, when you need them, whether it’s a way to generate layouts or add a lens distortion. Since Config 2026, we’ve been hard at work extending these capabilities, and we’re thrilled to share these updates with you today:

-   **Community and internal publishing:** Publish [plugins](https://help.figma.com/hc/en-us/articles/43029200314135) and [shaders](https://help.figma.com/hc/en-us/articles/43029251008663) that you’ve created with the Figma design agent to the Figma Community, or [privately to your organization](https://help.figma.com/hc/en-us/articles/360052679454) if you’re on an Organization or Enterprise plan.
-   **Animated and interactive shaders:** The agent can now build [motion and interactivity](https://help.figma.com/hc/en-us/articles/41147702210071) into any effect you describe.
-   **Code access:** [View and download the code](https://help.figma.com/hc/en-us/articles/43029371170071) behind any shader or plugins you’ve created, so you can edit the code directly in a third-party agent.
-   **MCP updates:** Use the [Figma MCP server
    
    ![Abstract illustration of interlocking organic shapes in purple and orange on a dark green background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACgUlEQVR4nAXBWU/aAAAA4P66PexhybLELdNQSu+Llra0peWoiBxyFSYgcgiJIqYcikMc4jXFTTc1y5wzLnNmiXF73D/Y9wGUveQCOzxoiXAkRTNpUnZjokG684wcIzQDzkbQhELAKvM0zxJhpOxFqjk+GGaVScQGCGBLBfc0+0EKW9oThRMZaogv3yqvP3vQLhdMOLoJRzdL+ir8VIvTTLSTwDttd6bIxylUAyT7hgYe+cEPRax1Jct//BOX+sRX79SdFxvyqXnHu7xjYNGmxYarRD3qGKXwviVWis66glYBFWrp9n2ffZxFNsdC6F5Dvyiuc1k9l7Sh0+zR5SGTP+Lia1Q1Cu14weMZZGRSvTi5ESHqwDxZmHUMvOA4Ao0sqjJ2hU7FwDdFvJA8Z8L0ncI/eshfsrDvTJRRKwkP0ljPJDfniF6aKgPbkrpANGLwsIC3B3zmUIiO3cZ9ALnVmWtF+qsjDyp5JXjOucApFzzkYoditC9m8/RaBFsBthWhyRc2xfkzzffDz5yoxpaYuvZzj0H7owHd68wOay6jKyMqfSvyN7Jwo4mXur7iLEeQBpBj401X7iogPcyCtwa1LmZy1GpfSv6eRv6FXnzXnHWsmbTtruOVj9zMFmu+dwdv/K6hNJfElwAZbtbY6oVXHWuenmDW2HKMqBfo6ieP/NN4fizTJaSVsh108doek14miy3BuPDx+8pskiwDTsgq0NWe5MmwoTdUzuJDaToWwettIdBWni1ycNqxGrftNvDSMa+1WC3D6BVnusQs+bBFgIAqcco0OYQlJ6MsuibhYSqso7UM6/FyT3jqVQBeMMANE0/1BWiZgxUsJMNNHek44cJ/7udjylpPwXAAAAAASUVORK5CYII=)![Abstract illustration of interlocking organic shapes in purple and orange on a dark green background.](https://cdn.sanity.io/images/599r6htc/regionalized/35f6fde4ce9f85257cecfcb6af666932842ab4af-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)
    
    ### The TL;DR on MCP: Why context matters and how to put it to work
    
    Figma’s MCP server brings your design decisions into the tools where code gets written—so what gets built actually matches what was designed. Here’s what that unlocks for everyone who builds products.
    
    
    
    ](https://www.figma.com/blog/the-tldr-on-mcp/)to [view and change generative plugins and shaders with your agent](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/), or export shaders to an agent that implements them precisely in React code.

These updates are a microcosm of what it’s like to build now: in collaboration with AI, moving fluidly between design and code, and together on the canvas. I want to share the story of how we launched generative plugins and shaders because building and shipping this vision can teach us something about where design is now. Here’s how we got the idea off the ground, brought the right team together, and made something bigger than any of us could have managed alone.

## [Vibe coding with a vision](#vibe-coding-with-a-vision)

I’ve been obsessed with bringing the power of shaders to Figma for years now. But it wasn’t until recently that LLMs made it easier to show (and not just “tell”) my vision. To start, I vibe coded a WebGPU environment that behaved like Figma, where you could add shader effects to any layer on the canvas, including vectors, 3D layers, and even [particle systems](https://en.wikipedia.org/wiki/Particle_system). I focused on building three key things:

-   **Composability**, so one shader’s output feeds the next
-   **Editor ergonomics**, so you can touch and feel the design with dynamically generated controls in a way that simple prompting doesn’t allow
-   **Agentic creation**, so LLMs can suggest controls you can tinker with

While it had taken us months to build [progressive blur in Figma Draw](https://www.figma.com/blog/introducing-figma-draw/#freedom-for-creative-expression)

, I could now create the same shader effect with one simple prompt—maybe two to nail it. I needed to give this project legs, but I couldn’t just record a Loom, throw it into Slack, and hope for the best. We still needed to have a compelling story, pitch, and team to build it.

Slide 1 of 4

A 3D embedded object with 2D post-processing fluid displacement shaders

## [Assembling the right team](#assembling-the-right-team)

I turned to Yassir Solomah, a rendering and animation engineer, with my questions: Would this really work? Was I approaching it in the right way? Would this tank performance in Figma? After all, a vibe-coded approximation of a WebGPU canvas app is nowhere near the enterprise-scale, tile-rendered real thing. (Try making a performant infinite canvas. [It’s deceptively challenging](https://www.figma.com/blog/building-a-professional-design-tool-on-the-web/)

.)

Thankfully, Yassir was in. We ripped out my WebGL 2 fragment shader system and replaced it with a WebGPU pipeline system, so shaders could become miniature programs: rendering 3D objects, and applying logic based on mouse position and time in order to control visuals within layers. With this architecture, we could isolate graphics generation scripts in their own sandboxes, while leveraging the full power of WebGPU. This meant safer user-run scripts, logic, particle systems, compute shaders, 3D support, and more.

Yassir validated my prototype by producing working versions of it in Figma Design. That’s when Georgia Rust, a product manager, caught wind of our idea. She has a bird’s eye view of what’s happening at Figma, so she knew how to tie our efforts into what other teams were building and get us the resources we needed to make this happen. For example, Product Designer Jason Calleiro was sharing prototypes of adaptive and generative plugins in Figma Design around the same time. Georgia encouraged us to combine forces under the umbrella of generative tools: a suite of ways to use agents on the canvas to create custom plugins _and_ shaders on the fly.

![A slide showing “the big picture” with examples of expressive work](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC9klEQVQokW3PaU+bBQDA8edLGV+Y6RKNsriYzS1bcCOSTcZSo1yFtkO20NJydV2hFTkUs6QTytVNC67AOrAwIcFBGRQ5+pRS1tL7WLuWrt3fOPWdL34f4Cf8Ea1iwSdh3lPJvOc6iz4JzkQNe4UG3EXZP17LcPOfhn/J/occYT2hYNmnwLErw75Vy+RTCba1r3BsS3myV8+yV4YreRPxlRpPoZX9Qiueoob9YgveooaDYusb3mIL+69vIYjpHtbFAVY2vmdh1ch3plrkqi+QKyUomr+krase62Iv64Ff2Y3bCbycI5x/ROj4AbGclWTW9kb02EKg0IPgid5jbvpbpkf12KYGUDRL+fDTUk5+con3Sso4X1pN14/jzDg9rB2ECadipLNHpDIusi+2yCXc5BIimfQq4fwwghgYYtqsxdavwTbRR428lndKzvN2yQXeOlHKx6erMQzc58mmn53nKSKpLIlMgmTaTSy0iXtzBe/OOvH4KsHjUYQ/fYNYTCpGDU1MmHVIG2v44NRlTn5Uxol3P+fCGSlDQxN4fB5CsTDhZIJgKkg4tcXG1jzmnwb5xTKE6PuNw9wIwuNnTWiNFahUFXT1KVB2NvB1VRUVlRLKr1xDLpcx83iMUHSXZNpPKOrFK64gumdxLFrQa1voua3G6XyAP2tGMM1c5VrdacorP+Om+gZ6QwddOg1q5Q2UzTIMPSoWln8mljjkOJ8ienTAxtwkzrl7/O4YZ9DYSV97M0+XzARfDiP0WS5zrux9zp67SGOjEu2dXtr1/ag6jKja9dzWd2CdGsF/6OVVPk8mmWJ/Yw3xmR1x28Hs5AhW8112XDYif5fv2sq5UnWKS1cvIlM18o2uHanBSHXvD9R1d3NL18TwhIEd9xLpnJ9s4YhEZpf4ixWi8SW29x7hcs1yFJknlDchPNy8zh1TKZr+cnQjdehHpWjvN9Fm66RjSk2/tR77WhtibIxIYZYYdiLFh4QL44RzYwRS4wSSFoJZM88L3fwFPeKoHQIMN/YAAAAASUVORK5CYII=)![A slide showing “the big picture” with examples of expressive work](https://cdn.sanity.io/images/599r6htc/regionalized/27ed06910a01e869f2c51020118a4bf73be1750d-3840x2160.png?w=528&h=297&q=75&fit=max&auto=format)

Yassir, Georgia, and I painted a picture of what generative plugins and shaders could bring to Figma…

![A “How we get there slide” showing the core and XFN teams](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACXklEQVQokZWS70tTYRTH98dK5I/pmu66aYsppaVY9KJAjAKpXgQViiBqllKurO1u0+f+2HPvbS23dDp15tzSTT9xd4Mo6EUvvpyHw8OHcw4fX6YS4GPJz4ftLt5/62Kt0MH6jh9RDWKfKzj0/1d8iT0/q7nLLMtLLBptLJltvM23k6lcwWoqOBe/goJ94cV9/xMoqkHU/W4+lfzEC53EtzpRywHMWgi70Y/TDLciGwraSR96rQ/L7V+EcS7c+hfQPAuh1YKI4z4yO1FUOcrG5zGy3ybIFm9jFu8gd8cxyzdI5UZI2WOYxQms8jh2LYbTjPwB9Rn1XjJHATL7CkLeI708S2ZpHrE2i/j0DJF6giEfYn6eYjP+ksziAtrKAnp8DjP7CLk7gV2PeRO7wOxZCL0exDiOYDqTiJV5Nhdeo6/NkbUeIEvjWIc3sXbuYiSfe7DVBfR38+iJF5jyEXblJs65N6nP+OGtbFYjyPx9jPWZ1me3SmcS+2gYpzGArF1F7FxHK9zC3B7/nb1RZDWK3fTu6RNVd+UeRCWCIacQbxbRXq2iLS+jx2fIWlPY30cw6wqJvW7Wt/0kyz2kDwOkDry4Ruj13pZmPu04RHo/SLqkkLEn2FCnEepTROoxm+o0upzEroyS/dHfAr7NtbO21dF6uzB134NrJ70tzXyiMkiyMMi6o/DRiZLM3yCVv04qF0P9MoRWjmGfDmI1+1uyt6Y7CGDU+pCnCtnTEPI0hNVwHXW1qcYQe8OkC1ESX6Mki0OoxWsk8wMktsKI4zD2uXcfF+o6aDcUnF+9v138CRzyzAOwAOoJAAAAAElFTkSuQmCC)![A “How we get there slide” showing the core and XFN teams](https://cdn.sanity.io/images/599r6htc/regionalized/0ad12baead13fdfa255d7f525209cf54df01fc47-3840x2160.png?w=528&h=297&q=75&fit=max&auto=format)

…and what it would take to get there.

Over a few planning sessions, Georgia, Yassir, and I grew our idea from a handful of demos to a proper pitch that executives could believe in. I did a live demo of the ability to prompt shader effects with agents, complete with canvas handles and dynamic controls. Yassir backed it up with the core implementation, the security model, and how we’d maintain good performance. Georgia laid out what we’d build first, who we’d build it with, and where we could go next. Our pitch landed, and we were greenlit. The ship date? Config. We had two months to build it.

![A logo with a wrench with a lightning bolt handle ](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADLUlEQVQ4jW2U709bVRzG+RNsfUG2V8ZEg29NmGy+86VkxhiNC9MJEY1ZFmSgiUs2RciGOLN1OGBdAxTaewe9da1jpT/GqusWVxhQxqAFYsEJFdjK0ADtpZf2Y+4dtmndST45Nyc5z3m+9zzfU0TByGQy7ChpFFkhlUzlkBXkhMzy8l9MPZhkYWGBzc1NkskkiqJk9xflq0EykeCPpXnGIvcYnr7LyC7DU3f5bTyAa9BO35VO7tz5lZmZCFNTk8TjjzUjeYLqgpJSmI3O0j5g4Hjfp9RIldTYqvhcquKY+BF1l6s5ZzyBYDXgdjsZuGZHknoJhx+wvb2taWiC6kc6neaf9b/x+CW+bC+nqquEarGEaqGET8RXqDK/zGet+7hkqcXrMeFy9SLZOpBsRiYmRtnaSmgauw6fCv75MIpNPEV7Wwk9QjGCbS/W/j0I/XvoFYvpuPQSovVjxkashMYlbg514XGLzM1FkOUCh0lZJnQvQPfZd+k/XYzvgo4brXp8rXpt9hp0CKf30tv2PuOjFiZCdrweC8HgLeLxuGZI+4f/lRt/HMdnM2GuKcV1TIe/XsfNuqf46/V4a59DqH2Rn0xHGR0RGLxuQpJ6CIXG2NjYyN2yFpOdHaIzEcRvj9Nd/gID5Trcbz3P4EG9hvugHqlcj7HyVTxSE+FpBz6PCYulFZ/vOo8ereYLbm4lCA7d4vKRaqxlr3Ftf2k+ZaUIZfu48M7bSMbvmJ68ytioDafTRCAwxJMna7nYZNIZVpZXcRivYnizka79DQivN2E90JjFckBdb8LwRiMd9Wf4xdtJICASCLhZXHxIKpXKOVTLDUfm+P5MF3UV7ZyqEGg4fIVvKnI0HO7j60MCJ9+7yPmvmnHa2vD7HUR/n0OW5bzeKFIDGQzd54sfzRxq6eGD83Y+LOCIwU5Fi0jlyR9oPtuI02EmHL6vtV5mt9SsoGp3dn6BbvcNmh0umn/2PJMTZpGjTQ2cu9hCMHib9fX1bFTyBNUTthIJYqurzC/F/kdUZXGJ28FhOrs7GXQPsLKyrD0Ihe6yvaxlMZPR5mehOllbWyMSiRCLxfIuoXD8CzkqytLYIyLvAAAAAElFTkSuQmCC)![A logo with a wrench with a lightning bolt handle ](https://cdn.sanity.io/images/599r6htc/regionalized/c82227b98c4ff2112456906b26003ac56d98068a-2084x1578.png?w=2084&h=1578&q=75&fit=max&auto=format)

I designed an ’80s-inspired team logo that combined generative tools and effects—symbolized by the wrench and lightning bolt. The rainbow represents how prompting can feel like magic, and the forward slant speaks to momentum and acceleration.

## [Finding new ways to build](#finding-new-ways-to-build)

With such a short time to build, we went back to our roots: no PRDs, no crits, and leaning into prototyping and demos over formal reviews. Our engineers and designers joined one massive Slack channel, and every week we presented to core sponsors. As we started demoing in company meetings, we picked up momentum and our initial team of 15 people started to grow.

Generative plugins and shaders had shared infrastructure: promptable, dynamic, iterative code-backed things that would live in our new Tools sidebar. While plugins would use the existing plugin API, we wanted them to look and feel like Figma with the same patterns designers were used to. Shaders would need a new API entirely. So, I built [PropsKit](https://rog.ie/propskit), a [web components–based Figma UI kit](https://help.figma.com/hc/en-us/articles/41306719221143-PropsKit-component-playground) that agents could use.

![A Figma mockup showing someone choosing an iridescent shader fill](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsSAAALEgHS3X78AAAB5klEQVQ4jZWTz4sTMRTH+0d78yQiHvRURFAWBEWs6EUvelVQ9GCXrtIqdJUW2a1ddmeS9/JeMpnOV5L5weoq6OEDIZN88s3LmxERRWttY61FgoggIv+FijYishMRP2LmhpnRkxeo/l2gHd3YOsUZKayTLB31m51oFoUQMt77gTTf4uE7tBOWLmBjAgrOnmbUnqyDsKqqzC/CfpxkrAjkoa5dL74CSQBLG6wTptPaBFUVUcU4yJwTGGNhiSFOIVbgjQ5Cn24TQt4/CPsPGiqEuEOINUQ8bKk4Wp/gYLrA4vM3bE8JZSGwRkApUV+KriyDMCVJqWK9Q9w1iLEGkcdmzZi9XWJy/zmePH2J6cEh1qsCx1vCD8cglbYM3g+PNgjrukYDoGmaPGZSbL4T3r2fY3xnD9euj/F48gLzjyscbQpsrIEVHoQXEiYJzgk1XdkIpocL3Hg4xqXLV3D31gSLT0ucnhUojAE7bsv1L0JRD3IeX7ZL7L26h6u3b+LRg2f4ulzDWIK1BOfchb5NwqZvlyRKpJdm8SjI49icYH+1j9cf3mA2m2O7PQU7l0nCvkc7YZMaO7bS843sc19aTjgYa1CWZW4f5jZV/hm6hL1MRGISsojUaSIt+BNM3MIM14l+l6lqparmJ0lH387/TBzIAAAAAElFTkSuQmCC)![A Figma mockup showing someone choosing an iridescent shader fill](https://cdn.sanity.io/images/599r6htc/regionalized/1f132a2a5719d7cd574f9a17e4916d1420548f46-3252x2064.png?rect=0,1,3252,2063&w=804&h=510&q=75&fit=max&auto=format)

The canvas helped us gain alignment and refine visual craft.

![A Figma mockup showing someone choosing a dither effect](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsSAAALEgHS3X78AAAB+ElEQVQ4jZ2TPW8TQRCG/c/gBwQBaahoKGiQKGno8xMgfBgsU0FDGuoIJIRCRJ0qF/B9+GQ797G3O7N3Z++LZs9O7FMKRPFqb2dun52ZnRkopVqllDPGgIj+S0zsiGhFRHagtXZaYEYcBGb22jkgtptgTFCGkVUMZchDB93hTvJd17WXtRYsEpjtfNsSoCFCrhlpaf1KRG7Q3cYwa2DTNF4CJDKYLaYIfp8huDjDbD71Nn/ZGloZRmkY2gdFGFyHL0CLpmnRtK2PsigznP46xofxAUbvD3Byeoy8yDrYOlLbK5EHekddg+sGdbtC3QjQYj5L8eVojOdP7+PZk3s4+jxGnMRYXOZYZDmk9lbKsRWxB0oKElW7XKFduXWEFmmS4NPoEI/3b+PhnVsYvXmJ8/MAkzDGnyhBqdQ6fSlPD7hcLuEAOOfQXgFTfByN8Gj/Lh7s7WH4eogguEAYxQjjBKqqrh+QbwBiB1gjzwuc/PiJ4at3OHzxFt++fkcYRoiiCEmSoPpXoHyzrX2PXWYFomiKKEowm82Rpikmk4kHqquUdx/FbdpFQCJ56Yosssr6tmDumlimqSgKZFnmV9n3gE4au+2g1js3RdaGUFaEShsYo6G19gDt992Y9hpdJqUVoCaipRjkx40EIDXaltg24N4YSpYNM5d/Aeec1XNeoMEQAAAAAElFTkSuQmCC)![A Figma mockup showing someone choosing a dither effect](https://cdn.sanity.io/images/599r6htc/regionalized/37812d99c16cc193fece4954703ae857754cb045-3252x2064.png?rect=0,1,3252,2063&w=804&h=510&q=75&fit=max&auto=format)

Coming off of my wins with vibe coding, I wanted every design to start as a working prototype. This, I thought, would help us move faster, feel out the experience, and give developers something concrete to build from. It turned out that while vibe-coded prototypes were excellent tools for designers—they let us validate and challenge our own assumptions—they weren’t helpful references for developers, PMs, and stakeholders.

So we switched it up. We developed static mocks in Figma to serve an exploded view of all possible states and get alignment around key features first. And then we moved over to working code prototypes to test and home in on the best solutions without the usual back-and-forth of waiting for implementation, reverting to design, re-implementation, and testing. They helped us arrive at better solutions more quickly, without wasting precious engineer time. I even wrote production code in the Figma codebase and slung a few PRs. Our Slack channel was a frenzy of demos, PR reviews, and on-the-fly decisions. The energy was palpable.

## [Getting over the finish line](#getting-over-the-finish-line)

Two weeks before Config, we were 90% of the way there, but the last 10% was the hardest part. We were moving so fast that our leaders and sponsors were reviewing versions that were already out of date. There were moments where it felt like this project was headed for the cutting-room floor.

We communicated fast and often, made instinctual decisions, and created solutions on the fly. Layouts in plugins not quite landing? We built three new UI components that helped the agent’s decision-making. Custom property controls for color palettes needed another three days of engineering? We made the hard cut, and went with a select list in the meantime. Something needed a design polish? We opened a PR. As the designer-founder of this project, I found making cuts especially tough, but I had to learn what to hold back and what to push forward to meet the finish line.

When Georgia and I walked onstage during the Config keynote to present generative plugins and shaders, we were representing the hard work of an incredible team, and a whole new way of working.

This project also taught us how to use Figma in new ways, reducing the friction between design and production. Our Config microsite for shaders, for example, extensively used our Figma MCP server. In this era, an engineer running a local agent expects to read the design with our MCP with `get_design_context`. Code on the canvas, in other words, is not so different from design on the canvas. We built shaders to be [exportable in HTML](https://github.com/WICG/html-in-canvas) and React, and are proud to make that part of the updates we’re launching today.

I can’t wait for you to [give our features a spin](https://help.figma.com/hc/en-us/articles/41147702210071-Quick-start-guide-to-generative-plugins-and-shaders). We’re continuously working to bring more expression and utility to your fingertips, and are eager to see what you share with the world.

Get started with our [generative plugins and shaders playground file](https://www.figma.com/community/file/1676067142735700190). Anyone with access to the Figma design agent can build generative plugins and shaders. The agent is available in open beta for Full seat users on all plans. Collab, Dev, and View seats can use the agent in their drafts. The agent is free to use during beta but will begin to consume AI credits in a few weeks.