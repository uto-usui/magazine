---
title: "Making Sense of React Server Components"
source: "https://www.joshwcomeau.com/react/server-components/"
publishedDate: "2023-09-06"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

So, here's something that makes me feel old: React celebrated its 10th birthday this year!

In the decade since React was first introduced to a bewildered dev community, it’s gone through several evolutions. The React team has not been shy when it comes to radical changes: if they discover a better solution to a problem, they'll run with it.

A couple of months ago, the React team unveiled _React Server Components,_ the latest paradigm shift. For the first time ever, React components can run exclusively on the server.

There's been _so much friggin’ confusion_ about this online. Lots of folks have lots of questions around what this is, how it works, what the benefits are, and how it fits together with things like Server Side Rendering.

I've been doing a lot of experimentation with React Server Components, and I've answered a lot of my own questions. I have to admit, I'm _way_ more excited about this stuff than I expected to be. _It's really cool!_

So, my goal today is to help demystify this stuff for you, to answer a lot of the questions you might have about React Server Components!

## [Link to this heading](#a-quick-primer-on-server-side-rendering-1)A quick primer on Server Side Rendering

To put React Server Components in context, it's helpful to understand how Server Side Rendering (SSR) works. If you're already familiar with SSR, feel free to skip to the next heading!

When I first started using React in 2015, most React setups used a “client-side” rendering strategy. The user would receive an HTML file that looked like this:

```
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
    <script src="/static/js/bundle.js"></script>
  </body>
</html>
```

That `bundle.js` script includes everything we need to mount and run the application, including React, other third-party dependencies, and all of the code we've written.

Once the JS has been downloaded and parsed, React springs into action, conjuring all of the DOM nodes for our entire application, and housing it in that empty `<div id="root">`.

The problem with this approach is that it takes time to do all of that work. **And while it's all happening, the user is staring at a blank white screen.** This problem tends to get worse over time: every new feature we ship adds more kilobytes to our JavaScript bundle, prolonging the amount of time that the user has to sit and wait.There are optimizations that can help here, like lazy-loading specific modules or splitting based on route, but as a general rule, JS bundles tend to grow and grow.

Server Side Rendering was designed to improve this experience. Instead of sending an empty HTML file, the server will render our application to _generate_ the actual HTML. The user receives a fully-formed HTML document.

That HTML file will still include the `<script>` tag, since we still need React to run on the client, to handle any interactivity. But we configure React to work a little bit differently in-browser: instead of conjuring all of the DOM nodes from scratch, it instead _adopts_ the existing HTML. This process is known as _hydration._

I like the way React core team member Dan Abramov explains this:

> Hydration is like watering the “dry” HTML with the “water” of interactivity and event handlers.

Once the JS bundle has been downloaded, React will quickly run through our entire application, building up a virtual sketch of the UI, and “fitting” it to the real DOM, attaching event handlers, firing off any effects, and so on.

And so, that's SSR in a nutshell. A server generates the initial HTML so that users don't have to stare at an empty white page while the JS bundles are downloaded and parsed. Client-side React then picks up where server-side React left off, adopting the DOM and sprinkling in the interactivity.

## [Link to this heading](#bouncing-back-and-forth-2)Bouncing back and forth

Let's talk about data-fetching in React. Typically, we've had two separate applications that communicate over the network:

-   A client-side React app
    
-   A server-side REST API
    

Using something like React Query or SWR or Apollo, the client would make a network request to the back-end, which would then grab the data from the database and send it back over the network.

We can visualize this flow using a graph:

0

10

20

30

Server

Client

Render Shell

Render Content

Download JavaScript

Database Query

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1.  Response from server. Duration: 4 units of time.
2.  "Download JavaScript" on client. Duration: 7 units of time.
3.  "Render Shell" on client. Duration: 6 units of time.
4.  Request to server. Duration: 4 units of time.
5.  "Database Query" on server. Duration: 5 units of time.
6.  Response from server. Duration: 4 units of time.
7.  "Render Content" on client. Duration: 5 units of time.

This first graph shows the flow using a Client Side Rendering (CSR) strategy. It starts with the client receiving an HTML file. This file doesn't have any content, but it does have one or more `<script>` tags.

Once the JS has been downloaded and parsed, our React app will boot up, creating a bunch of DOM nodes and populating the UI. At first, though, we don't have any of the actual _data_, so we can only render the shell (the header, the footer, the general layout) with a loading state.

You've probably seen this sort of pattern a lot. For example, UberEats starts by rendering a shell while it fetches the data it needs to populate the actual restaurants:

The user will see this loading state until the network request resolves and React re-renders, replacing the loading UI with the real content.

**Let's look at another way we could architect this.** This next graph keeps the same general data-fetching pattern, but uses _Server_ Side Rendering instead of Client Side Rendering:

0

10

20

30

Server

Client

Render Shell

Render Content

Hydrate

Download JavaScript

Database Query

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1.  "Render Shell" on server. Duration: 3 units of time.
2.  Response from server. Duration: 4 units of time.
3.  "Download JavaScript" on client. Duration: 7 units of time.
4.  "Hydrate" on client. Duration: 3 units of time.
5.  Request to server. Duration: 4 units of time.
6.  "Database Query" on server. Duration: 5 units of time.
7.  Response from server. Duration: 4 units of time.
8.  "Render Content" on client. Duration: 5 units of time.

In this new flow, we perform the first render on the server. This means that the user receives an HTML file that isn't totally empty.

This is an improvement — a shell is better than a blank white page — but ultimately, it doesn't really move the needle in a significant way. The user isn't visiting our app to see a loading screen, they're visiting to see the _content_ (restaurants, hotel listings, search results, messages, whatever).

To really get a sense of the differences in user experience, let's add some web performance metrics to our graphs. **Toggle between these two flows, and notice what happens to the flags:**

Client Side Rendering

0

10

20

30

Server

Client

PageInteractiveContentPaintedFirstPaint

Render Shell

Render Content

Download JavaScript

Database Query

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1.  Response from server. Duration: 4 units of time.
2.  "Download JavaScript" on client. Duration: 7 units of time.
3.  "Render Shell" on client. Duration: 6 units of time.
4.  Request to server. Duration: 4 units of time.
5.  "Database Query" on server. Duration: 5 units of time.
6.  Response from server. Duration: 4 units of time.
7.  "Render Content" on client. Duration: 5 units of time.

Each of these flags represents a commonly-used web performance metric. Here's the breakdown:

1.  **First Paint** — The user is no longer staring at a blank white screen. The general layout has been rendered, but the content is still missing. This is sometimes called FCP (First Contentful Paint).
    
2.  **Page Interactive** — React has been downloaded, and our application has been rendered/hydrated. Interactive elements are now fully responsive. This is sometimes called TTI (Time To Interactive).
    
3.  **Content Paint** — The page now includes the stuff the user cares about. We've pulled the data from the database and rendered it in the UI. This is sometimes called LCP (Largest Contentful Paint).
    

By doing the initial render on the server, we're able to get that initial “shell” drawn more quickly. This can make the loading experience feel a bit faster, since it provides a sense of progress, that things are happening.

And, in some situations, this _will_ be a meaningful improvement. For example, maybe the user is only waiting for the header to load so that they can click a navigation link.

**But doesn't this flow feel a bit silly?** When I look at the SSR graph, I can't help but notice that the request _starts_ on the server. Instead of requiring a second round-trip network request, why don't we do the database work _during that initial request?_

In other words, **why not do something like this?**

0

10

20

30

Server

Client

PageInteractiveContentPaintedFirstPaint

Render App

Hydrate

Download JavaScript

Database Query

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1.  "Database Query" on server. Duration: 5 units of time.
2.  "Render App" on server. Duration: 6 units of time.
3.  Response from server. Duration: 4 units of time.
4.  "Download JavaScript" on client. Duration: 7 units of time.
5.  "Hydrate" on client. Duration: 3 units of time.

Instead of bouncing back and forth between the client and server, we do our database query as part of the initial request, sending the fully-populated UI straight to the user.

But hm, how exactly would we do this?

In order for this to work, we'd need to be able to give React a chunk of code that it runs _exclusively_ on the server, to do the database query. But that hasn't been an option with React… even with Server Side Rendering, all of our components render on _both_ the server and the client.

**The ecosystem has come up with lots of solutions to this problem.** A “meta-framework” is a framework that builds on top of React, adding additional features like routing or data management. like Next.js and Gatsby have created their own way to run code exclusively on the server.

For example, here's what this looked like using Next.js (using the legacy “Pages” router):

```
import db from 'imaginary-db';

// This code only runs on the server:
export async function getServerSideProps() {
  const link = db.connect('localhost', 'root', 'passw0rd');
  const data = await db.query(link, 'SELECT * FROM products');

  return {
    props: { data },
  };
}

// This code runs on the server + on the client
export default function Homepage({ data }) {
  return (
    <>
      <h1>Trending Products</h1>

      {data.map((item) => (
        <article key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </article>
      ))}
    </>
  );
}
```

**Let's break this down:** when the server receives a request, the `getServerSideProps` function is called. It returns a `props` object. Those props are then funneled into the component, which is rendered first on the server, and then hydrated on the client.

The clever thing here is that `getServerSideProps` doesn't re-run on the client. In fact, this function isn't even included in our JavaScript bundles!

This approach was _super_ ahead of its time. Honestly, it's pretty friggin’ great. But there _are_ some downsides with this:

1.  This strategy only works at the route level, for components at the very top of the tree. We can't do this in any component.
    
2.  Each meta-framework came up with its own approach. Next.js has one approach, Gatsby has another, Remix has yet another. It hasn't been standardized.
    
3.  All of our React components will _always_ hydrate on the client, even when there's no need for them to do so.
    

For years, the React team has been quietly tinkering on this problem, trying to come up with an official way to solve this problem. Their solution is called **React Server Components.**

## [Link to this heading](#introduction-to-react-server-components-3)Introduction to React Server Components

At a high level, _React Server Components_ is the name for a brand-new paradigm. In this new world, we can create components that run _exclusively on the server_. This allows us to do things like write database queries right inside our React components!

Here's a quick example of a “Server Component”:

```
import db from 'imaginary-db';

async function Homepage() {
  const link = db.connect('localhost', 'root', 'passw0rd');
  const data = await db.query(link, 'SELECT * FROM products');

  return (
    <>
      <h1>Trending Products</h1>
      {data.map((item) => (
        <article key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </article>
      ))}
    </>
  );
}

export default Homepage;
```

As someone who has been using React for many years, this code looked _absolutely wild_ to me at first. 😅

“But wait!”, my instincts screamed. “Function components can't be asynchronous! And we're not allowed to have side effects directly in the render like that!”

**The key thing to understand is this:** Server Components never re-render. They run _once_ on the server to generate the UI. The rendered value is sent to the client and locked in place. As far as React is concerned, this output is immutable, and will never change.At least, not until something happens at the router level, like navigating to a new page.

This means that a _big chunk_ of React's API is incompatible with Server Components. For example, we can't use state, because state can change, but Server Components can't re-render. And we can't use effects because effects only run _after_ the render, on the client, and Server Components never make it to the client.

It also means that we have a bit more flexibility when it comes to the rules. For example, in traditional React, we need to put side effects inside a `useEffect` callback or an event handler or something, so that they don't repeat on every render. But if the component only runs _once_, we don't have to worry about that!

Server Components _themselves_ are surprisingly straightforward, but the “React Server Components” paradigm is significantly more complex. This is because we _still have_ regular ol’ components, and the way they fit together can be pretty confusing.

In this new paradigm, the “traditional” React components we're familiar with are called _Client Components_. I'll be honest, I don't love this name. 😅

The name “Client Component” implies that these components _only_ render on the client, but that's not actually true. **Client Components render on both the client _and_ the server.**

I know that all this terminology is pretty confusing, so here's how I'd summarize it:

-   _React Server Components_ is the name for this new paradigm.
    
-   In this new paradigm, the “standard” React components we know and love have been rebranded as _Client Components_. It's a new name for an old thing.
    
-   This new paradigm introduces a new type of component, _Server Components_. These new components render exclusively on the server. Their code isn't included in the JS bundle, and so they never hydrate or re-render.
    

### [Link to this heading](#compatible-environments-4)Compatible Environments

So, typically, when a new React feature comes out, we can start using it in our existing projects by bumping our React dependency to the latest version. A quick `npm install react@latest` and we're off to the races.

Unfortunately, React Server Components doesn't work like that.

My understanding is that React Server Components needs to be tightly integrated with a bunch of stuff outside of React, things like the bundler, the server, and the router.

As I write this, there's only one way to start using React Server Components, and that's with Next.js 13.4+, using their brand-new re-architected “App Router”.

Hopefully in the future, more React-based frameworks will start to incorporate React Server Components. It feels awkward that a core React feature is only available in one particular tool! The React docs has a [“Bleeding-edge frameworks” section(opens in new tab)](https://react.dev/learn/start-a-new-react-project#bleeding-edge-react-frameworks) where they list the frameworks that support React Server Components; I plan on checking this page from time to time, to see if any new options become available.

### [Link to this heading](#specifying-client-components-5)Specifying client components

In this new “React Server Components” paradigm, **all components are assumed to be Server Components by default.** We have to “opt in” for Client Components.

We do this by specifying a brand-new _directive_:

```
'use client';

import React from 'react';

function Counter() {
  const [count, setCount] = React.useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Current value: {count}
    </button>
  );
}

export default Counter;
```

That standalone string at the top, `'use client'`, is how we signal to React that the component(s) in this file are Client Components, that they should be included in our JS bundles so that they can re-render on the client.

This might _seem_ like an incredibly odd way to specify the type of component we're creating, but there is a precedent for this sort of thing: the ["use strict"(opens in new tab)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) directive that opts into “Strict Mode” in JavaScript.

We don't specify the `'use server'` directive in our Server Components; in the React Server Components paradigm, components are treated as Server Components by default. In fact, `'use server'` is used for Server Actions, a totally different feature that is beyond the scope of this blog post.

## [Link to this heading](#boundaries-6)Boundaries

One of the first questions I had when I was getting familiar with React Server Components was this: _what happens when the props change?_

For example, suppose we had a Server Component like this:

```
function HitCounter({ hits }) {
  return (
    <div>
      Number of hits: {hits}
    </div>
  );
}
```

Let's suppose that in the initial Server Side Render, `hits` was equal to `0`. This component, then, will produce the following markup:

```
<div>
  Number of hits: 0
</div>
```

But what happens if the value of `hits` changes? Suppose it's a state variable, and it changes from `0` to `1`. `HitCounter` would need to re-render, but it _can't_ re-render, because it's a Server Component!

**The thing is, Server Components don't really make sense in isolation.** We have to zoom out, to take a more holistic view, to consider the structure of our application.

Let's say we have the following component tree:

If all of these components are Server Components, then it all makes sense. None of the props will ever change, because none of the components will ever re-render.

But let's suppose that `Article` component owns the `hits` state variable. In order to use state, we need to convert it to a Client Component:

Do you see the issue here? When `Article` re-renders, any owned components will _also_ re-render, including `HitCounter` and `Discussion`. If these are Server Components, though, they _can't_ re-render.

In order to prevent this impossible situation, the React team added a rule: **Client Components can only import other Client Components.** That `'use client'` directive means that these instances of `HitCounter` and `Discussion` will need to become Client Components.

One of the biggest “ah-ha” moments I had with React Server Components was the realization that this new paradigm is all about creating _client boundaries_. Here's what winds up happening, in practice:

When we add the `'use client'` directive to the `Article` component, we create a “client boundary”. All of the components within this boundary are _implicitly_ converted to Client Components. Even though components like `HitCounter` don't have the `'use client'` directive, they'll still hydrate/render on the client in this particular situation.The HitCounter component itself might still be rendered as a Server Component in other situations, if it's imported somewhere else by a Server Component.

This means we don't have to add `'use client'` to every single file that needs to run on the client. In practice, we only need to add it when we're creating new client boundaries.

### [Link to this heading](#workarounds-7)Workarounds

When I first learned that Client Components can't render Server Components, it felt pretty restrictive to me. What if I need to use state high up in the application? Does that mean _everything_ needs to become a Client Component??

It turns out that in many cases, we can work around this limitation by restructuring our application so that the _owner_ changes.

This is a tricky thing to explain, so let's use an example:

```
'use client';

import { DARK_COLORS, LIGHT_COLORS } from '@/constants.js';

import Header from './Header';
import MainContent from './MainContent';

function Homepage() {
  const [colorTheme, setColorTheme] = React.useState('light');

  const colorVariables = colorTheme === 'light'
    ? LIGHT_COLORS
    : DARK_COLORS;

  return (
    <body style={colorVariables}>
      <Header />
      <MainContent />
    </body>
  );
}
```

In this setup, we need to use React state to allow users to flip between dark mode / light mode. This needs to happen high up in the application tree, so that we can apply our CSS variable tokens to the `<body>` tag.

In order to use state, we need to make `Homepage` a Client Component. And since this is the top of our application, it means that all of the other components — `Header` and `MainContent` — will implicitly become Client Components too.

To fix this, let's pluck the color-management stuff into its own component, moved to its own file:

```
// /components/ColorProvider.js
'use client';

import { DARK_COLORS, LIGHT_COLORS } from '@/constants.js';

function ColorProvider({ children }) {
  const [colorTheme, setColorTheme] = React.useState('light');

  const colorVariables = colorTheme === 'light'
    ? LIGHT_COLORS
    : DARK_COLORS;

  return (
    <body style={colorVariables}>
      {children}
    </body>
  );
}
```

Back in `Homepage`, we use this new component like so:

```
// /components/Homepage.js
import Header from './Header';
import MainContent from './MainContent';
import ColorProvider from './ColorProvider';

function Homepage() {
  return (
    <ColorProvider>
      <Header />
      <MainContent />
    </ColorProvider>
  );
}
```

We can remove the `'use client'` directive from `Homepage` because it no longer uses state, or any other client-side React features. This means that `Header` and `MainContent` won't be implicitly converted to Client Components anymore!

**But wait a second.** `ColorProvider`, a Client Component, is a _parent_ to `Header` and `MainContent`. Either way, it's still higher in the tree, right?

When it comes to client boundaries, though, the parent/child relationship doesn't matter. `Homepage` is the one importing and rendering `Header` and `MainContent`. This means that `Homepage` decides _what the props are_ for these components.

Remember, the problem we're trying to solve is that Server Components can't re-render, and so they can't be given new values for any of their props. With this new setup, `Homepage` decides what the props are for `Header` and `MainContent`, and since `Homepage` is a Server Component, there's no problem.

**This is brain-bending stuff.** Even after years of React experience, I still find this very confusing 😅. It took a fair bit of practice to develop an intuition for this.

To be more precise, the `'use client'` directive works at the file / module level. Any modules _imported_ in a Client Component file must be Client Components as well. When the bundler bundles up our code, it'll follow these imports, after all!

## [Link to this heading](#peeking-under-the-hood-8)Peeking under the hood

Let's look at this at a bit of a lower level. When we use a Server Component, what does the output look like? What actually gets generated?

Let's start with a super-simple React application:

```
function Homepage() {
  return (
    <p>
      Hello world!
    </p>
  );
}
```

In the React Server Components paradigm, all components are Server Components by default. Since we haven't explicitly marked this component as a Client Component (or rendered it within a client boundary), it'll only render on the server.

When we visit this app in the browser, we'll receive an HTML document which looks something like this:

```
<!DOCTYPE html>
<html>
  <body>
    <p>Hello world!</p>

    <script src="/static/js/bundle.js"></script>
    <script>
      self.__next['$Homepage-1'] = {
        type: 'p',
        props: null,
        children: "Hello world!",
      };
    </script>
  </body>
</html>
```

We see that our HTML document includes the UI generated by our React application, the “Hello world!” paragraph. This is thanks to Server Side Rendering, and isn't directly attributable to React Server Components.

Below that, we have a `<script>` tag that loads up our JS bundle. This bundle includes the dependencies like React, as well as any Client Components used in our application. And since our `Homepage` component is a Server Component, the code for that component is _not_ included in this bundle.

Finally, we have a second `<script>` tag with some inline JS:

```
self.__next['$Homepage-1'] = {
  type: 'p',
  props: null,
  children: "Hello world!",
};
```

This is the really interesting bit. Essentially, what we're doing here is telling React “Hey, so I know you're missing the `Homepage` component code, but don't worry: here's what it rendered”.

Typically, when React hydrates on the client, it speed-renders all of the components, building up a virtual representation of the application. It can't do that for Server Components, because the code isn't included in the JS bundle.

And so, we send along the rendered value, the virtual representation that was generated by the server. When React loads on the client, it re-uses that description instead of re-generating it.

This is what allows that `ColorProvider` example above to work. The output from `Header` and `MainContent` is passed into the `ColorProvider` component through the `children` prop. `ColorProvider` can re-render as much as it wants, but this data is static, locked in by the server.

This _does_ mean that while our JS bundles get smaller, the HTML file gets larger. Instead of having the component _definition_ in a JS file, we have the component's _returned value_ inlined in a `<script>` tag. On average, we'll still send less total data over the network, but it's worth remembering that Server Components aren't _totally_ free. I should also note that the HTML file is broken into chunks and streamed, so the browser can still paint the UI quickly, without having to wait for all the cruft in the `<script>` tag.

If you're curious to see _true_ representations of how Server Components are serialized and sent over the network, check out the [RSC Devtools(opens in new tab)](https://www.alvar.dev/blog/creating-devtools-for-react-server-components) by developer Alvar Lagerlöf.

## [Link to this heading](#advantages-9)Advantages

React Server Components is the first “official” way to run server-exclusive code in React. As I mentioned earlier, though, this isn't _really_ a new thing in the broader React ecosystem; we've been able to run server-exclusive code in Next.js since 2016!

The big difference is that we've never before had a way to run server-exclusive code _inside our components._

The most obvious benefit is performance. Server Components don't get included in our JS bundles, which reduces the amount of JavaScript that needs to be downloaded, and the number of components that need to be hydrated:

Legacy Next.js (pre-RSC)

0

10

20

30

Server

Client

PageInteractiveContentPaintedFirstPaint

Render App

Hydrate

Download JavaScript

Database Query

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1.  "Database Query" on server. Duration: 5 units of time.
2.  "Render App" on server. Duration: 6 units of time.
3.  Response from server. Duration: 4 units of time.
4.  "Download JavaScript" on client. Duration: 7 units of time.
5.  "Hydrate" on client. Duration: 3 units of time.

This is maybe the least exciting thing to me, though. Honestly, most Next.js apps are _already_ fast enough when it comes to “Page Interactive” timing.

If you follow semantic HTML principles, most of your app should work even before React has hydrated. Links can be followed, forms can be submitted, accordions can be expanded and collapsed (using `<details>` and `<summary>`). For most projects, it's fine if it takes a few seconds for React to hydrate.

**But here's something I find really cool:** we no longer have to make the same compromises, in terms of features vs. bundle size!

For example, most technical blogs require some sort of syntax highlighting library. On this blog, I use Prism. The code snippets look like this:

```
function exampleJavaScriptFunction(param) {
  return "Hello world!"
}
```

A proper syntax-highlighting library, with support for all popular programming languages, would be several megabytes, far too large to stick in a JS bundle. As a result, we have to make compromises, trimming out languages and features that aren't mission-critical.

But, suppose we do the syntax highlighting _in a Server Component._ In that case, none of the library code would actually be included in our JS bundles. As a result, we wouldn't have to make any compromises, we could use all of the bells and whistles.

This is the big idea behind [Bright(opens in new tab)](https://bright.codehike.org/), a modern syntax-highlighting package designed to work with React Server Components.

![Screenshot of some syntax-highlighted React code](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fserver-components%2Fbright.png&w=1920&q=75)

This is the sort of thing that gets me excited about React Server Components. Things that would be too cost-prohibitive to include in a JS bundle can now run on the server _for free,_ adding zero kilobytes to our bundles, and producing an even better user experience.

It's not just about performance and UX either. After working with RSC for a while, I've come to really appreciate how easy-breezy Server Components are. We never have to worry about dependency arrays, stale closures, memoization, or any of the other complex stuff caused by _things changing._

Ultimately, it's still very early days. React Server Components only emerged from beta a couple of months ago! I'm really excited to see how things evolve over the next couple of years, as the community continues to innovate new solutions like Bright, taking advantage of this new paradigm. It's an exciting time to be a React developer!

## [Link to this heading](#the-full-picture-10)The full picture

React Server Components is an exciting development, but it's actually only one part of the “Modern React” puzzle.

Things get _really_ interesting when we combine React Server Components with Suspense and the new Streaming SSR architecture. It allows us to do _wild_ stuff like this:

0

10

20

30

Server

Client

PageInteractiveContentPaintedFirstPaint

Render Shell

Hydrate

Render Content

Hydrate

Download JS

Database Query

This is a data visualization which shows a sequence of events between client and server. Each event is represented here as a list item.

1.  "Render Shell" on server. Duration: 3 units of time.
2.  Response from server. Duration: 3 units of time.
3.  "Database Query" on server. Duration: 8 units of time.
4.  "Render Content" on server. Duration: 3 units of time.
5.  Response from server. Duration: 4 units of time.
6.  "Download JS" on client. Duration: 5 units of time.
7.  "Hydrate" on client. Duration: 2 units of time.
8.  "Hydrate" on client. Duration: 2 units of time.

It's beyond the scope of this tutorial, but you can learn more about this architecture [on Github(opens in new tab)](https://github.com/reactwg/react-18/discussions/37).

It's also something we explore in depth in my brand-new course, [The Joy of React(opens in new tab)](https://joyofreact.com/). I'd love to tell you a little bit more about it, if that's alright! ❤️

The Joy of React is a beginner-friendly interactive course, designed to help you build an intuition for how React works. We start at the very beginning (no prior React experience required), and work our way through some of the most notoriously-tricky aspects of React.

This course has been my full-time focus for almost two years now, and it includes all of the most important stuff I've learned about React in over 10 years of experience.

There's so much good stuff I'd love to tell you about. In addition to React itself, and all the bleeding-edge stuff we've alluded to in this blog post, you'll learn about my favourite parts of the React ecosystem. For example, you'll learn how to do next-level layout animations like this, using Framer Motion:

You can learn more about the course here:

-   [The Joy of React(opens in new tab)](https://joyofreact.com/)
    

React Server Components is a significant paradigm shift. Personally, I'm _super_ keen to see how things develop over the next couple of years, as the ecosystem builds more tools like Bright that takes advantage of Server Components.

I have the feeling that building in React is about to get even cooler. 😄

### Last updated on

May 9th, 2025