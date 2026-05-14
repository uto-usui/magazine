---
title: "@web-kits/audio"
source: "https://audio.raphaelsalaja.com/"
publishedDate: "2026-05-13"
category: "design"
feedName: "Sidebar"
author: "@raphaelsalaja"
---

@web-kits/audio is a declarative audio synthesis library for the web. Define sounds as plain objects and play them with a single function call.

Enable Notifications

## Quickstart

Install `@web-kits/audio` with your package manager of choice.

Define a sound as a plain object and call the returned function to play it.

```
import { defineSound } from "@web-kits/audio";

const pop = defineSound({
  source: { type: "sine", frequency: { start: 400, end: 150 } },
  envelope: { decay: 0.05 },
  gain: 0.35,
});

pop();
```

## Get Started

## Integrate

## Information