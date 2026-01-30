---
title: "Figma's engineering values"
source: "https://www.figma.com/blog/figmas-engineering-values/"
publishedDate: "2019-01-17"
category: "design"
feedName: "Figma Blog"
---

It can be difficult to scale an engineering team that’s executing well. This is a group of people who are doing great work together, but you’re going to add more engineers and people will grow and change. Without falling into the “monoculture” failure mode—where you only hire people exactly like yourselves, and where difference is ostracized rather than celebrated—how do you ensure you maintain the important parts of how you work together?

This was exactly the question Figma faced, and as a solution, we decided to codify our engineering values—how we build products and how we work together. The entire team came together to discuss topics ranging from specific behaviors and individual priorities to team traditions and processes, and even the company’s competitive advantages and our hopes for the future of Figma itself. The result was the following four values, each attempting to encapsulate an important aspect of how we work together.

We strove for values that were descriptive, not aspirational; we “shipped” these believing that as a team we already fully embodied them. Thus these values can be used as a yardstick to make decisions with and a guide for how we want to grow, rather than a forcing function to change ourselves. Additionally, implicit in each value is a tradeoff—something that we give up. For each of these values, you could imagine a hypothetical tech company valuing the opposite. A generic value like “write good code” or “try your best” does no good, because nobody would ever seriously espouse the opposite.

We’re sharing these values as a resource for those who might be interested in joining us someday and an example for folks putting together their own team values.

## [Communicate early and often](#communicate-early-and-often)

![two speech bubbles](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsTAAALEwEAmpwYAAABs0lEQVQokZ2SP0gCcRTHf3+7n6f97uiXSvmnjoMQwsEummpwkrabDHGoIQyMIsjBubGt2hraGmqpNYUGw8CGjAglork2IyGL7q6gKAoNqg9vfY/3vu8DQCfgG+AfwC/8rRMhxBjjnCuK4na7KSG/HcEY03U9kUikUql0Om2a5kgspqoqQggC8F6dV6WURiKRfD5fLBar1erZ6enx4eHm6urU+Pgo5xHa1Ysxbd8CQogQUlU1mUyWSqVWq+VYltNoPNfrt/v7R3Nzu0ND60KkPJ4AIbhjs9frzWaztVrNtm3n4cG5vHw5OLC3tx+Xl+8N4yYc3vP7J2XZ83HCt3g556ZpFgqFZrNp3d3ZlYqzs+NsbDgzM3Y0ag0O1oLBeUXxYYzaMySEaJqWy+XK5fJFpVLf2mqsrFiZjD0xYev608DASSAw3d3dgzFqTw5CyBgzDGNhcXE+k1mKx3fHxs6j0StNuwmHr4PBdSFiktT10+sQQpzzUCjk9/n6Xa64LM9ynlPVNSHWhJh0yfzt4M58dQsB4IJQYNxPyDClo5LURwj+vXSfYmAAJAjpX3X9/MqPev2bV0QseCTU11zRAAAAAElFTkSuQmCC)![two speech bubbles](https://cdn.sanity.io/images/599r6htc/regionalized/ffbf057b04266cf1f50dda1cfc24a67870681ffd-800x600.png?w=800&h=600&q=75&fit=max&auto=format)

_Don’t wait until code review to share your direction; solving something together is better than solving it independently; assume best intentions when receiving feedback._

Figma is, above everything, a collaboration tool. This collaboration-first attitude is reflected in the way we build software (and of course, our engineering team are extremely active Figma users 🙂). The archetype of the cloistered genius can be tempting—we all want to be the solo rockstar engineer who goes heads down and emerges days later with a perfect solution metaphorically chiseled from stone. But at Figma, we’ve built an engineering team with huge depth and breadth of knowledge. We don’t want to throw that expertise away—hence our first value, communicate early and often.

Communicating early and often ensures that work isn’t done in a vacuum. By sharing design documents, product specs, or even rough architecture drawings (usually in—you guessed it—Figma), we ensure that ideas are vetted early and issues can be spotted and resolved before we invest too much time in solutions that aren’t right. By normalizing enthusiastic sharing of works-in-progress, we make it easier for people to ask for help and input when they’re unsure how to approach a problem, as well as create opportunities for organic teaching and learning—for the benefit of the person sharing as well as the people being shared with. There undeniably exist projects and engineers where the heads-down approach could work; but the global maximum comes from ensuring communication happens every step of the way.

This isn’t to say we’re dogmatic about communication process. Sometimes code is the easiest and most effective way to communicate or discuss an idea. And of course when fixing a bug or throwing together a quick, obvious change, we don’t invest the time in multiple rounds of communication beforehand.

Additionally, communicating early and often only works if we’re serious about being receptive to input. So along with sharing works-in-progress, we work to listen to all the feedback that the act of sharing generates. This can be difficult—we’ve all had the challenging experience of sharing a deeply held opinion about how to approach a problem, only to discover that others disagree—but by ensuring that we’re sharing early, we minimize the cost of shifting direction. More later on how our values encourage us to think about feedback.

By living this value, we trade off the risk of slowed decision-making due to a large number of voices in the room. It is not always easy for a large group of people to discuss and have equal say in making decisions. This value pushes us to not only communicate as broadly as possible but also to take all feedback seriously, which can lead us to spend many cycles iterating on communication and ensuring every voice is heard.

## [Lift your team](#lift-your-team)

![three rising arrows pointing up](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsTAAALEwEAmpwYAAABXElEQVQokZXTTWvCQBAG4MzMfswm2VUbk2qDopKD1ngIHtpDogcRQn6BR///ryhqLS34kQ57Wx7eeVnW89oNABCxFA5Rex54/xkUInB2HvcrG2ZE3N4DIYfB7G3YTCfH4es+8MeI6omH73tQstNxeRJvh4M66Zcdu5DSPsLwc05tjdaxDbOX3joMplpFTzZXABFRRKQAABBRGpP2ugXrBIAA7ksJMBJyZ/yd8UdCypOnC9Y6vp152ZPOmR/Mh9AeQvvJ3CchUDzCcB0NkApZaN4YszGm0JwKySj8e/hktHbOGWaJGCIOSKyUWik1IBEiynvJAMDMWZZVVTWfz4MgIESH+K7UUimHiB7gzc4AoJQaj8f7/f54PDZNM5vNDPNvDOf3uo2ttYvFoizLuq63222e591u1xEt22BmjqJoOpmu1+ssy+I49o1pha8/hpIkKYoiTVMpJf7tfA9/AWdiImznnWQdAAAAAElFTkSuQmCC)![three rising arrows pointing up](https://cdn.sanity.io/images/599r6htc/regionalized/b3828aa369378e45a963874313c1484890a397ce-800x600.png?w=800&h=600&q=75&fit=max&auto=format)

_Help others grow; strive to make people feel better, not worse; strive to create an inclusive culture supporting diverse opinions; be solution oriented._

Software engineering is not a single player activity. At Figma, we’ve been fortunate to build a culture based on strong, respectful, positive relationships and early values discussions focused on how we build and maintain those relationships. Key to that theme was the idea of lifting each other up and working to make each other better, however we can. Lifting your team means prioritizing each other’s success and happiness over other considerations, and it’s our second engineering value.

More than the other values, the wording here is nuanced; it’s not “lift your company.” Engineering is a long process that must be sustainable and asking an engineering team to think of the company before themselves can lead to burnout. Instead, lifting your team is about your fellow engineers—making sure that you’re trying not only to be successful yourself, but that you’re lifting the people around you as you do so.

This can mean many things, and play out in many ways. Most straightforwardly, it means an atmosphere of constant learning, mentorship and growth. Weekly tech talks, formal on-boarding mentorship and even simple encouragement to learn new skills have been a staple of Figma’s engineering team for as long as anyone can remember.

But it also governs how we interact with each other on a more basic level. As a result of our emphasis on communicating early and often, we frequently find ourselves in the position of giving feedback to each other. This value describes norms that ensure feedback is thoughtfully delivered and focuses on ideas, not people; feedback that insults someone, belittles their work, or talks down is not effective feedback at all. Similarly, receptiveness to feedback—taking ideas seriously, no matter who they come from, and working to make sure everyone has equal opportunity to participate in conversations—means that we get the best outcomes (in addition to making sure that everyone is welcome in our engineering team).

Ensuring that everyone, no matter their identity or background, is welcome at our company requires institutional investment, not just individual commitment. We hold company-wide initiatives like bias trainings and try to systemically adopt learnings from them into our processes. We have a recurring reading group focused on topics of identity, inclusion and psychological safety; two recent readings have been [Ijeoma Oluo’s So You Want To Talk About Race](https://www.amazon.com/dp/B073P53DVL/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1) and [Ellen Pao’s Reset](https://www.amazon.com/dp/B06XJZ2BM3/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1). These are spearheaded by our DE&I (“Diversity, Equity and Inclusion”) sub-committee focused on inclusion internally at Figma.

This value also plays out in our retrospective, learning-from-mistakes mode. Especially when examining a problem - a project that came in late, an outage, a serious bug - it’s easy and sometimes cathartic to fall into finger-pointing mode. But this is damaging no matter where the fingers are pointed. Blaming a team member for a bug makes them feel bad, and makes them less likely to try to build things in the future; blaming someone not in the room (or at the company) makes everyone wonder how they’re talked about when they’re absent; blaming yourself makes your team feel like they should do the same to themselves when they make mistakes. But by removing finger-pointing from the picture, and talking about the problem only in terms of solutions - how do we fix the issue going forward, how do we prevent this from happening again - we can drive effective learning without making people feel worse.

What we trade off by living this value is having to constantly work to ensure we’re not becoming conflict-averse. Taken to its extreme, this value could lead to a group of people who are afraid to disagree with each other on anything. Some engineering cultures, concerned about this failure mode, attempt to drive in the opposite direction by encouraging head-to-head confrontation. But this value is intended to encourage thoughtful, respectful, positive relationships with each other, whether we agree or disagree.

## [Craftsmanship](#craftsmanship)

![pen tip icon with sparkle symbol](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsTAAALEwEAmpwYAAABCElEQVQokc2SMWqEUBRF572v/5tPoiYqSTE4iOiklEh6kaQM2NlZuIQJCDYuwN5SN6Ag4gLE2k0FJv2oqXL7w7v3vnsAgMM/FQAiCgC4i/kVUvooP5z53ZEg3UEiIiFUkV8tM3l5/qSiei3oZkcAwBgzDMNxHNc9n8w38/ilPb2Lwv06yTn3PC9N06IoLpfvIPjQ9RMVZURh3bBt23med103DEPTNFEUKYqCiCtPBQBKaRiGbdtO0zSOY13XQRAwxtZJAFBVNUmSeZ6XZen7Pssy27Y3nQUATdPiOK6qqizLNE09z+Ocb10hY8yyLN/3XdfVdV2SpH37JYQIgkAIWXd7O8VfyI36AcpvL9qijWOlAAAAAElFTkSuQmCC)![pen tip icon with sparkle symbol](https://cdn.sanity.io/images/599r6htc/regionalized/ee7c23cc0165b4ba32586b796e019d24f3d5d730-800x600.png?w=800&h=600&q=75&fit=max&auto=format)

_When solving a problem, do so sustainably; always strive to improve our process and learn from missteps._

Figma is a tool that people use to get work done - we’re a critical part of the design process at thousands of companies around the world, including some of the largest and most fast-moving companies in a variety of industries. This is exciting to be a part of, but more than anything for the engineering team it’s a responsibility. Any bug—any outage is something that may stand firmly in the way of a user getting their job done, and we want to live up to the trust that our users put in us and do our absolute best to ensure they stay productive. Living up to that trust is the heart of our third value, craftsmanship.

Craftsmanship is about thoughtfulness and care in the work we do. It means being deliberate about what we build and how possible it will be to maintain and extend in the future. A solution that will require revisiting in a month—because it’s not scaling, because it has a ton of bugs, because it doesn’t support all the use cases it needs to—is not useful to us and ultimately will generate pain for our users. For a deep example of craftsmanship playing out in our product development process, look no further than the story of the exploration that went into building the [Squircles feature](https://www.figma.com/blog/desperately-seeking-squircles/)

.

It also means learning from past mistakes to avoid making them in the future. We do retrospectives for every project, to ensure we’re constantly looking for opportunities to improve (even from projects that went smoothly) and so we can identify and consciously propagate those things that went well.

This isn’t to say we’re perfectionists; some projects, like a beta version of a feature we expect to change heavily before releasing to the public at large, can be “sustainable” even with clear imperfection as long as it doesn’t get in the way of what we’re trying to learn from the beta. And even for final products, endless polish is as unsustainable as none. But this value pushes us to plan thoughtfully and ensure we learn from our mistakes.

What we trade off by living this value is (sometimes) day-to-day speed. It’s easy to imagine an engineering team that emphasizes moving fast over keeping things stable and bug-free—like a team building a product that isn’t responsible for important user data and doesn’t support anyone’s livelihood. But given the role the Figma product plays in the lives of our users, we feel it’s worth it to ensure we hold a high quality bar for them. And in the long run, being thoughtful about how we build often reduces the complexity of ongoing development and new features regardless.

## [Prioritize impact](#prioritize-impact)

![three dots on a line the third is checked](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsTAAALEwEAmpwYAAABpklEQVQoka2TXWvUQBSGN5mTSWaSnDlT2c0mdXfN9ibJxm66BS9aV6Ra/MCrWtQWpCylf8DbfoCoFyJ65/+VJOxS7KxXvrwMw2EO5x2emU7n/8la+bZu1zvmPosxJgCC1kr1sqzIslyp7qrImLAsZuhlTEg5xDBDzBHzqnp+dfXl8vLzdPqsrSBmUg4YE3fnWwDSlyOFE1IlUTmbvbi5+XZ9/bWqDhVOGhe+HAFIQ3jLAgDfdYkoiaI0SdKy3C6KkqjvOKo1gG+M3bFtzh3SerC/f/D+3elstoe4KUQkvL7nRq0517btGO4M4PsyHQ33zs8//fr5+/jtRdx/RKrStKNpp9lUQbAF4Bti15O51no0nx+enHzc3X0chgPPi4VIlo5dvmHb3IgKAKTLSVPcjx4gRpyTA+i5NOglD9PxZjfmTrAWlS+HKswUFqQmCnOFeRhkcXf7w9PX3xdnR/OXG5TaNWoTqqBFhWVNq1kxnMS96vTgzY/F4vjJq3u0ZTN5t7l+YQDScbChgit7Lg2jZDoe369jr0HV9JtlL7V852v11zf41+k/5fUwg4ibCO8AAAAASUVORK5CYII=)![three dots on a line the third is checked](https://cdn.sanity.io/images/599r6htc/regionalized/89b9e7b37c215a63f221ab8d3b28528faca4f1bf-800x600.png?w=800&h=600&q=75&fit=max&auto=format)

_We can only solve so many problems at once, so pick your battles; things are built with a shelf-life in mind and that’s ok._

It’s well believed on the Figma team that design tooling will never be “solved”; the space of interesting problems to solve is gigantic (as a quick perusal of the “Feature Requests” section in the [Figma Spectrum community](https://spectrum.chat/figma/feature-requests) will attest). Furthermore, we’re a small team, competing with companies staffed with orders of magnitude more employees than us.

What do we do first? Our final value, prioritize impact, reflects our drive as a team to focus on the things that matter the most to our users (current and future) above all else.

Prioritizing impact is something that just about every tech company will do - it’s hard to find a company (outside of perhaps research divisions) that decides to work on projects with no regard to what impact they’ll have. But it’s something we do with rigorous specificity. How much will this feature matters to users, and how many of them? If we think past our users of today to where we want to see the Figma product grow tomorrow, next month, or next year, will those users’ needs be met? We tend to rely on concrete data —e.g., the number of users hitting a specific bug or requesting a feature—but also on qualitative questions like impact on user experience.

With an engineering team that comfortably fits around a table and all know each others’ names and faces, we don’t have the bandwidth to spare on projects that aren’t the most important thing to be doing.

Prioritizing impact doesn’t just inform how we pick between projects, but also how we approach them. Our third value, craftsmanship, reflects our drive to be thoughtful and sustainable in how we build. But prioritizing impact ensures that we don’t go too far—that is, we don’t over-engineer in the name of sustainability. A solution that will last a year, and be built in a week, is often better than a solution that will last three years and be built in a month. For an example, our multiplayer feature that allows concurrent viewing and editing of a design file by multiple users was unveiled in [September 2016](https://www.figma.com/blog/multiplayer-editing-in-figma/)

; a year and a half later, we rebuilt the server that powered it from the bottom up using a more

[scalable technology stack

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAAA50lEQVQoz53RPctGUBzHcc8lBjFJYVUWEyMLg91otRjIIqW8BbPVw2KQjN7b7+4Y77qucg3f5ZzOp3P+h6IoCp8SBAGmacL3fQRBAMuynrVvZ6hPGxzHwXVdFEWBvu/Rti3yPIfjOOB5/j2oquoDbNuG4ziwLAvGcUSWZdA07T1Into0Da7rwn3fOM8T8zyjrmvYtv0e1HUdZVli3/cHmqYJ67qiqioYhvEeFEURURQ98yN1XYdhGJAkCSRJeg+SFEWB53mI4xhpmiIMw2cULMv+BpLIj8qy/OAkcjuGYX4H/0fT9Nf9P7Gn6JBIx6S6AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/4ebb54efbfa2fd4951e04ddb0b3f2b67146976ad-2120x1000.png?w=2120&h=1000&q=75&fit=crop&crop=focalpoint&auto=format)

### Rust in production at Figma

How Mozilla’s new language dramatically improved our server-side performance



](https://www.figma.com/blog/rust-in-production-at-figma/)

. While we could have aimed for that level of scalability from the beginning, thoughtfully postponing that work allowed us to focus attention on other features in the intervening time and wait to see how necessary that work truly was.

As with all values, there’s trade offs. Sometimes, we have to pass over the more out there and exciting projects, which can be undeniably frustrating. It is probably not an exaggeration to say that every engineer has half-a-dozen project ideas in their back pockets they’d love to work on—this is what made our Maker Week this past summer so fruitful! This value lets us explicitly admit that sometimes the most exciting projects aren’t the most important right now and gives us a framework to decide when a moonshot is worth tackling.

## [Epilogue](#epilogue)

Values aren’t something that a team can simply write down once and call “done”; they’re meant to be the starting point of an ongoing conversation about how they want to work together. We’ve rolled our engineering values into our interview and onboarding processes at Figma, and are learning more about what they do and don’t represent about the important parts of who we are as a team. We may keep iterating—we may not. (Maybe we’ll even figure out how to make them grammatically parallel!) But it’s exciting to have a starting point.

_If these values resonate with you, we’d love to hear from you. Learn more about open engineering roles at [our careers page](https://www.figma.com/careers/)._