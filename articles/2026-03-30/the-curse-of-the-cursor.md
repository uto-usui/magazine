---
title: "The curse of the cursor"
source: "https://unsung.aresluna.org/the-curse-of-the-cursor/"
publishedDate: "2026-03-27"
category: "design"
feedName: "Sidebar"
---

I had no idea it was [Alan Kay himself](https://en.wikipedia.org/wiki/Alan_Kay) who was responsible for the mouse pointer’s distinctive shape. In 2020, [James Hill-Khurana emailed him](https://jameshk.com/mouse-cursor) and got this answer:

> The Parc mouse cursor appearance was done (actually by me) because in a 16x16 grid of one-bit pixels (what the Alto at Parc used for a cursor) this gives you a nice arrowhead if you have one side of the arrow vertical and the other angled (along with other things there, I designed and made many of the initial bitmap fonts).
> 
> Then it stuck, as so many things in computing do.

And boy, did it stick.

But let’s rewind slightly. The first mouse pointer during the Doug Engelbart’s 1968 [Mother Of All Demos](https://en.wikipedia.org/wiki/The_Mother_of_All_Demos) was an arrow faced straight up, which was the obvious symmetrical choice:

![](https://unsung.aresluna.org/_media/the-curse-of-the-cursor/1.avif)

(You can see two of them, because Engelbart didn’t just invent a mouse – he also thought of a few steps after that, including multiple people collaborating via mice.)

But Kay’s argument was that on a pixelated screen, it’s impossible to do this shape justice, as both slopes of the arrow will be jagged and imprecise. (A second unvoiced argument is that the tip of the arrow needs to be a sharp solitary pixel, but that makes it hard to design a matching tail of the cursor since it limits your options to 1 or 3 or 5 pixels, and the number you want is probably 2.)

Kay’s solution was straightening the left edge rather than the tail, and that shape landed in Xerox Alto in the 1970s:

![](https://unsung.aresluna.org/_media/the-curse-of-the-cursor/2.avif)

Interestingly enough, the top facing cursor returned as one of the variants in Xerox Star, the 1981 commercialized version of Alto…

![](https://unsung.aresluna.org/_media/the-curse-of-the-cursor/3.avif)

…but Star failed, and Apple’s Lisa in 1983 and Mac in 1984 followed in Alto’s footsteps instead. Then, 1985’s [Windows 1.0](http://toastytech.com/guis/win101.html) grabbed a similar shape – only with inverted colors – and the cursor has looked the same ever since.

That’s not to say there weren’t innovations since (mouse trails useful on slow LCD displays of the 1990s, [shake to locate](https://www.igorkromin.net/index.php/2015/10/03/and-the-best-osx-1011-el-capitan-feature-is-shake-to-locate/) that Apple added in 2015), or the more recent battles with the hand mouse pointer popularized by the web.

But the only substantial attempt at redesigning the mouse pointer that I am aware of came from Apple in 2020, during the introduction of trackpad and mousing to the iPad. The mouse pointer a) was now a circle, b) morphed into other shapes, and c) occasionally morphed into the hovered objects themselves, too:

[The 40-minute deep dive video](https://developer.apple.com/br/videos/play/wwdc2020/10640/) is, today, a fascinating artifact. On one hand, it’s genuinely exciting to see someone take a stab at something that’s been around forever. Evolving some of the physics first tried in Apple TV’s interface feels smart, and the new inertia and magnetism mechanics are fun to think about.

But the high production value and Apple’s detached style robs the video of some authenticity. This is “Capital D Design” and one always has to remain slightly suspicious of highly polished design videos and the inherent propensity for [bullshit](https://designobserver.com/on-design-bullshit/) that comes with the territory. Strip away the budget and the arguments don’t fully coalesce (why would the same principles that made text pointer snap vertically not extend to its horizontal movement?), and one has to wonder about things left unsaid (wouldn’t the pointer transitions be distracting and slow people down?).

Yet, I am speaking with the immense benefit of hindsight. Actually using that edition of the mouse pointer on my iPad didn’t feel like the revolution suggested, and barely even like an evolution. (Seeing Apple TV’s tilting buttons for the first time was a lot more enthralling.) And, Apple ended up undoing a bunch of the changes five years later anyway. The pointer went back to a familiar Alan Kay-esque shape…

…and lost its most advanced morphing abilities:

Watching [the 2025 WWDC video mentioning the change](https://developer.apple.com/videos/play/wwdc2025/208/) (the relevant parts start at 8:40) is another interesting exercise:

2020:

> We looked at just bringing the traditional arrow pointer over from the Mac, but that didn’t feel quite right on iPadOS. \[…\] There’s an inconsistency between the precision of the pointer and the precision required by the app. So, while people generally think about the pointer in terms of giving you increased precision compared to touch, in this case, it’s helpful to actually reduce the precision of the pointer to match the user interface.

2025:

> Everything on iPad was designed for touch. So the original pointer was circular in shape, to best approximate your finger in both size and accuracy. But under the hood, the pointer is actually capable of being much more precise than your finger. So in iPadOS 26, the pointer is getting a new shape, unlocking its true potential. The new pointer somehow feels more precise and responsive because it always tracks your input directly 1 to 1.

(That “somehow” in the second video is an interesting slip up.)

![](https://unsung.aresluna.org/_media/the-curse-of-the-cursor/8.avif)

I hope this doesn’t come across as making fun of the presenters, or even of the to-me-overdesigned 2020 approach. We try things, sometimes they don’t work, and we go back to what worked before.

I just wish Apple opened itself up a bit more; there are limits to the “we’ve always been at war with Eastasia” PR approach they practice in these moments, and I would genuinely be curious what happened here: Did people hate the circular pointer? Was it hard to adopt by app developers? Was it just a random casualty of Liquid Glass’s visual style, or perhaps the person who was the biggest proponent of it simply left Apple? We could all learn from this.

But the most interesting part to me is the resilience of the slanted mouse pointer shape. In a post-retina world, one could imagine a sharp edge at any angle, and yet we’re stuck with Kay’s original sketch – refined to be sure, but still sporting its slightly uncomfortable asymmetry.

The always-excellent Posy covered this [in the first 7 minutes of his YouTube video](https://www.youtube.com/watch?v=YThelfB2fvg):

[![](https://unsung.aresluna.org/_media/the-curse-of-the-cursor/yt1.avif)](https://www.youtube.com/watch?v=YThelfB2fvg)

But specifically one comment under that video caught my attention:

> Honestly, I’ve never thought of the mouse cursor as an arrow, but rather its own shape. My mind was blown when I realized that it was just an arrow the whole time.

…because maybe this is actually the answer. Maybe the mouse pointer went on the same journey [floppy disk icon did](https://unsung.aresluna.org/the-floppy-disk-icon-relies-on-interface-familiarity-not-object-familiarity/%5C), and transcended its origins. It’s not an arrow shape anymore. It’s _the mouse pointer shape_, and it forever will be.