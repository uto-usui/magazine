---
title: "Demystifying INP: New tools and actionable insights"
source: "https://vercel.com/blog/demystifying-inp-new-tools-and-actionable-insights"
publishedDate: "2024-06-12"
category: "frontend"
feedName: "Vercel"
author: "Malte Ubl"
---

9 min read

Jun 12, 2024

A technical guide exploring real-world strategies used to improve INP on Vercel's websites.

In March 2024 Interaction to Next Paint (INP) became part of Google’s Core Web Vitals, a set of metrics reporting on user experience of web pages based on field data, and [used in Google’s search ranking](https://vercel.com/blog/how-core-web-vitals-affect-seo).

Modern frameworks like Next.js are optimized for good baseline INP scores, but the nature of the metric is that **what you do in your app really matters for the outcomes**. Many reasonable UX patterns actually push browsers to the limit of what they can render within the INP guidelines.

This is an article about how to optimize INP in those hard situations. It’s based on real-world lessons we learned when optimizing the INP of [nextjs.org](http://nextjs.org/).

## [Link to heading](#inp,-a-confusing-metric)INP, a confusing metric

It’s fair to say that INP is by far the most misunderstood of all the Core Web Vitals. Let’s start with a hard truth. This web page represented in JSX has perfect INP:

```
<button onClick={() => {}}>Click me</button>
```

Obviously, an empty click handler is going to be fast, but the misunderstanding about INP is more subtle: _You don’t have to actually change the DOM for it to count as INP._ "**Paint" really just means it would have had the** _**chance**_ **to paint. It doesn’t matter for the metric if the page changes.**

Let’s look at a second example. Here we block the main thread for a full second:

```
<button  onClick={async () => {    await sleep(100);    blockTheMainThreadForOneSecond();  }}>  Click me</button>;
```

If you click this button once, you also get perfect INP. The `sleep(100)` gives the browser time to paint, and then it doesn’t matter that you block the main thread for a second.

Now, you might say _“Well, why would you add the_ _`sleep(100)`__?”_. Of course, you would not, but this is very reasonable code:

```
<button  onClick={async () => {    const data = await fetchData();    blockTheMainThreadForOneSecond(data);  }}>  Click me</button>;
```

…and once again, this code has perfect INP even though it blocks the main thread for 1 second.

The final example, however, would have an INP of 1 second, which is considered very bad:

```
<html>  <button    onClick={() => {      blockTheMainThreadForOneSecond();    }}  >    Click me  </button></html>;
```

The main takeaway is that, to optimize INP, our job is to arrange the work we’re giving to the browser such that it gets a chance to paint and react to user action. What it does not mean is that we always have to get all the work done, that we eventually want to do within the 200ms INP deadline.

## [Link to heading](#anatomy-of-inp)Anatomy of INP

The time from interaction to next paint can be structured like this:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6MPQ7TR9Am04MLrwHsenkg%2F86bc2edddf77162881fbea986242fa91%2Finp-diagram-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5xHW5qCuAYOgHBTA2QLi7C%2Fb0fa6d78141e111ae267ec9eec81d7eb%2Finp-diagram-dark.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F50DCYhnvy0Tfn8pOx38MJD%2F2581153d184a5cea911a289568184c71%2Finp-diagram-mobile-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2BHwojU0jBQlmYBY6WcLrE%2Ff35ed1945c4098d1572bf807ca228e27%2Finp-diagram-mobile-dark.png&w=1920&q=75)

-   It starts with the user interaction
    
-   **Other code part 1:** Your event handler running might be blocked by other stuff that happens to run on the main thread.
    
-   **Event handler:** Eventually your event handler gets to run.
    
-   **Other code part 2:** After that there is another chance for unrelated code to block the main thread
    
-   **Browser render:** Finally, if you or other code changed the DOM, the browser will re-render the DOM
    
-   And then eventually paint.
    

In order to optimize INP we need to minimize the duration of all the phases above.

### [Link to heading](#inp-phase:-other-code)INP phase: Other code

In the web programming model, all code running in a web page defaults to sharing a single thread and event loop. That means that unrelated code may interfere with handling a user event.

This can be the hardest to optimize, given that it isn’t directly related to the code that you care about at that moment.

One very common cause for such delay is **third-party JavaScript.** The one thing you can do today, if you discover that third-party JS is causing bad INP on your page, is to call your vendor and ask them to fix their stuff. In fact, I recently did this with our analytics vendor [Heap](https://www.heap.io/), and to their credit, they shipped a fix.

### [Link to heading](#inp-phase:-event-handler)INP phase: Event handler

This is your code which is reacting to the user’s interaction. It may fetch some data, immediately change the DOM, or do anything else. If it does change the DOM, then the specific way in which way it does that will impact the time the browser needs to render the new state.

It is this combination of DOM change and render-time that will most immediately impact the INP score of the user interaction. We have a dedicated section for how to optimize it below.

### [Link to heading](#inp-phase:-browser-render)INP phase: Browser render

In this phase, the browser takes all the changes from the previous phase and turns them into actual pixels that can be painted. As we learned in the intro of the post, nothing at all might have changed, in which case this phase takes 0ms and the subsequent paint will also be very fast since there is nothing to paint.

It’s actually very common that this phase is empty. If, for example, you need to fetch data before rendering a response, then this phase would be empty. **This can lead to an ironic outcome where you get worse INP if things are faster–e.g. because you preloaded data so that you can respond immediately.**

## [Link to heading](#optimizing-inp)Optimizing INP

We’ve previously written about [various techniques to optimize INP](https://vercel.com/blog/improving-interaction-to-next-paint-with-react-18-and-suspense). The key to good INP is to optimize the phases above:

-   Minimize other JS from running
    
-   Shorten the event handler phase
    
-   Shorten the duration of the browser render
    

In this article, we’ll focus on the latter 2 phases.

### [Link to heading](#shorten-the-event-handler-phase)Shorten the event handler phase

Event handlers are often very fast. The primary cost attributable to this phase in modern web applications is rerendering including virtual DOM diffing upon state changes. For React, classic performance optimizations like the use of memoization and immutable context and prop values are the best mechanisms to minimize the duration of this phase.

### [Link to heading](#shorten-the-duration-of-the-browser-render)Shorten the duration of the browser render

This phase, by definition, lies mostly in the scope of the browser. Also, even though browser vendors are often asking web developers to _“chunk their work more,”_ browsers themselves unfortunately are still performing this rendering phase in a monolithic fashion.

The general gist of optimizing this phase is that most browser layout algorithms are `O(n)` with the size of the DOM that gets invalidated. Respectively our job is to minimize the amount of DOM that gets invalidated.

One difficult case from [nextjs.org](http://nexjs.org/) was the programming language picker which is used in the documentation section:

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F29u10ApSIiQVR4RXMavt3x%2F6c9b6e2e46efd91bea8a65ecbddb5326%2Fnextjs-docs-language-picker-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6X5X3A2ic1XIbBrwmGaMcW%2F132aa0ef895c2f0f54f06100543e33ef%2Fnextjs-docs-language-picker-dark.png&w=1920&q=75)

From an INP perspective, this is essentially the worst case. Changing the programming language changes the contents of the code, which changes the height of the box, which requires a re-layout of the page. That page may be very long (common for documentation) and so the work the browser has to do is substantial.

It’s fair to say that optimizing this phase falls strictly into the “very advanced web development” category.

-   You may be able to reduce the size of the DOM. Inlined SVGs are often a good candidate for removal from the DOM by replacing them with SVG-images.
    
-   If you are lucky, it may be an option to use techniques for optimizing animations such as only changing `opacity` of an element, which does not change the layout tree, and may be doable entirely on the GPU.
    
-   [CSS containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment) is the primary tool in the toolbox to minimize the work the browser has to do in this phase. It allows the browser to restrict a layout to the area that has containment.
    
-   For long lists, virtualizing those lists can help, by making the actual DOM size that ever needs to be rendered independent of the actual length of the list.
    

## [Link to heading](#a-shippable-alternative)A shippable alternative

But what if we cannot make things fast enough? The “language picker” case above is a good example of the type of experience that will just be slower than 200ms in rendering in current-generation browsers with a sufficiently old mobile device. Sure, one could virtualize the document, but is that really better UX? Shouldn’t browsers be good at viewing content?

So, what can we do in this situation?

It’s time to remember what INP is all about: The metric wants you to acknowledge user input within 200ms. As explained above, it does not expect you to actually draw the response within 200ms. And, again, if you’d need to fetch the data you wouldn’t be able to draw immediately anyway.

What we can do is split up the interaction response into two phases:

1.  Acknowledge user interaction
    
2.  Actually change the page
    

Let’s look at this code example for the `LanguagePicker`:

```
import { useState } from 'react';export function LanguagePicker({ setLanguage }) {  const [selected, setSelected] = useState();  return (    <select       className={selected ? `value-${selected}` : ''}       onChange={(e) => {        setSelected(e.target.value);        setLanguage(e.target.value);      }}    >      <option value="JS">JavaScript</option>      <option value="TS">TypeScript</option>    </select>  );}
```

When the user selects a new value, it adds a class to the `select` element and sets the new language. In this example, the class is set to render an acknowledgment of the user action. Remember that setting the new language may be very expensive. So, how can we separate the acknowledgment from the expensive operation, so that the user immediately knows that their action is being processed without having to wait for the expensive work to complete?

### [Link to heading](#introducing-await-interaction-response)Introducing `await-interaction-response`

We shipped [the new module `await-interaction-response`](https://github.com/vercel-labs/await-interaction-response). You can get started with it right away:

```
pnpm add await-interaction-response
```

Here, we use the module to separate the two phases of our code:

```
import { useState } from 'react';import interactionResponse from 'await-interaction-response';export function LanguagePicker({ setLanguage }) {  const [selected, setSelected] = useState();  return (    <select       className={selected ? `value-${selected}` : ''}       onChange={async (e) => {        setSelected(e.target.value);        await interactionResponse();        setLanguage(e.target.value);      }}    >      <option value="JS">JavaScript</option>      <option value="TS">TypeScript</option>    </select>  );}
```

This one line of code ensures that the acknowledgment of the user action can be performed immediately and with minimal INP, while performing the expensive operation right after.

In fact, because we used a native `select` we don’t need to do anything to acknowledge the user action and can further simplify:

```
import interactionResponse from 'await-interaction-response';export function LanguagePicker({ setLanguage }) {  return (    <select onChange={async (e) => {      await interactionResponse();      setLanguage(e.target.value);    }}>      <option value="JS">JavaScript</option>      <option value="TS">TypeScript</option>    </select>  );}
```

### [Link to heading](#the-implementation)The implementation

The implementation of `await-interaction-response` is very simple:

```
export function interactionResponse(): Promise<unknown> {  return new Promise((resolve) => {    setTimeout(resolve, 100); // Fallback for the case where the animation frame never fires.    requestAnimationFrame(() => {      setTimeout(resolve, 0);    });  });}
```

The code waits for an animation frame, but then also for a timeout. This allows the browser to paint the frame, and then immediately run the code. There is a backup timeout for the special case where the animation frame never runs, which is only relevant for extreme cases like the user moving to a different tab at just the right instant.

Now, it first appears ironic that we delay the work, but we need to be aware that:

-   It enables giving the user immediate feedback that their action was accepted.
    
-   It only delays the response by a maximum of 1 frame, an average of 8ms, which is way too little for a human to notice for the type of major actions where you’d use this function.
    

### [Link to heading](#even-simpler-with-modern-react)Even simpler with modern React

React introduced a very similar API called [`startTransition`](https://react.dev/reference/react/startTransition) which tells React that the state updates in its callback do not need to be executed synchronously. If the slow operation in your app is a result of the state change (like in the examples above), then all you need to do is add `startTransition`.

```
import { startTransition } from "react";export function LanguagePicker({ setLanguage }) {  return (    <select onChange={(e) => {      startTransition(() => {        setLanguage(e.target.value);      })    }}>      <option value="JS">JavaScript</option>      <option value="TS">TypeScript</option>    </select>  );}
```

## [Link to heading](#how-to-find-out-what-to-optimize)How to find out what to optimize

It can be challenging to reproduce INP issues on more powerful developer machines. We recently launched a few features that can help.

First, Vercel Speed Insights [identifies the specific HTML elements](https://vercel.com/changelog/html-element-attribution-in-speed-insights) impacting your Interaction to Next Paint (INP) metric. These CSS selectors tell you exactly which elements on the page had slow interactions. When optimizing INP, **go through this list by frequency prioritizing the most frequent interactions that are slow or need improvement.**

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1thJ7JwAMSfkWmFfW4ddu4%2Fb7fabab9134528003a44d67648dcdfd3%2FHTML_Element_Attribution_-_Light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2VInIYqimQb5RfuDjU6Qij%2F435840eeaab745264b605cb9cb428777%2FHTML_Element_Attribution_-_Dark.png&w=1920&q=75)

The second is [support for INP monitoring](https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar#interaction-timing-tool) directly inside the Vercel Toolbar. This gives you the CSS selector of the impacted elements while you're actively previewing your page—in local dev, a staging environment, [or even production](https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar#using-the-toolbar-in-production)—so you can see which component to optimize.

![The interaction timing tool allows you to see and optimize your website's responsiveness.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2ObTheZzdUptReJndkwY7q%2F1106b1833736cf127d05ddc878f7d902%2FInteraction_Timing__INP___2_.jpg&w=1920&q=75)![The interaction timing tool allows you to see and optimize your website's responsiveness.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6BiR4lsr8UjRdnctLEdyMi%2Fbefc48f7adbd7647551fa74157d9d4ea%2FInteraction_Timing__INP_-1.jpg&w=1920&q=75)

The interaction timing tool allows you to see and optimize your website's responsiveness.

Pairing these two tools with CPU throttling in the Chrome DevTools performance panel makes it quite easy to get results comparable to users on slower devices. One bit of caution: The CPU throttling sometimes yields extreme delays on the very first interaction. It’s safe to ignore this and just click again.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FnWSkhPLcXKp8QyK9u6mhF%2F40f15d998d3d2d8f72e9d2573a1f33e9%2Fchrome-dev-tools-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1A3Ccf6PjDtl9lGBSSIiSx%2Faca3f3499a9bcb62319633f9c2d1789d%2Fchrome-dev-tools-dark.png&w=1920&q=75)

## [Link to heading](#summary)Summary

INP is often misunderstood to require painting the full user response within 200ms, when it is really about giving the user feedback that their input is being processed within that time.

The most effective ways to improve INP are:

-   Calling your third-party code vendors like analytics providers and asking them to improve their event handling code. Please do this today!
    
-   Optimize JS framework rendering performance with tools like React’s `memo`.
    
-   Help the browser have an easier time rendering the page with tools like CSS containment.
    
-   And finally, splitting up event handling into two phases with `await-interaction-response` to ensure immediate acknowledgment of user input for truly expensive page changes.