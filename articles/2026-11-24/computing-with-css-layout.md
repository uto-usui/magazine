---
title: "Computing with CSS Layout"
source: "https://noscript.ing/compute"
publishedDate: "2026-11-23"
category: "design"
feedName: "Sidebar"
---

* * *

## 1\. Layout computation[](#computation)

Browsers run [highly optimized algorithms](https://www.joshwcomeau.com/css/understanding-layout-algorithms/) every frame just to place boxes. That’s the point of layout.

When an `auto` column finds the widest element, we can think of it as a maximum. A flex row adds up its children’s widths into a sum. `order` sorts items by a number. Each answer ends up as a size or a position on the page, where modern CSS can read it back as a value.

Sorting algorithms, each step done by layout

### 1.1. Reading a width[](#reading-a-width)

An item in an `inline-grid` [stretches to fill its column](https://drafts.csswg.org/css-grid-2/#grid-item-sizing) by default. If we give it `container-type: inline-size`, it becomes a query container: an element whose contents [can read its width](https://drafts.csswg.org/css-conditional-5/#container-lengths), and that [its own contents never widen](https://drafts.csswg.org/css-contain-2/#containment-inline-size).

Inside this special element, `100cqw` represents the column’s width as a length, like `300px`. Dividing a length by `1px` drops the unit and `round()` makes it whole. **This is a number we can use to compute in CSS!**

A query container’s width, as a number

```
<div class="read">
  <i style="--value: 300">300</i>
  <b class="column-width">width = <output></output></b>
</div>
```

```
@property --result { syntax: '<integer>'; inherits: true; initial-value: 0; }

.column-width {
  display: block;
  container-type: inline-size;
  > * { --result: round(100cqw / 1px); }
}

/* the example: one auto column, each item as wide as its --value */
.read {
  display: inline-grid;
  grid-template-columns: auto;
  > i { width: calc(var(--value) * 1px); }
}

/* content can't print a number, but a counter can */
output::after { counter-reset: result var(--result); content: counter(result); }
```

Registered with `@property` as an `<integer>`, the custom property turns into the number `300` right where it is set. The elements inside inherit that value (not a `100cqw` to measure again), and a counter prints it.

#### 1.1.1. Reading a position[](#reading-a-position)

A width can also be a distance. Stretch an element from its parent’s left edge to another element with `right: anchor(--target left)`, and a query container inside it reads how far away that element landed. Here the target sits after two bars in a flex row, so the distance is their sum.

Reading a position

_target_

Inputs

60 + 40 100 + 125 150 + 150

View the code (1.7 KB)

```
<div class="position">
  <label><input type="radio" name="position" id="position-1" checked> 60 + 40</label>
  <label><input type="radio" name="position" id="position-2"> 100 + 125</label>
  <label><input type="radio" name="position" id="position-3"> 150 + 150</label>
  <div class="position-track">
    <i class="position-a"></i>
    <i class="position-b"></i>
    <i class="position-target">target</i>
    <div class="position-distance">
      <b class="position-container"><output></output></b>
    </div>
  </div>
</div>
```

```
@property --result { syntax: '<integer>'; inherits: true; initial-value: 0; }
.position-track {
  --a: 60;
  --b: 40;
  position: relative;
  display: flex;
  height: 72px;
  > i { flex: none; }
  > .position-a { width: calc(var(--a) * 1px); }
  > .position-b { width: calc(var(--b) * 1px); }
  > .position-target { anchor-name: --target; }
  > .position-distance {
    position: absolute;
    top: 36px;
    left: 0;
    right: anchor(--target left);
    > .position-container {
      display: block;
      container-type: inline-size;
      > output { --result: round(100cqw / 1px); }
    }
  }
}

/* the radios set the two bars */
body:has(#position-2:checked) .position-track { --a: 100; --b: 125; }
body:has(#position-3:checked) .position-track { --a: 150; --b: 150; }

/* the bars' numbers, and the sum the read is */
.position-a::before { counter-reset: a var(--a); content: counter(a); }
.position-b::before { counter-reset: b var(--b); content: counter(b); }
.position-container::before { counter-reset: a var(--a) b var(--b); content: counter(a) " + " counter(b) " = "; }
output::after { counter-reset: result var(--result); content: counter(result); }
```

### 1.2. Finding the widest[](#finding-the-widest)

If we put three elements in a grid with one `auto` column, that column [grows to fit the widest](https://drafts.csswg.org/css-grid-2/#algo-content), so its width is `max(60, 200, 150)`, and the query container in it reads 200. We never wrote a max in `calc()`. The grid algorithm had to find one anyway, just to lay the elements out, and we borrow that calculation.

One grid column, read back

View the code (0.7 KB)

```
<div class="max">
  <i style="--value: 60">60</i>
  <i style="--value: 200">200</i>
  <i style="--value: 150">150</i>
  <b class="column-width">max(60, 200, 150) = <output></output></b>
</div>
```

```
@property --result { syntax: '<integer>'; inherits: true; initial-value: 0; }
.column-width { display: block; container-type: inline-size; }
/* the calculation: an auto column, as wide as its widest bar */
.max {
  display: inline-grid;
  grid-template-columns: auto;
  > i { width: calc(var(--value) * 1px); }
  /* the query container: reads the column, 200 */
  > .column-width > * { --result: round(100cqw / 1px); }
}
/* only prints the numbers */
output::after { counter-reset: result var(--result); content: counter(result); }
```

### 1.3. Nesting calculations[](#nesting-calculations)

We can nest calculations as we do elements. For example, a flex row that hugs its content [is as wide as its items added up](https://drafts.csswg.org/css-flexbox-1/#intrinsic-main-sizes), so each row becomes a sum. An `auto` column holding the rows takes the widest of them, so its query container reads `max(60 + 200, 150 + 35 + 45)`, which is 260.

A sum inside a max

View the code (0.9 KB)

```
<div class="nest">
  <div>
    <i style="--value: 60">60</i>
    <i style="--value: 200">200</i>
  </div>
  <div>
    <i style="--value: 150">150</i>
    <i style="--value: 35">35</i>
    <i style="--value: 45">45</i>
  </div>
  <b class="column-width">max(60 + 200, 150 + 35 + 45) = <output></output></b>
</div>
```

```
@property --result { syntax: '<integer>'; inherits: true; initial-value: 0; }
.column-width { display: block; container-type: inline-size; }
/* the calculation: each row as wide as its bars added up, in an auto column as wide as the widest row */
.nest {
  display: inline-grid;
  grid-template-columns: auto;
  > div {
    display: flex;
    > i { flex: none; width: calc(var(--value) * 1px); }
  }
  /* the query container: reads the column, 260 */
  > .column-width > * { --result: round(100cqw / 1px); }
}
/* only prints the numbers */
output::after { counter-reset: result var(--result); content: counter(result); }
```

### 1.4. Feeding it back[](#feeding-it-back)

Once layout gives us a number, we can use it again as a width, an `order`, a `grid-column`, or in another calculation. As usual, there’s one catch: `100cqw` [measures the nearest query container](https://drafts.csswg.org/css-conditional-5/#container-lengths), so whatever uses the result has to live inside the element that read it. The markup ends up with three levels, the calculation, the query container and the elements inside it.

A maximum, used as a width and read again

View the code (1.3 KB)

```
<div class="max">
  <i style="--value: 60">60</i>
  <i style="--value: 200">200</i>
  <i style="--value: 150">150</i>
  <b class="column-width">max(60, 200, 150) = <output></output>
    <span class="use">
      <span><i class="answer"></i><i style="--value: 125">125</i></span>
      <b class="column-width">max(60, 200, 150) + 125 = <output></output></b>
    </span>
  </b>
</div>
```

```
@property --result { syntax: '<integer>'; inherits: true; initial-value: 0; }
.column-width { display: block; container-type: inline-size; }
/* the calculation: an auto column, as wide as its widest bar */
.max {
  display: inline-grid;
  grid-template-columns: auto;
  > i { width: calc(var(--value) * 1px); }
  /* the query container: reads the column, 200 */
  > .column-width {
    > * { --result: round(100cqw / 1px); }
    /* the elements inside it: a bar 200 wide beside 125, read again */
    .use {
      display: grid;
      width: max-content;
      > span { display: flex; }
      i { flex: none; width: calc(var(--value) * 1px); }
      .answer { width: calc(var(--result) * 1px); }
      > .column-width > * { --result: round(100cqw / 1px); }
    }
  }
}
/* only prints the numbers */
output::after { counter-reset: result var(--result); content: counter(result); }
.answer::before { counter-reset: v var(--result); content: counter(v); }
```

### 1.5. Comparing elements[](#many-numbers)

Some frontend tasks require that we compare everything with everything, like ranking a list. Plain `calc()` can handle it, as long as we write every comparison: for fifty numbers that’s 50 formulas of 49 comparisons each, 2,450 in total. The newer `min()` and `max()` get it down to 403, but the formulas grow with the number of items.

Layout can do the comparing for us. If each item’s number is its `order`, the browser lays them out from smallest to largest, with no formula per pair. Then we can combine it with `calc()` for the rest of the math.

Fifty numbers, summed and compared by layout

View the code (3.3 KB)

```
<i id="play" hidden></i><i id="pause" hidden></i>
<div class="bulk-demo">
  <div class="bulk-clip">
    <div class="bulk-sum">
      <div class="bulk-row">
        <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
      </div>
      <b><u></u></b>
    </div>
  </div>
  <div class="bulk-bin">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i> <b><u></u></b>
  </div>
  <div class="bulk-bars">
    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
  </div>
</div>
```

```
@property --t { syntax: '<number>'; inherits: true; initial-value: 0; }
@property --k { syntax: '<integer>'; inherits: true; initial-value: 0; }
@property --n { syntax: '<integer>'; inherits: true; initial-value: 0; }

/* one clock; every number is a wave of it and of its place */
@keyframes clock { to { --t: 1; } }
.bulk-demo {
  animation: clock 5s linear infinite paused;
  i {
    --k: sibling-index();
    --n: round(4 + (48 + 44 * sin(var(--k) * 5.4deg)) * (0.5 - 0.5 * cos(var(--t) * 360deg + var(--k) * 12.5deg)));
    width: calc(var(--n) * 1px);
    height: 0;
  }
  b { display: block; container-type: inline-size; }
  u { counter-reset: out round(100cqw / 1px); }
}
:root:has(#play:target) .bulk-demo { animation-play-state: running; }

/* the sum */
.bulk-clip {
  height: 0;
  overflow: hidden;
  > .bulk-sum {
    width: max-content;
    > .bulk-row {
      display: flex;
      > i { flex: none; }
    }
  }
}

/* the largest */
.bulk-bin {
  display: grid;
  grid-template-columns: max-content;
  width: max-content;
  height: 0;
  > i, > b { grid-area: 1 / 1; }
}

/* the bars: the same numbers, drawn */
.bulk-bars > i {
  position: absolute;
  bottom: 20px;
  height: calc(var(--n) * 3px);
  left: calc(20px + (var(--k) - 1) * (100% - 40px) / 50);
  width: calc((100% - 40px) / 50 + 0.5px);
  background: #3a4049;
}

/* the look */
.bulk-demo {
  position: relative;
  height: 390px;
  box-sizing: border-box;
  background: #101216;
  font: 600 15px ui-monospace, Menlo, monospace;
  u { position: absolute; text-decoration: none; font-weight: 600; } /* not bolder for being in a b */
}
.bulk-sum u {
  top: 18px;
  left: 20px;
  color: #afafaf;
  &::after { content: "sum = n1 + n2 + … + n50 = " counter(out); }
}
.bulk-bin u {
  left: 20px;
  right: 20px;
  bottom: calc(20px + 100cqw / 1px * 3px);
  border-bottom: 2px dashed #d8a93c;
  color: #d8a93c;
  z-index: 1;
  &::after { content: "largest = max(n1, n2, …, n50) = " counter(out); }
}
```

* * *

## 2\. Primitives[](#primitives)

A primitive is a calculation that layout performs when it places elements, such as a sum, a maximum or a sort. The three examples below pick an item by its index, sort and rank. Comparing is where plain `calc()` struggles most, so the sort and the rank let the `order` property do it. The [API section](https://noscript.ing/api/) has many more.

### 2.1. Item by index[](#at)

`:nth-child()` only takes a fixed number, but `grid-column` takes a computed one. When each item gets a column of its own width, a query container placed under column `--i` reads item i.

Inputs

i: 2 → 4

View the code (1.1 KB)

```
<label><input type="checkbox"> i: 2 → 4</label>
<div class="g">
  <div class="item" style="--value: 60"></div>
  <div class="item" style="--value: 200"></div>
  <div class="item" style="--value: 150"></div>
  <div class="item" style="--value: 110"></div>
  <div class="at"><span class="f"></span> <output></output></div>
</div>
```

```
/* items in row 1, one per column; the query container in row 2, column i */
.g {
  display: inline-grid;
  --i: 2;
  > .item { grid-row: 1; width: calc(var(--value) * 1px); }
  > .at { grid-row: 2; grid-column: var(--i); }
}
/* the query container reads its own width, as in §1.1 */
@property --result { syntax: '<integer>'; inherits: true; initial-value: 0; }
.at {
  display: block;
  container-type: inline-size;
  > * { --result: round(100cqw / 1px); }
}
/* the input moves i from 2 to 4 */
body:has(:checked) .g { --i: 4; }
/* only draws the items and prints the numbers */
.item {
  display: block;
  height: 30px;
  background: #3a4049;
  &::before { counter-reset: value var(--value); content: counter(value); }
}
.f::before { counter-reset: i var(--i); content: "at(" counter(i) ") ="; }
```

i moves from 2 to 4: the query container moves to that column and reads 110.

### 2.2. Sort[](#sort)

When each item’s value is also its `order`, the grid arranges them from smallest to largest. A query container under the middle column (3 of 5) then reads the median. `order` only takes whole numbers.

Inputs

Last: 180 → 120

View the code (1.3 KB)

```
<label><input type="checkbox"> Last: 180 → 120</label>
<div class="g">
  <div class="item" style="--value: 190"></div>
  <div class="item" style="--value: 130"></div>
  <div class="item" style="--value: 240"></div>
  <div class="item" style="--value: 150"></div>
  <div class="item c"></div>
  <div class="median"><span class="f"></span> <output></output></div>
</div>
```

```
/* items in row 1, sorted by their value; the query container in row 2, column 3 */
.g {
  display: inline-grid;
  > .item { grid-row: 1; order: var(--value); width: calc(var(--value) * 1px); }
  > .c { --value: var(--c); }
  > .median { grid-row: 2; grid-column: 3; }
}
/* the query container reads its own width, as in §1.1 */
@property --result { syntax: '<integer>'; inherits: true; initial-value: 0; }
.median {
  display: block;
  container-type: inline-size;
  > * { --result: round(100cqw / 1px); }
}
/* the input moves the last value from 180 to 120 */
:root { --c: 180; }
body:has(:checked) { --c: 120; }
/* only draws the items and prints the numbers */
.item {
  display: block;
  height: 30px;
  background: #3a4049;
  &::before { counter-reset: value var(--value); content: counter(value); }
}
.f::before {
  counter-reset: c var(--c);
  content: "median(190, 130, 240, 150, " counter(c) ") =";
}
```

Tick the Last input and the last value drops below the middle, so the median becomes 150.

### 2.3. Rank[](#rank)

A rank is how many items come before one once they’re sorted. Sorted by `order` into 100px columns, an item sits 100px further right for every item before it. An element stretched from the grid’s left edge to that item (its anchor) is as wide as that distance, and its query container divides it by 100px to read the rank. Of two equal values, the one earlier in the markup comes first.

Inputs

Last: 70 → 50

View the code (1.7 KB)

```
<label><input type="checkbox"> Last: 70 → 50</label>
<div class="g">
  <div class="item" style="--value: 42"></div>
  <div class="item" style="--value: 88"></div>
  <div class="item t" style="--value: 61"></div>
  <div class="item" style="--value: 17"></div>
  <div class="item c"></div>
  <div class="before">
    <div class="rank"><span class="f"></span> <output></output></div>
  </div>
</div>
```

```
/* the items sorted by order, one 100px column each */
.g {
  display: inline-grid;
  grid-auto-flow: column;
  grid-auto-columns: 100px;
  position: relative;
  > .item { width: auto; order: var(--value); }
  > .c { --value: var(--c); }
  /* the ranked item is an anchor; an element from the grid's left edge to its left edge, under the row */
  > .t { anchor-name: --ranked; }
  > .before {
    position: absolute;
    left: 0;
    right: anchor(--ranked left);
    top: calc(100% + 8px);
    /* the query container inside it: 100px times the items before */
    > .rank {
      width: 100%;
      padding: 0;
      > * { --result: round(100cqw / 100px); }
    }
  }
}
/* the query container, as in §1.1 */
@property --result { syntax: '<integer>'; inherits: true; initial-value: 0; }
.rank { display: block; container-type: inline-size; }
/* the input moves the last value from 70 to 50 */
:root { --c: 70; }
body:has(:checked) { --c: 50; }
/* only draws the items and prints the numbers */
.item {
  display: block;
  height: 30px;
  background: #3a4049;
  &::before { counter-reset: value var(--value); content: counter(value); }
}
.t { background: #6a5627; }
.f::before { content: "items before 61 ="; }
/* only makes room for the answer under the row */
.g { margin-bottom: 44px; }
```

When the last value drops from 70 to 50, three items come before 61.

### 2.4. Performance[](#performance)

Performance is notoriously hard to test, but `calc()` plus layout wins on some clearly hard cases. Each primitive was timed in Chrome on 300 numbers that change at every update, in plain `calc()` and with layout helping it.

Primitive

Plain `calc()`

`calc()` plus layout

[Item by index](https://noscript.ing/api/item-i)item i, for a computed i

99.1 ms, 31 KB of CSS

3.9 ms

[Rank](https://noscript.ing/api/rank)each number’s place, sorted

95 ms, 5.0 MB of CSS

6 ms

[Sort](https://noscript.ing/api/sort)the numbers in order

36.8 ms, 1.8 MB of CSS

3.2 ms

[Line count](https://noscript.ing/api/line-count)lines a row takes as it wraps

3 ms, 101 KB of CSS

1 ms

[Equal growth with a cap](https://noscript.ing/api/equal-growth-with-a-cap)a grid’s width shared by capped tracks

2.9 ms, 3 KB of CSS

1.8 ms

[Prefix sum](https://noscript.ing/api/cumsum)where each one starts

0.7 ms, 36 KB of CSS

0.8 ms

* * *

## 3\. Data-driven stylesheets[](#data-driven)

D3 is an extremely powerful JavaScript library, with modules for scales, shapes, layouts and statistics. It stands for Data-Driven Documents: bind data to the page and let it decide what appears. I’ve always been drawn to it.

**A data-driven stylesheet attempts to do the same with just CSS**: the numbers live in custom properties, which are computed by layout into sizes, positions and colors. Layout supplies the algorithm, and the HTML the dataset. Ideally, adding an element adds work for the browser, and not a term to a formula.

That is the goal of [dCSS](https://github.com/noscripting), an open-source library of data functions, each one a class you put on HTML. The markup stays valid, semantic HTML, and the result comes from layout, or from `calc()` where arithmetic is enough.

### 3.1. Using a function[](#using-a-function)

dCSS has six families of functions: arrays (sums, means, medians, sorting), scales, number and date formats, math and motion. A function is a class you put on a `<figure>` element. The numbers go in a `<ul>`, one per `<li>`, and every empty `<output>` after it prints one answer, like the mean, rounded to the decimals you ask for.

The example below uses `dcss-summarize`, which gives the common answers at once: sum, count, mean, min, max, median, variance and deviation.

```
<link rel="stylesheet" href="dcss.css">
<link rel="stylesheet" href="families/array.css">
<link rel="stylesheet" href="families/format.css">

<figure class="dcss-summarize dcss-format-fixed">
  <ul aria-hidden="true">
    <li style="--value: 12"></li>
    <li style="--value: 40"></li>
    <li style="--value: 30"></li>
  </ul>
  <output style="--value: var(--dcss-sum); --precision: 0"></output>   <!-- 82 -->
  <output style="--value: var(--dcss-mean); --precision: 1"></output>  <!-- 27.3 -->
  <output style="--value: var(--dcss-max); --precision: 0"></output>   <!-- 40 -->
  <figcaption>The sum, mean and largest of 12, 40 and 30</figcaption>
</figure>
```

Screen readers can’t read the numbers in the list, so it’s hidden from them and the caption says them in words.

### 3.2. Drawing a chart[](#drawing-a-chart)

Let’s use this pattern to build something concrete. We can visualize how much of the web uses six CSS layout properties, month by month since 2016. A registered number runs from the first month to the last, and each property’s share is a keyframe per month, so the browser works out every value in between. The lines are drawn once as SVG, and a `clip-path` uncovers them as the months go by.

As the lines climb, the y-axis grows to fit them. That is the part layout computes, with `dcss-max`: each property is one `<li>`, its `--value` the highest share it has reached so far. The plot takes the largest, adds a tenth so no line touches the top, and scales the gridlines and the lines to it.

CSS layout, adopted

View the code (1.3 KB)

```
<!-- A minimal example of the pattern, not the chart's own code: -->
<!-- dcss-max reads the largest value, and the bars and gridlines scale to it. -->
<link rel="stylesheet" href="dcss.css">
<link rel="stylesheet" href="families/array.css">

<figure class="dcss-max">
  <ul aria-hidden="true">
    <!-- tenths of a percent: dCSS takes whole numbers -->
    <li style="--value: 707"></li>
    <li style="--value: 664"></li>
    <li style="--value: 389"></li>
  </ul>
  <div class="plot">
    <i class="gridline" style="--p: 20"></i>
    <i class="gridline" style="--p: 40"></i>
    <i class="gridline" style="--p: 60"></i>
    <b class="bar" style="--v: 70.7"></b>
    <b class="bar" style="--v: 66.4"></b>
    <b class="bar" style="--v: 38.9"></b>
  </div>
  <figcaption>flex-wrap 70.7%, gap 66.4%, aspect-ratio 38.9%</figcaption>
</figure>

<style>
  .plot { position: relative; height: 200px; display: flex; align-items: end; gap: 8px; }
  .plot > * { --max: max(var(--dcss-max) / 10 * 1.1, 12); }   /* the largest, a tenth more, never under 12% */
  .gridline { position: absolute; inset: auto 0; top: calc((1 - var(--p) / var(--max)) * 100%); border-top: 1px solid #333; }
  .bar { flex: 1; height: calc(var(--v) / var(--max) * 100%); background: coral; }
</style>
```

* * *

## 4\. Browser support[](#support)

The CSS features this pattern needs became Baseline in the last three years.

Feature

Baseline

Chrome

Safari

Firefox

Container query units

Widely available

105+

16+

110+

`:has()`

Widely available

105+

15.4+

121+

`@property`

Newly available 2024

85+

16.4+

128+

Math functions: `round()`, `mod()`, `abs()`, `sign()`, `sin()`

Newly available 2025

138+

15.4+

118+

`anchor-name` and `anchor()`

Newly available 2026

125+

26+

147+

Style queries on custom properties

Newly available 2026

111+

18+

151+

`sibling-index()`

Newly available 2026

138+

26.2+

154+

View timelines, with `timeline-scope`

Newly available 2026

116+

26+

159+

Dividing a length by a length (`100cqw / 1px`)

No Baseline entry

140+

26+

158+

### 4.1. The future[](#future)

Soon, `attr()` will take numbers straight from HTML, so an item can carry `data-value="60"` instead of a custom property in its `style` attribute. With `if()`, an element will choose a value from its own numbers, where today a style query on its parent has to do it. And when `@function` lands everywhere, we’ll finally get to name our own calculations and build on them.

Feature

Baseline

Chrome

Safari

Firefox

`attr()` with a type

Limited availability

133+

No

155+

`if()`

Limited availability

137+

No

No

`@function`

Limited availability

139+

No

No

* * *

## 5\. Coda[](#coda)

Until now, a page without JavaScript mostly flipped switches: a checkbox, a `:target`, a hover. With the layout engine’s math on our side, **a stylesheet can run what we usually reached for a script for**, and it gets even more powerful paired with view timelines, which let a number from layout reach anywhere on the page and carry over to the next frame. That will be the topic of the second article.

Given enough elements and time, CSS can compute anything.