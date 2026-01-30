---
title: "Making the move to UI3: A guide to Figma’s next chapter"
source: "https://www.figma.com/blog/making-the-move-to-ui3-a-guide-to-figmas-next-chapter/"
publishedDate: "2025-03-25"
category: "design"
feedName: "Figma Blog"
---

On April 30, we’ll be retiring our previous interface (UI2) as we move toward a more streamlined, powerful future for Figma. With Config right around the corner, we’re building exciting new features and experiences that will only be available in UI3, making this the perfect time to complete the transition.

We’ve been listening closely to your feedback on UI3, and we’re addressing several key improvements before the shift. These updates include replacing the “Reset others” icon to avoid redundancy, simplifying strings for boolean operations, deduping actions in the overflow menu, updating the mask icon for clarity, and reverting to a tidy up experience more similar to UI2. After the transition, we’ll be focusing on the Properties panel, building on the refinements we’re making now.

## [Embracing UI3](#embracing-ui3)

As someone who’s used Figma for years, I’ll admit—[when UI3 was announced](https://www.figma.com/blog/behind-our-redesign-ui3/)

, I was hesitant to make the switch. After all, change is hard, especially when you’ve got your workflows dialed in. But after spending time with the new interface, I realized that these changes weren’t just different—they were _better_.

I’m not alone in finding that UI3 quickly feels like home. As Product Designer Lilit Bala [notes on Twitter](https://x.com/lilitbala/status/1858289585144352957), “\[It\] honestly felt really natural to slide into. Got used to it within a couple hours.” For Digital Product Designer Joshua Guo, the change took “about one week,” he [shares](https://x.com/jshguo/status/1858193982703964329). “There was some muscle memory that took a while though. I pretty much love the UI3.”

Here are five improvements that changed how I work in Figma for the better, plus some additional refinements worth exploring. Whether you’re a power user or just getting started, these thoughtful updates do more than just move things around—they make Figma more intuitive and efficient.

### [Smart eyedropper selection](#smart-eyedropper-selection)

The eyedropper (I) works the same way it always has—we’ve just made it smarter about variables.

The redesigned eyedropper tool has quickly become one of my favorite features of UI3. It stays with you while inspecting the canvas, lets you tab between different color models (like Hex, HSB, RGB), and now detects styles and variables. Just select an element, grab the eyedropper (I), and hover over any instance of a color, style, or variable—Figma will automatically show the style or variable used instead of just the hex value.

#### [Why it works for me](#why-it-works-for-me)

This change keeps my focus on the canvas. Instead of navigating over to the design panel and searching for a variable, I can select a layer and use the eyedropper to inspect an existing instance and quickly apply it to my selection. As a bonus, if there’s not yet a variable for a color, I can use a shortcut (`shift`+`cmd`) to create and automatically apply a variable or style right from the canvas.

### [Logical layout controls](#logical-layout-controls)

The design panel has been reorganized to group controls more logically, reducing the need to jump between different sections. Set auto layout values like width and height right alongside resizing behavior, layout direction, alignment, and spacing. Everything for managing an auto layout frame lives together—as it should.

#### [Why it works for me](#why-it-works-for-me)

In UI2, I often found myself jumping between different panels to achieve what I wanted—resizing behavior here, auto layout spacing and padding there. Now it all flows naturally in one place. I also find it helpful to have all component details appear at the top of the design panel when selected, making it easier to manage variants and properties from one consistent place.

### [Minimize UI that works with you](#minimize-ui-that-works-with-you)

UI3’s [Minimize UI](https://help.figma.com/hc/en-us/articles/23954856027159-Navigating-UI3-Figma-s-new-UI#:~:text=If%20you%20need%20a%20bit,navigation%20panel%20and%20properties%20panel.) feature isn’t just about hiding panels—it’s about maintaining focus while keeping essential tools within reach. When I’m working on components or editing variants, I don’t usually need to see the layer hierarchy or list of pages. With Minimize UI, the toolbar stays handy, and the design panel appears only when needed, then disappears once I deselect.

#### [Why it works for me](#why-it-works-for-me)

This approach is especially valuable on small screens where every pixel counts. It lets me focus on my work while still having quick access to essential controls when I need them.

Power users, rejoice: Your muscle memory stays intact. The [new Actions menu](https://help.figma.com/hc/en-us/articles/23570416033943-Use-the-actions-menu-in-Figma-Design) is similar to quick actions in UI2 and launches with the same familiar shortcuts while providing a more organized home for everything from library assets to plugins, widgets, and [new AI features](https://www.figma.com/blog/introducing-figma-ai/)

.

#### [Why it works for me](#why-it-works-for-me)

Think of [Actions](https://help.figma.com/hc/en-us/articles/23570416033943) as keyboard shortcuts for, well, everything—even things that don’t have traditional shortcuts. Not sure if Figma can do something? Need to find a specific setting? Just open Actions and start typing rather than hunting through menus. Whether you want to perform boolean operations, set aspect ratio lock, or turn on property labels, it’s all a few keystrokes away. It’s like having a universal remote for Figma that responds to plain language. I can work at the speed of thought, discover features I didn’t know existed, and rarely need to reach for my mouse.

### [AI features that enhance your workflow](#ai-features-that-enhance-your-workflow)

[Figma’s AI features](https://help.figma.com/hc/en-us/articles/23870272542231-Use-AI-tools-in-Figma-Design) in UI3 help streamline your process, from [generating placeholder content](https://help.figma.com/hc/en-us/articles/24004542669463-Make-an-image-with-AI) to rewriting text and automating tedious tasks like layer naming. These tools have been designed to enhance your workflow without disrupting your creative process, helping you work faster and focus on the design decisions that matter most.

Pro tip: You can search using not just images, but also rough sketches drawn with the pencil tool.

[![An abstract, hand-drawn illustration features a rectangular grid background with a central organic shape resembling a double-lobed form. Inside this shape, there is a patchwork of green, yellow, and red squares, some of which have black speckled centers. The shape is outlined with a thick black border and surrounded by a white irregular contour. The background grid is visible outside the central shape, reinforcing a structured contrast to the organic, free-flowing forms inside.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAADSUlEQVQokQXBy1MadxwA8P17OlVEkZcZBQNGiAQUwsIubgAXWIQAwvLYZdnVhfDwgSExqZP0Ea23njrjtoeaaad/QMFOLrm1l05sx2VyyLYXft9+PtjJxaBJdbZ/WakT79w8cR2X6d/bJ/z14al8ne3kR746NXJyoZGjho88XGSYbGWHzRfyUBg0hpHd5HCVJ35z8KFRqJn89eB19xTrfNV5tSIQf1rL6/95BfxTVN7Q+H5Y6xxSWoYLaN5qULsnkNoaT2hkwa/Fc+savRvXAntRzc0GNE8V/7RQ2fjXzuF/1QfCJSa/bp256sTfvkYEmB4JTMsOrGyBQd0MjawVgmUfxJoJ4IQYSLQLEoQZHGkbLGZsENlagko5CGExAk4u9LHSr11h7S/bbyiO+pDc8UNRWp3I7Xn0nJ1C5/RnaJ/WoXDZhmLVB+hJ4h46II0olZhFdwsm5GRMiKYMqJFfnmQbfgg1IirX53/Cjs4Ozwpi8qaQXAWJNUxOj2bgBa+HPjMDLzkdcD0D+DkrxOJG6KVmoCnrgd43gp1bAHPOAt6yBcVFN6Rb9Fh6Kl5hzy6Oz6oHxZt0zQ9lwTR52deB3DNAas8MraM5kI5mwdEwgym3ADRrhGrXAMmuEVysBfRZK0yxS+j+7kN4fFgYy893r7Djb/vn2YPMTbS5DlnJOjkRptGgokPp4jxiinMok5tFzp1FNF28ixy5BURUjOhRdR4l4nq0QRmQ7rENWTg/RFrMWHomvsV6b3rnuEx9iMnrUH3imohFE2qTU6ge+Bxt4zMoH72DUjUcESKJtpN2JCamEcdOoySjR8EtC1ph1yZL3ENw18lx7Zh/i7W/7lw4+dA/Lt4PiTYBwZobNlN2yMftENuywWZ2DeJSDGgpDizjhnbSCqJgA4q1Q5hxAFELg50LwmIl8LHcr/2M7X/TO3XWQu/ncvfHy6z/1lny3xJ16rYgp1WiSqrLOZ96Z8enLua9qifjUVMsrnJdRs0IlBphHqhruY3b+YJnbCsH/qg/Fb7HvjgflGJ76QtXEf/BtYNfBkubl3kprzS6nMKIGcXHkoqrFFJcJVzxsqSSaKQVsccrNbmoPCpHFR9LKJ4K+WNsL/1d/1Wv8z+9hM3mZmcEawAAAABJRU5ErkJggg==)![An abstract, hand-drawn illustration features a rectangular grid background with a central organic shape resembling a double-lobed form. Inside this shape, there is a patchwork of green, yellow, and red squares, some of which have black speckled centers. The shape is outlined with a thick black border and surrounded by a white irregular contour. The background grid is visible outside the central shape, reinforcing a structured contrast to the organic, free-flowing forms inside.](https://cdn.sanity.io/images/599r6htc/regionalized/30e954df3f78b1e2c12cdf0cd38201ed848769cd-3262x1836.png?w=3262&h=1836&q=75&fit=max&auto=format)](https://www.figma.com/blog/how-we-built-ai-search-in-figma/)

#### [Why it works for me](#why-it-works-for-me)

-   [Visual search](https://help.figma.com/hc/en-us/articles/24037716110615-Find-assets-and-designs-using-AI) helps me quickly find existing designs and components across files by simply uploading a screenshot or selecting an area on canvas. No more hunting through endless files trying to remember where I saw that one component.
-   [Make image](https://help.figma.com/hc/en-us/articles/24004542669463-Make-an-image-with-AI) allows me to generate placeholder images that feel realistic and contextual to my designs, saving me time searching for stock photos or creating illustrations from scratch.
-   [Rename layers](https://help.figma.com/hc/en-us/articles/24004711129879-Rename-layers-with-AI) has been a huge timesaver for my workflow. What used to be a tedious cleanup task now takes seconds—just select your layers and let AI suggest contextual names instead of being stuck with “Frame 14353411.”

## [More UI3 improvements worth exploring](#more-ui3-improvements-worth-exploring)

While I’m still discovering everything UI3 has to offer, here are some additional improvements that are already showing promise:

Designer Advocate Miggi Cardona walks us through new frame improvements in UI3.

-   **Smarter frame handling:** Frames now auto-position at (0,0), remember your last size, and make duplicating or adding frames effortless. As a fan of starting my designs at 0,0, it saves me time when I’m iterating quickly.
-   **Better branch reviews:** UI3 [clearly shows changes](https://x.com/figma/status/1852486973585551753?lang=en) to variable fields in branch reviews and flags potential conflicts before they become problems.

-   **Flexible panels and modals:** Resizable panels and [horizontal scrolling](https://x.com/figma/status/1863993927285764268) make it easier to navigate complex files, and the refreshed libraries modal allows you to browse and add libraries faster.

[![A screenshot of the 'Auto layout' settings panel in Figma. It displays controls for resizing, direction, alignment, gap, padding, and overflow. The width is set to 240 pixels with 'Hug' selected, while the height is 32 pixels with 'Fill' selected. The direction is set to horizontal (→) with a gap of 16 pixels. Alignment is set to align items to the left. Padding values are both set to 0. The 'Clip content' option is enabled, and there is an icon for distributing spacing evenly.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAABiUlEQVR4nI1Vi46EIAzc///Ty3q+oCAC9jJgN10O3TWZVAtMp6Xgg4hYwzlXoN9blLmw7n0t8OgRWWsL8B1C4H3fX8A3/IYczxTYuK2St4Te+zJxnmd+Pp88DAMbYzilxMdxvIBvzJ2M4x8TeaTI5HyfEFjXladpKnbbNs45szxCGmNkHyKbkJlCYtcjhDoQIFWQwSIAfCDQacO375FTPjieirsKUR8QLctSUh/Hsdi2thiHL+X8mVAvRg1lrGRBVNRVhftbTekqZViQ6UAo+mKgjgoRSAAphb9TCKsJiRwv1vHvYnk1qGsNLMH92R1dQokmPVjh2RaFxKYEqsFkw8Ip4pIQ79gIvctVTVUiqkAkafs7QlEIi8m6Xhroz682xZ59KP2HhVgkPShB4AfinUKQoFWQMnzSHhiDX5TL+YYNdzXEoPSgXgjo2onSr9rGnX0oN02bor4obmvolUIcLUDOtJyK3pM+EeqNEUL4e+peN8/dLgupXGdtLVvIiflH2N7c7a+gnXeFPyKTFJa21aA0AAAAAElFTkSuQmCC)![A screenshot of the 'Auto layout' settings panel in Figma. It displays controls for resizing, direction, alignment, gap, padding, and overflow. The width is set to 240 pixels with 'Hug' selected, while the height is 32 pixels with 'Fill' selected. The direction is set to horizontal (→) with a gap of 16 pixels. Alignment is set to align items to the left. Padding values are both set to 0. The 'Clip content' option is enabled, and there is an icon for distributing spacing evenly.](https://cdn.sanity.io/images/599r6htc/regionalized/d4fd47a21ee75399e57d7f56aa439b3b49c0cb30-700x700.png?w=700&h=700&q=75&fit=max&auto=format)](https://help.figma.com/hc/en-us/articles/23954856027159-Navigating-UI3-Figma-s-new-UI)

To [turn on property labels](https://help.figma.com/hc/en-us/articles/23954856027159-Navigating-UI3-Figma-s-new-UI), click the dropdown menu next to the 100% zoom percentage in the properties panel and select Property labels.

-   **Optional property labels:** Turn them on for additional clarity when you’re learning the new UI, then toggle them off when you’re ready.
-   **Bottom toolbar:** Moving the toolbar to the bottom of the screen frees up more canvas space and standardizes that muscle memory across all Figma products. And sure, it puts tools closer to where your hands naturally rest—but if you’re a power user, you probably haven’t clicked the toolbar in years. That’s what keyboard shortcuts are for (and yes, all your favorites still work in UI3).

## [Making the move](#making-the-move)

Change can be hard—but it can also be exciting. Many of these changes are small adjustments that add up to a more thoughtful, efficient interface. To help you prepare for the transition, here are some tips to make the switch smoother:

1.  **Start with property labels on.** Open the Actions menu and search for “[Property labels](https://help.figma.com/hc/en-us/articles/23954856027159-Navigating-UI3-Figma-s-new-UI#h_01J0VQQE1QWDA65PXZNSJQ75WM).” They helped me locate familiar controls while getting oriented.
2.  **Give yourself time to adjust.** Focus on your most common tasks first before exploring new features.
3.  **Try working without shortcuts initially.** Spend a day or two using the UI to understand where everything lives before relying on keyboard shortcuts.
4.  **Keep the help docs handy.** Reference our [Figma Learn article on Navigating UI3](https://help.figma.com/hc/en-us/articles/23954856027159-Navigating-UI3-Figma-s-new-UI) to see where controls have moved.
5.  **Be patient with yourself.** Breaking old habits takes time, but the new workflows quickly become second nature.

The best advice I can give? Start making the switch now and give everything that UI3 offers a proper try! The more you dive in, the more you’ll discover how these changes improve your workflows.

Learn more about the design language of UI3 with [this Figma Community file](https://www.figma.com/community/file/1486123838948777078), which features the styles, components, and variables our team uses to build products. We hope it helps you explore ideas, develop plugins or widgets, or even create your own UI kits in Figma.

_Want to learn more about the thinking behind UI3? [Check out our deep dive into the redesign process](https://www.figma.com/blog/our-approach-to-designing-ui3/)_

_._