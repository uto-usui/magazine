---
title: "Personal website redesign project post: Loading AT protocol posts data"
source: "https://piccalil.li/projects/personal-site/6/"
publishedDate: "2026-07-01"
category: "css"
feedName: "Piccalilli"
author: "Andy Bell"
---

* * *

We’re picking up some good momentum, so let’s keep the flow going. After [integrating WordPress to power the blog section](https://piccalil.li/projects/personal-site/4/), it’s now time to integrate a new feature of this website: AT Protocol posts.

I _could_ go all in at this point and integrate posts, comments, interactions and comments on blog posts, but I’m not in the business of doing that until I _fully understand what I’m doing_. Throwing code at the wall to see what sticks is a one way high speed train to technical debt city.

What I’m doing instead is what I outlined in planning, specifically where I worked out [each iteration](https://piccalil.li/projects/personal-site/2/#work-out-the-core-features). Here it is as a reminder:

![An Obsidian markdown file called "core features and iterations." It lists a development roadmap across four iterations, including tasks like "basic shell version of the site," "look and feel design," "AT protocol integration," and "last.fm integration."](https://piccalil.b-cdn.net/images/projects/personal-site-core-features.jpg?auto=format&w=1500)

As per that planning, I’m still in **iteration one**, which means this phase of AT protocol integration is going to be a basic rendering of my AT protocol posts.

I say AT protocol and not _Bluesky_ posts because it’s worth remembering that Bluesky is the microblogging _app_ built on the protocol. My data (posts) is outside of that platform, on my Personal Data Server (PDS). Right now, at the time of writing, that PDS is on Bluesky’s infrastructure, but I _will_ definitely be moving that to something I own, for sure.

[Advert![JavaScript for Everyone. Truly understand how JavaScript works. Available now. ](https://piccalil.b-cdn.net/images/ads/js4e-ad-landscape-post-launch-discount-experiment.png?format=webp)](https://piccalil.li/javascript-for-everyone?utm_source=piccalilli&utm_medium=author-promo)

## [Rendering the posts](#rendering-the-posts)

In order to do this, I need create a new file in my `data` package — just like I did for the WordPress posts — and lean into the AT Protocol API, using their [official package](https://npmx.dev/package/@atproto/api).

Here’s the file in whole. I’ll break down the important bits:

``import { AtpAgent, RichText } from '@atproto/api'; import { getCache, setCache } from './memoryCache';  const agent = new AtpAgent({   service: 'https://bsky.social', });  export async function fetchAllATPosts() {   const targetHandle = 'bell.bz';   const cacheKey = 'atPosts';   const cacheTimeout = 3600; // 3600 seconds is 1 hour   const cached = getCache(cacheKey);    if (cached) {     return cached;   }    // Authentication is required   await agent.login({     identifier: targetHandle,     password: process.env.BLUESKY_APP_PASSWORD,   });    let allPosts = [];   let cursor = undefined;    try {     while (true) {       // Fetch this cursor from the feed of items       const response = await agent.getAuthorFeed({         actor: targetHandle,         cursor: cursor,         limit: 100, // Max limit per cursor          // For now, I'm just doing root level posts. Maybe as this   evolves I'll bring in replies too.         filter: 'posts_no_replies',       });        // Loop each item but filter out reposts and quote posts       for (const item of response.data.feed.filter(         (x) =>           !(             x?.reason?.$type === 'app.bsky.feed.defs#reasonRepost' ||             x.post.embed?.$type === 'app.bsky.embed.record#view' ||             x.post.embed?.$type === 'app.bsky.embed.recordWithMedia#view'           )       )) {         const post = item.post;         const parser = new RichText({ text: post.record.text || '' });          await parser.detectFacets(agent);          let postMarkdown = '';         const externalEmbed = post.embed?.external || post.record.embed?.external;          for (const segment of parser.segments()) {           if (segment.isLink()) {             let uri = segment.link?.uri;             let linkText = segment.text;              // Check if this link matches the external embed link             // We compare URIs (or check if the embed exists) to get the full version             if (               externalEmbed &&               (uri?.includes('..') ||                 (externalEmbed && (uri?.includes('…') || uri === externalEmbed.uri)))             ) {               uri = externalEmbed.uri;               linkText = externalEmbed.uri;             }              postMarkdown += `[${linkText}](${uri})`;           } else if (segment.isMention()) {             postMarkdown += `[${segment.text}](https://bsky.app/profile/${segment.text.replace('@', '')})`;           } else {             postMarkdown += segment.text;           }         }          // Create a sensible return object type         const postData = {           uri: post.uri,           cid: post.cid,           content: postMarkdown,           date: post.record.createdAt,           likes: post.likeCount,           reposts: (post.repostCount || 0) + (post.quoteCount || 0),           replies: post.replyCount,           media: [],         };          if (post.embed) {                    // If there are images, add to the return object           if (post.embed.$type === 'app.bsky.embed.images#view') {             postData.media = post.embed.images.map((img) => ({               type: 'image',               src: img.fullsize,               alt: img.alt,               thumb: img.thumb,             }));           }            // If there are open graph images, surface those           else if (post.embed.$type === 'app.bsky.embed.external#view') {             postData.media.push({               type: 'external',               uri: post.embed.external.uri,               title: post.embed.external.title,               description: post.embed.external.description,               thumb: post.embed.external.thumb,             });           }            // If there are videos, add to the return object           else if (post.embed.$type === 'app.bsky.embed.video#view') {             postData.media.push({               type: 'video',               playlist: post.embed.playlist, // HLS stream (.m3u8)               thumbnail: post.embed.thumbnail,               cid: post.embed.cid,             });           }         }          allPosts.push(postData);       }        // Set the next cursor and break the loop if we're at the end       cursor = response.data.cursor;       if (!cursor) break;     }      // Cache so it doesn't take forever to work on this locally     setCache(cacheKey, allPosts, cacheTimeout);     return allPosts;   } catch (error) {     console.error('Error fetching feed:', error);   } }``

That’s a _lot_ of code in one block. Let’s break it down into chunks.

### The breakdown

`import { AtpAgent, RichText } from '@atproto/api'; import { getCache, setCache } from './memoryCache';  const agent = new AtpAgent({   service: 'https://bsky.social', });`

The first thing we do is set up dependencies: the agent (not one of _those_ ones) which interfaces with the protocol for us and rich text capabilities that are used to tidy up content. The `memoryCache` parts are the [same as when I integrated the WordPress content](https://piccalil.li/projects/personal-site/4/#lets-add-a-web-page).

`const targetHandle = 'bell.bz'; const cacheKey = 'atPosts'; const cacheTimeout = 3600; // 3600 seconds is 1 hour const cached = getCache(cacheKey);  if (cached) {   return cached; }  // Authentication is required await agent.login({   identifier: targetHandle,   password: process.env.BLUESKY_APP_PASSWORD, });`

Here, I’m setting the target handle, the key for our memory cache and how long I want data to be cached for. I opted for an hour because I tend to work in short cycles when coding.

Next up, I attempt to load data from cache _first_, then check it. If there is data in cache, I can return it and move on. If not, the first thing to do is to get the agent to log in.

Next Step

For the next part, we’re going to be _within_ the `while` loop.

`const response = await agent.getAuthorFeed({   actor: targetHandle,   cursor: cursor,   limit: 100, // Max limit per cursor    // For now, I'm just doing root level posts. Maybe as this evolves I'll   // bring in replies too.   filter: 'posts_no_replies', });`

I have posted _a lot_ on Bluesky so right off the bat, I need to use cursors to paginate over multiple chunks of posts. That’s fine, because I’m keeping a track of it with the `cursor` variable. Eventually that `cursor` will be null, which in turn will break the `while` loop. Lovely stuff.

The only other bit to touch on is I’m getting only top level posts, not my replies. I’m not much of a _reply guy_, but I still don’t want out of context posts on the feed because it’s just _noise_.

`for (const item of response.data.feed.filter(   (x) =>     !(       x?.reason?.$type === 'app.bsky.feed.defs#reasonRepost' ||       x.post.embed?.$type === 'app.bsky.embed.record#view' ||       x.post.embed?.$type === 'app.bsky.embed.recordWithMedia#view'     ) )) {`

The data returned, for each page of data, has a `feed` array that I can now loop over. I do another pass at filtering here. Each line deals with:

1.  Reposts, which are classified as posts and I don’t want posts _I_ haven’t written showing up in the feed
2.  Quote posts, which I don’t want to deal with _yet_
3.  Quote posts: same as #2, but with media by the _quoter_

``const post = item.post; const parser = new RichText({ text: post.record.text || '' });  await parser.detectFacets(agent);  let postMarkdown = ''; const externalEmbed = post.embed?.external || post.record.embed?.external;  for (const segment of parser.segments()) {   if (segment.isLink()) {     let uri = segment.link?.uri;     let linkText = segment.text;      // Check if this link matches the external embed link     // We compare URIs (or check if the embed exists) to get the full version     if (       externalEmbed &&       (uri?.includes('..') ||         (externalEmbed && (uri?.includes('…') || uri === externalEmbed.uri)))     ) {       uri = externalEmbed.uri;       linkText = externalEmbed.uri;     }      postMarkdown += `[${linkText}](${uri})`;   } else if (segment.isMention()) {     postMarkdown += `[${segment.text}](https://bsky.app/profile/${segment.text.replace('@', '')})`;   } else {     postMarkdown += segment.text;   } }``

[Advert![Mindful Design. Learn to design for real humans. Available now](https://piccalil.b-cdn.net/images/ads/md-ad-landscape-post-launch.jpg?format=webp)](https://piccalil.li/mindful-design?utm_source=piccalilli&utm_medium=graphical-ad)

The aim of the game at this point is to generate a front-end friendly string of markdown that my existing infrastructure can deal with. In order to do that, I need to break down the `post.record.text` with the `RichText` utility, supplied by the `@atproto/api` package.

I can now loop over each segment of content and determine exactly what it _is_. For example, I check first to see if there’s an `externalEmbed` — AKA a link — and build a markdown link string accordingly. If it’s a mention, I create a nice link to that user’s profile and finally if it’s neither of those, I append raw text value to the markdown string.

`const postData = {   uri: post.uri,   cid: post.cid,   content: postMarkdown,   date: post.record.createdAt,   likes: post.likeCount,   reposts: (post.repostCount || 0) + (post.quoteCount || 0),   replies: post.replyCount,   media: [], };`

The most self explaining chunk of code here: I’m creating a nice flat return object structure that matches the front-end components.

`if (post.embed) {   // If there are images, add to the return object   if (post.embed.$type === 'app.bsky.embed.images#view') {     postData.media = post.embed.images.map((img) => ({       type: 'image',       src: img.fullsize,       alt: img.alt,       thumb: img.thumb,     }));   }    // If there are open graph images, surface those   else if (post.embed.$type === 'app.bsky.embed.external#view') {     postData.media.push({       type: 'external',       uri: post.embed.external.uri,       title: post.embed.external.title,       description: post.embed.external.description,       thumb: post.embed.external.thumb,     });   }    // If there are videos, add to the return object   else if (post.embed.$type === 'app.bsky.embed.video#view') {     postData.media.push({       type: 'video',       playlist: post.embed.playlist, // HLS stream (.m3u8)       thumbnail: post.embed.thumbnail,       cid: post.embed.cid,     });   } }  allPosts.push(postData);`

Now, the last bit of _data massaging_ is left for this iteration. I’m checking over a couple of cases to render images or video depending on what embed content I’ve got to work with. Again, this is all about creating flat (as possible) structures for the front-end components to consume.

After all of that, I push that post into the higher level array, which we’ll cache and return.

## [Wrapping up](#wrapping-up)

That’s the data sorted, so the next thing to do is wire it up to the website itself. I’ll tackle that in the next one!

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_

[Advert![Complete CSS. Take your CSS skills beyond the next level. Available now!](https://piccalil.b-cdn.net/images/ads/complete-css-ad-landscape-free-lessons.png?format=webp)](https://piccalil.li/complete-css/lessons/3?utm_source=piccalilli&utm_medium=graphical-ad)