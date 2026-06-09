---
title: "Our CSS isn’t opinionated enough"
source: "https://www.craigabbott.co.uk/blog/2026/our-css-isnt-opinionated-enough/"
publishedDate: "2026-06-05"
category: "design"
feedName: "Sidebar"
---

For as long as I can remember, styling classes has always been pushed as "best practice" for writing CSS. Avoid IDs because they're too specific. Avoid styling tags directly because it's too broad.

You can't get away from it. It's even baked into most of the linting tools we use every day. It's sensible advice, but I do think it has quietly trained several generations of developers to build things that look correct, yet communicate no semantics.

## The advice we've all been given

If you've ever read a CSS style guide, you've almost certainly seen [specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Specificity) explained. The browser works out which rule wins based on how specific the selector is. An inline style beats an ID, an ID beats a class, and a class beats a tag.

Because IDs are so specific, they're a nightmare to override later. So the common advice is to avoid them for styling. And, because tag selectors are so broad, targeting the `button` directly might accidentally include buttons you didn't mean to. So, the advice is often just avoid those too and reach for a class every time. Even CSS linters often complain if you try to target anything except a class.

The "best practice" most of us were taught for a button, just looks something like the following example:

```
.btn {  padding: 0.75rem 1.5rem;  background: #0f7a52;  color: #ffffff;  box-shadow: 0 2px 0 #083d29;}
```

It's not that it's bad advice. It's actually really good advice, depending on which lens you view it through. Classes are reusable, they're easy to override and they keep specificity nice and flat. However, like in my post [best practice is just your opinion](https://www.craigabbott.co.uk/blog/2025/best-practice-is-just-your-opinion/), we have to remain conscious that "best practice" is exactly that, an opinion. This one has held up pretty well for a long time, but is it really the best way of doing things?

The issue is, a class is just a way to enforce rendered styling, it carries very little semantic meaning to a browser, to an assistive technology, or to anybody other than the developer who wrote it.

## A class will happily lie to you and your users

Because a class is purely cosmetic, you can slap it on absolutely anything and it will happily apply all the styles. The browser doesn't care what element is underneath. I guess if I was to stretch for an analogy, we can think of a class more like paint than an item of clothing. Paint can be applied to literally anything, whereas clothing comes in set shapes and sizes, so they can only fit on certain things. For example, all three of these elements will look identical using a class after using a CSS reset, which is also common practice.

```
<button class="btn">Submit</button><div class="btn" onclick="submitForm()">Submit</div><span class="btn" onclick="submitForm()">Submit</span>
```

Visually, they all look like a real button. They have the padding, the background, the shadow, and they will all submit the form when you click on them using a mouse. However, only one of them is truly a button. Only one is focusable with a keyboard. Only one of them will fire on the Enter and Space keys. Only one of them will be announced as a button by a screen reader, and only one of them will respond to voice recognition software when you say "click button". And, they're all the one using the `<button>` tag.

This is one of the most common failures you're likely to see in the wild. A generic element, like a `<div>` or a `<span>`, painted up to look like an interactive element, but with none of the behaviour or semantics that make it actually work. It fails [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), because the role isn't communicated, and it usually fails [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) too, because you can't operate it without using a mouse.

As an example, to make `<div>` behave like an actual button, you'd need to manually add all of the same semantics. This would be a surprising amount of code by the time you're done. You'd need to manually code up the:

-   `role` attribute
-   `tabindex` attribute
-   `onclick` event
-   `keydown` event
-   `keyup` event
-   `form.requestSubmit()` method

Also, the events for Space and Enter are technically different, so you also need to account for that. You can read more about this in the following post, [brief note on buttons, enter and space](https://adrianroselli.com/2022/04/brief-note-on-buttons-enter-and-space.html), by Adrian Roselli.

The class-first CSS approach didn't cause this, but it absolutely enables it! We've built and pushed a "best practice" way of working where appearance and semantic meaning are completely decoupled. Then, we're weirdly surprised that people are constantly shipping products with the styles and semantics completely decoupled!

## What if the styles were reliant on the semantics?

Now. What if we only applied button styles to actual buttons? I know! Crazy, right?

For example:

```
button {  padding: 0.75rem 1.5rem;  background: #0f7a52;  color: #ffffff;  box-shadow: 0 2px 0 #083d29;}
```

Now, if a developer wants something to look like a button, the only way to actually get those styles is to use a `<button>` element. The semantics are always included, because you literally can't have it look like a button without them. Keyboard operability, the correct role, the right events, all of it comes for free, because you used the right tag.

The `<div class="btn">` hack stops working, because you can't just abuse a class name. The styling is hard-wired to the very thing that makes it accessible.

As for variants, that's where you can now use a class. For example:

```
button.secondary {  background: #f3f3f3;  box-shadow: 0 2px 0 #858686;  color: #0b0c0c;}
```

This gets more interesting when you bring [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) into it. A lot of interactive components have a state that needs to be communicated to assistive technology in order to pass [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html). For example, on disclosures, accordions and menu buttons, the state should be articulated using the `aria-expanded` attribute, set to `true` or `false`.

Lets take a look at another code example. Imagine you have a navigation menu, and the link which points to the current page has a visual highlight. This is another very common issue where visual states are only styled using a class and the semantic state is not surfaced. For example:

```
<nav class="nav">  <ul>    <li>      <a href="/home" class="nav__link">        Home      </a>    </li>    <li>      <a href="/about" class="nav__link nav__link--current">        About      </a>    </li>    ...  </ul></nav>
```

```
.nav__link {  color: white;}.nav__link--current {  border-bottom: 10px solid #0855ee;  color: #0855ee}
```

This example appears fine to a sighted user. But to somebody using a screen reader, the context of the current page link being highlighted is never communicated. Because the state is attached via a class, the browser never surfaces it, because classes are not usually translated to the accessibility tree.

Now, what if we styled on the ARIA attribute instead? By attaching the visible state to the semantic state, you cannot have one without the other. For example:

```
<nav class="nav">  <ul>    <li>      <a href="/home" class="nav__link">        Home      </a>    </li>    <li>      <a href="/about" class="nav__link" aria-current="page">        About      </a>    </li>    ...  </ul></nav>
```

```
a.nav__link {  color: white;}a.nav__link[aria-current="page"] {  border-bottom: 10px solid #0855ee;  color: #0855ee;}
```

Now, the current page highlight can only become visible if `aria-current` is actually set as an attribute, with the value `page`. The visual state is no longer decoupled from the semantic state which the screen reader relies on. And, attribute selectors have the same specificity as a class, so you're not even having to fight the cascade to do this.

We can apply the same thinking for many components. For example, style your invalid input fields on `[aria-invalid="true"]` rather than a generic `.error` class. Style your expanded states on `[aria-expanded="true"]`. Style your toggle buttons on `[aria-pressed="true"]`. In each case, the appearance becomes a side effect of the semantics being correct, rather than just something you can apply to anything on a whim.

## Being strict about which attributes you use

I'd be doing the exact thing I moan about if I presented this as the best way to do things. "Best practice" is just an opinion, so let me be honest about some of the things that might not be perfect about this approach.

It doesn't work automatically for _all_ attributes. For example, you could slap `role="button"` on a `<div>` and apply styling to that. From a semantic point of view, this will give the screen reader and voice recognition software the context needed to recognise it as a button, which is likely enough to pass. But, it still wouldn't make it _behave_ like a button. You'd still need to manually add the `tabindex` and event handlers etc. So, if you find yourself writing `[role="button"]` into your CSS selectors, you're probably re-opening that door to hackery.

It also doesn't play nicely with utility-first frameworks. If your whole codebase is using something like [TailwindCSS](https://tailwindcss.com/), then styling on an ARIA attribute is a pretty alien concept, because the entire model depends on chaining multiple classes on any element. This paradigm of styling on tags and ARIA attributes is not going to fit neatly into that world.

Also, tag selectors really can be too broad. If you style every `<button>` globally, you need a genuine plan for variants, otherwise it gets messy. You can still do this with classes, but they need to be bound to the element tag too. For example, `button.secondary`, or you could use something like `button[data-variant]`, which is probably the pragmatic middle ground anyway.

The other thing worth noting is that styling on ARIA attributes only works if something is actually updating them. If your JavaScript never updates `aria-expanded`, then it just looks permanently broken. Though, to be fair, I'd argue this is much more likely to get noticed and get fixed than if the ARIA attribute was just silently failing in the DOM.

## Final thoughts

Last week, I spoke at the awesome [JSHeroes](https://jsheroes.io/) conference. [Ryan Townsend](https://www.linkedin.com/in/ryantownsend/) and I got chatting about how modern frameworks and the introduction of polymorphic components, despite making life easier for developers, actually make it a lot easier to mess up basic HTML semantics and accessibility.

I've also had similar conversations with [Ian Pouncey](https://tetralogical.com/about/team/ipouncey/) about how CSS classes can do the same. And, in typical fashion, prior to hitting publish on this, when I mentioned it to [Patrick H. Lauke](https://www.linkedin.com/in/redux/), he pointed me at the following resources which already argue the same points I've just made:

-   [WAI-ARIA An introduction to Accessible Rich Internet Applications, by Patrick H. Lauke](https://patrickhlauke.github.io/aria/presentation/?full#105)
-   [Using CSS to enforce accessibility, by Adrian Roselli](https://adrianroselli.com/2021/06/using-css-to-enforce-accessibility.html)

So, the points I'm making are not new or novel, but I feel like we need to keep re-iterating them until they stick.

I think the way we currently write CSS subtly shapes the way we think about components. By having the visual styles completely decoupled from the semantic meaning, accessibility is easy to forget, because we can't physically see missing attributes. When the styling hook _is_ anchored to semantics, you can't get the visual styles without also getting the parts that make it accessible.

I'm not saying rip every class out of your stylesheets tomorrow. I'm just saying that "always use classes" might be some words of wisdom we need to revisit. It solved the gnarly problem of specificity for a long time, but it's quietly created a different problem, which was the total separation of how something looks from what it actually is.

I wholly expect there are a lot of people who will still argue it isn't the done thing, it's too difficult, or it would fall over when it meets a real design system and a tight deadline. But ever since my time in public sector, I've stood firmly by the [government design principle](https://www.gov.uk/guidance/government-design-principles) that we need to "do the hard work to make it simple".

Thanks,  
Craig

* * *

## Post details

Published:

21 May 2026

Read time:

7 minutes