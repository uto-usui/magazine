---
title: "$1 million hacker challenge for Vercel Sandbox"
source: "https://vercel.com/blog/one-million-dollar-hacker-challenge-for-vercel-sandbox"
publishedDate: "2026-08-18"
category: "frontend"
feedName: "Vercel"
author: "Andy Riancho"
---

Agents need to run untrusted code, and the microVM has become the standard way to do it: a dedicated guest kernel per workload, isolated from the host and from every other workload on the same machine.

But recent security research and real-world incidents have revealed that agents running untrusted code do not need to cross a VM boundary to escape containment; they only need one network path the security model failed to account for, which we explained in our post [_A sandbox without a network boundary is only half a sandbox_](https://vercel.com/blog/a-sandbox-without-a-network-boundary-is-only-half-a-sandbox).

Isolation only holds if both sides of it hold: the Firecracker microVM and the host-side network controls. Recently our CTO [pointed an open-weight model with no safeguards](https://vercel.com/blog/everything-hackable-will-get-hacked) at Vercel Sandbox. It did not escape, but it mapped the guest kernel, built a VM to reproduce its ideas, and wrote a fuzzer.

Defenders have first-mover advantage, but it won't last forever, and the choice is when to test the boundaries (we strongly encourage [building a scanning program](https://vercel.com/blog/deepsecbench-evaluating-model-performance-in-finding-cybersecurity-vulnerabilities#building-a-scanning-program-across-multiple-models), which you can do on any budget with an open-source tool like [`deepsec`](https://deepsec.sh/) and [AI Gateway](http://vercel.com/ai-gateway)).

We are proactively choosing to test Vercel Sandbox on our own schedule, not an attacker's, and we are doing it in the open, with the best researchers in the world.

So for two weeks, we are paying up to $1,000,000 USD to the researchers who can escape a Vercel Sandbox.

## [Copy link to heading](#the-challenge)The challenge

Starting **today**, Vercel is running a two-week public HackerOne program focused on Vercel Sandbox isolation.

-   **Program:** [Public HackerOne program](https://hackerone.com/vercel_sandbox), open to all eligible researchers
    
-   **Window:** Tuesday, August 18 to Tuesday, September 1, 2026, or earlier if the reward pool is exhausted
    
-   **Max per report:** $50,000 USD, for a vulnerability that lets a threat actor read or modify another Vercel tenant's data
    
-   **Total pool**: Up to $1,000,000 USD in total payouts
    

Bounties are paid per report, scoped to a single root cause, and assigned by Vercel triage based on the maximum demonstrable impact. The full bounty table, detailed scope, and the list of known-duplicate classes are on the [HackerOne program page](https://hackerone.com/vercel_sandbox).

## [Copy link to heading](#how-vercel-sandbox-is-built)How Vercel Sandbox is built

[Vercel Sandbox](https://vercel.com/docs/sandbox) runs on bare-metal EC2 hosts. Each sandbox gets its own Firecracker microVM with a dedicated guest kernel, and inside that microVM a Linux container runs the operator's code. The microVM, not the container, is the security boundary, so operator-supplied code runs two layers removed from the host. We assume that code is fully hostile: root inside the container, full kernel access inside the microVM, and motivated to reach the host or another tenant.

The network side of the boundary is enforced on the host, outside the microVM, where code inside the sandbox cannot modify or disable it. The sandbox firewall intercepts outbound TCP and DNS, checks each connection against the operator's domain and CIDR policies, and can inject credentials at the boundary so they never enter the microVM.

## [Copy link to heading](#what-we're-looking-for)What we're looking for

In short: anything that breaks the sandbox boundary.

-   **Compute boundary:** Escaping the Firecracker microVM to the EC2 host, or reaching another tenant's sandbox through the compute layer (reading, modifying, or executing code in it), or crashing another tenant's sandbox from within another sandbox
    
-   **Network boundary:** Defeating the sandbox firewall without crossing the microVM: reaching destinations the operator did not authorize, exfiltrating data, or retrieving brokered credentials
    

Container namespace escapes that only reach the Firecracker guest OS are not in scope. Namespaces are a developer-experience feature, not the security boundary.

## [Copy link to heading](#bounties)Bounties

Severity

Bounty

Critical

$25,000 – $50,000

High

$10,000 – $25,000

Medium

$5,000 – $10,000

Low

$1,000 – $5,000

The full bounty table, with example vulnerability classes for each tier, is on the [HackerOne program page](https://hackerone.com/vercel_sandbox).

## [Copy link to heading](#how-to-participate)How to participate

The program is open now and closes on **Tuesday, September 1, 2026**, or earlier if the $1,000,000 USD reward pool is exhausted. Reports go through the [HackerOne program page](https://hackerone.com/vercel_sandbox).

To reproduce a finding, boot a sandbox with the `@vercel/sandbox` SDK and demonstrate the impact with a live proof of concept. The default sandbox OS is enough for most reports; bring a custom image from the Vercel Container Registry only if your PoC needs extra tooling. We will not reward static-analysis-only findings; to issue a payout, we need to see the boundary break.

Full rules, eligibility, the complete scope and bounty table, and the submission process are on the HackerOne program page.

## [Copy link to heading](#results-and-payouts)Results and payouts

We will triage reports from the day the program opens through one month after it closes. As findings are confirmed, we will pay bounties, ship fixes, and credit every researcher whose report holds up. The techniques discovered during this program will become permanent additions to the sandbox boundary, protecting every workload on Vercel long after the challenge ends. After the program closes, we will publish a follow-up writeup of the techniques and the fixes we shipped.

_Thanks to HackerOne for standing up the program, and to the researchers who will spend the next two weeks trying to break what we built._