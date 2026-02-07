---
title: "Remix ❤️ Vite"
source: "https://remix.run/blog/remix-heart-vite"
publishedDate: "2023-10-31"
category: "frontend"
feedName: "Remix Blog"
---

Today we’re excited to announce that unstable support for Vite is available in Remix v2.2.0! Now you get all the benefits of Vite’s lightning fast DX ⚡️ out-of-the-box when using Remix.

Try it out now!

```
# minimal server
npx create-remix@latest --template remix-run/remix/templates/unstable-vite

# custom Express server
npx create-remix@latest --template remix-run/remix/templates/unstable-vite-express
```

> Check out the new [docs for how to use Vite with Remix](https://remix.run/docs/en/main/future/vite)

So how fast is _lightning fast_ ⚡️? Well, we did some quick testing on the [Indie Stack](https://github.com/remix-run/indie-stack) with a M1 Max MacBook Pro and here’s what we found:

-   _10x faster HMR_ 🔥
-   _5x faster [HDR](https://www.youtube.com/watch?v=2c2OeqOX72s)_ 🔥

But we didn’t switch to Vite just for the speed. Unlike traditional build tools, [**Vite is specifically designed for building frameworks**](https://vitejs.dev/guide/philosophy.html#building-frameworks-on-top-of-vite).

In fact, with Vite, Remix is no longer a compiler. **Remix itself is just a Vite plugin**:

```
// vite.config.ts
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [remix()],
});
```

With this you’ll also get access to the entire ecosystem of [Vite plugins.](https://vitejs.dev/plugins) This lets us focus on making the core of Remix the best that it can be while letting Vite plugins handle the rest. Want to import SVGs as React components? There’s a [Vite plugin](https://github.com/pd4d10/vite-plugin-svgr) for that. Using `tsconfig` path aliases? [Vite plugin.](https://github.com/aleclarson/vite-tsconfig-paths) Prefer to use Vanilla Extract? [Vite plugin.](https://vanilla-extract.style/documentation/integrations/vite/) Want to use MDX? [Vite-compatible Rollup plugin.](https://mdxjs.com/packages/rollup/) Need something custom? [Write your own plugin!](https://vitejs.dev/guide/api-plugin.html)

Here are even more benefits you’ll get when using the Remix Vite plugin:

-   **Near-instant dev startup.** Vite lazily compiles your app code on-demand, so the dev server can boot immediately.
-   **Pre-bundled dependencies.** Vite only processes dependencies once, so large libraries like Material UI and AntD don’t become bottlenecks for rebuilds nor hot updates.
-   **Incremental hot updates.** Vite keeps track of dependencies so it only needs to reprocess app code that depends on the changes.
-   **Greatly reduced memory usage.** Vite understands `import` statements and can invalidate stale modules on the server efficiently without relying on memory-hungry tricks to bypass the `import` cache. This should eliminate existing out-of-memory errors during development.
-   **Automatic route-based CSS splitting.** Vite’s CSS splitting only loads the styles needed for the current page.
-   **Better browser state preservation during HMR.** Vite’s built-in HMR runtime and error overlay ensure that browser state stays intact even in the presence of server errors.
-   **Automatic hot server updates.** Code changes that affect the server are immediately reflected in your running server without restarting and without any [`global` tricks](https://remix.run/docs/en/main/guides/manual-mode#keeping-in-memory-server-state-across-rebuilds)
-   **ESM & CJS interop.** You author ESM, Vite outputs ESM. Your dependencies can be ESM or CJS. Vite handles the rest.
-   **TypeScript for all your files.** No more `.js` or `.mjs` files needed at the root of your project. Use `vite.config.ts` and even run your custom server via `tsx server.ts` or `node --loader tsm server.ts`.
-   **Workspaces.** Improved workspace compatibility for monorepos. Use with any package manager supported by Vite: `npm`, `yarn`, `pnpm`, etc.
-   **Browser compatibility targets.** Use Vite’s [`build.target`](https://vitejs.dev/config/build-options.html#build-target) or grab a [plugin for browserslist support](https://github.com/marcofugaro/browserslist-to-esbuild).

## Why now?

Let’s start at the beginning. Why didn’t Remix start off using Vite? The short answer is that a stable release of Vite didn’t exist yet!

Remix development began in [July 2020](https://github.com/remix-run/remix/commit/4f03decc88a3b3a27ca08ee02750b5dbb6ff1542), but [Vite’s first stable release](https://github.com/vitejs/vite/issues/1207) wasn’t until [February 2021](https://github.com/vitejs/vite/blob/v2.0.5/packages/vite/CHANGELOG.md). Even then, there were three blockers for adopting Vite:

1.  Stable SSR support
2.  Non-Node runtime support (Deno, Cloudflare)
3.  Server-aware, fullstack HMR

In the meantime, the Remix compiler switched from Rollup to esbuild in [March 2021](https://github.com/remix-run/remix/commit/d87b60c1a52e4bb39d0fde6b0fe218d3cf6c7af2).

In [July 2022](https://github.com/vitejs/vite/pull/8987), Vite stabilized SSR support and just a few months later in [September 2022](https://github.com/denoland/deno/issues/15427#issuecomment-1255526747) Deno became Vite-compatible. Making progress, but Vite was still missing Cloudflare support and server-aware HMR.

Meanwhile at the [end of 2022](https://remix.run/blog/migrate-from-webpack), we were focused on helping users migrate from Create React App and Webpack to Remix. Then in [March 2023](https://react.dev/), React stopped recommending CRA and officially recommended fullstack frameworks, including Remix. We began 2023, ready to tackle server-aware HMR and in [May 2023](https://www.youtube.com/watch?v=79M4vYZi-po) we finally cracked it with Hot Data Revalidation.

At this point, half of the Remix team was heads down working on compiler improvements for polyfills and optimizing rebuilds. For many users, the main bottleneck was reprocessing large component libraries like Material UI and AntD, so we started looking into pre-bundling dependencies. When prototyping a solution, we realized we would need to reimplement module caching, dependency tracking, and transformation pipelining from scratch on top of [esbuild’s low-level plugin system](https://esbuild.github.io/plugins/#plugin-api-limitations). In short, we’d effectively be building a worse version of Vite. So in [June 2023](https://github.com/pcattori/revive), we started prototyping a Vite plugin for Remix.

That left Cloudflare support in Vite as the last missing piece. Today, we’re working directly with the CF core team and are confident that we can deliver best-in-class CF support before the Remix Vite plugin stabilizes.

## We’d love your feedback

You know what they say: if your unstable release is bug-free, you shipped too late. 😅 But seriously, we want to hear from you.

We’ve got a couple [known issues,](https://github.com/remix-run/remix/issues?q=is%3Aopen+is%3Aissue+label%3Avite) so be sure to look at those (both open and closed) before filing a bug report. Does it work the way you expect? Is there anything missing? Did you find the [migration guide](https://remix.run/docs/en/main/future/vite#migrating) helpful? Let us know!

## Thanks Vite!

Our users say that Remix made web development fun again. For us, Vite made framework development fun again. We're excited to join the extensive and welcoming Vite ecosystem, and proud to announce that Remix and Shopify will now be sponsoring Vite!

Vite is an amazing project and we’re grateful to the Vite team for their work. Special thanks to [Matias Capeletto (patak), Arnaud Barré, and Bjorn Lu from the Vite team](https://vitejs.dev/team.html) for their guidance.

The Remix community was quick to explore Vite support and we’re grateful for their contributions:

-   [Discussion: Consider using Vite](https://github.com/remix-run/remix/discussions/2427)
-   [remix-kit](https://github.com/jrestall/remix-kit)
-   [remix-vite](https://github.com/sudomf/remix-vite)
-   [vite-plugin-remix](https://github.com/yracnet/vite-plugin-remix)

Finally, we were inspired by how other frameworks implemented Vite support:

-   [Astro](https://astro.build/)
-   [SolidStart](https://start.solidjs.com/getting-started/what-is-solidstart)
-   [SvelteKit](https://kit.svelte.dev/)