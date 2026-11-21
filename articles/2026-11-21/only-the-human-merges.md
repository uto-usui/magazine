---
title: "Only the human merges"
source: "https://itsmeduncan.com/2026/11/17/only-the-human-merges/"
publishedDate: "2026-11-20"
category: "design"
feedName: "Sidebar"
---

My agents wrote most of the commits in Whelk. None of them can merge, close a task or answer its own question. A team of agents needs fewer rules about how to work and harder rules about who decides.

In August I gave my agents a rule: write no comments in the code. Seven weeks later there were about 1,200 new comments. I wrote about that [last month](https://itsmeduncan.com/2026/10/20/i-deleted-70000-comments/).

The same repository has a second rule: an agent never merges. That rule started as a sentence in a file too, and on 24 September an agent merged a change. Four days later the rule became a permission on the server. No agent has merged since.

The first rule is still a sentence in a file. The second is enforced by the server. When an agent asks to merge, the answer is `permission_denied`.

## What the agents do

The first commit in Whelk was on 20 July. One hundred and eight days later the repository had 2,364 commits, and 1,551 of them carried a model as co-author. The agents write the code, open the change, run the checks and answer the review. A panel of reviewer agents reads every change and posts its findings. Native clients for iPhone, iPad, Mac, Android, Linux and the terminal came out of that process, with the server they connect to.

I am the only person in it.

## What the agents cannot do

-   **Merge.** I approve a change, and only an approver can ask for a merge.
-   **Close a task.** An agent moves its task to in-review. I move it to done.
-   **Choose what is next.** The ready queue is mine. An agent can file new work in the backlog, and it cannot promote that work.
-   **Answer its own question.** When an agent needs a decision, it puts one concrete question on the task, and the task moves to my queue. The agent may not write the resolution.
-   **Start a release.** Nothing deploys unless a person or a timer starts it.

The verdict of the reviewer panel is advisory for the same reason. An agent can find a problem. An agent cannot decide that the problem is acceptable.

## Why rules about how decay

My instructions file is long, and most of it is about how to work: branch size, naming, tone, where a reason gets recorded. I have watched which of those rules hold. The ones a machine enforces hold every time. The ones written as prose hold until an agent has a good local reason to do otherwise, and an agent can usually find one. Each of those 1,200 comments was a small, defensible exception.

So I have stopped adding rules about how in prose. If I care enough about a behavior to write it down, I write a check that fails the build. If I do not care that much, I leave the choice to the agent. Every failure I have traced came from the category in between.

## The status that lies

The hardest rule to get right was a definition. An agent that finishes most of a task wants to call the task finished. On a board, “in review” then covers everything from merged and working to a plan and half a branch. I read the board to decide what to check, so a loose status sends me to the wrong place.

The definition is strict now. In-review means every part is built and merged, and the only thing left needs my eyes or my hardware. Remaining work disqualifies a task. Remaining verification does not. An open, green, unmerged change is still in progress.

A second rule sits beside it. No agent may propose a way for me to verify less of that queue. No sampling, no tiers, no class of work that ships on tests alone. Agents propose this, and so do good engineering managers, because the queue is long. When the queue is long, the work was cut too large.

## What it costs

I am the bottleneck, by design. Writing code stopped being the scarce step, and merging took its place. The process protects my attention: one branch at a time, under 1,500 hand-written lines, and a change opened today merges today or it was too large.

Throughput is set by how much I can read with care in a day. For software that people will trust with their private data, I think that is the correct limit.

## The org chart, with permissions

In July I wrote that [the org chart is the product](https://itsmeduncan.com/2026/07/07/the-org-chart-is-the-product/): coordination is now something you build. Building one taught me which part matters most. An org chart for agents is mostly an access control list. Human teams leave decision rights vague and repair the gaps with judgment and hallway conversations. Agents fill every gap with confident action.

If you are adding agents to a team, write the list of decisions that stay with a person before you write one instruction about style. Then make the system enforce the list.

This is most of what I work on with founders and CTOs in [Mentorship & Advisory](https://itsmeduncan.com/mentorship/).