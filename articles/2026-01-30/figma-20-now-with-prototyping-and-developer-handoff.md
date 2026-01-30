---
title: "Figma 2.0: Now with Prototyping and Developer Handoff"
source: "https://www.figma.com/blog/figma-2-0-now-with-prototyping-and-developer-handoff/"
publishedDate: "2017-07-25"
category: "design"
feedName: "Figma Blog"
---

Big news in the Figma house today — we’re excited to finally unveil [Figma](https://www.figma.com/) 2.0. It’s an expanded version of the product you love (or at least like a lot, right 😉?) with significant new features: Prototyping and Developer Handoff.

In Figma 1.0, we laid the foundation for design in the cloud, creating a product that wouldn’t require any saving, exporting, syncing, or emailing. We built features to help designers work better together, like [multi-player functionality](https://blog.figma.com/multiplayer-editing-in-figma-8f8076c6c3a6) and [team component libraries](https://blog.figma.com/team-libraries-in-figma-409fa5e20f7).

In the months after our public launch, we learned more about the depth and breadth of designers’ pain points — namely, that they stretch far beyond the friction of working with fellow designers. For a truly streamlined workflow, designers need to be able to collaborate with everyone from the marketing department to the executive team to the engineers building their designs.

> If Figma 1.0 focused on making it easier for designers to collaborate, Figma 2.0 is about empowering entire teams.

Our true north has always been helping people build better software together, and Figma 2.0 is the next chapter.

## [Prototyping](#prototyping)

Designers need a way to present their work that’s expressive, clean and intuitive. Whether to show work to fellow designers for feedback, pitch plans to executives for final approval, or see how users interact with interfaces during testing, prototypes play a key role in the tech design process.

For months, our users have asked for this kind of feature, but we’ve dodged their requests. We [already integrate with great products like Framer](https://blog.figma.com/introducing-figmas-integration-with-framer-c69a747aeee2) that have made this their core competency, and we’ve wanted to stay focused on building a world-class design tool.

But as we talked to more of our users, we realized we couldn’t ignore prototyping forever. Designers were desperate for a solution that would let them create and present in the same place, with one single source of truth. Since we’re the only interface design tool that runs on the web, we’re uniquely suited to meet that demand.

### [Fun Figma-fied features](#fun-figma-fied-features)

Although Figma’s prototyping feature doesn’t cover all scenarios, it works for the needs of many of our users. During early research, almost all the designers we talked to asked for slideshows and hot spot functionality over advanced motion graphics.

> In Figma, the prototype is a living document rather than a dead artifact.

We’re excited by the opportunities our cloud-based technology affords us here. In Figma, the prototype is a living document rather than a dead artifact. As you make changes to the original design, they’ll be reflected in real time in your presentations… no exporting or syncing necessary.

**A few unique features:**

-   You can tweak frames or add screens in real time while others watch. We’re already finding this hugely helpful in design critiques at Figma.
-   No need for endless versioning…or the crazy naming conventions that other tools require to order your artboards (good-bye artboard 1, artboard a1, artboard a1b, artboard a1bcdefgahhhhhfuckthis).
-   My new fav: You can navigate presentations from your phone. Any designers who dream of strolling the conference room like you’re giving a TED talk, this is your moment.
-   You can use components (symbols) with hot spots, so when you set a navigation from a component once, it will populate through all instances, as seen in the gif below (the component is the top left X button):

To build a prototype, select the ‘prototype mode’ in the right hand properties panel and connect frames via nodes. You can turn different objects into hot spots, so when people interact with components of the design they’re taken to designated screens. Alternatively, you can create a simple presentation by ordering your frames on the canvas.

Ultimately, prototyping in Figma is about removing layers of abstraction between the design and the presentation. To meet the needs of designers with different workflows, we’ll continue to integrate with other dedicated prototyping tools.

## [Developer handoff](#developer-handoff)

The second big change in Figma is our new developer handoff feature. Designers can now share files with view-only access to developers, who will see a ‘code’ mode tab in the right hand properties panel.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAIAAABr+ngCAAAACXBIWXMAAAsSAAALEgHS3X78AAAB7ElEQVQoz62Ry27TUBCG3VJulaDcdjwF7ZrHgC6K2PAQPAdvQJTWTReoi9gOQoKqVCVJpbIAkWOnzs124uNrfY2d4xOJsVuiFlLY8Ov32JvP888M83auSqXSDlvmdjc/fGIPv21/rFfe7VYq21tnYtlyeRPEyFep25H7vY6idkdGf4QVVVNVBTRQFKmnfJf77U6X8X3f83y3MHx4/rmLlxf4fhgEcRQlaUoIyQgZT8ggIC17bHgh45662FT62vFgcDBSD3Duz1g7NPUfjoM94IPAhycMkyQFOCUZjknPS90wBtgZKvvS19foy/OT+rrcWJfrz+Tmy0HrjYURwBDCcRzLsqIozrKMUppmdEwoyTLGdW1N3pH2n7b4uwgsrOT1/ePO0StjeHQO2zbAcRzTmaZ0OqUFfLLV3ltF1UVUXSjqIuLvyY0NrDXO4NNCAMPY9IJm8JOrYBDEtm0b6iz5b/Aq4pZE/obI3xK5m0h4kMPDHIaehmHouo4xhsX9CbPtvTXApNqddm0Fqlh7JDdfGDmcHw0aw8zwIzjY3NhrInddEm5LwrLIL4vCw1nngtVtywzDENpOYVFzZxY58DVUXUL8/QuwCdd0bDOKor/AC79cLKy5UcT24shPkzBNkslkQi/r3/A4vrTh/wb/BG1N4MMvyAQIAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/c3b055689cdf198c9ddf8ffffcb8c178b8ff258e-1080x824.png?rect=0,1,1080,823&w=804&h=613&q=75&fit=max&auto=format)

### [The high level](#the-high-level)

-   Developers can select an object and hover over another object to see redlines that measure the spacing between them.
-   They can pull CSS, iOS and Android data with view-only access.
-   We’ve segmented the data as:  
    (1) Table view, which breaks out attributes so they’re easier to skim

(2) Generated markup/code

We believe in making design as accessible as possible, so we hope this will empower your team. You’ll no longer need to pay for engineers to have editor seats — instead, they can count as free ‘view only’ individuals. Check out more information in our tutorial video below:

## [The next chapter](#the-next-chapter)

We’re excited to offer an all in one tool to help teams work better together. That said, we know that designers and tech companies have a wide variety of workflows and requirements.

Figma plays in a broader, vibrant ecosystem, and for our next steps we’re looking forward to integrating with other tools in the space. We’re forging our first partnerships for a broader platform, so if you’re interested in working with us, please shoot us a line.

In the meanwhile, let us know what you think of Figma 2.0!