---
title: "Styling Ordered Lists with CSS Counters"
source: "https://www.joshwcomeau.com/css/styling-ordered-lists-with-css-counters/"
publishedDate: "2020-04-07"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

Here's a scenario I find myself in now and then: I want an ordered list, and I want it to be pretty.

Because semantic HTML is important, I reach for the trusty `<ol>` tag:

```
<ol>
  <li>Stop</li>
  <li>Drop</li>
  <li>Roll</li>
</ol>
```

1.  Stop
    
2.  Drop
    
3.  Roll
    

The problem is that the "bullets" (the prefix numbers) are in a CSS-selector dead zone. There is no way to style them independently!

I am not one to accept lackadaisical bullets. So I did some digging, and found an awesome solution 🎉.

## [Link to this heading](#counters-to-the-rescue-1)Counters to the rescue

CSS has a pretty nifty trick up its sleeve to deal with this situation. It has a built-in counter mechanism.

Here's how that looks:

```
ol li {
  counter-increment: muffins;
}

ol li:before {
  content: counter(muffins) ". ";
}

ol {
  list-style: none;
  counter-reset: muffins;
}
```

Let's go through this step by step:

## [Link to this heading](#styling-2)Styling

With this CSS, we've effectively recreated a default `<ol>`. The difference is that we now have a CSS selector, `ol li:before`, we can use to apply custom styles.

Here's how ordered lists look on this blog, using this trick.

**How to bake a cake:**

1.  I think you do something with dry ingredients
    
2.  The mixers play a role here
    
3.  Combine everything while crossing fingers
    
4.  Transfer to oven
    
5.  Poke with toothpick for fun, and then serve
    

It's not night-and-day, but I'm very pleased with the overall effect!

## [Link to this heading](#browser-support-3)Browser support

CSS counters feel like a next-gen feature, but actually they've been around _forever_. They're supported in Internet Explorer 8!!

Use this property without guilt ✨

Also: there's one more trick CSS counters have up their sleeves…

## [Link to this heading](#nested-lists-4)Nested lists

Here's the really cool thing: `counter` has a cousin, `counters`, and it works for _nested lists_.

Notice how the numbering stacks recursively, in this awesome-sounding curriculum:

1.  Welcome to web school!
2.  HTML
    1.  What are tags anyway?
    2.  The truth about DOM
3.  CSS
    1.  Wallpaper of the Web
    2.  Box Model Mayhem
        1.  Padding
        2.  Border
        3.  Margin
    3.  Specificity as a service

Here's the CSS necessary for this:

```
ol {
  counter-reset: cupcake;
  padding-left: 32px;
}

ol li {
  counter-increment: cupcake;
}

ol li:before {
  content: counters(cupcake, '.') ' ';
  /* Whatever custom styles you want here */
  color: hotpink;
  font-weight: bold;
  font-family: cursive;
}
```

It's super similar, except you use `counters` instead of `counter`, and you add an "intermediary" spacer (in this case, a period).

## [Link to this heading](#bringing-order-back-5)Bringing Order Back

The `ol` doesn't get a lot of love compared to the `ul`. And yet, people love counting things! Something doesn't add up.

Maybe with this neat trick, we'll finally see `ol` get the attention it deserves.

### Last updated on

April 7th, 2020