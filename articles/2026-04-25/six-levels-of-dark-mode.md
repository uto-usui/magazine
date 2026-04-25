---
title: "Six levels of dark mode"
source: "https://cssence.com/2024/six-levels-of-dark-mode/"
publishedDate: "2026-04-23"
category: "design"
feedName: "Sidebar"
---

1.  [Barebone](#level-1-barebone)
2.  [Basic](#level-2-basic)
3.  [Benign](#level-3-benign)
4.  [Bold](#level-4-bold)
5.  [Bisectional](#level-5-bisectional)
6.  [Ballistic](#level-6-ballistic)
7.  * * *
    
    [Beyond](#level-7-beyond)
8.  [Beguiling](#level-8-beguiling)

Being reminded of the [visually hidden debate](https://cssence.com/2024/native-visually-hidden/) hasn’t been the only thing that happened to me on this year’s [CSS Naked Day.](https://cssence.com/2024/css-naked-day/)

I’ve observed that on pretty much all the sites I’ve visited, dark mode was rather absent after the styles had been removed. This got me thinking, maybe it’s time to talk about the **six levels of dark mode.**

A less catchy—but more accurate—title for this blog post would have been “six levels of color scheme switching”. Oh well. Most of the example code in this article shows _the dark side,_ so the title does make sense. Just keep in mind that the other way around also works.

Enough said, let’s get to it.

## Level 1:  
Barebone

This level is as easy as it gets, but apparently the underlying directive was missing on the sites mentioned in the introduction. You can opt into light/dark mode differentiation even without a single line of CSS, which is great in general, but especially on [April 9.](https://cssence.com/about/css-naked-day/)

Simply add the following meta tag to the document head, and you are good to go.

```
<meta name="color-scheme" content="light dark">
```

Whenever a web page contains this tag, the browser knows it should adhere to the user’s color scheme preference. The order of the entries in the content attribute matters, at least in theory. Users without a preference for a color scheme would get the first in the space-separated list. But the settings in today’s operating systems lack the option to \*not\* choose one, so you’ll always end up with the one that matches the OS.

You could just specify a single entry in the content attribute. Doing so would enforce the corresponding scheme, without taking the user preference into account, but that’s another story.

To some degree, the meta tag is the HTML equivalent of our next level.

## Level 2:  
Basic

Let’s move on to the CSS way of light/dark mode differentiation.

```
html {
	color-scheme: light dark;
}
```

You won’t need this declaration if you already have the meta tag in the DOM. Unless you have no control over the HTML (e.g. if your content comes from a CMS, poor you), I encourage you to always use the meta tag. This gives the browser a `<head>` start, as it already knows about the color scheme directive before any CSS has been parsed.

Both ways essentially give you the option to piggyback on user agent default styles, and the light and dark mode that comes with them. Now add some CSS, but maybe limit yourself to the use of [CSS system colors](https://developer.mozilla.org/en-US/docs/Web/CSS/system-color) while doing so, and you will already be able to achieve quite neat designs. Heck, the [page style switcher](https://cssence.com/settings/#page-style) on this site has entries named ‘None’ and ‘Basic’, they correspond to levels 1 and 2.

Which brings us to the point where the two ways differ. Unlike the meta tag, which always applies to the whole document, the CSS `color-scheme` declaration can be set anywhere, not just on the root element. This enables some additional usage scenarios, but I’ll address those in [another blog post.](https://cssence.com/2025/nesting-color-schemes/)

## Level 3:  
Benign

We are past the basic stage, but still in shallow waters. A rather recent addition to CSS, namely the `light-dark()` color function, allows for simple light/dark mode adjustments.

```
html {
	background-color: light-dark(black, white);
	color: light-dark(white, black);
}
```

The function takes two arguments, both should be colors. The first will be applied in light mode, you may guess what the second argument is for. Whether you simply specify actual colors, or even throw in custom properties that resolve in colors, is up to you.

This is the only part level in this whole blog post where [browser support is not great](https://caniuse.com/mdn-css_types_color_light-dark) at the time of writing, but we’ll get there.

## Level 4:  
Bold

Moving on to the good old media query.

```
@media (prefers-color-scheme: dark) {
	html {
		background-color: black;
		color: white;
	}
}
```

Whether you query for `light` or `dark`, the media query allows for maximum customization, as you are not limited to merely changing colors. You can put anything in there. Wanna use a filter to desaturate images in dark mode? Go for it. Replace box shadows with outlines? Sure.

## Level 5:  
Bisectional

You can use the media query in HTML too. Adding it as a `media` attribute allows you to create style sheets for each scheme.

```
<link media="screen and (prefers-color-scheme:light)" rel="stylesheet" href="light.css">
<link media="screen and (prefers-color-scheme:dark)" rel="stylesheet" href="dark.css">
```

Dedicated files make sense if you do a lot of customization. The browser may ignore any CSS file that does not match the query, so there’ll be one less thing to download.

## Level 6:  
Ballistic

Obviously JavaScript wants to play a part in this too. You can use the `matchMedia` function to query for either light or dark scheme, just like any other media query.

```
const isDarkScheme = window.matchMedia('(prefers-color-scheme:dark)');
```

And then do whatever.

* * *

In reality, you don’t stay within one lane, you can mix and match the techniques from all the aforementioned levels.

## Level 7:  
Beyond

You don’t need to solely rely on the user preference, you can build a **color scheme switcher.**

If you do, be careful, the preference for either light or dark mode is not a boolean state, because initially you want to default to ‘Automatic’, i.e. adhere to `prefers-color-scheme`. By building a [scheme switcher](https://cssence.com/settings/#color-scheme) on top of that, you allow the user to opt into one of the three modes.

![A color scheme switcher; its dropdown shows entries named ‘Automatic (Default)’, ‘Dark’ and ‘Light’.](https://cssence.com/2024/six-levels-of-dark-mode/level-6.webp)

If you already knew everything you’ve just read, I’ve got one more for you.

## Level 8:  
Beguiling

When web developers create a level 7 **color scheme switcher**, they usually either add a class like `.dark` to the HTML element, sometimes even a fancy `data-theme="dark"` attribute.

Well, we no longer need either one, because we can use `:has()` to query the real deal.

```
html:has(meta[name="color-scheme"][content="dark"]) {
	--color-bg: black;
	--color-text: white;
}
```

Check out my accompanying piece [»Color scheme switcher, 2024 edition«](https://cssence.com/2024/color-scheme-switcher/) to see it live.

I definitely saw a couple more sites that had this in their `<head>`s!

But yes agreed, there’s so much CSS power available lately. When starting a new site from scratch with new styles, you can bake in light and dark modes really easily now. 🙂

In reply to: @sarajw@front-end.social.

Good to hear. Also, seems like we’ve been visiting different sites. 😅

Would a CSS Naked Day webring make sense? 🤔

In reply to: @CSSence@mas.to.

it seems a bit specific for just naked day… oh, unless it’s done with a nav bar and iframes or something!! Old school…

In reply to: @sarajw@front-end.social.

Frameset? No, wait, that could backfire…  
[adactio.com/journal/17916](https://adactio.com/journal/17916)

In reply to: @CSSence@mas.to.

CSS naked ring? Awesome! I’m in!

Could it be a regular ring but with an url parameter indicating you need to get naked?

Might work for js-naked day too @zachleat@zachleat.com.

BTW I’m pretty sure my site did support dark/light preference correctly during naked day. 😉

In reply to: @villepreux@mastodon.social.

> Dark & light color-scheme preference still respected.

Looks like it. 😀👍

Well done! Plus a lot of hybrid levels are there. Variables with colour changer JS, hidden automatic colour scheme:  
[gist.github.com/iamdtms/ddc4e556805e60652c21c06281d5b3c2](https://gist.github.com/iamdtms/ddc4e556805e60652c21c06281d5b3c2)

One thing to note is that up until quite recently (perhaps the latest version), Safari did not have accessible link colours for dark mode. During last year’s CSS Naked Day, I noticed the issue on my website and decided to get rid of the meta tag and just use the light colour scheme. This year I added the meta tag back even though I knew that might create an inaccessible experience for some who might be using the older versions of Safari. I did notice that text boxes did not have any visible borders in Safari with dark mode.

I’ve been starting to think that in the future I might include enough styles to keep my site accessible for CSS Naked Day, since User Agent styles are not fully accessible (even with correct, semantic HTML).

In reply to: @knowler@sunny.garden.

Yeah, good point. Then again, if you look out there realizing how many websites aren’t accessible all year round, April 9 will be the least of our worries.

In reply to: @CSSence@mas.to, @knowler@sunny.garden.

I almost think seeing the a11y fails on that day is sort of part of it. But it’s good of you to strive to keep it working well for everyone.

I’m curious why there is `screen and …` in the Bisectional example. The default (when you have no prefix) would be `all and …`, which has the same effect unless you want to hide styles from printers.

In reply to: @pepelsbey@mastodon.social.

Yes, hiding it from printers was the idea, I would assume they are anyhow taken care of in either a theme-independent core style sheet, or a dedicated print style sheet.

So I guess I wanted to be on the safe side, #DarkMode for printers could waste a lot of ink. 😉

In reply to: @CSSence@mas.to.

I toggled the system dark more and printed a sample page with the default dark mode styles enabled via the color-scheme. I even tried to enable the “background graphics” option. All I got was black text on white paper. It seems like all browsers don’t apply them to print.

In reply to: @pepelsbey@mastodon.social.

Interesting. I also ran a test: I opened my [media queries test page,](https://cssence.com/2024/media-queries-including-level-5/) in the print preview `prefers-color-scheme` always reports `light`. Which makes sense. And I guess that’s also the cause for your result. Good to know. (I’ve only been able to test Firefox and Chromium.)

In reply to: @CSSence@mas.to.

It’s a bummer, though, if you have black paper and white ink, you know. 😄

In reply to: @pepelsbey@mastodon.social.

🤣

In reply to: @pepelsbey@mastodon.social, @CSSence@mas.to.

dark mode printers!

### Get involved

[Have your say on Mastodon,](https://mas.to/@CSSence/112281217350850297) or simply [share this article.](mailto:?subject=Six%20levels%20of%20dark%20mode%20-%20CSSence.com&body=https%3A%2F%2Fcssence.com%2F2024%2Fsix-levels-of-dark-mode%2F)