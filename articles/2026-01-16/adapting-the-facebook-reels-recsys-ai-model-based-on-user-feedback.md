---
title: "Adapting the Facebook Reels RecSys AI Model Based on User Feedback"
source: "https://engineering.fb.com/2026/01/14/ml-applications/adapting-the-facebook-reels-recsys-ai-model-based-on-user-feedback/"
publishedDate: "2026-01-14"
category: "engineering"
feedName: "Meta Engineering"
---

-   We’ve improved personalized video recommendations on Facebook Reels by moving beyond metrics such as likes and watch time and directly leveraging user feedback. 
-   Our new User True Interest Survey (UTIS) model, now helps surface more niche, high-quality content and boosts engagement, retention, and satisfaction.
-   We’re doubling down on personalization, tackling challenges like sparse user data and bias, and exploring advanced AI to make recommendations even smarter and more diverse.
-   Our paper, “[Improve the Personalization of Large-Scale Ranking Systems by Integrating User Survey Feedback](https://dl.acm.org/doi/10.1145/3705328.3748119)” shares full details on this work. 

Delivering personalized video recommendations is a common challenge for user satisfaction and long-term engagement on large-scale social platforms. At Facebook Reels, we’ve been working to close this gap by focusing on “interest matching” – ensuring that the content people see truly aligns with their unique preferences. By combining large-scale user surveys with recent advances in machine learning, we are now able to better understand and model what people genuinely care about, which has led to significant improvements in both recommendation quality and overall user satisfaction.

## Why True Interest Matters

Traditional recommendation systems often rely on engagement signals – such as likes, shares, and watch time – or heuristics to infer user interests. However, these signals can be noisy and may not fully capture the nuances of what people actually care about or want to see. Models trained only on these signals tend to recommend content that has high short-term user value measured by watch time and engagement but doesn’t capture true interests that are important for long-term utility of the product. To bridge this gap, we needed a more direct way to measure user perception of content relevance. Our research shows that effective interest matching goes beyond simple topic alignment; it also encompasses factors like audio, production style, mood, and motivation. By accurately capturing these dimensions, we can deliver recommendations that feel more relevant and personalized, encouraging people to return to the app more frequently.

![](https://engineering.fb.com/wp-content/uploads/2025/11/Meta-Facebook-Reels-Adapting-Recsys-image1.png)

Recommendation systems are typically optimized based on user interactions on the product, such as watch time, likes, shares, etc. However, by incorporating user perception feedback – like interest match and novelty – we can significantly improve relevance, quality, and the overall ecosystem.

## How We Measured User Perception

To validate our approach, we launched large-scale, randomized surveys within the video feed, asking users, “How well does this video match your interests?” These surveys were deployed across Facebook Reels and other video surfaces, enabling us to collect thousands of in-context responses from users every day. The results revealed that previous interest heuristics only achieved a [48.3% precision in identifying true interests](https://dl.acm.org/doi/abs/10.1145/3705328.3748119), highlighting the need for a more robust measurement framework. 

By weighting responses to correct for sampling and nonresponse bias, we built a comprehensive dataset that accurately reflects real user preferences – moving beyond implicit engagement signals to leverage direct, real-time user feedback.

![](https://engineering.fb.com/wp-content/uploads/2025/11/Meta-Facebook-Reels-Adapting-Recsys-image-updated.png)

## Framework: User True Interest Survey (UTIS) Model

Daily, a certain proportion of users viewing sessions on the platform are randomly chosen to display a single-question survey asking, “To what extent does this video match your interests?” on a 1-5 scale. The survey aims to gather real-time feedback from users about the content they have just viewed.

The main candidate ranking model used by the platform is a large multi-task, multi-label model. We trained a lightweight UTIS **_alignment model_** **_layer_** on the collected user survey responses using existing predictions of the main model as input features. The survey responses used to train our model were binarized for easy modelling and denoises variance in responses. In addition, new features were engineered to capture user behavior, content attributes, and interest signals with the object function to optimize predicting users’ interest-matching extent.

The UTIS model outputs the probability that a user is satisfied with a video, and is designed to be interpretable, allowing us to understand the factors contributing to users’ interest matching experience.

![](https://engineering.fb.com/wp-content/uploads/2025/11/Meta-Facebook-Reels-Adapting-Recsys-image2.png)

User perception feedback collected using surveys are extremely sparse but such feedback can be generalized in large scale recommendation systems using our novel model “Perception Layer” architecture that uses existing event predictions as additional features.

## Integrating the UTIS Model in the Main Ranking System

We have experimented with and deployed several use cases of the UTIS model in our ranking funnel, all of which showed successful tier 0 user retention metric improvements:

1.  **Late Stage Ranking (LSR)**: UTIS is deployed in parallel to the LSR model, providing an additional input feature into the final value formula. This allows fine-tuning of the final ranking stage to incorporate true interests while balancing other concerns.
2.  **Early Stage Ranking (Retrieval)**: UTIS is used to reconstruct users’ true interest profiles by aggregating survey data to predict affinity for any given user-video pair, allowing us to re-rank the user interest profile and source more candidates relevant to users’ true interests. Also, large sequences based on user-to-item retrieval models are aligned using knowledge distillation based objectives trained on UTIS predictions from LSR as labels. 

The UTIS model score is now one of the inputs to our ranking system. Videos predicted to be of high interest receive a modest boost, while those with low predicted interest are demoted. This approach has led to:

-   Increased delivery of high-quality, niche content. 
-   A reduction in low-quality, generic popularity based recommendations.
-   Improvements in like, share, and follow rates.
-   Improved user engagement and retention metrics.

Since launching this approach, we’ve observed robust offline and online performance

1.  **Offline Performance:** [The UTIS model delivered an improvement in accuracy and reliability over the heuristic rule baseline](https://dl.acm.org/doi/abs/10.1145/3705328.3748119). Accuracy increased from 59.5% to 71.5%, precision improved from 48.3% to 63.2%, and recall increased from 45.4% to 66.1%. These gains demonstrate the model’s ability to help in accurately identifying users’ interest preferences.
2.  **Online Performance:** Large-scale A/B testing with over 10 million users confirmed these improvements in real-world settings. [The UTIS model consistently outperformed the baseline, driving higher user engagement and retention](https://dl.acm.org/doi/abs/10.1145/3705328.3748119). Notably, we saw a +5.4% increase in high survey ratings, a -6.84% reduction in low survey ratings, a +5.2% boost in total user engagement, and a -0.34% decrease in integrity violations. These results highlight the model’s effectiveness in improving user experience and matching users with relevant interests.

## Future Work for Interest Recommendations

By integrating survey-based measurement with machine learning, we are creating a more engaging and personalized experience – delivering content on Facebook Reels that feels truly tailored to each user and encourages repeat visits. While survey-driven modeling has already improved our recommendations, there remain important opportunities for improvement, such as better serving users with sparse engagement histories, reducing bias in survey sampling and delivery, further personalizing recommendations for diverse user cohorts and improving the diversity of recommendations. To address these challenges and continue advancing relevance and quality, we are also exploring advanced modeling techniques, including large language models and more granular user representations.

## Read the Paper

[Improve the Personalization of Large-Scale Ranking Systems by Integrating User Survey Feedback](https://dl.acm.org/doi/10.1145/3705328.3748119?ref=engineeringatmeta)