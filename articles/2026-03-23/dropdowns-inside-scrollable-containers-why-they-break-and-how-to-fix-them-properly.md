---
title: "Dropdowns Inside Scrollable Containers: Why They Break And How To Fix Them Properly"
source: "https://smashingmagazine.com/2026/03/dropdowns-scrollable-containers-why-break-how-fix/"
publishedDate: "2026-03-20"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Godstime Aburu)"
---

-   12 min read
-   [CSS](https://smashingmagazine.com/category/css), [Tools](https://smashingmagazine.com/category/tools), [Techniques](https://smashingmagazine.com/category/techniques), [JavaScript](https://smashingmagazine.com/category/javascript)

Dropdowns often work perfectly until they’re placed inside a scrollable panel, where they can get clipped, and half the menu disappears behind the container’s edge. Godstime Aburu explains why this happens and offers practical solutions to fix it.

The scenario is almost always the same, which is a data table inside a scrollable container. Every row has an action menu, a small dropdown with some options, like **Edit**, **Duplicate**, and **Delete**. You build it, it seems to work perfectly in isolation, and then someone puts it inside that scrollable `div` and things fall apart. I’ve seen this exact bug in three different codebases: the container, the stack, and the framework, all different. The bug, though, is totally identical.

The dropdown gets clipped at the container’s edge. Or it shows up behind content that should logically be below it. Or it works fine until the user scrolls, and then it drifts. You reach for `z-index: 9999`. Sometimes it helps, but other times it does absolutely nothing. That inconsistency is the first clue that something deeper is happening.

The reason it keeps coming back is that three separate browser systems are involved, and most developers understand each one on its own but never think about what happens when all three collide: **overflow**, **stacking contexts**, and **containing blocks**.

[![Three browser systems: overflow clipping, stacking contexts, and containing blocks.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/1-three-browser-systems-large.png)](https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/1-three-browser-systems-large.png)

Three browser systems: overflow clipping, stacking contexts, and containing blocks. ([Large preview](https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/1-three-browser-systems-large.png))

Once you understand how all three interact, the failure modes stop feeling random. In fact, they become predictable.

## The Three Things Actually Causing This

Let’s look at each of those items in detail.

### The Overflow Problem

When you set `overflow: hidden`, `overflow: scroll`, or `overflow: auto` on an element, the browser will clip anything that extends beyond its bounds, including absolutely positioned descendants.

```
.scroll-container {
  overflow: auto;
  height: 300px;
  /* This will clip the dropdown, full stop */
}

.dropdown {
  position: absolute;
  /* Doesn't matter -- still clipped by .scroll-container */
}
```

That surprised me the first time I ran into it. I’d assumed `position: absolute` would let an element escape a container’s clipping. It doesn’t.

In practice, that means an absolutely positioned menu can be cut off by any ancestor that has a non-visible overflow value, even if that ancestor isn’t the menu’s containing block. Clipping and positioning are separate systems. They just happen to collide in ways that look completely random until you understand both.

See the Pen \[Overflow & Clipping \[forked\]\](https://codepen.io/smashingmag/pen/RNGZNPw) by [BboyGT](https://codepen.io/BboyGT).

See the Pen [Overflow & Clipping \[forked\]](https://codepen.io/smashingmag/pen/RNGZNPw) by [BboyGT](https://codepen.io/BboyGT).

This is also an accessibility problem, not just a visual one. When a dropdown is clipped, it’s still in the DOM. A keyboard user can still focus on it. They just can’t see what they’re focusing on. In my testing, I saw screen readers announce menu items that were invisible to sighted users. That disconnect is a real problem. It’s also the kind of thing that passes a visual review completely fine.

### The Stacking Context Trap

Think of a stacking context as a sealed layer. Whatever is inside it is painted together, as one block. Nothing inside it can escape above something outside it, no matter what `z-index` you use.

The thing is, a lot of CSS properties create a new stacking context. I didn’t know half of these triggered a new context until I started debugging `z-index` issues and had to look them up.

-   `position` with a `z-index` value other than `auto`;
-   `opacity` less than `1`;
-   `transform`, `filter`, `perspective`, `clip-path`, or `mask`;
-   `will-change` referencing any of the above;
-   `isolation: isolate`;
-   `contain: layout` or `paint`.

This is exactly why `z-index: 9999` sometimes does nothing. If your dropdown is trapped inside a stacking context that paints below another stacking context, its `z-index` value doesn’t matter at all. `z-index` is only compared between siblings in the same stacking context. That’s how a modal with `z-index: 1` can sit on top of your dropdown with `z-index: 9999`. They are not in the same context. The comparison never happens.

That kind of `z-index` war is never going to be won. You’re fighting in the wrong arena.

[![The dropdown’s z-index: 9999 only competes inside the card’s stacking context. The card paints below the modal, so the fight never happens.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/2-why-z-index-fails-large.png)](https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/2-why-z-index-fails-large.png)

The dropdown’s `z-index: 9999` only competes inside the card’s stacking context. The card paints below the modal, so the fight never happens. ([Large preview](https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/2-why-z-index-fails-large.png))

See the Pen \[Stacking Contexts \[forked\]\](https://codepen.io/smashingmag/pen/zxKdxGL) by [BboyGT](https://codepen.io/BboyGT).

See the Pen [Stacking Contexts \[forked\]](https://codepen.io/smashingmag/pen/zxKdxGL) by [BboyGT](https://codepen.io/BboyGT).

### The Containing Block Surprise

I learned something uncomfortable about containing blocks early on: **Absolute positioning does not mean “position anywhere.”** The browser finds the nearest positioned ancestor and treats it as the reference frame for that element’s coordinates and dimensions.

If that ancestor is deep inside a scroll container, the dropdown’s coordinates are calculated relative to it. When the container scrolls, those coordinates don’t update. The trigger moves. The dropdown stays put.

## Why Absolute Positioning Fails Alone

For a long time, `position: absolute` was my default answer for dropdowns. It works in isolation. The moment you put it inside a real application, though, things start breaking in ways that don’t feel connected to anything you changed.

In a clean DOM, `position: absolute` works fine. Real applications are just messier. There’s almost always something up the ancestor tree that creates an unexpected stacking context or clips descendants.

I ran into this with a dropdown inside a table, which lived inside a scrollable `div`, where a card component somewhere up the tree had `transform: translateZ(0)` applied as a GPU compositing hint. That transform created a new stacking context. The dropdown was trapped below everything outside the card that had a non-auto `z-index`. And the scroll container was clipping it regardless.

Debugging this felt like following a trail of ghosts with three different ancestors, three different failure modes, and one invisible dropdown. Once I stopped trying to patch the symptom and started tracing which ancestor was responsible, the root cause became obvious.

## The Fixes That Actually Work

Here’s what does work.

### Portals: The Fix That Ultimately Worked For Me

What finally worked for me was getting the dropdown out of the problematic part of the DOM entirely, rendering it directly as a child of `document.body` instead. In React and Vue, this is called a **portal**. In vanilla JavaScript, it’s just `document.body.appendChild()`.

Once it’s at the body level, none of the ancestor clipping or stacking context problems apply. The dropdown is outside all of it. `z-index` works the way you expect it to.

[![Portal Pattern: DOM structure before vs. after](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/3-portal-pattern-dropdown-large.png)](https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/3-portal-pattern-dropdown-large.png)

Portalling moves the dropdown out of the ancestor tree entirely. The overflow and stacking context problems don’t follow it because it’s no longer a descendant of either ancestor. ([Large preview](https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/3-portal-pattern-dropdown-large.png))

Here’s a React example using `createPortal`:

```
import { createPortal } from 'react-dom';
import { useState, useEffect, useRef } from 'react';

function Dropdown({ anchorRef, isOpen, children }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen, anchorRef]);

  if (!isOpen) return null;

  return createPortal(
    <div
      id="dropdown-demo"
      role="menu"
      className="dropdown-menu"
      style={{ position: 'absolute', top: position.top, left: position.left }}
    >
      {children}
    </div>,
    document.body
  );
}
```

See the Pen \[Portal Fix \[forked\]\](https://codepen.io/smashingmag/pen/Kwgvwdv) by [BboyGT](https://codepen.io/BboyGT).

See the Pen [Portal Fix \[forked\]](https://codepen.io/smashingmag/pen/Kwgvwdv) by [BboyGT](https://codepen.io/BboyGT).

In my case, the fix required explicit accessibility work. When I `portal`\-led the menu out of the DOM to escape clipping, I also had to restore the logical relationship for keyboard and screen reader users, move focus into the menu when it opens, and reliably return focus to the trigger on close. That extra bit of JavaScript fixes the accessibility gap the portal creates.

```
<button
  id="dropdown-toggle"
  aria-haspopup="menu"
  aria-expanded="false"
  aria-controls="dropdown-demo"
>
  Actions
</button>

<ul id="dropdown-demo" role="menu" hidden>
  <li role="menuitem">Edit</li>
  <li role="menuitem">Duplicate</li>
  <li role="menuitem">Delete</li>
</ul>
```

Portals fixed the clipping quickly, but they came with trade-offs, and I learned the hard way. In one repo, the dropdown lost theme context because it rendered outside the provider. In another repo, the close animation felt detached because events were routed differently. Each required a small targeted fix, context forwarding, explicit focus restoration, or moving the animation into the portal, but together they show portals are a surgical tool, not a one-click replacement.

### Fixed Positioning (And Why It’s Trickier Than It Looks)

Fixed positioning can feel like a simple solution. Instead of being positioned relative to an ancestor, the element is positioned relative to the viewport itself. But transforms, and other properties as we saw earlier, create containing blocks that can prevent a `position: fixed` element from escaping a container.

```
.dropdown-menu {
  position: fixed;
  /* Coordinates set via JavaScript */
}


function positionDropdown(trigger, dropdown) {
  const rect = trigger.getBoundingClientRect();
  dropdown.style.top = `${rect.bottom}px`;
  dropdown.style.left = `${rect.left}px`;
}
```

While debugging, I found a transform on an ancestor that stole the containing block, which explained why the menu behaved as if it were stuck even though it was supposedly fixed.

[![Fixed Positioning](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/4-fixed-positioning-large.png)](https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/4-fixed-positioning-large.png)

`position: fixed` uses the viewport as its containing block — until an ancestor has `transform`, `filter`, or `will-change`. ([Large preview](https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/4-fixed-positioning-large.png))

And, of course, we can’t ignore accessibility. Fixed elements that appear over content must still be keyboard-reachable. If the focus order doesn’t naturally move into the fixed dropdown, you’ll need to manage it using code. It’s also worth checking that it doesn’t sit over other interactive content with no way to dismiss it. That one bites you in keyboard testing.

### CSS Anchor Positioning: Where I Think This Is Heading

[CSS Anchor Positioning](https://css-tricks.com/css-anchor-positioning-guide/) is the direction I’m most interested in right now. I wasn’t sure how much of the spec was actually usable when I first looked at it. It lets you declare the relationship between a dropdown and its trigger directly in CSS, and the browser handles the coordinates.

```
.trigger {
  anchor-name: --my-trigger;
}

.dropdown-menu {
  position: absolute;
  position-anchor: --my-trigger;
  top: anchor(bottom);
  left: anchor(left);
  position-try-fallbacks: flip-block, flip-inline;
}
```

The `position-try-fallbacks` property is what makes this worth using over a manual calculation. The browser tries alternative placements before giving up, so a dropdown at the bottom of the viewport automatically flips upward instead of getting cut off.

Browser support is solid in Chromium-based browsers and growing in Safari. Firefox needs a `polyfill`. The [`@oddbird/css-anchor-positioning`](https://github.com/oddbird/css-anchor-positioning) package covers the core spec. I’ve hit layout edge cases with it that required fallbacks I didn’t anticipate, so treat it as a progressive enhancement or pair it with a JavaScript fallback for Firefox.

In short, promising but not universal yet. Test in your target browsers.

And as far as accessibility is concerned, declaring a visual relationship in CSS doesn’t tell the accessibility tree anything. `aria-controls`, `aria-expanded`, `aria-haspopup` — that part is still on you.

### Sometimes The Fix Is Just Moving The Element

Before reaching for a portal or making coordinate calculations, I always ask one question first: Does this dropdown actually need to live inside the scroll container?

If it doesn’t, moving the markup to a higher-level wrapper eliminates the problem entirely, with no JavaScript and no coordinate calculations.

This isn’t always possible. If the button and dropdown are encapsulated in the same component, moving one without the other means rethinking the whole API. But when you can do it, there’s nothing to debug. The problem just doesn’t exist.

## What Modern CSS Still Doesn’t Solve

CSS has come a long way here, but there are still places it lets you down.

The `position: fixed` and `transform` issues are still there. It’s in the spec intentionally, which means no CSS workaround exists. If you’re using an animation library that wraps your layout in a transformed element, you’re back to needing portals or anchor positioning.

CSS Anchor Positioning is promising, but new. As mentioned earlier, Firefox still needs a `polyfill` at the time I’m writing this. I’ve hit layout edge cases with it that required fallbacks I didn’t anticipate. If you need consistent behavior across all browsers today, you’re still reaching for JavaScript for the tricky parts.

The addition I’ve actually changed my workflow for is the [HTML Popover API](https://www.smashingmagazine.com/2026/03/getting-started-popover-api/), now available in all modern browsers. Elements with the popover attribute render in the browser’s top layer, above everything, with no JavaScript positioning needed.

```
<button popovertarget="dropdown-demo">Open</button>
<div id="dropdown-demo" popover="manual" role="menu">Popover content</div>
```

Escape handling, dismiss-on-click-outside, and solid accessibility semantics come free for things like tooltips, disclosure widgets, and simple overlays. It’s the first tool I reach for now.

That said, it doesn’t solve positioning. It solves layering. You still need anchor positioning or JavaScript to align a popover to its trigger. The Popover API handles the layering. Anchor positioning handles the placement. Used together, they cover most of what you’d previously reach for a library to do.

## A Decision Guide For Your Situation

After going through all of this the hard way, here’s how I actually think about the choice now.

[![A decision guide for broken dropdown.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/5-dropdown-decision-guide-large.png)](https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/5-dropdown-decision-guide-large.png)

Four questions that cover most real-world dropdown bugs. Accessibility applies regardless of which path you take. ([Large preview](https://files.smashing.media/articles/dropdowns-scrollable-containers-why-break-how-fix/5-dropdown-decision-guide-large.png))

-   **Use a portal.**  
    I’d use this when the trigger lives deep in nested scroll containers. I used this pattern for table action menus and paired it with focus restoration and accessibility checks. It’s the most reliable option, but budget time for the extra wiring.
-   **Use fixed positioning.**  
    This is for when you’re in vanilla JavaScript or a lightweight framework and can verify no ancestor applies transforms or filters. It’s simple to set up and simple to debug, as long as that one constraint holds.
-   **Use CSS Anchor Positioning.**  
    Reach for this when your browser support allows it. If Firefox support is required, pair it with the `@oddbird` polyfill. This is where the platform is ultimately heading and will eventually become your go-to approach.
-   **Restructure the DOM.**  
    Use this when the architecture permits it, and you want zero runtime complexity. I believe it’s likely the most underrated option.
-   **Combine patterns.**  
    Do this when you want anchor positioning as your primary approach, paired with a JavaScript fallback for unsupported browsers. Or a portal for DOM placement paired with `getBoundingClientRect()` for coordinate accuracy.

## Conclusion

I used to treat this bug as a one-off issue — something to patch and move on from. But once I sat with it long enough to understand all three systems involved — **overflow clipping**, **stacking contexts**, and **containing blocks** — it stopped feeling random. I could look at a broken dropdown and immediately trace which ancestor was responsible. That shift in how I read the DOM was the real takeaway.

There’s no single right answer. What I reached for depended on what I could control in the codebase: portals when the ancestor tree was unpredictable; fixed positioning when it was clean and simple; moving the element when nothing was stopping me; and anchor positioning now, where I can.

Whatever you end up choosing, **don’t treat accessibility as the last step**. In my experience, that’s exactly when it gets skipped. The ARIA relationships, the focus management, the keyboard behavior — those aren’t polish. They’re part of what makes the thing actually work.

Check out the full source code in [my GitHub repo](https://github.com/BboyGT/DropDowns).

### Further Reading

These are the references I kept coming back to while working through this:

-   [The Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Positioned_layout/Stacking_context) (MDN)
-   “[CSS Anchor Positioning Guide](https://css-tricks.com/css-anchor-positioning-guide/)”, Juan Diego Rodriguez
-   “[Getting Started With The Popover API](https://www.smashingmagazine.com/2026/03/getting-started-popover-api/)”, Godstime Aburu
-   [Floating UI](https://floating-ui.com/) (floating-ui.com)
-   [CSS Overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/overflow) (MDN)

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)