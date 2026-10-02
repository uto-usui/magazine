---
title: "Workflow lab: From design system to campaign in Figma Weave"
source: "https://www.figma.com/blog/workflow-lab-from-design-system-to-campaign-in-figma-weave/"
publishedDate: "2026-10-01"
category: "design"
feedName: "Figma Blog"
---

###### Workflow fact sheet:

**Figma products:** Figma Weave, Figma Design, FigJam

**Tools:** Figma node, Image Describer node, Color Palette node, Gen Effect node, Any LLM node

**Team:** Product designer, brand copywriter

**Question to solve:** What if you could transform elements from a design system into on-brand marketing assets at speed?

_Welcome to Workflow Lab, where we present a [sample workflow](https://www.figma.com/blog/workflow-lab-moving-between-design-and-code-with-agents/)_

_using Figma products and tools._

A design system is typically built with product designers in mind, giving them guidance on everything from button states to layouts for different screen sizes. But brand designers use many of the same building blocks, including type, color, and layout, which they leverage for marketing assets like billboards or social media posts. [Figma Weave](https://www.figma.com/blog/five-figma-weave-workflows/)

gives brand designers a way to draw on a product’s design system as they explore ideas for campaign work.

In this example workflow, a product designer at the Museum of Speculative Futures (MOSF), a fictional museum exploring how culture imagines what comes next, uses [Weave](https://weave.figma.com/) to bring elements from the museum’s design system into a campaign promoting the exhibition. Follow along as they transform type, color, and layouts from their product designs into expressive collateral and create a repeatable workflow the team can reuse.

## [The problem](#the-problem)

A few weeks before a new exhibition launch, _Tomorrow Rehearsed_, MOSF’s brand designer is out on unexpected leave. Instead of hiring an agency or a temporary backfill, one of the product designers with a deep appreciation for brand design offers to take over the project to keep the ball rolling. They know MOSF’s design system inside and out, but they’ve never used that system to create assets for a promotional campaign.

The _Tomorrow Rehearsed_ exhibition imagines a future where nature can thrive undisturbed. One installation displays grass growing on the steps at a train station concourse. Another features a bench that has become a planter and a drinking fountain furred with moss. The designer needs to capture that mood across all the exhibition collateral without giving too much of the exhibition away.

Rather than start from scratch, the designer brings familiar references—including the design system—from Figma Design into Figma Weave: existing text layouts, the museum’s color palette, and typography. They use those references to explore how MOSF’s existing visual language can express the exhibition’s mood, then carry that direction across three assets at different scales: a poster, billboard, and social media posts.

![Three concrete street objects—steps, a bench and a drinking fountain—each overgrown with moss and small blue flowers.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC3ElEQVQokSXTWVNaBwDFcb5iH5qXJhqSpi7gjGDEEpALXmXfZBUuXJYLSNiiNEBSBExSTVM7Scd21Do2JpGZmEw6U/wC/w7m9Tz85pyHo7px90em9KssCkGMKyGMK2EWLAG+nxdRay1oF+3oTR7uW/zoTV7u6UTuza+gN/sw2NZZtAbRm73X2Y27S6huzpgJxBW6g332Xr1h79UftLovcAZlrI4ISqlBq9On29+j2RngjeRxrWdotnfZ/eWA3rOXNNs9XOsyN6fNqG5rBYrVx1wMh4xG/zEajTg9OyeVrxNPlTg4eM3FhyGfP33m7J/3FKttMsUtjk/O+HR5ybvztxweHpJWaowt1aRGIFtqcHL8Jxfvj7n8eM7J6SnpQgM5X+fo6IR/v3zh6uqKD8OPlBtPyZS2rpHDN/v0fm7Q22kjZcuox+DEzDKBcJLteoHtRoRBv8jLX58j5aqksg95/fsL3r39jeHwL/4+PaJYeUwqX+P5bpdSzo97TUchlyCWzH8Fb02bEGwOgm4Br2OaeFRLpRIlkpCJbqRpbcvsdAJ0O2GetDdJpAsk0kV2Ok0SIRFhaQpFjhGNpZmcXR6DDzAv27ALBqxGNVbLN3jc09jdTsLRBI2yRKPoQ45ZiPhFnJ4g8USWXqeJHHNhXdIgxwIEghEmZkzjySbcHj+piAePqGNVuIXDPoWwaiMWT9HvPOJZu8JmOkTAKWITXUQ3Mgye/sTDbAi3Vc9GwIHT5WNc7hqMxiW6rTrNaoZaKU65mMTlDxOOJuk/2WJ/Z4tOPUchFcPhChCKpdntdhi0KjSUODUlhdcbYmIMfveDEdEVYnOzTK1aoVatkVfKCPYQFtGHlJRQMmlkKU40HMZkdSOsrZPLFSgXFPKyhCxJCKKPsaX69o6BO1oLc4Y15o0OdA9czBkc1y+ZnDUxo7OiXbAxqxeYmv+aqTUWNPdXmVsU0S5Y0SzYUGuXGVv/A0okZ/98bM09AAAAAElFTkSuQmCC)![Three concrete street objects—steps, a bench and a drinking fountain—each overgrown with moss and small blue flowers.](https://cdn.sanity.io/images/599r6htc/regionalized/bdb97a44736eef8c6c2f3f7896a098b0ccbc5c5b-3264x1836.png?rect=2,0,3261,1836&w=1080&h=608&q=75&fit=max&auto=format)

Photographs of three installations from the Tomorrow Rehearsed exhibition

## [Building on what already exists](#building-on-what-already-exists)

###### The Figma node

The [Figma node](https://help.figma.com/hc/en-us/articles/35965787376919-Figma-Weave-FAQ#h_01KN263PTZV8MEXHQJEJXGV4HD) brings a Figma frame onto the Weave canvas. Copy a frame in Figma Design, paste it into Weave, and the node appears. The Figma node stays connected, so any change in Figma Design shows up in Weave.

###### Weave tip: Give every reference a job

Tell Weave which references should guide layout, color, and type, rather than leaving it to infer their roles. The same logic applies to color: describing each color family separately gives Weave clearer guidance than asking one node to cover the whole palette.

To get started on the campaign, the designer gathers examples of MOSF’s existing designs and colors to guide the new work. They copy relevant frames from Figma Design and paste them onto the Weave canvas.

Next, the designer uses an [**Image Describer node**](https://help.weavy.ai/en/articles/12268282-text-tools#h_d9ed37d2d4) to analyze visual references from those designs, including iconography, exhibition cards, and app screens. They ask it to look at which colors dominate, which are used as accents, and how layouts change when they include a photo background instead of solid color background. What comes back is a description of how the existing designs use color, accents, photography, and type.

###### Try it yourself: Use the Image describer as a mirror

Paste a layout frame and a swatch frame onto the Weave canvas as Figma nodes, connect both to an Image Describer, and see how the describer reads your brand.

The designer also adds the museum’s full color palette to a separate [**Color palette node**](https://help.weavy.ai/en/articles/12268186-editing-tools#h_3d946d31cf). Three more Image Describer nodes then examine its color families: gray, yellow-orange, and blue. Each describes how the colors change across that family’s range. The yellow-orange shifts toward acid yellow-green as it lightens, rather than fading to pale yellow. The grays get dark but never reach black. The blues stay muted, closer to slate than primary blue. Together with the earlier description of MOSF’s existing designs, these three color descriptions give the rest of the workflow a guide for generating campaign images.

![MOSF brand and product design work—icon set, exhibition cards, ticket, poster, and app screens across a range of layouts](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAADBUlEQVQokQXB/VOSBwDA8eff2Q+73XU3N11SnTkJK9tRurleoNlNwiyv5E0g4dEHEAOEsPOiZ/AA8iYQKmiw5TrrUPNkm525utu6dftlu/YvfPf5CN65jyk1OniypWLtRSfReBsDFz9Fc7qbvnOnONHVybHjHWi1Z9Fq+1Adbae3R43FZCYUChGJRJibC+P1eBgxGhGUQhvbByc5+FvNq796KNePceu2CtvIOXy3TjP0jQq9/gKBoJ9gKMC1qzqGLukIzvrJZGTKj7Msr1TI5XJI09MIuWo7rT97ePuhl9//0VDb7MJmP86s+QyyQ4PF0I3FPEx+KUupXMZutTJ23Ygci/LTRoEXzSrNrU0a9TqBwD2EbO1zWu++5O2HUxz+q2a9eRKXR41fukj8wSjh4DiB4ATFkkxtvUQkPIP7roliIcXh4R6//rZNvb5OqVjE7/cjPMp20NzXsP/+LK13Z3j8VI3DrWHC+S3BsJlQeBrJN04oYmHh4QySZwKb9QZKIkartUez2SRfyBOLxXA6HAhTvq/IV4zUfjaxumElWbQgSmOYLTewOSy4fbN4Ql5m7otMB7xcvznKlcsDuO5aSKaTpHM5ItEIdpuJwa/PIzgdJpRUjFJ1mcqPz6g+22Zpuc4jOU54fgG5UKDQKFLeyKFUstinpjAa9EjiOHLyAXI6huSb5KquH1VnG4LoclMoFNl4vsvLV+/Z/+M/dn55w/JKjURaIV15SGbVTbZqJVXxIQXdOB13SMr3WKvGWVy8j1eyorsyQNtnRxCmp0TK5RJbOzscHL7m9ZtDdnZ3WVlZJZnNkKvFya9ZydeM5Go+vBE/dqedxUSURlVBkYO4XFb0Qzq+UHUiOJ0OEkqCpbzCSibEUtxDSpknmUoiKxmWGk9ovCzzdC/D8uYqYjDKNeNNRLedhflZJO8UxrHbaAcv0a46gWAYHkZ0TyI5RgiMdiN+14Z5dBC36EL0BAj/kCe1WiG7XmQhV8YwPkl3bx8X+rUYDAb034/Q13+Zo11qPvrkCP8D4DJHdSFc8rsAAAAASUVORK5CYII=)![MOSF brand and product design work—icon set, exhibition cards, ticket, poster, and app screens across a range of layouts](https://cdn.sanity.io/images/599r6htc/regionalized/ab7862cebefe505100f32cae3bfeb43fa0252e13-1056x594.png?w=528&h=297&q=75&fit=max&auto=format)

Elements from the brand designer and the MOSF design system used as input in Weave

![Three screens from the Museum of Speculative Futures app. A light home screen with a pale blue header, Get tickets and Explore buttons, and a What's On card showing an orange geodesic dome above forest. A dark Explore screen with a search field, category filter chips, and a grid of exhibit thumbnails. A light detail screen for the Modular Living exhibition by Camille Vosk, with a photo of a rounded white module and an About section. Exhibition titles run in black type on acid yellow highlights across all three.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAADAElEQVQokVXTa0+TBxjGcfr0rXElOgWftgKLTZrMMoeLGQORQ+TMSkuttljtxK4qPMhDC3Y9YGUrhRFB3QQbIyHuBUxxEaqAWjvmGcRD4mFkxmRzyZbshX6D/zIXRvYFfrnuXNedolAILFuuYmNuIfWuVtyeMK6WIOVGG9rM90hbvRpRFFGLIulpaeh067DZbYRCQTo7j+D1eiguLkalUqFQKEgRBIGVq9Ix2/bQf+YC30/Pcf7aPKHuATbl5qPX68jONmAwGNDr9RQUbKa/v4ebt67y4OEdkskEsiyj0Wj4x0oRBCWiWosk+0jcfsTCb6/5+dUbhkcnMFnMVNeUYjYZKS8rIy/vE8orizj+bTu3Z4d4+esNXrx4SjQaJSsr619QqVSiXbsWnz/E/cdP+P3Pv3j56g9Gzo3hcrsIBgP0RiN0eBpo2F5CXW0BPUedXEl28nwhzsLCYyKRriVQUCpZI4q4mxq5NDXO3N0EicQE3Ue7sTt2EggEGOiLMBiy4bPn4KgrJBaLMD/3A788v8XD+Vk6QofJzMhcPFkgdUUqNcatnO5rYXpwP6fCO9jtqGRLUT5Op40jQYnDBy04jZuw1Gxl8MQx7l2fZDZ5mamLF2htaUGr1S6CCt5RLae05CNO+KoZCxbQ487BXJXDhxvXU2su4wt/E37fQeptFj6tqqQr3EF8ZJipc2cZGYrhdjW8XcJ/Cd9dtYI6cwnHunYz3LeLkz17kZp2kr85l4qqUiTJjd/Xxh7nZ5iMRrq/6mTy4nlmpuOMj40iNe5HrVYvliKg0aSz74CV70aCXJrqZebmKKfPnMRkNmHdsY22dpnol2G8sswuh4NY7BTz9+d49vQJ9+7eIRDwk5GRsQSKYhoNLitDZyOMX47x409xBga+oaKiAmNtNbLnc8IhL41uF9ssFr7u7WVy+grXkzNMTMSRJGkp4dtSUlUUFRXSKB2g/ZAXn+8Qdns9Op0O3bpM8vI2ULjlY3I+yMaw/n2s1u3IrR68be00Nzf/71P+Bj+b3Sl8C1ubAAAAAElFTkSuQmCC)![Three screens from the Museum of Speculative Futures app. A light home screen with a pale blue header, Get tickets and Explore buttons, and a What's On card showing an orange geodesic dome above forest. A dark Explore screen with a search field, category filter chips, and a grid of exhibit thumbnails. A light detail screen for the Modular Living exhibition by Camille Vosk, with a photo of a rounded white module and an About section. Exhibition titles run in black type on acid yellow highlights across all three.](https://cdn.sanity.io/images/599r6htc/regionalized/2bd71c26e00d5cb0827583c4cb962b515b640edc-1056x594.png?w=528&h=297&q=75&fit=max&auto=format)

The latest UI designs from a recent app overhaul used as input in Weave

![Three color ramps from the MOSF palette, labeled grey, yellow-orange, and blue. Each runs six steps numbered 100 to 600, from darkest on the left to lightest on the right. The greys begin at a near-black charcoal, the yellow-orange moves from orange through yellow into an acid yellow-green, and the blue runs from a muted slate to a pale tint.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB/ElEQVQokYWT0W/SUBjF+eN98WnOJSYu2R6MM5lxGAeoJTFRKdBNO7cBGcUNVrrRQssoGwPa29ufaZnE6NSHX77kJufcnHzfyaysrKAoCtVqlUqlspwJqqqmlMtlKgl375qmLalWq+ksFousra2R2d7exjAMPM9LGQ6H9Pt96vU6+XyOnZ1X5HZ3KSrvUUslDnQdo9nENE1s28Z13VTXarXIZrNk8vk8vV6PKIpSpJTM53NqtRobm5usrj5mfX2dredbFHJ51FKZRr2BZVn4oxFBEKQ6x3HSpJlCoZD+lBglxHGMEIKB06Oma+jaJ470Mo3jfU5bR1jdJoNBh5FvM52NEVGY6pJUSew/DFNEgPTOECc5hPECYb5EOK+J/LeEM4Vp9IEbqXEbnyLiyd8N4/iOcEZ8eYjcf4L8+gDZfIg0HyG9p4TTDSbRM0bxG8bxAWE8/pdhvCASzH0Hv63jdypcX37hxv3G7bjBdHrCbWgwiTrMpEsUB/+PHArBRa+Pun/MR63G3nGHw1Yfw7rmfDDH9gXeRHITSMJooVka3rflIAj53u6SU0pk35VR1DqfD7rorStOrBnnboQ9llxNJYFY6JZbvu8Ok2l2LWqNJkd1g4bRpnlmcWo6nF+4WLbHZX+I4w5x73TLO7yvKT/Z29MW/NKMBUk7FvzelB97MQ1dX3AeDwAAAABJRU5ErkJggg==)![Three color ramps from the MOSF palette, labeled grey, yellow-orange, and blue. Each runs six steps numbered 100 to 600, from darkest on the left to lightest on the right. The greys begin at a near-black charcoal, the yellow-orange moves from orange through yellow into an acid yellow-green, and the blue runs from a muted slate to a pale tint.](https://cdn.sanity.io/images/599r6htc/regionalized/e0b040a4569ed454502a7fe061681b034b047860-1056x594.png?w=528&h=297&q=75&fit=max&auto=format)

The color palette from the MOSF design system used as input in Weave

## [Creating a signature look](#creating-a-signature-look)

###### Weave tip: Explore different results

The Gen Effect node returns something slightly different every time you run it, so the effect you land on is specific to your campaign. Generate a few versions and keep the one that fits.

With that guidance in place, the designer starts making the campaign images. They upload the photographs of the exhibition installations—the steps, bench, and drinking fountain—to the Weave canvas and connect the images to the Image Describer node. The node then sends each subject through the same image-making setup, including the color, layout, and typographic rules established earlier, so every campaign image builds on a consistent foundation.

###### Try it yourself: Run the same description three times

Send one effect description through the Gen Effect node three times and compare what comes back. Apply your pick across a full set of images to see whether it holds up as a signature.

The designer extracts elements from the photographs and builds abstract visuals for the exhibition collateral. They land on two images: a concrete cube floating mid-air and overgrown with moss, and a close crop of moss and blue flowers pushing through cracked concrete. From there the designer plays around with different visual effects to push the campaign photography somewhere more expressive, while keeping the imagery recognizably MOSF.

Using the [**Gen Effect node**](https://help.weavy.ai/en/articles/16118602-gen-effect-node), the designer describes the effects they want in plain language, and Weave creates a shift in color grading and a hazy blur around the edges of each image. Every asset passes through the same node, giving the full campaign a shared visual signature. The designer can adjust the effect and apply it to new images without recreating the work underneath.

## [Extending the design across formats and languages](#extending-the-design-across-formats-and-languages)

Once the effect is applied, the designer uses the Figma node to send each image into a frame in the Figma Design file, where it gets transformed into different compositions and layered with editable text frames. From there, the designer expands the background visuals into different formats. They start with the poster and billboard, using the floating cube image as the background and positioning the typography. With the print assets locked, they move on to the social posts, using a tighter crop of the cracked-concrete image as the background.

Social assets also need to run in four other markets—French, German, Japanese, and Portuguese. Back in Weave, each language gets its own [**Any LLM node**](https://help.weavy.ai/en/articles/12268282-text-tools#h_9e3ef50e02), set up with guidelines the MOSF copywriter wrote for that market. The designer pastes the English concept line into the prompt box, and each node returns a version that’s culturally relevant, on brand, and shaped to the layout, with the line breaks in the right places.

Then the social posts return to the Figma Design file through the Figma node. Each localized version lands in its own frame, the type remains editable text, and the designer makes any final composition tweaks that need direct manipulation. With all three formats built, the work moves into a FigJam file for a campaign design crit.

## [Path to production: Making the workflow reusable](#path-to-production-making-the-workflow-reusable)

###### Weave tip: Publishing Weave tools

Publishing your workflows as a [Weave tool](https://www.figma.com/blog/try-these-5-weave-tools-and-share-your-own/) on Figma Community is another way to share your work. The subject stays open as an input while the workflow structure remains consistent, so anyone can run it.

Every output in this workflow is specific to this exhibition, but the structure is reusable. The node graph reads whatever references it’s pointed at, so when the brand designer returns they can reuse it to make tweaks or create other assets for the rest of this exhibition’s collateral and other shows that follow.

And because the Figma nodes stay connected, the designs stay current. When the design systems team ships a new color token or updates a type style, the frame updates in Figma, the node updates in Weave, and the baseline reruns. A design system that changes should change everything downstream of it, and the Figma node makes keeping all that work in sync much easier.

The MOSF brand designer inherits a live campaign and a node graph they can keep improving as the exhibition evolves, making it easy to iterate on the project over time.

Want to create your own installations for the fictional _Tomorrow Rehearsed_ exhibition? Try the [MOSF tool](https://www.figma.com/community/weave_tool/162/mosf-tool?q_id=888a0bea-6dfb-4a3b-86ed-6a86212ae8d1) and build out a collection of your own. Describe your object with a prompt, choose light or dark mode, and bring your ideas to life.

Visit Weave’s help center to learn more about the [Figma node](https://help.weavy.ai/en/articles/16440592-figma-node), [Gen Effect node](https://help.weavy.ai/en/articles/16118602-gen-effect-node), and how to [get started with Weave](https://help.weavy.ai/en/articles/12692387-figma-weave-faq).