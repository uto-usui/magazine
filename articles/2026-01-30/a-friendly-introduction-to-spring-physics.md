---
title: "A Friendly Introduction to Spring Physics"
source: "https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/"
publishedDate: "2020-09-21"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

Ever since I started building websites, I've been fascinated by animations. The web is full of creative examples, and whenever I discover a new one, I'm like a dragon hunting for treasure—it becomes imperative that I figure out how it works so I can add it to my collection.

Over the past decade, I've amassed quite a metaphorical fortune. 💎💰

Today I'd like to talk about one of the most precious gems in this collection: .

Spring physics are like a secret ingredient; they make all animations taste better. The motion produced using spring physics is fluid and organic. It's _believable_; springs do a better job tricking our brains into thinking that something is actually moving.

Here's a quick example. I've created the same animation, one using typical CSS easing, the other with spring physics:

Notice how the bottom ball feels just a bit more “real”? It slows to a stop in a way that CSS transitions can't replicate.

If you're trying to improve your animation skills, becoming proficient with springs is a great idea. Springs are incredibly versatile, and can have a surprisingly profound impact on the quality of an animation.

That said, I'll warn you now: spring physics are a pretty radical departure from typical CSS transitions, and they take some getting used to. The goal of this post is to get you comfortable thinking in this new paradigm; we'll focus primarily on mental models, not on any particular library or tool.

## [Link to this heading](#foundations-1)Foundations

Here's a typical CSS transition:

```
.thing {
  transform: translateX(0px);
  transition: transform 400ms ease-out;
}

.thing:hover {
  transform: translateX(100px);
}
```

In this example, we have two "variables" we can play with:

-   **Duration**. In this case, we're saying that the animation should run for 400 milliseconds, from start to end. We can speed it up by specifying a shorter duration.
    
-   **Easing**. In this case, we've given it an `ease-out` easing, which means the transition starts fast and slows down.
    

With CSS transitions, our mental model is one of timing and curves. We specify a duration, and control the acceleration/deceleration within that time window.

## [Link to this heading](#thinking-in-springs-2)Thinking in springs

Here's an _interactive spring_. Drag and release the spring to trigger the animation:

When you drag the spring down, you're storing potential energy. When you release the spring, that energy is released, and the weight bobs around for a bit before returning to equilibrium. This is a mathematical model, based on how springs work in real lifeI should probably point out: I only have a very rudimentary knowledge of the physics here. I might be oversimplifying!.

In order to adjust the characteristics of a transition, we have three variables we can tinker with: **mass, tension, and friction**. Let's look at them each in turn.

### [Link to this heading](#mass-3)Mass

Mass refers to the heft of the thing we're moving. A heavier object will move more slowly, but it also has more inertia.

These two springs are identical, aside from their mass:

Your intuition should come in handy here. Imagine how heavier items would respond when being hung on a spring.

### [Link to this heading](#tension-4)Tension

Tension refers to how tightly-wound the spring isIn real life, tension is also affected by stuff like the type of material used, the width of the coil, and so on. The tighter the spring, the more energy is released, leading to a snappy, bouncy animation:

In some libraries, this parameter is called _stiffness_.

### [Link to this heading](#friction-5)Friction

Friction is maybe the hardest to visualize, because it's not a characteristic of the spring itself; rather, it's a characteristic of the universe the spring exists withinAt least, this is how I've been interpreting it!.

Let's imagine that we were transported to an alien parallel universe, one without any friction:

In this alternative universe, springs will oscillate forever, because **friction is the force that dampens the motion**. As you sprinkle more friction into the universe, the spring becomes less and less bouncy.

In some libraries, this parameter is called _damping_.

High-friction springs are useful for creating buttery-smooth molasses motion that doesn't bounce around.

## [Link to this heading](#when-to-stick-with-css-transitions-6)When to stick with CSS transitions

Once you get the hang of using springs, it can be tempting to use them everywhere.

As awesome as springs are, they do have one big downside: There is no way to use springs from within CSS. You **have** to do it from JavaScript.

JavaScript animations aren't inherently bad—they're just as performant as CSS transitions. The trouble is the JavaScript is a busy beaver; if the main thread is busy with some other operation, your animation might stutter.

For this reason I prefer to save spring physics for animations that _really_ benefit from them. Springs are most impactful when it comes to motion; I wouldn't use them for color or opacity changes.

## [Link to this heading](#sandbox-7)Sandbox

No interactive blog post is complete without an experimental sandbox.

We've seen how mass, tension, and friction affect a spring's motion. Now you can control each of these parameters, and discover pleasant or interesting combinations.

Experimenting with parameters is the best way to develop an intuitive understanding of them!

![](https://www.joshwcomeau.com/images/a-friendly-introduction-to-spring-physics/icon-mass.png)Mass

![](https://www.joshwcomeau.com/images/a-friendly-introduction-to-spring-physics/icon-tension.png)Tension

![](https://www.joshwcomeau.com/images/a-friendly-introduction-to-spring-physics/icon-friction.png)Friction

{ mass: 1.75, tension: 200, friction: 12, }

## [Link to this heading](#prior-art-8)Prior art

Lots of people have made wonderful, helpful visualizers for springs. Here are some of my favorites:

-   [React-spring visualizer(opens in new tab)](https://react-spring-visualizer.com/)
    
-   ["Choose your weapon" parameter chooser(opens in new tab)](https://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/)
    
-   [Rodrigo Pombo's Spring Editor(opens in new tab)](https://springs.pomb.us/)
    

### Last updated on

November 3rd, 2025