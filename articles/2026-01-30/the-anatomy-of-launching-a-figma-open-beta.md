---
title: "The anatomy of launching a Figma open beta"
source: "https://www.figma.com/blog/anatomy-of-an-open-beta/"
publishedDate: "2023-07-24"
category: "design"
feedName: "Figma Blog"
---

July 24, 2023

![An illustration depicting a hand holding a stethoscope over a digital interface](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFBv/EAB4QAAIBBQEBAQAAAAAAAAAAAAECAwAEBREhIhMx/8QAFgEBAQEAAAAAAAAAAAAAAAAABQQG/8QAHxEAAgICAQUAAAAAAAAAAAAAAQIDBAAREgUhQVFx/9oADAMBAAIRAxEAPwB+yxrnGq6yQyPsbAb0KcsbOY3ojnswik+gecqLB5nQrsEEVpILuf6ITKxO/wBPaEoV1tqXJ1r1mu6nYarIseg3LyfuTs6vwyDRrAI1VQAo7RV3ORJJdqzqCxjGzRU0tIo5VT2xSF4+A2uf/9k=)![An illustration depicting a hand holding a stethoscope over a digital interface](https://cdn.sanity.io/images/599r6htc/regionalized/1092cc8e983a3cd782aa0a845c040aa637be8bc8-3264x1835.jpg?rect=1,0,3262,1835&w=1632&h=918&q=75&fit=max&auto=format)

A go-to-market strategy doesn’t just end on launch day. For this installment of Anatomy Lessons, an ongoing series where we go deep on how to make products and get work done, we’re putting our very own Dev Mode under the scalpel to dissect what’s at play in the critical two-week period after launch.

1.  [The brains behind the operation](https://www.figma.com/blog/anatomy-of-an-open-beta/#the-brains-behind-the-operation)
2.  [Vital statistics: What we tracked](https://www.figma.com/blog/anatomy-of-an-open-beta/#vital-statistics-what-we-tracked)
3.  [The heart of the matter](https://www.figma.com/blog/anatomy-of-an-open-beta/#the-heart-of-the-matter)
4.  [Digesting the information](https://www.figma.com/blog/anatomy-of-an-open-beta/#digesting-the-information)
5.  [The Rx](https://www.figma.com/blog/anatomy-of-an-open-beta/#the-rx)

The reality is that launch day is the first day of the rest of the product’s life. Now that you’ve brought your product to market, it’s time to see how users react, whether you’re tracking toward your goals, and what needs an immediate fix. Think of the two weeks after launch as a user research party, and everyone’s invited: product managers, designers, data scientists, and marketers.

Meet Specimen A: [Dev Mode](https://www.figma.com/dev-mode/), our first workspace built specifically for developers in Figma. Launched during Config this year, Dev Mode is our answer to the question: [How can a design tool work better for developers](https://www.figma.com/blog/introducing-dev-mode/)

? Like a browser inspector for a design file, it allows developers to collect measurements, specs, assets, and other information by hovering and clicking around a Figma canvas. The open beta, which gives free access to all Figma users until the end of 2023, means that we’ll be able to get crucial insights about whether it’s serving our community and how we can keep improving. Read on to learn about how we prepared for the launch and triaged bugs, requests, and feedback during the first two weeks.

## [The brains behind the operation](#the-brains-behind-the-operation)

Too many cooks spoil the broth, but too few operators bungle a dissection. (Disclaimer: This is not medically true. It’s an extended metaphor; work with us here.) The same folks who brought Dev Mode to market were invested in collecting, analyzing, and acting on community feedback because we all wanted to understand how to make the product better.

In terms of how we divvied things up, the product team was in charge of tracking specific feature usage, the marketing team gauged public sentiment, and the support team zeroed in on bugs and improvements. That said, we were all in constant communication—no one missed a crucial Tweet or was kept in the dark about frequent issues. Our product manager, Avantika Gomes, drew from every source to analyze and synthesize information, prioritize action items, coordinate next steps, and iterate.

## [Vital statistics: What we tracked](#vital-statistics-what-we-tracked)

We spent a lot of time talking to developers and designers about their workflows and pain points during the final weeks of the closed beta. What we learned helped us iterate on the core mechanics of Dev Mode, tweak functionality to reflect how our users collaborated, and add new features to meet needs we hadn’t originally considered. In other words, we knew we were on the right track, but also that there was so much more to learn.

###### Glossary

A **north star metric** is a key measure of success, and the strongest indicator of meeting goals and expectations.

In addition to aligning on a **north star metric**—the percentage of **weekly active users (WAU) in developer roles** using Dev Mode—we wanted to find out whether we were reaching our audience, what they thought about the workspace, and what needed to be fixed (stat). We knew we were bracing for a flood of feedback, so we locked in the vital stats and made sure everyone on the team knew who was monitoring what.

###### Pro tip

It’s helpful to set benchmark metrics before results start rolling in—otherwise you’ll be left scratching your head over the numbers being good or bad. Our researcher also created dashboards with key metrics in advance, so it was easy to compare changes before and after the launch.

-   **Feature adoption:** We checked the pulse on **Inspect panel**, **Compare changes**, **related links**, and other features to see how many people were using them, and which ones were most compelling.
-   **Reach and reaction:** Never underestimate the power of a vibe check. **Social media post impressions**, **email open rates**, and **in-product message impressions** told us whether we were doing a good job reaching our developer audience while **social sentiment** and **live audience reactions** during Config gave us an idea of which features got users pumped.
-   **Fixes and improvements:** To understand what was bugging our users, we looked at **Help Center** article views, **submissions through the in-product feedback button,** and **support tickets**—more on that in a bit.

## [The heart of the matter](#the-heart-of-the-matter)

It was feedback we wanted, and it was feedback we got: During the first 24 hours after launch, we got over 2,000 community responses from our feedback form, support forum, social media, sales conversations, and other channels.

#### [Triaging feedback channels](#triaging-feedback-channels)

To organize the flow of information, we set up three different Slack channels for everything we were hearing. Our in-product feedback button was linked to a form in Asana—our single source of truth throughout the triage process—which automatically logged every submission as a task and pushed it to a dedicated Slack channel, **#dev-mode-feedback-stream**. (We also manually created tickets based on feedback we collected elsewhere.) We got over 1,500 messages on the first day!

Another Slack channel, **#dev-mode-internal-feedback**, allowed Figma employees to sound off on design inconsistencies—often things a casual user might miss—and **#dev-mode-external-feedback** collected input from support, sales, and anyone who interfaced with customers. We also bubbled up what we heard on Twitter and LinkedIn, where Figma has a large vocal community that’s quick to let us know what’s working and what’s not. Folks shared notable feedback in Slack for everyone to see.

![A screenshot of a Slack message offering feedback about Dev Mode](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEKUlEQVQ4jY2V7U9TdxTH+Q82N7OH6NwrR8ZwkGXZiy1xhkHrmJsmKqJQai2OOQYbsEgGGXPojAISpnESZxQRRZ46QIRltCttgQLlaW5uRmihDxTa0kKfYO8+y72AgHPJXnzvOTc5+fy+5/xuzo14qi6ZZ+oP8VyDjBcb5U9QGi8sS8ifVPN8g0xkCKyIp+uSiWnLRmm8QOHIjXUqGL7O8YGrfNl3RVS+6RoFw9UUjq6vy+i7yJvtOWyoO0iE8EjsLKL+gZq/psd56Lby0GPD7HVg9jnE9wczEzxwTTLudWALuHGEPNjXSO0cJdlQyrP1KUQIVnd1FNI40Ipl7E+m7HacU07crhl8Xi/zc/P45/0E/AFCwRDhUJiFFYXD/L24yOisGUXv92wUgBvqD/HRL9/Qek/N5OQ4NpsVm82Gw2HHOe3E7XYz6/Xi8/mYm5vDN+cTczHO+QgEAwx5xtYA6w6yT3cGw9TvuD0uLBMWHo6NMbYss9m8fIADp9PJ9PQ0rhk3LpcHl9uNZ9aD0f4Had3lq8AkQwk6xz1Mw4Ncu1nFpR8vUVt3m46ODjo7O9FoNGi1WnQ6Hd2GHrRqAyrVHapu3uD6jetcaK5iz90TbGxYA+w0m6itq+VASjKJH37AyVMnUavVGI1Genp6xNjf34dpwISqqYXPsr4gXipBslNCUl4679Z8vh6osQzRolJxKOkA27dvp6SkBIvFIs5LmKPH48G7PEu93oBCoeDVqCi2bduG5Mhe3qnKXAPUn6XLOoJWoyHzk2NIEiRUVFSIM1tcXCQYDBIKhQiHw6IEt+np6URHRxMTE8PO9P2PAQ0l/Do5THtbG4fT0ngvLo7y8nLsdrsIWAsU8u7ubpRKpQiMjY1l59GkJwAnhmhvbkaRfJC4HTsoKysTb1dwuLCwIErIBbDBYEAulxMVFSU6lP7L4XLLOrWarI8zSIiPp/Qx4Eq7gUAAvV5PqkxGZGTk0gyV+9YD9+vPorP/Jt5mbk4OUqmU0tJSEbgCE5wJ7fr9fvHzSU1N/R/A3l5yc3MfAa1W6yNXAmwFKDiUrTh8/T+AWtsoXTodWdnZSKRSys6VYbVZRWcCxB8IiOB5v1+sS0lNYesrW3ktOpqEI3t5u+rT9ZciONTrdHyVn49cJuNyZSU2q5VQMEwwECQkKBgS88EBE/nH80l8P5E9u3eTVpBJ3K2cVeCeru+4YzGi6ddx/sp5Tlecprqxhv77I4y5HFg8TiZmnUx6nUzOOhkZv0/Dzy1U1lzlcm0V59qusetu0dL6EhbsG+05HDNeJE97kaPNp1A2FZPReoY87SW+NtXw7XAtxcO3KB4RtJSfGKyhaKCaIlM1mb0/8FZ73tKCFda2QN7UdJiXGhVsbpCzqUEuxs2NCrY0HWGL6nEpefmnVW1WKcR2hV/APw4BdzNQe9uJAAAAAElFTkSuQmCC)![A screenshot of a Slack message offering feedback about Dev Mode](https://cdn.sanity.io/images/599r6htc/regionalized/5600f488db30dfa810993697b2c5a9d94b317093-1608x1608.png?w=804&h=804&q=75&fit=max&auto=format)

Software Engineer Karl Petersson drops a note in #dev-mode-internal-feedback.

![Screenshot of Twitter feedback about Dev Mode posted in Slack](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACBElEQVQokWWR22oTURSG8xbeKUgVpA1iLKK99UaQFDyiL+ETiIpiwYqHQLGgSBJNvPFKrI+haG8ULGnntOe895wzx/yyJ5NJbAc+hrUuvv3zr8axE5dx8sxVLLeuobl6A83Vmzh74RbOXbyD1qW7aK0twOfDu7Up5ysax09fwfXb9/Dk6RZeb31E580Q2+8+433/C7qDr+gPd9Cr6A6m9Diz/aDaDXfw4dM3NJaW27j/sIPvP3YxEhT83ZchEQOa6cCkLqjj19hsymxmbvAfrh+icWplHZsvupAUDRbzIKtcRmHaDpjrI4rGiJPkCEmSIMtyTCYTTIAS/pXC56/6UIgB26Y4ECQIogRZITBNC77PpRHiOD5ClmUoimIqraiFRDXAGIMoShAFEYQQUNuG53kIw7BMlOd5JZhLUGdbSLjx7C32RwJs24KiEBCiwjBMUErBmAPXdREEXJrWiYoZRcUs4dJKGw8edfDr5y4khUCQCTTDKkv3gghBOIZfEY55fxniNK8ZJ1lJkubIi4InbOPxxjZ+/9mDSHTsHSiQNQsW8+EGUS3jcj+Yy8sHohhRnB4WrmPzZQ+SrEE3bYwEGaKsQtVNGKYFy+THssp+HcctK6CUgTIGz/OrGhaP0pwfxWGs7FBVVWiaDk1ToasSqKXC93iPQXkk3in/8zlN0+o406P8A4277h8NTqKcAAAAAElFTkSuQmCC)![Screenshot of Twitter feedback about Dev Mode posted in Slack](https://cdn.sanity.io/images/599r6htc/regionalized/31da6bff93a1bb715cfe3db35343bee85eb7f653-1608x904.png?w=804&h=452&q=75&fit=max&auto=format)

Product Manager Avantika Gomes surfaces a couple choice tweets in Slack.

#### [Leaping into action](#leaping-into-action)

When the engineers needed more details to flesh out a bug report, they emailed users directly to follow up. The team also reached out to suggest temporary workarounds or direct folks to resources in the Help Center. We’ve chatted with 83 customers (and counting) so far.

###### Pro tip

It’s good hygiene to keep a few response templates in a document so that your team can easily respond to or follow up with a user, whether it’s to thank them for their feedback or assure them that help is on the way. The example on the left addresses a common question we got about accessing comments in Dev Mode.

_Hi,_

_Thanks for reaching out! I’m excited that you’ve gotten the chance to use Dev Mode, and I appreciate your feedback around accessing comments in Dev Mode._

_You can still access comments in Dev Mode! To toggle comments on, click on the speech icon in the upper left-hand corner, or use the keyboard shortcut “C” to enter comment mode. You can [read more in the Help Center here](https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode)._

_Please let me know if that shortcut key isn’t working for you for any reason! A video or screenshot would be most helpful for troubleshooting._

_Thank you so much for your help and feedback so far! With this beta launch, we’re eager to hear from our community what would help make your experience using Dev Mode even better. While we can’t guarantee the immediate implementation of all feedback, we’re committed to growing as we go and encourage you to keep sharing your thoughts._

_Thanks,_

_Molly_

###### Glossary

Coming to us from agile project management, where project deliverables happen incrementally and often, a **burndown chart** or **list** helps you track what still needs to get done and when.

We worried that we’d break designer workflows by shipping Dev Mode (spoiler alert: We did). Any pings related to that became our **burndown list** for quick fixes that we rolled out within the first few days: issues with file import and export, troubles with login, problems accepting the terms of service. Within the first week, we’d resolved over 200 feedback submissions—not bad, if we do say so ourselves.

## [Digesting the information](#digesting-the-information)

###### Pro tip

To get a bird’s eye view of feedback, use the Asana widget to bring tasks into a FigJam file, where they can be organized by theme.

While pulverizing high-priority bugs, we started sorting through the data and refining a short-term roadmap. Our ticket intake could have been the plot of _Fast & Furious 11_, but here’s how we handled it. As issues came into Asana, the PM, research, design, and engineering teams tagged and categorized them; eventually, the slow loading time and the effort of scrolling through so many sections made the feedback hard to synthesize. That’s when we jumped to FigJam, pulling in tickets through the Asana widget to then organize into different sections. This gave us a good sense of what people cared about most and what we should prioritize.

![A screenshot of how Figma organized Asana tickets in FigJam](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACQElEQVQ4jYWTy67bNhgG/f5PmKaujyVR4p3iXZJz5Amsbot0MeBuMP8H8BbKissBVwIme1R22LaSW2d1DacS0RdiqHhTCWonmUrSC1WPdDuz2YXNyotb7pXYMr7GSzgng6yO1BspNLyKJFcuqRIBPVWiaWRniHokqYGqRqoSVCm41b0Te8aV9RLKbNEtULZOjg2vI8EkvIlIYdFiZZWZKA2rEiQ50JYnbX5SxBe3ujVCS+jicXUlboX22tiPg5wa3ma8yZfY6RWvEu7LY34K/DSSP0LxoE4P0vTgllrB5xWTPKFG+rHxfX7zOr7Ja8frQtCdoLcLJxvqYZE/BtwwED9l0z/UD+LBLaQVszp0dNgcrj23186+vVhtx84ZJwtBbbjlQM6ZZVK4YSKK8aqq4990cWcTd26p5qvQ1oAt4ZLmrdL7i2g37JKxcsUtGSM68xjRiyaphaIEZR7o451t/HlxO3692F4H/bVT90b5yI5P4S9S2K+TrYwYEVFTYh48brEUqylWUY1kkyO7eFzczveb831ynue13b+cHPtnw51g61Wnnwk5RJZxxctAsYbmDFtwHMFyOMXuJLf3+81/cWwnyb1wsmNFRX811FAxohFUJmlFMZLuDZs319u9/rNw1d+YaUMOmflrRT4TdupEVcnWULymekO1kmYWupn/R6hO9PNAPBLDXTPfPebRibJRvaOthho01cx0NbHJ5x+E/cTPJ/L+zfSz8fwREH8V9P0gLo3mLS1ImhM08/l6Hx78Bg5e3A0vuY5zAAAAAElFTkSuQmCC)![A screenshot of how Figma organized Asana tickets in FigJam](https://cdn.sanity.io/images/599r6htc/regionalized/6c308f9520e4c02ca2cc1cc345888cf548ce28f1-2160x1440.png?w=804&h=536&q=75&fit=max&auto=format)

A portion of our FigJam, which shows how we organized Asana tasks into categories like “bug reports” and “usability issues”

Eventually, this became too manual a process, so we began exporting data into Google sheets, which still allowed us to view multiple tickets at once, add several tags to one ticket, and count how many tickets were nested under any given tag. As visual thinkers, we’re figuring out a way to automate the workload so we can stay in FigJam.

## [The Rx](#the-rx)

#### [Roadmap planning](#roadmap-planning)

Having insight into Dev Mode has helped inform our product roadmap plans for H2; now that we know better what users like and dislike, it’s a lot easier to chart out next steps on the product front. The marketing team was able to identify gaps in user understanding that we can continue to address with educational articles and livestreams.

#### [Retrospectives](#retrospectives)

###### Pro tip

After a sprint, folks can be exhausted, so it’s nice to kick off retros on a positive note. We asked Figmates to share “who was awesome to work with” as well as “what went well” before diving into “what problems did we face.”

While the launch was still fresh in our memory, we hosted two project retrospectives: one that focused on the marketing team’s tactics specifically, and another on how we worked cross-functionally across marketing, product, design, and engineering. Breaking these into two separate conversations allowed us to understand a core team process on a molecular level before zooming out to see how workflows intersected.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACzklEQVQokUWO309TdxiHz1+ACcQbr0yIZFdekBj/g+3G6yVkyeIWLDHRxZmFhBHnlmyJpUBrsQYtg9INg6IW94PValfAAi1I+emR0CpttBNa6uG0h53T9pzvY4omXjz5PO/7Sd68ElYFjBxoL6C0CVryAFFKfvQP80HWdgeeoqxlUfcKqKqKYRgIIZBEpYB4OYJ48g0iYkPM2RAzNkSkDaI2jNlW0g9akcdaUSKtiNlaZ6MydR5l7Vfy2yl2C29RFIVyuYzE/68h9h30HwV3A/jqYaAe4ToM3gYU7yEC5+q4+WUdmz11iKF6cDWge46yEzrPm/QS2zs58vkcuq4jCf0/rMXLmP5mzIEmzNvHMEeaML2fYP3ehDLSyL8/NjLe3khmoBFztNY1YfibKUQ7ePUyQfbNDqpapFqtIlXKRfJbETJz/aSjblLxq8ixHtajDuQ5BxuxblbDDpYfOXg+00ty1s3mpJvNmRs8Ww+TSG2znNFJvzXZr4CklS1WtzQiM7uEJ/OMzb6iK/6UzniYX+JRhqML/BOeJvh4mrsRmd8mcvgDCr6/FfpD+7j+MHH/BQ+W4HURpKIBidUqk6MqkaEC3vsZWoJ/cjLYx6ngMPb74wQHhgh5ffiHF3H26vRchisOaHfDmUvQ9oPAMy5I7Qqkki5Yi5dYuJZmwZ5kcDDBZ4E+joyf5USgE/uwi/muDhbtnYy5HnK1vYjza7BftLjQKWg5LfjiK0GvT5DcAalkCNYW94kPZpn3ZPCPynw+4ef4xCU+nejGeWeQmKeLeU83925Oc/1njWsXwfmT4PsrgjMXBG3fwvXb8CIPkl4VbGVN1hL7rMY1plcUfPIGTjnGDXmJ4IrMcizBSmyJ6EKWR1MVQiEITgoCT+DWQxgNwdQ65DSQLAG1o7VPaxQNwZ5hoRgme4aJalgUDfMDFqouUHXepwF7Bw5aGaoWvANQYtVwvsVT0wAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/33e0e2eb56d9b415fe8ed6d9894e1a5c4f5b2842-1706x960.png?w=1706&h=960&q=75&fit=max&auto=format)

#### [Result shareouts](#result-shareouts)

To keep teams and leadership updated, we needed reporting from over 10 different teams who were using a mix of tools, so we compiled our dashboards and metrics within—you guessed it—a FigJam file. It created a general overview while linking out to individual team files if folks wanted to dig deeper into a single channel.

Now that we’re about a month out from launch, we’ve moved from emergency surgery into developing a healthy regimen of regular product fixes and growth. In Slack, we post weekly summaries of user feedback, weekly roundups of feature improvements and fixes, and biweekly metric share-outs.

Like any recently launched feature, Dev Mode is a WIP, and while we’ve already made strides in improving the interface, the goal of an open beta is to get as much feedback as possible. With that in mind, we’re all ears.

_We love hearing from you. If you want to join Figma’s research panel (and earn some cash while you’re at it), [fill out this survey](https://greatquestion.co/figma/95ZO3cUX/direct) so we can invite you to future studies._

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)