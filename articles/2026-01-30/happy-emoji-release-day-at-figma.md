---
title: "Happy Emoji Release Day at Figma 🎉"
source: "https://www.figma.com/blog/happy-emoji-release-day-at-figma/"
publishedDate: "2017-08-10"
category: "design"
feedName: "Figma Blog"
---

Happy emoji release day! 🎉 We’re excited to announce that your favorite pictorial minions now work in Figma. Since our public launch in September we have received a ton of requests for emoji support, to the point where some teams even left Figma in protest (I kid you not).

It actually took us awhile to figure out teams were churning due to lack of emoji support. Much like seeing the 1 star Emoji Movie in theaters, few would confess to this openly and admit how much those tiny yellow faces mean to them.

We understand the sentiment — it’s 2017 and emojis are no longer optional. They’re the visual language of the digital world, employed to express tone, emotion and nuance across both consumer and enterprise products.

> It’s easy to add emojis in Figma. If you’re working on Mac, hit control+command+spacebar. On Windows, open the touch keyboard and click on the smiley face emoji icon.

People building interfaces in Figma need emoji support to get a realistic sense of how their designs will function in the wild. Advertising copy is more relatable with cute smidgens of 😉 or an impish dash of 😜. Texts, tweets and emails would be incomplete without healthy sprinklings of 💃 and 🎉. As Arnold from “Master of None” so eloquently phrased it, “I want kissy or I want red hearts only.”

So, why did it take us so long to introduce emoji functionality in Figma? When it comes to implementation, these fanciful creatures are tricky buggers, prone to mistranslation across operating systems. The standard emoji sets are owned by the Facebooks, Apples and Googles of the world.

If you’re curious about the underlying systems that power these ubiquitous pictograms — and how Figma built our emoji system — then this post is for you.

## [The history of the glyph](#the-history-of-the-glyph)

Emojis are glyphs with pizazz. In 1999 they burst into being after an employee at a Japanese mobile phone operator realized the limitations of text. He created 176 characters to help communicate emotion, and the idea took off. Phone carriers watched jealously as emojis spread and soon began building their own versions to compete.

Over the years, communication chaos grew as different carriers failed to render other carriers’ emoji sets accurately. In 2009, the Unicode Consortium stepped in to clean up the mess. For the uninitiated, that’s a non-profit coalition of tech companies and other individuals who release an international set of guidelines for representing text. It provides unique code identifiers for every character of every major language, dead or alive.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIABQDASIAAhEBAxEB/8QAFwABAAMAAAAAAAAAAAAAAAAAAAIDCP/EACAQAAIBAQkAAAAAAAAAAAAAAAACAQMEERMiMUFSYXH/xAAVAQEBAAAAAAAAAAAAAAAAAAACAP/EABcRAQEBAQAAAAAAAAAAAAAAAAARAUH/2gAMAwEAAhEDEQA/ANF471plIdmfjGxalG0+L3qAEuJLTa7MszIAFFdf/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/d6a19e023f8c0e34d13a9918d31d6a880cdbf471-800x325.jpg?rect=1,0,799,325&w=804&h=327&q=75&fit=max&auto=format)

The Original Emoji, by Shigetaka Kurita (credit MoMA)  
When the Unicode standards committee acknowledged emojis as a pictorial language, they created design guidelines for how to draw them, as well as code that maps to specific emoji. For example, U+1F355, the most beloved of all emojis, is “pizza.” 🍕🍕🍕

As long as applications and operating systems follow the general Unicode guidelines, they’re free to use artistic license to interpret the emoji’s appearance. Thus, Facebook pizza looks different from Twitter pizza, which diverges from iOS pizza, which is a far cry from the renderings of LG, Samsung…you get the point.

Maybe you’ve lived through this struggle: you think you’re sending your Tinder crush a sheepish grimace via iOS, but on their Android device it morphs into a serial killer. Who knows how many hapless victims were ghosted due to an emoji’s cross-platform identity crisis.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAIAAAA7N+mxAAAACXBIWXMAAAsSAAALEgHS3X78AAACXUlEQVQozyWSyU8TYRjG519xCRFDokLChaAX4xaDUSPGYEwQFbRuJ8UALsQoFwhoFYKxjahpBRUE0pZYakKxtGCnVEopdIEW2g6UznSZaWf5vvdz1OfwXn75vZfnoYgarIDI4UwYpxZwOgACQ1CREPiL1IuLIMWB/w25Wch7QFwjiCcEqYz6a/JxnJjCq8M4MoQiX1DMgtkAUQoEMFG4YsqR8nen6Zv8/CXO07i50JFPWLG4qfoUFLZwzCT7u6VAjxzql1Zey/4uFHwPmSCROWBtjOv29zdV5pd73AM7bX0lY9rKZWu9xIyAkqZwyoN8TwVXw7bjGuvUbDuuZ2euKPRdHBsDjsbhRwlL+WBHyYsH5R86Kl+1VvS37fUPlslLtyDnplDULM1e3bYei4yfXDOdiozVxC3HBftpZbkXM+Oity48XDqsPdLfpdFp7/d13vnYfXbesI93nQDGSCmxicx0w8porXf8nm/isdfU4vtWz0yckQKqPMo6a6d0FQbtxSF969eBJ590bYY+jbn34Ib1KI7rKJT2pefaF0cb3KaWeetzt6WdHrmxMakRoyZgnRytoQ37p/SVc8ZDnsHqX8bq6YGqmXcHkvYLKGWmsMgJUUvS2Ryz1607zsXs5zfsTRn/WyW7SsSkvK7Pumq4H2XZyd25yR052y7OVpr5ebgY7oRCmCKAUGFLTNqEYI8QeCisPCtEP8uZECCRgAyFCGaMONyGA0148TJeasTBZpzQA7+o9k/9GwICmUd8XMmGlPwaEllACvkfUEBm1ReQX4AcDXkvCCGQUgRLKvwDX8jU+ZvsjVQAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/265fb735d3b67a3e02dfd689157f6a41e24afd6c-600x298.png?w=804&h=399&q=75&fit=max&auto=format)

Sheepish grimace or serial killer?

## [The Figma way](#the-figma-way)

This kind of mistranslation is a disaster in communication or collaboration applications like Figma. We work cross-platform, so we need to make sure that designers jumping into a file on Windows are seeing the same designs as their fellow colleagues using Macs. Allowing browsers to render emojis with their own operating system library just wasn’t an option.

When researching how we could implement emojis, we looked to other companies for inspiration. Slack in particular found a creative workaround for the problem. They decided to make Apple’s emojis their product standard and built a massive PNG file of Apple emojis that Slack hosts itself. The Slack app downloads the PNG file to have on hand. Then, whenever a user calls for an emoji Slack only presents the relevant section of the image. With this method, inserting emoji is very fast. However, this is at the expense of color quality and it’s not possible to render these emoji at larger sizes.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsSAAALEgHS3X78AAAFYklEQVQ4yw3SZ5Pi5gEAYP08J/6SscfOnu0tR1lAgBpIqKDeX+lVQxIgmujswm27u5mcPYmdySSTT/lNub/wzIOs7Vv82adgabLJyBDdNRwaLwEGPzq92d8yePznh/T0v4+9yeu8F/kwBgEM3dhSQMAT5pSrGFul4ubDegjISpDhNzKy1Vv8q1LLLsr9eKb37alBG2ulHm5lcvkSw/0fp3D17x2RvwSos/Q1bRLZvq9xvkOj9oip+IXwPs25mzzBrv2kds0h29TLX22i/OxWp+eAdLcuZazlu7CQ0MUqBuvzwpteAjTdi1Vz79LiMjZgqCrQpwkvYqtZIt4UKf/zOO3+bMf31yTyOJ9//gD105OH55eEss8xqT847/1SbU4X0FotYn2yMlpFKTTjvd3X554KElH2YxqHAXszieV382x4lSfET9qIuOsgB7/84+jC49kfJGfYNx9gW9rpP1lLvhEvNSOZ22K41NDZcoCOS65jTUVSjxhS8/stE7A30VR9N9vp7yYp/YtiNW9RZD1cfX40vd3HkCrOHgZPsK0e7Wt7OayDiaKZU5N3C6kxy4jmZNlrWjO2oQKipVhkU4+ktnsA98nZvs5G5I1hvK9iyCPIylfgbD/5ZHGyasbWabBb/dYoxAZIXdsf+1pWaOg0phvBkkel+bApmhgqWRiqJENCn9ukOZPuPR+tWPpdg0AeV+P109w7vI2F/AJJ/uDh2Fq9lUq95S0iK1lE2qSEZD7SO14hN6SF2BQh25fcAa2GAqYHYle38aar1OuOUEdxZJVtvuxL+HwpreJpahkvU4U+g3vu0W6aW8iahdtTFrALcpeKJjpuzFVCThVeAkNG84S25QstU8UagG81LaaLd5A1OP7rmIcvX3ss9rkFTtlgeHTv2IN+q8zNrjbScXbld505oNNcZc1cYpRUplUodEx3UHct+t6SyKYj4KjOY50W8sF5ePs1AeXfC3F0TFhtFpKDudcUSrNiFybh57ZobWAPLm0c5iolpUpPCkVcjcS2E/NtzyTrDtd+7yhY3fSpWht51k6P/3H47L9hzfngt5mx1ydil5DmVitYO4NobslOaRHO2qjIe/+2v3CqXCA25XCI2onQ9Vyq4sqNK+drGTchKgQyY4rHzxyefDFulIvbpY5Rj974qL2y6qMN6AdrV7A2Nmaf7F/01+gvQmn8wIdCTY5V3B5JHRDT18BFfwB6/RZ4ZJNCzJ6W5xLlHAAmPsIe85z0xAtARyu5Ot0CJnia6OA5J6NTWM8eglu/kG+liGuLI+2rp9x1ZuyVF1M/+jrRcCyOIhHPM6I0MoJ9LGkHvz/YOF2lHFbHY7pa7AI5/G1vwN9W6OSU4Lulh08Ssa1BmpIg2zNHXM3Z8N+BnP3RV2jUUDmqg0QpzLcZ2D8FUrR1aXZpdYYnveadLCK4zGDwj5MZ/r5s5JeUmK4h5WUqMfQ5ZugymDHiK8ZB+s4qBt8HOlaTTLp7hUSe5m784fni0fMNZJTSw7knv6W/TIbgWCbxx9JMv+St6BxQysYdUJnRo6HISC7TsYJBRdlKV+qK+WvqNe9Up3v/LVJ6irT0+tNDTGT7Ma8fRn1uD5rqLGDCLAOT81ROf00qzovboRYqXYdDrOtzpOD3MQswLWkqN9gJXY2cWkUzO7U/I2+e5qy9nruM29ZuTCuPox63sxrGVOvNish7eFuZs98nFect6Pa3JtssBBSfMB0pITrA7XWUQOjSkGkDHWtJZq/xDXLmyXDCN61IryuLEBd3boNfC1VnrUnrw7T49GkHt5/SWljatL4w9X6pUoM5j+oR3vBNrK4B9p4NFNzVOEqQifqf/g8GpUZIkl/oSQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/46eb444ecdf54dd9333c529eaf18cb37112c26db-800x800.png?w=804&h=804&q=75&fit=max&auto=format)

Grainy emojis don’t matter much for Slack’s chat screens (you barely notice it), but we quickly realized that method wouldn’t work for Figma. Our users are designers — a discerning visual audience if there ever was one. Low-res anything would drive them crazy and degrade their design process, so we needed a different tactic.

We decided to use 64x64 full color PNGs for each individual emoji (compared to Slack’s all-in-one image). There is a slight delay the first time you add a specific emoji, but we cache it so that subsequent uses are fast. This lets you keep a version handy that will be higher-res than if it had been pulled from one mammoth PNG and also helps make Figma more memory efficient.

💁  
And that’s a wrap! We’re thrilled to be releasing this fun new feature for the Figma family.

As a parting note: we love listening to user’s needs, incorporating those suggestions and making the lives of designers a little more colorful. So, please keep sending recommendations our way on how to make Figma a better design tool.

Happy 👩‍💻 🤓 👾!