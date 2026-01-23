---
title: "Playing With CodePen slideVars"
source: "https://css-tricks.com/playing-with-codepen-slidevars/"
publishedDate: "2026-01-14"
category: "css"
feedName: "css-tricks"
author: "Geoff Graham"
---

[Super cool new CodePen feature alert!](https://codepen.github.io/slideVars/) You’ve probably seen a bunch of “interactive” demos that let you changed values on the fly from a UI panel embedded directly in the demo. [Jhey’s demos](https://codepen.io/jh3y) come immediately to mind, like this one:

That’s a tool called [TweakPane](https://tweakpane.github.io/docs/v3/) doing the work. There’s another one called [Knobs](https://github.com/yairEO/knobs) by [Yair Even Or](https://css-tricks.com/author/vsync-design/) that [Adam Argyle](https://codepen.io/argyleink) often uses:

I’ve often faked it with either the [Checkbox Hack](https://css-tricks.com/the-checkbox-hack/) or a sprinkle of JavaScript when I’m demoing a very specific concept:

OK, enough examples because CodePen has a homegrown tool of its own called **[slideVars](https://codepen.github.io/slideVars/)**. All you have to do is import it and call it in the JavaScript panel:

```
import { slideVars } from "@codepen/slidevars";

slideVars.init();
```

You can import it into a project off CodePen if you’re so inclined.

That two-liner does a lot of lifting. It auto-detects CSS variables in your CSS and builds the panel for you, absolutely-positioned in the top-right corner:

It looks like you have to declare your variables on the `:root` element with default usage. I tried [scoping them directly to the element](https://codepen.io/geoffgraham/pen/YPWpEvm) and it was a no-go. It’s possible with a manual configuration, though.

Pretty cool, right? You can manually configure the input type, a value range, a default value, unit type, and yes, a scope that targets the element where the variables are defined. As far as units go, it supports all kinds of [CSS numeric units](https://css-tricks.com/css-length-units/). That includes unit-less values, though the documentation doesn’t explicitly say it. Just leave the `unit` property as an empty string (`""`).

I guess the only thing I’d like is to tell slideVars exactly what increments to use when manually configuring things. For example, unit-less values simply increment in integers, even if you define the default value as a decimal:

It works in default mode, however:

There’s a way to place the slideVars wherever you want by slapping a custom element where you want it in the HTML. It’s auto-placed at the bottom of the HTML `<body>` by default.

```
<slide-vars>
  <p>Custom Label!</p>
</slide-vars>
```

Or CSS it by selecting the custom element:

So much fun!