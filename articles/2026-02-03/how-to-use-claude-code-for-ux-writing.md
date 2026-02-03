---
title: "How to Use Claude Code for UX Writing"
source: "https://uxwritinghub.com/claude-code-ux-writing?utm_source=rss&utm_medium=rss&utm_campaign=how-to-use-claude-code-for-ux-writing"
publishedDate: "2026-02-02"
category: "ux-writing"
feedName: "UX Writing Hub"
author: "Yuval Keshtcher"
---

Most UX writers look at a terminal window and worry about breaking something. It looks like a place where you press one wrong button and delete the entire production database. This fear is valid, but it holds you back from the most powerful content operations tool we have seen since the launch of ChatGPT.

You don’t need to be a software engineer to use Claude Code. If you understand folders, files, and language, you already have the prerequisites. This tool isn’t about writing Python scripts. The real goal is gaining control over your content systems so you don’t have to wait on developer tickets for every small copy update.

## Key Takeaways

-   **It’s a tool, not a chat:** Claude Code lives on your computer and accesses your actual files, unlike the web version which only knows what you paste into it.
-   **No coding required:** You interact with it using plain English instructions, just like you would brief a junior writer.
-   **Safety first:** We will show you how to use “Plan Mode” so the AI asks for permission before it touches anything.
-   **System over one-offs:** The real power comes from creating reusable workflows for audits and consistency checks.
-   **Content autonomy:** Learning this tool reduces your dependency on engineering resources for routine text changes.

## What Is Claude Code? (And Why It’s Not Just for Developers)

Claude Code is an agentic AI tool that runs directly in your terminal. That sounds technical, so let’s reframe it.

Think of the standard Claude interface (the website) as a consultant you call on the phone. You describe your problem, maybe send over a document, and they give you advice. But they can’t actually _do_ the work for you because they aren’t in your office.

Claude Code is different. It acts like an employee sitting at a desk inside your computer. This agent has direct access to your project folders, so it can open files, read them, spot inconsistencies, and even rewrite them if you ask.

For a content designer, this is a massive shift. You are no longer copy-pasting text into a browser window to check for passive voice. You are pointing the AI at a folder of 50 Markdown files and telling it to “audit all headlines for sentence case.”

The difference comes down to access and intent.

Feature

Claude Web Chat

Claude Code (CLI)

**Interface**

Browser

Terminal

**File Access**

Copy/Paste or Upload

Direct Read/Write

**Context Awareness**

Session only

Project-wide

**Primary Use Case**

Brainstorming & Drafting

Executing Workflows

**Cost**

Fixed Subscription

Pay-per-token

### The Agentic Loop: How It Actually Works

The term “agentic” just means the AI has a process. It doesn’t just blurt out an answer. It follows a loop of thinking and acting.

When you ask Claude Code to “Find all error messages and make them friendlier,” it doesn’t guess. It enters a specific cycle:

 ![](https://uxwritinghub.com/wp-content/uploads/2026/02/Gemini_Generated_Image_dyopogdyopogdyop.png)

## Getting Started: A Fear-Free Setup Guide for Designers

We need to get past the “black screen” anxiety. The terminal is just a text-based version of Finder (on Mac) or Explorer (on Windows). Instead of clicking a folder icon, you type `cd foldername`. That is the only technical concept you really need to grasp.

Here is how to get Claude Code running without breaking your machine.

**Step 1: The One-Time Install** You likely need to type one command to install it. If you are on a Mac, open “Terminal” and paste the installation command provided by Anthropic’s documentation. It usually looks like `npm install -g @anthropic-ai/claude-code`.

**Step 2: Authentication** Once installed, you just type `claude`. It will open a browser window asking you to log in. This connects the terminal tool to your account.

**Step 3: The Interface** Once you are in, it looks surprisingly simple. It isn’t a wall of matrix code. It is a conversation stream.

**Visual Description:** An annotated screenshot of the Claude Code terminal interface.

-   **The Prompt Line:** A clear area at the bottom where you type plain English instructions.
-   **The Cost Indicator:** A small readout showing token usage for the session.
-   **The Status Bar:** Indicates the current mode (e.g., “Plan Mode” or “Normal Mode”).
-   _Key takeaway: The terminal has a clear structure, similar to a messaging app UI, just text-based._

**Step 4: Navigate to Your Content** You need to be in the folder where your content lives. If your product documentation is in a folder called `docs`, you type `cd docs`. Now Claude Code can see those files.

## The “Brain” of Your Workflow: Mastering CLAUDE.md

This is the most critical section for UX writers.

When you hire a freelancer, you hand them a style guide so they don’t use the wrong terminology. Claude Code works the same way. It looks for a specific file called `CLAUDE.md` in your project folder.

Think of `CLAUDE.md` as your **Master Style Guide**.

If you don’t have this file, Claude acts like a generic copywriter. It might use flowery language or exclamation points you hate. But once you add this file, Claude reads it _before_ it answers any prompt. It forces the AI to adopt your specific voice, tone, and formatting rules.

Creating this system file from scratch can feel overwhelming. You have to know exactly how to phrase constraints so the AI obeys them. The **UX Writing Hub Claude Code Course** solves this by providing pre-built, industry-standard `CLAUDE.md` templates. These starter files are designed specifically for content design systems, so you can drop them into your project and instantly enforce best practices without strict trial and error.

Once this file is in place, you stop correcting the AI and start collaborating with it.

## 3 Real-World Claude Code Workflows for Content Designers

Theory is useful, but you need to see how this actually saves you time. We are going to move beyond “chatting” and look at three specific workflows where Claude Code significantly speeds up output for your team.

### Workflow 1: The Bulk Content Audit

Imagine you are doing a widespread audit. You need to find every instance of “Click here” across 500 help center articles and replace it with descriptive link text. Manually opening every file is a nightmare, but Claude Code can read the entire directory in seconds.

You simply type: `> Scan the /docs folder. Find all links using generic text like "click here" or "read more." List the file paths and suggest accessible alternatives for each.`

Claude doesn’t just find them. It gives you a list with context, so you can decide which ones to fix.

### Workflow 2: Automated Copy Refactoring

Refactoring is a developer term, but it applies perfectly to content. It means cleaning up the code (or text) without changing its meaning.

Let’s say you have a messy Markdown file with inconsistent headers and passive voice. You can run this command: `> Read onboarding.md. Apply the rules from CLAUDE.md to fix header capitalization and convert passive voice to active voice.`

The best part is the “Diff” view. Before Claude saves any changes, it shows you exactly what it wants to do.

You can press “Y” to accept or “N” to reject. This puts you in total control of the final output.

### Workflow 3: Generating Consistency Reports

If you are nervous about letting AI edit your files, start with read-only reports. You can treat Claude Code as a QA analyst.

Ask it to: `> Read all files in the /emails folder. Check for tone violations against CLAUDE.md. Do not edit the files. Just generate a markdown report listing the issues.`

It will generate a new file called `audit_report.md` containing all the issues. You can then hand this report to a junior writer or fix the issues yourself. This is a zero-risk way to introduce agentic AI into your process.

## Safety & Best Practices: How to Avoid Breaking Things

The biggest fear designers have is, “Will this delete my work?”

Claude Code has safety mechanisms built directly into the interface. The most important one to understand is the difference between **Plan Mode** and **Normal Mode**.

Feature

Plan Mode

Normal Mode

**Purpose**

Thinking before acting

Executing commands

**Safety Level**

**High**

Low / High Risk

**Speed**

Slower (Deliberate)

Faster (Autonomous)

**Best For**

Complex changes, audits, first-time setup

Rapid iterations on single files

**Always start in Plan Mode.** In this mode, Claude will propose a plan and wait for your approval before it touches a single file. It says, “I plan to edit these 3 files. Proceed?” You have to type “Yes.” This friction is intentional because it prevents accidents.

## Conclusion: Build Systems, Not Just Prompts

Using Claude Code forces you to upgrade your skills. You stop being just a writer and start becoming a content systems architect.

When you use the web chat, you are solving a problem once. When you use Claude Code with a `CLAUDE.md` file, you are building a reusable workflow that ensures quality for the entire team.

The terminal isn’t a barrier. It’s a bridge. It connects your content strategy directly to the product architecture. So open that terminal, navigate to a safe sandbox folder, and try running your first audit. You will realize that “code” is just text, and you are already an expert in that.

## FAQs

### Is Claude Code free to use?

No. Unlike the web chat which has a flat monthly fee, Claude Code uses the API, which means you pay per “token” (per word processed). It’s generally very affordable for text-based tasks, often costing pennies for a day of work, but you do need to set up billing in the Anthropic console.

### Do I need to know Python or Javascript?

No. You need to know how to navigate folders (using `cd`) and list files (using `ls`). The rest of the interaction happens in plain English. If you can write a clear content brief, you can use this tool.

### Can Claude Code see my private files?

Claude Code runs locally on your machine, but it sends the text of the files you are working on to Anthropic’s servers for processing. It does _not_ train on your data by default if you are an enterprise user, but you should always check your specific data privacy settings in the API console.

### How is this different from Cursor or GitHub Copilot?

Cursor and Copilot are “Autocomplete” tools. They guess what you are going to type next. Claude Code is an “Agent.” It performs tasks _for_ you.

Feature

Cursor / GitHub Copilot

Claude Code

**Interaction**

Autocomplete (Ghost text)

Conversation & Action

**Scope**

Single File / Current Line

Entire Project / Folder

**Autonomy**

**Low:** You drive, it suggests

**High:** You direct, it drives

Think of Copilot as a very smart spellcheck. Think of Claude Code as a junior colleague who can go away, do a task, and come back with the results.