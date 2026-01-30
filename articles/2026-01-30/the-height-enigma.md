---
title: "The Height Enigma"
source: "https://www.joshwcomeau.com/css/height-enigma/"
publishedDate: "2025-05-12"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Back when I was first trying to understand CSS, one of the biggest mysteries to me was why `height` sometimes wouldn’t work.

For example:

Code Playground

Code editor:

Result

I’ve given this paragraph `height: 50%`, but as you can see, it hasn’t grown at all! In fact, it doesn’t matter whether I set `height: 100%` or `height: 10000%` or `height: 0%`. Nothing happens.

In my first few years with CSS, I developed a bit of an intuition for when it would work and when it wouldn’t, but it always sorta felt like rolling the dice. Sometimes it wouldn’t work even when it really seemed like it should!

Like with so much in CSS, it feels random until you learn about the underlying mechanisms that explain the behaviour, and then it all makes perfect sense. In this blog post, we’ll learn what’s going on here and I’ll share how I solve these sorts of problems.

## [Link to this heading](#a-circular-calculation-1)A circular calculation

So here’s the core thing to know: in CSS, `width` and `height` are fundamentally different. By default, they’re calculated in totally opposite ways.

This becomes obvious when we really think about it. Block-level elements like `<div>` will expand to take up all available _width,_ but they don’t do that for _height._ Instead, they shrinkwrap around their children:

Some Example Website

https://www.joshwcomeau.com/example-website

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy

Number of Words:20

Notice that the height grows and shrinks with the # of lines, but the width always stays maxed-out, even when there isn’t any content!

Now, I recognize that this isn’t terribly surprising or mindblowing. This feels totally normal. But it gets interesting when we think about what this tells us about how these values are calculated.

When calculating an element’s default `width`, the browser looks _up_ the tree, to the element’s parent. But when calculating an element’s default `height`, well, that depends on the element’s _children_. So the browser has to look _down_ the tree instead.

So, when we tell an element to have `width: 50%`, that’s no big deal. Browsers _already_ use their parent’s size to calculate their width, so it’s an easy thing to say “OK, take up 50% of that available space”.

But when we tell an element to have `height: 50%`, it’s a different story:

-   The child is saying “I want to be 50% of my parent’s height”.
    
-   The parent is saying “I want to be the smallest height required to contain my children”.
    

See the problem? **They’re trying to derive their size from each other.** It’s a circular calculation that never resolves. A mystery wrapped in a riddle. A paradox. As a result, browsers will ignore the `height: 50%` declaration on the child.

## [Link to this heading](#knowable-heights-2)Knowable heights

In order for something like `height: 50%` to work, the parent’s height can’t depend on the child’s height.

We can set this up by giving the parent an explicit `height`:

Code Playground

Code editor:

Result

Our parent `<main>` is given `height: 300px`, which short-circuits the normal calculation. Instead of calculating a dynamic size based on its children, this `<main>` tag is locked to a fixed value of 300 pixels.

In that case, the child’s `height: 50%` is resolvable. We can calculate 50% of 300px.

**Now, we generally shouldn’t use the `px` unit for `height`.** Pixels don’t scale with the user’s chosen text size. Folks with poor vision tend to crank up the default `font-size`, which can cause text to overflow and layouts to break if we use pixels for our container sizes. I have a separate blog post that covers [the accessibility implications of pixels(opens in new tab)](https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility), if you’d like to learn more about this.

Fortunately, the `rem` unit works just as well for establishing a fixed, knowable size:

Code Playground

Code editor:

Result

Now, here’s where it gets complicated. We can nest percentage-based heights, as long as they’re _all_ calculated from an explicit size:

Code Playground

Code editor:

Result

The top-level `<main>` tag defines a fixed height of 24rem. A new `.wrapper` child takes up 50% of that height, which is calculated to be 12rem. So, even though `.wrapper` uses a percentage-based height, it’s still a “knowable” value.

By “knowable”, I mean that the value can be inferred from the CSS given to this element or its ancestors higher up in the tree. It doesn’t depend on the size of its descendants. “Knowable” isn’t a term of art, it’s my own word.

And because `.wrapper`’s height is knowable, we can use a percentage-based height for the `<p>` within. Whenever an element sets an explicit height in pixels or rems, that entire slice of the DOM tree becomes knowable, and we can use percentages anywhere inside.

### [Link to this heading](#percentages-all-the-way-down-3)Percentages all the way down

So here’s an interesting question: what if we use a percentage-based height on the top-level `html` element?

Well, let’s give it a shot. On this blog, I use iframes for the “RESULT” pane, so we essentially have our own mini browser window:

Code Playground

Code editor:

Result

Look at that! The `<html>` tag grows to fill the whole viewport.

This works because the root `<html>` tag is special. Unlike every other node on the page, `<html>` doesn’t have a parent, since it’s at the very top of the tree. So when we set `height: 100%`, it isn’t using some parent element’s content box. Instead, it uses the viewport itself.To be more precise, it uses the “initial containing block”, a rectangle the same size and shape as the viewport.

Crucially, this means that the `<html>` tag has a _knowable_ height, since the dimensions of the viewport don’t depend at all on the children within. There is no CSS I can write that will affect the width or height of the browser window, after all!

So, percentage-based heights work on the top-level DOM node, and we can funnel that value through the whole tree like a hot potato. For many years, this was a core part of my CSS reset, to ensure that my app’s main layout filled the whole viewport:

```
html, body, #root {
  height: 100%;
}
```

These days, this trick isn’t necessary anymore; if we want an element to take up 100% of the viewport, we can use the `svh` unit (Small Viewport Height; similar to `vh` but without the funky behaviour on mobile browsers). But it’s still worth understanding how percentage-based heights work, since we don’t always want things to be sized relative to the viewport.

## [Link to this heading](#the-final-boss-4)The final boss

The trouble with setting something like `height: 24rem` is that it can lead to overflows if there’s too much content to fit in that space:

Code Playground

Code editor:

Result

Let’s try to solve this by swapping `height` with `min-height`:

Code Playground

Code editor:

Result

At first glance, that looks great… But if we remove some of the content, we discover that our percentage-based height has stopped working:

Code Playground

Code editor:

Result

**This is the sort of thing that always threw me off.** I’m still giving the parent an explicit knowable size when I set `min-height: 24rem`, aren’t I?

It _feels_ that way, at least to me, because we’re using a number, 24rem. But when we use `min-height` instead of `height`, we aren’t actually giving the element a fixed size.

Remember, the thing we need is for the parent’s height to _not depend_ on the child’s height. That’s how we avoid the circular paradox thing. And we aren’t fulfilling that condition here; the parent will still grow and shrink based on its children. We’ve set a lower bound, but the actual height can be anything from 24rem to infinity, depending on what’s inside.

### [Link to this heading](#the-solution-5)The solution

Ok, so how do we actually solve this problem?

So far, all of the examples we’ve seen have been using CSS’ default layout mode, Flow layout. It turns out that both Flexbox and Grid can really help us out here!

Check this out:

Code Playground

Code editor:

Result

Try deleting most of the content inside that `<p>`, and notice that the peach-colored element still fills its container. This is exactly what we want! 😄

When we set `display: grid`, we create something called a “grid formatting context”. This means that the child within, `.wrapper`, will use Grid layout instead of Flow layout.

And in Grid layout, elements don’t shrinkwrap around their children. Instead, children will grow to fill their grid cell, both horizontally and vertically. By default, grids will have a single row and a single column, and that row is stretched across the entire grid surface. This means that we don’t have to set `height: 100%`. The child grows automatically. ✨

We can also use Flexbox, though we do have to instruct the child to fill the available space in the primary axis with `flex: 1`:

Code Playground

Code editor:

Result

As I shared in my blog post [“Understanding Layout Algorithms”(opens in new tab)](https://www.joshwcomeau.com/css/understanding-layout-algorithms/), CSS is kinda like a constellation of mini-languages, each with its own special purpose. By default, most HTML tags use Flow layout, which is essentially the “Microsoft Word” layout algorithm. It’s great for articles and other digital documents, but it’s not so good for building web app layouts.

You’re already using Flexbox and Grid, I presume, but it’s still surprisingly easy to get caught by this percentage-based height issue. When this happens, the solution is to switch to a more-appropriate layout algorithm. 💖

## [Link to this heading](#continue-learning-6)Continue learning

If you found this blog post useful, you might like to know that I have an entire course on CSS!

My course is called [CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/). It‘s like a supercharged version of this blog: there are interactive articles like this one, but also bite-sized videos, challenging exercises, real-world-inspired projects, and even some minigames 😄.

The course has one goal: to help you build a robust and comprehensive mental model for CSS so that you can use it with confidence and build all sorts of complex UIs without frustration or guesswork.

[![CSS for JavaScript Developers](https://www.joshwcomeau.com/images/the-importance-of-learning-css/css-for-js-banner.png)](https://css-for-js.dev/)

I created the course primarily for React/Angular/Vue devs, since I knew so many folks in this situation who understood JS well but struggled with CSS. Most of the course, however, is focused on vanilla CSS principles, so even if you’re not a React expert, you may still benefit a ton from the course.

You can learn more here:

-   [CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/)
    

### Last updated on

December 3rd, 2025