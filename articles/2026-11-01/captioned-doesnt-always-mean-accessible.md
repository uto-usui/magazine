---
title: "Captioned Doesn’t Always Mean Accessible"
source: "https://webaim.org/blog/captioned-doesnt-always-mean-accessible/"
publishedDate: "2026-10-29"
category: "accessibility"
feedName: "WebAIM Blog"
author: "Christopher Phillips"
---

[Video captions](https://webaim.org/techniques/captions/) are essential to accessible video experiences. Captions are required by the Web Content Accessibility Guidelines (WCAG) in [Success Criterion 1.2.2](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) and are a legal requirement for many videos. Captions are frequently cited as an example of the curb-cut effect, or the idea that providing accommodations for people with disabilities can provide benefits to all users. Captions are essential for users who are Deaf or hard-of-hearing but are also used by many hearing users to enhance their video-watching experience.  

Note

This article focuses on captions for prerecorded videos, although some of the principles apply to live videos as well.

## Quality Captions

At the most basic level, captions provide synchronized text for audio in a video. When talking to people about captioning, I used to divide captions into two categories: 

1.  Automatic, computer-generated captions that I considered “poor quality”, or  
2.  Professional, human-generated captions I considered “high quality”.  

It used to be easy to demonstrate problems with automatic captions by playing a video with them—often within the first 30 seconds there would be multiple examples of incorrect or missing dialogue. Today, a growing number of automated tools do a good job of generating accurate text from the spoken dialogue in a video. However, users need more than simply accurate, synchronized text to receive a highly accessible, equivalent experience from captions. 

So, what is required to provide a quality caption experience? Let’s go back to [the Understanding document](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) for WCAG Success Criterion 1.2.2 to review the intent of the requirement: 

> Captions not only include dialogue, but identify who is speaking and include non-speech information conveyed through sound, including meaningful sound effects.

This identifies some essential attributes of accessible captions. However, while those guidelines establish the importance of spoken dialogue, speaker identification, and meaningful non-speech information, they do not provide specific details of how to implement those practices. Consider how the following implementation questions could impact the user experience:

-   Should spoken dialogue be verbatim and include filler words (e.g., “Start on uh slide number five. … uh, I mean slide 6”) or remove nonessential fillers and self-corrections while preserving meaning (e.g., “Start on slide six”)? 
-   Is speaker identification required in captions every time the speaker changes, even if it is visually apparent that the speaker has changed?
-   Is there a standard way to format non-speech information in a caption file?

If you are creating your own captions, you will quickly encounter additional questions on how to format your video captions. For example:

-   How many caption lines should appear on the screen at a time?
-   How many characters are appropriate per line?
-   Should I create captions that are open (always on) or closed (can be turned on or off)?
-   How long should an individual caption remain on screen?

I’m not going to try and answer all of those questions here, but the [resources at the end of this article](#resources) provide some helpful guidance. Providing an accessible video experience goes beyond ensuring that the text representing the spoken dialogue is accurate.

Low-quality captions may present an inconvenience to some users but can completely exclude others who rely on them to access video content.

## Evaluate the User Experience

I continue to recommend captions created or reviewed by someone with captioning expertise. However, as automatic captioning tools continue to improve, we need to be able to evaluate their output against established quality guidelines rather than treating the production method as a guarantee of quality (or lack thereof).

To date, I haven’t seen any automatic tool that does as good a job as a professional, trained captioner in providing a quality captioning experience. However, don’t assume that just because you are paying for captions, they meet quality standards. I have encountered vendors marketing professional captions where the end product is worse than what automatic tools are able to provide.

Before publishing a video, review the captions against best practices, including the [Resources below](#resources). Determining whether video captions are accessible needs to go beyond checking if a caption file is present or how it was created. Review the caption experience in the player your audience will use and be sure the dialogue is accurate, speakers are identified, and meaningful sounds are represented. Additionally, check the timing, readability, and placement of your captions.

For someone who relies on captions, missing or poorly represented information may mean missing an important instruction, a warning, or the entire point of a conversation. Accurate dialogue is essential, but it is only part of the experience. The measure of caption quality is whether viewers can rely on the captions to understand the message of a video.

## Resources

-   [Captioning Key](https://dcmp.org/learn/captioningkey/)—An excellent resource from the Described and Captioned Media Program (DCMP) with examples of quality captions and answers to questions you didn’t know you had.
-   [BBC Subtitle Guidelines](https://www.bbc.co.uk/accessibility/forproducts/guides/subtitles/)—Detailed guidelines on subtitle content, timing, and presentation.
-   [Caption Quality Standards](https://www.usu.edu/accessibility/policy/standards/caption-quality-standards)—A helpful resource providing a summary of key captioning standards from Utah State University (where WebAIM is located).