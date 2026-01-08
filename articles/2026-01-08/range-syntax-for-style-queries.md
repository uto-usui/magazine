---
title: "Range Syntax for Style Queries"
source: "https://una.im/range-style-queries/"
publishedDate: "2025-11-12"
category: "css"
feedName: "Una Kravets"
---

![](https://una.im/posts/range-style-queries/bg.jpg)

Published on November 12, 2025

TLDR; Style queries are getting an upgrade! Like [media queries](https://web.dev/articles/media-query-range-syntax), and [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries), They can now respond to a range of values, and not just predefined states.

If you’ve ever worked with [style queries](https://developer.chrome.com/docs/css-ui/style-queries), you may have noticed that they were limited to **exact** style matching, like `style(—theme: dark)`. But now, as of [Chrome 142](https://chromestatus.com/feature/5184992749289472), you can use comparison operators like `>`, `<`, `>=`, and `<=` within your style queries _and_ in the CSS `if()` function. This opens up a new world of possibilities for creating responsive and state-aware components.

## Range Syntax for Style Queries

The new range syntax supercharges `@container style()` queries. You can now compare custom properties, literal values, and even values from functions like `attr()`. For a comparison to be valid, both sides need to resolve to the same numeric data type, such as length, number, angle, time, frequency, or resolution.

## Demo: Weather cards

Let’s update a previous [demo](https://developer.chrome.com/docs/css-ui/style-queries#weather_cards) of mine to be more flexible and include range queries.

Before, I was only able to query for exact values, like so:

```
/* Style query must be an exact match (old) */
@container style(--rainy: true) {
  .weather-card {
    background: linear-gradient(140deg, skyblue, lightblue);
  }
}
```

Now, I could use a new value, like `--rain-percent` for styling. And give it a specific background gradient if the percentage is greater than 45%:

```
/* Range query for rain percent (new) */
@container style(--rain-percent > 45%) {
  .weather-card {
    background: linear-gradient(140deg, skyblue, lightblue);
  }
}
```

In a real-world scenario, you might be using props for this, and you can leverage those props as well using [new capabilities](https://una.im/advanced-attr) for the `attr()` function. In this case, we will be casting the `[data-rain-percent]` attribute into the CSS custom property `--rain-percent` as a percentage type so that we can use it in the range query.

```
.card-container {
  container-name: weather;
  --rain-percent: attr(data-rain-percent type(<percentage>));
}
```

See it in action:

See the Pen [Range queries](https://codepen.io/una/pen/zxrEzdq) by Una Kravets ([@una](https://codepen.io/una/pen/zxrEzdq)) on [CodePen](https://codepen.io/una/pen/zxrEzdq).

Explore the live demo on Codepen.

![Weather card demo](https://una.im/posts/range-style-queries/weather-cards.jpg)

## Using Range Syntax with if()

The power of range syntax isn’t limited to `@container` rules. You can also use it within the CSS [`if()` function](https://developer.chrome.com/blog/if-article) to create conditional values for your properties. So we can optimize the above code further to look more like:

```
/* Range style query in an if() statement */
.weather-card {
  background: if(
    style(--rain-percent > 45%): blue;
    else: gray;
  );
}
```

## Demo: Grid position

You can use this technique for component variations, grid placement and styling, animation effects, and so much more. For example, imagine you have an item grid and you want to change the background color based on the number of columns, which is set via a data attribute. With range syntax in `if()`. You can do this:

```
.item-grid {
  background-color: if(style(attr(data-columns, type) > 2): blue; else: gray);
}
```

See the Pen [Untitled](https://codepen.io/una/pen/PwNqMOB) by Una Kravets ([@una](https://codepen.io/una)) on [CodePen](https://codepen.io/).

Hope this helps!

If you’ve built a demo using range syntax for style queries or `if()`, I would love to see it! Reply on Bluesky with your link, and it’ll appear below.