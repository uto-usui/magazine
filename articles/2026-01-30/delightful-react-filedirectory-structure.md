---
title: "Delightful React File/Directory Structure"
source: "https://www.joshwcomeau.com/react/file-structure/"
publishedDate: "2022-03-15"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

React is famously unopinionated when it comes to file/directory structure. How should you structure the files and directories in your applications?

Well, there is no one “right” way, but I've tried _lots_ of different approaches since I started using React in 2015, and I've iterated my way to a solution I'm _really_ happy with.

In this blog post, I'll share the structure I use across all my current projects, including this blog and my custom course platform.

## [Link to this heading](#interactive-file-explorer-1)Interactive file explorer

Alright, so I'll explain everything in depth, but I thought it'd be fun to let you take a self-guided tour first.

Here's an _interactive_ file explorer. Feel free to poke around and see how things are structured!

## [Link to this heading](#my-priorities-2)My priorities

Let's start by talking about my priorities, the things I've optimized for.

First, I want to make it easy to import components. I want to be able to write this:

```
import Button from '../Button';

// Or, using bundle aliases:
// (We'll talk about this further down!)
import Button from '@/components/Button';
```

Next: when I'm working in my IDE, I don't want to be flooded with index files. I've worked in projects where the top bar looked like this:

![A bunch of files open, all called “index.js”](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Ffile-structure%2Findex.png&w=1920&q=75)

To be fair, most editors will now include the parent directory when multiple index files are open at once, but then each tab takes up way more space:

![A bunch of files open, formatted like “index.js - /RainbowButton”](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Ffile-structure%2Findex-slightly-better.png&w=1920&q=75)

![A bunch of files open, formatted like “index.js - /RainbowButton”](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Ffile-structure%2Findex-slightly-better-mobile.png&w=1080&q=75)

My goal is to have nice, clean component file names, like this:

![A bunch of files open, with proper names like “RainbowButton.js”](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Ffile-structure%2Findex-fixed.png&w=1920&q=75)

![A bunch of files open, with proper names like “RainbowButton.js”](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Ffile-structure%2Findex-fixed-mobile.png&w=1080&q=75)

Finally, in terms of organization, I want things to be organized by function, not by feature. I want a “components” directory, a “hooks” directory, a “helpers” directory, and so on.

Sometimes, a complex component will have a bunch of associated files. These include:

-   "Sub-components", smaller components used exclusively by the main component
    
-   Helper functions
    
-   Custom hooks
    
-   Constants or data shared between the component and its associated files
    

As a real example, let's talk about the `FileViewer` component, used in this blog post for the “interactive file explorer” demo. Here are the files created specifically for this component:

-   `FileViewer.tsx` — the main component
    
-   `FileContent.tsx` — the component that renders the contents of a file, with syntax highlighting
    
-   `Sidebar.tsx` — The list of files and directories that can be explored
    
-   `Directory.tsx` — the collapsible directory, to be used in the sidebar
    
-   `File.tsx` — An individual file, to be used in the sidebar
    
-   `FileViewer.helpers.ts` — helper functions to traverse the tree and help manage the expanding/collapsing functionality
    
-   `FileViewer.types.ts` — TypeScript types for anything used by multiple files within this directory.
    

Ideally, all of these files should be tucked away, out of sight. They're only needed when I'm working on the `FileViewer` component, and so I should only see them when I'm working on `FileViewer`.

## [Link to this heading](#the-implementation-3)The implementation

Alright, so let's talk about how my implementation addresses these priorities.

### [Link to this heading](#components-4)Components

Here's an example component, with all the files and directories required to accomplish my goals:

```
src/
└── components/
    └── FileViewer/
        ├── Directory.tsx
        ├── File.tsx
        ├── FileContent.tsx
        ├── FileViewer.helpers.ts
        ├── FileViewer.types.ts
        ├── FileViewer.tsx
        ├── index.ts
        └── Sidebar.tsx
```

Most of these files are the ones mentioned earlier, the files needed for the `FileViewer` component. The exception is `index.ts`. That's new.

If we open it up, we see something a bit curious:

```
export * from './FileViewer';
export { default } from './FileViewer';
```

This is essentially a redirection. When we try to import this file, the bundler will be “forwarded” to `./FileViewer.tsx`, and will pull the import from that file instead. `FileViewer.tsx` holds the _actual_ code for this component.

**Why not keep the code in `index.ts` directly?** Well, then our editor will fill up with `index.ts` files! I don't want that.

**Why have this file at all?** It simplifies imports. Otherwise, we'd have to drill into the component directory and select the file manually, like this:

```
import FileViewer from '../FileViewer/FileViewer';
```

With our `index.ts` forwarding, we can shorten it to just:

```
import FileViewer from '../FileViewer';
```

**Why does this work?** Well, `FileViewer` is a directory, and when we try to import a directory, the bundler will seek out an index file (`index.js`, `index.ts`, etc). This is a convention carried over from web servers: `my-website.com` will automatically try to load `index.html`, so that the user doesn't have to write `my-website.com/index.html`.

In fact, I think it helps to think of this in terms of an HTTP request. When we import `src/components/FileViewer`, the bundler will see that we're importing a directory and automatically load `index.ts`. The `index.ts` does a metaphorical _301 REDIRECT_ to `src/components/FileViewer/FileViewer.tsx`.

It may seem over-engineered, but this structure ticks all of my boxes, and I love it.

### [Link to this heading](#hooks-5)Hooks

If a hook is specific to a component, I'll keep it alongside that component. But what if the hook is generic, and meant to be used by lots of components?

In this blog, I have about 50 generalized, reusable hooks. They're collected in the `src/hooks` directory. Here are some examples:

(This code is real! it's provided here as an example, but feel free to copy the hooks you're interested in.)

### [Link to this heading](#helpers-6)Helpers

What if I have a function that will help me accomplish some goal for the project, not directly tied to a specific component?

For example: this blog has multiple blog post categories, like React, CSS, and Animations. I have some functions that help me sort the categories by the number of posts, or get the formatted / "pretty" name for them. All that stuff lives in a `category.helpers.ts` file, inside `src/helpers`.

Sometimes, a function will start in a component-specific file (eg. `FileViewer/FileViewer.helpers.ts`), but I'll realize that I need it in multiple spots. It'll get moved over to `src/helpers`.

### [Link to this heading](#utils-7)Utils

Alright, so this one requires some explanation.

A lot of devs treat "helpers" and "utils" as synonyms, but I make a distinction between them.

A helper is something specific to a given project. It wouldn't generally make sense to share helpers between projects; the `category.helpers.ts` functions really only make sense for this blog.

A utility is a generic function that accomplishes an abstract task. Pretty much every function in the `lodash` library is a utility, according to my definition.

For example, here's a utility I use a lot. It plucks a random item from an array:

```
export function sampleOne<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
```

I have a `utils.ts` file full of these sorts of utility functions.

**Why not use an established utility library, like lodash?** Sometimes I do, if it's not something I can easily build myself. But no utility library will have all of the utilities I need.

For example, this one moves the user's cursor to a specific point within a text input:

```
export function moveCursorWithinInput(
  input: HTMLInputElement,
  position: number
) {
  // All modern browsers support this method, but we don't want to
  // crash on older browsers.
  if (!input.setSelectionRange) {
    return;
  }

  input.focus();
  input.setSelectionRange(position, position);
}
```

And this utility gets the distance between two points on a cartesian plane (something that comes up surprisingly often in projects with non-trivial animations):

```
type PointObj = { x: number; y: number };

export const getDistanceBetweenPoints = (
  p1: PointObj,
  p2: PointObj
) => {
  const deltaX = Math.abs(p2.x - p1.x);
  const deltaY = Math.abs(p2.y - p1.y);

  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};
```

These utilities live in `src/utils.ts`, and they come with me from project to project. I copy/paste the file when I create a new project. I _could_ publish it through NPM to ensure consistency between projects, but that would add a significant amount of friction, and it's not a trade-off that has been worth it to me. Maybe at some point, but not yet.

### [Link to this heading](#constants-8)Constants

Finally, I also have a `constants.ts` file. This file holds app-wide constants. Most of them are style-related (eg. colors, font sizes, breakpoints), but I also store public keys and other “app data” here.

### [Link to this heading](#pages-9)Pages

One thing not shown here is the idea of “pages”.

I've omitted this section because it depends what tools you use. When I use something like create-react-app, I don't have pages, and everything is components. But when I use Next.js, I do have `/src/pages`, with top-level components that define the rough structure for each route.

## [Link to this heading](#tradeoffs-10)Tradeoffs

Every strategy has trade-offs. let's talk about some of the downsides to the file structure approach outlined in this blog post.

### [Link to this heading](#barrel-files-11)Barrel files

As I [mentioned above](#aside-the-anti-barrel-movement), this pattern uses “barrel files”. Each main component directory has an `index.ts` that does nothing except re-export other stuff from its sibling files.

In theory, this is a problem because it means the bundler has to do a lot more work, but I don’t believe it’s something that most of us need to worry about.

This blog has about 1200 TS/JS files, and ~15% of them are barrel files. My `node_modules` directory, by contrast, has ~50k TS/JS files. So really, the bundler will spend most of its time dealing with third-party dependencies. Less than 1% of the modules that the bundler encounters will be barrel files that I’ve created.

If you’re working on an NPM package, it’s probably a good idea to avoid barrel files, especially if it’s a library like lodash with hundreds of individual modules. But I don’t really think it’s a significant issue if you’re building web applications, unless that application has tens of thousands of files and millions of lines of code. This is a scale that very few applications will ever hit, so I think it would be a premature optimization to worry about it now. If your application _does_ grow to that size, you can always let an LLM agent do the tedious refactoring work for you.

### [Link to this heading](#more-boilerplate-12)More boilerplate

Whenever I want to create a new component, I need to generate:

-   A new directory, `Widget/`
    
-   A new file, `Widget/Widget.tsx`
    
-   The index forwarder, `Widget/index.ts`
    

That’s a lot of tedious stuff to do, whenever we need a new component!

**Fortunately, I don't have to do any of that manually.** I created an NPM package, [new-component(opens in new tab)](https://www.npmjs.com/package/new-component), which does all of this for me automatically.

In my terminal, I type:

```
nc Widget
```

When I execute this command, all of the boilerplate is created for me, including the basic component structure I'd otherwise have to type out! It's an incredible time-saver, and in my opinion, it totally nullifies this drawback.

You're welcome to use my package if you'd like! I’m not actively maintaining it, but you can always fork it to make whatever alterations you wish, and to match your preferred conventions.

### [Link to this heading](#issues-with-the-app-router-13)Issues with the App Router

As I shared in [“How I Built My Blog”](https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/#app-router-vs-pages-router-16), I recently migrated this blog to Next’s new App Router. Unfortunately, when I use my `new-component` package as-is, I get an error:

```
**Syntax error:** the name `default` is exported multiple times
```

This is because my barrel files have the following structure:

```
export * from './FileViewer';
export { default } from './FileViewer';
```

Essentially, the bundler is upset because `*` exports _everything_, including `default`. So it’s being exported twice.

When I omit the second import, however, I get a different error during build:

```
**Type error:** Module "/components/FileViewer/index" has no default export.
```

Frustrating! The only solution I’ve found is to remove the wildcard import:

```
export { default } from './FileViewer';
```

This isn’t as nice, since it means _nothing else_ will be exported. Sometimes I also want to use named exports, and with this approach, I have to remember to add them manually:

```
export { default, SomethingElse } from './FileViewer';
```

I haven’t had the bandwidth to look into this; if you’d like to use my [new-component(opens in new tab)](https://www.npmjs.com/package/new-component) package with the Next.js App Router, I suggest forking it and removing [this line(opens in new tab)](https://github.com/joshwcomeau/new-component/blob/main/src/index.ts#L67) from the code.

### [Link to this heading](#organized-by-function-14)Organized by function

In general, there are two broad ways to organize things:

-   By function (components, hooks, helpers…)
    
-   By feature (search, users, admin…)
    

Here's an example of how to structure code by feature:

```
src/
├── base/
│   └── components/
│       ├── Button.tsx
│       ├── Dropdown.tsx
│       ├── Heading.tsx
│       └── Input.tsx
├── search/
│   ├── components/
│   │   ├── SearchInput.tsx
│   │   └── SearchResults.tsx
│   └── search.helpers.ts
└── users/
    ├── components/
    │   ├── AuthPage.tsx
    │   ├── ForgotPasswordForm.tsx
    │   └── LoginForm.tsx
    └── use-user.ts
```

There are things I really like about this. It makes it possible to separate low-level reusable “component library” type components from high-level template-style views and pages. And it makes it easier to quickly get a sense of how the app is structured.

**But here's the problem:** real life isn't nicely segmented like this, and categorization is actually _really hard_.

I've worked with a few projects that took this sort of structure, and every time, there have been a few _significant_ sources of friction.

Every time you create a component, you have to decide where that component belongs. If we create a component to search for a specific user, is that part of the “search” concern, or the “users” concern?

Often, the boundaries are blurry, and different developers will make different decisions around what should go where.

When I start work on a new feature, I have to find the files, and they might not be where I expect them to be. Every developer on the project will have their own conceptual model for what should go where, and I'll need to spend time acclimating to their view.

**And the problems compound over time.** Products are always evolving and changing, and the boundaries we draw around features today might not make sense tomorrow. When the product changes, it will require _a ton_ of work to move and rename all the files, to recategorize everything so that it's in harmony with the new version of the product.

**Realistically, that work won't actually get done.** It's too much trouble; the team is already working on stuff, and they have a bunch of half-finished PRs, where they're all editing files that will no longer exist if we move all the files around. It's possible to manage these conflicts, but it's a big pain.

And so, in my experience, the distance between _product_ features and the _code_ features will drift further and further apart over time. Eventually, the features in the codebase will be conceptually organized around a product that no longer exists, and so everyone will just have to memorize where everything goes. Instead of being intuitive, the boundaries become totally arbitrary at best, and misleading at worst.

To be fair, it _is_ possible to avoid this worst-case scenario, but it's a lot of extra work for relatively little benefit, in my opinion.

**But isn't the alternative too chaotic?** It's not uncommon for larger projects to have _thousands_ of React components. If you follow my function-based approach, it means you'll have an enormous set of unorganized components sitting side-by-side in `src/components`.

I haven’t personally found any problems with this. I don’t generally scan through the full list of components looking for one in particular; I generally hop between files using the IDEs like VS Code will let you jump to specific files by opening a dialog and entering the first few letters of the filename., so it doesn't really matter how many components there are.

## [Link to this heading](#bundle-aliases-15)Bundle aliases

Modern JavaScript bundlers like Webpack have a feature known as _aliases._ An alias is a global name that points to a specific file or directory. For example:

```
// This:
import { sortCategories } from '../../helpers/category.helpers';

// ...turns into this:
import { sortCategories } from '@/helpers/category.helpers';
```

**Here's how it works:** I create an alias called `@/helpers` which will point to the `/src/helpers` directory. Whenever the bundler sees `@/helpers`, it replaces that string with a relative path for that directory.

The main benefit is that it turns a relative path (`../../helpers`) into an absolute path (`@/helpers`). I never have to think about how many levels of `../` are needed. And when I move files, I don't have to fix/update any import paths.

Implementing bundle aliases is beyond the scope of this blog post, and will vary depending on the meta-framework used, but you can learn more in [the Webpack documentation(opens in new tab)](https://webpack.js.org/configuration/resolve/).

## [Link to this heading](#the-joy-of-react-16)The Joy of React

So, that's how I structure my React applications!

As I mentioned right at the top, there's no right/wrong way to manage file structure. Every approach prioritizes different things, makes different tradeoffs.

Personally, though, I've found that this structure stays out of my way. I'm able to spend my time doing what I like: building quality user interfaces.

_React is so much fun._ I've been using it since 2015, and I _still_ feel excited when I get to work with React.

For a few years, I taught at a local coding bootcamp. I've worked one-on-one with _tons_ of developers, answering their questions and helping them get unstuck. I wound up developing the curriculum that this school uses, for all of its instructors.

I want to share the joy of React with more people, and so for the past couple of years, I've been working on something new. An online course that will teach you how to build complex, rich, whimsical, accessible applications with React. The course I wish I had when I was learning React.

[![Visit the “Joy of React” homepage](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fjoy-of-react.png&w=3840&q=75)](https://www.joyofreact.com/)

You can learn more about the course, and discover the joy of building with React:

-   [The Joy of React(opens in new tab)](https://www.joyofreact.com/)
    

## [Link to this heading](#bonus-exploring-the-fileviewer-component-17)Bonus: Exploring the FileViewer component

Are you curious how I built that `FileViewer` component up there?

I'll be honest, it's not my _best_ work. But I did hit some interesting challenges, trying to render a recursive structure with React!

If you're curious how it works, you can use the FileViewer component to explore the FileViewer source code. Not all of the context is provided, but it should give you a pretty good idea about how it works!

### Last updated on

December 3rd, 2025