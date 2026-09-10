---
title: "DialKit"
source: "https://www.dialkit.dev/"
publishedDate: "2026-09-10"
category: "design"
feedName: "Sidebar"
---

Fancy

The headline is set to font weight 300. Fancy type is off.

## Demo

[![DialKit Photo Stack demo with its live control panel](https://www.dialkit.dev/_next/image?url=%2Fimages%2Fdialkit.png&w=3840&q=75&dpl=dpl_4Cp4S65pZdJdKu1qcvq5wc2uaCAW)Open Demo Link](https://www.dialkit.dev/photostack)

## Install

[](https://github.com/joshpuckett/dialkit)

```
npm install dialkit motion
```

## Usage

Mount one DialRoot and use the useDialKit hook to bind live values to your interface. In Next.js App Router, use a client component.

```
'use client' import { DialRoot, useDialKit } from 'dialkit'import 'dialkit/styles.css' export default function App() {  const values = useDialKit('Card', {    radius: [24, 0, 64],    color: '#a78bfa',  })   return (    <>      <div style={{        borderRadius: values.radius,        background: values.color,      }}>        Card      </div>      <DialRoot />    </>  )}
```

The editor is hidden in production. Add `productionEnabled` to `DialRoot` to keep it visible.

Add sliders, colors, images, pads, and spring or easing controls. Save versions as you tune, or use the timeline to edit animation timing. See the [README](https://github.com/joshpuckett/dialkit#readme) for the full API and examples.

## Prompts

The easiest way to start using DialKit is to describe what you want and let your coding agent wire it up. Here are a few prompts to try.

### Add DialKit to an existing animation:

```
I have a card component with a hover animation. Add DialKit controls so I can tune the spring timing (visualDuration and bounce), scale on hover, and shadow blur in real time. Use the adapter for my framework with a spring config and sliders.
```

### Build something new with DialKit from scratch:

```
Create a spring-animated modal component using Motion. Add DialKit controls for: the entrance spring (visualDuration and bounce), overlay opacity, content border radius, and a "replay" action button that re-triggers the entrance animation.
```

### Tune layout and spacing:

```
Add DialKit to this grid layout. I want sliders for gap, padding, column count (1-6), and card border radius. Group the card-specific controls into a "Card" folder. Use the values directly in the component's style props.
```

### Tune an animation timeline:

```
Add a DialKit timeline to this entrance animation using the adapter for my framework. Define clips for the card and its content, mount the timeline dock, and bind the interface to each clip’s current values so I can scrub, move, and resize clips. Include a replay button.
```

## Control reference

### Slider

number

Set a default, minimum, and maximum. Add a fourth number to choose the step, or use a bare number to infer the range. Drag, click, or press Enter on a focused slider to type a value.

```
radius: [24, 0, 64],spacing: [16, 0, 64, 2],scale: 1.2,
```

Radius24

Spacing16

Scale1.2

### Toggle

boolean

A boolean becomes an Off / On control. Use the returned value to toggle visibility, change a theme, or try an alternate state.

```
visible: true,
```

Visible

### Text

string

Strings become text inputs. Use the explicit text config for a placeholder or a string that looks like a color. Enter adds a line break; the field grows up to five lines.

```
title: {  type: 'text',  default: 'Make room to play.',  placeholder: 'Add a title…',},
```

Title

### Select

string

Choose from a list of strings, or use { value, label } objects for custom labels. The first option is selected when no default is given.

```
layout: {  type: 'select',  options: ['stack', 'fan', 'grid'],  default: 'stack',},
```

### Color

CSS color

Hex, RGB, HSL, OKLCH, and Display P3 colors are detected automatically. Pick a color, adjust its opacity, or switch formats. The returned value is a CSS color string.

```
accent: '#a78bfa', // Or use an explicit config:highlight: {  type: 'color',  default: 'oklch(0.7 0.2 145)',},
```

### Image

URL / data URL

Choose a supplied image, or upload or drop one up to 10 MB. Uploads stay in the browser. Omit options for an upload-only control; removing an image returns an empty string.

```
cover: {  type: 'image',  options: [    '/photos/one.avif',    '/photos/two.avif',    '/photos/three.avif',    '/photos/four.avif',  ],},
```

### Pad

{ x, y }

Adjust any two numbers together, including decimals. Give each axis its own range, step, and label—for example, Duration and Bounce. Values are returned as x and y. Hold Shift to lock an axis, or double-click to restore the defaults.

```
timing: {  type: 'pad',  x: [0.3, 0.1, 1, 0.01],  y: [0.2, 0, 1, 0.01],  labels: {    x: 'Duration',    y: 'Bounce',  },},
```

### Spring

TransitionConfig

Tune visualDuration and bounce in Time mode, or stiffness, damping, and mass in Physics mode. The curve updates as you edit. Both modes share the editor with Easing.

```
transition: {  type: 'spring',  visualDuration: 0.5,  bounce: 0.2,},
```

Loading transition editor…

### Easing

TransitionConfig

Shape a cubic Bézier curve by dragging its handles or editing the coordinates. Set a duration in seconds. The return type also includes springs, since the editor can switch modes.

```
transition: {  type: 'easing',  duration: 0.6,  ease: [0.25, 0.1, 0.25, 1],},
```

Loading transition editor…

### Action

onAction(path)

Trigger a callback instead of storing a value. Handle the action in your panel’s onAction option. Actions inside folders pass their full path, such as 'shadow.reset'.

```
replay: {  type: 'action',  label: 'Replay animation',},
```

### Folder

nested object

Nest a plain object to group related controls. Values keep the same nesting: shadow.blur, for example. Add \_collapsed: true to start closed; that setting is omitted from returned values.

```
shadow: {  blur: [12, 0, 40],  opacity: [0.25, 0, 1],},
```

Blur12

Opacity0.25

For controllers, presets, persistence, and keyboard shortcuts, see the [full API reference](https://github.com/joshpuckett/dialkit/blob/main/docs/reference.md).

## Timeline

Define animation clips in code, then tune them together. This example staggers the card, title, and details. Press Play to watch it, or drag the ruler to scrub through each moment. Move a clip to change when it starts, drag its edges to adjust its duration, or click it to edit its values and curve.

Each clip has a start time, `at`, and a `duration` in seconds. Bind its `current` values to your interface so it follows the playhead. Mount one `DialTimeline` to show the editor; it works independently of `DialRoot`.

```
'use client' import { DialTimeline, useDialTimeline } from 'dialkit'import 'dialkit/styles.css' export default function Card() {  const timeline = useDialTimeline('Card', {    enter: {      at: 0,      duration: 0.7,      from: { y: 24, opacity: 0 },      to: { y: 0, opacity: 1 },      transition: { type: 'spring', bounce: 0.2 },    },  })   return (    <>      <div style={{        opacity: timeline.enter.current.opacity,        transform: `translateY(${timeline.enter.current.y}px)`,      }}>        Make room to play.      </div>      <DialTimeline />    </>  )}
```

Add more clips, sequences, property tracks, groups, or loops as the animation grows. Use `play()`, `pause()`, `replay()`, and `seek(seconds)` to control playback from your app. When you’re happy with the timing, use Copy to apply it to your production animation, replacing the `current` bindings before removing the timeline. See the [timeline guide](https://github.com/joshpuckett/dialkit/blob/main/docs/timeline.md) for the full API and framework adapters.