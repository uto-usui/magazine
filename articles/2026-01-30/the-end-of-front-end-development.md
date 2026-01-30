---
title: "The End of Front-End Development"
source: "https://www.joshwcomeau.com/blog/the-end-of-frontend-development/"
publishedDate: "2023-03-20"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

Over the past few months, I've spoken with lots of early-career devs who are getting more and more anxious about AI. They've seen the increasingly-impressive demos from tools like GPT-4, and they worry that by the time they're fluent in HTML/CSS/JS, there won't be any jobs left for them.

This sentiment is all over social media right now:

![Screenshot of tweet: Anyone who only has a frontend skillset should diversify their skillset immediately because their job won’t exist soon.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fthe-end-of-frontend-development%2Fno-more-frontend-devs.png&w=828&q=75)

**I couldn't disagree more.** I don't think front-end developer jobs are going anywhere. And I'm getting pretty sick of the Fear, Uncertainty, and Doubt being spread online.

So, in this blog post, I'm going to share my hypothesis for what will happen. Things _are_ going to change, but not in the scary way people are saying.

## [Link to this heading](#here-we-go-again-1)Here we go again

The CSS language was first released in 1996, in Internet Explorer 3. Within 2 years, the first "no code" website builder, Homestead, had launched.

Homestead allowed people to build custom web pages without writing a single line of code:

![Screenshot of website building software from 20+ years ago](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fthe-end-of-frontend-development%2Fhomestead.jpg&w=1080&q=75)

Pretty much since the beginning, there's been a concern that web developers would be made redundant by some new technology. In the 2000s, it was WordPress. In the 2010s, it was Webflow. In the early 2020s, it was "no code" tools.

And, in a way, web developers _have_ been made obsolete! These days, if a local bakery or a dentist or an artist needs a website, they're probably not hiring a developer and paying them tens of thousands of dollars to build something from scratch. They'll hop onto SquareSpace, find a template they like, and spend $20/month.

And yet, web developers continue to exist.

Last week, OpenAI did a [showcase of GPT-4(opens in new tab)](https://www.youtube.com/watch?v=outcGtbnMuQ). This featured a pretty impressive demo: GPT-4 can take a hand-drawn sketch of a website, and turn it into fully-functional website, including a bit of JS to wire up the “Reveal Punchline” button.

![Sketch of a website that displays a joke](https://www.joshwcomeau.com/images/the-end-of-frontend-development/gpt-4-sketch.png)![HTML website that matches the sketch](https://www.joshwcomeau.com/images/the-end-of-frontend-development/gpt-4-result.png)

This is remarkable, and I think it has a lot of potential when it comes to prototyping… **But let's be clear:** we haven't needed web developers to build these sorts of pages _in decades._ There is an _enormous_ difference between this HTML document and the sorts of code front-end developers write today.

## [Link to this heading](#looking-into-the-future-2)Looking into the future

Most of the demos I've seen so far are pretty limited in scope: a simple HTML page, or a single JavaScript function. The sorts of things a single developer could do in an afternoon.

But these are the early days! If things continue to accelerate at the same rate, it'll be able to build entire applications in a couple years, right?

I'm far from an expert when it comes to Large Language Models, the machine learning models that power tools like GPT-4, but I do understand how they work at a high level.

Fundamentally, LLMs are super-powerful text predictors. Given a prompt, they use machine learning to try and come up with the most likely set of characters that follow the prompt.

Companies like OpenAI spend a _ton_ of time and energy tweaking the models to improve the output. An army of human labelers “grade” the model's output, and the model learns and evolves.

If you've experimented with tools like Chat GPT or Bing's AI-powered search, you've probably noticed that the responses are maybe 80% correct, but they're said with absolute and unshakeable confidence.

LLMs aren't able to validate their assumptions, or test their hypotheses. They can't confirm whether what they're saying is true or not. They're playing a probability game, and estimating that this string of characters seems to be compatible with the string of characters from the prompt.

Sometimes, parts of that response are nonsensical. The OpenAI team refers to these as “hallucinations”.

As the technology improves, we can expect some of the rough edges to be sanded down, but fundamentally, there will always be some level of inaccuracy. These tools just don't have any mechanism to objectively validate their responses.

And so, the accuracy will improve, but it'll never be perfect. And that's a problem, if we're talking about making web developers obsolete. If you're not a programmer, you _won't be able to tell_ which parts are accurate or not. You won't be able to spot the hallucinations.

But wait, in the GPT-4 demo, we saw how the AI can fix itself! Copy/paste the error message, and it'll find and fix the problem.

But hm, not all hallucinations will lead to explicit errors. For example, I recently used GPT-4 to generate a `<Modal>` component using React, and while the output _was_ surprisingly good, it still made a few accessibility mistakes. The person creating the app might not notice these problems, but the end users sure will!

Accessibility is just one example. What about security vulnerabilities in the code? Who is liable when things go horribly wrong?

One more point: there is an _enormous_ difference between generating a 50-line HTML document and spitting out a production-ready web application. A _small_ JS app like this blog has ~65k lines of code, across 900+ files. That doesn't include the written content, only the TypeScript/JavaScript.

Even with 95% accuracy rate, this would be _incredibly_ difficult to debug. It would be like a developer spending _months_ building a huge project, without _ever_ actually trying to run any of the code, until it was 100% finished. This is the stuff of nightmares.

AI isn't magic. It's only as good as its training data. Code _snippets_ are all over the internet, and are often generic. By contrast, every code_base_ is unique. There are very few large open-source codebases. How's the AI supposed to learn how to build big real-world projects?

We're very quickly reaching the point where non-developers can sit down with a chatbot and crank out a small self-contained project, the sort of thing that folks currently use tools like Webflow to build. And that's awesome!

But I think we're still a _very long way_ from major tech companies letting go of their developer staff and replacing them with prompt engineers. It seems to me like there are several potentially-unsolveable problems that stand in the way of this becoming a reality.

## [Link to this heading](#augmenting-not-replacing-3)Augmenting, not replacing

You might not know it from this article, but I'm actually pretty optimistic about AI. 😅

I think the most likely scenario is that tools like GPT-4 become integrated into developer tooling, and used to amplify what a skilled developer can do.

Carpenters weren't replaced by power tools, accountants weren't replaced by spreadsheets, photographers weren't replaced by digital cameras / smartphonesBelieve it or not, the number of professional photographers has been _increasing_ year over year. The US Bureau of Labor Statistics expects the number of jobs to increase 9% year-over-year for the next decade. For context, the average across all industries is 5%., and I don't think that developers will be replaced by LLMs.

I did wonder if maybe the total number of developer jobs will go down; after all, if each developer is significantly more effective, won't we need less of them??

Not necessarily. As it stands, there's _way_ more demand than supply for software developers. At every company I've worked at, we had _tons_ of stuff we wanted to do, but we were constrained by the number of developers we had.

What would happen if developers suddenly became 2x more productive? More bugs would be fixed, more features would be shipped, more profit would be made. There's no shortage of stuff to build, and so it's not like we'd run out of work for the devs to do.

I actually think that this could _increase_ the total # of developer jobs.

Today, there are _so many_ companies that don't hire software developers at all. I used to work for a company called Konrad Group, an agency that builds web applications for other companies, many of them household names. Because the cost of development is so high, it makes more sense for them to contract out their development needs, rather than hire developers in-house.

Those Fortune 500 companies are doing the math based on the current cost of software development. Let's make up some numbers: suppose they need 4 developers at $150k each, for $600k/year. It makes more sense for them to pay an agency $500k to manage this for them. But if LLMs really do amplify developer productivity, they might be able to hire 2 devs at $150k each, to do the same amount of work. All of a sudden, the math is much more attractive!

Economists have a term for when this happens: the [Jevons Paradox(opens in new tab)](https://en.wikipedia.org/wiki/Jevons_paradox). It goes all the way back to 1865! Thanks to Tim Grant for letting me know about this.

**Let me be clear:** I'm not an economist, and this is all wild speculation. I'm not saying that I know it'll shake out this way for a fact. What I'm saying is that it's not a foregone conclusion that this will be _bad_ for software developers. Nobody knows how this will shake out, and I'm getting a bit tired of people acting like the worst-case scenario is a Something that has already been done

## [Link to this heading](#were-not-the-only-ones-having-this-conversation-4)We're not the only ones having this conversation

Aaron Blaise is a veteran animator and illustrator. He worked at Disney for almost 20 years, contributing to classic Disney films like Beauty and the Beast (1991), Aladdin (1992), Pocahontas (1995), and others.

A couple weeks ago, he published a video on YouTube: [Disney animator reacts to AI animation(opens in new tab)](https://www.youtube.com/watch?v=xm7BwEsdVbQ). After reading this blog post, his take will sound familiar to you: he doesn't see these tools as a threat, he sees them as something that will increase animator productivity, and lead to _more_ animator jobs.

Artists and knowledge workers across dozens of industries are having the same conversation right now. People are worried that their job is about to be gobbled up by AIs like GPT-4, DALL-E 2, and Midjourney.

GPT-4 can pass a simulated An exam that aspiring lawyers take. They must pass to be granted a license to practice law with a score in the top 10% of test-takers. Lots of lawyers are having [these exact same discussions(opens in new tab)](https://today.tamu.edu/2023/02/09/will-ai-put-lawyers-out-of-work-a-texas-am-expert-says-its-unlikely/).

My personal belief is that for the most part, working professionals will find ways to integrate this technology into their workflows, increasing their productivity and value. Certain _tasks_ might be delegated to an AI, but not many _jobs_.

But what if I'm wrong, and it turns out that LLMs can totally replace software developers? If that's the case, I suspect LLMs will replace a _huge majority_ of knowledge workers.

This isn't the sort of tsunami you'll be able to avoid by switching to a different discipline. There is no higher ground. And so, instead of trying to gamble on what the future might bring, why not focus on what you're passionate about, what you're interested in, what you're good at?

## [Link to this heading](#using-llms-to-help-you-learn-5)Using LLMs to help you learn

I've heard from a few folks who have said that [ChatGPT(opens in new tab)](https://chat.openai.com/chat) has been really helpful when it comes to learning technical skills. If you're confused by something in a tutorial, you can ask the AI to explain it to you!

This is a really interesting use case to me. Essentially, ChatGPT is like a pair programmer, someone who can help you make sense of things you don't understand. You can ask it specific questions and get specific answers.

**But I do think you need to be careful.** There's a right way and a wrong way to use tools like this to help you learn.

The _wrong_ way would be to treat it like GPS navigation. When I have to drive somewhere, I pop the address into my GPS, and follow its instructions indiscriminately. I do generally wind up where I need to go, but it requires 0 mental effort on my part. As a result, my sense of direction has totally atrophied. I can't go anywhere now without a synthesized voice telling me where to turn. 😬

Instead of treating it like a GPS, I'd suggest treating it like you're a member of a jury, and the LLM is a witness called by the prosecutor, taking the stand.

You'll listen to what they have to say, but you won't accept it as fact. You'll be skeptical, and think critically about every word.

Instead of blindly copy/pasting the code that ChatGPT generates, go through it line-by-line, and make sure you understand. Ask it for clarification. And double-check things that seem suspicious with an authoritative source (eg. the official documentation). Keep in mind that LLMs are 100% confident, but not 100% accurate.

If you follow this strategy, I think LLMs can offer a lot of value. 😄

## [Link to this heading](#a-message-to-aspiring-developers-6)A message to aspiring developers

The reason I wanted to write this blog post was specifically to address folks who are in the process of learning web development and who are feeling anxious and despondent, like there's no point spending all of this time/energy building these skills when the whole field is about to be made obsolete.

I can't promise that things will stay exactly the same. I do suspect that AI will have an impact on how we work. I started tinkering with HTML/CSS/JS back in 2007, and things have changed _so much_ since then. Developers have always had to be adaptable, to evolve alongside technology.

But so far, nothing I've seen suggests that our jobs are at risk. I've tried to imagine what it would look like, if non-developers were able to build entire web applications without understanding web technologies, and I come up with so many reasons why it wouldn't work, even if future iterations of GPT don't hallucinate as much.

I could be wrong. I don't have a crystal ball 🔮. For all I know, the sun might explode tomorrow. But I truly don't believe that we're on the cusp of web developers being made obsolete. And I worry that many would-be developers are taking their foot off the gas for no reason.

I don't want you to look back in 5 years, if software developers are _even more in-demand_, and regret that you stopped pursuing your dreams. ❤️

### Last updated on

July 24th, 2025