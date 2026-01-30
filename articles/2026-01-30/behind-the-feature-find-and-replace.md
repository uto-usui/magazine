---
title: "Behind the feature: Find and replace"
source: "https://www.figma.com/blog/behind-the-feature-find-and-replace/"
publishedDate: "2022-10-06"
category: "design"
feedName: "Figma Blog"
---

When we first started working on find and replace, I assumed it would be straightforward. After all, I had already built [a plugin of the same name](https://www.figma.com/community/plugin/735072959812183643/Find-and-Replace) back in 2019. _How hard would it be to add a search bar and highlight stuff on a page?_ I learned quickly that a seemingly small feature can uncover a tangled web of engineering and design challenges—from sorting search results, to designing specialized UIs. Now that find and replace is live in Figma and FigJam, we wanted to share a behind-the-scenes look at those challenges, our approach to testing, and how we translated learnings from the plugin to build a native functionality.

### [Building intuitively](#building-intuitively)

We knew that most of the work on find and replace would be focused on building an intuitive "find" experience, so before we even scoped the feature, we ran a brainstorm with the design team. We gathered some ideas and opinions on what makes a great search experience, and began building out a cross-functional working group that included engineering, product management, UX writing, and product marketing.

![Stickies and prompts in a FigJam canvas during a brainstorm](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuklEQVQokU3QzYsbdQDG8fmHStkEa0HZQi9VUXrQs6ArYqs9bbV6ECnFP6F6ELx5UvBgl7had7PtRthNsmEnL5uZJPPLTGYyr5n3l6Zqv9Iugofn8Fw+PDySvV9H7NaZNurMGhtYzU3i8T0svcdwLDgdKowUDXPpEQUBni4wFypuqJHmLlWVU+UWZXxClYyQjId1lAd1xg/OQe9wk2J6j9DpMzdM1KlAmc4xLQffD9A0ndlUJrAPyKMOVRFQpILI3mdlHyFZezXEbo3nsNvcIG1v8lR8RRk8Ig3PCAKLuWEhDAvHC5jNTWazPqHVoPB/pcoEcbRkrvWYTE6RolYd/3Gd8LBO/OcGeecKa+0LKucHSq9BEWsvli1tG99zsZY2tm0S+z0yd5cikglXLspEQx4qSE+6Nap2jfK4Rta6QHJ4mVL5nNL6iVLskBl9fHuJbahY0x6GmOB6AYGn4xpHpN6IOPSYzHR6fQXpmfwSz+RL/HN6ibJ1gfD3OungSyr3mEqcEip9NFVhPu5inbWw5ip+EOK5LrZ6RjhTWNk2hrlEmc2R/lY/4Hn+UrYo5XeJu1tk4nvWic46DokdG0NfYFsGiSdIV4I8dcmTiEwIwsGQpTbH9VdESYLU3r9Pe/8bOs1vOd67T+fgO3T1MUUesl6vKYqCJEnJsoIic0iDIyKvQxRY+LqBJssM5QG6YRLHCdInNz7i1sc3uXP7Np9tb3P37tc0fmviBSFFUZLlGVmek+UFaeLiWG2mkxaqOmLQ7/PooMnDP/Y4OemxWCyQrr3yMq+9epm3X7/GO29d58bNO/z4SwvTiUjSlCRJSLNzNE4SFkuN8aSLECMMTWU8lBkMhsyEziqMkN6/epGtqxf58M0rvHf9DbZvfcrPO/8D0//A4kX33AG2vkPodMmi8y9XcYYTl+RPnvIvtsnvRAligfsAAAAASUVORK5CYII=)![Stickies and prompts in a FigJam canvas during a brainstorm](https://cdn.sanity.io/images/599r6htc/regionalized/137606a9d6407cb9e23cc4041c7c71aa29fad7f0-2882x1661.png?rect=0,1,2882,1660&w=1080&h=622&q=75&fit=max&auto=format)

We started the workstream by asking the team for great examples of search experiences in other tools

We then defined a few high-level principles for how we'd want search to feel in both Figma and FigJam:

1.  **Fast and lightweight**
2.  **Smooth, especially when navigating across the canvas**
3.  **Familiar to searching in other apps (e.g. browsers)**

Search is one of those features that's tough to get a feel for without trying it out on real files. I leveraged my plugin development skills to build a prototype that simulated part of the search experience, allowing us to experiment with different ideas early on. From there, the engineering team continuously built and iterated on designs throughout the process so we could get to the right solution faster. As we experimented with different approaches, we relied on Figmates to use it in their daily work, share in-depth feedback, and participate in bug bashes.

### [Getting the core experience right](#getting-the-core-experience-right)

We decided to solve find and replace in FigJam first. This allowed us to focus on the core experience—finding text in a file and navigating through all the matches—before expanding to support more object types and levels of complexity that are typical to Figma files.

##### [Sorting out sorting logic](#sorting-out-sorting-logic)

Building search in Figma and FigJam presents unique challenges. Content in Figma and FigJam is multi-directional and multi-dimensional. The canvas doesn't flow from top-to-bottom like a web page or text document; it has a user-defined structure that we need to be able to predict so that ordering makes sense no matter which type of file you're in. We tackled this challenge incrementally.

##### [Building on top of existing logic](#building-on-top-of-existing-logic)

First, we needed to develop logic for grouping and sorting results found on the page, focusing on where to start and the order in which to navigate. If we didn't get this right, the search could feel jumpy and leap across the canvas between multiple matches. Our first attempt built on top of existing sorting logic used by our prototyping engine, which automatically sorts objects row by row. (If you've ever created a presentation deck in Figma, you may notice that the slides are automatically sorted in this way.) While this logic works reasonably well for neatly organized objects like slide decks, we soon realized that it wasn't as reliable when dealing with pages that have stickies and shapes scattered all over the canvas.

##### [Leveraging sections](#leveraging-sections)

Once we [introduced sections in FigJam](https://twitter.com/figma/status/1512112577915936800), the files became more structured and we were able to sort the content one section at a time, thus making the sort order feel more natural to the visual groupings on the page. After analyzing how teams use FigJam, we found that they often group stickies together during brainstorming to pull out key themes and align on next steps. Sometimes stickies overlap to create “threads” of replies to an idea. Brian, one of the engineers on the project, implemented a spatial sorting algorithm that groups elements by proximity, allowing us to surface logical groups of results when they're not organized within sections.

##### [Forming heuristics](#forming-heuristics)

![A FigJam file with diagrams showing stickies being grouped together](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAACpUlEQVQ4jZ2U2W4lJxCG/f7PNFLuomii2ZJJ5OXIsX0O9A40O0VVEXHaksdzOaVfCAp91K+im5vWGnIrSIBM3N4FMyMSVEZs/NNejxtijiWtdlc+pkqV2iGkhojgbNqmYjVBaYgN61WvZ90QoQ/rstzO24uJyQHb0hWAC2DZlyC/p+UOg6IUyGtyM0V7eLkhppTMru+1PinvVaIt4hbRFMqVMCrYvsH2Ee0J3Ypa1PUB7cwAjbvtlmu1yemwq1hUIpWqimnPMVeg4sg/4/6lqi+4SzQbmpH8zrUelVtCNvm1YIcjaLdZLwt4KomCquZUls9V/0fekHccI8Mb3EwCFbwKqR8RQFtl/VQgUM7oHOhL7vB3ChN5SyFwhbfKewxmv2i7qQgqoYplz7lU6LAP1c1o78nfUxwpmA4flbm1Qhxy9H7ywbiMrpArFCoBEgNQypQ9F8Wwcdl7z3N+7TY3zlQtBFP2WFMhBKJCBETIREyESFivCejqc+TjnpHJ1PCS5qc0rXX3HAO6UPfQzeXQcuAUKPWRc+QUWk6t1IZXuJGhcK7LU50kbROpOT7O9u8pPY94XRbRMyCnY5eNai5x4cYddpwm1oJWyZugRYS7Qf0u7dcLSIHz4P6alg+j/SRACFwkb3PbA2f6ATaC1leBlP4faf4U/vaSL4P9Nnf4c4dplU0tP8OkZB0EjpKv9eEs9cdh+iDMV5EeZTyJchZ1FOUsq5hZBy5v8FzHMd0O8DQcMM7d/PJb918uAldBiyzPw/5pCP8utL2HcZrzw1RfBt6GpgZWEuchPY7pNOA0sBpoHdPDbP4Y493COh4wNU5cDDtNWvOumuviY7TqLWN1nXQ+K1z3FjLX3u3WGjWChsC1q73XjxmG/o83qP2luH4k1/fkF+N/5Lt9YBt3TNIAAAAASUVORK5CYII=)![A FigJam file with diagrams showing stickies being grouped together](https://cdn.sanity.io/images/599r6htc/regionalized/56df37fa1c8c76012673c81d5dad45f0e9cf550c-977x977.png?w=977&h=977&q=75&fit=max&auto=format)

We mapped out heuristics about how section shapes influence the sort direction

As we tested our approach, we also noticed that users tend to post stickies from left-to-right in tall sections, and top-to-bottom in wide sections. From there, we formed heuristics around how the shapes of sections would influence the sort direction (among many other nuances) to make traversal feel natural.

##### [Zooming and panning](#zooming-and-panning)

When someone searches for a word on the canvas, the canvas automatically zooms into the active match to give it focus. Zooming to 100% usually puts text results in an optimal viewing size. But some text can also appear gigantic or tiny, so we defined an acceptable range of "effective font size" (font size \* zoom level) to determine if they need to be zoomed in or out to become legible.

![Guidelines about when we decide to zoom](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA3klEQVQokYWSiQqEMAxE/f+/9JbWC69q1c4ygUoVdzcwFHu8TBKj8zxhrcW6rqJ93+Gcw1tw/5+i4zgwDAPquobWGn3fwxiDbdsu/UryDAESkuc5kiRBlmWoqgpKKVHTNJim6YKGYjjn5IxVikOWPI6jAOM4vpSmqYDbtsU8z/KId7l60Yy1Fl3XSWLuRaQuyyJu6I7goihQlqW0wbvzMLbA95syxkhSAgkXIA/YP8JCEcgHhPEeV7p6c0nxXID8YB8J9cPRSsuwwt75ePbxNhSfOSyFrqhwut8gz9/mAzT+byIvSkNwAAAAAElFTkSuQmCC)![Guidelines about when we decide to zoom](https://cdn.sanity.io/images/599r6htc/regionalized/03bb02d978a2c5dcfd010664aa1dcf8fc0b1ba51-1608x688.png?w=804&h=344&q=75&fit=max&auto=format)

The zooming logic we decided on

When there are multiple results in the same view, we avoid panning to each result to minimize unnecessary movement. However, this also makes results near the edges of the screen harder to see. So, we decided to outline an invisible box in the center and only pan when a match falls outside of it.

### [Going beyond text in Figma](#going-beyond-text-in-figma)

While FigJam's search was designed for simplicity, we wanted Figma's search to be _powerful_. Instead of the one large canvas in FigJam, Figma files can contain nearly infinite pages. Plus, we knew that we needed to support search for frames, pages, components, and other layers, compared to the simpler text search in FigJam.

We identified three primary use cases for find and replace in Figma:

1.  **Text search**
2.  **Quick navigation to pages and top-level frames**
3.  **Layer name search**

We wanted the search experience between Figma and FigJam to feel consistent and familiar, so we began exploring variations of the floating search bar on the canvas vs. in the sidebar. FigJam’s floating search bar is lightweight and works very well for searching text, but it falls short on layer name matches—a critical use case in Figma. (Imagine having to get through hundreds of mixed results before arriving at a component or frame you're looking for!) On the other hand, the sidebar was better at showing layer name matches, but felt much heavier than the floating search bar, and it wasn't obvious how we'd combine text and layer results harmoniously.

![A search bar in a Figma file](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGAwf/xAAhEAABAwQCAwEAAAAAAAAAAAABAAIEAwUREgYhBzFRcf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AOgX7xTb7jcqkmhMrxWvOTTacjP1M+I+K7TBdVMt9Wa4kYL3Eaq8cBseh7W8TrbHX4kuFmksbglhhsNOhDLWk7Ebn2UKkBP1CD//2Q==)![A search bar in a Figma file](https://cdn.sanity.io/images/599r6htc/regionalized/2a68d56b057677c60ddf8ac79baa5ed75f21cb71-1600x781.jpg?rect=1,0,1598,781&w=528&h=258&q=75&fit=max&auto=format)

A floating search bar, one of the directions we explored

I spent weeks exploring variations, including a few hybrid designs incorporating both surfaces. Still, nothing felt particularly _great_.

This was one of the toughest problems I encountered. Rather than trying to solve it alone, I decided to present my ideas in design critiques to get input from the rest of the team. It was a complex problem with lots of feedback and differing opinions.

![Screenshots of feedback](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsTAAALEwEAmpwYAAABqUlEQVQokY2S3ZKjIBBG8y62goCI/1HUUWOS93+IeQev+LYgm8ympnZ3Lk41lNbha+gTEeEnRFH0X4gIp+cijmMwxgJJkgSee//tCXnoT+jt0JdQCIGiKFCWJfI8h9Y6oJQKUpEK6Nwgy0soXUL5mpcQmUHC0u/CTCkMw4BlWTDPc1i3bRukXiilRN326MYN7bihsZ4VprHgMgtp34RKSdhhwOVywbZtmKYJXfcQPq6AQRc1umlHN9/QjDvKfoUqWiRcvNp+CXWmMI02yD6WBdZa1HUdWvZCn0DqAu14wfnj/lu4QOYV4oR9fxSfcLQW1+s14MV93yPLsiDknCMvarR2QzddQ8vVeYYyNRLGvxI+F2maBsHtdsP9fse+7yHl1x0q1M0ZzbCg6heYdoSuekhdvgujKHJE5KSUru97t66rm+fZWWtd13XOGOM45wGV5U6byqm8ckIZx6V2LJWO4iQ4PG+v7F/V40enKEwYI2NMaPeRwM9iEgjz+JrJx8g8Ex5EdDDGDiHEkabpwTkPe189cRwf/r9/4R2+niKizyiKfgQR/RXv8fUXBxFnTsrwRG4AAAAASUVORK5CYII=)![Screenshots of feedback](https://cdn.sanity.io/images/599r6htc/regionalized/54a82c7ef558efa074a277210ce2be9ee63db22b-1999x1166.png?w=1080&h=630&q=75&fit=max&auto=format)

Conflicting feedback from teammates

I regrouped with our Product Manager KC to prioritize goals for find and replace, analyze our options, and find a path forward. We realized that our top priorities—layer and page search—were better addressed by having a search bar in the layers pane alone. It was more important to design an optimal layer search experience than to be completely consistent with the experience in FigJam. We removed the floating search bar and tried to incorporate text results in the layers pane, so everything would fit together nicely.

### [Details and reflections](#details-and-reflections)

There are endless details we could’ve spent time on. Here are just a couple examples of decisions we made and how we got there.

##### [Designing shortcuts](#designing-shortcuts)

Search is a keyboard-heavy feature, from pressing ⌘F to typing in a query and navigating between results. Designing a set of shortcuts that feel intuitive was a top priority, and also one of the most challenging to get right.

One interesting observation from our internal testing was that some users coming from FigJam instinctively pressed _Enter_ out of habit to step through matches in Figma.

![Screenshots of feedback from teammates on Slack](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAYF/8QAIhAAAQMDAwUAAAAAAAAAAAAAAQACBAMFEQYTMRIVIVGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCHvVGZ3GXgXV43XYw0gcrNMebjxSuo+FEVBX6RoTBa3dTLnnddyD6CIiC//9k=)![Screenshots of feedback from teammates on Slack](https://cdn.sanity.io/images/599r6htc/regionalized/55e4d33a79b1eaeeb9291a6275f31eb01e988351-1600x638.jpg?rect=1,0,1598,638&w=804&h=321&q=75&fit=max&auto=format)

We created a dedicated Slack channel for internal testing

The obvious answer was to support `Enter` = _next_ as users expect. But there was a lot to consider.

-   When you search for a page with `⌘F`, _Enter_ should navigate to the page
-   If we supported `Enter` _= next_ on text/layers, but `Enter` _= navigate_ on pages, that would create an inconsistency
-   If we changed `Enter` _= next_ on pages, we would need another way to navigate to them
-   If we didn't support `Enter` _= next_ in Figma, that would be inconsistent with FigJam and fail users’ motor memory
-   If we removed `Enter` _= next_ altogether in both products, that might not meet the expectations of users coming from other search tools

After prototyping and iterating, my instinct was to keep `Enter` _= next_ for text/layers, and `Enter` _= navigate_ on pages.

### [Learning from the plugin](#learning-from-the-plugin)

Being able to apply learnings from building the plugin to designing and developing a native feature was incredibly instructive. We didn't just copy the plugin UI and call it a day; we used it as an opportunity to review a successful plugin design and make improvements.

For example, I learned that after replacing a word, the canvas should wait for a little bit before jumping to the next word. This ensures the user is able to visually see the success state of their replacement before moving on.

The "Keep original case" setting in the plugin allowed you to preserve casing from the target word. By adopting smarter rules that cover most common cases, we were able to remove the setting altogether in the new design. That's one less thing users will have to worry about. It may seem small, but those small details add up to a big improvement in the user experience.

![A diagram showing a "target word" against a "replacement word"](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA8UlEQVQoka2RWW4DMQxDc//rNrGolYU09SRp2vy0BgTRpvS8XUiyqt5GZNDD6RnMX2p6dL58X+iGyGRWMjMHJgZ+4MqbrgFvf3Lmz8BqowERVLdpNDeqKWHgVW5cKuNtv7O5DfwEblHuTFOaKQVCVSUACjB6rXXq8b/qAMwp7yfMOGAKBkDrBrkDdwxQDsD29zwfgQ1KkSNU6WZTZGYHVPHUvDdqf8/zCdhv0Iu9kx5XfgLiPRAvV+6RWWlWqVqmWiJSqloAJlqvtU69/c4AKjP7mwd1/5QIpjvDfXZ394mtOz/qx/x6wn8cA2z4X2NzPgHdZmN2vosuaAAAAABJRU5ErkJggg==)![A diagram showing a "target word" against a "replacement word"](https://cdn.sanity.io/images/599r6htc/regionalized/ba8c8983b603e9742723995f4dc4e33440a050eb-3216x1810.png?rect=2,0,3212,1810&w=804&h=453&q=75&fit=max&auto=format)

We removed the "Keep original case" setting in the new design

Above all, I've learned that everything comes with its own set of tradeoffs, and that there are no perfect answers for even the most (seemingly) straightforward questions. Ultimately, each decision we made was a mix of experimentation and intuition shaped by months of hard work across product, engineering, and design.

Many thanks to the working group at Figma—[Product Manager KC Oh](https://twitter.com/okaysee), engineers [Molly Lloyd](https://twitter.com/mollymerp), [Brian Schlenker](https://twitter.com/the_schmance), and Akshay Subramaniam, [UX writer Ryan Reid](https://twitter.com/imryanreid), and [marketer Sula Yang](https://twitter.com/pseullah)— for making this possible, and to all of you in the community for trying it out! You can learn more about find and replace [here](https://help.figma.com/hc/en-us/articles/9141292269847).