---
title: "Filling in the last row of a responsive grid"
source: "https://twilson.net/writing/filling-responsive-grid"
publishedDate: "2026-09-22"
category: "design"
feedName: "Sidebar"
---

[twilson.net](https://twilson.net/)

Sep 9, 2026

Until we have widespread support for [gap decorations](https://caniuse.com/wf-gap-decorations), the easy trick for having borders between grid cells in CSS is giving the grid a `1px` gap, setting the container's background color to the desired border color, and setting the cells' background colors to the desired background color:

```
<div className="grid grid-cols-3 gap-px bg-gray-100 p-px">
  <div className="bg-white" />
  <div className="bg-white" />
  <div className="bg-white" />
</div>
```

As long as you don't need some other background to show through, this is really handy and saves you from crazy `:nth` selectors or a bunch of extra logic. The tradeoff is some extra complexity when you don't have the right number of items to fully fill the grid.

The math for figuring out how many empty cells to fill in is pretty simple.

You can find the total number of rows needed to fit all of the items with `ceil(items / cols)`. Then, multiply by the columns per row, and subtract the number of items that are already filled: `ceil(items / cols) * cols - items`.

In JSX, that would look something like this:

```
{[...Array(Math.ceil(items / cols) * cols - items)].map((_, i) => (
  <div key={i} className="..." />
))}
```

## Responsive grids

Things get a little ugly when the number of columns isn't fixed, such as in a container like this:

```
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  ...
</div>
```

We could put together a bunch of extra math and logic to give each filler cell the appropriate breakpoint classes, but that would be a lot of work and pretty tricky to understand. Instead, we can keep it simple by just using separate filler cells for each breakpoint:

```
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px p-px bg-gray-100">
  [items]

  <GridFiller cols={2} items={items} className="hidden md:block lg:hidden bg-white" />
  <GridFiller cols={3} items={items} className="hidden lg:block bg-white" />
</div>
```

This does create a few more elements than absolutely necessary, but it's the cleanest solution I've found so far.

Here's the `GridFiller` component:

```
function GridFiller({
  cols,
  items,
  className,
}) {
  return [...Array(Math.ceil(items / cols) * cols - items)].map((_, i) => (
    <div key={i} className={className} />
  ));
}
```

## Spanning the remaining columns

If you want a single filler cell to span the remaining columns without the extra borders in-between filler cells, you can take a similar approach:

```
function GridFillerSpanning({
  cols,
  items,
  className,
}) {
  const span = Math.ceil(items / cols) * cols - items;
  if (span === 0) return null;

  return <div className={className} style={{ gridColumn: `span ${span}` }} />;
}
```

## Alternatives

There are a few other ways to attack this, but they lose on my criteria of avoiding custom CSS (apart from arbitrary Tailwind classes) and keeping the components simple.

-   **Hide the fillers with CSS selectors:** render `cols - 1` fillers and hide the leftovers with `:nth-child()` selectors per-breakpoint. Zero JS, but since selectors can't read a variable, every possible column count means more CSS.
-   **Measure the grid in JS:** read the rendered container, count the columns, render exactly the right number of fillers. Works for any layout, including `auto-fill` grids, but you pay with a flash of the wrong layout before it settles.
-   **[Gap decorations](https://caniuse.com/wf-gap-decorations):** the real fix — `row-rule` and `column-rule` draw the borders in the gaps themselves, no filler cells needed. It just doesn't have the browser support yet.

For now, this does the trick. I can't wait to delete it.

![Tim Wilson](https://twilson.net/_next/image?url=%2Ftim-wilson.avif&w=256&q=75)Thanks for reading! Find me on X: [@actualTimWilson](https://x.com/actualTimWilson)