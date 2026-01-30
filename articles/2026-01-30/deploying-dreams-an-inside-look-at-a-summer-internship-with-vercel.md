---
title: "Deploying dreams: An inside look at a summer internship with Vercel"
source: "https://vercel.com/blog/summer-internship-at-vercel"
publishedDate: "2024-09-13"
category: "frontend"
feedName: "Vercel"
author: "Aryan Vichare"
---

9 min read

Sep 13, 2024

Hello! I’m Aryan. I am currently a student at UC Berkeley, studying Electrical Engineering and Computer Science (EECS). This summer, I had the opportunity to be an intern at Vercel. It’s been an unforgettable experience. As my internship comes to a close and I head back to school, I want to share a behind-the-scenes look at what an internship at Vercel is like.

## [Link to heading](#how-it-all-started)How it all started

I started programming when I was in 8th grade. A major inflection point in my journey was competing in my first hackathon, Hack Cupertino 2018. This hackathon changed my mental model of the world. Instead of being a consumer of applications, I could become a creator. I could transform my ideas into code and publish it on the internet for others to use. Coding truly felt like a superpower.

Throughout high school, I continued cultivating my development skills by interning at a few startups and competing in more hackathons around the US.

In college, I joined a club called [Cal Hacks](https://hackberkeley.org/) my freshman year. Cal Hacks hosts the world’s largest collegiate hackathon, bringing together over 2000 students from around the world for a 48-hour challenge. I love the magic of building with the community. As a part of the Cal Hacks team, I help build our own open-source software to streamline running hackathons.

## [Link to heading](#why-vercel)Why Vercel?

I’ve been a customer of Vercel for years. Every hackathon or side project I created used Vercel and Next.js. The ease of use, incredible DX, and top-tier performance of both makes it easy to get started quickly. With tight competition timelines, I want as much time to focus on what I’m building, not infrastructure and configurations.

I’m inspired by Vercel’s culture of shipping fast, customer obsession, and sweating the details. Everything Vercel creates feels meticulously crafted, polished, and premium. I would see [shadcn](https://x.com/shadcn) and [John Phamous](https://x.com/JohnPhamous) sharing what they were working on, and I always wondered what it would be like to work at Vercel. I had to apply.

## [Link to heading](#vercel’s-intern-interview-process)Vercel’s intern interview process

The interview process at Vercel was different from most of my other interview experiences. Vercel’s interview mimics what it is like to work on the job. It tests your ability to _break down a problem_ and _reason aloud about possible solutions_. Using Google and asking clarifying questions are encouraged. I prefer this style of interview as opposed to a “leetcode” style interview because it practically evaluates real-world engineering skills. It feels real and authentic, and less like a trap.

All the hackathons and first-hand use of Vercel’s products paid off. I received an offer.

## [Link to heading](#what-projects-did-i-work-on-as-an-intern)What projects did I work on as an intern?

During my internship, I had the opportunity to work on multiple projects across a few different teams and codebases. Surprisingly, these were not small apps off in the corner. They were high-traffic, high-visibility apps customers use every day.

I led three major efforts over my 12 weeks as an intern.

### [Link to heading](#support-center-ux-improvements)Support Center UX improvements

The [Vercel Support Center](https://vercel.com/docs/dashboard-features/support-center) is a secure and streamlined way for Vercel Pro and Enterprise customers to communicate with the Vercel Support team. You can submit new support cases and view the status of existing support cases.

The experience was functional, but it was lacking useful features. In collaboration with the Customer Success Engineers (CSEs), we identified ways we could improve the customer experience.

-   Search support case subjects
    
-   Filter cases by case status
    
-   Sort cases by created, updated, and severity fields
    

This project gave me exposure to Vercel’s website monorepo powered by Turborepo, Next.js, Vercel’s internal design system ([Geist](https://vercel.com/geist)), and Vercel’s API. Here’s the before and after results.

![Screenshot of Support Center before changes](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FbxnZUM4v3ShmfPMxcGplI%2Fea52ba04b85b63bc38558d9ee1d8be07%2Fsupport-center-before-light.jpg&w=1920&q=75)![Screenshot of Support Center before changes](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2XQCkBKNyP9jncFqRSs2PC%2F792e0d036c4bf6287da1ca8e1ad26cf8%2Fsupport-center-before-dark.jpg&w=1920&q=75)

Screenshot of Support Center before changes

![Screenshot of Support Center after changes](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4m6JpAHAYpwwKCSR5VIPfH%2F667497201536f14c07884cb0f1ad8b99%2Fsupport-center-after-light.png&w=1920&q=75)![Screenshot of Support Center after changes](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F1IMOfy4UY1c9FABAL1bsxK%2F28426dfdbe4156432fb20a0774689ae7%2Fsupport-center-after-dark.png&w=1920&q=75)

Screenshot of Support Center after changes

After revamping the Support Center page, I published a [changelog](https://vercel.com/changelog/improvements-to-support-center) announcing the improvements. I was also able to share these improvements with the rest of the company during Demo Day, a weekly meeting at Vercel where we get to show each other what we’ve been working on.

### [Link to heading](#the-new-v0)The new v0

After Support Center, I transitioned to working on the next iteration of v0.

When [Vercel first announced v0](https://vercel.com/blog/announcing-v0-generative-ui), it was a generative user interface system powered by AI. It generates copy-and-paste friendly React code based on [shadcn/ui](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/) that you can use in their projects.

When I joined, we were preparing to launch [v0’s new conversational UI](https://x.com/v0/status/1826020673908535325).

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6YcMp5Q4VCpNAo62w2ZYin%2F6e3ed99c1fc6b8553f8a12dc3007fe69%2Ftry-out-the-new-v0-light.jpg&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FIE4j0k2bK0PJA6AZdziQf%2F6e5309b0703d48c470966dec78055b3f%2Ftry-out-the-new-v0-dark.jpg&w=1920&q=75)

In the new v0, I spearheaded the implementation of citations. This involved enhancing the Retrieval Augmented Generation (RAG) pipeline to source high-quality documentation and guides from Next.js, Vercel, Turborepo, Turbopack, AI SDK, and shadcn/ui. Additionally, I developed the frontend interface for displaying sources and inline citations. The team and I iterated on multiple versions of what the sources would look like. Below are some of the iterations we worked through before arriving at the final design.

**Iteration 1:** Initially, we wanted to display the sources as cards at the top of chat assistant’s response, so user’s would know which sources were referenced when generating the answer.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6fP4iCG922xl5SmIZhpCw0%2F4cbf1a3c5b3948f105d6f133c57d32d6%2Fv0-citations-iteration-1-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2sb5bdoll46biIhcSYt5Tc%2Fddd3dab93910112fa6ae98fb6dc75603%2Fv0-citations-iteration-1-dark.png&w=1920&q=75)

**Iteration 2:** We felt Iteration 1 was too invasive and demanded too much of the user’s attention. We then tried a pill-like design for Iteration 2. The more compact design took up less space and drew less attention. We also moved them below the chat assistant’s response instead of at the top.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4zx6aKh1IwTuiP0YSR4cxU%2F5c88df203b8298c1a0ae909e9698df00%2Fv0-citations-iteration-2-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5MBoI8nGcw0RuaeQGO7w45%2Feff5769383256ff6b88a2aef11b25918%2Fv0-citations-iteration-2-dark.png&w=1920&q=75)

**Iteration 3:** The pills in Iteration 2 lacked key information about the source. We switched back to the cards, but redesigned them to be more compact and less distracting, while providing more information about the source. It was a balanced compromise.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F52w2gMH2Up9SdM41BYNYmc%2F32d3f0fae0509413e6c12a4d8de8a95f%2Fv0-citations-iteration-3-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F18ApatRgr9tzmjnRxlshHi%2F21aee0b842cd17a307d94856ee6cdc4d%2Fv0-citations-iteration-3-dark.png&w=1920&q=75)

The introduction of citations enables v0’s answers to be grounded in facts, as the output uses numbered references (like a research paper) to justify its response.

After building citations, I began rolling out hundreds of beta invitations to the new v0. This included building out the onboarding experience to seamlessly introduce users to the new iteration.

![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F7koyg1M6Bm3vuSDun4A74K%2F3749475fa723a732e5c7f04ea65ec8d5%2Fv0-onboarding-screens-light.png&w=1920&q=75)![](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F6sg2PoZk6BJWJ7JBMMNJeS%2Fbdcb00c7eb6b2cf01bb9f97e9ae673d3%2Fv0-onboarding-screens-dark.png&w=1920&q=75)

The new v0 has been a lot of fun to help build and use. You can create some [incredible experiences](https://x.com/evilrabbit_/status/1826385997376225643) with it. If you haven’t tried it yet, [you should](https://v0.dev/chat).

### [Link to heading](#feeding-the-new-v0-brain)Feeding the new v0 brain

One of the best parts of working at Vercel is access to some of the best and brightest minds in the industry. Everyone is such a wealth of insight and knowledge. Sadly, this knowledge can remain trapped within Vercel. I saw an opportunity to democratize this knowledge and share it with the community.

I set out to create v0 Brain—a way to seamlessly bring the best internal Vercel insights, recommendations, and UI design aesthetic directly from the creators of React, Next.js, shadcn/ui, Turbo, SWC, and more to further supplement v0’s knowledge. The workflow needed to be effortless. Vercel lives in Slack and we love emojis (we have over 8000 custom emojis). The v0 Brain workflow is based off a specific emoji reaction. Add the emoji reaction to any insightful message in Slack and it funnels the insight to the AI team to be evaluated and added to v0’s underlying AI model.

Again, I had the opportunity to present at Demo Day, where I shared how anyone in the company can contribute to v0’s knowledge base with ease in our day-to-day conversations with each other.

## [Link to heading](#what-was-it-like-working-at-vercel)What was it like working at Vercel?

I had direction, but I had full autonomy from day one. I had immense support from my manager and “welcome buddies” to quickly get onboarded and oriented. Working with a sense of urgency and iteration velocity are Vercel core values. I started merging pull requests and releasing to Production on my second day. I shipped over 80 pull requests during my internship. Working at Vercel is like the intensity of a hackathon, but with just the right amount of tools, safeguards, and processes in place to ensure quality.

I had the opportunity of working on several impactful projects during my internship, all of which directly contributed to the core product and made it into Production. I had full ownership of my projects end-to-end. In a lot of ways, I felt more like a full-time software engineer versus an intern on the team, which I really enjoyed.

The best part of the Vercel experience is the people. I met some of my design and engineering heroes. Like the creators of major OSS projects, such as [shadcn](https://x.com/shadcn) of shadcn/ui and [Paul Henschel](https://x.com/0xca0a) of zustand and react-three-fiber, and the famed leadership of Vercel. Learning firsthand from the greats was unforgettable. All of them are kind, welcoming, and encouraging.

I was motivated every day because I knew my work would impact Vercel’s millions of global users. Working at Vercel as an intern has truly been a dream come true.

## [Link to heading](#what-did-i-learn-during-my-internship)What did I learn during my internship?

I learned a tremendous amount during my internship that helped me become a better engineer and team player. Here’s some of my key learnings:

-   **I learned how to work in engineering at scale**. Tools like TypeScript help keep vast codebases spanning multiple years and numerous programmers maintainable.
    
-   **I learned how to communicate my ideas.** Through design documents and request for comments (RFCs), this helped me get get early feedback and buy-in from the team.
    
-   **I exercised “design engineering” muscles.** Creating user interfaces that invoke feelings of delight and joy. Attention to detail is important, like this example of a [loading animation I created for v0](https://x.com/aryanvichare10/status/1820666125035642898).
    
-   **I learned advanced LLM techniques.** Few-shot prompting, chain of thought (CoT) prompting with structured tagging, prompt chaining, and efficient parsing and chunking strategies were all new to me. I also learned how to add an observability and tracing layer on top of LLMs and build robust empirical evaluations (evals for short) to benchmark the performance of our models.
    

There is more to being an engineer than your technical skills. I meet with several people across the company for coffee chats, both within Engineering, but also Design, Customer Success, and Sales. These conversations helped uncover soft skills I’ll remember just as well:

-   **Work in public.** Get in the habit of asking questions aloud and being proactive in posting blockers and updates. This fosters a culture of feedback and collaboration. I would post updates multiple times a day about what I’m working on and send recaps of the major things I did in that week so stakeholders were on the same page. This is especially important in remote working environments.
    
-   **Communicate clearly and effectively.** Aim for simplicity in your writing and strip complexity. Value people’s time. By decluttering your writing, you can more effectively deliver your message in the clearest way possible. Writing effectively is also about knowing your target audience. Write with the reader in mind.
    
-   **Pair program more.** Vercel has a strong pair-programming culture and I love it for two reasons: 1) I practice communicating a problem or task at hand with another engineer in real-time and 2) I get to learn how others think and solve problems. I find myself also picking up on productivity tips, which helps me become a more efficient developer.
    
-   **Iterate to greatness (ITG).** ITG is one of my favorite Vercel values. The term encapsulates the idea of launching and shipping quickly without comprising quality. It’s not about achieving perfection on your first try, but instead, launching an initial version and rapidly iterating on it until it’s great.
    
-   **Practice managing up.** Regularly update your manager and stakeholders on progress, blockers, and wins (big and small). I would proactively seek feedback weekly, so I’d be continually learning and growing. Make sure to align your work with team and company priorities, and be ready to articulate how your efforts contribute to broader company goals.
    

## [Link to heading](#what-advice-do-you-have-for-other-interns-and-engineers)What advice do you have for other interns and engineers?

Finding an internship or full-time job can be a grueling and intimidating. I have experienced this firsthand—spending several months applying to hundreds of companies, constantly preparing for technical leetcode-style interviews, and receiving numerous rejection letters. It’s tough. But when it finally lands, it's worth it. Keep going.

My advice? Build up your experience bank. The process of taking an idea from _zero to deployed_ will teach you what it’s like to think through the software delivery process. I picked up this experience by working on hackathon and side projects. Building real apps that solve your own problems or scratch your own curiosities cannot be understated. In hindsight, this is what helped me the most in getting an internship at Vercel. I was well versed in building and deploying apps with Vercel’s tech stack before I joined. It gave me immense confidence in applying and interviewing.

Spend time investing in yourself. Build that idea you’ve been sitting on. You never know where it’ll take you.