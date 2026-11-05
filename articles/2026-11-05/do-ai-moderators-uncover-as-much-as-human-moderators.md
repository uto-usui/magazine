---
title: "Do AI Moderators Uncover as Much as Human Moderators?"
source: "https://measuringu.com/do-participants-provide-the-same-depth-of-insight-to-human-and-ai-moderators/"
publishedDate: "2026-11-04"
category: "ux-research"
feedName: "MeasuringU"
author: "Jeff Sauro, PhD • Eva Sundberg, MPH • Lucas Plabst, PhD • Jim Lewis, PhD"
---

[![Feature image showing 6 question cards](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMDAgMTY5Jz48L3N2Zz4=)](https://measuringu.com/wp-content/uploads/2026/11/110326-FeatureImage1-scaled.jpg)Can we really replace human moderators with AI?

That seemed like a crazy idea just a few months ago, but technology has improved almost as fast as the overhyped marketing promises of AI would have us believe.

To understand how well AI can moderate, we need to compare its performance to humans. There’s [surprisingly little data](https://measuringu.com/effectiveness-of-ai-moderators-a-literature-review) actually comparing AI to human performance.

So, we did what we do at MeasuringU and collected data to help answer some questions:

-   Do participants say less to AI than to human moderators?
-   Do participants provide the same depth of insights to AI and human moderators?
-   Does AI moderate as competently as a human?
-   Do participants want to talk to AI moderators?
-   Do findings generalize across models or prompts?

We built an AI moderator and tested it in a randomized controlled trial (20 participants).

Our [first analysis](https://measuringu.com/do-participants-say-less-to-ai-than-to-human-moderators/) revealed that participants said little to our AI moderator. AI-moderated sessions were 37% shorter, and participants spoke 45% fewer words per minute (54 vs. 98).

Of course, speaking more isn’t necessarily better. If an AI moderator draws out the same insights in fewer words, the shorter sessions might not matter. So, the next question is: **do participants provide the same depth of insight to AI and human moderators?** We’ll assess that in two articles using two approaches: overlap in themes uncovered (this article) and uncovering of known facts about participants (the next in this series).

## Experimental Study Setup

We built our AI moderator on Gemini 3 Flash, with photorealistic avatars and voices of two MeasuringU researchers, who also ran the human sessions. It consisted of several agents working in sequence, each covering a broad topic and handing a summary to the next, so it seemed like one fluid conversation to participants.

Twenty Denver-area participants were randomly assigned to a human or AI moderator, crossed with moderator gender (a 2 × 2 design with five per cell). They sat in our Denver lab while the moderators connected via video from the other side of the one-way mirror. Gender skewed slightly more male, and attitude toward AI (Enthusiast, Neutral, Skeptic) was reasonably balanced across conditions.

We simulated a discovery study for a fictitious company developing a product to help with waking up and sleep management. The goal was to find current frustrations with wake-up methods and potential new product opportunities. Notably, this isn’t summarizing answers to survey questions across many interviews, as in Anthropic’s [interviewer study](https://www.anthropic.com/research/anthropic-interviewer). Instead, it was a more realistic in-depth interview common in exploratory UX research. We started with a script and probes, then coded themes to derive insights.

Moderators worked from a discussion guide with five prompts (see Table 1 and the full guide in the Appendix). Both human and AI moderators were told to probe beyond the guide whenever it served the research goals.

Prompt

What it asked

Serves

Sleep schedule

“When do you usually go to sleep and wake up?”

Context

Wake-up method

“How do you make sure you’ll wake up at the time you intend to?” “Does it ever fail?”

Frustrations

Sleeping arrangement

“Do you sleep alone, or does anyone else sleep in the same room?”

Context

Current experience

“What do you like?” “What problems or difficulties?” “What workarounds or backup solutions?”

Frustrations

Ideal wake-up

“What would be your ideal way to be woken up in the morning?”

Opportunities

**Table 1:** The five discussion guide prompts used by both human and AI moderators.

## How We Identified Themes

Two MeasuringU researchers who didn’t moderate any sessions (Coders A and B) read all 20 transcripts and coded them independently, without a predetermined list of themes. Their approaches differed; Coder A grouped findings into five broad themes with eleven sub-themes, while Coder B listed 24 specific codes without grouping them. These different coding schemes made matching codes a bit more difficult, but such differences are typical in applied UX research (emphasizing external over internal validity). The coders weren’t told which sessions were AI-moderated, but the blinding was thinly veiled, as both coders suggested they could often tell which were AI.

For example, in response to the wake-up method prompt (“How do you make sure you’ll wake up at the time you intend to?”), one participant in an AI session said they don’t set an alarm on non-work days: “I don’t set an alarm on my non-work days, but my dog wakes me up.” Both coders tagged this participant under a pets label: “pets as primary and secondary alarm systems” (Coder A) and “woken up by pets in the morning” (Coder B). A third researcher, who also didn’t conduct the interviews, split sub-themes and codes into themes. For example, the above two labels were grouped into a _sharing the bedroom_ theme.

Each theme combined several of the coders’ labels. For example, the _sharing the bedroom_ theme included the labels “woken up by pets in the morning” and “partner has different sleep schedule.” A session counted as having the theme if the participant got either one.

Finally, we also had Claude check the session codings and themes. Since we earlier reported that [ChatGPT coded themes in open-ended comments about as well as humans did](https://measuringu.com/chatgpt-vs-humans-for-coding-open-ended-responses-three-years-later/), we felt it was a good test. Claude’s job was to look at the eight themes and to check if evidence for those themes appeared in each of the 20 transcripts. Claude was a check on the human coding. It could also tell the condition and had seen the human coders’ tallies by condition. So, in effect, there were three coders—two independent human coders and one AI coder.

## Study Results

Eight themes came out of the coders’ work (see Table 2), with seven uncovered by both AI and human moderators. The most common, averaging the AI and human columns, were _body clock vs. daily schedule_ and _sharing the bedroom_ (90% of sessions), followed by _alarms_ (80%), _times are ranges_ (73%), and the _bedroom as a sleep-and-wake tool_ (68%). The least common were the _dream wake-up_ (62%) and _gadgets tried and dropped_ (38%). All between-group comparisons of percentages were analyzed with [_N−_1 Two-Proportion tests](https://measuringu.com/what-is-the-n-1-two-proportion-test/).

### Coder Agreement Was Fair to Moderate

We measured agreement in two steps. First, we checked how many themes the coders found on their own. Each human coder identified seven themes, with six in common and two that were different (one different per coder), making a total of eight themes for the Claude AI coder to review. For the six themes common across human coders, we checked how often each coder judged the theme present in each of the 20 sessions, which gave us 120 judgments per pair. The two human coders agreed on 87 of the 120 (73%), either both marking a theme present or both marking it absent. As examples of Claude reviewing the themes, Claude and Coder A both found _sleep climate_ (more on that theme below) in eight sessions, and both found it absent in ten, agreeing on 18 of 20 (90%). For the dream wake-up, they agreed on only 8 of 20 (40%).

Second, we measured chance-corrected agreement with [Cohen’s kappa](https://measuringu.com/assessing-interrater-reliability-in-ux-research/) (_κ_) because percent agreement can be inflated when nearly every session has a theme (_κ_ = 0 is no better than chance, 1 is perfect). The human coders’ 73% converts to a kappa of .38, fair agreement. Claude agreed with Coder A on 74% of judgments (_κ_ = .40) and with Coder B on 80% (_κ_ = .44, moderate agreement). The level is lower than the substantial _κ_ of about .70 we found for short survey comments in our earlier analysis but is expected given the less constrained exercise of open themes.

#### Human moderators had the edge

Human sessions contained seven of the eight themes more often than AI (by 7 to 73 points on average across coders), whereas AI was higher on only one theme (Alarms by 7). Only one theme gap, sleep climate, was statistically significant for all three coders (_p_ < .01). Per session, human sessions averaged 6.9 of the eight themes vs. 5.0 for AI sessions in Claude’s coding (_p_ = .004), and the human coders showed the same direction (4.7 vs. 3.4 of seven themes, _p_ = .03; 5.6 vs. 4.6, _p_ = .06).

#

Theme

AI (of 10)

Human (of 10)

AI %

Human %

Gap (pts)

A

B

Claude

A

B

Claude

1

Body clock vs. daily schedule

8

8

10

8

10

10

87%

93%

+7

2

Sharing the bedroom

7

10

9

9

10

9

87%

93%

+7

3

Alarms: tolerated, not liked

7

10

8

6

8

9

83%

77%

−7

4

Times are ranges, not exact

n/a

6

7

n/a

7

9

65%

80%

+15

5

Bedroom as a sleep-and-wake tool

4

7

5

9

7

9

53%

83%

+30

6

The dream wake-up

5

5

7

3

8

9

57%

67%

+10

7

Gadgets tried and dropped

3

n/a

3

4

n/a

5

30%

45%

+15

8

Sleep climate

0

0

1

8

6

9

3%

77%

+73

**Table 2:** Sessions with each theme (of 10 per condition) by coder (A and B are the human coders). % averages the coders who have the theme. Gap = Human % − AI %. Theme 8 (Sleep climate) is defined differently by each coder: A’s includes noise, B’s is temperature only, and Claude’s is temperature or noise.

In our [previous article](https://measuringu.com/do-participants-say-less-to-ai-than-to-human-moderators/), we found that the participants’ share of talking when interviewed by humans was 64%, but when interviewed by the AIs, the share was 34%—about half as much. In other words, the AI moderators reached most of the same themes with much less talk, but not quite as often.

### Sleep Climate: A Key Theme Uncovered by Human Moderators

Of course, not all themes are created equal, so a simple count of themes may be masking part of the story. Most of the themes were derived from the topics in the discussion guide, and both AI and human moderators asked about them. However, the guide never prompted moderators to ask about the sleeping environment. Despite that, the human moderators thought to dig into it, and participants had plenty to say about temperature and noise. Sleep climate bears directly on the study goal of finding new product opportunities. Participants were already improvising with temperature to sleep and wake, indicated by comments to human moderators like:

-   “I have a bed jet… it blows out warm or cold air… We’ll put that on in the morning, too.”
-   “With the sun coming up, then the temperature can kind of come back up.”

Sleep climate appeared in six to nine of ten human-moderated sessions, depending on the coder, and zero to one of ten AI sessions, a gap that was significant for all three coders. The one AI session Claude flagged is borderline, because Claude looked for this theme and the human coders didn’t. Both coders created the category on their own, before any comparison by condition (a sub-theme for Coder A, a single code for Coder B), but we split it out as an eighth theme after seeing it differ by condition, so treat it as exploratory.

#### Human moderators went a little off script

In the nine human sessions that had it, moderators asked at least one environment question that wasn’t in the guide. In four, they opened the topic: “how about, like, the temperature in your room?” (CD), “do you have blinds closed?” (BO), “have you tried white noise?” (DF), “anything about the temperature?” (FT). In the other five, participants raised the topic, and the moderator followed up. The AI asked about the room in three sessions, but only as a hypothetical within the ideal wake-up question: “…other things in your room—like lights, temperature, or even smells…” (AI, CP). The participant answered with the smell of coffee. Human moderators asked about the current room and got concrete behaviors. The AI asked a hypothetical and got little.

### How Hard Was This Test of AI Moderators?

Our discussion guide did a pretty good job of providing the discussion points. Five of the eight themes map directly to a prompt and a sixth partly, so both moderators asked about them. That makes the theme comparison a fairly easy task. It mostly measures whether a moderator covers the script, and the AI did that well.

#

Theme

In the guide?

AI %

Human %

Gap (pts)

1

Body clock vs. daily schedule

Yes

87%

93%

+7

2

Sharing the bedroom

Yes

87%

93%

+7

3

Alarms: tolerated, not liked

Yes

83%

77%

−7

6

The dream wake-up

Yes

57%

67%

+10

4

Times are ranges, not exact

Yes

65%

80%

+15

7

Gadgets tried and dropped

Partly

30%

45%

+15

5

Bedroom as a sleep-and-wake tool

No

53%

83%

+30

8

Sleep climate

No

3%

77%

+73

**Table 3:** Gap (Human % − AI %) by whether the guide covered the topic, ordered by the gap between presences in human-moderated versus AI-moderated sessions.

For the six guided themes, AI-moderated sessions averaged about 8 points lower than human sessions. For the two the guide didn’t cover, the gaps were 30 and 73 points. The takeaway is practical: **write a good script.** If the guide spells out the topics, an AI moderator does a decent job, though not quite as good as a human. Of course, discovery research exists because you don’t know every question in advance to add to the script. A harder test is whether moderators surface details participants shared on a screener that the guide never asks about, which we’ll cover in our next article in this series.

## Summary and Discussion

The results of a randomized controlled trial with 20 participants randomly assigned to an AI or human moderator using the same study script and probing instructions were:

**Two human coders working separately found eight themes with modest agreement.** Two researchers coded all 20 transcripts independently, a third human researcher grouped their labels into themes, and Claude checked each session for those themes (acting as a third coder). The human coders found six themes in common, two separately. Agreement on whether a theme appeared in a session was fair to moderate (_κ_ = .38 to .44).

**AI did a reasonable job of probing, but human moderators did better.** Human sessions contained seven of the eight themes more often than AI sessions. AI sessions averaged 5.0 of the eight themes vs. 6.9 for human sessions (_p_ = .004 in Claude’s coding, with the same direction from the human coders). AI reached the other seven themes with about half as many participant words.

**Humans uncovered a major theme that AI missed.** A theme we called Sleep Climate appeared in six to nine of ten human sessions vs. zero to one of ten AI sessions (_p_ < .01 for every coder). The discussion guide never prompted the moderators to ask about the sleeping environment, but human moderators went a little off script and did. In response, participants reported concrete behaviors that were directly related to the stated goal of finding new product opportunities, so it’s not a trivial miss for the AI moderators.

**A good script closes most of the gap.** Where the guide covered a topic, AI and human sessions were close in the frequency of themes (about 8 points apart). Where the topics weren’t covered (especially for sleep climate/temperature), human moderators pulled ahead by 30 and 73 points.

**Limitations and future research:** This is only one study using one study script and our AI moderators, so more replication is needed. However, this randomized study design provides a much-needed data point in comparing AI performance to human performance. The findings suggest a human moderator’s value lies not in covering the planned questions, which the AI did well, but in the unplanned question a curious moderator adds mid-interview. Writing those questions into the guide is easy, but you can’t prescribe every possible scenario ahead of time. If you could, you wouldn’t need exploratory research or an in-depth interview. We haven’t tested whether adding such questions to the guide closes the gap. In our next article in this series, as a measure of effectiveness, we’ll look at how well AI and human moderators uncover facts about participants that were never revealed to them.

## Appendix

### Discussion Guide

**Sleep schedule.** Tell me a bit about your sleep schedule. When do you usually go to sleep and wake up? _Probe if needed:_ Do you wake up at the same time every day, or do you wake up at different times depending on the day?

**Wake-up method.** How do you make sure you’ll wake up at the time you intend to? _(Most likely they will mention some kind of alarm clock, app, or device.)_ What is it, how does it work, and does it ever fail? _(If they say someone else wakes them up)_ How do they wake you up? Are there ever any days when they aren’t available to wake you? What do you do to wake up on time on those days? _(If they previously mentioned they wake up at a different time on different days)_ Since you wake up at a different time depending on the day, what do you do to make sure you’ll wake up when you want to each day?

**Sleeping arrangement.** Do you sleep alone, or does anyone else sleep in the same room with you? _(If they share a room)_ Do they wake up at the same time you do? _(If no)_ How do you make sure each of you wakes up on time without disturbing the other?

**Current experience.** How has your experience been so far using your current wake-up method? What do you like about using it to wake up? What problems or difficulties have you experienced? What workarounds or backup solutions have you used after running into those problems?

**Ideal wake-up.** What would be your ideal way to be woken up in the morning?

### Moderator Probing Guide

1.  **Goal:** Cover all required probe areas and uncover deeper insights related to the research goals.
2.  **Required probe areas** must be addressed (non-negotiable, regardless of time). Adapt phrasing based on context. If already mentioned, confirm or dig deeper rather than re-asking. If not yet covered, ask directly but naturally.
3.  **When to move on from a thread:** You’ve exhausted it (the participant is repeating themselves or has nothing more to add), the participant explicitly says they don’t know or has nothing more to add, or it’s a minor detail that doesn’t advance research understanding.
4.  **Balance:** Cover all required probes and follow valuable tangents related to research goals. Don’t chase irrelevant details or go too in-depth on minor details.

### All Eight Themes with Examples

Initials are participant codes. Theme numbers match Table 2.

1.  **Body clock vs. daily schedule.** People wake on their own, but obligations decide when they must be up.
    -   “Probably 9 out of every 10 times I wake up before the alarm anyway.” _(Human, GE)_
    -   “To wake up whenever I want.” Later: “I’m the type of person that does need structure.” _(AI, CP)_

2.  **Sharing the bedroom.** Partners and pets constrain the routine and sometimes act as the alarm.
    -   “I don’t set an alarm on my non-workdays, but my dog wakes me up.” _(AI, EW)_
    -   “I kinda ninjaed my way out of there.” _(Human, HK)_

3.  **Alarms: tolerated, not liked.** Phone alarms are jarring, easy to dismiss by accident, or unreliable.
    -   “I hate the alarm going off. It’s usually a very startling and uncomfortable way to wake up.” _(Human, FT)_
    -   “I just have three different alarms, and I set them all manually.” _(AI, LB)_

4.  **Times are ranges, not exact.** Bedtime and wake time are windows, not points.
    -   “Between, like, 10 and 11 PM… that’s kind of usually the window that I go to sleep and wake up.” _(Human, BO)_
    -   “Wake up between six forty-five and seven thirty.” _(AI, RG)_

5.  **The bedroom as a sleep-and-wake tool.** People manage light, noise, and temperature.
    -   “We keep one blind open in our bedroom, and we face west. So there’s a lot of sunlight.” _(AI, RG)_
    -   “My wife and I prefer, like, dead silence.” _(Human, BO)_

6.  **The dream wake-up.** Asked to imagine anything, people describe waking gradually.
    -   “Something with that would say your name. My name.” _(AI, VO)_
    -   “To have it just really slowly ramp up in volume would be really nice, but, I mean, painfully slowly.” _(Human, FT)_

7.  **Gadgets tried and dropped.** Trackers, smart lights, and apps get abandoned for the phone.
    -   “It was a change that I abandoned after it not working for me.” _(AI, BF)_
    -   “The noise it made was probably the scariest accidental thing I’ve ever turned on, and that promptly got thrown away.” _(Human, DF)_

8.  **Sleep climate.** People control temperature and noise to sleep and wake. More examples:
    -   “The heat will come on. And warm up the room so that it’s not so cold when you get in to take a shower.” _(Human, CD)_
    -   “Would temperature or maybe even light play a role in how you’re woken up?” _(AI, NM)_. The participant said, “I don’t know about temperature, though.”

### Claude’s Coding Rubric

Claude marked a theme present in a session when the participant met the criterion below. Calls were flagged as high-confidence or borderline in the workbook.

#

Theme

Counted as present when the participant…

1

Body clock vs. daily schedule

Says they wake naturally or before the alarm or prefer natural waking, OR says obligations (work, plans, next-day activities) set their wake time or alarm use.

2

Sharing the bedroom

Another person’s or pet’s schedule or needs measurably affects wake-up, alarm use, or routine. Sleeping alone with no effect does not count.

3

Alarms: tolerated, not liked

Uses an alarm AND reports friction (failure, accidental dismissal, jarring sound, backups or workarounds, dislike). Using an alarm with no friction does not count.

4

Times are ranges, not exact

Gives bedtime or wake time as a range, or says it varies, rather than a fixed time.

5

Bedroom as a sleep-and-wake tool

Describes actual current management or cueing by light, noise, or temperature (blinds, mask, fan, earplugs, thermostat, sun waking them). An ideal-only mention does not count.

6

The dream wake-up

Describes a gradual or gentle wake via light, sound, smell, or temperature rather than an abrupt alarm.

7

Gadgets tried and dropped

Tried a product, app, or method and dropped it for friction or lost interest.

8

Sleep climate

Describes temperature or noise control for sleeping (heating, cooling, fans, white noise, earplugs, silence).