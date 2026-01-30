---
title: "A Friendly Introduction to Container Queries"
source: "https://www.joshwcomeau.com/css/container-queries-introduction/"
publishedDate: "2024-11-04"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

For a very long time, the most-requested CSS feature has been _container queries._ That’s been our holy grail, the biggest missing piece in the CSS toolkit.

**Well, container queries have finally arrived.** They’ve been supported in all major browsers for almost two years. Our prayers have been answered!

We can now apply conditional CSS based on an element’s _container_, using familiar syntax:

```
@container (min-width: 40rem) {
  .some-elem {
    font-size: 1.5rem;
  }
}
```

**Curiously, though, very few of us have actually been _using_ container queries.** Most of the developers I’ve spoken with have only done a few brief experiments, if they’ve tried them at all. We finally have the tool we’ve been asking for, but we haven’t adopted it.

There are lots of reasons for this, but I think one of the biggest is that there’s been a lot of confusion around _how they work._ Container queries are not as straightforward as media queries. In order to use them effectively, we need to understand what the constraints are, and how to work within them.

I’ve been using container queries for a few months now, and they really are quite lovely once you have the right mental model. In this blog post, we’ll unpack all of this stuff so that you can start using them in your work!

## [Link to this heading](#the-basic-idea-1)The basic idea

So for the past couple of decades, our main tool for doing _responsive design_ has been the media query. Most commonly, we use the width of the viewport to conditionally apply some CSS:

```
@media (min-width: 40rem) {
  .mobile-only {
    display: none;
  }
}
```

Media queries are great, but they’re only concerned with _global_ properties, things like the viewport dimensions or the operating system’s color theme. Sometimes, we want to apply CSS conditionally based on something _local_, like the size of the element’s container.

For example, suppose we have a `ProfileCard` component, to display critical info about a user’s profile:

In this particular circumstance, each `ProfileCard` is pretty narrow, and so the information stacks vertically in 1 tall column.

In other circumstances, though, we might have a bit more breathing room. Wouldn’t it be cool if our ProfileCard could automatically shift between layouts, depending on the available space?

Maybe something like this:

In _some_ cases, we can use media queries for this, if our `ProfileCard` scales with the size of the viewport… But this won’t always be the case.

For example, maybe we’re arranging these cards in a flex grid like this:

Number of Profiles:3

![A grid of profile cards with two rows. The first row has 3 cards, and each card uses the 'narrow' layout. The second row has 2 cards, and each card uses the 'wide' layout.](https://www.joshwcomeau.com/images/container-queries/card-grid-demo.png)

With dynamic layouts like this, each `ProfileCard` will use whichever layout makes the most sense given the amount of space available. It has nothing to do with the size of the viewport!

Clearly, media queries aren’t the right tool for this job. Instead, we can use _container queries_ to solve this problem. Here’s what it looks like:

```
.child-wrapper {
  container-type: inline-size;
}

.child {
  /* Narrow layout stuff here */

  @container (min-width: 15rem) {
    /* Wide layout stuff here */
  }
}
```

Pretty cool, right? I'm using native CSS nesting to place the `@container` at-rule right inside the `.child` block so that all of the CSS declarations for this element are in the same chunk of CSS.

**But wait, what’s the deal with `.child-wrapper`?** What is that `container-type` property doing??

Well, this is where things get a bit tricky. In order to use a container query, we first need to explicitly define its container. This can have some unintended consequences.

**It’s worth spending a few minutes digging into this.** Understanding this core mechanism will save us _hours_ of frustration down the line. Let’s talk about the “impossible problem” with container queries.

## [Link to this heading](#solving-an-impossible-problem-2)Solving an impossible problem

For something like 20 years now, ever since “responsive design” became a thing, developers have been asking for container queries. So why are we only being introduced now??

Well, for something like 20 years, the CSS Working Group has been saying the same thing: _It’s impossible to implement container queries. It can’t be done._

**This’ll be much easier to understand with an example.** Consider this scenario:

Code Playground

Code editor:

Result

If you’re not familiar with the `fit-content` keyword, it’s a dynamic value that grows/shrinks based on the element’s content. If you add/remove some words to the paragraph, you’ll notice the paragraph change size:

**Hello world!**

Num of Characters:12

Now, let’s suppose we want to bump up the `font-size` of that bold text, depending on the size of its container. We can imagine doing something like this:

```
p {
  width: fit-content;

  @container (max-width: 10rem) {
    strong {
      font-size: 3rem;
    }
  }
}
```

This seems to make sense… When our parent `<p>` tag is 10rem or smaller, we apply `font-size: 3rem` to the `<strong>` tag within.

**But let’s really think about this.** When we change an element’s `font-size`, it doesn’t just affect the height of the characters. It also affects the element’s _width_:

**Hello World!**

font-size:1rem

When our container is 10rem or smaller, we apply styles that cause the container to grow _beyond_ 10rem. The CSS that we apply conditionally causes the condition to no longer be met!

**This next demo shows what would happen if this sort of thing were allowed.** Reduce the number of characters until the container is less than 10rem, and notice what happens:

**Hello world!** This is a sentence that includes several different words.

Num of Characters:70

This is mindbending stuff, and it took me a minute to really understand the problem here.

When our `<section>` is less than 10rem wide, our condition is met, and so we apply some CSS, bumping up the font size. But this causes our `<p>` tag to expand, which causes the parent `<section>` to grow beyond the `10rem` threshold! The CSS we write _inside_ a container query can affect the container itself, leading to these infinite loops of flickering UI.

This is the core problem that the CSS Working Group said was unsolveable. This is why we haven’t had container queries until now.

We don’t run into this problem with _media_ queries because their conditions are based on immutable global states. CSS does not give us the power to change things like the width of the viewport or the user’s motion preferences. So there’s no way for us to invalidate a media query from within it.

I’m using the `fit-content` keyword to demonstrate the issue here, but the problem is much more broad than this one niche property. Lots of things in CSS work this way, with parents dynamically responding to their children.

The solution to this unsolveable problem appeared suddenly, with the introduction of a completely unrelated API.

### [Link to this heading](#the-containment-api-3)The Containment API

The _Containment_ API, released a few years ago, allows us to specify that certain slices of the DOM are self-contained, and won’t leak out and affect other parts of the DOM.

I don’t want to go on too much of a tangent here, but here’s a quick demonstration that shows how this API works:

Image width:

contain:

none (default)size

![an axolotl in an aquarium](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fcontainer-queries%2Faxolotl-closeup.jpg&w=1080&q=75)

The axolotl is a ridiculous aquatic salamander. It’s absolutely adorable and looks like a Pokémon. It is one of my favourite animals.

By default, our red box will grow and shrink to contain its children. This is exactly the sort of dynamic behaviour that causes problems for container queries.

**By setting `contain: size` on the parent, we sever this connection.** As a result, the height of the container no longer depends on its content. If we don’t specify an explicit `height`, the container will collapse down to 0px (plus padding).

The Containment API was designed with performance optimizations in mind. CSS is a very dynamic language, and this means the browser often has to do _a lot_ of work when things change. For example: when we tweak the height of the axolotl image, it affects not only the elements within that demo, but _everything that follows in this article_. Paragraphs like this one gets shifted up and down on every size change, causing a layout recalculation and a repaint.

And so, if we _know_ that an element is self-contained and won’t affect anything else, we can use the `contain` property to let the browser know that it can skip certain calculations. A helpful analogy for React devs: it’s a bit like `React.memo()`. We can use `contain` to opt out of recalculations that we know are unnecessary.

Now, truthfully, I haven’t found myself using `contain` on a regular basis. Modern browsers are already heavily optimized and will skip calculations that are obviously unnecessary. I get the impression that `contain` is mostly intended for edge-cases, or for situations where every last drop of performance is critical.

**But this API has provided the final foundational piece for container queries!** This is how we solve the impossible problem. This API gives us the ability to “short-circuit” the infinite loop by specifying that a parent _shouldn’t_ respond dynamically to its content.

## [Link to this heading](#our-first-container-query-4)Our first container query

With all of that context in mind, let’s write a “hello world” container query:

Code Playground

Code editor:

Result

First, we declare that the `<section>` element is a container. This will allow any of its descendants to use it as a measuring stick, to apply CSS when certain conditions are met.

Next, we create a container query, selecting the `<p>` within our container and tweaking its cosmetic styles when the container is 12rem wide or less. When that condition is met, the CSS within that block will be applied, and the text will become bold and red.

If you’re viewing this on a device with a large screen, you can see this for yourself: resize the **RESULT** pane by clicking and dragging the divider, or focusing it and using the left/right arrow keys.

**There’s a problem with this implementation, though.** It becomes apparent when we give our container some cosmetic styles:

Code Playground

Code editor:

Result

Like we saw with the axolotl example, the parent element is no longer responding dynamically to its children. Instead of growing to fit the paragraphs within, it collapses down to nothing; the only reason we can see the background color at all is because this element happens to have some padding!

When we set `container-type: size`, we tell the browser that this element’s layout doesn’t depend on its children. This prevents the infinite loop we saw earlier, but it also breaks one of our core assumptions about how CSS works!

We don’t often think about it, but there’s a fundamental difference between width and height on the web:

-   When it comes to width, elements tend to expand, filling the space provided by the _parent._
    
-   When it comes to height, elements tend to shrinkwrap around their _children._
    

Consider an empty `<div>` with no CSS applied to it. It will be 0px tall, **but it won’t be 0px wide.** It’ll grow to fill the entire horizontal space, regardless of whether it has any content or not.

When we set `container-type: size`, we tell CSS to ignore its content, which means it reverts to the default behaviour of collapsing down to zero!

Fortunately, there’s another value we can use for the `container-type` property, `inline-size`:

Code Playground

Code editor:

Result

The term `inline-size` here refers to the _inline dimension,_ which is typically width.

Essentially what we’re saying here is that the _width_ of the element does not depend on its content. As a result, it can be used as a measuring stick by its descendants. The element’s _height_, by contrast, retains its default behaviour of growing/shrinking based on its content.

**The golden rule with container queries is that we can’t change what we measure.** `container-type: inline-size` lets us use `min-width`/`max-width` conditions in our container queries, but not `min-height`/`max-height`.

(Credit to [Miriam Suzanne(opens in new tab)](https://www.miriamsuzanne.com/) for coining this golden rule. Miriam is also the person who solved the impossible problem with container queries, and the main reason we have them today. She’s the best.)

## [Link to this heading](#browser-support-5)Browser support

Container queries are supported in all 4 major browsers, starting from:

-   Safari 16, introduced in September 2022
    
-   Chrome/Edge 105, introduced in August 2022
    
-   Firefox 110, introduced in February 2023
    

As I write this in November 2024, container queries are at ~93%. Here's a live embed with up-to-date values:

I should also note that my examples in this blog post use [CSS Nesting(opens in new tab)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting). This recently became a native CSS feature, though it’s been a standard feature in just about every CSS preprocessor / framework out there. If you’re not using any CSS tooling, you should also check out the [native CSS nesting browser support(opens in new tab)](https://caniuse.com/css-nesting).

## [Link to this heading](#a-new-responsive-world-6)A new responsive world

As I said in the introduction, container queries have been surprisingly underutilized. Very few of the devs I’ve spoken with have actually started using them regularly in their work.

One of the core reasons for this is that container queries are complicated, and my goal with this blog post is to help clarify them. But I think there’s another big reason why container queries haven’t been adopted, something we haven’t talked about yet.

As developers, we implement the mockups that designers prepare for us. This has always been a back-and-forth, a negotiation between what the designers want and what the developers can implement. And for almost 20 years now, we’ve made it clear that “responsive design” was limited to the viewport.

I don’t think most designers are even _aware_ that they have this exciting new capability. _It’s our job to share these developments with them,_ so that they can use them in their designs!

For the projects I work on (this blog and my course platform), I’m both the developer _and_ the designer. I have no excuse. When I [redesigned my blog](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/) over the summer, I made a conscious effort to use container queries. **And once I started thinking in terms of containers, I kept seeing opportunities to use them!**

I recently published another blog post about container queries, which is a sort of spiritual successor to this one. It goes beyond the fundamentals, and shares some of the exciting new design patterns that are made possible by container queries. You can check it out here:

### Last updated on

November 4th, 2024