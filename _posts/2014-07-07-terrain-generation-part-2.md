---
layout: post
title: "Terrain Generation Part 2"
description: ""
category: "Programming"
tags: []
---
{% include JB/setup %}

###There were a few problems

1. I wanted the camera to be centered on the hero object
2. This camera would be on the origin track
3. I succesfully integrated both the generic h1xy and h2xy offsets AND the angle rotation

I tried using matrix multiplication to generate my own rotate function, but it failed miserably, and I later found out why:

1. I was supposed to convert degress to radians before using `cosf()`
2. The equation was just plain wrong
3. I was entering the point as the pivot and the pivot as the point

This was all solved when I used the built-in cocos2d macro `ccpRotateByAngle`, simple, deadly, and effecient.

Here's the end result:

<img class="img-responsive" src="http://www.wilsonzhao.com/img/Terrain_1.png"></img>

###Next Steps

Now I want to make the track generate procedurally and along with it, have the difficulty modify the randomVariables.

