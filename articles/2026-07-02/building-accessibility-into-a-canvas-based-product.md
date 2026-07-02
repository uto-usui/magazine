---
title: "Building accessibility into a canvas-based product"
source: "https://www.figma.com/blog/building-accessibility-into-a-canvas-based-product/"
publishedDate: "2026-07-01"
category: "design"
feedName: "Figma Blog"
---

Similar to a video game, Figma’s canvas takes over rendering from the browser to maximize performance. This lets us deliver powerful features like infinite zoom and real-time multiplayer. But because we don’t use traditional HTML and DOM to render Figma’s canvas, we don’t get any of the accessibility features that are built into the browser by default.

To make Figma accessible to more people, we created a Mirror DOM structure that could stay in sync with any Figma design. Here, we’ll go behind the scenes of how we made it possible for anyone to navigate a Figma file with a screen reader, hear changes as they’re announced, and operate the editor with a keyboard.

[![Illustration of four hands with black-painted nails typing across three colorful keyboards against a purple background, surrounded by festive sparkles and confetti-like flourishes that suggest lively collaboration.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACpElEQVR4nC3C608SAQAA8PtbmivnTGc5FdHwiYbcw0PMB3roGTJAhAPujvNeCKIQCvMxNdPKXBbO1pY5Xa9pzW+tL32wbCst10Mkjw5sfWpt/fYDWCjFwSf/Q0lG85nVfGThIwaROFQK6E9EXZJBE3Tjvx7wyNOQoLQnNPiL0soAC8osJHHIMY9+47SvvcppqjBAly2wmoch4/oc/XSeezJmeyTqV2n1iqt8yV0WJ2vekNqkB8wAPkQebvkx1vM+5tiJmacDFSiZVUhmq8RKZMLavTrHbCyzSyM9IT1CX1C7siuZi7pBcJZr3iORFBDBvi74Xq3M3ovfnVqcJENXap05WfZzZzxluSxWHgq1Tc/gUa9agPM9imyq+Gy0TXH/mmtu8DHffghMWPZu37ozvx6IPWCGY72e1lq8OM9YXtQLVuBNKgzTmLtRu6GKMKsIey2JV4+PIWsvbPGbi0PGT0Ck80skfN95newO4pYubV9VEV5dimGoicR6TEiHVoWVFfc3lvhiEH2jzcobnVN9QytidGjT15wA/OhPwb5tCvMGrsWiURL5OdYaZYe11TBh6xo1dWL1ppLzTEVuhK3xzXTYYv2doyQujNNdbzlYBgRYFvEPVHTJNtHv0F1yZ2c5FKUms7VnMoRPBowOg72ukMrL4qsKOGcLNeN2TjGEM87oD0U4DbDQqdCeEAa3qLDfjdS5cxQepYnuWhpwbVO2TaIjSl++ShVAVEGTt5Pgo0JoNDJi2fHrJD90CvBQhm9KCeZdzrZM1QseRYRSP2PQfVaXYJHvDPiOqX/JVK2x1Rti61aQ2BglnocN+8HGdAD6DfhBWYDTrE5i9QeMdterOfCCkhfMMGCaATMDYGZAK7MNEg9KIpwK6I6DTUk/LPuhUz/05y+axkGISQpOowAAAABJRU5ErkJggg==)![Illustration of four hands with black-painted nails typing across three colorful keyboards against a purple background, surrounded by festive sparkles and confetti-like flourishes that suggest lively collaboration.](https://cdn.sanity.io/images/599r6htc/regionalized/e00e5dfca7cdfeed93634087d4a7d594dcc74b53-1632x918.png?w=1632&h=918&q=75&fit=max&auto=format)](https://www.figma.com/blog/introducing-keyboard-accessibility-features/)

[Learn more](https://www.figma.com/blog/introducing-keyboard-accessibility-features/) about Figma’s keyboard and screen reader accessibility improvements.

## [Synthesizing the DOM](#synthesizing-the-dom)

Browser engines have a concept called the accessibility tree: a data structure distilled from the document containing the non-visual information needed for assistive technologies to work. When a screen reader user executes the “go to next form field” command, the accessibility tree tells the screen reader where to go. The browser builds this tree from DOM, semantic HTML, ARIA attributes, and some additional computed state.

In a typical web app, every component has its own DOM element like `<button>`, `<p>`, or `<img>`. But because Figma doesn’t use HTML for rendering, the canvas has only one `<input>` element that holds focus no matter how many layers are in the design. This meant that the browser’s accessibility tree was virtually empty for a Figma file.

To solve this, we added back synthetic DOM elements for the canvas so that screen readers could navigate and edit files.

## [How the system works](#how-the-system-works)

The **scenegraph** is the data structure of nodes that is rendered by Figma’s canvas.

Behind the canvas, invisible to sighted users, we render DOM elements mirroring the parts of the scenegraph that matter for assistive technology. There are four collaborating systems:

-   A Figma-internal “accessibility tree” that caches the accessibility details of every design layer, and makes surgical updates rather than rebuilding from scratch as edits are made.
-   A “Mirror DOM” React component that is responsible for actually putting elements into the DOM, using the internal accessibility tree as reference.
-   A bidirectional synchronization system for selection. When you select a node in the canvas, the corresponding DOM element receives focus. Conversely, we update the canvas selection when screen reader tools are used to navigate the Mirror DOM.
-   An announcement system that alerts the user to edits and other non-navigational changes—nudging, tool switching, and anything else that might be obvious to a sighted user.

### [The internal accessibility tree](#the-internal-accessibility-tree)

To determine which DOM elements to render and how, we worked backward from what the browser should know in order to build its accessibility tree. So we built our own internal accessibility tree, which captures the non-visual information that screen readers would require for any given Figma document.

For each layer in the document, we create an “accessible summary” that will be read out by screen readers. This summary can depend on the context and what kind of application the user is in. For example, in [prototypes](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma), we can omit most of the editing features and only emulate the content to the end viewer: just the text of text fields, or a button role for an item with a click interaction. On the other hand, autolayout frames, which are excluded from the accessibility tree for prototypes, need to be included when the user is editing a document.

After summarizing layers one by one, we walk the tree top-to-bottom, flattening out any omitted nodes. While we fully construct our internal accessibility tree when first loading a document, we monitor edits as the session goes on so that we can surgically update our tree, avoiding costly rebuilds.

![Illustrated workflow showing a design transformed into an accessible summary, simplified, and converted into an accessible HTML/DOM structure, using a flower shop interface as the example.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAABYlAAAWJQFJUiTwAAACmklEQVR4nAXB61PSAAAA8P1zvoAxYIMBQmCoHJfZQ+1hZx8y6/TSuzzUNB8ZOAS2BuIjRT3zrA9q5xWp+EpBk4dssMFgAhv9fkDFjVRwtELoBAItexERV4o4JOJykZALhEL4ggg+TWUOFf1okVRfO9ThcQPt0oqESsRhQCRgkVQLhKboUPOTqiIGFb3grVPGT4OFWWUeRzgvwnlgDofzJJz2InEXyhBIya8S/QhQIpW8T5V3wWw/nHmlYj5ALCaj7XWpvjp6HKTditi0PDomvZyS3XihtA+i/CA9L+MWoPKSCvjrtO5NtP22t593P77sao+9b71xauNjNbHBKsopoeeg2CwY+SS5xKRJnzwVkCX9tUl/bSYgKyxCgHfA/vbZ0sijla0ucv+N/6gPi061xzxS2lvFzkszQSgVACkSZAJQ5it0My/556m+mq1O4rXpOQkw3OO2Wfdfmg5XOn5sv9743kOGP75IeOQ5vKawALKrCpoEWTfIkwpuRZnegFKrstSyNB2UsutSgBgZ7u1a6r+/5r23jreuYZ2OndGOxGcoP1nHE4psEKY9CmZCXphRFIJIIaQtHmuLYU3pACntw0Bks2Vv8WlgqM/eQnYb1gceYBtDT2JjKm5Qzs8g2U1tJoiyPoQNaFLfdOyxsXxlFKJ6MaITI1qgeGpgw/Wh5YfYu1H7c7ejd3TX1ZbE0OykOu+rL4TM/HnD7akpEzZf/LEkz8z5s3oupOVPdMK1HihFjOyZLnV4N7LbdrLVebHTQR3Ycr/M3E8zf2ApxZpEpllkmni6kYo3ZhPm/Ik+s43mjvTlxB2AjxqpU03uSlemTALdIKTvCplGgbGWGZvA2oSsVcxZxVyzkLWU2IYyYyoljHzUUIybBMryHwUftnuS+emxAAAAAElFTkSuQmCC)![Illustrated workflow showing a design transformed into an accessible summary, simplified, and converted into an accessible HTML/DOM structure, using a flower shop interface as the example.](https://cdn.sanity.io/images/599r6htc/regionalized/8df55820df9bb13c223263a22e4d781c96f375cc-3264x1836.png?w=1632&h=918&q=75&fit=max&auto=format)

### [The Mirror DOM](#the-mirror-dom)

With our accessibility tree ready, we can generate the DOM. This is handled by a React component that renders itself recursively, with each instance of that component subscribing to changes in the accessibility tree for one specific design layer.

JSX

```
function ScreenReaderElement({ layerId }: { layerId: string }) {
  const { label, role, children } = useAccessibleSummary(layerId);
  return <div role={role} ariaLabel={label}>
    {children.map((c) => <ScreenReaderElement key={c} layerId={c}>)}
  </div>
}
```

As we make minimal, incremental changes to the accessibility tree to track edits, we rely on React to keep our DOM modification minimal as well.

One detail of the Mirror DOM that might be surprising is that we _don’t_ use typical [visually-hidden styling](https://www.a11yproject.com/posts/how-to-hide-content/) for this accessible but visually hidden content. While such techniques allow for assistive technologies to interpret content without impacting the layout of the page, we actually need Mirror DOM elements to be laid out. The reason is that the spatial layout of a Figma document is critical to its meaning, and even without visual display the position of these elements feeds into assistive technologies—screen magnifiers might pan to keep the focused element in view; screen readers render a high-contrast outline for partially sighted users; voice control tools might also display cues on screen.

That positioning calculation has a few steps. Every layer in a Figma design has an [affine transform](https://en.wikipedia.org/wiki/Affine_transformation): a fixed-size data structure that tracks offset, scaling, and rotation. Affine transforms are a powerful tool for computer graphics because any sequence of transforms can be concatenated into a single transform. We use those capabilities to position elements in the Mirror DOM using CSS, including any rotations or skews.

![Two diagrams compare how rotated interface elements are interpreted, with solid outlines on the left and simplified dotted outlines on the right around a "Kiki's Flower Delivery Service" card.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACiUlEQVR4nE2RTW8bZRSF5x8hJFQkauzY48nYM+Px2O7vKWmTLlixAxYIJMRHWhUJpKpqgSaN58Met0IkoUJs6vATKhp75r3vzYMcvGDx6FxdnXN1pOtcfRQh+zFykGD3B8heD7ndRW57yJ6P3AnQvQh7Z+MZIvdi7H6E3A2Q/RA5iJB7Gw3Rg0Ad83Gf6osh9WGCPIiRwwD53kO+85DDHvJtiPk8pvpsTPXNBPMgQe4PkPvBlvA6Y77qYT7x1ak/9Vn9FFNNE0wWYzMfzTpo2kbzLnrsY34YUD0cUz27hcnG2CxCcx8tfDTvo5mPPPaov/TUka9d1k9CVumIdZZgigApPGzhcjV30dTDPAqoHw2ppxPqYoLJI6TYxc43+OjMxf7SwRy21ZGHLepffVbTIW+nIy5PElYnMVXaxxY+NvUxT/rUTweYLKHOR6ynMauTPuu0R515SLaDPGthfvxQHfO4SX28S5VFvE0T3hzf4s3RmPU0QmZ9bN7HHAVURxEmjzFFzCpN+Ock4XIaUGfu9UHzvIX5uaWOHDcwafc6XM9iLrMxl+mIuhhiyxidb5pFVGmEKQbYWURdRFR5RJ33kMLF5m0kc6lTVx2ZNTCFi5Y+WobYcoCUMbYcoYsJuhhh5gOqWYTMQ642vlkX+3+KTSEPU3bVMb81qUsXKXexpY8te9hFhF0k2BcT5EVC9TKiehliygBbeth5BztvX6vMPWTewyz6mN83X/7zJuZsBzl1t3SQMw85D5DzEDn3Ma861K9czFkHOW0ip40tTWSzO/Mxf/SQv3bVuVreRJcNdNlClzvosvnffNFBL9ro8gN0eQNdvo8u30Nfv7PlXfT1DfSisfW66N9d/Rfa45ML0waExAAAAABJRU5ErkJggg==)![Two diagrams compare how rotated interface elements are interpreted, with solid outlines on the left and simplified dotted outlines on the right around a "Kiki's Flower Delivery Service" card.](https://cdn.sanity.io/images/599r6htc/regionalized/054ebbccf8c159a1753acac7a3e3eaec411b0472-3264x1836.png?rect=2,0,3261,1836&w=1080&h=608&q=75&fit=max&auto=format)

### [Keeping focus and selection in lockstep](#keeping-focus-and-selection-in-lockstep)

**Focus** is a system keyboard property that denotes the element the user is interacting with at a given moment. For both screen readers and keyboard-only users, pressing the `Tab` key on a keyboard should move focus throughout the page in a way that matches the visual layout.

With the above features, we can support navigating prototypes and other “published” content with a screen reader. The next step was to support navigating “editing” applications in Figma. To do this, we needed to add back another thing that browsers usually handle for us: selection and focus semantics that assistive technologies can hook into.

The user’s **selection** is the item or items chosen for a given action, and may not always be the same as the element in focus (imagine selecting an item from a dropdown, and then using `Tab` to focus on a button to submit your selection).

When navigating in the Figma canvas, the `Tab` key changes the selected node without changing the system keyboard focus. This meant that the canvas looked like one big navigation target to screen readers. We needed to make sure that the focus moved to the selected node inside the canvas, the way users expect.

So, we built two-way synchronization—between the canvas selection and the system keyboard focus—into our Mirror DOM system. When you click on the canvas, the correct item is focused for the screen reader, and when a screen reader action moves the focus, we update the visible selection highlights. Because of this system, even screen reader controls such as the VoiceOver rotor are able to select nodes in the Figma canvas.

### [Announcing actions and changes](#announcing-actions-and-changes)

The internal accessibility tree and Mirror DOM systems expose the _contents_ of Figma files to assistive technologies. However, these tools alone are not sufficient for editing, where the application must confirm a user’s _actions_ back to them. Gestures such as nudging, whose results are obvious to a sighted user, need to also provide textual context that can be audibly announced. There’s really only one way to do this: We rely on [live regions](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions) provided by web browsers as part of the ARIA standard.

Our implementation adds live region markup to every toast announcement in the product, and supports invisible announcements for events that would likely be perceived as redundant noise by sighted users—e.g., most users probably wouldn’t find it helpful to see a toast popup confirming every arrow key nudge, but these notifications are important for accessibility. We also handle automatic “coalescing”: If multiple events in the same category occur close together, we can merge them. Again using arrow key nudges as an example, if you nudge a single pixel five times in a row, we can send one announcement confirming “Moved five pixels” instead of repeating “Moved one pixel” five times.

## [What’s in place, and what’s next](#what-s-in-place-and-what-s-next)

To learn more about accessibility at Figma, visit our [help center](https://help.figma.com/hc/en-us/articles/35063862380311-Accessibility-at-Figma).

Our work to make Figma more accessible has grown over several years, shaped by feedback from users of assistive technology through our partnership with [Fable](https://makeitfable.com/). It started with the Prototype viewer in 2022, then FigJam in 2023, and finally we made significant progress over the course of 2024 and 2025: We rolled out the Adapt content for screen readers setting to Design, Dev Mode, and Slides, launched the first version of [canvas keyboard controls](https://www.figma.com/blog/introducing-keyboard-accessibility-features/)

, added [enhanced contrast mode](https://help.figma.com/hc/en-us/articles/5576781786647-Change-themes-in-Figma#h_01K57AMY9Y08P2656MNM2HDS1H), and made more than

[15 additional accessibility-focused improvements

![Abstract geometric collage featuring bright shapes, letters, and an eye symbol in pink, green, black, and cream tones.](data:image/png;base64,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)![Abstract geometric collage featuring bright shapes, letters, and an eye symbol in pink, green, black, and cream tones.](https://cdn.sanity.io/images/599r6htc/regionalized/bcdd72b8c682f3ebcee8c9c9baff4f90e4411509-1536x2048.png?w=1536&h=2048&q=75&fit=crop&crop=focalpoint&auto=format)

### 15+ ways we’re improving accessibility in Figma

To make Figma easier to navigate for all, we’re launching over a dozen keyboard-only controls and improving the screen reader experience.



](https://www.figma.com/blog/introducing-screenreader-and-accessibility-features/)

.

We’re integrating accessibility into how we design, build, and ship new products. Every new feature is reviewed for accessibility support, and our team is also investing in internal tooling such as an AI agent equipped with Figma-specific context and guidance from the design systems team to help scale accessibility context across the entire Figma product development organization.

We also want to make it easier for people to build accessible products in Figma. Today, you can [identify whether a color combination meets accessibility guidelines in the color picker](https://help.figma.com/hc/en-us/articles/360041003774-Update-fills-using-the-color-picker#h_01JQF1T71AC72G6VDXN27B77V0) and [rename visible layers](https://help.figma.com/hc/en-us/articles/360039958934-Rename-Layers) to pass those names to screen readers. And, we recently launched [check designs](https://help.figma.com/hc/en-us/articles/39592284074263-Check-designs-in-Figma), a new feature in Figma Design that gives designers a way to compare designs against their design system to surface what’s off and fix it in one click, including flagging low contrast and suggesting WCAG 2.0 AA- or AAA-compliant colors before handing off to engineering.

Accessibility work is never really finished. Each improvement helps remove another barrier, making it possible for more people to participate in the creative process, share their ideas, and shape the products we all use. We’ll keep listening, learning, and building toward a more accessible future.