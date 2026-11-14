---
title: "shadcn's next thing: UI SDK"
source: "https://react.statuscode.com/issues/497"
publishedDate: "2026-11-13"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/jmcergdduhiy3e6s1glp.jpg)](https://declarative-dragging.github.io/)

[Declarative Dragging](https://declarative-dragging.github.io/ "declarative-dragging.github.io") — Rather than designing drag and drop interactions as needed, what if you could _declare_ the possible outcomes and let a library work out the interaction? [Dragology](https://github.com/declarative-dragging/dragology) is an experimental React library for SVG interfaces that does just that. There are [lots of demos](https://declarative-dragging.github.io/dragology/#/demos) to try.

Horowitz, Blinn, and Heer

📊 [e18e's Ongoing Benchmarks for JavaScript Meta-Frameworks](https://e18e.dev/blog/launching-the-framework-performance-project.html "e18e.dev") — e18e is now benchmarking meta-frameworks like Next.js, Nuxt, and Astro on everything from install and build costs to SSR throughput, alongside Core Web Vitals data. Built with input from maintainers, [the results](https://frameworks.e18e.dev/) can be tracked release by release and have already led to fixes in Nuxt, React, and Solid.

e18e Project

**IN BRIEF:**

-   ⚠️ Using Vite? [A critical flaw](https://github.com/vitejs/vite/security/advisories/GHSA-p4f5-76q4-ffq7) allows remote code execution on dev servers exposed to the network with `--host` or `server.host`. Update to 8.3.7, 8.2.5, 8.1.7, 7.3.8 or 6.4.6.
    
-   [Storybook 11 beta now has an official post](https://storybook.js.org/blog/storybook-11-beta/). React projects get faster, more accurate component metadata, and there are type-safe stories and official skills for agents. The final release is due in December.
    
-   React's `<form>` docs now explain [how to keep field values after an Action](https://react.dev/reference/react-dom/components/form#preserve-form-values-after-an-action), and `requestFormReset` gets [a reference page](https://react.dev/reference/react-dom/requestFormReset) of its own.
    

[How X is Rebuilding Its Web App with React, Relay and Vite](https://blog.x.com/en/engineering/rebuilding-the-global-town-square-from-scratch "blog.x.com") — X/Twitter is replacing its decade-old client-rendered React app with a stack built around streaming SSR and Suspense. Lab tests show profiles displaying posts much sooner, and the hydration and chunking fixes make this an interesting case study.

Yagiz Nizipli (X)

📊 [Six React Chart Libraries vs Hand-Written SVG](https://dev.to/gusevp/six-react-chart-libraries-against-hand-written-svg-what-i-found-46ib) – The results are close at native speed but with large gaps under CPU throttling or with large datasets. Pavel Gusev

📊 [Remix v3 vs TanStack Start: Fast Pages, Thin Ecosystem](https://marmelab.com/blog/2026/11/12/remix-v3-fast-pages-thin-ecosystem.html) – Comparing the same site built in React-free Remix v3 and TanStack Start. Jonathan Arnault (Marmelab)

📱 [How Five Web Developers Built an iOS Keyboard Extension with Expo](https://expo.dev/blog/supernova-ios-keyboard-extension-expo) Anirudh Coontoor (Supernova)

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/rzyk9hdnriuqphjxnsvj.jpg)](https://textjs.org/)

[Text.js: React Apps That Render in the DevTools Console](https://textjs.org/ "textjs.org") — Continuing the trend of rendering React apps _everywhere_, this new framework heads to DevTools as a host environment, supporting App Router-style routing, Suspense, keyboard input and ASCII fonts. Open the console on the page to see it in action!

Anomaly

-   [EmbedPDF 3.0](https://github.com/embedpdf/embed-pdf-viewer/releases/tag/v3.0.0) – Powerful PDF viewer with a drop-in React component and a headless library for adding your own UI. ([Demo](https://www.embedpdf.com/demo).)
    
-   [react-virtualized 10.0](https://github.com/bvaughn/react-virtualized/releases/tag/10.0.0) – The original list and grid virtualization library, modernized. Now in TypeScript, built on function components, and requires React 18+.
    
-   📱 [React Native Audio API 1.0](https://swmansion.com/changelog/react-native-audio-api-1-0-0/) – Software Mansion's Web Audio API for React Native goes stable. Adds spatial audio, and FFmpeg is now opt-in.
    
-   [Mantine 9.8](https://mantine.dev/changelog/9-8-0/) – Adds an emoji picker package, plus new `Diff`, `PhoneInput` and week and quarter picker components.
    
-   [BagUI](https://www.bagui.pro/) – A `shadcn/ui` registry of blocks and templates for SaaS landing pages, like pricing and hero sections.
    

📢  Elsewhere in the ecosystem

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/wjp1pnhalfiz0jddculv.jpg)](https://vectoys.com/)

-   [Vectoys](https://vectoys.com/) is a set of React components that render phones, laptops and other small 3D objects as SVG, with interactive HTML inside their screens. Could be handy for mockups or 'in-situ' teasers on your homepage.
    
-   🤖 Chrome's [Modern Web Guidance 1.0](https://developer.chrome.com/blog/modern-web-guidance-v1) is a set of skills that steer coding agents toward modern, Baseline-aware HTML and CSS. The team has also listed [the 'top 10 things AI gets wrong'](https://developer.chrome.com/blog/top-10-things-ai-gets-wrong-in-web-dev) when building for the Web.
    
-   Need a clip of a component or animation for a PR or README? Paul Irish's [chrome-capture](https://github.com/paulirish/chrome-capture) tool can record a Chrome tab to an MP4 at 60fps with a single `npx` command.
    
-   📊 The [State of JavaScript 2026 survey](https://survey.devographics.com/en-US/survey/state-of-js/2026) is now open if you want to get involved.