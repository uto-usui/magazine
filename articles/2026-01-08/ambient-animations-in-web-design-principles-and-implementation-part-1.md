---
title: "Ambient Animations In Web Design: Principles And Implementation (Part 1)"
source: "https://smashingmagazine.com/2025/09/ambient-animations-web-design-principles-implementation/"
publishedDate: "2025-09-22"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Andy Clarke)"
---

-   9 min read
-   [Animation](https://smashingmagazine.com/category/animation), [CSS](https://smashingmagazine.com/category/css), [Design](https://smashingmagazine.com/category/design), [SVG](https://smashingmagazine.com/category/svg)

Creating motion can be tricky. Too much and it’s distracting. Too little and a design feels flat. Ambient animations are the middle ground — subtle, slow-moving details that add atmosphere without stealing the show. In this article, web design pioneer [Andy Clarke](https://stuffandnonsense.co.uk/) introduces the concept of ambient animations and explains how to implement them.

Unlike _timeline-based_ animations, which tell stories across a sequence of events, or _interaction_ animations that are triggered when someone touches something, **ambient animations** are the kind of passive movements you might not notice at first. But, they make a design look alive in subtle ways.

In an ambient animation, elements might subtly transition between colours, move slowly, or gradually shift position. Elements can appear and disappear, change size, or they could rotate slowly.

Ambient animations aren’t intrusive; they don’t demand attention, aren’t distracting, and don’t interfere with what someone’s trying to achieve when they use a product or website. They can be playful, too, making someone smile when they catch sight of them. That way, ambient animations **add depth to a brand’s personality**.

[![A three-page spread of a Quick Draw McGraw comic book including the animated cover and first two pages.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/1-quick-draw-mcgraw-comic-book.png)](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/1-quick-draw-mcgraw-comic-book.png)

Hanna-Barbera’s Quick Draw McGraw © Warner Bros. Entertainment Inc. ([Large preview](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/1-quick-draw-mcgraw-comic-book.png))

To illustrate the concept of ambient animations, I’ve recreated the cover of a [_Quick Draw McGraw_](https://en.wikipedia.org/wiki/Quick_Draw_McGraw) [comic book](https://dn720005.ca.archive.org/0/items/QuickDrawMcGrawCharlton/Quick%20Draw%20McGraw%20%233%20%28Charlton%201971%29.pdf) (PDF) as a CSS/SVG animation. The comic was published by Charlton Comics in 1971, and, being printed, these characters didn’t move, making them ideal candidates to transform into ambient animations.

**FYI**: Original cover artist [Ray Dirgo](https://www.lambiek.net/artists/d/dirgo_ray.htm) was best known for his work drawing Hanna-Barbera characters for Charlton Comics during the 1970s. Ray passed away in 2000 at the age of 92. He outlived Charlton Comics, which went out of business in 1986, and DC Comics acquired its characters.

**Tip**: You can view the complete ambient animation [code on CodePen](https://codepen.io/malarkey/pen/NPGrWVy).

[![Quick Draw McGraw ambient animations.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/2-quick-draw-mcgraw-ambient-animations.png)](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/2-quick-draw-mcgraw-ambient-animations.png)

Quick Draw McGraw ambient animations. ([Live Demo](https://codepen.io/malarkey/pen/NPGrWVy)) ([Large preview](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/2-quick-draw-mcgraw-ambient-animations.png))

## Choosing Elements To Animate

Not everything on a page or in a graphic needs to move, and part of designing an ambient animation is **knowing when to stop**. The trick is to pick elements that lend themselves naturally to subtle movement, rather than forcing motion into places where it doesn’t belong.

### Natural Motion Cues

When I’m deciding what to animate, I look for natural motion cues and think about when something would move naturally in the real world. I ask myself: _“Does this thing have weight?”_, _“Is it flexible?”_, and _“Would it move in real life?”_ If the answer’s _“yes,”_ it’ll probably feel right if it moves. There are several motion cues in Ray Dirgo’s cover artwork.

[![Vibrantly illustrated pipe adorned with two feathers on the end against a silhouetted toon title card.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/3-pipe-feathers-toon-title-card.png)](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/3-pipe-feathers-toon-title-card.png)

Pipe and feathers swing slightly. ([Large preview](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/3-pipe-feathers-toon-title-card.png))

For example, the peace pipe Quick Draw’s puffing on has two feathers hanging from it. They swing slightly left and right by three degrees as the pipe moves, just like real feathers would.

```
#quick-draw-pipe {
  animation: quick-draw-pipe-rotate 6s ease-in-out infinite alternate;
}

@keyframes quick-draw-pipe-rotate {
  0% { transform: rotate(3deg); }
  100% { transform: rotate(-3deg); }
}

#quick-draw-feather-1 {
  animation: quick-draw-feather-1-rotate 3s ease-in-out infinite alternate;
}

#quick-draw-feather-2 {
  animation: quick-draw-feather-2-rotate 3s ease-in-out infinite alternate;
}

@keyframes quick-draw-feather-1-rotate {
  0% { transform: rotate(3deg); }
  100% { transform: rotate(-3deg); }
}

@keyframes quick-draw-feather-2-rotate {
  0% { transform: rotate(-3deg); }
  100% { transform: rotate(3deg); }
}
```

### Atmosphere, Not Action

I often choose elements or decorative details that add to the vibe but don’t fight for attention.

> [Ambient animations aren’t about signalling to someone where they should look; they’re about creating a mood.](https://twitter.com/share?text=%0aAmbient%20animations%20aren%e2%80%99t%20about%20signalling%20to%20someone%20where%20they%20should%20look;%20they%e2%80%99re%20about%20creating%20a%20mood.%20%0a&url=https://smashingmagazine.com%2f2025%2f09%2fambient-animations-web-design-principles-implementation%2f)
> 
> “

Here, the chief slowly and subtly rises and falls as he puffs on his pipe.

```
#chief {
  animation: chief-rise-fall 3s ease-in-out infinite alternate;
}

@keyframes chief-group-rise-fall {
  0% { transform: translateY(0); }
  100% { transform: translateY(-20px); }
}
```

[![An illustrated Indian chief seated and puffing on a pipe against a silhouetted toon title card.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/4-chief-toon-title-card.png)](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/4-chief-toon-title-card.png)

The chief rises and falls as he puffs on his pipe. ([Large preview](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/4-chief-toon-title-card.png))

For added effect, the feather on his head also moves in time with his rise and fall:

```
#chief-feather-1 {
  animation: chief-feather-1-rotate 3s ease-in-out infinite alternate;
}

#chief-feather-2 {
  animation: chief-feather-2-rotate 3s ease-in-out infinite alternate;
}

@keyframes chief-feather-1-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-9deg); }
}

@keyframes chief-feather-2-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(9deg); }
}
```

### Playfulness And Fun

One of the things I love most about ambient animations is how they bring fun into a design. They’re an opportunity to **demonstrate personality** through playful details that make people smile when they notice them.

[![Closeup of the illustrated chief’s head and face.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/5-closeup-illustrated-chief-head.png)](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/5-closeup-illustrated-chief-head.png)

The chief’s eyebrows rise and fall, and his eyes cross. ([Large preview](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/5-closeup-illustrated-chief-head.png))

Take a closer look at the chief, and you might spot his eyebrows raising and his eyes crossing as he puffs hard on his pipe. Quick Draw’s eyebrows also bounce at what look like random intervals.

```
#quick-draw-eyebrow {
  animation: quick-draw-eyebrow-raise 5s ease-in-out infinite;
}

@keyframes quick-draw-eyebrow-raise {
  0%, 20%, 60%, 100% { transform: translateY(0); }
  10%, 50%, 80% { transform: translateY(-10px); }
}
```

## Keep Hierarchy In Mind

Motion draws the eye, and even subtle movements have a visual weight. So, I reserve the most obvious animations for elements that I need to create the biggest impact.

[![Illustrated Quick Draw McGraw holding the feather-adorned pipe with dizzy eyes veering right.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/6-illustrated-duick-draw-mcgraw.png)](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/6-illustrated-duick-draw-mcgraw.png)

Quick Draw McGraw wobbles under the influence of his pipe. ([Large preview](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/6-illustrated-duick-draw-mcgraw.png))

Smoking his pipe clearly has a big effect on Quick Draw McGraw, so to demonstrate this, I wrapped his elements — including his pipe and its feathers — within a new SVG group, and then I made that wobble.

```
#quick-draw-group {
  animation: quick-draw-group-wobble 6s ease-in-out infinite;
}

@keyframes quick-draw-group-wobble {
  0% { transform: rotate(0deg); }
  15% { transform: rotate(2deg); }
  30% { transform: rotate(-2deg); }
  45% { transform: rotate(1deg); }
  60% { transform: rotate(-1deg); }
  75% { transform: rotate(0.5deg); }
  100% { transform: rotate(0deg); }
}
```

Then, to emphasise this motion, I mirrored those values to wobble his shadow:

```
#quick-draw-shadow {
  animation: quick-draw-shadow-wobble 6s ease-in-out infinite;
}

@keyframes quick-draw-shadow-wobble {
  0% { transform: rotate(0deg); }
  15% { transform: rotate(-2deg); }
  30% { transform: rotate(2deg); }
  45% { transform: rotate(-1deg); }
  60% { transform: rotate(1deg); }
  75% { transform: rotate(-0.5deg); }
  100% { transform: rotate(0deg); }
}
```

## Apply Restraint

Just because something can be animated doesn’t mean it should be. When creating an ambient animation, I study the image and note the elements where subtle motion might add life. I keep in mind the questions: _“What’s the story I’m telling? Where does movement help, and when might it become distracting?”_

Remember, restraint isn’t just about doing less; it’s about doing the right things less often.

## Layering SVGs For Export

In “[Smashing Animations Part 4: Optimising SVGs](https://www.smashingmagazine.com/2025/06/smashing-animations-part-4-optimising-svgs/),” I wrote about the process I rely on to _“prepare, optimise, and structure SVGs for animation.”_ When elements are crammed into a single SVG file, they can be a nightmare to navigate. Locating a specific path or group can feel like searching for a needle in a haystack.

> That’s why I develop my SVGs in layers, exporting and optimising one set of elements at a time — always in the order they’ll appear in the final file. This lets me build the master SVG gradually by pasting it in each cleaned-up section.

I start by exporting background elements, optimising them, adding class and ID attributes, and pasting their code into my SVG file.

[![The toon title card with the chief and Quick Draw characters cut out with their shapes remaining.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/7-toon-title-card.png)](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/7-toon-title-card.png)

Exporting background elements. ([Large preview](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/7-toon-title-card.png))

Then, I export elements that often stay static or move as groups, like the chief and Quick Draw McGraw.

[![Showing Quick Draw pasted to the toon title card’s foreground, minus details including the pipe he is holding and his eyeballs.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/8-quick-draw-pasted-toon-title-card.png)](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/8-quick-draw-pasted-toon-title-card.png)

Exporting larger groups. ([Large preview](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/8-quick-draw-pasted-toon-title-card.png))

Before finally exporting, naming, and adding details, like Quick Draw’s pipe, eyes, and his stoned sparkles.

[![Showing Quick Draw in the same toon title card but including the details that were left out before.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/9-quick-draw-toon-title-card-details.png)](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/9-quick-draw-toon-title-card-details.png)

Adding details. ([Large preview](https://files.smashing.media/articles/ambient-animations-web-design-principles-implementation/9-quick-draw-toon-title-card-details.png))

Since I export each layer from the same-sized artboard, I don’t need to worry about alignment or positioning issues as they all slot into place automatically.

## Implementing Ambient Animations

You don’t need an animation framework or library to add ambient animations to a project. Most of the time, all you’ll need is a well-prepared SVG and some thoughtful CSS.

But, let’s start with the SVG. The key is to group elements logically and give them meaningful class or ID attributes, which act as animation hooks in the CSS. For this animation, I gave every moving part its own identifier like `#quick-draw-tail` or `#chief-smoke-2`. That way, I could target exactly what I needed without digging through the DOM like a raccoon in a trash can.

Once the SVG is set up, CSS does most of the work. I can use `@keyframes` for more expressive movement, or `animation-delay` to simulate randomness and stagger timings. The trick is to keep everything subtle and remember I’m not animating for attention, I’m animating for atmosphere.

Remember that most ambient animations loop continuously, so they should be **lightweight** and **performance-friendly**. And of course, [it’s good practice to respect users who’ve asked for less motion](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/). You can wrap your animations in an `@media prefers-reduced-motion` query so they only run when they’re welcome.

```
@media (prefers-reduced-motion: no-preference) {
  #quick-draw-shadow {
    animation: quick-draw-shadow-wobble 6s ease-in-out infinite;
  }
}
```

It’s a small touch that’s easy to implement, and it makes your designs more inclusive.

## Ambient Animation Design Principles

If you want your animations to feel ambient, more like atmosphere than action, it helps to follow a few principles. These aren’t hard and fast rules, but rather things I’ve learned while animating smoke, sparkles, eyeballs, and eyebrows.

### Keep Animations Slow And Smooth

Ambient animations should feel relaxed, so use **longer durations** and choose **easing curves that feel organic**. I often use `ease-in-out`, but [cubic Bézier curves](https://www.smashingmagazine.com/2022/10/advanced-animations-css/) can also be helpful when you want a more relaxed feel and the kind of movements you might find in nature.

### Loop Seamlessly And Avoid Abrupt Changes

Hard resets or sudden jumps can ruin the mood, so if an animation loops, ensure it cycles smoothly. You can do this by **matching start and end keyframes**, or by setting the `animation-direction` to `alternate` the value so the animation plays forward, then back.

### Use Layering To Build Complexity

A single animation might be boring. Five subtle animations, each on separate layers, can feel rich and alive. Think of it like building a sound mix — you want **variation in rhythm, tone, and timing**. In my animation, sparkles twinkle at varying intervals, smoke curls upward, feathers sway, and eyes boggle. Nothing dominates, and each motion plays its small part in the scene.

### Avoid Distractions

The point of an ambient animation is that it doesn’t dominate. It’s a **background element** and not a call to action. If someone’s eyes are drawn to a raised eyebrow, it’s probably too much, so dial back the animation until it feels like something you’d only catch if you’re really looking.

### Consider Accessibility And Performance

Check `prefers-reduced-motion`, and don’t assume everyone’s device can handle complex animations. SVG and CSS are light, but things like blur filters and drop shadows, and complex CSS animations can still tax lower-powered devices. When an animation is purely decorative, consider adding `aria-hidden="true"` to keep it from cluttering up the accessibility tree.

## Quick On The Draw

Ambient animation is like seasoning on a great dish. It’s the pinch of salt you barely notice, but you’d miss when it’s gone. It doesn’t shout, it whispers. It doesn’t lead, it lingers. It’s floating smoke, swaying feathers, and sparkles you catch in the corner of your eye. And when it’s done well, ambient animation **adds personality to a design without asking for applause**.

Now, I realise that not everyone needs to animate cartoon characters. So, in part two, I’ll share how I created animations for several recent client projects. Until next time, if you’re crafting an illustration or working with SVG, ask yourself: **What would move if this were real?** Then animate just that. Make it slow and soft. Keep it ambient.

You can view the complete ambient animation [code on CodePen](https://codepen.io/malarkey/pen/NPGrWVy).

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)