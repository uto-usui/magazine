---
title: "Show your hands honor for the strange power they bring you"
source: "https://aresluna.org/show-your-hands-honor/"
publishedDate: "2026-06-23"
category: "design"
feedName: "Sidebar"
---

Marcin Wichary

18 June 2026 / 7,700 words / 38 playgrounds

## On designing finger-friendly interactions

A hundred or so years ago, there was a problem. People were simply typing too fast.

I know what you’re thinking: they were typing too fast for the primitive typewriters of that era. But contrary to popular belief, typewriters were never _that_ primitive. You could type really fast on even the first popular typewriter, and the QWERTY layout was actually designed [to allow you to do just that](https://aresluna.org/the-primitive-tortureboard/).

No, people were typing too fast for what we thought our bodies were capable of. With our understanding of neurons travelling inside our brains, processing of the senses, and physical capabilities of the fingers, typists should have maxed out at just above 40 words per minute.

They routinely did 70 words per minute or more.

It turns out, fingers are time travellers. At any given moment, each one is living in a slightly different time – as one finger is moving down to press a key, another is already travelling to the next one, and your brain is thinking of a few keys in advance, visualizing your hands moving to the right place.

![](https://aresluna.org/images/show-your-hands-honor/old-typewriter.avif)

A 1897 photo of a dispatching station for Michigan Central Railroad, with two typewriters visible

None of this requires touch typing. What we eventually called overlapping happens even if you reside at the awkward intersection of “hunt” and “peck.” Overlapping is a small miracle happening in front of your eyes, and it happens pretty much to everyone.

A capability of our hands and brains to treat our fingers relatively independently, and allow them to move at their own pace without waiting for other fingers (on the same hand) to finish.

Also, it’s far from the only miracle. Our hands are amazing, our fingers are amazing, and our brains are amazing, too. Altogether they are capable of feats that not so long ago made absolutely no scientific sense – and sometimes still don’t today.

Artists and performers have known that intuitively for centuries. Today, a lot of creativity _and_ productivity happen onscreen, but our interfaces do not often respect the fingers the same way older instruments did.

I want to tell you more about it, and about your responsibility, as a designer, to make sure they do.

* * *

## The early lessons in optimism

##### This is an interactive essay.

You can turn off the sound, keep track of your tasks, or navigate using the menu at the top of the screen.

Your progress will be saved between sessions.

When computers were refrigerator-sized machines hiding in rooms humming with the best of 1960s air conditioning technology, any interaction with them was appropriately cold: the only contact they allowed was remotely, via a terminal.

A terminal was a desk computer with the expensive parts taken out. It had a bad CPU, little memory, and scant logic. Early on, it had no screen either, and used a printer or even a typewriter as its human-facing interface.

An old computer with an onsite console for technicians and operators, and an example of a faraway terminal for actual users. The concepts of a console and a terminal survive today in software form.

Given these limitations, the simplest way to build keyboard operation was this: each keystroke had to travel all the way to the big computer via a slow modem, and only its echo was printed when it came back to you, after The Machine confirmed its arrival.

That roundtrip created a delay. That delay made typing extremely unpleasant:

##### Typing with a slow echo

-   Click into the input field and type your full name

Terminal

Latency

Input inhibited

It was sometimes even more unpleasant than what you experience here: an ear-piercing beep or, on top of that, the terminal _physically locking the keyboard_. (Do you know that feeling when you are walking downstairs and you slam your foot on the ground, because you thought one more step was still coming? Imagine that happening to your fingers, all the time, throughout the day.)

The first solution to this problem was to create a buffer, so you didn’t have to wait to type the next keystroke. The locking or the beeping now happened only when you typed so fast you filled up the entire buffer:

##### Typing with buffers

-   Click into the input field and type your full name
-   Explore latency and buffers to see how they feel

Terminal

Latency

Buffers

Buffers in use

Bfr overrun

The delay was still there. But as long as the keys themselves aren’t dirty or sticky, it shouldn’t matter, right? After all, fingers are so good that they don’t need confirmation from your eyes. Fingers are so good that they sometimes press Backspace for you, without you looking, without you even realizing, just because they can sense on their own that the previous key press was misplaced.

But by the 1960s typing evolved from just retyping memos to creative writing, programming, and other less rigid forms of using the keyboards. Arrow keys arrived first; displays entered the picture soon afterwards, and then full screen menus entered _that_ picture. If you’re not looking at the keyboard, where else will you be looking at other than the screen, continuously and hopelessly delayed?

And you’re never supposed to be looking at the keyboard – this is actually important for motor memory to develop!

Evolution of computer keyboard use in the 1960s and 1970s – from command line, through forms, to menus

So, the next invention was something called “local echo.”

Local echo was a white lie. Your keystroke was now shown on the screen immediately and _optimistically_, assuming it makes it to the computer undisturbed. It seems like the most obvious solution, but it does add complexity over what came before: now your terminal can’t truly be [dumb](https://en.wiktionary.org/wiki/dumb_terminal), and you have to deal with configuring both sides of the system so that only one echo is present, instead of zero… or two:

When the confirmation of an action is shown on the screen immediately, before it gets transmitted back by the server or the computer. This is done to make the UI appear to operate faster than it does. For updates that are important, special accommodations need to be made to check and convey to the user if the update confirmation never arrives (e.g. the optimism was misplaced).

##### Typing with a local echo

-   Click into the input field and type your full name
-   Play with latency and echo options

Terminal

Local

Remote

Echo

In this way, we traded some of the newfound computing power to recreate something we already had fifty years before: typing operating at the speed of fingers.

But not before the slow transmission speeds already put its imprint on the software of this era; the cryptic short commands of Unix and the mega-cryptic interface of a [popular editor vi](https://pikuma.com/blog/origins-of-vim-text-editor) are both reported to be optimized for a soon-to-be-gone era.

This will be a theme of this essay.

* * *

“Fifty years before” was 1910s – the first era we started analyzing and understanding typing. But the early mass-produced typewriters arrived another half a century earlier than that, and piano keyboards were even older. This means our deeper understanding of fingers and typing arrived mostly _alongside_ the typewriter, not ahead of it.

1870sFirst QWERTY typewriters

1890sExperiments in touch typing

1910sQWERTY and touch typing standardized

1940sFirst work in ergonomics (a.k.a. human factors)

1950–70sInstitutional computers

1980–90sHome (micro)computers

Late 2000sModern multitouch smartphones and tablets

The early timeline of keyboard use

Best example? The rise of touch typing. The first popular QWERTY typewriter was designed to be fast – one of the first use cases was writing down Morse code signals in real time, and those casually reached 50 words per minute. That speed, miraculously enough, was available with what today we’d call hunting and pecking.

Touch typing manual covers

The arrival of the keyboard made people dream of more, including the vaunted notion of transcribing someone talking in real time. In search for that dream, multiple people chipped away at “touch typing” – nine fingers on the keyboard, eyes off of it. The effort took decades to develop, many saw it as a fad, and no one fully agreed on what “proper” meant for some years more.

Touch typing on typewriters never achieved transcription speeds for human speech, which are estimated to be about 150wpm for English. For that, special [steno keyboards](https://en.wikipedia.org/wiki/Stenotype) are necessary, which type in syllables and enable chording (pressing many keys at once).

By the 1910s, touch typing was properly established and rather popular, and stayed with typewriters until the end of their time. But the early and awkward computers (and terminals) of the 1940s, 1950s, and 1960s came with clunky “laboratory” keyboards that were often worse than even early typewriters. It made sense – why would you care about touch typing if remote echo and the absence of buffers rendered it impossible?

“Laboratory keyboards” of 20th-century computers

* * *

## The front-end brain and the back-end brain

But ergonomic progress can be uneven. Only a decade later, in the 1970s, things would change dramatically. As computers became smaller and faster and increasingly less remote, and equipped with echos and buffers, their keyboards needed to get better, too. They started stealing many lessons from the best typewriters before them and, unencumbered by mechanical typebars, became a lot more ergonomic than typewriters ever could – which, in turn, allowed for the fingers of the operators to move really, really fast.

And the mechanical advantage was joined by a geographic one. If your computer is now just a few inches away from your keyboard – or literally hiding inside it – local echo and buffers become historical curiosity, right?

Not quite, as smaller computers were also much slower than the large ones. Moreover, now it wasn’t just keys and typing that needed to feel fast. Keys on the keyboard are nothing more than buttons. In the 1970s and 1980s, computer _screens_ became equipped with buttons, too – first operated by keyboards with newly-invented arrow keys, then by mouse. The old concepts became relevant again.

Try pressing these buttons that do not react “in finger time,” and see how unpleasant it feels:

##### Slow magnet poetry

-   Press buttons to create magnet poetry

Mouse event latency

Button processing time

Busy

Reset

Learning from the past, we can imagine adding buffering here. This is useful, but only to a point. The actions might be buffered and processed as fast as possible, but the mouse events will also have to wait in line. So even a computer that’s plenty fast to draw a different button state instantly when your mouse is on top of it or when you press it, won’t be allowed to do so until the buffer is exhausted:

##### Buffered magnet poetry

-   Press buttons to create magnet poetry. Try to press them as quickly as you can!

Mouse event latency

Button processing time

Buffers in use

Busy

Reset

This still feels awful. A dirty, sticky button in real life would already feel unpleasant. Here, a button feels dirty and sticky in a profoundly alien way, without real-life’s haptic signals that allow your brain to understand what’s going on. Physically locking keys in the typewriters of yore felt bad. But so is suspending the interface even momentarily whenever the computer is not ready to deal with it.

“Haptic” means stuff related to the sense of touch, and “haptics” is the touch response of technological objects, and modern science of faking physical responses to human touch that makes objects feel better. Examples: synthesized clicks of modern Apple trackpads, or vibration motors in smartphones.

In jargon, this is often called UI blocking.

(If your designer doesn’t hate UI blocking with passion, you need a new designer.)

Refers to actions that completely prevent the interface from reacting. In modern operating systems, the mouse cursor itself never gets blocked, but this can refer to non-responsive buttons and other controls, or not being able to type into fields and drag windows around.

One cheap answer is debouncing – slightly delaying responses to any heavy action to allow the interface to catch up with simple things before the computer takes on a heavier thing. It’s nothing less than a distant echo of the local echo concept.

A way of dealing with and smoothing out a lot of small events in a short amount of time. Comes from [real-world switches](https://en.wikipedia.org/wiki/Switch#Contact_bounce) (like light switches), where the physical change from “off” to “on” could be messy (bouncy) and transition between the two states many times in rapid succession.

But the best answer is splitting the computer’s attention into two tracks. The “back-end brain” can deal with heavy actions and buffer them as necessary, while the “front-end brain,” working in parallel, processes interface events in real time, with absolutely zero chance of blocking the user interface:

This is how a mouse pointer operates on all computers today. The mouse pointer movement is always on a separate CPU thread, so it never freezes and breaks the illusion. However, the same cannot be said about the touch keyboards on smartphones, which can become UI blocked and stop reacting in a disturbing fashion.

##### Parallel UI thread

-   Press buttons to create magnet poetry. Try to press them as quickly as you can!

Button processing time

Buffers in use

Busy

Reset

But even this method still has caveats. Once you put something in a buffer, the buffer needs to exhaust itself.

We’ve all been there: we held an arrow key to move an object, realized that the computer was slower than we thought, started holding the arrow in the opposite direction, overshot, and got in a weird and frustrating oscillating game:

##### Exhausting a buffer

-   Hold the → key to move the window to the shown position
-   Adjust both sliders and learn the relationship between them

↑ Key repeat time ↓ Window move time

Buffers in use

Busy

Emergency stop

This problem has no easy solution.

The Emergency Stop button above is kind of a joke, but one could imagine a special shortcut like Esc or ⌘. that clears the buffer immediately. The user has to know about it, though, and that shortcut itself by definition cannot be put in a buffer, which might be problematic.

You can also distinguish between holding a button and pressing it many times and try to account for that. Both are implemented below:

##### Smarter buffer

-   Hold the → key to move the window to the shown position. Notice how holding it doesn’t create buffer problems, but on the other hand, the system still remembers (buffers) all your quick individual presses.

↑ Key repeat time ↓ Window move time

Buffers in use

Busy

Emergency stop

But the best answer is, as always, to make the interactions as fast as possible, for the delays not to happen, and for the buffer to rarely be necessary: to do everything in your power to show the feedback to the user at the speed of the fingers.

Fortunately, today’s superfast computers should make it trivial, right?

* * *

## The (actual) need for (perceived) speed

The tricky part, of course, is that computers are not necessarily faster today than they were in the 1990s. I know, _technically_ they are, but often the Moore’s Law advances are spent on [new things](https://unsung.aresluna.org/if-you-use-your-computer-to-do-important-work-you-deserve-fast-software/) we ask computers to do, or new abstraction layers in between.

If your computer happens to be struggling under load, many of the above trivial examples solved by the 1980s can still become too slow for your fingers today. And, what we expect of computers is no longer trivial. There might be no better example to this than as-you-type search, showing you results at the moment of typing. The sheer computing power to make this feel great was available in the 1990s, if not the decade prior.

But then, the internet reintroduced some of the remote woes of the 1960s, the new intermediary of the internet browser (and later, JavaScript libraries) ate away a lot of the speed benefits, and echoes and buffers carefully implemented in operating systems didn’t magically become available to websites.

Today, a lot of badly put together searches are still UI blocking, making you wait after each keystroke. Others don’t handle well the common situation of a user changing the search as the results are already flying in:

##### Bad search-as-you-type

-   Search for “AT&T” or “Fujitsu” in this bad implementation of search-as-you-type, and accept with Enter. Notice your keystrokes are blocked, and the results arrive haphazardly.

Search

Latency (average)

Emergency stop

We take for granted searches that handle all of this well and always feel snappy regardless of weather – Google’s Autocomplete, or Raycast. Their secret? They, too, know it’s okay to lie.

* * *

People will tell you that the job of loading states – progress bars, rotators, “[skeletons](https://www.nngroup.com/articles/skeleton-screens/)” of things to come, and cute animations – is to tell users precisely what’s loading, and how long will it take to arrive. But if there’s one thing I learned about loading states is that that’s not exactly true. The one and only one purpose of loading states is to make software feel as fast as possible, _by all means necessary_.

A road to a slow interface is paved with fast intentions. The first building block is choosing the right loading state for the job. One that’s too heavy can make the interface feel slower, and make the user intuitively slow down in response.

##### Basic loading states

-   Double click on the icons to explore various loading states

Delay

Above, all of the loading states are _functionally_ correct, but you can get a sense that a lot of them are heavy and/or overkill, drawing more attention to the fact of loading than necessary.

![](https://aresluna.org/images/show-your-hands-honor/tshirt.avif)

I’m sorry, I am obsessed with [this joke](https://xcancel.com/shutupmikeginn/status/403359911481839617).

And so, the second building block is then knowing when _not_ to show up, sometimes just holding tight, and other times pretending (via optimistic updates) that things are faster than they are.

##### Shy loading states

-   Double click on the icons to explore various loading states

Delay

And it’s especially things that are immediately glued to your fingers that cannot participate in loading states. Your brain can understand waiting. But fingers cannot, always operating in real time.

This is true with keys and buttons – we already talked about how blocking keys physically or via beeps was never going to work. But it’s even more important when applied to more complex interactions. Touching an object is one thing. _Holding_ an object and having it not react in real time is even more disturbing.

My go-to numbers are: to feel good, the mouse needs 30fps or more (so, 33ms or less), touch 60fps (17ms) or more, a pencil 120fps (8ms), and keyboards start feeling slow when the delay gets to 50ms on the software side (software adds to the typical 20–40ms latency already happening in hardware).

The classic example here is [Macintosh in 1984](https://infinitemac.org/1984/System%201.0), which showed a little outline when you dragged or resized a window. The outline was an admission the computing power wasn’t there to do this in real time, but it was also a clever loading state, understanding that the speed of a rough approximation was a lot more important than full, but slow fidelity:

##### Dragging a window

-   Drag any window to move it

Window move time

##### Dragging an outline

-   Drag any window to move it

Window move time

* * *

And there is even more to loading state chicanery. The art of making something feel fast is so labyrinthine that sometimes you might want to deliberately _introduce_ a delay for good cause.

Here’s a simple example you might have never noticed. If you’re reading this on a Mac, press ⌘Tab but don’t release ⌘ – you should see icons of recently used apps.

![](https://aresluna.org/images/show-your-hands-honor/windows-95-task-switcher.avif)

The first modern visual task switcher in Windows 95

But now tap and release ⌘Tab quickly. The interface never shows up. If the main use case for the app switcher is to jump back and forth between last two apps, a huge battery of icons appearing and disappearing would just distract you – so the visible part of the interface is always slightly delayed.

##### App switcher delay

-   Press OptionAltTabQ (and try holding OptionAlt) to simulate app switching
-   Switch threshold to 0 and see how it feels

Threshold

Hold before showing

Another example: Chrome will cleverly wait with rearranging its tabs so you can easily press × a few times in a row, rather than having to reposition and hunt each tab’s close box over and over again.

##### Browser close tab delay

-   Create a few new tabs, then close what is the first remaining tab over and over again by clicking on its close box

Delayed tab rearranging

Tab drag dead zone

The modern “streaming” interfaces for AI interactions also use this well, choosing to show you stuff faster in smaller chunks, even if sometimes this means the entire conversation will arrive later:

##### Text streaming

-   Launch text generation and compare different methods
-   Experiment with speed sliders

Paragraph/Remote speed

Word/Local speed

Streaming is waiting

Emergency stop

And to go back to the search-as-you-type: It is all fixable, but it requires care and nuance in putting together some of the things we already learned. Keystrokes need to be output immediately and optimistically – no exceptions. The search cannot block the interface, and should be debounced for 100ms or so after each keypress before sending a request online. The results coming back need to be compared with the search word as it exists at that moment, and only shown when they match. Results should be cached, and if you’re really good, you will do the same thing as fingers already do, and anticipate the future: autocomplete the search quietly in the background, and queue up the results in advance, so they’re ready to show immediately when the user finishes typing.

This small delay can, counterintuitively, make search become faster, as the unnecessary intermediate queries for incomplete searches don’t saturate your network.

If done well, this feels like magic – overlapping fingers and overlapping network requests flying past each other in beautifully chaotic choreography.

##### Good search-as-you-type

-   Search for “AT&T” or “Fujitsu” in this better implementation of search-as-you-type, and accept with Enter.

Search

Latency (average)

Debouncing active

Cached

Rejected

Result

But the repertoire of magic tricks of fingers extends past overlapping. To dig deeper, we have to rewind and face an uncomfortable truth: Caps Lock existed before Shift did.

* * *

## Two keypresses are not better than one

It feels counterintuitive, but it might make sense when you think about it. Caps Lock is not an improvement over Shift. They’re just two interfaces over the same idea. Caps Lock is a traditional mode toggle; Shift is a momentary toggle, sometimes called a spring-loaded mode.

The [first typewriter to introduce small letters](https://www.youtube.com/watch?v=qPc03SaoiUY) had two keys: one to enable uppercase letters, and another one to disable them. It was a Caps Lock split into two…

A mode that persists as long as a user action is being performed – the moment it’s not, the interface snaps back to its previous state (as if assisted by a spring). Other examples are push-to-talk keys in videogames, dragging a window, and the text selection magnifying glass in iOS. A particular version of this idea is [dead man’s switch](https://en.wikipedia.org/wiki/Dead_man%27s_switch), when a whole machine can only operate when spring-loaded. (Jef Raskin in his excellent book The Humane Interface tried to cheekily suggest a name “quasimode”.)

![](https://aresluna.org/images/show-your-hands-honor/first-shift.avif)

…and it just wasn’t too much fun to use:

##### Two separate Shift keys

-   Type your full name. Use Tab to enable uppercase letters, and Shift to switch to lowercase.

Hello

Caps Lock

But this was all happening around the time when various touch typing inventions were rocking the world, and someone had an idea: Why don’t we use the fact that typists usually have another hand’s finger… handy?

And so, Shift was born. Instead of pressing three keys in sequence, grab a letter with one hand and use Shift with your other one roughly at the same time. Further improvement? Put two identical keys on both sides of the keyboard so that there’s a Shift for every hand. Another one? Make the keys larger to satisfy Fitts’s Law!

An [equation](https://en.wikipedia.org/wiki/Fitts%27s_law) that describes that the further something it is from where the user is currently pointing (with their mouse or their fingers), the larger the target should be if you’re interested in preserving the speed and accuracy of pointing.

One [fantastic typewriter](https://site.xavier.edu/polt/typewriters/underwood5.html) did this in 1901, and proceeded to sell like hotcakes. It’s a layout we’ve been using ever since.

![](https://aresluna.org/images/show-your-hands-honor/underwood-5.avif)

Underwood №5, the first bona fide hit of the typewriter industry

There were more ideas floating around that time which ultimately lost – from two or three Shifts, to no Shifts at all.

Late 19th-century typewriters: Helios (three shifts), Blickensderfer (two shifts), and Caligraph (zero shifts!)

And there might be some among you who already had the obvious next idea: You don’t really need both Caps Lock and Shift. Pressing Caps Lock and holding Shift are two mutually exclusive operations, so there’s no real reason they couldn’t be colocated on one key.

If this was ever considered back when the 19th century was passing the torch to the next one, it was probably too complex for the mechanical world. Later on however, when computers came around, some engineers – forever unhappy that Ctrl lost to Caps Lock in a battle for the coveted “big key next to A” position – started to modify their keyboard software to do exactly that. On their keyboards, Shift works typically, with one addition: if you press it just like a regular key, it does what Caps Lock does. Then, the Caps Lock key itself, undeserving of its keyboard location no matter how you slice it, can be reassigned to do other things.

Except in Japan.

##### Joint Shift/Caps Lock

-   Type some names of your friends. Shift works normally, except a standalone press enables Caps Lock

Hello

Caps Lock

I wonder why this solution didn’t stick. The closest to mainstream success I’ve seen it was on the NeXT keyboard, which did exactly that and called it “AlphaLock,” even putting lights on both Shift keys.

![](https://aresluna.org/images/show-your-hands-honor/next-keyboard.avif)

NeXT keyboards had more [interesting ideas](https://aresluna.org/steve-jobs-jef-raskin-and-the-first-great-war-for-your-thumbs), like removing the function keys or a Command bar underneath the spacebar, but none of them survived the reunification with the Mac in 1997.

And yet, the spirit of a joint Shift/Caps Lock key lives on on your Mac even today. Press the F3 (Exposé) key, and it behaves differently whether you press it quickly (and then press it again to go back), or hold it (in which case the key release is what restores the order). Here’s another example from earlier Mac keyboards:

##### Show desktop press vs. hold

-   Press D to show the desktop
-   Hold and release D to show the desktop momentarily

Press vs. hold threshold

100

Timer after

Mode

The latter quasimode is yet another kind gesture to people whose fingers want to move just a bit faster. It’s the same thing with most menus you encounter: you can click to open one and then click again on the relevant item, or you can click _and drag_ to select something just a bit faster and more fluidly.

##### Menu press

-   Select any option in a menu by clicking

Menus active

##### Menu drag

-   Select any option in a menu by dragging

Menus active

Drag

This works even on iOS menus, with your finger. It works even on its keyboard, where you can drag your finger over the keys instead of tapping them one by one.

This allows for something magical, when slow keypresses become fast _gestures_. But you also have to be careful.

* * *

## The ruthlessness and the beauty of motor memory

One of my most stressful moments at an airport had nothing to do with flying.

I was about to board a cross-Atlantic flight. I grabbed my computer, absentmindedly typed in my password – and instead of all my windows popping open, I saw the password window shake and stay put.

One NeXT convention that _did_ make it to present day.

I made nothing of it. One of my fingers must have slipped. I typed my password again, but I saw the same disappointed reaction.

After the third time, I got a bit worried. The word “absentmindedly” above was part of the deal. Passwords feel like they exist solely in the fingertips, and getting them out of there is usually asking for trouble. How often has someone asked you about a password or a common shortcut, and you simply couldn’t tell them? The only way to share it was to… actually watch your fingers type it in, as if they belonged to someone else.

I started retyping the password more deliberately, all the while knowing that deliberation makes things worse. (Dancing, skiing, even walking up the stairs all benefit from us _not thinking about our movements_ and the moment we do, we slow down and make mistakes.) It didn’t work. On top of that, there was another ticking time bomb: A computer cannot tell someone who genuinely forgot their password from someone who methodically tries common passwords to hack into the account. So, at some point, I started seeing artificial delays introduced to thwart the second group of people. Now I had to wait a minute before trying again. Then 2. Then 5.

![](https://aresluna.org/images/show-your-hands-honor/airport.avif)

Every extra delay made me think about the password even harder. Did I actually change it? Is something wrong with my computer? The prospect of not being able to do anything during the long flight was [harrowing](https://www.youtube.com/watch?v=JBBQdFSvvTE).

Only then, over half an hour into this stressful situation, I spotted something in the corner of the screen: My keyboard was, somehow, switched to Hungarian. I had no idea how it happened. I was pressing the correct keys all along, but typing the wrong pasword.

I changed the layout to English, waited for the OS to allow me to try again, and nervously – knowing that a mistake would cost me 15 more minutes – typed in the password the same way I did it a million times before. I got in.

* * *

This isn’t a story about a forgetful user, a hostile computer, or an age-old tension between usability and security. This is a story about the power of motor memory.

Our brain’s ability to learn movements in order to automatically and masterfully repeat them. Often known as “muscle memory.”

Turns out, passwords and keyboard shortcuts _do_ exist in your fingertips. Figuratively, of course. The brain is still in charge, but it’s a separate part of the brain with a separate set of rules. There are barriers between regular declarative memory, and motor memory: this is why it’s hard to ask your fingers for what the password is after you typed it often enough to not think about it at all.

Heh.

The “not thinking about it at all” property of motor memory allows you to do wonderful things like typing while thinking, typing while talking to someone, typing while watching TV, dragging something with your mouse instinctively, and so on. Motor memory is so good it will stick with you for years. Scratch that, [for decades](https://newsletter.shifthappens.site/archive/shift-shift/).

Keyboard shortcuts are named aptly: they allow to jump past parts of your brain, leaving them unburdened, so that those parts can focus on more important things.

But software has to treat motor memory with respect. At some point, my Mac should’ve hinted that maybe my keyboard was in a different language than the one the password was originally typed in, the same way modern operating systems warn you your Caps Lock might be on.

Although the latter could’ve also been a hint to a possible hacker.

So yeah, motor memory has a life of its own and can feel, at times, downright dangerous. But when hardware and software understand its nuances and powers, some beautiful moments happen.

* * *

Take, for example, another hard-won invention: undo. In early computers, where even a 16-character keyboard buffer was a huge expense, it was hard to imagine spending memory on a history of your actions you could revisit at will. Undo simply didn’t exist for the first few decades, and multi-level undo only started appearing in the late 1990s. Computers waited for undo almost as long as typewriters for a proper Backspace that [lifted letters from paper](https://www.youtube.com/watch?v=YE0U018Copw).

![](https://aresluna.org/images/show-your-hands-honor/undo.avif)

Early take at the classic quartet of keyboard shortcuts, and a glimpse at an alternate universe, from [work-in-progress Apple Lisa](https://archive.org/details/apple-hig/1980_Lisa_UI_Standards/page/14/mode/2up) in 1980.

Just like with Backspace, we take undo and the safety of experimentation it provides for granted. And part of the secret power of undo is its magnificent shortcut. The “Z” in ⌘CtrlZ doesn’t really mean anything mnemonically. It’s just a fun and quick combination to press together. But that was important. Being easy to press means it’s quicker to lodge itself in the motor memory, means you start using it habitually, means you feel safer doing stuff on your computer you might have been afraid to do before.

It’s a virtuous cycle.

Tie motor memory to overlapping and to the interface reliably responding even if busy, and ⌘CtrlZ becomes something more than a really clever key press. Well, in a way it becomes something… less. Something your fingers just do without your consciously paying attention. It allows fingers to become your second brain, having a life of its own.

* * *

My favorite examples of designed interactions are those where it’s clear that people learned all of these things and applied them well.

It can be simple things. ⌘CtrlG to find something again was located right next to regular ⌘CtrlF find, so you can zip through a file really quickly:

Another example like this is colocating cut/copy/paste, or ⌘Tab (switch apps) with ⌘\` (switch windows within the app) on a Mac.

##### Find and Find Again

-   Use ⌥AltF and try to find words like “computer” or “keyboard”
-   Use ⌥AltG to find again
-   Change debouncing speed and see how it affects searches and canvas movement

Debouncing delay

Some keyboards evolved even the Shift interaction. If you think about it, Shift is still somewhat inefficient – you have to press the keys in a specific order, with Shift going down before the letter key does. But what if you could press them _at the same time_? This is tricky because that means either can arrive first. While the mechanical world of typewriters only allows for one specific order, computers can bend time just as much as our fingers can.

In the 1980s, some Japanese engineers tried that. They modified their keyboard’s software so it started with either Shift or a printing key, then waited for a tiny bit of time for the other key to arrive, and then put (debounced!) them together. Now you could use Shift like before, but you could also press it quickly at the same moment you were pressing its companion key – and it’d work even if you were a bit late.

I actually believe many Thumb Shift keyboards actually forced you to do the new interaction and didn’t support the classic one, but the playground below supports both.

This was software magic, but there was some magic in hardware, too – the keyboard had thumb shifts where spacebar usually is, its creators understanding how underutilized thumbs really are. In time, it became known as the Thumb Shift keyboard:

![](https://aresluna.org/images/show-your-hands-honor/thumb-shift/thumb-shift.avif)

A Fujitsu Oasys keyboard with two thumb shift keys (and two more unrelated thumb keys underneath)

##### Thumb shifting

-   Type in titles of your three favorite books using thumb shifting.  
    (I can’t move Shift keys to be under your thumb, but please use spacebar as a pretend thumb shift. And press Tab to add a space.)

Hello

Threshold (before and after)

100

Timer before

100

Timer after

* * *

The makers of Mac’s Finder also spent time thinking about this. In Finder, you can press space to quickly preview any item. The spacebar is the perfect key for this. It’s free in this context. It’s huge. And it’s the only key with the luxury of having _two_ fingers assigned to it.

Except in Japan.

The preview also works like the dashboard trick above. You can press the spacebar twice, or you can hold and release it. It’s also optimistic: If you preview something that’s slower to render, or on a remote network, the window still pops up quickly.

Once again, use it a few times and the combination stops feeling like an intentional choice to press a specific key, and starts feeling more like… peeking.

##### Spring-loaded space to preview

-   Press Space after selecting an item to preview it
-   Hold and release Space to preview it momentarily

Press vs. hold threshold

100

Timer after

Mode

* * *

The last example is Twitter which, of all places, deserves recognition for popularizing flexible input fields.

In theory, there is no clever keyboard interaction in sight here. The field is limited to 140 characters, so a natural way would be to put a hard stop at 140.

But on the way to 140, you might draft something longer, your fingers instinctively grabbing words, editing them, or moving them around without you thinking. To allow for that, the field was actually not limited to 140 characters. You could do whatever you wanted – you were just not allowed _to post_ until you reigned in your character count.

##### Typing with a character limit

-   Type a name of your friend, and then shorten as necessary to fit into 12 characters before pressing Enter

Input inhibited

##### Smarter character limit

-   Type a name of your friend, and then shorten as necessary before pressing Enter

Commit failed

* * *

## The real and fake mistakes

The field thing just above might seem a mistake: seeing “150/140” in the moment _feels_ like a bug. This is typical. Fine-tuned interfaces that understand fingers will do things that will appear like mistakes, but those exist to prevent _you_ from making them.

My favorite example might be this: Right after the page loads, Chrome disables the joint reload/stop button for part of a second. It’s a thoughtful interaction in a well-traficked place, coming out of recognition that even though “hand is quicker than the eye” is not physiologically true, the tiny amount of time to process first visually and then cognitively what’s happening might be enough to make you click a wrong thing anyway: you start moving toward the stop button on a stuck page to force a new load, the page happens to finish loading during your move, and you reload the just-loaded page by accident.

Disabling the button briefly prevents that from happening.

##### Browser reload button disabling

-   Add a new tab and observe how the reload button gets disabled after the loading is finished

Temporary reload block

Delayed tab rearranging

Tab drag dead zone

Another one: Good interfaces will not move windows if you just graze them, understanding that in the heat of the flow, a fast click might actually become a really small drag. The idea of a dead zone – a secret square a few pixels around the cursor – extends from airplane flight sticks, which required a bit more force to break off from the absolute center.

A small area around a center of a device (like a joystick) or an on-screen object, where no movement is allowed. This is done to prevent accidental small movements in stationary position, and to compensate for a controller drift.

Similarly, a tiny drag within a dead zone is still interpreted as a click. Once you start looking at it closely, it too might feel like a bug…

##### Dead zone

-   Try to quickly double click on these and notice that they will slightly move over time
-   Increase the dead zone slider and see if it changes things

Dead zone threshold

Dead zone

Reset

…but it isn’t. (It also allows double clicking to be slightly less precise – as long as two clicks happen within a dead zone, they can be a double click.)

Another: Good interfaces understand that finger gestures operate on a separate plane and sometimes might not notice what’s underneath. In some browsers, you can start a tab drag from the × box, and the box will become transparent to fingers. Logically, this doesn’t make sense. But it works for the “finger logic.”

Neither Google nor Apple Maps on iOS understood today that sometimes you will start panning with your finger atop a button, and that the pan gesture needs to be sent to the canvas behind it.

##### Dragging a tab from a close box

-   Drag a tab starting from a close box

Ignore close box when dragging

Tab drag dead zone

Good interfaces understand fingers moving fast can be messy and allow you to press a modifier key either before dragging, or _after_.

(One of the most unpleasant mechanical experiences I’ve had in modern software history was when I accidentally resized a bunch of elements in a long movie I was making in After Effects, and haven’t realized until a few days later. Undo was long past the rear view mirror, and I couldn’t just revert to an older file because I made other changes, too. The only thing worse than redoing your work is redoing work you don’t remember details of.)

##### Modifier key before/after hold

-   Use Shift and dragging to restore the three misplaced icons to their original positions in a grid

Before drag

After drag

Axis lock allowed

Axis lock active

Reset

Good interfaces understand that Backspace and undo have one more ally: a venerable Esc key. That key should be an Emergency Stop of software – always available to get you out of trouble.

Slamming Esc with your left hand in moments of confusion, or frustration, or… let’s be honest, normal creative work, is a powerful and underappreciated thing. It’s not just that Esc can be so so much faster than pointing to the close box or the Cancel button. It’s that, like many things we discuss here, it can become a _gesture_, operating under the level of consciousness. This can happen, however, only if you create an environment where this gesture works consistently and reliably.

Many people cherish Model M keyboard for its clicky sounds and establishing the modern arrow key layout. I love that it gave Esc its own little island, once again understanding Fitts‘s Law.

* * *

My favorite moment like this came in a forgotten machine called Canon Cat.

Canon Cat had a streamlined search interface that used two unique Leap keys, placed exactly where Fujitsu put their Thumb Shifts. Hold Leap and type and it’s like a supercharged ⌘CtrlF – the cursor immediately jumps to the first matching phrase, with no further keystrokes needed. But what if you mistype or, worse, change your mind?

Jef Raskin, the creator of the Cat, thought of a solution as odd as it felt satisfying. Instead of slamming Esc (which the Cat didn’t have), you just slam the keys themselves. This would almost certainly generate a sequence of keystrokes that doesn’t exist anywhere in your document, making the cursor snap back to where it started:

##### Canon Cat and leaping

-   Pretend space (or any right modifier key) is a forward Leap → key and search using it. (You can use Tab to enter space.)
-   Press Leap → solo to find again
-   Press any left modifier keys (like Shift) with letters to search backward, pretending it’s a ← Leap key
-   Abort a leap by slamming on the keys

Leap active

Leap failed

The Cat didn’t lock your keys and it didn’t throw an error message dialog box you had to process and then confirm. In its quest for efficient finger operation it didn’t forget that making mistakes needs to happen at the speed of fingers, too.

* * *

## All the fingers or none

I wasn’t there for Canon Cat’s short existence, and I wasn’t there for many earlier moments in this story. But I remember witnessing the revolution of 2007 as it was happening.

During Mac’s birth in 1984 a lot of attention was paid to its mouse, to the detriment of the (also interesting) keyboard. The debut of iPhone saw the situation reversed – now _everyone_ was talking about the keyboard. Any commentary of iPhone’s equivalent of mousing was relegated to admiring “slide to unlock,” or celebrating pinching to zoom.

But the real star of this moment was scrolling. TL; DR: Apple’s momentum scrolling is flawless. The rubber band mechanics were tuned extremely well on day one. You could move it slowly and precisely, or you could glide quickly and still understand what’s going on; you could even continue using your finger to add momentum – only to stop the movement in its tracks a second later with one tap. (And that tap would be prevented from being interpreted as a press.)

Steve Jobs demoing iPhone’s scrolling during the [2007 announcement keynote](https://www.youtube.com/watch?v=vN4U5FqrOdQ)

My day job is to suggest improvements in interactions like these, and I cannot think of a single thing I would improve here. It all felt and still feels _supernatural_ in a particular sense of the word – like something that actually improved on nature.

Simulation of the first iPhone checkboard. Scroll quickly up and down to see it in action.

It was fantastic as released, it made horizontal scrolling tenable for the first time ever, and in time would serve as a foundation for even more well-made interactions: pull to refresh first, and eventually [gestures replacing the home button](https://developer.apple.com/videos/play/wwdc2018/803/). In the decades since I felt bad for all the Android users, kept away from this mechanic by patent-shaped moats.

I appreciated Apple’s team incorporating the checkerboard for when it couldn’t show the scroll contents precisely (the same trick as what Mac did decades prior to window resizing), and competitors reportedly recorded the interactions with a high-speed camera to confirm they were, indeed, running at a constant 60fps.

But my adoration for this peaked only a few years later, when in one of the prototypes I was working on, I added JavaScript code to do something as the page was scrolling… and half of the code never executed. It took me many hours to understand what was going on and it was because what was going on was never supposed to happen: iOS stopped running my code _in the middle of a function_ just so it could go back to making sure scrolling was as smooth as possible. No modern programming language would ever dare interrupting your function halfway through; iOS was so dedicated to its user’s fingers that it broke cardinal contracts of programming.

* * *

But iPhone’s scrolling didn’t come out of nowhere. Its momentum physics were practiced on generations of [iPod click wheels](https://en.wikipedia.org/wiki/IPod_click_wheel). And there was another core building block that I used before myself, without realizing how revolutionary it was. It was the two-finger scrolling, introduced on PowerBooks in 2005. It was mindblowing how great it felt: Talk about something so intuitive you almost felt you were already doing that before it existed!

![](https://aresluna.org/images/show-your-hands-honor/powerbook-g4-12.avif)

The beloved PowerBook G4 12" was among the first machines to introduce two-finger scrolling

In a way, this was harder than iPhone’s scrolling because trackpads had one-finger operations (or, moving the pointer) for over a decade. People who added two fingers to pan had to make sure it was also easy to switch between these two modalities without any issues.

These transitions are clumsy if done poorly and underappreciated when done well. And they matter a lot when your fingers want to move fast.

Here’s an example: You are dragging something on screen, and you realize you are running out of room. The space you need is there, but you have to scroll to get to it. In the old world, you would have to drop the item, grab the scrollbar, create room, and grab the item again. Or, you could grab the item and move it close to the edge to enable auto-scrolling, which felt promising if not for one fatal flaw: No one in the history of interactions ever did this part well.

##### Dragging with only scrollbars

-   Grab any window and drag it to the other side of the screen
-   Use scrollbars to move the canvas

Edge scrolling

On trackpads today, you can simply grab the item and, while still holding it, use two fingers to move around:

##### Panning while dragging

-   Grab any window and drag it to the other side of the screen
-   Use scroll wheel or trackpad panning to move canvas while holding the window

That dashboard/desktop thing we talked about before, with a fluid hold-the-key-down-and-release moment? You can build on top of that, and reveal or unreveal the desktop _while holding something_, moving an item from one place to another in one fluid gesture.

##### Showing desktop while dragging

-   Press or hold D to show the desktop, drag an icon, release the key, and drop the icon

Press vs. hold threshold

100

Timer after

Mode

* * *

Examples like these are there throughout well-considered interfaces.

Remember the ⌘Tab nuances? One of the great things about that interaction is that it’s not limited to the keyboard. You can invoke it with the left hand, and immediately overlap your right hand and point to the app you want to activate. It’s the lesson of Shift in a new universe.

##### Using the mouse with the app switcher

-   Press OptionAltTabQ to simulate app switching, but use your mouse to select an app

Threshold

Hold before showing

(The reason left-hand and modifier keys like Shift and ⌘ are present in so many of these interactions is the same reason Doug Engelbart in 1968 put a keyset on the left of the keyboard, and the mouse on the right. It combines the power of two hands and like a cop duo comedy from the 1980s, gives one a “loose pointing” task, and another one a “precise buttoning” task.)

It’s also harder for people who are left-handed, although some people who are told me they still choose to mouse or trackpad with their right hand.

![](https://aresluna.org/images/show-your-hands-honor/engelbart.avif)

The keyset, the keyboard, and the first mouse

Another example: Remember the Finder preview cleverly using space? You can build on top of that: hold space with one hand, and with your other hand press arrow keys to quickly preview more files – and learning from our lessons, fanciful preview transitions would be suspended.

##### Using keys while previewing

-   Open a folder, select an item, hold space, press arrow keys to change the focused icon (and its preview)

Press vs. hold threshold

100

Timer after

Mode

Another version of this extends the aforementioned spring-loading. If you are trying to drag an icon to a folder inside a folder that you forgot you didn’t open yet, you can just hover over a folder for a second or two, and it will open for you without you having to drop the item (with a set of blinks to tell you you’re almost there). You can continue this and go really deep. Bonus? Drop the item where you want it, and the auto-opened things will close for you.

And it gets even better than this. If you are frustrated having to wait a beat until the new window pops up, you can speed it up using the friendliest key available – you guessed it, space. (And, of course, you can also at any given moment abandon the whole house of cards via Esc.)

##### Spring-loading

-   Activate spring-loading by holding one icon over a folder
-   Speed up spring-loading by pressing space
-   Change the spring-loading speed and see how things feel (try to make it very short!)

Spring-loading delay

Before spring-loading

Building interfaces that allow people to combine things in such fashion is what truly enables mastery, and something that is worth admiration.

Similarly how in real life it’s worth admiring a door that allows you to open it when you have both hands carrying groceries.

* * *

## The big big details

The story of how I gave up on Gmail is the exact opposite of that.

Many times a day, I would encounter this: I click on Reply with my trackpad and watch the reply composer open as expected. My fingers move from the trackpad to the keyboard to start typing, but then, in a frustrating fashion, the Gmail UI now interprets the new situation as me moving my mouse on the name of the recipient, and showing a hovercard telling me all about them.

That hovercard isn’t just annoying and distracting, which would already be a small transgression. It also covers _precisely the area I was about to start typing in_. Every. Single. Time.

Now, I had to move my fingers back to the mouse to swat the hovercard away. I’ve done it probably twenty or more times a day, seven days a week, 52 weeks a year, for countless years. If I had a nickel for every time that happened, I would have [copper poisoning](https://en.wikipedia.org/wiki/Nickel_\(United_States_coin\)).

Why was this so annoying? It’s the thing we learned: you can’t negotiate with motor memory. In every other place, the button would work and the operating system would gently hide the mouse cursor after I start typing, knowing it might be in the way. Years of practice made it into a _gesture_ that was reliable everywhere. Except in Gmail.

The first Macintosh in 1984 hiding the mouse pointer when typing

This was an interface that didn’t get fingers, coming from Google’s arguably premier productivity app. This was an interface that didn’t understand that “last modality wins” and that you do not trigger mouse stuff after keyboard events, unless that mouse starts moving again. That it was doing it 30 years after we figured it out was inexcusable. That it is still doing that _today_ (I just checked) is even worse.

* * *

I used to be annoyed at all these “little big details” blogs because at their worst they showed stuff that seemed delightful, but actually detrimental to using something well: A transition you had to wait for to exhaust itself. An animation in your periphery distracting you. A cute string that is actually confusing in a moment of stress or panic.

Sometimes they say that confidence is absence of confidence. That we colloquially reduce confidence to a certain flavor of machismo, never admitting you’re wrong, “the strong, silent type,” and so on. But true confidence is a deeper kind of strength: vulnerability, reliability, admitting to mistakes.

In a same way, I think often delight is absence of delight. In places and apps that welcome fast fingers, delight can be abstaining from a transition or something cute but deathly. Pushing for delight of the right kind can mean long fights with frameworks to reduce even one-frame delays, tweaking CSS to allow no wasted pixels between icons (so you can click quickly without hesitation), an understanding of accessibility that goes beyond the surface, and testing and fine-tuning so that keyboard focus is continous: always present in the right field, never delayed, never stolen by random popups.

And I am not sure if we, in the industry, fully internalized this.

We are better at judging physical tools – an imbalanced hammer, a creaky door, a mushy videogame controller button. Professional camera reviews spend time talking about the feel of controls, knowing well your fingers will be using them for hours each day. Mechanical keyboard makers obsess about material science and lubrication for the same reason.

Various details from my camera, showing a variety of design techniques that help use controls more reliably, distinguish between controls, or simply have a nicer tactile experience.

But I am not seeing the same for screen interface design. Interface bugs are frustrating to file, and if filed, often reduced to “nice to haves” or “fast follows” or, if you are lucky, “possible future small wins.” We judge Apple’s hardware and software very differently. We revolt only when the situation is [really dire](https://www.hagerty.com/media/news/buttons-are-best-says-euro-safety-org-years-after-everyone-knew-it/).

I care about this stuff because those things seem small in isolation, and yet they add up to a frustrating life with devices that constantly disobey and frustrate you. They’re noise in the city. Lead in pipes. Flickering fluorescent lights.

I mentioned Gmail just above. I can’t use Notion because its selection mechanics disrespect my motor memory coming from every other app. I gave Apple a lot of praise, but its Finder in recent years lost so much of keyboard fluidity it once possessed, mired in frustrating focus problems and half-baked transitions. And Notes on my Mac can no longer catch up with my typing, on a machine sporting a processor so powerful Apple could very well resurrect [that old munitions ad](https://newsletter.pessimistsarchive.org/p/when-the-mac-was-a-munition).

Not catching up with typing is perhaps the most egregious problem of them all, as this is where we started this entire essay. We figured this stuff out a century ago. We know about [transcription fluency](https://medium.com/message/the-joy-of-typing-fd8d091ab8ef) – this idea that over 30 or so words per minute typing stops becoming a conscious activity, and instead something your fingers just do on their own, as your mind is thinking about more important things. And we know about [flow](https://en.wikipedia.org/wiki/Flow_\(psychology\)), which extends this idea toward every interaction.

* * *

I gave this essay a title with an usually high for me amount of pretense. This was in celebration of August Dvorak, who used that phrase in his 1936 book Typewriting Behavior.

Dvorak is a polarizing figure and his methods are [under suspicion](https://aresluna.org/the-primitive-tortureboard/). Yet, the book remains a fascinating read, trying to connect the sophisticated, awe-inspiring actions of fingers with stuff that actually matters.

I feel Dvorak would appreciate the two-handed approach on a Mac that I use many times a day: you can grab an object, drag it over the terminal, and then type something inside it while still holding the item! I feel he’d also appreciate the swipe up gesture on the iPhone, which is a masterclass in how to design an interaction: always reliable, and allowing not just slow and fast movements, but also a few gestures in between.

Yes, the Terminal app is a direct descendants of the 1960s terminals!

It is [so good](https://developer.apple.com/videos/play/wwdc2018/803/) it became a modern version of Esc – if you’re stuck deep inside an app, it’s sometimes easier to swat it away from the bottom edge and relaunch, than to find your way back to its home screen the regular way.

Both of these cleverly combine timing, debouncing, overlapping, spring-loading, dead zones, and optimistic updates. Both of these understand how fingers actually work, and that only when devices and their software truly understand our fingers and their power and their needs, we can truly _use_ our computers toward better things, rather than fighting with them.

I am curious what your beloved examples are – please [let me know](https://aresluna.org/)!

We’ve learned a lot since the early days of typing when the capabilities of our fingers surprised us so much, and early days of computing when we figured out a lot of the basics like local echos and latency. Even as technologies change, these learnings will be evergreen because… well, our fingers are. Modern VR sets, AI products and devices, and electric cars all benefit from these lessons.

Kind of a fancy word for delay, or a lag, appearing specifically in [technical contexts](https://en.wikipedia.org/wiki/Latency_\(engineering\)).

All of what I wrote about above are hard-won discoveries. Dvorak fought for better typing, [Lilian Gilbreth](https://en.wikipedia.org/wiki/Lillian_Moller_Gilbreth) for understanding ergonomics and its social aspects, [Doug Engelbart](https://en.wikipedia.org/wiki/Douglas_Engelbart) for input mastery leading to new insights, Jef Raskin for thoughtful reinvention of what came before. Many other unknown people much smarter (or at least luckier) than all of us figured a lot of it out. These are bare minimum and we should hold ourselves accountable to stay there.

Whether you are a designer making those decisions, or a user aware of what to expect, I hope you show your hands honor for the strange power they bring you.

They deserve it.