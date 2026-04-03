---
title: "Build with more context and more control in Figma Make"
source: "https://www.figma.com/blog/introducing-make-kits-and-make-attachments/"
publishedDate: "2026-04-02"
category: "design"
feedName: "Figma Blog"
---

AI can generate a UI in seconds. The first draft looks convincing, with a clear layout and interactions that feel right. But it’s not your design system: The components aren’t yours, the copy is placeholder, and the edge cases that actually matter are nowhere to be found. What starts as a fast first pass becomes a slow review process spent rewriting instead of refining.

The issue isn’t the quality of the draft. It’s that it doesn’t have the same context your team uses in production. Today, we're changing that with [Make kits](https://help.figma.com/hc/en-us/articles/39241689698839) and [Make attachments](https://help.figma.com/hc/en-us/articles/31304529835671-Attach-files-to-a-prompt). They bring structured context that works at two levels: design system context from your code (kits) and project context from the files you’re working with (attachments). With these updates, exploration starts closer to your design context—allowing you to move faster and generate designs grounded in how your product works.

## [Make kits: Teach Make about your design system](#make-kits-teach-make-about-your-design-system)

**npm packages** are shared JavaScript modules you install from the npm registry to power your app. They act as reusable building blocks your app can depend on.

Make kits let design system authors create customized, reusable packages that combine their library’s components or styles with [detailed guidelines](https://developers.figma.com/docs/code/write-design-system-guidelines/) that teach Make how to use them. You can bring in code components through npm packages—whether from a public registry or Figma's [secure private registry](https://developers.figma.com/docs/code/bring-your-design-system-package)—or use styles and tokens from your Figma library. In both cases, guidelines teach Make not just what components or styles exist, but how they should be used.

Before Make kits, you might have generated a generic v1 and then prompted further refinements—adjusting spacing, patterns, and matching components to your design system. With Make kits, that starting point shifts. Makes begin with production-aligned components, so structure matches your codebase from the start. Components follow the same structure as your codebase. The result is less cleanup before review and a shorter distance between what’s prototyped and what ships.

### [What this looks like in practice](#what-this-looks-like-in-practice)

Make kits work like a set of building blocks. The more specifically you define how those pieces should be used, the more reliably Make can assemble something that holds up. The impact shows up most clearly in shared surfaces used across teams and workflows:

-   More consistency across forms, dashboards, settings, and onboarding flows
-   The ability for teams to generate in parallel without drifting from the design system
-   Less time spent fixing context before review

For teams working closely with engineering, there are additional benefits:

-   Engineers recognize the components and patterns immediately
-   Fewer questions like “Is this custom?” arise
-   More focus on the actual proposal, not the translation of the design

When engineers recognize what they’re looking at and don’t have to question it, teams can move from validating the work to refining it.

This is just the beginning. As Make kits continue to evolve, we’re working toward bringing even more of your design system into Make—including replicating component structures from Figma libraries—so the output more accurately reflects your design intention, whether it’s based in code or inside Figma.

![UI panel showing two selected libraries, “Earthling Brand” with 269 components and “Earthling Components” with 12,378 components, plus a section listing @earthling-ui packages for mobile and web with checkmarks enabled.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADeUlEQVR4nHXUf0yUdRzA8VPXXGmOMNdqrrn+qfVH89BjA2wylm0ltyaIx4+4X3L+AxTy07NTBimsE092NzSH/GghzciSSRqzFQtQcHoHB/eD47g7TobQ5MCOBWLybvc8tJjWH6892/PHe8/32ffzkUiUUtYopTynimGDRsZGbSwvaiJkbIrQrlh5t9pr2VnEp15HvncO+QcLAkkktl69k615SUiL5Owo/BBZUTJJ5VmkmD5BYS4WpFtKyKgrJbOuTJBRV4bWXEve5zc5oLOTkNJF7Ec/I1mr3M5Lunh26feTrk8lJT+RtII9lJ89QsfNTnocdwX9o3asARcD426BbdyF1e+jvc+N+nQD29QHic7IEIObDyXwniGdHIMC1adJaAvfx9xYyaDLxsT0pGB69gGh8Byh+YeCmfmHTIfn+HV0mOzz5WzWJbAue7sYjNLFsadSg+FCBdWNFRibT9ByvYVexx1sPpdgIDCCPTjK0D0vwxNjgqGJMdpt3aRZSojKiWNtJLhOKRW+cP/pwzRcu8iVrm+5+tt3dNt6GfZ58NzziyYCeCfHCfw+SXBmSuB/MEWn00bmOQPRungxGJ2Zxas5clKNBdS11dNy+Utavz/Pje5OBjwOnAEvzsAorvExRib8eO6P450OMjodxD0VpN3ej+LsUSEoHFm67wqvZ+cj03+M2lRCrqmM/Noy9E1fUP1DPcaOJoxXmzB2NHPqx684dW21Zkou1RJXoWSDNpbI75MkJrt4I+sYMUezUZ37jLzGavIbqyj42khxq4nibyLOPPU0UdRqorDVhPZCBVKDghc0kaAUye5kN28qK8m0HOdy/w16nFbxmnjs3PU7sQbc/8HFbZ+TW14Hl27/QpqllOiclSPvTnbxtuoEeY012H1u5mbnCIVChMNhlpaWWF5efsZfT56w+OgR4YVF+gI+DjacZMuhXauCajE4OOYSgrOzs2Lw8eP/Dy4u8MefC/T4fajqq3j536B45HSzgbZbP9HrEI/c5xnE6o9MxsgzbH4vQ54phlzztPWOsO/McaJyVq5NYvII2zKP8VZxGntrclGYSzggzG6pMK//zK7oiPBUWaopruniZNUMuRV3eOdwLus1MmHJSBLlHrYq9DyvjGOjZoe4YVY8vV0iW2iTZievKOXI0i4il9/n3ZRutmQpWaOMIbK5/gbtzyMfZgsA8gAAAABJRU5ErkJggg==)![UI panel showing two selected libraries, “Earthling Brand” with 269 components and “Earthling Components” with 12,378 components, plus a section listing @earthling-ui packages for mobile and web with checkmarks enabled.](https://cdn.sanity.io/images/599r6htc/regionalized/c1de4013e89579987c5244b9b8f4946090ab5c41-1608x1206.png?w=804&h=603&q=75&fit=max&auto=format)

Import code packages or sync design libraries in Make.

## [Make attachments: Ground your prototype in the project, not just the design system](#make-attachments-ground-your-prototype-in-the)

Make kits ensure that your design system is the foundation of every Make you generate. But every project has nuances not found in a component library: real data, migration constraints, edge cases, compliance requirements, and content.

That’s where attachments come in.

Make attachments support PDFs, markdown files, CSV and JSON datasets, screenshots, brand guidelines, legal copy, images, media, and SVGs.

Make attachments let you bring real project context directly into Make—from PDFs, datasets, screenshots, and more. Instead of summarizing everything in a long prompt, you attach the source material and let Make reference it directly. The difference becomes clear when you’re prototyping something complex.

![A collection of files including JSON, SVG, and CSV assets shown alongside a code editor with React components.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADQUlEQVR4nF2TW28bRRTH9zM0SWOHJPZeZndmvXZuVb9A7EggJU0iBAhxESCVCmjtXmLn4l171/Y6TuyktEIqaRApl2eeeALEUz7Xr9p1UyIe/jpnVjO//c85Z7Rms8l17e4ecv+7X7j/7a80GgP8ICBotQhaAa1Wi3a7nSoMw3HeGq+vpAVBgO/7NJs+SV7f+Z4vPvuXTz++5GHtBb7fSr9fh/0fGIbh27V2teHqwN7eM+5+9Q9ffn7J40dn7Db2efK4Ru1hjVqtRrU6jqmqVarVahprtSoPqg/Qoiii3U7+EJHkneiYwP8Jv/kK3x9y7+7XbG68R+XdCqtra5QrFSqVMmuV1TSuliupyuUKa+U1tMTZ/v5+6rDT6dDvH3J8PGQ4PCGKOnz04QcUSx455ZIrlBBK4Ml5imqOgsphSYHuKITt4jkltHbY5uDgIL1u6rDTodfr0e/309ptbW1h2A4TwmPKW0GXOiVnkiV5gwU5iWPPkBc6urCxTQctOdztdul2uoRJsRNwojBMnW9ubmI4kgmnxFTpNoZrsqQmueXeSLWsJnBlBsPRydli7DBM69imF4b8ODzifHTMoBNRr9fZ2Nh4A1x4C1xUkyy7Eyy5UyypKYpOFtMRzKgFtMAP0qv5gc9J3OPvi5dc/vYzZ8Mj6js7rK+vY9hqDCzexlAmJXkTT2WxlIlwDEq2oCQXsOUK2l4noNlOhjfg5LDPXxfnXP7+ivPTEY1G4w1QMmEXx0DXpah0lBLkVBHDcShKm2XlUXI8tK3zJ3wz3CeI2gzimPPnz7j44TknRwN293a5c2cDU9hM6oKbapF8YRGpPJQsIhwPYVsoJ4dr53EsHc368x7vv6zj96O0s6PRiJPRiMHgMO1+0mXLEtyceYeMbpB3BMKRSLuAtD2kcHBMgcibGPM62q0/anxydkDQ79DrjselH/eJ4zh929vb2wghmJ6eJjOTYV6fRdgGUhZw3UWUWkBaBUReYs0JtEcvYvzTmKjXTecwVTiex/8cWikw0exc0lEd0/UwCiuY7jKmpTBzFsasifb09CnD4ZBeHKeQRAk0mc3rDjNXwNkspp0nJ20ypmQ6L8jOzpPNZMlMZ3gNeXxfCob4hYsAAAAASUVORK5CYII=)![A collection of files including JSON, SVG, and CSV assets shown alongside a code editor with React components.](https://cdn.sanity.io/images/599r6htc/regionalized/f645af27333917def18184ed4bd26643d96a48f1-2160x1620.png?w=804&h=603&q=75&fit=max&auto=format)

Attach real files and code to bring structured context into your Make.

### [What this looks like in practice](#what-this-looks-like-in-practice)

Take a full onboarding flow for a digital product. You’re working with real user data, legal requirements, and multiple validation states. Before Make attachments, you might have described the flow in a prompt. Then, Make would produce a clean, idealized version—shortening legal copy, simplifying validation states, and reducing edge cases. With Make attachments, Make references the actual data or spec: Real values reveal layout constraints and edge cases surface earlier in the UI. The prototype becomes a grounded working draft instead of a visual approximation.

Beyond a single flow, you can use Make attachments to bring real context into everyday work. Instead of placeholders, you work with real content like brand guidelines, tone-of-voice documents, screenshots of existing surfaces, and real data. Stakeholders react to something closer to what will ship, so decisions happen faster and with more confidence.

Because these attachments are flexible and project-specific, they work across workflows, whether you’re testing a content-forward flow, validating data constraints, or evolving an existing surface. You don’t need a formal component library to benefit. With Make attachments, prototypes stop approximating the product and start reflecting how it actually works.

![A prompt interface in Figma Make with a video file being dragged in as an attachment.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAAECUlEQVR4nCWO+09TBwCF77+0GWdMjIm64KKZooAoU1FoKbSlLS2XUlrKvX3CpbRQKFCBggWRl4p76EAzxYHRTYnTwbo5efiYIsmkzAktmG8J++HknHw/nHzCqdJ8zlqNiIqTtk4nF3qd9PVV09droavbhL/Njl6RybNbyTJrOKzN40BRFvuLctlfnM9BvZajohWNuwZvi4wQCIk0RpxEYj5icReRjhqksBNLfSU6rxm1bOC0Q8cxUUdmmY6jBg3HDCqyTCUct5o4Uy2idtupaJCpi3oQojEn8T4XQ0MeLo+4GRj00dpTi9TiwlInYvFoMLtUlEhGCqQqimQnRq+TUr+EXpEoD8pILR4au3y09XgQyupt2EMVBFotdMZErgxL3L4eYPw7hdGRGi4PVjLQ76Qz7qepO4A3Wo+7TUFuq8Xe4qUm4iYQdRPukAi12xEOO6rJrjKhrilGCpq2DO9PRJn9Oc7sgziJh33MPBhi+t4lJn8cYXR8kNhoL5GhLtydjRgUO1q3EaOnlAq/ESGjwsbnZiOHyrU4mj3cnrrG/LNpXj1/wpuXs7z9K8HSywSvFn9jcSHB08WnPH72Bw8SM4zeuYm9tQ6VrMeqmAi1VyEcEkvJMBWz11CENRLkUWKG1dUVksnkVq+uJkkmV1h59/cW+7C2xloqzYfUOguv5hm51k+kx8fQsMKtsRaEr6p0ZJZryDAWY2uPMDM3Rzqd/j8baTY2Nrb2v2sp3r1f5/1ainR6k83NTVZXlpj9ZZw7P3RxbyLGzP1+hJN2EzmVJnKqrCi953m6uEAqtU5qfY2NjTQfP25uHS+v/MPMwhsScy9Zeru8Zb789gW/Phpj7Ho7V6+2cOP6OQSdtxKVy4Y16OPi1X6ezD7k2XyCP+cSLL2eJ7n8nNcvfmf68UPG7kxyY2KSyftTTE3/xNjUbWJDXcjNElbFiiNgRQi0y9S2uomeb2LwSjfdl+I093dzbqCHa98PMzVxhdFv+gjF4ygXviU8dAM5FsfQGEDld5HnKCdb1HK8QsNZmxqhucuLP1qLI9KALqBwTJLIdDg57XJjCSpUhwPolBCZvn4yQ1NkNd1ln7ODHdoSthfksltzghyxENFvpL5ZRCjwS+S6ZL6wOdhZWsa2Ej079EZ2m0QyKuwcsctkS0GyagfJbbpFbniCg+4edul0bD99hD3qbNTVasLRKoYHPAh7LCK7zSI7DQa2adR8ojrLp6p8Pisq5IDZhNYr4wwrBDqa6bzYQ3ykj4auMHqvSLa5kC8N+ZyxF+MMWGhoKUc4WG5iX5mBnXoN2zRn2FF0kl3qE+zV5FFg0xKMyPSer2N0MMDdsXamb3Uw/nUDkU4HZp+JnAoNR8QiTlWqKaw8xX8hozqEgUje6wAAAABJRU5ErkJggg==)![A prompt interface in Figma Make with a video file being dragged in as an attachment.](https://cdn.sanity.io/images/599r6htc/regionalized/09364e6e2f886e736651bb9cae10001910ee9ac6-1608x1206.png?w=804&h=603&q=75&fit=max&auto=format)

Add attachments directly to your prompt to ground your prototype in real content.

## [Reflecting how teams actually build](#reflecting-how-teams-actually-build)

When Makes use real packages, realistic content, and recognizable implementation patterns, they become easier for everyone to work with. Reviewers spend less time filling in missing context, and engineers can interpret the work quickly. With the [Figma MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/)

connecting design and code, the same components and structure used in Make can be reused in code workflows, reducing the need to reinterpret or rebuild.

With Make kits and Make attachments, Figma Make becomes a starting point grounded in how your product actually looks, feels, and behaves.

Structured context is just the beginning. Read more about how to get started with [Make kits](https://help.figma.com/hc/en-us/articles/39241689698839) and [Make attachments](https://help.figma.com/hc/en-us/articles/31304529835671-Attach-files-to-a-prompt) in the help center.