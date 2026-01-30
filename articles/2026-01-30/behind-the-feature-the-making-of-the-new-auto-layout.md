---
title: "Behind the feature: the making of the new Auto Layout"
source: "https://www.figma.com/blog/behind-the-feature-the-making-of-the-new-auto-layout/"
publishedDate: "2020-11-19"
category: "design"
feedName: "Figma Blog"
---

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACGElEQVQokYWS228SQRjF+1fWoqbKHSw2NmK9QkGIkctChS2wCwsIKRerifHBB/8BXyplqfHWWI2XFGF3Wbu70Bf3mJ2thZhUH06+SWbmd87M98152DH+J2/xuDIKbrMCuPoQT9oiHjUFZKoDfYWR4GFU3Vuc/JrzFif4o9OBxp4GR3YAZ/wd/PEdhKkOgskOlmO8bk/uw5mTTeBpgFmTEyA9hC2+hyvxHu6meQRSPLyx17qV+gxXfgboLhzCnvkB24OD49o319kBXDmZwMxzCvyMhI2aiK22hEZTRKws6JcLI7gZbQp00ALO3XuDM+EOLJEeqfOhbViiu7CmvxEQScyOEayoaD0e48WzIzx/OgHb1HQ/RwynQOeGhPOxD1iI8ASyEOma8OguLiQ/wZkbnSS8yoigHwrYapkJ75cF3Teb0HA2nmmJdIkWEx8JZDGxT3Qx9ZUYehgVzuwAjvh7rMR5hFNdBKgulmI90hRXbjQF2ta/Yz74EmejPBzZofHBJJXLUF6Gm1HhZVQs033cSr9FkNrBncQ2AolXCFC8vrq+B19e0j3s2AQaF62pL7Bn+iTJbJdJh4sTXGI1rHEyag0J9U0BFHcAutJHsynqhbqEa6XDKfCfQ02qCYxUFdTaKuhNFTc5BaGKAq6l6mxDwQ1ONYF/z93s7JkygUtFDWtlGcmqhOuln2SUfKyGECfriYqI1ZJCgL8BXMSH5gYkfTIAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/b7c50b2be4531e99a267d386ab3c3d40be521eb5-800x450.png?w=800&h=450&q=75&fit=max&auto=format)

When we first launched Auto Layout, we really focused on making it approachable and usable. Over time, we worked hard to incorporate user feedback, bringing more power and flexibility while keeping an intuitive editor experience. Ultimately, this led to where we are today—a refreshed and revamped Auto Layout that goes beyond just a new coat of paint.

## [Resizable dreams](#resizable-dreams)

Before we [launched Auto Layout in 2019](https://www.figma.com/blog/announcing-auto-layout/)

, resizing designs in Figma was a manual task. For example, if you were designing a dialog box with several buttons and needed to make the text in one of the buttons longer, you had to manually resize that button to accommodate the extra characters, scooch the other buttons over to make room, and then resize the dialog container to fit everything—all while keeping padding and spacing consistent.

We’ve all been there, and it’s frustrating. Beyond feeling tedious, this type of manual work can become a roadblock to building responsive design systems. It’s why bringing the power of automatic layout to designers has always been in our plans.

In fact, early designs of Figma incorporated ideas of automatic layout in the sidebar. While it was an unlabeled dropdown under the “Layout” section of the properties panel, the idea was the same. Instead of manually laying out objects within a frame, users could rely on Figma to do the work automatically, with options for vertical or horizontal layout. Unfortunately, this wasn’t implemented when Figma launched, and traces of the fabled Auto Layout laid dormant in Figma’s source code until [Maker Week](https://www.figma.com/blog/the-making-of-maker-week/)

2018.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsSAAALEgHS3X78AAABqElEQVQoz2WS3W7iQAyF86Lc8B5VpX0MSFKBVtqq1wtICX2HrbSEUNKNEn5uSoEEQoBqfGpPNNmgXlhz4ePPx/ZYL39eVBzH6mPzobJ9pvIs16/E8XBUb9Gbch1XdTodNQ2mKsuyOi9xyA8q/her0XCkw5r8ndBysSQGUXEsqCgKKk+ljsv5QkmSUK/XI8dxaD6f67zomhqp9zyPfN8ni7tivVqDO4HFYBHO5VnH5/UTaZqi3+vDdV1EUYRTcdIhedFeL1esliuM/TGex8+wgkmgO+x3e+IRicVUliVxATGQ0iQlBpJjO/Q6e9XutOZUaRhIDCTf84mhlcNFugDvEAwFjw4uAo9SOUwqh3bXRhAE4L3VGnFpHDJQu7REZIAiZpd6lG9A20YYhno1ej3H4mZk3iEG3ugWKJ0NzHQ3QL40onmk8809i2bNwN/DAR6eft4CpbMRGvCNw2lYj9psKg5/PT7i7sc99A75KNhtd3rcprgJ7Ha64C+GPM9rh+baUs/fCu12+z9w877BdrutoeJECvgfot+vHM7CWQ2RZmYKqZejtVotfAEBQ9H5apEUgAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/524014e789823976a0355f537ab5ff9b68203485-1600x810.png?w=804&h=407&q=75&fit=max&auto=format)

Early designs of Figma included the idea for automatic layout

During this week when all Figmates can do and build anything they want, our product director [Sho](https://twitter.com/skuwamoto) breathed new life to our Auto Layout dreams by reimagining the feature in prototypes. The following year, I joined Figma and landed on a newly formed team whose goal was to make Auto Layout a reality.

## [Team alignment](#team-alignment)

When we started building Auto Layout, we were inspired by the power and versatility of flexbox. (Figma’s [built on the web](https://www.figma.com/blog/building-a-professional-design-tool-on-the-web/)

, so how could we not be?) We knew that mirroring this concept would help drive alignment between code and design. But at the same time, we still needed to make Figma’s layout system easy to understand and accessible to use—without requiring a deep knowledge of browsers and CSS. Thus, our guiding principle was born: “Auto Layout should be a thoughtful subset of flexbox.”

This sort of mission statement for the team guided the design decisions we made, unlocking functionality while reducing the number of moving parts for ease of use. Ultimately, this boiled down to a few core concepts:

-   Auto Layout can be enabled on a frame, allowing components to be laid out vertically or horizontally
-   Vertical and horizontal spacing between items can be set
-   An Auto Layout frame will hug its components in the main axis while the other “counter” axis can also be set to a fixed width to hug the components
-   Components in Auto Layout frames can each have their own alignment to the container, either being aligned left, center, or right—or top, center, or bottom in horizontal Auto Layout frames

It was really helpful when [Marcin](https://twitter.com/mwichary), the designer of Auto Layout, started by making a prototype completely in HTML. It gave us a feel for the feature early on and helped us iron out [many details in our first version](https://twitter.com/figma/status/1202618685795553280?lang=en), like frame handle decoration, drag behavior, and outlines.

## [Stretch goals](#stretch-goals)

The first version of Auto Layout quickly proved to be useful. I also noticed that Figmates were using the feature internally to organize everything from artboards to presentation slides and create reusable components like sticky notes and name tags. But we knew we had more work to do.

Auto Layout allowed for automatic alignment to the left, right, or center of a frame. However, as the frame grew, the components would stay the same size. What designers needed was “stretch”—an alignment option that would allow components in an Auto Layout frame to expand, filling the entire width or height of the container, no matter how it was resized.

It sounds pretty straightforward on paper, but actually getting this to work in the layout engine was tricky. In the first version of Auto Layout, containers only relied on the size of their components, so it was guaranteed that by laying out the components first, and containers last, you would end up with a valid layout. However, stretch meant that the components could also depend on the size of their containers, so our layout assumptions no longer held up. We had to develop a new engine that could handle these new relationships, with the ability to go back and forth between container and component to make sure all layout demands were met.

On the design side, we played around with some pretty bold ideas. Looking at help center articles and feature requests, we found a lot of designers referring to Auto Layout alignment options as “constraints,” which is another feature in Figma. Conceptually, there were many similarities, as they both included options for left, center, right, and now stretch. We toyed around with the idea of Auto Layout being integrated into the constraints panel, making Auto Layout feel more integrated with the rest of Figma’s layout tools.

However, we ended up shipping stretch without these UI changes because we already had additional features in mind for the next iteration of Auto Layout. It was important to give ourselves the necessary time and space to thoughtfully change the UI in a way that would comfortably include all of them.

## [Staying flexible](#staying-flexible)

As we began to design more flexibility into the next version of Auto Layout, we got a much needed team boost. [Emily](https://twitter.com/eymlin?lang=en), our new product manager, learned flexbox to put together an amazing spec that included everything from flexbox terminology to relevant support tickets to user requested features. [Sawyer](https://twitter.com/sawyerhood?lang=en), an engineer on an adjacent team, whipped up a quick prototype on a Friday night, incorporating many of the advanced layout features on our wishlist. And [Rasmus](https://twitter.com/rsms), our designer, got to work exploring countless ideas and mockups, eventually arriving on our final designs.

When we sat down to scope and flesh out these features, we realized one of the new features—stretch in the primary axis—would introduce complexity. To date, stretch was tied to alignment and only able to be set in the counter axis. But as designers became more familiar with Auto Layout, it was pretty common to see Auto Layout frames nested within other Auto Layout frames. This revealed use cases where it would be helpful for items to stretch in the main axis as well.

Unfortunately, bringing stretch to both axes wasn’t as simple as adding another alignment button for stretch in the primary axis. Making the primary axis fixed would allow us to stretch items. However, adding the option for fixed size in the primary axis would also mean adding an option to align items in the primary axis when there’s free space. With container and component frames, these additions would result in two different alignment and resizing options and create a cluttered and confusing sidebar.

To simplify alignment, we made a conceptual leap to move all alignment to the container. Instead of setting alignment at the component level, alignment is set at the container level. Components can still be individually aligned by wrapping them in an additional Auto Layout frame. A point-and-click UI to set alignment (with a built-in preview), which we tucked away in a popover menu, allowed us to keep the main properties panel footprint minimal and approachable.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsSAAALEgHS3X78AAACJUlEQVQoz52Ty04iURCGeSYRRAkQWIAkREKAkEhkrQt2JD6AXJORFzCEBRvCNWiAhI2XN5CFl4wwbEB0hMbu6ebSNv/0KZ1McCazmE4q56S7zldV/f9HYzAYsL29Da/XC5/PtxI7Ozswm81YX18Hy3PY7XC73X+Ey+WCxWKhPI3T6UQ8Hke1WsXZ2RlqtRpOT09pf3JyglAohI2NDTqUTCZRLBZRLpdpLZWKqFQqyGazODg4oKIav99PkNGYw/hVxPPoFTzPQxJFXF9fIxKJYHNzE8FgEK1WCxw3wctEwPBlAm7yClHN63a7SKVSMBqN0AQCATSbTQg/JHwXZDxxU8xnc2Cp4O7uDoeHhwTc29vD1dUVpNkCQ0FBb7QAP5XBnsfHRxwfH/8GNhoNFSiCFxeY8JIKnEF5k3Fze7sCvLy4gDid4YmX8e1ZxJifQlEU9Pt9fPkMlCSJPsqLBd5kmfa3n4GXl5jP51jICgRppnY7x3K5xGAwWO2wXq9DEAQV8kYgNYtGub+//ytQTSDQ8iNvOBwinU6/Az0eD6nUbrfx9eGBfnCv16M4Pz9HOBwm9XZ3d2kSdnjMcSQca4KJ0ul0yAEEtNlsJPnR0RESiQRFLBZDNBolhZkXdTod2Ya9y+VyyOfzKBQKH9YpIZPJYH9//902zGMMyszNPOlwOGC1WmEymaiiXq+HVqulse2qsVmBfxr71y3Y2toiAFsZZG1t7b/iJwNnUHHiqnMZAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/a4e42cce1d61e806c9a7a77d5f9e0fcfe0e9182c-1640x916.png?w=804&h=449&q=75&fit=max&auto=format)

A new alignment panel allows setting alignment in two dimensions, with a preview

With alignment taken care of, we wanted to make resizing more intuitive as well. Since a frame can’t stretch and hug at the same time, we thought about consolidating these controls into a single three-way dropdown, with “Fill Container,” “Hug Contents,” and “Fixed.” Knowing that these controls are possible in both axes, we realized that two dropdowns were necessary: one for width and the other for height. The end result was a constraints-like UI that would appear when selecting an Auto Layout frame.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAAsSAAALEgHS3X78AAABhklEQVQoz2WRTYtBcRTG72fynoQFNvK68wlkYxZkJxtJsR1bUQrFlaztZ1ZiRRQ1d7K8iOjSM57TqDvNrad77jm/59zz/x/F6XQiGAwiFoshkUj8USQSgc/ng81mA7lQKIR4PP6PY441MgqbFYtFdDodDAYDDIdDqKqK0WiEZrOJdDoNl8slhlKpJNyLeanb7UqNjMLuTHxp39APBxyPR5xOJ1wuF6zXa5TLZXg8Hpmi1+tB0zQcfjld1yXe7/fo9/vCKMlkEupzGv1whHG/wzAMER+aq9WqNCQ3Ho+l0ePxwP3JXq9X3G43nM9nTCYTYZRwOIz3RgMfn5+Yz+eYzWaixWKB6XSKQqEAt9uNaDSKVquF5XKJ3W6H7XYrJ9hsNlitVmi328Io/HsqlUI2+4ZcLod8Pi9inMlkZDF2ux1+v1++K5UK6vW6qFariZhjjYxitVrFwItnc27V6/XKVNwaN0yGb+ZoCgQCsgCKMT2skVEsFguol8nhcIgYm2vmmAOYOXP9B4iHht5ougS1AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/759fecb515a6543a28a4fe172552e9bb4b954b42-1600x630.png?rect=1,0,1598,630&w=804&h=317&q=75&fit=max&auto=format)

The existing constraints panel next to a work-in-progress resizing panel

Testing the new UI revealed cases where both the constraints and resizing panels would show up. While this was expected, users found it confusing to have two similar (but distinct) panels. The hidden interrelationships between constraints and resizing created an invisible dependency that didn’t sit right with us. While jamming on this, the team came up with a hybrid panel that would surface the right options no matter what was selected.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAABoElEQVQoz52SvW+BURTG33/JNwMDIuKbRCSYyuYfMCAmFWWU1OizamkNEoldjAa6GIqmvlIvEpKyPH3vSb3RRpcOT05y85xzf/c5l5NKpbgmmUwm6i/PNXEajQZmsxkulwsejwdOpxN6vR4KhUIcKJfLodPpYLFY4HA4foj57XY7jEYjVCoVOHZwm06jVquh0WigVCohHo+TSalUQiKRgF0aCoWQz+dRLpfJw+q5p1KpIBaL0VAuGAzi6ekZk8kEi8US07cput0ucrkcvF4vDWN0yWQS/X4fs/kc77MZ5kJdrVbYbrdYLpeo1+tEyzGSTOYOvV5PMC3IwPM8BsMBkYTDYZhMJqRSKbyOx/g8nnA8CToecTgcqO73ezSbTbjdbnBqtZqySCQSaLVaGAtNu92ONBqNkM1mYbPZiHAwfMHHegN+s8F6zYuUM4FYJGSbYQswGAyIRCIoFotot9vodDp0azQapWxuhAzvCwWh8fFbdVSrVSHHB8pTzPDye2i1WsL2+/0IBALw+Xz0XLY9lqPVaiWKs65u+XLgf/7db30Br92maNLtcggAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/49559c6c6f484230912a4160ee86be15133a6e81-1600x736.png?rect=1,0,1599,736&w=804&h=370&q=75&fit=max&auto=format)

The final design that unifies constraints and resizing into one panel

Together, the new alignment panel and the new resizing/constraints hybrid panel make up the biggest changes we’re bringing to Auto Layout today. For the past few months, the Auto Layout team has been hard at work bringing this to life. In addition to building the new panel, there’s plenty of under-the-hood work the team has tackled: tweaking the Auto Layout engine itself, writing migration that allows us to introduce these new features, and preserving the layout behavior of existing Auto Layout documents. This has been a huge team effort with the amazing engineers that I get to work with every day, as well as teams across the company, from infrastructure to product education.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsSAAALEgHS3X78AAACEElEQVQoz42TSYtaQRSF+y85IyqCguNC3TrjIgm4dCEIDj8gCIHsVBAFtRV3BoTgbJr0QohJIJC0cSFtiGI7gPNw4q3E7pj0ogvqvVfv3Prq3LpVF1wuFzweD0KhEHK5HBqNBnq9Hmq1mo3pP+kCgQAymQwqlYrpWq0WCoUCYrGY6SfOxelDp9MhEAggGo0iHo8jFovB7/eziaQrlUp4PB5EIhEkk0kkEgmEw2FYLBaIRKIHID2oW61WFItFDAYDjMdj9i4UCmwCn8+HwWBgoH6/j+l0islkgna7DZ/PB4lEAg6Hcw50Op1oNpvYbregttlsUK1WYbfbGdBkMiGfz2M+n+PUvne7CIVCkEql/zt0OByo1+tYr9cseLVaoVwunwFzuRxmsxkOhwP2+z06nRsEg8HHHRKwVqsxEDUC/wvMZrMsXQY89m83HQSCvx0Sg+Lui0ITCUAp0erL5ZKNbTYbCzQajUin0xiNRkxfb/f49LWLl69e49nzF3C5XDCbzQ9AclipVBhwt9thsVigVCqdAVOpFIbD4XF/15ivNvjSvcWbt1WUKnXU6g1kMpnHU6aU7h3+SZkBjw4HgyHT5scFe7d9fPj4GT9+DnE3nqLVap0DG40Gq+5pD8nx3w4zl5cY3Y2xPsZQBr1ejxXy3dUV3l9fs1PwJCDpBDxVmQpCcd3jsaELQGfR6/XC7XbjFxH+UJONvw1aAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/edf8ed0408a9b85fd6ecc2da1118885819d7a083-1600x856.png?w=804&h=430&q=75&fit=max&auto=format)

Auto Layout, then and now

Taking Auto Layout from the forgotten traces in our code base to what it is today has been [quite the journey](https://www.youtube.com/watch?v=8Q5uBR52G2Q&feature=youtu.be&list=PLXDU_eVOJTx7kSHHiltBqo3FK__aB5HZi). Auto Layout has grown to fill some pretty big dreams and aspirations, and I’m so proud of how our team stretched what was possible while keeping the feature intuitive to use. We’re really excited about putting this new functionality into your hands, and can’t wait to see what you’ll make with it!

If you’re interested in learning more, get started with the [playground file](https://www.figma.com/community/file/784448220678228461), check out our [Help Center](https://help.figma.com/hc/en-us/articles/360040451373-Create-dynamic-designs-with-Auto-Layout), or check out our recorded [office hours](https://www.youtube.com/watch?v=u4K2m-3MmQQ).