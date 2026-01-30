---
title: "From multi-day latency to near real-time insights: Figma’s data pipeline upgrade"
source: "https://www.figma.com/blog/figmas-data-pipeline-upgrade/"
publishedDate: "2025-05-29"
category: "design"
feedName: "Figma Blog"
---

Figma has grown rapidly over the last five years—including the launch of FigJam in 2021, Dev Mode in 2023, Figma Make in 2025, and full localization to serve the [Brazilian](https://www.figma.com/blog/brazilian-portuguese-localization/), Japanese, [Spanish](https://www.figma.com/blog/figma-spanish-localization/), and [Korean](https://www.figma.com/blog/figma-korean-localization/) markets—but that growth comes with challenges. As our user base has expanded, so too has the volume and complexity of the data our platform generates every day.

Last year, we shared the inside story of how our Databases team [horizontally scaled our online relational databases](https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/). But our legacy synchronization system—responsible for transferring data from our online databases to our analytical warehouse, which powers critical business insights, including top-line company KPIs—struggled to keep up.

![Stylized illustration of a data pipeline showing RDS PostgreSQL exporting data to S3 using “SELECT * FROM <TABLE>”, which is then ingested into Snowflake via “COPY INTO”, all set against a textured green background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAAC7UlEQVR4nBXLZ1vaCAAA4PzBa694lFEBAW1AlmCRPkplCIkkEDKYwUOGCQmYASHUQ3gUOKtSB6K2N/7MPfd+f4FU24aebiCnDogHky0rwlmyp3ZCBAlpMyt7cdmPiT6I90UZb5RxQjyISZt5xZNTvJjoApD2B7SzmumYM9wqyuhRVo91zJRgy0sgJXkIwZc5dcNtV5x1JBgr0jLhnbV8dz2vOLKSA0A5Pc4YKnVdvaSpUr8Uy29JxpBrW2rMGt+wMlVbqWZHmY9I3ZYvv6+XNWz1fbNlOhI3SBEEEuVNGNshEruFvSAdcp5EtAz5G1MBh+T2XTr4HQkO0tvVwmaTMH7NGq8qrht2508hrCpfGr1twB2jP+4M7L6p3T1xu7r4VqQfWZ2i0SeI+fuA/yvefoozF8noJWR+rEWXY/l+MrqfjefXyvCyCBiC49XgciP8z3r4X5N/GfJWhbD3Dso9wMoIaZwfsg8x9fYLNUl57+Tj2WzJKT/avZ+Tq8XV9z6g2ZpaQgso/5wqPtt2Hte3mAK8O0vTM/Skktul8dg01h7v0xwV/mPAi+oSKjxD+WdhsJjOh8Abz4UhsAghr3vpF2Ngof/EwMTeGKvcHnIcGeOyh7cR6Sx+VDhKSCNZGb4Q1Rei+qqcP/2f9Z9lrX+uC7zqAy8rvrl5vwKXAgOKeEjK32Dm+pB/jKvdVAmvH7TH/OTmvj9aKKPF5GZ+fi0DASIKQhVbjLdGeXv8yE9+RpprzeNPKokPsfIQ/71HlMvFeLIRpKRU+7whjVvdi5Z02aidYQDC6RJNa6zuiBw79mv2JKvPCtq8YCxxNpp10a1tig3AjGe/6YyeOBDem5MDZSWY64ZQwQ8Q8ltc/hUT36GCBhFX0tIKqWiLqq6g6ijFRCog3nMiAnjQssdYM9wx4bKV6G1gsisleQBKfUf2NbiiyfS0mb4uq+pzZwZ6aKSHxuKZlfrqxlVPtudERTsiWjJdC9G3E30QVz2YuvUfphvBD7e7CukAAAAASUVORK5CYII=)![Stylized illustration of a data pipeline showing RDS PostgreSQL exporting data to S3 using “SELECT * FROM <TABLE>”, which is then ingested into Snowflake via “COPY INTO”, all set against a textured green background.](https://cdn.sanity.io/images/599r6htc/regionalized/bb7caea58da925470e8bac8274c218e689a7758a-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

Note that we’ve simplified here. The data isn’t an exact copy—for instance, we redact PII.

We built our first legacy synchronization process back in 2020, and the architecture was straightforward: A daily cron job executed a simple `SELECT * FROM <TABLE>` query, uploaded the resulting data to S3, and imported that data into Snowflake.

Initially, this worked well. As tables grew larger and more insert-intensive, however, the system's limitations became apparent. By 2023, daily synchronization tasks were taking around six hours to complete, and we had to maintain extra database replicas to support daily exports. Our largest tables experienced sync times of several days or more.

Eventually, it became nearly impossible to synchronize our data within a reasonable timeframe, severely hampering our ability to analyze data and make informed decisions.

We evaluated three solutions:

-   **Keeping our legacy synchronization process:** This quickly became untenable, both because of the sync delays and because maintaining extra database replicas resulted in millions of dollars in unnecessary costs every year.
-   **Adding parallelism as a quick fix:** We considered adding parallelism, which would have allowed the synchronization process to perform operations concurrently, but this proved unscalable.
-   **Overhaul the data synchronization process entirely:** This would take a larger investment over a longer period of time, but it would be the most scalable approach and the most likely to last as Figma continues to grow.

**Incremental synchronization** is a data pipeline technique designed to efficiently keep analytical databases up to date by capturing and applying only recent changes from the source database, rather than repeatedly transferring entire datasets. This significantly reduces data transfer time and resource usage.

Looking at the options, our choice became clear: We shifted our focus toward the long term and started working on incremental synchronization—a solution that promised sustainable, efficient results.

## [Buy vs. build](#buy-vs-build)

To work, incremental synchronization requires support for database table snapshots, change data capture (CDC) streams, and incremental merge. The more we looked at the potential of incremental synchronization, the more we found we’d have to build it ourselves. We considered buying a proprietary end-to-end solution, but no option met our needs in terms of flexibility, cost, and scale.

**Flexibility:** Many generic SQL-compatible tools we found didn’t effectively use vendor-specific capabilities. The APIs for Amazon Relational Database Service (RDS) for PostgreSQL, for example, would have allowed us to produce snapshots directly without the overhead of maintaining a separate database replica, but the generic options didn’t take advantage of this. If we chose a vendor solution, we wouldn’t have the flexibility to optimize our workflow based on the existing technology we have.

**Cost:** Many options would have also cost a significant premium at our scale. When we priced out our options, we projected that proprietary solutions would cost five to ten times more than an in-house solution.

**Scale:** The cost might have been worthwhile if those tools could scale, but we found many weren’t scalable enough for our current and growing needs. We built our legacy synchronization process back in 2020, and Figma is still growing. By building in house, we ensure we’re able to rapidly innovate in response to future needs.

### [Building and combining lower-level components](#building-and-combining-lower-level-components)

By building a bespoke pipeline, we could find and combine lower-level components—either open-source or managed services—that aligned with our exact infrastructure requirements (and our team's expertise).

For snapshots, we use Amazon RDS, which can export to S3 for initial table copies. For CDC, we use Kafka Connect, which offers efficient streaming once integrated with a Snowflake Connector and hosted on Amazon Managed Streaming for Apache Kafka (MSK). For incremental merge, we implemented custom merge logic through Snowflake stored procedures and automated processes via Snowflake tasks.

## [Building a new pipeline architecture](#building-a-new-pipeline-architecture)

With every new project, we outline design principles that guide the work, shaping our goals and decisions. For this project, we defined four principles:

-   **Latency:** Reduce the time to synchronize data end-to-end.
-   **Cost:** Reduce costs and keep them low even as we continue to grow.
-   **Compliance:** Maintain compliance with all relevant data regulatory standards.
-   **Data integrity:** Use workflows that ensure data remains accurate, complete, consistent, and trustworthy throughout the lifecycle.

![Colorful diagram of a change data capture pipeline showing RDS generating WALs and snapshots, feeding into MSK Connect and S3, which populate Snowflake CDC and base tables, merged periodically to form an entity view for user queries.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAADFklEQVR4nBXSaVMaZwAA4P15nSadhLDHCwu7nK6K4OKFhkOthqNGSIgoI8SoMRKLgg3FdAyjxkqDgixtAyy7C15BTbw6Uagx+dDp8xseiBfDPILwCMrBKI8CgZRXGtWVBmVZiVfUsh0NUVHhZRIryxEeiHlYLKCYgMsEOSFIZVBWirzVgrUGwChAoVnJWGlmqFsYow+CesFvLo3aDoKG40ny44Tk0IvudcAlpSyroxl9G0eooAUa9zxQDDuJSLcsYTbMO9w/e/3JyE+llGfjTeRNPM5nn1zut/xbJWsccTIvy1n0C45A1Pk0S7VBfitpGtF2jqnHBhUzFpOvb3LEPr8wNb6ZmoqvbITjmffF2fpVx7cb9dea5jTTmHjkGHq48nBoddHghuZoqcuucDqVczbiV0fb1PDYhOf5ctTL5kcyuehGamln11e7bL251nytN1T/Ms6OBjvtTOdA1kOHoC0pHKfAKwqkaVCa1mZXLZnf7Xuc7Z9z82F1oCwMHFaNF2fK+hV5U1Pv/0kHvBOUZZvqyfQ2z0GleyIGYGkE5RqRk0XF56rh8rzrumb6ct1+fqavHlAfjxTnp/jlZ+n1lbzKaEOOB6amcFdD+LHcDeVgfJVsXZYbczr1cZi6KPZclPvrJ331K9vxUf/eru3stPX0k0rgCa5I7qwSaYt6UUJHsfa3SCMU1/QGLSGfdT5mcuZ9PdszruQLz+6656gymmYi6+9+YTlPZks/Pd0UHNclAqq/O0AOBTkU54AMmjQG3N6Uy5d5an223ut4/aN3YXCUmRln0y9jK8lQbGstORWJdvYP0mZz+7N+bVIHchIsD3BeKoPCzS7fYNxjXw4Z3ZvG7nddw+s2Pzfr20kHNtZiy78tbf/hTbxqeexsct3XhbsVaQrk5XgJx3mAQSmJ4rX2fkxrS+KaAiEpNjWzXaZ9b8eH522loLUQ6KtMtxT80oQNWzKgmxTMkhgvl/I44AEMsaLbBfHdvFhUvHObvfNdCb7F4/cEFSKoYF4pFjSYoEUElYjFfyjC37PiWxwq4gDMSf6v/h9aDNThL5HxOQAAAABJRU5ErkJggg==)![Colorful diagram of a change data capture pipeline showing RDS generating WALs and snapshots, feeding into MSK Connect and S3, which populate Snowflake CDC and base tables, merged periodically to form an entity view for user queries.](https://cdn.sanity.io/images/599r6htc/regionalized/919b90a3dad1052bd6e40ec580d4ca7b7d227b61-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

Ultimately, these principles translated into a reimagined data pipeline that achieves incremental synchronization via two fundamental workflows: a bootstrap workflow and a validation workflow. The bootstrap workflow integrates new tables into the pipeline, and the validation workflow verifies data correctness as data flows into the pipeline. Together, these two workflows ensure data flows efficiently and remains as consistent and correct as possible.

### [Bootstrap workflow](#bootstrap-workflow)

Our onboarding process for integrating new tables into the synchronization pipeline consists of the following automated and clearly defined steps:

1.  The existing CDC service captures the new table from Postgres and publishes events into Kafka’s per-table topics. We automated this step using our existing in-house CDC service and integrated it with the topology of the database system.
2.  We transfer the latest daily database snapshot to S3 using Amazon RDS's snapshot export process (which can be lengthy depending on the size of the table).
3.  Once the snapshot is successfully exported to S3, Snowflake’s `COPY INTO <table>` query imports data from S3 into Snowflake’s dedicated per-entity base tables.
4.  A Snowflake Sink Connector within MSK Connect streams Kafka topic contents into Snowflake’s per-entity CDC tables, ensuring the Kafka start offset precedes the snapshot timestamp.
5.  We schedule a Snowflake task to periodically execute a custom `MERGE` stored procedure that we developed.
6.  When synchronization sufficiently catches up to recent changes, we create a lightweight view on top of the base table for easy user querying, which completes the onboarding.

We implemented a zero-downtime re-bootstrap capability, which is crucial for managing events like schema evolution. To do this, we versioned all bootstrap artifacts except the final user-facing view, which allows parallel bootstrapping without disrupting live operations. Promotion to the new version occurs seamlessly via an atomic view update step.

### [Validation workflow](#validation-workflow)

Despite robust designs, data pipelines inevitably risk data corruption from partial failures, misconfigured components, software bugs, or unexpected source data anomalies. Issues may emerge at various points—from snapshot exports and CDC event captures to incremental merges—and can cause silent data inconsistencies or incorrect analytical outcomes if left unchecked.

Therefore, another critical aspect of the architecture is a robust validation workflow dedicated to verifying data correctness, which operates as follows:

1.  Clone the live base table, which we designate as the source.
2.  Execute the bootstrap workflow, which we explicitly configured to export the base and CDC tables into a temporary schema, labeled as the target. This runs without initiating automated merges.
3.  Align source and target base tables to identical point-in-time positions using the exported CDC data to ensure consistency.
4.  Perform precise, cell-to-cell comparisons between source and target tables.
5.  Generate detailed outputs from these comparisons and integrate the results into our monitoring and alerting systems.

This rigorous, cell-level, and CDC-aware validation provides absolute confidence in data integrity, which substantially enhances reliability before and after service launch.

## [Investing in automation](#investing-in-automation)

Success here wouldn’t be possible without automation. The pipeline we built required extensive orchestration across numerous network calls and dependencies, and we needed both ad hoc and scheduled automation to make it all come together.

Using AWS Step Functions, we organized our automation into two categories:

**First-level automation**: This category includes workflows we can trigger manually and ad hoc. We designed them to execute bootstrap or validation processes by providing only the entity name. Once executed, these workflows require no manual intervention unless monitoring generates an alert. We ensured the alerts are loud enough to prompt immediate operator action—whether it’s a real bug in the pipeline or a false positive in the validation logic—and provide clear action items to prevent recurrence and maintain high operational efficiency and reliability.

**Second-level automation**: This category includes workflows we designed to invoke first-level automations based on specific conditions and schedules. The first level does the heavy work, and the second level automatically checks the current states to see whether we need to trigger a first-level automation. Examples include:

-   A **controller workflow** regularly checks every few hours for new entities available for onboarding or re-bootstrapping.
-   A **validation dispatcher workflow** automatically initiates validation workflows for each table on a weekly basis.
-   An **invalidator workflow** performs weekly re-bootstrap operations on each table to ensure data integrity.
-   A **sanitizer workflow** routinely cleans up potentially orphaned artifacts every week, maintaining a tidy and efficient environment.

![Data pipeline automation workflow showing bootstrap and validation processes with first and second level automation for database table management and quality control.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAIAAAAmMtkJAAAACXBIWXMAAC4jAAAuIwF4pT92AAAC8klEQVR4nAXBa1vSCgAA4P23E6QVMJjculiSogKiQuABOeoQE08ID8yhEkHqNHVs7IYMEIGJu7FBT1/61H/pfQE2sSGE/HLQSy+8T81YVy2mdZs1CNkCoGXdBoYh0Gd+NT9lWDT+szxtCL22pCOz6M4Csu0t7IaA9ppP8777Nefqu6Frq+naAdbe2DEXdDZjwV0g7gKr4IvyS8OlyYiZjVXrFD4L8ovOxvLrm7VFAAvGSe9G3RM9c/uKZkfFZr1wOb/ZHRXIitmt3yHL0atpZMrwddpwMmXIP39WMr/EHLYzt+Nk4SMQCV+vrvAr/oePH25cluRbMOpxbHnscY8t7LFF3oGf7C8CkHHZ/nwFMq5Yjctu8/qcPT7vTvi9O4AvMXwb+e0M/bEtaaa51szS/ZvVgdvPO5c4V6Dr9N+DHsY8R5vn2yZPy/SBgry8OyjMhnq+GAukkW7sYBDe669t86uJRgjuRlO9CMyHt5vhZDcE3wc3uUCMCyQ6/ngrEGPXttufdgexz91UtgGUzytopVgoF3Inuf/zmdTB4e5+NpXOwHtf/oPTiZ39+Fbq381kNJ6MxuGNTTi+tZfYSW8lDw4yOeDiKovTCMGhOJO/wnPVs2y1mqlUD0ulLyiaLBbh4vE+iu4hR3ABSRaQJILA+cJuNgdnDmGAokvCkJJVXlEZUWIeh4wk0ZLEDQSm17vq9bB+nxIEejCodR+Ihx7R6+PtTo1hMeyyAND06XBIjEacplGqSslyXdNIXWNkmRafsKfhhSjWFYWS5dpwSEgiocjE4yPR7mA4XgBY9liW8cmE/fmTHI/J0Ygc67eTMamqpCSdS9K5qpKaVtdGt5J4q8i3uoYrCtnrX+K1PMBxZVGkdJ0fj9mRxioKN9aZyaSpqneSdCOKPySJUVVWUUhBqD09kbrOaDovPJIkeQzgOMpx33i+2mqVGndfG41yu13udM6b/HeWQygqX6dOGfaEZo5qxBFFoc2707tmlaJPr35k/gLvvsBGTreB0AAAAABJRU5ErkJggg==)![Data pipeline automation workflow showing bootstrap and validation processes with first and second level automation for database table management and quality control.](https://cdn.sanity.io/images/599r6htc/regionalized/8b30667a37042b0441da5d6c80b971943415ffef-1056x704.png?w=804&h=536&q=75&fit=max&auto=format)

Automation proved crucial to ensuring service reliability and correctness—both during and after the launch.

We took an aggressive approach to testing: A rigorous automation routine in our staging environment automatically re-bootstraps all tables every week to simulate and proactively uncover potential issues. This paid off when we identified a severe failure mode just one week into testing. This issue would have resulted in a site-wide outage that would have lasted at least twenty minutes had it reached production. By catching this early, we ensured stability during actual production deployments.

Cases like this supported our belief that full automation had to be our north star. Even when some workflows appeared challenging or risky to fully automate, we progressively worked toward full automation while implementing partial automation in the interim. This approach allowed us to make steady improvements in system reliability and reduce operational overhead over time.

Operations have remained seamless and zero major incidents during and after launch.

## [New features for better real-time insights](#new-features-for-better-real-time-insights)

As we transitioned to this new architecture, our improved flexibility and automation capabilities unlocked opportunities to develop new features. Three key enhancements significantly improved our user experience and developer productivity.

### [Configurable freshness](#configurable-freshness)

Based on end-user feedback, we set the default merge frequency to every three hours so that we could balance the baseline freshness of all entities against Snowflake compute costs. Additionally, we introduced configurable overrides for tables that require more frequent updates. For example, our billing pipeline benefited significantly from half-hour overrides, which considerably reduced the overall end-to-end pipeline latency.

### [Sync-on-demand](#sync-on-demand)

We can safely trigger merges at any moment thanks to our merge job queueing system. This renewed safety allowed us to introduce a user-friendly CLI tool that enables manual, immediate data synchronization outside the regular automated schedule. This ensures timely access to fresh online database data in Snowflake whenever necessary.

### [CDC data inspection in Snowflake](#cdc-data-inspection-in-snowflake)

Since CDC data was already imported into Snowflake for internal purposes, we exposed this data to end-users interested in deeper insights that explored the sequence of changes that led to an entity’s state, not just the current state of that entity. During incident response, this feature provides a secure offline environment for debugging unexpected database write activities. For example, developers can perform queries like "retrieve all email insert/update/delete events for users within a specific team over the past week." By also using our sync-on-demand feature, developers can query this data in Snowflake in near real-time. To adhere to data retention policies and prevent indefinite storage growth, CDC data is automatically purged after a predefined period.

## [Results](#results)

This project took a significant investment of time, effort, and resources—but the work has paid off, with results exceeding our expectations.

### [Improved data freshness](#improved-data-freshness)

We dramatically improved data freshness. Previously, data was often 30 hours old or more. Now, data is three hours old or less, and users have the flexibility to configure freshness down to minutes.

### [Scalable performance](#scalable-performance)

This pipeline now reliably handles tables over ten times larger than before, delivering consistent and predictable performance as Figma continues to grow.

### [Developer productivity](#developer-productivity)

New tools always pose the potential for workflow disruption, so we built confidence with our team by interviewing them to identify their needs and integrating the pipeline with systems that our team knew well.

Once the work was complete, we were able to show a significant boost to developer productivity resulting from reducing operational overhead and enabling near real-time access to online data within the analytics warehouse.

Developers can now safely query both current state and change history—fresh within minutes—powering faster incident response, safer rollouts, and deeper insights.

### [Cost efficiency](#cost-efficiency)

Early into implementation, we prioritized support for [horizontally sharded databases](https://www.figma.com/blog/how-figmas-databases-team-lived-to-tell-the-scale/). This support offered a high return on investment since the horizontally sharded databases had fewer tables but utilized more database machines—each with its own batch replica. Now, this pipeline delivers multimillion-dollar annual savings by intelligently optimizing infrastructure and resource utilization, eliminating redundant processing, and scaling seamlessly with business growth.

## [Future opportunities](#future-opportunities)

Our new architecture lays the foundation for several exciting opportunities to enhance and extend the data pipeline even further.

-   **Fully automated onboarding:** Currently, onboarding requires a pull request to add tables to an allowlist, which creates friction in the onboarding process. Integrating our database topology directly into the pipeline would automate table onboarding entirely, streamlining the developer experience and reducing manual overhead.
-   **Point-in-time table support:** We could provide the ability to query table states at any point-in-time position within our defined CDC retention window by using our CDC data. Implementing this feature would significantly improve debugging capabilities, incident response, and analytical flexibility.
-   **Incrementally refreshed downstream models:** Many of our downstream analytical models are still built using traditional batch processes. Our new pipeline would allow us to refresh these incrementally, dramatically improving their efficiency and reducing latency throughout the entire analytical workflow.

This ambitious transformation was made possible by the incredible dedication and effort from current and past members of Figma’s Data Infrastructure team: Amadeo Casas, Alex Tian, Brandon Choi, Carter Bian, David Mah, Dorothy Chen, Ebuka Akubilo, Jimmy Xie, Krish Chainani, Merry Song, Michael Wu, Peng Wang, Raunak Agnihotri, Santosh Muthukrishnan, Xinxin Dai, Zubair Saiyed.

Special recognition and thanks also extend to our supportive partner teams: Asheesh Laroia, Dylan Visher, Gordon Yoon, Gustavo Angulo Mezerhane, Langston Dziko, Ping-Min Lin, Sammy Steele, Sean Rice, Yazad Khambata.

[![Abstract geometric composition with colorful shapes, circles, and squares arranged around a large gray form on a green background.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAABYlAAAWJQFJUiTwAAADDElEQVR4nG2U3VMaZxTGvQVMW5sJTW3SmjZX2pnEDCKShBiLTigqGCEq7LLALq4rIF8LAnGBgF9V22nSJpl+zTTepdPkrpf9234dMFo0Xjzzvu+Z9zzznDPnOT1mYYRjmNpn2IZJsJ3EOgifeZ/NEf5Hz/Hlg9AIVnGUftnJgHiPIWmGYTXADXWG6/EpLkbuYhHsJ4kWYZReYQxL2IG5K35CaF1wcVNcxKWl8Ed0dPUH9uq/8aT2PfFchVvLQfoiY5jfqbdK4wwm/HwV9/KhePt9wv5HAVxzTwn6/iTn/4PDxF/8W/ubN81D9h8/ZTGjcS02gaXz386g6iVaUZnJSnwiTWAKdxOKY/SH4kxMvyR+26DhyvLav8U/6havSk0Oqg0KxSyTq0Guxe7zUcSJLe2jupchZizzWcyNKXxUdo9ZdPCx5mGwtIonV0eWBBpLEr8vNHmh1GjpBVqVEs1ymbyeYz4lMSh7cObnaTzXUXeSXJUnOwrb6nvMESdXSvOM/5LA/2ucpe0ghR2dg9LPFLUqoXSMtJ6kXmzyOPuczNounhWFKV2i+bKMtpfm825Ck+jgUsrN8P4sD148ZOEgQPKnLMbmFkJa486yj9BalFJ2l7z6lszKIUFtnZmCxpNnFdTtdwpDxwrbIyCOMqC5mDYCaDsK+mYSwyiyqqd4lImS1JMYpW6FCdw5kY39PHJd5cqpHnYGd4SByDiBxCK6qlBf1Wis65QbBnprg8pmnUqzQaZaJLAWPeph7iG1H/MstzSuxo9KPjU2l6V7OMRvCfoesOb3kVNkMnqB9VqF8u4myndN7lcUvlTc9IlO7Nk56s+KqNup90tuo1e0Y10a5WvvMJPuEQI+L3IggK5E0Y0yc60qA3oYS9SJOWxnSJtGriXxF2UuR8/OYQc2LGEbF4O3+GLexo2wm3HRx6y2hHdD46ahcikzi0VydFrUdspQws/1+PT5TunGBcFOX+wOVuUb+lem+DTloU+b4oJ8F7N41Py2r9te7hUcpzx+LuHxFjGJ9lPb5OxmOQ//AbnaPvLaxzpaAAAAAElFTkSuQmCC)![Abstract geometric composition with colorful shapes, circles, and squares arranged around a large gray form on a green background.](https://cdn.sanity.io/images/599r6htc/regionalized/e85478d82728490083efe8027723e309ed0cb3fd-2048x1536.png?w=2048&h=1536&q=75&fit=max&auto=format)](https://www.figma.com/careers/)