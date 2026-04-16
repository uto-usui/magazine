---
title: "Design and engineering, as one"
source: "https://matthiasott.com/articles/design-and-engineering-as-one"
publishedDate: "2026-04-15"
category: "design"
feedName: "Sidebar"
---

In the winter of 1898, a mechanical engineer named [Frederick Winslow Taylor](https://en.wikipedia.org/wiki/Frederick_Winslow_Taylor) arrived at the Bethlehem Steel Company in Pennsylvania with a stopwatch and a conviction. Taylor had been thinking for years about why industrial work was so inefficient, and he believed he had found the answer: the problem was that the people who _did_ the work were also the people who _decided how to do_ it. Workers brought their own habits, their own rhythms, their own judgment. All of that variation was, in Taylor’s view, waste.

His solution was to separate thinking from doing, cleanly and completely. Management would plan the work – the optimal method, the optimal pace, the correct tool for each task. Workers would execute it. [He called it scientific management](https://en.wikipedia.org/wiki/The_Principles_of_Scientific_Management), and over the following decades, it became the template for how industrial organisations structured almost everything they did.

Nobody planned for it to also become the template for digital product teams. But when the first agencies and studios needed a process, they borrowed from what existed. And what existed was the industrial model. Plan. Design. Produce. One phase hands off to the next. The designers design; then the engineers build. A specification travels one way, downstream, and something is produced at the other end.

The only problem is that building complex digital products is nothing like shovelling pig iron more efficiently at Bethlehem Steel. Yet over a hundred and twenty years later, most of us are still running product teams on a model that was designed for a problem we don’t have.

## Two Lenses [#](#two-lenses "Direct link to Two Lenses")

I’ve been in the meeting where this model starts to show its seams more times than I can count – on the design side, the engineering side, and also in the middle where you can see exactly what both people mean and why they still can’t hear each other.

A designer walks the team through a carefully designed flow. The layouts are balanced, the visual language holds together, and all the interactions make sense. About four screens in, however, an engineer leans back and says: “That’s going to be complicated.”

The designer asks why. What follows is one of those conversations where both people are clearly smart, clearly well-intentioned, yet somehow still unable to land in the same place. The engineer explains the constraint. The designer reframes the intent. The engineer nods. But not quite in agreement – more in the way people nod when they’ve decided to resolve something later, “offline.” The meeting ends.

Two weeks later, when the feature ships, it works. Technically. But something got lost between what was designed and what was built. It isn’t wrong, exactly. But it also isn’t quite right.

If you’ve seen this pattern enough times, you might be tempted to call it a communication problem. I used to think that, too. Better specs, more detailed annotations, clearer handoff documentation – and the gap would close. But the gap never closed. Because it isn’t only a communication problem. It’s a mental model problem. And the distinction matters, because the fix for one is a better process, and the fix for the other is something fundamentally deeper.

Designers and engineers are not only trained differently. They think about the same product through genuinely different lenses – each one invaluable, but also incomplete on its own.

A designer looks at a screen and sees composition, hierarchy, and intention. They’re thinking about what a user needs to feel and understand at a particular moment. They hold the whole experience in their head as a kind of narrative: the user arrives here, notices this, does that, and feels – ideally – how the product understands them. Design is about managing perception and guiding attention through space and time.

An engineer looks at the same screen and sees structure, state, logic, and constraints. They’re thinking about what happens when the data doesn’t arrive, when the user does something unexpected, when the component needs to work in a dozen different contexts simultaneously. Engineering is about managing complexity and building things that hold up under the pressure of reality.

Neither lens is wrong. Both are necessary. But they produce different vocabularies, different intuitions, and – crucially – different instincts about what the right question even is.

When a designer says “make it feel lighter,” they have something precise in mind: less visual weight, more breathing room, perhaps a subtle change in transition timing. When an engineer hears “make it feel lighter,” they hear an instruction with no acceptance criteria. What does _done_ look like? The designer isn’t being vague. The engineer isn’t being obstructive. They’re speaking different native languages and assuming, very often incorrectly, that they share one.

## Productive Friction [#](#productive-friction "Direct link to Productive Friction")

Here’s the thing, though: this tension, by itself, is not the problem. In the right conditions, it’s actually one of the most valuable assets a team has.

Because designers and engineers don’t have the same blind spots. They have complementary ones. A designer optimising for perception and narrative can miss structural fragility – the interaction that feels wonderful but buckles under real-world data. An engineer optimising for robustness can miss experiential quality – the error state that handles every edge case correctly but leaves the user feeling abandoned. When those two lenses collide early enough, each one catches what the other would miss. Quality goes up because the team is running two different threat-detection systems at once.

But it goes further than that. When both disciplines stay in dialogue, constraints from one domain become creative inputs for the other. Take the “make it feel lighter” conversation again: if the designer and the engineer actually sit down together, the engineer might say, “I can’t reduce the weight of that component without breaking the layout in three other places – but what if we changed the transition timing instead?” And suddenly there’s a solution that is both structurally sound and perceptually better than what the designer originally had in mind. The constraint didn’t limit the design. It redirected it somewhere more interesting. This is what working with a material feels like: the material pushes back, and the pushback makes the work better.

And the negotiation itself has value. When a designer has to explain _why_ something should feel lighter – not in aesthetic terms but in terms of what the user needs to experience at that moment – the thinking gets sharper. When an engineer has to explain _why_ something is complicated – not in jargon but in terms of what the system is actually doing – the architecture gets clearer. The friction is a forcing function for clarity on both sides. As [Dave Rupert recently put it](https://daverupert.com/2026/03/people-are-not-friction/), people are not friction – but [friction is where good work gets its shape](https://matthiasott.com/notes/the-shape-of-friction).

Two incomplete lenses, brought together early enough and often enough, produce something richer than either would alone. A designer who learns to anticipate structural constraints starts making better decisions. An engineer who learns to see compositional intent starts building with more sensitivity. Given enough shared time and enough feedback loops, the two perspectives don’t merely coexist. They teach each other.

The question is whether the process gives them that chance.

## The Fault Line [#](#the-fault-line "Direct link to The Fault Line")

In most teams, it doesn’t. And this is where Taylor’s inheritance does its real damage.

A sequential process – where design finishes before engineering begins, and a specification is the primary bridge between them – does something that is quietly destructive: it takes a manageable cognitive difference and makes it catastrophic. Not by _creating_ the tension between the two lenses, but by _removing_ every mechanism that could make that tension productive. In a sequential process, there’s no shared material to point at. No immediate feedback when a design decision collides with a technical constraint. No moment where the engineer’s question reshapes the designer’s thinking in real time, or where the designer’s intent becomes visible to the engineer before it’s cast into a deliverable.

What remains is translation. And translation always loses something.

And so, every time a decision falls into the space between design and engineering, it gets made by whoever happens to be closest to it at that moment. An engineer makes a spacing decision because the specification wasn’t precise enough. A designer overrides a component behaviour in a mockup without realising that it is load-bearing elsewhere in the system. A product manager resolves the disagreement by picking whichever option is faster to ship this sprint.

These small, local decisions accumulate. The built product drifts from the design intent. The codebase drifts from the design system. And eventually, the team is looking at something that technically works but feels like it was assembled from parts that weren’t quite designed to fit together. Because, in a very real sense, it was.

The problem isn’t that people are making bad decisions. (Although we also do that at times.) It’s that the decisions are happening in the wrong place, by people working without full context, in territory they don’t feel entirely responsible for or comfortable in. Nobody put them there deliberately. It’s just what happens naturally when two disciplines work in sequence, each doing their best with what they’ve been handed.

And the conventional response – better tooling – doesn’t change this. Zeplin, Figma’s developer mode, Storybook, design tokens, and other tooling around design systems: these are genuinely useful things and I’m glad they exist. They reduce friction at the moment of transfer and provide helpful guardrails. But they make translation more efficient without questioning whether translation is the right model in the first place. The constraints that engineers understand deeply – what the browser actually does, how a component degrades at unexpected viewport sizes, what happens to the layout when real content is three times longer than the copy in the mockup, or [what is now possible with the new CSS](https://www.youtube.com/watch?v=su6WA0kUUJE) – these things still don’t flow back upstream until it’s too expensive to act on them.

What teams need isn’t a better handoff process. They need fewer handoffs. And they need to address both sides of the problem: the structural process gap _and_ the cognitive perception gap.

## Working in the Material [#](#working-in-the-material "Direct link to Working in the Material")

The structural gap – the one Taylor’s model created – needs a structural fix. And the most effective one I know is also the most direct: bring design decisions into contact with the actual material as early as possible.

In 2015, [Frank Chimero](https://frankchimero.com/) gave a talk at Webstock called _[The Web’s Grain](https://frankchimero.com/blog/2015/the-webs-grain/)_ and asked a question that I’ve returned to many times since:

> “What would hap­pen if we stopped treat­ing the Web like a blank can­vas to paint on, and start­ed treat­ing it like a mate­r­i­al to build with?”

When design decisions are made in tools that have no concept of state, of time, of viewport, of the real unpredictability of content, you stop designing for the Web. You design a fiction of the Web. And then you hand that fiction to engineers, who absorb in the process all the compromises and assumptions that were hidden inside the original fiction.

Prototyping in the browser changes this – something I’ve [written about at length before](https://matthiasott.com/articles/saving-your-web-workflows-with-prototyping) and which I’m more convinced of than ever. The browser isn’t only where the product ends up. It’s a place to explore ideas and test them. It’s a place to discover edge cases before they become engineering surprises. It’s a place to shape your design directly with the real material: the web platform with all its inherent flexibility and unpredictability. When design decisions are made in the medium where they’ll live, you encounter immediately what the platform supports and what it doesn’t. This is what [Jeremy Keith calls declarative design](https://adactio.com/journal/18982) – designing with the grain of the medium rather than imposing control over it. And the products that come out of this process are better for it. They’re more resilient, more accessible, more performant, because the constraints that shape those qualities were present from the start, not discovered after the fact.

But here’s what prototyping alone doesn’t solve: it addresses the process gap – the lack of a shared material, the absence of feedback loops – but not fully the perception gap. You can put a designer and an engineer in front of the same browser window and they will learn from each other’s perspectives. But they will still, to some extent, see different things. The lenses don’t merge all of a sudden just because the medium is shared.

For that, you need something more.

## The Artist Who Builds [#](#the-artist-who-builds "Direct link to The Artist Who Builds")

In 1919, twenty-one years after Taylor arrived at Bethlehem Steel, an architect named [Walter Gropius](https://en.wikipedia.org/wiki/Walter_Gropius) founded a school in Weimar, Germany, that was built on a deliberate refusal of everything Taylor stood for.

The [Bauhaus](https://en.wikipedia.org/wiki/Bauhaus) didn’t separate the person who designed something from the person who knew how to make it. There were no handoffs. Artists and craftspeople learned together, thought together, built together, each one expected to understand both the vision and the material. [Gropius wrote](https://bauhausmanifesto.com/):

> “The ulti­mate goal of all art is the building!”

That ideal was largely lost in the industrialised world. We got Taylor’s model instead, because we craved efficiency, and separating planning from execution looked efficient – at least on a stopwatch. But Gropius understood something Taylor didn’t: the best work happens not when thinking and doing are separated, but when they can’t be pulled apart. When the person shaping the vision also feels the resistance of the material. When understanding how something is made changes your idea of what it should be.

I’ve felt this in my own work for years. When I design a layout, I’m already thinking about how the CSS will behave when the viewport narrows and what happens to the rhythm when real content replaces the placeholder text. When I write CSS, I’m not transcribing someone else’s vision – I’m making design decisions in real time, adjusting spacing and proportion and timing based on what the browser is actually showing me. These aren’t two separate activities that I switch between. They’re the same activity seen from two angles simultaneously. And the decisions I make as a result are different – and better – than the ones I’d make if I only held one lens.

But it’s not only that the work gets more coherent. Working at the intersection of both disciplines also lets you see possibilities that neither one would reveal on its own. A designer who understands what CSS Grid and container queries can do will imagine layouts that a designer working only in Figma would never conceive of. An engineer who feels compositional intent will reach for a scroll-driven animation or a view transition that a pure engineering mindset wouldn’t prioritise. These aren’t better compromises. They’re ideas that couldn’t have existed without both perspectives being present at once.

This is what the design engineering role actually is, at its best. Not a designer who codes or an engineer who has taste, but someone who holds both lenses at once and can think compositionally and structurally in the same moment. Someone who doesn’t translate between design and engineering for the Web because there’s nothing to translate – the understanding is native to both.

When that person, a web design engineer, exists on a team, something shifts. The gap between design intent and built reality doesn’t need to be managed with better specifications or smoother handoff tools. It doesn’t form in the same way, because the decisions that would normally fall into that gap are being made by someone with context on both sides. The cognitive difference between the two disciplines – the one that’s real and valuable and never going away – finally has a place where it’s held together rather than split apart.

The web design engineer is, in a very real sense, Gropius’s ideal brought to the Web. The artist who builds. The thinker who makes. The person for whom design and engineering are not sequential phases but a single, continuous act of judgment.

And judgment, more than anything, is what we need.

In a world where AI can increasingly handle execution – writing the boilerplate, generating the component scaffolding, shovelling the pig iron, if you will – what matters most is exactly what the sequential model suppresses: the ability to see both the composition and the constraint simultaneously, to make decisions that are aesthetically sensitive _and_ structurally sound, to develop the kind of cross-disciplinary taste that no specification can encode and no amount of tooling can automate. The interdisciplinary mind isn’t a nice-to-have anymore. It’s the capability that matters most, precisely because it’s the one machines can’t replicate.

## Who Owns This Space? [#](#who-owns-this-space "Direct link to Who Owns This Space?")

I don’t want to make this sound like a problem with a simple solution. It isn’t. Otherwise it wouldn’t persist. Organisations are complex, teams have histories, and the design-engineering relationship often carries a lot of accumulated tension.

But it’s worth being honest about where that tension comes from. It comes from a structural assumption – that design and engineering are sequential activities, that one finishes before the other begins, and that what passes between them is a specification rather than a conversation. And it’s amplified by a cognitive reality – that the two disciplines are trained and see differently, and that without shared time, shared material, and shared language, those differences compound into drift.

The structural problem needs a structural fix: work in the real material, prototype in the browser, make design decisions where they’ll actually live. The cognitive problem needs a different kind of fix: build shared vocabulary, learn from each other, invest in people who carry context across both worlds, create roles where design and engineering aren’t phases but perspectives held by the same mind. Ideally, you address both.

The question worth asking is: in your team, who owns the space between design intent and built reality? Who is responsible for making sure that what gets designed is what gets built – and that it’s built for the actual Web, with all its variability, its real content, its real constraints, and its real humans?

When you have a real answer to that – a name, a role, a shared commitment – you see the difference in the product. Fewer bugs. Better performance. Stronger accessibility. Less money wasted on rework that shouldn’t have been necessary in the first place. And, most importantly, better experiences for the people who use what you build.

Taylor separated thinking from doing because he believed the separation made the work better. Gropius reunited them because he understood it made the work _whole_. On the Web, we get to choose which model we build on. The material is right there and the distance between an idea and a working thing has never been smaller. The person shaping the vision can also be the person feeling the resistance of the material. The one who imagines the layout can be the one who writes the CSS. Maybe that’s how building things for the Web was always meant to be.

Design and engineering, as one.

❦

~