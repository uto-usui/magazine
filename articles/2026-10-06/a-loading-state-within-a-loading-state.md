---
title: "A loading state within a loading state"
source: "https://unsung.aresluna.org/a-loading-state-within-a-loading-state/"
publishedDate: "2026-10-05"
category: "design"
feedName: "Sidebar"
---

##### 1.

One of the classic parables about loading goes as follows.

A building manager had a problem: people were complaining about the elevator being too slow. But upgrading the elevator was an enormous expense, so the manager came with an alternative solution: they put a mirror next to the elevator call buttons. Even though the elevator didn’t become any faster, complaints trickled to a halt, as people were checking themselves out in the mirror and that changed their perception of how long the wait really was.

##### 2.

In the late 1970s and early 1980s, it wasn’t uncommon to equip early home computers with audio tape players, using the same cassettes designed to record and play music. Software was encoded as sound. A lot of redundancy was needed to account for many low quality cassettes and misaligned playheads, so loading times were _really_ long. There were other disadvantages – no random access but definitely random errors, tapes wearing out and being “eaten” by the player – but tapes were so much cheaper than floppy disks or cartridges that they endured.

    ![](https://unsung.aresluna.org/_media/a-loading-state-within-a-loading-state/1.1088w.avif)

On one of the computers, the British ZX Spectrum from 1982, an interesting convention emerged. As the game was arriving from the cassette, what was loaded before the code itself was its “title card.” The loading process of just this one image took about 35 seconds, and watching the graphic emerge was mesmerizing, almost like deciphering a puzzle – especially when, only toward the end, the color attributes appeared and the whole thing clicked into place:

   

Some of these were beautifully done ([here’s a gallery of… all of them](https://retrodelights.co.uk/loading-screens/)?), created by talented artists working in a very unforgiving medium, a pleasure to watch materialize on the screen…

…or, at least, it felt so for the first few encounters. Upon loading the game for the nth time, you grew more and more aware of the fact that you are spending precious time waiting to load a screen you’ve already seen. This was different than the first example; the mirror existing never slowed down the elevator.

Sure, it was just 35 seconds out of a 5–20 minute load time – I told you cassettes were slow! – but still. Some people loved them, others built truncated versions that skipped the title screen altogether (as much as you could imagine just fast forwarding through it like you would through a song, it didn’t work that way).

##### 3.

Figma is a web design app, and its editor arrives in a big, everchanging blob of JavaScript, in addition to having to load and decode the contents of the file itself. This isn’t 5–20 minutes, but it’s long enough that it necessitated a loading screen of the heavy variety: one with a progress bar.

   

During my time at Figma, an idea would reappear with surprising regularity: what if we put a little hint next to the loading bar? Something that could teach you about a useful keyboard shortcut, or a trick? You’ve seen that before, [often in games](https://www.gameuidatabase.com/index.php?set=1&scrn=3&scroll=250):

It seemed like a thoughtful gesture for the user, a mirror of the elevator mirror idea. But I fought it, tooth and nail, for one very specific reason: this would remove pressure to make this screen fast.

Had we given the screen another purpose, subconsciously or not, we might start caring less about improving it – as a matter of fact, you could make an argument to introduce _artificial_ minimum loading time just so that the user could finish reading the tip!

##### 4.

I had a similar feeling when, in 2018, Gmail replaced its simple progress bar loading state with this:

   

It was huge, corporate, intense. It felt like an admission of defeat: our app is slow, and I guess we’re surrendering ourselves to it.

But recently, I’ve noticed not just that Gmail’s loading state has been simplified, but also that it doesn’t appear nearly as often:

   

I don’t know the technical details: is it caching? a more intense refactor? Either way, as much as I absolutely dislike what Gmail has become – there might be no more harrowing place in the web app world than Gmail’s settings, for example – kudos to the team for making it better. Gmail seems to be loading a lot faster now.

(There is one small exception: it would appear that the loading state image itself doesn’t have a proper loading state – a rather strange omission.)

##### 5.

There is, I believe, a more universal lesson in here.

Loading is a complex space, where sometimes the most natural solution is a bad one, sometimes making things faster is making things _slower_, and sometimes new thoughtful design for whatever delay there is can be a better use of engineering effort than focusing on shaving off more milliseconds. (It’s both speed and the perception of speed that matter.)

Also, this is exactly [what Y2K was](https://unsung.aresluna.org/we-made-it-be-ok-by-being-bored-and-fixing-stuff/): We remember and react to loading states that are elaborate, cute, memorable – but we never see or link to loading states _avoided_.

And while you see occasional stories told by engineers making things faster, you don’t often hear accounts of people within companies, somewhere at the intersection of design and engineering, who work hard designing thoughtful loading states, avoiding loading state bloat, or figuring out some clever hybrid approach.

But, to be fair, there is also no parable of a building manager who just forked over some cash and installed a better elevator.