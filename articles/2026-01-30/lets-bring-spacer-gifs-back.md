---
title: "Let's Bring Spacer GIFs Back!"
source: "https://www.joshwcomeau.com/react/modern-spacer-gif/"
publishedDate: "2021-01-11"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Let's imagine we're building a `HomeButton` component, something we can pop in a header to make it easy for users to find their way back home.

Here's what we have so far:

Code Playground

import { ArrowUpLeft } from 'lucide-react';

function HomeButton() {
  return (
    <a href\="/"\>
      <ArrowUpLeft size\={24} />
      Go back home
    </a\>
  );
}

export default HomeButton;

We're on the right track, but our arrow icon is all “smushed up” against the text. It feels absolutely claustrophobic to me. 😬

We can fix this by wrapping our text in a `<span>` and giving it some margin:

Code Playground

import { ArrowUpLeft } from 'lucide-react';

function HomeButton() {
  return (
    <a href\="/"\>
      <ArrowUpLeft size\={24} />

      {}
      <span style\={{ marginLeft: 16 }}\>
        Go back home
      </span\>
    </a\>
  );
}

export default HomeButton;

Is `margin` really the best tool for the job, though?

Here's an alternative solution:

Code Playground

import { ArrowUpLeft } from 'lucide-react';

import Spacer from './Spacer';

function HomeButton() {
  return (
    <a href\="/"\>
      <ArrowUpLeft size\={24} />
      <Spacer size\={16} />
      Go back home
    </a\>
  );
}

export default HomeButton;

Instead of using margin, I create a new element explicitly to add some space between the icon and text!

This isn't a new idea—in fact, it's a _very old idea_. And I think it's time for a comeback.

## [Link to this heading](#some-historical-context-1)Some historical context

In the late 90s, if you were to pop open the source of a typical website, you'd likely encounter this curious fella:

```
<img alt="" src="spacer.gif" width="1" height="32" />
```

CSS didn't exist yet, and web layouts were built using HTML tables. Tables were finnicky, and an empty cell would collapse and break the layout, so developers would toss this image into a table cell to keep it open.

GIFs were used because GIFs were the only image format that supported transparency (this is pre-PNG). Our spacer friend consisted of a single transparent pixel, a completely empty image.

This versatile tool had one other purpose: it could be stretched and squashed into any size or shape, creating an invisible buffer between elements. If you wanted a bit of a gap between two tables, for example, the spacer GIF was #1 on your speed dialAround that same time, cutting-edge telephones offered the ability to store and quickly dial multiple phone numbers!.

So what happened to it? Well, the spacer GIF was a small part of a larger shift over a tumultuous decade.

CSS was added to the browser to offer an alternative to styling. The language wasn't originally designed with layout in mind, but developers quickly realized that — through the use of some clever `float` hacks — it could entirely replace table layouts!

This was debated ad nauseum online. The old guard was happy with their table layouts and their spacer GIFs and their comfortable way of life, while a new school of magpiesA cutesy name for developers who tend to early-adopt exciting new technologies advocated for eschewing HTML layouts and giving CSS sole custody of all things presentational.

This debate happened alongside another transformation on the web: the stuff we were building was getting more complex, more like applications and less like documents. “Jambalaya development”A term I just made up. Jambalaya is a dish which mixes the Cajun/Creole “Holy Trinity” of celery, onion, and green pepper. Jambalaya development, then, is when you mix HTML, CSS, and JS into one big melange. was great for getting something shipped quickly, but it was messy and hard to maintain and not as scalable.

By separating our concerns—HTML for structure, CSS for layout and presentation, JS for behaviour—we had a convention that would help us keep complexity down, ultimately making it easier to maintain things.

It became a faux pas to do anything presentational in HTML. Tags like `<font>`, `<center>`, `<strike>`, and `<marquee>` were excommunicated, and replaced with CSS alternatives. `<table>` became reserved for actual tables.

For a decade, everyone agreed that having distinct pillars for each concern was a good idea. And then Facebook released FaxJS React.js.

### [Link to this heading](#the-more-things-change-2)The more things change…

One of the defining characteristics of React.js is that HTML is created from within JS. Add in a tool like styled-components, and our three pillars have merged into oneWell, kinda. The thing about CSS-in-JS is that it's a misnomer; you're still writing CSS! It's just being preprocessed in JS.. We've come full-circle, and Jambalaya development is back en vogue.

React is undeniably a powerful tool when it comes to managing complexity in a large, sprawling web application like Facebook. Does this mean that the community made the wrong choice, all those years ago, when we separated concerns by technology?

I don't think so. I remember tinkering with web development in the early 2000s, and it was the Wild West; I remember using PHP to dynamically generate JS that would update HTML to change the CSS. It was a hot mess.

So the structure was a great idea, and it still is a great idea, but it's _not the only great idea_. There isn't One Right Way to build a product. The trick is to have _some_ sort of convention in place, so that as the app grows in size and complexity, things don't turn to spaghetti.

I really like this now-famous image:

![](https://www.joshwcomeau.com/images/snippets/separation-of-concerns.jpg)

From [Cristiano Rastelli(opens in new tab)](https://speakerdeck.com/didoo/let-there-be-peace-on-css?slide=62)

The important thing is that you can draw boundary lines. It matters less which axis those lines are drawn across.

In the original Jambalaya table-layout days, the spacer GIF was a tasty complementary ingredient. It didn't taste so good when we switched to making deconstructed sandwiches. But now that many of us are working with component-driven architectures, our code might benefit from a pinch of spacer GIF.This is my last cooking-related analogy of the article, I promise!

## [Link to this heading](#the-code-3)The code

Here's how my spacer component is written:

```
// Spacer.js
import styled from 'styled-components';

function getHeight({ axis, size }) {
  return axis === 'horizontal' ? 1 : size;
}
function getWidth({ axis, size }) {
  return axis === 'vertical' ? 1 : size;
}

const Spacer = styled.span`
  display: block;
  width: ${getWidth}px;
  min-width: ${getWidth}px;
  height: ${getHeight}px;
  min-height: ${getHeight}px;
`;

export default Spacer;
```

If you don't use styled-components/Emotion, here's a plain-React alternative:

```
// Spacer.js
import React from 'react';

const Spacer = ({
  size,
  axis,
  style = {},
  ...delegated,
}) => {
  const width = axis === 'vertical' ? 1 : size;
  const height = axis === 'horizontal' ? 1 : size;

  return (
    <span
      style={{
        display: 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style,
      }}
      {...delegated}
    />
  );
};

export default Spacer;
```

The only required prop is `size`. By default, it produces a square:

```
// Produces a 16px × 16px gap:
<Spacer size={16} />
```

You can also specify a single axis:

```
// Produces a 32px × 1px gap:
<Spacer axis="horizontal" size={32} />
```

This component uses pixel values, because I find it's often necessary to pick out-of-scale values for [optical alignment](https://www.joshwcomeau.com/css/pixel-perfection/). That said, this pattern can easily be adapted to use design tokens instead:

```
<Spacer space="sm" />
<Spacer space="md" />
<Spacer space="lg" />
<Spacer space="xl" />
```

You may wonder why I made certain decisions with my Spacer code. Let's dig into some of them!

### [Link to this heading](#a-blocky-span-4)A blocky span

Originally, my `<Spacer>` component rendered a `div` instead of a `span`, but I found it was a little limiting. According to the HTML spec, divs aren't supposed to be put within certain elements, like `p` and `button`.

`span` is a much more flexible tag, but it defaults to `display: inline`, and inline elements really aren't designed for layout tasks; you can't give them an explicit `width` or `height`, which is the whole reason we want a Spacer!

In general, I want my `<Spacer>` to separate block-level elements, so it made sense to give it `display: block` instead of `display: inline-block`. In the rare instances where I wanted to separate inline elements, it can be done with a bit of composition:

```
const InlineSpacer = styled(Spacer)`
  display: inline-block;
`;
```

#### [Link to this heading](#minimum-dimensions-5)Minimum dimensions

In addition to setting `width` and `height`, I also set `min-width` and `min-height`.

This is done because `width` is really more of a suggestion than a hard constraint. Consider this situation:

Code Playground

import { ArrowUpLeft } from 'lucide-react';

function HomeButton() {
  return (
    <a href\="/" style\={{ maxWidth: 150 }}\>
      <ArrowUpLeft size\={24} />

      {}
      <span
        style\={{
          display: 'inline-block',
          width: 16,
          height: 16,
          background: 'hotpink',
        }}
      />

      Go back home
    </a\>
  );
}

export default HomeButton;

In this example, the container's width is constrained with `maxWidth`, and we don't have enough space. I've replaced the `<Spacer>` with a pink box, so we can see what's going on.

The pink box wants to be 16px by 16px, but it's probably obvious from the rendered output that it's getting squeezed; it's not a square!

We've put the browser in a tough spot: there isn't enough space to render everything! By default, it makes an educated guess, and decides to squeeze the empty child. This is a reasonable assumption, but it's not what we want in this case!

`min-width` is a more stalwart property. It won't be pushed around. This lets us tell the browser that this element is important, and we don't want it to get squeezed. It should find a different element to pick on.

Try changing the pink box's `width` to `minWidth` to see this dynamic in action!

Why is our Spacer more important than its siblings? Because consistent spacing is absolutely critical when it comes to maintaining a professional, polished UI. I want to be able to trust that every button on my page will have a consistent gap between the icon and text, even if it means having truncated or multi-line text.

## [Link to this heading](#responsive-version-6)Responsive version

The `<Spacer />` component shown above isn't responsive; it takes up the same amount of space at every viewport.

I tend to use this component in cases like the one depicted above, situations that don't require dynamic spacing. But if I ever do run into a situation that would benefit from a responsive spacer, I'd update it to use an API like this:

```
<Spacer
  size={32}
  when={{
    lgAndUp: 64,
    xlAndUp: 96,
  }}
/>
```

I like using the prop name `when` for things that are contextual; it reads nicely (from the consumer side, at least. Which is the most important perspective IMO).

The implementation of this prop would depend on your particular styling solution and theme.

## [Link to this heading](#pros-and-cons-7)Pros and cons

Alright, so why on earth would I _want_ to do this? Why not use margin, like everyone else?

I have a few reasons:

1.  Semantically, it feels weird to me sometimes. In our home-button example, should the margin go on the back-arrow, or the text? It doesn't feel to me like either element should "own" the space. It's a distinct layout concern.
    
2.  Margins are funky. They [collapse in weird and surprising ways](https://www.joshwcomeau.com/css/rules-of-margin-collapse/). In the example above, the margin doesn't collapse, but there's an intrinsic mental overhead; I always need to keep it in mind, and factor it in.
    
3.  There are structural implications. In the example above, I wrapped the text in a `<span>`, which can cause issues in certain situations (eg. children in a grid). Putting an extra layer between parent and child can be problematic.
    
4.  Margins are fundamentally at-odds with modern component architectures. They bleed out, seeping through the component boundary, leaking into neighboring elements.
    

[More and more developers(opens in new tab)](https://mxstbr.com/thoughts/margin/) are retiring margin, and relying on layout components instead. `<Spacer>` is a great tool in that toolkit.

I started experimenting with `<Spacer>` components a couple years ago, and in that time, I've added about 100 instances to this blog (including hosted projects like my [Effective Portfolio book](https://www.joshwcomeau.com/effective-portfolio/) and [Operator Lookup](https://www.joshwcomeau.com/operator-lookup/)).

It's honestly been pretty great. I don't really have any complaints!

The biggest concern I had was around DOM size. Google recommends keeping pages [under 1500 DOM nodes(opens in new tab)](https://web.dev/dom-size/), a threshold that some of my more-complex pages exceed.

I haven't found I've needed to add _that_ many spacers, though. In practice, I treat it like my [`<ShiftBy>` component](https://www.joshwcomeau.com/snippets/react-components/shift-by/)—it's a “special agent” I can deploy in specific circumstances. Most pages will only need a small handful.

Most of my spacing concerns are handled by padding, other layout components, and `grid-gap` / `gap`. And, yes, I still do use margin sometimes, though I'm reaching for it less and less.

There are other reasons to avoid DOM pollution, such as accessibility and SEO. As far as I know, though, a few extra empty `span`s aren't harmful in these respects.

## [Link to this heading](#a-growing-trend-8)A growing trend?

As I was doing a bit of research for this blog post, I stumbled upon [spacerGIF.org(opens in new tab)](https://spacergif.org/), an API that serves spacer gifs! It isn't a relic from a decade ago, either; it's [grown 30x(opens in new tab)](https://spacergif.org/stats/) over the past year!

I suspect many readers, especially those who have been in the game for a long time, will have a visceral negative reaction to this idea. It carries a lot of baggage from the early messy days of the web. But today's ecosystem is different, and this old dog fits surprisingly nicely into a component system. Don't be so quick to write it off!

### Last updated on

June 10th, 2021