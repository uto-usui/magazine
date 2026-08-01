---
title: "TanStack's new look, and life without RSC"
source: "https://react.statuscode.com/issues/485"
publishedDate: "2026-07-31"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/akpfqgbra3ttj1oqbrg6.jpg)](https://octanejs.dev/)

💡 Expect to see a lot of experimentation around Octane in coming weeks. For example, Steve Faulkner has created [Nextane](https://github.com/southpolesteve/nextane), an experimental riff on Cloudflare's [Vinext](https://github.com/cloudflare/vinext) 'Next.js on Vite', to get the Next.js Pages Router but on Octane.

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/65655689.jpg)](https://sentry.io/resources/etsy-workshop/?utm_source=reactstatus&utm_medium=paid-community&utm_campaign=ecommerce-fy27q3-etsyworkshop&utm_content=newsletter-primary-register)

[Join Sentry Live: How Etsy Stays Crash-Free](https://sentry.io/resources/etsy-workshop/?utm_source=reactstatus&utm_medium=paid-community&utm_campaign=ecommerce-fy27q3-etsyworkshop&utm_content=newsletter-primary-register "sentry.io") — Sentry and Etsy break down how Etsy preps for peak traffic, debugs in real time, and ties crashes to revenue impact. Real stories and practical takeaways for teams shipping at scale.

Sentry

[Why TanStack Stopped Using RSC on Its Site](https://tanstack.com/blog/we-stopped-using-rsc-on-tanstack-com "tanstack.com") — Tanner, armed with lots of numbers, explains why [tanstack.com](https://tanstack.com/) dropped React Server Components after shrinking its markdown and highlighting stack to 27KB. Plain SSR now serves smaller pages with lower blocking time, and the code is easier to follow.

Tanner Linsley

📄 [Your SPA is Leaking Memory: 'Soak Test' It](https://denodell.com/blog/your-spa-is-leaking-memory-soak-test-it) – Loop a Playwright flow in a single browser context and use DOM node and listener counts to catch memory leaks before users do. Den Odell

📄 [The State of Zero-Runtime CSS-in-JS, Mid-2026](https://dx-styles.dev/blog/state-of-zero-runtime-css-in-js/) – From the maintainer of [Linaria](https://linaria.dev/) and creator of [dx-styles](https://dx-styles.dev/). Anton Evzhakov

📄 [Building a Real-Time Face Recognition App in React Native with VisionCamera](https://blog.margelo.com/on-device-face-recognition-react-native) Patrick Kabwe (Margelo)

📄 [A Modern Storybook Tutorial: Stories, Interaction Tests, and CI](https://flaviocopes.com/storybook-tutorial/) Flavio Copes

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/nnljwr4x66nwcbdacajr.jpg)](https://tanstack.com/blog/introducing-tanstack-markdown-and-highlight)

💡 It's been a productive week for TanStack – they've also released [an alpha of TanStack Charts](https://tanstack.com/charts/latest), their take on creating a grammar for charts that AI agents can write. Microsoft is also experimenting in this area with [Flint](https://microsoft.github.io/flint-chart/).

[_Sign in with Google_ for React Native](https://thoughtbot.com/blog/sign-in-with-google-for-react-native "thoughtbot.com") — `@thoughtbot/react-native-social-auth` is a modern Google Sign-In library for React Native on both iOS and Android with a first-party Expo config plugin.

Oluwatomi Oluwafemi Alu (Thoughtbot)

-   [MobX 7.0](https://github.com/mobxjs/mobx/releases/tag/mobx%407.0.0) – The popular state manager slims down, removes deprecations, [updates its React bindings](https://github.com/mobxjs/mobx/releases/tag/mobx-react%4010.0.0), and now always uses Proxy-backed observable objects and arrays.
    
-   [Mantine 9.5](https://mantine.dev/changelog/9-5-0) – The popular full-featured React component suite. Date pickers gain a native month/year select, and there's a new [SunburstChart](https://mantine.dev/charts/sunburst-chart/) component.
    
-   [React Ace 15.0](https://github.com/securingsincity/react-ace/releases/tag/v15.0.0) – Component that wraps the [Ace](https://ace.c9.io/) code editor. Now ships a native ESM build alongside CommonJS, fixing import interop under Vite 8.
    
-   📸 [VisionCamera 5.2](https://github.com/mrousavy/react-native-vision-camera/releases/tag/v5.2.0) – Powerful camera library for React Native. Adds `zoom`, `exposure` and torch control to <`SkiaCamera`\>.
    
-   [react-router-hono-server 3.0](https://github.com/rphlmr/react-router-hono-server/releases/tag/v3.0.0) – Spin up a [Hono](https://hono.dev/)\-based server for your React Router app in seconds. Now targets React Router v8.
    
-   [Virtua 0.50](https://github.com/inokawa/virtua) – A zero-config ~3KB virtual list and grid component for React, Vue, Solid and Svelte – now joined by Angular. ([Demo](https://inokawa.github.io/virtua/))
    
-   [react-x11 1.2](https://github.com/sidorares/react-x11) – A React renderer whose host environment is an X11 server.
    

📊  A Smaller Chart Bonus

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/koj3st9ccsp2uyf0kdyg.jpg)](https://microcharts.dev/)