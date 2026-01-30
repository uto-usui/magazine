---
title: "Log Drains"
source: "https://vercel.com/blog/log-drains"
publishedDate: "2020-01-31"
category: "frontend"
feedName: "Vercel"
author: "Naoyuki Kanezawa"
---

1 min read

Jan 31, 2020

Collect logs in your favorite logging provider with first-party and custom integrations.

Inspecting logs for the [Build Step](https://vercel.com/docs/build-step), [Runtime](https://vercel.com/docs/serverless-functions/introduction), and [Edge Network](https://vercel.com/docs/edge-network/overview) traffic of a deployment can be crucial to pinpointing aspects of its behavior and understanding better where improvements can be made.

Today, we are thrilled to announce support for Log Drains: collect all of your logs using a service that specializes in storing app logs.

## [Link to heading](#introducing-log-drains)Introducing Log Drains

Log Drains make it easy to collect logs from your deployments and forward them to archival, search, and alerting services by sending them via `HTTPS`, `HTTP`, `TLS`, and `TCP` once a new log line is created.

At the time of writing, we currently support 3 types of Log Drains:

-   JSON
    
-   NDJSON
    
-   Syslog
    

Along with Log Drains, we are introducing two new logging integrations: **LogDNA** and **Datadog**.

![The LogDNA and Datadog integrations available in the ZEIT Integrations marketplace.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F2Fc71VXKHuESsUlLhXNhLN%2F8206c9904cf2bd8c86403e0d3c20d3b8%2Fimage.png&w=1920&q=75)

The LogDNA and Datadog integrations available in the ZEIT Integrations marketplace.

## [Link to heading](#getting-started)Getting started

1.  Install the desired integration from the [Integrations Marketplace](https://vercel.com/integrations).
    
2.  Follow the configuration steps provided and choose a project to connect with the service.
    
3.  Watch your logs appear on the selected service.
    

![The LogDNA and Datadog application interfaces.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5zyFOJyDkhTQaj50lGeQgF%2F4f581276724ad7c292e7ba4fbdb972b5%2Fimage-03.png&w=1920&q=75)

The LogDNA and Datadog application interfaces.

## [Link to heading](#benefits-of-log-drains)Benefits of Log Drains

-   Persisted storage of logs.
    
-   Large volume of log storage available.
    
-   Ability to create alerts based on logging patterns.
    
-   Generating metrics and graphs from logs data.
    

## [Link to heading](#conclusion)Conclusion

With Log Drains, you can easily collect and forward your deployment logs to a third-party logging provider, such as our fantastic launch partners [LogDNA](https://vercel.com/integrations/logdna), [Logflare](https://vercel.com/integrations/logflare), and [Datadog.](https://vercel.com/integrations/datadog)

Ready to develop an integration? Check out our documentation and [create an integration with Vercel today](https://vercel.com/docs/integrations).

All of our work is heavily driven by feedback from our users. For feature requests, or to suggest ideas to make our platform and your experience better, please reach out to us [via email](mailto:support@vercel.com) or on [Twitter](https://twitter.com/vercel).