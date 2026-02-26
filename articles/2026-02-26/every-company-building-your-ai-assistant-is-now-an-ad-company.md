---
title: "Every company building your AI assistant is now an ad company"
source: "https://juno-labs.com/blogs/every-company-building-your-ai-assistant-is-an-ad-company"
publishedDate: "2026-02-24"
category: "design"
feedName: "Sidebar"
---

[Pre-orders for the Juno Pioneer Edition now open, reserve your Juno today!](https://store.juno-labs.com/)

Friday, 20 February 2026 · [Adam Juhasz](https://juno-labs.com/cdn-cgi/l/email-protection#28494c494568425d46470544494a5b064b4745)

On January 16, OpenAI quietly announced that ChatGPT would begin showing advertisements. By February 9th, ads were live. Eight months earlier, OpenAI spent $6.5 billion to acquire Jony Ive's hardware startup io. They're building a pocket-sized, screenless device with built-in cameras and microphones -- "contextually aware," designed to replace your phone.

But this isn't a post about OpenAI. They're just the latest. The problem is structural.

**Every single company[We can quibble about Apple.](https://9to5mac.com/2025/04/14/apple-rebrands-search-ads-business-as-apple-ads/) building AI assistants is now funded by advertising.** And every one of them is building hardware designed to see and hear everything around you, all day, every day. These two facts are on a collision course, and local on-device inference is the only way off the track.

## The always-on future is inevitable

Before we talk about who's building it, let's be clear about _what's_ being built.

Every mainstream voice assistant today works behind a gate. You say a magic word -- "Hey Siri," "OK Google," "Alexa" -- and only then does the system listen. Everything before the wake word is theoretically discarded.

This was a reasonable design in 2014. It is a dead end for where AI assistance needs to go.

Here's what happens in a real kitchen at 6:30am:Anonymized from one of our test homes. The real version was messier and included a toddler screaming about Cheerios.

> "Are we out of eggs again? I'm thinking frittata tonight but we also need to -- oh wait, did the school email about Thursday? I think there's a early release. Anyway, if we don't have eggs, I'll get them from Target and also that dish soap, the blue one."

Nobody is going to preface that with a wake word. The information is woven into natural speech between two flustered parents getting the family ready to leave the house. The moment you require a trigger, you lose the most valuable interactions -- the ones that happen while people are living their lives, not thinking of how to give context to an AI assistant.

You cannot build proactive assistance behind a wake word. The AI has to be present in the room, continuously, accumulating context over days and weeks and months, to build the understanding that makes proactive help possible.

This is where every major AI company is heading. Not just audio -- vision, presence detection, wearables, multi-room awareness. The next generation of AI assistants will hear and see everything. Some will be on your face or in your ears all day. They will be always on, always sensing, always building a model of your life.

**The question is not _whether_ always-on AI will happen. It's who controls the data it collects. And right now, the answer to that question is: advertising companies.**

## Policy is a promise. Architecture is a guarantee.

Here's where the industry's response gets predictable. "We encrypt the data in transit." "We delete it after processing." "We anonymize everything." "Ads don't influence the AI's answers." "Read our privacy policy."With cloud processing, every user is trusting:  
• The company's current privacy policy  
• Every employee with production access  
• Every third-party vendor in the processing pipeline  
• Every government that can issue a subpoena or national security letter  
• Every advertiser partnership that hasn't been announced yet  
• The company's future privacy policy

OpenAI's own ad announcement includes this language: "OpenAI keeps conversations with ChatGPT private from advertisers, and never sells data to advertisers." It sounds reassuring. But Google [scanned every Gmail for ad targeting for thirteen years](https://en.wikipedia.org/wiki/Privacy_concerns_with_Google#Gmail) before quietly stopping in 2017. Policies change. Architectures don't.

Policy is a promise. Architecture is a guarantee.

When a device processes data locally, the data _physically cannot leave the network_. There is no API endpoint to call. There is no telemetry pipeline. There is no "anonymized usage data" that somehow still contains enough signal to be useful for ad targeting. The inference hardware sits inside the device or in the user's home, on their network.

Your email is sensitive. A continuous audio and visual feed of your home is something else entirely. It captures arguments, breakdowns, medical conversations, financial discussions, intimate moments, parenting at its worst, the completely unguarded version of people that exists only when they believe nobody is watching.We wrote a deep dive on our memory system in [Building Memory for an Always-On AI That Listens to Your Kitchen](https://juno-labs.com/blogs/building-memory-for-an-always-on-ai-that-listens-to-your-kitchen.html).

Amazon already showed us what happens. [They eliminated local voice processing.](https://www.entrepreneur.com/business-news/amazon-echo-ends-do-not-send-voice-recordings-option/488677) [They planned to feed Alexa conversations to advertisers.](https://alexaechos.com/) [They partnered Ring with a surveillance network that had federal law enforcement access.](https://www.eff.org/deeplinks/2025/07/amazon-ring-cashes-techno-authoritarianism-and-mass-surveillance) What happens when those same economic incentives are applied to devices that capture everything?

## The edge inference stack is ready

The counterargument is always the same: "Local models aren't good enough." Three years ago, that was true. It is no longer true.

You can run a complete ambient AI pipeline today -- real-time speech-to-text, semantic memory, conversational reasoning, text-to-speech, etc -- on a device that fits next to a cable box (remember those?). No fan noise. A one-time hardware purchase with no per-query fee and no data leaving the building. New model architectures, better compression, and open-source inference engines have converged to make this possible, and the silicon roadmap points in one direction: more capability per watt, every year.We've been running always-on prototypes in five homes. The complaints we get are about the AI misunderstanding context, not about raw model capability. That's a memory architecture problem, not a model size problem.

Are local models as capable as the best cloud models? No. But we're usually not asking our smart speaker to re-derive the Planck constant.

Hardware that runs inference on-device. Models that process audio and video locally and never transmit it. **There needs to be a business model based on selling the hardware and software, not the data the hardware collects. An architecture where the company that makes the device _literally cannot access_ the data it processes, because there is no connection to access it through.**

The most helpful AI will also be the most intimate technology ever built. It will hear everything. See everything. Know everything about the family. The only architecture that keeps that technology safe is one where it is structurally incapable of betraying that knowledge. Not policy. Not promises. Not a privacy setting that can be quietly removed in a March software update.

Choose local. Choose edge. Build the AI that knows everything but phones home nothing.

* * *