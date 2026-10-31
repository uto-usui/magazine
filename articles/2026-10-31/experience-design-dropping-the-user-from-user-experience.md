---
title: "Experience Design: Dropping the “User” from “User Experience”"
source: "https://www.nngroup.com/articles/ux-vs-experience-design/"
publishedDate: "2026-10-30"
category: "design"
feedName: "Nielsen Norman Group"
author: "Raluca Budiu"
---

Summary:  AI is expanding UX beyond human users to agents acting on their behalf. Experience design names this broader field, which still centers on people’s goals.

I am not one for new terms. When NN/G changed its job titles from “user-experience specialist” to “experience specialist”, I was skeptical. [The article](https://www.nngroup.com/articles/experience-design/) we published to explain the change did not convince me either: [yet another name for the same thing.](https://www.nngroup.com/videos/ux-vocabulary-inflation/) I now think the new title was right, but for a reason we did not think of at the time. Our field is no longer only about people directly using digital products. It also includes [agents](https://www.nngroup.com/articles/definition-ai-agent/) that act on their behalf. UX is not disappearing. But AI is expanding the field in several directions at once.

-   [UX Has Always Been More than UI](#toc-ux-has-always-been-more-than-ui-1)
-   [From User Experience to Experience Design](#toc-from-user-experience-to-experience-design-2)
-   [The Scope of Experience Design](#toc-the-scope-of-experience-design-3)
-   [AI Is Also Changing Our Methods](#toc-ai-is-also-changing-our-methods-4)
-   [Experience Design: Broader, Still Centered on People](#toc-experience-design-broader-still-centered-on-people-5)

## UX Has Always Been More than UI

[Don Norman helped popularize the term "user experience](https://www.nngroup.com/videos/don-norman-term-ux/)" in the 1990s because "usability" and "user interface" were too narrow. He wanted a name for everything a person experiences with a product, from the packaging to the support call. The term widened the object of design. Yet, the idea of a broader object of design did not really hit home until the 2010s, when modern smartphones rose to ubiquity, and people started using multiple [channels](https://www.nngroup.com/articles/channels-devices-touchpoints/) to accomplish a goal. As a response, UX and design professionals began creating [customer-journey maps](https://www.nngroup.com/articles/customer-journey-mapping/) and [service blueprints](https://www.nngroup.com/articles/service-blueprints-definition/) to help them understand and track all the possible ways in which a user could interact with the organization while trying to achieve a goal. At that time, we began to understand that a good experience meant that all the touchpoints worked together coherently.

But throughout all these iterations of the work, one assumption stayed constant: that the human was the user — the one who interacts with the company directly, through one of many possible channels.

[AI changes that assumption.](https://www.nngroup.com/articles/ai-agents-as-users/) And not because users can use an AI-chatbot feature to interact with a business. (That is just another channel in the [journey-level experience](https://www.nngroup.com/articles/ux-vs-cx/).) But because humans may no longer interact with the company at all. Instead, their personal agents may do so. And these agents may act completely outside the ecosystem of channels and touchpoints that the company has devised.

A person may ask an [AI assistant](https://www.nngroup.com/articles/ai-assistant-context/) to shop for groceries, file a complaint, cluster photographs, book a flight, or cancel a subscription. The agent becomes the immediate user of the digital product while acting on the human’s behalf.

The journey **now spans not only multiple channels but also multiple actors.** This is why I believe “experience design” is a fitting name for the broader field.

## From User Experience to Experience Design

> **Experience design** is the discipline concerned with designing and evaluating how people accomplish goals through digital systems, whether they interact with those systems directly or through agents acting on their behalf.

The field includes traditional UX but extends beyond it. Like UX, it studies the products people use themselves and the AI systems they interact with, but it goes beyond UX to encompass the systems that agents use on humans’ behalf. It also expands **the methods** used to design and evaluate experiences.

### Experience Design Is Still Rooted in Human-Centered Design

Expanding the field beyond human users does not mean abandoning the principles of human-centered design. The ultimate criterion of success for an experience is whether the human achieved their goals. Designing for agents is not the same as optimizing blindly for agent success; the goals, interests, and welfare of the humans behind them still hold priority. For example, an agent-facing system that facilitates bank transactions would still need to consider the financial safety and interests of the people on whose behalf the agents act.

## The Scope of Experience Design

We said above that experience design expands the scope of UX. Experience design deals with designing for:

-   Humans interacting with digital products
-   Agents using digital systems on behalf of people
-   People and agents interacting with digital systems

### 1\. Humans Interacting with Digital Products

AI does not obliterate the traditional scope of UX. All the topics that UX has traditionally studied (such as usability, information architecture, interaction design, content, and accessibility) are still within the scope of experience design.

People will still use traditional digital systems directly and they still need to be able to complete the tasks they want, should they choose to do it the regular way. They need to be able to purchase an item, navigate a healthcare website, or complete a tax form. Traditional UX remains the foundation of the field.

However, beyond traditional digital systems, a special type of digital system is one that uses generative AI: [AI features embedded on a website](https://www.nngroup.com/articles/less-chat-more-answer/) or within an application, AI personal assistants, AI agents, [generative UIs](https://www.nngroup.com/articles/generative-ui/), or other AI-enabled products.  Many traditional UX methods still apply to these systems, but some of their characteristics (nondeterminism, autonomy, and the ability to make inferences) raise new research questions that those methods were not designed to address.   Some of these questions include: When should an agent act without asking the human? When should it ask the human for clarification? What should the agent remember? What should an agent consider as part of its context and what types of information should it have access to? When should control return to the person? How should someone inspect or reverse an action taken by an agent?  

Because many of these questions depend heavily on people’s needs, goals, and contexts, [qualitative research](https://www.nngroup.com/articles/quant-vs-qual/) will remain as important as ever. However, new methods or adapted protocols may need to emerge as well –– for example, [repeated runs for systems](https://www.nngroup.com/articles/eval-ai-output/), analysis of digital system’s variability, inspection of log traces, observation of how control moves between people and agents.

### 2\. Agents Using Digital Systems on Behalf of People

Agents act on people’s behalf, but what makes an experience good for humans is not necessarily what makes an experience good for AI. AI agents may have access to representations that humans don’t (e.g., code, structured data, APIs), while humans may take advantage of [visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/), spatial organization, and other perceptual cues.

Figuring out how to design for agents is a new emerging discipline that some call [**agent experience**](https://biilmann.blog/articles/introducing-ax/)**.**

### 3\. People and Agents Interacting Within Digital Systems

When people and agents are part of the same journey, new experience problems can arise.  A product can work well when humans or agents use it but can be flawed when both act on it.

For example, imagine that a person asks an AI agent to book a flight. The agent recommends a flight, and the user accepts its recommendation. To proceed with the booking, the agent asks the user to log into the airline’s website, but the user has trouble doing so because their password-manager extension is not available in the agent’s in-app browser. The agent works just fine, and the authentication request is reasonable. The in-app browser is designed for the agent to perform steps and for the user to consume content.

The experience breaks when the task moves from agent to person and the person is asked to use a tool that they normally don’t use and that is presumably designed for agents.

The fix for this problem is easy, but beside the point. The problem itself could never have been spotted by studying the agent or the human alone; it only becomes visible when we study the human-agent system as a whole. Once tasks in a journey pass back and forth between humans and AI, some of the experience problems will live in the handoffs rather than in the interaction alone. Continuity of information and progress, authorizations, transparency, and recovery all become experience-design problems in their own right.

![Three panels showing the design challenges of experience design: humans interacting with digital products; AI agents interacting with APIs, data, and services in a digital system; and humans and AI together interacting within a digital system.](https://media.nngroup.com/media/editor/2026/10/26/experience-design-challenges.png)

_Experience design studies how humans interact with digital products, how AI agents interact with digital products, and how humans and AI work together to accomplish a goal._

## AI Is Also Changing Our Methods

AI also changes how experience-design work is done. There are three reasons for that:

1.  **AI accelerates traditional UX practices**, such as generating prototypes, drafting study materials, or analyzing research data. This changes the efficiency of UX and design work, but does not necessarily its nature.
2.  **AI may enable new methods** for achieving traditional UX goals. Researchers are already experimenting with [synthetic users](https://www.nngroup.com/articles/synthetic-users/) and [digital twins](https://www.nngroup.com/articles/digital-twins/), [AI interviewers](https://www.nngroup.com/articles/ai-interviewers/), and AI-based usability evaluations. Some of these methods augment traditional methods, but they all still require rigorous validation.
3.  **Agents and human-agent systems are new objects of study**, and some of the traditional human-research methods will not be suitable for researching them.  Agents cannot be necessarily interviewed or asked to participate in a usability test, but researchers may be able to vary context, instructions, or available tools that are made available to these agents to research their behavior. Additionally, studying human-agent experiences may require adapted or new methodologies focused on how the person delegates and how control moves back and forth between agents and humans.

## Experience Design: Broader, Still Centered on People

A while back, UX expanded its object of study from individual interfaces to journeys across channels. Today, AI is expanding the definition of the field again: the journeys can cross not only channels but also involve multiple actors, and the methods we use change, too. We still design and evaluate systems so they help people efficiently accomplish their goals, but the systems, actors, and methods we study are broader.

Experience design is the name for this larger, still human-centered field.