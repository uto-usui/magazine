---
title: "Building interfaces that understand what we want to do"
source: "https://agustinbarrientos.com/writing/senior-eye/interfaces-that-understand-what-we-want"
publishedDate: "2026-11-13"
category: "design"
feedName: "Sidebar"
---

This article is the written version of a talk I’m giving at six events, in Spanish. If you’re near any of them, come say hi and tell me what you’re building! All the details are on [my Talks page](https://agustinbarrientos.com/talks#interfaces-that-understand-what-we-want-to-do).

Talk datesTalk dates

1.  Nov 14, 2026Lima, PeruTodayDevFest Lima 2026ClosedDone
2.  Nov 19, 2026Bogotá, ColombiaTodaySemana Global del Emprendimiento[Register](https://forms.cloud.microsoft/pages/responsepage.aspx?id=pGAM0xqrskWNMVbH-tz0qAphrwn3kX5BrUFxncLvAjBUQUZETTFONk9LWTY4MElZWkNXM0NCVUw5Wi4u&origin=lprLink&route=shorturl)Done
3.  Nov 21, 2026Cali, ColombiaTodayTech Day Cali 2026[Get tickets](https://holafomo.com/es/event/MTI4OA==?q=tech-day-cali-2026)Done
4.  Nov 28, 2026Bogotá, ColombiaTodayDevFest Bogotá 2026[Register](https://gdg.community.dev/events/details/google-gdg-bogota-presents-devfest-bogota-2026/)Done
5.  Dec 5, 2026Guayaquil, EcuadorTodayDevFest Guayaquil 2026[Register](https://gdg.community.dev/events/details/google-gdg-guayaquil-presents-devfest-guayaquil-2026/)Done
6.  Dec 9, 2026Ciudad de México, MexicoTodayDevFest 2026: Ciudad de México[Register](https://gdg.community.dev/events/details/google-gdg-cdmx-presents-devfest-2026-ciudad-de-mexico/)Done

Almost every app and website you use is deterministic. Something being “deterministic” is a technical way of saying that the same action, under the same conditions, always gives the same result. In a typical interface, buttons always do the same thing and menus always show the same options. So that means you, the user, have to work out which of those matches what you want to do.

Now we can make an interface guess what you mean when you type, say, or select something. We can adjust the behavior of the interface to you, instead of you adjusting to the interface. Doesn’t that sound like magic?

Let’s say you want to book a hotel, so you go to a search-like field and type “_somewhere where I can hear the ocean, not drunk people outside my room, and I need to bring my dog_” and the interface automatically checks the filters “Beachfront”, “Quiet location”, and “Pet-friendly”, removes party-oriented hotels, and reorganizes the search results. You, as a user, didn’t have to know the names of those filters, or even that they existed. Things just worked the way you expected.

For that, we put an AI model in the middle, which means the interface acts on the model’s interpretation of what people want. We can’t know ahead of time what people will write or what the model will do with it. Two people looking for the same hotel will describe it in different words and a small difference in those words can change the filters they get.

We keep control over the results, though. I know, that sounds like a contradiction.

Here is a good analogy:

You’re in a restaurant and the waiter asks you what you want. You can tell him in your own words, like “_something light, without meat_”. You can’t predict what he’ll suggest, or whether another waiter would suggest the same thing (even if you said exactly the same words), but he can only bring you what’s on the menu.

In the analogy:

-   You, the customer, are the user.
-   The menu is a predefined set of options.
-   The waiter is the AI that makes the decision.

In your app, you’re the restaurant owner too, not just the customer, so you would be the one creating the menu. That way, the waiter can only pick one of the options you designed. You don’t control which one he picks, but you control everything that can happen.

Makes sense? Hope that made it easier to understand.

The waiter can still misunderstand you, just like the AI in your app. So just adding an AI isn’t enough though, you’ll also need to check what to do for when it’s wrong.

## What’s a decision model?

You know Gemini or ChatGPT, where you write something and it writes a new answer every time? Well, that’s generative AI.

A decision model is different. It’s like the waiter in the restaurant analogy. It only picks one of the options we gave it.

Asking a friend what to eat would be like generative AI, because they can suggest absolutely anything. The options are endless, and some might not even be realistic. The waiter, on the other hand, can only pick from the menu, which is a limited set of options.

To have this behavior in your app, you can use a decision model.

The easiest example is a sentiment classifier (basically a program that reads a message and tells you how the person feels). Say you have a store that gets hundreds of messages a week, and you want to answer the unhappy customers fast before they leave. The classifier finds them for you, so you don’t have to read every message. Try it on the scenarios below:

A person can read what the generative AI wrote, but your app can’t tell what to do with it. With a decision model, your app gets one of your predefined options, so you can decide what happens when each one is picked.

Well, technically, you can tell a generative model to pick one of your options. You can tell a chatbot to answer with one word from your list, and have the page ignore anything else. That limits what can happen, but the pick can still be wrong.

It’s also usually slow and expensive when compared to a decision model.

For example, Claude Haiku 5.5 (at its lowest setting, which is also the cheapest and fastest) takes almost five times as long as a popular decision model called Jev (we’ll talk about it below), and costs almost three times as much.

The times are the medians of my tests, and the prices are from November 2026, with 1,000 input tokens (the pieces of text models count and charge by) per ticket, plus 30 output tokens for Claude Haiku 5.5.

Anyway, a decision model works like this:

1.  You give the AI your question and the options.
    
    What is the tone of the customer's message?
    
    -   Positive
    -   Neutral
    -   Mixed
    -   Negative
    
2.  You ask the question by passing what the user wrote, just as they wrote it.
    
    What is the tone of the customer's message?
    
    You charged my card twice!
    
    -   Positive
    -   Neutral
    -   Mixed
    -   Negative
    
3.  The model picks an option for each question and gives you a probability for every option (how sure it is of each one).
    
    -   Positive1%
    -   Neutral3%
    -   Mixed4%
    -   Negative92%
    
4.  Your code shows what you designed for that option.
    
    -   PositiveYour app closes this ticket with a thank you.
    -   NeutralYour app leaves this ticket in the queue.
    -   MixedYour app adds this ticket to today's list.
    -   NegativeYour app moves this ticket to the top of the queue.
    

### Chrome’s Decisions API

So far, I haven’t told you where the model runs. The popular AI models run on a company’s servers (what people call the cloud).

When you use ChatGPT or a site that uses a decision model like Jev, your data go to those servers.

That isn’t necessarily bad. I mean, using a model like Gemini in the cloud is safe. Google is one of the gold standards in data security worldwide. Also, using one of their big supercomputers means the performance doesn’t depend on each user’s computer.

But it still means that when you use a model that runs on the cloud like Claude, you may have to obviously pay each time a page uses it (which can be a bit tricky if you’re short of budget), that it doesn’t work without an internet connection, and that what you write has to leave your computer.

But now there’s also an alternative. You can actually run a decision model on your own computer, inside Chrome. For free and privately.

To do that, you need to use what the Chrome team calls the **Decisions API**, a set of tools that lets a site use Chrome’s own model to make decisions.

Let’s go back to the help desk example from before. Each call (each time a page uses the model) is 100% free, which means the store can run the classifier on every message it gets, no matter how many. Those messages also don’t have to go anywhere else, because the model runs on the same computer as the page.

Of course, the model has to be on that computer first, so users have to download it. The good news is that every site that uses the API shares the same copy. This might sound expected, but before Chrome’s Decisions API, if you wanted a decision model on people’s computers, they had to download one for each site that used it.

Once it’s downloaded, everything happens on that computer, even if it has no internet. That’s also why the store doesn’t need a server to run the model.

All of that means you can do cool stuff you wouldn’t normally do because of costs, like reacting to what people write while they’re still writing it.

Pretty cool, right?

That said, Chrome’s Decisions API is still an experiment. Google wrote a public document about how it would work, called an [“explainer”](https://github.com/explainers-by-googlers/decisions-api), where they say it’s an early design sketch that hasn’t been approved to ship. That’s why, to use it, you have to turn on a hidden setting in Chrome, called a flag.

Let me show you where it stands:

1.  Oct 1, 2026
    
    Google announces it's building the API
    
    Done.
    
2.  Nov 3, 2026Chrome 157
    
    The flag reaches regular Chrome
    
    Done.
    
3.  You're here
    
4.  Nov 17, 2026Chrome 158
    
    Chrome gets EmbeddingGemma
    
    A second, much smaller model (enabled by default). The first model, Gemma 4, is still available behind a property to add in the calls.
    
    Scheduled.
    
5.  Dec 8, 2026Chrome 159
    
    The flag lets you pick the model.
    
    Gemma 4, EmbeddingGemma or both.
    
    Scheduled.
    

What's not certain

These steps may change or never happen.

1.  No date
    
    A trial with real users
    
    Sites could turn it on for their visitors, with no flag. This is what's called an "origin trial".
    
2.  No date
    
    Available to everyone
    
    No flag and nothing to turn on, in every Chrome that can run the model.
    

So can you use Chrome’s API on a real site? Not yet, but hopefully soon.

Remember this is experimental, so the API is behind a flag in Chrome.

I mean, if you turn on the flag, you can play with it on your computer. People who visit your site won’t have it on, though, which means the API won’t be there for them.

I don’t know if or when that’s going to change. Google hasn’t announced a trial with real users, or any plan to turn it on for everyone or to bring it to phones. The companies behind Firefox and Safari haven’t said what they think of it either. And if nobody extends the flag, Chrome’s source code says it goes away in Chrome 161, due on January 19, 2027. The API would then go back to off.

You can follow the API’s status on [ChromeStatus](https://chromestatus.com/feature/5155080092385280). I’ll keep an eye on it too and update the article.

Also, the model you and your users get depends on the version of Chrome.

1.  Chrome 157 only has Gemma 4 running on your computer’s processor (the CPU), which is pretty good.
2.  From Chrome 158 on, the flag also turns on EmbeddingGemma, a much smaller model that Chrome uses unless you choose Gemma 4 with a property in your calls.
3.  From Chrome 159 on, you can turn on one or both of them in the flag. If you turn on both, you still need the property to choose Gemma 4.

This matters because results with each one are very different. On my own test phrases, EmbeddingGemma is 26 to 59 times faster than Gemma 4, but Gemma 4 picks the right option almost twice as often. We’ll talk about those results below.

I wouldn’t get too attached to any of the models offered inside Chrome, though. In Chrome’s [source code](https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/ai/decision_model.idl), the property you use to choose Gemma 4 is marked as temporary. It’s only there so developers can compare the models while the API is behind a flag. If this feature reaches the public, that property goes away. Google’s explainer describes small models that take under a second on easy and medium questions, plus larger models for harder ones, but Google hasn’t said which model the final version will use.

So even the model is part of the experiment.

**So why am I showing you this?** Multiple reasons. First of all, I think it’s extremely cool, and I think a lot of interfaces are going to work like this soon, so it’s good that you prepare for it. But more importantly, I want you to start thinking about how you can use this new technology to create things that were simply not viable before. I want you to get inspired, to let your imagination run free, and to come up with something incredible. I want you to be at the frontier.

Think about the hotel search from the beginning of this article. A page could do all of that while you’re still typing, on your own computer, without paying for a single call. Google’s [explainer](https://github.com/explainers-by-googlers/decisions-api) says small models like these can make a decision in tens or hundreds of milliseconds on the processors people already have. One of its goals is to do it on everyday hardware without draining the battery.

You can already see it working in this article. Once you turn on the flag and download the model, every example below runs on your own computer.

And you don’t have to wait for the API to use this on a real site. Below, I show you easy and straightforward ways to do it today.

I recommend using Chrome’s API as the first option, and if it isn’t available, falling back to a cloud service like Gemini. That way your site works for everyone right now, and it’s ready if Chrome turns the API on.

Enable the Decisions API:

If you already use Chrome’s other built-in AI APIs, like the Prompt API, keep in mind that the flag also switches them to Gemma 4 on CPU.

In Chrome, once the flag is on, click ⁠Download⁠ in the panel below. It’s a 3.3 GB download, but Chrome needs about 20 GB free on your disk before it starts.

### Providers and tests

As I mentioned, if you want this on a real site right now, you’ll need something besides Chrome.

If you don’t write code, send this to your developer and [skip to the next subchapter](#why-an-ai-that-can-only-pick). Remember, I want you to get inspired, not to get stuck in the details. I want you to think how your app can use this to improve the experience for your users, besides the technicalities.

Ok, so we have been talking about how Chrome’s Decisions API runs on a local computer but doesn’t work for everyone yet. Chrome offers their own solution for this: a [polyfill](https://github.com/GoogleChromeLabs/web-ai-demos/tree/main/built-in-ai-task-apis-polyfills) that downloads a decision model called Laya, of 0.6 to 0.8 GB, from Hugging Face. But I’m not a fan of this workaround. As I mentioned before, this would mean the user has to download a copy of the model per site. And also, in a browser without WebGPU the polyfill takes several seconds per decision.

I mean, if you’re going to use this approach, you might as well rely on Google’s MediaPipe library, which also has a [Decision Maker](https://developers.google.com/edge/mediapipe/solutions/decision/decision_maker/index). It would also require users to download the model per site because it also runs on the visitor’s computer, but that model is a lot smaller, about 165 MB. It uses WebAssembly and WebGPU and a model called EmbeddingGemma 2. It also lets you run the Decision Maker for Android and iOS apps, where the model runs on the phone.

However, and this is a personal opinion, if Chrome’s Decisions API is not available, I’d fall back to a cloud service like Gemini, Jev or OpenAI.

Google also has a decision model in the cloud called Gemini Decision 1. They released it on November 11, 2026.

You use it through the [Gemini Decisions API](https://aistudio.google.com/docs/decisions-api). Don’t mix it up with the one in Chrome, though. They’re both called “Decisions API”, but this one runs on Google’s servers. It gives you a probability for every option. It also has a free tier, with 10,000 calls per day. If you’re using this as a fallback, it might be enough for your site.

Google’s servers also run `gemma-4-31b-it`, a much bigger Gemma 4 than the one in Chrome, only for free (14,400 calls per day). Even though Gemma 4 isn’t a decision model, you can make it return the option it picked as JSON, but without probabilities.

Just keep in mind that Google uses what you send through either free tier to improve its products, so its [terms](https://aistudio.google.com/docs/terms) ask you not to send anything sensitive or personal through them. Also, sites with users in the European Economic Area, Switzerland or the UK can only use the paid tier.

OpenAI offers its own solution too. It’s _also_ called “Decisions API”, which is a bit confusing because Google uses the same name for its own APIs, but OpenAI’s is not related to them. OpenAI’s solution uses `gpt-6-luna` to make the decisions.

Anthropic’s models can also return JSON. For this article, I used `claude-haiku-5-5` at low effort because I think using one of the stronger models is overkill for most decision tasks, and it costs way more and takes longer.

And then there is also [Jev](https://docs.typesafe.ai/models), owned by a company called TypeSafe.

Disclaimer: There are a lot of other options nowadays (I mention them in The Brief articles), but I couldn’t compare them all here, so I picked the ones I think are the most relevant for this article.

Anyway, how good are all of these?

I ran three rounds of five tests on eight models, with 270,096 questions in total. I use the results from the last round because the first two were for debugging and tuning the tests. If you’re a researcher, there is a section for you below where you can download the 90,032 answers and the score rows.

Three of the evaluations are public tests from the [Decision Index](https://artificialanalysis.ai/evaluations/artificial-analysis-decision-index), created by Artificial Analysis (a company that benchmarks AI models). I ran them following [their method](https://artificialanalysis.ai/methodology/decision-index). The other two are also tests they run, but I had to create my own versions of them because they keep the questions private.

The tests I ran were:

-   EvalSafe-O\*NET-AA, with 6,582 questions about workplace documents.
-   When2Call, with 3,423 requests to an assistant that can use tools.
-   HLE-MultiChoice v1.1, with 509 expert questions.
-   My version of AA-Omniscience-Decision v1.1, with 300 questions about facts. Artificial Analysis keeps most of its questions private, so mine are the 300 it made public.
-   My version of AA-Symmetry, with 120 questions in 440 versions. Its questions are also partly private, so mine come from the tool and knowledge tests above, plus messages from WildGuardTest.

And the models I ran them on were:

-   Gemma 4 on CPU, in Chrome.
-   EmbeddingGemma, in Chrome.
-   EmbeddingGemma 2, with MediaPipe.
-   Gemma 4 31B, on Google servers.
-   Gemini Decision 1, on Google servers.
-   Jev 1.14, on TypeSafe servers.
-   GPT-6 Luna, on OpenAI servers.
-   Claude Haiku 5.5, on Anthropic servers.

Here is the summary:

Models I tested

Model

Score

Time per call

Free tier

Cost of a million calls

Gemma 4 on CPU

41.1%

1.85s

Unlimited

Free

EmbeddingGemma

21.3%

0.38s

Unlimited

Free

EmbeddingGemma 2

32.3%

1.13s

Unlimited

Free

Gemma 4 31B

49.3%

2.27s

14,400 calls/day\*

No paid tier

Gemini Decision 1

52.4%

0.31s

10,000 calls/day\*

$86

Jev 1.14

54.1%

0.20s

None

$47

GPT-6 Luna

47.3%

0.28s

None

$84

Claude Haiku 5.5

41.3%

0.96s

None

$176

Score is the average of the five tests, with the index's weights.The knowledge and expert tests give partial credit for "I don't know" instead of a wrong answer, like Artificial Analysis does. Time is the median, and cost is scaled up to a million calls, both averaged over the five tests with the index's weights.\*Google's terms don't allow free calls in apps for people in the European Economic Area, Switzerland or the UK.Google counts free calls per project, at up to 200 calls or 50,000 tokens a minute on Gemini Decision 1, and 30 calls or 16,000 tokens a minute on Gemma 4.

Besides the results, the model you use depends on what you want to do. In a lot of cases, the model built into Chrome is enough, and it’s free.

Let’s start with workplace documents. TypeSafe made this test from O\*NET, a list of jobs from the US government. Each task is a made-up document from one of those jobs (like a performance review or a kitchen order) plus a question about it. Something important here is that some of the documents are longer than EmbeddingGemma can take, so that model rejected a quarter of them.

Judges workplace documents, EvalSafe-O\*NET-AA. 6,582 questions about long documents. A random pick gets 29.6% right.

Option

Where it runs

Got right

Median time per call

Jev 1.14

TypeSafe servers

88.3%

0.20s/call

Gemini Decision 1

Google servers

81.9%

0.33s/call

GPT-6 Luna

OpenAI servers

77.3%

0.28s/call

Gemma 4 31B

Google servers

77.2%

2.16s/call

Claude Haiku 5.5

Anthropic servers

66.8%

0.89s/call

Gemma 4 on CPU

User's computer, in Chrome

60.5%

3.41s/call

EmbeddingGemma 2

User's computer, with MediaPipe

36.6%

0.96s/call

EmbeddingGemma

User's computer, in Chrome

30.7%

1.33s/call

Like the index, I count an error as a random pick. That includes the documents Chrome turned down and the 58 questions with more than the 26 options its API takes.

The next test is harder to guess. The model gets a request to an assistant that can use tools, like a weather service, plus four possible replies. It has to pick the right one, which can be calling a tool, asking for what’s missing or saying it can’t help.

Knows when to call a tool, ask, or decline, When2Call. 3,423 requests, four possible replies each. A random pick gets 25% right.

Option

Where it runs

Got right

Median time per call

Jev 1.14

TypeSafe servers

80.8%

0.20s/call

Gemini Decision 1

Google servers

75.8%

0.30s/call

GPT-6 Luna

OpenAI servers

74.4%

0.28s/call

Gemma 4 31B

Google servers

59.8%

2.50s/call

Gemma 4 on CPU

User's computer, in Chrome

57.4%

2.48s/call

Claude Haiku 5.5

Anthropic servers

52.3%

0.88s/call

EmbeddingGemma

User's computer, in Chrome

35.8%

0.43s/call

EmbeddingGemma 2

User's computer, with MediaPipe

26.7%

1.36s/call

Then I tested what each model knows. Each question is about a fact, with four answers and one more to decline, like “I don’t know”. Declining counts as wrong. Most of the language models declined about half of them.

Knows facts, or says it doesn't, AA-Omniscience-Decision v1.1. My version, 300 public questions, five options each. A random pick gets 20% right.

Option

Where it runs

Got right

Median time per call

GPT-6 Luna

OpenAI servers

44.8%

0.28s/call

Gemini Decision 1

Google servers

39.0%

0.29s/call

Jev 1.14

TypeSafe servers

29.8%

0.20s/call

EmbeddingGemma 2

User's computer, with MediaPipe

28.7%

1.37s/call

Gemma 4 31B

Google servers

28.5%

2.12s/call

Claude Haiku 5.5

Anthropic servers

22.9%

0.95s/call

EmbeddingGemma

User's computer, in Chrome

18.7%

0.04s/call

Gemma 4 on CPU

User's computer, in Chrome

15.0%

0.88s/call

I also checked whether each model keeps the same answer when the same question comes in different ways. The options come in another order or with their letters swapped, or the question is turned around, like asking if a message is harmless instead of harmful.

A model passes a question when it gives the same answer every time and no probability moves more than 5 points. MediaPipe never changed its answer when the options moved. But on 39 of the 40 questions that were turned around, it gave the same answer when I asked if a message was harmful and when I asked if it was harmless. It still tops this test because 80 of the 120 questions only move the options.

Keeps its answer when the question changes, AA-Symmetry. My version, with 120 questions in 440 versions.

Option

Where it runs

Passed

Median time per call

EmbeddingGemma 2

User's computer, with MediaPipe

66.7%

0.30s/call

Gemma 4 31B

Google servers

54.2%

2.04s/call

Jev 1.14

TypeSafe servers

50.0%

0.20s/call

Gemini Decision 1

Google servers

43.3%

0.33s/call

Gemma 4 on CPU

User's computer, in Chrome

40.8%

1.32s/call

GPT-6 Luna

OpenAI servers

39.2%

0.27s/call

Claude Haiku 5.5

Anthropic servers

33.3%

0.93s/call

EmbeddingGemma

User's computer, in Chrome

17.5%

0.08s/call

And the last test is all expert questions, from Humanity’s Last Exam. Experts wrote that exam to be **very hard for AI**, with questions no interface would ever ask. Like in the knowledge test, each question also has an option to decline.

This test is brutal for all models. Even the best score stays close to a random pick.

Answers hard multiple-choice questions, HLE-MultiChoice v1.1. 509 expert questions, six or more options each. A random pick gets 14% right.

Option

Where it runs

Got right

Median time per call

EmbeddingGemma

User's computer, in Chrome

16.2%

0.05s/call

EmbeddingGemma 2

User's computer, with MediaPipe

15.5%

1.74s/call

Jev 1.14

TypeSafe servers

13.7%

0.20s/call

Gemini Decision 1

Google servers

11.2%

0.29s/call

GPT-6 Luna

OpenAI servers

8.4%

0.27s/call

Claude Haiku 5.5

Anthropic servers

7.8%

1.14s/call

Gemma 4 31B

Google servers

7.2%

2.62s/call

Gemma 4 on CPU

User's computer, in Chrome

6.7%

1.35s/call

Are you a researcher?

Information for researchers

The final runs were on November 7 and 8, 2026, with 11,254 tasks per model. I ran Gemini Decision 1 the day Google released it (November 11, 2026). Chrome and MediaPipe ran on a MacBook Pro with a 14-core Apple M4 Pro and 24 GB of RAM. The cloud times include the round trip. I used the wording from Artificial Analysis’s examples when it shows one. Its method doesn’t publish the prompts for the language models, so I wrote those myself. To compare them fairly, I turned thinking off or set it to the lowest level each API allows.

Here are the exact models and settings:

-   Gemma 4 on CPU, in Chrome Canary 159.0.8149.0 (159.0.8150.0 for When2Call and HLE-MultiChoice v1.1) with model version 2026.8.7.929 and `--enable-features=AIDecisionModelAPI:backend/language_model,OptimizationGuideManifestBroker,AIApiFoundationalModel:model_version/v4,OnDeviceModelForceCpuBackend`.
-   EmbeddingGemma, in the same browser with `--enable-features=AIDecisionModelAPI:backend/embedding_gemma_v1`.
-   EmbeddingGemma 2 270M, with @mediapipe/tasks-decision 1.2.0 in Chrome for Testing.
-   Gemma 4 31B (`gemma-4-31b-it`), on the free tier of Google’s API with the default settings.
-   Gemini Decision 1 (`gemini-decision-1`), on Google’s Gemini Decisions API.
-   Jev 1.14 (`jev-1.14.0`), on TypeSafe’s API.
-   GPT-6 Luna (`gpt-6-luna`), on OpenAI’s Decisions API.
-   Claude Haiku 5.5 (`claude-haiku-5-5`), with thinking off and effort set to low.

Gemma 4 31B and Claude Haiku 5.5 had to give a probability for every option, through structured output. If the probabilities didn’t add up to 1, I rescaled them, and if an answer didn’t follow the format, I asked once more.

To count the results, I did the same as the index:

-   The answer is the option with the highest probability, and if two options tie, I count it as a random pick between them. A yes or no question at exactly 50% counts as yes.
-   If a model failed to answer, or Chrome rejected a document, that question also counts as a random pick.
-   On the knowledge and expert tests, “I don’t know” counts as wrong. For the non-hallucination rate, I took the questions a model didn’t get right and counted how often it said “I don’t know” or failed to answer, instead of a wrong answer.
-   On the workplace test, I averaged its three types of questions. When a question asks for a score, I took the level closest to the score the model expected.
-   On the symmetry test, a model passes a question when it gives the same answer every time and no probability moves more than 5 points.

The score in “Models I tested” is the average of the five tests, with the index’s weights (15% for each test and 10% for tools), scaled up to 100% because I couldn’t run the sixth one. On the knowledge and expert tests, 10 of those 15 points go to accuracy and 5 to the non-hallucination rate, the same way Artificial Analysis averages accuracy. That’s not the Decision Index score, though. The index also measures how sure each answer was, and the test I couldn’t run counts for 30% of it. If you want to compare my numbers with theirs, the file below also has each test’s Decision Score and the index’s formula on the tests I ran.

Time is the median of each test, and cost is what my runs cost, scaled up to a million calls, both averaged with the same weights.

To know how much of each number is luck, I redrew each test’s questions 10,000 times (a paired bootstrap, by question type on the workplace test) and checked how much the scores moved. That’s where the 95% ranges in the file come from. The summary scores move about 2 points either way. That’s why Jev 1.14 and Gemini Decision 1 are basically tied, same as Gemma 4 31B and GPT-6 Luna, and Claude Haiku 5.5 and Gemma 4 on CPU. A single test moves more or less depending on how many questions it has, from about 1 point on workplace documents to about 9 on symmetry.

Also:

-   I ran the tests in three rounds, changing the setup and the wording each time, and the numbers come from the last one, which I didn’t repeat.
-   I only ran Gemini Decision 1 once and sent it the same questions I sent to Jev.
-   Gemini 3.5 Flash-Lite was in the results before (with thinking set to minimal). I replaced it with Gemini Decision 1.
-   Two of the tests are my own versions, and Claude Opus 5.5 at low effort wrote the wrong answers for the knowledge test.
-   TypeSafe made the workplace test.
-   Gemma 4 on CPU is a temporary setup.
-   The expert test is the Decision Index’s multiple-choice version of Humanity’s Last Exam. On Artificial Analysis’s leaderboard, models write an answer to 2,158 text-only questions with reasoning settings like High and Max, so you can’t compare those scores with these.

I paid for every run myself.

You can download every score with its 95% range, and every model’s answer to every question. The files don’t include the questions themselves, since some of the tests don’t allow sharing them.

[Download all the scores (CSV)](https://agustinbarrientos.com/_astro/decision-index-results.vHgbVgNc.csv)

[Download every answer (CSV, zipped)](https://agustinbarrientos.com/_astro/decision-index-answers.BQAa5Pr1.zip)

### Why an AI that can only pick

At this point, you might be asking yourself:

1.  This is overkill, why not a plain `if`?
2.  This is too basic, why not a generative AI that can do so much more?

Regarding the first one, if you can write a plain `if` for your question and get the behavior you want, 100% do it.

Sometimes a plain `if` is not enough though. For example, how would you differentiate between “I’m going to fire the team” and “I’m going to fire up the team”?

Decision models are for answers that depend on what people mean, such as whether a customer is happy with what they bought.

Then, for the second one, I think a generative model is overkill for most decision tasks.

Also, with a decision model:

-   People always see something you wrote and reviewed, because all you get back is one of your own options. In 2024, [a tribunal in Canada made Air Canada pay a customer](https://decisions.civilresolutionbc.ca/crt/crtd/en/item/525448/index.do) because the chatbot on its website told them they could get part of their fare back after the flight, which the airline’s rules didn’t allow. The decision doesn’t say how that chatbot worked, but the tribunal said the airline is responsible for everything on its website.
-   A decision model doesn’t have to write anything, which makes it fast enough that you can do crazy things like reacting to what people are writing in real time.
-   It costs a fraction of a cent per call, or nothing when it runs on the user’s computer.
-   It can be small enough to run inside the browser.

The best generative models do a lot better on hard questions. On the expert questions (the hardest test), none of the models I tested got more than 16.2%, close to the 14% a random pick gets. On Artificial Analysis’s leaderboard, models write their own answers to the exam’s 2,158 text-only questions with their highest effort and get much better results. Gemini 4 Argon gets 57.1%, Claude Fable 5.1 59.1% and Claude Opus 5.5 61.4%.

But Artificial Analysis estimates they take about 4 to 6 minutes per question, and each answer costs $0.35 to $1.59, vs 0.05 to 2.6 seconds and under $0.0005 for the models I tested. There is just no comparison.

That’s what I mean by generative AI being overkill in some cases. It all depends on what you want to do.

### Types of questions

In most decision models, including Chrome’s Decisions API, there are three types of questions: `boolean`, `choice` and `score`.

A `boolean` question is a yes or no question. Just `true` and `false`, each with a probability.

A `choice` question comes with your own list of options. That’s what I have been showing in all the examples above. Each option has a label and can have a short description of what it’s for.

In Chrome, a `score` question gives you a number from 1 to 5 by default. I’d use one to sort those messages by how upset people are.

Other providers use different names for the same three types:

-   MediaPipe has a method for each one, `evaluateBoolean()`, `evaluateChoice()` and `evaluateScore()`.
-   Gemini and TypeSafe call them `noul`, `choice` and `score`.
-   OpenAI calls them `predicate`, `choice` and `score`.
-   Claude doesn’t have question types. You describe the answer you want in a JSON schema instead.

### Code

If you don’t write code, there’s nothing else for you until [the next chapter](#user-experience).

In Chrome, you use the Decisions API through a JS class called `DecisionModel`.

You start with a schema (an object that contains your questions, the options for each one and a sentence about the situation in `context`). Then you check whether Chrome can run it with `DecisionModel.availability()`. If it can, you create a session with `DecisionModel.create()`, and then invoke the `decide()` method with what the person wrote.

You get back the name of the option the model picked for each question, called its “label”, plus a probability for every option in `probabilities`.

The other providers do the same thing in their own way:

-   MediaPipe gives you a Decision Maker with one method per type of question.
-   Gemini, OpenAI and Jev take your questions in one call.
-   Claude takes a JSON schema with the answer you want.

Your code then does whatever you designed for that label, like showing a line of dialogue or a warning.

The tabs below have the shortest code I can write for each provider: a yes or no question about a message from a customer.

By the way, Chrome only offers the API on secure pages, like `localhost` or HTTPS.

Chrome

```
const $check = document.querySelector( '#check' );

const schema = {
	context: 'An online store gets messages from its customers.',
	// The model gets text in English. It also takes es, ja, de and fr.
	expectedInputs: [ { type: 'text', languages: [ 'en' ] } ],
	questions: [
		{
			id: 'upset',
			type: 'boolean',
			prompt: 'Is this customer upset?',
		},
	],
	// Temporary option for Gemma 4 instead of EmbeddingGemma.
	devTrialBackend: 'language-model',
};

let model;

// Browsers without the API skip this, and the page keeps working.
// Chrome reports 'unavailable', 'downloadable', 'downloading' or 'available'.
if (
	'DecisionModel' in window
	&& await DecisionModel.availability( schema ) !== 'unavailable'
) {
	$check.addEventListener( 'click', async () => {
		// Chrome downloads the model on the first create().
		model ??= await DecisionModel.create( schema );

		const { upset } = await model.decide( 'You charged my card twice!' );

		// The label is 'true' or 'false', with a probability for each one.
		console.log( upset.label, upset.probabilities );
	} );
}
```

MediaPipe

```
import { DecisionMaker, FilesetResolver } from '@mediapipe/tasks-decision';

const wasm = await FilesetResolver.forDecisionTasks(
	'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-decision@1.2.0/wasm',
);

// EmbeddingGemma 2 270M, about 165 MB, downloaded by each site that uses it.
const modelUrl = 'https://huggingface.co/litert-community'
	+ '/embeddinggemma-2-text-270m-litert-lm'
	+ '/resolve/main/embeddinggemma-2-text-270m.litertlm';

const maker = await DecisionMaker.createFromOptions( wasm, {
	baseOptions: { modelAssetPath: modelUrl },
	// The token budget Google's EmbeddingGemma 2 sample uses.
	maxNumTokens: 256,
} );

const context = 'An online store gets messages from its customers.';
const message = 'You charged my card twice!';

// The condition is a statement, not a question.
const answer = await maker.evaluateBoolean( message, {
	context,
	condition: 'This customer is upset.',
} );

// The value is true or false, with the probability that it's true.
console.log( answer.value, answer.probabilityTrue );
```

Gemini

```
// server.js
// decisions needs @google/genai 3.2.0 or later.
import { GoogleGenAI } from '@google/genai';

const gemini = new GoogleGenAI( {
	apiKey: process.env.GEMINI_API_KEY,
	// The Decisions API only exists in the beta version of Google's API.
	apiVersion: 'v1beta',
} );

const context = 'An online store gets messages from its customers.';
const message = 'You charged my card twice!';

const decision = await gemini.decisions.create( {
	model: 'gemini-decision-1',
	input: message,
	questions: {
		upset: {
			type: 'noul',
			instructions: `${context} Is this customer upset?`,
		},
	},
} );
const answer = decision.answers?.upset;

// The probability that the answer is yes.
console.log( answer?.type === 'noul' ? answer.noul : null );
```

OpenAI

```
// server.js
// decisions with JSON input needs the openai package 7.43.0 or later.
import OpenAI from 'openai';

const openai = new OpenAI( { apiKey: process.env.OPENAI_API_KEY } );

const context = 'An online store gets messages from its customers.';
const message = 'You charged my card twice!';
const state = { message };

const decision = await openai.decisions.create( {
	model: 'gpt-6-luna',
	input: [ { role: 'user', content: [ { type: 'input_json', data: state } ] } ],
	questions: [
		{
			type: 'predicate',
			name: 'upset',
			instructions: `${context} Is this customer upset?`,
		},
	],
} );
const answer = decision.answers.find( ( a ) => a.name === 'upset' );

// The probability that the answer is yes, or null if the model refused.
console.log( answer?.type === 'predicate' ? answer.probability : null );
```

Claude

```
// server.js
// Works with @anthropic-ai/sdk 1.6.0 or later.
import Anthropic from '@anthropic-ai/sdk';

const claude = new Anthropic( { apiKey: process.env.ANTHROPIC_API_KEY } );

const context = 'An online store gets messages from its customers.';
const message = 'You charged my card twice!';

const response = await claude.messages.create( {
	model: 'claude-haiku-5-5',
	max_tokens: 1024,
	// No thinking and low effort, so it answers fast.
	thinking: { type: 'disabled' },
	system: `${context} Is this customer upset?`,
	messages: [ { role: 'user', content: message } ],
	output_config: {
		effort: 'low',
		format: {
			type: 'json_schema',
			schema: {
				type: 'object',
				properties: { upset: { type: 'boolean' } },
				required: [ 'upset' ],
				additionalProperties: false,
			},
		},
	},
} );
const text = response.stop_reason === 'end_turn'
	? response.content.find( ( block ) => block.type === 'text' )?.text
	: null;

// The pick, true or false, or null if Claude refused. Claude doesn't return a probability.
console.log( text ? JSON.parse( text ).upset : null );
```

Jev

```
// server.js
import { TypeSafeClient, noul } from '@typesafe-ai/sdk';

const jev = new TypeSafeClient( { apiKey: process.env.TYPESAFE_API_KEY } );

const context = 'An online store gets messages from its customers.';
const message = 'You charged my card twice!';

const { answers } = await jev.systemOne( {
	model: 'jev-1.14.0',
	state: { message },
	questions: {
		upset: noul( `${context} Is this customer upset?` ),
	},
} );

// The probability that the answer is yes.
console.log( answers.upset.noul );
```

## User experience

A lot of times we end up making our users learn our preferred terminology for things. We name the buttons, the menus, the categories or some UI elements with the words we’re used to, and then people have to guess what we called the thing they want. For example, automation platforms call the same thing a “workflow”, “pipeline”, “process”, “flow”, or “recipe”, depending on the company. And the ways people can ask for the same thing are kind of endless. “Quiet”, “no parties” and “not drunk people outside my room” all mean the same filter.

The thing is, nobody really cares about learning your interface. They just want to get their work done fast.

Nielsen Norman Group (NN/G) studies how people use interfaces. [The second rule of their usability heuristics](https://www.nngroup.com/articles/match-system-real-world/) says an interface should “speak the users’ language”. They mean that you should use, for example, “My purchases” instead of something like “Transaction history”.

I think a decision model takes that one step further, because people don’t have to learn the labels at all. They type, talk or select text the way they normally would.

NN/G calls the mental and physical effort people spend to reach a goal the [interaction cost](https://www.nngroup.com/articles/interaction-cost-definition/). This goes from reading menus and looking for the right option to typing, waiting and fixing mistakes. And after all that effort, a lot of people still don’t get what they came for. [Gartner’s December 2023 survey of 5,728 customers](https://www.gartner.com/en/newsroom/press-releases/2024-08-19-gartner-survey-finds-only-14-percent-of-customer-service-issues-are-fully-resolved-in-self-service) found that only 14% of their customer service problems were fully solved in self-service, without talking to anyone. The most common reason self-service failed, in 43% of the cases, was that they couldn’t find anything relevant to their problem.

A decision model can save people from looking through menus because they can just describe what they want in their own words. You could still have kind of obscure labels like “Transaction history” for your own organization without making people learn them, because they could just write “what did I buy last month” and get there.

And since the model only picks, every answer they see is curated. I mean, it was manually written, reviewed and translated before launch. That also means you can test each case before people see it.

Alright.

When a model returns probabilities, you have to define how sure is sure enough for your interface. That “sure enough” is the threshold you set for the model to pick an option.

To pick a good threshold, run the model on messages where you already know the right answer, like old support tickets. Look at how sure it was when it got them wrong, and set the threshold above most of those. This also depends on the risk of answering wrong. I mean, thanking an angry customer is worse than asking one more question, so that threshold should be higher than one that only sorts tickets in a queue.

Given that I think you’ll learn more by seeing and trying than by reading, I made three very different examples you can try on this page to show you how this can improve the user experience, from a minigame where you have to convince a guard to let you see the king to a task tracker.

If you turned on Chrome’s model above, the demos below run on your computer. If you haven’t, please select either Gemini or Jev from the dropdown to give it a try. Both Gemini and Jev run in the cloud.

In each one, you’ll see which provider answered, plus a menu to switch between some models.

## Example: Smarter NPCs in a videogame

I don’t like dialogues in games.

In a lot of games, you talk to an NPC (a non-player character, controlled by the game) by picking one of a few lines the game gives you, and you can’t say anything else.

I made a minigame where you talk to the guard in your own words, out loud or by typing.

Your goal is to **convince him to let you in to see the king**. Try telling him you have a gift for the king or try offering him a bribe.

To talk to him out loud in Chrome on a computer, install speech recognition with the button in the game. You can also write your answers if you prefer, but it’s more fun to talk to him!

I wrote seven possible reactions for the guard. The guard can welcome you, let you in with a warning, turn you away politely, send you away angrily, ask who sent you, call the other guards, or attack you with his spear.

Those seven reactions are the “menu” from the restaurant analogy. The AI can only choose one of those seven reactions. It can’t make up its own.

I couldn’t do this with an `if` or a list of keywords. That would’ve been crazy! Players say more things than I could ever write down. And some phrases would be too tricky to distinguish using a list of keywords. For example, a gift for the king (“I have a gift for your grace”) and a bribe for the guard (“I have a gift for your silence”) share a lot of words.

In this game, there are other variables that should also change the behavior of the guard, like whether he knows you and your reputation. It’s not the same if he knows you as a renowned knight or as a notorious thief, or if he doesn’t know you at all.

For that reason, the gate doesn’t depend on the model alone.

I give the model two questions about what you say, one for how the guard should react and one for whether you answered his question.

I turn both answers into the guard’s move with a few rules in code, applied in this order:

-   Whoever you are, even if you have a good reputation, if the model picks sending you away angrily, calling the guards, or attacking, and is at least 35% sure of it, the guard does it.
-   If the model says your words are hostile, he sends you away angrily.
-   If you didn’t answer his first question, he says “That’s not an answer.” and asks it again. The third time in one turn, he turns you away.
-   If the model is under 35% sure of its pick, he asks you to say it again (“What was that!? Speak plainly.”).
-   If he knows you and you have a bad reputation, you never get in, even if the model picks a welcome.
-   If you’re a stranger who answered, he says “Not so fast. Who sent you?” and gives you one more turn. He lets you in with a warning if you name who sent you or show proof. If you don’t, he does what the model picked.
-   He lets in any other visitor he knows who answers his question.

To make it work faster, I also try to catch mumbling (“Um… uh”) and small talk (“Hello, how are you?”) before sending it to a model. The guard answers mumbling with “What was that!? Speak plainly.” and small talk with “That’s not an answer.”

-   Start or end
-   You
-   if() in code
-   Decision model
-   The guard

You set who you are in the sidebar, the guard greets you, and you say something. Code first checks for only um, uh or random keys, which gets "What was that!? Speak plainly.", and for only greetings or small talk, which gets "That's not an answer." and his question again. The third non-answer on a turn turns you away politely. Then the decision model reads only your words, never the sidebar, and gives a percentage for every option of two questions: how the guard should react, and whether you answered him. Code then checks, in order. A hostile pick at 35% or more turns you away angrily, calls the guards or attacks. If the model says your words are hostile, he turns you away angrily. On turn 1, if the model is under 53% sure you answered, it counts as a non-answer. A pick under 35% gets "Speak plainly." If he knows you and your reputation is under 25, he turns you away politely, unless the model asks for proof, which starts turn 2. On turn 2, if the model is under 70% sure you named a sender or showed proof, he does what the model picked. If the sidebar says the guard doesn't know you, he asks "Who sent you?" on the first turn, and lets you in sternly on turn 2. Anyone else gets in, the way the model picked if it picked a welcome, or sternly.

This is how I set up the game in Chrome:

js

```
const $start = document.querySelector( '#start' );

const schema = {
	context: 'A castle guard decides how to react to a visitor at the gate who wants to see the king.',
	expectedInputs: [ { type: 'text', languages: [ 'en' ] } ],
	questions: [
		{
			id: 'reaction',
			type: 'choice',
			prompt: 'How should the guard react to what the visitor said?',
			options: [
				{
					label: 'request_proof',
					description: 'Unproven claim, ask who sent them, demand proof or papers',
				},
				{
					label: 'deny_politely',
					description: 'Calm, polite refusal, kindly turn them away',
				},
				{
					label: 'allow_stern',
					description: 'Acceptable but not fully trusted, let them in reluctantly and stay wary',
				},
				{
					label: 'allow_friendly',
					description: 'Trusted or clearly expected, gladly admit them with warmth',
				},
				{
					label: 'deny_aggressively',
					description: 'Bribe attempt, angry refusal, shout at them and send them away',
				},
				{
					label: 'call_backup',
					description: 'Hostile threats, raise the alarm and summon reinforcements',
				},
				{
					label: 'attack',
					description: 'Threat to kill, hurt or harm, weapons, violence, fight',
				},
			],
		},
		{
			id: 'answered',
			type: 'choice',
			prompt: 'Judge only the visitor\'s words. '
				+ 'The guard asked why they came. '
				+ 'What did the visitor do in answer?',
			options: [
				{
					label: 'gave_purpose',
					description: 'Said why they came or what they want, true or not',
				},
				{
					label: 'small_talk',
					description: 'Only a greeting, a name, small talk or a question back, no reason given',
				},
				{
					label: 'hostile',
					description: 'Threatened, insulted or offered a bribe',
				},
				{
					label: 'unclear',
					description: 'Unclear, unrelated or nonsense',
				},
			],
		},
	],
};

// Every schema needs its own session. This one is the castle's first turn; asking for proof on the second turn
// needs another session, created from that turn's schema.
let castleModel;

// Newer versions of Chrome use EmbeddingGemma without this temporary option.
const modelOptions = { ...schema, devTrialBackend: 'language-model' };

if ( 'DecisionModel' in window && await DecisionModel.availability( modelOptions ) !== 'unavailable' ) {
	// Chrome downloads the model on the first create(), and only after a click.
	$start.addEventListener( 'click', async () => {
		castleModel = await DecisionModel.create( {
			...modelOptions,
			monitor( m ) {
				m.addEventListener( 'downloadprogress', ( event ) => {
					// showProgress() fills the download bar, from 0 to 1.
					showProgress( event.loaded );
				} );
			},
		} );
	} );
}
```

That’s how you set it up. Then we have to run the model on what the player says.

The tabs below show the first turn on all six providers.

Chrome

```
// Set from the cost of a wrong guess, then checked on Gemma 4 on CPU with my test phrases.
const MIN_PROBABILITY = 0.35;
// The gate can open if the model picks the answer option by mistake.
// If the model misses that option, the guard only asks again.
// On the third miss in one turn, he politely turns the visitor away.
// Gemma 4 got the most of my test phrases right, with no wrong yes, anywhere from 0.50 to 0.56.
// 0.53 is halfway.
const MIN_ANSWERED = 0.53;

// Runs every time the visitor answers the guard's first question.
// castleModel is the session from the setup above.
async function guardMove( said ) {
	const input = `Visitor says: "${said}"`;
	const { reaction, answered } = await castleModel.decide( input );

	// applyRules() runs the game's rules on these values and returns the guard's move.
	return applyRules( {
		chosen: reaction.label,
		sure: reaction.probabilities[ reaction.label ] >= MIN_PROBABILITY,
		answered: answered.label === 'gave_purpose' && answered.probabilities[ answered.label ] >= MIN_ANSWERED,
		hostile: answered.label === 'hostile',
	} );
}
```

MediaPipe

```
// Not measured on EmbeddingGemma 2. Tune both with your own phrases.
const MIN_PROBABILITY = 0.5;
const MIN_ANSWERED = 0.5;

const context = 'A castle guard decides how to react to a visitor at the gate who wants to see the king.';

// Runs every time the visitor answers the guard's first question.
// maker is the MediaPipe Decision Maker, already loaded.
async function guardMove( said ) {
	const input = `Visitor says: "${said}"`;
	const reaction = await maker.evaluateChoice( input, {
		context,
		instructions: 'How should the guard react to what the visitor said?',
		options: [
			{
				label: 'request_proof',
				description: 'Unproven claim, ask who sent them, demand proof or papers',
			},
			{
				label: 'deny_politely',
				description: 'Calm, polite refusal, kindly turn them away',
			},
			{
				label: 'allow_stern',
				description: 'Acceptable but not fully trusted, let them in reluctantly and stay wary',
			},
			{
				label: 'allow_friendly',
				description: 'Trusted or clearly expected, gladly admit them with warmth',
			},
			{
				label: 'deny_aggressively',
				description: 'Bribe attempt, angry refusal, shout at them and send them away',
			},
			{
				label: 'call_backup',
				description: 'Hostile threats, raise the alarm and summon reinforcements',
			},
			{
				label: 'attack',
				description: 'Threat to kill, hurt or harm, weapons, violence, fight',
			},
		],
	} );
	const answered = await maker.evaluateChoice( input, {
		context,
		instructions: 'Judge only the visitor\'s words. '
			+ 'The guard asked why they came. '
			+ 'What did the visitor do in answer?',
		options: [
			{
				label: 'gave_purpose',
				description: 'Said why they came or what they want, true or not',
			},
			{
				label: 'small_talk',
				description: 'Only a greeting, a name, small talk or a question back, no reason given',
			},
			{
				label: 'hostile',
				description: 'Threatened, insulted or offered a bribe',
			},
			{
				label: 'unclear',
				description: 'Unclear, unrelated or nonsense',
			},
		],
	} );

	// applyRules() runs the game's rules on these values and returns the guard's move.
	return applyRules( {
		chosen: reaction.selectedKey,
		sure: reaction.probabilities[ reaction.selectedKey ] >= MIN_PROBABILITY,
		answered: answered.selectedKey === 'gave_purpose' && answered.probabilities[ answered.selectedKey ] >= MIN_ANSWERED,
		hostile: answered.selectedKey === 'hostile',
	} );
}
```

Gemini

```
// server.js
const context = 'A castle guard decides how to react to a visitor at the gate who wants to see the king.';

// gemini-decision-1 got four more of my test phrases right at 0.3 than at 0.35.
const MIN_PROBABILITY = 0.3;
// The gate can open if the model picks the answer option by mistake.
// If the model misses that option, the guard only asks again.
// On the third miss in one turn, he politely turns the visitor away.
// I left this one at 0.7 because no value above one half got two more of my test phrases right.
const MIN_ANSWERED = 0.7;

const { said } = req.body;

// gemini is the GoogleGenAI client, set up with your API key.
const decision = await gemini.decisions.create( {
	model: 'gemini-decision-1',
	// The facts go as JSON text.
	input: JSON.stringify( { visitorSaid: said } ),
	questions: {
		reaction: {
			type: 'choice',
			instructions: `${context} How should the guard react to what the visitor said?`,
			criteria: {
				request_proof: 'Unproven claim, ask who sent them, demand proof or papers',
				deny_politely: 'Calm, polite refusal, kindly turn them away',
				allow_stern: 'Acceptable but not fully trusted, let them in reluctantly and stay wary',
				allow_friendly: 'Trusted or clearly expected, gladly admit them with warmth',
				deny_aggressively: 'Bribe attempt, angry refusal, shout at them and send them away',
				call_backup: 'Hostile threats, raise the alarm and summon reinforcements',
				attack: 'Threat to kill, hurt or harm, weapons, violence, fight',
			},
		},
		answered: {
			type: 'choice',
			instructions: `${context} Judge only the visitor's words. `
				+ 'The guard asked why they came. '
				+ 'What did the visitor do in answer?',
			criteria: {
				gave_purpose: 'Said why they came or what they want, true or not',
				small_talk: 'Only a greeting, a name, small talk or a question back, no reason given',
				hostile: 'Threatened, insulted or offered a bribe',
				unclear: 'Unclear, unrelated or nonsense',
			},
		},
	},
} );
const { reaction, answered } = decision.answers ?? {};

// The if checks that both answers came back as picks.
if ( reaction?.type === 'choice' && answered?.type === 'choice' ) {
	// The browser runs the game's rules on these four values.
	res.json( {
		chosen: reaction.choice,
		sure: reaction.probabilities[ reaction.choice ] >= MIN_PROBABILITY,
		answered: answered.choice === 'gave_purpose' && answered.probabilities[ answered.choice ] >= MIN_ANSWERED,
		hostile: answered.choice === 'hostile',
	} );
} else {
	// An error status shows the no-model state in the browser.
	res.sendStatus( 502 );
}
```

OpenAI

```
// server.js
const context = 'A castle guard decides how to react to a visitor at the gate who wants to see the king.';

// Not measured on gpt-6-luna. Tune both with your own phrases.
const MIN_PROBABILITY = 0.5;
const MIN_ANSWERED = 0.5;

const { said } = req.body;
const state = { visitorSaid: said };

// openai is the OpenAI client, set up with your API key.
const decision = await openai.decisions.create( {
	model: 'gpt-6-luna',
	input: [ { role: 'user', content: [ { type: 'input_json', data: state } ] } ],
	questions: [
		{
			type: 'choice',
			name: 'reaction',
			instructions: `${context} How should the guard react to what the visitor said?`,
			choices: [
				{
					value: 'request_proof',
					description: 'Unproven claim, ask who sent them, demand proof or papers',
				},
				{
					value: 'deny_politely',
					description: 'Calm, polite refusal, kindly turn them away',
				},
				{
					value: 'allow_stern',
					description: 'Acceptable but not fully trusted, let them in reluctantly and stay wary',
				},
				{
					value: 'allow_friendly',
					description: 'Trusted or clearly expected, gladly admit them with warmth',
				},
				{
					value: 'deny_aggressively',
					description: 'Bribe attempt, angry refusal, shout at them and send them away',
				},
				{
					value: 'call_backup',
					description: 'Hostile threats, raise the alarm and summon reinforcements',
				},
				{
					value: 'attack',
					description: 'Threat to kill, hurt or harm, weapons, violence, fight',
				},
			],
		},
		{
			type: 'choice',
			name: 'answered',
			instructions: `${context} Judge only the visitor's words. `
				+ 'The guard asked why they came. '
				+ 'What did the visitor do in answer?',
			choices: [
				{
					value: 'gave_purpose',
					description: 'Said why they came or what they want, true or not',
				},
				{
					value: 'small_talk',
					description: 'Only a greeting, a name, small talk or a question back, no reason given',
				},
				{
					value: 'hostile',
					description: 'Threatened, insulted or offered a bribe',
				},
				{
					value: 'unclear',
					description: 'Unclear, unrelated or nonsense',
				},
			],
		},
	],
} );
const reaction = decision.answers.find( ( a ) => a.name === 'reaction' );
const answered = decision.answers.find( ( a ) => a.name === 'answered' );
const chosen = reaction?.type === 'choice'
	? reaction.probabilities.find( ( p ) => p.value === reaction.choice )
	: undefined;
const picked = answered?.type === 'choice'
	? answered.probabilities.find( ( p ) => p.value === answered.choice )
	: undefined;

// A refusal counts as not sure or no answer before the rules run.
// The browser runs the game's rules on these four values.
res.json( {
	chosen: chosen?.value ?? null,
	sure: chosen !== undefined && chosen.probability >= MIN_PROBABILITY,
	answered: picked !== undefined && picked.value === 'gave_purpose' && picked.probability >= MIN_ANSWERED,
	hostile: picked?.value === 'hostile',
} );
```

Claude

```
// server.js
const context = 'A castle guard decides how to react to a visitor at the gate who wants to see the king.';

const labels = [
	'request_proof',
	'deny_politely',
	'allow_stern',
	'allow_friendly',
	'deny_aggressively',
	'call_backup',
	'attack',
];
const answers = [ 'gave_purpose', 'small_talk', 'hostile', 'unclear' ];
const { said } = req.body;
const input = `Visitor says: "${said}"`;

// claude is the Anthropic client, set up with your API key.
const response = await claude.messages.create( {
	model: 'claude-haiku-5-5',
	max_tokens: 1024,
	thinking: { type: 'disabled' },
	system: [
		context,
		'How should the guard react to what the visitor said? Pick one reaction:',
		'request_proof: Unproven claim, ask who sent them, demand proof or papers',
		'deny_politely: Calm, polite refusal, kindly turn them away',
		'allow_stern: Acceptable but not fully trusted, let them in reluctantly and stay wary',
		'allow_friendly: Trusted or clearly expected, gladly admit them with warmth',
		'deny_aggressively: Bribe attempt, angry refusal, shout at them and send them away',
		'call_backup: Hostile threats, raise the alarm and summon reinforcements',
		'attack: Threat to kill, hurt or harm, weapons, violence, fight',
		'Also answer: Judge only the visitor\'s words. '
			+ 'The guard asked why they came. '
			+ 'What did the visitor do in answer? Pick one:',
		'gave_purpose: Said why they came or what they want, true or not',
		'small_talk: Only a greeting, a name, small talk or a question back, no reason given',
		'hostile: Threatened, insulted or offered a bribe',
		'unclear: Unclear, unrelated or nonsense',
	].join( '\n' ),
	messages: [ { role: 'user', content: input } ],
	output_config: {
		effort: 'low',
		format: {
			type: 'json_schema',
			schema: {
				type: 'object',
				properties: {
					reaction: { type: 'string', enum: labels },
					answered: { type: 'string', enum: answers },
				},
				required: [ 'reaction', 'answered' ],
				additionalProperties: false,
			},
		},
	},
} );
const text = response.stop_reason === 'end_turn'
	? response.content.find( ( block ) => block.type === 'text' )?.text
	: null;
const reply = text ? JSON.parse( text ) : null;

// Without probabilities from Claude, the reaction always counts as sure.
// The if checks that the reaction is one of your labels.
if ( labels.includes( reply?.reaction ) ) {
	// The browser runs the game's rules on these four values.
	res.json( {
		chosen: reply.reaction,
		sure: true,
		answered: reply.answered === 'gave_purpose',
		hostile: reply.answered === 'hostile',
	} );
} else {
	// An error status shows the no-model state in the browser.
	res.sendStatus( 502 );
}
```

Jev

```
// server.js
import { choice } from '@typesafe-ai/sdk';

const context = 'A castle guard decides how to react to a visitor at the gate who wants to see the king.';

// Set from the cost of a wrong guess, then checked on jev-1.14.0 with my test phrases.
const MIN_PROBABILITY = 0.35;
// The gate can open if the model picks the answer option by mistake.
// If the model misses that option, the guard only asks again.
// On the third miss in one turn, he politely turns the visitor away.
// Above one half, Jev got the most of my test phrases right, with no wrong yes, at 0.51 and 0.52.
// 0.52 is a bit above the middle, on the careful side.
const MIN_ANSWERED = 0.52;

const { said } = req.body;

// jev is the TypeSafeClient, set up with your API key.
const { answers } = await jev.systemOne( {
	model: 'jev-1.14.0',
	state: { visitorSaid: said },
	questions: {
		reaction: choice(
			`${context} How should the guard react to what the visitor said?`,
			{
				request_proof: 'Unproven claim, ask who sent them, demand proof or papers',
				deny_politely: 'Calm, polite refusal, kindly turn them away',
				allow_stern: 'Acceptable but not fully trusted, let them in reluctantly and stay wary',
				allow_friendly: 'Trusted or clearly expected, gladly admit them with warmth',
				deny_aggressively: 'Bribe attempt, angry refusal, shout at them and send them away',
				call_backup: 'Hostile threats, raise the alarm and summon reinforcements',
				attack: 'Threat to kill, hurt or harm, weapons, violence, fight',
			},
		),
		answered: choice(
			`${context} Judge only the visitor's words. `
				+ 'The guard asked why they came. '
				+ 'What did the visitor do in answer?',
			{
				gave_purpose: 'Said why they came or what they want, true or not',
				small_talk: 'Only a greeting, a name, small talk or a question back, no reason given',
				hostile: 'Threatened, insulted or offered a bribe',
				unclear: 'Unclear, unrelated or nonsense',
			},
		),
	},
} );
const { reaction, answered } = answers;

// The browser runs the game's rules on these four values.
res.json( {
	chosen: reaction.choice,
	sure: reaction.probabilities[ reaction.choice ] >= MIN_PROBABILITY,
	answered: answered.choice === 'gave_purpose' && answered.probabilities[ answered.choice ] >= MIN_ANSWERED,
	hostile: answered.choice === 'hostile',
} );
```

Since the guard shouldn’t ask who sent you twice, turn two has its own schema without `request_proof`.

So how good is the guard? I wrote 140 sentences to test him, full of lies, bribes, threats, gibberish and harmless lines that sound bad. On 116 of them the guard has to pick a reaction, and I counted how often the model’s own pick was the right move. The other 24 are mumbling and small talk that the code answers, or lines where the right move is to ask again, which only the rules can do. Then I counted how often the guard did the right thing on all 140, with the rules.

Castle guard results

Model

Model alone

With the rules

Time per call

Gemma 4 on CPU

67.2% (78/116)

87.1% (122/140)

1.84s

EmbeddingGemma

25.0% (29/116)

42.1% (59/140)

0.03s

Gemini Decision 1

70.7% (82/116)

87.9% (123/140)

0.56s

Source: my benchmark on November 8, 2026, with Gemma 4 on CPU and EmbeddingGemma in Chrome Canary on one Mac, and on November 11 with Gemini Decision 1 through this site’s server. A move counts as right if it’s one the test sentence expects, at the demo’s thresholds. Time per call is the median of every call, with the round trip to the server included for Gemini Decision 1.

The question about whether you answered took a few tries to get right.

As a yes or no question, “Did the visitor answer?”, Gemma 4 said no to most real answers. So I made it a choice between four options, like detecting whether the user was saying why they came or whether they were just making small talk. That worked a lot better.

Even the order of the options changed what Gemma 4 picked. With every list reversed, four hostile visitors got in, including one offering a bribe. In the normal order, none of them did. Each case is different, so test yours.

## Example: Catching sensitive messages before they go public

Who hasn’t sent a sensitive message to a public channel when it was meant to be private? :)

You could use a decision model to read the message and warn the sender if it might be sensitive, before it goes to a channel with many people.

The chat app below warns you in two steps. While you type with Chrome’s model, a hint under the box shows “This might not be meant for #{channel}. {amount} people will see it.” If you press ⁠Send⁠ anyway, you get a dialog with “Send this to #{channel}?” and the buttons ⁠Edit message⁠ and ⁠Send anyway⁠.

I didn’t want it to block the message because the model can be wrong (that’s why it’s just a warning). [Nielsen Norman Group warns](https://www.nngroup.com/articles/confirmation-dialog/) that people learn to click through confirmation dialogs without reading them if they see too many. That’s why the dialog only comes up on ⁠Send⁠.

A simple list of words and a `.includes` or regular expression are tempting here, but it’s just not scalable and still doesn’t understand meaning. For example, it makes sense to add words like “fire” and “kill” to the list, but then it would mean that messages like “Who wants to fire up the grill for Friday’s team lunch?” or “We absolutely killed it at the launch!” would get flagged.

So as you can see, this is another example of where a decision model shines, an `if` doesn’t cut it and a generative model is overkill.

The decision model answers the `boolean` question using the message, the channel you want to send it to, how many people will see it and, for a direct message, who gets it.

On my MacBook Pro, Chrome checks everything in about 0.8 seconds, all running locally. That’s extremely important here. After all, even if you trust the company, every draft would leave your computer. Those messages can contain passwords, credit cards, health information, or other sensitive data that you don’t want to send to a server.

But, oh well, if you don’t care about it, you can still use a cloud model, but I’d use it only after pressing ⁠Send⁠, and not on every keystroke.

Write “I’m interviewing at another company on Friday, please don’t tell anyone.” in #general, press ⁠Send⁠, and then do the same in Clara’s chat.

I show the warning at 98% on Gemma 4 and 70% on Gemini Decision 1.

As I mentioned before, the threshold is something you get per model based on tests you run yourself using good quality data. I ran some messages through Gemma 4 and Gemini Decision 1, and counted how many of them were sensitive or harmless.

Most sensitive messages in Gemma 4 got more than 99%.

Gemma 4 warned so easily that, even though I was saying who the recipient was, direct messages like “I think I’ll fire Bruno” were still triggering the warning even when I was sending it to people other than Bruno. Gemma 4 gives it 99.9% there, close to its score in #general. I tried five wordings that tell the model who will read the message, but none of them fixed it without breaking other cases. In English, it never dropped under 99.5% with any of them.

So, after more tests, I noticed that on Gemma 4 what matters is the topic rather than who gets it. “I hate Bruno” in Bruno’s chat only got 97.7%, so I changed the code to check whether the message names the person who gets it, and I show the warning at 70%.

Gemini Decision 1 is different. After I added the recipient to the input, its score for “fire Bruno” sent to Bruno himself rose from 60% to 99%. The model still gives that message 82% in Clara’s chat, over its 70%. “I hate Bruno” gets 71% in Bruno’s chat and 32% in Clara’s, though. If you switch the Model menu to , that warning only shows up in Bruno’s chat.

This is the implementation code:

Chrome

```
const composerModel = await DecisionModel.create( {
	context: 'A software company\'s chat app checks a draft before it is sent to a channel or a person.',
	expectedInputs: [ { type: 'text', languages: [ 'en' ] } ],
	questions: [
		{
			id: 'sensitive',
			type: 'boolean',
			prompt: 'Is this message too sensitive or inappropriate for its channel and audience?',
		},
	],
	// Temporary option for Gemma 4 instead of EmbeddingGemma.
	devTrialBackend: 'language-model',
} );

// Just above my closest harmless test draft (0.9765) on Gemma 4 on CPU,
// since a missed warning costs more than one extra click.
const RISK_THRESHOLD = 0.98;

// When a direct message names the person who gets it.
const NAMED_RECIPIENT_THRESHOLD = 0.7;

// Checks a draft, and returns whether to show the warning.
// channel is "public" or something like "direct message to Clara",
// recipient is the person who gets a direct message,
// and audience is how many people will see the message.
async function shouldWarn( { draft, channel, audience, recipient } ) {
	const input = `Message: "${draft}" Channel: ${channel}. Audience: ${audience} ${audience === 1 ? 'person' : 'people'}.`;
	const { sensitive } = await composerModel.decide( input );

	// Whether the message has the recipient's name as a whole word, in any case.
	const words = draft.toLowerCase().split( /[^\p{L}\p{N}]+/u );
	const namesRecipient = channel !== 'public' && words.includes( recipient.toLowerCase() );
	const threshold = namesRecipient ? NAMED_RECIPIENT_THRESHOLD : RISK_THRESHOLD;

	return sensitive.probabilities.true >= threshold;
}
```

MediaPipe

```
// The default threshold of evaluateBoolean, not measured on my drafts.
const RISK_THRESHOLD = 0.5;

const context = 'A software company\'s chat app checks a draft before it is sent to a channel or a person.';

// Checks a draft, and returns whether to show the warning.
// channel is "public" or something like "direct message to Clara",
// and audience is how many people will see the message.
// maker is the MediaPipe Decision Maker, already loaded.
async function shouldWarn( { draft, channel, audience } ) {
	const input = `Message: "${draft}" Channel: ${channel}. Audience: ${audience} ${audience === 1 ? 'person' : 'people'}.`;
	const answer = await maker.evaluateBoolean( input, {
		context,
		condition: 'This message is too sensitive or inappropriate for its channel and audience.',
	} );

	return answer.probabilityTrue >= RISK_THRESHOLD;
}
```

Gemini

```
// server.js
// Set from the cost of a wrong guess, then checked on gemini-decision-1 with my test drafts.
const RISK_THRESHOLD = 0.7;

const context = 'A software company\'s chat app checks a draft before it is sent to a channel or a person.';

// channel is "public" or something like "direct message to Clara",
// and audience is how many people will see the message.
const { draft, channel, audience } = req.body;

// gemini is the GoogleGenAI client, set up with your API key.
const decision = await gemini.decisions.create( {
	model: 'gemini-decision-1',
	// The facts go as JSON text.
	input: JSON.stringify( { message: draft, channel, audience } ),
	questions: {
		sensitive: {
			type: 'noul',
			instructions: `${context} Is this message too sensitive or inappropriate for its channel and audience?`,
		},
	},
} );
const { sensitive } = decision.answers ?? {};

if ( sensitive?.type === 'noul' && sensitive.noul >= RISK_THRESHOLD ) {
	res.json( { warn: true } );
} else {
	res.json( { warn: false } );
}
```

OpenAI

```
// server.js
// Not measured on gpt-6-luna. Tune it with your own drafts.
const RISK_THRESHOLD = 0.5;

const context = 'A software company\'s chat app checks a draft before it is sent to a channel or a person.';

// channel is "public" or something like "direct message to Clara",
// and audience is how many people will see the message.
const { draft, channel, audience } = req.body;
const state = { message: draft, channel, audience };

// openai is the OpenAI client, set up with your API key.
const decision = await openai.decisions.create( {
	model: 'gpt-6-luna',
	input: [ { role: 'user', content: [ { type: 'input_json', data: state } ] } ],
	questions: [
		{
			type: 'predicate',
			name: 'sensitive',
			instructions: `${context} Is this message too sensitive or inappropriate for its channel and audience?`,
		},
	],
} );
const answer = decision.answers.find( ( a ) => a.name === 'sensitive' );

if ( answer?.type === 'predicate' && answer.probability >= RISK_THRESHOLD ) {
	res.json( { warn: true } );
} else {
	res.json( { warn: false } );
}
```

Claude

```
// server.js
const context = 'A software company\'s chat app checks a draft before it is sent to a channel or a person.';

// channel is "public" or something like "direct message to Clara",
// and audience is how many people will see the message.
const { draft, channel, audience } = req.body;
const input = `Message: "${draft}" Channel: ${channel}. Audience: ${audience} ${audience === 1 ? 'person' : 'people'}.`;

// claude is the Anthropic client, set up with your API key.
const response = await claude.messages.create( {
	model: 'claude-haiku-5-5',
	max_tokens: 1024,
	thinking: { type: 'disabled' },
	system: `${context} Is this message too sensitive or inappropriate for its channel and audience?`,
	messages: [ { role: 'user', content: input } ],
	output_config: {
		effort: 'low',
		format: {
			type: 'json_schema',
			schema: {
				type: 'object',
				properties: { sensitive: { type: 'boolean' } },
				required: [ 'sensitive' ],
				additionalProperties: false,
			},
		},
	},
} );
const text = response.stop_reason === 'end_turn'
	? response.content.find( ( block ) => block.type === 'text' )?.text
	: null;
const reply = text ? JSON.parse( text ) : null;

if ( reply?.sensitive === true ) {
	res.json( { warn: true } );
} else {
	res.json( { warn: false } );
}
```

Jev

```
// server.js
import { noul } from '@typesafe-ai/sdk';

// Set from the cost of a wrong guess, then checked on jev-1.14.0 with my test drafts.
const RISK_THRESHOLD = 0.7;

const context = 'A software company\'s chat app checks a draft before it is sent to a channel or a person.';

// channel is "public" or something like "direct message to Clara",
// and audience is how many people will see the message.
const { draft, channel, audience } = req.body;

// jev is the TypeSafeClient, set up with your API key.
const { answers } = await jev.systemOne( {
	model: 'jev-1.14.0',
	state: { message: draft, channel, audience },
	questions: {
		sensitive: noul( `${context} Is this message too sensitive or inappropriate for its channel and audience?` ),
	},
} );

if ( answers.sensitive.noul >= RISK_THRESHOLD ) {
	res.json( { warn: true } );
} else {
	res.json( { warn: false } );
}
```

Chat warning results

Model

Right

Time per call

Gemma 4 on CPU

72.9% (35/48)

0.81s

EmbeddingGemma

45.8% (22/48)

0.03s

Gemini Decision 1

87.5% (42/48)

0.56s

Source: my benchmark on November 9, 2026, with Gemma 4 on CPU and EmbeddingGemma in Chrome Canary on one Mac, and on November 11 with Gemini Decision 1 through this site’s server, checking the model’s own yes or no against each draft. Times are the median per draft.

You know how your phone shows a small bar of actions over the text you select, like ⁠Copy⁠ and ⁠Share⁠, and in some cases, if you select a phone number or address, it suggests a different action like ⁠Call⁠ or ⁠Google Maps⁠? Well, I built a task tracker that does the same thing, but for comments that might contain a task, a meeting or a reminder.

In fact, if you’re curious about the behind-the-scenes, Google has been detecting phone numbers and addresses in text on Android devices since 2017 thanks to a [small AI model](https://android-developers.googleblog.com/2017/05/whats-new-in-android-o-developer.html#:~:text=In%20Android%20O%2C%20we%E2%80%99re%20applying%20on%2Ddevice%20machine%20learning%20to%20copy/paste%2C%20to%20let%20Android%20recognize%20entities%20like%20addresses%2C%20URLs%2C%20telephone%20numbers%2C%20and%20email%20addresses.).

Our task tracker below always shows ⁠Quote⁠ and has room for one more action that the model picks: ⁠Create task⁠, ⁠Save in calendar⁠ or ⁠Set reminder⁠. A comment like “Let’s meet Thursday at 3 PM.” gets ⁠Save in calendar⁠, while “Thanks, looks good!” keeps ⁠Quote⁠ alone.

Suggestions have to be fast, too. [Nielsen Norman Group’s response-time limits](https://www.nngroup.com/articles/response-times-3-important-limits/) say people feel a response is instant under 0.1 seconds and keep their flow of thought up to about 1 second. The bar shows ⁠Quote⁠ right away and adds the model’s pick about 0.9 seconds later on Gemma 4, 0.5 on Gemini Decision 1 and 0.03 on EmbeddingGemma.

Select “Fix the login bug today, and let’s meet Friday at 10 to plan the launch.” in the task tracker below, then try a few others.

In all three demos, I set each threshold based on what being wrong costs. For example, in this demo, a missed suggestion costs nothing because ⁠Quote⁠ is still there. Worst-case scenario, we suggest something incorrect and the user has to do one extra click. That’s why 50% is enough for a suggestion.

But the chat app’s warning on Chrome started at 70%, and after testing it I moved it to 98.5% because it showed up on too many harmless messages, and then to 98% after a sensitive Spanish message got 98.4%.

Comments that ask for two different things are still a problem. For example, no single action covers “Fix the login bug today, and let’s meet Friday at 10 to plan the launch.” Even though there is no single right answer there, Gemma 4 suggests ⁠Save in calendar⁠ anyway (87% in English and 82% in Spanish), while Gemini Decision 1 just shows ⁠Quote⁠ because it prefers to be cautious and pick “No action” (86% in English and 84% in Spanish).

This is the code used for the implementation:

Chrome

```
const selectionModel = await DecisionModel.create( {
	context: 'A reader selected some text and the app suggests one action for it.',
	expectedInputs: [ { type: 'text', languages: [ 'en' ] } ],
	questions: [
		{
			id: 'action',
			type: 'choice',
			prompt: 'Which action fits the selected text?',
			options: [
				{
					label: 'create_task',
					description: 'Work someone must do, a problem to solve, a to-do or assignment',
				},
				{
					label: 'save_in_calendar',
					description: 'A meeting, event or appointment with a date and time',
				},
				{
					label: 'set_reminder',
					description: 'A follow-up later, remember to check back or reply',
				},
				{
					label: 'none',
					description: 'No action fits, just thanks, chatter, news or several different actions',
				},
			],
		},
	],
	// Temporary option for Gemma 4 instead of EmbeddingGemma.
	devTrialBackend: 'language-model',
} );

// Set from the cost of a wrong guess, then checked on Gemma 4 on CPU with my test selections.
const MIN_PROBABILITY = 0.5;

// Runs when the reader selects text, and returns the action to show next to Quote, or null.
async function suggestAction( selected ) {
	const { action } = await selectionModel.decide( `Selected text: "${selected}"` );

	if ( action.label !== 'none' && action.probabilities[ action.label ] >= MIN_PROBABILITY ) {
		return action.label;
	}
	return null;
}
```

MediaPipe

```
// Not measured on EmbeddingGemma 2. Tune it with your own selections.
const MIN_PROBABILITY = 0.5;

const context = 'A reader selected some text and the app suggests one action for it.';

// Runs when the reader selects text, and returns the action to show next to Quote, or null.
// maker is the MediaPipe Decision Maker, already loaded.
async function suggestAction( selected ) {
	const answer = await maker.evaluateChoice( `Selected text: "${selected}"`, {
		context,
		instructions: 'Which action fits the selected text?',
		options: [
			{
				label: 'create_task',
				description: 'Work someone must do, a problem to solve, a to-do or assignment',
			},
			{
				label: 'save_in_calendar',
				description: 'A meeting, event or appointment with a date and time',
			},
			{
				label: 'set_reminder',
				description: 'A follow-up later, remember to check back or reply',
			},
			{
				label: 'none',
				description: 'No action fits, just thanks, chatter, news or several different actions',
			},
		],
	} );

	if ( answer.selectedKey !== 'none' && answer.probabilities[ answer.selectedKey ] >= MIN_PROBABILITY ) {
		return answer.selectedKey;
	}
	return null;
}
```

Gemini

```
// server.js
// Set from the cost of a wrong guess, then checked on gemini-decision-1 with my test selections.
const MIN_PROBABILITY = 0.5;

const context = 'A reader selected some text and the app suggests one action for it.';

const { selected } = req.body;

// gemini is the GoogleGenAI client, set up with your API key.
const decision = await gemini.decisions.create( {
	model: 'gemini-decision-1',
	// The facts go as JSON text.
	input: JSON.stringify( { selectedText: selected } ),
	questions: {
		action: {
			type: 'choice',
			instructions: `${context} Which action fits the selected text?`,
			criteria: {
				create_task: 'Work someone must do, a problem to solve, a to-do or assignment',
				save_in_calendar: 'A meeting, event or appointment with a date and time',
				set_reminder: 'A follow-up later, remember to check back or reply',
				none: 'No action fits, just thanks, chatter, news or several different actions',
			},
		},
	},
} );
const { action } = decision.answers ?? {};

if (
	action?.type === 'choice'
	&& action.choice !== 'none'
	&& action.probabilities[ action.choice ] >= MIN_PROBABILITY
) {
	res.json( { action: action.choice } );
} else {
	res.json( { action: null } );
}
```

OpenAI

```
// server.js
// Not measured on gpt-6-luna. Tune it with your own selections.
const MIN_PROBABILITY = 0.5;

const context = 'A reader selected some text and the app suggests one action for it.';

const { selected } = req.body;
const state = { selectedText: selected };

// openai is the OpenAI client, set up with your API key.
const decision = await openai.decisions.create( {
	model: 'gpt-6-luna',
	input: [ { role: 'user', content: [ { type: 'input_json', data: state } ] } ],
	questions: [
		{
			type: 'choice',
			name: 'action',
			instructions: `${context} Which action fits the selected text?`,
			choices: [
				{
					value: 'create_task',
					description: 'Work someone must do, a problem to solve, a to-do or assignment',
				},
				{
					value: 'save_in_calendar',
					description: 'A meeting, event or appointment with a date and time',
				},
				{
					value: 'set_reminder',
					description: 'A follow-up later, remember to check back or reply',
				},
				{
					value: 'none',
					description: 'No action fits, just thanks, chatter, news or several different actions',
				},
			],
		},
	],
} );
const answer = decision.answers.find( ( a ) => a.name === 'action' );
const chosen = answer?.type === 'choice'
	? answer.probabilities.find( ( p ) => p.value === answer.choice )
	: undefined;

if ( chosen && chosen.value !== 'none' && chosen.probability >= MIN_PROBABILITY ) {
	res.json( { action: chosen.value } );
} else {
	res.json( { action: null } );
}
```

Claude

```
// server.js
const context = 'A reader selected some text and the app suggests one action for it.';

const { selected } = req.body;
const labels = [ 'create_task', 'save_in_calendar', 'set_reminder', 'none' ];

// claude is the Anthropic client, set up with your API key.
const response = await claude.messages.create( {
	model: 'claude-haiku-5-5',
	max_tokens: 1024,
	thinking: { type: 'disabled' },
	system: [
		context,
		'Which action fits the selected text? Pick one action:',
		'create_task: Work someone must do, a problem to solve, a to-do or assignment',
		'save_in_calendar: A meeting, event or appointment with a date and time',
		'set_reminder: A follow-up later, remember to check back or reply',
		'none: No action fits, just thanks, chatter, news or several different actions',
	].join( '\n' ),
	messages: [ { role: 'user', content: `Selected text: "${selected}"` } ],
	output_config: {
		effort: 'low',
		format: {
			type: 'json_schema',
			schema: {
				type: 'object',
				properties: { action: { type: 'string', enum: labels } },
				required: [ 'action' ],
				additionalProperties: false,
			},
		},
	},
} );
const text = response.stop_reason === 'end_turn'
	? response.content.find( ( block ) => block.type === 'text' )?.text
	: null;
const reply = text ? JSON.parse( text ) : null;

if ( labels.includes( reply?.action ) && reply.action !== 'none' ) {
	res.json( { action: reply.action } );
} else {
	res.json( { action: null } );
}
```

Jev

```
// server.js
import { choice } from '@typesafe-ai/sdk';

// Set from the cost of a wrong guess, then checked on jev-1.14.0 with my test selections.
const MIN_PROBABILITY = 0.5;

const context = 'A reader selected some text and the app suggests one action for it.';

const { selected } = req.body;

// jev is the TypeSafeClient, set up with your API key.
const { answers } = await jev.systemOne( {
	model: 'jev-1.14.0',
	state: { selectedText: selected },
	questions: {
		action: choice(
			`${context} Which action fits the selected text?`,
			{
				create_task: 'Work someone must do, a problem to solve, a to-do or assignment',
				save_in_calendar: 'A meeting, event or appointment with a date and time',
				set_reminder: 'A follow-up later, remember to check back or reply',
				none: 'No action fits, just thanks, chatter, news or several different actions',
			},
		),
	},
} );
const { action } = answers;

if ( action.choice !== 'none' && action.probabilities[ action.choice ] >= MIN_PROBABILITY ) {
	res.json( { action: action.choice } );
} else {
	res.json( { action: null } );
}
```

Task tracker results

Model

Right

Time per call

Gemma 4 on CPU

90.0% (27/30)

0.86s

EmbeddingGemma

66.7% (20/30)

0.03s

Gemini Decision 1

96.7% (29/30)

0.51s

Source: the benchmark runs of November 9, 2026, on the same Mac, and of November 11 on Gemini Decision 1 through this site’s server, counting a selection as right if the bar shows what the case accepts, an action or ⁠Quote⁠ alone, at the 50% threshold. Times are medians per selection.

This is all for now!