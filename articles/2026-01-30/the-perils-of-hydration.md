---
title: "The Perils of Hydration"
source: "https://www.joshwcomeau.com/react/the-perils-of-rehydration/"
publishedDate: "2020-03-02"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

I ran into the strangest issue recently. Everything was groovy in development, but in production, the bottom of my blog was doing something… unintended:

![A rendering issue causes a newsletter signup form to be squashed and overlapping the article / footer content](https://www.joshwcomeau.com/images/the-perils-of-rehydration/jumbled-light-fixed.png "A hot mess of UI soup")![A rendering issue causes a newsletter signup form to be squashed and overlapping the article / footer content](https://www.joshwcomeau.com/images/the-perils-of-rehydration/jumbled-dark-fixed.png "A hot mess of UI soup")

A bit of digging into the Elements tab in the devtools revealed the culprit… My React component was rendering in the wrong spot!

```
<!-- In development, things are correct -->
​
<footer>
  <p>
    Last updated: <strong>Sometime</strong>
  </p>

  <form>
    <!-- Newsletter signup form stuff -->
  </form>
</footer>
```

```
<!-- In production, things have moved! -->
​
<footer>
  <p>
    Last updated: <strong>Sometime</strong>

    <form>
      <!-- Newsletter signup form stuff -->
    </form>
  </p>
</footer>
```

How could this be? Had I discovered a bug in React? I checked the React Devtools _Components_ tab, and it told a different story, one in which everything was fine, and the pieces were all where they were supposed to be. What a liar!

It turns out, I had a fundamental misunderstanding about how React works in a server-side-rendering context. And I think _many_ React devs share this misunderstanding! And it can have some pretty serious ramifications.

## [Link to this heading](#some-problematic-code-1)Some problematic code

Here's an example of code that can cause the kind of rendering issue shown above. Can you spot the problem?

```
function Navigation() {
  if (typeof window === 'undefined') {
    return null;
  }

  // Pretend that this function exists,
  // and returns either a user object or `null`.
  const user = getUser();

  if (user) {
    return (
      <AuthenticatedNav
        user={user}
      />
    );
  }

  return (
    <nav>
      <a href="/login">Login</a>
    </nav>
  );
};
```

For a long time, I would have believed that this code was A-OK. Right up until my blog started impersonating a Picasso painting.

This tutorial will peek behind the curtain to help us understand how server-side rendering works. We'll see why the logic shown here can be problematic, and how a different approach can accomplish the same goal.

## [Link to this heading](#server-side-rendering-onezeroone-2)Server-side rendering 101

To understand the problem, we need to first dig a little into how frameworks like Gatsby and Next.js differ from traditional client-side apps built with React.

When you use React with something like create-react-app, all of the rendering happens in the browser. It doesn't matter how large your application is, the browser still receives an initial HTML document that looks something like this:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Maybe some stuff here -->
  </head>

  <body>
    <div id="root"></div>
    <script
      src="/static/bundle.js"
    ></script>
    <script
      src="/static/0.chunk.js"
    ></script>
    <script
      src="/static/main.chunk.js"
    ></script>
  </body>
</html>
```

The page is fundamentally empty, but it includes a couple JS scripts. Once the browser downloads and parses those scripts, React will build up a picture of what the page should look like, and inject a bunch of DOM nodes to make it so. This is known as _client-side rendering_, since all the rendering happens on the client (the user's browser).

All of that stuff takes time, and while the browser and React are working their magic, the user is staring at a blank white screen. Not the best experience.

Smart people realized that if we could do that rendering on the **server**, we could send the user a fully-formed HTML document. That way, they'd have something to look at while the browser downloads, parses, and executes the JS. This is known as _server-side rendering_ (SSR).

Server-side rendering can be a performance win, but the thing is, that work still needs to be done on-demand. When you request your-website.com, React has to transform your React components into HTML, and you'll still be staring at a blank screen while you wait for it. It's that the work is being done on the server, not on the user's computer.

The galaxy-brain realization is that huge chunks of many websites and apps are static, and they can be built at _compile-time_. We can generate the initial HTML **way ahead of time**, on our development machines, and distribute it immediately when a user requests it. Our React apps can load as quickly as a vanilla HTML site!

This is exactly what Gatsby does (along with Next.js, in certain configurations). When you run `yarn build`, it generates 1 HTML document for every route on your site. Every side page, every blog post, every store item — an HTML file is created for each of them, ready to be served up immediately.

### [Link to this heading](#code-on-the-client-3)Code on the client

The apps we build nowadays are interactive and dynamic—users are accustomed to experiences that can't be accomplished with HTML and CSS alone! So we still need to run client-side JS.

The client-side JS includes the same React code used to generate it at compile-time. It runs on the user's device, and builds up a picture of what the world should look like. It then compares it to the HTML built into the document. This is a process known as _hydration_.

Critically, _hydration_ is not the same thing as a _render_. In a typical render, when props or state change, React is prepared to reconcile any differences and update the DOM. In a _hydration_, React assumes that the DOM won't change. It's just trying to adopt the existing DOM.

## [Link to this heading](#dynamic-sections-4)Dynamic sections

This takes us back to our code snippet. As a reminder:

```
const Navigation = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  // Pretend that this function exists,
  // and returns either a user object or `null`.
  const user = getUser();

  if (user) {
    return (
      <AuthenticatedNav
        user={user}
      />
    );
  }

  return (
    <nav>
      <a href="/login">Login</a>
    </nav>
  );
};
```

This component is designed to have three possible outcomes:

-   If the user is logged in, render the `<AuthenticatedNav>` component
    
-   If the user is NOT logged in, render the `<UnauthenticatedNav>` component.
    
-   If we don't know if the user is logged in or not, render nothing.
    

### [Link to this heading](#schrodingers-user-5)Schrodinger's user

In a [macabre thought experiment(opens in new tab)](https://en.wikipedia.org/wiki/Schr%C3%B6dinger%27s_cat), Austrian physicist Erwin Schrödinger describes a situation: a cat is placed in a box with a toxin that has a 50% chance of being released within an hour. After an hour, there is an equal probability that the cat is alive or dead. But until you open the box and find out, the cat can be thought of as both alive _and_ deadI think this experiment is significant from a quantum physics perspective as well, but that part isn't relevant for this analogy. Also I don't understand it..

In our webapp, we face a similar predicament; for the first few moments that a user is on our site, we don't know whether they are logged in or not.

This is because the HTML file is built at **compile-time**. Every single user gets an identical copy of that HTML, regardless of whether they're logged in or not. Once the JS bundle is parsed and executed, we can update the UI to reflect the user's state, but there is a significant gap of time before that happens. Remember, the whole point of SSG is to give the user something to look at while we download, parse, and hydrate the app, which can be a lengthy process on slow networks/devices.

Many webapps choose to show the "logged out" state by default, and this leads to a flicker you've probably run into before:

The Guardian news website shows a 'Sign in' link, before replacing it with 'Your account'.

Here’s another example from Airbnb:

Airbnb makes the same mistake, defaulting to a logged-out navigation bar.

I took the liberty of building a mini Gatsby app that reproduces this issue:

On 3G speeds, the wrong state is shown for quite a while!

### [Link to this heading](#a-noble-but-flawed-attempt-6)A noble but flawed attempt

In the shared code snippet, we attempt to solve for this problem in the first few lines:

```
const Navigation = () => {
  if (typeof window === 'undefined') {
    return null;
  }
```

The idea here is sound: Our initial compile-time build happens in Node.js, a server runtime. We can detect whether or not we're rendering on the server by checking to see if `window` exists. If it doesn't, we can abort the render early.

The problem is that in doing so, we're breaking the rules. 😬

## [Link to this heading](#hydration--render-7)Hydration ≠ render

When a React app _hydrates_, it assumes that the DOM structure will match.

When the React app runs on the client for the first time, it builds up a mental picture of what the DOM should look like, by mounting all of your components. Then it squints at the DOM nodes already on the page, and tries to fit the two together. It's not playing the “spot-the-differences” game it does during a typical update, it's just trying to snap the two together, so that _future_ updates will be handled correctly.

By rendering something different depending on whether we're within the server-side render or not, we're hacking the system. We're rendering one thing on the server, but then telling React to expect something else on the client:

```
<!-- The initial HTML
     generated at compile-time -->

<header>
  <h1>Your Site</h1>
</header>
```

```
<!-- The HTML that
     React is expecting -->
	​
<header>
  <h1>Your Site</h1>
  <nav>
    <a href="/login">Login</a>
  </nav>
</header>
```

Somewhat remarkably, React can still handle this situation sometimes. You may have done this yourself, and gotten away with it. But you're playing with fire. The hydration process is optimized to be ⚡️ fast ⚡️, not to catch and fix mismatches.

#### [Link to this heading](#about-gatsby-in-particular-8)About Gatsby in particular

The React team knows that hydration mismatches can lead to funky issues, and they've made sure to highlight mismatches with a console message:

![A dev-tools console error message: “Warning: Expected server HTML to contain a matching <div> in <nav>.”](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fthe-perils-of-rehydration%2Frehydration-warning.png&w=1200&q=75)

Unfortunately, **Gatsby only uses the server-side rendering APIs when building for production**. And because React warnings in general only fire in development, it means that these warnings are _never shown_ when building with Gatsby 😱

This is a trade-off. By opting out of server-side-rendering in dev, Gatsby is optimizing for a short feedback loop. Being able to quickly see the changes you make is so, so important. Gatsby prioritizes speed over accuracy.

This is kind of a significant problem, though; folks in [an open issue(opens in new tab)](https://github.com/gatsbyjs/gatsby/issues/17914) are advocating for a change, and we may start seeing hydration warnings.

Until then, though, it is especially important to be mindful of this when developing with Gatsby!

## [Link to this heading](#the-solution-9)The solution

To avoid issues, we need to ensure that the hydrated app matches the original HTML. How do we manage "dynamic" data then?

Here's what the solution looks like:

```
function Navigation() {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const user = getUser();

  if (user) {
    return (
      <AuthenticatedNav
        user={user}
      />
    );
  }

  return (
    <nav>
      <a href="/login">Login</a>
    </nav>
  );
};
```

We initialize a piece of state, `hasMounted`, to `false`. While it's false, we don't bother rendering the "real" content.

Inside the `useEffect` call, we immediately trigger a re-render, setting `hasMounted` to `true`. When this value is `true`, the "real" content gets rendered.

The difference from our earlier solution: **`useEffect` only fires after the component has mounted.** When the React app adopts the DOM during hydration, `useEffect` hasn't been called yet, and so we're meeting React's expectation:

```
<!-- The initial HTML
     generated at compile-time -->
	​
<header>
  <h1>Your Site</h1>
</header>
```

```
<!-- What React expects
     after hydration -->
	​
<header>
  <h1>Your Site</h1>
</header>
```

Immediately after this comparison, we trigger a re-render, and this allows React to do a proper reconciliation. It'll notice that there's some new content to render here—either an authenticated menu, or a login link—and update the DOM accordingly.

Here's what that solution looks like, in our reproduction case:

A blank spot is shown during the initial render. After mount, a re-render updates it with the true state.

## [Link to this heading](#two-pass-rendering-10)Two-pass rendering

Have you ever noticed that the expiration date on cereal clearly wasn't printed at the same time as the rest of the box? It's stamped on, after the fact:

![The top of a Lucky Charms box, showing how the expiration date is stamped imprecisely onto a large blue rectangle](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fthe-perils-of-rehydration%2Fcereal-1.jpg&w=750&q=75)

![The top of a Cheerios box, matching the Lucky Charms box with a blue rectangle and stamped expiration date](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fthe-perils-of-rehydration%2Fcereal-2.jpg&w=750&q=75)

There's a logic to this: cereal-box printing is a two-step process. First, all of the "universal" stuff is printed: the logo, the cartoon leprechaun, the enlarged-to-show-texture photograph, the random pics of smart-watches. Because these things are static, they can be mass-produced, printed millions at a time, months in advance.

They can't do that with expiration dates, though. At that moment in time, the manufacturers have no idea what the expiration date should be; the cereal that will fill those boxes probably doesn't even exist yet! So they print an empty blue rectangle instead. Much later, after cereal has been produced and injected into the box, they can stamp on a white expiration date and pack it up for shipment.

_Two-pass rendering_ is the same idea. The first pass, at compile-time, produces all of the static non-personal content, and leaves holes where the dynamic content will go. Then, after the React app has mounted on the user's device, a second pass stamps in all the dynamic bits that depend on client state.

### [Link to this heading](#performance-implications-11)Performance implications

The downside to two-pass rendering is that it can delay time-to-interactive. Forcing a render right after mount is generally frowned upon.

That said, for most applications, this shouldn't make a big difference. Usually the amount of dynamic content is relatively small, and can be quickly reconciled. If huge chunks of your app are dynamic, you'll miss out on many of the benefits of pre-rendering, but this is unavoidable; dynamic sections can't be produced ahead of time by definition.

As always, it's best to do some experimentation of your own if you have concerns around performance.

## [Link to this heading](#abstractions-12)Abstractions

On this blog, I wound up needing to defer a handful of rendering decisions to the second pass, and I was sick of writing the same logic over and over again. I created a `<ClientOnly>` component to abstract it:

```
function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div {...delegated}>
      {children}
    </div>
  );
}
```

Then you can wrap it around whichever elements you want to defer:

```
<ClientOnly>
  <Navigation />
</ClientOnly>
```

We could also use a custom hook:

```
function useHasMounted() {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
}
```

```
function Navigation() {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return null;
  }

  const user = getUser();

  if (user) {
    return (
      <AuthenticatedNav
        user={user}
      />
    );
  }

  return (
    <nav>
      <a href="/login">Login</a>
    </nav>
  );
};
```

With this trick up my sleeve, I was able to solve my rendering issue. The day was saved!

## [Link to this heading](#mental-models-13)Mental models

While neat, the abstractions aren't the most important part of this tutorial. The critical bit is the mental model.

When working in Gatsby/Next apps, I've found it really helpful to think in terms of a two-pass render. The first pass happens at compile-time, _wayyy_ ahead of time, and sets the foundation for the page, filling in everything that is universal for all users. Then, much later, a second-pass render will fill in the stateful bits that vary from person to person.

I've been building with React for over 10 years now, and I've built up a _ton_ of useful mental models for understanding how React works, and how to use it effectively. And, honestly, _I friggin’ love React_. I've tried just about every front-end framework under the sun, and nothing makes me feel as productive as React.

For the past two years, I've been assembling all of that knowledge into an online learning experience. I call it [“The Joy of React”(opens in new tab)](https://www.joyofreact.com/).

[![Visit the “Joy of React” homepage](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fjoy-of-react.png&w=3840&q=75)](https://www.joyofreact.com/)

The #1 goal of this course is to help build your intuition for React, so that you get stuck less often on weird quirks like hydration bugs, and start to enjoy developing with it! I want you to love React as much as I do!

You can learn more about the course, and discover the joy of building with React:

-   [The Joy of React(opens in new tab)](https://www.joyofreact.com/)
    

### Last updated on

December 3rd, 2025