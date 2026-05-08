---
title: "You are not immune to mode collapse"
source: "https://www.lesswrong.com/posts/vKtuRbo4e3ffixmee/you-are-not-immune-to-mode-collapse"
publishedDate: "2026-05-07"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

“Mode collapse” is a few things. First it was an observation about how early image generating AIs often _collapsed_ to producing just the _modal_ output from their training distribution (something very common, like a house with a white picket fence and a tree in the garden). Then it was the observation that this effect seemed to occur extremely quickly when AIs were trained on AI-generated inputs. After that, it became the _copium du jour_ of AI-is-hitting-a-wall folks for a while, who thought that the AI industry would ouroboros itself out of existence (and that there was, therefore, no need to confront any of the issues that smarter than human AIs might bring up). And then it was forgotten, because it turns out you _can_ train on AI-generated inputs just fine, if you know what you’re doing.

It’s also the reason why grant-making organisations have such strong inertia, why all of your favourite band’s songs sound the same after the third album, and why you should specialise even if there are no gains from trade.

## The Image Generator

Imagine an image generating AI, which gets something like this as input:

[![An image of a grassy field, where the middle region is blocked out by a white square, filled with question marks.](https://res.cloudinary.com/lesswrong-2-0/image/upload/f_auto,q_auto/v1/mirroredImages/vKtuRbo4e3ffixmee/iluang1d4si6mjwhbsw1)

](https://substackcdn.com/image/fetch/$s_!90jq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F044c2dfc-1f6c-48e1-982d-bc9bbe46a502_678x500.png)

[](https://substackcdn.com/image/fetch/$s_!90jq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F044c2dfc-1f6c-48e1-982d-bc9bbe46a502_678x500.png)

[Original image:](https://substackcdn.com/image/fetch/$s_!90jq!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F044c2dfc-1f6c-48e1-982d-bc9bbe46a502_678x500.png) [https://commons.wikimedia.org/wiki/File:Dog\_Breeds.jpg](https://commons.wikimedia.org/wiki/File:Dog_Breeds.jpg)

And suppose it’s being trained to fill in the blank section in the middle. Suppose it’s trained on 50:50 mixture of golden retrievers and tabby cats. For any given image, it first needs to decide whether to try and draw a retriever or a cat, and secondly how exactly the animal should look. The model has a limited amount of parameter space to spend, and it has to split that across three tasks:

1.  Guess whether the missing animal is a dog or a cat
2.  Produce an image of a dog
3.  Produce an image of a cat

We’ll ignore task (1) for now, and think about how the model might split its capacity between tasks (2) and (3). If cats and dogs are equally easy to draw, and if the model gets diminishing returns on capacity in both categories, and if the categories are equally common, then we should expect it to spend an equal amount of capacity on both tasks. Again, since the classes are symmetric, we should expect the predictions coming from task (1) to be 50:50 dogs:cats.

But what happens if we have a 70:30 ratio of dogs:cats? The first-order effect is that the model will allocate more resources to task (2) than task (3). That’s obvious, but there’s a second-order effect as well:

Imagine our model is in a situation where it thinks there’s a 50% chance the missing animal is a dog, and 50% chance it’s a cat (even after taking into account the fact that dogs are more common). It has the following options available to it: generate an excellent picture of a dog, or generate a mediocre picture of a cat. What should it do?

If it guesses the animal wrong, it’s screwed either way, but if it guesses right, it’s better off drawing a dog. Therefore the model should err on the side of drawing a dog! The distribution has been pushed towards the _modal_ target.

If you train another generator on the outputs of the first, it will generate dogs _even more often_! Mode collapse.

This is a two-part process. Each _individual_ step shifts the distribution slightly towards the mode, and each _successive_ step locks in the shift of the previous step, and compounds it.

This generalises to some other situations as well, if you want to read the footnotes.

## Grantmakers

Now suppose you’re a philanthropist hiring a grant-maker to distribute your money. You get a 70:30 mixture of global health proposals to animal welfare proposals.

You, naturally, hire someone who is slightly better at evaluating global health projects than they are at evaluating animal welfare projects. Your employee then awards grant money in a 75:25 ratio, since she can more easily pick the best global health proposals than she can the animal welfare ones.

In your next grant-making call, you decide to expand. Your employee brings on two new hires, and takes them through her process of evaluating grants, based on last year’s grants. They are trained on data in a 75:25 ratio, and become significantly better at evaluating global health proposals than animal welfare ones.

## Your Favourite Band

By now you see the pattern right? The band writes its first album, 7 dreamy pop songs and 5 proggy rock songs. Now, since they’re better at writing the former, they do 9:3 on the next album and give up on rock entirely by the third.

But by the fifth album they’re bored of rock, and they decide to make something called “intelligent dance music” (which you’re not actually supposed to dance to, apparently)! The millions they made from touring the fourth album gave them enough time to take a break, and learn how to use \[whatever weird gizmos electronic musicians use to make their music\]. Slack to the rescue!

## Division of Labour

People normally attribute the division of labour to the _gains from trade_. Trade is a part of it, but not all of it.

The ability to trade goods and services for money puts us in the same situation as the image classifier. Remember when our model thought there was an equal chance (50%) of “dog” or “cat” being the correct image to generate? In a modern economy, you are equally likely to be rewarded for doing a day’s work as an accountant or as a personal trainer, it’s just that the likelihood is ~100% instead of 50%.

Your skill at being an accountant can be thought of as a generative model of “a good day’s accounting work”. Likewise for your skill at being a personal trainer. Once you’ve done a few days’ work as an accountant, you’re feeding off your own generations (kinda) and your model of “a good day’s accounting work” gets better and better, leaving your model of “a good day’s personal training work” in the dust.

Note that this still works _without_ trade: suppose you’re on a deserted island. If it’s sunny, you go hunting, if it’s cloudy, you go fishing. Each time you do an activity, you get better and better at it. If it’s sunny 3/4 of the time, you’ll get much better at hunting than fishing. Before long, you’ll be hunting when it’s _just a bit_ clouded over, then when it’s _kinda_ cloudy with patches of sun, and eventually you’ll be hunting every day. At least until you kill all the local fauna. Then you’re screwed.

## Slack

I think mode collapse, generalised, is a force which acts on basically all intelligent systems over time. But I don’t think it’s inevitable. If an external force changes the returns to investment (like the fauna population crash in the deserted island), you might be forced to change. More likely, the returns to investment get lower over time, producing some homeostatic effect (quarry gradually becomes rarer, you go fishing more often).

You can also fight mode collapse it if you just _don’t like it_. You can just do (different) things! The band example showed this.

Unfortunately, you can only do this if you have access to slack. If you _need_ to go hunting _every day_ because you’re now _awful_ at fishing and there’s _barely any quarry left and you can’t take a day off hunting to learn to fish!_ Then you’ll starve. If the record label demands a hit album in the next six months, you don’t have time to learn to make IDM.

Even evolution isn’t immune to this! Highly specialised animals (and plants) are common everywhere—like the [caterpillar that can only mature inside the nests of red ants](https://en.wikipedia.org/wiki/Large_blue), or those [orchids that are pollinated exclusively by a single species of solitary bee](https://en.wikipedia.org/wiki/Ophrys_apifera)—which tend to go extinct at the slightest ecological sneeze.

So beware mode collapse: for you are not immune!

1.  Suppose you have three classes: cats, dogs, and frogs, in a 1:1:1 ratio. Now suppose that some capacity can be shared between generating images of cats and dogs (e.g. generating fur textures) but not between either of those classes and frogs. The optimal strategy is to make use of that efficiency gain, and be _slightly_ better at drawing cats and dogs than frogs, and then secondarily to err _slightly_ on the side of the furry creatures, over the frogs.
    
    Or, suppose cats are just intrinsically easier to draw than dogs. The optimal policy would then be to allocate slightly more resources towards dogs than cats, but not so much that you’re as good at drawing dogs as you are at drawing cats. Then you should err towards cats.
    
    The overall pattern is: things which are dense in thing-space, or things which are simple and easy to generate, are favoured.