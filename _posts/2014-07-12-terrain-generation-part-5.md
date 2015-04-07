---
layout: post
title: "Terrain Generation Part 5"
description: ""
category: "Programming"
tags: []
---
{% include JB/setup %}

###I generated jagged points

And now I had to fill it with a texture. To give it a test run, I resued the `CCDrawNode` methods thats created a shaded polygon. However, I ran into a problem: it was only drawing one segment at a time, and I couldn't store all the points to be drawn into two concise arrays. Instead, I only have the arrays per section so it is drawing using breakpoints. 

<img class="img-responsive" src="http://www.wilsonzhao.com/img/Terrain_3.png"> </img>