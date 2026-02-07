---
title: "Word and PowerPoint Alt Text Roundup"
source: "https://webaim.org/blog/word-and-powerpoint-alt-text-roundup/"
publishedDate: "2025-11-01"
category: "accessibility"
feedName: "WebAIM Blog"
author: "Jon Whiting"
---

## Introduction

In Microsoft Word and PowerPoint, there are many types of non-text content that can be given alternative text. We tested the alternative text of everything that we could think of in Word and PowerPoint and then converted these files to PDFs using Adobe’s Acrobat PDFMaker (the Acrobat Tab on Windows), Adobe’s Create PDF cloud service (the Acrobat tab on Mac), and Microsoft’s built-in PDF exporting feature (save as PDF). With over 100 test cases tested first in Word and PowerPoint and then in three different PDFs (over 400 checks), here are the main takeaways.

1.  **Alt text within Word documents and PowerPoint presentations works very well.** The process for adding alt text is consistent across every image type, and it is usually easy for screen readers to discover the alt text. Images in Word no longer require a layout of “In Line with Text” to avoid accessibility issues.
2.  **Alt text in Microsoft’s PDF exporting feature is very good.** If there is one criticism, it is that the specific image type can be added to the alternative text, making it repetitive (e.g., “Pie chart of sales by quarter (Chart: Pie)”).
3.  **Alt text support in Adobe’s PDF tools is very disappointing.** PDFs created with the Acrobat tab have problems with basically every type of image except Pictures.

Details are below, including gotchas for almost every type of image.

### Notes

-   These tests were done in the desktop versions of Word and PowerPoint 365. Not all of these techniques apply to older or online versions of Office.
-   “Alt text” is the name for alternative text in Word and PowerPoint, so it is the term typically used in this document.
-   “Image” is used as a generic term for objects that can be given alt text.
-   Word and PowerPoint files were created using the current versions of Microsoft 365 for Windows (2509) and PDFMaker (25.1.20). The PDFs created with Create PDF cloud service were created on October 29, 2025.
-   The options to insert equations and symbols were not tested because they create text-based content.
-   Forms were not tested.

## Alt text in Word and PowerPoint

Adding alt text is consistent across all image types. Selecting the object will display a temporary tab that includes the word “Format” (e.g., “Shape Format”). There is an option in this tab.

![Screenshot of the Shape Format tab with the Alt Text option highlighted](https://webaim.org/blog/media/alttext/alt-button.png)

You can also on the image and choose .

There will be a field to enter alt text and a checkbox for . There may also be options to add or accept AI-generated alt text (depending on your settings).

![Screenshot of the Alt Text pane](https://webaim.org/blog/media/alttext/alt-pane.png)

Tip

In Windows, you can keep the Alt Text pane open while using other tools like the Accessibility Assistant. To do this, click the icon > .

![Screenshot with the pane options icon selected (in the upper-right of the pane), a menu expanded, and the Move out of Tab option highlighted.](https://webaim.org/blog/media/alttext/move-tab.png)

### Accessibility Assistant

Adding and correcting alt text is usually most efficient when you combine the Accessibility Assistant with a manual review.

The Accessibility Assistant will automatically identify images with missing or suspicious alt text. There are several ways to start running the Accessibility Assistant, including on the tab. The Accessibility Assistant pane has grouped all of its alt text issues into one category—. Choosing this category will step you through adding alt text to each image with missing or AI-generated alt text.

Word has an especially useful and recommended feature that adds inline prompts for accessibility fixes. To enable this, go to tab > > (Windows) or > > (Mac) and then check . A small icon will appear to prompt you to make inline accessibility fixes. Clicking this icon (this is mouse only) will open a dialog where you can add or change alt text, approve AI-generated alt text, or mark as decorative.

![A photo of the WebAIM logo with the inline accessibility icon to its left. Clicking  the icon opens a window where alternative text has been entered.](https://webaim.org/blog/media/alttext/inline.png)

Important

Remember to save changes to the alt text by choosing the (Windows) or (Mac) after entering alt text. Unlike the Alt Text pane, changes are not saved automatically.

## Microsoft’s Built-in PDF Conversion

For many years, the Acrobat tab consistently created PDFs with a clean structure that was easier to review in Acrobat. In late 2024, [Microsoft announced significant improvement to the accessibility of their exported PDFs](https://learn.microsoft.com/en-us/office/pdf/office2024pdfaccessibility) that matched Adobe in some places and surpassed it in others. While there may still be some areas where PDFs created by Adobe’s PDFMaker and cloud services are superior, Microsoft is the clear winner when it comes to alt text. [Creating PDFs using or](https://webaim.org/techniques/acrobat/converting#save) maintains alternative text for almost every image type, with emoji being the only true failure.

The main issue isn’t missing information in the alt text, but extraneous information. Except for pictures, the image type is typically added to the alt text that was defined in the document. This can sometimes be helpful, but it is often repetitive or even confusing. For example, there are about 150 types of shapes, each with a unique name, so a two-sided arrow with alt text of “Two-way communication” would have alternative text of “Two-way communication (Arrow: Left-Right)” in the PDF.

## Adobe’s Acrobat Tab

[PDFs created with the tab](https://webaim.org/techniques/acrobat/converting#pdfmaker) will vary based on your operating system. On Windows, it uses Acrobat PDFMaker, which is installed when you install Acrobat. On Mac, it uses Adobe’s “Create PDF” cloud service. The PDFs created by these two tools are different, but they have one thing in common-they both often lose or corrupt alt text as part of the conversion process.

### If in doubt, convert it to a Picture.

A “Picture” is a specific type of image in Word and PowerPoint. Photos, as well as most images pasted from non-Office sources, are Pictures. You will know if something is a Picture if selecting it causes the tab to appear in the ribbon.

A Picture with its alternative text is consistently converted to PDFs created with both PDFMaker and the Adobe cloud service. One way to ensure that all your images are correctly tagged as a PDF is to convert them to Pictures first. To do this, first copy or cut the image. On Windows, paste it back into the page using > > .

![screenshot](https://webaim.org/blog/media/alttext/paste-options.png)

On Mac, (or select the menu) > choose > and then select one of the 4 "Picture" file types.

While pasting as a Picture a good option for many types of images, some things cannot be pasted as pictures. This includes audio and video objects that would lose their main purpose.

If an image supports being pasted as a Picture, the new picture can no longer be edited, so do this with caution. It is probably a good idea to create a duplicate version of a file and do this as a final step before creating a PDF.

Important

An image’s alt text will be lost when pasting it as a Picture! To avoid losing the alt text, copy—don’t cut—the image, paste as a picture, copy/paste the alt text, and then delete the original picture.

## Gotchas for Different Image Types

The dozens of alt text bugs are too numerous to mention (especially creating a PDF using the Acrobat tab), but here are some notable quirks and pitfalls for different image types.

-   **Shapes:**
    -   Word PDFMaker does not maintain alt text for shapes.
    -   In PDFs created by Microsoft, shape types will always be appended to the alt text.
-   **Icons** maintain their alt text when converted to PDF. Just be sure to review and, if needed, change the preset alt text.
-   **Video and Audio:** Even though embedded multimedia may not be included in PDF, the alt text for the image that presents it is converted.
-   **3D Models** are poorly supported in Adobe PDFs. Converting to a picture is recommended when using the Acrobat tab.
-   **Charts**
    -   PDFMaker has no alt text support for charts in Word or PowerPoint.
    -   The text information contained in a chart is not typically added to the alt text, so be sure to include important text information in the alt text or in a nearby table or text description.
-   **SmartArt**
    -   Do not bother adding alternative text to the different components within a SmartArt image. It is not easy to discover in Word and PowerPoint, and it is never included when converted to PDF.
    -   If SmartArt does not have alt text, the text within the SmartArt will be defined as the alt text in the resulting PDF.
-   **Groups:**
    -   Microsoft PDFs will include the group alt text, plus the alt text or text of the items within the group.
    -   The inconsistencies of Adobe PDFs are too numerous to list. If you’re using the Acrobat tab, converting a group to a picture is recommended.
-   **Tables:** Do not add alt text to tables. In PDFs created from PowerPoint, it can cause the table’s contents to be ignored completely.
-   **Draw tab**
    -   Your drawing will be saved as a single image until you change a page or slide, change a drawing tool, or stop drawing.
    -   In PowerPoint, PDFMaker does not convert these drawings at all, meaning they do not even appear in the PDF.
    -   To make it easier to add alternative text to drawings it may be easier to group them or convert them to a Picture using Paste Options.
-   **Emoji**: Only the Adobe cloud service provides alt text for emoji, though it does this by converting them into black and white emoji.
-   **Placeholders, text boxes and WordArt in PowerPoint**
    -   Be very careful adding outlines or fills to any of these container types. This can impact how they are read (or in the case of PDFMaker, not read).
    -   Any content that is marked as decorative should be excluded from the tag structure when converting to PDF. This can be a useful technique when used intentionally. Unfortunately, the Adobe cloud service ignores “Mark as decorative” unless the container has an outline or fill.
-   **Text Boxes and WordArt in Word:** PDFMaker will not convert alt text or the contents of Text Boxes or WordArt in Word. Adding outlines and fills to Word paragraphs does not cause any problems, so use this technique in Word instead.
-   **Text effects in Word:** Applying text effects like shadows and reflections will cause the text to be ignored in PDFs created with the Acrobat tab. It can also cause issues in Microsoft PDFs (like a screen reader reading “dot” for each period). The best way to address this issue to is to cut the problematic text, paste it as a Picture and then immediately paste the same text into the Alt Text field (Windows-only).

## In a Nutshell

When it comes to alt text in Word and PowerPoint files. Keep the following principles in mind:

1.  Use the **Accessibility Assistant** and **Alt Text pane** to add alternative text to your images.
2.  Choose **Microsoft’s built-in PDF conversion** for the best alt text results, especially if you have complex images.
3.  If you are using the Adobe’s **Acrobat tab** to create PDFs, either convert your complex images to Pictures or be ready to do significant [repair in Acrobat](https://webaim.org/techniques/acrobat/reviewing).