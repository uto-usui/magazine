---
title: "How We Release the Spotify App: A Look Under the Hood (Part 2)"
source: "https://engineering.atspotify.com/2026/2/how-we-release-the-spotify-app-part-2/"
publishedDate: "2026-02-09"
category: "engineering"
feedName: "Spotify Engineering"
author: "Spotify Engineering"
---

## Introduction

In [Part 1](https://engineering.atspotify.com/2025/04/how-we-release-the-spotify-app-part-1) of “How We Release the Spotify App”, we gave an overview of how the Spotify release process works. In Part 2, we will peek under the hood at the tooling that makes it possible.

To understand where we are today, it’s useful to give some historical context of how the current solution came to be. 

Back in the Dark Age before the Release Manager Dashboard, everything lived in Jira. And we mean everything. While Jira is powerful (sometimes overwhelmingly so), it struggles to present lots of information in a human-friendly way. This left the Release Manager juggling tabs, jumping between tickets, checking statuses — all on top of answering questions from teams on Slack.

![Just a small part of a Jira release ticket.](https://images.ctfassets.net/p762jor363g1/2L1dEHSs6UywuKexMejTnU/ec6687455a9f911029e7e50031b007da/How_we_release_the_Spotify_app_part_2_jira_ticket.png)

_Just a small part of a Jira release ticket._

This caused a lot of context switching, and it was easy to miss a small detail in a Jira ticket, which could lead to extra work. So when we started to work on a new command center for the Release Manager, our aim was to create a single web page that would do the following:

-   Optimize for the Release Manager but be intuitive for anyone with basic knowledge of the Spotify mobile release process
    
-   Minimize context switching
    
-   Reduce cognitive load
    
-   Enable fast and accurate decision-making
    

This meant that it was time for the hardest part of the software development lifecycle — naming. Using our superb naming skills, we thought, “It’s sort of a dashboard for release management — so let’s call it the Release Manager Dashboard.”

## The data

The data we wanted to show on the same page was everything that the Release Manager previously had to check manually for each release and platform (Android, iOS, or Desktop). Even though all platforms share some common libraries, each platform is released independently of the others. We refer to the combination of a platform and a version as a track.

### Track-specific data

First of all, we have the release state, which is how far the track has gotten in the release process. Each track goes through a number of states before being rolled out, as shown here:

![How we release the Spotify app_part 2_progress.png](https://images.ctfassets.net/p762jor363g1/3twcY3zf1Hrg6PRlIlJ1SC/7542f30ace46b433f1c449fd92da546d/How_we_release_the_Spotify_app_part_2_progress.png)

The Release Manager frequently checks for open release-blocking bugs, which are critical bugs to be fixed for the current version, and sign-off status, indicating which teams have not completed their regression testing.

Once these have been completed, focus shifts to getting the final release candidate (RC) build ready. After the last fix has been merged, the release candidate has to be built successfully, the build verification tests have to be passed, and it has to be successfully uploaded to the App Store.

Once a build is available, the focus shifts to quality metrics, such as crashes, ANRs (app not responding), and CPU exceptions per song, and usage metrics, such as daily active users, for the build we are going to release.

### Unassigned and bugs without a version

In addition to the data above, which is specific to a particular track, we have open blocking bugs without a version and bugs without a priority, since they could also potentially block a release. These include both internally reported bugs and reports from our external alpha and beta testers. It’s part of the release management process to try to find an owning team for as many as possible. Some tickets are really hard to find an owner for, in which case the ticket might initially be assigned to a team to help us find the proper owner.

## The Look

Since Spotify has [Backstage](https://backstage.spotify.com/) (our [internal developer portal](https://backstage.spotify.com/discover/backstage-101)), which we use for all our internal frontend needs, we didn’t have to spend any time discussing which JavaScript framework to use.

More specifically, the Release Manager Dashboard is a Backstage plugin written in React and TypeScript. Internally, we use the Software Catalog functionality that Backstage provides to configure distribution of the various builds to the app stores. We also provide additional plugins for app builds and crashes that include more details, which we link to from the corresponding section in the Release Manager Dashboard. Together, these and our other app-focused Backstage plugins work as an ecosystem for our developers, with shared UI components and data.

We knew we wanted a quick overview to be able to see if the release was progressing nicely and if it was ready to go on to the next phase, with the ability to drill down to see exactly what was blocking us if that was not the case. With these requirements in mind, we got to work.

![How we release the spotify app part 2 gif](https://images.ctfassets.net/p762jor363g1/aFY2VANd2orqmJ0gVtYhZ/cc1f7c5e8d9715283f576055af757fc1/How_we_release_the_Spotify_app_part_2_animated.gif)

In the particular case in the illustration above, the Android 8.9.74 is marked as red (not OK) since the Crash & ANR Rate is too high.

## The backend

To power the Release Manager Dashboard, we built a backend service that pulls and unifies data from around 10 existing systems. Acting as an API gateway, it simplifies and aggregates key release data into a single consistent API.

Our first version worked, but it was slow and costly. Every reload triggered massive data queries, causing long load times and high costs (around the cost of a decent lunch in Stockholm!). After optimizing with caching and pre-aggregating data every five minutes, we reduced load time to just eight seconds and made the dashboard fast, reliable, and inexpensive to use (less than the cost of a potato!).

## The details

### Overview

Let’s have a deeper look at how the Release Manager Dashboard looks as of today.

The Release Manager Dashboard opens in the overview, where it’s possible to see the status of the Production, Current, and Upcoming releases at a glance. To see the details, the user can hone in on the track they are interested in.

![How we release the spotify app_part 2_overview.png](https://images.ctfassets.net/p762jor363g1/7ppmXaovXZM2J8LKWmNqWz/d7419549d826b36b905bf984726ed6be/How_we_release_the_spotify_app_part_2_overview.png)

Here are the basics:

-   Green: Complete, ready to go to the next stage of the release
    
-   Yellow: Warning, something needs to be addressed
    
-   Red: Error that needs to be rectified
    

### Production

![How we release the spotify app_part 2_production.png](https://images.ctfassets.net/p762jor363g1/3MLMvBhV8TUDZuTQwLQTBg/d81b07a2bbe4dd78773a18faf658ca05/How_we_release_the_spotify_app_part_2_production.png)

At the top, we show the Production versions of the app for Android, iOS, and Desktop. Since we already had to go through the whole release process to get a release to production, we only show metrics and not the status of the release process for these versions. (They’re green — otherwise we wouldn’t have gotten this far!). We show crash metrics and rolling daily active users over the last 24 hours. This way, the Release Manager will see if there are any surprises after rollout and can act upon that quickly.

### Current

![How we release the Spotify app_part 2_current](https://images.ctfassets.net/p762jor363g1/3zYDie5ZQvS4USMivy5wtD/304dbc981848c88f9dff88d32afdab06/How_we_release_the_Spotify_app_part_2_current.png)

The Current section contains the version of the app that has been branched but has not been rolled out to production yet.

In this particular example, the iOS version of Spotify version 8.9.2, the release is not quite ready yet. There is a release-blocking bug, regression testing hasn’t been completed, and the crash rate exceeds our release threshold. The developers are still pushing fixes to the release branch, so the latest builds do not include the most recent commits.

Yellow indicators show that we are waiting for something to happen (bugs to be fixed, testing to be done), and red indicates that we might have to take a direct action — like to figure out why the crash rate is exceeding our threshold.

The ITGC (IT general controls) section ensures a full production rollout is only possible after a release has successfully passed ITGC tests, verifying correct reporting and confirming data loss is below the defined threshold.

The Release Status Ping is not a regular section but a useful link that generates a Slack message with the status of the release.

### Upcoming

![How we release the Spotify app_part 2_upcoming](https://images.ctfassets.net/p762jor363g1/mZq5UBuAy6YloBvNqMkNp/554825d17bbb4f7b86664ed385bbf75c/How_we_release_the_Spotify_app_part_2_upcoming.png)

The Upcoming section is identical to the Current section, but since some sections aren’t yet applicable, they are grayed out.

## The Insights

Fetching and saving release data every five minutes created time-series data, allowing us to measure the release process and identify where time was being wasted. Analysis showed the release cycle’s biggest time sinks were the following:

-   Testing and fixing blocking bugs
    
-   Waiting for App Store approval (which is largely outside our control)
    

We also discovered that manually advancing a release could cause delays of up to 12 hours if the previous step was completed outside work hours, prompting the decision to automate this process.

## The Robot

After thinking about it for a couple of days, we came to the conclusion that automating the move on to the next step would pay for itself in a matter of months, so it was time to start development of what we referred to as the Robot. As mentioned above, our releases currently go through five states before being rolled out. These are: 1. Release branched 2. Final release candidate 3. Submitted for review 4. Roll out 1% 5. Roll out 100%

There is also an additional error and waiting state that needs to be modeled to gather the full flow:

6\. Rollout paused 7. Release cancelled

Advancing to the next stage requires certain conditions to be met and an action to be performed, either manually by the Release Manager or automatically by our release systems. Our Robot is simply a backend service that checks conditions and triggers the next action when they’re met.

One example of such a condition follows:

**Condition:** Manual testing signed off, no open bugs, automated tests executed successfully on latest git commit on release breach **Action:** Submit for review

The full state machine is complex, so here is a simplified version of the states and the conditions:

![how we release the spotify app part 2 flow chart](https://images.ctfassets.net/p762jor363g1/3imm8pyidyQ3SjLh1BXgGY/21d60c639a671673cb0886048e201943/How_we_release_the_spotify_app_part_2_flow_chart_final.png)

By implementing the release conductor robot, we were able to reduce the average release cycle by around eight hours.

## Looking forward

Right now we are using the Release Manager Dashboard with the main Spotify app for Android, iOS, and Desktop, and we are looking at using it more of our Spotify apps. To be able to do that, we have to make it more modular, since our smaller apps tend to have a much more lightweight process than our main one. 

The Release Manager Dashboard is five years old, and while off-the-shelf alternatives now exist, we believe maintaining our own is still worthwhile for several reasons:

-   We can easily link and reuse Release Manager components across different Backstage views.
    
-   [The Backstage Software Catalog](https://backstage.io/docs/features/software-catalog/) provides us with the underlying data model that the Release Manager Dashboard is based on, and it allows other teams to query and surface release data as they see fit. One example is our internal [Confidence](https://confidence.spotify.com/) instance, which makes use of our release data to better understand the impact of new client versions on experiments. 
    
-   Through Backstage’s Band Manager plugin, we have access to Spotify’s org data, which means we can automatically assign bugs to the relevant teams and ping teams on the progress of critical tickets. 
    
-   Low friction: All developers at Spotify are using [Backstage](https://backstage.spotify.com/). While this might sound trivial, having all developer tooling in one place can really make a huge impact.
    

We are really happy with the way the Release Manager Dashboard has turned out. It has achieved everything we wanted it to do and then some. On to the next five years!