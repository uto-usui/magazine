---
title: "Closing the verification loop"
source: "https://thinkroom.kieranklaassen.com/d/njrS5TJhis"
publishedDate: "2026-07-08"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

_How a branch proves itself ready: browser reality, persona eyes, and fixes that carry their own evidence._

## 1\. The loop that must close

Agents made building cheap. The cost moved: the expensive question is no longer "can we ship this?" but "does anyone actually know it works?" A branch that compiles, passes review, and merges can still greet its first real user with a form that validates the wrong field and an email that links to the wrong thread.

The verification loop is the distance between a claim and its proof:

changelandsclaim:it worksexercise itas a userobserve whathappensfix what'sbrokenprove itwith a testre-verifyreadythe loop: a failed re-verify goes back to exercising

Most teams close this loop with humans: someone clicks around before the demo, someone eyeballs staging. That works until agents outrun the humans, which is what the agents were for. Compound engineering (CE, a plugin of skills for coding agents like Claude Code) answers that the loop itself is work an agent can do, end to end, with people pulled in where judgment belongs to them, and where the tooling genuinely cannot reach. The skill that embodies this is `/ce-dogfood`, and the rest of this piece walks through how it closes the loop, and the persona strategy that gives it eyes.

## 2\. Dogfood in one pass

`/ce-dogfood` acts as a QA engineer who dogfoods the active branch: understand every change, test every change in a real browser as a user would, and fix what breaks, autonomously, until the branch is ready. Two constraints define it:

-   **Diff-scoped, never whole-app.** It tests what this branch changed versus the trunk, and it refuses to run on the trunk itself: no diff, nothing to dogfood.
    
-   **A real browser, one tool.** All automation goes through the `agent-browser` CLI, a shell tool that drives the browser directly (a Rust binary, not a wrapper, not an MCP server): no exceptions.
    

The workflow is seven phases with a loop in the middle:

0 Scope1 Analyze2 Flows +matrix3 Serve4 Execute5 Fix loop6 Reportevery fix re-runs its scenario

A few phase details that carry the philosophy:

-   **Scope** pins the identity of the ref under test, so the diff is cut against the right base (a PR stays a PR; a fork's head can literally be named `main`), and offers worktree isolation via `ce-worktree` when testing someone else's ref, so your checkout is never disturbed.
    
-   **Serve** is hands-off by design: detect the port (explicit flag, then project instructions, then `package.json`, then `.env`, then 3000), reuse a running server or start one, poll until it accepts connections. It does not stop to ask permission to start a dev server.
    
-   **Everything is resumable.** The matrix (the scenario checklist phase 2 produces) lives twice: as a live task list in the session, and as a report document on disk at `docs/dogfood-reports/<date>-<branch>-dogfood.md`, created the moment the matrix exists and updated after every scenario and every fix. Kill the session mid-run and the report is the checkpoint a later run (or a teammate) resumes from.
    

`ce-dogfood` is also deliberately an orchestrator, not a soloist: root-causing a weird failure delegates to `ce-debug`, commits go through `ce-commit`, reusable lessons go to `ce-compound`.

## 3\. Flows before matrix: the email rule

The most common way automated QA lies to you is by testing pages instead of journeys. Every page renders; the feature is still broken, because the breakage lives between the pages.

So dogfood forbids jumping to a checklist. Phase 2 first maps every user-visible change as an explicit flow: entry point, each action, every branch (validation error, empty state, permission denied), every side effect, and the true end state. Only then does the matrix get derived, by walking each flow and turning every node and branch into scenarios.

user opens /threadsclicks Replyform valid?inline validation errorreply savedUI scrolls to new replyemail sent to participantsrecipient clicks email linkRIGHT thread, scrolledto the RIGHT reply?noyes

The canonical example is the email rule, aimed at exactly the wrong-thread email from the opening: "an email sends" is not a pass. Right recipient? Does the click-through land on the right thread and scroll to the right message? Does the content read sensibly? The flow map must carry the journey past the send.

The matrix then covers both halves of quality, per the skill's test-matrix taxonomy: functional checks (forms validate, links go where they claim, data round-trips, `agent-browser errors` stays clean, permission boundaries hold), the edge, error, and empty states, and experiential checks, which need a different kind of judge.

## 4\. Two judges: does it work, and does it feel right

Functional truth comes from the browser. Experiential truth needs eyes, and this is where the first kind of persona enters: the **product persona**. Phase 1 looks for who the product is actually for (`STRATEGY.md`'s "Who it's for", `VISION.md`, persona docs) and captures the one to three primary personas and what each cares about. If none exist, it infers one from the product and the diff, and says so in the report; the disclosure is the mitigation for judging against your own guess. No persona at all is worse: that is how you get software that works and pleases nobody.

Every scenario then gets judged twice: once as a tester driving the browser, once as each persona re-reading the same run. The second pass is a change of eyes, not a second drive. The persona walk hunts **paper cuts**: friction too small to fail a functional test but real enough to degrade the experience. A confusing label. An extra click. A jump the eye doesn't expect. Copy that doesn't match how that persona thinks. Each paper cut gets recorded with who feels it and how badly.

feels rightworksPass + smooth:ship itPass + paper cuts:log them all, fix the sharp onesFails but looks nice:fix loopFails and feels wrong:fix loop, maybe escalate

Quality is not a boolean, and the routing rule has teeth: a scenario can be functionally `Pass` and still carry paper cuts, and a **sharp** paper cut, one severe enough to fix now, enters the fix loop exactly like a failure.

Note where each verdict comes from, though. The functional one is an instrument reading; the browser does not care what the agent hoped. The experiential one comes from the same agent, in the same session, grading a walk it imagined. Two judges, one head.

## 5\. The fix loop and its governor

When something fails, the naive autonomous move is to fix everything. The dangerous autonomous move is also to fix everything. Dogfood's fix loop has a governor: **judge the size of the fix before touching code.**

scenario fails, or sharp paper cutsmall, well-understood,low-risk?investigate root cause(ce-debug if murky)apply the fixregression test:red before, green aftercommit: one logical fixre-run scenario\+ adjacent journeys record what's broken,options + trade-offs, recommendationBlocked: human decisionyesno

Auto-fix territory is narrow on purpose: a clear bug, an obvious correct fix, a few files, no schema or architecture or product trade-off. Everything else gets escalated, not attempted; the report's "Decisions for a human" section receives what's broken, the options with trade-offs, and a recommendation.

The auto-fix path pays for its autonomy up front:

-   **Every fix ships with a regression test designed to fail before and pass after.** When a test is genuinely meaningless (a copy tweak, a spacing fix), the report must say why, and a documented browser-replay stands in. Hollow tests invented to satisfy the step are explicitly banned.
    
-   **One logical fix per commit**, so the history reads as a sequence of provable claims.
    
-   **Re-run the scenario, then re-test adjacent journeys.** Fixes regress neighbors; the loop assumes so.
    
-   Two states are terminal for the loop because they wait on people: `Blocked (human decision)` from the governor, and `Blocked (needs human verify)` from external legs the browser can't drive alone (OAuth, real email delivery, payments). The second is the email rule hitting its own wall: the flow's decisive legs, real delivery and the real inbox click-through, live outside localhost reality (dev server, dev data, dev email adapter), and the loop verifies the branch, not production. A Blocked row there is the point; the alternative is a pass the browser never saw.
    

One caveat, made once: this is the design contract, not a post-mortem. The skill orders the red run but does not archive it; the trail records that red was claimed, not a capture of it.

The exit gate: before declaring the branch ready, run the whole automated suite. **A green matrix with a red suite is not "ready."**

Red blocks even when the red looks flaky; the gate is conservative by design. Ready, stated affirmatively: a green matrix, a green suite, a report carrying a commit and a test for every fix, and a "Decisions for a human" section that is empty or explicitly handed off. All of it is slower than a smoke test. That is the trade.

## 6\. The persona strategy: seeded specialists, not standing agents

By the end of the fix loop, one head has done everything: mapped the flows, driven the browser, written the fixes, declared them fixed. The second kind of persona is architectural, and it is the plugin's answer to that concentration: the same pattern that powers every CE skill that fans out work, **specialist prompt assets**. The plugin ships zero standalone agents. When a skill needs a specialist (a reviewer lens, a research scout, a profiler), it keeps a persona file inside its own directory (`references/agents/`, `references/personas/`) and seeds a _generic_ subagent with that file's contents at dispatch time.

orchestrating skill(SKILL.md owns dispatchpolicy + model tiers)generic subagent seeded assecurity lens \[session model\]generic subagent seeded asmaintainability lens \[mid tier\]generic subagent seeded asrecap scout \[cheap tier\]persona file + diff +JSON schema + tiercompact JSON findingsback to the merge

Why this shape instead of registered agents:

Choice

What it buys

Persona lives in the skill's own directory

Skills stay self-contained; the converter can ship them to any harness as one unit

Generic subagent, seeded at dispatch

Each run reads the current persona from disk; no stale registration, no cache surprises (harnesses load registered agents once, at session start)

Model tier chosen by the caller, never the persona

Extraction work runs cheap, judgment work runs on the session model (the same top-tier model the user's session runs on); cost policy lives in one place

Structured output contract per dispatch

Findings merge mechanically: dedup, cross-reviewer promotion, confidence gates

The deeper principle is **independence budgeting**. A finding is only as trustworthy as the independence of whoever confirmed it. So the code-review skill's reviewer stack (`ce-code-review`) treats sameness as a defect: the orchestrator's own quick read (the fast pass) is capped at low confidence and can never corroborate anything, because it shares the session model's blind spots, and an agent agreeing with itself is one vote, not two; two personas agreeing promotes a finding one confidence step; per-finding validators get fresh context and no stake in the original claim; and the adversarial pass can shell out to a different model family entirely. Dogfood spends the same budget at the product level, unevenly and on purpose. The browser's independence is physical; it cannot be talked into agreeing. The persona walk's is simulated; it is a second lens, not a second judge, the same mind re-reading its own run. Dogfood buys independence in its instruments, not in its judgments; for the judgments, it buys a trail someone else can check.

## 7\. One loop, every altitude

Dogfood is the most visible verification loop because it drives a browser, but it is one rung on a ladder that the pipeline climbs for every feature:

regression test: red before, green afterfull suite: the neighbors still passindependent review: quoted lines + fresh validatorsbehavioral evals: fresh-context dispatch for prose skillsdogfood: a real browser walks the real flowsCI watch: lfg repairs, capped at three attemptsresiduals made durable: PR body, issues, reportsaltitude

Each rung has the same grammar, claim plus independent proof, at a different altitude. The bottom two rungs are section 5's story; the others each add something new:

-   `ce-work` refuses to call a unit complete without **verification evidence**, captured by whoever witnessed it: the red observed before a fix cannot be reconstructed from the diff afterward.
    
-   `ce-code-review` refuses high confidence without a quoted line (`file:line`) that makes the finding true; survivors still face fresh-context validators.
    
-   Prose skills (the skills themselves are markdown) get behavioral evals: fresh subagents run the scenario against the current text, because a skill invoked in its authoring session tests the stale cached copy.
    
-   `lfg`, the end-to-end ship pipeline, watches CI and repairs, but stops after three attempts and writes the residue into the PR body instead of looping forever.
    
-   And whatever no loop could close becomes a durable residual: a `Blocked (human decision)` row, a filed issue, a report section. The loop never closes silently on an open question; it closes by making the question impossible to lose.
    

Autonomous verification is not agents being confident; it is agents being **auditable**, down to the commit SHA per scenario in a dogfood report. The loop is closed when the proof is durable, and a human can walk in at any point, read the trail, and take over exactly where their judgment is needed.

* * *

_Grounded in the live repo, July 2026: `skills/ce-dogfood/` (workflow, fix-loop governor, report template), its test-matrix taxonomy, the specialist-prompt-asset conventions in `AGENTS.md`, and the review and evidence contracts of `ce-code-review`, `ce-work`, and `lfg`._