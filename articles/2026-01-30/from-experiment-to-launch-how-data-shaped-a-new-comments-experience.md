---
title: "From experiment to launch: how data shaped a new comments experience"
source: "https://www.figma.com/blog/from-experiment-to-launch-how-data-shaped-a-new-comments-experience/"
publishedDate: "2022-01-20"
category: "design"
feedName: "Figma Blog"
---

_Over the past two months, we’ve rolled out a number of updates to comments in Figma. As always, insights about our users and how they design together informed these improvements. The data science team spearheaded experiments to learn how to encourage feedback and collaboration directly in the file. Here, Data Scientist Emily Jia shares the hypotheses, tests, and learnings that lead to this cross-functional, data-driven product launch._

Before I joined Figma last year, the data science team started thinking about re-building comments and how we might use data to improve collaboration across teams. Making data-driven product decisions means testing and validating (or debunking!) hypotheses at different levels of scale—sometimes that means iterating quickly based on user insights, and other times it’s about conducting large-scale experiments.

Now that [new and improved comments](https://www.figma.com/blog/stay-in-the-flow-with-redesigned-comments/)

are available to everyone, I’m excited to share how we got here. In this case, a series of smaller experiments ballooned into a full-fledged product launch. While this experiment was part of a larger redesign spanning product, marketing, and design, I’ll share the data science lens of bringing an updated comments experience to all of our users.

Two years ago, a working group across Figma decided to restructure the [(now-updated) Starter plan](https://www.figma.com/blog/about-figmas-new-starter-plan/)

to help new users experience the full potential of multiplayer on our free tier. As part of this workstream, my teammates Clancy and Wendy started to think about experiences in Figma that unlock collaboration. They found that although multiplayer editing is the most apparent way to design together in Figma, engaging the entire team—editors and viewers alike—is key to helping a team grow with Figma.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsTAAALEwEAmpwYAAABkElEQVQokU2PzWsTQRyG9+/Vo4J48H/wIh6KihaE0oMoWKv2oFLIIaktatHSGt1NsvOxH7ObzM7sJtl9JJsqHl7m4eXlYX6BVIqJSLiKJOMoJhYSpRRCSIQQKK3Jsow0zZjJhF8TQTiJiWOBlPLfTmtNUZQEsc4ZjC37Z5YPlxZdeuq6xvsaX9c9O+cQ2aLfvT63fI4qzOK/nd/yarUiiJRh78xx963nyUmDmLcs1x2JbZkULVnV4nzDWFc8Hjruvfe8OF9iXAd0dN32/ctBKA1PRxU3XzkeDGqm5Vby5mLJzrDh43hJvqi5lJb7xxU3Xjp2TxvSqoWuY91u03bXws0Pn586bh84doY18bzt82hUc+fQsf+1QZc1P1XFw4Hj1oFj70tD7lqaVddfFJk1xrW9NJjpnE9Xlt2TiqMLh55vBe9+VDwbWY7Hnqx0TJMFh9/tdecwtunzLfYMQ0+YNTTLNYGQilgbQlUyVYYkzUnSrOdQFcisJDcGvem04bcsmOnNLuu7iTJEqkDncxbW8gcGdgUeUYdEowAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/77dbaff6c7f9e792e1c6d3cc6f56baf984a72a08-2023x737.png?rect=1,0,2022,737&w=804&h=293&q=75&fit=max&auto=format)

Teams that collaborate in their first month are 1.75x more likely to retain and 6.5x more likely to become a customer

The working group started pondering magic moments—those experiences in Figma that spark joy and bring more people into the design process. Since editors and viewers have access to share feedback on Figma files, we predicted that comments would be the front door to better collaboration across a team. While the data validated that comments are a strong indicator of team growth and engagement, we were surprised to learn that comments weren’t widely used. Knowing that giving and receiving feedback is central to design work, we ran a series of experiments to understand why the insights from the data didn’t match the user behavior we observed.

## [Our discoverability hypothesis](#our-discoverability-hypothesis)

Previously, users entered comments mode by clicking on an icon in the upper left corner of the Figma editor. A series of research sessions showed that, though comments provided value, users were struggling to find it within the product.

To confirm whether low discoverability inhibited comments usage, we ran an experiment that prompted users to leave a comment. This initial test targeted developers with view-only access to a file—these users rely on close collaboration with designers in Figma, but were historically the least likely to interact with comments. After two weeks of experimentation at a 50/50 split, comment creation in the test group was 45% higher—without affecting the rate at which users returned to comments the following week. Simply making comments easier to discover had substantial impact on comments usage.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAAAsTAAALEwEAmpwYAAABZElEQVQYlT2QS2vbUBCF9ctLl4XSZVe2gw11SBdt4k0ppSnIMg0GB1mPxGDJkmpLVy9fPexgh2y+oluaxce5cy7MnBltPB4zGAzo9/sMh0NGo5HSzuv1eorJZMJ6vaYsS4qiIM9zhchSgjgkEBF5XdAeWrTFYoFpmiyXSyzLwrZt9Z7P50ynU3RdV/9JmpA3JWmdUx1rTuczRbtH93/z2ZpghHPKdo/m+z5xHCOEeGW73eK6LrPZDMMwcFyHdezz0zf4+vgNU7icXs7kx5JL65o3t+/5tPxCXAu0zWZDlmVIKamqSq2VJAndIMdxVGLP87CjBy7ur3hnfOSHp3N4PlI87bmyb3j764NqnNTpv4TdPZqmoW1b1bhLudvtFF3aTv0k4NabcfPwHTNxOZyOVE81d3/ulXcXLSgPEm21WtGljKJIEYYhQRAo/V93iEyQyRwhMwpZqMGykspL9ilFVVI3NX8BR3GlKKtpFugAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/c9a0170ae692bc5410de8067fadb15f97802a526-2386x753.png?rect=1,0,2384,753&w=804&h=254&q=75&fit=max&auto=format)

We saw a significant increase in comment creation when comments were easier to discover

## [Unexpected results, and a path forward](#unexpected-results-and-a-path-forward)

After validating that comments were valuable but hard to find, we set out to help the product team find a more discoverable solution. For our second experiment, we thought that moving the entry point for comments from the left to the right side of the Figma menu bar would make it easier to find. While tools on the left offer core creation and canvas functionality for designers, we hypothesized that cross-functional partners might find themselves more frequently using the right side of the editor, where many of the collaboration and viewing features live. We ran the experiment with a 50/50 split on new users and tracked the percent of these users discovering comments within seven days of signing up. The results surprised us: we saw a 20% _drop_ in comments discoverability across the board.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAAsTAAALEwEAmpwYAAABIElEQVQYlV2Qa0vCYBiG9/v7C0k2lYw0CIQORKG2vc5ZbVo5dWfda0ZRmumHCq7YQD/04eLmOfBw8ShRFJEkCVLKLDfEcZyx7Um53fGihEdfMggSonjMeDwhniREUYxidx8wbQfRsdF0gaZpGbquoxsdNNPiRm/RbDZpGwb9wRCtP+Pg9oPG6BP5tqQvlwh3ju2/oFxeN6heCIrH56iFEvv5PKqqUiyVKB2doFZO2SuUyeVyHJbLCMOkdj9jp/5Fzfkmmf9y5f+w215x1ntFsbo9Ol0H466HaBkIITI2hql5eiS1Ns12Zqg7MyrWgla4Qr6vaQVrqtaC+tMMxXVdwjAk/eWGtPY8L+P/LAhChl6EE0j88ZR4kuYzTjClPwr5Az96Wa7mi2FMAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/9169a1f42d3835157885c0884f2a9c210d65042e-2236x530.png?rect=3,0,2231,530&w=804&h=191&q=75&fit=max&auto=format)

Moving the comments entry point to the right side of the screen resulted in a significant decrease in comment discoverability

This experiment was a helpful reminder that small changes can have a meaningful impact on the user experience, and in fact, we should expect most of our product hypotheses to be wrong. In 2009, the experiment platform team at Microsoft [revealed](https://ai.stanford.edu/~ronnyk/ExPThinkWeek2009Public.pdf) that around one third of ideas at Microsoft improve the metrics they were designed to improve, and other large tech companies [report similar success rates](https://www.google.com/books/edition/Trustworthy_Online_Controlled_Experiment/NHjQDwAAQBAJ?hl=en&gbpv=1&dq=the+organization+recognizes+that+it+is+poor+at+assessing+the+value+of+ideas&pg=PA13&printsec=frontcover). The best way to catch regressions is through extensive experimentation and testing. While the data demonstrated the opportunity in making comments more discoverable, our second experiment showed that fixing discoverability issues was not as simple as moving comments mode to a new location.

After continued experimentation (both across Figma users and teams at Figma!) we decided to [launch a number of changes](https://www.figma.com/blog/stay-in-the-flow-with-redesigned-comments/)

, not only to the discoverability, but also to improve how users manage, sort, and interact with comments.

## [A new launch paradigm](#a-new-launch-paradigm)

As our product designer, [Ryhan Hassan](https://twitter.com/ryhanhassan/status/1461031074625032195), iterated on comment designs, the data, product, and go-to-market teams kicked off a conversation about how to extend the data-driven approach to our launch strategy as Figma scales. To minimize disruption amidst a substantial UI refresh, we ultimately decided to incrementally release comments to our users, rolling out the updates over several weeks.

Meanwhile, the go-to-market teams would publicly announce the launch at the beginning of the rollout to give users a heads up that the updates were coming. This approach allowed us to quickly address any bugs or user experience issues before expanding to a broader population. We sized the rollout proportion to be large enough to detect statistically significant changes in user behavior, while also honoring our plan to make these changes incrementally.

Since comments are an inherently collaborative feature, we randomized the experiment on the Professional and Organization team levels—we wouldn’t want collaborators to have different commenting experiences! However, comments usage among teammates is correlated, so the experiment setup needed a larger test group than usual to maintain the same power.

## [Reflections](#reflections)

Overall, users responded positively to the new comments experience. We saw a significant lift in all users leaving comments, and this increase was especially pronounced for non-designers. This was the case internally as well—comments usage among Figma employees has 3x-ed since the beginning of 2021!

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAGCAYAAADDl76dAAAACXBIWXMAABYlAAAWJQFJUiTwAAABEUlEQVQYlXWRQYvCMBSE+///lHvRkyCIh22TVpMmL6mtba1C9/YtCat42cMwPHgzbyYpjqcTpVIYa/EixBgzQggZr7nrOoZhYBxHpml6YxxH5nnOO4fDgWLztWG326LrmvAnTHiZXK9X+r7PZkm4LAuPx+ONZVl4Pp/ZvCxLit12y36/p7lYjHQYH2i94LzHOYd8pP5Mmw4lDiHkY7fbDaUURRKkIQ4T2kVUK7QSEedoz2ectQTvEO8RL9ngs0VCSn6/39FaU6RhXX+Y5gljG5qzwjtHbw1dremdYRDLNfhsluon8atu4nVdM1dVRZFqDX1PFEejTujvI6bRSFMTVEU0DV1bI+0Fa21+gtTov0/5Bcalu8PMoqeGAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/5be4241abbf0de8e6b28736df8c58088e5e48a5e-1588x468.png?w=804&h=237&q=75&fit=max&auto=format)

The internal working group dog-fooded the new comments experience

The data also indicated a more dynamic collaboration process. Not only were users who left comments more likely to get a response to their feedback, response time actually went down. While the median comment response time is 1-2 hours, the 75th percentile response times have decreased by a few hours. One of our goals is to make the design process more approachable to entire product teams with varying levels of design experience. By bringing comments into focus whenever a user opens a file, we’ve made comments a feature that encourages more voices in the design process.

For me, it has been rewarding to reflect on the influence that the data science team has on such foundational improvements to the Figma experience. In this case, our approach became a playbook that will guide major launches in the future, but our work goes beyond product strategy. From setting metric goals with leadership, to collaborating with partner teams on product and design decisions, I’m excited about all the ways our team can use data to help influence the future of design.

If you’re interested in helping us make data-driven product decisions, learn more about Figma and [check out our open roles here](https://www.figma.com/careers/).