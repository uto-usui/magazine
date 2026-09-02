---
title: "Evaluating a Success Criterion"
source: "https://adrianroselli.com/2026/09/evaluating-a-success-criterion.html"
publishedDate: "2026-09-01"
category: "accessibility"
feedName: "Adrian Roselli"
author: "Adrian Roselli"
---

![Gouache and watercolor drawing of a white man in a deer stalker cap and long coat leans forward in a private train car seat, pointing to papers in his hand, while across from him sits a white man in a suit, frock coat, and derby, leaning back to listen while holding a pipe.](https://adrianroselli.com/wp-content/uploads/2026/08/holmes-w3c.jpg)

Sidney Paget illustration of Sherlock Holmes from Strand Magazine, December 1892, p.646, but I added papers from his March 1893 (p.281 of Strand Magazine) illustration and then two versions of the W3C logo to the front page.

When performing a WCAG evaluation (or review or audit), it’s easy to get caught up in the intent versus meaning of a particular Success Criterion. Especially when that SC was written before the interface pattern you’re poking was conceived.

Until, and even when, you have built your own (potentially localized) references for how to apply an SC to whatever situation, it’s best to have a plan for how to interpret the uninterpretable.

## Steps

This is my progressive series of steps for getting the W3C’s most current (and soon-to-be-current) position on any SC.

1.  Read the W3C’s normative text (the “official” requirements) in the [WCAG spec](https://www.w3.org/TR/WCAG22/).
    -   Always look at the latest, which is WCAG 2.2 at the time of this writing.
    -   Make sure you’re at a w3.org site, not some scammy site like wcag.info or a corporate-owned domain playing off the W3C spec like wcag.com.
2.  Read the [W3C Understanding document](https://www.w3.org/WAI/WCAG22/Understanding/) (the supporting material) for the SC you’re evaluating.
    -   These often have linked references in the form of…
3.  [W3C Techniques documents](https://www.w3.org/WAI/WCAG22/Techniques/) collect known failures along with passing and bonus methods.
    -   Some are out of date or refer to technologies that have been superseded or failed to work as hoped, so be cautious.
    -   A single Technique document might apply to multiple SCs.
4.  Look at [WCAG GitHub issues](https://github.com/w3c/wcag/issues).
    -   Pay attention to dates, linked issues & PRs, embedded meeting minutes, and decisions.
    -   Look for the closed issues, as those are often decided answers (the issues that aren’t from spambots).
5.  Look at [WCAG GitHub pull requests](https://github.com/w3c/wcag/pulls), even if they never merge.
    -   Pay attention to dates, linked issues & PRs, and embedded meeting minutes.
    -   Look for the closed PRs, as the ones that _didn’t_ merge often have good discussions
6.  Look at [GitHub WCAG discussions](https://github.com/w3c/wcag/discussions), few though there are.
    -   If you find an unanswered one that maps to your question, maybe comment.
7.  Look at personal blogs of trusted experts, some of whom are often those working on the specs and who give their own insights.
    -   Be cautious of blogs promoting an agenda or arguing for an SC interpretation without supporting evidence. [Pat goes into detail in a 2025 talk](https://youtu.be/sFDQUd_CjDE) and [more recent slides](https://patrickhlauke.github.io/wcag-interpretation/).
    -   This applies to those justifying the bare minimum to pass an SC via loopholes or gaps, in some cases as adversarial or malicious conformance. [I have a few posts on that](https://adrianroselli.com/tag/adversarial).

No matter what outcome you find, test everything anyway. New releases are constant, regressions common, new support happens, and user expectations shift.

It’s possible you find that a W3C answer to a failure condition creates a worse experience when remediated ([orange](https://adrianroselli.com/2026/04/wcag3-contrast-as-of-april-2026.html)). At which point, all the research you’ve done will make it easier to justify if you need to break from the W3C position.