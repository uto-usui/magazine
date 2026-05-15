---
title: "Apps and programming: two accidental tyrannies"
source: "https://andymatuschak.org/tat/"
publishedDate: "2026-05-13"
category: "design"
feedName: "Sidebar"
---

Coding agents might help us finally break out of two cages: the app model, which traps computing in one-size-fits-all silos; and programming as a specialization, which has crowded out cultures of imagination and domain insight.

Agents can make one-off apps, but they’re usually toys. I show how we might bring malleability and composability to the kind of deep interfaces that experts live in all day—demonstrated in a writing environment, but applicable to all serious software. Little serious reading software exists, so I propose and demonstrate a new kind of malleable digital reading environment focused on expert use.

But malleable interfaces aren’t enough. Historically, inventing interfaces has required imaginative design skill, deep domain insight, _and_ fluent programming. Few have all three, but programming is the only skill that can produce working software on its own—so interface invention culture is dominated by programmers. I share early reports of how coding agents are changing that, and what it might mean for the people and institutions inventing interfaces today.

Just a few thousand years ago, our ancestors didn't have written language. We're almost the same as those humans, biologically, but what goes on in our minds would be totally alien to them. Growing up in a world with paper and pen has changed us.

We can follow a chain of thought beyond our working memory. We can think abstractly and analytically. We can build on ideas of people we've never met, and leave our own for posterity. But it wasn't natural selection that gave us those abilities. It was other people. We've inherited that astounding power to create tools which shape our own thoughts—the power to transcend our own mental capabilities.

Written language was the work of whole cultures. But what excites me most in my work is that small groups and even individuals can also invent transformative tools for thought.

![](https://andymatuschak.org/tat/img/periodic-table-900.png)

I think of Playfair and statistical graphics in the eighteenth century, or Mendeleev and the periodic table of elements in the nineteenth. Tools like these are discovered as much as invented: their power lies in distilling deep domain insights—like periodic law—into external forms we can use to think and communicate.

![](https://andymatuschak.org/tat/img/personal-computing-900.png)

One of the great dreams of the personal computing revolution was that we'd all have not only our own computers, but also our own software, exquisitely tuned to our own purposes. Instead, we sleepwalked into two accidental tyrannies.

The first is the application model. Because software is expensive to build, developers need to capture as large a market as possible. That's led to one-size-fits-all packages. You can only adjust the knobs the developer gives you. Your tools can only be combined at junctions the developer anticipated. We live in a landscape of walled gardens, and the result is that our workflows often don't work the way we wish they did.

The second is programming itself. Rather than creating a new universal literacy, we created a specialist priesthood. The familiar version of that complaint is that end users are relegated to being passive consumers of the dynamic medium. But I'll also make the case that even within the tech industry, programming culture is accidentally holding back invention.

Now, though, I see some new paths out of these traps.

## Coding agents aren't enough [#](#tyranny-of-apps)

Let's focus first on apps. Of course, the application model is a familiar villain in our field. People have been trying for decades to break us free of their silos.

One major thread of work, end-user programming, aims to allow non-professional programmers to build their own software. That has turned out to be awfully difficult in practice. Spreadsheets are the major success story, but it's been hard to produce others.

Until recently, of course. Now we have coding agents. Everyone can build their own software, right?

Well… maybe! Looking around in early 2026, I see non-programmers building things like personal dashboards and automations. I see people writing scripts to connect or combine data from different incompatible systems—already knocking some cracks into the app silos. And of course, I see a lot of fun toys. All in all, I mostly see non-programmers using agents to create glue code and one-off tools, mostly at the periphery of their real work.

That's fantastic, of course, and we'll continue to see people build ever more ambitious personal tools. But I want more. Let's play this trend out further.

![](https://andymatuschak.org/tat/img/filmmakers-900.png)

As far as I know, filmmakers aren't yet using coding agents to personalize their editing workstations. Musicians aren't using coding agents to personalize their engraving software. What would it take to let non-programmers improvise improvements to complex interfaces—interfaces at the very center of their work? I want to see the dream of personal dynamic media fulfilled for the most important parts of their practice.

![](https://andymatuschak.org/tat/img/photoshop-plugins-900.png)

Those parts often take place in extremely complex "mega-apps". A filmmaker will spend thousands of hours in Adobe Premiere. A composer will spend thousands of hours in Sibelius. Apps like these support plugins, but they're locked in little boxes. Plugins are allowed to render an interface into a modal, or perhaps a sidebar. But if the user wants to improve the _primary_ interactive surfaces of those apps for their personal workflow, they'll need to recreate all that complexity. Neither today's coding agents nor their typical users are prepared to rewrite Photoshop on the fly to add a new kind of brush tool.

So if we want to free ourselves from siloed monoliths, we'll need a more malleable substrate than today's zero-to-one "text-to-app" coding agent workflow. Researchers working on this problem know that, of course, and we've seen systems from [Smalltalk](https://en.wikipedia.org/wiki/Smalltalk) to [Webstrates](https://andymatuschak.org/tat/refs/Klokmose2015-Webstrates.pdf) to [Potluck](https://www.inkandswitch.com/potluck/) proposing principled architectures for user extensibility.

The trouble is that none of these approaches is as versatile and accessible as the "text-to-app" workflow. Can we find some happy middle—enough structure to let users adapt complex software without rewriting it from scratch, with enough versatility and accessibility for non-programmers to use?

Now, it makes sense that plugins in apps like Photoshop are locked in little boxes. Their main interactive surfaces are enormously complicated. If plugins started reaching in and changing things, chaos would quickly ensue. Safe and expressive extensibility would require such a complex API surface that plugins would become incredibly difficult to write. It's much easier to just give plugins a panel they can fully control.

Having said all that, I think we can learn from an interesting exception to this rule:

![](https://andymatuschak.org/tat/img/obsidian-900.png)

[Obsidian](https://obsidian.md/)! To my knowledge, it's the only deeply extensible GUI word processor that has ever reached production. Like other word processors, plugins can add custom themes, commands, and interfaces in isolated panels. But unlike other word processors, Obsidian's rich text editor is built on an open-source framework with an unusually composable architecture, called CodeMirror. And so, uniquely, Obsidian plugins can arbitrarily extend the behavior and presentation of the rich text editor itself.

![](https://andymatuschak.org/tat/img/latex-plugin-900.png)

For example, this ["LaTeX Suite"](https://github.com/artisticat1/obsidian-latex-suite) plugin shows me an inline preview of rendered LaTeX while I'm editing its source. It also changes the behavior of keyboard events while I'm inside a math expression—like, the tab key jumps my cursor just outside the current brace scope.

Now, most Obsidian plugins don't extend the editor GUI. Most Obsidian plugins just add custom commands or isolated panels. I think that's because extending the editor itself requires some very complicated programming. The complexity seems necessary—it's what makes safe, composable editor plugins possible—and we'll talk more about how that works shortly. But it is a significant deterrent.

I'm an experienced programmer, and every time I've started noodling on an editor extension for Obsidian, I quickly got discouraged by how much intricate work they require. Again and again, I've scoped back my ambitions or abandoned those projects altogether. But coding agents have changed that. They can handle that complexity for me.

In fact, in the past few months, they've become good enough that I can create complex editor extensions without supervising the code. That's end-user-programming territory. Now my idiosyncratic word processing dreams can be realized, more or less on a whim. Let me show you.

## Demo: two complex plugins [#](#demo-obsidian)

![](https://andymatuschak.org/tat/img/demo-reading-outside-900.png)

I spend a lot of time reading outside. I want to read actively, which would normally mean writing in a notebook while I read, but it's hard to balance that on my leg while I'm in a chair like this. So instead, I usually put a microphone in my ear and ramble while I read.

The trouble with that is that my comments really need to reference particular passages in the book to make sense, and it's hard to do that with audio. So I made a new tool to help with that. We're not outside right now, so I'm going to show you a digital book—but just imagine we were reading a physical version.

![](https://andymatuschak.org/tat/img/demo-quote-recording-900.png)

I might be flipping through it and encounter a passage like this, and maybe I have a comment about this particular passage. Inspired by [Canon Cat](https://andymatuschak.org/tat/refs/CanonCat-LeapCursorMovement.pdf), I realized that a sequence of three or four words can uniquely identify pretty much any point in a book.

So I start an audio recording. And now as I'm reading through, I can say to myself, "quote, though, only three years older"—and then ramble whatever observation I have about that passage. I can keep reading, find another passage, say "quote, we already feel the effects"—and say whatever I have to say about that. I might record for an hour like this.

Then I come back to my computer, and here I can copy this audio and switch over to Obsidian, where I have a special plugin. We're in the middle of a markdown document—there's an image and a block quote with a synopsis of the book. I paste the recording and transcribe it.

![](https://andymatuschak.org/tat/img/demo-transcript-highlights-900.png)

Now I have a transcript. Transcribing audio is nothing special. But you'll see something interesting going on: these places where I pointed to a passage with my voice are highlighted in yellow, and there's a special button next to them.

This is still just a markdown document. If we look at the source, we just see normal plain text and a block quote and an image. But the styling is being applied in the live editor, and there's a button. If I click the button and point the editor at the epub I was reading, it can ground those quotes in the particular passages of the text.

That quote directive gets replaced with the block quote from the epub, along with a fairly elaborate link that navigates the book to that specific position. From this point, it's just plain text—so I can extend my comments, add another comment, move things around, copy and paste. Just treat it like a material.

Once I had this, I realized I don't want to completely lose the audio. There was some interesting affect in it—here we just have plain text. So I made another plugin. I can demonstrate it with this audio file—this is me talking to myself in a car about the design of the plugin we just looked at.

I can transcribe this, and here I've got something interesting. This is a new kind of Markdown directive called a transcript directive. I can press play and get audio playback synchronized with the textual transcript. This is inspired by [some old work from Steve Rubin](https://dl.acm.org/doi/10.1145/2501988.2501993) that some of you might recognize. I can hold down command and click anywhere in the transcript to jump around.

![](https://andymatuschak.org/tat/img/demo-audio-transcript-900.png)

And it's still just Markdown. Looking at the source, we've just got plain text wrapped in this special directive with three colons—a Markdown extension directive. And now I can do some interesting things. There's an algebra of edits this plugin introduces. I can go here and start making new comments in the middle of this transcript—and we see that it's split the transcript block around the insertion, with an end time on the old block and a start time on the new one.

I can copy a paragraph from the middle of a transcript, make a new file, paste—and here it's pasted a segment of the transcript that begins at a particular time and ends at a particular time. Command-click still works, linking back to the original file. I can delete in the middle of the transcript, and if I start playback from the gap, it jumps over the deletion. This is a fairly complicated bit of new Markdown behavior that's been introduced into the middle of a pre-existing editor.

Now the next thing to do is to combine these plugins. Turning them both on at once, we can see that this place where I've included a quote directive in the middle of a ramble has that special yellow highlight from the quote plugin inside the styling from the transcript plugin.

![](https://andymatuschak.org/tat/img/demo-combined-plugins-900.png)

Let me make a new demo file—I can paste in the audio file we made earlier and transcribe it with the transcript plugin. Now I have a transcript of that recording wrapped in the transcript directive, so I can command-click and start playing from anywhere. And that new behavior combines with the old behavior of the quote leap plugin. I can click the quote and resolve the embedded quotes—and we still get playback of the transcript around the quotes. In fact, the playback jumps over the quotes. I have my audio transcript, and I have my quotes grounded directly in the book—so I can see what I'm referring to while I listen to myself ramble.

These two plugins are working together to deeply modify the behavior of this WYSIWYG text editor.

## Composability and CodeMirror [#](#composability)

Now, what's exciting about that demo isn't the interaction design of those particular plugins. You could imagine seeing each of those interfaces as part of some workaday HCI paper demonstrating a research system.

No, what's exciting about that demo is that this _isn't_ a research system. I brought these behaviors into Obsidian—a production word processor I actually use. If those interactions were part of some writing environment prototyped for a typical HCI paper, I wouldn't be able to use them in my usual word processor. I'd have to use the writing environment some grad student polished just enough to run their user evaluations.

In this way, app silos hold back invention. If I want to contribute a new interface idea to a complex tool like Photoshop or Microsoft Word, and see any expert-level adoption, I'm forced to re-implement all the pre-existing functionality of the best existing app. Then, finally, I get to add my idea as a cherry on top. Each has to pay an enormous tax to escape research purgatory.

And it gets worse. Suppose that each of those interactions I showed was implemented in a different paper by a different author. If I wanted to use both behaviors at once, like I did at the end of the demo, I'm simply out of luck. Each new behavior is trapped in its own system.

What's different in this demo is **composability**: those complex new behaviors compose with Obsidian's pre-existing complex editor, _and_ with each other—without any special knowledge or coupling.

It's nice, too, that coding agents built these behaviors for me. But it's the combination of composability and coding agents that's particularly exciting. Coding agents without a composable architecture give you zero-to-one silo apps. Composable architecture without coding agents makes novel plugins too costly for all but the most devoted and experienced developers. Together, they might mean that non-programmers can riff at will on pre-existing complex interfaces.

![](https://andymatuschak.org/tat/img/codemirror-900.png)

Now, we've been talking in terms of Obsidian—because that's the high-level package the user experiences—but the real credit for its editor's composability is due to [CodeMirror](https://codemirror.net/), an open-source framework by [Marijn Haverbeke](https://marijnhaverbeke.nl/).

Rather than building a text editor and then later designing a plugin system on top of it, Marijn designed a text editor that is _made out of plugins_. Let me explain.

![](https://andymatuschak.org/tat/img/codemirror-architecture-900.png)

So Obsidian is a WYSIWYG Markdown editor. But CodeMirror doesn't know anything about Markdown, or images, or bulleted lists, or links, or tables. Everything you see beyond plain text in the Obsidian editor is a CodeMirror plugin. So when a user adds a CodeMirror plugin of their own, they're using exactly the same primitives that the Obsidian developers used to create their product.

CodeMirror defines a rough physics of the medium: basic models for text, state, and selection, with transactional updates. Pretty much everything else—how text looks, what happens when you click or type, what state is maintained, what appears alongside the text—all of that is described through _facets_.

Facets are a composable structure that define how independent plugins can safely contribute to the same concern. Plugins don't _act_ on the document; they _declare_ what they want. Then—for decorations, for key bindings, for state updates, and for everything else—CodeMirror's physics defines rules for combining and enacting those declarations.

Let's see how that works in terms of the demo we just saw.

![](https://andymatuschak.org/tat/img/decorations-900.png)

Here on the left, we see those two plugins acting at once on a quote directive inside an audio transcript. One element of that behavior is visual styling: the audio transcripts use small monospaced text, and the quote directives have a yellow glow. Both can apply simultaneously. CodeMirror's EditorView exposes many facets that plugins can use to control the behavior and appearance of the editor. One key facet is called "decorations". The audio transcript plugin declares that it wants to decorate lines 5–18 with the "transcript" CSS class. Separately, the Quote Leap plugin declares that it wants to decorate a certain character range with a different CSS class. The decorations facet combines all those declarations and applies them to the DOM. We use a similar strategy for the buttons to the left of the text.

![](https://andymatuschak.org/tat/img/quotes-resolved-900.png)

But what about resolving quotes _inside_ of a Markdown transcript? Well, first off, the audio transcript is part of the editor's model—it's a Markdown syntax extension, but the data is still _in_ the Markdown document, not sequestered in some separate store. That means other plugins can see it. So when you press the button next to the quote directive, the plugin parses the Markdown, sees all those quote directives, and replaces them with the resolved quotes from the book. But notice that the transcript blocks get split around the block quotes.

![](https://andymatuschak.org/tat/img/transaction-filter-900.png)

We can make that happen because editing operations also compose explicitly. There's another facet called transactionFilter. Editing operations—like the quote block replacements—are described declaratively in transaction data structures. Those transactions get passed through a pipeline of transaction filters declared by plugins, which can transform them. The audio transcript plugin doesn't know anything about the quote leap plugin—but even before I combined the plugins, I was able to split audio transcript blocks by inserting newlines. The plugin declares a transaction filter that watches for insertions inside of transcript blocks, and reacts by splitting around the insertion.

![](https://andymatuschak.org/tat/img/plugin-code-900.png)

All this declarative machinery is pretty complicated to implement. You can see why it's created such a high barrier for plugins in the past. But, happily, I didn't need to write this code—coding agents did it for me.

You could do this kind of thing in other extensible text editors. In Emacs, you'd just mutate the buffer directly—one line. But when two plugins both touch the same region, you get nightmare stories like [org-mode's multi-year folding rewrite](https://list.orgmode.org/CA+G3_PNBi+KXEGwfKW6X9f66fxBUBOkv0DJrKXE36A95OaNwow@mail.gmail.com/), which kept breaking lots of other packages and accumulating piles of workarounds. CodeMirror's declarative approach replaces a patchwork of unrelated extension mechanisms with a consistent composable pattern.

## The poverty of digital reading [#](#reading-environments)

Now that I've tasted it, I want this kind of extensibility not just with my rich text editor, but with my design work, with my music, and with my reading. If CodeMirror defines a physics of rich text editing, and that physics makes it possible for plugins to independently extend the user interface, we can ask: what would the equivalent physics look like for a Figma, or a Sibelius?

…But wait—before we try to answer that for Figma or Sibelius, I just said I wanted this kind of extensibility for reading. What software would I even aspire to extend for that? Apple Books?

![](https://andymatuschak.org/tat/img/reading-environments-900.png)

Preview.app? _Maybe_ PDF Expert? The problem is worse than just the need for extensible pro tools: serious readers don't have the pro tools in the first place.

What's special about dynamic mediums is that they _behave and respond_. When I'm iterating on a design system in Figma, I can see in real time how my choices affect layout and weight across every screen of the app I'm designing. When I'm mixing a track, spectrum visualizers let me quickly spot and fix muddy segments. We can tell similar stories in climate modeling, genomics, and so many other domains. The medium takes on some of the cognitive load, so we can explore and refine ideas closer to the speed of thought.

Meanwhile, our reading environments have evolved remarkably little. And yet there's so much room for them to evolve. We often fail to absorb key ideas from what we read, without noticing. We forget details we found fascinating just last week. We write notes in the margins and then struggle to see across texts. We're not really making use of the dynamic medium for any of this—mostly just working with pictures of paper on screens.

![](https://andymatuschak.org/tat/img/bricks-900.png)

In other domains, the medium dances with us, providing active support for difficult creative work. Meanwhile, in scholarship, the paper lies inert, and we shoulder the full cognitive load. [Echoing Engelbart](https://andymatuschak.org/tat/refs/Engelbart1962.pdf#page=36): bricks are _still_ strapped to our pencils.

You could say: maybe there's something special about reading that prevents the transformative tools we've seen in other domains. Maybe there are no augmentations worth pursuing. But researchers have uncovered quite a lot about human cognition and sensemaking—surely we can incorporate those powerful ideas into new media. In fact, HCI researchers have built quite a few interesting augmented reading systems.

![](https://andymatuschak.org/tat/img/scim-900.png)

[Scim](https://andymatuschak.org/tat/refs/Fok2023-Scim.pdf), by Fok et al, highlights and color-codes key sentences containing goals, novel contributions, and results—classified by their rhetorical role in the paper.

[CiteSee](https://andymatuschak.org/tat/refs/Chang2023-CiteSee.pdf), by Chang et al, color-codes citation links so you can easily see which ones you've saved, read, and cited.

[Papeos](https://andymatuschak.org/tat/refs/Kim2023-Papeos.pdf), by Kim et al, lets readers quickly jump between a research paper and aligned segments of the author's associated conference talk.

[LiquidText](https://andymatuschak.org/tat/refs/Tashman2011-LiquidText.pdf), by Tashman and Edwards, supports parallel reading by letting users collapse parts of documents.

[SpaceInk](https://andymatuschak.org/tat/refs/Romat2019-SpaceInk.pdf), by Romat et al, does the opposite—letting users expand whitespace around lines to make room for marginalia.

![](https://andymatuschak.org/tat/img/quantum-country-900.png)

And [Quantum Country](https://quantum.country/), which I developed with Michael Nielsen, integrates a spaced repetition memory system into the reading experience, to make it much easier for readers to remember what they read.

Lots here. But as interesting as these individual projects' ideas are, they don't quite accumulate. Each interaction is trapped in its own reading environment, stuck in the same research purgatory I mentioned earlier. If you want to use CiteSee's color-coded citations, you have to use its prototype as your PDF reader. Then if you also want features from one of the other systems I mentioned, you'd need to switch wholesale to a different reader.

So, by way of generalizing from CodeMirror: could we define a _physics of reading environments_—one which could simultaneously support all these disparate augmented reading ideas, plus untold more yet to be invented?

## Demo: malleable reading [#](#demo-reading)

![](https://andymatuschak.org/tat/img/demo2-reading-systems-900.png)

Here we have a prototype malleable reading environment. This reading environment uses the same philosophy as CodeMirror's facets—declarative contributions, system-managed combinations—but, as we'll see, reading surfaces some new compositional needs that editing didn't have. Let's play with some plugins.

Here's a version of Scim. Sentences light up with colored backgrounds: objectives in green, methods in blue, results in orange—classified by their rhetorical role in the paper. The plugin works by declaring decorations on text ranges, just like in CodeMirror.

![](https://andymatuschak.org/tat/img/demo2-scim-900.png)

And here is a slice of CiteSee. Citation markers tint by your reading history. Green means you've read it, and when you hover one, you can see a card with the paper's details. These are two extensions representing original papers by two different authors, composed on the same text. Neither one knows about the other. The system merges their declarations—the colored backgrounds, the tinted citation brackets, the input events—through the same kind of facet mechanism I showed you in CodeMirror.

Now, decorations paint on the text, but some reading augmentations need to live alongside it—anchored to a position in the document, but rendering outside the text flow. So here we have a Margin Notes plugin, which lets me point to any point in the text and create a margin note. This margin note is anchored to the vertical position of its target paragraph and to the right edge of the page. The extension doesn't calculate that position—it just declares, "I want a widget anchored to these semantic locations," and the system handles the rest.

![](https://andymatuschak.org/tat/img/demo2-margin-notes-900.png)

Now I can turn on another plugin. Here's Papeos. This plugin links sections of the paper to moments in the author's corresponding conference talk. It also declares anchored widgets, positioned in the same declarative fashion. But Papeos doesn't know anything about my Margin Notes plugin—it's just that because they both contribute to the same anchoring facet, the system makes sure these widgets don't overlap. The same anchoring primitive can support things beyond marginalia: floating toolbars, contextual panels, anything an extension wants to place alongside a document position.

So far, we've seen extensions that add information—colors on the text, widgets alongside it—while the document itself stays the same underneath. Some of the most interesting reading augmentations change how content is rendered. Here we have a riff on LiquidText. When I hold the command key and scroll, I can compress sections of the paper spatially, pushing content together. Notice that the rhetorical colors compress into a kind of visual fingerprint inside the collapsed region.

![](https://andymatuschak.org/tat/img/demo2-liquidtext-900.png)

You can think of decorations like a fragment shader that composes with these changes to the document's geometry—which is sort of like a vertex shader in a graphics pipeline. This is a spatial transform: it changes where content appears on screen. But notice what's happening to the anchored widgets. These anchored widgets don't know about the LiquidText plugin—they just ask the layout map, "where is my anchor right now?" And the layout map accounts for that spatial transform. They don't know the document's been reshaped, but the widgets follow the geometry.

![](https://andymatuschak.org/tat/img/demo2-minimap-900.png)

Because this architecture cleanly separates _what_ to show from _where_ to show it, we can render the same document multiple times in different ways. This minimap reads the same decoration facets as the main view—the rhetorical colors, the citation markers—but it renders them inside a compressed overview. Conceptually, it's like a second render pass of the same pipeline.

## 2\. The tyranny of programming [#](#tyranny-of-programming)

Composable architectures and coding agents, in combination, may help us break down the silos around our most complex apps. But I'm not satisfied with just combining the Balkanized interface ideas we already have. I want a wild flux of new ideas.

I think we've barely scratched the surface of what we can do with dynamic media. Despite all the manic energy in the tech industry, and all the prestigious HCI conferences, the pace of meaningful invention in user interfaces is remarkably slow, and the level of imagination remarkably tame. I want new answers, new questions, and ideally both at once.

## A lopsided culture [#](#programming-imagination)

In the early days of the personal computer, transformative user interfaces were invented by field-crossing weirdos—Engelbart, Sutherland, Kay, Simonyi, Atkinson. They had PhDs in the sciences—building anything was so hard back then—but they were also wildly imaginative designers.

![](https://andymatuschak.org/tat/img/inmates-asylum-900.png)

The software industry grew much faster than the supply of polymathic geniuses. And so by the '80s, most programmers, left to their own devices, were building outrageously user-hostile software, filled with technical jargon. And so in his landmark book, [_The Inmates Are Running the Asylum_](https://andymatuschak.org/tat/refs/Cooper-InmatesAsylum.pdf), Alan Cooper proposed this new role—the interaction designer—who would work alongside programmers to build software that better fit user needs and abilities. Specialization worked. Most modern software really does make a strong effort to understand user needs, and now that interface design patterns and practices have developed, many programmers can create tolerable interfaces on their own.

But I say the inmates are still running the asylum now. Cooper was worried about an accidental tyranny of programmers subjecting people to comically bad user interfaces. I'm worried about an accidental tyranny of programmers _holding back imagination_ in user interfaces.

I want weird, courageous, idiosyncratic, alien interfaces. We're living through the astounding advent of machine intelligence—and that's plenty alien—but we've crammed all that power into chat interfaces that have barely evolved since the IRC clients I used as a teenager. Where's the invention?

![](https://andymatuschak.org/tat/img/cubase-900.png)

I think the central problem is that invention in the dynamic medium requires too much programming. To invent a new user interface, you need both imaginative design skill _and_ fluent technical skill. Very few people possess both. Worse, those two usually aren't enough: interface invention also requires deep domain insight. I think of Steinberg inventing the timeline editor in Cubase after years as a musician and producer, or Bricklin inventing the dynamic spreadsheet while at Harvard Business School.

You might suppose that bold new user interfaces are mostly bottlenecked on imaginative design work and deep domain insight, and so you might expect to see those skills most emphasized in the culture. But if you visit community events around interface invention—the future of personal computers, academic HCI—you'll quickly notice that pretty much everybody's a programmer by training, and they're also programmers by culture. Most will have studied at a formal analytical science program—not the wild-eyed studios of design school. Not incidentally, that includes me.

I suspect we're in this situation because of a deep asymmetry between these skills. Programming without design or domain insight can yield working interfaces—though often boring or flawed ones. While design or domain insight without programming gets stuck on the drawing board. So at least for solo invention, roughly all working interfaces are created by programmers who may or may not have those other skills. If new interfaces are mostly bottlenecked on imaginative design work and deep domain insight, this asymmetry puts selection pressure on the wrong skills.

When I complain about the slow pace of interface invention, people often tell me this is really a problem with the market—consumers reward easy, familiar interfaces, not weird ones, and it's become a lucrative, commercialized, professionalized industry. But the future of computing meetups and HCI conferences are full of people who don't care about those things, who yearn to build their own castles in the sky. It's just that—with love, and as part of that scene—the results are often underwhelming. I think this is because the scene is wildly overweight on programming and underweight on domain insight and design.

## Teamwork in the asylum [#](#teamwork-in-the-asylum)

Now, if solo invention selects for the wrong skills, what about inventing in teams? Cooper thought we could get out of this through specialization—if programmers work together with designers, maybe one of them, or a product manager, will have the domain insight too. This has worked out okay for most software—most software is just theme-and-variation, professionals applying well-known patterns. Novelty would actually get in the way. But I want to talk about invention, and there I think specialization has worked much less well.

Teams put non-programmers in a position of dependency by default. If a designer wants to invent a novel interface, they usually can't make a working prototype without pitching others to help. And it's tough pitching, too—they have to show something fake and lean on their colleagues' imagination to fill in the blanks. For designers with modest programming skills, prototyping often remains too slow and difficult to justify the opportunity cost. I've seen designers stuck here for years, often referencing some concept they have in their head, but they've never been able to realize in a form that others can understand.

It might sound like the problem is that designers are constantly pitching brilliant ideas but getting shot down by shortsighted colleagues. I think the deeper problem is that this dynamic tends to prevent those ideas from ever _becoming_ brilliant in the first place. Why would we expect that people can develop and pitch a great idea for a novel interface without ever using and iterating upon a real working version of that interface?

Non-programming designers are trying to invent something in an interactive medium without being able to make something meaningfully interactive. So much of invention is about intimacy with the materials, tight feedback, sensitive observation, and authentic use. So it's a catch-22: to enter into proper dialogue with their medium, a non-programmer needs to get help from a programmer. That generally requires the idea to be at least somewhat legible and compelling. But if they're doing something truly novel, they often can't make it legible and compelling without being in that close dialogue with their medium.

Modern software design culture often turns to visual craftsmanship rather than novel dynamic representations or interactions. I think that's because visuals are the domain where designers can tinker intuitively, without the frustration of depending on others to develop their ideas. It's sort of like the design equivalent of an alienated programmer hyperfixating on making the code really clean. Each practice is fine and necessary in appropriate quantities—but can easily become a self-protective retreat from the medium's true potential.

This is also a bad situation for programmers. They become inadvertent gatekeepers. I've been in this position with colleagues—they explain their idea and I probe and riff, but I still don't really see what they see in it. From here I have two bad options: I can demur, which often effectively just blocks my teammate; or I can acquiesce, subordinating my own priorities to an idea that rightly or wrongly seems less promising than the ones I'm already addressing. Being a generalist actually makes me more tyrannical in these situations, because I always have my own design ideas I could be developing.

## 2025: cracks in the walls [#](#cracks-in-the-walls)

But now I see cracks in the walls. I think coding agents will end the accidental tyranny of programmers in interface invention. I think designers and domain experts will increasingly free themselves from their dependence on programmers in the early stages of invention. They'll finally be able to get their hands on the dynamic medium—to iterate and prototype concepts directly.

I've been seeing it. I spent 2025 collaborating with two talented designers. Their story with coding agents this past year has been truly wild. I think the impact on my collaborators has been much greater than the impact on me, despite the fact that I'm now building perhaps ten times the speed.

Unlike me, these two started their careers in design and spent their formative years in the arts culture. They can program a bit, but the process was really slow and difficult enough to pose a significant barrier. At the start of 2025, coding models could implement small one-off design ideas—but their outputs would just fall apart after a couple of iterations. By the end of the year, my collaborators were routinely prototyping novel interface ideas and sustaining that iteration across weeks.

I'd often check my messages in the morning and find some stunningly elaborate prototype condensed from dreams in a single late-night fugue. For example, for much of the year, our interface sketches gestured at an exotic interactive content layout system. We'd shied away from fleshing it out because it had the air of a big, scary project. But then I woke up one morning to a working implementation—one designer and an army of coding agents had figured it out together overnight. That very same week, I watched with amazement as the other designer transformed pencil sketches of a dynamic 3D data visualization into a captivating prototype running against real data from our system.

This arc has totally changed the nature of our collaboration. At the start of the year, my collaborators had to mostly go through me to get their ideas prototyped at enough fidelity to seriously use. With three people designing and one person programming, there just wasn't enough programming to go around—it turns me into a gatekeeper and my colleagues into salespeople. But now, increasingly, they can tinker with their own ideas and prototypes. On a couple of occasions, my collaborators prototyped an idea and I could see: _gosh, you were gesturing at this a while ago, and I didn't get it_—but now I don't have to get it. I'm not blocking their early expression and iteration.

Like I described earlier, this story isn't just about me being too dense to appreciate beautiful early ideas. Often a designer can't really understand their own inkling until they can get their hands on it and tinker with it. Coding agents created a safe space for noodling when ideas aren't yet coherent. The old dynamic demanded clarity and legibility upfront.

I wonder how different [Ted Nelson](https://www.wired.com/1995/06/xanadu/)'s story might have been in this world. He spent fifty years chasing a parallel-universe version of the web—one in which every piece of writing lives in a living network with everything else. He had that wild imagination I want to see in this scene. But he didn't have the technical skills to prototype his ideas—so he wrote whole books about them, pushed the concepts further and further without the real feedback he needed from those systems. Finally, after spending his whole career fighting for the buy-in he needed to experience his own ideas, he got some of them implemented—and they just weren't as powerful or compelling as advertised. That shouldn't surprise us; we shouldn't blame him. Invention takes iteration. It takes contact with the medium. And he didn't really have that opportunity. Increasingly, today's designers do.

It's clearly a source of childlike joy for them. One of my collaborators, Nio Ono, shared this on their experience:

> Vibe coding unlocked something in my mind or latent personality matrix. I am reminded of descriptions by people who feel they were fundamentally changed by martial arts or some esoteric practice, like something inside of me realigned and connected me to an inner conduit of energy that had lain dormant. … I feel unleashed in a way that changes my sense of self. There is an unambiguous before and after. … I feel free to act! To express myself! … 'I feel the body electric' is as perfect a summation of this feeling as anything.

Every designer I know has spent ages haunted by beautiful ideas without enough buy-in to try them properly. Now they can just try things out.

## Shipping is not the bottleneck I care about [#](#shipping)

The tech world is drowning in noise about coding agents. Some say: computer science undergrads are screwed; "idea guys" will build and ship everything by themselves! Others say: that's hype; vibe-coded software looks good but collapses when you try to use it seriously.

Whatever. What I want is more imagination and invention in user interfaces. And for that, coding agents can make a huge difference, even if non-programmers can't bring their prototypes all the way to production. The bottleneck here isn't that we're constantly seeing amazing new user interface prototypes and research systems, and yet the foolish market just won't bring these systems to production. I want to increase the imaginative flow into the top of the funnel.

That early stage puts less pressure on software quality—a prototype just has to be real enough to let the designer feel how their ideas play out in an authentic context, and to communicate clearly to others. Coding agents are already good enough to produce that level of prototype for some ideas.

And then, once there’s a team, high-fidelity prototypes communicate ideas about dynamic media much more effectively than what most designers use now. Unlike static artboards and click-through demos, these prototypes can clearly specify novel dynamic behavior. Bas Ording invented iOS's inertial scrolling and rubber-banding using Macromedia Director prototypes with hacked-together scripts. None of that code shipped—and who cares? It defined the essential feel of computing for a generation.

## Surviving while vibe-prototyping [#](#surviving-vibe-prototyping)

If the last year’s trend holds, we won’t need to worry long about these technical challenges. I'm actually much more worried about the aesthetic and cognitive challenges. Working with coding agents all day leaves my attention fragmented, unfocused, impulsive. I'm busy waiting. I'm constantly bouncing between workspace tabs, flushing and reconstituting my working memory. I'm moving quickly, but I'm never in flow.

My collaborator Nio shared another quote on that feeling, a striking counterpoint to their earlier quote:

> I live in an eternal present. No memory, no plan. Every minute my attention lunges at something else. It's hard to recount what even happened these last few months. For all this activity, I feel bereft of outcomes or memories. I feel disembodied, so my embodied life is in disrepair. My home is my screen, so my living space is dusty and incomplete. I feel robbed of agency. I can scarcely recognize my own goals, let alone act on them. It's like forgetting a past life. The world feels like a blurry backdrop for my screens. It's all desktop wallpaper.

There's a deep pleasure in making something by hand, replaced here by a kind of anxious, scattered, frenetic energy. Building has become so easy that it's now an oddly dangerous temptation—my collaborators and I have all found ourselves accidentally volleying with agents as a way to avoid thinking carefully about a problem.

## What now? [#](#what-now)

These costs are real. But we endure them for the moment because coding agents are great news for invention. Even as an experienced programmer, I move so much faster that I'm trying all kinds of ideas I just wouldn't have tried a year ago. But I am grappling with some uneasy questions about my own practice.

I've spent more than two thirds of my life programming, and a little over a third doing inventive design work. It probably shouldn't be a surprise that I'm still a much stronger technologist than I am an inventor. I think the modest success I've had in that latter role is mostly due to my generalist skill set, rather than to the reach of my imagination. Designer-programmers are just kind of rare, and that's given me a pretty unique advantage. But I think—or rather, I hope—that this advantage is actually just going to disappear in the next few years. And where will that leave me, and other people like me?

If I'm honest, I don't think I'm as imaginative as the designers I most admire. My expressive range for visual representations is much narrower, and I move a lot more slowly when rendering and iterating on interface ideas. But that's only part of what I mean when I say the interface invention scene is overweight on programming and underweight on design.

By "design" I also mean something broader than professional practice—bold imagination and inspired creative energy. Plenty of programmers have that energy, but much of what programming culture instills and rewards is more analytical and pragmatic. My decades as a programmer instilled a formal mindset that seems to act against wild-eyed generativity. My mind automatically moves toward abstraction, generalization. It's a superpower when it's time to systematize—I can receive a vague, ill-defined idea and ask the questions that allow it to actually work coherently—but it puts too much pressure on really early ideas. I envy the way that some of my designer friends can throw spaghetti against the wall and tinker with an appealing idea without worrying about the formal rules it implies.

So, what now? We've spent decades building HCI programs that mostly look like computer science departments with design electives. But if we're moving toward a world where invention is bottlenecked more on imagination than on technical expertise, we may have that backwards. We may need programs that look a little more like art school with technical electives—learning to develop ideas from intuition before being able to express them precisely, to discover by playing with the material.

And as for myself and others in this scene who grew up in programming culture: how should we adapt and grow? Is technical fluency necessarily a drag on one's childlike imagination? I take some comfort from history's great scientists and computing's founders—figures like Feynman, Kay. Their stories certainly seem to suggest that these capacities can not only coexist, but actually amplify each other. So my question becomes urgent: how can those of us from programming culture better cultivate that kind of resonance in ourselves?