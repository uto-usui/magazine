---
title: "Fontastic Space"
source: "https://fontastic.space/"
publishedDate: "2026-05-21"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

Anatomical Comparison

Ascender

Cap Height

x-Height

Baseline

Descender

A — Playfair Display

Handgloves

Base

Cap 51

x 37

Asc 56

Desc 14

B — DM Sans

Handgloves

Base

Cap 50

x 36

Asc 52

Desc 17

Pairing ScorePlayfair Display + DM Sans

92

Excellent

Harmony

x-Height

99

Cap Height

100

Proportions

86

Width

100

Contrast

Category

60

Weight

15

Stroke

98

Quality

98

Inverted-U: moderate contrast scores highest

Style

Stress

100

Openness

82

Roundness

55

Terminals

30

Compat.

70

Visual personality similarity

Analysis

-   x-heights are well matched, ensuring visual cohesion at the same point size (Lupton).
-   Cap heights align closely, reinforcing a shared vertical grid.
-   Similar character widths and rhythm help the fonts flow together in running text.
-   Cross-category pairing (e.g. serif + sans) provides clear typographic hierarchy.
-   Balanced ascender/descender proportions anchor the pairing vertically.
-   Contrast level is in the optimal range — different enough to be interesting, similar enough to be cohesive (Fontjoy).

Based on: O'Donovan et al. (SIGGRAPH 2014), Fontjoy/Zhao inverted-U model, Bringhurst concordance/contrast framework, PANOSE-1 classification, OS/2 table metrics

MetricsSource: OpenType tables

Cap Height — Playfair Display

51px

Cap Height — DM Sans

50px(-1px)

x-Height — Playfair Display

37px

x-Height — DM Sans

36px(-1px)

x / Cap Ratio — Playfair Display

72.6%

x / Cap Ratio — DM Sans

72.0%(-0.6%)

Descender — Playfair Display

14px

Descender — DM Sans

17px(+3px)

Ascender — Playfair Display

56px

Ascender — DM Sans

52px(-5px)

String Width — Playfair Display

377px

String Width — DM Sans

385px(+8px)

Weight Range

Playfair Display

300Aa

400Aa

500Aa

600Aa

700Aa

800Aa

DM Sans

300Aa

400Aa

500Aa

600Aa

700Aa

800Aa

Paragraph Preview — 16px

Playfair Display

Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.

DM Sans

Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.

Use Case — Hero Banner

AWtLs0px

BWtLs0px

Playfair Display — headline · 700 · 0pxDM Sans — body · 400 · 0px

Copy CSS

HTML Import

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;600&display=swap" rel="stylesheet">

CSS Rules

/\* Headings \*/
h1, h2, h3 {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  letter-spacing: 0px;
}

/\* Body \*/
body, p, span {
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  letter-spacing: 0px;
}

/\* Button / CTA \*/
.btn {
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}