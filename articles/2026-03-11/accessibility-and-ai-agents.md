---
title: "Accessibility and AI agents"
source: "https://www.conor.fyi/writing/ai-access"
publishedDate: "2026-03-10"
category: "design"
feedName: "Sidebar"
---

I've since turned the patterns in this post into a [drop-in Claude Code skill](https://www.conor.fyi/writing/swift-accessibility-skill) that can audit and fix your SwiftUI accessibility modifiers automatically.

I was testing my iOS app last year and letting the agent drive the simulator, and learned that the tooling that drives the simulator also exposes an accessibility tree — a data/text representation of the page layout that a screen reader can use.

## The Problem

Most AI agents interact with iOS apps the way most humans do, by looking at the screen and tapping to interact. They take a screenshot and run it through a model, figure out where the buttons and interactive elements are on the screen, and then try to tap or gesture on those coordinates.

The model has to infer what interactive elements are available, where they sit, and what they do from the pixels alone. It's slow because every interaction needs to take a screenshot and do a round trip. It's expensive — screenshots are token heavy (will explain later). And it's fragile — the coordinates can often be incorrectly inferred for various reasons.

The thing is though, that all of this context information the agent needs already exists inside the app. Every SwiftUI view has an accessibility tree — a structured hierarchy of elements with identifiers, labels, hints, values, and traits. VoiceOver uses it and XCTest uses it, and developers should really be using it properly too to make their apps properly accessible.

Most apps just don't populate it well enough for an agent to use.

## The Potential

Here's a rough comparison of estimated costs in time and tokens per interaction using Claude before we get into the details.

Screenshot-based

Accessibility-based

Per interaction

~1,600 image tokens + vision reasoning

~200-400 text tokens

Verify action

~1,600 image tokens

Structured log, ~50 tokens

10-step flow

~32,000+ tokens

~2,500-4,500 tokens

Latency per step

2-5 seconds

Milliseconds

Deterministic

No

Yes

Tap Accuracy

Flaky

Surgical

* * *

## Accessibility Trees

If you've built iOS apps you've probably seen the accessibility modifiers in SwiftUI. You might have added a `.accessibilityLabel()` here and there for VoiceOver support. But the tree is more structured than most developers realise.

Each node in the accessibility tree can carry five properties:

-   **Identifier** — a programmatic name for targeting (`technique_editor_save_button`)
-   **Label** — what the element is ("Save technique")
-   **Hint** — what happens on interaction ("Validates and stores the current technique")
-   **Value** — current state ("3 of 5 selected", "On", "Page 2 of 4")
-   **Traits** — element type (button, link, header, adjustable)

When all five are set on every interactive element, an AI agent can navigate with the same precision as XCTest. It queries the tree, finds the element by identifier, reads its label to understand what it does, and taps it. Deterministic, fast, and resilient to layout changes.

The reality is that most apps set one or two of these properties on a fraction of their elements. Buttons without identifiers. List rows without labels. Pickers without values. The tree exists but it's sparse — enough for basic VoiceOver but not enough for reliable programmatic navigation.

* * *

## What to add to your code

The good news is that this isn't a framework adoption — it's native and waiting to be used. You just need to be more thorough with modifiers you already have access to.

### Buttons and interactive elements

Every `Button`, `NavigationLink`, and `Picker` needs the full set:

```
// Before — invisible to agents and barely visible to VoiceOver
Button("Save") {
    saveTechnique()
}

// After — fully discoverable
Button("Save") {
    saveTechnique()
}
.accessibilityIdentifier("technique_editor_save_button")
.accessibilityLabel("Save technique")
.accessibilityHint("Validates and stores the current technique")
```

It feels verbose at first but it becomes second nature fast, and it's super easy to get your coding agents to retrofit it. The identifier is for programmatic targeting and the label is what VoiceOver reads aloud. The hint explains the consequence of the action when taken. If a human can tap it, it really needs to be in the tree.

### List rows

This is the blind spot that catches most apps out. A row that looks tappable to a sighted user but is invisible to everything else:

```
// Before — tappable but silent
HStack(spacing: 12) {
    Circle().fill(.blue).frame(width: 8)
    VStack(alignment: .leading) {
        Text(position.name)
        Text("\(position.transitionCount) transitions")
            .foregroundStyle(.secondary)
    }
    Spacer()
    Image(systemName: "chevron.right")
}

// After — the row and its parts are discoverable
HStack(spacing: 12) {
    Circle().fill(.blue).frame(width: 8)
        .accessibilityHidden(true)
    VStack(alignment: .leading) {
        Text(position.name)
        Text("\(position.transitionCount) transitions")
            .foregroundStyle(.secondary)
    }
    Spacer()
    Image(systemName: "chevron.right")
        .accessibilityHidden(true)
}
.accessibilityIdentifier("position_list_row_\(position.id)")
.accessibilityLabel(position.name)
.accessibilityHint("Opens detailed information for \(position.name)")
.accessibilityValue("\(position.transitionCount) transitions")
```

The row-level modifiers give agents and VoiceOver a single element to interact with. Decorative sub-elements like the chevron and the status dot are hidden — they add visual meaning but would clutter the tree.

Note the `.accessibilityValue()` — it carries the row's state. Without it, an agent knows the row exists but not what data it contains. Same for toggles, segmented controls, counters — anything with state needs a value. It's the difference between an agent that can find your UI and one that can read it.

### View-level context

Individual elements aren't enough. An agent also needs to know where in the app it is, which screen is active, and what state the app is in.

```
ScrollView {
    // Content
}
.accessibilityIdentifier("technique_detail_view")
.onAppear {
    logger.info("View appeared: TechniqueDetailView [\(technique.id)]")
}
```

When an agent lands on a screen and queries the tree, the view-level identifier orients it. The structured log confirms the navigation succeeded. Without these, the agent has to infer context from the elements it finds. It's possible but it's slow and error-prone.

One more important detail is to label the meaning, not the component. A scrolling marquee labelled "MarqueeText" tells VoiceOver and agents nothing. "Position summary: Bottom Left" tells them everything. The label should describe what information is being communicated rather than how it's rendered — read it like you're using an app without a screen.

## Coordinates and naming

The accessibility tree tells an agent what exists. Two more pieces complete the picture: _where_ things are on screen, and whether your identifiers are structured enough for an agent to reason about.

### Coordinate tracking

When an agent needs to tap an element, knowing its identifier isn't enough. It needs exact screen coordinates. For simulator-based automation, a coordinate tracker gives you precise, queryable element positions.

```
Button("Start session") {
    startSession()
}
.accessibilityIdentifier("session_timer_start_button")
.accessibilityLabel("Start training session")
.trackElement("session_timer_start_button")
```

`.trackElement()` registers the element's frame with a coordinator. When the agent asks "where is `session_timer_start_button`?", it gets back exact coordinates without any screenshots needed.

The tracker can also maintain view context — which screen is active and any associated metadata.

```
.onAppear {
    CoordinateTracker.shared.updateViewContext(
        viewName: "SessionTimerView",
        metadata: ["sessionId": session.id]
    )
}
```

An agent can orient itself instantly, e.g. "I'm on SessionTimerView, session abc123, and here are the elements with their coordinates."

Compare that to taking a screenshot, sending it to a vision model, and hoping it correctly identifies the current screen.

### Drop-in implementation

Here's the minimal SwiftUI code. A singleton tracker, a `GeometryReader`\-based view modifier, and a `View` extension — under 40 lines.

```
import SwiftUI

@MainActor
final class CoordinateTracker: ObservableObject {
    static let shared = CoordinateTracker()
    private init() {}

    struct TrackedElement {
        let id: String
        let frame: CGRect
        var center: CGPoint { CGPoint(x: frame.midX, y: frame.midY) }
    }

    private(set) var elements: [String: TrackedElement] = [:]
    private(set) var currentView: String?
    private(set) var viewMetadata: [String: String] = [:]

    func track(id: String, frame: CGRect) {
        elements[id] = TrackedElement(id: id, frame: frame)
    }

    func tapPoint(for id: String) -> CGPoint? {
        elements[id]?.center
    }

    func updateViewContext(viewName: String, metadata: [String: String] = [:]) {
        currentView = viewName
        viewMetadata = metadata
    }
}

extension View {
    func trackElement(_ id: String) -> some View {
        background(
            GeometryReader { geo in
                Color.clear.onAppear {
                    CoordinateTracker.shared.track(
                        id: id,
                        frame: geo.frame(in: .global)
                    )
                }
            }
        )
    }
}
```

The `GeometryReader` captures the element's frame in global coordinates on appear. When an agent asks "where is `session_timer_start_button`?", the tracker returns exact coordinates — no screenshots needed.

Usage is a one-liner per element:

```
Button("Start session") { startSession() }
    .accessibilityIdentifier("session_timer_start_button")
    .accessibilityLabel("Start training session")
    .trackElement("session_timer_start_button")
```

### Why naming conventions help

One thing that paid off quickly in my app workflow was adopting a consistent identifier pattern:

```
{category}_{context}_{element}_{modifier?}
```

```
"technique_editor_save_button"
"position_list_row_\(position.id)"
"navigation_tab_bar_training"
"form_textfield_technique_name"
```

Whatever convention fits your app is up to you and whatever suits the app structure. When identifiers are structured an agent can query for all `technique_*` elements and immediately scope what's available. A test can assert on `position_list_row_*` without hardcoding specific IDs. And when you see `session_timer_start_button` in a log, you immediately know the category, screen context, and element type without looking anything up.

Contrast this with `saveBtn`, `item_3`, or `button1` — an agent can find them but can't infer anything about what they do or where they sit.

* * *

## Toolchain and costs

To connect an AI agent to your simulator you need tooling that bridges the gap. Facebook have an open source tool called iOS Development Bridge, or "IDB". Agents like Claude can use this directly. I originally wrapped it in an MCP server last year to streamline its use and convert it into a handy toolchain for ClaudeCode, but Skills are now the better way to provide tools to your agents. They use very little context until they're invoked, rather than always being in context/memory even when you're not using them in a session. Everything in context in a session gets sent to the model and counts towards costs. Check the `/context` regularly to avoid waste.

### Why a populated tree changes the economics

The performance difference between screenshot-based and tree-based navigation is significant.

Screenshot costs add up. Vision models like Claude don't process images as-is — they resize to fit within a max resolution (1568px on the longest side for Claude), then tile the image into fixed-size patches. Each patch costs tokens regardless of what's in it. A single iPhone screenshot lands at roughly 1,600 image tokens. Every interaction needs at least one screenshot to see the screen, and typically a second to verify the tap landed — so you burn ~3,200 image tokens per action before the model even reasons about what it sees.

Resizing screenshots down reduces tile count and saves tokens, but you lose detail — small text, icon-only buttons, and dense lists become harder for the model to parse accurately. Cropping to a region of interest helps more, but that requires knowing where to look, which is the problem you're solving. Image compression (JPEG quality, PNG vs WebP) doesn't affect token count at all because the model decodes to pixels before tiling. I did add a param to my MCP/Skill screenshot tool so that it can halve/quarter/thumbnail the screenshots before sending them to the model, but if you can avoid needing screenshots at all then that's better.

Accessibility-based navigation sidesteps all of this. Query the accessibility tree (structured text, a few hundred tokens at most), find the element by identifier (deterministic, instant), tap at tracked coordinates, read a structured log to verify. No vision model and no image token waste.

Over a development session where an agent navigates dozens of screens and interacts with hundreds of elements, the difference in token budget and time is huge. You're spending your context window on reasoning about your app instead of burning it on interpreting pixels.

* * *

## Agents as development partners

The obvious use case for AI-navigable apps is automated testing — write accessibility-rich views, point an agent at them, let it run through flows. That's valuable but it's not the real win.

The real win is having agents interact with your UI as they build it.

When you're developing a new screen and your agent can navigate the simulator in real time, the feedback loop tightens up.

#### Instant accessibility audit

You and the agent build a new view, the agent tries to navigate it, and immediately reports what it can and can't find. "I can see a save button but there's no identifier on the filter picker.".

Add missing identifiers and iterate.

#### Flow validation

You wire up a new multi-step flow and tell the agent to complete it. It gets stuck on step 3 because a list row isn't in the accessibility tree. You know exactly what's broken and where.

#### Regression catching

You refactor a component and the agent's usual navigation path breaks. The failure is immediate and specific — "element `technique_editor_save_button` not found" — not a vague test failure you have to debug.

#### Exploratory testing

You tell the agent "navigate to every screen and report what you find." It maps your app's navigation structure from the accessibility tree, and any screen that's sparse or inconsistent stands out immediately.

This isn't a replacement for XCUITest or manual QA. It's a tighter loop. You and the agent are working on the same app at the same time — you're writing the views, the agent is navigating them, and issues surface in real time rather than days later in a test suite.

The accessibility tree becomes a live contract between you and the agent. If it's populated correctly, the agent can help you build. If it's sparse, the agent tells you immediately.

* * *

## The dual-use payoff

Everything in this post serves two audiences at once.

The accessibility tree serves VoiceOver, Switch Control, Voice Control, Full Keyboard Access, and XCTest's UI testing framework. Those are the existing consumers. AI agents are a new consumer of the exact same data.

Every identifier you add for an agent also helps a screen reader user target that element. Every label you write for programmatic navigation is the same label VoiceOver reads aloud. The hint that tells an agent what a button does is the same hint that tells a blind user what to expect.

This isn't AI-specific tooling that you bolt on alongside accessibility work. It is the accessibility work, just with an expanded set of consumers. If your app is properly accessible to humans, it's most of the way to being navigable by agents. If you're investing in agent navigation, you're simultaneously making your app more accessible to humans.

The incentive alignment is unusually clean. Do the right thing for users with accessibility needs, and you get AI navigability as a bonus. Invest in AI agent support, and your app becomes more accessible as a side effect. Both paths lead to the same place — a fully populated, well-structured accessibility tree.

### Links to my tools

**[xc-mcp](https://github.com/conorluddy/xc-mcp)** — an MCP (Model Context Protocol) server that wraps Xcode CLI tools and the iOS Simulator. It gives Claude (or any MCP-compatible agent) the ability to build your project, launch the simulator, query the accessibility tree, tap elements, type text, and read logs. I initially built this to more efficiently run xcodebuild, but expanded it to cover IDB too.

**[ios-simulator-skill](https://github.com/conorluddy/ios-simulator-skill)** — All the same tools as xc-mcp, but in a Skill instead.

**[swift-accessibility-agent](https://www.conor.fyi/writing/swift-accessibility-skill)** — A Claude Code skill that audits and fixes SwiftUI accessibility modifiers. Three modes: `init` (scaffold CoordinateTracker), `audit` (report gaps), `fix` (add missing modifiers). The post is the skill — save the [agent-friendly version](https://www.conor.fyi/llm/swift-accessibility-skill) directly as your `SKILL.md`.