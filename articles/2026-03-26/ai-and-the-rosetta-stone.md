---
title: "AI and the Rosetta Stone"
source: "https://yannglt.com/writing/ai-and-the-rosetta-stone"
publishedDate: "2026-03-25"
category: "design"
feedName: "Sidebar"
---

This is the Part II of [The Rosetta Stone of Design Engineering](https://yannglt.com/writing/the-rosetta-stone-of-design-engineering), revisiting that same metaphor through the lens of AI and exploring its implications. Thanks to [Nad Chishtie](https://x.com/nadonomy) and the Lovable team for inviting me to speak at their first Design Night in Stockholm, where many of the ideas in this follow-up essay became sharper.

TL;DR from Part I: design and engineering are two sides of the same track. The Rosetta Stone is the shared translation layer that keeps intent and implementation aligned. The more overlap between those languages, the more translucent the stone becomes, and the faster meaning moves without distortion.

AI collapses translation cost; that increases velocity and fragility at the same time. The new craft is preserving meaning under acceleration. AI is not the argument here; amplification is. It amplifies whatever structure already exists.

* * *

In [17991](#fn-1), a slab of stone was discovered in Rosetta, Egypt. Three scripts carved into one surface: Hieroglyphics, Demotic, Greek. Because scholars could read Greek, they could decode the others. The Rosetta Stone did not invent language. It created legibility across systems.

For most of my career, I’ve used that as a metaphor for design and engineering. Two scripts. One track. Intent and implementation. The engineering function spoke in data models, state, architecture. The design function spoke in hierarchy, rhythm, intent. Product thinking, meaning goals, trade-offs, and constraints, belonged inside both.

We were describing the same system in different languages. The Rosetta Stone was the shared layer that made translation possible. If you could move from pixels to code to narrative without losing fidelity, you increased that overlap. You made the system easier to read, easier to build, and harder to misunderstand.

That kind of fluency used to be rare. AI performs a kind of alchemy on the stone, turning a static translation surface into a live translation layer.

[Tools do not define our functions2](#fn-2). Type of contribution does. If you spend 90% of your time in Figma, that alone does not make you a designer. If you spend 90% of your time in a codebase, that alone does not make you an engineer. The real distinction was never about disciplines. It was about preserving intent across transformation.

## The first Rosetta Stone

In the pre-AI era, translation was slow. A Figma file became a specification. A specification became issues. Issues became implementation. Implementation became documentation. Every step introduced friction. Friction introduced thought. Slowness forced clarification. You had to articulate intent explicitly, because the medium resisted you. Leverage lived in the gap.

If you could understand both the aesthetic grammar of a system and the structural grammar of its implementation, you compressed distance. You reduced misunderstanding. You prevented entropy. Before AI, we consulted translation. We stepped across it carefully.

So the question is no longer whether translation exists, but what happens when it becomes ambient. In my own process, that old friction often felt annoying in the moment, but it was also where weak thinking got exposed early.

## Changing medium in seconds

One of the most important shifts AI introduces is not just generation — it’s [medium fluidity3](#fn-3). You can now turn:

-   a paragraph into a functional prototype
    
-   a repository into a conversational interface
    
-   a sketch into an interactive component
    

We are no longer translating manually between artifacts. We are moving between representations in real time. The system becomes translucent.

Design is no longer trapped in Sketch or Figma. Code is no longer trapped in IDEs. Documentation is no longer trapped in static files. The boundary between thinking and building thins. This is where the metaphor evolves.

## Solid → Liquid → Vapor

The original Rosetta Stone was solid. It had mass. It resisted change. Meaning was carved into material. For a long time, our digital systems were closer to solid than we realized. Files were fixed. Repositories were structured. Releases were heavy. Translation required effort.

Then things became liquid. Design systems modularized. APIs connected surfaces. Prototypes flowed between tools. We could pour intent from one container into another — but we still relied on containers. Files, components, structured boundaries.

AI changes the state again. We are now operating in vapor. Ideas condense into code. Code evaporates into prose. Prose reforms into UI. The medium is atmospheric. It adapts instantly. It reshapes itself without friction. Vapor moves fast. But vapor does not hold shape on its own.

## When translation becomes cheap

When translation is expensive, translation is leverage. AI performs live translation across mediums. It speaks design, engineering, and narrative fluently enough to remove most of the friction between them. The old Rosetta Stone dissolves. We no longer consult translation. We operate inside it. It happens at runtime.

For a moment, this feels like pure acceleration: [faster loops, bigger playgrounds, stronger craft](https://yannglt.com/writing/faster-loops-bigger-playgrounds-stronger-craft) — if the structure is there. This is why the same capability can feel magical in one system and chaotic in another. What changed for me is that I now get to _something that works_ much faster, but I also have to question coherence much earlier.

You can explore more directions in a week than you used to explore in a quarter. You can test variations instantly. You can compress iteration cycles to near zero. But when building becomes cheap, coherence becomes scarce.

## The bottleneck is no longer syntax

AI handles syntax. It can render components, refactor functions, generate documentation, simulate strategy. The bottleneck is no longer execution. It’s meaning.

When the medium is vapor, friction no longer filters weak ideas. The system will happily generate polished output that looks coherent without actually being coherent. This is [intellectually dangerous4](#fn-4), because output no longer correlates with understanding.

You can produce:

-   beautiful interfaces without structural integrity
    
-   strategy decks without strategy
    
-   systems without invariants
    
-   narrative without conviction
    

Acceleration hides superficiality. When everything can be translated, nothing forces you to sit long enough with ambiguity to actually resolve it. Velocity hides fragility. Systems look fast, but meaning quietly evaporates.

What we’re experiencing is semantic erosion: hallucinations, context rot, tone degradation, and the one we’re all tired of: overconfident wrongness. The antidote is explicit invariants, not slower tooling. In practice, this usually doesn’t fail loudly at first; it fails quietly through small inconsistencies that compound across outputs.

When execution was scarce, the best executor won. Now execution is abundant. The best idea wins. To be more precise, the clearest articulation of the best idea wins.

## Context engineering, not prompting

The surface-level conversation about AI focuses on prompting. But prompting is tactical. The real leverage is contextual. Context engineering is authorship. The original Rosetta Stone was carved. Today, inscription is context. Context is finite. Context degrades. Context shapes output. Whoever frames context shapes reality.

It means designing:

-   constraints the system operates within
    
-   principles it references
    
-   examples that encode taste
    
-   repository history it can see
    
-   memory that preserves identity
    

In practice, this can look like defining explicit output schemas, agent boundaries, and review checkpoints before generation starts. At Linear, this shows up when an agent gives a technically valid [triage suggestion](https://linear.app/changelog/2025-08-14-product-intelligence-technology-preview), but its reasoning, confidence, or prioritization doesn’t match how we want the product to behave.

Prompt design is inscription. Schemas are inscription. Defaults are inscription. APIs. Design tokens. Component systems. Memory boundaries. Guardrails.

You are no longer writing instructions. You are shaping a field of gravity. Craft is no longer writing the script. It is shaping the container.

If your system is incoherent, AI will amplify the incoherence. If your principles are vague, AI will scale the vagueness. Acceleration reveals structure. It does not create it. This is where the designer/engineer hybrid evolves.

## The identity shift: from translator to intent architect

In the old model, the hybrid translated between domains. In the new model, the hybrid defines invariants across mediums. If a design becomes code and then becomes documentation and then becomes marketing copy, what survives the transformation?

If nothing survives, you do not have a system. You have artifacts.

The new leverage is in defining:

-   what cannot change
    
-   what encodes identity
    
-   what defines quality
    
-   what constrains possibility
    

This is where the idea of “intent architect” becomes real. Your job is no longer to move information between disciplines. Your job is to ensure that meaning survives transformation at machine speed.

Mastery does not disappear. It relocates. The senior distinction is no longer between design and engineering. It is intent architecture vs syntax operations.

AI can translate Hieroglyphics into Greek instantly. But it cannot decide what decree should be written. That remains human.

## Strategic friction

In a vaporous medium, constraints become strategic counterweights. Not because speed is bad, but because speed removes natural filters. Strategic friction is where you force clarity before scale.

Protocols increase interconnectivity. Interconnectivity increases surface area. Surface area increases entropy. Acceleration compounds entropy. Constraint becomes strategic. Not restrictive. Strategic.

In practice, that means:

-   asking better questions before generating
    
-   defining non-negotiables before exploring
    
-   articulating principles before scaling
    
-   saying no earlier
    

Taste becomes compression. You remove more than you add. Structure becomes velocity. The clearer your internal architecture, the faster AI can operate without introducing drift. Constraints become power. The narrower the identity, the stronger the system. This is not romantic craft nostalgia. It is structural necessity in a world of infinite generation.

## The new Rosetta Stone

The original Rosetta Stone made hidden language readable. The new Rosetta Stone is not a stone at all. It is the invariant layer beneath fluid mediums. The gravity that prevents vapor from dissipating.

It sits between:

-   intention and output
    
-   principle and implementation
    
-   identity and scale
    
-   human ambiguity and machine precision
    

AI makes systems increasingly translucent through live translation between ideas, interfaces, and code. That translucency is powerful. It collapses silos. It compresses loops. It expands the playground.

But translucency without authorship is chaos. The Rosetta Stone used to sit outside the system, connecting scripts. Now it must sit inside the system, preserving meaning. The stone is still a translator, but now the translation happens live and must be governed live.

If we fail to architect intent, systems will drift silently. Brand becomes inconsistent. Agents amplify mediocre decisions. Trust erodes quietly. If translation is now cheap infrastructure, meaning has become a premium layer.

## Meaning under acceleration

We are entering a world where building is cheap, iteration is instant, mediums are fluid, and translation is automatic. In that world, structure becomes velocity, and constraints become clarity.

Your role is no longer to translate between disciplines. Your role is to preserve meaning under acceleration, to define invariants in a vaporous medium, to architect intent across representations, to hold gravity while everything else moves faster.

The original Rosetta Stone unlocked a civilization by making it legible. The new Rosetta Stone unlocks our era by ensuring that what we build remains coherent while it accelerates.

Not solid. Not liquid. But vapor — held together by meaning.

* * *

S/O to [Conor Muirhead](https://x.com/conormuirhead), [Rémi Bonnet](https://x.com/Bonnet_Remi), and [Hassan Boujnikh](https://x.com/HassanBoujnikh) for the thoughtful notes and discussions that helped refine this piece.