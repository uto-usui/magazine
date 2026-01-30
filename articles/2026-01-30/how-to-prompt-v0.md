---
title: "How to prompt v0"
source: "https://vercel.com/blog/how-to-prompt-v0"
publishedDate: "2025-12-15"
category: "frontend"
feedName: "Vercel"
author: "Esteban Suárez"
---

4 min read

Dec 15, 2025

Better prompts = better results, faster

Working with v0 is like working with a highly skilled teammate who can build anything you need. v0 is more than just a tool, it’s your building partner. And like with any great collaborator, the quality of what you get depends on how clearly you communicate.

The more specific you are, the better v0's output becomes. From our testing, good prompts consistently deliver:

-   Faster generation time (30-40% faster with less unnecessary code, fewer credits spent)
    
-   Smarter UX decisions (v0 understands intent and optimizes accordingly)
    
-   Cleaner, more maintainable code
    

This guide shows you a framework that consistently produces these results.

## [Link to heading](#the-framework:-three-inputs-that-drive-great-prompts)The framework: Three inputs that drive great prompts

After building hundreds of applications ourselves and learning from v0's power users, we’ve noticed that the best prompts always include three core inputs:

1.  **Product surface**
    
2.  **Context of use**
    
3.  **Constraints & taste**
    

Here's the template:

```
Build [product surface: components, data, actions].Used by [who],in [what moment],to [what decision or outcome].Constraints:- platform / device- visual tone- layout assumptions
```

Let's break down each input.

## [Link to heading](#product-surface)Product surface

**What specifically are you building?**

List the actual components, features, and data. Not “a dashboard”, but what data it shows, what actions users can take, and what the key sections are.

**Example:**

```
Dashboard displaying: top 5 performers with names and revenue, team revenue vs quota progress bar, deal pipeline with stages (Leads → Qualified → Demo → Closed), 6-month revenue trend chart.
```

When you’re specific about the product surface, v0 doesn’t waste time inventing features you don’t need or missing ones you do.

## [Link to heading](#context-of-use)Context of use

**Who’s using this, and in what moment?**

Be specific about your users and how they interact with the product in real life. Their role, technical comfort level, time constraints, and environment shape how v0 designs the UX.

Ask yourself:

-   Who uses this?
    
-   When do they use it?
    
-   What decision are they trying to make?
    
-   How much time do they have?
    

**Example:**

```
Sales managers (non-technical) who check this during morning standups on desktop monitors to quickly spot underperformers and celebrate wins with the team.
```

v0 optimizes for assumed usage. If you don’t define the context of use, it will guess.

## [Link to heading](#constraints-&-taste)Constraints & taste

**How should it work and look**

Constraints tell v0 what not to invent.

Include:

-   Style preferences
    
-   Platform or device assumptions
    
-   Layout expectations
    
-   Color systems
    
-   Responsiveness or accessibility needs
    

**Example:**

```
Professional but approachable. Use card-based layout with clear hierarchy. Color code: green for on-track, yellow for at-risk, red for below target. Desktop-first since they use large monitors. Make it feel like a real SaaS product.
```

v0’s defaults are good. Specific constraints make them great while keeping code cleaner.

## [Link to heading](#show-the-difference:-real-test-results)Show the difference: Real test results

I tested this framework by building the same applications with different levels of context. Each test isolates one element to show its impact:

### [Link to heading](#test-1:-the-impact-of-context-of-use)Test 1: The impact of context of use

**Without context of use:**

```
Build an e-commerce site with product grid, filters, and shopping features.
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F44BT3tiOXHRQKLH5Ir1tK2%2F40d5fc6dae5800157fb287d5a4522c0c%2Fprompt_v0_01_lm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4YS38AzFi2lq6d5UEUdezb%2F877dc715b8d6c6f3f4624b0e361212a4%2Fprompt_v0_01_dm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4odzXUzi6ox72jmSoFWEtX%2F633bbda45122a5f54ec77d50db1c8926%2Fprompt_v0_01_lm_mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2HCNJWCYSy6aHiEGvSPHqt%2F54cebc7343ec552a70cbc1d4631d197b%2Fprompt_v0_01_dm_mobile.png&w=1920&q=75)

**v0 chat:** [**https://v0.link/6vSzuSI**](https://v0.link/6vSzuSI)

**With context of use:**

```
Fashion e-commerce site targeting millennials (25-35) who browse on mobile during commutes. They compare multiple items quickly before buying. Build a product page with: swipeable image gallery, product title, price, description, size/color selectors, add to cart button. Include minimal header with back button and cart icon. Clean, premium aesthetic.
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6fXWzSHgP0XLEnRqjY5y4F%2F5911db759f819458e83399aca7e828cf%2Fprompt_v0_02_lm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FFx3Yqy2va15nD15P1s7Zj%2F79272885785e3c668d7a896ff7dcb70e%2Fprompt_v0_02_dm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1NrxDwi8kDgnADVEpc8AaX%2F7b7a0f6493e383bab87cb2d026dfa7e4%2Fprompt_v0_02_lm_mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7xLylAwZD1V5i6DHrES1Wt%2Fa515b1ab4fa8652c7a37b3c5d6a09ee6%2Fprompt_v0_02_dm_mobile.png&w=1920&q=75)

**v0 chat:** [**https://v0.link/CcOTmsI**](https://v0.link/CcOTmsI)

**What changed:**

The version with context took 26 seconds longer but delivered a completely functional product. The version without context had:

-   Non-functional search (placeholder only)
    
-   Non-functional cart
    
-   NOT responsive
    

The version with context had:

-   Fully functional search and cart with quantity controls
    
-   100% mobile responsive
    
-   Sophisticated mobile-first design
    
-   Quick view modals and category filters
    

**The real cost:**

Without context would have required 1-2 more prompts to add the missing functionality, totaling ~5 minutes and ~1.5 credits. Better context saved multiple iterations.

### [Link to heading](#test-2:-the-impact-of-product-surface)Test 2: The impact of product surface

**Vague product surface:**

```
Build a user profile page.
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6GO4fst9qBA61AuXz0Tzj3%2F62d5f6c4bbfbc25f2d834da880016a93%2Fprompt_v0_03_lm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2k5bToiabqUtkgJVNN42Gs%2F2182cdec632b5a769fd0691002cf218c%2Fprompt_v0_03_dm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6zrIZDICVa2NfJ0v7Dv8cT%2F74986b04b1a98b23077733838b0cc946%2Fprompt_v0_03_lm_mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FJYHXwDxD9hHFtx8Aui2NM%2F94ab62c9a629efefe3956f14ba3638e3%2Fprompt_v0_03_dm_mobile.png&w=1920&q=75)

**v0 chat:** [**https://v0.link/1Gev1Gi**](https://v0.link/1Gev1Gi)

**Specific product surface:**

```
Build a user profile page showing: profile photo, display name, username, email, bio, member since date, activity stats (posts, comments, followers), recent activity feed with timestamps, edit profile and settings buttons.
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6nCQkm7H9RyD8eizpyGAMg%2Fb2e5300a8f738f1bbfc7d5d304d0f2fd%2Fprompt_v0_04_lm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FT7uopmEkEaaJgWbNXyqTC%2F6cefeaf480052d8ae78f479442c82941%2Fprompt_v0_04_dm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FQprXf2LvVP7mDY86Bq9fe%2F04d9bee4164d43fe715b8d77f01d4ff8%2Fprompt_v0_04_lm_mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F56GC1GFBKtyWzbbHWqmSo0%2Fdf205f73e7b6b02c6d0889d5f7e67fd6%2Fprompt_v0_04_dm_mobile.png&w=1920&q=75)

**v0 chat:** [**https://v0.link/690wE6f**](https://v0.link/690wE6f)

**Results:**

-   Vague: **1m 38s**, 595 lines, 0.173 credits
    
-   Specific: **1m 19s**, 443 lines, 0.160 credits
    

**19 seconds faster, 152 fewer lines, lower cost.**

The vague prompt forced v0 to guess. The specific prompt generated exactly what we needed: all requested fields properly structured, activity stats prominent, correct information architecture.

When the product surface is explicit, v0 doesn’t waste time inventing features you don’t need or missing ones you do.

### [Link to heading](#test-3:-the-impact-of-constraints-&-taste)Test 3: The impact of constraints & taste

**Basic constraints:**

```
Build a support ticket dashboard. Shows: open tickets, response time, agent performance, recent activity.
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3IwoBs3cjAWVj4Qo2I4y7q%2F075c6624a377551fd987b973683faa57%2Fprompt_v0_05_lm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4OSlpPnnZSdXSE2deW7M1a%2F007cbc4cd0b52d6e97a10ced4c50eb00%2Fprompt_v0_05_dm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2Frcpmd8yysFmjo6vzenJv5%2Fd471d64ec5df92642c56e7787cdd7bb7%2Fprompt_v0_05_lm_mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6mKhq36PqWO45IcFXaMZvb%2F873a659d56089f4bccb3ea5149fc6f02%2Fprompt_v0_05_dm_mobile.png&w=1920&q=75)

**v0 chat:** [**https://v0.link/jrNW2FX**](https://v0.link/jrNW2FX)

**Detailed constraints:**

```
Build a support ticket dashboard. Shows: open tickets, response time, agent performance, recent activity.Mobile-first design (team leads check this on phones while on the floor).Light theme, high contrast. Color code: red for urgent (>24h), yellow for medium, green for on-time. Maximum3-column layout. Include loading states for real-time data.
```

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FBippLfWjjbhtz4WwwcgOS%2Fc76ea6283fe83119cb71407cc6a9351c%2Fprompt_v0_06_lm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FGC8OWlBsq2NzLshUnmYEL%2Ff41d905feacfb0fcd148c4c450420bf0%2Fprompt_v0_06_dm.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5ZVH6nN2Gs782RkyiCAcjg%2F95db26c73c00243838d86d632d93de3d%2Fprompt_v0_06_lm_mobile.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3xIcvVnEaUO0wteMO6EK2l%2F0a8115ce0468e9e3221930cfbebcfcb2%2Fprompt_v0_06_dm_mobile.png&w=1920&q=75)

**v0 chat:** [**https://v0.link/ZtsFTeb**](https://v0.link/ZtsFTeb)

**Results:**

-   Basic: **1m 42s**, 679 lines, 0.133 credits
    
-   Detailed: **1m 52s**, 569 lines, 0.130 credits
    

**Took 10 seconds longer but generated 110 fewer lines and cost less.**

The difference: basic version "works on mobile" (desktop layout that shrinks). Detailed version is "mobile-first" (designed from the ground up for mobile, single column expanding to 3 max, intentional color coding with red/yellow/green urgency levels, agent status badges, high contrast for outdoor visibility).

v0's defaults are good. Specific constraints make them great while keeping code cleaner.

## [Link to heading](#iterating-on-your-generations)Iterating on your generations

Once v0 generates your app, you have two main ways to iterate:

**Prompt for changes:** Describe what you want to change, add, or remove. Best for functional changes, adding features, or restructuring layouts.

**Design Mode:** Click Design Mode, select any element visually, and adjust properties directly. Faster for quick visual changes like colors, spacing, or typography.

Use prompts for logic and structure. Use Design Mode for visual tweaks.

## [Link to heading](#quick-reference:-prompt-template)Quick reference: Prompt template

Here's the template again, this time with a fully expanded example:

**Template:**

```
Build [product surface: components, data, actions].Used by [who],in [what moment],to [what decision or outcome].Constraints:- platform / device- visual tone- layout assumptions
```

**Example:**

```
Build a support dashboard showing: open tickets count,average response time, tickets by priority (high/medium/low),agent performance list with current workload, recent ticket activity feed.Used by support team leads (managing 5–10 agents),on their phones while walking the floor,to prevent agent burnout and maintain response-time SLAs.Checked every 30 minutes to identify overloaded agentsand redistribute work.Constraints:Mobile-first, light theme, high contrast.Color code by priority: red for urgent, yellow for medium, green for low.Show agent status badges (busy/available).Maximum 2 columns on mobile.
```

[

**Ready to build?**

Try it yourself. Next time you use v0, try being more specific. Add context about who's using your creation. Explain why it needs to exist. Describe how it should work.

Start building



](https://v0.dev/)

### [Link to heading](#want-to-go-deeper)Want to go deeper?

-   [v0 Documentation](https://v0.dev/docs) - Complete guide to all features
    
-   [Design Systems Guide](https://v0.app/docs/design-systems) - Learn how to create and use design systems
    
-   [Project Instructions](https://v0.app/docs/instructions) - Set up rules that apply to all generations
    
-   [v0 Templates](https://v0.dev/templates) - Pre-built starting points for common use cases
    
-   [Community Platform](https://community.vercel.com/c/v0/59) - Ask for help, share prompt ideas, and chat about AI projects with the community