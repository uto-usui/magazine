---
title: "Postmortem: Service disruption on January 21-22, 2020"
source: "https://www.figma.com/blog/post-mortem-service-disruption-on-january-21-22-2020/"
publishedDate: "2020-01-29"
category: "design"
feedName: "Figma Blog"
---

As much as we love to build and ship new features, the performance and reliability of our platform is always our top priority. We take downtime seriously. We know that if Figma is unavailable, your work is disrupted, and we wanted to detail the service incidents that occurred on Tuesday, January 21, 2020 and Wednesday, January 22, 2020.

As reported on our [status page](https://status.figma.com/) and [Twitter](https://twitter.com/zoink/status/1220153686074122241?s=20), a number of our users experienced intermittent issues or were unable to load Figma between the hours of 6 and 7 AM PST on January 21st, and at multiple points during the day on January 22nd.

These incidents do not live up to your expectations or our standards, and we apologize for the disruption they caused. In this post, we’ll dive into our analysis of the issue, share technical details that illustrate why we’re confident in our diagnosis, and discuss next steps we’re taking to prevent future incidents.

## [Timeline: What happened?](#timeline-what-happened)

**January 21, 2020**

-   \[6:11 AM PST\] Our engineering team receives automated alerts about elevated error rates.
-   \[6:54 AM PST\] We discover a long-running, expensive query that has been causing elevated database CPU. After cancelling this query, performance returns to normal.

**January 22, 2020**

-   \[9:45 AM PST\] Database metrics show an increase in write IOPS and lock contention. However, in contrast to the previous day, database CPU is lower than normal.
-   \[10:00 AM PST\] Our engineering team receives an automated alert and begins to investigate.
-   \[11:42 AM PST\] Database load causes enough API requests to queue up that the service becomes unavailable for some users. To mitigate the database load, we cancel several inessential queries and increase allocated IOPS. Performance temporarily stabilizes.
-   \[2:00 PM PST\] Database performance deteriorates and the site again becomes unavailable.
-   \[3:00 PM PST\] We restart the database to apply settings to temporarily disable a background process which we believe was contributing to the write load. Performance stabilizes.
-   \[7:00 PM PST\] We take the service down for emergency maintenance and upgrade the database to a version we had already tested in our staging environment.
-   \[8:15 PM PST\] We complete the upgrade and bring the site back online. All site and database metrics return to normal.

## [TL;DR: Why did it happen?](#tl-dr-why-did-it-happen)

Tuesday’s incident was primarily caused by a long-running, expensive query. To prevent this issue from recurring, we will be improving our monitoring of expensive queries and setting tighter bounds on allowed running time.

The root cause of Wednesday’s incident was that a routine change in database statistics caused PostgreSQL 9 to mis-plan the execution of one of our queries, causing expensive table scans and writes to temporary buffers. This was exacerbated by concurrent aggressive autovacuuming operations, which were happening because of a vacuuming backlog from the long-running query that had been terminated on Tuesday.

The upgrade to PostgreSQL 11 mitigated both of these causes: improvements to the query planner eliminated the possibility of the bad query plan, and the performance characteristics of autovacuuming have been significantly improved between versions 9 and 11.

For a detailed technical explanation of our investigation, conclusions, and next steps, read on…

## [Root cause analysis: What caused the database performance problems?](#root-cause-analysis-what-caused-the-database)

In the early stages of the incident, our leading theory was that the performance problems were primarily due to automatic vacuuming. Vacuuming is a routine process that helps maintain database health. Normally it runs automatically and with minimal impact on other database tasks, but in this case, the long-running query that had been cancelled on Tuesday produced a backlog of data to be vacuumed. This crossed the threshold for a more aggressive form of automatic vacuuming intended to prevent transaction ID wraparound. This autovacuum mode has a greater impact on locking and writes, especially in the version of PostgreSQL that we were running.

During the incident, we canceled autovacuum statements running on our largest tables and saw database metrics improve temporarily. However, the stability was short-lived. Eventually autovacuuming would resume, as would write IOPS and lock contention. Fully preventing aggressive autovacuuming required changing the `autovacuum_freeze_max_age` database parameter and rebooting, which we eventually did. (This reboot was responsible for a portion of the downtime between 2 PM-3 PM.) While this brought relative stability to the site, write IOPS, write latency, and lock contention were still higher than normal.

The next mitigation we discussed was upgrading the version of PostgreSQL we were using. We had two reasons to consider an upgrade:

-   PostgreSQL 9.6 and later include [an important optimization related to autovacuuming](https://www.postgresql.org/docs/9.6/storage-vm.html).
-   With PostgreSQL 10 and later, Amazon RDS (the managed PostgreSQL service we use) offers more sophisticated performance analysis tools that will help us diagnose issues such as this.

We had previously upgraded our staging database to PostgreSQL 11, tested it for several months without issues, and written a detailed plan for performing the upgrade in production. Therefore we felt confident about performing the upgrade even under less than ideal conditions. Given the risk of ongoing instability, we determined that it was best to do the upgrade in the evening rather than waiting until the weekend. Our preparation paid off: the upgrade was successful, and with site stability returned to normal, we could focus fully on diagnosing the root causes.

Because we continued to see performance issues even after disabling autovacuums, we concluded that while they may have been a contributing factor, they were not the only culprit. We turned our attention to a second factor: an unexpectedly expensive query. During the incident, we had observed that one particular statement with complex subqueries showed up repeatedly as being involved in lock contention. We restored a database snapshot from immediately prior to the database upgrade and examined the query plan for the problematic statement. Several facts about the plan stood out:

-   The plan was much more expensive than expected. In particular, it estimated that it would return over 20 million rows, when in fact the actual result was only 3 rows. This likely meant that either the query planner was operating on bad statistics about the contents of the tables involved in the query, or that we had encountered a bug or deficiency in the query planner.
-   The expensive plan performed full table scans where we expected it to use an index, and wrote a large amount of data to temporary buffers, consistent with high write IOPS and temp bytes metrics we observed during the incident.
-   On the upgraded database, the plan for the same query predicted row counts accurately, used the expected indexes, and did not write to temporary buffers. This gave us some confidence that the stability we saw post-upgrade was not just a fluke and upgrading had been the right call.

The query was a complex one, generated by our ORM layer. (It’s admittedly more complex than it needs to be, and one of our followup tasks will be to review and optimize this and similarly complex queries.) We removed parts of the query that proved non-essential to replicating the issue, reducing it to a query on the `roles` table with nested sub-selects:

SQL

```
1SELECT "roles"."id" 
2FROM "roles" 
3WHERE id IN (
4  SELECT "roles"."id" 
5  FROM "roles" 
6  WHERE roles.id IN (?)
7);
```

With this reduced query, we could quickly investigate hypothesis about the query planner behavior. We restored a database snapshot from several days prior to the incident and observed that the plan for this query on that date had a reasonable estimate (199) for the number of rows:

Markdown

```
1Nested Loop  (cost=17055.00..18144.32 rows=199 width=8) (actual time=0.076..0.090 rows=3 loops=1)
2   ->  HashAggregate  (cost=17054.43..17056.42 rows=199 width=8) (actual time=0.068..0.068 rows=3 loops=1)
3         [...]
4   ->  Index Only Scan using roles_pkey on roles  (cost=0.56..5.45 rows=1 width=8) (actual time=0.005..0.006 rows=1 loops=3)
5         Index Cond: (id = roles_1.id)
```

The fact that the same query had wildly different row estimates at two different times suggested an issue with statistics. Statistics are a form of database metadata the query planner uses to estimate the relative costs of potential query plans. They are updated by the `ANALYZE` command, which, like `VACUUM`, is typically run as an automated background process. Looking at data from `pg_stat_user_tables`, we observed that one of the tables involved in the query had completed an automatic `ANALYZE` command at exactly the same time as the incident began. And indeed, after we manually ran `ANALYZE` on this table on our test database, the query plan went from estimating 199 rows returned to estimating over 20 million:

Markdown

```
1Nested Loop  (cost=16161.53..17255.46 rows=20682690 width=8) (actual time=0.098..0.115 rows=3 loops=1)
2   ->  HashAggregate  (cost=16160.96..16162.96 rows=200 width=8) (actual time=0.081..0.081 rows=3 loops=1)
3         [...]
4   ->  Index Only Scan using roles_pkey on roles  (cost=0.56..5.44 rows=1 width=8) (actual time=0.007..0.007 rows=1 loops=3)
5         Index Cond: (id = roles_1.id)
```

In the original, unreduced query, this bad row estimate had a cascading effect, triggering expensive table scans and writes to temporary buffers. Execution times stretched into multiple minutes.

We now had strong evidence that a change in table statistics had caused the query planner to switch from a good plan to one with catastrophically bad performance. We began to research query planner behavior, and a key turning point in our investigation was the discovery of [this post from the PostgreSQL mailing list](https://www.postgresql.org/message-id/CAL9smLC_ZfUO1YxEWMoiuxhEA_VriRhk5U1BQj7wXJdWLYXWKA%40mail.gmail.com). The symptoms closely matched our own: an inner HashAggregate query crossing a threshold of 200 estimated rows, causing the total estimated number of rows to jump wildly.

Based on the discussion on the mailing list thread, the “deficiency in the query planner” hypothesis now seemed much more likely, and was bolstered by the fact that we were able to replicate a test case in the mailing list post on our test database, but not the upgraded database. Something had evidently been fixed between PostgreSQL 9.5 and 11, but we weren’t sure what. Using the official PostgreSQL Docker images, we bisected PostgreSQL versions. The test case replicated in 9.6.16, but not in 10.0. Reviewing the release notes for 10.0, the following change caught our eye: “Use uniqueness guarantees to optimize certain join types (David Rowley)”. Because the join in our query involved the primary key, we believed the uniqueness guarantee applied to our case. We located [the relevant commit](https://github.com/postgres/postgres/commit/9c7f5229ad68d7e0e4dd149e3f80257893e404d4), and from it learned that the output of `EXPLAIN VERBOSE` would include the text “Inner Unique: true” when this optimization was in use. We confirmed that on the upgraded database, the plan did include this indicator.

A final question we asked was why the query planner’s row estimate had crossed this critical threshold of 200 at all when the actual row count was only 3. By examining several PostgreSQL snapshots over time, we discovered that PostgreSQL had increasingly underestimated the selectivity of the innermost subquery. [As this article explains](https://www.postgresql.org/message-id/50DF5920.1090109%40synedra.com), this can happen because `ANALYZE` uses a statistical sample of rows, which may underestimate the number of unique values of a column if the same values for that column tend to be clustered together.

At this point, we felt confident we had located the root cause: a routine change in database statistics triggered a deficiency in the PostgreSQL 9 query planner’s row estimates, causing catastrophically expensive table scans and writes to temporary buffers. This was exacerbated by concurrent aggressive autovacuuming, which was triggered due to a vacuuming backlog from a long running query that had been terminated the previous day.

We’re also confident this issue will not recur. The upgrade to PostgreSQL 11 mitigated both of these causes: the query planner is able to take advantage of the uniqueness of the inner relation to avoid the problematic query plan, and the performance characteristics of autovacuuming have been significantly improved.

## [Next steps](#next-steps)

We learned a lot from these incidents and are already working on a number of follow up actions to improve our resilience to future incidents. These include:

-   Revisiting transaction timeouts and limits so that long running and expensive queries are terminated.
-   Improving metrics, monitoring, and database settings related to autovacuuming, locking, and query performance.
-   Auditing our queries for unnecessary or excessive joins and subqueries that could trip up the query planner.
-   Integrating the new performance tools available in the upgraded version of PostgreSQL into our incident response plans; this will help us isolate problematic queries faster if a future event occurs.
-   Auditing the structure and access patterns of various types of data currently stored in PostgreSQL. We may benefit from moving certain types of data into datastores tailored to their access patterns.
-   Improving our in app messaging around unexpected maintenance windows.
-   Moving towards online database upgrades that don’t require future downtime.

In addition to these infrastructure improvements, we’re also revisiting our product priorities and front-loading some project work that was planned for later. To start, we’re kicking off an initiative to ensure you can continue to work on your already open files safely after going offline even if you close your browser before coming back online.

We’ll be sharing more details soon about this upcoming product work. In the meantime, if you have any questions about the service disruption, please don’t hesitate to get in touch at [support@figma.com](mailto:support@figma.com).