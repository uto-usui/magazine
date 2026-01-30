---
title: "Building a Magical 3D Button"
source: "https://www.joshwcomeau.com/animation/3d-button/"
publishedDate: "2021-03-30"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

I had a neat realization recently: Buttons are the “killer feature” of the web.

Every significant thing we do online, from ordering food to scheduling an appointment to playing a video, involves pressing a button. Buttons (and the forms they submit) make the web dynamic and interactive and powerful.

But so many of those buttons are lackluster. They can trigger enormous changes in the real world, but they don't feel tangible at all. The feel like dull everyday pixels.

In this tutorial, we'll build a whimsical 3D button:

## [Link to this heading](#our-strategy-1)Our strategy

There's one main trick we'll use a couple times in this tutorial to create the _illusion_ of a 3D button.

Here's how it works: when the user interacts with our button, we'll slide a foreground layer up and down, in front of a stationary background:

Reveal:0

(Try interacting with the button, after you’ve slid the “Reveal” slider!)

**Why not use `box-shadow` or `border`?** Those properties are _super_ expensive to animate. If we want a buttery-smooth transition on the button, we'll have way more success with this strategy.

Here's our MVP button in code:

Code Playground

HTML

Code editor:

Result

Our `button` element provides the burgundy background color that simulates the bottom edge of our button. We also strip away the default border/padding that comes with `button` elements.

`.front` is our foreground layer. it gets a bright pink-crimson background color, as well as some text styles.

We'll slide the foreground layer around with `transform: translate`. This is the best way to accomplish this effect, since transforms can be hardware-accelerated.

While the mouse is held down on the button, the `:active` styles will apply. We'll shift the front layer down so that it sits 2px above the bottom. We could drop it to 0px, but I want to keep the 3D illusion going at all times.

## [Link to this heading](#the-details-2)The details

We've created a solid foundation, and now it's time to build some cool stuff on top of it!

### [Link to this heading](#focus-outlines-3)Focus outlines

Most browsers will add an outline to a button when it's clicked, to indicate that the element has captured focus.

Here's what this looks like by default, on Chrome / MacOS:

In the MVP above, I took the liberty of adding an `outline-offset` declaration. This property gives our button a bit of a buffer:

```
.pushable {
  outline-offset: 4px;
}
```

This is a dramatic improvement, but it's still a bit of an eyesore. Plus, it doesn't work consistently: on Firefox, `outline-offset` doesn't work for the default "focus" outlines.

We can't simply remove it, though—that outline is _super_ important for folks who navigate using their keyboard. They rely on it to let them know which element is focused.

Fortunately, we can use a swanky CSS pseudo-class to help us out: `:focus-visible`

Code Playground

Code editor:

Result

That's one heck of a selector, so let's break it down.

The `:focus` pseudo-class will apply its declarations when an element is focused. This works regardless of whether the element is focused by tabbing to it on the keyboard, or by clicking it with a mouse.

`:focus-visible` is similar, but it only applies when the element is focused _and_ the user would benefit from seeing a visual focus indicator (because they're using a keyboard to navigate, for example).

Finally, `:not` allows us to mix in some logic. The styles will apply when the element matches the `:focus` selector, but _not_ the `:focus-visible` selector. In practical terms, this means that we'll hide the outline when the button is focused and the user is using a pointer device (eg. a mouse, a trackpad, a finger on a touchscreen).

### [Link to this heading](#a-hover-state-4)A hover state

So, in real life, buttons don't rise up to meet your finger before you press on it.

But wouldn't it be cool if they did?

Let's shift the button up by a few pixels when they hover. Also, let's slap a `transition` on the front layer. This will animate the state changes, producing a more fluid interaction.

Code Playground

Code editor:

Result

I add the `will-change: transform` declaration so that this animation can be hardware-accelerated. This topic is covered in my [Introduction to CSS Transitions](https://www.joshwcomeau.com/animation/css-transitions/).

### [Link to this heading](#injecting-personality-5)Injecting personality

With a blanket `transition: transform 250ms`, we've given our button an animation, but it still doesn't have much in the way of .

Let's consider the different actions that can be performed on this button:

-   It can be pressed
    
-   It can be released
    
-   It can be hovered
    
-   It can be departed from (when the user mouses away)
    

Should each of these actions share the same characteristics? I don't think so. I want the button to snap down quickly when clicked, and I want it to bounce back when released. When the cursor wanders away, I want it to sink back to its natural position at a glacial pace.

Here's what that looks like. Try interacting with the button to see the difference:

Code Playground

Code editor:

Result

We can set overrides for each state, to change how the animation behaves. In addition to picking different speeds, we can _also_ change the timing functions!

Our default transition, inside `.front`, is applied when the mouse leaves the button. It's our "return to equilibrium" transition. I've given it a leisurely duration of 600ms—an eternity when it comes to micro-interactions. I've also given it a custom easing curve, via `cubic-bezier`.

I'll be writing more about cubic Bézier curves soon. In essence, they let us create our own timing curve. This is a lower-level tool that gives us _a ton_ of control.

In the case of our “equilibrium” curve, it's essentially a more-aggressive `ease-out`:

Timeline

When we press down on the button, we switch to our `:active` transition. I've chosen a lightning-quick transition time of 34ms—roughly 2 frames at 60fps. I want this one to be speedy, since this is how people tend to press buttons in real life!

Finally, our `:hover` transition. This state tackles two separate actions:

-   The rise-up when mousing over the button
    
-   The snap-back after releasing the button
    

Ideally, I would pick different transitions for each of these actions, but it isn't possible in pure CSS. If I _really_ wanted to go the extra mile, I'd need to write some JS to disambiguate between these states.

I've crafted a "springy" Bézier curve that overshoots a little bit. This gives the button a ton more personality. Here's what this curve looks like:

Timeline

Ultimately, Bézier curves will never look _quite_ as lush as [spring physics](https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/), but they can get pretty close with enough tinkering!

### [Link to this heading](#adding-a-shadow-6)Adding a shadow

To _really_ sell the whole “3D” thing, we can add a shadow:

You may be tempted to reach for `box-shadow` to accomplish this, but we'll have much more success by repeating a trick we saw earlier. Our shadow will be a separate layer, and it'll move in the _opposite direction_ of our front layer.

Reveal:0

In order for this to work, we'll need to restructure things a bit. Here's the markup for our new setup:

```
<button>
  <span class="shadow"></span>
  <span class="edge"></span>
  <span class="front">Push Me</span>
</button>
```

Before, we were using the `<button>` itself as our edge layer. Now, though, we need a shadow to sit below it. Our `<button>` will become a wrapper, holding 3 layers stacked one on top of the other.

Here's the CSS, with some stuff removed for brevity:

Code Playground

Code editor:

Result

In order to stack HTML elements, we use absolute positioning. The final layer, `.front`, uses relative positioning, since we need 1 in-flow child to give the `<button>` its width and height.

We can rely purely on DOM order; no `z-index` required to control the stacking order!

In terms of how to set the `translate`: our shadow moves in the opposite direction from our front layer. The shadow doesn't quite move as far from the baseline position: While `.front` moves up by 6px, `.shadow` only moves down by 4px. This is a subjective choice;you might prefer different values. Experimentation is encouraged!

We can also add a bit of blurring, for a softer, more natural shadow:

Blur Amount:50

This can be accomplished with the blur filter:

```
.shadow {
  filter: blur(4px);
}
```

### [Link to this heading](#color-and-aesthetics-7)Color and aesthetics

We're just about there, but we can do two more small things to complete the effect.

This first one is super subtle, but really satisfying. I apply a linear gradient to the "edge" element, to make it seem like the rounded corners are reflecting less light:

Show front layer

Show gradient

Here's the CSS for this bit:

```
.edge {
  background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
}
```

We're almost there — let's toss a cherry onto this sundae and call it a day.

The last little detail is an additional hover effect:

On hover, the button brightens. Both layers get lighter.

How should we tackle this? We could switch out the colors, but that gets a bit complicated because of the gradient we just added. Fortunately, we can leverage another CSS filter: `brightness`.

```
.pushable {
  transition: filter 600ms;
}

.pushable:hover {
  transition: filter 250ms;
  filter: brightness(110%);
}
```

On hover, the button gets 10% brighter. This affects all 3 layers. `filter` is a surprisingly performant property to animate, so we won't be stressing out the hardware too much.

### [Link to this heading](#mobile-enhancements-8)Mobile enhancements

When tapping an interactive element on mobile devices, the browser will flash a "tap rectangle" on top:

Notice the grey rectangle that flashes quickly? The color varies between iOS and Android, but the effect is constant.

Why does it do this? Well, the box can serve as helpful feedback, to confirm that you've successfully tapped the target. But our button offers plenty of feedback as-is, so we don't need it in this case.

We can remove it with this declaration:

```
.pushable {
  -webkit-tap-highlight-color: transparent;
}
```

One more thing: on iOS, if the button is held down for a second, the phone will try and select the text within the button:

Let's make the button unselectable, to improve this situation:

```
.pushable {
  user-select: none;
}
```

**With great power comes great responsibility.** We should exercise great caution when disabling browser features meant to improve usability! In this case, I feel pretty confident that we are _improving_ the experience, not degrading it, but these properties should be used extremely rarely.

## [Link to this heading](#started-from-the-button-now-we-here-9)Started from the button now we here

It's been quite a journey, but I hope you'll agree that we've built a _very_ satisfying button.

It's also very ostentatious; you probably want to be pretty selective about where you use this sort of button. I wouldn't use this button for a GDPR cookie-consent banner! But for grand and exciting actions, you now have a button that matches. 🎉

**If you found this blog post useful, I have some wonderful news for you:** I’m working on a whole course all about animation!

[![Whimsical Animations, a course from Josh W. Comeau](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fwhimsical-animations.jpg&w=1920&q=75)](https://whimsy.joshwcomeau.com/)

Animation is probably my favourite part of web development, and I’ve spent nearly two decades learning how to make spectacular animations and interactions. The course goes _way_ beyond what we covered in this tutorial. I share all of the secrets I use to create the animations on this blog.

I’m hoping to release this course in the first half of 2026. You can learn more and sign up here:

-   [Whimsical Animations(opens in new tab)](https://whimsy.joshwcomeau.com/)
    

✨ Here's the final source code for our big pushable button:

```
<style>
  .pushable {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
    transition: filter 250ms;
  }
  .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: hsl(0deg 0% 0% / 0.25);
    will-change: transform;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }
  .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background: linear-gradient(
      to left,
      hsl(340deg 100% 16%) 0%,
      hsl(340deg 100% 32%) 8%,
      hsl(340deg 100% 32%) 92%,
      hsl(340deg 100% 16%) 100%
    );
  }
  .front {
    display: block;
    position: relative;
    padding: 12px 42px;
    border-radius: 12px;
    font-size: 1.25rem;
    color: white;
    background: hsl(345deg 100% 47%);
    will-change: transform;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  .pushable:hover {
    filter: brightness(110%);
  }

  .pushable:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  .pushable:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  .pushable:hover .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }
  .pushable:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }

  .pushable:focus:not(:focus-visible) {
    outline: none;
  }
</style>

<button class="pushable">
  <span class="shadow"></span>
  <span class="edge"></span>
  <span class="front"> Push me </span>
</button>
```

### Last updated on

October 28th, 2025