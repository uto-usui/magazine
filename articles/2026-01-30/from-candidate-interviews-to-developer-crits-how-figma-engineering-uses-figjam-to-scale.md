---
title: "From candidate interviews to developer crits: How Figma Engineering uses FigJam to scale"
source: "https://www.figma.com/blog/inside-figma-how-figma-engineering-uses-figjam-to-scale/"
publishedDate: "2021-11-09"
category: "design"
feedName: "Figma Blog"
---

Since [we launched FigJam back in April](https://www.figma.com/blog/introducing-figjam/), teams having been using it to connect and ideate together. We recently caught up with three of Figma’s engineers—Alice Ching, Joey Wang, and Greg Blaszczuk—to learn more about how they use FigJam to navigate their day-to-day.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAcDBAUG/8QAJBAAAQQCAgIBBQAAAAAAAAAAAQACAwQFEQYSIUExFCIkUWH/xAAYAQACAwAAAAAAAAAAAAAAAAAEBQABAv/EAB8RAAICAQQDAAAAAAAAAAAAAAADAQIFBBESNBMhgf/aAAwDAQACEQMRAD8AmXDKc+TzlWp0DWvf5fIPt0qBymKtRuvwtiGq6XQMM0Q1s/pbFCzWq5KlPXrsjj79H7G9b9rHziBmR5DTsRR6Fd7WmQN0Hkn4VPTbT3lTI9waRK3J8lZOPW41lTEPxSfPztFVW2hG1rR6ARC7E4QTDHvd9bVdvZDvf8XtuCVI81lYm5HtK1sr5QN6Hb0iJrl+0z4D4zrUO5arxtsSNA8BxARESsMP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/dd3e103fa426bae07b59e6d8f78fcdde7edbe1f5-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Jillian S.

**Tell me more about what each of you does at Figma.**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYEBwX/xAAlEAABAwQCAQQDAAAAAAAAAAABAgMEAAURIQYSEwcIFFExQWH/xAAXAQEBAQEAAAAAAAAAAAAAAAAFAwQG/8QAHxEBAAIABgMAAAAAAAAAAAAAAQACAwQRITFxIzIz/9oADAMBAAIRAxEAPwCR9P7gi08WnS1jsWWxhP2c6FabpZrk/aWb3ImteZ1YUphCcFAVobqWuCLhZeIxPlMlkzXUlKFaJ6n6rofLpdwa9P4BixT5nnEebqnJQBusOHh7qnLFL3EN+AktL4xMjuJQ0suJKQrIBGzSqqNdvlxmnSHCSkA5GMfylTb1HRZQpdNQmL3Dx0KetSjkFCR1wfxuupcajtSOJ2wupBPRJJ/ZOKUpWvMKt6zwOXW6Mm8q6I6AoSSE6GaUpXP5j627juXfFXqf/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/57e333b73aae0cf05b5d13a005fbaff179ee46b8-320x320.jpg?w=320&h=320&q=75&fit=max&auto=format)

Alice C.

I’m an Engineering Manager and I work on FigJam. As a manager, my job is to help the FigJam team work collaboratively to build new features. Since we’ve been remote, I’ve spent more time finding ways to keep the team connected outside of their day-to-day work.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAQGBwIF/8QAJBAAAQMDAwQDAAAAAAAAAAAAAgEDBAAFEQYSIRMUIzEiUWH/xAAXAQADAQAAAAAAAAAAAAAAAAABAwQA/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAEDEQIEEmH/2gAMAwEAAhEDEQA/APMTUksp+Z5C4LYL4wD5Ev0lVO63/v5JtyILkMzz09y53Vsb+iu2hE/LKKCNopC5lBIlx6rL2Ytvk6pQLk4oNsIRJn2q44Skzc7ObyaplMPUUXhUltkt7yA24ol64pU2dquZCknHjyRRkFwCbM4SlZajoW52VK960v0+e2sq4OmLZoohldqY/Kj6nusuTIYeJxRcUcqocZpSqqVoUm6ObU+bsVSdwZbl5LlaUpQYD//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/fb4c8ed021278688ddc79c093e6c7c2d6159ac45-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Joey W.

I’m an Engineer on Figma’s mobile team. I have seen the mobile team grow from the early days to now over 20 people, so I’m often thinking about how we can keep up with and stay ahead of that growth. To me, that’s focusing on how to scale team processes and help new teammates learn our infrastructure and tech stack.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAEDBgcF/8QAJRAAAQQCAQMEAwAAAAAAAAAAAQACAwQFEQYSEyEiMVFxFDKB/8QAFwEAAwEAAAAAAAAAAAAAAAAAAgMEBf/EAB0RAAICAgMBAAAAAAAAAAAAAAABAgMSMREhQVH/2gAMAwEAAhEDEQA/AN5Zz1njFL8ypGJZpHCNrHHQ+yoxXL72aM8OTbCydmnAx+W6Pv8A1RySOC1x+4yzJHE4eprn/Kx/BLlaMvOQeGdbg1jj438pdlrjNL6OpojOmUvUdCtWHumJ7hA1odI0NIrHS0ID0gucD6vpEeRHicG5fnr93JXas8oMEUpY1oGvC8OGaUaHceQ39QT7Iils2adHUS6xzrO0ZBBDZaY2ga6m7KIiNaFSS5Z//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/2e6253a4d33b6114143cd5a8118768771f61a0fe-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Greg B.

I’m also an Engineer on the mobile team, primarily working on our Android apps. The newest version of the app is in beta, so I spend most of my time collecting feedback and testing for bugs on new code we roll out. Like Joey said, our team is growing like crazy—if I’m not coding, I’m probably interviewing candidates.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAcDBAUG/8QAJBAAAQQCAgIBBQAAAAAAAAAAAQACAwQFEQYSIUExFCIkUWH/xAAYAQACAwAAAAAAAAAAAAAAAAAEBQABAv/EAB8RAAICAQQDAAAAAAAAAAAAAAADAQIFBBESNBMhgf/aAAwDAQACEQMRAD8AmXDKc+TzlWp0DWvf5fIPt0qBymKtRuvwtiGq6XQMM0Q1s/pbFCzWq5KlPXrsjj79H7G9b9rHziBmR5DTsRR6Fd7WmQN0Hkn4VPTbT3lTI9waRK3J8lZOPW41lTEPxSfPztFVW2hG1rR6ARC7E4QTDHvd9bVdvZDvf8XtuCVI81lYm5HtK1sr5QN6Hb0iJrl+0z4D4zrUO5arxtsSNA8BxARESsMP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/dd3e103fa426bae07b59e6d8f78fcdde7edbe1f5-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Jillian S.

**How are you maintaining team culture now that much of the team is remote?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYEBwX/xAAlEAABAwQCAQQDAAAAAAAAAAABAgMEAAURIQYSEwcIFFExQWH/xAAXAQEBAQEAAAAAAAAAAAAAAAAFAwQG/8QAHxEBAAIABgMAAAAAAAAAAAAAAQACAwQRITFxIzIz/9oADAMBAAIRAxEAPwCR9P7gi08WnS1jsWWxhP2c6FabpZrk/aWb3ImteZ1YUphCcFAVobqWuCLhZeIxPlMlkzXUlKFaJ6n6rofLpdwa9P4BixT5nnEebqnJQBusOHh7qnLFL3EN+AktL4xMjuJQ0suJKQrIBGzSqqNdvlxmnSHCSkA5GMfylTb1HRZQpdNQmL3Dx0KetSjkFCR1wfxuupcajtSOJ2wupBPRJJ/ZOKUpWvMKt6zwOXW6Mm8q6I6AoSSE6GaUpXP5j627juXfFXqf/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/57e333b73aae0cf05b5d13a005fbaff179ee46b8-320x320.jpg?w=320&h=320&q=75&fit=max&auto=format)

Alice C.

Now that we can no longer catch up casually like we used to in the office, we’re experimenting with more ways to make the most of our time together virtually. For instance, we realized that stand-ups over Zoom started to feel transactional and almost always ran late now that our team has grown.

We’ve started to run stand-ups in FigJam where we set the timer for ten minutes and everyone puts their update on the board asynchronously. Each person can add stickies or drop in pictures from the weekend, then go to other people’s posts to react, add hearts, or even chat individually. It gives us a chance to catch up on what happened in the past week without needing to go one at a time.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAABYlAAAWJQFJUiTwAAACmElEQVQokX2SS2/bRhRG/VsLdNOiu/6CoJt0V6DopkVaB+hjEados0gTW04M13Yj2HpYlSjR1oukSUokZ/gmJT5OQdnuqujiYC5m7hxg5n57F29LPhyVtI9L2q2SD61iR1P/N83ZY0/x737jaFx7ndMM9TplMUmZKgnj6wClL7kZhszHKQs139HUt8MQdRAwuQ4YNz0DyXycsLjJUQcZV6cZe8OrhLUeIC2b5VRDGc+ZqjN0VcHV5iR+TBrmRJ6LuLvD1m1MzWGlGci1QRrH5FmBu8oZXibsjboJ9tJBUwacvjvm8Og97fMzro4OUP98jVwaRLZHYCk42ghLM7GXLp6uk/pLqjKhpiaQW5Ruei+0dMntRKV1dMzLl7+x//0zvv7yCftfPeXizTs0ZY6uD5gZE0xT4Oghju4QBR5VuaWuawLxIFR6Kc4qRjNMLvsqr/9o8fSLJ3z68Ud8/tkn/PTsObPJHNuzMDwbz08IRIp0Q6IopiiKe6Es7oXjXoplCHr9PidnXS7/6tJ68Qsvvv2G33/cp3NxhvQ84iRCShdfugTSwxcuoXTIEkm5TfFFjtJNGmGGsXR5f3LCr6/eoPyt4i+mBLMJsX1HFgnyLCCJXXxxi3CH+N6QQIwIvAmRmJJFBmItGHUaYT/D1AVvDw/57ofnXHV65HFEnafUxZbNJiGMXFyhY5hdlsYZmnmOYbZZrYZId0YU3OGu5IOwl7K2Qtrtcw4OfmYw6LDZ5NQ1VFVFlucIP8BaO6izOYOJumN4M2OhW3jSJ05iPCelGfBuKNLNEZ6Doc93f1SWJTRhqGu2RUWaFQRhjr1K0I0Y3UgwzBTHzYnTLZttgfQ2jB6n3GSoufx/VFVNWTZUD+t93byi4TE2/wCdu2mnNvOFLQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/fb82ea69809ff467788199b3b6a35163f71517c8-2680x1550.png?w=804&h=465&q=75&fit=max&auto=format)

A recent engineering team status meeting featuring an overview of the team’s active projects, weekend adventures, and "Squid Game," of course

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAEDBgcF/8QAJRAAAQQCAQMEAwAAAAAAAAAAAQACAwQFEQYSEyEiMVFxFDKB/8QAFwEAAwEAAAAAAAAAAAAAAAAAAgMEBf/EAB0RAAICAgMBAAAAAAAAAAAAAAABAgMSMREhQVH/2gAMAwEAAhEDEQA/AN5Zz1njFL8ypGJZpHCNrHHQ+yoxXL72aM8OTbCydmnAx+W6Pv8A1RySOC1x+4yzJHE4eprn/Kx/BLlaMvOQeGdbg1jj438pdlrjNL6OpojOmUvUdCtWHumJ7hA1odI0NIrHS0ID0gucD6vpEeRHicG5fnr93JXas8oMEUpY1oGvC8OGaUaHceQ39QT7Iils2adHUS6xzrO0ZBBDZaY2ga6m7KIiNaFSS5Z//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/2e6253a4d33b6114143cd5a8118768771f61a0fe-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Greg B.

Before we used FigJam, when stand-ups ended we would just leave the call and head back to work. But now we often find ourselves playing games or just being goofy as a team since there’s a canvas right in front of us. Our latest end-of-meeting tradition is a game we call “20-second animal” where someone picks an animal and everyone gets 20 seconds to draw it. It’s a great way to end a meeting on a high note.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAcDBAUG/8QAJBAAAQQCAgIBBQAAAAAAAAAAAQACAwQFEQYSIUExFCIkUWH/xAAYAQACAwAAAAAAAAAAAAAAAAAEBQABAv/EAB8RAAICAQQDAAAAAAAAAAAAAAADAQIFBBESNBMhgf/aAAwDAQACEQMRAD8AmXDKc+TzlWp0DWvf5fIPt0qBymKtRuvwtiGq6XQMM0Q1s/pbFCzWq5KlPXrsjj79H7G9b9rHziBmR5DTsRR6Fd7WmQN0Hkn4VPTbT3lTI9waRK3J8lZOPW41lTEPxSfPztFVW2hG1rR6ARC7E4QTDHvd9bVdvZDvf8XtuCVI81lYm5HtK1sr5QN6Hb0iJrl+0z4D4zrUO5arxtsSNA8BxARESsMP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/dd3e103fa426bae07b59e6d8f78fcdde7edbe1f5-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Jillian S.

**You mentioned that the engineering team is growing quickly. How have your interview processes and approach to hiring evolved since Figma introduced a [hybrid working model](https://www.figma.com/blog/how-work-is-changing-at-figma/)**

**?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAEDBgcF/8QAJRAAAQQCAQMEAwAAAAAAAAAAAQACAwQFEQYSEyEiMVFxFDKB/8QAFwEAAwEAAAAAAAAAAAAAAAAAAgMEBf/EAB0RAAICAgMBAAAAAAAAAAAAAAABAgMSMREhQVH/2gAMAwEAAhEDEQA/AN5Zz1njFL8ypGJZpHCNrHHQ+yoxXL72aM8OTbCydmnAx+W6Pv8A1RySOC1x+4yzJHE4eprn/Kx/BLlaMvOQeGdbg1jj438pdlrjNL6OpojOmUvUdCtWHumJ7hA1odI0NIrHS0ID0gucD6vpEeRHicG5fnr93JXas8oMEUpY1oGvC8OGaUaHceQ39QT7Iils2adHUS6xzrO0ZBBDZaY2ga6m7KIiNaFSS5Z//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/2e6253a4d33b6114143cd5a8118768771f61a0fe-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Greg B.

When we interview candidates at Figma, we want to understand how they would collaborate with us in an architecture or system design exercise. We love white-boarding because we can see how the candidate thinks, and because that’s how teams actually work together at Figma. When we went remote, we swapped the physical whiteboard for a digital one in FigJam. Just like we would before, we share the prompt, watch them solve it, and then talk it through—except now everything happens on a virtual whiteboard instead of a conference room.

To make it easy for the candidate to get started, we’ll start an [open session](https://www.figma.com/blog/introducing-open-sessions/)

and then spend a minute or two showing them how FigJam works if they aren’t familiar. We typically ask candidates to map out a hypothetical architecture followed by writing the code that would make that possible, both of which they can do in a FigJam board. Candidates can use shapes to create the architecture diagram and then write code in a code block that looks just as it would in a code editor. Because the code is already formatted, candidates can code without losing context and quickly spot flaws in their code. And, because everything happens in a FigJam file, we can refer back to the candidate’s work later. We tend to pull up the file when we debrief on the candidate so we can cite specific examples.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAcDBAUG/8QAJBAAAQQCAgIBBQAAAAAAAAAAAQACAwQFEQYSIUExFCIkUWH/xAAYAQACAwAAAAAAAAAAAAAAAAAEBQABAv/EAB8RAAICAQQDAAAAAAAAAAAAAAADAQIFBBESNBMhgf/aAAwDAQACEQMRAD8AmXDKc+TzlWp0DWvf5fIPt0qBymKtRuvwtiGq6XQMM0Q1s/pbFCzWq5KlPXrsjj79H7G9b9rHziBmR5DTsRR6Fd7WmQN0Hkn4VPTbT3lTI9waRK3J8lZOPW41lTEPxSfPztFVW2hG1rR6ARC7E4QTDHvd9bVdvZDvf8XtuCVI81lYm5HtK1sr5QN6Hb0iJrl+0z4D4zrUO5arxtsSNA8BxARESsMP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/dd3e103fa426bae07b59e6d8f78fcdde7edbe1f5-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Jillian S.

**As more people join the team, how are you helping new teammates onboard faster?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAQGBwIF/8QAJBAAAQMDAwQDAAAAAAAAAAAAAgEDBAAFEQYSIRMUIzEiUWH/xAAXAQADAQAAAAAAAAAAAAAAAAABAwQA/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAEDEQIEEmH/2gAMAwEAAhEDEQA/APMTUksp+Z5C4LYL4wD5Ev0lVO63/v5JtyILkMzz09y53Vsb+iu2hE/LKKCNopC5lBIlx6rL2Ytvk6pQLk4oNsIRJn2q44Skzc7ObyaplMPUUXhUltkt7yA24ol64pU2dquZCknHjyRRkFwCbM4SlZajoW52VK960v0+e2sq4OmLZoohldqY/Kj6nusuTIYeJxRcUcqocZpSqqVoUm6ObU+bsVSdwZbl5LlaUpQYD//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/fb4c8ed021278688ddc79c093e6c7c2d6159ac45-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Joey W.

This is something I think about a lot. I tend to be the go-to person for questions about how the app works and who owns which codebase. As the team has grown, we've realized that it's pretty time consuming to explain the interactions and systems behind our apps. In hopes of making this clearer for all involved, I created an interaction diagram in FigJam.

I dropped in pictures of the actual UI, dragged them into the right places, and added connectors to show each interaction. I also layered on shapes like [folders and cylinders](https://www.figma.com/blog/introducing-new-figjam-prices-and-a-more-open-platform/#a-space-for-developers) to represent the services and teams that underly each interaction.

Seeing it all laid out in one place (versus me trying to verbally explain it over Zoom) helps teammates visualize the full picture and make connections faster. The next time they start a project, it’s easy to see how their work intersects with other teams and which systems they’ll need to access. It’s incredibly helpful for onboarding new hires, too.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB80lEQVQokY2SaU9TQRSG+4v1m7/ByCcSl5gI2hpRFCmJtQYjUWIoXShNFwLtjS1LWSK2t9x15t6585g7aMWEoJO8eT+cM89ZZjK1L4JWWbCzJejULtWuhbSqAe1qYLxZ8Y13auFUaf5VNTcFlTVJZmfL5/QwZHwujM7OPJp7+6yVG6zX23zd7rC6UWO92qLW6FIqNWlsdzk+mjA+l9g/pPHhIKSxEZDpdXzciwiVKBKVcOE5fG6UeJjPMf/hNc8/5bm//IynhUVyywvcm71L7mWW/cMDlFIkSUKSKANOJ8pYnQDXiU1AJxrX89iol8kuvWCx8JY3xTxzr7LklhZ48OQRt+/cYmZ2hq7VM3fSo7VmMopoV8MU6ONMomk1IQT9/jcqlTL1ep3SZoli8T2rH1cpFAvMZefJv1vh6Hh42YTWRvbfQDkNpmDXdRmNRozHNsPhMbt7u/SsHv1Bn55lcTQc4gfBFKav61DrS2AKllIiREgcx4RhiOM4eJ5n3LZtfN83hf8bKAKJNwmRfkwUxWYNURQZT8GpXx1X3wRMHyYYx4wtiXsSEwllOjU7VhGxDFCx/JN/IxBNorQBnVQFo64kCn6PlqDld9RFE+VZaPWvHaYj/ALaA8lgzeW0ESA9hU6/RhKTOC2ig8fEp0tocXYt8CdHpi1PRFXEJQAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/4537f48b2e951ba0aef97a4562928763ee560dfc-1340x775.png?w=804&h=465&q=75&fit=max&auto=format)

Just one small section of the diagram Joey made that visualizes the services and teams behind each interaction in Figma’s mobile app

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAcDBAUG/8QAJBAAAQQCAgIBBQAAAAAAAAAAAQACAwQFEQYSIUExFCIkUWH/xAAYAQACAwAAAAAAAAAAAAAAAAAEBQABAv/EAB8RAAICAQQDAAAAAAAAAAAAAAADAQIFBBESNBMhgf/aAAwDAQACEQMRAD8AmXDKc+TzlWp0DWvf5fIPt0qBymKtRuvwtiGq6XQMM0Q1s/pbFCzWq5KlPXrsjj79H7G9b9rHziBmR5DTsRR6Fd7WmQN0Hkn4VPTbT3lTI9waRK3J8lZOPW41lTEPxSfPztFVW2hG1rR6ARC7E4QTDHvd9bVdvZDvf8XtuCVI81lYm5HtK1sr5QN6Hb0iJrl+0z4D4zrUO5arxtsSNA8BxARESsMP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/dd3e103fa426bae07b59e6d8f78fcdde7edbe1f5-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Jillian S.

**It’s no secret that teams have had to evolve the way they collaborate to be more remote friendly. How have you and your teammates approached that adjustment?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYEBwX/xAAlEAABAwQCAQQDAAAAAAAAAAABAgMEAAURIQYSEwcIFFExQWH/xAAXAQEBAQEAAAAAAAAAAAAAAAAFAwQG/8QAHxEBAAIABgMAAAAAAAAAAAAAAQACAwQRITFxIzIz/9oADAMBAAIRAxEAPwCR9P7gi08WnS1jsWWxhP2c6FabpZrk/aWb3ImteZ1YUphCcFAVobqWuCLhZeIxPlMlkzXUlKFaJ6n6rofLpdwa9P4BixT5nnEebqnJQBusOHh7qnLFL3EN+AktL4xMjuJQ0suJKQrIBGzSqqNdvlxmnSHCSkA5GMfylTb1HRZQpdNQmL3Dx0KetSjkFCR1wfxuupcajtSOJ2wupBPRJJ/ZOKUpWvMKt6zwOXW6Mm8q6I6AoSSE6GaUpXP5j627juXfFXqf/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/57e333b73aae0cf05b5d13a005fbaff179ee46b8-320x320.jpg?w=320&h=320&q=75&fit=max&auto=format)

Alice C.

One thing we notice now that we’re remote is that it’s harder to get feedback from people who aren’t on your project team. To counteract this, we started hosting a weekly developer critique (just like a design critique) where engineers can share and get feedback on their ideas from across the engineering team. Engineers who want to participate can sign up in our #eng-crit channel in Slack. When it comes time to present, most engineers will drop their work into a FigJam file and share the link for everyone to join in. Sometimes we’ll [embed code blocks](https://help.figma.com/hc/en-us/articles/4410965151127-Code-blocks-in-FigJam) right in the file so folks can see the code in question. What’s nice about using a shared file is that people can use stickies to give feedback and ask questions asynchronously.

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAALCAYAAAB/Ca1DAAAACXBIWXMAAAsTAAALEwEAmpwYAAACVElEQVQokX2R30tTARTH9/+ESZagy8xEfOwliHqJLBH7JWWUljRSQYJeIogSg6IHCzUf/Jmkmb+2uZat5rbQufljc2xzP+5+3G13995PTJdZmOfweTqHD9/D0Zgm01j0aazzaX78xpji+wHk5rk96x6+zaUxjmfQ2MxJvGspQoEM/k0Ru9XD5MQCoyOGHYb1jAz9YXTYgHHOzro7wpY/QyjPhivFwpyIZtmWJBbNoKoq8XiCj+OT3H/QRu2VBi7VX6em7ho1tTtcvHyV2voGnj7rZMXlRpYVFGWHSEjCakqicdpF4jGJXAlCjO53vZw+c56i0pMUlpRRcEzL4aPHKSjScqiwhCPF5dxsbGbR5tgOoeYRwlmsJhGN05YkLuSFsRg9vf2cPXeBExXVlJ2qRltRhba8ktKySopLKygpr6KxqQWr3b6dTM0Lo7vCPQlFUcQ4Nc2T1lba79ylo62dVt09Wm7XoWu6ge6hjlutzXS8eox5ZYG0nN5fmIhlt4WyJBFccmDv78Yx0IPbYmLRMMRs3yO+fnjJ4qKBAcsgz80vmPB8QpAEUNlfqOZalkl5VwnNDBKdf09600R0bRb37FvW9eP43KtMrc/Q9bOLMc8Y4VQE9UChopAVwiRWZog4OoltvCYZMOC32XFNrOA0eJlbMtHn6GfabiTgEciK/zl592OyRDbhJOnvRgy8QUrYEDbirH6O4p4J417zYnMt49B78ZkTpLZkVGXvl/8VqgpKNoIsWpFFC0omQMKfwWdOErCIJIMScZ+E35Qm+EUiFVT+Ev4CAUfrpEm5V7oAAAAASUVORK5CYII=)![](https://cdn.sanity.io/images/599r6htc/regionalized/66281e3a7339ce84036679e7f0329b8f6d19df84-1340x775.png?w=804&h=465&q=75&fit=max&auto=format)

Engineers give feedback on a technical proposal on how best to handle properties of components

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAQGBwIF/8QAJBAAAQMDAwQDAAAAAAAAAAAAAgEDBAAFEQYSIRMUIzEiUWH/xAAXAQADAQAAAAAAAAAAAAAAAAABAwQA/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAEDEQIEEmH/2gAMAwEAAhEDEQA/APMTUksp+Z5C4LYL4wD5Ev0lVO63/v5JtyILkMzz09y53Vsb+iu2hE/LKKCNopC5lBIlx6rL2Ytvk6pQLk4oNsIRJn2q44Skzc7ObyaplMPUUXhUltkt7yA24ol64pU2dquZCknHjyRRkFwCbM4SlZajoW52VK960v0+e2sq4OmLZoohldqY/Kj6nusuTIYeJxRcUcqocZpSqqVoUm6ObU+bsVSdwZbl5LlaUpQYD//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/fb4c8ed021278688ddc79c093e6c7c2d6159ac45-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Joey W.

What’s great about using stickies, versus going person by person around the room, is that it lowers the barrier for giving feedback, so more people participate. Plus, if it’s a full room, you don’t have to wait to give feedback. Critiquing work async also gives people the the space to form their own thoughts and avoid being biased by the people who speak before them.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYEBwX/xAAlEAABAwQCAQQDAAAAAAAAAAABAgMEAAURIQYSEwcIFFExQWH/xAAXAQEBAQEAAAAAAAAAAAAAAAAFAwQG/8QAHxEBAAIABgMAAAAAAAAAAAAAAQACAwQRITFxIzIz/9oADAMBAAIRAxEAPwCR9P7gi08WnS1jsWWxhP2c6FabpZrk/aWb3ImteZ1YUphCcFAVobqWuCLhZeIxPlMlkzXUlKFaJ6n6rofLpdwa9P4BixT5nnEebqnJQBusOHh7qnLFL3EN+AktL4xMjuJQ0suJKQrIBGzSqqNdvlxmnSHCSkA5GMfylTb1HRZQpdNQmL3Dx0KetSjkFCR1wfxuupcajtSOJ2wupBPRJJ/ZOKUpWvMKt6zwOXW6Mm8q6I6AoSSE6GaUpXP5j627juXfFXqf/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/57e333b73aae0cf05b5d13a005fbaff179ee46b8-320x320.jpg?w=320&h=320&q=75&fit=max&auto=format)

Alice C.

Some of us were a bit nervous to share work at first, but now developer critique is one of our most popular meetings. People love that it helps them reinforce their thinking and see problems in new ways.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAQADAQAAAAAAAAAAAAAAAAcDBAUG/8QAJBAAAQQCAgIBBQAAAAAAAAAAAQACAwQFEQYSIUExFCIkUWH/xAAYAQACAwAAAAAAAAAAAAAAAAAEBQABAv/EAB8RAAICAQQDAAAAAAAAAAAAAAADAQIFBBESNBMhgf/aAAwDAQACEQMRAD8AmXDKc+TzlWp0DWvf5fIPt0qBymKtRuvwtiGq6XQMM0Q1s/pbFCzWq5KlPXrsjj79H7G9b9rHziBmR5DTsRR6Fd7WmQN0Hkn4VPTbT3lTI9waRK3J8lZOPW41lTEPxSfPztFVW2hG1rR6ARC7E4QTDHvd9bVdvZDvf8XtuCVI81lYm5HtK1sr5QN6Hb0iJrl+0z4D4zrUO5arxtsSNA8BxARESsMP/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/dd3e103fa426bae07b59e6d8f78fcdde7edbe1f5-400x400.jpg?w=400&h=400&q=75&fit=max&auto=format)

Jillian S.

**Is there anything you haven’t tried FigJam for yet but would like to?**

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAYEBwX/xAAlEAABAwQCAQQDAAAAAAAAAAABAgMEAAURIQYSEwcIFFExQWH/xAAXAQEBAQEAAAAAAAAAAAAAAAAFAwQG/8QAHxEBAAIABgMAAAAAAAAAAAAAAQACAwQRITFxIzIz/9oADAMBAAIRAxEAPwCR9P7gi08WnS1jsWWxhP2c6FabpZrk/aWb3ImteZ1YUphCcFAVobqWuCLhZeIxPlMlkzXUlKFaJ6n6rofLpdwa9P4BixT5nnEebqnJQBusOHh7qnLFL3EN+AktL4xMjuJQ0suJKQrIBGzSqqNdvlxmnSHCSkA5GMfylTb1HRZQpdNQmL3Dx0KetSjkFCR1wfxuupcajtSOJ2wupBPRJJ/ZOKUpWvMKt6zwOXW6Mm8q6I6AoSSE6GaUpXP5j627juXfFXqf/9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/57e333b73aae0cf05b5d13a005fbaff179ee46b8-320x320.jpg?w=320&h=320&q=75&fit=max&auto=format)

Alice C.

We’ve used FigJam for what seems like everything at this point! That said, I’d like people to be able to hang out in a FigJam file as they work, so they can be in the same space as their teammates even if they are remote. Basically, recreating what it’s like if people are sitting in the same pod just chatting here and there.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAEDBgcF/8QAJRAAAQQCAQMEAwAAAAAAAAAAAQACAwQFEQYSEyEiMVFxFDKB/8QAFwEAAwEAAAAAAAAAAAAAAAAAAgMEBf/EAB0RAAICAgMBAAAAAAAAAAAAAAABAgMSMREhQVH/2gAMAwEAAhEDEQA/AN5Zz1njFL8ypGJZpHCNrHHQ+yoxXL72aM8OTbCydmnAx+W6Pv8A1RySOC1x+4yzJHE4eprn/Kx/BLlaMvOQeGdbg1jj438pdlrjNL6OpojOmUvUdCtWHumJ7hA1odI0NIrHS0ID0gucD6vpEeRHicG5fnr93JXas8oMEUpY1oGvC8OGaUaHceQ39QT7Iils2adHUS6xzrO0ZBBDZaY2ga6m7KIiNaFSS5Z//9k=)![](https://cdn.sanity.io/images/599r6htc/regionalized/2e6253a4d33b6114143cd5a8118768771f61a0fe-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Greg B.

I’ve been curious to try the [CoderPad widget](https://www.figma.com/coderpad-for-figjam/) for whiteboard interviews with candidates. I like that you can see the output of code while you or the candidate write it. It seems like this would be a much more natural way of working through a problem and would help both of us spot errors and address them in the moment.

![](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAUABQDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAQGBwIF/8QAJBAAAQMDAwQDAAAAAAAAAAAAAgEDBAAFEQYSIRMUIzEiUWH/xAAXAQADAQAAAAAAAAAAAAAAAAABAwQA/8QAGxEAAgIDAQAAAAAAAAAAAAAAAAEDEQIEEmH/2gAMAwEAAhEDEQA/APMTUksp+Z5C4LYL4wD5Ev0lVO63/v5JtyILkMzz09y53Vsb+iu2hE/LKKCNopC5lBIlx6rL2Ytvk6pQLk4oNsIRJn2q44Skzc7ObyaplMPUUXhUltkt7yA24ol64pU2dquZCknHjyRRkFwCbM4SlZajoW52VK960v0+e2sq4OmLZoohldqY/Kj6nusuTIYeJxRcUcqocZpSqqVoUm6ObU+bsVSdwZbl5LlaUpQYD//Z)![](https://cdn.sanity.io/images/599r6htc/regionalized/fb4c8ed021278688ddc79c093e6c7c2d6159ac45-800x800.jpg?w=800&h=800&q=75&fit=max&auto=format)

Joey W.

Bug bashes! We recently saw on Twitter that a team is using FigJam to collect and process their bugs in one place. The FigJam team does this today (very meta) but I think the broader team would benefit from this as well. We like the idea of being able to see the full scope of bugs in one view.