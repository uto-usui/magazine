---
title: "The window with no buttons"
source: "https://www.baselinedesign.com/posts/the-window-with-no-buttons"
publishedDate: "2026-11-04"
category: "design"
feedName: "Sidebar"
---

If you've spent your career in design, you're probably used to working on a canvas. Most projects have a visual form: objects you can select, layers you can rearrange, and elements you can watch change as you work on them. And even the more abstract parts of a design system, like tokens and variables, sit in panels you can browse.

Then, you open the terminal — a blank window with a blinking cursor, waiting for you to type something. No buttons to click or menus to browse, and when you run a command, the reply is often a few lines of text, or nothing at all. Moving from a spatial, visual workspace to one where you need the right words before anything happens can feel like hitting a wall (sound familiar?). As designers, we have good words for why: the terminal leaves out almost everything we spent our careers adding to interfaces.

And it's turning up in more of the tools around a design system. [Style Dictionary](https://styledictionary.com/), [Storybook](https://storybook.js.org/), and AI coding agents like [Claude Code](https://claude.com/product/claude-code) all run from the terminal, so if you look after a system, you're probably opening it more often than you used to. Like any interface, it has its own conventions, and you can learn them one at a time, starting with knowing which folder you’re in.

Getting comfortable reading and using the command line can help in a few concrete ways: you can run your team's project on your own machine and see a token change on real screens before it ships, or look at the command an AI agent wants to run and decide whether to allow it. And you get a closer view of how your engineering team works, which can make conversations between design and engineering a little easier.

## The terminal, the shell, and the command line

CLI stands for command-line interface, and it’s an acronym you might be seeing more often lately, in names like [Gemini CLI](https://github.com/google-gemini/gemini-cli), [Codex CLI](https://github.com/openai/codex), and the [GitHub CLI](https://cli.github.com/). It’s a way of operating a computer by typing instructions one line at a time and reading the text reply underneath. Before windows, icons, and the mouse, most people used a computer this way. The graphical interfaces (GUIs) we design for today arrived partly so people wouldn’t have to memorize all those commands.

You’ll hear the words **terminal**, **shell**, and **command line** used almost interchangeably. Pulling them apart makes the rest a little easier to follow:

-   The **terminal** is the app you open. On a Mac, it's called Terminal (original, I know!) and lives in the Utilities folder inside Applications. On Windows, it's usually Windows Terminal or PowerShell.
    
-   The **shell** is the program running inside that window, which reads what you type and works out what to do with it. Macs have used one called zsh by default since 2019, so you'll sometimes see that name in error messages.
    
-   The **command line** is the line you type, next to the blinking cursor.
    

A well-designed menu shows every available option, groups related ones together, and dims the ones that don't apply right now. It lets you recognize what you want instead of remembering it, which Jakob Nielsen described as [recognition rather than recall](https://www.nngroup.com/articles/recognition-and-recall/). The command line works the other way around — you type a word, press Return, and either something happens, or the computer replies with a short message that assumes you already know what it means. Nothing more. If the terminal has always made you a little uneasy, that heuristic helps explain why.

In return, you get consistency. A command does the same thing each time you run it, so you can paste one into Slack for a teammate, or save it in your notes for next month, and it should behave the way it did today.

## The prompt, the folder, and the command

When you open the terminal, you'll see a line of text ending in a % or a $, with the cursor resting after it. That's the prompt — the shell's way of saying it's ready. Whatever comes before the symbol is usually your username, your computer's name, and the folder you're in, and you don't type the symbol yourself. Documentation shows commands in a monospace font, often in a shaded box, and if a line starts with $, leave that off when you copy it.

The idea I'd spend the most time on is the working directory. In Finder, you can have five windows open on five different folders. The terminal is only ever standing in one folder at a time, and every command you run happens there. If a README tells you to run npm install and you run it from your home folder instead of the project folder, it might fail, or install things in the wrong place. It's a bit like asking someone to tidy "this drawer" while you're both standing in the wrong room.

Three commands, `pwd`, `ls`, and `cd`, help you find your way around, and none of them change anything, so they're a good place to start experimenting. If you'd like to try them now:

1.  Open **Terminal**.
    
2.  Type `pwd` and press **Return**. Terminal replies with a path, something like `/Users/yourname`. That’s the folder you’re in right now.
    
3.  In Finder, make a new folder on your Desktop and name it `practice`.
    
4.  Go back to Terminal, type `cd Desktop/practice`, and press **Return**. Then type `pwd` and press **Return** again. This time, the path ends in `practice` (the folder you made).
    
5.  Type `ls` and press **Return**. Nothing appears yet, because the folder is empty. Drag any file into the folder in Finder, then try `ls` again. Now you’ll see the file’s name.
    
6.  Type `cd ..` and press **Return** to step back out to your Desktop.
    

The commands you’ll find in a README are often longer than those three, but most follow a structure that reads a little like a sentence. Here’s one from Style Dictionary, a tool that turns design tokens into code:

![](https://framerusercontent.com/images/bgIkDk4rjCAkALgswXvZ0jnzAFQ.png?width=3364&height=1340)

-   The **command** (`style-dictionary`) is the program you're calling.
    
-   The **subcommand** (build) is the specific job you want it to do.
    
-   The flag (`--config`) is an option that changes how the job runs. Flags often come in a short and a long form, so `npm install -g` and `npm install --global` ask for the same thing.
    
-   The **value** (`tokens.config.json`) is what you're handing to the flag, in this case the file where your settings live.
    

The lines underneath are Style Dictionary’s reply: for each platform, it lists the file it wrote.

If you’ve ever exported a frame from Figma, you’ve made a similar set of decisions. You chose an action (export), set how it should happen (PNG at 2x), and pointed it at something (the frame you’d selected). A command holds those same decisions in a single line. In the Style Dictionary example, `build` is the action, and `--config tokens.config.json` sets how it should happen by pointing it at your settings file.

When you’re unsure what a tool can do, try adding `--help` after its name. Many tools respond with a plain list of their commands and options, which is the closest thing the command line has to a menu.

## Tokens, Storybook, and AI agents

For a long time, a designer could go their whole career without opening the terminal. Design tokens are often where that changes. Once your colors, spacing, and type live as JSON files in a code repository, tools like Style Dictionary turn them into the CSS and platform code your engineering team uses, and those tools often run from the command line. If your component documentation lives in Storybook, its setup adds an `npm run storybook` command for starting it on your own machine, so you can see a change before it ships.

The bigger reason is AI. Coding agents like Claude Code, OpenAI's Codex CLI, and Google's Gemini CLI work directly in the terminal. The agent does most of the typing, but you still decide what it's allowed to run. By default, Claude Code shows you the commands it wants to run and asks for your go-ahead first, and being able to read those lines, even roughly, can be what turns a nervous click on "allow" into a decision you've made yourself.

## Careful commands and helpful keys

It’s natural (and probably a good thing) to feel cautious here — the terminal can permanently delete files without sending them to the Trash, and it will rarely confirm the action with you before it takes it. But, most everyday commands don’t change anything. `pwd`, `ls`, and `cd` read information or move you between folders, so you can run them as often as you like.

When a command does need more care or caution, a few words in the line usually give it away:

-   `rm` deletes files immediately. Before running it, use `pwd` to check which folder you’re in, and read the rest of the line carefully.
    
-   `sudo` runs a command with administrator rights and asks for your password. That request is a good moment to stop and check where the instructions came from.
    
-   `curl` followed by a web address and `| sh` downloads a script and runs it straight away. [Homebrew](https://brew.sh/), a package manager for Mac, uses this kind of line on its own homepage, and that’s expected. If the same pattern turns up in a forum post, pause and ask someone you trust.
    

Taking a moment before you press Return goes a long way. And like the shortcuts you rely on in Figma, the terminal has a handful of its own. Here are a few to start with:

-   **Control + C** stops whatever is running. (On a Mac, this is the Control key, which is easy to mix up if your fingers are used to Command shortcuts).
    
-   **q** closes a long page of text that has filled the window, like a manual page or a git history, and returns you to where you were.
    
-   **The up arrow** brings back the last command you ran, and pressing it again steps further back. It’s a quick way to fix a typo without retyping the whole line.
    
-   **Tab** fills in the rest of a file or folder name after you’ve typed the first few letters, which also saves you from typos. If nothing happens, there’s probably more than one match, so type another letter or two and press Tab again.
    

### Error messages and what they mean

Error messages can look intimidating, especially when you already feel out of your element. Here are a few you’re likely to meet, and what they usually mean:

-   `command not found`: the tool isn’t installed yet, or there’s a typo in its name.
    
-   `No such file or director`: you’re in a different folder from the one the instructions expect. Check with `pwd`, and move with `cd`.
    
-   `Permission denie`: the command is trying to change something your account can’t. Check with someone on your engineering team before reaching for `sudo`.
    
-   Lines starting with `npm error` (or `npm ERR!` in older versions): something went wrong while installing packages. The first few error lines usually name the cause.
    

If you’re still stuck, try sharing the message with someone on your engineering team, or ask an AI assistant like Claude to break it down for you. And if you’d like that help closer to hand, you can bring Claude into the terminal itself with Claude Code, which can explain a command in plain language and run it for you. That’s where knowing the basics helps: when Claude suggests a command, you’ll be able to read what it’s about to do and decide whether it looks right.

_Side note: Early in my career, I spent a few years working as a front-end developer, and the number of errors I wrestled with while installing NPM packages was one of the things that eventually drew me back into design — I'd comb through forum post after forum post and often come away without a clean answer. If I were in that same phase now, with the tools we have today, I think I'd be more inclined to see it through._

I hope this post gives you enough context to look at a README, or a command an AI agent wants to run, and have a sense of what’s about to happen. If you’d like a low-pressure place to start, open the terminal and type pwd. The cursor will still blink back at you, and this time you’ll know which folder you’re in.

Thanks for reading. 👋💛