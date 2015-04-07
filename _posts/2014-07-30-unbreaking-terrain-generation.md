---
layout: post
title: Unbreaking Terrain Generation
description: ""
category: null
tags: []
published: true
---

{% include JB/setup %}

### There was a problem with Terrain Generation

Thing is, after a certain point the game breaks. Why? It becomes impossible for the hero to progress, since no gap exists that will allow the hero to pass. It means that I have to rewrite a good majority of the code to add a sanity check function and rework Obstacles. How will I do it? 

1. Check the distance between the two hills. This means finding the smallest possible the gap between each keypoint with a tolerance of about 5 indices...and compare to each distance by using the pythagorean theorem.
2. Dynamically change the randomization of the obstacles and set a ceiling for the contentsize..that means calculating the contentsize before hand and translating that in terms of scale
3. Find the obstacle width (if there is one) to be distance of the gap minus the full contensize of the hero to be greater than a certain preset padding, and if it fails the test regenerate the point OR obstacle.
4. Debug.

Sounds like another week of fun!

