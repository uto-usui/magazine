---
title: "8 essential tips for using Figma Make"
source: "https://www.figma.com/blog/8-ways-to-build-with-figma-make/"
publishedDate: "2025-06-10"
category: "design"
feedName: "Figma Blog"
---

At Config 2025, [we introduced Figma Make](https://www.figma.com/blog/introducing-figma-make/), our new prompt-to-app capability that allows designers and product teams to go from concept to functional prototype in just a few prompts. Figma's designer advocates, designers, and product managers have spent months diving deep into Figma Make, experimenting with its features and pushing its boundaries. Now, we’re taking this hands-on experience and translating it into eight practical tips and best practices—alongside some sample prompts for inspiration—designed to help you maximize Figma Make's potential.

## [1\. Front-load your first prompt with details](#_1-front-load-your-first-prompt-with-details)

The more detail you include about your design in the initial prompt, the fewer follow-up exchanges you’ll need to get the result you want. “It's better to get the initial generation as close to your vision as possible with only minor tweaks needed—fixing the output with multiple follow-up prompts takes much more time,” says Designer Advocate Ana Boyer.

Here are some key details to include in your initial prompt:

-   **Task**: What Figma Make should do
-   **Context**: Where this flow or screen fits
-   **Key design elements:** Important features Figma Make should incorporate
-   **Expected behaviors:** What happens to those elements upon interaction
-   **Constraints:** Things like device, layout, or visual styling

This front-loading strategy requires not only having a clear vision of your product flow and specs before prompting Figma Make, but also sharing that context with the right prompts. You can also leverage AI assistants to refine your prompts—they'll provide detailed guidance and ready to use code snippets to be pasted directly into your Make for advanced effects.

**Extra tip:** If your initial prompt doesn't give you the output you want, consider phrasing it differently. For example, rather than prompting `vertically align two elements`, try reframing the request as `move this element down 20 pixels` or `add 16px of space between these buttons`.

**Remember: If at first you fail, try again**

If you find yourself making too many adjustments, consider starting fresh with a new Figma Make file. Take what you've learned from your first attempt to craft a more comprehensive starting prompt.

### [In practice](#in-practice)

Figma Designer Advocate Manager Greg Huntoon iterated with different approaches until landing on a prompt that yielded a working v1 for his mouse effect visualization kit. His most successful prompt contained:

-   Project overview
-   Platform specification
-   Purpose and use case
-   Core features list
-   Design style guidance
-   Technical specifications

Greg also included this explicit first step in his prompt: `First step: Build the base grid overlay component with adjustable dimensions and placeholder hover states.`

![Image of a desert with an orange square overlay](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAAClklEQVR4nE2R+0tTARTH95cFlaZoUdkPPc0eWFoWQlAIvdCMUqphtRpmD3tBT5VhGkHlIptuPUaR6Xy0e3fv3e5792qb2/zEVYh++J7DOXC+fPkcn+M46LqOqqpYlsW86+JYJllNxfZ2agYjnUZXFDKSjJxKIYspJMHrEnrGIGs7mKaDoizgy2azZDKZf4amoZNJCeiSiKlIGHIKLSWiigJpQUBOCsxNThILv2NkKMS3WIxkUkTVDGx7Hp9t28iyjKKkMQ2T2cQkY+G3zE58x05L2EoKQxLQxSSa8JtMcpZfsQjPuv1cb2vh2YN7RCMRJDHJgmvi81JJkrQsTdX48TVG6MkD4pEPWIqIrYhYUhIz9RszOYUxE2fmc5hQ7w26L54m9CjIz/FhjLkoOW3iP0NZRtM0pr5/ZehxD+H+RyTG3jMdDTMdHWF6fISpj69JhPuZGX3Fl+HnDPYGCA/0Mv15CGtulLwaX2Ho8VthaJKIR3nqb+P2qcO86Gyh7/JJBq54OsVLb+48zutAK2+C5+m/1s7oUB/CzASOqVD4Y+DzvuxxtLNZXNfh5/hHAicaOLttLf769dw4tIlbTZvpOVLDnSM13PN0dAvBxo0Eju3lw2Afpq6zuLhIsVhYMfRSuq7LwsI8E7FRgi0NtO9YQ1d9FcHGDdw8WE2gvoruxg3cbdpIT0M1XXvKCDTvJDLch2tblEpFlkolfLlcDk/5fJ58Pkfi2xgPW4/i31dJ14H1XD1QTcfuci7UruPK/ir8+6voqFvHpboy7rfsJf42xLxjUyqVKBQK+LxSLBZZWlpajv3ryyd6zjTRurOcttoKOvZU0r6rjPO7yumsq6C9tpzTW1dzbusqgs3bGRt+iZO1lm89dH8BfCiPD/+OwwAAAAAASUVORK5CYII=)![Image of a desert with an orange square overlay](https://cdn.sanity.io/images/599r6htc/regionalized/e38865778c872e9408662d8506c1c9e557fb899b-2934x1536.png?rect=1,0,2933,1536&w=804&h=421&q=75&fit=max&auto=format)

Greg Huntoon's mouse effect visualization in Figma Make

## [2\. Clean up your design files before bringing them into Figma Make](#_2-clean-up-your-design-files-before-bringing)

While Figma Make can create designs from scratch (0→1), it also excels at transforming your existing Figma designs into interactive prototypes (1→1). To help Figma Make generate the best result possible, spend time on file organization and hygiene, making sure to tidy up any frame you plan to copy-paste into the prompt box. The cleaner your design input, the better your output. Using the right frame constraints and Auto Layout settings is the most important parameter in making sure that your design files will translate well into Figma Make, but naming layers based on their content or purpose can help, too.

You can use some of Figma Design’s existing AI features like [Suggest Auto Layout](https://www.youtube.com/watch?v=h13lHNx6rtI) and [Rename layers with AI](https://help.figma.com/hc/en-us/articles/24004711129879-Rename-layers-with-AI), or even plugins like [Clean Document](https://www.figma.com/community/plugin/767379019764649932/clean-document) to quickly tidy up your frames in preparation for bringing them into Figma Make.

**Extra tip:** Even with the best layers setup, Figma Make can sometimes translate design files a bit literally into its own constraints. If your design goes beyond the preview’s edges, follow up with a prompt like: `Scale this to the size of my screen and make it responsive.` Or, if you have specific dimensions in mind, try a prompt like: `Keep this mobile-sized`.

If you have any doubts about how to set up Auto Layout inside your frames, check out [this video](https://www.youtube.com/watch?v=1odqpkfkDL8) on auto layout best practices by Designer Advocate Lauren Byrne.

### [In practice](#in-practice)

Figma Product Manager Holly Li successfully built the music player micro-interaction below in a single prompt, all thanks to setting it up with a robust Auto Layout structure in Figma Design first.

Here's her prompt: `Please make this CD player interactive, CD should spin when I play a track. Thanks!`

![Screenshot of an interactive CD player in Make](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsTAAALEwEAmpwYAAACRklEQVR4nH2T20sbQRjF8/8/1weLQjWaqjFFLa2I0UQSqySpiZeA9PZQ63VvyczO7uwl+ZWZjVIQ+nDY4YP5cb49Z0pRFBHrmDTLyCc5SZqgoohQqf8rDFFKkaUpk+kEoXO++yklA0wSTZ7nL0Azi5QiioyiV1JRATRKDXAyIclypM4oyVARa20dplmO1hohQlx/hOP5OK6P43kzmbOPF4wQQlqH2txNU6ssyyj5QjEKtaWrZIJQmp+/72j3LmicntHqntPqndPqDGh3+rROu3TOBtz8ubUOtdYkSWKVphklT8Y4IsZXGWM9xZcR3fMhK5vblDe3qX3aZ3uvwe5hi939Ju83aqytV7m8HCKlnIEKh2bL0ijOcGVigSKZ4ouIXn9AtbpBdbNGZaPGzuc9Lq6GDAYXVCprzM+/pdvtIYR47VAkE7wwsRrrHPMLzvp9ausV3q+usviuzIetj1xfXzO8GrK8XGbuzRydTscC41gX0GeHQk8t7Gkc4YUadyTpfj2jvLzE4sICSysVals7NJpH1Ot1OzcaDPoFUBcOTSA2FJlMcKXmzhM8BBInkHz78YvmUYv6wSGNoxYHrROax6ccfznhuN2m1+1yc3NjQ0lmMFO7LM8NcGqBt67g3hN25WAscFyPJ8fh0XG5f3S5f3JxXBfP8wiCwAZialMAi8rMHE5xXoDShiLVTKEpcUQUz/RvuWevJY5jCzIpm3MpTM3KMXfumAdPEAiFCBXOWPEQKMZS2csFQCFl8UKeZyYQs675Gud/AfhteQFtZiOwAAAAAElFTkSuQmCC)![Screenshot of an interactive CD player in Make](https://cdn.sanity.io/images/599r6htc/regionalized/69faa643b039f4b59af7a4bc52a217aca44bb506-3456x2084.png?rect=1,0,3455,2084&w=804&h=485&q=75&fit=max&auto=format)

The original design file with Auto Layout

Figma Make bringing the design to life

## [3\. Break down complex projects into manageable steps](#_3-break-down-complex-projects-into-manageable)

Even with a solid first prompt, complex projects may require many additional follow-up prompts. Breaking down these follow-ups into smaller, focused steps yields better results than trying to fix everything all at once. “The smaller the scope, the more detailed the LLM can be," Product Designer Tammy Taabassum says. “How well Figma Make performs depends on how large or complicated your request is, and the specificity of your language."

Your large and detailed first prompt will help establish a foundation to build on, and you’ll want to make small changes little by little from there. Taking this incremental approach after your initial prompt allows you to craft complex interfaces gradually, build multi-page flows frame by frame, and maintain control on the overall design direction.

**Extra tip:** Take this bite-sized approach further by explicitly prompting Figma Make to create separate code folders for each element. In doing so, you'll improve code organization, ensure maintainability over multiple prompts, and isolate potential errors in your most ambitious builds.

### [In practice](#in-practice)

To create a fully functional financial dashboard with an onboarding flow, alpha tester [Antonella Rodriguez](https://www.figma.com/proto/xclE7vTZcC5lDRouJocIIR/Portfolio---Antonella-Rodriguez--UX-UI-?page-id=556%3A14625&node-id=556-14645&viewport=412%2C535%2C0.06&t=H4UJ7lA2mra6OJcE-1&scaling=scale-down&content-scaling=fixed) ended up using over 150 prompts. She started with a broad description of the core features she needed, the desired layout, and a visual reference point, then cleaned up the v1 output and dove into the content of each individual page to populate them one piece at a time.

A few of the follow-up prompts Antonella used:

-   `Add post-its on the journal page to add notes.`
-   `Add a table with category, type of spending, amount in USD, amount in pesos, notes, date on the Finances page.`
-   `Add a checkbox to explain which type of currency you are using, USD or ARS.`

![Screenshot of a dashboard created in Figma Make](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC20lEQVR4nGWTbUtTYRjHzxeoXgRREFRfoAcoKe1FRZEEtd70DczNVabmbO6cnY3swR1XCrXa5pazwCAI1PXgtKQXSvbgS5W2EBrmFJ/dnJ6z4Bf3UetFL/5cN/cNP/7X9b9uaXV1lXw+j67rplLfk7SGWvF4buG/30JHxwu6urro7o6btbOz06zx+Gvi4v7lC149j9He1kZrtA1peXmZpaUlcrmcqaHBQa6VlXGmuJhLlovUOW5y924jmubH3+SnSfPR5GvEr2n4Gu9xx6tyS3GhKgqy4kaamZlhenoaUWdnZ0kkerGct7B39x6OFh2jrMyK19tAIBCkPdbOs1gbz2JPCT15zO2GBhwOB47aWpxOJ876eqSpqSkmJiY29IvuN+84fe4i23ft41BRCVabnYcPHzEwMMD4+DjpdJp0+iefPw8RCASQhTNZxu12oygKknCVyWSYnJwkk5ni9dseTpZa2LZzLweOlGC1VhAKBhkZGWEln6fwu4BRKJBMpYhEIqgeD6rqNltWXDJSNptlYWHB1OLiIj29fZw4e4GtO/Zw4HAJ5dYKgk8EcNQE6obBmq6TTApgFI/Xi+pRUYVDWUESgQiQCEeo930/J0vXgfsPF68DgyFGR0dZWcljGAUM3SCVShGNbgBVFbdbQZFlpPn5eTOMubk502Wir59TpZZ/Dm12wuEwY2Nj5POrFAq/Keg6P5LfiUYi/wNFy8KlqNlcjr4PH80Z/nVosxMKhU2H4n1leYns9C9Gvn4iHHxsznAzEBGOJJZ5bW0NwzAQS74J3CIcilBsdlqaW+hNJBgeHubb0CBfEnHedsRoadI2ZievS6QsIJsSi93T12+GIoAHjxzHarXhlWW0O/do1vw0+zQe3G7A5/HgrXfhqruJq7YOZ60DV70LSXy7TYlQ3iXe/wMWHaf8cjmOq5VU2yqpqaikuuI6Nfbr3LBX4bhStXGupMp2lZrqG/wBzSOwBKWeyQwAAAAASUVORK5CYII=)![Screenshot of a dashboard created in Figma Make](https://cdn.sanity.io/images/599r6htc/regionalized/eef3d04750a6c965c97e54200077ec6b99a93375-3456x2084.png?rect=1,0,3455,2084&w=804&h=485&q=75&fit=max&auto=format)

Financial dashboard by user Antonella Rodriguez in Figma Make

To create a 3D interactive world for this year's [Config London keynote](https://www.youtube.com/live/xwb5Gq5go9o), Product Designer Tammy Taabassum worked with several different elements. After an initial prompt to create a 3D London explorer with famous landmarks, Tammy prompted Figma Make to split each 3D landmark—Big Ben, London Eye, Tower Bridge, and more—into separate coded files. This made it easier and faster to refine individual components without affecting the entire file’s environment.

Tammy’s prompt: `Can you move Big Ben code into a new file?`

![A screenshot of a 3D project in Figma Make](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsTAAALEwEAmpwYAAADJUlEQVR4nFWT7U9bZRiHzx9jZhYTTTTOhbCxQcvqnEwlcQm6JRLYQHGCMCobOiRZYnQ6Q1MEMUus3YJupMBwmQ2UlrUTQlvAtRRK6elKaU97Sl9WSngJucw5bh/88Mv9fLqe684vt7C1tcXm5ibFYpHt7W2KxS3SmadIcg5JzrOeyhNNZBHjGVbWZJYjKZaeJSAmWRST+FclPP4E9ukkwnNgoVBQobl8gbV4mmBEYkmUWAwn+WdFwrsUZ3YxxvTjKFOeILZpP5PuFabmwjgXRFzzERzuCEI2myWTybCxsYH6zuaJxjcIhCV8oQTzwQSepTjTvjVcC0+wu0NYHjgw/2HBYnVhnVnG5g7h8ISwe1YRFFA6nUaWZRWczReIp3KsRGX8IYn55XXcz8wU4MRMAPPgHQw933H77jDWvwPY3KtMKvGICM/tFGgmk1VXTqRyBEUJry+M0x3APrOIYzbIQ2+Y8Ud+TLcH+fH7bky3zFhdPhzeCI65CFMLTxBSqRSSJKmR5TSZbI5YXGbucZBx+wyWMRuWPx3ct7mZeORn3OVj8K5FBfb1GRi1OtWPXAsRnPPh/wwVO8Uyn8+r5cTW40zPehmyjNE3YOLWnVFG7tsZGp7k3gMnQyMj3LjexbXuDoz9A/w+8hdD98YZHrUi5HI5tQxlKrBC4SnRqIh9yoax30jHV5fp6e9VrQw/3eQHo5Gfb/Zy/ZsrdOgbaGqpo6G1kea2Frq+7ERQylDWTSaTquV6IobdOYGh/wbnmz+i+mwVja11dH17jYtXL3OupZYmfT3t+nqammp458xxyk4eorJKw5kPqv+/ci6fY3k1iNHUR83Fsxx7v4zS90qoqNHwZv27VFw4TWltBeV1x3irQUtV7Qkqqksp1R3miK6M8re1CMp1KNnd3WVnZwcxFsEw2Ivus1O8fO5V3jhfguZzHTr9KbQdJ9Fc0aHprKSyU4e2/QQlF47wWs0hXq8u4fDpowgKaG9vj/39fXWKUoSeMQNlV8t5oflFjn59nIaBj9Gbv6DN1E7rr5do+62dS2Y9jb98Qnm3lgOfHuRA/UFe+vAV/gXTd+v9jCX8rgAAAABJRU5ErkJggg==)![A screenshot of a 3D project in Figma Make](https://cdn.sanity.io/images/599r6htc/regionalized/0a3960bcda2017db3d53ad108e34f7a1dc080481-3456x2084.png?rect=1,0,3455,2084&w=804&h=485&q=75&fit=max&auto=format)

3D London explorer in Figma Make

![A screenshot of code in a Figma Make file](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsTAAALEwEAmpwYAAABZklEQVR4nHWT6W7DMAyD/f6vuf3omaO+JdscqCzrsVaA4MQIPpOi41JKCCEgxohSKkopSCnbc9MGlWZra1uLiK1jjL9urcN7xfdXg9uB3nvEmMB377mXUatCqqCWai1Sn4B7jTGgOpDTgJvnGdM04Xq9YlkWhBCtvY8ohNWKaO90kcyBij4B9+KWI+hyueB8PoNwWt86/KoT+FvEvHjceAhHIQ2jD+A/E25XR+gjMKVoSjZgwroG+JBQq6C3vsl5U+50OuFwOFgTus2SwAQRRSmC241jSMi5oIqiU92HclRIEFWu62qgnJlygWozIEOKcUueCrX1TwLhGAStcqU6wvYke+9/wGRAsaD0JeXHcgyDdo/Ho6mkwsd7RlW0HAMTrgYU1c/A6cUyrVIZawwqrBbKZpnXSO0ivyse4ghg06YqP77buQPvCjnDd0CKIMPtIG6wn4HDAIEzDPyLsiXNsF7/FHKYxQ/Da6oe6TKNzgAAAABJRU5ErkJggg==)![A screenshot of code in a Figma Make file](https://cdn.sanity.io/images/599r6htc/regionalized/dec134d586dba6cb9e189028d1b627605dd5b7fe-3456x2084.png?rect=1,0,3455,2084&w=804&h=485&q=75&fit=max&auto=format)

A single component being moved into a separate file in Figma Make

## [4\. Leverage your own components to ensure visual consistency](#_4-leverage-your-own-components-to-ensure-visual)

When working in Figma Make, copy-pasting a component—or a frame with multiple components—can be very powerful. Components from your library, already equipped with Auto Layout and consistent layer naming, will often translate well into your Make.

You can also paste components into Figma Make’s prompt box as a visual reference point for the design it will create. By getting a sense of what some of the interface looks like, Figma Make can match its style and spacing, effectively following your design system rules without needing additional explanation or clarification.

**Extra tip:** Figma Make’s point and edit feature is a great way to swap the generic components in your v1 with specific UI from your libraries. Select an element on the preview, paste your own component inside the prompt box, and enter the following prompt: `Replace this component by this design.`

### [In practice](#in-practice)

The designer advocate team built the productivity app below built using components from the newest [Material 3 Design Kit](https://www.figma.com/community/file/1035203688168086460/material-3-design-kit). To create this app, they pasted two components from the design system file into Figma Make followed by this prompt:

`Build a productivity app that will help users manage and prioritize tasks, stay on top of their calendar, and collect written notes and voice notes. Use the attached navigation component, with its content adapted as required. For the calendar tab, use the attached calendar component. The rest of the pages should visually match the style of those components.`

The team then enhanced the basic v1 by selecting components with point and edit, then prompted Figma Make to replace them with Material 3 design system variants.

![Screenshot of Figma Make](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAAB3klEQVR4nG2TyY7bMBBE9f8fmMMgCTIezciSKHFr7ksFTduB4+RQEECyX1cXqSnnjBgjyDoI4SFlRHIFNVbUVBFcQPABtdShksv49tbRWkfJFWQilpnw9s1jYqD3HmJX+PnjwHwxoDMj2YpIGUoYHJuGMwmBCgJlRFeHvC0glXBcHS7fFX69aUxEBCEEPucFH5cV+9XA7BHuzIi2QAuH/dPiWDzEl4dcA/SeIdeEYwmQa8S5RFzfCduHxaS1HsB92yFPCasIVni4MyGzC50gV4L40jgXCyNuzZwsQ0FXRN3gVUXQBdN5njiOY0CllLCG4KRHUAnFVSTKMMJCrgrmIASTkKmihoYW8LdSx7RtG5ZlwfV6HWCyNCCFi3xDInbiYU+CVx6Z8ljvoaNHoIcnJWBi0DzPA8gOvQv37n0oOwY62MMOcLJ5OG8PYHwSA9d1HQ7ZqVIK0Ue02EdHLmK3Wpgxsj0IcYxchstXaOORHxkyzDmHHDP6C3BkuCnQ6RBt+i+sP4AhhPGw+T3Wyo+3jY1HLjwiA9WmR45Bx3uGL/k9LqWUMkCtNfTe0WpHvwObZ4cFdL8UpzyCiSi+/usuNCSXb38KQxl4c1j/ZMjiYh6bR2UlSmONzzyLz3AsvwEjNqHh2PALMQAAAABJRU5ErkJggg==)![Screenshot of Figma Make](https://cdn.sanity.io/images/599r6htc/regionalized/73554e46f3ed9f1f4af03005ffcd474b0ce2a39a-6912x4168.png?rect=2,0,6909,4168&w=804&h=485&q=75&fit=max&auto=format)

Replacing components with Material 3 Design Kit in Figma Make

## [5\. Make visual tweaks using the point and edit tool](#_5-make-visual-tweaks-using-the-point-and-edit)

With the point and edit tool, you can also make quick, basic adjustments—like a color or font change—by pointing to an element, clicking it, and editing using either the toolbar or additional prompting. This direct manipulation lets you make immediate changes to visual properties like color, corner radius, spacing, and typography seamlessly.

**Extra tip:** When you select the point and edit tool, available editing options depend on the selected element type—text elements let you adjust fonts, colors, and formatting, while containers focus on background colors and spacing. Images have their own set of options, including the ability to upload replacements.

### [In practice](#in-practice)

In the music player example below, point and edit is used to quickly tweak details like font size and formatting.

## [6\. Access the code tab for quick edits—no dev skills required](#_6-access-the-code-tab-for-quick-edits-no-dev)

When building in Figma Make, some small, non-visual changes are best edited inside the code. The `go to source` button is a shortcut that helps you find the code behind an element, so you can have a look behind-the-scenes and adjust its values. Figma Make labels all of its code in an easy to understand way, allowing those without coding experience to identify which part of the code controls which behaviors inside the build. Updated values inside the code will reflect right away inside your preview, without any refresh—and make it easy for you to quickly test multiple product behaviors.

**Extra tip:** If a page-level setup isn’t accessible using `go to source`, try exploring the semantic layers inside a code folder by using the `cmd+F (Mac)` or `Ctrl+F (PC)` shortcut.

### [In practice](#in-practice)

This method is great for quickly iterating on properties like animation. If we wanted to test the way the vinyl spins in Holly's music player file, we could simply jump to the element’s source code, quickly scan the code base for its speed parameter, and adjust speed manually from the code until it hits just the right feel inside the preview.

## [7\. Integrate realistic data into your Make](#_7-integrate-realistic-data-into-your-make)

To bring a dynamic prototype to life, Figma Make allows you to build interfaces with custom or real-time data, from stock prices to weather forecasts. There are a couple different ways you can bring data into your Figma Make files without plugging it into APIs:

**Note:** We advise caution if you plan to incorporate a direct use of a 3P API via prompting, as it could introduce security and financial concerns, such as exposing your API keys and secrets. Simulating this data lets you get a rough idea of how it might work.

-   Ask Figma Make for the type of data you’re expecting to see displayed.
-   Explicitly prompt Figma Make to include a data import entry point inside your interface if you want more granular control over your data set.

**Extra tip:** Keep in mind that Figma Make can plug into any computer hardware that your browser has access to if needed. This opens the door to prototyping interactions involving different types of keyboard inputs, sound inputs, or even camera inputs, as illustrated by Product Designer Daniela Muntyan’s [mini photobooth app](https://notify-dialog-45042180.pung.site/).

### [In practice](#in-practice)

When Product Designer Ryan Reid built a New York City Subway time tracker using the [MTA API](https://www.mta.info/developers), Figma Make automatically collected data from subway lines and stations and smartly generated mock data that emulated real-time train arrivals—without any API connection.

Ryan’s prompt: `Make me a website for tracking subway times in NYC, using the NYC MTA's APIs. The site should let you pick a subway line and subway station to view all train times, ordered chronologically. The site should be a single page, where selecting a line and station reveals more information to the right, to make navigation clean and simple.`

![A mock website created in Figma Make showing MTA subway times](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACi0lEQVR4nFWS204bVxSG5znc2DNj7z3ee2aP52BDPFjFPeRIikSqtDdRK2HTNHeIqqIRr4EQlFC1ifIKvA0HCRCOkECAOCnEfNUM9KIXn9bdt9e/12+dn59zeHjI0dERBwcHrK+vs7CwwG9zc/zx5g3z8/PMzs7y6tWvTE/3Cvr9HjMzM/T7M8Xs9Xq8fNljaqqHdXp6ys7OTsH29jZrb9eYeDpB1m7T6XQYy8bIsow0TQkCgzEhcRyTJAlJkhJFEUEQoJSPlBrr5OSEra0tNjc32djYYGVpiSfdLqN1SSyqSNdBSokQkopdwXEcvLqH8n3qSiGkxKm6lG2b0hel/2+YS9dWlvnh2UMejYaMx5rAEyilUFojpEDnD8UhYSvBiw0yCpDNkGoaUlYC6+rqiuPj44JcurK8wsTkJK0vx2hkI9QDH601SiukqBHVJe1Wg/B+Si01uElAtR1Ry1LcyMcaDodcX1/z6dM1+/v7rC7/xeTjH+m2u3Tuj2ICXQi9eh1RrZJKwXjSIGkmqIbBMxoVhZhWggoNFsBweMPnz0MGgwF/r76l990TXn9jmH7gkcU1tFLFf3m1Gi0p+KoR0opj/OIYCmNMcaDA3Alvbm7IN/34ccCHf5aY+2mM3184vJ6yyVIbKQVSeshCKPk6ajCS3Aq11oRhSNpsFg2w8rj/MRjs8+79Mr/0v+Xn732eP5A0fBvbrmDbDq5tkwpB905oTIDv3wqTu1pZl5eX5OW+uLhgb2+P1bU/ef5igvFOQhpKXKdMuZJTwalUSEWtiDwSxzTCgMBXt8I8chBg5aKzs7OC3d1dFhcXi0K7rkv53j1KpRLl8p2wXKEpakXk0SQp/kzrW2Gz2Szmv9+1zgjRttTOAAAAAElFTkSuQmCC)![A mock website created in Figma Make showing MTA subway times](https://cdn.sanity.io/images/599r6htc/regionalized/9e8a02d49268b1b209f352a1daf80d1678ded5d8-3456x1986.png?w=804&h=462&q=75&fit=max&auto=format)

A mock website created in Figma Make showing MTA subway times

![code in Figma Make](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWElEQVR4nIWS62rDMAyF8/7PWCilv1ZoF9uxLFuSz5BXh5SWTXBiB6TPui05Zzwej6GcCcwVRAXMDaoKFYWqQVyiaE0hYjDr6L2P08xAZPj6MiwxRlyvV1wulwEtpaKUBmZFqwKmipwZuVRwlQH1Bxw0rfcO1Q5mwxJCwPl8xul0wu12Q611BLiDBzMxUsyIMYMLw1TQuzlmB07rHa8Z3u/3AfQXf8sxtNZAG2ELEZwSlAu6ykeg28LMWNd1aNu2AXTQBHofuRTkGMFhhdIGa/WZ5bstM+ioY4YDSJ5hAIdvSI4DOOr7BPTPBLim4w4UHwwhH4HS/gdO62/AWXICxwChDf0voIivguzlOmQCdQxFxn7GkEYfW8kw8Uk/KzqY/y+lFBDRkN8dfuxhrQ0pEdY1YXMg5efqvAL97huxOMinm1LapzydPWN3Yl9qZjRmWGsfM3M/35QfakxfKn/Y2PsAAAAASUVORK5CYII=)![code in Figma Make](https://cdn.sanity.io/images/599r6htc/regionalized/2b6f8a84fbe484eb2b872504f71de8f88d876ce7-3456x1986.png?w=804&h=462&q=75&fit=max&auto=format)

Figma Make adding mock data that emulates real-time MTA train arrival times

Similarly, the Figma advocacy team also generated a fake data set of running sessions using the internal GPT, downloaded it as a .CSV file, and prompted Figma Make to add an upload mechanic inside the marathon trainer. The result is a dashboard design that adapts dynamically to any .CSV database uploaded using the right formatting

A sample of the prompt:

`I want to build an analytics dashboard that shows the progression of my marathon training over time.`

`The dashboard should have a summary of my latest training, including key numbers and a line graph of my progression over time. X axis: training date, Y axis: distance running on each training date.`

`Before any of the analytics appears, the page should be empty with a placeholder that invites me to upload a .csv file. You will then take that CSV file, which will be formatted with the following information, to turn them into the dashboard detailed above: date, distance_km, time_minutes, avg_pace, heart_rate, calories_burned, elevation_gain.`

## [8\. Turn Figma Make into a handoff assistant](#_8-turn-figma-make-into-a-handoff-assistant)

By prompting Make to create interfaces that generate production-ready code snippets, you can create your own handoff tool that generates design choices and creates code output to share with developers. This approach gives you more room to play, experiment, and iterate before moving on to the next phase.

**Extra tip:** If Figma Make's generated code doesn't fit your development needs, you can instead prompt it to give you specific elements and behaviors as generic pseudocode in the chat. A sample prompt might look like: `Keep the code exactly as it is, but describe to me how this piece is implemented in pseudo-code. If possible, detail specific platform considerations for (insert platform name)`.

### [In practice](#in-practice)

Designer Advocate Luis Ouriach used Figma Make as his handoff assistant when building his own OKLCH Palette Builder. His app lets you generate a complete color system starting from a primary brand color, and includes the resulting CSS Variables and Tailwind CSS output ready to hand off.

Luis’s prompt: `Create` a`n OKLCH color palette builder where you add your primary brand color and it generates a fully formed ramp over common colors: green, blue, red, yellow, orange, and greys. You can decide how many colors within each ramp you want - for example, 3 of each in different shades.`

Similarly, Developer Advocate Jake Albaugh built his own mini app to refine the animations applied on a specific piece of UI—in this case, a luxury bank card. Jake asked Figma Make to include visual effect controls and JSON output of animation parameters, creating reusable code for another product he was building.

One of Jake’s prompts: `Make it so there is a json code output describing all the parameters (including min max tilt on each axis) that changes when the input changes.`

## [Be patient with yourself as you explore](#be-patient-with-yourself-as-you-explore)

As with any AI tool, prompting is a matter of trial and error until you find an approach that works for you. With the beta version of [Figma Make](https://www.figma.com/make/) now available to all Figma users with a Full seat, we’re excited to see the creative ways you’ll use this tool to bring new ideas to life.

We're only just starting to scratch the surface of what's possible in this tool—and we’re excited to do it with you.