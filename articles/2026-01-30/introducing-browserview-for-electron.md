---
title: "Introducing BrowserView for Electron"
source: "https://www.figma.com/blog/introducing-browserview-for-electron/"
publishedDate: "2017-06-29"
category: "design"
feedName: "Figma Blog"
---

At [Figma](https://www.figma.com/), we believe everyone should have access to design tools. We chose the web as our platform for its unrivaled accessibility (sharing a Figma file is as simple as sharing a link!). On the flip side, we have had to work extra hard to make Figma fast and competitive against native applications. For example, [we render our canvas entirely with WebGL](https://blog.figma.com/building-a-professional-design-tool-on-the-web-6332ed4f1fcc) and [recently released a WebAssembly version of our app.](https://blog.figma.com/webassembly-cut-figmas-load-time-by-3x-76f3f2395164)

For our desktop app, we doubled down on the web by going with [Electron](https://electronjs.org/), a framework to build desktop apps using web technologies. As with our web app, we have worked diligently to make Electron as fast as possible for our needs, tackling smaller bugs and working with Chrome to fix issues that affect Electron.

One of our most important contributions to the Electron project is [BrowserView](https://github.com/electron/electron/blob/master/docs/api/browser-view.md), a new way to embed web apps with fewer bugs and improved performance. It is included in the latest Electron beta release — you can find [documentation here](https://github.com/electron/electron/blob/master/docs/api/browser-view.md). It makes the framework faster and more reliable and some companies have already told us they’ll be adopting BrowserView in the future. Heads up that it’s still an experimental API and we’re planning to refine it further.

To explain why BrowserView matters, let’s take a step back to discuss the state of things before now.

#### [Embedding web apps with <webview>](#embedding-web-apps-with-webview)

Each Electron window usually runs a web app from the local disk. The standard approach to embed remote web apps into an Electron window is to use the `<webview>` element. It is conceptually similar to an `<iframe>`, except that its contents are rendered in a completely separate process. This has a number of performance, security, and stability benefits compared to the plain old iframe.

Many of the most popular Electron applications like Slack and WhatsApp use webviews. For us, webviews seemed to work well at first, but over time we ran into an ever growing list of issues. There were bugs in fundamental features like drag-and-drop and general performance was simply not on par with Chrome. After discussions with other organizations, it became apparent that we were not alone.

The situation is especially problematic because we can’t fix these issues in Electron itself. As you may know, Electron uses the Chromium open source project to render web content. The webview is actually implemented in Chromium and also happens to be used by Chrome Apps and Chrome extensions. Unfortunately making large changes to Chromium is out of the question, so we have been waiting for the Chrome team to fix the bugs.

We raised the issue with the Electron maintainers and together we decided that the most pragmatic solution was to sidestep webview entirely and build an alternative: BrowserView.

#### [Embedding web apps with BrowserView](#embedding-web-apps-with-browserview)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAAA5UlEQVQoz3WSURKEMAhD9/73XW1LCQuBanVmPzJiSR+R8aPTbIprpKS5+v2u3oOmol7e8JQPceY9uAcfGvoN61+zcdRZnRM27wFxh4NbgjSHwD0O3JKEVroFYL2Aks+VttKjek8gFJ55V6XZgRwMr+G1K+t3QlSiF1DzQgIXpIBSwMEa+R5AZELpeHz2tSfuEVtC8PkSqpcJi06zdLXRpktzSA2KtMrEVqmjP6kA8UwqIXen+cmjix3f086zuUEJ4S9zrWHzHe47msmY4Lo0LAGM7VtemnNa751SpePq/fN5jeoR+AMTjsgGRpGb8gAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/58d0e142f2a13c622de4ee3b494174ac846951f4-1000x430.png?rect=1,0,999,430&w=804&h=346&q=75&fit=max&auto=format)

So how is the BrowserView different? For one, while webview is part of the DOM hierarchy, BrowserView lives in the operating system window hierarchy. This approach is very similar to how Chrome manages its tabs. Since bugs in Chrome’s tabs are critical and fixed quickly, we eliminated a large class of bugs specific to webview. Web apps running within a BrowserView are also as fast as they are in Chrome.

The trade-off is that positioning and layering BrowserViews is trickier because you can no longer use the normal HTML and CSS positioning and layering primitives like you can with a webview. You have to manually layout BrowserViews and make sure that it is layered properly. For some applications with complex layering and positioning, this may be a deal breaker, but for many applications including Figma, it was a straightforward conversion.

#### [What’s next?](#what-s-next)

Electron has allowed us to quickly build a fully fledged, cross platform desktop app. While neither the web platform nor Electron are perfect, both are evolving rapidly and receptive to contributions. In fact, Electron receives frequent contributions from companies like Slack and Microsoft. At Figma, we remain committed to helping Electron improve.

We just released [Figma Desktop 2.0](https://releases.figma.com/2017/06/figma-desktop-20.html) and shipped BrowserView to our users. As we continue to make Electron and BrowserView better, we hope that other apps will also migrate to BrowserView for a more pleasant desktop experience.

_Like working on state-of-the-art web apps? [Come work at Figma](https://www.figma.com/careers/)!_