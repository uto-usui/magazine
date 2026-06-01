---
title: "🎉 React turns 13 years old today"
source: "https://react.statuscode.com/issues/476"
publishedDate: "2026-05-29"
category: "frontend"
feedName: "React Status"
---

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/de617w929xwdgc8egd3v.jpg)](https://tkdodo.eu/blog/tan-stack-router-and-query)

[Pairing TanStack Router with TanStack Query](https://tkdodo.eu/blog/tan-stack-router-and-query "tkdodo.eu") — Dominik continues [his series on TanStack Router](https://tkdodo.eu/blog/the-beauty-of-tan-stack-router), this time pairing it with [TanStack Query](https://tanstack.com/query/latest). The router cache is per-route while Query’s is global, making Query a better fit for data shared across routes. He covers wiring the `QueryClient` into router context, disabling the router’s own caching so one library owns the data layer, and starting fetches in loaders that `useSuspenseQuery` reads from.

Dominik Dorfmeister

💡 If you don't use it yet, [The Beauty of TanStack Router](https://tkdodo.eu/blog/the-beauty-of-tan-stack-router) might win you over.

[![](https://res.cloudinary.com/cpress/image/upload/c_limit,w_480,h_480,q_auto/copm/7d59b09e.png)](https://www.meticulous.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=26q2&utm_content=primary)

[Still Writing Tests Manually? Meticulous AI Is Here](https://www.meticulous.ai/?utm_source=reactstatus&utm_medium=newsletter&utm_campaign=26q2&utm_content=primary "www.meticulous.ai") — Notion, Dropbox, Wiz and LaunchDarkly now use a testing paradigm they can’t work without. Built by former Palantir engineers, Meticulous automatically creates an evolving suite of E2E UI tests, delivering exhaustive coverage with no developer effort.

Meticulous

**IN BRIEF:**

-   [React Router 7.16.0](https://github.com/remix-run/react-router/blob/main/CHANGELOG.md#v7160) lands as the on-ramp to v8, stabilizing the [trailing-slash data-request](https://reactrouter.com/upgrading/future#futurev8_trailingslashawaredatarequests) flag and warning about every v8 flag you haven't enabled yet.
    
-   🇳🇱 [React Summit](https://reactsummit.com/) is taking place this June 12 in Amsterdam (the day after [JSNation](https://jsnation.com/)). Both can be attended remotely too.
    
-   🇺🇸 The annual [Chain React](https://chainreactconf.com/) React Native conference is this July 30-31 in Portland, Oregon.
    

[React at 60 FPS](https://www.readwriterachel.com/presentations/2026/05/21/react-60fps-slides.html "www.readwriterachel.com") — A slide deck packed with tips for squeezing performance out of React when animating data, without reaching for an animation library — instead leaning on Canvas, `requestAnimationFrame`, WebSockets, and `React.memo`.

Rachel Kaufman

▶  [Is TanStack Start's Deferred Hydration Revolutionary?](https://www.youtube.com/watch?v=_PB9rHndhU8 "www.youtube.com") — Jack examines TanStack Start’s deferred hydration, a new feature that delays hydrating below-the-fold components until they’re needed, noting it’s syntactic sugar over capabilities React already had, though he reckons it’s worth it.

Jack Herrington

💡 TanStack's own docs also offer [a full guide to deferred hydration](https://tanstack.com/start/latest/docs/framework/react/guide/deferred-hydration).

🛠  Code, Tools & Libraries

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/cpuhmxm5bore4dnyfdyq.jpg)](https://reactdatatable.com/)

[![](https://res.cloudinary.com/cpress/image/upload/w_1280,e_sharpen:60,q_auto/cyuefozaaux2bexuvyww.jpg)](https://spoiled.vercel.app/)

-   [React Native Reanimated 4.4](https://github.com/software-mansion/react-native-reanimated/releases/tag/4.4.0) – Easily build smooth animations on React Native. v4.4 has a new CSS animation engine on iOS that runs animations through Core Animation instead of a JS-driven update loop.
    
-   👉 [React Native Gesture Handler 3.0](https://github.com/software-mansion/react-native-gesture-handler/releases/tag/v3.0.0) – Exposes platform-native touch/gesture systems to React Native. Now rebuilt for the New Architecture and with a new `Touchable` component.
    
-   ↔ [React Archer 5.0](https://github.com/pierpo/react-archer) – Draw arrows between DOM elements in React. v5.0 now supports React 19.
    
-   [Sugar High 1.2](https://sugar-high.vercel.app/) – Super-light (1KB) syntax highlighter for JavaScript and JSX.
    
-   [React Spring 10.1](https://www.react-spring.dev/) – A mild bump for the wildly popular UI animation library.
    
-   [MUI X 9.3](https://github.com/mui/mui-x/releases/tag/v9.3.0) – The popular component suite.