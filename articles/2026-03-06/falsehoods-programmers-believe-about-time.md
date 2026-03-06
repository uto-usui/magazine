---
title: "Falsehoods programmers believe about time"
source: "https://infiniteundo.com/post/25326999628/falsehoods-programmers-believe-about-time"
publishedDate: "2026-03-05"
category: "design"
feedName: "Sidebar"
---

Over the past couple of years [I have spent a lot of time](http://infiniteundo.com/post/25230828820/things-you-should-test "I wrote a checklist of things that are worth testing in almost any software system. These are general areas where bugs and errors tend to cluster.") debugging other engineers’ test code. This was interesting work, occasionally frustrating but always informative. One might not immediately think that test code would have bugs, but of course _all_ code has bugs and tests are no exception.

I have repeatedly been confounded to discover just how many mistakes in _both_ test _and_ application code stem from misunderstandings or misconceptions about _time._ By this I mean both the interesting way in which computers handle time, and the fundamental gotchas inherent in how we humans have constructed our calendar – daylight savings being just the tip of the iceberg.

In fact I have seen so many of these misconceptions crop up in other people’s (and my own) programs that I thought it would be worthwhile to collect a list of the more common problems here.

## All of these assumptions are wrong

1.  There are always 24 hours in a day.
2.  Months have either 30 or 31 days.
3.  Years have 365 days.
4.  February is always 28 days long.
5.  Any 24-hour period will always begin and end in the same day (or week, or month).
6.  A week always begins and ends in the same month.
7.  [A week (or a month) always begins and ends in the same _year._](http://www.reddit.com/r/programming/comments/v8s0y/falsehoods_programmers_believe_about_time/c52k8m9 "This statement confused a lot of people. What I originally meant was that a month-long period may not end in the same year that it started. However, see the Reddit comment thread for discussion of several special cases where New Years Day falls in the middle of a month.")
8.  The machine that a program runs on will always be in the GMT time zone.
9.  Ok, that’s not true. But at least the time zone in which a program has to run will never change.
10.  Well, surely there will never be a change to the time zone in which a program hast to run _in production._
11.  The system clock will always be set to the correct local time.
12.  The system clock will always be set to a time that is not wildly different from the correct local time.
13.  If the system clock is incorrect, it will at least always be off by a consistent number of seconds.
14.  The server clock and the client clock will always be set to the same time.
15.  The server clock and the client clock will always be set to _around_ the same time.
16.  Ok, but the time on the server clock and time on the client clock would never be different by a matter of _decades._
17.  If the server clock and the client clock are not in synch, they will at least always be out of synch by a consistent number of seconds.
18.  The server clock and the client clock will use the same time zone.
19.  The system clock will never be set to a time that is in the distant past or the far future.
20.  Time has no beginning and [no end.](http://en.wikipedia.org/wiki/Year_2038_problem "the UNIX Apocalypse")
21.  One minute on the system clock has exactly the same duration as one minute on [any other clock](http://en.wikipedia.org/wiki/Atomic_clock "Yes, there's a very rigorous standard for the duration of units of time such as seconds and minutes.  But no, your system clock probably doesn't have any *direct* knowledge of that standard.")
22.  Ok, but the duration of one minute on the system clock will be _pretty close_ to the duration of one minute on most other clocks.
23.  Fine, but the duration of one minute on the system clock would never be more than an hour.
24.  You can’t be serious.
25.  The smallest unit of time is one second.
26.  Ok, one millisecond.
27.  It will never be necessary to set the system time to any value other than the correct local time.
28.  Ok, _testing_ might require setting the system time to a value other than the correct local time but it will never be necessary to do so _in production._
29.  Time stamps will always be specified in a commonly-understood format like 1339972628 or 133997262837.
30.  Time stamps will always be specified in the same format.
31.  Time stamps will always have the same level of precision.
32.  A time stamp of sufficient precision can safely be considered unique.
33.  A timestamp represents the time that an event actually occurred.
34.  Human-readable dates can be specified in universally understood formats such as 05/07/11.

## UPDATED: There’s more! [Read the rest of the falsehoods…](http://infiniteundo.com/post/25509354022/more-falsehoods-programmers-believe-about-time-wisdom "the Web's collective thoughts on More Falsehoods About Time!")

![Citizen Eco-Drive wrist watch](https://64.media.tumblr.com/c562da147b7773823a09d139bac71c81/2815e761dabdeeca-32/s500x750/0536fa9b607d8c38c92fd5f7958bd4a9d4bc3683.jpg)

## That thing about a minute being longer than an hour _was_ a joke, right?

No.

There was a fascinating bug in older versions of [KVM](http://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine "KVM is a Linux tool for creating virtual machines.") on CentOS. Specifically, a KVM virtual machine had no awareness that it was not running on physical hardware. This meant that if the host OS put the VM into a suspended state, the virtualized system clock would retain the time that it had had _when it was suspended._ E.g. if the VM was suspended at 13:00 and then brought back to an active state two hours later (at 15:00), the system clock on the VM would still reflect a local time of 13:00. The result was that every time a KVM VM went idle, the host OS would put it into a suspended state and the VM’s system clock would start to drift away from reality, sometimes by a large margin depending on how long the VM had remained idle.

There was a cron job that could be installed to keep the virtualized system clock in line with the host OS’s hardware clock. But it was easy to forget to do this on new VMs and failure to do so led to much hilarity. The bug has been fixed in more recent versions.

## An acknowledgment

This post owes a great debt to [Patrick McKenzie’s canonical blog post about user names,](http://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/ "Falsehoods Programmers Believe About Names") which I have read over and over throughout the years and from which I have shamelessly cribbed both concept and style. If you haven’t yet read this gem, go and do so right now. I promise you’ll enjoy it.

## UPDATED: Thanks for your comments and anecdotes!

**I’d like to say thanks** to everyone who contributed to the comment threads about this post on [BoingBoing](http://boingboing.net/2012/06/19/falsehoods-programmers-believe.html "Corey Doctorow called this post 'an eye-popping and mindbending riff on the malleability of time'") and [Hacker News](http://news.ycombinator.com/item?id=4128208) as well as [Reddit](http://www.reddit.com/r/programming/comments/v8s0y/falsehoods_programmers_believe_about_time/) and [MetaFilter](http://www.metafilter.com/117073/Falsehoods-Programmers-Believe) and to [everyone on Twitter](https://twitter.com/#!/search/realtime/falsehoods-programmers-believe-about-time) who shared their strange experiences with time.

You have provided so many interesting edge cases I had [forgotten about](https://twitter.com/PaulAlexWilson/status/215029360778940416 "A date calculation error concerning leap years led to a recent Windows Azure outage.") as well as _many_ oddities of which I wasn’t aware. For instance: in the Jewish calendar, days [start at sunset not midnight](http://news.ycombinator.com/item?id=4130904). And as [Bruce Sterling pointed out](http://www.wired.com/beyond_the_beyond/2012/06/falsehoods-programmers-believe-about-time/ "Wired: Beyond the Beyond blog by Bruce Sterling"), I didn’t even _think_ about what happens when the computer is on a spaceship orbiting a black hole.

There’s more than enough material for another (longer!) post about this topic. But first I’ll have to finish reading all >500 of your comments as well as the wealth of [awesome research material](http://naggum.no/lugm-time.html "Thanks to HN user snprbob86 for pointing me to 'The Long, Painful History of Time' by Erik Naggum.  Looks great, can't wait to read it!") that has been linked.

## UPDATED AGAIN: Read [the Web’s collective thoughts on More Falsehoods About Time!](http://infiniteundo.com/post/25509354022/more-falsehoods-programmers-believe-about-time-wisdom "More falsehoods programmers believe about time: 'wisdom of the crowd' edition")

I’ve written [another post collecting the _many_ other falsehoods that were suggested](http://infiniteundo.com/post/25509354022/more-falsehoods-programmers-believe-about-time-wisdom "More falsehoods programmers believe about time: 'wisdom of the crowd' edition") by your comments at [BoingBoing](http://boingboing.net/2012/06/19/falsehoods-programmers-believe.html "Corey Doctorow called this post 'an eye-popping and mindbending riff on the malleability of time'") and [Hacker News](http://news.ycombinator.com/item?id=4128208) as well as [Reddit](http://www.reddit.com/r/programming/comments/v8s0y/falsehoods_programmers_believe_about_time/) and [MetaFilter](http://www.metafilter.com/117073/Falsehoods-Programmers-Believe) and also [Twitter](https://twitter.com/#!/search/realtime/falsehoods-programmers-believe-about-time).

Thanks again for your enthusiasm and for the mind-boggling level of detail. I learned a _lot_ about time in the last 24 hours. **Fellow nerds, I salute you.**

## UPDATED 2017:

`FalsehoodsAboutTime.com`

**Falsehoods Programmers Believe About Time** now has a canonical permalink you may use when referring to this post.

`FalsehoodsAboutTime.com`

_Special thanks to [SWAlchemist](https://twitter.com/swalchemist), who helped me to recover this TLD after I accidentally lost it!_

## UPDATED 2025:

Because this post was cited in the AlphaCode (2022) paper, I have converted both posts into a citeable white paper with a DOI: [10.5281/zenodo.17070518](https://doi.org/10.5281/zenodo.17070518)

Because CS professors like to throw up a slide full of Time Falsehoods to freak out the undergrads, Falsehoods Programmers Believe About Time has now informed the work of a generation of computer scientists. They can now properly cite this influential work.