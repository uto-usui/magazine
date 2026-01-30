---
title: "Bill Atkinson’s 10 rules for making interfaces more human"
source: "https://www.figma.com/blog/bill-atkinsons-10-rules-for-making-interfaces-more-human/"
publishedDate: "2025-06-09"
category: "design"
feedName: "Figma Blog"
---

Every time you drag a vector or lasso a selection in Figma, you’re building on the vision of Bill Atkinson, the legendary Apple engineer who [passed away](https://www.nytimes.com/2025/06/07/technology/bill-atkinson-dead.html) last Thursday. At Figma, we owe an immense debt to Atkinson, whose belief that complex creative tools should feel intuitive is a direct influence on our mission. When our users manipulate vector graphics in real-time, they’re building on [QuickDraw](https://en.wikipedia.org/wiki/QuickDraw), the graphics engine by Atkinson that made the Mac’s visual interface possible. When they collaborate across teams, they’re benefiting from the way [MacPaint](https://en.wikipedia.org/wiki/MacPaint), the first intuitive bitmap editor, democratized design tools. When they design interfaces, they’re indebted to the [HyperCard](https://www.forbes.com/sites/timbajarin/2025/06/09/remembering-bill-atkinson-a-creative-genius-who-helped-shaped-the-mac/), a revolutionary tool that let non-programmers create interactive software.

Atkinson studied neurobiology at the University of Washington before being recruited to Apple as employee #51, where Atkinson initially worked on porting development tools before joining the emerging Macintosh team. His unique background bridging neurobiology and computing gave him an understanding of how humans and machines could work together.

These 10 rules, which we’ve derived from Atkinson’s approach to computing and creativity, serve as both an homage to his remarkable legacy and a guide for anyone building the future of human-computer interaction.

## [1\. Design within constraints, not around them](#_1-design-within-constraints-not-around-them)

When developing QuickDraw for the original Macintosh, Atkinson faced [severe memory and processing limitations](https://www.folklore.org/MacPaint_Evolution.html?sort=date) that should have made smooth graphics impossible. The machine had just 128KB of RAM and a slow processor. Rather than compromise on the vision of being able to draw complex shapes quickly and beautifully, Atkinson found ways to optimize—such as developing highly efficient algorithms for drawing shapes and curves, making smooth graphics possible on hardware that shouldn’t have been able to handle them. This became a signature approach—finding elegant solutions within tight constraints rather than trying to brute-force his way past them.

## [2\. Build tools that democratize creativity](#_2-build-tools-that-democratize-creativity)

Before HyperCard, creating interactive software required years of programming training and deep technical knowledge. Atkinson envisioned something radically different: a hypermedia system that he described as a “software erector set” where anyone could build interactive applications using visual tools and natural language scripting. Teachers could create educational software, artists could build multimedia experiences, and businesses could develop custom databases—all without traditional programming skills. The belief was that the most transformative tools shouldn’t just serve experts; they should make it possible for everyone to create, and in fact, [in an early Macintosh ad](https://www.youtube.com/watch?v=k4c8JpN2wKw) he described himself “as a cross between an artist and an inventor.”

## [3\. Make interfaces feel inevitable](#_3-make-interfaces-feel-inevitable)

Atkinson invented interface elements so fundamental to computing that we can barely imagine working without them today. These include the menu bar that creates consistent command hierarchies across applications, the double-click action, and optimized algorithms that enabled smooth curves on early bitmap displays. These innovations weren’t flashy features—they were building blocks that made drag-and-drop, point-and-click computing possible for everyone, not just programmers. He knew the mark of great interface design was when a user could stop thinking about the tool and focus entirely on the work itself.

## [4\. Question the “obvious” solutions](#_4-question-the-obvious-solutions)

“I have realized over time that I missed the mark with HyperCard,” Atkinson reflected in a 2002 [interview for _Wired_](https://www.wired.com/2002/08/hypercard-what-could-have-been/). “I grew up in a box-centric culture at Apple. If I’d grown up in a network-centric culture, like Sun \[Microsystems\], HyperCard might have been the first Web browser.” Apple focused on standalone computers—the “box” on your desk—while Sun Microsystems prioritized networked computing from the ground up. Atkinson had created a brilliant system for linking information, but only thought about connections within a single computer, not across the emerging internet. This willingness to question his own assumptions defined his approach. When everyone assumed computer interfaces had to be text-based command lines, he helped pioneer the graphical user interface. When bitmap editing seemed impossible for everyday users, he created MacPaint with tools that worked like real-world art supplies. Each breakthrough came from rejecting conventional wisdom. Whenever something seemed obviously impossible or obviously correct, that’s exactly when he would push on his assumptions.

## [5\. Optimize for delight, not just function](#_5-optimize-for-delight-not-just-function)

MacPaint was so intuitive that young children could sit down at a computer and immediately start creating without instruction. But this wasn’t accidental—Atkinson carefully designed every interaction to feel natural and joyful. The paint bucket tool worked exactly like pouring paint, the brush was simple and direct, and the interface invited experimentation. He built software that went beyond just accomplishing tasks—it made people want to explore and play. He understood that the best tools don’t just make work faster; they make work feel more creative.

## [6\. Engineer with the end experience in mind](#_6-engineer-with-the-end-experience-in-mind)

For Atkinson it wasn’t just about writing efficient code—he wanted to build systems that felt right to use. When developing QuickDraw, he could have optimized purely for computational speed, but instead he balanced performance with visual quality. His algorithms produced smooth curves and clean lines that made digital graphics feel natural, bridging the gap between mathematical precision and human intuition. In other words, great design demands great engineering and vice versa.

## [7\. Hide complexity behind simplicity](#_7-hide-complexity-behind-simplicity)

Atkinson understood that powerful systems should feel simple, with complexity hidden behind intuitive interactions. HyperTalk represented a breakthrough in programming accessibility—developers could write code that read like natural English rather than cryptic syntax. Instead of writing “if (mouseClick == true && objectSelected != null)” you could simply write “on mouseUp, go to next card.” Behind this natural language interface was a sophisticated parsing engine that translated human-readable commands into efficient machine operations. Similarly, MacPaint’s seemingly simple tools—paint bucket, brush, eraser—concealed complex bitmap manipulation algorithms that handled memory management, color mapping, and real-time rendering. This was Atkinson’s genius: making the complex feel effortless so users never had to think about the underlying complexity—they could just create.

## [8\. Code for human perception, not against it](#_8-code-for-human-perception-not-against-it)

Atkinson’s dithering algorithm was specifically designed for the Mac’s 512×342 monochrome display, creating high-contrast images with sharp edges that avoided the “muddy” midtones of other techniques. The algorithm became a cornerstone of the visual vocabulary of the Macintosh, enabling rich, velvety tones on a simple black-and-white screen. His approach exemplified a core principle: The best algorithms don’t just process data—they enhance human capabilities by working with our visual perception to create something more beautiful than either could achieve alone.

Transform photos with Bill Atkinson's iconic Mac dithering algorithm

[View Figma Make](https://near-chew-78829061.figma.site/)

## [9\. Build tools that teach by doing](#_9-build-tools-that-teach-by-doing)

HyperCard didn’t just let people create interactive applications—it showed them how software could work by letting them experiment and discover. Users learned programming concepts naturally through direct manipulation rather than abstract instruction. This wasn’t accidental; Atkinson designed the system to be inherently educational. Kids could build choose-your-own-adventure games by linking story cards together, small business owners could create custom databases by dragging fields and buttons, and hobbyists could craft interactive art by connecting sounds and images—all while unconsciously absorbing concepts like conditional logic, data structures, and user interface design. Learning became a byproduct of creating.

## [10\. Create platforms, not just products](#_10-create-platforms-not-just-products)

Atkinson understood that the most transformative innovations aren’t standalone products—they’re foundations that enable entirely new categories of creation. While MacPaint was revolutionary as a drawing application, his real genius was in creating QuickDraw, the underlying graphics framework that enabled thousands of other applications. HyperCard wasn’t just a hypermedia tool; it became a platform for creativity that spawned everything from educational software to business applications to early multimedia experiences. He didn’t just solve immediate problems; he built foundational technologies that let others solve problems he’d never imagined.

Every day at Figma, we wrestle with the same challenges Atkinson faced: How do you make powerful tools feel effortless? How do you hide complexity behind intuitive interactions? His fingerprints are on every pixel we push, every selection we make, every moment of creative flow our users experience. Near the end of his career, Bill Atkinson [joined Numenta](https://numenta.com/blog/2005/03/15/bill-atkinson-joins-numenta-advisory-board/), a neuroscience-based research company, where he worked on artificial intelligence that he believed was “more fundamentally important to society than the personal computer and the rise of the Internet." His vision for AI wasn’t about replacing human creativity—it was about amplifying it, just as his Mac interfaces had done decades before. Atkinson’s legacy reminds us that the best tools, whether analog, digital, or artificially intelligent, serve a higher purpose than simply processing input—they amplify human potential and enable true innovation by giving others the means to build the future.