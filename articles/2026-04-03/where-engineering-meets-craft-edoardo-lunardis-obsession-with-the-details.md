---
title: "Where Engineering Meets Craft: Edoardo Lunardi’s Obsession with the Details"
source: "https://tympanus.net/codrops/2026/04/02/where-engineering-meets-craft-edoardo-lunardis-obsession-with-the-details/"
publishedDate: "2026-04-02"
category: "design"
feedName: "Codrops"
author: "Edoardo Lunardi"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/edo.webp?x71997)](https://www.edoardolunardi.dev/ "Where Engineering Meets Craft: Edoardo Lunardi’s Obsession with the Details Demo")

Ciao 👋 I’m Edoardo, a Creative Frontend Engineer based in Vienna, Italian by origin. Nearly a decade in, and this is still the only thing I’ve ever wanted to do.

My work sits at the intersection of engineering and craft. Creative frontend development: animation, complex interactions, headless CMS architecture, the occasional subtle effect that makes someone stop and look twice. I’ve worked with clients like Buck, Disney, Porsche, Red Bull, Le Labo Fragrances, and Getty. _I’m currently freelance and open to new projects, so if you’re building something that deserves to be built well, [get in touch](mailto:hello@edoardolunardi.dev)_. Over the years I’ve touched pretty much the whole stack: backend, servers, APIs, frontend, e-commerce, design systems.

Early in my career I even built a small CMS from scratch just to get my hands dirty with Node, Express, MongoDB, and Handlebars. I sometimes write technical articles, including for Codrops, and I try to stay active and visible in the community. I’m also part of Okay Dev, which has been a great space for that. I sometimes build the kind of work that ends up on Awwwards, FWA, and CSSDA, but there’s a lot more that never sees an award page and I’m equally proud of it. I recently joined the [Awwwards jury](https://www.awwwards.com/jury-member/edoardolunardi). That one still feels surreal. I take it seriously though: the web has enough templated, copy-pasted, patched-together websites. My goal as a judge is to help keep the bar genuinely high and reward the work that’s actually pushing something forward.

What keeps me here is that the browser is still a genuinely creative medium. It rewards obsession. It punishes shortcuts. I find that motivating in a way I can’t fully explain.

Here’s a look at some of what I’ve been up to lately. 🔊 Audio on.

## Projects I’m Proud Of

Picking favorites is hard. I’ve shipped a lot over the years and I’m genuinely proud of most of it. What I will say is that some of my most formative work happened before AI became a daily tool. Back when you’d be stuck on something for days, convinced you’d never figure it out, and then you did. That kind of struggle leaves a mark. The understanding that comes out of it is different from anything you can get by prompting your way through a problem. There are also a few projects in the pipeline I can’t share yet, I genuinely cannot wait.

### 1\. [Anuc Home](https://www.edoardolunardi.dev/works/anuc-home)

A website for Anuc Home, a furniture and interior brand. My first Site of the Day as an independent freelancer. Dev-wise, entirely owned by me from kickoff to launch.

**Tech stack:** Vercel, Sanity, Next.js  
**Year:** 2025  
**Collaborators**: Eva Landaluce  
**Recognition:** Awwwards Site of the Day, FWA, picked up across multiple design directories.

**Why it stands out:** This one started from a clean, considered vision. Eva handled the branding and design, and from the beginning there was a clear mood we wanted to protect: calm, smooth, unhurried. My job was to translate that into code without losing it. Light animations, intentional interactions, nothing that would get in the way of the feeling. The technical decisions were all in service of that atmosphere.

There’s also something categorically different about a project where your name is on the line from start to finish. No agency around you, no team to absorb the pressure. Just you, the client, and the work. When the SOTD came through I jumped out of my chair and it took me a good 30 minutes to settle back down. That one is special in a way the others aren’t.

### 2\. [My Personal Site](https://www.edoardolunardi.dev/)

My personal portfolio. No formal design process, just a rough sketch and then straight into code, iterating as I went. It ended up winning a Site of the Day anyway, which says something. I use it regularly and keep adding to it.

**Tech stack:** Vercel, Cloudflare, Sanity, Next.js  
**Year:** 2025  
**Recognition:** Awwwards Site of the Day, FWA, picked up across multiple design directories.

**Why it stands out:** There’s something freeing about building something entirely for yourself with no client, no brief, no constraints. It’s probably over-engineered by any reasonable standard, but that’s the point. It’s my little playground, and also where I experiment. Personal site all you want, but the tech behind it is enterprise level. That’s how I roll.

The real challenge was video. Over 300 of them across the site. I built a custom pipeline and a custom Sanity field: drag and drop a video in the studio, it uploads to Cloudflare, generates a 240p preview, and auto-populates all the fields. Everything runs on the AWS S3 SDK with videos in an R2 bucket, so caching comes for free. Next.js server components, cache tag revalidation, one click save in Sanity and only the one component that changed gets revalidated.

This version has lasted longer than any previous one, which for me is the real compliment.

### 3\. [Tersa](https://www.edoardolunardi.dev/works/tersa)

A wellness and recovery brand with a strong creative direction. Pioneering holistic recovery solutions, and a site that needed to feel like it.

**Tech stack:** AWS, Craft CMS, Next.js  
**Year:** 2023  
**Collaborators**: Wild  
**Recognition:** FWA, Awwwards Honorable Mention, The Webby Awards Honoree

**Why it stands out:** This one was genuinely fun to build. The creative direction was expressive and the project pushed me into new territory on a few fronts. It started with a headless Shopify integration, my first time building a headless cart using the Storefront API. An interesting experience that taught me a lot, even if it got removed later for business reasons.

The other challenge was visual: big, blurry, animated gradients. Sounds simple until you try to blur and animate that many pixels on screen at once and Safari just refuses to cooperate. That project taught me there is a hard limit to how much you can push that effect before the browser pushes back. We worked around it carefully, tested early versions of Rive for animated icons, and used it for the gradients too. Good lesson learned the hard way.

### 4\. [Le Journal Society](https://www.edoardolunardi.dev/works/le-journal)

A luxury editorial platform for Le Labo, blending craftsmanship with a vision for timeless design and sustainable artistry.

**Tech stack:** AWS, Craft CMS, Next.js  
**Year:** 2022  
**Collaborators:** Wild, Frederik Hansen

**Why it stands out:** This one just sticks. Frederik’s creative direction was impressive and the collaboration felt genuinely fluid. We combined strong assets with careful technical execution and the result was something that felt cohesive in a way that doesn’t always happen. A fun, creative project that never got submitted for awards, which is a pity, but the work speaks for itself regardless.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/IMG_8195-2-337x600.jpg?x71997)

Me and Fred

## About Me

It probably started with my father’s Windows 98 laptop. I was 5, couldn’t read or write, no idea what I was doing. But there was something about having a machine in front of you that responded to what you did. That feeling never really went away. I started programming at 14, at an IT high school that introduced it the old-fashioned way: logical diagrams on paper, then Java written by hand. At 16, an internship at a software house where I picked up JavaScript and jQuery, and spent most of my time training an early ML model to recognize and read gas meters. Optical character recognition on utility hardware. Interesting problem for a 16-year-old.

Web came properly at 17, through a university course that lit something up. I started a Computer Science bachelor around that time and eventually dropped it, but the algorithms course alone was worth the detour. That’s what genuinely shaped how I think about problems: breaking them down, finding the most efficient path, removing what doesn’t need to be there. I found Codrops almost immediately, award sites followed, and I understood pretty quickly that this was a creative medium disguised as a technical one.

What followed was six months of intense self-study, 12 hours a day, regularly until 2 or 3am. Online resources, Stack Overflow like every developer who has ever lived, courses here and there. I went through Atom, then Sublime Text, then VS Code when it came along and never looked back. But the thing that really moved the needle was replication: pick a site you admire, open a blank file, build it from scratch in HTML, CSS, and JavaScript. When stuck, open DevTools, inspect the DOM, stay there until you understand. You’re not following instructions. You’re reverse-engineering decisions made by people who already knew what they were doing. There is no more powerful way to learn this craft.

After that, agencies, then six years at Wild in Vienna, and now freelance again.

The return to freelance was deliberate. Agency life is comfortable in ways that start to cost you after a while. What I didn’t fully anticipate was how much the non-creative side would demand: positioning, pricing, knowing which clients to pursue and which to decline politely but firmly (an art form in itself). Still figuring parts of it out.

Outside of work, I hit the gym regularly. Back in the day I told myself I was going to be a fit developer, just to go against the stereotype. Been working on it for years.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/IMG_4627-1-450x600.jpg?x71997)

Me trying to take a nice pic

### Philosophy

The technical and the aesthetic are not separate concerns. A beautifully designed site built on fragile code isn’t great work. It’s half-finished work. The codebase is part of the craft.

I’m not a designer, but years of working closely with genuinely talented ones gave me something adjacent: a real sensibility for what’s working and what isn’t, the vocabulary to have an actual conversation about creative direction. That came from proximity, not theory. I can operate in two modes: receiving a fully resolved design and honouring it faithfully, or being brought in earlier when things are still being shaped. The second is more interesting. The first requires a discipline that’s underrated.

I’m not a full-3D-website person either. Those experiences can be impressive, but they’re often too much. What I care about is the subtle effect that earns its place. Restraint, done well, is harder than spectacle.

Performance is non-negotiable. A slow site is not an acceptable trade-off for visual ambition. And on code: good software is never about how much you write. Dijkstra said it best: “if we wish to count lines of code, we should not regard them as lines produced but as lines spent.” Removing code is the real work. So go tell the AI tech bro that nobody cares about how many lines their LLM spit out yesterday.

I’m an opinionated developer, and I’ll own that. On tooling: I used GSAP back in the day with vanilla stacks and it’s a fantastic library for that. But in a React codebase, I reach for Motion, formerly Framer Motion, which I’ve been using since it launched. Choosing GSAP in React means a lot of manual wiring that Motion just handles for you. I’d rather not spend my afternoon staring at a 400-line useEffect and 100 refs.

And the small things: a boring navbar ruins the feel of an otherwise great site. If pressing ESC doesn’t close a modal, I notice. Not everyone does, and I get that, but to me it signals that accessibility and the little interactions weren’t a priority. Those details are exactly what separates work that’s been truly cared for from work that’s just been finished.

I’m also obsessed with code quality and code style. The creative development world has a specific type of codebase I can’t unsee once I’ve seen it: a 5000-line JavaScript file, no structure, no logic, just vibes. I was writing code like that when I started. It works, technically. But it doesn’t scale, it doesn’t survive a second developer, and it doesn’t reflect the same care you put into the visual result. Real programming has structure. That’s not a constraint on creativity. It’s what makes the creativity sustainable.

### Tools & Workflow

My default stack is Next.js, React, TypeScript, and Sanity. Motion for animations. Deployed on Vercel or Netlify, with Cloudflare in front for edge performance. Figma for anything design-adjacent, Notion for writing and thinking, VS Code and Cursor for code. On AI tooling: for me it works as an addition to my IDE, not a replacement for it. I need full visibility and control over what I’m writing and what the LLM writes. I am the director of everything that ends up in the codebase. Cursor’s autocomplete is unmatched for that, and I don’t see a reason to change the setup anytime soon.

The desk stays clean. I work in absolute silence. Both non-negotiable.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/03/IMG_1121-431x600.jpg?x71997)

My workspace

## Final Thoughts

The tools are moving faster than they ever have and a lot of people are interpreting that as meaning craft matters less. I think it’s the opposite. Taste, judgment, the ability to think clearly through a hard problem: those take years to build and no model is going to do that work for you.

If you’re earlier in your journey, a few things I’d tell my younger self. If you’re thinking about going freelance, don’t rush it. Spend time at a good agency first, surrounded by people who are better than you. Absorb how they think, how they work, how they handle pressure. You’ll grow faster there than you ever would figuring it out alone. And while you’re there, make yourself visible. Share your work, put your name out, don’t wait for someone to notice you. When you feel ready and you have the foundation, make the jump.

The ones who make freelance work are the ones who genuinely enjoy the process, not just the outcome. That enjoyment shows up in everything: how you communicate, how responsive you are, how much you care about the details nobody asked you to care about. If you love what you do, you’re already more desirable to work with than most of the competition. No positioning strategy replaces that. And if you’re passionate and smart enough, the rest will follow.

The tools have been changing for decades. The thinking is still yours.