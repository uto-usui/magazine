---
title: "On giving people an undo button in AI products"
source: "https://karlkoch.me/writing/on-giving-people-an-undo-button-in-ai-products"
publishedDate: "2026-10-29"
category: "design"
feedName: "Sidebar"
---

I’ve written about [interfaces becoming services](https://karlkoch.me/writing/interface-as-a-service/): you ask for something, the system works out the steps and presents what you need. I still find that direction interesting. I also think it makes an ordinary bit of interface design much more important: being able to change your mind after seeing the result.

An AI product can understand the general request and still change something you wanted to keep. The result might be perfectly reasonable, just wrong for you. If the interface makes that difficult to inspect or reverse, trying the feature becomes a commitment you didn’t expect to make.

My work at DuckDuckGo spans AI-assisted answers and the details of our browser experience. That’s made me interested in how much a product should explain without asking people to understand all of its machinery. The following is a hypothetical note-editing feature, rather than a description of something we’ve shipped.

## A small edit with a meaningful difference

Suppose you’ve written this note:

> Ask Sam whether Friday is realistic. Don’t promise a delivery date until we’ve checked the migration.

You ask an assistant to tidy it up. It comes back with:

> Confirm Friday’s delivery with Sam after reviewing the migration.

It reads quite neatly, but Friday has gone from an open question to something much closer to a commitment. I’ve invented this example, though it’s exactly the sort of change I’d want to be able to spot before accepting a rewrite.

If the new wording silently replaces the original, you have to remember what you wrote well enough to recognise the change. If the original is still visible alongside the proposal, the difference is available to inspect. You can keep the part you like, reject the change or adjust the request.

For this feature, I’d start with a proposal beside the original and explicit **Use this version** and **Keep original** actions. Once accepted, the interface would retain the previous version and offer a clearly labelled way to restore it.

Stage

What the person should be able to see or do

Proposal

Compare the original note with the suggested wording

Decision

Accept, reject or edit the suggestion

Accepted edit

See that the new wording has been saved

Recovery

Inspect and restore the previous version

This gives the person a way to assess meaning, rather than only judging whether the new text reads well. It also makes it possible to try again without treating every failed attempt as lost work.

## Undo needs to mean something precise

Before putting Undo on a button, I need to be clear about what it will restore.

Imagine accepting the rewrite, adding another paragraph yourself and then deciding the AI edit was a mistake. If Undo restores the entire old note, it might delete your new paragraph too. A feature intended to make experimentation comfortable has now created a second problem.

For a small editor, a conventional undo history may already have the right behaviour. A more involved product might need to preserve versions or track edits separately. Either way, the interaction needs to account for what happened after the generated change. Restoring an older version should make the scope of that restoration clear, especially when other people have edited the document.

I wouldn’t want the only recovery control to be a toast that disappears after a few seconds. People may notice the problem much later. A temporary Undo action can be convenient, but version history or another persistent route gives them somewhere to go when that moment has passed.

There’s also a limit to what recovery can promise. Restoring text in a private draft is different from recalling a message somebody may already have read. A product can send a correction, but that doesn’t make the original communication disappear.

I’d want the wording to explain what will actually happen in each case, particularly where somebody else has already seen the result.

## Don’t make every action a negotiation

I don’t want to approve every comma an assistant changes. If I’m experimenting with a private draft, can see the result and can reliably recover, a reversible edit may be a better experience than a confirmation step each time.

The useful question is how much commitment the action creates. A suggestion beside my note creates very little. Replacing the note creates more, though a good history can help. Sending the revised note to someone else changes the situation again.

That should influence where the interface asks me to pause. A preview is useful when I need to inspect the result. Confirmation is useful before a consequential action that would be difficult to reverse. For smaller changes, immediate feedback and a dependable way back may be enough.

The thing is, I can ask for help with a change without knowing yet whether I’ll want to keep the answer. The interface needs to leave me room to make that decision after I can see it.

For the note example, I’d judge the design by what happens after a disappointing rewrite. Can I see what changed? Can I keep a useful phrase without accepting the rest? Can I get back to my own wording without losing the work I’ve done since?

That would make me much more comfortable trying it again. I don’t need to be sure I’ll like every result if I can understand what changed and get back to the version I wanted.