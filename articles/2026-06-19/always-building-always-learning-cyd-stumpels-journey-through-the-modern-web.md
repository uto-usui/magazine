---
title: "Always Building, Always Learning: Cyd Stumpel’s Journey Through the Modern Web"
source: "https://tympanus.net/codrops/2026/06/17/always-building-always-learning-cyd-stumpels-journey-through-the-modern-web/"
publishedDate: "2026-06-17"
category: "design"
feedName: "Codrops"
author: "Cyd Stumpel"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/06/cydstumpel.webp?x13474)](https://cydstumpel.nl/ "Always Building, Always Learning: Cyd Stumpel’s Journey Through the Modern Web Demo")

I’m Cyd, a freelance creative developer, tech speaker and part-time teacher based in Amsterdam, the Netherlands. I build accessible, award-winning websites for companies, studios and individuals, but I also teach the next generation of web developers at the Amsterdam University of Applied Sciences (AUAS). I like to [blog](https://cydstumpel.nl/blogs/) from time to time, and I’ve really enjoyed [speaking](https://cydstumpel.nl/speaking/) at conferences over the years.

What I love most about development is seeing flat designs come alive with motion and using it as a storytelling tool.

## Selected work

### [Rotgans Media House](https://rotgans.com/)

Michiel Rotgans is a Dutch photographer with beautiful work. It’s always easier to create portfolios for people with stunning visuals.

I especially love the homepage-to-case transition and how it plays in reverse when navigating back.

Page transition from home to a detail page and back for Rotgans Media house

This project was designed by [Tim Borst](https://stustu.studio/). In this project I used CSS view transitions for filtering, page transitions, and load-more animations. I also used CSS anchor positioning for a small micro-interaction on the filter buttons. It’s built in WordPress using [Swup](https://swup.js.org/) with native view transitions. Swup is amazing if you want to have control over your different transitions between pages, much easier and better supported than the native approaches with [view transition types](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using_types) and [pageswap](https://developer.mozilla.org/en-US/docs/Web/API/Window/pageswap_event) events at the moment.

Page transitions between portfolio items for Rotgans Media House

Load more animation for Rotgans Media House

### [Studio Sallali](https://sallali.studio/)

Hamid Sallali is a creative director who I’ve worked with a few times over the years. He designed this website and gave me full creative control over the motion.

Loading animation and scroll for Studio Sallali

The scroll animation (done with GSAP ScrollTrigger) was based on a [tutorial](https://tympanus.net/Development/ScrollAnimationsGrid/) right here on Codrops. This was all before view transitions, so the click animation on the cases is done with GSAP Flip. This is also a WordPress website.

Different case on Studio Sallali

### [De Visdeurbel](https://visdeurbel.nl/)

De Visdeurbel (or fish doorbell) is a project from Dutch ecologist Mark van Heukelum. He noticed that a lot of fish were being blocked mid-migration by a lock in Utrecht, the Netherlands. He placed an underwater camera at the lock, had a website made that showed the livestream and a doorbell that users could press every time a fish was visible. In the first years an email was actually sent to the lockkeeper with a screenshot of the livestream so he could come and manually open the lock. With over 250,000 presses a year, we eventually had to build something a little more sophisticated than emailing a lockkeeper.

Homepage for De Visdeurbel

Not the most creative website in terms of motion, but one of my favourite projects nonetheless, because of the community it created. Millions of visitors watch a stream of a little lock in Utrecht every year.

De Visdeurbel was also featured on [Last Week Tonight with John Oliver,](https://www.youtube.com/shorts/vgTo4fJNsHQ) which was really surreal.

![John Oliver sitting behind his desk at Last Week Tonight, talking about the Fish Doorbell website](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/image-3-1200x676.png.webp?x13474)

John Oliver talking about De Visdeurbel on Last Week Tonight

It was redesigned by one of my favourite studios to work with, [Studio Moan](https://studiomoan.nl/), last year and I handled the rebuild.

After only two days we realised just how many people were visiting De Visdeurbel, and how many people just liked to press a button (and honestly, who can blame them?). It forced me to think about ways to reduce the amount of empty screenshots, which I brought to the [Okay Dev](https://okaydev.co/) Slack, a community full of some of the most helpful creative devs you can find. I landed on implementing some edge detecting kind of algorithm and wrote a [blog post](https://cydstumpel.nl/finding-fish-in-a-sea-of-grey-and-green/) about it.

![A test of my edge detecting script showing the probability of 'something' being visible in the screenshot from the fish doorbell](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/image-1-1200x717.png.webp?x13474)

A test of my edge detecting script showing the probability of ‘something’ being visible in the screenshot from the fish doorbell

This year we’re also collecting more data on _how_ the fish doorbell is used, my students from the [Minor Web Development](https://everythingweb.org/) are actually exploring what we could do with that data as we speak. Stay tuned!

### Sophie Zwartkruis

Loading animation for Sophie Zwartkruis

Sophie Zwartkruis is a corporate governance advisor. She wanted a minimalistic website with page transitions and subtle scroll animations. It’s sometimes harder to go small than big, but it was a really enjoyable project.

This website was designed by Hamid Sallali. He created a basic palette of complementary colours, added a distinctive and professional serif font, and asked me to bring in subtle animations to create a professional website that invites you to keep exploring.

Page transitions for Sophie Zwartkruis

## About me

I studied Communication and Multimedia Design at AUAS, and I was fully planning to become a designer. During the tech courses, however, I realised how fun coding could be. Unfortunately for me, that didn’t mean I was immediately good at it, but with lots of hours of hard work and after a Minor in Web Design and Development I became a lot better.

In my final year at the uni I got a frontend internship at Matise, a small digital agency in Amsterdam. That’s also where I first encountered design and animation as storytelling tools. I was offered a job after graduating in 2018 and worked there until 2020, when Matise closed their doors. After that, I started freelancing.

After bumping into some of my former lecturers at a conference in 2022, I was invited to join them as a teacher on the brand new two-year [Associate Degree Frontend Design & Development](https://fdnd.nl/) at AUAS.

My colleagues and graduates of 2025 from the Associate Degree Frontend Design & Development

In 2024 I spoke at a conference for the first time, the Awwwards conference in Valencia, and since I’ve spoken at some of my favourite events about CSS and creative development, like Beyond Tellerrand, CSS Day and JS Heroes. I have a few more [speaking engagements](https://cydstumpel.nl/speaking/) on the calendar for this year, including [Fronteers Dark mode](https://fronteersconf.org/).

![Cyd on stage at CSS Day in the Zuiderkerk in Amsterdam](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/cssday-2025-209-1200x800.jpg.webp?x13474)

## Philosophy

I’m a big believer in “underpromise, overdeliver”. I think that’s why most of my new projects come from referrals. I also believe that accessibility can be an opportunity to be more creative and get more projects. It’s still pretty niche for creative developers to know **anything** about accessibility, unfortunately, but with new legislation in the EU it’s becoming more and more important.

I think it’s really important to keep up with new specs, CSS has added a lot of cool new features to replace JavaScript, like sibling index, anchor positioning, view transitions and scroll-driven animations. I try to implement those in new projects as enhancements where possible, but I always try them out in my portfolio first. Building portfolios has become a kind of escalated hobby of mine, I basically build a new portfolio every year.

![Cyd on stage at JS Heroes in Cluj, Romania](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/IMG_2325-edited-scaled.jpg.webp?x13474)

On stage at JS Heroes in Cluj, Romania

![Cyd on stage at JS heroes, picture by Vlad Cupşa](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/IMG_2370-1200x800.jpg.webp?x13474)

## Tools & workflow

While I’ve built in pretty much every modern framework, I build most of the websites for my own clients in WordPress. I know it doesn’t sound fancy, but it’s the most cost-effective and user-friendly option for me and my clients.

I do really enjoy using SvelteKit and Astro, and I often reach for those if I don’t need a CMS. I love those frameworks specifically because they stay close to vanilla JavaScript, although SvelteKit has added a lot of complexity over the last few years.

## Currently learning

Lately I’ve been trying to replace a lot of JavaScript animation with CSS solutions. Back in 2024 I felt I really needed to rush out my new portfolio for that year because I was **sure** everyone would get onto the bandwagon of view transitions and scroll-driven animation and that my portfolio wouldn’t be special anymore. Two years later, however, it seems like the Creative JavaScript Developer crowd is still very much in JS land. Baseline support for the features has also taken longer than I expected, so that might have something to do with it. I still think CSS animations will take over more and more JavaScript animations as browser support grows, so it’s definitely worth the time investment.

## Current challenges

My biggest challenge currently is balancing all the things I want to do at once: teaching, speaking at conferences and actually building things for clients. I will take a bit of time off from teaching for at least the next semester to get a healthier work-life balance.

## Final thoughts

It’s a weird time to be a web developer, to say it mildly, with people saying it’s no longer worth your time to learn new specs because AI will take over most of our work anyway. Some companies are even [forcing their developers](https://www.washingtonpost.com/business/2025/06/03/ai-workplace-duolingo-shopify-employees/) into becoming ‘prompt engineers’.

I think it’s important to take a step back, stay resilient, and realise the dust hasn’t settled yet, we’re at the very start of AI. Our roles as developers will probably change, but how exactly isn’t clear yet.

The most likely scenario, in my eyes, will be that we as developers will be more and more pushed into a role of being arbiters of taste, quality and security. It will be more and more important to focus on the basics of web development; knowing the difference between ‘good’ and ‘bad’ code, enforcing principles like DRY and keeping an eye on performance, progressive enhancement and accessibility.

I think our relevance and power compared to AI will be in seeing the **entire** context of the work, who will use it, how they will use it and why. So my advice is: spend some time in the next couple of months to relearn the basics.