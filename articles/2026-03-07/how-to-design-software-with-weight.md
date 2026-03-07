---
title: "How to design software with weight"
source: "https://every.to/source-code/how-to-design-software-with-weight"
publishedDate: "2026-03-06"
category: "design"
feedName: "Sidebar"
---

_TL;DR:_ _Design has always been core to what we do at Every—it’s a big part of what makes our products feel like ours._ **_Daniel Rodrigues_** _is Every’s senior designer, and_ **_Lucas Fischer_** _is the design engineer who helped bring our smart dictation app_ **_[Monologue](https://monologue.to/)_** _to iOS. This is their first time writing for us, and they’re pulling back the curtain on the design process: studying vintage radios, crouching beside light switches to understand how shadows move, and exploring 20 wrong keyboard concepts to find one right one. If you’ve ever wondered what it takes to make software feel like something you could reach out and touch, this is your read.—[Kate Lee](https://every.to/@kate_1767)_

* * *

While designing the [iOS app](https://apps.apple.com/us/app/monologue-smart-dictation/id6755956193) for Every’s smart dictation app **[Monologue](https://www.monologue.to/)**, I **([Daniel Rodrigues](https://x.com/darustudio)**, Every’s senior designer**)** did a lot of things I didn’t expect. I studied vintage radios. Design engineer **[Lucas Fischer](https://lucas.love/)** and I worked with a musician to craft the sound a button makes when you tap it. And at one point in January, I found myself crouched beside a light switch in my apartment, pressing it on and off, watching how the shadow moved. I needed to understand how a real button catches light to make a fake one feel real.

Until recently, [Monologue](https://www.monologue.to/) only lived on Mac desktops. A week ago, [we brought it](https://every.to/on-every/introducing-monologue-for-ios) where most people do their typing: their phones. The app is deliberately sparse—few buttons and a restrained color palette—but each element is designed to feel like something you could reach out and touch, like the light switch on the wall.

What follows is an inside look at the design principles and engineering decisions that we used to make a few buttons on a screen feel like something more.

### Decide where quality matters most

I designed [Monologue’s desktop app for Mac](https://every.to/on-every/introducing-monologue-effortless-voice-dictation) with its general manager, **[Naveen Naidu](https://every.to/@naveen_6804)**, in September 2025, so I had an established design language to work from: a love letter to how using tech devices used to feel, with a black-and-white palette and a nostalgic 1990s vibe that resonates with millennials and Generation Z’s pining for the good old days of tech.

The main difference in designing Monologue for iOS was creating an experience that looked—and felt—good on a much smaller screen. This constraint made the work easier because it pushed us to keep the interface minimal and clean while still infusing it with character.

Before I opened Figma, the key design tool I use, the most important decision was figuring out where to focus my energy. Three things stood out: the onboarding flow, the keyboard, and a recorder for long-form notes.

[![The three screens we spent the most time on (left to right): the onboarding flow, keyboard, and recorder for long-form notes. (Source: Daniel Rodrigues.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_6ec3b870-046a-432f-9b97-454170a3503f.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_6ec3b870-046a-432f-9b97-454170a3503f.png)

The three screens we spent the most time on (left to right): the onboarding flow, keyboard, and recorder for long-form notes. (Source: Daniel Rodrigues.)

The onboarding is a user’s first contact with the app, and we wanted that moment to be a delightful one. The keyboard is what appears when you hit record with Monologue inside any app—it replaces your standard typing keyboard with one that transcribes your voice. The notes recorder is for longer, more open-ended capture, the place you’d go when inspiration about a side project strikes on a walk, and you need to get it down somewhere, stat. The keyboard and notes recorder are the screens users would use every day, the ones they’d remember.

[![Uploaded image](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/advertisements/942/optimized_b250c18c-217e-46c1-85a1-15f711fb4c28.png)](https://www.augmentcode.com/intent?utm_source=every&utm_medium=newsletter&utm_campaign=feb)

#### What comes after your IDE? Intent.

Stop herding AI agents across terminals and branches. Intent bundles each task into a single workspace with a living spec, agent notes, and full change visibility. Orchestrate agents like a system, not a swarm: Direct specialists, keep work aligned, and ship without copy-pasting context. Works with Augment, Claude Code, Codex, or OpenCode.

Everything else—the screen that shows statistics like words dictated and time saved, or the dictionary feature where you can add your own vocabulary to improve transcription—was a translation of what we’d already built on Mac. Important, but not where a user’s heart would be won (or lost).

### Let failed concepts clarify direction

Once I knew where to focus, my first step was abundantly—some might even say wastefully—exploratory. For the keyboard, I ran an internal “keyboard competition” getting input from our creative director **[Lucas Crespo](https://every.to/@lucascrespo)**, Naveen, and Lucas: I designed around 20 different concepts in Figma, knowing full well that most weren’t quite right. Those wrong answers were in no way a wasted effort. When you’re trying to define what you want, it helps enormously to have a clear visual understanding of what you _don’t_ want.

[![A few of the contenders in our internal keyboard competition for the iOS app. (Source: Daniel Rodrigues.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_eeca0af5-4b97-4e90-b6f0-15871e94c18a.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_eeca0af5-4b97-4e90-b6f0-15871e94c18a.png)

A few of the contenders in our internal keyboard competition for the iOS app. (Source: Daniel Rodrigues.)

From those 20 concepts, we narrowed our options down to about five strong candidates, then started combining elements from each: the button proportions from one, a typographic treatment from another, a specific approach to shadow and depth from a third. The final keyboard design that made it into the app was assembled from the best fragments that survived this process.

### Translate weight, shadow, and touch into software

The vision for the iOS app was for it to exist beyond pixels, crossing the divide into the real world we inhabit. I wanted the keyboard and the notes recorder to feel tangible, like objects that could sit on a desk in front of you. [Skeuomorphism](https://every.to/learning-curve/the-problem-with-human-like-ai) has been accused of being overdone, and fairly so, but I think of it as borrowing the credibility that physical things naturally have, like weight, shadow, and texture. Something similar to the way a real button communicates—without explicit explanation—that it can be pressed.

I studied devices made by Braun, the German company whose radios and calculators became icons of industrial design, and Teenage Engineering, a Swedish electronics company known for making synthesizers and gadgets that feel like toys in the best possible way. I was trying to understand how physical buttons behave. I wanted to know, for example, how their shadows shift when pressed when they catch light in specific ways.

[![Devices from Teenage Engineering (left) and Braun (right) that I took inspiration from. (Source: Teenage Engineering and Wikimedia/Every illustration.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_6754f574-d72c-43c5-ace0-1f09b5f8f73f.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_6754f574-d72c-43c5-ace0-1f09b5f8f73f.png)

Devices from Teenage Engineering (left) and Braun (right) that I took inspiration from. (Source: Teenage Engineering and Wikimedia/Every illustration.)

I tried to mimic this in Figma, but some details resisted translation. The pressed state of the notes recorder was the hardest: I understood how a physical button behaves when depressed (that’s the anecdote about me crouching beside a light switch from the introduction), but knowing what it looks like in real life and reconstructing it on screen turned out to be two very different problems. I couldn’t get the shadows right.

So I asked [Google’s image editor Nano Banana](https://every.to/context-window/the-best-bang-for-your-model-buck) a simple question: How would this button look if it were pressed? It generated an image that gave me the input I needed to mimic that in Figma. It was much easier for me to work from a visual than to reason abstractly about how light should behave.

[![The notes recorder with the “pause” button pressed down. (Source: Daniel Rodrigues.)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_b67db284-5371-4e6e-895f-38d3c4b29d60.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_b67db284-5371-4e6e-895f-38d3c4b29d60.png)

The notes recorder with the “pause” button pressed down. (Source: Daniel Rodrigues.)

Translating that sense of physicality from Figma into the app was the next step. Rather than exporting my designs as static image assets, Lucas built every button and UI control natively in SwiftUI, Apple’s framework for building interfaces. In practice, each element on screen isn’t a flat picture of a button; it’s a living, programmable object. This lets the app animate transitions—the small visual shifts that happen when a button is pressed for the app to go from idle to recording—in ways that feel genuinely physical.

We also layered in sound effects and haptics—the tiny vibrations you feel when you tap your phone sometimes—so that users could hear and feel the app. Every sound in Monologue is custom-performed by a musician, including the ones that play when you start and stop a recording. We focused on this especially in the onboarding flow because people are often multitasking when they open a new app—walking down the stairs or bagging groceries—and sound and touch cut through that in a way visuals alone can’t. A crafted sound paired with a small pulse in your palm, the moment you open the app, gets users to pay attention.

### Make every interaction coherent—and easy to test

A design can look beautiful in a static mockup and still fall apart in practice because it’s not intuitive to use. Once I had a direction, the next step was stress-testing it against every “state” it needs to support. In design, a “state” is every version of the UI a user might encounter while using the app. For the keyboard, that meant: What does it look like when it’s sitting idle, waiting for input? What about when it’s actively recording? What happens visually when a user cancels mid-dictation, or when something goes wrong, and you need to surface an error?

Each of those moments needed to feel coherent within the same design language. The keyboard we shipped was the one where everything cohered: It looked right, _and_ it made sense at every point in the interaction.

The challenge for Lucas on the engineering side was keeping up with the pace of iteration. Monologue’s keyboard has a lot of states, and the initial prototype made it painfully slow to test any of them. Even a small change required “recompiling” the entire app (essentially waiting for the computer to rebuild the whole application from its source code, even if you only tweaked one tiny detail), and only then seeing whether an adjustment worked. When you’re trying to polish dozens of subtle visual details across dozens of states, that kind of friction kills momentum, not to mention the joy of development.

So Lucas rebuilt the keyboard from scratch with a clear separation between how it looks and how it works under the hood. Then he built a SwiftUI playground for it—essentially a live sketchpad of sorts where we could see changes to the keyboard instantly, without restarting or rebuilding anything. We ended up using this pattern of engineering across most of the app’s components: Each feature has its own playground, so we can test how it looks and feels in isolation without waiting for the full app to recompile every time.

[![A SwiftUI playground used to iterate on Monologue’s keyboard UI in real time, without rebuilding the full app. (Source: Lucas Fischer)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_7ba05cfe-7a1f-4b4c-be45-958e9e52093c.png)](https://d24ovhgu8s7341.cloudfront.net/uploads/editor/posts/3951/optimized_7ba05cfe-7a1f-4b4c-be45-958e9e52093c.png)

A SwiftUI playground used to iterate on Monologue’s keyboard UI in real time, without rebuilding the full app. (Source: Lucas Fischer)

### Product design for AI tools that people love

Not every AI product needs skeuomorphic buttons and custom sound effects, but the bar for what “functional” means is shifting. AI is making it faster and cheaper to build “functional” products, so the ones that endure are those where someone thought about what it _feels_ like to use them. For us, that meant studying physical objects, exploring 20 wrong directions to find one right one, and hiring a musician to build sounds we could have pulled from a stock library.

The principles behind those decisions are portable: Figure out which parts of your product users will use daily, and let yourself over-invest there. Explore directions you suspect are wrong, because they’ll sharpen your sense of what right looks like. When something on screen feels too thin, look at the physical world for cues. And test your designs against every messy, unglamorous state a real user will encounter. That’s what we did, and it’s how a few buttons on a screen ended up feeling like something we’re proud of.

* * *

_Monologue is now on iOS for everyone to experience their voice as a keyboard—wherever they are. [Read about the features](https://every.to/on-every/introducing-monologue-for-ios), including whisper mode and how to take long-form notes, and [download the app](https://apps.apple.com/app/id6755956193?source=post_button)._

* * *

_Thanks to_ **_[Rhea Purohit](https://every.to/@rhea_5618)_** _for the editorial support._

**_[Daniel Rodrigues](https://every.to/@daniel_5fbd21_1)_** _is a senior designer at Every. You can follow him on X at [@darustudio](https://x.com/darustudio) and on [LinkedIn](https://www.linkedin.com/in/danielrodux/)._ **_[Lucas Fischer](https://lucas.love/)_** _is a full-stack design engineer._

_To read more essays like this, subscribe to [Every](https://every.to/subscribe), and follow us on X at [@every](http://twitter.com/every) and on [LinkedIn](https://www.linkedin.com/company/everyinc/)._

_We [build AI tools](https://every.to/studio) for readers like you. Write brilliantly with_ **_[Spiral](https://writewithspiral.com/)_**_. Organize files automatically with_ **_[Sparkle](https://makeitsparkle.co/?utm_source=everyfooter)_**_. Deliver yourself from email with_ **_[Cora](https://cora.computer/)_**_. Dictate effortlessly with [Monologue](https://monologue.to/)._

_We also do AI training, adoption, and innovation for companies. [Work with us](https://every.to/consulting?utm_source=emailfooter) to bring AI into your organization._

_Discover Every’s [upcoming workshops and camps](https://every.to/events), and access recordings from past events._

_Get paid for sharing Every with your friends. Join our [referral program](https://every.getrewardful.com/signup)._

_For sponsorship opportunities, reach out to [\[email protected\]](https://every.to/cdn-cgi/l/email-protection)._

_Help us scale the only subscription you need to stay at the edge of AI. Explore [open roles at Every](https://www.notion.so/Jobs-Every-25cca4f355ac80c5ad6ee7a6e93d6b4e?pvs=21)._