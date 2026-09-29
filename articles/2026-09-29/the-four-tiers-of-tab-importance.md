---
title: "The four tiers of tab importance"
source: "https://chriscoyier.net/2026/09/15/the-four-tiers-of-tab-importance/"
publishedDate: "2026-09-28"
category: "design"
feedName: "Sidebar"
---

[Arc](https://arc.net/) is the greatest web browser ever, and has been tragically moved-on-from by The Browser Company of New York-come-Atlassian. I’ve been back on it the last month or so though. It’s still very usable as they keep the Chromium version updated.

_I just really like it._ It’s so good. My second favorite is [Zen](https://zen-browser.app/) because of how well it follows in those Arc footsteps. But I’m attempting a jump over to [Dia](https://www.diabrowser.com/), the sorta-kinda-Arc-replacement, as it seems like that’s where the effort is focused. But is it?! I don’t see [a ton of action](https://www.diabrowser.com/release-notes/Tools) on Dia either, to be fair. But they have seemed to bring some of the great some from Arc over to Dia, so I figured it was worth a shot.

There is already a bunch of paper-cutty stuff I don’t like, but I gotta give it some time, so I won’t dig into all that just yet.

Right now I’d just like to explain one thing I think Arc _really nailed_: **Tab Heirarchy.**

It’s _sort of_ like a 4-tier system.

## 1) Pinned Tabs

These favicon-only buttons are tabs that persist across all _spaces._ Their position and ubiquity make them, perhaps, the _highest tier_ tabs.

At one point I had it in my head that Arc “kept these tabs hot” meaning if you clicked onto one of them, it was already rendered, so you felt no delay as that page loaded. Not super sure that’s true, but it would be cool if it was (and worked so well it was obvious).

![A user interface displaying a tab selection area with icons for GitHub, CodePen, and various other tools, alongside a sidebar featuring folders labeled Standard, CodePen, Admin, API, and Pull Requests.](https://i0.wp.com/chriscoyier.net/wp-content/uploads/2026/09/Screenshot-2026-09-15-at-2.26.08-PM.png?resize=1024%2C738&quality=80&ssl=1)

The icons are _a little small_ which reduces their prominence a smidge, but I’d still call them the top.

**The Problem in Dia:** Dia has these, but there are Profile-specific, which to me ruins the heirarchy. Why have them at all if they don’t have the ubiquity?

## 2) Top Tabs? Important Tabs?

I really don’t know what to call these, but they are also high on the hierarchy and probably equal to those pinned tabs in importance. But they _don’t_ persist across spaces — they are very space-specific.

![Screenshot of a code editor interface showing CodePen project folders and various development environments alongside a Delta Airlines flight booking page.](https://i0.wp.com/chriscoyier.net/wp-content/uploads/2026/09/CleanShot-2026-09-15-at-14.34.37%402x.png?resize=665%2C1024&quality=80&ssl=1)

They’re below the pinned tabs, but above (separated by a little line) the regular tabs. These tabs sort of behave like bookmarks, which is a fantastic feature that I’ve really grown to love. You can just _close them_ and instead of literally closing and disappearing from the sidebar, they just reset to their main URL. Closing them is just like resetting them. You can remove them, of course; it’s just a more explicit action. These are great.

**The Problem in Dia:** None. Dia has these and they are fine.

## 3) Regular Tabs

The tabs below the little line are regular tabs.

![Screenshot of a web browser interface displaying a tab selection area with recent tabs, including Delta Air Lines, a Kagi search for 'cool dogs', and a 'border-shape CSS property' documentation link.](https://i0.wp.com/chriscoyier.net/wp-content/uploads/2026/09/CleanShot-2026-09-15-at-14.40.10%402x.png?resize=864%2C1024&quality=80&ssl=1)

They are remarkable for their unremarkableness. They are just tabs. You open them and close them and behave exactly how you’d expect a tab to be.

They do have one notable feature: Arc has a setting to auto-archive these tabs after a set period. It’s like a “save you from yourself” feature. I have mine set to 30 days, as I actually _don’t_ like this feature. I keep a tidy browser anyway and don’t need to be saved here. I know some people really like it though, people that I assume also have Roombas.

**The Problem in Dia:** Dia just doesn’t sync these?! WTF?! It syncs literally everything else but just stops short of syncing your normal tabs.

## 4) Little Arc

Perhaps the lowest on the hierarchy are “Little Arc” windows.

It takes some serious getting-used-to in Arc that you don’t open multiple windows. You just have the one browser window. It’s weird to have multiple windows. It lets you, but it probably shouldn’t.

Instead, if you need a 2nd window for a sec, which is legit, you just open a Little Arc, which is this very transient browser window with none of the Arc UI around it. You do your little thing and close it. Or, you “promote” it to a regular tab with the one prominent button a Little Arc has.

![CodePen interface showing an untitled project with HTML, CSS, and JavaScript files open, featuring code in the editor and a preview section.](https://i0.wp.com/chriscoyier.net/wp-content/uploads/2026/09/Screenshot-2026-09-15-at-2.45.18-PM.png?resize=1024%2C494&quality=80&ssl=1)

Little Arc is what Arc uses to open links from other apps. Like if you click a link in your email app, it’ll open in a Little Arc first. I love this. Chances are, these are ephemeral browser “tabs” I just need to look at for one sec, then whisk away. If not, I’ll just promote it.

**The Problem in Dia:** Dia just doesn’t have these ephemeral windows. Booooo. This is the #1 loss I feel in Dia.

## It’s Not Just the Tab Hierarchy; It’s Tab Handling

### Getting To Tabs

Both Arc and Dia have this nice feature where you basically ⌘-T to make a new tab, and type in what you’re looking for. But it doesn’t just do one thing. It’s got a menu of choices. Of course, the top choice needs to be right most of the time, and it usually is, but options are nice.

-   It might offer to open up a web search for your thing.
-   It might offer to switch to an already-open tab that you may or may not realize you already had open.
-   It might offer a recently-visited page it can re-open for you.
-   It might be a command.

**The Problem in Dia:** It’s just not as good as Arc was. For one, it really wants to hijack many would-be web searches for “Chat” instantiations. So it answers with some ambigous LLM instead of searching. I use AI, but I literally never want this in Dia as I’d rather just use an LLM of my choice. Dia also isn’t as good at commands. It change change color scheme, it can’t open browser extensions, it doesn’t have splitting commands, lots of missing stuff.

### Syncing

I mentioned this above briefly, but I’d like to mention again:

![User interface displaying a sync status update with options to connect another device and access advanced settings.](https://i0.wp.com/chriscoyier.net/wp-content/uploads/2026/09/Screenshot-2026-09-15-at-2.56.28-PM.png?resize=1024%2C268&quality=80&ssl=1)

Your profiles sync. The pinned tabs in those profiles sync. **But not your other tabs.** This just sucks. I use multiple computers, I want all my tabs to sync.

**The Problem in Dia:** Normal tabs don’t sync.

### Splitting

Both Arc and Dia have splitting, meaning you can see two websites side by side, which is [so good it gets copied](https://support.google.com/chrome/answer/16971124?hl=en&co=GENIE.Platform%3DDesktop). Friggin love it, use it constantly. This is one of the ways “just having one browsing window” works so well. You probably have a system for this if you’re a non-Arc/Dia user already with windowing apps that help set multiple windows where you want them. I actually like just having it done right within one browser window. It just feels good.

**The Problem in Dia:** It’s not as good in Dia. You can’t drag two tabs on top of each other to split. The command bar doesn’t have a command for splitting. I set up a key command for it which is OK, and you can still Option-Click which is crutical, so it’s live-with-able, but barely.

### Spaces Are Just Spaces, Not Profiles

“Profiles” in Dia are more like how other browsers do it. When you switch profiles, it’s kinda like you’re in a new isolated browser. If you’re logged into CodePen in one profile and then switch to another, you’re no longer logged in.

I would think some people find this an improvement of Dia over Arc, as Arc didn’t have a profiles feature. If they love it, that’s cool, I just never used profiles and don’t like them. I preferred how spaces were just groupings of tabs in Arc.

**The Problem in Dia:** Dia only has _little dots_ for the Profiles where Arc has icons/emojis for Spaces. I’m not always on a computer with a touch pad, so I preferred the larger click area in Arc.

### Side Tabs

It’s worth mentioning because Arc _forced_ this, and Dia just makes it optional. To me, it’s required now. And literally all the major browsers offer this now, which to me proves how rad it is. Dia does side tabs just fine.

* * *

There are little things I prefer in Dia, like I didn’t need the Easels and Boosts and all that, so the removal of those things is fine with me.