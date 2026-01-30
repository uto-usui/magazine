---
title: "How Figma’s data science and user research teams weave together insights that count"
source: "https://www.figma.com/blog/cross-functional-data-science-user-research-figma/"
publishedDate: "2023-10-25"
category: "design"
feedName: "Figma Blog"
---

October 25, 2023

![An illustration showing speech bubbles and data interwoven with a chart](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAbABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFBgL/xAAkEAACAgICAQQDAQAAAAAAAAABAgMEAAURITEGEhNBIlFhcf/EABcBAQEBAQAAAAAAAAAAAAAAAAUEAwb/xAAfEQACAgIDAAMAAAAAAAAAAAABAgMRAAQSQVETcaH/2gAMAwEAAhEDEQA/ALuo9K2dhQe27iCID8S485L1yQCWylhQ/sUhSPHOaTXerzJrX12yRRX+P2AoOz/uTLq1YVgggjQHyxB7PWc9BpElpg9r4esM1Y9Pj8nYFfbH0Zn2ILEgcD9YY7clpvKDXhZU9oBBP3hkpQA1eBMgBIsYxpYa4mWe1ywDcKn0TlrUaWDaXdhYln+NoyQqDzmaEjBYQD0p5H8OdtZmFtpFkYOx7I65zfaJkgEcJ4kEG/cbg3ERERlsKb/M62evWlaMIlD8DnnDFrkjSWHd2JY+ThkrRkE0cL2DG0rFVoXn/9k=)![An illustration showing speech bubbles and data interwoven with a chart](https://cdn.sanity.io/images/599r6htc/regionalized/b7a6633b0361fe6e7ed53ceba001ffed50ec1599-1608x2144.jpg?w=1632&h=2176&q=75&fit=max&auto=format)

A cross-functional team brought together quantitative and qualitative learnings to figure out why notifications were falling short—and how to make them better.

Hero illustration by Laura Edelbacher

1.  [Building a cross-functional process](https://www.figma.com/blog/cross-functional-data-science-user-research-figma/#building-a-cross-functional-process)
2.  [Understanding user behavior](https://www.figma.com/blog/cross-functional-data-science-user-research-figma/#understanding-user-behavior)
3.  [Finding room for improvement](https://www.figma.com/blog/cross-functional-data-science-user-research-figma/#finding-room-for-improvement)
4.  [From insights to impact](https://www.figma.com/blog/cross-functional-data-science-user-research-figma/#from-insights-to-impact)

![An illustration of vertical yarns, forming warp, and horizontal yards, forming weft](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAYAAADAQbwGAAAACXBIWXMAABYlAAAWJQFJUiTwAAADCklEQVQ4jY1VWU8iYRDkp2PwPvEMwwxC4psvxnjfGhRjBIGoUYwLiTEKKoMg6I6ital2G4fJPixJ851dXX1Mf76vry/w12jUcX5+hng8jnQmg2KxCOf9HXru/une52cTFdtGoZDHzc0NqtUafHqp0Wggn/+FbDaLTCaDTDaLQqGAcrkM27ZFOH94eMDj4+PfeQlXVzmkkklcXl6ibNvwNZtNvLy8IJ/PC7vNzU1sbGxgfn4ei4uL2Nraws7ODnZ3d7G9vY21tTU5572VlRWsrq4ilUqJod+OA9/b2xtyuZwoG4aBqakpmKaJcDgsawrnlmXJfigUkj2O4+PjmJ6exuHhIWq1mnjqo6vJZBKxWAz9/f3o6+vDyMgIRkdHMTY2hmAwKMI1hXOeDw8PY2hoSAzRM4aAsfURmRYikYiADQwMiIKCekEGBwfFMO8RMBaL4ejoCM/Pzz+AiURCLPX09KC3t1cUCUCGylLBaJR3OFIsyxLAarX6Dfj6+ipBjUaj6O7uRmdnZ8s6QZQlDSg7BaWYpomDgwOpgjaXaSkQCMDv94sSlSnqOllyTWMUBTZNU/RbLrNk6DKz1tHRIcKLVFaWBCUg18qewjuGYWB/fx+VSuUbkFk+Pj4WhnS3q6urzWUFVJbcd8c3EokIYFuWvUlRRlouqqzx5HxiYqJVh4lE4sdlZcgDLyCVqUjxgk1OTgpgOBzG3t7eT1KY5XQ6LfVEdyluN6mkbLSEOHLNeSgUkk/z6enpG7Ber0sdaQwpWi6q6AVVtrxnGIZ8Ka2kkOHJyYkwZB2SIdkpiBtIDegeGZqmKYAtlxlDAs7MzEj8COoGdLvqDgFFsxx3f8usQ7pMhqw/JkYBlYWWjze2lGg02p5lx3FwfX0t/U/jwham7UvZMKvKmHOe0d3Z2Vmcnp5KgxZA/jGOFxcXWFhYwNzcHJaWlqSRUtgnl5eXsb6+LqINlo2XwtbHDs5GLYD6RtDC3d0dbm9vZeSbUiqVcH9/LyPLgnHSkUIguvrx8dF6a4Th/8q/Hivv+R+9w2VR81XlOAAAAABJRU5ErkJggg==)![An illustration of vertical yarns, forming warp, and horizontal yards, forming weft](https://cdn.sanity.io/images/599r6htc/regionalized/7e755cc0077ffa1f0a8c6193d34af6d97b4b9cc1-376x416.png?w=376&h=416&q=75&fit=max&auto=format)

In weaving, you thread crosswise yarns, known as weft, over and under lengthwise yarns, known as warp, to create whole cloth. At Figma, Data Scientist Caitlin Hudon and Researcher Jennifer Sanders use warp and weft as an apt metaphor for cross-functional insights. Over several weeks, the pair wove together quantitative and qualitative learnings to reveal a complete picture of how notifications work, and how users interact with them. At the end of the process, they found where the biggest opportunity lay for improvement: **Most users weren’t receiving notifications at all. To improve communication and collaboration, it would be a matter of creating new alert types and rethinking who received notifications (and when).**

Currently, users can get Figma notifications through email, Slack, their mobile device, the file browser bell, system tray bell, or desktop bell. The different types of notifications include:

-   When someone comments on a file you own or have contributed to
-   When someone replies to a comment thread
-   When someone reacts to your comment
-   When someone invites you to a file, team, or project
-   When someone invites you to edit a file
-   When someone at-mentions you in a file

In Figma and FigJam, notifications trickle through a funnel with all users at the top. Users need to have notifications enabled, receive them, and view them before actually interacting with them. The activity team, which supports collaboration in Figma, didn’t know where in the funnel to focus their efforts. To chart a path forward, Caitlin investigated the funnel from a data perspective while Jennifer dove into research on an overlapping topic. They saw an opportunity to form a narrative greater than the sum of its parts. As a strategy, cross-functional insights are not unheard of, but it’s easy to underinvest in the process. By doubling down on synthesis, they learned much more than they would have alone.

![A notification funnel runs from top to bottom: Figma users, Eligible for notifications, Receiving, Viewing, Interacting](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAADvUlEQVQ4jY2UW0ybZRjHe+eymHizzRtvlFO8E0aCITGaeGLNRBjG05XRDGPckhnn4nCnQOKQeWAmOAqUw9pSaDnIJoeNMigUmFDogbbf1xYKzDGkQRg69fJn3reFtsxEL359nj7v8/77f9/n66dxzrgZsTsYHZtg8vYU9tFxBm3DDN2yy/rIqIMxxyRjjok4kzjGbyP2+fwq/kAwBc34xM9YrV0YTWbM5nYam1rQ6Rqor29Er29Gr2+ipcWA0WimucWAvrEZk8nM8PAoPp+CooZRlBCBOJop5yy9/TewdnVj6eyita0dU1ubxGgWmGltt2Dp6MTcbsHQapZ9QyN2nC43sx6vxDPnjzmcdrlpvd5JZUM15bWXJBUiXhFUUV5bRYXuUgxZr5Lxy/pvqdRXc7HhO6oNtfQM9ktRzdSsi0r9ZZ47qiXtSHYK6SU5ZL51kKx3c8l65yAZb+bImlwvzuap4mdIP5LDq8dLuNLWhNvrQ+P1BWj5sY1XThTz2OEneKRgH3sO7WNPPO4tPMCjxY9L9r52ILYm2S979xc9ydtn3qf7Zq8ckkZc5IRzmouWr3nhqxfJPJ9FxvlM0s9mklaWQdrpDNK/yCBd5GXx/Fym7Mm68DTabwr5oacep9sTG4q4SF9AZcB5k88GPuUly/Pkm3PJN+SSV59Dni6bvDoRYzyrzyHfmCt7tNaXqbCVM+IaSzw24kMoz/o9GKeNfDxcSontMMWDWor6tbzee4jCnwoovF4g86IBrVx7w1bISfsJuma68fj9UmNHcJtx3yR1Xh2nvJ9wzFvKMU8pHzk/4KjjPYnIRe2490PKvKcweA1M+WdSH+xtZRHnlACD6hA14e8pj5zhQqSMs+rnnPaclIhc1CoWztEQ0jGqOvApasydEtOIOVTiBILMKG76In1cXW2iIVpL3WoNNUuXJSLXR2sx3bvK4LwNtzJHIBBK2a+RyvHidpxZcHEraqPv9x6ubXZgvdeKdcVEz2YH/VvXsK+O4Ap7E0JKYm/syLsWfEEF1y+zuLfGcT+w49wYkrj+sOPanMC97ManqgkjStKRd74ExJ87sRhcULkbVVi77+VudFry64aX5VUFJRx7y+yYCcTyHcHkX9gekqqGuHMnzG/rKpvrc2yszxFdU1hcDKGoiUEGklymCCZPWzgVTaFwiLW1ef7+a4E/HyywshJGDW73pR418G+CyaIiivfc8vI8W/cX2diIEImEH+rZvf8hwd3iwZAQDbO0lOwucd//S3C3A3Fngv9yJwT/AfsozZ78zuvdAAAAAElFTkSuQmCC)![A notification funnel runs from top to bottom: Figma users, Eligible for notifications, Receiving, Viewing, Interacting](https://cdn.sanity.io/images/599r6htc/regionalized/7d0ba342b7d605baf2f429de4ee603567cf39448-1056x1056.png?w=528&h=528&q=75&fit=max&auto=format)

The goal was to encourage users to interact with notifications, but the activity team needed more insight to know what part of the funnel to target.

“You have to have warp and weft to make things stand,” says Caitlin. “Quantitative data tells us the _what_. We can dig into numbers and see user behavior at scale, but those insights are more helpful when we start to understand _why_ users are doing those things. The best way to figure that out is to actually talk to them.” Adds Jennifer, “_Why_ can be a tricky question because people aren’t always good at explaining it.”

The **activity team** is part of the teamwork pillar at Figma. Its mission is to help teams create and collaborate effectively by making it easier for teammates to stay connected and engage with the work that’s happening around them. Notifications are just part of the product experience that drives how teams and organizations work.

Since then, the activity team has begun running a series of notification experiments, and a new notification type has already been released to address the biggest pain points for users.

## [Building a cross-functional process](#building-a-cross-functional-process)

Caitlin and Jennifer kicked things off with a teamwide brainstorm in FigJam. During the session, they presented the current state of notifications including what percentage of users received, opened, and clicked on them—and set metrics goals for the quarter. Next, they prompted the team to write down strategic questions, ideas for new notification types, and what data would be helpful to know. After the meeting, Caitlin and Jennifer divided the open questions based on whose domain—data science or user research—was best equipped to find out the answer.

![A screenshot of a brainstorm in FigJam shows stickies with the team's questions about notifications](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAACK0lEQVQokWXNW1MSAQDF8f3O+VBNT1ozDU81BYoLgoKI6LLcL4qZeQMqriPgFZLbAsvugooPUf8mpodmfPjNOU/nCIXLMdmzIemy+s+AdGkw69kzja8VjfL1PY3elLbGE63/8i8hV9NIl/qcFBVOCgrHhS6nxd7sJFcbkb8YU2lMqPem3Kq/aaq/aKlT2oOfT6lThKPikN2Mwk5aIZVVSJ52SGX7HBZHHJXvOC7fk6k+kq09kq5MyFdH3JzV6eTzdAt5uqUS3XwOpVhAOb9GkL8McUZ7OGMDPDsDHJEuzmgfb8rAnRyyFh/i3TPw7Go4YypyvEElGGbgNqGtm9B879Fcb9G87xjuhRF8+yOsQQ1rSMcRM1gKDFkK6DiiY5ZDBpaAjj06whbRscg63sAN1Y117q1zTJbneFh5xcPSM+4cr1HjIYTg0Zi1hD4j7fbwRxuEInUSiVuCsQZSpI4/2WYjqc4OpUSLQmiHlsdCx2Om7RNpr5tpbrn48fkUQT4YshLp4Yq02Y98o+Td5HzDzZW0TdXrpuJZ5bucxB+9wh7u40n0CMcuCG1niEhZEqH8rEflHIeHDQRvSsUsKdikW058cRRxAU2cR1s1oYsvMawvuPS4kPxVzNIAMazNhj/4mpi32ogBhY++FqLUIXhgIPg+jVkMGthlhYwvjm5b4M7+hvGaiYn4nDvbPLXNOFuBJhbZQAyPsEcNLH6NRVlDDOtY/Rru4Ij4lwl/AIwuWjBYUddQAAAAAElFTkSuQmCC)![A screenshot of a brainstorm in FigJam shows stickies with the team's questions about notifications](https://cdn.sanity.io/images/599r6htc/regionalized/f71064bff1d48606f25078996e16252394b798f9-2160x926.png?rect=1,0,2158,926&w=804&h=345&q=75&fit=max&auto=format)

In an initial brainstorm, the team jotted down questions they had about notifications and then color-coded them according to what would provide the best answer—data or user research.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWUlEQVQokZWSSU8CQRBG+c89MzDihqKJaLx5MEZj4GSiFzUejDeNCOLGFmaBAWUQxCioEZHlGUZOKgYOdej6ql9VdX8uXXQZHG100UQX7+jio3/u/FPfxfW30Lv0QVaucuvOYasZ7jwmObnch3dGBTYxlDKaL4UWiFEMnFFdPMeeS5JVbXTRGAh1/UxoooMp1bAm0pys3LATTBPeuKYQSlNcS3A3k8SUHtGc9bu/wH8A21hyBXs6Rnglws56jOPVc1LBDOZanJI/Sl4poovWsMAWlnJPdfKU0uw2hm+TuH+Po+UUJ0sJCr4oBfctuvgcfkJTfqI8FuVFXacmL5DxbrE7n+JwLokxcUVOrgy/su4UNMgrWR48BzyrIUpT+yRmIyQmLzE9WQzpzXnrEX651/0VS7EoqddUxi+wvXEsdw5Dqvf1kWzzPanmmLmOIT1iiBqaY5fBsB7wC7FnihfBhvm+AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/d9023e91365b26e18922a418b4d9aa4b12caa2fd-1920x960.png?w=1920&h=960&q=75&fit=max&auto=format)

They then embarked on their individual research projects—i.e., the threads that would form the warp and weft. The two were in constant communication and relied on these rituals to stay in sync:

-   An ongoing Slack channel to share discoveries and ask questions
-   30-minute work sessions to trigger notifications in their own Figma files, share insights, and hash out new developments
-   60-minute work sessions to have deeper conversations about how to interpret and understand insights and write joint share-outs

As anyone with experience in insights can tell you, questions beget questions. “As we understood our domains better specifically around notifications, we started to go one step deeper,” says Caitlin. “We started to wonder, ‘Is this person the exception or the rule?’ and ‘How do we start to quantify some of the behaviors we’re seeing?’” Adds Jennifer, “It was definitely an iterative process, and our data kept pushing us to ask more questions.”

> We started to wonder, ‘Is this person the exception or the rule?’

Caitlin Hudon, Data Scientist, Figma

## [Understanding user behavior](#understanding-user-behavior)

The iterative process allowed Caitlin and Jennifer to layer insights and reframe their findings along the way. Here’s an example:

-   The numbers seemed to show that few users were engaging with email notifications.
-   By contrast, nearly all the users that Jennifer interviewed reported relying heavily on email notifications to stay on top of their work. While interviews don’t yield a sample size large enough to generalize insights, what she heard gave her pause. “It just seemed weird that all of them fell into this minority bucket,” she says.
-   Around the same time, Caitlin realized that the reason users weren’t interacting with email notifications was simple: Most of them weren’t actually receiving any.
-   After Jennifer shared her unexpected findings, Caitlin suspected the discrepancy might have something to do with the type of user interviewed. She cut the data to examine users on teams as their own segment.

The new data revealed that unlike those on personal accounts, designers on team accounts were opening 80% of the comment notifications landing in their email inboxes. “We realized we were dealing with two very different populations, and it made everything extra nuanced,” says Jennifer.

This particular insight bubbled up into one of their top three strategic recommendations—when creating and evaluating experiments on notifications, the activity team should center on the workflows of users on team accounts because they collaborate more often, and their behaviors are a better barometer for how notifications work. (Improvements made based on their behaviors, of course, benefit all users in general.)

![A screenshot from Slack presents the moment Caitlin messaged Jennifer, "Paid designers are opening 80% of the comment emails that come their way." ](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACLklEQVQ4jX2Ty09TQRSH+1+6duvalYkuXBhjYjQmGh+J7DCauAEiK0OkJRR5CFRKaRF6e3tbWtrex9z36zMzt5RH0El+M2fuzPlyzpxzS8O+gdaq09VO0HVd6fx8iO/7JElCHMdK0v6X0jQlyzLyPKdkdNo09rZo1ms0m0ccN48w9DamOcFxHGzbxrIsZQsh1HpVQgg8z1NgBXQdh9Ggj9HV0bS2gk1GfYSwcV0X4Qq1yoivSkKkfN8nDEMVpQLKSW7k4WQywbEtfE8QBoG6GEfxLKVCl3aaZSRpOktbAQFlyI/BFBJGIY7vMnYtROARSwcJyXPynJkkNIxC5TdLWU4XUSZpQi4vJREH4xOWtXXWu4cc9s45PTOxnRGJ3yeLLPI8vQSGQeF7M0IpcnDjgMV2hQcb73ixucBceZ+vlRrH9W94rQ9Eg1WyxJtGmc6eYQaUm4v2kEARe3w+/s698nMerX7i6VKVN0tr7K+9xK7eJTiZU1GqkRcZXqjEjZRnwD8F8OGPeZ4sVnm9UGGv/Ayrcge/9ZYsMuVVrsKupVxULZ2m7LPcqfJ4a45Xm0u8X9llfmWbxvZHnJ37BNoXssieArPrwMD3MccjTNkyjqN6zhI2rXGH6tkBu2en1PQhDX3AZHBANCiT2E2yNJxCbgAHRpf6zgZHv/fpdDR6vR7D4RBbOKraSSafolAmK5lG5FlR0dtUGhg6jV8/adVrGIbBxDSL/zgunP43bjv/C5302DWmNYwaAAAAAElFTkSuQmCC)![A screenshot from Slack presents the moment Caitlin messaged Jennifer, "Paid designers are opening 80% of the comment emails that come their way." ](https://cdn.sanity.io/images/599r6htc/regionalized/9c021aa8f2395b4549a7049b33484c5982463c0b-1608x1072.png?w=804&h=536&q=75&fit=max&auto=format)

Understanding the difference between users on teams and other users was a key moment for Caitlin and Jennifer.

## [Finding room for improvement](#finding-room-for-improvement)

![The notification bell icon comprises a bell with a red dot at the top](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAACCAYAAABYBvyLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVQImWOwFuTQXWYo7nzGRkbnjqMc2z0neYbL9rIMZAMeZkYzE35200AJbulUOT7mQkV+hmhpHrINBAC3MAm98naS4wAAAABJRU5ErkJggg==)![The notification bell icon comprises a bell with a red dot at the top](https://cdn.sanity.io/images/599r6htc/regionalized/8b81094f7eba01ec77a64b9d7e7afe1d819fbfde-642x85.png?w=642&h=85&q=75&fit=max&auto=format)

The notification bell in Figma’s file browser now sits more prominently in the upper left-hand corner.

One of the questions that the pair had from the outset focused on the notification bell in Figma’s file browser—whether users were aware of it, and how often they opened it. They set out to investigate:

-   While Caitlin could access data around the number and types of users clicking on the notification bell, as well as how usage compared to other notification channels like email or Slack, they didn’t know why those numbers were relatively low. Was it user awareness? Problems with discovery? The performance or value of the bell? Or workflow?
-   The answer, as Jennifer’s research revealed, was workflow. The users she spoke to checked their email inboxes first thing in the morning to see new activity across all the platforms their team used and get the lay of the land, so to speak. They rarely navigated to the Figma file browser at all, preferring to keep their files open in different tabs to toggle quickly between them, and missed the bell entirely because it was hidden in the top right corner of their screen.

“It was out of sight and out of mind,” says Jennifer, “so our focus for the half shifted to moving the bell to a more noticeable spot and improving the content and reach of notifications.”

With that goal in mind, the pair pulled from the initial brainstorm list to recommend new types of notifications to bring users back to files. One of those cases came from Caitlin’s personal experience. About midway through the sprint, she and Jennifer created a FigJam to prepare for a joint presentation. Though she was a key contributor to the file, she didn’t receive any notifications about the team’s comments left in the file after the presentation because she wasn’t the owner. They brought that to the larger team as a missed opportunity.

## [From insights to impact](#from-insights-to-impact)

As a result, the activity team ran an experiment to send comment notifications to file editors—not just owners. **Since then, this feature has been released, so collaborators can stay in the loop on files they’re invested in.**

It’s one tangible improvement, and the first of many to come. Thanks to the pair’s cross-functional insights, they could communicate strategy to the larger team and meaningfully influence the product roadmap. “We had a wealth of examples that we could point to that were both quantitative data points and customer quotes,” says Caitlin. “I can throw those numbers, but that’s not nearly as clear as shortcutting that with one insight from a user saying, ‘The notification bell doesn’t fit into the way I’m using the product.’” Jennifer says, “The punch doesn’t always come from research; sometimes the punch comes from data. For example, ‘71% of users don’t receive any notifications.’”

> The punch doesn’t always come from research; sometimes the punch comes from data.

Jennifer Sanders, Researcher, Figma

Caitlin and Jennifer both agree that having a dedicated partner to route questions to—and who would represent your data if you weren’t in a certain meeting—was an indispensable part of the process. “Being able to point to Jennifer’s work is one way we’ve built this strong partnership,” says Caitlin. “You have to understand the entire ecosystem to correctly evaluate an insight, so having someone who has all of that context and gone deep in the area is such a boon for the quality of the work.”

While working as a cross-functional team to combine qualitative and quantitative insights is by no means a revolutionary strategy, few teams do the meticulous work of weaving a full tapestry. “It’s a corner that can be easily cut in the interest of moving fast,” says Jennifer. “Investing in the synthesis as much as we did, as quickly as we did, to ensure it would have impact—that’s what differentiates the results.”

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAEwUlEQVQ4jW3S2VOTZxSA8Y+wBgghCqggiyzigiBBUNGCIqChEBQFZBMJWZEKAglRsC5jURSwA2RPvoRNSLC9sI6d9p97OvlQqzNePPPe/ea8Z44g+kYIuE34ncP4HToCjmGCLgPrXhNbgRF2xBHCUhYiATNhv4mw10jYo2fHPcyOS8e2Y4it1btSQkgcQ/Tdk9CAUy8VdBtZ95pZ85jwLutwLAzgXBgg5NCx4zMR8ZkIewyE3Xp2XMNsO3W8+4wKa2tTBL+gHjOiyyiB3hUdz2Y7GBq4yPW209zUVvLA0ohnYYCw10TEayTyA1RY37ATCk0hBvZQ0WPB7zTy+sVt+rrPUVmeQ0FuGnnZCmqr8pgebWJjVceu3/wdui2hUfDdDKH1aYLByc/oKF6nkZdPOzH21dJeX4zmTDYNZRk0VWRh6VLjme9h12eSikj7NHydUljffkxo4xFiyIYoTiL6x/C7LTje3GHJruXtvZ9YNlbzur+cJzdKmL19itXHWgl57zez6/v+60JoaxYxCq7ZEYNWxMAEou8+my4z4Td9RH79mT9mrrA7eYENcyUrdytYtTbxbnXoK7jrNRDx6AlHQXFzhsD6I/whO4HgNAHRStA/Qdg3yqeVIT7NdfDxcTN/P6rnw+R5HIPlvDJdILjY/wNQj+Bds+MN2fEGp/GJ0/hFGz7fBKEVE3++vs2nZ618tDXwj72O92NnsWmKMLWVsfK88/MejUS+BVd8Vhx+K66ADbffhsdvw+2ZYPHFAIvjjWw+qOfD1CUJDBhO01mVRdv5Al4/aifiNbEbPSFph4Y9cH75FxYd4yy7J1n1TOH0WnG5H/DicTej3Wrm7lTy18N6/p25yO/9x2k5qUJzJoeXtlbpHnd9ZiIe4//g9NNefp0bYn7pHm9Xxll2TOB0jvHb7C36NMcZ0RTybryanbEqRq7kUp2XwuVTWUzp63C/6WfLFT0bEzsuI9tOA0Lv8EXM968x+6SXuVcG5uaNLC3oeW7X0nG5iN4LObiMapaHK2k6lUmOMp6KvFSaz+XTd7OGJ9Z2fEtDbDiNbDoMCPVXC+m6XcHEWBNTE1osI63M2juw3WukuSaXntrDOMznWTTVcqkim4PKBMoOp1CeryA/W8n56mLGzVdxvhkkuKJHqG/MofNmKZahajpvqNG0qBmzNKPrOYu6NJOeukJWxxqYGaxFXXqA3Aw5546moy5UopDHkZycQE1VIVOjGhzz/Qg3O0u421/Gna5TVFflUlNTjH6wnpamMvJzlLScK+DhnVra60rJVCVzQJVIVYmKE3lpJCfGIggCqvRkrjWc5Km1DeFW7zF0g+VcbymlIF9FcclBrjZXcLoyn4yMFE4W7udyZS5HspXEx8uQJ8aSmZ5EuiKB2NgYCYyNlVFSlEVfVw2CtqOYnu4TNNQdITMrlf2ZaRw9fpjcI5koVXLS0xLYl5ZAsjyO+ASZhMhkMchiYoiJESQw+qar5JSVH0JobSviRvsxqtQ5EqDcl8rhgiwOZKtITUsgKUlGYlIs8uQ4qdi4vam+QHvFIE+JJztfiaDVHqdFc4zS0ixSFImk71dIYNYhJSmpUURGqiIehTKB5JQ44uL3JvsWi6ZQyjlWls1/G55EScT6b2gAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/00955a34b27274e93a08f87e6e54051bbfd5ae0f-3286x3286.png?w=3286&h=3286&q=75&fit=max&auto=format)

Jenny Xie is a writer and editor at Figma and the author of the novel Holding Pattern. Her work has appeared in places like The Atlantic, Esquire, and Dwell, where she was previously the Executive Editor.

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)