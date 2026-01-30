---
title: "Cooking with constraints: A designer’s framework for better AI prompts"
source: "https://www.figma.com/blog/designer-framework-for-better-ai-prompts/"
publishedDate: "2026-01-05"
category: "design"
feedName: "Figma Blog"
---

Every night after work, I start my second shift as the home cook for my family. Prep might begin during an afternoon break—chopping veggies, marinating proteins, setting timers for the oven or Instapot. Cooking is a lot like design. Knowing what to cook, when to season, how to prep, and when to use restraint; every action matters to get the desired outcome.

I never say “thank you” to my knives. Or to the stove, the oven, or the microwave. There’s a reason their buttons don’t say “please start.” Tools don’t require empathy. They require clarity.

Large language models are no different. They are machines built to interpret, not to feel. They export empathy beautifully, but they do not require it as input. In fact, the more polite you are to a model, the more ambiguity you introduce.

Models want clean instructions and clear constraints. And while prompt fluency is becoming table stakes across many roles, for product designers, it's a uniquely critical skill. That’s because models are, by nature, probabilistic and variable. Design is the opposite: precise, repeatable, and intentional. Bridging that gap requires systems thinking, not just language skills.

**Stochastic** refers to randomness in a system; in LLMs, it explains why outputs are probabilistic rather than fully deterministic.

Where code has structure and AI has stochasticity or randomness, design sits in the middle. It has to be legible. That’s what makes prompting in a design tool different: You can’t just vibe your way to a working prototype. You need inputs that collapse uncertainty into structure.

## [Mise en place](#mise-en-place)

In cooking as in prompting, prep is everything. As they say in haute cuisine, _mise en place,_ meaning "everything in its place" is how you bring order to chaos before heat ever hits the pan. Spend the time prepping correctly, and you’ll spend less time fixing later. 

As designers, many of us are particular about our environment—the music we play, the lighting we set, and where everything is arranged on both our desk and our desktop. Sometimes it means giving yourself a new file, a clean page, an empty canvas. With prompting, we need to make sure that we have certain things arranged, too. Every prompt needs clarity, context, and constraints. I've been building my own prompt framework, and this TC-EBC structure—Task, Context, Elements, Behavior, Constraints—has served me well. This kind of structure doesn’t just help you get better results—it’s aligned with what prompt engineers and system designers are converging on across disciplines. [A well-circulated checklist from a Reddit user](https://www.reddit.com/r/PromptEngineering/comments/1nt7x7v/after_1000_hours_of_prompt_engineering_i_found/) with 1,000+ hours of LLM prompting arrives at the same priorities: clear task, constraints, modular sequencing. [Microsoft’s Semantic Kernel documentation](https://learn.microsoft.com/en-us/semantic-kernel/concepts/prompts/) reinforces this too, with prompt design patterns that emphasize intent definition, modular construction, and predictability over cleverness. It's more about alignment of intent than it is an exacting recipe.

For example, let’s say you’re designing a prompt for a new [Figma Make](https://www.figma.com/blog/figma-make-general-availability/)

that generates recipes from pantry photos. If you were to just write out what you’re hoping to achieve using natural language, it might look something like this:

`Please build a new app that allows home cooks to take a picture of their pantry or freezer to suggest recipes. Remember any allergies or preferences. Thanks!`

That’s the equivalent of throwing all your ingredients into a pot and hoping for a meal. And honestly, I’m not thrilled with what we got back.

![Four mobile app screens showing PantryPal’s pantry scanning, item list, recipe suggestions, and dietary preferences interface.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB90lEQVR4nE3RQW/UMBAF4P3/J/4E4gwHLnAAGWlR1A1KW0FFSxG9tN7drJPYiWc8b2zkbFWI5EMun957swGkzH4q3p1yIupVdcvMjTA75agqaRKRlogMLYuNfkJi8iLSMbOJ82zD4DKFUFS1bCSlMo1jcc5lIuoBbGOMDTM7iCiAKSVp5zmaEIL1k8cSyS8xdiEEM46jHZzL8zwXABWUcupdeXra53le1oRE1CQRp+dvEkFLxIaI7BIJkZJfInWRyCwx2hBCDXNOGCOVu9vfpW0vs7WHf5X/A4EzyMw2JUES8UmkA2BExMYYV3BNGGMst7f3Zbfr8tPjfgUBNABWsJSygrXyskQrIlBVD6BTVQPAMnNm5jOYUirDMJbjsc/eh56IVlBVX0BVbb335nDo7eHQw7nBhzB3IvIC1oS17QrWHyJeN3TObZllBQGcE6q2+/3RXF19t01zgd3Fzt/f33XzPK+Vlxiz9770/alsakwRqS8zp35ZlpfK8nzlCp7cYG5uftjtl/cwH1/77uJD54eTAdRySrlON02+bLJqyUBRIKvqumHO+RlMZxDa1ose9g/2+ttbNJ9e+evmTTe6R6Oqddd8DpXKRiUVMBUkzgBWUFUbrVdOrCqyHqXuNY1H+/DrK+4u3/k/Pz93wR8NBDZRzImpVOsvOmfzICeeq68AAAAASUVORK5CYII=)![Four mobile app screens showing PantryPal’s pantry scanning, item list, recipe suggestions, and dietary preferences interface.](https://cdn.sanity.io/images/599r6htc/regionalized/b2d9e941cc4873b2643db053e03bb3e317d42d32-1668x852.png?rect=1,0,1667,852&w=1080&h=552&q=75&fit=max&auto=format)

Without discussing the visual design, this result is generally lacking. It’s not a bad starting point—it has some basic features and functions, but on the whole it is uninteresting, and just a step above a wireframe.

Now let’s try the same prompt adapted to the TC-EBC format:

-   `Task: Build an AI-powered meal suggestion app using pantry/fridge photo inputs`
-   `Context: Home cooking assistant for households with dietary restrictions`
-   `Elements: Camera input, pantry scanner, dietary settings form, meal suggestions list, recipe cards`
-   `Behavior: User uploads photos; app scans inventory, filters by diet prefs, suggests recipes`
-   `Constraints: Mobile-first, iOS/Android, accessible UI, supports multiple household profiles`

As you can see, the TC-EBC formatted prompt is clear, scannable, and explicit about desired behavior and UI. It is also much more likely to generate the result you’re looking for, while the initial prompt was rambling, vague, and buried the task in pleasantries. The structured version replaces guesswork with clear guidance. A well-built prompt disambiguates intention, just as a great design system can provide the appropriate structure and guidance to a design.

![Four mobile app screens from a cooking app showing pantry status, a recipe detail view, step-by-step cooking instructions, and profile dietary settings.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAAAsTAAALEwEAmpwYAAACxElEQVR4nC3NzWtcVRjH8ftXuXDlQrr2ZZGFgguxFKoopkLFTEhJMG2jRkgbMl1URIug1BQbTGdSiNOcwXGalkztpLlzvQ2J0zln3s59O/ee85wzPI9McfFb/j5fb99vU3O6Thv3wyNbbz8O168tsw9nXucfv/cGli7OwspXV4NaY48NdczTicF8AkY57RswLM+VSJIY81yRtUDe7Hdr9M7qJXpz+XN8a2XOnl1bDC8vnWdL587wS5/O4OqVOdhYvxLUm38woWMeO43qfzBWCesN++Jf0cNRJEkbTd6715botdJH9Mrs+/jqxXP27cXZcHHhLFs4f4aXLszg2soFuHn9i6DR3GHCxFy6AtOJMakt/EEs2bPT5+Ig9PF5r0uqyMkr727R9Xu/Unl7E2/u3LW3qlvhjfIqm//sA3554RP8YWMBfvtxOWi39likU66cQTOxpnDgJ1oxLkfidCCwL8ekQZP34Gif/j4+ou6A4zCObH80DFsHj9n96jb/q17Do3YT/vEfBj1+wmSecmUKBGeNmzjfTRwDAFFojVprcs6St9uo0sHTJo3GAwQACwBhHEdMiB6XkcS8yCE3eTDSGRtkMZcqxQKMsc75zjlmAQQYmH7JOUfe3cpt2qvvEOddNMa8BLXRLE0TnqkUtS6mmSADw6TOeJIr1ADGTUEAZrUWUOhpmBKVkXd7e5Pu1yp0+uIEC62tARMqnbNxLPk4kRhlKSQqCxKl2Cga88FwgGM5Nmka+0ZrBroQhVIok4i6oz55D5+16KDzlI6HLzAp8pfgieix2pNHfPfJI9w7bEGzcxi0OoesVn/A71V+x2q1YhqNP30xFCzWqZB5gjJPaKxi8mSeUV8l1FUSE6stWBs2O4fsmzs/8S9/+R6vbt6CG5U7wc87W+zr9W95aX4O50tzplze8P3jgPUhFULHGIEi5TT9ByfSqEVlW7A6AAAAAElFTkSuQmCC)![Four mobile app screens from a cooking app showing pantry status, a recipe detail view, step-by-step cooking instructions, and profile dietary settings.](https://cdn.sanity.io/images/599r6htc/regionalized/66bd15530a771d7a434eee48e1d98b7d07fbb059-1751x852.png?rect=2,0,1749,852&w=1080&h=526&q=75&fit=max&auto=format)

And the results? The screen on the left was the initial one-shot from the above TC-EBC structured prompt. The context, elements, and constraints provided what Figma Make (and the underlying LLM) needed in order to build the app we wanted, the app we _intended_ to build. In addition to a richer, more visually appealing design, the refined prompt created better scaffolding to build on.

Ask what context your model needs to succeed, then remove everything else. Unnecessary fluff slows down the process, confuses the model, or at a bare minimum, forces the LLM to spend additional cycles deciphering meaning. Elegance in AI, like elegance in design, is a process of subtraction. The key is paring down to the essentials, which requires meticulous preparation and a robust, well-defined design system to ensure clarity and coherence.

Looking for help with your prompts? Try my [Make Prompt Assistant GPT](https://chatgpt.com/g/g-6847442f6bec81919bee6655a005d9b2-make-prompt-assistant). I entered the initial “polite” prompt into the GPT and told it to give more structure and clarity to the prompt to create a more compelling app. The result was the TC-EBC prompt we used above.

## [Refine the recipe](#refine-the-recipe)

A well-structured prompt reads like a recipe card: short, direct, and instructive. Every “maybe,” “just,” or “please” dilutes intention and adds noise. The goal isn’t to be verbose or polite—it’s to be clear.

We use TC-EBC to create that structure:

-   **Task** defines what you’re building.
-   **Context** frames why and for whom. It prevents drift.
-   **Constraints** set the guardrails, keeping the system controlled and consistent.

Each part of the TC-EBC structure narrows ambiguity and strengthens intent. Together, they turn guesswork into guidance. For all of us who’ve spent hours staring at an LLM thinking-waiting-reasoning-adjusting-deciding status message, we understand intuitively that being precise is an energy-saving, clarity-building design choice. Consuming fewer tokens becomes an exercise in efficiency.

Let’s look at another example using a scenario that most product designers have found themselves dealing with lately:

**Vague prompt:**

`Write a description for this feature. Keep it simple but also exciting. Maybe like how Apple does it?`

**TC-EBC prompt:**

-   `Task: Write a short product feature description.`
-   `Context: For a new “One-Click Export” feature in a design tool.`
-   `Elements: Headline (max 7 words), subheadline, single-sentence body copy.`
-   `Behavior: Body should imply speed, simplicity, and trust.`
-   `Constraints: No jargon. Match the brand tone of Duolingo or Notion. Total length: under 200 characters.`

The TC-EBC prompt is much better at defining what you want, and how to get there. Providing the constraints and specific direction for elements and behaviors undoubtedly gets you closer to your mark, and I’d posit your results will be quicker, and more precise.

As Figma Dev Advocate Jake Albaugh says, “The more direct the language, the more efficient the exchange.” Specificity doesn’t mean rigidity. It’s precision paired with adaptability; tight enough to hold its shape, flexible enough to evolve. Like design and cooking, it’s about balance.

## [Layer in flavor](#layer-in-flavor)

Prompting is iterative. You taste, test, and adjust as you go. The goal isn’t perfection, it’s calibration, and each round will reveal new notes, gaps, or overreaches in the model’s reasoning. Whether you’re building an app in Make, working on a book idea with ChatGPT, or writing code with Cursor and [Figma’s MCP server](https://www.figma.com/blog/introducing-figma-mcp-server/)

, revision prompts are about continuing to layer in context to work up to a better final product.

**Pro tip:** Use an LLM like ChatGPT, Claude, or Gemini as a prompt partner to keep your makes cleaner. Teach it the [TC-EBC framework](https://github.com/greghuntoon-figma/tc-ebc), and tell it to assist you in refining your revision prompts. Add images, screenshots, and your desired outcome, and the LLM will provide back well-structured revision prompts. For revision prompts, I always add directions in the Constraints part of the TC-EBC prompt to make it abundantly clear what the tool should _not_ be adjusting.

To get the most out of revision prompting, it’s important to define what belongs in your model’s line of sight and what doesn’t. [Anthropic calls this _context engineering_](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents): curating what the model sees, remembers, and weighs. The goal is to keep intention pure. If _mise en place_ is preparation, context is discipline.

In Figma Make, you can [provide a wide range of context](https://www.figma.com/blog/4-ways-for-design-teams-to-chart-new-territory-with-figma-make/)

for your creations. Like with any other model, you can simply upload screenshots to provide design context in Make—and there is a time and a place for that—but providing a Figma frame whenever possible is going to yield better results. That’s because the design frame contains structured data. Instead of asking Make to extrapolate and interpret an image, you are providing it with well-structured design data to build from. It doesn’t have to work so hard to translate because it’s already “written” in a language it intuitively understands.

Additionally, you can add directions on APIs and/or dependencies like [three.js](https://threejs.org/) or [D3js.org](https://d3js.org/) that you want Make to use and reference. And while using a structured approach to your prompt like TC-EBC is still important in revision prompts, added context gives it body and the unique flavor you expect from polished, shippable designs.

![A library-selection modal displaying several design system thumbnails such as CoLab PEX SDS, CoLab Style Guide, and demo asset libraries.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsTAAALEwEAmpwYAAACuElEQVR4nH2US2sUQRSF57doMDP9qOr3q/qV7snMJEYTAkOCoFloVBJRIU4QH3HhMrsoQiQobsSFIOpCRVBEs3fh/zlyq7uTCSYuDtVU9/3qnntvVysIAuR5jrIsUJalXLMsR5IkSNIEcRwjiiIp+tYwDOi6Ds45TNOEbdtwHAeu60q1fN9HlmXIshRFnqHXncJ0mSNLBDzXhWVaMpBEMMaYBJLomXMOy7IkmNTyPA9JnKDfzXHtwhwerA2xtb6EO6uLWJzN4bsO7DoDyuQ4KKvB9K5FVMpycbbA80eX8WNvhP2Xm/i8u4F7a0OUeWWbXNBKUAJpmnZEel2GFuMMhmlgrpfgyf2L+Lp7E9/3buPj0xsYrS4gjUN5YBSFsoZk7zigpmkVUGc6uGWg3/PweDSNNzvzePtsAS+2z+H6SoYwcGDbZNmR2RGQLP4faHLMn3fxaifH7y99/Pk2wM8PfWxtpiiLCEIksmlpmiIMQ1mrE4GMisoZ5mZs7G7n+PVugP33PXx63cXdWzHy1IcfBBCiGh1qzn8zZHWXRGjiyqUSD0fz2Fjv4uqKwNmBB9e1jozF+Ag1YnXXK8t1gemjmUEfy8tDzM70kaUxwjCQou7G8eGQk+1GQRDIg5rRkcCKbkAIgaIokKYZokjA9z0EgS/tCkEHhAfz2KyO48hkDoBVulVNVJVqoUPVdCiKAl3TYFkmHPuwwxRMgY1N7Z8u15uTk22cPsXQ7sTgppDQjtKRmcRCyOwbu7RHwcePja5DVVVMnlEwMRHBMIcou0vIpwpwg8N1bQkjUb0IdtIs8gbIGAfTHShKAFWNYVqRtKYoHWiqeqSL1IDmxhn/l0kUI2tomjY8N4XjxBLe6XTQbrflqpAURT4TkCzThULBlGnTGBLtywyru42suAenNz/8uJoMGxGAyjCuvw/FOg8ENzSsAAAAAElFTkSuQmCC)![A library-selection modal displaying several design system thumbnails such as CoLab PEX SDS, CoLab Style Guide, and demo asset libraries.](https://cdn.sanity.io/images/599r6htc/regionalized/460a0313c2290c652e8ba0c3ca50e6ccb0a1451c-1130x952.png?w=528&h=445&q=75&fit=max&auto=format)

You can also layer in style context by adding a library, add behavioral and structural guardrails by adjusting Make guidelines, or add deep context to your prompts via [MCP connectors](https://www.figma.com/blog/introducing-figma-mcp-server/)

into Notion, Asana, Github, Atlassian, Linear, and Monday.com. Instead of simply describing a desired change, add a PRD you wrote in Notion, or a task you’ve already defined in Asana, Jira, or Linear. (There’s also [a GPT for creating those PRDs](https://chatgpt.com/g/g-692e691596188191ae95dcfa84f7cfa5-prd-gpt).)

![A dropdown menu offering options to attach a design, upload an image, or connect GitHub, Notion, and other integrations.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAAAsTAAALEwEAmpwYAAABoUlEQVR4nKWSS07DMBiEOUnTVo6T+JE4zbsBGgKLboElYgELFhwBiQ0S5RoseEhcctDv4opSCkgsxomtzPfPJNlRSiFJDIypkZpdxPEUSlaQn7TaixJCZFBKg3zfaYcWrfeRZ9domwWm9QPq8n6lqlggS+9h4gVMfActryBECym3AKWUEKJDkd+i715w2L2tdHTwhm7vFUX2hDR5Rho/QokbROEM5NsKDIIESs1RFueoqws01QWm9SWmzSUm6RnC4BQ+O4HPjsFYD84TC9Rar+mjsgTnHJwHtoYQCiKSiCKBMIzAmA/PG640HA7h+z6kFBvptNbLhAQkcJ7nMMbY6b7PrXkwGKzJ87wPoNwODIIAk8kEXdehrhukaWrPyPxvYNM09l4IgfF4vAH9E5BzbgEEonSkOI4RhuFG7V+BSilrpJR0jaLIwkk0aDQaWYgT7V0A8hpjUJYlsixbAmmhNKTPn9+9CsbYmghGQ13Cqqown88xm80swwKTJLE1XWWaSmdkcGmdvlYtigJ936Nt2yXQdXdJv0v8k+g5Gk5X+rHfAda6kq/w99N1AAAAAElFTkSuQmCC)![A dropdown menu offering options to attach a design, upload an image, or connect GitHub, Notion, and other integrations.](https://cdn.sanity.io/images/599r6htc/regionalized/9ff637e8eaf937f152929b47ecf8848d6e6220fd-824x554.png?w=528&h=355&q=75&fit=max&auto=format)

Think of this as creative debugging. Over time, revisions teach the model your design style and approach, and you begin to better understand the model's limitations—how much complexity it can absorb, where it needs structure, and when it benefits from simplicity. The process grows faster, tighter, and more expressive with each round.

Working with AI models is not an exact science, but adding design context makes the process more deterministic, and less like throwing ingredients at your stove and hoping for a meal. You end up with prompts that feel less like recipes on paper and more like practiced technique.

## [Choosing the right knife](#choosing-the-right-knife)

Every model cuts differently. Their architecture, training data, and alignment shape each one into a specific kind of blade—some are designed for fine detail, others built for broader, faster cuts. Treat them like a well-stocked toolkit: When you understand the edge each model brings, [you can choose](https://help.figma.com/hc/en-us/articles/36400680326551-Use-experimental-models-in-Figma-Make) the one that fits the workflow and sharpens the outcome.

In Figma Make, our default model is Claude Sonnet 4.5. It’s great at summarizing, following nuanced structure or light context, and delivering a friendly tone. CS 4.5 tends to infer intention gracefully when prompted clearly, and it favors architectural prompts with rich embedded logic, like the TC-EBC prompt framework. Think of Claude like a well-trained sous chef: If your instructions are sharp, it’ll execute beautifully. If they’re vague, it’ll try to please you—sometimes to a fault.

We recently introduced [Gemini 3](https://www.figma.com/blog/gemini-3-pro-is-now-available-in-figma-make/)

(Nano Banana Pro) as an alternate model in Make. And it’s good. Honestly, it’s _really_ good. ([Here’s how to enable it](https://help.figma.com/hc/en-us/articles/36400680326551-Use-experimental-models-in-Figma-Make).) Gemini is fast, structured, and sometimes sharper with short prompts and tight constraints. It performs well under ambiguity when precision is enforced. It won’t hand-wave its way through unclear inputs. Also for narrow tasks, things like renaming layers, swapping icons, or tuning layout language, it shines.

Lastly, GPT-4 and now GPT-5 are used in my [Make Prompt Assistant GPT](https://chatgpt.com/g/g-6847442f6bec81919bee6655a005d9b2-make-prompt-assistant) and are generally some of the more well-known models. GPT is the known quantity: smart, verbose, and incredibly capable, but occasionally a little too eager to help. It likes examples. It responds well to demonstration. And it remains the best generalist available.

Prompt fluency isn’t just about structure. It’s about model choice. And in Figma Make, we’re giving you the option to switch models explicitly. That means you can now match your prompt, and your expectations, to the model best suited for the job. This is how prompting becomes a design decision, not just an interaction.

So which should you use? Depends on the job:

Use **Claude** as a balanced collaborator that can follow layered structure.

-   **Great for:** Clean summaries, structured follow-through, and friendly, lightly contextual work
-   **Cuts best when:** Your instructions are crisp and your logic is embedded right in the prompt (TC-EBC fans, rise)
-   **Vibe:** A well-trained sous chef—give it sharp direction, and it’ll plate something beautiful; go vague and it’ll try a little _too_ hard to make you happy

Reach for **Gemini** when you want fast, consistent results on narrow tasks.

-   **Great for:** Tight prompts, fast structured tasks, and anything with clear constraints
-   **Cuts best when:** Precision is required but the input is short—rename this, swap that, refine the wording here
-   **Vibe:** The sharp utility knife—crisp, fast, no patience for hand-waving; give it a narrow job and it’ll slice cleanly every time

Go with **ChatGPT** for reasoning, examples, or exploratory reframing.

-   **Great for:** General-purpose reasoning, rich examples, long-form structure, and anything that benefits from “show, don’t tell”
-   **Cuts best when:** You provide demonstrations or patterns it can follow—it sharpens itself by mirroring what you model
-   **Vibe:** The classic chef’s knife everyone trusts—incredibly capable, eager to help, and still the most reliable generalist in the drawer

## [Plating the dish](#plating-the-dish)

By the end of any LLM-assisted design or development session, you’re not just generating output. You’re designing a repeatable system for the future. You started with clear intent. You structured the logic. You chose the right model for the job. And if you’ve done it well, you can trace the result back to the decisions that shaped it.

Want to learn the latest on design systems? Check out [our resources](https://www.figma.com/blog/design-systems/) on building and scaling design systems in the age of AI.

Prompting isn’t about magic words or clever phrasing. It’s about architecture, context, and tool fluency. It’s about designing a workflow where the model doesn’t have to guess. It executes. The same way design systems let teams move faster—and with more consistency—structured prompting lets us translate intention into working prototypes.

That’s the new creative loop: Start with clarity, build up with context, and refine with feedback. It’s craft and precision, not charm, that get you a seat at the table.

[![Abstract pastel gradient background with bold white text reading ‘Software is culture.’](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGAgP/xAAeEAACAgICAwAAAAAAAAAAAAABAgADBBETUhIUQf/EABcBAAMBAAAAAAAAAAAAAAAAAAIDBQb/xAAcEQACAQUBAAAAAAAAAAAAAAABAgADERITUQX/2gAMAwEAAhEDEQA/AOFeFRdkKjgVr2HyO8XBpoAJy+VE0VEVsASCZguyl/E6h0Czvg5uBH+mqaciJTe3TCS3K/YwlGycmf2Dk//Z)![Abstract pastel gradient background with bold white text reading ‘Software is culture.’](https://cdn.sanity.io/images/599r6htc/regionalized/57b6af26ff5cd8f3f078ee2b37717f435b54822c-1920x1080.jpg?w=1920&h=1080&q=75&fit=max&auto=format)](https://www.figma.com/blog/software-is-culture/)

Explore [Software Is Culture](https://www.figma.com/blog/software-is-culture/), a collection of stories tracing the impact of design on how we think, feel, and connect.