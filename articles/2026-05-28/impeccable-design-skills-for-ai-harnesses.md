---
title: "Impeccable: Design skills for AI harnesses"
source: "https://impeccable.style/"
publishedDate: "2026-05-27"
category: "design"
feedName: "Sidebar"
---

Highlights since v3.0 April 10 – May 13, 2026

-   **Live mode preserves identity by default.** Variants stay on-brand for the existing surface and explore different expression axes within that identity. Departure from the current aesthetic only triggers when PRODUCT.md anti-references explicitly reject the current surface, or the user asks for it. Departure directions derive from brand voice, not a fixed catalog.
-   **Detector flags the new monoculture.** The overused-font rule now catches Fraunces, Geist, Mona Sans, Plus Jakarta Sans, Space Grotesk, Recoleta, and Instrument Sans. Contrast checks run on styled `<a>` and `<button>` elements. Brand exceptions for Vercel, Next.js, and GitHub on their own domains.
-   **Live mode works everywhere.** Strict-CSP apps, modal hosts (Radix, Headless UI, vaul), React/TSX projects, and repeated identical-class siblings all handle cleanly through the wrap, preview, accept, and carbonize loop.
-   **PRODUCT.md + DESIGN.md as shared context.** A strategic file (who, what, why) and a visual file (colors, typography, components in the [Google Stitch format](https://stitch.withgoogle.com/docs/design-md/format/)) that every command reads before generating. Created via `/impeccable teach` and `/impeccable document`.
-   **18 skills became 1 skill with 23 commands.** One `/impeccable` entry in the menu, shared design vocabulary, and `/impeccable pin` to promote favorites back as standalone shortcuts.

Full version history

-   **`/impeccable critique` works on Windows.** The CLI entry-point check in `critique-storage.mjs` compared `import.meta.url` against a hand-built `file://` string, which silently failed on Windows because Node returns forward slashes in `import.meta.url` but backslashes in `process.argv[1]`. The script exited 0 with no output and the snapshot save was skipped. Switched to `pathToFileURL`, the standard cross-platform pattern. Reported by [@Genmutant](https://github.com/Genmutant) in [#155](https://github.com/pbakaus/impeccable/issues/155) with a precise side-by-side diagnosis of the path mismatch.

-   **Codex asset producer agent.** A native Codex subagent that produces clean, reusable raster assets from approved Impeccable mock references without redesigning the direction. Preserves silhouette, palette, lighting, and material; strips baked-in UI text and presentation chrome that CSS should own. Codex-only because Codex is the harness with native image generation today. Cross-compile pipeline (`skill/agents/` -> Codex TOML or Claude Markdown) is in place for future agents.
-   **Critique persistence.** Each `/impeccable critique` run now writes a per-target snapshot to `.impeccable/critique/<timestamp>__<slug>.md` with score, P0/P1 counts, and full report. `/impeccable polish` reads the latest matching snapshot as additional signal when invoked on the same target, so you stop re-deriving the backlog. `ignore.md` at the same path is user-curated; lines there are designer-intended deviations that critique will not re-raise.
-   **Codex-specific image flow extracted.** The mock-and-palette workflow lives in `reference/codex.md` with a palette-first gate (lock the palette before any mocks, so generated comps stop drifting). Craft.md is shorter and cleaner for every non-Codex harness, and Codex gets sharper, denser guidance for the part it can actually do.
-   **Detector: new rule + false-positive fixes.** `body-text-viewport-edge` catches body text running to the absolute viewport edge (29 deterministic rules now). OKLCH and CSS-var resolution improvements remove a class of false positives in modern token-based codebases. Anchor-inheritance fix stops misreading link text inheriting color from a styled parent.
-   **Brand register sharpened.** An "inverse test" question now sits up front: describe your page the way a competitor would describe theirs; if that sentence fits the modal landing page in the category, restart. A cultural-symbol palette guardrail catches the lazy pull (reach past the obvious colour, let the cultural reading come from typography and imagery instead).
-   **Shape and craft gates strengthened.** Image-gen skips are announced in one line (silent skips let GPT 5.5 quietly elide image work). Brief confirmation is explicit, not assumed. When the harness has native image generation, craft now names the four user gates between shape and code (direction questions, palette generation, mock generation, mock approval) with explicit STOP markers at each, so a compact shape's "confirm or override" stops reading as code-green.
-   **Skill prose, image discipline, and detector counts kept honest.** A skill-side prose validator catches em dashes and the worst AI tells in reference instructions. Craft step 3 reads the screenshot back into context after capture (taking is not inspecting). Build validator now ignores changelog history when checking detector counts, so historical "28 rules" references don't false-flag against the current total.

-   **Detector flags italic-serif display heroes.** Oversized italic serif (Fraunces, Recoleta, Newsreader, Playfair, Cormorant, Tiempos) running as the primary hero h1 is now caught as a structural fingerprint of late-2025 and early-2026 AI-generated marketing pages. Editorial and magazine surfaces that legitimately want the pattern can ignore the rule. Contributed by [@vinaypokharkar](https://github.com/vinaypokharkar) in [#129](https://github.com/pbakaus/impeccable/pull/129).
-   **Detector flags hero eyebrow chips.** The uppercase letter-spaced label sitting directly above a hero h1 now fires, including the pill-chip variant (background plus 999px border-radius). Bounded to short labels at small sizes so editorial captions and ordinary subheads do not false-positive. Also contributed by [@vinaypokharkar](https://github.com/vinaypokharkar) in [#129](https://github.com/pbakaus/impeccable/pull/129).
-   **Live mode survives disconnects.** A durable session journal records every event, so an agent crash, a network blip, or a browser refresh no longer loses the session. Three new sub-commands: `live status` reports current state, `live resume` rejoins after a break, and `live complete` finalizes a manually accepted variant. Acknowledgement, polling replies, and fallback recovery all flow through the journal. Contributed by [@nqh-packages](https://github.com/nqh-packages) in [#125](https://github.com/pbakaus/impeccable/pull/125).
-   **Reference files stripped of repetitive scaffolding.** SKILL.md and 33 sub-command files lost the "Remember:" closer chants, the brochure-style "\[Verb\] \[object\] to \[outcome\]" openers on 12 older commands, and 419 em-dashes that obscured the choice between colon, semicolon, period, or parens. Surviving closers hand off to `/impeccable polish` instead of restating the rules. Less context per command load, less repetition the model has to read past.

-   **Live mode preserves identity by default.** Variants now stay on-brand for the existing surface (same palette, same type pairing, same visual rhetoric) and explore different expression axes within that identity. Departure from the existing aesthetic only triggers when PRODUCT.md anti-references explicitly call out the current surface, or the user asks for it.
-   **Departure mode derives from brand voice, not a fixed catalog.** The old lane list (Swiss-grid, Terminal, Industrial-signage, etc.) caused the model to converge on the same three directions every time. Replaced with a brand-voice derivation process: read personality words, imagine physical experiences, derive visual directions. Each run produces directions specific to the brand.
-   **Parameters ship consistently on large surfaces.** Planning params is now part of variant planning, not a separate step. The freeform bias aligns with the budget table: 2-3 knobs per variant for heroes and sections, with 0-param heroes flagged as mistakes rather than judgment calls.
-   **Reflex-reject aesthetic lanes.** Parallel to the font reflex-reject list in `brand.md`. Editorial-typographic is the first entry, catching the second-order training reflex where every departure from SaaS-cream defaults to magazine-cover aesthetics.
-   **Two-altitude category-reflex check.** The shared design laws now catch both first-order reflexes (theme + palette from category alone) and second-order reflexes (aesthetic family from category + anti-references).

-   **Contrast checks now run on styled buttons.** A styled `<a>` or `<button>` with its own opaque background was silently skipped by the contrast rule, so a "Get started" pill with charcoal text on a near-black background read as fine to the detector. Buttons with their own background and direct text now flow through the same contrast and palette checks as every other text element. Inline links inside paragraphs continue to skip, as before.

-   **Popup scan no longer hangs after a page reload.** The toolbar-icon flow worked the first time but got stuck on "Scanning…" on subsequent clicks if the page had been reloaded in between. The service worker only cleared its content-script-injected flag when DevTools was open, so the popup-only path saw a stale flag and silently sent its scan request to a tab whose content script had already been wiped. Reset is now unconditional; auto-rescan stays gated to DevTools.
-   **Detector flags the new monoculture.** The overused-font rule now catches Fraunces, Geist, Mona Sans, Plus Jakarta Sans, Space Grotesk, Recoleta, and Instrument Sans alongside Inter and the older defaults. Brand exceptions for Vercel, Next.js, and GitHub on their own domains.

-   **New rule: `body-text-viewport-edge`.** Catches body copy running to the absolute viewport edge with no horizontal padding (a structural AI tell where the model skipped layout and let everything butt against the window). Brings the deterministic rule count to 29.
-   **OKLCH and CSS-var resolution.** The contrast and color rules now resolve `oklch(...)` and `var(--token)` references through the cascade before evaluating. A class of false positives in Tailwind v4 / shadcn / token-based codebases is gone; previously the resolver bailed on modern syntax and reported nothing or the wrong thing.
-   **Anchor inheritance fix.** The contrast rules were misreading `<a>` color when the link inherited from a styled parent (e.g. a hero with a non-default text color), flagging real text as low-contrast against itself. Resolution now walks the inheritance chain correctly.
-   **Live screenshot overlay no longer flashes solid black during loading.** Pages with no explicit page background painted the overlay backdrop in pure ink for a frame before the screenshot loaded. The overlay now starts transparent and resolves once the bitmap is ready.

-   **Detector runs on Windows.** CLI path resolution used `new URL(...).pathname`, which prepends a slash to drive letters (`/C:/...`) and breaks `fs` on Windows. Switched to `fileURLToPath` across the board. Reported in [#95](https://github.com/pbakaus/impeccable/issues/95), contributed by [@voidborne-d](https://github.com/voidborne-d).
-   **Border-radius detection no longer flickers under jsdom.** The pill-button rule was missing real cases when jsdom returned a percent radius without an explicit width, and over-reporting when CSS shorthand left individual corners unset. The reader now preserves the percent signal and resolves shorthand consistently across the browser and jsdom paths, so CLI scans match what the live overlay sees.

-   **Live mode lands valid TSX through the wrap → preview → accept → carbonize loop on Vite/Next React/TSX projects.** The wrapper now keeps a single JSX-slot child instead of three adjacent siblings, so it round-trips cleanly inside `return (...)`, array `.map(...)`, and `asChild` parents like Radix's `<DialogPrimitive.Title>`. Carbonize stopped double-wrapping CSS in nested template literals on TSX targets, accept and discard restore the picked element at its original indent (with relative depth between lines preserved), and the screenshot overlay no longer flashes solid black on default-background pages. Closes [#114](https://github.com/pbakaus/impeccable/issues/114), with thanks again to [@dergachoff](https://github.com/dergachoff) for the detailed bug report.
-   **Wrap correctly disambiguates repeated identical-class siblings.** A list of `<Card className="card">` rendered three times with the same classes used to land on the first one regardless of which the user picked. `live-wrap.mjs` now accepts `--text TEXT` (the picked element's `textContent`) and narrows candidates accordingly, falling back to first-match when the text is too short or doesn't appear literally in source (children with interpolated values like `{title}`), and erroring with `element_ambiguous` when multiple branches still match equally.
-   **`live-inject` CSP-meta unwrap now byte-for-byte preserves self-closing tag whitespace.** The patch+revert cycle on a `<meta http-equiv="Content-Security-Policy" ... />` tag was eating the space before `/>` via a double-space artifact in the marker insertion path; common Vite shapes that ship a CSP meta now round-trip cleanly.
-   **`live.md` spec gained explicit guidance for three real authoring traps.** Variant CSS must use a descendant combinator (`:scope > .card`, not bare `:scope`) or it lands on the wrapper instead of the picked element. JSX `<style>` bodies need ``{`...`}`` template-literal wrapping. Aborting an in-flight session uses `live-poll --reply EVENT_ID error "msg"`, not `live-accept --discard`; the latter only mutates source while the bar stays stuck on GENERATING dots forever.

-   **`/impeccable craft` now treats approved mocks as visual contracts.** The craft flow requires a mock fidelity inventory before build, maps major visible ingredients to code or assets, and flags missing hero objects, imagery, section structure, nav/CTA treatment, and distinctive motifs as blocking defects unless the user accepted the deviation.
-   **Image-led brand surfaces can no longer degrade into abstract panels.** Travel, editorial, portfolio, venue, product showcase, entertainment, and education work now requires credible imagery, generated plates, illustrations, maps, renders, or destination scenes when the approved mock or subject matter calls for them.
-   **`/impeccable craft` and `/impeccable shape` hardened against autonomous agents.** Codex-class harnesses had started writing files before the user confirmed a design brief, treating their own summary as the brief. Setup now ships a preflight checklist (context, product, command reference, shape, image gate, mutation), and craft enforces an explicit build gate: `shape=pass` only counts when the user separately approves the brief or supplies a pre-confirmed one. Self-authored briefs and "the implementation will be semantic anyway" no longer skip the visual probe.
-   **Live picker plays nice with modal hosts.** Inside Radix Dialog, Headless UI, vaul, and other portals that lock `body { pointer-events: none }` or attach outside-click dismissers, the picker chrome had become unclickable, and any click that did land would dismiss the host dialog. The bar, picker, params panel, annotation overlay, and design panel now defang outside-handlers at the chrome boundary and force `pointer-events: auto` on themselves. Theme detection also stopped misreading a transparent body as black. Closes [#113](https://github.com/pbakaus/impeccable/issues/113), with thanks to [@dergachoff](https://github.com/dergachoff) for the thoughtful bug report.

-   **Claude Code plugin install shrunk by 380×.** The marketplace now ships only the runtime payload (~770 KB) instead of the entire monorepo (291 MB). Plugin source moved from `./` to `./plugin`, so the cache no longer copies `node_modules`, build scripts, tests, or the other harness directories. Reported in [#107](https://github.com/pbakaus/impeccable/issues/107).
-   **Slash commands now register reliably on Claude Code.** The `skills` field in `plugin.json` was missing the trailing slash that the documented schema expects (`"./skills/"`, not `"./skills"`), which caused Claude Code's plugin loader to skip command registration on some setups. Reported by three users in [#86](https://github.com/pbakaus/impeccable/issues/86).

-   **Live mode runs in strict-CSP apps.** When your HTML carries a Content-Security-Policy meta tag, `/impeccable live` now silently appends the live-server origin to `script-src` and `connect-src` (and `blob:` to `img-src` for the screenshot overlay) on session start, and reverts the patch verbatim on stop. Header-based CSP setups still get the existing detect-and-suggest path.
-   **Live mode survives conditional-render content.** Picking an element inside a closed modal, an inactive tab, or a collapsible panel used to wedge live mode when Vite Fast Refresh remounted the parent and reset state. Now: a brief upfront heads-up at pick time, plus a contextual toast after Go ("retrace the path that revealed it") so variants land the moment the element is back in the DOM. No more force-reload that masked the issue.
-   **Live mode no longer breaks JSX projects.** Three round-trip bugs in `/impeccable live`'s accept path are fixed: the carbonize stash now uses JSX-syntax style attributes and template-literal CSS, and the post-accept rewrite no longer leaks template-literal punctuation into the file. SvelteKit and other frameworks that hydrate after HTML parse now also resume cleanly post-reload.
-   **`/impeccable polish` now a true superset of the retired `/normalize`.** Aligning to the design system is non-optional, drift is named by root cause (missing token, one-off implementation, or conceptual misalignment), and a new Information Architecture & Flow dimension covers progressive disclosure, established user-flow shapes, and naming consistency. Cosmetic-vs-functional triage helps order work when polish time is short.

-   **Live Mode (Alpha).** Run `/impeccable live` and iterate on your UI in the browser: pick any element, drop a comment or stroke, hit Go, get three production-quality variants swapped in via your framework's HMR, accept the one you want and it writes back to source. Works on Vite, Next.js (including monorepos), SvelteKit, Astro, Nuxt. Detects your project's Content Security Policy and offers a one-time, dev-only patch so it runs in strict-CSP apps too.
-   **Visualize, then build.** Image gen crossed the reference-quality threshold with GPT Image 2, Nano Banana Pro, and Imagen 4 Ultra. `/impeccable shape` drafts a brand toolkit (color, typography, mood board) as real images; `/impeccable craft` pre-renders the hi-fi mock to code toward. Strongest in Codex with GPT 5.5.
-   **PRODUCT.md, shared design memory for your AI.** A single file at your project root that names the audience, brand personality, anti-references, and register (brand vs product). Every command reads it before generating, so output stops drifting into generic "modern SaaS" territory and starts sounding like your product. Created in one step via `/impeccable teach`.
-   **DESIGN.md generation, spec-compliant and interoperable.** `/impeccable document` scans your tokens, components, and rendered output and writes a DESIGN.md that follows the [Google Stitch DESIGN.md format](https://stitch.withgoogle.com/docs/design-md/format/). Colors, typography, elevation, components, do's and don'ts, in the exact six sections other DESIGN.md-aware tools expect. Your visual system travels with you.
-   **Brand and product registers.** Design work splits cleanly into two worlds: brand (marketing sites, landing pages, portfolios, where design IS the product) and product (app UI, dashboards, tools, where design SERVES the product). Register-aware commands (`typeset`, `animate`, `bolder`, `quieter`, `colorize`, `layout`, `delight`) each adjust their vocabulary to match, so brand work isn't critiqued for breaking product-UI conventions and vice versa.
-   **18 skills became 1 skill with 23 commands.** Every command now lives under `/impeccable`: `/impeccable audit`, `/impeccable polish`, `/impeccable critique`, and the rest. One entry in your `/` menu instead of 18, a shared design vocabulary between you and your AI, and far less namespace pollution as the plugin ecosystem grows. The autocomplete shows the full list the moment you type `/impeccable`.
-   **Pin your favorites back as shortcuts.** Run `/impeccable pin audit` and `/audit` becomes a standalone command again, without reversing the consolidation. Under the hood it writes a lightweight redirect skill that delegates to `/impeccable audit`, so updates to the parent skill flow through automatically. `/impeccable unpin audit` removes it.

View older releases

-   **Streamlined from 21 to 18 commands.** Removed overlap and confusion: `/arrange` renamed to `/layout`, `/normalize` merged into `/polish` (design system alignment is now part of the final pass), `/onboard` merged into `/harden` (empty states and first-run experiences are part of production readiness), and `/extract` became `/impeccable extract` (a sub-mode alongside craft and teach). Every remaining command has a clearly distinct job.
-   **Automatic cleanup of deprecated skills.** On first load after updating, the skill detects and removes leftover files from renamed or merged commands. No manual cleanup needed.

-   **Renamed `frontend-design` to `impeccable`.** The core skill now shares its name with the project, and the teach subcommand moved from `/teach-impeccable` to `/impeccable teach`. One skill, one namespace.
-   **Skill rewritten against evals.** Fifteen briefs ran through gpt-5.4 and Qwen 3.6 Plus, with and without the skill loaded, then graded side by side. More font and color variety, fewer purple gradients, much better Codex output. The single change that moved the numbers most: before the model commits to a font or palette, it has to name its first three instincts and reject them.
-   **Anti-pattern detection engine.** 28 deterministic rules across typography, color, layout, motion, and quality. Handles oklch, oklab, lch, and lab color formats, CSS variables inside border shorthands, gradient-backed text, and emoji-only nodes.
-   **CLI: `npx impeccable detect`.** Scans HTML, CSS, JSX/TSX, Vue, Svelte, and CSS-in-JS. Framework detection, multi-file import tracking, Puppeteer-backed live URL scanning, CI-ready JSON output, and a `--fast` regex mode for huge codebases.
-   **Chrome DevTools extension.** One-click detection on any page: yours, staging, production, or someone else's. Reads live computed styles, surfaces findings in an interactive panel, and highlights elements on the page. In Chrome Web Store review.
-   **`/critique` got teeth.** Persona sub-agents review in parallel, score against Nielsen's heuristics, run the detector automatically, and open a live browser overlay so you can walk each finding in place.
-   **New ways to create with Impeccable.** `/shape` runs a structured discovery interview about purpose, audience, and goals, then produces a design brief before any code is written. `/impeccable craft` chains that brief straight into the full implementation flow so you ship a designed feature instead of a reflex card grid.
-   **New docs site.** Top-level [Docs](https://impeccable.style/docs), [Anti-Patterns](https://impeccable.style/anti-patterns), and [Visual Mode](https://impeccable.style/visual-mode) sections. 18 per-skill pages with before/after demos and the canonical SKILL.md inline, two [tutorials](https://impeccable.style/tutorials), and 38 rule cards with inline visual examples.
-   **New harness: Rovo Dev.** 11 supported AI tools total.

-   New provider: **Trae** (China + International)
-   `/critique` now scores against Nielsen's 10 heuristics, tests with persona archetypes, and assesses cognitive load
-   `/audit` now scores 5 dimensions with P0-P3 severity ratings and structured action plans
-   Improved skill descriptions for better agent auto-discovery
-   Fixed invalid YAML frontmatter that broke GitHub preview and Codex loading ([#67](https://github.com/pbakaus/impeccable/issues/67))
-   Codex CLI now uses correct `$` prefix for command references

-   `/typeset` now recommends fixed type scales for app UIs, reserving fluid typography for marketing/content pages

-   3 new skills: `/typeset` (fix typography), `/arrange` (fix layout & spacing), `/overdrive` (technically extraordinary effects, beta)
-   Skills now auto-gather design context via `.impeccable.md`. Run `/teach-impeccable` once, all skills benefit
-   Deep linking to commands (`#cmd-overdrive`, etc.)

-   Added OpenCode provider support
-   Added Pi provider support
-   Recategorized `/onboard` as an enhancement command

-   Added Kiro support (`.kiro/skills/`)
-   Restored prefix toggle: download `i-` prefixed bundles to avoid naming conflicts
-   Audit and critique skills only suggest real, installed commands

-   Unified skills architecture: commands are now skills with `user-invocable: true`
-   Added VS Code Copilot and Google Antigravity support
-   New install flow: `npx skills add` as primary, universal ZIP as fallback
-   Added universal ZIP containing all 5 provider directories
-   Renamed `/simplify` to `/distill` to avoid Claude Code conflict

-   Initial release with enhanced frontend-design skill
-   17 design commands: /polish, /audit, /distill, /bolder, and more
-   Support for Cursor, Claude Code, Gemini CLI, and Codex CLI
-   Interactive command cheatsheet

Where do I put the downloaded files?

The easiest way is `npx skills add pbakaus/impeccable`, which auto-detects your AI harness and places files correctly.

If you downloaded the **universal ZIP**, extract it to your **project root** (same level as your `package.json` or `src/` folder). It creates hidden folders for each supported tool: `.cursor/`, `.claude/`, `.gemini/`, `.codex/`, `.agents/`, and `.github/`.

Project-level installation takes precedence and lets you version control your skills.

How do I update to the latest version?

Run `npx impeccable skills update` from your project root. It downloads the latest skills, cleans up deprecated files, and preserves any prefix you use.

-   **Alternative:** `npx skills add pbakaus/impeccable` re-installs from scratch.
-   **Claude Code plugin:** Open `/plugin`, go to the Discover tab.
-   **Manual ZIP:** Download from above and extract to the project root.

Your `PRODUCT.md` and `DESIGN.md` context files are never overwritten.

I used to type `/critique` directly. How do I get that back?

Pinning is built in. Run `/impeccable pin critique` and `/critique` becomes a standalone shortcut again, without reversing the consolidation.

Under the hood it writes a lightweight redirect skill that delegates to `/impeccable critique`, so updates to the parent skill flow through automatically. It works for every command.

**Examples:**

-   `/impeccable pin polish` → `/polish` works again
-   `/impeccable pin audit` → `/audit` works again
-   `/impeccable pin live` → `/live` works again

To remove: `/impeccable unpin critique`. To see your current pins, check your harness skills directory (`.claude/skills/`, `.cursor/skills/`, etc.) for directories prefixed with `i-`.

Commands or skills aren't appearing. What do I do?

**For commands:** Type `/impeccable` in your AI harness and look for commands like `/impeccable audit`, `/impeccable polish`, etc. If they don't appear, double-check the files are in the correct location.

**For skills:** Skills are applied automatically when relevant. To verify, explicitly mention "use the impeccable skill" in your prompt. This forces the AI to acknowledge and apply it.

**Tool-specific setup:**

-   **Cursor:** Requires Nightly channel + Agent Skills enabled in Settings → Rules
-   **Gemini CLI:** Requires `@google/gemini-cli@preview` + Skills enabled via `/settings`
-   **Codex:** Skills do not appear in the normal `/` command picker. Open `/skills` or type `$`. Repo installs live in `.agents/skills/`, user installs live in `~/.agents/skills/`. Restart Codex if a new skill does not show up.

I'm new to AI harnesses. Where do I start?

Skills and commands are intermediate features. If you're just getting started, learn the basics first:

-   **Claude Code:** [Official Documentation](https://docs.anthropic.com/en/docs/claude-code)
-   **Cursor:** [Cursor Docs](https://docs.cursor.com/)
-   **Gemini CLI:** [Gemini CLI Docs](https://geminicli.com/docs/)
-   **Codex CLI:** [Codex GitHub](https://github.com/openai/codex)

Once you're comfortable with basic prompting and code generation, come back and give Impeccable a try.

Is Impeccable free?

Yes. Everything is **Apache 2.0**: skills, commands, CLI, and the detection engine. Fully open source, free for everyone.