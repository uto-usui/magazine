---
title: "Clipping Scrollable Areas On The inline-start Side"
source: "https://ishadeed.com/article/clip-scrollable-areas-inline-start/"
publishedDate: "2021-02-07"
category: "css"
feedName: "Ahmad Shadeed"
---

This is the first of its kind blog post. I simply called it “You might not know”. For this one, I want to share something about the default behavior of clipping scrollable areas.

Say we have a section with a decorative pseudo-element (The document direction is LTR).

![](https://ishadeed.com/assets/clip-content-inline-start/the-problem-0.png)

```
.section::before {
  position: absolute;
  left: -20px;
  top: 5px;
  width: 150px;
  height: 75px;
  background: url("img/dice.svg") center/cover no-repeat;
}
```

Notice that the pseudo-element is positioned on the left side with a negative value. This isn’t causing any horizontal scrolling and you don’t need to apply `overflow: hidden`.

The designer has changed their mind and they want the decorative element to be on the right side, so you do the following.

```
.section::before {
  /* You swapped left with right */
  right: -20px;
}
```

Boom! We have a horizontal scrollbar. Why did that happen when the pseudo-element was moved to the right side? Wasn’t it working fine before that?

![](https://ishadeed.com/assets/clip-content-inline-start/the-problem-1.png)

Well, the reason is that because the browser user agent **will clip the overflow area of the block-start and inline-start areas**. In the first example, the pseudo-element was placed on the left side with a negative margin. This is considered the inline-start, so the browser clipped it for us.

According to the [CSS spec](https://www.w3.org/TR/css-overflow-3/#scrolling-direction):

> UAs must clip the scrollable overflow area of scroll containers on the block-start and inline-start sides of the box (thereby behaving as if they had no scrollable overflow on that side).

## Right to left documents (RTL)

For a document that starts from right to left (e.g: Arabic website), the inline-start of the document will be on the right side. That means, if a pseudo-element is placed with a negative value on the right side, the browser will clip the overflow for us.

If the root has `dir="rtl"`, the inline-start will be on the right side.

```
<html dir="rtl"></html>
```

What I found interesting is that Firefox shows a horizontal scrollbar even though the direction is RTL and the element is positioned on the right. Chrome and Safari are displaying the element as expected.

![](https://ishadeed.com/assets/clip-content-inline-start/the-problem-2.png)

I will investigate more in the behavior of Firefox. For the time being, be careful when you position elements outside their parent as a scrollbar will appear. The solution now is to use `overflow-x: hidden`.

## I wrote an ebook

I’m excited to let you know that I wrote an ebook about Debugging CSS.

![](https://ishadeed.com/assets/css-mistakes/debugging-css.png)

If you’re interested, head over to [debuggingcss.com](https://debuggingcss.com/) for a free preview.