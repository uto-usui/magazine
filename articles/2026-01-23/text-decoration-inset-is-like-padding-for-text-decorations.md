---
title: "text-decoration-inset is Like Padding for Text Decorations"
source: "https://css-tricks.com/text-decoration-inset-is-like-padding-for-text-decorations/"
publishedDate: "2025-12-22"
category: "css"
feedName: "css-tricks"
author: "Daniel Schwarz"
---

The `text-decoration-inset` CSS property solves a problem that we’ve had since the beginning of the web, which is that text decorations such as underlines extend beyond the first and last characters (to the edges of the content box, to be specific), resulting in vertical misalignment.

![A default blue link zoomed in to the spacing between the text underline and border box, showing that the underline extends all the way to the border box.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/s_D076312BE0BFA86E470991C3F4F4FFDC8FC70B53FE9512B908FB4EEBCD34B82A_1764951369403_link-underline-spacing.jpg?resize=1576%2C692&ssl=1)

I say it’s a problem “we’ve” had rather sheepishly because maybe you, like some users, don’t actually care. But if you’re a funny bunny like me (I think “designer” is the technical term) then it most likely drives you crazy.

That being said, it’s not a problem that I’ve tried to fix because the juice just isn’t worth the squeeze. The best fix is probably `text-decoration: none` and `::after` with a custom background, but this can be a bit finicky and I’d rather use all of the features that come with native text decorations, such as `text-decoration-thickness`, `text-underline-position` (which enables us to change the position of the underline relative to the font’s internal metrics; the baseline, for example), and `text-underline-offset` (which determines the offset from _that_ position).

So, how does `text-decoration-inset` work? Well, if I trim an underline just enough for it to vertically align with the text, I wind up with this instead (this only works in Firefox 146, by the way):

![A default blue link zoomed in to the spacing between the text underline and border box, showing that the underline does not extend all the way to the border box.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/12/s_D076312BE0BFA86E470991C3F4F4FFDC8FC70B53FE9512B908FB4EEBCD34B82A_1764952037700_link-underline-spacing-fixed.jpg?resize=1576%2C692&ssl=1)

However, you can actually trim the decorations as much as you want, which enables us to create some really cool ones and even transition or animate them. Let’s take a quick look, shall we?

### `text-decoration-inset` basic usage

`text-decoration-inset`, [formerly `text-decoration-trim`](https://github.com/w3c/csswg-drafts/issues/8402), enables us to clip from the ends of the underline or whatever `text-decoration-line` is computed. This is the syntax:

```
text-decoration-inset: <left-inset> <right-inset>;
```

Yes, this means that we can set different inset values for the left and right sides.

These values must be `<length>`s, but we can use relative lengths such as `em` units, which are relative to the computed `font-size`. So, if the `font-size` changes, the insets scale with it. For example, in the demo above, `0.076em` (which is what I’ve set as the left inset) means 7.6% of the computed `font-size`, and that’s the value that makes the left inset align with the left [stem](https://designshack.net/articles/typography/what-is-stem-typography/) of the letter “N” and other left stems. This value was determined by trial and error, but it only needs to be determined once for each font.

If that first letter was, say, W? Yeah, then the inset wouldn’t align, so it’s not a _perfect_ solution. I’d say that it’s suitable for when you know what the content will be.

Maybe the W3C will come up with a solution for vertically aligning text decorations as well as multiple lines of text both accurately and automatically. Until then, this is still a cool solution that enables us to create perfectly aligned effects like this (this demo uses an overline _and_ an underline, and a whole ‘lotta `text-decoration-thickness` of course):

### Animating `text-decoration-inset`

`text-decoration-inset` is more interesting when we start to think about transitions/animations. We often animate underlines, or should I say faux `::after` underlines, but with `text-decoration-inset` we can do it natively. In the example below I multiply the insets by ten on `:hover`. Nothing too crazy, but remember that we can only use `<length>` values, so try to use `em` units, or at least test the text with different font sizes.

Again, Firefox 146+ required at the moment:

```
a {
  transition: 300ms;
  text-decoration-inset: 0.046em 0.009em;

  &:hover {
    text-decoration-inset: calc(0.046em * 10);
  }
}
```

Getting a bit more ambitious now, this next demo leverages a CSS [`@keyframes`](https://css-tricks.com/almanac/rules/k/keyframes/) animation to create that shooting star underline effect. How it works is that we push the left inset all the way to the other side — but `<length>`s only, remember? We can’t use `100%` here, so instead I’ve determined that the width of the element is `4.5em` and used that as the value instead (the more precise we are, the better the animation or transition). Check the code comments for a full explanation:

```
a {
  /*
    The value at the start and end of the
    animation, as well as the default value
  */
  text-decoration-inset: 0.046em 0.009em;

  &:hover {
    animation: 1s next-level;
  }
}

@keyframes next-level {
  /* By half-way through the animation... */
  50% {
    /*
      ...the left inset has shifted 4.5em, 
      which is the full width of the element
    */
    text-decoration-inset: 4.5em 0.009em;

    /* It’s faded out as well */
    text-decoration-color: transparent;
  }

  /* Immediately after that... */
  50.999% {
    /* ...both insets are set to the left */
    text-decoration-inset: 0.046em 4.5em;
  }

  /* Then it animates back to the default value */
}
```

Overall, `text-decoration-inset` is a nice feature. It isn’t without its flaws, but no feature ever is. Personally, anything that helps me to refine a detail natively is very much welcome, and with `text-decoration-inset` we’re able to refine two — the text decoration alignment (relative to the text) and the text decoration transition or animation.