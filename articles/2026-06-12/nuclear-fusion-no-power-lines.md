---
title: "Nuclear Fusion, No Power Lines"
source: "https://uxmag.com/articles/nuclear-fusion-no-power-lines"
publishedDate: "2026-06-11"
category: "ux-research"
feedName: "UX Magazine"
author: " UX Magazine Team "
---

_Jonathan Frankle on why frontier models outran our ability to specify, evaluate, and curate, and what that means for design leaders shipping agentic systems._

The metaphor lands because it names the embarrassment.

On his return to Invisible Machines, a conversation recorded last summer, Jonathan Frankle, Chief AI Scientist at Databricks and head of Mosaic Research, describes the field as having built something like nuclear fusion: an abundant factory for intelligence, imperfect but extraordinarily powerful. What we have not built, at comparable scale, are the power lines — the specification tools, evaluation discipline, application patterns, and data hygiene that turn raw capability into something a person or an organization can use.

Jonathan is not making a modesty play about models. He is making a systems argument. If we froze frontier progress for five to ten years, he suggests, we would still see an explosion of innovation, not because the models got smarter, but because we finally figured out what to do with the ones we already have.

For design and product leaders, that reframing matters because the industry’s default UI for AI strategy is still a model selector. Jonathan’s counter is older and less glamorous: be a scientist.

## AI Strategy Goes Far Beyond Model Shopping

Jonathan is explicit that he is not a big-credentials person, and that there is no one on the planet who fully understands this field yet. He argues that orgs need to sit down, figure out how to measure success, and climb the ladder of techniques, testing along the way because every use case behaves differently.

The context-window myth is the clearest example. A million tokens does not mean you stop managing documents. Sometimes performance gets worse as you retrieve more material, because distractors multiply and models are still imperfect at relevance. Long context earns its keep in multimodal work (images and video eat tokens in ways text-only teams underestimate), but it is not a universal substitute for curation.

Robb Wilson connects this to their earlier conversation with Jonathan: the mixology metaphor still holds. Garbage in, garbage out — whether the garbage goes into the context window or the training pipeline. The hard part was never the pour. It was deciding what belongs in the glass.

Jonathan also notes a real shift: at most companies he visits now, there is someone doing science in a formal way he respects as a peer. That is progress, but it does not replace measurement.

## Scientists Who Ship

Jonathan pushes back hard on hiring filters that treat hyperscaler résumés as proof of expertise. Talent is broadly distributed; rigor is rare. The people who matter are scientists who ship, who can hold computing, experimentation, and product constraints in the same head. DeepSeek, in his telling, is the proof point: good science with time and care can compete with money buying time. Pedigree is a shortcut, not a guarantee.

The impact conversation turns personal. Naveen Rao’s advice — maximize impact on the world — frames why Mosaic joined Databricks. Jonathan contrasts his famous lottery-ticket dissertation with pre-PhD work on police use of facial recognition: the paper made grad students excited; the report changed laws. That is the value stack underneath the fusion metaphor.

## The Specification Gap in AI

The longest technical thread is specification: how you turn intention into something a system can be held against.

“Build a benchmark” is a cop-out, Jonathan says. Not because benchmarks are useless, but because good ones are vanishingly rare and automated eval tooling still disappoints, including work he has taken cracks at himself. The harder question precedes measurement: what would it mean for this AI system to solve your problem? Is specification thumbs up and down? A paragraph of intent? A library of prompts without good answers yet? Software engineering solved unit tests, integration tests, and regression. AI has no equivalent discipline for non-deterministic behavior, and programs, unlike models, are in some sense self-documenting when well written.

From there, Jonathan and Robb go further: if you use a closed API and never touch weights, you are still training: your parameters are just words. Prompt engineering is not a separate magisterium from fine-tuning; it is the same computing pattern in a different encoding. Robb describes boiling prompts into physics-style formulas; Jonathan’s emoji-prompt thought experiment makes the same point. Culture shifts around what effort looks like in communication (formal email vs. three bullets) are symptoms of the same underlying fact.

Josh raises the design-generation tension: building agent skills in natural language while still wanting a visual back end to delete mistakes — and McLuhan’s old-media-inside-new-media frame. Jonathan admits he may be aging out of the chat-only interface; the scientific point survives either way — humans need predictable edit surfaces and verifiable behavior, whatever the chrome looks like.

## Rewriting How We Control Intelligence

The second half of the episode is where you should lean in: who owns the truth when answers are not from your site?

Jonathan expects a cottage industry around LLM-oriented publishing, parallel to SEO, unplanned by the platforms, incentive-aligned through capitalism’s messy efficiency. PDFs will persist for centuries; parsers will still fail; valuable knowledge will remain locked in forms humans tolerate and machines hate. Static FAQ pages beat dynamic PDFs for what you want models to ingest; tentative information should stay out of the crawl path.

Robb presses the curation failure mode: unlocking a document repository without hygiene scales every wrong PDF into organizational truth. Jonathan answers with a broader digital pattern — self-driving fleet bugs, centralized data breaches — localized human error vs. systemic scale.

Josh closes the thread on brand control: more people will meet brands through LLM feeds than through owned sites. Jonathan’s north star is separating knowledge from reasoning — a faithful reasoner hooked to a curated knowledge base, updated when brand guidelines change. We are not there yet. Until we are, brands have shrinking control over representation in feeds they do not own.

## Who Owns the Answer?

None of this requires the listener to care which model dropped last Tuesday. It requires them to care about the work between fusion and smoothie: specification, measurement, curation, and the organizational honesty to test rather than vibe.

Jonathan’s first Invisible Machines visit (Season 2, MosaicML era) is still the craft conversation — efficient training, lottery tickets, hundreds of mini-cupcakes. This episode is the enterprise engineering sequel.   
If you are building agentic systems or designing the surfaces they run through, the question is not whether your context window is large enough. It is whether you can describe what you want, prove you got it, and curate what the system is allowed to believe.

Listen to the [full conversation](https://uxmag.com/podcast/nuclear-fusion-no-power-lines) with Jonathan Frankle on Invisible Machines.