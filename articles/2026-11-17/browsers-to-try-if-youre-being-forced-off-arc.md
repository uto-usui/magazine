---
title: "Browsers To Try If You’re Being Forced Off Arc"
source: "https://blog.master.dev/browsers-to-try-if-youre-being-forced-off-arc/"
publishedDate: "2026-11-16"
category: "css"
feedName: "Frontend Masters Blog"
author: "Chris Coyier"
---

I say _forced_ off [Arc](https://arc.net/) because they have [officially said](https://x.com/arcinternet/status/2113301454597640570):

> We’ve decided to sunset Arc on December 22, 2026.

If you’re an Arc user like I used to be, the browser app won’t _poof_ from your computer, but I imagine the sync will stop working and, more importantly, it probably won’t be safe to use for much longer, since it won’t get Chromium updates.

I won’t belabor it, but I’ve [been a fan](https://chriscoyier.net/2022/12/08/whats-good-about-the-arc-browser/) of Arc for a long time and now grieve its loss. I’ve even [blogged here about newfangled browsers](https://blog.master.dev/newfangled-browser-alternatives/) during that period when I knew Arc was starting to go away.

This time, I figured I’d share my notes on the post-Arc landscape if you’re, like me, looking to move to another browser that **shares Arc’s features and sensibilities**. I picked ones that looked at least _fairly serious_ about it, even though many of them are solo-vibe coders.

I’m excluding ones that don’t seem particularly interested in most of Arc’s features as a baseline. For instance, [Aside](https://aside.com/features/browser-agent) seems like a fairly serious project, making AI features the primary thrust. It has side/pinned tabs, making it Arc-like at a glance, but it lacks Spaces and Splitting, which makes it a non-starter for me. [Phi](https://phibrowser.com/) and [Nav8](https://nav8.ai/) seem to be in the same situation.

I’m also not considering mobile versions of these, as I’ve never personally cared about that. Perhaps I should, as I know that’s a big consideration for many.

Part of what made Arc great, especially in those early days, is that they were coming up with ideas and shipping fast. So if _that’s_ what you’re trying to find in the next browser you mainline, that remains to be seen across these projects and will be your own determination as you use the browser over time, check their CHANGELOGs, and look at their social media presence, etc. I’m not quite sure who is innovating and iterating the fastest/best yet.

As I was putting this together, I saw Syafa Adena’s site [byearc](https://byearc.com/), which is a really well-done comparison site! It’s got _way more_ browsers listed than I do here, most of which I’ve never come across. This is more about my _personal notes in actually using_ these browsers for a while. So this is more personal tidbits, if less comprehensive.

## Dia

[Dia](https://www.diabrowser.com/) is the official next-generation of Arc by [The Browser Company of New York](https://www.thebrowser.company/). It’s what they were working on when they were [acquired by Atlassian](https://www.atlassian.com/blog/company-news/atlassian-acquires-the-browser-company) and what they continue to work on. Dia now requires an Atlassian account, which I’ve seen be a non-starter for people, but doesn’t bother me particularly.

Originally, Dia’s point was that Arc was too weird for the masses, and browsers needed to be more AI-focused. This refocus would allow The Browser Company of New York to achieve the massive growth it wanted. I’m not sure if they got there, but I’m sure the acquisition was a fine outcome for them. Now, they seem to be porting much of what Arc could do over to Dia, which I think is a welcome idea, but antithetical to Dia’s original concept.

-   **LIKE**: Has polish. This is still a Browser Company of New York product, which I really admire despite the Arc tragedy.
-   **DISLIKE**: Not all tabs are synced. Only pinned tabs and tabs above the horizontal line (in side tabs mode) are synced. Everything else isn’t synced and is immediately lost if you accidentally close the main browsing window.
-   **DISLIKE**: No “Little Arc”, the temporary browser windows that popped up when clicking links from other apps and could be opened on demand for temporarily detached browser windows. This completed the [hierarchy of tabs](https://chriscoyier.net/2026/09/15/the-four-tiers-of-tab-importance/) for me, and I really miss not having it.
-   **DISLIKE**: Pinned Tabs aren’t persisted across all spaces. Which I thought was the point of Pinned Tabs. I think it’s because all spaces are automatically different profiles, which I get, but don’t personally like.
-   **DISLIKE**: Tiny dots for space indicators. I like it to be more obvious which one I’m on and use icons/emojis to make it super clear. Tiny dots are fine for laptops with swipe gestures, but I’m on a mouse half the time.
-   **DISLIKE**: I don’t care for the AI chat. I do my AI stuff elsewhere, and it’s never helpful for me for it to intercept what would otherwise be a web search.
-   **DISLIKE**: Dragging tabs on top of each other just does nothing. Arc used to split them, which is very nice (although I always wished you could drag to re-arrange the split). Some others keep the Arc behavior, but more commonly produce a folder.

![Dia browser website hero showing a yellow interface with a browser window, sidebar tabs, and an “Ask anything” search panel](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/download-2.png?resize=683%2C1024&quality=80&ssl=1)

## Crest Browser

[Crest](https://crestbrowser.com/) is a quite faithful Arc clone. The byearc site lists it as the top spot in replicating the most Arc features. For me, a couple of papercutty things pushed me off it, mostly design-related.

-   **LIKE**: Big beefy emojis for Pinned Tabs and Space Indicators. Love that.
-   **LIKE**: Between “Peek” and “Quick Windows”, it’s a pretty nice implementation of Little Arc.
-   **DISLIKE**: Can’t get Kagi as my default search engine, despite even having the Kagi extension installed.
-   **DISLIKE**: Can’t fully move the URL bar out of the sidebar. This is extra weird when pinned Extensions are under the sidebar, [taking up even more space](https://cleanshot.com/share/7dsWJDqp).
-   **DISLIKE**: Just [little moments](https://cleanshot.com/share/FkY6NvjF) of [lack of polish](https://cleanshot.com/share/GcDjpq36).
-   **DISLIKE**: It’s _both_ Chromium and WebKit. That’s weird. Like you can _pick_ which rendering engine to display a site in, and extensions from either one are supposed to be supported. You get the DevTools of the rendering engine used. I don’t feel like this is going to be a recipe for success, just technical debt. I couldn’t get 1Password running at all, so in the end it was extensions and design stuff that lead to a bounce from me.

![Crest browser website with hanging heraldic banners and a split-view browser window preview](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/download-1.png?resize=683%2C1024&quality=80&ssl=1)

## Zen

I’ve found [Zen](https://zen-browser.app/) to be the most polished and faithful Arc port of all. It’s been around a while; they’ve got [a whole team](https://github.com/zen-browser/desktop/graphs/contributors) and [support](https://www.patreon.com/zen_browser), and it seems to be a very serious project. I’ve spent spans of weeks on Zen several times.

I hate to say this, but the main problem for me is that it’s Firefox (Gecko) based. I’m pro-Firefox, being a typically positive player in the web space, and diversity of browser engines is extremely good. But I’m anti-Firefox _for me._ I’m constantly bothered by the lack of little features in the DevTools I’ve grown used to in Chrome. I use [Riverside](https://riverside.com/) all the time, and it’s straight-up blocked in Firefox. I’m forever looking at extremely new browser features, and Firefox _tends_ not to lead the way on many features. That’s not a bad thing for the web, but it’s a paper cut for me needing to switch around a lot. I also heavily use the [Notion Web Clipper](https://www.notion.com/web-clipper), and Notion just doesn’t make that for Firefox. I found a third-party thing, but I don’t like it as much. Just a lot of personal-to-me stuff.

-   **DISLIKE**: Syncs through a Mozilla account. I actually _like_ that (free, cross-platform), but when setting it up, it makes it seem like it _requires_ having the Firefox mobile app, which I installed just for this, but didn’t really want. Unsure if that’s really true.
-   **DISLIKE**: No Little Arc. [I tried to ask](https://x.com/chriscoyier/status/2115173030968299669). They are on social media but apparently don’t respond to questions. I wonder if it’s because the work is more collective, not top-down leadership.
-   **DISLIKE**: How the Space icons go grayscale when not active. That means you can’t use color to help quickly distinguish them. A better way to indicate an active tab would help me.

![Zen Browser homepage displaying the phrase “welcome to a calmer web” in large black and coral typography.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/download-3.png?resize=683%2C1024&quality=80&ssl=1)

## Ardia

I found Ardia to be another relatively faithful Arc clone with some smart improvements of its own. The name is a combination of “Arc” and “Dia”, and I found this to be very true! Unfortunately, it has two behaviors directly from Dia that I specifically don’t like. One is that spaces are automatically profiles, and the other is that the lowest-tier tabs are temporary-by-window, which can lead to frustrating moments for me.

-   **LIKE**: Has “Little Ardia”, a worthy implementation of “Little Arc”
-   **LIKE**: Sync works through iCloud. I like that. It leaves out other platforms, which isn’t ideal for them, but it works for me.
-   **DISLIKE**: I had an issue where it would visually swallow my cursor, and I had to quit and reopen it to get it back. Then it would happen again, enough that I had to give up.
-   **DISLIKE**: Pinned Tabs aren’t persisted across all spaces (like Dia). Which I thought was the point of Pinned Tabs. I think it’s because all spaces are automatically different profiles, which I get, but I don’t personally like it.
-   **DISLIKE**: Closing the window means you [lose all non-pinned tabs](https://cleanshot.com/share/9m3HCLDy). It does warn you, but if you go past that, they are just gone. No history, no getting them back. Accidentally closing the window can be catastrophic for tabs-as-TODOs types like me.

![Ardia browser landing page featuring bold “Touch Grass” headline over a grassy field background.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/download-1-1.png?resize=683%2C1024&quality=80&ssl=1)

## Yet Another Browser (yab)

[Yet Another Browser](https://yetanotherbrowser.com/) (yab) is a WebKit variant Arc clone. Normally, the non-Chromium thing would be tough for me for the same reasons I listed for Zen browser above. But yab mitigates this a good deal by supporting _both_ **Chrome DevTools** and **Chrome Extensions**, which is an interesting technical feat — although it feels like… why not just be Chromium at that point?

-   **LIKE**: Bring-Your-Own AI Agents/Subscriptions ([screenshot](https://cleanshot.com/share/W44VhQ8h)). If you’re going to have AI features, allowing me to integrate the ones I already use seems like a smart path.
-   **DISLIKE**: I experienced some awkward UI moments where a long page title rendered in the top left of the window and overlapped other UI. Not the world’s biggest deal, but when picking a browser in this lineup, polish is a must.
-   **DISLIKE**: It installed skills and MCP-ish stuff globally that my agents picked up and started using by default, which I didn’t want. This is what got me to fully uninstall it and purge those skills. I tried the installer a 2nd time, and this stuff is opt-in, so my bad that first time.
-   **DISLIKE**: No Little Arc.

![YAB browser website homepage displaying floating browser icons and a Mac download button](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/download-2-1.png?resize=683%2C1024&quality=80&ssl=1)

## Arcium

I was interested in [Arcium](https://github.com/dr-baker/Arcium-macOS), as it also introduced me to [Helium](https://helium.computer/), which seems like a very serious privacy-focused de-Googled version of Chromium. Helium is very cool, and I like the idea of it being a base for _other_ browser experimentation. But as you can see from these huge downsides, Arcium isn’t a contender right now.

-   **DISLIKE**: Spaces always open as a new window. Can’t swipe between them.
-   **DISLIKE**: Can’t install extensions.
-   **DISLIKE**: Had trouble finding a place

![GitHub repository page for Arcium-macOS showing the main branch file and folder list](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/download-3-1.png?resize=683%2C1024&quality=80&ssl=1)

## Cra

I actually found [Cra](https://crabrowser.app/) (Arc backward?) to be easily the most direct Arc clone of them all. It copied _everything identically_ from Arc. It’s got the little personal conference-badge thing in Settings. It’s got the weird “Max” AI features from Arc. Any little differences I notice seem like improvements, like options to go edge-to-edge, fancier outlines, and the option to have Pinned Tabs across all spaces if you don’t want that.

-   **LIKE**: The importer was the nicest of any I tried, and it worked perfectly twice for me.
-   **LIKE**: iCloud Sync (but also supports Dropbox and such, which you’d think would open the door to other platforms, but they aren’t planning that).
-   **LIKE**: Perfect Little Arc implementation.
-   **LIKE:** Supports the always-on Toolbar mode, which I prefer but isn’t required.
-   **DISLIKE**: Found a bug where I was unable to remove a browser extension (but could disable it)

I honestly haven’t found anything I seriously don’t like about Cra yet. Haven’t bounced!

![Screenshot of the Cra browser website showing its sidebar, tabs, and blue promotional interface](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/download-4.png?resize=683%2C1024&quality=80&ssl=1)

## Flecha

Felcha is a decent enough Chromium-based Arc clone, and I like the developer-focused mentality, but it doesn’t offer that much. Also felching is a pretty NSFW term, and that’s weird?

-   **LIKE**: The idea of improving the fuzzy search command bar thing to be smarter for developer needs is smart innovation.
-   **LIKE**: Pinned tabs across spaces. Big emoji space indicators.
-   **LIKE**: Dragging tabs on top of each other actually splits them like Arc.
-   **LIKE**: Having MCP control over it is kinda nice.
-   **DISLIKE**: It’s got a section at the top of the sidebar for “Running locally…” which must look for web servers running at certain ports. You can’t turn it off or collapse it. My various dev projects have a bunch of these that aren’t useful to have there.
-   **DISLIKE**: Having to manage folders inside of settings is weird/bad.
-   **DISLIKE**: It has a “peek” thing but no proper Little Arc.
-   **DISLIKE**: Can’t drag to re-order Pinned Tabs.

![Flecha browser homepage showing the headline “The browser that knows you write code” and a command bar interface preview.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/11/download-6.png?resize=683%2C1024&quality=80&ssl=1)

## Honorable Mentions

-   **Just use a mainline browser.** Safari, Chrome, and Firefox all have side tabs now. Chrome has Splitting. You can install extensions for things like ⌘-Shift-C URL copying. They all have their own syncing abilities.
-   **[Search Browser](https://searchbrowser.app/).** It’s _really_ nicely designed, and I love the focus on quality, speed, and efficiency. But it’s one of those WebKit-but-runs-Chrome-extensions ones I find awkward, and it doesn’t sync, and no-sync is a non-starter for me.
-   **[Vivaldi](https://vivaldi.com/).** A very powerful browser that’s been around a long time, has a great team, and is super customizable and feature-packed. I ended up bouncing from it last time I tried it, as it’s almost _too_ feature-packed. Email, calendar, VPN, feed reader, etc. You don’t have to use them, but it still feels overloaded.
-   **[Orion](https://orionbrowser.com/).** I’m a big Kagi fan, and I think it’s cool they have a browser too. It’s, again, one of those WebKit-but-supports-(all)-extensions Frankenstein things, but they make that a top priority, so they do it well. They should probably do a better job talking about all its features, because it’s nicer than the homepage makes it look. Sorry to people on other platforms too, as they [bailed on Windows/Linux](https://blog.kagi.com/update-orion-linux-windows).