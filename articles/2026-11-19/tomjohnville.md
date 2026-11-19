---
title: "Tomjohnville"
source: "https://www.tomjohn.design/content/tomjohnville"
publishedDate: "2026-11-18"
category: "design"
feedName: "Sidebar"
---

## Major versions

This started with the idea to just improve my old site. It was much more of a single-page experience, but I did have a grid of some random UI samples, and it was all built in Framer. I first tried to make it like my work was concentric rings, then went all 3D on a page, then the town, and finally what you see today.

## A globe

-   Sep 12
-   9 prompts
-   9M tokens

The original idea I'd sketched was that my portfolio would be on a globe, and I'd be in the camper driving around. It would show where I'd been, and I might still add that back, but the initial experiments from Claude were... bad.

## Sprites, a truck and a camper

-   Sep 22 – Sep 25
-   102 prompts
-   185M tokens
-   +1,614 −245

For some reason I started with the truck and the camper. I really, really wanted them to match the real layout and look of real life, so I spent like 3 days just making sure it was right, even before I went with more 3D assets.

## Going 3D

-   Sep 24 – Sep 27
-   63 prompts
-   502M tokens
-   +1,830 −427

My character model was tricky. I tried for a lot longer than I'd like to admit to make my guy look “realistic”, even pulling in character rigs from the internet to try to style them. I eventually abandoned the idea and went with the initial simple version you see today, and this also allowed me to fill the world with more characters.

## A scene for each project

-   Sep 22 – Sep 27
-   59 prompts
-   333M tokens
-   +8,287 −722

Originally I wanted the “world” to be pretty small. The idea was that you'd walk into the scene and the whole world would change, more like the original Zelda games, if that makes sense. Here I was trying to figure out how to show the info about each project when you entered into it; I added a panel later.

## One UI

-   Sep 23 – Oct 19
-   162 prompts
-   1.1B tokens
-   +4,703 −2,783

I tried a bunch of different versions of a unified UI to try to get the game world and the site world to feel cohesive. Still not sure I've nailed it. There was a lot of exploration of how tips, dialogue, etc. should look; I went with something that uses both pixel and clean UI styles next to each other.

## Buildings as my résumé

-   Sep 25 – Oct 14
-   41 prompts
-   301M tokens
-   +4,849 −1,535

I fed in a lot of photo samples to generate these buildings. Most of them are heavily inspired by real locations. The Basedash building is from the coworking space we worked at in Montreal, and the Intradiem and Asurion buildings are from photos I have from years ago.

## Arriving

-   Sep 25 – Oct 2
-   85 prompts
-   690M tokens
-   +1,502 −583

This was one of the more difficult problems. How do I get you to play the game? I spent a long time trying to make the initial load into a tutorial, but after way too many failed tests and lots of feedback, I just decided to drop you into the game. Getting the initial load right was a big problem, though.

## A street and a campground

-   Sep 26 – Sep 30
-   42 prompts
-   414M tokens
-   +7,543 −1,203

I had a lot of different layouts for the town, tried quite a few looks for the streets, and eventually landed on what you see today. It was originally all black, then long and skinny, then the camper was closer. I like the current version.

## The truck

-   Sep 27 – Oct 9
-   27 prompts
-   399M tokens
-   +2,306 −436

I wanted the truck to be drivable, which meant I also wanted it to be hitchable to the camper, which meant I also wanted a backup camera, realistic turning radius, interior controls, engine sounds... you get the picture.

## Things to find

-   Sep 27 – Oct 18
-   46 prompts
-   515M tokens
-   +4,919 −555

There are a lot of Easter eggs in the game, and based on my analytics, they do drive retention. I wanted to layer in weird things to find, places to explore, and make the achievements easy and obvious.

## Night

-   Sep 27 – Oct 2
-   28 prompts
-   216M tokens
-   +2,496 −392

Dark mode is great, but night mode is better. This was actually the biggest performance issue I had to deal with, as the lighting at night can cause a ton of dropped frames if you're not careful. I also at one point even had a literal time of day progression with real sunsets and sunrises, but then I just made it morning, day, evening, night to save on perf costs.

## Making it fast

-   Sep 28 – Oct 10
-   38 prompts
-   576M tokens
-   +1,838 −740

I had agents running overnight every night for about a week to try to get to 60fps. I also have a lot of rules for my agents to follow when adding game assets; I have a monitoring pipeline that triggers for each PR, and internal benchmarks to be sure the game is smooth on most any device.

## The welcome sign

-   Sep 28 – Oct 2
-   17 prompts
-   42M tokens
-   +482 −33

I used Image 2 from ChatGPT for these. Even though I'm a stickler about creating Ditherfaces by hand, I didn't want to make this big of one by hand, and I didn't have the time. Tried a bunch of versions, happy with the result.

## Talking to people

-   Sep 30 – Oct 25
-   38 prompts
-   455M tokens
-   +1,874 −144

Adding in-game dialogue was originally meant to be a mission thing, which I haven't added yet. But I did make it so you could talk to any NPC, and also that they'd talk back. Each of them is a separate personality, with knowledge constrained to their game region, but all AIs capable of talking back. Also used this for the chatGPTom eve agent.

## Multiplayer

-   Oct 3 – Oct 16
-   62 prompts
-   417M tokens
-   +5,550 −985

I wanted the town to feel real, so I added real-time multiplayer using Cloudflare Workers. The game was originally only multiplayer in the coworking space, but I realized it was cooler if the whole place was. It caps at 50 before it'll spin up a new game world.

## chatGPTom

-   Oct 4 – Oct 22
-   34 prompts
-   377M tokens
-   +1,993 −348

This is using an eve agent and the Vercel AI Gateway, + quite a bit of work to make sure my agent isn't a threat vector. I have a Jev eval with each prompt to determine if the agent can reply with a cached response, and it also determines if the user is trying to abuse the system and can boot them, deny credits, and is very good (so far) at resisting prompt injection. Lessons learned from seeing the real issues in prod... this is a pretty hardened agent.

## Halloween

-   Oct 27 – Oct 28
-   9 prompts
-   158M tokens
-   +1,779 −133

I themed the game for Halloween this year, and will keep updating themes as I go. Really fun to be able to have this ability.

## This page

-   Oct 6 – Nov 3
-   147 prompts
-   440M tokens
-   +1,416 −178

Originally added a page for myself just to see every prompt in one place, but have had enough people asking about how the site is built that I decided to make it a meta-project. Also updated the gallery and grid UI to be more like the original idea that started this site.