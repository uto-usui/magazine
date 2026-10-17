---
title: "We read 102 EU shop accessibility statements"
source: "https://scandiary.com/accessibility-statements"
publishedDate: "2026-10-15"
category: "design"
feedName: "Sidebar"
---

**Read this first.** We read what these statements _say_. We did not check whether any of them is true, and we are not saying any of them is wrong. A statement is a shop telling you what it knows about its own site; whether the site matches it is a different question, and one page of text cannot answer it. Nothing below says any shop met or missed a legal requirement.

## The numbers

-   102statements read in full
-   44say when they were last written or reviewed
-   25list problems they already know about
-   1227median length in words

We had 109 shops on file whose home page links to an accessibility statement and shows a contact address. On the day we ran this, 102 of those pages opened and were long enough to be a statement rather than a redirect or a cookie wall. Everything below is counted out of those 102.

What each statement names, out of the 102 read on 16 September 2026. A statement can appear on several rows. Shares are rounded to whole numbers.

The statement…

Statements

Share

gives a way to get in touch about it

77

75%

names WCAG at all

69

68%

names a WCAG level (A, AA, AAA)

47

46%

names a WCAG version number

46

45%

says when it was last written or reviewed

44

43%

names the law behind it

33

32%

cites the EU standard, EN 301 549

30

29%

lists problems it already knows about

25

25%

The bottom row is the one we would put first if we were writing a statement. Listing what is still wrong is the only line in these documents that a reader can check against the site — and it is the rarest. Two thirds of the statements name a standard; a quarter name a problem.

Of the 69 statements that mention WCAG, which version they name.

Version named

Statements

Share of the 69

WCAG 2.1

30

43%

no version given

23

33%

WCAG 2.2

15

22%

WCAG 2.0

1

1%

Naming a version matters more than it looks. “We follow WCAG” cannot be checked by anybody: the guidelines have three levels and several versions, and the sentence does not say which one the shop is aiming at. A third of the shops that raise the subject stop there.

## The number we counted first was wrong

Our first run said 16 statements out of 103 carried a date. That number was wrong, and the fault was ours, not theirs.

Our checker only accepts a date when a label stands next to it — “last updated”, “dernière mise à jour”, and so on. That rule exists for a good reason: nearly every page carries a bare “© 2026” in the footer, and treating a copyright year as a review date would be inventing a fact. But the list of labels had been written while reading English, French and Dutch pages, and the list of month names it knew was shorter still.

So a Swedish statement reading _“the most recent review of the site's accessibility was carried out on 23 July 2025”_ was recorded as undated: the label was not in our list, and neither was the Swedish word for July. Dates written as 14-02-2026 fell out too, because the separator we accepted was a dot or a slash, never a dash.

With those gaps closed, the same pages gave 44 out of 102 rather than 16 out of 103. The count went up by 28 without a single shop changing anything. We are leaving both numbers on this page, because the difference between them is the honest measure of how much a pattern-matching survey can miss — and 44 is still a floor, not a census. There will be phrasings we do not know about.

## What this does not tell you

**It does not tell you how many EU shops publish a statement.** A shop had to publish one to be in this sample at all, so the denominator cannot answer that question. Any percentage on this page is a share of statements that exist, never a share of shops.

The sample is also narrow, and one part of that is worth saying plainly because it was not chosen for this page at all. The list was built to find shops we could write to, so it only holds shops in the 4,000 to 16,000 band of the Tranco list, on eight EU country domains, that link their statement from the home page _and_ show a contact address there. A shop that publishes a statement but no address never entered the sample, and we cannot tell you whether those shops write different statements.

The rest of the limits are ordinary ones. A statement buried three clicks deep was never seen. We fetched each page once without running JavaScript, so anything a script writes into the page afterwards is invisible to us. And every one of these counts comes from matching phrases in five languages, which means false negatives — as the section above shows in detail.

We are also not naming any shop, including the ones whose statements were the best of the set. They did not ask to be surveyed, and a compliment is still an unrequested mention.

## If you are writing one

We are not lawyers and this is not legal advice — what follows is just what the 102 statements show when you put them side by side.

The statements that read as useful all do the same small thing: they say which standard and level they aim at, they say what is still not right, and they put a date on it. The date is what makes the rest of it checkable, and it is the part most often left out. Without it a reader cannot tell whether the document describes the site in front of them or the site as it was two redesigns ago.

The other pattern worth copying is the known-problems list. Twenty-five of the 102 had one, and those were the only statements where we could compare a claim with something specific. A statement that only says the shop cares about accessibility gives the reader nothing to hold.

Our own is on this site, and it is short: [the accessibility of this site](https://scandiary.com/accessibility). It names what we tested, what we did not, and when. You can also [run our checker over any page](https://scandiary.com/check) without signing up, if you want something concrete to put in the “known problems” part of yours.

## Method

We keep a list of EU online shops whose home page links to an accessibility statement, built by fetching home pages once each and looking for a shop signal, a statement link and a contact address. On 16 September 2026 we requested each of those 109 statement pages once, with no JavaScript, and kept the 102 that returned a page of at least 40 words. Each page was then matched for a WCAG mention, a version, a level, EN 301 549, the European Accessibility Act or its national implementation, a known-problems section, a contact route, and a labelled date. Counting and fetching live in separate files so the counting can be tested without touching anybody's server, and the published output carries no host names.