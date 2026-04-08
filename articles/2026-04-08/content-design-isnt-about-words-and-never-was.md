---
title: "Content design isn’t about words, and never was"
source: "https://uxcontent.com/content-design-isnt-about-words-and-never-was/"
publishedDate: "2026-04-06"
category: "ux-writing"
feedName: "UX Content Collective"
author: "Michelle Savage"
---

We get two exclamation points per year. That’s the unspoken rule at PayPal. Across the entire product, for 400 million users, just two. Left to its own devices, AI will burn through both on a single rewards screen and throw in the dreaded congratulations on top of it.

Last year a content designer on my team almost shipped an error message that described a failed payment but didn’t tell the user what to do next. She used AI to write it. It was accurate, polite, and grammatically perfect. But it was also completely useless to a customer staring at a broken transaction late at night wondering if their money is gone.

Our content designer caught it. Added one line. And nailed it.

The mistake wasn’t Claude’s fault. It executed perfectly as instructed. The problem was nobody had given it any context about the customer’s anxiety, the stakes of the moment, or the one question every person asks when a payment fails: what do I do now?

AI is basically the most confident intern you’ll ever manage. It will produce something plausible with zero hesitation. But it has no idea what’s at stake unless you tell it. And “telling it” turns out to be the most important skill content designers can build right now.

Content modeling is what fixed it. We’ve written over 200 rules for one PayPal product and set up a content system that’s saving us serious time. Our partner teams loved it and started building their own. But then the whole thing hit a wall I should have seen coming. This article is about what worked and what I’m still figuring out.

### The answers lived in Slack threads nobody could find

We didn’t set out to build a content system like this. We built one because I got tired of answering the same questions every week and losing the answers every time. Every feature launch, the same conversations: what should this notification say, how do we handle the error state, what’s the right tone here? The answers lived between my brain, someone else’s brain, and a Slack thread from four months ago.

So we started writing things down.

My team is now capturing every rule, decision, and context for every product into Claude Skills and Projects. How we talk in high-stakes moments. What a declined user needs to hear versus what an approved one does. Why we never say “denied” in a credit decision and always say “not approved.” Standards that existed only because someone who’d been around for three years happened to know them.

When a designer hits a moment she’s unsure about, she describes the scenario: the user, the moment, and what’s at stake. The system tells her the right approach and why, based on standards the team already agreed on. We’re saving 10+ hours per week per content designer because of this system that was pretty darn easy to set up.

Content designers started checking content against the rules before reviews, not after. For a while, it felt like we’d solved something real. We had a system, people were using it voluntarily, reviews were getting faster, and content was better than ever.  
  
But I kept noticing the same problem. The rules worked great inside our team. The second they needed to travel, to another product, another team, another tool, they fell apart. You see, a rule library and a content model are two different things. I didn’t know that yet.

### The gut feeling, turned into a rule

Content modeling is taking that gut feeling you have about a sentence and turning it into a repeatable rule. What information belongs in a moment, in what order, serving what purpose, with what constraints. The skeleton AI needs to produce something worthy of  keeping.

Let’s look at a simple example: a rewards notification.

Without a model, AI writes: “Congratulations! You’ve earned points from your recent purchase.” Generic and could be anyone’s product. It also breaks our exclamation point rule. And our rule about not congratulating people for doing basic things.

With a model, AI knows every rewards notification needs four things: what happened, why it matters right now, how close the user is to something they want, and one clear action. It also knows our style guide and has clear examples of what good looks like. 

So it writes: “You earned 150 points at Target. You’re 200 points away from a $10 reward. Browse your rewards.”

Boom. The same AI tool…only someone gave it the right context to do a good job.  
  
That’s a content model, plain and simple. 

### The Rule Stack

I started out by writing rules in a format AI would easily understand. Basically the same information I’d give any new content designer joining a project. I call it the Rule Stack, and it has four parts.

**Name the pattern.** Not just “error messages.” Name the emotional reality. “Messages where the user is about to lose something they earned.” The more specific you are about what the customer is feeling, the more useful the rule becomes.

**Show what AI slop looks like.** Write out the confident, generic version AI produces without guidance. For expiration, that’s something like “Your points expire in 30 days.” It’s technically accurate but emotionally tone-deaf. You’re basically training AI to recognize what it should reject.

**Define what good looks like.** The version that works for your users, in your product, at this moment. “You have 30 days to use your 5,000 points. Browse rewards.” Same information but completely different behavior.

**Name the trust decision.** This is the part AI can’t do on its own, and it’s where this whole system lives or dies. Every piece of content your product shows a user is a trust decision. Someone has to decide: does this moment call for dignity, a path forward, or both? AI doesn’t know the answer to that question. You do.

That fourth step is where most people stop and stare. So let me show you what it looks like.

**Decline messages** AI slop: “Your application was denied.” What we write: “We couldn’t approve this application, but we have another card for you.” A declined user is already disappointed. AI gives them the outcome. The model makes sure they also get a next step and leave with their dignity intact. “Denied” is the system’s word. We don’t use it.

**Error messages** AI slop: “You exceeded the transfer limit.” What we write: “You’ve reached your daily transfer limit. You can send more starting tomorrow.” “Exceeded” is another system word. “You can send more starting tomorrow” is the answer to the question the customer’s already asking.

**Onboarding** AI slop: “Welcome to PayPal! Get started by exploring all the features available to you or signing up for our rewards program.” What we write: “You’re in. Link a card or bank account to start sending and receiving money.” A new user doesn’t need a welcome speech. They need to know what to do in the next sixty seconds. “Welcome” is the product talking about itself. “You’re in” makes the moment about the customer.

**The “just/simply” rule** This one surprises people every time. AI writes: “Simply link your card to start earning rewards.” We write: “Link your card to start earning rewards. It takes about 2 minutes.” “Simply” lies. It dismisses the hesitation instead of addressing it. Time estimates actually help. And when you see “just” or “simply” in AI output, it’s a signal that the trust decision is missing. Nobody asked whether the user might be nervous. The rule forces that question.

I know…that’s a lot of rules, and I haven’t even gotten to loading states, permission requests, or anything with a legal disclosure. But that’s the job.

Content designers have always carried these rules. We just carried them in our heads. AI made writing them down non-negotiable. It’s now the single greatest time investment a content designer can make.

### The three-day workshop

A few months ago one of our content leads was in a three-day workshop with a cross-functional team. Designers, PMs, engineers, all working through a complicated new feature. Talented, collaborative…good people genuinely trying to get it right.

Every single day of that workshop, she had to remind someone that we can only have one call to action per screen.

Simple rule, right? But someone would add a secondary button “just in case.” Someone else would pop in an additional option “so the customer has another option.” A screen would turn into a billboard because a leader wanted one more thing surfaced. By the end of each session, screens that started clean had three competing actions and copy pulling the user in four directions at once.

Nobody was being difficult. The rule had never been written down in a way that made it stick. It lived in our team’s institutional knowledge as obvious. But it wasn’t obvious to anyone else in the middle of a sprint.

That content designer spent more time defending standards than designing. That’s the real cost of undocumented rules. Not just bad output. The time and energy it takes to hold the line in every room, every workshop, every review.

When a rule is documented, named, and connected to the reason it exists, it stops being one person’s opinion and becomes a shared standard. AI can follow it. Designers can reference it. Partners stop relitigating it in every session.

One CTA per screen is a trust decision, not a preference. When a user is in a high-stakes moment, multiple actions create hesitation. Hesitation creates doubt. Doubt creates abandoned flows and support tickets. The rule protects the user. The model gives that time and energy back to the content designer.

### Where to start

OK, so where do you start with content modeling? Well, don’t start with the content causing the most debate. Start with the content where mistakes cost the most.

Errors. Declines. Payment failures. Security messages. These are the moments where bad AI output doesn’t just feel off. It damages trust, creates support chaos, and sometimes creates legal exposure. When the risk is that obvious, people see your work as protection, not documentation.

Here’s a challenge to get you started. Once you have even one rule documented, take it to someone. Find one of your partners and show them: here’s what AI wrote without the model, here’s what it wrote with it. That conversation starts something big. The person you showed it to references it in the next review. Someone else asks where the rule came from. You point to the model. They use it. Then they show someone else.

You can’t be everywhere. But your content model can.

### The wall

Here’s the part I’m still figuring out. And I’m telling you that upfront because I think it matters more than anything else in this article.

Our Claude system is catching on beyond my team. Partner teams now want to build their own. But getting a content model connected to the actual systems where content gets made is the missing link. And getting this built used to mean one thing: a conversation with engineering. Most content designers didn’t have the vocabulary for that conversation yet. Because it didn’t used to be their problem.

We’re working on that. Some of our content designers are now taking Technical Foundations for Content Designers through the UX Content Collective. Not to become engineers, but to be able to influence how systems get built.

But the path is getting shorter. One of our content designers is building a Figma content token system with her product designer right now, no engineering required. Content tokens that live in the design system, connected to the components they govern. When the model changes, the components know. No Jira ticket or engineering sprint. Just two designers solving the problem themselves.

The barrier is still very real. But it no longer requires an engineering team. Now it requires a content designer who’s willing to figure it out. That’s a very different problem.

### The tools

I mentioned the Slack threads nobody could find. Here’s what replaced them.  
  
Our rules now live inside Claude Projects, which means every time a designer starts a conversation, the standards are already loaded. No searching, no pasting, no ‘where’s that doc.  
  
Claude Projects keep the standards where the work happens. I drop our rules into a Project and check content against them before anything goes to review. What used to be a Slack thread nobody could find is now a question the system answers in seconds.

Claude Code lets me test content in real context. A working prototype where I can see if the copy does what it’s supposed to do at the moment it matters. Claude Cowork handles the operational layer: rules load automatically from a CLAUDE.md in each product folder, self-checks run before anyone sees the output, and a monthly audit flags rules we haven’t referenced in 90 days. Dead rules are just as dangerous as missing ones. Go ahead and ask me how this went in a few months.

What used to take a content designer 20 minutes per screen happens before the file even opens. And when a content designer is on PTO, the standards don’t go on PTO with her.

I’m not an engineer. I also no longer need to be one to make something that works. The content designers getting the most out of these tools aren’t the ones who know the most about tech. They’re the ones who can describe exactly what they need in one clear sentence. That’s a writing skill.

### What AI accidentally proved

Here’s the thing I never in a million years expected.

For twenty years, content designers have been arguing for visibility. Arguing for a seat at the table. Arguing that we do more than “the words.” And for twenty years, the answer has mostly been polite nodding followed by getting looped in after the product brief was already written.

AI changed that, and the change is in our favor.

AI didn’t replace content designers. It was bad enough at the job that we had to write down everything we know. And once we did, something shifted. People could see the judgment. They could see the gap between what AI produced and what we produced. They could see 200 rules and realize that someone had been making those calls invisibly for years.

Building models forces you to name the thing you’ve been doing invisibly. And once it has a name, it has value that’s harder to dismiss.

Writing clearly is still the foundation. You can’t encode a rule you can’t articulate. And you definitely can’t define a trust decision you haven’t named. The writing skill didn’t go away. It moved upstream, which is exactly where content design has always argued it belongs.

And here’s the part that surprised me most: once the rules are in the system, people stop crediting you for “the words.” They start crediting you for the decisions behind those words.That’s a really good place to be. 

If you’ve been trying to explain your value to a room full of PMs and engineers, stop explaining. Build the model. And then let them see it.