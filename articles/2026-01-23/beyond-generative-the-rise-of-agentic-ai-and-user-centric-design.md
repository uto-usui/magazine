---
title: "Beyond Generative: The Rise Of Agentic AI And User-Centric Design"
source: "https://smashingmagazine.com/2026/01/beyond-generative-rise-agentic-ai-user-centric-design/"
publishedDate: "2026-01-22"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Victor Yocco)"
---

-   19 min read
-   [UX](https://smashingmagazine.com/category/ux), [Design](https://smashingmagazine.com/category/design), [AI](https://smashingmagazine.com/category/ai)

Developing effective agentic AI requires a new research playbook. When systems plan, decide, and act on our behalf, UX moves beyond usability testing into the realm of trust, consent, and accountability. Victor Yocco outlines the research methods needed to design agentic AI systems responsibly.

Agentic AI stands ready to transform customer experience and operational efficiency, necessitating a new strategic approach from leadership. This evolution in artificial intelligence empowers systems to **plan**, **execute**, and **persist** in tasks, moving beyond simple recommendations to proactive action. For UX teams, product managers, and executives, understanding this shift is crucial for unlocking opportunities in innovation, streamlining workflows, and redefining how technology serves people.

It’s easy to confuse **Agentic AI** with Robotic Process Automation (RPA), which is technology that focuses on rules-based tasks performed on computers. The distinction lies in rigidity versus reasoning. RPA is excellent at following a strict script: if X happens, do Y. It mimics human hands. Agentic AI mimics human reasoning. It does not follow a linear script; it **creates** one.

Consider a recruiting workflow. An RPA bot can scan a resume and upload it to a database. It performs a repetitive task perfectly. An Agentic system looks at the resume, notices the candidate lists a specific certification, cross-references that with a new client requirement, and decides to draft a personalized outreach email highlighting that match. RPA executes a predefined plan; Agentic AI formulates the plan based on a goal. This autonomy separates agents from the predictive tools we have used for the last decade.

Another example is managing meeting conflicts. A predictive model integrated into your calendar might analyze your meeting schedule and the schedules of your colleagues. It could then suggest potential conflicts, such as two important meetings scheduled at the same time, or a meeting scheduled when a key participant is on vacation. It provides you with information and flags potential issues, but you are responsible for taking action.

An agentic AI, in the same scenario, would go beyond just suggesting conflicts to avoid. Upon identifying a conflict with a key participant, the agent could act by:

-   Checking the availability of all necessary participants.
-   Identifying alternative time slots that work for everyone.
-   Sending out proposed new meeting invitations to all attendees.
-   If the conflict is with an external participant, the agent could draft and send an email explaining the need to reschedule and offering alternative times.
-   Updating your calendar and the calendars of your colleagues with the new meeting details once confirmed.

This agentic AI understands the goal (resolving the meeting conflict), plans the steps (checking availability, finding alternatives, sending invites), executes those steps, and persists until the conflict is resolved, all with minimal direct user intervention. This demonstrates the “agentic” difference: the system takes **proactive steps** for the user, rather than just providing information to the user.

Agentic AI systems understand a goal, plan a series of steps to achieve it, execute those steps, and even adapt if things go wrong. Think of it like a **proactive digital assistant**. The underlying technology often combines large language models (LLMs) for understanding and reasoning, with planning algorithms that break down complex tasks into manageable actions. These agents can interact with various tools, APIs, and even other AI models to accomplish their objectives, and critically, they can maintain a persistent state, meaning they remember previous actions and continue working towards a goal over time. This makes them fundamentally different from typical generative AI, which usually completes a single request and then resets.

## A Simple Taxonomy of Agentic Behaviors

We can categorize agent behavior into four distinct modes of autonomy. While these often look like a progression, they function as independent operating modes. A user might trust an agent to act autonomously for scheduling, but keep it in “suggestion mode” for financial transactions.

We derived these levels by adapting industry standards for autonomous vehicles ([SAE levels](https://www.sae.org/news/blog/sae-levels-driving-automation-clarity-refinements)) to digital user experience contexts.

### Observe-and-Suggest

The agent functions as a monitor. It analyzes data streams and flags anomalies or opportunities, but takes zero action.

**Differentiation**  
Unlike the next level, the agent generates no complex plan. It points to a problem.

**Example**  
A DevOps agent notices a server CPU spike and alerts the on-call engineer. It does not know how or attempt to fix it, but it knows something is wrong.

**Implications for design and oversight**  
At this level, design and oversight should prioritize clear, non-intrusive notifications and a well-defined process for users to act on suggestions. The focus is on empowering the user with timely and relevant information without taking control. UX practitioners should focus on making suggestions clear and easy to understand, while product managers need to ensure the system provides value without overwhelming the user.

### Plan-and-Propose

The agent identifies a goal and generates a multi-step strategy to achieve it. It presents the full plan for human review.

**Differentiation**  
The agent acts as a strategist. It does not execute; it waits for approval on the entire approach.

**Example**  
The same DevOps agent notices the CPU spike, analyzes the logs, and proposes a remediation plan:

1.  Spin up two extra instances.
2.  Restart the load balancer.
3.  Archive old logs.

The human reviews the logic and clicks “Approve Plan”.

**Implications for design and oversight**  
For agents that plan and propose, design must ensure the proposed plans are easily understandable and that users have intuitive ways to modify or reject them. Oversight is crucial in monitoring the quality of proposals and the agent’s planning logic. UX practitioners should design clear visualizations of the proposed plans, and product managers must establish clear review and approval workflows.

### Act-with-Confirmation

The agent completes all preparation work and places the final action in a staged state. It effectively holds the door open, waiting for a nod.

**Differentiation**  
This differs from “Plan-and-Propose” because the work is already done and staged. It reduces friction. The user confirms the outcome, not the strategy.

**Example**  
A recruiting agent drafts five interview invitations, finds open times on calendars, and creates the calendar events. It presents a “Send All” button. The user provides the final authorization to trigger the external action.

**Implications for design and oversight**  
When agents act with confirmation, the design should provide transparent and concise summaries of the intended action, clearly outlining potential consequences. Oversight needs to verify that the confirmation process is robust and that users are not being asked to blindly approve actions. UX practitioners should design confirmation prompts that are clear and provide all necessary information, and product managers should prioritize a robust audit trail for all confirmed actions.

### Act-Autonomously

The agent executes tasks independently within defined boundaries.

**Differentiation**  
The user reviews the history of actions, not the actions themselves.

**Example**  
The recruiting agent sees a conflict, moves the interview to a backup slot, updates the candidate, and notifies the hiring manager. The human only sees a notification: Interview rescheduled to Tuesday.

**Implications for design and oversight**  
For autonomous agents, the design needs to establish clear pre-approved boundaries and provide robust monitoring tools. Oversight requires continuous evaluation of the agent’s performance within these boundaries, a critical need for robust logging, clear override mechanisms, and user-defined kill switches to maintain user control and trust. UX practitioners should focus on designing effective dashboards for monitoring autonomous agent behavior, and product managers must ensure clear governance and ethical guidelines are in place.

[![The Agentic Autonomy Matrix](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/1-agentic-autonomy-matrix.png)](https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/1-agentic-autonomy-matrix.png)

**Figure 1**: The Agentic Autonomy Matrix. This framework maps four distinct operating modes by correlating the level of agent initiative against the required amount of human intervention. ([Large preview](https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/1-agentic-autonomy-matrix.png))

Let’s look at a real-world application in HR technology to see these modes in action. Consider an “Interview Coordination Agent” designed to handle the logistics of hiring.

-   **In Suggest Mode**  
    The agent notices an interviewer is double-booked. It highlights the conflict on the recruiter’s dashboard: _“Warning: Sarah is double-booked for the 2 PM interview.”_
-   **In Plan Mode**  
    The agent analyzes Sarah’s calendar and the candidate’s availability. It presents a solution: _“I recommend moving the interview to Thursday at 10 AM. This requires moving Sarah’s 1:1 with her manager.”_ The recruiter reviews this logic.
-   **In Confirmation Mode**  
    The agent drafts the emails to the candidate and the manager. It populates the calendar invites. The recruiter sees a summary: _“Ready to reschedule to Thursday. Send updates?”_ The recruiter clicks _“Confirm.”_
-   **In Autonomous Mode**  
    The agent handles the conflict instantly. It respects a pre-set rule: _“Always prioritize candidate interviews over internal 1:1s.”_ It moves the meeting and sends the notifications. The recruiter sees a log entry: _“Resolved schedule conflict for Candidate B.”_

## Research Primer: What To Research And How

Developing effective agentic AI demands a distinct research approach compared to traditional software or even generative AI. The autonomous nature of AI agents, their ability to make decisions, and their potential for proactive action necessitate specialized methodologies for understanding user expectations, mapping complex agent behaviors, and anticipating potential failures. The following research primer outlines key methods to measure and evaluate these unique aspects of agentic AI.

### Mental-Model Interviews

These interviews uncover users’ preconceived notions about how an AI agent should behave. Instead of simply asking what users _want_, the focus is on understanding their internal models of the agent’s capabilities and limitations. We should avoid using the word “agent” with participants. It carries sci-fi baggage or is a term too easily confused with a human agent offering support or services. Instead, frame the discussion around “assistants” or “the system.”

We need to uncover where users draw the line between helpful automation and intrusive control.

-   **Method:** Ask users to describe, draw, or narrate their expected interactions with the agent in various hypothetical scenarios.
-   **Key Probes (reflecting a variety of industries):**
    -   To understand the boundaries of desired automation and potential anxieties around over-automation, ask:
        -   If your flight is canceled, what would you want the system to do automatically? What would worry you if it did that without your explicit instruction?
    -   To explore the user’s understanding of the agent’s internal processes and necessary communication, ask:
        -   Imagine a digital assistant is managing your smart home. If a package is delivered, what steps do you imagine it takes, and what information would you expect to receive?
    -   To uncover expectations around control and consent within a multi-step process, ask:
        -   If you ask your digital assistant to schedule a meeting, what steps do you envision it taking? At what points would you want to be consulted or given choices?
-   **Benefits of the method:** Reveals implicit assumptions, highlights areas where the agent’s planned behavior might diverge from user expectations, and informs the design of appropriate controls and feedback mechanisms.

### Agent Journey Mapping:

Similar to traditional user journey mapping, agent journey mapping specifically focuses on the anticipated actions and decision points of the AI agent itself, alongside the user’s interaction. This helps to proactively identify potential pitfalls.

-   **Method:** Create a visual map that outlines the various stages of an agent’s operation, from initiation to completion, including all potential actions, decisions, and interactions with external systems or users.
-   **Key Elements to Map:**
    -   **Agent Actions:** What specific tasks or decisions does the agent perform?
    -   **Information Inputs/Outputs:** What data does the agent need, and what information does it generate or communicate?
    -   **Decision Points:** Where does the agent make choices, and what are the criteria for those choices?
    -   **User Interaction Points:** Where does the user provide input, review, or approve actions?
    -   **Points of Failure:** Crucially, identify specific instances where the agent could misinterpret instructions, make an incorrect decision, or interact with the wrong entity.
        -   **Examples:** Incorrect recipient (e.g., sending sensitive information to the wrong person), overdraft (e.g., an automated payment exceeding available funds), misinterpretation of intent (e.g., booking a flight for the wrong date due to ambiguous language).
    -   **Recovery Paths:** How can the agent or user recover from these failures? What mechanisms are in place for correction or intervention?
-   **Benefits of the method:** Provides a holistic view of the agent’s operational flow, uncovers hidden dependencies, and allows for the proactive design of safeguards, error handling, and user intervention points to prevent or mitigate negative outcomes.

[![Agent Journey Map](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/2-agent-journey-map.jpg)](https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/2-agent-journey-map.jpg)

**Figure 2**: Agent Journey Map. Mapping the Agent Logic distinct from the System helps identify where the reasoning, not just the code, might fail. ([Large preview](https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/2-agent-journey-map.jpg))

### Simulated Misbehavior Testing:

This approach is designed to stress-test the system and observe user reactions when the AI agent _fails_ or deviates from expectations. It’s about understanding trust repair and emotional responses in adverse situations.

-   **Method:** In controlled lab studies, deliberately introduce scenarios where the agent makes a mistake, misinterprets a command, or behaves unexpectedly.
-   **Types of “Misbehavior” to Simulate:**
    -   **Command Misinterpretation:** The agent performs an action slightly different from what the user intended (e.g., ordering two items instead of one).
    -   **Information Overload/Underload:** The agent provides too much irrelevant information or not enough critical details.
    -   **Unsolicited Action:** The agent takes an action the user explicitly did not want or expect (e.g., buying stock without approval).
    -   **System Failure:** The agent crashes, becomes unresponsive, or provides an error message.
    -   **Ethical Dilemmas:** The agent makes a decision with ethical implications (e.g., prioritizing one task over another based on an unforeseen metric).
-   **Observation Focus:**
    -   **User Reactions:** How do users react emotionally (frustration, anger, confusion, loss of trust)?
    -   **Recovery Attempts:** What steps do users take to correct the agent’s behavior or undo its actions?
    -   **Trust Repair Mechanisms:** Do the system’s built-in recovery or feedback mechanisms help restore trust? How do users want to be informed about errors?
    -   **Mental Model Shift:** Does the misbehavior alter the user’s understanding of the agent’s capabilities or limitations?
-   **Benefits of the method:** Crucial for identifying design gaps related to error recovery, feedback, and user control. It provides insights into how resilient users are to agent failures and what is needed to maintain or rebuild trust, leading to more robust and forgiving agentic systems.

By integrating these research methodologies, UX practitioners can move beyond simply making agentic systems _usable_ to making them _trusted_, _controllable_, and _accountable_, fostering a positive and productive relationship between users and their AI agents. Note that these aren’t the only methods relevant to exploring agentic AI effectively. Many other methods exist, but these are most accessible to practitioners in the near term. I’ve previously covered the Wizard of Oz method, a slightly more advanced method of concept testing, which is also a valuable tool for exploring agentic AI concepts.

## Ethical Considerations In Research Methodology

When researching agentic AI, particularly when simulating misbehavior or errors, ethical considerations are key to take into account. There are many publications focusing on ethical UX research, including an [article I wrote for Smashing Magazine](https://www.smashingmagazine.com/2020/12/ethical-considerations-ux-research/), [these guidelines](https://www.uxdesigninstitute.com/blog/what-are-user-research-ethics/) from the UX Design Institute, and this page from the [Inclusive Design Toolkit](https://www.inclusivedesigntoolkit.com/ethics/).

## Key Metrics For Agentic AI

You’ll need a comprehensive set of key metrics to effectively assess the performance and reliability of agentic AI systems. These metrics provide insights into user trust, system accuracy, and the overall user experience. By tracking these indicators, developers and designers can identify areas for improvement and ensure that AI agents operate safely and efficiently.

**1\. Intervention Rate**  
For autonomous agents, we measure success by silence. If an agent executes a task and the user does not intervene or reverse the action within a set window (e.g., 24 hours), we count that as acceptance. We track the Intervention Rate: how often does a human jump in to stop or correct the agent? A high intervention rate signals a misalignment in trust or logic.

**2\. Frequency of Unintended Actions per 1,000 Tasks**  
This critical metric quantifies the number of actions performed by the AI agent that were not desired or expected by the user, normalized per 1,000 completed tasks. A low frequency of unintended actions signifies a well-aligned AI that accurately interprets user intent and operates within defined boundaries. This metric is closely tied to the AI’s understanding of context, its ability to disambiguate commands, and the robustness of its safety protocols.

**3\. Rollback or Undo Rates**  
This metric tracks how often users need to reverse or undo an action performed by the AI. High rollback rates suggest that the AI is making frequent errors, misinterpreting instructions, or acting in ways that are not aligned with user expectations. Analyzing the reasons behind these rollbacks can provide valuable feedback for improving the AI’s algorithms, understanding of user preferences, and its ability to predict desirable outcomes.

To understand why, you must implement a microsurvey on the undo action. For example, when a user reverses a scheduling change, a simple prompt can ask: _“Wrong time? Wrong person? Or did you just want to do it yourself?”_ Allowing the user to click on the option that best corresponds to their reasoning.

**4\. Time to Resolution After an Error**  
This metric measures the duration it takes for a user to correct an error made by the AI or for the AI system itself to recover from an erroneous state. A short time to resolution indicates an efficient and user-friendly error recovery process, which can mitigate user frustration and maintain productivity. This includes the ease of identifying the error, the accessibility of undo or correction mechanisms, and the clarity of error messages provided by the AI.

[![A Trust & Accountability Dashboard](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/3-trust-accountability-dashboard.jpg)](https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/3-trust-accountability-dashboard.jpg)

**Figure 3**: A Trust & Accountability Dashboard. Note the focus on “Rollback Reasons”. This qualitative data is vital for tuning the agent’s logic. ([Large preview](https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/3-trust-accountability-dashboard.jpg))

Collecting these metrics requires instrumenting your system to track Agent Action IDs. Every distinct action the agent takes, such as proposing a schedule or booking a flight, must generate a unique ID that persists in the logs. To measure the Intervention Rate, we do not look for an immediate user reaction. We look for the absence of a counter-action within a defined window. If an Action ID is generated at 9:00 AM and no human user modifies or reverts that specific ID by 9:00 AM the next day, the system logically tags it as Accepted. This allows us to quantify success based on user silence rather than active confirmation.

For Rollback Rates, raw counts are insufficient because they lack context. To capture the underlying reason, you must implement intercept logic on your application’s Undo or Revert functions. When a user reverses an agent-initiated action, trigger a lightweight microsurvey. This can be a simple three-option modal asking the user to categorize the error as factually incorrect, lacking context, or a simple preference to handle the task manually. This combines quantitative telemetry with qualitative insight. It enables engineering teams to distinguish between a broken algorithm and a user preference mismatch.

These metrics, when tracked consistently and analyzed holistically, provide a robust framework for evaluating the performance of agentic AI systems, allowing for continuous improvement in control, consent, and accountability.

## Designing Against Deception

As agents become increasingly capable, we face a new risk: **Agentic Sludge**. Traditional sludge creates friction that makes it hard to cancel a subscription or delete an account. Agentic sludge acts in reverse. It removes friction to a fault, making it too easy for a user to agree to an action that benefits the business rather than their own interests.

Consider an agent assisting with travel booking. Without clear guardrails, the system might prioritize a partner airline or a higher-margin hotel. It presents this choice as the optimal path. The user, trusting the system’s authority, accepts the recommendation without scrutiny. This creates a deceptive pattern where the system optimizes for revenue under the guise of convenience.

### The Risk Of Falsely Imagined Competence

Deception may not stem from malicious intent. It often manifests in AI as **Imagined Competence**. Large Language Models frequently sound authoritative even when incorrect. They present a false booking confirmation or an inaccurate summary with the same confidence as a verified fact. Users may naturally trust this confident tone. This mismatch creates a dangerous gap between system capability and user expectations.

We must design specifically to bridge this gap. If an agent fails to complete a task, the interface must signal that failure clearly. If the system is unsure, it must express uncertainty rather than masking it with polished prose.

### Transparency via Primitives

The antidote to both sludge and hallucination is **provenance**. Every autonomous action requires a specific metadata tag explaining the origin of the decision. Users need the ability to inspect the logic chain behind the result.

To achieve this, we must **translate primitives into practical answers**. In software engineering, primitives refer to the core units of information or actions an agent performs. To the engineer, this looks like an API call or a logic gate. To the user, it must appear as a **clear explanation**.

The design challenge lies in mapping these technical steps to human-readable rationales. If an agent recommends a specific flight, the user needs to know why. The interface cannot hide behind a generic suggestion. It must expose the underlying primitive: _Logic: Cheapest\_Direct\_Flight_ or _Logic: Partner\_Airline\_Priority_.

Figure 4 illustrates this translation flow. We take the raw system primitive — the actual code logic — and map it to a user-facing string. For instance, a primitive checking a calendar schedule a meeting becomes a clear statement: I’ve proposed a 4 PM meeting.

This level of transparency ensures the agent’s actions appear logical and beneficial. It allows the user to verify that the agent acted in their best interest. By exposing the primitives, we transform a black box into a glass box, ensuring users remain the final authority on their own digital lives.

[![Translation flow](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/4-translation-flow.jpg)](https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/4-translation-flow.jpg)

**Figure 4**: Translating a primitive to an end explanation is key to explaining the behavior of Agentic AI. ([Large preview](https://files.smashing.media/articles/beyond-generative-rise-agentic-ai-user-centric-design/4-translation-flow.jpg))

## Setting The Stage For Design

Building an agentic system requires a new level of psychological and behavioral understanding. It forces us to move beyond conventional usability testing and into the realm of **trust**, **consent**, and **accountability**. The research methods we’ve discussed, from probing mental models to simulating misbehavior and establishing new metrics, provide a necessary foundation. These practices are the essential tools for proactively identifying where an autonomous system might fail and, more importantly, how to repair the user-agent relationship when it does.

The shift to agentic AI is a **redefinition of the user-system relationship**. We are no longer designing for tools that simply respond to commands; we are designing for partners that act on our behalf. This changes the design imperative from efficiency and ease of use to **transparency**, **predictability**, and **control**.

> [When an AI can book a flight or trade a stock without a final click, the design of its “on-ramps” and “off-ramps” becomes paramount. It is our responsibility to ensure that users feel they are in the driver’s seat, even when they’ve handed over the wheel.](https://twitter.com/share?text=%0aWhen%20an%20AI%20can%20book%20a%20flight%20or%20trade%20a%20stock%20without%20a%20final%20click,%20the%20design%20of%20its%20%e2%80%9con-ramps%e2%80%9d%20and%20%e2%80%9coff-ramps%e2%80%9d%20becomes%20paramount.%20It%20is%20our%20responsibility%20to%20ensure%20that%20users%20feel%20they%20are%20in%20the%20driver%e2%80%99s%20seat,%20even%20when%20they%e2%80%99ve%20handed%20over%20the%20wheel.%0a&url=https://smashingmagazine.com%2f2026%2f01%2fbeyond-generative-rise-agentic-ai-user-centric-design%2f)
> 
> “

This new reality also elevates the role of the UX researcher. We become the custodians of user trust, working collaboratively with engineers and product managers to define and test the guardrails of an agent’s autonomy. Beyond being researchers, we become advocates for user control, transparency, and the ethical safeguards within the development process. By translating primitives into practical questions and simulating worst-case scenarios, we can build robust systems that are both powerful and safe.

This article has outlined the “what” and “why” of researching agentic AI. It has shown that our traditional toolkits are insufficient and that we must adopt new, forward-looking methodologies. The next article will build upon this foundation, providing the specific design patterns and organizational practices that make an agent’s utility transparent to users, ensuring they can harness the power of agentic AI with confidence and control. The future of UX is about making systems trustworthy.

For additional understanding of agentic AI, you can explore the following resources:

-   [Google AI Blog on Agentic AI](https://www.google.com/search?q=https://ai.googleblog.com/blog/topic/agentic-ai/)
-   [Microsoft’s research on AI Agents](https://www.microsoft.com/en-us/research/project/agent-ai/)

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)