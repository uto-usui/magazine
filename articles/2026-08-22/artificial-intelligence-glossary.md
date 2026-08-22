---
title: "Artificial Intelligence: Glossary"
source: "https://www.nngroup.com/articles/artificial-intelligence-glossary/"
publishedDate: "2026-08-21"
category: "design"
feedName: "Nielsen Norman Group"
author: "Caleb Sponheim"
---

Summary:  Plain-language definitions of the AI terms that come up in product and design work, from tokens and context windows to agents, evals, and prompt injection.

AI conversations run on a lot of specialized language. Use this glossary to look up a term you have run into, or to build a working vocabulary before you need one. Definitions follow how the terms are used in AI products and UX work; vendors and researchers sometimes use them differently. Many entries link to NN/G articles that go deeper; for a guided tour of the topic, start with our study guide on [**how AI works and how users think about it**](https://www.nngroup.com/articles/ai-functionality-study-guide/).

Look up the term you need in the table below, search this page with your browser’s Find command, or read straight through. Terms run alphabetically down each column.

[Agent](#agent)

[Embedding](#embedding)

[Machine Learning](#machine_learning)

[Retrieval-Augmented Generation (RAG)](#retrieval-augmented_generation)

[Agentic AI](#agentic_ai)

[Evals (Evaluations)](#evals)

[Memory](#memory)

[Small Language Model (SLM)](#SLM)

[AI Engineering](#ai_engineering)

[Explainability](#explainability)

[Model](#model)

[Supervised Learning](#supervised_learning)

[AI Slop](#slop)

[Finetuning](#fine_tuning)

[Model Context Protocol (MCP)](#MCP)

[Sycophancy](#sycophancy)

[AI Washing](#ai_washing)

[Foundation Model](#foundation_model)

[Multimodal Model](#multimodal)

[Synthetic Data](#synthetic_data)

[Algorithm](#Algorithms)

[Generative AI (GenAI)](#genAI)

[Multishot Prompting (Few-Shot Prompting)](#multi-shot_prompting)

[System Prompt](#system_prompt)

[Alignment](#alignment)

[Generative Pretrained Transformer (GPT)](#GPT)

[Natural Language Processing (NLP)](#NLP)

[Temperature](#temperature)

[Anthropomorphism](#anthropomorphism)

[Generative UI (GenUI)](#generative_ui)

[Neural Networks](#neural_networks)

[Token](#token)

[Artificial General Intelligence (AGI)](#AGI)

[Graphics Processing Unit (GPU)](#GPU)

[One-Shot Prompting (Single-Shot Prompting)](#single-shot_prompting)

[Tool Use (Function Calling)](#tool_use)

[Artificial Intelligence (AI)](#AI)

[Grounding](#grounding)

[Overfitting](#overfitting)

[Training Data](#training_data)

[Automation Bias](#automation_bias)

[Guardrails](#guardrails)

[Overreliance](#over_reliance)

[Transformer](#transformer)

[Bias](#bias)

[Hallucination](#Hallucination)

[Parameter](#parameter)

[Turing Test](#turing_test)

[Chain-of-Thought Prompting](#chain_of_thought)

[Human-in-the-Loop](#human_in_the_loop)

[Probabilistic Model](#probabilistic_model)

[Unsupervised Learning](#unsupervised_learning)

[Compute](#compute)

[Inference](#inference)

[Prompt](#prompt)

[Vibe Coding](#vibe_coding)

[Context](#context)

[Knowledge Cutoff](#knowledge_cutoff)

[Prompt Engineering](#prompt_engineering)

[Zero-Shot Prompting](#zero-shot_prompting)

[Context Window](#context_window)

[Language Model](#language_model)

[Prompt Injection](#prompt_injection)

 

[Dataset](#dataset)

[Large Language Model (LLM)](#LLM)

[Reasoning Model](#reasoning_model)

 

[Deep Learning](#deep_learning)

[Latency](#latency)

[Reinforcement Learning from Human Feedback (RLHF)](#RLHF)

 

### Agent

A system that can use a model and tools to carry out multiple steps toward a goal, evaluate its progress, and decide what to do next. The product around it controls its tools, permissions, stopping rules, and opportunities for human review.

-   See also: [agentic AI](#agentic_ai), [tool use](#tool_use), [model](#model)
-   Related article: [**A Concrete Definition of an AI Agent**](https://www.nngroup.com/articles/definition-ai-agent/)

### Agentic AI

A description of how much latitude a system has between prompts. An agentic system can choose several steps and use tools toward a goal without being told each move. Autonomy is a matter of degree, so calling a product an agent says little by itself about how much autonomy it actually has.

-   See also: [agent](#agent), [tool use](#tool_use)
-   Related article: [**A Concrete Definition of an AI Agent**](https://www.nngroup.com/articles/definition-ai-agent/)

### AI Engineering

The work of turning AI models into reliable products: supplying context, designing prompts, connecting tools, evaluating behavior, deploying, monitoring, and adding guardrails. Depending on the team, it may also extend to preparing data and adapting models.

-   See also: [context](#context), [evals](#evals), [prompt engineering](#prompt_engineering), [guardrails](#guardrails)

### AI Slop

Low-quality, mass-produced AI-generated content: text, images, or code that is plausible on the surface but careless, generic, or unverified. Guarding against it with quality bars and human review is a design and governance concern.

-   See also: [hallucination](#Hallucination), [sycophancy](#sycophancy)

### AI Washing

Making false, misleading, or exaggerated claims about whether a product uses AI, how it uses it, or what it can do. It can erode user trust when the capability does not match the claim.

-   See also: [alignment](#alignment), [slop](#slop)
-   Related article: [**“Powered By AI” Is Not a Value Proposition**](https://www.nngroup.com/articles/powered-by-ai-is-not-a-value-proposition/)

### Algorithm

A step-by-step procedure or set of rules for solving a problem or performing a task. In AI, algorithms train models, search for solutions, make predictions, retrieve information, and choose actions.

-   See also: [machine learning](#machine_learning), [model](#model)

### Alignment

The effort to make AI systems behave in accordance with human values, intentions, and ethical guidelines. A central design challenge is making systems that do what users want while avoiding harmful or unintended outcomes.

-   See also: [guardrails](#guardrails), [system prompt](#system_prompt), [RLHF](#RLHF)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Anthropomorphism

Attributing human qualities such as feeling, intent, or humanlike understanding to an AI system because of the way it communicates. It can make a product feel approachable, and it can just as easily lead users to trust the system further than its reliability supports. First-person language, apologies, and other humanlike cues may strengthen the effect, often called the “ELIZA effect” after a 1966 chatbot.

-   See also: [overreliance](#over_reliance), [automation bias](#automation_bias), [sycophancy](#sycophancy)
-   Related article: [**The 4 Degrees of Anthropomorphism of Generative AI**](https://www.nngroup.com/articles/anthropomorphism/)

### Artificial General Intelligence (AGI)

A hypothetical AI with broad, flexible capability across many intellectual tasks. No current system is generally accepted as AGI, and there is no agreed definition or test for it. Today’s general-purpose models handle many tasks, but unevenly.

-   See also: [AI](#AI)

### Artificial Intelligence (AI)

Broadly, any computer system designed to perform tasks that typically require human intelligence, such as learning from examples, recognizing patterns, understanding language, or making decisions. Also, the subfield of computer science concerned with researching and developing tools that enable computers to act “intelligently.”

-   See also: [machine learning](#machine_learning), [model](#model)
-   Related article: [**How AI Works and How Users Think About It: Study Guide**](https://www.nngroup.com/articles/ai-functionality-study-guide/)

### Automation Bias

The tendency to favor an automated system’s output and to scrutinize it less than you would a person’s, even when it is wrong. Automation bias is one form of overreliance; overreliance is broader and can arise without automation-specific bias. Introducing friction at high-stakes moments and providing easy ways for users to verify or override a result help prevent automation bias.

-   See also: [grounding](#grounding), [sycophancy](#sycophancy), [overreliance](#over_reliance), [human-in-the-loop](#human_in_the_loop)
-   Related article: [**AI Chatbots Discourage Error Checking**](https://www.nngroup.com/articles/ai-chatbots-discourage-error-checking/)

### Bias

Systematic skew in data, models, outputs, organizational processes, or human use, particularly skew that unfairly disadvantages certain people, groups, or viewpoints. Bias can enter at any stage of an AI system’s lifecycle. Testing can reveal it, though no test establishes that a system is free of it; addressing it may require changes to the data, the model, the product, or the process around them.

-   See also: [training data](#training_data), [dataset](#dataset), [alignment](#alignment), [evals](#evals)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Chain-of-Thought Prompting

A prompting technique that uses an instruction or worked examples to prompt a sequence of intermediate reasoning steps before a final answer. It can improve performance on many multistep tasks, but the generated steps are not guaranteed to faithfully explain how the model arrived at its answer.

-   See also: [prompt](#prompt), [reasoning model](#reasoning_model), [inference](#inference)

### Compute

The amount of computation required to complete a task, often measured in operations such as floating-point operations (FLOPs).

-   See also: [GPU](#GPU), [latency](#latency)

### Context

Everything supplied or made available to a model for a single request: the prompt, the system prompt, selected conversation history, retrieved documents, stored memory, and the results of any tools it has called. In most current assistant products, the surrounding application or service stores conversational state and supplies or references it when relevant. Context is what is available for one request; memory is retained information that may later become part of that context. Choosing deliberately what goes into the context is sometimes called context engineering.

-   See also: [context window](#context_window), [prompt](#prompt), [system prompt](#system_prompt), [RAG](#RAG), [memory](#memory)
-   Related article: [**Context Architecture**](https://www.nngroup.com/articles/context-architecture/)

### Context Window

The maximum amount of tokenized information a model can take into account at once. It is usually not just the user’s text: conversation history, retrieved documents, tool results, images, and some or all of the generated response are typically counted against it. A large window lets a model reference more, though not everything in a long window influences the answer equally.

-   See also: [token](#token), [inference](#inference)

### Dataset

A collection of examples used to train or evaluate an AI model. Datasets are the foundation of machine learning; model quality depends heavily on the quality, size, and representativeness of its data.

-   See also: [training data](#training_data), [synthetic data](#synthetic_data)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Deep Learning

An approach to machine learning that uses networks with many computational layers, and is often used for learning complex tasks. Deep learning underlies most current generative language models and many modern computer- vision systems.

-   See also: [neural networks](#neural_networks), [machine learning](#machine_learning)

### Embedding

A numerical vector representation of text, images, or other data that captures semantic meaning in a form that machines can process. Semantic embeddings often place related items, such as “king” and “queen,” near one another in a multidimensional space.

-   See also: [neural networks](#neural_networks), [RAG](#RAG)
-   Related article: [**How Do Generative AI Systems Work?**](https://www.nngroup.com/articles/how-ai-works/)

### Evals (Evaluations)

Repeatable tests that measure whether an AI feature does its job. An eval pairs representative inputs with explicit scoring criteria, which might be reference answers, a rubric, a human-preference judgment, or an automated metric. Evals are how a team tells an improvement from a regression.

-   See also: [bias](#bias), [hallucination](#Hallucination), [overfitting](#overfitting), [training data](#training_data)
-   Related article: [**Demand Accuracy in Your AI Tools**](https://www.nngroup.com/articles/baymard-ai-tool-accuracy/)

### Explainability

How well a system can give a person a meaningful and accurate account of how or why it produced a result. A generated explanation may not accurately reflect the system’s actual process.

-   See also: [grounding](#grounding), [reasoning model](#reasoning_model), [automation bias](#automation_bias)
-   Related article: [**Crafting AI Explanations for Every Role in Your Enterprise**](https://www.nngroup.com/articles/crafting-ai-explanations/)

### Finetuning

Continuing the training of an already trained model on additional data to adapt it for a task, domain, or style. It usually takes less compute than pretraining a comparable model from scratch, and it has to be handled carefully to avoid degrading other capabilities.

-   See also: [compute](#compute), [training data](#training_data), [RLHF](#RLHF), [foundation model](#foundation_model)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Foundation Model

A model trained on broad data at scale that can be adapted to many uses. Foundation models are often large. LLMs are one kind: the same base model can be prompted, finetuned, or extended for many different uses.

-   See also: [model](#model), [LLM](#LLM), [finetuning](#fine_tuning)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Generative AI (GenAI)

AI systems that generate new content (text, images, code, audio) from patterns learned during training, rather than only retrieving or classifying what already exists.

-   See also: [language model](#language_model), [multimodal model](#multimodal)
-   Related article: [**How Do Generative AI Systems Work?**](https://www.nngroup.com/articles/how-ai-works/)

### Generative Pretrained Transformer (GPT)

A family of transformer-based language models originally developed by OpenAI. The name describes the approach: it generates, it is pretrained on broad data, and it uses transformers.

-   See also: [LLM](#LLM), [transformer](#transformer), [foundation model](#foundation_model)
-   Related article: [**How Do Generative AI Systems Work?**](https://www.nngroup.com/articles/how-ai-works/)

### Generative UI (GenUI)

Interfaces whose content, layout, or controls are generated or selected at run time by an AI rather than being entirely fixed in advance. Instead of navigating to a fixed screen, the user describes a need and the system composes a response, often from approved components and rules. GenUI shifts the designer’s work from specifying screens to specifying the components and rules a system may assemble them from.

-   See also: [multimodal model](#multimodal), [prompt](#prompt), [vibe coding](#vibe_coding)
-   Related article: [**Generative UI and Outcome-Oriented Design**](https://www.nngroup.com/articles/generative-ui/)

### Graphics Processing Unit (GPU)

A specialized chip built for the fast, parallel computations required for graphics and video rendering, and now widely used to accelerate both training and inference for artificial-intelligence models. GPU cost and availability affect the cost, latency, and scale of many AI features.

-   See also: [compute](#compute), [inference](#inference), [latency](#latency), [neural networks](#neural_networks)

### Grounding

Connecting an AI’s output to selected source data or documents, so the system answers from that material rather than from training data alone. Grounding can improve factual accuracy, but it does not guarantee that the source is correct or that the model uses it correctly. Showing users those sources is a separate decision: a grounded answer is not automatically a transparent one.

-   See also: [hallucination](#Hallucination), [RAG](#RAG)
-   Related article: [**Context Architecture**](https://www.nngroup.com/articles/context-architecture/)

### Guardrails

Checks and constraints built into an AI system to reduce harmful, off-topic, or unauthorized output. Guardrails lower risk, but they can also fail or be circumvented.

-   See also: [alignment](#alignment), [system prompt](#system_prompt), [prompt injection](#prompt_injection)
-   Related article: [**Context Architecture**](https://www.nngroup.com/articles/context-architecture/)

### Hallucination

Plausible but factually incorrect or nonsensical AI output. Language models can hallucinate because they generate statistically likely continuations rather than verify each claim; errors in training or retrieved data can also produce false outputs. Grounding and RAG help reduce them.

-   See also: [grounding](#grounding), [RAG](#RAG)
-   Related article: [**AI Hallucinations: What Designers Need to Know**](https://www.nngroup.com/articles/ai-hallucinations/)

### Human-in-the-Loop

A design pattern that puts a person in position to review, approve, correct, or monitor an AI’s output. It is one common control for high-stakes automation, and it counts as oversight only when the reviewer has the information, time, expertise, and authority to intervene. A confirmation step users click through without reading adds delay instead.

-   See also: [overreliance](#over_reliance), [automation bias](#automation_bias), [agent](#agent), [guardrails](#guardrails)
-   Related article: [**AI Chatbots Discourage Error Checking**](https://www.nngroup.com/articles/ai-chatbots-discourage-error-checking/)

### Inference

The process by which a trained model generates outputs in response to new inputs. During inference, the model applies the patterns it learned in training to produce predictions, completions, or answers.

-   See also: [training data](#training_data), [latency](#latency)
-   Related article: [**How Do Generative AI Systems Work?**](https://www.nngroup.com/articles/how-ai-works/)

### Knowledge Cutoff

A provider-reported date indicating the approximate recency of a model’s training data. It is not a hard boundary: coverage before the date can be uneven, and some later information may appear. More-recent information generally has to be supplied in the prompt or retrieved when the model runs.

-   See also: [training data](#training_data), [RAG](#RAG), [hallucination](#Hallucination), [context](#context)

### Language Model

An AI model trained on large amounts of text to represent and predict patterns in language. Many current generative language models work by predicting the next token in a sequence. Language models are the foundation of most modern AI assistants and chatbots.

-   See also: [LLM](#LLM), [token](#token)
-   Related article: [**How Do Generative AI Systems Work?**](https://www.nngroup.com/articles/how-ai-works/)

### Large Language Model (LLM)

A language model trained at very large scale, typically with billions of parameters and vast amounts of text. There is no agreed threshold at which a language model becomes “large.” Examples include the GPT models from OpenAI, Claude from Anthropic, and Gemini from Google, though those names also get used for products.

-   See also: [language model](#language_model), [foundation model](#foundation_model), [model](#model)
-   Related article: [**How Do Generative AI Systems Work?**](https://www.nngroup.com/articles/how-ai-works/)

### Latency

The delay between when a user submits an input and when they receive a response. Lower latency makes an experience feel more responsive. Latency depends on the model and hardware, network and queueing delays, system load, input and output length, and whether it is measured to the first output or the completed response.

-   See also: [inference](#inference), [reasoning model](#reasoning_model)
-   Related article: [**Response Times: The 3 Important Limits**](https://www.nngroup.com/articles/response-times-3-important-limits/)

### Machine Learning

An approach to building software in which systems learn from data instead of following rules provided by people. A machine-learning system is trained on examples and generalizes from them, so it can respond to inputs it has never seen before. Learned components can still be combined with rules written by programmers. Note that machine learning does not necessarily mean that a system learns from the interactions that people have with it. In most products, learning happens during training, before release.

-   See also: [supervised learning](#supervised_learning), [unsupervised learning](#unsupervised_learning), [training data](#training_data)
-   Related article: [**Can Users Understand Recommendations Driven by Machine Learning?**](https://www.nngroup.com/articles/machine-learning-ux/)

### Memory

Information an AI product carries forward in subsequent interactions with a user. Conversation, or short-term, memory retains recent interaction within a session; long-term memory consists of information stored across sessions and retrieved when relevant. In most current assistants, the surrounding product or service stores this information and supplies it when relevant.

-   See also: [context](#context), [context window](#context_window), [RAG](#RAG)
-   Related article: [**Context Architecture**](https://www.nngroup.com/articles/context-architecture/)

### Model

An approximate representation of a natural phenomenon or concept. Two notable types of models are mathematical or software-based. Models are used to describe behavior or events. The model is usually just one part of an LLM product. The system around it supplies the instructions, data, tools, memory, interface, and safeguards that turn raw output into something a person can use.

-   See also: [language model](#language_model), [neural networks](#neural_networks)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Model Context Protocol (MCP)

An open standard for connecting an AI application to external tools, data, and reusable prompts. An external service can implement MCP once and work with multiple applications that support the standard. The service and application implement MCP, not the model; they still control which capabilities and permissions are available.

-   See also: [tool use](#tool_use), [agentic AI](#agentic_ai)

### Multimodal Model

A model whose inputs, outputs, or both include more than one type of data, such as text, images, audio, or video. Many systems accept multimodal inputs (e.g., text and images) while producing only text.

-   See also: [generative AI](#genAI)

### Multishot Prompting (Few-Shot Prompting)

Prompts that provide several worked examples, usually input-and-output pairs, to guide a model in producing outputs with a particular structure. Well-chosen examples improve performance, but more is not reliably better: irrelevant, unbalanced, or badly ordered examples can make results worse. These are contrasted with one-shot prompting (a prompt with exactly one example) or zero-shot prompts.

-   See also: [prompt](#prompt), [zero-shot prompting](#zero-shot_prompting), [prompt engineering](#prompt_engineering)

### Natural Language Processing (NLP)

A subfield of computer science dedicated to developing algorithms and systems that process, analyze, and generate human language.

-   See also: [language model](#language_model), [LLM](#LLM)

### Neural Networks

A class of machine-learning models consisting of one or more layers of interconnected computational nodes. The name and the early inspiration come from biological neurons, but a neural network is not a simulation of a nervous system.

-   See also: [deep learning](#deep_learning), [embedding](#embedding)
-   Related article: [**How Do Generative AI Systems Work?**](https://www.nngroup.com/articles/how-ai-works/)

### One-Shot Prompting (Single-Shot Prompting)

A prompt that includes exactly one worked example of the task or desired answer. That example can help the model follow the intended format or pattern.

-   See also: [prompt](#prompt), [multi-shot prompting](#multi-shot_prompting), [zero-shot prompting](#zero-shot_prompting)

### Overfitting

A model that has been trained so closely to its set of training data that it performs markedly worse on new, unseen data than its training scores suggest. Finetuning can overfit a model to its specialized dataset.

-   See also: [training data](#training_data), [finetuning](#fine_tuning), [evals](#evals), [model](#model)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Overreliance

A pattern of use in which someone gives an AI more authority than its reliability or the stakes justify. It can follow from automation bias, from weak support for verification, from time pressure, or from simple misplaced trust.

-   See also: [automation bias](#automation_bias), [grounding](#grounding)
-   Related article: [**AI Chatbots Discourage Error Checking**](https://www.nngroup.com/articles/ai-chatbots-discourage-error-checking/)

### Parameter

One of the numeric values a model learns during training; the number of them is a rough proxy for a model’s size. In API documentation, the word can also mean a setting, such as temperature, chosen when calling a model; that is distinct from a learned model parameter. Learned parameters remain fixed during inference; call-time settings can be specified separately for each request.

-   See also: [model](#model), [LLM](#LLM), [SLM](#SLM), [temperature](#temperature), [training data](#training_data)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Probabilistic Model

A model that assigns a probability to each possible outcome rather than committing to a single definite answer. For example, a language model that generates text one word at a time assigns a probability to every word that could come next. The software around the model then decides what to do with those probabilities: pick the most probable word, choose randomly, or use another strategy, so the same input can sometimes produce different results.

-   See also: [model](#model), [language model](#language_model), [temperature](#temperature)
-   Related article: [**How Do Generative AI Systems Work?**](https://www.nngroup.com/articles/how-ai-works/)

### Prompt

The input (usually text) supplied to an AI system to get a response. It usually comes from the user, but application-level instructions such as a system prompt are prompts, too.

-   See also: [prompt engineering](#prompt_engineering), [system prompt](#system_prompt)
-   Related article: [**CARE: Structure for Crafting AI Prompts**](https://www.nngroup.com/articles/careful-prompts/)

### Prompt Engineering

The practice of designing and refining prompts to get more reliable, accurate, or useful output from a model. Common techniques include supplying relevant context and examples, stating constraints, and specifying the output format. Asking a model to review its own result is unreliable without external feedback and can sometimes make reasoning performance worse.

-   See also: [prompt](#prompt), [chain-of-thought prompting](#chain_of_thought), [zero-shot prompting](#zero-shot_prompting)
-   Related article: [**Why Vague Prompts Fail and How to Fix Them**](https://www.nngroup.com/articles/vague-prototyping/)

### Prompt Injection

An attack in which instructions to an LLM are inserted into content that the system reads (e.g., a user prompt, a web page, a document). This type of attack attempts to make an AI system break its own rules, leak information, or misuse its tools. It is a leading security concern for any system that uses tools or reads outside data.

-   See also: [guardrails](#guardrails), [system prompt](#system_prompt), [tool use](#tool_use)

### Reasoning Model

A model trained or configured to spend extra computation before it answers, working through intermediate steps that are often hidden from the user. Reasoning can improve results on complex, multistep problems, usually at the cost of speed.

-   See also: [chain-of-thought prompting](#chain_of_thought), [inference](#inference), [latency](#latency)
-   Related article: [**Explainable AI in Chat Interfaces**](https://www.nngroup.com/articles/explainable-ai/)

### Reinforcement Learning from Human Feedback (RLHF)

A training technique in which people compare model outputs and those preferences are used to tune the model. RLHF is one of several methods for pushing a model toward being helpful, harmless, and honest. It optimizes toward measured preferences, which is not the same as guaranteeing those properties.

-   See also: [alignment](#alignment), [finetuning](#fine_tuning), [sycophancy](#sycophancy)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Retrieval-Augmented Generation (RAG)

An approach in which a system retrieves relevant information from a chosen source, such as product documentation or a database, and gives it to the model, which then uses it to generate an answer. It exists because the model’s built-in knowledge is fixed at the time it is trained and may not include private, proprietary, or recent information. The surrounding system usually handles retrieval, though an agent may help choose what to search for. Answer quality depends on both the retrieved material and how accurately the model uses it.

-   See also: [grounding](#grounding), [hallucination](#Hallucination), [embedding](#embedding)

### Small Language Model (SLM)

A category of language models with far fewer parameters than an LLM, sometimes matching much larger models on the narrower range of tasks they are built for. SLMs are typically developed for deployment on local devices such as laptops or smartphones, or for contexts that require rapid response times. As with LLMs, there is no agreed parameter threshold, and how fast an SLM runs depends on architecture and hardware.

-   See also: [LLM](#LLM), [model](#model), [latency](#latency)

### Supervised Learning

A method of model training with labeled data, such as question/answer pairs, emails labeled “spam” or “not spam,” houses paired with their sale prices, or pictures with descriptive labels.

-   See also: [machine learning](#machine_learning), [unsupervised learning](#unsupervised_learning), [training data](#training_data)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Sycophancy

Instances in which an AI model adapts responses to align with the user’s views, even when doing so makes the answer less accurate or useful. This behavior is generally undesirable.

-   See also: [alignment](#alignment), [guardrails](#guardrails), [automation bias](#automation_bias)
-   Related article: [**Sycophancy in Generative-AI Chatbots**](https://www.nngroup.com/articles/sycophancy-generative-ai-chatbots/)

### Synthetic Data

Data that is artificially generated rather than collected from the real world. Synthetic data can augment training sets, protect privacy, or create examples of rare scenarios.

-   See also: [training data](#training_data), [dataset](#dataset)
-   Related article: [**Synthetic Users: If, When, and How to Use AI-Generated “Research”**](https://www.nngroup.com/articles/synthetic-users/)

### System Prompt

Background instructions that shape how an AI model behaves and responds. A system prompt might define the model’s role, tone, or constraints. Users see the model’s responses but typically not the system prompt directing them.

-   See also: [prompt](#prompt), [alignment](#alignment), [guardrails](#guardrails)
-   Related article: [**Context Architecture**](https://www.nngroup.com/articles/context-architecture/)

### Temperature

A setting that controls how much a model’s output varies. Low temperature (close to 0) concentrates the choice on the likeliest tokens, making responses more repeatable and focused; higher temperature spreads it wider, making them more varied. Even at 0 temperature, the system’s output for a given input is not guaranteed to be identical every time.

-   See also: [probabilistic model](#probabilistic_model), [inference](#inference)

### Token

The basic unit of data that a language model processes. In text, a token may be a character, part of a word, or a whole word (e.g., “cat” is a single token but “unbelievable” may be 3 tokens), so token counts do not match word counts. Model limits and provider pricing are often measured in tokens; what counts and how it is billed vary and may include input, output, cached, or internal reasoning tokens.

-   See also: [context window](#context_window), [language model](#language_model)

### Tool Use (Function Calling)

The ability of an AI system to act outside the conversation. When given tools, a model can request an action such as retrieving data, running a calculation, or sending a message; the surrounding application decides whether to carry the request out, then hands back the result.

-   See also: [agent](#agent), [agentic AI](#agentic_ai), [MCP](#MCP)
-   Related article: [**Context Architecture**](https://www.nngroup.com/articles/context-architecture/)

### Training Data

The collection of examples a model learns from during training. The range, quality, and biases of the training data shape what the model can do and where it falls short.

-   See also: [dataset](#dataset), [inference](#inference), [synthetic data](#synthetic_data)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Transformer

The deep-learning architecture behind most current language models. Its attention mechanism helps the model relate different parts of an input to each other. It can also process entire sequences in parallel during training, which is a major reason transformers can be trained efficiently on very large text collections.

-   See also: [neural networks](#neural_networks), [deep learning](#deep_learning), [LLM](#LLM), [GPT](#GPT)
-   Related article: [**How Do Generative AI Systems Work?**](https://www.nngroup.com/articles/how-ai-works/)

### Turing Test

A test proposed by Alan Turing in which a human evaluator exchanges text with an unseen human and machine, then judges which is which. It tests whether the machine can imitate human conversation convincingly in that setting; passing does not establish general intelligence or understanding.

-   See also: [artificial intelligence](#AI), [artificial general intelligence](#AGI)

### Unsupervised Learning

A method of model training that does not use labeled examples for identifying patterns in training data. For example, the model might cluster similar documents without being told what the categories are.

-   See also: [machine learning](#machine_learning), [supervised learning](#supervised_learning), [training data](#training_data)
-   Related article: [**How AI Models Are Trained**](https://www.nngroup.com/articles/ai-model-training/)

### Vibe Coding

A method of building software in which the user describes what they want in natural language and lets an AI generate and iterate on the code, often without reading closely everything it produces. It shortens the path from idea to working prototype and lets people build software with less direct coding.

-   See also: [tool use](#tool_use), [agent](#agent), [AI slop](#slop)
-   Related article: [**GenUI vs. Vibe Coding: Who’s Designing?**](https://www.nngroup.com/articles/genui-vs-vibe/)

### Zero-Shot Prompting

Using a prompt that does not contain examples of the desired answer. The prompt can still carry instructions, background, and source material; what is missing is a worked example. For instance, “Summarize this article” with no sample summary attached.

-   See also: [prompt](#prompt), [multi-shot prompting](#multi-shot_prompting), [prompt engineering](#prompt_engineering)