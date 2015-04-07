---
layout: post
title: "Terrain Generation Part 3"
description: ""
category: Programming
tags: []
---
{% include JB/setup %}
###Procedural Generation was a headache

I've noticed that adding a cosine-modified curve to the existing terrain map was taking about 2 minutes to preload after pressing "Play."

Thus, the decision was made: We had to generate the terrain procedurally, in other words, one part at a time.
To do this, I have two `while` loops being called in the update function:

    while (originFromFitX && originFromFitY) {
        _fromKeyPointI++;
        originFromFitX = _origins[_fromKeyPointI+1].x < _offset.x-winSize.width/8/self.scale;
        originFromFitY =_origins[_fromKeyPointI+1].y < _offset.y-winSize.height/8/self.scale;
    }
    while (originToFitX && originToFitY) {
        _toKeyPointI++;
        originToFitX =_origins[_toKeyPointI+1].x < _offset.x+winSize.width*12/8/self.scale;
        originToFitY = _origins[_toKeyPointI+1].y < _offset.y+winSize.height*12/8/self.scale;

What this did was create a range of verticies (`originFromFixXY` and `originToFitXY` and their indices `toKeyPointI` and `fromKeyPointI`) that were to be shown and drawn on the player's screen, plus some padding.
Then, I had another function in the `update:` function of `TerrainLayer.m`.

      int tempKeyPointI = _toKeyPointI;
        [self resetHillVertices];
        if (_toKeyPointI>tempKeyPointI) {
            // If a new origin set of points is needed, redraw and update
            [self setRandomVars];
            [self generateOriginAngles];
            [self generateOrigins];
            [self generateLines];
            [self draw];
            [self curveLines];
        }

This funciton watched `toKeyPointI` and if it changed--that is, a new set of points need to be drawn-- it update the next index in each of the following arrays.
This is a massive oversimplification of what actually went down, but is pretty much the gist of it; I had to wrangle with too many for loops today, taking a programming break tomorrow.
