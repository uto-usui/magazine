---
title: "25 Accessibility Tips to Celebrate 25 Years"
source: "https://webaim.org/blog/25-tips/"
publishedDate: "2024-11-01"
category: "accessibility"
feedName: "WebAIM Blog"
author: "Jared Smith"
---

As WebAIM celebrates our 25 year anniversary this month, we’ve shared 25 accessibility tips on our [LinkedIn](https://www.linkedin.com/company/webaim/) and [Twitter/X](https://x.com/webaim) social media channels. All 25 quick tips are compiled below.

## Tip #1: When to Use Links and Buttons

[Links](https://webaim.org/techniques/hypertext/) are about navigation. Buttons are about function. To eliminate confusion for screen reader users, use a `<button>` element for in-page functions, not a link.

## Tip #2: Give Excel Tabs Descriptive Names

When you create a new [Excel](https://webaim.org/techniques/excel/) file, there will be one blank Sheet open. Each sheet has a Tab located at the bottom of the user interface.To replace the Tab’s default label (e.g., “Sheet1”) with a name for the Sheet:

1.  Right-click the Sheet’s tab.
2.  Select “Rename” from the menu.
3.  Type in text that provides a high-level description of the Sheet’s content.

This name will be read to a screen reading software user when they open the Sheet. Descriptive sheet names help all users to navigate workbooks that have multiple sheets.

## Tip #3: Test Keyboard Accessibility 

When designing a website, be sure to test interactive elements using just the [keyboard](https://webaim.org/techniques/keyboard/). Many users are not able to use a mouse, so all their interaction is done through a keyboard, or a device that simulates a keyboard.

Ensure that your website is accessible to all users by eliminating interactive elements that require a mouse.

## Tip #4: Check Contrast 

[Color blindness](https://webaim.org/articles/visual/colorblind) is very common. Be sure that you have a good contrast between your text and its background. If colors are too similar, some individuals will not be able to see the difference.

Use [WebAIM’s contrast checker](https://webaim.org/resources/contrastchecker/) to ensure appropriate contrast[.](https://webaim.org/resources/contrastchecker/)

## Tip #5: Use Correct Headings

Properly tagged [headings](https://webaim.org/techniques/headings/) allow screen reader users to “skim” a page by reading those headings. Use:

-   Heading level 1 for main headings
-   Heading level 2 for subsections
-   Heading level 3 for subsections under H2
-   Heading level 4 for subsections under H3
-   Etc.

Distinct and clear headings help ALL users to find the information they need more easily.

## Tip #6: Use Active Voice

Passive voice can be difficult to understand because it weakens the action of a sentence. An example of passive voice is, “The car was driven by Jim.” Active voice is much clearer and will be easily understood by a broader audience. For example, “Jim drove the car.”

If more than 20% of your document uses passive voice, consider changing some of the passive sentences to [active voice](https://webaim.org/techniques/writing/#active). 

## Tip #7: Use descriptive text when creating a hyperlink

Links with descriptive text are not only easier for screen reader users to find, but also clearer for all users. 

For example: Your document contains a link to an external webpage with more information. Non-descriptive text is written as “Learn More” or “Click Here”. Descriptive text indicates information that the user will find by clicking on the link. Such as, “Learn More About Best Accessibility Practices” or “Register for the WebAIM Conference”. 

## Tip #8: Limit ARIA use

ARIA should only be used where native HTML falls short. If it can be built without ARIA, it should be. [Using ARIA as sparingly](https://webaim.org/techniques/aria/#rules) as possible is the best way to avoid accidentally creating inaccessible interactions.

## Tip #9: Choose Accessible Fonts

Simple text is much easier to recognize and read than complex [fonts](https://webaim.org/techniques/fonts/). For example, cursive or script fonts are more difficult to recognize. Use complex fonts sparingly and do not use them for long sections of text. 

## Tip #10: How to Organize Regions to Optimize for Accessibility

Most web pages need four [regions](https://webaim.org/techniques/semanticstructure/#regions) for an accessible structure.

1.  **Header region:** Everything that is shown to the user before the main content. For example, logins, settings, and top navigation.
2.  **Nav region:** Use a nav region if the header has a set of links or a menu for navigating to other places on the site.
3.  **Main region:** The page’s primary content. 
4.  **Footer region:** The content that comes after the main region at the bottom of the page. For example, links to resources, logos, and contact information.  

## Tip #11: Linking Images

When creating an [image link](https://webaim.org/blog/alt-text-and-linked-images/), the image alternative text must present the content of the image AND describe the destination of the link. Make sure that the image’s alt text would be sufficient if it were the text in a regular link.

## Tip #12: Accessible Website Design for Different Viewport Sizes 

When designing, keep in mind how page information [reflows](https://webaim.org/techniques/reflow/) in different sized viewports, such as zoomed browsers or mobile devices. You can test your content at different viewport sizes by zooming the page or using the Device Toolbar in Developer Tools. Zoom or use the Device Toolbar allows you to simulate your website on different mobile devices.

## Tip #13: 7 Ways to Support Accessibility on an Organizational Level

Web developers and content creators can learn and use accessibility techniques, but that will not sustain accessibility over the long haul because of [system-level issues](https://webaim.org/articles/strategicframework/). Organizations need to recognize that accessibility is a requirement, and then actively support it. Supporting accessibility includes:

1.  Integrating it into the development and QA process.
2.  Creating a culture of communication, coordination, and motivation that supports accessibility.
3.  Hiring new employees who have relevant accessibility skills.
4.  Building a procurement process that accounts for accessibility in code libraries, widgets, tools, & platforms.
5.  Providing staff with the training, time, and support to succeed.
6.  Testing accessibility outcomes and using the data to improve internal processes.
7.  Establishing policy and governance that establishes responsibility for accessibility widely.

## Tip #14: Wrapping Text with Images

In Word documents, only images with the wrap text style “in line with text” are recognized by screen readers. This is the default wrap text style in Word.

## Tip #15: Optimize a Sheet in Excel for Accessibility

Adding a text description directly into a sheet can benefit users in the same way that a Heading 2 functions in a Word document. Although this text description is not a requirement, it will provide a visual user with a high-level description of the sheet, the same way that the sheet’s name functions for screen reading software users. This text should be clear, succinct, and unique in the workbook.

## Tip #16: Optimize Document Link Text

Although Office will automatically create a [hyperlink](https://webaim.org/techniques/word/#links) from the text that resembles the address of a web resource, this link text can usually be optimized by linking more descriptive text. Effective link text is descriptive, concise, unique in the document (when possible), and visually distinct from text that is not linked.

## Tip #17: Why it is Important to Make Responsive Layouts Accessible

[Responsive layouts](https://webaim.org/techniques/reflow/) aren’t just for touch interfaces on small devices. They are also for users who zoom content on full-size displays, and those who connect keyboards to small devices.

Ensure that pages remain readable and usable when the viewport is narrowed down to 320 pixels wide.

## Tip #18: Organizational Leadership’s Role in Accessibility Efforts

Having [organizational leadership](https://webaim.org/articles/strategicframework/) actively advance accessibility is critical to moving from reacting to accessibility bugs after they’re live to addressing accessibility from the start. The leadership team needs an appropriate understanding of how accessibility fits into overall technology strategy. Doing so can advance things like policy, planning, hiring, and resource acquisition to help make accessibility an organizational norm.

## Tip #19: How to Use DevTools to Find Page Elements

The Elements panel in [DevTools](https://webaim.org/articles/evaluationguide/#othertools) provides an easy way to find page elements of a particular type. 

Here are 3 ways to find page elements:

1.  Perform a search for the element or attribute name. For example:
    -   `<h2>`
    -   `aria-label`
2.  Find elements based on their CSS selectors. For example:
    -   `[aria-label]`
3.  Use the Console panel to quickly list elements. For example:
    -   Enter `document.querySelectorAll("button");` into the Console
    -   This will return a list of all buttons on the page.
    -   Then, click on an element in the list to view it in the Elements panel.

## Tip #20: The Difference Between aria-required and required 

The semantics for `aria-required="true"` and the HTML `required` attribute are the same—screen readers present them identically. However, `aria-required` only indicates that [a field is required](https://webaim.org/techniques/forms/controls#requiredfields), whereas the `required` attribute provides a functionality change. The `required` attribute will visually inform the user that a field is required if it is bypassed without entered content and will mark the field as invalid.

## Tip #21: Avoid Defining Element Height

Be very cautious when setting a defined height for web page elements that contain text. Text can always be customized by the end user to change the typeface, make the text larger, or to increase the letter, word, line, or paragraph spacing. This may cause text to cover or move under other page elements because it no longer fits within the defined element’s height.

Either avoid defining element height or use relative height units to allow the element to scale with its text contents.

## Tip #22: Provide Descriptive Page Titles

Providing a descriptive, succinct [page title](https://webaim.org/techniques/pagetitle/) is important for accessibility.

The page title text usually appears at the very top of the browser window or in the web page’s browser tab. WCAG 2 requires that page titles describe the page content or purpose. Because the page title is read on each page, it should be short – generally no more than a few words. The number of visible characters in the browser tab is limited, so the information that distinguishes that page content should be presented early in the title.

## Tip #23: How to Test Keyboard Navigation 

When navigating with a [keyboard](https://webaim.org/techniques/keyboard/), the navigation order of interactive elements should be logical and intuitive. It should generally align with the logical visual order. Further, each interactive element needs to have a visible focus indicator.

How to test keyboard navigation:

-   Click the Tab key to navigate forward
-   Click Shift + Tab to navigate backward
-   Click Enter to activate a link
-   Click Enter or Spacebar to activate a button
-   Click Spacebar to check/uncheck a checkbox

[Learn more about keyboard testing techniques.](http://webaim.org/techniques/keyboard)

## Tip #24: Do Not Rely on Hardware Orientation or Actuation 

Users with [motor disabilities](https://webaim.org/articles/motor/) may not be able to manipulate hardware or a mobile device, and certain sensor actuations and inputs may not be possible. Ensure content works in both horizontal or vertical orientation. Do not rely on motion actuation (such as shaking or panning the device) or pointer gestures (such as swiping or dragging).

## Tip #25: Strive for Accessible Experiences 

When testing for accessibility issues in screen readers, testers can sometimes get hung up on how different screen reader software can read, present, or navigate the same content in different ways. Just as users are diverse, the software and browsers they use are also diverse.

Instead of worrying about creating an identical experience in different assistive technologies, we should strive to create an accessible experience that can be adapted by the end user.