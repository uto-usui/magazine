---
title: "Why AI-generated UX still feels off"
source: "https://www.vandelaydesign.com/ai-ux-feels-off/"
publishedDate: "2026-03-13"
category: "design"
feedName: "Sidebar"
---

There’s a particular uncanny valley in AI-generated interfaces. You’ve probably seen it: a dashboard that looks polished on first glance but feels wrong the moment you try to use it. A signup flow that follows every pattern in the book yet somehow creates friction at every step. Screens that are technically correct but experientially hollow.

This isn’t just aesthetic snobbery. There’s something measurably different about AI-generated UX, and the gap isn’t closing as fast as the hype suggests.

### **The Speed Problem Nobody Talks About**

AI tools can produce interface mockups in seconds. That speed is genuinely impressive. It’s also the source of most problems.

A Nielsen Norman Group study from early 2024 found that among UX practitioners they interviewed, designers were “most limited in their use of AI in their work.” Despite the explosion of AI design tools, the researchers found zero design-specific AI tools in serious use by professional UX designers. The tools existed. Professionals just weren’t using them for actual client work.

Why? Because good UX requires slowness in specific places. The pause where you reconsider whether users actually need this screen. The revision where you strip out half the elements because testing revealed people were overwhelmed. The conversation with engineering about why that animation, while beautiful, will tank performance on mid-range devices.

AI generates options. It doesn’t generate the constraints that make those options appropriate.

### **What AI Actually Misses**

The CHI 2024 research on UX professionals and generative AI identified several capabilities that practitioners consider irreplaceable by current AI systems. The list is instructive.

First, there’s what researchers call “contextual judgment”—the ability to weigh competing priorities that aren’t explicit in any brief. When a stakeholder says they want the checkout flow to “feel premium,” a human designer translates that into specific spacing decisions, animation timing, and copy tone. AI interprets it literally, often producing interfaces that look expensive but feel impersonal.

Second, there’s anticipatory design. Good UX predicts where users will struggle before they struggle. This requires mental models built from watching hundreds of people use interfaces, noticing the micro-hesitations, the cursor movements that reveal confusion. AI has pattern libraries. It doesn’t have intuition about human hesitation.

Third, there’s what the UXPA’s 2024 survey captured when they found 47% of UX professionals who used AI found it had “some value” while 20% were “not impressed.” The middling response suggests AI is helpful for certain tasks but insufficient for the work that actually matters: understanding why a design should exist, not just what it should look like.

### **The Hierarchy Problem**

Here’s a specific failure mode I keep seeing: AI-generated interfaces that have technically correct visual hierarchy but wrong informational hierarchy.

An AI tool will correctly make headings larger than body text, primary buttons more prominent than secondary buttons, and ensure adequate contrast ratios. These are pattern-matching problems, and AI handles pattern matching well.

But the AI doesn’t know that for this particular e-commerce checkout, the shipping cost is the information users most need to see early (because your return rate analysis shows unexpected shipping costs drive 40% of cart abandonment). It doesn’t know that hiding the “apply coupon” field in this specific context actually improves conversion (because your A/B tests showed that a visible coupon field sends users off to hunt for codes they don’t have).

The visual hierarchy is correct. The information hierarchy requires business context that wasn’t in the prompt.

### **Spacing That Doesn’t Breathe**

There’s a reason experienced designers obsess over whitespace. It’s not aesthetic preference—it’s cognitive load management.

AI systems trained on existing interfaces learn average spacing patterns. The problem is that spacing shouldn’t be average; it should be contextual. A dense data table might need tight line heights to help users scan rows. A meditation app might need expansive spacing to create psychological calm. A checkout flow might need strategic compression at certain steps (to reduce perceived effort) and expansion at others (to signal users should slow down and verify information).

When designers on Reddit discuss why AI-generated UX “feels off,” spacing comes up constantly. The interfaces look professional but feel cramped or floaty in ways that are hard to articulate. What users experience as “feeling wrong” is often mathematically average spacing applied to contexts that needed something specific.

### **Flows, Not Screens**

The deeper problem is that AI generates screens. Users experience flows.

A CHI 2024 paper noted that generative engines excel at producing “discrete design artifacts” but struggle with “longitudinal user journey considerations.” In plain terms: AI can make a beautiful password reset screen. It can’t make a password reset experience that accounts for the frustrated emotional state of someone who’s already failed to log in twice, the need to maintain security without creating more friction, and the opportunity to rebuild trust with a user who’s currently annoyed with your product.

The screen is the deliverable. The experience is the product. These aren’t the same thing, and AI consistently optimizes for the former.

### **Where AI Actually Helps**

This isn’t a “AI bad” argument. Current AI tools are genuinely useful for generating variation—creating 20 button treatments so a designer can pick the three worth testing. They’re useful for boilerplate components that don’t carry much strategic weight. They’re useful for speeding up documentation and creating placeholder content during early exploration.

What they’re not useful for is the thing that makes UX valuable in the first place: designing for specific humans in specific contexts with specific constraints that no training dataset can anticipate.

The Figma 2025 AI Report found 82% satisfaction among developers using AI features versus 54% among designers. That gap tells you something important. Developers use AI to accelerate implementation of already-decided solutions. Designers are being asked to use AI to generate the solutions themselves—and finding that the tool isn’t built for that kind of thinking.

### **The Skill That Matters More**

If AI handles pattern application, the remaining human value is pattern recognition: knowing which patterns apply to which situations, when to break patterns deliberately, and how to create new patterns when existing ones don’t fit.

That means junior designers learning to “use AI tools” are learning the wrong skill. The skill that will matter is developing the judgment that AI lacks—the ability to look at a technically correct interface and articulate why it’s wrong for this user, this context, this moment.

That judgment can’t be automated. It can only be developed through the slow, unglamorous work of watching real people use real products and caring about the difference between what works and what merely exists.