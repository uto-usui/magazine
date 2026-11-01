---
title: "Glashütte Trash Clock"
source: "https://niklasroy.com/gtc/"
publishedDate: "2026-10-28"
category: "design"
feedName: "Sidebar"
---

### Mechanical Clockwork

Glashütte, 2026

“Glashütte Trash Clock” is a fully functioning clockwork made from trash and other stuff that I found in Glashütte, Saxony. Since the mechanism just runs for about half an hour, it only displays seconds and minutes, striking a gong whenever the minute hand reaches the 12 o’clock position. As a little extra, the clock also triggers an external randomizer just before it runs out of energy.

While working on this clock, I also invented a new time scale: [GTC](#gtc). It blends the concepts of GMT and UTC, and the Glashütte Trash Clock serves as its global reference clock.

GTC reference clock

![](https://www.niklasroy.com/diary/123/Niklas_Roy_Diary_Lores_12348.jpg)

### Background

Both my great-great-grandfather Henri Roy (1833–1910) and his son, my great-grandfather Eduard Roy (1860–1942), were Swiss watchmakers. They lived in La Chaux-de-Fonds, which is well known for its watchmaking tradition. Later in life, they emigrated to Herrnhut, a little town in Saxony, Germany, where they continued making clocks and watches.

A pocket watch made by my great-great-grandfather Henri Roy  
Photos: Martin Roy

![](https://niklasroy.com/gtc/pics/henri_pocket_watch.jpg)

Glashütte, another small town in Saxony, is also famous among watch aficionados around the world. Some of the highest-quality mechanical timepieces are manufactured there. There is even a law protecting the designation of origin: only clocks and watches actually made there are allowed to bear the name “Glashütte/SA” on their dial.

Close-up of my clock’s dial

![](https://www.niklasroy.com/diary/123/Niklas_Roy_Diary_Lores_12316.jpg)

In 2026 I received a surprise email: [NOMOS](https://nomos-glashuette.com/), a manufacturer of mechanical wristwatches, invited me to an artist residency in Glashütte. This seemed to be the perfect opportunity to follow in the footsteps of my ancestors and to try making a clock by myself. So I packed my suitcase and went to Glashütte. With me I brought some cutters, a compass, pliers, rulers, cutting mats, a few kilos of hot glue, a handful of zip ties, a bunch of different adhesive tapes and some books about horology.

Packing my suitcase

![](https://www.niklasroy.com/diary/121/Niklas_Roy_Diary_Lores_12139.jpg)

GDR textbook about mechanical clocks and watches

![](https://www.niklasroy.com/diary/121/Niklas_Roy_Diary_Lores_12174.jpg)

### Pendulum

Among those books was “Mechanische Uhren” by Zdeněk Martínek and Jaroslav Řehoř, a vintage textbook for watchmakers. There I read how a pendulum can be used to measure time.

I found it quite interesting to learn that the frequency at which a pendulum oscillates is only determined by its length (and the strength of gravity), while the weight at the end of the pendulum’s rod (which clockmakers call a _bob_) doesn’t really matter. A pendulum with a length of roughly one meter is called a _seconds pendulum_, because it takes one second to swing to one side and another second to swing back.

Experimenting with a simple pendulum

 

Therefore, my first practical experiment was to build a pendulum. In my extraordinary workspace, an old church, I found a step ladder to hang it from and a plastic water bottle to use as a bob. A wooden folding ruler made a perfect rod, as its length could be adjusted.

My workspace: an old little church

![](https://www.niklasroy.com/diary/122/Niklas_Roy_Diary_Lores_12263.jpg)

Dutch astronomer Christiaan Huygens (1629–1695) was the first one to describe the behavior of pendulums mathematically. He also constructed a working pendulum clock in 1656 and published this formula in his book “Horologium Oscillatorium”:

T \= 2 π · l g

_T_ is the time for one full back-and-forth swing — _the period_. _l_ is the length of the pendulum, and _g_ is the gravitational acceleration. As you can see, the strength of gravity plays a role in this equation, which means a pendulum clock made for Earth won’t work well on another planet with a different gravitational acceleration.

I should also mention that Huygens’ formula describes the behavior of an _ideal_ pendulum. The higher the pendulum swings, the less accurate the formula becomes. In fact, if you want to be really pedantic, a pendulum stops being ideal the moment it starts oscillating. So this formula is only exact for a pendulum that doesn't swing. But well, good luck building a pendulum clock with a non-swinging pendulum ;)

### Escapement

In the next step, I had to keep the pendulum swinging for a long time, and the mechanism also had to count how often it swings. Thankfully, I didn’t have to invent anything, as all the parts needed are well described in the literature. I only had to figure out how to build them with the materials at hand. What I needed was an _escapement_, which consists of an _escapement wheel_ and an _anchor_.

Graham escapement with the pallets marked in red  
Source: “Mechanische Uhren”

![](https://www.niklasroy.com/diary/121/Niklas_Roy_Diary_Lores_12173.jpg)

An escapement is quite clever because it does two things at the same time: connected to the anchor are two _pallets_, which block the escapement wheel alternately, letting it advance only half a tooth per swing of the pendulum — and with every release, the wheel also gives the pendulum a small push. Without that push, the pendulum would slow down and stop within minutes.

When using a seconds pendulum, it makes sense to use an escapement wheel with 30 teeth: with one swing per second and half a tooth per swing, the wheel makes exactly one full rotation per minute. An indicator on this axle can then be used right away as a clock hand, showing the seconds.

Building a paperclip escapement wheel

![](https://www.niklasroy.com/diary/121/Niklas_Roy_Diary_Lores_12182.jpg)

Trying to build a reliable escapement out of trash was quite a challenge, as the parts had to be fairly precise and also strong. For the anchor, I used a carefully bent metal rod, and it turned out that paperclips make quite sturdy gear teeth for the escapement wheel.

Art critics might suggest that the prominent use of paperclips in the mechanism could be read as a clear reference to Nick Bostrom’s _paperclip maximizer_, but this is no AI doomsday clock, and their extensive use in this project was for purely practical reasons.

The paperclip escapement in motion. External force on the escapement wheel keeps the pendulum swinging.

 

### Energy

Until then, the mechanism only worked when I pushed the pendulum or the escapement wheel by hand. To keep the wheel spinning on its own, I needed a way to store energy.

Pendulum clocks usually rely on a weight suspended from a cord spooled around a barrel. In my design, this barrel drives the movement through the escapement axle.

Barrel with spooled-up string on the back of the escapement axle. Some guides lead the string around the ladder.

![](https://www.niklasroy.com/diary/122/Niklas_Roy_Diary_Lores_12281.jpg)

Building the barrel was simple, using some leftover cardboard packaging. For the weight, I filled an empty paint can with scrap metal I found at the NOMOS manufacturing facilities. I also salvaged an old toy construction kit from the roadside that happened to contain some pulleys — perfect for building a block and tackle, which halved the weight’s travel, so the clock could run twice as long before the weight hit the floor.

This old construction kit I found on the streets in Glashütte contained some useful parts for building a block and a tackle.

![](https://www.niklasroy.com/diary/121/Niklas_Roy_Diary_Lores_12142.jpg)

Two weights in a timelapse: the paint can powers the clock for about half an hour and the rubber boot runs the gong mechanism

 

### Reduction Drive

The next step was building a reduction drive to display the minutes. The reduction is easy to calculate: 60 rotations of the seconds hand (the escapement axle) should cause the minute hand to spin once. It makes sense to do this in two stages, with an intermediate wheel, as every stage reverses the direction of rotation and it is desirable to have the minute hand spinning clockwise, too. Anything else would be awkward.

After I cut some cardboard gears with questionable precision, I thought, why not just use simple friction wheels instead? Round discs could be cut much more easily than gears! The clock wouldn’t be precise anyway, so a little bit of slip between the wheels wouldn’t really matter.

Making a friction wheel

![](https://www.niklasroy.com/diary/122/Niklas_Roy_Diary_Lores_12212.jpg)

For each axle I used a simple hole as a bearing on one side and a fork on the other. The wheels were basically just lying on top of each other. To set the minute hand, I could simply lift the axle a bit, which disengaged its connection with the intermediate stage and let the minute hand spin freely.

Setting the minute hand by lifting the axle

 

### Sound

So far the clock worked well, but for my taste it lacked some joyful extras. Inspired by cuckoo clocks, I thought a little squeeze horn would be nice, but that turned out to be too hard to push, so I went for a glass bottle gong instead. It strikes whenever the minute hand reaches the 12 o’clock position. Apart from being triggered by the clock, the gong mechanism is completely independent, with its own energy source: another weight, this time a rubber boot, hanging from a string.

Attempting to make a cuckoo clock with a squeeze horn

![](https://www.niklasroy.com/diary/122/Niklas_Roy_Diary_Lores_12290.jpg)

Here’s how it works: the rubber boot’s string is spooled around a barrel (1). Mounted on the same axle are a drum (2) with two notches and a little lever that moves the gong hammer (3). There’s also a trigger lever (4) with two pins on its opposite side, which drop into the drum's notches and block its rotation. At the back of the axle sits a large _fly (5)_, which slows down the rotation through air resistance. Its yellow flags are cut from a supermarket plastic bag.

1: Barrel   2: Drum   3: Hammer   4: Lever   5: Fly

![](https://niklasroy.com/gtc/pics/clock_with_labels.jpg)

A cam plate on the minute wheel slowly lifts the trigger lever. This disengages the first pin and the drum spins a bit, until it is stopped right away by the second pin, which drops into the other notch. Clockmakers call this movement, which happens before the sound is triggered, _the warning_. During this phase, the hammer is pulled away from the glass bottle.

Close-up of the cam plate lifting and dropping the lever.

 

About two minutes later, the trigger lever drops off the cam back to its original position, pulling the second pin out of its notch. The first pin has already returned into the first notch — but that notch lets the drum spin on until it reaches its starting position again. The little hammer is released and strikes the bottle.

This two-step design has a reason. Lifting the lever happens slowly, along the rising edge of the cam, so there is no clearly defined moment when the warning occurs. The drop, on the other hand, happens at a sharp edge, so the moment when the gong should happen can be adjusted precisely.

The finished gong mechanism with bottle-bell

 

### Random Complication

Up to now, my clock only had features that are pretty much standard for pendulum clocks. But I still had some materials — and time. So I decided to add what horologists call a _complication_: any function beyond telling the time. In my case, it became a random complication.

The random complication

![](https://www.niklasroy.com/diary/123/Niklas_Roy_Diary_Lores_12349.jpg)

In the church I found a large rolling scaffold and a wheel of fortune, which I labeled with the words NOW and NEVER. The wheel went into the middle of the scaffold. At the back of the wheel I wound a string, which led to the top of the scaffolding, where I hung another weight. A second string connected this weight with a release mechanism, bent out of steel wire, which I placed beneath the clock’s weight, the paint can.

Triggering the random complication

 

As the clock runs, the paint can slowly descends, and just before the clock runs out of energy, it presses the wire down. This releases the string, the weight at the top of the scaffold drops, and the wheel of fortune spins — answering the ultimate question one can have about time: _“Now or Never?”_

Now or Never?

 

### Precision

When making a clock, you want its oscillator to always swing at the same speed. Horologists call that _isochronism_, and I was certainly curious to find out how precisely my trashy timekeeping mechanism ran.

So I attached a small piece of black tape to the pendulum and filmed the clock for its entire run time with my smartphone. Then I tracked the tape in the video with a little computer program. It turned out that my clock worked much better than expected — a “second” of the Glashütte Trash Clock was, on average, 1.004 seconds long (±0.001 s), accurate to within 0.4%.

Measuring the clock’s precision with video tracking

![](https://niklasroy.com/gtc/pics/evaluation.jpg)

### GMT / UTC – WTF!?

Still reading? Very good! Because now it becomes weird. While learning about clocks and timekeeping, I stumbled upon a fact that really puzzled me: the simple question “what time is it?” seems to be impossible to answer. There exist several time scales, and therefore several times, at the same moment, at the same location on earth — and they _can_ and _do_ deviate.

Excuse me — what time is it!?

![](https://www.niklasroy.com/diary/122/Niklas_Roy_Diary_Lores_12213.jpg)

Let’s start at the beginning, concentrating on one location only, so we don’t need to think about time zones. I guess you have heard about GMT, which stands for _Greenwich Mean Time_.

This is how it works: Imagine you were in Greenwich, in London, looking at the sky. When the sun reaches its highest point, it’s 12 o’clock noon. If you observe the clear sky for two subsequent days, you can measure the duration of one day. But the length of a day varies over the course of a year. So do that for an entire year and take the average, and you get the _mean_ duration of a day. Divide that by 24, and you have the duration of an hour. Divide that by 60, and you know how long a minute is. Slice that up into 60 even parts, and you have the duration of one second.

Always wear proper protection when looking at the sun, in Greenwich, at lunchtime!

![](https://www.niklasroy.com/diary/121/Niklas_Roy_Diary_Lores_12198.jpg)

Now you build an atomic clock. It measures time with incredible precision. But a single atomic clock isn't perfect, so you build a bunch of them, spread them around the world, and average their outputs. What this clock construction gives you is called TAI, _Temps Atomique International_, the international atomic time.

So far so good. Now you let your clocks run for a while, and you also keep looking at the sky in Greenwich. At first, the two match: when it’s 12 o’clock TAI, the sun is at its highest point. But after a while they drift apart, and it turns out to be impossible to predict this deviation exactly. So why is that?

The astronomical clock in Glashütte’s clock museum basically aims to simulate what happens in the sky.

![](https://www.niklasroy.com/diary/122/Niklas_Roy_Diary_Lores_12257.jpg)

The reason is simple: the earth does not rotate at a constant rate. Several factors influence the rotary speed of the earth; some of them are predictable, others aren’t, e.g. earthquakes and floods. But we still want noon to be noon in the long run. Therefore, in 1987, an organization with the wonderful name _International Earth Rotation Service_ was established. The IERS observes clocks and skies — and when the two deviate too much, it announces a leap second. Derived from TAI is UTC, _Coordinated Universal Time_, which is basically TAI with accumulated leap seconds taken into account. At the moment of writing this text, UTC is 37 seconds behind TAI.

Leap seconds are inserted at the end of June or December. If you want to know whether there will be a leap second coming up or not, you can subscribe to [Bulletin C](https://datacenter.iers.org/data/latestVersion/bulletinC.txt), published twice a year by the IERS.

Bulletin C 72

![](https://niklasroy.com/gtc/pics/bulletin_c.png)

In November 2022, the _General Conference on Weights and Measures_ decided to abolish the leap second by 2035, and some names and standards have also moved on. Since 2003, the IERS has been officially called [International Earth Rotation and Reference Systems Service](https://www.iers.org/) and GMT was replaced as the international standard back in 1972, but it still survives as a British time zone. Time derived from the earth’s rotation is now called UT (Universal Time), and there are [even more](https://www.cnmoc.usff.navy.mil/Our-Commands/United-States-Naval-Observatory/Precise-Time-Department/The-USNO-Master-Clock/Definitions-of-Systems-of-Time/) time scales and systems.

Now I thought, if so many different times exist already, it doesn’t really matter if I add another one. Therefore I invented GTC. Its definition is straightforward and has nothing to do with the earth’s rotation: GTC is based on the observation of the Glashütte Trash Clock instead of the sun, and like UTC it serves as a global reference time. Its purpose is a practical one. It makes sure that the clock is always correct, even when its trash mechanism doesn’t work anymore — simply because the Glashütte Trash Clock is, by definition, the ultimate reference clock for GTC.

Now you know what GTC is all about!

![](https://www.niklasroy.com/diary/123/Niklas_Roy_Diary_Lores_12354.jpg)

### Leaving Glashütte

Before I left Glashütte, I took some moving parts off the clock so it could be transported more easily. At just that moment, the sun came out and shone through the church's stained-glass window onto the clock. It looked so beautiful that I had to take a few last photos.

Bye bye Glashütte Trash Clock!

![](https://www.niklasroy.com/diary/123/Niklas_Roy_Diary_Lores_12370.jpg)

### Thanks

This project would not have been the same without the wonderful team at NOMOS. A huge thank you to Inès and Stefan for the invitation, to Marie, who took such good care of me and made my time in Glashütte so memorable, and to Melchior for his practical tips while I was building the clock. The entire team was incredibly generous with their time, showing me their work, patiently answering all my questions, and collecting interesting trash for me.

I'm also grateful to my second cousin Martin for the photos of our great-great-grandfather’s pocket watch, and to my father Helmut for helping me research our family history.

![](https://www.niklasroy.com/diary/123/Niklas_Roy_Diary_Lores_12369.jpg)

### Additional Resources

-   Owners’ Manual - [Screen Version](https://niklasroy.com/gtc/download/GTC_OwnersManual_Screen.pdf) (PDF, 31MB)
-   Owners’ Manual - [Print Version](https://niklasroy.com/gtc/download/GTC_OwnersManual_Print.pdf) (PDF, 126MB)
-   [Hires promo pics](https://niklasroy.com/gtc/download/gtc_promopics.zip) (ZIP, 15.3MB)
-   [Trash clock photos](https://niklasroy.com/diary/index.html?tag=254) in my diary (newest first)
-   [Residency photos](https://niklasroy.com/diary/index.html?tag=253&r) in my diary (oldest first)
-   [CSV dataset](https://niklasroy.com/gtc/download/GTC_evaluation.csv) of Pendulum analysis
-   IERS [Bulletin C](https://datacenter.iers.org/data/latestVersion/bulletinC.txt)
-   [Definitions of Systems of Time](https://www.cnmoc.usff.navy.mil/Our-Commands/United-States-Naval-Observatory/Precise-Time-Department/The-USNO-Master-Clock/Definitions-of-Systems-of-Time/)
-   Videoclips on [archive.org](https://archive.org/details/gt_20260919)