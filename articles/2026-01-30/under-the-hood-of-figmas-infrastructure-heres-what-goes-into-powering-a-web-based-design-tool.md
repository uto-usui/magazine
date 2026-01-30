---
title: "Under the hood of Figma’s infrastructure: Here’s what goes into powering a web-based design tool"
source: "https://www.figma.com/blog/under-the-hood-of-figmas-infrastructure/"
publishedDate: "2019-11-21"
category: "design"
feedName: "Figma Blog"
---

At Figma, we believe design tools should prioritize two things above all else: speed and stability.

Designers spend hours each day in the tool painstakingly creating new worlds. They repeat actions again and again, drawing shapes, setting styles, dragging in UI elements from the company’s broader design system. The tool becomes an extension of their mind and needs to keep up with their speed of thought.

The work of the infrastructure team at Figma is important because we’re responsible for the ultimate performance, scale and availability of our collaborative design tool. Most people don’t believe a web-based application can be as fast as a desktop one and it’s our job to prove them wrong.

It’s a big, bold challenge, which is what inspired me to join Figma 7 months ago to lead the infrastructure team. I have a [long history](https://www.linkedin.com/in/samirkgoel/) of working on building large scale distributed systems, first at Google and then at Dropbox.

I get asked a lot about what infrastructure work is like at Figma in comparison. So I decided to offer a peek into how our infrastructure is set up, what challenges we’re tackling and what’s next for our system. We’re evolving it from a simple but operationally intensive back-end typical of a young startup to a more mature system capable of handling our performance and scaling needs. Read on for details…

## [Figma 101](#figma-101)

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAJCAYAAAAywQxIAAAACXBIWXMAAAsSAAALEgHS3X78AAACUElEQVQoz4WRW08TURSF+2v8Fz74YHzyyUuMGnjzweiDmKgxUSOQKJBGxFDAFHqBztBSitISiGCwEk1rpWAvIKWmMC0tTqFgZ6alIVnLM+MP8CT73M8639rbpus6NU1jsVhkPB5nLBajoijUxL7RaHD/t8pYIsnw3DxnZ2cZDocZmpnhhM9H5+goXW43AsEg5z8s4VviO2zmoz91jdmNTfr9fkqSxNXVVf5WVR4dHbFc2ed6eoNLy1H6pwJCwMXBIQfvPLjPC1cu8XJbG/odDi6vfEEqnYGt2WyyLgjFgpI8SZfLY1FEo1Emk0mLVq0ecCufp1v28Wl3F1+8srP9UQfPXDzPszevwjM9xb1KBcfHx7CdnJxYltfW1ukd93F4xMmxMZcQdjESibBQKFA3GlT2yvTKEp91dtLhHOHjwT6eu3eL17qeYDERN9ODk1YLtpboDENHKpWCT5LhcnuwsLCARCKBXC6HWq2GRqOJUqmE4OQkXvf0YMrnhWfcgYf2Ljz3yYhvbZsuUdcbliANw2Amk6E/EKAsy1YOBT5NejMlZpjWhweH2HH7Lp1v+vluYoSjbwcoheeQzRfM+9A03bIsCA2Uy2Wk02mLVFRcHGqCrAFd16zzwo6CXvsArt9oh723D6FQENKEF5H3Ifzc3EDt8BC6eGM7PT2FadsUFiRWmHNzryXGf6I6lOIepMA0ul/2QvYHsLyygqWPi/j6+RO2c1tQVRX1uigK/tPMD01BtVpFLv8LP7JZbOfz2FV2oezuoFRUUNmvoHpwIATr+Au1j1237sfeSwAAAABJRU5ErkJggg==)![](https://cdn.sanity.io/images/599r6htc/regionalized/f9181f95bfaf1ea787da0e6d9eb9e60bdf432d65-1600x759.png?rect=0,1,1600,758&w=804&h=381&q=75&fit=max&auto=format)

For those not familiar with Figma, we’re a web-based design tool (think Google Docs for design). Traditionally, designers worked in siloed desktop applications that only ran on certain types of platforms. If other people didn’t have the tool downloaded and installed, they couldn’t access the work. Designers had to export files and switch to other third party tools for prototyping and developer handoff. As they iterated and shuffled files across these systems, it became easy to lose track of the latest version, making collaborative teamwork painful if not impossible. Very 1990s.

In contrast, each design file in Figma is a living, breathing entity that is constantly evolving. The design lives in the cloud and has a unique URL, so it serves as the source of truth for the entire team. Different people across the organization can collaborate on the design, provide feedback, check in to see how the work is evolving, or flag issues that might occur down the line in implementation.

Plus, Figma has prototyping and developer handoff features baked natively into the tool, so stakeholders can view prototypes and developers can pull data from that same source of truth file. In other words, no more questioning whether you’re looking at the latest version of the work.

To enable effective team collaboration, Figma has a [multiplayer functionality](https://www.figma.com/blog/how-figmas-multiplayer-technology-works/)

that allows multiple people to simultaneously view / edit a file. The files often involve complex shapes and big images, resulting in large amounts of data that must be sent across the network to the backend infrastructure.

Designers come to Figma from standalone desktop applications, and they expect comparable or better interaction performance. Add all these factors together and you have fertile ground for intriguing technical challenges.

## [Infrastructure 2.0](#infrastructure-2-0)

Our infrastructure was built for an early world, when Figma was used by smaller teams. Back then, we relied on simple strategies to build our back-end, enabling us to be very nimble. For example, we loaded all the shared components available to a user in Figma during file load.

This strategy works well when you have access to thousands of [shared design elements](https://help.figma.com/hc/en-us/article/66-components) in your organization’s library, but the back-end system starts to strain as the number of design elements nears 10,000. This kind of scale is becoming more and more common, both as our global user base grows and as Figma spreads across very large organizations like Microsoft and Uber.

So, over the past year we embarked on a journey to build the next generation of Figma’s infrastructure, optimized for scale. Below is a brief overview of some of the projects underway or planned.

### [Speeding up interaction latencies](#speeding-up-interaction-latencies)

As mentioned above, there are still a number of places where the Figma app preloads more data upfront than is necessary to get users into their files. Doing so puts a strain on the back-end, and addressing the problem isn’t trivial — many parts of our product have come to rely on it.

As a result, it’s not just about speeding up the back end — we need to redesign the entire client-server interaction so the client asks for information only as needed. This will require collaborating with other teams at Figma to rethink the user experience. It’s an exciting opportunity — in this fast-moving industry, it’s not every day that an infrastructure team can take such a thoughtful, holistic approach to scaling a product.

### [Scaling the database](#scaling-the-database)

One of things people are most shocked to learn about Figma’s infrastructure is that it’s backed by a single database instance running on one of the beefiest machine in AWS. Surprising, right? We are a big fan of the [KISS design principle](https://en.wikipedia.org/wiki/KISS_principle) and this simple approach has gotten us pretty far. But we’re reaching the limits of what such an architecture can support, so we need to build a new database layer that scales horizontally. This is a big and hairy project, and we’ll need to think through the implications for all the systems and services that rely on the database (which is pretty much everything!).

### [Performance for international users](#performance-for-international-users)

More than 80% of our weekly active users are outside the US. Their interaction latencies are a function of round-trip time to our datacenter in Oregon. To speed up their experience, we want to deploy certain infrastructure components closer to users. As a first step we’ll be strategically placing remote proxies across the globe. Next, we’ll be experimenting with deploying instances of our Multiplayer service closer to our users.

In Figma’s infrastructure, a design file is mapped to one instance of Multiplayer. As we expand internationally, we’ll need to figure out the best datacenter for each document according to user location. Working on a system that spans multiple datacenters makes for fun, complex problem solving.

### [LiveGraph](#livegraph)

Our most ambitious undertaking is a schema-based, real-time database system called LiveGraph, which is inspired by GraphQL. Our goal with this project is to make it easier for engineers across Figma to build new responsive features in our tool. Currently, our developers must build specialized backend and frontend systems for each one.

LiveGraph obviates the need for that by detecting relevant changes in the underlying database, filtering updates based on client’s access permissions and pushing relevant updates to the client in real-time. In other words, it allows a client to subscribe to a query and receive push notifications whenever the results of the query change. Over time we expect it to become a core part of our infrastructure that powers several features such as relaying new user comments, newly published design elements, etc.

## [We’re hiring!](#we-re-hiring)

These are just a few examples of the kinds of systems we will build along the way towards a more mature infrastructure that is performant and scalable. We’re also containerizing our services, offering APIs for our customers to built custom workflows around Figma, etc. Of course we continue to be responsible for security, our machine footprint in AWS, and continuous integration / deployment system.

Shaping the evolution of a company’s infrastructure is one of the most educative experiences one can have — you not only get a chance to rebuild core components from scratch but also learn to brutally prioritize the investments you make due to finite Engineering resources. We’re a small team, so you can have a big impact and get hands-on experience designing and building a lot of different systems.

If any of this captures your interest, we’re building out the infrastructure team now. Check out our [open roles](https://www.figma.com/careers/).