---
title: "Our path to creating a precise PDF Exporter"
source: "https://www.figma.com/blog/our-path-to-creating-the-highest-quality-pdf-exporter/"
publishedDate: "2018-12-05"
category: "design"
feedName: "Figma Blog"
---

In the _ephemeral_ and changing world of digital design, PDF - a format born when software came in a box and phones had cords - remains essential. From iOS developers who import vector representations of designs to individuals who leverage its precise color handling for printing digital assets, PDF’s applications are vast. Unsurprisingly, the ability to export designs to PDF is perhaps the most requested feature here at Figma.

Today, we are excited to deliver on this request by introducing a PDF export option in Figma. We paid special attention to quality so you can rely on it to represent your work accurately to clients and stakeholders.

## [How it works](#how-it-works)

Turning your designs into a high-fidelity PDF is as simple as pushing a button. You can export a selection of layers or even an entire page.

Simply select whatever you wish (or nothing for the whole page), scroll to the bottom of the Properties Panel, pick the new PDF option, and enjoy!

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByUlEQVQ4y52Tu04bQRSG/WSpI/EEeQAqQOmR0ociPUWUJtShQjSUFhQgy1bWlm+KtfaM1+u9mb35VvzMPzBmIOYiik+ydvd88/ucM5WiyJHlOcI4gfQmEEJCykeEEBiPx4jjGGVZYrVaYb1eb5jP54iiCEEQIE1TVIqieFFImflN6XQ6Ra6+pXS5XGp4yBPhbZohUfiRLRQQlnA0GqHf72tYTImBgZ4I/SDERCH9KYRKsU1opJ7nYTab6ZTECMMwfBRKqSQa+SC5Fz7vIVNkWbb5i47j4PrmBoPBQLdiI2SBQepE4r8+MhmHwlSLxQK9Xg9HR99xsLeH09M/+humfEhoFb8jIYWNvw5297/i0+cdHP/8BXc4RGQLKbF5vjZ2Qq5J65+Lw+MTfPn2A7/PLjBUNVsTbsMIkyTZTFYEMc4bfZxUG7h0epBjTwm39PAlzGJzohSmWY5glsKPbxGo/eVArCm/npDYCbnM+rYoSnXLJuodV4qTZo8rruviLVjAHpndYx9LBQ+7vLpCrVbTh2phs9nEW7RaLX1LhmqaNnxerVZRr9fh+/69sN1u4z10Oh10u129gwY+I5SbLaiYhn4UtoLXkekovAOnAU4B5snRawAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/e824ead45ce93b8ff228198bdb004d2234b0ab9b-800x600.png?w=804&h=603&q=75&fit=max&auto=format)

Alternatively, to export all of the frames in a Figma page to a single, multi-page PDF file, choose the “Export Frames to PDF” option in the File Menu. Within the PDF file, each frame will be on its own page, ordered according to its position in Figma, from top-left working down to bottom right.

To see more details, check our our [documentation](https://help.figma.com/hc/en-us/importing-and-exporting/exporting-from-figma/export-options). For the story of its creation and some highlights showing how we honed particular elements of the exporter, read on!

## [Building the foundation](#building-the-foundation)

We pursue quality relentlessly at Figma. After poring over 1300 pages of documentation and scrutinizing existing libraries, we discovered existing tools forced us to make unacceptable compromises. So we decided to build our own PDF library from scratch. This gave us the control and precision necessary to meet the standards we strive to maintain for our users.

As a format, PDF is different from PNG because it contains a detailed description of your designs, not merely an image of them. This is how PDF text and drawings can look crisp at any zoom level - it’s fundamentally a vector format, like SVG, but much more complex. However, PDF descriptions can be hard to wrangle and optimize. Since PDF can contain embedded images alongside vector representations, this gives engineers an easy way out when things get difficult. It’s always possible to give up and rasterize on a complex effect or gradient and put in a picture of it rather than describing it precisely.

It’s exactly this compromise, to rasterize or to fight on, that we needed total control over in order to make our exporter really shine. This is especially critical for print applications when the output medium is large, or for digital applications where a variety of sizes of the same asset need to be generated. If we let some big, unsightly pixels show on your perfectly tuned work, we’d be letting you down, and we love you too much to do that!

## [Feature highlights](#feature-highlights)

With the foundational library in place, we met the challenge of representing complex design elements like shadows, blurs and gradients head on. But this is where PDF’s ambitious scope becomes a liability - no viewer supports the format completely. This is especially the case when using PDF’s sophisticated shading techniques. These attributes produce a minefield of bugs in viewers which we had to navigate. Here’s how we ensure your work comes out unscathed in the export process:

#### [Shadows](#shadows)

Drop shadows can be tricky to make look crisp and clean. The concept is simple enough: just make a stencil of the shape, fill it in and smudge out the edges. Inner shadows are sort of the inverse of this, but still very similar. This is straightforward to accomplish at the shader level in a graphics pipeline, but PDF doesn’t provide us with that level of control. So we have to synthesize the result in code.

To deliver high quality here, we finely rasterize the blurry parts region itself and make a soft mask out of it, allowing forms behind the shadow to remain sharp. We also take care to accurately clip the shadow or blur with vector methods where the blurred node’s boundary truncates the blur. This means that cracks will never appear between a blur and its parent path.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAADCElEQVQ4y32T60uTYRjG958UFPWhiPoUUUQHtSDMsuZcWXRCOmp2AI1SKtPs6FYWEZkVZR9kWVl4IqtZiR0QmnPT2dw8DHd02/usqODX827NtNOHCx7u935/7/Xc9/VqhBAkpSgJCaEQjQo8HsGbDsHd2oTedCiMjKjPlHhPol+JK8nQ/Avo8wmetQnKKwR78gR782KUlkVoeOJlcNAv+6LjwImMvwJV2XsFxsuCTVsE67IE63Ux9DlhjpU4eWn+RDAY+vnObw6ThYR+Xffde0HJcUGWPiZhAm12jMysCFt32Lh95y1DQyOTgEn9AUyeLd2CM+eEdKU6lNDsL6zRBtiw+TXXrrfgdg/+Czj5qgn7cvgeBdODMPkFfunSJ915yNB+YOc+E/WPX+D1+f5+5UgkgqokKCEha3KO9iC19wcoLvkoF/OCQ4UPuHHrKVZbH5Fo5Od4oiQZ6lnT3x+k2xqgxxaht0/Q26tgs3vp6XHgcPTLmpuODjsNDZ08bviAud2FxRKWfTHstihdXU46O99jtVoZHR1FU/9wjEtVYc5fVDAYY1yo9FNW/pzTp6swmUwMDDgZGwvxSX74Ub1ClfErhgvfMV78xpnyYQ4U3KKgoIja2ns4nQNojJdj5O5S0G3wo9P3kbG2kbQVR9Hrt3PzZrUEuuIjcDg+c+XSd7Zt+kZWZpCMVRYWLahm5oxM0lJXUVNTw/DwMJqz5z3oN3aRmmZi2fIKli7bTXp6DoWFR2hra8Pv98dnZZMjqSgbYmVKO/PmXGXG9F1MnZLC3LkLyc/fj9lsJhQKoTlZ+og1a0+QkrodrXYLeXn7MRgqaW1tldFwxwetOrR8dHH4YA2zZ+Uwfdpi5s9fgk6XTWnpSZqbm2UuhxKxqay8KiEHKSo6QnX1DenqmdyuHa/XO2H7gu7uHoqLT7E6PZPc3FyMRgONjY3jy0j2alSrTU1NclOduFxu+UsFx11NzJjqoKWlmbq6Ol69ei0X4CQQCMR7JwVbLQYCQcLh8B+pnwhUHfhkmFX9r/cHU+bpb9qI4zQAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/e51444a8d72bda71b17f8b366c2ec01c1111ed05-800x600.png?w=804&h=603&q=75&fit=max&auto=format)

#### [Gradients](#gradients)

Common gradients like the linear and elliptical types are relatively straightforward to make in PDF. In fact, the format provides shading techniques specifically for these purposes. Complex gradients on the other hand - angular types and Figma’s special diamond gradient - can be particularly tricky to recreate with precision.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAACGUlEQVQ4y62U30uTURjH94fkhV1U0C6KoJDopouKRjAaGxXJMgZGOmURtUFB3RURVFp3RkhKQbotQ9bUyjTol3aVFXWV2UzNuXfn7Afv3Kf3bMxetzYjuvjynMM553u+5/s8z7EIIVGQshiFEKYoTPNKSCkwn1ewlAalDUWYx39GNVLL6gVBIiGJxwWLi2X4KY0oWVpafbmZ1ERYXFREU+8FT0Yk0Yhg+HGSoYjG4CNJf1+aUDDDs6cZPkylmJ+XZWTFuKIwlRLMxgT9DyT+0wLfyQTnvDHONn+n0aVh26fjsC/T3pqj45rO2GiGuR/lnpoUKsKZb4I7XYLjRxJ47F8JON7i2f2a7RunWV+XZos1j21vnmNH81y5pDM5kS5YZPaxgrC7S6O9cYaLrpfcdN7Du7OHhvpxNqyLsdWaxbYnj9MOLc3LhIPZwtPV2aqEPbfjBNxfuHE4QrfrFr6GDnbVD7C57jPbrLKgUBF63Hl672YNm9YgVArbDIUXnK/odN43FPYaCl9UKGw1FD4M/YVC5WFTwcNp/I4Jw8M37NikPMyseNhkeHj1ss67yaoe/s5ysE8SOCM41ZLgfNss/hMx3Ic0DuzXcR7M4fPm6LyuMz5mZHmuRpaLdSiNGhNGrUmGo0Y9DiUZiSaJDErCoTQD4QzPR9N8+phiYWGNOix1iqYVO6UcqksU1BNrdsq/9HKtD8Lyv3+bX3+EHQ/Jzy56AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/4931fcc1e3417cb99eccb196db0fd250f4f3d10f-800x600.png?w=804&h=603&q=75&fit=max&auto=format)

The reason for this is twofold. First, the PDF feature set required to represent these is at a pretty low level, stitching together a patchwork of smaller, more simply colored regions. This is vastly superior to rasterization, but careful mathematical work is required to keep control of approximation and numerical error.

The second difficulty comes from the bugs that arise in viewers. For angular gradients in particular, PDF affords several elegant and sophisticated solutions to the problem, but only one, used in a particular way, is supported by all the major viewers (including OSX preview!) that our users depend on. This kind of delivery is only bought with sweat.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPUlEQVQ4y3WS/U9TZxTH71+2ZJnLnNmGzmkmdG7TDFEQNqiwkhAR6syI422FbKGloy0vKiKEORYD4kAiRGZdFHlrS+kL5VJu79vTnz+7bVPEzP3wzTk553s+98m5R8pms+QlhBUFQmTzsZALTOOQzEKtOFPMD9ekg+ZBowCVZcHLFyZPFnQW5/cJPt7h1WKc7VcpMnvaW2FvAsXrr2cUkQe5ujI0OWSa68J01i8TuDrPg1+WWF+KomX0/8zlgcXC4YacVJm5tUlHzRIO2wJVx2eoL5mkwzbG4He/s3g7SDqpvAEs6q1AdTdN+P48yy2/8md1O+4vXXSW9uM+P8xdxyR/j/+Dksr8HzDLa4nCLjUNfXWF/ckxYv0envcEmOua4JFrmuXbT4m9jGNoxsHeDzMkwzDIqfhDCruwTJqKmUyghUIo6yHktSipjQTp+B6Gqh9cgmmaFBm5XAqHM6ysKKyuGWxuCjZy2hCsrha0vS1QVYGmCRIJQSgk8r68d8O0ZlWePdsjGNyzahmkiQkNV49Ke4dBV7eZ10/tJk6njvO6zp07BtsxC5YUTP1h0ttr+boMurtzUaetzbqEJhlnq8zwsILU/bOgvEJwpixL2RdZSm2Cz06bvP+BztEPNVqdRv6luZf19AjOnTcps5nYzuaiwacnNd47olBSotDSoiK5u3exl8eo+DzKpbIoFWeinD2xxUfvhvn4SJgb15KsrepENnXcrl2qv9rmguW5aHnLrZnSTyIcfSfEyWNhrl9NIC15HnG/YYR7lQOMX/YxVunD8/UAzSVeGo/7Gfxxluh6CjmS4kn/X4x/O8ToJR93K/3cqvDjsvlwHPPSdGoI3w8PkdIBLzvNDhJXLpNsqCF+pYZgZTUjp6voO1XLg5tekusRjOgWcmCAeKOdmL2amOWL1NbwuLwG74kq3KXfM9XWj6SN+sjcbEJpqUVptVuxjlBjHVMXahn5poG5Xj+p0BZmLIo66mf/hoP0tTrSLXbkZjsv6u3cO2d5LzYx6/Ih6XPTeWNmsI/MkMeKbhIDbp66+pjt8vJ8csa6vR3M3R3UuRmUkd/YD7jZH/SQDniIWIe/0OnmoctPcGKafwGA+t832EVS5wAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/6276795db0e47664ed8b3a0de7576af6fc55b6f9-800x600.png?w=804&h=603&q=75&fit=max&auto=format)

## [Give PDF in Figma a spin!](#give-pdf-in-figma-a-spin)

We are excited to add the graphical power and interchange utility of PDF to the ways Figma lets you communicate your designs to the world. As always, let us know any feedback, issues, or inspired feature ideas by getting in touch via our friendly [Spectrum community.](https://spectrum.chat/figma)

The fight against rasterization is by no means over. And other optimizations and advanced options for tighter control will keep coming on into the new year. So stay tuned, and let your imagination run wild! We’re up to the challenge.