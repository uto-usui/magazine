---
title: "TanStack Start rethinks React Server Components"
source: "https://react.statuscode.com/issues/470"
publishedDate: "2026-04-17"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/yfbmmkgn28b10zyjypzm.jpg)](https://tanstack.com/blog/react-server-components)

[_TanStack Start_ Adds React Server Components Support](https://tanstack.com/blog/react-server-components "tanstack.com") — The full-stack framework adds RSC support with an 'isomorphic-first' twist: RSCs render to streams you fetch and cache like any other data, not a server-owned tree. No `use server` directive (by design, post-[CVEs](https://react.dev/blog/2025/12/03/critical-security-vulnerability-in-react-server-components)), plus Composite Components that let the client fill slots the server leaves open.

Schiller, Linsley, and Herrington

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/dbca04b1.png)](https://fandf.co/4cArfN8)

[Ship React Native Apps on Fire TV](https://fandf.co/4cArfN8 "fandf.co") — Build apps for Fire TV with ease. Get started by installing the Vega OS SDK, configure Vega Studio, and clone the React Native Hello World sample app. Explore media playback, navigation, and Fire TV APIs. 

Amazon

**IN BRIEF:**

-   Reddit's `/r/reactjs` had a lively thread about [React patterns people adopted then realized were overkill](https://www.reddit.com/r/reactjs/comments/1shuyg4/whats_a_react_pattern_you_massused_then_realized/), including context-as-global-state, barrel files, and HOCs.
    
-   [MUI (Material UI) v9 is out](https://mui.com/blog/introducing-material-ui-v9/), skipping v8 to [sync with MUI X v9](https://mui.com/blog/introducing-mui-v9/#one-mui-ecosystem-a-synced-major-version). Plus new `NumberField` and `Menubar` components, and `sx` and bundle size wins.
    
-   A look behind the scenes of [porting React Compiler to Rust.](https://github.com/facebook/react/pull/36173)
    

[The Vertical Codebase](https://tkdodo.eu/blog/the-vertical-codebase "tkdodo.eu") — A `components/`, `hooks/`, and `utils/` folder structure feels tidy at first, but gets harder to live with over time. Dominik makes the case for a vertical, domain-first structure, pulling examples from Sentry’s own codebase.

Dominik Dorfmeister

[Running React Apps on Salesforce with _Multi-Framework_](https://developer.salesforce.com/blogs/2026/04/build-with-react-run-on-salesforce-introducing-salesforce-multi-framework "developer.salesforce.com") — Building apps on Salesforce's CRM platform has required devs to use its own frameworks, but its new “Multi-Framework” runtime lets you take existing React apps and run them inside Salesforce, with the platform’s auth and data access layered in.

Watkins, Oh, and Lane (Salesforce)

📄 [How to Recreate the Omnichord for the iPad with React Native](https://spin.atomicobject.com/recreate-omnichord-for-ipad/) – An electronic instrument made by Suzuki in the 1980s. Georgia Martinez

📄 [Building a Blog with TanStack Start](https://frontendmasters.com/blog/building-a-blog-in-tanstack-part-1-of-2/) – A good old-fashioned walkthrough tutorial, leaning on [TanStack Start](https://tanstack.com/start/latest). Adam Rackis

📄 [A Guide to React Native Build Optimization](https://themythicalengineer.com/the-complete-guide-to-react-native-build-optimization.html) The Mythical Engineer

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/fca0b4wsyll6dsi3tnxl.jpg)](https://react-photo-album.com/)

-   [react-infinite-scroll-component 7.1](https://github.com/ankeetmaini/react-infinite-scroll-component) – Infinite-scroll component with optional pull-to-refresh. [v7.1](https://github.com/ankeetmaini/react-infinite-scroll-component/releases/tag/v7.1.0) adds `IntersectionObserver` based triggering.
    
-   [React Native Awesome Button 3.0](https://github.com/rcaferati/react-native-awesome-button) – 3D, progress-enabled button component. [The live demo](https://snack.expo.dev/@rcaferati/react-native-awesome-button) shows it off well.
    
-   [RedwoodSDK 1.1](https://github.com/redwoodjs/sdk/releases/tag/v1.1.0) – Server-first React framework for the Cloudflare platform.
    
-   [mqtt-react-hooks 3.0](https://github.com/VictorHAS/mqtt-react-hooks) – Connect, publish, and subscribe to [MQTT](https://en.wikipedia.org/wiki/MQTT) brokers.
    
-   🖼️ [Yet Another React Lightbox 3.31](https://yet-another-react-lightbox.com/) – Lightbox for image and video slides.
    
-   [styled-components 6.4.0](https://github.com/styled-components/styled-components/releases/tag/styled-components%406.4.0) – Fast, expressive styling for React.
    
-   [React Three Fiber 9.6](https://github.com/pmndrs/react-three-fiber) – The React renderer for Three.js.
    
-   [React Email 6.0](https://github.com/resend/react-email/releases/tag/react-email%406.0.0)
    

📢  Elsewhere in the ecosystem

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/edshs2jqhdzfi6jcvpez.jpg)](https://github.com/wesbos/JSON-Alexander)

-   [JSON Alexander](https://github.com/wesbos/JSON-Alexander) _(above)_ is a new JSON viewer extension for Chrome and Firefox from Wes Bos, complete with a snazzy George Costanza logo.
    
-   [Cal Paterson argues](https://calpaterson.com/deps.html) dependency cooldowns are individually rational but collectively make us _"free-riders"_ on other users who get hacked first. He suggests upload queues at package indexes as a better solution.
    
-   From June, Google will [penalize sites that 'hijack' the back button](https://developers.google.com/search/blog/2026/04/back-button-hijacking) in search results. Don't do anything to _"interfere with a user's ability to navigate their browser history,"_ says Chris Nelson.
    
-   [Bun v1.3.12](https://bun.com/blog/bun-v1.3.12) has been released with native, headless browser automation built in, and [`Bun.cron`](https://bun.com/blog/bun-v1.3.12#in-process-bun-cron-scheduler) provides an in-process task scheduler.
    
-   [Node.js 24.15.0 (LTS)](https://nodejs.org/en/blog/release/v24.15.0) makes `require(esm)` and the module compile cache stable and adds `--max-heap-size`.
    
-   TanStack Router, Start, and Query have added [support for the Solid 2.0 beta.](https://tanstack.com/blog/tanstack-start-solid-v2)
    
-   🇫🇷 [dotJS](https://www.dotjs.io/) returns to Paris, France this September 18 – [its CFP](https://www.dotjs.io/speak) is open for two more weeks if you'd like to speak.