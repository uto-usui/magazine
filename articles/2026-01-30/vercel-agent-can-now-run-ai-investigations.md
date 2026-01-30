---
title: "Vercel Agent can now run AI investigations"
source: "https://vercel.com/blog/vercel-agent-can-now-run-ai-investigations"
publishedDate: "2025-10-31"
category: "frontend"
feedName: "Vercel"
author: "Malavika Tadeusz"
---

3 min read

Oct 31, 2025

Vercel is reimagining incident response for the agentic age.

At [Ship AI](https://vercel.com/blog/ship-ai-2025-recap), we launched Vercel Agent Investigations in Public Beta, a new skill of Vercel Agent that automatically detects issues in your application, conducts root cause analysis, and provides actionable remediation plans to resolve incidents faster. Vercel Agent already helps teams with AI-powered code reviews. Now, it's expanding to help with incident response.

By combining our newly-released [anomaly alerts](https://vercel.com/docs/alerts) with investigations, we're improving how development teams respond to and resolve production issues.

## [Link to heading](#the-hidden-cost-of-incident-response-for-development-teams)The hidden cost of incident response for development teams

Modern web applications can generate overwhelming amounts of raw logs and metrics. Every deployment, every user interaction, and every API call produces data that could signal the difference between smooth operations and a critical incident.

When a build deployment goes wrong, someone needs to investigate. The modern pace of development means teams are shipping faster than ever, which makes incident investigation increasingly challenging to manage. Hours spent on incident response compound quickly, pulling engineering resources away from feature development and reducing overall team velocity.

### [Link to heading](#the-current-state-of-incident-response)The current state of incident response

Today's development teams face several operational challenges that slow development time and burn out teams. Poorly-tuned tools desensitize teams to critical alerts and allow false positives to slip through. Incidents create hours-long manual investigations and context switching that kill productivity, especially if there's a large knowledge and experience gap between team members. Post-mortems and post-incident runbook updates that can prevent future incidents often become deprioritized to catch up on delayed work.

## [Link to heading](#vercel-agent-investigations-reduce-manual-incident-response)Vercel Agent Investigations reduce manual incident response

Investigations are our solution to reducing the manual work of incident response. Vercel Agent uses broad visibility across build time and runtime to automatically analyze incidents and identify root causes to run investigations natively within your application, without using third party tools.

### [Link to heading](#anomaly-detection-without-configuration)Anomaly detection without configuration

Anomaly alerts continuously monitor your application for unusual activity, such as spikes in billable metrics like function duration or fast data transfer, or increases in `5xx` errors. There's no configuration needed. Any team subscribed to [Observability Plus](https://vercel.com/docs/observability/observability-plus) automatically gets anomaly alerts out-of-the-box.

Once we detect an anomaly, Vercel Agent can step in and either automatically or on-demand, investigate the issue.

![When anomalies occur, Vercel Agent investigates automatically to separate signal from noise, surface what deserves your attention, and suggest next steps. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F5twyhBv04WDyJeQMFWyfxE%2Fd091541c6d385b91a5858fb8bee81770%2FGroup_43.png&w=1920&q=75)![When anomalies occur, Vercel Agent investigates automatically to separate signal from noise, surface what deserves your attention, and suggest next steps. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F65130bkvGHNdaVtzeZ2xrK%2F6ef9621bfda07b3f36c0182d36bb232b%2FGroup_44.png&w=1920&q=75)

When anomalies occur, Vercel Agent investigates automatically to separate signal from noise, surface what deserves your attention, and suggest next steps.

### [Link to heading](#ai-powered-root-cause-analysis)AI-powered root cause analysis

Once we detect an anomaly, Agent performs the same analysis a senior engineer would, processing multiple streams of data and charts to identify issues in seconds, not hours.

The Vercel Agent analyzes issues with multiple inputs:

-   **Correlation analysis:** What other metrics changed around the same time? Did a deployment just complete? Did traffic patterns shift?
    
-   **Historical context**: Has this issue occurred before? What was the resolution last time?
    
-   **Dependency mapping**: Which upstream or downstream services might be affected? Is this a cascading failure?
    
-   **Change attribution**: What code changes or configuration updates preceded the anomaly?
    

Agent generates a succinct summary that provides clear insights into what went wrong and why, eliminating the guesswork from incident response. Accelerating root-cause analysis during this critical time window improves time-to-remediation and reduces downtime for end-users.

### [Link to heading](#impact-assessment-and-actionable-recommendations)Impact assessment and actionable recommendations

Not every alert requires immediate action. Investigations assesses the severity and impact of each issue, helping teams prioritize their response. If an issue has already resolved itself, Investigations identifies this so teams can focus their attention elsewhere. For ongoing issues, Investigations determines whether the problem affects user experience, application stability, or specific subsystems.

Based on its analysis, investigations provide specific, actionable steps tied to the root cause it identified. This eliminates the common problem of generic incident response playbooks that don't account for your specific application architecture or the nature of the failure.

![Vercel Agent investigates a spike in anomalous activity and describes the errors that caused it. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3r6DzV3r9YdX6OiOSgJqt2%2Fe8e6f6faa7c9e6aa932f7c5b2bb2a5fb%2FScreenshot_2025-10-29_at_17.19.15.png&w=1920&q=75)![Vercel Agent investigates a spike in anomalous activity and describes the errors that caused it. ](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2FG1nfeW41VhIkJbQrkG8Wk%2F3eceb09cf3985557c8f97552ae8c1205%2FScreenshot_2025-10-29_at_17.19.03.png&w=1920&q=75)

Vercel Agent investigates a spike in anomalous activity and describes the errors that caused it.

## [Link to heading](#getting-started-with-vercel-agent-investigations)**Getting started with Vercel Agent Investigations**

Visit the [Agent tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fvercel-agent) in the Vercel dashboard to have it run automatically on all error alerts, or choose to run an investigation manually as long as you have Vercel Agent credits.

Agent Investigations are only available to teams that have [Observability Plus](https://vercel.com/docs/observability/observability-plus), as they build upon its premium features. New Agent users can claim a $100 free credit to use towards both Vercel Agent Investigations and Code Reviews.

Anomaly alerts are available out-of-the-box for Observability Plus subscribers. Email alerts are default for team owners and optional for team members. Additionally, we provide a Slack integration and webhooks for any communication, ticketing, or incident response tool.

Learn more about [Alerts](https://vercel.com/docs/alerts) or enable it on the [Observability dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fobservability%2Falerts) today.