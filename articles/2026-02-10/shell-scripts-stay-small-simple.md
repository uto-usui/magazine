---
title: "Shell Scripts: Stay Small & Simple"
source: "http://testing.googleblog.com/2023/10/shell-scripts-stay-small-simple.html"
publishedDate: "2023-10-11"
category: "testing"
feedName: "Google Testing Blog"
author: "Google Testing Bloggers"
fetchedBy: "playwright"
---

_A version of this post originally appeared in Google bathrooms worldwide as a Google [Testing on the Toilet](https://testing.googleblog.com/2007/01/introducing-testing-on-toilet.html) episode._ _You can download a [printer-friendly version](https://docs.google.com/document/d/1CL9sXdVJG5aAySS5CintGg1yTiZZowJ98swsoTRcRuA/edit?pli=1) to display in your office._

By David Mandelberg

Shell scripts (including Bash scripts) can be convenient for automating simple command line procedures, and they are often better than keeping complicated commands in a single developer's history. However, shell scripts can be hard to understand and maintain, and are typically not as well-supported as other programming languages. Shell scripts have less support for unit testing, and there is likely a lower chance that somebody reading one will be experienced with the language.

Python, Go, or other general-purpose languages are often better choices than shell. Shell is convenient for some simple use cases, and the [Google shell style guide](https://google.github.io/styleguide/shellguide.html) can help with writing better shell scripts. But it is difficult, even for experienced shell scripters, to mitigate the risks of its many surprising behaviors. So whenever possible, use shell scripts only for small, simple use cases, or avoid shell entirely.

Here are some examples of mistakes that are far too easy to make when writing a shell script (see [Bash Pitfalls](https://mywiki.wooledge.org/BashPitfalls) for many more):

-   Forgetting to quote something can have surprising results, due to shell's complicated evaluation rules. E.g., even if a wildcard is properly quoted, it can still be unexpectedly expanded elsewhere:

$ msg='Is using bash a pro? Or a con?'

$ echo $msg  \# Note that there's a subdirectory called 'proc' in the current directory.

Is using bash a proc Or a con?  \# ? was unexpectedly treated as a wildcard.

-   Many things that would be function arguments in other languages are command line arguments in shell. Command line arguments are world-readable, so they can leak secrets:

$ curl -H "Authorization: Bearer ${SECRET}" "$URL" &

$ ps aux  \# The current list of processes shows the secret.

-   By default, the shell ignores all errors from commands, which can cause severe bugs if code assumes that earlier commands succeeded. The command set -e can appear to force termination at the first error, but [its behavior is inconsistent](https://mywiki.wooledge.org/BashPitfalls#errexit). For example, set -e does not affect some commands in pipelines (like false in false | cat), nor will it affect some command substitutions (such as the false in export FOO="$(false)"). Even worse, its behavior inside a function depends on how that function is called.

-   Many things run in subshells, which can (often unexpectedly) hide changes to variables from the main shell. It can also make manual error handling harder, compounding the issue above:

$ run\_or\_exit() { "$@" || exit $?; }  \# Executes the arguments then exits on failure.

$ foo="$(run\_or\_exit false)"  \# Exits the $() subshell, but the script continues.