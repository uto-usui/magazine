---
title: "Design from the inside"
source: "https://mattstromawn.com/writing/design-from-the-inside/"
publishedDate: "2026-05-06"
category: "design"
feedName: "Sidebar"
---

Imagine you’re an architect hired to redesign the floorplan of an office. The company hiring you has grown from 10-100 employees and wants to make sure the space is easy to navigate and the common areas are in the optimal location.

You ask the client for the existing floorplan, but nobody can find the original drawings. They’d be useless anyway, because as the company has grown, the employees have been given license to change the space as they see fit. Their modifications range from simple decorating to major renovations. One employee walled off an entire corner of the office for themselves and nobody has seen them in weeks.

No single employee can draw the floorplan from memory. Walking the space, you discover they’ve added three sets of bathrooms — as the office got more and more byzantine, it became easier to hire a contractor to build new bathrooms than to find the existing ones. Signage is a joke, and asking for directions is useless: everyone thinks they remember where things are, but their memory is inevitably outdated or otherwise biased.

This is the reality of design at high-growth startups in the AI era. Engineers can build _so fast_ and _so independently_ that trying to map out the product area is a lost cause. Some of the traditional tools of product design — mapping and evaluating UX from a bird’s eye view — are useless. So what do you do instead?

You have to stop thinking like an architect. An architect designs buildings from the outside. They use floor plans and elevations and other schematics to paint a picture of an ideal reality. They create a ‘source of truth’ that is used to coordinate engineers and builders. This is the old world of design. In the new world, the building needs to be designed from the inside. There is no ‘source of truth’ when everything changes at every moment.

You do not wait to build consensus or gain a full understanding of the office to start making changes. You buy a roll of high-viz safety tape from Home Depot and start laying it down on the floor. In some spaces, you tape the outlines of more efficient walls. You put tape across the entrance to a few dead-end hallways. You buy a ‘wet floor’ sign too and put it in front of some of the bathrooms with a post-it-note saying ‘closed for cleaning.’

The staff start subconsciously heeding the taped-in redirects. Without realizing it, they are moving through the office more efficiently, congregating in common spaces again. They’re delighted to see their old colleagues, many of whom they assumed had been laid off. One team tells the others that they bought a snack machine, and new hires explore the far reaches of the office they’d previously never have seen.

As one-off spaces and facilities are abandoned, you start to knock down walls. What before would have been a code red fireable offense is now completely unnoticed. The newly-available space is used to slowly expand hallways, adding a few inches of space at each pass, staying just on the edge of notice. Everyone gets a little more vitamin D. Fewer toes are stubbed on sharp corners.

Each improvement brings new problems to light: now that the main bathrooms are getting more use, we’ll need to put in changing tables for new parents (the company was started by 20-year-olds who didn’t think about that when they moved in). We need to have quiet areas to balance out the noise created by more spacious open floor plans. But each problem can be solved from inside the office, taping off areas and redirecting foot traffic, manifesting desire paths into the world.

For designers, our tape is code. In the same way that the inside-out architect redirects traffic, we can make small changes to product surfaces that incrementally reveal improvements. Ship like a developer, flowing your pull requests into the CI/CD pipeline as if it were just another Typescript file.

How do you design from the inside?

-   **Work in the codebase.** Resist the urge to create prototyping sandboxes and demo environments. If you need someone to translate your designs into the codebase, you’re on the outside, not the inside.
-   **Create tight links between your design environment and the real product.** Use real data from your own API endpoints; make sure the design tokens map 1:1 between Figma and code; work at realistic screen sizes and under realistic test conditions.
-   **Ship.** Put your code up for review. LLM coding agents can turn what you’ve built into production-ready code with just a few prompts.
-   **Build rituals, don’t introduce processes.** Instead of introducing a new process and asking (expecting) your collaborators to follow it, simply behave as if the process is already in place. Want your team to start using PRDs before building? Make the PRD and send it out. Want to do an implementation review? Put it on the calendar. Repeat a behavior enough times and it will become ritual.
-   **Collapse feedback loops.** Don’t wait for a summary of support tickets; do support rotations, and you’ll have all the input you need to fix the real problems. Ask an LLM to write SQL queries to get the data on usage, don’t wait for a dashboard or UX whitepaper. Instrument the product yourself, then push changes that move the needle.

Don’t ask for permission or seek consensus; design the product from the inside.

I'll send new posts to your inbox, along with links to related content and a song recommendation or two.