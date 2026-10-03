---
title: "Jev for Python engineers"
source: "https://vercel.com/blog/jev-for-python-engineers"
publishedDate: "2026-10-02"
category: "frontend"
feedName: "Vercel"
author: "Yury Selivanov"
---

It's simply impossible to not hear about Jev. Seemingly everyone is tinkering with it in some way, from using it to [make trading decisions](https://x.com/MoonGotchi/status/2101320141065609294?s=20) _(what could possibly go wrong?)_ to [generating UIs with it](https://x.com/ctatedev/status/2101022101750571357?s=20) _(maybe we're onto something here!)_.

[Jev](https://vercel.com/ai-gateway/models/jev) is a new kind of AI model. You feed it data and ask it a set of multiple-choice questions, and it responds with its answers and how confident it is in each. Just like with any other model, Jev can and will make mistakes, but it will make them fast. ​

​The bottom line is: Jev is built for making narrow decisions. Whether it's accurate _enough_ for your use cases is something you'll need to test.

The job of the Python team at Vercel is to make it easy for Python devs to tinker with Jev, among a few other things. So please welcome the latest release of the [AI SDK for Python](https://ai-python.dev/).

Install it with `uv add ai` to use the new experimental `evaluate()` API, which talks directly to Jev's nervous system. Then create an [AI Gateway key](https://vercel.com/docs/ai-gateway/authentication-and-byok#quick-start), set `AI_GATEWAY_API_KEY`, and try this complete example:

```
import asyncioimport aifrom ai.ops import experimental as jevasync def main():    result = await jev.evaluate(        ai.get_model("typesafe-ai/jev"),        "You're Neil deGrasse Tyson",        {"bigger": jev.ChoiceQuestion(            instructions="Which is bigger, the Sun or the Earth?",            criteria={"Sun": None, "Earth": None},        )},    )    print(result.value["bigger"])if __name__ == "__main__":    asyncio.run(main())
```

Let's start with something Jev can't possibly get wrong.

Now, I'd like to explain what Jev is and how to make it work for you using a couple of examples. One is good and one is dumb. Ask Jev which is which. Let's have some fun!

## [Copy link to heading](#jev-eli5)Jev ELI5

Jev is a universal classifier.

Classifiers are the classic primitive of good old machine learning. Say you want a spam filter. You train a classifier on lots of emails, each labeled as spam or not spam, and it learns to tell whether a freshly incoming email looks like spam.

Problem is, for every new classification task you'd have to collect and label new data, and then train a new classifier on it to tune its weights for that task. But you know what else has weights? Large language models! So the team behind Jev figured out how to turn an LLM into a classifier that you don't need to train for a specific domain, because it's already trained on a broad slice of human knowledge.

And while it started as an LLM, Jev still behaves like a classifier. It's cheap and fast, and it returns structured JSON instead of generating text. Its answers conform to the types and choices you define in your questions.

## [Copy link to heading](#the-api)The API

Jev's [official API](https://docs.typesafe.ai/introduction) couldn't be simpler, and to keep it that way, we implemented it in the Python AI SDK pretty much verbatim.

There's just one function, `evaluate()`, and a few supporting types. The function takes a model, _state_ (can be a simple string or complex JSON), and a mapping of questions. A question is an instance of either `ChoiceQuestion` (choose one answer), `ScoreQuestion` (rate the state on a scale you define), or `NoulQuestion` (estimate the probability that a statement is true).

For the complete API reference, refer your agent to [the docs](https://ai-python.dev/docs/reference/ops#experimentalevaluate). By now, we should have a good idea of what Jev is and how to use it. Time to see what we can build with it!

## [Copy link to heading](#example-1:-python-or-english)Example 1: Python or English?

This is a sensible example of using Jev: quite literally as a classifier.

About a year ago I had an idea to make the Python REPL agentic. I wanted it to have a great UX and thought it would be pretty cool if the REPL could tell whether I'm typing English or Python without me explicitly switching between chat and code.

I needed a classifier, so I spent two days training my own on a random selection of Python code and English text.

After a lot of sweat and dumb Opus 4.1 tokens, I concluded I'm not good enough to make a reliable classifier for Python vs. English. The UI felt jittery: typing `if i` highlighted it as Python, `if i i` switched it to English, and `if i is` flipped it back to Python. What seemed like a very simple problem turned out to be a really hard one.

Let's see how Jev does:

These are actual traces of Jev responses to "does this look like English or Python to you?" The code behind them isn't particularly interesting; it's basically the opening code snippet of this post with a different question.

What's more interesting is whether Jev could solve my REPL problem. And while it does seem to fare much better than my hand-rolled classifier did, it still has gaps. For example, `"what's" + " up` looks like English to Jev, while it's quite obvious to me that it's a partially typed Python expression.

## [Copy link to heading](#example-2:-jev-writes-python-code)Example 2: Jev writes Python code

How about we regress and make Jev generate text like an LLM? Jev can't write, so one way to get it to type is to have it go letter by letter. At each step, it picks the next character from a set of letters, punctuation, and whitespace. [Another way](https://x.com/hi_im_isaac_/status/2100408276949385668) would be to pick one word at a time from a vocabulary of some `N` English words.

When I saw that, I immediately knew I had to test how good Jev is at writing Python code.

My first attempt used the "letters + Python keywords + whitespace" method, but I quickly realized Jev could barely type an `if` statement that way. The only way to get anything sensible out of it was to make it generate an abstract syntax tree (AST) of the program instead.

The idea:

1.  Take the user's prompt and use an LLM (GPT-5.6 in this case) to expand it into a concrete set of instructions for Jev. I found that without a detailed "plan", Jev struggles to implement even elementary tasks.
    
2.  Make Jev build a Python AST through a series of choices. At each step, show it the current program, mark the field being filled, and offer the possible next nodes, like a function call, an arithmetic operation, or a variable. Each option comes with a preview of the code it would produce.
    
3.  Apply each choice to the tree and render it back into Python. The host code handles punctuation and indentation; Jev decides the program's overall structure and contents. Repeat until Jev finishes the tree.
    

I did get Jev to generate syntactically valid (yet still mostly incorrect) Python code using this approach. But as you can see, making classifiers do the job of an LLM is quite challenging. The source code is [on GitHub](https://github.com/vercel-labs/ai-python/blob/main/examples/models/gateway/jev_python_ast.py) if you think you can do better.

## [Copy link to heading](#try-jev)Try Jev

Neither experiment worked quite as I'd hoped, but I'm still excited about Jev. We're only beginning to explore what this new class of models can do!

Try it today with the [AI SDK for Python](https://ai-python.dev/) and let us know what you build. All you need is `uv add ai` and an [AI Gateway key](https://vercel.com/docs/ai-gateway). Here's a ready to copy/paste prompt for your coding agent: