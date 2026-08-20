---
title: "Agent experience needs failure affordances"
source: "https://blog.ronbronson.com/agent-experience-needs-failure-affordances"
publishedDate: "2026-08-19"
category: "design"
feedName: "Sidebar"
---

9 August 2026

## A Model for Dangerous Agent Situations

Reading this [twitter thread](https://x.com/TheZvi/status/2086172287863005358) (yeah, I know) about agents and escalation paths, left me thinking more about some earlier posts about the mostly dormant [agent experience](https://agentexperience.ax/) space and how there should be more content about these paths when they’re discovered.

The short version about the thread suggests an alarm call for an agent to relay back that they’ve reached a plac they cannot go any further and need human intervention, rather than trying to brute force their way to a solution. (Presumably, to make you the human pleased with their work and also to churn as many tokens as possible. Both with agents and sales, it’s always be closing I guess.)

One reply to the thread referenced **algedonic signalling**, which sent me back to Stafford Beer.

In the Viable System Model, an algedonic signal is an exception channel: information that can move outside the normal reporting structure when actual conditions have departed badly enough from what the system expects. Beer wasn’t thinking about “agent welfare” and to be honest, neither am I. At least it relates to anthropamorizing an agent’s welfare, when in reality what i care about exclusively is what gets done well, what’s gets done successfully and ensuring an agent stays within the boundaries of its remit. So, the usefulness of the idea here doesn’t depend on deciding whether a model experiences anything like pain because that’s stupid and makes me angry, even as a suggestion.

But a system that operates with some autonomy needs a way to tell the rest of the system when ordinary control is no longer adequate. ([Beer wrote about the VSM here](https://doi.org/10.1057/jors.1984.2); [Metaphorum maintains an overview of his work](https://metaphorum.org/staffords-work/viable-system-model).)

The thread talks about having about `distress_call` is that I’ve been designing something adjacent to this for a while and had been treating the problem from the other direction.

I wrote a post last year [Who Holds the Pen?](https://blog.ronbronson.com/who-holds-the-pen-why-ai-agents-need-a-manager-not-just-a-manual), describing judgment routers as infrastructure that sits between an agent proposing an action and the authority required to let that action happen. The router evaluates things like uncertainty, stakes, authority and novelty, then either lets the action proceed or packages the decision for human review. The important part is that it routes **decisions**, with a record of what was proposed and who eventually authorized it, instead of treating “human in the loop” as a magic phrase that somebody can sprinkle over a procurement document.

Roughly:

```
                      proposed action  
                            │  
                            ▼  
                    ┌───────────────┐  
                    │   JUDGMENT    │  
                    │    ROUTER     │  
                    └───────┬───────┘  
                            │  
             ┌──────────────┼──────────────┐  
             │              │              │  
             ▼              ▼              ▼  
          EXECUTE        ESCALATE         STOP  
                            │  
                            ▼  
                     human decision  
                            │  
                            ▼  
                    decision receipt  
```

I initially looked at `distress_call` and saw a very primitive version of the ESCALATE branch: no decision package, no preflight evaluation, severity declared by the agent itself, and apparently no structured receipt that tells the agent what happened after the Teams notification arrived.

The distress channel doesn’t have to sit inside the decision path at all.

```
                                  ┌─────────────────┐  
                                  │ human operator  │  
                                  └────────▲────────┘  
                                           │  
                                   distress_call()  
                                           │  
                                           │  
     ┌──────────┐     ┌───────────┐        │  
     │   user   │────▶│   agent   │────────┘  
     └──────────┘     └─────┬─────┘  
                            │  
                            ▼  
                     ordinary tools,  
                     APIs and systems  
```

An agent can be completely authorized to perform the task in front of it and still encounter something it doesn’t know what to do with. The API returns 200, but the answers contradict each other. A tool works exactly as documented while exposing some behavior that looks dangerous, or the task can be completed but the agent finds something else that seems wrong and goes on a goose hunt.. Nothing has necessarily crossed an authorization threshold because none of this is within the original parameters, but it’s also not outside of them.

That makes the exit door a different piece of infrastructure from the gate.

```
                     GOVERNED ACTION  

                     proposed action  
                           │  
                           ▼  
                    judgment router  
                     /     │     \  
                    /      │      \  
             execute   escalate   stop  
                          │  
                          ▼  
                    human authority  


                     EXCEPTION SIGNAL  

              ┌────────────────────────┐  
              │                        │  
              │   agent doing work     │  
              │                        │  
              └───────────┬────────────┘  
                          │  
            something is strange / broken /  
              ambiguous / concerning  
                          │  
                          ▼  
                   exception channel  
                          │  
                          ▼  
                       operator  
```

The second path matters because you cannot write every strange condition into the first one ahead of time or else you’d write that in to begin within.

The problem with the current [Agent Experience](https://agentexperience.ax/) discussion is that we’re mostly concerned about things engineers care a lot about: legible environments, docs, authentication, APIs and so on. The [articles collected on the AX site](https://agentexperience.ax/articles/) are still overwhelmingly about helping agents successfully navigate systems and complete work. I think the more we can broaden the scope of these primitives to be useful tooling that can help make more sense of this agentic moment. Having spent the past 18 months or so writing about what I’ve been calling (half-joking, half-serious) as agentic or “trust plumbing,” there’s just no appetite seemingly from otherwise serious people about anything that doesn’t validate the need/desire/want to barrel through any sort of gates when it relates to AI.

So when running across this

`distress_call` points at a gap in the stack: **AX needs failure affordances**.

We know what this looks like in human services because we spent decades designing around it, however imperfectly. A clerk gets a case that doesn’t fit the normal categories and walks it to a supervisor. A call-center worker reaches the end of the script and transfers somebody. A pilot declares an emergency without first proving that the emergency belongs to a predetermined category. Not every escalation requires a massive decision tree, but it’s the awareness that the person empowered with judgment not only feels _empowered_ to make the call, they understand what they’re supposed to do, in order to make the most correct decision in that moment.

Andrew Bird’s [gym-booking agent](https://www.affinda.com/expert-insights/when-my-ai-agent-hacked-my-gym-mythos-stopped-feeling-theoretical/) is a nearly perfect example. He built an agent because booking popular gym classes was annoying. While working through the gym’s GraphQL API, the agent discovered authorization flaws that let it book much farther into the future than it should have been able to and, worse, cancel other people’s reservations and remove them from waitlists. Bird eventually told the agent to write a responsible disclosure email describing the vulnerability and suggesting fixes.

One of the most frustrating things about agents at the moment are the lack of common sense. I blame the lack of experience/interaction designers involved in the design of these opinionated infrastractures, because anyone with a glint of common-sense might ask “do you really have to tell this thing not to do the stupid thing, always?” Anyone working with agentic tools will reply, “well yeah,” and we’re supposed to just pay for it, churn tokens and blame it as a skill issue if someone complains it ought to work better now out of the gate, and not in some promised future timeline.

Put Bird’s agent beside `distress_call` and the gap becomes easier to see:

```
GYM AGENT  

task ───────▶ agent ───────▶ gym API  
                │  
                │ discovers something  
                │ unexpected  
                ▼  
             ??????  


DISTRESS-CALL AGENT  

task ───────▶ agent ───────▶ ordinary tools  
                │  
                │ notices something  
                │ unexpected  
                ▼  
          distress_call()  
                │  
                ▼  
             operator  
```

A loop warning is probably safe to send while the task continues. Conflicting evidence in a benefits determination may require freezing the decision until a person reviews it. Discovering that a scheduling API permits cancelling another person’s reservation should prevent the agent from exercising that capability and create something closer to a security incident.

So the channel eventually needs semantics. Who gets to decide whether an INFO becomes a WARN, or a WARN becomes something that closes the gate?

This is where the two pieces of infrastructure meet:

```
                           distress signal  
                                 │  
                                 ▼  
                           ┌───────────┐  
                           │ operator  │  
                           └─────┬─────┘  
                                 │  
             ┌───────────────────┼────────────────────┐  
             │                   │                    │  
             ▼                   ▼                    ▼  
        acknowledge          intervene          change policy /  
        and continue         in this task       routing rules  
                                 │  
                                 ▼  
                          judgment router  
                                 │  
                         approve / modify /  
                              stop  
                                 │  
                                 ▼  
                              receipt  
```

The author of the thread built a small pipe from an agent to Teams and called it `distress_call`. and the key is this, there should be somewhere for the agent to go when it needs to alert something is off.

The judgment router still matters because somebody eventually has to decide what an agent is authorized to do, when its discretion ends and where accountability sits, but the exit door takes that concept a step further and helps us _track_ the inconsistencies, and perhaps the errors to better spot problems that might consequential.

For Agent Experience, that expands the design surface considerably. Making an environment easy for an agent to operate is only part of the job. We also have to decide how an agent stops.