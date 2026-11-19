---
title: "What developers think of HTML right now"
source: "https://frontendfoc.us/issues/767"
publishedDate: "2026-11-18"
category: "frontend"
feedName: "Frontend Focus"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/jhi7bhjracqrzildsuo1.jpg)](https://2026.stateofhtml.com/en-US)

🗳️ The _State of HTML 2026_ Results

[The State of HTML 2026 results are now out](https://2026.stateofhtml.com/en-US) covering what developers are using, loving _and_ struggling with, plus [how much they use AI](https://2026.stateofhtml.com/en-US/usage/#ai_generated_code_balance). Declarative, element-based features are winners, while form controls remain difficult. Some highlights:

-   <`details`\>/<`summary`\> (72.5%) and <`dialog`\> (67.8%) are the most used interactivity features, and use of [the Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) has reached 40% now that it works in every major browser.
    
-   <`select`\> and date inputs are the hardest elements to style, and [customizable select](https://2026.stateofhtml.com/en-US/usage/) is the feature most held back by browser support (Firefox is yet to ship it).
    
-   <`datalist`\> usage jumped from 30% to 44%, yet [positive sentiment fell](https://2026.stateofhtml.com/en-US/features/forms/) from 44% to 34%, with respondents citing styling, accessibility and browser bugs.
    
-   Native data tables with built-in sorting and filtering topped the wishlist, ahead of tabs, comboboxes and switches. HTML includes came up again.
    

In [his overall conclusion](https://2026.stateofhtml.com/en-US/conclusion/), Polypane creator Kilian Valkhof sees the frustration shifting from browsers doing things differently to browsers simply not having caught up yet, with mobile OSes a particular sore spot. He ends: _"Our industry might be in turmoil, but I think our foundation is in good shape."_

Devographics

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/3755d5e2.png)](https://surveyjs.io/?utm_source=frontend&utm_medium=email)

[A Form Platform That Fits Your App](https://surveyjs.io/?utm_source=frontend&utm_medium=email "surveyjs.io") — Design complex forms visually and render them in React, Angular, or Vue. Keep full control over your backend and data. Create custom themes or use style adapters, extract form responses from PDFs and images with AI, and generate or fill existing PDF forms.

SurveyJS

[Introducing the Cross-Origin Storage API](https://developer.chrome.com/blog/introducing-cross-origin-storage "developer.chrome.com") — A new API proposal from the Chrome team to enable sites to share large assets (like AI models, fonts, common libraries, etc.) meaning end users would save bandwidth by only having to download them once.

Thomas Steiner

⚡️ IN BRIEF

-   🔦 [jQuery 4.1 and 3.8 are out](https://blog.jquery.com/2026/11/17/jquery-4-1-0-and-3-8-0-released-passing-the-torch/). 3.8 is the last planned feature release of the 3.x line, which now gets critical fixes only.
    
-   📑 Or perhaps you don't need jQuery at all? The long-standing '[You Don't Need jQuery](https://github.com/camsong/You-Dont-Need-jQuery)' guide has had a major update, swapping IE fallbacks for modern one-liners.
    
-   🌐 [Chrome 158 is now stable](https://chromestatus.com/release-notes/158), with the `install` element, media state pseudo-classes like `:playing` and `:paused`, and the start of XSLT's staged removal. Plus there's a look at [what's new in the DevTools](https://developer.chrome.com/blog/new-in-devtools-december-2026).
    
-   ⛓️‍💥 A cautionary tale about using link shorteners: [some old Bitly links were recently hijacked](https://ransomnews.com/burger-king-tweet-bitly-link-hijack-2026/), repurposing where they sent people.
    
-   🌅 As we mentioned last month, [Arc is going away](https://arc.net/) on December 22, so Chris Coyier [rounds up the browsers worth trying instead](https://blog.master.dev/browsers-to-try-if-youre-being-forced-off-arc/).
    

📙 Articles, Opinions & Tutorials

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1795000878/gsvxk9ekbppoc5pwbwha.png)](https://k9l.io/htmlcharts)

[Charts in HTML and CSS](https://k9l.io/htmlcharts "k9l.io") — A neat gallery of column and bar charts, heatmaps, donuts, line charts and more, built from just HTML and CSS (no JavaScript or SVGs). It's all built upon semantic markup, so if you strip away the stylesheet, they remain readable tables or lists. There's also an agent skill.

Keith Cirkel

[The CSS `caret-*` Properties and Custom Caret Accessibility](https://www.sarasoueidan.com/blog/caret-styling-accessibility/ "www.sarasoueidan.com") — A thorough look at the newer `caret-shape` and `caret-animation` properties alongside `caret-color` for styling the text cursor. Covers caret browsing, WCAG rules, and how author styles can trump users' caret preferences.

Sara Soueidan

[What Safari on Apple HomeView Means for Your Site](https://webkit.org/blog/18608/safari-on-apple-homeview/ "webkit.org") — Safari now runs on Apple's square, 7-inch, voice-driven display. Most sites 'just work' but Jen flags some assumptions that break, like a shorter viewport than usual, an iOS user agent on a non-iPhone, and voice users who need labeled controls.

Jen Simmons (WebKit)

[PropFLIP: Because It Flips with Props](https://nerdy.dev/prop-flip "nerdy.dev") — Adam takes four `@property` custom properties and uses them, along with a transition, to create a neat flip effect. A sprinkling of JS helps bring it all together.

Adam Argyle

🧰 Tools, Code & Resources

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/v1794924889/swobpopugd2yotqugz1y.png)](https://allo.joshpuckett.me/)

[Allo: Your Friendly Neighborhood Font](https://allo.joshpuckett.me/ "allo.joshpuckett.me") — A really nice, free, open source typeface with variable weights and roundness options, automatic optical sizing, plenty of alternates, and much more. The site does an excellent job of showing it all off. [Repo here](https://github.com/joshpuckett/allo).

Josh Puckett

📊 [Who Shipped First? Chromium vs Gecko vs WebKit](https://patrickbrosset.com/lab/who-shipped-first "patrickbrosset.com") — A look at 'which browser engine got there first' for a huge range of Web platform features. Patrick used the _web-features_ data for this and Chromium/Chrome, perhaps unsurprisingly, has a clear lead in introducing new features.

Patrick Brosset

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/nefjjckdvz3obnvgfyuf.jpg)](https://auragradients.vercel.app/)

[Aura: Ambient Gradients Built from Layered CSS Blend Modes](https://auragradients.vercel.app/ "auragradients.vercel.app") — 200+ customizable gradients that offer a soft, atmospheric look that feels _'like light'_. Click any gradient to preview it live, browse sub-categories (mesh, nebula, lattice, glass, etc.), and export as PNG, SVG, CSS, Tailwind, etc. [GitHub repo](https://github.com/CristianOlivera1/Aura).

Cristian Olivera

📰 Classifieds

⚡️ Add lightning-fast 1D/2D barcode scanning to your web app with [STRICH](https://strich.io/?ref=frontend-focus). On-device processing, [free trial and demo!](https://strich.io/?ref=frontend-focus)

* * *

📱 No Mac needed. [Expo Simulators](https://try.expo.dev/4jjORJg) gives your coding agent a cloud iOS Simulator to test its own work, on Linux or Windows.

* * *

🧾 Generating invoices or reports from JSON? [Foxit compares 10 PDF generator APIs](https://developer-api.foxit.com/developer-blogs/api-guides-tutorials/best-pdf-generator-apis/?utm_source=draftdev&utm_medium=newsletter&utm_campaign=frontendfocus_20261118) on templates, HTML rendering and how each one bills.

🥽 ...and finally

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/f3wsp96h02m62mqypeia.jpg)](https://webkit.org/blog/18621/introducing-spatial-css-a-developer-preview/)

[WebKit Previews Spatial CSS](https://webkit.org/blog/18621/introducing-spatial-css-a-developer-preview/ "webkit.org") — An early look at arranging 3D <`model`\> objects on the web with plain CSS with which you can group them in a shared space, snap them together, and tweak the lighting. A JavaScript call can even pop the scene out into the room around you. Safari on visionOS only, behind a flag (_remember Vision Pro?_).

Brandel Zachernuk (WebKit)