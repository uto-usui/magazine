---
title: "Accessible Text Labels For All"
source: "https://www.sarasoueidan.com/blog/accessible-text-labels/"
publishedDate: "2021-03-17"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [Quick overview of the VoiceOver Rotor on macOS and how it can be used to display contents on a page](#quick-overview-of-the-voiceover-rotor-on-macos-and-how-it-can-be-used-to-display-contents-on-a-page)
2.  [Exploring e-commerce product listings using the VoiceOver Web rotor](#exploring-e-commerce-product-listings-using-the-voiceover-web-rotor)
3.  [Talking your way through Web browsing with voice commands](#talking-your-way-through-web-browsing-with-voice-commands)
4.  [Improving the experience for screen reader users whilst keeping it accessible to speech-input users](#improving-the-experience-for-screen-reader-users-whilst-keeping-it-accessible-to-speech-input-users)
5.  [Closing thoughts: Provide visual labels whenever possible](#closing-thoughts%3A-provide-visual-labels-whenever-possible)

My talk _**Applied Accessibility: Practical Tips for Creating more Accessible Front-Ends**_ is now [available to watch online](https://youtu.be/Mv_RlmAm4nc). This blog post is an extended transcript for a section of the talk, in which I discuss how to create more descriptive button (and/or link) text labels that improve the e-commerce experience for screen reader users, whilst making sure those buttons don’t fail WCAG success criteria. This, in turn, ensures that the buttons remain usable by another category of users: those using voice commands to navigate the Web. The concepts covered are applicable to all kinds of text labels, including form control labels.

* * *

## Quick overview of the VoiceOver Rotor on macOS and how it can be used to display contents on a page

[VoiceOver](https://www.apple.com/voiceover/info/guide/_1121.html) (VO) is the built-in screen reader on macOS. VoiceOver users can navigate the Web using what is known as the Web Rotor.

The VoiceOver Web Rotor is a quick way to explore and navigate a web page. It is like power commands but for screen reader users. It increases their efficiency and facilitates their browsing the web.

With VoiceOver open, the rotor can be activated with the keyboard shortcut ctrl + option + U. Once open, the rotor will be visible as a heads up display in the middle of the screen. It then presents all items of a particular type in a list.

Inside the rotor, there are several lists—or menus— that the user can use to explore and navigate the content on the page. Using the rotor is an easy way to hear, for example, all the links on a page. The user can then jump to any link they want. There is also a headings menu that allows the user to jump to a particular heading on the page.

In this video, I am demoing the VoiceOver Web Rotor to navigate and explore sections on an A List Apart page. Pressing the right and left arrow inside the rotor shows the different menus available, and gives a quick overview of the different types of content on the page.

Using the rotor, and if the document is using semantic markup and proper sectioning elements (such as `nav`, `header`, `main`, `footer`, `aside`, and so on), the user can move from one area of the page to another without having to go through the content in each section. And it is _very_ important for them to be able to do so.

Note that **the document structure in the rotor is defined by the document structure in your HTML**. So, if you don’t provide a heading, it won’t show up in the rotor and so the document hierarchy for screen reader users will be affected. If you don’t use a landmark, it won’t show up in the rotor and the user won’t be able to jump to it to use it.

### Useful Reading:

-   [Voiceover Basics](https://kb.iu.edu/d/atgb)
-   [Using the Web Rotor to Navigate a Web Page with VoiceOver](https://etc.usf.edu/techease/4all/vision/how-do-i-use-webrotor-in-voiceover/)

* * *

We mentioned earlier that the rotor contains different menus, including Headings menu, Landmarks menu, a Links menu, and a Form Controls menu. Knowing how a screen reader user might navigate a page opens up the possibility to optimize our interfaces and improve their user experience even more.

## Exploring e-commerce product listings using the VoiceOver Web rotor

A common design in e-commerce Web sites is displaying a list of products on a page, each with its own _**Add to Cart**_ button, allowing the user to quickly add items to their cart.

To demonstrate, here is the [Yeti Web site](https://www.yeti.com/en_US/bottles), showcasing a list of reusable bottles. Each bottle comes with its own _Add to Cart_ button. Some also have a Customization option. The following video is a demo of me exploring the page using the VoiceOver Web Rotor:

When you navigate this page using VoiceOver, and use the Form Controls menu, you’ll get a list of all form controls on the page, including the _Add to Cart_ buttons.

Quickly scanning these buttons you can tell that they provide very little value, as there is no way to tell which product each button corresponds to. How does a user know which button they want to go to and press if they don’t know which product it corresponds to?

You may have already guessed that one way we could improve the navigation is by adding screen [visually-hidden, reader-only text](https://sarasoueidan.com/blog/inclusively-hiding-and-styling-checkboxes-and-radio-buttons/#hiding-content-in-css-and-html) that would add the name of the product to its corresponding button.

So, technically, the solution _could_ look something like this:

```
<button type=".." class=“..">    Add <span class="visually-hidden">PRODUCT_NAME</span> to Cart</button><!-- P.S. Don’t do this -->
```

You include the product name in the button’s text label string, so then when the Form Controls menu displays the list of buttons, each button would be clearly labelled to indicate which bottle it is referring to.

This is a good solution for a screen reader user navigating using Form Controls, but **you do _not_ want to do this** because **even though it improves the experience of some screen reader users, it excludes users of other assistive technologies** and makes these buttons inaccessible to them, and a pain to use…

## Talking your way through Web browsing with voice commands

Inserting visually hidden text in the middle of a visible string of text on a button like that prevents users browsing and navigating using voice commands from interacting with the button.

A popular example of Voice recognition software used to browse the Web is [Dragon Naturally Speaking](https://www.nuance.com/dragon/business-solutions/dragon-professional-individual.html). It is software that allows you to use your computer and browse the web using voice commands. It comes with a full usage manual that details how to use it to perform different tasks on your computer and on the Web. Such software is useful for a lot of people, including but not limited to people with disabilities who can’t use their hands, for example, or power users who want to get things done faster (because voice dictation is faster than typing).

Seeing it in action is the best way to get an idea of how it’s used. So, to quickly demonstrate how it is used on the Web, [Level Access](https://www.levelaccess.com/) created [a video demoing Dragon Naturally Speaking to fill out a form on a page](https://www.youtube.com/watch?v=kJKQmTumFP0&ab_channel=LevelAccess). The following video is a short clip from their video which you can find and [watch in full on Youtube](https://www.youtube.com/watch?v=kJKQmTumFP0&ab_channel=LevelAccess).

Note: Note that when he says “go to sleep” or “wake up” he’s basically pausing Dragon and reactivating it by telling it to sleep and wake up.

When the dragon user (in the video) wants to select a form control, **he speaks out the visual text label of that control**. This is one of many reasons why **visual labels are important in user interfaces**.

So when we have a series of **_Add to Cart_** buttons, a dragon user **will speak the label of the button in order to interact with it**. This is why adding text in the middle of the string makes it inaccessible. The content in the middle of the string would break the visible label. The user would be telling dragon to interact with a button whose label is not what it visually appears to be. This is why this would fail the [WCAG Success Criterion 2.5.3: Label in Name](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html): For user interface components with labels that include text or images of text, the name contains the text that is presented visually. A best practice is to have the text of the label at the start of the name.

The following two paragraphs are from the Success Criterion’s page (emphasis mine):

> The intent of this Success Criterion is to ensure that the words which visually label a component are also the words associated with the component programmatically. This helps ensure that people with disabilities can rely on visible labels as a means to interact with the components.
> 
> Most controls are accompanied by a visible text label. Those same controls have a programmatic name, also known as the Accessible Name. **Users typically have a much better experience if the words and characters in the visible label of a control match or are contained within the accessible name.** When these match, speech-input users (i.e., users of speech recognition applications) can navigate by speaking the visible text labels of components, such as menus, links, and buttons, that appear on the screen. **Sighted users who use text-to-speech (e.g., screen readers) will also have a better experience if the text they hear matches the text they see on the screen.**
> 
> [WCAG Success Criterion 2.5.3](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html)

## Improving the experience for screen reader users whilst keeping it accessible to speech-input users

We still want to improve the experience for screen reader users, but we can’t insert the product name into the button’s visible label. We can’t fix the experience for a group of people and end up breaking it for another group. Challenges like these make you scratch your head and think of alternative solutions.

It turns out, there is a middle ground here. We _can_ still add the product name to the button, improving the user experience for screen reader users, _without_ breaking the visible name of the button, **by _appending_ it to the end of the button’s name, instead of inserting it in the middle.**

```
<button type=".." class=“..">    Add to Cart <span class="visually-hidden">, PRODUCT_NAME</span></button>
```

By appending the text to the end of the visible name, the visible name is left intact, and the Web Rotor Form Controls menu will show a list of _**Add to cart**_ buttons with the names of the products they are referring to appended to them.

As for the voice control user, when they say “_click Add to Cart_”, Dragon is going to label the _Add to Cart_ buttons with numbers, like we saw with the checkbox and radio button examples in the video, and then the user can speak out the number of the button they want to click. This works because Voice commands work by saying the name of the input you want to interact with, as long as the name is not “broken” or interrupted by content in the markup.

So whenever you need to add additional text to a visible label, it best come after what’s visually shown.

Similarly, always ensure the accessible name (announced by screen readers) matches the visual label as much as possible. This means that you’ll also want to avoid adding a label using `aria-label` that does not match the text label that is shown on a control.

## Closing thoughts: Provide visual labels whenever possible

Knowing how voice control users navigate the Web can also inspire more visual improvements to our components.

If the user needs to see a visible label to interact with a control, then what about controls that don’t have any visible labels? What about components that have label-less controls, such as dot navigations (typically used in sliders and carousels)? If a user wants to interact with the dots in a dot navigation, they can’t speak their accessible name because they don’t have a visible one they can see. So they are left with two other ways to navigate: using voice commands to tab through the control, or using the mouse grid, which is the most tedious and least favorable option.

It should be obvious by now that the best practice is to always have a visible label for UI controls. But if that’s not possible at all, then the next possible option is to _show_ a label on focus (and hover, too, maybe). Showing labels _on focus_ is particularly important because a Dragon user can tell Dragon to **Tab** to the next control, but they can’t tell it to hover over it (what’s it going to hover if it has no label to indicate what it is?)

Other visual elements that would be more accessible when associated with a visible label are [icon buttons](https://www.sarasoueidan.com/blog/accessible-icon-buttons/). Similar to the dot navigation buttons, if you can’t add a visible label, try showing one when the user interacts with the button.

Thank you for reading.

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.