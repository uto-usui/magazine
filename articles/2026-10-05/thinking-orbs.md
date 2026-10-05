---
title: "Thinking orbs"
source: "https://www.thinkingorbs.com/"
publishedDate: "2026-10-02"
category: "design"
feedName: "Sidebar"
---

Import the Orb component and give it a state, and optionally a variant.

```
import { Orb } from "@yogesharc/thinking-orbs";

export function Thinking() {
  return (
    <span className="flex items-center gap-2 text-sm">
      <Orb state="reasoning" />
      Thinking
    </span>
  );
}
```

### Props

All optional

Prop

Type

Default

Description

state

OrbState

"base"

What the agent is doing.

variant

OrbVariant

"default"

Which look of that state.

size

number

20

Width and height in px.

speed

number

1

Speed multiplier.

shape

OrbShape

—

Another form, from @yogesharc/thinking-orbs/shapes.

render

OrbRender

—

Another way to draw it, from @yogesharc/thinking-orbs/renders.

density

number

1

Dot count multiplier.

dotSize

number

1

Dot size multiplier.

tilt

number

20

Viewing angle from above, in degrees.

paused

boolean

false

Freezes the animation.

label

string

—

Name for screen readers.

className

string

—

Tint it with text-\* classes.

### Shapes and renders

The core ships one shape and one render. Other shapes and ways of drawing it are opt-in, so only what you import lands in your bundle. Try them all in the [playground](https://www.thinkingorbs.com/playground).

```
import { Orb } from "@yogesharc/thinking-orbs";
import { cube } from "@yogesharc/thinking-orbs/shapes";
import { halftone } from "@yogesharc/thinking-orbs/renders";

<Orb state="working" shape={cube} render={halftone} />
```

[llms.txt](https://www.thinkingorbs.com/llms.txt)