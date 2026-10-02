---
title: "Google's 3D emoji design process"
source: "https://design.google/library/noto-3d-emoji-design"
publishedDate: "2026-10-01"
category: "design"
feedName: "Sidebar"
---

While every emoji was shaped by human hands, ensuring that emotional clarity could scale across thousands of screens required an assist from automation.

An emoji’s first job is to be understood at a glance, but that breaks down completely if people can’t actually see the character: for example, a black cat on a black background. In dark mode, people who use darker skin tones have long faced an annoying reality: Their emoji often disappear against black or dark-gray chat bubbles. When the silhouette vanishes, so does the meaning.

We wanted to fix this issue across all 3,977 characters, while understanding that designers can’t reliably eyeball thousands of combinations. To shoulder the mathematical heavy lifting, we built an AI-powered contrast audit tool.

As Wilder Wells, a program manager, explains, “High color contrast along the image edge is a key factor for legibility at small sizes, so we built a tool that scans the edges, flags when the contrast is below the threshold against common backgrounds, and suggests visual improvements that designers could implement.“

While the algorithm flagged the failures, it didn’t solve them. An automated filter would have washed out rich skin tones just to pass the test. Instead, our designers stepped in to manually sculpt custom edge protection — painting subtle rim lighting and contour highlights by hand.

Nobody should have to choose between using their actual skin tone and having their messages be legible. Whether someone sends an emoji in the default yellow hue or tone 5, their identity should never be an accessibility trade-off.