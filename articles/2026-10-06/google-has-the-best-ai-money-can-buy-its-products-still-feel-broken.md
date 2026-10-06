---
title: "Google has the best AI money can buy. Its products still feel broken."
source: "https://hitesh.in/2026/best-ai-still-feels-broken/"
publishedDate: "2026-10-05"
category: "design"
feedName: "Sidebar"
---

Google’s search results have started doing things a trillion-dollar product should have grown out of years ago. Paste a quote from a book and it reads the sentence as something you personally believe. Ask about a specific page and it refuses to actually open the link, then makes up what’s probably on it. Search for an exact phrase, the one thing Google search reliably did for two decades, and it now returns fuzzy matches tuned for ad inventory instead. A [widely discussed post](https://sancho.bearblog.dev/google-weird/) catalogued a long list of these this week, and the comments added a sharper detail: a former Googler describing a culture where engineers are actively discouraged from talking to real users, so “ship without testing, iterate later” became the normal plan.

None of that is a model-quality problem. Gemini is a competent model by any public benchmark. The failure sits above the model, in decisions about where to place it, how to admit what it’s guessing at, and whether anyone with product judgment was in the room when it shipped. That distinction matters more than the Google story itself, because every company now wiring AI into an existing product is one quarter away from the same outcome, just without Google’s market position to absorb it.

## The contract search used to keep

A search box makes an implicit promise: the same query returns the same, verifiable, ranked set of matches. You could build workflows on that. Journalists copy-pasted distinctive phrases to check for plagiarism. Developers grepped the web the way they grep a codebase. That promise is deterministic, and a deterministic promise is one a UI can afford to state loudly, in the same authoritative type as everything else on the page.

Google slid a probabilistic layer, AI Overviews, Gemini’s summaries, into that exact same UI, same typeface, same confident tone, and never renegotiated the promise. Nothing on the page tells you this line is a guess and that one is a lookup. The interface still speaks like a search engine even where it’s now behaving like a chatbot having an off day. That reaction under the post isn’t really about the model being worse. It’s about a UI that kept a promise it can no longer keep, and never said so.

## An org that can’t hear its own users

The ex-Googler’s comment about engineers being kept away from users is the more interesting half of the story, and the one worth sitting with if you run a product org. [Conway’s Law](https://en.wikipedia.org/wiki/Conway%27s_law) is usually cited about system architecture: your software mirrors your org chart. It applies just as well to product coherence. An organization where individual teams ship features against isolated OKRs, with no standing channel back to how people actually use the product, will ship a product that reads exactly like that org chart: fragmented, locally optimized, and reconciled by no one.

Google has more user-research capacity than almost any company on earth. The comment describes a culture where that capacity never reaches the people making the actual product calls. That’s a far more common failure than it sounds, and a far more fixable one, if someone decides it’s worth fixing before the product tells on itself.

## The tax nobody’s dashboard shows

The most expensive part of this doesn’t show up as complaints. It shows up as a habit users build without noticing: verify everything the AI told you before you act on it. That’s a small tax paid on every query, and it’s genuinely hard to see from the inside, because the verification often means asking Google another question, which can even make engagement look fine on the exact dashboard someone is watching. Trust erodes quietly and comes back slowly. No quarterly metric flags it until switching costs finally drop low enough for users to leave, and by then the story reads as sudden even though it wasn’t.

## Decide where you can afford to be wrong

If I were advising a product team wiring AI into an existing surface, I’d start with one question per surface, not one answer for the whole roadmap: does this feature promise a fact, or does it offer a suggestion? Autocomplete, recommendations, a first-draft generator, these tolerate being wrong; a bad guess there costs a click. Search results, account balances, medical or legal answers do not tolerate it; a bad guess there costs the relationship. [The boring, predictable parts of a stack are the ones worth keeping boring](https://hitesh.in/2026/boring-technology-is-an-ai-strategy/), and that discipline applies to which product surfaces get AI first, not only to which languages and databases do.

The second thing I’d protect is the feedback loop itself: the unglamorous budget line that lets engineers hear what users actually experience, the one [nobody can defend by pointing at output](https://hitesh.in/2026/the-code-you-cant-explain/) the way they can a GPU cluster. It is cheaper to cut and far more expensive to lose. Google was never short on compute. What the comments describe running short is attention, the kind that only survives if someone with authority insists on keeping it in the loop, the same way [governing AI output takes a standing decision, not a one-time policy](https://hitesh.in/2026/ai-writes-the-code-who-governs-it/).

If you’re deciding which of your own product surfaces can survive an AI layer and which can’t yet, that’s exactly the kind of judgment call worth [an advisory hour](https://hitesh.in/work-with-me/).