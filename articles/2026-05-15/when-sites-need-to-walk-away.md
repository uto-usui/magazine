---
title: "When sites need to walk away"
source: "https://chriscoyier.net/2026/04/28/when-sites-need-to-walk-away/"
publishedDate: "2026-05-14"
category: "design"
feedName: "Sidebar"
---

The Internet Archive has a new book: [VANISHING CULTURE](https://www.betterworldbooks.com/product/detail/vanishing-culture-a-report-on-our-fragile-cultural-record-9798995425014/new). ([Digital copy is free.](https://archive.org/details/vanishing-culture-2026/page/n1/mode/1up))

> According to a Pew Research Center report, 26% of pages from 2013-2023 are no longer accessible. But that’s not the whole story. In a new study published in Internet Archive’s book, VANISHING CULTURE, data scientists working with the Wayback Machine have found: 16% have been restored through the Wayback Machine. 56% are preserved before they disappear.

A quarter of pages from the last slightly-more-than-a-decade gone. I guess that’s about what I would have guessed. I don’t love it, but it seems like the level of URL rot that just happens on the web. Maybe even feels a little low? 😬. Kinda cool the Internet Archive saves about half of it.

![Infographic illustrating the preservation of URLs in the Wayback Machine, showing 74% alive, 26% dead URLs, and categorizing dead URLs as 10% vanished, 18% endangered, 16% restored, and 56% preserved.](https://i0.wp.com/chriscoyier.net/wp-content/uploads/2026/04/HGsC2gKXsAA2fEG.jpeg?resize=819%2C1024&ssl=1)

This resonated a little extra this week as a local mountain biking trail resource said they were closing:

![Image featuring the BendTrails logo and announcement about stepping away from BendTrails on May 31st, 2026, with a brief message about reaching a natural stopping point after ten years.](https://i0.wp.com/chriscoyier.net/wp-content/uploads/2026/04/Screenshot-2026-04-28-at-7.20.48-AM.png?resize=1024%2C766&ssl=1)

When I see stuff like this, my brain thinks: _OK fine, thanks for letting us know. But, like, you’re not going to just turn off the site, right?!_ No, they are:

> ## Will The BendTrails Website Be Taken Offline?
> 
> We’re open to the possibility of a community group, business, or individual acquiring BendTrails’ assets and keeping the site online — but if that doesn’t happen, the site will be going dark on June 1st.

They want something like 80-90 grand for it. Which is fine. They worked on it for a long time and did a great job. I imagine it incurred costs, likely above and beyond what sponsors covered. Maybe they’ll get it, maybe they won’t.

I just can’t wrap my mind around “going dark”. It’s a WordPress site. Bluehost can host that for $3.99 a month ($9.99/month after three years). Not to trivialize money but that seems pretty doable and preferable to just shutting the thing off.

Maybe it’s a mental space thing though. I’ve had to walk away from projects by drawing pretty hard lines. If the website is still online, maybe it will still occupy mental space that they just can’t afford. You probably know I’m a fan of WordPress, but I’ll admit WordPress adds some additional mental overhead. There would be some prep like turning off any interactive features. Then somebody has to be in charge of updates forever, because WordPress is PHP and MySQL and such which will be subject to potential vulnerabilities forever.

A fella I know put together [Bend Bike Rides](https://bendbikerides.com/) in the wake of this. A burgeoning replacement. I don’t know the tech stack but I know the guy well enough I’m quite sure it’s not WordPress. Looks like static output (if JavaScript-y). If he needs to walk away from this site someday, there is options like Netlify’s “free forever” plan that feels a lot more likely to be able to be left forever with no mental overhead.

I’m just thinking about what the options are and what feels right when people need to walk away from a site. It’s nice the Internet Archive saves them, most of the time. But is that good enough? Maybe we just shouldn’t worry about it because they will take care of it? If we don’t think that’s good enough, what then? Should there be better tooling for static-izing a site and putting it somewhere inexpensive to live as a viewable time capsule?

For WordPress sites, there is [a premium version of legacy](https://wordpress.com/100-year/). $38,000 will keep the lights on essentially forever. Many scoff, but I think it’s cool. I may not have pulled the trigger if it was my money, but I did [happily use the service for my friend](https://chriscoyier.net/2025/05/05/christopher-org-for-the-next-100-years/) in kind.

Honestly I hope CodePen is an option for some situations and that we can evolve to make it an even better option over time. [We’ve got deployment](https://blog.codepen.io/docs/pens/deployment/). It’s not free, but it’s not heavily limited either. The trick is getting a site to be entirely static, and I feel like there could/should be better tools for converting sites into this state.