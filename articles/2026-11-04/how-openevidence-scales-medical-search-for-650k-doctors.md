---
title: "How OpenEvidence scales medical search for 650K doctors"
source: "https://vercel.com/blog/how-openevidence-scales-medical-search-for-doctors"
publishedDate: "2026-11-03"
category: "frontend"
feedName: "Vercel"
author: "Susan Aziz"
---

### [Copy link to heading](#openevidence-on-vercel)**OpenEvidence on Vercel**

-   Serves 650,000 doctors with medical search
    
-   Completes production deployments in about five minutes
    
-   Absorbs traffic spikes without additional capacity provisioning
    
-   Reduced serverless spend by 90% with Fluid compute
    
-   Updates doctor- and patient-facing applications independently
    

[OpenEvidence](https://openevidence.com/) helps physicians find medical evidence during care, whether they’re checking a dosage on intensive care rounds or handling a case outside their specialty without a specialist nearby. Answers draw on peer-reviewed literature and include citations, so doctors can examine the sources behind them.

OpenEvidence’s small team began using Vercel to get early experiments online and kept that workflow as the product grew, relying on the platform to handle web deployments and capacity.

## [Copy link to heading](#building-software-physicians-depend-on)Building software physicians depend on

The stakes are different when software helps inform medical decisions. An incorrect answer can affect how a doctor treats a patient, while an unavailable application can cut off access to evidence when it is needed.

OpenEvidence supported [more than 20 million clinical consultations in January 2026](https://vercel.com/customers/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust). The company also reported that [more than 100 million Americans were treated by doctors using OpenEvidence in 2025](https://www.businesswire.com/news/home/20260121029132/en/OpenEvidence-Raises-%24250-Million-to-Build-Medical-Superintelligence-for-Doctors).

"Honestly, life or death is not inaccurate," says Kush Khosla, Engineering Lead at OpenEvidence. "We operate in situations where it's an ER and they really need to know what's going on. Uptime is very, very important to us."

"A lot of doctors and medical professionals are used to really outdated software," says Andy Yoon, Engineering Lead at OpenEvidence. A more modern experience still needs to meet physicians' expectations of speed, stability, clarity, and information they can trust. The small team needs a way to test updates to the web application before putting them into production and to roll back if something goes wrong.

## [Copy link to heading](#keeping-releases-simple-as-the-audience-grows)Keeping releases simple as the audience grows

Andy recalls why Vercel suited the team he joined at OpenEvidence. "I was pretty much the only engineer on our team coming from an actual frontend background," he says. "Most of our team works in Python and machine learning." He adds, "Given the makeup of our engineering team, Vercel really scaled with our needs so well."

The team builds its physician-facing web application with the [Next.js framework](https://vercel.com/docs/frameworks/full-stack/nextjs). When engineers push changes to a development branch, Vercel [builds and deploys a preview](https://vercel.com/docs/git), giving them a link they can use for live demos and share with colleagues to try new features. Pushing or merging into the production branch then triggers the production build and deployment. If a release needs reverting, the team can [roll back to a previous deployment](https://vercel.com/docs/instant-rollback).

That workflow lets the team release multiple times a day, with each change becoming available to a physician audience that Kush thinks about whenever he ships something:

> If I push a frontend change, I know that 650,000 doctors will see that change in about five minutes. Vercel just takes it and deploys it to everybody. That sticks with me every single day whenever I'm pushing stuff.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/ca5210ebbbb8aa3a063fba50/10d4755833563ce27dc02c0628c4f203/kush-khosla.jpg)Kush Khosla Engineering Lead at OpenEvidence

## [Copy link to heading](#more-doctors-without-more-provisioning)More doctors without more provisioning

Keeping that application available means handling demand the team can’t always anticipate. Andy was scrolling through Slack when he saw the message that OpenEvidence had gone viral on TikTok, reaching around two million views in under a week. He watched traffic climb and checked the logs. [Response times stayed fast and error rates remained near zero](https://vercel.com/customers/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust), and with no additional capacity to provision, he went back to his work.

> Vercel has just completely scaled with that usage. We've never had it fall over due to capacity or had to provision anything extra. Just being able to trust that it's there, to the point where we don't really even think about it, is amazing.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/cad1479d143f9137dc78c1ac/6fd9a169ff14bc0b6ff315d50151994c/andy-yoon.webp)Andy Yoon Engineering Lead at OpenEvidence

Beyond sudden spikes, the team has accommodated sustained growth without rebuilding the web application.

"Not once have I had to think, now that we have five times as many doctors, what's happening to page loads or time to first paint," Kush says. "The scaling has happened so naturally that we end up focusing on other things."

## [Copy link to heading](#a-90%-drop-in-serverless-spend)A 90% drop in serverless spend

As usage grew, VP of Engineering Micah Smith was watching compute costs. The team enabled [Fluid compute](https://vercel.com/docs/fluid-compute) for its functions on Vercel, and Micah [described the result](https://vercel.com/customers/how-openevidence-built-a-healthcare-ai-that-physicians-can-trust) alongside the wider infrastructure budget:

"We reduced our serverless spend by 90% while maintaining the same performance, and even as we've scaled up to 1000x growth, Vercel is less than 5% of our overall infra spend."

Fluid compute lets multiple requests share a running function instance, so it can handle other work while a request waits for another service, such as a database or an AI backend, to respond. With [Active CPU pricing](https://vercel.com/docs/functions/usage-and-pricing), that waiting time doesn’t incur CPU charges, though memory remains billed while requests are in progress.

## [Copy link to heading](#a-familiar-workflow-for-a-new-audience)A familiar workflow for a new audience

Take Home, OpenEvidence’s first patient-facing application, lets a doctor translate a clinical answer into plain language and share it with a patient, who logs in to review and save the evidence. Clinical-trial matching is also part of the application’s planned direction.

To support this expansion, the team uses a pattern established through dozens of early proofs of concept, each deployed as its own [Vercel project](https://vercel.com/docs/projects) with a custom domain. Stakeholders could open those applications and test the workflows for themselves. Getting new projects online in minutes helped the team find product-market fit and made it easier to win early enterprise partnerships.

Take Home has its own project and domain too, so engineers can update the patient experience without deploying the other applications.

> We know Next and Vercel so well, we get these independent deployments that work seamlessly and are isolated from each other. There are all these other areas we want to move into, so let's just make that a new Vercel project.
> 
> ![](https://assets.vercel.com/image/upload/f_auto,c_fill,w_32,h_32,q_75/contentful/image/e5382hct74si/caf7ac719886ee05298ddcef/5afe9c125fa8327ca8cf2c72b3672f52/kush-khosla.jpg)Kush Khosla Engineering Lead at OpenEvidence

With Take Home, evidence that helps a doctor during a consultation can become something a patient returns to afterward.

**About OpenEvidence:** OpenEvidence helps healthcare professionals find medical evidence at the point of care, with answers sourced, cited, and grounded in peer-reviewed literature. Physicians use it daily across more than 10,000 hospitals and medical centers in the United States. Its mission is to help doctors save lives and improve patient care. Learn more at [openevidence.com](https://openevidence.com/).