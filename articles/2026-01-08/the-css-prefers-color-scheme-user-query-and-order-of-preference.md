---
title: "The CSS prefers-color-scheme user query and order of preference"
source: "https://www.sarasoueidan.com/blog/prefers-color-scheme-browser-vs-os/"
publishedDate: "2021-10-03"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

I spent some time in [Reeder app](https://reederapp.com/) this morning, catching up with RSS and the latest articles published by my favorite blogs.

I was reading Scott O’Hara’s article about [using JavaScript to detect high contrast and dark modes](https://www.scottohara.me//note/2021/10/01/detect-high-contrast-and-dark-modes.html), which includes a small, very useful script to do exactly what the title says. The output of that script at first looked like it was a “false positive”. But some further investigation led me to learn something new about the `prefers-color-scheme` CSS user query.

Scott’s article includes [a Codepen](https://codepen.io/scottohara/pen/BaZEQOq) to demonstrate the output of the script. The script will check and detect if you currently have high contrast mode or dark mode enabled, and will output the result of the check.

[See the pen](https://codepen.io/scottohara/pen/BaZEQOq) ([@scottohara](https://codepen.io/scottohara)) on [CodePen](https://codepen.io/).

Since JavaScript doesn’t run in Reeder app, I clicked to open the original article on Scott’s Web site. That’s when I saw that the script was reporting that I had dark mode ON, even though I don’t have dark mode enabled on my phone.

Having just recently updated to iOS 15, my first thought that this might be a browser/OS bug or something.

But then it hit me: I _do_ have dark mode enabled… _in Reeder app_. (Reeder has a nice dark mode which I enjoy reading in.) This instantly led me to question whether the media query was picking up _that_ dark mode, instead of the OS-level preference.

When I opened the article on Scott’s Web site, I opened it in Reeder’s in-app browser. Which means that the script was running in that context when it reported that dark mode was ON.

So to test my assumption further, I opened the article in iOS Safari, which is running in the Light scheme mode (set on the OS-level). The script does not report that dark mode is ON in that context.

In order to confirm this behavior, I checked the results of the test in Reeder app on my Mac, which is running dark mode on OS-level. I toggled the theme in Reeder app between Light and Dark to verify the results. Sure enough, the script detected dark mode ON when the app theme was set to Dark, but not when the app theme was set to Light.

![Screenshot of Scott’s article opened in Reeder’s in-app browser. The codepen result says 'high contrast off and dark mode on'. To the left of the image is Reeder’s preferences pane open, showing the current theme set to 'Dark'](https://www.sarasoueidan.com/assets/images/article__prefers-color-scheme/reeder-dark-theme.png)

The `prefers-color-scheme` media query picks up the dark mode set in the app. Note that dark mode is also enabled on the OS level, but the media query is picking up the color theme from the app context.

![Screenshot of Scott’s article opened in Reeder’s in-app browser. The codepen result only says 'high contrast off', indicating that dark mode is not on. To the left of the image is Reeder’s preferences pane open, showing the current theme set to 'Classic' (which is a light theme).](https://www.sarasoueidan.com/assets/images/article__prefers-color-scheme/reeder-light-theme.png)

App color theme taking precedence over OS-level theme. Even though dark mode is enabled on the OS level, the `prefers-color-scheme` media query picks up the light mode set in the app when the app’s theme is the classic light.

In an attempt to verify whether this was a bug or a feature, I checked [the specification](https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme). The spec includes these two paragraphs:

> The method by which the user expresses their preference can vary. It might be a system-wide setting exposed by the Operating System, or a setting controlled by the user agent. \[…\] User preferences can also vary by medium. \[…\] UAs are expected to take such variances into consideration so that prefers-color-scheme reflects preferences appropriate to the medium rather than preferences taken out of context.

That explains it. **UA preference > OS-level preference.** Something to keep in mind for when an “unexpected behavior” happens. A good reminder to always test and check the specifications. Had this not been in the spec, then further investigation might have led to an existing bug report or to the creation of one. Who knows.

* * *

And _that_ was my first #TIL moment of the day.

**Stay curious.**

(Oh and also: **RSS is awesome.** Thank you to everyone providing an RSS feed for their content. _You_ are awesome.)

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.