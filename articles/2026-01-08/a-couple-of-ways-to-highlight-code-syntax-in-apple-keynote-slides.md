---
title: "A couple of ways to highlight code syntax in Apple Keynote slides"
source: "https://www.sarasoueidan.com/blog/copy-paste-from-vscode-to-keynote/"
publishedDate: "2021-05-23"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [Copy-pasting formatted code from VS Code](#copy-pasting-formatted-code-from-vs-code)
2.  [Using the Slides Code Highlighter Web app](#using-the-slides-code-highlighter-web-app)

[Apple Keynote](https://www.apple.com/keynote/) doesn’t come with code syntax highlighting built in. I _really_ wish it did, and hope that Apple would at some point add this feature, especially considering how many developers and engineers use Keynote to create talk slides.

Seven years ago, I used to take screenshots of code snippets to include them in my presentations. That was _very_ impractical. If I wanted to make changes to the code, I’d have to rewrite it, take a screenshot again, and copy-paste it into Keynote once again. That soon became tiring and highly ineffective.

Today, I know of two quick and easy ways to include “real” syntax highlighted code in Keynote. This post is me dumping my thoughts into my own “[Pensieve](https://www.wizardingworld.com/writing-by-jk-rowling/pensieve)”—_this blog!_—for my future self to reference, and for anyone else who might find these tips useful.

## Copy-pasting formatted code from VS Code

A few years ago I learned that copying code from [VS Code](https://code.visualstudio.com/) to Keynote would preserve the formatting of the pasted code, i.e. I could include real code (text) snippets in my slides with syntax highlighting applied to them. That was a game changer! Shortly after learning that, I installed VS Code on my machine and used it solely for that purpose for quite a while (before I eventually made the complete switch from [Sublime Text](https://www.sublimetext.com/)).

To ensure code snippets in my slides have proper and accessible contrast, I typically enable VS Code’s High Contrast theme when I’m writing code for my presentations. (I’ve used the High Contrast theme for daily coding sessions as well for years.)

_Today_, I learned that this VS Code feature is actually a setting (`editor.copyWithSyntaxHighlighting`) that can be enabled and disabled in VS Code editor settings. I learned this after [asking](https://twitter.com/SaraSoueidan/status/1396493483943337984?s=20) for suggestions for alternative ways to highlight code in Keynote after noticing that the code I was copying from VS Code was no longer preserving its formatting. (Thanks to [Aaron Bassett](https://twitter.com/aaronbassett) for [the tip](https://twitter.com/aaronbassett/status/1396495691929821185?s=20)). Turns out the setting wasn’t enabled after the last fresh install I did.

If you search for `copyWithSyntaxHighlighting` in VS Code settings, you can find the option that enables/disables it and turn it on/off:

![The option in VS Code settings that controls whether syntax highlighting should be copied into the clipboard](https://www.sarasoueidan.com/assets/images/vscode-sh.png)

Alternatively, you can manually set the value to `true` or `false` in your user Settings file.

## Using the Slides Code Highlighter Web app

If you don’t use VS Code and don’t want to install it for the sole purpose of copy-pasting code snippets into Keynote, you can use [Slides Code Highlighter](https://romannurik.github.io/SlidesCodeHighlighter/) tool by [Roman Nurik](https://twitter.com/romannurik), kindly [shared by Addy Osmani](https://twitter.com/addyosmani/status/1396494912019861508?s=20) today.

![The Slides Code Highlighter Web app](https://www.sarasoueidan.com/assets/images/slides-code-highlighter.png)

* * *

There are [other](https://twitter.com/jamie_gaskins/status/1396494700874539013?s=20) [approaches](https://twitter.com/frontstuff_io/status/1396498521356918784?s=20) to go around this, and probably more that I may not be aware of, but the above two approaches are simple and fast enough to work for me for now.

Of course, none of these approaches are as convenient as having built-in syntax highlighting in Keynote. Maybe, someday, Apple will add this feature. Until then, we can only make do with what we got.

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.