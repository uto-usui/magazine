---
title: "React at 60fps: improving scrolling comments in Figma"
source: "https://www.figma.com/blog/improving-scrolling-comments-in-figma/"
publishedDate: "2020-08-19"
category: "design"
feedName: "Figma Blog"
---

_Over the past few weeks, you may have noticed that comment pins started scrolling more smoothly as you pan around the canvas. We’ve recently improved frame rate per second performance three-fold. [Kiko Lam](https://twitter.com/kiko_lamb), an engineer on Figma’s collaboration team, shares how she approached this project—investigating the underlying cause of slow performance, challenges with comment implementation, and our results and next steps._

Figma enables closer collaboration between designers and non-designers by tightening the feedback loop. By commenting directly on a file or prototype, teammates have important context, without needing to send files back and forth.

Since [we first introduced Figma](https://www.figma.com/blog/design-meet-the-internet/)

, we’ve been making consistent improvements to reach new levels of scale. As more users leave an increasing number of comments on their files, we started to observe performance problems. Knowing that Figma supports teams and organizations of all sizes, we had to do better. So, we kicked off a project to improve the speed at which comments respond when users zoom and pan on the canvas.

## [React faster, per second](#react-faster-per-second)

Our primary goal was to render the editor at 60fps. No matter how our users collaborated, or how many comments and threads they created, we wanted to the editor to perform at a speed that could flex to support them.

### [But first, infrastructure](#but-first-infrastructure)

Before we dive into performance, it’s important to understand a bit about Figma’s technology. Figma is built on an unconventional stack—like our [CTO Evan shared](https://www.figma.com/blog/building-a-professional-design-tool-on-the-web/)

, we essentially made “a browser inside a browser.” Our design editor is powered by

[WebGL

![cascading browser windows and a pen tip drawing a diagonal dotted line](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB5UlEQVQ4jdXTv4vaUADAcfMSoyZoMjVncmCWtLEQ2yLGHucZNIMOioL/gYOD/4BD3PIH5C8Q7qoHTo6ig46Km+AouAUEByO6aOJdacxx9Y5ScGo/01u+7wfvPZfrPwdB0IUlgiAkQVxdfaDpIMPQ1wxz/Q7DMDRNUxSF4zgAwFkMAoAgiM9h/uZ77Pb2RpIkOZ2WZTl9LpVKSZIkiiLDMCiK/oohCIJhOBgMSsk7WU59/faF//Tq4zmO40KhEEmSMAw7MYIggiAoiqJpWqVSSSQSLMsSBOF94XmBoqjb7XZKl8sFAPD5fJlMptfr6bo+nU7b7XatVstms+FwmKIoDMOQ38Aw/HpgAACGYcVicTweW5ZlmuZms5nP5/1+X9O0crksiuJpCrcNQZC3caFQGI1GlmU92SzL2u12uq5PJpNGo1GtVpPJJMuyfr8fRdG/x4fDwTTN/X6/Wq1ms1mn06nX6/l8nuf5QCDg9G+2fYpN2/F4fHp25tput4vFYjAYqKoaj8cxDAMAOHEulxsOh+v12jAMY22cBptzhmEsl8tut1sqlUiSdGKPxxOLxVRVbTabP2ytZuu9x9bjw/2DoijRaNTr9Tr3DOwXxnFcJBIRbJE/EASBZVkcxy/8CJDtwi/0b/gJ2zrxO409VIsAAAAASUVORK5CYII=)![cascading browser windows and a pen tip drawing a diagonal dotted line](https://cdn.sanity.io/images/599r6htc/regionalized/ea7f15c982b857dc36e4479ac4b683e758ed0b35-1416x1416.png?w=1416&h=1416&q=75&fit=crop&crop=focalpoint&auto=format)

### Building a professional design tool on the web

Our vision for the future of design tools is one where both the tool and the content are easily available to anyone, anywhere.



](https://www.figma.com/blog/building-a-professional-design-tool-on-the-web/)

and

[WebAssembly

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAABAElEQVQoz62SO4qEQBRF/Yu/FkRENFEDwQ+Cse7A3MwtmJoZm7gBA2MDcSeGruc2VclM97QTdXCpqncfp3i3imEYBr/FsuyL3v33vg/ez+HxeKAoCtR1jaqqkGUZdF3/A1IUBaZpUo/n+XtgHMcYxxHHcWDfdwzDgDAMwXEcBEGgMLLato0gCOD7PoXfAsuyxLquuK4L53linmckSQJJkqCqKoWRved5SNOUXkbqt8A8zzFNE7Ztw7Is6PseURRBFEXIskzHI0DXdWndcRzq3QJJY9M06LoObdvSLC3LenkAAjUMg2ZI4P8+ChmJNBMIkaZpn0KnmRLd/AAGX9Z3gU/gHtjWtex8CQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/ccdc497d27cc1c9abb7c7cb07e7c1a57d4c711be-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### WebAssembly cut Figma's load time by 3x

WebAssembly was just released this past March but has already generated a lot of excitement in the web community.



](https://www.figma.com/blog/webassembly-cut-figmas-load-time-by-3x/)

, with some of the user interface implemented in Typescript and React. Unlike most static interfaces built in React, comments are dynamic, and they can pan and zoom as part of the canvas. As you scroll around the canvas, we anchor your comment to something we call a comment pin, which ensures that your feedback stays exactly where you want it.

To do so, we need to get constant viewport updates from our editor. The viewport updates are stored in Redux and retrieved by the comment components. Each comment pin component uses this information to calculate where the comment pins should be rendered on the canvas in relation to the viewport.

## [Getting to the bottom of slow performance](#getting-to-the-bottom-of-slow-performance)

In order to improve performance on this particular view, we needed to identify what was slowing it down. We used two main tools: Chrome performance tools and React Profiler.

### [Components constantly re-render](#components-constantly-re-render)

The profile generated from the Chrome performance tools shows that most of the time was spent on JavaScript (JS). About 68ms per frame is spent on JS on a page with 30 comments and only a small port of the computing time per frame is spent on rendering and painting. Scripting refers to JS events and event handlers; rendering and painting have to do with the translation of HTML elements to displayable on-screen elements. It’s promising that most improvement could be done on the JS and React optimization, but we still needed to understand more of what’s happening under the hood of rendering the comment components in React.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAABYlAAAWJQFJUiTwAAACSUlEQVQ4y5WS527bMBSF9f6PVhQFmtqN463JJUrUlpzmqIe0A6RF86MyPpC+4+gORbv8hKtKkekikBuBvFRIjUKsBBIlUfC/sJqogKw0MVDk/QyUEtEpT1BIAaUVtNEobYmqrgK2KmGtQVV5m6FPwVDcMrl2FZyr7zSOJ2FOdM5iFKKAlgzWFDQGtqRQybvOUbL6d4yMoUUMo7Lgr/zLAzbgc6N9fMY1TZBmGbIih5ASktVKtitkBiGSgJTpB2iXBQvJkRcZOyyYI0NOtL3ssbscsTsfcEwuKIyEcRa6to8ZcV6cn+bd20u2auqScQVOyQn78x5JkdDGzhqL6CITxDRcKJbLHO3QYbrNmJYZ4zJhmEf004Bxnu7220LfhKZzyETK7s4wfOm0jFheZ0TKUZnVaLZZc8C32w1vwJ+83c/3542/hcI1l2C4yGHoGeMjVkSFSblJAcsWXKUw9jXmsXnQYvFMLW5zh9elx81Xwqon2lsW43OGrmKM9w/c8vkrRPIdOn2CyZ5QiQ1qj9zCedRPNPoZndmhL/foqhiNzWk/0b9j3HOgMS/o7QHR8fgNefwDOtvA5BtYsQ0BTu0o9ILWiwQO6OyRginaSlDgilYfeR7h9IFxd390zS+cA5fhSrTcUsMN9q1vu2NrA1sly+MM94nMoW3v/4j3R1I+r111WZexXsdhWJ1r1mEYVw555ZA/AZ/6olJ+wWi3eB01xrFH0zSYpjHscmVMyP5XKv7iYY9qu8HcnvBrdkGo73ssyxI+jzUU83/Pb0dvJnZogNHWAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/9a45814771f7ed1d327481b7c67b576ce656cd36-2944x2058.png?w=804&h=562&q=75&fit=max&auto=format)

Chrome performance tool shows we spent the majority of time on scripting and rendered the comments view at 19fps with 30 comment threads

We used React Profiler to pinpoint which components were actually re-rendering. React profile shows that only about 1.8ms is spent rendering the comments view. This re-rendering is necessary because its content is changing. However, from the React Profile, we observed that a lot of time was consumed rendering many fixed position components like the left panel, toolbar view, and properties panel. But intuitively, only the comment should care about the viewport change, not these fixed components. The biggest inefficiency that creeps in as React applications grow is needlessly re-rendering components, which is exactly what we observed. This was a red flag, and we needed to address it.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAABYlAAAWJQFJUiTwAAABzklEQVQoz32R32uSYRTH/du6HF100y6MbreLYBDdFs5iFLgaabVGEQtUpvuRoi5n8xc20dxb7vWdzGWp01CXmlvo3k39vD0ZSSzqHD6cwzkP3+ccjq5WKqLsKkiyzE42i7y3h5zLkRH8jv9DPoeudlgnmEljS8SwpeIspVM4ZAln5v1fOP7Bz96K8gFXVkZ3dNwmuq/wJLbB/bCXua0A5nchLNsRQRjzMP7KH0l/EhnxWIpi3U0RLOXR9dQTPtYqWJNh7rx2YtxY4W7Ug+mtj9mYlwdbPiwJPwvJdebjLsyxVebCDu55FzEuP+Wm3YLBuSA2DFH61kCnnZ3S7nwnKKacDfmYDrgwiWlfpKI4tqOsSTH8SpJgNo417sbkX8Sw9JBrM9cZnxxnTD/G5Uk9z5etNI+PhoLaWa9HodUk+Gkfd1bhTT6HUvvCQaNO+bBKvfmVcqOKZyeO0Wdn6qWZq9M3uDih58KVS+inJlhd99DpdtEhBBkMUPt9jlSVVqdDWzRU8clA1Hu9Pn1B91QlXSnyLBFhJuDmtteJ4ZWdW2s25jd9KKUCfaExEtQ0DQ1GnLeB8Fa3g1StECrmxQE+EzwosFkukKpXaZx0h+9+ALDuFjU5gTydAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/50a6ccd52685cb9fee5f82ce55488721094a75d5-2944x1250.png?rect=0,1,2944,1249&w=804&h=341&q=75&fit=max&auto=format)

React Profiler shows the left panel, toolbar view, properties panel, comments list, and comments view re-rendered with every viewport change

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAACAElEQVQoz3WSa08aURCG/dNNWltbIchlgUBcltJQ1GJNmrQRAW/RaElJo6Wr0moT0w/r/QoitCmw7Jqns0qtRv3wZs6ec95n58xMz8XAE2zRhbf3MloDvVj+Z3SC/VghF5bEjk++5azjeSxy7lx5bPH88znRYfXc3LB8T2kEXRypCnsvo2xpIQzVjxHxYAjcELgR6mdH7pz7+7C6ELvLcOIVsPsnM+ymkk6yvTDHRmGexalRchMauWyMyYkY+YwqMU4xM8Tu2yQtLYitPP+f6S2gZNcZ9PNrJsv57g5bhwa59XHUUpjBUhBNjxAXJfU4CxvTHG6s8Gc2TycuUPHeC7RiAZrzUzRPTtiv7ZPZ/ICyGsS7ouDTPXhLfUT1AIWtBWpnx7TWvmKmYthS87tAp4ZRL625PO3KKftne4xvjhMup1DKaTxfFPqKjwgsu/kowHq9QvvbKuaw9gDQ6XDYRXs2iynAg9oBk5s5YuUhouURgqUIns+SYSlAcbtAQ4BmWaeTUm8Dr9vvAJUXtN6P0vy+xsmPVfSlDDPFFPliktynBNlCjOnia9Z/LlGvntLUlzFfRR5oigOWOpoyJq2RBL/TCarDKsdplaMx7UqjKgdjcY4Wp6mul2lIvU1p5PUc3wF219eSp9gye7aM06VkbYbcNJIqlXdvqA9pmLJ30/sXintrNOKUpb8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/ba834555ce8a8e43a613c90c19af6f7539e3d2f4-2944x1472.png?w=804&h=402&q=75&fit=max&auto=format)

How different components are structured in the Figma editor

We started investigating why the other components were re-rendering when viewport information in the Redux store changed. We found that Redux runs every single middleware and loops through and runs mapsStateToProps for every connected component, each time an action is dispatched. It then passes all of the data down through multiple layers to the comments view. But in our case, the only thing that should need this is the comments view. We had instances where we were passing in anonymous functions to force the components to render over and over again.

## [Our approach](#our-approach)

To fix the unnecessary re-rendering, we decided to remove viewport information from our Redux store and instead implemented our own [event emitter](https://css-tricks.com/understanding-event-emitters/) in our React codebase to broadcast this piece of information. We switched over from old components to functional components and, using React Hooks—which enabled us to memorize expensive computation—we now only do them when information changes. By avoiding dispatching an action to update viewport information in Redux, we successfully stopped running mapStateToProps for every connected component and avoided passing all of the data down through multiple layers to the comments view. As a result, we essentially prevented other components that don’t need ViewportInfo from re-rendering.

### [Better, but not quite there](#better-but-not-quite-there)

At this point, we ran the Chrome performance tool and React Profiler again. We saw that the constant re-rendering had stopped and the frame rate of comment view had significantly improved from 15fps to 50fps with 50 comment pins. However, we still weren’t quite at our goal of 60fps. We also observed that performance linearly degrades with the increasing number of comment pins. So, we still had work ahead of us.

### [O(n) operation on every viewport change](#o-n-operation-on-every-viewport-change)

TJ Pavlu, an engineer on my team, worked with me on further improvements. By observing how the comment pins move on the document level, we noticed that every comment pin performs a transform action when viewport moves. Each of the comment pin components was recomputing its pin position and performing a transform-style action with each viewport change (which you’ll see in the screen recording below). In turn, comments view triggers an 0(n) operation, where n is the number of comment threads as we pan and zoom. This might seem trivial for files with just a few comments, but the more comments there are, the slower the operation.

We came up with the solution to create an overlay container on the canvas and then to position the comment pins statically on this container. From there, we repositioned the overlay container (one computation) using CSS translate instead of doing so with each comment pin (n computations) as the viewport moves (illustrated in the second screen recording). Now, every viewport change triggers an O(1) operation instead of O(n) operation.

We created this overlay container by creating a box around the most top-left pin and the most bottom-right pin. This means every time a new comment is added, we have to recompute this top-left/bottom-right boundary box. This tradeoff is worth it because a) comments are added less often than panning around the canvas and b) this boundary box calculation happens when the canvas isn’t moving.

## [Better performance, not perfection](#better-performance-not-perfection)

Based on how we scoped the project—achieving 60fps for files with up to 150 comments—it was a success. You can see from the screen recording below that the interaction is much smoother and delivers a better user experience.

But with performance, the work is never truly done. Moving forward, it'll be an ongoing process of setting new goals and identifying potential bottlenecks.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAABMklEQVQoz42SW0/DMAyF9/9/0gYPMHqRWLfxBOJh3LbeBk80iRM3Ojhh0CExrQ+nViz3s52cSTbzSKc9fuIg/lVyUPpHQ+0xYxI+2WxI5peMxZywzgzWOWElcZlqrBIVc3eSC/lCavILdx5YzC02Dxr7mvDREtpaoy4V6kqhqQ32kts3hKdHg8U1nQeuEkL5qkCG0DsLIg1lOihSUM5AM0FLvtrJ5AnF9U8DJS5vDLbPnxHomcHysxVolDWwLE3YydQ0AjgNQML2pZPJLLz33+oZ3jl4K02kQW8d2rHAuPKbFqADcy9iOIE5a+GIwEamVHKvUhO2OQtcxEcxaCvCu1x+eJymFMCui7GtNJqdwuZe4faKxtmmiLahg0WMWEemSVWM4RzsE2qyU7b539jjdcz4AjJA0D2ztGsqAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/fafee023565a272552647896a3f1c30ec2b6bb58-2944x1472.png?w=804&h=402&q=75&fit=max&auto=format)

Now, we maintain 60fps rendering, no matter how many comments there are on a file

Beyond performance, we improved our React codebase and moved from old components to a new functional components system, while also taking advantage of React hooks. We'll continue to revisit our systems to ensure that Figma is built for scale.

We’re always working to facilitate better collaboration, and improving performance for scrolling comments helps people work together, faster. If this sounds like the type of project you’d be excited to work on, come build with us! You can check out more about Figma and our [open roles here](https://www.figma.com/careers/).