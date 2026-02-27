---
title: "If code is cheap, intent is the currency"
source: "https://zknill.io/posts/commit-message-intent/"
publishedDate: "2026-02-26"
category: "design"
feedName: "Sidebar"
---

**Apparently [writing code is cheap now](https://simonwillison.net/guides/agentic-engineering-patterns/code-is-cheap/)**. So since the barrier to producing code is gone, the intent behind the code is the most important bit. Intent is the new scarce resource, and commit messages are where that intent lives.

## Agents work in human processes

Agents are still, for now, working inside human processes. The software development lifecycle (I’m getting flashbacks to every _agile coach_ ever!) is still the same: we still have commits, pull requests, code review. We still have humans responsible for the agent’s output. But generating the code is cheaper, so the code _review_ carries more of the weight and responsibility for _good code_.

## Intent as the new currency

The code is cheap, but the intent is not. When an agent can produce hundreds of lines in minutes, and the engineer driving that agent can have fairly minimal involvement in the actual writing of the code, the intent of the change becomes the most important factor in communicating what that code is for, why it exists, and how it fits into the larger project. The commit message becomes the primary record of that intent, and the artifact that explains why a project evolved the way it did.

**“Fix stuff” in a commit message was always lazy, but there’s not really an excuse anymore.**

The difference now is that _you didn’t write it_. You’re a ‘code reviewer’ just like someone else looking at your PR. The agent wrote it based on your intent, and the agent doesn’t really have (through the code) a mechanism to communicate your intent to others.

## Code reviewing the “intent”

Simon’s definition (in the blog post linked at the top) of “good code” includes “it solves the right problem”; that’s an intent question, not a code quality question.

We should be code reviewing the intent first, before we even think about if the code is correct, or if the code is most optimal.

> Intent > Correct > Optimal

Most code review jumps straight to the end - is this code optimal? But with AI generated code, the first question becomes critical: do I understand the intent of this change? If not, nothing else matters.

## A /skill for intent-first commits

I now use a /skill that prompts the agent to discover and articulate the intent of the change. I do this in the same context window that the agent wrote the code in, and that I discussed the plan with the agent in. The agent _should_ have all the context about the intent of the change. If it doesn’t, the skill prompts the agent to ask questions to discover the intent.

**The worst kinds of commit messages are the ones that just summarize the diff.** Like the following which is just a summary of the diff, rather than an explanation of the intent:

```
1
2
3
4
```

```
Add reticulation to splines

- Reticulated the splines in splines.go
- Added 8 integration tests in tests/integration.go
```

Compare that with:

```
1
2
3
4
5
```

```
Prevent cascading failures when spline nodes disconnect

Upstream spline nodes can disconnect mid-reticulation, which causes
the downstream pipeline to stall. Reticulating the splines eagerly
on connect means we always have a valid fallback path.
```

Same diff, but now I know _why_ the change exists.

The /skill works well because it augments an existing human process using the AI’s strengths; summarising the intent info that’s already in the context window.

## A nice surprise: intent-aware commit splitting

Using this /skill over the last few weeks, I’ve seen a nice new behaviour. The agent has started recognizing when a diff contains multiple intents, and suggesting that it be split into separate commits.

The skill specifically prompts the agent to only look at staged diff when considering the intent of the change. And often it suggests splitting the staged diff into multiple different commits, each with a different intent.

## Humans are still responsible for the output

The leverage is in using the agent to capture intent while it’s fresh, and recording it into commit messages. That compounds — it helps every future human (and agent) who reads the code understand why a change exists.

_How can you review the code, if you don’t know why it’s changing?_

## Appendix - the skill prompt

```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
```

```
# Commit Message Skill

Write a Git commit message for the currently staged changes.
The intent of the change is the MOST IMPORTANT THING to include 
in the commit message.  Don't exclude other aspects of the message, 
but make sure that you include the intent.

## Steps

1. Run `git diff --cached` to inspect the staged changes
2. Run `git diff --cached --stat` for a file-level summary
3. Determine the **intent** of the change from the diff. 
   If the intent is not clear from the code alone, use AskUserQuestion 
   to ask the user to clarify the purpose of the change before writing the message.
4. Write a commit message following the format below

## Commit Message Format

`
Capitalized, short (50 chars or less) summary

More detailed explanatory text, if necessary.  Wrap it to about 72
characters or so.  In some contexts, the first line is treated as the
subject of an email and the rest of the text as the body.  The blank
line separating the summary from the body is critical (unless you omit
the body entirely); tools like rebase can get confused if you run the
two together.

Write your commit message in the imperative: "Fix bug" and not "Fixed bug"
or "Fixes bug."  This convention matches up with commit messages generated
by commands like git merge and git revert.

Further paragraphs come after blank lines.

- Bullet points are okay, too

- Typically a hyphen or asterisk is used for the bullet, followed by a
  single space, with blank lines in between, but conventions vary here

- Use a hanging indent
`

## Rules

- The summary line MUST be 50 characters or less, capitalized, imperative mood, no trailing period
- Wrap body text at 72 characters
- The body should explain **what** changed and **why**, not just restate the diff
- Keep the message concise — omit the body entirely if the summary alone is sufficient for a trivial change
- Output only the commit message text, nothing else
- Do not include a summary of how the change was tested in the commit message. 
- Do not include Co-Authored-By lines in the commit message. The commit should be attributed to the user, not the agent.
```