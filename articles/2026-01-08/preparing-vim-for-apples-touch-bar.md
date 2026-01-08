---
title: "Preparing Vim for Apple’s Touch Bar"
source: "https://csswizardry.com/2017/01/preparing-vim-for-apples-touch-bar/"
publishedDate: "2017-01-09"
category: "css"
feedName: "CSS Wizardry"
---

8 January, 2017

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Background](#background)
2.  [Remap Other Keys](#remap-other-keys)
    1.  [Using CapsLock](#using-capslock)
3.  [Alternatives to `<Esc>`](#alternatives-to-esc)
    1.  [What’s the Difference?](#whats-the-difference)
4.  [Expert Mode](#expert-mode)

Apple recently announced their updated MacBook line, introducing the [Touch Bar](https://developer.apple.com/macos/touch-bar/) that would be replacing the physical function row, including the escape key. If, like me, you’re a Vim user, that might have quite an impact: how best to prepare for it?

## Background

Vim is a [modal editor](https://en.wikipedia.org/wiki/Vi#Interface). Unlike most text editors⁠—⁠where you’re ready to type as soon as it opens⁠—⁠Vim loads itself in _Normal_ mode, and you have to make a conscious choice to enter _Insert_ mode in order to begin typing. Once you’ve finished typing, you need to get yourself back into Normal mode again. To do this, one of the most common options is to hit Escape, or `<Esc>`.

The reason `<Esc>` is used is because Bill Joy, the author of Vim’s predecessor, _Vi_, used an [ADM-3A](https://en.wikipedia.org/wiki/ADM-3A) terminal whose [`<Esc>` key was located where today’s `<Tab>` is](https://en.wikipedia.org/wiki/ADM-3A#/media/File:KB_Terminal_ADM3A.svg)⁠—⁠far more convenient than its top-left location today.

There are actually many other modes besides Insert and Normal, and switching from them back into Normal mode usually requires hitting `<Esc>` as well. Here you can see Vim users’ predicament… the Escape key is very important to us.

How can we switch between modes without having an Escape key?[1](#fn:1)

## Remap Other Keys

For almost as long as I’ve been using Vim⁠—⁠which is [a long time now](https://csswizardry.com/2014/06/vim-for-people-who-think-things-like-vim-are-weird-and-hard/)⁠—⁠I’ve been using `jj` and `jk` to leave Insert mode. These mappings are on the [Home Row](https://en.wikipedia.org/wiki/Touch_typing#Home_row), so always easy to reach, and the letter pairs very rarely (if ever) occur in the English language. If there were words that contained `jj` and `jk` next to each other then I would be flung straight into Normal mode any time I tried to write them. (The reason I haven’t mapped `kk` to Escape is because it does occur within words, e.g. _bookkeeper_. (Although I think that might be the first time I’ve ever actually written the word bookkeeper. (Interestingly, _bookkeeper_ is the only English word that has three consecutive double letters.)))

This means that any time I’m typing, hitting either `jk` or `jj` gets me back into Normal mode and leaves my fingers primed for moving up or down. I always use this instead of `<Esc>` to get from Insert to Normal.

You can do this too by adding these lines to your `.vimrc`:

```
" Make `jj` and `jk` throw you into normal mode
inoremap jj <esc>
inoremap jk <esc>
```

This creates an `i`nsert mode `no`n-`re`cursive `map` from `jj` and `jk` to `<Esc>`. For more information on mapping either run `:help map.txt`, or see [the online documentation](https://vimhelp.appspot.com/map.txt.html).

This only really helps us out if we’re in Normal mode though: if we’re in Visual mode it’s just going to move our selection up or down, and Command mode will literally write the characters out. What else can we do?

### Using CapsLock

A lot of people also like to map CapsLock to `<Esc>`, however that needs to be done at OS level with a number of different third-party tools. I personally don’t like the idea of having a system-wide keyboard change for the sake of just my text editor, but that’s just me.

#### Update 2017-05-24

If you’re running macOS Sierra, you can now natively map CapsLock to `<Esc>`:

![](https://csswizardry.com/wp-content/uploads/2017/05/screenshot-caps-lock.png)

Remap CapsLock to Escape in System Preferences [View full size/quality (120KB).](https://csswizardry.com/wp-content/uploads/2017/05/screenshot-caps-lock-full.png)

## Alternatives to `<Esc>`

Whereas `jj` and `jk` are remapped to _act_ like `<Esc>`, it turns out that there are some native alternatives to `<Esc>` that we can use across modes.

As I mentioned, hitting `jj` and `jk` in Command mode will be interpreted literally, and in Visual mode they will navigate, so in these modes we can use either `Ctrl-[` (or `<C-[`\> in Vim-speak) or `Ctrl-C` (or `<C-c`\> in Vim-speak).

The Vim help even says:

> Note: If your `<Esc>` key is hard to hit on your keyboard, train yourself to use `Ctrl-[`.

So, whenever you’re in any modes other than Insert, reach for `<C-[>` or `<C-c>` instead of `<Esc>`. `<C-c>` is probably going to be a little easier to remember, because you probably recognise it as the cancel signal in from your shell, however there are some subtle differences between the two…

### What’s the Difference?

`<C-[>` acts almost universally identically to `Esc`, so there’s nothing real of note there. What does need a little further mention is `<C-c>`.

`<C-c>` is a cancel signal, so its job is just to get you straight out of whatever you’re doing and back into Insert mode as fast as possible. This means that `<C-c>` will not complete any pending abbreviations or send the `InsertLeave` signal back to Vim (which some of your plugins may depend on).

This doesn’t mean that `<C-c>` is bad or should be avoided; it’s just the most heavy handed of the two. Your mileage may vary.

## Expert Mode

We’ve got alternatives to the `<Esc>` key now, so we can gradually begin phasing it out of our workflow, but how about we make things a little more difficult for ourselves? We could disable the `<Esc>` key fully. Let’s take the training wheels off.

To do this, we can just map `<Esc>` to _no operation_, or `<nop>`. There isn’t a remap-in-every-mode command, so we need to drop both of these into our `.vimrc` which will cover all possibilities:

```
" Map `Escape` to ‘nothing’ in Normal, Visual, Select, Operator-pending modes
noremap: <esc> <nop>
" Map `Escape` to ‘nothing’ in Insert and Command modes
noremap!: <esc> <nop>
```

Again, you’ll want to exercise some caution with this: there can be some unexpected side-effects as outlined in [this Stack Overflow answer](http://stackoverflow.com/questions/8488232/how-to-disable-esc-and-cursor-keys-in-vim/8488537#8488537).

1.  I know the Touch Bar can have a virtual Escape key, but there’s no real replacement for physical feedback. Plus `Esc` is miles away, so it’s better in the longrun to have a more efficient alternative. [↩](#fnref:1)
    

* * *

* * *

* * *

![](https://csswizardry.com/img/content/avatar.jpg)

##### By [Harry Roberts](https://csswizardry.com/about/)

Harry Roberts is an [independent consultant](https://csswizardry.com/consultancy/) web performance engineer. He [helps companies](https://csswizardry.com/services/) of all shapes and sizes find and fix site speed issues.

* * *

* * *

![](https://csswizardry.com/img/css/masthead-small.jpg)

Hi there, I’m **Harry Roberts**. I am an **[award-winning](https://web.archive.org/web/20190630140300/https://thenetawards.com/previous-winners/) Consultant Web Performance Engineer**, **designer**, **developer**, **writer**, and **speaker** from the UK. I **[write](https://csswizardry.com/blog/)**, **[Tweet](https://twitter.com/csswizardry)**, **[speak](https://csswizardry.com/speaking/)**, and **[share code](https://github.com/csswizardry)** about measuring and improving site-speed. You [should hire me](https://csswizardry.com/services/).

* * *

#### Connect

-   [𝕏 (Twitter)](https://twitter.com/csswizardry)
-   [Mastodon](https://webperf.social/@csswizardry)
-   [Bluesky](https://bsky.app/profile/csswizardry.com)
-   [LinkedIn](https://www.linkedin.com/in/csswizardry/)
-   [GitHub](https://github.com/csswizardry)
-   [YouTube](https://www.youtube.com/@csswizardry?sub_confirmation=1)

* * *

#### Projects

#### Next Appearance

-   #### Talk
    
    ![](https://csswizardry.com/img/icons/nl.png) [performance.now()](https://perfnow.nl/): Amsterdam (Netherlands), October 2025

I help teams achieve **class-leading web performance**, providing consultancy, guidance, and hands-on expertise.

I specialise in tackling complex, large-scale projects where speed, scalability, and reliability are **critical to success**.

**CSS Wizardry Ltd** is a company registered in England and Wales. **Company No.** 08698093, **VAT No.** 170659396. [License Information](https://csswizardry.com/license/).