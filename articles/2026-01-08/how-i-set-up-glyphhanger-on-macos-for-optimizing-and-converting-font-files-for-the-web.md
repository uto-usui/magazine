---
title: "How I set up Glyphhanger on macOS for optimizing and converting font files for the Web"
source: "https://www.sarasoueidan.com/blog/glyphhanger/"
publishedDate: "2021-03-02"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [My previous font conversion workflow](#my-previous-font-conversion-workflow)
2.  [Installing Glyphhanger](#installing-glyphhanger)
    1.  [Down the rabbit hole](#down-the-rabbit-hole)
    2.  [tl;dr: installing all dependencies and running glyphhanger](#setup)
3.  [Optimizing Variable Fonts](#optimizing-variable-fonts)
4.  [More articles on font subsetting](#more-articles-on-font-subsetting)

I can't count the number of times I've tried installing a command line tool on my machine, only to find myself going down a black hole of node modules & dependencies, and a seemingly non-ending list of error messages in the terminal. This would go on for a while before I finally give up and call it quits, only to revert back to find myself googling the name of an online app and using that to do what I need instead.

Yesterday, the same thing _almost_ happened again. I got into another black hole in iTerm as I tried to install a couple of Web font conversion and optimization tools. I almost gave up before I finally managed to _kind of_ get everything working the way I wanted it to. A lot of googling and “stack-overflowing” was involved in this process. I’m sharing my struggles in this post in the hopes that it might help someone out should they get stuck where I did. I also want to have a reference to come back in the future should I ever find myself installing the same tools again.

* * *

Yesterday was just another typical work day. I was setting up the foundation for a new client project. The Web site we’re building uses the Inter font family for the typography. So, I head over to [Google Fonts](https://fonts.google.com/), found [the Inter family page](https://fonts.google.com/specimen/Inter?preview.text_type=custom), and clicked that **“Download family”** button.

As you probably already know, Google Fonts doesn’t supply the fonts in WOFF or WOFF2 formats. When you download a font, you only get TTF font files. Why that is, I don’t know. Jeremy [has wondered the same](https://adactio.com/journal/17480) before. And if you’re a front-end developer you should also know that TTF is not the best choice for serving Web fonts, and that WOFF and WOFF2 are far leaner and more performant.

So, as usual, I set out to convert the TTF files to WOFF and WOFF2 to serve them up in my project.

## My previous font conversion workflow

Normally, I’d head over to one of the online tools available — whatever comes up first in Google search, because I’ve never bookmarked one tool to use at all times, even though I tend to use [Font Squirrel generator](https://www.fontsquirrel.com/tools/webfont-generator) quite often. But that has always felt like too much of a hassle. Ideally, I’d be able make this conversion _within the folder in which they are located_.

So the workflow would look like this:

1.  download font,
2.  unzip & open folder,
3.  convert to WOFF & WOFF2,
4.  copy to project folder and embed on page.

…**instead of:** download font, unzip & open folder, find an online tool, upload font files, wait for conversion, download fonts, unzip & open folder, and then move to project folder and embed on the page. This has always felt like an clunky workflow. It always bothered me that I had to click and switch contexts as much as I did.

* * *

So, yesterday [I saught the help of the amazing Twitter #lazyWeb](https://twitter.com/SaraSoueidan/status/1366275965215793153?s=20) and asked my friends there what they use to convert their font files on macOS. Many responded with links to online tools, which is what I’m wanting to avoid. And some responded with recommendations for a few command line tools.

I imagined I’d want a nice drag and drop tool for this. But command line tools are also pretty handy, and usually very flexible, too. Once you’ve got one set up, it could help streamline your font conversion process. And since I’m much more comfortable in the command line today than I was a few years ago, I thought it was about time I switched to one of those tools.

I was instantly sold on [Filament Group](https://www.filamentgroup.com/)’s [`glyphhanger`](https://github.com/filamentgroup/glyphhanger). “`glyphhanger` is a useful tool when working with web fonts—it can help optimize your font files very quickly”.

Not only does `glyphhanger` convert font files, but it also subsets them (i.e. it removes unnecessary characters from a font file), which is another optimization step you want to make to serve more performant fonts. (That, and the fact that I love the work of the folks at Filament Group, who have always been big proponents of performance.)

The [Github repository](https://github.com/filamentgroup/glyphhanger)’s README file includes installation instructions. And that’s where I started yesterday…

## Installing Glyphhanger

I’m going to start with the process I went through and the issues and errors I got. If you’re not interested in that, you can skip straight to [the solution](#setup).

### Down the rabbit hole

`glyphhanger` is available on npm. According to the reposiroty’s README, installation is as simple as running:

```
npm install -g glyphhanger
```

I ran that command. `glyphhanger` was installed. Yay. So far so good.

Following that line in the README is a note that says that `pyftsubset` is a prerequisite. I wasn’t familiar with what `pyftsubset` is, so I kept on reading. (Honestly, does everyone know what everything is?)

There was a link to another Github repository: [fontTools](https://github.com/fonttools/fonttools). I chose `glyphhanger` for its subsetting feature, and the subsetting functionality requires you to install [fonttools](https://github.com/fonttools/fonttools). So, I had a dependency to install. Reading the README of the fontTools repo only complicated things for me. So, I kept on reading the `glyphhanger` instructions.

(At this point: I couldn’t make the direct connection between `pyftsubset` and fontTools at first. Later on, I googled “pyftsubset fonttools” and learned that `pyftsubset` is an OpenType font subsetter and optimizer, based on fontTools. And that’s why you need to install fontTools.)

The next instruction is:

```
pip install fonttools
```

I had no idea what `pip` is. I decided to run the command before googling anything. Unsurprisingly, that’s when I got my first error.

```
zsh: command not found: pip
```

Oups. OK so apparently I need to have Pip installed on my machine. Not knowing what it is, I started googling. I learned that Pip is a package manager for Python. And that to install Pip, I needed to have Python installed.

Many articles mentioned that macOS already comes with a version of Python installed. So I looked for what I needed to install Pip using the Python that’s already installed. For some reason, none of the commands I found worked. So I thought: “maybe Python _isn’t_ installed on my machine?”. So I opened a new browser tab and started googling for how to install Python.

¯\_(ツ)\_/¯

While I was at it, I was following the rest of the instructions in the README. I didn’t know what depended on what, so I thought I’d try continuing async.

The following instructions are about cloning the Brotli and Zopfli git repositories and installing them because they are required to get WOFF and WOFF2 support:

```
# Additional installation for --flavor=woff2git clone https://github.com/google/brotlicd brotlipython setup.py install# Additional installation for --flavor=woff --with-zopfligit clone https://github.com/anthrotype/py-zopflicd py-zopfligit submodule update --init --recursivepython setup.py install
```

As you might have noticed already, these steps require Python to work, and since I didn’t have Python working for me at this point yet, I got quite a bunch of errors in the terminal. Trying to install Brotli and Zopfli like that confirmed to me that Python maybe is, indeed, _not_ installed by default.

fontTools is also a Python project, which, naturally, requires Python to work. (Duh.)

So it was very obvious at this point that what I needed to focus on was getting Python and Pip set up if I wanted any of this to work.

After googling quite a bit and jumping between articles and Stack Overflow Q&As, I learned that there are multiple versions of Python (obviously), the latest (I think) is Python 3. Now this is where the weirdness started. After installing Python 3, if I wanted to run a Python command, I needed to use `python3` followed by the command. Not `python`. According to [a nice article I found later](https://www.addictivetips.com/mac-os/install-python-3-on-macos/), “in order to send commands to Python 3, you will need to enter `python3` in the terminal. If you enter `python`, the command will be sent to Python 2.”

So anyway, I installed Python using `brew`:

```
brew install python3
```

Yep. That worked. I don’t remember if I had any issues here. But then again, I had so many issues that I don’t remember when and where I got each.

¯\_(ツ)\_/¯

**Here’s a quick tip:** If you, like me, want to avoid `brew` updating every time you use the `brew` command, you can use `HOMEBREW_NO_AUTO_UPDATE=1`. I have a snippet setup so that every time I type `brew` and press TAB, it autocompletes to `HOMEBREW_NO_AUTO_UPDATE=1 brew`, so that I can run whatever brew command I want without allowing it to update. I learned this a few months ago when I got sick of brew updating every time I wanted to run a quick command. I googled, and found this tip on Stack Overflow and have been using it since.

Next, I needed to install Pip. Once again, I found several articles, each mentioning a different way to do it. To be quite honest, I don’t remember which one of those I ended up following. I did learn though that with Python 3 comes Pip 3.

I installed Pip 3.

At this point, I realized I should have everything I needed to continue going through the README instructions. So, again, I tried installing `fonttools` using `pip install fonttools`. After getting yet more errors, I learned that, just like `python3` I need to use `pip3` instead of `pip`.

```
pip3 install fonttools
```

That worked. So I got Python, Pip, and fontTools out of the way.

To generate optimized WOFF and WOFF2 font files, I needed Brotli and Zopfli. I have no idea why I still got some errors by following the installation instructions in the README (cloning the git repos for each). So, more googling ensued. Turns out, installing Brotli and Zopfli was much easier now that I had Pip installed. I didn’t even need to clone the git repositories like the README instructed. All I needed is these two commands:

```
pip3 install brotlipip3 install zopfli
```

And _Boom!_ all dependencies were installed. _Now_ when I used `glyphhanger` to convert my font files, it finally generated the optimized TTF, WOFF, and WOFF2 files.

So, to sum up:

### tl;dr: installing all dependencies and running glyphhanger

1.  Install `glyphhanger`:

```
npm install -g glyphhanger
```

1.  Install Python 3:

```
brew install python3
```

1.  Install pip. Python 3 comes with pip 3. Follow the instructions in [this article](https://www.addictivetips.com/mac-os/install-python-3-on-macos/) to install pip.
    
2.  Install fontTools using pip:
    

```
pip3 install fonttools
```

1.  Install Brotli and Zopfli using pip:

```
pip3 install brotlipip3 install zopfli
```

1.  And then use `glyphhanger` to subset and create optimized formats of your TTF font files:

```
glyphhanger --subset=*.ttf
```

Zach Leatherman has [a post](https://www.zachleat.com/web/glyphhanger/) that introduces `glyphhanger` with examples of how to use it. You’ll want to read his article and the repository’s README for further customizations and usage options because there are quite a few.

## Optimizing Variable Fonts

`glyphhanger` also generates WOFF2 files for Variable fonts. The file size of the subsetted Variable Inter WOFF2 file generated by `glyphhanger` is slightly smaller than the file size generated by Google’s [woff2 library](https://github.com/google/woff2) (302KB compared to 308KB). It does not break the Variable axes of the font like other online tools might, so it is safe to use it in your projects.

**Useful resources:**

-   [How to use variable fonts in the real world](https://clearleft.com/posts/how-to-use-variable-fonts-in-the-real-world)
-   [How To Convert Variable TTF Font Files to WOFF2](https://henry.codes/writing/how-to-convert-variable-ttf-font-files-to-woff2/) — this post explains how to set up the woff2 library and use it to generate WOFF2 from a Variable TTF font file. I’ve found it to be more helpful than the library’s README file. Make sure to follow the steps and commands to the letter.

* * *

While I finally managed to get `glyphhanger` set up and can now use it generate optimized Web font files, it still bugs me that I am _still_ getting an error when using it. My terminal looks like this every time I run the command:

![Screenshot of the errors shown in the terminal after running the glyphhanger command to subset and generate font files.](https://www.sarasoueidan.com/assets/images/glyphhanger-error.png)

I googled a lot trying to find what that error means and where it’s coming from. I would love to get a clean output every time I run `glyphhanger`. I mean, it’s such a great tool. I want the output to be just as great. But after spending _quite_ some time on getting it to work, I wasn’t left with enough patience to figure the solution out. If you have an idea what might be causing it, please do [let me know](https://twitter.com/SaraSoueidan) — I’d appreciate it a lot.

✨ **UPDATE:** ✨ Twitter came to the rescue once again. [@GentlyLurk](https://twitter.com/LurkGently) figured out that the issue is coming from the version of `shelljs` used in `glyphhanger`, and kindly [shared the fix](https://twitter.com/GentlyLurk/status/1366695429212172288?s=20):

1.  Run `which glyphhanger` in the command line. This should give you the path to the folder inside which `glyphhanger` resides. (My result was `/usr/local/bin/glyphhanger`; it’s a hidden folder so I had to `cmd+shift+.` to view it.)
2.  Find the `package.json` file in the folder and change the version of `shelljs` to `0.8.4`, then
3.  run `npm install` (inside the folder)

Now the errors are finally gone. 🥳 If I run `glyphhanger --subset=Inter-Light.ttf` for example, the result I get in the command line looks like this:

![Screenshot of the terminal after running the glyphhanger command showing only the result of generating 3 optimized font files, with no errors whatsoever.](https://www.sarasoueidan.com/assets/images/glyphhanger-no-errors.png)

(Look at those WOFF2 savings!)

🎉🎉🎉

✨ **UPDATE #2 (March 11, 2021):** ✨ [Zach announced](https://twitter.com/zachleat/status/1370028833882132481) the release of glyphhanger v4, which includes dependency updates that fix the console warning issue that I had and that required the manually changing the `shelljs` version in the package.json file. So if you follow the installation steps above, you should have a clean console output without the extra hassle. 🎉

## More articles on font subsetting

-   [How I subset web fonts](https://fuzzylogic.me/posts/how-i-subset-web-fonts/)
-   [Developing a Robust Font Loading Strategy for CSS-Tricks](https://www.zachleat.com/web/css-tricks-web-fonts/)

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.