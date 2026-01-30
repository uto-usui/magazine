---
title: "CSS Mistakes While On Autopilot"
source: "https://ishadeed.com/article/css-mistakes/"
publishedDate: "2020-08-09"
category: "css"
feedName: "Ahmad Shadeed"
---

When we’re very focused on working on a web project, we tend to forget or do some mistakes that can lead to an invalid CSS code. I like to call these “Autopilot mistakes”. The kind of mistakes that make us ask ourselves: “Oops, why did I do that?”, and solving them doesn’t take much time, only if you found them in the first place.

I asked on Twitter about the funniest mistakes that a front-end developer can do, and I got some funny responses.

> — Ahmad Shadeed (@shadeed9) [August 9, 2020](https://twitter.com/shadeed9/status/1292341340584411136?ref_src=twsrc%5Etfw)

In this article, I will go through some of the most common and funny CSS mistakes that we do while in autopilot.

## Mistakes that I do

### Font Size

Mistaking between `font-size` and `font-weight` is common. Here is the mistake that I do too much.

```
.title {
  font-size: bold;
}
```

### Opacity

I don’t exactly know the reason, but sometimes I tend to forget the percentage for the opacity value.

```
.title {
  opacity: 50;
}
```

Another common issue is mistyping the `opacity` property.

```
.title {
  /* It's not easy to spot this */
  opaciy: 0.5;
}
```

### Font Weight

Is it `light` or `lighter`?

```
.title {
  font-weight: light;
}
```

### Padding

This can happen when you think that the property is `padding`, while in reality, it’s `padding-top`.

```
.section {
  padding-top: 10px 20px;
}
```

### CSS Grid

Sometimes, I type `grid-column` instead of `grid-template-columns`.

```
.section {
  grid-columns: 1fr 1fr 1fr;
}
```

### CSS Variables

I don’t why, but I found that I’m too lazy to write `var(--brand-color)` instead.

```
.title {
  color: --brand-color;
}
```

### Box Shadow

I always forget that `box-shadow` should be reset by using `none`.

```
.title {
  /* Invalid */
  box-shadow: 0;
}
```

Also mentioned by [Ahmed Hosna](https://twitter.com/ahmedhosna95/status/1292415114818260993)

### Visibility

Credit goes to [Ori Livni](https://twitter.com/oriSomething/status/1292342586594791424)

```
.title {
  visibility: none;
}
```

### Width

I can’t count the times I did this, and it reminds me of Sublime Text.

Credit goes to [bullzito](https://twitter.com/bullzito/status/1292347860826984448)

```
.title {
  widows: 100px;
}
```

### Offset Properties

There is a weird feeling of abandoning units from CSS offset properties for a positioned element.s

Credit goes to [ciruelo](https://twitter.com/SckTesu/status/1292350381779873792)

```
.elem {
  left: 14;
}
```

### CSS Calc()

If the code editor you’re using doesn’t provide proper highlighting, you will miss this one.

Credit goes to [Sven Wolfermann](https://twitter.com/maddesigns/status/1292355988037734403)

```
.elem {
  font-size: clac(14px + 1vw);
}
```

### CSS Color

I remember facing such a mistake. Maybe that’s the result of using `red` to quickly prove something?

Credit goes to [TJ Trewin](https://twitter.com/melior64/status/1292368298110267392)

```
.elem {
  color: #red;
}
```

### Display

```
.title {
  display: absolute;
}
```

Credit goes to [Nitin Suresh](https://twitter.com/nitin_suresh_/status/1292423031483113472)

### Transforms

```
.title {
  translate: (-50%, -50%);
}
```

Credit goes to [Håvard Bob](https://twitter.com/brynjulfs1/status/1292591795411525633)

## I’m writing an ebook

In that regard, I’m excited to let you know that I’m writing an ebook about Debugging CSS.

![](https://ishadeed.com/assets/css-mistakes/debugging-css.png)

If you’re interested, head over to [debuggingcss.com](https://debuggingcss.com/) and subscribe for updates about the book.