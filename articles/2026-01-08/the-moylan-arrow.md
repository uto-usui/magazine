---
title: "The Moylan arrow"
source: "https://jarango.com/2026/01/06/the-moylan-arrow-ia-lessons-for-ai-powered-systems/"
publishedDate: "2026-01-07"
category: "design"
feedName: "Sidebar"
---

[Jim Moylan died recently](https://www.wsj.com/business/autos/ford-gas-arrow-inventor-jim-moylan-6b2ef066?st=wwpyRk&reflink=desktopwebshare_permalink). He was the Ford engineer who proposed that little arrow on the fuel gauge of most cars that indicates the cap’s location. It’s handy when you’re pulling into a gas station to refuel, especially when you’re driving an unfamiliar car.

The [Moylan arrow](https://en.wikipedia.org/wiki/Fuel_gauge#Moylan_arrow) is such an obviously useful idea that it was immediately implemented by Ford and widely adopted by other manufacturers. It’s also an excellent example of good [information architecture](https://jarango.com/what-is-information-architecture/) — and one that provides important lessons as we navigate the AI age.

## How Is This Information Architecture?

Information allows us to act more skillfully. Imagine you come to a fork on a road. Without a sign, you’d need a compass or a great sense of direction to choose correctly. But with a clear sign, you’d quickly know which road to take. The sign reduces ambiguity.

The Moylan arrow, too, disambiguates a choice. Pulling in on the wrong side of the pump is an annoying inconvenience. By making the driver smarter, the arrow improves the car’s UX. Critically, it does so without much cost to the manufacturer. That’s why it’s become pervasive.

“But,” you may protest, “this isn’t IA; it’s user interface/icon design.” That’s partly true. As usual, users experience IA in an interface. The arrow wouldn’t be as effective if it wasn’t clear and recognizable. Visuals — the choice of symbols (an abstracted gas pump and a triangle) and colors (usually white on black) — are key.

But there’s more to it than that. A big part of the arrow’s effectiveness is its location: on the dashboard, next to the fuel gauge — exactly where you’re looking when your car needs refueling. Consider how much less effective it’d be if it were only noted in the owner’s manual.

The Moylan arrow works because it’s:

-   **Clear**: legible and understandable
-   **Findable**: located where you’re already looking
-   **Relevant**: provides the exact answer you need
-   **Contextual**: available when needed, but “quiet” otherwise
-   **Obvious**: doesn’t need further instructions
-   **Cheap**: of negligible cost to manufacturers

The arrow isn’t just a clear icon. It disambiguates a key structural distinction of the car. The mental model is clear: most current [ICE](https://en.wikipedia.org/wiki/Internal_combustion_engine) cars have their fuel cap on either the left or right side. The question is, “which is it for _this_ car?” The answer is obvious once you know where to look — and it’s cognitively respectful (i.e., it doesn’t scream, “LOOK AT ME!” while you’re driving.)

Which is to say, the Moylan arrow:

1.  answers a latent question (“Which side is the fuel cap on?”)
2.  at a time when the user is making a key decision (pulling in to a gas station)
3.  by showing them just what they need (left or right side)
4.  where they expect to find it (on the dashboard, next to the fuel gauge)
5.  cheaply, efficiently, and respectfully.

That’s classic information architecture.

## What Does This Have to do With AI?

This is the _opposite_ approach to many of today’s AI-powered systems. The arrow is low tech (just a bit more paint/pixels!) and therefore relatively cheap. It does just one job — resolving structural ambiguity — effectively and efficiently. It’s there when needed and blends into the background otherwise.

Admittedly, its elegance is due in great part to the binary, static, and universal nature of the information it conveys. The cap can only be in one of two positions: left or right. These concepts are unambiguously represented with arrows across cultures. (The pump is more complicated but still recognizable.) Also, the information is static: the cap won’t change sides between fuelings.

This is a very constrained set of requirements. But compare the Moylan’s solution with many AI products today, especially those with chat interfaces. Rather than a constrained structure within an expectable construct (dashboard → fuel gauge → \[left|right\] arrow), chats offer completely open-ended interfaces. This may be appropriate for systems that require extraordinary flexibility, but it’s overkill otherwise. And while flexibility adds power, it opens the door to complexity and errors. (Consider the risk of hallucinations!)

Chat interfaces also have higher latency than more structured UIs. Conversational interfaces require explicit instructions — either spoken or typed — before they can provide utility, and getting there may take multiple rounds. To put it bluntly: for many tasks, [chat UIs are inefficient](https://jarango.com/2023/05/18/thinking-with-words/). Compare this with the low latency inherent in Moylan’s “ambient” approach: just glance and turn the wheel.

Finally, many AI-powered products call too much attention to themselves. The value to the user (e.g., avoiding the inconvenience/embarrassment of pulling in to the wrong side of the pump) takes a back seat (sorry!) to the fact the product now “has AI.” Lacking good system models, users can only guess at what pressing the pervasive “sparklies” and “copilot” buttons might do. Many users recoil when products add complexity through seemingly gratuitous features.

## What Can We Learn From This?

I’m not poo-pooing chat UIs. They’re appropriate for some use cases. But they’re also overused. I expect this is because of two reasons:

-   **Chat = AI**. Many people associate chat UIs with AI, so they expect conversational interactions.
-   **Laziness**. It’s easier to graft a chatbot onto a product than redesign its IA to accommodate new capabilities.

Both reasons are bad. If you believe your system’s value will come from making it more “intelligent,” it’ll likely turn out overwrought. Users get most value from systems that help them effectively and efficiently and otherwise get out of the way. They don’t want to “AI all the things”; they just want the _right_ information _when_ and _where_ they need it. Everything else is noise.

Rather than ask, “how might we add AI to this system?,” consider the following questions:

-   What is the person trying to do?
-   Do they understand the system?
-   What’s keeping them from choosing skillfully?
-   What questions do they have? Which come up repeatedly?
-   Which structural distinctions are ambiguous?

These are information architecture questions. AI might play an important role in answering them — even in real time, as the user interacts with the system. But it won’t happen by simply “adding AI.” Instead, you must understand the user’s needs as they work with the system. Then, you can determine where to judiciously apply AI.

Also, rather than an open-ended UI (such as a chat,) consider whether your system might be better served by a UI that offers clear distinctions and affordances. Buttons and menus don’t just give users means to act: they also help them understand the system. A thoughtful IA will make your AI-powered product easier to use — and likely do it more cheaply and elegantly than a chat UI.

## Closing Thoughts

I doubt Jim Moylan thought of himself as an IA. But that doesn’t matter. We can study manifestations of an area of practice retrospectively even if they weren’t explicitly produced as such. (For example, we think of many ancient buildings as “architecture” even though their designers didn’t think of themselves as architects in our current sense.)

As the practice of designing AI-powered systems matures, I expect we’ll move away from general-purpose interfaces to systems that use AI on the back end while presenting a more traditional UX. There’s room for delight and intelligence in simple, less open-ended systems. The Moylan arrow is an excellent example.

_This post first appeared on [unfinishe\_ thoughts](https://thoughts.unfinishe.com/p/the-moylan-arrow-ia-lessons-for-ai)._