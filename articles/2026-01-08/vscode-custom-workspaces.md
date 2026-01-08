---
title: "VSCode Custom Workspaces"
source: "https://una.im/code-workspaces/"
publishedDate: "2017-04-24"
category: "css"
feedName: "Una Kravets"
---

![](https://una.im/posts/vscode-workspace/bg.jpg)

Published on April 24, 2017

[Visual Studio Code](https://code.visualstudio.com/) just [released](https://code.visualstudio.com/updates/v1_11#_workbench) experimental workbench theming. This is such an awesome feature (“to-be”?) because it allows you to customize your text editor’s look and feel on a per-project basis! Why is this so exciting? Read on:

## Creating Spaces for Flow

Cal Newport, author of the book [Deep Work](#), [defines](https://80000hours.org/2016/08/is-deep-work-the-most-underappreciated-skill-for-career-success-an-interview-with-cal-newport/) the concept of “deep work” as _“the ability to focus without distraction on a cognitively demanding task”_. “Deep work” as he describes it is also known as _“flow”_, a state of being where a person becomes extremely productive by focusing on a single task and actively avoiding distraction.

I have a theory that our digital workspaces, or text editors, can help us get into this state more quickly by providing visual cues that move us from one task to another (also known as context switching).

Have you ever noticed that changing your environment might help give you some inspiration or help you focus? Like going to a coffee shop to write a blog post or moving to another corner of the office to work on a difficult problem? This phenomenon may extend to our digital spaces as well, particularly to where we’re doing the work (text editors).

> Having visual differentiation between projects may help you more fluidly “swap” into another mindset and keep you there.

_Note: This isn’t a tested theory, but it seems plausible, and it certainly couldn’t hurt to try._

## Implementation

Workbench customization can be implemented in the same way you would theme anything else. You can access it with `cmd + shift + p` on a Mac, or `ctrl + shift + p` on a Windows machine and looking for `Preferences: Open Workspace Settings`.

![Sample setup](https://una.im/posts/vscode-workspace/setup.jpg)

Right now you can update entire themes on your projects using the customization of `workbench.colorTheme` along with various positioning and visibility options. Color customization options are a bit limited and experimental, but include (within `workbench.experimental.colorCustomizations`: `statusBarBackground`, `panelBackground`, `sideBarBackground`, `sideBarTitleForeground`, `activeTabBackground`, `editorForeground`, `editorLineHighlight`, `titleBarActiveBackground`.

And more! The autocomplete for settings is pretty great, and results are instant, too:

![Bright red highlight](https://una.im/posts/vscode-workspace/instant.jpg)

😬 Well, at least it's working.

## Use Cases

To me, this feature is great for differentiating between work and personal projects, as well as customizing layout to suit certain needs. For blog posts, I’ll likely want larger text, increased line height, and really good markdown support, so I use a theme called [Gray Matter](https://marketplace.visualstudio.com/items?itemName=philipbe.theme-gray-matter) which feels a lot like iA writer (the UI of which which I love, but prefer to stay within my own code base and use the commands I’m used to in VS Code).

![](https://una.im/posts/vscode-workspace/default.jpg)

Default Workspace

![](https://una.im/posts/vscode-workspace/do.jpg)

DigitalOcean Workspace

![](https://una.im/posts/vscode-workspace/book.jpg)

Writing Workspace

For the other workspaces, I’ve just customized themes and colors as I’ve seen above. There are a lot of possibilities here with the large amount of themes on the plug-in market, and now with the ability to further customize those to fit your own needs.

## Drawbacks

This is still an experimental feature that isn’t at its final implementation yet. According to Microsoft:

> “There are still several gaps and we have not finalized the new theme file format. For that reason, there’s no documentation and we ask theme authors to not use the new theme format yet.”

Also, doing any such customizations will add a `.vscode/` folder to your filesystem to read the configuration. Be sure to add `.vscode/` to your `.gitignore` file to make sure it doesn’t get merged in to your code base.

Despite the warnings, we can start to play now! And better customize our experience for the digital spaces in which we spend a lot of our time.