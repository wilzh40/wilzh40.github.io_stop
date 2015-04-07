---
layout: post
title: Fixing CCActionFollow
description: ""
category: Programming
tags: []
published: true
---

{% include JB/setup %}

### I wanted to have a camera layer

The current camera functionality was manipulating `_gameLayer.gameLayerOffset` to move the layer, where the position of the `_gameLayer` would be that, but negative. This would occur in the update function, where I increased the y-coordinate of `gameLayerOffset` by 3 every tick of the update function.

I decided it wasn't enough, so I tried adding a 
	[_terrain runAction:[CCActionFollow actionWithTarget:_hero]];
To provide a constant centralization of the hero regardless of the position, to have the gameLayer move around the hero instead of the otherway around. It gives the illusion of a camera. 

But it didn't work.
I realized the problem was because of the `CCActionFollow`. 
It was calculating the new position of the layer without accounting the anchorpoint of the instance it was being run on...so it bugged out. I replaced that code with

	_gameLayerOffset.x = [_gameLayer convertToWorldSpace:_hero.position].x;
   
And it worked perfectly on the x-axis! Remember if everything _should_ be working right, then its probably the libs themselved that are buggy!
    