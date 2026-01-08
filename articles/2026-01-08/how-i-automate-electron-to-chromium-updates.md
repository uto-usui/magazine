---
title: "How I automate electron-to-chromium updates"
source: "https://kilianvalkhof.com/2024/electron/how-i-automate-electron-to-chromium-updates/"
publishedDate: "2024-08-26"
category: "frontend"
feedName: "Kilian Valkhof"
author: "Kilian Valkhof"
---

## How I automate electron-to-chromium updates

[Electron](https://kilianvalkhof.com/category/electron/), 26 August 2024, 2 minute read

For the past 6 or so years I’ve been maintaining the `electron-to-chromium` package and I realise I never wrote a blog post about it. Electron-to-chromium is an NPM package that maps Electron versions to Chromium versions so you can input e.g. Electron 32 and get back Chrome 128.

This is useful because a lot of tools will happily take “Chrome >= 128” as a configuration option for e.g. transpilation and minification, but it’s pretty annoying to look up the chromium version of your electron release each time.

A lot of tools use [browserslist](https://github.com/browserslist/browserslist) for this browser-to-support-table mapping and thanks to electron-to-chromium you can write `Electron >= 32` and that will be supported in everything Browserslist uses: Babel-preset-env, autoprefixer, stylelint and a bunch more. All in all, \`electron-to-chromium is currently downloaded almost 47 million times each week.

### The automation setup [#](#the-automation-setup)

Because Electron releases relatively frequently, the creator of Browserslist suggested that I automate the entire process to avoid a ton of manual work. I’m glad he did! For the past 6 years that automation has been smoothly humming along on my [DigitalOcean](https://m.do.co/c/bb22ea58e765) server. Here’s how it works:

-   Every 15 minutes, a cron job kicks in.
-   It updates the \`electron-releases\` dependency and runs my [automated-update.js](https://github.com/Kilian/electron-to-chromium/blob/master/automated-update.js) script.
-   That runs the [build](https://github.com/Kilian/electron-to-chromium/blob/master/build.mjs) and [test](https://github.com/Kilian/electron-to-chromium/blob/master/test.js) scripts.
-   If those fail I get sent an e-mail with the problem.
-   Otherwise with a new version of Electron the build step has generated new files and so \`git status –porcelain\` returns text.
-   That means we need to publish a new version, so the script adds the new files, creates a new patch version and pushes the update and the new tagged release to GitHub.
-   As a last step, it releases the version to NPM and I get a confirmation email.

### Benefits [#](#benefits)

This automation has made my life so much easier:

-   Updates go live super fast – usually within minutes of an Electron release.
-   The package is always current without me having to babysit it.
-   Automated tests mean fewer chances for bugs to sneak in and there’s a number of fail saves.
-   I can focus on other stuff instead of manual updates.

### Other updates [#](#other-updates)

Other than keeping up to date with Electron I haven’t needed to do a whole lot of maintenance on the package but last month I configured it to no longer include nightly versions in the released package. That brought the package size down from 299kB to 144kB.

With 47 million downloads per week, that’s almost 7TB of data saved every week!

### A shout-out to DigitalOcean [#](#a-shout-out-to-digitalocean)

electron-to-chromium has been sponsored by DigitalOcean’s open source sponsoring for a couple of years now, which is really great. That gets me very flexible infrastructure with DigitalOcean footing the bill. Thank you DO!

That’s pretty much it! It’s not groundbreaking stuff, but it’s a fun bit of automation that keeps things running smoothly. If you’re maintaining a package that needs frequent updates, you might want to try something similar!