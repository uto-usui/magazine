---
title: "Anatomy of AI input"
source: "https://ibelick.com/anatomy-ai-input"
publishedDate: "2026-09-10"
category: "design"
feedName: "Sidebar"
---

I've been building AI inputs for months now. I call this component [prompt-input](https://prompt-kit.com/docs/prompt-input?utm_source=ibelick.com) in [prompt-kit](https://prompt-kit.com/?utm_source=ibelick.com), my library of components for AI applications.

When ChatGPT launched in November 2022, the input field was simple, just a textbox and a button to send. Three years later, the input in AI products does a lot more than just send text.

Here's how an AI input actually works, layer by layer.

A group of controls that change how the model will answer: model selector, mode (code, search, tools), memory, context, etc. Sometimes you don't need a context bar, in that case don't add it just for the sake of it. Try not to overload the input.

It's usually below the input field, and it should be more discreet than the field itself. Keep only what the user needs often. Everything else should go in a menu or settings. Don't try to put everything here.

Every action in the context bar should be keyboard-accessible, and you can add shortcuts for some actions. On mobile, if space is too tight, labels+icons can become icons only.