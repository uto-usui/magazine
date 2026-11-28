---
title: "September 29 Outage Incident Report: What we learnt"
source: "https://engineering.atspotify.com/2026/11/september-29-outage-incident-report-what-we-learnt/"
publishedDate: "2026-11-27"
category: "engineering"
feedName: "Spotify Engineering"
author: "Spotify Engineering"
---

## Context

On September 29, Spotify experienced an outage that disrupted users’ access to the platform. This outage was triggered by a series of changes to our deployment platforms that resulted in a set of conflicts that ended up impacting our main authentication system. This had a cascading effect across our fleet, leading to a long tail in resolution. We’re committed to learning from each outage on our platform to improve our service, and we’re sharing those learnings here to hold ourselves accountable. 

## What happened?

Our deployment system deploys two main types of workloads; regular [Kubernetes](https://kubernetes.io/) Deployments, and [Argo](https://argo-cd.readthedocs.io/en/stable/) Rollouts. These workload types are similar, but the schema for defining them differs slightly. We deploy these workloads via ArgoCD to one test environment, and to several production environments.

We rolled out two changes to the deployment system that were independently tested, but conflicted when combined. The first change affected how our test environments are configured (e.g. testing runs fewer instances, and omits some automated health checks). The second change affected how we compute the difference between the current state and a desired new state, so that we can perform a deployment.

The conflict was that one rollout changed the type of the deployed workloads (from Kubernetes Deployment to Argo Rollout), and the second changed which configuration parameters are excluded from the automated diff. Because of this, we accidentally included the field that sets the number of replicas - _minReplicas_. The correct behavior is for the Kubernetes’ autoscaler to manage the number of replicas, and the deployment system should leave the field untouched. Instead, the deployment system sets the replicas field to the minimum number of replicas, on every sync.

This only happened under certain conditions: the affected services needed to use Argo Rollouts but also have a testing environment. Among the services affected was one that’s critical to keeping people logged in, and without it Spotify apps couldn’t load content or play music

The re-issuing of tokens after downtime causes significant increases in load, even with best practices like client backoffs. This overwhelmed the remaining instances, causing those to fail. Combined with an erroneous reconciliation loop that lowered the number of instances, the system kept failing instead of scaling up and recovering automatically. The first attempt to manually scale up did not sufficiently account for this increase; at the start of recovery, the login system handled 200 times more traffic than before the incident to serve the backlog of users with missing tokens.

Most regions, what we call the datacentres we use that are distributed across the world, recovered by 16:30 UTC. In one European region, the flood of returning apps then overwhelmed the services behind authentication and, as a result of this,  full recovery took until 19:34 UTC.

![Upstream 5xx rate per cluster](https://images.ctfassets.net/p762jor363g1/3MhnhEoesoL9LYYTMhHy4B/3da560070b84288b5d308e3458f50a74/image1.jpg)

5xx response codes for our authentication system at the perimeter during the incident, per region (includes fast failed requests, can be considered as total request rate towards the service for the portion of the incident it was crash looping).

Some key contributing factors to this particular outage that we learned along the way are; 

-   **Deployment configuration mismatch:** A rule derived from testing was applied to production despite different workload types, allowing Argo CD to repeatedly overwrite autoscaler-managed replica counts.
    
-   **Insufficient capacity safeguards:** Our login service's minimum replica count was too low to protect against downscaling.
    
-   **Automation kicked in at the wrong time:** Our automation reapplied the faulty configuration, which slowed manual recovery. We've since simplified how responders can pause this process during an incident.
    
-   **Ambiguous symptoms:** It was difficult to distinguish crashes causing capacity loss, versus capacity loss causing crashes. A concurrent large deployment added competing hypotheses.
    
-   **Recovery overloaded other services:** Services had scaled down during the outage; returning traffic created a thundering herd requiring more aggressive scaling than initially anticipated.
    
-   **Observability and operational friction:** Overloaded services underreport request traffic if it is dropped early as part of loadshedding.
    

## Timeline (UTC)

-   **13:45** - Errors begin increasing.
    
-   **13:56** - Our central incident management coordination team is paged.
    
-   **13:57** - Our login system “panic mode alert” paged the owning team.
    
-   **14:04** - Responders identify the specific login service that is impacted.
    
-   **14:50** - Infrastructure teams prepare additional Kubernetes cluster capacity for recovery.
    
-   **14:50-16:30** \- Troubleshooting on versions for the specific affected services, attempts to scale up continuously fail. 
    
-   **16:30** - Login is starting to recover; returning traffic puts pressure on other backend services. Deployments remain frozen.
    
-   **16:30** - Regions starting to recover and most come back online, deployments reactivated.
    
-   **17:25** \- Preventing “thundering herd”: login set to 3x the normal CPU/memory resources.
    
-   **17:44** - Fixing failing downstream services as the problem continues to trickle down, issues scaling up some services.
    
-   **18:32 -** Some services still showing peaks but self-correcting over time.
    
-   **19:31** - Suspected bug responsible for the incorrect downscaling.
    
-   **19:34** - The incident is declared “all-clear”.
    

## Changes we’re making 

We’re committed to learning from each incident and are working on the following as priorities:

-   Prevent deployment automation from overwriting autoscaler-managed replica counts, and evaluate stronger safeguards against accidental downscaling.
    
-   Simplify our existing emergency controls for manual overrides, pausing deployment automation, and scaling services.
    
-   Improve guidance and tooling for gradually restoring traffic from the thundering herd and scaling services together with their dependencies.
    
-   Improve workload behavior during overload; improve loadshedding, and ensure reliable usage metrics.