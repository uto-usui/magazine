---
title: "Learn CSS Centering"
source: "https://ishadeed.com/article/learn-css-centering/"
publishedDate: "2020-09-14"
category: "css"
feedName: "Ahmad Shadeed"
---

A guide to everything you need to know about centering in CSS

By Ahmad Shadeed - [@shadeed9](https://twitter.com/shadeed9)

Before starting, can you please choose your favorite plate from the below?  
You will play with it throughout the guide.

## Horizontal Centering

### Inline Elements

#### Text Align

To center an inline element like a **link** or a **span** or an **img**, all you need is `text-align: center`.

```
<div class="desk">
  <span class="plate"></span>
</div>
```

```
.desk {
  text-align: center;
}
```

For **multiple** inline elements, the process is similar. It’s possible by using `text-align: center`.

```
<div class="desk">
  <span class="plate"></span>
  <span class="plate"></span>
</div>
```

```
.desk {
  text-align: center;
}
```

#### Flexbox

By changing the desk `display` type to flex, we can easily center the content of it.

```
.desk {
  display: flex;
  justify-content: center;
}
```

Even for multiple inline items, the centering works seamlessly.

```
.desk {
  display: flex;
  justify-content: center;
}
```

#### CSS Grid

With a grid container, the plate will be centered according to its grid area. Note that this won’t work with more than one plate unless they are wrapped in an element.

I wrote a guide about grid and flexbox alignment. [Learn about box alignment](https://ishadeed.com/article/learn-box-alignment/).

```
.desk {
  display: grid;
  justify-content: center;
}
```

### Block Elements

#### Auto Margin

A block element with a **known width and height** can be centered by using an **auto value for the left and right margins**.

```
.plate {
  width: 120px;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
}
```

#### Auto Margin

With **multiple block elements**, they should be **wrapped** in an element to be centered.

```
.tray {
  display: flex;
  margin-left: auto;
  margin-right: auto;
}
```

#### Flexbox

You can use **flexbox** to center the plate.

```
.desk {
  display: flex;
  justify-content: center;
}
```

Also, you don’t need to wrap the plates in wrapper to center them. **Flexbox** can do that!

```
.desk {
  display: flex;
  justify-content: center;
}
```

#### CSS Positioning

By absolutely positioning the plate, we can easily center it horizontally with CSS transforms.

```
.plate {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

I wrote a guide about CSS positioning in detail. [Learn about CSS positioning](https://ishadeed.com/article/learn-css-positioning/).

In case the element width is known, you can use a **negative margin** instead of CSS transforms.

```
.plate {
  position: absolute;
  left: 50%;
  margin-left: -60px;
}
```

## Vertical Centering

### Inline Elements

#### Vertical Padding

One of the easiest ways to vertically center an element is using padding.

```
.desk {
  padding-top: 24px;
  padding-bottom: 24px;
}
```

#### Vertical Align

The **vertical-align** property can be used for one or multiple elements.

In this example, the fork and the knife should be **centered vertically with the plate.**

```
.desk {
  text-align: center;
}

.plate,
.fork,
.knife {
  vertical-align: middle;
}
```

![](https://ishadeed.com/assets/css-centering/img/fork.svg)![](https://ishadeed.com/assets/css-centering/img/knife.svg)

#### Flexbox

To align the plate, fork, and knife, we can use flexbox for that.

```
.desk {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

![](https://ishadeed.com/assets/css-centering/img/fork.svg)![](https://ishadeed.com/assets/css-centering/img/knife.svg)

### Block Elements

#### Absolute Positioning

By positioning an element absolutely, it’s possible to center it vertically with CSS transforms.

```
.plate {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

If the element height is known, you can use negative margin instead of positioning.

```
.plate {
  position: absolute;
  top: 50%;
  margin-top: -60px;
}
```

#### CSS Grid

With CSS grid, we can use `align-items` to center an item vertically to its grid area.

```
.desk {
  display: grid;
  align-items: center;
}
```

## Horizontal & Vertical Centering

### Inline Elements

#### Padding and Text Align

We can combine `padding` and `text-align` to center an element horizontally and vertically.

```
.plate {
  text-align: center;
  padding-top: 24px;
  padding-bottom: 24px;
}
```

### Other Element Types

#### Absolute Positioning

By absolutely positioning the plate to the left and right sides.

```
.plate {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

#### Flexbox

By using setting **justify-content** and **align-items** to **center**, it’s easy and straightforward.

```
.plate {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

#### CSS Grid

With the `place-items` property, it combines `justify-items` and `align-items`.

```
.desk {
  display: grid;
  place-items: center;
}
```

* * *

Other Articles That I Wrote

Resources

I’m writing an ebook

![](https://ishadeed.com/assets/css-centering/img/debugging-css.png)

I’m excited to let you know that I’m writing an ebook about Debugging CSS. If you’re interested, head over to [debuggingcss.com](http://debuggingcss.com/) and subscribe for updates about the book.