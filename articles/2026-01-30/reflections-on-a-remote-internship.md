---
title: "Reflections on a remote internship"
source: "https://www.figma.com/blog/reflections-on-a-remote-internship/"
publishedDate: "2020-08-06"
category: "design"
feedName: "Figma Blog"
---

_We recently made updates to the style picker, including search, list view for color styles, and text style metrics. Jenning Chen, an intern on Figma’s design systems team, built these improvements over the course of her summer internship. Here, she reflects on her time at Figma: expectations, onboarding remotely, and managing a feature update from inception to launch._

In 2017, I stumbled upon Figma’s booth at the fall college career fair. It was late afternoon, and although my voice ached from hours of conversation, the animated on-screen demo caught my eye. As I spoke with an engineer, I found myself grinning with renewed energy, surprised at how effortlessly our conversation drifted from introductions into a spirited discussion of design tools. While the role didn’t work out for me that year, I was thrilled to join Figma’s internship program this summer.

## [A warm welcome](#a-warm-welcome)

As soon as I started, Figmates flooded my Slack with welcome messages, and my teammates scheduled (virtual) coffee chats for us to get to know each other. Even though the company had grown since that career fair, the culture felt just as open and inviting. Later, my team sent a glorious welcome card—a Figma file filled with warm greetings and doodles. While we weren’t face-to-face, I felt the energy that initially drew me to that booth years ago.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAABk0lEQVQoz42Se1PbMBDE88FpgaTAtJ8NaJs4/N8GmBCc+ClZPp20vfNjiCHt1DM7fszeT7uyZov5N1xeXOP88xyfzi4nujhf4MviBtdXX3ElWsxvTvqONVv+fECSqNZIVslUyyXW9/dY393K/a5T8v0HVsvVR++gmWs8AgfEGN8pILQOfr+D3z7C757B6RZcFYjsT/h7zVrHCCHi+NK3IEDyLaguwUUGLjOEukBwFjEE/O06Ak5XcoFQegtDDbwnsPdgVqk//F/C8SPLgGNC4Q3ypoSxFUjrC9AL+A3Yz/Rh0OkDkGU/27aFE1lJl9V77PMXWAGzLNKlHVLqXA8cwiCeAjKcc510D6s6R5YKsMzB5DogUZ9UvRPgqcq6sprHAaoNzGYHu3mFr6xU92gakhbq4SHlP4FRkmltSWodmkMusBT28QCqGqi/NgRrBUo8qT35y+MK+qwwI0NZmmH36zeKbQpzqOGMHCPSLelFFCazXUI92Dwe7NADtYpWKrIcL5snHJ5ekT3nqNK6qxwG36h4pD+Z/4k4cRV1/AAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/5cd3d83b5529026833129d92d303f1ee477994b3-3222x2002.png?rect=2,0,3219,2002&w=804&h=500&q=75&fit=max&auto=format)

The welcome note sent to me once I accepted the internship offer

## [Interning, remotely](#interning-remotely)

Going into the internship, I knew the remote work environment would pose a few challenges. Beyond the potential for miscommunication or missed messages over Slack and email, I worried that I wouldn’t be able to form close relationships with my new team members. Plus, so much of an internship program is about getting as much context as possible—being surrounded by people who help you learn the ins and outs of the role. Would I feel comfortable asking for help over Slack? Would I get lost in the shuffle? In such an unprecedented time, I didn’t know what to expect.

### [Building relationships](#building-relationships)

Without being able to tap someone on the shoulder, have a spontaneous conversation in the hallway, or grab coffee near the office, I imagined it might be more difficult to interact with those beyond my immediate team. To my surprise, this wasn’t the case. While we weren’t in the office, the team was intentional about creating opportunities to meet others across Figma. Each week brought company-wide events like show-and-tell—a biweekly meeting where Figmates share recent learnings or in-progress work. During our Thursday tech talks, I learned about Figmates’ passions, hobbies, and creative projects (like how [Figma in Quarantine: the Musical](https://www.youtube.com/watch?v=vHXmj3hN5mI) came to life). Through one-on-ones, I gained a deeper insight into Figma’s product and growth, while team activities—like cooking classes, online escape rooms, and scavenger hunts—allowed me to connect with coworkers on a more personal level.

### [Product fluency](#product-fluency)

Before I could dive into a project, I needed to deeply understand Figma’s features and functionality and familiarize myself with design terminology. If I had questions about anything from a new product update to a design concept, I reached out to my mentor, teammates, and Slack channels for support. When I ran into an obstacle, I was surprised by how willing Figmates were to hop on a call and work through the issue together.

## [My first project: style picker improvements](#my-first-project-style-picker-improvements)

I soon learned about my first project: improvements to the style picker, a feature that allows users to browse and apply paint, text, effect, or layout grid styles to objects in the Figma editor. Through meetings with designers and product managers, it soon became clear that these improvements were in high demand from the Figma community. The frustration was understandable—the original style picker became unmanageable as the number of styles increased, obscuring important information and forcing users to manually scroll through long lists.

At first, I was hesitant. Coming in as an intern, I didn’t expect to have responsibility over a popular, user-facing feature. But as I got started, I realized this would be a great learning experience for me, and a way to build something impactful for our users. Over the next few weeks, I worked with [Shana Hu](https://twitter.com/shanawho?lang=en), the team’s product designer, to implement these improvements:

-   **Search:** Users often already have a particular style in mind when using the style picker. With search, users can now locate the desired style within a few keystrokes.
-   **Color styles list view:** The style name—the most identifying attribute for a style—was previously obscured in the grid view layout of the color style picker. The new list view option displays the style name clearly alongside the thumbnail.
-   **Text style metrics (font size/line height):** Font size and line height are arguably the most defining metrics for text styles. By displaying these metrics directly in the text style picker, users save time when choosing a style.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABCcAAAQnAEmzTo0AAADjElEQVQ4y3WUCU/7OBTE+f4faQ9pWQotEOhBD3oftKU0TXM5jhMnmR07RXT3r61kOWmiybz35ucbdw+sxiVm/RyzgeJKL/tl9c3SXAVXdvUs+9n53GgYrZv1uEK3maP3JDAdhlhOIqxnCTZzaffpQKDzkOD1PsGoG2E2Mu8IrKcJVlOB+SjG23NCDSNa4Wber+DcKow6EdxjhCiUSESOVGruGQ67BJ1mRMEIH6sQ/jlGHCn7jogVzqcE457Ay98ZjNbNfFDxRtFJzBcktM5RliWAClVVwvcUHcRoPwT43AaQqURRaPusQgmV5li8s4IGBQdXgm+Oi+Vig81mg6PrQSqNgsL+SbEdMR7/cjEabOC6LtI0pWhB0YqC+kewdgiWnOKxsUGr+Yxmq4XhZI5znEIXJUtK0WkFuPt9C+dphO12iyRJrKCpQikjKK8F2UM6dJ5OGEw/sNps4XpnpJlxWFnBdtPH7W8UdCbY7D4RCgmZFVC6RMReToZ0eHcl+MyhOG2BhZsh4Yumh6Ycs0wPu48Rmrcehu9fWB88HPwEJwqdObiDr9DnUJzvoSxMD+/MnxEOnkCSKuhcU5Q9KjWC82UorQi7XYxTGMHn8ARLlXQYxBnGQ/EzlI9ZheFLhsUogMev+66gSMpoSCiR8l4xFhLvXQn3oBir1EZGqQp5Bl4XzCtj96phtG72K2DSKzB9Y1jHIRcDOzGhFtjOTYAp2KWLTsb/M3wsFHbLHPu1xudG2+v5IMeUGvsVBU26uw+5jcZ0GGAxjkiAISWxoiafbUNK4z+kzK5JEb+SMmxHOB5ChIGwhMiEJAhFUoQlxbmj+7lPmnwEvrC0xFEKjy0as///mrIJ9qRvkEqQ66weSFWTElxIMaJf+5gZFOxfitIE+0LKkm1qX5NiHPauSPmypOQ1KV5NitMIsCbLZ1YQ0blUFNMVrzWmI/krKU+ND7RajiVlMJ6RFGlJ8b9J+eOIdu8T862PLXE8BCV4lmB30nhjCpzrko3DmpStJeV4OpOEmhTfq0lp/HnE6P2EPU8XN9TwYlKUAF++xqAvmeWrkg0pL+0Ey1MG8T+kvN6HHFrNt/mQLiru4OmjMb9meXEZSr97IUUq5LlxV9jhfA+l24pZfm4PBPur6j2jAZPbzv3F4XJU8UTmedg/wzseEZ6DmhJOsshT3qcYvAqbNd/LaudW70dwPZPotThtav0DhtPQFtv+XSYAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/b294570a8997de5e0e7dfb794b723d1dba6e2090-1608x1654.png?w=804&h=827&q=75&fit=max&auto=format)

Toggle between a list and grid view to quickly browse through styles, or find a specific style with the new search bar

Since the design systems team is structured vertically, the project involved a continuous exploration of the stack. Through working with Typescript and C++ in the editor and Ruby in the backend, I gained hands-on experience with the full suite of web technologies.

As the project neared completion, I presented the feature internally during show-and-tell. Figmates filled the Zoom chat with enthusiastic and supportive comments, immediately calming my nerves. Still, the implementation process came with challenges. Before launch, we needed to migrate millions of existing text styles in order to populate their metadata with text style metrics; running the migration alone took an entire day! Other challenges included incorporating feedback from critiques and making last-minute bug fixes. These obstacles were tough in the moment, but they ultimately helped me gain a broader and deeper understanding of the codebase.

Once the updates were ready to go, I worked with our data science team to make sure we were tracking the right metrics and with marketing to finalize the details of launch day. Everything was coming together, and we were in the final stretch! Launch day soon arrived, and we flipped the feature on, excitedly refreshing the Figma editor as the reactions on social media came in. Reading through the comments, it felt surreal to see the feature that had been guarded for so long finally in the open. As my mentor Josh put it: “It’s the high that keeps you going.”

## [My learnings](#my-learnings)

Based on what I had heard from peers interning elsewhere, I went into this internship thinking that I’d work on a specific part of a feature. Instead, I got to experience what it takes to ship a product, end to end: conception, critiques, implementation, metrics, promotion, and launch.

While it feels like the internship flew by, when I think back to my first week at Figma, I realize how much I’ve grown as an engineer. True, I’ve learned the rules of React Hooks and the dangers of props spreading, but I’ve also experienced the more nuanced parts of engineering at Figma. Cross-functional interactions improved my ability to communicate technical information, while design critiques, bug bashes, and collaborating with designers sharpened my intuition for product and UX design. Most importantly, assuming engineering responsibility for a feature boosted my confidence, and I feel ready to take on a new challenge.

In an era of remote work and uncertainty, I didn’t know what to expect at the start of the internship. At best, I hoped to gain a sense of Figma’s product and culture, but instead I found myself enveloped in truly meaningful projects and workflows. I’d like to thank my mentor [Josh Shi](https://twitter.com/unfollowjoshshi?lang=en) for his guidance and feedback.

As our team grows, we're excited to see more students, educators, and classrooms using Figma. Learn more about the [Figma for Education program](https://www.figma.com/education/), which includes online courses, bootcamps, school-sponsored hackathons, and more. If you’d like to connect with other students in our Slack community or have more ideas on how Figma can be even better for classrooms, we’d love to hear from you at education@figma.com.