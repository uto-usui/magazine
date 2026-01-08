---
title: "Ordered and numbered lists; the differences"
source: "https://csswizardry.com/2011/09/ordered-and-numbered-lists-the-differences/"
publishedDate: "2011-09-18"
category: "css"
feedName: "CSS Wizardry"
---

17 September, 2011

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

This is a really small blog post about ordered lists and numbered lists and their subtle differences.

Have you ever wanted to say something like ‘There are three things to look out for:’ and then follow with a numbered list with the three things in?

I’m pretty sure we all have, and that we’d all normally use an `<ol>` to get the numbers, right? That’s how you get numbers next to list items after all…

Well the problem here is that the numbering defines an amount, not an order. The order is _usually_ irrelevant in this scenario.

To make more sense I’ve drawn up [a small fiddle of examples](http://jsfiddle.net/csswizardry/sdrth/) and the reasoning in each.

Here we can see that, although we want numbers, we don’t always want order.

The trick I’ve started employing is is to have a `.numbered` class which I can apply to a `<ul>` to make it mimic the appearance of an ordered list, without semantically carrying the ordered weight. This is how I do it:

```
ul,
ol{
    margin-bottom:1.5em;
}
li ul,
li ol{
    margin-bottom:0;
}
ul{
    list-style:square outside;
}
ol,
.numbered{
    list-style:decimal outside;
}
```

There. As simple as that. These are pretty much my default list styles now, and all I’m really doing is making an unordered list with a class of _numbered_ look the same as an `<ol>`.