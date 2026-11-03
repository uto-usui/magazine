---
title: "Using AI To Find Usability Problems: Examining Task Failure"
source: "https://measuringu.com/using-ai-to-find-usability-problems-examining-task-failure/"
publishedDate: "2026-10-07"
category: "ux-research"
feedName: "MeasuringU"
author: "Jim Lewis, PhD • Jeff Sauro, PhD"
---

[![Feature image](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAzMDAgMTY5Jz48L3N2Zz4=)](https://measuringu.com/wp-content/uploads/2026/10/100626-FeatureImage1.jpg)Can AI replace UX researchers? Well, UX researchers do a lot (they certainly do at MeasuringU).

We’ve seen that AI can do lower-level assistant work reasonably well (e.g., [coding comments](https://www.measuringu.com/chatgpt-vs-humans-for-coding-open-ended-responses-three-years-later)). But when it comes to high-level “analyst” tasks like discovering usability problems, we’ve seen mixed results so far.

There is a lot of literature on the [challenges of consistently and effectively discovering usability problems](https://www.tandfonline.com/doi/abs/10.1080/01449290600959062). And that’s for humans! We need a similar thorough analysis when comparing AI to human performance. So, we’re doing that, [one video](https://measuringu.com/can-ai-detect-usability-problems/) at a time.

So far, we’ve reviewed two videos. Each has a participant attempting a task. In one, a participant successfully [made a dinner reservation](https://measuringu.com/does-ai-find-real-ui-problems-or-just-hallucinations/) with OpenTable. In the second video, a different participant successfully [booked a dog grooming session](https://measuringu.com/does-ai-find-real-usability-problems-a-replication/) with PetSmart.

To identify lists of human-identified usability problems, we had four researchers independently review the first video and one researcher review the second video. We then had ChatGPT and Gemini analyze the same videos to identify usability problems.

We found similar results with both videos. Most metrics comparing the overlap of usability problems were within ten percentage points of each other (e.g., 40% vs. 45% of human-identified problems found by AI). The one real divergence was in the type of AI-only errors: the PetSmart video had more false alarms (60% vs. 35%) but zero hallucinations (compared to three in the OpenTable case study).

In both case studies, participants encountered some usability issues but were ultimately successful. In this article, we extend the scope of the case studies to a PetSmart video in which the respondent was ultimately unsuccessful.

## Experimental Design: One Human Researcher, Two AIs, One Video

Repeating our method from the previous case study, one UX researcher with decades of experience reviewed a similar video from a previous usability benchmark study of online pet websites multiple times, creating a timeline of key events and a list of observed usability problems for this participant (referred to as Participant B in this article; see Appendix A for the details of the timeline).

The characteristics the new video shared with the first one were:

-   A similar task (steps toward booking a specified appointment)
-   A different outcome (the user experienced several usability problems and was ultimately unsuccessful)

Using the same prompt each time, we ran the video four times through the same two AIs used in the previous case study (ChatGPT-5.4 Thinking and Gemini 3 Flash Thinking).

In this study, we held constant the key elements of the prompt and the AI versions/settings (all variables that we eventually plan to vary). This time, as in the first two case studies, we only varied the type of analyst: human, ChatGPT, and Gemini.

### The Task

During a usability benchmark study MeasuringU conducted in 2019, participants used the PetSmart website to start the process of booking a grooming appointment in Glendale, CO, for a bath and full haircut for a one-year-old English Springer Spaniel. The task was successfully completed if the participant found that specific grooming option and reported the listed price of $61. For the step-by-step details of the “happy” path to complete this task, see Appendix B.

### The Prompt

The prompt we used for this study was:

_During a usability test, the facilitator must keep track of participant behaviors as they navigate through tasks on a website, mobile app, software program, etc. We’d like you to watch a video of a usability test where participants were asked to book a grooming reservation for their dog. As you’re watching, please look for problems the participant has while attempting to complete the task. For example, you can document the path users take, describe issues they encounter as well as what on the website might be causing problems. The task has been successfully completed if the participant finds the target service (“Bath & Full Haircut” which costs $61; not “Bath & Full Haircut with FURminator” which costs $74). If you understand these instructions, let me know and I’ll drag the video in for you to review. Are you ready for the video?_

## Major Findings

A total of 17 unique usability problems were identified by the AIs and the human researcher.

Usability problems aren’t like observing a visual defect in a product. They require judgment, so it’s worth digging into what these problems are, because such judgments are at the crux of how AI may or may not be able to effectively emulate UX researchers (for now). So, let’s follow this path to task failure.

Participant B started on the correct path by clicking Pet Services, then Grooming Salon. Then things rapidly went downhill.

Figure 1 shows a particularly problematic sequence of events that caused numerous downstream usability problems due to a critical latency issue.

**a: The pet type (cat/dog) buttons were slow to appear, so the participant selected the age dropdown.**

[![The pet type buttons are not visible as the user selects pet age.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDE0NSc+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/Image-a.png)

 **b: The age has been selected, but the pet type buttons have still not appeared.**

[![The pet age has been selected, but the pet type buttons still have not appeared.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDExNCc+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/image-b.png)

 **c: After the pet type buttons appeared, the participant selected dog, but the age selection reset without the participant noticing.**

[![User selects pet type, but this resets the pet age selection.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDExMCc+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/image-c.png)

**Figure 1:** Problematic sequence of events encountered by Participant B.

After clicking the breed dropdown, the list of breeds appeared but was long and alphabetically inconsistent (Figure 2a). Then the participant said, “Can I type it?” indicating that he didn’t want to scroll through the dropdown list but wasn’t sure if it could be filtered by typing over the word “breed.” Despite the uncertainty, he typed “english” into the field and successfully selected the target breed (Figure 2b).

**a: The breed dropdown**

[![Breed dropdown on PetSmart.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNDkgMzAwJz48L3N2Zz4=)](https://measuringu.com/wp-content/uploads/2026/10/image-2a.png)

**b. After typing “english” over “breed”**

[![Breed dropdown after typing "english."](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyODYgMzAwJz48L3N2Zz4=)](https://measuringu.com/wp-content/uploads/2026/10/Image-2b.png)

**Figure 2:** The breed dropdown (a) before filtering and (b) after filtering.

Then a cascade of problematic events associated with resetting the age selection began, including:

-   After clicking the button to “check prices and book now,” the participant was directed to select the age.
-   After re-clicking the button to “check prices and book now,” the participant was directed to select a store.
-   The participant had forgotten that the task was to book in Glendale, CO, and instead typed his location, “Houston.”
-   Once the list of grooming services appeared, the participant did not scroll down far enough to see the target service, instead incorrectly selecting the service just above the target and failing the task.

### Some Agreement Between Human and AI, Three Hallucinations, Three False Alarms

Table 1 shows the eleven problems listed by the human researcher (eight of which were also identified by the AIs) and the six additional problems reported by at least one of the AIs. We looked to see whether the problems identified only by the AIs were false alarms (an event happened but was not really a usability problem) or a hallucination (the event just didn’t happen).

Half of the six problems identified only by AIs were hallucinations, and the other half were false alarms. Hallucinations were events reported that never actually happened, and for false alarms, either the participant never actually noticed the issue flagged by the AI or wasn’t affected by it.

#

Problem description

Human

ChatGPT

Gemini

Why (if false alarm or hallucination)

**H1**

Selected age dropdown before dog button due to excessive latency for presentation of pet type

Y

\--

\--

\--

**C1**

Selected dog, then selected age

\--

N

\--

HALLUCINATION: Selected age before dog

**H2**

After selecting “dog,” age was reset

Y

Y

\--

\--

**H3**

Breed dropdown too overwhelming to attempt scrolling

Y

Y

\--

\--

**G1**

Participant had to refer to task instructions multiple times

\--

\--

N

FALSE ALARM: Usability testing artifact

**H4**

No clear affordance for typing over placeholder text “breed” to filter the dropdown

Y

\--

\--

\--

**H5**

Participant hesitated to type over “breed”

Y

\--

\--

\--

**H6**

Tried to start booking but age had been deselected

Y

Y

\--

\--

**H7**

Tried to start booking without having selected a location

Y

Y

Y

\--

**H8**

Set location to Houston instead of Glendale

Y

Y

Y

\--

**C2**

Site allowed participant to proceed with wrong store context

\--

N

\--

FALSE ALARM: Usability testing artifact

**C3**

Service menu contains highly similar service names

\--

N

\--

FALSE ALARM: True but minor issue

**H9**

Did not scroll to bottom of menu list thus missing the target service

Y

Y

Y

\--

**G2**

Participant scrolled past the correct service and landed on the more expensive "FURminator" option

\--

\--

N

HALLUCINATION: Target was never displayed

**G3**

The user clicked "show more" on the Bath & Full Haircut with FURminator, then chose it

\--

\--

N

HALLUCINATION: The participant did not click the “show more” link

**H10**

Incorrectly selected Bath & Full Haircut w/ Furminator for $74

Y

Y

Y

\--

**H11**

Task completion judged unsuccessful

Y

Y

Y

\--

**Table 1:** Summary of usability problem discovery by the human researcher and the AIs. In the # column, H indicates a problem identified by the human researcher, C indicates a problem identified by ChatGPT, and G indicates a problem identified by Gemini. In the Human, ChatGPT, and Gemini columns, Y indicates the discovery of a verified usability problem, and N indicates the reporting of a false alarm or hallucination. The full runs of ChatGPT and Gemini are shown in Appendix A.

As we did in our other studies, we ran the videos four times through the AIs (because of the [probabilistic nature of how they work](https://measuringu.com/can-ai-detect-usability-problems/)). Problems identified at least once across the four runs were counted in this analysis. We used the mean [any-2 agreement](https://measuringu.com/ai-usability-problem-analysis-of-a-video/) to assess overlap.

**_Technical note_**_**:** Our preferred method for quantifying the correspondence between two lists of usability issues is_ _any-2 agreement__. Any-2 agreement is the ratio of the intersection of the two sets divided by their union. Historically, we’ve found an any-2 agreement of 50% between human raters to be average (typical), around 25% to be low, and around 75% to be high._

### ChatGPT Agreement: 47%

The mean any-2 agreement of the four ChatGPT runs and the UX researcher was 47%. ChatGPT identified (at least once) eight of the eleven problems reported by the researcher (consistently identified five) but also produced two false alarms and one hallucination.

### Gemini Agreement: 39%

The mean any-2 agreement of the four Gemini runs and the UX researcher was 39%. Gemini identified (at least once) five of the eleven problems reported by the researcher (consistently identified four) but also produced one false alarm and two hallucinations.

The mean any-2 agreement between the four runs of the AIs was 58%. Figure 3 shows the Venn diagram for the problem discovery results for the UX researcher and the AIs (based on Table 1).

[![Venn diagram of usability problem discovery for Participant B by the human reviewer, ChatGPT, and Gemini.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA1NjUgNDI0Jz48L3N2Zz4=)](https://measuringu.com/wp-content/uploads/2026/10/Figure-3-1.png)

**Figure 3:** Venn diagram of usability problem discovery for Participant B by the human reviewer, ChatGPT, and Gemini.

The Venn diagram illustrates the relationship between the human reviewer and AI analyses of Participant B. The human reviewer identified eleven usability issues, eight of which were identified at least once by an AI. However, **three usability problems were not caught by either AI**, while **six issues the** **AIs produced were not legitimate usability problems** (three false alarms, three hallucinations). The AIs did not discover any real problems that the human reviewer failed to identify.

## Comparison with Prior Case Study Results

This is the third video we’ve analyzed using this method. The first was an [OpenTable reservation task](https://measuringu.com/does-ai-find-real-ui-problems-or-just-hallucinations/), and the second was of a different participant (A) attempting the [PetSmart grooming reservation](https://measuringu.com/does-ai-find-real-usability-problems-a-replication/). In both previous videos, the participants experienced some problems but ultimately completed the task successfully. In this new video, the participant experienced problems and was ultimately unsuccessful. Table 2 and Figure 4 show key results for the three case studies.

**Comparison**

**Participant B**

**Participant A**

**OpenTable**

**Average**

% human identified

65%

40%

45%

46%

% AI & human overlap

47%

30%

30%

34%

% AI-only identified

35%

60%

55%

50%

% AI errors (false alarms + hallucinations)

35%

60%

50%

48%

% AI false alarms

18%

60%

35%

38%

% AI hallucinations

18%

 0%

15%

11%

% AI-only discovery

 0%

 0%

 5%

 2%

Total unique problems

17

10

20

16

**Table 2:** Comparison of PetSmart Participant B (this study) with Participant A and OpenTable problem identification rates (previous studies).

[![Problem identification rates for the three videos](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMjAwIDY0MSc+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/100726-Figure4.png)

**Figure 4:** Problem identification rates for the three videos.

There are some interesting differences in the outcomes for this third video compared to the first two.

The increase in the percentage of problems identified by the human and AI/human overlap might partially be explained by the larger number of human-identified problems expected when a participant fails a task.

Most AI-only percentages were markedly smaller for Participant B relative to the first two. Analysis of both Participants A and B turned up six AI-only problems for each, all of which were AI errors, but the base (total number of problems) was larger for Participant B (17 compared to 10).

The most striking difference was the return of hallucinations. The hallucination rate for Participant B was 18%, close to the rate for the OpenTable analysis (15%) but very different from the 0% for Participant A.

Like Participant A, the AI analyses of Participant B did not turn up any valid problems that had not been observed by the human evaluator, suggesting that legitimate AI-only discovery might be very rare.

## Summary and Discussion

We compared ChatGPT and Gemini to an experienced UX researcher in identifying usability problems from a video of a participant who failed a task. We found:

**Higher AI/human overlap discovery rates.** For this video, the human discovery and AI/human overlap percentages were higher than those for the previous two case studies, possibly due to the larger number of human-discovered usability problems expected when a participant does not successfully complete a task.

**Hallucinations have not gone away.** When we published the results for Participant A, it seemed like the PetSmart task might not be prone to the generation of AI hallucinations. That is clearly not the case given the **three documented hallucinations** with Participant B in the new case study.

**AI errors continue to be a problem, indicating a need for expert human oversight.** Whether they are false alarms or hallucinations, the rate of AI errors across the three case studies is high: 35% for Participant B, 60% for Participant A, 50% for OpenTable, averaging 48%.

**Like humans, AI usability reviews of videos are prone to the “evaluator effect.”** Just like human evaluators, multiple runs of AI usability evaluations of videos are not perfectly consistent, so it’s good practice to run these evaluations multiple times for consistency checks. Running multiple evaluations and looking for consistency across runs is a practical filter before any human review.

**If an expert human is required in the loop for these analyses, the value added by AI is low.** If roughly half of the usability problems identified by AI in video review of usability test sessions are in error, thus requiring an expert human to invest time in review, **and** AI discovery of real problems missed by humans is rare, then this raises questions about the value of including AI in these types of studies (at least, with these models and prompts).

**Future research on when there are no problems found:** Our next step in this research program is to perform the same analysis on one more PetSmart video in which the user experience was different because the participant experienced no problems completing the task. How might AIs, which are [designed to please their users](https://www.science.org/doi/10.1126/science.aec8352), deal with this situation? After all, we’ve found that about [15% of a large sample of usability test tasks have 100% successful completion](https://measuringu.com/task-completion/), and we estimate about 10% of usability test tasks are completed without error. Stay tuned for those results.

## Appendix A: Detailed Timeline and Problem-by-Problem Tables

### Key Events Timeline for Participant B

Appendix Table 1 summarizes the key events in the video (compiled by the UX researcher), identifying eight problematic events deviating from the “happy” path (see Appendix B).

Event #

Timestamp

Summary of key user actions

Notes

1

0:00:15

Clicked Pet Services > Grooming Salon

2

0:00:22

Grooming form appeared without pet type buttons

3

0:00:28

Selected age (6 months or older)

4

0:00:32

Buttons appeared for dog or cat selection (delayed)

5

0:00:33

Selected dog

6

0:00:34

Age selection was reset upon selection of dog but participant didn't notice

Problematic Event

7

0:00:35

Reviewed task instructions for specified breed

8

0:00:44

Looking at breed dropdown/filter -- says, "Can I type it?"

Problematic Event

9

0:00:49

Typed "english" and selected "Springer Spaniel - English" from filter dropdown

Problematic Event

11

0:00:53

Clicked button for check prices and book now

12

0:00:54

Message appeared under age dropdown: "Please select an age"

Problematic Event

13

0:00:55

Reselected “6 months or older” from age dropdown

14

0:00:56

Clicked button for check prices and book now

15

0:00:57

Message appeared under age dropdown: "Please select a store"

Problematic Event

16

0:01:00

Clicked "select" link next to "select a store"

17

0:01:09

Did not remember target was Glendale CO so typed "houston"

Problematic Event

18

0:01:15

Grooming salon menu opened starting with Bath & Brush

19

0:01:21

Scrolled menu but stopped before seeing target service

Problematic Event

20

0:01:32

Selected Bath & Full Haircut w/ Furminator for $74

Problematic Event

**Appendix Table 1:** Timeline for Participant B.

### ChatGPT Problem-by-Problem Results

Appendix Table 2 shows the usability problems reported by ChatGPT and the UX researcher, run by run.

Prob #

Description

Run 1

Run 2

Run 3

Run 4

H1

Presentation of dog/cat buttons in grooming form was delayed long enough for participant to select age before they appeared

C1

Selected dog then selected age ((**HALLUCINATION**: Selected age before dog which caused problem noted in H2)

1

H2

After selecting "dog" the selected age was reset but participant didn't notice

1

H3

Breed filter problematic -- many breeds and inconsistent alphabetization (e.g., "English Toy Spaniel" vs "Springer Spaniel - English")

1

H4

After clicking breed dropdown it is possible to type in the field with the placeholder text "breed" but there is no clear affordance

H5

Participant not sure can filter breeds by typing

H6

Tried to start booking without having age selected

1

H7

Tried to start booking without having location selected

1

1

1

1

H8

Set location to Houston instead of Glendale

1

1

1

1

C2

The site allowed the participant to proceed with the wrong store context (**FALSE ALARM** -- true but is an artifact of the usability testing context)

1

C3

The service menu contains highly similar service names (**FALSE ALARM** -- this is true but a relatively minor issue)

1

1

1

H9

Did not scroll to bottom of menu list thus missing the target service

1

1

1

1

H10

Selected Bath & Full Haircut w/ Furminator for $74 (wrong selection)

1

1

1

1

H11

Task completion judged unsuccessful

1

1

1

1

**Appendix Table 2:** Usability problems reported by ChatGPT 5.4 Thinking and the UX researcher for Participant B.

### Gemini Problem-by-Problem Results

Appendix Table 3 shows the usability problems reported by Gemini and the UX researcher, run by run.

Prob #

Description

Run 1

Run 2

Run 3

Run 4

H1

Presentation of dog/cat buttons in grooming form was delayed long enough for participant to select age before they appeared

H2

After selecting "dog" the selected age was reset but participant didn't notice

G1

Participant had to refer to task instructions multiple times (**FALSE ALARM** -- true but is an artifact of the usability testing context)

1

1

1

H3

Breed filter problematic -- many breeds and inconsistent alphabetization (e.g., "English Toy Spaniel" vs "Springer Spaniel - English")

H4

After clicking breed dropdown it is possible to type in the field with the placeholder text "breed" but there is no clear affordance

H5

Participant not sure can filter breeds by typing

H6

Tried to start booking without having age selected due to previous reset

H7

Tried to start booking without having location selected

1

1

1

1

H8

Set location to Houston instead of Glendale (forgot task location requirement)

1

1

1

1

H9

Did not scroll to bottom of menu list thus missing the target service

1

1

1

G2

The participant scrolled past the correct service and landed on the more expensive "FURminator" option (**HALLUCINATION** -- the target service was below the FURminator choice and was never displayed)

1

G3

The user clicked "show more" on the Bath & Full Haircut with FURminator then chose it (**HALLUCINATION** -- this event never happened because there is no control labeled "Show More")

1

H10

Selected Bath & Full Haircut w/ Furminator for $74 (wrong selection)

1

1

1

1

H11

Task completion judged unsuccessful

1

1

1

1

**Table 3:** Usability problems reported by Gemini 3 Flash Thinking and the UX researcher for Participant B.

## Appendix B: The PetSmart Reservation Task

For a [UX benchmark study conducted in 2019](https://measuringu.com/ux-pets/), one of the participants’ tasks was to use the PetSmart website to start booking a grooming appointment in Glendale, CO for a one-year-old English Springer Spaniel, then stop after determining the cost of a bath and full haircut. In this section, we review the steps through the “happy path” and some speculation about possible user behaviors that would be reasonable to track to provide background knowledge for understanding the problem lists presented later.

Appendix Figure 1 shows the home page. Before continuing, ask yourself, where would you start?

[![Home page for the pet grooming task.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA4NzAgNDI3Jz48L3N2Zz4=)](https://measuringu.com/wp-content/uploads/2026/10/Appendiz-Figure-1.png)

**Appendix Figure 1:** Home page for the pet grooming task.

For this task, the best first choice is to click “pet services” from the horizontal navigation menu close to the top of the page. From here, there are two paths to grooming. Appendix Figure 2a shows the dropdown from which a user could drag the cursor down and release the button to select Grooming Salon. Appendix Figure 2b shows the pet services menu that appears after clicking “pet services” but releasing the mouse button without dragging, from which the user could click Grooming.

**Appendix Figure 2a: Click and drag path**

[![Click-and-drag path through PetSmart website.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDQzMic+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/Appendix-Figure-2a.png)

**Appendix Figure 2b: Click without dragging path**

[![Click without dragging on PetSmart website.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDQwNic+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/Appendix-Figure-2b.png)

**Appendix Figure 2**: Two paths to the grooming menu.

Appendix Figure 3 shows the grooming form. This is where users who are not in Glendale can change the location to Glendale, select dog, select the breed, select the age, then click the button to check prices.

[![PetSmart's grooming form.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDEyMic+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/Appendix-Figure-3.png)

**Appendix Figure 3**: The grooming form.

Before checking prices, users needed to select a breed and age for their dog. As shown in Appendix Figure 4, clicking breed produced a searchable breed dropdown. Appendix Figure 4a shows the initial appearance of the dropdown; Appendix Figure 4b shows its appearance after typing “english” over the placeholder text ”breed” in the combobox.

**Appendix Figure 4a: Initial appearance of the breed dropdown**

[![Appearance of breed dropdown on PetSmart website.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDI4Nic+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/Appendix-Figure-4a.png)

**Appendix Figure 4b: Appearance of the breed dropdown after typing “english” over “breed”**

[![Breed dropdown after typing "english."](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDIzMic+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/Appendix-Figure-4b.png)

**Appendix Figure 4**: The searchable breed dropdown.

For the happy path, a user should type “english” into the combobox, so one of the potential problems we anticipated was users not realizing the dropdown list could be filtered. Compounding the complexity of this step in the process is that the location of the word “English” for various breeds was inconsistent. For example, after filtering, the list in Figure 4b included English Toy Spaniel, Old English Sheepdog, and Springer Spaniel – English. That’s less of a problem after filtering but could be more problematic if scrolling through the unfiltered list.

The age dropdown, shown in Appendix Figure 5, was relatively straightforward with only two choices.

[![Pet age dropdown.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDE2OSc+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/Appendix-Figure-5.png)

**Appendix Figure 5:** The age dropdown.

With the grooming form completed, the next step is to click “check prices & book now” to get the list of grooming options shown in Appendix Figure 6. Because the target option was the last one in the list and below the fold, we anticipated that some users might select an earlier option.

**Appendix Figure 6a: Completed grooming menu and first option in Grooming Salon Menu (above the fold)**

[![Completed grooming form and first option.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDQ3Mic+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/Appendix-Figure-6a.png)

**Appendix Figure 6b: The other grooming options (below the fold; last option is the target)**

[![Grooming options below the fold.](data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAxMDI0IDQwMCc+PC9zdmc+)](https://measuringu.com/wp-content/uploads/2026/10/Appendix-Figure-6b.png)

**Appendix Figure 6:** Grooming options above and below the fold, showing the target Bath & Full Haircut for $61.