---
title: "Personal website redesign project post: Rendering AT protocol posts on my /feed"
source: "https://piccalil.li/projects/personal-site/7/"
publishedDate: "2026-07-02"
category: "css"
feedName: "Piccalilli"
author: "Andy Bell"
---

* * *

I’m again, going to be doing a lot of the same sort of work I did for the WordPress integration, but as this is the first iteration of the AT protocol, it’s going to be a lot simpler than that.

Just like with the WordPress integration, I used Astro’s pagination capabilities to build a paginated “feed” of posts, to satisfy the “Basic rendering of my AT protocol posts” part of the [core features I outlined at the beginning of this series](https://piccalil.li/projects/personal-site/2/#work-out-the-core-features).

![An Obsidian markdown file called "core features and iterations." It lists a development roadmap across four iterations, including tasks like "basic shell version of the site," "look and feel design," "AT protocol integration," and "last.fm integration."](https://piccalil.b-cdn.net/images/projects/personal-site-core-features.jpg?auto=format&w=1500)

Let’s get stuck into that bit first. I created a `pages/feed/[...page].astro` file and filled it with the following:

`--- import { fetchAllATPosts } from '@repo/data/atPosts';  import PageLayout from 'src/layouts/PageLayout.astro'; import Pagination from '@repo/ui/Pagination'; import ATPostsRegion from '@repo/ui/ATPostsRegion';  export async function getStaticPaths({ paginate }) {   const posts = await fetchAllATPosts();   return paginate(posts, { pageSize: 20 }); }  const { page } = Astro.props; ---  <PageLayout title="Feed" summary="" socialImage="" allowRobots={true}>   <ATPostsRegion posts={page.data} />   <Pagination previous={page.url.prev} next={page.url.next} /> </PageLayout>`

I’m getting all the posts with the functionality written in the [last article](https://piccalil.li/projects/personal-site/6), limiting them to 20 per page and then instructing Astro what pages need building with `getStaticPaths()`.

From there and for each page, I’ve got a `page` prop, which just like with the WordPress integration, I’m feeding to the `<Pagination>` component. I’m also feeding that data to the `<ATPostsRegion>` which I’ll break down next.

[Advert![Save 20% on all of our courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [The AT posts region](#the-at-posts-region)

I didn’t break down the `<PostsRegion>` in the WordPress section of this series because it is literally just a list of links, but this one is _slightly_ different, but albeit _simple_. We are in the early days of this rebuild after all!

`--- const { posts } = Astro.props;  import ATPost from '@repo/ui/ATPost'; ---  <div class="at-posts-region region">   <h1 class="visually-hidden">Feed</h1>   <div class="wrapper flow">     <p>ℹ️ Posts from my <a href="https://bsky.app/profile/bell.bz">Bluesky profile</a>.</p>     <ul class="at-posts-region__list" role="list">       {         posts.map((post) => (           <li class="flow">             <ATPost post={post} />           </li>         ))       }     </ul>   </div> </div>`

The main reason I wanted to tackle this region was because of that visually hidden `<h1>`. First here’s the page, at the time of writing.

![My feed page, looking very basic, showing posts in chronological order](https://piccalil.b-cdn.net/images/projects/bell-dot-bz-feed-page.jpg?auto=format&w=1500)

I didn’t want a big ol’ heading on this page (at least initially), but I _do_ need a top level heading, for assistive tech users, so my [ever-useful CSS utility](https://piccalil.li/blog/visually-hidden/) helps a tonne here.

The rest of this file is pretty self explanatory, so let’s dig into the component that renders each post.

`--- import {   formatDate,   convertATPrototocalURIToBlueskyURL, } from '@repo/utils/helpers';  import MarkdownText from '@repo/ui/MarkdownText';  const { post } = Astro.props; ---  <div class="at-post flow">   <MarkdownText content={post.content} className="flow" />   {     post.media.length       ? post.media.map((media) => (           <>             {media.type === 'image' && <img src={media.src} alt={media.alt} />}              {/* Like images, but this is specifically an open graph image */}             {media.type === 'external' && media.thumb && (               <p>                 <a href={media.uri}>                   <img src={media.thumb} alt={media.title} />                 </a>               </p>             )}              {media.type === 'video' && (               <video width="352" height="198" controls poster={media.thumbnail}>                 <source src={media.playlist} type="application/x-mpegURL" />               </video>             )}           </>         ))       : null   }    <p class="at-post__meta">     <time datetime={post.date}>{formatDate(post.date, true)}</time>   </p>    <dl class="at-post__stats cluster">     <dt>Likes</dt>     <dd>{post.likes}</dd>     <dt>Reposts</dt>     <dd>{post.reposts}</dd>     <dt>Replies</dt>     <dd>{post.replies}</dd>   </dl>    <p class="at-post__original-link">     <a href={convertATPrototocalURIToBlueskyURL(post.uri)}>Original</a>   </p> </div>`

The first thing I do here is render the markdown text, generated in the [last article](https://piccalil.li/projects/personal-site/6), with my existing component. With the easy part done, I swiftly move on to looping over the `post.media` array and rendering appropriate markdown per embed type.

Following that, the post’s date is rendered with the `<time>` element with like, repost and reply count rightly using a description list (`<dl>`) element to articulate the data appropriately.

The last part is a link out to Bluesky, which I’ll bring in to show you:

``/**  * Converts an AT Protocol URI to a Bluesky Web URL  * @param {string} atUri - The at:// uri (e.g., at://did:plc.../app.bsky.feed.post/...)  * @returns {string} The formatted bsky.app URL  */ export function convertATPrototocalURIToBlueskyURL(uri) {   // Pattern: at://(DID)/(COLLECTION)/(RKEY)   const regex = /^at:\/\/(did:[^/]+)\/app\.bsky\.feed\.post\/([^/]+)$/;   const match = uri.match(regex);    if (!match) {     return 'Invalid AT Protocol post URI';   }    // Matches are in order because of array destructuring, so we use `_` to capture the un-needed part   const [_, did, rkey] = match;   return `https://bsky.app/profile/${did}/post/${rkey}`; }``

The aim of the game with this utility is to first match the parts of an AT protocol URI, then use those parts to return a web URL. Because every record in your Personal Data Server (PDS) has a `DID` (user ID) and `rkey`, it’s a case of applying those URL parts and Bluesky does the rest. Handy.

[Advert![Save 20% on all the courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Wrapping up](#wrapping-up)

That’s it! The AT protocol stuff looks incredibly complicated on the surface, but once you understand how PDS records work, it’s a really elegant, straightforward system.

There will be a full AT protocol focused iteration of this website, once I’ve designed and implemented the new UI, so this stuff serves as a basic basis to build on. Hopefully it’ll make the idea of implementing the AT protocol on _your_ website more appealing too.

With AT protocol done, let’s move on to my favourite part: the music collection, next.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_