---
title: "Expansion artifacts"
source: "https://mattstromawn.com/writing/expansion-artifacts/"
publishedDate: "2026-04-21"
category: "design"
feedName: "Sidebar"
---

The information age has been defined by bandwidth. The internet is limited by how much data we can squeeze into the narrow pipes of transmission infrastructure. So we invented _compression_, ways of representing the same object — a website, a picture, a song, a movie — within ever smaller digital footprints. YouTube, Spotify, Instagram, and the algorithms that make them work, wouldn’t be possible without it.

From the very first studies into compression (at Bell Labs in the 1940s), researchers knew they’d have to accept a tradeoff: you can achieve smaller file sizes if you’re willing to accept some loss of the original data. This seems counterproductive, since the whole idea is to reproduce the data, but scientists found ways to only discard information that is imperceptible to humans.

-   Our ears and brains tend to ‘filter out’ quiet sounds overshadowed by loud sounds. MP3s take advantage of this blind spot by stripping out the quiet bits we wouldn’t be likely to hear anyway.
-   Our eyes and brains focus on the contrast between bright and dark shapes, reading the broad structure of images rather than granular details or tiny color variations. The JPG algorithm compresses files by throwing away information we don’t tend to process.
-   Movies don’t actually change that much frame-to-frame. The MPG algorithm carefully chooses key frames and saves the _relative motion_ of each pixel, making movie files much smaller in the process.

A well-designed compression algorithm keeps data _perceptually_ identical while making files much more efficient to store and transmit.

A poorly designed codec can go catastrophically wrong. In 2013, David Kriesel scanned a building floor plan on a Xerox WorkCentre and noticed that a room marked 21.11m² had become 14.13m². Xerox’s implementation of the JBIG2 compression format saves space by quilting scans together from common, repeated elements; in Kriesel’s scan, it had silently replaced the original numbers with ones from another part of the document it deemed visually similar enough. After Kriesel published, reports surfaced of the same silent substitution affecting building plans, invoices, and medical records.[1](#fn1)

Compression always changes data permanently. Common formats (JPG, MP3, MP4) make changes slowly and gently: it usually takes hundreds of cycles of saving, sharing, and re-uploading before the tool marks, called _compression artifacts_, become apparent. [Re-save a JPG enough times](https://www.youtube.com/watch?v=jjhomJ04S18) and it goes blocky and washed out; [iterate an MP3](https://parkerhiggins.net/2015/10/mad-generation-loss/) and metallic tones bleed through the music; [re-upload a YouTube video a thousand times](https://www.youtube.com/watch?v=icruGcSsPp0) and you end up with a blobby mess over unintelligible audio.

If you know what to look for and how to look for it, you can learn a lot about the path that data took to get to you. That’s because compression artifacts are in turn **meta-information**; you can learn something new about a document by identifying and cataloging its algorithm-induced flaws. Digital forensics uses this meta-information to explore the provenance of documents, photos and videos. Compression leaves breadcrumbs that betray whether or not a document has been edited (and often who, or what, edited it).

Compression artifacts can even become an aesthetic of their own. Deep-fried memes dress images up in the aesthetics of pictures that have been shared and re-shared thousands of times. Datamoshing manipulates compression algorithms to create entirely new video aesthetics. Glitch music stretches and squashes audio files, making the tool marks of audio compression audible and even musical.

* * *

Compression has spawned entire fields of art and science ([and jokes](https://www.youtube.com/watch?v=0rhdOt9bOHE)) all in service of the ideal compromise between fidelity and file size.

Three years ago, [Ted Chiang described ChatGPT as a blurry JPEG of the web](https://www.newyorker.com/tech/annals-of-technology/chatgpt-is-a-blurry-jpeg-of-the-web). LLMs are a lossy compression of their training data, which is itself a lossy sample of all the data available to it. But the artifacts we see in AI slop aren’t in the compression. They’re in the decompression.

Every AI-generated output is an extrapolation from that blurry source, vectored toward your prompt, filling in plausible detail where the compression threw information away. The output gets inflated into blog posts and LinkedIn thoughtspam, software platforms, omnichannel advertising campaigns, and movie cameos from dead actors. Chiang compared the gaps and confabulations to compression artifacts.

I think they’re expansion artifacts.

* * *

What do expansion artifacts look like?

-   LLMs produce text stuffed with hedging verbs and fuzzing adjectives (_delve, intricate, tapestry, multifaceted_). Their paragraphs are structured as miniature essays with setup, payoff, and a signposted takeaway (_This matters because…_).
-   AI-generated code over-comments the obvious and creates error handlers for operations that can’t logically fail.
-   Image generators have had their own tells: six-fingered hands, symmetrical-but-stylistically-objectionable jewelry, text that looks like text but only if you cross your eyes.
-   Video models struggle with continuity. Limbs appear and disappear, objects clip through each other, and physics sometimes just switches off.

Each of these artifacts is the training distribution leaking through where the model’s confidence runs thin. Like compression artifacts, they double as forensic markers. In 2024, Stanford researchers tracked AI contributions to academic writing by watching for words whose frequency spiked after ChatGPT’s release (_commendable, meticulous, pivotal, showcasing,_ etc.). They estimated that 17.5% of recent computer science papers and 16.9% of peer review text contain AI-drafted content. Sometimes the tells are less subtle: one paper in an Elsevier journal opened with “Certainly, here is a possible introduction for your topic.”[2](#fn2)

Expansion artifacts will become aesthetic choices, too. [Shrimp Jesus](https://www.trend-mill.com/p/shrimp-jesus-is-the-future-of-social) is my favorite, the kind of insane imagery that only an LLM would create. Power users of AI website generators (AI-pilled designers) already know how to recognize the tool marks, if only to try to prompt them away: purple gradients are an especially common tell. But as more and more non-designers use tools like Claude Design to prompt their way to fully-functional software products, I expect to see a _preference_ for the aesthetic convergence endemic to the current crop of AI models.[3](#fn3)

> I'd like to formally apologize for making every button in Tailwind UI \`bg-indigo-500\` five years ago, leading to every AI generated UI on earth also being indigo. [https://t.co/StJ0UjKRhK](https://t.co/StJ0UjKRhK)
> 
> — Adam Wathan (@adamwathan) [August 7, 2025](https://twitter.com/adamwathan/status/1953510802159219096?ref_src=twsrc%5Etfw)

Expansion artifacts get genuinely dangerous when they compound, when one AI generation becomes the input to another, and another, and another. In February, an autonomous openclaw agent [published a hit piece on Scott Shambaugh](https://theshamblog.com/an-ai-agent-published-a-hit-piece-on-me/), a maintainer of the popular matplotlib Python library, for rejecting its code. Benj Edwards then reported the story for Ars Technica, but used AI to help him write; unsurprisingly, [his article contained hallucinated quotes](https://theshamblog.com/an-ai-agent-published-a-hit-piece-on-me-part-2/).

This kind of Gell-Mann Amnesia for expansion artifacts leads to runaway feedback loops:

1.  A CEO dictates a five-minute voice memo
2.  Claude expands it into a strategy doc
3.  Notion’s AI turns the strategy doc into product specs
4.  Cursor vibe-codes a prototype
5.  Devin gives feedback on the PR
6.  ChatGPT writes the launch copy
7.  Intercom’s Fin support agent fields support questions.

Every stage interpolates the previous context with data pulled from the blurry JPEG of its training distribution.

The real danger happens when expansion artifacts show up in the training data for the next generation of generative AI. While anomalous tokens like [SolidGoldMagikarp](https://www.lesswrong.com/posts/aPeJE8bSo6rAFoLqg/solidgoldmagikarp-plus-prompt-generation) broke early models open and spread their guts out on the operating table, new models get rigorously evaluated, making it harder to see where the errors are hiding. The long tail in the distribution (quiet voices, the weird and novel phrasings, unusual and challenging ideas) fade as each successive model converges toward a homogenized — perhaps hallucinated — center. The blurry JPEG gets blurrier every cycle, leaving more and more room for nonsensical and false material to fill the voids between the tokens.

Compression made the information age possible by stripping things down to fit the pipes. Expansion made the AI age possible by blowing data back up again. Both operations leave marks; we’ve learned to spot compression artifacts, but we’ve only just begun to reckon with expansion artifacts. Until we do, there’s a lot of risk to manage.

_Special thanks to [Josh Petersel](https://joshpetersel.com/) for feedback on a draft of this essay._

I'll send new posts to your inbox, along with links to related content and a song recommendation or two.

1.  Kriesel, David. 2013. “Xerox Scanners/Photocopiers Randomly Alter Numbers in Scanned Documents.” _D. Kriesel_ (blog), August 2, 2013. [https://www.dkriesel.com/en/blog/2013/0802\_xerox-workcentres\_are\_switching\_written\_numbers\_when\_scanning](https://www.dkriesel.com/en/blog/2013/0802_xerox-workcentres_are_switching_written_numbers_when_scanning). [↩︎](#fnref1)
    
2.  Liang, Weixin, Yaohui Zhang, Zhengxuan Wu, Haley Lepp, Wenlong Ji, Xuandong Zhao, Hancheng Cao, Sheng Liu, Siyu He, Zhi Huang, Diyi Yang, Christopher Potts, Christopher D. Manning, and James Y. Zou. 2024. “Mapping the Increasing Use of LLMs in Scientific Papers.” Preprint, submitted April 1, 2024. [https://doi.org/10.48550/arXiv.2404.01268](https://doi.org/10.48550/arXiv.2404.01268). [↩︎](#fnref2)
    
3.  [Copying is the way design works](https://mattstromawn.com/writing/copying/). [↩︎](#fnref3)