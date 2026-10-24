---
title: "Accordion Icons: Which Work Best?"
source: "https://smashingmagazine.com/2026/10/accordion-icons-which-work-best/"
publishedDate: "2026-10-23"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Vitaly Friedman)"
---

-   5 min read
-   [Design](https://smashingmagazine.com/category/design), [UX](https://smashingmagazine.com/category/ux), [Icons](https://smashingmagazine.com/category/icons)

A closer look at accordion icons, why split menus are harmful, and why it’s better not to have icons and text labels link to different actions. Plus, why the caret is the safest icon choice. You’ll find more [useful guides](https://www.smashingmagazine.com/category/guides/) and [online workshops](https://smashingconf.com/online-workshops) here on Smashing Magazine, so make sure to browse and explore.

So what icon is the **most reliable** to show expansion and collapsing for accordions? Is there really any noticeable difference between carets, chevrons, arrows, and triangles?

Well, [research](https://www.nngroup.com/articles/accordion-icons/) shows that there is some difference indeed. But what’s more interesting is that **split menus are harmful**, why it’s better to not have icons and text labels link to different actions, and why the caret is the safest icon choice. Let’s dive in!

[![Accordion icon study from NN/g: a full breakdown of which icons (caret, arrow, plus, none) are most effective at signaling accordion behaviour vs. page navigation](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-name-things-choose-accordion-icons/15-accordion-icons.jpg)](https://www.nngroup.com/articles/accordion-icons/)

[Research from NN/g](https://www.nngroup.com/articles/accordion-icons/) on which accordion icons work and which create confusion. If it’s a link, underline it. If it opens an accordion, use a caret. It’s that simple. ([Large preview](https://files.smashing.media/articles/how-name-things-choose-accordion-icons/15-accordion-icons.jpg))

## No Icon = Opening The Page

The findings aren’t very surprising: without any icon in use, users expect that tapping on the menu item would take them directly to a new page. Users often struggle with **custom icons** as they don’t clearly signal that they’ll open an accordion. And people tend to tap fairly equally on the icon and on the label for most icons.

[![Accordion icon study results showing user expectations by icon type — no icon, arrow, caret, and plus — and how each affects whether users expect a page navigation or an accordion opening](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-name-things-choose-accordion-icons/10-accordion-icon-study.jpg)](https://www.nngroup.com/articles/accordion-icons/)

Participants were equally likely to tap on either the text label or the icon, except for the caret, where people tapped more on the icon. From the [NN/g study on accordion icons](https://www.nngroup.com/articles/accordion-icons/). ([Large preview](https://files.smashing.media/articles/how-name-things-choose-accordion-icons/10-accordion-icon-study.jpg))

Many designs (like the one below) tend to slightly **overcomplicate things** by adding arrows and carets pointing everywhere, depending on the state of the accordion. But typically we don’t need to use an arrow to indicate a link to the category.

[![Additional findings from the NN/g accordion icon study showing icon-tapping vs. label-tapping behaviour across different icon types and accordion states](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-name-things-choose-accordion-icons/11-nng-aaccordion-icon-study.jpg)](https://www.nngroup.com/articles/accordion-icons/)

People tend to tap fairly equally on the icon and on the label, which means the icon choice affects the whole hit area, not just the visual signal. From the [NN/g study on accordion icons](https://www.nngroup.com/articles/accordion-icons/). ([Large preview](https://files.smashing.media/articles/how-name-things-choose-accordion-icons/11-nng-aaccordion-icon-study.jpg))

The rule of thumb is very simple: if it’s a link, the easiest and most effective way is to **simply underline it** — without any arrow, caret, or other icon. Perhaps it’s not particularly exciting, but it works flawlessly every single time.

## Confusing Behavior With Arrows ▶ and Split Buttons

Using a right-facing arrow icon ▶ **isn’t** associated with an expectation of going directly to a new page. And having the same icon pointing down ▼ doesn’t necessarily imply that an accordion is going to open on tap/click.

It’s a good idea to **avoid split buttons for accordions** — where the text label links directly to a page, but the icon opens the accordion. Instead, it’s much more reliable to allow users to tap on a main category and expose the menu; and to access the category page, we add a link to it inside the menu.

[![DHL navigation showing accordion icon usage in a real-world e-commerce context: an example of how a major shipping and logistics brand applies accordion signifiers in its menu design](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-name-things-choose-accordion-icons/12-accordion-navigation-dhl.jpg)](https://www.dhl.de/)

An accordion navigation from DHL: no unnecessary arrows, no split menus, with “Overview” links in each section. (Image source: [DHL.de](https://www.dhl.de/)) ([Large preview](https://files.smashing.media/articles/how-name-things-choose-accordion-icons/12-accordion-navigation-dhl.jpg))

## Plus +/− and Arrows ↓/↑ Are Understood, But Can Be Misunderstood

For accordions, we typically use +/− or arrows ↓/↑ to signal expanded and collapsed states, and typically it works well. However, both have **many different interpretations**. Plus + can mean anything from saving for later to adding to cart to zooming in, and can be particularly confusing for multi-level navigation, with many levels open at the same time.

[![Split button accordion pattern showing the problem of having a text label link to a page while the icon opens the accordion — a confusing interaction that fails usability tests](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-name-things-choose-accordion-icons/13-split-button-accordion-pattern.jpg)](https://www.nngroup.com/articles/accordion-icons/)

What users actually expect: more people expect a new page when clicking on an arrow, but even more when no icon is provided at all. From the [NN/g study on accordion icons](https://www.nngroup.com/articles/accordion-icons/). ([Large preview](https://files.smashing.media/articles/how-name-things-choose-accordion-icons/13-split-button-accordion-pattern.jpg))

Arrows ↓/↑ can mean scrolling or sliding or finding the next match, but also a jump to a particular portion of a page. Both plus and arrows are well-understood and work, but depending on the design, can be confusing — mostly because **they are overloaded**.

## Wrapping Up

The safe choice is to use the **caret/triangle pointing down ▼ by default**, and change it to a caret pointing up or a caret pointing sideways ▶ on interaction. If you need an alternative, then +/- typically work well, too.

[![Lens.org scholarly search on mobile showing accordion expand/collapse — left phone shows a collapsed result list with a caret-down icon, right shows the same item expanded with the abstract visible and a caret-up icon](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-name-things-choose-accordion-icons/14-lensorg-accordion.jpg)](https://www.lens.org/lens/search/scholar/list?p=0&n=10&s=date_published&d=%2B&f=false&e=false&l=en&authorField=author&dateFilterField=publishedYear&orderBy=%2Bdate_published&presentation=false&preview=true&stemmed=true&useAuthorId=false&country.must=CN&publishedYear.from=2020&publishedYear.to=2024&hasFullText=true&hasChemical=true)

The caret working well for search results expansion. [Lens.org](https://www.lens.org/lens/search/scholar/list?p=0&n=10&s=date_published&d=%2B&f=false&e=false&l=en&authorField=author&dateFilterField=publishedYear&orderBy=%2Bdate_published&presentation=false&preview=true&stemmed=true&useAuthorId=false&country.must=CN&publishedYear.from=2020&publishedYear.to=2024&hasFullText=true&hasChemical=true) uses a caret-down to indicate collapsible items. ([Large preview](https://files.smashing.media/articles/how-name-things-choose-accordion-icons/14-lensorg-accordion.jpg))

But we certainly don’t need any further icons or arrows to indicate where the links go. The same goes for split menus, which often produce more mistakes than help. Instead, we have one button or dropdown that does exactly one thing — shows all options and allows users to drill down.

And if you need a direct link, we link the title directly to the page and **underline it**. More often than not, simpler is better.

### Editor’s Note

We hope you’ll find these wonderful projects useful — put together by wonderful creators. A friendly shout-out to everyone sharing their work with folks to use and learn from! That’s one of the reasons why we truly love the web and people building and designing it. 💚

At Smashing, **we love the web**. That’s why we publish articles and books, run workshops and events around everything web. We love seeing what we all can do to make the web more accessible and usable. We also love organizing and attending [online events](https://smashingconf.com/online-workshops) — with **friendly discounts** for large groups (5+ attendees) and schools and students. Interested? Just [send us an email](https://smashingconf.com/contact) and we’ll sort it out!

-   Multiple **live sessions** (2.5h each),
-   **09:00 – 11:30 AM PT** (18:00 – 20:30 CET)
-   With **workshop video recordings** & slides,
-   [Free video preview](https://www.youtube.com/watch?v=6vGXBWj0hI0) (2.5h)
-   [Jump to all workshops →](https://smashingconf.com/online-workshops#all-workshops)

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)