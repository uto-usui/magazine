---
title: "Post-Quantum Cryptography Migration at Meta: Framework, Lessons, and Takeaways"
source: "https://engineering.fb.com/2026/04/16/security/post-quantum-cryptography-migration-at-meta-framework-lessons-and-takeaways/"
publishedDate: "2026-04-16"
category: "engineering"
feedName: "Meta Engineering"
---

-   We’re sharing lessons learned from Meta’s post-quantum cryptography (PQC) migration to help other organizations strengthen their resilience as industry transitions to post-quantum cryptography standards.
-   We’re proposing the idea of PQC Migration Levels to help teams within organizations manage the complexity of PQC migration for their various use cases.
-   By outlining Meta’s approach to this work — from risk assessment and inventory through deployment and guardrails — we hope to contribute practical guidance that helps accelerate the broader community’s efforts to move toward a post-quantum future.
-   Our goal is to help others navigate this transition effectively, efficiently, and economically so they can prepare for a future where today’s public‑key encryption methods may no longer be sufficient.

* * *

Research indicates that quantum computers [will eventually break](https://ieeexplore.ieee.org/document/365700) conventional public-key cryptography, creating security risk for many digital systems across industry. Although [experts estimate](https://globalriskinstitute.org/publication/2022-quantum-threat-timeline-report/) this could happen within 10–15 years, sophisticated [adversaries could collect encrypted data today](https://www.technologyreview.com/2021/11/03/1039171/hackers-quantum-computers-us-homeland-security-cryptography?ref=engineeringatmeta), anticipating a future where quantum computers can decrypt it — a strategy known as “store now, decrypt later” (SNDL). This means sensitive information could be eventually at risk even if quantum computers are still years away.

Recognizing this threat, organizations like the [US National Institute of Standards and Technology](https://nvlpubs.nist.gov/nistpubs/ir/2024/NIST.IR.8547.ipd.pdf) (NIST) and the [UK’s National Cyber Security Centre](https://www.ncsc.gov.uk/news/pqc-migration-roadmap-unveiled) (NCSC) have published migration guidance that discusses target timeframes (including 2030) for prioritizing post-quantum protections in critical systems. This guidance recognizes that complexity and missing or incomplete technical capabilities are important factors impacting PQC migration plans.

For example, the first industry-wide PQC standards, such as ML-KEM (Kyber) and ML-DSA (Dilithium), have now been published by NIST, with additional algorithms like HQC on the way. Notably, [Meta cryptographers are co-authors of HQC](https://www.nist.gov/news-events/news/2025/03/nist-selects-hqc-fifth-algorithm-post-quantum-encryption), one of the newly selected PQC algorithms, reflecting our commitment to advancing global cryptographic security. These standards provide organizations with robust options for defending against SNDL attacks, and Meta seeks to share relevant progress and insights to help the broader community navigate the transition to a PQC-secure future.

At Meta we have taken a proactive approach to ensure that we are prepared to meet the threat challenges posed by quantum computers and SNDL. With billions of people around the globe relying on our platforms and applications every day, we continue to maintain strong security and data protection standards. As part of this, we have already begun [deploying and rolling out post-quantum encryption across our internal infrastructure](https://engineering.fb.com/2024/05/22/security/post-quantum-readiness-tls-pqr-meta/#:~:text=To%20address%20this%20issue%2C%20the,wise\)%20than%20its%20classical%20counterparts) over a multi-year process to ensure that we uphold our security and privacy commitments now and into the future.

## Meta’s PQC Migration Goals

We’ve adopted a robust and comprehensive PQC migration strategy that aspires to the following principles to ensure a seamless transition:

1.  **Effectiveness**: Withstanding quantum adversaries and protecting against potential threats.
2.  **Timeliness**: Timely deploying of protection mechanisms aligned with evolving standards.
3.  **Performance**: Minimizing overhead and ensuring that the new cryptographic solutions do not compromise system performance or user experience.
4.  **Cost Efficiency**: Avoiding unnecessary expenditure by adopting a strategic approach that balances investment with risk mitigation.

## PQC Maturity Levels – How Every Organization Can Assess Post-Quantum Readiness

PQC migration is a gradual, complex, multi-year process. It can be helpful to think about PQC migration in terms of what we call PQC Migration Levels. The levels are laddered in terms of how rapidly they allow an organization to respond to a quantum threat. The shorter the **time to react to a relevant quantum event** the better. A relevant quantum event can be related to advancements in quantum computing development, standards publications, or the establishment of new industry practices. 

**PQ-Enabled**, the level at which full quantum protection is effectively achieved, is the platinum standard that organizations should aim for each one of its applications and use cases. However, any organization looking to increase its resilience to quantum threats can take steps on its way to PQ-Enabled. Even starting the migration process by setting the level of minimally acceptable success at **PQ-Ready** may have benefits. At this level companies that may not have budgeted for near-term enablement can feel motivated (and rewarded) for building the necessary building blocks to complete risk mitigation in the future.

![](https://engineering.fb.com/wp-content/uploads/2026/04/PQC-Readiness-Levels-Blues.png)

-   **PQ-Enabled**: The ultimate goal for every use case. Organizations succeed by implementing and deploying a post-quantum secure solution. At Meta, for example, [_we have begun deploying PQ protections across significant portions of our internal traffic_](https://engineering.fb.com/2024/05/22/security/post-quantum-readiness-tls-pqr-meta/)_._
-   **PQ-Hardened**: Organizations succeed by implementing all post-quantum protections currently available in the literature, but due to the absence of PQ primitives in the literature, the team (and the industry in general) is not capable of fully mitigating the quantum threat. For instance, efficient post-quantum Oblivious Pseudorandom Functions (OPRFs) are not yet available and therefore use cases relying on this type of primitive could only achieve PQ Hardened level.
-   **PQ-Ready**: Organizations start to succeed by implementing a post-quantum secure solution suitable to the use case. However, due to costs, prioritization, or other factors, its enablement is not currently feasible. This is not an desirable end goal given the fact it is not yet protecting the use case against quantum attacks, but it does reduce the time to react when compared to lower levels.
-   **PQ-Aware**: The organization has been made aware that quantum computers threaten their use case and have already completed an initial assessment of what it takes to eventually reach PQ readiness. However, the team has not started to design the PQ protections yet.
-   **PQ-Unaware**: The organization is not aware of the upcoming quantum threat, placing them at the most undesirable position in the PQC Maturity Level ladder.

## An Overview of Meta’s PQC Strategy 

The proposed strategy is defined as a sequence of steps. Some of them may overlap in time with others but the goal here is to give an indication about the different workstreams organizations may have to embark on as part of their PQC readiness. 

1.  **[Prioritization Definition](#prioritization)** to establish a qualitative criteria to differentiate types of applications at high, moderate, and low priority among the types of use case impacted by possible quantum attacks. This approach helps prioritize which use cases should be migrated first.
2.  **[Build a Cryptographic Inventory](#inventory)** to have a full picture on the cryptography usage across the organization and identify applications at risk.
3.  **[Address External Dependencies](#dependencies)** for the migration of the selected applications to PQC (e.g., publication of PQC standards, PQC-HSMs, PQC mature implementations).
4.  **[Implement PQC Components](#components)** to be eventually integrated into use cases.
5.  **[Implement PQC Guardrails](#guardrails)** by changing crypto standards, disallowing the creation of new keys and usage of affected APIs.
6.  [**Integrate PQC Components**](#PQC components) to protect the use cases against the quantum threat. 

## A. Prioritization

We have created a criteria that allows us to classify any application into different prioritization levels. To this end, we analyze various aspects that influence such a prioritization.

### High-Priority Applications

Susceptible to attacks that can be initiated now without the existence of a quantum computer (offline attacks) and efficiently completed later (SNDL attack by means of Shor’s algorithm). Any application using quantum vulnerable public-key encryption and key exchange primitives falls into this category. Among high-risk applications, we differentiate the ones that have no external dependencies (can be migrated right away), from the ones that have external dependencies and thus may need to wait until these dependencies are resolved. 

### Medium-Priority Applications

Susceptible to attacks that can only be initiated with a quantum computer in the future when a sufficiently powerful quantum computer is available (online attacks) and which will be efficiently performed (Shor’s algorithm). 

We differentiate these two categories based on their capability of upgrading their security mechanism: Medium-high risks are hard to patch (e.g., applications that have public keys baked into hardware) and medium-low risks are those that are possible to patch (e.g., software upgrades). The patching capability is particularly relevant for applications with long lifespans (i.e., time for development + time deployed in the field). Any application using quantum vulnerable digital signatures falls into this category. 

### Low-Priority Applications 

Susceptible to inefficient quantum attacks only (Grover’s attack). As presented in many academic publications (e.g., [Gheorghiu and Mosca, 2025](https://www.sciencedirect.com/science/article/pii/S0167739X24004308)), the enormous resource requirements to run such an attack (which even raises doubts about whether such an attack will ever be feasible) make them the lowest risk. Any application using symmetric cryptography with inadequate parameters falls into this category. 

The table below summarizes the proposed criteria.

![](https://engineering.fb.com/wp-content/uploads/2026/04/PQC-Priority-Chart-3.png)

Proposed post-quantum prioritization.

## B. Build a Cryptographic Inventory

Cryptography algorithms’ strength decays with time, as depicted in the chart below. Since the inception of cryptography, we have seen multiple ciphers and algorithms rise and fall with regards to security and adoption rate. The continuous need to replace cryptographic algorithms requires at the very minimum an understanding of where cryptography is being used. The problem is cryptography is ubiquitous, and finding all instances of a cryptographic primitive in a large infrastructure and codebase is inherently challenging.  

![](https://engineering.fb.com/wp-content/uploads/2026/04/Meta-PQC-Readiness.png)

Adapted from “[Getting Ready for the Post-Quantum Transition](https://www.securetechalliance.org/wp-content/uploads/LaMacchia-Utimaco-20201209.pdf).” Brian LaMacchia. Microsoft Research. December 9, 2020.

The process of mapping all the usages of cryptography within an organization is called Crypto Inventorying. For a company-wide PQC migration strategy, it represents a critical prerequisite for the completion of the work. This can be built applying two complementary strategies. 

-   **Automated Discovery**: We leverage monitoring tools, such as our [Crypto Visibility](https://engineering.fb.com/2024/11/12/security/how-meta-built-large-scale-cryptographic-monitoring/) service, to autonomously map cryptographic primitives used in production. This provides high-fidelity data on active usage within our primary libraries.
-   **Reporting**: Because monitoring cannot capture every edge case or shadow dependency, we supplement automation with developer reporting. This process captures cryptographic intent for new architectures and uncovers legacy usage in systems outside standard monitoring paths.

## C. Address External Dependencies

Besides the organization’s commitment, the PQC migration is a process that requires certain external prerequisites to be met. Next, we describe what needs to be unblocked so that a company-wide PQC migration is feasible. We also identify the main unblocking actors – the organization itself is always highly encouraged to engage in these processes.  

Dependency

Main Unblocking Actor

Community-vetted PQC standards

Standardization Bodies (NIST, IETF, ISO, etc)

PQC Support in Hardware

HSM, CPU, and other Hardware Vendors

Production-level PQC implementations

Crypto Engineering Community

_External Dependencies for PQC Migration._

### Community-Vetted PQC Standards

The cryptography community has been actively participating in the PQC standardization processes. As a result, NIST has recently published the first PQC standards: [FIPS 203](https://csrc.nist.gov/pubs/fips/203/final), [FIPS 204](https://csrc.nist.gov/pubs/fips/204/final), and [FIPS 205](https://csrc.nist.gov/pubs/fips/205/final), and announced a second list of algorithms to be standardized. Meta has been actively contributing, co-authoring some of the standardized algorithms (e.g., [HQC](https://pqc-hqc.org/)), and a few other candidates (e.g., [BIKE](https://bikesuite.org/) and [Classical McEliece](https://classic.mceliece.org/)). 

In addition, IETF has also published [two](https://datatracker.ietf.org/doc/html/rfc8554) [RFCs](https://datatracker.ietf.org/doc/html/rfc8391) specifying PQC schemes, and [ISO another PQC standard](https://www.iso.org/standard/80492.html). Many other standards are still needed, in particular those targeting higher-layer protocols. There are some preliminary drafts being written such as [IETF Draft #1](https://datatracker.ietf.org/doc/draft-celi-wiggers-tls-authkem/) and [IETF Draft #2](https://datatracker.ietf.org/doc/draft-ietf-tls-hybrid-design/). They address specific components of the TLS mechanism (e.g., the key encapsulation step). A considerable amount of work is still needed to finalize the drafts and cover other portions of the TLS stack, such as PQC X.509 certificates and PQC PKI in general. Most Meta products rely on TLS so lifting this roadblock is of utmost importance to effectively protect our systems.  

### PQC Support in Hardware

In some instances, organizations may have dependencies on external hardware vendors because some applications rely on hardware support (e.g. HSM and CPU). In cases like this it’s important that organizations align with their vendors as they plan for PQC migration. Meta, for example, is working closely with its hardware vendors on community-vetted, standardized PQC strategies.

### Production-Level PQC Implementations

Most cryptography-related vulnerabilities are not due to any flaws in the algorithms, but instead in their implementations, which may contain bugs or subtle side-channel vulnerabilities. Getting all these things right isn’t trivial. The good news is that the cryptography community has already been working on this front for quite some time. 

Since 2019, the [Open Quantum Safe](https://openquantumsafe.org/) consortium, part of the [Linux Foundation Post-Quantum Cryptography Alliance](https://pqca.org/?__hstc=160532258.a9b644d8947f4caed3ca4cb579a9285b.1775837034495.1775837034495.1775837034495.1&__hssc=160532258.1.1775837034495&__hsfp=ff276d7e7d7111aa38c8693166d87b32), has been developing [LibOQS](https://github.com/open-quantum-safe/liboqs), a PQC cryptography library. LibOQS is starting to be integrated by industry organizations. [Meta supports](https://pqca.org/members/) and is actively working with LibOQS leads, including [fixing bugs](https://github.com/open-quantum-safe/liboqs/issues/1548) in the library and continuously providing feedback. We’re committed to continuing fostering these strategic collaborations. 

## D- Design PQC-Secure Components

### Algorithms Selection

Post-quantum cryptography is a comparatively new field, and therefore organizations should not deviate from what reputable public standardization bodies are recommending. As mentioned above, the [NIST PQC Standardization competition](https://csrc.nist.gov/Projects/post-quantum-cryptography/post-quantum-cryptography-standardization) has recently published the first PQC standards. For building the underlying PQC secure building blocks, we encourage organizations to consider adopting the NIST PQC selected algorithms, namely:

-   Key exchange / Key encapsulation: **ML-KEM** ([NIST FIPS 203](https://csrc.nist.gov/pubs/fips/203/ipd))
-   Digital Signatures: **ML-DSA** ([NIST FIPS 204](https://csrc.nist.gov/pubs/fips/204/ipd))

In addition to the algorithms listed above, NIST also selected two additional signature algorithms: SPHINCS+ and Falcon. Compared to Dilithium, the former has considerably larger signature sizes while the latter requires float pointing arithmetic. These drawbacks make their adoption considerably harder than the (already somewhat challenging) deployment of ML-DSA. 

In terms of security strength, both ML-KEM and ML-DSA are defined with different parameter sets, each parameterization offering a different performance x security profile. For ML-KEM, in general we suggest teams to consider adopting ML-KEM768 achieving NIST Security Level 3, although exceptions can be granted for ML-KEM512 achieving NIST Security Level 1 (as endorsed by [NIST PQC FAQ](https://csrc.nist.gov/csrc/media/Projects/post-quantum-cryptography/documents/faq/Kyber-512-FAQ.pdf)) in case ML-KEM768 performance is prohibitive for a particular use case. The same applies for ML-DSA, preference for ML-DSA65 but exceptions could be allowed for ML-DSA44 considering performance constraints. 

HQC has been recently selected by NIST for standardization. It is developed based on different math than ML-KEM, which is important if weaknesses are discovered in ML-KEM or its modular lattices approach, ensuring that an alternative method for PQC protection can still be deployed to protect organizations from SNDL attacks. NIST is currently drafting the HQC standard.

## E – Implement PQC Guardrails

Besides migrating existing applications, we should also prevent applications from being designed with quantum vulnerable cryptographic algorithms in mind. This can be done by adding friction to any new use case trying to use quantum vulnerable algorithms. 

1.  **Update internal cryptography guidelines** documents to warn teams about the risks of adopting quantum vulnerable public-key cryptography, and the need to eventually migrate to PQC.  
2.  **Discourage the creation of new quantum vulnerable keys**. If the organization controls the tools to generate keys, those tools should warn teams when they request the creation of new quantum vulnerable keys. This wouldn’t fully prevent teams from generating such keys using other interfaces but would likely require them to engage with the internal crypto team.  
3.  **Discourage the usage of affected APIs**. If the organization benefits from a centrally managed source code repository with tightly controlled building system (e.g., [Buck system](https://buck.build/)), it can create rules that prevent the usage of potentially affected APIs (e.g., RSA or ECDH APIs), and thus warn teams during code review if they try to use them. 

## F- Integrate PQC Components 

The deployment of PQC-based solutions generally follows one of two paths: **replacement** (swapping classical for PQC) or **hybrid** (combining both).

While replacement reduces bandwidth and complexity, it relies entirely on newer PQC standards that are still maturing. The recent cryptanalysis (and invalidation) of algorithms like SIKE (final-round candidate running in the NIST PQC standardization process) underscores the importance of relying on thoroughly time-vetted, standardized algorithms during this period of transition to maintain robust security.

To mitigate this, we prioritize the hybrid approach by layering a PQC primitive on top of an established classical one, designed so that the combined system should remain at least as secure as the current standard. An adversary would need to break both layers to compromise the system, providing a critical safety net.

## Final Remarks 

Sharing our strategy and learnings doesn’t mean the process is complete. Hardening Meta’s systems — and any other organization’s systems — to post‑quantum cryptography takes years of phased work across protocols, products, and infrastructure as standards and implementations and threats mature. We’ll continue to expand coverage, extend protections, and share progress, and we’ll keep raising the bar to ensure we’re following the rigorous security practices consistent with evolving industry standards.

**_The information in this article is shared for informational purposes only and does not constitute professional, technical, or legal advice, nor does it constitute a guarantee of any particular security outcome. Organizations should conduct their own assessments and consult qualified professionals before making cryptographic implementation decisions._**

## Acknowledgements

_This work reflects a broad, cross-company effort. We’re grateful to colleagues across Meta who are helping shape our post-quantum cryptography migration strategy and turn it into practice—through system design, implementation, deployment planning, measurement, and ongoing operations. In particular, we’d like to acknowledge the invaluable contributions and collaboration from teams across:_ **_Transport Security_** _(__Sheran Lin_ _,_ _Jolene Tan_ _,_ _Kyle Nekritz__,_ _Ameya Shendarkar__)_**_, WhatsApp_** _(__Sebastian Messmer,_ _Maayan Sagir Hever,_ _Julian Maingot,_ _Alex Kube,_ _Ronak Patel__),_ **_Facebook/Messenger_** _(__Emma Connor,_ _Jasmine Henry__),_ **_Infrastructure_** _(__Dong Wu,_ _Grace Wu, (Seattle)_ _Weiyuan Li,_ _Yue Li__,_ _Shay Gueron Grunbaum__,_ _Xiaoyi Fei__)__,_ **_Reality Labs_** _(__Marcus Hodges__)__,_ **_Hardware_** _(__Hendrik Volkmer,_ _Vijay Sai Krishnamoorthy__)_ _and the_ **_Payments team_** _(__Hootan Shadmehr__,_ _Hema Pamarty,_ _Ryan DeSouza__)_**_._** _We also thank Chris Wiltz and the many additional engineers, researchers, program managers, and reviewers — across Security, Product, and Policy — whose feedback improved both the technical clarity and the practical guidance in this post._