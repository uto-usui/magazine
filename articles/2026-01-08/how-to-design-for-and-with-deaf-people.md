---
title: "How To Design For (And With) Deaf People"
source: "https://smashingmagazine.com/2025/12/how-design-for-with-deaf-people/"
publishedDate: "2025-12-30"
category: "design"
feedName: "Smashing Magazine"
author: "hello@smashingmagazine.com (Vitaly Friedman)"
---

-   8 min read
-   [UX](https://smashingmagazine.com/category/ux), [Accessibility](https://smashingmagazine.com/category/accessibility), [Design](https://smashingmagazine.com/category/design)

Practical UX guidelines to keep in mind for 466 million people who experience hearing loss. More design patterns in [Smart Interface Design Patterns](https://smart-interface-design-patterns.com/), a **friendly video course on UX** and design patterns by Vitaly.

When we think about people who are deaf, we often assume stereotypes, such as “disabled” older adults with **hearing aids**. However, this perception is far from the truth and often leads to poor decisions and broken products.

Let’s look at when and how deafness emerges, and how to design better experiences **for people with hearing loss**.

[![A diagram illustrates sign language with a torso, hands, and blue lines indicating 'SPACE' and 'TIME,' beside blue text stating 'Sign language is four-dimensional.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-design-for-with-deaf-people/1-sign-language.jpg)](https://files.smashing.media/articles/how-design-for-with-deaf-people/1-sign-language.jpg)

Sign language is 4-dimensional, including 3D space and time, and often includes facial expressions, too. From a wonderful talk by [Marie van Driessche](https://www.youtube.com/watch?v=M0cR_HTeWUo). ([Large preview](https://files.smashing.media/articles/how-design-for-with-deaf-people/1-sign-language.jpg))

## Deafness Is A Spectrum

Deafness spans a **broad continuum**, from minor to profound hearing loss. Around 90–95% of deaf people [come from hearing families](https://scholarworks.wmich.edu/jssw/vol51/iss1/11/), and deafness often isn’t merely a condition that people are born with. It frequently occurs due to **exposure to loud noises**, and it also emerges with age, disease, and accidents.

[![A chart showing sound frequencies and decibel levels, illustrating types of hearing loss and common everyday sounds.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-design-for-with-deaf-people/2-chart-sound-frequencies-decibel-levels.jpg)](https://www.didyousaydeaf.com/hearing-loss-and-how-hearing-loss-works)

A [chart](https://www.didyousaydeaf.com/hearing-loss-and-how-hearing-loss-works) showing sound frequencies and decibel levels, illustrating types of hearing loss and common everyday sounds. ([Large preview](https://files.smashing.media/articles/how-design-for-with-deaf-people/2-chart-sound-frequencies-decibel-levels.jpg))

The loudness of sound is measured in units called **decibels (dB)**. Everybody is on the [spectrum of deafness](https://www.didyousaydeaf.com/hearing-loss-and-how-hearing-loss-works), from normal hearing (up to 15 dB) to profound hearing loss (91+ dB):

-   **Slight Hearing Loss**, 16–25 dB  
    At 16 dB hearing loss, a person can miss up to 10% of speech when a speaker is at a distance greater than 3 feet.
-   **Mild hearing loss**, 26–40 dB  
    Soft sounds are hard to hear, including whispering, which is around 40 dB in volume. It’s more difficult to hear soft speech sounds spoken at a normal volume. At 40dB hearing loss, a person may miss 50% of meeting discussions.
-   **Moderate hearing loss**, 41–55 dB  
    A person may hear almost no speech when another person is talking at normal volume. At a 50dB hearing loss, a person may not pick up to 80% of speech.
-   **Moderately Severe Hearing Loss**, 56–70 dB  
    A person may have problems hearing the sounds of a dishwasher (60dB). At 70 dB, they might miss almost all speech.
-   **Severe Hearing Loss**, 71–90 dB  
    A person will hear no speech when a person is talking at a normal level. They may hear only some very loud noises: vacuum (70 dB), blender (78 dB), hair dryer (90 dB).
-   **Profound Hearing Loss**, 91+ dB  
    Hear no speech and at most very loud sounds such as a music player at full volume (100 dB), which would be damaging for people with normal hearing, or a car horn (110 dB).

It’s worth mentioning that loss of hearing can also be situational and temporary, as people with “normal” hearing (0 to 25 dB hearing loss) will always encounter situations where they can’t hear, e.g., due to **noisy environments**.

## Useful Things To Know About Deafness

Assumptions are always dangerous, and in the case of deafness, there are quite a few that aren’t accurate. For example, most deaf people actually do not know a sign language — it’s only around [1% in the US](https://www.accessibility.com/blog/do-all-deaf-people-use-sign-language).

Also, despite our expectations, there is actually **no universal sign language** that everybody uses. For example, British signers often cannot understand American signers. There are globally around [300 different sign languages](https://education.nationalgeographic.org/resource/sign-language/) actively used.

> “We never question making content available in different written or spoken languages, and the same should apply to signed languages.”
> 
> — [Johanna Steiner](https://www.linkedin.com/feed/update/urn:li:activity:7178702360649547778?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7178702360649547778%2C7178776416979718144%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287178776416979718144%2Curn%3Ali%3Aactivity%3A7178702360649547778%29)

[![Three smartphone screens displaying parts of a podcast app, including a browsing page, a now-playing screen with an avatar, and a live transcription feature.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-design-for-with-deaf-people/3-heardio.jpg)](https://uxplanet.org/podcasts-for-the-deaf-d4d9b5f3ce99)

[Heardio](https://uxplanet.org/podcasts-for-the-deaf-d4d9b5f3ce99) concept: making podcasts accessible for deaf people â€” with live transcription and sign language avatars. ([Large preview](https://files.smashing.media/articles/how-design-for-with-deaf-people/3-heardio.jpg))

Sign languages are [not just gestures or pantomime](https://www.youtube.com/watch?v=M0cR_HTeWUo&t=188). They are **4D spatial languages** with their own grammar and syntax, separate from spoken languages, and they don’t have a written form. They rely heavily on facial expression to convey meaning and emphasis. And they are also not universal — every country has its own sign language and dialects.

-   You can only understand **30% of words** via lip-reading.
-   Most deaf people do not know any **sign language**.
-   Many sign languages have local dialects that can be hard to interpret.
-   Not all deaf people are fluent signers and often rely on **visual clues**.
-   For many deaf people, a spoken language is their **second language**.
-   [**Sign language is 4-dimensional**](https://www.youtube.com/watch?v=M0cR_HTeWUo), incorporating 3D space, time and also facial expressions.

## How To Communicate Respectfully

Keep in mind that many deaf people use the spoken language of their country as **their second language**. So to communicate with a deaf person, it’s best to ask in writing. Don’t ask how much a person can understand, or if they can lip-read you.

However, as Rachel Edwards [noted](https://www.linkedin.com/posts/rachel-edwards-scotland_excellent-overview-on-designing-for-ddeaf-activity-7409172866983804928-489h?utm_source=share&utm_medium=member_desktop&rcm=ACoAAACDcgQBa_vsk5breYKwZAgyIhsHtJaFbL8), don’t assume someone is comfortable with written language because they are deaf. Sometimes their literacy may be low, and so providing information as text and assuming that covers your deaf users might not be the answer.

Also, don’t assume that every deaf person can lip-read. You can see only about 30% of words on someone’s mouth. That’s why many deaf people need **additional visual cues**, like text or cued speech.

[![Seven accessibility symbols for people with hearing loss are displayed: International Symbol of Access, assistive listening devices, telephone typewriter, volume control telephone, sign language interpretation, closed captioning, and open captioning.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-design-for-with-deaf-people/4-accessibility-symbols.png)](https://www.healthyhearing.com/report/52264-Universal-signs-for-hearing-loss)

7 accessibility symbols for people with hearing loss. [Universal signs for hearing loss](https://www.healthyhearing.com/report/52264-Universal-signs-for-hearing-loss). ([Large preview](https://files.smashing.media/articles/how-design-for-with-deaf-people/4-accessibility-symbols.png))

It’s also crucial to use **respectful language**. Deaf people do not always see themselves as _disabled_, but rather as a cultural linguistic minority with a unique identity. Others, as Meryl Evan has [noted](https://www.linkedin.com/feed/update/urn:li:activity:7178702360649547778?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7178702360649547778%2C7178721132345270272%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287178721132345270272%2Curn%3Ali%3Aactivity%3A7178702360649547778%29), don’t identify as _deaf_ or _hard of hearing_, but rather as “hearing impaired”. So, it’s mostly up to an individual how they want to identify.

-   **Deaf** (Capital ‘D’)  
    Culturally Deaf people who have been deaf since birth or before learning to speak. Sign language is often the first language, and written language is the second.
-   **deaf** (Lowercase ‘d’)  
    People who developed hearing loss later in life. Used by people who feel closer to the hearing/hard-of-hearing world and prefer to communicate written and/or oral.
-   **Hard of Hearing**  
    People with mild to moderate hearing loss who typically communicate orally and use hearing aids.

In general, **avoid hearing impairment** if you can, and use _Deaf_ (for those deaf for most of their lives), _deaf_ (for those who became deaf later), or _hard of hearing_ (HoH) for partial hearing loss. But either way, ask politely first and then respect the person’s preferences.

## Practical UX Guidelines

When designing UIs and content, consider these key accessibility guidelines for deaf and hard-of-hearing users:

[![An infographic on a teal background titled 'Designing for users who are deaf or hard of hearing,' listing 'Do's and Don'ts' with icons.](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://files.smashing.media/articles/how-design-for-with-deaf-people/5-designing-deaf-users.jpg)](https://prospect.org.uk/article/designing-content-for-users-who-are-deaf-or-hard-of-hearing/)

How to design for users who are deaf or hard of hearing, a Gov.uk-inspired poster by [Prospect.org.uk](https://prospect.org.uk/article/designing-content-for-users-who-are-deaf-or-hard-of-hearing/). [Download a printable PDF](https://d28j9ucj9uj44t.cloudfront.net/uploads/2021/09/Designing_for_accessibility6.pdf). ([Large preview](https://files.smashing.media/articles/how-design-for-with-deaf-people/5-designing-deaf-users.jpg))

1.  **Don’t make the phone required** or the only method of contact.
2.  **Provide text alternatives** for all audible alerts or notices.
3.  **Add haptic feedback** on mobile (e.g., vibration patterns).
4.  **Ensure good lighting** to help people see facial expressions.
5.  **Circular seating** usually works better, so everyone can see each other’s faces.
6.  **Always include descriptions of non-spoken sounds** (e.g., rain, laughter) in your content.
7.  **Add a transcript and closed captions** for audio and video.
8.  **Clearly identify each speaker** in all audio and video content.
9.  **Design multiple ways to communicate** in every instance (online + in-person).
10.  **Invite video participants to keep the camera on** to facilitate lip-reading and the viewing of facial expressions, which convey tone.
11.  **Always test products with the actual community**, instead of making assumptions for them.

## Wrapping Up

I keep repeating myself like a broken record, but better accessibility **always benefits everyone**. When we improve experiences for some groups of people, it often improves experiences for entirely different groups as well.

As Marie Van Driessche rightfully noted, to design a great experience for accessibility, we must design **with** people, rather than _for_ them. And that means always include people with **lived experience of exclusion** into the design process — as they are the true experts.

> [Accessibility never happens by accident — it’s a deliberate decision and a commitment.](https://twitter.com/share?text=%0aAccessibility%20never%20happens%20by%20accident%20%e2%80%94%20it%e2%80%99s%20a%20deliberate%20decision%20and%20a%20commitment.%0a&url=https://smashingmagazine.com%2f2025%2f12%2fhow-design-for-with-deaf-people%2f)
> 
> “

No digital product is neutral. There must be a deliberate effort to make products and services more accessible. Not only does it benefit everyone, but it also shows what a company stands for and values.

And once you do have a commitment, it will be so much easier to **retain accessibility** rather than adding it last minute as a crutch — when it’s already too late to do it right and way too expensive to do it well.

## Meet “Smart Interface Design Patterns”

You can find more details on **design patterns and UX** in [**Smart Interface Design Patterns**](https://smart-interface-design-patterns.com/), our **15h-video course** with 100s of practical examples from real-life projects — with a live UX training later this year. Everything from mega-dropdowns to complex enterprise tables — with 5 new segments added every year. [Jump to a free preview](https://www.youtube.com/watch?v=jhZ3el3n-u0). Use code [**BIRDIE**](https://smart-interface-design-patterns.com/) to **save 15%** off.

[![Smart Interface Design Patterns](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/7cc4e1de-6921-474e-a3fb-db4789fc13dd/b4024b60-e627-177d-8bff-28441f810462.jpeg)](https://smart-interface-design-patterns.com/)

Meet [Smart Interface Design Patterns](https://smart-interface-design-patterns.com/), our video course on interface design & UX.

## Useful Resources

-   [Designing For Deaf People Helps Everyone](https://www.youtube.com/watch?v=M0cR_HTeWUo), by Marie Van Driessche
-   “[Design considerations for the Deaf, deaf, and hard of hearing](https://medium.com/@paulrobwest/ux-ui-design-considerations-for-the-deaf-deaf-and-hard-of-hearing-dbfe28850fbe)”, by Paul Roberts
-   [Beyond Video Captions and Sign Language](https://www.youtube.com/watch?v=AEXKOASrTVM), by Svetlana Kouznetsova
-   “[Best Practices For CC and Subtitles UX](https://www.smashingmagazine.com/2023/01/closed-captions-subtitles-ux/)”, by Vitaly Friedman
-   [Web Accessibility for Deaf Users](https://www.accessi.org/blog/web-accessibility-for-deaf-users/)
-   [Inclusive Design Toolkit: Hearing](https://www.inclusivedesigntoolkit.com/UChearing/hearing.html)
-   “[What It’s Like To Be Born Hard of Hearing](https://funkybrownchick.substack.com/p/i-hear-you-really-i-do-)”, by Twanna A. Hines, M.S.
-   “[Accessibility: Podcasts for the deaf](https://uxplanet.org/podcasts-for-the-deaf-d4d9b5f3ce99)”, by Mubarak Alabidun

### Useful Books

-   [_Sound Is Not Enough_](https://audio-accessibility.com/book/), by Svetlana Kouznetsova
-   _Mismatch: How Inclusion Shapes Design_, by Kat Holmes
-   _Building for Everyone: Extend Your Product’s Reach Through Inclusive Design_ (+ [free excerpt](https://design.google/library/building-for-everyone)), by Annie Jean-Baptiste

![Smashing Editorial](https://www.smashingmagazine.com/images/logo/logo--red.png) (yk)