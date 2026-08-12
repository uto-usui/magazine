---
title: "Measuring time savings from Figma Make"
source: "https://www.figma.com/blog/measuring-time-savings-from-figma-make/"
publishedDate: "2026-08-11"
category: "design"
feedName: "Figma Blog"
---

AI tools like [Figma Make](https://www.figma.com/blog/figma-make-general-availability/)

have been shortening design cycles, handling the repetitive, mechanical work that slows teams down so they can focus on the work that matters most. Yet many teams aren't sure how much time they're actually saving, or where they're getting the biggest wins on efficiency. The Figma Data Science team set out to find the answers—but common research methods like A/B testing and causal inference couldn't account for all of AI's complexities.

Overall, design work got 20% faster and 16% easier with Figma Make. PMs saw the biggest benefits: Tasks were 23% faster and 37% easier.

So we designed a randomized controlled trial where we asked 100 participants to work through tasks with and without Figma Make. Here, we share more details about how we designed [the study](https://www.figma.com/reports/ai-time-savings-study/) and the results we uncovered.

## [Controlling for confounders](#controlling-for-confounders)

Measuring something like time savings from AI usage is tricky because of confounders: other variables that also affect how long a task takes. Job tenure, career experience, and task complexity are all examples. Each can influence how quickly someone works, regardless of AI. Most everyday statistical methods can't account for confounders like these. So without controlling for them, we can't tell how much of a productivity change is really due to AI, versus other factors at play.

### [Challenges with common methods](#challenges-with-common-methods)

When it comes to confounders, two common data science methods—online A/B testing and causal inference on data logs—have their limitations.

Imagine that we provided a test group of users with Figma Make and turned it off for another group. Then we would measure how long it takes group A to complete design tasks versus group B. But even though this theoretically randomizes for confounders, the main problem is that we can’t control the specific tasks each user is doing to make sure they’re equally complex.

**Causal inference** is a set of statistical methods used to determine whether one variable actually causes a change in another, instead of just correlating with it.

Alternatively, imagine that we wanted to look back through log data and see how much time on average users spend on design tasks when they use AI features versus when they do not. There are several causal inference methods we could use to try to determine how much AI usage drove the outcome, while controlling for confounders. But neither really works for our purposes.

Propensity score matching (PSM) is a method for estimating causal effects from observational data. For each data point (in our case, each design task in the logs), you estimate the "propensity score": the probability it would have belonged in the treatment experience (in our case, AI usage), given its observed characteristics. But this relies on _all confounders_ being included in the log data. That’s not the case for us; for instance, anonymized user IDs don’t tell us anything about someone’s subjective design experience.

Instrumental variables (IV) is a method for estimating causal effects when a confounder can't be directly measured or controlled for. To use this method, we’d need to find a new variable in the data—an "instrument"—that affects whether someone uses AI. That instrument can’t affect task speed in any other way, and it has to be unrelated to the confounders. If both of those hold, we can use the instrument to isolate a slice of AI/non-AI usage that's essentially random with respect to confounders. The problem is that there’s no valid instrument for us—nothing in the log data nudges someone toward using AI features for reasons unrelated to their design experience or task.

![Illustrated table compares online A/B tests, causal methods on observational data, and randomized control trials, listing one advantage and disadvantage of each.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIDAQf/xAAhEAACAgICAQUAAAAAAAAAAAABAwIEAAUSMSERE0Ficf/EABYBAQEBAAAAAAAAAAAAAAAAAAMCBP/EACIRAAAEBQUBAAAAAAAAAAAAAAABBBEDBTGh4QITIUFxkf/aAAwDAQACEQMRAD8A7QyrqOc4SbEMHxyHebYGttphJ718ljiBGQ6xhr9e6zKU6SjyPqfJyzNHqFLJhr1gn7HMxzCO77lhBJETUP5kJXpa8qHtTBj+4ZSqqolIjCosDvwThilMIveuwI0aZ+KeZH//2Q==)![Illustrated table compares online A/B tests, causal methods on observational data, and randomized control trials, listing one advantage and disadvantage of each.](https://cdn.sanity.io/images/599r6htc/regionalized/3ba7180ee5d497a81d831a7220c41f866bb60deb-3264x2176.jpg?w=1080&h=720&q=75&fit=max&auto=format)

### [Choosing to run a randomized control trial](#choosing-to-run-a-randomized-control-trial)

Randomized control trials (RCTs) are the gold standard for valid causal impact measurement and the approach we landed on for this study. RCTs allow us to fully control for confounders at the start of data collection through combining random assignment, standardized task design, and trial moderation:

-   Randomizing the participant population between treatment versus control ensures cofounders are divided approximately equally between the two groups.
-   Having participants complete the same tasks eliminates the impact of different task attributes on our outcome variable of time to completion.
-   Trial moderation from a trained research team mitigates further variability in the conducted work post group assignment, and protects against other potential statistical violations.

We partnered with user researchers at and outside of Figma to create and conduct an RCT to find out how much time product designers and product managers save in everyday design work with Figma Make.

We chose Make because of its popularity with Figma users and its wide range of applications. The more AI tools participants could use in the study, the more variables we’re introducing regarding what may contribute to time savings, so we wanted to limit the study to one tool.

To determine how many participants to include in the study, we used effect sizes observed in peer studies in the industry, such as the [Github Copilot RCTs](https://arxiv.org/pdf/2302.06590). Then we used that approximated effect size to perform a power analysis, which led us to our final sample size of 100 participants, with 50 product designers and 50 product managers. Power analyses determine sample sizes required to detect statistically significant effects if they do occur within the study.

We knew we would measure time savings for product designers—our power users of Make—but we were also curious about whether product managers (PMs) were saving time. We already knew from user research that Make has opened the door to design for PMs, and we wanted to better understand their experience.

## [Designing the experiment](#designing-the-experiment)

The core design of the experiment was to have treatment and control participants work through the same design tasks. The only difference between the groups was that treatment would have access to Make, while control would have no AI tool access.

When designing tasks for participants to work through, our first consideration was familiarity. We needed our tasks to be widely understood by all participants, no matter what their actual design experience was. We landed on editing social media posts.

We wanted to test a range of common design workflows in the study so we’d have multiple signals on Make’s impact across a variety of design tasks, helping us land on a more robust cumulative measure of time savings. We identified the themes of UI and appearance changes, creating new views in a base design, and adding interactability and responsiveness as key design workflows we wanted to test, creating three scenarios in total.

![Screenshots of Task 1 in the study where participants convert the starting light mode design into a dark mode version.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAcIAwX/xAAjEAACAQMDBAMAAAAAAAAAAAABAwIABAUGEUEHEiFREyNC/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAZEQEAAwEBAAAAAAAAAAAAAAABAAIRAyH/2gAMAwEAAhEDEQA/AG7kNW5eybfQXjmM+M7L2WSDSj1xaYfO6pF1qPIOsLua4yYmLOzj1xVNADYeBUqdeUJn1EujNS5Hsj5MQeKB42xyz7KTvXTaHk59inF28XLxt69lsGHaUm7niisdKW6BizslY+w/kehRSFcM2Fa4qhP/2Q==)![Screenshots of Task 1 in the study where participants convert the starting light mode design into a dark mode version.](https://cdn.sanity.io/images/599r6htc/regionalized/8bc8653bcddc30417de400df036e41bf803a1a4a-1608x812.jpg?rect=1,0,1606,812&w=528&h=267&q=75&fit=max&auto=format)

Task 1: Convert to dark mode

![Screenshots of Task 2 in the study where participants add a “Help & Support” option to a settings drop down menu. ](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFBv/EACUQAAEDAwQABwAAAAAAAAAAAAECAwQABREGEhMxFSMzQlFhcf/EABUBAQEAAAAAAAAAAAAAAAAAAAQD/8QAGREBAAMBAQAAAAAAAAAAAAAAAQACERMi/9oADAMBAAIRAxEAPwCBJs+nXkzJEnUEpt/GeMPdKpeFatOz0seKXl9pSUkA82NwHVZK7x2Tc5eWm/UPtHzVCdFjlEXLDR8kdoFH5Xx9sV2pp4JassZmMw81DuReYDytqt35RTukYzCbUQGWgORXSB9UVcEIeyLoT//Z)![Screenshots of Task 2 in the study where participants add a “Help & Support” option to a settings drop down menu. ](https://cdn.sanity.io/images/599r6htc/regionalized/c62e632116ee4a7d7abc29ea055284186bfc0905-1780x906.jpg?rect=1,0,1778,906&w=528&h=269&q=75&fit=max&auto=format)

Task 2: Add a help option to a settings menu

![Screenshots of Task 3 in the study where participants build out a comment fly up interaction within the social media post design. ](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAEDBAUGB//EACQQAAEDAwQBBQAAAAAAAAAAAAMBAgQABREGEhNCISIxMjNR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAaEQACAwEBAAAAAAAAAAAAAAABAgADERJh/9oADAMBAAIRAxEAPwChJY9LHdLkzb1JYZEzxNOiYdXO764IpuBypbo7fDVaTOUp+8gEt1mZEz7V6p+1NWOFQByIfwTqlElZBOtsey1WACqBF0zIe63vUR5GzkXG5/n2SitlpeMBLS3ARp6l6pRVQq9k/c//2Q==)![Screenshots of Task 3 in the study where participants build out a comment fly up interaction within the social media post design. ](https://cdn.sanity.io/images/599r6htc/regionalized/830a30da240bfdeecadf6e63f985a4896c996bc4-1402x710.jpg?rect=0,1,1402,709&w=528&h=267&q=75&fit=max&auto=format)

Task 3: Build a comment fly up

Finally, and most challenging of all, our study tasks needed to land in the “Goldilocks” zone of not being too easy for product designers, but also not too hard for product managers. We ran internal pilots with Figma designers and product managers to test out our tasks with live participants. We learned what was and wasn’t working in our scenarios, and we redesigned the tasks themselves three times before landing on their final versions.

## [Moderating the study](#moderating-the-study)

Our next challenge: We needed to train a team of moderators on how to run the study for 100 participants. Differences in moderation could become another confounder, so we developed a script that all moderators followed to guide participants through the study workflow in a standardized format.

But our moderators all had different levels of Figma fluency—which meant the level of guidance they could offer participants who got stuck during the study would vary. We wrote out a troubleshooting guide that moderators could reference to support participants, and revised the guide as the study went on when new issues came up.

## [The results](#the-results)

Identifying our participants, designing the experiment, and preparing for moderation unearthed complexities that required multiple iterations from the team to fix. But despite these challenges, all 100 participants successfully completed the study. We arrived at these key findings:

-   Overall, participants saw a 20% reduction in cumulative time to task completion, 16% improvement in task ease, and 15% improvement in perceived Figma usability.
-   Product managers reported consistently greater gains than product designers across all tested dimensions. The time gain back for PMs if they have Make access was 23% cumulatively across the study tasks, according to our interaction regression model. In the sum total of the experiment, a product manager using Make was almost as efficient as a product designer who didn’t use Make.
-   The final key finding is regarding which type of design tasks enable time savings gains for product designers compared to PMs. PMs reported gains on our two easiest and quickest tasks in the study, but they did not experience statistically significant improvements on the most challenging and extensive task in the study. The reverse is true for product designers: They only report stat sig task time improvements on the most challenging task, and not on the two simpler scenarios. In other words, Make promotes faster zero-to-one and complex interaction design for designers, while for PMs, it serves as more of a baseline tool to enable quick design contributions.

![Three usability metrics show a 20% decrease in time to completion, a 16% increase in task ease score, and a 15% increase in perceived Figma usability.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGBAf/xAAgEAAABgIDAQEAAAAAAAAAAAABAgMEBREABgcSIRNh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgQF/8QAHhEAAgICAgMAAAAAAAAAAAAAAQMAAhExBCEFQXH/2gAMAwEAAhEDEQA/AOytNS1ZkqRkjDX0NXcfbH9xsLSJkSqt1owxCIAJQsKAQyE1XkOQlUk3Thq2BQTUNBmjU9/kZfd38SuggVsQphL1D3zC3k1K8eqySjVM6HzUet+NdSdE+oxvph9s2GRM3ydLx0mu1bItypJGEoBWGbSvAcplBeoGD3uPKxsT/9k=)![Three usability metrics show a 20% decrease in time to completion, a 16% increase in task ease score, and a 15% increase in perceived Figma usability.](https://cdn.sanity.io/images/599r6htc/regionalized/121c4ffabf507588adc72768f9cae241dbfc636f-3264x2176.jpg?w=1080&h=720&q=75&fit=max&auto=format)

We used a combination of hypothesis testing and OLS regression modeling to analyze our results. All of the results described here are statistically significant unless noted otherwise.

Because of our study design, we can confidently say that Make _causes_ these improvements. This approach was robust against confounders and other forms of biases, and we plan to continue to use RCTs to answer top-of-mind product questions.

We’re already putting in motion additional research projects that will expand on this initial work. We’re going to run a similar RCT for the new [Figma design agent](https://www.figma.com/blog/the-figma-agent-is-here/)

, with a specific interest in how parallel agent capabilities can further amplify time savings. We also aim to explore new hypotheses focused on AI’s impact on design quality, how it unlocks multiplayer collaboration, and beyond.

[![Graphic promoting a Figma study titled “How designers and PMs save time with Figma Make,” featuring colorful abstract geometric artwork on a black background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEzElEQVR4nE2V2U9UVxzHz91m7izcgWEbhn1xYKTDUkWpsog4IyhKi1pERHYQRamYaqwIFGxaccWlWi1tlJqqJW3aWtukavrSpk+NfWzTv4CnJj5q8mnuUVIfvvl+zzn3fn/LuedcoWkaHo+H+Ph4LMvC5/ORkJAgx7a2ERcXJ9fsueTkZAl7Ttd1VFXFNE28Xq8cC5fLRW5uLmVlZZSUlFBeXk5FRYXEypUr5TgSiVBaWir16tWrWbNmDcuXL5emDoeDYDBIfn6+DCrcbjeFhYVUV1dTW1tLXV0dsVhMYuPGjRL19fVEo1HWr1/PunXrpLa5oKAAv99PZmYmeXl5MoA0DIVCrF27VppWVVVJ46UAtsmrwZa0bVpZWUlGRobMzG6bLNnpdMqUw+GwhJ3tkrZhl2Kv21nk5ORITk9PJzs7W7JlWdj7oCgKQgiE7Wo3Oy0YlA/YHEwPkp6RIaPbJdl9MgxDwn7eNlhiVVVemr00VFQNw3ThivPhshJwWfFSu71xuD0eaWa/oAjxghUFXVMxDBVdf8EOh63tNYEQpgclM4wSqUGJrEUprkQtKkMNBlBdxv+lCCGz8bo95GanUfJaFpHibMrLsli5Ip38/ATcLh0h/MmosR1o+6fQ97+HPnQEo3cIY3MULVyEYiUgNA1D10hK9FBZEWJ/fyMfTLzN+8dbmRprZfL4W+xoWUFqShxCSfSjN0Rxjgxgjg7iPLwXc6QLx/AgensvWukKVPnhu1lXU8jk2Ca+vtvLj98d4Js7I3z5+ShzV4bp7YiRFkhEKEkp6I0NOPd1Yg634xpowt2zAXOkB8fIKM5NW7FCIYpLshnsrWV+rpufpNkhFr44xMLtg9y5OUB/Vz2pKX675ABq7Va09iGM7j6cA624hlsxh7txdvWT3NJJzZ49dO5t4sBwNac/fJNb14e4N3+QO7f6ODezjamJKM1bIvj9XoRwuFCSs1ByijHKK/Ft20Pq0DhJuw/gX7+VmtY2Lnx2iRs3z9DZHaNt52qmx9u4OdfDhfNNbN5URLgohbSAfQx1hCIUDMXApZqkWKnUhJrpKB+juaifVXl1dOzaxQ8P7nL/wT3aO3ay5o0YfV1HmZ6YYaB/H8sKIjidPgzdlBeFcCtOCrUMqo1itrhLmbZ2sWBNcdEaos+3mc7Xt3Pq8EnGj31EQ0M/jbEpThz5lU8u/sOJow+J1r1HWcl2CvJW4XZbiKCaSLejgVnPINesAb73TvC75woLvlHO+HbyTvw2WnKaqSrvYOvmC4y9+wefXn7Kwvxz5q//y8z0X5w88Qu7W8dIC+QiCpRMJh19/Oyd4bE1w2/ej/nTfZv71jizvt30mBtYpucSSCylMTrFxLEnXDz9lLkrz7h38zn3v3rGt3cWObT/KpnpRYh8JYtJfYhHrss89J7lkec8jz2zzHlHGDIbqdDCxCke2afsrBqaGk4xOvyE6bFFrs0usjC/yI1Lf9PacpakxGWIVJHEDnUjxx09HDV3Shw2W2gzqyjRc4gXFrqwbxMNpzOenKxqaqtO0NRwlY62qwx2X6NlyznChe24zADCIQxSRSI5ahpZagrZaiqZajIpqg97wzShvnKWNUzT/k3kkugvIpAaJi0Qxp8QwjTTUFUH/wH1D5QimDjmGwAAAABJRU5ErkJggg==)![Graphic promoting a Figma study titled “How designers and PMs save time with Figma Make,” featuring colorful abstract geometric artwork on a black background.](https://cdn.sanity.io/images/599r6htc/regionalized/c2a0c216de0b7d8a82046b8c89cfed2d40aa6dd2-1080x1080.png?w=1080&h=1080&q=75&fit=max&auto=format)](https://www.figma.com/reports/ai-time-savings-study/)