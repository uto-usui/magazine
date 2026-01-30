---
title: "Little Big Updates: Dispatches from Quality Week"
source: "https://www.figma.com/blog/little-big-updates-dispatches-from-quality-week/"
publishedDate: "2022-01-26"
category: "design"
feedName: "Figma Blog"
---

_Every few months, product teams at Figma plan what we call Quality Week, a time to deal with all kinds of bugs—from classic coding errors to strange not-really-bugs, tricky oddities, and things that feel like bugs but technically aren’t. Yesterday, [we released the latest fixes](https://www.figma.com/community/file/1066028835503653151) to Figma and FigJam that came out of our most recent Quality Week. Here, Design Manager [Marcin Wichary](https://twitter.com/mwichary) shares stories about these seemingly-small improvements, reflects on bugs more broadly, and explains the art of distinguishing little details that you can ignore from the little-big ones that make all the difference._

It was an evening of the fourth day of the last Quality Week, and Molly had a problem. The fix for the bug she’d been working on for the entire day proved to be elusive. On the surface, it seemed like it should be a simple bug to fix: people who used the accent menu in macOS saw their letters repeated or not working at all.

Molly knew a few people tried before her and failed. But she started from where others finished, and eventually figured out it wasn’t a simple issue of business logic gone awry. It turned out to be a glitch in the quiet, invisible choreography of moments that happen whenever you press a key—events like _the key is now down, the key has been held for a while, the key is back up, we now know the character that’s about to be printed, the character is now on the screen_, and a few more.

Both the operating system and the underlying browser deal with those even before Figma can and in this case, the browsers weren’t doing all the things we expected. But code could be written to help them, and Molly figured out how to write it. On her computer, Figma started correctly handling the accent menu, showing one and _only one_ letter. The fix supported both keyboard and mouse inputs. It was less than ten lines of clean, well-documented code.

But there was a catch the size of an old design system. The new patch worked perfectly in Firefox and Safari, but the problem still persisted in Chrome, the browser with the biggest user base.

“I’ve spent all day on this and I’m so frustrated,” she wrote to a coworker. She did everything she was supposed to. She came up with a fix. She wrote it up and sent for an internal approval. She even filed a report with Chrome’s developers so they could take a look some time in the future. But it felt like a victory on paper only. The bug was fixed, but to most of Figma’s users, the bug wouldn’t be fixed at all.

### [The clear definition and the real definition](#the-clear-definition-and-the-real-definition)

Where there’s software, there are bugs. Where there’s time, there are more.

In theory, bugs—like all of software engineering—are meant to be precise. A found bug is two pieces of information: _how this is supposed to work_ and _how it currently isn’t_. Fixing a bug is making something work well again.

_How this is supposed to work_ can seem pretty easy. The most famous bug, [Y2K](https://en.wikipedia.org/wiki/Year_2000_problem), was simply “computers will think the year 2000 is the year 1900.” The second-famous, the [Pentium FDIV bug](https://en.wikipedia.org/wiki/Pentium_FDIV_bug), was “these two numbers divided gives an incorrect result.”

But where people and machines intersect, things get tricky, and “bugs” take on a wider, less precise meaning. In practice, it often feels there is no difference between something that works as intended, but badly—and something that doesn’t work at all. (One of the most infamous bugs often listed in top ten examples, the too tight trajectory that doomed [the Mars Climate Orbiter](https://en.wikipedia.org/wiki/Mars_Climate_Orbiter) in 1998, was not a mistake in code: it was two teams inputting values using two different sets of units.) In practice, when dealing with a complex system, _how this is supposed to work_ might not be obvious. In practice, _how this is supposed to work_ can sometimes be a pipe dream, attainable only with infinite time and resources. In practice, you might not be able to get to where you were before—just chart a new, less buggy direction.

Some bugs cannot be fixed, some don’t deserve to be fixed, and others are not bugs at all. Y2K, FDIV, and many others showed us that knowing both what’s broken and even how to fix it is hardly enough. And for a bug the caliber of Y2K that happens once a millennium, there are two thousand smaller ones that happen every year.

At Figma, there are many processes and tools to deal with bugs, including recurring Quality Weeks: time dedicated to coming together within a product team, and to fixing bugs that might otherwise get forgotten by time, bugs that deserve extra investigation, and bugs that stretch the traditional definition of bugs.

### [It’s a bug if it feels buggy](#it-s-a-bug-if-it-feels-buggy)

One example: support for [HEIC files](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format), a relatively new image format popularized by iPhones and iPads. To the rigid definition, Figma not supporting HEIC was never a bug. The code to support it was never written, so nothing stopped working; it never worked to begin with.

To Figma users, however, that distinction was meaningless. Some images dragged from their phones worked, some didn’t. The correct definition of a bug didn’t matter if Figma felt _buggy_.

Quality Weeks make room for bugs like these. This particular one was fixed by Sawyer, an engineer on the FigJam team: 98 lines of clean code, a relatively painless approval from another engineer. But when you fix a bug, you must be careful not to introduce another one.

Turns out, by their nature, HEIC images in their 15-megapixel glory are usually big and heavy, taking a long time to process. Even after adding proper support for the file format, without any extra work, dragging an HEIC file onto Figma canvas would result in… nothing. For many seconds, as each and every pixel of the image traveled across the globe and then within the innards of the servers, it would seem that Figma ignored the image drop. Only after a while, the image would suddenly appear.

A feature not seeming like it’s working feels the same as the feature not working. Jackie—the designer on our editor platform team, responsible for pursuing and coding the delightful Figma loading animations—flagged this first. The addition of a loading state could help, and it didn’t have to be complicated at all.

![A snippet of code for the image loading state](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAIAAADKYVtkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAo0lEQVQYlX3P3QqCMAAFYN//1eoqdJo/be1PN6eNcLpNV5GEBElwbr9zONEhpEefpQ5Vhp01AR2Je5JpUhoGbX31DZ4leyj+7H4TfbCFlaF5TxKFTwonPSkGjpwgsyRLS0O761fs0g2DDsc9BpoWA7uMNfZvj9eKX79hVBleaJ7feH5npeHINtgLurQsKBrUv2VgIbQ1miQcJZwEdGKd2vn5jV/o1hLdht1FPwAAAABJRU5ErkJggg==)![A snippet of code for the image loading state](https://cdn.sanity.io/images/599r6htc/regionalized/61ea01cbf5c014fdb252b2a451b9a3362d346dfc-1757x465.png?rect=2,0,1755,465&w=804&h=213&q=75&fit=max&auto=format)

But even within that simple fix hid a strange bug, rooted in psychology. Adding a loading state too soon can make things feel slower. So, one extra addition had to happen to make the UI less eager. The loading state itself had to be equipped with its own, invisible loading state—the loading message wouldn’t appear until at least second has passed, so for small images or very fast computers, the important illusion of things happening in real time would be preserved.

![An illustration of two HEIC images being dropped on a Figma canvas, and a loading message](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACD0lEQVQokYWT3U9ScRjH/ataF82tu9rKLpplL2tdZa2lceGKSsVesBgoaRmON0GlA5wDhoNgER5opo7NZlsZNltSOgyTEOzSTzsHKFeaF989z297ns/v97z86lLSJoqSYpmkWPH/VlIqI4sbqpJSiVSgTEqqaXNLya3arbpaQiW5EqSclURZLJHwbxATvhN0ZZHsi4Tdn4kLy8hinlSgtA1Y3gas3KDCEr4CYdcqQdsK/sFlPANfGOr/iNWUxvrgFW7TJP5HM0RcGZJiYW9gbOQbgnkR+90FBnQL9LbP09P5hj5dnEHdM4b143hNUULWWSZ8a/8Bqv0rk3i6RtSSJWxeQjIs4byziLl9itsaB/oWE46OQSSTQMQ+vTswpfSsCpySCryVVnnvzTFt+4pomKf7WoBzp1ppOnKayyea6bzUgbvnOS+9+d9ABbYjcCZU5EM0Tya0wqTzE17jLLo2Bw1HT3Jgfz31+w5y/PBZertE4oIC/PnvlLcDX4+VSI+vMxPMI3tyRIayWI0vuHJBS+OxMzQcauR8UwsWQ5SEb33vkisqIfuLxEZzBGwZXA8nMXUJ6G86MOpGsRgijDkz6l7uvIfVKVd7ofoTviKex3Pcuz6MtrUfbWsf+hsjCJY54t48slisxe5W8h+oYhO+H7j70tzSWLja3I3m4n262px4n7xD9qsLXXvAVvVHqcBfzc641iCDBQ8AAAAASUVORK5CYII=)![An illustration of two HEIC images being dropped on a Figma canvas, and a loading message](https://cdn.sanity.io/images/599r6htc/regionalized/d5917824f492dc0642a2c5e7574d2bbae9274451-1340x760.png?w=804&h=456&q=75&fit=max&auto=format)

### [When a fix seems like a bug](#when-a-fix-seems-like-a-bug)

It can feel overwhelming at times, those strange fractal allegiances, bugs inside bugs inside bugs, fix quicksands that can swallow you whole.

It gets even trickier if the answer to fixing a bug is to introduce… something that feels very much like one. During this Quality Week, that strange honor fell to Lauren, an engineer on the core editor team specializing in canvas behaviors and rendering (responsible, among many things, for [spread shadow](https://www.youtube.com/watch?v=YAVl88J0xqU) and [knockout shadow](https://twitter.com/rogie/status/1418247374502207491)).

The problem: if you put your mouse over an object in Figma, the object welcomes your attention with a hover state. It’s a pretty standard convention that helps target things that might not have the most obvious shapes.

But that convention backfires when you’re working on complex selections, which are often central to how stuff gets done. At Figma, we’re serious about these. Beyond putting selections on the undo stack, we have many features to fine-tune them—from the icons next to Selection Colors, to a variety of Select All With options.

The common way to build a complex, precise selection is Shift+clicking. But if you Shift+click on an object to de-select it, the object will immediately show a hover state that… looks almost exactly like the selected state. That can be confusing. Did I just click this object or not? Is it part of the selection or outside of it?

The obvious fix to this issue—redesigning the hover and selection states to look more distinct—would replace one problem with another, that of visual sprawl. And so, Lauren worked on a different kind of a fix, one debated hotly by designers and engineers just the week before.

The idea was simple: if you Shift+click to deselect an item in a complex selection, Figma will _break the hover state_ until you mouse over the object again.

Introducing an exception always feels uneasy. The solution worked really well in testing, but Lauren just coded something that—to someone who isn’t aware of the nuance—will look like a bug in the future. The hard work here wasn’t just fixing a selection detail. It was also documenting and contextualizing it so that no one, in the future, accidentally fixes the fix.

![A snippet of documentation for the new fix](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAIAAADKYVtkAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwElEQVQYlU2OYY+CMAyG/f9/TONHZ0wcHeDWMuDukgPKhkzvFHo5TZ40TdMn77vZp9OWlRoAGHVnz9+Xc2eB0QRaGCkPlIeqjHURfRF9OXk7N3j/qH6/Nvt02rE6sllemYARmMyI6/KHGam81pe5sXNjU+NuLf18vstggphoRB4w651egQGXcPFTK7H/8kExZOx0b3W/dh7JMGaDE+SSh6qIS2eJfSUrBmCnO5v1zgQqYrXic1kmX061TJdaMZ/yAz0gD35/JGljAAAAAElFTkSuQmCC)![A snippet of documentation for the new fix](https://cdn.sanity.io/images/599r6htc/regionalized/5d886bf7bbd5669bdd1136253195f1b6e6b51a84-1757x469.png?rect=2,0,1754,469&w=804&h=215&q=75&fit=max&auto=format)

### [The blind investigation](#the-blind-investigation)

If those aren’t enough reasons to hate bugs, there are many more. Bugs are, by definition, _a_ _look backward_—at past behavior, at code that already exists, at the old work of engineers whom you’ve never met. It can feel more fun to write new code, chart new territories, add new functionality.

But the past can be fun, too. A good bug is a puzzle. A mystery. A whodunit. To solve a bug, sometimes you have to be a scientist: observe and measure, chart out the logic, follow the math. But then, two minutes later, you need to wear a hat of a very particular detective—take your flip notepad and interview different pieces of code to understand not what they claim they do, but what they actually do.

The pieces of code are inanimate, and the interviewing is of a strange nature—`logri()`, `console.log()`, breakpoints. Shirley—a software engineer on the editor experience team—didn’t know it yet, but she was about to embark on an investigation.

“It confuses me how Figma only supports TrueType fonts, but not OpenType ones,” wrote one Figma user just days before the Quality Week. This was strange. For as long as it’s been around, Figma supported both TTF and OTF fonts—the two most popular type formats—in addition to a few lesser known.

Bug fixing relies on having a solid “repro,” a set of unambiguous steps on how to encounter the bug. The steps exists so that the engineer can see the issue on their computer—and, after coming up with a fix, and seeing repro steps stop causing trouble, have certainty that it actually worked.

Here, the steps were simple enough: “I have an OpenType font. I install it. It works elsewhere. It doesn’t in Figma.” But when Shirley took the font and installed it on her computer, everything worked well. This required a tricky investigation: What was different between those two computers? It ended up being a collaboration between Shirley, support, and a few users who dedicated their time to helping us.

It took many hours, starting with looking at font files. Then, it was screenshots. Later, logs. Without a working repro, instead of seconds, each turn took minutes, if not hours.

![A screenshot from the user showing a hint of the bug](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAABbklEQVQokYWS626kMAxGef9Hq/Znq9EApRptNQXmQkgc5wZ8lQOtdlvRWjoKEsnB/kJxuw9QmqAMQWmDUWsYYzJEBGstnHMIIewSY4TWGofDAYU2BtZ5sA9wzm84eO/z5pQS5nn+ESlmRlVVKEg6CBE+JsSYsmCapoxsXpYFy4LdWraX0kBd1yiYXRZyiHkNMX529bF5le4jJVNlIVmG9QHWBViRb3n9K13mfdm8jSzn8shqHKHJwhDDkIW1vEnXTlOafiFhmmYQWRyPJYpBqVUonbIDf+nyI889Ulqzlr+hLMv1lsn5dWy5ae8zIpQDv+W3fM1w1ARiD+MCDPstRxHKyPJ1yek7OdftOQtZMqxRtO2A7kJohV6j7xSuF43hTlCDzYwD/4ceHSxFsJ3AlOB4xnC3eHo8oniuWtTNDZVQdaiOZ9TlGU31hqZu8fLc4dT0OL1c1rXp8Xq6o38jXHuHa8e4XTzOfxX+PDzhHbMCVOwreMiSAAAAAElFTkSuQmCC)![A screenshot from the user showing a hint of the bug](https://cdn.sanity.io/images/599r6htc/regionalized/68dcdd409aaa912e98cb17ec0f36e1b45445f496-1340x760.png?w=804&h=456&q=75&fit=max&auto=format)

The culprit was something no one expected, spotted in a corner of a screenshot taken for an unrelated reason. Nobody thought OTF could stand for anything other than “an OpenType font.” But if you install Open Office, OTF can also mean “Open document formulate template.” On computers with both Figma and OpenOffice installed, some of the font files were identified as document templates, and Figma didn’t know what to do with them. It was an example of a bug falling in between things—a tricky situation even if you control all the things, let alone if you don’t. For Figma, a complex web tool, those situations weren’t uncommon.

It was also an uneasy example of a bug that had to be fixed without reproducing it. It felt like solving a crime without actually seeing a crime scene: how can you make sure things are good if you don’t see them working correctly in front of your eyes? The hypothetical fix had to be deployed and tested outside, adding to the complexity.

But the investigation felt worthwhile. We knew that a bug like this left in the wild can lead to serious consequences. OTF fonts not working could start seeming to people like a deliberate design decision—and just like touching a hot stove for the first time, seeing something not work often makes us assume _this will never work again_.

Luckily, the fix worked on the first try, saving Shirley from working in the dark over and over again. On the code level, at just seven lines, the patch was trivial. But in a way, that made it worse. In the real world, moving a pebble is easier than moving a mountain. When you deal with software, you can spend a month moving a pebble.

### [Sifting through the pebbles](#sifting-through-the-pebbles)

Many of those pebbles won’t matter, bugs with little consequence or ones exotic enough that no one will ever encounter them. But not all pebbles should be ignored. Little _little_ details and little _big_ details look and feel the same. The first group doesn’t deserve attention, but unattended, the second one grows and grows—and the collective presence of hundreds of small bugs in important places might end up being what distinguishes software you want to use and software you merely _have to_.

Knowing which bugs to treat seriously and which ones to ignore can sometimes be a bigger challenge than actual fixes. There is no formula: just constantly rewriting frameworks, listening to individual users and big companies, picking the brains of designer advocates and support teams, trusting the collective guts of designers, project managers, and engineers who have deeply thought of bugs before, and teaming up to work on things together.

When Delong from the editor team was fixing a bug that slowed down typing by up to an astonishing 1000% percent under some circumstances, it all came with the understanding that an awful lot of typing happens every day, and that there might be nothing worse than a feeling of keys disconnecting from your fingers because of slowness.

When Silas, a FigJam engineer, improved linking—now more objects will have unique URLs—it was out of belief in the power of links and sharing, and how making it even marginally easier to share can lead to better, smoother collaboration.

![A FigJam sticky note with a right click menu allowing to link to it](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB00lEQVQokXWS6W7aQBRG8/7vAmkQUkUVzNKQBlBS1hhC1BLALCZ4Fm84LKeygTZqwo+jO3c0OvruzFwYKUE+LTAyklJO8v1acvOOuI/3jczx3Ef2+dTfur+Im3xaUv4muK/bNJtTmg2LVnNKt7Og11thdiWNmuJnRdGo6ISHsuI2JylcnoTyn9C4lNwaDu3OhEezT/fR5GnwzHhssbBfsW3JfOqynIU49huOHTEb+bRrilLmjPBHUfD0tGD48sJw+BvLsnAcBykUi5HGMgNm5oZFf8e8t2XUimgUNcUvnwjjkaslxWisEFIipUQpjed5KOExNl3MQkA3t6abixJaX9fcXWkKqf+Eh0eRVMsKy/LwPB/f95MaC7VyWU411kAz6Wmmg4DFrzVWP6RV0ZSuziUsK8YTjXbdROT7B1zPRWuFUgqtNUEQsN1u8L2IQUdTzp4R3hqSfl9iWZL5TDOfu0c0y6VCyoNwvV6z3+8IgzeeO+5H4ekfFrKCSsGheuNQqwjqFZnU+zvBc1/grA53GkURu92O4FxCIyUTYcKl4PpIsk4LilmH7oNg9aoJw5DNZpMkDPxzI8e/PZbGSd9x2itlBO26gz0XhGGQpIM9YbD5dOQ/bocNFjTs2JsAAAAASUVORK5CYII=)![A FigJam sticky note with a right click menu allowing to link to it](https://cdn.sanity.io/images/599r6htc/regionalized/41bcb3fe84ac66d050c482ed5af8300c8b613df8-1340x760.png?w=804&h=456&q=75&fit=max&auto=format)

When Jenning and Chang from the design systems team enabled individual publishing of components directly from the right click menu, it came from an understanding that design systems are incredibly complex, and Figma needs to support different modes of working. Sometimes you don’t want to create a branch, or even go through the regular publishing flow. Sometimes you just need to get one component out there.

![Two Figma components with a right click menu allowing to publish them directly](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKklEQVQokZXQ3UtTARzGcf+Ys7O3s82dsxV2YTdF+dJOyjZSizJENEYJdtFdgZGWc/myULKlqZG6czbGKE2nbAZhoNVN0GW2i5CYK/N635iziMyoix/P3Yfn+ZVl9B3S+jYpPc9TfZO4niW2d/FYFl3bINibxOM5i8NRjtlsRhAEBMHAyWNeBrufFVLRLTL6TiGj7RTKSuC3XSyor3JJj9IWn6EjEaMzEedKXKMpdIfKOhVZUbBJ0h4o/B1M6p/oiqZpnH1Igz7KxfgjWuOTNOtjnA7eoEKtxinL2Gw2RFHEYBCpOu5jqHvuN1ArTZ6PfmZi8j39kZf0RVboj6wwEHlBaDTN1eujnKjxoSgKDocDk8m0O7226gxDPQeAi9EcifENngy/Yyr8lvH+14yF3jB2d42b1x6jVjficrmx2+0YjUYsFiuemkbCPfN/mrzNkpZnbnqT5FSWxMQG2oOPTA9nmb3/gVBXknrPeRSXG0mSEEUjVquEWtN0MLisf2FJz/+8hdk8z2e+Mj+dY7g3hVe9gOx0IlktiAYBs8nEqeLkfT/8BVyO5VmOFbOEFzOl5RjpS+P1tqNUVOI4dARLuQtLuZtaTzNDtxf+reEPcLEIhtfwtQdx+y+j+AI46tqwqa14Wm4RHlgtpKL5A8Biw2LTPbwEbjFybx1fYABXQydOfwe2+gBWtZ3alm7Cg6/+F8wxEsrg9weQK45ilQ9jtCuIkkxV9bl9k78DfpNdIIPz9Q4AAAAASUVORK5CYII=)![Two Figma components with a right click menu allowing to publish them directly](https://cdn.sanity.io/images/599r6htc/regionalized/2ff4695271a4e3be08734c15c4bf5eefca683b24-1340x760.png?w=804&h=456&q=75&fit=max&auto=format)

And when Alex from the FigJam team added support for creating stamps by drag and drop—not just by clicking—it was out of our shared knowledge and belief that there is sometimes no greater feeling than mastering a complex tool, and it’s our responsibility to build out those paths to mastery.

![A visualization of dragging a stamp from a stamp wheel in FigJam](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABq0lEQVQokX2S7XLSQBSGe9negDPegjfgLxqQtlI/pnUTbGgDTQp2VBCptR+h5SMmu6B0yOMkm0ygU/yxc2Z3zvvsOe85W+a2IjkijyWZRnNbYpZketdv+XtxtEbGmTYWJRlvFQmJsIAmScJQiHIWsxy7ekvzTQ+76ueaOPusAIrHFRqK+o7EeR/hWiEtEWDvR9SrIe6+R/ewgls7wzLCp4HrbUjqe4p2I+Lyy4ThxZCbwYBex6f58TdOrUv7nYmz28Uyog0VZh6lLZcljXrIt58T7scBQTAhmF4xvr2m542wa2PM8h2WMf1Py6UCaO0oHDegPRzhjRTH/oLWcMbl3ZSr/hjnIOQwzdVDEiUZZ95rYDFFDa7vKrwzhXsz51X/gWetJS86S479B35dz2mZycD0BuRAc5OHKbiiaNpzPl/8ofpd8fx0zsvzJW1/Sf/HXxoftM9msRFxpl+vMP81iUdvFd5phPf1nmY/4HywoNdd4B7NsKorHRWV6X1cA64ucVnyqRZxYk7ptEI6zoyTA6VhmX8rVqVA7eUGYF6xKEvEa4moSITxdN5j4D+W1vH5qUwVSgAAAABJRU5ErkJggg==)![A visualization of dragging a stamp from a stamp wheel in FigJam](https://cdn.sanity.io/images/599r6htc/regionalized/bec25b9987d98fa094ad1ec1f05a3c059b91005e-1340x760.png?w=804&h=456&q=75&fit=max&auto=format)

### [Fighting fire with fire](#fighting-fire-with-fire)

All those, and hundreds of other bugs, were fixed that very Quality Week in November 2021. Strings were renamed, comments refined, bad code excised, tests added, race conditions solved. It’s entirely possible that in the course of one single day, you might encounter ghosts of dozens of them—successfully dragging an HEIC file into Figma, using it as part of a complex selection, and then publishing the component to the library.

It’s hard to be excited about bugs. Most of them aren’t fun. Most of them don’t come up with [cute anecdotes](https://www.youtube.com/watch?v=kVD-sjtFoEI), [historical stories](https://twitter.com/figma/status/1395445717783613443), or [life-changing learnings](https://mwichary.medium.com/a-hacker-s-guide-to-bending-the-universe-86a5636b04da). Most of them just… are. You get to fix many, but never all of them, and the failures of bugs you couldn’t fix bother you more than the successes. Sometimes, on a dark day, you cannot escape a feeling: _software really wants to be bugs_.

What helps is knowing and reminding yourself that fixing bugs is not a theoretical exercise in cleaner coding. Fixing bugs always needs to come back to people using Figma. Sawyer’s HEIC loading state details, Lauren’s deliberate inconsistency, Shirley’s blind investigation all came back to helping Figma users work better and feel more awesome.

And that brings us back to Molly, and her dissatisfaction with her accented menu fix not working in Chrome. Leaving the accent menu broken in Chrome didn’t just mean leaving behind a hypothetical number of theoretical users. It meant ignoring months of reports of people feeling annoyed, frustrated, even disrespected:

-   “Figma does not seem to honor the long press on a keyboard to enter letters with accents. I had to copy from another program and paste it into Figma to use.”
-   “Would be nice if you could fix it so I don't have to always change keyboard layouts when working with Figma.”
-   “Just fix it for every French designer in Qwerty."

The accented characters weren’t just—like it could seem to people who use English—a bonus version of “regular letters.” In many languages, accents are just as important, an everyday necessity. And a bug can feel very personal when it prevents you from typing your name.

So Molly soldiered on, trying not just to fix a bug in Figma, but now also a bug in Chrome, despite having limited powers over Chrome’s codebase.

![A screenshot of a part of Molly’s keystroke debugging file](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAAsTAAALEwEAmpwYAAABw0lEQVQokW2QS2/TUBCF/ZtZsUNCYskepK5YsCkSFVsWpRVJnLRZlLaokKZJ/bz2fdi+fsSOEz5kS+xYfJpzZjSjo3GKPKdpatp2R13XCCFYrVY8Pa1HnWUZVVWx2+3+S9M0WFuTZSVaZzhDo+8PHI9/6PseYwye540MBwdfNzVd19F2LW3bjvofbdtR1x1l2WJthbOrNX0nOe4lh72htAYRJ4RRjJACbTRFVmCNxWbluFRUFXk5UI66bIa03ZjWsWpBHn/Bxqc05gKr1oTPWzbemq3YEIqAJEhItgmpJxFCE2iNrxSeTHmWKZHW5NaOr3GU95ng5xvCu5fk/gkqvuJxdcNqe8c2XRMon1QnKCWRKiWSMb6JiYp0xDcxYSbQpaasShztfyK4f0Vw+4IieI+SV/x6/sFaPBBZn7QRZL3BHnOKvSatYkQZYfaK/GBQnRwp9jl1W+MEj2dsbt+yuXmNePpAGC152N6zCn7jS4/IhCRWIMuUtBCEyieQHkkej36YD6R5gtQSZ3JxyuT8hOn5O+bfPzKbfeVi8o3L2SWTxYTZ1ZT50mWxnDO/dpkupkwXE9xrd+wP1V26zK/nzNwZfwGUHEzA7EiJtwAAAABJRU5ErkJggg==)![A screenshot of a part of Molly’s keystroke debugging file](https://cdn.sanity.io/images/599r6htc/regionalized/38c337b522a0954a6b4d0a1e259c579f3de4e651-1600x622.png?rect=1,0,1598,622&w=804&h=313&q=75&fit=max&auto=format)

A screenshot of Molly debugging the keystrokes using an event viewer and FigJam

A few hours later she had a solution. Yet again, like every bug in this story, it came with a caveat. The only fix possible was a close cousin of a bug—a hack. It turned out that the Chrome bug showed up only under under specific circumstances: an empty text field. The solution was in convincing the browser that the text wasn’t empty, even if it was.

![A snippet of hack that was necessary to fix the accented menu bug](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAACCAIAAADXZGvcAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAa0lEQVQImSXLSw6DIBAAUO9/NPe1zAgKg2Ajolj/wdQa3bzdS9KYpcvrvalisflA0EvoJbuFoCDQrcKv5mMlZqP2j/m19vT29MmT2SrLiXjHsUV0CA6ZFywQjppPRsxGbjXFRsemOtwzr/wHiZtr7WuSUoQAAAAASUVORK5CYII=)![A snippet of hack that was necessary to fix the accented menu bug](https://cdn.sanity.io/images/599r6htc/regionalized/7d5f5d40323661d6ef856d936816786613d3b7bb-1757x182.png?rect=0,1,1757,181&w=804&h=83&q=75&fit=max&auto=format)

Sometimes you fight fire with fire. Molly packaged the bug fix and sent it to another engineer to review. It was 39 lines of code, half of them a precise documentation of the fix to help everyone looking at it, or attempting something similar in the future.

It felt a pyrrhic victory. It’s not easy knowing you put a matchstick under the house’s foundations. But the next day, the fix would make it to our internal version of Figma for testing. The first reaction came from Oscar, a designer living in Sweden who joined us last year: “the accent menu!! 😍😍 Need it for my ÅÄÖ 😌.”

And a week after that, it would appear in the wild, hopefully helping everyone who previously felt annoyed, frustrated, or disrespected.

But at this moment, that was still the future. Molly looked back at the list of bugs, collectively curated by the entire team before the Quality Week even started. It was Friday morning, and perhaps one more bug could be hers to fix.

_Thank you to Aaron, Ahmed, Alex, Annie, Brian, Brian, David, Delong, Dorothy, Golf, Jenning, Jessie, Jimmy, Joanna, John, Josh, Katie, Laura, Lauren, Linda, Michael, Molly, Naomi, Ojan, Peter, Qi, Sean, Shirley, Shloak, Silas, Su, Trevor, and Willy for their work during the November Quality Week, and other engineers who participated in this, and other Quality Weeks._