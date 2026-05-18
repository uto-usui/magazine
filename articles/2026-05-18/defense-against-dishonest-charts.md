---
title: "Defense against dishonest charts"
source: "https://flowingdata.com/projects/dishonest-charts/"
publishedDate: "2026-05-18"
category: "design"
feedName: "Sidebar"
---

Charts are a window into the world. When done right, we gain an understanding of who we are, where we are, and how we can become better versions of ourselves. However, when done wrong, in the absence of truth, charts can be harmful.

This is a guide to protect ourselves and to preserve what is good about turning data into visual things.

We start with chart anatomy; then we look at how small changes can shift a point of view; this takes us to misleading chart varieties; and we finish with reading data and next steps.

## Chart Anatomy

To defend against dishonest charts, you must understand them. You must take them apart and put them back together. Data forms the foundation and the following visual elements build on that foundation.

### Visual Encodings

Every chart uses at least one _visual encoding_ that represents data.

Think of paint-by-number sets that provide an outlined image with numbers in each spot. Fill in the spots based on the numbers, and you get a finished portrait, such as a rainbow or a cute animal. Color is the visual encoding.

With charts, visual encodings fill a space based on data. The visual encoding can be color. It can also be area, position, direction, length, angle, or a combination.

Use the slider to see how each encoding can change. The circle can be bigger and smaller, a line can be shorter and longer, a point can shift left to right, and a shape can rotate 360 degrees.

### Scales

You must know what each visual encoding represents to translate the geometries to values. What does a steep line show? What’s the numeric difference between a shade of green and a shade of yellow? Is a large shape a lot or a little?

You must know the _scales_ that define how much or how little the encodings change based on data.

Usually you’ll find this information as _axes_ with tick marks. Use the slider to see how the range can change by shifting the greatest value at the end of the axis.

The space on the screen can also change, which defines if a chart is big or small, even if the range stays the same.

Most of the time, you’ll see axes in pairs described as _x_ and _y_. The _x-axis_ is the horizontal axis, and the _y-axis_ is the vertical axis.

### Visual Encodings and Scales Together

Combine visual encodings and scales, and you have a chart. Different choices lead to different charts that reflect different points of view. Here are chart types that you might recognize, described with their visual encodings and scales.

**Bar chart.** Length, categorical x-axis, and numeric y-axis.

**Scatterplot.** Position, numeric x-axis, and numeric y-axis.

**Bubble plot.** Position and area, numeric x-axis, and numeric y-axis.

**Line chart.** Slope, time on x-axis, and numeric y-axis.

**Area chart.** Slope and area, numeric x-axis, and numeric y-axis.

**Heatmap.** Color, categorical x-axis, and categorical y-axis.

**Pie chart.** Angle, numeric circular (polar) scale.

**Histogram.** Length, numeric x-axis, and numeric y-axis.

## Changing Point of View

Numbers and, by extension, charts, can seem like concrete facts. They are not. From the data collection process, to analysis, through published graphics, opinions are expressed through the choices on the way to your eyeballs.

Your own interpretation of a chart is linked to what you know and think about the data and topic.

But let’s keep our eyes on the charts. Seemingly simple changes can reveal a chartmaker’s point of view.

A straightforward line chart with made up data shows an increasing trend.

Check the range of the y-axis. It starts at 90 and ends at 95 for a difference of five units. Is that a lot? The steepness of the line, or _slope_, suggests that the change is notable, but use the slider to change the starting point, or _baseline_, to zero and see how it changes the message.

The adjusted line chart shows the same data. The line is sloped about 45 degrees and then it is almost flat. Technically, there’s nothing wrong with the slope of the line either way. It depends on your interpretation.

Try the same with a bar chart but increase the upper limit of the y-axis this time. The bar heights shrink and suggest less significant changes.

Let’s try a scatterplot. Change the range of the x-axis to see how limits change the view of the data. Decrease the upper limit and data points filter out and an increase in the upper limit brings in more data while pushing dots closer together.

So far, there is no right or wrong with these changes. Chart design depends heavily on the context of the data, and we’ve only looked at made up data with no context. The charts that follow use real datasets, which is how the dishonest mislead.

## Misleading Varieties

A chart can be technically correct and terribly misleading at the same time. It is up to the reader to decipher what is right or wrong by looking at charts with a careful eye.

Here are the more common design choices that the dishonest like to use and what you can do to counter.

If you choose to be a defender for honest charts — and we need many — then it is vital to know what you are up against and to act swiftly. Dishonest charts can spread skewed messages quickly.

### Damper

Values and magnitudes appear less than they are when the y-axis expands beyond the data. This makes it harder to pick out trends, even if they exist.

For example, population more than tripled in the United States between 1910 to 2020, based on estimates from the Census Bureau. The damper makes the increase look flat.

#### Counter Chart

Drag the slider to bring the y-axis into a reasonable range that doesn’t extend so far beyond the data. What is reasonable depends on the dataset, so you must always read the axes.

### Cherrypicker

The full scope and context do not matter as long as the cherrypicker has its way. Points of interest or narrow segments of data are used to support an argument.

For example, with data from the 2022 National Health Interview Survey, one might suggest that a smaller proportion of people wear glasses over time with a focus on 59- to 60-year-olds. Vision gets better with age? That seems counterintuitive.

#### Counter Chart

Pull back for a wider range of data. A steep rise begins in our 40s and the percentage levels off in our 60s.

When the cherrypicker attempts to make a point with statistical noise, counter with statistical patterns.

### Smooth Operator

One can use statistical tools such as moving average, splines, or local regression to better see the signal through the noise. The smooth operator takes things too far to hide the signal.

For example, a steady rise appears in the percentage of people who wear glasses as they get older. A moving average with a wide window removes all the bumps and forces a narrower age range on the x-axis.

#### Counter Chart

Find the balance between noise and signal. Smoothing can help you see overall patterns and variation can give you a more accurate picture of reality.

### Overbinner

The overbinner often works with the smooth operator. It clumps things into more general groups to paint things as either-or with nothing in between.

For example, the heights of NBA basketball players fall into two groups according to the overbinner’s histogram. They are either tall or very tall and that is all.

#### Counter Chart

Smaller bins that group players by inches show a shape similar to what you learned in that introduction to statistics course. Players between 82 and 83 inches tall are the most common, but there are many who are shorter and taller.

Choices based on context defeat the overbinner.

### Base Stealer

With a complete disregard for how charts work, the base stealer shortens the y-axis on a bar chart from the bottom. This forces focus on the tops of the bars, which incorrectly makes tiny differences seem significant.

For example, the U.S. population is a near even split between male and female, but there are slightly more females. When the base stealer starts the y-axis at 49%, it looks like there are three times more females than males.

#### Counter Chart

Bar chart baselines must be set to zero, because the chart uses length as its visual encoding. Put the base stealer in its place by starting at zero.

### Probable Cause

It’s challenging to prove causation statistically. You must consider and deal with _confounding factors_, or things that are closely related that affect results. You need the right data. You must validate assumptions. Probable cause ignores all that and pretends that correlation means causation. If two things follow similar or opposing patterns, then one must cause the other.

For example, spinach consumption per year and per capita increased between 2004 and 2019, and so did the three-pointer rate in the NBA. Therefore, if we want basketball players to shoot fewer threes, then we should eat less spinach. Makes sense.

A dual-axis chart, a layout that uses a y-axis on the left for one variable’s scale and another on the right to show the other variable’s scale, can dubiously show a link by shrinking and stretching the ranges.

#### Counter Chart

The best defense against a dual-axis chart is to not use them. They are rarely the answer, unless the second axis is a direct translation of the first, such as metric and imperial units.

The key is less about the chart and more about a greater emphasis on context. Point out why causation should not be assumed, other factors that could lead to trend shifts, or use ridiculous examples to demonstrate absurdities.

### Time Gap

Time gap is a variant of the cherrypicker. Points in time are purposely selected and other points in time are purposely left out to pretend a trend exists.

For example, babies named “Nathan” in 1960, 1970, and 2010 shows a boom. It’s only a matter of time until half of all male babies are given the name. It is the chosen one.

#### Counter Chart

Why were certain times chosen? What happened in between? Fill in the gaps to see trends more accurately. While my name did see a boom in the 1970s, it’s been on the way down since the 2000s.

### Storyteller

One can tell many stories with the same dataset. The storyteller leads with narrative and then squeezes the data to support, instead of the other way around.

For example, by shifting ranges for the x-axis and y-axis, it is easy to change the story about how the three-pointer has changed and not changed the game of basketball.

#### Counter Chart

Does the chart stretch the truth? Find the narrative that most accurately describes the issue. The counter is to recognize that data is mungeable.

### Faker

When the data does not exist or does not support a narrative, one applies the faker with non-existent data. Users ignore ethics, honesty, reasoning, and accuracy, because they never cared about the data in the first place.

#### Counter Chart

Use the same view with accurate data and a reliable source. Counter fake with real. Explain why the original fake version is unreliable, leave nothing to the imagination, and do not assume people will understand immediately. The faker is potent when used at the right time with the right audience, so repetition is important.

### Descriptor

Words can dictate how others read a chart, even if the sentiment does not match what the chart or data shows. People might use the descriptor in their own counter attacks against charts that represent reality. Words will deflect or invite misinterpretation.

#### Counter Chart

Use honest words to explain the data. As with the faker, do not expect counter charts to work right away if at all. When words have separated themselves from reality, it might be too late for some, but your honest words can still communicate to those who want to understand, of which there are many.

## Reading Data

Visualization lets you see data quicker than if you were browsing a spreadsheet, and for many, a better chart means it takes less time to read.

Dishonest chartmakers use this assumption to their advantage. They publish any message they want and know that only a fraction of readers think long enough to learn the context of a data point.

Sometimes readers catch on, but the dishonest find new tricks.

So while it is useful to know misleading varieties, it is better to establish a general approach for reading data.

**Recognize the possibilities.** As we’ve seen in previous examples, a single dataset can represent infinite narratives, depending on the angle you look from. A choice of visual encoding and a shift in scale can make something good look bad. Significant changes can look like nothing. A decrease can look like an increase. Once you recognize that data and charts are not fact and instead a lens to evaluate a messy world, you will see more clearly.

**Examine the details.** To find the angle you’re looking at, note the scales, ranges, and units. Your eyes will be drawn to the more colorful visual encodings in the foreground or a loud title, but they are meaningless without knowing the background.

**Interpret with opinion.** Someone made choices during collection, analysis, visualization, and communication. The more you know about those choices, the better you can identify dishonest charts.

**Stay skeptical.** Strengthen your defenses when findings seem unbelievable or too good to be true. Surprising insights do not automatically mean dishonest motivations but sometimes they do. Ask why.

**Look outside the data.** The chart, the data, and the conclusions stem from factors away from the screen. Just like you learned in elementary school, scrutinize the who, what, when, where, why, and how that led to the chart you see.

**Think carefully.** Mindless consumption does little to defend against dishonest charts. If anything, such interactions feed social algorithms to push the charts in front of more eyeballs.

**Correct dishonest charts.** Leave a weed to grow and it will take all that it can from the land. More weeds will sprout. Before you know it, there is no space for nourishment. Force out the weeds that are dishonest charts.

## Good Offense

Sometimes the best defense is a good offense. Create honest charts. Spread truth. Work with data. Use every tool at your disposal to make the best work that you can.

By showing people what is good, they will learn to defend themselves. This is the overarching goal.

We do not defend against every dishonest chart. There are too many, and there will always be more.

Find your balance. Honesty and goodness will help guide us towards where we need to go.

## Learn More

This is just the beginning. Learn more about data, analysis, visualization, and communication to build your defense against dishonest charts. Our collective defense grows stronger when you know more. Tell others. Help them build.

Additional resources:

This guide is made possible by FlowingData members. If you find value in this work, consider supporting. **[Learn more about membership here](https://flowingdata.com/membership/)** → and strengthen your defenses.

#### Data Sources

U.S. Census Bureau, Centers for Disease Control and Prevention, U.S. Department of Agriculture, Social Security Administration, and National Basketball Association