---
title: "How Meta Engineered Ultra-Narrow Batteries for AI Glasses"
source: "https://engineering.fb.com/2026/06/23/production-engineering/how-meta-built-ultra-narrow-batteries-for-ai-glasses-meta-tech-podcast/"
publishedDate: "2026-06-23"
category: "engineering"
feedName: "Meta Engineering"
---

Smart glasses like the [Ray-Ban Meta](https://www.meta.com/ai-glasses/shop-all?ref=engineeringatmeta) and [Oakley Meta Vanguards](https://www.meta.com/ai-glasses/oakley-meta?ref=engineeringatmeta) need to pack enough energy to power features like cameras, speakers, AI workloads, and even a display. But it all has to fit into the glasses’ temple arms.

So how do you place a battery with enough power to run a pair of smart glasses all day into a form factor narrower than an adult’s pinky finger? You have to rethink how batteries are made. 

In [episode 86 of the Meta Tech Podcast](https://insidefacebookmobile.libsyn.com/86-a-hard-cell-engineering-ultra-narrow-batteries-for-ai-glasses), host [Pascal Hartig](https://www.threads.com/@passy_) sat down with Karthik and Myuran, the engineers behind Meta’s steel can battery technology, for a conversation on powering the newest and next generation of wearables. 

## Why Traditional Batteries Fall Short for Smart Glasses

Traditional pouch cells — the batteries in most phones and laptops– can’t cut it for devices like smart glasses because they’re difficult to reshape and shrink down. Their folds waste volume, their tolerances eat into precious millimeters of space, and at smaller sizes they can difficulty providing peak power for multitasking (for example, if someone is using the camera and asking the AI model to perform a task at the same time). 

Smart glasses need a battery that can claim every micron of space – something rigid, precise, and shaped to the product rather than the other way around.

## Enter Steel-Can Cells (at Never-Before-Seen Widths) 

Steel-can batteries aren’t new. Power tools and watches use them. But Meta’s AI glasses needed batteries with widths as narrow as 7mm, narrower than anything that existed before. Getting there meant rethinking nearly every internal component of the battery. 

### The Electrode Architecture

Traditional steel-can cells use a wound “jelly roll” of electrode material. Meta’s engineers replaced that with die-cut stacked layers, similar to wiring small resistors in parallel. The result is dramatically lower impedance, which matters when peak power is required so that the device can avoid brownouts if a lot of power is being demanded at the same time (because someone may be making a recording while asking the AI a question at the same time). 

### Tolerances

A steel-can cell holds its shape to roughly 100 microns. On a 10mm-wide battery, that gives back real usable volume that translates directly into additional energy density and runtime.  

## New Challenges With Each Generation

From Gen 1 to Gen 2 the Meta Ray-Ban’s, cell capacity grew from 160 mAh to 210 mAh — roughly a 30 percent bump. Yet the product shipped with claims of double the runtime. The chemistry didn’t change. The extra gains came from system-level efficiency improvements across hardware and software such as better power management, tighter firmware control, and a form factor that allowed for a larger cell

The Oakley Meta Vanguards actually feature a battery in each temple arm, which introduced a real systems puzzle at the intersection of electrical, firmware, and mechanical engineering. The cells in each temple arm are symmetric, but the electronic loads aren’t split evenly between the two sides. That creates cross-charging risks and sequencing complexity at boot and shutdown. 

Then the Meta Ray-Ban Display glasses introduced the most demanding power profile yet. Its screen draws sustained power rather than short bursts, which required designing a 248 mAh steel-can cell, the largest in Meta’s lineup.

## More Power to the Wearables

The ultra-narrow steel-can approach we developed for our smart glasses is proving adaptable to other form factors across Meta’s hardware portfolio.  

Meta is now focused on scaling and democratizing this technology across multiple vendors, ensuring we have resilient supply and can bring these batteries to the next generation of wearables.  

Listen to the full episode to hear the complete story — from first sketch to global shelf — including details on cross-charging two-battery systems, software versus hardware iteration cycles, and what it’s really like to collaborate across time zones to build something the world has never seen.

## Listen now

You can also find the episode wherever you get your podcasts, including:

-   [Spotify](https://open.spotify.com/episode/4JK9EnUe77SCq1EgOD8p7A)
-   [Apple Podcasts](https://podcasts.apple.com/us/podcast/meta-tech-podcast/id1370910331)
-   [PocketCasts](https://pca.st/juweao6h)

## Timestamps

-   0:06 — Intro and News
-   1:49 — Guest intros
-   4:16 — The problem with existing batteries
-   6:40 — Pouch vs. steel-can batteries
-   10:27 — What lower impedance means
-   12:25 — Power requirements
-   16:02 — Synchronizing two batteries
-   23:11 — Manufacturing never-done-before batteries
-   28:12 — Software vs. hardware iteration cycles
-   30:51 — Collaborations across the globe
-   37:00 — Market compliance
-   42:24 — Outro

The [Meta Tech Podcast](https://insidefacebookmobile.libsyn.com/) is a podcast, brought to you by Meta, where we highlight the work Meta’s engineers are doing at every level – from low-level frameworks to end-user features.

Send us feedback on [Instagram](https://instagram.com/metatechpod), [Threads](https://threads.net/@metatechpod), or [X](https://twitter.com/metatechpod).

And if you’re interested in learning more about career opportunities at Meta visit the [Meta Careers](https://www.metacareers.com/?ref=engineering.fb.com) page.