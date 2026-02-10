---
title: "How to Handle a Massive Filter with Over 100 Options"
source: "https://uxmovement.medium.com/how-to-handle-a-massive-filter-with-over-100-options-dc8b1966d3c7?source=rss-40dd56d8f87d------2"
publishedDate: "2024-10-03"
category: "interaction"
feedName: "UX Movement"
author: "UX Movement"
fetchedBy: "playwright"
---

## Batch filtering with a modal

[

![UX Movement](https://miro.medium.com/v2/resize:fill:64:64/1*0hVXTjSwlD8Kje1OlclpDg.png)



](https://uxmovement.medium.com/?source=post_page---byline--dc8b1966d3c7---------------------------------------)

3 min read

Oct 3, 2024

Designing filters for large-scale enterprise apps is different than the average app. You don’t have a few options to handle, but hundreds. Making everything fit intuitively is quite the design challenge.

While a left sidebar and horizontal toolbar are common UI patterns for filters, they aren’t the best when dealing with hundreds of filters. Instead, a better approach is a modal screen dedicated to batch filtering.

However, there’s still a potential problem with this approach. How do you fit hundreds of filter options on a single modal screen? You can’t stack them all vertically, or you’ll force users to scroll excessively. The only way to make this work is to design a navigation within the modal.

Press enter or click to view image in full size

![](https://miro.medium.com/v2/resize:fit:700/0*Zn4HAOt5_wOjHntj.png)

## Adding Navigation to the Modal

To add navigation to the modal, you must designate a small portion of the left side for a sidebar. This sidebar is scrollable and allows users to see an infinite number of filter options without compromising width space. The number of items can grow infinitely in a vertical direction, and there’s ample width space to display multiple options.