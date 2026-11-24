---
title: "Using Fallbacks for a Robust Front-End"
source: "https://css-tricks.com/using-frontend-fallbacks/"
publishedDate: "2026-11-23"
category: "css"
feedName: "css-tricks"
author: "Steve Frenzel"
---

Anyone who has been working in web development for a while will be familiar with this [now-legendary meme from xkcd](https://www.explainxkcd.com/wiki/index.php/2347:_Dependency). It illustrates just how fragile the technical infrastructure of a website or app can be.

That’s why it’s important to use fallbacks to build a robust front end, either to quietly and discreetly avoid the error or to communicate it to our users.

The issue of robustness is so important that it is actually [one of the four principles of the Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/fundamentals/accessibility-principles/#robust)! So how can we provide a modern front end without excluding users who use browsers and hardware that are only partially compatible or not compatible at all?

The answer lies in implementing multiple safety nets in HTML, CSS, and JavaScript, so that we are prepared for the worst-case scenario and can provide our users with the best possible experience.

## Two distinctions

The main difference between the use of fallbacks and [progressive enhancement](https://piccalil.li/blog/its-about-time-i-tried-to-explain-what-progressive-enhancement-actually-is/) lies in the directions in which the two approaches aim.

While progressive enhancement is about automatically making certain features available as long as they are supported (forward), fallbacks are about what happens when something is not available or accessible (backward).

For example, we can offer a shiny new CSS feature that makes interacting with our website even more enjoyable. But if this feature isn’t available in some browsers, no one will notice, because a version that’s supported by older browsers is available instead. Progressive enhancement in action!

Another example: If JavaScript cannot be loaded for a critical application, we provide a fallback that either offers basic functionality or, at the very least, displays a message explaining what the problem is.

While one doesn’t necessarily exclude the other, their approaches are quite different. My personal recommendation is to always work with progressive enhancement as a guiding principle and to consider fallbacks whenever possible.

## Web platform: Staying up-to-date with the web platform

To evaluate new features intended for production, we must first determine the extent to which a feature is supported.

Since 2023, the [Interop](https://wpt.fyi/interop-2026) project has been in place, in which major browser vendors collaborate to release new features for the web platform more or less simultaneously. This serves as a general overview.

Related to this is the [Baseline](https://web.dev/baseline/) project, which shows, for specific features, the extent to which they are supported and how long they have been available. However, it is extremely important to note that [it does not track browser support for accessibility features](https://adrianroselli.com/2023/12/baseline-does-not-really-cover-baseline-support.html) built into the web platform!

Another important resource for checking compatibility is [Can I Use](https://caniuse.com/). Here, you can get a quick overview of browser support for various features.

## HTML: Error pages and `<noscript>`

Let’s start with the foundation of the World Wide Web: HTML. Modern tech stacks place a strong emphasis on client-side rendered JavaScript, which can offer many benefits to users in more complex applications. However, there can be just as [many reasons why JavaScript might fail to load](https://piccalil.li/blog/a-handful-of-reasons-javascript-wont-be-available/), so we need a strategy to address this.

In the event of a total failure, we should redirect users to an appropriate error page where they receive information about what went wrong and what not only they, but also we, can do to prevent this in the future. If you want to know [how to write error messages that actually help users rather than frustrate them](https://piccalil.li/blog/how-to-write-error-messages-that-actually-help-users-rather-than-frustrate-them/), check out Amy Hupe’s amazing article.

Because this kind of error feedback is so essential, the static site generator Astro, for example, [offers the ability to add custom 404 and 500 error pages](https://docs.astro.build/en/basics/astro-pages/#custom-404-error-page). You could discuss other possible error codes with your back-end team to implement additional safeguards.

But what if we also want to make individual sections or components more robust in case JavaScript isn’t available? For this, we can use the `<noscript>` tag, which, [according to Can I Use](https://caniuse.com/mdn-html_elements_noscript), has excellent browser support. Here’s a highly simplified example of a fictional dashboard component:

```
<!-- Shown if no JavaScript was detected -->
<noscript>
  <section aria-labelledby="user-statistics-heading">
    <h2 id="user-statistics-heading">User statistics:</h2>
    <p>Unfortunately, the user statistics could not be loaded because JavaScript is not available. Please click the “Refresh” button to try again. If the problem persists, click “Report problem” to contact our support team directly.</p>
    <button type="button">Refresh</button>
    <a href="mailto:[email protected]">Report problem</a>
  </section>
</noscript>

<!-- Shown if JavaScript was detected -->
<section aria-labelledby="user-statistics-heading">
  <h2 id="user-statistics-heading">User statistics:</h2>
  <!-- Actual code -->
</section>
```

If JavaScript is not available, we will still display the components, but explain in simple and clear terms that they cannot be loaded at the moment and why that is the case.

We give users the option to reload that specific component so they can resolve the issue themselves. We also offer them the option to contact us directly via email if the problem persists.

Here, you could add a pre-written text to the `<a>` tag, which could include, for example, an internal error code specific to that component in the subject line and have a corresponding body text. This way, they would only need to click the button and could send the email directly using their email program of choice. Support would then have all the necessary information to resolve the issue without needing to ask for additional details.

No matter what your use case is, this pattern can be universally adapted and extended, and ensures that it works even if everything else goes wrong.

## CSS: The `@supports` rule

Let’s stick with our fictional dashboard component. Say we want to use the CSS [`anchor()`](https://css-tricks.com/almanac/functions/a/anchor/) function to display the data, [which is fairly new and has solid, but not great, browser support](https://caniuse.com/css-anchor-positioning).

Since this is a feature that can include multiple attributes, we need to check whether the ones we want to use are actually available. This is exactly where the [`@supports` CSS rule](https://css-tricks.com/almanac/rules/s/supports/) comes into play! Here, it’s recommended to use the [`and` operator](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports#the_and_operator): It should _only_ be used if _all_ attributes are available. If not, the more robust CSS with better browser support is used.

Here’s another fictional, simplified example:

```
/* Fallback for unsupported browsers */
section[aria-labelledby="user-statistics-heading"] {
  position: relative;
}

/* Available in supported browsers browsers */
@supports
  (top: anchor(bottom)) and (position-anchor: auto) {
    section[aria-labelledby="user-statistics-heading"] {
      position: absolute;
      top: anchor(#target bottom);
      position-anchor: #target;
  }
}
```

This approach also serves as documentation: Once the feature has been around for a while and is more well-established, you can look directly for the `@supports` rule in your code base and check whether it is still necessary, along with its fallback.

## JavaScript: `if..else` and conditional ternary operator

Javascript offers us the ability to make our front end even more resilient with minimal effort. To do this, we can use the [`if…else` statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) to check whether a specific feature is available. For example, if we want to use the relatively new [Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API), we could check for it as follows:

```
if (window.navigation) {
  // Navigation API is supported in this browser
} else {
  // Navigation API is not supported in this browser, do something else or nothing
}
```

If we use a component-based approach, where HTML, CSS, and JavaScript are all contained in a single file, we can also use the [conditional ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) to display this component or parts of it, or do nothing at all.

Our fictional dashboard component relies on data from the back end, and it only makes sense to display it once the data has successfully reached the front end. So, for example, we could do the following:

```
// Option 1: Show component because JavaScript is not available:
{ userdata ?
  <section aria-labelledby="user-statistics-heading">
    <h2 id="user-statistics-heading">User statistics:</h2>
      <!-- Actual code -->
  </section> :

  <noscript>
    <section aria-labelledby="user-statistics-heading">
      <h2 id="user-statistics-heading">User statistics:</h2>
      <p>Unfortunately, the user statistics could not be loaded because JavaScript is not available. Please click the “Refresh” button to try again. If the problem persists, click “Report problem” to contact our support team directly.</p>
      <button type="button">Refresh</button>
      <a href="mailto:[email protected]">Report problem</a>
    </section>
  </noscript>
}

// Option 2: Don't show anything at all if no user data is available:
{ userdata ?
  <section aria-labelledby="user-statistics-heading">
    <h2 id="user-statistics-heading">User statistics:</h2>
    <!-- Actual code -->
  </section> :
null }
```

Depending on the use case, it makes sense to display a fallback or even nothing at all. You could also define the conditions more specifically, depending on how robust you want it to be.

## Conclusion

My experience so far at various companies has been that the topics of fallbacks and robustness haven’t played as prominent a role as they really should have.

This is surprising, because as we’ve learned, it doesn’t take much to implement various safety nets on the front end, as long as you think ahead about what (shouldn’t) happen if something goes wrong.

HTML, CSS, and JavaScript provide us with specific elements and functions to ship robust code and thus avoid upsetting our users and, in the worst case, causing them to turn away from us.