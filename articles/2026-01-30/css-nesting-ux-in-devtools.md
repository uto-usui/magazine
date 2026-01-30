---
title: "CSS Nesting UX in DevTools"
source: "https://ishadeed.com/article/css-nesting-ux/"
publishedDate: "2023-11-19"
category: "css"
feedName: "Ahmad Shadeed"
---

While documenting my learning about CSS nesting, I wasn’t a big fan of how the nesting is shown in the DevTools. It’s inconsistent between browsers, and thought why not suggest a few solutions to this problem?

In this article, I will share my thinking process of solving the nesting UX in DevTools, alongside the root problem and why I did that in the first place.

## Introduction

First, I want to make sure that you know that CSS nesting is a new feature that was supported early this year. It might be a bit early to judge the current DevTools UX, but I need to do it for my exploration and curiosity.

Let’s explore an example and see how the nesting is shown in different browsers:

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools.png)

What’s your favorite? For this particular example, I prefer **Firefox** for the following reasons:

-   It shows the whole nesting, just how I wrote it in CSS.
-   Syntax highlighting is better (notice how the `:hover` is colored)

But that doesn’t mean that I’m totally happy with Firefox UX.

## The problem

As a front-end developer myself, I came from using tools like Sass and PostCSS for nesting. The browser will compile the CSS nesting into a full selector in the browser.

In the current DevTools, the CSS nesting isn’t shown as a full selector. Instead, it mimics how the CSS is written.

Let’s take an example.

```
.list-item {
  &:last-child {
    /* Styles */
  }
}
```

We expect that to render in the DevTools as a nested selector, but since it’s native now, it won’t happen.

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-expectation-vs-devtools.png)

There should be a way to fix that and make it more clear to see the full selector.

## Proposed solutions

For the following solutions, I will explore them based on Chrome UI, but most of them should apply to other browsers as well.

Here is how nesting looks currently:

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools-default.png)

Let’s explore the solutions.

### Proposal 1: Expand or collapse the nesting

The first idea that I thought about is to show the compiled CSS nesting by default, and the ability to expand or collapse it in the DevTools.

Here is what it looks like:

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools-solution-arrow-1.png)

When expanded, it will show the full rule set, just as written in the code editor. If there are multiple nested rules, it will accommodate that:

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools-solution-arrow-2.png)

#### Pros

-   Helps to show the full selector without trying to guess how it’s compiled.
-   Saves space in the styles tab.

#### Cons

-   Adding the arrow might not align with the design guidelines. In other words, it’s a big change to the UI, which might require the rework of certain UI elements.

### Proposal 2: Expand or collapse the nesting + inline arrow

What I mean by “inline arrow” is to place the expand/collapse arrow in a different place.

This can save up space, and make the arrow more related to the context.

Here is the proposal:

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools-solution-arrow-3.png)

Same as proposal 1, but with the arrow positioning concern fixed.

### Proposal 3: Nesting badge

We can display a badge that represents nesting. The icon isn’t the best, but you got the idea.

When the badge is active, it will show the full nested CSS.

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools-solution-badge.png)

#### Pros

-   The user can quickly know that this is a nested rule.
-   The toggle action is a known pattern. For example, the “grid” badge activates the layout of the grid, the nested badge shows the actual nested CSS.

#### Cons

-   The button will change its position when toggled

### Proposal 4: Show nested CSS on hover

From a UI perspective, this is similar to the previous proposal, but instead of toggling, it can show the nested CSS on hover.

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools-solution-badge-hover.png)

Here is how it looks with a long selector:

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools-solution-badge-hover-2.png)

It can get even more crazy. I’m not a fan of this, but it’s an idea that is worth exploring.

What do you think? Which of the proposals do you find interesting?

## What should happen when copying a nested rule set?

Currently, when copying a selector, there are different behaviour that I noticed.

### Chrome DevTools

When I select and copy the CSS rule set, the pasted result is broken. I tried that with a complex nesting to intentionally break it.

Here is the CSS in the code editor.

```
form {
  & label {
    &:first-child {
      &:after {
        content: "test";
      }
    }
  }
}
```

Here is a figure that shows the pasted result:

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools-copy-selector.png)

I filed a [bug here](https://bugs.chromium.org/p/chromium/issues/detail?id=1503484).

### Firefox DevTools

It’s just what I expected.

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools-copy-selector-2.png)

### Safari DevTools

Same as Chrome. I have to add code brackets for each nested block.

Aside from the bug in Chrome, I’m thinking about providing the user with two options:

-   Copy the rule set as as.
-   Copy the full CSS nested selector

![](https://ishadeed.com/assets/css-nesting-ux/nesting-ux-devtools-copy-css.png)

> This can be useful in cases where you want to copy nested CSS and paste it back into the code editor.

Since the CSS nesting is new, using it isn’t an option now for a lot of developers. The good thing is that you can use Sass, for example, and copy the nested CSS from the DevTools.

## Outro

To wrap up, thinking about how the browser DevTools should address CSS nesting is an important step to take. It will help to make the CSS nesting more approachable and easier to debug and use by developers.

Again, I would love to hear your feedback, and if you work at browser vendors, I will be happy to help and contribute where I can.