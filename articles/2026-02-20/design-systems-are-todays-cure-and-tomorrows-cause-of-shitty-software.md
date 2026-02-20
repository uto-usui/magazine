---
title: "Design systems are today’s cure and tomorrow’s cause of shitty software"
source: "https://pjonori.blog/posts/design-systems-tomorrows-cause-for-shitty-software/"
publishedDate: "2026-02-19"
category: "design"
feedName: "Sidebar"
---

Making software used to be easy. Well, _easier_. Twenty years ago, desktop software _was_ software. 99.999% of that used a mouse, keyboard, and monitor. Most were web-based–using plain HTML, CSS, and a (relative) sprinkle of Javascript. Frameworks existed, but there were less of them. Was it limiting? Oh, yeah–to the point of claustrophobia.

A new kind of claustrophobia has kicked in now. Software ships across countless platforms and device types. UI frameworks are all but considered mandatory. There are layers and layers of complexity that make 2005 feel like a kindergartner’s naive daydream. Managing the complexity of “modern” software takes considerable focus. And focus doesn’t grow on trees.

None of this happened overnight. The complexification of software crept in gradually. The ways of working haven’t kept up to account this–especially within design. The general process is basically unchanged. Sure, the tools are different and we have different names for stuff. But it’s the same song and dance.

And people wonder why software quality is in decline.

## How we’re keeping it together

Abstraction has done a lot of the heavy lifting to blunt the impact of complexity. Kind of like shoving all your toys under the bed to clean your room. Make no mistake, abstraction has been a boon for productivity. It handles a lot of things that otherwise need deeper knowledge and skill. Abstraction makes tasks more approachable and attainable to a broader audience. Work that needed a front-end developer is now (theoretically) possible for a full stack dev. Why hire three specialist designers when one product designer can do it? Or, more accurately, “do” it.

Which brings me to design systems. They’re nothing if not an abstraction. And, boy howdy, have they been putting in work to stem the bleeding of managing complexity. The growth of design systems has gone a long way to keep the engine humming. Mature design systems handle _so much_ that fly under the radar. Things like addressing critical states, accessibility compliance, managing edge-cases, performance, and more. These were the things designers and engineers used to sweat. Now, it just works. Great, right?

Right?

## The ticking time bomb

Design systems and other abstractions keep software development’s engine running. But it’s starting to make some weird noises and the check engine light is on.

Do any of us see software getting _simpler_ soon? No? Me neither. I’d bet the farm that design systems will only be more relied on moving forward. This sounds like a good thing. I don’t think so.

Design systems–like any abstraction–only obfuscate complexity. Yes, it speeds things up. Yes, it’s simpler at face value. But it’s yet another abstraction layer. And abstractions create complexity. Plot twist–our practice has been working to combat complexity by adding it elsewhere. You can only fight fire with fire for so long.

If/when this formula breaks down, we could see an even greater fall in software quality. Which should be a barrel of laughs.

## A yucky future of dependence

Design systems exist to help people do their job faster and better. “Do their job” carries a lot of weight in that sentence. This assumes designers and engineers can make high-quality interfaces from scratch. Design systems just streamline the process.

But a funny thing is happening. Those skills to make high quality interfaces have started to erode. Specialist roles are disappearing. Remember front-end engineers? Instead of enhancing existing skills, design systems are becoming a dependency. Less people know how to create interfaces from the ground up. Abstractions, such as design systems, are becoming the new baseline.

It’s nice to be needed. But not like this. True dependency on design systems would change the fabric of the practice. Design systems have typically focused on happy paths and common use cases. Feature teams would build things the system didn’t have. Use was optional. But more teams rely on design systems to handle more of the work. Optional is turning into a hard necessity.

What happens when teams can’t ship a quality interface without the design system? What happens when you depend on the things to make the things? First, feature teams start square-pegging the design system into round-hole use cases. Components purpose built for specific situations are duct taped into something else altogether. Second, design system teams are pressured to cover more ground. More nice-to-have gaps in the system are now considered blockers. Quantity becomes the name of the game. Quality? That’s _so_ yesterday.

Design system teams aren’t exactly flush with cash as is. Now imagine propping up quality across design and engineering. The typical funding, headcount and capacity ain’t enough. It’s a recipe for failure. And that failure will show up in even lower software quality.

This is how we’ll see a continual downward slide in quality. Dependency on design systems will further gut foundational skills for making interfaces. Greater dependency will force design systems to cover greater surface area. Sprawling design systems will become quality sinks due to their size. Dependent teams have no choice but to use the degrading system.

Next thing you know, teams are shipping crap built from a crap design system. What’s worse, as those skills drop, who’s left to make the next generation of design systems? What happens when there aren’t enough people to make the things that make the things?

## How do we diffuse the bomb?

There’s no easy answer. Well, kinda. The things I suggest aren’t all that mind-blowing. The hard part is pulling it off in an environment allergic to moving slower and not breaking things. Nonetheless, this is how I’m personally circling this issue. Make no mistake–I don’t think this train is stopping. But that doesn’t mean we all need to get on–or get hit.

### Remain dogmatically focused

Say no–as much as possible. Cover critical use cases and ignore the others. Draw a clear line for what the system supports and what it absolutely won’t. This won’t always be popular, but it has two critical values.

Saying no stunts dependency. Teams will need things the design system doesn’t have. Which means they’ll need to design and build it themselves. This is a good thing. This’ll force teams to flex their skills to make high-quality interfaces on their own. This means they can do it again the next time. The trick is finding the right balance between when to support and when not. No, there isn’t an easy answer.

Saying no also creates focus. Raising quality demands time and attention. The more a design system has, the more it has to maintain. The more it has to maintain, the less time and energy is available to improve quality. It’s not rocket science.

So, do less at a higher level of quality. Ween teams off relying on the system for everything. Drop support for unused components/patterns. Make quality a priority by not _making other things a priority_.

### Make education on fundamentals a core pillar of design systems

Design systems that remove the need for foundational skills are killing them. I’m not saying it’s intentional, but it’s happening nonetheless. That’s not going to end well.

I’ve been guilty of saying, “You don’t need to worry about that–the system just takes care of it.” I was wrong. We need designers and engineers to worry about things. Which means exposing them to as much minutiae as possible. That’s not to say that design systems shouldn’t handle minutiae. It can–and should. But learning the details is, and always will be, important. High quality software needs everyone aware of and concerned about the details.

Design systems are perfectly set to teach these details. So many foundations run through design systems. Color palettes, type ramps, component architecture, API conventions–and so much more. Design systems can help teach people how to use it–and how it all actually works. This means going beyond “do this” and “don’t do this”. This means explaining. Give a “why” and “how” behind every principle, guideline, and best practice.

Yes, it’s a lot of work. But it gives people the skills to not just use the system. It helps them understand it–really understand it. And if they really understand it, they aren’t dependent on it. They’ll be capable of delivering quality independent of using the system.

### Get consumers of the design system involved

The saying, “teach a person to fish” exists for a reason. Yes, documentation is a critical form of education. But nothing beats getting your hands dirty.

This can take shape in many different ways. New hires can spend a part of their onboarding embedded on the design system team. Team members can rotate on/off the team. Ambassador programs can create regular points of collaboration. There’s no shortage of approaches and no right or wrong way.

Design systems work a lot on foundations. Getting more people to work on them will help more people learn foundations. It’s not complicated.

### No smoke and mirrors

Design systems can make many things work like magic. Magic isn’t real–it’s entertainment dependent on the suspension of disbelief.

A lot of high-level components/patterns can feel like magic. Think molecules or organisms. These kinds of elements represent the peak of design systems’ potential. They can save countless human hours in design/development and increase quality.

I’m not suggesting we stop making these. I’m suggesting we remove the “magic”. These components are often black-boxed with no simple way to recreate. Teams need to buy into the magic.

Instead, it’s important for these kinds of components to be composable by anyone. Meaning all the parts to reproduce the component are available and accessible. There’s no magic–anyone can see how the sausage is made. And everyone has the tools to make their own sausage. This means that if/when a team needs to diverge–they can–while still using the system.

### Bare metal solutions

I’ve been crapping on the over-dependence of abstraction for this entire article. Yet the elephant in the room is that many design systems are guilty of this. Let’s be honest, how many web-based design systems are _not_ built on top of React? Make no mistake, this makes a lot of sense–especially from an efficiency perspective. I question how this benefits software quality in the long run.

It’s tempting to take a “jump to the end” approach towards building a design system. I think it comes at the cost of quality. The implementation of a design system is vital, but tangential. Its true value comes from its definition of foundations, standards, and best practices. Those are the things that last. Those are the things that lead to quality. The less that comes between that and implementation, the better. What better way to foster foundations and standards than to build directly on top of them?

There’s no reason why a design system can’t provide React components. But I don’t think it should be required. Having a headline React component can be a nice abstraction of type hierarchy. But we also have to question how much overhead comes with it. If we want engineers to feel more comfortable writing markup, we need to expect them to write more markup. It’s worth considering lower-level entry points to implementing design systems.

Much of our thinking to date is how much a design system can abstract. It may be worth flipping the argument to ask how little we can get away with. How far can pure CSS take you? With the rapid maturation of web components, there’s a growing opportunity to get back to basics. And it’s that focus on the basics that’ll help improve software quality.

## Quality has always been the point. Right?

Sure, velocity grabbed the headlines. But the goal’s been higher velocity to create _quality_ interfaces. If quality goes, design systems are nothing more than an enshittification accelerator.

The best way for a design system to succeed is to make sure everyone has the skills to never have to use it. Systems can define the shape of quality. They can enable quality. But at the end of the day, they rely on capable people to wield the system capably.

If design systems care about quality, they need to work in a way to sustain it. If you think trying to get people to use a system is stressful, wait until people can’t do anything without it.

_This post was initially written for the [Zeroheight blog](https://zeroheight.com/blog/the-design-system-paradox-how-abstraction-can-hollow-out-quality/)._