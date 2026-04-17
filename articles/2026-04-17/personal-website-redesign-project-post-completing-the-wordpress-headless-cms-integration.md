---
title: "Personal website redesign project post: Completing the WordPress headless CMS integration"
source: "https://piccalil.li/projects/personal-site/5/?ref=main-rss-feed"
publishedDate: "2026-04-16"
category: "css"
feedName: "Piccalilli"
author: "Andy Bell"
---

* * *

Let’s work out what I need to account for here by referring back to our existing page audit.

![A Penpot file that has every page type from my existing site mapped out next to each other in labelled sections](https://piccalil.b-cdn.net/images/projects/penpot-page-audit.jpg?auto=format&w=1500)

I need to account for the following:

1.  Post listings, limited by a defined items per page
2.  Pagination to render each page of post listings
3.  The actual blog items themselves

With those, I’d consider this base implementation done, which is where I want to be in this iteration.

`--- const { next, previous } = Astro.props; ---  {   (previous || next) && (     <div class="wrapper">       <nav class="repel" aria-label="Pagination links">         {previous ? <a href={previous}>Newer posts</a> : <>&nbsp;</>}         {next && <a href={next}>Older posts</a>}       </nav>     </div>   ) }`

I’ve used a `<nav>` here, so it needs an appropriate label: “Pagination links”. The logic is quite straightforward here:

1.  Attempt to grab `next` and `previous` props, which are URLs
2.  Test if _either_ `next` or `previous` have anything for us
3.  If so, we’re safe to render any wrapping markup because there will be at least one link
4.  If `previous` is good to go, render the link, if not render a [non-breaking space](https://en.wikipedia.org/wiki/Non-breaking_space) (I’ll explain in a moment)
5.  If `next` is good to go, render the link

The `repel` CSS class is a composable layout, which is part of our CSS system, that pushes items away from each other on the inline axis where there’s available space. If there’s not enough space available, the elements stack vertically, with configurable space.

The reason there’s a non-breaking space is if there’s no `previous` link, we still want to push the “_Older posts_” link out to the right. You might see a hack here but I see it as using the tools the browser gives us to keep everything simple.

[Advert![Save 20% on all courses using the code NEXTLEVEL.](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Rigging up the paginated blog index](#rigging-up-the-paginated-blog-index)

All the parts are ready now, so I can wire it up and move on to the next thing.

Astro comes with [handy pre-baked pagination functionality](https://docs.astro.build/en/reference/routing-reference/#paginate) so all I need to do here is let the system know what pages I need building. This is done with a `[...page].astro` file, [which tells Astro to use rest parameters for this dynamic route](https://docs.astro.build/en/reference/routing-reference/#params).

`--- import { fetchAllWordPressPosts } from '@repo/data/wordPressData'; import PageLayout from 'src/layouts/PageLayout.astro'; import PostListRegion from '@repo/ui/PostListRegion'; import Pagination from '@repo/ui/Pagination';  export async function getStaticPaths({ paginate }) {   const posts = await fetchAllWordPressPosts();   return paginate(posts, { pageSize: 10 }); }  const { page } = Astro.props; ---  <PageLayout title="Blog" summary="" socialImage="" allowRobots={true}>   <PostListRegion posts={page.data} />   <Pagination previous={page.url.prev} next={page.url.next} /> </PageLayout>`

This is it. It’s all we need to have a paginated blog index. The perks of building in small parts, eh?

Let’s just zoom in on this part:

`export async function getStaticPaths({ paginate }) {   const posts = await fetchAllWordPressPosts();   return paginate(posts, { pageSize: 10 }); }  const { page } = Astro.props;`

My website is going to be 99% statically generated, which means the output is HTML pages in directories. In order for Astro to render these pages, it needs to know about them. To do that, we need to return paths (AKA relative URLs) to the system, using the `getStaticPaths` function.

Using a [destructuring assignment](https://css-tricks.com/javascript-for-everyone-destructuring/) we can pull out the `paginate` function from the available arguments. We then use that to paginate `posts` — which is our familiar `fetchAllWordPressPosts()` data — limiting each page to 10 items. Paginate then supplies each path, which results in pages, like [this one on the live website](https://bell.bz/blog/page/2/).

[Advert![Save 20% on all of our courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Blog post items](#blog-post-items)

We’ve got the means to navigate around the blog now, but not the means to actually read the posts. Let’s fix that with another simple astro file.

`--- import { fetchAllWordPressPosts } from '@repo/data/wordPressData'; import { stripHTML, decodeHTMLEntities } from '../utils/helpers'; import PageLayout from 'src/layouts/PageLayout.astro'; import PostRegion from '@repo/ui/PostRegion';  export async function getStaticPaths() {   const posts = await fetchAllWordPressPosts();   return posts.map((entry) => ({     params: { slug: entry.slug },     props: { entry },   })); }  const { entry } = Astro.props; ---  <PageLayout   title={decodeHTMLEntities(entry.title.rendered)}   summary={decodeHTMLEntities(stripHTML(entry.excerpt.rendered))}   socialImage={entry?.jetpack_featured_media_url}   allowRobots={true} >   <PostRegion     title={decodeHTMLEntities(entry.title.rendered)}     date={entry.date}     content={entry.content.rendered}   /> </PageLayout>`

This is all very familiar, right? Fundamentally, there’s not much difference going on here than in the paginated blog index file. Instead of paginating the WordPress data, we’re rendering a page for each blog post and passing the data into other components to do the rendering for us.

[Advert![Save 20% on all the courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

### Cleaning up content

Let’s just take a look at a couple of helper functions which might have caught your attention `decodeHTMLEntities()` and `stripHTML()`. Unfortunately, there’s quite a lot of _crap_ when it comes to WordPress content, especially over the API.

`export function decodeHTMLEntities(input) {   return input.replace(/&#(\d+);/g, (match, dec) => {     return String.fromCharCode(dec);   }); }`

This function grabs the unicode number from each encoded match then replaces the encoded part with a proper, readable character. It’s mainly titles and summaries where this applies because WordPress does some weird stuff with those.

`export function stripHTML(input) {   return input.replace(/<[^>]*>?/gm, ''); }`

This is the Ronseal of JavaScript functions: [it does exactly what it says on the tin](https://www.youtube.com/watch?v=tqNQDRQv1kI). It takes a string of HTML and returns back plain text.

I used this function in conjunction with `decodeHTMLEntities()` because `entry.excerpt.rendered` is both HTML and riddled with HTML entities — both of which I don’t want.

There’s no need to clean up `entry.content.rendered` because we _do_ want the HTML for that. I’m using Astro’s `set:html` in that context again, in the `<PostRegion />`, which accounts for any nasties for me.

Here we have it, the paginated index: ![A very rough looking list of blog post links, with newer and older pagination links](https://piccalil.b-cdn.net/images/projects/personal-site-paginated-posts.jpg?auto=format&w=1500)

And here’s an item: ![A very rough looking blog post, rendered as simple HTML](https://piccalil.b-cdn.net/images/projects/personal-site-basic-blog-post.jpg?auto=format&w=1500)

Looks pretty bland! But that’s fine, we’ll come to that later.

It’s all about [AT protocol](https://atproto.com/)/Bluesky integration now, while I’m already in the mood to integrate 3rd party stuff.

See you in the next one!

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_

[Advert![Build better with CodePen 2.0, now in beta](https://piccalil.b-cdn.net/images/ads/codepen-landscape.jpg?format=webp)](https://codepen.io/beta?utm_medium=graphical-closing-ad&utm_source=piccalilli)