---
title: "Personal website redesign project post: Getting started with implementing my music collection"
source: "https://piccalil.li/projects/personal-site/8/"
publishedDate: "2026-07-30"
category: "css"
feedName: "Piccalilli"
author: "Andy Bell"
---

* * *

We’re getting close to the last part of iteration one — the skeletal build of the site. Good! I’m getting eager to get on with the design work now. For some reason, doing this series (along with being busy in general) has stifled my ability to think _creatively_ about my site. I guess I need to get all the non-technical stuff published to let my brain fully switch. Brains are weird, man.

Anyway, we’ve got one more bit of content _plumbing_ to do and in my eyes, this is the most important part of the website: [the music collection](https://bell.bz/music-collection/). I hold an immense amount of pride in the collection I’ve built over the last half a decade or so. As on my old personal site, it takes pride of place in the overall system.

I feel like this part of the website opens up a lot of creative opportunities as time goes on too. I tend to be extremely _reserved_ with longform prose content because readability is _everything_, so with the music collection, I’ll be able to let my hair down a bit. To be able to do that, we need a _\[points mic to the crowd\]_ **solid base**.

[Advert![Save 20% on all courses using the code NEXTLEVEL.](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Markdown and front matter](#markdown-and-front-matter)

We’re now on _three_ different content sources. You might think I’m mad, but let me explain the decision making process for a second. One thing I know to be true is that I won’t keep my blog on WordPress in the long term. It’s a platform that’s served me well over the last _\[checks notes\]_ 18 years, but I want to look forward to other technologies.

The technology I’m very keen to keep evolving is the [AT protocol](https://atproto.com/). As I see it, all of my content could be managed by my [Personal Data Server (PDS)](https://piccalil.li/blog/publishing-on-the-atmosphere-with-standardsite/#understanding-the-at-protocol), including the blog _and_ the music collection. I just think the protocol needs more time and evolution before I look into that, so having content fragmentation for now feels fine. It’s the sort of compromise [we](https://set.studio/) make with clients over and over again.

This is _why_ I’ve chosen markdown and front matter for the music collection. It’s how it’s been powered for a few years now already, so moving content from Eleventy to Astro was a case of replacing `date` with `pubDate` and job _done_. With [Astro Content Collections](https://docs.astro.build/en/reference/modules/astro-content/), getting that data _out_ and moved to my PDS will be extremely simple with a one-off script. With all that in mind, we’re on a solid foundation.

## [Setting up the content collection](#setting-up-the-content-collection)

I’m back in the [web “app” of the monorepo](https://piccalil.li/projects/personal-site/4/#our-starting-point) at this point and the first thing to do is configure the content collection. In short, I’m letting Astro know that there’s a `music-collection` _collection_, how that collection should be structured, and where to find the content itself.

Astro, by default, will presume that your content lives in `src/content/${collectionSubdirectory}`, so we only need to specify the subdirectory itself:

`import { z, defineCollection } from 'astro:content';  const musicCollection = defineCollection({   type: 'content',   schema: z.object({     title: z.string(),     artist: z.string(),     cover: z.string(),     pubDate: z.date(),     formats: z.array(z.string()).optional(),     tags: z.array(z.string()),     topTenOrder: z.number().optional(),   }), });  export const collections = {   'music-collection': musicCollection, };`

That’s it! I now have a collection that I can reference in a template, so let’s start working on that. The first thing that’s needed though is a layout, specifically for the music collection. There’s a couple of reasons for this:

1.  I want to enable wide-scale, but consistent, UI differences between the music collection and the rest of the site, which will likely need unique layout structures. This will be simpler if every part of the collection is based off a unified base template
2.  I can render a music collection-specific navigation etc. while keeping it contained

[Advert![Save 20% on all courses, using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Building out the base layout, components and regions](#building-out-the-base-layout-components-and-regions)

The base layout — `MusicCollectionLayout.astro` — looks like this:

``--- import BaseLayout from './BaseLayout.astro'; const { title, summary, socialImage, allowRobots, items, item } = Astro.props;  import MusicItemDetail from '@repo/ui/MusicItemDetail'; import MusicCardsRegion from '@repo/ui/MusicCardsRegion'; import MusicNavigation from '@repo/ui/MusicNavigation'; ---  <BaseLayout title={title} summary={summary} socialImage={socialImage} allowRobots={allowRobots}>   {!item && <h1 class="visually-hidden">{title}</h1>}   <div class="music-collection wrapper region">     <div class="sidebar">       <div class="flow-space-m">         <MusicNavigation />       </div>       <div>         {item && <MusicItemDetail item={item} />}         <MusicCardsRegion           items={items}           heading={item ? `Random items from the collection` : null}         />       </div>     </div>   </div> </BaseLayout>``

Pretty straightforward, eh? I’m pulling in a collection of props — which we’ll see in more detail in a moment — that allows this layout to work out the following: “Am I rendering a single item from the collection or a feed of items?”

Those two states determine if we render `<MusicItemDetail>` or not. The music cards are always present, but if there is an `item` present, there’s a presumption that they are random items, so the heading is set accordingly.

Let’s break down those components and regions while we’re here. First up, the shared navigation.

``--- import { getCollection } from 'astro:content'; import Navigation from '@repo/ui/Navigation';  const musicCollectionItems = await getCollection('music-collection');  const navigationBaseItems = [   {     text: 'All',     url: '/music-collection/',   },   {     text: 'Vinyl',     url: '/music-collection/vinyl/',   },   {     text: 'CD',     url: '/music-collection/cd/',   },   {     text: 'Digital',     url: '/music-collection/digital/',   },   {     text: 'Masterpieces',     url: '/music-collection/masterpieces/',   },   {     text: 'All time top 10',     url: '/music-collection/top-10/',   },   {     text: 'Shuffled',     url: '/music-collection/shuffled/',   }, ];  const getNavigationItemLabelCount = (text) => {   switch (text) {     case 'All':     case 'Shuffled':       return musicCollectionItems.length;     case 'Vinyl':       return musicCollectionItems.filter((x) => x.data.formats.includes('Vinyl')).length;     case 'CD':       return musicCollectionItems.filter((x) => x.data.formats.includes('CD')).length;     case 'Digital':       return musicCollectionItems.filter((x) => x.data?.formats.includes('Digital')).length;     case 'Masterpieces':       return musicCollectionItems.filter((x) => x.data?.tags.includes('Masterpiece')).length;     case 'All time top 10':       return musicCollectionItems.filter((x) => x.data?.tags.includes('Top 10')).length;   } };  const navigation = navigationBaseItems.map(({ text, url }) => ({   text: `${text} (${getNavigationItemLabelCount(text)})`,   url, })); ---  <Navigation links={navigation} ariaLabel="Music" listClass="flow" />``

It’s not pretty! But it works. I’m sure there’s some clever stuff to generate the labels with a count on each one with an array reducer (or whatever), but I’ll take an easy to digest `switch` statement [over a reducer](https://xcancel.com/jaffathecake/status/1213077702300852224) _any day_.

The idea of this component is to have a central place that first defines the navigation structure — static data is fine because I’ll likely never need to change it — and modify each label with a count before passing off to the existing `<Navigation>` component. Let’s move on!

``--- import MusicItemCard from '@repo/ui/MusicItemCard';  const { items, heading } = Astro.props; ---  <div class={`music-cards-region flow flow-space-l ${heading ? 'region' : ''}`}>   {     heading && (       <>         <hr />         <h2>{heading}</h2>       </>     )   }   <div>     <ul class="grid" role="list" data-layout="thirds">       {         items.map((item) => (           <li>             <MusicItemCard item={item} />           </li>         ))       }     </ul>   </div> </div>``

This is `<MusicCardsRegion>` in all of its — um — glory, I guess. I’m doing a skeletal build in this iteration, so what else would you expect? The only thing to touch on is that this region has an optional heading. If there is a heading, I’m (for now), sticking a `<hr />` element ahead of it to create a bit of separation, in lieu of an actual UI. I _am_ doing a bit of visual though: only adding the `region` CSS utility if there is a heading, meaning vertical padding will be applied.

Let’s dig into the `<MusicItemCard>` component:

``--- const { item } = Astro.props; ---  <div class="music-item-card text-step-0">   <a href={`/music-collection/${item.slug}/`} class="flow flow-space-2xs">     <img       src={`/images/music-collection/${item.data.cover}`}       alt={`${item.data.title} cover`}       loading="lazy"     />   </a>   <p>     <strong>{item.data.title}</strong>   </p>   <p>{item.data.artist}</p> </div>``

I think one thing that should be apparent at this point in the series is that I like to work in small, simple pieces. It works _exceptionally_ well for client work, regardless of complexity, so it’s gonna work very well for my personal site too.

![The music items on my site, in this instance, forming the Vinyl collection's grid of items](https://piccalil.b-cdn.net/images/projects/music-item-cards.jpg?auto=format&w=1500)

This component is the most represented in this music collection section of the website. It’s on every single page! Still, it’s simple and it’ll stay (mostly) that way, even when I build the proper UI.

Let’s do the last region: `<MusicItemDetail>`.

``--- import { formatDate, generateSlug } from '@repo/utils/helpers';  import AlbumPlatformLinks from '@repo/ui/AlbumPlatformLinks';  const { item } = Astro.props; ---  <div class="music-item-detail">   <div class="sidebar">     <div>       <img src={`/images/music-collection/${item.data.cover}`} alt={`${item.data.title} cover`} />     </div>     <div class="flow">       <h1>{item.data.title}</h1>       <div class="flow">         <div class="overflow">           <table>             <tr>               {/* Catch this in the build. I was being lazy */}               <th width="30%">Artist</th>               <td>{item.data.artist}</td>             </tr>             <tr>               <th>Formats</th>               <td>                 <ul role="list" class="cluster">                   {                     item.data.formats.map((format) => (                       <li>                         <a href={`/music-collection/${generateSlug(format)}/`}>{format}</a>                       </li>                     ))                   }                 </ul>               </td>             </tr>             <tr>               <th>Added on</th>               <td>{formatDate(item.data.pubDate)}</td>             </tr>             <tr>               <th>Links</th>               <td><AlbumPlatformLinks artist={item.data.artist} album={item.data.title} /></td>             </tr>           </table>         </div>       </div>     </div>   </div> </div>``

[Advert![Save 20% on all of our courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

Again, this one is quite straightforward. Tabular data is actually a very sound way to render this stuff and I’ll likely keep that. The only part to really touch on here is that for each format, I’m linking out to a page that filters the collection. For example, there’s a filter page, just for vinyl records.

We’ll cover that in later in series. Because this post is getting quite _long_ now. We’ve covered a lot of the core infrastructure of this section of the website, but there’s considerably more to come.

Next time, we’ll look at a handy little web component I built for rendering links so different streaming and purchasing platforms for each album. It’s a fun one.

See you then!

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_