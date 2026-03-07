---
title: "The great transition"
source: "https://danielmiessler.com/blog/the-great-transition"
publishedDate: "2026-03-06"
category: "design"
feedName: "Sidebar"
---

[![The Great Transition—multiple streams converging](https://danielmiessler.com/images/the-great-transition.webp)](https://danielmiessler.com/images/the-great-transition.webp)

I'm going to try to encapsulate a whole bunch of stuff that's going on right now and wrap it into a single container. It's actually very difficult to do because there's so much change, and things are getting crazier every single week, every single day almost.

I've noticed a whole bunch of transitions happening at the same time, and I'm calling it the great transition. It's really many smaller transitions, but they have a theme and a direction. And I think I know roughly where they're going.

What I want to give you is something where if you think about all of these ideas and just let them stew, the news that comes out over the next weeks, months, even years will just make more sense. You can put it into this container, this mental model of thinking about things.

## Knowledge goes from private to public [​](#knowledge-goes-from-private-to-public)

There are a few different things making this happen. One is just LLMs in general, AI in general. The concept is that it consumes all the stuff from the internet—all the books, all the blogs, forum conversations—all this training that's been done on these models. All of that condenses into a model that's kind of representative of all this knowledge. Everybody kind of knows that already.

What's not so much understood is what this is actually doing to knowledge work.

In the past, going back 10, 20, 30, 50 years, if you were an expert in something, you had knowledge that no one else had. If you were a specialist consultant at McKinsey or you were a heart doctor or whatever, you had special knowledge. And you hadn't captured even a 10th of it. Let's say you've written two books—you still haven't captured a 10th of your knowledge. You just know things that other people don't. If you're a security professional who's been doing this for 20 years, you just understand things. If you're a CISO that's done this multiple times, you just understand things and get things that nobody else has. And importantly, it's not in a book somewhere. Even if you've written books, your knowledge is still not fully in the books.

That has always protected smart people—the ones with both the smarts and the experience. That combination has made them very special.

What is happening now is completely changing that.

Especially with skills—this whole concept that [Anthropic](https://www.anthropic.com/) came up with. We're talking about a folder full of markdown files that can encapsulate a decent amount of your knowledge. You still have the capture problem where they don't know exactly what to say, how to capture it, but here's the situation: many, many smart people are producing skills and many, many other smart people are going to collect specialized knowledge from all over the internet, anywhere it's been written down, and bring that into a skill. Plus all these specialist people—they're writing books, doing presentations, writing blogs, doing interviews, doing podcasts.

In the past we'd never had a system that could basically say, go get all of that. Go get everything Dr. Huberman has ever said about health or morning routines, bring it all together and turn that into a skill. This is one prompt. Find everything Huberman has said about morning routines from every podcast, every blog, every article, every interview and put that into a skill. That new thing combined with the models just getting better—it feeds on itself. The model then can consume all those skills.

The gap between specialized privatized knowledge—inside of someone's mind, some specialist doctor, some specialist psychiatrist who's been doing this work for 40 or 50 years—the delta between what they know and no one else knows is getting smaller. That is massively impactful for humanity in general.

Then there's another layer on this. All of that is being consumed by these labs who are spending billions of dollars bringing that knowledge into the models. But what we just saw from Anthropic—and this is happening all over the place—a bunch of Chinese labs are doing it in mass, very organized. China is known for doing this. They are famous for stealing ideas and stealing content.

They're also massively going all in on open source models. I believe they have a very clear strategy: you don't have to compete to be a pinnacle lab. They don't have an Anthropic. They don't have a Google DeepMind. They don't have an OpenAI. But they do have [DeepSeek](https://www.deepseek.com/), and DeepSeek has been called out for doing this for a very long time. They are capturing the knowledge of all the billions of dollars of work and bringing it into open source.

What they are doing as a Chinese strategy for AI is releasing it, diffusing it, absorbing it into the pool. You've heard the metaphor peeing in the pool. Our specialized knowledge—what specialized humans could do that no one else could do—that is the pee that's going into the pool. You can't pull it out. It's just going to be in there.

And the techniques that make those premier labs better—those are also being diffused. Somehow when the major labs have a major advantage and jump ahead, the Chinese models seem to get it a few months later. The specialized knowledge is being diffused into public domain. That's just a transition that's happening.

## Products go from standalone software to APIs [​](#products-go-from-standalone-software-to-apis)

I talked about this in [my book from 2016](https://danielmiessler.com/blog/the-real-internet-of-things)—basically said that **[businesses become APIs](https://danielmiessler.com/blog/mobile-ai-digital-assistants-business-apis)**. And we're finally now starting to see this.

All these people releasing tools, models, functionality—a company that does remove background, Excalidraw just came out with a new piece of functionality where you could just describe what you want to make and it will build all the different objects for you in your favorite fonts and your favorite aesthetic. It'll just build you diagrams.

My first question when I saw this was hold on. I went and looked at the documentation and it basically said you just go into the interface and type into Excalidraw what you want. And I'm like, what are you talking about? Do you honestly think in early 2026, I'm going to open up Excalidraw and type in a prompt? Are you kidding me?

So I posted: this looks amazing. Looks fantastic. There's no way I'm going to use it. Can you make this available as an [MCP](https://modelcontextprotocol.io/)? Can you make this available as an API? I'm not going to do any of this ever. **If I have to open an app, I've already lost.** My AI should be doing all of this for me.

When I posted that on Twitter, a whole bunch of people showed up and they're like, yeah, a hundred percent. I need an MCP for this. Otherwise it's not useful.

That is the way everything is going. If you notice, most of the releases coming out for products now, they're like, here's the MCP for it. Here's how your agents can do this automatically. This is just becoming the new way to release software. And this is heading in the exact direction that I put in that book in 2016: businesses become APIs.

## The consumer disappears—your agent decides [​](#the-consumer-disappears—your-agent-decides)

Why is this important? Because the consumer is not so much making the choice anymore. The consumer is not going to be like, hmm, yeah, there's 47,938 different options for removing backgrounds from images. Let me pull up GitHub and Google and spend two and a half hours sampling and trying different ones. No—there's too many apps. And because of AI, there's too many apps being made right on top of that. There'll be hundreds more of these things coming out all the time.

The only way this resolves is there are directories. If you have a background remover tool—by the way, my favorite is Remove BG, and they have an API. That's what my system Kai actually calls.

If you have one of these agents, there will basically be orchestration layers, directories of services labeled and categorized—taxonomy, folksonomy, whatever—saying if you want to remove backgrounds from images, here's your list of 27,000, but they will be rated. Different services with different ratings. And my system Kai will know which services it prefers. He's going to select the highest rated one with the most ratings, the least negative ratings, whatever algorithm Kai wants to use. Pulls that in, drops it into our workflow inside of our skill. That's it.

Where's the website? Where's the website for remove background? Who needs a website? This is a directory service, like the old days, like Yahoo directories. It's already been rated. My agents are going to check those ratings and find the API and integrate it.

This old way of making the software, packaging it, oh, it's got to have a nice UI, a nice website—when the person comes to the website, they got to really like it, then they click the buy button—it's all going away.

## Interface and SEO are dying [​](#interface-and-seo-are-dying)

This is tightly coupled with another transition: interface is going away. SEO is going away.

Interface used to be for humans. We make software, we have services, and we have to have an interface for that. Not just the interface you use day to day to interact with it, but also the marketing and documentation interface. Front end in general is going away. It's not that the content won't be there. It's that it will be designed to be consumed by agents. AI will be the main consumers.

**Everyone gets a digital assistant**—I wrote about this in [_The Real Internet of Things_](https://danielmiessler.com/blog/the-real-internet-of-things) in 2016. Everyone gets a digital assistant, **everything gets an API**.

> Every object has a daemon—an API to the world that all other objects understand. [The Real Internet of Things](https://danielmiessler.com/blog/the-real-internet-of-things), 2016

Our AI, because it knows us so well, when we make a request, it goes and gets the thing from the API and brings it back to us.

When we want an interface—I'm buying shoes, I want to see what they look like—our AI will be presenting the interface to us. People are already building bespoke software. Custom software is the direction it's going. Software goes from everyone using the same packages to everyone getting bespoke software.

The core part of your business, the core part of your product is the API, which will be used by the agents of the consumer. And the interface will be between their agent and them. That's the interface.

SEO goes from trying to attract the user to trying to attract the user's AI. When I say, hey, I need a new mattress, I'm not saying that to the internet. I'm not saying that to Google. I'm saying that to my DA. And my DA knows my sleeping habits, knows my routine, knows if I like a firm mattress or a soft one, knows my girl likes a softer bed, I like a harder one on my side.

Your agent knows you, therefore it can do smarter queries for you. But the point is it's the one doing the queries. If it's going to be tricked into picking one mattress versus another, the tricking needs to happen at the AI layer because I'm just going to do whatever my agent tells me. The agent's going to be like, yeah, I found the best one. It's this much. Do you want me to get it for you? I'll have it here tomorrow. And that's the end of that.

## Enterprise: the graph of operations [​](#enterprise-the-graph-of-operations)

Much of the same stuff happening on the consumer side is also going to happen on the enterprise side. And those changes are massive. Absolutely massive.

One of the big transitions is going from humans creating processes and following them to AI running the business based on SOPs—basically building out a graph structure of all the work that needs to be done.

I did [a post in 2024](https://danielmiessler.com/blog/companies-graph-of-algorithms) talking about how companies are just a graph of APIs, a graph of operations. Take the insurance example: you have to look at photos, look at their account, they're making a claim, you need to filter for fraud. Is this legit? Does the picture look real? Do they have a real account? Are they making lots of claims? Does the account look compromised? All these different things. And if it looks legit, here's how much we're going to pay you out.

That's the type of thing where, currently in the enterprise, there is not a graph that the CEO could look down and say, **this is my entire business**. This is every task happening in my company and the process of how it's done. The SOP—standard operating procedure—for how this thing is done.

AI is going to have this for every company. That's the major transition, and it's just now starting. It's very slow. Much slower than all the consumer adoption we've seen over the last couple of years.

> You've probably never seen your company in this way, but AI soon will. [Companies are a graph of algorithms](https://danielmiessler.com/blog/companies-graph-of-algorithms)

In the past, people were basically the company. The people were doing the work. Yes, they had documents. Yes, they had processes. But it's the people doing the work. They're supposed to follow this policy, but it's just a doc. Do they follow it? Not really. The main person who maintained them went on maternity leave and never came back. Those docs get old. Nobody's following the policy.

That is completely different than an AI saying, I now own all these SOPs. Here is the map of all work that's being done. Humans are still there—humans are the ones responsible for improving the AI, for telling the AI, hey, we need to change this SOP. You have a conversation with the AI, it makes the change, all the documentation is updated, all the SOPs are updated, the cross references are updated. That is the new model for business.

Now a software vendor comes in. Before, they would bring their salesperson, take someone out to a steak dinner. Yeah, it does background removal way better than anything else. If they convince this person and the manager and procurement, they buy it. It's humans buying software. Software is a package sitting on a shelf.

In this new model, this graph system includes all the tools. The conversation becomes completely different with the software vendor. Here is my map. Here's all the processes, all the work, every single workflow. What are you replacing? What are you doing better? Click on the node for background image removal. Here's the metrics—how fast it is, how cheap it is, how many times it failed, how many times it succeeded. Now what are yours?

They're going to have to produce metrics that say they can do that function better. It's no longer about a software package that some human is buying and maybe they use it, maybe they don't. It's an AI saying, here are my metrics for this function. Can you prove that your metrics are better? That's a completely different way of thinking about software.

## Automation goes from helper to replacement [​](#automation-goes-from-helper-to-replacement)

The transition here is automation going from a thing that helps humans do their jobs better—improves productivity and efficiency—to being a way for companies to get to their ideal state of being able to do all the work themselves.

This is colossal. This is economy changing. This really is the end of labor.

There's labor and there's capital and these have always been in balance. It gets disrupted because companies have always wished they could do all the work without employees. If you're a single founder and you don't have much work to do, you do all the work yourself, you get all the profits yourself.

If your business is washing clothes and you buy a washing machine—before, you were doing it by hand in the river. You weren't making that much money. You saved up for a year and bought a washing machine. Now you're able to do way more clothes and make way more money. If a whole bunch of people come to you and say, hey, I can also wash clothes in the river and you need to hire me because that's what's fair—you're going to be like, are you kidding me? I can do all this work myself. I literally am doing all the work myself.

If I have a clothes washing business and I have 10 washing machines behind me, that is me doing all the work myself. That is the transition that is happening. That is what AI is.

The total amount of compensation that knowledge workers receive is somewhere around **$50 trillion per year globally**. I think it's somewhere around $10 trillion for the US. That is how much money companies are spending to pay humans. And the major transition here is they don't want to be paying those humans. They actually never did.

There are exceptions. If you're a small spunky founder and you want to work with your friends—you build a small startup, you're all kind of owners at that point. You'll still have elite employees, cadre, co-founders. That's not going to go away. But we're talking about going from tens of thousands of employees to a few hundred, maybe eventually a few dozen. Massive reduction because of this different way of thinking about automation. It's not a thing that helps a human do a task. It is a way to get to the state of the company doing the work itself, which is a natural, clean, happy state for any company.

## Human 3.0: the post-corporate world [​](#human-3-0-the-post-corporate-world)

So what are we supposed to do? If everyone gets fired, who's going to buy all the stuff?

There's going to be money. People are going to receive money to pay their bills. Otherwise you just don't have a society. That will get solved one way or another, hopefully gently and fast.

But the question is, how's this actually going to happen? What are people going to do? How are people going to work?

The transition is going from work meaning you work for a big corporation to work meaning you do things yourself. You have offerings yourself. You produce value yourself and you broadcast that value out.

What's going to happen is there will be a technology layer that links people. It links projects with services. It links people who have capabilities with those who need them.

Instead of people working for companies en masse—because those companies are trying to get rid of everyone—we're going to make money by producing value ourselves, by articulating the skills that we have, the capabilities that we have, the products that we provide, the services that we provide, broadcasting that out. That is going to go up into one of these directories, like I talked about before with products that AI can look at. But this will also be the substrate for all work to be done.

Humans will broadcast their capabilities. I'm a systems engineer, eight years experience, here's all the different stuff I can do, here's my portfolio. By the way, I like to mountain bike. This is your [daemon](https://danielmiessler.com/blog/launching-daemon-personal-api). This is your broadcast system, describing the people you've worked with, your reputation score, people give you upvotes—kind of similar to what LinkedIn was doing, but this is the actual play.

There's a substrate that connects all these different people. When I need a cat sitter because I'm going on vacation, I broadcast out, hey, I need someone to watch my cat. My AI is broadcasting that for me. Everyone's AI is watching the substrate. Someone's like, hey, I'm a cat person, I love cats, I live two blocks away. Her AI tells her, there's a cat sitting job over here, it's going to pay $84. Do you accept? Boom. Yes.

Someone injured themselves on the corner. Does anyone have medical professional training? EMT skills? It's going to beacon for people nearby who have a reputation score above a certain threshold. Someone takes the job. They go help the person.

Same for gardening, engineering services, tutoring, meal prep, personal training. Everyone who has services, capabilities, value to offer—they are beaconing out onto this system.

> Humans and objects will broadcast daemons around them, advertising their attributes and interaction capabilities. [Universal daemonization](https://danielmiessler.com/blog/universal-daemonization-future-internet-iot)

That is what I'm calling Human 3.0. It's the state we're going to get to.

I love this because it's more human focused. It's humans connecting with humans. It's not hierarchical—I work for Sarah, Sarah works for Joe, Joe works for Raj, and oh I'm having a meeting with Raj, oh my God he's three skip levels above me. This whole military structure, this whole dreading Monday—it's toxic and poisonous. And it has been for decades, people have been so unhappy with this. And now that it's actually under threat, people are like, well, don't get rid of my job. Don't fire me. Because they're worried about losing their livelihood, paying rent and a mortgage and school and groceries. That's understandable. But remember we shouldn't be clinging to a thing we hate and have hated.

This new human-based substrate where things are a lot more equal: you get hired based on your skills. That's a relationship you can get out of any time. You can be in multiple of these—ongoing retainer type things with 20 different customers. You're on a big project for six months getting paid from that. Plus you're doing the cat sitting. Plus you're a part-time EMT at night. You're broadcasting everything that you are. Not just "here's my resume, I'm a tech engineer level three, I worked at Intuit." That is not you.

What this is going to allow us to do is broadcast our full selves and be compensated and rewarded for being ourselves. If you're the best nurturer in the world, forget tech skills—the best listener, the best parent, the best tutor, the best boxing coach—that's in your daemon. That is broadcasted. They become world famous for that. And they make money from it, which they should. This is how humanity should work.

## Cybersecurity becomes AI vs. AI [​](#cybersecurity-becomes-ai-vs-ai)

Similar to a lot of the other things we've already talked about, cybersecurity has been human based. You hire a human team. They are good security engineers. They're doing pen tests, security assessments, vulnerability assessments. They're manually looking at all the different vendors trying to figure out which ones are dangerous. And they're just being bombarded by all these requests.

What security becomes now is your AI stack as a defender against the AI stack of the attacker. And unfortunately you're not facing one attacker. You're facing all the attackers.

The attacker is trying to understand your company extremely well. It's creating personality profiles on all your employees. It's coming up with the best spearphishing campaigns to find the ones who probably have the most access based on their job title. It's constantly pulling your DNS. It's trying to see if you're doing a merger and acquisition with a company that doesn't have good security. They're sending spearphishing emails. They're trying to compromise all your websites. They're trying to pivot internally. And they're doing this at machine speed. They've just got so many agents working on this, constantly hitting you.

You can't tell Chris and Raj and Sarah, hey, great job last year. I need you to do 895 times as much work because that's how many more attacks we're being hit with. That doesn't work. You also can't say, great news, we got three more headcount. That also won't make a dent.

**Your only chance is to have the same AI or better as the attacker.** What happens to all companies also happens to security programs. It's no longer about here's our security team and roughly the things we need to do. SOPs. Everything is a process and workflows which you could visually look at and see—this is the queue for processing incoming things, here are the constant workflows for finding insider threats, here's every single tool, every single decision point, every single approval point that needs to happen as part of CI/CD before something goes live. Everything becomes transparent, visible with discrete actions and decision points at each area.

And the game is: are we getting that context updated? New AWS account just stood up. We launched a new service in Asia and Iceland and Seattle. How quickly are we as a security team learning about that? As AI starts spinning this stuff up for the attackers, they're going to build a world model of these companies faster than the company has it. Because the company has to go slow—they have to have 19 meetings to prepare for the meeting. Attackers are just going to YOLO it, submit the single prompt, make no mistakes and start attacking.

The transition is from humans doing security work to a unified workflow model with SOPs executed largely by agents, with humans there to tweak and improve and guide and steer and validate. The game is for your orchestration system to be better than the attackers.

## The inversion: industries become use cases inside AI [​](#the-inversion-industries-become-use-cases-inside-ai)

This next one is a way of thinking about enterprise AI in a completely different way. I [put this out about a year ago](https://danielmiessler.com/blog/weve-been-thinking-about-ai-all-wrong), and I think it's really powerful as an inversion.

Currently—and even still now—everyone is thinking, okay, we have security, we need to put AI on it. We have finance, we need to put AI on it. We have HR, we need to put AI on that. So the idea is you have the discipline, the topic, and then AI gets sprinkled on top.

I don't think that's the way to think about it.

I think the way to think about it is: you have a company and the company's work and all its workflows and the graph of all the services and tools and operations, SOPs, goals, everything. That is actually the system. The system is the graph of operations. It is the graph of algorithms that take place to make this business function. Think of AI as a system for running this graph of algorithms. That is what AI is.

Then the question becomes: show me procurement. You look at this graph and 19 different lines all light up—those are the procurement workflows. We can drill into those. Here's the tools. Here's the human involved. Here's the decisions. Here's the sign-offs. Here's the exceptions.

What ends up happening is all the different things that used to be industries become use cases inside of AI.

Some of these are security, some are HR, some are engineering, some are marketing. AI is the container. AI is the thing. And it just has functions that happen to be affiliated with what we used to call industries. That is a fundamental transition.

If you abstract everything to questions and everything to algorithms—"how happy are our employees?" or "how much money are we spending on compensation?" or "should we pay more for bonuses?"—those are questions. Those questions are not an industry. They just happen to be associated with what we used to call an industry. All of it feeds off this underlying unified context and graph of algorithms, powered and managed and orchestrated by AI.

## Custom everything and the fragmentation problem [​](#custom-everything-and-the-fragmentation-problem)

In the past, you had very few organizations producing software. Adobe was on top. Microsoft was on top. You go into any enterprise, they're mostly running Microsoft or Google. I think that might start to go away.

It's not that these major platforms won't still have a stronghold. It's just that the implementation of their software isn't going to look the same inside of all these different companies. For smaller companies that aren't legacy, their software stack could look completely different from another startup maybe even doing the same sort of stuff, just because the founders will be like, yeah, I like terminal style, I don't like UIs. I want everything to be API based. I really like the color purple.

We're already seeing this with custom replacements of tons of different SaaS software. It's really easy to create a version of something. There's a big difference between that and having it roll out enterprise-wide, stable and secure. That'll take a couple of years to work through. But there's a very high chance that companies and consumers will be making their own software.

Let's be clear: there's 8 billion people on the planet, not everyone's making their own software. But consider that in 2019 or 2022, the number of people who made software products was rounded down to zero. Everything in the app store, every software company, rounded down to zero. If you multiply that by 1,000 or 10,000 or a million, that is a lot more software. Plus the ability for someone to speak to their AI agent and say, hey, I really wish I had a workout app, it's $19 a month, it's pretty good, but I wish it did this, this, and this—and boom, it's now installed on your phone, the other one's uninstalled, the subscription is canceled.

Every CFO is looking at their software list and saying, how can I cancel all of this? Just like the employee thing—how can I get to zero employees? How can I not pay any other company for software? How can it all be ours? Everyone wants this. We couldn't do it before because it's hard to make software. You got to maintain it. The better AI gets, the easier that gets.

This ties into something Robert Putnam talked about in _Bowling Alone_ in 2000. When you have fragmentation like this across companies but mostly across people, it's going to be profound. The reason the country was so unified before is that we were all watching the same TV shows, the same news, drove the same cars, had the same watches, went to the same churches, lived on the same block. Everyone's consuming the same sources, thinking similar things, reading the same newspapers.

When everyone gets custom software, custom AI—you're not even viewing the sources. There's millions of them. Billions of them. Your AI's job is to consume all of that, understand you, understand your needs, and give you what you want. That opens up the possibility that all of us will be having a different world experience. We believe the reality that we see.

If you watch a particular news source, particular YouTube channels, particular podcasts—you think the world works that way. That is your world. That is reality to you. The person next door might be in a completely different reality. They might not even know about the most popular thing that happened yesterday. This fragmentation because of custom everything is going to be massive.

Inside companies, the dynamic is strange. How do you audit software? How do you do security scans? How do you do compliance? It's a lot easier when everyone has SAP and Microsoft 365 and CrowdStrike and Palo Alto firewalls. What happens when everything is custom?

## Ideal state management: the biggest idea in AI [​](#ideal-state-management-the-biggest-idea-in-ai)

I've saved this one for last.

I think the ultimate use case for AI is what I'm calling **ideal state management**—or state orchestration. I've [written about this before](https://danielmiessler.com/blog/nobody-is-talking-about-generalized-hill-climbing). The real term will be created probably in the next year or so.

What we've been doing inside of companies, what we've been doing as people, what we've been doing as a society is just kind of YOLOing. This is what we've always done. This is what humanity does. Companies are like, hey, we should have goals, we should have OKRs, we should have a meeting, we should plan the next year. Those documents go somewhere. Maybe they get revised, maybe they don't.

If you track a company's goals for an average medium-sized company over the course of a year or five years or ten years, they're just making stuff up. It changes constantly. The management changes. They come out with a set of metrics. They don't hit them. They come out right after with a new plan, a new hire who's going to be amazing, new metrics. Constant reinvention—not because of innovation, but because we're winging it. This is no fault of anybody. Everyone's doing it. Very, very smart people are doing it. It's just the reality that we live in.

This is one of the fundamental changes AI is going to bring. I think we're about to move away from this ad hoc YOLO approach to something much more powerful: state management.

State management starts with defining what ideal state is. This is a thing that most companies do not have. They don't have an articulated statement—kind of like a PRD document with multiple SOPs revolving around it—that says: here is our actual mission, here are our actual goals, here are the problems we are trying to solve in the world, here are our challenges, here's our risk register, our projects, our budget, our people. This is your unified document. This is your system. This is your algorithm for what you're chasing.

This being locked into the core DNA of the company and everything revolving around it—that graph of algorithms needs to be feeding this system. This very well articulated ideal state is about to become the most important thing for companies, but also for anything. For organizations, for entities, for people.

I've been using a system like this for probably 10 years, and there wasn't any AI. You don't need AI to articulate this and start moving towards it. It's very powerful. Forget any tech—just note cards, index cards, a space pen. You're off and you're going to have massive benefits from doing this.

Here's where the AI comes in. Here's the game. This is the universal game. If we meet aliens flying around the galaxy and we tell them this, they're going to be like, yeah, that's what everyone does. How do you think we got here? How do you think we have all these spaceships? How do you think we have Dyson spheres around all these stars? That's obvious. That is the algorithm.

The algorithm is: we have ideal state. What is our current state? That's step two. Your AI and all the different agents and systems—it's not all AI, this is deterministic code as well—what is the current snapshot? What is the current state of our problems and our solutions and our products and our services? How happy are our people? How happy are our customers? What is the current churn number? What are our competitors about to release? What are the market conditions? Snapshot.

This works as an individual trying to lose 20 kilos. An individual trying to increase their VO2 max, trying to find a wife, trying to get their art exhibited at MoMA, trying to come up with new EDM tracks so they can play live at EDC. Trying to run a federation of planets 9,000 years in the future. Anything you're trying to do at any scale can be managed by ideal state and current state and the migration. This is extremely powerful.

I have this thing inside of the [PAI](https://personalinfrastructure.ai/) platform called [the algorithm](https://danielmiessler.com/blog/the-last-algorithm). I literally start the algorithm by decomposing the prompt that comes in and turning it into reverse-engineered ideal state components. I break out the pieces. I look at the context from the user and do deep analysis and research. What do they actually mean by this? What do they explicitly say they want? What do they explicitly say they don't want? What are some common gotchas? All that gets decomposed, reverse engineered, and I start creating ideal state criteria. These go into the PRD, and it's all working off of ideal state.

Engineering can be run this way. Companies can be run this way. You managing your entire family's happiness. Hey, I'm looking at the dashboard—looks like they haven't had enough vegetables. I'm going to tell my AI to order more vegetables. Hey, we haven't gone on a vacation together in a while. Hey, I noticed we were looking at our phones too much at the dinner table. My AI notified me about that. Let's make sure we do vacations with no tech involved. We're focusing on human things.

If you're running an ice cream truck business, a federation of planets, or you're just trying to find a boyfriend—all of this can be managed the same way.

I got this from [Andrej Karpathy](https://x.com/kaborpathy): you can't hill climb, you can't progress towards something if you don't have failures, if you don't have a thing to hill climb against.

> Software 1.0 easily automates what you can specify. Software 2.0 easily automates what you can verify. Andrej Karpathy

My ideal state criteria in the algorithm turn the ideal state into verification criteria. They're all discrete and verifiable. Yes or no. That's what gets us to verifiability, and that's what ultimately allows us to go from current state to ideal state.

## The mental model [​](#the-mental-model)

I consider all of this combined to be the great transition that is happening to all of us right now.

My goal is that when you see the news—new models, new capabilities, workers being replaced—you can put it into this framework and say, okay, that's not new, that fits. It shouldn't produce as much anxiety if you can see where it's all going.

I think this transition model with all its sub-transitions works as a mental model container. If you understand this, you're much less likely to be surprised. Who knows how it's going to happen, when it's going to happen, which company is going to do it. You can't predict that stuff.

I also really worry that all of this could coincide with a significant economic downturn. Automation combining with macroeconomic factors—it's not my area of expertise, and there are too many variables to say anything with confidence. It could hit in just a few months in 2026, or it could be in 2028 or later, or it could be a soft landing and not really be that bad. My best guess is somewhere around 2027 or 2028, which is unfortunately right when I think all of this AI impact is about to hit with full force as well. I [wrote about this concern](https://danielmiessler.com/blog/im-worried-it-might-get-bad) recently.

But the direction is possible to see. And that gives you a container to be like, okay, this all sort of makes sense inside of this framework. So you're not spooked out by all these new models and products coming out. If you have this mental model, you're more likely to just say, eh, yeah, that seems to be the way it's going—and you can buckle down and move forward.

## Summary [​](#summary)

1.  It's not one transition, it's many—all happening at the same time, all going in the same direction.
2.  The knowledge that made experts special is getting absorbed into AI. The gap between what specialists know and what everyone can access is shrinking fast.
3.  Products are becoming APIs. If you have to open an app, you've already lost.
4.  You're still making the decisions, but your agent is the one browsing, comparing, and buying—which means it's the one available to influence.
5.  Companies are moving from org charts and ignored policies to transparent graphs of operations run by AI.
6.  Automation isn't about helping employees anymore. It's about companies doing the work themselves.
7.  In the post-corporate world, you broadcast your full self—skills, interests, reputation—and get paid for being you.
8.  Custom everything is likely to fragment shared experience in ways Putnam warned about in _Bowling Alone_.
9.  The through-line is ideal state management: know what perfect looks like, measure where you are, close the gap.
10.  This won't tell you who wins or when. But it should make the news a lot less surprising.