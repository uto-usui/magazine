---
title: "6 winning Figma Makes—and what you can learn from them"
source: "https://www.figma.com/blog/6-winning-figma-makes-and-what-you-can-learn-from-them/"
publishedDate: "2025-10-07"
category: "design"
feedName: "Figma Blog"
---

We launched [Figma Make](https://www.figma.com/blog/figma-make-general-availability/) to bridge the gap between concept and creation—giving teams a faster, more interactive way to explore and refine ideas. We recently partnered with [Contra](https://contra.com/) for our [Figma Make-a-thon](https://contra.com/community/topic/figmamakeathon) to see how our community would push the boundaries of what’s possible in the tool.

Over 10,000 creators participated in the Make-a-thon, vying for $100,000 in prizes, with a $50,000 grand prize pot. From a [Severance-themed](https://www.figma.com/blog/free-association-jeremy-hindle/) [virtual escape room](https://x.com/vitaspenser/status/1965806531179335712) for designers to a [“Figma-Kart” racing game](https://x.com/AcePrek/status/1965402051967627305), the entries show what’s possible when the gap between vision and execution narrows. Winners were chosen for their creativity in developing and executing an idea, their innovation in using Figma Make to create a prototype, and the cleverness of their prompts. Here, we’ve gathered the top tips from their projects.

## [Define the structure, not just the task](#define-the-structure-not-just-the-task)

Sebastian Lumbi’s [Frame by frame SVG animator](https://magma-herbs-91946622.figma.site/)—a tool for building handcrafted animations—earned him second place. Users can copy SVGs straight from Figma into the app to bring them to life, then export the results as GIFs. His background in animation and VFX drove Sebastian to create a tool that preserves handcrafted animation methods in a digital space.

Sebastian kicked off his project by researching key technical details, like the best approach for state management in Figma Make and how to ensure components could interact effectively. From there, he jumped into “an open dialogue with the AI,” he says. “I didn’t have a detailed prompting strategy at first. I was surprised by how fast the development was, so I just kept iterating and trying out new ideas until I ran out of things to add.”

Sebastian also found freedom in the use of the revert option, which “gives you a safety net, so there’s no risk in trying out a new idea,” he says. “And, if you're struggling to fix a bug or your app has crashed, it’s often more effective to go back to a previous point and try a different approach from there.”

**Number of prompts used:** “Initially it was only two prompts, then I got carried away experimenting and used about 80 more.”

**Starting prompt:**

`Use the design to create a frame-by-frame animation creator/player. The top part is the canvas where I can draw the frame, and the bottom part is where I can see the frames and create new ones.`

**Biggest takeaways:**

“Even if you don't code, understanding basic concepts that fit your app is very helpful. Since Figma Make generates code, giving it clear directions on how you want it structured makes debugging much easier later on. If you're unsure about the technical side, you can even ask another AI for recommendations.”

## [Refine your design up front](#refine-your-design-up-front)

Inspired by her love of handwritten notes and typography, grand prize winner Cara Ellis prompted her way to “[Web poetry](https://cake-soft-41607224.figma.site/),” which allows users to create a bespoke font by drawing each letter manually, then invites them to write a poem with that font.

Starting with pen and paper, Cara sketched out her vision several times before turning to Figma. From there, she recreated her work in Figma Design before bringing them into Figma Make. That upfront thinking paid off—once she started building, she needed fewer prompts to get the results she wanted.

**Number of prompts used:** 90

**Starting prompt:**

`Design a sleek, minimal web app that lets users create their own custom alphabet and then type with it. On the first screen, show the instruction: “Draw your own marks.” This text fades out and reveals a page of boxes labeled A to Z. Each box is a canvas that starts drawing immediately when the user hovers over it, no clicks needed. On hover, the canvas boxes get a subtle highlight effect around the edges. Users can sketch any symbol or letter they want in each box. After finishing, they click a “Done” button to move to a final screen that says, “Press any key to begin writing your art.” This final screen has a blinking cursor like a word processor. As soon as the user starts typing, that instruction disappears and the symbols they drew appear in place of standard letters. Use a neutral color palette with subtle fades.`

**Biggest takeaway:**

“Lean into iteration. Test your app as many times as you possibly can, and then get your friends to test it, too. Every time something is even slightly off, tweak it. If you have a good idea, it's worth getting it perfect!”

## [Tweak code in manageable chunks](#tweak-code-in-manageable-chunks)

After searching for a better way to showcase her freelance design work, Susanna Nevalainen set out to create her own solution. She took the title of “best prompt” with “[Moxy](https://contra.com/p/Xsg727bX-moxy-3-d-mockup-studio-less-flat-more-fab),” a 3D configurator that lets users upload custom branding into mockups—earning recognition for her methodical prompting process and the exceptional quality it produced.

She mapped out the structure on paper before drafting the layout in Figma and eventually bringing the design into Figma Make. She fine-tuned some details that were hard to describe in words—like the ability to resize and move handles—through sketches that she fed into Figma Make as well. She prompted the AI to organize the code into smaller, modular pieces—separating it into components, files, and folders so it was easier to edit and refine. Susanna also prompted the AI to ask more questions if her input was unclear, a tip that she says saved her “unnecessary iterations and rollbacks.”

**Number of prompts used:** 800

**Starting prompt:**

`a 3D configurator that allows you to upload custom branding into mockups.`

**Biggest takeaway:**

“Figma Make isn’t just for no-coders—developers can get a lot of value out of it, too. The fact that you can download the code and continue building in your own editor makes it a powerful starting point. This truly helps to bridge the gap between design, development, and AI.”

## [Prototype in chat, power it with real data](#prototype-in-chat-power-it-with-real-data)

Matt Schroeter’s “[Weather Synthesizer](https://trace-fling-73225149.figma.site/),” named “most creative,” allows users to _hear_ the weather by turning real-world weather forecasts into a musical composition. Rather than starting with a design file, Matt chose to fully co-create with Figma Make to see what could happen. “Sometimes it suggested improvements, and I would use them in combination with my ideas,” Matt says. He used his conversation with Figma Make to tweak the UI, audio playback, and small features like being able to select your home city.

**Number of prompts used:** 150

**Starting prompt:**

`A synthesizer in the shape of a plant that reacts to changing environmental/weather conditions: the current weather, wind strength, temperature, and air quality in Vancouver, Canada.`

**Biggest takeaway:**

“I was surprised how advanced you could get with Figma Make once you started using API integrations (like I did for the audio engine and weather data), and how fully functioning the output can be.”

## [Test early prototypes to inform design decisions](#test-early-prototypes-to-inform-design-decisions)

Third-place winner Johannes Specht created “[Plan That Trip. Now](https://star-pry-98962388.figma.site/)” to make planning group vacations simpler by helping narrow down the endless list of destination options. He started by jumping straight into designing high-fidelity prototypes to map out how he envisioned the app would look and feel. When it came time to build in Figma Make, he handed over his design files, added some fine-tuning through prompts, and inputted the basic logic for how the app should work.

The rest was just about tweaking his product directly via prompts while testing the web app. Seeing how the design behaved across browsers and screen sizes in real time allowed Johannes to refine layouts directly with a simple prompt.

**Number of prompts used:** 250

**Starting prompt:**

`Build this screen exactly as provided.`

**Biggest takeaway:**

“One thing I discovered is just how much value Figma Make adds to prototyping. You can quickly get a general feeling for an idea, uncover pain points, and test flows before the actual design phase has to start, all in a more realistic environment than ever.”

## [Use shorter prompts for easier testing and refinement](#use-shorter-prompts-for-easier-testing-and)

Daniella Marynova and Max Pradella teamed up to create the “[Package Customizer,](https://ebony-gentle-77642049.figma.site/)” winner of “most innovative.” Inspired by Max’s experience at a delivery company, the duo built a tool that lets users design the whole package, customizing sizes, materials, graphics, brand colors, and logos. The tool even includes an augmented reality view so users can see how the package would look sitting on their desk.

They started with a well-organized design in Figma with tokens, components, clear frame names, and consistent constraints. From there, the team kicked off ideation in Figma Make with a simple prompt. “We wanted to see how far one short instruction could go, then shape whatever came out from there,” Daniella says.

**Number of prompts used:** 450

**Starting prompt:**

`Create a parcel configurator.`

**Biggest takeaway:**

“Short prompts work better, are easier to test, and less likely to confuse the model. We also kept a list of prompt versions—it saves time if you need to go back.”

The Make-a-thon winners display the breadth of what’s possible with Figma Make, [now available to all users](https://www.figma.com/blog/figma-make-general-availability/). We can’t wait to see what you create.