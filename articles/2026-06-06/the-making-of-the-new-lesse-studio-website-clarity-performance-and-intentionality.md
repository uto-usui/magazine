---
title: "The Making of the New Lesse Studio Website: Clarity, Performance, and Intentionality"
source: "https://tympanus.net/codrops/2026/06/05/the-making-of-the-new-lesse-studio-website-clarity-performance-and-intentionality/"
publishedDate: "2026-06-05"
category: "design"
feedName: "Codrops"
author: "Diogo Andrea"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Lesse.webp?x42294)](https://lessestudio.com/ "The Making of the New Lesse Studio Website: Clarity, Performance, and Intentionality Demo")

Lesse Studio was founded five years ago in Bali. Back then, we were a small team figuring things out as we went, delivering projects across many different frameworks, experimenting with different ways of working, and learning at least as much from our failures as from our successes. A lot has changed since then. We relocated to Italy, grew the team, and gradually developed a clearer understanding of how we wanted to work and what we truly valued in our technology stack.

## The Challenge

Our previous website leaned heavily into visual experimentation. It was atmospheric, expressive, and very much a reflection of where the studio was creatively at the time. We liked it. But over time, it became clear that liking your own website and having it actually work for your clients are two very different things. Navigation was loose, important information was harder to find than it should have been, and the overall experience, while visually interesting, wasn’t always comfortable for someone simply trying to understand what we do and whether we’re the right fit.

The core challenge of the new website was finding the right balance between creativity and functionality. We wanted to preserve the emotional and artistic essence of the brand while building something that naturally guides people through the experience. That’s a harder problem than it sounds, because the temptation during a redesign is either to play it safe and lose the brand’s identity or to double down on the art direction and end up with the same usability issues all over again.

_Simpler service display._

## The Solution

We redesigned the structure with a stronger focus on clarity and user flow, simplifying navigation and creating more intuitive paths throughout the site. We also made it easier to access the inquiry form and find information about our process at multiple points along the journey, because a beautiful website that makes it difficult to get in touch is ultimately failing at its purpose.

At the same time, it was important that the result still felt like us. Through refined typography, intentional layouts, minimal interactions, and subtle motion, we preserved the sense of atmosphere and creative energy that defines Lesse Studio. The visual identity remained intact. We simply stopped making people work to experience it. Creativity and functionality don’t have to be in conflict, and this rebuild was our way of proving that to ourselves.

_Our solution to an easier navigation._

## The Path to Optimization

One of the biggest turning points came last year when we decided to move away from cloud providers entirely. We had been running heavier services on AWS and deploying simpler websites on Vercel, like most studios of our size. It worked, but we were paying for convenience we didn’t fully need, and we had less control than we wanted. So we made the move to self-hosting everything on our own servers.

When you go down that road, you quickly find yourself facing two paths: you either burn out managing the complexity, security, and deployment pipelines, or you become completely addicted to it. We fell firmly into the second camp. One by one, every piece of our infrastructure moved in-house, and when the dust settled, our maintenance costs had dropped by orders of magnitude.

But something else happened, too. When you’re responsible for everything, you start thinking differently. You find yourself constantly asking whether you can squeeze one more instance into 16GB of RAM, whether a service really needs to be that heavy, and whether there’s a leaner way to achieve the same result. That mindset is what got our team obsessed with optimization.

It showed up first on the backend. We rewrote some of our services in Go and Rust, and the difference compared to our previous Node.js and Django setups was staggering, not marginal gains, but efficiency improvements on a completely different scale. We were running more, spending less, and sleeping better (Rust really doesn’t break).

But there was an elephant in the room that we had been ignoring for a long time. All of our frontend applications were still built with Next.js, Vue, Angular, or similar virtual DOM-based frameworks. On our own servers, the cost of that choice became impossible to ignore. A single Next.js instance could consume 500MB of RAM, especially when paired with an Express.js layer handling basic CMS functionality. Ten high-traffic websites consuming a minimum of 5GB between them—that’s not a performance concern; it’s a structural problem.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/Frame-1171275126-1200x900.png.webp?x42294)

So we started asking the question we should have asked much sooner: what should we be using instead?

I had heard of Svelte and SolidJS before. Svelte, in particular, had a reputation for being loved by almost everyone who used it. I knew it was lightweight, but I had never taken the time to fully understand why. So I decided to give it a try. What I found felt almost too good to be true: a framework that compiles down to precise, efficient JavaScript with no virtual DOM, no heavy runtime, and no bloated bundles. For a team that had spent the past year obsessing over RAM usage and efficiency, it felt like the missing piece of the puzzle.

We decided to use it for the next two projects we had lined up, simply to see how it would hold up in practice. It was an immediate success. Where our Next.js instances had been sitting at around 500MB of RAM under load, Svelte came in at roughly 30MB, and replacing Node.js with Bun reduced that even further, bringing it closer to 20MB. The numbers were clearly speaking for themselves.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/image-2.png.webp?x42294)

_Svelte consuming up to 10x less resources_.

So when it came time to rebuild our own agency website, the decision was easy. We chose SvelteKit and treated the project as a genuine experiment, not just a migration, but an opportunity to push the stack as far as we could. Everything runs within a single instance: a private CMS built directly into SvelteKit’s API layer for content management, Drizzle as a lightweight ORM for data storage, and all animations written from scratch without relying on a single animation library. Images are automatically converted to WebP during the upload pipeline and served through Cloudflare R2. Load times are fast, the footprint is small, and we have full control over every layer of the system.

The architecture itself is deliberately minimal. SvelteKit handles both the frontend and the server-side logic within a single process, which means no separate API layer, no additional network latency, and one less service to monitor. Routing, rendering, and data fetching all live together, and because SvelteKit’s server-side rendering compiles to plain JavaScript without virtual DOM overhead, the HTML that reaches the browser is already complete. There are no client-side hydration waterfalls and no layout shifts while JavaScript catches up with the markup.

For the CMS, we built our own. It’s nothing particularly complex, just a straightforward admin interface backed by Drizzle ORM on top of SQLite. The choice of SQLite is worth mentioning because it often surprises people. But for a content-driven site with predictable read patterns and no need for large-scale concurrent writes, SQLite is genuinely the right tool. It runs in-process, requires zero network overhead for queries, and stores the entire database in a single file on disk. Drizzle keeps the query layer type-safe without introducing the abstraction cost of heavier ORMs like Prisma, which can be unnecessarily heavyweight for projects of this scale.

Images were one of the first areas we optimized. Every asset uploaded through the CMS is automatically converted to WebP before it ever reaches storage—no manual export steps and no inconsistencies between editors. From there, files are sent directly to Cloudflare R2 and served from the edge without ever passing through our application instance again. After upload, the server never touches an image a second time.

Animations were another deliberate decision. Most teams reach for GSAP or Framer Motion without much discussion. They’re excellent libraries, but they come with a cost. Since Svelte ships with a built-in transition system and `use:` actions handle scroll-based triggers cleanly, we chose to write everything ourselves. The result is animation code that is fully tree-shakable and contributes nothing to the bundle unless it is actually used on a specific page.

Under real traffic, the server instance comfortably sits between 25MB and 40MB of RAM. None of that happened by accident. It came from treating every dependency as a cost rather than a default, and only paying that cost when there was a clear reason to do so.

That’s ultimately what a year of self-hosting taught us. When you can see exactly what each process costs, you stop thinking of frontend code as something that simply runs in the browser and start thinking of it as infrastructure. And once that shift happens, the question is no longer “Can we use this?” but rather, “Do we actually need it?”

Svelte fit naturally into that mindset. Not because it’s the trendiest choice or the framework backed by the biggest company, but because it follows the same principle we had already built everything else around: ship only what is necessary, and make what you ship count.

The browser benefits from it. The server benefits from it. And, ultimately, so does the planet.