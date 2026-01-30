---
title: "How to get closer with your developer"
source: "https://www.figma.com/blog/how-to-get-closer-with-your-developer/"
publishedDate: "2020-06-18"
category: "design"
feedName: "Figma Blog"
---

_Editor’s note: The following is a recap from a presentation that product designer [Helena Jaramillo](https://twitter.com/helenajar) recently gave. You can [watch the full presentation](https://www.youtube.com/watch?v=uC4eZs5yj1E&feature=youtu.be&t=148) on YouTube or [grab a copy of the presentation slides here](https://www.figma.com/community/file/839644505292586256)._

I’ve been designing software in different parts of the world for the past six years at places like Google, Transferwise, and Khan Academy. I’m currently at Coda, where we’re building a new kind of doc that combines word processing, spreadsheets, and app-like capabilities so you can do things that range from taking notes to creating your own processes and workflows.

As product designers, we often hesitate to share our work early on, especially with our developers. In my experience, knowing how and when to collaborate with others plays a large factor in a project’s success. Here’s a look at how I’ve worked to bring engineers into the design process as early as possible.

## [Technical knowledge can guide ideation](#technical-knowledge-can-guide-ideation)

In the past, I’ve said things like, “I need time and space to create. I’m a creative.” Or, “If I share this mock, they’ll build it right away,” and I don’t want us to immediately get focused on a solution. But over the years, I’ve learned how to better work with engineers to understand the constraints a lot faster and, as a result, build more thoughtful solutions.

This ideation part of the design process—when you’re trying to understand constraints and come up with ideas—is when it’s especially important to work closely with engineers. Engineers are really great at ideation because they have so much technical knowledge that they can help guide you in those constraints and flag when something unexpected might come up. When you have all of those edge cases right away, then you can build more thoughtful solutions.

## [How to involve engineers early](#how-to-involve-engineers-early)

How do you actually go about doing that? Let me walk through one of the features that we built last year at Coda called Packs Tables.

We had a broader engineering team working on this, but it’s helpful to have one engineering partner who’s going to be there with you throughout the whole thing to collaborate closely and brainstorm. In my case, that engineering partner was Gil. The feature we were building, Packs Tables, allows you to pull in data from apps like Spotify, Google Calendar, and Gmail directly into a Coda doc. You connect to the app with your account and pull in data such as my playlist from Spotify, my calendar events, and so on.

Here’s mine from Spotify:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACCUlEQVQoz42STWsTURSG81Pc+Ed02Y2KWzdd1E12hSIUQYpgwYWCKdZN2mIUKdS2QaXpphKdVDN2MraxSUw0ZGprYpLJZCaZufOV13NvGkpBjRcOh8MMD8/5iFy8fR03lu5gZi2G6PP7mFyaw+TyXUwl7uHms/n/iqnEPK48nsGF2auIXH4YReLjFpRaEVIph7d5mbKKT9VD5LQSFB70TamVTusi9moFiqKoc0dfRV7ZfY1LD6KIXFu8BenbPrpmF/kvechyFtqRhr5tww8CBBSu64JR+L4P5jEYtgGLWfBDH/wNBgNkiMFZAsiLRqOB5OY6luNPoCgyrF7vDOh5cBiDR9n2HLT7OgzHgBd4RPsL0DAM7GUz2Emt43s5TwAHQRgipAiCkGC+MHR9FyYzYbljDC3LQFH9ADX9CvVqAcwZthyGAwHmlsKUWu44HXRZd2j4Z+AB2q2fSKdWsbW6iGpRATs15D9zS4/svHOGvX8ZHqDVrFO7L/Bm7RGqZZmWYJ8DjubJfAbd7tAMxxjqehPSzga2NxZQq2SpPUe0OwKO5ukGYwz5QUqVfbTbTaS3N5F8GkNBzdCWTTGz4VKGp8O33CfzZr9FljrBzwylymdx3JGJ2DTelVUcn/zAy5U44nOzeJ9KQjvWYJim2KzjOOjQFZiWhXq3DuVERf7XoTDlLyQgZ0wsTOM3yK39KZ4Sh2kAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/66791294060fa9c5b7af0f1c7148239319e5ded1-1280x720.png?w=804&h=452&q=75&fit=max&auto=format)

A feature like this is very technical. Since we were working with APIs from different apps, we had to come up with something that would work across all of them. There are three things we did to arrive at that solution: created straw man mocks, brainstormed new ideas, and defined key questions.

Here’s a look at each one:

### [1\. Start with straw man mocks](#_1-start-with-straw-man-mocks)

You may have heard of a straw man proposal, which is essentially a write up or written brief that’s used to generate discussion and to ask questions. Straw man mocks are the visual equivalent of that—they can be simple and fairly uninformed. They’re more about asking key questions and addressing your assumptions and less about nailing down every single detail. The idea is that they should:

-   Be quick to make. You don’t want to spend a ton of time on them because your ideas at this point frequently include misconceptions.
-   Ask more questions than offer solutions.
-   Show variety versus narrowing in on a single thing.

Start by asking yourself how the project would look if it were easy and how it would work. As you’re walking through these mocks with your engineer, proactively drill deeper with questions like:

-   What are your biggest misconceptions?
-   What are you missing that you haven’t thought about yet?
-   What is an interesting direction we might take?
-   What are difficult directions we might take? It’s not to avoid those directions, but it is helpful to hear what engineers find difficult so you can understand those trade offs.

### [2\. Brainstorm new ideas](#_2-brainstorm-new-ideas)

At this point, it’s still early in the process. While you have straw man mocks and your own assumptions, it’s still important to brainstorm with others and visualize new ideas. As designers, we have the skill of being able to bring ideas and questions to life—we do that sometimes for our own ideas, but it’s also helpful to do that early on with your teammates.

To visualize ideas with our engineering partners, we use a wireframing kit. At Coda, we have all our components ready to go, so we actually design in high-fi quite a bit (unless we’re designing something completely new). In today’s world, with so many of us working remotely, you can also just point your camera to a pen and paper or screenshare on an iPad.

During the Packs Tables process, Gil and I used whiteboarding to get specific about the questions we had and draw out some UI. Again, because it’s still early at this stage, we weren’t trying to design the UI. Still, we wanted to make sure that we were on the same page about ideas and potential problems.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5UlEQVQozyWS21NbVRSH86APvjiO+gd0rO3YPnT62Kl2VNDaYcqlUCoPjp3x0iZjb4QAQW7KpZRgQ4u0IAPYEEggB06S0uRgEwIJIZdzkpwkHV/9Vz4X4eGbtWft2d/+rdnb8t79ei6M3KTF3Umj+wGXp36p8Y3wtcvGV5NWvpj4mbP97bx790vesl7k7SNsR3zKO7bP+ND2OR8IR3uWEz1N3JkfYSnsw6tt4d1R8b0O4Y+Fj4mH8GgBhlae0DZ5n/rhH4UfuDJ6i4aHVq5KbR/8iTrHt7x/pw7LmV+vM+mbI3uYplwoUi6WqJZM3lQqvKlWhTKlok48GWf9lcqy6mN5a5XV7Q38UYU1CeLxLdH9dIhT3U0ilFGmNhbI57JUiiaV0jHlcqWGKetCwcDQ8xiGTt7Ik0rvEXsdIbUfQ88dcHiQ4LH/Oef6bxwndPnnyWYymJKuJIKSWRGqFEtVjIKJrhsiLWCWTcxKiXhMY27axTPXQ0JrHlJxjRllgfODHSLsu86j1eccpFLo+YIIShSKZalldMMkmzVIpzNSs9I3KMr4kbDKoN3Od1dbcd6yofy9yBNJeH5IhJ84Wxnz/EliN1E7eJjJkcnlpeZJH+ZIJg/YjcdJJGIkUwn2JE1gZZkBh5PWhg6+b7vJ7JSb8eVpzg3IyKd7r/HbohstqsnBBLuJPRJ7+yJI1jjq7WgRXkoqJbDGi4VZEYwz2OukraWDy/XN2O29dLl/56yEs5zqbqZ/7hFhVSW6HSEaiaJpOyL5h52oENF4FQ6y7lth+o8J+ns6GR/qY6Cvl+amFi5dquP2bSvWkS4+tjdiOeloomdmlA2/j6CyRUgNSpow28LLULh2UVDZYHH+GfbOe9gf3MW79BcB7wtc46OMDQ8zN/sUx+MBTnY2YPmoqxG7e5i1FQ/Kup9NJUBwa7OGuqmgikzxrTIxNkL7jXb6nN0Usyn++1ceTf6mkdpHT6eY8s5w2tHI/xxfYOMb9qQpAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/7bb5935b0973fda273eabab996d90111d5ec21d7-1280x720.png?w=804&h=452&q=75&fit=max&auto=format)

Gil, my engineering partner, helping me whiteboard new ideas

### [3\. Define your key questions](#_3-define-your-key-questions)

Key questions help you answer all the little questions down the line. You can think about them as established principles; they’ll help you make sure you’re tackling the problem in the right order. They’ll also empower you to make decisions faster and ensure that you’re not debating solutions from the beginning.

Here’s a quick non-product example: You’re planning an event and someone asks, “Should you get custom napkins?” Prior to answering this question, you should have thought about your budget, time and resources, and the feeling of the event. The answers to those key questions directly inform your napkin decision.

Gil and I would come up with the Packs Table key questions during our brainstorms and keep track of them in a Coda doc. Then we’d get on a call with all the engineers working on this project and run through each of the questions and the options—we wanted to make sure the team agreed that these were the most important questions to answer (this is also a great opportunity to engage with the rest of the team).

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABm0lEQVQoz5WSS0sCURTH/RZ9hlr3KYJaK5HoskXUwlZRJC2CQFoVBEa1yNQWLXtYizaCD6Iam4msLEodZ5yHju/Xv7lXRjJfNPCbc+dc5jfnnjOmseUpTO84sOB1Yd6zBdvRBqwHTlgPnZjT46x7Dea9FQpZk5y1DzO7Doyvm2GacFrgCngQSjzh7vMZkQ8WkQRLY1jPBV8ecMtGKcH4g55r73XDwRcNwOJehWly04bT6A20UgHVahWVSoVirMvlMkqlEn1uNBpotVp9YZKvWPRvE6Ed/sg1ZFWBls8jp6NpGorFIhUZsmazOVBGLib5hqW20AZv+AqiIkFVVUpel5LK6vU6raoj018k95HCk/AleFmAJEuQJAmKotAKiZDI/jJS6AlfIJlNQ8yKEEWRSnO5HO1hrVbrwvjIEKGdHlmQRV2i0v4VCoVO74iA8C+hLxKApMo9wyB9NDAmT4Qjj3wcOsdX5htpPg2e52lMpVLIZDK0n2RIpOpB0+4R7gfPcP/+iBgXA8dxYDkWDMMgHo9DEARa9bD/8LfwB9pcCjnosbwYAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/3665079907be679064f8bb86576cfcd7c9d4a1c7-1280x720.png?w=804&h=452&q=75&fit=max&auto=format)

Our Coda doc to keep track of some of our questions

It’s not enough to send a project proposal around from one siloed team to another and expect success. Instead, using the right collaboration processes, you can thoughtfully thread the needle between product wants and technical constraints. Ultimately, involving engineers early in the process—particularly with this project, as it was so technical—helped us be more thorough and get to solutions faster.

_You can [watch Helena's full presentation](https://www.youtube.com/watch?v=uC4eZs5yj1E&feature=youtu.be&t=148) on YouTube or [grab a copy of her presentation slides here](https://www.figma.com/community/file/839644505292586256)._