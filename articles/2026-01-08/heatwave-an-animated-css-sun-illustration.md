---
title: "Heatwave: An Animated CSS Sun Illustration"
source: "https://css-irl.info/heatwave-animated-sun-illustration/"
publishedDate: "2019-07-26"
category: "css"
feedName: "CSS IRL"
---

Animated sun illustration

We’re right in the middle of a heatwave here in the UK, and things have been a little quiet on this blog while I’ve been very busy with various other projects. So I’d thought I’d take a little break today and try something a little bit fun – an animated CSS sun illustration, to capture the summer spirit (and the relentless heat)!

Initially I started layering `div`s, but then I realised I could create the whole thing with just a single element, using background gradients! The first (static) version was quite simple – I didn’t even need any pseudo elements (_fig 01_).

![Simple sun illustration](https://css-irl.info/heatwave-animated-sun-illustration.png)

Fig 01 The first iteration

But it felt quite basic. I wanted to give the sun’s rays a bit more life, and add some animation. So I added two pseudo elements (`::before` and `::after`).

## Layered gradients

The two pseudo elements, and the element itself, all have mutliple layered background gradients. These use `radial-gradient` for the glow, and `conic-gradient` for the rays. `conic-gradient` has mixed browser support at the time of writing, so the demo can only be viewed in Chrome or Safari – you won’t see anything in Firefox. Although Firefox supports `radial-gradient`, because we’re using it in combination with `conic-gradient` the whole declaration is dropped.

I gave the main body of the sun a slightly fuzzy edge by adding a few pixels between the orange colour stop and the transparent region – I didn’t want it to feel too sharp and solid:

```
.sun::after {
  background: radial-gradient(
    yellow,
    orange 27%,
    transparent calc(27% + 3px) 100%
  );
}
```

### Z-index and backgrounds

I ran into a bit of a `z-index` issue when layering my gradients – ideally I wanted the body of the sun to be on the main element and the pseudo elements to only contain the sun’s rays, so that I could animate them independently. But I couldn’t get the z-indexes to play nicely. It seems the background of the element is always going to be behind the pseudo elements, no matter what, which kind of makes sense – although if this is incorrect please let me know!

I could have easily got around this by nesting an element, but I wanted to keep the purity of the single-element solution! In the end I decided not to scale the second set of rays anyway, but having the option would be useful (without resorting to anything too complex).

## Mask-image

To give the rays a soft edge I used `mask-image` with a radial gradient over the element. [Image masking](https://developer.mozilla.org/en-US/docs/Web/CSS/mask) is similar to `clip-path` in that it is a way to show or hide part of an element. But instead of providing a path to cut out the shape, it’s more like drawing over the areas you want to show. You can use a PNG, SVG or gradient to mask, for example.

`mask-image` requires a prefix for some browsers (including Chrome):

```
.sun {
  -webkit-mask-image: radial-gradient(rgba(0, 0, 0, 1) 40%, transparent 65%);
  mask-image: radial-gradient(rgba(0, 0, 0, 1) 40%, transparent 65%);
}
```

Because I’m animating the scale of the rays I duplicated this property onto the pseudo element too, so that the same proportion would remain hidden as it scales.

## Animation

I animated the two pseudo elements so they rotated at different rates. This wasn’t quite enough, so I animated the scale of one of them too, to give the impression of a pulsating glow.

Here’s the full demo: