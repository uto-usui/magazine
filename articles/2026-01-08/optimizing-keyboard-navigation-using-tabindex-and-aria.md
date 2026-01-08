---
title: "Optimizing keyboard navigation using tabindex and ARIA"
source: "https://www.sarasoueidan.com/blog/keyboard-friendlier-article-listings/"
publishedDate: "2020-06-10"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [Clicks. Taps. Tabs. Steps.](#clicks.-taps.-tabs.-steps.)
2.  [Navigating a list of posts with a keyboard](#navigating-a-list-of-posts-with-a-keyboard)
3.  [Optimizing keyboard navigation using tabindex and aria-hidden](#optimizing-keyboard-navigation-using-tabindex-and-aria-hidden)
4.  [One size does not fit all.](#one-size-does-not-fit-all.)
5.  [To sum up:](#to-sum-up%3A)

The faster the user can navigate your UI the better. The faster they can get to the content they need, the better. Therefore, the less steps they have to go through, the more efficient their overall experience with the UI will be. And this applies to keyboard tabbing, too: the less tabs the user needs to stop at while navigating, the faster they are to get to where they need. The way we mark up our content has a direct effect on the user’s experience. But we can drastically improve the UX by specifically optimizing the markup for keyboard users.

## Clicks. Taps. Tabs. Steps.

If there’s one thing working with UX designers has taught me it’s that the less steps the user needs to go through their journey, the better. As such, they usually design experiences by making sure fewer clicks are needed to get the user to the end of their journey. As a design engineer, when talking about “steps” and “clicks”, my brain can’t help but think of taps and tabs, too. Because a user could be interacting with the UI in several ways, not just using a mouse. Taps are practically touch equivalents of clicks, so I assume the experience would be as optimized for those as it is for non-touch. But the experience for keyboard users is usually a more than a little different.

As a design engineer, my job is to weigh in and provide consultancy and recommendations to make sure the UI design works for users in different contexts. This means that I provide feedback to make sure keyboard user experiences, among others, are also considered. Designs are often tweaked if and when needed based on our UX discussions. But often times, us developers can make optimizations and improvements to accessibility and UX that don’t require design discussions and/or permissions. And when we can, we should.

* * *

A user navigating and interacting with a UI using a mouse can usually move across the page with little effort — they literally move the cursor to where they want to. The mouse cursor ”hovers” _above_ a page, so to speak. Unless you use a design anti-pattern, there are rarely any obstacles in their way, because most designs are usually optimized for their interactions. It doesn’t matter how many links there are on the page, they can go straight to the link they want, click it, and move on.

A keyboard user, on the other hand, can’t go anywhere without going through a series of tab stops that _you_ set for them. If they were a person standing infront of stairs, a keyboard user needs to walk up the stairs to get to their destination (compared to a mouse user who wears a pair of magical flying shoes or uses a Hoverboard to _fly_ up the stairs 😅). The more steps the stairs have, the more steps they need to climb, the longer their journey, and the more cumbersome it can be. There are no shortcuts to go where they want to more quickly and efficiently… _unless_ you _provide_ them with shortcuts. I’ll elaborate on that in another post. In this post, I want to talk about markup and how it can sometimes be optimized for more efficient keyboard navigation. As an example, I want to talk about article listings.

* * *

Blogs, online magazines and other publications will normally display lists of articles or posts. Browsing such publications, often you’ll notice a familiar pattern in most of those listings: a post entry has a typical anatomy normally consisting of:

-   a thumbnail,
-   a post title,
-   author name,
-   post tags,
-   an excerpt or description,
-   and a “read more” link,

give or take one or more elements. So the post may include all of the above elements minus the thumbnail, for example. Or it might be composed of a thumbnail, a title, and a description only. It could also include a link to the comments section on the full article page. And so on.

Typically, the thumbnail, post title and Read More link all link to the same page: the full article page, while the author name and list of tags post to their corresponding pages. If you’re a sighted mouse user and you want to read the full post, you click on either the thumnail, the title, or the Read More link to get there. You may even be able to click on the whole post [if it is marked up for it](https://www.sarasoueidan.com/blog/nested-links/).

But how does this post anatomy affect a keyboard user?

## Navigating a list of posts with a keyboard

If you use a keyboard to navigate a page containing a typical list of posts, you’ll notice that you sometimes need to tab through the same link two or three times in a row. To demonstrate, I recorded the exeprience of tabbing through the [New York Times](https://www.nytimes.com/), [Medium](https://medium.com/), and [Forbes](https://forbes.com/) homepages:

Sorry, your browser doesn't support embedded videos.

Posts on the Forbes homepage contain three links per post: the the thumbnail, the post title, and an icon-only version of a “Read More” link. Clicking on any of these links takes the user to the full article page corresponding to this post. So, **a user navigating using keyboard practically needs to tab through the same link three times in a row** to continue navigating to the next post and whatever content comes after. The more posts there are, the longer the tabbing journey will be.

Sorry, your browser doesn't support embedded videos.

The New York Times homepage features a list of posts, each containing two focusable elements / links: a thumbnail, and a link that includes the text for both the title and post description. **Both of these links take the user to the full article page.**

Sorry, your browser doesn't support embedded videos.

On the Medium homepage, each post is made up of five links, three of which link to the full article page: the post thumbnail, the title, and the post description. Tabbing through these posts means the user needs to tab through the same link three times in a row.

If you use a keyboard a lot, you’ll probably start to notice how redundant it is to tab through the same link multiple times in a row. If you’re wanting to get to a section that comes after the article listings on that page, you’ll need to tab quite a lot before you get there.

When a list of posts is designed like with such a structure in mind, it is usually optimized for **a sighted mouse/touch user**. Such a user would have a generous collection of elements to click or tap, all leading to the same page that they probably eventually want to visit.

But this design is not optimized for keyboard users. When a keyboard user needs to tab through the same link two or three times in a row they are _slowed down_ because their journey becomes literally 200% or 300% longer than it could/should be.

Depending on the post structure and anatomy, we can sometimes drastically improve the keyboard user experience with very little dev effort.

Last Fall, I had the opportunity to work on an upcoming redesign of an online publication. I was hired to build a brand new front-end foundation for the design. I put a lot of emphasis on making sure the new design is implemented as accessibly and inclusively as possible. So, naturally, I wanted to make sure the experience is optimized for keyboard users as well.

Being an online publication, it contains hundreds of articles, and those articles are displayed as a list of posts on the homepage and other pages of the site.

![A screenshot of three blog post entries with a structure similar to the one mentioned earlier.](https://www.sarasoueidan.com/assets/images/post-list.png)

There were more than a dozen article entries on the publication’s homepage. Each entry consisted of an image thumbnail (mostly decorational), a title, an author name, a description (without links), and a Read More link. This means that each entry contained three links to the full article page, and one link to the author’s page.

In the process of testing a component at the bottom of the homepage for accessibility, I realized that tabbing through the page to get to that component took longer than I would like it to, due to the large number of post entries on the page. Sure, this tabbing experience is the typical experience on any and all similar Web sites I’ve ever visited. But **just because it is the typical experience, doesn’t mean it can’t be improved upon.**

After a long discussion about usability and accessibility, I made a small addition to the markup that improves keyboard navigation **by reducing the number of tabbable links**. **The number of links does not change; the tabbability of a link does.** This means that a user navigating using a keyboard would only tab through one link to the full article page in each post instead of three, thus making the keyboard experience faster and more efficient overall.

The implementation is simple:

1.  Prevent a link from being tabbed by using `tabindex = "-1"`, and
2.  hide said link from screen readers using `aria-hidden = "true"`, because you don’t want a screen reader to expose a link the user won’t be able to interact with.

I applied this to the thumbnail images because they are not used to convey any particularly relevant information in an entry (they are more like decorational cover photos), and to the Read More links. Only the post title remains tabbable, as well as the link to the author page. So instead of having four tab stops in each entry, a user now has two. Thus tabbing through the long list of posts is going to be two times faster than what a typical experience would have been.

The markup for each article entry looked something like this:

```
<article class="post ...">    <a href="/path/to/full-article/" class="post__thumb" aria-hidden="true" tabindex="-1">        <!-- img thumbnail... -->    </a>    <div class="post__content">        <a href="/path/to/full-article/" class="post__title">            <h2 class="h3">Inspirational Website of the Week: Dean Bradshaw</h2>        </a>        <div class="post__excerpt">            <!-- ... -->        </div>       <a href="/path/to/full-article/" class="post__more-link" aria-hidden="true" tabindex="-1">            <svg aria-hidden="true" focusable="false" width="16" height="7" viewBox="0 0 16 7"><!-- ... --></svg>        </a>    </div></article>
```

The following are two live codepens that you can tab through using a keyboard to see the difference between the typical default experience and the experience with the skipped links:

See the Pen [Demo for blog post: Optimizing keyboard navigation using tabindex and ARIA](https://codepen.io/SaraSoueidan/pen/fff7257ab01a4627c02b500cb9b2db21) by Sara Soueidan ([@SaraSoueidan](https://codepen.io/SaraSoueidan)) on [CodePen](https://codepen.io/).

See the Pen [Demo for blog post: Optimizing keyboard navigation using tabindex and ARIA](https://codepen.io/SaraSoueidan/pen/7ed44ee6163a42500e2928b0cbe5c2cc) by Sara Soueidan ([@SaraSoueidan](https://codepen.io/SaraSoueidan)) on [CodePen](https://codepen.io/).

## One size does _not_ fit all.

Not all article listings are equal. In the examples above, there weren’t many links between each of the consecutive full article page links. In each of the examples, the post’s excerpt is short and does not contain any links, and there are no lists of tags following the post title and separating the title from the Read More link.

Depending on how you set up your CMS or SSG to generate excerpts, they could be generated as plain text or full markup. For example, on this blog, the excerpts are generated as plain text, so they don’t contain any links. On codrops, the excerpts aren’t really excerpts — they are custom descriptions of an article, so, by design, they also don’t contain any links. But not all post excerpts or descriptions come without links.

When there _are_ _several_ links between the title and the Read More link, it becomes _important_ for the user to be able to use the Read More link. To demonstrate, I recorded the process of tabbing through [Lea Verou’s Web site](https://lea.verou.me/), where she shows a longer post excerpt per entry and containing quite a few links in some cases.

Sorry, your browser doesn't support embedded videos.

Tabbing through a post entry on Lea Verou’s Web site. If the Continue Reading link were not there on Lea’s post, a keyboard user would need to tab all the way back to the title to visit the full article page. In such a case, a Read More link does provide value and should not be deactivated.

Because there are quite a few links after the post title in each entry, the _Continue Reading_ link in Lea’s posts is essential for the keyboard experience. The link is a shortcut to the full article’s page now; had it not been there, or had it been skipped, the user would need to tab all the way back up to the post title to visit the full article, which would have been nonsensical. This is an example of when you do _not_ want to use `tabindex` and ARIA to skip over a link because it would _worsen_ the user experience.

A few years back, I took a different approach to implementing post entries when I built [Smashing Magazine](https://smashingmagazine.com/)’s front-end foundation. The posts were designed to be “cards”, and cards come with their own implementation considerations that I documented in my [previous post about nested links](https://www.sarasoueidan.com/blog/nested-links/).

Each design comes with its own usability considerations that need to be taken into account. In order to improve an experience, you need test the design using a keyboard, and with real users if possible — they can usually provide a lot of insight that we designers/developers might miss.

## To sum up:

-   Not all your users use a mouse to navigate your pages.
-   The way you mark up your elements has a direct effect on how people interact with them.
-   Links are focusable by default, but it might make sense to skip certain links _if the design and user experience allows it_.
-   A good rule of thumb for similar cases is that **if you have multiple consecutive links to the same page, there is probably a chance to improve keyboard navigation by skipping some of those links to reduce the number of tab stops to one.** The less tab stops, the better, as long as it does not worsen or compromise on other aspects of usability.
-   There is no one rule fits all. One approach might work for a design but not for another.

And, once again: each design comes with its own challenges and considerations. Take those into account, weigh your options, test with real users, use a keyboard, and make optimizations when and where appropriate. **At the end of the day, it should always be about the _user_ experience.**

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.