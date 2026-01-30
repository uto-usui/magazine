---
title: "Local Testing on an iPhone"
source: "https://www.joshwcomeau.com/blog/local-testing-on-an-iphone/"
publishedDate: "2020-05-26"
category: "frontend"
feedName: "Josh W Comeau"
author: "Josh W. Comeau"
---

Introduction

I have a confession to make: for the longest time, I didn't test my web applications on mobile devices very often. 🙈

A few years ago, I decided to figure out the easiest, most reliable way to test my development code on real mobile devices. And then I wrote this blog post, so that I had a handy reference for how to do it.

This tutorial shows you how to **work with localhost on an iPhone**. We'll discover an ideal workflow for making sure our products are rock-solid on iOS. It might be easier than you think!

I was finally pushed over the edge when I ran into everybody's least favourite troublemaker, the _horizontal scrollburglar_:

It's burgled so much of my time over the years!

This recurring nightmare was made extra-annoying by the fact that it wasn't reproducible from a desktop computer. Not even when emulating the device in-browser!

![The Chrome emulator, showing a different post from this blog](https://www.joshwcomeau.com/images/local-testing-on-an-iphone/chrome-emulator.png "Lulled into a false sense of security by the curiously flawless Chrome mobile emulator")

I needed to check this out on an actual phone to see what the heck was happening. This is a two-step process:

-   Load `localhost:3000` on my mobile device
    
-   Leverage the developer tools so that I can inspect the DOM and figure out the culprit.
    

Let's see how I did it.

## [Link to this heading](#accessing-localhost-on-an-iphone-2)Accessing localhost on an iPhone

My initial strategy was put my phone and computer on the same network, figure out my computer's IP, and visit it directly. I was able to get this to work eventually, but it took some tinkering, and requires tool-specific configSpecifically, you need to host your dev server on \`0.0.0.0\`, instead of \`127.0.0.1\`

With Gatsby, you can do this with a flag: \`gatsby develop --host 0.0.0.0\`

. I wanted something more universal than that.

Next, I looked into _network sharing_. There is supposed to be a way to selectively enable access to a USB-connected iPhone. This process was a hot mess, with several scary-sounding prompts:

![Two prompts, showing that dire things might happen if I continue, like my ISP revoking my internet access.](https://www.joshwcomeau.com/images/local-testing-on-an-iphone/weird-prompts.png)

I'll spare you the rabbit-hole story, but even after agreeing to these prompts, I did not find success.

Happily, there's a brighter path. We can expose a specific port to the net, and access it like any other page!

There are lots of tools to do this, but my favourite is [ngrok(opens in new tab)](https://ngrok.com/).

### [Link to this heading](#what-is-ngrok-3)What is ngrok?

ngrok is known as a _tunnelling service_. You run some software on your computer, and it burrows through the firewall and your router settings and makes a specific port publicly-available, while the process is running.

There are multiple services like this, including [localtunnel(opens in new tab)](https://github.com/localtunnel/localtunnel) and [serveo(opens in new tab)](https://serveo.net/). In my experience, ngrok has been the most reliable.

There is a paid version, but the free tier is more than sufficient for what we need.

### [Link to this heading](#getting-set-up-with-ngrok-4)Getting set up with ngrok

Here are the steps to get set up with ngrok:

-   On the dashboard, locate your _authentication token_. Copy it to the clipboard.
    

-   Unzip it. Unlike many desktop applications, this one doesn't need to be installed. It provides a process you can run through the command line utility. Most developers keep it in their home directory (`~/ngrok`).
    
-   Open a terminal, and `cd` to this directory.
    
-   Authenticate by running `./ngrok authtoken <YOUR_AUTH_TOKEN>`. Paste the authentication token we copied earlier.
    

With this, you should be all set up to tunnel out of your network!

### [Link to this heading](#using-ngrok-5)Using ngrok

We can expose our local development server to the internet using this command:

```
$ ./ngrok http 8000
```

The first argument is for the _protocol_; It supports HTTP and HTTPS, depending on your dev server. The second argument is the _port_; because my blog is a Gatsby site, it runs on port `8000`.

You should see some output like this:

![Terminal screenshot showing the forwarding URL that ngrok provides](https://www.joshwcomeau.com/images/local-testing-on-an-iphone/ngrok-output.png)

The URL provided under _forwarding_ is how we'll access it. On my iPhone, I can now visit `http://2ac5163f.ngrok.io`, and it'll load my local dev blog!

## [Link to this heading](#debugging-on-an-iphone-6)Debugging on an iPhone

Being able to _access_ localhost is a great start, because we can verify that an issue is occurring. But it doesn't really help us fix it! We need to poke around under the hood.

In my case, I want to be able to figure out which element is stretching the bounds of the container, but there are many reasons you may wish to debug on mobile:

-   View any console logs, warnings, and errors
    
-   Clear local storage
    
-   Profile the performance on a real mobile device
    

Sadly, all iPhone browsers are secretly SafariYes, even Chrome! It's all a lie., so there's no way for us to use the Chrome/Firefox developer tools we know and love. Happily, Safari devtools are actually pretty decent! And they're similar enough that the learning curve shouldn't feel too steep.

### [Link to this heading](#initial-setup-7)Initial setup

On your iPhone, go to **Settings › Safari › Advanced**, and ensure Web Inspector is enabled:

![The iPhone Safari settings, showing the Web Inspector toggle checked on](https://www.joshwcomeau.com/images/local-testing-on-an-iphone/safari-settings-circled.png "For bewildering reasons, this switch is disabled by default!")

Next, we'll need to enable the _Develop_ menu in Safari, on our computer. Go to **Safari › Preferences › Advanced**, and tick the checkbox way at the bottom:

![The Safari 'advanced' options, showing a checkmark labeled “Show Develop menu in menubar”.](https://www.joshwcomeau.com/images/local-testing-on-an-iphone/safari-enable-develop.png)

### [Link to this heading](#connecting-and-testing-8)Connecting and testing

In order to let Safari (desktop) access Safari (mobile), we need to connect our phone with a lightning cable. I always forget this step! Don't be like me.

Unlock your phone so that the computer can access it. You may experience several annoying iTunes popups. Brace yourself.

With everything connected, we're all set! On your iPhone, visit the URL we got from ngrok (it should look like `http://abc123.ngrok.io`).

In Safari, let's select **Develop › Your iPhone Name › abc123.ngrok.io**:

![Menu access in safari](https://www.joshwcomeau.com/images/local-testing-on-an-iphone/develop-menu.png)

This will open _remote_ developer tools!

![The Safari developer tools, Elements pane](https://www.joshwcomeau.com/images/local-testing-on-an-iphone/devtools-annotated.png)

## [Link to this heading](#building-the-habit-9)Building the habit

Now that you've successfully set everything up, the process for doing mobile debugging is much shorter:

1.  Plug your iPhone into your computer
    
2.  Run `ngrok http 8000` (or whichever port your dev server runs at)
    
3.  Visit the URL on your iPhone
    
4.  Open the developer tools with **Develop › Phone Name › abc123.ngrok.io**
    

It's important to get into the habit of testing on mobile devices early and often. This solution is low-friction enough that I expect I'll take advantage of it quite often!

## [Link to this heading](#ios-simulating-10)iOS Simulating

A couple folks reached out to let me know about something neat: XCode's iOS Simulator can be used for the same purposes, including debugging via desktop Safari's devtools.

This has a couple trade-offs. Here's what I see as the pros:

-   Works if you don't own an iPhone!
    
-   Test it on iPads, as well as differently-sized iPhones
    
-   No fussing with finding a lightning cable and firing up ngrok; possibly quicker/lower-friction!
    

And some cons:

-   While it's better than browser emulation, it's still not perfect; I imagine that not all issues will be reproducible from the simulator.
    
-   Doesn't give you the same perspective. Using a phone with touch is very different from using a screen with a mouse.
    
-   Doesn't tell you anything about your app's on-device performance.
    

I think these two tools serve slightly different purposes, but they're both worth keeping in the toolbox!

[Learn how(opens in new tab)](https://mediatemple.net/blog/web-development-tech/quick-tip-debug-ios-safari-true-local-emulator-actual-iphoneipad/) to use the iOS simulator.

## [Link to this heading](#next-steps-11)Next steps

![Picture of the Xiaomi Redmi 7A, a smartphone](https://www.joshwcomeau.com/images/local-testing-on-an-iphone/redmi.png)

Most of the world uses Android phones, not iPhones. I recently ordered a Xiaomi Redmi 7A, a popular entry-level smartphone in India (MSRP ~$80 USD). I'll be writing a companion piece for Android phones, so **be sure to subscribe** if you're interested! You'll find a form just down there ↴

### Last updated on

March 14th, 2025