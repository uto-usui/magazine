---
title: "How Advanced Browsing Protection Works in Messenger"
source: "https://engineering.fb.com/2026/03/09/security/how-advanced-browsing-protection-works-in-messenger/"
publishedDate: "2026-03-09"
category: "engineering"
feedName: "Meta Engineering"
---

-   We’re sharing the technical details behind how Advanced Browsing Protection (ABP) in Messenger protects the privacy of the links clicked on within chats while still warning people about malicious links.
-   We hope that this post has helped to illuminate some of the engineering challenges and infrastructure components involved for providing this feature for our users.

While [end-to-end encryption (E2EE) on Messenger](https://engineering.fb.com/2023/12/06/security/building-end-to-end-security-for-messenger/) ensures that direct messages and calls are protected, Messenger’s Safe Browsing feature safeguards against malicious links within end-to-end encrypted messages and calls on the app. If you’re sent an unsafe link for some reason – maybe it’s sent by someone you don’t know or by a friend whose account has been compromised – Safe Browsing warns you that the link points to an unsafe website that may try to steal passwords or other personal information from you.

In its standard setting, Safe Browsing uses on-device models to analyze malicious links shared in chats. But we’ve extended this further with an advanced setting called Advanced Browsing Protection (ABP) that leverages a continually updated watchlist of millions more potentially malicious websites.

To build ABP, we had to leverage a series of intricate infrastructure components, a complex system of cryptographic primitives, all working together with the goal of protecting user privacy in Messenger.

## Private Information Retrieval – The Starting Point for ABP

ABP closely mirrors the setting for a cryptographic primitive known as private information retrieval (PIR). In the classical PIR setting, a client queries a server (that holds a database) to learn whether or not the subject of the query is a member of that database. This protocol aims for the server to learn as little information as possible (ideally no information) about the client’s query.

In a theoretical setting, the server could send the entire database to the client, allowing the client to perform subsequent query lookups on its own, without needing to involve the server anymore. However, the database used by ABP needs to be updated frequently, and is too large to reasonably be sent down to the client. Furthermore, revealing the entire database to the client could inadvertently aid attackers attempting to circumvent the system.

Other work has suggested that [this approach can be improved upon by using an oblivious pseudorandom function (OPRF)](https://www.usenix.org/system/files/sec19-thomas.pdf) and dividing the database into multiple shards (or “buckets”) so that the linear-time operation is performed over a fraction of the database.

This existing approach was the starting point for our implementation of ABP, but there were two issues that we needed to adapt into our setting.

1.  An OPRF works well for queries that are exact matches into the database. However, URL-matching queries are not exact matches, as we will describe in more detail, shortly.
2.  This also means that the client still needs to tell the server which bucket to look into. This inherently introduces a tradeoff between the privacy of the system versus the efficiency/bandwidth: The less granular the buckets, the less efficient the protocol becomes, but the less information is leaked from client’s query to the server.

There are also other approaches, namely cryptographic constructions, which improve this tradeoff by employing lattice-based techniques to reduce the amount of sharding needed. However, at the time of writing, these did not appear to be practical enough to completely eliminate the need for sharding at our scale. This could be a promising future direction for the system, though, and for industrial applications of PIR in general.

## How ABP Handles Prefix Queries for URLs

The server’s database entries consist of URL domains with (and without) paths, which do not always correspond to exact link matches. For instance, if an entry for “example.com” existed in our database, and the client submits a query in the form, “example.com/a/b/index.html” this should be reported to the client as a match, even though the link contents do not match exactly.

Instead, what we need is a privacy-preserving “URL-matching” scheme between the client’s query and each of the database entries. Subdomains are also a consideration here, but we’ve omitted them for the simplicity of this example.

One simple approach we considered to address these prefix queries was to run a series of parallel queries for PIR, one for each path prefix of the URL. So, in our running example of the client query being “example.com/a/b/index.html” the client would create PIR queries for:

-   example.com
-   example.com/a
-   example.com/a/b
-   example.com/a/b/index.html

Functionally, this would satisfy prefix matching, but there is a privacy issue with this approach: Each of these path prefix queries leaks extra information about the client’s actual URL. If the PIR scheme we use does not leak any information to the server, then this might be acceptable, but if the server learns _B_ bits of the client query, then in this scheme the server learns _P_ \* _B_ bits, where _P_ is the number of path prefixes in the URL. For extremely long URLs, this might even be enough to uniquely identify a plaintext link!

In order to reduce the leakage to the server, we can instead have the server group together links that share the same domain. This way, the client can again request just one bucket (the bucket corresponding to the URL’s domain), then check _all_ the prefix URL path components for membership in that one bucket.

This would indeed address the privacy issue so that the server only learns _B_ bits. But it also creates a new efficiency problem: Bucket sizes can become unbalanced. We create buckets by hashing URLs. If we were to hash full URLs, we could expect bucket sizes to be approximately uniform because each blocklist entry is mapped to a bucket pseudorandomly. When we hash only domains, that’s no longer the case. If many blocklist entries share the same domain, they all end up in the same bucket. 

It turns out that in practice many blocklisted URLs _do_ share domains. For example, consider link shortening services: These services might host many, many URLs (both malicious and benign) that all share the same domain. If many links share the same domain and, hence, belong in the same bucket, then the size of the bucket might be too large to be able to return to the client. And since we apply padding to buckets, the response size would be equal to the maximum across all buckets! 

## Pre-processing Rulesets

To address this problem, we have the server perform a pre-processing step in which it attempts to balance buckets by generating a “ruleset”: a set of operations to process and hash a given URL. The server computes this ruleset and shares it with clients ahead of time so that the client can apply the same set of rules at lookup time.

Here’s an example of a ruleset containing three rules:

**Hash Prefix**

**\# of Path Segments**

08bd4dd11758b503

2

fe891588d205cf7f

1

c078e5ff2e262830

4

Each row is a rule that maps an 8-byte hash prefix to a certain number of path segments to append to the running URL query. Using our example of the link “example.com/a/b/index.html,” the client starts by computing a short hash of the domain: Hash(“example.com”). Let’s say that it matches one of the hashes in the ruleset, 08bd4dd11758b503. Then the client is instructed to recompute the hash after appending two path segments, meaning that the client computes the new hash as Hash(“example.com/a/b”) and again checks to see if the ruleset contains an entry for the new hash. The client repeats these steps until the hash prefix does not exist in the ruleset, at which point it stops and outputs the first two bytes of that hash prefix as a bucket identifier.

The server generates the ruleset in an iterative process. The server starts with the assumption that each URL is hashed only by its domain and computes the initial buckets. It then identifies the largest bucket and finds the most common domain in that bucket. Then, it breaks up that bucket by adding a rule to append one or more additional URL segments for that domain. This process is repeated until all buckets are below an acceptable threshold.

Because of the way the ruleset is generated, any URL that has a blocked prefix is guaranteed to hash to the bucket containing that entry. This invariant holds so long as the blocklist doesn’t contain redundant entries (e.g., one entry for “example.com” and another for “example.com/a”) and as long as the hash function used for ruleset mapping doesn’t produce any collisions among blocklist entries.

At lookup time, the client uses the same ruleset to compute the URL’s bucket identifier. The client sends the bucket identifier to the server alongside an OPRF-blinded element for each path segment of the query link. The server responds with the bucket contents and the OPRF-blinded responses. Finally, the client unblinds the OPRF output and checks for an exact match of any of the OPRF outputs in the bucket contents. If a match is found, then the URL is flagged.

Note that in order to hide the number of path segments of the query link from the server, we must appropriately pad up to a fixed maximum number of elements in order to prevent the length of the request from revealing information about the link. Likewise, we must also pad the bucket contents so that all buckets are of the same length, so that the length of the server response doesn’t reveal information about the client’s link.

## Safeguarding Client Queries

Now, in the description of this protocol so far, the client still sends a bucket identifier (computed from the URL) to the server in order to be able to efficiently process the query. We can use additional mechanisms to further reduce the bits of information that a hypothetically adversarial server could glean from the client’s query, which we will cover in the following sections.

### Confidential Computing

In order to limit the exposure of these hash prefixes to Meta’s servers, we leverage [AMD’s SEV-SNP technology](https://www.amd.com/en/developer/sev.html) to provide a confidential virtual machine (CVM) for which the server-side code processes these hash prefixes. At a high level, the CVM provides an environment for us to run application code that we can generate attestation reports for. It also allows us to bootstrap a secure channel from a client to the CVM after the client establishes “trust” by verifying these attestation reports.

An attestation report contains:

-   A container manifest containing hash digests of the CVM’s launch configuration and packages, which essentially acts as a commitment to the application logic running on the CVM.
-   A public key generated on CVM startup, corresponding to a private key that remains secured within the TEE.
-   A certificate chain, with its root certificate established by AMD’s Key Distribution Service.
-   A signature from the [transparency log witness](https://developers.cloudflare.com/key-transparency/), which provides a uniqueness guarantee that mitigates server-side equivocation

Upon receiving this report, the client verifies all of the certificates/signatures and then uses the embedded public key to establish a secure channel with the CVM. This secure channel is used by the client to transmit the bucket identifier to the CVM, which then uses the corresponding decryption key to decrypt the client’s request to obtain the plaintext bucket identifier.

Last year, we posted about our usage of AMD SEV-SNP for providing a trusted execution environment for [WhatsApp Private Processing](https://engineering.fb.com/2025/04/29/security/whatsapp-private-processing-ai-tools/), and many of the details behind the hardware setup are similar there.

One aspect missing from this verification procedure is the releasing of these artifacts for external security researchers to be able to validate. We aim to provide a platform for hosting these artifacts in the near future.

### Oblivious RAM

While the hardware guarantees provided by AMD SEV-SNP do allow us to reduce the exposure of these hash prefixes and send them through an encrypted channel, they are not sufficient by themselves to fully hide these hash prefixes from an observer that obtains administrative privileges of the host system to monitor memory accesses over time. Although the memory pages are encrypted through AMD’s Secure Nested Paging (SNP) technology, the patterns of access themselves must also be kept private.

A straightforward way to address this would be to load the database into the machine’s memory on startup, and upon every client request, ensure that each one of the B buckets in the database is retrieved from memory, even though only one bucket is actually included in the server’s response. While this is fairly wasteful from a purely computational perspective (the B-1 accesses don’t actually factor into the response), the server can avoid directly leaking the bucket index being fetched to an adversary that can observe its memory access patterns when serving client requests.  
  
For a really large database, these B-1 accesses can end up being a bottleneck on the overall runtime of the server. There are two methods we leverage to optimize this performance overhead without compromising on privacy:

1.  Since our database is (at the time of writing) not overwhelmingly large, we can fit multiple disparate copies of the same database into memory on a single machine. Incoming client requests are assigned one of these copies based on availability, since the linear scan is inherently sequential in nature.
2.  We can improve on the number of accesses asymptotically, from linear to sublinear, by relying on an algorithm called [Path ORAM](https://eprint.iacr.org/2013/280.pdf).

The exact details of how Path ORAM works in our setting is beyond the scope of this post, but you can find more information about this in [our open-source library for Path ORAM](https://github.com/facebook/oram).

### Using Oblivious HTTP

To further strengthen the privacy guarantees of ABP, we leverage a third-party proxy and the [Oblivious HTTP (OHTTP) protocol](https://www.ietf.org/rfc/rfc9458.html) to de-identify client requests. The third-party proxy sits in between the client and server, processing encrypted client requests by stripping out identifying information from them and forwarding these de-identified requests to the server, which, in turn, is able to decrypt the request payload. This makes it more difficult for the server to be able to observe identifiers (such as the client’s IP address).

## The ABP Request Lifecycle

The overall lifecycle of ABP for a request works as follows:

Pre-processing/background phase:

1.  On a periodic basis, the server pulls in the latest updates to the URL database, iteratively computing a ruleset that balances the database entries into similarly-sized buckets. 
2.  These buckets are then loaded onto a TEE using ORAM. 
3.  The TEE generates a keypair, and the public key is embedded in an attestation report, generated by AMD SEV-SNP hardware. 
4.  The attestation report and the current ruleset for the database are provided to the client upon request (through a third-party proxy).
5.  The client verifies the signatures contained in the attestation report, and locally stores a copy of the public key and database ruleset.

And then, on each client request corresponding to a link click:

1.  The client, upon clicking a link in an E2EE chat, calculates the bucket identifier for the link by applying the rules of the “ruleset” to the URL. 
2.  This bucket identifier is encrypted for the specific CVM instance using its public key. 
3.  The client also computes a series of OPRF requests (blinded group elements), one for each path segment of the URL (padded). 
4.  The encrypted bucket identifier, along with these OPRF requests, are sent through a third-party proxy to the server, along with a client public key as part of the establishment of a secure channel.
5.  The server precomputes the server-side evaluation of the OPRF requests to produce OPRF responses. 
6.  The server then decrypts the bucket identifier, uses ORAM to look up the corresponding bucket contents, and returns the OPRF responses and bucket contents to the client, encrypted under the client’s public key.
7.  The client then decrypts the server’s response, and uses the bucket contents along with the OPRF responses to complete the OPRF evaluation and determine if a match was found. If a match was found, then the client displays a warning about the query link.