---
title: "Finding an Element’s Nearest Relative Positioned Ancestor"
source: "https://css-irl.info/finding-an-elements-nearest-relative-positioned-ancestor/"
publishedDate: "2021-02-09"
category: "css"
feedName: "CSS IRL"
---

**This article was updated on 15 March 2021.**

Have you ever been faced with a CSS positioning dilemma where an element with `position: absolute` isn’t being positioned as you’d expect? Setting absolute positioning on an element will position it in relation to its nearest ancestor that has its position set to something other than `static` (the default).

![Two examples showing position of a purple element when the parent has relative positioning versus when another ancestor has it](https://css-irl.info/finding-an-elements-nearest-relative-positioned-ancestor-01.jpg)

In the above image, the absolute-positioned element is positioned with the same CSS in both examples:

```
.absolute {
  position: absolute;
  top: 100%;
  left: 0;
}
```

But it ends up in a different place in each example. This is because in the first example its parent (the pink element) has `position: relative`, whereas in the second it’s another ancestor that has relative positioning (the grey element).

See the Pen [Relative and absolute positioning](https://codepen.io/michellebarker/pen/ZEBOZdj) by Michelle Barker ([@michellebarker](https://codepen.io/michellebarker)) on [CodePen](https://codepen.io/).

It’s worth noting that if no ancestor is positioned, an element with `position: absolute` will be placed in relation to the `<body>`.

In a relatively simple example like this one, a quick examination of the CSS makes it easy to determine which ancestor has relative positioning, and we can adjust our styles accordingly if they’re not having the desired effect. But sometimes, in more complex codebases (especially with a lot of nested elements), finding which ancestor of an element has relative positioning can be a little trickier. This most commonly happens to me when building complex headers with full-width dropdown submenus: I generally need to position them in relation to the entire header, but somewhere I’ve inadvertently set `position: relative` on some other element, which breaks the desired behaviour.

Trawling through all that code can be time-consuming, but happily there is an easier way to find the nearest positioned parent in Javascript — which we can do right in the browser console.

In Chrome and Firefox, if we open the Console tab in the developer tools, we can get the currently selected element by typing `$0`. Then we can use the `offsetParent` object property to find the closest ancestor to that element that has its position set to something other than `static`. Try selecting an element and typing this into the console:

```
$0.offsetParent
```

This won’t actually tell us the position value (whether it’s `relative`, `fixed` or something else). But we can use `getComputedStyle` to find out the value of the element’s `position` property:

```
getComputedStyle($0.offsetParent).position
```

By typing `$_` into the console we can retrieve the most recently evaluated expression as a variable, which can make this quicker too:

```
$0.offsetParent
```

shows us the element. Then:

```
getComputedStyle($_).position
```

retrieves its position value.

There are a couple of caveats: `offsetParent` will return null if the element has its postion set to `fixed` or itself or its parent has `display: none`. ([See MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent) for details.)

In my experience `position: relative` is most commonly used for offsetting a descendent (as in the example I’ve used), but it’s worth bearing in mind that `fixed` or `sticky` values will also permit the behaviour — but perhaps those elements are a little easier to spot in the browser!