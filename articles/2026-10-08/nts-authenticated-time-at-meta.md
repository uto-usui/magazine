---
title: "NTS: Authenticated Time at Meta"
source: "https://engineering.fb.com/2026/10/06/production-engineering/nts-authenticated-time-at-meta/"
publishedDate: "2026-10-06"
category: "engineering"
feedName: "Meta Engineering"
---

-   Meta’s public time service now speaks **NTS (Network Time Security, RFC 8915)** at nts.meta.com. Packets are authenticated, so a device can verify the time came from us and was not modified on the way.
-   Our NTS servers hold no per-client state. Cookie keys are derived, not stored and not replicated.
-   We’ve open sourced everything, including the protocol, server, client through [Meta’s Time library on GitHub](https://github.com/facebook/time).
-   We’re also encouraging everyone, particularly those who maintain an NTP client on Android or iOS, to join us in enabling NTS support. 

We’ve previously written about [building a more accurate time service at Meta scale](https://engineering.fb.com/production-engineering/ntp-service/) – migrating from ntpd to chrony, going from 10 milliseconds to 100 microseconds, and opening time.meta.com to everyone.

That work made time precise. This work makes it verifiable.

## Why NTS?

NTP has been unauthenticated since 1985, like a lot of the internet’s foundational protocols. But it is also the one every certificate, token, and signature is checked against. The client sends 48 bytes, something sends 48 bytes back, and the client believes it. There is no signature and no identity.

It is not alone in that. Plenty of the internet’s foundational protocols were designed for a network where nobody was assumed to be hostile, and the industry has been retrofitting them ever since. What makes time different is that it is not just another protocol to secure. It is the input every other security decision is measured against.

For most of NTP’s life that did not matter much, because a clock being a few seconds off was an operational annoyance. Today it is load-bearing:

-   **Certificate validation:** notBefore and notAfter are compared against the local clock. Wrong clock, wrong answer.
-   **Token and credential expiry:** “Valid for 15 minutes” is a claim about a clock.
-   **Replay windows:** Rejecting a request older than N seconds requires knowing what time it is.
-   **Log correlation and ordering:** Two hosts that disagree produce a timeline that never happened.

And the check itself is circular. You can’t do X.509 notBefore/notAfter validation without knowing the current time. Effectively you’d have to disable cert time validation, or implement one of the suggested work-arounds.

There are two common workarounds. Both are bad. You can skip validation until the clock is set, which leaves a device unprotected exactly when it is most exposed. Or you can build in-slack: A certificate issued at 12:00:00 is rejected by a client whose clock reads 11:59:30, so issuers backdate notBefore by a few minutes and validators quietly widen the window at their end. Both sides are guessing at how wrong the other one is.

That was survivable when a certificate lasted 398 days. [CA/Browser Forum ballot SC-081v3](https://cabforum.org/2025/04/11/ballot-sc081v3-introduce-schedule-of-reducing-validity-and-data-reuse-periods/) changed that. The cap on newly issued publicly trusted TLS certificates dropped to 200 days in March 2026, falls to 100 days in March 2027, and reaches 47 days in March 2029 — with domain validation reuse dropping to 10 days at the same point.

At 47 days, manual certificate management stops being viable at any scale. Renewal moves to roughly monthly, and it happens unattended — usually over ACME. An automated renewal loop on a host with a skewed clock does not raise a ticket. It reissues, or it fails, on a schedule nobody is watching.

## How NTS Works

NTS works in phases, and separating them is what makes it deployable.  

**Phase 1 – Key Establishment (NTS-KE):** TLS 1.3 over TCP/4460, negotiated with ALPN ntske/1. The client and server agree on an AEAD algorithm, then derive two directional session keys (C2S and S2C) straight from the TLS session using the RFC 5705 exporter. The server issues eight cookies, tells the client which NTP server to actually use via a server negotiation record, and closes the connection. This happens once, not per packet.

We negotiate three AEADs: AES-SIV-CMAC-256 (ID 15), which RFC 8915 makes mandatory to implement and is what an unknown client is most likely to ask for; AES-SIV-CMAC-512 (17); and AES-128-GCM-SIV (30). Client preference wins.  

**Phase 2 – Authenticated NTP:** Standard NTPv4 over UDP/123 to the advertised server, with NTS extension fields. A request carries a unique identifier, a cookie, and an authenticator; the authenticator covers everything before it, but encrypts nothing. The server opens the cookie to recover the session keys, verifies that authenticator, and replies with the unique identifier echoed back plus an authenticator of its own – and that one does carry a payload: the fresh cookies, encrypted inside it.

A forged packet fails verification and is dropped. We do not send an NTS NAK, so a failure is indistinguishable from packet loss and cannot be used to push a client into a fresh key exchange. A replayed response carries the wrong unique identifier and matches no outstanding request. Because the replacement cookies ride inside the response authenticator rather than in the clear, an observer sees a different opaque blob every exchange and cannot follow a client between networks. Spending each cookie once is the client’s side of that bargain – the server is stateless and does not track them.

## Cookies Without State

A cookie is a server state handed to the client for safekeeping. It holds the session keys, sealed with AES-SIV so only the server can open it. The obvious implementation is a key ring replicated to every server, which turns time service into a distributed state problem.

We do not replicate keys. Each server derives the sealing key from a shared master secret and the current day:

key = HKDF-SHA256(master, salt = BE32(day), info = “fbnts-cookie-seal-v1”)

Since the Unix epoch, day is measured as whole 24-hour periods,  not a calendar day. So there is no timezone and no DST, and every host computes the same integer for the same instant. That integer is the cookie’s key ID and travels in the clear. A server that has been handed a cookie it has never seen or sealed by a host it has never talked to, re-derives the key and opens it. We accept two days back and one forward to cover skew around a rotation boundary.

The result is no key ring, no replication, no session table, no shared state to fall out of sync, and nothing for an attacker to exhaust. It is also what makes the split above work – the KE server and the NTP servers it hands you off to are different machines in different places, and they never exchange anything. Adding a server is adding a server.

The plain NTP path is untouched. The responder parses extension fields only when they are present, so unauthenticated clients hit the same code as before at the same cost.

## Using NTS

One line of chrony config:

pool nts.meta.com nts iburst maxsources 5

nts.meta.com terminates key exchange only. During the handshake it advertises an NTP responder in a server negotiation record, so the client is steered to time.meta.com and sends its authenticated NTP there. The host you configure is not the host you end up talking to.

That indirection is why we use pool rather than server. A single server line gives you one association and one responder, which is a single point of failure – and NTP is a protocol that wants several sources so it can outvote a bad one. pool asks for maxsources independent associations. Each runs its own key exchange over its own TLS session, so each ends up with a distinct pair of session keys:

$ chronyc authdata

Name/IP address

Mode

KeyID

Type

KLen

Last

Atmp

NAK

Cook

CLen

time1.meta.com

NTS

5

30

128

27

0

0

8

68

time2.meta.com

NTS

7

30

128

142

0

0

8

68

time3.meta.com

NTS

10

30

128

548

0

0

8

68

time4.meta.com

NTS

1

30

128

1177

0

0

8

68

time5.meta.com

NTS

2

30

128

1177

0

0

8

68

Five rows, five independent authenticated sources, from one line of config and one KE endpoint.

Reading across: Type 30 is the negotiated AEAD, AES-128-GCM-SIV, with KLen 128 bits of session key — chrony lists it first and client preference wins. CLen 68 is the cookie: 36 bytes of envelope around the two 16-byte keys inside. Cook 8 is cookies in hand and NAK 0 means none has been rejected.

The more interesting half is not in the table. Each row’s session keys came out of its own TLS handshake and work only for that association. The key that seals them into a cookie is the shared one – the epoch day number from the derivation above, identical on every responder we run, stamped inside each cookie and never visible to the client. That split is what lets a single key exchange hand a client five different responders that have never spoken to each other.

When a pool member completes key exchange and moves to its negotiated responder, the freed KE address is handed to the next unresolved member, repeating until maxsources responders have answered. Five sources come up in about 20 minutes as each member completes its own key exchange in turn.

## NTS Protects Against Attacks

Unlike NTP, NTS stops a man-in-the-middle (MITM) attack from forging the answer. A classic MITM attack doesn’t need to break any cryptography, it just has to answer a client before a real server does. If an attacker rolls the **clock backward** they can make expired certificates validate again or revoked tokens work again. Any control that relies on something having expired is reset. If they roll the **clock forward** everything expires at once. This is the more difficult direction to address because beyond a certain point the failure stops being recoverable.

Let’s look at an example of what happens to a device that gets convinced it is the year 2037. NTP counts seconds in a 32-bit field that wraps in February 2036, and a client stranded on the far side of that boundary computes its correction into the wrong era – so the mechanism that exists to fix a wrong clock now moves it further away. Meanwhile every certificate the device holds is long expired, so TLS fails, therefore it cannot reach anything that might help, including its own update service. The patch that would fix it cannot be delivered, because delivering it needs the clock that is broken.

The device is not damaged. Every component works exactly as designed. It is simply holding a number that puts it outside the reach of the network. And no amount of waiting or rebooting fixes it. Recovery means a factory reset, or a trip to a service center. Multiply that by a fleet and the cost of a wrong integer becomes a logistics problem.

**Now, consider a clock forward attack on a host that issues credentials.** Short-lived credentials are considered safe because they expire quickly, which means short lifetime is doing the job revocation would otherwise do. That property is entirely a function of the issuing host’s clock. An issuer convinced it is next year signs credentials that outlive the window you designed for.

## What NTS Does Not Fix

**Delay attacks.** RFC 8915 is explicit. An attacker who holds your packets shifts your clock by up to half the delay introduced, and no cryptography in the protocol detects it, because every byte is genuine. Authentication tells you who wrote a packet, not how long it spent in flight. Mitigations are the usual ones – multiple independent sources, sanity limits, bounded steps.

So the claim is narrow: An on-path attacker can still delay your packets and can still drop them. What they can no longer do is lie about the contents.

**Bootstrapping.** NTS-KE runs over TLS and TLS wants a working clock, which is the same circular problem as above. A device with a dead RTC still has to get roughly correct before its first handshake.

**Wrong servers.** NTS authenticates the path, not the answer. A server that is correctly configured, correctly authenticated, and simply wrong will hand you the wrong time with a perfect signature on it. Quorum, sanity checks, and monitoring are still required.

**Monotonicity.** Authenticated time is still wall-clock time, and wall clocks move backward — at a leap second, or whenever a correction lands. [Cloudflare’s authoritative DNS hit this at the end of 2016](https://blog.cloudflare.com/how-and-why-the-leap-second-affected-cloudflare-dns/): a resolver round-trip measured across the leap second came out negative, propagated into upstream selection, and panicked Go’s rand.Int63n(). Nothing was forged and nothing was misdelivered. If your code measures elapsed time, use a monotonic clock.

## Adoption

RFC 8915, Network Time Security for the Network Time Protocol, was published on the IETF Standards Track as a Proposed Standard in September 2020. Cloudflare had launched time.cloudflare.com with NTS 15 months earlier, in June 2019, against the then-current draft, and showed it works at scale.

Server-side, the public NTS list today runs to a few dozen entries, mostly national metrology institutes and internet infrastructure operators such as PTB, Netnod, and time.nl. We are adding one more.

The bigger gap is on the client. NTS support exists where you would expect it in the server world – chrony and ntpsec implement it. It is absent entirely from the stock time client on the platforms that account for most of the endpoints on the internet. 

Android’s platform time sync is plain SNTP over UDP/123 – a fixed 48-byte packet with no extension-field handling, alongside NITZ and GNSS – so there is no NTS path in it. Apple devices sync through timed against time.apple.com, where we are not aware of any NTS support either.

Those two stacks set the clock on billions of phones, watches and headsets, and every one of them is trusting an unauthenticated UDP packet. A device vendor can ship a separate NTS-capable client today — chrony runs perfectly well on Android – but that is a workaround for something the platform should do itself.

The protocol is finished, the servers are appearing, the client implementations exist. 

What is missing is mobile.

## Join Us in Enabling NTS

nts.meta.com is live and free. The code is in [github.com/facebook/time](https://github.com/facebook/time).

If you run a public time service, turn NTS on. If you maintain an NTP client, implement RFC 8915. If you own the time stack in a mobile OS, this is the gap – Android and iOS are where most of the world’s clocks get set, and both of them are still doing it over an unauthenticated packet.

We have spent years making time more precise. Precision without authenticity only gets you a very accurate number from an unknown source. Now it can be both.

## Acknowledgements

_We’d like to thank Sofia Scalzo, Pablo Mazzini, Vadim Fedorenko, Patrick Cullen, and Yixin Wei for their support on this project._