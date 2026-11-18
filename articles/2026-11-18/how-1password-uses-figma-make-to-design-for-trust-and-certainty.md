---
title: "How 1Password uses Figma Make to design for trust and certainty"
source: "https://www.figma.com/blog/1password-figma-make/"
publishedDate: "2026-11-16"
category: "design"
feedName: "Figma Blog"
---

1Password, an identity security company, built to make secure access simple, meets customers wherever they sign in. Anytime a user autofills a login on their phone, uses 1Password on their desktop, or approves a credential request from an AI agent through the browser extension, the experience has to feel unmistakably like 1Password. So what does good UX mean for a security product? “I'd say it's trust and certainty,” says Matt Davey, Chief Experience Officer at 1Password. Every prompt needs to be clear enough that people know exactly what will happen when they act on it.

Designing for that level of trust means testing ideas that look and behave like the real product. That's why 1Password's product design team brought [Figma Make](https://www.figma.com/blog/figma-make-general-availability/)

into its prototype codebase.

## [Building on two decades of customer trust](#building-on-two-decades-of-customer-trust)

Matt leads a design org of roughly 40 people, organized around the personas 1Password serves, including: security and IT admins, consumers, and developers. Designing for that many audiences makes consistency essential, and that’s the job of 1Password’s centralized design systems team. Until about eight months ago, that meant providing documentation and guidelines that designers would read and talk through together. Now, as AI tools increasingly help build UI, the team is focused on making that guidance usable by the tools themselves, so Figma Make and other agents follow the same rules a designer would.

"Trust is at the foundation of everything we do," says Ryan Williamson-Cardneau, Senior Manager of Design Systems & Design Language. "As UI gets generated on the fly, the guardrails we put in place and the best practices we've codified through years become critically important."

> Trust is at the foundation of everything we do.

Ryan Williamson-Cardneau, Senior Manager of Design Systems & Design Language, 1Password

The team turned nearly two decades of design guidance into context that tools can use: content design, design principles, components, and the reasoning behind every typography choice and setup flow. Figma Make enables both designers and agents to get the right context in the moment. "It's for a human in the loop who might be asking a question but also for an agent who has been given a task and now has to figure out: How do I complete this task? What are my guardrails?" Ryan says.

## [Bringing Figma Make into the prototype codebase](#bringing-figma-make-into-the-prototype-codebase)

Prototyping directly in production environments isn’t realistic for most designers. Those environments require too much setup and maintenance. “They’re just too cumbersome for a designer to pick up,” says Ryan. So his team built an internal prototype playground: a front-end-only repo with code templates for 1Password’s products, built directly from their Figma files and product references.

![Figma code prototype: an AI chat edits a 1Password notification component, with a live preview and properties panel.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAPoAAAD6AG1e1JrAAACtUlEQVQ4jY2USU7jQBiF60KJhyrPjpPYjpMOgUSQBRfgChwBqUlDJHqFRGDBjuk0rJEYVrBIWi2GJHZe66/gwAIaLD2Vq2R/fu+vv8ySOEZSixFFISqVAEHgwy+5Up7vwPXsV1lwXAuOY8m545gwDQMmFzANAdcNUCq3wSqVCirVCvySD89zEYYhms0mlpaW8KP5A/VGHUlSQ1KvIUkS1Os0TxAEJRiGAV3ToOsahLBhWRFYrTZ/MIoitFotbG5uYn9/H0dHRzg8PMRgMMDBwQEGA9JAru3t7WFjYwOe50mYpmlQVRo5WKPRACmOY6yvr+P4+BhXV1e4v7//UA8PD7i8vMTW1hbK5TIURVlI1zlYHEeoVkN4no+1tS5OT08xHA6RZdmnur29xe7urgQWCgUJI4cUm5GzKIrhuj5WV9dwdnaG0WiE2Wz2qQjY7/dB9dc0TdZSCAEhTDCqXRhGr8Auzs/PF8CPrhxIDqvVKkzThOu6cuRcgPm+DxJ9pd3uyMhfAe/u7hZAwzBg27Z0yDkHoxtapEm73V4A0+kM6RTIUoK81xswj8w5lyOJqaoKEk3anY6s4XA4wvg5w9OfFC9PKaaTFNNphnSaIUvfNoUcaq9AXdfnQJ1zCSwWi2i1lnFycjIHvmR4/DvF8+ME45cJxuMUk0mK9B2Q6s85XyQkKDNMAzrXUSgU5ekgoIycUuRMAsiVHLOZVA4Mo1BC8sjU5IwWSMWiIh3mNaQXP9qXfJd3dnZkZJVKtjgpBNSInjts/XeXaY0a+/r6Gr1eTza2qmhQFCrZ/LQwU9gQ3JRA+inkkb8Cbv/cRlAqQ1N16Y5ODIkJbkBwIa2vrKx8y+HNzQ16vV8ol0MYhgPb8sG5KeGMOtyyLNnp3W4XFxcX32rsfv83arVllEoJ6kkHYbUJxw7wD0tNfmJ1U3QoAAAAAElFTkSuQmCC)![Figma code prototype: an AI chat edits a 1Password notification component, with a live preview and properties panel.](https://cdn.sanity.io/images/599r6htc/regionalized/c22726fea680f9b22bb8216374407454c4d794f3-1704x1413.png?rect=1,0,1703,1413&w=1080&h=896&q=75&fit=max&auto=format)

Figma Make updates a coded component to match the latest Figma design, replacing hardcoded values with design system variables.

That simpler setup made it a natural fit for Figma Make. Designers can open the playground in Figma Make and start working right away, using the skills and rules already built into the repo. Some still prefer to jump straight into an IDE, but others have found comfort in the familiarity of Figma. "You can click into it, type the new text, and the change is there and queued," says Ryan. "People are finding their own new unique ways to work with the tools at hand."

Because 1Password has Code Connect set up, the components in the playground map to their counterparts in the team's published Figma library. If designers want to change a primary button to a secondary one, they pick it from a dropdown instead of digging into the HTML or prompting an agent.

![Figma Make showing a coded 1Password sign-in banner selected on a mock login page, with a chat panel on the left and the component’s properties on the right.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAIAAABSJhvpAAAACXBIWXMAAAPoAAAD6AG1e1JrAAADKElEQVQ4jWWTa0/iWACG+18MKm3PaUvlMhRWqlykUHc22R9i/DGLjhSLjjhO9pdM1pmJ4s4Iy7XQO20pd5ZNNgU/jJknb863J2/enHOQaPRNOBwJBvcoiiJJgiCJDRACAPCfAiAEBEHQdCQYyiAkSVIURRAESVIME0umkul0+vDw8OCATbyGZQ9YlmWYaCAQIAiaJGMIhmE4DnAcxGLxk5OTwtlZqVQSBKH4E4IgFAqF09PTRCIBAMRxiASDweBekCSpbDZbLBYbjYamabquG6/RDUPXjVarVRZFjuPWlTjCMLF4/JdI+M3x8a+VSsU0zcWa5XK5+DEL7xxY1t3dXS6X8/sxAEiEYeL7+wmGib19+9v19ZWsyKPx2Bm6tu3ajjt0R0PXXWfkDF253795/z6fzwMAPTkaZWKxeDgS4fO8WBK6nbZl2ao6kHsDXbUHlrOJbtqqojX/fipfnB/zPBWgIIRIOBQKh0IkRWYyGbEk9CRJN6xuz1AUyzQdy3Isy1U1qyWp9Xr78f6zUCjwPE9RFAAAoWl6j6YhhOl0ShRFWVYUfdDsqrpp27bjxXEl2ag+tz8/1j/dPxbOi1mOw3EcRVGEoiiapiFBpDNpsSzKsiprVrOraoZl2/bQGzuWFPPhe/u+2vj09dsf74TM0RG6BgHQA8XQZDJ5eXkpK6qiv8iO40wmk/Fk2lMH1Vr34Xvnr4fns3elbNa7KgzDkN3d3Z2dHZ/Px7Lsj7Ju2u5oPJ3Nx5NZTzGf6t1qrXP/8Hx2UeK4HI7jnry9ve3z+ba2tliW9Tav5UZH0TRzaNuT4XDkDKW+/lTrPj578nlRzOXzL5sxFPP70U1zuVxWFM1rbveVdttu1Uedf9xeW+r0vtWlp7r0pVq7EMQ8z7/IJBEgIIX60VQqdXV1rWm65biaZthyfyQ1J1JzJHcNVevJhiQbtUbnsnyV5TgURb3nCQEBIYFj4Ogod3PzwTStxWI5n80Xs+lyOvl3Ol7OpvPZfDabT2dzXTcqldtsNofjMBAIIpsvCgDkuOPb24+WZa9Wq/82ec1qtbJt5+Pdnzz/e4CKRiP7/wMpJk6YpHSUNwAAAABJRU5ErkJggg==)![Figma Make showing a coded 1Password sign-in banner selected on a mock login page, with a chat panel on the left and the component’s properties on the right.](https://cdn.sanity.io/images/599r6htc/regionalized/a17b404ae2b6620f5900cc3aec4ff42c6e1a150c-1706x1410.png?rect=1,0,1705,1410&w=1080&h=893&q=75&fit=max&auto=format)

1Password’s prototype playground open in Figma Make, where designers can select a coded component and adjust it through chat or its properties panel.

Ryan recently used Figma Make to update the template for a generally available product. He fed updated screens from Figma directly into the existing coded template, then fine-tuned individual elements, like tracking down a stubborn padding value and swapping it for the right design system variable. Instead of making 30 quick edits by hand, Ryan found that Figma Make got about 80% of them right, leaving him to tweak the last few. “I know it’s using the foundations from our design system,” he says.

###### 30 edits → 80% right

“Figma Make cut my editing time down from ‘there are 30 things I need to make quick edits on’ to ‘it got 80% of those right.’” — Ryan Williamson-Cardneau, 1Password

Designers can also build several design directions into one prototype as toggles, allowing them to switch between concepts in one place. For Matt, the visual side of the workflow stands out. He calls it visual branching: duplicating a prototype, making small changes, and comparing versions side by side on the canvas. “That’s been a powerful thing to see,” he says. “Doing that in any other medium is really painful.”

With the chat connected to 1Password’s MCP, Figma Make also becomes a design partner. “I find myself having a back and forth about things like, ‘Do you think that this works with this?’” says Matt. “It’s a sparring partner.”

> Figma Make is a sparring partner. I can ask, ‘Do you think this works with this?’ and have a real back and forth.

Matt Davey, Chief Experience Officer, 1Password

The team has also started exploring [code layers](https://www.figma.com/blog/code-on-the-figma-canvas/)

, which bring coded prototypes directly onto the canvas. That helps designers go a step further, producing entire user flows and not just working prototypes. “Designers want to see and talk through a bird’s-eye view of the UX instead of recording a voiceover,” says Ryan. “The ability for the Figma agent to track me clicking through a code layer and generating an artboard has been useful.”

## [Getting everyone on the same page, earlier](#getting-everyone-on-the-same-page-earlier)

###### 100% of designers onboarded

Every designer at 1Password has been onboarded to the prototype playground, and engineers and PMs are building prototypes there, too.

For Ryan, the biggest payoff isn’t speed. It’s communication. “The problem we were setting out to solve was: How do we get alignment and communication on ideas early?” he says. “Could we get to a good idea that everyone agreed on more quickly, and did it have the right fidelity to understand the value we were putting in customers’ hands?”

For Matt, that’s where the canvas matters most. “The real superpower of Figma has always been the canvas,” he says. “It’s like when we used to print out all the pages of a website and stick them on a whiteboard. Being able to look at these UI elements together is incredibly valuable.”

> The real superpower of Figma has always been the canvas. Being able to look at these UI elements together is incredibly valuable.

Matt Davey, Chief Experience Officer, 1Password

Working in code has made that much easier. "It has made communicating early concepts much cheaper to do," says Ryan. “We’re able to show micro-interactions in a way we couldn't previously." That fidelity carries into user testing, too. 1Password has largely replaced its wired-up Figma prototypes with coded ones, so participants no longer hit the edges of a prototype and get redirected back to the "happy path." For a security product, that realism changes the results. "User testing someone with an empty test vault containing no real credentials is a completely different scenario from giving that user a realistic, populated experience," says Matt.

![Figma Make showing a coded 1Password sign-in banner selected on a mock login page, with a chat panel on the left and the component’s properties on the right.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAIAAABSJhvpAAAACXBIWXMAAAPoAAAD6AG1e1JrAAACBklEQVQ4jY3T3W6iQBgG4LkdIxao/A5oarVoV6FN9jq212NMVlkV9Yr2YBPTWKtVgQHBlp/BZAOrPWht1iffnJC882byBSCKAs/zDMNQJEWSF8cpFAp5gjg9hQJB0yzD1ADDsBzH0zRNXpAQwtpNTVFuarXa9XWlUrk6OdVqVVG+3Ta+A4qiafqSIAhBEB4efrTb7V6v1838/EK329P1X7reByzLFotFgiCq1Wqn05lOp5uM+X8bIMslSZJZllNVbTwe27aNMU7OAyRJFkWJYThNO4TPTCb7BIgi5DiRoorNZms0Gr2H919Lkn0QJX6AAYSyJJU5VlRVbWiMTMvGOMHH8MnKGCfOLp7bURoulysQljTtXu8bz6vNLojegjAIj4IgisIoisIwjOMYp5LXEKPdobnEcUKzqXb1/uN8aW93jus5rrvdbj3Pc13X8/3XTJBeFMWZKMbpmwUB0vRlo3Hb6+mz2dxCyLJsyzKt7DwtzacX27Tdf7ZHvu8DCKW0meWbzZau67PZLN3gwXq5Wv+ZrX4/ruYvmw8QQkCEUql8BaF8d3c/GAwWi4Xrus4RQs7GQmsT2cj5wPM8wPM8hBLHca1WyzAM0zSjT+LPn7KXg/Rfoqh8Pq8oynA4PGfP71sERCaXy9XrdcMwEELnJPdJgtPmtJgiSVJV1clkcmYYY/y22/0FNwHXCNIEUugAAAAASUVORK5CYII=)![Figma Make showing a coded 1Password sign-in banner selected on a mock login page, with a chat panel on the left and the component’s properties on the right.](https://cdn.sanity.io/images/599r6htc/regionalized/6bc60c1ba6a2a71860df54565fcfe7c479de80c9-1706x1408.png?rect=0,1,1706,1407&w=1080&h=891&q=75&fit=max&auto=format)

1Password’s prototype playground open in Figma Make, where designers can select a coded component and adjust it through chat or its properties panel.

And it's not just designers. Every licensed designer at 1Password has been onboarded to the playground, but engineers who first picked it up at hackathons now bring their own prototypes to the table, and PMs recently used one to pitch a roadmap item. "That feels like a pretty strong win," says Ryan, "and very much outside the norm of who you expect to use a design tool right out of the gate."

![prototypes published by different team members and a chat listing product templates](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAIAAABSJhvpAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAB0klEQVQ4jXWT2bKbMAxA+QzAm+QFgzEYMEsyfe3/f1PHdkiTzu0ZXvD4IAlJ1fP5vK5r3/clEcozz9M0+f89YZ7W9dyP39W+79u2zfPsMkny3rnBWmuMUT9hjOmHyY1nFeO+LKv33lrbdV3f913XGdNprQGAfUBvGOcCFKKuzvOV8zAMUkqeAUBEKYQor5zzt0kpJYQSShlj1XmeMcZlWZxziEgIoZQCopT/yoyxcpJ9kuTjONd1m+cwjqOUMsmMIUqllBBAGSOZtm2zwL/kGI91jSGEErnkJQRgigyUsqZp6pumafJHyEsOYY1xX9fNOQcANJVDuEg644IQWtd/5Tr57Z0Fq6YpxLjHGMdxBIBcMhUAgIoJIJTmyy+arH5FPo7zuq4QQqmZJBmlNig1z5mXmn+QH4/Hr8y2bUqpfE65gCQrLUCW5ItZ1/WX/MyUyLecapZKp8xv8yU3ifYj7TDPs/d+GIbSZ0KIgBRZKs25KNqb9jPykClTmf926qEQoIxVuhOQmvdu9Ufgn+Q7MmrTa2MBkXP+Hu+2JV/ymMkbNWqtywKglJ11tndS6c8hTVNdmpnXo8prXFhL2QCgTed88CHawYNUb5kxEAIB0h1E/AOVVIlKl0fRrAAAAABJRU5ErkJggg==)![prototypes published by different team members and a chat listing product templates](https://cdn.sanity.io/images/599r6htc/regionalized/ec408a42a9435922312ea6e79eb44ac6826c9a07-1706x1408.png?rect=0,1,1706,1407&w=1080&h=891&q=75&fit=max&auto=format)

The prototype playground holds prototypes from across the team, each started from a coded 1Password product template.

For the 1Password team, this way of working brings designers closer to what ships. Figma Make also makes that shift feel less daunting. "Seeing the familiarity of Figma in this new territory helps designers trust that they can wade into this with the rest of us," says Ryan Williamson-Cardneau, Senior Manager of Design Systems & Design Language. At 1Password, trust isn't just what the team designs for. It's how they bring everyone along.