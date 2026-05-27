---
title: "Building a Scroll-Driven 3D Cube Gallery in Webflow with GSAP"
source: "https://tympanus.net/codrops/2026/05/26/building-a-scroll-driven-3d-cube-gallery-in-webflow-with-gsap/"
publishedDate: "2026-05-26"
category: "design"
feedName: "Codrops"
author: "Francesco Castronuovo"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Webflow_GSAP_Cube.webp?x42294)](https://gsap-cubic-scrollable-image-gallery.webflow.io/ "Building a Scroll-Driven 3D Cube Gallery in Webflow with GSAP Demo")

In this tutorial, we’ll build a scroll-driven image gallery in Webflow where background images fade into one another, text labels slide in and out with staggered Split Text animations, and a 3D cube rotates through the same images while moving along a hexagonal path.

The final result combines **CMS-driven content, Webflow’s GSAP-powered interactions, CSS custom styling, 3D transforms,** and a few small layout refinements to create an interaction that feels much more complex than the structure behind it actually is.

And the best part is that the entire setup is reusable: once the CMS structure is in place, you can replace the images and text with your own content and keep the animation logic intact.

## 1\. Starting from the CMS structure

The starting point for this project is an absolutely blank canvas.

The only thing prepared in advance is a CMS Collection called **Pictures**. This collection is a little more complex than a regular image gallery collection, because it contains several fields that may not make immediate sense at first glance.

But that is part of the fun.

Besides the default **Name** and **Slug** fields, the collection includes the following custom fields.

First, we have the most predictable one: an image field called **Image**. Thanks to my usual amazing imagination when it comes to naming things, this field will host the picture displayed both in the background and on the cube.

Then, we have a plain text field called **Text**. This is the short label associated with each image, and it will be animated with a staggered Split Text effect while scrolling.

A quick recommendation: if you want the text to stay on a single line and remain big, bold, and readable, keep it short. One or two words usually work best.

Next, we have a numeric field called **Order**. This is an integer that defines the order in which the images appear in the gallery.

At first, this might look like a simple sorting helper. But it is more important than it seems, because we will also use it to generate unique attribute values for each CMS item.

In this project, the maximum value is set to `6`, because we are building a rotating cube, and a cube has exactly six faces.

![Screenshot of the Webflow CMS Collection fields, highlighting Image, Text, and Order.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/2-1200x683.png.webp?x42294)

Then comes the mysterious part of the CMS collection.

We have eight additional numeric fields:

-   **Origin Left**
-   **Origin Top**
-   **Move X**
-   **Move Y**
-   **Move Z**
-   **Rotate X**
-   **Rotate Y**
-   **Rotate Z**

These fields are directly connected to the transform properties we can find in Webflow’s Style Panel.

If we open the **2D & 3D Transforms** settings, we can find the transform origin properties, including **Left** and **Top**. This already gives us a clue: the **Origin Left** and **Origin Top** fields will be used to control the transform origin of each cube face.

Similarly, the **Move X**, **Move Y**, and **Move Z** fields correspond to the move transforms, while **Rotate X**, **Rotate Y**, and **Rotate Z** correspond to the rotation transforms.

So, even before writing any CSS, we can already understand the idea: each CMS item will become one face of the cube, and the CMS fields will tell that face where to move, how to rotate, and where its transform origin should be.

One last important detail: the rotation fields are integers, while the move fields are decimals. This matters because some of the cube positioning values require fractional numbers.

![Side-by-side screenshot of the CMS transform fields and Webflow’s Transform Settings panel.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/3-1200x683.jpg.webp?x42294)

## 2\. Building the scroll section

Let’s start from what we know very well: a section.

Create a section and give it the class `section` and set its height to 500vh.

This value is completely arbitrary, but it controls the perceived speed of the scroll interaction. The taller the section, the slower the animation feels. For this project, `500vh` is a reasonable starting point.

Inside the section, add a container and give it the class `main-container`.

This container is one of the most important elements in the entire build. You can think of it as the window through which we see the content placed inside the section.

For that reason, it needs to fill the viewport:

```
height: 100vh;
max-width: none;
```

Then, because this container is our visual window, we do not want it to scroll away. Set its position to **Sticky** and its top offset to `0`.

This keeps the container anchored to the top of the viewport while the user scrolls through the taller section.

![Webflow Designer screenshot showing the section, sticky main container, and height settings.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/4-1.png.webp?x42294)

Inside the main container, add a div block with the class `section_content-wrapper`.

Set both width and height to `100%`, so it fills the available space inside the container.

This wrapper will contain two CMS lists:

1.  one for the fullscreen background images and animated text;
2.  one for the 3D cube.

Let’s start with the background gallery.

## 3\. Creating the fullscreen background gallery

Inside `section_content-wrapper`, add a Collection List and connect it to the **Pictures** CMS Collection.

Give the Collection List Wrapper the class `pictures_list-wrapper`. Set its width and height to `100%`.

Then, sort the collection by the **Order** field, from largest to smallest.

This is important because the items will be absolutely positioned and stacked on top of each other. Sorting from largest to smallest ensures that the item with `Order = 1` appears on top at the beginning of the animation.

![Screenshot of the Collection List sort settings, sorted by Order from largest to smallest.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/5.jpg.webp?x42294)

Next, assign the Collection List itself the class `pictures_list`. Again, set both width and height to `100%`.

Then select the Collection Item and give it the class `pictures_list-item`.

Since all background images need to sit on top of each other, set the item position to **Absolute** and choose the **Full** option.

At this point, each collection item is free to expand inside the closest ancestor with a non-static position. In this case, that ancestor is the sticky `main-container`.

Inside each collection item, add an image and give it the class pictures\_image

Set:

```
width: 100%;
height: 100%;
object-fit: cover;
```

Then bind the image to the **Image** field from the CMS Collection.

A quick pro tip: in this tutorial, we’re keeping the setup as simple as possible. But in a real project, it would be better to add another CMS field for the image alt text and bind it to the image element.

![Screenshot of the image binding and object-fit cover setting.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/6.png.webp?x42294)

## 4\. Adding the overlay and centered text

Right after the image, still inside the collection item, add a div block with the class `pictures_overlay`.

This overlay will sit on top of the image and add a subtle gradient to improve readability and visual depth.

Set it to **Absolute**, choose the **Full** option, and add a linear gradient background:

```
linear-gradient(
  to bottom,
  rgba(0, 0, 0, 0.6) 0%,
  rgba(0, 0, 0, 0) 50%,
  rgba(0, 0, 0, 0.6) 100%
)
```

Then add a text element after the overlay and give it the class `pictures_text`.

Set the text element to **Absolute**.

At first, it may seem like nothing is happening. To center it properly, go back to the Collection Item and change its display from **Block** to **Flex**. Then align the content to the center on both the horizontal and vertical axes.

Now the text is perfectly centered inside the viewport.

Bind the text element to the **Text** field from the CMS Collection.

Since the main container has no maximum width, using viewport units for the text size works nicely here. In this project, we can set the font size to 12vw. Then set the line-height to 1.

Finally, capitalize the text for a stronger visual look.

The font used in this project is **League Gothic**, available on Google Fonts.

![Fullscreen screenshot showing one background image, gradient overlay, and large centered text.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/7-1200x683.jpg.webp?x42294)

At this point, we could continue building the cube structure, but that would make the setup too heavy to digest all at once.

So let’s pause the structure here and build the first part of the scroll animation.

## 5\. Planning the background transition animation

Before opening the Interactions Panel and adding actions blindly, it is useful to stop and think about what we want to achieve.

For each transition, we want three things to happen:

1.  the current background image fades out, revealing the next one below;
2.  the current text slides out toward the bottom with a staggered animation;
3.  the next text slides in from the bottom with another staggered animation.

That sounds complex, but once we break it down, each transition is just a group of three actions.

And that group repeats for every transition:

-   image 1 to image 2;
-   image 2 to image 3;
-   image 3 to image 4;
-   and so on.

![Simple diagram showing one transition split into three actions: text out, image fade, text in.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Transition-Split-1200x648.jpg.webp?x42294)

Since the whole animation is controlled by scrolling through the section, the section itself is the natural trigger.

Select the section, go to the Element Settings Panel, and add this custom attribute: `data-animate="section"`

This lets us target the section by attribute instead of class, keeping the animation more independent from styling decisions.

## 6\. Setting up attribute-based targeting

Now we need a way to target each CMS item independently. Select the background Collection Item and add this attribute: `data-background-image`

Instead of setting a static value, bind the value of this attribute to the **Order** field.

This means every collection item will share the same attribute name, but each one will have a unique value:

```
data-background-image="1"
data-background-image="2"
data-background-image="3"
...
```

We’ll use this to fade out one specific image at a time. Then select the text element and add another attribute: `data-image-text`

Again, bind its value to the **Order** field.

Now each text element can also be targeted independently.

![Screenshot of Webflow custom attributes bound to the CMS Order field.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/9-1.png.webp?x42294)

## 7\. Creating the scroll interaction

Open the Interactions Panel and create a new scroll interaction called `Cube Rotation & Background Image`.

In the trigger settings, switch the target from **Class** to **Attribute** and use: `data-animate="section"`

Since the animation should be controlled by scroll progress, we can keep the default scroll control behavior. A smoothing value around `0.8` works well for this type of interaction.

For the thresholds, we want the animation to start when the top of the section reaches the top of the viewport: `Start: Top / Top`

And we want it to end when the bottom of the section reaches the bottom of the viewport: `End: Bottom / Bottom`

The scroll range is now ready.

![Screenshot of the scroll trigger settings and thresholds.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/10.jpg.webp?x42294)

## 8\. Building the first text-out action

Let’s build the first action: the text of the first image sliding out.

Add an Animate Action and call it: `(TEXT) 1 Out`

In the target settings, switch from Class to Attribute and target: `data-image-text="1"`

Set the duration to 0.4s.

Leave the start value at `0s`, and keep the easing linear. Since this animation is driven by scroll position, we want the actions to naturally follow the scroll flow.

In the animated properties, keep only **Move Y**.

This is a **To** animation, because the text is moving from its current position to a new position.

Set Move Y to 100%.

At this point, the text moves, but it is not masked and it is not staggered yet.

To fix that, enable **Split Text**, split and mask by word, and set the stagger type to **Offset Time**.

Then set the stagger interval to 0.3s.

Now the words animate one after another in a proper staggered way.

## 9\. Understanding timing in scroll-driven animations

Before creating the next action, there is an important concept to clarify.

-   In a **normal** timeline animation, duration means actual time.
-   In a **scroll-driven** animation, duration behaves differently.

The animation is controlled by scroll progress, so a duration value represents a portion of the entire scroll interval. GSAP takes all the durations defined in the actions and distributes the available scroll distance among them.

That is why, if the animation currently contains only one action, that action stretches across the entire scroll range.

Once we add more actions, the scroll interval gets distributed across the full timeline.

This is also why the relationship between duration, start values, and stagger intervals becomes so important when building complex scroll interactions.

![Simple timeline diagram explaining how action durations map to scroll progress rather than real elapsed time.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Duration-to-Scroll-Mapping.jpg.webp?x42294)

## 10\. Adding the next text-in action

Now we can create the text-in action for the second image.

Duplicate `(TEXT) 1 Out` and rename it to `(TEXT) 2 In`.

Update the attribute target to: `data-image-text="2"`

Set the start value to 0.6s.

This creates a small delay between the first text moving out and the second text moving in.

This time, the text should animate from the bottom into its current position, so change the animation type from **To** to **From**, and keep Move Y set to 100%.

If we preview the animation now, we still will not see the second text.

And that is not a mistake.

The second text is inside the second collection item, and the second collection item is sitting underneath the first one. Since all items are absolutely positioned and stacked on top of each other, the second text will not become visible until the first image fades out.

So let’s complete the transition.

## 11\. Fading the first image out

Add a new Animate Action and call it `(IMAGE) 1 → 2`.

Target the first background item using: `data-background-image="1"`

Set the duration to 0.5s.

Set the start value to 0.4s.

The idea is to start fading the image while the first text is still sliding out, and finish the fade before the second text has fully entered.

In the animated properties, keep only **Opacity**.

This is a **To** animation, and the final opacity value is 0%.

Now the first transition is complete.

The first text slides out, the first image fades away, and the second text slides in.

## 12\. Repeating the transition pattern

What we built is the base of the entire first part of the animation.

From here, we duplicate the same three actions for each following transition and update only two things:

1.  the attribute values;
2.  the start values.

For the transition from image 2 to image 3, duplicate `(TEXT) 1 Out` and rename it to `(TEXT) 2 Out`.

Update the attribute value from `1` to `2`, and set its start value to 1.5s.

This creates a small gap between the end of the first transition and the beginning of the second.

Then duplicate `(TEXT) 2 In`, rename it to `(TEXT) 3 In`.

Update the attribute value to `3`.

Since the original start value was `0.6s`, and we are offsetting this group by `1.5s`, the new start value becomes 2.1s.

Finally, duplicate `(IMAGE) 1 → 2`, rename it to `(IMAGE) 2 → 3`.

Update the attribute value to `2`, and set the start value to 1.9s.

That comes from: `0.4s + 1.5s`

Repeat the same logic for the remaining transitions.

![Screenshot of the Interactions Panel showing grouped and color-coded actions for multiple transitions.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/13-1200x683.jpg.webp?x42294)

## 13\. Looking at the animation timeline

Once all transition groups are created, it is useful to visualize the timeline outside the native Webflow timeline.

For example, the first transition ends at `1.3s`, while the second transition starts at `1.5s`.

This means there is a `0.2s` gap between the two transitions.

That small gap creates a subtle anchoring effect at the end of each transition. Personally, I like this because it gives the animation a slightly more intentional rhythm.

But if you prefer a completely fluid movement, you can remove the gap by reducing the start values of the second group by `0.2s`.

Then, for the third group, you reduce the start values by `0.4s`, and so on.

The important thing is not the exact value, but understanding the relationship between the actions.

Once you understand the timeline, you can bend it to your will.

![Figma-style timeline diagram showing the first three transition groups, including the 0.2s gap between them.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/8-1200x580.jpg.webp?x42294)

Now that the background image and text transitions are working, we can move to the second part of the build: the 3D cube.

## 14\. Building the cube collection list

Inside `section_content-wrapper`, add a second Collection List and connect it to the same **Pictures** CMS Collection.

Give the Collection List Wrapper the class `pictures_cube-list-wrapper`.

Set its position to **Absolute** and choose the **Full** option.

Then set its display to **Flex** and align the content to the center on both axes.

This places the cube structure right in the center of the viewport, which makes it easier to manage.

Since the cube should sit above the background content visually, but we may still want the user to interact with the text below, set pointer events on this wrapper to:

```
pointer-events: none;
```

Now we need a very important 3D setting: **perspective**.

Open the **2D & 3D Transforms** settings and set the children perspective distance to something around 1000px.

You can tweak this value based on the strength of the perspective you want.

Since the cube stays centered inside the same wrapper that provides the perspective, the cube will not appear distorted when one of its faces is parallel to the screen.

Then add this attribute to the wrapper `data-animate="cube-list-wrapper"`.

We’ll use this wrapper later to move the cube around the viewport.

![Screenshot of the cube list wrapper settings, including absolute full positioning, flex centering, pointer-events none, and perspective.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/14.png.webp?x42294)

## 15\. Preparing the cube blueprint

Select the Collection List itself and give it the class `pictures_cube-list`.

This element acts as the blueprint for the cube faces.

First, give it a square shape by setting its aspect ratio to **Square**.

Then set its position to **Relative**, because the collection items inside it will be absolutely positioned.

Now we need two custom CSS properties. The first one is:

```
transform-style: preserve-3d;
```

By default, browsers tend to flatten transformed child elements into the plane of their parent. Since we are building an actual 3D structure made of multiple faces positioned in 3D space, we need the parent to preserve the 3D position of its children. `preserve-3d` tells the browser not to flatten those children, allowing each face of the cube to keep its own position and rotation in 3D space.

The second one is:

```
container-type: size;
```

The theory behind this property goes beyond the scope of this tutorial, but the practical reason we use it here is very specific: it lets us use percentage-based values when moving faces along the Z axis.

Normally, percentage values are tied to dimensions like width and height, not depth. With this setup, we can express something like: “move this cube face by 50% of the cube side along the Z axis.”

Finally, set the width of the cube list to:

```
width: min(30vw, 30vh);
```

Why use `min()` with `vw` and `vh`?

Because we want the cube to remain responsive across different viewport sizes and aspect ratios.

On wide screens, the viewport height is usually the limiting dimension, so the cube scales based on `30vh`. On narrow vertical screens, the viewport width becomes the limiting dimension, so the cube scales based on `30vw`.

The value `30` can be adjusted, but it gives a nice balance in this project.

Then add this attribute to the cube list `data-animate="cube-list"`.

We’ll use this element to rotate the cube.

![Screenshot of the cube list settings, including square aspect ratio, width min(30vw, 30vh), transform-style, and container-type.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/15.png.webp?x42294)

## 16\. Creating the cube faces

Select the Collection Item inside the cube list and give it the class `pictures_cube-item`.

Set it to **Absolute** and choose the **Full** option. Then override pointer events back to:

```
pointer-events: auto;
```

Why?

Because the wrapper itself has pointer events disabled, but we may still want the individual cube faces to be clickable. For example, each item could link to a project page, blog post, or case study.

Inside the collection item, add a div block with the class `pictures_cube-image-wrapper`.

Set width and height to `100%`. Then add an image inside it, bind it to the CMS **Image** field, and give it the class `pictures_cube-image`.

Set:

```
width: 100%;
height: 100%;
object-fit: cover;
```

Optionally, add a small padding to the image wrapper, for example:

```
padding: 3%;
```

This creates a small gap between adjacent faces of the cube. At this point, all the images are still stacked on top of each other.

Which is perfectly normal.

We have not told them how to become a cube yet.

![Screenshot showing the flat stacked cube images before custom CSS is applied.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/16-1-1200x683.jpg.webp?x42294)

## 17\. Turning CMS items into cube faces with CSS

To turn the flat stack into a cube, we’ll use CSS and the transform values stored in the CMS.

Each CMS item already contains the values we need:

-   transform origin left;
-   transform origin top;
-   move X, Y, and Z;
-   rotate X, Y, and Z.

The exact geometry behind those values is not the main focus of this tutorial. We could definitely spend an entire separate tutorial building a cube from scratch with div blocks and explaining each transform step in detail.

But here, the important part is the system: the CMS stores the transform values, and the CSS reads those values to position each collection item as a different face of the cube.

Inside the cube image wrapper, add an Embed element and place the CSS that targets the current collection item.

Conceptually, the code looks like this:

```
<style>
  .pictures_cube-item:nth-child({{Order}}) {
    transform-origin: {{Origin Left}}% {{Origin Top}}%;
    transform:
      translate3d(
        {{Move X}}%,
        {{Move Y}}%,
        {{Move Z}}cqi
      )
      rotateX({{Rotate X}}deg)
      rotateY({{Rotate Y}}deg)
      rotateZ({{Rotate Z}}deg);
  }
</style>
```

In Webflow, the values wrapped here as `{{...}}` are bound to the corresponding CMS fields.

This CSS is generated once for each CMS item, and each instance receives different values from the CMS.

The code targets the cube collection item and uses the `nth-child()` pseudo-class with the CMS **Order** value, so each snippet only affects the correct item.

We are editing two main things:

1.  `transform-origin`, which controls the pivot point of the face;
2.  `transform`, which moves and rotates the face into its correct 3D position.

If you prefer to keep the same attribute-based approach used in the animation, you can replace the class selector with an attribute selector. The important part is that each item receives the right transform values.

Save and close the Embed element, then give it a class like `pictures_cube-css`.

Now the flat stack becomes a cube.

![Before/after comparison — flat stacked images vs completed cube structure.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/17-1-1200x494.jpg.webp?x42294)

## 18\. Fixing the cube position and image order

At this point, two things may look off.

First, the cube sits right in the center of the viewport, directly on top of the text. Not exactly the best design choice.

Second, the image visible on the cube does not match the image currently visible in the background.

Let’s fix both.

To move the cube away from the text, select the cube list wrapper and apply a move transform on the X axis:

```
translateX(-35%)
```

This value works nicely in this composition, and we’ll also use it as a reference when animating the cube around the viewport.

Then, to fix the image order, update the sorting of this second Collection List.

This time, sort the items by **Order** from smallest to largest.

Now the starting face of the cube matches the background image.

![Screenshot showing the cube positioned to the left of the centered text, with the matching image visible.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/18-1-1200x683.jpg.webp?x42294)

The cube is now ready to shine.

## 19\. Planning the cube animation

Before adding more actions, let’s think about the behavior we want.

During each background transition, the cube should do two things:

1.  rotate to reveal the face matching the next background image;
2.  move along the sides of an imaginary hexagon centered in the viewport.

So, for each transition, we need two additional actions:

-   one action to rotate the cube;
-   one action to move the cube wrapper.

The easiest way to rotate the cube is to rotate the cube list itself, because it contains all the faces.

That is why we added `data-animate="cube-list"`.

And the easiest way to move the cube is to move the cube list wrapper, because it has the same size as the viewport. This lets us use percentage values for responsive movement on both the X and Y axes.

That is why we added `data-animate="cube-list-wrapper"`.

![Diagram showing the cube moving through the vertices of a hexagon while rotating to reveal the matching face.](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/19-1-1200x675.jpg.webp?x42294)

## 20\. Adding the first cube rotation

Open the same scroll interaction we created earlier and add a new Animate Action.

Call it `(CUBE) 1 → 2`.

Target `data-animate="cube-list"`.

This action should last as long as the entire first transition.

From our timeline, the first transition lasts 1.3s.

So set the duration to `1.3s` and the start value to `0s`.

In the animated properties, remove everything and add a Rotate property.

For the first transition, the cube needs to rotate along the Y axis to reveal the second face.

Use a **To** animation and set `Rotate Y: 90deg`.

Now the cube rotates during the same scroll interval as the first background transition.

## 21\. Moving the cube along the hexagon

Next, add another Animate Action and call it `(CUBE) Move 1 → 2`.

Target `data-animate="cube-list-wrapper"`.

Set the duration to 1.3s.

Set the start value to 0s.

Keep only **Move X** and **Move Y** in the animated properties.

This is also a **To** animation.

For the first move, we can use:

```
Move X: -17.5%
Move Y: -30%
```

Why `-17.5%` on the X axis?

Because we initially moved the wrapper to the left by `-35%`. Bringing it back by half of that value creates a nice diagonal movement toward the next imaginary vertex of the hexagon.

Now, if we preview the interaction, the cube rotates while moving to the next position, the background fades, the current text slides out, and the next text slides in.

This is where the whole composition starts to feel alive.

## 22\. Completing the cube animation

From here, the rest follows the same logic.

For every background transition, add:

1.  a cube rotation action targeting `data-animate="cube-list"`;
2.  a cube movement action targeting `data-animate="cube-list-wrapper"`.

Keep the actions grouped and color-coded by transition, so the timeline stays readable.

For example, in the second transition, the cube rotation goes from `Rotate Y: 90deg` to `Rotate Y: 180deg`.

And the cube movement goes from `Move X: -17.5%` to `Move X: 17.5%` while the Y position remains the same.

In another transition, such as from image 3 to image 4, the cube may rotate along the X axis instead, for example: `Rotate X: -90deg`

The exact values depend on how the cube faces are arranged, but the principle remains the same: the cube rotates to reveal the face matching the background image, while the wrapper moves around the hexagon.

Once all actions are in place, scroll back to the top, enter preview mode, and test the full interaction.

The text slides out. The image fades. The cube shifts and rotates. The next text slides in.

Everything is now connected.

## 23\. Fixing horizontal overflow

There is one small issue we may notice, especially when scrolling back up: horizontal overflow.

This happens because the cube list wrapper has the same size as the viewport and moves across the viewport during the animation.

The fix is very simple.

Select the main container and set overflow to:

```
overflow: hidden;
```

## 24\. Preventing the macOS overscroll bounce

There is one more small refinement that makes the live experience feel cleaner, especially on macOS.

If we publish the project and scroll all the way to the bottom, we may see the default elastic overscroll behavior: that bouncy white space that appears when trying to keep scrolling past the end of the page.

We can disable it with a tiny global CSS snippet:

```
<style>
  html,
  body {
    overscroll-behavior: none;
  }
</style>
```

Add an Embed element near the top of the page, paste the snippet, and give it a class like `global-styles`.

Then set its position to **None** and move it to the very top of the page structure, so it loads before the rest of the content.

Publish the project again, refresh the live link, and the overscroll bounce is gone.

## 25\. A quick note on responsiveness

The entire section has been built with responsiveness in mind.

The sticky container fills the viewport, the background images use `object-fit: cover`, the text uses viewport units, and the cube width uses: `min(30vw, 30vh)`.

That said, on narrower screens, a couple of small adjustments can make the composition more balanced.

For example, on the Tablet breakpoint, we can reduce the text size from 12vw to 11vw.

And update the cube list width from `min(30vw, 30vh)` to `min(25vw, 25vh)`.

Nothing dramatic is required. We are simply pushing the already responsive setup a little further.

## Final thoughts

And that’s it.

We built a CMS-powered, scroll-driven 3D gallery in Webflow using GSAP-powered interactions, Split Text animations, 3D transforms, and a small amount of custom CSS.

Along the way, we created:

-   a fullscreen stacked CMS gallery;
-   staggered text transitions;
-   scroll-controlled image fades;
-   a CMS-driven 3D cube;
-   attribute-based animation targeting;
-   a coordinated cube rotation and movement system;
-   a responsive layout using viewport units and `min()`;
-   a couple of small refinements to make the final experience cleaner.

The most important idea behind the whole build is that complex interactions become much more approachable when we break them into smaller, repeatable systems.

The background transition is just a group of three actions.

The cube animation is just a pair of actions added to each transition.

The CMS fields are just a way to store the transform values each face needs.

Once all these pieces are connected, the final result feels much more advanced than the individual steps behind it.

And that, honestly, is one of my favorite things about building interactions in Webflow today: you can start from a blank canvas, combine a few well-structured ideas, and end up with something that feels like a tiny piece of creative frontend magic.