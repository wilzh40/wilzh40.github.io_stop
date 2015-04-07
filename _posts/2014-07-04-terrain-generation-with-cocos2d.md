---
layout: post
title: "Terrain Generation with cocos2d"
description: ""
category: "Programming"
tags: []
---
{% include JB/setup %}

##I wanted to make a dynamically generated terrain, with obstacles, using cocos2d and its methods.

 The first step was to create the base terrain and debug using simple gL lines.

 It would be like tiny wings but the "hills" would be on two sides. Here's my current thought process:

 0. Create @implementation CGPoint arrays for all variables below
 1. Create an origin curve path on the y axis
 2. Generate 2 sets of offsets x and offsets y
 3. These would be added to the origin CGPoint to create two separate "border" hills with their own array of CGPoints
 4. Calculate "origin angle", equal to the angle normal to the line created from `h1[i-1]` and `h2[i-1]`
 5. Change the angle by adding a randomly generated angle offset
 6. Generate the next iteration of offsets x and offsets y
 7. Transform these offsets in terms of the previous originAngle + offset
 8. Generate the next iteration of h1 and h2
 9. Curve all three lines by using a cosine curve and building line segments in between the keypoints.
 
 So there would be these variables:

        CGPoint _origins[MAX_POINTS_PER_LINE];
        CGPoint _h1[MAX_POINTS_PER_LINE];
        CGPoint _h2[MAX_POINTS_PER_LINE];
        float _originAngle[MAX_POINTS_PER_LINE];
        float _h1y [MAX_POINTS_PER_LINE];
        float _h2y [MAX_POINTS_PER_LINE];
        float _h1x [MAX_POINTS_PER_LINE];
        float _h2x [MAX_POINTS_PER_LINE];

Plus I'll be drawing everything using a drawNode; this will be the trapezoidal method, there would be more to come!


