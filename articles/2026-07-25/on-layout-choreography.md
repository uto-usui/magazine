---
title: "On layout choreography"
source: "https://karlkoch.me/writing/on-layout-choreography"
publishedDate: "2026-07-24"
category: "design"
feedName: "Sidebar"
---

Interfaces teleport all the time. Remove an item from a list and everything below it snaps upward; insert a row and the existing content jumps down. Expand a panel and the neighbouring blocks instantly reflow around it. The layout is technically correct, but for one frame the reader loses the connection between the state change and the objects that moved.

Layout choreography gives that reflow a visible path.

## The jump

The simplest version of a dynamic list is just state:

```
const [items, setItems] = useState(initialItems);

return (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        {item.label}
        <button onClick={() => remove(item.id)}>Remove</button>
      </li>
    ))}
  </ul>
);
```

React removes the item. The browser recalculates layout. The siblings appear in their new positions on the next paint.

Nothing is wrong in the DOM; the problem is perceptual. The user saw four objects, removed the second, and expected the third and fourth to move into the empty space. Instead they simply arrive there, so the layout lacks continuity.

## FLIP

FLIP is the standard model for animating layout changes:

1.  **First**: record the element’s current bounding box.
2.  **Last**: apply the state change and record the new bounding box.
3.  **Invert**: offset the element back to where it used to be with `transform`.
4.  **Play**: animate that transform back to zero.

The browser still does layout in one step. The trick is to visually invert the result so the element appears to start from its old position, then animate through the gap.

In raw terms, the important part looks like this:

```
const first = element.getBoundingClientRect();

updateLayout();

const last = element.getBoundingClientRect();
const dx = first.left - last.left;
const dy = first.top - last.top;

element.animate(
  [
    { transform: `translate(${dx}px, ${dy}px)` },
    { transform: "translate(0, 0)" },
  ],
  { duration: 260, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" },
);
```

You do not animate `top`, `left`, `height`, or `margin`. Those are layout properties. They make the browser recalculate geometry while the animation runs.

You animate `transform`, because the layout has already happened. The motion is a visual reconciliation between the old geometry and the new one.

## The practical version

Most of the time, I do not write FLIP by hand. Motion’s `layout` prop gives each item the behaviour directly:

```
<AnimatePresence mode="popLayout" initial={false}>
  {items.map((item) => (
    <motion.div
      key={item.id}
      layout
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, filter: "blur(6px)" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {item.label}
    </motion.div>
  ))}
</AnimatePresence>
```

`layout` handles sibling movement. `AnimatePresence` keeps removed items alive long enough to animate out before unmounting. `mode="popLayout"` lets exiting items leave the document flow so the remaining siblings can move immediately instead of waiting for the exit to finish.

Try removing and inserting items here:

Remove or insert items — siblings animate smoothly into place

The list reads as one surface rearranging itself, rather than a stack of independent rows.

## Exit is not the same as reflow

There are two separate animations in that example.

The removed item exits:

```
exit={{
  opacity: 0,
  scale: 0.5,
  filter: "blur(6px)",
  transition: { duration: 0.2, ease: "easeIn" },
}}
```

The surviving siblings move:

```
layout
transition={{ type: "spring", stiffness: 400, damping: 30 }}
```

Tune those jobs separately.

The exiting item can be quick and decisive because it is leaving. A short fade, scale, or blur tells the eye it has been dismissed.

The siblings need enough time to make their path legible. Too fast and they still feel like they jumped. Too slow and the interface starts waiting on its own animation. For small layout changes, I usually want this somewhere around 200-350ms, or a spring with enough damping that it settles without wobbling.

## Choreography is sequencing

Layout animation gets messy when everything moves with equal importance.

If a card expands, the card should lead and the surrounding content should yield. If a row is removed, the row should leave and the rest should close the gap. If a filter changes a grid, the disappearing items should exit before the survivors settle into their new positions.

Use this sequence:

1.  The user’s action changes one thing.
2.  That thing responds first.
3.  The surrounding layout adapts.
4.  The system settles.

That order keeps a busy layout change legible.

## Scale needs correction

FLIP often uses scale to fake width and height changes. That is efficient, but it can distort children.

Text can stretch, borders can fatten, and border radii can look wrong. Shadows may scale in a way that makes depth feel rubbery.

This is one reason component-level layout animation can need more care than page-level transitions. You are animating the real element and its children, not a screenshot. That gives you interruptibility and better interaction, but it also means every child has to survive the transform.

The fixes are small:

-   Keep scale changes modest.
-   Put text in an inner wrapper that does not scale when needed.
-   Animate border radius explicitly if it looks wrong.
-   Prefer translate-only layout motion when the size change is not the point.
-   Use opacity for entering content so text does not stretch into place.

The new layout should arrive without distorting the component’s material quality.

## View Transitions are a different tool

View Transitions can move things between layouts by animating snapshots. That suits route changes and shared elements across pages, but dense interactive lists benefit from live elements while items enter, leave, and reorder.

For lists, grids, accordions, filters, and drag-adjacent UI, I usually want live elements. I want pointer events, interruption, springs, and per-item timing. That points to Motion’s `layout`, a FLIP utility, or a small custom implementation.

For navigation, screenshots can be a feature. For local layout changes, they often get in the way.

## Reduced motion

Layout choreography still moves objects through space, so it needs a reduced-motion path.

The reduced-motion version can keep opacity and colour changes while dropping the transform:

```
const prefersReducedMotion = useReducedMotion();

<motion.div
  layout={!prefersReducedMotion}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
>
  {item.label}
</motion.div>
```

The content, order, and controls stay intact with less spatial movement.

The reduced-motion version should remain complete and clear.

## When to steal this

Reach for layout choreography when a state change moves neighbouring elements:

-   removing or inserting list items
-   filtering a grid
-   expanding cards
-   opening accordions
-   changing density
-   switching between compact and detailed views
-   reordering direct-manipulation surfaces

Do not animate every reflow by default. Some changes are small enough to snap. Some should be instant because the user is trying to move quickly. Some layouts are too dense for every element to perform its own journey.

Use it where readers need to track where objects went. Give the layout a visible path instead of a cut.