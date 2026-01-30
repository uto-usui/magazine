---
title: "Version control: Three ways Figma explored horizontal scrolling"
source: "https://www.figma.com/blog/version-control-three-ways-figma-explored-horizontal-scrolling/"
publishedDate: "2025-04-16"
category: "design"
feedName: "Figma Blog"
---

Users had been asking us to add horizontal scrolling to the Layers panel for a while before it became part of UI3. When nested frames are pushed out of view, you need a scroll bar to shift back and forth. Sounds simple, right? Well, not exactly. “Something that seemed like it would be easy to solve raised really interesting challenges from a design, engineering, and collaboration point of view,” says Figma Product Designer Giorgio Caviglia.

For starters, the Layers panel is “very utilitarian,” Giorgio says. “It’s a tricky surface because it’s used all the time and has to be very reliable.” On top of that, the panel isn’t just a static list of parent and child elements. “Those things are kind of alive,” he says. “You can hide layers, lock them, collapse and expand them. So what happens to those elements when you scroll?” Adding to the challenge was virtualization, which means that only currently visible layers are rendered, for better performance. As you scroll up or down in the panel, other layers come into play, and the variable text length of those layers causes problems for horizontal scrolling. These factors complicate the ultimate goal, which is to orient users in the hierarchy and signpost to them that there’s more to see.

> You can hide layers, lock them, collapse and expand them. So what happens to those elements when you scroll?

Giorgio Caviglia, Product Designer, Figma

To untangle this complexity, Giorgio and a development team led by Software Engineers Amy Shan and Grant Phelps went through a range of iterations to create a smooth, intuitive experience. Here, they walk us through three explorations they _didn’t_ ship—and what they learned along the way.

## [Version one: Out-of-view behavior on the left side](#version-one-out-of-view-behavior-on-the-left-side)

Giorgio dove straight into prototyping with code, using JavaScript, HTML, CSS, and React to get a sense of how different approaches would feel. “I really love prototyping with code because it’s the best of both worlds,” he says. “I can work within the constraints of the code base, but still focus on the craft and how things should look.” Being so hands-on was especially valuable for a feature as dynamic as scrolling. “When you’re dealing with thousands of layers, multiple scroll directions, and complex interactions, you need to feel how it works,” Giorgio explains. “You can’t anticipate all states when you’re designing statically.”

One question horizontal scrolling introduced was: What should happen to the white space when users scroll deeper into nested nodes? In one version, the team explored a symmetrical treatment for layers when they leave the top-left edge of the panel and enter the bottom-right edge. When layers slid out of view, they would be indicated by icons aligned to the corresponding edge. “The idea was to have a symmetrical design with frame icons above and below, so you would know where you were in the layer hierarchy,” says Giorgio.

This proved thorny from an engineering standpoint, however. Getting icons to stick to the panel edges was a quick change, but they needed opaque backgrounds to cover the layer name text while users scrolled, which conflicted with the way layer rows are structured. “In various situations during horizontal scrolling, the background should appear to be sliding under some layer elements while truncating others,” says Amy, “which is difficult to do when the component we’re styling doesn’t have exact knowledge of where the elements on top are placed.”

It also wasn’t ideal from a design perspective. As users scrolled to the right, the ends of layer names formed a ragged edge of text on the top left. “In design, you so often focus on symmetry, which can be idealistic to the extent that reality is often more complicated than you can predict,” says Giorgio. “This is a clear example of a solution introducing a new problem—more than anything, this iteration opened the door to approaching the white space above the visible layers.”

In another exploration, the team prototyped an auto-scroll behavior. When users selected a layer on the canvas that wasn’t in view on the Layers panel, the scroll bar would automatically move to center it on the panel. While this behavior made sense in theory, it was disorienting in practice. One internal tester explained: “Clicking on something deeply nested is jarring because the layer tree scrolls to it horizontally _and_ vertically. I’ve lost all context of the parent items at that point.”

Giorgio makes an analogy to using Google Maps while driving: If the map were to jump to a different location, the user wouldn’t know where to go next. “As a designer, knowing the exact layer you’re working on—where it is in the hierarchy, what it’s named, whether it’s part of a parent component—is very important,” he says. “You create a mental model that’s reflected in the Layers panel. If you’re disoriented, you start to doubt yourself. You want the tool to support you, not work against you.”

## [Version three: Renaming layers](#version-three-renaming-layers)

The introduction of horizontal scrolling also raised new questions about renaming layers. What would happen if a user clicked a layer to edit the text box, then scrolled to another layer? One option was to set the current input as the new layer name, but this set the stage for unintentional renaming. “We didn’t feel like scrolling was a strong enough signal for confirming a change,” says Giorgio.

Instead, the team explored a text box that expanded out to the right as the user scrolled, although this triggered some awkward UI with the box flickering on the far edge. “Basically, because the team was using JavaScript to resize elements, there was no way to get around the lag caused by resizing the panel horizontally,” says Grant. “If we chose to resize from the left, we got choppiness on the right side, and if we resized from the right, we got choppiness on the left.” Not only was this a poor experience, but it also meant that if the user kept typing, the scroll bar would potentially jump back to bring the text into view—a no-go based on what the team learned with the auto-scroll exploration.

## [The final version: Finding the right balance](#the-final-version-finding-the-right-balance)

Taken together, the iterations helped the team land on key decisions: They would leave the white space above the visible layers completely blank to match the white space at the bottom of the Layers panel, and they would simply reset the layer name, even if it had been edited before the user scrolled.

To address the auto-scroll question, the team developed heuristics for when and how far to adjust the scroll bar when a user selects a layer that’s out of view. If the layer icon and text length extend beyond the left edge of the Layers panel by 50 pixels or more, for example, the scroll bar shifts left—just enough to show the additional context above it, but not enough to knock designers out of their flow. This presented a unique technical challenge due to virtualization. If a user clicks a layer that isn’t currently rendered—and there’s no information about how long the text is—it’s unclear how much to auto-scroll for proper alignment. “Grant and I figured out a way to do an invisible render of the row before we move it,” says Amy. “We then measure that row and use it for the auto-scroll so that it’s perfectly aligned.”

Each version the team prototyped and tested helped them understand what to automate, what to leave in users’ control, and where to keep things simple. “It was about not overcomplicating things and considering technical constraints to avoid slowing things down,” says Giorgio. “We needed to ship something that felt like an evolution, not a regression.” Today, the scroll bar works in a way that just makes sense—but as in most cases, that seamlessness is the result of a huge amount of iteration and prototyping. As Giorgio puts it: “Solutions that feel just right don’t start that way. They’re often born out of madness.”

On April 30, we’ll be retiring UI2 and transitioning to UI3. Learn more about why we’re making the change and [how to switch over as seamlessly as possible](https://www.figma.com/blog/making-the-move-to-ui3-a-guide-to-figmas-next-chapter/)

.