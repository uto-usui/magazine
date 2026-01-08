---
title: "The winners of the Baseline Tooling Hackathon are..."
source: "https://web.dev/blog/baseline-hackathon-2025-winners?hl=en"
publishedDate: "2025-10-27"
category: "web-standards"
feedName: "web.dev"
---

![Rick Viscomi](https://web.dev/images/authors/rviscomi.jpg)

Published: October 27, 2025

Last month, we [kicked off the Baseline Tooling Hackathon](https://web.dev/blog/baseline-hackathon-2025), calling on you to build the most innovative and useful new tools to help developers adopt more modern web features. When the clock stopped, nearly 3,000 developers answered the call and submitted hundreds of projects. There were so many clever, innovative, and entertaining submissions, but only three can win their share of the $10,000 prize pool. After careful consideration, we the judges have finally picked our winners.

🥇 **The first place winner is [eslint-plugin-baseline-js](https://devpost.com/software/eslint-plugin-baseline-js), submitted by [Ryuya Hasegawa](https://www.linkedin.com/in/00r/)!**

This is an ESLint plugin that checks the Baseline status of JavaScript features, and flags anything newer than your configured Baseline target. It works in both JavaScript and TypeScript environments, covering hundreds of features.

What really stood out to us about this submission was its usefulness; the likelihood for an average developer to actually start using and benefitting from this tool. It fits neatly into the ESLint ecosystem by complementing existing tools like the officially-supported [ESLint for CSS](https://github.com/eslint/css) and the [HTML ESLint](https://html-eslint.org/) community plugin. With its familiar configuration options for Baseline targets like Newly available, Widely available, and Baseline years, you can expect a consistent experience across all of your code. To get you up and running quickly, it also comes with high-quality [documentation](https://baselinejs.vercel.app/docs), including installation instructions, best practices, and examples.

Under the hood, the plugin syncs with the [`web-features`](https://www.npmjs.com/package/web-features) dataset as its source of truth for web feature compatibility. To detect these features in source code, the plugin integrates with ESLint core and `eslint-plugin-es-x`, rather relying on brittle regular expressions. It also supports the `typescript-eslint` parser, which can detect features much more reliably.

Overall, this is a highly innovative and useful tool deserving of the top prize, and we encourage you to [give it a try](https://baselinejs.vercel.app/docs#install). If you'd like to dig into the source code or raise an issue, you can find it on GitHub at [3ru/eslint-plugin-baseline-js](https://github.com/3ru/eslint-plugin-baseline-js).

🥈 **The second place winner is [baseline-mcp](https://devpost.com/software/baseline-mcp), submitted by [Technickel Dev](https://www.linkedin.com/in/bleona/)!**

This is an MCP server that provides AI-enabled development workflows with accurate information about web feature compatibility and their Baseline status.

There's no denying how prevalent AI has become in web development, which is why tools like this are becoming increasingly important to steer agents towards generating more modern code. This project addresses that need well by providing agents with several useful MCP tools to answer a variety of questions about web features, grounded in the trusted `web-features` data. In addition to performing rote tasks like looking up the Baseline status for a given feature ID, it can also perform logical tasks like figuring out the correct feature ID based on context and suggesting modern alternatives for outdated web features.

Try it out in the [web client demo](https://baseline-mcp-demo.web.app/) and see the [GitHub repo](https://github.com/Technickel-Dev/baseline-mcp) for installation instructions, ways to interact with the server, and the source code.

🥉 **The third place winner is [Baseline Status for Video](https://devpost.com/software/baseline-status-for-video), submitted by [Zoran Jambor](https://www.linkedin.com/in/zoranjambor/)!**

This is a web application for generating Baseline widgets embedded in videos.

The role of Baseline is to provide unambiguous browser compatibility information about web features, which you can reference in MDN articles, caniuse docs, and IDEs like VS Code and WebStorm. But developers get their information about web features from other places too—like YouTube. This project makes it easier for video creators and web influencers to generate Baseline information for a feature in a customizable and video-friendly way. Given the huge reach of some of the most popular web influencers, we're excited about the potential for this tool to help spread Baseline awareness to many more developers.

This tool is powered by the [`<baseline-status>`](https://github.com/web-platform-dx/baseline-status) web component, which uses the [Web Platform Dashboard API](https://web.dev/articles/web-platform-dashboard-baseline) to get the Baseline status and browser implementation details for any feature ID you enter. The app records the widget animating in and out over a solid background, which can be keyed out in editing software.

Visit the [Baseline Status for Video](https://baseline-status-for-video.css-weekly.com/) app to try it for yourself, or browse the source code on [GitHub](https://github.com/ZoranJambor/baseline-status-for-video/).

* * *

Huge congratulations to all of the winners! We'd also like to thank [everyone else](https://baseline.devpost.com/project-gallery) who submitted a project and completed the feedback survey. All of the time and effort you poured into your creative and inspiring projects is greatly appreciated. The 10 winners of the "Most Valuable Feedback" prize have all been notified, and overall there were so many valuable and actionable suggestions that we're going to take back to the appropriate teams to make Baseline even better.