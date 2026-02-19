---
title: "On cognitive debt"
source: "https://www.natemeyvis.com/on-cognitive-debt/"
publishedDate: "2026-02-18"
category: "design"
feedName: "Sidebar"
---

_15 Feb, 2026_

## On cognitive debt

People are talking about _cognitive debt_, the idea that AI-generated codebases are at risk of falling into a state where nobody knows how they work. This threatens to leave them inextensible, unobservable, and hard to debug.

[Here's Simon Willison](https://simonwillison.net/2026/Feb/15/cognitive-debt/) citing [Margaret-Anne Storey](https://margaretstorey.com/blog/2026/02/09/cognitive-debt/), as discussed [by Martin Fowler](https://martinfowler.com/fragments/2026-02-13.html).

"Cognitive debt" is a lovely term for this: it describes an important phenomenon that is much to be avoided. It is absolutely happening with AI-driven codebases--the links above have examples, and I've felt it in my own projects.

I suspect, however, that:

1.  When you control for the size and scope of the project, cognitive debt tends to be at least as bad, and usually worse, in pre-AI codebases than in AI codebases;
2.  This fact is obscured because so much of what is normalized as traditional engineering work is in fact either managing crippling cognitive debt or avoiding it at enormous cost;
3.  The best users of AI are already pretty good at avoiding cognitive debt, and we're only going to get better at it.

Taking these in turn:

#### AI doesn't amplify cognitive debt _compared to relevant alternatives_

Encapsulation is hard. I've long said that, however highly rated it is as a software engineering concept, it is still underrated.[1](#fn-1) We usually have not succeeded at it, and it's not a surprise that we are not immediately succeeding at it with our new power tools.

The rhetorical force of cognitive debt alarmism gets much of its force from implicit time comparisons: "I've been working on a project with AI for ten days, and I already don't understand it." If you're moving 10 or 100 times as fast as before, this wouldn't be surprising, _even if AI weren't affecting your comprehension per unit work_. Imagine someone in the before-times saying: "I've been working hard on a project for a year and half, and I often struggle to remember exactly what I need to do in order to extend it." We say these things _all the time_ when codebases grow to the size we're now reaching very quickly; perhaps we say it with some regrets, but it's not thought to indicate an unusual pathology. I suspect that AI, as it delivers benefits more quickly, is also getting us to analogous levels of cognitive debt, just more quickly. The staggering difference in wall-clock time can obscure underlying similaries relative to the project's progress.

#### There's more cognitive debt in non-AI codebases than is recognized

The less polite way to say "encapsulation has always been hard for us" is: "Much of what we have normalized as competent or advanced software engineering is the unnecessary, regrettable management of cognitive debt." A standard mature codebase often has one or a few long-tenured members who know all the non-obvious couplings, information leakages, ill-documented edge cases, and so on. Depending on one's perspective, this is either avoiding or paying for cognitive debt, at enormous cost either way.

Large real-world systems [have unavoidable complexity](https://www.natemeyvis.com/code-correctly-by-conforming-to-the-real-world/), but much day-to-day engineering work is the avoidable consequence of having introduced unnecessary complexity. Moreover, our standard ways of managing complexity often make it worse.[2](#fn-2)

People don't like to say or hear this. It's easy to confuse with other claims:

1.  _Nobody anywhere_ is good at managing complexity. (This is false.)
2.  Well-respected senior engineers have been wasting their time on preventable work. (I don't think this is the right way to think about it.)
3.  Well-respected engineers are cynically introducing complexity that only they understand in order to make themselves indispensable. (This is usually false.)
4.  What we think of as the subtle, difficult art of system design is something computers are already doing as well as us. (See below.)

If you're complaining about pull requests that make sense locally but damage the code base globally, it's worth meditating on how this is possible. Why is it _possible_ for a local code change to mess up a distant part of the system? Why is it possible to do this _without failing the test suite_? I don't doubt that projects are flooded with low-quality pull requests, and I don't deny that our work often _does_ require us to keep many parts of a system in mind, even when all goes well. The failures of AI-assisted code maintenance, however, often point to previous failures of human attempts at encapsulation.

#### Competent use of AI can mitigate cognitive debt

The emerging craft of AI-assisted engineering should concern itself with avoiding and mitigating cognitive debt. Here are some techniques I've tried:

1.  Improving [my bootstrapper](https://www.natemeyvis.com/humane-adaptive-ai-bootstrapping/) by emphasizing encapsulation and describing common failure modes in it.
2.  Taking time to describe the subsystems I want to build in a system, the interfaces by which they interact, and the data structures they use.
3.  Undertaking large-scale refactorings with the help of AI. This is, I find, a lot less painful than in the before times, because AI is so good at finding all the relevant code pointers and "turning the crank" of changing all the call sites and so on. There's a "you can just do things" angle here: I've had good luck saying "I think that there's a failure of encapsulation here and that there should be a single subsystem that is the source of truth about X and handles it by exposing endpoints A, B, and C." It takes time, work, and iteration to get it right, but it's still _vastly_ quicker than without AI.
4.  Getting better test suites in place where cognitive debt is emerging.

Cognitive debt is real, but we can mitigate it by using AI better, and we won't make progress by blaming AI for our own mistakes.

1.  Either search this site or ask anyone who has been within earshot of me consistently this decade.[↩](#fnref-1)
    
2.  John Ousterhout's concept of a "tactical tornado" is useful here; he discusses it in _A Philosophy of Software Design_ (which is [a good book](https://www.natemeyvis.com/reading-notes-a-philosophy-of-software-design/)).[↩](#fnref-2)
    

[#encapsulation](https://www.natemeyvis.com/blog/?q=encapsulation) [#generative AI](https://www.natemeyvis.com/blog/?q=generative%20AI) [#sociology of software](https://www.natemeyvis.com/blog/?q=sociology%20of%20software) [#software](https://www.natemeyvis.com/blog/?q=software) [#testing](https://www.natemeyvis.com/blog/?q=testing)