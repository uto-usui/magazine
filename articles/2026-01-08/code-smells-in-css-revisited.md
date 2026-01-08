---
title: "Code Smells in CSS Revisited"
source: "https://csswizardry.com/2017/02/code-smells-in-css-revisited/"
publishedDate: "2017-02-08"
category: "css"
feedName: "CSS Wizardry"
---

8 February, 2017

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [`@extend`](#extend)
2.  [String Concatenation for Classes](#string-concatenation-for-classes)
3.  [Background Shorthand](#background-shorthand)
4.  [Key Selector Appearing More Than Once](#key-selector-appearing-more-than-once)
5.  [A Class Appearing in Another Component’s File](#a-class-appearing-in-another-components-file)
    1.  [BEM Mixes](#bem-mixes)
6.  [CSS `@import`](#css-import)

Way back in 2012, I wrote a post about potential CSS anti-patterns called [Code Smells in CSS](https://csswizardry.com/2012/11/code-smells-in-css/). Looking back on that piece, I still agree with all of it even four years later, but I do have some new things to add to the list. Again, these aren’t necessarily always bad things, hence referring to them as code smells: they might be perfectly acceptable in your use case, but they still smell kinda funny.

Before we start, then, let’s remind ourselves what a Code Smell actually is. From [Wikipedia](https://en.m.wikipedia.org/wiki/Code_smell) (emphasis mine):

> Code smell, also known as bad smell, in computer programming code, refers to any symptom in the source code of a program that **possibly indicates a deeper problem**. According to Martin Fowler, ‘a code smell is a surface indication that usually corresponds to a deeper problem in the system’. Another way to look at smells is with respect to principles and quality: ‘smells are certain structures in the code that indicate **violation of fundamental design principles** and negatively impact design quality’. Code smells are usually not bugs—**they are not technically incorrect** and do not currently prevent the program from functioning. Instead, **they indicate weaknesses in design that may be slowing down development** or increasing the risk of bugs or failures in the future. Bad code smells can be an indicator of factors that contribute to technical debt. Robert C. Martin calls a list of code smells a ‘value system’ for software craftsmanship.

So they’re not technically, always wrong, they’re just a good litmus test.

## `@extend`

Hopefully I can keep this first one nice and brief: I have long been vocal about the side effects and pitfalls of `@extend`, and now I would actively consider it a code smell. It’s not absolutely, always, definitely bad, but it usually is. Treat it with suspicion.

The problems with `@extend` are manifold, but to summarise:

-   **It’s actually worse for performance than mixins are.** Gzip favours repetition, so CSS files with greater repetition (i.e. mixins) achieve a greater compression delta.
-   **It’s greedy.** Sass’ `@extend` will `@extend` every instance of a class that it finds, giving us crazy-long selector chains [that look like this](https://twitter.com/gaelmetais/status/564109775995437057).
-   **It moves things around your codebase.** Source order is vital in CSS, so moving selectors around your project should always be avoided.
-   **It obscures the paper-trail.** `@extend` hides a lot of complexity in your Sass that you need to unpick more gradually, whereas the multiple class approach puts all of the information front-and-center in your markup.

For further reading:

-   [Mixins Better for Performance](https://csswizardry.com/2016/02/mixins-better-for-performance/)
-   [When to Use `@extend`; When to Use a Mixin](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)
-   [Extending Silent Classes in Sass](https://csswizardry.com/2014/01/extending-silent-classes-in-sass/)

## String Concatenation for Classes

Another Sass-based gripe is the use of the `&` to concatenate strings in your classes, e.g.:

```
.foo {
  color: red;

  &-bar {
    font-weight: bold;
  }

}
```

Which yields:

```
.foo {
  color: red;
}

.foo-bar {
  font-weight: bold;
}
```

The obvious benefit of this is its terseness: the fact that we have to write our `foo` namespace only once is certainly very DRY.

One less obvious downside, however, is the fact that the string `foo-bar` now no longer exists in my source code. Searching my codebase for `foo-bar` will return only results in HTML (or compiled CSS if we’ve checked that into our project). It suddenly became a lot more difficult to locate the source of `.foo-bar`’s styles.

I am much more a fan of writing my CSS longhand: on balance, I am far more likely to look for a class than I am to rename it, so findability wins for me. If I join a project making heavy use of Sass’ string concatenation, I’m usually expecting to have a hard time tracking things down.

Of course you could argue that sourcemaps will help us out, or that if I’m looking for a class of `.nav__item` then I simply need to open the `nav.scss` file, but unfortunately that’s not always going to help. For a little more detail, I made [a screencast](https://www.youtube.com/watch?v=MGzoRM3Al40) about it.

## Background Shorthand

Something else I discussed only recently is the use of `background` shorthand syntax. For full details, please refer to [the relevant article](https://csswizardry.com/2016/12/css-shorthand-syntax-considered-an-anti-pattern/), but the summary here is that using something like:

```
.btn {
  background: #f43059;
}
```

…when you probably meant:

```
.btn {
  background-color: #f43059;
}
```

…is another practice I would consider a code smell. When I see the former being used, it is seldom what the developer actually intended: nearly every time they really meant the latter. Where the latter _only_ sets or modifies a background colour, the former will also reset/unset background images, positions, attachments, etc.

Seeing this in CSS projects immediately warns me that we could end up having problems with it.

## Key Selector Appearing More Than Once

The key selector is the selector that actually gets targeted/styled. It is often, though not always, the selector just before your opening curly brace (`{`). In the following CSS:

```
.foo {}

nav li .bar {}

.promo a,
.promo .btn {}
```

…the key selectors are:

-   `.foo`,
-   `.bar`,
-   `a`, and
-   `.btn` respectively.

If I were to take a codebase and [ack for `.btn`](https://csswizardry.com/2017/01/ack-for-css-developers/), I might see some output like this:

```
.btn {}

.header .btn,
.header .btn:hover {}

.sidebar .btn {}

.modal .btn {}

.page aside .btn {}

nav .btn {}
```

Aside from the fact that a lot of that is just generally pretty poor CSS, the problem I’m spotting here is that `.btn` is defined many times. This tells me that:

1.  **there is no Single Source of Truth** telling me what buttons look like;
2.  **there has been a lot of mutation** meaning that the class `.btn` has many different potential outcomes, all via mutable CSS.

As soon as I see CSS like this, I’m aware of the fact that doing any work on buttons will have a large surface area, tracking down exactly where buttons’ styles come from will be a lot more difficult, and that changing anything will likely have huge knock-on effects elsewhere. This is one of the key problems with mutable CSS.

Make use of something like BEM in order to create completely brand new classes that carry those changes, e.g.:

```
.btn {}

.btn--large {}

.btn--primary {}

.btn--ghost {}
```

Just one key selector each.

## A Class Appearing in Another Component’s File

On a similar but subtly different theme as above, the appearance of classes in other components’ files is indicative of a code smell.

Where the previous code smell deals with the question of there being more than one instance of the same key selector, this code smell deals with where those selectors might live. Take this question from [Dave Rupert](https://twitter.com/davatron5000):

> `.some-context .thing { /* special rules and overrides */ }`  
> Does that go in thing.css or some-context.css?
> 
> — Dave Rupert (@davatron5000) [7 February, 2017](https://twitter.com/davatron5000/status/829091851651149824)

If we need to style something differently because of its context, where should we put that additional CSS?

1.  In the file that styles the thing?
2.  In the file that controls that context?

Let’s say we have the following CSS:

```
.btn {
  [styles]
}

.modal .btn {
  font-size: 0.75em;
}
```

Where should `.modal .btn {}` live?

It should live **in the `.btn` file.**

We should do our best to group our styles based on the subject (i.e. the key selector). In this example, the subject is `.btn`: that’s the thing we actually care about. `.modal` is purely a context for `.btn`, so we aren’t styling it at all. To this end, we shouldn’t move `.btn` styling out into another file.

The reason we shouldn’t do this is simply down to collocation: it’s much more convenient to have the context of all of our buttons in one place. If I want to get a good overview of all of the button styles in my project, I should expect to only have to open `_components.buttons.scss`, and not a dozen other files.

This makes it much easier to move all of the button styles onto a new project, but more importantly it eases cognitive overhead. I’m sure you’re all familiar with the feeling of having ten files open in your text editor whilst just trying to change one small piece of styling. This is something we can avoid.

Group your styles into files based on the subject: if it styles a button, no matter how it goes about it, we should see it in `_components.buttons.scss`.

As a simple rule of thumb, ask yourself the question am I styling x or am I styling y? If the answer is x, then your CSS should live in `x.css`; if the answer is y, it should live in `y.css`.

### BEM Mixes

Actually, interestingly, I wouldn’t write this CSS at all—I’d use a BEM mix—but that’s an answer to a different question. Instead of this:

```
// _components.buttons.scss

.btn {
  [styles]
}

.modal .btn {
  [styles]
}


// _components.modal.scss

.modal {
  [styles]
}
```

We’d have this:

```
// _components.buttons.scss

.btn {
  [styles]
}


// _components.modal.scss

.modal {
  [styles]
}

  .modal__btn {
    [styles]
  }
```

This third, brand new class would get applied to the HTML like this:

```
<div class="modal">
  <button class="btn  modal__btn">Dismiss</button>
</div>
```

This is called a BEM mix, in which we introduce a third brand new class to refer to a button belonging to a modal. This avoids the question of where things live, it reduces the specificity by avoiding nesting, and also prevents mutation by avoiding repeating the `.btn` class again. Magical.

## CSS `@import`

I would go as far as saying that CSS `@import` is not just a code smell, it’s an active bad practice. It poses a huge performance penalty in that it delays the downloading of CSS (which is a critical asset) until later than necessary. The (simplified) workflow involved in downloading `@import`ed CSS looks a little like:

1.  Get the HTML file, which asks for a CSS file;
2.  Get the CSS file, which asks for another CSS file;
3.  Get the last CSS file;
4.  Begin rendering the page.

If we’d got that `@import` flattened into one single file, the workflow would look more like this:

1.  Get the HTML file, which asks for a CSS file;
2.  Get the CSS file;
3.  Begin rendering the page.

If we can’t manage to smush all of our CSS into one file (e.g. we’re linking to Google Fonts), then we should use two `<link />` elements in our HTML instead of `@import`. While this might feel a little less encapsulated (it would be nicer to handle all of these dependencies in our CSS files), it’s still much better for performance:

1.  Get the HTML file, which asks for two CSS files;
2.  Get both CSS files;
3.  Begin rendering the page.

* * *

So there we have a few additions to my previous piece on Code Smells. These are usually all things I have seen and suffered in the wild: hopefully now you can avoid them as well.

* * *

* * *

* * *

![](https://csswizardry.com/img/content/avatar.jpg)

##### By [Harry Roberts](https://csswizardry.com/about/)

Harry Roberts is an [independent consultant](https://csswizardry.com/consultancy/) web performance engineer. He [helps companies](https://csswizardry.com/services/) of all shapes and sizes find and fix site speed issues.

* * *

* * *

![](https://csswizardry.com/img/css/masthead-small.jpg)

Hi there, I’m **Harry Roberts**. I am an **[award-winning](https://web.archive.org/web/20190630140300/https://thenetawards.com/previous-winners/) Consultant Web Performance Engineer**, **designer**, **developer**, **writer**, and **speaker** from the UK. I **[write](https://csswizardry.com/blog/)**, **[Tweet](https://twitter.com/csswizardry)**, **[speak](https://csswizardry.com/speaking/)**, and **[share code](https://github.com/csswizardry)** about measuring and improving site-speed. You [should hire me](https://csswizardry.com/services/).

* * *

#### Connect

-   [𝕏 (Twitter)](https://twitter.com/csswizardry)
-   [Mastodon](https://webperf.social/@csswizardry)
-   [Bluesky](https://bsky.app/profile/csswizardry.com)
-   [LinkedIn](https://www.linkedin.com/in/csswizardry/)
-   [GitHub](https://github.com/csswizardry)
-   [YouTube](https://www.youtube.com/@csswizardry?sub_confirmation=1)

* * *

#### Projects

#### Next Appearance

-   #### Talk
    
    ![](https://csswizardry.com/img/icons/nl.png) [performance.now()](https://perfnow.nl/): Amsterdam (Netherlands), October 2025

I help teams achieve **class-leading web performance**, providing consultancy, guidance, and hands-on expertise.

I specialise in tackling complex, large-scale projects where speed, scalability, and reliability are **critical to success**.

**CSS Wizardry Ltd** is a company registered in England and Wales. **Company No.** 08698093, **VAT No.** 170659396. [License Information](https://csswizardry.com/license/).