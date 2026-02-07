---
title: "Storybook is going ESM-only"
source: "https://storybook.js.org/blog/storybook-is-going-esm-only/"
publishedDate: "2025-09-22"
category: "design-systems"
feedName: "Storybook Blog"
author: "Norbert de Langen"
---

ESM has been "the future" of JavaScript for a long time. Unfortunately, for just as long, it's been in transition.

Some tools adopted ESM early, pushing the ecosystem forward. Others hesitated, because migration is difficult. Many libraries didn’t switch to ESM because it would be a breaking change. Those that braved the switch to push the ecosystem forward risked creating struggle for users and maintainers, with frustrating upgrade paths and complex compilation setups.

Now Storybook is ready to do our part in embracing this standard. **We believe ESM is the future** and we're finally able to take the leap ourselves.

## 🧭 Why is ESM a big deal?

ESM is the **official**, **standardized** module system for JavaScript. It works natively in both browsers and Node.js, and forms the foundation of modern runtimes like Deno and Bun.

By contrast, CommonJS is the non-standardized module system adopted by much of the ecosystem prior to ESM being widely available.

The **entire** JavaScript ecosystem is converging on the ESM standard.

Managing two parallel module systems (ESM and CJS) creates significant challenges. Library authors face increased complexity, while users encounter frustrating and hard to debug issues.

For years, the Storybook team wanted to advance the ecosystem (and reap the performance benefits) by also adopting the ESM-only approach.

Unfortunately, we had to keep postponing this transition. The potential for disruption was considerable, and we lacked a clear path forward that wouldn't break substantial portions of the ecosystem.

## 🫤 Dual builds were painful

To support both CommonJS and ESM, Storybook has been shipping dual builds. We compiled and distributed our source code twice: both as ESM and CommonJS.

This approach worked for a while, but came with significant drawbacks:

-   Nearly doubled package sizes
-   Greater maintenance complexity
-   Subtle bugs from duplicate or mismatched packages
-   Necessary workarounds in builders and core to prevent these bugs

For Storybook 10, we were planning to finally make the transition to ESM-only and accept the disruption.

However, thanks to the incredible work on `require(esm)` by [Joyee Cheung](https://github.com/JoyeeCheung?ref=storybookblog.ghost.io) (and everyone else involved), we can now make this transition for Storybook without breaking the ecosystem around it.

To everyone involved in that work, we cannot thank you enough for making that happen. If you have not read her [blog post](https://joyeecheung.github.io/blog/2024/03/18/require-esm-in-node-js/?ref=storybookblog.ghost.io) or seen her amazing [talk](https://www.youtube.com/watch?v=YRueCer2kig&ref=storybookblog.ghost.io) about the matter, we highly recommend both.

## 🪶 Dual builds caused bloat

Dual builds added extra weight for everyone installing and using Storybook.

Switching to ESM-only reduces the install size by ~**15%** compared to Storybook 9.

That reduction could have been closer to **50%.** After all, we did stop shipping one of the two distributions. The Storybook team chose to trade a bigger headline number for publishing **readable, unminified code**.

This has important advantages:

-   The code is human-readable out of the box
-   It’s easier to debug and maintain
-   It can be inspected and audited for security issues

We think a 15% size reduction is nothing to scoff at, and shipping unminified code will make Storybook a better part of the ecosystem, long term.

![Diagram showing Storybook 8's large and complex dependency graph, Storybook 9's 50% smaller and simpler one, and Storybook 10's 15% lighter bundle with deleted CSJ distribution.](https://storybookblog.ghost.io/content/images/2025/09/Keyframe-Storybook-ESM.png)

## 🧱What’s changing in Storybook 10?

Starting in Storybook 10, we're shipping ESM-only builds.

This change delivers several significant benefits:

-   Smaller package size (15%)
-   Cleaner codebase with fewer conditionals and workarounds
-   Reduced bugs from module duplication and aliasing
-   A more future-proof foundation for Storybook and its ecosystem

We've worked hard to maintain backward compatibility wherever possible. Most addons should continue to work seamlessly. For those that don't, we'll provide clear guidance and support.

You should be aware of these breaking changes:

-   You'll need a Node.js version that supports `require()` of ESM, these are `20.16`, `22.19`, `24` or higher.
-   Your Storybook config and story files must be valid ESM
-   More details available in our [migration guide](https://storybook.js.org/docs/10/releases/migration-guide?ref=storybookblog.ghost.io)

## 🧪 Try Storybook 10 today

Storybook 10 is currently in beta, with the stable release planned for a few weeks later.

You can try it in a new project with this command:

```
npm create storybook@next
```

If you have an existing Storybook 9 project, you can upgrade with this command. Use our automated migration wizard to help you along the way:

```
npx storybook@next upgrade
```

You can review the changes in our [migration guide](https://storybook.js.org/docs/10/releases/migration-guide?ref=storybookblog.ghost.io).

## 🦸 Looking forward

ESM is a significant step toward a healthier, simpler, and more unified JavaScript ecosystem. While dual module support served its purpose in getting us to this point, it's now time to move forward.

We're excited to make this transition in Storybook 10 and can't wait to see what new possibilities it unlocks.

* * *

We’d like to thank the following pioneers that made this change possible:

-   **Titus Wormer** (`@wooorm`) - Pushed the entire unified ecosystem to ESM despite community pushback and wrote extensively about the decision
-   **Rich Harris** - Creator of Svelte and early ESM advocate
-   **Marvin Hagemeister** - Maintainer of Preact who helped navigate its transition
-   **Fred K. Schott** - Creator of Snowpack and Astro; strong early ESM advocate
-   **Guy Bedford** - Co-author of the Node.js ESM implementation who worked on JSPM and Import Maps
-   **Joyee Cheung** - Key contributor to Node.js ESM implementation who recently improved compatibility, making transitions like Storybook's possible
-   **Sindre Sorhus** - Maintainer of hundreds of popular npm packages that have gone ESM-only (including `got`, `meow`, `conf`, and `update-notifier`)

> Storybook 10 (now in beta) is ESM-only. 🤏 Smaller package size (15%) 🫧 Cleaner, simpler codebase ⛓️‍💥 Reduced bugs from module duplication and aliasing 🧱 A more future-proof foundation for Storybook and its ecosystem Read all about why we’ve made the transition and what it means for you:
> 
> — [Storybook (@storybook.js.org)](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t?ref_src=embed&ref=storybookblog.ghost.io) [2025-09-23T18:00:27.087Z](https://bsky.app/profile/did:plc:osfpupzlwycyr6dxic6adh7t/post/3lzjiuzva6s2d?ref_src=embed&ref=storybookblog.ghost.io)