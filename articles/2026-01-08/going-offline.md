---
title: "Going Offline"
source: "https://www.sarasoueidan.com/blog/going-offline/"
publishedDate: "2018-04-24"
category: "accessibility"
feedName: "Sara Soueidan"
---

Table of Contents

1.  [Offline with Service Workers](#offline-with-service-workers)
    1.  [Progressively Enhanced Experience](#progressively-enhanced-experience)
2.  [“Going Offline”](#%E2%80%9Cgoing-offline%E2%80%9D)
3.  [Final Words](#final-words)

Earlier this month I rolled out a new and long overdue feature on this Web site: offline viewing. In other words, from now on, after your first visit, you can re-visit my Web site even when you’re not connected to the Internet. Furthermore, depending on the device and application you’re using to visit this site, you may also be able to add the site to your mobile homescreen, similar to other native applications.

### Offline with Service Workers

Most of the main pages of the site (those linked in the menu in the header and links in the footer) will be saved for offline viewing by default on your first visit. Posts published in the Articles section (like this one) or in the Desk section will be available for offline reading on demand.

All this is possible thanks to the power of Service Workers.

#### Progressively Enhanced Experience

If you visit my site using a modern [browser that supports Service Workers](https://caniuse.com/#feat=serviceworkers), you will get an enhanced experience, with a colorful _“Save this page for offline reading”_ button at the top of each post, that does exactly what it says: it caches the page offline so that you can view and read it again when you’re offline.

Using a Service Worker to save pages offline also enhances the overall experience of the site by making it load even faster than it already did before.

If a browser does not support Service workers, it will miss on these new features, but the general experience of the site will remain unchanged from what is was before — nothing will break. This is because all the features that Service Worker offers are only enabled when support for Service Workers is detected and the Worker is registered and installed.

```
// a Service Worker is registered only when it is supportedif ('serviceWorker' in navigator) {        navigator.serviceWorker.register('../../serviceworker.js', { scope: '/'});}
```

### “Going Offline”

I wrote my first Service Worker script about 3 or 4 years ago — the year Workers were announced and started getting implemented. But my Worker never saw the day of light. I remember getting caught up with client work and adding the script to my todo list for this Web site. I never got to finish it.

This month, [A Book Apart](https://abookapart.com/) announced (and released early previews of) a new book titled “Going Offline”, written by none other than [Jeremy Keith (“adactio”)](https://adactio.com/) himself. Like any book written by one of my favorite people in the industry, I leaped on the chance to read the early preview.

Over the course of two days, I read the book and followed along with it as I rewrote my old Service Worker script for the site. By the time I reached the end of the book, I had a Service Worker installed and working on the site, _and_ I had added a Web App Manifest file — the file that enables your Web site or Web application to behave and look similar to a native application on your mobile device(s).

Jeremy covers literally everything you need to know to write and install your first Service Worker, tweak it to your site’s needs, and then write the Web App Manifest file to complete the offline experience, all in a ridiculously easy to follow style. It doesn’t matter if you’re a designer, a junior developer or an experienced engineer — this book is perfect for _anyone_ who wants to learn about Service Workers and take their Web application to a whole new level.

If you care about the user experience of your site / application, making sure it loads blazing fast and works offline might be one of the best steps you could take to improve that experience for your users. And this book is a vital one if you’re not sure where to start doing that. I highly recommend it. I read the book over the course of two days, but it can easily be read in half a day. And as someone who rarely ever reads a book cover to cover (I tend to quit halfway through most books), this says a lot about how good it is. The book is now available for (pre)order [here](https://abookapart.com/products/going-offline).

### Final Words

If you’re interested, you can take a look at my script [here](https://sarasoueidan.com/serviceworker.js). It is a basic script, and you can write an exact same script if you follow along Jeremy’s book. But of course it’s important, in my opinion, that you know, understand and customize what the script does to your own needs. Jeremy’s book helps tremendously with that. The book also contains a list of extra resources for further learning about Service Workers. So have a look at those if you need more information.

I have more work to be done on this site, and I’ll be writing about new features as they roll out. I’m quite excited about what’s coming next!

Thank you for reading!

## Join my mailing list

Join 8,000+ others on my mailing list who get VIP access to updates and new content from me before it is publicly released. You'll receive tutorials, guides, exclusive behind-the-scenes content, product discounts, and actionable insights covering existing and new web platform features and how to use them inclusively in your work today. Connect directly with me, provide feedback, and influence future content.