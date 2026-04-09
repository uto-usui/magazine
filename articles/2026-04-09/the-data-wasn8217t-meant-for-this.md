---
title: "The Data Wasn&#8217;t Meant for This"
source: "https://uxmag.com/articles/the-data-wasnt-meant-for-this"
publishedDate: "2026-04-08"
category: "ux-research"
feedName: "UX Magazine"
author: " UX Magazine Team "
---

_On why AI runs on a coincidence, what induction actually requires, and what Demis Hassabis changed his mind about._

Demis Hassabis has a way of describing the internet that makes it hard to think about it any other way after you’ve heard it.

Sebastian Mallaby, author of The Infinity Machine and Senior Fellow at the Council on Foreign Relations, surfaced it in a recent conversation on Invisible Machines, while explaining how it felt to discover that training on the full text of the internet could actually produce something that looked like intelligence. The question on the table was whether anyone had planned this. Whether the data was designed for this purpose. Hassabis’s answer — reported by Mallaby, who spent years in conversation with him while writing [_The Infinity Machine_](https://www.amazon.com/Infinity-Machine-Hassabis-DeepMind-Superintelligence/dp/0593831845) — was no. Of course not. And then: the internet is kind of like coal in the ground.

What would the industrial revolution have been, Hassabis asked, if someone had invented the steam engine but there was no coal? Coal isn’t there on purpose. Coal is a bunch of dead dinosaurs that got compressed underground over millions of years. Nobody put it there to power the 19th century. It just happened to be there, in the exact form and quantity that made what followed possible. The internet is the same: a vast accumulation of human expression, commerce, argument, instruction, and error — assembled because we were writing emails and publishing papers and building e-commerce sites, for entirely other reasons — that turned out to be exactly the kind of data needed to train the most powerful reasoning systems ever built.

That analogy is doing a lot of work. It explains something that gets lost in both the hype and the critique: the arrival of modern AI is not primarily an engineering story. It’s a coincidence story. The engineers were extraordinary. The science was real. But the fuel — the thing that made scaling laws work — was sitting there already, not for this purpose, available because the internet had been built for a completely different set of reasons over the preceding three decades.

Hassabis was late to appreciate this. Which is part of what makes the story interesting.

When OpenAI released GPT in 2018 and GPT-2 in 2019, Hassabis was not impressed. Or more precisely, he was skeptical. His objection was philosophical and it was serious: if you’re learning purely from symbols — words mapped onto images, language mapped onto language — you’re building a system that’s never actually grounded in the world. He believed, and had spent years arguing, that real intelligence had to be rooted in something physical. In the physics of how things fall and break. In the spatial experience of moving through an environment. In the kind of embodied feedback that robots get and language models don’t. You couldn’t, he thought, simply wish that away by ingesting enough text.

GPT-3, in 2020, changed his mind.

The system was too good to dismiss as regurgitation. The responses looked like actual reasoning. And Hassabis had to account for why — which meant revising his assumption about what the internet actually contained. His new conclusion, as Mallaby explains it: the range of human experience turns out to be smaller than he thought. It’s not larger than all of the tokens on the internet. The words on the internet were written by humans who are embodied in the physical world. When those humans wrote about physics, they brought their physical experience into the text. When they wrote about falling, about weight, about the way light changes in late afternoon, they brought their bodies to it. The internet isn’t a simulation of human intelligence. It’s a residue of it. It’s what you get when embodied creatures try to communicate with each other, in language, for thirty years.

The machine ingesting that residue is doing something more than next-word prediction. It’s absorbing what humans know — not directly, but through the medium of how humans describe what they know. And that turns out to be more complete than Hassabis expected.

The idea at the center of Mallaby’s book — and the reason he named it _The Infinity Machine_ — is about what induction actually requires.

The kind of reasoning that modern AI does is inductive, not deductive. Deductive reasoning is what symbolic AI tried to do: you start with axioms, apply rules, derive conclusions. You can, in principle, prove a thing. What Hassabis understood from an early age — influenced, Mallaby notes, by reading about Gödel’s incompleteness theorem as a teenager, before he’d even gotten to college — is that deduction can’t be the full answer. Gödel showed that no mathematical system can encompass all the truths in mathematics through logic alone. The world is bigger than the axioms we can write down. Which means to really understand it, you have to learn from examples.

But induction is dangerous at small sample sizes. If I observe ten New Yorkers and notice that all of them have coffee in the morning, I’ll incorrectly conclude that all human beings drink coffee in the morning. My conclusion will be wrong not because my reasoning was flawed, but because I didn’t have enough examples. Induction needs volume. It needs breadth. It needs, ideally, something approaching an infinity of examples to converge on conclusions that hold across edge cases and exceptions and the million specific ways the world deviates from the pattern you thought you were seeing.

This is what a scaling law actually says. More data produces better models not because more data is always better at the margin, but because induction is structurally unreliable at low sample sizes, and the internet represents the first training corpus large enough to move past the failure zone. The reason modern AI works is the reason the infinity machine metaphor works: it’s a machine that gets close enough to infinity examples that it can induce reliably.

The thing is, nobody built the internet to be that corpus. It got there because billions of people had other reasons to put things on it.

There’s a design lesson here that applies well beyond AI.

The organizations that are trying to build internal knowledge systems — the kind that let AI agents operate in context, understand institutional history, make reliable decisions about edge cases — are essentially trying to do deliberately what the internet did accidentally. They’re trying to build a training corpus that’s large enough, diverse enough, and accurate enough that inductive reasoning on top of it produces reliable conclusions.

What most organizations don’t appreciate is the sample size problem. The reason a language model trained on the full internet is reliable and a language model trained on one company’s SharePoint folder is unreliable isn’t fundamentally about model architecture. It’s about induction at low sample sizes. If your knowledge base doesn’t contain enough examples of the edge cases your system will encounter, the system will reach wrong conclusions with high confidence. It will be like the person who interviewed ten New Yorkers and concluded that all humans drink coffee.

The organizations doing this well are the ones treating knowledge management the same way Mallaby treats the history of AI: as a long accumulation of specific examples, carefully preserved, with enough breadth to support genuine inference. That’s less exciting than deploying an agent. It’s also the part that determines whether the agent works.

The internet being the fuel for the AI revolution was a coincidence. The knowledge layer inside your organization will not be. Someone has to build it on purpose, with the infinity problem in mind — knowing that induction fails at small sample sizes, and that the failures won’t always announce themselves.

Hassabis changed his mind about language when GPT-3 made him. He had the intellectual honesty to follow the evidence. His original intuition — that you need physical grounding for real intelligence — wasn’t wrong. It was incomplete. The internet happened to contain enough embodied human description that text alone was surprisingly close to enough.

Your internal knowledge base probably doesn’t have that property. You can’t count on the coincidence. You have to build toward it.

Sebastian Mallaby is a Senior Fellow at the Council on Foreign Relations and the author of The Infinity Machine. Listen to the [full conversation](https://uxmag.com/podcast/inside-the-infinity-machine) on Invisible Machines.