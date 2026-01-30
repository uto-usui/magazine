---
title: "The art and influence of motion"
source: "https://www.figma.com/blog/the-art-and-influence-of-motion/"
publishedDate: "2022-03-24"
category: "design"
feedName: "Figma Blog"
---

When we talk to each other, facial expressions and gestures are as important as what we say. The same is true in the digital world. Even the slightest movement can show progress, communicate error states, and offer delight in ways that feel natural. A loading bar during a software update lets you know that it’s working and will be finished shortly. A field that wiggles when a password is incorrect mimics a headshake, prompting you to try again. Movements on a refreshed page—pie charts and bar lines that “recalibrate” as the new page appears, for example—let you know that everything is up to date.

Beyond adding richness and personality, movement is effective because it helps people better process information, says experienced UX Designer, strategist, and [author](https://rosenfeldmedia.com/books/life-and-death-design/) [Katie Swindler](https://twitter.com/katieswindlerux), who has studied the “[subconscious influence of motion](https://www.youtube.com/watch?v=XWGKsko9IhA)” in her writing and talks: “\[Animations\] help translate a digital space to a brain that has gone through evolution in a physical space.”

We talked to Swindler about how to use motion to create intuitive experiences—stealing inspiration from the physical world, avoiding common mistakes, and going from design to development. The following transcript of that conversation has been edited for length and clarity.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**Why is motion such a powerful tool in forging human-centered connections in the digital space?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAQFAgYIB//EACkQAAEEAgEBBgcAAAAAAAAAAAIAAQMEBQYREgcIEyFBURQVQkNhcrH/xAAXAQADAQAAAAAAAAAAAAAAAAAAAgME/8QAHBEAAwACAwEAAAAAAAAAAAAAAAECEjETIUJD/9oADAMBAAIRAxEAPwC2xNavu2XzOSy3xFshPw4o4n4YGf1ZTdRz+R0naX1cuLEU5CUBSPx0s7rVuxbZBj2rJYSmUlnHEbyxTiPHH7K529vlvaBQ2DZJAo0hlGKv9XUzebu/smnLNzWguJ4lU7OgLlCvZlaSYGc+lm5RQKOwYzI1Qs079aWEm8iGRkSuOyaZ4X3ZcVULVcleePmzJOwEf4b0WfeojEdXw3Dfff8AiItH1Dwc6VrlmGLoisSgPsJuzIiLYiTP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/5259c859aa6e50e1831334e283faae09e3eb517b-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Katie S.

Well, we are trying to translate a digital space to a \[human\] brain that has gone through evolution in a physical space, which is three-dimensional and has motion. Because human beings get a lot of meaning from motion, adding movement to a user interface allows us to have some of the benefits of a physical space represented—at least symbolically—in that digital space. It gives you a piece of information that helps you create mental models on the fly—as we do without thinking about it all the time in the physical world. But in digital spaces, we have to program those models.

A classic example of what I’m talking about is the digital drawer animation that shows a content box or menu sliding open and closing. Just like a drawer in the physical world, you understand intuitively that the digital drawer can be opened and closed as many times as you need, and also that each time you open the drawer, you’ll find the same things that were there when you closed it.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**How do you know when to use motion, rather than communicating something through, say, text?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAQFAgYIB//EACkQAAEEAgEBBgcAAAAAAAAAAAIAAQMEBQYREgcIEyFBURQVQkNhcrH/xAAXAQADAQAAAAAAAAAAAAAAAAAAAgME/8QAHBEAAwACAwEAAAAAAAAAAAAAAAECEjETIUJD/9oADAMBAAIRAxEAPwC2xNavu2XzOSy3xFshPw4o4n4YGf1ZTdRz+R0naX1cuLEU5CUBSPx0s7rVuxbZBj2rJYSmUlnHEbyxTiPHH7K529vlvaBQ2DZJAo0hlGKv9XUzebu/smnLNzWguJ4lU7OgLlCvZlaSYGc+lm5RQKOwYzI1Qs079aWEm8iGRkSuOyaZ4X3ZcVULVcleePmzJOwEf4b0WfeojEdXw3Dfff8AiItH1Dwc6VrlmGLoisSgPsJuzIiLYiTP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/5259c859aa6e50e1831334e283faae09e3eb517b-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Katie S.

Microanimations—brief sequences that enliven a UI or direct a user through a flow—should be purpose-driven first and solve a very specific problem. Just like icons are incredibly useful in a UI (you don't want to add icons just to add icons), you need to bring the same sort of discipline and thoughtfulness when you're adding microanimations to an experience. For instance, if you are working with some older systems on the backend, a one- to two-second transition animation can disguise an unavoidable processing delay, making your product feel more responsive and less clunky.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**What do the best examples of motion have in common?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAQFAgYIB//EACkQAAEEAgEBBgcAAAAAAAAAAAIAAQMEBQYREgcIEyFBURQVQkNhcrH/xAAXAQADAQAAAAAAAAAAAAAAAAAAAgME/8QAHBEAAwACAwEAAAAAAAAAAAAAAAECEjETIUJD/9oADAMBAAIRAxEAPwC2xNavu2XzOSy3xFshPw4o4n4YGf1ZTdRz+R0naX1cuLEU5CUBSPx0s7rVuxbZBj2rJYSmUlnHEbyxTiPHH7K529vlvaBQ2DZJAo0hlGKv9XUzebu/smnLNzWguJ4lU7OgLlCvZlaSYGc+lm5RQKOwYzI1Qs079aWEm8iGRkSuOyaZ4X3ZcVULVcleePmzJOwEf4b0WfeojEdXw3Dfff8AiItH1Dwc6VrlmGLoisSgPsJuzIiLYiTP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/5259c859aa6e50e1831334e283faae09e3eb517b-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Katie S.

It’s all about a blend of practicality and personality. You want to be respectful of the user's time and you don't want to do something that's distracting. My favorite animation is officially called the “sprout” animation in many animation libraries, but I always think of it as “The Genie In The Bottle.” Apple uses it all the time. When you minimize a window, it looks like it gets sucked down into a single icon in the dock at the bottom of the screen.

It looks to me like a genie getting sucked into his bottle. I love it because it’s fast and subtle, and it gives you just enough visual clues to know exactly where to go and how to get that window back. When you click on that icon in the dock, the animation is reversed and looks as though the window is sprouting up out of the icon.

> It’s all about a blend of practicality and personality. You want to be respectful of the user’s time and you don’t want to do something that’s distracting.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**What about the common pitfalls? What are the mistakes you see over and over again?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAQFAgYIB//EACkQAAEEAgEBBgcAAAAAAAAAAAIAAQMEBQYREgcIEyFBURQVQkNhcrH/xAAXAQADAQAAAAAAAAAAAAAAAAAAAgME/8QAHBEAAwACAwEAAAAAAAAAAAAAAAECEjETIUJD/9oADAMBAAIRAxEAPwC2xNavu2XzOSy3xFshPw4o4n4YGf1ZTdRz+R0naX1cuLEU5CUBSPx0s7rVuxbZBj2rJYSmUlnHEbyxTiPHH7K529vlvaBQ2DZJAo0hlGKv9XUzebu/smnLNzWguJ4lU7OgLlCvZlaSYGc+lm5RQKOwYzI1Qs079aWEm8iGRkSuOyaZ4X3ZcVULVcleePmzJOwEf4b0WfeojEdXw3Dfff8AiItH1Dwc6VrlmGLoisSgPsJuzIiLYiTP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/5259c859aa6e50e1831334e283faae09e3eb517b-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Katie S.

Accessibility is a huge issue. The last thing that you want to do is create something that requires animation in order for the user experience to work, because then you're cutting out a huge swath of people. People who have epilepsy, for example, could be triggered by certain types of movement.

Beyond that, some animations are just…annoying. They can wear away brand affinity, cause confusion, or frustrate users by interrupting, creating busyness, or adding steps. I’ve seen animations that are frenetic and bounce around the page. If you have too much of that going on, people won't necessarily be conscious of why it bugs them, but it will slowly degrade their connection to your brand. Each animation should be chosen with care and restraint, solving the problem for the user in the most elegant way possible.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**In terms of actually bringing motion to life in a design, what should be top of mind?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAQFAgYIB//EACkQAAEEAgEBBgcAAAAAAAAAAAIAAQMEBQYREgcIEyFBURQVQkNhcrH/xAAXAQADAQAAAAAAAAAAAAAAAAAAAgME/8QAHBEAAwACAwEAAAAAAAAAAAAAAAECEjETIUJD/9oADAMBAAIRAxEAPwC2xNavu2XzOSy3xFshPw4o4n4YGf1ZTdRz+R0naX1cuLEU5CUBSPx0s7rVuxbZBj2rJYSmUlnHEbyxTiPHH7K529vlvaBQ2DZJAo0hlGKv9XUzebu/smnLNzWguJ4lU7OgLlCvZlaSYGc+lm5RQKOwYzI1Qs079aWEm8iGRkSuOyaZ4X3ZcVULVcleePmzJOwEf4b0WfeojEdXw3Dfff8AiItH1Dwc6VrlmGLoisSgPsJuzIiLYiTP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/5259c859aa6e50e1831334e283faae09e3eb517b-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Katie S.

Motion adds a lot of complexity to the production side of things. It's almost never right the first time that you do it, especially when you're in a fast-paced feature churn. It’s also difficult to design without seeing it. Since you’re essentially writing a 2D spec for animation, the worry is that it may not turn out exactly how you envisioned it.

I think that the best animations come from a cross-disciplinary approach—you need to have pretty equal weighting of design sensibilities and development sensibilities. If you have one person who has both of those skill sets, that’s great. But if not, designers should trust their developers who have animation expertise. They may be designing in code, but don't relegate them to the ones and zeros. At the end of the day, they're the ones who are going to be picking the speed of the swoops and the bands of the curve. They need to understand the design intent. Bring them to the table as a member of the design team.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAMGBwj/xAAmEAACAQQBAwQDAQAAAAAAAAABAgMABAURBhITMQchImEVI0FR/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIEA//EAB8RAAICAgEFAAAAAAAAAAAAAAABAgMEETIUITFBgf/aAAwDAQACEQMRAD8ArvBMjyF55JMhNJ0A+waMnYFTc8My2P5EvOO5IvdXubUrv/KvvNMxa8Z409x21MsoMcSj+kjzXPWR5Xk8nbxWd0VaKJurYGur38GpJ1N6cS3Hs2m5/DaMbmbS3soollDhVA3v6pUnF8Rg89g7W9jdVLIFdVOtMPNKXpqvaM3kTXYq/r/cSLHiIg3w+Ta+6xp5GRSynR1SlXR4i1cUad6ZzSDjZ05H728H6FKUpWB+T//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/62ed2470f610b2b3e7fee4a6fab017b273d5c339-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Alia F.

**Do you think motion experiences the same rapid trend cadence as other facets of design?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAQFAgYIB//EACkQAAEEAgEBBgcAAAAAAAAAAAIAAQMEBQYREgcIEyFBURQVQkNhcrH/xAAXAQADAQAAAAAAAAAAAAAAAAAAAgME/8QAHBEAAwACAwEAAAAAAAAAAAAAAAECEjETIUJD/9oADAMBAAIRAxEAPwC2xNavu2XzOSy3xFshPw4o4n4YGf1ZTdRz+R0naX1cuLEU5CUBSPx0s7rVuxbZBj2rJYSmUlnHEbyxTiPHH7K529vlvaBQ2DZJAo0hlGKv9XUzebu/smnLNzWguJ4lU7OgLlCvZlaSYGc+lm5RQKOwYzI1Qs079aWEm8iGRkSuOyaZ4X3ZcVULVcleePmzJOwEf4b0WfeojEdXw3Dfff8AiItH1Dwc6VrlmGLoisSgPsJuzIiLYiTP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/5259c859aa6e50e1831334e283faae09e3eb517b-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Katie S.

Oh yeah, absolutely. It usually works in cycles. As certain types of animations become easier to implement, designers get excited and start using them more. Once they tire of those styles, they strip back down to the essentials. I'm sure this cycle will continue—there will be advancements in animations that allow us to do cool things, we’ll have another bloom, and then it’ll once again get stripped back down to what really matters.

_As you think about adding motion to your designs, you can find inspiration and templates in the [Figma Community](https://www.figma.com/community/file/838085275736757482). And we’d love to learn about some of your favorites and what you're making—give us a shout on Twitter!_