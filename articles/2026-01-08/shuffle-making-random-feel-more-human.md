---
title: "Shuffle: Making Random Feel More Human"
source: "https://engineering.atspotify.com/2025/11/shuffle-making-random-feel-more-human/"
publishedDate: "2025-11-13"
category: "engineering"
feedName: "Spotify Engineering"
author: "Spotify Engineering"
---

## How we balanced statistical randomness with listener intuition

Shuffle has always been one of Spotify’s most-used features, and also one of the most misunderstood. For years, listeners have debated whether Shuffle is “truly random,” often noticing patterns or repeated tracks that didn’t feel random enough.

For the last 5 years, Spotify's Shuffle was exactly that – random. We relied on a standard, publicly used randomization method to generate playlist orders that were mathematically sound. But, as we learned from user feedback, _statistical randomness_ doesn’t always translate into _perceived randomness_.

Think of flipping a coin and getting five heads in a row. It’s a completely valid random outcome, but it doesn’t _feel_ random. That disconnect between probability and perception was at the heart of the challenge we set out to solve.

## Understanding the problem

When we looked at listener feedback, one theme stood out: users wanted Shuffle to feel more varied and less repetitive. Certain songs or artists seemed to surface again and again, while others felt buried.

From an engineering perspective, this presented a paradox. Randomness by definition doesn’t guarantee even distribution, but human expectations do. The task wasn’t to make Shuffle _less random_, but to make it _feel more fair_ and _more fresh_.

## Our approach: fewer repeats, same randomness

To preserve the spirit of randomness while improving variety, we introduced a new system we call Fewer Repeats. 

1.  **Generate multiple random sequences.** Each of these potential shuffle sequences is a mathematically random version of your playlist.
    
2.  **Score each sequence for freshness.** We check how recently you’ve listened to the songs — both within that playlist and across Spotify. Each random sequence loses “freshness points” for recently played tracks appearing early in the order. The earlier in the order and the more recent they were played, the more points they lose.
    
3.  **Pick the freshest version of the random sequences.** The sequence with the highest freshness score wins, becoming your final Shuffle.
    

In practice, that means if you’ve just played “Bohemian Rhapsody” or “Sweet Caroline,” those songs get nudged further down the queue, leaving space for others to surface.

We’re not changing the math behind randomness; instead, we’re simply choosing the freshest sounding one.

The result is a Shuffle with fewer repeats that feels more surprising, and a little more like what people expect when they press play.

The “Fewer Repeats” mode of Shuffle is now the default experience for Premium users.

![UI image](https://images.ctfassets.net/p762jor363g1/5xHoTNG8KevQpSkc0kn95t/c2f3b2f01ea58badfdd3ce7e68050032/Shuffle__Making_Random_Feel_Right_UI_final.png)

## Standard Shuffle: still pure randomness

For listeners who prefer the classic experience, **Standard Shuffle** keeps things purely random — just like before.

We use a well-known method called the Mersenne Twister, which is essentially a random number generator. Each song in your playlist gets a unique value based on a randomly calculated “seed” number, and the playlist is then ordered according to those random values. This creates a sequence that is mathematically fair and completely unpredictable. 

This mode doesn’t factor in recent plays or listening patterns — every track has an equal chance, every time you hit Shuffle, which can lead to hearing the same songs.

## Fine-tuning for the future

We’re continuing to refine how we measure freshness and balance randomness. That includes experimenting with how we weight recent plays, artist diversity, and playlist size — all without adding complexity or latency for the listener.

This update is now the default experience for Premium users under the "Fewer Repeats" setting, with _Standard_ available for those who want pure randomness.

True randomness will always have its quirks, but by pairing it with a little context, we can make Shuffle sound the way people expect it to: unpredictable, varied, and fun.