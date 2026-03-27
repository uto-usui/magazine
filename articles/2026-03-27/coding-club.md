---
title: "Coding Club"
source: "https://bradfrost.com/blog/post/coding-club/"
publishedDate: "2026-03-26"
category: "design-systems"
feedName: "Brad Frost"
author: "Brad Frost"
---

Today I trekked to my daughter’s school (a long walk across the street!) to speak at her after-school coding club that’s been meeting weekly over the last month.

It was really fun to see how they were learning to code. I knew they were using [Scratch](https://www.scratchjr.org/) (which Ella has excitedly talked about over dinner), but I only learned about the little [Dash robots](https://store.makewonder.com/products/dash?srsltid=AfmBOopC1MLKtMxxuNSHisQcmU-KMviN6WtBchIsDrTZI7NPV-Ng65nG) as they swarmed around my feet while I was getting set up. The kids controlled them with iPads from across the room, and I slapped a sticky note containing the guest WI-FI password. The girls were grinning.

![A Dash Robot](https://bradfrost.com/wp-content/uploads/2026/03/CleanShotCleanShot2026-03-25-at-17.36.40.png)

They reserved the last half hour for me to chat and have fun with the kids. I asked them how they liked coding club, and asked what their favorite thing they’ve coded so far. A girl in the back yelled:

> I really like \[THIS ONE\], because Tinkercad hates me!

I laughed and exclaimed:

> **YES! Sometimes code hates you, and sometimes it feels like you hate the code. It can be frustrating when things don’t work, but when we persist and eventually the code works, it’s the best feeling! And that feeling of satisfaction never goes away.**

**That little quip prompted me to inadvertently describe the fuel that keeps me and countless others showing up to code day after day, year after year, decade after decade.**

## Demo time!

I mentioned that different code does different things, and that it’s possible to make code for a living. I said I get to make really fun websites and collaborate with people from all over the world.

I got to show and tell my website, and unsurprisingly the kids liked the dots.

I got to show off some of the cool demos and [visualizations](https://visualzzz.bradfrost.com/) I’ve been working on. I was excited to show off the [Emoji Transcript](https://visualzzz.bradfrost.com/?anim=emojiTranscript&g.audioTargetParams=baseFontSize&p.effect=typeSidescroll) visualization I made that live-translates speech into emoji. The kids shouted out their favorite animals, and it wasn’t long before “Toilet (🚽) and Poop (💩) were invoked. That one brought the house down.

We then went to [Minecraft’s website](https://www.minecraft.net/en-us) and I cracked open the web inspector and explained, “This website is made of code. You can look at it and even change it!”

We turned on [designMode](https://developer.mozilla.org/en-US/docs/Web/API/Document/designMode) by running:

```
document.designMode = "on"
```

and did the classic “change the background color” as well as updated some of the website copy. They were impressed.

![An altered version of Minecraft's website using web inspector to change background colors to pink and blue](https://bradfrost.com/wp-content/uploads/2026/03/Google-ChromeInbox-70-brad@bradfrost.com-Brad-Frost-Web-Mail2026-03-25-at-17.07.35-1024x843.png)

I then got to explain that code makes all sorts of things, including games. I pulled up [Ella’s latest work](https://bradfrost.com/blog/post/the-creative-infinite/): her [vibe-coded game about playing music with Michael McDonald](https://michael-mcdonald-game.netlify.app/).

[![A digital scene with cartoon penguins, colorful toy-like figures, and icebergs. A stage reads "Michael McDonald." A speech bubble says "I named my CAT after this man!" and stating a Michael McDonald fact](https://bradfrost.com/wp-content/uploads/2026/03/Google-ChromePlaying-With-Michael-McDonald2026-03-24-at-02.18.31.png)](https://michael-mcdonald-game.netlify.app/)

I kept looking over at Ella to see if she was comfortable with me sharing her game. She seemed excited about it the morning before school, but I know all that can change when your peers are actually looking at your creation. I could tell by her proud smirk she was alright with it.

It was a big hit! There were lots of shouts of “Where can I play this!?” from her classmates. Which then allowed me to explain about domains, URLs, that there aren’t special tools needed to make your own website, and all you need to do is make it available to launch it.

The grand finale demo involved a website I made at the last minute before leaving my house. I showed the shell of a web page, and then pulled up a JSON file in my [IDE](https://cursor.com/). I went around the room and asked each kid their `name`, favorite `color`, favorite `animal`, and a `funFact` about themselves.

I was thoroughly impressed by how patient the kids were as they attentively listen to each of their ~16-18 classmates take their turn. After the last kid shared their `funFact`, I switched back to the browser and said, “ok, do you want to see our website?!” I refreshed the page and showed off a website with their data populated.

![A website called "Coding club crew" featuring a grid of cards populated with each kid's provided info](https://bradfrost.com/wp-content/uploads/2026/03/Google-ChromeCoding-Club-Crew2026-03-25-at-16.54.42-799x1024.png)

Wooooaaahh! was the collective response. Each card opened up (using [`view-transition`s](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) for some extra flair) to show a detail view for each kid, equipped with the `funFact` and [UI themed](https://designtokenscourse.com/) to their favorite color.

![A card from the coding club demo website that shows a green card with Ella "loves Elephants" . A fun fact that says "I like rock climbing", and a button that reads "Back to everyone"](https://bradfrost.com/wp-content/uploads/2026/03/Google-ChromeCoding-Club-Crew2026-03-25-at-21.29.58@2x-1024x957.png)

We didn’t stop until I clicked on every last one of those kids’ names hahahaha.

## Excited for the future

I feel like we covered a lot of ground in a half hour, certainly more than I expected to cover. Ella’s teacher and the librarian who run the coding club were grateful and were happy that I actually showed them the code’s results and not just the code itself.

“You’d be surprised how many professionals with Masters’ degrees in Computer Science seem to forget to show the actual results.” was my response.

We said our goodbyes, and Ella and I walked home together back across the street to our house. We’re usually both pretty chatty (she is my daughter after all), but we mostly were quiet on our brief walk back.

The gravity of the day is only now sinking in, and I’m choking up as I write this. Ella generally knows what I do, and often sees me staring at a glowing rectangle far more than I’d like. But today I got to share my world — this world of code that I’ve been immersed in for nearly all of my life — with Ella, her peers, and teachers. I got to proudly show off Ella’s coded creations, and got to see everyone’s delight in collaborating to make something fun together.

There was no talk about business value, GitHub issues, stakeholder alignment, or developer handoff. I simply got to share the sheer magic that is coding, the magic that is the World Wide Web, the magic that is having ideas, the magic of bringing those ideas to life, and the magic of creating things with other people.

Thank you, coding club. Thank you, World Wide Web. Thank you, code.