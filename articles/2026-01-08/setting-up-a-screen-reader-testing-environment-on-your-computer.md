---
title: "Setting up a screen reader testing environment on your computer"
source: "https://www.sarasoueidan.com/blog/testing-environment-setup/"
publishedDate: "2022-11-24"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [macOS vs Windows screen readers](#macos-vs-windows-screen-readers)
2.  [Setting up Windows screen readers](#setting-up-windows-screen-readers)
    1.  [Download NVDA screen reader on Windows](#download-nvda-screen-reader-on-windows)
        1.  [Visualize NVDA’s current focus target with Visual Highlight](#visualize-nvda%E2%80%99s-current-focus-target-with-visual-highlight)
        2.  [Enable NVDA speech viewer](#enable-nvda-speech-viewer)
        3.  [Setup keyboard layout for testing with NVDA on a Mac](#setup-keyboard-layout-for-testing-with-nvda-on-a-mac)
    2.  [Map the Insert key to another key on Mac](#map-the-insert-key-to-another-key-on-mac)
        1.  [Setting up Karabiner Elements on macOS](#setting-up-karabiner-elements-on-macos)
3.  [Virtual accessibility testing in your browser](#virtual-accessibility-testing-in-your-browser)
4.  [Enable keyboard accessibility on a Mac](#enable-keyboard-accessibility-on-a-mac)
5.  [Which browser and screen reader pairings should you test on?](#which-browser-and-screen-reader-pairings-should-you-test-on%3F)
    1.  [On macOS](#on-macos)
    2.  [On Windows](#on-windows)
    3.  [Mobile screen readers](#mobile-screen-readers)
6.  [Guides to browsing and navigating content with a screen reader](#guides-to-browsing-and-navigating-content-with-a-screen-reader)
7.  [Screen reader keyboard shortcut cheatsheets](#screen-reader-keyboard-shortcut-cheatsheets)
8.  [Resources and recommended reading](#resources-and-recommended-reading)

When you’re designing and developing for accessibility, performing manual testing using a screen reader is important to catch and fix accessibility and usability issues that cannot be caught by automated accessibility checkers. You can catch the majority of issues by performing testing **using the screen readers that your users rely on the most.**

If you haven’t already, you want to set up a screen reader testing environment on your computer, and invest a little learning time to get acquainted with the most relevant screen reader commands and shortcuts that you will need to perfom basic manual testing with a screen reader on a day-to-day basis.

In this chapter, we will walk through setting up a screen reader testing environment on your computer. We will discuss software options you have to do that (both free and premium), and **what screen reader and browser combinations to test with.** We will also go through enabling accessibility testing on a Mac (which requires a little manual work to do). And finally, we will learn about a few useful features and cheasheets that make testing a little friendlier when you’re just getting started.

## macOS vs Windows screen readers

Both Windows and macOS come with screen readers built into them that are available for free. The built-in Windows screen reader is called **Narrator**. The macOS built-in screen reader is **VoiceOver**.

According to [WebAIM’s screen reader user survey](https://webaim.org/projects/screenreadersurvey9/), **more than 90% of screen reader users reported being on Windows**. And according to the same survey, **the two most popular screen readers are [JAWS (Job Access With Speech)](https://www.freedomscientific.com/Products/Blindness/JAWS) and [NVDA (NonVisual Desktop Access)](https://www.nvaccess.org/)** (which are both Windows screen readers), followed by VoiceOver.

If you’re already on Windows or if you own a Windows machine, you’re already halfway through setting up your screen reader-testing environment.

If you’re on a macOS computer, **you shouldn’t test solely with VoiceOver.** It is more opinionated and does not always reflect what the majority of screen reader users experiences.

If you’re on macOS and you have no access to a Windows machine (whether an actual machine or a virtual one), you can test your work with Windows screen readers using any modern browser instead. We’ll get back to this in another section.

## Setting up Windows screen readers

JAWS is the most popular and feature-rich screen reader. a JAWS license isn’t free and is faily expensive. But you can still use it to perform testing for your work. **JAWS will run in full in demo mode for 40 minutes at a time, until it is activated on your computer.** While this is a limitation for longer testing sessions, the 40 minutes are usually more than enough to perform basic testing.

**NVDA is a feature-rich, _free_ alternative to JAWS**. We will install and set up NVDA in the following sections.

### Download NVDA screen reader on Windows

Go to the [NVAccess Web site](https://www.nvaccess.org/). Click the Download link. That will take you to the [NVDA download page](https://www.nvaccess.org/download/).

NVDA is available for free, but [a donation](https://www.nvaccess.org/support-us/#donation-support) is strongly encouraged.

Click the **Download** button. Wait for NVDA to download. And go through the installation wizard when it’s done.

#### Visualize NVDA’s current focus target with Visual Highlight

To make testing with NVDA more convenient (especially if you’re new to screen reader testing), I recommend enabling NVDA’s Visual Highlight feature.

To enable it, go to **Preferences** > **Settings** > **Vision** > **Visual Highlight**, and check the **Enable Highlighting** option.

![Screenshot of the Vision panel in NVDA settings. In the Vision panel, the 'Enable Highlighting' option is checked in the Visual Highlight group.](https://www.sarasoueidan.com/assets/images/article--a11y-testing-env/nvda-visual-highlight.png)

What this does is it shows a focus highlight around the element that NVDA is currently focused on — whether it’s in a webpage or anywhere on your system. This feature is useful for partially-sighted screen reader users who want to track the location of the NVDA navigator object and the currently-focused element. Seeing where the screen reader’s current focus is at is also helpful for _you_ when you’re performing testing, especially if you’re recording your screen for an educational video, for example. ^^

#### Enable NVDA speech viewer

Another helpful feature you can enable is the **NVDA Speech Viewer** log window.

Click the NVDA icon in your taskbar (on the bottom right of your screen by default), and go to **NVDA** > **Tools** and enable **Speech Viewer**. You also have the option to open the speech viewer log window by default on NVDA startup.

![Screenshot of the NVDA taskbar menu, with the speech viewer option enabled in the submenu.](https://www.sarasoueidan.com/assets/images/article--a11y-testing-env/nvda-speech-viewer.png)

The speech viewer log window contains the text that NVDA speaks, which can be helpful when you’re just getting started with screen reader testing. Just keep in mind that its usefulness of sometimes limited because [the log often does not fully represent what is announced](https://adrianroselli.com/2020/08/speech-viewer-logs-of-lies.html).

#### Setup keyboard layout for testing with NVDA on a Mac

If you’re on a Mac, go to **NVDA** > **Preferences** > **Settings** > **Keyboard** and Choose “**Laptop**” Keyboard layout instead of the default Desktop option. The desktop layout relies on many keys which do not exist on some Mac keyboards. You can also set this preference in NVDA’s start popup menu.

![Screenshot of the NVDA settings pane.](https://www.sarasoueidan.com/assets/images/article--a11y-testing-env/nvda-keyboard-layout.png)

### Map the Insert key to another key on Mac

The insert key is the default modifier key used by most screen readers on Windows. If you don’t own an external keyboard that has an insert key, you might need to use a software work-around to make up for the lack of the insert key on your keyboard.

NVDA settings include an option to set the caps lock key as the NVDA modifier key. You can do that if you prefer. I personally prefer to not do that because it interferes with typing when the caps lock is On.

Alternatively, you can use a software program to map one of your less-used keyboard keys to the missing insert key. I use [Karabiner Elements](https://karabiner-elements.pqrs.org/).

#### Setting up Karabiner Elements on macOS

Karabiner is a free app. To use it:

1.  Download the app from [the Karabiner Elements Website](https://karabiner-elements.pqrs.org/). **You want to download it on your Mac, not in your virtual machine.**
2.  Run through the setup, and make sure to enable access in your **System Preferences** settings if it is blocked by macOS (which it probably will be by default).
3.  Once it is installed and your keyboard is recognized, go to **Simple Modifications**.
4.  Choose the device(s) you want to create a mapping for, and then click **Add Item** to map an unused key to the insert key.

In my Karabiner, I mapped the right option key to the Windows insert key. And I also mapped the right cmd key to the print screen key, which can be used in combination with other keys to quickly turn Windows High Contrast mode On and Off (which is a shortcut that will come in handy in another chapter).

![Screenshot of Karabiner’s Simple Modifications panel. In my panel, I have mapped the right_command key to print_screen and the right_option key to insert for all devices.](https://www.sarasoueidan.com/assets/images/article--a11y-testing-env/karabiner.png)

That’s it. Now if you open your VM and fire up a screen reader, you can use the right option key (or the key of your choice) as a modifier key in place of the insert key.

## Virtual accessibility testing in your browser

If you’re on macOS and you have no access to a Windows machine, you can test your work with Windows screen readers using any modern browser instead. You can do that using a service called [AssistivLabs](https://assistivlabs.com/).

**AssistivLabs is to screen reader testing what BrowserStack is to cross-browser testing.** It **remotely connects you to real assistive technologies** (like NVDA, JAWS, and Windows High Contrast Mode) using any modern web browser.

AssitivLabs _currently_ only offers testing with _Windows_ screen readers and assistive technologies (like Windows High Contrast Mode and Windows Magnifier) for most accounts; testing using macOS assistive technologies will be available in the future.

AssitivLabs is a paid service — it’s not available for free by default. But it is very helpful for when and if getting access to a Windows machine is otherwise not possible.

## Enable keyboard accessibility on a Mac

To complement your screen reader, you should enable keyboard accessibility on your Mac.

Keyboard accessibility is not enabled by default on macOS. If you’ve ever tried to tab your way through interactive and focusable elements on webpages and couldn’t, that’s why. (Frustrating, I know.)

**You need to manually enable keyboard accessibility on macOS** by going to **System Preferences** > **Keyboard**, and enabling the “**Use keyboard navigation to move focus between controls**” option in the **Shortcuts** tab.

![Screenshot of the Keyboard preferences pane in macOS System Preferences.](https://www.sarasoueidan.com/assets/images/article--a11y-testing-env/macos-keyboard-settings.png)

On macOS 13+, you’ll go to **System Preferences** > **Keyboard**, and then enable the **Keyboard Navigation** (Use keyboard navigation to move focus between controls. Press the Tab key to move focus forwards and Shift Tab to move focus backwards) option.

![Screenshot of the Keyboard preferences pane in macOS 13 System Preferences.](https://www.sarasoueidan.com/assets/images/article--a11y-testing-env/macos-13-keyboard-a11y.png)

Once you’ve enabled system-wide keyboard accessibility, you want to also enable keyboard tabbing in Safari.

In Safari, go to **Preferences** > **Advanced**. And enable the “**Press tab to highlight each item on a webpage**” option.

![Screenshot of the Safari General Preferences pane.](https://www.sarasoueidan.com/assets/images/article--a11y-testing-env/safari-keyboard-settings.png)

Now you can tab your way through webpages as you should.

## Which browser and screen reader pairings should you test on?

**Screen readers work best when they are paired with the browsers they are the most compatible with.** When performing testing, you can catch most accessibility issues (sometimes even all of them) by pairing each screen reader with the browser it is most commonly used with.

### On macOS

**VoiceOver works best with (and should, therefore, be paired with) Safari.** If you use VoiceOver with Chrome or Firefox, for example, you might get unexpected results because VoiceOver is **optimized** to work with Safari not with other browsers.

### On Windows

**Narrator works best with Edge**, and has difficulty interfacing with other browsers. But Narrator isn’t most users’ first choice.

**JAWS** — the most popular of all screen readers on Windows — works best with Chrome and Firefox. When perfoming testing, **pair it with Chrome.**

**NVDA works best and is commonly paired with Firefox.**

### Mobile screen readers

Throughout this course, we will focus mainly on desktop screen reader testing. But you should test your work using mobile screen readers as well.

In [WebAIM’s ninth screen reader user survey](https://webaim.org/projects/screenreadersurvey9/), **90% of respondents reported using a screen reader on a mobile device.** According to WebAIM, this number has increased over the last 12 years. WebAIM also notes that participants with disabilities (91.6%) are more likely to use a mobile screen reader compared to individuals surveyed without disabilities (71.4%). So it is very important that you test your work on mobile to ensure that it works for a large group of screen reader users.

VoiceOver on iOS/iPadOS is the most popular mobile screen reader. VoiceOver comes bundled with iOS/iPadOS. Like its desktop version, you want to **use it in conjunction with mobile Safari.**

On Android, **Talkback (the built-in screen reader) is best paired with Chrome.**

## Guides to browsing and navigating content with a screen reader

Make some time to learn how to navigate and browse web content with each screen reader. It might take some time and feel like a steep learning curve at first, but by doing that you will gain an invaluable skill for your accessibility work.

Here is a list of official user guides that are helpful for getting started:

-   [NVDA User guide](https://www.nvaccess.org/files/nvda/documentation/userGuide.html). Most read-only webpages are browsed in NVDA using [Browse mode](https://www.nvaccess.org/files/nvda/documentation/userGuide.html?#BrowseMode).
-   [JAWS documentation](https://www.freedomscientific.com/Products/software/JAWS/) ([Shortcut to JAWS Hotkeys](https://www.freedomscientific.com/training/jaws/hotkeys/#wb))
-   [Complete guide to Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator-e4397a0d-ef4f-b386-d8ae-c172f109bdb1) ([Shortcut to Narrator keyboard commands and touch gestures](https://support.microsoft.com/en-us/windows/appendix-b-narrator-keyboard-commands-and-touch-gestures-8bdab3f4-b3e9-4554-7f28-8b15bd37410a#WindowsVersion=Windows_11))
-   [VoiceOver Guide](https://help.apple.com/iphone/11/#/iph3e2e415f)
    -   [Use VoiceOver to browse webpages on Mac](https://support.apple.com/en-lb/guide/voiceover/vo27974/10/mac/13.0)
    -   [Apple VoiceOver Command charts](https://help.apple.com/voiceover/command-charts/)
-   [Talkback user guides](https://support.google.com/accessibility/android/topic/10601774?hl=en&ref_topic=3529932)
-   [Turn on and practice VoiceOver on iPhone](https://support.apple.com/en-lb/guide/iphone/iph3e2e415f/16.0/ios/16.0)

And to get a high-level (yet practical) overview of how someone using a screen reader browses the Web, I recommend watching the Browsing with assistive technologies video series by Tetralogical:

-   [Browsing with a desktop screen reader](https://tetralogical.com/blog/2021/09/29/browsing-with-a-desktop-screen-reader/)
-   [Browsing with a mobile screen reader](https://tetralogical.com/blog/2021/10/05/browsing-with-a-mobile-screen-reader/)

## Screen reader keyboard shortcut cheatsheets

When you’re just getting started with screen reader testing, and you want to test with at least three screen readers across different platforms and devices, it can be difficult to remember all the keyboard shortcuts for each screen reader right away.

[Deque University](https://dequeuniversity.com/screenreaders/) provides useful screen reader keyboard shortcuts and gestures cheatsheets, that you can either reference on your computer, or print out and have them handy during your testing.

-   [Desktop Screen Readers Survival Guide - Basic Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/survival-guide)
-   [Desktop Screen Readers Forms Guide](https://dequeuniversity.com/screenreaders/forms-guide)
-   [NVDA keyboard shortcuts](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)
-   [JAWS keyboard shortcuts](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)
-   [Narrator keyboard shortcuts](https://dequeuniversity.com/screenreaders/narrator-keyboard-shortcuts)
-   [VoiceOver keyboard shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)

## Resources and recommended reading

-   [Efficiency in Accessibility Testing or, Why Usability Testing Should be Last](https://karlgroves.com/efficiency-in-accessibility-testing-or-why-usability-testing-should-be-last/)
-   [Checking Windows High Contrast mode on a Mac for free](https://marcus.io/blog/checking-whcm-on-mac) (inculdes instructions to download and set-up VirtualBox)
-   [Using Windows Screen Readers on a Mac](https://dequeuniversity.com/mac/windows-screen-readers)
-   [The WebAIM screen reader user survey](https://webaim.org/projects/screenreadersurvey9/)
-   [No, tabbing is not broken. Yes, I was confused too.](https://www.scottohara.me/blog/2014/10/03/link-tabbing-firefox-osx.html)
-   [Browser keyboard navigation in macOS](https://www.a11yproject.com/posts/macos-browser-keyboard-navigation/)
-   [The Importance Of Manual Accessibility Testing](https://www.smashingmagazine.com/2018/09/importance-manual-accessibility-testing/)
-   [Your Accessibility Claims Are Wrong, Unless…](https://adrianroselli.com/2022/11/your-accessibility-claims-are-wrong-unless.html)
-   [Relevant combinations of screen readers and browsers](https://www.accessibility-developer-guide.com/knowledge/screen-readers/relevant-combinations/)

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.