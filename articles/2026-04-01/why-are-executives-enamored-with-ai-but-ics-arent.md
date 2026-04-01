---
title: "Why are executives enamored with AI but ICs aren’t?"
source: "https://johnjwang.com/post/2026/03/27/why-are-executives-enabled-with-ai-but-ics-arent/"
publishedDate: "2026-03-31"
category: "design"
feedName: "Sidebar"
---

I think there’s pretty clearly a divide in AI perception between executives and individual contributors (ICs). Executives seem to love it and evangelize it (going so far as to creating mandates at their companies for AI usage). But ICs are typically much more skeptical of its usage. You can see the divide show up everywhere from Hacker News comment threads to internal Slack debates about adopting coding agents.

Here’s my current posit for why there’s such a big divide: executives have always had to deal with non-determinism and focus on nondeterministic system design, while individual contributors are evaluated by their execution on deterministic tasks.

## Managing non-deterministic systems

Executives have always had to deal with non-determinism. That’s par for the course:

-   People being out sick or taking time off unexpectedly
-   Someone not finishing an important project and not talking about it until far too late in the process
-   People reacting to an announcement in an unexpected way
-   A feature being built in a way that doesn’t make sense with respect to the rest of the product, but does technically achieve objectives.

More generally, if you’ve ever taken a Chaos Theory class in math, you’ll know that nonlinear, chaotic systems emerge when individual agents in a system are all acting with different inputs, utility functions, etc. Systems become slightly easier to manage if you’re able to make those utility functions consistent (you’re able to get a grasp on system dynamics).

A manager’s job is to create a model of the world and align everyone’s utility functions, knowing that there’s a large amount of non-determinism in complex systems. So it makes sense that as a manager, you’re ok with a decent amount of this.

AI is something that is non-deterministic but has a lot of characteristics of a well behaved chaotic system (specifically a system where you can understand the general behavior of the system, even if you cannot predict the specific outcomes at any point in time).

For example:

-   LLMs generally continue their work and provide an output regardless of time of day, how difficult the task is, how much information is available
-   LLM’s deficiencies have well defined failure modes (e.g. hallucinations, lack of ability to operate outside of their context, and especially poor outcomes when not given enough context)
-   The types of tasks that an LLM can accomplish are relatively well known, and the capability envelope is getting mapped out quickly. This is different than humans, where each person has a different set of strengths and weaknesses and where you need to uncover these over time.

Many of these properties are more deterministic than large human systems, which makes AI incredibly attractive for an executive who is already used to this and likely has put a large amount of effort into adding determinism into their systems already (e.g. by adding processes and structure in the form of levels and ladders, standard operating procedures, etc.).

## ICs live in a more deterministic world

ICs are generally much more focused on particular problems that have specific inputs and outcomes. Correctness is easier to determine, and how good you are at your job can largely be described by quality and speed, where the weights on those two depend on which organization you’re in. This changes as you move up the ladder (a staff engineer is expected to tackle large, ambiguous business problems), but for most ICs, the world is relatively well defined.

ICs deal with plenty of non-determinism in practice (unclear requirements, flaky systems, shifting priorities), but the way they’re evaluated pushes in the other direction. An IC’s value often comes from being reliably precise (e.g. writing correct code, getting the analysis right, producing a design that holds up under scrutiny). The more deterministic your output, the better you are at your job.

AI introduces non-determinism into exactly this space, and from an IC’s perspective, there are good reasons to be skeptical:

-   **It’s not as good as they are at their job.** A highly trained human focused on a specific task will often beat an LLM, especially if that task is long running, requires connecting multiple systems, or demands precise domain intuition. If you’re an expert and you’re handed a tool that does a mediocre version of your work, the overhead of fixing its mistakes can genuinely cost more than doing it yourself.
-   **It changes what their job is.** You go from doing the work yourself to managing something that does the work. The skills that got you hired (deep focus, precision, domain knowledge) aren’t necessarily the skills that make you good at that. That’s a disorienting shift.
-   **It’s tied to self worth.** Work accounts for the majority of a person’s waking hours. When executives talk about AI making everyone more productive, ICs can hear that as the things you’ve spent years getting good at are about to matter less. Whether or not that’s what’s actually being said, it’s a reasonable thing to feel.

One note: organizations that bias towards speed over quality tend to see more IC adoption of AI (e.g. my network of engineers at startups are on the whole adopting AI and using it to speed quite a few things up, though not necessarily making things higher quality). Organizations that bias towards quality often see the opposite. AI doesn’t really make quality higher, or it’s quite difficult to make it do so, and it can sometimes make quality on specific tasks worse because these ICs are typically really well trained for their specific task.

## So where does the friction come from?

The difference in AI perception comes down to what work looks like at different parts of the stack. Executives manage non-deterministic systems and have built their careers around it. ICs operate in a more deterministic world and are evaluated on their ability to deliver precise, reliable output. AI fits neatly into the first worldview and awkwardly into the second.

I think this framing explains a lot of the friction that shows up when companies try to roll out AI adoption broadly. The same tool looks fundamentally different depending on what your job actually asks of you.