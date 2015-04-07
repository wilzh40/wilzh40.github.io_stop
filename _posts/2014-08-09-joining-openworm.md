---
layout: post
title: Joining OpenWorm
description: ""
category: null
tags: []
published: true
---

{% include JB/setup %}

### Yesterday I was added to the OpenWorm Organization

On Github. After a few 
OpenWorm is one of the only projects that aims to simulate a worm within a computer system, and starting today I will actively be part of it.

I already installed jNeuroML, Sibernetics, and a variety of other repos in the OpenWorm organization. My job: [translating the c302 model into the actual worm body](https://github.com/openworm/OpenWorm/issues/177) by stimulating the muscles.

There's a problem however: Sibernetics runs at a grand 2 fps on my computer, and after tracking the screen over night (12 hours) I had about 0.5 seconds of real time footage.

It is hard to test feedback when it takes so long for the model to produce and simulate results; perhaps it will be better once I install linux on my GPU gaming laptop (farewell games)

The second problem is that the worm body is hardcoded into the Sibernetics in `ow_helper.cpp`. That means I don't know how to connect the inputs; there are 96 muscles but each doesn't have its own name, but merely an index in a muscle array.

Let's see what I can do.