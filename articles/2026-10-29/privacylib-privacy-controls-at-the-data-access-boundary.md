---
title: "PrivacyLib: Privacy Controls at the Data Access Boundary"
source: "https://engineering.fb.com/2026/10/27/security/privacylib/"
publishedDate: "2026-10-27"
category: "engineering"
feedName: "Meta Engineering"
---

-   This latest deep dive into Meta’s [Privacy Aware Infrastructure (PAI)](https://about.fb.com/news/2024/01/investing-in-privacy/) takes a look at PrivacyLib. 
-   A privacy requirement must hold as data moves through Meta’s diverse data and processing systems. Historically, supporting a new requirement meant implementing the same enforcement logic separately in each system. PrivacyLib replaces this with a common library that runs inside the clients of Meta’s data and processing systems.
-   A system integrates with PrivacyLib once, and new privacy capabilities plug in as modules that reuse that integration. PrivacyLib performs billions of checks every second, and changes are simulated and rolled out per module. 
-   For internal AI agents, whose data access paths may not be known in advance, tool calls on supported paths carry agent context to PrivacyLib. The propagated context links each access to its session, so modules can observe data use and block operations that are not allowed.

At Meta, many privacy requirements ultimately come down to the same question: Can we prove that a piece of data goes only where it is allowed? At Meta’s scale, rather than relying solely on manual privacy audits, which can go out of sync as systems change, we have developed [Privacy Aware Infrastructure (PAI)](https://about.fb.com/news/2024/01/investing-in-privacy/) to answer this question within the infrastructure itself. PAI offers efficient and reliable first-class privacy constructs embedded in Meta’s infrastructure so that products can keep evolving quickly.

In previous posts, we have covered how [data understanding](https://engineering.fb.com/2025/04/28/security/how-meta-understands-data-at-scale/), [data lineage](https://engineering.fb.com/2025/01/22/security/how-meta-discovers-data-flows-via-lineage-at-scale/), and [Policy Zones](https://engineering.fb.com/2025/07/23/security/policy-zones-meta-purpose-limitation-batch-processing-systems/) (our information flow control technology) play a role in PAI. Now, we are diving deep into **PrivacyLib**, a common library that runs inside the clients of hundreds of our data and processing systems at the point of data access.

PrivacyLib plays an important role in the final stage of the broader PAI workflow: continuously enforcing and monitoring data flows.

![](https://engineering.fb.com/wp-content/uploads/2026/10/PrivacyLib-Figure-1.png)

This blog post focuses on PrivacyLib’s role in the final stage of the PAI workflow.

Before PrivacyLib, we integrated privacy enforcement separately into the clients of each data and processing system for each requirement. With this approach, implementing a new requirement across systems could take months. Each new requirement, whether purpose limitation or data flow discovery, needed the same set of capabilities: covering a wide range of systems; deploying in weeks rather than months; running on every data access without becoming a latency problem; and rolling out enforcement changes without taking the fleet down. Over time, this approach became harder to scale as requirements and systems evolved.

PrivacyLib separates system integration from requirement implementation. We integrate each system once. When a requirement can be met at the point of data access, we implement it as a PrivacyLib module shared across the systems already integrated, so a new requirement no longer needs a separate implementation in each system. 

There are two kinds of modules: 

-   Enforcing modules can block a data access. For example, [Policy Zones](https://engineering.fb.com/2025/07/23/security/policy-zones-meta-purpose-limitation-batch-processing-systems/) enforces [purpose limitation](https://engineering.fb.com/2024/08/27/security/privacy-aware-infrastructure-purpose-limitation-meta/).
-   Observing modules only record a data access. For example, [Privacy Probes](https://engineering.fb.com/2025/01/22/security/how-meta-discovers-data-flows-via-lineage-at-scale/) collects the runtime signals used to discover data flows. 

As internal AI agents became a new way of accessing data, we also added the Agent Observability module to observe agent-related data access events and help safeguard the data that agents can reach. Systems already integrated with PrivacyLib picked it up without new integration work, which is what integrating once buys: each new privacy capability arrives as a module, not as a project.

![](https://engineering.fb.com/wp-content/uploads/2026/10/PrivacyLib-Figure-2.png)

PrivacyLib replaces repeated implementations across systems.

## Engineering Challenges and Approaches of PrivacyLib at Meta’s Scale

PrivacyLib operates across a broad range of data access paths at Meta:

-   More than a hundred libraries used to access data services, from key/value stores to AI features.
-   Thousands of production services with versions of the deployed library.
-   Millions of assets being accessed daily.
-   Billions of checks every second.

Operating at this scale creates three engineering challenges:

**Challenge**

**Approach**

**Coverage:** Systems can have multiple client libraries and legacy integrations, accept direct network calls, and offer direct database access to backing stores. All of them need to be handled to ensure requirements hold no matter the access path.

We integrate at two levels: typed client libraries, where PrivacyLib has full request context, and lower network boundaries on remaining RPC paths to get full coverage. Each integrated system maps its native APIs to PrivacyLib’s common operations and provides the inputs required by its configured modules. Once those pieces are in place, the same module can be enabled in multiple systems without a separate system-specific integration.

**Scale:** At billions of checks per second, even a small per-check computational cost becomes consequential across the fleet. Every service in the hot path pays that cost.

We compile requirements at build time into their simplest evaluable form and answer most checks from caches inside the process, so the common path avoids a network call.

**Reliability:** Privacy logic runs in the hot path of critical systems, owned by teams that release on their own schedules. A change has to be testable in isolation and reversible on its own, because a fleet-wide rollback cannot be the recovery path.

Enforcement is deployed as part of the service that owns it, so a change reaches production through that service’s own pipeline instead of a fleet-wide config push.

##   
Walkthrough: Protecting Messaging Metadata

To illustrate how everything comes together at Meta’s scale, let’s walk through a privacy requirement that needs to be upheld when processing messaging metadata.

Users exchange messages through apps like Messenger, [which supports end-to-end encryption](https://engineering.fb.com/2023/12/06/security/building-end-to-end-security-for-messenger/). As Messenger routes and delivers those messages, subject to applicable law, its backend systems process non-content messaging data (i.e., messaging metadata), such as information about when messages are sent or delivered, to improve product performance, detect abuse, and protect users from harmful conduct. 

A variety of these backend services use Logger, a client library that runs in the service process, to write this metadata to data warehouse tables. Before writing a record, the PrivacyLib integration inside Logger invokes Policy Zones, an enforcing module, to check whether the metadata may flow to the destination table. This check is broken down into two parts: what inputs need to be available to make a decision, and how the check is actually evaluated at runtime. After examining these two parts, we look at how PrivacyLib scales across systems and how changes roll out without disrupting the services in the path.

![](https://engineering.fb.com/wp-content/uploads/2026/10/PrivacyLib-Figure-3.png)

PrivacyLib runs inside Logger’s client in the messaging backend service. It combines the request context with the generated destination metadata, invokes the modules configured for the write, and returns the enforcement decision to Logger.

### Annotating Messaging Metadata

Every Logger destination table has a LoggerConfig that describes the records written to it. MetadataTraceLoggerConfig defines one such configuration for message-delivery traces and marks it as containing messaging metadata:

```
final class MetadataTraceLoggerConfig extends LoggerConfigBase {
  use MessagingTrafficMetadataPolicyTrait;
  public function configure(
    LoggerFieldDefiner $fd,
  ): LoggerFieldDefiner {
    $this->annotateWithTableLevelPolicy();
    // Field and destination definitions
  }
}
```

A logging destination can have many writers, so the annotation describing its output data belongs to the destination rather than to each service that writes to it. If every service declared the annotation separately, the declarations could disagree, or a new writer could omit it entirely. Declaring it once in LoggerConfig gives every writer the same description of the data.

For this destination, MessagingTrafficMetadataPolicyTrait supplies the MESSAGING\_TRAFFIC\_METADATA table-level annotation, and annotateWithTableLevelPolicy() attaches it to the destination.

LoggerConfig is Logger’s own schema, and each system describes its data in its own format. To give PrivacyLib a single form to consume, Logger’s code-generation pipeline translates the configuration into a PrivacyLib-compatible artifact. The generated MetadataTraceLoggerConfigPrivacyLibArtifact is derived from MetadataTraceLoggerConfig and carries the destination identity and the messaging annotation:

```
/**
 * @codegen-source MetadataTraceLoggerConfig
 */
class MetadataTraceLoggerConfigPrivacyLibArtifact
  extends LoggerInputPrivacyLibArtifact {
  
  final public static function getAssetIDImpl(
  ): LoggerInputAssetID {
    return LoggerInputAssetID::get(
      'MetadataTraceLoggerConfig',
    );
  }

  protected static function getPurposePolicyVars(
  ): TPurposePolicyVars {
    return PurposePolicy::makeVars(
      TPurposePolicyName::MESSAGING_TRAFFIC_METADATA,
    );
  }

  // Other generated fields omitted.
}
```

The generated class above is used by Logger’s client in [Hack](https://engineering.fb.com/2014/03/20/developer-tools/hack-a-new-programming-language-for-hhvm/), Meta’s typed PHP language. For its C++ and Python clients, Logger publishes destination identities and annotations to a central catalog. PrivacyLib uses that information to generate language-specific artifacts. In the C++ example in the next section, PrivacyLib uses the LoggerConfig name to load the C++ artifact for the destination.  

### Running the Check

The artifact from the previous section describes one Logger destination. PrivacyLib also needs to know what a Logger write means and which modules should run. Logger’s Hack integration defines that once for all destinations:

```
$config->libraryConfig()->enablePrivacyLib(
  PrivacyLibOperation::write()
    ->input(
      PrivacyLibInput::instance(
        nameof ILoggerInputPrivacyLibPayloadProvider,
      ),
    )
    ->enforcements(
      PrivacyLibWriteEnforcement::zones(
        ZoneDataType::LOGGER,
      )
        ->withPropagation()
        ->enabled(),
      PrivacyLibWriteEnforcement::telemetryLogging()->enabled(),
      // Other modules
    ),
);
```

PrivacyLibOperation::write() declares PrivacyLib’s write operation for Logger, and enforcements() lists the modules that run on it. The Policy Zones module can affect the result, while the Telemetry Logging module records the evaluation without affecting it. Adding a module here requires no changes to individual destinations or Logger call sites. ZoneDataType::LOGGER tells Policy Zones that it is checking a Logger destination.

In C++ services, Logger constructs the PrivacyLib request as follows: 

```
const auto assetList =
      std::vector<std::string>{configName};

PrivacyLibBuilder builder(
      "LOGGER_WRITE_CLIENT",
      assetList,
      LoggerWriteAPIEnumHelper::apiToHashedString(
          PolicyEnforcedLoggerWriteAPI::log),
      Caller::LOGGER,
      getLoggerWriteImplementation());

auto result =
      PrivacyLibRequest(std::move(builder)).dispatch();
```

PrivacyLib uses configName to load the destination’s artifact. The hashed PolicyEnforcedLoggerWriteAPI::log value maps Logger’s API to PrivacyLib’s write operation. The remaining builder arguments identify Logger as the caller and provide the implementation that performs the write. dispatch() invokes the configured modules and records their outcomes. For the Policy Zones module, PrivacyLib provides the destination annotations from the generated artifact and the current processing context. For this example, Policy Zones evaluates two conditions:

1.  The current context represents an allowed use of messaging metadata.
2.  The destination artifact carries the MESSAGING\_TRAFFIC\_METADATA annotation.

When enforcement is enabled, the Policy Zones module denies the write if either condition fails. PrivacyLib combines the results from enforcing modules into one response. A denial stops the write before Logger sends the record downstream. Observing modules emit telemetry without affecting the response.

![](https://engineering.fb.com/wp-content/uploads/2026/10/PrivacyLib-Figure-4.png)

A closer look at module evaluation on a Logger write.

## Scaling Privacy Checks Across Systems

PrivacyLib enables privacy checks to scale across heterogeneous systems through a common execution model, lightweight evaluation and telemetry, and coverage for requests that bypass integrated clients. 

### A Common Execution Model Across Systems

PrivacyLib’s integrations span systems with very different APIs: key-value stores, graph databases, ML pipelines, filesystems, and logging systems like Logger. Each integration maps its access points to one of five common operations, and PrivacyLib invokes its modules at each:

1.  **Read:** runs when fetching data.
2.  **Write:** runs when storing data.
3.  **RPC:** runs when calling another service.
4.  **Request entry:** runs once when a service begins handling a request.
5.  **Inline execution:** wraps a specific computation inside a larger request, such as evaluating a feature. Data accesses made during that computation are evaluated using its inline privacy context.

Modules are written against these five operations rather than against each system’s native API. Reads, writes, and RPCs also have post-operation variants, so observing modules can run after the access decision has been made. Once a system provides the mapping, every compatible module can reuse it, which is why enabling an additional module on an already-integrated system takes only days.

PrivacyLib runs inside the clients of data and processing systems because the clients already have the destination identity and request context that modules need. Keeping the evaluation in the same process avoids carrying those inputs across process boundaries on every access. This design also has two advantages:

1.  _Richer context_: PrivacyLib can use the caller’s identity, endpoint, and purpose while that information is still available. This information is frequently lost if the check is evaluated on the datastore.
2.  _Failure isolation_: A faulty change is contained to the service running that version of the code, keeping the shared datastore outside the failure boundary.

### Keeping Checks Computationally Inexpensive

In-process evaluation must also be computationally efficient because it runs on every data access. Per-request caches eliminate repeated checks within a request and per-host caches retain frequently used configuration and results. This avoids the remote configuration fetch required by an earlier design (that fetch alone was thousands of times slower than the in-process path). The result is that PrivacyLib performs billions of checks per second across the fleet with low per-check latency, while consuming only a small fraction of Meta’s total compute capacity.

At PrivacyLib’s scale, telemetry must also remain lightweight. PrivacyLib records each module’s status, samples latency, and logs errors, giving us fleet-wide visibility into how enforcement is behaving in production. Recording every invocation in full detail would overwhelm the systems receiving those events, so the goal is to deduplicate repeated events while keeping rare ones visible. 

Two mechanisms work together to achieve this: Bloom filters on each host downsample high-volume patterns at a fixed rate, and fine-grained sampling rates adjust as traffic changes.

### Covering Direct RPC Paths

Not every caller accesses data through a PrivacyLib-integrated client library; some issue raw RPCs. The RPC layer can still check those requests, but it sees far less context than the client does. PrivacyLib bridges that gap with a cryptographically-signed token: When a client-side check succeeds, PrivacyLib attaches the token to the request, and [ServiceRouter](https://atscaleconference.com/servicerouter-hyperscale-service-mesh-at-meta/) validates it at a lower boundary for supported RPC traffic, confirming that the request already passed the richer client-side check.

When a request arrives at the RPC layer without a token, ServiceRouter falls back to a coarser check based only on the context visible in the network payload. Because that context is limited, the lower layer applies the strictest interpretation, choosing false positives over gaps. Between them, the two layers cover access through Meta-managed clients and supported RPC paths. Paths outside those boundaries are not covered by this mechanism and need their own PrivacyLib integration.

Together, the result is that evaluation stays local and computationally inexpensive wherever possible, with a coarser backstop where local evaluation is unavailable, and modules have one place to run across systems that otherwise share nothing. What remains is the harder operational question: how to change enforcement behavior without breaking live traffic or making incorrect access decisions.

## Rolling Out Enforcement Changes Safely

Privacy requirements change over time. Updates to a destination’s annotation or an enforcing module can change whether a write is allowed. PrivacyLib has a safe rollout path for both types of changes.

### Changing an Annotation

Adding or removing an annotation changes two lines in a LoggerConfig: the declaration that imports MessagingTrafficMetadataPolicyTrait and the call to annotateWithTableLevelPolicy(). Because the destination may have many writers, that two-line edit can begin blocking writes from many services at once.

Review is therefore built around showing the author and reviewers what the edit will actually do. During code review, Logger’s code-generation pipeline updates the destination’s PrivacyLib artifact. Simulations then replay observed data flows against both the new artifact and the existing one, and any flow whose result changes is reported. The source edit, the generated artifact, and the simulation results are reviewed together, so the decision rests on evidence of the change’s effect rather than only on reading the code change. If the simulation reports an unexpected change, reviewers hold the artifact before release.  
  
Once approved, the artifact reaches services through their usual build and deployment pipeline. That gives two forms of visibility before the change is deployed, from the decision changes reported by the simulation and the generated code showing exactly what will be deployed, plus one form of control, since each service’s own deployment decides when the change reaches production. It also bounds the surface area: An issue found after deployment is limited to the services running that build.

The downside is that changes do not reach the entire fleet at once, making change propagation slower than a global configuration update. In practice, requirement owners use explicit tracking to update the services in scope by the required deadline, while a service that needs the update sooner can use its emergency deployment process.

![](https://engineering.fb.com/wp-content/uploads/2026/10/PrivacyLib-Figure-5.png)

Simulation reveals decision changes before release, while independent service deployments control timing to limit production impact.

### Rolling Out a Module

An annotation change applies to one Logger destination. A module added to Logger’s write path runs for every Logger destination. We therefore deploy the module before enabling it across all traffic.

As an example, here is how Policy Zones was introduced on this path. We first set the Policy Zones module to rollingOut() in Logger’s PrivacyLib write-operation configuration:

```
PrivacyLibWriteEnforcement::zones(ZoneDataType::LOGGER)
    ->rollingOut()
```

The rollout key, logger.input.write.zones, identified this combination of Logger input, write operation and the Policy Zones module. rollingOut() placed the module execution behind a runtime control. We then moved that control from 0 to 100% in stages while monitoring denials, errors, and latency. If valid writes began to fail, we could lower the percentage without rebuilding or redeploying the service. The Telemetry Logging module continues to run because it is configured independently. 

Once the Policy Zones module was stable across Logger traffic, we changed the configuration from rollingOut() to enabled(). At this point, the Logger integration ran the module without consulting the rollout percentage.

![](https://engineering.fb.com/wp-content/uploads/2026/10/PrivacyLib-Figure-6.png)

After deployment, engineers use runtime signals to increase, reduce, or stop a module rollout without rebuilding or redeploying.

Safeguards apply at different stages across the two change paths described above. If a simulation shows unexpected flow changes, we hold the annotation artifact before release. If a module misbehaves after the rollout begins, we lower its rollout percentage using the runtime control.

These safety mechanisms changed what it takes to meet a privacy requirement at Meta. PrivacyLib now runs inside the clients of hundreds of data and processing systems and evaluates billions of checks every second, while consuming a small fraction of Meta’s compute. Requirements built on top of it, such as purpose limitation through [Policy Zones](https://engineering.fb.com/2025/07/23/security/policy-zones-meta-purpose-limitation-batch-processing-systems/) and data flow discovery through [Privacy Probes](https://engineering.fb.com/2025/01/22/security/how-meta-discovers-data-flows-via-lineage-at-scale/), reuse those integrations instead of rebuilding them, so enabling a module on systems that are already covered takes days rather than the months bespoke integrations used to take. When a change does go wrong, the failure stays inside the service running the deployed change. We can now use that foundation for a newer class of workload: AI agents.

## PrivacyLib Controls for AI Agents

AI agents are harder to reason about than traditional services because their behavior is dynamic and the data they access is determined at runtime. Therefore, we have to design for agent safety up front by enforcing controls, such as Policy Zones, not only on what we expected the agents to access when we built them but also on what they attempt to access at runtime. Where enabled, these controls can block a disallowed access before any data is returned.

Agents invoke tools to carry out tasks. A single tool call may cross several services in a nested manner before reaching data. To tackle this new challenge, we built AgentLib, a common runtime based on PrivacyLib’s design principles, for observing and governing tool calls made by internal agents. On supported paths, AgentLib associates each tool call with its agent session, and downstream clients and services propagate that context until the call reaches a system integrated with PrivacyLib. At that data access boundary, PrivacyLib combines the context, the requested operation, and the destination’s annotations, then passes them to individual modules to make a final decision.

Within PrivacyLib, the Agent Observability module records the agent session and tool-call identifiers alongside the destination, client API, integration point, and any errors. Engineers can query these events by session to investigate the services and destinations involved in a tool call. When we introduced the Agent Observability module, PrivacyLib’s existing broad coverage enabled us to instrument systems already integrated with the library instead of manually integrating the module into hundreds of systems. Even with AI-assisted development, this would have been a daunting task. 

To enforce certain policies, we used the existing Policy Zones module without modification because it relies on the same inputs for enforcement. On paths where this control is enabled, it considers the destination annotations and agent context before allowing an operation. When Policy Zones blocks an operation, PrivacyLib propagates that result back through the call chain to the agent environment. Policy Zones applies this check even when the agent chooses a tool that its developer did not anticipate. The access decision does not depend on the agent behaving as intended.

![](https://engineering.fb.com/wp-content/uploads/2026/10/PrivacyLib-Figure-7.png)

AgentLib associates supported tool calls made by internal agents with agent context, which services propagate to PrivacyLib at the data access boundary. PrivacyLib uses that context for observation and enforcement.

## Lessons Learned From Building and Operating PrivacyLib

Building and operating PrivacyLib across Meta’s systems taught us a few important lessons.

**Design for evolving systems and requirements:** Before PrivacyLib, we added privacy controls to the individual call sites needed to satisfy each new requirement. Over time, Meta built new data and processing systems, services gained new ways to process data, and privacy requirements expanded. Each change created more integration work, and new access paths sometimes appeared faster than we could cover them. The lesson was to integrate at a stable data access boundary, define the small set of operations that systems share, and keep annotations with the data. Modules can reuse the same integrations and reduce engineering effort over time.

**Reliability earns adoption:** Early on, an invalid config crashed processes across the fleet, breaking our own safe rollout principles. Other incidents came from annotation changes that compiled successfully but changed access decisions and caused product failures. These incidents showed that service owners will trust PrivacyLib in a critical data access path only when they can see how changes affect their traffic before release and recover from a problematic change without a fleet-wide rollback. 

**Coverage includes deployment:** When new requirements need changes to modules or supported policies and annotations, older services need to deploy versions with the updated PrivacyLib capabilities. We have ensured that explicit inventory, tracking, and rollout mechanisms are in place to coordinate these deployments, so that requirement owners can meet deadlines safely by updating only the services in scope.

## Looking Forward

These lessons shape where we are taking PrivacyLib next, as AI pushes data access into environments and call paths that are increasingly novel. We continue to enrich PrivacyLib’s capabilities in two areas:

1.  **AI training:** Data used for training reaches our systems from a variety of environments. Much of it is produced or transformed in various places. We are extending PrivacyLib-style approaches to this domain so the same guarantees scale with it. For more on how Meta approaches AI training data, see [AI at Meta: Transparency About Our Training Data](https://transparency.meta.com/features/ai-at-meta-training-data/).
2.  **Internal AI agents:** Observing attempted data accesses and blocking disallowed ones is just the starting point rather than a finished picture for agents used internally at Meta for engineering and productivity. The harder problems come next: evaluating internal agent behavior while it is happening, and reasoning about communication between these agents, where a single data access may be several agents removed from the person who asked for it.

## Acknowledgements

_The authors would like to acknowledge the contributions of many current and former Meta employees who have played a crucial role in developing PrivacyLib over the years. In particular, we would like to extend special thanks to (in alphabetical order) Adwait Sathe, Andrew Vaslas, Darrien Glasser, Diana Marsala, Hanzhi Zhang, Kousik Nandy, Matthew Hillman, Matthieu Martin, Michael Dietz, Nathan Maue, Ramy Wassef, Sen Luo, Spencer Baumgardner, Vince Yang, and Zhong Hu. We would also like to express our gratitude to all reviewers of this post, including (in alphabetical order) Aleksandar Ilic, Alex Kagan, Alex Ponomarenko, Arash Nikkar, Avtar Brar, Chloe Lu, Chris Wiltz, Emil Vazquez, Emily Van Deuren, Rituraj Kirti, Sushaant Mujoo, and Wenlong Dong. We would like to especially thank Jonathan Bergeron for overseeing the effort and providing all of the guidance and valuable feedback, and Chloe Lu for pulling required support together to make this blog post happen._