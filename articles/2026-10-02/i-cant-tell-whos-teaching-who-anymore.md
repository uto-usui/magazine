---
title: "I can’t tell who’s teaching who anymore"
source: "https://blog.murphytrueman.com/i-cant-tell-whos-teaching-who-anymore/"
publishedDate: "2026-10-01"
category: "design"
feedName: "Sidebar"
---

I finished writing an article recently. I did what I always do before I queue something to be published: read it aloud, as if reading a storybook to a child. It's how I find the rhythm: where a comma should sit, whether an em dash earns its beat, and which parenthesis a reader can skip without missing much.

Lately, though, the read-through has turned into a hunt. I take out em dashes and replace them with commas or full stops, keeping the rhythm steady while making the change less obvious. I look for words like "genuinely", "honest", "quiet", "silent", or "worth", and swap them for something more neutral, almost as if I'm burying my own style. Those are just some of the words saved in a file on my desktop, called the Literary Graveyard. It's full of familiar words, phrases, and patterns that make people read a piece as AI-generated rather than crafted. I found them in arguments in Slack channels, LinkedIn posts, and firsthand comments from a former boss, who was adamant that I strip the em dashes out of what I was writing, grammatically correct as they were, just in case someone assumed it was written by AI.

What irks me most is that they were mine first. I, like many others, wrote like this for years before any model did. A machine learned those words, structures, and patterns from people like me, and it repeated them back to me until they stopped feeling like my own. That's a lot of self-surveillance for someone who just wanted to write about design tokens.

It's a loop I recognise from years spent in product and design systems. I've watched it play out plenty of times. You put a pattern into a system, people copy it, and after a while the copying is the proof: it's everywhere, so it must’ve been right. Sometimes the system is cataloguing something that already worked. Other times it invents a behaviour out of nothing, then treats its own spread as the verdict. Half the job is tracing a pattern back to work out which of the two it was, whether anyone actually chose it or it just piled up. I see the same loop in language now, except there's nothing to audit it against. I can't tell which direction the influence runs anymore.

## The words came from us first

When I first learned about AI, I assumed models invented their own vocabulary. They don't, not really. Researchers at [Florida State](https://arxiv.org/abs/2412.11385?ref=blog.murphytrueman.com) wanted to understand why ChatGPT uses the word "delve" so frequently. The culprit turned out to be the feedback stage, where humans rate the model's answers to teach it what "good" looks like.

When researchers tested it, readers rated the word "delve" lower than any other buzzword. So this wasn't the model copying a word people loved. A specific group of human reviewers, at one moment in training, nudged it toward "delve", and the model learned the lesson. The words we now roll our eyes at started as a snapshot of what one room of people rewarded. They came from us first.

Then it came back.

Researchers at the [Max Planck Institute](https://arxiv.org/abs/2409.01754?ref=blog.murphytrueman.com) listened to more than 737,000 hours of unscripted podcasts and were able to tie the rise of words like "delve" directly to the release of ChatGPT. If you spend enough time talking to a model, its words begin turning up in your own vocabulary.

The influence had reversed. We taught the model, and then the model was teaching us.

And then it turned back once more.

Once "delve" became a punchline, people used it less frequently than they had before ChatGPT existed. In fact, it was used so infrequently that newer models were tuned to stop using it at all. We started editing ourselves so we wouldn't sound like a machine, while the machine was edited so it wouldn't sound like itself.

My Graveyard file sits right in the middle of this. Every entry in it is me editing my own writing because of something a model does. The same move those podcast hosts made with "delve", only pointed the other way.

## Toward the middle

There's a name for where this ends up. Model collapse. In 2024, [Nature](https://www.nature.com/articles/s41586-024-07566-y?ref=blog.murphytrueman.com) wrote a paper on what happens when models train on the output of other models. The rare, specific details are the first to disappear. Round after round the unusual gets averaged away, and by the ninth round the thread is gone entirely.

If you work in design systems, you'll know this by another name. We call it drift — when a system slowly stops meaning anything, because every team keeps bending it into their own one-off versions until there's no shared standard left. What I'm describing runs the other way — instead of scattering, everything pulls toward the middle. The rare and the particular get sanded off, and what's left is the most ordinary version of that thing. The most intricate and human parts are the first to go.

Every word I move to the Graveyard is me averaging my own writing by hand — the same pull the training loop applies at scale, just slower, and one decision at a time. I'd been telling myself it was a defense. It isn’t.

## What my mama taught me

I feel all of this most when I read now — articles, newsletters, a LinkedIn comment, documentation. A year ago I could usually tell whether something came out of lived experience. But lately, that line has become blurry. I scan for the tells I've trained myself to avoid before I can take any of it in, and it's made writing feel as heavy as reading. And I've been scared to write, because the structure I was taught to use could be interpreted as a tell to someone who doesn't know me.

That structure came from my mum. She studied writing and built a career in change management, technical writing, and e-learning — taking complicated things and breaking them into pieces a person could hold (sounds familiar, doesn’t it?). From a young age, she encouraged me to read and write as much as I could, and I loved it. So much of how I build a sentence came from her. And clear, structured, technical writing (unfortunately… maybe?) is what these models are trained on.

The words I’ve been burying in my Graveyard read as machine-written, because writers like her wrote that way first. In a way, I’ve been editing her out of my own sentences to keep them from sounding like the thing that I learned from her. It's an uncomfortable thing to think about… That one of the things she gave me (and that I cherish the most) is now the thing most likely to be mistaken for a machine.

It’s been bothering me so much that I called her a few days ago after I started spiralling. In true motherly fashion, she was quick to tell me that I should never shrink myself or change how I write to appease others. But that still hasn’t stopped me from combing through each draft a hundred times.

So I tried to better understand how the detectors actually work, partly hoping I’d come away feeling silly for worrying, and that I’d be able to stop overanalysing (and overediting) everything I write. But I didn’t. 

It generally comes down to two key things: whether your words are the ones a model would reach for, and whether your sentences run to a similar length. If you write cleanly, evenly, and in a way that’s easy to follow, you sit comfortably in the band these models flag. That’s the way I was taught to write. The habits my mum spent years instilling in me, are now the ones a stranger reads as a machine’s. It’s an incredibly weird and depressing thing to think about.

It’s not just a software problem, either. The researchers who ran the podcast study warned that their flagged words are starting to read as an indicator of lower skill, or lazy AI use. The words they’re talking about aren’t machine inventions. They’re just good words that you pick up from years of reading. The kind of words that careful, meticulous writers reached for long before a model made them radioactive. Which is what frustrates me most — the people who learned to write, who built the vocabulary, now get to watch it read back as a machine’s.

I’ve built most of my sense of self around this work. I know it isn’t healthy, but sixteen years is a long time to spend getting good at something. The skills I worked hardest for were the slow ones. Like reading a Figma file and a codebase side-by-side and seeing where they drift, or writing documentation that a tired developer could follow at four in the afternoon. 

Those skills are now being absorbed into tools. And I’ve been struggling to figure out what’s left of me once the work counts for less. If so much of how I see and value myself is tied to being good at this, and being good at this matters less with each passing month, it’s hard to not feel helpless. Like a part of me is disappearing alongside it.

Writing has always been a lonely activity for me, and using a model to think out loud, or test whether an idea has any substance, has made it less so. I don’t think there’s anything wrong with that. But saying that out loud feels risky, because the moment a model goes near your work, people are quick to label it as slop. As if the word were about the tool, and not the care that went in.

I don’t think slop has much to do with the model at all. It comes down to effort, and whether any was spent. If someone can’t be bothered to create a draft, or read their own words, why should the onus be on someone else to figure out what was meant? 

Reading content from someone is a form of trust: I give you my attention because you gave the work your care. Hand me raw output that no one checked, tweaked, or influenced, and you’ve just spent my time to save your own.

Someone can spend hours, days, weeks labouring over an article. They can lean on a model to help it find its shape, improve a few sentences, and that article will still have a pulse. But someone else can prompt a model to “write a full article about X topic”, post whatever comes back unread, and you can feel the hollowness. For me, this is where I draw the line between what’s acceptable and what isn’t.

What’s worse is that, often, detectors aren’t capable of telling these two apart. The version that was intentionally crafted, with someone mulling over word choices, sentence structure, and tone, gets read the same way as the shell someone produced by one-shotting a prompt, written to appease the prompter and no one else.

These models learned to be useful from the people who did the work the slow way, from the beginning, and who were generous with what they learned. How is it possible that those very same people — who put in the time and learned the hard way — are the ones forced to defend their work?

We’re already seeing the effects of this. In January, Tailwind Labs laid off three of its four engineers, and founder Adam Wathan said traffic to its documentation had dropped about 40% since early 2023, even as the framework grew more popular than ever. Developers had stopped visiting the docs because their tools already knew them. The people whose work taught the models are the ones paying for it.

* * *

I don’t have a fix for any of this, and I certainly don’t have one for the identity crisis. 

I called this article ‘I can’t tell who’s teaching who anymore’, and I meant it about the world out there. But the version that keeps me awake at night is a little closer to home. It’s whether I can still find myself in something I wrote.