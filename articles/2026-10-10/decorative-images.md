---
title: "Decorative Images…"
source: "https://adrianroselli.com/2026/10/decorative-images.html"
publishedDate: "2026-10-09"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

…aren’t a thing.

Three hand-drawn lines curling together like an S or three skinny snakes trying to spoon.

At least not as far as people are concerned. Yes, this is an absolutist take, but sometimes it’s necessary to take the absolutist position to force someone to justify their own reasoning. Make them argue for something they’ve not considered. Revisit their own decision-making process.

Broadly, I’m talking about images in narrative content that are _not_ also iconography nor used as part of interactive controls.

Adding an image to a design, email, document, page, app, etc. is done for a reason. Maybe the author wants to convey a mood or connect it to a theme. In which case, the person who can’t see the image would likely benefit from knowing that mood, having that connection made.

Sometimes the reason is far more pedestrian. Maybe the author wants to fill white space. In which case, that’s a design gap. It should be addressed in layout, otherwise the author is _unintentionally_ sending a message to those who can see it.

I’m not discussing every possible scenario. That’s been done. Instead, I’m providing _you_ some over-simplified questions to ask when evaluating an image:

1.  If the decorative image was removed completely, would any readers care?
    -   **No?** Then remove the image.
    -   **Yes?** Then it’s not decorative.
2.  If the decorative image was replaced with a picture of poo, would you as the author care?
    -   **No?** Then remove the image.
    -   **Yes?** Then it’s not decorative.

## Decision Tree

To hopefully make this a bit easier on all of us, I’ve adapted the [WAI alt text decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) to include more steps.

## If yes, the image contains text…

-   … and the text has a specific function, for example is an icon. Use the `alt` attribute to communicate the function of the image. See [Functional Images](https://www.w3.org/WAI/tutorials/images/functional/).
-   … and the text in the image is not present otherwise. Use the `alt` attribute to include the text of the image. See [Images of Text](https://www.w3.org/WAI/tutorials/images/textual/#image-of-styled-text-with-decorative-effect).

## If no, the image contains no text…

## If yes, the image is contained in a control…

-   Use the `alt` attribute to communicate the destination of the link or action taken. See [Functional Images](https://www.w3.org/WAI/tutorials/images/functional/).

## If no, the image is not contained in a control…

## If yes, the image contributes meaning…

-   … and it’s a simple graphic or photograph. Use a brief description of the image in a way that conveys that meaning in the `alt` attribute. See [Informative Images](https://www.w3.org/WAI/tutorials/images/informative/).
-   … and it’s a graph or complex piece of information. Include the information contained in the image elsewhere on the page. See [Complex Images](https://www.w3.org/WAI/tutorials/images/complex/).
-   … and it shows content that is redundant to _real_ text nearby. Use an empty `alt` attribute. See (redundant) [Functional Images](https://www.w3.org/WAI/tutorials/images/functional/#logo-image-within-link-text).

## If no, the image contributes no meaning…

## If no, the image is not purely decorative or is intended for the user…

-   Then probably [start over](#hasTextNo) to better identify how to give it a text alternative.

## If yes, the image is purely decorative or not intended for the user…

## If yes, users would care if the image went away…

-   Users will think it’s not decorative. I suggest you [start over](#hasTextNo).

## If no, users wouldn’t care if the image went away…

## If no, the author wouldn’t care if the image was replaced by poo…

-   You _should_ care. Poo is not decorative. I suggest you [start over](#hasTextNo).

## If yes, the author would care if the image was replaced by poo…

-   We agree that poo is not decorative. Remove the picture and save yourself the hassle.

-   [Your Image Is Probably Not Decorative](https://www.smashingmagazine.com/2021/06/img-alt-attribute-alternate-description-decorative/), by Eric Bailey, 17 June 2021
-   [An alt Decision Tree Using Only :has()](https://adrianroselli.com/2023/08/an-alt-decision-tree-using-only-has.html), by me, 13 August 2023
-   [Long Alt](https://adrianroselli.com/2024/04/long-alt.html), by me, 20 April 2024
-   [My Approach to Alt Text](https://adrianroselli.com/2024/05/my-approach-to-alt-text.html), by me, 28 May 2024
-   [It’s time to retire the concept of decorative images.](https://nicolas-steenhout.com/retire-decorative-images/) by Nicolas Steenhout, 28 September 2026
-   [WCAG 3 issue #878 Definition of decorative images update](https://github.com/w3c/wcag3/issues/878), 29 September 2026
-   [On the Decision Underlying Decorative Images](https://meiert.com/blog/decorative-images/), by Jens Oliver Meiert, 8 October 2026