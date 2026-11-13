---
title: "Design is a search problem"
source: "https://mattstromawn.com/writing/design-is-a-search-problem/"
publishedDate: "2026-11-12"
category: "design"
feedName: "Sidebar"
---

A decade ago, working at a design agency, I lived in fear of one sentence: “this looks nice, can we see a few other options?” I was not an ‘options’ guy. I fashioned myself as Paul Rand, telling Steve Jobs off when he asked for multiple options: “No. I will solve your problem for you and you will pay me. You don’t have to use the solution. If you want options, go talk to other people.”[1](#fn1) But I didn’t have the guts to tell my clients off, so I dutifully designed a few other options.[2](#fn2)

Recently, I’ve gotten to work with some of the best designers in the field. Looking at their digital workspace — in Figma, Paper, Claude Design, or something else — I see hundreds of artboards and variants, laid out in a sprawling grid, representing branching parallel universes of design directions. Sometimes I see little panels filled with dials to sweep through the possibilities, enabling a single person to see thousands of combinations in the hope of picking a single, perfect specimen. Lots and lots of options.

This makes me feel like an alien. My files are just a few artboards; sure, I tweak and tune the tiny details inside, but I rarely keep the multiverse in view as I do. I’ll give myself a dial here and there, but usually for a single variable that I can’t easily visualize. Am I just a bad designer?

Assuming (hoping) the answer is ‘no’, I want to revisit a thread I pull on from time to time: as designers, we’re all just trying to find the right solution in a vast multiverse of possibilities. The solution exists, and we typically know it when we see it. So most of what we call ‘design’ is groping around a dark room looking for a black cat. Different designers take different approaches. Some are changing their approaches with the advent of generative AI, but at the end of the day, design is a search problem.

Computer science has worked on search problems for decades. Depending on the particularities of a given search, there are a variety of algorithms and strategies that can result in faster, more direct, or more computationally efficient paths to the solution. We can apply this wealth of research from some of my favorite scientists (looking at you, Claude Shannon) to the design process, to hone our own craft.

‘Search’ has its own formal vocabulary in computer science. I’ve put a glossary at the bottom of the post, and I’ll use dotted underline to link to a definition if you need it.

To picture how a [search](#search) works, imagine a Rubik’s cube. A scrambled cube is the starting [state](#state); each turn you can make is a [state change](#state-change), leading to an [adjacent](#adjacent) state. All the possible combinations of colors on the faces (43 quintillion for a typical 3×3 Rubik’s cube) make up the [search space](#search-space). Searching involves evaluating [candidates](#candidate) that can be reached from the current state of the cube; the desired state is the solved cube with each face a solid color.

StartState changeAdjacent statesTarget StartState changeAdjacent statesTarget

Each possible version of the cube is a state. Each turn is a change that leads to an adjacent state.

Now, a few basic search algorithms and how they apply to design:

## Depth-first search

As far as search algorithms go, [depth-first search](https://en.wikipedia.org/wiki/Depth-first_search) (DFS) is as simple as it gets. Here’s how it works:

1.  From the current state, look for adjacent states we haven’t visited.
2.  If there is one, move to it. It doesn’t matter which.
3.  If there isn’t, go back to the previous state and start from step 1.
4.  Repeat until we reach the goal or run out of states.

-   Start: outlined gray triangle
    -   striped gray triangle
        -   solid gray triangle
            -   solid blue triangle
                -   solid red triangle
                    -   solid red square
                        -   solid red pentagon
                -   solid blue square
                    -   solid blue pentagon
            -   solid gray square
                -   solid gray pentagon
        -   striped blue triangle
            -   striped red triangle
                -   striped red square
                    -   striped red pentagon
            -   striped blue square
                -   striped blue pentagon, the target

Targetstriped blue pentagon

Depth-first search commits to the first change it finds and follows that all the way down before it backs up. Solutions evaluated: 16

In a design sense, this is akin to navigating a hedge maze by picking a random direction at each fork until you hit a dead end. It’s not a very good design process, but it’s a good intro to how these things work.

## Breadth-first search

[Breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search) (BFS) is just a touch more complicated, and starts looking more like the design process.

1.  From the starting state, visit every adjacent state.
2.  From each of those, visit every adjacent state we haven’t visited.
3.  Keep going, moving one step further from the start each round.
4.  Repeat until we reach the goal or run out of states.

-   Start: outlined gray triangle
    -   striped gray triangle
        -   solid gray triangle
            -   solid blue triangle
                -   solid red triangle
                -   solid blue square
            -   solid gray square
                -   solid gray pentagon
        -   striped blue triangle
            -   striped red triangle
                -   striped red square
            -   striped blue square
                -   striped blue pentagon, the target
        -   striped gray square
            -   striped gray pentagon
    -   outlined blue triangle
        -   outlined red triangle
            -   outlined red square
        -   outlined blue square
            -   outlined blue pentagon
    -   outlined gray square
        -   outlined gray pentagon

Targetstriped blue pentagon

Breadth-first search tries every single change, then every pair of changes, and so on. Solutions evaluated: 21

Both DFS and BFS are naive algorithms; we don’t proactively evaluate candidates while we search. Both are used on search problems with small search spaces and/or when evaluation is cheap.

But many of the most interesting search problems aren’t small or cheap. Take chess, for example; winning at chess is a search problem. But the search space is unfathomably large,[3](#fn3) which is why it wasn’t until the mid-2000s that computers could reliably beat grandmasters.

Most product design problems I’ve worked on look more like chess than a Rubik’s cube. Design covers search spaces of hundreds of dimensions — sizing, spacing, hierarchy, color, motion, interactivity, responsiveness, etc. And evaluation is relatively expensive: beyond changing a button or color, we often need to ship something before we truly know it works.

There are other algorithms meant for this kind of problem, and they resemble design more and more as they get more complex.

## Beam search

[Beam search](https://en.wikipedia.org/wiki/Beam_search) is the first approach we’ll explore that actually evaluates potential candidates before moving.

1.  From the starting state, score every adjacent state.
2.  Keep the three best and discard the rest.
3.  Score every state adjacent to the three we kept, and again keep only the three best.
4.  Repeat until one of the states we kept is the goal, or we run out of states.

-   Start: outlined gray triangle
    -   striped gray triangle2
        -   solid gray triangle3
        -   striped blue triangle1
            -   solid blue triangle2
            -   striped red triangle2
            -   striped blue square1
                -   solid blue square2
                -   striped red square2
                -   striped blue pentagon, the target0
        -   striped gray square2
            -   solid gray square3
            -   striped gray pentagon1
                -   solid gray pentagon2
    -   outlined blue triangle2
        -   outlined red triangle3
        -   outlined blue square2
            -   outlined red square3
            -   outlined blue pentagon1
                -   outlined red pentagon2
    -   outlined gray square3
        -   outlined gray pentagon2

Targetstriped blue pentagon

Beam search scores each option by how many parameters still look wrong, keeping the best three each round. Solutions evaluated: 21

This is called ‘beam search’ because it’s like using a flashlight’s beam to look at new states; the width of the ‘beam’ above is 3. Beam search is the ‘show me some options’ approach that most of my agency work took. It’s limited by the width of the beam: a narrower beam is faster and cheaper, but may miss the best solution at a given step.

Now is an important moment to introduce the idea of a [heuristic](#heuristic). In most cases, we don’t _know_ we have the ideal candidate until we find it. Given that inescapable fact, we have to pick a test that we think will separate the good candidates from the bad ones. Heuristics usually involve tradeoffs: they can be fast/cheap and error-prone, or slow/expensive and accurate.

Here’s the problem: beam search often fails to find the best solution! It depends entirely on the width of your beam and the quality of your heuristic. For example, if the desired state is hiding behind a low-scoring upstream branch, the algorithm might never find it. This can be overcome with an infinite beam, but then we’re just back at a slightly fancier BFS, which is slow and inefficient.

When I learned the shortcomings of beam search — that simply checking a few options and picking the best one might not lead to the best solution — my feelings about my option-hungry clients were validated.

And yet, designers are still using the beam, because AI has given us a better flashlight: producing a handful of options for a SaaS website used to take a week, and now it takes seconds. The beam has gotten so wide that ‘give me 10 options’ feels like an effective way to prompt AI towards the best design.

Still, it’s not how I design. And again assuming I’m not just in the permanent design underclass, I thought maybe there was another algorithm that explains why I tend to explore so few branching paths.

## A\*

[A\*](https://en.wikipedia.org/wiki/A*_search_algorithm) (A-star) is the algorithm behind most route-finding, from maps apps to video game characters.

1.  From the starting state, give every adjacent state a score, made up of:
    -   The number of changes it took to get there from the start, plus
    -   The heuristic: our estimate of how many changes remain to reach the goal.
2.  Put them all on a list of states we could visit next.
3.  Move to the state on the list with the _lowest_ score. This might not be adjacent to our current state! Score the new state’s adjacent states and add them to the list.
4.  Repeat until we’re at the goal.

-   Start: outlined gray triangle
    -   striped gray triangle1+2
        -   solid gray triangle2+3
        -   striped blue triangle2+1
            -   solid blue triangle3+2
            -   striped red triangle3+2
            -   striped blue square3+1
                -   solid blue square4+2
                -   striped red square4+2
                -   striped blue pentagon, the target4+0
        -   striped gray square2+2
    -   outlined blue triangle1+2
        -   outlined red triangle2+3
        -   outlined blue square2+2
    -   outlined gray square1+3

Targetstriped blue pentagon

A\* scores each possibility as changes made so far plus its estimate of changes left. Partway through, it’s able to revisit previous candidates. Solutions evaluated: 14

This is similar to beam search, but with a few twists:

1.  A\*’s heuristic incorporates a notion of _[distance](#distance) from the goal_.
2.  A\* doesn’t always move smoothly from adjacent state to adjacent state.

That last bit is crucial: unlike beam search, A\* can go backwards. If the path we’re on moves far from the goal, its score climbs. Eventually a previous candidate looks better and we go back to it.

More importantly, how much exploring we do in A\* depends almost entirely on the quality of our heuristic. With a perfect estimate, A\* goes straight to the solution.

A\* matches how I design. I’m more deliberate with exploration, only following thoughts until I feel they’re drifting away from the solution. I typically only keep old explorations around if they’re promising; an exhaustive record of every possible variant is stressful.

I’ve managed to go the whole essay without mentioning it, but with my A\* approach, taste[4](#fn4) does in fact matter; while there are many designers with better taste than I have, what I do have is hard-won by years of designing, and I can use it to sniff out the fastest path to the best solution.

## Conclusion

AI has given us a wider beam, but it hasn’t yet given us a better heuristic. We’re still designing for humans, so we still have a leg up on the robots: we can use empathy, or even our own biases and human shortcomings, to feel out the right solution.

Meanwhile, understanding the design process is just as important as ever. This kind of introspection — learning about search algorithms out of despair over my own shortcomings — has added a few tools to my arsenal. There are many variations on these algorithms that may describe your own search process; there are even more exotic variants that may be worth trying on.

It might seem reductive to call design a search problem. Where’s the creativity? But with humanity, humility, and curiosity, pursuing the optimal solution with a well-tuned algorithm can help us design faster and more efficiently.

_Special thanks to [Josh Petersel](https://joshpetersel.com/) for feedback on a draft of this essay._

I'll send new posts to your inbox, along with links to related content and a song recommendation or two.

Adjacent

Two states are adjacent when they’re separated by a single state change. [↩︎](#src-adjacent)

Candidate

A state we’re considering. [↩︎](#src-candidate)

Distance

The number of changes that turn one state into another. Usually we measure distance as the _least_ number of changes required to get from one state to another. [↩︎](#src-distance)

Heuristic

A test we think will separate the good candidates from the bad ones, used because we usually can’t know we have the ideal candidate until we find it. Heuristics involve tradeoffs: they can be fast and cheap but error-prone, or slow and expensive but accurate. [↩︎](#src-heuristic)

Search

The process of arriving at a desired state (scoring well on a fixed set of criteria) by evaluating a set of candidates. [↩︎](#src-search)

Search space

The set of possible states. We call it a ‘space’ because often there are ‘dimensions’ to search, like the width and height of a shape, and we can make analogies to the dimensions of a physical space. Sometimes these dimensions are literal, as when a wayfinding app picks the best route from point A to point B. [↩︎](#src-search-space)

State

A possible step in the movement from the beginning of a search to the end. We start with the ‘initial state’; as we evaluate candidates we might change our ‘current state’; the end of the process is the ‘final state’ (and may not be the ‘desired state’). [↩︎](#src-state)

State change

Also called a mutation. How the system moves between states. [↩︎](#src-state-change)

1.  As recounted by Steve Jobs in “[Steve Jobs interview about working with Paul Rand](https://www.paulrand.design/life/videos/1993-steve-jobs.html),” 1993. [↩︎](#fnref1)
    
2.  The client almost always picked the original (or at least the classic ‘let’s do A with a bit of B and C’). [↩︎](#fnref2)
    
3.  Claude Shannon estimated it at 10¹²⁰. For comparison, the observable universe has about 10⁸⁰ atoms. [↩︎](#fnref3)
    
4.  ![A crowd of Simpsons characters leaning in expectantly, waiting for Bart to say his catchphrase](https://mattstromawn.com/images/say-the-line-bart.gif) Say the line, Bart! [↩︎](#fnref4)