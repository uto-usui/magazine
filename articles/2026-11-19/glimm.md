---
title: "Glimm"
source: "https://glimm.dev/"
publishedDate: "2026-11-18"
category: "design"
feedName: "Sidebar"
---

Generate dataClick Generate button

glimm adds shader-driven page transitions to React and Next.js apps. A WebGL band sweeps across the screen on a route change, or on any state change you choose, and the new view appears behind it. It's about 11 KB and costs nothing until the first sweep.

$`npm install glimm`

No runtime dependencies. React 18+ and Next 14+ are peer dependencies.

## [Installation](#installation)

Install glimm with npm, or give this prompt to a coding agent.

$`npm install glimm`

Tell your coding agent

Add glimm to my Next.js app. 1. Install it: npm install glimm 2. In my root layout, import { GlimmProvider, InterceptLinks } from 'glimm/next', wrap the body's children in <GlimmProvider palette="prism">, and render <InterceptLinks /> just inside it: <GlimmProvider palette="prism"> <InterceptLinks /> {children} </GlimmProvider> Keep the rest of my layout markup unchanged.

## [Quick start](#quick-start)

Wrap your app in `GlimmProvider`, then choose a trigger from the [options](#triggers) below. The provider creates its WebGL context on the first sweep, so it costs nothing until then.

app/layout.tsx

```
// app/layout.tsx
import { GlimmProvider } from 'glimm/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <GlimmProvider>{children}</GlimmProvider>
      </body>
    </html>
  )
}
```

## [Triggers](#triggers)

There are three triggers, and you can mix them. `TransitionLink` replaces a link when you know the destination. `useTransitionRouter()` handles navigation from code, like a redirect after a form submits. `<InterceptLinks />` at the root adds transitions to every internal link, with no other code changes.

<TransitionLink>

```
import { TransitionLink } from 'glimm/next'

<TransitionLink href="/about" sweep={{ palette: 'berry' }}>
  About
</TransitionLink>
```

useTransitionRouter()

```
import { useTransitionRouter } from 'glimm/next'

function CheckoutButton() {
  const router = useTransitionRouter()
  return (
    <button onClick={() => router.push('/thanks')}>
      Complete
    </button>
  )
}
```

<InterceptLinks />

```
import { GlimmProvider, InterceptLinks } from 'glimm/next'

<GlimmProvider>
  <InterceptLinks />
  {children}
</GlimmProvider>

// Opt individual links out:
<a href="/raw" data-glimm-skip>no sweep here</a>
```

<TransitionLink>

```
import { TransitionLink } from 'glimm/next'

<TransitionLink href="/about" sweep={{ palette: 'berry' }}>
  About
</TransitionLink>
```

## [Presets](#presets)

glimm comes with 7 color palettes. Pass a name to the `palette` option. If none fit, build your own with the `{a,b,c,d}` format in Custom palette.

spectrum

prism

berry

lagoon

citrus

azure

ember

## [Easing](#easing)

Easing sets how the band speeds up and slows down as it crosses the screen. Curves like `back` and `easeOutQuart` start fast and feel snappy. Curves like `easeInOutCubic` ease in and out evenly and feel calmer. Pass one of the 10 built-in names, or your own `(p: number) => number` function.

## [Band width](#band-width)

`bandTight`sets the band's width. Lower values make it wider and softer; higher values make it narrower and sharper.

bandTight

14

Drag across the band to tune its width. Lower = wider, softer; higher = tighter, more concentrated.

## [Custom palette](#custom-palette)

A palette is defined by a cosine formula: `color(t) = a + b·cos(2π·(c·t + d))`. `a`, `b`, `c` and `d` are each an RGB triplet. Press Shuffle to generate one, then copy the snippet.

custom-palette.tsx

```
<GlimmProvider
  palette={{
    a: [0.46, 0.88, 0.33],
    b: [0.60, 0.58, 0.74],
    c: [0.50, 0.50, 0.50],
    d: [0.54, 0.22, 0.84],
  }}
>
  {children}
</GlimmProvider>
```

## [Props](#props)

Pass these to `GlimmProvider` as defaults, or to a trigger to override them for one call. All are optional.

Prop

Type

Default

Description

palette

PaletteName | Palette

'spectrum'

7 presets or BYO {a,b,c,d}.

direction

'ltr' | 'rtl' | 'ttb' | 'btt'

'ltr'

Sweep axis + side.

easing

EasingName | (p) => number

'ease'

10 built-ins or custom curve.

sweepMs

number

1100

Band traversal duration.

outroMs

number

220

Post-traversal alpha fade.

midpoint

number

0.56

When routes swap mid-sweep.

peakAlpha

number

1

Caps band peak (0..1.5).

brightness

number

1

RGB scale; ~0.85 on dark.

bandTight

number

14

Tightness; lower = wider.

waveAmount

number

0

Optional edge displacement.

rippleAmount

number

1

Vertical ripple texture.

waveSpeed

number

1

Shader animation speed.

## [Best practices](#best-practices)

Use glimm to mark a moment, not to add motion. A sweep works like punctuation: save it for changes worth noticing, and keep the rest of the app quiet.

Use glimm for:

-   Milestones: publishing, submitting or finishing something.
-   Confirmed actions: a short pause helps people notice the new state.
-   Focused modes: checkout, presentations or review screens, where the whole view changes.
-   Section-level navigation: moving to a clearly different area, not every page change within one.

Avoid using glimm for:

-   Every internal navigation: `<InterceptLinks />` makes this easy, but a sweep on every click loses its impact.
-   Passive interactions: hover, focus, tooltips, dropdowns and menus.
-   Repeated actions: adding rows, checking off items or moving through a list.
-   Loading or skeleton states: a sweep marks a finished change. It isn't a spinner.

To decide, ask whether you'd mention the moment in a changelog or launch post. If you would, glimm probably fits. If it's just “the user clicked something,” skip it.

## [Agent skill](#skill)

A skill that lets your coding agent add glimm for you. It checks whether glimm suits your site, sets it up, matches the sweep to your brand and tells you where a transition would get in the way.

$`npx skills add nomanjack/glimm-skill`

Needs Node 22.20 or later.

How it helps

1.  ### Fit check
    
    Checks whether transitions suit your site, and says so when they don't.
    
2.  ### Setup
    
    Installs glimm and wires it up for Next.js, React or plain JavaScript.
    
3.  ### Palette
    
    Builds a sweep from the brand colors in your styles.
    
4.  ### Placement
    
    Keeps the sweep for real page changes. Filters and pagination stay instant.
    
5.  ### Testing
    
    Opens your site, clicks through a few pages and checks that nothing broke.
    
6.  ### Summary
    
    Tells you what changed, which setting to try first and how to remove glimm.
    

Example prompts

## [HTML-in-Canvas](#html-in-canvas)

HTML-in-Canvas is a new browser feature that draws real HTML inside a canvas, so a shader can move the page while it keeps scrolling, clicking and working with screen readers as normal. glimm uses it to move the page along with the band instead of only passing over it, so content gathers toward what you pressed, ripples as the band goes through, and settles as the new view appears. This part of glimm is still experimental.

How glimm uses it:

-   The change happens behind the band: the old page stays in front of the band and the new page sits behind it, so the band never paints over your content.
-   The sweep matches the size of the change: an action that changes the whole page gets a full-page sweep, while refreshing a single card keeps the sweep inside that card.
-   The sweep follows the work: the page gathers while a request runs and the band breaks away as soon as the result arrives, so the sweep never adds any wait, and a failed request plays no sweep at all.

Where it works

[HTML-in-Canvas runs in Chrome 157](https://developer.chrome.com/blog/html-in-canvas) and later, which is still rolling out. On earlier versions of Chrome, it can be used by [enabling the flag](https://blog.master.dev/the-web-is-fun-again-first-experiments-with-html-in-canvas/). Every other browser gets the regular band, so nothing breaks. To use it, wrap a page, a section or a card in `GlimmScope`, which is part of glimm 0.4.

Turning it off

To keep the page still, pass `pageEffect={false}`, or add a switch with `usePageEffect()`. The choice is saved on the device and the band plays either way, and anyone with reduced motion turned on skips the sweep entirely.

settings.tsx

```
const [on, setOn] = usePageEffect()

<Switch checked={on} onCheckedChange={setOn}>
  Move the page during transitions
</Switch>
```