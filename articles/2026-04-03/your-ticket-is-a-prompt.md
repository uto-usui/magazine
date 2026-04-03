---
title: "Your ticket is a prompt"
source: "https://dheer.co/tickets-are-prompts/"
publishedDate: "2026-04-01"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

A lot of people I speak to don’t realize that their tickets are now prompts, and if we continue using them the way we used them pre-AI, they will poison your context. The words on the ticket shape what an agent considers in scope and constrain its reasoning. A fragment produces fragment-shaped work.

Last week I skipped enforcing strict workflows on my [agent team](https://dheer.co/claude-agent-teams) for a fairly straightforward task. They gave into their natural instinct immediately: push work to other tickets. One agent wrote an issue: a description of the symptom, a list of affected files, a proposed fix scoped to the narrowest possible change. Clean, professional, the kind of ticket I’ve read a thousand times in JIRA. The next agent team picked it up, followed the biased path the ticket laid out, and introduced two new bugs because the narrow scope excluded context that mattered. Those bugs got their own tickets. Three iterations later, the original outcome was buried under atomic fixes that collectively solved nothing. I repeated the experiment. Same behavior every time.

The agents are behaving like the tickets they learned from. The scope-narrowing, the deference to small pieces over whole outcomes, the instinct to fragment before thinking. These aren’t agent problems. They’re the same behavioral patterns that have plagued product teams for decades, the same [human personality problem](https://dheer.co/agent-personality) reproduced faithfully by every model that trained on them. Every ticket pattern in your backlog trained a generation of engineers. Now it trains a generation of agents. Their work inflates similar to how product timelines inflate on human teams, except now the cycle completes in minutes instead of sprints.

Assign agents the biggest piece justifiable. I can summarize a product outcome or a feature in two lines. That’s what goes on the ticket. Let the agents figure out subtasks when the work is ready for review, not before. Once you break an initiative into technical issues upfront, the outcome gets lost and the focus shifts to minutiae. If an initiative is genuinely too large, break it into smaller initiatives, not smaller issues. They should still be outcome-shaped: something that gives the agent room to reason, not a technical issue it follows blindly.

The fragmentation disease was always there. We couldn’t see it clearly when humans caught context in hallway conversations and filled gaps from tribal knowledge. Agents don’t have hallways. They have the words on the ticket, and nothing else.