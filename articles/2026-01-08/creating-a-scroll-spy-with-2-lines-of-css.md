---
title: "Creating a scroll-spy with 2 lines of CSS"
source: "https://una.im/scroll-target-group/"
publishedDate: "2025-07-29"
category: "css"
feedName: "Una Kravets"
---

## Introduction

Did you know that there’s a new CSS feature **landing in Chrome 140** that let’s you very easily create trackable table of contents? This “scroll-spy” effect can be achieved with a new CSS property called `scroll-target-group` combined with the `:target-current` pseudo class.

## Spec example

To make this work, you first need to set up your blog post or page with a content area that has anchor (“jump”) links. These can be embedded throughout the page using anchor tags, i.e. `<a id="one">`, or can be a part of other elements, i.e. `<h2 id="one">`. Then, you’ll need your table of contents, with a list of links that connect to those `id`’s. This list will include links, like: `<a href="#one">Section One</a>`.

Here is a simple [example](https://codepen.io/una/pen/dPYXKVe) from the [spec](https://drafts.csswg.org/css-overflow-5/#scroll-target-group):

```
<ol>
  <li><a href="#intro">Introduction</a></li>
  <li><a href="#ch1">Chapter 1</a></li>
  <li><a href="#ch2">Chapter 2</a></li>
</ol>

<div id="intro" class="chapter">Introduction content</div>
<div id="ch1" class="chapter">Chapter 1 content</div>
<div id="ch2" class="chapter">Chapter 2 content</div>
```

```
ol {
  background-color: gray;
  right: 10px;
  top: 10px;
  position: fixed;
  scroll-target-group: auto;
}

a:target-current {
  color: red;
}

.chapter {
  background: lightgray;
  height: 60vh;
  margin: 10px;
}
```

And here is another basic example, a little more cleaned up:

See the Pen [scroll-target-group](https://codepen.io/una/pen/VYvmQJX) by Una Kravets ([@una](https://codepen.io/una)) on [CodePen](https://codepen.io/).

Now, you’ll have a table of contents with blue jump links that turn red when the link `id` matches the `id` of the section you are actively scrolled in to.

The relevant lines of code here are: `scroll-target-group: auto;` on the `ol` which contains the “chapters”, and the [`:target-current`](https://developer.mozilla.org/en-US/docs/Web/CSS/:target-current) pseudo class, which you may recognize from the [CSS Carousel API](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_overflow/CSS_carousels). This essentially tells the browser that the list of links inside of the `scroll-target-group` should be treated like `::scroll-marker` (also from the [CSS Carousel API](https://developer.mozilla.org/en-US/docs/Web/CSS/::scroll-marker)—see a trend?). So when the `id` of the link acts as a “scroll marker” relating to that section of content, you can then style it with `:target-current`.

`scroll-target-group` enriches the functionality of HTML anchor elements to match `::scroll-marker` functionality. Because of this, you now have much more control over creating custom markers (as they no longer are constrained by the limitations of pseudo elements). This demo is just one example of how you can get creative with `scroll-target-group`, but you of course can use it to create more traditional-looking carousels.

_“The scroll-target-group property allows to overcome such limitations by making HTML anchor elements ‘scroll markers’. By specifying fragment identifier authors have ‘scroll target into the view’ functionality of `::scroll-markers`, but don’t have the ‘tracking of current scroll marker’ one. With scroll-target-group property, \[the\] browser runs an algorithm to determine the ‘current scroll marker’ and authors can style such anchor element with `:target-current` pseudo class.” -[`scroll-target-group` Explainer](https://github.com/WebKit/standards-positions/issues/514)_.

## TLDR; the 2 lines of CSS

**So TLDR; the 2 lines of CSS that make this happen are:**

```
.parent { scroll-target-group: auto; }

:target-current { /* styles for active anchor */ }
```

And of course this expects you to set up anchor links in your HTML, and have a list of links with a parent:

```
<ul class="parent">
  <li><a href="#one">Section One</a></li>
  <li><a href="#two">Section Two</a></li>
</ul>

<div id="one">Section one</div>
<div id="two">Section two</div>
```

> **That’s surprisingly easy!**

> **No JavaScript needed!**

> **I want to [share this](https://bsky.app/intent/compose?text=una.im/scroll-target-group) with everyone!**

To make the jump links in your new table of contents less “jumpy”, you can add smooth scrolling with one line of code, too:

```
.scroll-parent {
  scroll-behavior: smooth;
}
```

And to make the links have a nice fade-in-and-out effect when you switch sections, you can animate them:

```
#table-of-contents a {
  transition: color 0.5s ease;
  
  &:target-current {
    color: red;
  }
}
```

## Progressive enhancement

> _“But this is only in the latest Chrome, what about other browsers?”_

Great question. This is a really easy feature to progressively enhance.

In the case of my blog, I didn’t have a table of contents or scroll-spy experience at all before, and I’m including it for the sake of this demo. If the user doesn’t have a supported browser, I will simply not show the table of contents. The injected anchor links aren’t going to bother anyone _(though it’s not a bad idea to add linkable headers to my blog posts anyway to help users navigate to and share sublinks…)_ 🤔.

```
#table-of-contents {
  display: none;

  /* Display table of contents if scroll-target-group is supported */
  @supports(scroll-target-group: auto) {
    display: block;
    position: fixed;
  }
}
```

You can even combine this with media queries to conditionally show it based on the support query and media query, like I am doing on this page:

```
@supports(scroll-target-group: auto) {
  @media (min-width: 800px) {
    ...
  }
}
```

If you want to _keep_ the table of contents without the visual indicator for the current section, there is actually nothing you really need to do to progessively enhance with this feature.

In fact, some examples of this are blogs on [developer.chrome.com](https://developer.chrome.com/blog/if-article), and even the [the spec page](https://drafts.csswg.org/css-overflow-5). Both of these already have a table of contents for navigation, but don’t have the scroll-spy interaction pattern. To progressively enhance these sites with the scroll-spy interaction, you technically don’t even need to use `@supports`, since the following code would simply be ignored in non-supported browsers:

```
#table-of-contents {
  /* ignored if no support */
  scroll-target-group: auto;
  
  a {
    /* won't apply if no color transition */
    transition: color 0.5s ease;

    &:target-current {
      /* ignored if no support */
      color: red;
    }
  }
}
```

## Accessibility considerations

Are there any additional accessibility considerations for this feature? This technique essentially just uses anchor links, with a few additional styling affordances. So make sure you have proper content and tab navigation wherever the list of anchor links lives. But other than that, I don’t think there are any additional unique accessibility needs.

If this is incorrect, please let me know and I will update the post and example(s)!

## Conclusion

This is an awesome feature addition to CSS, which seems to have flown under the radar, and makes great use of `:target-current`. Am I going to add this to all of my blog posts in the future? What do you think? Do you like the effect? Should I do it? I think it’s pretty nice, and the fact that this is such an easy progressive enhancement has me leaning yes.

Leave your thoughts, comments, and concerns on Bluesky! This blog also has Bluesky-powered comments now (blog post coming soon on that one too!).

_(P.S. If you notice an invalidation error when clicking the side nav links, I already opened a bug about it)_

_(P.S.S I’m using `ease-spring-4` from [Open Props](https://open-props.style/) for the meta scroll-spy demo within this article, thanks Adam <3)_