---
title: "Everything you need to know about Dev Mode"
source: "https://www.figma.com/blog/everything-you-need-to-know-about-dev-mode/"
publishedDate: "2024-01-31"
category: "design"
feedName: "Figma Blog"
---

Figma was never intended to be a design-only tool. Because design isn’t just about a role; it's about building great products. That’s why we built Figma on the web. With a single link, teams can collaborate on in-progress work and share early explorations in the file together. This multiplayer approach encourages teams to join forces and solve problems in a shared space, helping to realize our vision of making design accessible to all.

It’s also a vision we continue to build on. We’ve done this by listening carefully to our users and delivering features that meet teams where they are. When we see an opportunity to build new tools and experiences to push work forward, we act. That’s exactly what happened with Dev Mode.

## [Why we built Dev Mode](#why-we-built-dev-mode)

Today, developers account for a third of our weekly active users. Even though Figma wasn’t exactly optimized for their workflows, developers started working with designers, product managers, and other collaborators in the product development process. We had a lot to learn from them about the nuances of developer workflows, toolchains, and preferences, and their feedback informed our ultimate goal: to create a space in Figma that’s purpose-built for developers—from front-end developers working with mature design systems, to design systems engineers building components, to those building content layouts and exporting assets in their work with brand designers. We wanted to support a variety of teams, from idea to code.

We needed a team that lived and breathed development like we did design, so in 2021, we acquired Visly—a team of eight designers and engineers who built a tool for developing UI components in React. “We talk to tons of developers, but that’s really different than having an intuition,” says Figma Vice President of Product, Sho Kuwamoto. “You have to immerse yourself in that world.” The Visly team brought with them years of hands-on experience and months of research on developer tooling—in other words, they had the developer “intuition” we were looking for.

The Visly team immediately offered a new perspective on how developers work across a variety of environments, as well as real world examples about how their own team used Figma. Most critically, they shared a pivotal insight into what developers really want from a design tool. “Developers shouldn’t need to worry about learning all of the interactions \[in design mode\],” says Joel Miller, a product designer on the Visly team. “It’s more about tailoring the Figma experience to them.”

[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACqklEQVQokQGfAmD9APziSPviS/XdVtTBVqKURoN4OJGEPbipSdnGSPDZR/ngTPbgXe3deuzelOzgnuvdkPDddfjgWvvhS/ziSQD13Ujj0FfRxHimnnZoZU5HRTRNSTZlYUCEej25qEbl1G/v46Lr5cLs6M/w7NTr587s5L/v45v032r64E0A28VFopZQgHxoaWhlSEhIODg5R0dHTk9OR0U6enVUzcel7evd7evh7efI7+e97OjM7uzj7OnY6+Cg891kALSjPmVeOkA/PT4+Pjc3Nj49PWtram9vb0JCQW5ua8/Oy+/u7OznyO/gh/HebO7gkO3p0e7u7O3nye3dgwCtnjxWUTEvLy4wMDAoKCgsLCxSUlJYWFg5OTlubm3Q0M/v7uzs5sPv337y3mHv34jt6M3u7u3t6c7s3ocA08JHgXg8Q0EzLy8uICAgGBkYIiIiJycnLCskbWhSysau7+zk7evd6+S67OSq7ObA7uzi7evh6+Ks8N1rAOzYULChRWhgMj05ISQiFRkYFCYkHT88KlRPKoaAPMbDeOPhs+bkzeTk0+Tn1OXl0+flzODerN3WdurZTwDkz1Wfk0dqYS9lXCZYUSc9OihRTC13bTluaDNyeTGRq0uuxWnHz4LG05i906LI05XEzX+qwmWswE/RzUYA4cxMkIQ8WFIvbGU4hHxOcm1WcWpEdGs5WlUwYWsxe6JBg7ZKlrlPlbtWh7tcl7tVkrlNg7ZJoL9H19FGAPLaR8azPpSIOYR7QYeAUoN9X353UIB3QI2DPa+lQLzDRafDSJW5Roa1Rn21SIi1Rpa6RqvFSNLSSPLdSAD84kj03kfk0UbMukSqm0SWikagkkTBr0TgzEbx20jz3kjl2UfMzEevwUajvkeywkbQzkfo2kf24Ej84kg+knnRo731xQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/666dc8c01fef44e537d8a59cac606cc939e2e5fb-3264x1836.png?w=3264&h=1836&q=75&fit=max&auto=format)](https://www.figma.com/blog/how-we-built-dev-mode/)

With an understanding of developers’ unique needs and challenges, the team turned to another key feature of the product experience: What should Dev Mode look and feel like? “We probably spent a year and a half on that question,” says Visly co-founder Emil Sjölander. “We went through a million iterations on this, all scattered across this spectrum between isolated versus integrated files.”

The team ultimately decided on a mode that would allow developers to go between design and development spaces without needing to switch tools or files entirely. This solution was the best of both worlds—siloed enough that they could optimize for developer needs, but integrated as a space within Figma so that developers have important context from their design counterparts.

[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAADN0lEQVQ4jS2OSU/jBgBGUyB7TJzNS2InthMnduzsJAQSKITAsAQiZgCxqHSYBbXDTBepPVSdXnqqqqr/YXrspZf+vzca2sOTnr7D0xcoKS6aYiNLBtlsiWzGREpXULMOqmQjZ3WyGRVF0qloDpP6lNv1l8y2rmmMN9F9h1yhgCSr6AWdQFn2MBUXXaoiSxaZnElGsshKZWTJRFMNrGIF1/ZpeQNG3g4TZ0anuolZ8zArNjXTxitXabsuAaPQxJI9SjmHvOyg5Ovk9TqlcoNavUuzOaDdXMFtdDA7fRx/k56xTa3QxjBtapUqvuHg6jbVYoWAWnIo5ivokokqVamYfXrtHfobh7Snc/zNA+q9EVajidxqoLsr1It9vLJPs+PjuQ6mrKOKMlJSJtD2fJrVKkZBR5ENGtV1xsMTWpM5/sEpzekR9e4qllNDtgwy+SKaZtEfdHh6fsjJbJ9OzUPLKKSX0wTe3d9ydrqL27JRNIN6qY3rjtHWpvTnpxydPWO8McJ1bAqahqQbmI0mmzvb3Fze8OKL1+xNDrHLLlJGJfDP3x/4/Y8Hjq57NPsOQ6tLzRqSHs/oXd7y/M0rnn95wZPJOu2OT2UwpD3ZZ/pkxv72Cbubc1YHEyoVD1XSCfz75wf++vVbfv7qc16fjLjr7rFqbyGOTvCvX/Dq+6/57t1Lrs+OGO+u4u5s094+YG24RctdwdQcCnLp8V06mSPwsHbFw3Cf++GQu/4aF+4GzWIXsTHC2Z9zfPaUw71d1ocD3I6D5nsUHR/dtJHUIum0THI5xbKQQhBSBHTFppQpYqZUjJSCnlHJSAUytsfKdJdn8xnr3Q6KLCOIInFRJJFNE5clojmZmJgmmhCIxAWiQpJAxKwSV/LExCQRQSAqpkjki+TbfY4uznn/9g13h8eUFIWlUIilUJhgLExQSLCUEFiKxh63R8JRAjHNRMgXSGSzxLISglpEtOoYqxucXl3y2w8/8v7mnqZZJRgOsxAKsRAMsRD65GEWgyEWg5+Ckf+CEUEkIqYJZ3JECwZJ0yVttzAHI47PT/nlm7f8dHVPz2oQisT5LBT5n+gjC+EoC5E4i9FlFuMiHwF+64RQ+MiRXwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/e50d5e2e3df393371fd11b5e05711707bfa7b95b-1332x888.png?w=1332&h=888&q=75&fit=max&auto=format)](https://www.youtube.com/watch?t=1669&v=yI9QVwkk2Go&feature=youtu.be)

Watch Figma CTO Kris Rasmussen’s [talk at Config 2023](https://www.youtube.com/watch?t=1669&v=yI9QVwkk2Go&feature=youtu.be) to learn more about the thinking behind Dev Mode.

We launched an [open beta](https://www.figma.com/blog/anatomy-of-an-open-beta/) at Config 2023 to solve these problems for developers, and user feedback informed many of the product decisions we’ve made along the way. (Emil had a Slackbot that notified him when a customer request came in.) In the first two months of the beta, we shipped [200+ of the most asked for updates](https://www.figma.com/blog/dev-mode-fast-follows-200-new-features-and-fixes/) to Dev Mode.

## [What Dev Mode enables](#what-dev-mode-enables)

In our own product development process, we asked ourselves: How can we make Figma work better for developers? The result is a workspace in Figma that’s designed to get developers what they need, when they need it, harnessing the tools they use every day. The easier it is for teams to design, document, find, and implement high-fidelity designs without losing sight of the work and each other along the way, the better the product outcomes.

[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAADPElEQVQokS2QW0yTZwBAi4DcWhSF2OEuMtAxB5OYgZglwGAIlmrLAFtsuZQiaLVQ5FK5TOpEqHIrTRilRWXKTEw0bstiYnxasmUvS5bsxUTHls1tOmEItCAy/u8s23w6bycnR2ao+1uqPbUsLI4Axx1+YelepP70HDX2JxjqZzCcmOXIucfYO39jqOoRY7o/Gdf/xUT5Epf0z5nQrTBwLIDtTICq9lVkpuZnUrdrUYxf9uO9vCD6vNMcHbjDAcso2QedZBVfIM88gLrcib7QSUXRELWacewltxnSPeBj4yLnTvo50ftCaLYHpEH3grh10c9V30/C6v6EPfZa4vPSiXktgZikJDanpxD37i6Uqky2VuWzraaI3ToD5YeG6TD/QFvXPHV9y1S2riKraQlIPV3zwtc1g91xW+xurESuTSXkbSVBcZEEbQpnXWIM69U7iOjMQu5WIR9REd2Zyw7jB2gMk5ganlDZtMbh2jVk1c1LUkf7U3G29T5ay3kRW5xBaEESYepkQrMTCN6+meA344gwv4PCVUS0V0u0R0tUfwGbjuSQru6kpHQanR7KSiVkptYlyTH4VPQNfI/qcINQpCUQmp9IpHUvEda9hOYkEJL2EhH1Gcj7C5EPq1CMqIk6v4+N9VnsKmhCo75HWTGUasW/D5ckl29RfDp1j7q2dqHMTiY4PZ716mTCNDv/kwW/EUu4MQ35wH4UXi0KXzFRznxiK3LILPiIUs0v6EoEh4rXkNXal6TRiYC48/nPjF4ZE3nHVWxIeZlgpYJ1SjlBG8MIio0kJPMVwo/tIao3H0XvPuIa3yPDYMRU+QWNxllsxt+xVt//v3DI6xdffjbDzZvfii6ni9wDel5/K4MtCanEbU1hy7adxKem8GpuBom690mt1KCqs/Ch4xpe50M8tseMN9zFbZ9CVmVbkU5d8ItBzyLDYzOiZ+gB1o6vKKu7TmHJFAX7JzGUd9Ni09PSYuToyR4s7ddw9H+NZ/JXJr0LXD37kCvddxk+fR1ZefWaVGV9LszNK5ibV17wGSbbMoaaVUwVc7gdk3x3I49vbh3EdekGbeOPaPPN0+ad44xnFp/nD0ZHpmlq/5F/AJ6E/jM6ogRrAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/a313056d03f6e2734d587ee87c5a38c23936f8e5-5569x3132.png?w=5569&h=3132&q=75&fit=max&auto=format)](https://www.figma.com/blog/introducing-dev-mode/)

Learn more about [Dev Mode](https://www.figma.com/blog/introducing-dev-mode/) and how we got here.

### [Clearly communicate design intent](#clearly-communicate-design-intent)

To date, designers have had to manually craft measurements and callouts, thoughtfully organizing their designs to give developers the context they need to build confidently. We’re introducing annotations in Dev Mode to streamline the process. With annotations that live update as designs change, designers can share additional context, specs, and measurements that are connected directly to designs, and developers can easily see designers’ notes as they work, ensuring that they don’t miss any crucial callouts during handoff.

##### [Save time with annotations (New)](#save-time-with-annotations-new)

-   Click and drag to measure
-   Stay up to date with live changes
-   Highlight important details without cluttering the canvas
-   Automate and customize annotations with plugins

Designers can simply label a section as “ready for development” and send it to developers directly, without creating a separate page or file. Diff support allows you to compare changes between different versions of a frame and stay up to date.

##### [Compare changes between any two frames (New)](#compare-changes-between-any-two-frames-new)

We’ve redesigned the diffing modal so that you can compare between any two frames to see the difference between iterations of a design. You can also compare between detached components or overrides to the main component. Plus, the diffing modal is more interactive and includes code diffs, so you can see diffs both visually and in code.

### [Work faster in your preferred tools](#work-faster-in-your-preferred-tools)

Dev Mode aims to make you more productive by connecting the tools you use and your code components to the design file. There’s no one way to work, which is why we built Dev Mode to adapt to a variety of tools, processes, and workflows. Whether you’re looking to link design and code with [Storybook](https://www.figma.com/community/plugin/1056265616080331589), ensure accessibility with [Stark](https://www.figma.com/community/plugin/732603254453395948), or streamline project management with [Jira](https://www.figma.com/community/plugin/1220802563996996107/jira), [Linear](https://www.figma.com/community/plugin/1221187540287746170/linear), and [GitHub](https://www.figma.com/community/plugin/1220512233196109878), plugins allow you to extend Figma’s functionality to flex however your team works.

##### [Access what you need in your code editor](#access-what-you-need-in-your-code-editor)

With the [Figma for VS Code extension](https://help.figma.com/hc/en-us/articles/15023121296151) you can bring the power of Dev Mode into your code editor to review designs, see notifications and comments, and stay on top of changes without ever having to leave your coding environment. The extension also autocompletes code based on the design you’re inspecting, helping you work that much faster.

##### [More easily navigate design files and run plugins in VS Code (New)](#more-easily-navigate-design-files-and-run-plugins)

We’ve redesigned the [Figma for VS Code](https://marketplace.visualstudio.com/items?itemName=figma.figma-vscode-extension) experience to improve navigation and discoverability of design files. Instead of having to pan around a large canvas, you can easily select from a grid of frames and see frames individually with focus view. We’ve also launched the ability to run plugins in VS Code, so you can leverage third party tools and customized code without leaving your code editor. [Check out our docs](https://www.figma.com/plugin-docs/working-in-dev-mode/#how-to-get-started) to learn how to make your private plugin work in VS Code.

### [Customize codegen and drive design systems adoption](#customize-codegen-and-drive-design-systems)

We know that generated code isn’t always useful out of the box. Rather, it’s a jumping off point so you don’t have to go from 0 to 1 every time. In Dev Mode, you’ll see a familiar box model visualization, modern syntax with a tree view, and you can toggle between dimension units (rems and pixels) to match your codebase. If you need to quickly produce working code in a specific language like HTML & CSS, React, or Tailwind, plugins like [Anima](https://www.figma.com/community/plugin/857346721138427857/anima-figma-to-code-react-html-vue-css-tailwind?searchSessionId=lrzcpq8z-5j1sdjit87s) or [Figma to Code](https://www.figma.com/community/plugin/842128343887142055) can help you get started quickly.

If you need to stay in lockstep with your design system, you need to build designs using the code that corresponds with your system's component library. You might extend Figma by developing your own codegen plugins, leverage the [Code Snippet Editor](https://www.figma.com/community/plugin/1311777988952403297) to add dynamic code snippets that mirror your own component code, or build tools to bidirectionally sync design tokens with our [Variables REST API](https://www.figma.com/community/file/1270821372236564565).

##### [Pin and set plugins to auto-run (New)](#pin-and-set-plugins-to-auto-run-new)

We’ve seen many teams create custom plugins to help drive adoption of a design system across Figma and code. Now Enterprise admins can pin and set plugins to run by default in Dev Mode for all files in their organization.

[![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACrklEQVQokW3R20vTARjG8Z2cvx0c25zNwzaXc7qZmrpp6tz66Vwe8IiphZJanmbZ0vCQmYIaCWlHNLW7EKyLwrryrn8gugyCgm6CyK6Ubrr5hoJY1sXLc/Py4X15JBKJhIORy6SoBQ06rQGdVo9Oa0SI1qBSmclwDVIV2qK58TXjw29YmH3P1OhHxofe0d46S1Li8QPnEFQJAk67D9F/haraAQKVF8h0B3HHehGdEVr8G3TVbTA9/JbFuW2WF37x7Mk2QwNL2CzO/4DR0aQ7zlDd8JCGoXuI4X5KA1WcsfipdJ6lpixCU/MolwefMj/7ifVV2FzfZSyyhs2S9jcolchQyBUYDTYcWSHSxGpO+ooIZKZS4LLjrvXhnmolc74N32SY7slX3J7Z4cGdHcKXVo5eKEWIEog3qEm1qEm2xmJLSCEvyYPH6sZekI7lZhWOlz04NrtJW+nk9PgSbd3fuNq/y4Vzq1iPgsYYgVC+mp56DdWiCVd+KimiF2tRAfHB01gmGnBsdJLyogPXow4qJlbpHfzO2LVdutr+ASXEqKWIuTL6GpQ0VVrJqynBfr6cxGo/5qISzHXFJERKSR6rQBwJMzKzxePFn6zc22Gw98jLUqkClWDAaTNT5jUS8udR0zxFedcy3torpOVUkJoTxHHKQ26wmL7L97k795WH87C8uEukf41k6x+lKKP0mI+V4HI2kuP2Eigso6PtOd09H6irXyE7u5UT7no8WXkEfR4ivUvcGP5CJPyDieufudi+iDXJcQhGKWKINeaSmFDGMVMGDnsWodJhGmuWKCnsJyE+E4PewnGLgdyMJIKBFoLiNP7i25SLtygqaMSgj/u7lL23ZTLlfiqVAga9mTiTDZ3OhFwetb+skEsQohVoNTo0GhNqdRzavVTFIJfL98Hfxd11qPckCF8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/48eb52daa9b500605f3d1bc96aa1ec8dbcf8492b-3840x2160.png?w=3840&h=2160&q=75&fit=max&auto=format)](https://www.figma.com/blog/dev-mode-ga/)

## [Breaking down silos between design and code](#breaking-down-silos-between-design-and-code)

Today, as Dev Mode moves out of free beta, we’re pushing new features live that bring design and code closer together, including annotations in Dev Mode, along with improvements to compare changes, plugins, and the Figma for VS Code extension.

Many of these changes will make it easier to go from design to development, and we’ll continue to iterate on how we can tie code components even more closely to design components. We also hope that they help you think of handoff not as a moment, but as part of an ongoing collaboration between designers and developers. Because it’s not a handoff if you’re building together.

We’re excited to launch these updates, which were all rooted in user feedback that we heard during the beta. We’re so grateful for your input, and we’ll continue to learn and iterate as we go. As we continue building Dev Mode, we remain committed to improving the developer experience and helping you work faster in Figma.

[Register for our upcoming livestream](https://figma.zoom.us/webinar/register/2917056132470/WN_T68fgq8MQqiY06K4-Hi5jQ#/registration) to learn about everything we launched and hear directly from the team behind our new features and improvements.