---
title: "Use Cases for Field Sizing"
source: "https://ishadeed.com/article/field-sizing/"
publishedDate: "2025-10-31"
category: "css"
feedName: "Ahmad Shadeed"
---

Have you ever needed to size an input field based on its content? We often required JavaScript for that. Today, we can do it with CSS `field-sizing` property.

In this article, I’m going to show you the problem [field-sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/field-sizing) solves and how to use it for layout-focused designs.

Let’s dive in.

## Introduction

In the following example, I have a page header with a select menu. The select menu width is equal to the option with the longest text.

Try to change the selected option.

With `field-sizing: content`, we can make the select width equal to the currently selected option.

Currently, it’s supported only in Chrome.

```
select {
  field-sizing: content;
}
```

field-sizing: content

## Set a min and a max width

Given that `field-sizing: content` will make the text field equal to the content, we need to think about the minimum and maximum width.

field-sizing: content

The fix is simple: we need to set `max-width`.

```
select {
  max-width: 100%;
}
```

field-sizing: content

That’s what `field-sizing: content` does. I will walk you through some examples. As Adam Argyle [said](https://developer.chrome.com/docs/css-ui/css-field-sizing#empty_and_overflowing_style_handling), this is part of [Defensive CSS](https://defensivecss.dev/).

## Use cases and examples

### Conversional UI

This might be the most common use case in terms of UI design. We have a letter-like form, and it should feel like I’m completing the blank inputs, not filling a boring form.

Toggle the `field-sizing: content` checkbox to see the difference.

field-sizing: content

Hello, my name is and I'm trying to learn . My email is and my superpower is .

**What I like here is that the field-sizing will respect the placeholder text, which works like a minimum width.**

We often need to have a select menu to navigate through a long table.

field-sizing: content

Simple, yet useful.

### URL

One of my favorite use cases is the URL input. I can imagine this being used in web hosting services or social media.

For example, to fill in a subdomain field.

field-sizing: content

.

Or a user handle field.

field-sizing: content

linkedin.com/in/

### Hero

I have seen this pattern a lot and thought about using `field-sizing` to make it more dynamic. For this example, we have a hero section with two select menus.

Toggle the checkbox to see the difference.

field-sizing: content

Filter beans by origin and roast profile.

We have one of the best selections of beans in the world.

roasted for

## Progressive enhancement

What I like most about `field-sizing` is that we can use it as an enhancement. If it’s not supported, the input or select will work just fine. I hope it will be supported in Safari and Firefox soon.

Thank you for reading.