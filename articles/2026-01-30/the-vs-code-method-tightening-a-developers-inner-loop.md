---
title: "The VS Code method: Tightening a developer’s inner loop"
source: "https://www.figma.com/blog/the-vs-code-method-inner-loop/"
publishedDate: "2024-09-19"
category: "design"
feedName: "Figma Blog"
---

The endless tasks, projects, and context switching that developers face can make achieving a flow state the white whale of development. For the VS Code team, meeting developers where they are so they don’t have to toggle between tools prevents that thrash. In the third installment of our series on [foundational team principles](https://www.figma.com/blog/the-atlassian-method-developer-joy/), we sit down with Burke Holland, Principal Developer Advocate on Microsoft’s VS Code team, to learn how the team is enabling the heads-down work they call the “inner loop,” and why companies building for developers should take note.

## [What is the inner loop?](#what-is-the-inner-loop)

Every developer’s workflow is different, but building software involves a few universal steps: writing code, compiling and debugging, then continuing that process in the code editor until the code works. The VS Code team calls this cycling through focused work the “inner loop.” The “outer loop” is everything else that happens outside of a code editor, like checking a bug tracking tool, updating a ticketing system, or responding to teammates on apps like Slack or Microsoft Teams. In fact, developers working on multiple projects may be jumping between a browser, API documentation, terminal tabs, and multiple desktops.

At a micro level, inhabiting the inner loop builds “inertia,” as Burke calls it—“a kind of increase in speed and productivity the longer the state is maintained.” Zooming out, it also means higher quality code and outcomes. “While in a flow state, developers mentally load context—like accounting for edge cases or future planning around the code being written—and that context is lost when flow state is broken,” says Burke.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwQH/8QAIhAAAgEEAgIDAQAAAAAAAAAAAgMBAAQFERIUBiExQYHB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAfEQABAwQDAQAAAAAAAAAAAAABAAIEAxESISIxgXH/2gAMAwEAAhEDEQA/AOxPxa7pj3W4rSwy0chHzEVGLi3Y47YreYmN6Kf7WPxsOt4xiSUR7JUctluSmPuaYdhr7gFAUK5zqSEfdTPaGOex3IjV0EKZQaBRBxI71e/qWZNvWvDVbkXAaKqymdThr1lmOOXccfcsYc7KZ/KKupw5eIxOvqarIh5ngD4v/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/6b9288f94ce0a29584a4990719ce676b5a9618f1-1056x704.jpg?w=804&h=536&q=75&fit=max&auto=format)

## [Bridging the inner and outer loops](#bridging-the-inner-and-outer-loops)

The VS Code team aims to tighten the inner loop directly in the VS Code editor and remove distractions through a mix of core features and extensions. One example is “[Zen Mode](https://code.visualstudio.com/docs/getstarted/userinterface#_zen-mode),” a way to hide parts of the UI to provide a distraction-free experience. “Every time the UI changes, the brain needs to readjust,” says Burke. “At a micro level, even collapsing the sidebar in VS Code can cause a tiny disruption while the brain recalibrates. These things add up.” Developers can also choose the extensions to help them work faster, while also working the way they want to work.

While being more productive in a single tool is helpful, it doesn’t solve the problem of toggling _between_ tools—and tasks. With so many projects, tools, and collaborators, more developers find themselves oscillating between the inner and outer loop more often than not. For example, a developer might be working on a specific pull request, jump into GitHub, then come back to code. This context switching derails workflows, stealing minutes of productivity. Instead, Burke says, the goal is to move as many tasks as possible from the outer loop to the inner loop. Tactically, this means pulling outer loop activities—communication with collaborators, meetings with stakeholders, and project management—directly into their existing workflows whenever possible. There will always be some amount of context switching, but teams might not need to use chat apps or meet with collaborators when they can comment directly within a tool they’re using. Similarly, they won’t have to switch to a project management tool if they can access it directly in their code editor through a product integration.

GitHub reports that GitHub Copilot increases the speed of coding by 55%. “That’s an impressive figure,” says Burke, “but more impressive is that GitHub also reports that 75% of developers using AI feel more fulfilled.”

AI is an example of a tool that developers can pull into their existing workflows. “Generative AI is remarkably good at watching what a developer is doing, and then proactively providing the code they are going to need next,” says Burke. “It anticipates what you are going to type and suggests it in a non-intrusive way.”

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGAQT/xAAmEAABAwQBAwQDAAAAAAAAAAAEAQIDAAUREgYhMUETFCIjMlGR/8QAFgEBAQEAAAAAAAAAAAAAAAAABAAD/8QAJBEAAQIFAgcAAAAAAAAAAAAAAQIDAAQREyExURQiMkFhgfD/2gAMAwEAAhEDEQA/AMGM24+POWFvcDZ9pUmX4tf56eKeHNitJgE0wYOZU1+teqZqdl5IvtreMYCOQpMaTOf+OF2/VNbccIbfhYn26JNWqrXK9XY/tNbccW1dUNKg5xUYx78RKl1qKbXRQfEd4jObPEEv8rYBnYe1HuXvly580V0cu5q60ciNBltQZfov1bI9MLr3RKK0DqCKlML4ibb5WphQSNBsNo//2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4d442b54d43a55c1578fb86a3d1a75dfa89092b5-1056x704.jpg?w=804&h=536&q=75&fit=max&auto=format)

## [Keeping each other in the loop](#keeping-each-other-in-the-loop)

“Collaboration is critical, but it’s also a kind of disruption,” says Burke. Because collaboration usually involves meeting live or going back and forth on chat, unlocking productivity and getting into the elusive flow state is often seen as a solo endeavor. For many developers, however, their roles call for equal parts coding and communication. Knowing how important collaboration is—especially across design and development—Burke and team have thought a lot about how to facilitate individual inner loops that accommodate others’ work without breaking concentration.

For example, VS Code brings GitHub into the code editor so that developers can do core collaborative work—like work on issues, facilitate code reviews, and submit PRs—without leaving their heads-down work. “The ideal collaboration is where we’re both staying in our inner loops,” Burke says. In other words, collaboration doesn’t have to be synchronous.

## [A virtuous circle](#a-virtuous-circle)

If toggling between tools causes friction, Burke looks forward to a world in which the inner loop includes _all_ tools. Until then, he reminds us that while productivity matters, workflow improvements aren’t just about outcomes. “Staying within the flow state increases both a developer’s energy, and their overall happiness,” he says. “Those of us who build developer products have an enormous responsibility to ruthlessly pursue developer happiness by bringing inner loops closer together and removing as much tedium as possible.”

[Read more](https://www.figma.com/blog/the-linear-method-opinionated-software/) from our series about how teams build products and the principles and processes that guide their work.