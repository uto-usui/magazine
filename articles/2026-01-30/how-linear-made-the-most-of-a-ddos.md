---
title: "How Linear made the most of a DDoS"
source: "https://www.figma.com/blog/how-linear-made-the-most-of-a-ddos/"
publishedDate: "2022-12-15"
category: "design"
feedName: "Figma Blog"
---

At least that was the case on October 13, 2022, when the [Linear](https://linear.app/) site experienced a distributed denial-of-service (DDoS) attack that took down their homepage. Thanks to some quick footwork (and bold inspiration) from the team, they turned a problem into an opportunity, creating a homepage out of Figma files, and unintentionally throwing what will surely go down in history as one of the best Figma parties of all time. We talked to the team about how it happened and what they learned.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAUBBgj/xAAiEAABBAIBBAMAAAAAAAAAAAAAAQIDBAUREgYTMVEhQXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5extKXIXI60Oub/tfCJ7KVnp9zK001W5XtdlNvbGq7RPfyY6Onr189XdcfwhXbXL+oUs1cxmJfarYaNz5ZmcHzOk5Im/KIBqQAAAAAAAP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/6fc256a4e5a6e08150d93bfa9d127817c9666b36-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Paco C.

A few days before launch, I tweeted that we'd really pushed our file to the limits. We had been exploring designs for a couple of months, and there were so many frames, so many big images. It had all our inspiration, all our iterations. It was huge. So I shared that image, [tagging Edgar](https://twitter.com/ambedgar) (a designer on the team), mostly to get him more Twitter followers. But also to give a peek at what goes behind the scenes as we were scaffolding all these new directions.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAADsElEQVQ4jWVUV0trXRTcv0cfRUEf9EFsWBELFuyx9xaN/aixx65BE7smFlTEXrCjWLEgoiL4S+Yy6/uOXLgPm51zzt4zs2bWiqqqqkJGRgbi4+ORkJCAnJwcVFRUoLi4GIWFhbLn5ubKbjab0dLSgurqalRWVsq50tJS5OfnIzU1FVFRUVD8mJWVhaSkJCQnJ8tHo9GIoqIiAeIzSUpKStDW1obW1laYTCZQCEHLy8uFOD09HTExMVD8yAtkSElJQV5enoARnAcSExPlsA5IlXV1daipqRGlRqNRvmVmZkqVikw6IEGolNL9/f1lRURECGh2drao4Xmu2tpaATaZTFI6q+FdRQYCUgVfhIWFwcvLC97e3gJMO6hAVxEXFydKCgoKBLChoUGUsuy0tLT/PKRPvEiFfn5+8PT0lIAsFgtWVlawvb2NtbU19Pb2ilofHx9ERkaKYk3TUF9fL+EQQ5GFCepJBQUFiXeDg4O4urrC19cXfn5+8P39jcvLS/ExNDRU7KANmqbJYkD0XzU1Nf3GTx+ojB5tbm7i8fERT09PeH19xcfHB56fnzEzMyPEgYGBUqKmaRIUvWSYSn+glyyBLEzQ4XBgZ2cHs7OzmJycxMHBAR4eHrC8vAxDhkEUEtBsNqOzs1P8LCsrg+rq6hJjmRoXWdg+bODV1VWMj4+LlxsbG6KQJCyPfrMSi8WCnp4esFKKUn19fXK5sbFR5PMQ02xvb8f5+bmsvb093N/f4/PzU3ycnp6G3W7H1NQUrFYriKE3vBoaGkJHR4e8oOGUz31kZESArq+vcXt7Kz6+v7/j5uYGx8fHQkSf7XY7BgYGRADLVmSgZIISjGzNzc3SZ2QcGxuD0+GUkgnEFuLvra0tLC4uwmazYXh4WO7SOkWPCNLd3S1+8DeblKZHR0cLKw9TQX9/v/Qidwohmc1mw+joKJgFbVMTExPScwTjQZbKtH19fREcHCzJEZTTxLConBWxVH1Z/6+SwSgaS8lURi94gIo4gh4eHggJCUFsbCwCAgJkkWBpaUlKnp+fBwXpgAxVMTGqIhiVkoBlcArc3d3h4uICV1dXuLm5yQzzG4O6uLjA+vo65ubmfltLANn59OBvQDLTU4PBILNN4PDwcFF+dHSEl5cXmaKzszMJic1OPxnsP4CcCk4Jd1pBX+gfm57vqYwt9Pb2hru7O5ycnGB/f1/UUsgvIAMhKIEWFhakeamWzHp/Op1OAeDEEJB/HhzJ3d1dHB4e4vT0FH8AnbACiQjkGKAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9724f4d63c43ead5730437a4db6f8320517bbca5-1277x1277.png?w=1277&h=1277&q=75&fit=max&auto=format)

Jori L.

Usually, our redesigns happen over a few late nights, but this time the crew had been working on the design for longer. Everything still came together in the last 24 hours, as always. It was worth it though; it was received well and made a nice splash online.

###### DDoS attack

A [distributed denial-of-service (DDoS)](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) attack is a malicious attempt to disrupt the normal traffic of a targeted server, service, or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic.

The next day, though, we started to get reports that the site was down. So, a bunch of us jumped on an incident call. At first, we thought it was something with the redesign, perhaps a completely benign change that had caused the site to go down. As we investigated further, we realized it was a **DDoS attack**, which are pretty common these days.

Our first priority was getting people back into the app, which we were able to do by sending people directly to the login page when they visited any of our sub-pages. There was still all this talk on social about our new landing page, but when people clicked through to our site, they weren’t seeing it. They just landed directly on our login page, which was a bit anticlimactic.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAUBBgj/xAAiEAABBAIBBAMAAAAAAAAAAAAAAQIDBAUREgYTMVEhQXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5extKXIXI60Oub/tfCJ7KVnp9zK001W5XtdlNvbGq7RPfyY6Onr189XdcfwhXbXL+oUs1cxmJfarYaNz5ZmcHzOk5Im/KIBqQAAAAAAAP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/6fc256a4e5a6e08150d93bfa9d127817c9666b36-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Paco C.

Jori messaged us and was like, “_What if we put up the design file from Figma?”_ I was like, “_Okay, yeah we can do that_.”

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAADsElEQVQ4jWVUV0trXRTcv0cfRUEf9EFsWBELFuyx9xaN/aixx65BE7smFlTEXrCjWLEgoiL4S+Yy6/uOXLgPm51zzt4zs2bWiqqqqkJGRgbi4+ORkJCAnJwcVFRUoLi4GIWFhbLn5ubKbjab0dLSgurqalRWVsq50tJS5OfnIzU1FVFRUVD8mJWVhaSkJCQnJ8tHo9GIoqIiAeIzSUpKStDW1obW1laYTCZQCEHLy8uFOD09HTExMVD8yAtkSElJQV5enoARnAcSExPlsA5IlXV1daipqRGlRqNRvmVmZkqVikw6IEGolNL9/f1lRURECGh2drao4Xmu2tpaATaZTFI6q+FdRQYCUgVfhIWFwcvLC97e3gJMO6hAVxEXFydKCgoKBLChoUGUsuy0tLT/PKRPvEiFfn5+8PT0lIAsFgtWVlawvb2NtbU19Pb2ilofHx9ERkaKYk3TUF9fL+EQQ5GFCepJBQUFiXeDg4O4urrC19cXfn5+8P39jcvLS/ExNDRU7KANmqbJYkD0XzU1Nf3GTx+ojB5tbm7i8fERT09PeH19xcfHB56fnzEzMyPEgYGBUqKmaRIUvWSYSn+glyyBLEzQ4XBgZ2cHs7OzmJycxMHBAR4eHrC8vAxDhkEUEtBsNqOzs1P8LCsrg+rq6hJjmRoXWdg+bODV1VWMj4+LlxsbG6KQJCyPfrMSi8WCnp4esFKKUn19fXK5sbFR5PMQ02xvb8f5+bmsvb093N/f4/PzU3ycnp6G3W7H1NQUrFYriKE3vBoaGkJHR4e8oOGUz31kZESArq+vcXt7Kz6+v7/j5uYGx8fHQkSf7XY7BgYGRADLVmSgZIISjGzNzc3SZ2QcGxuD0+GUkgnEFuLvra0tLC4uwmazYXh4WO7SOkWPCNLd3S1+8DeblKZHR0cLKw9TQX9/v/Qidwohmc1mw+joKJgFbVMTExPScwTjQZbKtH19fREcHCzJEZTTxLConBWxVH1Z/6+SwSgaS8lURi94gIo4gh4eHggJCUFsbCwCAgJkkWBpaUlKnp+fBwXpgAxVMTGqIhiVkoBlcArc3d3h4uICV1dXuLm5yQzzG4O6uLjA+vo65ubmfltLANn59OBvQDLTU4PBILNN4PDwcFF+dHSEl5cXmaKzszMJic1OPxnsP4CcCk4Jd1pBX+gfm57vqYwt9Pb2hru7O5ycnGB/f1/UUsgvIAMhKIEWFhakeamWzHp/Op1OAeDEEJB/HhzJ3d1dHB4e4vT0FH8AnbACiQjkGKAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9724f4d63c43ead5730437a4db6f8320517bbca5-1277x1277.png?w=1277&h=1277&q=75&fit=max&auto=format)

Jori L.

Edgar and Paco were a bit hesitant. But I said, “_Just trust me.”_

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAUBBgj/xAAiEAABBAIBBAMAAAAAAAAAAAAAAQIDBAUREgYTMVEhQXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5extKXIXI60Oub/tfCJ7KVnp9zK001W5XtdlNvbGq7RPfyY6Onr189XdcfwhXbXL+oUs1cxmJfarYaNz5ZmcHzOk5Im/KIBqQAAAAAAAP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/6fc256a4e5a6e08150d93bfa9d127817c9666b36-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Paco C.

A lot had changed in the final 24 hours before we shipped the site, and the Figma file wasn’t up to date. So, Edgar and I started updating the file to reflect the _final_ final design, then moved it into a public Figma file. While we were working on it, I shared the link with Jori, who pushed the redirect live sooner than we expected and people started streaming into the page. So as people are showing up, I’m jumping in, copying over frames from our original Figma designs and using text fields to add titles that explain our decisions and give a bit of context.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAIEBQf/xAAjEAACAgICAgEFAAAAAAAAAAABAgADBBEFBgcxYRIhMlGB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AORdV4W/nuYpwccbZz/BNbvfVF65bWi5NdzenVB+B/W5p+Gq8sdwqfGsrrCoS4c62PiT8tcyMvk2xVbbVuTYPtr6vgwOd6iSiBfoyLsZ1tx7GrsHplOiJWzL7Mm42XuXc+2PsxECvERA/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/2c4f280585d99434eeeb324529cdb8d9e51edf80-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Edgar A.

One of the first comments I added was about how, no, we don't name our layers because I knew people would notice that. They'd be like, _“Oh, Linear doesn’t name their layers.”_ But the whole point was to show how we work.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAUBBgj/xAAiEAABBAIBBAMAAAAAAAAAAAAAAQIDBAUREgYTMVEhQXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5extKXIXI60Oub/tfCJ7KVnp9zK001W5XtdlNvbGq7RPfyY6Onr189XdcfwhXbXL+oUs1cxmJfarYaNz5ZmcHzOk5Im/KIBqQAAAAAAAP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/6fc256a4e5a6e08150d93bfa9d127817c9666b36-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Paco C.

It’s true, we don't name our layers. Some things matter, some things don't. We aim for the output, not for process.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAIEBQf/xAAjEAACAgICAgEFAAAAAAAAAAABAgADBBEFBgcxYRIhMlGB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AORdV4W/nuYpwccbZz/BNbvfVF65bWi5NdzenVB+B/W5p+Gq8sdwqfGsrrCoS4c62PiT8tcyMvk2xVbbVuTYPtr6vgwOd6iSiBfoyLsZ1tx7GrsHplOiJWzL7Mm42XuXc+2PsxECvERA/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/2c4f280585d99434eeeb324529cdb8d9e51edf80-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Edgar A.

I’ve never seen a company show the design itself and let people see the styles and sizes they’re using. My biggest fear was that people would be able to access our component library or design system files. But that was a quick fix. We changed the access, and that was it. 

And I passed a thousand followers. Pretty nice for a guy that doesn't tweet.

### [Making lemonade out of a DDoS attack](#making-lemonade-out-of-a-ddos-attack)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAUBBgj/xAAiEAABBAIBBAMAAAAAAAAAAAAAAQIDBAUREgYTMVEhQXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5extKXIXI60Oub/tfCJ7KVnp9zK001W5XtdlNvbGq7RPfyY6Onr189XdcfwhXbXL+oUs1cxmJfarYaNz5ZmcHzOk5Im/KIBqQAAAAAAAP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/6fc256a4e5a6e08150d93bfa9d127817c9666b36-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Paco C.

Originally, sharing the Figma file was about making up for the DDoS and getting our users back into our redesigned homepage, but then the Figma file became its own experience. People tweeted about the “Linear Figma Party” and posted screenshots with hundreds of cursors. At one point, there were 300 people simultaneously checking out the file.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAAMBAAAAAAAAAAAAAAAAAAIEBQf/xAAjEAACAgICAgEFAAAAAAAAAAABAgADBBEFBgcxYRIhMlGB/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AORdV4W/nuYpwccbZz/BNbvfVF65bWi5NdzenVB+B/W5p+Gq8sdwqfGsrrCoS4c62PiT8tcyMvk2xVbbVuTYPtr6vgwOd6iSiBfoyLsZ1tx7GrsHplOiJWzL7Mm42XuXc+2PsxECvERA/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/2c4f280585d99434eeeb324529cdb8d9e51edf80-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Edgar A.

Since the file was view-only, people couldn’t edit it, so they started using cursor chat to ask questions and chat with me. I began writing down their questions along with my answers. We realized that there was an opportunity to do a live Q&A in the file, to really give people the peek behind the scenes we initially intended. In hindsight, that was a good decision, because even as we speak, there are four people in the file who can still read through the archive. Everything's preserved.

The Q&A also gave us a good opportunity to add some context. People asked how we arrived at one version over another, so we dropped in variations that we explored but didn't end up using. Our CEO, Karri, jumped in and pointed out what stuff he liked or which directions we might explore in the future.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAUBBgj/xAAiEAABBAIBBAMAAAAAAAAAAAAAAQIDBAUREgYTMVEhQXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5extKXIXI60Oub/tfCJ7KVnp9zK001W5XtdlNvbGq7RPfyY6Onr189XdcfwhXbXL+oUs1cxmJfarYaNz5ZmcHzOk5Im/KIBqQAAAAAAAP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/6fc256a4e5a6e08150d93bfa9d127817c9666b36-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Paco C.

Quite a few questions were around the design process, particularly the team behind it. People were surprised to discover that our web team is just three of us: Julian, Edgar, and me. Julian works on the narrative and structure, Edgar does design, and I help bring everything together into code. Small teams do great work. That’s a core theme at Linear. We’re a small company with thirty employees, but the output is wild for the scale that we’re operating. 

I spent two and a half hours chatting with people. There were some people that stayed in that file for an hour and a half, two hours reading what we wrote, exploring the file, and trying to implement some of the designs themselves in separate files.

### [Doing away with the fluff](#doing-away-with-the-fluff)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAADsElEQVQ4jWVUV0trXRTcv0cfRUEf9EFsWBELFuyx9xaN/aixx65BE7smFlTEXrCjWLEgoiL4S+Yy6/uOXLgPm51zzt4zs2bWiqqqqkJGRgbi4+ORkJCAnJwcVFRUoLi4GIWFhbLn5ubKbjab0dLSgurqalRWVsq50tJS5OfnIzU1FVFRUVD8mJWVhaSkJCQnJ8tHo9GIoqIiAeIzSUpKStDW1obW1laYTCZQCEHLy8uFOD09HTExMVD8yAtkSElJQV5enoARnAcSExPlsA5IlXV1daipqRGlRqNRvmVmZkqVikw6IEGolNL9/f1lRURECGh2drao4Xmu2tpaATaZTFI6q+FdRQYCUgVfhIWFwcvLC97e3gJMO6hAVxEXFydKCgoKBLChoUGUsuy0tLT/PKRPvEiFfn5+8PT0lIAsFgtWVlawvb2NtbU19Pb2ilofHx9ERkaKYk3TUF9fL+EQQ5GFCepJBQUFiXeDg4O4urrC19cXfn5+8P39jcvLS/ExNDRU7KANmqbJYkD0XzU1Nf3GTx+ojB5tbm7i8fERT09PeH19xcfHB56fnzEzMyPEgYGBUqKmaRIUvWSYSn+glyyBLEzQ4XBgZ2cHs7OzmJycxMHBAR4eHrC8vAxDhkEUEtBsNqOzs1P8LCsrg+rq6hJjmRoXWdg+bODV1VWMj4+LlxsbG6KQJCyPfrMSi8WCnp4esFKKUn19fXK5sbFR5PMQ02xvb8f5+bmsvb093N/f4/PzU3ycnp6G3W7H1NQUrFYriKE3vBoaGkJHR4e8oOGUz31kZESArq+vcXt7Kz6+v7/j5uYGx8fHQkSf7XY7BgYGRADLVmSgZIISjGzNzc3SZ2QcGxuD0+GUkgnEFuLvra0tLC4uwmazYXh4WO7SOkWPCNLd3S1+8DeblKZHR0cLKw9TQX9/v/Qidwohmc1mw+joKJgFbVMTExPScwTjQZbKtH19fREcHCzJEZTTxLConBWxVH1Z/6+SwSgaS8lURi94gIo4gh4eHggJCUFsbCwCAgJkkWBpaUlKnp+fBwXpgAxVMTGqIhiVkoBlcArc3d3h4uICV1dXuLm5yQzzG4O6uLjA+vo65ubmfltLANn59OBvQDLTU4PBILNN4PDwcFF+dHSEl5cXmaKzszMJic1OPxnsP4CcCk4Jd1pBX+gfm57vqYwt9Pb2hru7O5ycnGB/f1/UUsgvIAMhKIEWFhakeamWzHp/Op1OAeDEEJB/HhzJ3d1dHB4e4vT0FH8AnbACiQjkGKAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9724f4d63c43ead5730437a4db6f8320517bbca5-1277x1277.png?w=1277&h=1277&q=75&fit=max&auto=format)

Jori L.

People were very understanding. Overall, the sentiment was that DDoS attacks suck but are a reality. And, of course, we responded correctly. In the future, we will be able to react much faster. Returning service for our users was and continues to be the most important thing for us. Linear is key to many of their workflows. But beyond that, we want to be transparent and open to building trust with our community. They’ll better understand what we’re going through and can be sympathetic instead of getting some marketing fluff.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAQHAgUG/8QAJhAAAQQBAgQHAAAAAAAAAAAAAQACAwQGBREHEjFBExQhI1Fhcf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC5+MOfPwjSq5qQCa9acWxB3QfZVaYZxXzGxktGrq2n89WzIIz7RZtv3BVoZ5i1bXcj0a3qYPlaj9292l3w5be9BHNLQYWxEtmBHKwD0CDpgdwCiIgwnhjnidHK0OYeoKi1dMrVpvEjYS8DYFx32/ERBNREQf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/0a1a13491d2845eb2b598c60a9adaec251f17cb2-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Julian L.

What stood out to me was that the file and the Q&A were very raw. If we had a PR person on our team, 90% of these things would probably not be published because there would be someone telling us: “_No, we can’t say that. We need to rephrase this.”_ What I like about this is that it’s the truth. It’s what happened. Ironically, I saw a couple of comments from people who thought we faked a DDoS attack as an excuse to share our Figma file. It turned out so well that they thought we planned the whole thing as a marketing stunt.

> Ironically, I saw a couple of comments from people who thought we faked a DDoS attack as an excuse to share our Figma file. It turned out so well that they thought we planned the whole thing as a marketing stunt.

Julian Lehr, Writer, Linear

### [Distributing the load, globally](#distributing-the-load-globally)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAADsElEQVQ4jWVUV0trXRTcv0cfRUEf9EFsWBELFuyx9xaN/aixx65BE7smFlTEXrCjWLEgoiL4S+Yy6/uOXLgPm51zzt4zs2bWiqqqqkJGRgbi4+ORkJCAnJwcVFRUoLi4GIWFhbLn5ubKbjab0dLSgurqalRWVsq50tJS5OfnIzU1FVFRUVD8mJWVhaSkJCQnJ8tHo9GIoqIiAeIzSUpKStDW1obW1laYTCZQCEHLy8uFOD09HTExMVD8yAtkSElJQV5enoARnAcSExPlsA5IlXV1daipqRGlRqNRvmVmZkqVikw6IEGolNL9/f1lRURECGh2drao4Xmu2tpaATaZTFI6q+FdRQYCUgVfhIWFwcvLC97e3gJMO6hAVxEXFydKCgoKBLChoUGUsuy0tLT/PKRPvEiFfn5+8PT0lIAsFgtWVlawvb2NtbU19Pb2ilofHx9ERkaKYk3TUF9fL+EQQ5GFCepJBQUFiXeDg4O4urrC19cXfn5+8P39jcvLS/ExNDRU7KANmqbJYkD0XzU1Nf3GTx+ojB5tbm7i8fERT09PeH19xcfHB56fnzEzMyPEgYGBUqKmaRIUvWSYSn+glyyBLEzQ4XBgZ2cHs7OzmJycxMHBAR4eHrC8vAxDhkEUEtBsNqOzs1P8LCsrg+rq6hJjmRoXWdg+bODV1VWMj4+LlxsbG6KQJCyPfrMSi8WCnp4esFKKUn19fXK5sbFR5PMQ02xvb8f5+bmsvb093N/f4/PzU3ycnp6G3W7H1NQUrFYriKE3vBoaGkJHR4e8oOGUz31kZESArq+vcXt7Kz6+v7/j5uYGx8fHQkSf7XY7BgYGRADLVmSgZIISjGzNzc3SZ2QcGxuD0+GUkgnEFuLvra0tLC4uwmazYXh4WO7SOkWPCNLd3S1+8DeblKZHR0cLKw9TQX9/v/Qidwohmc1mw+joKJgFbVMTExPScwTjQZbKtH19fREcHCzJEZTTxLConBWxVH1Z/6+SwSgaS8lURi94gIo4gh4eHggJCUFsbCwCAgJkkWBpaUlKnp+fBwXpgAxVMTGqIhiVkoBlcArc3d3h4uICV1dXuLm5yQzzG4O6uLjA+vo65ubmfltLANn59OBvQDLTU4PBILNN4PDwcFF+dHSEl5cXmaKzszMJic1OPxnsP4CcCk4Jd1pBX+gfm57vqYwt9Pb2hru7O5ycnGB/f1/UUsgvIAMhKIEWFhakeamWzHp/Op1OAeDEEJB/HhzJ3d1dHB4e4vT0FH8AnbACiQjkGKAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9724f4d63c43ead5730437a4db6f8320517bbca5-1277x1277.png?w=1277&h=1277&q=75&fit=max&auto=format)

Jori L.

Our team is mainly distributed across European and US time zones, so our US engineers mitigated the attack until midnight when Europe came online. Then the next shift picked it up and fortified it further. It wasn’t as critical at that point because we had gotten everyone who needed to back into the app.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAUBBgj/xAAiEAABBAIBBAMAAAAAAAAAAAAAAQIDBAUREgYTMVEhQXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5extKXIXI60Oub/tfCJ7KVnp9zK001W5XtdlNvbGq7RPfyY6Onr189XdcfwhXbXL+oUs1cxmJfarYaNz5ZmcHzOk5Im/KIBqQAAAAAAAP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/6fc256a4e5a6e08150d93bfa9d127817c9666b36-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Paco C.

We got lucky on the timing. It happened late Eastern time or end of the day Pacific time, so people were already logging off from work, and we didn’t disrupt too much of people’s workday. It was almost an after-work party. Once we set up our bad actor firewall nets, huge traffic spikes started normalizing automatically, which gave the rest of the Linear team time to check out the Figma file, too. By the end of the party, we had restored service to everything except the homepage, which we kept redirecting to the Figma file because it was more fun.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAQHAgUG/8QAJhAAAQQBAgQHAAAAAAAAAAAAAQACAwQGBREHEjFBExQhI1Fhcf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC5+MOfPwjSq5qQCa9acWxB3QfZVaYZxXzGxktGrq2n89WzIIz7RZtv3BVoZ5i1bXcj0a3qYPlaj9292l3w5be9BHNLQYWxEtmBHKwD0CDpgdwCiIgwnhjnidHK0OYeoKi1dMrVpvEjYS8DYFx32/ERBNREQf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/0a1a13491d2845eb2b598c60a9adaec251f17cb2-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Julian L.

I missed the whole thing. I'm based in Berlin, so the outage happened at around 11:00 pm my time. The good thing is that, in true Berlin fashion, the party was still going when I woke up at 7:00 am. There were 80 or 90 people still in the file. So I had a chance to catch up on everything.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQADAAAAAAAAAAAAAAAAAAUBBgj/xAAiEAABBAIBBAMAAAAAAAAAAAAAAQIDBAUREgYTMVEhQXH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A5extKXIXI60Oub/tfCJ7KVnp9zK001W5XtdlNvbGq7RPfyY6Onr189XdcfwhXbXL+oUs1cxmJfarYaNz5ZmcHzOk5Im/KIBqQAAAAAAAP//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/6fc256a4e5a6e08150d93bfa9d127817c9666b36-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Paco C.

I was surprised. I thought we’d see a huge spike of people and then go back down, but it persisted for days, too, not just hours. I’m still waking up to new notifications from the Figma file.

### [Inspiring the next iteration](#inspiring-the-next-iteration)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAADsElEQVQ4jWVUV0trXRTcv0cfRUEf9EFsWBELFuyx9xaN/aixx65BE7smFlTEXrCjWLEgoiL4S+Yy6/uOXLgPm51zzt4zs2bWiqqqqkJGRgbi4+ORkJCAnJwcVFRUoLi4GIWFhbLn5ubKbjab0dLSgurqalRWVsq50tJS5OfnIzU1FVFRUVD8mJWVhaSkJCQnJ8tHo9GIoqIiAeIzSUpKStDW1obW1laYTCZQCEHLy8uFOD09HTExMVD8yAtkSElJQV5enoARnAcSExPlsA5IlXV1daipqRGlRqNRvmVmZkqVikw6IEGolNL9/f1lRURECGh2drao4Xmu2tpaATaZTFI6q+FdRQYCUgVfhIWFwcvLC97e3gJMO6hAVxEXFydKCgoKBLChoUGUsuy0tLT/PKRPvEiFfn5+8PT0lIAsFgtWVlawvb2NtbU19Pb2ilofHx9ERkaKYk3TUF9fL+EQQ5GFCepJBQUFiXeDg4O4urrC19cXfn5+8P39jcvLS/ExNDRU7KANmqbJYkD0XzU1Nf3GTx+ojB5tbm7i8fERT09PeH19xcfHB56fnzEzMyPEgYGBUqKmaRIUvWSYSn+glyyBLEzQ4XBgZ2cHs7OzmJycxMHBAR4eHrC8vAxDhkEUEtBsNqOzs1P8LCsrg+rq6hJjmRoXWdg+bODV1VWMj4+LlxsbG6KQJCyPfrMSi8WCnp4esFKKUn19fXK5sbFR5PMQ02xvb8f5+bmsvb093N/f4/PzU3ycnp6G3W7H1NQUrFYriKE3vBoaGkJHR4e8oOGUz31kZESArq+vcXt7Kz6+v7/j5uYGx8fHQkSf7XY7BgYGRADLVmSgZIISjGzNzc3SZ2QcGxuD0+GUkgnEFuLvra0tLC4uwmazYXh4WO7SOkWPCNLd3S1+8DeblKZHR0cLKw9TQX9/v/Qidwohmc1mw+joKJgFbVMTExPScwTjQZbKtH19fREcHCzJEZTTxLConBWxVH1Z/6+SwSgaS8lURi94gIo4gh4eHggJCUFsbCwCAgJkkWBpaUlKnp+fBwXpgAxVMTGqIhiVkoBlcArc3d3h4uICV1dXuLm5yQzzG4O6uLjA+vo65ubmfltLANn59OBvQDLTU4PBILNN4PDwcFF+dHSEl5cXmaKzszMJic1OPxnsP4CcCk4Jd1pBX+gfm57vqYwt9Pb2hru7O5ycnGB/f1/UUsgvIAMhKIEWFhakeamWzHp/Op1OAeDEEJB/HhzJ3d1dHB4e4vT0FH8AnbACiQjkGKAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9724f4d63c43ead5730437a4db6f8320517bbca5-1277x1277.png?w=1277&h=1277&q=75&fit=max&auto=format)

Jori L.

We are very open about how we think and build products at Linear. We like to build together with our community and that’s something we’ve done since day one. We were putting out changelogs before Linear was even open to the public. We’ve tried to share for the builders, especially on the engineering front, but haven’t really found a way to do that for designers until now. 

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAQHAgUG/8QAJhAAAQQBAgQHAAAAAAAAAAAAAQACAwQGBREHEjFBExQhI1Fhcf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC5+MOfPwjSq5qQCa9acWxB3QfZVaYZxXzGxktGrq2n89WzIIz7RZtv3BVoZ5i1bXcj0a3qYPlaj9292l3w5be9BHNLQYWxEtmBHKwD0CDpgdwCiIgwnhjnidHK0OYeoKi1dMrVpvEjYS8DYFx32/ERBNREQf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/0a1a13491d2845eb2b598c60a9adaec251f17cb2-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Julian L.

We had a discussion a couple of days later about how interesting the whole thing was and how we could continue it. What would be the next step? Why was it so much more interesting than our actual website? When redesigning our homepage, we spent a lot of time thinking about how to build a website that hadn’t been done before, something that was new or novel in some way.

What I felt was interesting is that this wasn’t just using our website; it was browsing it with a hundred other people simultaneously. Why doesn’t the browser work like this? So for me, it’s been a source of inspiration. How can we build collaboration into the website? Maybe our next website shouldn’t be a website, but a Figma file. Why do you have to scroll and click? Why can’t I move in two or three dimensions to explore a website? What inspiration can we take from this?

> What I felt was interesting is that this wasn’t just using our website; it was browsing it with a hundred other people simultaneously.

Julian Lehr, Writer, Linear

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAADsElEQVQ4jWVUV0trXRTcv0cfRUEf9EFsWBELFuyx9xaN/aixx65BE7smFlTEXrCjWLEgoiL4S+Yy6/uOXLgPm51zzt4zs2bWiqqqqkJGRgbi4+ORkJCAnJwcVFRUoLi4GIWFhbLn5ubKbjab0dLSgurqalRWVsq50tJS5OfnIzU1FVFRUVD8mJWVhaSkJCQnJ8tHo9GIoqIiAeIzSUpKStDW1obW1laYTCZQCEHLy8uFOD09HTExMVD8yAtkSElJQV5enoARnAcSExPlsA5IlXV1daipqRGlRqNRvmVmZkqVikw6IEGolNL9/f1lRURECGh2drao4Xmu2tpaATaZTFI6q+FdRQYCUgVfhIWFwcvLC97e3gJMO6hAVxEXFydKCgoKBLChoUGUsuy0tLT/PKRPvEiFfn5+8PT0lIAsFgtWVlawvb2NtbU19Pb2ilofHx9ERkaKYk3TUF9fL+EQQ5GFCepJBQUFiXeDg4O4urrC19cXfn5+8P39jcvLS/ExNDRU7KANmqbJYkD0XzU1Nf3GTx+ojB5tbm7i8fERT09PeH19xcfHB56fnzEzMyPEgYGBUqKmaRIUvWSYSn+glyyBLEzQ4XBgZ2cHs7OzmJycxMHBAR4eHrC8vAxDhkEUEtBsNqOzs1P8LCsrg+rq6hJjmRoXWdg+bODV1VWMj4+LlxsbG6KQJCyPfrMSi8WCnp4esFKKUn19fXK5sbFR5PMQ02xvb8f5+bmsvb093N/f4/PzU3ycnp6G3W7H1NQUrFYriKE3vBoaGkJHR4e8oOGUz31kZESArq+vcXt7Kz6+v7/j5uYGx8fHQkSf7XY7BgYGRADLVmSgZIISjGzNzc3SZ2QcGxuD0+GUkgnEFuLvra0tLC4uwmazYXh4WO7SOkWPCNLd3S1+8DeblKZHR0cLKw9TQX9/v/Qidwohmc1mw+joKJgFbVMTExPScwTjQZbKtH19fREcHCzJEZTTxLConBWxVH1Z/6+SwSgaS8lURi94gIo4gh4eHggJCUFsbCwCAgJkkWBpaUlKnp+fBwXpgAxVMTGqIhiVkoBlcArc3d3h4uICV1dXuLm5yQzzG4O6uLjA+vo65ubmfltLANn59OBvQDLTU4PBILNN4PDwcFF+dHSEl5cXmaKzszMJic1OPxnsP4CcCk4Jd1pBX+gfm57vqYwt9Pb2hru7O5ycnGB/f1/UUsgvIAMhKIEWFhakeamWzHp/Op1OAeDEEJB/HhzJ3d1dHB4e4vT0FH8AnbACiQjkGKAAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/9724f4d63c43ead5730437a4db6f8320517bbca5-1277x1277.png?w=1277&h=1277&q=75&fit=max&auto=format)

Jori L.

We want to have fun while we build software. That's why we got into this game in the first place. At Linear, we try to make a company where we can have fun as well. We shouldn’t take ourselves too seriously. Great creative work doesn’t usually happen under pressure or deadlines. These things don't happen unless people are passionate about what they do and they can think on their feet. I don’t know if we’d do it again, though. We’ll do something new. We can’t be too predictable.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAMFBgj/xAAiEAACAQIFBQAAAAAAAAAAAAABAgADEQQFBhIxEyFRYaH/xAAWAQEBAQAAAAAAAAAAAAAAAAABAAT/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AM46fy0ZjimRyQqrc2Iv9kvjNO06NCsVrt1EXcAQO8q6MysCrEH0Y9qrlhd248zXICDuvxCDk7uYRuLX/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/50cd8b4a94a002bcc9f9949c29a5eda0a210dfb0-1200x630.jpg?w=1200&h=630&q=75&fit=max&auto=format)

###### Linear's Polishing Season 2022 ✨

Instead of new feature work, the team dedicated the rest of their year to quality work: fixing bugs, improving performance, removing paper cuts.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAIDAAAAAAAAAAAAAAAAAAQHAgUG/8QAJhAAAQQBAgQHAAAAAAAAAAAAAQACAwQGBREHEjFBExQhI1Fhcf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC5+MOfPwjSq5qQCa9acWxB3QfZVaYZxXzGxktGrq2n89WzIIz7RZtv3BVoZ5i1bXcj0a3qYPlaj9292l3w5be9BHNLQYWxEtmBHKwD0CDpgdwCiIgwnhjnidHK0OYeoKi1dMrVpvEjYS8DYFx32/ERBNREQf/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/0a1a13491d2845eb2b598c60a9adaec251f17cb2-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Julian L.

This month, we [announced](https://twitter.com/linear/status/1598348906584211458) “Polishing Season 2022,” giving our community a live look as we work through our backlog, tackling fixes to lingering bugs, performance issues, and so on. Inspired by making a Figma homepage, we wanted to collaborate with our community more directly, so we invited our users to submit requests and to [watch in real-time as our team addresses them](https://linear.app/changelog/polishing/2022).

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAACXBIWXMAABYlAAAWJQFJUiTwAAACpElEQVQ4jY3PS0hUURyA8bvMW5K9DIS5M/cx4zzuOA+LokwdCylKMewxVgsJ0iIzITDCUGaytKJdtCipiKyFU5phjgaWj6zILKNVOzctemyipy2+OHfsMVDQ4sf/nAv3O+dIo8lvjA3MIObwnc/c7/vIvf90v+8TI/1f+LMh/dwMdr/n4rnHnG7tpj2WoD2eSM1Y118kaIt1ceZEL50dLxi6/SE9KCSuvKJ+Xzul6yopiZSztqSCkuJyIsVlvxQXlVFUuImiwo2sKdjA+tLtHG3soK/rNWMD31PBkdng1Y4pqrbV4/eHyQuECYWXkxfMx58X+sX0B/F4/bg9Jq5cL8HgSvbXnqDn+jRjgzOMJL8iPUjOIHRemCK6pQ6fL2j9HLBiQXxmII0ICrluL6HQSupq2+i9Ns34wHfGkjNIPf1vEc6ef0BFZQ1Olw/dcOF0utANJ5puoGn6LLE2rG+qqmH6w+ze08Klay+5lXxHT/8bpOqhOwiVl8+Tv7USh4ioGrluNx6PB5fLhcPhQFEUFMWOYndgt4u9Hd1nUrC3hmiik+p7/VZHyn5yiuwnJ1na1UhO1ToUQ0fXdEzTJBAI4PV6cahqWtCKirXpJqd+M0uTzWRPpDrSnMkYwtybB1myM4LiFM9RMQwDwymerGMXN7TbrZtZHKo1bX43ixrKkO82Mud53OpI8uQxhMwbDWTvLEHNdeE0nFZM1XRU9S80caiOkudlcUM58wYPIz9LdSR5Mk7GZJx5tw+x6MBGbJFlaIXLUIuWoxTkY1sdxrY6lK4gjG1ViJzSFSxs2cbcoSNkWMH476A83ETmpVqy2nawoDXKguNVZLVG/+1YlPmndpF5vQ55vDk9aJmIIT9sRh5tImOkCfl/jB5FftSC/DQ+++Q4PwCOsjRBeDXdEgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/53669c3928f972a744dc372b972b05ff54f75d9b-1500x960.png?w=1500&h=960&q=75&fit=max&auto=format)

Plugin plug: If you use Linear, check out their [Figma plugin](https://linear.app/integrations/figma)!