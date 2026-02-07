---
title: "Next.js 16.1"
source: "https://nextjs.org/blog/next-16-1"
publishedDate: "2025-12-19"
category: "frontend"
feedName: "Next.js Blog"
author: "Luke Sandberg"
---

Next.js 16.1 focuses on faster development workflows and improved stability, with major updates to Turbopack and tooling.

-   [**Turbopack File System Caching for `next dev` (stable)**](#turbopack-file-system-caching-for-next-dev): Improved compile times for `next dev` by default.
-   [**Next.js Bundle Analyzer (experimental)**](#nextjs-bundle-analyzer-experimental): Optimize your code with our new interactive tool.
-   [**Easier debugging**](#easier-debugging-with-next-dev---inspect): Debug your Next.js app with `next dev --inspect`.
-   [**Transitive external dependencies**](#improved-handling-of-serverexternalpackages): Turbopack can automatically handle transitive external dependencies with no warnings.

## Upgrade Today[](#upgrade-today)

## Turbopack File System Caching for `next dev`[](#turbopack-file-system-caching-for-next-dev)

Turbopack file system caching for `next dev` is now stable and on by default. Compiler artifacts are stored on disk, leading to significantly faster compile times when restarting your development server, especially in large projects.

Internal applications at Vercel have been dogfooding this for the past year. To learn more about how we built file system caching for Turbopack, watch [Luke Sandberg's talk at Next.js Conf](https://nextjs.org/conf/session/are-we-turbo-yet).

Following this release, we'll be stabilizing file system caching for `next build`. See our [documentation](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopackFileSystemCache) for more information, and share your [feedback](https://github.com/vercel/next.js/discussions/87283) on the dedicated GitHub discussion.

## Next.js Bundle Analyzer (experimental)[](#nextjs-bundle-analyzer-experimental)

Next.js 16.1 includes a new experimental [Bundle Analyzer](https://nextjs.org/docs/app/guides/package-bundling#nextjs-bundle-analyzer-experimental) that works with Turbopack. It makes it easier to optimize bundle sizes for both server and client code—helping improve Core Web Vitals, reduce lambda cold start times, and identify bloated dependencies.

Running the command launches an interactive UI to inspect production bundles, identify large modules, and see why they're included.

[![The Next.js Bundle Analyzer showing a treemap with TopNav.tsx selected, revealing its import chain.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fstatic%2Fblog%2Fnext-16-1%2Fbundle_analyzer_light.png&w=3840&q=75)![The Next.js Bundle Analyzer showing a treemap with TopNav.tsx selected, revealing its import chain.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fstatic%2Fblog%2Fnext-16-1%2Fbundle_analyzer_dark.png&w=3840&q=75)](https://turbopack-bundle-analyzer-demo.vercel.sh/)

The Next.js Bundle Analyzer showing a treemap with TopNav.tsx selected, revealing its import chain.

> **Try it yourself:** [Open the interactive Bundle Analyzer demo](https://turbopack-bundle-analyzer-demo.vercel.sh/) to explore the module graph.

The Bundle Analyzer is deeply integrated into Next.js, allowing you to:

-   Filter bundles by route
-   View the full import chain showing why a module is included
-   Trace imports across server-to-client component boundaries and dynamic imports
-   View CSS and other imported asset sizes
-   Switch between client and server views

The Bundle Analyzer is in early development and will be improved further in future releases. Share your feedback on the dedicated [GitHub discussion](https://github.com/vercel/next.js/discussions/86731).

## Easier Debugging with `next dev --inspect`[](#easier-debugging-with-next-dev---inspect)

You can now enable the [Node.js debugger](https://nodejs.org/en/learn/getting-started/debugging) by passing `--inspect` to `next dev`. Previously this required passing `NODE_OPTIONS=--inspect` and would attach the inspector to all processes spawned by Next.js instead of only to the process running your code.

## Improved Handling of `serverExternalPackages`[](#improved-handling-of-serverexternalpackages)

Next.js allows you to keep dependencies unbundled using [`serverExternalPackages`](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages). Previously, this only worked reliably for direct dependencies. If you used a library that internally depends on something like `sqlite`, and needed to externalize `sqlite`, you'd have to add it to your own `package.json`—even though it's not your direct dependency. This workaround leaked internal implementation details, created maintenance burden, and could lead to impossible version conflicts when multiple packages required different versions of the same dependency.

Next.js 16.1 fixes this for Turbopack, which now correctly resolves and externalizes transitive dependencies in `serverExternalPackages` without additional configuration.

## Other Updates[](#other-updates)

-   **20MB smaller installs**: Next.js installs are about 20MB smaller thanks to simplifications in the Turbopack file system caching layer.
-   **New `next upgrade` command**: A new [`next upgrade`](https://nextjs.org/docs/app/getting-started/upgrading#latest-version) command makes upgrading easier. Going forward, you can just run this to upgrade Next.js versions.
-   **MCP `get_routes` tool**: The [Next.js DevTools MCP server](https://nextjs.org/docs/app/guides/mcp) now has a `get_routes` tool to get the full list of routes in your application.
-   **`generateStaticParams` timing**: Time spent on [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) is now logged as part of the timings shown for requests in development.
-   **Build worker logging**: `next build` "Collecting page data" and "Generating static pages" now log the number of worker threads used.
-   **Improved async import bundling**: Turbopack has improved bundling of async imports in dev to reduce the number of chunks produced, avoiding certain pathological but real-world cases.
-   **Relative source map paths**: Turbopack now produces source maps with relative file paths for server-side code, improving compatibility with Node.js and other ecosystem tools.

## Feedback and Community[](#feedback-and-community)

Share your feedback and help shape the future of Next.js:

-   [GitHub Discussions](https://github.com/vercel/next.js/discussions)
-   [GitHub Issues](https://github.com/vercel/next.js/issues)
-   [Discord Community](https://nextjs.org/discord)

## Contributors[](#contributors)

Next.js is the result of the combined work of over 3,700 individual developers. This release was brought to you by:

-   The **Next.js** team: [Andrew](https://github.com/acdlite), [Hendrik](https://github.com/unstubbable), [Janka](https://github.com/lubieowoce), [Jiachi](https://github.com/huozhi), [Jimmy](https://github.com/feedthejim), [Jiwon](https://github.com/devjiwonchoi), [JJ](https://github.com/ijjk), [Josh](https://github.com/gnoff), [Jude](https://github.com/gaojude), [Sam](https://x.com/samselikoff), [Sebastian](https://github.com/sebmarkbage), [Sebbie](https://github.com/eps1lon), [Wyatt](https://github.com/wyattjoh), and [Zack](https://github.com/ztanner).
-   The **Turbopack** team: [Benjamin](https://github.com/bgw), [Luke](https://github.com/lukesandberg), [Niklas](https://github.com/mischnic), [Tim](https://github.com/timneutkens), [Tobias](https://github.com/sokra), and [Will](https://github.com/wbinnssmith).
-   The **Next.js Docs** team: [Delba](https://github.com/delbaoliveira), [Rich](https://github.com/molebox), [Ismael](https://github.com/ismaelrumzan), and [Joseph](https://github.com/icyJoseph).

Huge thanks to @kdy1, @eps1lon, @SyMind, @bgw, @swarnava, @devjiwonchoi, @ztanner, @ijjk, @huozhi, @icyJoseph, @acdlite, @unstubbable, @gnoff, @gusfune, @lukesandberg, @sokra, @hayes, @shuding, @wyattjoh, @marjan-ahmed, @timneutkens, @ajstrongdev, @zigang93, @mischnic, @Nayeem-XTREME, @hamirmahal, @eli0shin, @tessamero, @gaojude, @jamesdaniels, @georgesfarah, @timeyoutakeit, @sequencerr, @Strernd, @lucasadrianof, @wbinnssmith, @hamidreza-nateghi, @jokokoloko, @dijonmusters, @H01001000, @xusd320, @lubieowoce, @KaziMahbuburRahman, @zhiyanzhaijie, @feedthejim, @that-one-arab, @JamBalaya56562, @shrink, @florianliebig, @allenzhou101, @benmerckx, @ymc9, @Marukome0743, @pyrytakala, @danpeleg4, @gaearon, @styfle, @jhuleatt, @muhammadsyaddad, @roelvan, and @SukkaW for helping!