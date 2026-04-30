---
title: "Field notes from the in-between"
source: "https://permissionless.krispuckett.com/"
publishedDate: "2026-04-29"
category: "design"
feedName: "Sidebar"
---

Essay

What Happens When a Designer Stops Waiting

Kris Puckett

12 min read

## I Was Waiting

I have a screenshot from eleven months ago. Xcode open. Empty project. Cursor blinking.

I closed it.

For twenty years I'd wanted to build my own software and have other people use it.

I got my first iBook G4 in 2005. It was the coolest thing I'd ever touched. Every time I opened an app, I was in awe of the icons, the layout, the colors, and how fluid everything felt. I wanted to know how to make something like that.

So I did what any 18-year-old would do. I went to Barnes & Noble. The software section was an entire wall of Windows books, with one tiny shelf tucked in the corner for Mac OS X development. I pulled them down one by one and flipped through.

The problem became clear fast. You had to know a handful of things about software development before you could do anything with what was on the page. You had to know how to code.

Okay, I thought. I guess I have to learn to code.

And then I didn't.

I was self-limiting. Thought I'd need way too much math. Thought there were things I just wouldn't be good at. So I didn't do it. Dropped out of the CS classes I'd signed up for. All DOS and Windows, nothing I cared about.

I could see what I wanted. I couldn't build it.

Twenty years passed.

I had an idea for an app.

An ambient reading companion for the physical books I already held. I wanted to call it Epilogue. There's something I love about an epilogue. The story isn't actually done. There's always something else beyond it.

It would feel as beautiful as the books themselves. I could see every detail. Every interaction. Every moment.

I could see the pixels. I couldn't ship any of them.

So I waited. Just like I'd waited for two decades.

For what? I'm still not sure. The right engineer to appear. The right tutorial. Permission. From a mentor, a friend, someone to say: _you can do this._

Maybe permission from myself.

The things I wanted to build stayed hidden. In my head. In half-finished Figma files nobody would ever see.

I believed less that I was someone who could ship things. More that I was someone who could only talk about building them.

Then AI coding tools showed up. A handful of people started saying something I hadn't heard before. Not _designers should code._ Not _designers should learn to code._ _Designers can code now._

That's a huge shift.

But I still waited.

Because the slogan didn't answer the question that actually kept me stuck:

How do I begin?

I didn't need motivation. I didn't need validation. I needed to know where to put my hands on this thing to start moving it.

I didn't know.

## The Door

Another SwiftUI tutorial. Every tutorial assumed I knew something I didn't. Every guide started in the middle. I'd get through the setup, hit something unexplained, close the laptop.

I'd been through enough of them to know that another one wasn't the answer.

Then I had this stupid, simple thought:

What if I just… asked?

Not “learned enough to know what to ask.” Not “found the right tutorial.” Just opened Claude and talked like I'd talk to a person.

“I want to build an iOS app that tracks books I'm reading. Where do I start?”

“Okay, let's create a SwiftUI project. Here's the code for a simple book list…”

I pasted the code into Xcode and hit Run. A list appeared on the simulator. It was ugly and did almost nothing.

I stared at it for a full minute. Disbelief that it worked. That this was all it took. That I'd been waiting for years over something I could just ask for.

_Wait. That's it?_

That was the door.

The starting point I'd been looking for wasn't a course. Wasn't a bootcamp. It was three words: _I don't know._

“I don't know how to save data between app launches.”

“We'll use SwiftData. Here's how to set up a Book model…”

“I don't know how to make this feel polished.”

“Let's work on the transitions and the loading states…”

Every time I hit something I didn't know, which was constantly, I just asked. And it worked.

I didn't suddenly become an engineer. I realized the bottleneck was never coding ability. **It was articulation.** The ability to describe what I wanted clearly enough that something else could build it.

Designers are already fluent in that. We describe behavior, feeling, and experience for a living. I just didn't know it was enough.

## The Thing That Almost Broke Me

The door doesn't always stay open.

Two months in. I wanted Epilogue to have atmospheric backgrounds: colors extracted from book covers, so every book felt like its own world. Lord of the Rings should glow red and gold. The Odyssey should feel like teal water.

I asked. Claude explained ColorCube algorithms. OKLAB color space. 3D histograms. I understood maybe 30% of the explanation. But I understood 100% of: “Here’s the code. Test it with these books.”

It worked. Lord of the Rings: red and gold. The Odyssey: teal. Magical.

Then The Silmarillion showed green instead of blue.

Three days on this. Three days where every book looked wrong and I couldn't articulate what was broken, because I didn't understand the system well enough to diagnose it. Fix one thing, break two others. Console full of color values that meant nothing to me.

Day two, I tried to rewrite the whole color pipeline from scratch. Made it worse. Day three, I rolled it back and tried a completely different approach. Also worse.

I started wondering if I was kidding myself. If this whole “designer who builds” thing was a fantasy.

2 AM on that third night. Staring at hex codes.

Genuinely considering scrapping the feature. Genuinely considering scrapping the app.

I had to say it again. The same three words that opened the door, except this time they cost something.

“I don't understand why green is prioritized over blue. Here's what the console shows. Here's what I expected. I don't know how the color role assignment works.”

Twenty minutes later, I found it. Fixed it.

The Silmarillion glowed the deep blue it was supposed to.

I sat with that for a moment before closing the laptop.

That night I learned something I keep coming back to: **the skill is being precise about what you don't know.** Vague frustration keeps you stuck. Specific confusion gets you answers.

## The In-Between

Epilogue shipped. It's in the App Store, and real people use it. Fourteen thousand lines of Swift, written through conversation with Claude. Camera-based quote capture that recognizes multi-column layouts. Color extraction that makes every book feel like its own world.

Some days I feel like a fraud. Other days I feel like I've unlocked something. Most days I feel like someone who had an idea and refused to let “I don’t know how” be the reason it didn't exist.

Most of the time, I'm somewhere in between. Building. Adding to a catalog of patterns that work.

Here's what that looks like.

iOS 26 shipped with liquid glass effects, and I wanted them in Epilogue. I added `.glassEffect()` to my cards, and nothing happened. The cards just sat there, flat.

“The glass effects aren't working. The cards just look flat.”

“Are you applying `.glassEffect()` before `.background()`?”

“Yes. I'm using a subtle white opacity to give it something to work with.”

“That's the issue. iOS 26's liquid glass breaks with any background modifier before it. Remove it completely.”

“But won't it need something to apply glass to?”

“No. `.glassEffect()` is self-contained. Apply it directly.”

I tested it. It worked. The cards looked expensive.

I didn't learn how iOS 26 rendering works. I learned _what works_. No backgrounds before glass effects, ever. I wrote it down. The catalog grew by one entry, the way it does most weeks now.

That's the in-between. Not a designer pretending to be an engineer. Not an engineer. Someone who knows what they want, can ask for it, can recognize a real answer when they see one, and writes down what worked. On a thing real people use.

I haven't arrived. I'm not a capital-E Engineer, and I don't think I want to be one. What I am is someone who can take an idea from their head to the App Store, and who isn't afraid of the parts they don't understand. Because not understanding is temporary. It's just a question you haven't asked yet.

## The Question

The person with the vision can now be the person who ships.

Not because we became engineers. The bottleneck shifted. It used to be ability: years of training stood between an idea and software. Now it's articulation. Can you describe what you want clearly enough, specifically enough, honestly enough, including the parts you don't understand?

Designers have been doing that their entire careers. We just didn't realize it was enough.

What have you been waiting for permission to build?

Not what you'll build someday when you learn to code. Not what you'd build if you had an engineer.

What do you want to exist so badly that you're willing to walk into the unknown and just… ask?

The rest is just asking.

Appendix

## The Mechanics, If You Want Them

These aren't prescriptions. I'm still in the in-between. These are field notes.

### Know What, Not How

I kept waiting to “know enough to code.” That was the trap.

I didn't need to know how SwiftUI rendering works. I needed to know _what_ I wanted: “When someone taps a book, show the detail view with an atmospheric background based on the cover colors.”

My designer brain was already fluent in _what_. That was the superpower I didn't recognize.

You learn the _how_ by building, not studying. Build something you actually care about. The concepts show up when you need them. The learning is a side effect of giving a damn.

### “I Don’t Know” Is a Precision Tool

Early on, I'd try to hide what I didn't know. I'd phrase questions carefully so the AI wouldn't realize I was clueless.

Useless instinct. The conversation doesn't judge. Being specific about what you don't know gets radically better results.

“The colors aren’t working” gets a generic troubleshooting list.

“I don’t understand why green is being prioritized over blue. Here’s what the console shows. Here’s what I expected.” gets a real answer.

The questions evolve. That's how you know you're moving.

Month one

“I don’t know where to start.”

Month three

“I don’t know if this architecture is maintainable.”

Month six

“I don’t know the optimal way to handle this edge case.”

Same phrase. Completely different altitude.

Vague uncertainty keeps you waiting. Specific curiosity keeps you building.

### The Conversation Is the Work

“The atmospheric background should feel immersive, like you're inside the world of the book. Ambient, enhanced colors. Not desaturated. More like… alive.”

“Got it. Let me create a gradient system that boosts saturation and uses smooth blending…”

“Perfect, but the blue is too intense. Can we make it more teal?”

“Adjusting the hue toward cyan…”

“Yes. That's it.”

Code happened. What I did was describe, refine, and decide. Those are design skills. I didn't become an engineer. I became a designer who executes through conversation.