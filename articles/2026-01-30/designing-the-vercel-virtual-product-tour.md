---
title: "Designing the Vercel virtual product tour"
source: "https://vercel.com/blog/designing-the-vercel-virtual-product-tour"
publishedDate: "2023-06-02"
category: "frontend"
feedName: "Vercel"
author: "Alice Alexandra Moore"
---

8 min read

Jun 2, 2023

How we addressed the need for an interactive, no-commitment experience of our toolkit.

If you've tried a new tech tool recently, this experience might sound familiar: you visit the website, skim the homepage content, but still struggle to understand what the tool will do for you.

The [Vercel virtual product tour](https://vercel.com/product-tour) is a key resource for prospective teams to interactively understand what Vercel can offer. It takes the breadth of information about Vercel and breaks the product down into the most relevant parts.

First, we’ll talk about why we designed the tour the way we did. Then, for the technically curious, we’ll walk through some of [the most interesting hows](#technical-details).

[

**See for yourself.**

Experience the frontend platform customers and developers love.

Take the Tour



](https://vercel.com/product-tour)

## [Link to heading](#the-need)The need

The virtual product tour addresses several challenges we encountered in our marketing funnel. At the core, we were after a digital experience that allows users to interact with the Vercel product before creating an account or talking to our sales team. We wanted users, with minimal effort on their end, to have the next-best-thing to full engagement with our product.

Additionally, we needed the tour to offer insight into some behind-the-scenes product magic that might otherwise go unnoticed on the backend. Certain paid features also needed highlighting. The tour organizes Vercel's product offering into a self-driven tutorial, which prepares users for efficient product adoption.

Above all, we wanted teams to experience the "aha" moment that can inspire them to incorporate Vercel into their workflow.

## [Link to heading](#the-design)The design

With these needs in mind, we aimed to create an interactive experience that excites users about Vercel's offerings and familiarizes them with the platform.

The product tour unfolds as an interactive slideshow that allows users to take their time on each slide while maintaining an overall sense of progress. The slides contain real Vercel UI/UX usually only available to logged-in users. If the user _is_ signed in, the slides are personalized, displaying their avatar and username.

A dynamic tooltip focuses the user on the most relevant information in each slide. This was crucial: Vercel has a **lot** to offer, and we needed a way to show off a huge chunk of it without information overload. The tooltip also offers more interaction than a static button, since it needs to be moved to and clicked to progress. It even lets users engage directly with parts of the product, such as [comments on Preview Deployments](https://vercel.com/docs/concepts/deployments/comments).

Finally, we added a "contact sales" feature throughout the tour so users can get their questions answered easily. This lets potential buyers convert whenever they’re sold on Vercel, instead of waiting until the end of the tour.

### [Link to heading](#the-mobile-experience)The mobile experience

Initially, we faced a challenge on how to make our product tour mobile-friendly. We knew mobile accounted for most of our new user traffic, so we couldn’t afford to overlook it. We attempted to scale down the desktop experience, but it proved too long and inconvenient to use.

We ultimately decided to emulate a social media experience: cards that users can easily tap through. This approach was familiar to users and helped them get excited about the product even on a smaller screen.

Our primary goal is to provide an introduction to the full Vercel product. Building an application on Vercel generally happens on desktop, so our mobile tour needed to drive account creation and sales contacts. From there, users could fully enable themselves to create the applications they want.

### [Link to heading](#accessibility-from-the-outset)Accessibility from the outset

Accessibility isn’t something you tack on to the end of your application. Especially when designing a complex experience, where there’s often no predefined [Accessible Rich Internet Applications (ARIA) standards](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), we needed to consider how we were going to keep the experience usable for all.

There’s no defined aria-role for “product tour” or “demo.” Instead, we decided that the experience was most similar to a carousel. Carousels generally carry an `aria-live` attribute, which indicates that an element’s contents may change without the element itself reloading. We placed this on a hidden `div` in combination with `role="status"` to notify screen readers each time the user changes to a different slide.

Keyboard navigation needed to equal the usability of a mouse. We added a “Get Started” button, so that the user isn’t thrown abruptly into Step 1 upon page navigation. We replaced the “Skip to Content” button with “Skip to Tooltip,” allowing users to directly navigate to the tooltip instead of the main content. This is particularly useful for screen readers, as most buttons were disabled and user only needs to press the tooltip dot.

We also solved race conditions with `lodash.delay()` to ensure that the focus remained on the tooltip as users navigated from slide to slide or up and down a single slide. We’ll address race conditions more in the animation section below.

While there’s definitely a lot more to be done to ensure an accessible experience for all, we felt this gave a solid foundation for the vast majority of use cases.

We’re committed to building accessible designs. Please let us know if a Vercel experience needs to be more accessible for you.

## [Link to heading](#technical-details)Technical details

Now, we’ll jump into the details about the technical implementation. If you’d like to learn more about how Vercel can enable your own virtual experiences, feel free to [skip to the end of the article](#reimagine-your-user-experience).

### [Link to heading](#data)**Data**

A `DemoContext` serves as the single source of truth for the data in the product tour. This Context provides our Product Tour components with everything they need to handle navigation, animations, and changing content, including:

-   An `index` state, for tracking the current slide / tour progression
    
-   A `subIndex` state, for further tracking progression of steps within each slide
    
-   The current `tooltipRef` , used to position the product tour tooltip
    
-   Data and components to render for each slide
    
-   States for the modal and tour survey
    

### [Link to heading](#navigation)Navigation

As the slides change, we sync the current slide `index` (zero-based) with a URL query parameter `i` . We set these URL parameters with Next.js’s `useRouter` hook, which allows us not only to update the param upon the `index` change, but also allows for direct linking to any given slide. Thus, `/product-tour?i=6` will always display the fourth slide of the tour. [Try it out](http://vercel.com/product-tour?i=6).

### [Link to heading](#the-tooltip-data)The tooltip data

Throughout the tour, you’re accompanied by a `Tooltip` that provides carefully positioned information about the product.

Each slide has its own `TooltipContent` object (show below), which gives the `Tooltip` its text, position, and styling. `TooltipContent` derives its data from a clean `tooltipContentMap`, where developers can set properties for each slide or sub-slide. `DemoContext`, meanwhile, tells the Map exactly which properties to send to the `TooltipContent`.

```
export interface TooltipContent {// Data populated from tooltipContentMap, based on current DemoContext index// Tooltip text  title?: string;  description?: string;// Tooltip style and position  color?: 'white' | 'black';  dotAlignX?: 'left' | 'center' | 'right';  dotAlignY?: 'top' | 'center' | 'bottom';  transform?: string;  tooltipAlign?: 'top' | 'left' | 'right' | 'bottom';// Custom TS type check  type: 'TooltipContent';}
```

The options for the TooltipContent interface.

### [Link to heading](#repositioning-the-tooltip)Repositioning the tooltip

Since the `Tooltip` position changes by slide **and** by resizing the screen, we created a `repositionTooltip` function to handle all conditions.

With each new slide or transition within the same slide, the `tooltipRef` updates, which forces the tour to “scroll” to the new ref and reposition the `Tooltip` via the `repositionTooltip` function.

The `repositionTooltip` function also listens for window resizing, via a `ResizeObserver`. This means `repositionTooltip` gets called very frequently and needs to be throttled. Instead of invoking the function every millisecond during a user event, we used timeouts to ensure a reasonable rate of update.

The function _also_ handles the `Tooltip` size to avoid overflowing the viewport. After calculating the `Tooltip` description’s size and position, we pass the dimensions to a function called `isOutofViewport` ([credit to Chris Ferdinandi](https://vanillajstoolkit.com/helpers/isoutofviewport/)). If the `Tooltip` and its description go out of the viewport, we adjust its alignment by changing values held in

This function handles more than just the tooltip’s position, but also is cognizant of the tooltip’s size so as to avoid overflowing the viewport. After calculating the estimated projection of the tooltip description’s size and position, we pass the dimensions to a function called `tooltipAlign`, `dotAlignX`, `dotAlignY` , and `transform` to bring the element fully inside bounds.

### [Link to heading](#animating-the-tooltip)Animating the tooltip

We designed our animations to retain user attention. A product tour like this one could have meant over-the-top transitions and lots of bells and whistles to keep the user engaged, but we wanted the user to focus on the Vercel experience, and not the one of the product tour.

Upon transition of each slide, we use CSS transitions to smoothly interpolate the tooltip from its previous to current position, as defined by the `tooltipRef`.

The dot indicator/button pulses through a simple CSS keyframe animation of the element’s `scale`. If the user clicks outside the button or the current `tooltipRef` element, a click event handler on the tour window triggers a separate attention-getting animation that makes the dot pulse more intensely, guiding the user’s interactions back to the tooltip.

Building the tooltip’s actual animations wasn’t too complicated, but timing those animations required a lot more work. At first, the tooltip description would unpredictably flicker as varying race conditions with `repositionTooltip` and the dot’s moving animation resolved.

Ideally, we wanted only the dot to move and for the tooltip description to appear after the dot stopped moving. We solved this with a `transitionEnd` event listener (credit to [Programming Bytes](https://www.educative.io/answers/how-to-detect-the-end-of-css-transition-events-in-javascript)). By targeting the `propertyName` of the transition event, we were able to ensure that only after the `top` property of the dot was finished transitioning, the tooltip description would appear.

We also used `lodash.delay()` throughout the code, to dictate a sort of timeline between all animations and transitions. It’s crucial that no matter the sequence the user takes through the tour, the animations always play in the correct order.

## [Link to heading](#reimagine-your-user-experience)Reimagine your user experience

Giving the best buying experience is essential to us. We understand that purchasing software can be tedious and not everyone is ready to dive into a trial or have a conversation with sales. That's why the interactive Vercel product tour exists—to give you a comprehensive preview of the platform, minimizing the effort to see the potential results.

Through the development of the Vercel virtual product tour, we successfully addressed key challenges in our marketing funnel and enhanced our user journey. The potent combination of Next.js and Vercel deployments, which we use for all our public-facing products, enable us to transform everyday digital interfaces into impactful experiences.

To get a sense of what you can build with Vercel, we invite you to explore projects such as last year's [Next.js Conf landing page](https://nextjs.org/conf) and our recent [Ship Week experience](https://vercel.com/ship).

We created the Vercel virtual product tour keeping you, our customers, at the heart of the process. It's all about empowering you to build the best user experience possible, whatever your project might be.

You can bring your own vision to life with one of our [200+ templates](https://vercel.com/templates), or deploy a [new repo](https://vercel.com/new) in just a few clicks.

[

**Ready to redefine your digital experiences with Vercel?**

If you're curious about how Vercel can uplift your team's specific use case, our experts are ready for a conversation.

Let's Talk



](https://vercel.com/contact/sales)