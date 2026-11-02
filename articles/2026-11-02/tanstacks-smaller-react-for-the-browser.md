---
title: "TanStack's smaller React for the browser"
source: "https://react.statuscode.com/issues/495"
publishedDate: "2026-10-30"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/aanjymzij2eewsfnkhro.jpg)](https://denodell.com/blog/design-systems-should-be-fast-by-default)

Putting MUI, Mantine, Ant Design  
and React Spectrum Under Load

Den Odell wanted to see how popular design systems cope when you give them real work, [so he timed ten of them](https://denodell.com/blog/design-systems-should-be-fast-by-default), including MUI, Mantine, Ant Design and React Spectrum, and profiled the slowest cases. _"Performance belongs on the design system team's priority list, next to accessibility,"_ he says. Some highlights:

-   📊 With the CPU slowed 4x, opening a 249-country dropdown took 84ms in Mantine and 134ms in Ant Design, but over 200ms in MUI and React Spectrum, both of which froze the UI past his 100ms budget.
    
-   🔍 React Spectrum's problem was React Aria measuring options one at a time and forcing layout for each. Den [filed an issue](https://github.com/adobe/react-spectrum/issues/10858) and [a fix is in review](https://github.com/adobe/react-spectrum/pull/10886).
    
-   ⚖️ Framework alone didn't decide the results as non-React Ionic was by far the slowest to open (1,266ms) yet was quick at checking 100 checkboxes, while MUI handled them in 70ms compared to Ant Design's 421ms.
    
-   🧪 Want to try this on your own components? [Den's Playwright tests are available on GitHub](https://github.com/denodell/design-system-performance-tests).
    

* * *

💬 Does Redact pay off? [On r/reactjs](https://www.reddit.com/r/reactjs/comments/1xg14zx/introducing_tanstack_redact/), commenters pondered who needs it and how it differs from Preact, while [one tester](https://github.com/TanStack/redact/issues/75) found re-renders cost about twice the CPU across two production sites.

**IN BRIEF:**

-   ⚠️ Next.js has [a security release scheduled for November 3](https://nextjs.org/blog/upcoming-nextjs-security-release-november-2026), fixing seven medium-severity vulnerabilities. Advisories will be published with the patches.
    
-   Dan Abramov is [fuzzing React's Flight protocol](https://github.com/react/react/pull/37936), the format behind Server Components, by streaming random value graphs through the real server and client. It's turned up [six stream bugs](https://github.com/react/react/pull/37937) and [three writer bugs](https://github.com/react/react/pull/37939) so far.
    
-   [TanStack AI 1.0](https://tanstack.com/blog/tanstack-ai-1-0) is stable: a vendor-neutral AI toolkit with React hooks like `useChat()`, 23 provider adapters and MCP support.
    
-   📱 [React Native Windows 0.85](https://devblogs.microsoft.com/react-native/react-native-windows-v0-85-is-here/) completes its move to the New Architecture, and there's more React Native on the desktop with [Expo Desktop](https://expo-desktop-docs.vercel.app/) (an independent project – not by _Expo_) and [Legend Spark](https://legend.so/spark) for macOS.
    

[`React.lazy`, Suspense and the Hidden 300ms Startup Delay](https://tabwidgets.com/blog/react-lazy-suspense-delay "tabwidgets.com") — A lazy component can suspend on its first render even when its code is already loaded, and React can throttle reveals of suspended content to once every 300ms. Here's how one team traced the delay, and what fixed it.

Matthew Wong (Tab Widgets)

🤖 [Ship Less JavaScript in Next.js with Your AI Agent](https://nextjs.org/blog/ship-less-javascript-with-ai) – A new skill hunts bundle bloat using Turbopack's module graph. Will Binns-Smith (Vercel)

📄 [Porting 287,000 Lines of React to Foldkit in 3 Days](https://maple.dev/blog/react-to-foldkit/) – Focuses on how they built a harness to ensure visual and behavioral parity. David Granzin (Maple)

📄 [Async React and Progressive Server Actions](https://ebey.dev/blog/3myyseusgd22h) – How to keep server action forms working before hydration, even with optimistic UI. Jacob Ebey

📊 [React Compiler in Next.js 16.4: Babel vs Rust, Benchmarked](https://www.fabwaseem.com/blog/react-compiler-nextjs) Waseem Anjum

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/xtwpcvsmvv8w2vtstmyq.jpg)](https://puckeditor.com/blog/puck-024)

-   [OpenTUI 0.8](https://github.com/anomalyco/opentui/releases/tag/v0.8.0) – Terminal UI library with React bindings that powers [OpenCode](https://opencode.ai/). Now repaints only what changed each frame.
    
-   [React Hook Form 7.91](https://github.com/react-hook-form/react-hook-form/releases/tag/v7.91.0) – Lots of `useFieldArray` and async validation fixes, plus fewer re-renders. v8 is also now at beta 5.
    
-   [React-Toastify 11.2](https://github.com/fkhadra/react-toastify/releases/tag/v11.2.0) – Popular toast notification library. Now with `theme="auto"` to follow the OS color scheme.
    
-   [emoji-picker-react 5.1](https://github.com/ealush/emoji-picker-react) – Full-featured customizable emoji picker. [Live demo](https://ealush.com/emoji-picker-react/#playground).
    

🎃  And finally…

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/mrytfwvqa2twlozoynlt.jpg)](https://graveyard-pinball.vercel.app/)

Halloween is almost upon us, so how about [a round of Graveyard Pinball](https://graveyard-pinball.vercel.app/)? It's built with React Three Fiber, with skulls, cauldrons and a skeleton mage. Its creator [explains more about how it works here](https://andersonmancini.dev/blog/graveyard-pinball), including how the 3D table actually uses 2D physics.