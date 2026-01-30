---
title: "What’s new in React 19"
source: "https://vercel.com/blog/whats-new-in-react-19"
publishedDate: "2024-09-04"
category: "frontend"
feedName: "Vercel"
author: "Michael Novotny"
---

8 min read

Sep 4, 2024

Explore React 19 and how to start using it on Vercel today.

React 19 is near. The React Core Team [announced a React 19 release candidate](https://react.dev/blog/2024/04/25/react-19#new-feature-use) (RC) this past April. This major version brings several updates and new patterns, aimed at improving performance, ease of use, and developer experience.

Many of these features were introduced as experimental in React 18, but they will be marked as stable in React 19. Here’s a high-level look at what you need to know to be ready.

## [Link to heading](#server-components)Server Components

Server Components are one of the biggest changes to React since its initial release 10 years ago. They act as a foundation for React 19’s new features, improving:

-   **Initial page load times.** By rendering components on the server, they reduce the amount of JavaScript sent to the client, resulting in faster initial loads. They also let data queries start on the server _before_ the page is sent to the client.
    
-   **Code portability.** Server Components let developers write components that can run on both the server and client, which reduces duplication, improves maintainability, and enables easier sharing of logic across your codebase.
    
-   **SEO.** Server-side rendering of components allows search engines and LLMs to crawl and index content more effectively, improving search engine optimization.
    

We won’t dive deep into [Server Components](https://vercel.com/blog/understanding-react-server-components-57brjqQf27QFQaFFm27gZ9) or [rendering strategies](https://vercel.com/blog/how-to-choose-the-best-rendering-strategy-for-your-app) in this post. However, to understand the significance of Server Components, let’s take a brief look at how React rendering has evolved.

React started with Client-Side Rendering (CSR), which served minimal HTML to the user.

index.html

```
<!DOCTYPE html><html>  <body>    <div id="root"></div>    <script src="/static/js/bundle.js"></script>  </body></html>
```

The linked script includes everything about your application—React, third-party dependencies, and all your application code. As your application grew, so did your bundle size. The JavaScript is downloaded and parsed, and then React loads the DOM elements into the empty div. While this was happening, all the user sees is a blank page.

Even when the initial UI finally shows, the page content is still missing, which is why loading skeletons gained popularity. Data is then fetched and the UI renders a second time, replacing loading skeletons with actual content.

React improved with Server-Side Rendering (SSR), which moves the first render to the server. The HTML served to the user wasn’t empty anymore, and it improves how quickly the user saw the initial UI. However, the data still needs to be fetched to display actual content.

React frameworks stepped in to further improve the user experience with concepts like Static-Site Generation (SSG), which caches and renders dynamic data during the _build_, and Incremental Static Regeneration (ISR), which recaches and rerenders dynamic data on-demand.

This brings us to React Server Components (RSC). For the first time, native to React, we can fetch data _before_ the UI renders and displays to the user.

page.jsx

```
export default async function Page() {  const res = await fetch("https://api.example.com/products");  const products = res.json();  return (    <>      <h1>Products</h1>      {products.map((product) => (        <div key={product.id}>          <h2>{product.title}</h2>          <p>{product.description}</p>        </div>      ))}    </>  );}
```

HTML served to the user is fully populated with actual content on the first render, and there is no need to fetch additional data or render a second time.

Server Components are a big step forward for speed and performance, enabling a better developer and user experience. Learn more about [React Server Components](https://19.react.dev/reference/rsc/server-components#noun-labs-1201738-\(2\)).

_Credit to_ [_Josh W. Comeau_](https://www.joshwcomeau.com/) _for inspiration on the rendering diagrams._

[

**Try Server Components**

This Next.js App Router template lets you experience Server Components with just a few clicks.

Deploy Now



](https://vercel.com/templates/next.js/app-directory)

## [Link to heading](#new-directives)New directives

Directives are not a React 19 feature, but they are related. With the introduction of React Server Components, bundlers need to distinguish where components and functions run. To accomplish this, there are two new directives to be aware of when creating React components:

-   **`'use client'`** **marks code that runs only on the client.** Since Server Components are the default, you will add `'use client'` to Client Components when using hooks for interactivity and state.
    
-   **`'use server'`** **marks server-side functions that can be called from client-side code.** You do _not_ need to add `'use server'` to Server Components, only Server Actions (more on that below). If you’d like to make sure a certain piece of code can only runs on the server, [you can use the `server-only` npm package](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment).
    

Learn more about [Directives](https://19.react.dev/reference/rsc/directives#noun-labs-1201738-\(2\)).

## [Link to heading](#actions)Actions

React 19 introduces Actions. These functions replace using event handlers and integrate with React transitions and concurrent features.  
﻿  
Actions can be used on both the client and server. For example, you can have a Client Action which replaces previous usage of `onSubmit` for a form.  
﻿  
Rather than needing to parse the event, the action is directly passed the `FormData`.

app.tsx

```
import { useState } from "react";export default function TodoApp() {  const [items, setItems] = useState([    { text: "My first todo" },  ]);  async function formAction(formData) {    const newItem = formData.get("item");    // Could make a POST request to the server to save the new item    setItems((items) => [...items, { text: newItem }]);  }  return (    <>      <h1>Todo List</h1>      <form action={formAction}>        <input type="text" name="item" placeholder="Add todo..." />        <button type="submit">Add</button>      </form>      <ul>        {items.map((item, index) => (          <li key={index}>{item.text}</li>        ))}      </ul>    </>  );}
```

### [Link to heading](#server-actions)Server Actions

Going further, Server Actions allow Client Components to call async functions executed on the server. This provides additional advantages, like reading the file system or making direct database calls, removing the need for creating bespoke API endpoints for your UI.

Actions are defined with the `'use server'` directive and integrate with client-side components.

To call a Server Action in a Client Component, create a new file and import it:

actions.ts

```
'use server'export async function create() {  // Insert into database}
```

todo-list.tsx

```
"use client";import { create } from "./actions";export default function TodoList() {  return (    <>      <h1>Todo List</h1>      <form action={create}>        <input type="text" name="item" placeholder="Add todo..." />        <button type="submit">Add</button>      </form>    </>  );}
```

Learn more about [Server Actions](https://19.react.dev/reference/rsc/server-actions).

## [Link to heading](#new-hooks)New hooks

To complement Actions, React 19 introduces three new hooks to make state, status, and visual feedback easier. These are particularly useful when working with forms, but they can also be used on other elements, like buttons.

### [Link to heading](#useactionstate)`useActionState`

This hook simplifies managing form states and form submissions. Using Actions, it captures form input data, handles validation, and error states, reducing the need for custom state management logic. The `useActionState` hook also exposes a `pending` state that can show a loading indicator while the action is being executed.

```
"use client";import { useActionState } from "react";import { createUser } from "./actions";const initialState = {  message: "",};export function Signup() {  const [state, formAction, pending] = useActionState(createUser, initialState);  return (    <form action={formAction}>      <label htmlFor="email">Email</label>      <input type="text" id="email" name="email" required />      {/* ... */}      {state?.message && <p aria-live="polite">{state.message}</p>}      <button aria-disabled={pending} type="submit">        {pending ? "Submitting..." : "Sign up"}      </button>    </form>  );}
```

Learn more about [`useActionState`](https://19.react.dev/reference/react/useActionState#noun-labs-1201738-\(2\)).

### [Link to heading](#useformstatus)`useFormStatus`

This hook manages the status of the last form submission, and it must be called from inside a component that is also inside a form.

```
import { useFormStatus } from "react-dom";import action from "./actions";function Submit() {  const status = useFormStatus();  return <button disabled={status.pending}>Submit</button>;}export default function App() {  return (    <form action={action}>      <Submit />    </form>  );}
```

While `useActionState` has a built-in `pending` status, `useFormStatus` is useful on its own when:

-   There is no form state
    
-   Creating shared form components
    
-   There are multiple forms on the same page—`useFormStatus` will only return status information for a parent form
    

Learn more about [`useFormStatus`](https://19.react.dev/reference/react-dom/hooks/useFormStatus#noun-labs-1201738-\(2\)).

### [Link to heading](#useoptimistic)`useOptimistic`

This hook lets you optimistically update the UI before the Server Action finishes executing, rather than waiting for the response. When the async action completes, the UI updates with the final state from the server.

The following example demonstrates optimistically adding a new message to a thread immediately, while the message is also sent to the Server Action for persistence.

```
"use client";import { useOptimistic } from "react";import { send } from "./actions";export function Thread({ messages }) {  const [optimisticMessages, addOptimisticMessage] = useOptimistic(    messages,    (state, newMessage) => [...state, { message: newMessage }],  );  const formAction = async (formData) => {    const message = formData.get("message") as string;    addOptimisticMessage(message);    await send(message);  };  return (    <div>      {optimisticMessages.map((m, i) => (        <div key={i}>{m.message}</div>      ))}      <form action={formAction}>        <input type="text" name="message" />        <button type="submit">Send</button>      </form>    </div>  );}
```

Learn more about [`useOptimistic`](https://19.react.dev/reference/react/useOptimistic#noun-labs-1201738-\(2\)).

## [Link to heading](#new-api:-use)New API: `use`

The `use` function offers first-class support for promises and context during rendering. Unlike other React Hooks, `use` can be called within loops, conditional statements, and early returns. Error handling and loading will be handled by the nearest Suspense boundary.

The following example shows a loading message while the cart items promise resolves.

```
import { use } from "react";function Cart({ cartPromise }) {  // `use` will suspend until the promise resolves  const cart = use(cartPromise);  return cart.map((item) => <p key={item.id}>{item.title}</p>);}function Page({ cartPromise }) {  return (    /*{ ... }*/    // When `use` suspends in Cart, this Suspense boundary will be shown    <Suspense fallback={<div>Loading...</div>}>      <Cart cartPromise={cartPromise} />    </Suspense>  );}
```

This allows you to group components together so they render only when all the components’ data is available.

Learn more about [`use`](https://19.react.dev/reference/react/use).

## [Link to heading](#preloading-resources)Preloading resources

React 19 adds several new APIs to improve page load performance and user experience by loading and preloading resources such as scripts, stylesheets, and fonts.

-   [`prefetchDNS`](https://19.react.dev/reference/react-dom/prefetchDNS) prefetches the IP address of a DNS domain name you expect to connect to.
    
-   [`preconnect`](https://19.react.dev/reference/react-dom/preconnect) connects to a server you expect to request resources from, even if the exact resources are unknown at the time.
    
-   [`preload`](https://19.react.dev/reference/react-dom/preload) fetches a stylesheet, font, image, or external script that you expect to use.
    
-   [`preloadModule`](https://19.react.dev/reference/react-dom/preloadModule) fetches an ESM module that you expect to use.
    
-   [`preinit`](https://19.react.dev/reference/react-dom/preinit) fetches and evaluates an external script or fetches and inserts a stylesheet.
    
-   [`preinitModule`](https://19.react.dev/reference/react-dom/preinitModule) fetches and evaluates an ESM module.
    

For example, this React code would result in the following HTML output. Note that links and scripts are prioritized and ordered by how early they should load, not based on the order they are used in React.

```
// React codeimport { prefetchDNS, preconnect, preload, preinit } from "react-dom";function MyComponent() {  preinit("https://.../path/to/some/script.js", { as: "script" });  preload("https://.../path/to/some/font.woff", { as: "font" });  preload("https://.../path/to/some/stylesheet.css", { as: "style" });  prefetchDNS("https://...");  preconnect("https://...");}
```

```
<!-- Resulting HTML --><html>  <head>    <link rel="prefetch-dns" href="https://..." />    <link rel="preconnect" href="https://..." />    <link rel="preload" as="font" href="https://.../path/to/some/font.woff" />    <link      rel="preload"      as="style"      href="https://.../path/to/some/stylesheet.css"    />    <script async="" src="https://.../path/to/some/script.js"></script>  </head>  <body>    <!-- ... -->  </body></html>
```

React frameworks frequently handle resource loading like this for you, so you might not have to call these APIs yourself.

Learn more about [Resource Preloading APIs](https://react.dev/reference/react-dom#resource-preloading-apis).

## [Link to heading](#other-improvements)Other improvements

### [Link to heading](#ref-as-a-prop)`ref` as a prop

There’s no need for `forwardRef` anymore. React will provide a codemod to make transitioning easier.

```
function CustomInput({ placeholder, ref }) {  return <input placeholder={placeholder} ref={ref} />;}// ...<CustomInput ref={ref} />;
```

### [Link to heading](#ref-callbacks)`ref` callbacks

In addition to `ref` as a prop, refs can also return a callback function for cleanup. When a component unmounts, React will call the cleanup function.

```
<input  ref={(ref) => {    // ref created    // Return a cleanup function to reset    // ref when element is removed from DOM.    return () => {      // ref cleanup    };  }}/>;
```

### [Link to heading](#context-as-a-provider)`Context` as a provider

There’s no need for `<Context.Provider>` anymore. You can use `<Context>` directly instead. React will provide a codemod to convert existing providers.

```
const ThemeContext = createContext("");function App({ children }) {  return <ThemeContext value="dark">{children}</ThemeContext>;}
```

### [Link to heading](#usedeferredvalue-initial-value)`useDeferredValue` initial value

An `initialValue` option has been added to `useDeferredValue`. When provided, `useDeferredValue` will use the value for the initial render and schedule a re-render in the background, returning the `deferredValue`.

```
function Search({ deferredValue }) {  // On initial render the value is ''.  // Then a re-render is scheduled with the deferredValue.  const value = useDeferredValue(deferredValue, "");  return <Results value={value} />;}
```

### [Link to heading](#document-metadata-support)Document metadata support

React 19 will natively hoist and render title, link, and meta tags, even from nested components. There’s no need for third-party solutions to manage these tags anymore.

```
function BlogPost({ post }) {  return (    <article>      <h1>{post.title}</h1>      <title>{post.title}</title>      <meta name="author" content="Jane Doe" />      <link rel="author" href="https://x.com/janedoe" />      <meta name="keywords" content={post.keywords} />      <p>...</p>    </article>  );}
```

### [Link to heading](#stylesheet-support)Stylesheet support

React 19 allows controlling stylesheet loading order with `precedence`. This makes colocating stylesheets near components easier, and React only loads them if they are used.

There are a few points to keep in mind:

-   If you render the same component in multiple places within your application, React will deduplicate the stylesheet and only include it once in the document.
    
-   When server-side rendering, React will include the stylesheet in the head. This ensures that the browser will not paint until it has loaded.
    
-   If the stylesheet is discovered after streaming has started, React will ensure that the stylesheet is inserted into the `<head>` on the client before revealing the content that depends on that stylesheet through a Suspense boundary.
    
-   During client-side rendering, React will wait for newly rendered stylesheets to load before committing the render.
    

```
function ComponentOne() {  return (    <Suspense fallback="loading...">      <link rel="stylesheet" href="one" precedence="default" />      <link rel="stylesheet" href="two" precedence="high" />      <article>...</article>    </Suspense>  );}function ComponentTwo() {  return (    <div>      <p>...</p>      {/* Stylesheet "three" below will be inserted between "one" and "two" */}      <link rel="stylesheet" href="three" precedence="default" />    </div>  );}
```

### [Link to heading](#async-scripts-support)Async scripts support

Render async scripts in any component. This makes colocating scripts near components easier, and React only loads them if they are used.

There are a few points to keep in mind:

-   If you render the same component in multiple places within your application, React will deduplicate the script and only include it once in the document.
    
-   When server-side rendering, async scripts will be included in the head and prioritized behind more critical resources that block paint, such as stylesheets, fonts, and image preloads.
    

```
function Component() {  return (    <div>      <script async={true} src="..." />      // ...    </div>  );}function App() {  return (    <html>      <body>        <Component>          // ...        </Component> // Won't duplicate script in the DOM      </body>    </html>  );}
```

### [Link to heading](#custom-elements-support)Custom Elements support

Custom Elements allow developers to define their own HTML elements as a part of the [Web Components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) specification. In previous versions of React, using Custom Elements has been difficult because React treats unrecognized props as attributes rather than properties.

React 19 adds full support for Custom Elements and passes all tests on [Custom Elements Everywhere](https://custom-elements-everywhere.com/).

### [Link to heading](#better-error-reporting)Better error reporting

Error handling improves by removing duplicate error messages.

![Previously, React would throw the error twice. Once for the original error, then a second time after failing to automatically recover, followed by information about the error.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2eneQU7EXxxmIlb6xlKKDe%2F7b6b3733ed0c9a9dd4c3c077e73bfdae%2Freact-19-errors-before-light.jpg&w=1920&q=75)![Previously, React would throw the error twice. Once for the original error, then a second time after failing to automatically recover, followed by information about the error.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3IFHF6JEqluy7xNRPVaLt2%2Ffe9d9f0875c8767afc6aa1cdd7edf9f1%2Freact-19-errors-before-dark.jpg&w=1920&q=75)

Previously, React would throw the error twice. Once for the original error, then a second time after failing to automatically recover, followed by information about the error.

![In React 19, the error is only displayed once.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6BsWIjxitfxdvlWatbvlV2%2Fba2438a89f4486758001c3f4e77e37b4%2Freact-19-errors-after-light.jpg&w=1920&q=75)![In React 19, the error is only displayed once.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3wC30tsni2wBLSVXHCUrqH%2F3a54641ce2a68a79c8587c3e362c77c4%2Freact-19-errors-after-dark.jpg&w=1920&q=75)

In React 19, the error is only displayed once.

Hydration errors improve by logging a single mismatch error instead of multiple errors. Error messages also include information on how to possibly fix the error.

![Example of a hydration error message in React 18.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F523cnm3kDQZr4oJnukSWqE%2F055b209db8f0f717bb729a2c5375dc5b%2Fhydration-error-before-light.jpg&w=1920&q=75)![Example of a hydration error message in React 18.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1QLrAq08GTXjm7cOwekSxk%2F31b3d83bc701cc2b900eea7328e2b143%2Fhydration-error-before-dark.jpg&w=1920&q=75)

Example of a hydration error message in React 18.

![Example of an improved hydration error message in React 19.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4Kv9f6QmEfMr5hEky6xrun%2F7a3c19707e9b1b547a2f73e121b380ca%2Fhydration-error-after-light.jpg&w=1920&q=75)![Example of an improved hydration error message in React 19.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F289DKeNqUzuOy2kKyDlfgk%2Ff4242b407c1763728d638f2ce82a5d76%2Fhydration-error-after-dark.jpg&w=1920&q=75)

Example of an improved hydration error message in React 19.

Hydration errors when using third-party scripts and browser extensions also improve. Previously, elements inserted by third-party scripts or browser extensions would trigger a mismatch error. In React 19, unexpected tags in the head and body will be skipped over and will not throw an error.

Lastly, React 19 adds two new root options in addition to the existing `onRecoverableError`, to provide better clarity on why the error is happening.

-   `onCaughtError` triggers when React catches an error in an Error Boundary.
    
-   `onUncaughtError` triggers when an error is thrown and not caught by an Error Boundary.
    
-   `onRecoverableError` triggers when an error is thrown and automatically recovered.
    

## [Link to heading](#getting-started-with-react-19-on-vercel)Getting started with React 19 on Vercel

React 19 marks a significant evolution in the framework, introducing powerful new features and capabilities. These enhancements increase performance and offer a more seamless experience for developers and users alike.

The following frameworks make it easy to get started with React 19 today:

[

**Astro**

Deploy React 19 with Astro.

▲ Deploy



](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Freact-19-on-vercel%2Ftree%2Fmain%2Fastro&repository-name=react-19-astro)[

**Next.js 15 RC**

Deploy React 19 with Next.js 15 RC.

▲ Deploy



](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Freact-19-on-vercel%2Ftree%2Fmain%2Fnext.js&repository-name=react-19-nextjs)[

**Vite**

Deploy React 19 with Vite.

▲ Deploy



](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Freact-19-on-vercel%2Ftree%2Fmain%2Fvite&repository-name=react-19-vite)[

**Waku**

Deploy React 19 with Waku.

▲ Deploy



](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Freact-19-on-vercel%2Ftree%2Fmain%2Fwaku&repository-name=react-19-waku)