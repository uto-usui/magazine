---
title: "Tegaki"
source: "https://tegaki.ink/"
publishedDate: "2026-11-26"
category: "design"
feedName: "Sidebar"
---

手書き _tegaki_, Japanese for “handwriting”

## Every font, written by hand: Tegaki, the handwriting animation library and generator.

An open-source handwriting animation library for any font. Tegaki extracts each glyph's strokes, their order and width, and draws them stroke by stroke on a canvas over real, selectable text.

EnglishCaveat

JapaneseKlee One

ArabicAmiri

HindiTillana

HebrewSuez One

KoreanNanum Pen Script

ChineseLXGW WenKai

01

## Controlled _time_

Pass a time in seconds, a `'50%'` progress, or `'css'` to read it from the `--tegaki-progress` custom property. The renderer seeks to that instant in either direction, so the pen can follow a scroll timeline, a slider, or a video frame.

Scroll-linked`time="css" + animation-timeline: view()`

`0.00s / 0.00s`

Scrubbed`time={seconds}`

02

## _Multilingual_ text

Hebrew and Arabic right to left with positional forms, Devanagari and Bengali headlines drawn across the word, and Japanese, Korean and Chinese in reference stroke order (KanjiVG, Make Me a Hanzi). Text is shaped with HarfBuzz. These are the scripts the bundled fonts cover; the Studio makes a bundle from any other font.

Filling the pen with Parisienne…

_“handwriting”_

Contextual alternates and ligatures, shaped by HarfBuzz exactly as the browser sets them.

`Parisienne`

03

## _Plugins_

A plugin reshapes the strokes, retimes them, or paints them (under the ink, over it, or instead of it) and composes with the others in order. The built-in effects (glow, wobble, gradients, taper) are plugins too. Each card below runs one or a few of the Studio's demo plugins, written against the same public API.

rainbow.ts

```
import { createPlugin } from 'tegaki/core';

/** Every letter a color of its own, round the color wheel. */
export const rainbow = createPlugin({
  name: 'rainbow',
  params: {
    step: { type: 'number', default: 30 },
  },
  setup: ({ step }) => ({
    paint(s, next) {
      const hue = s.stroke.entryIndex * step;
      next({ ...s, style: `hsl(${hue} 80% 50%)` });
    },
  }),
});
```

```
<TegakiRenderer font={caveat} plugins={[rainbow()]}>
```

04

## _Editable_ text

The canvas draws over real DOM text, so it selects, copies and reads out to screen readers. With `editable` it takes input: each letter you type is written as it arrives.

05

## _Streaming_ text

Update `text` as tokens arrive and the pen continues from where it is. `catchUp` raises the playback speed while the pen is behind the stream.

```
<TegakiRenderer
  font={caveat}
  time={{ mode: 'uncontrolled', speed: 3, catchUp: 0.6 }}
>
  {streamedText}
</TegakiRenderer>
```

assistant

06

## Every _framework_

One engine with adapters for React, Svelte, Vue, SolidJS, Astro, Web Components and vanilla JS, plus Remotion for video. Thirteen fonts ship ready to import; the Studio generates bundles from any other font in the browser.

```
import { TegakiRenderer } from 'tegaki';
import caveat from 'tegaki/fonts/caveat';

export const Note = () => (
  <TegakiRenderer font={caveat} style={{ fontSize: 56 }}>
    Hello, world!
  </TegakiRenderer>
);
```

```
<script>
  import { TegakiRenderer } from 'tegaki/svelte';
  import caveat from 'tegaki/fonts/caveat';
</script>

<TegakiRenderer font={caveat} text="Hello, world!"
  style="font-size: 56px" />
```

```
<script setup>
import { TegakiRenderer } from 'tegaki/vue';
import caveat from 'tegaki/fonts/caveat';
</script>

<template>
  <TegakiRenderer :font="caveat" text="Hello, world!" />
</template>
```

```
import { TegakiRenderer } from 'tegaki/solid';
import caveat from 'tegaki/fonts/caveat';

export const Note = () => (
  <TegakiRenderer font={caveat} text="Hello, world!"
    style={{ 'font-size': '56px' }} />
);
```

```
---
import TegakiRenderer from 'tegaki/astro';
import caveat from 'tegaki/fonts/caveat';
---

<TegakiRenderer font={caveat} text="Hello, world!" />
```

```
<tegaki-renderer font="Caveat" text="Hello, world!">
</tegaki-renderer>

<script type="module">
  import { registerTegakiElement, TegakiEngine } from 'https://esm.sh/tegaki/wc';
  import caveat from 'https://esm.sh/tegaki/fonts/caveat';
  TegakiEngine.registerBundle(caveat);
  registerTegakiElement();
</script>
```

```
import { TegakiEngine } from 'tegaki/core';
import caveat from 'tegaki/fonts/caveat';

new TegakiEngine(document.querySelector('#note'), {
  font: caveat,
  text: 'Hello, world!',
});
```

Output

Hello, world!

07

## Frequently asked _questions_

What is Tegaki?

Tegaki is an open-source (MIT) handwriting animation library and generator. It extracts the strokes, stroke order and stroke width of every glyph in a font, then animates text being written by hand on a canvas drawn over real, selectable DOM text.

How do I add a handwriting animation to my website?

Install the package with `npm i tegaki`, import a font bundle such as `tegaki/fonts/caveat`, and render `<TegakiRenderer font={caveat}>Hello</TegakiRenderer>`. Adapters exist for React, Svelte, Vue, Nuxt, SolidJS, Astro, Web Components and vanilla JavaScript; Remotion renders the same animation to video.

Can Tegaki animate any font?

Yes. Thirteen fonts ship ready to import (two of them single-line stroke fonts), and the free Tegaki Studio generates a bundle from any Google Font or your own .ttf/.otf file in the browser, with no server. Handwriting and script fonts look most natural, but any outline font works.

Which languages and writing systems are supported?

Latin, Hebrew and Arabic (right to left, with positional forms), Devanagari and Bengali, Japanese, Korean and Simplified Chinese. Chinese, Japanese and Korean characters follow reference stroke order from KanjiVG and Make Me a Hanzi, and text is shaped with HarfBuzz.

How is Tegaki different from an SVG stroke-dashoffset animation?

A stroke-dashoffset trick traces the outline of the letters, so the pen goes around each glyph twice. Tegaki animates the centerline of each stroke with its real width, in natural stroke order, and supports timeline control, streaming text, plugins and every writing system above.

Can I control or scrub the animation?

Yes. Pass `time` as seconds, a percentage such as `'50%'`, or `'css'` to read progress from the `--tegaki-progress` custom property, so the animation can follow a slider, a scroll timeline or a video frame. Uncontrolled mode plays on its own and can loop.

Can I export a handwriting animation as a video, GIF or SVG?

Tegaki Studio exports PNG, GIF, WebM and animated SVG. For programmatic video, the Remotion integration renders handwriting frame by frame to MP4.

Is Tegaki free?

Yes. The library, the bundled fonts (each under its own open font license) and the Studio are free; the code is MIT licensed on GitHub.