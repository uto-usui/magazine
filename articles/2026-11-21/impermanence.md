---
title: "Impermanence"
source: "https://tcosta.com/impermanence/"
publishedDate: "2026-11-20"
category: "design"
feedName: "Sidebar"
---

## Why a game?

I spend most of my days trying to make software effortless. Information should be easy to find, interfaces should be obvious, and nobody should have to fight to get what they came for.

We’re getting pretty good at this. Information is practically free, AI is making it easier than ever to turn ideas into working software, and things that once took months can now be built in days. I love it. I use these tools constantly, and I’m not particularly nostalgic for the limitations we used to have.

But it raises an interesting question. If making things is becoming so easy, what makes something worth experiencing?

I think about that a lot. I’ve always cared about how things feel. The rhythm, the details, the tiny moments of surprise. The stuff that’s hard to describe but immediately obvious when someone gets it right.

Video games taught me a lot about this. They’re strange when you think about it. Most software tries to remove obstacles. Games deliberately create them. They make you work for something that could have been handed to you in seconds. And somehow, that’s what makes them fun.

So I did something a little backwards with my website. I took an about page that could be read in a few seconds and made it harder to get through.

On [the homepage](https://tcosta.com/), press and the words become bricks. A ball appears, then a paddle, and suddenly you’re breaking the words you were just reading.

Over five levels, you discover a little about me. Where I came from, what I’ve worked on, and the things I care about. You could learn all of this by reading a few paragraphs, of course. But I wanted to see what would happen if you had to play through them instead. The destination was never particularly important. **I just wanted to make the journey worth taking.**

Here are some of the little decisions that went into it.

Level 1 – 5

## The page is the level

The game doesn’t load a separate world. It uses the page that’s already there. Every letter is measured where the browser rendered it and painted onto a canvas at exactly the same position. The swap happens within a single frame. Nothing appears to move. The page just starts to break.

Grey letters become bricks. White words stay solid, preserving a few important parts of the story. Some letters even hide extra hearts.

I liked the idea that the content itself determines the level. To learn about me, you have to break apart the words I used to describe myself.

By the time you’re done, most of those words are gone. But you’ve probably spent more time with them than you would have if you’d simply read the page.

The words are temporary. The feeling is what stays.

There’s something I find beautiful about that. We don’t always remember what we learned, but we remember how something made us feel.

### The first minute is the pitch

Someone who discovers a game hidden in a homepage hasn’t necessarily decided to play it. You have a few seconds to convince them.

So I made sure the first thing that happens is fun. Within six seconds, a multiball power-up falls. One ball becomes several, letters start breaking everywhere, and something that looked like a tiny Easter egg suddenly becomes a chaotic dance.

The first ten secondsMultiballAlways the first to fall03.5 s6 s at the latest10 s44 of 44Games that opened with itNeverA power-down first

Across hundreds of test games, the first drop was always multiball. Never a power-down. I didn’t want to introduce the game by making someone lose. I wanted to give them something to enjoy before asking them to get good at it.

Level 2 – 5

## Every return is a choice

The most important thing in a brick-breaker is making the player feel responsible for where the ball goes. Catch it in the middle and it travels straight up. Catch it near the edge and it leaves at up to 58°. Moving the paddle as you catch it adds another 14° of influence.

0°−58°0°+58°engine.ts · the ball leaves the paddleoffset = (ball.x − paddle.x) / halfangle = offset × 58° + driftoffset 0.00angle 0°move across the paddle

Move across the paddle.

It’s an old trick, but it makes all the difference. Without it, you’re just moving a wall around and hoping for the best. With it, you’re aiming. Every return becomes a decision.

### Luck, on purpose

Of course, being in control isn’t always fun. Sometimes the ball gets stuck bouncing around an empty part of the screen, missing everything. The physics are perfectly correct. The experience isn’t.

So I made the game cheat a little. After an empty bounce, the ball gets a tiny nudge toward the nearest reachable letter. When only a few letters remain, the help gets a little stronger.

shared vision+4°engine.ts · nudgebend = min(4° × empty bounces, 14°)toward the nearest letter it can reachEmpty bounces0Bend0°with few letters left: 6°, up to 19°after any hit: nothing at all

There are rules, though. The ball never steers through solid words, reverses direction unnaturally, or interferes while you’re already hitting things. As soon as it hits a letter, the assistance disappears.

010203thingsThanksfeelNot through a solid wordNever back the way it camefeels right0° of helpNot while they are hitting

If I’ve done it right, you never notice any of this. You just think you got lucky. I love details like these. They have almost nothing to do with what the game looks like, but everything to do with how it feels.

### Nobody waits

Another thing I hate in games (or software in general) is waiting for something interesting to happen. After five seconds without hitting a letter, a power-up falls. After nine, a letter breaks by itself, and more follow until the ball finds something again.

nobody waits.5 sA power-up falls9 sA letter lets go0.0 sWithout a hit

In the final twenty automated playtests, the longest stretch without something happening was eleven seconds. It’s probably a silly thing to measure. But I’d rather spend time fixing eleven seconds of boredom than adding another feature nobody asked for.

Level 3 – 5

## Things that fall

There are eleven power-ups. Multiball, electricity, magnets, lasers, a wider paddle, walls that close in from the sides, and a few others.

wide10 s

multiball2 serves

big ball10 s

bombnext hit

electricity3 bolts

magnet10 s

pierce10 s

walls18 s

defense10 s

laser6 s

2× points15 s

Most last around ten seconds. Long enough to enjoy them, short enough to make you want another. I wanted each one to change how you play, not just how many points you get. A good power-up should make you feel briefly unstoppable.

### Seven things to dodge

And then there are seven ways to make your life miserable. The paddle shrinks. The ball gets too fast. Your controls reverse. Sometimes your paddle practically disappears.

indestructible6 s

tiny paddle10 s

too fast8 s

anchor5 s

ghost ball5 s

ghost paddle7 s

reversed8 s

A power-down falls at 105 px a second, a power-up at 165

They’re red and fall more slowly than power-ups. They also drift slightly toward your paddle. That last detail matters. If they fell straight down, avoiding them would often be accidental. By making them follow you a little, dodging becomes a choice.

Any playerOn a long clean runengine.ts · a power-down fallslean = (paddle.x − drop.x) × 0.35never more than 20 px a secondwhile it falls at 105lean 0 px/scaught 0 dodged 0

It’s a small difference, but now the game isn’t simply punishing you. It’s asking you to pay attention.

### The laser is a rescue

There’s also a laser that appears when you’ve cleared most of a level and the ball hasn’t hit anything for a few seconds.

It falls once both are trueLevel cleared75%Since a letter broke3 s3Shots at a time3Letters a shot6 sIt lasts

It’s there for one reason: chasing the final two bricks around an empty screen is usually the worst part of a brick-breaker. Sometimes the best thing a game can do is let you move on.

Level 4 – 5

## Balance is a feeling

Difficulty was probably the hardest thing to get right. Make a game too easy and people get bored. Make it too hard and they get frustrated. Somewhere between the two is that wonderful feeling where you’re completely absorbed and stop noticing time passing.

The problem is that this sweet spot is different for everyone. So instead of finding one perfect difficulty, I made the game quietly adjust to how you’re playing.

BoredomAnxietyFlowEasyDifficultyHardSkillPushHelpLevels 1 to 4Level 5

### Help the one in trouble

On your last life, the paddle becomes a little more forgiving. It can catch a ball that lands up to twelve pixels beyond its visible edges. You can’t see the difference. You just make a catch you thought you might miss. Lose two lives within a minute and a heart falls from the sky. This is called a “pity drop”.

A heart from the sky12 px12 pxThe paddle, as it is drawn

The game never tells you that it’s helping. I wanted players to feel like they were getting better, not like the game had decided to go easy on them.

### Push the one who isn’t

The opposite also happens when you’re doing too well. Go 75 seconds without losing a ball, with lives to spare, and the game starts pushing back. Power-downs become more common and follow you more closely, and the paddle slowly narrows. Lose a life and the pressure disappears.

Hidden difficultyFullNone0 s75 s unbeaten140 sA life lostShare of drops that met itAverage player8%Skilled player34%Never on three lives or fewer

I didn’t want players to configure difficulty. I wanted the game to pay attention and figure out when to help, and when to get out of the way.

Punish in the open. Help in secret.

There’s one principle that connects almost every mechanic in the game. When something makes the game harder, I want you to see it coming. When something makes it kinder, I’d rather you didn’t notice. The red power-downs are obvious. The invisible twelve pixels at the edge of your paddle aren’t.

There’s a lot of design hidden in that distinction. The player should feel challenged, but never cheated. And being helped shouldn’t take away the satisfaction of doing something well.

### Finding the right curve

Across the first four levels, the ball gets faster, the paddle narrows, and extra hearts become harder to find.

Level 1Paddle×1Ball speed×0.6Hearts to be had3Level 2Paddle×0.9Ball speed×0.7Hearts to be had2Level 3Paddle×0.8Ball speed×0.77Hearts to be had1Level 4Paddle×0.8Ball speed×0.86Hearts to be had1Level 5Lap of honourPaddle×1.8Ball speed×0.6Cannot be lost∞

Getting that progression right took a surprising amount of work. I used agents to run more than 600 complete games in real browsers, simulating players of different skill levels.

The first version was brutal. Only about one in four average players made it to the end. After a lot of adjustments, that number climbed to eight in ten.

8 of 10Average players finish now1.65−63%Lives lost a minute on level 44.51.650Level 1Level 2Level 3Level 4First buildNowLives lost a minute, average player

But bots have a funny limitation. They’ll happily keep playing something that a human would have abandoned out of boredom. They don’t get nervous, frustrated, or tired. They’re excellent at finding bugs, dead ends, and difficulty spikes. They’re less useful at telling you whether any of it is fun.

2

5

8Human, first run

1

Trophies of 16 finished bot runs

S from 31,000 points · A from 28,000 · B from 21,000

I think this is a good example of how I like building software today. Agents wrote all the code, ran the tests, and helped me iterate much faster than I could have alone. I don’t see that as a compromise in craft. Quite the opposite.

I don’t think the human contribution to making something should be measured by how many lines of code we typed ourselves. The interesting work is deciding what matters. Which details deserve attention, what should be removed, and when something is finally good enough.

The tools are getting remarkably good at making things work. That gives us more room to care about how they feel.

### One piece of music

Music has this wonderful ability to make us feel something without explaining why. A few notes can create anticipation, a change in harmony can feel like a new beginning, and a familiar melody returning can feel like coming home. I wanted the game to have some of that.

E♭DB♭AGF01B♭5Mystery02B♭add9Discovery03F/ADescent04Gm11Longing05E♭maj9Opening06B♭/DReturn07E♭maj7♯11Radiance08E♭m6Bittersweet09B♭/FSuspension10B♭add9Home

Level 1, chord by chord. The line is the bass.

Every sound is synthesized in the browser, with notes following the harmony playing at that moment. The paddle plays the root, broken letters climb through the scale, and even losing a ball becomes part of the composition.

Across five levels, the music moves from B-flat toward F minor, gradually building tension. You don’t need to understand music theory to feel it. We recognize patterns, anticipate what comes next, and notice when something hasn’t quite resolved.

𝄞♭♭♭Level 1Level 2Level 3Level 4Level 5HomeBuildingNot yet resolvedIt lets go

By level 4, the instrumental opening of Anderholm’s _See How It Ends_ begins to emerge. Then, as level 5 starts, the drums and vocals arrive. After all that buildup, the game does something unexpected.

It lets go.

Level 5 – 5∞

## See how it ends

This is my favourite part, and probably the reason I wanted to make the game in the first place. For four levels, you’ve been trying to survive. The ball gets faster, mistakes have consequences, and every heart matters. Then you reach level 5, and the hearts turn into an infinity symbol.

**You can no longer die.**

The paddle gets wider, the ball slows down, and the music finally opens up into [_See How It Ends_](https://soundcloud.com/anderholmmusic/see-how-it-ends) by Anderholm.

Instead of more words about me, the level becomes a little gallery of things I’ve created recently. You still play, but there’s no longer any real pressure. You can take your time, listen to the music, look at the work, and enjoy the moment. I spent so much time balancing the difficulty of the first four levels, only to deliberately throw it away in the fifth. That was the point.

The song is about impermanence. About memories, the things we leave behind, and wanting beautiful moments to last even when we know they can’t. I chose it because it captured how I wanted the ending to feel.

I’ve been thinking about this a lot lately, especially with how quickly the world is changing. The tools we use, the skills we’ve spent years learning, even the work we thought defined us. So much of it is changing before our eyes. And I understand why that scares people. But there’s also something freeing about realizing that none of these things was ever permanent.

We spend so much of our lives making things. Obsessing over details, trying to make something beautiful, hoping that some small part of what we create might mean something to someone else. And yet, everything is temporary. The tools, the achievements, even the words we use to tell our stories.

In this little game, you literally destroy those words to move forward. By the end, almost nothing you started with is left on the screen. But you got to experience something along the way.

Maybe what matters isn’t what we manage to preserve, but what we make people feel.

In a way, the whole game reflects how I’ve been feeling about the world lately. We’re so focused on keeping up, adapting, and proving our worth that it’s easy to forget why we’re doing any of it.

That’s why the last level gets easier. After spending the entire game trying to survive, the reward isn’t another challenge, a higher score, or even winning. It’s simply being there.

It’s an intentional contradiction. A game called _Impermanence_ ends by giving you infinite lives. Not because you’ve defeated death, but because, for a little while, you don’t have to think about it. The challenge has served its purpose. There’s nothing left to prove. You don’t have to fight anymore. You can just enjoy the beautiful things around you.

And maybe that’s what I find hopeful about all this change. The tools will come and go. The ways we make things will keep changing, maybe faster than we’re comfortable with.

We might not get to keep the things we make. We don’t even get to keep the time we spent making them. But we got to be here. We got to make them.

We don’t have to defeat time to give our lives meaning. We just have to make something beautiful with the time we have.

[Human narration by Tommy Geoco](https://x.com/designertom)