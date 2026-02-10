---
title: "Sort Lines in Source Code"
source: "http://testing.googleblog.com/2025/09/sort-lines-in-source-code.html"
publishedDate: "2025-09-15"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
fetchedBy: "playwright"
---

By Kyle Freeman

Imagine you're adding a two-player mode to a game. When testing the feature, you launch the game but don't see the option to add a second player. The configuration looks correct; you enabled two-player mode on the last line!

So what happened? Can you spot the bug in the following example?

allow\_warping: false

enable\_two\_players: false

show\_end\_credits: true

enable\_frost\_band: false

enable\_two\_players: true

Using keep-sorted ([github.com/google/keep-sorted](http://github.com/google/keep-sorted)) to sort lines makes the error easy to spot: the flag enable\_two\_players is set twice, with different values:

\# keep-sorted start

allow\_warping: false

enable\_frost\_band: false

enable\_two\_players: false

enable\_two\_players: true

show\_end\_credits: true

\# keep-sorted end

Sorted lists and lines of code are easier to read and maintain, and can help prevent bugs. To use keep-sorted in your source code, config, and text files, [install keep-sorted](https://github.com/google/keep-sorted?tab=readme-ov-file#sorting-your-file) and then follow these instructions: 

1.  Add keep-sorted start and keep-sorted end comments in your file, surrounding the lines you want to sort.
    
2.  Run keep-sorted: keep-sorted \[file1\] \[file2\] ...
    
3.  (Optional) [Add keep-sorted to your pre-commit](https://github.com/google/keep-sorted?tab=readme-ov-file#pre-commit) so it runs automatically on git commit
    

You can add [options](https://github.com/google/keep-sorted?tab=readme-ov-file#options) to override default behavior. For example, you can ignore case, sort numerically, order by prefixes, and even sort by regular expressions:

bosses := \[\]int{

  // keep-sorted start by\_regex=//.\*

  111213, // Aethon Annie

  52816,  // Blazing Benny

  711,    // Daisy Dragon

  1003,   // Kenzie Kraken

  // keep-sorted end

}

Remember: before sorting, ensure the original order isn't intentional. For example, order can be critical when loading dependencies.