---
title: "The birth of Inter: How the new open-source typeface used by GitHub and Mozilla came to be"
source: "https://www.figma.com/blog/the-birth-of-inter/"
publishedDate: "2019-08-08"
category: "design"
feedName: "Figma Blog"
---

[Rasmus Andersson](https://twitter.com/rsms) came up with the idea for Inter in his work on Figma. We'd used Roboto (designed by [Christian Robertson](https://christianrobertson.com/) for Google) as our main font for years, and we were running up against its limitations. It was originally built to work as both a display typeface (for things like titles) and text typeface (for longer blocks like paragraphs). But it was difficult to read Roboto when it was small (small text makes up much of the typography in Figma's UI).

Rasmus and the design team did a month-long research project to find a better-suiting option, but Roboto still came out on top and we stuck with it for several years.

This experience got Rasmus thinking about text-heavy UIs and typefaces. He decided to try making his own font, designed solely for computer user interfaces, and offer it for free to the world. He released the first set of glyphs for Inter in August 2017, and he's been iterating on it continuously ever since.

We sat down with Rasmus to get more back story on Inter and find out what goes into creating a brand new typeface.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAACA0lEQVQoz11SSWsiQRjtfxwEPenBW7x4EVE0ByEQBPEgirjGKHGMe9wdjWvcjRrEtdX2TX8fZJixm0d1V9X36tV7n4Cb53KVsJdEHKUTrvJ7+0jXK7bnA2bHb0wOK3yLG4hnEZfLhSEcDgesVivsdjtIkiQXSDhJZ8Zuv8d8Pmd8fX3xuF6vMVvMUe80UW7W8LvVwEerhW63i+FwCKFarcLlcuHt7Y0ne70ej81mE7lcDj6fDx6PB36/H263G5lMBo1GA78SCUReIjJe8Pz8jEgkgtfXVwg2mw0qlQr39/ewWCwwGo0wmUwwm814eHjgOcLj4yMMBgOcTicKhQLi8TiCwSACgQAfRgd7vV4IOp0OarX6LxQKBe7u7qBUKqHRaEDrVqsVT09PTOhwOFAqlZBOpxGNRlkZ4UVWGovFIITDYT4tFArx1e12OxdqtVro9XomIhVUQEry+Tw6nQ6KxSKSySQjlUohm82iXC5DoDCOxyOHQoaT8eQT+ZWQfaJiMns8HnN42+0Wk8mEi8nj9/d3JqcsyHfhti1EUcTn5ydfizb0+30Oajqd8tr5fObvSqXCan8Ia7UaWnLawlXuq39BRaSSkv5JfTAYYLlc4nQ6MeFsNmMCIqKDSW29Xuf9/xFyY8vNudlssFgsuPd+rklEtIfWiZysIEXtdptB/6PRCH8A47e3HyNhYNEAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/3d65925ea0806bb7a3960913340a2f2661f67532-2048x1024.png?w=1632&h=816&q=75&fit=max&auto=format)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**How much experience did you have with creating typefaces before Inter?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

Very little. I'd never made a text typeface before. I'd made a couple of hobby typefaces in my own time and a few display typefaces at Spotify. \[Editor's note: Rasmus was the [first designer at Spotify](https://www.theguardian.com/technology/pda/2010/aug/11/spotify-facebook-rasmus-andersson) in 2006\]. But none of those were close to the scale of this project.

When I started this, I didn't understand how much work it was going to be. If I wanted to do it properly, I figured it was probably going to take a year or something like that.

It turns out it's probably more of a five, 10 year project to do it fully.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsTAAALEwEAmpwYAAABS0lEQVQozzWR246DMAxE+f9/qypVRb0AXbIQCPdAeEFI9s6kWiSTyIlnjp1kW1edh0FH53TsOpmwX6bxRN71fW+zLDsej4fe73dJ01TLsgzee4PwbduKMUbrupZ5nmXfd0ko2HWdVnWNsGKbVofhK2jx3W6343K56PV6lff7rRAJ67pGwaqq5Pl8KvLinJMQgiTIa20bLX5KhpS/lXZ9f6LIwSgSvl4v/Xw+AmJFPmzbZqZpioI4V4SQclkWSfCLdHmewykTFGrrXBSEmYXIMXAk4yg0B0UkBLynEAkRUhSFAEASHGrTgLAoFCQ84AhOUDiEheFBIbpzRS4SosUoyLkiCCIwlgSGSgLgc+BEV7RzIh8FYXhgZavCNXw/g0fwoIwdkY772DJehu5RFO0JxFh8Iu8QFsUH73DgYQ+KfUAY3PG4K/91HAlN/wCNmgUpkqbw0gAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/68e321fc3d7e111ac1b63401c548ccda148f6c89-2919x1015.png?rect=3,0,2915,1015&w=1080&h=376&q=75&fit=max&auto=format)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**How long did it take you to get to the core set of glyphs?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

How do you define 'core set of glyphs'? There are more than 150 different written scripts in the world—at least those that are well-recognized. Only a small portion of them are Latin-based, like what English is. Where capital A looks like A and stuff like that.

Then, there's the Greek alphabet which is similar to Latin as well as Cyrillic. Then we have Arabic and Hangul which are very different from Latin typography. Spacing is different, capital letters, lowercase letters, there are so many differences in the fundamental design of things.

You can probably spend a human lifetime making one typeface family encompassing all of these scripts.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**Where did you decide to start?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

Because I'm a Latin script kind of person (it's what I'm familiar with), I focused on that. Within the first year, before making it open source, I had something that covered the 200 most common Latin characters.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**What did you do for everything else?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

I back-filled glyphs from Roboto. The Cyrillic characters and a lot of the Greek characters came from Roboto for a long time. The typeface is dual licensed for this reason. I didn't anticipate this being so effective, but I found it was a great way to get started. As the project moved on, I recreated these glyphs one by one to fit into the Inter style.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**What worked well backfilling from Roboto?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

One thing that I did find really nice about Roboto is its x-height-to-cap-height proportion—the scale or size difference between capital letters and lowercase characters.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsTAAALEwEAmpwYAAABd0lEQVQoz22SPY/CMAyG+/9/ABtIMCC+QUggJAZYjkNICMTAAIWRgeOjpW3atInfc4PgyoGlp66d9LXrxIqiCMfjEZfLBUmSgIg+g4xx/CBdu6fu3jqdTphOp1itVhBC4PW7jKBS0Cla//FJ8HA4oNvtYjQa4Xq9wvd9nM9nuK5r3oNAQAQ+pHdDwj6WEaSUBsUF3gTX6zWKxSJarRY2mw0WiwXG47HperlcYsHstlsE5x8o/4ZYBJC+Z1Bx/C7Y7/eRy+WQz+cxGAzQ6/XQ6XQM7XYbpVIJ08kEwrmCuDsdCijPNVAs3wXL5TJVq1WqVCrUaDSo2WxSrVZ7xtw9fU++SLgOsQBxV6SikLSMiOdKdFd6ems+n2O/38O2bcxmMzPPQqGAer1u4vS39zsbgmeok9jchJTs/LJmhWHIh6c0b9J8GJoL6OFwqFlIO46j+VoZlEo06VdjQQPrPL3FD8mBgYWl53mS76TkQiaXrv/nsf/BI5f6X9QkoRBDTP3NAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/46f2066ed8c6f6d806a208712f0554175311899a-1280x569.png?rect=1,0,1278,569&w=528&h=235&q=75&fit=max&auto=format)

If you take the lower case “x” and capital “X" and you measure the distance between the top of the two, you find that the proportion compared to the height of the lower case “x” varies a lot between different typefaces.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClElEQVQozzWSa1PaQBiF8/+/tN9qq9PR2mqt1gsU5C4iNlRUcIxYMCggcpdwS0ISwtNNnO7Omd3Zs3v2vHtWindzhJoZwmOZpHFFxXrGcm0WuDSsDiedC361M0SmOWRToecMWS6XzJYmN6MyoVqaUP+MhJHnwrxD+nZ5yOrZFp8Lu2wqR8j1a/S5IeSWqFqdnXyAj9mvrBV22FXCVPt13KXL1NHJVHOsJNb5cL7B+s0ue7chpEAyxF74gN3jffZjR+QKF8z0me+i3moQPomwFdjhm8BBLID6VMV1XXTT4PL2ip3ADzZ+brIV/C509pFKf0vc3ZeQ/8jEkwmKN0UMw/BdDF4HlB/KXBcLJFNJ4okEjUbDF5zP5zw3n1FKd5xlzwiFQ0SiESRD3OSh2+uhVlXanTaO4/gOLdsWnMlkOvGF1GqV8Xjsc/9FdUOn2+1SrlRQVRVp7MwY2ROG9pjBfMTMeXO3FN0LZ2xP0QTn8d7cdh28thB7dNcU3IRXe8TA0vxRSr384fgpQ7T3m9QwT3law1rYIhSXptnmpJ4l9BQjpWUpGgqa8+ZQXxrcGxWSnVOSr6dkTRl5nkf6kt1jJb7BqrzN5tU+5w95ZqbuC1Z6FdZTG7wLvufT+SpBJUhr1EKYx3B1bgfX/Cxus11c51D9znHjECmSjhGMhzmIBjiKBbm4FoKzmV92rVkjmo6yfSC+1dYav0TKnV7bL9ly5rz06uRvRWVylEw+Tu4mg1Rr1PFQEOmmT09RFAVTBOE9uqZpPL80Ue4UwuFj0idpBv2BL2iLwLSRRqvdovpY5fHpkVq9huQRlm3xOhz6C/1+n8Vi4R9yFg6WZTEaj3hQH6iIJCeTic/5KQvO+2Lm3MR2bAGHf36VEcRQdxWvAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/7eb7068155ab153d545aa152e07583e5b1dff279-2048x1181.png?rect=0,2,2048,1179&w=528&h=304&q=75&fit=max&auto=format)

Roboto has a nice proportion between lowercase and capital characters, similar to some other grotesque typefaces like Apple's San Francisco, Akkurat, Graphik, Aeonik, Helvetica and many others. There's a...it's neoclassical, I don't know, it's become...classical in the sense of a lot of things are doing it because it just works. I think it worked.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAHCAYAAAAIy204AAAACXBIWXMAAAsTAAALEwEAmpwYAAABjUlEQVQoz42RaUtCURCG/UulmZJGer2LXQv7VwVt1IckbKMkKtIIorKFMFrN6uLSauaNgmjRsDIzfZt7LIo+9eFlzgznPOedGV05LaF0KUGLUJ3/EN1VJRb/qpwWocsdi7iJ8HiMOZE/k/FyKuMhKiETd+LtXEYh6cL7hQuFL5XSzfRYRsWIiI+USDWRwRjwZo/Dut+K0HQ9IvM2hOdsWB63UK0eyhKHw6Ad0WWO6XJbQj7pBq6aGPD1lEc2zpERnsE0l7r0lh0BrxFDnXr4vSZM9Bkx2KHHWE8NRkkj3TUY7jJg0lOL+CpPwBYG1Nzljhy43bfhKeFgOQOqO3bMDBgJYMDKhAWzQ2b4eg0s97RWob+tGt52Pd0x4WrXiZJKQNXFAJrDTIxD7tjBWmfAe4WnNq3YnLHiJMRBCTZgI2DF2lQdFn1mLIyZ2VkJ2pBNyOTOTUupzLB4IaBwLtCMhR+H70mRLAs0CwHPJ9QGLSkTE6B9dHvA4Tpsx53iYPViqrECo21rwPKvZXzP8BNVLZ2LMfKDYQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/3dbd1cf20739ad3294173095c2747d5c47e37624-2048x768.png?w=1080&h=405&q=75&fit=max&auto=format)

Inter has a relative x-height of exactly 3/4th the cap height.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**What didn't work well with the Roboto backfilled characters?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

Roboto is more condensed. It's squeezed together a little bit on the X axis. That was a challenge to work around, given a backfill of some Cyrillic and Greek characters, like Omega, for instance.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB/ElEQVQoz21RaUuyURB9frpfJBRTFFHKPXOtjMI0chcFFZfSQsMlE3dN0XBfTu9MX/rwPjDMnXPnmTvnHOF4PGKz2WAwGKDdbuP7+xuHwwGEU/4bhP0v/t4J2+2WByWTSUSjUeRyOVQqFdTrdTQaDc7VapWD6lqtxuePjw98fn6i1WoxTvV0OoWwWq3w+voKv9+P29tbXF5ewuFwwOl0wu124+rqChcXF7Db7bBarTCZTFzTmcLlcnHv9fU18vk8hN1uxy8GAgEGbTYbPB4PD6UfzGYzlEolzs7OoNVqOQgzGAx81ul00Ov1sFgsSCQSEIg3rfr8/MxAsVhEs9nE+/s7Xl5ekEql4PP5EIlEWI5CocCM3t7eUCqVuJ9w2o4kEPb7PUajEYOZTIaHjcdjTCYTxklfGk441RR0N5/PMZvN8PX1xf1kJrEVFosFv3J/f88a3t3d4eHhgSUIh8N4enri+vHxkTf1er2MkYGxWAzBYBDxeBydTufX5eVyiWw2ywaQHgqFAiqVirNarYZMJsPJyQmHSCSCWCyGRCKBVCqFXC7H6ekpNBoNMyS2TJm4h0IhdvTm5oY3IWPokfPzczbFaDSyu+Qq3ZGBFOQ+/Vcul38H4t+3Xq/R7/d5MGXSZTgccp1Op5kW6djr9dDtdllH6qFMVEln0pQo/wAVbKJ9wLXXXwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/a494425108458ee361de0677be7839465cc6934b-2048x1024.png?w=804&h=402&q=75&fit=max&auto=format)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**Part of this project seems to be knowing when to cut your losses and accept what's there, versus recreate from scratch.**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

I have very little anxiety about it and almost no stress. I can come home after a long day and I can spend 15 minutes making a small improvement to, for instance, a glyph. I can spend a whole weekend of focus time just crunching it. Sometimes I spend an hour early in the morning before going to work.

You can make little notes for tomorrow or maybe the next time you have some time to sit down. You can say, "Where the bend of the 'n' comes down into its vertical stem there, it's a little too fat when it's viewed at this size, or when it's set in low contrast."

Then the following day or the following week or something like that, you finally have a little bit of time, you look at your notes...and then you fix the bend in the 'n', right? For me, it's been a very casual iterative process like that. There's this never-ending stream of fun little things to do.

When I’m traveling for vacation, I often find some time in between adventures to work on something. Here are two photos from a trip to Zion National Park earlier this year, working on the “thin” weights of Inter which came later on in the project’s life:

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAZCAYAAAAxFw7TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFtElEQVQ4jZ2U2W9cdxXH5x/hhcIDjagoPFBSpEIqRPKCRKVWQqoEZZFAgQq1pKx1KK0bhyxW08qJTdsEy3W81I6dOB7bY4/t2feZe+fOvXP3O4s9Xsb7jBuvHzRjlIcKIcSRvjq6v6vv55yfzrnXtVKtsr+/TyOOj4//JzWiXt/FcoqUFyuP/UfHx7hW19b/L2CtXsd0nBPgwcFjv2t1vQE8Ofh8/DfgTq2GbtmPgY3To+MjXOWlZXbqu+ztH7B/cMjB4SFHR0cn5gaU/wzc3tlBMy3Klc8BFdOiWFlmqbrB8tomqxtbbGzXqO1+1ixycHDAo/19Hu3tNY2H/y62ubWNalosLi01m2gUPjw6xCXkZFTDxnDK6M4CRnERu7xEubLKSnWd6voGK6tVllerrK1vsLm9Q62+23yWVZ3SQoXPHu2xt7dHrbaFK5PJoCh5VM1E1W00q4jehJcw7AKGaaNpOrqmYVk2hUKJhcoyZqFEKptDNW2Wq2usVqtUFou4kskYQiZJVhSQG92qGqpuoOomiqKSkyQkUURqFM5m0TUdu1BA1gxiaQEpr1EoL1Aslyg4Jq5oPIQ/NE0w7CWdjiGKSQQhiSyJ5KUsSlYkn2tkATUr4hg6C+USmmGQzoropsHCQplyqUixYONKi0kCUS9zwUlC0XnCUR+hsJdE3I+QjJLNpJBEgUwqSSaZQJEkDE1DlCTC8ThZKUvBtig5FgVLx2UXHRRNZmrWQ+/gAD39ffT0fULP3R56+/ro+3SIu4NDdN/tp7t3gJ6+IXoHhvln7wCdd3ro6R8iGAxh6yq2puCqLFXQDZ2e/k9pvXaDy+91cOX9Wyf5g1u0d35Ee9fHXO/8mPauO1zvusO1zttcvfkRbR90cbXjQ0bGxnFMndXGUBYrZWQlR8/AIJ3dnzDw4CFDDycYeOBm2D2Fe86HJxhmOhxlOhzDE4oyFYrg9ocYnZmnf2wC98wspVKB3Z1NXOVygVxOZOj+fe6NuwnEE0TSGcINpdKkczJ520Z1HBTLRrZtJNMikZPxpzJM+kNM+/wUiw67tU1cC0ULMZ1geHSUMc8MSUkiq+mkcjKRVAZRUTGKJYxiAc0y0Cyz+T6SEQikMkwFQ0zOzmLbOrWtNVxlWyUVDTSB3mAISTeaHWVVjYSYJadqOKUyTqmEZTYWPE9ayhFMpgkLIp7G9WdmsDSFnbUlXCVTIR7yMTo2hj8WR9L1JqwhQc4j5zUc02quhmOo6JpCRlaICFmiWYnpcAT31BSmLLCzVMBVLtnE4xFG3W58sXjzOoKSb5okVUM3LGxVx1IUzLyCYRioTgHJtEmpWnNY4x4PhiKys1JsrM0iyUyGybl54lmJvO0gGyaybqAYje/bQs6pCGmRVEogKUikFQ3JshFNC288iXt2Hssy2N1ex7VSXSGaTDE64cEbihBMpJgPR5kLRvD6Q3jmAkx6fUz7gngDETyNHIo0p5zMqzz0BRme8KAa+snfZnNrC68vwMXL13ntzbd5461LXLj4LhdaGrrE71paaWlrp3vgHvORGMFEgmA8TiIrMunzc7njH1y79SGhWIxi2cFVr9eZnvPzo5+d58lnzvCVb57h1DPf46unz/LUs+d46tmzfPvci/z2zXfoHbnPpG8eXyxKTBAYfDDO799qo+29DkbGx5nwTJwAE2mBX772J778je/whVOn+eLXnuOJp7/Ll77+PE88fYZTp8/xwk/P8/b7HdweGmJsdo5gWmDSF6R7cIR7bg8DI6O0Xvn7CdAuFLnRdZuzL73Ct86+yHM/eJkzP/wJz7/wSlPff+nnvPybN2hpv0FnXz8j014CKYGIIBFIZEhmZTzzflqvXMVVq9VZra4xPj3L6xfb+PGrf+QXF/7Kr/7Qyvk/X+LXf2nj1ZbLvP7ONf524yY37/Yx7JnBl8yQkjUyik7eclAtm1m/n38BVR+Z8x6mrFcAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/0e0f91afc8b30d1dd6938ad6490f50e88a5e2145-638x804.png?rect=0,1,638,803&w=390&h=491&q=75&fit=max&auto=format)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAARCAYAAADdRIy+AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEl0lEQVQ4jRXOB1NTBwDA8fcZvPZOqnWELISX9RLyEhJIIkQIEcIMKxAIASzQMMTBEK29ti7UYq+iUrT1bD1ltEIdRUEPsLi1WpUl6gf59/r7BD+h4/sJus5M0/PTLJ2Ds+w6N0vbuTlaBueJDT2i5cJTWn95Qfull3T8+oq9l1/TdeUt3cMLdI0ssWd0mbbRFeqGlym/vIDQ2dXHsTMTDFx9wumRZ/ww/Izvrz7nxPA/HB/9l76xNxz/Y4ET44uc/HOZ/hvvOHVrlVN/vefkrVUOTyyyf+QlrT/fp7b/BkJXpI4f+84yNv6QidtvuDb5hrHJt4zcXmTkzhIj0yuM3nvP2OwHfp/7yNjcR4ZnVvlteonB8accO3+Dfccu0tLTT7T5IEJ7YYDD7R2MXhxlZvoFs7NvuTuzwNTMIlNzy0zPr3L34Xum7i9x/c4zxibmuHRlkoHBYb47dJrdbb00RmJEyhuoKIogNPk8tBdkc/ZAD3/fnOLV4wWeP17iyaNlHj1eYf7REnfvPWf06nUGTp3l8NeH6dnTS2vjTuqrGqgsDBH0F5PnzcPv9iPszHERy5Lpj1XyYGKED29XWHn9jhcPXnB/ep6b1ya5cOY83+z7ivamGNFwLaXBEIFACX5fAf6MHLLSstgqb8VpciI0e2ViXom+aC63hk7wam6aJ3duM35+iKGjxzjS00vHjiaiFWEqisvJzy0iMzNARvp2Mt0+fI4MvMku3EYHqTobQsisISIn8GWGhW9r8rh4IMZgdysH6yN0VFXRWBaiuiBIKFBI2fY88jK3k52eRZ4ngxKXm+IUJzkWOz6TFZ/RjFBrVhFNVhGWNNSmGOnY7qbFn07tNi91ubk05Aeoz/FTl+0l7PVQ7HZTlOYi5EohkmYh4pSotJsoTTZQahERqkxq6q1qvpDV1Fh1hBx2gjYbpXaZpqw02v2pNHtt1LstVDnMFFklCq0SZbKJSIqeRpeOBqeOcLJIRBYRMtVKSvQq6iwqqqQE8vR6sraIFOgTaU4z0ObRU2tLosIiUmr5f6EnaBYpNetpSDXQslWk3iFSZdFRb9cjeOLjyVTH49cq8KkVeBVKPJuU5GrVVEsJVJo0BHUayk1JVMsGamQdpcZEwhYd3ZkWDmSbaXMZaXYa2JNhRHApFKQp4nEpVGTEq9m6QYFr/WZy1fEUJyjJVmwmoI6nwSqy02VkhyxStEVLRBI55JM56pPpcUl0phnYny4ieFVKtmk0BJKSKBIT8W7cjDPuc/I1Sqr1Woo1KgrUaqKSjha7gbB+CwGlilqjSK/bwu4UiUazgVarnk5nEkKpTkOZPoGwKZGQTkv6+g3In64jmKih2yOxy2miSq+j1myi1SERMSQR1GqokwzEHFYqjCaKRAP1VjOdHhkhmLCZSp2KsEFNsVaBK24d5jVx+JRKOlwm9rokmm0mDmTZOJJjo9Wmp0afSNRiIupIoUy2k29KpsRspdomI3jXxVGi3US+dhOp6z7D8slajGvikNZuxJ+goca4hU6XkfMVqQwE7cRsIlGzSEOKhR2eNBq9GVQ4UskUTaQqE/kP7HrkxOQKduIAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/2917423a0e64159266962f69a743270b4f3037bb-968x804.png?w=804&h=668&q=75&fit=max&auto=format)

I like to get up early, brew some coffee and get some good fun work in before the day starts.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**That sounds meditative, like flow work. You can zoom into the micro and lose yourself in it.**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

A lot of this meditative work is making adjustments to things.

There is a difference in what details you focus on with making a display typeface versus a text typeface. With a text typeface, you spend most of the time on spacing, pacing, stem thickness and stuff like that, much, much more so than on designing the actual glyphs. You also spend a lot of time on how the characters relate to one another.

With display type, you usually spend much more time taking care of shaping curves and making the glyphs feel really spot on. Thickness, positioning, stem angles. Details that affect rasterization. Things like that.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**It also sounds like you could go crazy because you could tweak for infinity. You tweak one thing and it interrupts the rhythm with something else.**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

I spent almost three years on this project, and I feel it like I could easily spend three more years. Almost every week I do something on it, even if it's just 5 minutes replying to a question somewhere.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**Who asks you questions about Inter?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

People around the world. I get a lot of emails, tweets, questions about it and stuff like that. There's always feedback—on how people are using it, what is missing, what could be better.

For instance, I have redrawn, not all of them, but quite a few of the Cyrillic characters. I'm not a native Cyrillic script person, so I feel that I am struggling a bit with that.

Someone from Russia found an issue and said, "This particular glyph, it looks totally wrong to me. I'm not used to seeing that." I asked, "What is the recipe for making it right?" And he's like, "I don't really know, but that doesn't look right."

Typography has a lot of these interesting situations in it where a lot of the characters that we're used to seeing have no definitive shape. A capital T is usually two rectangles together. Right? But, what about a lowercase a? What about an S? There's not one S that's identical to another S in a typeface. There are practically infinite variations on these shapes.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAACCAYAAABYBvyLAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAWklEQVQI1zWLyQlEMRTDfv9dhYTsZIWUYwY9mIPA2PLnnJP3XiklxRgVQjDooLWmOad678o5m1dKMWqttpP/3oeAyAGQAIl+jKG9t9ZadgAy3TnHIN979d7TD0IMhtMzKWx9AAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/c89c9a63c10bdbc475d3ac94f66edd81e5d769cb-2048x192.png?w=1632&h=153&q=75&fit=max&auto=format)

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**What tools did you use to design Inter?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

I started out with [RoboFont](https://robofont.com/) which is this commercial software. It is a foundation that you expand with plugins, so in order to draw a rectangle in RoboFont, you need a rectangle plugin. It's a programming-forward platform where you do a lot of work by writing Python scripts.

For probably historical reasons, or maybe because of the Van Rossum brothers, most—if not all—tooling for typography is [Python](https://www.python.org/). There are exceptions, but all of the major font editors, they all provide plugin systems and scripting with Python. So, Python it is.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**You think that's just because someone that was an earlier pioneer in creating typefaces on computers loved Python?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

Exactly. No, yeah, there's nothing inherent about Python that makes it good or bad for typography, whatever.

A little over a year ago I switched over to [Glyphs](https://glyphsapp.com/), which is one of the other popular commercial applications. Again, it also has a plugin system based on Python. It offers great performance and one of the creators, Georg Seifert, seems to be a very nice person. He's been very responsive in terms of replying to my questions and sending beta builds to address an issue right away, which I think is incredible for being a two-person shop.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAACXBIWXMAABYlAAAWJQFJUiTwAAACYklEQVQoz02SyU8TYRiH+y8Zz15MTDxijBcTAghNvBmXkKgRPRCbItCWlqbAgUQ4IBZKEIkxslnFg6XLdIMW6IJp7TIzXYC2NObxm6kaD0/emWTm+X6/N5/hyt4T7kkuTLEFwRtGEm7Gjjwdkss8j8/THRrXGYq+xry/iPlgkVdJN6OHSzojibfcj85wNTiE4VbQzMLhBoF0BF86Rih/RKyUIlo8Jl5M8TUXxhxf5PHuFHPeFbbD35DyCQ6UDAk1qxMrp1jKeumOWjD0SlZ2fgRQSiVKhRKKolKtVMVUqKlV0nIOV3yVwTULjlkXq54Vspk07VZL0ORC0Dg/Y7cQ4W7ciaFHsrClCYVAlmUUVUUVlOUyqqyQLGawR5Z59G4c0+QoTocDKRzi4qJJu93S5+lpnZ1cEGPU0RFunvh1WVkTCvE/YVnmIJ/CJrkZfG9lbMqGy+lEkoK0Wn+EYtZqVTazewyEJzrCTxkfpXJJF8pCqPyXMPEzjSPi4enHSWbd83xYXyctKrdaDV3abDZ04ZYIZYzYOzv8K+zIKlQqFfEsC6FKopBmKrGGM7qClIqJPReo12s0Gg3BuY4m3BZrM0ZE5b6ITa+sJdJqa3VVIdTSagm1yjPJ98yfbFJsqPxqtzk9O6Naq+nU63URQmEj66Nfq3wjZGI6uc5W1s+2EGsnaWgVdk4CeI694v7N8fJwkY1ikO/lfT7nJHEzgnjzEl/yYfFfgGnR4mbQhOGS7wFde8P0BSzcCVr12SvQ3wNWbvtHuOZ7xnX/C3rEeoxhO/0hm86AZBdMiG+tdPmGuex7yG9qOJtqA+ocRgAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/e96b5943805502a29f29954f847c167ed4199985-2048x1024.png?w=804&h=402&q=75&fit=max&auto=format)

Editing in Glyphs

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**What do you need specifically in typography designing software that you couldn't get in Illustrator or something?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

A lot of the work that goes into typography is not about drawing, at least with a text-oriented typeface. Instead, it's about mechanics, spacing and metadata—the variety of metrics that exist in a typeface which influence how text appears. So there's some percentage of drawing glyphs and then the rest is a lot of programming, kerning and making many small adjustments while constantly testing the font against various text samples.

There's a lot of composition involved, so components is a very common workflow. In these font tools, you say: "This thing with the dots over it composes the A and the dots glyphs." Now, in the future when I make an adjustment to my A, it adjusts all of those characters that are based on A automatically. You can create these very efficient ways of iterating on the design through use of components.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**It's like Figma components, basically.**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

It is, it works very similarly to [Figma components](https://help.figma.com/hc/en-us/article/66-components), actually. Things like components and kerning assistance are the primary upsides of these font-specific design tools.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**What's the story on how Inter became the UI font in Figma? Was that always the plan?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

No. When I started the project, there was a hope that if it was successful it could be used in Figma, but it was not the plan. It took quite a while for our design team to consider it.

**Why did it take a while?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

Since I personally work at Figma and Inter is my side project—maybe this is a weird Swedish thing, but—I felt that I couldn't really propose Inter to be used in Figma at all. I hoped that it could be useful, but I didn't have much expectation and I certainly didn't push on it.

In late 2018, we had a project to do a [redesign of our UI](https://www.figma.com/blog/ui-refresh/)

, and as part of it we evaluated typography in the tool. I kept quiet, but the rest of the team wound up suggesting it. When we tried it out it worked really well.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**What worked well about it?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

A lot of the Figma UI is typography based. We organize information in the UI largely through spacing and typography, and we use text for elements that you might rarely interact with, like menus, or things that are particularly important concepts to understand, like the layers/asset panel labels.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB6ElEQVQoz1WSTW/TQBCG/bfpmZ7onUpFooKq9Ar8AVRy4ERbgbgQUoja4O/1fu/ayWtm1nFED6/WO5555mMnE0qhUhqltqhIrTYwxsB7ixgDlJK4vfmKy8sLnJ6+xPn5ayw+XyP/+wjZtVBSQKvuoGzZaHwpHD7lEYuyx4/WE9QiBI/tdgujdQKcnLzA0dEzHB8/x8cP77Fe/4Zoa3QMJdCsbN1qfK8dbpp+/NYN+KMilPNUXcQOGL1zuLu7xdXVO7w6O8PF2zdYLK6x2TxAiOZQ5axMUsvSWGgfRht7OAKFENH3PXa7HZ0RdVXi/n6F5fInVqtf2Dw+oE3VCQI+VcYtOWsQvBs5OImgXOEwDAlsjE6zlKSmk2hJUnZP9T+QH4E0ej+1ypAQQvpmWWsSlDspFT2cmh7OWQvnbPrWekqa6T1Qawa6AzDuW+czBbIoIc/XkObkwzD7hsTJFK2M0RzgxrmiPg50bgk8JJujh2FR0MGHAZyYNmFkTaMhoJQSCUrteB+So/cU4AlI0EhV7kdyqIp9OMF079Os2c7dZk3Toq4b8MlwVpeGrnkMKVkrBP1vaE1oNWgrWEJ06S6lOsxQdLSHRVkizwvkRYGqqpOKokRJ9rquU7Iy+eRkn3zYzrbpXiWfWf8AKDY+ZsMpgX8AAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/217c87406cf29045882a112608d8a18c15c82423-2048x1120.png?rect=1,0,2047,1120&w=1080&h=591&q=75&fit=max&auto=format)

We found Inter to be easier to read in our UI than the alternatives. Some numbers were sharper, some characters like the "degree" sign, percentage sign and so on.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**Are you creating custom Inter glyphs just for Figma?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

I have not done that. In the future, I think there's a possibility of Figma just forking Inter and making its own changes. Right? This is one of the great upsides of open source. It's not actually that hard.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**What's been the most exciting adoption to see of Inter?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

GitHub and Mozilla are pretty big names. That’s really exciting. There was a Japanese agency that used it for some kind of really large display, like the second biggest square in Tokyo. It was so random. Really cool.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**How did you find out about it? Did they tell you? Did somebody take a photo?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

Yeah, they contacted me. I really wish people would do this more. If you read this and use Inter for something cool, I would like to hear about it.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**Is that the only way you find out how Inter is being used? People have to tell you?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

With other kinds of software applications, there's so much infrastructure around analytics and download count and stuff like that, and feedback loops.

With a typeface, it's just this black box as to who is using some of the stuff, then you have no way of reaching back. You're completely reliant on whoever makes use of it tells you about it, which probably no one does, right?

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**It's like, if you download an app on the app store and you open it, you're not going to email the creator and say, “Hey, I used your app,” right?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

Same is true of typefaces. It's had ... I don't know how many people have downloaded it yet. I do have a counter. It's 100 thousand or so people have downloaded it, or at least 100 thousand, and I have no idea what that means. That means at least a few thousand are using it. Ha, ha.

**Right.**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

Probably more than that.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**And how many people have actually told you they're using it?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

I've heard of maybe 100.

![Screenshots: Github homepage, Mozilla design guidelines typography page showing Inter typeface](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAABYlAAAWJQFJUiTwAAACGUlEQVQoz3WQS09TQRiGz7/SRItKvSALFyzUBDcuNFFE0RAX6kITiQ1Ro6TxQirUykVQUSQa0UCAUmkL1l5EbG1raQBtm8O59Nx6Tvu9zjmJSxfPfJNvZp55Z7hSqYyFxRBevZ7EyPNxPA0Mwc8YHRvHxJtJvP8wjVgsjvXVPDYiayhFY6jEQigtz6McDkKIRqB8+Qo9nYUpSuASyRRu3PTg+ImTaDvWjraj7TjTeRF373vx4JEPt3rvYHhkDOkYk8XzEJNrUNNJqD/iUL8nYKymYH5bg5krwJRkcJ/DEZzuuIDd+w5hh6sZO5vc6OjqxvTMLIJLYdzzPkS/bxCFTBbWtgBLENBQqyBNAakKLFmGwXo1JjN1A1yIHTp19jxczS3YtfcgXO4WXLp2FfOpMJbzSXj9T+Ab9GMjnwWUbdQVEXXTRL3RcFA1DRWehyhJqNVq4CLRFTrX1U17DrRSk/sw7W89Qp1XLtPQ7AS9WHpHnsd9NBB4RpvFIjV0hTRJIEWWWTiVNE0jWZKpXCqTKAjEhMRlc3kEhkfR47nt/OX1nl709Q9gauYTPi7O4eXUW8wtBMHzLF29DlVVIctVKIoGTdOh6wxWDcOAyZJziqLQ1tZv+lUoUOZnjlaSGQonspTJFZ3+JqNSqRATOQmYwElmV0M3nJ4Nkzlw9vBvU5U94w9fpWJZJl6skn2ZLbLXbOz5/7AdlmXRX/nnHTK2QyyuAAAAAElFTkSuQmCC)![Screenshots: Github homepage, Mozilla design guidelines typography page showing Inter typeface](https://cdn.sanity.io/images/599r6htc/regionalized/8464f54a607cd31342e6172215445e72bf799e75-2048x846.png?w=1080&h=446&q=75&fit=max&auto=format)

Inter in use on GitHub.com and Mozilla.design

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**I think I told you that Andrea \[our co-worker\] was giving a presentation on content strategy and I was like, “Oh, what's that font, I really like it?” And she was like, “It's Inter.”**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

There's a lot of that. [GitHub](https://github.com/) started using it maybe a year ago or something like that, it was pretty early on, actually, and I was really surprised. One day someone was just like, "Hey, have you seen this?" And I went to GitHub and I saw Inter everywhere at GitHub. I was just like, "Okay, that's cool. I had no idea.” Same thing with Mozilla when they made Inter a part of [their brand refresh](https://blog.mozilla.org/opendesign/firefox-the-evolution-of-a-brand/).

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**Do you know how they found out about it?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

No.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAcGCP/EACMQAAEDBAEEAwAAAAAAAAAAAAECAwQABQYRIRIxUYEHFCL/xAAXAQADAQAAAAAAAAAAAAAAAAACBAUD/8QAIBEAAgEDBAMAAAAAAAAAAAAAAAECAwQhBRITFTJhcf/aAAwDAQACEQMRAD8AmvzFbIWPXaHBt8ZLTrgDiyDoa34q24TY/v4/DdLYbJbHHbfHcVzplVxXesvckyeoBn8oC+dJFWGLdLnAxKDPjT20x1ANHXBR43TUL/jruUcJmbst9DLyioJxZQGgoD3SuYZ+WZama8lN4kKAWeUL2n1Sme2mLrTl7Me9IdU91qWVK7bNbK1ynpWIXth5xRaS0hxKd8Ag0pUaaRSot5+MyiJLrTaEtq0nVKUoGWYeKP/Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/61807420363e845b6fec852d1520a644bd00a6ea-262x261.jpg?w=262&h=261&q=75&fit=max&auto=format)

Carmel D.

**That's so funny.**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAcFCAT/xAAmEAABAwMDAwUBAAAAAAAAAAABAgMEAAURBgcSEyEiFTFBUWGR/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALRuNbID9pYt8x10Q883G0nJWPo/lRzTj9mtWuIHoMdcZzqBJwkjkknGKsl/mN3u2LuMEoLLTZQvI8wahtgfVI3Thth4PMs+RAGMAd6DpKVDUt4qbUQD3wKVnv6hSlwjouD8pQcjncTUkae2tibwSnx6QT4EH7HzWDqjVVykXEvJW3HdX3UphPA0pQe+BudqqLFQyi4laU+xWkKP9pSlB//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/c752bc00c2de2c31251b9f2ee9182a9bdb57d53d-500x500.jpg?w=500&h=500&q=75&fit=max&auto=format)

Rasmus A.

I don't know. I haven't done any marketing at all around this. Haven't spent any money except my own time and the money invested in software that I bought.

Sometimes I'll hear about something from somebody that's been using it for a while. I'm like, "Wait, what? I had no idea, that's really cool."