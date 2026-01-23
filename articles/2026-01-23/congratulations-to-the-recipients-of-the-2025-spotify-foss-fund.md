---
title: "Congratulations to the recipients of the 2025 Spotify FOSS Fund"
source: "https://engineering.atspotify.com/2026/1/congratulations-to-the-recipients-of-the-2025-spotify-foss-fund/"
publishedDate: "2026-01-22"
category: "engineering"
feedName: "Spotify Engineering"
author: "Spotify Engineering"
---

**TL;DR** Established in 2022 as a way to help support the great open source ecosystem projects that Spotify relies on and that our developers love, the [Spotify FOSS Fund](https://engineering.atspotify.com/?s=foss%20fund) provides monetary support to projects that underpin our technology stack. To close out last year, we chose three projects to receive support from the 2025 fund:

-   [FFmpeg](https://www.ffmpeg.org/) 
    
-   [Mock Service Worker (MSW)](https://github.com/mswjs/msw)
    
-   [Xiph.Org Foundation](https://www.xiph.org/)
    

Two of the recipients — FFmpeg and Xiph.org — represent technologies fundamental to streaming and are large efforts supported by many maintainers. By contrast, MSW is officially maintained by a single individual, the project’s creator. Despite these differences in scale and structure, all of the projects rely on contributions from scores of volunteers in the open source community. Here’s more about each of the projects, including how much they received from the 2025 fund and thoughts from their maintainers. (Note: some responses have been edited for length and clarity.)

## FFmpeg: €30,000

###### “FFmpeg is written almost entirely by volunteers” — Kieran

Odds are [FFmpeg](https://www.ffmpeg.org/) was used to help deliver the video you just watched or podcast you just listened to. When it comes to decoding, encoding, transcoding, muxing, demuxing, filtering, streaming, and playing multimedia files, FFmpeg — which has been under continuous, active development for over 25 years — has become core infrastructure across media players, browsers, streaming services, and production pipelines. As FFmpeg contributing maintainer [Kieran Kunhya](https://www.linkedin.com/in/kieran-kunhya-73442919/) explains below, that ubiquity is central to the project’s mission.

### What is the vision for the project?

> FFmpeg aims to play every multimedia file ever made. As a result of this goal, it is used widely, from both hobbyists encoding their personal videos to some of the largest streaming services like YouTube, Netflix, X, and Spotify.

### How will these funds go toward supporting the future of the project?

> FFmpeg is written almost entirely by volunteers and so funding is important. Funding will be used for hardware purchases, travel to conferences, and funding development projects.

### What kind of impact do you think FOSS funds have on the open source ecosystem?

> FFmpeg has received donations from well-known names like Spotify, Bloomberg and Zerodha, and their association helps increase awareness of the importance of FFmpeg. It also provides value to these companies as it shows they care about the wider open source projects they rely upon in their businesses.

### What are other ways you think companies can better support open source?

> There continue to be sustainability challenges in open source projects, especially with long-term and reliable funding to pay for full-time developers. We hope companies can provide dedicated developers and/or repeatable funding to pay for this.

## Mock Service Worker (MSW): €15,000

###### “Supporting open source software is becoming more and more widespread. This is the future I want to see…” — Artem

Artem Zakharchenko ([@kettainaitto](http://kettanaito.com/)) is the creator and sole full-time maintainer of [Mock Service Worker (MSW)](https://github.com/mswjs/msw) — an industry-standard JavaScript library for API mocking that we use for unit test coverage and throughout our web stack at Spotify. One of Spotify’s developers, describing the value of the project, said “MSW makes writing useful tests in the JavaScript/TypeScript stack not only possible but easy.” MSW was also a recipient of the [2024 Spotify FOSS Fund](https://engineering.atspotify.com/2024/11/congratulations-to-the-recipients-of-the-2024-spotify-foss-fund). Here’s what Artem had to say when we talked to him at the end of 2025 and what he’s looking forward to in the year ahead.

### Any big changes to the project since we last talked?

> Yes! I've spent 2025 hard working on some of the biggest improvements to MSW in its history. Some of them are already out and running for hundreds of thousands of developers, like the new Interceptors architecture that utilizes custom mock agents and taps into the network on the node:net level, or the first-class support for Server-Sent Events, which, to my own surprise, happened to be one of the most requested features. 
> 
> Some changes still need time and I'm excited to finalize and roll them out in 2026. Those include a completely revamped internal architecture that lays the foundation of a brand-new way of looking at and using request interception. As well as the infamous remote request interception that has been in the works for years due to how difficult of a problem it was to tackle.

### How were last year’s funds used?

> This might be not as epic to write, but Spotify's support last year went mostly to make sure I can put some food on the table while working on my open-source projects. I've tried paying out most active contributors even before the sponsorship, but almost nobody was willing to accept money for their work. There is a tiny team of developers who actively help me with the work on MSW and I need to find better ways to support them financially in the year to come.

### How will this year’s funds be used?

> Your support will go directly into my work on the project. There’s a lot of things to finish and even more to plan out in the realm of API mocking. As I mentioned before, I would also like to explore how to make external contributions more sustainable.

### Any changes in your views to FOSS funds and their impact

> With more and more companies adopting initiatives like the Open Source Pledge, I dare say supporting open source software is becoming more and more widespread. This is the future I want to see, and the future that companies like Spotify make possible.

### Any thoughts on the best way to support open source?

> The best way to support open source has been and remains one thing — giving back. Either financially or in a form of contributions or by other means that ensure the longevity of projects big and small. Either by company-driven efforts, like Spotify’s FOSS and joining the Open Source Pledge, or at the individual level, like the recent sponsorship round from Guillermo Rauch.

## Xiph.Org Foundation: €25,000

[Xiph.org](https://www.xiph.org/) has been a recipient of the Spotify FOSS Fund every year since it was established. The foundation stewards essential audio containers and codecs — including Ogg, Opus, Vorbis, and FLAC — that have powered Spotify’s audio delivery from our earliest days and remain fundamental to our products today, from music to podcasts to audiobooks. 

In recent years, Xiph has continued to modernize and maintain this critical infrastructure, delivering performance improvements, long-term stability, and standards stewardship that directly support large-scale audio platforms like Spotify. 

In addition to the technology itself, Xiph produces documentation and educational materials that are heavily used by Spotifiers and cited in onboarding resources, continuing to deliver lasting value to engineers across the company and the broader audio ecosystem.

Thanks to all the maintainers and contributors of these projects for all the work they’ve done!