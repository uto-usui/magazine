---
title: "The parts of your system you never wrote down"
source: "https://blog.murphytrueman.com/the-parts-of-your-system-you-never-wrote-down/"
publishedDate: "2026-06-05"
category: "design"
feedName: "Sidebar"
---

A year ago I wrote a piece called [your next design system user is an agent](https://blog.murphytrueman.com/p/your-next-design-system-user). The case was that you should treat your components like an API, give them clear contracts, names that mean something, so an agent can read them. I still think that's right. What I didn't sit with for long enough is how much of an agent's time is spent past the edge of what you wrote down, and how much rides on what it finds out there.

An agent doesn't stop at that edge. It can't. It runs into something you left open, a prop you never added, a state nobody designed, a spacing value that shows up in three components and never got a name, and it just keeps going. It has to put something there. And what it picks won't be what you meant, because what you meant was never written down anywhere it could find. So it uses the average instead. Your `Card` ends up looking like whatever the most common `Card` on the internet looks like, because once your definition runs out, that's all that's left to copy.

People want to call this drift. It isn't. Drift is when your system says two different things and the agent faithfully builds both, and I've written about that, it's real and it's a mess. But drift means the answer is in there somewhere, just arguing with itself. This is different. There was nothing in the gap at all. The agent didn't copy your inconsistency, it made up a consistency you never agreed to, and it did it without a second of hesitation.

A designer in that spot knows they're guessing. They'll ask in Slack, or go find whoever built the thing, or leave a comment saying they weren't sure. Everyone downstream can see it was a guess. An agent doesn't do that. Its guess comes back as finished code that looks exactly like the parts it got right, and nothing tells you which is which. Read it back a week later and you won't be able to say what came from your documentation and what came from the agent's best impression of a date picker.

So the empty spaces in your system start to cost you, when they used to be the cheapest thing in it. An undocumented prop was just a question someone would eventually ask, and the whole cost of it was one Slack message and an afternoon. Now that gap gets filled on every single run, always from the same outside default, and not one of those answers ever shows up as a decision a person made. You find out months later, if you find out at all, when something looks slightly off in review and you trace it back to a behaviour nobody on the team ever chose, sitting there in every screen.

Here's the kind of thing I mean. Say your team builds a confirmation dialog for the destructive stuff, deleting an account, wiping a dataset, the things you can't take back. A lot of dialogs put keyboard focus straight on the confirm button when they open, and plenty of libraries ship it that way, so that's what an agent reaches for too. Your team did the opposite and focused the cancel button. As it happens, that's also what [the W3C suggests](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/?ref=blog.murphytrueman.com) for anything you can't undo. But you didn't do it because of a spec. You did it because you once watched someone hammer enter the second the dialog appeared, delete the thing, and then go very still in the way people do when they know it's gone for good. So you moved focus to cancel and made people travel to confirm. That decision was never in a style guide. It came out of watching it go wrong.

Now hand that system to an agent and ask for a new confirmation flow. Your `ConfirmDialog` says nothing about focus, because the behaviour sits down in the code and the reason for it only exists in the heads of the people who were there. So the agent does what everyone else does and focuses confirm. What it builds looks like yours, imports your component, gets through review without a second look. And it has walked the exact problem your team built the thing to avoid straight back into the product. Nobody chose to reverse that. The reason just wasn't anywhere the agent could see it, so it was as good as gone.

The fix is smaller than all that makes it sound. You're not documenting every prop and every edge case, which was never going to happen anyway. You're documenting the few places where your answer isn't the obvious one. If your `Modal` closes on a backdrop click like every other modal ever made, fine, let the agent assume it, it'll be right. The cancel-focus call is the one you have to write down, in the component itself, in plain words, because it's the kind of deliberate choice the average rolls straight over.

Which makes this a different audit than the one I sent you off to do last year. Last year I said read your component names and ask whether a stranger could follow them. Still a good idea. But the deeper pass is to go looking for every place where you chose something unusual on purpose, the default you flipped, the interaction you rebuilt after a bad week, the rule that only exists because of some bug you never want to see again. Those are the things an agent sands back down to the average, and it won't say a word while it does. Every one of them is a decision you made once, for a reason you can probably still recite. And every one is back in play now, because you never wrote it down where a machine would find it.

An agent will never hand you back an empty gap. It fills the silence with the rest of the world, and the rest of the world has never met your users.

* * *

Thanks for reading! If you enjoyed this article, subscribing is the best way to keep up with new posts. And if it was useful, passing it on to someone who'd find it relevant is always appreciated.

You can find me on [LinkedIn](https://linkedin.com/in/murphytrueman?ref=blog.murphytrueman.com), [X](https://x.com/murphytrueman?ref=blog.murphytrueman.com), and [Bluesky](https://bsky.app/profile/murphytrueman.com?ref=blog.murphytrueman.com).