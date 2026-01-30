---
title: "What’s next for Dev Mode: annotations, compare changes, plugins, and more"
source: "https://www.figma.com/blog/dev-mode-ga/"
publishedDate: "2024-01-25"
category: "design"
feedName: "Figma Blog"
---

January 25, 2024

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACrklEQVQokW3R20vTARjG8Z2cvx0c25zNwzaXc7qZmrpp6tz66Vwe8IiphZJanmbZ0vCQmYIaCWlHNLW7EKyLwrryrn8gugyCgm6CyK6Ubrr5hoJY1sXLc/Py4X15JBKJhIORy6SoBQ06rQGdVo9Oa0SI1qBSmclwDVIV2qK58TXjw29YmH3P1OhHxofe0d46S1Li8QPnEFQJAk67D9F/haraAQKVF8h0B3HHehGdEVr8G3TVbTA9/JbFuW2WF37x7Mk2QwNL2CzO/4DR0aQ7zlDd8JCGoXuI4X5KA1WcsfipdJ6lpixCU/MolwefMj/7ifVV2FzfZSyyhs2S9jcolchQyBUYDTYcWSHSxGpO+ooIZKZS4LLjrvXhnmolc74N32SY7slX3J7Z4cGdHcKXVo5eKEWIEog3qEm1qEm2xmJLSCEvyYPH6sZekI7lZhWOlz04NrtJW+nk9PgSbd3fuNq/y4Vzq1iPgsYYgVC+mp56DdWiCVd+KimiF2tRAfHB01gmGnBsdJLyogPXow4qJlbpHfzO2LVdutr+ASXEqKWIuTL6GpQ0VVrJqynBfr6cxGo/5qISzHXFJERKSR6rQBwJMzKzxePFn6zc22Gw98jLUqkClWDAaTNT5jUS8udR0zxFedcy3torpOVUkJoTxHHKQ26wmL7L97k795WH87C8uEukf41k6x+lKKP0mI+V4HI2kuP2Eigso6PtOd09H6irXyE7u5UT7no8WXkEfR4ivUvcGP5CJPyDieufudi+iDXJcQhGKWKINeaSmFDGMVMGDnsWodJhGmuWKCnsJyE+E4PewnGLgdyMJIKBFoLiNP7i25SLtygqaMSgj/u7lL23ZTLlfiqVAga9mTiTDZ3OhFwetb+skEsQohVoNTo0GhNqdRzavVTFIJfL98Hfxd11qPckCF8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/48eb52daa9b500605f3d1bc96aa1ec8dbcf8492b-3840x2160.png?w=1632&h=918&q=75&fit=max&auto=format)

Today, we’re introducing annotations to Dev Mode, along with improvements to compare changes, plugins, and the Figma for VS Code extension. Dev Mode will move out of free beta on January 31.

From the moment we asked, “[How can a design tool work better for developers?](https://www.figma.com/blog/introducing-dev-mode/)”, we’ve heard from our growing community of Dev Mode users about what front-end developers and design systems engineers really need from Figma. Since launching in free beta last June, we’ve shipped [200+ new features and fixes](https://www.figma.com/blog/dev-mode-fast-follows-200-new-features-and-fixes/) in response to user feedback. As the beta ends next week, we’re adding a series of improvements and features to help you work faster, accelerate handoff, and customize workflows.

## [Save time with annotations in Dev Mode](#save-time-with-annotations-in-dev-mode)

There’s an art to preparing files for handoff. Today, designers manually craft measurements and callouts, thoughtfully organizing their designs to give developers the context they need to build confidently. To streamline the process, we’re introducing annotations in Dev Mode. With annotations, designers can share additional context, specs, and measurements that are connected directly to designs, and developers can easily see designers’ notes as they work, ensuring that they don’t miss any crucial callouts during handoff.

**Click and drag to measure**

Designers can add properties and design details, and pin measurements in just a few clicks.

**Stay up to date with live updates**

Since annotations are connected to a layer on the canvas, any property or measurement will change as designs change.

**Highlight important details without cluttering the canvas**

Annotations automatically show up or hide at specific zoom levels, making them easy for developers to see, without getting in the way.

**Automate and customize annotations with plugins**

With the plugin API, teams can build custom Dev Mode plugins to create and manage annotations in bulk.

## [Get the right context with more ways to diff—plus Figma for Jira](#get-the-right-context-with-more-ways-to-diff-plus)

In concert with annotations, we’ve redesigned the compare changes modal so that you can see diffs both visually and in code. And to further streamline handoff, we’re bringing together the many tools that teams already use in their unique workflows. With the [Figma for Jira app](https://marketplace.atlassian.com/apps/1217865/figma-for-jira?tab=overview&hosting=cloud), you can bring design context into Jira issues and get notified in Jira when designs change, so you don’t miss any updates.

## [Customize code with plugins in Dev Mode](#customize-code-with-plugins-in-dev-mode)

When it comes to code, no two organizations are alike. For example, some companies might rely more heavily on codegen, other teams might be working with specific frameworks like Tailwind or Bootstrap, and some organizations might adhere to a design system with code already written at the component level. To meet these specific and diverse needs, you can use a variety of [codegen plugins](https://www.figma.com/community/plugins/devmode) to generate code in the framework of your choice, such as HTML, React, Tailwind, and more.

> Dev Mode has been great for us at GitHub. It provides a zoomed in lens on what a developer really needs to focus on, using a language that developers understand.

Reza Rahman, Staff Software Engineer, GitHub

[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAACxklEQVQokZWNy1NTBxhH8xc4XfcP0Lrqqo5bV05f3JvcXAgxL3JvSEJIMAlghks05gW3EAjIBYIGwfiIKIyOrjrVRWt9lOkwU9tOrYvOJIzVDmVsQwpOF6cT7LaLLs7mfL85n8nStkX3iXUSgSpazwUG/RUCrsfYpG2sQgNZ/B2rsIVV3EI2b9NuadBu2cUuNznR0dinU24im98gCX9jsgrbxIP3MHJpShmFKU0lnzDoC67jsj3AIV3DJl6kQ1xGcd0h5P+OwWid9NBThmP3SZ36klzyJ8L+1rNWUPyT/r5vWZgyWJ6IUNF7qJzTGcutEHAXUWWVPmcXIYdKvDdJPn2b8uwjLs9WMM5oLOQzrC3dYiL3HEfHHiZJ2CEces504RrL42e5UUhyozTNxOgVfK4sQVsno2EXmZCH4Xg/k+PXqS59TtUYx0h4mUn6qZanmdS/xml//TYYCj6jOH6VS8U0q1MpVkozFPQVotFFBmPDJCMB4qqboQGNwth1Fku3KRdy6FEHpxMuUsUEvWcvIXqftoINIqFnGNNrVMtz3Klc4O7KKqX5++jGEyYvf8GwPkO4P0Uqt4Cu32U0f5PsmSzxiIIy6KUzG0MYmuN48EEr2KRbeUUus8HczFcsl9dZKv/IyOgvaCO/MrL4gsz8D2hjTzid30DTvid68htC4VXU0DyO3lmswQqi5yGC/QUmc9tfdMpv8CsNouFtBqKviYV38HXt4Xbt4e/ZpS+2S+Rkk4B/B4+jidPWwO18haLU8Hpq2DteIpubyAKYHMIOtvY/kNwvkXybSN2biEqdj911PnLW+cRTQ1RrmH01Pu2q86HzrW/z1rF01zH7WpuW29y/mTTpN7qUDY4lqxzVz3NEX+D9vMHhzBSHMkXea5H9l0xx3/2nTxcxfWb5GTW4xgcTAxxeUjl40cu75+28MydxYNb8v/kHFFEvGlCiW1IAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/eaa997b4659bd71faa77b930ef5387c6ea203886-3848x2168.png?w=3848&h=2168&q=75&fit=max&auto=format)](https://www.figma.com/blog/how-razorpay-sharpened-developer-workflows/)

At Razorpay, developers built RazorSharp, a custom Dev Mode plugin to auto generate equivalent code for designs. Read their story [here](https://www.figma.com/blog/how-razorpay-sharpened-developer-workflows/).

We know that teams need to stay in lockstep with their organization’s design system, which is why it's often not enough to just generate code for a design. For example, you may want to check that you’re using a design system correctly, show links to design systems documentation, include information about internal APIs to use, or confirm whether a design uses components that already exist in your codebase. We’ve seen many teams create [custom plugins](https://www.figma.com/plugin-docs/codegen-plugins/) to help drive adoption of a design system across Figma and code, and now Enterprise admins can pin and set plugins to run by default in Dev Mode for all files in their organization.

## [Optimize your workflows with Figma for VS Code](#optimize-your-workflows-with-figma-for-vs-code)

Moving between tools can slow teams down and cause friction. The [Figma for VS Code extension](https://marketplace.visualstudio.com/items?itemName=figma.figma-vscode-extension) aims to solve for this by providing an easier way for developers to access and inspect designs right from VS Code. The flexibility of files with multiple pages, each with their own infinite canvas, is perfect for designers, but it can be challenging for developers to find what they need. We’ve redesigned the Figma for VS Code experience to improve navigation and discoverability of design files. Instead of having to pan around a large canvas, you can easily select from a grid of frames and see frames individually with focus view.

#### [Run plugins in VS Code](#run-plugins-in-vs-code)

We’ve also launched the ability to run plugins in VS Code, so you can leverage third party tools and customized code without leaving your code editor. [Check out our docs](https://www.figma.com/plugin-docs/working-in-dev-mode/#how-to-get-started) to learn how to make your private plugin work in VS Code.

## [What else you need to know](#what-else-you-need-to-know)

Starting January 31, Dev Mode will move out of free beta and require a paid seat. Depending on your plan and seat type, you might need to upgrade to continue using Dev Mode. As we [announced at Config 2023](https://youtu.be/yI9QVwkk2Go?t=2709), you’ll have an option to purchase Dev Mode access only for $25 per seat per month on Organization plans, and $35 per seat per month on Enterprise plans.

-   **Starter plan**: Dev Mode not included
-   **Professional plan**: Dev Mode included in full Design seat only
-   **Organization plan**: Dev Mode included in full Design seat or [available standalone for $25/mo](https://www.figma.com/pricing/)
-   **Enterprise plan**: Dev Mode included in full Design seat or [available standalone for $35/mo](https://www.figma.com/pricing/)

Users who do not currently have a paid seat can request one from their Figma admin within Dev Mode, and admins can approve requests in the admin panel. Starter plan users and viewers who don't upgrade to a Dev Mode seat can still view properties and measurements, copy code, and export assets.

Learn more about [what to expect on January 31](https://help.figma.com/hc/en-us/articles/20652568757399). You can [find all the pricing and plan details here](https://www.figma.com/pricing/).

As we enter this new chapter for Dev Mode, we remain committed to improving developer workflows and designer and developer collaboration in Figma. We’re so grateful for the feedback you’ve shared, and we’ll continue to learn and iterate as we go. [Join our upcoming livestream](https://figma.zoom.us/webinar/register/7117062055518/WN_T68fgq8MQqiY06K4-Hi5jQ) to learn more about all the updates that will go live on January 31.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAUGCAMH/8QAJRAAAQQCAgIBBQEAAAAAAAAAAQIDBAUAEQYhBxIxCBMyQWFx/8QAFQEBAQAAAAAAAAAAAAAAAAAABAX/xAAcEQACAwADAQAAAAAAAAAAAAABAgADERIhMQT/2gAMAwEAAhEDEQA/AL551u5UOHWU9fIXGdsXfV1xH5JbHzrPPOPyp/jzlUENzZEqmlrSh0u70CrO31E3TlZzqpltbWIaAfQf095E+Q71UviVe83HdSy6Q57udaI76wtjsLBnkZSiNUd9mo0gLSFDsEbGMgvH10zecOrJyFja2UpVs/CgNHGL2CyZ38zRkO3lbIcKlOSVAObPRy8y+PV95HYhT2lKix4yPttpOgCf3/uMYWjtBsX9HTnJcuM1UWoqGocFCkMIJIHtjGMC5PIyigHET//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/748a6f1028d08aec4357954ece70a36c53314115-440x440.jpg?w=440&h=440&q=75&fit=max&auto=format)

Avantika Gomes currently leads Figma's efforts on Design Systems, Prototyping, and Developer Tools, exploring ways to bring the worlds of code and design closer together. She has over a decade of product experience, having held roles at Pinterest, Microsoft, Google, and Birchbox, with a particular focus on collaborative, creative products that help people visually express themselves. Avantika lives in New York City, with her husband Aaron and dog Tessa.

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)