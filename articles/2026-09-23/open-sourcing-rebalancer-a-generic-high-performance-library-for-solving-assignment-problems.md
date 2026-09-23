---
title: "Open-Sourcing Rebalancer: A Generic, High-Performance Library for Solving Assignment Problems"
source: "https://engineering.fb.com/2026/09/21/open-source/rebalancer-generic-high-performance-library-assignment-problems/"
publishedDate: "2026-09-21"
category: "engineering"
feedName: "Meta Engineering"
---

-   We’re open-sourcing **Rebalancer**, the assignment-problem solver that has been used to solve resource allocation problems throughout Meta for over nine years.
-   Rebalancer separates several related concerns: how to specify an assignment problem, how to store it efficiently in memory, how to solve it, and how to debug it. This separation of concerns is crucial to Rebalancer’s usability, scalability, and extensibility.
-   For a more detailed technical exposition, see the accompanying paper, “[Optimizing Resource Allocation in Hyperscale Datacenters: Scalability, Usability, and Experiences](https://www.usenix.org/conference/osdi24/presentation/kumar),” published at OSDI’24.

Given a _set of objects_ and a _set of bins,_ how do we assign objects to bins in a way that optimizes specific _objectives_ while meeting certain _constraints_? 

This question arises at all layers of Meta’s infrastructure stack including in

-   **Hardware placement:** racks (objects) need to be positioned in datacenters (bins) to optimize the spread of racks across electrical fault domains while honoring power and cooling limitations.
-   **Service placement:** servers (objects) need to be assigned to services (bins) in order to meet each service’s demand while optimizing for goals such as fault tolerance (spread a service’s allocated servers across failure domains) and packing efficiency. 
-   **Task placement:** tasks (objects) need to be allocated to servers (bins) while honoring server resource limits and optimizing for goals such as fault tolerance and co-location requirements.
-   **Traffic routing:** Route traffic (objects) from billions of users to geographically distributed datacenters (bins) while optimizing network latency and datacenter load.

The main challenges to designing a reusable framework for solving problems like these are its **usability** and **scalability**. Usability is impeded by practitioners struggling to translate real-life policies into the precise mathematical formulas required by formal optimization methods, while scalability is hampered by NP-hard problems that cannot be solved efficiently by commercial solvers.

Rebalancer addresses both of these challenges by separating a problem’s specification from its solution. Rebalancer provides a language for describing problems using objects, bins, constraints, and objectives, as in the examples above. Once a problem is described in this way, Rebalancer transforms the problem into a directed-acyclic graph called an expression graph. Rebalancer’s solving algorithm uses the expression graph to either design a local search heuristic or to build a mixed integer program (MIP) solvable with either a commercial ([FICO Xpress](https://www.fico.com/en/latest-thinking/solution-sheet/fico-xpress-solver) or [Gurobi](https://www.gurobi.com/product)) or open source solver ([HiGHS](https://highs.dev/)).

![](https://engineering.fb.com/wp-content/uploads/2026/09/Rebalancer-Meta-Image-1.png)

## Specifying Assignment Problems

Rebalancer’s specification language employs a three-step approach to incrementally elevate the level of abstraction for ease of use. 

-   First, it introduces essential modeling constructs, such as _dimensions_ (the real-world attributes of objects and bins), _partitions_ (groupings of objects), _scopes_ (groupings of bins), and _utilization_ (contribution of objects assigned to a bin).
-   Next, Rebalancer provides an API to expose commonly used expressions for transformations on these constructs, as well as recursively on other expressions. For example, the utilization of several bins can be aggregated using a SUM/MAX operation, or transformed using a SQUARE operation.
-   Finally, leveraging these expressions, Rebalancer exposes a high-level _spec_ API implementing dozens of common objectives and constraints. One can think of each spec as a predefined recipe which accepts some modeling constructs and additional parameters as input, and creates a mathematical formula using the expression API.

![](https://engineering.fb.com/wp-content/uploads/2026/09/Rebalancer-Meta-Image-2.png)

An example of modeling constructs and specs for a task placement problem.

In the example above, tasks are modeled as _objects_ and servers are modeled as _bins_ into which tasks are to be placed. Servers are physically situated in racks; this grouping is modeled as a _scope_. Tasks take a certain amount of CPU and storage and servers have a limited amount of each. CPU and storage are modeled as _dimensions_. The CPU and storage _utilization_ of a server corresponds to the sum of all of the tasks assigned to that server and the server’s utilization limits are modeled using a _CapacitySpec_. The expression API could be used to change how the _utilization_ is calculated if a simple sum isn’t appropriate.

Further, we model tasks as belonging to jobs. A grouping of objects like this is called a _partition_ and we use a _GroupCountSpec_ to ensure that each rack has only a single job type (partition) assigned to it. A _BalanceSpec_ ensures that each server’s utilization is balanced across both its CPU and storage dimensions.

This example demonstrates how complex assignment problems can be easily and naturally constructed using Rebalancer and how specs provide a way of expressing constraints and goals that can be re-used in many different ways by varying dimensions, scopes, or partitions.

Please check out an [exhaustive list of Rebalancer specs in the docs](https://facebook.github.io/rebalancer).

Once a problem is specified using the API described above, Rebalancer translates it into an expression graph. The leaf nodes in this graph represent utilization expressions; for example, the memory utilization of server A, as obtained by summing the memory contribution of tasks assigned to server A. These utilization values are then recursively composed using aggregation nodes such as Max and Sum, or transformation nodes such as Square and Abs. Note that the value of each node in the expression graph depends on the current assignment and needs to be updated every time the assignment changes.

Along with the problem objectives and constraints, modelers also provide Rebalancer with an initial assignment and a stopping condition, such as a time limit. Rebalancer will compute an optimized assignment that minimizes the objective value and does not violate any new constraints. The constraints that were violated by the initial assignment become high priority goals and their violation is minimized, ideally to zero. 

Rebalancer offers two distinct techniques to solve the assignment problem.

**Optimal Solver.** In this mode, Rebalancer translates the expression graph into a set of expressions that can be fed into MIP solvers such as [FICO Xpress](https://www.fico.com/en/latest-thinking/solution-sheet/fico-xpress-solver), [Gurobi](https://www.gurobi.com/product), or [HiGHS](https://highs.dev/). During this translation, Rebalancer needs to represent utilization of a bin by a weighted sum of binary decision variables (one per object) that indicate if the object is assigned to the bin; this can lead to very large MIP models! Rebalancer automatically uses techniques such as variable aggregation (compacting similar objects into a single integer variable), interchangeability, and symmetry breaking to reduce model sizes, but the worst case size of the generated MIP model can still be quadratic, i.e. O(|objects| \* |bins|). The largest problems we consider are too big for any MIP solver.

**Local Search Solver** overcomes this limitation by working directly on the expression graph, exploring the local neighborhood around the current assignment by moving some objects to another bin. This neighborhood has a worst-case size of O(|objects|+|bins|), which allows Rebalancer to model even very large problems without hitting memory limitations. Each _move_ creates a new candidate assignment for which Rebalancer _evaluates_ the new values of the objectives and constraints. After all candidates have been evaluated, Rebalancer _applies_ the best candidate assignment; that is, the one that does not violate a constraint and improves the objective by the maximum amount. This process of evaluating and applying moves is repeated until no progress can be made or a stopping condition is reached. Rebalancer’s local search algorithm is heavily optimized and parallelized so that each evaluation is relatively inexpensive (millions of evaluations per second are possible), allowing us to quickly explore the search space. In addition, Rebalancer knows how to prune the search space, cutting down the number of evaluations needed in the first place.

The right solution technique will depend on your needs. At Meta, almost all large-scale problems use local search. Small- to mid-size problems that have moderate solve time requirements often use the optimal solver. It is also common to prototype with the optimal solver and then migrate to local search after a high-quality baseline solution has been identified. Offline, the optimal solver can be used to tune local search.

## Rebalancer at Meta

For the last decade, Rebalancer has been continuously used and improved at Meta. It is used to solve a wide range of infrastructure optimization problems including assigning shards to servers ([Shard Manager](https://engineering.fb.com/2020/08/24/production-engineering/scaling-services-with-shard-manager/)), servers to services ([RAS](https://research.facebook.com/publications/ras-continuously-optimized-region-wide-datacenter-resource-allocation/)), routing traffic from globally distributed edge datacenters to main datacenters ([Taiji](https://research.facebook.com/publications/taiji-managing-global-user-traffic-for-large-scale-internet-services-at-the-edge/)), grouping serverless functions to improve locality, balancing online ML training workloads across regions while considering the priority of ML workloads, and so on. At the time of this writing, Rebalancer is used to solve roughly 40 million assignment problems every day with more than 30 unique problem formulations. The P99 solve time is 12 seconds on a problem with 265k objects and 3.2k bins. For problems with more than 1 million objects and 5k bins, the average solve time is 171 seconds and there are more than 3.4k such runs.

Unsurprisingly, Rebalancer has also been used to solve non-infrastructure problems such as assigning meetings to meeting rooms to minimize travel time, assigning support tickets to engineers, and optimizing desk placements. Beyond Meta, assignment problems arise in many domains such as healthcare, energy and utilities, transportation and logistics, education, and emergency response, and, while we don’t have the expertise to apply Rebalancer to these areas ourselves, we hope that others do and will.

## Debugging

With Rebalancer making it easy to formulate and solve problems, we found that the majority of engineering time for modelers shifted to debugging the solver’s behavior. Without proper tools, such debugging required a deep understanding of the solver’s internals.  
Over time we identified common questions and pain points among modelers and built a specialized UI tool for answering them: [Rebalancer Explorer](https://facebook.github.io/rebalancer/docs/explorer/).

[https://facebook.github.io/rebalancer/videos/rebalancer-explorer-demo.mp4](https://facebook.github.io/rebalancer/videos/rebalancer-explorer-demo.mp4)

Explorer accompanies Rebalancer in this open-source release as a Dockerized web UI that facilitates rapid debugging and iteration when solving problems with both local search and optimal solvers. It helps answer questions such as which constraints are binding, what would happen if a constraint were relaxed, and why an object was placed in one bin and not another.

## The Future of Rebalancer

We are always looking to optimize Rebalancer’s performance, add new capabilities, and extend it to support a wider range of assignment problems. Rebalancer is proud to be open-source (Apache 2.0 license) and we invite both systems and optimization experts to try Rebalancer and contribute to the project by identifying performance bottlenecks, adding new solve techniques, extending it to support new sorts of problems, or just by fixing bugs. We look forward to seeing how the systems and optimization communities adopt, build, and contribute to Rebalancer. 

-   **Code:** [Rebalancer GitHub repo](https://github.com/facebook/rebalancer)
-   **Docs:** [Introducing to Rebalancer](http://facebook.github.io/rebalancer)
-   **PyPI:** [Rebalancer Python package](https://pypi.org/project/rebalancer/) 
-   **Paper:** [_Optimizing Resource Allocation in Hyperscale Datacenters: Scalability, Usability, and Experiences_](https://www.usenix.org/system/files/osdi24-kumar.pdf) — OSDI 2024

### Acknowledgements

_Rebalancer was developed by past and present members of the Algorithmic Optimization team at Meta: Pol Mauri Ruiz, Igor Kabiljo, Neeraj Kumar, Vijay Menon, Mayank Pundir, Andrew Newell, Liyuan Wang, Richard Barnes, Sahil Deshpande, Karthik Velakur, Yang Liu, Leart Gjoni, Ravi Surulikamu, Tony Zhang, Raj Rajendran, Aravind Narayanan, Lakshmi Ganesh, and Saranyan Vigraham._