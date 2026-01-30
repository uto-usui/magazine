---
title: "The Art of Building Real-life Components"
source: "https://ishadeed.com/article/building-real-life-components/"
publishedDate: "2021-01-05"
category: "css"
feedName: "Ahmad Shadeed"
---

It’s fairly possible to judge a component and say that it’s easy to implement it in HTML&CSS. I agree, it’s easy when you are working for practice purposes only, but for a real-life project, it’s completely different. The perfect responsive component that you just built will fail quickly in case it was used for a real-life project with real content. Why? It’s because judging on how a component can be built without considering the edge cases.

In this article, I will show you a component that looks simple from the first glance, but there is a ton of work behind it. To make more realistic, I will take an example from Facebook Messenger.

## Introduction

For this article, I will take a very simple component from Facebook Messenger. See the figure below:

![](https://ishadeed.com/assets/real-comp/intro.png)

In the sidebar, there is a list of cards for people that I messaged on Facebook. For the sake of this article, I’m interested in the card component only. How would you implement this in HTML & CSS? It’s simple, right? It’s tempting to say that it consists of an image, and a `<div>` next to it. Here is a visual of the first thing you might think of.

![](https://ishadeed.com/assets/real-comp/intro-2.png)

The above could be the case if this is a UI challenge or something that is for learning purposes only. However, If you want to build something that is solid and fluid, it might fail quickly. Let’s explore the basic way of implementing this in HTML & CSS.

```
<div class="card">
  <img class="card__image" src="assets/shadeed.jpg" alt="" />
  <div>
    <h3>Ahmad Shadeed</h3>
    <p>You: Thanks, sounds good! . 8hr</p>
    <img class="card__seen" src="assets/shadeed.jpg" alt="" />
  </div>
</div>
```

```
.card {
  position: relative;
  display: flex; /* [1] */
  align-items: center; /* [2] */
  background-color: #fff;
  padding: 8px;
  border-radius: 7px;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.05);
}

.card h3 {
  font-size: 15px;
}

.card p {
  font-size: 13px;
  color: #65676b;
}

.card__image {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  margin-right: 12px;
}

.card__seen {
  position: absolute; /* [3] */
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
```

I highlighted some lines above, and want to explain them a bit:

1.  I used flexbox because it’s suitable for that use-case as we have a horizontal design.
2.  The child items needs to be centered vertically.
3.  The seen sign is absolutely positioned at the right and centered vertically.

## Let’s make it fail

The above implementation has nothing wrong, but it’s not scalable. I will show another variation for the component.

![](https://ishadeed.com/assets/real-comp/intro-3.png)

The blue badge on the right indicates that this is a **new message** that I didn’t open yet. While the green one on the avatar indicates that the user is currently online.

Notice how we have two new badges. What’s the best way to add them? If you refer to the CSS I wrote for the initial component, you will notice that we have the class `.card__seen` for the small user avatar on the right. In this variation, the `.card__seen` should be replaced by the blue badge.

With the HTML & CSS written, implementing this variation won’t be possible until we alter the HTML.

To be clear with you, the variation shown is just scratching the surface of the possibilities. This component has a lot of variation and cases.

## All the variations

Here is a visual for the variations of this component. I tried my best to design them all (Yes, I designed them manually).

![](https://ishadeed.com/assets/real-comp/variations-1.png)

Not only that, we also need to take care of the dark mode styles.

![](https://ishadeed.com/assets/real-comp/variations-2.png)

In this article, I will explore with you on the best way to implement a solid component that can handle all the variations and changes without it being broken. The article just started, let’s dive in!

## The spacing

Before anything else, I looked carefully at the spacing between each UI element, and worked on the following figures. Notice how there are lots of spacing and sizes in this _simple_ component.

![](https://ishadeed.com/assets/real-comp/spacing.png)

When designing a UI and implementing it in HTML & CSS, one of the key things to take care of is the spacing. Underestimating that can lead to a different UI by time.

## The component areas

To implement a proper component, we need to carefully think about the HTML markup first. In our case, we have two areas of the component that have multiple variations which are the avatar and the content areas.

## The Avatar

![](https://ishadeed.com/assets/real-comp/html-avatar-1.png)

To work on the HTML for the avatar part, we need to understand its states first. Here are the possible variations:

-   Single avatar
-   Single avatar with an online status badge
-   Multiple avatars for group chat
-   Multiple avatars with an online status badge

Considering the following HTML, we want to make sure that `.card__avatar` can handle all the variations above.

```
<div class="card">
  <div class="card__avatar"></div>
  <div class="card__content">
    <!-- Name, message, badge.. -->
  </div>
</div>
```

### Single avatar

Lets zoom in to the HTML and focus on the first variation, which is a single avatar. The avatar should have in inner border (or inset shadow) to make it look like a circle even if the used avatar is full white.

![](https://ishadeed.com/assets/real-comp/html-avatar-2.png)

In CSS, it’s not possible to apply an inset (inner) `box-shadow` to an `<img>` element. We have two options:

-   Using an additional `<div>` with a transparent `border`.
-   Using an `<svg>`.

The goal if the inner border is to show a outline around the avatar in the cases:

-   full white avatar in light mode
-   full black avatar in dark mode

![](https://ishadeed.com/assets/real-comp/inset-shadow.png)

Without an inner border, using a full white avatar will make it blend with its parent background. The same applies for dark mode. Here is a visual of what will happen with and without the inner border.

![](https://ishadeed.com/assets/real-comp/inner-shadow-2.png)

#### Using a `<div>` for the inner border

For this solution, an additional element (a `<div>` in this example) is absolutely positioned above the image with an opacity of `0.1`.

```
<div class="card__avatar">
  <img src="assets/shadeed.jpg" alt="" />
  <div class="border"></div>
</div>
```

```
.card__avatar {
  position: relative;
}

.card__avatar img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}

.border {
  position: absolute;
  width: 56px;
  height: 56px;
  border: 2px solid #000;
  border-radius: 50%;
  opacity: 0.1;
}
```

This solution works, but it has some limitations that I will explain in a bit.

#### Using an `<svg>` element

For this solution, we will use an `<svg>` element. The idea is to use a circle mask for the avatar, and a `<circle>` element for the inner border. SVG works great for this.

```
<svg role="none" style="height: 56px; width: 56px">
  <mask id="circle">
    <circle cx="28" cy="28" fill="white" r="28"></circle>
  </mask>
  <g mask="url(#circle)">
    <image
      x="0"
      y="0"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      xlink:href="/assets/shadeed.jpg"
      style="height: 56px; width: 56px"
    ></image>
    <circle class="border" cx="28" cy="28" r="28"></circle>
  </g>
</svg>
```

```
.border {
  stroke-width: 3;
  stroke: rgba(0, 0, 0, 0.1);
  fill: none;
}
```

Both of the solutions are fine when building the single avatar example only. However, things start to get more interesting when we add the online badge element.

### Single avatar with an online status badge

In light mode, the green badge has a white border. However, in dark mode, this should be cut from the avatar itself. In other words, a mask should be used.

![](https://ishadeed.com/assets/real-comp/html-avatar-3.png)

How can we do that? Well, it turns out that if we use the `<svg>` solution for the single avatar, this can be solved easily by using an SVG mask.

```
<svg role="none" style="height: 56px; width: 56px">
  <mask id="circle">
    <!-- [1] -->
    <circle cx="28" cy="28" fill="white" r="28"></circle>
    <!-- [2] -->
    <circle cx="48" cy="48" fill="black" r="7"></circle>
  </mask>
  <!-- [3] -->
  <g mask="url(#circle)">
    <image
      x="0"
      y="0"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      xlink:href="/assets/shadeed.jpg"
      style="height: 56px; width: 56px"
    ></image>
    <circle class="border" cx="28" cy="28" r="28"></circle>
  </g>
</svg>
```

Let me break down the following SVG code:

1.  A circle to mask the actual avatar.
2.  A small circle to cut from the lower right corner of the avatar.
3.  A group that contains the `<image>` and a `<circle>` for the transparent inner border.

Here is a visual that explains how the multiple circles works as a mask works. It’s magic, isn’t it?

![](https://ishadeed.com/assets/real-comp/html-avatar-4.png)

With that, here is how the HTML looks for the avatar with the online badge.

```
<div class="card__avatar">
  <svg role="none" style="height: 56px; width: 56px">
    <mask id="circle">
      <circle cx="28" cy="28" fill="white" r="28"></circle>
      <circle cx="48" cy="48" fill="black" r="7"></circle>
    </mask>
    <g mask="url(#circle)">
      <image
        x="0"
        y="0"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        width="100%"
        xlink:href="/assets/shadeed.jpg"
        style="height: 56px; width: 56px"
      ></image>
      <circle class="border" cx="28" cy="28" r="28"></circle>
    </g>
  </svg>
  <div class="badge"></div>
</div>
```

```
.card__avatar {
  position: relative;
  display: flex;
  margin-right: 12px;
}

.badge {
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 10px;
  height: 10px;
  background: #5ad539;
  border-radius: 50%;
}
```

When a component like this one needs to adapt for both light and dark layouts, it’s highly recommended to use CSS variables to handle to store the values of colors that needs to change.

```
:root {
  --primary-text: #050505;
  --secondary-text: #65676b;
  --bg-color: #fff;
}

html.is-dark {
  --primary-text: #e4e6eb;
  --secondary-text: #b0b3b8;
  --bg-color: #242526;
}

.card {
  background-color: var(--bg-color);
}

.card__title {
  color: var(--primary-text);
}

.card__subtitle {
  color: var(--secondary-text);
}
```

### Multiple avatars for group chatting

In the case of a chat with multiple persons, the avatar area will have two avatars with each one of them positioned at the top right and the bottom left, respectively.

To keep the single and multiple avatars aligned, we need to set a fixed size on the parent of the multiple avatars.

```
.card__avatar {
  width: 56px;
  height: 56px;
}
```

![](https://ishadeed.com/assets/real-comp/avatars-multiple-1.png)

This variation requires a markup change, here is how the HTML should be.

```
<div class="card__avatar card__avatar--multiple">
  <svg
    class="avatar avatar-1"
    role="none"
    style="height: 36px; width: 36px"
  ></svg>
  <svg
    class="avatar avatar-2"
    role="none"
    style="height: 36px; width: 36px"
  ></svg>
  <div class="badge"></div>
</div>
```

```
.card__avatar--multiple {
  position: relative;
  width: 56px;
  height: 56px;
}

.card__avatar--multiple .avatar {
  position: absolute;
}

.card__avatar--multiple .avatar-1 {
  right: 0;
  top: 0;
}

.card__avatar--multiple .avatar-2 {
  left: 0;
  bottom: 0;
}

.card__avatar--multiple .badge {
  right: 6px;
  bottom: 6px;
}
```

![](https://ishadeed.com/assets/real-comp/avatars-multiple-2.png)

## The content

This area is where the user can see the name of the person they are chatting with, and the content of the message or the action.

![](https://ishadeed.com/assets/real-comp/content-area.png)

I can imagine the markup of this divided into two parts, one for the text content (name, message or action) and the second for the indicator on the right side (new message, seen, muted, sent).

![](https://ishadeed.com/assets/real-comp/content-area-2.png)

### The first part

Let’s explore the HTML markup for the content area.

```
<div class="card__content">
  <div class="card__content__start">
    <h3>Ahmad Shadeed</h3>
    <div class="row">
      <p>
        You: Thanks, sounds good. What about doing a webinar, too?
      </p>
      <span class="separator">.</span>
      <time>8hr</time>
    </div>
  </div>
  <div class="card__content__end">
    <!-- The indicator (new message, seen, muted, sent) -->
  </div>
</div>
```

```
.card__content {
  display: flex;
  flex: 1;
}

.card__content__start {
  display: flex;
  flex: 1;
}

.card__content__start .row {
  display: flex;
  align-items: center;
}

.card__content__end {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 12px;
}

.separator {
  margin-left: 4px;
  margin-right: 4px;
}
```

With the above, the content area looks like the below (This is a screenshot taken from Firefox).

![](https://ishadeed.com/assets/real-comp/content-area-3.png)

The length of the name or the message can be very long. It’s important to account for that from the very beginning. First, let’s explore the “flow as you like” approach.

![](https://ishadeed.com/assets/real-comp/content-area-4.png)

In the figure above, the second card content wrap into multiple lines. This isn’t looking good for such a component. To avoid that, here is what to do:

-   Set `min-width: 0` on flex child items. Why? I will let you know in a few.
-   Truncate the text using `overflow`, `white-space`, and `text-overflow` properties. I [wrote](https://ishadeed.com/article/css-short-long-content/) about handling short and long content in details.

I added the following to the name and the paragraph:

```
.card__content__start h3,
.card__content__start p {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

However, this can’t magically solve our problem when we are using flexbox. Notice the result after applying the CSS above:

![](https://ishadeed.com/assets/real-comp/content-area-5.png)

The reason is that flex items won’t shrink below their minimum content size. To solve this, we need to set `min-width: 0` on `.card__content` and `card__content__start` elements.

![](https://ishadeed.com/assets/real-comp/content-area-6.png)

### The second part

Each message has an indicator, and we should account for all of them. Here are all the indicators that I noticed. There might be more that I’m not aware of (If yes, please let me know).

![](https://ishadeed.com/assets/real-comp/message-status.png)

For this part, we will focus on the element `.card__content__end` and its inner content.

```
<div class="card__content">
  <div class="card__content__start">
    <!-- The name and message -->
  </div>
  <div class="card__content__end">
    <!-- The indicator (new message, seen, muted, sent) -->
  </div>
</div>
```

By having a generic element, any component can live within it. The element `.card__content__end` shouldn’t have any styles like color or font size, it will only serve as a home for a specific component.

### New message

While checking how Facebook did the new message indicator, it turned out that it’s a button with the label “Mark as read”.

```
<div role="button" aria-label="Mark as read" tabindex="0"></div>
```

![](https://ishadeed.com/assets/real-comp/new-message.png)

I don’t know about the context of why the team at Facebook chose a `<div>` instead of an actual `<button>` element. With the native button, we don’t need to use `role`, `aria-label`, and `tabindex`. Instead, all of those are available for free.

### Single seen avatar

Similar to the user avatar, the seen one is no different. It uses an `<svg>` element for the avatar with an `aria-label` that shows the user’s name.

![](https://ishadeed.com/assets/real-comp/single-seen.png)

```
<svg aria-label="Ahmad Shadeed" role="img">
  <!-- Mask and image -->
</svg>
```

### Multiple seen avatars

To be honest, this is my favorite one. I really like how the team at Facebook implemented it.

![](https://ishadeed.com/assets/real-comp/multiple-seen.png)

Do you notice a border between the two avatars? From a first glance, you might think that this is a CSS border to the first avatar. If you thought like this, sorry to let you know that you’re wrong (just as my first initial thought).

This is implemented as an SVG mask. Yes, you heard that right!

```
<svg role="none">
  <mask id="circle">
    <circle cx="8" cy="8" fill="white" r="8"></circle>
    <circle cx="-4" cy="8" fill="black" r="10"></circle>
  </mask>

  <g mask="url(#circle)">
    <image></image>
    <circle class="border" cx="28" cy="28" r="28"></circle>
  </g>
</svg>
```

Here is a visual of how this works.

![](https://ishadeed.com/assets/real-comp/multiple-seen-2.png)

This is amazing. Isn’t it? I really like using SVG for this specific use-case.

## RTL content

In case that the layout is LTR (Left-to-right) and the message content is in Arabic, the direction of the message content should be RTL (Right-to-left).

![](https://ishadeed.com/assets/real-comp/ltr-vs-rtl.png)

Since the element `.card__content__start` is a flex container, the child items will automatically flip depending on the `direction` of the component or the root element. This can be dynamically added depending on the content language.

```
<div class="card__content">
  <div class="card__content__start" style="direction: rtl"></div>
  <div class="card__content__end"></div>
</div>
```

## Flipping the component

If the user chose an RTL (Right-to-left) like Arabic for the whole UI, then the component should be flipped.

![](https://ishadeed.com/assets/real-comp/ltr-vs-rtl-2.png)

Since flexbox is used for laying out the items, there is no much work needed except to flip the margins.

```
/* LTR */
.card__content__end {
  margin-left: 12px;
}

/* LTR */
.card__content__end {
  margin-right: 12px;
}
```

## Accessibility details

### Using the keyboard

To build a product that works with billions of users, it must be fully accessible. For the component of this article, I tested in Chrome and Firefox, and noticed the following issues:

-   The focus styles work great in Chrome, but in Firefox, there is no visual clue of them.
-   The actions menu that appears on hover is focusable in Firefox, and I can’t access it with a keyboard in Chrome.

![](https://ishadeed.com/assets/real-comp/a11y-focus.png)

And to give you more context, the actions menu appears on hover. However, as a keyboard user, I expect to be able to access it via keyboard, too.

![](https://ishadeed.com/assets/real-comp/a11y-focus-2.png)

Unfortunately, in Chrome, I couldn’t access the actions menu.

### List of cards

In the listing of the card component, there are some ARIA roles used. The list is a grid, and it contain rows. Each row can have one or more cells.

```
<div role="grid">
  <div role="row">
    <div role="gridcell">
      <a href="#">
        <!-- The component lives here -->
      </a>
    </div>
  </div>
  <div role="row">
    <div role="gridcell">
      <a href="#">
        <!-- The component lives here -->
      </a>
    </div>
  </div>
</div>
```

### Multiple avatars

For group chatting, there is a multiple avatars for the seen indicators. In this case, the avatars are laid out as cells of a row using `ARIA` roles.

```
<div role="grid">
  <div role="row">
    <!-- 1st avatar -->
    <div role="cell"></div>
    <!-- 2nd avatar -->
    <div role="cell"></div>
  </div>
</div>
```

Here is a [demo](https://codepen.io/shadeed/pen/rNMvKqL?editors=1010) on Codepen. It doesn’t include all the variations. I was just testing things out.

## Conclusion

Building for the web with HTML & CSS is not an easy job, and it’s not hard either. The point I wanted to make in this article is that the simplest component involves tons of work. By the way, all the explanations above have only discussed HTML & CSS. What about JavaScript? That’s another story.

I enjoyed working and writing this article, and I will definitely work on similar ones in the future.

## I wrote an ebook

I’m excited to let you know that I wrote an ebook about Debugging CSS.

![](https://ishadeed.com/assets/css-mistakes/debugging-css.png)

If you’re interested, head over to [debuggingcss.com](https://debuggingcss.com/) for a free preview.