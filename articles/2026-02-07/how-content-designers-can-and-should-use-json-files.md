---
title: "How content designers can (and should) use JSON files"
source: "https://uxcontent.com/content-design-json/"
publishedDate: "2025-06-10"
category: "ux-writing"
feedName: "UX Content Collective"
author: "Prasaja Mukti"
---

Two years ago, I was drowning in copy chaos. As a Lead UX writer at Kredivo back then, I found myself constantly hunting through Figma files, Slack threads, and Google Docs, desperately trying to find the “final” version of a button label or error message. Sound familiar? If you’re a content designer, you’ve probably lived this nightmare too.

Now at Sintaksis, I run my content consulting and product writing business with a system that’s been a game-changer for clients, making collaboration with product teams and developers a breeze. These days, I manage entire product vocabularies through JSON files, teach other writers to do the same, and even get the occasional “lgtm” from developers who know they’ll never again get a frantic 4:50 PM Slack asking to change “Sign Up” to “Get Started.”

This is the story of how I accidentally discovered that the solution to our industry’s biggest problem—creating a true Single Source of Truth for copy—was hiding in plain sight, written in a language we thought was just for developers.

## Copy everywhere, truth nowhere

Let me paint you a picture of the old way. At my former employer, like most companies, we had copy scattered across multiple tools and platforms. Design files in Figma contained one version of our microcopy. Product requirements documents in Docs and Spreadsheets had another.

The actual live product? That was anyone’s guess, because PM or developers often had to make last-minute changes during implementation, and those changes rarely made it back to our “design system.”

The breaking point came during a routine audit. I discovered we had FOUR different ways to say “transaction failed” across our platform. Four. Each slightly different, each living in a different place, each telling users something subtly different about what went wrong and what they should do next.

That’s when I noticed something interesting in our codebase: there are two types of JSON files that developers use to manage text.

-   **Global config** files contained standard copy used throughout the application (things like button labels, common error messages, and navigation items).
-   **Local config** files held feature-specific copy, with names like biller\_en.json or loan\_application\_id.json.

JSON, for those unfamiliar, is a standard format for storing structured data. The common structure of it looks like this:

{

  “buttons”: {

    “primary”: “Get Started”,

    “secondary”: “Learn More”,

    “cancel”: “Cancel”

  },

  “errors”: {

    “network”: “Connection failed. Please check your internet and try again.”,

    “validation”: “Please check your information and try again.”

  }

}

Simple, organized, and directly connected to what users actually see in the product.

## What if content designers owned JSON files?

Most content designers see JSON and immediately think “that’s developer territory.” But I started asking a different question: What if we owned these files? What if, instead of handing off copy in a Google Doc or Spreadsheets that gets interpreted, translated, and inevitably changed during development, we delivered the copy in the exact format developers needed?

The implications were staggering. By working directly in JSON, I could:

-   **Eliminate the telephone game**: No more copy getting lost in translation between design, content, and development
-   **Update copy instantly**: Changes to JSON files could be deployed immediately, VERY minimum developer dependency
-   **Maintain true consistency**: One source of truth that everyone (designers, developers, and stakeholders) referenced
-   **Scale systematically**: Modular, reusable copy components that worked like design system components

The real game-changer came when I realized that JSON isn’t just about storing copies; it’s about grasping the variables that make copies dynamic and context-sensitive. Understanding the structure and content empowers me to operate with greater depth and efficiency.

For context, here’s the folder structure I used when working on projects.

copydocs/

├── en/ \# English copy

│   ├── homepage.json \# Homepage copy (headlines, CTAs, etc.)

│   ├── onboarding.json \# Onboarding flows (welcome, instructions)

│   ├── errors.json \# Error messages and system messages

│   ├── settings.json \# Settings page copy

│   └── components/ \# UI component-level copy

├── id/ \# Indonesian copy

│   ├── homepage.json

│   ├── onboarding.json

│   ├── errors.json

│   ├── settings.json

│   └── components/

└── README.md # Documentation on how to structure and use the copy files

## Understanding the system beyond words

Working directly with JSON [forced me to think like a system](https://uxcontent.com/systems-thinking-for-ux-a-guide-for-content-designers/), not just a wordsmith. I started seeing copy not as isolated strings, but as part of a larger ecosystem of variables and contexts that shape user experience.

One example that can help writers leverage JSON as a playground for dynamic documentation using variables is as follows:

![](https://uxcontent.com/wp-content/uploads/2025/06/643175E8-BCFC-482D-AAFC-404AF87BE816.jpg)

### User variables

When you control the JSON, you see exactly how copy connects to user data:

-   Profile information (name, location, job title, preferences)
-   Behavioral data (usage history, frequency patterns)
-   Account status (membership levels, subscription tiers)

Instead of writing generic copy like “Welcome back,” I could craft dynamic experiences: “Welcome back, Prasaja. Enjoy your vouchers.” The copy wasn’t just personalized, it was systematically personalized, with clear rules and fallbacks built into the JSON structure.

### Contextual variables

JSON files revealed how much copy depends on context:

-   Time and date (“Good morning” vs. “Good evening”)
-   Location and timezone (currency, local regulations)
-   Device and platform (touch vs. click, mobile vs. desktop interactions)
-   Language and regional preferences

This wasn’t just translation, it was cultural adaptation at scale.

### System status variables

Perhaps most importantly, JSON showed me how copy needs to respond to system states:

-   Process status (“Processing your payment…” → “Payment complete”)
-   Error conditions (network issues, validation failures, server problems)
-   Progress indicators (step 2 of 5, 60% complete)
-   Achievement states (milestones reached, goals completed)

### Data variables

Finally, JSON made it clear how copy must integrate with real-time data:

-   Dynamic numbers and statistics
-   Live calculation results
-   Real-time stock or service availability
-   Personalized recommendations based on user behavior

Working at this level of systematic integration fundamentally changed how I approached content design. I wasn’t just writing words, I was architecting communication systems.

## Scaling the system

After proving the concept at Kredivo, I had the opportunity to implement this approach from the ground up at Suarise, Indonesia’s pioneer digital accessibility service. I didn’t just manage JSON files there, I owned the entire copywriting process, from initial writing guidelines through final documentation.

Here’s the JSON example from one of my documentation:

![](https://uxcontent.com/wp-content/uploads/2025/06/BDEEF1B4-8C86-4127-80B9-EC1D4B053DE3.jpg)

The documentation is more structured and can even include accessibility features like aria labels in JSON. These labels are not visible to the user but are read by screen readers.

And for Suarise, JSON became the foundation of copywriting documentation:

**Writing Guidelines**: Instead of abstract style guides, the guidelines were tied to JSON structures. Writers learned not just what to write, but how to structure it for maximum reusability and dynamic functionality.

**Content Documentation**: Every piece of copy lived in version-controlled JSON files with clear histories, rationales, and usage contexts. No more wondering why we chose one phrase over another. The decision was documented in the system itself.

**Developer Collaboration**: Developers didn’t just receive copy, they received structured, implementation-ready content systems. No more ambiguity about edge cases or error states. No more mid-day Slack messages asking for copy changes.

**Client Delivery**: When working with external clients, I began delivering projects that started and ended with JSON. Clients received not just copy, but complete content systems they could maintain and scale independently.

After working on documentation, I realized there are both challenges and chances to learn. So, I created a curriculum that teaches other writers the whole process. I just finished testing it and now I’m gathering feedback to make it even better. I hope the writers will not only learn how to write JSON, but also think like content system architects.

## Why this matters now

The recent “AI-first” announcements from companies like Shopify and Duolingo make this approach more critical than ever. As product development accelerates and content volume explodes, traditional approaches to copy management simply won’t scale.

JSON-based content systems provide exactly what these accelerated environments need:

**Modular reusability**: Copy components that can be mixed, matched, and reused across features without losing consistency or voice.

**AI training data**: Structured, consistent copy that can effectively train AI models to maintain brand voice and communication standards.

**Rapid iteration**: Copy changes that can be tested, deployed, and rolled back without developer intervention.

**Quality at scale**: Systematic approaches to copy that maintain consistency even as teams grow and product complexity increases.

## The “developer happiness” factor

Perhaps the most satisfying part of this journey for me has been watching developers’ reactions. Instead of dreading copy changes (because they usually meant diving into code, hunting for hardcoded strings, and making changes that risked breaking other parts of the application), they now give me kudos in a meeting.

Copy changes are no longer interruptions, they’re simple JSON updates that deploy cleanly and predictably. Developers can focus on building features instead of managing text strings. The relationship between content and engineering transforms from adversarial to highly collaborative.

## Looking forward, content design as system architecture

Even though I code directly in code editors like VSCode or Cursor, I am also curious about products that can read JSON more easily for beginner writers who come from data-based documentation like Spreadsheets, Notion, or Airtable. If you know of any similar products that can also help us navigate JSON files with a more user-friendly interface, please let me know!

What started as a practical solution to copy chaos has evolved into a fundamentally different way of thinking about content design. Instead of crafting perfect individual pieces of copy, we’re architecting communication systems that scale, adapt, and maintain quality across complex product ecosystems.

JSON isn’t just a file format, it’s a methodology for systematic content design. It forces us to think about variables, contexts, and relationships. It connects our work directly to user experience in ways that traditional deliverables never could.

As the industry grapples with AI acceleration and increasing product complexity, content designers who understand systems thinking will become indispensable. We’re not just writers anymore.

The hardest part isn’t learning the syntax, it’s shifting from thinking about individual pieces of copy to thinking about communication systems. But once you make that shift, you’ll never want to go back.

And sometimes, that future is hidden in a seemingly simple JSON file, waiting for a content designer brave enough to claim ownership of the system itself.

_Prasaja Mukti Aji is a UX Writer—Developer hybrid in Sintaksis Studio, bridging the gap between compelling storytelling and functional content design. [Connect with Prasaja on LinkedIn](https://www.linkedin.com/in/prasaja-mukti/)._