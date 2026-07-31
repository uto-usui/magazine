---
title: "How to research technical topics with AI"
source: "https://www.0xkato.xyz/how-to-research-technical-topics-with-ai"
publishedDate: "2026-07-30"
category: "design"
feedName: "Sidebar"
---

-   [Home](https://www.0xkato.xyz/)
-   [Blog](https://www.0xkato.xyz/blog)
-   [Research](https://www.0xkato.xyz/projects)
-   [About](https://www.0xkato.xyz/about)
-   [Portfolio](https://github.com/0xkato/Portfolio/tree/main)

![How to Research Technical Topics With AI](https://www.0xkato.xyz/assets/howtoresearch.png)

Tuesday. July 28, 2026 - 9 mins

I used AI throughout the process of learning how LLMs work. I did not begin with an article in mind, I first learned the topic well enough to explain it then decided to turn that understanding into [How LLMs Actually Work](https://www.0xkato.xyz/how-llms-actually-work/).

I used it to find the right terminology, locate useful material, question my explanations and expose gaps in what I thought I understood. I still had to understand the transformer stack well enough to explain every important part and defend the simplifications I made.

This is how I go from a technical question I cannot answer to an explanation I can reconstruct. Turning that understanding into an article comes later.

## “How do LLMs work?” was still too broad

When I started learning how LLMs work the obvious question was “How do LLMs work?” It was also too broad to research directly. It could lead into training, hardware, tokenization, inference, alignment, scaling laws, model architecture or the product built around the model. A model could produce a convincing tour through all of them without giving me a useful understanding of any one of them.

I narrowed the question to what happens after someone types a prompt and before the model predicts the next token, that gave the subject a beginning and an end. It also gave me an order: tokenization before embeddings, embeddings before positional information, positional information before attention and the transformer output before the generation loop. Training mattered but it was outside the question I was trying to answer.

Before asking for explanations, I give the narrowed question to a model and ask which concepts it depends on, what I need to understand first and where the question is still ambiguous. I turn the response into an ordered list of things to investigate, I use that list to choose what to try and understand next.

While breaking the question apart I also figure out what terminology I am missing. I often know what confuses me before I know what it is called. “How does the model know which word came first?” was enough to lead me toward positional encodings so I learned absolute positions, relative position methods and RoPE. Once I had those terms I could search papers, documentation, code and with a clearer understanding.

Those terms make ordinary search much more useful. When the model suggests a source I ask what I should expect to find there before opening it. An original paper can show how an idea was defined, documentation can show how it is implemented now and code can settle a detail that both an overview and a paper skip. A good tutorial can provide the mental model that makes the other material readable.

Everything the model gives me at this stage is a lead. I still have to open it and decide whether it answers the question I am working on.

## One part at a time

Once I know which concepts depend on which I stop asking AI to explain the whole system. I take one part at a time and stay with it until I can explain what goes into it and what it does and what comes out.

Multi-head attention was a good example. A common explanation says the model splits a token vector into chunks and gives one chunk to each head. It is an easy picture to remember but it can leave the wrong idea behind, each head uses learned projections for its Query, Key and Value representations. Implementations may combine those projections into larger operations for efficiency but the heads are learned views rather than predetermined semantic slices of the original vector.

AI helped me locate the relevant sections in papers and implementations, then compare how different tutorials described the mechanism. The part that helped most was giving it my explanation and asking what was technically wrong what was a reasonable simplification, and where the simplification would become misleading.

I ask for criticism without asking for a rewrite. If the model immediately replaces my explanation I can agree with the new wording without understanding why mine failed, I also like keeping my version in front of me because it forces me to repair the actual gap.

## The source and the explanation are different things

My notes for each part contain two things. One is the exact technical claim and where it came from. The other is the simplest explanation that made the idea click for me.

For multi-head attention the original paper says that Queries, Keys, and Values are projected multiple times using different learned projections. My mental model was “different learned views of the same token not different chunks of it.” The sentence that appeared in the article was:

> “Each head does not get a literal slice of the original token vector. Each head has its own learned projection matrices that map the full token vector down to its own smaller Query, Key, and Value vectors.”

Keeping them separate stops me from treating a useful simplification as a literal description of how every implementation works. The explanation helps someone picture the mechanism. The source tells me what that picture is standing in for.

I also record the limit of the explanation. Implementations often combine the projections into one large operation and split the projected result for efficiency. The mental model describes the learned transformations. It does not claim that every implementation arranges the computation in exactly the same way.

## The chat is not the source

The model can help me find and read a source. It cannot be the source.

For anything important, I open the paper, documentation, code, benchmark, or dataset myself. I find the exact section, read what comes before and after it, and check whether the author is making the same claim I want to make.

I also look outside the page. I check who created the source, whether another article is reporting original work or repeating the same result, whether a later version changed the conclusion, and whether an implementation still behaves the way an older explanation describes.

Checking the age and context of each source mattered while I was learning how LLMs work because transformer explanations often blend several generations of the architecture together. The original transformer, a current decoder-only LLM, and one library implementation are related, but they are not interchangeable. If I use the original paper for the basic mechanism and current documentation for a modern variation, my notes need to preserve that distinction.

AI makes this source tracing faster. I can ask it to find an earlier version of a claim, later work that disagrees with it, or an implementation that uses the idea. I still open each result before relying on the connection.

## Try to prove the explanation wrong

The first explanation that makes sense is usually the one I become attached to. That is when I start looking for evidence against it.

For each part, I ask what a knowledgeable reader would object to. Where does the mental model stop working? Which word is too strong? Am I describing something that happens in every model or one common implementation?

In the LLM article, saying that attention heads “specialize” was easy to understand. Saying they become partially specialized was more correct. Some heads show recognizable patterns, but the clean picture where every head owns one job goes further than the evidence does.

The same problem appears in sentences such as “the feed-forward network stores knowledge” or “the model learns to reason.” They can point toward something real while making a complicated and disputed question sound settled. I narrow the wording, explain the boundary, or leave the claim out.

While looking for weaknesses, I still use AI, but I do not ask the same conversation whether it agrees with itself. I change the search terms, inspect later work, look for criticism, and sometimes give the explanation to another model or a reader who has not seen the earlier discussion.

The goal is to find the strongest version of the objection, not produce a reassuring list of minor caveats.

## Close the chat

After working through the individual parts and challenging my explanations, I close the chat and try to reconstruct the topic from a blank page (yes, I use pen and paper).

For LLMs, that meant following the prompt all the way from text to the next token and explaining why each step was needed. If I could name two adjacent components but could not explain what changed between them, I had found a gap. I went back to the sources at that exact point instead of asking for another complete explanation.

Writing the mechanism in my own words is part of the research. It makes missing links visible in a way that rereading a fluent answer does not. A paragraph can feel obvious while it is on the screen and disappear the moment I try to rebuild it without help.

I am done researching a part when I can explain it without borrowing the source’s phrasing, connect it to the parts around it, and state where my explanation stops being exact.

## Only then write

When I can reconstruct the subject without the model, I ask it to help with the prose.

At that point I have the structure of the subject, checked notes for the important claims, the mental models I want to use, and a record of the limitations. I give those materials to the model rather than asking the research conversation to turn itself into an article.

A research chat contains guesses, dead ends, repeated sources, and explanations that were useful only because they led somewhere better. If the draft is written from the chat, those things can slip into the article as if they survived the research.

For “How LLMs Actually Work”, I gave the model my notes, the order in which the mechanisms needed to be explained, and the intended reader. The first draft gave me something to edit. I changed the wording, moved sections, corrected technical claims, and added explanations wherever the draft assumed knowledge it had not taught.

I listened to the article through text-to-speech and stopped whenever something sounded weird, confusing, or unlike me. I also gave it to a reader with no ML background and checked where the explanation lost them.

After the reader-focused edit, I did a separate factual pass. I pulled the factual claims back out of the finished prose and checked them against the notes and sources.

The whole process is simple: narrow the question, work out what depends on what, research one part at a time, keep the source beside the explanation, look for the point where the explanation fails, rebuild the topic without the model, and write from the notes that survived those checks.

Feedback is extremely welcome. If any of this interests you, please reach out on [X](https://x.com/0xkato). I love making new friends.