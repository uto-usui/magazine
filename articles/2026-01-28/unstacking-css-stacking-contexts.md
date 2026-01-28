---
title: "Unstacking CSS Stacking Contexts"
source: "https://smashingmagazine.com/2026/01/unstacking-css-stacking-contexts/"
publishedDate: "2026-01-27"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Gabriel Shoyombo)"
---

-   16 min read
-   [CSS](https://smashingmagazine.com/category/css), [Coding](https://smashingmagazine.com/category/coding), [Techniques](https://smashingmagazine.com/category/techniques), [Tools](https://smashingmagazine.com/category/tools)

In CSS, we can create “stacking contexts” where elements are visually placed one on top of the next in a three-dimensional sense that creates the perception of depth. Stacking contexts are incredibly useful, but they’re also widely misunderstood and often mistakenly created, leading to a slew of layout issues that can be tricky to solve.

Have you ever set `z-index: 99999` on an element in your CSS, and it doesn’t come out on top of other elements? A value that large should easily place that element visually on top of anything else, assuming all the different elements are set at either a lower value or not set at all.

A webpage is usually represented in a two-dimensional space; however, by applying specific CSS properties, an imaginary z-axis plane is introduced to convey depth. This plane is perpendicular to the screen, and from it, the user perceives the order of elements, one on top of the other. The idea behind the imaginary z-axis, the user’s perception of stacked elements, is that the CSS properties that create it combine to form what we call a **stacking context**.

We’re going to talk about how elements are “stacked” on a webpage, what controls the stacking order, and practical approaches to “unstack” elements when needed.

Imagine your webpage as a desk. As you add HTML elements, you’re laying pieces of paper, one after the other, on the desk. The last piece of paper placed is equivalent to the most recently added HTML element, and it sits on top of all the other papers placed before it. This is the normal document flow, even for nested elements. The desk itself represents the root stacking context, formed by the `<html>` element, which contains all other folders.

Now, specific CSS properties come into play.

Properties like `position` (with `z-index`), `opacity`, `transform`, and `contain`) act like a folder. This folder takes an element and all of its children, extracts them from the main stack, and groups them into a separate sub-stack, creating what we call a **stacking context**. For positioned elements, this happens when we declare a `z-index` value other than `auto`. For properties like `opacity`, `transform`, and `filter`, the stacking context is created automatically when specific values are applied.

[![Before (global stacking order) and after (stacking context order)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/unstacking-css-stacking-contexts/1-stacking-context-order.png)](https://files.smashing.media/articles/unstacking-css-stacking-contexts/1-stacking-context-order.png)

When the browser decides what goes on top, it stacks the folders first, not the individual papers inside them. This is “The Golden Rule” of stacking contexts that many developers miss. ([Large preview](https://files.smashing.media/articles/unstacking-css-stacking-contexts/1-stacking-context-order.png))

> Try to understand this: Once a piece of paper (i.e., a child element) is inside a folder (i.e., the parent’s stacking context), it can never exit that folder or be placed between papers in a different folder. Its `z-index` is now only relevant inside its own folder.

In the illustration below, Paper B is now within the stacking context of Folder B, and can only be ordered with other papers in the folder.

[![Before (global stacking order) and after (stacking context order)](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/unstacking-css-stacking-contexts/2-stacking-contexts.png)](https://files.smashing.media/articles/unstacking-css-stacking-contexts/2-stacking-contexts.png)

([Large preview](https://files.smashing.media/articles/unstacking-css-stacking-contexts/2-stacking-contexts.png))

Imagine, if you will, that you have two folders on your desk:

```
<div class="folder-a">Folder A</div>
<div class="folder-b">Folder B</div>
```

```
.folder-a { z-index: 1; }
.folder-b { z-index: 2; }
```

Let’s update the markup a bit. Inside Folder A is a special page, `z-index: 9999`. Inside Folder B is a plain page, `z-index: 5`.

```
<div class="folder-a">
   <div class="special-page">Special Page</div>
</div>

<div class="folder-b">
  <div class="plain-page">Plain Page</div>
</div>
```

```
.special-page { z-index: 9999; }
.plain-page { z-index: 5; }
```

Which page is on top?

It’s the `.plain-page` in Folder B. The browser ignores the child papers and stacks the two folders first. It sees Folder B (`z-index: 2`) and places it on top of Folder A (`z-index: 1`) because we know that two is greater than one. Meanwhile, the `.special-page` set to `z-index: 9999` page is at the bottom of the stack even though its `z-index` is set to the highest possible value.

Stacking contexts can also be nested (folders inside folders), creating a “family tree.” The same principle applies: a child can never escape its parents’ folder.

Now that you get how stacking contexts behave like folders that group and reorder layers, it’s worth asking: why do certain properties — like `transform` and `opacity` — create new stacking contexts?

Here’s the thing: these properties don’t create stacking contexts because of how they look; they do it because of how the browser works under the hood. When you apply `transform`, `opacity`, `filter`, or `perspective`, you’re telling the browser, _“Hey, this element might move, rotate, or fade, so be ready!”_

[![Diagram illustrating the main document layout with an applied transform that creates a new stacking context, which in turn, runs on the GPU to handle the transformation. It indicates that a new stacking context is promoted for performance.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/unstacking-css-stacking-contexts/3-diagram-stacking-context.png)](https://files.smashing.media/articles/unstacking-css-stacking-contexts/3-diagram-stacking-context.png)

([Large preview](https://files.smashing.media/articles/unstacking-css-stacking-contexts/3-diagram-stacking-context.png))

When you use these properties, the browser creates a new stacking context to manage rendering more efficiently. This allows the browser to handle animations, transforms, and visual effects independently, reducing the need to recalculate how these elements interact with the rest of the page. Think of it as the browser saying, _“I’ll handle this folder separately so I don’t have to reshuffle the entire desk every time something inside it changes.”_

But there’s a side effect. Once the browser lifts an element into its own layer, it must “flatten” everything within it, creating a new stacking context. It’s like taking a folder off the desk to handle it separately; everything inside that folder gets grouped, and the browser now treats it as a single unit when deciding what sits on top of what.

So even though the `transform` and `opacity` properties might not appear to affect the way that elements stack visually, they do, and it’s for performance optimisation. Several other CSS properties can also create stacking contexts for similar reasons. [MDN provides a complete list](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context#features_creating_stacking_contexts) if you want to dig deeper. There are quite a few, which only illustrates how easy it is to inadvertently create a stacking context without knowing it.

## The “Unstacking” Problem

Stacking issues can arise for many reasons, but some are more common than others. Modal components are a classic pattern because they require toggling the component to “open” on a top layer above all other elements, then removing it from the top layer when it is “closed.”

I’m pretty confident that all of us have run into a situation where we open a modal and, for whatever reason, it doesn’t appear. It’s not that it didn’t open properly, but that it is out of view in a lower layer of the stacking context.

This leaves you to wonder “how come?” since you set:

```
.overlay {
  position: fixed; /* creates the stacking context */
  z-index: 1; /* puts the element on a layer above everything else */
  inset: 0; 
  width: 100%; 
  height: 100vh; 
  overflow: hidden;
  background-color: #00000080;
}
```

This looks correct, but if the parent element containing the modal trigger is a child element within another parent element that’s also set to `z-index: 1`, that technically places the modal in a sublayer obscured by the main folder. Let’s look at that specific scenario and a couple of other common stacking-context pitfalls. I think you’ll see not only how easy it is to inadvertently create stacking contexts, but also how to mismanage them. Also, how you return to a managed state depends on the situation.

### Scenario 1: The Trapped Modal

See the Pen \[Scenario 1: The Trapped Modal (Problem) \[forked\]\](https://codepen.io/smashingmag/pen/pvbddjd) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

See the Pen [Scenario 1: The Trapped Modal (Problem) \[forked\]](https://codepen.io/smashingmag/pen/pvbddjd) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

If you click the “Open Modal” button in the header, you’ll notice that the overlay and modal appear behind the main content. This is because the modal is a child of the header container, which has a lower stacking context order (`z-index: 1`) than the main container (`z-index` of `2`). Despite the modal overlay and the modal having `z-index` values of `9998` and `9999`, respectively, the main container with a `z-index: 2` still sits right above them.

### Scenario 2: The Submerged Dropdown

See the Pen \[Scenario 2: The Submerged Dropdown (Problem) \[forked\]\](https://codepen.io/smashingmag/pen/zxBPPvm) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

See the Pen [Scenario 2: The Submerged Dropdown (Problem) \[forked\]](https://codepen.io/smashingmag/pen/zxBPPvm) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

Here, we have a similar issue with the first scenario. When you hover over the “services” link, the dropdown shows, but behind the main container. I intentionally set the main container’s `margin-top` to `20px` to make the dropdown visible enough for you to see it appear, but keep it just behind the main container. This is another popular issue front-end developers encounter, stemming from context stacking. While it is similar to the first scenario, there’s another approach to resolving it, which will be explored soon.

### Scenario 3: The Clipped Tooltip

Now, this is an interesting one. It’s not about which element has the higher `z-index`. It’s about `overflow: hidden` doing [what it’s designed to do](https://www.smashingmagazine.com/2021/04/css-overflow-issues/): preventing content from visually escaping its container, even when that content has `z-index: 1000`.

See the Pen \[Scenario 3: The Clipped Tooltip (Problem) \[forked\]\](https://codepen.io/smashingmag/pen/GgqOOoo) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

See the Pen [Scenario 3: The Clipped Tooltip (Problem) \[forked\]](https://codepen.io/smashingmag/pen/GgqOOoo) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

Who would have thought `overflow: hidden` could stop a `z-index: 1000`? Well, it did stop it, as you can see in the Codepen above.

I think developers trust `z-index` so much that they expect it to pull them out of any obscurity issue, but in reality, it doesn’t work that way. Not that it isn’t powerful, it’s just that other factors determine its ability to push your element to the top.

Before you slap `z-index` on that element, remember that while this might get you out of the current jam, it might also throw you into a greater one [that even `z-index: infinity` won’t get you out of](https://www.matuzo.at/blog/2025/never-lose-a-z-index-battle-again).

Let’s try to understand the problem before attempting to fix it.

## Identifying The Trapped Layer

When you encounter an issue such as those listed above, it is helpful to know that the element isn’t possessed; instead, an ancestor has sinned, and the child is paying the debt. In non-spiritual English terms, the obscured element isn’t the problem; an ancestor element has created a lower-level stacking context that has led the children to be below the children of a parent with a higher-level stacking context.

A good way to track and find that parent is to descend into the browser’s devtools to inspect the element and make your way up, checking each parent level to see which has a property or properties that trigger a stacking context, and find out its position in the order compared to sibling elements. Let’s create a checklist to order our steps.

### Your Debugging Checklist

1.  **Inspect the Problem Element.**  
    Right-click your hidden element (the modal, the dropdown menu, the tooltip) and click “Inspect.”
2.  **Check its Styles.**  
    In the “Styles” or “Computed” pane, verify that it has the expected high `z-index` (e.g., `z-index: 9999;`).
3.  **Climb the DOM Tree.**  
    In the “Elements” panel, look at the element’s immediate parent. Click on it.
4.  **Investigate the Parent’s Styles.**  
    Look at the parent’s CSS in the “Styles” pane. You are now hunting for any property that creates a new stacking context. Look for any properties related to positioning, visual effects, and containment.
5.  **Repeat.**  
    If the immediate parent is clean, click on its parent (the grandparent of your element). Repeat Step 4. Keep climbing the DOM tree, one parent at a time, until you find the culprit.

Now, let’s apply this checklist to our three scenarios.

### Problem 1: The Trapped Modal

1.  **Inspect:** We inspect the `.modal-content`.
2.  **Check Styles:** We see `z-index: 9999`. That’s not the problem.
3.  **Climb:** We look at its parent, `.modal-container`. It has no trapping properties.
4.  **Climb Again:** We look at its parent, the **`.header`**.
5.  **Investigate:** We check the styles for `.header` and find the culprit: `position: absolute` and `z-index: 1`. This element is creating a stacking context. We’ve seen our trap! The modal’s `z-index: 9999` is “trapped” inside a `z-index: 1` folder.

### Problem 2: The Submerged Dropdown

1.  **Inspect:** We inspect the `.dropdown-menu`.
2.  **Check Styles:** We see `z-index: 100`.
3.  **Climb:** We check its parent `li`, then its parent `ul`, then its parent **`.navbar`**.
4.  Investigate: We find `.navbar` has `position: relative` and `z-index: 1`. This creates Stacking Context A.
5.  **Analyse Siblings:** This isn’t the whole story. Why is it under the content? We now inspect the sibling of `.navbar`, which is `.content`. We find it has `position: relative` and `z-index: 2` (Stacking Context B). The browser is stacking the “folders”: `.content` (2) on top of `.navbar` (1). We’ve found the root cause.

### Problem 3: The Clipped Tooltip

1.  **Inspect:** We inspect the `.tooltip`.
2.  **Check Styles:** We see `z-index: 1000`.
3.  **Climb:** We check its parent, `.tooltip-trigger`. It’s fine.
4.  **Climb Again:** We check its parent, the **`.card-container`**.
5.  **Investigate:** We scan its styles and find the culprit: `overflow: hidden`. This is a special type of trap. It clips any child that tries to render outside its boundaries, regardless of `z-index` values.

### Advanced Tooling

While climbing the DOM tree works, it can be slow. Here are tools that speed things up.

#### DevTools 3D View

Some browsers, such as Microsoft Edge (in the “More Tools” menu) and Firefox (in the “Inspector” tab), include a “3D View” or “Layers” panel. This tool is a lifesaver. It visually explodes the webpage into its different layers, showing you exactly how the stacking contexts are grouped.

[![Microsoft Edge 3D Stacking Context View](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/unstacking-css-stacking-contexts/4-microsoft-edge-stacking-context.png)](https://files.smashing.media/articles/unstacking-css-stacking-contexts/4-microsoft-edge-stacking-context.png)

Microsoft Edge 3D Stacking Context View. ([Large preview](https://files.smashing.media/articles/unstacking-css-stacking-contexts/4-microsoft-edge-stacking-context.png))

You can immediately see your modal trapped in a low-level layer and identify the parent.

#### Browser Extensions

Smart developers have built extensions to help. Tools like this [“CSS Stacking Context Inspector” Chrome extension](https://chrome.google.com/webstore/detail/z-context/jigamimbjojkdgnlldajknogfgncplbhhttps://chrome.google.com/webstore/detail/z-context/jigamimbjojkdgnlldajknogfgncplbh) add an extra `z-index` tab to your DevTools to show you information about elements that create a stacking context.

[![CSS Stacking Context Inspector Chrome extension](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/unstacking-css-stacking-contexts/5-browser-extensions.png)](https://files.smashing.media/articles/unstacking-css-stacking-contexts/5-browser-extensions.png)

([Large preview](https://files.smashing.media/articles/unstacking-css-stacking-contexts/5-browser-extensions.png))

#### IDE Extensions

You can even spot issues during development with an extension [like this one for VS Code](https://marketplace.visualstudio.com/items?itemName=mikerheault.vscode-better-css-stacking-contexts), which highlights potential stacking context issues directly in your editor.

[![Better CSS Stacking Contexts Extension](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/unstacking-css-stacking-contexts/6-ide-extensions.png)](https://files.smashing.media/articles/unstacking-css-stacking-contexts/6-ide-extensions.png)

Better CSS Stacking Contexts Extension. ([Large preview](https://files.smashing.media/articles/unstacking-css-stacking-contexts/6-ide-extensions.png))

## Unstacking And Regaining Control

After we’ve identified the root cause, the next step is to deal with it. There are several approaches you can take to tackle this problem, and I’ll list them in order. You can choose anyone at any level, though; no one can complain or obstruct another.

### Change The HTML Structure

This is considered the optimal fix. For you to run into a stacking context issue, you must have placed some elements in funny positions within your HTML. Restructuring the page will help you reshape the DOM and eliminate the stacking context problem. Find the problematic element and remove it from the trapping element in the HTML markup. For instance, we can solve the first scenario, “The Trapped Modal,” by moving the `.modal-container` out of the header and placing it in the `<body>` element by itself.

```
<header class="header">
  <h2>Header</h2>
  <button id="open-modal">Open Modal</button>
  <!-- Former position -->
</header>
<main class="content">
  <h1>Main Content</h1>
  <p>This content has a z-index of 2 and will still not cover the modal.</p>
</main>

<!-- New position  -->
<div id="modal-container" class="modal-container">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <h3>Modal Title</h3>
    <p>Now, I'm not behind anything. I've gotten a better position as a result of DOM restructuring.</p>
    <button id="close-modal">Close</button>
  </div>
</div>
```

When you click the “Open Modal” button, the modal is positioned in front of everything else as it’s supposed to be.

See the Pen \[Scenario 1: The Trapped Modal (Solution) \[forked\]\](https://codepen.io/smashingmag/pen/azZVVNP) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

See the Pen [Scenario 1: The Trapped Modal (Solution) \[forked\]](https://codepen.io/smashingmag/pen/azZVVNP) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

### Adjust The Parent Stacking Context In CSS

What if the element is one you can’t move without breaking the layout? It’s better to address the issue: **the parent establishes the context.** Find the CSS property (or properties) responsible for triggering the context and remove it. If it has a purpose and cannot be removed, give the parent a higher `z-index` value than its sibling elements to lift the entire container. With a higher `z-index` value, the parent container moves to the top, and its children appear closer to the user.

Based on what we learned in “[The Submerged Dropdown](https://smashingmagazine.com/scl/fi/ue0rufxffviprc9858j25/Debugging-CSS-Stacking-Contexts.paper?rlkey=ezbdaiq6mojvb7xzezxlds29b&dl=0#:uid=376729122027939635792428&h2=Problem-2:-The-Submerged-Dropd)” scenario, we can’t move the dropdown out of the navbar; it wouldn’t make sense. However, we can increase the `z-index` value of the `.navbar` container to be greater than the `.content` element’s `z-index` value.

```
.navbar {
  background: #333;
  /* z-index: 1; */
  z-index: 3;
  position: relative;
}
```

With this change, the `.dropdown-menu` now appears in front of the content without any issue.

See the Pen \[Scenario 2: The Submerged Dropdown (Solution) \[forked\]\](https://codepen.io/smashingmag/pen/YPWEEWz) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

See the Pen [Scenario 2: The Submerged Dropdown (Solution) \[forked\]](https://codepen.io/smashingmag/pen/YPWEEWz) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

### Try Portals, If Using A Framework

In frameworks like [React](https://react.dev/reference/react-dom/createPortal) or [Vue](https://www.digitalocean.com/community/tutorials/vuejs-portal-vue), a Portal is a feature that lets you render a component outside its normal parent hierarchy in the DOM. Portals are like a teleportation device for your components. They let you render a component’s HTML anywhere in the document (typically right into `document.body`) while keeping it logically connected to its original parent for props, state, and events. This is perfect for escaping stacking context traps since the rendered output literally appears outside the problematic parent container.

```
ReactDOM.createPortal(
  <ToolTip />,
  document.body
);
```

This ensures your dropdown content isn’t hidden behind its parent, even if the parent has `overflow: hidden` or a lower `z-index`.

In the “The Clipped Tooltip” scenario we looked at earlier, I used a Portal to rescue the tooltip from the `overflow: hidden` clip by placing it in the document body and positioning it above the trigger within the container.

See the Pen \[Scenario 3: The Clipped Tooltip (Solution) \[forked\]\](https://codepen.io/smashingmag/pen/myEqqEe) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

See the Pen [Scenario 3: The Clipped Tooltip (Solution) \[forked\]](https://codepen.io/smashingmag/pen/myEqqEe) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

## Introducing Stacking Context Without Side Effects

All the approaches explained in the previous section are aimed at “unstacking” elements from problematic stacking contexts, but there are some situations where you’ll actually need or want to create a stacking context.

Creating a new stacking context is easy, but all approaches come with a side effect. That is, except for using [`isolation: isolate`](https://css-tricks.com/almanac/properties/i/isolation/). When applied to an element, the stacking context of that element’s children is determined relative to each child and within that context, rather than being influenced by elements outside of it. A classic example is assigning that element a negative value, such as `z-index: -1`.

Imagine you have a `.card` component. You want to add a decorative shape that sits behind the `.card`’s text, but on top of the card’s background. Without a stacking context on the card, `z-index: -1` sends the shape to the bottom of the root stacking context (the whole page). This makes it disappear behind the `.card`’s white background:

See the Pen \[Negative z-index (problem) \[forked\]\](https://codepen.io/smashingmag/pen/QwEOOEM) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

See the Pen [Negative z-index (problem) \[forked\]](https://codepen.io/smashingmag/pen/QwEOOEM) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

To solve this, we declare `isolation: isolate` on the parent `.card`:

See the Pen \[Negative z-index (solution) \[forked\]\](https://codepen.io/smashingmag/pen/MYeOOeG) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

See the Pen [Negative z-index (solution) \[forked\]](https://codepen.io/smashingmag/pen/MYeOOeG) by [Shoyombo Gabriel Ayomide](https://codepen.io/drprime01).

Now, the `.card` element itself becomes a stacking context. When its child element — the decorative shape created on the `:before` pseudo-element — has `z-index: -1`, it goes to the very bottom of the parent’s stacking context. It sits perfectly behind the text and on top of the card’s background, as intended.

## Conclusion

Remember: the next time your `z-index` seems out of control, it’s a trapped stacking context.

### References

-   [Stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context) (MDN)
-   [Z-index and stacking contexts](https://web.dev/learn/css/z-index) (web.dev)
-   “[How to Create a New Stacking Context with the Isolation Property in CSS](https://www.freecodecamp.org/news/the-css-isolation-property/)”, Natalie Pina
-   “[What The Heck, z-index??](https://www.joshwcomeau.com/css/stacking-contexts/)”, Josh Comeau

### Further Reading On SmashingMag

-   “[Managing CSS Z-Index In Large Projects](https://www.smashingmagazine.com/2021/02/css-z-index-large-projects/)”, Steven Frieson
-   “[Sticky Headers And Full-Height Elements: A Tricky Combination](https://www.smashingmagazine.com/2024/09/sticky-headers-full-height-elements-tricky-combination/)”, Philip Braunen
-   “[Managing Z-Index In A Component-Based Web Application](https://www.smashingmagazine.com/2019/04/z-index-component-based-web-application/)”, Pavel Pomerantsev
-   “[The Z-Index CSS Property: A Comprehensive Look](https://www.smashingmagazine.com/2009/09/the-z-index-css-property-a-comprehensive-look/)”, Louis Lazaris

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)