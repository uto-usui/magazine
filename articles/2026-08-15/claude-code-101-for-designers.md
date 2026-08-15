---
title: "Claude Code 101, for designers"
source: "https://yaronschoen.com/blog/claude-code-101-for-designers/"
publishedDate: "2026-08-14"
category: "design"
feedName: "Sidebar"
---

August 10, 2026

I am _very_ excited about AI tools. There, I said it. I'd even say that I haven't been this excited about tech in easily over a decade (maybe even two decades??). Since I started my career I have been designing products inside photo editing tools or derivatives of them, paintings of the real thing, always dependent on an engineer to build what I drew. Not anymore. At work I design straight in the repo, and at home I've built and shipped several tools myself. I wrote about that shift in [Drawing With Words](https://yaronschoen.com/blog/drawing-with-words/); the short version is that it's a golden age for product designers.

I also understand and agree that change can be hard. I'll admit I had a head start though, since my dad was a computer science professor at NYU who got into AI very early and used to blab about it to me almost daily. I also spent a chunk of my childhood using MS-DOS. I'm no coding expert, but none of this is exactly foreign to me either. That said, for plenty of designers it _is_ foreign, and that's okay. That's actually the point of this series… helping product designers make the transition to designing with AI tools. Claude is my LLM of choice, so Claude is what I'll use, but most of what's here translates to other LLMs and AI tools just fine.

Which gives post one an obvious job: explain what Claude Code actually is, and while we're at it, decode the jargon that surrounds it. Agents, tokens, context windows, MCP: the words fly around every AI conversation at work, and they make the whole subject feel more technical than it is.

So here's the map. Every definition below is a couple of sentences, on purpose. Nothing to install, no homework. The deeper dives come later in the series; today we just learn the words.

### Large language model

The engine under all of this. It's an AI trained on a staggering amount of text until it became very good at one trick, predicting what words should come next. Do that trick well enough and it starts to look like conversation, writing, thinking, code. ChatGPT, Gemini, and Claude are all LLMs wearing different products.

### Claude

Claude is the AI made by Anthropic, the one you've probably already met as an app or a website: a chat box you type into, an answer typed back. In that form it's a conversation in a box: it can tell you things, but it can't really do things.

### Claude Code

Claude Code is Claude, but with the inclination to code. The same brain, installed on your computer, where it can create files, edit them, run them, and look at the results. Chat Claude can describe a prototype and perhaps build an artifact. Claude Code builds entire apps and more. Despite the name, code is just one of its talents. It will happily rename five hundred files, resize a folder of images, or draft your case study.

### It lives in the terminal

Claude Code runs inside the terminal (a full tour of which is the next post), and it always works from inside a folder: whatever folder you start it in becomes its workspace.

### But the terminal can live inside an app

If the raw terminal isn't your thing, it doesn't have to be a standalone window. Code editors like VS Code come with a terminal built in, and apps like [Rigadigdig](https://rigadigdig.com/) or even [Denote](https://github.com/yarcom/denote-releases/releases/latest) dress the whole experience up in friendlier clothing (full disclosure: those two tools are mine). Same engine, different outfit.

### It's single-player

Figma trained us to expect every tool to be a shared canvas with a pile of avatars in the corner. Claude Code is the opposite: it's just the two of you, on your machine. Nobody else sees the session, nobody's cursor floats by. It's less collaborative whiteboard, more private collaborator.

### Git and GitHub are how it becomes multiplayer

Git is version history for a project folder. It's a point in time you save that you can always roll back to, like Figma's version history but for everything in the folder. GitHub is the website where those histories live so a whole team can share one project. You don't have to learn either one to start, Claude performs the ceremony for you. I used to use GitHub Desktop but now I just tell Claude to do it. I'll have a more in-depth post on Git and GitHub soon.

### Models are the brains, and they come in different sizes

Under the hood, "Claude" is a family of models with poetry names (Haiku, Sonnet, Opus). Bigger models think deeper and move slower; smaller ones are quick and cheap. Tho if you use a smaller model on a complex task, it may become more expensive because it's working longer and harder to perform what a larger model can do quickly. Claude Code picks a sensible default, and you can ignore this whole paragraph until the day you can't.

### Context is its short-term memory

Everything in your current conversation, what you asked, what it read, what it wrote, sits in Claude's working memory. That's the "context", and you'll hear it called the "context window" because it's finite, like desk space. Tokens are the units it's measured in: little chunks of words, a syllable or two each. When the context fills up, Claude tidies it by summarizing the older stuff, which is why a very long conversation can get a little foggy about how it started. This is where the AI starts to make mistakes and hallucinate because it doesn't remember everything you talked about.

### A session is one continuous workstream

Start Claude, do some work with it, then quit: that's a session. When you start a new one, it begins with a clean context. Quitting and starting fresh is a good habit to have. I constantly start new sessions so that the context is fresh and we don't get into a very long conversation where Claude will start forgetting what we talked about. I check to see the context window by typing `/context`. If the project is very large, I may ask Claude to produce a PLAN.md file which I will ask it to read in the beginning of each new session so that it remembers what we were doing in the previous session and picks things up from where we left them.

### Approvals and modes

Out of the box, Claude asks permission before it touches anything, every edit gets a yes from you first. You can tune this. Auto mode approves everything automatically so you're not clicking yes forty times an hour. One of the more annoying things is leaving the computer for a bit and coming back to see it didn't do much cause it was stuck on an approval request. Plan mode is the opposite of auto: Claude researches, pitches you a plan, and nothing happens until you sign off. Me, I'm always in auto mode and I really dislike plan mode. If I want to plan with Claude I just tell it that I want to discuss something and it shouldn't code yet. We discuss for a bit, then I ask it to create an md file with the plan.

### CLAUDE.md is the standing brief

A plain text note that lives in your project folder; Claude reads it at the start of every session. Since sessions begin blank, this is the onboarding doc: your rules, your taste, the stuff you're tired of repeating. Mine includes a strict ban on em dashes. Long story.

### Commands and skills are saved instructions

A command is a prompt you've saved and fire with a slash. A skill is bigger: a recipe that teaches Claude how you do a particular job, which it pulls out whenever that job comes up. I have a skill that teaches Claude how to upload things to my server. Super useful for things you do repetitively and want Claude to repeat it in the same way.

### Agents are Claudes you delegate to

You can send a copy of Claude off to handle a task (research this, rename those, fix that) while you keep working, and it reports back when it's done. So there is a team in here after all; it's just all Claudes. The added benefit: each Claude has its own context window, which saves context from the main Claude you are chatting with.

### MCP is the plug standard

Short for Model Context Protocol, it's how Claude connects to other tools: Figma, your calendar, a database. It's USB, basically: one connector, endless devices. When someone says "there's an MCP for that," they mean "there's a plug for that."

That's the map. In the next post we walk into the terminal, and in the one after that we install Claude Code and make it build something. The map is nice. The territory is more fun.

This post is part of _Claude for Designers_, a series of posts helping product designers get comfortable designing and building with Claude Code.

1.  Claude Code 101, for Designers (you are here)