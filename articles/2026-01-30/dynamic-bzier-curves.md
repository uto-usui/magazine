---
title: "Dynamic Bézier Curves"
source: "https://www.joshwcomeau.com/animation/dynamic-bezier-curves/"
publishedDate: "2018-05-23"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

In 2018, I had a problem. I had been publishing my blog posts on Medium, but I was getting frustrated by the lack of control. I had all these whimsical ideas bouncing around in my head, and no outlet! And so, I decided to build my own blog.

Looking back, the first version of my blog was pretty cringy, but there was one cool feature that I'm still pretty happy with. The lime-green hero had these dramatic swoops, and they flattened out on scroll:

In this blog post, I'm going to show you how I did this. We’ll learn how to create swoopy SVGs that can be updated dynamically:

Percent Straightened:0

## [Link to this heading](#a-quick-svg-refresher-R3qjravfelb)A Quick SVG Refresher

For achieving this effect, we'll use SVG. We could also use HTML Canvas, but I generally prefer to work with SVG. It's more React-like in its API, there's less complexity in setting it up, and it's more a11y-friendly.

While doing a deep dive into SVG is beyond the scope of this post (I'd recommend the [W3Schools tutorial(opens in new tab)](https://www.w3schools.com/graphics/svg_intro.asp) for that), we'll cover the basics, and show how to create some shapes from scratch. Experienced SVG-ers can jump to [the next section](#intro-to-bezier-curves).

The simplest form of SVG drawings use shape elements, like `<rect>` or `<ellipse>`.

Try tweaking some of the values below, to build an understanding of how SVG shapes work:

Code Playground

Code editor:

Result

These shapes are straightforward and declarative, but that simplicity comes at the cost of flexibility; you can only create a handful of different shapes.

To do neat curvy things, we need to use the `<path>` element. This swiss-army-knife of an SVG primitive lets you specify a sequence of steps to execute, in a seemingly-inscrutable bundle of letters and numbers:

Code Playground

Code editor:

Result

The interactive code snippet above uses 2 commands:

-   `M`, which instructs the path to
    
    _move_ to a specific coordinate.
    
-   `L`, which instructs the path to create a _line_ from the current position to the specified coordinate.
    

After the commands `M` and `L`, we see some numbers. These can be thought of as "arguments" for the commands. In this case, the arguments are coordinates; both commands require a single X/Y pair.

In other words, we can read the above path as: "Move to `{x: 100, y: 100}`, then draw a line to `{x: 200, y: 100}`", and so on.

The coordinate system is relative to the values specified in the `viewBox`. The current viewbox specifies that the viewable area has a top-left corner of 0/0, a width of 300, and a height of 300. So all of the coordinates specified in the `path` are within that 300x300 box.

The `viewBox` is what makes SVGs scalable; we can make our SVG any size we like, and everything will scale naturally, since the elements within our SVG are relative to this 300x300 box.

The `path` element features [quite a number(opens in new tab)](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths) of these commands. There are two that are relevant for our purposes:

-   `Q`, which instructs the path to create a _quadratic_ Bézier curve.
    
-   `C`, which instructs the path to create a _cubic_ Bézier curve.
    

## [Link to this heading](#intro-to-bzier-curves-Rcqjravfelb)Intro to Bézier Curves

Bézier curves are surprisingly common. Due to their versatility, they're a staple in most graphics software like Photoshop, but they're also used as timing functions: if you've ever used non-linear CSS transitions (like the default "ease"), you've already worked with Bézier curves!

But what are they, and how do they work?

A Bézier curve is essentially a line from a _start point_ to an _end point_ that is acted upon by one or more _control points_. A control point curves the line towards it, as if the control point was pulling it in its direction.

The following line looks like a straight line, but check out what happens when you move the points around—try dragging the middle control point up and down.

The line above is a _quadratic_ Bézier curve; this means that it has a **single control point**. I'm guessing it gets its name from the fact that you can create parabola-like shapes with it:

A _cubic_ Bézier curve, in contrast, has **two** control points. This allows for much more interesting curves:

Type:

QuadraticCubic

The syntax for Bézier curves in SVG `path` definitions is a little counter-intuitive, but it looks like this. The following code is written in JSX, rather than HTML, so that I can name the variables:

The thing that makes this counter-intuitive, to me at least, is that the `startPoint` is inferred in the `Q` command; while there are 3 points needed for a quadratic Bézier curve, only 2 points are passed as arguments to `Q`.

Similarly, for a cubic Bézier curve, only the control points and the end point are provided to the `C` command.

This syntax does mean that curves can conveniently be chained together, as one curve starts where the last one ends:

Code Playground

Code editor:

Result

Ok, I think that's enough playing with vanilla SVGs. Let's see how we can leverage React to make these curves dynamic!

## [Link to this heading](#bzier-curves-in-react-Rlajravfelb)Bézier Curves in React

Up to this point, we've been looking at static SVGs. How do we make them change, over time or based on user input?

Well, in keeping with the "meta" theme of this blog post, why not examine the draggable-with-lines Bézier curves from earlier in this post?

There's a fair bit of code to manage this, even in this slightly-simplified snippet. I've annotated it heavily, which hopefully makes things easier to parse. 🤞

To summarize how this works:

-   React holds variables in component state for
    
    `startPoint`,
    
    `controlPoint`, and
    
    `endPoint`.
    
-   In the _render_ method, we build the instructions for the `path` using these state variables.
    
-   When the user clicks or taps on one of the points, we update the state to keep track of which point is moving with
    
    `draggingPointId`.
    
-   As the user moves the mouse (or finger) across the SVG's surface, we do some calculations to figure out where the currently-dragging point needs to move to. This is made complex by the fact that SVGs have their own internal coordinate system (viewBox), and so we have to translate the on-screen pixels to this system.
    
-   Once we have the new X/Y coordinate for the active point,
    
    `setState` lets React know about this state change, and the component re-renders, which causes the
    
    `path` to be re-calculated.
    

## [Link to this heading](#a-note-on-performance-Rpajravfelb)A note on performance

By using React's update cycle to manage the point coordinates, there is added overhead of letting React run its reconciliation cycle on every `mousemove`. Is this prohibitively expensive?

The answer is that it depends. React's reconciliation can be surprisingly fast, especially when dealing with such a small tree (after all, the only thing that needs to be diffed is an SVG). Especially in "production" mode, when React doesn't have to do a lot of dev warning checks, this process can take fractions of a millisecond.

I wrote an [alternative implementation(opens in new tab)](https://github.com/joshwcomeau/blog/blob/master/src/pages/posts/dynamic-bezier-curves/code/optimized-react-bezier.example) that updates the DOM directly. It does run faster (about 50% faster in my quick test), but both implementations still clock in under 1ms on modern high-end hardware. On the cheapest Chromebook I could find, the "unoptimized" one still averaged 50fps or so.

## [Link to this heading](#curve-interpolation-Rrqjravfelb)Curve Interpolation

I seem to have gotten a little side-tracked! Our original goal was to create a Bézier curve that flattens itself on scroll.

Given what we've gone over so far, we have almost all of the tools we need to solve this problem! A Bézier curve with its control point(s) directly between the start and end points is actually a straight line! So we need to transition the control points from their curvy values to a flat value.

We need a way to _interpolate values_. We know where the control points should be at 0% and 100%, but what about when the user is 25% scrolled through the content?

While we could be fancy and ease the transition, a linear transformation works just fine for our purposes. So when the user is 50% scrolled through the content, the control points will be 50% of the way between their initial curvy value, and the flat-line value.

For this, some secondary-school maths will come in handy. If you're already up to speed on interpolation, you can [skip this bit](#handling-scroll-in-react).

If you plumb the depths of your memory, you may remember how to calculate the _slope_ of a line. The slope tells you how the line changes over time. We calculate it by dividing the **change in y** over the **change in x**:

`slope` = `(y2 - y1) / (x2 - x1)` = `(Δy) / (Δx)`

There's also this rascal, the linear equation formula. This allows us to graph a straight line, and figure out the y value for a given x value. By convention, slope is given the variable a:

`y = ax + b`

How does this relate to interpolation? Well, let's imagine that our Bézier curve's control point, when it's all curvy, is 200 pixels away from its flattened position, so we'll give it an initial y value of 200. The x in this case is really a measure of progress, so we'll have it range from 0 (completely curvy) to 1 (completely flat). If we graph this line, we get this:

2001000.51.0

To clarify, this line represents the range of possible y values for a quadratic Bézier curve's control point. Our x values represent the degree of "flattening"; this is useful to us because we want to be able to provide an x value like 0.46, and figure out what the corresponding y value is (our x value will come from user input, like the percentage scrolled through the viewport).

To make our formula work, we need to know at least 2 points on this line. Thankfully, we do! We know that the initial position, fully curved, is at `{ x: 0, y: 200 }`, and we know that the curve becomes fully flattened at `{ x: 1, y: 0 }`.

-   The slope would be equal to
    
    `(Δy) / (Δx)` =
    
    `(0 - 200) / (1 - 0)` =
    
    `-200 / 1` =
    
    `-200`.
    
-   Our b value is the y-axis intercept, which is our initial curved value, 200.
    
-   x will be the ratio of scroll-through, between 0 and 1, that we'll get from our scroll handler.
    

Filling it in:

`y = -200x + 200`

If it's 25% of the way through, x will be 0.25, and so our y value would be y = (-200)(0.25) + 200 = 150, which is correct: 150 is 1/4 of the way between 200 and 0.

Here's our function that performs the above calculations:

Looks like teenage-me was wrong; algebra **is** useful and practical!

We're in the home stretch now! Time to combine all these ideas into something usable.

Let's start by building a component that contains our scroll-handler to interpolate from the bottom of the viewport to the top, and connect those values to a Bézier curve in the _render_ function:

This initial approach seems to work OK! There are two things I want to improve though:

-   The "timing" of the flattening feels wrong to me.
    
    When the curve fully enters the viewport, it's already starting to be flattened. We don't get to see it in 100%-curved form. Worse, it hasn't finished flattening by the time it scrolls out of view! This is because this page has a header that takes up the top 50px of the viewport, and we aren't taking that into account.
    
    To solve these problems, we need to define a
    
    _scrollable area_, instead of using the viewport.
    
-   This component is doing an awful lot. It feels like we could extract a couple components from this. Refactoring it would not only make it easier to follow/understand, but it would make it more reusable.
    

Let's fix these problems. Here's a refactored version:

Ahh, much nicer! The effect is more pleasant as the flattening animation happens within a smaller scroll window, and the code is easier to parse. As a bonus, our `BezierCurve` and `ScrollArea` components are generic, so they could be useful in totally different contexts.

## [Link to this heading](#another-note-on-performance-R1cqjravfelb)Another note on performance

The two versions above were written without any concern for performance. As it turns out, the performance is not so bad; on my low-end Chromebook, it stutters a little bit from time to time but mostly runs at 60fps. On my sluggish iPhone 6, it runs well enough (the biggest issue on mobile is that the browser address bar changes on scroll. Because of that, it may be wise to disable scroll-based things like this altogether on mobile).

That said, your mileage may vary. If you want to improve performance, there are a few ways this could be optimized:

-   [Throttle(opens in new tab)](https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf)
    
    the scroll-handler in `ScrollArea`
    
    that it only fires every 20ms or so. This is to calm down certain touch-screen or trackpad interfaces that can fire far more often than is required.
    
-   One of the more expensive parts of this effect is that we're interacting with the DOM, via
    
    [`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect), on every scroll event. Ideally, we could cache the position of our `ScrollArea` on mount, and then check the current scroll distance against this value.
    
    Unfortunately, this method opens up new problems. It assumes that nothing between the top of the document and your Bézier curve will change height, since our calculations assume a static distance between the two. Mobile browsers like iOS Safari will hide their chrome as you scroll down, so we'd have to factor that in as well.
    
    It's far from impossible, but it wasn't worth the trouble for me, given that performance was satisfactory on the devices I'm targeting.
    
-   By storing`scrollRatio` in state and re-rendering whenever it changes, React needs some time to work out how the DOM has changed as a result of the scroll.
    
    The refactor to extract several components, while very good for DX and reusability, also means that React has a slightly more complex tree to reconcile.
    
    This all sounds a bit scary, but as we discovered earlier, React's reconciliation process is very quick on small trees like this. The cost of the refactor was negligible on my chromebook.
    
    If you really need to extract every drop of performance, you could work with the DOM directly, by setting the new
    
    `path` instructions using
    
    `setAttribute`. Note that you'd need to store everything in 1 component again.
    

## [Link to this heading](#in-conclusion-R1fajravfelb)In Conclusion

Whew, you made it through this Bézier deep-dive!

The technique described in this blog post is foundational, and there's tons of flourishes you can add on top of it:

-   This blog uses 3 layered Bézier curves with different fill colours to provide depth to the experience.
    
-   You can experiment with different easings for the interpolation (Bézier curves are often used for
    
    [timing functions(opens in new tab)](http://cubic-bezier.com/)
    
    , after all!). What if the curve got
    
    _even more dramatic_ before smoothing it out?
    
-   You could experiment with
    
    [spring physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/), to give the transition inertia.
    

I'm excited to see what you build with this technique! Let me know [on Bluesky(opens in new tab)](https://bsky.app/profile/joshwcomeau.com).

## [Link to this heading](#additional-reading-R1iajravfelb)Additional Reading

Learn more about the math and mechanics behind Bézier curves with these two amazing resources:

### Last updated on

May 23rd, 2018