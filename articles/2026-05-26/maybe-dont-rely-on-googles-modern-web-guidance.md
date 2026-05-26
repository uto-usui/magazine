---
title: "Maybe Don’t Rely on Google’s “Modern Web Guidance”"
source: "https://adrianroselli.com/2026/05/maybe-dont-rely-on-googles-modern-web-guidance.html"
publishedDate: "2026-05-25"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

Just in time for Google I/O, the Chrome for Developers site announced _Modern Web Guidance_ (MWG):

![Orange star between two curly braces, topped with a circle-line and a flat line at the bottom, appearing almost as an ASCII art lantern.](https://adrianroselli.com/wp-content/uploads/2026/05/modern-web-guidance.svg)

> Modern Web Guidance is a set of evergreen and expert-vetted skills that guide your AI coding agents across many common use cases to build modern web experiences that are accessible, performant, and secure.

I appreciate this set of LLM skills lists accessibility first, something I feel strongly _every_ MVP (or early preview as Google calls this) must:

> Simply, if your MVP does not have accessibility factored in, it is not viable. If you claim accessibility is a core principle but your version 0 does not include it, then it is not a core principle.

Last year I made a straightforward and simple request to Google (that also respects the law in most jurisdictions where Google does business):

> Please, if your team cannot explain how _the thing_ satisfies all [WCAG Success Criteria](https://www.w3.org/WAI/WCAG22/quickref/) at Level AA, then don’t release _the thing_.

Unfortunately, MWG accessibility doesn’t satisfy. Partly because not every pattern has tailored guidance. For example, you may remember when Google ran at a toast pattern before abandoning it:

> Again, the people designing the feature neither understood accessibility nor had consulted anyone who did while they designed it, instead relegating accessibility to the later stages of their design and assuming it could simply be remediated with a modest effort and without any serious redesign or rethink.

I hoped Google also remembered and applied that experience here, making a skill tailored to toasts to avoid another debacle. Nope.

> Reopening because this guide needs accessibility guidance in some form as there’s no general toast guidance.

But this is an early preview of what developers can do with MWG. It’s not going to cover every pattern. That would be absurd. So let’s look to a pattern Google decided to showcase at launch via this first example prompt on the page:

> Create an accordion-style stats component that smoothly animates on open and close.

I expected a pile of `<details name>` elements, maybe CSS `block-size` with a JavaScript fallback, probably a couple placeholder images for generic stats, possibly a well-formed table to accompany them, and of course all of it passing WCAG. This is what Antigravity produced with MWG:

See the Pen [Google Modern Web Accordion](https://codepen.io/aardrian/pen/xbRdrrG) by Adrian Roselli ([@aardrian](https://codepen.io/aardrian)) on [CodePen](https://codepen.io/).

Antigravity with MWG went well beyond the prompt, providing a theme switcher, configuration settings, and plenty of calls to Google fonts. But it failed to do what I asked. The animation doesn’t work in Firefox. This despite the promise of baseline / Baseline support and fallbacks:

> -   **Progressive Enhancement & Nuanced Fallbacks**: We distinguish between purely additive enhancements (like speculative preloading) which are safe to let older browsers silently ignore, and critical behaviors (like dialog controls or network beacons) where we write highly considered, low-overhead fallbacks.
> -   \[…\]
> -   **Baseline-Aware Integration**: We leverage real-time compatibility data from the **Baseline** project so agents can dynamically adapt to current browser support and any browser support preferences.

This is already worrisome given we know that three years on, Baseline still doesn’t really address baseline support:

> The relatively new _Web Platform Baseline_ offering does not track browser support for accessibility features built into the web platform. If you need to understand whether browsers support accessibility features as your own base level set of requirements, for legal or other compliance reasons, then _Web Platform Baseline_ does not represent a baseline.

Let’s ignore the non-DRY code, like duplicated HTML text in the script and stringing out the `transition` instead of using `transition-property`. _Antigravity with MWG didn’t even create a WCAG-conformant example from its own prompt._ I found errors within moments. MWG failed its core promises of creating accessible and performant code. Despite its own explicit guidance.

> For the first two of these MWG already had guidance, and the a11y skill just wasn’t picked up. Overall activation aside, this highlights the importance of including contextual a11y information.
> 
> \[…\] \[W\]e should try to have one guide for each common interactive element summarizing and linking/embedding relevant bits of guidance (e.g. tabs, accordions, drawers, etc). The more scattered the use case guidance is, the less likely it is that agents will actually pick up all the pieces.

And there’s the rub. There’s no way to guarantee you’ll get what you ask for, that you won’t get something else, and that these guides — the entire promise of MWG — will be honored. MWG asks authors to trust MWG when using an LLM to code interfaces. But MWG knows its guidance may be ignored:

> LLMs are non-deterministic. Even if we do everything right, there is no guarantee any guideline will be used for any given prompt. Even if the relevant guide is picked up, it may not be read fully. Case in point: As you say, MWG already had guidelines for many of these things!

The underlying code generation technology can’t be trusted to follow the rules and the rules aren’t robust enough to blunt that reality.

![Crude orange Vonnegut-style asterisk between two curly braces angled out a bit, topped with a rounded rectangle and a curved line at the bottom, appearing almost as an ASCII art toilet.](https://adrianroselli.com/wp-content/uploads/2026/05/modern-web-guidance_vonnegut.svg)

If your job requires you to burn tokens to satisfy some manager’s dashboard, then yes, grab the MWD skills files and integrate them into your LLM work. You’ll almost definitely get better output than if you do nothing at all. There are smart people working on this and many of the accessibility rules I saw were on-point.

But that output will be wrong in subtler and more nuanced ways across potentially fatter piles of code with more unrelated output and unwanted dependencies. It will require a more specialized set of skills to identify errors. And those errors will be different every time the code is generated.

So on the side, keep supporting any existing pattern library. If it’s built well, it’s copy-ready code that you can stuff into a project just as quickly as a chatbot could generate it. It’s deterministic, so you get the same code every time. Ideally it’s been vetted, so you don’t need to look for errors. It’s tailored to your context, meaning you don’t need to yank out random style switchers and typefaces (hoping you got all the dependencies).

If your job _doesn’t_ require you to burn tokens, then probably ignore MWG and, by extensions, LLM for code. In case the environmental damage, intellectual property theft, wealth redistribution to the rich, encoded biases, and built-in support of fascism weren’t enough.