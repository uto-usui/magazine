---
title: "TimeSeries Tiered Storage Journey: Kafka/Flink Streams to Native Cassandra Cold Reads"
source: "https://netflixtechblog.com/timeseries-tiered-storage-journey-kafka-flink-streams-to-native-cassandra-cold-reads-e59d597c9d60"
publishedDate: "2026-10-14"
category: "engineering"
feedName: "Netflix Tech Blog"
author: "Netflix Technology Blog"
---

> **Note:** Full content could not be retrieved. [Read the original article](https://netflixtechblog.com/timeseries-tiered-storage-journey-kafka-flink-streams-to-native-cassandra-cold-reads-e59d597c9d60)

By [Oleksii Tkachuk](https://www.linkedin.com/in/oleksii-tkachuk-98b47375/), [Rajiv Shringi](https://www.linkedin.com/in/rajiv-shringi/), [Chris Lohfink](https://www.linkedin.com/in/clohfink/), [Abe Ratnofsky](https://www.linkedin.com/in/abe-ratnofsky/), [Kartik Sathyanarayanan](https://www.linkedin.com/in/kartik894/)

### Introduction

In an earlier [post](https://netflixtechblog.com/introducing-netflix-timeseries-data-abstraction-layer-31552f6326f8), we introduced the TimeSeries Abstraction, our high-throughput, low-latency platform designed to store and query temporal event data at scale. It has since become the operational backbone for Netflix’s largest datasets, which now span multiple petabytes.

However, managing such large datasets in _hot_ storage, [tuned for low-millisecond latency access](https://netflixtechblog.com/dynamically-splitting-wide-partitions-in-cassandra-for-time-series-workloads-0eded064f456), is not cheap. At Netflix, cost-efficiency is a continuous discipline rather than a temporary initiative. This post shares two solutions that significantly reduce storage costs by continuously moving older, less frequently accessed data into cheaper object storage:

-   **Solution 1**: Uses [Apache Kafka](https://kafka.apache.org/) and [Flink](https://flink.apache.org/) to stream data directly to [S3](https://aws.amazon.com/pm/serv-s3/)
-   **Solution 2**: Leverages [Cassandra](https://cassandra.apache.org/_/index.html) backups in S3 and [pluggable Memtables](https://cassandra.apache.org/_/blog/Apache-Cassandra-4.1-Features-Pluggable-Memtable-Implementations.html) to read data directly from S3

We’ll start with the Kafka/Flink-based design, then describe how we evolved to a native Cassandra-based cold tier.

### Challenges

As Netflix’s TimeSeries datasets have expanded, we’ve encountered several compounding challenges:

-   **Growing retention demands**: Users often push for increasing data retention to serve a broader range of use cases, which in turn increases the storage costs.
-   **Escalating costs**: Maintaining massive, dense clusters for infrequently accessed historical data is prohibitively expensive.
-   **Sparse historical access:** Most queries target recent events, but older data must remain readily available for occasional audits and investigations.
-   **Operational strain**: High storage density on hot nodes complicates scaling, deployment, and cluster stability.
-   **Latency requirements**: Even historical data sometimes requires sub-second query performance for internal tooling and analysis.

This creates a clear opportunity: keep the most recent data on fast storage and migrate older, rarely read data to cheaper storage _while preserving a consistent API_. Done well, this can meet user and operational needs while greatly reducing our infrastructure spend.

### TimeSeries Abstraction

Before we dive into the cold storage solutions, here is a quick recap of how TimeSeries partitions its dataset into multiple tables, each covering a window of time we call **Time Slices**.

![](https://cdn-images-1.medium.com/max/1024/1*ZL0rDP0Un-DxepYPmFo4aQ.png)

Time Slices and Immutable Windows

This enables several key optimizations, most notably allowing a table to become immutable once it crosses the write boundary, which lets us safely apply further optimizations. For more details, refer to our previous [post](https://netflixtechblog.com/introducing-netflix-timeseries-data-abstraction-layer-31552f6326f8).

This slice information is critical and is maintained in a dedicated metadata table:

![](https://cdn-images-1.medium.com/max/857/1*awpc-KnTpnKdPMEWPql_wQ.png)

Time Slice Metadata Storage

Creating new Time Slices and maintaining their metadata is a primary responsibility of the TimeSeries control plane. The TimeSeries data plane uses this information to correctly route the read and write traffic to the provisioned tables.

![](https://cdn-images-1.medium.com/max/1024/1*gMEWgeg9XIxbyNf642RUTQ.png)

TimeSeries Data and Control Plane

With that background, let’s look at the different solutions we built for data tiering.

### Solution 1: Streaming with Apache Kafka and Flink

Our first solution followed a familiar streaming pattern using Apache Kafka and Flink, where we streamed data to S3 in realtime while simultaneously persisting it to Cassandra.

![](https://cdn-images-1.medium.com/max/1024/1*GzdLV6xrVy1ZYm-EL06K6A.png)

Streaming with Apache Kafka and Flink

### Getting Data Into S3 Efficiently

To optimize data streaming to S3, the system hash-partitions Time Series IDs into buckets. This partitions the stream and lets dedicated Flink tasks handle each bucket, ultimately batching and reducing the write throughput to S3. Flink workers batch events into [Parquet](https://parquet.apache.org/) files grouped by event time within the hour. These files are great for high-throughput streaming writes, but not for low-latency reads.

Enter the Compaction job.

### Compaction Job to Optimize Reads

The compaction job runs daily and merges small Parquet files into a single, optimized daily Parquet file per namespace.

The job further optimizes the Parquet files in the following ways:

-   **Small Row Groups**: Creates small (4–8 MB) row groups to minimize lookup cost. We can then use the [Parquet Java library](https://github.com/apache/parquet-java/blob/master/parquet-hadoop/src/main/java/org/apache/parquet/hadoop/ParquetFileReader.java) to perform range reads of row groups from S3. This is intentionally well below [Parquet’s recommended row group floor](https://parquet.apache.org/docs/file-format/configurations/) — smaller groups were better because our reads are dominated by point/range lookups rather than full scans.
-   **Event Sorting**: Sorts events within a row group by time, eliminating brute-force scans when querying for a time range.
-   **Bloom Filters**: Caches Bloom filters and file metadata in [EVCache](https://netflix.github.io/EVCache/), allowing the TimeSeries query planner to efficiently skip unnecessary reads from S3.

![](https://cdn-images-1.medium.com/max/1024/1*4A292YQxQuHs765hHcbINw.png)

Compacted and Sorted Parquet File Layout

Once the compaction job completes, all compacted files per partition are recorded in the TimeSeries control plane, and the hot storage slices can now be truncated!

On some of our largest datasets, this job typically takes about 12 hours, prioritizing lower compute costs over execution speed.

![](https://cdn-images-1.medium.com/max/1024/1*QztJu3-j5JkqrggKfC46Gw.png)

Compaction Burndown Per Day

### Streaming Cold Tier Read

Once compacted files are optimized in cold storage, they are ready to be read. The TimeSeries data plane fans out a given query across both the hot and cold tiers and merges their result. The users still use the same query interface:

![](https://cdn-images-1.medium.com/max/1024/1*CbAZhy_MBT7ezI2FnLanPA.png)

TimeSeries Tiered Storage Read Path

The Cold Tier Data Plane uses compaction metadata for aggressive planning and pruning, which dramatically reduces the S3 query fan-out. As a result, retrieving a full day of data requires at most three sequential S3 reads, even in the uncommon case where an ID spans two row groups. This yields a p50 latency of ~150 ms and a p99 latency of ~500 ms per read.

![](https://cdn-images-1.medium.com/max/1024/1*LhVBIsC7rmxXOO8kUbwUgQ.png)

Cold Tier Read Latency in Seconds

At the time of writing, the streaming cold tier implementation was processing up to 1,250 reads per second from cold storage globally:

![](https://cdn-images-1.medium.com/max/1024/1*dLs8v1QhAUtW0Q6-TzylVQ.png)

Cold Tier Read Requests Per Second

### Why not stop here?

The streaming cold tier has delivered real savings, shrinking both Cassandra’s [EBS](https://aws.amazon.com/ebs/) footprint and the Cassandra backup footprint in S3. But the streaming infrastructure itself is expensive and adds moving pieces that widen the team’s on-call scope:

![](https://cdn-images-1.medium.com/max/1024/1*F8yLub9ro7xakoOu31x6zw.png)

Additional Infrastructure and Operational Cost

We wanted to improve this further and asked ourselves:

-   Can we avoid streaming data into the object store and the associated data transfer costs?
-   Can we reduce the compute and operational overhead of new components?

That led to a more radical question: _Can we read directly from existing Cassandra backups in S3?_

### Solution 2: Cassandra Cold Storage for Immutable Data

At Netflix, we back up Cassandra data into S3 at regular intervals for disaster recovery. The idea for tiering is simple:

_Read directly from these S3 backups instead of paying a separate data transfer cost to S3._

Once TimeSeries marks a hot Time Slice as ready for cold storage, we can customize Cassandra to read directly from its backups, allowing us to delete the on-disk data copy. This would also incur minimal changes to the TimeSeries read path!

![](https://cdn-images-1.medium.com/max/964/1*a7eZ2CCwL3frcEQgVofMaA.png)

New TimeSeries Read Path

To make this viable in production, we had to answer a series of “How…?” questions.

### How Can We Read the Backups Efficiently?

We introduced a new compaction strategy in Cassandra, which we call **ReadOnlyCompactionStrategy** (ROCS). Here is how it works:

Once a time slice crosses the user-configured _cold-tier boundary_, TimeSeries stops accepting writes for that time slice making it immutable. This immutability unlocks significant optimization opportunities:

-   [**SSTable**](https://cassandra.apache.org/doc/4.0/cassandra/architecture/storage_engine.html#sstables) **overlap:** Standard strategies (LCS, TWCS) often produce SSTables that overlap in the token space, and so a single partition key may exist across multiple files.
-   **Read fan‑out:** Because a read must touch every SSTable covering the key’s token range, this overlap turns a single point-read into multiple lookups, increasing latency across all tiers.

ROCS re-compacts all SSTables once, aligning them precisely with token ranges:

![](https://cdn-images-1.medium.com/max/1000/1*4BN39NYMLHB0ceptr1cYBw.png)

ROCS SSTable Boundaries

ROCS applies more broadly to all TimeSeries use cases, driving tail latency down on all storage tiers by reducing the SSTable fan-out during read operations:

![](https://cdn-images-1.medium.com/max/925/1*17eFU5KKPlsi0b2Yub3Now.png)

Tail Latency Improvement in Reads after ROCS

Once the immutable Time Slices have been optimized, it is time to trigger backups.

### How Would We Leverage Backups?

Cassandra backs up every node in the cluster, organizing each backup on S3 as a declarative manifest, along with the SSTables backing the keyspace’s tables:

 {bucket}/  
  └── {prefix}/                             ← cluster identity (env\_backup/hash\_app)  
      └── {token}/                          ← node identity (ring token)  
          ├── META\_V2/                      ← manifests, one per snapshot  
          │   ├── {snapshotInstantMs}.json  
          │   ├── {snapshotInstantMs}.json  
          │   └── ...  
          └── SST\_V2/                       ← actual SSTable files  
              └── {backupTimestamp}/        ← snapshot timestamp  
                  └── {keyspace}/  
                      └── {table-with-uuid}/   
                          └── {compression}/  
                              └── {encryption}/  
                                  ├── {component-file}  
                                  └── ...

The **backup manifest** orchestrates the backup, listing the paths to all its SSTables:

manifest.json  
  ├── info  
  │   ├── appName              "cass-cluster"  
  │   ├── region               "us-east-1"  
  │   ├── snapshotInstantMs    1748908800000  
  │   ├── backupPathPrefix     "prod\_backup/1234\_cass/token"  
  └── data\[\]  
      └── \[0\]  
          ├── keyspaceName     "ks"  
          ├── columnfamily     "tbl-a1b2..."  
          └── sstables\[\]  
              └── \[0\]  
                  └── components\[\]  
                      ├── na-1-big-Data.db  
                      ├── na-1-big-Index.db  
                      ├── na-1-big-Filter.db  
                      ├── na-1-big-Statistics.db  
                      ├── na-1-big-Summary.db  
                      ├── na-1-big-CompressionInfo.db

Alongside the large Data.db file, backups include a compact set of index, metadata, and integrity files. This structure allows us to quickly locate, validate, and restore specific partitions or data ranges _without scanning the entire dataset_. Furthermore, since the manifest catalogs every S3 path, we can download most of these components directly to the Cassandra node (excluding the Data.db file) where they occupy negligible space. These local components enable efficient query planning _before any data is read from S3_.

### How Would Cassandra Read From Backups?

Cassandra reads typically pull data from two sources: the [Memtable](https://cassandra.apache.org/doc/4.0/cassandra/architecture/storage_engine.html#memtables), which holds recent unflushed writes, and flushed SSTables on durable storage. As of Cassandra 4.1, we can leverage [pluggable Memtables](https://cassandra.apache.org/_/blog/Apache-Cassandra-4.1-Features-Pluggable-Memtable-Implementations.html) to redirect reads from “cold” tables _directly to the backup storage in S3._

\-- create table for a given Time Slice  
CREATE TABLE data\_20260616\_00\_04 (  
    ...  
    ...,  
    PRIMARY KEY ((time\_series\_id, time\_bucket, event\_bucket), event\_time, event\_id, key)  
) WITH CLUSTERING ORDER BY (event\_time DESC, event\_id DESC, key DESC)  
    ...  
    AND compaction = ...  
    AND compression = ...  
    AND memtable = 'backupmemtable:timestamp=1781953200000' ← Custom memtable  
    ...

The timestamp marks the point at which the backup is guaranteed to cover the full table, and the table is guaranteed to be immutable.

Opening a backup Memtable kicks off a state-machine initialization that pulls the index data from S3 onto the node once:

![](https://cdn-images-1.medium.com/max/1024/1*w4X2VjET64msgpMcqVY42A.png)

State Machine for Cassandra Backup Memtable Initialization

This process ensures all SSTable components are downloaded reliably through several resilience mechanisms:

-   **Retries and backoff:** All S3 operations and file-system cache writes use retries with exponential backoff.
-   **Resource isolation:** Initialization runs on a dedicated thread pool, isolated from normal Cassandra operations.
-   **Partial download protection:** If a downloaded component’s size doesn’t match the manifest, it is deleted and re-downloaded.
-   **DDL change protection:** A _.timestamp_ file marks completed initialization and ties it to the backup timestamp. If the table’s backup timestamp changes, this file is removed and initialization restarts for the new timestamp.
-   **Read protection:** Memtable initialization is asynchronous; reads to an initializing memtable block for at most half the read RPC timeout.

Once initialization has pulled every SSTable component (except Data.db) from S3 onto the local disk, the Memtable is ready to serve reads. Here is what the read process looks like:

![](https://cdn-images-1.medium.com/max/1024/1*Ly-PNbOUhgX8pVo-7J65fA.png)

Reading from Cassandra Backup Memtables

To minimize latency, the system parallelizes S3 reads across requests, SSTables, and individual chunks. A shared cache deduplicates fetches and prefetches data, so chunks are ready before they are needed.

We further optimize cluster and table settings to reduce the number of S3 calls:

-   **Larger compression chunks:** Reduce S3 calls per partition by reading fewer, larger chunks (accepting some over-fetch on small reads).
-   **Read repair disabled:** Avoid expensive, unnecessary repair traffic against immutable, pre‑repaired backup data.
-   **Speculative retries disabled:** Prevent S3’s higher latency from triggering redundant, overlapping reads.

### How Would We Know When It Is Safe To Read From Backups?

However, before the Memtable can point to a backup, we must confirm two things across the whole ring, and we use Cassandra [Virtual Tables](https://cassandra.apache.org/doc/4.1/cassandra/new/virtualtables.html) to do that.

First, that ROCS re-compaction succeeded:

cqlsh> SELECT \* FROM netflix\_views.cluster\_view                                                                                                                                                            
       WHERE keyspace\_name = 'system\_views' AND table\_name = 'sstable\_tasks';  
  
keyspace\_name | table\_name    | host     | value                                                                                                                                                          
\--------------+---------------+----------+------------------------------------------------  
system\_views  | sstable\_tasks | 10.0.0.1 | \[{"table\_name":"<.>","kind":"compaction", ...}\]  
system\_views  | sstable\_tasks | 10.0.0.2 | \[\] <---- no active compactions  
system\_views  | sstable\_tasks | 10.0.0.3 | \[\]

And second, that backups were fully captured (denoted by _uploaded=True_):

cqlsh> SELECT \* FROM netflix\_views.complete\_backups                                                                                                                                                        
       WHERE keyspace\_name = 'my\_ks' AND table\_name = 'my\_table';  
  
keyspace\_name | table\_name | timestamp     | num\_tokens | num\_uploaded | uploaded                                                                                                                         
\--------------+------------+---------------+------------+--------------+----------  
my\_ks         | my\_table   | 1765211400000 |          3 |            3 |     True  
my\_ks         | my\_table   | 1765213200000 |          3 |            2 |    False

### How Would We Automate This Entire Flow?

The TimeSeries control plane automates the entire transition as slices cross the immutable boundary:

![](https://cdn-images-1.medium.com/max/1024/1*0qTn_YDtisgdmtTNQji3lA.png)

Automating Time Slice Lifecycle Transitions

Each slice can be in any lifecycle stage at any time without impacting system availability, and the system remains _resilient to delayed backups or lagging compactions._

### How Would Cassandra Handle The Additional Load?

Serving data from S3 is much more CPU-intensive than reading from local storage. A sudden spike in read requests can overwhelm the Cassandra cluster and affect the hot path, t_urning a cost-saving feature into a reliability risk._

To avoid this, cold reads can optionally run on a _separate Cassandra cluster_ that points its backup Memtables at the _hot_ cluster’s backups:

![](https://cdn-images-1.medium.com/max/984/1*GYe1SzObCPjwgqhPqCSu7w.png)

Isolated Cold Tier Cassandra Topology

The _cold_ Cassandra cluster must match the original cluster in topology _but need not match it in hardware!_ We can run the cold cluster on much smaller, cheaper, storage-light instances.

### Real World Performance

Cassandra Cold Tier was rolled out to the most storage‑intensive TimeSeries Abstraction clusters. It currently stores over _15 PB of compressed data in Cassandra cold storage_ and has allowed us to cut attached storage significantly on all affected clusters:

![](https://cdn-images-1.medium.com/max/1024/1*EkE3iB1TDzz2g235OasVkA.png)

Storage Reduction During Rollout: from 80% disk usage to 7%

At the same time, it serves thousands of reads per second from cold tier storage in any given region:

![](https://cdn-images-1.medium.com/max/1024/1*RkJHMO39yrqHSCLkeidE7A.png)

Cold Tier Read Requests Per Second

Cassandra Cold Tier improves p90 latency by ~30% over the previous cold storage implementation, thanks to more efficient S3 access patterns and smaller read sizes, while keeping p99 latency under ~500 ms. Cassandra already handles bursts of cold reads gracefully via its chunk cache, so this design preserves that same resilience for the S3-backed cold tier:

![](https://cdn-images-1.medium.com/max/1024/1*n16MxzAWIijYOAofXhAepg.png)

Cold Tier Read Latency: blue — p90 latency, brown — p99 latency; latency measured in seconds)

**Acknowledgements**: Special thanks to our stunning colleagues who contributed to the TimeSeries Abstraction’s success and collaborated with us on the cold storage solutions: [Kaidan Fullerton](https://www.linkedin.com/in/kaidanfullerton/), [Matt Lehman](https://www.linkedin.com/in/matt-lehman-39549719b/), [Sumanth Pasupuleti](https://www.linkedin.com/in/sumanth-pasupuleti/), [Carlos Matias Herrero](https://www.linkedin.com/in/carlos-jmh/), [Nick Pavlakis](https://www.linkedin.com/in/npavlakis/), [Bryan Keller](https://www.linkedin.com/in/bryankeller2/), [Francesco Di Chiara](https://www.linkedin.com/in/dichiarafrancesco/)

![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=e59d597c9d60)

* * *

[TimeSeries Tiered Storage Journey: Kafka/Flink Streams to Native Cassandra Cold Reads](https://netflixtechblog.com/timeseries-tiered-storage-journey-kafka-flink-streams-to-native-cassandra-cold-reads-e59d597c9d60) was originally published in [Netflix TechBlog](https://netflixtechblog.com) on Medium, where people are continuing the conversation by highlighting and responding to this story.