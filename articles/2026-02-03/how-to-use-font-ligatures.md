---
title: "How to use font ligatures"
source: "https://pangrampangram.com/blogs/journal/how-to-use-font-ligatures"
publishedDate: "2026-02-02"
category: "design"
feedName: "Sidebar"
---

![How to Use Font Ligatures](https://pangrampangram.com/cdn/shop/articles/academy_-_ligs_-_cover2.jpg?v=1769191172&width=2048)

It might be something you use often or something you tend to overlook because it's not natural for you to put them in your design.

Ligatures are subtle typographic details that can quietly elevate a design. They improve spacing, refine rhythm, and add a layer of polish that’s often felt more than noticed. When used intentionally, they help turn solid typography into something more considered and expressive.

In this Academy article, we’ll explore how to use ligatures in Adobe InDesign, Photoshop, and Illustrator, breaking down what they are, why type designers create them, and how different types of ligatures behave across software. The focus is on keeping the process friction-free, so your creative decisions aren’t held back by technical constraints.⁠

## What Are Ligatures?

Basic stuff first. Ligatures are special characters that combine two or more letters into a single glyph. They are commonly used to improve the appearance of letter pairs like fi, fl, ff, or tt, which can look cramped or uneven when typed separately. Many modern typefaces, [including ours](https://pangrampangram.com/), include ligatures as part of their character set. You can usually enable them as [OpenType features.](https://pangrampangram.com/blogs/journal/opentype-features)

![](https://cdn.shopify.com/s/files/1/2642/6578/files/academy_-_ligs_-_1.jpg?v=1769190300)

## Standard vs Discretionary ligatures?

Here’s some terminology to sound knowledgeable when you explain your designs using ligatures.

**Standard ligatures** are practical, readability-focused letter connections that prevent awkward collisions — things like fi, fl, ff, ffi, ffl. They’re part of most modern fonts and are usually on by default.

**Discretionary ligatures** are practical, readability-focused letter connections that prevent awkward collisions — things like fi, fl, ff, ffi, ffl. They’re part of most modern fonts and are usually on by default.

  

**In any case, choose a Typeface that has ligatures.** Most of [ours](https://pangrampangram.com/) do, but it’s not automatically designed in all typefaces.

Depending on the software you use, here are some step by steps to explore and add ligatures to your designs. You can skip to the section describing the steps for your favorite design software.

## Adobe

#### Using Ligatures in Adobe InDesign

1.  Open the Character panel (Window > Type & Tables > Character).
    
2.  Select the text where you want to apply ligatures.
    
3.  Click the OpenType menu (usually represented by an icon with a small “O”).
    
4.  Enable Standard Ligatures or Discretionary Ligatures, depending on the font’s features.
    

Preview and Adjust: InDesign will automatically replace character pairs like fi or fl with their corresponding ligatures. You can fine-tune the appearance using the Glyphs panel (Window > Type & Tables > Glyphs).

  

#### Using Ligatures in Adobe Photoshop

1.  With your text layer selected, open the Character panel (Window > Character).
    
2.  Click the OpenType menu and enable Standard Ligatures.
    
3.  **Check for Ligatures:** Photoshop will automatically apply ligatures to your text. For more control, use the **Glyphs panel (Window > Glyphs)** to manually insert specific ligatures.

  

#### Using Ligatures in Adobe Illustrator

1.  Select your text with the Type Tool.
    
2.  Open the OpenType panel (Window > Type > OpenType).
    
3.  Enable Standard Ligatures or Discretionary Ligatures.
    
4.  **Customize with the Glyphs Panel**: For more precision, open the Glyphs panel (Window > Type > Glyphs) to view and insert specific ligatures.

![](https://cdn.shopify.com/s/files/1/2642/6578/files/academy_-_ligs_-_Photoshop.jpg?v=1769190299)

## Figma

1.  Select the text layer you want to change.  
    
2.  In the right sidebar, click the Typography section to expand it.  
    
3.  Click the little Type settings icon or the three-dot menu to open Type settings.  
    
4.  Switch to the Details or OpenType features area.  
    
5.  Turn on the Ligatures option you want, for example Standard Ligatures or Discretionary Ligatures, or toggle specific OpenType features such as Contextual Alternates.  
    
6.  Preview in the Type settings panel and close it when you are happy with the result.  
    

Figma exposes OpenType features in the Type settings panel so you can enable ligatures per text layer.

![](https://cdn.shopify.com/s/files/1/2642/6578/files/academy_-_ligs_-_Figma.jpg?v=1769190299)

## Microsoft Suite

This one’s a doosies, and most likely why you're reading this article. Microsoft Office support varies by app and version. Word has the best OpenType controls whereas PowerPoint historically lacks full OpenType feature controls and Excel has little to no OpenType controls. Here are some potential work arounds, but we recommend using a different software if you can.

#### Microsoft Word

1.  Open your document and select the text or set the style you want to change.  
    
2.  Press Ctrl+D to open the Font dialog box.  
    
3.  Click the Advanced tab.  
    
4.  In the OpenType features area, set Ligatures to the level you want, for example Standard Only or All. You can also enable Contextual Alternates and Stylistic Sets here.  
    
5.  Click OK to apply.
    

#### Microsoft PowerPoint

1.  PowerPoint does not reliably expose OpenType feature controls like Word does. In many versions there is no Ligatures toggle  
    

Workarounds if you need ligatures in slides:  

2.  Create the text in Word with ligatures enabled and copy it into PowerPoint, then paste as a picture or use Paste Special to preserve rendering.  
    
3.  Convert the text to an image or SVG so the ligatures are preserved when presenting.  
    
4.  Use a design tool that supports OpenType features and import the artwork into PowerPoint.
    

#### Microsoft Excel

1.  Excel does not include the Advanced/OpenType Font dialog that Word has, so you cannot enable ligatures from Excel itself in most versions.
    

Workaround: prepare the typographically correct text in Word or Figma and paste it into Excel as an image if you must preserve ligatures.

## CSS

If you’re not comfortable writing CSS code, this should help you implement ligatures in your website.

#### 1\. Enable common ligatures (recommended)

  

p {

  font-family: "PP Playground", serif;

  font-variant-ligatures: common-ligatures;

}

#### 2\. Enable discretionary ligatures (less common, decorative)

  

p.fancy {

  font-family: "PP Editorial New", serif;

  font-variant-ligatures: discretionary-ligatures;

}

#### 3\. More direct OpenType feature control using font-feature-settings. Make sure you use the correct nomenclature for each setting you want to enable. Here, we used dlig and liga which are common.

  

/\* enable discretionary ligatures and standard ligatures \*/

.code-sample {

  font-family: "PP Neue Montreal Mono", monospace;

  font-variant-ligatures: discretionary-ligatures common-ligatures;

  -webkit-font-feature-settings: "dlig" 1, "liga" 1;

  -moz-font-feature-settings: "dlig" 1, "liga" 1;

  font-feature-settings: "dlig" 1, "liga" 1;

}

#### 4\. Disable ligatures

.no-lig {

  font-variant-ligatures: none;

  font-feature-settings: "liga" 0, "dlig" 0;

}

Use font-variant-ligatures for readable, semantic control, and font-feature-settings when you need to toggle specific OpenType tags like liga(standard ligatures) or dlig (discretionary ligatures).

—

Ligatures can improve the legibility of your text. However, if you use them too much (especially with discretionary ligatures), it can make your text look overly ornate or difficult to read. Use them sparingly, and your designs will shine through the sea of mediocrity.

## Explore ligatures in our collection!

Explore our collection at [**pangrampangram.com**](https://pangrampangram.com/) and check out the glyph section of our products to preview all the ligatures included and to find the perfect typeface for your next project.

![Frama: The new Futura alternative is here.](https://pangrampangram.com/cdn/shop/articles/academy_-_Frama_-_cover.jpg?v=1769606131&width=3000)

### Frama: The new Futura alternative is here.

[Read More](https://pangrampangram.com/blogs/journal/futura-alternative)

![A Practical Guide to Alternate Characters and OpenType Features](https://pangrampangram.com/cdn/shop/articles/Alternates_Cover_Small_f30be13e-5b3f-48f5-88e4-473db9000f81.jpg?v=1769187407&width=3000)

### A Practical Guide to Alternate Characters and OpenType Features

[Read More](https://pangrampangram.com/blogs/journal/opentype-features)