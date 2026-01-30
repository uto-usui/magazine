---
title: "How to build agents with filesystems and bash"
source: "https://vercel.com/blog/how-to-build-agents-with-filesystems-and-bash"
publishedDate: "2026-01-09"
category: "frontend"
feedName: "Vercel"
author: "Ashka Stephen"
---

3 min read

Jan 9, 2026

The best agent architecture is already sitting in your terminal

Many of us have built complex tooling to feed our agents the right information. It's brittle because we're guessing what the model needs instead of letting it find what it needs. We've found a simpler approach. We replaced most of the custom tooling in our internal agents with a filesystem tool and a bash tool. Our sales call summarization agent went from ~$1.00 to ~$0.25 per call on Claude Opus 4.5, and the output quality improved. [We used the same approach for d0](https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools), our text-to-SQL agent.

The idea behind this is that LLMs have been trained on massive amounts of code. They've spent countless hours navigating directories, grepping through files, and managing state across complex codebases. If agents excel at filesystem operations for code, they'll excel at filesystem operations for anything. Agents already understand filesystems.

Customer support tickets, sales call transcripts, CRM data, conversation history. Structure it as files, give the agent bash, and the model brings the same capabilities it uses for code navigation.

## [Link to heading](#how-agents-read-filesystems)How agents read filesystems

The agent runs in a sandbox with your data structured as files. When it needs context, it explores the filesystem using Unix commands, pulls in what's relevant, and sends that to the LLM.

```
Agent receives task    ↓Explores filesystem (ls, find)    ↓Searches for relevant content (grep, cat)    ↓Sends context + request to LLM    ↓Returns structured output
```

The agent and its tool execution run on separate compute. You trust the agent's reasoning, but the sandbox isolates what it can actually do.

## [Link to heading](#why-filesystems-work-for-context-management)Why filesystems work for context management

The typical approach to agent context is either stuffing everything into the prompt or using vector search. Prompt stuffing hits token limits. Vector search works for semantic similarity but returns imprecise results when you need a specific value from structured data.

Filesystems offer a different tradeoff.

**Structure matches your domain.** Customer records, ticket history, CRM data. These have natural hierarchies that map directly to directories. You're not flattening relationships into embeddings.

**Retrieval is precise.** `grep -r "pricing objection" transcripts/` returns exact matches. When you need one specific value, you get that value.

**Context stays minimal.** The agent loads files on demand. A large transcript doesn't go into the prompt upfront. The agent reads the metadata, greps for relevant sections, then pulls only what it needs.

## [Link to heading](#mapping-your-domain-to-files)Mapping your domain to files

Let's look at some concrete examples of how different domains map to filesystem structures.

**Example 1: Customer support system**

Instead of throwing raw JSON into your agent, structure it:

```
/customers/  /cust_12345/    profile.json          # High-level info    tickets/      ticket_001.md       # Each ticket      ticket_002.md    conversations/      2024-01-15.txt      # Daily conversation logs    preferences.json
```

When a customer asks "What was the resolution to my issue?", the agent can `ls` the tickets directory, `grep` for "resolved", and read only the relevant file.

**Example 2: Document analysis system**

```
/documents/  /uploaded/    contract_abc123.pdf    invoice_def456.pdf  /extracted/    contract_abc123.txt    invoice_def456.txt  /analysis/    contract_abc123/      summary.md      key_terms.json      risk_assessment.md/templates/  contract_analysis_prompt.md  invoice_validation_rules.md
```

Raw inputs in one place, processed outputs in structured directories. The agent can reference previous analysis without reprocessing.

## [Link to heading](#case-study:-sales-call-summary-agent)Case study: Sales call summary agent

We built a [sales call summary template](https://vercel.com/templates/ai/call-summary-agent) using this architecture. The agent analyzes sales call transcripts and generates structured summaries with objections, action items, and insights.

The agent sees this file structure:

```
gong-calls/  demo-call-001-companyname-product-demo.md     # Current call transcript  metadata.json                                 # Call metadata  previous-calls/    demo-call-000-discovery-call.md             # Prior discovery call    demo-call-intro-initial-call.md             # Initial intro callsalesforce/  account.md                                    # CRM account record  opportunity.md                                # Deal/opportunity details  contacts.md                                   # Contact profilesslack/  slack-channel.md                              # Slack historyresearch/  company-research.md                           # Company background  competitive-intel.md                          # Competitor analysisplaybooks/  sales-playbook.md                             # Internal sales playbook
```

The agent explores this like a codebase:

```
# Explore what's available$ ls sales-calls/customer-call-123456-q4.mdmetadata.json# Read the metadata$ cat sales-calls/metadata.json# Look for objections$ grep -i "concern\|worried\|issue\|problem" sales-calls/*.md
```

The intuition is that the agent treats the transcript like a codebase. It searches for patterns, reads sections, and builds context just like it would debug code. No custom retrieval logic. The agent decides what context it needs using tools it already knows how to use. It handles edge cases we never anticipated because it's working with the raw information, not parameters we defined.

We'll have another post diving deeper into the sales call summary agent.

## [Link to heading](#why-you-should-use-bash-and-filesystems)Why you should use bash and filesystems

**Native model capabilities.** grep, cat, find, awk. These aren't new skills we're teaching. LLMs have seen these tools billions of times during training. They're native operations, not bolted on behaviors.

**Future-proof architecture.** As models get better at coding, your agent gets better. Every improvement in code understanding translates directly. You're leveraging the training distribution instead of fighting against it.

**Debuggability.** When the agent fails, you see exactly what files it read and what commands it ran. The execution path is visible. No black box.

**Security through isolation.** The sandbox lets the agent explore files without access to production systems. You trust the reasoning, not the execution environment.

**Less code to maintain.** Instead of building retrieval pipelines for each data type, you write files to a directory structure. The agent handles the rest.

## [Link to heading](#get-started)Get started

Every agent needs filesystem and bash. If you're building an agent, resist the urge to create custom tools. Instead, ask: can I represent this as files?

We recently open-sourced [bash-tool](https://vercel.com/changelog/introducing-bash-tool-for-filesystem-based-context-retrieval), a dedicated tool that powers this pattern.

1.  [**AI SDK**](https://ai-sdk.dev/docs/introduction) for tool execution and model calls
    
2.  [**bash-tool**](https://www.npmjs.com/package/bash-tool) for sandboxed filesystem access
    
3.  [**Sales Call Summary template**](https://vercel.com/templates/ai/call-summary-agent) to see the full pattern and to get started with one-click
    

The future of agents might be surprisingly simple. Maybe the best architecture is almost no architecture at all. Just filesystems and bash.

[

**Get started with filesystem agents**

The Sales Call Summary template shows the filesystem and bash pattern in production. Deploy it on Vercel and watch the agent explore files in real time.

Deploy the template



](https://vercel.com/templates/ai/call-summary-agent)