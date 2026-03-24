---
title: "Sneaky Header Blocker Trick"
source: "https://www.joshwcomeau.com/css/header-blockers/"
publishedDate: "2026-03-23"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

Have you ever noticed that the site header on this blog does something a bit peculiar?

When you first start scrolling, the sticky header appears to have a mostly-opaque blue background, covering up the blog post title/metadata:

As you keep scrolling, though, something kinda strange happens. First, the cloud swoops pass by normally, as though the header had a _transparent_ background:

And then, when you get to the content, the header suddenly appears to have a _white_ background:

This is a fairly subtle thing, and I suspect most readers have never even noticed it. But there’s something about it which just feels so _satisfying_ to me. It’s one of my favourite little bits of polish on this blog. 😄

A few times a year, I’ll hear from someone who is completely mystified by the effect and wants to know how I’m doing this. It’s actually quite a bit simpler than most people imagine! There’s no JavaScript involved at all, this is entirely a CSS-based effect.

In this blog post, I’m going to reveal the magic trick. We’ll also deepen our understanding of how Positioned layout works in CSS. 🪄

## [Link to this heading](#the-core-concept-1)The core concept

Here’s the deal: the site header itself has a transparent background that never changes. It sits in front of the page using `position: fixed` and doesn’t really do anything special.

The effect is created by sticky “blocker” elements: one in the hero and one in the main article area. They sit behind the site header, but _in front_ of the other content.

This is much easier to explain with a visualization, so I created a minimum viable reproduction of the effect. The “Reveal” slider will highlight what’s actually going on, and you can scroll through this little mockup to see how it works:

Josh Comeau

-   Categories
-   Courses
-   About

Reveal:0%

The blue hero has a blue rectangle that sits right underneath the real header. It uses `position: sticky`, so it follows the user as they scroll, but critically, it won’t follow the user beyond its container.

This is an aspect to sticky positioning that often isn’t super well-understood. When a sticky element reaches the end of its container, it becomes unstuck and scrolls out of view.

Here’s a playground demonstrating this behaviour. Notice that the orange blocks won’t follow you outside their parent container:

Code Playground

<style\>
  .sticky {
    position: sticky;
    top: 2px;
    background: tomato;
  }
</style\>

<div class\="container"\>
  <div class\="sticky"\></div\>
</div\>
<div class\="container"\>
  <div class\="sticky"\></div\>
</div\>

So, that’s the core trick! I have two separate “blocker” elements that are each color-matched to their respective backgrounds (a blue blocker in the hero, a white blocker in the main section). As the user scrolls past the hero, we get this neat hand-off; the blue blocker scrolls out of view and the white blocker takes over. ✨

Here’s a playground showing the code for the minimal reproduction of the effect:

Code Playground

<style\>
  html {
    \--blue: hsl(210deg 80% 85%);
    \--header-height: 4rem;
  }
  header {
    position: fixed;
    z-index: 1;
    top: 0;
    height: var(\--header-height);
  }
  .blocker {
    position: sticky;
    top: 0;
    height: var(\--header-height);
  }
  .hero .blocker {
    background: var(\--blue);
  }
  .main-content .blocker {
    background: white;
  }
</style\>

<header\>Sticky Header</header\>
<div class\="hero"\>
  <div class\="blocker"\></div\>
  <h1\>Article Title</h1\>
</div\>
<main class\="main-content"\>
  <div class\="blocker"\></div\>
  <p\>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lorem felis. Aliquam finibus libero arcu, ut sodales lorem rutrum vitae. Sed et ornare lorem. Aliquam sagittis neque ac consequat tempus. Phasellus sagittis ipsum ut velit lobortis, a dapibus libero lacinia. Integer accumsan augue sit amet ipsum luctus interdum. Nulla interdum id risus in accumsan. Curabitur quis eleifend orci.
  </p\>
  <p\>
    Sed sit amet tempus lacus. Aenean faucibus, libero nec posuere maximus, nisi risus laoreet est, ac scelerisque justo quam quis quam. Aliquam imperdiet magna in metus porttitor, vel sollicitudin elit placerat. Integer non elit et ante laoreet blandit vitae non diam. Morbi venenatis nisl nec magna consectetur scelerisque.
  </p\>
</main\>

## [Link to this heading](#integrating-swoops-2)Integrating swoops

One thing that makes this a _bit_ more complicated is the swoops. When I [redesigned my blog](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/) back in 2024, I went with a cloud motif. The hero includes darker background clouds and a big white puffy foreground cloud:

![Screenshot of a blog post showing that the hero and main content areas are separated by a big white swoop in the front, and two subtle grayish-blue clouds in the back](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fheader-blockers%2Fcloud-motif.png&w=1200&q=75)

Fortunately, this doesn’t _really_ affect our main strategy as long as we layer things correctly. From back to front, the layers within the hero are:

-   The text content (blog post title and metadata)
    
-   The sticky blocker
    
-   The dark blue background clouds
    
-   The white foreground cloud
    

The sticky blocker covers the text content, but it slides behind the absolutely-positioned cloud SVGs. The actual site header sits in front of the whole thing.

## [Link to this heading](#design-requirements-3)Design requirements

There is one significant trade-off with this implementation: we need _enough space_ for the blockers to sit when they’re not actively blocking the content.

On this blog, the header is 5rem (typically 80px) tall. That means I need at least 5rem of empty space above the main content, so that the blocker has a place to sit when the user is scrolled all the way to the top of the page:

![Screenshot of a blog post showing that there’s an 80 pixel tall invisible rectangle sitting just above the first paragraph of the blog post. That space is reserved and it needs to be empty, otherwise it would be covered up by the sticky header blocker.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fheader-blockers%2Freserved-space.png&w=3840&q=75)

This did actually constrain the design a bit. The cloud swoops couldn’t be as deep or angled as I might’ve preferred.

On this blog’s homepage, the clouds are much more aggressive, and there is nowhere for me to hide a blocker element:

![Screenshot of my blog's homepage, with large asymmetrical cloud swoops. A red rectangle shows where the sticky blocker could go, but it would wind up covering part of my 3D mascot and rainbow effect. The homepage can't accommodate the blocker, there just isn't enough space anywhere.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fheader-blockers%2Freserved-space-fail.png&w=3840&q=75)

_In theory,_ I could leave the blocker in this awkward spot and toggle its opacity using JavaScript when the user scrolls past the hero, but in practice, this doesn’t really work; it feels quite jarring if it pops suddenly into existence, but if we give it a short transition, it won’t be fast enough for people who scroll quickly.

So, on the homepage, I’m doing things in a more traditional way. The sticky header itself has a background color, and I shift that background from blue to white in JavaScript, based on the scroll position:

This effect is nowhere near as satisfying as the sticky blocker trick, but it’s the best solution I’ve found given the design constraints.

## [Link to this heading](#all-of-the-tricks-up-my-sleeves-4)All of the tricks up my sleeves

I’ve been building websites for nearly 20 years now, and I’ve picked up _so many_ little techniques like this. If you spend some time poking around my blog, you’ll notice a bunch of little things like this.

For over a year, I’ve been working on a new interactive course, [Whimsical Animations(opens in new tab)](https://whimsy.joshwcomeau.com/). It’s a comprehensive guide that shows you how to create next-level animations and interactions using HTML, CSS, JavaScript, SVG, and Canvas.

There are so many golden nuggets in this course. Just about every lesson has some super-practical tip that you can immediately start using in your own work. So many of the techniques I use are not part of the standard web-development skillset. I had to learn all this stuff the hard way, over many many years of experimentation. My goal with this course is to help you skip a few years.

You can learn more about the course on its official homepage:

-   [Whimsical Animations(opens in new tab)](https://whimsy.joshwcomeau.com/)
    

On that page, you can also sign up for the waitlist. I’m hoping to launch the course in the next few weeks, and I plan on sending a special lil’ discount for folks on the list. 😄

### Last updated on

March 23rd, 2026