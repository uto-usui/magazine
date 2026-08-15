---
title: "Liquid Gooey"
source: "https://gooey.jakubantalik.com/"
publishedDate: "2026-08-14"
category: "design"
feedName: "Sidebar"
fetchedBy: "playwright"
---

Share![](https://gooey.jakubantalik.com/assets/avatar-1-CPOzgOtN.png)![](https://gooey.jakubantalik.com/assets/avatar-2-7dpz207w.png)![](https://gooey.jakubantalik.com/assets/avatar-3-wFUSsUGr.png)

![Drag into the group](https://gooey.jakubantalik.com/assets/avatar-4-BGoBMA3M.png)

## Installation

`npm install liquid-gooey`

## Usage

`import { Liquid } from 'liquid-gooey' export function Menu({ open }: { open: boolean }) { return ( <Liquid blur={6} contrast={18} fill="#fff" shadow="0 2px 6px rgba(0,0,0,.08)"> <Liquid.Item x={open ? -54 : 0} y={open ? -34 : 0} transition="bouncy"> <button className="round-btn">…</button> </Liquid.Item> <Liquid.Item x={0} y={open ? -64 : 0} transition="bouncy" delay={40}> <button className="round-btn">…</button> </Liquid.Item> </Liquid> ) }`

## Playground

Type

Goo blur

6

Contrast

18

`import { Liquid } from 'liquid-gooey' export function PlusMenu({ open }: { open: boolean }) { return ( <Liquid blur={6} contrast={18} fill="#fff"> <Liquid.Item x={open ? -54 : 0} y={open ? -34 : 0} transition="bouncy"> <button className="round-btn">…</button> </Liquid.Item> <Liquid.Item x={0} y={open ? -64 : 0} transition="bouncy" delay={40}> <button className="round-btn">…</button> </Liquid.Item> <Liquid.Item> <button className="round-btn">+</button> </Liquid.Item> </Liquid> ) }`