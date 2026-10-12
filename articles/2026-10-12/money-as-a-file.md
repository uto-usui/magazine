---
title: "Money as a file"
source: "https://design.lightspark.com/money-as-a-file"
publishedDate: "2026-10-08"
category: "design"
feedName: "Sidebar"
---

We wanted to push our docs and infrastructure at Lightspark to see if we could make digital money feel more like physical money. We built native apps around a money file. People are already familiar with files. They know how to pick one up, attach it to something, and send it to someone.

That became [dotmoney](https://money.psst.gg/), a working prototype for Mac, iPhone, and the web. It uses Spark wallets and a test version of USDB. Here’s what we built.

## What came with the file

We were surprised at how quickly we had something functional. We pointed an agent at our docs, used the infrastructure they give us access to, and spent most of the time exploring what we wanted to make beyond a traditional wallet.

Choosing a file gave us a lot to work with. Finder, email, Messages, AirDrop, even an SD card became useful parts of the experience. We could put an amount of money into a conversation or hand it over on something physical, using tools people already have.

The native apps also gave us room to explore how that should feel: seeing the amount on the file, dragging it out of the wallet, or flicking it between two phones.

If you have an idea for doing something different with money, the [Spark docs](https://docs.spark.money/) and [Lightspark Grid docs](https://docs.lightspark.com/) are where we started. Point your agent at them and see what you can make.

## Try it yourself

This prototype uses test funds. A money file carries the key to its own funded wallet; anyone with an unclaimed file can access that amount. Our service can also access registered, unclaimed funds and holds balances accepted in the browser. We’ve documented these tradeoffs and the rest of [how it works](https://money.psst.gg/how).