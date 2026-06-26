---
title: "Less is more, more or less"
source: "https://jakub.kr/writing/less-is-more"
publishedDate: "2026-06-25"
category: "design"
feedName: "Sidebar"
---

Table of Contents

Today, with AI, it's very easy to fall into the trap of producing more just _because_ you can. Every idea, every new feature, every animation you've always wanted to build is just a couple of prompts away. It’s amazing. It feels like having a superpower.

Things that previously would've taken hours, days or weeks now take minutes. However, the longer I use these tools, the more conscious I become of how I use them and I keep wondering if leaning into quantity is really the best way to build.

Everyone knows the age-old saying of quality over quantity but sometimes it's difficult to understand exactly what it means in practice.

In the age of AI, more people can make more things, much faster. Quantity still matters and it always will, but more things being made doesn’t mean better things are being made.

I spend [a lot of time](https://x.com/jakubkrehel) thinking about what _quality_ means in software.

When you go from using a good product to a great one, you can _feel_ the difference.

If you're a domain expert, you can probably point to a lot of things that make the difference. Even then, it might be difficult to point your finger at all of them.

Usually it's not a single thing but instead a collection of smaller decisions and details that add up to a _great_ experience.

The products that stand out and last in the AI era are ones built with intent and extraordinary _care_.

Crucial parts of building a great product are simplicity and clarity.

Humans generally prefer simple and predictable things because, in a way, the brain is an energy-saving machine. Simplicity reduces unnecessary cognitive load, makes things easier to process and can make an experience feel less overwhelming.[1](#energy-note)

There’s a concept in psychology called [processing fluency.2](#fluency-note) The easier something is to process, the more familiar, pleasant or credible it can feel.

[

> “Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.”

Antoine de Saint-ExupéryAirman's Odyssey







](https://www.amazon.com/Airmans-Odyssey-Antoine-Saint-Exup%C3%A9ry/dp/0156037335)

AI makes adding things easier than it ever was. It's very tempting and it's much easier than removing something.

When you remove something, you have to be _intentional_ about it and think all the implications through. Adding is different. With agents it's easy to close your eyes, add things and hope for the best without thinking about it.

I love this quote by [Jony Ive](https://en.wikipedia.org/wiki/Jony_Ive), because it describes exactly what simplicity is. It's more than removing clutter. It's having an understanding so deep that you make things make sense and you only keep what's essential in order to do that.

[

> “True simplicity is derived from so much more than just the absence of clutter and ornamentation. It's about bringing order to complexity.”

Jony IveAs Little Design as Possible







](https://www.phaidon.com/en-eu/products/dieter-rams-as-little-design-as-possible?srsltid=AfmBOoqEXCEIIaZ_xfSVTI4XDqhlDbia8nuAaA9K4tEQWGYeK22PSM7A)

You could let an agent run non-stop and produce millions of lines of code but there is no guarantee that the result will be good.

It applies to most things, for example animations. In a weird way it actually became easier to animate things than not to.

The animated variant in the example below is nice but does it make sense? Not really.

H

L

T

N

Animated

H

L

T

N

Not animated

Switch tabs to compare the animated and non-animated variants.

Animating something and animating something _well_ are two very different things.

Over-animated

Subtle

In the example below, one context menu animates both when it opens and when it closes while the other only animates when it closes.

One animates the `background-color` change of the items on hover, the other doesn't.

Why is that? Isn't more animation always better?

Right-click hereTap and holdEverything

Right-click hereTap and holdIntentional

Notice the difference between what is animated and what is not between the two examples.

Not really. On paper it might sound like the more animated an interface is the better, but in practice that's rarely the case.

Let's assume the context menu is the same context menu that appears when you right-click on macOS. It might seem like a good idea to animate both the entrance and exit. Why wouldn't it be?

When you understand that users will use this action, hundreds, sometimes thousands of times per day it stops looking like such a good idea.

Assuming you open the menu `200` times per day and the duration of the animation is `300ms`, that’s about a minute per day or more than 6 hours per year spent watching the animation play out. It gets in the way and becomes annoying.

This example might be obvious. Of course you wouldn't animate something that is used as much as a context menu but that's exactly the point.

Once you understand what you’re solving and how people use it, not animating it becomes the obvious decision.

Agents can’t do this just yet. They're amazing at executing. However, they don’t fully possess understanding and judgement, and ultimately those are the things that make products feel great.

A lot of the same ideas apply to engineering for example. Now that everyone can write a lot of code, the days when the quality of an engineer’s output was determined by the amount of code they produced are long gone.

At [Interfere](https://interfere.com/) for example, we celebrate pull requests that do what they're supposed to with as little code as possible.

In the same way that judgement and understanding are becoming more valuable in design, they’re becoming more valuable in engineering too.

The ability to review code, distinguish good code from bad code and think critically is becoming more important than the ability to write code, but also more scarce.

If you lack knowledge and understanding and you skip ahead straight to building, it becomes much harder to judge whether the agent’s output is good or bad and therefore steer it to something good.

+688−3,073

Our quality bar for everything is very high and each engineer at Interfere is incredible at something else.

To maintain the quality bar and to share the knowledge and principles that we want both agents and humans to follow, we created our own `/codebase-standards` skill.

We pair it with a `/interfere-review` command that reviews code against them. By doing this, we try to encode our understanding and judgement in a way both teammates and agents can use.

![Codebase standards skill and interfere-review command](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fless-is-more%2Fcodebase-standards.avif&w=3840&q=75)

I put together a short list of things that I generally follow when working with agents.

Principles of working with agents

-   \-Don't outsource your thinking to the agent
-   \-Be critical, don't assume anything the agent writes is correct by default
-   \-Try to make sure you can explain what each line of code added by an agent does, at least broadly
-   \-Think about if everything you're adding makes the final outcome better
-   \-Your agents are an extension of you. The better you are at something, the better they are too
-   \-Give agents as much context as possible. Use skills, commands, MCPs and be opinionated about how you want them to do things
-   \-If you don't understand something, use AI to explain it. It's one of, if not the most powerful learning tool there is

AI makes it _easier_ than ever to add more. More features, more code, more animations, more everything. It's incredibly powerful, but it also makes it easier to build things that perhaps don’t need to be built.

The question to answer these days seems to be what you should build and how you should build it instead of whether you can build it.

The more _powerful_ the tools we use become, the more our understanding, judgement and [taste3](#taste-note) matter.

Understanding the product, the user and the problem. Being opinionated. Having a vision. Calibrating your taste. Leaning on your judgement.

Those things are still on _you_.

Simplicity doesn’t happen by accident. It comes from understanding deep enough that you know what to remove, what to leave alone and what not to build at all.

[

> “Simplicity is the ultimate sophistication.”

Leonardo da VinciThe Notebooks of Leonardo da Vinci







](https://www.goodreads.com/quotes/9010638-simplicity-is-the-ultimate-sophistication-when-once-you-have-tasted)

The next time you’re adding an element, an animation or a feature, think _critically_ about why you’re adding it and whether adding it makes the final outcome better.

In the age of AI, knowing what not to build might be the _most_ important skill of all.

More often than not, _less is more_, more or less.

Thanks to [Luke](https://x.com/lukeshiels), [Hana](https://www.linkedin.com/in/hanaholcikova/) and [Tika](https://x.com/iocapon) for proofreading this article and to [Nacho](https://x.com/Nacho_Gavilanes), [Alessandro](https://x.com/alessandro20XX) and other Interfaces subscribers for providing early feedback.

## More

If you enjoy articles like this and want to learn more, take a look at _Interfaces_, my design engineering magazine.

It’s where I share _everything_ I know, from animation and typography to layout, color and everything else that is a part of building a great interface.