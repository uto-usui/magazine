---
title: "Designing Against the Gallery: A Two-Year Journey to a Layered Portfolio Experience"
source: "https://tympanus.net/codrops/2026/05/02/designing-against-the-gallery-a-two-year-journey-to-a-layered-portfolio-experience/"
publishedDate: "2026-05-02"
category: "design"
feedName: "Codrops"
author: "Artem Shcherban"
---

[![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/05/artem_portfolio-1.webp?x95717)](https://artemshcherban.com/ "Designing Against the Gallery: A Two-Year Journey to a Layered Portfolio Experience Demo")

Creating a portfolio for oneself is one of the most challenging tasks for any creative professional. This story isn’t so much about showcasing work as it is about proving to myself that I can create an exceptional project. And so began my two-year journey of creating a portfolio.

The story began with one problematic idea: initially, I didn’t want to present projects in a standard gallery format. I really disliked the idea of gathering everything into a single gallery where attention is scattered among the elements, and each project gets lost. That was the biggest problem I faced.

I started trying things out and experimenting. At first, there was nothing concrete or clear: I came up with the idea of a list—as inconvenient to browse as possible—as well as a 3D gallery. But I quickly abandoned these ideas because, first, they were inconvenient, and second, developing a 3D gallery would have been too difficult. Plus, projects are updated periodically, which further complicates the process.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops___04-1-scaled.jpg?x95717)

I then began to develop the idea of a list, because it seemed like the most appropriate system. But it had a problem: it was difficult to showcase standout projects individually. This issue was resolved later in the concepts, but for the time being, the list of works continued to evolve. Initially, I wanted to present the project as concisely and vividly as possible, so that even before clicking through, a person would understand what the project was and what it was about.

The idea didn’t come right away, but through experimentation, a list-based system emerged that was later used in the final project. It wasn’t perfect, but it already reflected the approach I was striving for. There were many mistakes and challenges related to user experience and development, but I was already beginning to understand the system and the narrative I wanted to create. This was the first step in establishing and structuring the style I wanted to achieve.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops___03-1-scaled.jpg?x95717)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops___02-scaled.jpg?x95717)

The turning point came when I was figuring out how to present the project. I realized I didn’t want the classic format where information and photos are mixed together. It’s inconvenient and doesn’t adapt well to different projects. That’s when the search for solutions began: I needed to showcase the content and provide information about the project without overwhelming the viewer with it. I drew inspiration from modal windows and solutions that present content in layers. The idea of a modal window for the project came to me while I was reworking the layout. I liked that all the essential information could be placed in a small area so that it wouldn’t distract from exploring the project but would complement it.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops___01-scaled.jpg?x95717)

Then an aesthetic question arose: how to make this element noticeable without it standing out from the system, while maintaining the correct hierarchy within it. My colleague and friend Artem Markovsky gave me some advice. He suggested differentiating not only through styling or font choice, but also through typographic size. This approach was very helpful. With these small changes, the system worked as intended. Then the process of developing the project and concept ideas began.

The website project took two years. During that time, six design concepts were created, and the sixth one—the one you see now—became the final version. During the process, I faced many difficulties and psychological barriers because I wanted to make the project very beautiful and user-friendly, and to push myself beyond my current level. Only after accepting the scope and deadlines, and thanks to advice from friends, did I understand exactly what I wanted to achieve and how.

## Tech Stack

My brother handled the development. We built the project on **Webflow**, using **GSAP** and custom JavaScript.

We paid special attention to microanimations and responsiveness across different screens to ensure the most enjoyable experience on all platforms.

## Interactions

The entire design is based on layering—this principle is present throughout. It allows users to interact with the content, explore it, and simultaneously process two streams of information, such as the visual and semantic aspects. The design features 2D depth and layering.

During the process, SVG masks were created for presenting the selected works, as well as for the next project. The panel that reveals information, the expandable contact button, the resume view, and so on—all these elements serve a single purpose: to showcase layering without hindering the exploration of content. Let’s examine these ideas in more detail.

## Home

The main element people encounter upon entering is the homepage. One screen and a video. Simple, very light, and intuitive, yet controversial. I thought long and hard about how to design the homepage, and this was also an experiment.

I immediately rejected the idea of making the homepage a full-fledged page because I didn’t want to overload it. It was important to me that the user decide for themselves what they wanted to see, rather than immediately scrolling down to find the usual content. Maybe that’s wrong, but that’s what I did.

Essentially, the home screen is a hub: it contains all the necessary items and two-click navigation. The carousel provides context and engagement, while the contact modal conveniently connects me and the client with a single click. And if the client needs time to think, they can always select an interesting item from the menu and explore it further.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops___05-Main.jpg?x95717)

## Project Gallery

This is the main, standard system. Initially, I wanted to display projects as a list, but I was worried that this format wouldn’t allow me to highlight top projects. That’s how two radical solutions were born.

The main page for all projects has a clear, simple, and intuitive structure: a pop-up card, project information, and photos. You don’t need to click into a project to understand what it’s about. This isn’t a classic gallery with a single photo: here, there are several images that describe the project from the very first seconds and help you decide whether it’s worth clicking in and whether the project is relevant. It’s convenient as you can immediately explore the projects that interest you.

The selected projects use a different mechanism—the wow effect—with shapes and SVG masks. This is done to add depth to the projects and show that they are more than just design: the projects stand out either for their uniqueness or for the results they have achieved. These are two different systems that coexist in perfect harmony and meet the needs of different audiences.

## Project Information

It is presented as a dropdown menu and follows the same algorithm everywhere. Some fields are hidden if they are not present in the projects. This is convenient: project information is always at your fingertips and doesn’t interfere with browsing.

On mobile, this is implemented with a button at the bottom of the screen for easy clicking. The information fully expands, allowing you to read it, then conveniently close it and continue exploring the content.

At the end of each project, there is a brief summary and a transition to the next project, presented in a unique format with a hover tooltip. Hover tooltips throughout the site feature a slight delay and smooth animation, making you want to see them again and again!

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops___06-1-scaled.png?x95717)

## CV

A simple structure that makes a lot of sense, and it’s very necessary in today’s world. I realized that when you don’t update your projects and resume for a long time, it becomes very difficult to make changes later. I added an updatable summary of all my projects and experience to the site, which can be downloaded with a single click as a convenient document.

This is convenient for me to update the content, and for clients or HR to quickly and easily understand who I am and how I can be helpful. The form is designed to be as concise and simple as possible so you don’t have to scroll up and down or look from one edge of the screen to the other: everything you need is in the center—simple, clear, and fast.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops___07-1.jpg?x95717)

## Blog

The blog is organized into sections: the content is on the right, and general information about the article is on the left. The right side is organized so that it’s easy to read and navigate. For simplicity and quick navigation, a table of contents button has been added to the article, helping users jump to the section they need or find interesting.

There was also the question of how to display additional articles. I didn’t want to use the classic method with a list of articles. So I placed two forms in the bottom right corner and added a hover tooltip that changes as the mouse moves over the forms. To make the changes more noticeable, we added a tilt in different directions.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops___08.jpg?x95717)

## About Me

The “About Me” page contains a couple of interesting elements. One is a scroll video where I fade out of the frame, and a narrative about who I am begins. This effect generated a lot of positive reactions because, right from the start, people are introduced to the person the story is about. Additionally, the page uses a scroll-based form that expands as you scroll, revealing a full-height image showcasing the main design principles. It’s an excellent accent trigger, after which the page transitions to a black style. At the bottom of the page, there is a hover button that appears when you hover over the text in the footer. This is a good example of customer interaction.

## **Architecture and Structure: Organizing Code, Ensuring Performance, and Enabling Scalability**

Essentially, the entire project is based on the structure and architecture of the content and how users interact with it. It isn’t packed with wow-factor effects on every scroll, but it doesn’t need to be. The initial goal was to create an intuitive, user-friendly, and fast system for exploring projects so that people could grasp the main points without even clicking through.

To create a “wow” effect, we added a list of selected works: it’s needed to highlight the best projects and give them special attention. But the main focus was on all the works. We also placed a special emphasis on adaptability and flexibility, so that design elements work equally well on both small and large screens. That’s why the buttons feature icons, and the elements are highlighted with high contrast and are easy to understand. They don’t clash with each other or blend into one another. Special attention was given to development and optimization to ensure the site works on devices of varying performance level.

Branding elements are a story of their own. In the branding, I wanted to create a symbiosis of my minimalist approach and a bold, accent-driven style. Thanks to this approach, we created caps, candles, a lighter, and much more—all featuring designs and styles that convey the message I wanted to convey. The logo was also used on the website in a simplified style to create a focal point and balance the composition, while the branding includes a full-scale version of the logo that works across various media.

At the core of the branding, I wanted to reflect the multifaceted nature and principles that I incorporate into my work. That’s why the final version of the branding includes two logo formats: a large and a small version, as well as media and elements that are completely different in mood and style: items, stickers, keychains, merchandise, and so on. I wanted to bring all the versatility and style I incorporated into the website—including the use of four fonts—into the real world, making it clear, tangible, and physical.

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops_01.png?x95717)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops_02-800x600.png?x95717)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops_03-1.png?x95717)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops_04-1.png?x95717)

![](https://codrops-1f606.kxcdn.com/codrops/wp-content/uploads/2026/04/Codrops_05-1.png?x95717)

## Reflections

In this section, it’s worth addressing the relevance of a portfolio and a website for a creative person in general. It’s truly a very complex and difficult system that’s incredibly hard to build. Going through this process, you begin to understand yourself differently. You learn to evaluate your ideas and messages and work on how others perceive them.

Would I like to redo anything? Definitely yes—the portfolio isn’t perfect and has many issues regarding both design and UX patterns, but it’s my portfolio, and it will adapt to me over time. If I had the chance to travel back in time and start over, I would gladly go through all the challenges I’ve faced over the past two years again. I would just try not to limit myself and design from the heart—not to create a bland website or project that merely generates leads, but to create a visual and a site that you’ll love and get a real kick out of.

The hardest part is getting started and not criticizing yourself for mistakes—that’s probably what I would have done. I hope my project and presentation helped convey everything I wanted to share. For some, the project will serve as a mirror and help them find solutions to their own problems, while others may not like it.

I hope my project and presentation will be useful and help inspire a few more people. I love everything!