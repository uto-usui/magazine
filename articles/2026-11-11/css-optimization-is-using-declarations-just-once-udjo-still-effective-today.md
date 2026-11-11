---
title: "CSS Optimization: Is Using Declarations Just Once (UDJO) Still Effective Today?"
source: "https://css-tricks.com/css-using-declarations-just-once/"
publishedDate: "2026-11-10"
category: "css"
feedName: "css-tricks"
author: "Jens Oliver Meiert"
---

CSS optimization is a deceptive topic. On the one hand, it feels like something simple that we should already have all the tooling for — especially when it comes to minification. On the other hand, the idea that we already exploited “everything” there is around CSS optimization may be considered naive. Such a claim looks hard to defend for a language that evolves almost daily.

In this article, I’d like to pick a technique that’s at least [18 years old](https://meiert.com/blog/css-organization-and-efficiency/) — UDJO, or “using declarations just once.”

Aware of an older source? Please comment!

The technique is inspired by the principle of DRY, [“don’t repeat yourself”](https://webglossary.info/terms/dont-repeat-yourself/), in that it works by identifying and reducing (if not eliminating) declaration repetition.

So, if there’s something like `display: flex` and it appears two or more times, it gets reconciled in one rule:

```
.example {
  display: flex;
}

.sample {
  display: flex;
}
```

…becomes:

```
.example,
.sample {
  display: flex;
}
```

The outcome of the technique depends on how intelligently the deduplication is done and how long the selectors are. Intelligence determines if UDJO leads to an _actual_ maintainability advantage — can the change of a declaration really be done to all the selectors attached? And the selector length influences how big file size savings are.

If you’re interested, my article on [“DRY CSS”](https://meiert.com/blog/dry-css/) describes the mechanics in more detail. The question here is: _Is UDJO still effective and still relevant today?_

## Better Deduplicating Through Tooling

When we try to answer this question, however, we end up with a problem: When sites are complex and their style sheet declarations have not been de-duplicated before, UDJO can require a lot of work.

To save some time, I built tooling for this work. While it didn’t seem like it would immediately be as comprehensive as manually going through and testing style sheets, it seemed realistic enough that a tool could catch _some_ repetition.

Skipping ahead, I created [CSS Dedup](https://github.com/j9t/css-dedup) not only to identify repetition, but also to deduplicate what could safely be optimized (CSS Dedup has [some documentation](https://github.com/j9t/css-dedup#how-it-works) on this but in essence, deduplication affects selector locations, which is part of [how the cascade works](https://www.w3.org/TR/css-cascade-5/#cascade-order)). This, then, gives us some data:

## Is There Anything to Deduplicate in Modern CSS?

For the first batch, I arbitrarily picked 20 websites to analyze. I then used CSS Dedup to check what the file size changes would be if we deduplicated what seemed _provably_ safe, and also what seemed _probably_ safe, but only if it led to file size savings.

I picked those two options to provide the “natural” result of deduplication, but also the one site owners may be most interested in to reduce repetition but also decrease transfer size. After all, UDJO as a CSS optimization technique can improve both maintainability and performance.

Here are the findings:

Site

UDJO Effect (External Style Sheets) (`-f`)

Aggressive With Savings Only (`-f -a -s`)

[12371.cn](https://www.12371.cn/)

+2.9 KB (+14.3%)

\-45 B (-0.2%)

[ccc.de](https://www.ccc.de/)

+0.8 KB (+2.2%)

\-0.1 KB (-0.3%)

[commission.europa.eu](https://commission.europa.eu/)

+64.9 KB (+6.4%)

\-51.9 KB (-5.1%)

[die-linke.de](https://die-linke.de/)

+104.0 KB (+20.5%)

\-21.2 KB (-4.2%)

[diem25.org](https://diem25.org/)

+40.5 KB (+10.7%)

\-4.4 KB (-1.2%)

[eff.org](https://www.eff.org/)

+120.8 KB (+27.7%)

\-8.5 KB (-2.0%)

[en.mfa.ir](https://en.mfa.ir/)

+58.7 KB (+5.1%)

\-51.2 KB (-4.5%)

[euroveg.eu](https://www.euroveg.eu/)

+78.8 KB (+9.3%)

\-12.4 KB (-1.5%)

[globalsumudflotilla.org](https://www.globalsumudflotilla.org/)

\-17.0 KB (-6.5%)

\-18.7 KB (-7.2%)

[gruene.de](https://www.gruene.de/)

+1.6 KB (+1.1%)

\-0.7 KB (-0.5%)

[icanw.org](https://www.icanw.org/)

+5.5 KB (+2.9%)

\-3.5 KB (-1.8%)

[laquadrature.net](https://www.laquadrature.net/)

+14.0 KB (+4.2%)

\-3.0 KB (-0.9%)

[middleeasteye.net](https://www.middleeasteye.net/)

+60.9 KB (+8.6%)

\-20.5 KB (-2.9%)

[movimientosumar.es](https://movimientosumar.es/)

+98.8 KB (+13.6%)

\-5.0 KB (-0.7%)

[nam.go.ug](https://nam.go.ug/)

+84.5 KB (+9.2%)

\-53.9 KB (-5.9%)

[oic-oci.org](https://www.oic-oci.org/)

\-6.3 KB (-4.0%)

\-9.3 KB (-6.0%)

[podemos.info](https://podemos.info/)

+23.2 KB (+5.5%)

\-6.0 KB (-1.4%)

[taxmenow.eu](https://www.taxmenow.eu/)

+1.7 KB (+2.1%)

\-4.0 KB (-4.6%)

[unrwa.org](https://www.unrwa.org/)

+87.4 KB (+13.2%)

\-4.8 KB (-0.7%)

[veganeurope.eu](https://www.veganeurope.eu/)

+37.3 KB (+17.7%)

\-1.3 KB (-0.6%)

**Important note:** These values cannot be used to tell CSS _quality_—they depend on selector length and also on verifying if deduplication, in the respective case, actually leads to better maintainability. Also note that this leaves out changes after compression—this was not part of the experiment but would be fair to test, too.

What can we tell from this?

-   In all of the **20 cases**, we’re able to reduce declaration repetition.
-   In **18 cases**, reducing declaration repetition leads to a file size increase (due to selector repetition and selectors being longer than the declarations saved).
-   However, in **all cases**, declaration repetition can be reduced in a manner that also reduces file size (by virtue of only deduplicating style sheets that lead to such savings).

For the question whether UDJO still works today, this should be a _yes_. It works as well as to even come with file size savings.

Maybe you’re curious, too, about what the situation looks like in our field, among web developers. Let’s take some samples on this, too.

Site

UDJO Effect (External Style Sheets) (`-f`)

Aggressive With Savings Only (`-f -a -s`)

[bram.us](https://www.bram.us/)

+19.6 KB (+7.3%)

\-4.2 KB (-1.6%)

[ishadeed.com](https://ishadeed.com/)

+4.2 KB (+11.4%)

\-0.2 KB (-0.5%)

[joshwcomeau.com](https://www.joshwcomeau.com/)

\-2.7 KB (-3.8%)

\-5.0 KB (-7.2%)

[kevinpowell.co](https://www.kevinpowell.co/)

+0.1 KB (+0.6%)

\-0.1 KB (-0.5%)

[kizu.dev](https://kizu.dev/)

+1.0 KB (+1.7%)

\-0.1 KB (-0.2%)

[lea.verou.me](https://lea.verou.me/)

\-0.4 KB (-1.4%)

\-0.6 KB (-2.3%)

[miriamsuzanne.com](https://www.miriamsuzanne.com/)

\-0.2 KB (-0.5%)

\-0.7 KB (-2.0%)

[paul.kinlan.me](https://paul.kinlan.me/)

+3.3 KB (+8.0%)

\-1.0 KB (-2.4%)

[pawelgrzybek.com](https://pawelgrzybek.com/)

\-0.5 KB (-2.7%)

\-0.7 KB (-4.3%)

[sarasoueidan.com](https://www.sarasoueidan.com/)

\-2.9 KB (-7.3%)

\-4.5 KB (-11.1%)

What does this data show?

-   Just as with organizations, on every site there’s some declaration repetition safe to remove.
-   In 5 cases (50% compared to 90%), reducing repetition leads to a file size increase.
-   Yet in all cases again, repetition can also be reduced in a way that leads to file size savings.

It would be valuable to expand this analysis to take more samples and investigate the differences across samples, but there may be something to web professionals using shorter selectors so as to be able to benefit _more_ from UDJO.

## On the Effectiveness of UDJO as a CSS Optimization Technique

As mentioned at the beginning, UDJO’s effectiveness generally depends on the kind of repetition as well as on the length of selectors.

This can be managed, however: While tools like CSS Dedup make no difference between declaration use cases (and are therefore blunt), it is possible to configure them so as to reap the performance benefits.

As the data taken for this article suggest, file size savings may be achieved in most cases. Considering that this is based on safe changes, this means a low-cost performance optimization vector — especially when applied to minified output. It’s still a good idea to couch that against the use of further compression (e.g. gzip/Brotli), but at face value, deduplication shows how it can reduce the size of CSS.

For anyone generally interested in CSS optimization, maintainability, and performance, UDJO should probably be part of the overall approach to CSS. But since the technique has been niche and since tooling is new, I invite you to review, test, and explore this vector. It seems hard to argue that we have reached the ceiling of how far we can take CSS optimization.