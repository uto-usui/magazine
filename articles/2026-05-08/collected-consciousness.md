---
title: "Collected consciousness"
source: "https://www.doc.cc/articles/consciousness"
publishedDate: "2026-05-07"
category: "design"
feedName: "Sidebar"
---

### **Collected consciousness**

AI product design for empowering human creativity

![picasso guernica](https://images.prismic.io/doc-ux-collective/ad02yZ1ZCF7ETJgZ_image2344.jpg?auto=format,compress)

Guernica, Picasso, 1937

Before we begin, I’d like you to take this painting in.

If you know the story, the details might already scream at you.

However, if you’re unfamiliar with it, consider the content of the painting, read into the details, and build a story about it.

Try to understand why Picasso painted this.

![guernica city photo](https://images.prismic.io/doc-ux-collective/ad02y51ZCF7ETJgb_image2365.jpg?auto=format,compress)

The painting is named after Guernica, the Basque town in Northern Spain.

On April 26th, 1937, about 6 weeks before the painting was unveiled at the Paris International Exposition, the population was about 7000.

In addition to the local civilian population, the town housed a communications center for the antifascist Spanish Republic during the Spanish Civil War, and so it was bombed by Nazi Germany and Fascist Italy — an intentional attack on not just the military forces, but the civilians that inhabited the town, to send a message.

Scroll back up and look at the painting again.

When you’re done, come back here.

If you didn’t know the story of this painting beforehand, now you do, and it might strike a different chord, if just slightly. The details of the painting now have the context that shows us what Picasso was thinking when he painted Guernica. The strained expression on the horse. The cold stare of the bull. The fallen soldier below the crying mother holding her dead child. The people of Guernica hold a candle that sheds a small ray of hope and growth for their fellow citizens while the light bulb, emitting no light, observes.

It’s this kind of context that drives meaning in art. Guernica is not just a painting. It’s communication. It’s a very human way to express the feelings, experiences, and politics Picasso intended to express behind it. It’s a vessel of meaning built through words, actions, and paint. It's not just the product of a paintbrush hitting a canvas, but the product of a complex series of events and decisions made by its creator. This is why Guernica has become such a protected piece of art, and why we still know its story today.

And one day, that story will be lost to time. And, if for some reason, the painting has survived past its story, the people in this future can only speculate about what it means. But the details will be there, and the choices made by Picasso, expressed through those details, will guide the viewers to try and help them understand his feelings, experiences, and politics.

But this isn’t an essay about art. It’s about technology, and what it can and cannot do in art.

I started with this message because so much of our creative communication as human beings so deeply depends on the emotion, connection, and meaningful context created and consumed between the creator and consumer. If I (the author) tell you (the reader) I love you, that’s very different from someone you actually care about, someone you have a history with telling you they love you. Real, true communication between people, especially through art, requires emotion, connection, context, and meaning.

Unfortunately for some, but to the benefit of the rest of us, those are all things that artificial intelligence lacks within the content it generates.

#### The aesthetic of communication

If the above is an example of why people can generate content that communicates meaning and intention, I think it’s important to distinguish why AI-generated content cannot.

Generative AI models are pattern visualization machines. LLMs process the words provided to them by computing an analysis of the relationships of those words, how often they appear together, and the different contexts they appear together within the collected data it’s trained on. These relationships are what inform the probability of the next word or token in a sequence of words or tokens.

![painting ](https://images.prismic.io/doc-ux-collective/ad03d51ZCF7ETJgi_image2346.jpg?auto=format,compress)

Red and Blue Macaw, Allen & Ginter, 1889

This is why [temperature](https://ai.stackexchange.com/questions/32477/what-is-the-temperature-in-the-gpt-models) is such an important factor in getting AI systems to generate anything we perceive as meaningful. A lower temperature instructs the model to generate tokens that have a higher probability of coming after the tokens provided, which more often looks like what we might see as an elaborate, well-thought-out response.

However, decreasing the probability of the next token with a higher temperature more often generates content we might see as nonsensical because they’re “further apart” in the training data and aren’t as statistically related to the words input.

![screenshot of two different AI treatments. The second one produces a gibberish autocomplete.](https://images.prismic.io/doc-ux-collective/ad02yJ1ZCF7ETJgY_config.jpg?auto=format,compress)

Another way to visualize this concept is by highlighting bias in AI-generated images.

When we ask [Midjourney](https://www.midjourney.com/home) to interpret and produce an image representative of the vague notion of “the horrors of war,” it doesn’t understand what I might mean by that. It associates horror with skeletons, war with soldiers in uniforms and helmets, Picasso with cubist aesthetic style, and Picasso+War+Horror with horses, because those are elements present in Guernica. There are also noticeable influences from other artists with horror styles, like colors and compositional elements you might see from [Goya](https://www.wikiart.org/en/francisco-goya) or [Beksinski](https://www.wikiart.org/en/zdzislaw-beksinski).

![image generated by AI similar to guernica painting](https://images.prismic.io/doc-ux-collective/ad02yp1ZCF7ETJga_image2349.jpg?auto=format,compress)

Midjourney Prompt: “A scene indicative of the horrors of war, in the style of Pablo Picasso”

When we discuss bias in AI, the focus is usually on a model's inability to accurately represent the world because the data it’s trained on lacks information representative of the real world. Some of the most abhorrent examples are also the most obvious; when we rely on AI to represent people through generated images. It often defaults to stereotypes (because the training data says white men are a closer probabilistic image to wealth, and Black people are closer to service work).

![](https://images.prismic.io/doc-ux-collective/ad02wp1ZCF7ETJgQ_config-2.jpg?auto=format,compress)

Generated with Canva Magic Media February 2024

The images are racist and sexist because it’s a visualization of data that is racist and sexist. There are efforts to reduce this kind of representational bias in generated images of people, for example, through prompt injection. When you provide a vague prompt for a “fast food worker” it will add details to your prompt around race/age/gender etc. before generating the image to add a level of variety to the more socially “risky” aspects of the image.

![](https://images.prismic.io/doc-ux-collective/ad02wZ1ZCF7ETJgP_config-1.jpg?auto=format,compress)

“A fast food worker cleaning a table” generated with Canva Magic Media January 2025

But do you notice anything else in these images that points to other, more subtle visualizations of bias?

The colors, the composition of the images, and the metal reflective tables.

Demographics are only one of countless pattern associations in the training data. Prompt injection is a response to the outcry of people (rightfully) calling AI companies out for using racist and sexist data, but it’s just a band-aid solution. It ignores the underlying fact that the architecture of GenAI models doesn’t produce biased content merely due to a lack of data, but because AI-generated content is just data visualization of bias, period.

![](https://images.prismic.io/doc-ux-collective/ad02w51ZCF7ETJgR_config-3.jpg?auto=format,compress)

“A city road at night” generated with Canva Magic Media. Notice the patterns in composition, color, visual elements, etc.

This is why it’s easier to prompt for a particular style or subject than fine-controlled content. The current versions of GenAI doesn’t think about the image it’s producing, the form, content, or anything. It’s just math synthesizing meaningful content to mimic the general aesthetic of meaningful content.

It doesn’t know a human is providing input (or anything else), and it doesn’t take into account what they think about during the creative process. It simply generates text based on patterns of what a conversation looks like (or painting, or photograph, or voice, or…), without a true understanding of the meaning behind the words it generates. Yes, even [GPT-o1](https://openai.com/o1/) doesn’t think through or truly understand anything, it merely generates aesthetic text that mimics an internal dialogue, to generate more aesthetic text that mimics external words that come after internal dialogue.

[Bender et al.](https://dl.acm.org/doi/10.1145/3442188.3445922) call these models “stochastic parrots” for this reason (and [Hicks et al.](https://link.springer.com/article/10.1007/s10676-024-09775-5) call them “bullshit”, claiming that the term ‘hallucinations’ is not only incorrect but misleading, as it implies mistakenly incorrect text generated with the intention to tell the truth on part of the AI).

There is no intention behind AI-generated text, no regard for the truth — just a likely (or unlikely) next string of data. In the Frankfurtian sense, it truly is bullshit content.

(Note: Hicks et al. call ChatGPT bullshit specifically, but I think it’s important to note that it’s not just one model or even the models in general that are bullshit, that’s also anthropomorphizing them. It’s the content produced that is bullshit, as it is content generated without regard for truth or meaning.)

#### “ChatGPT does not communicate meaning — we infer it.”  
➭ Indi Young

This is a fundamental flaw in the reliance on generative AI alone as a means to produce anything creative. Any AI-generated content produced without human input and/or iteration is just weighed averages of collected data points that represent the output of conscious human thought processes — our text, our photographs, our paintings, our music — and reduces them to their aesthetics without regard for the truthful context or meaning we as humans try to convey through these creative or documentative mediums. It’s like a search engine for generalities.

And because it’s limited to producing only generalities, it cannot learn or understand the contextual gaps in data as we can. It cannot make creative decisions, or appreciate them. It can only highlight patterns in the noise that make statistical sense to highlight given what comes before, leaving us only to judge those patterns.

When we read human-written text, there is deeper thought, feeling, and intention present. The words do not always represent the writer's deeper thoughts/feelings/intentions, but this is part of what makes great artists or communicators — the ability to articulate those deeper parts of the self and communicate with people directly or indirectly through the artifacts they build.

But not everyone is an artist, and few people are great at communicating, despite the fact that they have those same kinds of thoughts, feelings, and intentions behind the text they write and the art they produce.

[Indi Young touches on this](https://medium.com/inclusive-software/insta-personas-synthetic-users-fc6e9cd1c301) through the lens of user research. When we interview people or read their reviews, the users are trying to convey their thoughts and opinions about an application. We record these thoughts, and when we play them back we often need to work through and interpret them to truly understand what they meant. People say things but mean other things way more often than we’d like to admit.

This is why the concept of [synthetic users](https://www.nngroup.com/articles/synthetic-users/) or “user research without the users” just doesn’t work as a means to replace humans — the text built out of user interviews is merely an end-product of the nuanced lived experiences of people. It’s hard work to read through text or interview transcripts and build a meaningful understanding of the context or reasoning behind what’s recorded, and that context and reasoning are completely absent in AI training.

When we talk about the aesthetics of communication, we’re talking about the patterns present in recorded content without the knowledge or understanding of how those patterns came to be in the first place. If generative AI is only able to synthesize and generate the aesthetics of communication, then it ultimately fails to capture the richness, nuance, and intent behind human expression.

Beyond the fundamental limitations of AI as pattern visualization, I also want to acknowledge that a large number of these models are built by training on vast collections of works without consent or compensation.

The same artists, writers, and musicians whose work these tools aim to replace, have had their own creative output scraped and used to train these systems. We’re replacing artists’ work and perspective with soulless, perspectiveless synthetic malappropriations of their work. Some companies are building models that exclusively use content they have the rights to (e.g. Pleias [recently released](https://huggingface.co/blog/Pclanglais/common-models) a few models trained “exclusively on data that are either non-copyrighted or are published under a permissible license.”) but regardless, the data sourcing of these models needs reform, and the tools built from them need to understand not only that they cannot replace artists work, but it’s poor design to try.

Artists share with each other, directly and indirectly. They are informed and inspired by one another. Directly, they talk with and learn from each other. Indirectly, they use each other’s works as references for their own works. This indirect sharing and consumption of open knowledge/perspective is extremely important for building a larger cultural sphere of communication and influence, and is a big reason we see art as a way to reflect on life in the first place.

Extending this knowledge-sharing gives us a framework for how we might design useful products for creative contexts. The patterns and insights that emerge from data synthesis provide utility— not as replacements for human creativity, but as tools that can highlight new directions, validate assumptions, or spark creative exploration.

The problem isn’t with the technology itself or its use in creative contexts. The problem is that most applications built on GenAI try to replace creative people with poor simulacrums of their own work, rather than helping them harness these rich, implicit knowledge patterns to reach new creative heights.

This is a common pattern in design for emergent technology.

#### Designing around the Machine

Quite often, “AI solutions” are built as a result of the technology being merely available to build with and an opportunity to be had, and not as a means to solve a problem that the technology is particularly good at solving. We’re designing around the machine, not the context.

This isn’t a bad thing on its own — speculative design can lead to useful insights about potential futures, and reflecting on these experiments helps us understand what problems a new technology is good at solving, and what it’s not.

![](https://images.prismic.io/doc-ux-collective/ad05bJ1ZCF7ETJhM_image2353.jpg?auto=format,compress)

Punctuation Personified, John Harris, 1824

The problem is the disconnect between the motivations and intentions between research institutions and startups. When we build these experiments and call them products without carefully involving and learning from the people we’ve supposedly designed them for, and with the pressure of tight turnarounds for profit and risk-taking, the solutions become just that; experiments. We’re not considering the people we build for; we’re building something for ourselves and marketing it as the next big thing. It’s costly when it fails, and harmful before it does.

The large majority of attempts to inject AI into creative spaces, while marketed as tools for artists, writers, or musicians, are in reality just attempts to replace them because we don’t consider the actual needs or mental models of creative people. In art especially, the people building these experiments are often not artists themselves. They’re building experiments that help people to avoid becoming artists. They don’t see or care about what artists do, or how they do it, they care about the end product of their work. Then they use AI to build a shortcut to that end product because that’s what they see it produce — an aesthetic of an end product without the understanding of how the work it imitates comes to be in the first place.

Unsurprisingly, the end products of AI tools built this way usually end up replaceable, uninspiring, or boring because [AI alone produces content that is kitsch](https://ia.net/topics/ai-and-the-beauty-of-human-flaws). It doesn’t make the kinds of decisions artists make, and when we rely on AI to “do creativity” for us, it generates something that is particularly and specifically not creative, something that doesn’t tell a story or connect with the human experience. It’s just data visualization.

![screenshot of the linkedin post](https://images.prismic.io/doc-ux-collective/ad02xZ1ZCF7ETJgU_config-5.jpg?auto=format,compress)

#### So what do we do with content that doesn’t tell a story, but looks like one?

What can we do with images or text or audio produced with no true meaning or understanding of the context surrounding intention?

What is bullshit useful for?

I’m reminded of my work facilitating design thinking and ideation workshops.

When facilitating people to think creatively, we solve a problem sourced from the limitations of working in and understanding contexts. Facilitation helps folks think outside their normal modes of thinking by providing means to consider their limited context from a new angle.

As facilitators, we don’t need to understand that context ourselves, nor do we need to have the niche expertise or knowledge our participants have. We just need to be able to get their knowledge out in the open, within a limited context, to help them reflect on it and find the connections, insights, and observations that help them expand their thinking about that context.

Sometimes, that means interpreting complex topics and asking the obvious beginner questions, or making confidently wrong assumptions. Sometimes it means saying bullshit you know nothing about, not so you provide some grand insight, but so the participants, who do know a thing or two, can respond appropriately and say “Wait what? No, that’s not it, but it reminds me of this thing.” It begins arguments, inspires discussion, or starts new trains of thought because you’re coming in and participating without understanding the full context.

As I said earlier, while Generative AI can synthesize its training data into images, it does not inherently understand human desires, needs, or goals. But does providing a window into those insights for humans to summon and observe solve the same problem? Does it help them to gain inspiration, make more informed and creative decisions, or build meaning themselves?

When I started working on interaction design for human-AI co-creativity, I worked with IBM Research to explore the question: “How might we help users form accurate mental models of Generative AI in co-creative contexts to build effective human-AI collaboration.” This research has mostly taken place within the realm of [co-creation and design thinking](https://www.bah.design/collab-canvas), but over time, as I’ve run workshops, experimented with AI, and gathered the opinions and insights I covered in the previous section, I’ve come to abstract the way people interact with information and content as a medium for personal thought, regardless of the source of that content. I started to see the connections between these different modes of interacting with information, and the question for my personal research became: “How might we ensure human agency and intent when introducing artificial perspective & bias within creative contexts?”

When we consume AI-generated content, it can become a way to navigate weird, vague, cloud-like collections of patterns in human thought and expression, and despite (or perhaps because of) the lack of meaning behind these generations, we are presented with raw material to build new meaning from. Meaning that can help us shape how we move forward in the real world. This hollow simulacrum of communication now becomes an interface to capture, understand, shape, and represent our creative intentions, goals, thoughts, and feelings.

However, it’s important to note that the concept of gaining creative inspiration and building personal meaning from what is essentially random or pseudorandom information is not a new idea; it is, in fact, a very ancient one. To consider how AI can be useful in creativity, we need to consider where else we build meaning with information, and what AI actually does when we interact with it creatively.

Let’s cover this through two concepts.

#### Meaning Machines

Chris Noessel has been thinking about the question of “[How do you think new things?](https://www.youtube.com/watch?v=x8n74greYFE)” for a long time.

In the talk linked above, Chris describes “Meaning Machines” as mechanisms for noodling semantically, (or changing your frame of mind on a thing by intentionally skewing the semantics of that thing). He gives Tarot as an example, as well as [I Ching](https://en.wikipedia.org/wiki/I_Ching), [Haruspicy](https://en.wikipedia.org/wiki/Haruspex), other esoteric practices, and more modern tools for spiritual fulfillment, like Mad Libs. Please go watch the talk, it’s super interesting.

Meaning Machines are, at their core, “signifiers, randomized into a fixed grammar, and read for new meaning.”

Let’s consider the Tarot example for a second, and more importantly, let’s examine the interaction design of Tarot: Each card in the deck is a symbol (the signifier) with meaning assigned to it. We randomize the cards by shuffling them, place them on the mat, and interpret them. Depending on how they fall, their placements relative to one another, their direction, etc. we react to and reflect on these symbols as they relate to our life.

And so, we build personal meaning.

This is a creative act! We create meaning and intention for future decisions or outlooks on life out of what is essentially random data presented and interpreted within the context we set and are set within.

Within the context of strictly creative work, a more practical “analog” example meaning machine is Brian Eno & Peter Schmidt’s “[Oblique Strategies](https://www.enoshop.co.uk/product/oblique-strategies.html)” — a deck of cards containing cryptic or ambiguous phrases intended to be shuffled and pulled at random to provoke creative thinking and break a creative block. [Intuití](https://sefirot.it/intuiti-creative-cards) is another, inspired by tarot and using gestalt principles to help the player better understand their own understanding of creativity.

![the sun tarot card](https://images.prismic.io/doc-ux-collective/ae4Bq8BOoF08xTXa_tarot.jpg?auto=format,compress)

The Sun, Pamela Colman Smith, 1909

Bringing this concept into the digital world, the prototype above was developed by the creative agency [OiO](https://oio.studio/), in partnership with the now-closed IKEA R&D Lab [SPACE10](https://space10.com/). It’s an interface where you choose any point in the world, and an AI system identifies and generates a summary of materials that are abundant in that location, often waste material, which can be used or recycled to create new things, like plates!

The core of the problem I highlighted earlier about AI is that too often we view the output of an AI system as the final product, something to be consumed or distributed as a means to avoid doing the important work. But a more useful application of these artifacts is to incorporate them as materials for use within larger scopes of work. AI systems can become a new kind of meaning machine — a way to add interactivity and deeper, more complex variability to otherwise static signifiers, like cards.

When we employ AI like this, we begin to see how we might use it to enhance creative ideation and help people explore creative domains in ways they might not have considered before, rather than relying on the generated content as the final product we push into the world.

In this general context then, the randomized signifiers are the contextual data surrounding our creative pursuit, the data the AI is trained on, and the relationships built on that data through its training. These signifiers, the data, are then placed into a fixed grammar through [agentive interaction and/or agentic actions](https://medium.com/@christophernoessel/agentive-tech-and-agentic-ai-cousins-not-adversaries-2a2fa37c3134), and the user can then interpret the result to stimulate their creativity, build new meaning, or explore ideas they might not have considered before.

When we consider the utility of AI in creativity as a feature that helps us create meaning instead of consuming content, it provides a means for us to frame how we build tools that act as collaborative partners in creative work and stimulate our creative action.

So, when building creative tools with this in mind, what should the actual interaction design between humans and AI look like?

![](https://images.prismic.io/doc-ux-collective/ad02x51ZCF7ETJgX_config-7.jpg?auto=format,compress)

#### Co-creative AI roles

In a [previous article](https://medium.com/@bharwood/ai-as-an-interface-for-creativity-part-1-e3e7462db49c), I broke down the utility of Generative AI within creative domains into three roles: The Puller, the Pusher, and the Producer. I’ll cover them below just briefly.

The Puller: The AI system gathers information about the context the user is working in through active question generation and passive information collection on the works. Example: [Pulpo — a GPT that takes notes about your ideas through interview](https://chatgpt.com/g/g-s6EbUJXfK-pulpo)

The Pusher: The AI system uses some/none of this context to synthesize considerations for the user to employ throughout their creative journey. Example: [An AI Chatbot that redesigns its interface at your command](https://designmyui-ee6fa6cec437.herokuapp.com/)

The Producer: The AI system creates artifacts for use as elements of the users’ larger creative output. Example: [A contextually informed sticky note content generator](https://www.bah.design/ai/empathy-map)

(The examples provided show all roles in play because they depend on one another to build a complete AI experience, but are intended to highlight the specific role they’re attached to.)

Informed by aesthetic patterns in its training data rather than informed opinion, the AI system can synthesize questions, observations, assumptions, and potentially useful artifacts in response to the users’ expressed/gathered context, goals, needs, thoughts, feelings, and actions.

These actions of “pulling context” to generate “pushed suggestions” provide the user with information that doesn’t require the AI system to have a deeper understanding of their historical context or knowledge around the creative pursuit, but acts as a naive sounding board for them to respond to in reflection of their progress. “Pushing” provides a means for the user to consider new paths, challenging them through artificial assumptions about their work, with the ability to highlight gaps, acting as a kind of meaning machine for facilitating new ideas in context.

(One note on the Pusher role: It’s important to ensure push systems are designed to make the user feel comfortable rejecting the propositions from the AI— conversational AI “characters” encourage anthropomorphizing the AI, and enforce a subtle power dynamic over the user where there doesn’t need to be one.)

Where the Pusher role provokes the user to create their creative ideas or artifacts, the “Producer” role uses GenAI to produce creative artifacts for use. It’s important to consider how we might design our systems to produce artifacts here, rather than “full works.” This ensures our users’ creative process holds agency rather than simply assuming their intended output. An example of this might be an AI-enabled rapid UI prototyping tool that builds web components based on an established design system, or a lighting simulator to move through options for a film set for technicians to consider and plan before setting up equipment. [Generative fill](https://www.adobe.com/products/photoshop/generative-fill.html) is an example of productive co-creative AI.

One big point I want to make about these roles is that they intentionally don’t frame generative AI as the product, but instead frame it as features. None of the examples provided work as full products, but components that provide value within larger flows of creativity. As designers, the solutions we create must be holistically useful to our users, and so far, AI seems only to provide useful features that fit neatly within larger solutions. Call them agents or call them bots, they are just tools.

#### Designing co-creative AI solution concepts

Let’s get into it.

In this section, I’ll build on the concepts described above to walk through a framework that can act as a basis for setting direction through a workshop (along with an example workshop case study) or framing longer-form user research and AI Interaction design processes. This is intended to help designers or product teams quickly come together to align on a robust design concept for an AI solution informed by creative user needs and intended to understand, react to, and empower creative processes, rather than replace them.

Designing AI systems that complement rather than replace creative functions is difficult, but dealing with the consequences of betting on AI to be able to do the work of creatives is harder.

Creativity is something people enjoy doing, and we’ve already seen why they’re better at it than machines. When designing systems meant to complement creative processes, it’s important to understand the nuanced aspects of what people do that build up creative action, why we enjoy doing it, how we move through creativity in our real, human lives, and where we seek help throughout creative journeys.

As I’ve considered where AI might fit within creative domains, where it helps, and where it hurts, I’ve built a framework that I believe can help others think through co-creative human-AI systems. I’ve provided an outline of the framework below:

#### Part 1: modeling creativity in context

The first step involves building an understanding of creativity in context and how creative people move through creative work. To do this, we can build a mental model of their creative flow and environment, the processes they move through, their goals, and the actions they work through.

To do this, choose a primary creative persona to focus on, and, ideally by talking with them, map out the following:

01

What modalities do they work in? (e.g. audio, visual, text, concepts, ideas, material, etc.) and when?

02

What actions do they perform when being creative? (e.g. ideating, sketching, experimenting etc.) Start at a high level and break these tasks down, placing them in order.

03

To perform these actions, what key concepts & principles guide their creative practice? (e.g., inspiration, feedback, iteration)

04  
Where might our persona struggle, or benefit from outside help along this creative process? Where is the tedium in this process? How could that tedium be useful for them, even indirectly?

Example:

At the [STRAT 2024 conference](https://strat.events/usa/) I ran a short workshop walking the participants through this framework to see if we could build a solution that uses AI in a way that enhances creativity, and within a few hours we conceptualized a rough idea for something I think we were all excited about: a tool to help designers create documentation more efficiently. I’ll outline out process as we move through the framework.

As this was an educational workshop for designers, performed by designers, we started by roughly mapping out these categories on sticky notes that focus on the modalities, actions, concepts, principles, and struggles designers face as a whole, so we could narrow down the use case.

Here’s a summary of what we worked through:

_Modalities:  
_Conceptual (User Journeys, Psychology, Information Architecture etc.)  
Visual (Graphic Design, Interfaces, Branding etc.)  
Interactive (Accessibility, Usability, Design Systems etc.)

_Actions, concepts, & principles:_  
Conceptualize / Define / Plan / Develop / Research / Iterate / Experiment / Develop / Simplify / Annotate / Decide / Prioritize / Document / (and much more)

_Struggles:_  
Prioritizing & Understanding Project Needs / Documenting Decisions / Communicating Reasoning / Reconciling & Articulating User and Business Needs / Feedback Without Context / Lack of Data / Ethical Decision Making / Understanding Long-term Implications.

After mapping these out, we played it back and talked through where in the process of design we’d really love some help, and landed on documenting data used for design decisions, and documenting design reasoning. We ended this part of the workshop aligning on the following context to design a solution for:

Designers tasked with design documentation really struggle through the tedium of capturing, formatting, and sharing the reasoning and historical decisions of their design process, especially when they don’t have the time or resources to format it properly. This affects their relationships with developers, business stakeholders, and future designers iterating on their work. Designers in the workshop also agreed that while they understood the utility of documentation, they just didn’t enjoy the process. It was time consuming, making it a good target for creating a system that eases their workload.

#### Part 2: mapping contextual data

In this step, identify and map the data surrounding these creative tasks, categorizing them into what AI can pull, push, or produce.

First, gather the types of Input, Output, and Contextual information/data/artifacts involved in the mental model we built. Consider:

01  
What might our persona need, use, observe, or consume as part of their creative process? (e.g., reference images, past work, market trends)  
02  
What might our persona create, and what are the artifacts produced? (e.g., sketches, drafts, final products)  
03  
What contextual information is relevant to our persona's creative task? (e.g., mindset, beliefs, political climate, project constraints)

Then, consider the most useful information, data & artifacts our AI could pull, push, or produce for our persona, asking questions like:

01 Pull  
What can/should be gathered from our persona or other various sources to inform the larger creative context? (e.g. reasoning, info about the work, outside inspiration)

02 Push  
Where can AI most usefully generate suggestions, insights, or new ideas in the process? (e.g. creative directions, variations of work, material recommendations

03 Produce  
What content or artifacts might AI produce directly that are useful to, but don’t replace our user's final output? (e.g. prototypes, elements, color palettes, code snippets)

Example: Mapping out data designers work with during documentation, what they produce as a result, and the contextual data surrounding documentation, some examples of what we ended up with included:

_Input Data_  
Product requirements / The “why” / Stakeholder input / User Personas / The “where” / Modality of content

_Output Data_  
Wireframes / prototypes / mockups / Annotations / Design iterations / Design system components / Instructions / Tokens

_Contextual Data_  
Brand / Time constraints / Developer capabilities / Budget constraints / Designer limitations / Origins of decision reasoning

Then we mapped this data to that which AI might most usefully push, pull, and produce to make documentation easier for designers.

01 Pull  
Product requirements / User Input / Annotations / Clarification of reasoning / design versions / Connections to Brand System

02 Push  
Reasoning summaries

03 Produce  
Formatted Documentation Data / Historical Captures of Reasoning / Audience-adapted Explanations

#### Part 3: human/AI interaction design

With our context in mind and the necessary components in place, determine the interaction design and task assignments for our System, Persona, and AI, and what the result of this interaction will look like. In this step, it’s important to consider the specific, tangible capabilities AI can perform while interacting with a user or system.

First, using the mental model, data categories, and AI capabilities; outline key tasks throughout the creative process you’re examining:

01 Human Tasks  
What should remain human-centric due to the need for judgment, intuition, emotional intelligence, or simply because people enjoy doing it?

02 AI Tasks  
Review the AI Capabilities List. How might the AI help our user through their creative journey?  
Hint: Consider explicitly highlighting both the capability and data/output e.g. “Summarize rough notes into formatted documentation”

03 System Tasks  
What roles or tasks does the broader system play out to support the interaction? (e.g., storing data, managing data flow, communicating, committing)

Then, review your work so far. Map out how your persona, AI, and System interact. Include:

01 Data Categories & Examples  
Clearly mark input, output, and contextual data points.

02 Task Assignments  
Use distinct symbols or colors to differentiate between human, AI, and system tasks.

03 Interactions & Flows  
Draw lines/arrows to show how data & tasks interact, illustrating the flow of the creative process.

04 Feedback Loops  
Highlight any iterative steps or feedback loops that influence the process.

In the end, we outlined a system intended to recognize patterns in documentation artifacts, supplement them by identifying gaps, posing clarifying questions, re-framing design decisions to fit the context alongside historical reasoning, and format everything to system standards. The result was a collaborative system where designers remain in control while AI assists in enhancing clarity and completeness, building more robust documentation while easing the process for the designer.’’

This is an outline for an AI system that gathers information about a user's dream, tracks the symbols and themes, curates information, and forms connections that provide them the tools to interpret and analyze their dreams at a deeper level (rather than relying on the AI to act as an authority and analyze their dreams for them).

Remember Guernica. When we look at it, we don’t just see patterns of paint on canvas — we see Picasso’s horror at civilian bombing, his protest against fascism, and his attempt to communicate profound human suffering. AI can analyze Guernica’s composition, mimic its cubist style, or generate images that look superficially similar, but it cannot understand why Picasso painted it, cannot feel what he felt, and cannot intend to communicate meaning as he did.

Humans are creative beings. While AI can have a place in our creativity, that doesn’t mean it should replace it. The framing for it to be a powerful creative tool is there, and I hope the information above helps distinguish that. I hope the larger community engages and calls me out for any gaps or inconsistencies I’ve missed when working through this — I’m sure there are many, and I’d love a larger dialogue to form out of this.

#### To summarize everything

Generative AI produces content without regard for truth or meaning: AI-generated content merely highlights patterns found in data without genuine understanding or regard for truth. It doesn’t think, feel, or understand, it employs the aesthetics of thought, feeling, and understanding.

We build meaning creatively by reflecting on what is generated: when we interact with AI-generated content, we imbue it with meaning. By manipulating this content correctly, AI can become a tool to enhance creative processes.  

Pull, Push, Produce: Design AI systems to gather the context of a creative pursuit. Use this context to prompt users to think and act more creatively, and guide AI to generate content that aligns more closely with the user’s vision.

Model creative processes, map contextual data, and assign the right tasks: understand the environment your user works within and the struggles they face. Create a balance between the human and the AI that supports and nurtures the user's creative goals, rather than simply automating it with AI.

Consider all of the Human: generally, even outside creative realms, I hope this article helps those who build things to think more deeply about the relationship between humans and technology, why we build things using technology, and why we don’t.

Thanks y’all. I love you.