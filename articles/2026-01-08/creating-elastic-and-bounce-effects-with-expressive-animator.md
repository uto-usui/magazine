---
title: "Creating Elastic And Bounce Effects With Expressive Animator"
source: "https://smashingmagazine.com/2025/09/creating-elastic-bounce-effects-expressive-animator/"
publishedDate: "2025-09-15"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Marius Sarca)"
---

-   7 min read
-   [SVG](https://smashingmagazine.com/category/svg), [Animation](https://smashingmagazine.com/category/animation), [Design](https://smashingmagazine.com/category/design), [Tools](https://smashingmagazine.com/category/tools)

Elastic and bounce effects have long been among the most desirable but time-consuming techniques in motion design. Expressive Animator streamlines the process, making it possible to produce lively animations in seconds, bypassing the tedious work of manual keyframe editing.

In the world of modern web design, SVG images are used everywhere, from illustrations to icons to background effects, and are universally prized for their crispness and lightweight size. While static SVG images play an important role in web design, most of the time their true potential is unlocked only when they are combined with motion.

Few things add more life and personality to a website than a well-executed SVG animation. But not all animations have the same impact in terms of digital experience. For example, **elastic and bounce effects** have a unique appeal in motion design because they bring a **sense of realism into movement**, making animations more engaging and memorable.

[![Grumpy Egg](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/grumpy-egg-800.gif)](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/grumpy-egg.gif)

([Large preview](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/grumpy-egg.gif))

However, anyone who has dived into animating SVGs knows [the technical hurdles involved](https://www.smashingmagazine.com/2023/02/putting-gears-motion-animating-cars-with-html-svg/). Creating a convincing elastic or bounce effect traditionally requires handling complex CSS keyframes or wrestling with JavaScript animation libraries. Even when using an SVG animation editor, it will most likely require you to manually add the keyframes and adjust the easing functions between them, which can become a time-consuming process of trial and error, no matter the level of experience you have.

This is where Expressive Animator shines. It allows creators to apply elastic and bounce effects **in seconds**, bypassing the tedious work of manual keyframe editing. And the result is always exceptional: animations that feel _alive_, produced with a fraction of the effort.

## Using Expressive Animator To Create An Elastic Effect

Creating an elastic effect in Expressive Animator is remarkably simple, fast, and intuitive, since the effect is built right into the software as an easing function. This means you only need two keyframes (start and end) to make the effect, and the software will automatically handle the springy motion in between. Even better, the elastic easing can be applied to **any animatable property** (e.g., position, scale, rotation, opacity, morph, etc.), giving you a consistent way to add it to your animations.

Before we dive into the tutorial, take a look at the video below to see what you will learn to create and the entire process from start to finish.

First things first, let’s set the scene. For this, we’ll [create a new project](https://expressive.app/expressive-animator/docs/v1/projects/create/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect) by pressing Ctrl/Cmd + P and configuring it in the “Create New Project” dialog that pops up. For frame size, we’ll choose 1080×1080, for a duration of 00:01:30, and we’ll let the frame rate remain unchanged at 60 frames per second (fps).

[![“Create New Project” dialog](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/01-create-dialog.png)](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/01-create-dialog.png)

([Large preview](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/01-create-dialog.png))

Once you hit the “Create project” button, you can use the [Pen](https://expressive.app/expressive-animator/docs/v1/tools/pen-tool/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect) and [Ellipse](https://expressive.app/expressive-animator/docs/v1/tools/ellipse-tool/) tools to create the artwork that will be animated, or you can simply copy and paste the artwork below.

See the Pen \[Effects With Expressive Animator - Artwork for Animation\](https://codepen.io/smashingmag/pen/pvjmwxv).

See the Pen [Effects With Expressive Animator - Artwork for Animation](https://codepen.io/smashingmag/pen/pvjmwxv).

Now that everything has been set up, let’s create the animation. Make sure that snapping and auto-record are enabled, then move the playhead to 01:00f. By [enabling snapping](https://expressive.app/expressive-animator/docs/v1/canvas/snapping/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect), you will be able to perfectly align nodes and graphic objects on the canvas. On the other hand, as the name suggests, auto-record tracks every change you make to the artwork and adds the appropriate keyframes on the timeline.

[![Screenshot with snapping and auto-record are enabled and the playhead moved to 01:00f](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/02-prepare-scene.png)](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/02-prepare-scene.png)

([Large preview](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/02-prepare-scene.png))

Press the A key on your keyboard to switch to the [Node tool](https://expressive.app/expressive-animator/docs/v1/tools/node-tool/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect), then select the String object and move its handle to the center-right point of the artboard. Don’t worry about precision, as the snapping will do all the heavy lifting for you. This will bend the shape and add keyframes for the Morph animator.

[![Screenshot with the String object and its handle moved to the center-right point of the artboard](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/03-string.png)](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/03-string.png)

([Large preview](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/03-string.png))

Next, press the V key on your keyboard to switch to the [Selection tool](https://expressive.app/expressive-animator/docs/v1/tools/selection-tool/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect). With this tool enabled, select the Ball, move it to the right, and place it in the middle of the string. Once again, snapping will do all the hard work, allowing you to position the ball exactly where you want to, while auto-recording automatically adds the appropriate keyframes.

[![Screenshot with the Ball selected and moved to the middle of the string](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/04-ball.png)](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/04-ball.png)

([Large preview](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/04-ball.png))

You can now replay the animation and disable auto-recording by clicking on the Auto-Record button again.

As you can see when replaying, the direction in which the String and Ball objects are moving is wrong. Fortunately, we can fix this extremely easily just by reversing the keyframes. To do this, select the keyframes in the timeline and right-click to open the context menu and choose Reverse. This will reverse the keyframes, and if you replay the animation, you will see that the direction is now correct.

[![Screenshot with the context menu where you can choose Reverse](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/05-reverse.png)](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/05-reverse.png)

([Large preview](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/05-reverse.png))

With this out of the way, we can finally add the elastic effect. Select all the keyframes in the timeline and click on the Custom easing button to open a dialog with easing options. From the dialog, choose Elastic and set the oscillations to 4 and the stiffness to 2.5.

That’s it! Click anywhere outside the easing dialog to close it and replay the animation to see the result.

[![Selected custom easing button that opened a dialog with easing options](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/06-effect.png)](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/06-effect.png)

([Large preview](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/06-effect.png))

[The animation can be exported as well.](https://expressive.app/expressive-animator/docs/v1/export/svg/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect) Press Cmd/Ctrl + E on your keyboard to open the export dialog and choose from various export options, ranging from vectorized formats, such as [SVG](https://expressive.app/expressive-animator/docs/v1/export/svg/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect) and [Lottie](https://expressive.app/expressive-animator/docs/v1/export/lottie/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect), to rasterized formats, such as [GIF](https://expressive.app/expressive-animator/docs/v1/export/image/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect) and [video](https://expressive.app/expressive-animator/docs/v1/export/video/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect).

For this specific animation, we’re going to choose the SVG export format. Expressive Animator allows you to choose between three different types of SVG, depending on the technology used for animation: [SMIL](https://expressive.app/expressive-animator/docs/v1/export/svg/smil/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect), [CSS](https://expressive.app/expressive-animator/docs/v1/export/svg/css/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect), or [JavaScript](https://expressive.app/expressive-animator/docs/v1/export/svg/js/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect).

[![Export settings in the Expressive Animator](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/07-export.png)](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/07-export.png)

([Large preview](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/07-export.png))

Each of these technologies has different strengths and weaknesses, but for this tutorial, we are going to choose SMIL. This is because SMIL-based animations are widely supported, even on Safari browsers, and can be used as background images or embedded in HTML pages using the `<img>` tag. In fact, [Andy Clarke recently wrote all about SMIL animations here at Smashing Magazine](https://www.smashingmagazine.com/2025/05/smashing-animations-part-3-smil-not-dead/) if you want a full explanation of how it works.

You can visualize the exported SVG in the following CodePen demo:

See the Pen \[Expressive Animator - Exported SVG\](https://codepen.io/smashingmag/pen/GgpaEyG).

See the Pen [Expressive Animator - Exported SVG](https://codepen.io/smashingmag/pen/GgpaEyG).

Adding a bounce effect to an animation is very similar to the process we just covered for creating an elastic effect, since both are built into Expressive Animator as easing functions. Just like elastic, bounce easing can be applied to any animatable property, giving you quick ways to create realistic motion.

Beyond these two effects, Expressive Animator also offers other easing options that can shape the personality of your animation, like Back, Steps, Sinc, just to name a few.

[![Easing functions in the Expressive Animator](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/08-easing-functions.png)](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/08-easing-functions.png)

([Large preview](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/08-easing-functions.png))

## Conclusion

Elastic and bounce effects have long been among the most desirable but time-consuming techniques in motion design. By integrating them directly into its easing functions, Expressive Animator removes the complexity of manual keyframe manipulation and transforms what used to be a technical challenge into a creative opportunity.

The best part is that getting started with Expressive Animator comes with zero risk. The software offers a full 7–day **free trial without requiring an account**, so you can download it instantly and begin experimenting with your own designs right away. After the trial ends, you can buy Expressive Animator with a one-time payment, **no subscription required**. This will give you a perpetual license covering both Windows and macOS.

To help you get started even faster, I’ve prepared some extra resources for you. You’ll find the source files for the animations created in this tutorial, along with a curated list of useful links that will guide you further in exploring Expressive Animator and SVG animation. These materials are meant to give you a solid starting point so you can learn, experiment, and build on your own with confidence.

-   Grumpy Egg: The [`.eaf`](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/grumpy-egg.eaf) source file for the sample animation presented at the beginning of this article.
-   Elastic Effect: Another [`.eaf`](https://files.smashing.media/articles/creating-elastic-bounce-effects-expressive-animator/elastic-effect.eaf) file, this time for the animation we made in this tutorial.
-   [Get started with Expressive Animator](https://expressive.app/expressive-animator/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect)
-   Expressive Animator [Documentation](https://expressive.app/expressive-animator/docs/v1/?utm_source=smashingmagazine&utm_medium=blog&utm_campaign=elastic_effect)

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (gg, yk)