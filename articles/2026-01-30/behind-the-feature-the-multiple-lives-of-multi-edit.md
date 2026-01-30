---
title: "Behind the feature: The multiple lives of multi-edit"
source: "https://www.figma.com/blog/behind-the-feature-the-multiple-lives-of-multi-edit/"
publishedDate: "2024-03-06"
category: "design"
feedName: "Figma Blog"
---

Every now and again, we ship a feature that makes us wonder how we ever got along without it. That’s certainly the story with multi-edit, which simplifies how you edit multiple objects across Figma. Now that it’s here, multi-edit feels like a natural part of Figma, but it deviates from an industry-wide norm on how selections work, and working out the details took time. Multi-edit had multiple lives before we were able to finally switch on that feature flag. Now that it’s live, we wanted to share how it came to be. Vice President of Product Sho Kuwamoto and Product Designer Nikolas Klein take us down the long road of refining multi-edit, and explain why building second-nature features should be a first order of business.

[![ A black background with white text reads "Multi-edit overview" and "Select and edit multiple objects across frames and component sets at once." Underneath, a green "Start" button. T the right, a graphic depicts a cursor selecting one of several green outlined squares.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAABTklEQVQoka2S2U7DMBRE7cRpNmenTZWmKyFtCCHdItRK8AT//0mDfFEFqUDioQ+ja1v28Xh8GWMMNxajAef834c4Z2AXsV+AlmUhSRJSEASkMAxp/edmITj8cIB4ZCFITMjAgCMFdNEzwwjUti0OhwOapqFxXdeIoqgHlL6BsgmxPaWo90MsSh9p7hC0B4zjmEBd1xFU1aqq4Ps+RXGJI4gHeH65w/ljhu4tx2abYFZIctoDuq6LPM+xXC6xWq1IWZZBSgnTNGEYBkHVwc02wvF1jN05xeM+xmLtw7sGhrGLss5QbCZIx0OKQGXoOE4PqJ42Lz1Uuwj1Mca6DTF/8L4cfn8Qw3jq4vQ+wdNxBC+wIYQBIQQ0Tes92bJ1ymxWeORsWkia2+5VhuqG6b3EMLMhjL/bR9M4TFsngHKrqppr+tUvK7tqM9du2Ni30icTPvVxnHEyvQAAAABJRU5ErkJggg==)![ A black background with white text reads "Multi-edit overview" and "Select and edit multiple objects across frames and component sets at once." Underneath, a green "Start" button. T the right, a graphic depicts a cursor selecting one of several green outlined squares.](https://cdn.sanity.io/images/599r6htc/regionalized/ccfbfc04a6916b127f24eed3181e1be40bed50c8-2553x1431.png?w=2553&h=1431&q=75&fit=max&auto=format)](https://www.figma.com/community/file/1343991048099728924)

**Ready to test it out? Try these shortcuts:**

-   ⌘ Command + ⌥ Option + A to select all matching objects.
-   Shift drag to select specific matching objects
-   Select multiple text objects and hit enter to multi-edit text.
-   Select a component set and hit Q to enter multi-edit mode for variants.

Explore the [playground file](https://www.figma.com/community/file/1343991048099728924) for more.

## [The philosophy behind multi-edit](#the-philosophy-behind-multi-edit)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAQFBggH/8QAJBAAAQQCAQQCAwAAAAAAAAAAAQIDBAUAERIGByFRFUFhgZH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9grb2RXUCzwbalOucG+R2B+co7zqm/opUWw+SZlQ1KAcjFIGx9kHInULkRp2NFn8hIXstNkkAj3mRvYrCrFhiSlMZrkgIccc0kHfnA6YhSEy4jMhHhLiAsfsYyvr7SubhMIRMYUlCAnYUNeBjA5kuLiXb9xEOzVhZDgaAA0An1rMX3aW41KdaDzpbQ4OIUonWMYEKg6ttq6uTGYfBbQTrmOR/uMYwP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/d6384f26f5bad7f6b142040dc1af51a067baf7a6-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Sho K.

One of the things I love about working at Figma is that we get to question the foundations of how design tools should work. Sometimes these questions lead to big new features, and sometimes they lead to lots of small improvements. Multi-edit is the rare example of a feature that does both.

We first came up with the idea for multi-edit in 2019. We were in the midst of designing the [variants feature](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants), and there were so many thorny issues that we decided to clear our calendars and do a two-day-long design summit to sort it all out. A lot of the important pieces fell into place right away, but one of the core issues we were wrestling with was the amount of repetitive editing we were asking people to do. As you know, editing variants can become tedious, and we were tossing around various mechanisms to make this process easier, but none of them felt right.

Then, we had a simple insight: What if you could enter a mode where all of your edits would magically happen to all the variants at once? And in fact, wouldn’t you want to do this in other places, too? Aren’t there lots of times when you want to edit a bunch of designs at once?

We sketched it out on a whiteboard and called it multi-edit.

### [Hibernation](#hibernation)

After that initial spark, the multi-edit idea spent a lot of time in hibernation. We couldn’t start coding right away because we had to work through the core ideas. The answers might seem obvious in hindsight, but they weren’t obvious at the time.

We started out thinking of multi-edit as a powerful new mode that lets you edit lots of things at once—kind of like how multi-selecting text in an advanced text editor works.

Once we started trying to nail down how multi-edit would actually work, we were faced with the reality that Figma already _kind of_ lets you multi-edit by selecting multiple objects. There are just a few problems:

1.  It’s hard to select the things you want to edit.
2.  Once you have them selected, some of the edits don’t work very well.

For example, it’s easy to change the color of multiple objects, but it’s hard to resize them. It’s easy to change the font or size of multiple text nodes, but it’s hard to change the text itself.

![white board shows writing with black rectangles obscuring content](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC5UlEQVQokTXMWVNaBwBA4fteNGocMQYxSKnLBOMeNS7REapRRFFkExFMAA2SoMYgFsHLIlcEWRRj7dROnWl/5umETB++OW9HaGpsYF43RWjHzcn+Loc7bnY2THjWFtheN/DBasBu1DP5up8XrQoa6uuRyWqQ/SSj4Ukt8vonNNXX0lhXQ2OdDGF6QMPuhgHx0EfA40D3dpzRwV5W5maIBDyIBzsc+Jxsrhn49e0bhvu0dGnUqJQK2ltbUD+X09b8lOeNdTx7WotwsP6G5J6FzNfvQzv6mSkmx0ZwWVYoiGHuc0kKiQjJ8GeOPm7jda5jXZ5ncXYS3cQwE0Na+jpVaFqbUDU3IIRtE4gBC5GAi/cbZszLBlaNi3zYtJGJfuHuMknlQqScPqWUjpITj0mGPxH55GXf5+S9zcjC9AgDXSo6lXIEx2wfwU0jDtM7+rTdvFC2Vr162Y1lxUDIv82+31N1dvSZ0nmMGylGKf0bxdQJqeMg21YDUwNdvPq5BWFcq8axPMfyOx3tbUpqZLKqZ/ImXnZ1oO3q4Be1iu4ODUtzOsRwiGspzo0U59tlgqtEmMCWmdkRLYMdCgStWonFOI/fbcdhXsFkWPhhaZGZyXE07SpamuW0tSrQz0wSOwpSzsSoZEV+z6cppU4IutfRjWoZ6lQg9GpUbFmWyERDVKQE37Ln3F6eU5JSnH4J4XXacVnW8GxYOQj4uIgfU0xHq9PbrEheDLPnNqP/fzg/1kvIa6Wc/spjOcu/tyX+qZR4vClwn5cop+MUE6dcSwlyyShHQT8+lx3vphW/y8bulg23eYHZkR4GOpQI+64FziO73GQiPBQkHq8L/F3O81C45D6X4VZKUMmI3OXPycSPsa0aGX89yOhgP2ND/einxjDNTzM93EOvpg3h7OMapeQhd7kz/ixe8Nf1FQ+lHH9cXVCRkhSTMcqpOJVsimwiyp7XjX3ViM20VK3TbMRmnGNquIcejZL/AAlOwWS9TJrVAAAAAElFTkSuQmCC)![white board shows writing with black rectangles obscuring content](https://cdn.sanity.io/images/599r6htc/regionalized/d6936e8da35ed33e14a1099f4b2d97896580b438-2424x1330.png?w=2424&h=1330&q=75&fit=max&auto=format)

###### A look into Figma product thinking (Config Europe)

Multi-edit was always part of our overall plan, yet we had other work to prioritize. I even hinted at it during a talk in 2020!

So we stopped thinking of multi-edit as a mode and ended up asking ourselves fundamental questions like “How should selection work anyway?”

We were also delayed by the practicalities of software development. The truth is that no matter how good a feature idea may be, there are often other things that have to be done first.

So we sat and let that multi-edit idea stew…for a very long time.

### [The slumber and awakening](#the-slumber-and-awakening)

Sometimes, when you don’t work on a feature idea right away, it loses steam and fades away. Yet, the idea of multi-edit remained surprisingly popular at Figma.

I think it’s partly a matter of philosophy. At Figma, we believe it’s our job to help you make changes to designs quickly, and you have to be able to do that whether you have structured your designs ahead of time or not.

When you look at Figma, almost every feature that helps you structure your file has a free-spirited cousin feature for the times when you want to keep things loose. You can use styles and tokens to change your colors quickly, but if you want to leave things unstructured, you can use the [selection colors](https://help.figma.com/hc/en-us/articles/360042553434-View-and-adjust-colors-in-a-mixed-selection#:~:text=The%20Selection%20Colors%20feature%20allows,properties%20of%20any%20child%20objects.) feature to make mass edits. You can use auto layout to group things into stacks and move them quickly, but if you want to leave things unstructured, you can use the [smart selection](https://help.figma.com/hc/en-us/articles/360040450233-Arrange-layers-with-Smart-selection) feature to reorder things quickly. When it came to editing, you could use components to edit multiple copies of an object quickly, but if you wanted to leave things unstructured, we just didn’t have a great alternative!

What were you supposed to do? Copy and paste and click on things a hundred times? Components needed an unstructured spiritual cousin, which is why we needed something like multi-edit.

Tom Lowry, Director of Advocacy at Figma, was one of the big internal champions. Nikolas Klein, one of our designers, prototyped a version of multi-edit during one of our Maker Weeks, and I prototyped another version along with Software Engineers Naomi Jung and Joanna Chen. With each experiment, our understanding of what we needed to build and how it needed to integrate with the rest of Figma grew deeper.

## [Bringing multi-edit to life](#bringing-multi-edit-to-life)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAcCBQYI/8QAIxAAAQMEAgIDAQAAAAAAAAAAAQIDBAAFBhESIQcxEyJBYf/EABgBAAIDAAAAAAAAAAAAAAAAAAEDAAIE/8QAGREAAwADAAAAAAAAAAAAAAAAAAECAxIh/9oADAMBAAIRAxEAPwCwZ9dJdjxeTMtrQdl7CGwfQJOtmpxhF7yuLlUVi/7fizDx5BQISffVVzIhFcs0hqYttKVp+oWoDZ/K4DCQyu9fNLQGUMDSVODiOX4BupbrZDcUy4pso6m+6VmVg9ggj+UpxmPG3lPJLtNza5Ifmu/HHfKWkJUQlIHrqtFcswvlyitx5dwdU0jWgDr1SlEYnw7DFfJOTQrSmO3P5oQohJcHI6663SlKJQ//2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/eb89dc47dfb3f174d1fe3f766496259b171b48b3-1800x1800.jpg?w=1800&h=1800&q=75&fit=max&auto=format)

Nikolas K.

In 2023, it felt like the time was finally right to awaken multi-edit from its slumber and bring it into the limelight. I was thrilled. When we began imagining multi-edit, I was in my first year as a product designer at Figma. In the five years since, we had made a lot of key decisions regarding how multi-edit could work, functionally and philosophically. We had working documents and prototypes made with various collaborators. From my vantage point, we had tuned the design, like you would a guitar. So, building multi-edit felt like it would be a straightforward task. (Famous last words.)

### [Wait, we can change the selection mechanics?!](#wait-we-can-change-the-selection-mechanics)

The first challenge was solving for the core selection mechanics when editing multiple layers. Figma, like many other design tools, would draw one big aggregate bounding box around all selected items, allowing you to edit them as if they all belonged together in a group. This is great for operations within the same frame, but it really breaks down when interacting with objects across frames or variants, such as resizing a logo that is visible in all screens.

This was a wild moment for me; at that time, not even two years out of design school, I realized that working at Figma meant the ability to influence something as seemingly basic (although, personally, incredibly exciting) as “how Figma draws bounding boxes around its selections.”

In one solution, we proposed a “multi-bound mode,” a new option that would change how selection bounds are drawn. This would allow users to make relative edits like you’d expect. This didn’t feel right, though, and after a lot of back and forth, we realized we could do something much more fundamental: Instead of adding a new mode, we could change the existing behavior for every selection—rethinking how editing worked across Figma.

While agreeing on an approach felt like a breakthrough, we were still a long way off—perhaps even further, due to the breadth and complexity of our new scope—from shipping multi-edit. In the years that followed, we would discover all the interdependencies of this approach, and tune them one by one.

At first, we wanted to draw multiple selection bounds around every single object, even within the same frame. But we quickly realized that traditional selection mechanics have served designers well for decades. Finding the right balance between the familiar and the new, we opted for a middle ground: **showing multiple bounding boxes for each set of objects selected at different levels of the designs**.

### [Looking at all selections through a multi-edit lens](#looking-at-all-selections-through-a-multi-edit)

Now that we had multiple bounds, we needed to make sure that every potential action would work as expected within each hierarchy. We listed out every task where you might select in Figma—no small feat, given that many operations in Figma require _some_ form of object selection. For each instance, we adjusted how it behaved with multi-edit to align with workflows. Because multi-edit touched so many operations, stakes were high. Our engineering team, including Akshay Subramanian, Jung Woo Lee, and an intern at the time, Emily Louie, were amazing partners in allowing us to prototype and adjust behaviors quickly.

One of the more obviously broken behaviors was **aligning elements across frames**. When selecting elements across frames organized horizontally, aligning to the top or bottom vertically works. But, when aligning elements to the left or right horizontally, those elements move to the same position on the canvas, meaning they often get stacked or disappear from the intended frame entirely.

To fix this, we updated _align elements_ to be relative to each frame. Aligning elements now works by taking the smallest value in the direction you’re aligning to, and applying this value to all objects relatively within each frame.

We also made a special rule to align objects on the canvas with the closest object inside a frame, breaking our own rules of “aligning relatively for each hierarchy” to keep allowing existing workflows.

### [Selecting the right amount of matching objects](#selecting-the-right-amount-of-matching-objects)

With all of this done, multi-edit was already feeling like a major improvement. Editing objects across frames was much more intuitive. Next, we needed to make it as easy as possible for users to get into those states faster.

[![A screenshot of a tweet by Tom Law asking @rogie and @figmadesign for a Figma shortcut to select similar frames that are evidently recognized. Below the tweet are multiple similar interfaces.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsTAAALEwEAmpwYAAADwElEQVQ4jYWTy09jZRiHD9BSOL1KuZUU2tNyphfkJhrSmMGgS12MrmYGJ5ExcZASN+xY+BcoC1iMK6EEEiIwszZGxYAMM4zRpTcGSkt77qc9baEU+H7mnGFIiJpZPN/35l087yV5qZrqatHlcFSa3W447TZis1mJw+GA3eGA1WqFxVIHs7kWZrMZpguM2GRGdXU1oShKBxRFnVIUpVJul7Py7lvXz0ffv4E3Xx8gbV4fafb60NLOwO3pgN3dCtrVCNrpht3VgFcaGtBwgdPpJDabjdTX16OmpkYXn1JtLc24+8ENfD42Rt57+x20B8NoZsJoCUTQxETQ6AvB3cGisaMTHl8AfiYAhmEQCAQQDAaN2OPxGFKjUxtNk75QmAwNvIFI5zXSwQRJIBTFc7rQGXkVbLQb13QiUYQjEYTDYQOWZYnf7yetra2oq6t7MT5FzCYTsdRaYKWtxNvejmg0imi068rf1dVloItCoZDRncfjgdvtht1uh8lket7hxWNgsVjg8/nQ39+PgYHX0NfXZ9Db22ug5/Vfl/r9frS1tRnSpqYm0DSNqqqqq0KXy4Xh4WF8cu8e4hOfYWw8jvH4xCXx+AQ+HY/jo7sf4/bIHdy6/SFGRu7g5s1buD40ZHR7RahXnZqawrff/YD1n3ewvvUUW09+xfbOb9h6/As2t7bx0+YjfL/xGD9uPsHGox1sbj/F+sYWvvhyGj09PVeF+m5mZmawu5dERlKRlTXkimWUymfIF48hSAoOeQlpUYWQK0E7qqB0cg45X8Tq2gPEYrH/Fj7b3weniOBlGVqxhJPTMxwdlyHJCg4FASlRAKeoyJfKKFXOoGgvEe7u7SErCcgIAiQ1B610hHyhCF6UkOZ5HPA80oIEQdWglo4hKDmsrK79v/Cv3T2kOBkHWRmclIOkFiAqeWR5EakMj2RWQopXwMt5SLkiOFHBNyurl8LLewyFQkQX/v1sH2lexaGYh6IdQytVoGgl8KKMNCfigFPAyQWohbKxR73YyuoaicVi5F/C2dlZspdMglcVCGoOxaMyKmcER+UKZFUFJ4ngFBlKvqDnSOWcEH3PDx4+vBS+GJmwLIvp6Wn8/ucfOMimkUynwAkCcnkNippDJptF8jBlkM5kIEoy8loBgiiR5eVlDA4OGiOfUBR1rkv1Ix8dHSX3v7qP+cQ8vp6bQyKxgMWlJSwuLmI+kcDc/NwF81hYWCBLS0skkUhgcnLynGXZii7MUBRV1oW1tbXE6/WS7u7uy7N7CURHP0eGYSo0TYv/AKss7J9Pyu0TAAAAAElFTkSuQmCC)![A screenshot of a tweet by Tom Law asking @rogie and @figmadesign for a Figma shortcut to select similar frames that are evidently recognized. Below the tweet are multiple similar interfaces.](https://cdn.sanity.io/images/599r6htc/regionalized/4e3bb925778c14ebbbfe9afcd11da6d3a1272920-762x644.png?w=762&h=644&q=75&fit=max&auto=format)](https://x.com/foremost_tom/status/1423268952021643264?s=20)

Some of our users noticed this functionality, too—like [Tom](https://twitter.com/foremost_tom/status/1423268952021643264?s=21) and [Aravindh](https://twitter.com/aravindh_design/status/1601039384999927808?s=46&t=NaMRiP5zMJUQblN_5PVqmg)—and wondered why it didn’t extend elsewhere.

As we all know, designers often duplicate frames where the same layer is repeated across multiple copies. We took the matching rules from [smart animate](https://help.figma.com/hc/en-us/articles/360039818874-Smart-animate-layers-between-frames) and the selection behavior from [component properties](https://help.figma.com/hc/en-us/articles/5579474826519-Explore-component-properties) to let users “select all matching layers” (`⌘ Command + ⌥ Option + A`) everywhere else, too.

But we soon realized that selecting _all_ matches was too much. Our users often want to make changes to only some of the frames. So, we added an additional option: holding shift highlights any matching layers, and users can drag to only select other matching objects. This new behavior happens when you start your drag outside of a frame. If you start your drag inside of a frame, we preserve the previous behavior of adding to or removing any object from your selection.

### [Keeping a mode for variants](#keeping-a-mode-for-variants)

Finally, we circled back to the spark that ignited this journey years ago: variants. When managing variants, there’s often a need to edit all of them collectively. To streamline this process, we introduced a feature that keeps multi-edit on, allowing users to remain in this state while editing variants.

Even though our original breakthrough was to think of multi-edit as _not_ a mode, a mode proved to be a necessary feature for unlocking efficiency. Bulk actions like quickly selecting the next element, or creating a button label text layer _across all variants_ needed a dedicated space for where this could all happen.

### [Fine tunings](#fine-tunings)

Seeing all these decisions and micro-adjustments come together is incredibly satisfying. Being able to apply this level of detail and care is not only what brought me to Figma six years ago, but is what keeps me here today. Multi-edit gave us an opportunity to polish up some behaviors, as well as introduce a few small, but notable visual improvements. Here are a few of my favorites:

## [Knowing when it’s ready](#knowing-when-it-s-ready)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAQFBggH/8QAJBAAAQQCAQQCAwAAAAAAAAAAAQIDBAUAERIGByFRFUFhgZH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A9grb2RXUCzwbalOucG+R2B+co7zqm/opUWw+SZlQ1KAcjFIGx9kHInULkRp2NFn8hIXstNkkAj3mRvYrCrFhiSlMZrkgIccc0kHfnA6YhSEy4jMhHhLiAsfsYyvr7SubhMIRMYUlCAnYUNeBjA5kuLiXb9xEOzVhZDgaAA0An1rMX3aW41KdaDzpbQ4OIUonWMYEKg6ttq6uTGYfBbQTrmOR/uMYwP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/d6384f26f5bad7f6b142040dc1af51a067baf7a6-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Sho K.

Multi-edit is the feature which has had the longest gap between initial idea and launch. Over those years, we kept picking it up and putting it down, and we kept polishing and iterating on it. It feels like a rock that we have been tumbling in a rock tumbler until it is shiny and smooth.

One of the odd things about this process is that as we refined multi-edit, it almost started fading away. We’ve been living with multi-edit internally for months now, and we’ve kind of stopped noticing it—until we switch back to the production environment, and we realize how inefficient things were before!

There’s a part of me that wants to keep refining, because every day, we find new things that could be better when dealing with multiple objects. The change to how we align objects across frames is something we discovered and implemented just a few weeks ago. My guess is that we’re going to keep making these discoveries after we launch.

I also have a nagging fear about things we might have broken. We’ve changed _a lot_ of subtle behaviors, and there’s always the potential that we’ve made something worse for folks who depend on a certain way of working. We’ve done a ton of testing, of course, and we’ll respond quickly to any issues that arise, but it’s nerve-wracking to make deep changes, knowing that millions of people depend on Figma to do their daily work!

And yet, I’m also incredibly excited. Multi-edit is something we’ve been dreaming about for almost five years now, and it feels great to show you how it works. I hope these changes resonate with you, and as you encounter things that you think should work differently, please send us your feedback so we can make it even better.

[![ A black background with white text reads "Multi-edit overview" and "Select and edit multiple objects across frames and component sets at once." Underneath, a green "Start" button. T the right, a graphic depicts a cursor selecting one of several green outlined squares.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAABTklEQVQoka2S2U7DMBRE7cRpNmenTZWmKyFtCCHdItRK8AT//0mDfFEFqUDioQ+ja1v28Xh8GWMMNxajAef834c4Z2AXsV+AlmUhSRJSEASkMAxp/edmITj8cIB4ZCFITMjAgCMFdNEzwwjUti0OhwOapqFxXdeIoqgHlL6BsgmxPaWo90MsSh9p7hC0B4zjmEBd1xFU1aqq4Ps+RXGJI4gHeH65w/ljhu4tx2abYFZIctoDuq6LPM+xXC6xWq1IWZZBSgnTNGEYBkHVwc02wvF1jN05xeM+xmLtw7sGhrGLss5QbCZIx0OKQGXoOE4PqJ42Lz1Uuwj1Mca6DTF/8L4cfn8Qw3jq4vQ+wdNxBC+wIYQBIQQ0Tes92bJ1ymxWeORsWkia2+5VhuqG6b3EMLMhjL/bR9M4TFsngHKrqppr+tUvK7tqM9du2Ni30icTPvVxnHEyvQAAAABJRU5ErkJggg==)![ A black background with white text reads "Multi-edit overview" and "Select and edit multiple objects across frames and component sets at once." Underneath, a green "Start" button. T the right, a graphic depicts a cursor selecting one of several green outlined squares.](https://cdn.sanity.io/images/599r6htc/regionalized/ccfbfc04a6916b127f24eed3181e1be40bed50c8-2553x1431.png?w=2553&h=1431&q=75&fit=max&auto=format)](https://www.figma.com/community/file/1343991048099728924)

Ready to get started? Check out our [playground file](https://www.figma.com/community/file/1343991048099728924) to start exploring multi-edit.