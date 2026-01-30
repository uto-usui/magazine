---
title: "Multiplayer Editing in Figma"
source: "https://www.figma.com/blog/multiplayer-editing-in-figma/"
publishedDate: "2016-09-28"
category: "design"
feedName: "Figma Blog"
---

Today’s public release of [Figma](https://www.figma.com/) contains two long-awaited changes. First, Figma is now open for anyone to sign up and try out! We’ve spent our [preview release](https://www.figma.com/blog/design-meet-the-internet/)

tuning and shaping the product based on user feedback, and we now feel that Figma meets our quality bar for a professional design tool. I’m incredibly grateful to everyone who was part of our preview release program; your feedback was amazing and has helped more than you know. We couldn’t have done it without you.

Second, the real-time collaborative editing feature that we’ve been working hard on over the past year is finally ready! Our implementation is called “multiplayer” since it was inspired by cooperative multiplayer games. We’ve found that multiplayer automatically improves many aspects of design in elegant and natural ways. You don’t have to worry about editing the wrong version, coordinating with others to avoid overwriting their work, or dealing with conflicts from your files living inside a separate syncing service. When you look at something it’s guaranteed to be up to date. Working remotely, sharing files, and reviewing designs are all faster and less frustrating. After living with multiplayer for a few months here at Figma, it’s already a core part of our design workflow.

## [In the beginning it was simple… sort of](#in-the-beginning-it-was-simple-sort-of)

Figma didn’t start out with multiplayer editing support. We initially focused on making sure the product worked well for individual users before we tackled teams of people working together. Our first saving model involved downloading the document, editing it locally in the browser, and uploading the whole document again periodically as you edit. It was a practical first approach; easy to build, easy to understand, and easy to iterate on top of in order to quickly get people using Figma for real work. Editing locally is also similar to how many designers collaborate over syncing services such as Dropbox today so we figured it would also feel familiar.

However, as time went on and we started adding more team features, it was clear that something was wrong. Every single save was recorded in the version history so data was never lost, but people would sometimes save over each other without realizing it. Other times people would share a link to their document with a collaborator but they would see the old version because we hadn’t finished saving yet. It turns out “easy to understand” wasn’t true after all. Our simple approach to saving was fundamentally incompatible with a collaborative environment.

Even though we knew the optimal solution to these problems was simultaneous editing, we were still hesitant. Building multiplayer would be a huge technological investment, require a lot of time and resources, and involve changing the core fundamentals of the editor itself. We explored cheaper alternatives including a “baton-passing” mode where there was only one active editor at a time, but nothing else had the simplicity and elegance we were going for. Today our year-long investment in multiplayer has finally paid off. Collaboration in Figma now feels right!

## [And then things got a little complicated](#and-then-things-got-a-little-complicated)

The idea behind our multiplayer engine is simple in theory. Changes from each user are sent up to the server and broadcast to other users in real-time. Two simultaneous changes are independent unless they affect the same property on the same object, in which case we pick the latest change. Theory never holds up in practice though, and sure enough we ran into lots of unexpected technical problems along the way.

Undo history has a natural definition for single-player mode, but undo in a multiplayer environment is inherently confusing. If other people have edited the same objects that you edited and then undo, what should happen? Should your earlier edits be applied over their later edits? What about redo? We had a lot of trouble until we settled on a principle to help guide us: if you undo a lot, copy something, and redo back to the present (a common operation), the document should not change. This may seem obvious but the single-player implementation of redo means “put back what I did” which may end up overwriting what other people did next if you’re not careful.

There were also quite a few technical challenges with the conflict resolution algorithm. Sometimes different properties on the same object had to be changed together, which meant a change to any one of those properties would have to be carefully merged with a change to any of the other ones. Other times a seemingly simple action on one object actually affected certain other objects too so users editing two seemingly unrelated objects would cause unintentional conflicts. This required changing some of how our layout features work.

It probably goes without saying but performance was a big challenge too. A professional-quality multiplayer implementation involved a lot of measurement and tuning, including overhauling our file format because the old format wasn’t efficient enough for small message sizes. There are also many more upcoming multiplayer challenges around new features in the pipeline. But it’s worth it. Software is becoming more connected and collaborative, and design software should be no exception.

## […and now it just feels right](#and-now-it-just-feels-right)

Multiplayer editing feels like a natural extension of single-player editing. Introducing multiplayer actually reduced the overall complexity of Figma’s UX because it removed all of the awkward workflows that people had been using to work around the lack of multiplayer. The result is a few simple features that combine in powerful ways to provide a great collaborative editing experience.

The first thing you’ll notice when you edit something alongside someone else is their mouse cursor. We show the cursor and selection of all active participants because it provides important context. Who else is here? Where are they working? Cursors can come in handy for other things too, such as waving your cursor around to get someone’s attention or placing your cursor by an object to point at it.

Every user in the document gets an avatar in the top right corner. In addition to showing who’s present, avatars are also useful for presentations. Clicking on someone’s avatar means they are presenting to you. We initially tried making presentation mode mandatory by enforcing that there was one presenter per document and that all viewers had to follow along with the presentation, but that felt wrong. This way presentations are opt-in so you can temporarily disable it, go look at something else, and then return to the presentation without interrupting anyone else.

Multiplayer editing isn’t just for collaboration between different people. It’s also for collaboration with yourself! Once we had multiplayer working it was trivial to use it for live broadcasting your edits to all of your mobile devices as you work. Figma’s live device preview app can be [downloaded today from the iOS app store](https://itunes.apple.com/app/figma-mirror/id1152747299).

We’ve included access controls from the start so multiplayer doesn’t distract from Figma’s fantastic single-player editing experience. You have total control over when and how you use multiplayer. Newly-created personal files start off in a space that’s only accessible to you. From the “Share” button you can grant viewer and editor permissions when you’re ready to share it. Figma supports setting these permissions both on an individual file and an entire project.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAIAAAC9o5sfAAAACXBIWXMAAAsSAAALEgHS3X78AAAA7ElEQVQoz42RSW7DMAxFc/+j9QAtsimQtoAByxopitTkhI2QQHU2fQvZIPyk76/T9U5rjZnxAVHKOZcj+XdYS+99WKfxqLVGAGOM3rQ2xnmfUuIJTKRs/FFhtci57vs+yaUE7/WmlNpWY22AlGiWXcDzt3k7rx9fNmB+kZ0126oF50KU5LPLMrks2/vnclkM0kGuBWMAZyH4GKNkpr/IxHsv/wUAtdTrU5ZtpDA5KiICJiSmfC/nwZAHzCQfT4WJXJv0YJF0JJcycOFJltjPCPL+IrcupwHlQFlW2WiWDxyvSpL31ts/EHO0JdwAeNEK+OKJgRwAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/09c7ac08cb5143d7c706bf4958336aaec378ce1a-1400x600.png?rect=1,0,1398,600&w=804&h=345&q=75&fit=max&auto=format)

## [Try it!](#try-it)

Building our multiplayer editing engine and making it a core part of Figma was an immense technical challenge, but we made the investment because we firmly believe that this is the future of design tools. Design is a highly collaborative profession and the barrier to design collaboration is now lower than ever before. [Give multiplayer a try and let us know what you think!](https://www.figma.com/)