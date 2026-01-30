---
title: "Part 2: The Process of Implementing A UI Design From Scratch"
source: "https://ishadeed.com/article/building-ui-design-scratch-part-2/"
publishedDate: "2019-04-28"
category: "css"
feedName: "Ahmad Shadeed"
---

## Article Parts

-   Part 1: [Building The Header Element](https://ishadeed.com/article/building-ui-design-scratch/)
-   **Part 2: Building The Hero Element (This one)**
-   Part 3: [Building The Grid and Course Cards](https://ishadeed.com/article/building-ui-design-scratch-part-3/)

{% include note.html content = “This is Part 2 of the article: The Process of Implementing A UI Design From Scratch. If you haven’t read it, it’s fine, but I recommend at least to skim it to get a general idea.” %}

![](https://ishadeed.com/assets/the-process-2/design.png)

## Building The Hero Section

The hero has been used in different pages and when building it, I need to be sure that it can work in different contexts.

![](https://ishadeed.com/assets/the-process-2/heros.png)

The common between all of them is that the content is centered, and there is an equal vertical space (Top and Bottom).

### Initial HTML

```
<section class="hero">
  <h2>What do you want to learn today?</h2>
  <form action="">
    <label for="search" class="visually-hidden"
      >Search for a course or a topic</label
    >
    <input type="text" placeholder="Search for a course or a topic" />
    <button>Search</button>
  </form>
  <ul class="pills-list">
    <li><a href="#" class="pill">Technology</a></li>
    <!-- Rest of tags -->
  </ul>
</section>
```

![](https://ishadeed.com/assets/the-process-2/hero-initial.png)

Here we go again :D

The first initial step is to add a class of `hero` and to center the content.

```
.hero {
  text-align: center;
}
```

That was quick and easy. After that, I need to display each tag item next to its siblings.

```
.pills-list li {
  display: inline-block;
  margin-left: 2px;
}
```

![](https://ishadeed.com/assets/the-process-2/hero-initial-1.png)

That was the initial CSS that gives us the general look. I’ll dig into more details now!

### The Hero Height

There are a couple of options for adding a height for the hero section:

-   Fixed `height`
-   Vertical Padding
-   Vertical Margin (Why not?)
-   Using `min-height`
-   Using `min-height` or `height` with CSS Viewport Units

#### Fixed `Height`

I’m not a big fan of adding a fixed height to a hero section. This is not future-proof and could be easily broken if the content is more than expected.

In the below example, the hero is given `height: 300px` and the content is more than `300px` in height. As a result, the content goes out of its wrapper (The red border).

![](https://ishadeed.com/assets/the-process-2/hero-height-1.png)

Length content might not be in our case, but we should always plan for the worst. Our designs should be fluid as much as possible. You can’t always guarantee the length of content.

#### Vertical Padding

I added padding to the top and bottom sides of the hero wrapper.

```
.hero {
  padding-top: 6rem;
  padding-bottom: 6rem;
}
```

![](https://ishadeed.com/assets/the-process-2/hero-height-2.png)

It could work without problems, but I won’t settle on this. Sometimes, I want the height to be the same even if I added another element to the hero. For example, I might add a description paragraph below the title. In that case, the height will increase by ~ `70px` which is:

-   Not necessary.
-   Will make the hero look bigger.

![](https://ishadeed.com/assets/the-process-2/hero-height-3.jpg)

Left: Without the description paragraph. Right: With the description paragraph.

For me, this is a downside when using vertical padding. Here is how it will look in case the height was set with `min-height`.

![](https://ishadeed.com/assets/the-process-2/hero-height-4.png)

Oops! The content is still not centered. I’m aware of that and will come to this later. Be patient :D

#### Vertical Margin

```
<section class="hero">
  <div class="hero-wrapper">
    <!-- Hero elements -->
  </div>
</section>
```

```
.hero-wrapper {
  margin-top: 6rem;
  margin-bottom: 6rem;
}
```

This approach is very similar to the padding one, except I wrapped the hero elements (Headline, Form, Pills) in an wrapper. I won’t go with it for the exact same reasons as the padding solution.

#### Using `min-height`

-   It acts as a minimum height for the hero, in case the content inside it is short.
-   The height can extend in case the content was more than expected.

When combining pixels with viewport units, the result will be a dynamic and fluid hero that acts to the width and height of its viewport.

```
.hero {
  min-height: calc(200px + 9vmax);
}
```

### The Hero Cover Image With Tint

This is not just about adding the image, there is also a tint that is placed at the top of the image to ensure that the white text is easy to read and accessible.

I have those options for that:

-   Multiple CSS Backgrounds
-   An `<img>` with a pseudo element for the tint
-   `<img>` + SVG

#### Multiple CSS Backgrounds

It’s possible to add multiple backgrounds, one of them is for the tint, and the other is for the background image itself.

```
.hero {
  background: linear-gradient(
      rgba(7, 158, 186, 0.15),
      rgba(7, 158, 186, 0.15)
    ), url("../img/hero-cover.jpg");
}
```

![](https://ishadeed.com/assets/the-process-2/hero-height-6.png)

The first background is a gradient for the tint, and the second one is the actual image. This can work great if the image won’t be changed every time in a while. It’s possible to inline the CSS and assign a new background with JavaScript, but this is not straightforward.

I would go with that solution only in case the background is static and won’t be changed.

#### An `<img>` With A Pseudo Element

The image will be absolutely positioned to the hero, along with a pseudo element added to the hero wrapper.

```
.hero {
  position: relative;
}

.hero img {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}

.hero:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: rgba(7, 158, 186, 0.15);
}
```

It’s easier and more future-proof to use than the multiple backgrounds solution.

#### An `<img>` With SVG Filters

SVG filters are powerful. It’s possible to use `filter: url()` in CSS to assign the filter to the image, and it will work easily.

However, the only downside here is that changing the color tint is not easy to be done manually. If the tint color should be changed, the author will need to modify the `feColorMatrix`, which is a bit hard to do without a tool.

```
.hero img {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  filter: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='tint'><feColorMatrix type='matrix' values='0.03 0 0 0 0 0 0.62 0 0 0 0 0 0.73 0 0 0 0 0 .8 0 '/></filter></svg>#tint");
}
```

I’ve used [this](http://andresgalante.com/RGBAtoFeColorMatrix/) tool in the process, which converts a color from rgba to an SVG matrix.

![](https://ishadeed.com/assets/the-process-2/hero-height-7.png)

#### Which solution I should go with?

I think that the SVG solution is the best, as I don’t have an additional pseudo element and it’s more straightforward. The only downside is that the color can’t be changed quickly, I tweaked it manually to be similar to the design.

### Centering The Content

If I used the padding or margin for the height of the hero, I don’t need to center anything since this comes by default. The first thing that I thought about is Flexbox. I added the following:

```
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

![](https://ishadeed.com/assets/the-process-2/hero-height-8.png)

### Spacing The Hero Items

Since the items in there are not static, and there is a possibility to add or remove items, the best way to add a space between them is to use CSS Adjacent selector.

```
.hero > * + * {
  margin-top: 16px;
}
```

### Pill Component

I already built the component in part 1, and for the hero, I need to create a variation of it like so.

```
.pill--outline {
  text-transform: initial;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(#fff, 0.5);
  font-weight: 400;
  padding: 3px 10px;
}
```

![](https://ishadeed.com/assets/the-process-2/hero-pill.png)

Cool. Next step is the search form!

### Hero Search Form

I added some general styles to the input and button, and centered the form and gave it a width. There is something weird, the space I added from `.hero > * + *` is no longer working on the form.

![](https://ishadeed.com/assets/the-process-2/hero-search-1.png)

Notice that the form is very close to the title. I inspected the code and laughed at myself. This is a mistake that I did. I centered the form using `margin: 0 auto` and that canceled the spacing from the hero element.

![](https://ishadeed.com/assets/the-process-2/hero-search-2.jpg)

Lesson learned. Don’t use `margin: 0 auto` and instead add both of `margin-left` and `margin-right` in those cases.

Alright, back to the form element. If you notice in the original design, there is a border around the whole form. I will try to add it now.

I added a background for the whole form, and then a border of 5px.

```
.hero {
  background: #fff;
  border: 5px solid #fff;
}
```

I got this:

![](https://ishadeed.com/assets/the-process-2/hero-search-3.png)

The border is there, but I need it to be:

-   Transparent
-   Outside its wrapper (The search form)

The border should use `rgba()` in order for it to be transparent, but this won’t change the result. I need the border to be **outside** its wrapper.

Since I added a white background, and there is a 5px border. I thought about using CSS `background-clip` to only apply the background to the content, and to ignore the border area.

```
.hero {
  background: #fff;
  background-clip: content-box;
  border: 5px solid rgba(255, 255, 255 0.5);
}
```

![](https://ishadeed.com/assets/the-process-2/hero-search-4.png)

### Image Fallback

What if the image didn’t load? Let’s see how the hero will look without a cover image.

![](https://ishadeed.com/assets/the-process-2/hero-image-fallback.jpg)

This is unacceptable and will create a bad experience for the user. At first, I thought about adding a pseudo-element for the `<img>`, yes, this is possible. I learned about it from [bitsofcode](https://bitsofco.de/styling-broken-images/).

A pseudo-element for an `<img>` works only if the `src` attribute failed to load.

```
.hero img {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
}
```

Here is how it looks in Chrome.

![](https://ishadeed.com/assets/the-process-2/hero-image-fallback-1.png)

Unfortunately, it doesn’t work in Firefox after testing, so I won’t go with that solution.

The other solution is to add a `background` to the `<img>`, it will only work if the image is not loaded. I added a subtle text shadow to the headline and pill items to make it more readable.

```
.hero img {
  /*Other styles*/
  background: #06aed5;
}
```

![](https://ishadeed.com/assets/the-process-2/hero-image-fallback-2.png)

In addition, to act as a fallback in case the image didn’t load, adding a `background` to it could act as a **loading** status. Check below for a screenshot from Chrome performance profile:

![](https://ishadeed.com/assets/the-process-2/hero-image-loading.gif)

### Mobile Tweaks

For now, I will focus a bit on how to make the hero look better on mobile. Here is how it looks:

![](https://ishadeed.com/assets/the-process-2/hero-mobile-1.png)

There are a couple of issues:

-   On both the left and right sides, the content is close to the edges. I need to add padding to solve that.
-   The pills need to have some vertical spacing between them.
-   The form caused an overflow on the page.
-   The image is compressed and doesn’t look natural.

The first thing I did is that I added padding to the left and right sides. Then, I need to fix the form overflow issue.

There is another weird issue in there which is the overflow on the form. Here are the solutions that came to my mind:

#### 1\. To absolutely position the button, this will make the input take 100% width of its parent.

```
.hero-search {
  position: relative;
}

.hero-search button {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}

.hero-search input {
  padding-right: 85px;
}
```

![](https://ishadeed.com/assets/the-process-2/hero-mobile-2.jpg)

It works, but this more of a hack for me.

#### 2\. Resetting the default behaviour for Flexbox

Since the form element is a flexbox wrapper, the input minimum size can’t be smaller than its content. This is the default behaviour. To override that, I need to set `min-width: 0`.

```
.hero-search input {
  /*Other styles*/
  min-width: 0;
}
```

![](https://ishadeed.com/assets/the-process-2/hero-mobile-3.jpg)

I’m still not satisfied with how it looks on mobile. What about reducing the size of the headline and form element? Let’s try that.

I did the below tweaks:

-   Reduced the size of the headline, form and hero.
-   Replaced the label “Search” with a search icon.
-   The pills list can now scroll horizontally.
-   Added `object-fit: cover` to the `<img>` to make it look better.

![](https://ishadeed.com/assets/the-process-2/hero-mobile-4.jpg)

### Add Scrolling Hints To The Pills On Mobile

![](https://ishadeed.com/assets/the-process-2/hero-mobile-5.png)

#### Transparent Gradient

Since the pills list is now scrollable on mobile, it’s better to add a hint to it. I thought about adding a transparent white gradient at the right side to indicate that. Let’s try that!

```
.pills-list {
  position: relative;
}

.pills-list::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 30px;
  background: linear-gradient(to left, #fff, transparent);
  opacity: 0.5;
}
```

![](https://ishadeed.com/assets/the-process-2/hero-mobile-6.png)

Since the gradient added is positioned absolutely, it will scroll with the pills list. See below:

As a solution, I need to position the gradient fixed to its parent, in additional to change its color to teal or something similar to the tint so it can look more realistic.

![](https://ishadeed.com/assets/the-process-2/hero-mobile-7.png)

With some testing, it turned out that this solution is not good. Since the transparent gradient is fixed, it appears to the far right of the viewport, and not on the last pill. This happens only on large screens.

![](https://ishadeed.com/assets/the-process-2/hero-mobile-8.jpg)

#### CSS Mask

I remembered the old days when I used the brush tool in Photoshop to **fade** a certain object with the `hardness` value set to zero.

It’s possible to add a transparent gradient to the pills list, which will mimic the effect of brushing it from the right side. See below:

I will do exactly the same using CSS Masks. By adding the below CSS, the pills list will fade at the end to indicate that it’s scrollable.

```
.pills-list {
  mask-image: linear-gradient(to right, #000 70%, transparent);
}
```

**How does that work?** The mask gradient is from black to transparent. Imagine that the pills list is inserted inside that mask.

![](https://ishadeed.com/assets/the-process-2/hero-mask.jpg)

**Final Result**

## Solid Hero

I’m going to build a variation of the hero section. This one is a bit different than the first one I made:

-   It has a solid background with a pattern.
-   The height is smaller.

```
.hero--logged {
  min-height: 200px;
  background: var(--color-brand-primary) url("../img/hero-pattern.svg")
    center/contain;
}

.hero--logged h2,
.hero--logged p {
  color: #fff;
  text-shadow: none;
}
```

![](https://ishadeed.com/assets/the-process-2/hero-solid.png)

## Conclusion

And that’s a wrap. It was a great journey to document every step of building the hero element. Next step is to build the grid element and course card, stay tuned for part 3 of the article.

Hope you enjoyed it and thanks for reading! Do you have any feedback? Please ping me on Twitter [@shadeed9](https://twitter.com/shadeed9)

## Codepen Demo

See the Pen [Nadros - Hero Component - Final](https://codepen.io/shadeed/pen/yrwMKo/) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).