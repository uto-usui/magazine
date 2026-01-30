---
title: "Introducing “Shadow Palette Generator”"
source: "https://www.joshwcomeau.com/css/introducing-shadow-palette-generator/"
publishedDate: "2021-11-16"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

A few weeks back, I shared [some of the tricks](https://www.joshwcomeau.com/css/designing-shadows/) I use to come up with lush, realistic shadows:

Typical Shadow

Optimized Shadow

There are a few strategies being deployed here, but the most critical one is _layering_. Instead of a single shadow, we stack 5 or 6 individual shadow layers. Each layer has been customized with different values for x/y offset, blur radius, spread, color, and opacity.

Even if you understand all of the theory, it's still quite difficult to figure out which numbers to plug into all of those settings. Today, I'm launching a new tool to help.

It's called [“Shadow Palette Generator”(opens in new tab)](https://joshwcomeau.com/shadow-palette/):

[![Preview image showing 3 shadows and assorted controls](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fshadow-palette%2Fpreview.png&w=3840&q=75)](https://www.joshwcomeau.com/shadow-palette/)

## [Link to this heading](#unique-aspects-1)Unique aspects

There are other (fantastic!) shadow generators out there, but I think there are two things that make this project unique:

1.  Instead of generating a single shadow, it outputs a trio of cohesive shadows, an entire palette for your application
    
2.  It operates at a higher level of abstraction
    

### [Link to this heading](#a-full-palette-2)A full palette

In modern web development, we rely heavily on design tokens. When we want to change the color of a particular element, we don't typically open up a color picker and search for a brand-new color. We select the most appropriate color from our palette, a set of pre-configured complementary colors.

Shadow Palette Generator operates on a similar principle. It produces a set of 3 shadows, representing 3 different elevations. When you wish to apply a shadow, you'll pick the best value based on how elevated you want the element to appear.

Shadows exist to give our application a sense of depth, but that illusion is spoiled if the shadows aren't consistent. When we use a cohesive set of shadows, our app will feel more realistic and tangible.

### [Link to this heading](#higher-level-of-abstraction-3)Higher level of abstraction

The `box-shadow` API is a very low-level API. You control things like the raw x/y offsets, the blur radius, and the size of the shadow.

When I want to create shadows, I don't generally think in terms of these values. Instead, I focus on the "feel" of the shadow. Should it be deep and prominent, or light and subtle? Should it be tight and crispy, or soft and blurry?

The controls in Shadow Palette Generator are designed to make it easier to come up with shadows that have a particular vibe. For example, the “Oomph” parameter controls how emphasized the shadow should be, by changing many of the underlying box-shadow values.

**Experimentation is encouraged!** Play with the controls until you come up with a shadow you like.

## [Link to this heading](#using-them-in-your-project-4)Using them in your project

After you've customized a nice set of shadows, you'll be given a CSS snippet that looks like this:

```
:root {
  --shadow-color: 123deg 45% 67%;
  --shadow-elevation-low: /* Shadow CSS */;
  --shadow-elevation-medium: /* Shadow CSS */;
  --shadow-elevation-high: /* Shadow CSS */;
}
```

This output uses CSS Custom Properties to make it easy to reuse shadow values throughout your application.

You can copy this chunk of CSS into a global CSS file, and then apply shadows like this:

```
.subtle-box {
  box-shadow: var(--shadow-elevation-low);
}
.in-your-face-box {
  box-shadow: var(--shadow-elevation-high);
}
```

## [Link to this heading](#browser-support-5)Browser support

The shadows produced by Shadow Palette Generator will render across all modern browsers, on desktop and mobile (Chrome, Firefox, Safari, and Edge).

The shadows will not show up in older browsers like Internet Explorer. This is because the output relies heavily on CSS Custom Properties, which are not supported in IE.

Even if your site/application needs to support Internet Explorer, I'd encourage you to use this tool anyway. Shadows can be thought of as a progressive enhancement; the product should still be fully usable even without shadows, after all!

## [Link to this heading](#dynamic-tint-colors-6)Dynamic tint colors

Shadow Palette Generator allows you to select a custom background color. It then generates a shadow tint based on that background color. This helps the shadow "blend in" with the background, producing a more-natural effect.

There's a problem, though: this assumes that every single shadow will be in front of a purple backdrop! In most applications, that just isn't true.

For example:

![A white box sits on top of a grey box, which sits on top of a purple background. Both boxes have purple-ish shadows. It looks funny on the inner white box.](https://www.joshwcomeau.com/images/shadow-palette/nested-shadow-boxes.png)

The outer box has a purple-tinted shadow, which makes sense, because it sits in front of a purple backdrop. But our smaller inner box also casts a purple shadow.

This effect is interesting, but it may not be what you want. **In general, the shadow color should change depending on the backdrop.**

We'll need to re-define all of the CSS variables whenever the shadow should change colors:

Code Playground

Code editor:

Result

`.inner-box` sets a new shadow color of `0deg 0% 50%`, which is a medium gray color.

We repeat the `--shadow-elevation-medium` definition. In both cases, it's equal to this value:

```
2px 4px 8px hsl(var(--shadow-color) / 0.5);
```

It isn't very DRY to have to keep copy-pasting this value whenever we want to change the shadow color. Vanilla CSS doesn't really give us the tools to solve for this, but if you use a CSS preprocessor or a CSS-in-JS library, you can avoid this duplication.

For example, here's one way to solve it with styled-components:

```
const ELEVATIONS = {
  medium: '2px 4px 8px hsl(var(--shadow-color) / 0.5)',
};

const GlobalStyles = createGlobalStyle`
  :root {
    --shadow-color: 286deg 36% 58%;
    --shadow-elevation-medium: ${ELEVATIONS.medium};
  }
`;

const Box = styled.div`
  background: hsl(0deg 0% 95%);
  box-shadow: var(--shadow-elevation-medium);
`;

const InnerBox = styled.div`
  --shadow-color: 0deg 0% 58%;
  --shadow-elevation-medium: ${ELEVATIONS.medium};
  background: white;
  box-shadow: var(--shadow-elevation-medium);
`;
```

(This is just one possible way to solve this problem. You could also use `ThemeProvider`.)

## [Link to this heading](#going-deeper-with-css-7)Going deeper with CSS

I realized while writing this blog post: even when you use generative tools like my Shadow Palette Generator, it _really_ helps if you have a rock-solid understanding of CSS.

I know _so many_ talented JS developers who have gotten stuck at a beginner-intermediate level with CSS. They know enough to get by, but their understanding is shallow. As a result, the language often feels surprising and inconsistent.

This has been my primary focus over the past year. I recently released a comprehensive, interactive online course called [CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/).

If you find CSS frustrating or counter-intuitive, I hope you'll check it out! Over 8000 developers have picked up the course so far, and the feedback has been overwhelmingly positive.

## [Link to this heading](#prior-art-8)Prior art

I took a ton of inspiration from Philipp Brumm's wonderful Smooth Shadow tool. Sadly, this tool is no longer online.

The idea of layering shadows comes from Tobias Ahlin's [seminal blog post(opens in new tab)](https://tobiasahlin.com/blog/layered-smooth-box-shadows/) on the subject.

Happy shadowcrafting!

### Last updated on

August 17th, 2025