---
title: "On the right tool for the job"
source: "https://karlkoch.me/writing/on-the-right-tool-for-the-job"
publishedDate: "2026-04-28"
category: "design"
feedName: "Sidebar"
---

People keep asking how I work. The honest answer is it depends. I have three tools I reach for and I pick whichever one fits the job in front of me. No loyalty to any of them. No workflow that I force every project into. Just whatever makes sense right now.

Here is what I actually do.

## Figma, sometimes

Figma is where I mess around. I throw shapes around. I try a layout in ten seconds that would take me ten minutes in code. I move things on a canvas and look at them. That is the whole point of the tool for me now.

I used to treat Figma like the source of truth. Pixel-perfect. Components nested six layers deep. Variants for every state. I still do that when the work calls for it, but most of the time I do not need it. I need a sketch. Something rough. Something I can point at and say “that bit, but bigger, and without the border.” Figma is good for that.

Sometimes I do not open it at all. If I already know the shape of the thing, if the interaction is the point, I skip it.

## IDE with agents

When I want fidelity and interaction, I work in the IDE with an agent alongside me. Cursor, Claude Code in the terminal next to my editor, whatever. This is where ideas stop being pictures and start being things.

An animation feels different once it runs on real hardware. A component behaves differently when you can tab through it. A colour token reads differently in a real viewport against real content. You can fake all of that in Figma but you cannot feel it.

The reason I stay in the IDE and not in pure agent mode is that I want to mix the two. Sometimes the agent is faster. Sometimes I am. If I know exactly what I want to type, typing it myself is quicker than describing it. If I want to try four variations of an animation curve, the agent beats me every time. The IDE lets me flip between those two modes without switching tools. I can let the agent scaffold a component, take the keyboard back to tune the timing by hand, then hand it back to wire up the rest. That loop is the whole point.

## Pure Claude Code

When I have multiple things on the go, or when the work is technical enough that I want to think in plans rather than pixels, I go to Claude Code on its own. No IDE in front of me. Just the agent, the repo, and a plan.

This is how I build tools. Takt. Small Swift things. Side projects where the interesting problem is architectural, not visual. I can have three sessions open, each iterating on something complex, and I can review the diffs when each one finishes. It is the closest thing I have to cloning myself.

## Steering is the whole job

Here is the bit people get wrong about using AI for design and front-end work.

The agent is not a designer. It is not a front-end engineer. It is a very fast collaborator that will do almost exactly what you tell it, and nothing it has not been told (I mean this isn’t always the case ha). If you do not know what good looks like, you will get something that is technically correct and aesthetically dead. If you do not know how CSS actually works, you will get working code that you cannot read or extend.

You have to speak to it in a language it can understand, and that language is specificity grounded in real knowledge. Not “make it feel more polished.” Say what polish means. Optical alignment on the icon. Tighter tracking on the heading. A spring curve, not an ease-out. `oklch` so the colours stay perceptually even across the ramp. Tabular numerals on the stat. `anchor-name` and `position-anchor` instead of a portal and a ref.

That only works if you actually know those things. Know why `position: sticky` breaks inside `overflow: hidden`. Know when to reach for a container query instead of a media query. Know what makes a spring feel right versus wrong. Know why the border radius on the child has to be smaller than the parent minus the padding, or it will look broken even if nobody can tell you why.

The agent turns that knowledge into output faster than you could. It does not replace the knowledge. Do not skip the part where you learn how things actually work. It is the thing that makes the AI useful in the first place.

## Pick the tool for now

I said at the top it depends, and it really does. Sometimes I start in Figma and end up in code. Sometimes I start in code and jump back to Figma to sketch an alternative because I cannot see it yet. Sometimes I never touch a canvas. Sometimes I never touch an IDE.

A marketing page for a course landing? Probably Figma first, then code.

A new interaction pattern in a product? Code. Figma cannot tell me if it feels right.

A technical side project with a complicated backend and a small UI surface? Claude Code on its own, plans first, UI last.

A refactor of a design system? IDE with an agent, token file open, components next to it.

Not every job wants the same process. Reach for the tool that fits the problem in front of you right now, not the tool you used last time. That is the whole thing.