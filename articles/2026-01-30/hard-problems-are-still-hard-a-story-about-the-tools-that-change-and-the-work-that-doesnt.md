---
title: "Hard problems are still hard: A story about the tools that change and the work that doesn't"
source: "https://www.figma.com/blog/hard-problems-are-still-hard/"
publishedDate: "2025-12-12"
category: "design"
feedName: "Figma Blog"
---

December 12, 2025

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAcCBQYI/8QAIxAAAQMEAgIDAQAAAAAAAAAAAQIDBAAFBhESIQcxEyJBYf/EABgBAAIDAAAAAAAAAAAAAAAAAAEDAAIE/8QAGREAAwADAAAAAAAAAAAAAAAAAAECAxIh/9oADAMBAAIRAxEAPwCwZ9dJdjxeTMtrQdl7CGwfQJOtmpxhF7yuLlUVi/7fizDx5BQISffVVzIhFcs0hqYttKVp+oWoDZ/K4DCQyu9fNLQGUMDSVODiOX4BupbrZDcUy4pso6m+6VmVg9ggj+UpxmPG3lPJLtNza5Ifmu/HHfKWkJUQlIHrqtFcswvlyitx5dwdU0jWgDr1SlEYnw7DFfJOTQrSmO3P5oQohJcHI6663SlKJQ//2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/eb89dc47dfb3f174d1fe3f766496259b171b48b3-1800x1800.jpg?w=1800&h=1800&q=75&fit=max&auto=format)

Nikolas KleinProduct Manager, Figma

-   [Maker Stories](https://www.figma.com/blog/maker-stories/)
-   [Design](https://www.figma.com/blog/design/)
-   [AI](https://www.figma.com/blog/ai/)

![Cover illustration of a comic showing a person walking a large fluffy dog through a colorful, surreal cityscape with the title “Hard Problems Are Still Hard.”](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYEBQf/xAAlEAACAQQABAcAAAAAAAAAAAABAgMABAURBiExQQcSExQiUXH/xAAWAQEBAQAAAAAAAAAAAAAAAAAFAgT/xAAgEQABAwMFAQAAAAAAAAAAAAABAAIDBBGhEhMUQVJh/9oADAMBAAIRAxEAPwDQeKri8xmMV0I+U7hdHflXdK4ydlZW4u8hMbieYcttyQ/lTcylxksTcShBFJeyv7YM+9aPf6pfx/BuSWBzm0hKDoyvui46c07NTB9I7Wsbc5EcjjZOuC8QIp7I7gmlCOUD66gaoqkxFjj4rUx2dq3pK5BLPzJ7miraCBYMwkuNR+sr/9k=)![Cover illustration of a comic showing a person walking a large fluffy dog through a colorful, surreal cityscape with the title “Hard Problems Are Still Hard.”](https://cdn.sanity.io/images/599r6htc/regionalized/afa86c16ecca710fd451f4bea41582d647779152-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

Figma designer–turned–product manager Nikolas Klein worked on building prototyping tools for seven years. Then AI changed the game.

Illustrations by Marco Quadri

![A traveler walks past a colorful cluster of German-style buildings in the town of Schwäbisch Gmünd.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUGBP/EACMQAAICAgECBwAAAAAAAAAAAAECAwQAEQUGIRMUMUFScdH/xAAWAQEBAQAAAAAAAAAAAAAAAAADBAX/xAAhEQACAQIGAwAAAAAAAAAAAAABAgAUUQQFESEiQbHR8f/aAAwDAQACEQMRAD8AYtaaVpvNPIFrknbPoH9zSvUpmrJJHOIAqaWPey3t2xFd5NJbpqJCCGYoxf79cdDhKy1XVZoRIU0p8M9jkVOjHkp+2mhUuNGBG3XuVvE8kYqKLZmJlPc4ZI0eLux1wJLUMjfLTYYAwLRDmF/E/9k=)![A traveler walks past a colorful cluster of German-style buildings in the town of Schwäbisch Gmünd.](https://cdn.sanity.io/images/599r6htc/regionalized/668ab8b5fdb58e591ef4ff2e3a9b6236bc66dd9d-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

![A bright yellow San Francisco streetcar passes colorful buildings at sunset as the narrator reflects on moving to intern at Figma.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQAD/8QAIhAAAQMEAgIDAAAAAAAAAAAAAQIDBAAFESESMQYTJEGR/8QAFgEBAQEAAAAAAAAAAAAAAAAABQIE/8QAIREAAgIBAgcAAAAAAAAAAAAAARECAwAEMUFRcZGhscH/2gAMAwEAAhEDEQA/AHLnIlPvOLjxY7LWTtRz991k1OW3bFxnHvkKyBx63TzdkmONvcPUEOKOlHJG6M8malRFR0Kjxye8t4H7REqLpBTafN9NziNWoqhJiI9fM1sMR9cDKuRPIjOe6qfsFrgi1tFanUrO1AHO6qzHVzBRB7Zbo4Hxn//Z)![A bright yellow San Francisco streetcar passes colorful buildings at sunset as the narrator reflects on moving to intern at Figma.](https://cdn.sanity.io/images/599r6htc/regionalized/ce3bb790bb1db5634cebce265846b9cef9905664-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

![A designer works, rests, and reflects at their desk with a loyal dog nearby while thinking about building interactive prototyping tools.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAwABBv/EACMQAAEEAgEEAwEAAAAAAAAAAAECAwQFABESBhMhURUxQmH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEBf/EACERAAIBAwMFAAAAAAAAAAAAAAECEQAx8AMSQRMhIlGR/9oADAMBAAIRAxEAPwDrLHq+7RLJFY+2rloRz+h7Bw62/tnrKS8Ir4cLZVo/af4M22f6gkL+Tfix+80opS2HBxA949HHu30OToyYye5tJ5q8ga86yX0dRkh1BO20n3bL0yF4HIzLUdXOkGOorivlXM7JVrZyxatm0VHV3IjSlcyORdGzllRE8R2H2jOIYiDX/9k=)![A designer works, rests, and reflects at their desk with a loyal dog nearby while thinking about building interactive prototyping tools.](https://cdn.sanity.io/images/599r6htc/regionalized/3237014f8b13169b564adeca65b424c9d240cc88-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

![A designer and their dog stare at an AI-filled computer screen as they reconsider the role of prototyping.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAUCBgf/xAAkEAACAQMDAwUAAAAAAAAAAAABAgMABBEFBhIUIUETFSIxcf/EABUBAQEAAAAAAAAAAAAAAAAAAAMC/8QAHxEAAQMEAwEAAAAAAAAAAAAAAQACAwQREiEiUaHw/9oADAMBAAIRAxEAPwBpZbj1rmLaOYYGUVSgOKaWOgx2Bk61OpeYiQSq2O/kYqW1dvyXaXmpQA+qjNGFkcEZHmk+r2O4bWSa+e6VVj+bBSDn8oZ6prThlYlI2mfI02GgrkNp6QJJG91aIu3Mx8wOJIHais4tLy+vRLPK7MzOe5Iz9CigMdSTxlIHWlQENt/er//Z)![A designer and their dog stare at an AI-filled computer screen as they reconsider the role of prototyping.](https://cdn.sanity.io/images/599r6htc/regionalized/59f2e58e879f4fee8f2de2b92240cf2e30701729-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

![The designer gazes ahead with swirling, overwhelmed eyes as ideas and questions swirl around them.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAUBAwQG/8QAJBAAAQMDBAEFAAAAAAAAAAAAAQIDBAAFEQYSEyEjMUFRcZH/xAAWAQEBAQAAAAAAAAAAAAAAAAACAAT/xAAeEQABBAIDAQAAAAAAAAAAAAACAAEDEUGhBBJSYf/aAAwDAQACEQMRAD8AwlxCnpPJynas5UnPXdTb2JD83hbCyXO07+hiu9vmkX7exOXa5hbafcClMqAI/aXXee8ymCuChtL0ZOHSUjBPyKBct2IRaqy6oYxljIhu8JnYNPT0QPI7HSSsnG/6oq+y6dflwRJRMOHiXPcetFN5X9aWLv8AdL//2Q==)![The designer gazes ahead with swirling, overwhelmed eyes as ideas and questions swirl around them.](https://cdn.sanity.io/images/599r6htc/regionalized/bdedc24317ee2628fcdaf6c17030de5b3daaa323-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

![A designer sits beside their dog as swirling green AI clouds raise anxious questions about the future of design.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAMCBAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQREhMhFCIxQVFh/8QAFwEAAwEAAAAAAAAAAAAAAAAAAQIFBv/EABwRAAIDAQADAAAAAAAAAAAAAAECAAMRBCFxgf/aAAwDAQACEQMRAD8A6rE4meV23DGH04H2pXVsk8blWYBfhwc0mV5I5Y1i8TkjzgIaRbNOsciA6nLEtqOePyoz11IMENj9BYuGz74yZlj10aSrMz53CRz6oqpZ9UDOJMk7rY7vXGKKda8GZNWnVSVGsu+p/9k=)![A designer sits beside their dog as swirling green AI clouds raise anxious questions about the future of design.](https://cdn.sanity.io/images/599r6htc/regionalized/60f73f8c500bda8594ab4745f78a899313f158e2-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

![The designer imagines a toolbox filled with traditional tools and AI alike, realizing it’s simply one more tool to use.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYDBAX/xAAiEAACAgIBAwUAAAAAAAAAAAABAgMEABEFBiExEiIyQVH/xAAXAQADAQAAAAAAAAAAAAAAAAAAAQIE/8QAHhEAAQQCAwEAAAAAAAAAAAAAAQACBBEDQRIhkVH/2gAMAwEAAhEDEQA/AHROUnjoXI1jCuCR7l76xeaVwoUGcyd9kOfOMfJ2nsX5nli9KMdaUj6yStSa2BPBVTQPhmGRKiScjg9w0N7WyNJhhlB1VfXf1VelpbS8c6zyyFxKw7nf5hm3R4uxDG4MSAs5b5b84YMiZeIuvU3TcNmifF//2Q==)![The designer imagines a toolbox filled with traditional tools and AI alike, realizing it’s simply one more tool to use.](https://cdn.sanity.io/images/599r6htc/regionalized/a21196321b239fa58cef929b685420be9deab207-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

![Scenes of design work, animations, and iterative problem-solving show that even with AI, hard problems still require human judgment.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUGA//EACMQAAIBAwQCAwEAAAAAAAAAAAECAwAEEQUSEyEHMQYiQVH/xAAWAQEBAQAAAAAAAAAAAAAAAAAFAwT/xAAdEQACAgIDAQAAAAAAAAAAAAABAgADE2EEMUHR/9oADAMBAAIRAxEAPwC+135fI0kttZcSHGNxPo/ozSzUGs2MUpeJ7nkQuxb7Vq/j+6bkjlnRlBynfo/2k93451MXDPK63EjH1ybRis/BqFINa9b+mWuRQQ/ujL+y1C24jtvIkGelVxgUVGaf471OK32hkPZPbiil8iQ/EZ//2Q==)![Scenes of design work, animations, and iterative problem-solving show that even with AI, hard problems still require human judgment.](https://cdn.sanity.io/images/599r6htc/regionalized/7e945cebc1eb72cee82c5630de4618e2f16012a5-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

![Designers and engineers sit atop a whimsical castle-shaped structure, illustrating how collaboration between experts makes complex ideas possible.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAQCBQYH/8QAJRAAAQMDAwQDAQAAAAAAAAAAAwECBAAFEQYSMRMUISIVI0Fh/8QAFwEAAwEAAAAAAAAAAAAAAAAAAgMEBf/EACERAAIABgEFAAAAAAAAAAAAAAECAAMEERQhMTJBgZHR/9oADAMBAAIRAxEAPwCd4DqUZTrGuUz6Hq4ioT8zwlU13hHvB4wGEN3BfZxSPw5VTmuhybHdGSSZ2r7Llu5PP9zScjTU2ScRjAZvFnbgiftIzahT0D0dRqYdMyXE2x47b4hLTOlpfxy9v1FGj1TLic8eaK1tusV1dGyNjWtz4TqpRQ5FU27AeD9iaYspWIU3Ef/Z)![Designers and engineers sit atop a whimsical castle-shaped structure, illustrating how collaboration between experts makes complex ideas possible.](https://cdn.sanity.io/images/599r6htc/regionalized/0020a921bc7ab6ac86c76ecf95712c3d1763593b-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

![The designer and an AI cloud work at side-by-side computers while their dog rests nearby, highlighting teamwork and human insight in the design process.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABgAEBf/EACIQAAICAgEDBQAAAAAAAAAAAAECBAUAAxEGE0EhIjFRcf/EABUBAQEAAAAAAAAAAAAAAAAAAAQD/8QAIREAAQQABgMAAAAAAAAAAAAAAQACAxEEEhQhMWGRsfD/2gAMAwEAAhEDEQA/AEVGleY0nTfat+2e+89tiSPb44zr2NrX12jYAZCBQo1jgnj7wrY9SxbW0RN8GU0jWxVWXcqjG1FCk2nTVh3dCdwsAjOQSq/uTxDTIbLjXpIhnEZto578LVUykkw12xXdtbeW9MsJSpdjUyHhxmB1IRwW45+MsOyPM0EJWsa3Yk392v/Z)![The designer and an AI cloud work at side-by-side computers while their dog rests nearby, highlighting teamwork and human insight in the design process.](https://cdn.sanity.io/images/599r6htc/regionalized/b494d777cdd73f5314df0d7bf705bf769189fd45-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

![A designer naps on a couch beside their dog and a friendly cloud-like AI, symbolizing the ongoing partnership between humans and their tools.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAPABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAMEBf/EACMQAAICAgEEAgMAAAAAAAAAAAECAwQAERIFBhMhIlFhodH/xAAVAQEBAAAAAAAAAAAAAAAAAAAEA//EAB0RAAIDAAIDAAAAAAAAAAAAAAEDAAIREyExYXH/2gAMAwEAAhEDEQA/AN5e4+4VtyJLHTWAMdfH5a/uVQ3JLTvGEmlQJ68T6IP5xdizWCFZIWlaPkXf0PZP7yWlYHSbVho3CrMoOwu9jCtXyYbDciltYkEK8+4zpc1/wycjMSJCN7J+sMu6SLFis0sFrijOTrhrDImudDIytrWAJB35P//Z)![A designer naps on a couch beside their dog and a friendly cloud-like AI, symbolizing the ongoing partnership between humans and their tools.](https://cdn.sanity.io/images/599r6htc/regionalized/66024255e592dad716202cb987ac2c72db6bfa56-6142x4724.jpg?rect=0,1,6142,4723&w=1632&h=1255&q=75&fit=max&auto=format)

**Learn more about how we built:**

-   [Spring animations
    
    ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAABYlAAAWJQFJUiTwAAAB/UlEQVQokY3R+0tTARQH8Psn7nrv3TPTbQpz3k33bK49mrmF293V3GTLpakrr1viiOlQnOE0hCjoAVLSL0UqBpEJUcvY+YZNjA2CfvhwDofDOXAOw6sAs+ETUoFZPJ4yojzuwYhYg0l9Cg3bgKDCpfNenm3GZo0gsK0YTccvBMQdLCYiWJaCqI6GsR2RkLetwWU4hJqrg+XruKI+hVX7GRb1CfRcHRzbAMcSOBVaMF3aE0wGZ7AwGkXaWUbFm8deLITX0RtYdBXhFmuwONYRd5dQvjaHkquAuGUXDuNb2DrfY8BwgEH9EQZ1x3DojsGIxneYiyVwN3wHmb5tFMQ1ZIbmMS+FsSVfx6Y8hJVxJ54kfdifsGFPdmEjmIbifIi8fQUPxHUs9G9AsVahWDfBhGw1KPFhTPvzuG9fhexegnq4gN5sDsrUNJ5KGWyFsyj6lpDzl5D2PMJ4fw3JnueQzC+RNJ17dYlJBe/RshSkgn+GZgM5sssp4rNFsmeeUXTkI8XEA/J1HpFF+5Wuar6TXvhBeq5Oho6zCz9bMKtjXuzILlRuJjGWvA3LZAF9t95gwPEN5i6CTmh+r/34/8Lsp3vpRdJLSjRLvkiVetwfyNh9RnoeJKiIeBX9iQL7f5jDhIsq0QkKeXap2/SFtEKDBBbNQW3NPIu/+cWydr8B7hbkTbRbRwcAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/e5b6f5cd1dd316db01406f3e014a4c5ffa10b9e5-4240x2000.png?w=4240&h=2000&q=75&fit=crop&crop=focalpoint&auto=format)
    
    ### How Figma put the bounce in spring animations
    
    An inside look at how Figma engineers used the laws of physics to bring spring animations to life.
    
    
    
    ](https://www.figma.com/blog/how-we-built-spring-animations/)
-   [Multi-edit
    
    ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAABYlAAAWJQFJUiTwAAADIUlEQVQokQXBX1DTBQDA8d+jXhBswsYG+82NDcY2tvZHbMjGcBOEOecPB4IiGn9kDGIwQVKQJpCGUxoGgmg7yUsv8K6z8wXr1M5/md3VXb10V9dTD+ldvfX67fMRRk6u0JvM0p9+QN/8PXrGV0lM3yd57RWxpW85fn6D7k++Jp59zOCNp8QXHzF6/Wfm77xmZf01s7d+Y+rzP1hc/4f1e/8htB2fxVkj4Qq14z3WhTMYwuGT8HclqBsawBmRcEkt7DmVJHR2ktquARr6UvR/vMn45Sd0nLpK68QyJ5dekrn9BuFgdxqN4R3y1IWIzgrU5UbyChQozXq0u0wUGIqQaZToau1YIj5ElxXR7sQXHULqvUhVfSvWYCPhwTRjCz8hRHrn0JTZySvOR7OjlBKzgXxFIUpLCZpqHdv0hchFJXqvA3NjLaLdgsZeiedAF6HOKdx7DlAR8LP3xBTDl54jNPRMoCo18VZhDmq7FlW5nhyZjG1GJcUeEZlOzttFcrTVViz7/JTYzKjNFXikHsLvzeKs20+530tj/BzJzA8I4eRHFFdUsiVvK2pzKdutdnLy5eSocimwKMhV5bIlfysKq4je50Bh3I5cLMG2WyLYMoplZwDRYcN/dJjBue8Q2lKrGHbUINMXYG7aiT1Yj0LUUeQU0dUbKShTINcrKWt0UykFEJ1WdO+68B0ZINw1Q1VTM7ZIPaHEDMPzzxA6Z77E5AmiMKuwt3hxhfahMhjReo2UN1spqlSjNJdgPeTB0RFE57FhCtRQHxtH6p/D09yKuyNE+HSK/swmQt/5B9jromhrLHjiEtVtR9A53JijHhx9XsRdRkRvGa7EbqoSTZiaPLgPR4lOLXJ0co1A7AQ1Y4doTl+kb/khwodXfyXSe4HA4BDtC5c4PDFPQ+cY+6fPEUlP4O0+hv/9XqTFFFJ6hr3JcdourDCW/ZGz11/R8+kK7dcyxG5ucnrtd4Tsxt9MLjxjaOkbznzxnJkbL/gg85jR7PcMZx8Su3yX+NJ9Rm49YeSzpySWH3Fm7Reu3H3D6ld/Mb3xktHbL0jd+ZMr6//yP7y/vuppGfPMAAAAAElFTkSuQmCC)![](https://cdn.sanity.io/images/599r6htc/regionalized/68bbea0cff6586efe02bcc4d41fc14d99e48e34c-3272x1844.png?w=3272&h=1844&q=75&fit=crop&crop=focalpoint&auto=format)
    
    ### Behind the feature: The multiple lives of multi-edit
    
    Vice President of Product Sho Kuwamoto and Product Designer Nikolas Klein walk us through the journey of multi-edit, a new feature that simplifies editing across multiple designs in just a few clicks.
    
    
    
    ](https://www.figma.com/blog/behind-the-feature-the-multiple-lives-of-multi-edit/)
-   [Code layers
    
    ![A stylized green tree with five window-like panels showing scenes of a person creating and exploring with tools and shapes.](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAIAAADwazoUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACoklEQVR4nGPw9fwCQt6fff3f+IQ/8Ey85JZ12Kl4i131UuvG2VaNM21rFziWbnDPOOEded/P762v1xdfz69g9IXBz/uLj99Lt4hz9ilbbXNW2VbMNm/q0m2p02yu0W6p1mqt1myt1GqrNGjqtKpY5px1yDP2um/Ic3+/j/7eXxgiIt64Ru3VS2/ULal2LJrjWznHvaXXpK7NtGSWc8kqj7L1tuXzTOvbHVomu3WtcOhcal4/w7Z0hXf6ufCYlwzphecskurFMzw0qlKDaxam1KyIbJrt2jjDu3ZzftvV5s6nuc1nw5pXpnXuLJh6ImzGMu1JeYp9KRYtXdHV+xmy6mdrxfjzxZtqVEdHdk/I7J0T2tXjOrXdf+mcmvX7F2y42b38WNycWcnz59YsXZUzf7rl9AyJXm+Ntui4iZMYctpr1EKteIJ1jMqiqybPmzxnY9rEPqe5RV7bqhK2NRWt78la3um/rDpzd9u8I1MXbp2SsahIt9vfqTupa/0chunr5ngWhkmGGNnmRc6cum7HwpOVk6dYT46zWBxuuMBVbbKFeoez5fSkgj1di05OWLq/uWp9QeLSwkm75py5fZLhyt2z8zbPj25I8yqMKmpta+yeFlqTp5znIFFoIlSqw1WszptvIFvlbtkX7zczJXphcumm6pVnV918evH1+3sMD+6eu3Ll8Nptiyv7KkJK4h3Tgw1iXVTDLRXCTcXDDEUiDKXizJXT7Q2KvV2bozPnli7YM/fCtYOP7597fO8cw7QlvdOX9E1c0Fk9oTy6Kt4pw9cq2d0uzcsm1Us72kE1wlY/wckm08unNCyxObVicnnPvNapi3vAunoZdJLt4UgryV49zkY1zko13lolzlo+ykIu0lwx2kI1zkojwUY7Ca7SAYIA1h0p8X2Iw1YAAAAASUVORK5CYII=)![A stylized green tree with five window-like panels showing scenes of a person creating and exploring with tools and shapes.](https://cdn.sanity.io/images/599r6htc/regionalized/fb706fa9b67e53f822d449ff2333078094ecca49-3264x1836.png?w=3264&h=1836&q=75&fit=crop&crop=focalpoint&auto=format)
    
    ### Canvas, meet code: Building Figma’s code layers
    
    What if you could design and build on the same canvas? Here's how we created code layers to bring design and code together.
    
    
    
    ](https://www.figma.com/blog/building-figmas-code-layers/)

[![Abstract pastel gradient background with bold white text reading ‘Software is culture.’](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGAgP/xAAeEAACAgICAwAAAAAAAAAAAAABAgADBBETUhIUQf/EABcBAAMBAAAAAAAAAAAAAAAAAAIDBQb/xAAcEQACAQUBAAAAAAAAAAAAAAABAgADERITUQX/2gAMAwEAAhEDEQA/AOFeFRdkKjgVr2HyO8XBpoAJy+VE0VEVsASCZguyl/E6h0Czvg5uBH+mqaciJTe3TCS3K/YwlGycmf2Dk//Z)![Abstract pastel gradient background with bold white text reading ‘Software is culture.’](https://cdn.sanity.io/images/599r6htc/regionalized/57b6af26ff5cd8f3f078ee2b37717f435b54822c-1920x1080.jpg?w=1920&h=1080&q=75&fit=max&auto=format)](https://www.figma.com/blog/software-is-culture/)

Explore [Software Is Culture](https://www.figma.com/blog/software-is-culture/), a collection of stories tracing the impact of design on how we think, feel, and connect.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAcCBQYI/8QAIxAAAQMEAgIDAQAAAAAAAAAAAQIDBAAFBhESIQcxEyJBYf/EABgBAAIDAAAAAAAAAAAAAAAAAAEDAAIE/8QAGREAAwADAAAAAAAAAAAAAAAAAAECAxIh/9oADAMBAAIRAxEAPwCwZ9dJdjxeTMtrQdl7CGwfQJOtmpxhF7yuLlUVi/7fizDx5BQISffVVzIhFcs0hqYttKVp+oWoDZ/K4DCQyu9fNLQGUMDSVODiOX4BupbrZDcUy4pso6m+6VmVg9ggj+UpxmPG3lPJLtNza5Ifmu/HHfKWkJUQlIHrqtFcswvlyitx5dwdU0jWgDr1SlEYnw7DFfJOTQrSmO3P5oQohJcHI6663SlKJQ//2Q==)![](https://cdn.sanity.io/images/599r6htc/regionalized/eb89dc47dfb3f174d1fe3f766496259b171b48b3-1800x1800.jpg?w=1800&h=1800&q=75&fit=max&auto=format)

Nikolas Klein is a product designer turned product manager. He’s been working at Figma since 2018, and has always been focused on getting more people to explore their interactive ideas together. He is now a PM on Figma Make.

[Twitter](https://twitter.com/nikolasklein)[Website](https://nikolasklein.de/)

## Subscribe to Figma’s editorial newsletter

Enter email\*

I agree to opt-in to Figma's mailing list.\*

By clicking “Subscribe” you agree to our [TOS](https://www.figma.com/tos/) and [Privacy Policy](https://www.figma.com/privacy/).

## Related articles

-   [
    
    ### Double click: What does it mean to be a designer in the age of AI?
    
    December 3, 2025
    
    By Andrew Hogan
    
    The scope of what designers, developers, and product managers do is expanding, and the boundaries between them are blurring. As workflows shift, a bigger question emerges: What happens to job titles—and the ways of working and sense of identity that comes with them?
    
    
    
    ](https://www.figma.com/blog/double-click-what-does-it-mean-to-be-a-designer-in-the-age-of-ai/)
    
    -   [Insights](https://www.figma.com/blog/insights/)
    -   [AI](https://www.figma.com/blog/ai/)
    -   [Design](https://www.figma.com/blog/design/)
    
-   [
    
    ![Four cartoon chefs gather around a glowing pink cake with cherries as one prepares to slice it.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAUGAgf/xAAjEAABAwQBBAMAAAAAAAAAAAABAgMEAAUGETEHEhMhIlGR/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEF/8QAHhEBAAICAgMBAAAAAAAAAAAAAQIDAAQRIQUSIjH/2gAMAwEAAhEDEQA/AKBnGrRiFsvEWNJjXFwtn5raClIOuN1F4Zjkpq+R57bXapgAhRHpKjwaadTWUW9yYiECykhJ0lR53SfEZ0qQAHpDix4z6KvrilmpOFJZz29Y2vGVSsaxSMAeT9ehc6HkXRuTkF1cuT93jNuvgFSUt6G6KzanHJMXvfddWoKI35FcftFR1pxeFzH9teX0Rc//2Q==)![Four cartoon chefs gather around a glowing pink cake with cherries as one prepares to slice it.](https://cdn.sanity.io/images/599r6htc/regionalized/9d895b5485fa341dc202c5335e3023fc8b0787af-3264x1836.jpg?w=528&h=297&q=75&fit=max&auto=format)
    
    ### How to harness skills that AI can’t automate
    
    ](https://www.figma.com/blog/how-to-harness-skills-that-ai-cant-automate/)
    
    -   [Insights](https://www.figma.com/blog/insights/)
    -   [AI](https://www.figma.com/blog/ai/)
    -   [Thought leadership](https://www.figma.com/blog/thought-leadership/)
    
-   [
    
    ![](data:image/png;base64,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)![](https://cdn.sanity.io/images/599r6htc/regionalized/7a9c9f0c6f1afbc8ed04a8878503cfa0629a46ec-1606x2144.png?w=528&h=705&q=75&fit=max&auto=format)
    
    ### What is good design in the age of AI?
    
    ](https://www.figma.com/blog/what-is-good-design-in-the-age-of-ai/)
    
    -   [Insights](https://www.figma.com/blog/insights/)
    -   [AI](https://www.figma.com/blog/ai/)
    -   [Design](https://www.figma.com/blog/design/)
    

## Create and collaborate with Figma

[Get started for free](https://www.figma.com/signup)