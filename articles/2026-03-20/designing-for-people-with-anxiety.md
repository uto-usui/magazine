---
title: "Designing for people with anxiety"
source: "https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/"
publishedDate: "2026-03-18"
category: "design"
feedName: "Sidebar"
---

Posted on Tuesday, 10 March 2026 by [Demelza Feltham](https://tetralogical.com/about/team/dfeltham) in [Design and development](https://tetralogical.com/blog/category/design-and-development/)

Tags: [WCAG](https://tetralogical.com/blog/tag/wcag/)

Most of us will experience anxiety at some point, sometimes triggered by a stressful moment, other times as a chronic condition. By taking thoughtful, intentional steps, we can ensure our designs at the most reduce stress, and the very least, do not contribute to or amplify it further.

## People we are designing for

Thinking: a bright pink gear connected to a smaller purple gear above it by a wavey line of orange dots. The bright pink gear slots together with a smaller purple gear on the bottom right showing a different way to make a connection.

Thinking

In any form, anxiety, which is the body's response to a perceived threat, can be disruptive, overwhelming, and deeply uncomfortable. In a typical threat response, the surge of stress hormones such as cortisol and adrenaline subsides once the danger passes. But with anxiety, the “threat” is often internal; a worry, fear, or sense of uncertainty that doesn’t resolve cleanly. The body stays on high alert, and the stress response doesn’t switch off. This can leave people in a heightened state of arousal, with reduced cognitive bandwidth and fewer mental resources available for processing information, making decisions, or staying focused.

Like most human experiences, anxiety exists on a spectrum. For some, it can be debilitating, for others, it’s a persistent background noise. Understanding the different [types of disability](https://tetralogical.com/blog/2024/11/18/foundations-types-of-disability/) helps designers recognise why these variations matter.

## Considerations

These considerations focus on reducing cognitive load, lowering stress, and creating experiences that feel calmer and clearer for everyone. It’s not a complete list, but it highlights the areas that make the biggest difference to a calmer, more supportive user experience. We also recognise that while the [Web Content Accessibility Guidelines](https://tetralogical.com/blog/2020/04/10/wcag-primer/) (WCAG) offer a foundation when designing for people with anxiety, they provide only partial support. We want to ensure we look beyond basic compliance when [designing for people with disabilities](https://tetralogical.com/blog/2026/03/03/designing-for-people-with-disabilities/) and consider the more thoughtful, human-centred steps we can take in our design.

### Give people time

It’s common for websites to place people under time pressure with visual countdowns. While timers alone can create anxiety, they can be especially overwhelming for people who are already stressed or feeling rushed. For many, that ticking clock is enough to prompt them to abandon the task entirely, or to hurry through steps and make decisions they’re not comfortable with. Ticketing websites and Two-factor authentication (2FA) flows are well-known examples: [session timeouts](https://tetralogical.com/blog/2022/03/07/session-timeouts/) require people to act within strict time limits, regardless of how ready or at ease they feel.

WCAG speaks directly to this issue in [Success Criterion 2.2.1: Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html), which states that people must be able to do at least one of the following:

-   Turn off the timer
-   Adjust the timer
-   Extend the timer
-   Or have a timer set for over 20 hours

There are exceptions, such as real-time events or essential processes. Ticketing sites often fall into these categories, but even then, strict timers can cause significant discomfort and increase abandonment rates. In short, time pressure can be deeply destabilising. Wherever possible, avoid countdowns, or provide people with meaningful control over them to ensure time limits don’t heighten anxiety or prevent people from completing important tasks.

![Screenshot of a count down with 8:43 left and the text Time left](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/time-out.png)

Ticket-purchase interface displaying a 9-minute countdown, which may appear sufficient but can introduce pressure during a multi-step checkout process

![Screenshot of a text field with the label Authentication Code and the message below the field that reads If you do not receive a code, try sending again in 56 seconds](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/verification-code.png)

Two-factor authentication screen displaying a verification code entry field with a 60-second timer, which may create time pressure for people retrieving the code on their mobile device

If you have to use time-dependent interactions, consider implementing the following:

-   **Be generous with time**: consider extending the time for the 2FA code and the count down for the ticket-purchase flows to give people more flexibility
-   **Offer the option to hide the countdown**: even with ample time, the presence of a ticking timer can be stressful; allow people to hide the visible countdown, replacing it with gentler prompts such as “Your session is about to expire, request more time if needed”
-   **Use kind, supportive copy**: reassuring language helps reduce stress; phrases like “Take your time” or “If your code expires, you can request a new one here” can make the experience feel calmer and more accommodating

This approach aligns with one of the seven [inclusive design principles](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/blog/2025/10/07/guide-to-the-inclusive-design-principles/): [give control](https://tetralogical.com/blog/2025/10/07/guide-to-the-inclusive-design-principles/#:~:text=how%20things%20work.-,Give%20control,-Ensure%20people%20are), which emphasises that people should remain in control of their experience, and our designs should actively support that.

> Ensure people are in control. People should be able to access and interact with content in their preferred way.

### Limit the urgency

Limit urgency wherever possible. Many retail and booking sites introduce UI elements that amplify a sense of pressure. Similar to countdowns, these cues can have a negative effect on people, especially those who are anxious, by prompting them to abandon the process or make decisions they don’t feel ready for.

For example, some shopping sites use scarcity cues by highlighting how many people have an item in their cart. Another technique is to display how popular an item is or how many offers it has received (on a bidding website). Although this information can be useful, it can also feel manipulative and create unnecessary stress. For people who experience anxiety, these urgency cues can rush them into decisions or push them away entirely, without giving them the space they need to think comfortably.

![A screenshot of an items price that contains the text Only 8 left and in 20+ baskets, as well as the price Now £44.11](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/urgent-pricing-etsy.png)

A site that shows how many items remain in stock and how many people have the product in their cart in order to create a sense of urgency when shoppers consider a purchase.

This aligns with the Inclusive Design Principle of [consider situation](https://tetralogical.com/blog/2025/10/07/guide-to-the-inclusive-design-principles/#:~:text=just%20technically%20accessible.-,Consider%20situation,-People%20use%20your), but ironically in reverse. In practice, many products and services exploit these situations to drive faster decisions, which makes the experience less supportive and less inclusive.

> People use your interface in different situations. Make sure your interface delivers a valuable experience to people regardless of their circumstances.

### Keep interactions predictable

Predictable and familiar designs may not eliminate anxiety, but they won’t heighten it. People feel more at ease when interfaces conform to established patterns and follow expectations.

A common problem is when a pop-up takes over the entire screen but doesn’t behave as expected. The close button might appear late, be hard to see, be placed somewhere unusual, or be missing entirely. Sometimes the only way to dismiss the pop-up is to wait, click outside it, or interact with the unwanted content.

A related issue is the use of interactive elements styled to look like plain text. For example, a cookie banner from a retail site that occupies a third of the screen with a prominent “Accept All” button, while the “Cookie settings” option appeared as un-styled text. Because it didn’t look clickable, people may assume they have no real choice other than to "Accept All". Such unexpected behaviour can increase stress, break focus, and make the experience feel less under the individual's control. It also prompts an immediate distrust of the page.

![Screenshot of cookies dialog with two interactive elements, one is clearly a black button with white text that reads Accept All, the other does not look interactive but is labelled Cookie Settings](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/cookie-settings.png)

The cookie banner includes two interactive elements: a clearly marked “ACCEPT ALL” button and a less obvious “COOKIE SETTINGS” option styled like plain text.

As such, keep interactions predictable by using recognisable UI conventions. For example, ensure close buttons in pop-ups and dialogs are clearly visible, focusable, and placed in the expected top-right position.

As well as aligning with [give control](https://tetralogical.com/blog/2025/10/07/guide-to-the-inclusive-design-principles/#:~:text=how%20things%20work.-,Give%20control,-Ensure%20people%20are) from the Inclusive Design Principles, it also aligns with [be consistent](https://tetralogical.com/blog/2025/10/07/guide-to-the-inclusive-design-principles/#:~:text=to%20meet%20them.-,Be%20consistent,-Use%20familiar%20conventions), a principle that highlights the importance of using familiar conventions so that people can navigate with confidence, relying on what they already know rather than being forced to learn novel patterns.

> Use familiar conventions and apply them consistently.

### Provide clear progress updates

If we consider anxiety comes from uncertainty, one way to reduce it is by providing as much transparency as possible. In multi-step journeys, progress indicators are an effective way to communicate this transparency. They can show how many steps are involved and clearly highlight the current position in the process. It’s important that these indicators are accessible to everyone, including people who rely on visual indicators and people who use screen readers.

The goal is to create cohesive and transparent experiences that give people the information they need without overwhelming them. Providing this clarity can reduce stress, help people stay focused, and even allows them to make informed decisions, such as whether they have the time and capacity to complete a task now or should return to it later. Without this insight, people may abandon the process because they can’t judge how long it will take.

![Screenshot of a purple progress bar beneath three buttons: Back to start, Previous, and Next. The progress bar shows Module 4 of 26 screens, conveyed both visually and in adjacent text](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/tetralogical-progress-indicator.png)

A progress bar beneath the navigation controls clearly highlights that the person using completing the course is currently on Module 4 out of 26 so they understand exactly where they are.

### Be transparent when requesting information

It’s important to explain why certain information is being requested. If someone in real life asked for your date of birth or your pronouns without context, both personal details that aren’t automatically assumed, you might feel cautious or hesitant. Forms work the same way. Offering a brief explanation reduces worry, builds trust, and reassures people that their information is being requested for a clear, legitimate purpose.

Equally, if you can't find a significant or convincing reason as to why you are asking for certain information, consider not asking it. This small moment of transparency can prevent already anxious people from spiralling into further anxiety about where their data is going or why it’s needed.

Some forms require people to have specific documents or information in order to complete them, such as proof of address or a passport. Providing people with instructions **before** they start a form is a simple and effective way to help them feel more prepared and in control as shown on the following Gov.uk example.

![Screenshot of the gov.uk passport application page with the text Before you start You'll need a debit or credit card to use this service](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/passport-application.png)

The gov.uk passport application informs applicants they will need access to a debit or credit card during the application process

This transparency empowers people by setting clear expectations and giving them time to prepare, rather than leaving them feeling caught off guard, something that can be compounded when faced with a form time out and a need to retrieve something to finalise the form.

### Give options to review

It’s important to give people the opportunity to review what they’re doing, whether that’s checking their answers in a form or confirming the details of an order. Wherever possible, avoid allowing people to submit something without a chance to review it first.

A good example is the card design process on an online service where people create custom cards that are sent directly to the recipient. Since the final product goes straight to someone else, it’s especially important that people can clearly see what their design will look like before submitting it. By providing a prominent “Preview” button you give people greater confidence and clarity, helping ensure they feel certain about what they’re sending.

![Screenshot of a customise panel with a clear button in the top right corner that reads Preview](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/moonpig-preview.png)

The customisation interface on a card creation website, highlighting the prominent “Preview” button located in the top-right corner of the panel

### Implement accessible wayfinding

Anxiety often increases the desire for control, so it’s important to assume that people want to know where they are within a complex website or process, and have the ability to orient themselves easily. Accessible wayfinding helps people understand their current location, the options available to them, and how to navigate to their next step.

The type of wayfinding you use depends on the depth and complexity of your website or application. While not all approaches are necessary, several can be highly beneficial.

#### Breadcrumbs

A series of links that show people their location within a website’s hierarchy and allow them to navigate between levels. Often used when there is a deep hierarchy. Typically, the last item represents the current page, though it may sometimes be omitted.

![Screenshot of breadcrumbs navigation containing the links Home, Home Furniture and Storage, Home furnishings, Curtains blinds and shutters and Curtain tracks](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/breadcrumbs.png)

Breadcrumb navigation on a website showing a path from Home to Shutters & curtain tracks

#### Navigation

Usually presented as a horizontal or vertical set of links, navigation helps people understand the main sections of a website and move between them with ease.

![A screenshot of the B and Q navigation links. 12 columns with the painting and decorating links expanded](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/navigation-b-n-q.png)

An expanded avigation menu showing 12 sections, with the “Painting and Decorating” section expanded to reveal its multiple subcategories, illustrating the site’s product depth and structure

#### Search functionality

On large, complex websites, such as retail or news sites, search allows people to quickly locate specific content by entering keywords and filtering results. It provides a fast, direct path to the information needed

![Screenshot of b and q product search field](https://tetralogical.com/blog/2026/03/10/designing-for-people-with-anxiety/product-search.png)

The search field allows people to search for items across the site

## Resources

-   [A web of anxiety: accessibility for people with anxiety and panic disorders, Part 1 - TPGI](https://www.tpgi.com/a-web-of-anxiety-accessibility-for-people-with-anxiety-and-panic-disorders-part-1/)
-   [A web of anxiety: accessibility for people with anxiety and panic disorders, Part 2 - TPGI](https://www.tpgi.com/a-web-of-anxiety-accessibility-for-people-with-anxiety-and-panic-disorders-part-2/)
-   [The architecture of anxiety and shame - Todd Libby](https://toddl.dev/posts/the-architecture-of-anxiety-and-shame-part-one/)
-   [Guide to the Inclusive Design Principles](https://tetralogical.com/blog/2025/10/07/guide-to-the-inclusive-design-principles/)
-   [Designing for users with anxiety PDF - UK Home Office](https://d28j9ucj9uj44t.cloudfront.net/uploads/2021/09/Designing_for_accessibility7.pdf)

## Next steps

For more information about the Web Content Accessibility Guidelines, read our [WCAG primer](https://tetralogical.com/blog/2020/04/10/wcag-primer/) or find out more about how our [assessments](https://tetralogical.com/services/assessments/) can help you identify issues in your websites, mobile applications, design systems, and other products and services.