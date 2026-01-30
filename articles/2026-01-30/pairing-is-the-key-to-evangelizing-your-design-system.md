---
title: "Pairing is the key to evangelizing your design system"
source: "https://www.figma.com/blog/pairing-is-the-key-to-evangelizing-your-design-system/"
publishedDate: "2019-04-02"
category: "design"
feedName: "Figma Blog"
---

One of the hardest parts about building a design system is convincing other people to use it. It's easy to fall into the "us vs. them" trap by constantly calling out "bad behavior": _Don't use blue. Don't put that there. Make sure that works on mobile. Don't write CSS like that. This form is not accessible. Why did you need a new component there?_

If you're not careful, this attitude can lead to a poisonous culture in your design org.   
A design systems team needs to focus on more than just being right; they have to be helpful, too.

This lesson took me a painful amount of time to figure out. When I first started a design system project at Gusto I believed that tools or process improvements would solve our inconsistencies. We needed a UI Kit! We needed a Component Library! At least that's what everyone talks about in blog posts and Medium articles; I thought that if I could just sit alone in a dark room then I could build our design system all by myself.

But it turns out a design system can't be perfected in solitude because it's rooted in human relationships. It serves as a mirror for the company, a reflection of the dynamics at play between designers, engineers, product managers and even customers. 

Once I realized this, I knew we — on the design system team — needed a new approach to managing communication around and implemention of the system. We began to treat the design system as a cultural project instead of a technical one. We created a Slack-focused channel for feedback and questions, held office hours with the design systems team, and assembled an "Introduction to our UI" kit for newcomers.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsSAAALEgHS3X78AAABSElEQVQ4y6VSXW/DIAzM//+XTQDzTej2FsnemSxt2qnSqj6cOIzvMNiT925LOXMpVXIuHGISY71cFrfDkMy/WBC3FMX5BMTBFxd5tqQa9iHxFILfQggMCJFn50isdUj4C4szR17Ij9zBLTSa75xj7z1PIBsCCFoYWTb7+i4OvUzGmA1gQE7rgCac9y9w1vIE0aY3EJEcT0fpA888nPn4IhrQmK6jQjXEhlNO0tbGvXdprUmtVdZ1vfEO3o99KZJjlATTksuIpZQeDX30kkqAYZPed2FfO0z3C67Xq3x/fYlemCGmeZHgHAyTrK1izY+GIZCkaLnWCIM6qqq1DTOFVnsgQxz0izy6SzO6DvNwevLeck1Q4/sfnRHxxGdOpHN6wYxeYGbuhqe283vj8thte3T51dj8BzdzgxH7vEJ7L8Ia1fLHhk9a/gFiJsMAIsqpgAAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/62703b7c8054b01006b64a7eba29f18ebd760957-2000x1306.png?w=804&h=525&q=75&fit=max&auto=format)

This is the introduction to our UI Kit in Figma for new employees and designers who want to learn more about what's possible.

These steps were helpful, but by far the effective approach to evangelizing the design system was through pairing.

Ideally other designers at the company should feel like we're placing rocket boosters on their designs, rather than shackling their creativity. But that's only possible by working closely with them — sitting with them and getting to know them not only as designers but as people, too.

## [Pairing is user research](#pairing-is-user-research)

I treat pairing like user research. Working side-by-side with someone gives me a good idea of how they handle our design components and patterns, and what documentation is missing from our codebase and design files in Figma. I can see what parts of the design system are confusing for people, what's weird and what's working well. This information then helps us evolve componentry to meet their needs (instead of us assuming we know what those needs are).

> You have this wonderful opportunity to reset the social contract between you and the designer.

While pairing, I'm confronted with questions like this:

-   Do our designers and engineers know about our component library? 
-   Are they familiar with the latest best practices around HTML and CSS?
-   Can my team do a better job explaining why using component X is beneficial to the organization as a whole? 
-   Can I steal this layout from the designer and make it an official pattern for everyone to adopt in the future?

Other design teams use office hours to answer questions like this, but when we started holding our own we found that they weren't quite as popular as we'd hoped. Designers and engineers often don't know when they need us, so they don't come to our office hours proactively.

## [Pairing turns critique into collaboration](#pairing-turns-critique-into-collaboration)

The second benefit of pairing is that it opens communication between the design systems team and other people at the company.

As I hinted at earlier, collaborating with the design systems team shouldn't feel like another critique. Instead, it should feel like you're moving 80 times faster and preventing a ton of future bugs and issues from popping up. A designer working with us should feel confident that their work is of going to be of a higher standard and quality.

That's the dream at least. In reality, when a design systems team first forms everything is likely to be overly complex and undocumented. A lot of our codebase at Gusto is imprinted in our memory because we've spent years rummaging around trying to understand and refactor it.

The codebase can and can't do stuff, and those constraints aren't always visible. Folks on the team might be unaware that there's a limited set of colors to choose from, or that there's a component that already exists that can solve this exact use case, or that we should avoid building _this thing_ in _this way_ because it violates our accessibility standards.

> Side note: if the motto of improv is: "Yes, and…" then the motto of design systems is surely: "Yes, but…"

But it can be dangerous to initiate all those rules and dump all that overhead on people. It can make you sound like an annoying control freak — engineers will begin to ignore your docs and designers will continue to go off into the wilderness and make interfaces that might not complement what already exists.

Pairing helps lessens that tension and animosity. During pairing sessions, the design system team can teach others the institutional knowledge we have stashed away in our noggins and prevent more information from being silo'd away into different teams.

It gives us this wonderful opportunity to reset the social contract between us and other designers. What feels like another round of burdensome design critique during office hours will often feel like a more collaborative, productive conversation whilst pairing. It's then suddenly possible to make significant improvements to the system without any of the silly drama.

And so we both win in this scenario! We both get work done much faster and in a more collaborative spirit — product designers will learn about our system of front-end components and patterns whilst we get a better understanding of what they need to do their job well.

## [Pairing creates more design system evangelists](#pairing-creates-more-design-system-evangelists)

There's one last big benefit worth mentioning about pairing: It creates more evangelists for the design system. Once a pairing session is over, the designer/engineer often passes those lessons on to the next person on their team.

> A lot of folks won't know when they need you.

Trading knowledge in this way is important because we desperately need someone on every team to act as a translator. We need the person that can dive deep into the codebase and map its outlines and eccentricities, then help other designers and engineers understand it.

This community building work is certainly tough.

It requires a ton of energy because, as I mentioned before, a lot of folks won't know when they need you. They won't know if an interface is inaccessible or that another component exists already. They might not be able to make that trade-off between design impact and engineering cost.

Pairing lets you bridge that gap (and make a ton of friends along the way!). 

Also? [Gusto is hiring](https://gusto.com/about/careers) front-end engineers and designers to join our team and build this wonderful community around design systems together. Feel free to reach out if you have any questions or if you're interested in learning more.