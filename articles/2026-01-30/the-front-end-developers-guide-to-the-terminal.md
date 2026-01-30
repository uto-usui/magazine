---
title: "The Front-End Developer's Guide to the Terminal"
source: "https://www.joshwcomeau.com/javascript/terminal-for-js-devs/"
publishedDate: "2022-04-19"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

Modern front-end frameworks like React, Angular, and Vue rely heavily on the terminal. If you're not comfortable with command line interfaces, you'll struggle to run a local development server or build your application!

There's something deeply ironic about this. Our whole job is to build _graphical user interfaces_, but the tools we use in our development are mostly command-line based!

Unless you have a Computer Science background, or grew up using a computer in the 80s, you probably won't have very much terminal experience. And yet, most online resources assume that you're already proficient!

It takes years of practice to become a terminal guru, **but here's the good news:** we can take a shortcut. We don't really need to know 98% of the stuff you can do with a terminal. If we focus on the most-important critical fundamentals, we should be able to become comfortable with the command line in a remarkably short amount of time. ✨

**That's what this blog post is all about.** It's the missing manual of terminal fundamentals needed to work with modern JS frameworks like React, so you can move onto the fun stuff: building user interfaces!

I'll also share all of my favourite _tips and tricks_ for getting the most out of the terminal, the stuff I wish someone had shown me when I was first getting started.

## [Link to this heading](#getting-set-up-1)Getting set up

Alright, so there's two things we need to do before anything else.

First, we need some terminal software. This is the application that runs the command-line environment.

Just about every operating system will come with a built-in terminal, like MacOS' Terminal.app, or Windows' Command Prompt. These applications work, but they're pretty underwhelming. Most developers opt to use something else.

The choice of terminal application isn't _super_ important, as long as you're using something modern. That said, I have two main recommendations:

1.  [Hyper(opens in new tab)](https://hyper.is/). Hyper is a modern, multi-platform terminal application. It's beautiful, and comes with some handy modern features, like the ability to split into multiple panes.
    
2.  If you use VS Code as your code editor, VS Code comes with a powerful, modern terminal built in. This is nice, since it means your code and terminal can run side-by-side in the same application. You can pop open the terminal in VS Code by selecting `View` → `Terminal`.
    

I'll be using Hyper for all the examples in this blog post.

Now, the terminal application is only half of the equation. We also need to make sure we're running the right _shell language_.

When we type a command into the terminal and press “enter”, that command will be interpreted by the shell language. It's essentially the environment running within the terminal application.

The most popular shell language is **Bash**. When you see command-line instructions online, it's likely that the instructions are assuming Bash. This is the default shell language used by most Linux distributions.

Modern MacOS versions ship with **Zsh** instead of Bash, but Zsh is very similar: it's part of the same "family", and shares almost all of the same commands. For our purposes, they can be used interchangeably.

If you're using either Linux or MacOS, you're good to go. Your computer is already using an "industry standard" shell language. If you're using Windows, however, we have a bit of work to do.

### [Link to this heading](#windows-setup-2)Windows setup

Alright, first, let me preface this by emphatically admitting that I am _not_ an expert when it comes to Windows development. Please take everything I'm about to say with a grain of salt. 😅

Bash is a Linux-based shell language, and it won't run natively in Windows. Fortunately, newer versions of Windows come with the ability to install and run Linux as if it were any other application. This is known as _Windows Subsystem for Linux_, commonly abbreviated to WSL.

Here's a tutorial that runs through the steps required: [How to install and use Zsh in Windows 10(opens in new tab)](https://candid.technology/zsh-windows-10/).

I ran through these steps myself, and while it's definitely a bit tedious, it does the job!

Once it's set up, you'll be able to configure your terminal application to use Bash or Zsh. Here are some instructions for [configuring Hyper to use Zsh(opens in new tab)](https://hashnode.com/post/customize-hyper-terminal-in-windows-using-oh-my-zsh-and-powerline-fonts-ckggfmcwc00brrls1f8va9jfl#install-hyper-terminal).

If you have trouble with any of these steps, there are other solutions you can try. A popular method is [Git Bash(opens in new tab)](https://www.atlassian.com/git/tutorials/git-bash), which allows you to run Bash within Windows using emulation.

Ultimately, it doesn't matter how you get there. The important thing is for you to be able to use either Bash or Zsh within Windows.

## [Link to this heading](#hello-world-3)Hello World

When you first open the terminal application, you're met with this rather unhelpful interface:

![A terminal application showing a default prompt](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-initial.png&w=3840&q=75)

Your terminal will likely look a bit different, based on your operating system / terminal application / shell language. Ultimately, however, you'll probably be looking at a single line of text, and a bunch of empty space.

The single line of text is known as a _prompt_. It's called a “prompt” because it's waiting for you to provide some sort of instruction.

For our first command, enter the text `echo "hello world"` and press enter:

![Running the 'echo' command, repeating a short string](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-echo.png&w=3840&q=75)

The syntax is a bit different, but you can think of commands like built-in JavaScript functions. The `echo` command is very similar to the `console.log` function in JavaScript.

Like functions, commands take arguments. In this case, `echo` takes a single argument, the string to output.

When we press “enter”, the command is immediately executed, and our value is logged. A fresh prompt is rendered below, to let us know that it's ready to receive the next instruction.

And just like that, you've run your first terminal command!

## [Link to this heading](#navigation-4)Navigation

The main purpose of a terminal is to enable you to move around the file system and open/run things. It's essentially a text-based version of the GUI file explorers we use every day (eg. Finder, Windows Explorer).

To help us navigate around, there are lots of terminal commands we can use. Let's explore some of them.

The `pwd` command stands for “Print Working Directory”, and it's sorta like the "You are here" arrow on shopping mall directories. It tells you where you are right now:

![Running the 'pwd' command, which shows the current path (/Users/joshu)](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-pwd.png&w=3840&q=75)

When you open the terminal application, you're generally tossed into the "home" directory, the one that contains the Documents and Desktop directories. On my particular machine, this directory is located at `/Users/joshu`.

You can see the contents of the current directory using the `ls` command (short for “List”):

![Running the 'ls' command, showing a set of all files and folders in the current working directory](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-ls-v2.png&w=3840&q=75)

In my particular terminal, directories are bold and written in a light aqua color, while single files are regular weight and written in white.

We can move around the file system with the `cd` (“Change Directory”) command:

![Running the 'cd' command, to enter one of the directories shown in the previous 'ls'. Afterwards, 'pwd' is run to confirm the new location](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-cd.png&w=3840&q=75)

This is equivalent to double-clicking the “stuff” directory in a GUI file explorer.

What if I want to go up one level, back to the home directory? I can use the `cd` command for this as well, with two dots (`..`).

![Running 'cd ..', which takes the user back up to the previous directory.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-cd-up.png&w=3840&q=75)

The dot character (`.`) has a special meaning in most shell languages:

-   A single dot (`.`) refers to the _current directory_.
    
-   Two dots (`..`) refer to the _parent directory_.
    

If you've worked with module systems in JavaScript, you're probably already familiar with this convention. It uses the same notation, using two dots to refer to the parent directory:

```
import { COLORS } from '../../constants';
import Button from '../Button';
```

One important thing to know about `cd` is that it can take complex paths. Terminal beginners will often go one step at a time, like they would in a GUI file explorer:

![Using 'cd' to step down through 4 different directories](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-cd-step-by-step.png&w=3840&q=75)

This works, but it's a lot of extra work. We can make the same jump in a single step like this:

![Running the 'cd' command to make the same transition as before, but doing it in 1 single step: 'cd things/some-project/src/components'](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-cd-single-bound.png&w=3840&q=75)

### [Link to this heading](#tab-auto-completion-5)Tab auto-completion

One of the most intimidating things about the terminal is that it doesn't give you any clues or hints. With a GUI file explorer, you can see a full list of files and folders, to refresh your memory and help you find what you're looking for.

If you want to use `cd` as I propose, leaping from 1 spot to another in a single bound, it might seem like you'd need a photographic memory. You can't do it unless you remember the exact name of every directory in the chain, right?

Fortunately, an incredibly-handy trick makes this much easier: _tab autocompletion_.

It'll be easier for me to show you how this works in a short video:

The Tab key is critically important when it comes to using the terminal effectively. In addition to the navigation tricks shown here, we can also use Tab to auto-complete Git branches, or fill in the rest of a command.

Try pressing Tab in different circumstances, and see what happens!

## [Link to this heading](#flags-6)Flags

Earlier, I said that commands in Bash/Zsh are like functions in JavaScript. The analogy breaks down a bit when it comes to _flags_.

Flags are modifiers that tweak the behaviour of commands in predefined ways.

For example, let's look at the `rm` command. This command allows us to delete individual files:

![Running 'rm theme-song.mp3', and then running 'ls' to show that the file was deleted.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-rm-1.png&w=3840&q=75)

We don't get any sort of confirmation, but if we check, the `theme-song.mp3` file has indeed been deleted.Having my own theme song was a silly idea anyway.

If you try and use the `rm` command on a directory, you'll get an error:

![Running the 'rm' command on a directory, and getting an error](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-rm-error.png&w=3840&q=75)

By default, `rm` can only remove individual files, but we can change this rule with the `r` flag:

![Running the 'rm' command with the 'r' flag, and successfully deleting the directory](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-rm-r.png&w=3840&q=75)

The `r` flag stands for “recursive”. It will delete everything inside the `stuff` directory, anything inside the directories inside the `stuff` directory, anything inside directories inside the directories inside the `stuff` directory, and so on.It's easy to take this for granted, but when we delete a directory, the computer has to do a non-trivial amount of work to figure out exactly which files should be removed from the disk drive!

You might also run into some file permission issues. For that reason, the `f` flag (Force) is commonly used as well. We can group multiple flags with a single dash, like this:

![Running the 'rm' command with the 'r' and 'f' flags](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-rm-rf.png&w=3840&q=75)

Flags take many shapes and sizes. By convention, it's common for flags to have a short form (eg. `-f`) and a long form (`--force`). The long form typically uses two dashes, and uses whole words instead of individual letters.

Let's look at one more example. the `ls` command we saw earlier is commonly called with two flags:

-   The `l` flag, “long”, which prints the directory contents in a detailed list with metadata.
    
-   The `a` flag, "all", which'll include hidden files and directories.
    

This changes the output considerably:

![Running 'ls -la'. A detailed list is shown, along with hidden files and folders.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-ls-la.png&w=3840&q=75)

There's a lot of noise here, including the ridiculously-obfuscated permission glyphs. But some of the metadata, like the dates that show when a file was last updated, can be useful!

## [Link to this heading](#interrupting-commands-7)Interrupting commands

Some processes are long-running, and will need to be interrupted.

For example, open your terminal application and try running the following command: `ping 8.8.8.8`.

The `ping` command will check the latency against a given IP address. It's useful for checking whether a given server is online or not. `8.8.8.8` is the IP address for Google's DNS server.

![Running 'ping 8.8.8.8'. The terminal fills up with results, showing that the pings come back after 30-45 milliseconds.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-ping.png&w=3840&q=75)

Unlike the commands we've seen so far, `ping` is a long-running process. It never stops; by default, it'll keep pinging Google's DNS server until the end of time.

When we're satisfied with the results, we can interrupt it by holding `ctrl` and pressing `c`. Even on MacOS, where most shortcuts use the `⌘` modifier, we use `ctrl`.

Another helpful command is `ctrl` + `d`. This will end the current session. If `ctrl` + `c` isn't working for some reason, `ctrl` + `d` may work instead.

Finally, if all else fails, you can close the current tab/window. The shortcut depends on the OS and terminal application. Using Hyper on MacOS, this is done with `⌘` + `w`.

## [Link to this heading](#common-development-tasks-8)Common development tasks

So far, we've seen lots of general-computing examples of how to do stuff with the terminal. Let's look at how we'd accomplish some typical development tasks!

These examples assume that you have Node.js installed. If you haven't installed it yet, you can [download a copy from the Node homepage(opens in new tab)](https://nodejs.org/en/).

### [Link to this heading](#managing-dependencies-9)Managing dependencies

Let's imagine it's your first day on the job. The team has given you access to the source code, and you've downloaded it onto your machine. Now what?

Well, the first step is to download the project's third-party dependencies!

Here are the steps to follow:

```
$ cd path/to/project
$ npm install
```

`npm` stands for Node Package Manager. It's installed automatically when you install Node.js.

Running this command will download all of the third-party code that the project depends on from the NPM repository. This code will live in a local `node_modules` directory.

### [Link to this heading](#running-npm-scripts-10)Running NPM scripts

Alright, so you've got the third-party code downloaded. Now what?

If you check out the project's `package.json`, you'll likely see a section that looks like this:

```
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

These “scripts” are tasks that can be run with the NPM utility. They can be executed by running `npm run [name]`. For example, to boot up a local development server, we'd run:

```
$ cd path/to/project
$ npm run start
```

Running this command starts a long-running process. It launches a Node server that allows us to work on our application, watching for changes to the files and re-bundling when we edit them.

When we're done, we can kill the server with `ctrl` + `c`.

The beautiful thing about NPM scripts is that they _standardize_ things. `start`, `build`, and `test` are conventional names for these standard tasks. As a result, we don't have to memorize bespoke commands for each project, even if the projects use radically different tools.That said, there are some tools that don't follow these conventions. Be sure to check the project's package.json file for a full list of available scripts.

(We can also create our own NPM scripts! This is something I do extensively in my projects. I'll be publishing a blog post all about this at some point, [subscribe(opens in new tab)](https://joshwcomeau.com/subscribe) so you don't miss it!)

### [Link to this heading](#opening-the-project-in-your-ide-11)Opening the project in your IDE

When I want to start working on a project, I start by navigating to the project's root directory in the terminal. Then I run the following command:

```
$ cd path/to/project
$ code .
```

As discussed, `.` refers to the current working directory. `code` is a command added by my code editor, VS Code. Running this command opens the entire project in my code editor, making it easy for me to jump between files as-needed.

Note that the command will vary depending on your editor. And, for folks on MacOS who use VS Code, you'll need to [do a bit of work(opens in new tab)](https://code.visualstudio.com/docs/setup/mac) to enable the `code` command.

### [Link to this heading](#reinstalling-dependencies-12)Reinstalling dependencies

You know how the standard advice for _any_ computer problem is to turn it off and on again?

The JavaScript version of that is to reinstall the NPM dependencies. Sometimes, they just need to be erased and re-downloaded. This is _especially_ true if you occasionally pop into your `node_modules` and edit the files to help with debugging.This is a debugging superpower. Don't be afraid to tinker with the code inside node\_modules!

Here's how we can do this:

```
$ cd path/to/project
$ rm -rf node_modules
$ npm install
```

Once we're in the correct directory, we delete all third-party code with the `rm` command, and then re-install it with `npm install`.

### [Link to this heading](#working-with-git-13)Working with Git

While there _are_ GUI applications for working with Git, many developers prefer to use the command line for Git-related tasks.

A full command-line Git tutorial is well beyond the scope of this blog post, but here's a quick cheat-sheet of the commands I use often:

```
#​ Download a Git repository onto your local machine
$ git clone [URL]

#​ Check which files have been modified
$ git status -s

#​ View changes
$ git diff

#​ Stage all files
$ git add .

#​ Commit staged files
$ git commit -m "Short descriptive message"

#​ Create a new local branch
$ git switch -c [new branch name]

#​ Switch branches
$ git switch [branch name]

#​ Push your code to Github (or wherever the project lives)
$ git push origin [branch name]

#​ Start an interactive rebase
$ git rebase -i [branch name or commit hash]
```

## [Link to this heading](#lil-tricks-14)Lil’ tricks

Over the years, I've picked up some nifty little terminal tips. They aren't _critical_, but they help improve the developer experience of using the terminal.

### [Link to this heading](#cycling-and-toggling-commands-15)Cycling and toggling commands

Many terminal applications will keep a log of every command you've run in a given session. You can cycle through previous commands using the "up" arrow.

If I know I've run a command recently, it's usually faster to hit "up" a couple times rather than typing it out from scratch!

Here's one more _amazing_ little trick I learned a while back: the `-` character.

Suppose we want to bounce back and forth between two directories with `cd`. We can do that by typing out the whole path, over and over and over:

### [Link to this heading](#clearing-the-terminal-16)Clearing the terminal

Like a clear desk, a clear terminal can lead to a clear mind.

There are a few ways to accomplish this. There's a `clear` command, which will erase all previously-entered commands, and making it seem like you just started a new terminal session.

There's also a universal shortcut, `ctrl` + `L`. This has the same effect as the `clear` command. It should work across MacOS, Windows, and Linux.

This command/shortcut is implemented within Bash/Zsh. It's part of the shell environment. This means that it only works while the shell is idle, when you have a prompt waiting to receive instructions.

Certain terminal applications also implement their own shortcuts, and these shortcuts can work **even while the shell is busy.** Here are the list of shortcuts I'm aware of:

-   On MacOS, across just about any shell (Terminal.app, iTerm2, Hyper), the shortcut is `⌘` + `k`
    
-   If you use Hyper on non-MacOS platforms, the shortcut is `ctrl` + `shift` + `k`.
    

**These application-level shortcuts are way better.** You can use them even when the shell is busy.

For example, let's say you're running a dev server. This is a long-running process, and so the `ctrl` + `L` shortcut won't work. As you work on the project, lots of messages will be logged in the terminal window. The application shortcuts allow you to clear away stale logs, as if archiving old emails. **This is really helpful,** and a great example of how modern terminal applications make our lives easier.

Thanks to Aleksandr Hovhannisyan and Joseph Cagle for helping me understand how this works on non-MacOS platforms!

### [Link to this heading](#aliases-17)Aliases

Every now and then, I'll find myself typing out the same command over and over. If this command is long or complex, it's annoying to have to type it out every time, and to remember it verbatim.

Bash and Zsh support _aliases_, a way of creating custom shortcuts. For example, I can set it up so that whenever I enter `hi`, it automatically runs `echo "Hello World!"`:

![Running the 'alias' command, to create an alias for the echo command](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-alias.png&w=3840&q=75)

Setting up aliases is a bit beyond the scope of this tutorial, and the instructions are a bit different depending on your shell language. Here are some helpful tutorials that go into more depth:

-   [Bash aliases(opens in new tab)](https://linuxize.com/post/how-to-create-bash-aliases/)
    
-   [Zsh aliases(opens in new tab)](https://linuxhint.com/configure-use-aliases-zsh/)
    

### [Link to this heading](#switching-to-a-gui-file-explorer-18)Switching to a GUI file explorer

Unless you've reached black-belt status with the terminal, there will be times when you want to open the working directory in a GUI file explorer.

On MacOS, the `open .` command will do this:

The `open` command is generally used to open a file, the same way double-clicking a file opens it in a GUI file explorer.

When we try to open a _directory_, however, it'll choose to pop open a new Finder window, showing the contents of that directory.

And since the dot character (`.`) refers to the current directory, `open .` allows us to switch from the terminal to Finder, to continue our work outside of the terminal.

On Windows, you can use `explorer .` to accomplish the same goal! Thanks to Lukas and Agata for letting me know. 😄

On Linux, `xdg-open` can be used to open files, or the current directory, so long as the Linux distro implements the FreeDesktop standard. Thanks to David for letting me know!

### [Link to this heading](#chaining-commands-19)Chaining commands

Whenever I clone a new project from Github, I generally want to do two things in a row:

-   `npm install`, to fetch third-party dependencies
    
-   `npm run start`, to boot up a local development server
    

The `npm install` command typically takes a few minutes. I don't have the attention span to sit and watch dependencies download, and so I'll often distract myself with social media. The next thing I know, 20 minutes have passed, and I totally forgot I was going to start a dev server. 😬

We can solve this problem using _chaining_. Here's how it works:

![Chaining two NPM commands with double ampersands](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-chain.png&w=3840&q=75)

The `&&` operator allows us to chain multiple commands together. The first command will be executed, `npm install`. The moment it finishes, the second command will be run automatically.

This is a particularly neat trick because `npm run start` generally opens a browser window, capturing my attention and letting me know that everything's ready for me. `npm install`, by contrast, finishes silently.

Once I got the hang of chaining, I started using it everywhere. I'll often queue up a bunch of Git commands:

```
git add . && git commit -m "Stuff" && git push origin main
```

### [Link to this heading](#terminal-tiling-and-tabs-20)Terminal tiling and tabs

Alright, so let's talk about how to keep our workspace organized.

Running a dev server with `npm run start` is a long-running process. I often have dev servers run uninterrupted for weeks at a time!

When a terminal session is busy on a task, it isn't able to accept additional commands. Remember, the prompt is used to show that the terminal is waiting for a command; if we don't see a prompt, we can't run anything in that given session!

Fortunately, modern terminal applications make it easy to run many terminal sessions in the same application.

In Hyper, we can split the window into multiple vertical panes by selecting Shell -> Split down. On MacOS, the shortcut is `Shift` + `⌘` + `d`. This creates two independent sessions:

![Two terminal sessions, one on top of the other](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fterminal-for-js-devs%2Ft-tiled.png&w=3840&q=75)

By splitting the window into multiple sessions, the top session can focus on running the dev server, and highlighting errors and other important information. The bottom session can be used to run shorter tasks.

Sometimes, projects will require multiple long-running tasks; maybe we have a dev server _and_ a test watcher. In that case, we'd split the window into 3 sessions.

In Hyper, we can also create _multiple tabs_. New tabs can be created with Shell -> New Tab. On MacOS, the shortcut is the same as it is to create new tabs in a web browser: `⌘` + `t`.

**When do we use tabs vs. tiles?** I like to have 1 tab per project. Each tab can be split into as many sessions are required for that specific project.

## [Link to this heading](#the-journey-continues-21)The journey continues

Phew! We covered a lot of ground in this one. Hopefully, you aren't feeling too overwhelmed!

The terminal has a well-earned reputation for being intimidating and tricky for beginners. It's totally normal if you struggle with it!

Hopefully, though, this blog post has at least cut down the scope of what you need to learn. There is a lot you can do with the terminal, but we can get by just fine focusing on a (relatively) narrow sliver.

If you found this blog post helpful, please share it with someone!

### Last updated on

October 26th, 2025