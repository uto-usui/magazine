---
title: "The search element"
source: "https://scottohara.me/blog/2023/03/24/search-element.html"
publishedDate: "2023-03-24"
category: "accessibility"
feedName: "Scott O'Hara"
author: "Scott O'Hara"
---

Today, March 24th 2023, the HTML specification added a new grouping content element. The [`search` element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element).

Please be aware that this element landing in the HTML spec today **does not mean it is available in browsers today**. Issues have been filed to implement the `search` element in the major browsers, including the necessary accessibility mappings. Keep this in mind when you add this new element to your pages.

Support update: Safari 17, Firefox 118 and Chrome/Edge 118 support the \`search\` element mapping to the implicit \`search\` landmark role. Safari 17 released mid September, Firefox early October and Chromium browsers will update to 118 during October, as well.

The impetus for this addition stems from the [“Consider creating an HTML search element” issue](https://github.com/whatwg/html/issues/5811), filed on the HTML spec in late 2020, where the goal was to create feature parity between ARIA and HTML.

ARIA defines [8 landmark roles](https://www.w3.org/TR/wai-aria-1.2/#landmark_roles) to help authors structure their web pages. For every landmark role, except for `search`, a native HTML element could be used - under certain conditions - to expose these landmark roles. BTW, I’ve written a few things about landmarks in the past. Here’s but one of them [Accessible Landmarks](https://www.scottohara.me/blog/2018/03/03/landmarks.html).

With the addition of `search`, now every ARIA landmark has a native HTML equivalent. And also, now everyone who has ever written about ARIA landmarks needs to go update their articles. Have fun! (I’m going to update mine later. Don’t @ or DM me.)

## How to use it

First and foremost, one would use the `search` element to expose the search landmark in the browser’s accessibility API, allowing people using assistive technology, such as screen readers, to discover this content area and allow for quick access to it. Being a “search” landmark, it implicitly indicates that the content one would find within would be related to searching for, or even filtering content (filtering is a ‘searching’ behavior… designers sure do like to use the magnify glass icon interchangeably between these UI controls, at least).

Very on the nose, but that’s the point.

Typically a search landmark will contain, at minimum, a text field (either identified as `input type=text` or `type=search` - [read this if you’re wondering why one wouldn’t necessarily default to just `type=search`](https://adrianroselli.com/2019/07/ignore-typesearch.html)). Additionally, but not necessarily, a button to initiate the search would be another expected descendant of the landmark. Finally, other form controls, descriptive content or links related to understanding or modifying one’s search or filtering query could be present. E.g., checkboxes or radio buttons to modify the parameters.

Markup for a simple search where JavaScript is used to initiate the search functionality:

```
<search>
  <label for=s>Site</label>
  <input type=search id=s>
  <button>Go!</button>
</search>
```

Markup for a simple search where a traditional form submission is used for the search functionality:

```
<search>
  <form action="search.php">
    <label for="query">Find an article</label>
    <input id="query" name="q" type="search">
    <button type="submit">Go!</button>
  </form>
</search>
```

Some [additional reduced markup `search` patterns](https://html.spec.whatwg.org/multipage/grouping-content.html#the-search-element) can be found in the examples of the HTML spec element definition.

### Why would I use this instead of `form role=search`

You might be looking at that second example, where a `form` element is nested within the `search` element and think “huh… a `search` element would still need a `form`? That seems like extra work to use two elements.”

And sure, that’s a valid takeaway. Two elements _is more than one_ and you can identify a `form` element as a search landmark now by adding a `role=search` to it. But when has extra work ever stopped a web developer?

```
<div role=button tabindex=0>
  Sure i could use the button element,
  but F that noise.
</div>
<!-- F stands for "forget", obviously... -->
<script>
  /* 
    all the necessary keyboard interactions and behaviors 
    that now must be recreated to make an accessible "button" 
  */  
</script>
<style>
  /*
    all the styles for the default button state, disabled, 
    hovered, focused, high contrast mode styles, 
    anything else i'm currently forgetting...
    have fun recreating the wheel, yo :)
  */
</style>
```

But seriously, there was quite a bit of back and forth on whether the `search` element should be another type of `form`, but there was no appetite to do this from the browser implementers (for very reasonable reasons, mind you), and honestly, it is not that big of a deal.

The goal of the element proposal was to provide landmark parity with the available ARIA roles. The element achieves this, and everyone is still perfectly entitled to use `<form role=search>` for where that would be appropriate. But now, you also _don’t have to use ARIA_, which is also one of the driving principles of ARIA. As the ARIA spec mentions a few times (the following two quotes taken from different parts of the spec):

> When the host language provides a feature that provides equivalent accessibility to the WAI-ARIA feature, use the host language feature.  
> …  
> When a feature in the host language with identical role semantics and values is available, and the author has no compelling reason to avoid using the host language feature, authors SHOULD use the host language features rather than repurpose other elements with WAI-ARIA.

So, for all you JavaScript developers out there who need to implement a search feature and should be exposing it as a landmark but have no practical use for native `form` behaviors, this one’s for you.

```
<search>...</search>
vs
<div role=search>...</div>
```

17 vs 23 characters. You’re welcome.

## A final thought and thank you

To be brutally honest, this is not the most important element that’s ever been added to the HTML specification. It _is_ however a nice little accessibility win. People don’t _have to_ use ARIA to get this feature. It fills a little hole that has always been present, and every little bit helps.

Additionally, it was a very good experience getting to work on this with the HTML editors (primarily [@domenic](https://twitter.com/domenic) , who helped me with getting the PR done) and fellow ARIA working group member, [Carolyn MacLeod](https://twitter.com/carmacleod) who originally made the proposal to HTML to add this element. Further discussing this new element with browser implementers, and identifying a need for some HTML parsing updates (which will be important with other new features coming to HTML) was an interesting, related bit to this process. Maybe more on that another time.

Also, if you’re interested in getting involved with working on the ARIA specification, here’s a nice and easy entry issue to reference the new `search` element to get you going: [ARIA issue #1898 - Add base concept for search role](https://github.com/w3c/aria/issues/1898).

But finally, Carolyn unfortunately passed away in February of 2022. This was the last thing I was able to work on with her. Again, while not the biggest win for the accessibility community, I know seeing what she started finally get merged into the spec would have made her happy.

So, I’m really glad this element is now part of HTML, and will soon be available for people to use to markup their web pages. Thanks Carolyn for helping to make this happen.