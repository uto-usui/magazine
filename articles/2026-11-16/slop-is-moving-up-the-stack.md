---
title: "Slop is moving up the stack"
source: "https://gabeorlanski.github.io/posts/slop-moves-up/"
publishedDate: "2026-11-16"
category: "design"
feedName: "Sidebar"
---

1.  2025 **The code**
    
    Verbose checks, dead code, swallowed errors.
    
    Mostly fixed SlopCodeBench rules
2.  Early 2026 **Iterating**
    
    Functions grow and structure erodes as specs change.
    
    Improving SlopCodeBench checkpoints
3.  Now **Using the code**
    
    Rewriting libraries instead of using them.
    
    The core issue LibraryDesignBench

> **TL;DR:** Agents can now solve significantly more SlopCodeBench checkpoints while writing significantly less slop. The slop, however, has not been eliminated. Rather, it has moved up the stack to now infest design decisions. Our new LibraryDesignBench and LibraryUseBench show that frontier agents lack foresight to how their code will be used through both poor abstraction design _and_ complete disregard for reusing library provided code.

The amazing [Dex Horthy](https://x.com/dexhorthy) at HumanLayer (now Factory) has been running SlopCodeBench with every new frontier model release. His [Part I](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/benchmarking-new-models-on-slop-code-bench.md) covers pass rates, cost, and how much slop each model writes ([X post](https://x.com/dexhorthy/status/2115115507183685850)). This post is the second part follow up where we dive deeper into the actual behavioral patterns we observed.

When we began work on [SlopCodeBench](https://www.scbench.ai/) a little over one year ago, there was a lot of discussion about “[slop coding](https://x.com/nearcyan/status/1902539629313847637)”, [quality issues with vibe coding](https://x.com/rauchg/status/1979590878416257216), or just the general [low-quality code that came from agents](https://x.com/jsharkey/status/1968471631111614574) at the time. A bit more than a year later, we wanted to revisit to see how the field has progressed. Let’s first describe the core benchmarks in this analysis:

-   **[SlopCodeBench (SCB)](https://www.scbench.ai/)** tests how agents handle changing requirements. Each problem is a sequence of checkpoints. The agent writes a program for the first spec, then extends its own code for every new one. We grade it on hidden tests and on how much slop builds up in the code. There are 36 problems and 196 checkpoints, all in Python.
    
-   **[LibraryDesignBench (LDB)](https://ldbench.com/)** sees how well agents can design a library. The agent under evaluation writes the library then we score it only on how much code is reduced when a fixed set of implementor agents use it to solve problems. More in the [launch post](https://gabeorlanski.github.io/posts/library-design-bench/).
    
-   **[LibraryUseBench (LUB)](https://ldbench.com/usage)** tests agents with solving a programming problem using a human written library with minimal instruction. These are the _exact same_ problems we use in LDB’s implementor phase but without the highly prescriptive prompt.
    

## The Good

### Solve rates keep climbing

Each checkpoint’s hidden tests come in three tiers, from hardest to easiest to pass:

-   **Strict**: every test passes, including the regression tests carried over from earlier checkpoints.
-   **Isolated**: every test written for this checkpoint passes, ignoring regressions. A mistake at checkpoint 2 no longer zeroes out checkpoint 5.
-   **Core**: only the tests for functionality the spec explicitly mentions or shows pass.

Unsurprisingly, solve rates on SCB keep climbing. The strict solve rate, solution must pass _every_ test for the current checkpoint and all prior, now peaks at 16.3%, set by GPT-6 Astra XHigh (32 of 196 checkpoints). Every frontier model released since July clears 65% on core tests. The trend puts strict pass rate increasing by 0.9 points a month, isolated by 1.5 and core by 2.3.

Anthropic OpenAI GLM Kimi**M** MiniMax**C** Composer faded = anti\_slop or plan\_first prompt

**Strict: all tests pass** trend: +0.9 pts per month

0%5%10%15%20%

GPT-6 Astra XHigh: 16.3%

**C**

**M**

**M**

**M**

Jan '26Apr '26Jul '26Oct '26

**Isolated: own tests pass** trend: +1.5 pts per month

0%5%10%15%20%25%30%35%

GPT-5.6 SOL XHigh: 32.1%

**C**

**M**

**M**

**M**

Jan '26Apr '26Jul '26Oct '26

**Core: core tests pass** trend: +2.3 pts per month

0%20%40%60%80%

Opus 5.5 Medium: 74.0%

**C**

**M**

**M**

**M**

Jan '26Apr '26Jul '26Oct '26

One logo per setup (34 in all), placed at the later of the model's and the harness version's release. Trend: least squares over every setup. Hover a logo for the setup.

### Line-level slop is disappearing

We measure slop two ways. **Line-level slop** counts hits from our 137 [AST-grep](https://ast-grep.github.io/) rules for wasteful patterns, per 1,000 lines. **Erosion** is the share of the code’s complexity that sits in functions with cyclomatic complexity above 10: how much of the program has piled into a few giant functions.

There have been massive reductions in the amount of lines with slop rule violations in newer models. Erosion has trended the same, with some slight regressions as well.

Anthropic OpenAI GLM Kimi**M** MiniMax**C** Composer faded = anti\_slop or plan\_first prompt

**Line-level slop (rule hits per 1k lines)** trend: −3.7 per month

0255075100125

Opus 5.5 XHigh: 61

**C**

**M**

**M**

**M**

Jan '26Apr '26Jul '26Oct '26

**Erosion (source code only)** trend: +0.014 per month

0.000.250.500.751.00

GPT-6.1 SOL Medium: 0.80

**C**

**M**

**M**

**M**

Jan '26Apr '26Jul '26Oct '26

One logo per setup (34 in all), placed at the later of the model's and the harness version's release. Trend: least squares over every setup. Hover a logo for the setup.

Looking _only_ at Anthropic and OpenAI models, clearly the rules we made almost a year ago are becoming less frequent.

Older

Newer

Pattern

Opus 4.6

Sonnet 4.6

Opus 4.7

Fable 5.1

Opus 5.5 M

Opus 5.5 X

Change

All scb-check rules (hits per 1k lines)

All scb-check rules (hits per 1k lines)

98.0

90.1

85.4

69.5

75.1

60.7

↓ 25%

`return None, error` tuples (per 1k)

`return None, error` tuples (per 1k)

2.00

2.35

2.41

0.81

1.22

0.72

↓ 59%

`len(x) == 0` instead of `not x` (per 1k)

`len(x) == 0` instead of `not x` (per 1k)

1.08

0.65

0.76

0.32

0.25

0.16

↓ 70%

Nested `if` that could be one `and` (per 1k)

Nested `if` that could be one `and` (per 1k)

1.98

1.35

1.50

0.28

0.70

0.46

↓ 70%

`sys.exit` outside `main` (count)

`sys.exit` outside `main` (count)

187

275

205

8

6

3

↓ 97%

Functions over 200 lines (count)

Functions over 200 lines (count)

50

38

46

3

5

1

↓ 93%

Longest function (lines)

Longest function (lines)

1,099

1,369

2,095

754

427

294

↓ 68%

scb-check 0.1.3 and our own measures on each problem's final code, tests excluded. Shade: how much of the pattern, relative to its row. Change: mean of the newer runs against the mean of the older ones. n/m: not measured.

Take the `(value, error)` tuple. Both families have replaced it with real exceptions:

#### Claude raises exceptions

```
def fetch_source(url):    try:        req = urllib.request.Request(url, headers={'User-Agent': 'mvault/1.0'})        with urllib.request.urlopen(req, timeout=30) as resp:            raw = resp.read()        return json.loads(raw.decode('utf-8')), None    except Exception as e:        return None, f"mvault: source metadata fetch failed: {e}"
```

```
        body = response.read()except urllib.error.HTTPError as exc:    raise MvaultError("failed to fetch source metadata from %s: HTTP %s %s"                      % (url, exc.code, exc.reason))except urllib.error.URLError as exc:    raise MvaultError("failed to fetch source metadata from %s: %s" % (url, exc.reason))except (OSError, ValueError, http.client.HTTPException) as exc:    raise MvaultError("failed to fetch source metadata from %s: %s" % (url, exc))try:    payload = json.loads(body)except (ValueError, UnicodeDecodeError) as exc:    raise MvaultError("failed to fetch source metadata from %s: invalid JSON (%s)"                      % (url, exc))try:
```

Same function, same problem. The tuple became a raised MvaultError. The price: 8 lines became 26, with five except clauses and %-formatting.

#### GPT raises exceptions

```
rows = list(reader)if len(rows) < 2:    return None, "Non-tabular content"header = rows[0]if not header or len(header) == 0:    return None, "Non-tabular content"columns = headerdata_rows = []for row in rows[1:]:    if len(row) > len(columns):        return None, "Non-tabular content"    if len(row) < len(columns):
```

```
leading = text.lstrip()if not leading or leading.lower().startswith(("<!doctype html", "<html", "<?xml")):    raise InputError("source is not tabular CSV content")if leading.startswith(("{", "[")):    try:        json.loads(leading)    except json.JSONDecodeError:        lines = [line for line in leading.splitlines() if line.strip()]        try:            is_json_lines = len(lines) > 1 and all(                isinstance(json.loads(line), (dict, list)) for line in lines            )        except json.JSONDecodeError:            is_json_lines = False
```

None, “Non-tabular content” became raise InputError. The new version also sniffs for HTML, XML and JSON-lines input the spec never mentions, and silences two parse errors with pass.

Overall, this is incredibly encouraging because it means code quality at the spot-check level can improve. This is in addition to the near _elimination_ of all process-related errors. Agents rarely forget references or write empty source modules. They also rarely hardcode test values that break later checkpoints. **At the lowest level, agents have truly improved the quality of each line of code they write.**

## The Bad

Of course there have been some line level regressions, but overall the line and function level slop has gone down. But clearly it still exists as we traverse up the stack. Comparing each model family’s older runs to its newer ones:

How much slop changed at each level, older → newer runs of the same model family

One arrow per family: Anthropic, OpenAI, GLM. **Blue**: less slop. **Red**: more slop. **Click any row to see every run.**

0.1×½×1×2×10×100×change from older to newer runs (log scale)

Each arrow is one family's mean over its newer runs divided by its mean over its older runs. Anthropic: Opus 4.6, Opus 4.7 → Opus 5.5, Fable 5.1. OpenAI: GPT-5.4, GPT-5.5 → GPT-6 SOL, GPT-6.1 SOL, GPT-6 Astra, GPT-5.6 SOL. GLM: GLM 5.1 → GLM 5.3. Arrows that start or end at 0 are pinned to the edge of the axis.

Error handling got worse for all three families, and hand-written library code exploded for Anthropic and GLM. Below that the picture is mixed: the newer Opus, Fable and GLM runs write less eroded programs with fewer giant functions, while the newer GPT runs got worse on both.

Returning to view Anthropic and OpenAI models temporally:

Older

Newer

Pattern

Opus 4.6

Sonnet 4.6

Opus 4.7

Fable 5.1

Opus 5.5 M

Opus 5.5 X

Change

`type(x) == T` instead of `isinstance` (per 1k)

`type(x) == T` instead of `isinstance` (per 1k)

0.05

0.01

0.04

0.33

0.93

0.61

↑ ×19

`if not isinstance(x, T): raise` (per 1k)

`if not isinstance(x, T): raise` (per 1k)

0.27

0.20

1.12

2.75

3.45

2.29

↑ ×5

`if x is None: raise` (per 1k)

`if x is None: raise` (per 1k)

0.18

0.17

0.44

1.77

1.57

1.80

↑ ×7

`# pragma: no cover` (per 1k)

`# pragma: no cover` (per 1k)

0.02

0.00

0.07

0.85

0.33

0.33

↑ ×16

`except` listing 4+ types incl. `KeyError`/`TypeError`

`except` listing 4+ types incl. `KeyError`/`TypeError`

8

0

0

25

15

29

↑ ×9

Problems with `%` formatting as main style (of 36)

Problems with `%` formatting as main style (of 36)

0

0

3

14

23

20

↑ ×19

`class X(object)` (count)

`class X(object)` (count)

0

0

0

67

1

126

new

Problems with a hand-written library fallback (of 36)

Problems with a hand-written library fallback (of 36)

0

n/m

1

11

5

9

↑ ×17

Problems that leave a test suite behind (of 36)

Problems that leave a test suite behind (of 36)

7

0

1

25

0

14

↑ ×5

scb-check 0.1.3 and our own measures on each problem's final code, tests excluded. Shade: how much of the pattern, relative to its row. Change: mean of the newer runs against the mean of the older ones. n/m: not measured.

### Some slop just moved

Some of the anti-patterns we check for appear to have been fixed, but on closer inspection agents now work around them with minor patches:

-   Silent `except Exception:` handlers became `except OSError: return None`.
-   The type-check helpers our rules flag became inline `if not isinstance(...): raise` ladders.

#### Narrowed exception handler

```
def load_rules(rules_file_path):    """Load rules from a YAML file. Returns dict or empty dict on failure."""    if not rules_file_path or not os.path.exists(rules_file_path):        return {}    try:        with open(rules_file_path, "r") as f:            data = yaml.safe_load(f)        if not isinstance(data, dict):            return {}        return data    except Exception:        return {}
```

```
def load_rules_mapping(path):    if path is None:        return None    try:        data = load_yaml_file(path)    except (OSError, yaml.YAMLError):        return None    if isinstance(data, dict):        return data    return None
```

```
rules = load_rules_mapping(rules_path)if rules is None or operation_id not in rules:    return
```

Same bug, narrower exception. If the rules file cannot be read, the protected operation runs with no role check.

#### Inline isinstance checks

```
def load_rules(rules_path):    with open(rules_path, "r", encoding="utf-8") as f:        rules = json.load(f)    return rules
```

```
def load_rules(path):    try:        with open(path, "r", encoding="utf-8") as f:            data = json.load(f)    except (OSError, ValueError) as e:        raise RuleError("cannot read rules file: %s" % e)    if not isinstance(data, list):        raise RuleError("rules file must contain a JSON array")    rules = []    seen = set()    for idx, r in enumerate(data):        if not isinstance(r, dict):            raise RuleError("rule #%d is not an object" % idx)        rid = r.get("id")
```

Opus 4.6 validated nothing. Opus 5.5 checks every field by hand. if not isinstance(x, T): raise went from 0.20–1.12 to 2.29–3.45 per 1k lines across the Anthropic lineage.

### The new regressions are design decisions

The majority of slop we now observe is now located in _design_ decisions for how to layout the functions and programs

#### Broad except clause

```
    connection.commit()except MigrationError as exc:    if str(exc) == "no migrations to rollback" or re.fullmatch(r"version \d+ not found", str(exc)):        raise    raise rollback_error(exc) from excexcept (sqlite3.Error, OSError, ValueError, OverflowError, TypeError, KeyError, IndexError, RecursionError) as exc:    raise rollback_error(exc) from exc
```

KeyError, TypeError and IndexError sit next to sqlite3.Error, so a programming bug reaches the user as “rollback failed: …”. New GPT runs have 49–74 except clauses like this; GPT-5.4 and 5.5 had 2 and 10.

#### HTTP error factories

```
def invalid(message, **details):    return ApiError(400, "invalid_input", message, details)def unprocessable(message, **details):    return ApiError(422, "unprocessable", message, details)def not_found(message, **details):    return ApiError(404, "not_found", message, details)def conflict(message, **details):    return ApiError(409, "conflict", message, details)
```

Used as raise not\_found(…), 109 times in this file. Defs that only return an Error: Opus 5.5 XHigh 47 (16 problems), Fable 53, GLM 5.3 27, Opus 4.6 and 4.7 none.

#### Leftover checkpoint references

```
def normalize_steps(steps, columns, steps_path, execute=False, checkpoint2=False, defs=None):    if not isinstance(steps, list):        fail("steps must be an array", steps_path)    validate_expression = execution_expression if execute or checkpoint2 else expression
```

```
def load_config(args):    """Compatibility helper for callers loading a Part 1 config."""    configs, _ = load_configs(args)    return next(iter(configs.values()))
```

A parameter named after the checkpoint that introduced it (five call sites pass checkpoint2=True), and a “Part 1” compatibility helper that nothing calls.

#### Fallback expression parser

```
def validate_expression(expression: str, path: str) -> None:    parse_expression(expression, path)
```

```
try:    tree = parse_expression(expression, path)except PipelineError:    passelse:    for field in expression_fields(tree):        check_column(field, path, columns)    returntry:    tree = ast.parse(expression, mode="eval")except (SyntaxError, ValueError, TypeError) as error:    raise PipelineError("BAD_EXPR", path, "invalid expression") from errorbinary_operators = (ast.Add, ast.Sub, ast.Mult, ast.Div)
```

2 lines became 49. When the program’s own expression parser rejects the input, the error is swallowed and a second validator built on Python’s ast decides instead.

#### Duplicated route output

```
if a.id in sde.stations:    lines.append('UNDOCK')lines.append('GO: ' + ' -> '.join(    f'{sde.systems[sid].name} ({sde.systems[sid].security:.1f})' for sid in route))
```

```
if start.id in sde.stations:    print('UNDOCK')if len(route) > 1:    print('GO: ' + ' -> '.join(f'{sde.systems[sid].name} ({sde.systems[sid].security:.1f})' for sid in route))
```

```
def leg_lines(sde: SDE, leg: Leg, destination: Place) -> List[str]:    lines: List[str] = []    if leg.undock:        lines.append("UNDOCK")    if len(leg.systems) > 1:        hops = " -> ".join(            f"{sde.systems[s].name} ({format_security(sde.systems[s].security)})"            for s in leg.systems        )        lines.append(f"GO: {hops}")    if leg.dock:        lines.append(f"DOCK: {destination.name}")
```

The new copy drops if len(route) > 1, so a same-system trip prints an extra GO line and a hidden test that passed at checkpoint 1 fails at 2 and 3. Fable keeps one helper and passes.

#### Claude and GLM: Python 2 is back

What is more concerning, in my opinion, and frankly strange is that the Claude models have started writing Python 2 idioms into a Python 3.12 codebase. `%` formatting is the main style in 14–23 of 36 problems for Opus 5.5, Fable and GLM 5.3, against at most 3 for any older run.

#### Object bases, %-formatting

```
class Tok(object):    __slots__ = ('typ', 'val', 'pos')    def __init__(self, typ, val, pos):        self.typ = typ        self.val = val        self.pos = pos    def __str__(self):        if self.typ == 'eof':            return 'EOF'        if self.typ in _KEYWORDS:            return '<%s>' % self.val        if len(self.val) > 10:
```

class X(object) and %-formatting. Opus 5.5 XHigh: 126 (object) bases; % is the main style in 20 of 36 problems (Medium: 23). Opus 4.6 and 4.7: 0 and 3.

#### Explicit \_\_init\_\_ call

```
class CliError(Exception):    """A fatal, user-facing error with the stream and exit code to use."""    def __init__(self, lines, stream="stderr", code=1, sensitive=False):        Exception.__init__(self, "\n".join(lines))        self.lines = list(lines)        self.stream = stream        self.code = code        self.sensitive = sensitive
```

Same file: class Runtime(object), class Config(object), class Param(object), 188 lines of %-formatting and 12 f-strings. GLM 5.3: 85 (object) bases in 10 problems.

#### Legacy typing imports

```
from __future__ import annotations
```

```
from typing import Any, Dict, List, Optional, Tuple, Union
```

from \_\_future\_\_ import annotations already allows dict\[…\] and list\[…\]; this file still uses Dict/List/Optional 31 times. Fable: 30 per 1k lines across 19 problems.

### The same habits show up in libraries for other agents

These habits also follow agents into the libraries they write for other agents. On LibraryDesignBench, their libraries carry the same error-swallowing habits:

-   Helpers that return a placeholder on error appear at 25x the rate of the human libraries.
-   `# pragma: no cover` on error handlers appears at nearly 4x their own SCB rate.

#### String equality fallback

```
try:    return bool(a == b)except Exception:  # pragma: no cover - exotic types    return str(a) == str(b)
```

If comparing two values raises, a dataframe library compares their string forms, and keeps that path out of coverage. The same helper is copied into reconcile.py.

#### Ambiguous None return

```
def _matching_row_groups(f: FileInfo, arrow_filter) -> list[int] | None:    """Row groups whose statistics may satisfy ``arrow_filter`` (None = all)."""    if arrow_filter is None:        return None    try:        if f.fs is not None:            dset = pds.dataset(f.path, format="parquet", filesystem=f.fs)        else:            dset = pds.dataset(f.path, format="parquet")        frag = next(iter(dset.get_fragments()))        return [rg.id for rg in frag.subset(filter=arrow_filter).row_groups]    except Exception:  # statistics unusable (e.g. type mismatch) -> read everything        return None
```

Any error while reading Parquet statistics is turned into None, which callers already treat as “read every row group”.

#### Swallowed filesystem errors

```
def path_exists(path) -> bool:    try:        fs = fs_for(str(path))        return fs.exists(str(path))    except Exception:  # pragma: no cover        return False
```

Permissions, network or credential errors all read as “the file does not exist”, and the handler is excluded from coverage.

## The Ugly

### Agents skip what the library already does

The newest form of slop that is particularly concerning is the increasing scenario where an agent searches a library and finds the functionality it needs, then decides it was actually better all along to just implement it itself. It is infuriating, and it matters more every month: agents increasingly build on code other agents wrote, and every copy is another place for a bug to hide.

LibraryUseBench measures this directly. Each model gets a problem, a human-written library, and a minimal prompt that just says the library is available. A solution counts as a rewrite when it hand-writes something the library already provides; otherwise, it calls the library for that job.

With a minimal prompt, every agent re-writes what the library already does

LibraryUseBench: share of solutions that hand-write something the human-written library already provides

GPT-6 Luna

**100%**

GPT-5.6 Luna

**93%**

GLM 5.3 Flash

**93%**

Sonnet 5

**87%**

GPT-5.6 Terra

**87%**

Muse Spark 1.3

**86%**

DeepSeek V4 Flash

**85%**

Sonnet 5.5

**80%**

Opus 5

**73%**

Opus 5.5

**73%**

DeepSeek V4.1 Flash

**73%**

GPT-6 SOL

**73%**

One problem per LDB task (15 tasks), first attempt. Subagents read every solution and the library it was given; a rewrite names the library function that already does the job. Rates are averaged over tasks.

On LibraryUseBench, every model hand-writes something the library already does, in 73% to 100% of its solutions. Even the best ones do it in nearly 3 of 4 solutions written. It will become ever more important to solve this as agents increasingly work with agent written code over human written code.

LibraryDesignBench measures exactly this and highlights that, while agents do still write redundant functionality, it occurs in only 40% of their solutions. This is not, unfortunately, because agents somehow mastered software design for other agents. It is because for LDB, we have to use an incredibly prescriptive prompt. The same prompt with human designed libraries leads to ~17% reimplementation rate.

LDB also tells us whether agents write better or worse libraries than humans do. We measure that by how often the same three implementers, with the same prompt, have to work around the library they were given: patching a bug in it or rebuilding a piece that doesn’t fit the task.

On agent-written libraries, implementers fight the library more

The same 3 implementers and prompt, on the human library vs. on 8 agent-written ones

Worked around a broken or ill-fitting library

Human

**27%**

Agent-written

**40%**

Worked around, by who wrote the library

DeepSeek V4 Pro

**56%**_human libraries 27%_

GLM 5.3

**53%**

Grok 4.6

**47%**

GPT-6 Astra

**40%**

Opus 5.5

**33%**

Fable 5.1

**33%**

GPT-6 SOL

**29%**

Kimi K3

**27%**

One problem per LDB task (15 tasks), implementer attempt 1. Subagents read every solution and the library it was given; a workaround cites the library defect in its source. Rates are averaged over tasks.

Some examples of these rewrites:

#### Reimplemented SimPy scheduler

```
def enqueue(kind, value):    nonlocal sequence    sequence += 1    # Urgent successor outranks all regular same-time work.    priority = 0 if kind == 'successor' and s['successor_priority'] == 'urgent' else 1    heapq.heappush(pending, (priority, sequence, kind, value))
```

```
def schedule(    self,    event: Event,    priority: EventPriority = NORMAL,    delay: SimTime = 0,) -> None:    """Schedule an *event* with a given *priority* and a *delay*."""    heappush(self._queue, (self._now + delay, priority, next(self._eid), event))
```

It imports SimPy, uses it only to wait for the bell, then pushes (priority, sequence) onto its own heap. SimPy’s schedule already does exactly that. 8 of 12 models wrote their own queue here.

#### Reimplemented encoding detection

```
def find_declared_encoding(data):    window = data[:2048]    m = re.search(        rb"<\?xml(?:\s|\?)[^>]*\bencoding\s*=\s*[\"']([^\"']+)[\"']",        window,        re.I,    )    if m:        return m.group(1).decode("ascii", "replace").strip()    for mt in re.finditer(rb"<meta\b[^>]*>", window, re.I):        tag = mt.group(0)        m = re.search(rb"charset\s*=\s*[\"']?\s*([^\"'\s;>]+)", tag, re.I)        if m:            return m.group(1).decode("ascii", "replace").strip()
```

```
@classmethoddef find_declared_encoding(    cls,    markup: Union[bytes, str],    is_html: bool = False,    search_entire_document: bool = False,) -> Optional[_Encoding]:    """Given a document, tries to find an encoding declared within the    text of the document itself.
```

It read bs4’s dammit.py, then wrote its own find\_declared\_encoding. All three implementers in LDB’s setup called bs4’s; all 12 LUB models wrote their own.

#### npr broadcast workaround

```
// `npr`'s iterators walk a strided view in logical order, which is// the scatter-add that `+=` on views cannot express for axes of// length one.
```

```
if <$t>::MUT && strides[$i].iter().any(|&s| s == 0) {    return Err(crate::error::NprError::Shape(        crate::error::ShapeError::Invalid(            "a mutable producer cannot be broadcast with repeated elements".into(),        ),    ));}
```

The library’s += on a view rejects any axis of length one, which the spec allows for tiles. The implementer wrote its own element-by-element add instead, three times.

The same models that re-implement the most in SCB copy the most from human libraries in LDB. Opus 5.5’s and Fable’s libraries reuse about 30% of the production library’s public names, against 13% for GPT-6 SOL. They copy the interface and write their own implementation behind it.

Some code is aimed at other agents outright to target their training corpus:

```
BeautifulSoup = UglyPie
```

In LDB’s UglyPie problem, the designer writes an HTML parsing library to stand in for Beautiful Soup. One designer aliased its main class to `BeautifulSoup`, betting that implementers would reach for the name they already know from training.

## What Now?

I might be biased, but clearly every new model that comes out should put SCB, LDB, and LUB on their model cards. And hire me after I defend in the spring.

Beyond these three benchmarks? We need longer horizon benchmarks, benchmarks where agents have to interact with each other, and benchmarks where agents need to consider how their decisions will impact future agents. Because agents will increasingly use artifacts designed by other agents and not humans.

## Acknowledgements

Thanks to [Prime Intellect](https://www.primeintellect.ai/) for supporting this work through the Prime RL Residency, and [Snorkel AI](https://snorkel.ai/) for supporting this through the Open Benchmarks Grant. Thanks again to Dex for running the SCB runs that enabled these results and to [Sebastian Müller](https://x.com/omouamoua?lang=en) for the helpful feedback on the blog!

## Citation

```
@misc{orlanski2026slopmovesup,  title        = {Slop Is Moving Up the Stack},  author       = {Orlanski, Gabriel},  year         = {2026},  month        = nov,  howpublished = {\url{https://gabeorlanski.github.io/posts/slop-moves-up/}},  note         = {Blog post}}
```