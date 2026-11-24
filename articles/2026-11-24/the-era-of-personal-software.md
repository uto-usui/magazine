---
title: "The era of personal software"
source: "https://jakub.kr/writing/the-era-of-personal-software"
publishedDate: "2026-11-23"
category: "design"
feedName: "Sidebar"
---

Something that keeps coming up over and over again, pretty much since LLMs started getting good at building things, is the idea of _personal_ software.

The idea is that once models get good enough, the effort to create an app that suits your exact needs will be so low that it will eventually replace most traditional software and software will become a commodity.

com·mod·i·ty /kəˈmɒdɪti/

1.  1an article of trade or commerce, especially a product.
2.  2something of use, advantage, or value.
3.  3_Econ._ a good or service whose wide availability typically leads to smaller profit margins and diminishes the importance of factors (such as brand name) other than price.

I don’t believe we’re there yet but there are more and more people building their own personal tools that they use both at work and in their personal lives.

I recently built an app I’d call personal software, one that I use every single day and it even made its way to my homescreen. I thought it would be interesting to document the process from start to finish and write about it.

![My iPhone home screen](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Fhomescreen-2.jpg&w=3840&q=75)

My homescreen with the app I built

## [](#the-idea)The idea

I’ve been spending a lot of time in NYC recently and I’m walking around way more than I used to. I also started tracking my exercise and I wanted to create a place where information from all of my devices would be stored and displayed.

                  |
                  |
                  |
                  |
                  |
               \_\_\_|\_\_\_                               |
               |     |                               |                                 \_\_\_
               |     |                               |                                |\_|\_|
               |     |                              \_|\_                               |\_|\_|
               |     |                              |=|                               |\_|\_|
               |\\   /|                             \_|=|\_                              |   |
              /:\\   /:\\                           \_|:::|\_                |            |\_|\_|
              |:\\   /:|                          \_|:::::|\_               |            |\_|\_|
              |:\\   /:|                          |:|:|:|:|              (^)           |\_|\_|
              |:\\   /:|                          |:|:|:|:|             ((^))          |   |
      \_\_\_\_   /::\\   /::\\                         |:|:|:|:|            (((^)))         |\_|\_|
     |::::|  |:::\\ /:::|                         |:|:|:|:|           <|:|:|:|>        |\_|\_|
     |::::|  |:::\\ /:::|                         |:|:|:|:|            |:|:|:|    \_\_\_  |\_|\_|
     |::::|  |:::\\ /:::|   \_\_\_\_                  |:|:|:|:|            |:|:|:|   |:::| |   |  \_\_\_\_
 \_\_\_\_|::::|  |:::\\ /:::|  |::::|                 |:|:|:|:|     \_\_\_    |:|:|:|   |:::| |\_|\_| |::::|
|::::|::::| /::::\\ /::::\\ |::::|                \_|:|:|:|:|\_   |:::| \_\_|:|:|:|\_\_ |:::| |\_|\_| |::::|
|::::|::::| |::::\\ /::::| |::::|         \_\_\_    |:|:|:|:|:|   |:::| |:|:|:|:|:| |:::| |\_|\_| |::::|
|::::|::::| |::::\\ /::::| |::::|\_\_\_     |:::|  \_|:|:|:|:|:|\_  |:::| |:|:|:|:|:| |:::| |   | |::::|
|::::|::::| |:::::V:::::| |::::|:::|\_\_\_\_|:::| |:::|:|:|:|:::| |:::|\_|:|:|:|:|:|\_|:::| |\_|\_| |::::|
|::::|::::| |:::::::::::| |::::|:::|::::|:::| |:::|:|:|:|:::| |:::||:|:|:|:|:|:||:::| |\_|\_| |::::|
|::::|::::| |:::::::::::| |::::|:::|::::|:::| |:::|:|:|:|:::| |:::||:|:|:|:|:|:||:::| |\_|\_| |::::|
|\_\_\_\_|\_\_\_\_|\_|\_\_\_\_\_\_\_\_\_\_\_|\_|\_\_\_\_|\_\_\_|\_\_\_\_|\_\_\_|\_|\_\_\_\_\_\_\_\_\_\_\_\_\_|\_|\_\_\_||\_\_\_\_\_\_\_\_\_\_\_||\_\_\_|\_|\_|\_|\_|\_\_\_\_|

It’s not exactly a ground-breaking idea and there are definitely apps I could’ve used, including Apple Health, that would do an okay job.

But none did _exactly_ what I was looking for. I wanted a web app with a very specific design. I’ve also wanted to try [PlanetScale (opens in a new tab)](https://planetscale.com/) for a while now and this felt like the perfect opportunity to do so.

## [](#the-structure)The structure

The app is quite simple since I already had all of the data on my devices. The remaining problem to solve was getting it from my devices into the app and figuring out how to display it.

iOS automatically syncs the data from your devices to the native Health app and allows you to export it, which is great. I was only interested in a small subset of that data and I wanted the export to be automatic, ideally at regular intervals.

I found an app called [Health Auto Export (opens in a new tab)](https://apps.apple.com/us/app/health-auto-export-json-csv/id1115567069) that lets you set up an automation and specify exactly what data you want to export. I set it up to export the workout and health data as JSON every hour.

![Health Auto Export app icon](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Fhealth-auto-export.webp&w=828&q=75)

I could’ve probably built this part too, but since it wasn’t the focus, it felt more reasonable to just let another app that specializes in this handle it.

## [](#the-database)The database

As I mentioned earlier, I wanted to use [PlanetScale (opens in a new tab)](https://planetscale.com/) for the database, specifically the $5 Postgres, since that would be a great fit for an app like this. I onboarded using the MCP server and let an agent set everything up. It was incredibly easy.

This is something I’m experiencing more and more when onboarding to new tools. I don’t interact with the UI at all, the agent just uses an MCP to set everything up on its own.

![PlanetScale dashboard for the health database](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Fplanetscale.jpg&w=3840&q=75)

It set up the schema, a script to backfill all of my historical data and an `ingest` endpoint where the automation sends data every hour.

The database has 5 tables: `workouts`, `sleep` and `meals`, `samples` for daily totals like steps and energy and `ai_usage`, to track the AI spend.

-   workouts
-   sleep
-   meals
-   samples
-   ai\_usage

## [](#ai-agent)AI Agent

After deploying the first version in about 30 minutes, I realized that in order to make this actually useful, I’d need to add meal tracking too. The easiest way to do that was to add an agent that can estimate the calories for each meal I add.

Day

Food

Kcal

10-29 thu

Tomato bagel from Apollo

450

10-29 thu

Iced latte from Variety

190

10-28 wed

Cheeseburger at Hamburger America

650

10-27 tue

Margherita at Lucali

1,200

10-26 mon

Steak over rice from Inday

850

1–5 of 112

I built the agent with the [AI SDK (opens in a new tab)](https://ai-sdk.dev/docs/introduction) and while it was extremely easy to set up, I quickly realized that it wasn’t what I wanted.

route.ts

```
const result = streamText({
  model: "anthropic/claude-haiku-5.5",
  instructions,
  messages: await convertToModelMessages(messages),
  stopWhen: isStepCount(15),
  tools: {
    webSearch: gateway.tools.parallelSearch({ maxResults: 5 }),
    logFood: tool({
      description,
      inputSchema: z.object({ day: mealDay, items: mealItems }),
      execute: ({ day, items }) => addMeals(day, items),
    }),
  },
});
```

Paying for extra AI spend when I already had multiple subscriptions felt silly and I figured I should just use those instead.

It was also obvious that having to open the app every time I wanted to log a meal wasn’t the experience I wanted. Getting accurate values from a cheap model like Claude Haiku 5.5 turned out to be pretty difficult too.

![Health Bot chat logging a meal of bagels with cream cheese, turkey ham and mozzarella](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Fgrok-bot.jpg&w=3840&q=75)

Instead, I added an endpoint so agents like Grok Bot, Claude or Codex can write to the table. They’re much better at estimating values and need no extra spend.

POST /api/meals

```
{
  "items": [
    { "name": "2 bagels with cream cheese", "kcal": 620 },
    { "name": "2 turkey ham slices", "kcal": 60 },
    { "name": "2 mozzarella slices", "kcal": 160 }
  ]
}
```

I created a bot called Health in Grok Bot and gave it a token so it can write to the database. I send it the meals I eat, it researches the values online and logs them through the endpoint.

It has the entire chat history too, which is useful when things get repeated or it needs context.

Auto Export

Ingest

Health Bot

/api/meals

PlanetScale

Health App

It also reminds me to take supplements, sends me insights from the past week and keeps an eye on long-term trends. It’s basically my health coach.

![Health bot routines for a daily supplement reminder and weekly and monthly health insights](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Froutines-2.jpg&w=3840&q=75)

## [](#design)Design

When it comes to the design, I had a clear idea of what I wanted. I’ve been enjoying the markdown-esque aesthetic recently, so I wanted to do something in that realm. It also works well for charts and tables, which this app is full of.

![Health log page showing today's stats, a weekly activity grid and a steps chart](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Fhealth-log.jpg&w=3840&q=75)

At the top of the app the `Today` section gives me an overview of my daily stats, like how I’m doing with my calorie tracking and how many steps I’ve taken.

Below, there’s a GitHub-like activity section that shows me my exercises and `Active Energy`, `Steps`, `Eaten` and `Sleep` charts.

At the bottom of the page there are a couple of tables that show me the past 10 entries for each category with the option to see more.

![Sleep table listing hours slept, bedtime and wake time for each day](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Fsleep.jpg&w=3840&q=75)

The beauty of building personal software is that you can do _anything_ you want. A health data gathering web app with markdown-esque design is not something I’d imagine would be high up on people’s desired apps list.

![GitHub repository page for the private health project](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Frepo.jpg&w=3840&q=75)

## [](#finding-ideas)Finding ideas

Previously, only huge companies had the resources to build internal tooling for their specific needs, now it feels like anyone can do it.

![Claude Code prompt asking what software I could build for myself that I'd use every day](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Fterminal.jpg&w=3840&q=75)

It can be difficult to come up with what you should build though. You shouldn’t build just for the sake of building. If you’re unsure, I’ve found asking your agent to be a good starting point.

Based on everything you know about me, suggest a few personal apps or tools I could build that I’d actually find useful. Look for recurring tasks, things I track by hand, questions I keep asking or tools that don’t quite work the way I want. For each idea, explain what it would do and what from our conversations made you suggest it.

There’s an incredible amount of insight in your past conversations, especially things you’ve been doing manually or asking about over and over again.

Recents

Daily running plan

Calories in a tomato bagel

Is my resting heart rate normal?

Weekly training load summary

Calories in an iced latte

Garmin vs Apple Watch sleep data

Protein in two turkey ham slices

Why is my HRV lower today?

Calories in steak over rice

How many steps did I walk this week?

For example, a lot of the [skills](https://jakub.kr/skills) I’ve built started off like this. I asked my agent what kind of things I was doing manually over and over again and then built skills to do them for me. I originally didn’t plan on publishing them and only did so later.

 [![The /better-interface skill](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Fbetter-interface.jpg&w=3840&q=75) (opens in a new tab)](https://github.com/jakubkrehel/skills)

## [](#more-examples)More examples

A few other projects I’ve built also started this way. I built [oklch.fyi (opens in a new tab)](https://oklch.fyi/) because I needed a place where I could play around and test OKLCH colors. I only made it public later after seeing the demand on [Hacker News (opens in a new tab)](https://news.ycombinator.com/item?id=45010876).

 [![oklch.fyi](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Foklch-fyi.png&w=3840&q=75) (opens in a new tab)](https://www.oklch.fyi/)

[Loading.dev (opens in a new tab)](https://loading.dev/) was the same. We built it, because we were tired of having to define the same spinners in multiple projects over and over again. We only made it public after we’d been using it in our projects for a while.

 [![loading.dev](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Floading-dev.png&w=3840&q=75) (opens in a new tab)](https://loading.dev/)

Same for [design.interfere.com (opens in a new tab)](https://design.interfere.com/). We built it as an internal tool that helps us document and work with our design system and only happened to make certain parts of it public later.

 [![Interfere Design System](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Fdesign-interfere.webp&w=3840&q=75) (opens in a new tab)](https://design.interfere.com/)

Meniny is an iOS app that I haven’t shared anywhere before, largely because it’s only useful to a handful of people. It allows you to track [namedays (opens in a new tab)](https://en.wikipedia.org/wiki/Name_days_in_Slovakia) and birthdays easily in a single app. I mostly built this for myself, my friends and my family.

 [![Meniny on the App Store](https://jakub.kr/_next/image?url=https%3A%2F%2Foiszjiwtfc65cwa2.public.blob.vercel-storage.com%2Fthe-era-of-personal-software%2Fmeniny-app.png&w=3840&q=75) (opens in a new tab)](https://apps.apple.com/sk/app/meniny-slovak-calendar/id6754215341)

There are a couple other tools and apps that I built recently that have made my workflow much better, some of which have actually helped with this article and I’ll be releasing those soon.

## [](#conclusion)Conclusion

People have been building tools that solve their own problems for a very long time. When solving a problem _you_ encounter, you have a deep understanding of the struggle and are passionate about the solution.

Before models got this good, my Health app would’ve taken me much longer to build and I probably wouldn’t have done it.

It wouldn’t have been worth the time and I would’ve used an alternative built by someone else that didn’t do exactly what I wanted.

When building for yourself, the way you build changes. You no longer need to make decisions that work for everyone and you don’t need the app to make sense to anyone else but you.

If I really like a color combination and it doesn’t exactly pass contrast checks? Oh well, I’ll just use it anyway. There’s no real risk to making that choice other than affecting my own experience.

It doesn’t mean replacing all your tools with custom ones, at least for now. I wouldn’t do a better job than the person who built Health Auto Export because I haven’t spent enough time thinking about the problem, nor do I want to.

Personal software is not a new idea. What changed is how _accessible_ it has become. You can easily build something tailored to your specific needs, exactly the way you want it.

Just you and your experience, even if it’s a little weird.

## More

If you enjoy articles like this and want to learn more, take a look at Interfaces, my design engineering magazine.

It’s where I share everything I know about building _great_ interfaces. From animation and typography to performance and accessibility.

[NextNotes](https://jakub.kr/writing/notes)