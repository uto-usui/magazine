---
title: "September synthetic test agent updates: Chrome, Firefox and Lighthouse"
source: "https://www.speedcurve.com/blog/august-synthetic-test-agent-updates-chrome-firefox-and-lighthouse"
publishedDate: "2026-09-01"
category: "performance"
feedName: "SpeedCurve Blog"
---

![](https://images.speedcurve.com/team/andy_davies.png?w=152&h=152&fit=crop&auto=format,compress)

Andy Davies - Sep 2, 2026

![Logos for Chrome, Firefox and Lighthouse](https://blog-img.speedcurve.com/img/536/logos.gif?auto=format,compress&fit=max&w=2000)  
This month, we've updated our synthetic testing agents.

In addition to upgrading the underlying VMs, we've updated browser and Lighthouse versions:

-   Chrome 148 (previously 138)
-   Firefox 153 (previously 135)
-   Lighthouse 13.4.1 (previously 12.8.0)

## What has changed?

We understand the sensitivity related to changes in your performance data.

Synthetic updates can cause baseline changes due to hardware changes, browser optimization or in the case of Lighthouse, changes to the methodology.

Although the browsers introduced many new features between the updates there are only a few that will may have a noticeable impact on test results:

### Chrome

Lazy-loading for video was introduced in Chrome 148 and pages that make use of this attribute will download less videos and their total size will be smaller too.

Chrome 146 fixed an LCP bug which sometimes measures an image that wasn’t yet painted as LCP.

### Firefox

Improvements to Firefox’s HTTP/3 implementation and the introduction of support for Compression Dictionaries which can result in smaller HTML, CSS & JavaScript downloads for sites that support them.

The Scheduler API allows finer grained control of JS execution through features such as scheduler.yield

### Lighthouse

Lighthouse introduced Insights and the data these generate is available for every synthetic test.

### AWS Instance Change

AWS was running out of capacity in some regions so the EC2 instance the synthetic agents use has changed from c5.large to c6a.large.  
  
To retain comparable performance with the previous agent the CPU is throttled in all desktop tests.

The instance size change has had an impact on some metrics, and during extensive testing, we've observed that Total Blocking Time (TBT) improved due to this change.

## Impact on metrics

To provide a baseline when upgrading browsers, Lighthouse, or other components of our agents, we regularly measure the speed of more than 200 sites in both our production and canary environments. 

During this upgrade, we've found that most metrics have remained consistent between the new and existing versions of the agent, but that Total Blocking Time (TBT) has improved significantly.

Across the corpus of sites we're testing, we've observed that Total Blocking Time (TBT) has improved by approximately 12% at the 75th percentile for the Mobile Medium profile. 

Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS) have remained largely unchanged.

## What should you do next?

Our observations on how the upgrade affects metrics are based on the sites in our test corpus, and every site is different.  
  
While Total Blocking Time might be the only expected change, there is always a chance your metrics will change based on the optimizations discussed above.  
  
Over the next few weeks, we recommend reviewing your performance budgets and checking that they are still appropriate for your site and then adjusting them if necessary.  
  
This is a practice we recommend doing on a regular basis as part of a 'get fast, stay fast' methodology, which you can learn more about in our [Web Performance Guide to Performance Budgets](https://www.speedcurve.com/web-performance-guide/complete-guide-performance-budgets/). 

## Private agents

For customers who host their own [private SpeedCurve agents](https://support.speedcurve.com/docs/private-agents): We're planning to release an updated version of the Docker container in the next few weeks.

If you have any questions about the upgrade, its impact on your metrics, or any questions about SpeedCurve in general, you can reach us at support@speedcurve.com.