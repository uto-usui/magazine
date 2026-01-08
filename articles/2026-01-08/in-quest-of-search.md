---
title: "In Quest of Search"
source: "https://www.sarasoueidan.com/blog/in-quest-of-search/"
publishedDate: "2021-09-15"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [tl;dr](#tl%3Bdr)
2.  [HTML and ARIA landmark roles](#html-and-aria-landmark-roles)
3.  [HTML and ARIA landmarks, beyond semantics](#html-and-aria-landmarks%2C-beyond-semantics)
    1.  [But is a native search landmark worth it?](#but-is-a-native-search-landmark-worth-it%3F)
4.  [Just because an ARIA role exists, it doesn’t eliminate the usefulness of a native HTML equivalent](#just-because-an-aria-role-exists%2C-it-doesn%E2%80%99t-eliminate-the-usefulness-of-a-native-html-equivalent)
5.  [The purpose of ARIA](#the-purpose-of-aria)
6.  [The first rule of ARIA](#the-first-rule-of-aria)
7.  [Outro](#outro)

There’s been [a recent discussion on Twitter](https://twitter.com/domenic/status/1437891692926017537?s=20) about the idea of adding a new element in HTML that represents a search interface. A search form, basically.

The idea is to create a semantic HTML element for [the ARIA `search` role](https://www.w3.org/TR/wai-aria-1.1/#search), which represents a landmark region “that contains a collection of items and objects that, as a whole, combine to create a search facility.”

Opinions have been shared in the Twitter thread about whether adding a new HTML element is necessary. Many have argued that it was unnecessary because we can use the ARIA `search` role and repurpose a `form` element to create the same semantics. I disagree. And this article is the longer version of **my personal opinion** on the subject.

## tl;dr

I do strongly encourage the addition of a new HTML element that represents—and can consequently obviate the use of—the ARIA `search` landmark role. A search element would provide HTML parity with the ARIA role, and encourage less use of ARIA in favor of native HTML elements.

The suggested element would be syntactic sugar for `<div role="search">` like `<main>` is syntactic sugar for `<div role="main">`. This means that it would an HTML sectioning element, not a replacement for another element.

I would choose `<search>` as a name for that element. In my mind, `<search>` would be to `role="search"` what `<nav>` is to `role="navigation"`. But any other appropriate name would, of course, also work.

The rest of this article is my reasoning for encouraging the idea of adding a semantic HTML element for search.

## HTML and ARIA landmark roles

The ARIA specification includes a list of ARIA **roles** that are used to define regions of a page as landmarks:

-   `banner`
-   `complementary`
-   `contentinfo`
-   `form`
-   `main`
-   `navigation`
-   `region`
-   `search`

HTML currently contains 112 elements. Eight of those elements are [sectioning elements](https://www.w3.org/TR/wai-aria-practices/examples/landmarks/HTML5.html): `main`, `nav`, `aside`, `header`, `footer`, `article`, `section`, `form`.

Seven of these HTML sectioning elements are [mapped](https://www.w3.org/TR/core-aam-1.2/) to ARIA landmarks, which are used by assistive technologies (ATs).

-   `header` is the HTML native equivalent for ARIA’s `role="banner"` (when it is scoped to the `body` element. See [HTML Accessibility API Mappings](https://www.w3.org/TR/html-aam-1.0/) for more information.)
-   `footer` is the HTML native equivalent for ARIA’s `role="complementary"` (also in the context of the `body` element)
-   `nav` is the HTML native equivalent for ARIA’s `role="navigation"`
-   `main` is the HTML equivalent for ARIA’s `role="main"`
-   `form` is the HTML equivalent for ARIA’s `role="form"`
-   `aside` is the HTML equivalent of ARIA’s `role="complementary"`
-   `section` is the HTML native equivalent for ARIA’s `role="region"` (when it has [an accessible name](https://www.w3.org/TR/wai-aria/#dfn-accessible-name))

It is because these elements exist that we often don’t need to use ARIA’s equivalent roles (unless we absolutely _have_ to repurpose another element using those roles, or expose an element to ATs when it is outside of its expected context).

If `<nav>` exists, why should a `<search>` (or whatever other name it gets) not? If `<search>` is to be deemed unnecessary because `role="search"` exists, wouldn’t this also mean that `<nav>` (and other landmark elements) would be considered _redundant_ because `role="nav"` (and other ARIA roles) exists?

## HTML and ARIA landmarks, beyond semantics

[ARIA landmark roles](https://w3c.github.io/aria/#landmark_roles) are roles assigned to regions of a page that are intended as **navigational landmarks**. Using ARIA landmarks (or their equivalent native HTML elements when they exist) is meant to also facilitate user navigation.

From [the W3C WAI-ARIA Editor’s Draft](https://w3c.github.io/aria/):

> Assistive technologies SHOULD enable users to quickly navigate to elements with role search. User agents SHOULD treat elements with role search as navigational landmarks. User agents MAY enable users to quickly navigate to elements with role search.

When HTML sectioning elements (and/or ARIA landmark roles) are appropriately used on a page, assistive technology users such as screen readers users could use those landmarks to navigate the page more efficiently, allowing them to jump to the area of the page that they want.

For example, if the `<nav>` element (or, equivalently, the `role="navigation"` ARIA role on a qualifying element) is used to wrap a page’s navigation, the navigation shows up in the VoiceOver Rotor on macOS. Similarly, using the `main` element will make the main section of the page show up in the landmarks menu. The user can then quickly jump straight to the navigation section or to the main content area of the page if they want to, bypassing other regions of the page. This increases the user’s efficiency and improves their navigation experience.

Similarly, when you use `role="search"` on a `form` element, that form will show up as a search region in the landmarks menu. The user can then jump to the search form if they need to quickly search for something.

![A screenshot of VoiceOver's Rotor open on the homepage of Webaim.org, showing a search landmark in the Landmarks menu. The screenshot also shows the Web inspector of the page open and a code snippet highlighting the use of role='search' on the form element wrapping the search input field.](https://www.sarasoueidan.com/assets/images/article__search-html-element/search-vo-webaim.png)

The search form on WebAIM's Web site shows up in the Landmarks menu by VoiceOver on macOS because `role="search"` ARIA role is present on the `form` element.

![A screenshot of VoiceOver's Rotor open on SmashingMagazine.com, demonstrating the lack of a search landmark in the landmarks menu. The screenshot also shows the Web inspector of the page open and a code snippet highlighting the absence of role='search' on the form element wrapping the search input field.](https://www.sarasoueidan.com/assets/images/article__search-html-element/search-vo-smashing.png)

The search form on Smashing Magazine's Web site is not recognized as a search landmark by VoiceOver on macOS because `role="search"` ARIA role is absent on the `form` element.

_If HTML sectioning elements are used without understanding the associated landmark structure, assistive technology users will most likely be confused and less efficient in accessing content and interacting with web pages._

### But is a native search landmark worth it?

Yes, it is. Search is one of the most common and most used sections of many Web sites. Of course, a “It Depends” is warranted here, too.

Depending on the Web site, search might be the first thing a user looks for and uses on a given site. E-commerce Web sites are a great example of where search forms are essential and heavily used. Educational and documentation sites are another example.

Take MDN, for example. Search is so important and on MDN that the site even includes a Skip Link that enables keyboard users to skip straight to the search field.

![A screenshot the MDN homepage with a 'skip to search' skip link highlighted at the top edge of the page.](https://www.sarasoueidan.com/assets/images/article__search-html-element/mdn-search-skip-link.png)

Now I don’t have any user research data or anything, but I would assume that the skip link was added because of how frequently users reach for the search field to look up documentation about specific topics they’re searching for.

## Just because an ARIA role exists, it doesn’t eliminate the usefulness of a native HTML equivalent

I’ll just say it again: ust because an ARIA role exists, it doesn’t eliminate the usefulness of a native HTML equivalent.

## The purpose of ARIA

…is to provide parity with HTML semantics. It is meant to be used to **fill in the gaps** and provide semantic meaning where HTML falls short.

ARIA is **not meant to _replace_ HTML.** If anything, the need to use ARIA as ‘polyfill’ for HTML semantics could be considered as a sign and a constant reminder of the fact that HTML falls short on some semantics that benefit users of assistive technologies. This is due to the lack of native HTML elements that provide the meaning (and sometimes, by extension, the behavior) that these ATs need to convey to their users.

If we can get an HTML element that fills a part of the gap, it’s only going to be a win—no matter how small of a win it might seem.

> \> ARIA is not meant to replace HTML
> 
> this! In fact, I think we might want it to go the other way around, with HTML replacing ARIA bit by bit until its services are no longer required
> 
> — Hidde (@hdv) [September 15, 2021](https://twitter.com/hdv/status/1438197503095103494?ref_src=twsrc%5Etfw)

## The first rule of ARIA

The first rule of [ARIA use in HTML](https://www.w3.org/TR/aria-in-html/) states that you should **avoid using ARIA if there is a native HTML element with the semantics of behavior that you require already built in.** If such an element exists, you should reach for that element instead.

This means that ARIA should be **a second resort, not a first approach.**

By providing HTML elements that are implicitly mapped to ARIA roles, we can encourage the use of proper HTML markup to convey semantic meaning, and spread more awareness to help avoid both overuse and misuse of ARIA in general.

If we can get an HTML element that enables us to use ARIA less, then that element should, in my opinion, be a welcomed addition.

## Outro

A native search element might feel like a _small_ technical win to many, but the consistency it provides, the HTML semantics gap it fills, and the awareness it could potentially help spread would all make it a useful and welcomed addition.

112 to 113 HTML elements? I hope so.

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.