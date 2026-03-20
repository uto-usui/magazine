---
title: "Friend Bubbles: Enhancing Social Discovery on Facebook Reels"
source: "https://engineering.fb.com/2026/03/18/ml-applications/friend-bubbles-enhancing-social-discovery-on-facebook-reels/"
publishedDate: "2026-03-18"
category: "engineering"
feedName: "Meta Engineering"
---

-   Friend bubbles in Facebook Reels highlight Reels your friends have liked or reacted to, helping you discover new content and making it easier to connect over shared interests.
-   This article explains the technical architecture behind friend bubbles, including how machine learning estimates relationship strength and ranks content your friends have interacted with to create more opportunities for meaningful engagement and connection.

Friend bubbles enhance the social experience on Facebook Reels by helping you discover content your friends enjoy, creating a shared viewing experience and sparking new conversations. With a quick tap on a bubble, you can start a one-on-one conversation with any friend who has engaged with that Reel.

This feature combines social and interest signals to recommend more relevant, personalized content while making it easier to start conversations with the people who matter most to you. When videos connect to both personal interests and friend-related interests, they create a feedback loop that improves recommendations and strengthens social connections.

![](https://engineering.fb.com/wp-content/uploads/2026/03/Facebook-Friend-Bubbles.gif)

## An Overview of the Friend Bubbles System Architecture

The friend bubbles recommendation system includes several components that work together to surface relevant, friend-interacted content by blending video-quality signals with social-graph signals:

-   **Viewer-Friend Closeness (Whose Interactions Matter Most):** Identifies which friends’ interactions are most likely to interest the viewer.
-   **Video Relevance (What Videos to Show):** Ranks videos that are contextually relevant to the viewer.

Multiple friend interactions on the same video often signal stronger shared interest and higher relevance. Content surfaced through friend connections also tends to be high quality, creating a reinforcing loop: Social discovery increases engagement, and that engagement further strengthens the social graph.

![](https://engineering.fb.com/wp-content/uploads/2026/03/Facebook-Friend-Bubbles_image-1.png)

## Viewer-Friend Closeness: Identifying Friends With User-User Closeness Models

Friend bubbles rely on two complementary machine learning models to identify which connections a person feels closest to. One model is based on user survey feedback; the other is based on on-platform interactions.

The survey-based closeness model draws on a broad set of signals, including social-graph features (mutual friends, connection strength, interaction patterns) and user attributes (behavioral and demographic signals such as user-provided location, number of friends, and number of posts shared) to build a more complete picture of real-world relationships.

It is trained on a regular cadence using a lightweight binary survey in which a randomly selected group of Facebook users is asked whether they feel close to a specific connection in real life. The survey is structured as a close vs. not-close prediction problem, refreshed regularly to keep labels current, and includes questions that act as proxies for offline relationship strength (such as how often two people communicate). In production, the model runs weekly inference over trillions of person-to-person connections across Facebook friends.

While survey-based closeness provides a strong foundation, friend bubbles also use a context-specific closeness prediction model trained on on-platform activity signals, using real interactions that occur when bubbles are shown (for example, likes, comments and reshares). This enables the model to capture closeness in context — how likely a viewer is to value content recommended by someone in their friend graph based on how they interact with each other on the platform.

Our approach emphasizes connection quality over quantity. While bubble prevalence naturally rises with larger friend graphs, showing more bubble videos does not necessarily increase user engagement. The goal is to surface the right friend connections — those most likely to make the social context meaningful — using a combination of existing closeness signals and surface-specific features that better reflect the relationship dynamics behind friend-driven recommendations.

## Video Relevance: Making the Ranking System Friend-Content Aware

We use two key strategies to ensure high-quality, friend-interacted content can move through the recommendation funnel and reach users: expanding the top of the funnel, and enabling models to rank friend-bubble content effectively through a continuous feedback loop.

![](https://engineering.fb.com/wp-content/uploads/2026/03/Facebook-Friend-Bubbles_image-3.png)

### Sourcing Inventory: Expanding the Top of Funnel

The retrieval stage sources candidate videos based on close friends, as identified by the closeness model described above. By explicitly retrieving friend-interacted content, we expand the top of the funnel to ensure sufficient candidate volume for downstream ranking stages. This is important because, without it, high-quality friend content may never enter the ranking pipeline in the first place.

### Enabling Models to Rank Friend Content Effectively Through a Continuous Feedback Loop

A key insight from our development process was understanding why friend-interacted videos sometimes struggled to rank highly: It wasn’t because they were low quality, but because the model lacked user-user closeness context. Without that context, the model can’t learn what makes friend content uniquely valuable — namely, that its relevance is often driven by relationship strength and social meaning rather than the same signals that explain interest in more general content.

To address this gap, we integrated friend-bubble interaction signals as features and added new tasks into both early-stage and late-stage ranking multi-task, multi-label (MTML) models to incorporate viewer-friend relationship strength and to learn downstream engagement on videos with social bubbles. With these signals added across the ranking funnel, the models can better recognize the value of friend-interacted content, learn the relationship between closeness and viewer interest, and rank high-quality friend content higher when it is most relevant.

The system includes a continuous feedback loop in which friend-bubble interaction data flows back into model training. This loop helps the ranking system improve its understanding of which friend-content combinations resonate with users.

We augmented our existing video-ranking formula, which includes several optimization goals, with a friend-bubble ranking objective designed to maximize overall video engagement. We consider interaction metrics such as watch time, comments and likes, and use a conditional probability term, **P(video engagement | bubble impression)**, to predict the likelihood that a user will engage with a video after seeing a friend bubble.

This is balanced with tunable weights that manage trade-offs between social interaction and video engagement, allowing us to optimize for social connection (helping people discover videos their friends like) and content quality. This dual optimization captures the core value proposition of the friend-content ranking system: enabling effortless connection through passive friend discovery, delivering entertainment through relevant content, and strengthening relationships by turning shared videos into natural touchpoints for conversation.

### Client Infra Behind the Scenes: Performance at Reels Scale

Reels is a performance-sensitive surface, so adding new per-video metadata isn’t as simple as adding another field. If it increases work during scrolling or delays playback, it can hurt the core user experience. When we integrated friend bubbles, we treated three constraints as nonnegotiable:

1.  Smooth scrolling
2.  No regressions in load latency
3.  Low CPU overhead for metadata fetch and processing

Facebook’s video delivery system already performs [significant prefetch work](https://engineering.fb.com/2024/12/10/video-engineering/inside-facebooks-video-delivery-system/%29) ahead of playback. It preloads metadata, thumbnails and buffered content before a video reaches the viewport. We pinned friend-bubble metadata retrieval to that same prefetch window, which gave us several benefits: We could reuse cached results for stable data, avoid redundant CPU work, and limit wasted network requests by using an already optimized fetch path.

Because the bubble data arrived alongside the video content, we could render bubbles at the same time as the video itself, eliminating mid-playback UI updates and redraws.

We also made animation strictly conditional. During active scrolling and interaction, animation is disabled to preserve scroll responsiveness. On low-end devices where even idle animation could compromise performance, we turn it off entirely. Along with additional optimizations in the underlying method, this approach enabled us to ship friend bubbles while preserving core Reels performance.

#### Why the Metadata Has to Earn Its Place

A cleaner user interface is usually better, and new metadata can backfire if it adds noise or slows the experience. Friend bubbles work because the signal is high value: It adds meaningful social context that helps people decide what’s worth watching.

By setting a conservative threshold for which friends are eligible to appear, we ensure bubbles show up only when the relationship signal, as determined by the user-user closeness model, is strong. That approach reduces clutter while improving the viewing experience overall, reflected in increased video watch time.

## The Impact and Future of Friend Bubbles

Friend bubbles improve content relevance and engagement quality. In user feedback surveys, bubble-annotated videos consistently receive higher interest scores and more positive sentiment ratings than videos without bubbles.

Beyond relevance, bubbles improve app-session quality, not just quantity. Users who see bubbles spend more time actively watching and interacting with content, with growth concentrated in longer sessions rather than brief check-ins. The improvements come primarily from deeper video consumption. Bubble-related signals show a delayed effect on longer-term engagement patterns, suggesting repeated exposure to content friends have interacted with builds sustained interest over time.

By surfacing content friends have engaged with, bubbles also expose users to a broader range of topics and creators than they would otherwise encounter organically. Users don’t just passively scroll past this content — they actively engage through likes, comments, shares and follows, indicating friend-recommended content can resonate even when it falls outside their typical interests.

Not all friend signals are equal. Bubbles triggered by expressive reactions such as love or laughter drive stronger downstream engagement than simple likes, particularly for comments and private shares, suggesting expressive reactions signal stronger resonance. Engagement also scales consistently with the number of friend bubbles shown, meaning videos with multiple friend interactions tend to perform better.

Next, we’re scaling the system to increase impact and robustness by expanding friend-driven recommendations — while preserving quality — to additional surfaces and inventory, improving cold start for people with limited friend graphs, and refining ranking and feedback signals for better personalization.

Ultimately, this architecture illustrates how machine learning can strengthen human connection at scale, helping people discover shared interests and making it easier to start conversations with the people who matter most. When your friends enjoy something great, you can discover it, too — and you’re only a tap away from talking about it together.

_For more information about Facebook Bubbles, visit the_ [Meta Newsroom](https://about.fb.com/news/2025/10/finding-sharing-reels-facebook-just-got-easier-more-fun/)_._