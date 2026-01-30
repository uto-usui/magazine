---
title: "CSS Variables for React Devs"
source: "https://www.joshwcomeau.com/css/css-variables-for-react-devs/"
publishedDate: "2020-04-13"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

This is a _controversial opinion_, but I rather like CSS-in-JS. 😬🚨

But! I also really like CSS. And I don't believe that using CSS-in-JS absolves you from needing to learn it. You're writing CSS either way! It's just packaged a little bit differently.

No matter where you put your CSS, it behooves you to develop a mastery of the language. Becoming better at CSS will make you a more effective front-end developer.

In this tutorial, we're going to see how to take advantage of one of the most exciting newer developments in CSS: , AKA Custom Properties. We'll see how we can use them in our React apps to improve our workflows and do some pretty fancy stuff.

## [Link to this heading](#why-though-1)Why though?

As a React developer, you might be thinking that you don't need variables in CSS. You have an entire JavaScript engine at your disposal!

There are two reasons to switch to CSS variables in your React app:

1.  The ergonomics are nice.
    
2.  It unlocks new possibilities! You can do things with CSS variables that are **not possible** with JS.
    

Let's look at how to use them, and then we'll see what doors get unlocked!

## [Link to this heading](#quick-intro-2)Quick intro

Let's look at CSS variables in action:

Code Playground

HTML

Code editor:

Result

In this example, we're defining a new variable, `--highlight-color`, on the paragraph selector. We're using that color to apply a background color to child `<em>` elements. Whenever an `<em>` is used within a paragraph, it'll have a yellow background.

Notice how we define our CSS variables in the same way that we define typical CSS properties. This is because **CSS variables _are_ properties**. They're officially called "CSS Custom Properties", and for good reason!

CSS variables are inheritable by default, just like `font-size` or `color`. When we define a variable on an element, it is available to all of that element's children.

Many developers believe that CSS variables are global, **but this isn't quite right.** Consider this:

Code Playground

HTML

Code editor:

Result

The `em` inside this heading sets `background` to `var(--highlight-color)`, but it has no effect, because `--highlight-color` hasn't been defined for this element. It's only been defined for paragraphs, and this `<em>` tag is not within a paragraph.

Sometimes, we want our CSS variables to be global. For example, CSS variables are often used for color themes, and in this case, we want the colors to be available across the application.

We can do this by hanging our variables on the top-level element, `<html>`:

```
/*
  This variable will be available everywhere,
  because every element is a descendant of
  the HTML tag:
*/
html {
  --color-red: hsl(0deg 80% 50%);
  --color-blue: hsl(270deg 75% 60%);
}
```

The thing that makes CSS variables different from typical CSS properties is that we can _access their values_, using the `var()` function. This is what allows us to use CSS custom properties as variables.

Some other quick facts about CSS variables:

-   Custom properties need to start with two dashes. This is what differentiates them from traditional CSS properties.
    
-   They can hold any type of value, not just colors and pixels.
    
-   You can specify a default value if the CSS variable isn't defined: `var(--primary-color, pink)` will fall back to `pink` if necessary.
    

## [Link to this heading](#in-a-react-app-3)In a React app

Let's see what this looks like in React. This tutorial uses [styled-components(opens in new tab)](https://styled-components.com/), but the instructions should be relatively similar regardless of the CSS-in-JS library.

First, I'm going to assume that you have a file that holds all of your design tokens, something like this:

```
const COLORS = {
  text: 'black',
  background: 'white',
  primary: 'rebeccapurple',
};

const SIZES = [
  8,
  16,
  24,
  32,
  /* And so on */
];
```

In a React app, you might import them directly into the components that need them:

```
import { COLORS } from '../constants';

const Button = styled.button`
  background: ${COLORS.primary};
`;
```

Or, you might use a theme:

```
// components/App.js
import { ThemeProvider } from 'styled-components';

import { COLORS } from '../constants';

// This element wraps our entire application,
// to make the theme available via context.
const App = ({ children }) => {
  return (
    <ThemeProvider theme={{ colors: COLORS }}>
      {children}
    </ThemeProvider>
  );
};

// Elsewhere…
const Button = styled.button`
  background: ${(props) => props.theme.colors.primary};
`;
```

Here's the same code, but set up using CSS variables:

```
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    --color-text: black;
    --color-background: white;
    --color-primary: rebeccapurple;
  }
`;

const App = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
};
```

(If you're not familiar with `createGlobalStyle`, it allows us to write unscoped CSS, as if we were writing it in a `styles.css` file.)

We've created some variables, hung them on the root node, and now we can access them in our components:

```
const Button = styled.button`
  background: var(--color-primary);
`;
```

This is a nice little win, in my opinion. Being able to access theme values without an import or an inline function is a breath of fresh air. You do lose some static typing benefits—more on this later—but it's a very happy tradeoff in my eyes.

This is a relatively minor difference, though. Let's look at something more interesting…

## [Link to this heading](#changing-values-not-variables-4)Changing values, not variables

So let's say we have a Button component.

Code Playground

import styled from 'styled-components';

const Button = styled.button\`
  min-height: 32px;
  padding: 0 32px;
  border-radius: 16px;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-shadow: 1px 1px 0px #3a00df;
  background: linear-gradient(170deg, #359eff 5%, #3a00df 95%);
\`;

function App() {
  return (
    <Button width\={60}\>
      Hello World
    </Button\>
  );
}

export default App;

It looks alright, but we get feedback that the click target is too small on mobile devices: industry guidelines are that interactive elements should be between [44px and 48px tall(opens in new tab)](https://medium.com/@zacdicko/size-matters-accessibility-and-touch-targets-56e942adc0cc). We need to bump up the size to make it easier to tap on phones.

Let's walk through a possible solution, _not_ using CSS variables.

```
const Button = styled.button`
  /* Omitted other styles for brevity */
  min-height: 32px;

  @media (pointer: coarse) {
    min-height: 48px;
  }
`;
```

Two quick notes about this code:

-   I'm using `min-height` instead of `height` so that the buttons can grow if needed. This can happen if the user cranks up their default font size, or if the text has to line-wrap.
    
-   Instead of using a width-based media query, I'm using `pointer: coarse`. This media query tracks whether the user's primary input mechanism is fine or coarse. A mouse or a trackpad is considered "fine" because you can control its position to the pixel. A finger or a Wii remote is less precise. We don't actually care what size the screen is, we care whether they can click or tap precisely or not.
    

We ship this change, and we sleep a little bit better knowing that we've improved the usability of our app.

We quickly learn that our work isn't done, however. Buttons are not the only tappable elements in our apps! There's also text inputs, among others.

Let's update our `TextInput` component as well. To keep things DRY, we'll store our sizes on our theme:

```
const App = ({ children }) => {
  return (
    <ThemeProvider
      theme={{
        colors: COLORS,
        coarseTapHeight: 48,
        fineTapHeight: 32,
      }}
    >
      {children}
    </ThemeProvider>
  );
};
```

We use those values in both of our components:

```
const Button = styled.button`
  min-height: ${(props) => props.theme.fineTapHeight}px;

  @media (pointer: coarse) {
    min-height: ${(props) => props.theme.coarseTapHeight}px;
  }
`;

const TextInput = styled.input`
  min-height: ${(props) => props.theme.fineTapHeight}px;

  @media (pointer: coarse) {
    min-height: ${(props) => props.theme.coarseTapHeight}px;
  }
`;
```

This is a significant chunk of CSS to be lugging around to any tappable element!

Now, we could solve this in a number of ways, using a styled-component mixin or a CSS class. But I think the best way to solve this problem is with CSS variables.

Instead of imperatively specifying how each component should respond at different breakpoints, what if we passed it a _reactive variable_ that tracked that for us?

```
const GlobalStyles = createGlobalStyle`
  html {
    --min-tap-target-height: 32px;

    @media (pointer: coarse) {
      --min-tap-target-height: 48px;
    }
  }
`;
```

With this magic CSS variable, our responsive components get so much simpler:

```
const Button = styled.button`
  min-height: var(--min-tap-target-height);
`;

const TextInput = styled.input`
  min-height: var(--min-tap-target-height);
`;
```

I'll be the first to admit: the first time you see this pattern, it seems a bit funky. It requires a mental model shift. But it's super compelling, in my opinion!

We're all used to using CSS media queries to apply a different chunk of CSS in different scenarios. But what if we kept the CSS _properties_ the same, and changed the _values_?

Inside our components, `min-height` always points to the same value, `--min-tap-target-height`, but that value is _dynamic_.

Let's look at some of the benefits:

-   By consolidating the breakpoint stuff in a single place, we now have a single source of truth. Before, it was possible for a wayward developer to accidentally delete one of the breakpoints, leading to inconsistent behavior. Now it's packaged into a resilient variable.
    
-   It lets us be more explicit about why we're doing this. We're giving it a name—`min-tap-target-height`—which communicates _why_ we need to set a `min-height` value in the first place.
    
-   It's more declarative! Instead of specifying _how_ each component should change based on the pointer type, we're telling it _what_ the value should be.
    

The ["Principle of Least Knowledge"(opens in new tab)](http://www.ericfeminella.com/blog/2008/02/02/principle-of-least-knowledge/) is the idea that code should only have access to stuff directly adjacent to it, and not "reach over" into a totally different part of the codebase. I feel like if we squint a little, that same idea applies here.

Another quick example: we can do the same trick for our theme variables, so that each viewport has its own scale.

```
const GlobalStyles = createGlobalStyle`
  html {
    --space-sm: 8px;
    --space-md: 16px;

    @media (min-width: 1024px) {
      --space-sm: 16px;
      --space-md: 32px;
    }
  }
`;

// Elsewhere...
const Paragraph = styled.p`
  padding: var(--space-sm);
`;
```

instead of having the same scale for every window size, we can have custom scales for each breakpoint. This leads to much more consistent user interfaces, and much less fussing around inside each individual component.

## [Link to this heading](#other-new-possibilities-5)Other new possibilities

So far, everything we've talked about is about the developer experience. We've looked at alternative ways to solve problems.

Let's look now at some of the problems that CSS variables are uniquely equipped to solve, leading to improved user experiences.

### [Link to this heading](#animate-any-property-6)Animate any property

There are some CSS properties that simply can't be animated. If you've ever tried to animate a linear or radial gradient, for example, you've realized pretty quickly that it doesn't work.

With CSS variables, you can animate _any property_, because you aren't applying the transition to the property, you're applying the transition **to the value**.

For example, here's a fun gradient animation, made possible with CSS variables:

Read more about this button in my tutorial, ["Magical Rainbow Gradients"](https://www.joshwcomeau.com/react/rainbow-button/).

### [Link to this heading](#dark-mode-flash-fix-7)“Dark Mode” flash fix

If you've tried to implement a "Dark mode" variant, you've probably been bitten by this tricky situation: for a brief moment, the wrong colors flash:

"Dark Mode" is surprisingly tricky, _especially_ in a server-rendered context (like with Next.js or Gatsby). The problem is that the HTML is generated long before it reaches the user's device, so there's no way to know which color theme the user prefers.

We can solve this with CSS variables and a dash of cleverness. I wrote about this approach in my blog post, [The Quest for the Perfect Dark Mode](https://www.joshwcomeau.com/react/dark-mode/).

## [Link to this heading](#getting-and-setting-8)Getting and Setting

In the example above, we hardcode our theme values in a `GlobalStyles` component:

```
const GlobalStyles = createGlobalStyle`
  html {
    --color-text: black;
    --color-background: white;
    --color-primary: rebeccapurple;
  }
`;
```

There may be times where you need to access these values in JavaScript.

If you'd like, you can keep storing them in a `constants.js` file. They'll be used to instantiate the CSS variables, but then also imported wherever you need the raw values in JS:

```
const GlobalStyles = createGlobalStyle`
  html {
    --color-text: ${COLORS.text};
    --color-background:  ${COLORS.background};
    --color-primary:  ${COLORS.primary};
  }
`;
```

Another idea, though, is to use CSS as the source of truth. You can access the values with a bit of JS:

```
// Get the value of a CSS variable:
getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary');

// Set the value of a CSS variable:
document.documentElement.style.setProperty(
  '--color-primary',
  someNewValue
);
```

Getting and setting CSS variables from JS is an escape hatch. You might be surprised how rarely you need it! You can even use CSS variables within embedded SVGs 😮

## [Link to this heading](#drawbacks-9)Drawbacks

### [Link to this heading](#no-types-10)No types

Probably the biggest downside to using CSS variables for themes is that there's no way to statically type them (via Typescript or Flow).

In my mind, this isn't a huge deal; I've been on both sides of this river. Having a typed theme object is nice, but I can't say that it's saved me a ton of time. Generally, it's obvious when you mistype the name of a CSS variable, and it's a quick fix.

I think it's important to run compile-time checks on your site, but I think tools like [Chromatic(opens in new tab)](https://www.chromaticqa.com/) are a much more reliable check. They run in CI and capture any differences in the rendered visual output.

That said, if type-safety is a must-have, you don't have to give it up! You'd just need to keep your styles in a JS object, and interpolate them in. Fatih Kalifa shows how he set up his types for CSS variables by creating a `cvar` function which accepts a known set of keys:

![screenshot of code showing a “cvar” function that provides intellisense autocomplete](https://www.joshwcomeau.com/images/css-variables-for-react-devs/typesafe.png)

### [Link to this heading](#browser-support-11)Browser support

CSS variables have been around for years, and are comfortably supported in all major browsers:

There’s one caveat: the ability to _animate_ CSS variables is a bit newer. This is required for the gradient button demo earlier. As I write this in June 2024, this feature is available in all major browsers except Firefox, and Firefox support is landing in the next version.

### [Link to this heading](#not-as-loose-12)Not as loose

When using styled-components, you can put variables wherever you want, including within media queries:

```
const Ymca = styled.abbr`
  font-size: 1rem;

  @media (max-width: ${(p) => p.bp.desktop}) {
    font-size: 1.25rem;
  }
`;
```

CSS variables can't be used anywhere within media queries. There is chatter around letting users describe their own _environment_ variables with `env()`, which would allow for this… But it has yet to materialize.

Despite these drawbacks, however, CSS variables open a lot of really interesting doors. I've been using them for a few years now (including on this very blog!) and I love them. They're my preferred way to manage dynamic styles.

## [Link to this heading](#the-holy-trinity-13)The holy trinity

As web developers, we work with 3 primary technologies: HTML, CSS, and JS. In order to work effectively, we need to be comfortable with all 3.

I know lots of devs who have a pretty solid grasp of HTML and JS, but who struggle with CSS. I was in this group myself, for years!

CSS is a deceptively complex language. The basics can be learned quickly and (relatively) easily, but it's an incredibly difficult language to master.

When we write CSS, we're only seeing the tip of the iceberg. It's a very _implicit_ language. All sorts of secret mechanisms leap into action, tweaking the effects of our CSS properties in surprising, inscrutable ways.

CSS doesn't have error messages or console logs. We write CSS, and either the result is what we expect, or it isn't. When things go wrong, it can make us feel powerless. We wind up throwing random CSS properties at the wall, hoping one of them will do what we want.

**I want to help.** I recently released a CSS course, [CSS for JavaScript Developers(opens in new tab)](https://css-for-js.dev/). It's built specifically for folks who use a JS framework like React. It teaches you how CSS _actually_ works, to build out your mental model so that you develop an intuition for the language.

It's not like other courses you've taken. There are over 150 videos, but it's not a video course. It's an interactive, multi-modality, self-paced adventure. There are plenty of exercises, real-world-inspired projects, and even a few mini-games. It uses a custom-built platform which is unlike anything you've used before.

If you struggle with CSS, I hope you'll check it out. Gaining confidence with CSS is game-changing, especially if you're already comfortable with HTML and JS. When you complete the holy trinity, it becomes so much easier to stay in flow, to truly enjoy developing web applications.

Learn more here:

### Last updated on

May 9th, 2025