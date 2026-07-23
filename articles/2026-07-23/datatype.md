---
title: "Datatype"
source: "https://franktisellano.github.io/datatype/"
publishedDate: "2026-07-22"
category: "design"
feedName: "Sidebar"
---

A variable font that turns text into charts.

{b:20,55,40,80,65}   {l:10,40,25,70,50,90}   {p:73}   {b:85,30,60,10,45}   {l:50,20,80,35,65,10}   {p:41}

[GitHub★](https://github.com/franktisellano/datatype) [Google Fonts](https://fonts.google.com/specimen/Datatype)

## Datatype is data as type

Datatype is an OpenType variable font that turns simple text expressions into inline charts. No JavaScript, no images, no rendering library — just type the syntax and Datatype's ligature substitution does the rest.

{b:30,70,50,90}

`{b:30,70,50,90}`

Bar chart

{l:10,50,30,80,20}

`{l:10,50,30,80,20}`

Sparkline

{p:65}

`{p:65}`

Pie chart

## Datatype is a variable font

Two axes give you control over chart density and weight. Drag the sliders to see charts respond in real time.

Width

50

Weight

400

Size

{b:15,45,80,30,60,90,20}   {l:5,35,20,70,45,85,30,60}   {p:52}

## Datatype at different sizes

The same expressions rendered from 14px to 64px.

14px {b:30,70,20,90}   {l:20,50,30,80,10}   {p:65}

18px {b:30,70,20,90}   {l:20,50,30,80,10}   {p:65}

24px {b:30,70,20,90}   {l:20,50,30,80,10}   {p:65}

36px {b:30,70,20,90}   {l:20,50,30,80,10}   {p:65}

48px {b:30,70,20,90}   {l:20,50,30,80,10}   {p:65}

64px {b:30,70,20,90}   {l:20,50,30,80,10}   {p:65}

## Datatype in context

Datatype charts work anywhere text does — tables, dashboards, reports. Here's a stock watchlist with sparklines rendered entirely in Datatype.

Stock

30d trend

Price

Change

AAPLApple

{l:40,25,1,0,34,73,93,100,85,26}

$255.78

\-2.27%

MSFTMicrosoft

{l:86,86,75,100,52,39,0,26,14,10}

$401.32

\-0.13%

NVDANvidia

{l:55,70,63,71,100,67,0,88,88,53}

$182.81

\-2.21%

TSLATesla

{l:81,77,100,73,37,47,0,39,60,39}

$417.44

+0.09%

AMZNAmazon

{l:86,91,81,90,97,100,54,23,12,0}

$198.79

\-0.41%

Charts sit naturally within running prose, matching the surrounding typeface's metrics.

Merriweather (Serif)

Revenue grew steadily through Q3 {l:15,28,40,52,63,78,88,95,74,58} before a seasonal dip. Market share {p:34} held firm against competitors, and our product mix {b:60,45,80,30} shifted toward higher margins.

IBM Plex Sans (Sans-serif)

The patient's heart rate {l:68,82,55,90,42,78,60,85} remained within normal range. Blood oxygen {p:97} was excellent, and the weekly activity breakdown {b:25,40,55,75,90} showed consistent improvement.

Fira Code (Monospace)

cpu\_load {l:15,45,90,30,75,20,85,95} spiking mem\_used {p:78} req/s by endpoint {b:90,35,70,15,60}

## How to use Datatype

Add Datatype to your CSS, then just type chart expressions in your HTML.

@font-face { font-family: 'Datatype'; src: url('Datatype.woff2') format('woff2'); font-display: swap; } .chart { font-family: 'Datatype', sans-serif; font-variation-settings: 'wdth' 15; font-weight: 400; }

Sales <span class="chart">{l:20,40,70,50,90}</span> are up. Budget <span class="chart">{p:73}</span> utilized. Results <span class="chart">{b:30,70,20,90}</span> by quarter.

It's easy to use Datatype on the web. See the [integration guide](https://franktisellano.github.io/datatype/integrations.html) for setup instructions.

### Bar charts `{b:values}`

Comma-separated values, each 0–100. Up to 20 bars.

{b:15,45,80,30,60}

`{b:15,45,80,30,60}`

5 bars — values set bar height as a percentage

### Sparklines `{l:values}`

Comma-separated values, each 0–100. Up to 20 points.

{l:10,40,25,70,50,90,35}

`{l:10,40,25,70,50,90,35}`

7 points — values set point height as a percentage

### Pie charts `{p:value}`

A single value, 0–100, representing the percentage filled.

{p:62}

`{p:62}`

62% filled