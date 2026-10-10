---
title: "Timestamp attributes are now supported in Vercel Flags"
source: "https://vercel.com/changelog/timestamp-attributes-are-now-supported-in-vercel-flags"
publishedDate: "2026-10-07"
category: "frontend"
feedName: "Vercel"
author: "Vincent Derks"
---

[Vercel Flags](https://vercel.com/docs/flags) now supports timestamp attributes, so you can target [entities](https://vercel.com/docs/flags/vercel-flags/dashboard/entities) by date and time.

Use timestamp attributes to show a campaign page only between two dates, run a Black Friday promotion, or target users who registered before a cutoff.

### [Copy link to heading](#configure-a-timestamp-attribute)Configure a timestamp attribute

You can configure timestamp attributes in the dashboard or via the CLI.

In the Vercel dashboard, open [**Flags**](https://vercel.com/d?personalTo=&title=Go+to+feature+flags&to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fflags), select **Entities**, and create or select an entity. Add an attribute and set its data type to **timestamp**.

Or define the attribute with the CLI:

```
# On a new entityvercel flags entities create system --label System \  --attribute time:timestamp# On an existing entityvercel flags entities update system --add-attribute time:timestamp
```

Define a timestamp attribute with the Vercel CLI.

Whether you configure the attribute in the dashboard or CLI, your application must provide its value when evaluating a flag. The entity and attribute names must match your configuration, and the value must be a Unix epoch timestamp in milliseconds.

This Flags SDK example passes the current time as `system.time`. `Date.now()` returns the required value in milliseconds. Keeping it inside `dedupe()` ensures that every flag evaluated during the same request uses the same time:

```
import { dedupe, flag } from 'flags/next';import { vercelAdapter } from '@flags-sdk/vercel';type Entities = {  system: {    time: number;  };};const identify = dedupe(async (): Promise<Entities> => ({  system: {    time: Date.now(),  },}));export const promotion = flag<boolean, Entities>({  key: 'promotion',  adapter: vercelAdapter(),  identify,});
```

Pass the current time as a timestamp attribute when evaluating a flag.

### [Copy link to heading](#add-a-targeting-rule)Add a targeting rule

In the dashboard, open the flag and add a targeting rule using the timestamp attribute. The rule compares the value from your application with a date and time you choose.

Rules support **is after**, **is at or after**, **is before**, and **is at or before**. The date and time picker uses your local timezone.

![A rule that serves the On variant between two dates.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F3BfPMtKp4BNvI6cHHFDb60%2F23948f9b25aaf4edb2210baee7062bcf%2Ftimestamp_rules_-_light.png&w=1920&q=95)![A rule that serves the On variant between two dates.](https://vercel.com/vc-ap-vercel-marketing/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fcontentful%2Fimage%2Fe5382hct74si%2F4AIyKzPLdenyrzxDJhvrdu%2Fe6258c67bf1cb88265ef911cb9ff1032%2Ftimestamp_rule_-_dark.png&w=1920&q=95)

A rule that serves the On variant between two dates.

To add a time-based targeting rule with the CLI, use `after`, `at-or-after`, `before`, or `at-or-before`:

```
vercel flags rules add promotion --environment production \  --condition system.time:at-or-after:2026-09-02T13:00:00Z \  --condition system.time:before:2026-09-16T22:00:00Z \  --variant on
```

Add a date range to a flag with the Vercel CLI.

Learn how to [provide entities in code](https://vercel.com/docs/flags/vercel-flags/dashboard/entities#how-to-provide-entities-in-code) and [release a flag at a specific time](https://vercel.com/docs/flags/vercel-flags/dashboard/entities#release-at-a-certain-time), or read the [Flags documentation](https://vercel.com/docs/flags).