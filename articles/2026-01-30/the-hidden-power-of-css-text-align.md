---
title: "The Hidden Power of CSS Text Align"
source: "https://ishadeed.com/article/the-hidden-power-text-align/"
publishedDate: "2019-03-30"
category: "css"
feedName: "Ahmad Shadeed"
---

I would like to shed light on a use case for `text-align` that some of us including me might not consider getting the benefit of it.

## The Trick

Before discovering the trick I’m gonna discuss in the article, I wouldn’t think twice about how an element should be aligned. The common ways I use are:

-   Flexbox
-   Margin `auto`
-   Positioning

In the coming examples, I’ll explore some use cases for `text-align` that are easy and powerful.

![](https://ishadeed.com/assets/text-align/tags.png)

This one is my favorite and I use it a lot. By having each tag as an `inline-block` element, it’s easy to get benefit of `text-align: center` on the wrapper.

```
.tags-wrapper {
  text-align: center; /* Text align for the win! */
}

.tag {
  display: inline-block;
}
```

![](https://ishadeed.com/assets/text-align/footer.jpg)

Let’s suppose that there are two wrappers, each of them is taking 50% of its parent. Inside each one, we have an `<img>`. The one on the right is right-aligned, while the other is left-aligned. How can we achieve that easily?

![](https://ishadeed.com/assets/text-align/footer-explanation.jpg)

By default, the `<img>` is an inline element, which can be affected by `text-align` property. If I need to align the logo to the right, here is what I would do:

```
<div class="wrapper">
   <div class="item start">
      <img src="logo.png" alt="">
   </div>
   <div class="item end>
      <span>Brought to you by</span>
      <img src="logo.png" alt="">
   </div>
</div>
```

```
.item.start {
  text-align: right;
}

.item.end {
  text-align: left;
}
```

## Card Component

![](https://ishadeed.com/assets/text-align/card.png)

The user avatar could be an icon or anything else, followed by an element with `display: block`. In this case, it’s followed by the card title.

```
.card { /* Other styles */ text-align: center; }
```

```
.card-avatar {
  display: inline-block;
  width: 50px;
  height: 50px;
  /* Other styles */
}
```

## Combining Text Align with CSS Writing Mode

![](https://ishadeed.com/assets/text-align/writing-mode.jpg)

In case CSS `writing-mode` is used, it’s possible to center a headline vertically.

```
h2 {
  writing-mode: vertical-lr;
  height: 100%;
  text-align: center;
}
```

## Demos

See the Pen [Text align for inline/inline-block elements](https://codepen.io/shadeed/pen/ywMjbZ/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

Thank you for reading.

{% include share.html text = “The Hidden Power of CSS Text Align” link = “[https://ishadeed.com/article/the-hidden-power-text-align/](https://ishadeed.com/article/the-hidden-power-text-align/)” %}