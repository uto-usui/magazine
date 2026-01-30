---
title: "The Importance of Learning CSS"
source: "https://www.joshwcomeau.com/css/the-importance-of-learning-css/"
publishedDate: "2021-03-03"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

As JavaScript developers, the sheer amount of _stuff_ we're expected to know is enormous, and it grows bigger every day.

With so many different languages, tools, and technologies competing for our time and attention, it can be tough to figure out what to prioritize. Should we get better at TypeScript? Maybe pick up Svelte? Will we even be writing JS in the future, or is this “WebAssembly” thing for real?

In my opinion, if we _really_ want to maximize the return on our investment, one of the best things we can focus on is **CSS**.

This may seem like an odd choice, but honestly, getting better at CSS has had an enormous impact on my life and career as a developer. In this article, I'll share some of the reasons that I think it's such a good idea.

## [Link to this heading](#it-improves-your-quality-of-life-1)It improves your quality of life

I've spoken to so many developers over the past few months who just find CSS _miserable_. I have a hypothesis about this.

CSS is a very _implicit_ language; it relies heavily on mechanisms buried deep in the CSS specification. When those mechanisms work in ways we don't expect, we're left in the dark, not sure what the heck is going on. We don't know what we don't know.

Compare that to a language like TypeScript: when we make a mistake, a helpful tooltip pops up to let us know what we did wrong. Even in loosey-goosey JavaScript, exceptions point us in the right direction (and plus we have linting, breakpoints, logs…).

When we write code—in any language—we rely on our mental model of how that language works. If our mental model is incomplete or incorrect, there's a good chance that we won't get the result we were expecting. In CSS, those misalignments are _super common_, because of how implicit CSS is.

Let's look at a quick example.

In CSS, the `z-index` property can be used to move an element above or below another element. In this snippet, the pink box sits in front of the gray one because its z-index value is bigger:

Code Playground

Code editor:

Result

However: In other situations, even ones that _really seem quite similar_, this rule appears to break. The z-index values haven't changed, but now the pink box sits behind the gray one:

Code Playground

Code editor:

Result

As is so often the case with CSS, there's more to the `z-index` property than meets the eye.

If we want to understand how the browser uses z-index values, we need to learn about _stacking contexts_, an implicit mechanism that controls how those values are used. If you're curious about this particular enigma, I wrote an [article that explains what's going on here](https://www.joshwcomeau.com/css/stacking-contexts/).

It's frustrating because it feels random and unpredictable. There's a “Russian roulette” element to it: every time we use z-index, we're hoping it does what we expect.

It's important to stress: **this isn't your fault!** Most resources that teach CSS focus on superficial properties and "neat tricks", instead of going deeper and learning about stuff like stacking contexts.

![](https://www.joshwcomeau.com/avatars/rachelandrew.jpg)

Rachel Andrew

@

rachelandrew

I do think that the way CSS has been taught - as a collection of tricks - hasn't helped people understand the language. And I've done that in the past too. You can understand modern CSS as a system, and it makes a lot more sense when you do.

Dec 4, 2020

* * *

1346

275

people are Tweeting about this

(I'm totally guilty of this too 😅 plz don't be mad!)

Properties like `z-index` or `position` are used as inputs in various layout algorithms. Instead of learning about individual properties, we should learn how those algorithms work!

When we take this kind of approach, it has a transformative effect on our ability to build interfaces with CSS. We develop a much more robust and predictable intuition, and our confidence with the language swells. We can spend hours deep in flow state, turning a design into a responsive, functional layout, knowing we can solve any problems that pop up.

Over the past year, I've spoken with hundreds of JavaScript developers about CSS. I've noticed a common theme: many JS devs feel like their brain just isn't wired to understand CSS. They assume that CSS comes naturally to others, and they're just not cut out for it.

I promise you, this is not the case. Nobody's born with CSS skills. You can _absolutely_ become proficient with CSS.

And you should! It's hard to overstate how empowering it is to develop solid CSS skills when you're already proficient with HTML and JS. It completes the trinity: you've collected all the tools, and now you can build anything. ✨

## [Link to this heading](#it-can-help-boost-your-career-2)It can help boost your career

Within certain pockets of the web-development community, there's a commonly-held notion that CSS skills aren't valued by employers. If you want one of those high-paying jobs, your JS skills are all that matter, right?

It's true that employers tend to prioritize JS skills, especially for more-senior roles. But there's an interesting dynamic at play here.

Employers _actually need_ developers who are good at JS, CSS, and HTML. It takes all 3 technologies to build a front end! And because so many JS developers have a “CSS hole” in their skillsets, CSS skills tend to be in short supply.

I recently listened to a [wonderful episode of the Indie Hackers Podcast(opens in new tab)](https://dev.to/theindiehackerspodcast/192-building-games-users-will-actually-pay-for-with-dave-geddes-of-flexbox) with Dave Geddes. Dave created [Flexbox Zombies(opens in new tab)](https://geddski.teachable.com/p/flexbox-zombies), a game that teaches CSS Flexbox fundamentals. From the episode:

> I had one guy tell me, he wrote in and said he's a junior engineer, just got his first job. He was working with a senior engineer, who was like “How do you know so much about Flexbox?”… He was so impressed with this kid, he asked him “How'd you do that?”

One of the best ways to stand out and advance in your career is to become known as above-average in a relevant domain. The average skill level when it comes to JavaScript is _pretty friggin' high_, since so many developers focus exclusively on it. The average CSS skill level, meanwhile, is quite a bit lowerThings might be different outside of the React / JS-framework ecosystem. This is an anecdotal observation from my own experience, and probably isn't universal. It's low-hanging fruit.

### [Link to this heading](#css-and-the-job-hunt-3)CSS and the job-hunt

The job-hunting process sucks. But I think maybe it's getting a bit better.

A few years ago, I went through a grueling 8-interview process. 4 of those interviews were technical, though I was asked 0 questions about React, or Javascript, or CSS, or anything related to web development. It was “Cracking the Coding Interview”-type stuff. Algorithms and data structures. Stuff that has zero relevance when it comes to front-end work.Performance is important, but algorithmic complexity is so very rarely the bottleneck when it comes to the front-end.

Thankfully, the tide seems to be turning; more and more, companies are seeing the light, and trying to mimic typical day-to-day work in job interviews and hiring processes. When I interviewed at [Gatsby Inc(opens in new tab)](https://www.gatsbyjs.com/), the company behind the Gatsby.js framework, I was asked to build a Modal/Dialog component.

Modals are notoriously tricky UI elements, especially if you're mindful of usability and accessibility. But one thing's for sure: a solid understanding of CSS mechanics helps a lot.

At the start of this article, we looked at a couple code snippets, and saw how `z-index` can seem unpredictable. Because I was familiar with stacking contexts, though, I was able to work that knowledge into my solution, and produce a better modal.

To be clear, I'm not saying that CSS alone is your ticket to a high-paying gig. In that interview, I was being tested on a bunch of other skills as well, including React and JavaScript. But if you're reading this, I suspect you're already quite proficient with JS and its modern ecosystem of frameworks and tools. Adding CSS to that skillset can make for a pretty powerful competitive advantage.

## [Link to this heading](#css-for-javascript-developers-4)CSS for JavaScript Developers

Since mid-2020, I've been developing a course called [CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/). It's a comprehensive self-paced online course that helps you build your intuition for how CSS works at a deeper level.

I've been motivated to teach this stuff for years, because I went through this transformation myself. I started writing CSS in 2007, and honestly I stumbled my way through it for a decade, knowing enough to get by, but not enough to feel comfortable or confident.

In my case, I got better at CSS by spending _way more_ time on the MDN docs, and occasionally dipping into the CSSWG specifications. Whenever something didn't make sense to me, I took the opportunity to learn more about the systems involved. No more copy/pasting from StackOverflow and moving on without really understanding! This process took years, but it was absolutely a worthwhile investment.

In March 2020, I developed a significant repetitive-stress injury which left me [unable to use a keyboard or mouse](https://www.joshwcomeau.com/blog/hands-free-coding/) for a good chunk of the year. I had a lot of time to think, and I realized that more than anything, I wanted to focus on teaching.

My ultimate career goal now is to become a guide, to help others learn the skills they need in order to accomplish their own goals. Since launch, more than 18,000 developers have gone through [CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/), and the feedback has been overwhelmingly positive.

You can learn more about the course here:

[![CSS for JavaScript Developers](https://www.joshwcomeau.com/images/the-importance-of-learning-css/css-for-js-banner.png)](https://css-for-js.dev/)

### Last updated on

December 3rd, 2025