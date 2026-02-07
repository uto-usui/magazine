---
title: "Planning for failure: designing chatbot fallbacks"
source: "https://uxcontent.com/designing-chatbots-fallbacks/"
publishedDate: "2025-10-17"
category: "ux-writing"
feedName: "UX Content Collective"
author: "Catherine Bryce"
---

Designing chatbots is a tricky task. Ask customers if they like chatbots, and [most will say](https://www.mcgill.ca/channels/channels/news/despite-rise-chatbots-people-still-prefer-human-customer-services-366110) they’d rather talk to a human. But when the choice is between a two-minute chatbot answer or a twenty-minute phone queue, the story changes.

At the Bank of Montreal (BMO), I was leading efforts to improve chatbot accuracy. The bank’s new chatbot, BMO Assist, was handling 760,000 users and 1.08 million sessions in its first year—but more than half of those conversations were being misclassified. On paper, accuracy seemed like the obvious problem: if the bot could recognize more queries correctly, customers would get better answers.

## **The cost of misclassification**

BMO Assist launched as the bank’s first chatbot for everyday banking in late 2023. It ran on Amazon Lex, a platform with limited NLU at the time. Right away, accuracy became an issue: similar phrases were often misclassified or not classified at all.

Here’s how that looked in practice:

![](https://uxcontent.com/wp-content/uploads/2025/10/fallback-1.png)

The bot actually had a relevant intent (e.g., Locking a card) but because the match score was under 50%, it suppressed the answer and defaulted to fallback. To the customer, the bot was clueless. To the business, it meant more calls to the contact center.

And the fallback itself only amplified the problem. Messages were vague and repetitive: “I didn’t understand. Try asking your question a bit differently.” There were no recovery options, no clear escalation, and no alternative paths forward. Customers ended up stuck in loops, abandoning the bot altogether.

![](https://uxcontent.com/wp-content/uploads/2025/10/fallback-2.png)

That’s when I realized the accuracy problem had a design counterpart. Even if training improved the model over time, customers would still hit a fallback. And as long as fallback remained a dead end, those customers would keep failing: driving up call volume and etching a bad memory of their BMO interaction. The real opportunity wasn’t just making the bot smarter. It was making failure less painful.

## **Designing chatbots with fallback is a core product requirement**

Once I had the top-line stat—over half of sessions ending in misclassification—I dug deeper into the patterns. Three stood out:

-   **Phrasing variations confused the NLU.** Everyday synonyms like “freeze,” “lock,” or “cancel” all pointed to the same intent, but the system treated them as different requests.
-   **Fallback loops left users stranded.** The default “I didn’t understand. Try asking your question a bit differently.” was repeated then paired with the same set of generic CTA buttons no matter what the customer had just typed. Instead of feeling tailored, the experience felt dismissive.
-   **No visible escalation.** Unless a customer specifically asked about contacting a branch, there was no path to a human. The business goal was deflection, so escalation wasn’t designed into fallback at all.

For a huge portion of customers, fallback was the primary interaction.

Industry research shows BMO wasn’t alone. A recent study found that 48% of companies say their chatbots frequently fail to solve user issues correctly ([TeamDynamix, 2024](https://www.teamdynamix.com/blog/study-shows-traditional-chatbots-are-failing/)). And while adoption is rising, over 40% of consumers express concern about the reliability of chatbots ([Forbes, 2025](https://www.forbes.com/sites/garydrenik/2025/08/21/these-chatbot-mistakes-could-cost-you-customers/)).

The insight for me was clear: fallback ≠ backup. If nearly half of customers are encountering fallback, then fallback _is_ the product—and it deserves the same design attention as any other core experience.

## **Designing chatbots to fall-forward instead of fallback**

I reframed fallback as the lowest-hanging fruit: the fastest, most scalable way to improve customer experience without waiting months for new training data. Instead of a vague “I didn’t understand” loop with generic CTAs, I designed a **fall-forward pattern** that guided customers toward relevant options.

-   **Content patterns:** Each fallback followed a consistent, scannable template so customers knew what to expect.
-   **Top relevant matches:** If the bot was uncertain, it surfaced the most likely intents directly in the fallback. Customers could then choose the closest match instead of starting over.
-   **Voice:** Human and empathetic, more conversational. 

Note: An escalation path to human support was not included in the fall-forward flow. It only appeared if a customer explicitly asked to contact a branch, since the business goal was deflection. This was a design compromise to align with business priorities. 

**Before**

-   Fallback triggered anytime NLU confidence dropped below 51%, even when a close match existed.
-   The chatbot showed generic fallback options, not tailored to the user’s intent.
-   Result: users saw pre-determined CTAs (e.g., _“Go to menu”_), often irrelevant to their request.

![](https://uxcontent.com/wp-content/uploads/2025/10/fallback-3.png)

**After**

-   Worked with the Product Owner and Information Architect to update the logic.
-   When confidence was low, the chatbot displayed the closest-matching CTAs related to the user’s request.

![](https://uxcontent.com/wp-content/uploads/2025/10/fallback-4.png)

#### **Designing chatbots with a framework for clarity and action**

Users in a fallback state are already frustrated. To help them recover quickly, I built a scalable messaging framework grounded in UX writing best practices:

![](https://uxcontent.com/wp-content/uploads/2025/10/fallback-5.png)

This framework supported consistency, scalability, and ease of implementation across fallback scenarios.

Live product: 

![](https://uxcontent.com/wp-content/uploads/2025/10/fallback-7.png)

**From pushback to alignment**

Getting here wasn’t automatic. I kept raising fallback redesign as the “lowest-hanging fruit,” but at first met pushback from the Product Owner. His priority was continuous AI training, which was important work but slow to deliver results and often still inaccurate. Slots, the fields the bot tries to capture from a user’s request (like “account type” or “amount”), could sometimes patch the gaps, but they didn’t solve the underlying issue: the bot struggled to understand natural phrasing.

As training cycles dragged on, it became clear that accuracy alone wouldn’t improve the experience fast enough. That’s when the PO came around to my approach: designing chatbots with fallback for immediate impact, while still investing in long-term AI improvements.

This shift gave us a way to improve customer outcomes in the short term without abandoning the bigger goal of a smarter, more accurate chatbot.

## **The results we saw**

The shift to fall-forward wasn’t just a copy tweak: it reshaped how customers experienced the bot.

Instead of looping through the same dead-end message, customers now saw the closest-matching options written in a clear, consistent style. That gave them a way forward without starting over or abandoning the conversation.

The impact showed up quickly:

![](https://uxcontent.com/wp-content/uploads/2025/10/fallback-6.png)

Beyond the numbers, the new content patterns gave the team a scalable framework. Content designers and developers now had consistent structures to apply, which reduced ad-hoc copywriting and created a more cohesive experience.

Most importantly, customers left with fewer “bad memory” loops. The chatbot became more trustworthy, better at deflecting routine queries, and more aligned with its original promise: helping customers succeed quickly without picking up the phone.

## **Designing chatbots for failure is designing for trust**

My mandate began with accuracy, but I realized accuracy does not always equal customer success.

-   **Precision** measures how often inputs are classified correctly.
-   **Outcomes** measure whether customers can still complete their task, ideally through self-service.

That distinction shaped the fall-forward approach. Even when the bot misclassified, showing the top relevant matches let customers recover and succeed. It was a win for them, and a deflection win for the business.

Today, expectations are higher than ever. With ChatGPT and other generative AI tools in the public eye, customers assume bots should always get it right. The reality is different. Most organizations still rely on constrained platforms like Lex, where NLU remains limited. The gap between expectation and capability is real, and it is not closing overnight.

This is where conversation designers play a critical role:

-   **AI strategy:** Redefine success around customer outcomes, not just precision.
-   **Governance:** Create scalable patterns that teams can implement consistently.
-   **User trust:** Design clarity and empathy in constrained contexts so users feel guided, not abandoned.

The expectations of our role now reach far beyond writing copy. Conversation designers help shape how organizations govern their AI, define what success really means, and build the trust that keeps customers using automation.

For me, fallback design was never just a patch. It was a way to align user needs with business goals in the moments when AI fell short—and to show that designing chatbots for failure is ultimately a way of designing for trust.