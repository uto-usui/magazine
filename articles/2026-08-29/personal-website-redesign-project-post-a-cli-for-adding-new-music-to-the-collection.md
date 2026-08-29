---
title: "Personal website redesign project post: A CLI for adding new music to the collection "
source: "https://piccalil.li/projects/personal-site/10/"
publishedDate: "2026-08-27"
category: "css"
feedName: "Piccalilli"
author: "Andy Bell"
---

* * *

Right, we are at the end of _iteration one_.

![An Obsidian markdown file called "core features and iterations." It lists a development roadmap across four iterations, including tasks like "basic shell version of the site," "look and feel design," "AT protocol integration," and "last.fm integration."](https://piccalil.b-cdn.net/images/projects/personal-site-core-features.jpg?auto=format&w=1500)

The last thing to do is to make my life a little easier. Markdown files work perfectly fine for the music collection, but they’re a bit of a _faff_. Mostly because I _always_ forget the front matter structure, so to fix that, I created myself a Command Line Interface (CLI) which is a series of questions, resulting in a new item being added to the collection.

I add _a lot_ of music to my collection because I’m truly trying to get away from streaming platforms completely, so something that makes the process of keeping it up to date _simple_ is very much needed.

Let’s break down the tool I built, piece-by-piece.

`import * as p from '@clack/prompts'; import fs from 'node:fs'; import path from 'node:path'; import { Readable } from 'node:stream'; import { finished } from 'node:stream/promises'; import slugify from 'slugify';  // The root is the current working directory const REPO_ROOT = process.cwd();  // Music collection content location const MUSIC_COLLECTION_ROOT = path.join(   REPO_ROOT,   'apps',   'web',   'src',   'content',   'music-collection' );  // For storing the album artwork const ARTWORK_ROOT = path.join(REPO_ROOT, 'public', 'images', 'music-collection');`

First up, I’m using [Clack](https://github.com/bombshell-dev/clack) to do the heavy lifting for me. It’s a fantastic tool that helps you to create a step-by-step CLI flow, which is exactly what I want. It’ll keep all of the data up to date, so when I get to the end of the flow, I can generate the markdown file with front matter.

This first snippet is mostly me initialising the tools and setting some immovable constants — hence the all caps screaming naming convention.

``// Generates a nice unique filename for the artwork function generateUniqueFilename(url) {   const extension = path.extname(new URL(url).pathname);   return `${Date.now()}-${Math.floor(Math.random() * 1000)}${extension}`; }  // Downloads the remote artwork and places in ARTWORK_ROOT async function downloadImage(url, filename) {   const request = await fetch(url);    const filePath = path.resolve(ARTWORK_ROOT, filename);    // Flags: if file is already there, this will exit stage left because we're   // in a pickle if a uniquely generated image name is duplicated   const fileStream = fs.createWriteStream(filePath, { flags: 'wx' });    await finished(Readable.fromWeb(request.body).pipe(fileStream));    return filePath; }``

Let’s look at album artwork now. What I want to be able to do is pop a URL as an answer to the artwork question so the system can download it and place a copy in my repository.

For all of that to work, I need to make sure each image file has a unique filename. That’s where the `generateUniqueFilename()` function comes in. First, it extracts the image format from the passed `url` property. From there, I construct a new string, starting with the date and a random number. Lastly, I stitch the extension back on to the string and job done.

[Advert![Save 20% on all courses using the code NEXTLEVEL.](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

The `downloadImage()` function then grabs the original image and the desired filename. It grabs the image using `fetch`, renames it, moves it to the `ARTWORK_ROOT` and again, job done.

``// Takes the front matter and creates a markdown file function createMusicItem(frontMatterTemplate, title) {   const slug = slugify(title, {     lower: true,   });    const filePath = path.join(MUSIC_COLLECTION_ROOT, `${slug}.md`);   fs.writeFileSync(filePath, frontMatterTemplate);   return filePath; }``

The function name here does a good job of explaining what’s happening. Front matter data is passed in, along with the title of the album. Next, a new `slug` is generated from the `title`, then a new markdown file is created using the `frontMatterTemplate` string, which we’ll cover in a moment.

`async function main() {   p.intro('Let’s add a new item to the music collection');    const musicItem = await p.group(     {       album: () =>         p.text({           message: 'What’s the album name?',           placeholder: '',           validate: (value) => {             if (!value) return 'Album is required!';           },         }),       artist: () =>         p.text({           message: 'Who is it by?',           placeholder: '',           validate: (value) => {             if (!value) return 'Album is required!';           },         }),       artworkURL: () =>         p.text({           message: 'What’s the artwork URL?',           placeholder: '',           validate: (value) => {             if (!value) return 'Album is required!';           },         }),       formats: () =>         p.multiselect({           message: 'What format(s)?',           options: [             { text: 'Vinyl', value: 'Vinyl' },             { text: 'CD', value: 'CD' },             { text: 'Digital', value: 'Digital' },           ],         }),       isMasterpiece: () =>         p.confirm({           message: 'Is this a masterpiece?',         }),     },     {       onCancel: () => {         p.cancel('Operation cancelled.');         process.exit(0);       },     }   );      // For readers: the rest of the function follows shortly }`

A Big Block Of Code™ was unavoidable here unfortunately, so allow me to explain what’s going on. The `p` variable is Clack, and the first thing I’m doing is popping a little message on the screen — “Let’s add a new item to the music collection”. From there, I define a new [group of questions](https://bomb.sh/docs/clack/packages/prompts/#group).

[Advert![Save 20% on all the courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

For each of those questions in the group, I’ll get back the response data. Because I’m defining `musicItem` as the group, I can get the data out like so: `musicItem.title`. That’s very handy indeed! It’s all very similar to the zod stuff we used for the Astro collection earlier in the series too.

With all of the questions in, it’s time to respond to the data I get back.

``// There's a 0 percent chance I'll add a top ten like this, so we're looking // only for the masterpiece tag at this point const tags = musicItem.isMasterpiece ? ['Masterpiece'] : [];  // Create a nice unique filename for the art image const artworkFileName = generateUniqueFilename(musicItem.artworkURL);  // We've got all the data for markdown now, so create that front matter const frontMatterTemplate = `--- title: '${musicItem.album}' artist: '${musicItem.artist}' cover: '${artworkFileName}' formats: ['${musicItem.formats.join("', '")}'] tags: ['${tags.join("', '")}'] pubDate: ${new Date().toISOString()} --- `;``

As I say in the code comment, I’ll never add a top 10 item like this, so my focus is day-to-day collection additions. I do however have an option to declare an album as a masterpiece, so if the clack answer is `true` for `isMasterpiece`, I assign `['Masterpiece']` as the value for `tags`.

Next, I use the function from earlier to determine an `artworkName` and that’s all the data I need to generate a nice block of front matter data.

`// Wait until the image is ready await downloadImage(musicItem.artworkURL, artworkFileName);  // Run the file creator createMusicItem(frontMatterTemplate, musicItem.album);  p.outro('✅ Album added!');  return true;`

Lastly, I use the `downloadImage` function from earlier and then the `createMusicItem` with all of that lovely data. I put a little success message on the screen and `return true`. The reason for that is I initialise the `main` function like so:

`main().catch(console.error);`

By returning `true`, the process will just end, but by stitching `catch` to `main()`, if there are errors, I’ll get a log.

## [Rigging up the script](#rigging-up-the-script)

From my command line, I want to be able to run `npm run music:add`, not `node packages/utils/new-music-collection-item.js`. That’s easy enough to sort though.

I opened up the root `package.json` and added the following to the existing `"scripts"` property:

`"music:add": "node packages/utils/new-music-collection-item.js"`

Job firmly done.

[Advert![Save 20% on all of our courses using the code NEXTLEVEL](https://piccalil.b-cdn.net/images/ads/next-level-event-landscape.png?format=webp)](https://piccalil.li/courses/?utm_source=graphical-ad&utm_campaign=next-level-2026)

## [Wrapping up](#wrapping-up)

That is iteration one _done_. Well it’s been _done_ for a while now, but me writing about iteration one is finally done. Like I mentioned a couple of posts ago, a very weird symptom of this project is that I’ve felt like I can’t progress to iteration two — the actual design work — until iteration one is fully written up. I have no idea why either. Brains are weird, man.

_Anyway_, the next post in this series will tackle exactly that: the creative process. This should all time well with the investments we’ve put into our own design system software too, so I’m looking forward to showing you all that. Because I do the production work, _then_ write about it in this series, expect a bit of a delay now while I actually do the work.

For now, I’ve got a basic UI and a fully functional website. Sure, it’s got a few rough edges, but it’s a website. If you’ve also been in “pause mode” like I have, what I will say is get an ugly version live first — especially if you don’t have a website already. It’s better to have _something_ than nothing.

Catch you in the next one.

**Enjoyed this article?** _You can support us by [leaving a tip](https://opencollective.com/piccalilli/contribute/leave-a-tip-90508/checkout?interval=oneTime&amount=3) via Open Collective_