---
title: "De-identifying text at scale: How Airbnb protects personal data in AI training"
source: "https://medium.com/airbnb-engineering/de-identifying-text-at-scale-how-airbnb-protects-personal-data-in-ai-training-32f3ff8ff7d0"
publishedDate: "2026-11-17"
category: "engineering"
feedName: "Airbnb Engineering"
author: "Alexandr Climov"
---

> **Note:** Full content could not be retrieved. [Read the original article](https://medium.com/airbnb-engineering/de-identifying-text-at-scale-how-airbnb-protects-personal-data-in-ai-training-32f3ff8ff7d0)

#### **Here’s how Airbnb detects and replaces personal data in messages, reviews, and support chats before it reaches a model.**

![A bright, open-air dining area featuring a rustic, light-washed wooden table and matching benches set for a meal. A large woven white pendant light hangs from a high, exposed wooden ceiling. The left side of the room is completely open to a lush tropical garden with a tall, vine-covered wall and large elephant ear plants, bringing natural light into the white-tiled space.](https://cdn-images-1.medium.com/max/1024/1*nyiV0meGhVO9cZszJPeHCQ.jpeg)

**By:** [Emelin Flores](https://www.linkedin.com/in/emelinflores01/)**,** [Alex Klimov](https://www.linkedin.com/in/alexander-klimov-8521599/), [Lee Formyduval](https://www.linkedin.com/in/wlformyd/), [Bahador Nooraei](https://www.linkedin.com/in/bahadorn/)

### Introduction

Airbnb is built on trust. Every night that a guest books a stay, or a host welcomes someone into their home, that trust is backed by information they’ve shared with us, which includes personally identifiable information (PII) such as names, home location, current location, and payment details.

We now use transaction information to train machine learning models. Before we do so, we remove PII to minimize the number of copies of this information and prevent leakage into and through our models.

[As we’ve written before](https://medium.com/airbnb-engineering/personal-data-classification-2d816d8ea516), Airbnb maintains a shared taxonomy as to what constitutes PII, from commonly used fields such as names and card numbers to less frequently used fields such as precise location coordinates. We use de-identification to remove PII and replace it with simulated data that’s as realistic as possible to maximize its usefulness for ML model training.

Decisions relating to user privacy start as policy. These policies are set and maintained by Airbnb’s Privacy Architecture team, with engagement from Legal, Policy, and Engineering. Engineering then implements policy decisions as code.

This post focuses on text de-identification. We’ll describe the OSS library we chose to start with, the changes we made to create a functional system for Airbnb, and how we confirm that the system is working.

### 1\. Choosing Presidio as the foundation

Many organizations are concerned with protecting PII, so there’s a lot of existing best practice and tested code out there that we can use. We chose [Presidio](https://github.com/data-privacy-stack/presidio), an [open-source](https://presidio.dataprivacystack.org/) library originally developed by Microsoft and recently transitioned to community governance.

We needed to meet demanding requirements:

-   On-premises hosting, to keep data on our infrastructure
-   General-purpose functionality and high degree of modularity, for maximum extensibility
-   Multilingual support, for our global user base
-   PII detection and obfuscation separate, but within a single framework, for manageability and consistency
-   Support for redaction, masking, and realistic replacement
-   Consistent fake values within a run (ie, the same name repeatedly produces the same fake result)

Presidio meets these requirements well, especially regarding modularity. Functional elements such as PII recognizers, natural language processing (NLP) engines, and operators are all pluggable. We bypassed alternatives such as managed cloud services, since hosting is not on-premises, and standalone recognizers, known as named entity recognition (NER) models, since they only address part of the problem we needed to solve.

### 1.1 Deployment and distribution

Presidio ships as a [Python package](https://pypi.org/project/presidio/), and each consumer imports it in-process rather than calling a service we operate. Raw personal data is de-identified inside the calling process, so no separate service holds it and the data flow stays simple. It also removes a central bottleneck, since jobs run independently wherever compute is available. The decision is reversible: the same library wraps into a service if the need arises.

The tradeoff is distribution. The library only protects data if every pipeline calls it, on the current version, with a compliant configuration. Models at Airbnb train through a shared machine learning (ML) workflow orchestrator, so the library ships as a reusable pipeline step. A team supplies only its data schema, marking which columns carry personal data; we own the recognizers, operators, language handling, and runtime environment. The resulting dataset is tagged as de-identified, and that tag follows the data into the model registry, where it is designed to gate deployment to production. Each run records the library version and configuration used, so registered models can be traced back to the datasets that produced them.

![A flowchart of an ML training workflow where data undergoes opt-out filtering and de-identification before training. Model deployment is gated by a final check, proceeding only if the model registry confirms the training data was successfully tagged as de-identified.](https://cdn-images-1.medium.com/max/1024/1*EVMSN2ulRkqCnu-gGIisiw.png)

_De-identification as a shared workflow step: the library runs inside the step, and the dataset tag gates model deployment._

### 2\. How it works

Presidio runs text through two stages. The Analyzer finds spans that look like personal data, then labels each span with an entity type and a confidence score; the Anonymizer decides what replaces each span. Everything we build sits inside the Analyzer or the Anonymizer.

![A diagram illustrating a text anonymization pipeline. The input text ‘Call Ana Ruiz at 555–0134’ is processed by an Analyzer, which identifies ‘Ana Ruiz’ as a PERSON and the number as a PHONE entity. An Anonymizer then applies separate rules to each, replacing the name with a \`<PERSON>\` tag and masking the phone number with asterisks, resulting in the safe output: ‘Call <PERSON> at \*\*\*\*\*\*\*\*’.](https://cdn-images-1.medium.com/max/1024/1*_CVMVe1GLc397HHD3sLtlg.png)

_Presidio components with an example._

### 2.1 The Analyzer

The [Analyzer](https://presidio.dataprivacystack.org/analyzer/) is a collection of recognizers for personal data, each responsible for one entity type, such as a name or a phone number. Recognizers differ in how they decide that a span of text is an entity of interest to this capability, and we use three kinds.

![A diagram showing the EntityRecognizer architecture. A common base class branches into three types: PatternRecognizer (regex-based), NER-based (NLP model-based), and RemoteRecognizer (external services). Each type lists its decision method and best use cases, but all output the identical contract: entity type, start/end offsets, and a confidence score.](https://cdn-images-1.medium.com/max/1024/1*mIkK8mlygq25UelhgP6b-Q.png)

_Three kinds of recognizers with their behavior._

For a pattern-based recognizer, detection quality depends on both a regex and a context-word list. For an NER-based one, it depends on the model behind it, so the model choices discussed later affect only some of our recognizers.

Recognizers run independently, so two different recognizers can claim text strings that overlap, or in which one is nested within another. A LISTING\_ID matched inside an EMAIL\_ADDRESS is one common case. Overlaps pass through the Analyzer untouched and are resolved in the Anonymizer as a configurable step before any operator runs.

![A four-step diagram illustrating how conflicting PII detections are resolved. 1) Independent recognizers generate multiple overlapping entity claims. 2) Exact duplicates are collapsed. 3) The anonymizer resolves remaining overlaps by merging boundaries and dropping nested or lower-confidence claims. 4) The final, settled spans are transformed into anonymized tags.](https://cdn-images-1.medium.com/max/1024/1*vIr7tRweFYZ-jRtxqTNPeg.png)

_Handoff between recognizer and anonymizer._

**Language detection is a prerequisite.** Recognizers and models are language-specific, so it’s important that language detection be accurate. Names and addresses are short and carry few language cues, so we detect language on the whole record, or take it from the record’s locale metadata when it exists. If neither gives a confident answer, we use a more conservative configuration rather than taking the risk of using a model that might be for the wrong language.

**Pattern-based recognizers.** We support Presidio’s [standard entity types](https://presidio.dataprivacystack.org/supported_entities) alongside Airbnb-specific ones such as LISTING\_ID and AIRBNB\_GIFT\_CARD, which no general-purpose model knows about. We defined Airbnb-specific recognizers as PatternRecognizers. For an identifier that’s just a run of digits, shape alone can’t settle the match. A gift card number, a credit card number valid against the widely used Luhn algorithm, and a listing ID all look the same. Presidio’s [context words](https://presidio.dataprivacystack.org/tutorial/06_context/?h=context#example-adding-context-words-support-to-recognizers) supply the deciding signal, so “listing” appearing a few tokens before a number raises the LISTING\_ID score above the other candidates.

But stock context matching is single-token, so “gift card” declared as context never fires, and “card” alone fires just as readily next to a credit card. We extended the enhancer with a phrase pass, an ordered contiguous multi-word match in the tokens before a candidate, scored above a single-word hit, so the recognizer whose specific phrase appears wins the span.

**NER-based recognizers.** Names and street addresses have no structural pattern, so detecting them depends on a model. Presidio’s default [NLP engine](https://presidio.dataprivacystack.org/analyzer/customizing_nlp_models/) is spaCy, which is fast, mature, cheap at scale, and requires no training from us. Its generic NER tags any location it sees, including cities, landmarks, and neighborhoods, while the detail that identifies a person is a street address with a house number. On our benchmark those broad tags never resolved to the full address span.

We replaced spaCy for PERSON and LOCATION with recognizers built on [GLiNER](https://github.com/urchade/GLiNER), a zero-shot NER model that takes an entity description at inference time. That lets us ask specifically for a street address instead of any place name, and precision improved for both entity types.

We evaluate newer backends the same way, and [GLiNER2](https://github.com/fastino-ai/GLiNER2) is wired into the harness as a candidate. We adopt one for a given recognizer only when the benchmark shows a gain.

**Configurable detection.** [Score thresholds and entity scope](https://presidio.dataprivacystack.org/analyzer/analyzer_engine_provider/) are set per recognizer and per consumer, because different consumers want different answers from the same text. A pipeline feeding raw text into training wants a low threshold and accepts false positives. On already-reviewed data, a consumer can trade recall for fewer unnecessary redactions. Consumers can also limit detection to the entity types present in their data.

### 2.2 The Anonymizer

The Anonymizer operates on the Analyzer’s output, a set of detected entities whose overlaps are unresolved. Settling those is its first job, and [how it settles them is configurable](https://presidio.dataprivacystack.org/api/anonymizer_python/#presidio_anonymizer.ConflictResolutionStrategy). For each surviving span it then applies an operator, a transformation that decides what replaces the original value.

Presidio’s [default operators](https://presidio.dataprivacystack.org/anonymizer/#built-in-operators) leave a document full of placeholder tokens or blank gaps, and both tell a downstream model far less than realistic-looking text does. Most of our work on the Anonymizer went into closing that gap.

![A diagram showing five different anonymization operators applied to a detected PHONE\_NUMBER entity: replace (with a tag), redact (empty string), faker (synthetic number), mask (partially hidden with asterisks), and hash (alphanumeric string).](https://cdn-images-1.medium.com/max/1024/1*60j_2bZA0MLYNqGas0IHgQ.png)

_Common Anonymizer modes._

**Faker-based values.** For most entity types we use the [faker library](https://faker.readthedocs.io/en/master/index.html) to generate realistic fake values, so a real name becomes another plausible name rather than <PERSON>. This matters for downstream utility, since a model training on de-identified text should still see content that reads like the original. Placeholder tokens signal that something was removed, and that signal is itself a pattern a model might learn, resulting in mis-training.

**Custom fakers.** Two things push us off the stock library. The first is that some matches shouldn’t be faked at all. A listing’s own URL is structural, non-personal data that consumers need intact, and a generic URL faker can’t tell it apart from any other site.

![A diagram illustrating domain-specific URL anonymization. A detected URL belonging to the company’s own domain (airbnb.com) is left intact in the generated output, while an external domain (ana-travels.blog) is replaced with a completely faked URL.](https://cdn-images-1.medium.com/max/1024/1*sNY6S73dtdTWy_yzwgHXXg.png)

_URL replacement behavior._

The second is that the library’s assumptions don’t always hold. Some locales’ card-network tables are so narrow that faking a card number in the text’s own language fails, so we pin the card faking to a locale with full coverage. Keeping a real country and area code while faking the rest of a phone number needs a library that parses phone-number structure, not a locale-based generator. And where an identifier format has a reserved or never-issued range, the fakes are drawn from it, so they can’t collide with real values.

**Keeping fake values consistent — and unlinkable.** Two properties have to hold at once, and they pull against each other. Across separate runs, de-identifying the same input must produce different fake values, so the fakes themselves are designed not to become a fingerprint tying two de-identified outputs back to each other. Within a single run, the same real value must always map to the same fake, or the dataset stops being internally coherent — the same person mentioned twice in one record needs the same fake name both times.

A globally shared random state can’t give you both, so each fake is seeded from the real value plus a secret unique to the run. We don’t store a real-to-fake mapping.

![A diagram showing deterministic faking. Within a single run using a specific secret, the name ‘Ana Ruiz’ is consistently replaced with the same fake name (‘Marta Nowak’). In a different run using a different secret, the same input yields a different consistent fake name (‘Ines Duarte’).](https://cdn-images-1.medium.com/max/1024/1*fq96_tjM-zrZZdwk940t6g.png)

_Per-call seeding: same value, same fake within a run; different fakes across runs._

**Configurable de-identification.** Which operator applies to which entity type is configurable per model and use case, mirroring the configurable detection in §2.1 above. A pipeline feeding text into model training wants the faker-based operators for anything that needs to be read naturally. A use case where a human is reviewing flagged output might prefer a mask, so the reviewer can still recognize what kind of value it was. The same engine also covers structured columns. Identifiers are hashed with a caller-supplied salt — a secret mixed into each value before hashing — so the same value maps to the same hash within a run, and the hash can’t be reproduced without the salt. Coordinates are truncated to a precision set by Privacy, keeping most of the geographic signal without pinpointing a location. Our 64-bit internal IDs, the numeric keys for listings, reservations, and similar records, go through format-preserving encryption, so that the output is another valid ID of the same width and range, so a de-identified table passes the same schema checks as the original.

### 3\. Evaluating and iterating on de-identification quality

Everything above, the recognizer split, spaCy versus GLiNER and GLiNER2, the phrase-context layer, are design decisions, not proof. We hold those decisions to measurement along three dimensions, because optimizing for any one produces a system that fails in a specific, predictable way.

Recall is how much real personal data the system finds; a miss is a leak, not a rounding error. Precision is how much of what it flags is actually personal data; over-redaction turns legitimate text into noise a model can’t learn from. Throughput is detection speed at pipeline scale. When recall and precision have to be traded, we weigh recall, because our users’ privacy is our top priority.

![A grid chart displaying F1 scores for detecting various entities across six languages. Pattern-based entities (like emails and credit cards) score perfectly across all languages. NLP-dependent entities (PERSON and LOCATION) score well in English, Spanish, French, and German (green), but perform poorly in Japanese and Polish (red).](https://cdn-images-1.medium.com/max/1024/1*LJsipIpA3olJlH9uoqbCdQ.png)

_Detection quality broken out by entity type and language._

An aggregate score is exactly where the failure that matters most goes to hide, so every metric is reported per entity type and per language, with the number of labeled instances behind it, and a table of which entity type claimed spans that belonged to another. One identifier swallowing another’s spans is a different fix from a recognizer that simply misses, and invisible in an aggregate.

The benchmark scores the overlap-resolved spans the library actually emits, not the Analyzer’s raw candidates — a phone-shaped ZIP code inside a correctly detected address never reaches the output, so it shouldn’t count against phone-number precision. Measuring the product rather than an intermediate keeps the numbers aligned with what downstream teams see.

Because the harness takes the NER backend as a parameter, spaCy, GLiNER, and GLiNER2 are scored on the same golden sets side by side; that comparison is why GLiNER owns PERSON and LOCATION today and GLiNER2 remains a candidate. A new language works the same way — the spaCy model, context phrases, and locale-aware fakers are the easy part; it ships when a labeled dataset in that language exists to score it against.

When a gap surfaces, it gets folded into the benchmark, so the datasets expand rather than standing as a fixed snapshot. And before any release, we run the full framework against the deployed version and the candidate side by side; a version ships only when no language or entity type that has worked in the past has regressed.

That comparison, run against a benchmark that keeps getting harder, is what “good enough” means here: not a number hit once, but a bar the next version has to clear again, every time.

### What’s next / conclusion

When our community shares information with us, we use the least possible amount in our ML models. De-identification is how we keep our models useful; it isn’t a single control we turned on, but a library, a set of configurable defaults and a benchmark that keeps getting harder. It is built so a team training a model on text doesn’t have to make privacy decisions from scratch, and so that the decisions they inherit are ones we can point to evidence for.

Getting detection working was an important milestone, but there is still plenty of work to be done. There are always new languages we can add, and new LLM-based recognizers arise that we can include in the platform. So far, we are only shipping our work on text, but we have already started on de-identifying other media as well.

If this type of work interests you, check out some of our [related positions](https://careers.airbnb.com/)!

### Acknowledgments

Thanks to Airbnb’s Privacy and MLI teams for making de-identification a shared default; to Bill Meng and Iman Saleh for grounding the requirements in privacy regulation; to Shunbao Chen for driving adoption by ML practitioners; to Manman Fan for improving detection quality; to Varun Sagar and Joe Rutherford for keeping the work on track across teams; and to Jessica Simon and Zoya Sultana for their leadership and support.

_All product names, logos, and brands are property of their respective owners. All company, product, and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement._

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=32f3ff8ff7d0)

* * *

[De-identifying text at scale: How Airbnb protects personal data in AI training](https://medium.com/airbnb-engineering/de-identifying-text-at-scale-how-airbnb-protects-personal-data-in-ai-training-32f3ff8ff7d0) was originally published in [The Airbnb Tech Blog](https://medium.com/airbnb-engineering) on Medium, where people are continuing the conversation by highlighting and responding to this story.