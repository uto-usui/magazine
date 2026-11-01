---
title: "Python Typing Survey 2026: AI Tools and the Shifting Checker Landscape"
source: "https://engineering.fb.com/2026/10/27/developer-tools/python-typing-survey-2026-ai-tools-checker-landscape/"
publishedDate: "2026-10-27"
category: "engineering"
feedName: "Meta Engineering"
---

-   The 2026 Python Typing Survey received 1,794 responses. 
-   Type hint use changed little across three years, but checker selection changed sharply. 
-   Among respondents who reported which checkers they use, half selected more than one, and missing library type information was the most common difficulty.

For the third consecutive year, we asked Python developers how they use and experience Python typing: the language features, specifications, and tools used to describe and check types in Python code. We run the survey to learn what is working and what library maintainers, tool builders, documentation authors, and standards contributors should tackle next.

Most respondents were experienced Python developers: 76.4% had used Python for at least five years. The clearest change was the shift in checker choice, while missing library type information remained the most common difficulty.

## Key Takeaways From the 2026 Python Typing Survey

This year’s findings show several recurring opportunities:

**Broader and more accurate type information would help users of data-science packages:** Dynamic frameworks pose a different challenge because current type systems cannot express some runtime behavior. Possible directions include new typing features and checker support tailored to individual libraries and frameworks.

**Tool builders could focus on editor feedback and an initial checker run that requires little configuration:** Error messages could link to short explanations and examples. Typing documentation can assume Python experience. Projects using multiple checkers would benefit from clear explanations of intentional differences between them.

**Better callable syntax remains a practical area for standards work**, especially if improvements keep common typing tasks straightforward.

**AI usage remains an open question:** The findings on AI leave an open question about which interactions between AI tools and type checkers help developers. Further empirical study could inform future designs.

## AI Tools Now Write Types and Respond to Checker Errors

The share of respondents who selected “Makes AI-generated code more accurate/reliable” rose from 18.5% in 2025 to 38.4% in 2026. AI tools wrote type hints for 42.5% of 1,517 respondents, while 32.6% wrote types to improve AI-generated code. Respondents also used AI to fix or explain type errors. Across all four activities listed for AI tool use in typing, 61.0% of respondents reported they used at least one of these options.

Some respondents said their AI coding tool runs the checker and then fixes the errors. Of the 1,517 developers who answered how they run a checker, 24.4%, said an AI coding tool invoked their checker. Among the 370 respondents, 61.6% also used AI to fix checker errors. The rate was 19.3% among everyone else.

Some respondents described AI-generated types that are too broad and agents that suppress checker errors:

> _“I fix AI coded type hints because AI often gets lazy and uses_ _object_ _for everything.”_

> _“Lazy coding agents that spam_ _#type: ignore_ _comments everywhere.”_

When asked how useful types are for better AI-assisted coding, 29.8% of 1,551 respondents chose “I’m not sure.” The uncertainty rate for AI-assisted coding was nearly four times the 7.7% rate for runtime guarantees, the next-highest of the six benefits. We still need empirical evidence about which interactions actually help.

The Pyrefly team is already studying how AI coding tools and type checkers work together. At the 2026 Python Typing Summit, the team presented [Type Checking in Agentic Workflows](https://www.youtube.com/watch?v=xNaKm4fTFtw).

## Library Gaps Lead Overall; Occasional Users Struggle With Complexity

Missing type information in third-party libraries was the leading difficulty, selected by 65.1% of 1,486 respondents. Another 44.6% said the type system could not describe everything their code does.

Developers can still have a poor experience after a library ships dedicated stubs. Among 156 people who wrote their own answer, 22 described dynamic constructs, decorators, metaprogramming, or framework behavior. Ten described arrays, dataframes, or scientific typing, and at least eight described annotations that were inaccurate, incomplete, or too broad. Respondents repeatedly named Django, SQLAlchemy, Pydantic, NumPy, pandas, and Polars.

> _“Django does so much black magic it’s a wonder a type checker works at all.” — survey respondent_

Library maintainers need annotations that capture how frameworks and data-science libraries behave. The Pyrefly team has been [working with Quansight to improve third-party library typing](https://engineering.fb.com/2025/05/05/developer-tools/enhancing-the-python-ecosystem-with-type-checking-and-free-threading/), including contributions to pandas-stubs and NumPy.

Frequency of use changed which problems stood out. Among developers who used type hints rarely or sometimes, 41.6% found the type system too complex or verbose. The rate was 14.5% among developers who used type hints often or always. Missing library typing affected 36.2% of the lower-frequency group and 70.0% of the higher-frequency group.

![](https://engineering.fb.com/wp-content/uploads/2026/10/most_frustrates_title_case_fixed.png)

> _“I use the straightforward parts and avoid the parts that are difficult to understand.” — survey respondent._ 

Years of typing experience showed a different pattern. Complexity was reported by 18.2% of respondents with zero to two years of typing experience, 16.0% with three to six years, and 21.0% with seven or more. Newer typing users were often regular users and experienced Python developers: Of the 396 respondents with zero to two years of typing experience, 306 (77.3%) used type hints often or always and 345 (87.1%) had used Python for at least three years.

Guidance for developers who are new to typing should assume Python experience and show how to add types to an existing repository. Occasional users need a useful first check with little configuration and easy-to-understand errors. As we change the type system, we should aim to support more patterns without making common tasks harder.

Better Callable syntax is one practical place to start. It was the most selected missing feature, chosen by 45.7% of the 1,486 respondents who answered the question. The selection rate was similar for respondents who reported complexity and the rest of the sample.

## Newer Checkers Gained Ground Quickly

Frequent type hint use remained between 85.5% and 88.0% across the three surveys: 88.0% in 2024, 85.9% in 2025, and 85.5% in 2026. A different group answered each year, but the overall rate remained consistent.

![](https://engineering.fb.com/wp-content/uploads/2026/10/years_title_case.png)

Checker choice was far less stable. When [the 2024 Python Typing survey](https://engineering.fb.com/2024/12/09/developer-tools/typed-python-2024-survey-meta/) asked what feature was missing from the Python type system, one response now reads like a preview of the changes captured in this year’s results:

> _“A faster Mypy. Its lack of speed led to ecosystem fracturing and other type checkers don’t support Mypy plugins and behave differently in general.” – survey respondent_

By 2026, developers had several newer open-source checkers to choose from. Speed or performance topped the reasons for choosing a checker, at 56.5%. Using the same list of checkers in both years, 49.9% selected two or more in 2026, up from 46.0% in 2025.

![](https://engineering.fb.com/wp-content/uploads/2026/10/typechecker_comparison_title_case_fixed.png)

Pyrefly is developed by Meta. Respondents could select more than one checker, so the percentages may overlap.

## Developers Mix Checkers Across Their Workflows

Of the 700 respondents who selected Mypy, 297 also selected its editor plugin. Another 314 selected a different named checker integration without selecting the Mypy plugin.

Most Pyrefly respondents also selected another checker: 220 of 264, or 83.3%. In the free-text responses, developers described why their teams divide work between checkers:

> _“Because my team members use different IDEs, we use multiple type checkers for development, but rely on Mypy for linting (local and CI).” — survey respondent_
> 
> _“Locally we primarily use Pyright because it’s the only option we’ve tried that fully understands all the more niche typing patterns within our codebase. In CI/CD, we do a Pyrefly run and only run Pyright on files where Pyrefly fails, to improve performance of the check.” — survey respondent_ 

Among the 1,486 developers who answered the question about difficulties, 33.3% reported inconsistencies between checkers. Among the 738 respondents who selected multiple static checkers and answered the difficulty question, 315 (42.7%) reported inconsistencies between checkers.

## IDE Support Remains Central as Typing Help Moves Away From Stack Overflow

Readability or documentation was the most selected reason to use type hints, chosen by 93.6% of 1,571 respondents. Editor support also ranked highly: 84.8% of the 1,494 people who gave it a numeric rating chose 4 or 5. About 39% of the 103 developers who supplied their own reason mentioned completion, navigation, hover information, or editor error messages.

> _“Drastically improves IDE tooltip/autocomplete.” – survey respondent_ 

Real-time editor feedback was widespread: 82.9% of 1,517 respondents ran a type checker in an editor. VS Code was the most selected editor or IDE, at 59.3%.

Where developers look for help has changed as well. From 2024 to 2026, Stack Overflow use fell from 46.4% to 22.9%, while large language model (LLM) chat rose from 26.0% to 41.7%. Python typing documentation rose from 56.2% to 65.9%. Checker-specific documentation ended at 60.5%, up from 52.2% after a dip in 2025. General Python documentation fell from 66.7% to 62.2%.

![](https://engineering.fb.com/wp-content/uploads/2026/10/sources-fixed.png)

As developers move from Stack Overflow to typing- and checker-specific documentation, the quality of those sources matters more. Error messages should link to short, relevant explanations and examples. Links to documentation would also give LLM chat tools better information to work with.

## Survey Results and Raw Data

Download the full results and data from the [Python Typing Survey 2026](https://engineering.fb.com/wp-content/uploads/2026/10/Python-Typing-Survey-2026.zip).

## Acknowledgements

_The survey ran from August 5 through September 2, 2026. It was developed with support from the Pyrefly team at Meta, the PyCharm team at JetBrains, the Python team at Microsoft, the ty team at Astral/OpenAI, and community contributors on_ _discuss.python.org__. We shared it through Reddit, X, Mastodon, newsletters, the Python typing forum, LinkedIn, Bluesky, Discord, Slack, and type-checker project websites and social accounts. We lightly edited quotations for spelling, grammar, and punctuation. We thank everyone who responded, shared the survey, reviewed the data, or contributed to the Python typing community._