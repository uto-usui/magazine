---
title: "Personal website redesign project post: A little progressive enhancement as a treat"
source: "https://piccalil.li/projects/personal-site/9/"
publishedDate: "2026-08-13"
category: "css"
feedName: "Piccalilli"
author: "Andy Bell"
---

* * *

For a long time, I’ve included [last.fm](https://last.fm/) and [Open Scrobbler](https://openscrobbler.com/) links on each music collection item’s detail page in some shape or form because those are pretty straightforward to render, but something I really wanted on this new website was provide more links for different platforms.

The more _my_ music collection helps people discover music _away_ from algorithmic recommendations, the better. A good way to do that is to provide as many links as possible to services that people use.

I’m using the open music encyclopaedia, [Music Brainz](https://musicbrainz.org/) to give me the links, rather than writing a convoluted script that attempts to do all that. I tried it once and I actually sat and cried at my computer, so I won’t be doing it again.

This approach is _simple_, which I like. It’s not going to surface as many links as I probably would like, but loads of people contribute to Music Brainz, so it’ll get better with time, probably.

[Advert![Save 20% on all courses using the code NEXTLEVEL.](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [A web component that talks to an API route](#a-web-component-that-talks-to-an-api-route)

At the time of writing, I have 491 items in my music collection. If I were to query Music Brainz’s API at build time, I would almost certainly be [rate limited](https://musicbrainz.org/doc/MusicBrainz_API/Rate_Limiting), so I had to get smart. As I see it, these links are a [progressive enhancement](https://piccalil.li/blog/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is/), so I built a web component to do that job for me. It means I only query the API per visit (unless cached), which will be a _much_ lower frequency than querying the API at build time.

Before the web component though, I needed to actually get the data and to avoid the inevitable CORS issues, so I opted to create an Astro API route, which does exactly what it says on the tin: give you the ability to have API routes that run alongside your usual pages.

_Before_ that though, in keeping with the structure of this project, if I’m getting data, _that_ code lives in a data “package” file, so let’s do that part first.

``import { getCache, setCache } from './memoryCache';  const platforms = {   'bandcamp.com': 'Bandcamp',   'deezer.com': 'Deezer',   'tidal.com': 'Tidal',   'qobuz.com/us-en': 'Qobuz',   'apple.com': 'Apple Music',   'youtube.com': 'YouTube',   'spotify.com': 'Spotify', };  // Simple function that'll match the platform in the above object // to the passed URL. If nothing that we want is found (there will be a lot) // we add a 'Filter out' platform name. That'll get caught later for us. function getPlatformName(url) {   const match = Object.keys(platforms).find((key) => url.includes(key));   return match ? platforms[match] : 'Filter out'; }  export async function getStreamingLinks(artist, album) {   // First thing to do is to check our cache to keep things   // speedy as hell   const cacheKey = `streamingLinks${artist}${album}`;   const cacheTimeout = 3600; // 3600 seconds -> 1 hour   const cached = getCache(cacheKey);    if (cached) {     return cached;   }    // Music Brainz API configuration   const userAgent = 'Andy Bell/1.0.0 ( [[email protected]](https://piccalil.li/cdn-cgi/l/email-protection) )';   const baseUrl = 'https://musicbrainz.org/ws/2';    try {     // First job is to extract a release group, which we can then grab the actual     // release data, which is where we get the links from     const searchRes = await fetch(       `${baseUrl}/release-group/?query=artist:"${artist}" AND releasegroup:"${album}"&fmt=json`,       { headers: { 'User-Agent': userAgent } }     );     const searchData = await searchRes.json();      if (!searchData['release-groups']?.length) {       throw new Error('No release group found');     }      // Grab the highest scoring release group by sorting, then taking the first item     const releaseGroup = searchData['release-groups'].sort((a, b) => b.score - a.score)[0];      // Now we have a release group, we can get that sweet release data from the     // `release` endpoint     const releaseQuery = await fetch(       `${baseUrl}/release?release-group=${releaseGroup.id}&inc=url-rels&fmt=json`,       { headers: { 'User-Agent': userAgent } }     );     const releaseQueryData = await releaseQuery.json();      // This gets used to merge relations that are nested, which is our next job     let allRelations = [];      // The release group might have its own relations, so grab them first     if (releaseGroup.relations) {       allRelations = [...releaseGroup.relations];     }      // Now, for each release in the query data, we need to find its relations     // and mush it into our existing relation data     releaseQueryData.releases.forEach((rel) => {       if (rel.relations) {         allRelations = [...allRelations, ...rel.relations];       }     });      // Next, define some relation types that we're interested in, to help with filtering     const streamingTypes = ['streaming music', 'purchase for download', 'free streaming'];      // Now it's filter time. First check against our streaming types,     // then map each item that's left against our platforms object,     // then filter out any items that were labelled as 'Filter out'     // because that means there was not a platform match     const links = allRelations       .filter((rel) => streamingTypes.includes(rel.type))       .map((rel) => ({         platform: getPlatformName(rel.url.resource),         url: rel.url.resource,       }))       .filter((rel) => rel.platform !== 'Filter out');      // Now we need to make sure we don't have duplicate links, so     // we use a Map to help with that     const uniqueLinksMap = new Map();     links.forEach((link) => {       if (!uniqueLinksMap.has(link.platform)) {         uniqueLinksMap.set(link.platform, link);       }     });      // Define a display order with the platform names defined at the top of this file     const platformOrder = Object.values(platforms);      // Lastly, convert the map back into an array, then sort by that platform order     const sortedLinks = Array.from(uniqueLinksMap.values()).sort((a, b) => {       return platformOrder.indexOf(a.platform) - platformOrder.indexOf(b.platform);     });      // Release those sweet links after sticking them in the cache     setCache(cacheKey, sortedLinks, cacheTimeout);     return sortedLinks;   } catch (err) {     console.error('API Error:', err);     return [];   } }``

Now, I’ll be the _first_ the say this is not optimal code. So be it; it’s a personal site and my priority is the end user experience. How the code works is first, I pass in the artist name and the album name as props, then pass those to Music Brainz’s [release group endpoint](https://musicbrainz.org/doc/Release_Group). If there is data from that query, I used that to query richer information that Music Brainz has stored for the album via their [release endpoint](https://musicbrainz.org/doc/Release).

`const streamingTypes = ['streaming music', 'purchase for download', 'free streaming'];`

I defined these types so I can filter in the next part, because releases can have absolutely _loads_ of stuff that probably isn’t relevant for my website. With that static data, I can filter through, check all the links are unique and then use the `platforms` object I defined right at the top to create a display order.

[Advert![Save 20% on all courses, using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [The API route](#the-api-route)

With the data system in place, it’s time to create an endpoint for my web component to talk to. Let’s have a look:

`import { getStreamingLinks } from '@repo/data/musicStreamingLinks';  export const prerender = false;  export async function GET(context) {   const { request } = context;   const url = new URL(request.url);    const origin = request.headers.get('origin');   const referer = request.headers.get('referer');    // Check if the request comes from the same origin   const isSameOrigin = origin === url.origin || (referer && referer.startsWith(url.origin));    if (!isSameOrigin) {     return new Response(JSON.stringify({ error: 'Forbidden' }), {       status: 403,       headers: { 'Content-Type': 'application/json' },     });   }    // Grab the artist and album from params then pass through to the streaming links method   const artist = url.searchParams.get('artist');   const album = url.searchParams.get('album');    const response = await getStreamingLinks(artist, album);    return new Response(JSON.stringify(response), {     headers: { 'Content-Type': 'application/json' },   }); }`

The first thing I’m doing here is pulling in the data “package” file that we just looked through, then immediately checking to see if this request came from the same origin. What this means is I only want to accept traffic from _my website_, rather than creating a public endpoint.

In normal circumstances I’d just let it slide, but in the age of LLM usage and so-called “agents”, I just can’t be bothered dealing with the bandwidth issues all of that brings. We deal with enough of that bullshit on this site!

With the same origin checks done, I can safely move on to grabbing the artist and album from query parameters and passing them over to my `getStreamingLinks` function. That function will always return _something_ the web component can deal with — at least an empty array — so nothing else is needed here.

## [The web component](#the-web-component)

Ok, now there’s data and a means to get that data from the front-end, it’s time to think about [progressive enhancement](https://piccalil.li/blog/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is/). We need an experience that works for people both when [JavaScript isn’t available](https://piccalil.li/blog/a-handful-of-reasons-javascript-wont-be-available/) and data isn’t available too.

In my mind, this means I needed to create a static HTML list containing two items I know will always available: the last.fm and Open Scrobbler links. With that existing markup — and if data is available via my endpoint — I _enhance_ that list to contain the other links. This progressive enhancement thing is easy, innit?

``--- const { artist, album } = Astro.props;  const encodedArtist = encodeURIComponent(artist); const encodedAlbum = encodeURIComponent(album);  const coreLinks = [   { platform: 'Last.fm', url: `https://www.last.fm/music/${encodedArtist}/${encodedAlbum}` },   {     platform: 'Open Scrobbler',     url: `https://openscrobbler.com/scrobble/album/view/${encodedArtist}/${encodedAlbum}`,   }, ]; ---  <album-platform-links artist={encodedArtist} album={encodedAlbum}>   <ul class="cluster" role="list" style="gap: 0 var(--space-s)">     {       coreLinks.map((link) => (         <li>           <a href={link.url}>{link.platform}</a>         </li>       ))     }   </ul> </album-platform-links>  <script>   class AlbumPlatformLinks extends HTMLElement {     constructor() {       super();     }      get artist() {       return this.getAttribute('artist') || '';     }      get album() {       return this.getAttribute('album') || '';     }      async connectedCallback() {       // Grab the data from our API       const query = await fetch(         `/api/music-streaming-links/?artist=${this.artist}&album=${this.album}`       );       const data = await query.json();        if (data.length) {         const parentListElement = this.querySelector('ul');          data.forEach((link) => {           const listElement = document.createElement('li');           const linkElement = document.createElement('a');            linkElement.href = link.url;           linkElement.innerText = link.platform;            listElement.appendChild(linkElement);           parentListElement.appendChild(listElement);         });       }     }   }    customElements.define('album-platform-links', AlbumPlatformLinks); </script>``

Right at the start, I’m defining those core static links. Both services helpfully allow me to encode the artist and album names and pass those through. Handy! With those in place, the default markup can be rendered, inside my yet to be defined `<album-platform-links>` custom element.

From there, I can write the web component JavaScript code. It’s a pretty straightforward script where I create some `get` methods to _get_ the artist and album names, which the `connectedCallback()` uses to run a `fetch` request to the API route we just covered.

If the route gives me anything other than an empty array, I know I’m good to render some more links **in my existing list**. I do that by first, grabbing the parent `<ul>` element and then for each item:

1.  Create a new list item with `document.createElement`
2.  Create a new link item with the same method
3.  Set the links `href` and `innerText` with the platform link and platform name
4.  Pop the link item in the list item with `appendChild`
5.  Pop the list item in the parent list, again with `appendChild`

_Job done_. I’ve now got a progressively enhanced method of helping people to discover music via my website!

[Advert![Save 20% on all of our courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Listing pages](#listing-pages)

I just want to very quickly touch listing pages, such as [vinyl](https://bell.bz/music-collection/vinyl/) and the [all time top 10 page](https://bell.bz/music-collection/vinyl/). I’m only touching on them quickly because they _will_ change in this rebuild. At this point I’m just recreating functionality that existed on the old version of my site.

For each of these listing pages, all I have to do is create an astro file in `apps/web/src/pages/music-collection`. They’re all near-enough identical too, so let me just show you one of them: the all time top 10 page.

`--- import { getCollection } from 'astro:content'; import MusicCollectionLayout from '../../layouts/MusicCollectionLayout.astro';  const content = {   meta: {     title: 'Music Collection - All time top 10',     summary: '',   },   socialImage: '',   allowRobots: true, };  let items = await getCollection('music-collection');  items = items   .filter((x) => x.data.topTenOrder)   .filter((x) => x.data.tags.includes('Top 10'))   .sort((a, b) => {     return a.data.topTenOrder - b.data.topTenOrder;   }); ---  <MusicCollectionLayout   title={content.meta.title}   summary={content.meta.summary}   socialImage={content.socialImage}   allowRobots={content.allowRobots}   items={items} />`

For each of these pages, I’m grabbing the same collection created in the last post. The only difference is the filtering each time, so for this page, I’m first looking for items that contain a `topTenOrder` front matter property and also checking to see if they have a `'Top 10'` tag. Complex eh? 🤣

Then after that, I’m sorting them by that `topTenOrder` property to make sure my favourite — [Thrice’s Artist in the Ambulance](https://bell.bz/music-collection/the-artist-in-the-ambulance/) — appears _first_. After that, it’s a case of passing some data to the `MusicCollectionLayout` — which we covered before — and _job done_.

Let’s put a pin in this now and move on to a little CLI tool I made for adding new items to the collection.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_