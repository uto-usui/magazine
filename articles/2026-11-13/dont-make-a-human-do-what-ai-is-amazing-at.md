---
title: "Don’t make a human do what AI is amazing at"
source: "https://www.johnnunemaker.com/dont-make-a-human-do-what-ai-is-amazing-at/"
publishedDate: "2026-11-11"
category: "design"
feedName: "Sidebar"
---

October 29, 2026 · [ai](https://www.johnnunemaker.com/topics/ai/), [programming](https://www.johnnunemaker.com/topics/programming/)

Last weekend we were camping. Fall break. Glorious northern Indiana weather. My kids were fishing with grandpa, so I went for a walk around the campground (to check out the other rigs as dads do). Somewhere along the way I opened [T3](https://t3.codes/) and told Nunebot to do another run. Merge, merge, merge, run it again, merge, merge. Just getting some exercise and enjoying the fall weather.

Between Saturday and Sunday I merged 113 pull requests. Definitely the most in a two day span in the two decades I’ve been doing this.

I know how that sounds. But I honestly like this more than games, mindless scrolling, or Instagram. It’s relaxing for me. Read a PR, it makes sense, merge. Little dopamine hit. Next.

I’ve explained Nunebot to a handful of people now, and every time I think, why am I not writing this down? So here it is. When I lay it all out, it sounds stupidly obvious. But a couple of the details took me a while to figure out, and those are the parts that make it work.

## What Nunebot Is

Nunebot is [a prompt](https://gist.github.com/jnunemaker/e421523d2508716450d41a5d785e48ce). That’s it. It’s a markdown file in a private git repo I call brain. I tell an agent to read it and run it, and it makes a pass over my repos in priority order. For each repo it:

1.  Tends the PRs it opened on earlier runs.
2.  Gathers context.
3.  Picks one change that’s an obvious yes.
4.  Builds it in its own worktree.
5.  Runs [`/simplify`](https://code.claude.com/docs/en/commands) on it, then [`/qa`](https://github.com/garrytan/gstack/tree/main/qa), and finally [`/codex review`](https://github.com/garrytan/gstack/tree/main/codex) (with a few rounds of fixes at most).
6.  Proves it works.
7.  Opens a PR labeled `nunebot` and gets CI green.
8.  Writes down what it did in brain.

It never merges, deploys, or changes anything in production (yet). I merge. Most of my apps deploy on merge, so that’s the whole job for me for these types of changes.

Why the name? I needed something, and Nunebot is funny.

## Why I Built It

The goal is [kaizen](https://en.wikipedia.org/wiki/Kaizen). Small improvements to every app, all the time, without me ever doing the tedious stuff AI is better at anyway. Three things drove it.

**The tedium.** I’m not trying to get it to build all my features. What I want is to never update a dependency again. I want to never fix a [Honeybadger](https://www.honeybadger.io/) error by copying it into an agent and saying “fix this” (or by using their great MCP).

I don’t want to remember to run a GEO audit, an SEO audit, or a security audit. My teammates and I were doing all of this chore work by hand across [Box Out](https://boxoutsports.com/), [Fireside](https://fireside.fm/), [Flipper](https://flippercloud.io/), and [Flare](https://flare.am/). I want all of it to run all the time and just pop up PRs. And I just say yep, yep, yep, yep, yep. Then it goes again.

**Getting better without me.** None of these PRs moves the needle on its own. That’s exactly why they never got done. But all together? Performance problems get fixed faster. Security holes get closed faster. Customers are happier because things just work. The marketing keeps getting better whether I’m paying attention or not. The prompt opens with the framing I care about most:

> Software is not a factory. A factory builds identical widgets to a fixed spec and is done. Software changes every day: customers, scale, and requirements shift, so a perfect up-front spec never exists. Treat each repo like a painting you come back to: make one deliberate improvement per pass, and leave it better than you found it.

**Letting AI do what it’s great at.** AI is amazing at a tight, focused, 40 line change with a test that proves it. It’s a lot less amazing at 3,000 line PRs. I know because I kept making them. I’d keep looping review and fix, trying to get to zero findings. Sometimes it never got there. It just kept finding things, the code kept getting more complicated, and pretty soon I had a 3,000 line PR that **made my stomach hurt** and **I was afraid to merge**. I never want to be there again. So the whole thing is designed around small.

## Step One: Give It All the Context

Nunebot can’t do much if it can’t see what I see. So the first thing is MCPs for everything that tells me what’s happening in production: [Honeybadger](https://www.honeybadger.io/) for errors, [Flare](https://flare.am/) for performance, [PlanetScale](https://planetscale.com/) query insights, [Crisp](https://crisp.chat/), [Help Scout](https://www.helpscout.com/), and [Jelly](https://letsjelly.com/) for support across the apps, plus [Cloudflare](https://www.cloudflare.com/) for costs, the [Linode CLI](https://github.com/linode/linode-cli) for the servers behind my personal stuff and Fireside, and the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) for Box Out and Flipper Cloud (for now).

The second thing is knowing what I care about. That’s brain. It’s a private repo full of markdown: a short **Now** list, ranked priorities, a file per project, an inbox for random ideas, a list of things only I can do, and a folder for Nunebot. It’s unstructured and wildly inefficient. [Justin Searls](https://justin.searls.co/) told me I should use SQLite with Litestream so all my computers share the same database, and he’s probably right. But I already had the repo, agents already know how to commit, and it works. I’ll get this tuned and swap out the component later.

Brain is the part that matters most. Nunebot reads it first, and if brain has anything for a repo that a PR can solve or move forward, it works on that, even when something else looks easier or more interesting.

## Step Two: Decide What to Do

The repos are in priority order. Revenue first: Box Out (it makes the most) and Paint (Box Out’s renderer), then Flipper Cloud, [Flipper](https://github.com/flippercloud/flipper), Flipper Pro, and the Flare repos, then Fireside. Garrett is primary on Fireside, so I just do little things there when I have extra tokens. Then everything else: [Pitch In Now](https://pitchin.now/), [PreachIndex](https://preachindex.com/), [HTTParty](https://github.com/jnunemaker/httparty), [South Bend Watch Co](https://southbendwatch.co/), [workspace](https://github.com/jnunemaker/workspace), this site, and so on.

When brain has nothing for a repo, it looks everywhere else:

-   **Cheap stuff, every run.** The repo’s `docs/backlog` (markdown files of things we want to do, with the research and context ready for when we pull the trigger, like a fleshed-out GitHub issue that lives in the repo), GitHub issues, support conversations, Honeybadger, metrics, and a quick dead code scan.
-   **Saved findings.** Every audit’s results land in brain, one file per repo (`nunebot/findings/<repo>.md`). Whatever [gstack](https://github.com/garrytan/gstack)’s [`/cso`](https://github.com/garrytan/gstack/tree/main/cso), Cloudflare’s [`security-audit`](https://github.com/cloudflare/security-audit-skill) skill, [`/geo-audit`](https://github.com/zubair-trabzada/geo-seo-claude), or a cost or dead code review turned up, numbered and marked open, PR’d, merged, or rejected. The next run picks from them without redoing the audit. Like, “the last `/cso` run found all this stuff and we haven’t fixed the P1s. Let’s fix those.”
-   **Expensive audits, only when the backlog is thin.** Security (alternating `/cso` and `security-audit`), `/geo-audit` for SEO and AI search, a cost review, or a dead code review. Whichever is most overdue.

Then it picks one thing. This is the part that keeps it small:

> The bar is **an obvious yes from me**: a PR I’d merge after a quick read. Either the work is genuinely small, or it’s a small next chunk that is complete and useful on its own. Never part 1 of 20: no scaffolding, half-built features, or setup that only pays off in later PRs.

It has to be real (evidence it matters), valuable, reviewable in minutes, and provable. And if nothing clears the bar? _“Skip the repo and explain why. No PR beats a weak PR.”_

The cool thing is I’ve watched it break bigger tasks into smaller ones on its own. It doesn’t want to make a big diff, so it figures out the first piece it can get to production.

**Subtracting, not just adding.** If you run all of this and never delete code, you end up with a lot of code. The best code is no code. So every pass includes a quick dead code scan, and the prompt tells it to keep a mix. If a repo’s recent Nunebot PRs have all been additions, a solid removal wins a close call. Unused methods, routes, CSS, JS, gems, packages. Doesn’t matter. 46 of the 250 merged PRs deleted more than they added.

It doesn’t always get it right. It opened a 2,248 line Fireside PR removing marketing controllers and views I’d unrouted in a cutover. I closed it: “Not ready to do this. It was automated by nunebot. I think we leave for when we resurrect them.”

## Taste

That brings me to taste. Every time I close a PR, ask a question, or say no, it goes into `nunebot/taste.md`. After that Fireside PR, it wrote itself a rule called “Unrouted isn’t always dead”: code I recently unrouted on purpose is parked, not dead.

At one point an agent suggested I rename Flare, since there’s already another Flare out there. Nope. Now there’s a rule: “I’m not renaming Flare, I love the name.”

My favorite one came from a Flipper Cloud security fix. Before merging, I asked what it would do to performance and whether it was mostly additive, meaning it checks more things but won’t break anything existing and legit. Now every PR has a **Performance & compatibility** section that answers both before I ask.

There are 107 of these rules after 11 days. I’ll need to compact them into the prompt at some point. Live and learn.

## Step Three: Build It, Shave It, Try to Break It

This is my current build, and it’s the part I’m most excited about:

1.  **Build.** Opus 5.5 writes the change and a test that fails on main, in its own worktree with its own ports and databases. Commit.
2.  **`/simplify`.** It’s built into Claude Code, and it usually shaves off a good amount of the crappy AI code. Commit.
3.  **`/qa`.** This one’s from [gstack](https://github.com/garrytan/gstack). It actually uses the thing. If it’s a CLI, it runs the CLI. If it’s an API, it curls it. If it’s in a browser, it clicks through it. After this, I know the code works. Commit the fixes.
4.  **`/codex review`.** Also gstack. Codex does an adversarial review and fixes anything legit. Then, and this is the trick, it runs `/codex review` again on **just the fixes**, not the whole change. At most three rounds. If Codex is still finding stuff after that, it gives up on that repo, leaves the branch pushed, writes the findings in brain, and moves on.

Reviewing just the fixes is the biggest thing I figured out in October. Before, I’d run a full review, fix, full review, fix, chasing zero findings. Claude especially would go 20 loops finding nits on repeat. That’s how I got the 3,000 line stomach-ache PRs. Now: the code is written, it’s been shaved down, we know it works, and we’ve looked for holes. Ship it.

Here’s one. On [workspace#21](https://github.com/jnunemaker/workspace/pull/21), round one caught a test stub using Ruby 3 syntax that macOS’s system Ruby 2.6 can’t parse. Fixed. Round two, on just the fix: clean.

One gotcha. gstack is invasive. Mention deploying and it’ll decide to run its whole [`/ship`](https://github.com/garrytan/gstack/tree/main/ship) workflow, rerun all your tests, and redo a bunch of work you already did. It’s built for people who aren’t paying attention, and here, the prompt already is. So my global agent instructions say:

> Do not automatically invoke, load, or follow any skill. Only use a skill when I explicitly name it in the current request. The presence of an applicable installed skill is not permission to use it.

Nunebot names each skill explicitly, in order. And since nobody’s watching the run, the prompt says that when a skill stops to ask a question, take the recommended option and note it in the PR.

## Step Four: Prove It

I never sat down and designed a PR template. I told it what I care about from a verification standpoint, and it built the PR body so I gain confidence as I read down. Why. What changed. Proof. Performance and compatibility. Review. Risk and rollback.

[![The top of a merged Nunebot PR on Flipper, labeled nunebot. It reads Why, then What changed, then Proof: the new spec fails on main and passes on the branch, the whole UI suite fails 71 times under LC\_ALL=C on main and passes on the branch, and a gem built from the branch renders where released 1.4.2 raises.](https://www.johnnunemaker.com/images/2026/10/nunebot-pr-proof.png)](https://github.com/flippercloud/flipper/pull/1075)

The top of [flipper#1075](https://github.com/flippercloud/flipper/pull/1075). Why, what changed, then proof.

Proof is the part I care about. [Thorsten Ball](https://thorstenball.com/) from [Amp](https://ampcode.com/) has been talking about asking for irrefutable proof, and it’s so good. Tell Claude to give you irrefutable proof and it will. If it can’t, it tells you why and gives you everything up to that point. (I’ve talked about [prove it](https://www.johnnunemaker.com/yagni-camping-chair-development/) [before](https://www.johnnunemaker.com/the-friday-deploy/). I’m still on it.) Every Nunebot PR needs whichever of these apply:

-   A test that fails on main and passes on the branch, with both outputs.
-   The full suite and linters green.
-   The change seen running: the app, a console session, a script.
-   Before and after screenshots when a person would see the change.
-   Before and after numbers for anything that claims to be faster or cheaper.
-   For removals, the searches and signals proving nothing uses the code.

Here’s a real one. On South Bend Watch Co, any request that blew up returned a bare 500 in production, even when Rails wanted a friendly 422. The root cause was an old Honeybadger patching a Rails method with two arguments after Rails 7.1 started passing three. The fix was a gem bump plus one test. The proof:

```
Request                                    main   branch
POST /users/sign_in with no token           500      422
POST /users/sign_in, wrong password         200      200
GET /, /watches, /about                     200      200
GET /no-such-page                           404      404
```

I didn’t ask for that table. I just said I want proof.

Or this one on PreachIndex. Thousands of passage pages all shared the same generic meta description. Now Romans 8:28’s says it’s cited specifically in 26 sermons and within a wider passage in 89. One new helper, one test, 27 lines. Everything’s tested. You can see it works. Why not merge it?

A few public ones if you want to see a whole PR: [flipper#1077](https://github.com/flippercloud/flipper/pull/1077) (quiets bogus warnings that hit your logs right when a Cloud sync fails), [workspace#20](https://github.com/jnunemaker/workspace/pull/20) (a pure deletion, with proof nothing uses it), and [httparty#869](https://github.com/jnunemaker/httparty/pull/869).

A few other things it does:

-   **Steps for me go at the top.** If a PR needs something from me, it gets a `needs-john` label and a checklist up top. When it added a unique index on lowercased emails in Fireside, the first step was to check production for duplicates. I know that. I also could have easily missed it.
-   **Rollback.** If anything is risky, it tells me how to roll back. Really helpful when you aren’t reading the code and something goes sideways.
-   **Screenshots, attached.** At first it wanted to commit screenshots to a branch. I said I’m pretty sure GitHub has an attach method now. “Oh yes, they do.” Now they’re just in the PR. Most of the time when it says it can’t do something, I say “false,” and it finds a way. It always does.

I got about 20 PRs in and stopped reading the code. **I started merging after reading the body.** Whoa! I like woke up and realized what I was doing. It was a new level of trust. I’ve always read the models and queries, even when I skipped the views. But the proof is that good, and I’ve built this way all October.

## Step Five: Let It Rip

The very first prompt was literally “read this prompt and run it for Flipper Cloud.” It made a PR. Yep, merge. Do it for Box Out. Merge. Do it for Fireside. Merge. Do all three. Merge, merge, merge. Do every repo I’ve committed to in the last year. It’s now opened PRs in 20 repos.

At first it went one repo at a time, so I asked how it would speed things up. Run things in parallel, obviously. But two worktrees of the same heavy app at once isn’t great, and the Box Out suite alone uses about half my CPUs. So it suggested lanes. A heavy lane for the big Rails apps and a light lane for gems and small apps, running side by side. Now it’s nine lanes, three heavy and six light. Each lane gets its own ports, every database gets a worktree suffix, and even the gstack browser gets its own daemon.

I also didn’t want a bajillion PRs sitting open and overwhelming me. So I asked what Dependabot does. It caps open PRs at five. Cool, let’s do five. If a repo already has five Nunebot PRs open, that run skips it.

And the prompt itself? I never wrote it. I opened [Wispr Flow](https://wisprflow.ai/) and brain dumped. Here’s how I’m building software right now. Here’s where I keep my priorities. Here’s some other random stuff. Then I gave that to Claude and said turn this into a prompt I can rerun from a scheduled task. I ran it on one repo at a time and gave it feedback each time until it was putting out stuff I liked. **Then I let it rip.**

I hadn’t even read the whole thing until I walked [a friend](https://ryanwood.com/) through it this week. I don’t care. I care about the result. Since it lives in brain and gets reread every run, any session I’m in can “add this to the Nunebot prompt,” and it gets a little stronger. It’s 229 lines now, and it’s changed in 19 commits since October 18th.

About day two, Garrett called me. He’s on every repo I’m on. “What are you doing? I need to understand what you’re doing.” He said at first he figured these couldn’t be OK. Then he looked at them, and they were awesome. So I gave him [the prompt](https://gist.github.com/jnunemaker/e421523d2508716450d41a5d785e48ce), and he had his agent compare it to his own skills to see what he was missing.

## Guardrails

I started it locked down and I’ve given it more as it earned trust, just like a person. The rules:

-   Read-only on production and every third-party service. Most of that is read-only access. The Linode and Heroku CLIs can make changes, so there it’s the prompt telling it not to.
-   No AWS CLI and no AWS credentials.
-   Never probe or exploit anything in production. Prove security fixes with tests and local runs.
-   Never message customers, reply to tickets, or close issues.
-   Never merge, deploy, or flip feature flags.
-   Infrastructure cost cuts are recommendations in brain. It never applies them.
-   In public repos like HTTParty, never describe a vulnerability in a PR, commit, or branch name. Brain only, and I handle it.

## The Numbers

Here’s every PR labeled `nunebot` from the first one on October 18th through today:

-   **269 opened** across 20 repos. **250 merged**, 16 open, and 3 closed without merging.
-   **+14,328 / −6,107 lines** across the merged PRs.
-   **The median merged PR changed 43 lines.** 190 of the 250 were under 100 lines, 234 were under 200, and only 3 went over 500. The biggest was an npm security bump on this site, and it’s 2,360 lines of `package-lock.json`.
-   **2.7 hours** median from opened to merged.
-   **Biggest day: Sunday, October 25th** (sitting in a camping chair). 63 opened, 63 merged.

Now my GitHub contributions graph. For 16 years, 2009 through 2024, I averaged about 1,650 contributions a year. That’s 4.5 a day.

On December 14th, 2025 I turned on a 20x Claude plan to try Opus 4.5. December 14th through March, I averaged 18 a day. That’s 4x. April through July, I dropped back to 5 a day. April and May were prep for a two month summer camping trip, and June and July we were on the road from Indiana to Oregon, Washington, and Montana. Basically, when my kids are out of school, my throughput drops, and I’m ok with that. August and September were back to 18 a day. The first half of October was 31 a day. Since Nunebot started, it’s been 117 a day.

GitHub contributions per dayAverage contributions a day: 4.5 for 2009 to 2024, 18.2 from Dec 14 2025 to March 2026, 5.1 from April to July 2026, 18.4 for August and September, 31.2 for October 1 to 17, and 117.3 from October 18 to 29 with Nunebot.2009–2024: 4.5 a day2009–20244.5Dec 14 ’25 – Mar ’26: 18.2 a dayDec 14 ’25 – Mar ’2618.2Apr – Jul ’26: 5.1 a dayApr – Jul ’265.1Aug – Sep ’26: 18.4 a dayAug – Sep ’2618.4Oct 1–17: 31.2 a dayOct 1–1731.2Oct 18–29 (Nunebot): 117.3 a dayOct 18–29 (Nunebot)117.3

Average GitHub contributions per day.

October 19th through 25th, I had 1,113 contributions in seven days. That’s more than I had in all of 2018 or 2019, and about two-thirds of an average year. **That Sunday hit 287 in one day. Before this year, my biggest day ever was 70.**

Contributions are a goofy metric. Nunebot commits after every step, so every PR counts several times. **Don’t read this as 25x the value. Read it as: the chores are getting done, and I’m not the one doing them.**

## What’s Next

Right now Nunebot picks whatever it thinks is best. Where I want to go is three stages:

1.  **Find work.** Security audits, GEO and marketing audits, errors, and performance checks run on a regular basis and just add tasks.
2.  **Prioritize.** Rank the tasks by impact: the odds we get hacked, revenue, or a customer having a problem we’d like them to not have.
3.  **Build and prove.** Everything you just read.

I’d say yes, yes, yes, yes to the work at stage two. And once I’ve said yes, I honestly don’t think I need to see the PR. I know that’s a weird thing to say, but the process has been pumping out such good code that my confidence is way up.

I also need a Nunebot GitHub app. Right now it asks questions as me, and then I answer them, also as me. It’s really funny.

The question I ask about every run is simple: **did I get a small chunk of code that made my app better, without me being involved?** That’s all I want.

And lately the answer is yes about 250 times over.