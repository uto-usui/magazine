---
title: "How we engineer feedback at Figma with eng crits"
source: "https://www.figma.com/blog/how-we-run-eng-crits-at-figma/"
publishedDate: "2024-02-29"
category: "design"
feedName: "Figma Blog"
---

At Figma, we’re encouraged to give and get feedback on [in-progress work](https://www.figma.com/blog/welcome-to-the-wip/)—the earlier the better. This is especially true on the engineering team. But sharing early work can be daunting. It requires an environment and culture in which individual contributors feel comfortable [bringing unpolished ideas](https://www.figma.com/blog/designer-developer-handoff-with-figma-and-jira/#present-your-work-even-while-it-s-in-progress) to the table to ask for feedback and have an open conversation, not face another approval step. Most engineering teams have some sort of approval process, often called a technical review, which is usually reserved for the later stages in a project. The problem with late-stage technical reviews is that when they happen _too late,_ like when a direction or design has already been built out, they can lead to launch-blocking feedback.

[![An abstract illustration featuring silhouetted shapes against a solid blue background. The top half shows three simplified, bald human head profiles with different irregular features—one has a wavy outline, another has a heart-shaped indentation, and the third has a split top. Below, there are various abstract shapes resembling melting forms or puddles with parts that interlock like puzzle pieces.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACWElEQVQokW2Sa08TQRSG9ydjt5fdbbfdXui9HwjlUsCWgiByU8AmSARjI+52MrMzi1yiJsZLiNH4yR8wr5kdonzww5OzOZuc82aeY5g2l3fgXv1Lwgrh5DmWexzHBwLrqwJukcN2OVYfctCxABsLbKwJOAUOI2GF8g7cq/GwpKOHTtc4TkcCt1cRgjOBZosjX+I42hP4fhPh9jrC6KlAocxhqFRJJyZOqKpK0Gxr1NZ6k8M/E/j9OQJ/I9Bqc2Q9jv0nAj8/RPj1McLhrkDOiwdS6eSpzHkU6SyVmRzFzAzD3hbDsM/gFmnM/hbDxdsQBzsMhRJF0qbozlJMXjGwcYjegu4ZicxEOvmJrNUJOh0iOx2CuS7B0iJBq02Qzk6QtCeoNwgW5wkaTYKkTTCVJnA9gu4swfwcQaGke0bCotIrU/loyDB+EcqXz0P0VxjyJQrTpshkKYoVhvI0g+2yOEXC0pg2Q8rRqO9EhsLI5Lhc7nFJXwt8fRfJq0mE3cfapHrPVodje1NgOBCxiAexNP5fTJvDKFa4PD4Q8stFhG+XkbwmeqAyVm3w+LHFubZYqeklSpRaaLn/TkvDYZSrXJ6OhPzxPlLGpDgX8c2pNMM+xw2JVHKcHApU67qv/qt7VPZTjl6iqmmHMCyXytU+k8rgJx7Kk6MQtQaFk6dYG2izl0GInU0Gr0xRrVM822YY7TO0O0xdBrIFCnUlpkVhTKV8War4crASYHsjkEsLAVzPR8r20WgGWOsHWB8EaLcDZLI+vJKP3kKAxfkAhZIP0/KR8zRTaR9/ACSBhgxUh+LIAAAAAElFTkSuQmCC)![An abstract illustration featuring silhouetted shapes against a solid blue background. The top half shows three simplified, bald human head profiles with different irregular features—one has a wavy outline, another has a heart-shaped indentation, and the third has a split top. Below, there are various abstract shapes resembling melting forms or puddles with parts that interlock like puzzle pieces.](https://cdn.sanity.io/images/599r6htc/regionalized/82da97f2dad2e60cab257c741cf9cdd27fef6b3f-2784x1566.png?w=2784&h=1566&q=75&fit=max&auto=format)](https://www.figma.com/blog/design-critiques-at-figma/)

Noah Levin, Vice President of Product Design at Figma, calls design critiques a “[safe space for exploration and feedback](https://www.figma.com/blog/design-critiques-at-figma/).” It’s not about approval, but giving a designer what they need to move a project forward.

Inspired by the Figma design team’s principles and methods for [running design crits](https://www.figma.com/blog/design-critiques-at-figma/), a core group of Figma engineers, led by Ojan Vafai, set out to introduce a process somewhere in between a design crit and a technical review. This was the genesis of Figma’s **engineering critiques**, dedicated time for the engineering team to brainstorm novel approaches to technical problems, get feedback on existing work, and unblock each other. Today, engineering crits are a core part of our workflow, but it didn’t start out that way.

## [Lifting ideas up](#lifting-ideas-up)

In the early stages of an engineering team, everyone is both a landscape architect and a gardener—they not only shape the overall concept and design, but also nurture how it comes to life. There’s often a surplus of work and a dearth of resources at this stage. As the team scales, you begin to bring in more people who are unfamiliar with the existing design, but who have agreed to stewarding the concept. Ojan likened this stage to an anecdote about his grandfather: “I have a vivid memory of my grandfather wanting to build a small garden in our backyard. He asked my siblings and I to dig out the rocks to clear the area, but as soon as the soil was prepared, the garden was off limits.” He and his siblings weren’t allowed anywhere near the garden, lest they accidentally step on a burgeoning plant.

On a high-growth team, the instinct might be the same—to limit others to the perimeter, allowing them only to clear rocks but never plant flowers. On the one hand, you need help building the garden; on the other hand, you’re afraid that someone might trample something that’s been growing for a long time and is about to bloom.

> The engineering crit plays a very specific role. It’s a place to solicit feedback early and often. It is a forum to get expert support on technical designs. It is not an approval process.

Kris Rasmussen, Chief Technology Officer, Figma

When we brought the idea of hosting engineering crit to the broader team, many were skeptical. Design crits center visual UX details, so some of us wondered if it was even possible to critique the design of a technical solution in the same way. Similarly, engineering reviews are often based on sharing a detailed eng spec for approval, and the result is thumbs up or thumbs down. With so many of us used to this binary approach, we wondered how we might architect engineering crits to plant flowers together.

We reflected on the times when we felt like we were really in the flow as a team; brainstorms and retros—which we run in FigJam—came to mind. We also thought about what didn’t quite work in technical reviews. When we ran technical reviews synchronously, we anchored on the input of just a few team leads; they weren’t structured for everyone on the call to weigh in. When we ran them asynchronously in other tools, everyone’s instinct was to share feedback as a comment, which led to unwieldy comment threads that were just a list of disparate pieces of feedback, rather than a conversation. Immediately, the format seemed like the key to unlocking a more collaborative process.

[![Faces peeking through a brick wall that they're building together.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAC4jAAAuIwF4pT92AAACPElEQVQokSWPzU6rQABGeVFX7nwB48bowmrQQAckSJtSWwrECA4DAwPy00ILDlhboAt/nubmpusv55x8TJqm6/W6qqo4jgEAZ2dnJycnAIA8z33fn06nEMLVaqWq6sXFxc3NTRAEXdd9fHwghJi6roMgcF2XEDKfz6+vr09PTweDQRAEaZoSQpbLZRRFj4+PLMvKskwICcNQEIS7uzvm6+tL13VZlj3Py7LM87zZbGbbtu/7z8/PoiiOx2OEEITQdV3f94MgME1zOBxKksQ0TaNpGgDA87z9ft/3/Xa7raoKYzwajR4eHjiOwxjvdrv9fh+GIcdxl5eXAABCCJOmqaqqPM8bhtE0zeFw2G63URS9vr4ea67rFkXRtu3hcCCEDAaD8/NzlmXDMGQ8z1NVFQAgy3Icx23b1nVtWdZoNLIsK03T1WpFKf38/NxsNgghTdNeXl5s287z/D8MIVwsFoqiOI6z2Wze3981TRNFEQDw9PSkqmqSJFVVmabJcZwkSRjjPM/rumaCICiKIkkSy7IwxgghnucFQdB1XZIkjuOGw6Hv+2VZGoYhCALP84qi6LqOMWaOl5IkgRASQjDGoihOJpM4jjHGb29vEMIsy6IoMk3Ttm3HcQzDmM1muq4zlNL1ej2fz1mWHY/Hy+WyLEtKadd1u92uLMuiKLIsUxTl9vbWcZyu65qmOaqZ7+9vSulkMrm6urq/vyeE9H3/8/Pz9/fXti1CaLFYRFE0nU6P6+/vb9/3TdNQSv8Br4/ANozyMTIAAAAASUVORK5CYII=)![Faces peeking through a brick wall that they're building together.](https://cdn.sanity.io/images/599r6htc/regionalized/8e5444ab7a00b475670c9eea1a706122e8944027-2784x1566.png?w=2784&h=1566&q=75&fit=max&auto=format)](https://www.figma.com/blog/why-roles-are-not-rules/)

Figma CTO Kris Rasmussen shares more about how we [lift ideas up](https://www.figma.com/blog/why-roles-are-not-rules/) with engineering crits.

By running engineering crits in FigJam, we could solicit a lot of feedback in a short amount of time, making it easier for more collaborators to jump in. Rather than having one person talk at a time or respond to a long thread of comments, everyone on the team could contribute. And FigJam’s open canvas would allow engineers to share early thinking, inspiration, and even screenshots of in-progress work, alongside helpful context or prompts for the broader team. As soon as we piloted our first few engineering crits with our immediate team of eight to ten people, everyone was bought into the collaborative approach. Once we arrived at a repeatable format, we opened up calendar invites and welcomed more and more people into the process, growing to upwards of 200 people.

## [Anatomy of an eng crit](#anatomy-of-an-eng-crit)

We send a calendar invite to every engineer working on the Figma editor and list them as “optional” so they can pop in or opt out as needed.

Today, the invite list includes the entire organization. While anyone—even cross-functional teams—is free to join, most Figmates opt in if a topic is related to their expertise. Sometimes, we’ll have insights to share on work that doesn’t directly involve us, and other times, many of us will simply be curious about what’s going on in the rest of the organization. My teammate and fellow Software Engineer Shirley Miao and I now host these sessions, which we record for posterity.

Our goals are to:

-   Brainstorm and generate ideas
-   Identify difficult engineering challenges
-   Validate hypotheses
-   Share knowledge
-   Call out irreversible decisions

The engineering crit has become core to the early and middle phases of developing technical designs—and even sometimes in the late phases for a particularly targeted question. It has spread through much of the engineering organization, at every altitude: crits that involve existential questions, ones that center a specific technical challenge, or a series of focused crits to gradually arrive on an approach.

![Many cursors float around a FigJam with many sections and sticky notes.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC7ElEQVQ4jYWUSXPcNhBG/ddzSeUSH5L8AB/i3LKc4qTiqGRL5VhSjR1JI42kGQ2HHG7DBdwJEgT5UqQSWbIOQdVXaGwPaADdz7pOUcuauq6psoqdLwjihKZt6XuN7jqUUozzxvYwDAxDP6nXmqaRlEVBFlfEpubZOKB7Td/3KNkg3C2ReUEV3CDFhrYI0DKnqxO0TNFVhtx5lM6WMgwpRUJT5HRVhcrlCBx3HBiLVg25tyS6eUuyesPu+pDIOKUKVhTugsK7QlhXnO79weHPP3Hw6ncOXu9jr1Z0eUpf5p+AI7PXiiJ2iK0zhPmBzfyI1dkxwe0x0eod0XrG7fWMX3/7he9fvuD5t9/xxVfP2XvzliwK6fLsc2BHkQdEwYo0XBJsrzFXc1xjRmy+R9gfcd0FV8ack7MjXvzwki+//obXe/tEnotKxAOXB1Ba4aQ2F84plr8gCtZ4OwMnXONHS0KxJMts2sSnck1WsxM+7O1jz8+RjoXeOY+BrVbc7Ez2zv/ibHmK562xxRYjdyeZhUtchCixo/dtOsdE2Ru0Z9H720kPXB7oeo0V+by/PGdhLHEDh3VocyVsbhIHI/YIs5i2yhnKf1U9sB8/yh0wKBNudhZG6LCJXP42LzkyPzL3l2xchzhOpn85/cX+qZ4ARZPjpDvcOMCMthzdHvLn4hUz55x17BEVKUp34w3drxuGT/YTYN5WRGVClCdYqcvMPuHd8oALd4VVhMRtjuq7B7DhkZ4As7okyAVxlRLUAiNx2DgWOz9ElDllJ9Gje/8LZJjCr5KStCgoZY1ULXUrkWVNU0pape5hY/kc1t/f4QQbUHJAVt0U8KqpaWVDW3eo9r8E0dHrflqo9V38PwSOffcnVE1P6ncIr6ZOHaRYkG5tYqumSNu7bFRVk7I0JY5CyrK426Tvp7ooCp6NRqc7mloRORLfjEidY/L1j/hnJ9jzDLGrybIMIQRxHLO1LK4Wl3ieO6W+kVGWJYZh8A8FPrvSBhVOngAAAABJRU5ErkJggg==)![Many cursors float around a FigJam with many sections and sticky notes.](https://cdn.sanity.io/images/599r6htc/regionalized/972cfe08ce1d34cb9589d8340b2a7220f8a97b02-2364x1918.png?rect=0,2,2364,1915&w=390&h=316&q=75&fit=max&auto=format)

Running engineering crits in FigJam welcomes more people into the process, while keeping feedback focused.

![Many cursors float around a FigJam with many sections and sticky notes.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAACXBIWXMAAAsTAAALEwEAmpwYAAADcklEQVQ4jT2Sy27cRhBF+f9fYGQVOEEcIItYWchObBiQLVkBLHkkWzOSZjRPckgOH93N5qubTfIEkowsDgpVQN26wC2vbRqElIRxQi4K6sZgu57ODRjjnvpHWtNh7fPc9SPDONL3PVVZkWcZMtOo2OF11lI2Bj8pWW0KwqAhzRxJ3hHHLUlmSZUjTlrCqCYRlqId6XoYf4h2XUfXOZwZ8ZxzmG4gzloW94rlncYPLH5s2QYtwaEjlD3buOEh0OySlqwaaN3IMPSM/Q+G4emA96hubYdKFNHDgWityBKDVBYpDbkwZLkle6yyQegWXXeUTUORZRR+RB0ldIVmtBavqhvaqqZNU/RmTzaPEauUOhG0QiJ8STRXSF9jVUlflri6QheS9WzJ7ck3gssFbZQwlhqv0BVNVeOUIpvvuHl/xfT9hN3tnGizYv5lzvnxDbOzBTo4MCjBWGnasmIzDZm8f2D71cckOWiJ1xqDsxYnCzYXM45fvuHol3ecn18xvZ1y+u4zv7044s3vH/C/L2nDPUOe4JQmngsWZyGHaYLLJWj1HMroHL0qiKcLPh+f8vfRZ87/nTK/m3P58ZK/fv2HT0cn7L5eo+Y32N0CF0eIRUx4GaAWCb0soCqfQxmcYyhLsuWaiw+nfHx7wvRiSjjbsL5Y8u3Td+anZ+z+fUv67QQT3NOLFJNJ6kRji4bBWMauw3Pdo8OOXgnWlxNe/fSSly9+5vrsgv10jz+N2N+u2Vydc3d+TDg5xYRbRlP/eJeecRz+xzOdpXcGJw9srif8+eo1f7x6zc31jK0vWO0E4SYgWs7YLWakqy02l4xPey2d0XRtQWee8fJSU9uGtpHILGa3C9jtQ7LH1HXNQZbkuUCL5OlVyrLCmBbnDE2VIQ4bZLRGRlvizQov2EcIrShM9SSSpgqlS7SpyYuSJNMIXaGbEllopK6orKEbLLrOOEQPiGBJuHzg8myCF29ukOkaqRP2+xj/ISD3fYo0JM9z0lwjq5qiKpAifxItTYt9dGgVWoc0ak+0X/NlcoWXhxOK8BoZLdkvQ/zZnnx+j767pthtUbJE1w1FqZAyQ2mFVopGptg6x3Wa3pXoKmMdrvGkDlDpEhGuiLYHglXK4e4O8eUMcTMljwSqKBFKkuYpWZYjd3v06h6TB/SdeUq3aSqWqyX/AUsmqeHH+JthAAAAAElFTkSuQmCC)![Many cursors float around a FigJam with many sections and sticky notes.](https://cdn.sanity.io/images/599r6htc/regionalized/398b54714391b419158654d219c97966800d951f-2466x1992.png?rect=0,1,2466,1991&w=804&h=649&q=75&fit=max&auto=format)

Now that engineering crits are such a central part of our work, we have the process dialed in. Here’s a look at what we expect before, during, and after the session.

#### [Before the crit](#before-the-crit)

I’ll admit that we sometimes take a shortcut and paste screenshots of targeted parts of our design doc into a FigJam file, rather than filling out the template from scratch, but this is the exception, not the rule!

To run engineering crits as efficiently as possible, we ask engineers to do some prep work. The must-have is a FigJam file with the design they want critiqued. We use [this template](https://www.figma.com/community/file/1259186143617682581/engineering-crit?searchSessionId=lsuz5497-4bthwob3vxr), which has different prompts than a technical design doc. Reviewers need to quickly get the context they need and give meaningful feedback on it, as we know they don’t have time to digest full PRDs.

Before we begin, the presenter provides background context and frames the discussion: Are they looking for high-level ideas on large-scale architecture, or are they diving deep on a specific component? They also provide some details on ideas they’ve considered and leave plenty of room for discussion.

#### [During the crit](#during-the-crit)

Engineering crits are explicitly _not_ an approval or decision-making meeting. They are about getting the right feedback to lift ideas up. We ask reviewers to lead with suggestions as opposed to mandates, because we want to ensure we use the time in these meetings to capture as much of the collective learnings and wisdom of the group. We have other forums, including technical reviews, to ensure key feedback is acknowledged and acted on.

After that, the bulk of the meeting is still synchronous, but silent, as reviewers leave stickies in FigJam. This means we are able to have multiple conversations in parallel—allowing everyone to speak up—and reviewers can focus on the part of the conversation where they have the most expertise. If there’s time at the end of the meeting, the facilitator will turn attendees’ attention to other discussion topics or questions that might help the working group.

#### [After the crit](#after-the-crit)

In most cases, one crit is enough for a team to figure out their approach, but sometimes they come out of the crit concluding that none of the proposed options are feasible. In that case, they’ll go back to the drawing board and attend another crit.

Of course, the process isn’t perfect, and it’s unrealistic to outline every possible edge case. Engineering crits are also not meant to replace technical reviews entirely. If we’re working on features that touch many different engineering teams or feel particularly high stakes, the engineering crit is a solid stepping stone on the way to a technical review.

[![The High Growth Engineer logo, a rocket ship blasting into space.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFAwb/xAAoEAACAgEEAQEJAQAAAAAAAAABAgMEAAUGERIxBxMhIiUyQWFxgeH/xAAXAQADAQAAAAAAAAAAAAAAAAAAAQMF/8QAHhEAAgIABwAAAAAAAAAAAAAAAAECAwQREjGh0eH/2gAMAwEAAhEDEQA/AIj6Y7Wq7i1N21SYxUoRy/B4LfjKpb2Xtq45qbWpK1loGZpXbsqgDycnHo/YEOrTGclq6L2MSn3yHx1z22vbq0nacVhdIb5haTidUbsqDz1GbNdCk9TfSFiLVGpKCWfL8IZaiaCzLE44ZGKkfo4xanaxZlmf6pGLH+4yYjb0rVJalFFihr8g8dynxH+853GqM5JepTY8eTF/uMZJgYF+T2tt36InP2QcAYxjKLYD/9k=)![The High Growth Engineer logo, a rocket ship blasting into space.](https://cdn.sanity.io/images/599r6htc/regionalized/79dc19b9307027bd2f1ee75d33b044cb0fa03051-1365x1365.jpg?w=1365&h=1365&q=75&fit=max&auto=format)](https://read.highgrowthengineer.com/p/engineering-crits-at-figma-interview)

## [An example (real) eng crit](#an-example-real-eng-crit)

We recently launched [AI in FigJam](https://www.figma.com/blog/introducing-ai-to-figjam/), which helps teams overcome the “blank canvas” problem. It’s the perfect example of how a project flows through the engineering crit process and comes out better as a result. Here’s a look at how this project evolved at every stage of the engineering crit:

![A series of gardening illustrations corresponding to each stage in the engineering crit process.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAQCBQYH/8QAIRAAAQMEAwADAAAAAAAAAAAAAQIDBAAREiEFEzEiQZH/xAAWAQEBAQAAAAAAAAAAAAAAAAACBQb/xAAZEQADAQEBAAAAAAAAAAAAAAAAARECEyH/2gAMAwEAAhEDEQA/AOdcVHLsVeGyVDWqfMRnBfX2h24BzSLUlxS+pgFN/md7q6mERojT7efYoEm6vv8AKrc21TMZymqzP8k0hmQEpFxiD5RUuXnOTZYeeCcygDQt5RQjBqXw/9k=)![A series of gardening illustrations corresponding to each stage in the engineering crit process.](https://cdn.sanity.io/images/599r6htc/regionalized/9c4dc06426d780986529b4e3edcae2066d5edbf0-1056x704.jpg?w=804&h=536&q=75&fit=max&auto=format)

#### [Step 1: Scope](#step-1-scope)

**Goal:** Gut check concepts with a diverse group of people across engineering, design, and product management.

The AI team kicked off an engineering crit by exploring how we might leverage AI to empower users to work more efficiently in FigJam. We’ve been thinking a lot as a team about how to bring AI into Figma and FigJam, so the design team began dreaming up “what ifs” while the engineering team started reasoning about this problem space at its highest level, offering context around how prompt engineering works. The AI team shared one requirement: AI features need to read and write content on the current file. Other folks with expertise in areas like machine learning helped provide more information from various perspectives, identified challenges, or surfaced relevant solutions we’ve used in the past. The team shared four options, each with pros and cons, and aimed to get a sense for overall feasibility and architecture. Ultimately, they came away with a gut check on which approaches might be realistic, and which might be particularly challenging. Based on the feedback, they were empowered to take one of the options and start running with it, prototyping out an end-to-end functioning flow.

#### [Step 2: Iterate](#step-2-iterate)

**Goal:** Solicit feedback at a regular cadence as the work evolves, addressing new challenges and revisiting early work as needed.

Next, the team sought feedback from a wider range of engineering teams because building AI functionality into FigJam required touching many different parts of the Figma editor. At this point, they also wanted guidance on how to score AI models. They posed a question to the group: “How might we improve our processes around measuring quality?”

In response, crit participants shared that the current system for quality measurement was manual: a large spreadsheet with an evaluation of how comprehensive, precise, structurally sound, and useful a model is. Rather than trying to engineer a quantitative approach, the ML team suggested focusing on qualitative attributes by running AI feature bashes for feedback on AI summarization and generation; since the dataset is so small, a more quantitative approach wouldn’t have been statistically rigorous anyway.

#### [Step 3: Refine](#step-3-refine)

**Goal:** Focus on polishing specific aspects of the project with relevant experts.

When it comes to building AI features, the devil is in the details. In this case, the team chose to do another deep dive crit specifically on versioning and got more feedback from the ML platform team on how we want to think about updating the version of our AI prompts and safely roll-out changes. In doing so, they learned about an existing versioning system we already use in [Figma’s multiplayer technology](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/), and went back to the drawing board with this newfound knowledge. This system also helped inform the technical details around data input and summarization.

#### [Step 4: Review](#step-4-review)

**Goal:** Make any outstanding decisions and review the plan holistically.

At this point, the team made final decisions informed by earlier crit feedback. In this case, they didn’t need to attend a crit because the directly responsible individual (DRI) had enough information to make a confident decision. They were empowered to move forward, without working their way through a more formal approval checklist.

#### [Step 5: Ship](#step-5-ship)

**Goal:** Attend technical reviews as needed, move forward with the project, and schedule any follow-up crit sessions for further work.

While this project didn’t go through a formal technical review, the working group did follow up with specific subject matter experts and stakeholders. After getting the green light on implementation, the team shipped [FigJam AI](https://www.figma.com/blog/introducing-ai-to-figjam/).

[![An abstract wireframe in FigJam with a thumbs up.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB2ElEQVQokY2SO28TURCF/e+REA0NBUgU/AEaRAEUNEiIIFkoCpCkMDGK117b613vfc19zId21xCXFEe3uKOjc2a+GapQAmQzqXgoAprR4Q/G9381o0TwSzh+nWSuICwh96CFwfLcOKWMhEh0hWiV6BMppn8zM7KD7jNUL2H1HNav4PARYo1qeUiIUkomBIe1FjEJMYXeCJ0LSJoazcgWmg+wfAx3j9DfT9H9W1TWaEkMDYa3qCC5w4QNJtRI7PESqW1i2QX2xhNT+mv4Hl0+gdULdPcGPV6gskHlgNqK4raINBzDHQf/nTZc04cVne1ZG+FX66kOR7wPU2UdKt4/Q7evoZ+DuwWpwVbo4ZrcLrBmRWN/snUX7Nycpl/QdA07G6htpLXhlHC4sLlCm3fQfkLNJbm/Jro1JRzAbSh+j8jhLOENJlRTQhtZuUKflDJdWdBwP5maS2L7jW4zp9kuCN5Me9RM0UhIHcbXONkTkx13uB0MTcKkMhI4YqNSgbtBzQ/sbk69/MLm/gZjekp5QCbnhPcO7zziEsEleus5Ok/Mw5UHwwHg1IJUY1LXLWg2t7T7ihD8ia9zDhNx4NDnkUEJQkrxjMOR8HzCI1JyIEZ/GnoA+/8EfwAyVlGUDmfRvwAAAABJRU5ErkJggg==)![An abstract wireframe in FigJam with a thumbs up.](https://cdn.sanity.io/images/599r6htc/regionalized/ae1c410c4aae6881124858b1ce46ed6623a80f61-1706x960.png?w=1706&h=960&q=75&fit=max&auto=format)](https://www.figma.com/community/file/1259186143617682581)

You can try out engineering crits with your team with [this template](https://www.figma.com/community/file/1259186143617682581), the same one we use at Figma.

Many projects won’t fit neatly into this structure; some steps are collapsed into one crit, while others require a series of dedicated sessions. Still, these five steps are helpful scaffolding for anyone who isn’t sure where to begin. As we continue to evolve the process, our priority is making engineering crits a process that teams look forward to because it accelerates their work, rather than feeling like it gets in the way.