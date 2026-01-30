---
title: "15+ ways we’re improving accessibility in Figma"
source: "https://www.figma.com/blog/introducing-screenreader-and-accessibility-features/"
publishedDate: "2025-10-14"
category: "design"
feedName: "Figma Blog"
---

October 14, 2025

![Abstract geometric collage featuring bright shapes, letters, and an eye symbol in pink, green, black, and cream tones.](data:image/png;base64,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)![Abstract geometric collage featuring bright shapes, letters, and an eye symbol in pink, green, black, and cream tones.](https://cdn.sanity.io/images/599r6htc/regionalized/bcdd72b8c682f3ebcee8c9c9baff4f90e4411509-1536x2048.png?w=1632&h=2176&q=75&fit=max&auto=format)

To make Figma easier to navigate for all, we’re launching over a dozen keyboard-only controls and improving the screen reader experience.

Today we’re rolling out improvements that make it easier and more reliable to navigate files with a keyboard or screen reader. From new keyboard shortcuts—like selecting widgets in FigJam or adjusting ruler guides in Figma Design—to clearer announcements and richer text support for screen readers, these updates create a smoother experience that supports focus and flow for everyone.

## [Better keyboard controls for the canvas and commenting](#better-keyboard-controls-for-the-canvas-and)

Visit the [help center](https://help.figma.com/hc/en-us/articles/35063862380311) for the complete list of new keyboard controls.

Whether you’re adjusting a line in Figma Design or adding connectors to a FigJam diagram, we’ve expanded ways to move around the canvas [with the keyboard](https://www.figma.com/blog/introducing-keyboard-accessibility-features/). Canvas objects are now also accessible to screen readers, improving navigation for all users. We’re also making collaboration and handoff smoother for keyboard-only users with the ability to add, move, and navigate comments and Dev Mode annotations using shortcuts. Here’s what else is new.

### [Canvas keyboard controls](#canvas-keyboard-controls)

Expanded controls across products help you move, adjust, and align objects with greater accuracy. These new controls include:

**Figma Slides**

-   Resize presenters notes and adjust writing tone with AI.

**FigJam**

-   Add, remove, and reorder rows and columns.
-   Add and adjust stamps, votes, and washi tape.
-   Navigate through canvas objects like AI summaries and embedded links and videos.
-   Select and adjust marker lines and highlighter strokes.
-   Add, remove, and reorder rows and columns in tables

**Figma Design**

-   Add, select, and adjust lines.
-   Add, remove, and edit ruler guides.
-   Create and edit arcs from ellipses.

**Cross-product**

-   Open and move between links in edit or view-only mode.

### [Feedback keyboard controls](#feedback-keyboard-controls)

New shortcuts help you respond to feedback and move between discussions without breaking focus. Use these shortcuts to:

-   Add, move, and navigate comments across all products (not available in beta products).
-   Add, move, and navigate Dev Mode annotations.

### [Toggles](#toggles)

Now, there are new ways to personalize your experience across Figma products like:

-   Turning off overriding Figma exclusive shortcuts when typing
-   Choosing whether to auto-follow others with spotlight

## [Improved screen reader support](#improved-screen-reader-support)

We’re improving how Figma works with assistive technology, so [screen reader users](https://help.figma.com/hc/en-us/articles/35063862380311-Accessibility-at-Figma#h_01K7FGP0TS14T0SBFKB8X2FVPZ) can navigate files smoothly, hear objects in order, and stay up to date as things change. From more consistent and reliable announcements, to richer object descriptions, to formatted text support that lets screen readers recognize bolded or italicized words, these improvements make content easier to follow and understand.

Updates include:

-   **Actions navigation:** Now, moving through interactive elements like buttons, menus, and panels with the Tab key follows a more logical order. Users can jump straight to specific actions—like opening a menu, triggering a button, or selecting a toolbar option.
-   **Object descriptions:** Screen readers now provide more detailed announcements for objects—like its type, name, and state—so users can better understand what’s on the canvas.
-   **Announcements updates:** Announcements are now more consistent, so users don’t miss important changes like new comments or file updates.
-   **Formatted text support:** Screen readers now preserve rich text formatting like bold, italics, lists, and links, so users don’t lose important structure and meaning.
-   **Receive info about canvas objects in Buzz and Slides:** Screen readers can now recognize and announce canvas objects in Buzz and Slides.

## [Enhanced screen contrast](#enhanced-screen-contrast)

[With a simple toggle](https://help.figma.com/hc/en-us/articles/5576781786647-Change-themes-in-Figma#h_01K57AMY9Y08P2656MNM2HDS1H), users can now increase distinction between text, elements, and their backgrounds in both light and dark modes. Enhanced color contrast makes Figma easier to navigate for everyone by:

[Three ways](https://help.figma.com/hc/en-us/articles/5576781786647-Change-themes-in-Figma#h_01K57AMY9Y08P2656MNM2HDS1H) to turn on enhanced contrast: From Accessibility settings in the Main menu, from the Actions menu, or from General settings

-   Improving legibility of text and icons
-   Making it easier to see how the interface is organized and quickly spot the elements you need
-   Helping buttons and outlines stand out more clearly when you hover or interact with them
-   Improving visibility in glare and sunlight
-   Making it quicker to scan and reorient when multi-tasking

The subtle differences between regular contrast and enhanced color contrast can make a big difference, especially during prolonged screen exposure.

![Figma design file showing a 3×3 photo grid of gardens and architecture with lower contrast and layout settings visible.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC/0lEQVR4nE2U3W8VRRiHz3/CBYbEBAlJVbwgyJcFI1rTKmkLEShVEGskNWIrVaIxqKjhwwsTbzCxoA1SIQUDJrbYGAINIUKbApHYkOhpDz275+zZ3dmdj93HzJ5tORe/vLMzmWfe3/vOTgEgSRLSNM1kx1bGyiQN36YuY2M+ZwzaJIQqQegUk0LBQpRSSCmzaCUiwbw7R7H0gOLsDPdnppi6c5Obt29wa/oWxVKRMAyJ45hQKoq+ZtY3RCalYE+yC0IIoijKwFXP4cbkKOcuf8vg0OccOfYOfR+9Tu/Am3x69EPGr41RqbpEQiBiiSN0JrkAtKAFmNYat1Lit/Ef+PirdnbvW82Wl5ezactKXt29nt5PdnF5fAS34tb3KIXSGqUNSZpQsHWwC9bCAnDemePsr9+x571mWjqfomXrWrZ1vcieA230f/EGl/5oAMr6Hsux5VvMMAiCLGqtKJXnOD1yku7+djp6Wtn+9mt09+5iZ08re3s7Gb5whrJTrjuLY6RUGXQRGEuJEPlpRjPvljl/5QL9xw+y80AXG15pZvXmVaxpXsnWbZs5c3YwB8bZXqU0yljLFpimRFISiHrHYm14aIFjv/D+1/vpeOslntm4gseblrDi6SW0ta9j+NwgjlvPMF7M0JAmeYZhrHBqEU4g8WNDyZnn0th5jpw4yL53O1jf8iTL1zzGE88upW3HBoZHTuFWyhksyqENllOE1Lh+DowMTqXCxMRVfjx9kkOHB1jb8TxLn2ti2aYmXuhuZejizzgVNytRnGUoG5piUkJhqNYUgdDEyuDVfKbv3OP30St8/9MQPYc/o/ODProO9THwzZeMXr9KpVpdbEqUd9u6LWiV4jqaUkkjRJLVwvNDZopl/n7wH3fv/8O1yWn+/GuSialJbt+7y7+zs3i1WnYz7HXzPA/f9zPbBa1TPM/gupo4NhitCUTEw2qI44X4QZArJMgVhiIDWdk/zMLs2NoupClonaDUo8fALljrUuvs1OziNo7tA9GghXlbw/8BDrnTXbSxySwAAAAASUVORK5CYII=)![Figma design file showing a 3×3 photo grid of gardens and architecture with lower contrast and layout settings visible.](https://cdn.sanity.io/images/599r6htc/regionalized/0fb46cafe9f93b10f9cabfe18ee6fca6a5895778-4965x3475.png?rect=2,0,4963,3475&w=804&h=563&q=75&fit=max&auto=format)

Low-contrast grays on white make text and icons harder to see, forcing the eye to work harder.

![Updated Figma interface showing the same 3×3 garden photo grid with higher contrast and the same layout options.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAACXBIWXMAABYlAAAWJQFJUiTwAAADF0lEQVR4nF2U328VRRzF73/Cg8TEhxJNCfFBUyAIEimRH6VUGtJa5IeSENtYASVE4QHBBBIfjA/4QKmJ1rTVorEBIRC1akgjl5JGfkhs4N7tvbt7996d2V+zux8z01tofDj7nZ1JzpzvmTNTAMiyjDzPDfRYI02baP5nWUqqkabN+YWxSjOCKEWGej2noEmSJCGOY1M1giCg4liUrH95XH7I/Ycz3JmdZrp4k+KdW5SsEkIKwjBEBDElOzQI44yC3kUvSClNjaKImmdzs3iV8Z8+Z+jrU5w+d4gjx99i4MP9nDx7jBu/X8N1HaQQCBliewF2PSRWSwi1qkWVjmsxef0CH53ZSd/bL/Ha6y1saH+Bjr419J/oZfLGBI7jEEhpBMRxQpwoY01BfxYV6kWVKCp2mZFLX7Cn/xXau1ayuWM13X2b2Te4jcOf7GXy+gSO+5RQKWX81PY9IfR931St0KqWGRo/T89gJx0HtrDr4G72DvTSe3AL+/u7GLs0gm3bpqug2ZlSSwj1LlIGRFFMohIqTpXRn79n8OxRugd6WLttPS9vfJG2Dc/T2f0qI6PDVKtVQxZq3+OERKVkuWk5R4YxdRHihwlBrLDsCqNXRnnvzCF2HNjEqrUreK51GStWLWN71xrGvruIbVeNiCBYFKLINaFKc2oy5pEreVyLqApFqVLhxyvjnDp3hH3vdrK6fSUtbctpaXuG7T3rGJsYxnHt5mHKJ1aZllWWUwsS5tyAOTdi3k+wbJepqV8ZHvqSD04cpW3HRpava+XZ9a1s2rOVb3741hyKtioMw6aHWmGuY5PTkIqqF1MTChEpXK/O7ZlZLl++yvmLX/HOxyd54/Agbx5/n2Offcq1P37DrbkmGcGij1G0EJskyXAcxbylkEFmvPAagn/mLO4+mGP23gOm/prhl+lb/Hm7SPHvWR6Vy3h1j0ajYdLheZ6pWmVBqZx6XeE6ijBMzaQvA+btBnatQcMXBr4vEPpmCGGUmSqkGWtiXXUWC3kOSmVopfrSa9kqTYliZdKvN/g/Fh6IlFQ1H4glwf4PLlnQgne5+dMAAAAASUVORK5CYII=)![Updated Figma interface showing the same 3×3 garden photo grid with higher contrast and the same layout options.](https://cdn.sanity.io/images/599r6htc/regionalized/deb070ae23d36fd69e663734534fefdc95755044-4965x3480.png?rect=3,0,4961,3480&w=804&h=564&q=75&fit=max&auto=format)

Darker grays, stronger highlights, and clear outlines make the UI easier to scan and read at a glance.

## [Figma Sites accessibility improvements](#figma-sites-accessibility-improvements)

[**Tips for making your site more accessible**](https://help.figma.com/hc/en-us/articles/31242789265431-Improve-the-accessibility-of-your-site):

Add alt text to images that need description, or mark it as decorative.

Set the correct HTML tag.

Add labels when visible text is missing or unclear.

Mark purely decorative elements as hidden.

Use the color contrast tool in the color picker to improve readability.

Through actions like applying the correct HTML tags and accessibility properties to each element in your design, you can create a website through Figma Sites that’s easier to use for those who rely on screen readers or keyboard navigation.

Our Figma Sites accessibility improvements include:

-   Apply new ARIA (Accessible Rich Internet Applications) properties that add context beyond HTML and view corresponding HTML tags in the Layer panel.
-   Edit accessibility options such as alt text, labels, and roles directly from the properties panel, making it easier to ensure your site is accessible.

Together, these updates make it easier to design and publish sites that are more accessible and inclusive by default.

To learn about our latest accessibility updates, visit our [new accessibility help center](https://help.figma.com/hc/en-us/articles/35063862380311).

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGgABAAIDAQAAAAAAAAAAAAAAAAMEBQYHCP/EACUQAAEEAgEEAQUAAAAAAAAAAAEAAgMEBRESBhMhMUEiIzJhcf/EABYBAQEBAAAAAAAAAAAAAAAAAAUDBP/EAB0RAAIBBAMAAAAAAAAAAAAAAAABAgMEITERInH/2gAMAwEAAhEDEQA/ANMsZKevTp4yk+VrZXCKTX5Ob8hVersJRhfVt06XCGMtErXenbWS6gwWXgsY25Upy67njbfQ/ak6qx+Ty0dSnRa1pkeOY5ez/Ua5JVFkao04zt58RIYcTQ7beNWIDXj6UV2xSu4x7atuCRsrGjegTtFbIaelMpDGOH22nY+QuRvpwx9dNhYCIxOCG78BERbGrJvt4dCkijErwY2O0dbcNlERb46C3s//2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/afae178f9eff8f739c4b76f1d2fa1dbb66cf85aa-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Emma Webster is a writer and editor on Figma’s Story Studio team. Previously, she’s worked as a writer at Faire and Audley Travel.

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)