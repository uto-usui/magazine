---
title: "Turning prompts into five scalable workflows with Figma Weave"
source: "https://www.figma.com/blog/five-figma-weave-workflows/"
publishedDate: "2026-04-09"
category: "design"
feedName: "Figma Blog"
---

###### Note from Itay Schiff

We started Weavy, now known as [Figma Weave](https://weave.figma.com/), because we saw a need for a new paradigm in media production—one where you can combine AI models, shape every step, and scale your process, with the speed of AI and the standards of a professional workflow. We're excited to bring that to Figma users, and are working toward a deeper integration between our products later this year.

Generating great visuals used to take a lot of time and specialized skill. Now it takes seconds. But generating the right visuals—ones that fit your brand, hold up across channels, and scale with your needs—takes more than a single prompt. It takes the ability to branch, explore, and build, connecting AI nodes together until every visual is exactly right. That's what led Figma to [acquire Weavy](https://www.figma.com/blog/welcome-weavy-to-figma/)

, now Figma Weave: an intelligent creative workflow canvas for creating and editing imagery, video, audio, and 3D—chaining prompts together so you can move from reference to finished asset without losing control of the output along the way.

It's a new way of working, one where every step can be reshaped, reapplied, and built upon. To help you get started, we've launched workflow templates as a new resource on Figma Community. Explore these [20+ templates](https://www.figma.com/community/weave) built by the Figma Weave team to turn images into videos, generate 3D models, combine reference styles, compare image models, and more. Below, we walk through five additional workflows in detail, building on one another using sample brand assets from Epoch—a fictional contemporary sound and video shop—curated to show the full range of what Figma Weave can do.

![Mobile and desktop mockups of the Epoch app browse page, featuring a minimalist grey UI with sound category filters, abstract visual assets, and a trending sounds list.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAADkklEQVR4nGWQSW9bZRSG/T9YsgE2iD8A3SAEQgghQLAosImQKKJSCWOpVBpUaEhD0zZOyOQMjuM4g+049RT7Tr7z9b2O7QyuM7CiTZo5yv5BvokQEotX7znfd77nnO8Ezs7OODk54fj4iKOjI46Pj/389PTUj48OW+eHHB6eqxW36v6r44u3R4eHBFpFW5tNPM/GtjRftarH9vYGG80GjfUVP9c1BU2VME0Vy9KwWm5qOLaB4xiYhoqmyQR2dp76hdHoKKFQPyPDQebnpnAdg4pn4ToqipgjFhkjPDrA9GSIZGSE9Fgfi6EHLEwEScaGiU4PMz45QODJk78p5NOMDD5gINhFf28X0alRHFtj2TNx7RJKIc3kcD+DPZ2MBbtJ9dxGaG9jse194u2fMHfvG4b6rnOv+2sCu7tPUYUc8eBd5n+7zsz9Dhbnx1j2DNZWXFZrNpZSIDrcy9Cdnxj/o4P0re8Q3r5E/OXnmX79FaavvUfw5gfc/uISgb1nOzhClvyt70ldfofZax+zOPYr1bJEs1Fls1mj7uqkwoOEO38k3ncHpesm4luvMvXCc0y89iKRL9/k4bdv8Pvllwjs7+2yailoDzvJXf2M5I028pG7rHgKG49rbG/Waa66lDJxsuE/0VJR6jMh7B+usPjpu8xf/YhE5xUi3Z8T+eVDAgcHezTqHnY+iTofRl6YxFYzNBvLbDTrbLWA6xU8S8ZRCyzbCjWtQCU9g52YRE9FULNRlNwU6tIkgf1nO1TLOiUxQ0lZQlUF3IrNxmaDrc1V/tpeZW3FoVRIUUhMIWXm0JQcui5gGKLvmiagGRK6VToH1so6mpzzYaom4lYcms11mo0azcfLeI5CfLiHkRtfEbv3M8VHMRRlCVkpIMl55FIR2VBRHYvAwf4eaysVTEPENCUMQ6JSsVhdWUZTi4jCI4pLC8wO9TDe0U6yvxMpn/Cbl0oigpBDEPMouoLp2gT29/eo1z0UJe9LVQuUyxqeZ5FaiBGeGCCZiCLmk5TyCQwp4ze3LBVdVykUshSLGXRDpOzq58BqtYwkZhHFDLKcw7ZLuK5JPD5FaKSXubkwspw935khYBoSblnHcy00TfR3r2lFf5//A0rSBbBskmgBQ0FmZyfI5xcu7rOopSUsU6bsqNi24oNav2sN4wNrVdcHtaD/TngBHA31EouNkUnPU1haRBDSPlSWsr4rSs6HtWJRyPAPm4K8kAvzE0oAAAAASUVORK5CYII=)![Mobile and desktop mockups of the Epoch app browse page, featuring a minimalist grey UI with sound category filters, abstract visual assets, and a trending sounds list.](https://cdn.sanity.io/images/599r6htc/regionalized/718518ac6ff4fcd999efece86972e835d05c9f90-1608x1206.png?w=804&h=603&q=75&fit=max&auto=format)

Epoch's mobile and desktop browser experience—a fictional brand rooted in distorted textures and 3D natural forms.

###### Weave tip

Prompting a model to combine two styles gets you one interpretation. Building it as a workflow lets you tweak the influence of each reference independently—tinkering with the balance until the blend is exactly what you want.

## [Workflow 1: Combining two images to define a new style guide](#workflow-1-combining-two-images-to-define-a-new)

When you need new imagery that matches an existing aesthetic but a photoshoot isn't an option, the answer isn't to prompt from scratch and hope—it's to pull the style directly from what you already have. Here, we started with two of Epoch's reference images (a hibiscus flower and a rock face) and ran each through an [Image Describer node](https://help.weavy.ai/en/articles/12268282-text-tools#h_d9ed37d2d4) on the Figma Weave canvas. The node analyzes an image and pulls out the key visual attributes that define its look, things like texture, color, lighting, and composition, and turns them into a written description you can edit and build from. We then combined the two descriptions into a single new style. We adjusted the balance of influence between the two until the blend felt right. Running the result across different image generation models let us pressure-test it and finalize the look and feel of the style at scale.

What we ended up with wasn't a prompt. It was a reusable style definition we could carry into every workflow that followed.

**[Try it yourself: Combine two of your own reference images into a new style](https://app.weavy.ai/flow/GBOtndxMWghIWIBF5UP1Bq).**

Slide 1 of 8

![A close-up photograph of a pink hibiscus flower with radial petal veins and a white stamen, set against green foliage. ](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFbklEQVR4nCWU61fThx3Gf+dsJCEBRCWhgBfsVigitGdaBUUo1OGmVsUbiKMoCAjEULkYGgIm3CKXhEsgJhAhAckcOplOJ29cj+2wGPLLhYClZ6d/y2cH9uJ5+znP+T7f5xEk0t8glf6WSHkEsbEylHEKlMr/65MkJWf3Z2IoKMJTeofX9V3MVLVQfSyfA7tUxMbJUOyUIt8pQR4nRbZDgrAJVMgl7NqxjezkfZxP/5yTn+4n53cfU3YkB9vlal7fMvBj4yBLulHeNPfhulxN7dE80j9OJEYlQ66UEqmSIo2TICgUEj6JV3E14wsGTxTjKbnN1IVqhk9eZa5Uw7umAQJt4/jbH+DteMBP343ww7cmXDc0nM06RFyiAnm8BFm8FIlSgrAnYQelh3NwXb3N2/pevHeHeN84wFJNJ+/VvQS1w4Taxgi02/C2j7Ost7LcYeWpRkdxfjaq5OgtYKRSimTT4fGMVAZLKvlRN4xotCMabPj1VvxNZgIN/aw2mglrRwi1jrLSOsL7jjG896y80LTSdOUMh7NTUO6NJmqPgui0HQgX/5jDbN1dfJ0PCPRMEuxyENJbCTYMEKrsZK3cwM8V3axXdBNQ9+HrGMdnHGdJN8Dz74zcqywjO+9T4k8kkliejnBRfYGJFi0/6YcJ3rMRbh8n3GQhXHaP1cJ6wrnlbORd5+fCW4SvGwgZ7AQGXQQsbvxDLv5l7KO+8hypFftJaj+EcMJ0DXXjN/z1tpYVrYVw8xBrFZ2Ev6olmHGKwOfHWMvK40NBERvlOja6pgjbnhB0PMFv87BscWLXNnFSXcAuw1GElFvZfHH2D7SVXuOtzkK4dZRwuYHV3Ar8Gbn48rMIlZ7jQ0kJv1Zq+dXkYn1ygeDDZ4gTf0O0zrDYa0HbUc2h3tMIyoIkDh5Nob30G9522wibplhvHmK9+C6reUWEzp/G31LLyre1BJvb+WD1EHb/E//0Ar6JeXzWWZYGHYwZtRQ2n0JILf6MqkunmVe34TVNErK4WeuZZKNhgP8WNfBLcRUhXStevY7lASv+2eeE5l7hn3qGz/6YlVE37wYmsN1pJP/UQYSc1j9xv6aCt5puxM2kh9ysmt18aBvnl5peNu70stZtIWg0I4648XteEZp7SdD5960brozO8Ob+OMbrN8j8bC9CdvNxeksv8u8KHb5OO37rHIHhWUJdjq3E1/unWR+fY9Xswj/6CHHmOYHZF4gPPHzfa2VB142lup5zudkk7NmGcKzhOD3XLvNGbcQ3MI045kE0uxBNkwT7HrLqmCf06CWB6X8gOp8iTj/DP/2MHyxOrFW1VBZ+yVdZaaRnxvP7zBiEE12XMbZrWOwZwmtxIVrc+PqdiN0OQv1ThDbfw/MKce4lomsBn3MecXKeRdMoDefOcCBNRUKKnLQj2yg4H49QaKukxtaIdbSLF/1mvr9vZalns16jBI02QpYZxOkFVlwLeJ3zeB2PWbY9wtNq4NLxwyTslhOVGMGuAwqOnIlD+PNEFRecddx0NNA6coeB/hYme/Q8NhpZ1PfyvseBaH/CivPpFsxr97DYb0X/l6scTEtiu0pC5M4IohIlqNIjEb521lA0pebSlJqL9htcMV+hvL+M2+Y6+kx3edE3xNKIm3djj/iP1c3rQSt9mlsU5maQtEdBjCoCuVKCbFPxEQhXpusoczdQ/rCOInMRebqj5BoKuTBeRZ2jhb6xTqbM9/GYunlobEVbU0JBQSa7U2PZvltKTJKMqIRI5AkyZB9JEW5M16JxqdFM3uTr9i9JKd3HgbojnLeruekxUOvSo7E20txznerGfLIK9/JRahTbk2XE7otkW7KCmORoovdGbU3Y/wAg86lyueY5YAAAAABJRU5ErkJggg==)![A close-up photograph of a pink hibiscus flower with radial petal veins and a white stamen, set against green foliage. ](https://cdn.sanity.io/images/599r6htc/regionalized/bc85128fcb5ce4f8c99fc1793d1cf8566ee324bd-340x343.png?w=480&h=484&q=75&fit=max&auto=format)

One of the two reference images used in workflow #1: a hibiscus flower.

###### Weave tip

Build this workflow once, apply your style to a new subject, explore variations to find the right asset, and let Weave handle the resizing across aspect ratios automatically. You focus on what looks right—the system handles the rest.

## [Workflow 2: Generating variations in multiple aspect ratios](#workflow-2-generating-variations-in-multiple)

Workflow #1 produced a set of style definitions—detailed descriptions of how an image should look, capturing texture, material, and mood. But having a style guide like that is one thing. Using it to generate something entirely new, with variations you can control, and then deploying it across channels at multiple aspect ratios, is another.

We gathered our favorite style outputs from workflow #1 and fed them into an [Any LLM node](https://help.weavy.ai/en/articles/12268282-text-tools#h_9e3ef50e02)—where you can choose any text model and give it instructions. In this case, we asked it to generate a master style description we could apply to a new subject. Epoch's brand draws on natural materials and textures, so we took the flower-rock style from the original references and applied it to a begonia plant—the material stayed consistent, the subject changed entirely, and the flower-rock style from the original references became the surface of the plant itself. That gave us six variations of plants, the same visual logic and different interpretations.

From there, the workflow automatically produced three aspect ratios from a single favorite: 1:1 (for a mobile product screen), 967x420 pixels (for a desktop product screen), and 9:16 (for a social post)—ready for Figma Design.

**[Try it yourself: Take your style guide further and generate on-brand variations at any size](https://app.weavy.ai/flow/AuAI511eS7Tb7E48ZIMWOO).**

![A Figma Weave canvas showing workflow two—six variations of a distorted hibiscus flower generated from a combined style, connected by nodes to an aspect ratio section that outputs the same image in three different formats.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAABYlAAAWJQFJUiTwAAAC5UlEQVR4nM2U20/bZhiH8xc0kDhxAgyC4kOcOPEhB5MTJScMhhwaEgjLGO0gSEB3UaRWlSZt2sV6scve9a99Jjuo1bZO6rRd9OKRbMl6/Pve733f0JMnEf5PQl+NMByOEP4vwtVVgY2Nb0in00iShCSl2dzaIirE/yyMRkWi0TiRR6KR2Mdnn9XVWPBhPJ7Etk1ct4Xndekf9+i06qiKjCgmAsfKSpSQpEioqoye1TDyOnZBx8zrGLpOIauR2twK0sXiSUzTpN3e48DtMJ8ec3V6TK9RIZdVSaVSCDGRULFSwOvWuJoecXvW5/7kgJsTj7vpkMXAxcnnEPzkgoiiZLAsG6dSYey1uZkcMuzUccommqYiJtYI7dRMric93t3N+e3qjJ9PPd7Ojnh3c86vlye0igaCsBRKkkLBMCgWbdx2g9mgS3+/SW2nSDaXIZH0hVWLU+8pt5NDXk6OuRu5XHotbsYu16N9KoVsUB8hlkCWMximRaVS5nx0wC/3c15eDGnv7qBlMyT8hK2mw8xrcdHvsJj2eXg+5WLoMmg3GHeaVAydmCAGCWVZpWCaOE6Z2/MBH94uePP9kL1GmWw2Q9JPeNSq8uO4x8PsgJ+uprx/c83rFxN+GPS4G+3TdWzE+PIWZUXGtA2q1RKL00N+v5+xeNah7ljLIyfWCbUci7M9h2+7NV702zzMB1wOe5x0m8y6DepmHjEmBnVUVBm76AuLzIYdXj0fMB+2adZLZHPasoaqlCanyOiqTD6jYukaupZBU+SA7c0tIpFYIPQTWrZJxSni9Zp8N3Z55u3RqJc/CYNm/guRiE/sY2OHw1GEoIYKpmlTLpc57O5yMdpn5O5Sq5YeLyX599H73Hz6BDX0hZZFqWTztOngdep0dndwHPtTwi+dZV/oz2/B0DGtPJZdwH7Ef89oyrKx/81yWFtbD0Yste2z/UgqYH1jI/jpFwv9dbWyIgTiz+EvBr/WX8+C/SfhH5caOt8IRP6LAAAAAElFTkSuQmCC)![A Figma Weave canvas showing workflow two—six variations of a distorted hibiscus flower generated from a combined style, connected by nodes to an aspect ratio section that outputs the same image in three different formats.](https://cdn.sanity.io/images/599r6htc/regionalized/6be0eea6545f28299645195b71c9c1ef3ebe73a0-984x984.png?w=390&h=390&q=75&fit=max&auto=format)

Six plant variations generated in the combined style, with a favorite (the begonia plant) then resized across three aspect ratios.

![Mobile, desktop, and story mockups of the Epoch app showing a music player interface with a distorted hibiscus flower as the hero image, waveform tracks, and a social story format featuring the Epoch wordmark.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwklEQVR4nLWT3UtTARiHz98SUURXRbcRKTRDkEIptMIuNK0u+pC0zbLStqwpqeWSnOZXzdVapRZNp7OmTo/Njlbq2s7OnLnW5pmFztsnsroR6qoufhfv+8IDL/weIZlM8i8j/Bfgyq9hdd3x9359VleTJFf/APz2dYnE5wjqXIioIhMJh5ifUwgF/YSCAcJBmZAcIKQECMp+PvpmmZ2ZJhDwMx8OEVb8KP4ZFuYVvi4lEOIL88jufryWFvrbGnH12Hj14iF9tmb6O1twtJl5eLcOW2s9D5puUVNVSaVBj+n2LXqeWOl93Ep3Rz1DjsdEwkGESMCHaDFjLztF88XTWBuqeGo2YKs+h728CPPZfIoPZ1Ccl8n549nk5mRxICuLwvw8TEY91toK2vRFPG2sRp6eQvgkz+KxN9Fdo6XdWErHHSNtN7W060/wqPwkDWdzKdifQu7+3RTmpJOZsZe9Gg1HsrOpuVKGRV/K3aICWq9f5p1XRIiGg0guG8NdJpzPOuh51E5nQwXPGrUM3L9KV5OBOr2W6ooSdGeOkZa6ix3btrMvPR3jhfM0XThD9fFDmMp1eMVRhNhCmPcjL/E4rYwOufC6XYw9b2HCUY/0+h4elx1Xr5MBh4Mao4HUXTvZtGEjmpQUDLoiarWF6I5mcE17GnF0BOHL5wWkcTeDzm6G3YNMjnuYcHUz1mfF8+oJrwcdDA4M4+wd4GbVDdJSU9m6eQvpGg2Vl4qpLMmn8OAeyrWnkH68rKqLyPIs799NMDM9xUffB6beinjFIaS3Y0jSON43Ip4RN52WDrQlxRTk5XNRp8PSaqazuRaTsQy7pXmtasLy8jJLSyqqGieRWCSRUInHY8RiURYXY6hqjHj8C9FoBEWRkSSJcVFkcnISOeBHkX3Ivg98mgv+7OHfNPphxJoV6w1aWfmjRf/H5X8J/A4l1up8kFOmSwAAAABJRU5ErkJggg==)![Mobile, desktop, and story mockups of the Epoch app showing a music player interface with a distorted hibiscus flower as the hero image, waveform tracks, and a social story format featuring the Epoch wordmark.](https://cdn.sanity.io/images/599r6htc/regionalized/e798a389f58b99539b1c57c4ca25f202d9c78ae7-2160x1620.png?w=804&h=603&q=75&fit=max&auto=format)

Epoch's updated product UI across mobile, desktop, and social story formats in Figma Design.

###### Weave tip

Applying effects one at a time can make it hard to compare options side by side. With Weave, run all your distortions against the same image in one pass, compare every variation at once, and choose with confidence.

## [Workflow 3: Exploring multiple distortion effects](#workflow-3-exploring-multiple-distortion-effects)

Epoch uses displacement and distortion as part of its visual language. Applying that effect consistently, and at scale, is where manual iteration gets slow.

We took the flower-rock-plant image from workflow #2 and Epoch's existing distortion references, then combined them to produce eight different distorted outcomes in one pass. From there, we removed the background and placed them on Epoch's brand colors to see which effect fit where.

The advantage isn't just speed, it's comparison. Epoch works with several different types of distortion, and running all of them against the same image—simultaneously—let us make a more confident call about which one suited the asset best.

**[Try it yourself: Apply multiple effects to the same image and find the one that fits best](https://app.weavy.ai/flow/WTR8ghItaSt0dapFvFEgUh).**

Slide 1 of 7

![An AI-generated image combining a hibiscus flower and rock face, showing a circular flower form with petal veins and a spiraling center fused with layered sandstone textures in deep pink and cream tones.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEz0lEQVR4nAHEBDv7AIJtVZOAaraiir2ahqprabllcOKPmvO1tvLAu+67t+yzsumoq9iCjLlYY5RCRWosKGwyJZ5cQcmNZtmofgBnUDh8ZEmgfWOycWq8X23UeojsrK3zz8Hx2MTs0r3qzbzkxLXToJe/dneoVFiZT0iXYEuJWkKIW0CdclIAnIRnqo9wrn9qtGFmz3WB5qmo78y879K96sy048Cn4cKp2r+lzqyUw5GDpmBglFVNfVtJRDImLh4UQi4eAM22l82slsmJgs+AheKpo+zPuevNtuGnnNSLg81/ddGNfdKUgsyQfsWOf51hXmU2NDglHhYPCwwHAxEMBQDHpIjGiYLTeYHln5/uz7rt0bPgpZPHaWu2T1W8W1fLemvUhnjQgHfLgnymYWJbKywfDQwMBgMKBQIJBgEAv4NzynB33X2J6q6m7M2y5LOZy25nr0FGq01KuG5axopq1qGA3KqP2aWTwYF6hk5NRScoGQ4OBwQDBAIBAK1cYMdlc9+Vlui+qeS3m9GCdLJJS6ZEQ6ZdS5ZaQpZcQ7mCY9mzjN/DntWyl76Tg5BoY0YvLxAJCgEBAQCcSFK8am/bp5nlyavgrJHAYFubNTujU02ZXElnMiVfJB2SRTvLjXTfwpzUwZ69pIqifnBqSEYiFRYDAQIAp2Jiu4N51bWd486t4LCUvV9bjzE3m1ZRoGpbdkc9ajAskjs6yoFx3r6cw7CQjndigF9SelVPPispDgkHAK55a6J8ar2litfAoM2hhKRbUHUrLHU8OpFiWIVcUm8+OIQ+OrJ0ZMuoiMSph6OEaqJ7Z6R4bmNIQh4VDwC5h3CmfGS1kXS1k3WRalJyQTVeKSdZJShcMDBKKyg+HxxUKiR2SjqfdlnCmXTNoX3NnX2zgG9mRT4eFA8AuYRqrX1hn3RYhl5Gdk04hFA+jkdCgjY7YikvPBcbRR0fbkA2flM9h15Dl3BSoHpbo3lch11KRCsmEw0LAIFYQ2dGNVY4KGhCLphlScOAYsl0YrhbV51MToM6P5RJSL12ZMCFZp1uTmtKNEw2J0kyJEAoHx8UEQkIBgBkRjJHLiJAJht4UTq9jWnfr4fjq4bbkXXQemjNdGfXh3Tjo4Teo3y4f1t1TDRCKBwnFQ4YDAoOCgkJCQcAnHxaf19LclFDpoZq172W59Sr7dOq6LuS5KqC6bCL7cKb7c6k5MKWx5tzlGlLXTorLxcTEggICwoJCwsLAMiqgruagLWJe9GtmOjWuOziw+vcu+jMp+nLou/VrfHfuu/ivOnastvFnr+ef45mWFQwMSISFRIODRgUEQDNsonLro7GmonRo5favqzWxK/UvaTcw6fq2Lnw4sPw4sTt38Dp2rzlz7TYtqC6i4GAU1U2ISMmHRZJOSkAvp93spRuqoZpq4NwnXpqmndhsIVoyqKE3MKm6NW67Ni76M+x276l0K2Zyp2Or4F2bkxIKRwZLSMYaFE5AKyJYqmIYLWWb6iLbmxRPmA9KZZjQsOIX86ZcdWrid67mtawj7uQc6FzXIRcS1tANywfGg8MCRoVDjwvIACphV+4l2/Psoi2n3xcSzgyIRZtSDK6flTQiFbKiFvIkWu7imeqd1aFWD5EKx0XDwoKBwUJCAUMCwgRDwpMMUNiPdsB7QAAAABJRU5ErkJggg==)![An AI-generated image combining a hibiscus flower and rock face, showing a circular flower form with petal veins and a spiraling center fused with layered sandstone textures in deep pink and cream tones.](https://cdn.sanity.io/images/599r6htc/regionalized/c0fc644db41a853f8c260d67f29a0bf336634c67-1024x1024.png?w=480&h=480&q=75&fit=max&auto=format)

The combined style (flower-rock-plant image) used as the starting point for workflow #3's distortion effects.

###### Weave tip

Prompting for multiple angles of an object gets you interpretations, not control. Generating three perspectives and running them through Rodin 3D V2 gives you a model you can rotate to any angle—so the composition drives the shot, not the other way around.

## [Workflow 4: Converting an image into 3D](#workflow-4-converting-an-image-into-3d)

Epoch's brand is grounded in physical, natural forms—rocks, plants, tactile textures—brought to life through distortion and 3D. But photographing physical objects means you're stuck with whatever angle you captured. Generating a 3D model instead gives you full control: Rotate to any angle, find the right composition, and lock it in.

Referencing some of the natural elements in Epoch’s branding—a leaf, a cactus, and three rocks—we generated a new white rock, then prompted a front, back, left, and right view of the rock. We then ran those through Rodin 3D V2 to produce a model we could rotate freely. We found the angle that worked for our composition and locked it in, ready to use as a still image or drop into a video output. No photographer, no reshooting, no compromising on the angle because that's just how the light was that day.

With our 3D model in hand, we had everything we needed to bring Epoch's homepage to life: the distortion from workflow #3, Epoch's existing brand elements, and a perfectly composed 3D form to anchor it all.

**[Try it yourself: Turn any physical reference into a 3D model you can rotate freely](https://app.weavy.ai/flow/oqShz3vxNOpg0bEOx6MGYP).**

###### Weave tip

Once you're satisfied with your visuals, getting them into Figma Design is as simple as a download or copy-paste—with more to come as we work toward a deeper integration between the two products.

## [Workflow 5: Compositing elements into a video rendering](#workflow-5-compositing-elements-into-a-video)

With a set of static assets in place, the last step is motion. Using the homepage from workflow #4, we pulled in a simple animation as a motion reference to drive the distorted image at the bottom of the page. The 3D rock, meanwhile, is controlled by the [3D node and a Kling Element node](https://help.weavy.ai/en/articles/12292386-understanding-nodes)—giving the video model an understanding of the stone's angles to animate it independently. The final product was exported from Figma Weave and dropped back into Figma to be passed on to development.

**[Try it yourself: Animate your own elements and export a production-ready video](https://app.weavy.ai/flow/5am0Gz88MkGwzdNtLPy7rh).**

Two reference images. Five workflows. A full brand system—including new images, videos, and 3D models—with no photoshoot. That's what building with Figma Weave looks like in practice.

We're working on bringing Figma Weave into the Figma ecosystem, with a full integration coming later this year. In the meantime, register for [our livestream](https://fig-events.figma.com/get-started-figma-weave) on April 16, 2026, and let us know what you build in the [Figma Forum](https://forum.figma.com/share-your-feedback-26). For more resources on how to get started with your own workflows, visit the [Figma Weave knowledge center](https://help.weavy.ai/en/) or read more in our [help center](https://help.figma.com/hc/en-us/articles/35965787376919-Figma-Weave-FAQ).