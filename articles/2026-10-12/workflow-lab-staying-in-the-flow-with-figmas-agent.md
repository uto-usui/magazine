---
title: "Workflow lab: Staying in the flow with Figma’s agent"
source: "https://www.figma.com/blog/workflow-lab-staying-in-the-flow-with-the-figma-agent/"
publishedDate: "2026-10-06"
category: "design"
feedName: "Figma Blog"
---

_Welcome to Workflow Lab, where we present a [sample workflow](https://www.figma.com/blog/workflow-lab-moving-between-design-and-code-with-agents/)_

_using Figma products and tools._

###### Workflow fact sheet

**Figma products:** Figma Design

**Tools:** The Figma agent, annotations and comments, libraries, variables

**Skills:** `/repair-library-usage, /compliance-review, /document-component-enhancement`

**Team:** Designer, design systems team, security and compliance partners

**Question to solve:** What if the Figma agent handles the busywork while you focus on the deep design work?

Using AI in a design workflow means constantly asking one question: What needs my judgment, and what just needs doing? This sounds obvious until you’re up against a deadline _and_ you still want every product and design call to be yours. Follow along as a designer at Offtrail—a fictional app for local outdoor meetups—works out how and when to hand something to [the Figma agent](https://www.figma.com/blog/3-ways-product-designers-use-the-figma-agent/), from cleaning up outdated components to drafting a spec for the design systems team.

## [The problem](#the-problem)

The Offtrail permission settings don’t currently offer a way to let someone host a single event, so the team wants to add temporary host permissions that expire after the event. The designer picks up the brief: update the permissions experience to let someone join as a host for a limited period, show when that access ends, and give group admins a way to manage it.

The existing permissions experience already needs updating. Some frames use current components and variables, while others carry deprecated instances or values someone overrode by hand. Since the temporary-access flow builds on those screens, the designer needs to bring them up to date before going further.

## [Inspect and repair with the agent](#inspect-and-repair-with-the-agent)

###### Zoom out

Maintenance _is_ design work. Replacing an old component or repairing a variable binding isn't as dramatic as generating a new screen. But repeated across a product, those small decisions determine whether a design system stays coherent or slowly becomes several systems sharing a name. The agent can do the focused inspection and repetitive repair. The designer still decides what the exceptions mean.

Before the designer starts working on the flow, they need to know which parts of the existing design file they can trust. Is this component still current? Is that variable binding wrong, or was it meant to work this way? These details help the designer understand which parts of the old flow need to be updated.

Nobody has time to check every frame by hand, which is probably how the file drifted in the first place. That’s where the [Figma agent](https://www.figma.com/blog/the-figma-agent-is-here/)

comes in. Before designing the feature, the designer selects the frames they expect to reuse, opens a new chat with the agent, and connects the current library. The designer uses the [`/repair-library-usage`](https://www.figma.com/community/skill/104170/repair-library-usage?q_id=2eddab8f-3811-4bd7-a171-81d4a410d754) skill in an agent chat to inspect the selected frames, compare component instances and variable bindings against the current library, and replace deprecated ones wherever a clear, updated equivalent exists.

The agent applies those straightforward updates directly. When the right call isn’t obvious—for example, two components in the current library could both work—the agent leaves that case unchanged and annotates the frame with what it found and why it stopped. The goal is to update the part of the experience the new work builds on, not to clean up the entire file. So the designer resolves only the cases that affect this project, then moves into designing the first pass of the temporary-access flow without bouncing between file maintenance and feature design.

![A chat input field with a chip reading '4 selected' above the typed command /repair-library-usage.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABh0lEQVQ4je2UzW7qMBBGef9nIkjskLpgwV9D4W6aewEV2uDEJo49PldOqBpaSquua+nTWIlzPPONnd5kMmGz2WCtJYTAT4aINN9rren9Avn18MMIVyS3jo0EqAUqf5ZrY+3BCfjwUU6E6hpQJGBdIK8C2zLwVwmPRyFTgScdKOt2M3cBA+uFU/UJ8OQCB9OC/rwIDwfP+kX4VwjKtgDplhti9jeA1geUjRkJ20LYFMKuFPZGOFbxfQvqelrfAtY+ltZmudfSxOeT8ByjkaaC7pUPXwFbT2Izwpv829zLJUy+Krnx6JzBq09dQHcem2PfN2U6nV6WHKFemrP12e8sdjfa8ljAQw6H01VghRdp0q+dwzlHEKExrKO4SfT5yQh3u0CSRbBQVRZjTAvMsgylFNoYCm0oSk1ZarQ2zbP3imv2yrDaG2Y7wzbXHJUiz/MWmKYp6/Wa1WpFulxyn35Pi7Pu05TFYsF8Pqc3m80Yj8eMRiOGwyGDwYAk+abOawdJQpIk9Pt9/gPmWAWNCLF7tQAAAABJRU5ErkJggg==)![A chat input field with a chip reading '4 selected' above the typed command /repair-library-usage.](https://cdn.sanity.io/images/599r6htc/regionalized/caf79ca91212421b2e535e71cd31e1103f83ed5d-1056x1056.png?w=528&h=528&q=75&fit=max&auto=format)

Inspecting and updating outdated variable bindings and components with the /repair-library-usage agent skill

![A dark invite screen with a 'Pending' chip connected by a dotted line to an annotation card titled 'Visual shift,' which explains that the chip is wider and the label is larger and bolder, while the label text, inactive state, height, and placement stay the same.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEBklEQVQ4jZWU609bZRzHz6tN3Ry3TSj30tJTKC2lUAqjHSDXDXGug7Ehjo1lm3E6NTHxT9CoiUaHg8DC1LBMt6kwA2Ps7hZ9OVkU0IzRC3JdyyzIy495Hq5xWaIvPjnPSZNPv7/LcxSfz8uT8Hr/P8rgb4M8iaGhIUZGRvB6Pf9d+MF7H/Oh5JNV3l+kraWD27d+4sF9D16PH5/Pj9+/is/newzFrDowG3Ixp66SYcjFojqoqdrPmdZefr0zxf27QSa8AQKBIMFgkEAgwMTEBB6Ph9EHoysosZF6Nm9MImx9LGHrFtm0TkPEM/GUF+ym89Or3O2dZfh2iCnPHKG/5pifnycUmmN46A8udvVwtvMcZ8+ck09FqzGhCdcR+XQC4evjJEIatSGR6vI6ur++wu8Df+IZnmJmcpbZ2UfMzc0RDATp/r6H+tomtjkqKMqvpDCvEiUuKhVNuJ7oTVqiw3TEyHMKmgg9u6rqudRzWU58Ynxcyubn/2ZhYYGZmYd0nPoKm7mAsPUaIp6Kl2GUlNgMBPoEC+ZUBznmbViNBaRr7ex1H+Typav4fX7G/GNMTk7J/oVCIXn+4nQnBY4SNFE6YiNTZQjFmJSFIdGKUWuTMpejgvysEqxqAfU1TYvCNVMdGxtjenqa8fFxzn9zgT3uelx5pRQ5d1DorELRxWag1SymNCRmkqbNRhV/kmClblcj/X3X5DQFQjI5OSlTPpyZoediN4cbG3FXv8T+lw9y+NAxlHQpsJGakIk+3ow+3oIuzizf69yN9PVeWdkxkVJIhfDR7Cw3rvRx/MgB9u7czqsHGnj37bdQcjJcZKp5GJNtsnSBkImUImHPD32Mjoqb4lkq2c/09BQPZ6a53t/LO8eaeMVdwZEGN28ebUQx6e2yzGXZCglWdlbu4dvzXXg8XgYHB/nx5i1uXuvn59vXuXOjn7bmjzi0r5ra7U7qqoqp3VGMsiwQidJTcsjQ2zHp7DJxibOKjvYvGRoa5rsLXbx+9DUO7qvhjaZ9HD9UT8PuCipdWZQ6TJQ4zBTZLSiiPIGcdLJNSgUioSu3nJYT7QwM3KP183acuYWoiSlk6g3YVCM2o5EsVaDKp82YLoSiZ6ssprWii7PgtJdx8kSbFLY0t+PKLSVNa8ViyMGky0JNMmNIFNthRhUkmVdLXstaoRAN/HKP1uZTFG/dIXd1a3YJ2SYnaSmP915JfC6Nf5MUnUbCFiP5tudXShZicVfFRuRkOFc2Y7llyyhbNiYjeXaJpffNG5JkmpOfrZYshFY1n9zMQvlbVnoBFjVPfvJE38VglZiwFGLCdPKLo4nQybMQistuMzlXhGIoJc4XZLnlhS9SUbyTMle1bIPLXka2ySXX7x/sna3Hdq8O/QAAAABJRU5ErkJggg==)![A dark invite screen with a 'Pending' chip connected by a dotted line to an annotation card titled 'Visual shift,' which explains that the chip is wider and the label is larger and bolder, while the label text, inactive state, height, and placement stay the same.](https://cdn.sanity.io/images/599r6htc/regionalized/a74b248a1cb45c77e9698dbb3ea5d0e74abcab91-1056x1056.png?w=528&h=528&q=75&fit=max&auto=format)

Agent annotations for component updates that involve a visual shift

## [Review the flow and work through the feedback](#review-the-flow-and-work-through-the-feedback)

###### Zoom out

Words are part of the flow. The agent can pull in brand voice guidance, generate alternatives, and try the screen in other supported languages.

With the source file repaired and proposed enhancements designed, the designer takes the temporary-access flow into a design crit. Some feedback is straightforward: clarify the expiration copy, tighten the hierarchy, make the recovery path easier to find. Other comments raise policy questions about whether the UX meets Offtrail’s legal requirements. What happens when an invitation expires before it's accepted, or when a permission update fails? What does a member see if their access ends mid-session?

Right now these are all just comment threads, and it’s hard to tell which carry a clear action and which need a decision. So the designer asks the agent to sort through them. The agent reads the conversations, groups recurring feedback, surfaces contradictions, and highlights any open questions. This gives the designer a short, high-signal brief of what to act on and what still needs thought.

Reviewing designs by bringing in external compliance guidance

![A dark guest settings screen with two annotation cards flagged by dotted lines. A red 'Compliance / Escalation' card reads 'CR-1 — Guest host data access scope undefined. Escalate,' and a yellow 'Compliance / Safety' card reads 'CR-4 — Remove from group lacks confirmation and consequence summary. Revise.'](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAbCAYAAAB836/YAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEuElEQVRIiZWVaVBVdRiH/do0NbmUBoogl+0ucIF7WRWxNA0VgVAraCElTR0xRTN0UkS2i9I02qBD7jEKMaSliYDbxRjBlBlZlEXhLueuQBCIH5/mHgS01fvhmfd8Oc95z3nf3/9McPd04Y0QKV8lLyEzJY5F0SoC1DICQhVEzg0jJzuX5qYWjEYDOp0OvV7/n0yQ+LqxMEJO4acJFKensGr5IqKiggkI9iF8tprcnDxnhe68GSEnK2UppXs3U5yTweY1SUTPVhIaGkz2Xic79JNKmD9HxYYVMRRuWUtR1g4y01J5e64aVVAgWXtynBPK/aREqUOIjY5m+VsLWLlwIXHzolDLfFDKA8jane1kh7P8kXkqUXgqkXsGIPNQIPOQI3H1JlAawt7dTn7DAJ8w/DyC8ZoRMIa3mxKJqwKVYg45mRpRKBiN6HU6DHr9XzA8KwyURiDzVIsSUeimxNstEMl0f9SKKHIzNdy7dQtrYwPmm1rM9dontRbL3dvYDXpsViuCIIwL5V4h+MwMFKUOHNejwrzd+XRor9J7sRx72RFsZd9hO1OM7Yej9Fw5z6C+i8E/BrBarSPCIGkkAb7hyCVq8dVHOlXi6aJAJZ9DXmY+nY136GtpxP5bHZaGG1jqa7E23MDW3MiA1cLQ4CA2m21E6O8ThsI7FLkkBF+PYLGzWa4K3KfJcDwsZ4+G9vtt2G02zGYTJkEYwSRgMZvp6+ujv78fi8UyIoyJTWLJsmRi4z4gTiSZ+Lhkli55l/jYJAoLDtDa0orZbMYoCCLCKCaTKHJgdAzNITx2/he+v1hJWWUlZ6uruHClhmqtlgs1lyk+epKTJ07TdLdZvOG51uZ8bTVVN69Ref0SVdpL1N+p44GunS59J9U1VZSXVTwRPucebkv/jF27tpCxI43tOzehKcikovw4ddfOcbb0OKUlp2lqckKYkLiYFStjWLV6MRvTEsjY/iFHvt3J1Z8PUXHqG86cOulch+vSN/BR6vusXbOYzB3LOFiQRNmRrVwq3UdJUS4lx445J/wkNZXlK99j4fxoYheEkLIiik2rl/HF+o/ZumEdhw8eornJiaEEySOQe4fg/roUl0keTH/VHYmbD0H+4cQsSmR/wQFRKBgdme3GYHDkWTdSDQaRZ4QuEyVMe8WTqS97MPlFNya+MJ0pL81kxlQ/wlQLyMvez72meqy6OswPajA/vIz54RWsunrs1m56euxiSsayPOM1P0Sm+OIy2YfXJ3nhOtkH1yneKKWR5Gbl09F8ld4HpVhai7C1FmG9d5iehxUM/t7J48ePGBoaGs9ypFyFg3C/INRe/qgkCrEGzZIxLziS/bkaOtvu0Gu6jbW7FkvXdSxdWuzG2/T3CQwPP2J4eHg8ywWJ/uxL9EfzjoL8eBl58TLyE+RkxfrxZXwExYUa2tvasVktCIIBo1Ev4siyzW5jYGBA7HBMqE0P4m9sC6b6cyUn1s/jdNHXtN1vx2IZOfMEk+NgMIlYrFZ6enro7e0Vsy4KzxWk4eCnp9mXRkX+Rko0GVz8sZyOjg5R5lgdB4IwWscPitFpT2ioq+OfqP+1jls362lpbqG7u/t/929sbfTiP+HfeD7J0/wJ7us/CZ6y5hgAAAAASUVORK5CYII=)![A dark guest settings screen with two annotation cards flagged by dotted lines. A red 'Compliance / Escalation' card reads 'CR-1 — Guest host data access scope undefined. Escalate,' and a yellow 'Compliance / Safety' card reads 'CR-4 — Remove from group lacks confirmation and consequence summary. Revise.'](https://cdn.sanity.io/images/599r6htc/regionalized/b8dafe1b5432b7b98cac9fc43d7c238761b406f9-1056x1408.png?w=528&h=704&q=75&fit=max&auto=format)

Agent annotations flagging potential compliance risks worth revising or escalating

One thread stays open. Some questions about legal requirements remain unresolved, and nobody on the design team is sure how the policy applies here. Instead of guessing, the designer asks the agent to run the team’s [`/compliance-review`](https://www.figma.com/community/skill/100343/compliance-review?q_id=731dc5fb-45e5-4964-861d-37a79f909c52) skill against the flow. The skill contains a reference to the checks that the company’s security and compliance partners maintain, so the agent arrives with the questions those partners expect designers to ask when access, identity, and permissions are involved. The agent returns its findings in context and annotates the frames each one applies to.

The agent gathers the context it needs from the external document the compliance partners maintain, then reviews the designs and applies guided feedback. As a result, the designer can spend less time reconstructing context and more time deciding what those findings change about the feature.

## [Generate a new design system spec](#generate-a-new-design-system-spec)

###### Zoom out

The agent can show its suggestions before making changes. The designer prompts “Review the selected frames against the connected library, list outdated components and variables, propose current equivalents, and flag any ambiguous matches. Don’t make changes.” The agent reviews the designs and writes each finding on the canvas, next to the frame it applies to. After reading them, the designer asks the agent to apply only the matches and leave the ambiguous cases unchanged.

The Offtrail design system leverages a component called “item row” that’s a versatile component used in lists to display things like settings, documents, or users. But the [`/compliance-review`](https://www.figma.com/community/skill/100343/compliance-review?q_id=731dc5fb-45e5-4964-861d-37a79f909c52) skill surfaces a requirement the item row component doesn’t currently support: the design needs to show when a user’s temporary access expires. A new, custom component not only broadens the scope, but also detaches the experience from the Offtrail design system. The more durable route is to enhance the item row design system component itself.

By now, the feature work is nearly complete. Starting a separate design system handoff could potentially delay the project and require the designer to context switch to create a component-level spec document. Instead, the designer asks the agent to draft a spec in a new section of the Figma file using the [`/document-component-enhancement`](https://www.figma.com/community/skill/104032/document-component-update?q_id=2306ea21-afed-4ff0-bd7f-8c926a3e9b3c) skill.

Working from the current component finding and the surrounding design context available in the file, the agent outlines what an update to the system may need to support. The spec describes how the component should behave, where the current one falls short, and which states are missing, while highlighting possible changes and open questions.

![A document titled 'Component Update Proposal: Row / Person,' marked Critical, with sections for what's changing, a side-by-side comparison of the current and proposed row states, and a property comparison table. Annotation cards on the right cover tokens, structure, variants, and usage, including a narrowed identity width and a new circular progress indicator.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAChUlEQVQ4jY2UW2vUQBTH+6m8ggq1+KBv4osPXkC/gBeqllprqWtFqhUvVOizgo8KBb9BHyq+uWZ3290kM5P7JmlmstnbX85sE1q04MJ/TzLJ/M45/zm7U6ZpwrKsSrZt/7fKPaZpVpqiLyEEgiBASApDRFH0T8VxjCRJKtEexthhIGXwfR/dKELg+/r6oGgTwdI0Ra/Xw2AwwHA41DHLMghHHAEMQ/ieB++AaL2E5XmuQeVnPB5DKgnucNjMBudc26CBVEWapEjiGHGc6Na63W4F6vf7GjYajTWoVCYzMIeBC64LIKgGkm9SKr2ZIlVFL4RhhL29PSiVoyiKSbujEUb7UrmC53twPa/yUwMJUPpDkaoTwoHjuDoZQSlZCSUYVSzzHI7vw/V9/V4FpBsyWCkFKSVcx0XTaKH+y4BhNNFpm7BthnbbxO5OW0fGBLwghMkFbD6Zkqpl7WGaaijnAt++buJFbRVPHi9jafE53qy9x8f1DazUXuq1xYUa1j9sYHv7J2xGHgp9gIc8LM1vNlt4tryCmelLOHnsLM6cPo8rl6/i5vVbuDBzEaeOn8PpE9O4ce02Nje/gwunml2a5788ZIzj86cvmH/0FPfvzOHh7AJWaqtYe/0WC/NLmL07hwf35rH26h22tn7A4j78MEKkfd8HUgbyj6qk1i3Lxu96A0a9gYbRwu5OB2bHQrPRglE39FqnY8PzAjDhQrjuYQ8JSBVSy3SSWSa1er2iUlH0kasccn+9PxhCZhlcweA4HEFwwENqmWA0rNR2mmZIU5q/Akr1tPKcEikkSQopaYT6Gug5HK5Lp3wEkCL9WrrdpIIRoATSs0myHEoqhGEw+WMJQ+3hH0gDQjcJFPocAAAAAElFTkSuQmCC)![A document titled 'Component Update Proposal: Row / Person,' marked Critical, with sections for what's changing, a side-by-side comparison of the current and proposed row states, and a property comparison table. Annotation cards on the right cover tokens, structure, variants, and usage, including a narrowed identity width and a new circular progress indicator.](https://cdn.sanity.io/images/599r6htc/regionalized/ccfd4816b62d4fe52c7067bb14841b1ea8132d72-1608x1206.png?w=1080&h=810&q=75&fit=max&auto=format)

The Figma agent’s detailed spec generation for the component enhancement

The designer reviews the spec draft, confirms the open questions, and shares the section with the design systems team. The spec sits in the same file as the frames it describes, the comments that raised the problem, and the components in question. That proximity lets reviewers trace the finding back to the flow that produced it, and it keeps the ownership where it belongs. The designer decides how the feature develops. The design systems team decides what happens to the component. And the agent explains what change is needed and why, so that team can review it while the designer keeps working on the rest of the feature.

The product feature team keeps moving, confident that the design system update is being tracked as a dependency to the temporary permissions work. That kind of coordinated division of labor simplifies each team’s scope and allows them to fully focus on their area of ownership. Feature work continues quickly, and the design systems team knows exactly what is motivating the enhancement request.

![Updated design frames for a new feature allowing users to add a guest host per event to an Offtrail guest group](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACuElEQVQokWWSWU9TURSF+9dMjImJikMMmgiOmKiQkCgq8ACKA1KLIFBlkmKhpQqKChQ0KAgoWpk00AFbSm9L6b2dWzrAw2fuxYHEh+/sZCd77bXOOaqAKBKLxXA5V9DrjNSpG+nt0tPb+pCeRxqMTfcxPtJgelzLa30LY8Nm2pp11FSpeVKvwdBYw3CfCbvdgScQRhUKh0mlUgSlIJ8mp3lnHmV++hM/pkZY+DjE/PigUr9PmLF9fc/y4nfGP0xifjXEl/dm5sbesGiZwO/zEoxEUUVjMTKZDLFoDOuilfnZBQS3G5/7J26HFf+qk3WPC8ePeUXM6/Gw7HBiW7LjstsQnHbCop+NZJJEIoFKjpvOZBA8Aka9kRZtK5PjUwwPvqWzTc/Y6Dizlhk6mlvpaGnjrfkdzwx9GJ6a6NIZePViAMHjZXNzk2QyiSoajZJKp7FZbVSWVVB0vojuTiO3KqrJPZjHA3UDA/0DlBQWc6WwmNp79RTkF3Ly+Hnyc89RUlzO7MwC2Wx2W1BxmE6ztGjlWnEpp48XoGvroqpSzdHDp3ig0TI4MEJpSTnXL5dx58Y99u85wt5dB9i3+yAFJy8x/dlCNvvboZxbtmu3Oii7UsHZExd4burnZb+ZJm0HwyMf+Dgxxd3bd1BXV6Otq+dM7jHycg6Rn3OIqxeLmLV8++dQPra2tvB51+jW9dBU18I3yxw+nx/3qsB6QGJuxoLmZjmN1ZWMvDTR296AQXuf7sYa3nS3I6z8ZHOnoOxwY2MDYVXA5XQTDoXJpDPKVvkHyAOjfXrGXvfgWV5C8rkRBRcBwUXQ7yGV3E6pCMbjceUOZeTGThKJJPFEkmgkhOh1I66tEo9FlOUyqT81lVKQtVTBYBD5pSORCJIkIYriX9YDImsBkXVRRJICiJJcpf8IhULKvKz1CyfZ2ZuJ6C7DAAAAAElFTkSuQmCC)![Updated design frames for a new feature allowing users to add a guest host per event to an Offtrail guest group](https://cdn.sanity.io/images/599r6htc/regionalized/7046fb1ac6643a382eebc8fb9babdc50218ddc92-2160x1224.png?w=1080&h=612&q=75&fit=max&auto=format)

The primary screens for adding a guest host, now updated to the latest design system

## [A smoother path to production](#a-smoother-path-to-production)

The one product request the designer started with resulted in four concrete outputs:

-   The agent identified design system gaps in the existing screens.
-   The temporary-access flow now covers the primary path, plus the expiration, failure, and recovery states it was missing.
-   The agent checked the designs against the team’s compliance guidance and flagged every open policy question. It also pulled the team’s scattered design feedback into a usable brief.
-   A design system spec now captures the gap in the item row component, with the required behavior, and links back to the reasoning.

A shared, visual, multiplayer canvas keeps those outputs connected. The designed flows, comments, and annotations stay attached to the work they describe, so the designer, reviewers, and agent can refine the same artifact instead of scattering feedback across separate tools or starting over at each handoff. That’s a much bigger job than “the agent made a screen.” The agent inspected, repaired, and distilled the feedback while the designer made the design, product, and policy calls that defined the feature. An agent is most useful when it protects the designer’s attention by carrying context forward, handling repetitive steps, and preparing what comes next, so the designer spends less time managing the path to production and more time deciding what deserves to make it there.

The Figma agent is available for Full seat users on Professional, Organization, Enterprise, and some Education plans, and [limited availability](https://help.figma.com/hc/en-us/articles/37998629035799-Work-with-the-Figma-agent-in-design-files) on the Starter plan. Collab, Dev, and View seats can use the agent in their drafts.

Dive deeper into how to use the agent to [maintain your design system](https://www.figma.com/blog/figma-agent-and-design-systems/), explore how other companies [use the agent](https://www.figma.com/blog/3-ways-product-designers-use-the-figma-agent/) in their workflows, or read more about how to get started with the [Figma agent](https://help.figma.com/hc/en-us/articles/37998629035799) in our help center.