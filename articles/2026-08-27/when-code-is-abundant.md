---
title: "When code is abundant"
source: "https://about.gitlab.com/blog/when-code-is-abundant/"
publishedDate: "2026-08-26"
category: "design"
feedName: "Sidebar"
---

I returned from the holiday break in January convinced that something fundamental had changed.

Large language models had reached the point where they could produce useful code reliably enough, and cheaply enough, to change the economics of software development. Engineers everywhere seemed to be experimenting with the same thing: not just asking an AI assistant for suggestions, but giving agents real work and seeing how far they could take it.

I started thinking about what happens if that continues. What changes when producing code is no longer the primary constraint in building software?

I wrote those thoughts down in a board memo in January. In May, I published part of that thesis in [GitLab’s Act 2](https://about.gitlab.com/blog/gitlab-act-2/): the cost and time of producing software was collapsing, machines would increasingly build software under human direction, and the architecture underneath software development would have to change with it.

In June, at [GitLab Transcend](https://about.gitlab.com/blog/gitlab-transcend-announcements/), we showed the first pieces of that architecture: source control rebuilt for machine-scale concurrency, GitLab Orbit as a context graph spanning the software lifecycle, and governance around agent identity, policy, approval and audit.

Then, on August 21, Anthropic published _[The AI-Native SDLC Playbook](https://claude.com/blog/the-ai-native-sdlc-playbook)_. It opens with a simple statement:

**“Code is no longer the bottleneck.”**

I agree.

Anthropic’s playbook is a practical description of how the development lifecycle changes when agents can move implementation dramatically faster: planning becomes machine-readable, handoffs become automated, verification moves into the loop, and human judgment concentrates at the gates.

What interests me is what happens one level beyond the workflow. If code is no longer the primary constraint, what becomes scarce? What architecture does an enterprise need when people, agents and multiple models are all acting across the software lifecycle at machine speed? And where does durable value move when generating the code itself becomes increasingly abundant?

Over the past eight months, I’ve watched GitLab engineering and other organizations including Stripe, Spotify and Amplitude begin to answer those questions in production. Their experiences have sharpened my original conviction. The important change is not simply that AI can produce code faster.

**It is that when implementation gets dramatically cheaper, the economics and architecture around software change with it.**

**The constraint moves from producing code to trusting it.** Trust increasingly depends on the environment around the model: context, verification, governance and evidence. As organizations run many models and agents at once, that layer has to be durable and independent of any one of them. And as agents encode more of an organization's workflows, expertise and operating knowledge, they should belong to the organization, not to whichever vendor supplies the model or cloud underneath them.

## [](#the-constraint-that-built-an-industry)The constraint that built an industry

For sixty years, software engineering has organized itself around one fact:

**Code is precious.**

It is expensive because turning business intent into reliable software requires scarce people who can hold complex abstractions in their heads. It is fragile because small mistakes can have enormous consequences. And complexity accumulates faster than any individual can absorb. Much of how we build software descends from that constraint.

We preserve old systems because rebuilding them is risky. We bridge between technologies instead of replacing them. Technical debt survives for years because paying it down competes with something customers need this quarter.

We optimize heavily for developer productivity because developers produce the scarce resource. Fragmented tools, inconsistent environments and awkward processes are tolerated if changing them might slow engineers down.

Then there is the ceremony: reviews, approvals, release gates, security checks, change processes and increasingly sophisticated testing. Much of it exists to protect an asset that is expensive to create and expensive to get wrong. And most of the value never gets built at all. For every idea that makes it onto a roadmap, many more never survive the economics of scarce engineering capacity.

**We spend enormous energy protecting the cost of change because change has always been expensive.**

That constraint is beginning to break. And when a constraint this fundamental moves, the rest of the system eventually moves with it.

## [](#every-abstraction-reveals-the-next-constraint)Every abstraction reveals the next constraint

This has happened before.

Humans once programmed computers directly in machine instructions. Assembly abstracted the machine. Higher-level languages moved the abstraction again. Each layer made one problem dramatically cheaper and exposed the one hiding behind it.

Nobody mourns hand-written assembly. We got a bigger problem to work on.

Large language models are obviously not compilers in the technical sense. They are probabilistic systems, not deterministic transformations with defined semantics. But economically, the analogy is useful: they dramatically reduce the human effort required to move from intent to implementation.

The distinction that matters is this:

**Code production is becoming abundant. Good software is not.**

Models can generate implementation far faster than humans can. That does not mean the implementation is correct, secure, performant, compliant, maintainable or even what the business intended. That gap is the point. When code was scarce, the hard problem was producing it. As code becomes abundant, the hard problem becomes trusting it.

**When code is precious**

**When code is abundant**

Preserve legacy because rebuilding is expensive

Rebuild when doing so is cheaper than continuing to bridge

Optimize heavily for developer output

Optimize for business outcomes and learning speed

Carry technical debt for long periods

Retire debt when the economics make sense

Pursue only the highest-confidence ideas

Test many more ideas cheaply

Use process to limit costly mistakes

Use constraints and verification to govern high-volume change

**The cost of typing hid the harder problems. AI is exposing them.**

## [](#cheap-iteration-changes-the-strategy)Cheap iteration changes the strategy

One reasonable objection is that typing code was never the hardest part.

The harder part is deciding what to build. Requirements are ambiguous. Customers change their minds. Teams misunderstand one another. Important edge cases appear only after software meets reality.

All true.

But that argument assumes the cost of being wrong stays the same. Discovering after six weeks that a requirement was misunderstood is expensive. That expense creates pressure to be right upfront. Requirements documents, architectural reviews and careful planning are rational responses to expensive iteration.

**Make iteration cheap and the strategy inverts.**

You stop trying to eliminate uncertainty before implementation and start trying to learn faster.

There is another consequence that may prove even more important. Engineering organizations accumulate enormous amounts of knowledge that never becomes part of the software itself. An experienced engineer knows which service is fragile. Someone remembers why a deployment failed three years ago. A security engineer remembers the class of mistake that caused the last incident. Today, much of that learning lives in human heads. When implementation becomes cheap, more of it can become executable.

A production failure becomes a regression test. A security incident becomes a policy. A performance requirement becomes an automated constraint. A compliance obligation becomes continuous validation.

**Learning turns into code.**

Not literally all of it, and executable constraints do not eliminate judgment. Policies can be wrong. Tests can encode yesterday’s assumptions. But organizational knowledge can increasingly become persistent, inspectable and revisable instead of disappearing when the person who learned it leaves. That is a different kind of institutional memory, and it is one reason code abundance can improve quality rather than simply increase volume.

Amplitude recently published a [striking example](https://amplitude.com/3x) of what a broader overhaul of this kind can produce. Over six months, it tripled the number of pull requests it shipped while reported monthly bugs fell from 715 to 319. That does not prove that more AI-generated code creates better software. It does show that much higher change volume does not have to imply proportionally lower quality.

## [](#cost-per-accepted-change)Cost per accepted change

The economic unit I think matters most in this transition is not cost per line of code.

It is **cost per accepted change**.

A useful software change includes generation, environment setup, context, verification, review, remediation and governance. AI is collapsing the generation term, which makes everything else proportionally more important. An organization that makes generation ten times faster but leaves CI, review and validation untouched will not become ten times faster.

**It will simply move the queue.**

That is exactly what the [Theory of Constraints](https://www.tocinstitute.org/theory-of-constraints.html) predicts: remove one bottleneck and the system exposes the next one. We are now starting to see that happen.

## [](#what-happens-when-agents-reach-production)What happens when agents reach production

Stripe built internal coding agents called [minions](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents). More than a thousand pull requests merged at Stripe each week are produced entirely by minions. Humans review them, but the code itself is agent-generated.

Amplitude documented a [six-month overhaul](https://amplitude.com/3x) of its development pipeline. Pull-request cycle time fell from 5.2 hours to 44 minutes. Frontend CI fell from roughly thirty minutes to three or four.

Spotify has been operating a background coding agent called [Honk](https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1) and has documented more than 1,500 AI-generated pull requests merged into production.

These are unusually capable engineering organizations, so their experiences should not be treated as proof that every enterprise is about to work the same way. What makes them useful is that they have gone far enough to expose the next constraints, and several of the same ones keep appearing.

Amplitude’s development environment had accumulated manual setup, slow CI and inconsistent tooling. That survived for years because code production limited how quickly changes entered the system. Agents removed that throttle, and validation and review became the stoppage points.

So Amplitude rebuilt the foundations: faster environment setup, dramatically faster CI and fewer inconsistent patterns that confused both humans and agents. Very little of that work was AI. It was infrastructure work that became necessary because AI changed the throughput of the system.

Many organizations are currently focused on choosing the best coding model.

In practice, **a thirty-minute CI pipeline defeats every model you point at it.**

Agents do not eliminate existing engineering constraints. They expose them faster.

## [](#three-modes-not-one-maturity-curve)Three modes, not one maturity curve

Most descriptions of AI adoption imply a single journey from traditional development to fully autonomous development. I don’t think that is how the enterprise transition will happen. Three modes will coexist for a long time.

![Diagram of the three modes of AI-assisted development](https://res.cloudinary.com/about-gitlab-com/image/upload/v1787591354/fcloou7pnrjtc2hzvrre.png)

**Mode 1: Human-controlled legacy**

Systems with undocumented dependencies and operational knowledge that still resides in people. Many will remain largely human-controlled until they are retired or rewritten.

**Mode 2: Agentically accelerated development**

Humans remain in control while agents assist with implementation, testing, migration, review, documentation and security analysis. This is where most enterprise development sits today and where I expect much of the near-term economic value.

It is not merely a waiting room for autonomy. One of the most valuable uses of agents may be making modernization projects economical when they were previously impossible to justify.

**Mode 3: Autonomous development**

Agents operate the implementation loop while humans provide intent, constraints and oversight. The important dividing line is not greenfield versus brownfield. It is whether execution remains human-controlled or can safely operate as a closed loop.

A practical way to tell where a system sits is to ask three questions: Can an agent make a useful change with the context available? Can that change be verified without a person reading every line? If it is wrong, does the system catch it or does a person have to? The more those answers depend on a person, the closer the workload remains to Mode 1, regardless of how capable the model is.

Trying to force every workload into Mode 3 too early is likely to be one of the more expensive mistakes organizations can make during this transition.

## [](#the-pipeline-runs-the-inner-loop)The pipeline runs the inner loop

Once Amplitude reduced frontend CI below five minutes, the remote pipeline became fast enough that engineers could launch many pieces of work in parallel and review the results as they returned.

Stripe reached a similar architecture from another direction, giving minions isolated, pre-warmed development environments so many jobs can run concurrently without interfering with one another.

Most coding-agent workflows today still begin on a laptop. That is a reasonable place to start. It is unlikely to be where the architecture ends.

In an agentic system, the pipeline becomes the natural place to run the inner development loop:

**generate → build → test → validate → review → remediate → repeat**

The agent keeps working against those signals until it can return something that is not merely plausible code, but functional, verified software that satisfies the constraints the organization has defined.

Faster inner loops also increase the need for coordination. A thousand individually valid changes can still pull a system in conflicting directions. As AI compresses the gaps between SDLC phases, alignment on intent has to become continuous rather than periodic.

There are architectural reasons this loop belongs close to the repository and the systems around it.

The pipeline already sits next to the code, build system, test infrastructure, security controls, deployment configuration and much of the history surrounding a change. The closer the agent is to those systems, the less context it has to reconstruct through repeated remote calls and fragmented APIs, and the faster it can receive feedback. That matters because machine-speed development can turn even small amounts of latency and context loss into system-level bottlenecks.

Running the loop there also preserves the evidence around the work. The identity that initiated the change, the policies that applied, the tests that ran, the reviews that occurred, the remediation the agent performed and the artifact that ultimately shipped can all remain connected.

That is important for more than efficiency. It is what makes increasing autonomy governable.

The pipeline moves from being a gate at the end of development to becoming the system that runs the development loop itself.

Agentic development therefore scales best where execution, context and governance are close to the work. The faster an agent can access the right context, receive deterministic feedback and prove what it did, the more of the loop it can safely complete before handing work back to a person.

The question is no longer simply: Did the code compile?

It is: Was the change actually good, and can we prove it?

## [](#autonomy-is-governed-not-granted)Autonomy is governed, not granted

As model capability improves, I believe governance increasingly becomes the binding constraint on autonomy.

The stalled enterprise programs I have seen rarely stall because nobody can get a model to generate code.

They stall on more basic questions. What is the agent allowed to do? How do we prove what it did? Who is accountable when it is wrong?

[Stripe’s architecture](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2) illustrates the pattern. Minions combine open-ended agent loops with deterministic software for git, linting and testing. They run in isolated environments, pass local checks before pushing, and selectively run tests from a suite containing more than three million tests.

The agent can be creative.

**The system decides where creativity stops.**

Amplitude uses a risk model to distinguish work that can merge automatically from work that should still route to a person.

Spotify’s [verification architecture](https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3) gives agents access to verification without exposing the underlying implementation of the verifiers, and runs required checks before a pull request can be opened.

None of these organizations solved reliability with a better prompt. They combined capable models with deterministic gates, isolation, verification, policy and evidence, and that is what allows autonomy to expand safely.

It also explains why this becomes harder outside the best-resourced technology companies. Most enterprises will not want to invent their own agent authorization model, isolation layer, verification architecture and evidence system. They will expect to inherit much of it.

That is increasingly what we mean at GitLab when we talk about **speed with control**.

Speed without control eventually stops because the organization cannot accept the risk. Control without speed leaves the value of AI unrealized. The two have to be designed together.

## [](#accountability-can-become-clearer)Accountability can become clearer

One concern about autonomous development is that accountability disappears into the machine. That can happen if the system is designed poorly. But autonomous development can also make accountability more explicit if identity, policy, context and evidence are preserved as part of execution.

Humans remain accountable for defining the constraints: the security policy, the performance threshold, the compliance obligation, and what the organization learned from the last incident. The control plane has to make execution against those constraints provable.

Amplitude’s description of its [SOC 2 approach](https://amplitude.com/3x) is instructive. Its automated approval process relies on documented criteria, logged decisions and an override path rather than requiring a human to click approve on every qualifying change. The human moves from approving every action toward owning the criteria under which actions are permitted, which can be both more consequential work and more auditable.

## [](#the-durable-layer)The durable layer

One possible conclusion from increasingly capable agents is that more of the software lifecycle collapses into the model and everything around it becomes commodity infrastructure. I think the opposite is more likely.

As agents take on more of the implementation loop, the durable enterprise layer becomes even more important. Context, identity, policy, provenance, verification and organizational memory cannot live only inside whichever model or agent is executing the work. They have to persist across them.

And over time, I expect the product development lifecycle to use multiple purpose-built models.

Different tasks will optimize for different things: reasoning quality, latency, cost, security, domain specialization or where the model can run. Some will use frontier models. Others will use smaller models or open-weight models deployed closer to the customer's data and infrastructure. The best model for planning may not be the best model for code review, security analysis, testing or remediation.

That is a familiar pattern as technologies mature. A single general-purpose capability gives way to a more specialized stack optimized for different workloads.

In that world, the model is not the durable architecture. It is an execution component.

**The more models and agents an enterprise uses, the more valuable the common context, controls and history around them become.**

This also changes the boundary of what we have traditionally called the software development lifecycle.

The SDLC was built around people moving work through a sequence of stages: plan, build, test, secure, deploy and operate. As AI compresses those stages into continuous agentic loops, I expect the distinction between developing software and developing the product itself to blur.

You can think of the emerging model as a **Product Development Lifecycle, or PDLC**: business intent enters the system, agents turn it into software, verification and governance determine what can proceed, production results feed back into the next decision, and the loop continues.

At sufficient scale, that begins to look less like a traditional development process and more like a **software factory**: a system that continuously turns intent and business signals into verified software.

But a software factory is not simply a collection of autonomous agents. The durable layer underneath it is what preserves context, identity, policy, evidence and organizational memory while models and agents change.

### [](#context-and-provenance)Context and provenance

Anthropic’s [AI-native SDLC playbook](https://claude.com/blog/the-ai-native-sdlc-playbook) is useful because it makes the transition concrete. It describes intent, specifications and plans becoming machine-readable artifacts; institutional knowledge being made available to Claude; hooks and skills enforcing behavior; MCP connecting agents to tools; and version history preserving evidence of the work. I think those are useful patterns, and many organizations will start there.

**Our architectural bet at GitLab is that agentic development requires a new platform architecture, not just a better model.**

That architecture has four essential capabilities: **an agent platform, machine-scale execution, durable context and governance.** I’ll return to each of these below.

Enterprises will use more than one model. They will use agents from multiple vendors alongside agents they build themselves. And increasingly, they will want to build agents that encode their own workflows, expertise and operating policies alongside the excellent agents vendors will keep producing.

The platform therefore has to support both paths: customers should be able to bring the agents they choose and build, customize and operate agents they own.

Those agents will act across code, planning, security, CI, deployment and production systems, often at the same time. They should not have to be rebuilt because an organization changes its preferred model or cloud. And the organization’s context, policy, identity and history should not become captive to whichever model, agent vendor or infrastructure provider happens to be in favor at the time.

**The model should be replaceable. The agent should belong to the customer. The organization’s memory and controls should endure.**

That is why I believe the architectural pressure is toward a model- and cloud-neutral platform, not toward a single model, agent vendor or cloud becoming the system of record.

That does not require one vendor to own every artifact involved in creating software. Identity can federate. Events can move between systems. Context can be indexed. Policies can be centralized. MCP and other open interfaces can give agents access to tools across the enterprise. Many organizations will build this way.

The harder problem with this pattern is preserving the chain from intent to action to outcome as autonomous systems operate across that environment.

A requirement authorizes a change. The change executes under a particular identity and policy regime. Verification produces evidence. A deployment ships it. Production produces a result. Those relationships form a causal graph.

None of this is new. What is changing is the frequency at which those relationships have to remain intact. At human development velocity, reconstructing provenance across several systems after the fact is painful but often survivable.

**At machine velocity, provenance becomes part of the execution path itself.**

When the relevant relationships live natively in a common system or control plane, an agent can reason across them directly. When they live across several systems, something has to reconstruct them. That is possible. But it creates work around identity, synchronization, policy consistency, semantic mapping and evidence. At machine volume, reconciliation itself can become a system constraint.

Spotify’s experience illustrates the same problem inside a codebase. In one [migration](https://engineering.atspotify.com/2026/4/background-coding-agents-dataset-migrations-honk-part-4), Honk encountered multiple pipeline frameworks. The more standardized frameworks were easier to automate; inconsistency made reliable context much harder. At human speed, inconsistent context creates friction. At machine speed, it degrades output repeatedly.

The important unit in autonomous development is increasingly not the individual artifact. It is the relationship among intent, code, policy, evidence, deployment and outcome.

This is why I believe the inner software-development loop will experience increasing pressure toward a common control plane. Not because a single vendor must own every tool, but because trustworthy autonomy requires those relationships to remain coherent while machines act at a scale humans never did. Platforms that already hold many of them have a structural advantage over systems that have to reconstruct them afterward.

### [](#records-not-files)Records, not files

One emerging practice in agentic development is to capture intent, specifications and implementation plans as Markdown files committed to a repository.

I like the instinct. Making intent explicit, versioned and readable by humans and agents creates immediate value.

But there is an important distinction between a file and a governable record. At enterprise scale, the system eventually needs to answer questions a file cannot answer on its own:

-   Who can modify this?
-   What state is it in?
-   Who approved it?
-   Which policy version applied?
-   What deployment resulted from it?
-   How do I query across ten thousand of these?

Teams can recreate those capabilities through conventions around Markdown, but those are exactly the capabilities systems of record have spent years developing.

The best architecture may present Markdown as an interface to agents while keeping a structured, governed record underneath it.

The interface can remain simple. The system underneath cannot.

### [](#agents-should-belong-to-the-organization)Agents should belong to the organization

Agents need context about how an organization builds software: repository structure, coding conventions, build commands, testing practices, architecture rules and known failure modes.

Spotify calls this work [context engineering](https://engineering.atspotify.com/2025/11/context-engineering-background-coding-agents-part-2) and found it essential for producing reliable, mergeable pull requests across real codebases. As that knowledge grows, it becomes an organizational asset.

The same is increasingly true of the agent itself.

An enterprise agent may encode years of accumulated instructions, workflows, tool access, evaluation criteria and operating policy. Over time, that can become some of the most valuable intellectual property in the engineering organization.

It should belong to the organization, not to a model vendor, cloud provider or proprietary runtime.

There is another reason ownership matters: it allows the system to compound.

Every time an agent acts, the organization produces evidence about what worked and what did not. Which changes were accepted? Which were rejected? Where did a human intervene? What failed in production? Which constraints caught the problem?

Preserved over time, that evidence becomes an internal evaluation set grounded in the organization’s own codebase and outcomes, not a public benchmark. The organization can use it to evaluate models, improve its agents, refine their instructions and workflows, and determine where greater autonomy is actually warranted.

The result is a feedback loop: the agent does work, the system measures the outcome, and what the organization learns makes the next generation of agents better at that organization’s work.

This extends the idea that learning turns into code. Learning can become tests and policies, but it can also become evals, context and improved agents.

That is not an argument against any particular vendor. We build on Anthropic models today and expect to keep doing so. A customer running Claude Code should be able to keep running it, with the same enterprise context, identity and audit trail as any agent we build ourselves.

The point is, customers must be able to choose a model, change it, use different models for different tasks and run their agents on the infrastructure their business requires. They should also be able to bring agents from other vendors and give them access to the same enterprise context and controls.

[`AGENTS.md`](https://agents.md/) is one example of an open format for providing project instructions and context to coding agents. GitLab supports it, and we will continue to support open formats like it because an organization’s accumulated knowledge should remain portable if the organization changes models, agents or vendors.

The principle matters more than the filename.

**Own the agent. Own its instructions. Own the context it learns from. Keep the models and infrastructure underneath it a choice.**

## [](#anyone-can-ship)Anyone can ship

One of the more interesting results in [Amplitude’s experience](https://amplitude.com/3x) was not about engineers. After improving its development setup, validation and review, designers, product managers and marketers began producing code changes themselves. Non-engineers went from essentially zero pull requests to roughly five percent.

This is an early version of a change I expect to become much larger. As implementation becomes cheaper, the boundary between deciding what to build and building it starts to collapse. Product managers can turn intent into working software. Designers can move from prototypes to implementation. Engineers can operate at a higher level of abstraction across the product. And people outside traditional R&D organizations can increasingly build solutions directly from the expertise they already have.

I think **Builder** becomes a useful way to describe this broader role. A Builder may be an engineer, designer, product manager, security expert, marketer or domain expert. What they share is the ability to express intent, direct agents, evaluate the result and turn an idea into something that works.

This is also part of the shift toward the PDLC described earlier. As the distance between product intent, design, implementation and feedback collapses, software development becomes less of a specialized handoff within engineering and more of a continuous product-building loop.

That does not mean expertise disappears or that everyone becomes an engineer. The opposite may be true. As agents absorb more implementation work, domain expertise and judgment become more valuable. The person overseeing an agentic system may not be an engineering manager supervising coding agents. It may be a domain expert who can express what should happen and recognize whether the outcome is right.

The result is a much larger population of people who can create software without making engineering judgment abundant.

Scarce human attention moves upward: toward intent, architecture, constraints, difficult tradeoffs, exceptions and evaluating whether the system produced the outcome the organization actually wanted.

**The work of building software expands beyond engineering. The need for judgment does not.**

## [](#integration-moves-outward)Integration moves outward

None of this means integration stops mattering. I expect its center of gravity to move.

Inside the high-frequency execution loop, tighter integration becomes more valuable because agents depend on fast feedback, consistent identity, shared context and enforceable policy.

Outside that loop, integration becomes even more important because the intent driving software increasingly originates elsewhere in the business.

Customer support contains customer pain. CRM contains commitments. Data platforms contain usage and business outcomes. Observability describes production health. Compliance systems define obligations. Those systems provide signals, intent and constraints, and the development control plane turns them into governed action.

Over time, I expect the distance between a business signal and a software response to collapse dramatically.

The most important development platform in that world may therefore be defined less by how many developer tools it replaces and more by how effectively it connects governed software execution to the systems that describe what the business needs.

## [](#the-new-platform-architecture)The new platform architecture

That future requires a platform architecture built around four capabilities:

**Agent platform:** the ability to create, customize and operate agents the organization owns, using the models and infrastructure it chooses, while also supporting agents customers bring from elsewhere.

**Execution:** next generation Git, artifact management, CI/CD and the capacity to build, test, deploy and operate software at both human and machine scale.

**Context:** a coherent picture of the requirement, code, history, business priority and constraints surrounding the work.

**Governance:** enforceable boundaries around security, compliance, quality, identity and permissions, plus the visibility people need to understand what agents did, why it was allowed, and where human attention is required.

As autonomy increases, governance becomes less about approving every action and more about helping people understand and steer the exceptions. Policies and tests automate decisions the organization has already made; the harder cases are the ones nobody anticipated.

**The ultimate constraint on autonomy may not be whether the agent can act. It may be whether a person can understand and steer what hundreds of agents are doing at once.**

These four architectural layers reinforce one another. Agents act through the execution layer. Execution creates signals that enrich context. Better context makes agents more capable and governance more precise. Stronger governance allows those agents to operate with greater autonomy.

Enterprises will need those capabilities to work as a coherent platform, even when many different models, clouds, products and agents participate underneath it.

## [](#what-this-means-in-practice)What this means in practice

These aren’t only architectural principles for some distant autonomous future. They’re already changing what we build.

In [Act 2](https://about.gitlab.com/blog/gitlab-act-2/), we described several architectural bets based on the assumption that software development would increasingly operate at machine scale. At [GitLab Transcend](https://about.gitlab.com/blog/gitlab-transcend-announcements/) in June, we showed the first pieces of that architecture, with demos of each.

**Customers need a place to build and run agents they own.** GitLab Duo Agent Platform is our platform for creating, customizing and operating those agents around an organization’s own workflows and expertise. Customers can choose the models underneath them and run them across the infrastructure their business requires, while continuing to use external agents alongside them. The goal is not to force every enterprise into one agent ecosystem. It is to give customers a place to build agents they can own and evolve without being locked to a single model or cloud.

**Execution has to operate at machine scale.** Agents clone, branch, retry and trigger pipelines at volumes traditional source-control architecture was never designed for. Our next-generation source control is being rebuilt around that reality, including server-side access patterns that allow an agent to retrieve what a task actually requires rather than repeatedly moving an entire repository. In internal testing, those changes have produced task execution up to 50 times faster while moving dramatically less data.

**Context has to become infrastructure.** GitLab Orbit connects code, work items, pipelines, deployments and production signals into a context graph across the software lifecycle. Agents can query those relationships directly instead of reconstructing them through dozens of disconnected calls. Importantly, that context is not reserved for GitLab’s own agents. Third-party agents can use the same organizational memory.

**Governance has to surround the agent, not live inside its prompt.** Governance for Agents is designed to apply identity, policy, approval and audit controls around agent actions so organizations can increase autonomy without giving up evidence or accountability.

Those are different engineering projects, but they come from the same premise:

**If implementation is becoming abundant, the platform underneath it has to let enterprises build and bring agents, then give all of them execution, context and control at machine scale.**

## [](#what-to-do-in-the-next-ninety-days)What to do in the next ninety days

**Measure cost per accepted change.** Track the elapsed time from generated change to accepted change, then decompose it across environment, CI, review, remediation and governance. Many teams will find generation is already a small part of the total.

**Time your CI.** If a full pipeline takes much longer than five minutes, improving that may matter more than switching models.

**Write down the criteria, not just the approvals.** Pick one class of low-risk change and define what would make it safe to merge without a human. That becomes the beginning of executable governance.

**Make context portable.** Put repository instructions and operating knowledge in an open, versioned format that both people and agents can use.

**Choose which business signals should enter the development loop directly.** Support, observability and compliance systems increasingly contain intent and constraints. Decide which signals should become governed software work without requiring a person to retype them.

## [](#where-we-go-from-here)Where we go from here

Code generation is becoming increasingly commoditized. That does not mean software development is becoming free. It means the economics are changing.

The useful unit is not cost per line of code.

It is **cost per accepted change**.

As generation gets cheaper, everything around generation becomes proportionally more important: environment, context, verification, governance and evidence.

This also changes where scarce human judgment goes. Engineering judgment does not become abundant because implementation does. Human attention moves upward: toward architecture, intent, constraints, difficult exceptions and evaluating whether the system produced the outcome the organization wanted.

And it changes where I think strategic value will accrue in the software-development stack. For sixty years, implementation was scarce enough that much of software engineering revolved around protecting developer capacity and limiting the cost of change. AI changes that constraint.

**When implementation becomes abundant, trust becomes scarce.**

Trust requires more than a model producing a plausible answer. It requires evidence that the software was produced under the right constraints and behaved the way the organization intended. Enterprises can assemble those capabilities from many products, and many will. But as machine activity increases, fragmented control planes create an increasingly expensive reconciliation problem.

The architectural pressure is therefore not necessarily toward one vendor owning everything.

It is toward a **model- and cloud-neutral platform where enterprises can bring agents they choose, build and customize agents they own, and give all of them a common layer of execution, context and governance.**

That is the opportunity we see for GitLab.

The model may change. The cloud may change. The agent may come from a vendor or be built by the customer.

**The organization’s intelligence, context and controls have to survive all of them.**

Stripe, Spotify and Amplitude have shown what exceptional engineering organizations can build for themselves. Anthropic’s playbook now shows how quickly the operating model around software development is beginning to change. Most companies will not have a platform team available to recreate all of that machinery from scratch. They will need to inherit much of it.

**Software engineering spent sixty years protecting a scarce resource. It will spend the next decade governing an abundant one.**

It’s a better problem.

* * *

### [](#sources)Sources

-   GitLab, _GitLab Act 2_, May 11, 2026. [about.gitlab.com/blog/gitlab-act-2](https://about.gitlab.com/blog/gitlab-act-2/)
-   GitLab, _Built for the agentic engineering era_, June 10, 2026, with demo videos from GitLab Transcend. [about.gitlab.com/blog/gitlab-transcend-announcements](https://about.gitlab.com/blog/gitlab-transcend-announcements/)
-   Anthropic, _The AI-Native SDLC Playbook_, August 21, 2026. [claude.com/blog/the-ai-native-sdlc-playbook](https://claude.com/blog/the-ai-native-sdlc-playbook)
-   Amplitude EPD, _Speedrunning Software: How We 3×’d PRs in 6 Months_. [amplitude.com/3x](https://amplitude.com/3x)
-   Stripe, _Minions: Stripe’s one-shot, end-to-end coding agents_. [Part 1](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents) and [Part 2](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2)
-   Spotify Engineering, _Background Coding Agents_. [Part 1](https://engineering.atspotify.com/2025/11/spotifys-background-coding-agent-part-1), [Part 2](https://engineering.atspotify.com/2025/11/context-engineering-background-coding-agents-part-2), [Part 3](https://engineering.atspotify.com/2025/12/feedback-loops-background-coding-agents-part-3), [Part 4](https://engineering.atspotify.com/2026/4/background-coding-agents-dataset-migrations-honk-part-4)
-   [`AGENTS.md`](https://agents.md/), an open format for guiding coding agents
-   Goldratt, _Theory of Constraints_. [tocinstitute.org](https://www.tocinstitute.org/theory-of-constraints.html)