---
title: "Behind the feature: building multi-account"
source: "https://www.figma.com/blog/behind-the-feature-building-multi-account/"
publishedDate: "2021-03-31"
category: "design"
feedName: "Figma Blog"
---

_Today, we’re launching account switcher, streamlining the experience of navigating across different accounts and workspaces in Figma, while still unifying your work under one single profile in the Figma Community. Product Manager [Ben Stern](https://twitter.com/benstern0) shares how delivering on a seemingly simple user request required navigating a surprising amount of complexity: the technical foundation, design explorations, and building towards a new north star, while solving for short-term needs._

While Figma is most often used for designing and prototyping, we’ve long used it internally for everything from [brainstorming creative concepts](https://www.figma.com/blog/inside-figma-tips-from-the-team-that-builds-figma/#getting-into-a-state-of-flow) to [building slide decks](https://www.figma.com/blog/the-case-for-lightweight-prototyping/#communicating-at-figma-in-figma). Increasingly, we observed users relying on Figma for so much outside of product design, like [creating digital maps](https://www.fastcompany.com/90494579/while-stuck-at-home-this-vc-built-a-virtual-version-of-silicon-valley), [developing vector artwork](https://www.figma.gallery/), [planning a wedding](https://www.wsj.com/articles/digital-designers-take-professional-collaboration-tools-and-riff-on-them-11616580001), and even [making fan art](https://twitter.com/bonniekatewolf/status/1338532050534481920?s=20). Figma has become a home for projects at work, and a space to create outside company walls.

![](data:image/png;base64,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)![](https://cdn.sanity.io/images/599r6htc/regionalized/60f2825d3c2faba456752fab4d93e00ca57ce380-1980x2388.png?rect=1,0,1979,2388&w=804&h=970&q=75&fit=max&auto=format)

Art from Figma Community member Dinara Nikolaeva

So, when Director of Product Sho Kuwamoto [asked users on Twitter](https://twitter.com/skuwamoto/status/1242516046759620613?s=20) what they’d like us to add or change in Figma, it was no surprise that support for multiple Figma accounts was top of the list.

## [A new paradigm](#a-new-paradigm)

As we scoped this feature, we knew that user feedback would be a driving force. More than anything, we heard that [users have many roles](https://twitter.com/elishaterada/status/1352033344666574848)—employee, freelancer, hobbyist—but no simple way to move between these different identities. Instead of [resorting to complex workarounds](https://twitter.com/amanfromsolan/status/1352229816490070019), they needed to easily switch between workspaces, depending on whether they were creating designs at work or during off hours.

And _creating_ work has different requirements than _sharing_ work. While users need to move freely between accounts as they’re designing, they also need to have choices around how that work is packaged and attributed. Many Figma users maintain a public profile in the Figma Community, sharing their work, [managing comments](https://www.figma.com/blog/behind-the-feature-figma-community-comments/)

, and connecting with others under

[one handle

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAACVElEQVQozx2Ry04TARSG+zI+gC/AwifQF3DjTjdGE9lxkY0xhsSFcYF4CSRYlItoYNUW0kqhpYWWtlN6nU5npp1L59bOtCWRz4HFSU7O5f//c/6Ie/QY+3ge6/QNdmYe+yqK0lKpXIy5zPo0qwGmMca0PCTFoFJXOLtsk87XKAoiumlh2zayLKNpGhHz4DXawTvUsx30egxHTmL3G5iai9H3cawJ4+Aa3w9wvSEDy0VWdZqijCT3QjDnDrDX62GaZggYfY+09oHc/gWlooFjtPCdJv2eRKPRoNMRURSFriTdqbhdtCwL13Xxhh5BEDAajXAc564WGWUTNPePiK7I7O2OMbSA6WRIt9sll8uTSqWIx+MkEokwT5LNZlBDgonnMnVtRiHQLdEtqed5RKZDh0bFYu2LR3QjQO5OmAQWjtlBkduUy2UymQyFiwKlUplSuYIoh73OFYO2QLdxxc72NltbW+E1HSKOpdERVTKnfc7zFnrfxNeTTNWvTAcpDL2LoipouhUqcRHC2V9Cio/HGyRLSdrNOp9XV5mdnWV3d5eIIRdQ2yehsycYyiXeoM5E/sQ/4SHj1iKt2jG5okCh2qNa80gLLV4lVnjw4yVLyW8UpRqHR4fMzc2xsLBAxOqdo0tJ+u04AyXN0MhzLS5xU7hPIDwNjUqwlyhxkJapdYbUQ7XLp5vM/HzBo/1FvgtxqmKDWCzG+vo6Ec9WwsdKYbQZuV38wTnX9Wfc5O/hV5+HP8zxO6UQyw+QdR8vdPSvWORJbJmZP694m99ENFU818MwDf4DH6VzkcWKI5AAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/c87b9b526653b43596c015c808a54c2dc6e323d1-4240x2000.png?w=4240&h=2000&q=75&fit=crop&crop=focalpoint&auto=format)

### Beyond multiplayer: Building community together in Figma

Today we’re introducing two new spaces in Figma: The Figma Community and a redesigned Figma workspace.



](https://www.figma.com/blog/introducing-figma-community/)

. Keeping personal files separate from work projects is important, and equally critical is allowing users to maintain one public brand as they change jobs or roles.

### [Rethinking the 1:1 model](#rethinking-the-1-1-model)

Among the many things that the enterprise team is tasked with, authentication—the concept of recognizing and verifying a user’s credentials—is top of the list. Authentication is usually synonymous with _security_, but it also ties to _identity_. Most product assume a 1:1 model, that one user equates to one account. Companies like Slack, Google, and Instagram ultimately supported multiple accounts as user needs evolved, but they started with one account at launch.

Since the Figma editor is the hub for creation, and the Figma Community is the home for publishing work, we needed to consider both spaces. While we’d want to allow toggling between separate accounts in the Figma editor, in the Figma Community, it would be important to unify all accounts under one profile. What complicates this even more is ensuring that work projects respect the walls of a company, while still allowing for easy access and switching between personal projects.

Our goal was to help people work in Figma in a way that reflects all the facets of their work—both inside a company and outside of it. It was time to move away from the paradigm of one person per Figma account and make switching between contexts easier and intuitive.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACKUlEQVQoz4WSy05TURSGz4MQWt7AGEfGxCEv0BdA6I0gtZeATeQUT8UYSOmoscbIwMSE22lpawhQ26QCTa+ngEJpGyYqCEoohtbp5+kx1qBUB1/2Xjtr//tfey3BK3mw2+9xp78fp2sEjyipjCOKImNjYx0RPSIPveOMSyI22zB9fX2Mjo4ivH+3w1pijZfzr1hNrpLZ3CASDhMIBPD5fB0JPn9G9M1r1pU0oUiIYDBIIpFA+N5sslcps/o2zv7BFp8Py6wsL+GVJJxOp4bD4WjTil0uF5O+KVK5DT6eHZEr5gmFQlSrVYRGo4FSKrEUDVOpljg52ScanVPtj2AymTSMRuMlzGYzXq+XdCbN6dkphWIBWZapVCqqYLNBoVBgUV5kt7LN4ZcDIjEZt/s+FotFoyXwi1ZstVp5PDFBLpejXq9TLBZ/O7y4uNAEF+QFcmWF8nGNRU3Q/U/BCU0we0mwVqsh1M/PyefzzMnzpPfybB+VmY0saB3rWLJ69kgtOZvN/u3wtP5NFfxZcmlX4eBTjehyBOk/TZmenkZRFM5VQ6217fDD8VfWNzeZmXnB2soymcy6OgYygacB7dJV+P1+NX+GVCrFjjp2sVhMG5tkMolQ2NomHF7CNjyMcWCAu7YhBocGsVgv/92fOFxOJv1TPPFNYlZzDQaD9j1CPB7XXuvt7aW7uxudXoder7+Snp6e9v7m7VsMPbBjdA5y7cZ1urq60Ol0/AAZWFTs/FyxKwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/0df5d822895f8d53ffcb2012b7bfd922cc232f50-5000x2658.png?rect=0,2,5000,2655&w=804&h=427&q=75&fit=max&auto=format)

Some early explorations on how to indicate where a new file would be created and what this experience would look like in our desktop app

## [Designing towards a north star](#designing-towards-a-north-star)

With this in mind, we started designing. But once we actually mapped out what this new paradigm might look like, we quickly realized that the “one user, one account” model was baked into the file browser UI, not just the technical infrastructure. If we were to add on support for multiple accounts based on the previous version of the file browser, the UI would be clunky, at best—not to mention the broader under-the-hood technical challenges. To accommodate a new account switching feature, we’d have to re-examine the whole information architecture (IA) of the file browser.

So, we needed to arrive on a long-term direction of the file browser, while also making changes to address user feedback in the short-term. Our new north star? A hybrid model, allowing users to access multiple workspaces in the Figma editor, while maintaining one single Figma Community profile.

As we thought about how to build this, we needed to be conscious of what it looks and feels like to go from one single identity (the Figma Community) to multiple identities (the Figma editor). We would have to make the Figma Community feel separate enough from the Figma editor, while still being cohesive from a design perspective.

UX considerations were top of mind:

-   **Managing tabs:** We didn’t want users to have to close and reopen their tabs each time they switched between accounts. Instead, we made it possible to keep tabs from _different_ accounts open at the same time, in the same window. To make it clear which account is open in a given tab, we added an icon in the center of the editor that shows which account the file belongs to.
-   **Installing plugins:** We heard from users that they want to access all installed plugins, even when signed into multiple accounts. Now, if a user has multiple Figma accounts connected to one profile in the Figma Community, clicking “install” adds the plugin to all connected accounts.
-   **Naming workspaces:** Previously, accounts outside of an org account were called “Personal” spaces. After hearing user feedback via our support team, we realized that this was a misnomer since work in this space was still tied to a work email address. We renamed the space “External teams.”

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAAsSAAALEgHS3X78AAAB7UlEQVQoz42S3U9ScRjHz9/WTVut1kUWy5WVueZsLS+w9KI3wC2yJjZJcdqA0gSlDSZpOiyR1gjZwFLEePGQECdezmEHbj+dg13URVsXn/0+v+fi2bPn+wiNRgMdVVVpNZu0Wi2N5pH/B/WGyoFUR5Rq1BUFoSRVyXwvsy+WSOcL7GVF0jntzYnsa3/ddXT/s5YrFKnUZEqVOrG0SDSV56AkIWzEkjj9ISa8b7G5fYzMzDMy/Rqz3ckjxyssdpfmrrabxo9qw89dTM752d7NkcoUcHiWsEzOEghFEDxLa9x54sBotWMem8Jim2DQ/Jie/kG6bxo503mVEx0XOW24zLFTHZw838Xxs5fovjXE2kaUaPwLt+8Nc+5KL2OTMwgr4Y88dc3h8L4hEo2RSG4T3tzEHwjgdr/EZDJhNA7Q13cDg+ECXdd66bzeT8/AA6a8QXzvPmAdtXH34X0WfIsIuUORT6kEyeweNbneXrQeUr1Wo1gssruzQ3xri/VQCN+iD19gmYWVMOPzQYaeubG+8BB4HyKa+Ew2n0VQVIWyLFFpVFGb6u+U/0a/AFmWKUsSh6UfFMsVIvGv2j5nGXV6iadS/FSqKA0t5aY2kd5IR/d/oTfWJ69WKtSqVb5lsgSWVwmurpMXC+1minY2vwADsBFUQDJRCgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/e1d6c1d7849b36b327d3f23bfc3784e4469c0755-1600x654.png?rect=1,0,1598,654&w=804&h=329&q=75&fit=max&auto=format)

Early explorations of the menu with feedback and notes from the team

## [Embracing hard problems](#embracing-hard-problems)

Whenever we see a commonly requested feature, our instinct is to ship it as soon as possible. In this case, we initially thought that building support for multiple accounts would be a straightforward ship. But as we scoped the project, we realized just how interwoven the work would be. Changes that one team made had the potential to disrupt ongoing workstreams across product, design, and engineering.

Throughout the process, we considered various approaches to building an account switcher that would’ve been more straightforward, and thus faster to launch. In many ways, the easy answer would be to ship an MVP in response to user feedback. But knowing that our ideal state would disrupt the file browser IA, it was important to get it right. While getting it right took longer, it also allowed us to think more holistically about the user experience—landing on a solution that solves immediate needs, while leaving room to scale with Figma as our products evolve.

Check out the new account switcher feature in Figma and get more tips in [this help center article](https://help.figma.com/hc/en-us/articles/1500005165741). If this type of cross-functional project sounds like an interesting challenge, learn more about Figma and [check our open roles](https://www.figma.com/careers/)—we’re hiring! And keep submitting feature requests—whether it’s through [support](https://help.figma.com/hc/en-us/requests/new?ticket_form_id=360001731233), our [forum](https://forum.figma.com/c/product-ideas/12), or on [social media](https://twitter.com/figma), we’re always listening.