---
title: "How Lufthansa Systems prototypes realistic maps for the cockpit with Figma Make "
source: "https://www.figma.com/blog/lufthansa-figma-make/"
publishedDate: "2026-10-22"
category: "design"
feedName: "Figma Blog"
---

When you’re designing flight navigation software for pilots, the stakes are high—in fact, they’re literally soaring at 35,000 feet. At [Lufthansa Systems](https://www.lhsystems.com/), the team designs Lido’s Pilot Apps to run on iPads mounted in the cockpit, guiding pilots and copilots from takeoff to landing at more than 250 airports. At the heart of the app is a dynamic map that needs to show crucial information about flight paths, various procedures, weather, and airport maps without being cluttered. Building prototypes that feel like the real thing, however, has been a consistent challenge.

Last year, Lufthansa Systems started experimenting [with Figma Make](https://www.figma.com/blog/3-ways-product-teams-are-building-conviction-faster-with-figma-make/)

. “Make could leverage both Figma design assets and external data sources at the same time,” says Lead Product Designer Pankaj (Pank) Juvekar. “As a result, we can validate ideas in a more realistic context and get closer to the outcome that users ultimately expect.” We sat down with Pank and Head of Design Kristjan Gomboc to talk about designing for pilots, why maps are so hard to prototype, and how an Innovation Week experiment in Figma Make changed the way they test new ideas.

**Most people hear “airline software” and picture seatback screens. What do you actually build at Lufthansa Systems?**

![](https://cdn.sanity.io/images/599r6htc/regionalized/3861158c9e1191f9b8b88c238bb272e679cc9499-1800x1800.png?w=1800&h=1800&q=75&fit=max&auto=format)

Kristjan G.

We build the software that pilots and co-pilots use in the cockpit, mostly on iPads mounted on the left and right sides. Our Lido product suite covers the whole flight lifecycle from flight planning to taxi, take-off, in-flight operations, landing, and monitoring. More than 100,000 pilots use our Lido Pilot Apps daily to fly their routes safely and efficiently.

![](https://cdn.sanity.io/images/599r6htc/regionalized/387db069e1afe1d3fe2611a59c13c242beccbacc-534x534.jpg?w=534&h=534&q=75&fit=max&auto=format)

Pank J.

The map is the key element of our Pilot Apps. It’s packed with aviation data like airways, waypoints, alternate airports in case of emergencies, and turbulence layers so pilots have increased situational awareness. There’s also the airport moving map (AMM), which guides pilots from the parking stand to the runway.

![Person holding a tablet in an aircraft cockpit, displaying Lufthansa’s Lido mPilot interface with a European aviation map and weather layer controls.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAYHBAj/xAAjEAABBAEEAQUAAAAAAAAAAAABAgMEBQAGERNREgckMUFh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgAD/8QAGhEBAAIDAQAAAAAAAAAAAAAAAQARAgMSMf/aAAwDAQACEQMRAD8AVqTS06liNp1TaRIER9xKBH5QVKJ7/MpepPTKhsqsyax1MRTbPlzNHdBAHyc5Mt58ufL5Jkh19fa1b5StAXVknQdzHE1/hOyPAq3G3WIebk49pUR50X3r45yQFkA97feGbFNpKiSkHDM3Fv2M13P/2Q==)![Person holding a tablet in an aircraft cockpit, displaying Lufthansa’s Lido mPilot interface with a European aviation map and weather layer controls.](https://cdn.sanity.io/images/599r6htc/regionalized/c6cc11bd45b4fc2ef06eddb9f3f584179842f610-2400x1280.jpg?rect=1,0,2399,1280&w=804&h=429&q=75&fit=max&auto=format)

Lido mPilot in action

![A pilot in a cockpit holds an iPad showing Lido’s Pilot App, with a flight route map and vertical flight profile.](data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAALABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAcEBQj/xAAjEAABAgUEAwEAAAAAAAAAAAACAQMABAUGEQcSEyEUMUFx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwT/xAAbEQACAwEBAQAAAAAAAAAAAAABAgADERIhUf/aAAwDAQACEQMRAD8AVOmNFlrnu0KbVXV4iAiyhY9Qy7n04tyheHMybovvKpCQG4hIqYhE2TMvS95SRMuECk4grj6i/ItLoqE23qBMthMOIHMg7c9Y/IN2JPAj1IABa33MkCr2+8tRf8ZlOLcu3HqCNEs0KmFLsksm3uJsVVe+1xBE5Z18l4qpYdYZ/9k=)![A pilot in a cockpit holds an iPad showing Lido’s Pilot App, with a flight route map and vertical flight profile.](https://cdn.sanity.io/images/599r6htc/regionalized/8e5581dfdf2630f99dfd620974d45584c200733f-2400x1280.jpg?rect=1,0,2399,1280&w=804&h=429&q=75&fit=max&auto=format)

**What is it like to build for pilots as end users?**

![](https://cdn.sanity.io/images/599r6htc/regionalized/3861158c9e1191f9b8b88c238bb272e679cc9499-1800x1800.png?w=1800&h=1800&q=75&fit=max&auto=format)

Kristjan G.

At my previous company, getting access to end users was always a challenge. Here, it’s been mind-boggling how closely we work with them. We’ve had more than 100 pilot sessions this year, mostly remote. We also have in-person workshops, and every product designer joins at least one observation flight a year. This means they get to sit in the cockpit and do an observation study during a regular flight.

The good thing is that pilots are very enthusiastic about their work and love to explain what they’re doing, and how they’re doing it. They always provide us with valuable feedback.

The hard part is that you have to be an expert to talk to experts. If you walk into the cockpit asking novice questions, you will lose them. You need to be able to speak their language and have a good understanding of what they are doing. If you ask on-point questions, these interactions can be very fruitful.

![](https://cdn.sanity.io/images/599r6htc/regionalized/387db069e1afe1d3fe2611a59c13c242beccbacc-534x534.jpg?w=534&h=534&q=75&fit=max&auto=format)

Pank J.

We learn a lot from in-house experts, like former pilots and air traffic controllers. I’ve been here almost seven years, and I still learn something new every day. The learning curve is steep.

**You serve hundreds of airlines. How do you design for all of their specialized needs?**

![](https://cdn.sanity.io/images/599r6htc/regionalized/387db069e1afe1d3fe2611a59c13c242beccbacc-534x534.jpg?w=534&h=534&q=75&fit=max&auto=format)

Pank J.

We rarely design for one customer, even when they bring us the request. We’ll show the idea to 10 others to avoid that bias. Airlines differ by region, short-haul versus long-haul, and the fleets they operate. We embrace different airline perspectives without deviating from the end goal.

![](https://cdn.sanity.io/images/599r6htc/regionalized/3861158c9e1191f9b8b88c238bb272e679cc9499-1800x1800.png?w=1800&h=1800&q=75&fit=max&auto=format)

Kristjan G.

Our software sits on top of each airline’s own technical setup and operational procedures. Every customer request or internal idea is a game of balance: How big is the pain point for the industry? Are we in a position to solve it satisfactorily? What’s the minimum we can do to start bringing value to the customer, given our technical and regulatory constraints?

These are discussions we have on a weekly basis, and it’s not always easy. Sometimes we put things on hold because the design and development process shows that the solution we can build now is simply not good enough yet.

**Why has prototyping maps been such a challenge?**

![](https://cdn.sanity.io/images/599r6htc/regionalized/387db069e1afe1d3fe2611a59c13c242beccbacc-534x534.jpg?w=534&h=534&q=75&fit=max&auto=format)

Pank J.

The maps in our app are dynamic, but our design prototypes didn’t always used to be. We went from Sketch to XD to Framer, trying to get a dynamic map, and Framer wasn’t easy for everyone to use. So we mostly relied on static designs and manual prototyping. You can show pilots a screenshot, and they’ll give you feedback, but it doesn’t feel like the real thing.

**How did you start experimenting with Figma Make?**

![](https://cdn.sanity.io/images/599r6htc/regionalized/387db069e1afe1d3fe2611a59c13c242beccbacc-534x534.jpg?w=534&h=534&q=75&fit=max&auto=format)

Pank J.

During an internal hackathon, Innovation Week, last year, in Make’s early days, I wondered if we could get a dynamic map into a prototype. We started with an in-house built web version of our map using Mapbox, a custom mapping platform, as a base layer, sharing the same data as the iPad app. At first, we tried the API from that web version, then an open link, and both worked pretty well with Make. We could use a dynamic map that looked and behaved close to the map in our app.

From there, I brought our top bar, bottom bar, and layer icons into Make. The ability to simply copy and paste designs from Figma files directly into [Figma Make](https://www.figma.com/blog/introducing-make-kits-and-make-attachments/)

made things incredibly easy and intuitive. It removed a lot of the friction.

> The ability to simply copy and paste designs from Figma files directly into Figma Make made things incredibly easy and intuitive.

Pank Juvekar, Lead Product Designer, Lufthansa Systems

**You need to show complex air traffic data on that map. How do you bring that into the picture?**

![](https://cdn.sanity.io/images/599r6htc/regionalized/387db069e1afe1d3fe2611a59c13c242beccbacc-534x534.jpg?w=534&h=534&q=75&fit=max&auto=format)

Pank J.

Showing traffic information on our maps gives pilots even greater situational awareness, and ultimately contributes to safety. After the initial research, we started prototyping this, but it became quite challenging to represent so much dynamic information realistically. It felt like another great use case for Make. So, I connected Make to the OpenSky Network, an app that shows users sample traffic across different flight paths, and told it to show sample aircraft markers only within 500 nautical miles of our simulated position. Tap an aircraft, and you see what pilots told us they wanted: call sign, aircraft type, speed, altitude relative to yours, departure, and destination. It immediately felt more relatable. When we showed pilots, they understood right away.

Then pilots asked for markers in different sizes, like they see in flight-tracking apps. I asked Make to apply Federal Aviation Administration (FAA) aircraft weight classes to the icons: super, heavy, large, small. It was fascinating to see that with just a few keywords, Make understood what I was trying to do without asking me for more information. An Embraer 195 now shows up smaller than a Boeing 737. It became faster to iterate.

**What could you test that you couldn’t before?**

![](https://cdn.sanity.io/images/599r6htc/regionalized/387db069e1afe1d3fe2611a59c13c242beccbacc-534x534.jpg?w=534&h=534&q=75&fit=max&auto=format)

Pank J.

Anything that depends on dynamic interaction. We could find the zoom level where traffic should appear without cluttering the map, because we could zoom in and out and pilots could tell us the expected zoom scale behavior. Together with my fellow cartographer teammate, Agata, we could also experiment with different types of maps, like the AMM, where aircraft on the runway switch color the moment they take off. That’s a regulatory requirement to separate ground traffic from air traffic, and you really need to see it happen. Flight trajectories even showed up as a byproduct of experimenting. They weren’t planned, and they got us a whole new round of feedback.

We went back to pilots again and again, all without touching the implementation. Our apps are built in SwiftUI, and we can’t experiment there every time, so doing that exploration upfront means developers get something much more thought through.

**Was there an “aha” moment when you were working with Make?**

![](https://cdn.sanity.io/images/599r6htc/regionalized/387db069e1afe1d3fe2611a59c13c242beccbacc-534x534.jpg?w=534&h=534&q=75&fit=max&auto=format)

Pank J.

A few. Make connected easily to open-source and third-party platforms through API credentials, even our developer-focused internal ones. The bigger surprise was that you can ask Make for recommendations, not just give it instructions. It suggests multiple approaches, often sorted by complexity: easy, medium, or hard. That makes it more of a collaborative thinking partner, not just a prototyping tool.

> \[Figma Make\] is more of a collaborative thinking partner, not just a prototyping tool.

Pank Juvekar, Lead Product Designer, Lufthansa Systems

**What does Make adoption look like across Lufthansa Systems?**

![](https://cdn.sanity.io/images/599r6htc/regionalized/387db069e1afe1d3fe2611a59c13c242beccbacc-534x534.jpg?w=534&h=534&q=75&fit=max&auto=format)

Pank J.

It felt intuitive. We built templates with our app frame and dynamic map so other designers can start experimenting. Several other design teams now use Make, and we swap ideas on dynamic prototypes and complex business logic that would otherwise take many additional screens. Maps are central across our web, iPad, and desktop apps, so this resonates widely.

![](https://cdn.sanity.io/images/599r6htc/regionalized/3861158c9e1191f9b8b88c238bb272e679cc9499-1800x1800.png?w=1800&h=1800&q=75&fit=max&auto=format)

Kristjan G.

We can’t speak for all design teams, but we see a steady growth of designers working on Lido using Make—to the degree that some projects are Make-only. The biggest benefit is when we’re working with complex interfaces, like map interactions, or data-heavy UI showing particular business logic or app behavior where it would be otherwise hard to prototype and test. Of course, we still have some growing pains, but we are confident these will be solved over time.

**What advice would you give other teams designing for experts?**

![](https://cdn.sanity.io/images/599r6htc/regionalized/3861158c9e1191f9b8b88c238bb272e679cc9499-1800x1800.png?w=1800&h=1800&q=75&fit=max&auto=format)

Kristjan G.

Invest in deep domain knowledge, and expose yourself to users regularly. Our designers and developers are big aviation enthusiasts, and most of our product owners and other internal experts know how to fly a plane. The onboarding is steep, but that’s what lets you have real conversations with your users and solve meaningful problems.

For Lufthansa Systems, the stakes haven’t changed: pilots still need clear, reliable information at 35,000 feet. What’s changed is how early the team can put realistic, data-driven prototypes in front of them. With Figma Make, Pank, Kristjan, and their teams can test ideas with pilots again and again before a single line of production code is written.