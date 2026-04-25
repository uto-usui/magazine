---
title: "Is Temporal Cloud Safe for Sensitive Data? An Architecture Guide"
source: "https://www.bitovi.com/blog/is-temporal-cloud-safe-for-sensitive-data-an-architecture-guide"
publishedDate: "2026-04-24"
category: "frontend"
feedName: "Bitovi"
author: "Jake Moomaw"
---

If Temporal is orchestrating your workflows, some execution history likely lives outside your direct control. When you have an opaque component in a durable workflow system, the natural question is: how do I know my data is safe? This article is an overview of how Temporal's data sovereignty model was designed to keep your business data completely isolated from the orchestration layer, without sacrificing the process resilience that makes Temporal worth adopting in the first place.

**Working through a Temporal adoption or compliance review?** Bitovi's [Temporal consulting team](https://www.bitovi.com/services/temporal-consulting) has helped engineering orgs implement durable, compliant workflow systems. [Talk to us.](https://www.bitovi.com/contact)

### TL;DR

Temporal splits responsibilities between two components:

-   The **Orchestrator** coordinates what work is in the queue and what workers are active to perform it. Think of it as the manager: aware of what's happening, but not involved in the details_**.**_
    
-   The **Worker** executes the work from the queue and reports back: what inputs it received, what it did (execution history), and what the result was. The employee doing the actual work.
    

Because only the Worker requires business context, the Orchestrator never needs to touch your actual data. The manager knows work is getting done, but not what data is being used to do it.

The Worker still reports to the Orchestrator on inputs, history, and results. But those values can be encoded. The manager gets a status report; the sensitive details stay abstracted.

## Traditional Workflows

A traditional web app workflow has three basic parts: the client submits data, your application processes it, and the results go to storage.

![traditional-workflows](https://www.bitovi.com/hs-fs/hubfs/traditional-workflows.png?width=421&height=250&name=traditional-workflows.png)

Data safety standards like PCI DSS and SOC 2 are built around this model. The customer's data only needs to be understood by two parties: the customer, and the processing layer. Data is encrypted in transit ("in flight") and at rest. Workflow orchestration compliance, in this model, is relatively straightforward because the processing layer is a single, bounded component.

## How Temporal Changes the Picture

Temporal was built to answer one question: what happens when something breaks mid-workflow?

Without durability, an interruption between processing and storage leaves your system in an inconsistent state. Some data reflects the requested changes; some doesn't. The system has no reliable way to resume.

Temporal solves this by splitting the processing layer into two roles: the **Worker** and the **Orchestrator**. In this model, the customer portal sends data to the Orchestrator first. The Orchestrator hands it to the Worker. After each step, the Worker writes results to storage and reports back: "I finished step 1; here's what happened." The Orchestrator notes the progress, then tells the Worker what to do next. If something breaks, the Orchestrator checks its notes, identifies where things left off, and the Worker picks up from there.

This is where the compliance question comes in. The Orchestrator keeps notes about every step and intermediate results. If you're on Temporal Cloud, those notes live on infrastructure you don't control. So how do you keep Temporal Cloud compliant with PCI DSS, SOC 2, or your internal data handling policies?

![temporal-workflows](https://www.bitovi.com/hs-fs/hubfs/temporal-workflows.png?width=601&height=469&name=temporal-workflows.png)

Temporal has a built-in answer: the Orchestrator doesn't need to understand your data. The Worker does the actual processing. The Orchestrator just needs to know what step comes next. That separation makes the following two approaches possible.

**Not sure which deployment model fits your compliance requirements?** Bitovi's [systems engineering consultants](https://www.bitovi.com/services/systems-engineering) can help you design a Temporal architecture that meets your security and regulatory standards. [Get in touch.](https://www.bitovi.com/contact)

## Approach 1: Passing by Reference

In this approach, the Worker never sends actual data to the Orchestrator. Instead, it writes results to storage and reports back: "I finished step 4; the results are at this location in storage."

If that message is intercepted or the Orchestrator is compromised, the attacker learns only a storage path. Since the data is encrypted at rest, access to the database doesn't get them anything readable. This is how Temporal handles sensitive data without ever exposing it to the orchestration layer.

This approach satisfies most regulatory compliance requirements, including PCI DSS workflow automation scenarios. For organizations with a tighter risk appetite, there's a more robust option.

![passby-reference](https://www.bitovi.com/hs-fs/hubfs/passby-reference.png?width=606&height=792&name=passby-reference.png)

## Approach 2: Encryption at Every Step

This approach adds another layer. Temporal supports a separate **Codec Server** that encrypts the information flowing between the Worker and the Orchestrator. Because the Orchestrator has no direct connection to the Codec Server, it never receives the decryption keys. Temporal encryption at the transport layer is handled entirely outside the orchestration component.

The message the Orchestrator receives looks like: "I finished step 4, `<unreadable-encrypted-code>`." An attacker who gains access to the Orchestrator's notes knows that step 4 completed, and nothing else.

![encryption-every-step](https://www.bitovi.com/hs-fs/hubfs/encryption-every-step.png?width=724&height=735&name=encryption-every-step.png)

## Data Safety and Process Resilience Aren't a Trade-off

Using either approach, your data never actually passes through the Orchestrator. Temporal's architecture lets you maintain encrypted storage, complete audit trails, and full workflow durability at the same time.

This is the core of Temporal's value for regulated industries: you get the operational resilience of a durable execution system without compromising on data sovereignty.

**Ready to implement Temporal in a compliance-sensitive environment?** Bitovi's engineering team has deep experience with Temporal adoption, architecture design, and ongoing support. Whether you're evaluating Temporal Cloud, self-hosted deployments, or navigating a specific compliance framework, we can help.

[Talk to a Temporal consultant](https://www.bitovi.com/services/temporal-consulting) | [Explore systems engineering services](https://www.bitovi.com/services/systems-engineering)

* * *

## Frequently Asked Questions

### Is Temporal Cloud compliant with PCI DSS?

Temporal Cloud can be used in PCI DSS environments, but compliance is a shared responsibility. Temporal's architecture is designed so that the orchestration layer never needs to see your actual cardholder data. By implementing reference-based communication or Codec Server encryption (both described above), sensitive data stays within your controlled infrastructure. Your team is still responsible for encrypting data at rest, managing access controls, and configuring your Workers correctly. If you're working through a PCI DSS assessment, a Temporal architecture review can help validate your approach before you're under audit.

### How does Temporal handle sensitive data in workflow execution history?

By default, workflow inputs, outputs, and intermediate results are stored in the execution history. For sensitive data, you have two options: pass by reference (store the data in your own encrypted storage and send only a pointer) or use a Codec Server to encrypt payloads before they reach the Orchestrator. Either way, the actual data never has to be readable by the orchestration layer. The right choice depends on your compliance requirements and how tightly you need to control the decryption surface.

### What's the difference between self-hosted Temporal and Temporal Cloud for compliance?

With self-hosted Temporal, you control the full infrastructure stack, including where execution history is stored and who has access to it. That's the right call for organizations with strict data residency requirements or internal policies that prohibit third-party infrastructure from touching workflow state. Temporal Cloud offloads the operational burden but requires you to use reference-based communication or Codec Server encryption to ensure sensitive data never leaves your environment. The architectural patterns are the same; the deployment decision comes down to operational trade-offs and your specific compliance framework.

### Can Temporal be used for SOC 2 compliant systems?

Yes. SOC 2 compliance is largely about demonstrating controls around availability, confidentiality, and security. Temporal's Worker/Orchestrator separation supports those controls directly: you can encrypt data in transit and at rest, limit what the orchestration layer can see, and maintain complete audit trails through execution history. SOC 2 auditors will want to see your data flow diagrams and encryption implementation. Both approaches described in this article can be documented to support that review.

### What is a Codec Server in Temporal?

A Codec Server is a separate service that Temporal uses to encode and decode workflow payloads before they reach the Orchestrator. You control the Codec Server and its encryption keys, which means the Orchestrator never has access to the decryption logic. It's Temporal's built-in mechanism for end-to-end payload encryption across the Worker/Orchestrator boundary. Setting one up requires some upfront configuration, but it's the most complete solution for teams that need the orchestration layer to be fully opaque to workflow data.