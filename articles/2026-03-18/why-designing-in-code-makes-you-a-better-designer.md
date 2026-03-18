---
title: "Why designing in code makes you a better designer"
source: "https://adamsilver.io/blog/why-designing-in-code-makes-you-a-better-designer/"
publishedDate: "2026-03-17"
category: "design"
feedName: "Sidebar"
---

8 March 2026

I didn’t start out as a designer.

I started out as a frontend developer.

I cared about the craft and spent a lot of time trying to master HTML, CSS, JavaScript and accessibility.

Over time, I learned how these technologies affected UX, so as a dev, I started to suggest design changes to improve usability and accessibility.

But most of the designers I worked with ignored my suggestions.

Years later I transitioned to design. I tried to hide my engineering past because I was worried other designers would assume my designs were influenced too much by tech constraints.

But later on in my career I got a contract at Just Eat.

And that’s where I got to work closely with Mark Jenkins, the lead designer.

To my surprise, he listened to what I had to say and valued it.

Mark pointed me to designer Frank Chimero’s blog post, The Web’s Grain.

It put words to my experience as a front-end developer.

His argument was simple:

The web is a material. Like wood, it has a grain. You can work with it or fight against it.

Frank starts by looking at a completely unstyled HTML page and points out that:

-   The page is fluid by default
-   It adapts to any viewport
-   Text reflows automatically
-   Content stacks vertically

That’s the web’s grain.

But problems start to appear when you place elements side by side.

![A fluid webpage where resizing the window makes the image taller as it gets wider, while the text gets shorter](https://adamsilver.io/assets/images/why-designing-in-code-makes-you-a-better-designer/fluidwebpage3.gif)

When you change the window width:

-   the image gets taller as it gets wider because its proportions are fixed
-   the text gets shorter as it gets wider since it has no fixed proportions

That’s the fundamental challenge of responsive design. It can’t be solved, only managed.

Every breakpoint exists because of it.

But when you go against the grain, you end up with something Frank calls:

“bicycle bear websites”

He says:

> It is very impressive that you can teach a bear to ride a bicycle, and it is fascinating and novel. But perhaps it’s cruel? Because that’s not what bears are supposed to do. And that bear will never actually be good at riding a bicycle.

The example he gives is Apple’s Mac Pro landing page:

-   It used scroll jacking
-   It created lag on powerful laptops
-   It spun up computer fans as the processors worked overtime

And it didn’t even work properly on Apple’s own devices.

All that engineering. All that visual polish.

And the result was a website that fought against everything the web naturally does well.

Many designers and engineers thought the landing page was technically impressive.

But in reality it was hostile to users.

You’ve likely experienced bicycle bear websites where:

-   you can’t scroll normally
-   the back button breaks
-   you stare at a loading spinner before content appears

I spent years building this stuff.

The results were always complex and fragile.

But ‘the grain’ of the web is in everything.

Take native form controls as an example:

Most designers I worked with hated how the native `<select>` dropdown looked.

So they designed a custom one to make it look good and match the brand.

But that meant having to abandon the native element and build a custom dropdown from scratch.

Even if you ignore the extra work, you lose:

-   Keyboard navigation
-   Screen reader support
-   Automatic form submission
-   The native iOS scroll wheel
-   Functionality without JavaScript

Some of this is hard to recreate, some of it is impossible.

If you don’t understand the materials you’re working with, you may end up building a bicycle bear website without realising it.

But if you don’t want to create a bicycle bear website without realising it, you might like my course.

It’s for interaction designers and content designers who work on GOV.UK services and want to design in code instead of Figma.

[https://prototypekitcourse.com](https://prototypekitcourse.com/)