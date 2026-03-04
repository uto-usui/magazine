---
title: "Design systems checklist"
source: "https://tylercoderre.com/projects/design-systems-checklist.html"
publishedDate: "2026-03-03"
category: "design"
feedName: "Sidebar"
---

## Build Better Design Systems With This List.

After building various design systems for clients and companies, I wanted to take what I've learned to write up a checklist that you can use to make sure you've covered all the essentials.

This is a living document, and I want it to be as useful as possible. If you spot anything that should be corrected, clarified, or added, I’d love your feedback.

[Share feedback or suggest edits](#contact)

* * *

Table of Contents 4

1.  [Design Language](#design-language)
2.  [Foundations](#foundations)
3.  [Core Components](#core-components)
4.  [Maintenance](#maintenance)

## Design Language. 0 / 0

This is how your product “talks” to people. It’s the look, feel, and flow that makes everything feel connected. When it all works together, users don’t have to think too hard.

### Brand.

Your brand is more than a logo or a cool name. It’s what you stand for and how people remember you. It should guide every decision you make.

#### Brand Checklist 0 / 5

-   ##### Vision.
    
    Why you exist, what you believe in, and what direction you’re going.
    
-   ##### Design Principles.
    
    These are your go-to rules for making design choices. They help keep your work focused and clear.
    
-   ##### Tone of Voice.
    
    How you sound when you talk to users. This helps make sure people always know it’s you speaking, no matter where they are.
    
    -   WCAG:
    -   [3.1](https://www.w3.org/WAI/WCAG22/quickref/#readable)
    -   [3.1.1](https://www.w3.org/WAI/WCAG22/quickref/#language-of-page)
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    -   [3.1.3](https://www.w3.org/WAI/WCAG22/quickref/#unusual-words)
    -   [3.1.4](https://www.w3.org/WAI/WCAG22/quickref/#abbreviations)
    -   [3.1.5](https://www.w3.org/WAI/WCAG22/quickref/#reading-level)
    -   [3.1.6](https://www.w3.org/WAI/WCAG22/quickref/#pronunciation)
    
-   ##### Terminology.
    
    Pick the right words and use them the same way across your product. This keeps things simple and clear.
    
    -   WCAG:
    -   [3.1.3](https://www.w3.org/WAI/WCAG22/quickref/#unusual-words)
    -   [3.1.4](https://www.w3.org/WAI/WCAG22/quickref/#abbreviations)
    -   [3.1.5](https://www.w3.org/WAI/WCAG22/quickref/#reading-level)
    -   [3.1.6](https://www.w3.org/WAI/WCAG22/quickref/#pronunciation)
    
-   ##### Brand Assets.
    
    Things like your logo, fonts, colors, and icons. Using them the same way everywhere helps your product look and feel like one solid thing.
    

##### Tools.

-   Confluence
-   Dropbox
-   Figjam
-   Jira
-   Miro
-   Storybook

[Back to the top](#Top)

* * *

### Guidelines.

You lose, if your product feels different every time someone uses it. Clear guidelines help your team stay on the same page and create a consistent experience no matter where or how people use your product.

#### Guidelines Checklist 0 / 6

-   ##### Accessibility.
    
    Make sure everyone can use your product. Use clear color contrast, logical layout, and support for screen readers and other tools.
    
    -   WCAG:
    -   [All Criteria](https://www.w3.org/WAI/WCAG22/quickref)
    
-   ##### Writing Guidelines.
    
    Set the rules for how you write. Things like grammar, tone, and word choice should all match. This helps everything feel like it’s coming from one voice.
    
    -   WCAG:
    -   [3.1](https://www.w3.org/WAI/WCAG22/quickref/#readable)
    -   [3.1.1](https://www.w3.org/WAI/WCAG22/quickref/#language-of-page)
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    -   [3.1.3](https://www.w3.org/WAI/WCAG22/quickref/#unusual-words)
    -   [3.1.4](https://www.w3.org/WAI/WCAG22/quickref/#abbreviations)
    -   [3.1.5](https://www.w3.org/WAI/WCAG22/quickref/#reading-level)
    -   [3.1.6](https://www.w3.org/WAI/WCAG22/quickref/#pronunciation)
    
-   ##### Microcopy Guidelines.
    
    Set the rules for how you write. Things like grammar, tone, and word choice should all match. This helps everything feel like it’s coming from one voice.
    
    -   WCAG:
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    -   [3.1.3](https://www.w3.org/WAI/WCAG22/quickref/#unusual-words)
    -   [3.1.4](https://www.w3.org/WAI/WCAG22/quickref/#abbreviations)
    
-   ##### Terminology.
    
    Pick the right words once, and use them everywhere. This avoids confusion and keeps things running smoothly.
    
    -   WCAG:
    -   [3.1.3](https://www.w3.org/WAI/WCAG22/quickref/#unusual-words)
    -   [3.1.4](https://www.w3.org/WAI/WCAG22/quickref/#abbreviations)
    -   [3.1.6](https://www.w3.org/WAI/WCAG22/quickref/#pronunciation)
    
-   ##### Internationalization.
    
    Plan for translation. Set up rules for handling different languages, longer words, and right-to-left text when needed.
    
    -   WCAG:
    -   [3.1](https://www.w3.org/WAI/WCAG22/quickref/#readable)
    -   [3.1.1](https://www.w3.org/WAI/WCAG22/quickref/#language-of-page)
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    -   [3.1.3](https://www.w3.org/WAI/WCAG22/quickref/#unusual-words)
    -   [3.1.4](https://www.w3.org/WAI/WCAG22/quickref/#abbreviations)
    -   [3.1.5](https://www.w3.org/WAI/WCAG22/quickref/#reading-level)
    -   [3.1.6](https://www.w3.org/WAI/WCAG22/quickref/#pronunciation)
    

##### Tools.

-   [Stark](https://www.getstark.co/)
-   [WebAIM](https://webaim.org/resources/linkcontrastchecker/)
-   [WCAG Quick Reference Guide](https://www.w3.org/WAI/WCAG22/quickref/)

##### Reference & Inspiration.

-   [Alt Text Writing Guide](https://sheribyrnehaber.com/context-is-the-most-critical-aspect-of-alt-text-everyone-seems-to-miss/)

[Back to the top](#Top)

* * *

## Foundations. 0 / 0

This is the base layer of your design system. Stuff like colors, fonts, and tokens live here. When you change something here, it ripples out through everything else... o it’s important to get it right.

### Color.

Color isn’t just for looks. It helps people understand what to do, what matters, and what to pay attention to. A good color system supports your brand and makes your product easier to use.

#### Color Checklist 0 / 4

-   ##### Accessibility.
    
    Make sure your color choices have enough contrast so text is easy to read. Always check your background and text pairings meet at least AA standards.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    
-   ##### Semantic Colors.
    
    Besides your main brand colors, set up specific colors for things like disabled buttons, background areas, links, and alerts. These should all have a clear role.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    
-   ##### Dark Mode.
    
    Make a version of your color palette that works in dark mode so your product can match the user’s system settings without breaking.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    
-   ##### Guidelines.
    
    Write down how to use your colors, when to use them, and what to avoid. This keeps things consistent and easy for the whole team.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    

##### Tools.

-   [Colorbox](https://colorbox.io/)
-   [Color Safe](https://colorsafe.co/)
-   [WCAG Quick Reference Guide](https://contrast-grid.eightshapes.com/)
-   [Stark](https://www.getstark.co/)
-   [WebAIM](https://webaim.org/resources/linkcontrastchecker/)

##### Reference & Inspiration.

-   [Material Design Color System](https://m2.material.io/design/color/the-color-system.html)
-   [Crafting a Semantic Colour System](https://www.designsystemscollective.com/crafting-a-semantic-colour-system-610615e824a4)
-   [Matrices to Create Consistent and Scalable Colour Tokens](https://www.designsystemscollective.com/crafting-a-semantic-colour-system-610615e824a4)
-   [Inclusive Design at Microsoft](https://www.microsoft.com/design/inclusive)
-   [Designing for Accessible Focus States](https://dockyard.com/blog/2020/04/28/designing-for-accessibility-focus-states)
-   [OKLCH, explained for designers](https://uxdesign.cc/oklch-explained-for-designers-dc6af4433611)
-   [Improving a Design System Color Palette](https://www.designsystemscollective.com/improving-a-design-system-color-palette-3275eef10ac0)

[Back to the top](#Top)

* * *

### Layout.

A good layout helps people make sense of what they’re looking at. Using a consistent grid and spacing makes things easier to scan and more comfortable to use.

#### Layout Checklist 0 / 5

-   ##### Order & Sequence.
    
    Your layout of content should be laid out in such a way that it will make logical sense to read as well as be read to in order by assistive technologies.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Units.
    
    Start small. Use a clear set of spacing values like 4, 8, 12, and 16. These give you a solid base to build your grid and layout.
    
-   ##### Grid.
    
    Use a grid to keep things aligned and balanced. Set up versions for mobile, tablet, and desktop with clear rules for columns, gutters, and margins.
    
-   ##### Breakpoints.
    
    Decide ahead of time which screen sizes your design should respond to. This helps your layout work on different devices without surprises.
    
    -   WCAG:
    -   [1.3.4](https://www.w3.org/WAI/WCAG22/quickref/#orientation)
    
-   ##### Spacing.
    
    Keep spacing between elements consistent, both up-and-down and side-to-side. Use simple spacing rules that aren’t tied to the grid so you have flexibility.
    

##### Reference & Inspiration.

-   [The Comprehensive 8pt Grid Guide](https://medium.com/swlh/the-comprehensive-8pt-grid-guide-aa16ff402179)
-   [Shopify Polaris on Spacing](https://medium.com/swlh/the-comprehensive-8pt-grid-guide-aa16ff402179)

[Back to the top](#Top)

* * *

### Typography.

Text is how most people get info from your product. A clear type scale with good structure helps users read faster and understand what matters. It also gives your brand a voice without saying a word.

#### Typography Checklist 0 / 5

-   ##### Responsiveness.
    
    Font sizes should adjust to the screen size. Bigger text works on desktop, but on smaller screens, scale it down so everything still feels balanced.
    
    -   WCAG:
    -   [1.4.4](https://www.w3.org/WAI/WCAG22/quickref/#resize-text)
    -   [1.4.5](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text)
    -   [1.4.8](https://www.w3.org/WAI/WCAG22/quickref/#visual-presentation)
    -   [1.4.9](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text-no-exception)
    -   [1.4.10](https://www.w3.org/WAI/WCAG22/quickref/#reflow)
    -   [1.4.12](https://www.w3.org/WAI/WCAG22/quickref/#text-spacing)
    
-   ##### Grid Relation.
    
    Line height and font size should work with your layout grid. This helps text line up nicely with icons, buttons, and other UI pieces.
    
    -   WCAG:
    -   [1.4.4](https://www.w3.org/WAI/WCAG22/quickref/#resize-text)
    -   [1.4.10](https://www.w3.org/WAI/WCAG22/quickref/#reflow)
    -   [1.4.12](https://www.w3.org/WAI/WCAG22/quickref/#text-spacing)
    
-   ##### Readability.
    
    Make sure your text isn’t too tight or too loose. Watch the spacing between letters, the height between lines, and the length of each line. All of this helps people read more comfortably.
    
    -   WCAG:
    -   [1.4.8](https://www.w3.org/WAI/WCAG22/quickref/#visual-presentation)
    -   [1.4.12](https://www.w3.org/WAI/WCAG22/quickref/#text-spacing)
    
-   ##### Performance.
    
    Custom fonts can slow things down, especially on the web. Use fast-loading fonts and have backups ready. System fonts are a solid choice if speed is a top priority.
    
-   ##### Guidelines.
    
    Document font use cases. You may have a singular font for everything, or individually selected fonts for particular use cases such as headings, body text, code snippets, legal copy, and more. Whatever their use case, make sure they are documented with clear rationale to keep your system consistent.
    

##### Tools.

-   Figma Text Styles
-   Figma Variables
-   [Type Scale](https://typescale.com/)
-   [Tokens Studio](https://tokens.studio/)

##### Reference & Inspiration.

-   [Smashing Magazine Typography Essentials](https://www.smashingmagazine.com/category/typography/)

[Back to the top](#Top)

* * *

### Iconography.

Icons are quick visual cues that help people understand actions or content fast. When used right, they make the interface easier to use. When used randomly, they just create noise. Keep them consistent and meaningful.

#### Iconography Checklist 0 / 7

-   ##### Accessibility.
    
    If an icon does something or means something, give it an accessible name so screen readers can describe it. If it’s just for decoration, no name needed. If you’re shipping code, make sure things like aria-label are included.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.6](https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose)
    
-   ##### Style.
    
    Pick a style—like outline or filled—and stick with it. This keeps everything looking clean and unified.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    
-   ##### Naming.
    
    Name your icons based on what they do, not what they look like. For example, call it “play” instead of “triangle.” You can always tag extra keywords to help with search.
    
    -   WCAG:
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    -   [3.1.3](https://www.w3.org/WAI/WCAG22/quickref/#unusual-words)
    -   [3.1.4](https://www.w3.org/WAI/WCAG22/quickref/#abbreviations)
    -   [3.1.5](https://www.w3.org/WAI/WCAG22/quickref/#reading-level)
    
-   ##### Grid Alignment.
    
    Design icons in a size and shape that fits your layout grid. This makes it easier to line things up with text or buttons.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Keywords.
    
    Add extra keywords to your icon library to make finding the right one faster and easier.
    
    -   WCAG:
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    -   [3.1.3](https://www.w3.org/WAI/WCAG22/quickref/#unusual-words)
    -   [3.1.4](https://www.w3.org/WAI/WCAG22/quickref/#abbreviations)
    -   [3.1.5](https://www.w3.org/WAI/WCAG22/quickref/#reading-level)
    
-   ##### Reserved Icons.
    
    Keep some icons locked in for specific uses, like navigation or delete. Don’t let them get reused for random stuff. This keeps things clear for users.
    
-   ##### Guidelines.
    
    Set rules for how and when to use icons, and what to avoid. Consistency goes a long way.
    

##### Tools.

-   Material Design Icons
-   FontAwesome
-   Icons8
-   Phosphor

##### Reference & Inspiration.

-   [Accessible design: A story of three Jira icons](https://medium.com/designing-atlassian/a-story-of-three-jira-icons-77503ac7c59b)
-   [https://medium.com/@nathanacurtis/the-sorry-state-of-states-89dd4668737e](https://medium.com/@nathanacurtis/the-sorry-state-of-states-89dd4668737e)
-   [The importance of hover states](https://uxdesign.cc/the-importance-of-hover-states-c9312d7fd516)
-   [How to Define a Spacing Scale for Your Design System](https://medium.com/felix-oginni-s-blog/how-to-define-a-spacing-scale-for-your-design-system-5f569327b671)
-   [Saying bye to 4px spacing and hello to Fibonacci](https://medium.com/@disco_lu/saying-bye-to-4px-spacing-and-hello-to-fibonacci-58477e3ecca3)
-   [Mastering typography in design systems](https://uxdesign.cc/mastering-typography-in-design-systems-with-semantic-tokens-and-responsive-scaling-6ccd598d9f21)

[Back to the top](#Top)

* * *

### Elevation.

Elevation is how you show that one thing sits above another in your interface. In light mode, that usually means shadows. In dark mode, it’s done with different background colors.

#### Elevation Checklist 0 / 3

-   ##### Shadow.
    
    Set up a few shadow styles that match your elevation levels. Most products only need about 3 or 4. These help show depth and separate layers.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.3](https://www.w3.org/WAI/WCAG22/quickref/#sensory-characteristics)
    
-   ##### Background Color.
    
    In dark mode, shadows don’t always work well. Use slightly different background colors to show depth instead. Link each one to a shadow level so it all stays consistent.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Z-Index.
    
    Create a clear system for z-index values so you know what should sit on top of what. This helps avoid weird stacking issues.
    

[Back to the top](#Top)

* * *

### Motion.

Motion helps guide people through your product. It can show what’s changing, what just happened, or what to focus on. Used right, it feels smooth and helpful. Used wrong, it just gets in the way.

#### Motion Checklist 0 / 3

-   ##### Accessibility.
    
    Always check for reduced motion settings. If someone prefers less motion, make sure your animations either tone it down or turn off.
    
    -   WCAG:
    -   [2.2.1](https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable)
    -   [2.2.3](https://www.w3.org/WAI/WCAG22/quickref/#no-timing)
    -   [2.3](https://www.w3.org/WAI/WCAG22/quickref/#seizures-and-physical-reactions)
    -   [2.3.1](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold)
    -   [2.3.2](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes)
    -   [2.3.3](https://www.w3.org/WAI/WCAG22/quickref/#animation-from-interactions)
    
-   ##### Easing.
    
    Set a few standard easing types like standard, fast-in, and slow-out. These help your animations feel natural and consistent across the whole system.
    
    -   WCAG:
    -   [2.2.1](https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable)
    -   [2.2.3](https://www.w3.org/WAI/WCAG22/quickref/#no-timing)
    -   [2.3](https://www.w3.org/WAI/WCAG22/quickref/#seizures-and-physical-reactions)
    -   [2.3.1](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold)
    -   [2.3.2](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes)
    -   [2.3.3](https://www.w3.org/WAI/WCAG22/quickref/#animation-from-interactions)
    
-   ##### Duration.
    
    Pick a few go-to timing values for how long animations should run. This keeps things feeling smooth and avoids weird jumps or delays between components.
    
    -   WCAG:
    -   [2.2.1](https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable)
    -   [2.2.3](https://www.w3.org/WAI/WCAG22/quickref/#no-timing)
    -   [2.3](https://www.w3.org/WAI/WCAG22/quickref/#seizures-and-physical-reactions)
    -   [2.3.1](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold)
    -   [2.3.2](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes)
    -   [2.3.3](https://www.w3.org/WAI/WCAG22/quickref/#animation-from-interactions)
    

##### Tools.

-   After Effects
-   Figma Prototyping
-   Jitter
-   Lottie

##### Reference & Inspiration.

-   Material Design Motion

[Back to the top](#Top)

* * *

## Core Components. 0 / 0

Core components are the basic building blocks of your interface. They show up everywhere in your product, like buttons, inputs, and toggles. Reusing them helps reduce design and tech debt, keeps things consistent, and speeds up development.

These components are meant to be complete. If you split them into smaller pieces, they stop working the way they’re supposed to. Therefore this list won't include items formed by core components such as headers, menus, etc...

### Accordion (Collapse).

An accordion shows or hides content when you click or tap a trigger. It’s a simple way to keep things tidy and let users reveal info as needed.

#### Accordion (Collapse) Checklist 0 / 4

-   ##### Open vs Closed.
    
    There are two main states (exc. interactive and accessibility states such as hove, focus, active...): open and closed. If there’s an icon (like an arrow), it should clearly show which state it’s in.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    -   [1.4.13](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    
-   ##### Composition.
    
    The content area should be flexible. It should work with text, images, or even other components inside.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Toggle Transition.
    
    Use a smooth, simple animation when opening or closing. This helps users see what’s happening.
    
    -   WCAG:
    -   [2.2.1](https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable)
    -   [2.2.3](https://www.w3.org/WAI/WCAG22/quickref/#no-timing)
    -   [2.3](https://www.w3.org/WAI/WCAG22/quickref/#seizures-and-physical-reactions)
    -   [2.3.1](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold)
    -   [2.3.2](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes)
    -   [2.3.3](https://www.w3.org/WAI/WCAG22/quickref/#animation-from-interactions)
    
-   ##### Content & Trigger Relation.
    
    Make sure assistive tech can link the content to the trigger. If someone focuses the content, they should also hear what it’s related to.
    
    -   WCAG:
    -   [1.3.5](https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose)
    -   [1.3.6](https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.1.2](https://www.w3.org/WAI/WCAG22/quickref/#no-keyboard-trap)
    -   [2.1.3](https://www.w3.org/WAI/WCAG22/quickref/#keyboard-no-exception)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.3](https://www.w3.org/WAI/WCAG22/quickref/#label-in-name)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    -   [4.1.1](https://www.w3.org/WAI/WCAG22/quickref/#name-role-value)
    

[Back to the top](#Top)

* * *

### Alert.

Alerts are used to grab attention. They let users know something important is going on—either across the whole page or in a specific section.

#### Alert Checklist 0 / 7

-   ##### Color.
    
    Use different background colors to show the type of alert, like success, warning, or error. Make sure the text inside has enough contrast to stay readable.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Title Support.
    
    Including a title helps users quickly get the point, especially if the alert has a longer message.
    
    -   WCAG:
    -   [2.4.6](https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels)
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    -   [3.1.4](https://www.w3.org/WAI/WCAG22/quickref/#abbreviations)
    -   [3.1.5](https://www.w3.org/WAI/WCAG22/quickref/#reading-level)
    -   [3.1.6](https://www.w3.org/WAI/WCAG22/quickref/#pronunciation)
    -   [4.1.3](https://www.w3.org/WAI/WCAG22/quickref/#status-messages)
    
-   ##### Icon Support.
    
    Icons help explain what the alert is about and are useful for people who can’t rely on color alone.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.5](https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose)
    -   [1.4.5](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text)
    
-   ##### Actions.
    
    If there’s something the user needs to do, include a clear action button or link that fits the message.
    
    -   WCAG:
    -   [1.3.6](https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.4](https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context)
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    
-   ##### Responsiveness.
    
    Make sure alerts adjust to screen size. On smaller screens, they should go full-width so everything stays readable.
    
    -   WCAG:
    -   [1.4.4](https://www.w3.org/WAI/WCAG22/quickref/#resize-text)
    -   [1.4.10](https://www.w3.org/WAI/WCAG22/quickref/#reflow)
    
-   ##### Accessibility Role.
    
    Use the correct accessibility role so screen readers know to announce the alert properly.
    
    -   WCAG:
    -   [1.3.6](https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.1.2](https://www.w3.org/WAI/WCAG22/quickref/#no-keyboard-trap)
    -   [2.1.3](https://www.w3.org/WAI/WCAG22/quickref/#keyboard-no-exception)
    -   [2.1.4](https://www.w3.org/WAI/WCAG22/quickref/#character-key-shortcuts)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [2.5.3](https://www.w3.org/WAI/WCAG22/quickref/#label-in-name)
    -   [4.1.1](https://www.w3.org/WAI/WCAG22/quickref/#name-role-value)
    

[Back to the top](#Top)

* * *

### Avatar.

Avatars are small visuals that represent a person, group, or some other kind of content. They’re usually a photo, icon, or initials inside a shape.

#### Avatar Checklist 0 / 7

-   ##### Image.
    
    Avatars should crop images into the right shape and handle whatever image size gets thrown at them, even if the source is unpredictable.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Image Fallback.
    
    If the image doesn’t load or isn’t provided, show something else instead. This could be an icon or the user’s initials.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Size.
    
    Avatars show up in lots of places, so you’ll need a few different sizes. At the very least, include a small, medium, and large option.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Color.
    
    When there’s no image, use a background color that fits the design. Make sure any icon or text over it meets contrast guidelines for readability.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Avatar Groups.
    
    Stack a few avatars together to show a group of users, like on a shared project or team.
    
-   ##### Accessibility Label.
    
    If there’s no visible name, make sure screen readers can describe what or who the avatar represents.
    
    -   WCAG:
    -   [1.3.6](https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.1.2](https://www.w3.org/WAI/WCAG22/quickref/#no-keyboard-trap)
    -   [2.1.3](https://www.w3.org/WAI/WCAG22/quickref/#keyboard-no-exception)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [2.5.3](https://www.w3.org/WAI/WCAG22/quickref/#label-in-name)
    -   [4.1.1](https://www.w3.org/WAI/WCAG22/quickref/#name-role-value)
    

[Back to the top](#Top)

* * *

### Badge (Chip & Tag).

Badges are small labels that show a status or bit of info. They can highlight something new, show a value, or mark a state—without taking up much space.

#### Badge (Chip & Tag) Checklist 0 / 8

-   ##### Color.
    
    Use different colors to show different meanings, like success, warning, or error. Make sure the text or icon on top has enough contrast to stay readable. Make sure all colors have been checked for WCAG contrast thresholds, and are not the sole meaning of the status for those that may be colorblind.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Variants.
    
    Badges might need different styles depending on where they show up. Some can be bold and bright, others more subtle with soft backgrounds.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    
-   ##### Size.
    
    Use a few size options so badges work in different spots—small for UI labels, bigger ones for places like marketing pages.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Icon Support.
    
    Add icons next to the text to help show meaning fast. Just make sure they’re clear, even at small sizes.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.5](https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose)
    -   [1.4.5](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text)
    
-   ##### Dismissable.
    
    If the badge is showing something like a selected filter, make it possible to remove it with a close or clear button.
    
    -   WCAG:
    -   [2.4.4](https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context)
    -   [2.5.3](https://www.w3.org/WAI/WCAG22/quickref/#label-in-name)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    -   [3.2.1](https://www.w3.org/WAI/WCAG22/quickref/#on-focus)
    
-   ##### Empty State.
    
    Some badges don’t need text, like a small dot for status. Adjust the style so they still look right without breaking layout.
    
-   ##### Positioning.
    
    For things like notification indicators, badges should be easy to place in the corner of an icon or avatar.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.6](https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose)
    -   [1.4.9](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text-no-exception)
    

[Back to the top](#Top)

* * *

### Button.

Buttons let users take action. They’re one of the most used and most important parts of any interface, so they need to be clear, consistent, and accessible.

#### Button Checklist 0 / 10

-   ##### Color.
    
    Use different colors for different button roles—like primary, secondary, success, or danger. Always make sure the text and icon colors meet WCAG AA contrast standards for readability.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Variants.
    
    Not all buttons should look the same. Primary buttons should stand out, while secondary or subtle buttons can blend in more. The style should match the action’s importance and where it appears.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    
-   ##### Size.
    
    Have a few sizes ready. Use smaller ones in tight spaces, and larger ones for forms or touch-heavy areas.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Icon Support.
    
    Buttons can include icons alongside text or stand alone as icon-only. If you’re using icon-only buttons, make sure there’s an accessibility label so screen readers can describe what the button does.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.5](https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose)
    -   [1.4.5](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text)
    
-   ##### Hover State.
    
    When someone hovers with a mouse, show a clear visual change so they know the button can be clicked.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    
-   ##### Focus State.
    
    When someone uses a keyboard or assistive tech, the button should show a visible focus ring or style so they can tell where they are.
    
    -   WCAG:
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [3.2.1](https://www.w3.org/WAI/WCAG22/quickref/#on-focus)
    
-   ##### Active State.
    
    Show feedback when the button is being clicked or toggled. This helps people know the press was registered.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    
-   ##### Loading State.
    
    If the button triggers something that takes time, show a loading indicator. Make sure the button doesn’t change size when loading so layout stays stable.
    
    -   WCAG:
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    
-   ##### Disabled State.
    
    Make it clear when a button can’t be used. It should look inactive and not respond to clicks or taps.
    
    -   WCAG:
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    
-   ##### Accessibility Role.
    
    The button should always be announced correctly by screen readers, whether it’s a button or a link. Use the right role based on what it does.
    
    -   WCAG:
    -   [2.4.6](https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels)
    -   [2.4.4](https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context)
    -   [2.5.3](https://www.w3.org/WAI/WCAG22/quickref/#label-in-name)
    -   [4.2.1](https://www.w3.org/WAI/WCAG22/quickref/#name-role-value)
    

[Back to the top](#Top)

* * *

### Breadcrumb.

Breadcrumbs show users where they are in your product and help them move back to previous pages. They’re especially helpful in deep navigation paths.

#### Breadcrumb Checklist 0 / 4

-   ##### Icon Support.
    
    You can use icons next to breadcrumb items to show what each page is about. Just make sure you use them consistently, not just here and there.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.5](https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose)
    -   [1.4.5](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text)
    
-   ##### Disabled State.
    
    Sometimes you don’t want a breadcrumb link to be clickable. Allow individual items to be disabled when needed.
    
    -   WCAG:
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    
-   ##### Collapsed State.
    
    If there isn’t enough room to show the full list, collapse the middle items so the first and last few stay visible. This keeps things readable without cutting off important context.
    
-   ##### Separator.
    
    The slash is the standard, though you don’t have to stick with the default slash. Use a separator that fits your design—but keep it consistent.
    

[Back to the top](#Top)

* * *

### Calendar (Date & Time Pickers).

Calendars let users pick a single date or a range of dates. They’re built as a grid of days and are used in things like forms, filters, and schedulers.

#### Calendar Checklist 0 / 7

-   ##### Display Modes.
    
    Calendars might need to show more than one month at a time or stack vertically. Support different layouts so they work across various parts of your product and on different screen sizes.
    
-   ##### Selected State.
    
    Users should be able to pick one date or a range. Highlight the selected date or dates clearly, and make sure the full range is easy to see.
    
-   ##### Month Selection.
    
    Make it easy to switch between months so users can move through dates without getting lost, especially when booking far in advance.
    
-   ##### Day Names.
    
    Show short weekday labels (like Mon, Tue, Wed) above the date numbers. This helps users understand where they are in the week at a glance.
    
-   ##### Internationalization.
    
    Make sure the calendar supports different regions and languages. This includes using local date formats and the correct order for weekdays (some calendars start on Sunday, others on Monday).
    
-   ##### Keyboard Navigation.
    
    All dates should be keyboard focusable in addition to hover and active states. Let users move around using arrow keys and switch months without needing a mouse. Screen reader users should be able to navigate smoothly too.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [3.2.1](https://www.w3.org/WAI/WCAG22/quickref/#on-focus)
    
-   ##### State Announcement.
    
    When a date is selected or focused, assistive tech like screen readers should announce it clearly so the user knows what’s happening.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [3.2.1](https://www.w3.org/WAI/WCAG22/quickref/#on-focus)
    -   [4.1.1](https://www.w3.org/WAI/WCAG22/quickref/#name-role-value)
    -   [4.1.2](https://www.w3.org/WAI/WCAG22/quickref/#status-messages)
    

[Back to the top](#Top)

* * *

### Card.

Cards are containers that group content and actions together. They’re great for showing chunks of info in a clean, organized way.

#### Card Checklist 0 / 5

-   ##### Composition.
    
    The inside of a card should be flexible. It should work with text, images, buttons, or even other components. Take into consideration hierarchy and reading order for those using assistive devices so content in your cards are read out in a logical order.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Media.
    
    Cards often include media like images or videos. These usually sit across the top or off to the side, depending on the layout.
    
-   ##### Actions.
    
    Cards can have actions, like buttons or links, usually placed at the bottom. In some cases, the whole card can be clickable.
    
    -   WCAG:
    -   [1.3.6](https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.4](https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context)
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    
-   ##### Responsiveness.
    
    On smaller screens like phones, cards should stretch to full width so there’s more room for the content.
    
    -   WCAG:
    -   [1.4.4](https://www.w3.org/WAI/WCAG22/quickref/#resize-text)
    -   [1.4.10](https://www.w3.org/WAI/WCAG22/quickref/#reflow)
    
-   ##### Groups.
    
    You can stack multiple cards together in a list or grid to show a set of related items.
    

[Back to the top](#Top)

* * *

### Carousel (Slider).

Carousels let users scroll through a group of related content, usually side to side. They’re great for saving space while still showing multiple items.

#### Carousel (Slider) Checklist 0 / 6

-   ##### Navigation.
    
    Make sure users can move through the carousel using mouse controls, not just swipe or drag. Arrows or buttons should be easy to click and clear to understand.
    
-   ##### Composition.
    
    Each carousel item should be flexible and able to hold different kinds of content—text, images, even other components.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Size.
    
    Item layout should adapt to different content. On smaller screens, show part of the next item to hint that more content is scrollable.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Touch.
    
    Make the carousel content scrollable with touch gestures, especially on mobile devices.
    
-   ##### Responsiveness.
    
    Adjust the layout of carousel items based on the screen size. Items might stack differently or show fewer at a time on smaller screens.
    
    -   WCAG:
    -   [1.4.4](https://www.w3.org/WAI/WCAG22/quickref/#resize-text)
    -   [1.4.10](https://www.w3.org/WAI/WCAG22/quickref/#reflow)
    
-   ##### Keyboards.
    
    Users should be able to move through the carousel with the keyboard and screen readers, without needing to click arrows or buttons.
    

[Back to the top](#Top)

* * *

### Checkbox.

Checkboxes let users pick one or more options from a list. They’re a basic form element, but getting the details right matters.

#### Checkbox Checklist 0 / 7

-   ##### Label.
    
    Every checkbox should have a label. Clicking the label should also toggle the checkbox. If the label isn’t shown on the screen, make sure it’s still announced properly for screen readers.
    
    -   WCAG:
    -   [2.4.6](https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels)
    -   [3.3.2](https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions)
    
-   ##### Checked State.
    
    Show clearly when a checkbox is selected. This is the value that gets sent with the form.
    
-   ##### Error State.
    
    If there’s a problem with the checkbox input, show an error message and change the color of the field to match. Always include both visual and text feedback.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [3.3.1](https://www.w3.org/WAI/WCAG22/quickref/#error-identification)
    -   [3.3.3](https://www.w3.org/WAI/WCAG22/quickref/#error-suggestion)
    -   [3.3.4](https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data)
    -   [3.3.4](https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-all)
    
-   ##### Disabled State.
    
    Use this when the checkbox shouldn’t be interactive. Disabled checkboxes don’t send data when the form is submitted.
    
    -   WCAG:
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    
-   ##### Intermediate State.
    
    Use this to show when only some options in a group are selected. It usually shows as a dash or shaded box instead of a full check.
    
-   ##### Grouping.
    
    You can group multiple checkboxes together so users can pick more than one related option at once.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Accessibility.
    
    Checkboxes should work with a keyboard. If you’re using native elements, this should be built in automatically. Along with including hover, focus, and active states.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [3.2.1](https://www.w3.org/WAI/WCAG22/quickref/#on-focus)
    

[Back to the top](#Top)

* * *

### Divider.

Dividers are simple visual lines used to separate content. They help organize layouts and make things easier to scan.

#### Divider Checklist 0 / 2

-   ##### Direction.
    
    Dividers should work in both horizontal and vertical layouts to separate different sections or groups of content.
    
-   ##### Accessibility Role.
    
    If the divider is more than just decoration—like it’s marking a meaningful break in content—make sure assistive tech can announce its role correctly.
    

[Back to the top](#Top)

* * *

### Dropdown.

Dropdowns show a list of actions or options when triggered. They’re used in menus, filters, navigation, and more.

#### Dropdown Checklist 0 / 6

-   ##### Composition.
    
    Dropdowns should be flexible enough to hold different kinds of content, including icons, text, or even other components. Take into consideration the reading and focus order for those using assistive devices so that they can interpret the content logically.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Hover & Focus State.
    
    Dropdowns can open on hover, but that same behavior should also work for keyboard users when the trigger gets focus.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [3.2.1](https://www.w3.org/WAI/WCAG22/quickref/#on-focus)
    
-   ##### Dynamic Positioning.
    
    The dropdown should open in a direction that keeps it visible based on where the trigger is on the screen. It should never get cut off or hidden.
    
-   ##### Responsiveness.
    
    Make sure the dropdown adjusts to fit smaller screens. What works on desktop might need to shift or resize on mobile.
    
    -   WCAG:
    -   [1.4.4](https://www.w3.org/WAI/WCAG22/quickref/#resize-text)
    -   [1.4.10](https://www.w3.org/WAI/WCAG22/quickref/#reflow)
    
-   ##### Focus Trapping.
    
    When the dropdown opens, move focus inside it. When it closes, send focus back to the trigger so keyboard users don’t lose their place.
    
-   ##### Keyboard Navigation.
    
    Users should be able to move through dropdown items with the keyboard and close the dropdown by pressing escape or tabbing out. Make sure screen readers can announce the dropdown contents properly.
    

[Back to the top](#Top)

* * *

### Icon.

Icons are usually SVGs wrapped in a component (and sometimes fonts) to control how they look and behave. They help support content visually and should stay consistent across the product.

#### Icon Checklist 0 / 3

-   ##### Color.
    
    Icons should use color tokens from your design system. They should also be able to inherit color from their parent element when needed.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Size.
    
    Offer a few standard icon sizes that line up with your typography scale. This keeps icons and text visually aligned and balanced.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Interactivity.
    
    Most icons are decorative, but if one needs to be clickable, wrap it in a proper interactive element like a button or link. That way it stays accessible and works as expected.
    

##### Tools.

-   Material Design Icons
-   FontAwesome
-   Icons8
-   Phosphor

[Back to the top](#Top)

* * *

### Image.

Images help bring visual context to your content. They should be flexible, responsive, and always include proper fallbacks and accessibility support.

#### Image Checklist 0 / 4

-   ##### Image Fallback.
    
    If the image doesn’t load or the URL is broken, show a fallback. That could be a background color, an icon, or a default placeholder image.
    
-   ##### Alt Text.
    
    If the image has meaning or content, always include alt text so screen readers can describe it. Skip alt text only if the image is purely decorative.
    
-   ##### Size.
    
    Images should support flexible width, height, and aspect ratio. This lets them scale properly within their parent container and keeps layouts clean.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Screen Density Support.
    
    Support different image sizes for different screen resolutions. Load the right one so images stay sharp without slowing things down.
    

##### Tools.

-   [Alt Text Writing Guide](https://sheribyrnehaber.com/context-is-the-most-critical-aspect-of-alt-text-everyone-seems-to-miss/)

[Back to the top](#Top)

* * *

### Link.

Links are text-based elements used to navigate around your product or site. They should be easy to spot, easy to use, and follow best practices for accessibility.

#### Link Checklist 0 / 6

-   ##### Icon Support.
    
    Icons can be placed next to link text to give extra context, like an external link or download. Don’t use icons by themselves—there should always be a text label.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.5](https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose)
    -   [1.4.5](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text)
    
-   ##### Color.
    
    Links should follow your design system’s color tokens. Since they’re text, they should also be able to inherit color from their parent element when needed. Always check that color contrast meets WCAG AA standards and to make sure it will pass against adjacent inline text as well as backgrounds.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Disabled State.
    
    If a link shouldn’t be clickable, show it as disabled. It should look inactive and not respond to clicks or taps.
    
    -   WCAG:
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    
-   ##### Font Inheritance.
    
    Links used in text should match the typography around them. They should automatically inherit font size, weight, and style.
    
-   ##### Multiline Display.
    
    Links inside paragraphs should be able to wrap across lines without breaking the layout or causing weird spacing issues.
    
-   ##### Accessibility.
    
    Links should be announced correctly by screen readers. Make sure the right role (link or button) is applied based on how it’s being used. Underlines are encouraged to be used to further drive clarity.
    

[Back to the top](#Top)

* * *

### List.

Lists are used to show a group of related items, either in order or not. They help organize content and make it easier to scan.

#### List Checklist 0 / 5

-   ##### Order.
    
    Use bullets, numbers, or custom markers depending on what the list is showing. Choose the style that makes the most sense for the content.
    
-   ##### Composition.
    
    Each list item should be flexible. It should support different types of content, including text, icons, or even other components.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Accessibility.
    
    Make sure assistive tech can recognize the list, its role, and how many items it includes. Use semantic HTML or the correct ARIA roles when needed.
    

[Back to the top](#Top)

* * *

### Loading.

Loading indicators show that something’s happening, even if we don’t know how long it’ll take. They help set expectations and reduce confusion while users wait.

#### Loading Checklist 0 / 5

-   ##### Color.
    
    Loading indicators should match the color scheme of the area they’re in. Use color tokens from your system for consistency.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Size.
    
    Use different sizes depending on where the loader appears. A full-page loader should be bigger than one used inside a button.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Duration.
    
    If there’s no way to know how long something will take, keep the loader visible until it finishes or fails. If timing is known, use a progress bar or message to show that instead.
    
-   ##### Motion.
    
    Respect the user’s system settings. If reduced motion is turned on, slow down or simplify the animation.
    
-   ##### Accessibility Label.
    
    If the loader stands alone (not tied to a visible element), add a label so screen readers can announce what’s being loaded.
    
    -   WCAG:
    -   [1.3.6](https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose)
    -   [2.5.3](https://www.w3.org/WAI/WCAG22/quickref/#label-in-name)
    -   [Name, Role, Value](https://www.w3.org/WAI/WCAG22/quickref/#name-role-value)
    

[Back to the top](#Top)

* * *

### Modal (Dialog).

Modals are containers that sit on top of the main content. They’re used for focused tasks or important messages that need the user’s attention before going back to the rest of the page.

#### Modal (Dialog) Checklist 0 / 8

-   ##### Composition.
    
    The modal should be flexible enough to hold all kinds of content—text, forms, media, or other components.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Actions.
    
    If the modal includes actions (like Save or Cancel), put them in a clear area—usually at the bottom—so users know what to do next.
    
    -   WCAG:
    -   [1.3.6](https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.4](https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context)
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    
-   ##### Close.
    
    There should always be a clear way to close the modal. This can be a close button or one of the actions like Cancel.
    
-   ##### Positioning.
    
    Modals are usually centered on the screen, but they can also slide in from the sides if that fits the use case.
    
-   ##### Size.
    
    Support different sizes based on the content. Not every modal needs to take up the whole screen.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Focus Trapping.
    
    When a modal opens, move focus to the first focusable element inside. Keep the focus trapped there until the modal is closed. Then send focus back to where the user was before.
    
-   ##### Keyboard Navigation.
    
    Users should be able to move through all focusable elements in the modal using Tab and Shift+Tab. Pressing Esc should close the modal.
    
-   ##### Title & Subtitle Labeling.
    
    Use proper accessibility roles and make sure screen readers can announce the modal’s title and subtitle. If those aren’t visible, add an accessible label instead.
    
    -   WCAG:
    -   [2.4.6](https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels)
    -   [2.4.4](https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context)
    -   [2.5.3](https://www.w3.org/WAI/WCAG22/quickref/#label-in-name)
    -   [4.2.1](https://www.w3.org/WAI/WCAG22/quickref/#name-role-value)
    

[Back to the top](#Top)

* * *

### Pagination.

Pagination lets users move through chunks of content across multiple pages. It helps manage large sets of data without overwhelming the screen.

#### Pagination Checklist 0 / 6

-   ##### Selected State.
    
    Clearly show which page is selected. The selected page shouldn’t be clickable since the user is already on it. These should be distinct from the additional hover, focus, and active states to navigate to other pages.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [3.2.1](https://www.w3.org/WAI/WCAG22/quickref/#on-focus)
    
-   ##### Display Ranges.
    
    Don’t show every page number in long lists. Instead, show a few pages around the current one so users can still navigate quickly without clutter.
    
-   ##### Items per Page.
    
    Give users control over how many items they see per page. This helps with flexibility and performance.
    
-   ##### Intermediate or Truncated Pages.
    
    If the total number of pages isn’t known, use a simpler display that just shows next and previous controls instead of a full list of page numbers.
    
-   ##### Full Page Label Announcements.
    
    Make sure screen readers can announce each page with context—like “Page 3 of 10”—instead of just “3.”
    
-   ##### State Announcements.
    
    When a page is focused or selected, let assistive technologies announce that change clearly to the user.
    

[Back to the top](#Top)

* * *

### Progress.

A progress bar, donut, and other shaped progress components show how far along a task is, especially when it takes time or happens in steps. It helps set expectations and reduce guesswork.

#### Progress Checklist 0 / 4

-   ##### Label.
    
    Show a clear label that tells users what the progress bar is tracking. This helps them know what to expect.
    
    -   WCAG:
    -   [2.4.6](https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels)
    -   [3.3.2](https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions)
    
-   ##### Size.
    
    Support a few size options so the progress bar can fit different layouts—big ones for full-screen tasks, smaller ones for compact areas.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Duration.
    
    If you know how long something will take, show progress filling up over time. If not, just keep showing the bar until the task finishes or fails.
    
-   ##### Accessibility Label.
    
    If you can’t show a label on screen, make sure to add an accessibility label so screen readers can still describe what the bar is for.
    
    -   WCAG:
    -   [2.5.3](https://www.w3.org/WAI/WCAG22/quickref/#label-in-name)
    -   [Name, Role, Value](https://www.w3.org/WAI/WCAG22/quickref/#name-role-value)
    

[Back to the top](#Top)

* * *

### Radio.

Radio buttons let users pick one option from a list. Unlike checkboxes, only one choice can be selected at a time.

#### Radio Checklist 0 / 5

-   ##### Label.
    
    Every radio button should have a label. Clicking the label should select the radio. If the label isn’t visible, make sure screen readers can still announce what it’s for.
    
    -   WCAG:
    -   [2.4.6](https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels)
    -   [3.3.2](https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions)
    
-   ##### Checked State.
    
    Clearly show which option is selected. This is the value that will be sent when the form is submitted.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    
-   ##### Error State.
    
    If there’s an issue with the radio group (like a required choice that’s missing), show a clear error message and change the field’s visual style to match.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [3.3.1](https://www.w3.org/WAI/WCAG22/quickref/#error-identification)
    -   [3.3.3](https://www.w3.org/WAI/WCAG22/quickref/#error-suggestion)
    -   [3.3.4](https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data)
    -   [3.3.4](https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-all)
    
-   ##### Grouping.
    
    Radio buttons should always be used in a group. This ensures that users can only pick one and won’t get stuck with an unchangeable choice.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Accessibility.
    
    Users should be able to select a radio option using the keyboard. Native HTML elements usually handle this out of the box. Make sure your radio inputs utilize hover, focus, active, and disabled states in addition to the described.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    -   [3.2.1](https://www.w3.org/WAI/WCAG22/quickref/#on-focus)
    

[Back to the top](#Top)

* * *

### Select.

Select menus let users pick one option from a list. They’re great for compact forms or dropdown choices where only one answer is needed.

#### Select Checklist 0 / 8

-   ##### Label.
    
    Every select field should have a text label. Clicking the label should open the dropdown. If there’s no visible label, provide one for screen readers.
    
    -   WCAG:
    -   [2.4.6](https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels)
    -   [3.3.2](https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions)
    
-   ##### Error State.
    
    If there’s a problem with the selection (like a required field left empty), show an error message and a visual cue like an icon or color change.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [3.3.1](https://www.w3.org/WAI/WCAG22/quickref/#error-identification)
    -   [3.3.3](https://www.w3.org/WAI/WCAG22/quickref/#error-suggestion)
    -   [3.3.4](https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data)
    -   [3.3.4](https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-all)
    
-   ##### Disabled State.
    
    Use this when you don’t want users to interact with the select field. Disabled fields won’t send data when the form is submitted.
    
    -   WCAG:
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    
-   ##### Placeholder.
    
    If nothing is selected yet, show a placeholder to guide the user. You can also use it as a way to reset the selection.
    
-   ##### Helper Text.
    
    Add extra text under the field to explain what the user should choose or why it matters.
    
    -   WCAG:
    -   [3.3.2](https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions)
    
-   ##### Icon Support.
    
    You can include an icon before the selected text to give more context—like a calendar icon for a date picker or a globe for language selection.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.5](https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose)
    -   [1.4.5](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text)
    
-   ##### Prefix & Suffix.
    
    Use a prefix or suffix area to add custom visuals or text like flags, currency symbols, or other content that gives more meaning to the selected value.
    
-   ##### Accessibility.
    
    If the label isn’t visible, always provide an accessibility label so screen readers can still describe the purpose of the field. Along with covering all of the necessary hover, focus, and active states.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    

[Back to the top](#Top)

* * *

### Skeleton.

Skeletons are placeholders that show up while real content is loading. They help reduce the feeling of waiting and keep layouts from jumping around.

#### Skeleton Checklist 0 / 4

-   ##### Size.
    
    Skeletons are placeholders that show up while real content is loading. They help reduce the feeling of waiting and keep layouts from jumping around.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Shape.
    
    Use skeleton shapes that match the real components—like circles for avatars or rectangles for text and buttons—so the layout stays familiar.
    
-   ##### Composition.
    
    You can group simple skeletons to represent more complex layouts. It doesn’t need to match the real UI exactly, just give a good sense of structure.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Accessibility.
    
    If the user has reduced motion turned on, slow down or remove the skeleton’s animation to respect accessibility settings.
    
    -   WCAG:
    -   [2.3.1](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold)
    -   [2.3.2](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes)
    -   [2.3.3](https://www.w3.org/WAI/WCAG22/quickref/#animation-from-interactions)
    

[Back to the top](#Top)

* * *

### Switch (Toggle).

A switch is a toggle used to turn something on or off right away. It’s often used for settings that update instantly without needing to submit a form.

#### Switch (Toggle) Checklist 0 / 5

-   ##### Label.
    
    Every switch should have a label. Clicking the label should also toggle the switch. If the label isn’t visible, make sure screen readers can still announce what it does.
    
    -   WCAG:
    -   [2.4.6](https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels)
    -   [3.3.2](https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions)
    
-   ##### Checked State.
    
    When the switch is on, show it clearly. This usually means the action or setting is active and has already taken effect. Make sure you are communicating this state with more than just color.
    
-   ##### Disabled State.
    
    If the switch shouldn’t be used, show it as disabled. It shouldn’t respond to clicks, taps, or key presses.
    
    -   WCAG:
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    
-   ##### Keyboard.
    
    Users should be able to toggle the switch using the keyboard. Native elements usually support this by default.
    
-   ##### Accessibility.
    
    If you’re not showing a visible label, still provide an accessible name so screen readers can describe what the switch controls along with visual indication.
    

[Back to the top](#Top)

* * *

### Tabs (Segmented).

Tabs let users switch between different views or sections without leaving the page. They’re great for organizing content into smaller, manageable pieces.

#### Tabs (Segmented) Checklist 0 / 7

-   ##### Composition.
    
    The content under each tab should support a variety of elements—text, images, forms, or even other components.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Variants.
    
    Tabs can look different depending on where they’re used. For example, use pill-style tabs for full-page sections or underlined tabs inside cards.
    
-   ##### Selected State.
    
    One tab should always be selected by default, and it should be visually highlighted to show which content is active.
    
-   ##### Disabled State.
    
    You can disable specific tabs if they’re not available or ready yet. Disabled tabs shouldn’t respond to clicks or keyboard navigation.
    
    -   WCAG:
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    
-   ##### Icon Support.
    
    Add icons next to tab labels if it helps explain the content better. Just make sure they’re clear and consistent.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.5](https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose)
    -   [1.4.5](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text)
    
-   ##### Equal Width.
    
    When tabs span the full width of a container, you can stretch them so each one takes up the same amount of space.
    
-   ##### Accessibility.
    
    Tabs should support full keyboard navigation. Use arrow keys to move between tabs, and allow Home and End keys to jump to the first and last ones.
    

[Back to the top](#Top)

* * *

### Text Area.

Text areas are used when users need to enter or edit multiple lines of text. They show up often in forms, feedback sections, or message fields.

#### Text Area Checklist 0 / 7

-   ##### Label.
    
    Every text area should have a label. Clicking the label should move focus to the field. If there’s no visible label, add one for screen readers.
    
    -   WCAG:
    -   [2.4.6](https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels)
    -   [3.3.2](https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions)
    
-   ##### Error State.
    
    If something goes wrong—like a required field is left empty—show a clear error message and a visual style change so users know what to fix.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [3.3.1](https://www.w3.org/WAI/WCAG22/quickref/#error-identification)
    -   [3.3.3](https://www.w3.org/WAI/WCAG22/quickref/#error-suggestion)
    -   [3.3.4](https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data)
    -   [3.3.4](https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-all)
    
-   ##### Disabled State.
    
    Use this when the field shouldn’t be editable. Disabled fields should look inactive and won’t send data when the form is submitted.
    
    -   WCAG:
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    
-   ##### Placeholder.
    
    Placeholders can guide users when the field is empty, but they shouldn’t replace the actual label. Use them for examples or hints only.
    
-   ##### Helper Text.
    
    Add extra info under the field if users need help understanding what to write or how their input will be used.
    
    -   WCAG:
    -   [3.3.2](https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions)
    
-   ##### Size.
    
    Offer different sizes to fit different layouts. Bigger forms like on marketing pages may need a larger field, while compact UIs may need something smaller.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Accessibility.
    
    If you’re not showing a label on screen, include an accessibility label so screen readers can still describe the field’s purpose.
    

[Back to the top](#Top)

* * *

### Text Field.

Text fields are used for entering single lines of text—like names, emails, or search terms. They’re one of the most common form elements, so they need to be clear, consistent, and accessible.

#### Text Field Checklist 0 / 9

-   ##### Label.
    
    Every text field should have a label. Clicking the label should move focus to the field. If it’s not shown visually, make sure screen readers still get a proper label.
    
    -   WCAG:
    -   [2.4.6](https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels)
    -   [3.3.2](https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions)
    
-   ##### Error State.
    
    If the field has a problem (like being left empty when required), show an error message and change the visual style so it’s easy to spot.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [3.3.1](https://www.w3.org/WAI/WCAG22/quickref/#error-identification)
    -   [3.3.3](https://www.w3.org/WAI/WCAG22/quickref/#error-suggestion)
    -   [3.3.4](https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data)
    -   [3.3.4](https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-all)
    
-   ##### Disabled State.
    
    Use this to make the field read-only. It should look inactive and won’t send any value when the form is submitted.
    
    -   WCAG:
    -   [2.5.2](https://www.w3.org/WAI/WCAG22/quickref/#pointer-cancellation)
    
-   ##### Placeholder.
    
    Use placeholders to give examples or short hints, but don’t rely on them to replace the label.
    
-   ##### Helper Text.
    
    Show extra info below the field when users might need guidance, such as format rules or what the field is used for.
    
    -   WCAG:
    -   [3.3.2](https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions)
    
-   ##### Icon Support.
    
    You can place an icon inside the field, usually at the start, to give context, such as a search icon for a search input.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.5](https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose)
    -   [1.4.5](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text)
    
-   ##### Prefix & Suffix.
    
    Use prefixes or suffixes for added context, such as a dollar sign for prices or a logo for credit card types.
    
-   ##### Size.
    
    Offer multiple size options depending on where the field is used. Larger forms might need bigger fields, while tight layouts call for smaller ones.
    
    -   WCAG:
    -   [2.5.5](https://www.w3.org/WAI/WCAG22/quickref/#target-size-enhanced)
    -   [2.5.8](https://www.w3.org/WAI/WCAG22/quickref/#target-size-minimum)
    
-   ##### Accessibility.
    
    If no label is visible, provide an accessibility label so screen readers can describe the field’s purpose.
    

[Back to the top](#Top)

* * *

### Toast (Message).

Toasts are short messages that pop up over the page to give feedback or show quick info. They usually go away on their own after a few seconds.

#### Toast (Message) Checklist 0 / 8

-   ##### Composition.
    
    Toasts should be flexible enough to include text, icons, buttons, or other components depending on the message.
    
    -   WCAG:
    -   [1.3.1](https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships)
    -   [1.3.2](https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence)
    
-   ##### Color.
    
    Add an icon at the start to help users quickly understand the purpose of the toast—especially helpful for colorblind users.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum)
    -   [1.4.6](https://www.w3.org/WAI/WCAG22/quickref/#contrast-enhanced)
    -   [1.4.11](https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast)
    
-   ##### Icon Support.
    
    Most toasts should disappear after a short delay. Make sure users have enough time to read them. If they don’t close automatically, include a clear button to dismiss.
    
    -   WCAG:
    -   [1.1.1](https://www.w3.org/WAI/WCAG22/quickref/#non-text-content)
    -   [1.3.5](https://www.w3.org/WAI/WCAG22/quickref/#identify-input-purpose)
    -   [1.4.5](https://www.w3.org/WAI/WCAG22/quickref/#images-of-text)
    
-   ##### Timeout.
    
    Most toasts should disappear after a short delay. Make sure users have enough time to read them. If they don’t close automatically, include a clear button to dismiss.
    
    -   WCAG:
    -   [2.2.1](https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable)
    -   [2.2.2](https://www.w3.org/WAI/WCAG22/quickref/#pause-stop-hide)
    -   [2.2.3](https://www.w3.org/WAI/WCAG22/quickref/#no-timing)
    -   [2.2.4](https://www.w3.org/WAI/WCAG22/quickref/#interruptions)
    -   [2.2.5](https://www.w3.org/WAI/WCAG22/quickref/#re-authenticating)
    -   [2.2.6](https://www.w3.org/WAI/WCAG22/quickref/#timeouts)
    
-   ##### Stacking.
    
    When multiple toasts are triggered, stack them neatly so they don’t overlap or take over the screen.
    
-   ##### Actions.
    
    If the toast has an action (such as Undo or Retry) make it contextual and clear. Only include actions that are directly related to the message.
    
    -   WCAG:
    -   [1.3.6](https://www.w3.org/WAI/WCAG22/quickref/#identify-purpose)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.4](https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context)
    -   [3.1.2](https://www.w3.org/WAI/WCAG22/quickref/#language-of-parts)
    
-   ##### Focus.
    
    If the toast includes actions, they should be keyboard-focusable. While focused, the toast shouldn’t auto-dismiss.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [3.2.1](https://www.w3.org/WAI/WCAG22/quickref/#on-focus)
    
-   ##### Motion.
    
    If the user has reduced motion enabled, simplify or turn off toast animations to respect their preference.
    
    -   WCAG:
    -   [2.2.1](https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable)
    -   [2.2.2](https://www.w3.org/WAI/WCAG22/quickref/#pause-stop-hide)
    -   [2.2.3](https://www.w3.org/WAI/WCAG22/quickref/#no-timing)
    -   [2.2.3](https://www.w3.org/WAI/WCAG22/quickref/#no-timing)
    -   [2.3.1](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold)
    -   [2.3.2](https://www.w3.org/WAI/WCAG22/quickref/#three-flashes)
    -   [2.3.3](https://www.w3.org/WAI/WCAG22/quickref/#animation-from-interactions)
    

[Back to the top](#Top)

* * *

### Tooltip.

Description.

#### Item Checklist 0 / 3

-   ##### Position.
    
    Tooltips show quick info when a user hovers over or focuses on an element. They’re great for giving extra context without cluttering the interface.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    
-   ##### Timeout.
    
    Add a short delay before showing the tooltip. This helps avoid them popping up while the user is just moving their mouse around.
    
    -   WCAG:
    -   [2.2.1](https://www.w3.org/WAI/WCAG22/quickref/#timing-adjustable)
    -   [2.2.2](https://www.w3.org/WAI/WCAG22/quickref/#pause-stop-hide)
    -   [2.2.3](https://www.w3.org/WAI/WCAG22/quickref/#no-timing)
    -   [2.2.4](https://www.w3.org/WAI/WCAG22/quickref/#interruptions)
    -   [2.2.5](https://www.w3.org/WAI/WCAG22/quickref/#re-authenticating)
    -   [2.2.6](https://www.w3.org/WAI/WCAG22/quickref/#timeouts)
    
-   ##### Keyboard.
    
    Tooltips should appear not just on hover, but also when the trigger element gets keyboard focus—so they work for everyone.
    
    -   WCAG:
    -   [1.4.1](https://www.w3.org/WAI/WCAG22/quickref/#use-of-color)
    -   [1.4.3](https://www.w3.org/WAI/WCAG22/quickref/#content-on-hover-or-focus)
    -   [2.1.1](https://www.w3.org/WAI/WCAG22/quickref/#keyboard)
    -   [2.4.3](https://www.w3.org/WAI/WCAG22/quickref/#focus-order)
    -   [2.4.7](https://www.w3.org/WAI/WCAG22/quickref/#focus-visible)
    -   [2.4.11](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum)
    -   [2.4.12](https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-enhanced)
    -   [2.4.13](https://www.w3.org/WAI/WCAG22/quickref/#focus-appearance)
    -   [3.2.1](https://www.w3.org/WAI/WCAG22/quickref/#on-focus)
    

[Back to the top](#Top)

* * *

## Maintenance. 0 / 0

Design systems aren’t “set it and forget it” projects. They need regular updates, clear planning, and open feedback loops. To keep things running smoothly, your team should treat the system like any other product—something you build, maintain, and improve together over time.

### Documentation.

Good documentation saves everyone time. It helps new folks get started, answers common questions, and keeps designers and developers aligned without needing constant check-ins.

#### Documentation Checklist 0 / 10

-   ##### Design System Principles.
    
    List your core values and decision-making rules. This helps others understand why your system works the way it does and keeps contributions consistent.
    
-   ##### Getting Started.
    
    Write a simple guide for setting up and using the system. The goal is to help someone build their first feature without needing to bug your team.
    
-   ##### Design Best Practices.
    
    Share smart ways to use the system in your design tool, avoid mistakes, and scale designs with less effort.
    
-   ##### Development Best Practices.
    
    Cover technical do’s and don’ts—like which dependencies to use and how to avoid common implementation issues.
    
-   ##### Component Anatomy.
    
    Break down your components so users know which parts can be changed and what’s off-limits. Helps avoid weird layout bugs.
    
-   ##### Component Properties.
    
    List all the supported properties—both in the design file and in code. Try to keep things consistent across platforms to smooth out handoffs.
    
-   ##### Component Composition Examples.
    
    Show how smaller components can be combined to make more complex ones. This is especially useful for systems with slots or flexible layouts.
    
-   ##### Sandbox Product Example.
    
    Show how smaller components can be combined to make more complex ones. This is especially useful for systems with slots or flexible layouts.
    
-   ##### Browser and or OS Support.
    
    Document what browsers and operating systems you officially support. Sync this with your product team so there are no surprises.
    
-   ##### Release Cycle.
    
    Set a clear release schedule—especially for major changes. This helps product teams plan updates, test early, and avoid last-minute rushes.
    

[Back to the top](#Top)

* * *

### Libraries.

Your design system should cover the core building blocks, but not every component in the product. Product teams will sometimes need to create their own local components to handle specific use cases. That’s expected, and totally fine, as long as there’s a shared understanding of how and when to do it.

#### Libraries Checklist 0 / 4

-   ##### When to Build.
    
    Let teams know when it makes sense to build something themselves. If the need is too specific or one-off, it’s better handled locally than added to the core system. Save system updates for patterns that apply across multiple products.
    
-   ##### Horizontal and Vertical Libraries.
    
    Call out the difference between horizontal libraries (shared across multiple products) and vertical ones (built for a single product or feature). Both are valid, but they serve different purposes.
    
-   ##### Library Expectations.
    
    Set some basic standards for local libraries. This could include code quality, documentation, naming, and how they should be maintained over time. Nothing too heavy—just enough to keep things consistent.
    
-   ##### Release Cycle Alignment.
    
    Local libraries should stay in sync with the main system. When the system gets a major update, local components should be tested and updated too, so nothing breaks and the product isn’t held back.
    

[Back to the top](#Top)

* * *

### Processes.

Scaling a design system takes more than solid components, it takes smart processes. Having clear workflows helps your team stay focused, avoid repeat conversations, and build better relationships with your users.

#### Process Checklist 0 / 6

-   ##### Decision Log.
    
    Let teams know when it makes sense to build something themselves. If the need is too specific or one-off, it’s better handled locally than added to the core system. Save system updates for patterns that apply across multiple products.
    
-   ##### Roadmap.
    
    Plan out your big-picture goals, not just the day-to-day requests. Save time for bug fixes and community needs, but don’t let them take over the whole roadmap.
    
-   ##### Stakeholder Mapping.
    
    Set some basic standards for local libraries. This could include code quality, documentation, naming, and how they should be maintained over time. Nothing too heavy—just enough to keep things consistent.
    
-   ##### Analytics.
    
    Track what’s working. Use simple metrics like doc site visits, design tool usage, or feedback forms to understand which parts of your system are being used—and what needs more attention.
    
-   ##### Ongoing Support “Shifts”.
    
    If more than one person supports the system, take turns handling questions and requests. That way, no one’s buried in Slack all week and everyone gets time to focus on planned work.
    
-   ##### SLA.
    
    Set clear expectations on how quickly you’ll handle bugs, questions, or feature requests. This helps teams plan ahead and decide if they should wait or use a workaround.
    

[Back to the top](#Top)

* * *

### Community.

Supporting designers and developers is key to growing your system. When people know they can ask questions, report bugs, and get help easily, they’re more likely to use the system, and help improve it. Your job is to make sharing safe, simple, and worth it.

#### Community Checklist 0 / 4

-   ##### Support Channels.
    
    Set up clear channels for support—like Slack or Teams—and split them by platform if needed. That way, folks can ask platform-specific questions without confusion.
    
-   ##### Templates.
    
    Make it easy to report bugs or request features. Use templates that prompt people for what you need, like screenshots, design ideas, or steps to reproduce the issue so you don’t have to chase it down later.
    
-   ##### Regular Updates.
    
    Don’t just ship and stay silent. Share regular updates to keep the community in the loop and excited about new features. Even short posts or changelogs help people know what’s available and how to use it.
    
-   ##### Office Hours.
    
    Some things are better solved face-to-face (or Teams, Zoom, Webex, etc...). Offer bookable time slots for teams to talk through tricky problems, review designs, or ask questions one-on-one.
    

[Back to the top](#Top)

* * *

### Contribution.

Design systems work best when everyone has a voice. Invite product teams to contribute, give them the tools to do it right, and support them in becoming system advocates across the company.

#### Item Checklist 0 / 4

-   ##### House Rules for the System.
    
    Lay out how your team works, especially around design and development decisions. Be clear that design system work often takes longer because it affects everything, not just one feature.
    
-   ##### Contribution Guidelines.
    
    Give step-by-step instructions for setting up a design or dev environment. Help contributors test things properly before submitting changes so they don’t feel lost or blocked.
    
-   ##### Feature Proposal Template.
    
    Use a template to guide new feature proposals. It should include things like design mockups, platform impact, and a heads-up on what might break. The goal is to keep changes thoughtful and scalable.
    
-   ##### Engagement.
    
    Shout out contributors in release notes or team updates. Recognize their effort and help them get credit with their managers. A little appreciation goes a long way.
    

[Back to the top](#Top)

* * *

## Feedback.

### Help Make This Checklist Better for Everyone.

If you have corrections, additions, or suggestions, send them through this form and I’ll update the checklist as I refine it.