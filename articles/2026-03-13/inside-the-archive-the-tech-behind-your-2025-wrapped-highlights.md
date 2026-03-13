---
title: "Inside the Archive: The Tech Behind Your 2025 Wrapped Highlights"
source: "https://engineering.atspotify.com/2026/3/inside-the-archive-2025-wrapped/"
publishedDate: "2026-03-12"
category: "engineering"
feedName: "Spotify Engineering"
author: "Spotify Engineering"
---

Every year, Spotify Wrapped gives hundreds of millions of listeners a snapshot of your year in listening. For 2025 Wrapped, we wanted to go deeper. What if we could identify interesting listening moments from your year, and tell you a story about them? The day you discovered that artist that changed everything. The day you played nothing but “yearning” music for six hours straight. The day your music taste took a hard left turn. 

That's Wrapped Archive.

For each eligible user, we identified up to five remarkable days from their 2025 listening history. We generated a personalized, LLM-generated “report” for each, essentially a creative narrative grounded entirely in real listening data.

So how did we build it?

## How we taught an algorithm to spot your big day

![Inside-the-archive-asset-wrapper](https://images.ctfassets.net/p762jor363g1/653buNN6Fbv1J8vbC2ty7q/e73c3090f46bfac4a47a76d4010b3bdb/Inside-The-Archive-diagram.png)

High Level Architecture Diagram

To identify the “remarkable days” per user from an entire year of listening, we designed a priority-ordered set of heuristics.

Some were straightforward. **Biggest Music Listening Day** and **Biggest Podcast Listening Day** simply captured the highest total minutes listened. **Biggest Discovery Day** highlighted when a user listened to the most first-time artists. **Biggest Top Artist Day** surfaced the day a listener spent the most time with a single favorite artist, while **Biggest Top Genre Day** captured when one genre dominated their listening.

Others were more complex. **Most Nostalgic Day** surfaced spikes in older catalog or throwback-heavy sessions. **Most Unusual Listening Day** identified when a user strayed furthest from their typical taste profile. Contextual anchors like **Your Birthday** and **New Year’s Day** rounded out the set.

By ranking these candidates in order of narrative potential and statistical strength, we narrowed hundreds of millions of listening events down to up to five standout days per user.

Sometimes the result was surprisingly meaningful — like a **Biggest Music Listening Day** that just so happened to be their wedding day.

We used a distributed data pipeline to compute and aggregate candidate days at the user level. For each user, we stored their remarkable days and relevant listening history data to object storage. When it was time to pre-generate reports, we published these data points onto a messaging queue that allowed the next stage of the system to consume the data points asynchronously.

## Yes, we actually generated 1.4 billion reports

### Prompt engineering for consistency at scale

Prompting became a daily practice for more than three months. We needed prompts that could reliably generate creative, emotionally resonant stories, without hallucinating, stereotyping, or drifting off-brand. We split the prompt into two layers:

**The system prompt** defined the creative contract:

-   Data-driven storytelling: every insight had to be traceable to actual listening behavior.
    
-   Tone and style: witty, sincere, and quietly playful.
    
-   Trust and safety by default: avoid references to drugs, alcohol, sex, violence, or offensive language.
    

**The user prompt** removed ambiguity. Each generation included:

-   Detailed listening logs for the day
    
-   A summarized stats block (LLMs are bad at math)
    
-   The listener’s overall Wrapped data
    
-   The category of the interesting day
    
-   Previously generated reports (to avoid repetition)
    
-   The user’s country (for spelling and vocabulary)
    

Prompting wasn’t a linear process. It was a loop. We used a prototype to compare outputs across prompt versions and edge cases. We ran LLM-as-a-judge evaluations on sampled outputs. We layered in human review. Creative, technical, and safety feedback all fed into the next iteration.

### Shrinking the model, amplifying the story

High-performance models were excellent for prototyping, but running them to generate over a billion reports was economically unfeasible. We built a distillation pipeline to address this.

We used a frontier model to produce high-quality reference outputs. From these, we curated a tightly reviewed “gold” dataset that captured the voice, constraints, and stylistic nuances we wanted to preserve. We then fine-tuned a smaller, faster production model on this dataset, transferring the quality of the larger model into a more efficient form.

To push performance further, we introduced Direct Preference Optimization (DPO), powered by A/B-tested human evaluations. Although the preference dataset was relatively small, it was highly curated and intentionally constructed. That signal proved strong enough: the fine-tuned production model achieved strong preference parity with the original baseline.

### Running the generation engine

The numbers were intimidating. Around **350 million eligible users**, each getting up to five reports, totaling roughly **1.4 billion reports**, all pre-generated before Wrapped launch day.

Each report required a call to our fine-tuned model. That meant sustaining thousands of requests per second for days, under strict latency constraints.

Based on available capacity, we decided to process all reports in an initial single batch. Once each user’s remarkable days were computed, we could begin publishing their listening snapshot to a pubsub message queue. From there, each remarkable day was processed, generating one report at a time per user, so earlier reports could inform later ones to avoid repetition.

Monitoring became critical. Our real-time dashboards gave us visibility into report generation progress, system reliability, and projected completion time.

For four days straight, the generation engine ran without pause!

During that time, we carefully monitored throughput, ensuring we took advantage of our capacity without running into timeouts or errors. Once the initial pass completed, we carefully combed through the output to detect missing reports, data inconsistencies, and any other issues – and we re-generated those problematic reports (more on that later!)

### Designing for parallelism and persistence

By the end of pre-generation, over a billion reports were stored and ready to be served. Getting them there safely under heavy parallelism required careful storage design.

We used a distributed, column-oriented key-value database designed for high-throughput writes. Each user’s data lived in a single row keyed by user identifier. Within that row, we tracked which remarkable days had completed reports.

Each user could have up to five reports, generated independently and written concurrently. That meant multiple writes for the same user could land at nearly the same time. A naive read-modify-write approach to tracking completed days would have been vulnerable to race conditions and lost updates.

Instead, we designed the schema to make concurrent writes naturally safe. Rather than storing a serialized list of completed days, we gave each day its own column qualifier within a dedicated column family, using the date YYYYMMDD as the qualifier. For example, March 15 becomes 20250315, June 22 becomes 20250622. Concurrent writes for different days therefore touch completely different cells within the same row, hence no coordination, no locks, no read-modify-write cycles.

The full report content lived in a table keyed by user and date. Writes followed a deliberate order: first the report content, then a lightweight metadata entry marking the day as complete. This ensured users would never see a reference to a report that hadn’t been successfully written, while still allowing fully parallel, high-throughput storage.

The most elegant solution to concurrency wasn’t complex application logic. It was thoughtful data modeling.

### Built for the big bang

Wrapped launches globally at a single moment. There’s no gradual rollout. One second the service is idle; the next, millions of users are hitting it.

Auto-scaling reacts to observed load. Wrapped doesn’t ramp, it spikes! Reactive scaling simply doesn’t move fast enough.

So we had to be proactive.

We pre-scaled compute pods and database node capacity hours before launch. We coordinated model-provider capacity to ensure throughput aligned with expected demand. Then we ran synthetic load tests across all geographic regions where the service is hosted, timed to start after pre-scaling completed but before real user traffic arrived.

These tests warmed connection pools and caches on the compute side, and ensured database nodes had distributed tablet assignments and warmed their block caches on the storage side. We ran them long enough to cover the critical launch window.

When real traffic arrived, nothing was cold.

At Wrapped scale, even a brief period of elevated latency can impact millions of users. Pre-scaling and synthetic load didn’t just protect performance, they protected the experience people wait all year for.

## How we Pressure-Tested the System

When you’re generating over a billion reports, even a **0.1% failure rate** would translate to millions of “broken” stories. Human review at this scale is impossible. So we built an automated evaluation framework.

### Who judges the judge?

Production reports were generated by our fine-tuned model. To support large-scale QA and evaluation, we stored the generated reports into an evaluation data warehouse optimized for ad-hoc querying and corpus-wide analysis. Evaluation was performed by larger models acting as judges (LLM as a judge). Each report was graded across four dimensions: accuracy, safety, tone, and formatting.

To preserve the efficiency gains from distillation, we evaluated a large random sample (~165,000 reports) rather than the full corpus. Instead of one massive evaluation prompt, we used multiple smaller rule-based queries per report. This reduced non-deterministic results and allowed parallel grading. Requiring the judge to produce reasoning before a final score improved evaluation consistency.

We also built internal tooling for side-by-side prompt comparisons and structured logging, allowing brand and design partners to participate directly in tuning decisions.

### Catching what slips through

Evaluation fed directly into a structured remediation loop. We identified problematic reports through model-based evaluators and targeted human review, then used SQL queries and regex-based pattern matching to surface structurally similar failures across the corpus. Remediation followed through batch deletion of affected reports and guardrail updates to prevent recurrence.

One example made the value of this loop clear. During evaluation, we discovered that some **Biggest Discovery Day** reports were confidently celebrating the wrong number of artists discovered. The underlying heuristic was correct, but a subtle timezone bug in the upstream data pipeline occasionally surfaced the wrong top discovery day. The model faithfully wrote a compelling story about it.

Because we were running structured evaluations and logging report IDs with full metadata, we could trace the problem back to the source, quantify its prevalence across the corpus, fix the pipeline, delete the affected reports in bulk, and replay them safely. 

## Lessons in scale, safety, and storytelling

Less is more! The more instructions we piled on, the less creative the output became.

-   **Prompting doesn’t scale without evaluation.** Generating over a billion reports means failures are inevitable. Prompt and evaluation design have to evolve together.
    
-   **Concurrency problems are often data modeling problems.** By leaning into a column-oriented schema, we eliminated the need for coordination altogether.
    
-   **Real fault isolation starts at the architecture level.** By designing our systems as an isolated storage and serving path, we minimized impact surface while shipping an AI-powered feature.
    
-   **Engineering expertise drives the work; AI coding assistants amplify it**. By using these tools extensively throughout development, we were able to prototype faster, generate test scaffolding, reason about edge cases, and refactor complex flows. 
    
-   **Finally, at this scale, the LLM call is the easy part.** The real work is in capacity planning, replay and recovery, cost discipline, safety loops, and preparing for a single high-stakes launch moment where everything has to work seamlessly.
    

Wrapped Archive reached hundreds of millions of users around the world. We harnessed the power of AI paired with Spotify's magic — the data — to create something that genuinely resonated, tapping into real memories and feelings of nostalgia.

We are proud to have delivered something that resonated at a global scale that was built with care, tested with rigor, and engineered responsibly from end to end.

_Special thanks to the Archive development team for their hard work on Wrapped Archive and for contributing their insights to this post - Sravya Alla, Federico Buffoni, Sari Nahmad, Ana Shevchenko, Anton Hagermalm, Ataç Deniz Oral, Dan Landau, Fred Wang, Maia Ezratty, Maxwell Newlands, Yoshnee Raveendran, Peter Goggi Jr., Renato Gamboa, Ger Carney, Ishaan Poojari, and Nadja Rhodes_