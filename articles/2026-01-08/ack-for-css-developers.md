---
title: "Ack for CSS Developers"
source: "https://csswizardry.com/2017/01/ack-for-css-developers/"
publishedDate: "2017-01-18"
category: "css"
feedName: "CSS Wizardry"
---

17 January, 2017

Written by **Harry Roberts** on **CSS Wizardry**.

Table of Contents

Independent writing is brought to you via my wonderful [Supporters](https://csswizardry.com/supporters/).

1.  [Installing and Configuring](#installing-and-configuring)
    1.  [`.ackrc`](#ackrc)
    2.  [A Note on Regex](#a-note-on-regex)
2.  [Find Decimal Pixel Values](#find-decimal-pixel-values)
3.  [Find IDs](#find-ids)
4.  [Background Shorthand](#background-shorthand)
5.  [Find Unitted Zeroes](#find-unitted-zeroes)

[Ack](http://beyondgrep.com/) is a powerful and very user-friendly alternative to grep. Designed for programmers, it’s purpose-built to run searches over source code. By default it will ignore your `.git` or `.svn` directories, and you can tell it which types of files you’d like it to search in. For example:

```
$ ack --html "foo"
```

…will search for the string `foo` only in your HTML files.

```
$ ack --html --js --css "bar"
```

…will search for the string `bar` in your HTML, JS, and CSS files. Neat, huh?

Get into the habit of always wrapping your search terms in quotes. Without this, we run the risk of our search terms and regexes being interpreted as command line arguments.

I use Ack as part of auditing a project, or when trying to find my way around a larger codebase. It’s also pretty useful for tracking down bugs and oddities. In this short post, we’ll look at a small number of ways CSS developers can make use of Ack in their workflow.

## Installing and Configuring

If you’re on a Mac, you can install Ack using Homebrew:

```
$ brew install ack
```

As simple as that!

For other operating systems, check [the official installation guide](http://beyondgrep.com/install/).

To use Ack, you’ll probably want to `cd` into the root of your project, or the root of your CSS directory. Ack searches all files on and below your current location. Here’s what my terminal looks like whilst writing this article:

```
harryroberts in ~/Sites/csswizardry.com on (master)
» ack <search term>
```

### `.ackrc`

Ack is extensible and configurable, making use of its own `.ackrc` dotfile. This lives in your home directory, alongside your `.vimrc`, `.bashrc`, etc. Here are some things that I added to mine that you’ll probably like as well:

```
--ignore-directory=is:node_modules
--ignore-directory=is:bower_components
--type-set=sass:ext:scss,sass
--type-set=markdown:ext:md,markdown
```

Here I’m telling Ack to exclude my `node_modules` and `bower_components` directories, as well as adding Markdown and Sass as new filetypes. This means that if I run:

```
$ ack --sass "foo"
```

…Ack will search every `.scss` and `.sass` file in my project. To see what filetypes Ack will search, run:

```
$ ack --help-types
```

If you think something is missing, add it to your `.ackrc`.

### A Note on Regex

To use Ack, you will need to know a little bit of regex. Don’t worry though: my regex is pretty weak and even I can still manage.

## Find Decimal Pixel Values

```
$ ack --css "\d*\.\d*px"
```

We don’t want to have any decimal places in any of our pixel values (e.g. `7.5px`), so let’s search for those:

-   `\d*` will match zero or more (`*`) `\d`igits. The reason I’m looking for zero or more is because I want to find both `.5px` or `11.2px`.
-   `\.` will match a literal full-stop/period character.
-   `\d*` is the same as before. This means I will find both `97.856px`, or `52.px` (which is actually just an error).
-   `px` will match the literal string `px`: I don’t want to look for ems or rems or percentages because they accept float values.

See [the demo](https://regex101.com/r/JhFQD3/1).

## Find IDs

We definitely [shouldn’t be using IDs in CSS](http://cssguidelin.es/#ids-in-css), so let’s look for them:

```
$ ack --css -i "#[-_a-z][-_a-z0-9]*(?=[^}]*\{)"
```

Firstly, notice the `-i` flag. This tells Ack to run our regexes case insensitively.

This pretty complex regex does a few things:

-   `#` finds a literal hash (`#`) symbol.
-   `[-_a-z]` finds a single hyphen (`-`), underscore (`_`), or case insensitive `a-z`, denoting a valid start to an ID.
-   `[-_a-z0-9]*` does almost exactly the same as above, except this time we’re looking for zero or more (`*`) characters, and for digits as well (`0-9`). We’re doing this separately from the previous lookup because IDs can’t start with numbers.
-   `(?=[^}]*\{)` is running a positive lookahead, just checking that we encounter an opening curly brace (`\{`) next, and not a closing one (`[^}]`).

This means we will find IDs, but not hex values.

**N.B.** Because of Sass’ nesting abilities, nested code containing hex values becomes a false positive. As such, only run this regex over your compiled CSS. Please refer to [the demo](https://regex101.com/r/BhVEcz/1).

## Background Shorthand

```
$ ack --css -i "background:\s*#[a-f0-9]*;"
```

I [recently wrote](https://csswizardry.com/2016/12/css-shorthand-syntax-considered-an-anti-pattern/) about how I consider background shorthand syntax an anti-pattern, so we should probably look for that whilst we’re here.

-   `background:` finds the literal string background followed by a colon (`:`).
-   `\s*` matches zero or more units of whitespace between the colon and the beginning of a hex value.
-   `#` is the literal hash symbol (`#`), the beginning of a hex value.
-   `[a-f0-9]*` is a valid hex value (e.g. `#f00`, `#BADA55`). Setting the `-i` flag means that our regex is now case insensitive.
-   `;` matches the literal semi-colon character (`;`) which denotes the termination of the declaration.

See [the demo](https://regex101.com/r/1gqf73/1).

## Find Unitted Zeroes

```
$ ack --css "\b0(px|r?em)"
```

This is a little pedantic of me, but putting a unit (e.g. `px`) on a zero (`0`) is redundant: zero pixels is the same distance as zero lightyears. Let’s look for them.

-   `\b` looks for a word boundary. This means we’re looking for zeroes at the start of a string (i.e. `0px`) and not midway through one (e.g. `210px`).
-   `0` is looking for the literal zero character (`0`).
-   `(px|r?em)` looks for the literal strings `px` or `rem` or `em`.
-   `r?em` makes the `r` optional, so we can match either `rem` or `em` at the same time.

See [the demo](https://regex101.com/r/EoH8Z6/1).

Those are just a few of the most common things I search CSS files for as part of an audit, but of course Ack can help me find all manner of things, from finding specific classes, properties, selectors, or values, right the way to finding errors and bugs.

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