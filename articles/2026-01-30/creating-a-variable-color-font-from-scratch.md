---
title: "Creating a Variable Color Font From Scratch"
source: "https://ishadeed.com/article/creating-a-variable-font/"
publishedDate: "2019-12-24"
category: "css"
feedName: "Ahmad Shadeed"
---

Variable fonts are an evolution of OpenType font specification that allows us to have different font variations (width, weight or style) in a single file. That means, we can load only one font that can have many variations, instead of having multiple fonts loaded for each weight or style.

In this article, I will walk you through into the details of variable fonts and how to get benefit from them in your projects. Also, I will explain about creating a custom variable font.

## How To Add a Variable Font Into a Project

Like a regular font, `@font-face` should be used to define a new variable font.

```
@font-face {
  src:
    url("Estedad-VF.woff2") format("woff2-variations"),
    url("Estedad-VF.woff") format("woff");
  font-family: "Estedad";
  font-style: normal;
}
```

Notice that in the `src` value, there is `format('woff2-variations')` which tells the browser that this is a variable font file that should be downloaded. In case the browser doesn’t support variable fonts or failed to download it for some reason, it will fall back to the `woff` font version define.

## Variation Axis

This is like the core of variable fonts. Each axis does a specific job related to its use case. For example, the weight axis changes the font-weight, and the width axis controls how narrow or wide the font letters are.

To use the variation axis, you should use the `font-variation-settings` CSS property. It can have one or multiple axes based on the registered axis in the font. Note that each axis should be separated by a comma. See the below example:

```
.title {
  font-variation-settings: "wght" 300;
}
```

In the above, `wght` stands for the font-weight and `300` is the value associated with it. Note that the axis name is case sensitive and the value is unitless. Let’s take an example to demonstrate the above concept.

See the Pen [Variable Font - Example 1](https://codepen.io/shadeed/pen/6ddc6353e1fdffbc58b45b217a2a9ee1) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

You can play with the range slider and see the value of `wght` changing dynamically. For that font, the value range is `100-900` and it could be different in other fonts.

### Width Axis

The width axis control how wide or narrow the letters are. It’s similar to stretching a text in a design app. Here is a GIF from Photoshop transform. I create two additional copies to the original, one is stretched and the other is compressed. That’s what the width axis does.

![](https://ishadeed.com/assets/var-fonts/font-stretch.gif)

To control the width access, the value `wdth` should be used in font variation settings.

```
.title {
  font-variation-settings:
    "wght" 100,
    "wdth" 100;
}
```

See the Pen [Variable Font - Example 2](https://codepen.io/shadeed/pen/cec1fa85e842cc48f4102c2f403c1515) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

### Italic and Slant Axises

Italic works in a way that it makes the letters italic or not. There is no in-between or any kind of variation. Whereas Slant can vary based on the value of it. Here is an example that shows the difference between the two:

See the Pen [Variable Font - Example 3](https://codepen.io/shadeed/pen/64233e6925ef88541dfc875020a96ff7) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

## Variable Fonts and Arabic

While researching for the article, I found little but no resources for variable fonts that support Arabic. Luckily, I found a font that I would like to showcase and explain based on it.

See the Pen [Variable Font - Arabic](https://codepen.io/shadeed/pen/0fcdaf0bba9154315b30b8f527f8808e) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

Just like an English font, the weight change for the letter changes based on the value. However, the interesting bit for Arabic is changing the font width. In Arabic, it’s not possible to stretch the letters since for each word, its letters are connected and thus it’s not possible to change their width.

The solution for that lies in using [Arabic Tatweel](https://en.wikipedia.org/wiki/Kashida) technique, which is about elongating characters at specific points. Consider the below example:

See the Pen [Variable Font - Arabic - Tatweel](https://codepen.io/shadeed/pen/9be798412c21adca3841b3c456b927d3) by Ahmad Shadeed ([@shadeed](https://codepen.io/shadeed)) on [CodePen](https://codepen.io/).

## Supporting Old Browsers

![](https://ishadeed.com/assets/var-fonts/vf-support.png)

To ensure that there is a proper fallback for non-supporting browsers, it’s recommended to use CSS `@supports` media query.

```
.elem {
  font-family: "Static Font Name";
  font-weight: 200;
}

@supports (font-variation-settings: normal) {
  /* Add variable fonts declarations there.. */
  .elem {
    font-family: "Variable Font Name";
    font-variation-settings: "wght" 200;
  }
}
```

That way, we can leverage from Progressive Enhancement and use Variable Fonts with a proper fallback.

## Variable Color Fonts

To be honest, this [thing](https://www.typearture.com/howdotheywork/) has caught my attention the first time I saw it. I will try to explain how to make a variable font in the easiest way I can.

### What Are Variable Color Fonts?

A custom-made font with a colored shape or icon. In its simplest examples, it can be a colored icon. However, we can take leverage from variable fonts and do amazing things with this technique. Consider the below example:

![](https://ishadeed.com/assets/var-fonts/board-font.gif)

Cool, right? Let’s learn how to create something similar. But first, the example will be basic and then we will move to a more advanced one.

**Prerequisites**

-   Glyphs app: you can download a trial version for 30 days.
-   An icon that you would like to use in the font.
-   Zero-knowledge in making fonts ;)

### 1) Create a new document in Glyphs

![](https://ishadeed.com/assets/var-fonts/glyphs-1.jpg)

After creating a new document, you will see all things related to a font like letters, numbers, punctuation.. etc. We don’t need all of that. Select “Latin -> Basic” from the left menu, then select all the letters except the “A” and remove them with the keyboard shortcut `CMD + Backspace`.

Now that only one letter left, which is our goal, we will create multiple font weights and name each one of them.

### 2) Defining an Axis

Go to File -> Font Info -> Font, then add a custom parameter called “Axes”. Please consider that it’s case sensitive. Once added, double click its value field and select it from the pre-defined axes. In our case, let’s select “Weight”.

![](https://ishadeed.com/assets/var-fonts/glyphs-axis.png)

### 3) Adding Font Masters

At first, I was confused about the word “Masters” since I have zero knowledge of making fonts. It turned out that it means a version of a font that has a different variation/style. For example: “Light, Regular, Bold”. Each one of those font weights is called a **Master**, so keep that in mind since we will use the word in the next steps.

Let’s add our font masters! Go to File -> File Info -> Masters. By default, there will be only one and it’s called “Regular”.

For each master, the following is important:

1.  Name
2.  Font weight value

I added two more weights now I have the following masters:

![](https://ishadeed.com/assets/var-fonts/masters.gif)

### 4) Adding a Custom Shape

The next step is important. I will add a flagpole icon and our goal is to make a font that raises or lower the flag by changing the weight value.

Double click on the “A” letter in the Font tab. You will notice a page that has a drawing canvas with all the font masters on the right side as layers. It should be something like this:

![](https://ishadeed.com/assets/var-fonts/drawing-space.jpg)

I downloaded an SVG icon and opened it in Illustrator. After selecting all, I copied the icon to the drawing canvas in Glyphs app.

![](https://ishadeed.com/assets/var-fonts/glyphs-icon.png)

As you see, the icon is there and it’s outlined. For now, it’s only available in the Light master. I will copy and paste it in each master in the layers panel.

Useful tip; you can tab the `space` key to see what’s the icon look like when it’s filled.

![](https://ishadeed.com/assets/var-fonts/icon-space-key.gif)

Now, for each master layer, I changed the position of the flag as the following:

![](https://ishadeed.com/assets/var-fonts/3-masters.jpg)

And now it’s the time to export our first variable font! Go to File -> Export -> Variable Fonts. I will show you that in a live example:

![](https://ishadeed.com/assets/var-fonts/flagpole-demo.gif)

Notice how the flag is raised or lowered based on the value of `wght`. Isn’t that amazing? Variable fonts did the job and interpolated the values between the font masters we added.

Moreover, it’s possible to add animation on hover by changing the weight value.

```
.flagpole {
  /* 50 is the minimum value I set in the font masters (For the Light one) */
  font-variation-settings: "wght" 50;
  transition: 0.3s ease-out;
}

.flagpole:hover {
  /* 200 is the maximum value I set in the font masters (For the Bold one) */
  font-variation-settings: "wght" 200;
}
```

![](https://ishadeed.com/assets/var-fonts/flagpole-animation.gif)

Check out the [demo](https://codepen.io/shadeed/pen/ce130bf126875020721fe1d4d3c201e9?editors=0100) on Codepen. At the time of writing this article, Safari has the best support. Other browsers don’t support that and Chrome has no [intention](https://bugs.chromium.org/p/chromium/issues/detail?id=306078) of supporting it.

Now that you learned the basics of creating a variable font, let’s take a deeper example that have a colored shape. For this time, we’ll recreate the colored demo that you saw at the beginning of the article.

![](https://ishadeed.com/assets/var-fonts/board-icon.png)

I created a new font and did the following:

-   Cleaned all the letters except “A”
-   Added four font masters (Light, Regular, Medium, Bold)
-   Went to the drawing canvas

The idea of having a colored shape lies in adding sub color layers to each font master. To do that, we need to define a color palette with the shape color. The shape I picked has two colors.

Go to File -> File Info -> Masters and in the custom parameter, add “Color Palettes” property. Then, double click its value property to start adding colors.

![](https://ishadeed.com/assets/var-fonts/board-colors.png)

Once done, copy the custom parameter and make sure to add it to every font master. Now, Let’s explore how to add sub color layers for each font master.

Go to the letter drawing canvas and on the right side, there is a copy button in the layers panel. We’ll need that to create the sub color layers. While the light master is selected, click on Copy, then rename the layer to “Color 0”. The name is important, you will notice a color tag. Copy again, and rename to “Color 1”.

You have your first color layers ready! Just one thing left, redo copying and renaming for all font masters. Once done, it should look like this:

![](https://ishadeed.com/assets/var-fonts/board-layers.png)

Next, we’ll copy the shape into each font master, but there is an interesting bit you should know before that. Since we copied each font master and renamed them to Color 0 and Color 1, those copies will be used to have the shapes. In Illustrator, I selected the yellow shapes and copied them.

![](https://ishadeed.com/assets/var-fonts/board-top-bottom.png)

Go to the drawing canvas, and make sure Color 0 of the first font master is selected, then paste the paths. Then, select Color 1 and copy the grey path into the canvas. Once done, the result should be like the original colored board in Illustrator. Redo this process for every font master, but for this time, copy them from the Light master so they can be in the same position.

### 1) Adding a New Axis

Go to File -> Font Info -> Font and in the Custom Parameter panel, double click on the value of Axes. Add a new one and give it a custom name “Height”. This will be used to control the height of the board in the next steps.

### 2) Editing The Shape in the Drawing Canvas

The light master represents the initial state of the shape. I will start editing from the Regular master.

To pair the font width and height values with the shape in the drawing canvas, I will need to do the following:

-   Restrict all font width and height values from `0` towards `200`.
-   Arrange the shapes in the font masters as per the below GIF.

![](https://ishadeed.com/assets/var-fonts/board-layers-2.gif)

I made an illustration that shows how each font master shape looks, in addition to the values of width and height for each. Just a reminder, those values are in File -> Font Info -> Masters.

![](https://ishadeed.com/assets/var-fonts/board-masters.png)

Now that I’m done with that final step, I exported the font and it’s ready!

[Demo](https://codepen.io/shadeed/pen/71060d41b1512673028d406ec7599d0f?editors=0100)

## Resources

-   [Variable Color Fonts](https://www.typearture.com/howdotheywork/) by Typearture
-   [Creating a Microsoft Color Font (CPAL/COLR)](https://glyphsapp.com/tutorials/creating-a-microsoft-color-font) By Rainer Erich Scheichelbauer
-   [Creating a Variable Font](https://glyphsapp.com/tutorials/creating-a-variable-font) By Rainer Erich Scheichelbauer

## The End

And that’s a wrap. Do you have a comment or a suggestion? Please feel free to ping me on [@shadeed9](https://twitter.com/shadeed9).