---
layout: post
title: "Terrain Generation Part 4"
description: ""
category: "Programming"
tags: []
---

### I had the keypoints down
But I needed to add variety. 
This was done through two functions, which utilize some tricky geometry, trigonometry, and math to accomplish creating a pseudo-random variety to the terrain.
Here's an example:


    - (void)jaggedLinesFromPoint:(CGPoint)x0 to:(CGPoint)x1
    {
        CGPoint p0 = x0;
        CGPoint pf = x1;
        int totalxdiff = pf.x-p0.x;
        int totalydiff = pf.y-p0.y;
        //float mainslope = totalydiff/totalxdiff;
        float baseDx = totalxdiff/MAX_JAGGED_VARIATIONS_PER_LINES;
        float baseDy = totalydiff/MAX_JAGGED_VARIATIONS_PER_LINES;
        CGPoint plast = p0;
        CGPoint pcurrent;
        for (int i = 1; i < MAX_JAGGED_VARIATIONS_PER_LINES; ++i) {
            float currentX = plast.x + baseDx + frandom_range(-JAGGED_X_VARIATION, JAGGED_X_VARIATION);
            float currentY = plast.y + baseDy + frandom_range(-JAGGED_Y_VARIATION, JAGGED_Y_VARIATION);
            pcurrent = ccp(currentX, currentY);
            if (pcurrent.y<pf.y) {
                [_drawNode drawSegmentFrom:plast to:pcurrent radius:5 color:[CCColor whiteColor]];
            } else {
                break;
            }
            plast=pcurrent;
        }
        [_drawNode drawSegmentFrom:plast to:pf radius:5 color:[CCColor whiteColor]];

    }


    - (void) curveLinesFromPoint:(CGPoint)p0 to:(CGPoint)p1
    {
        
        // This the last init function, so turn initPhase false
        _initPhase = NO;
        
        //h1
        // Take two points of the origin line
        
        CGPoint h1p0 = p0;
        CGPoint h1p1 = p1;
        // Create a segments of size _curveSegmentSize
        
        float hSegments = floorf((h1p1.y-h1p0.y)/(int)_curveSegmentSize);
        float dy = (h1p1.y - h1p0.y) / hSegments;
        float da = M_PI / hSegments;
        float xmid = (h1p0.x + h1p1.x) / 2;
        float ampl = (h1p0.x - h1p1.x) / 2;
        
        CGPoint h1pt0, h1pt1;
        h1pt0 = h1p0;
        h1pt1 = h1p1;
        //[_drawNode drawSegmentFrom:h1p0 to:h1p1 radius:5 color:[CCColor whiteColor]];
        for (int j = 0; j < hSegments+1; ++j) {
            
            
            h1pt1.y = h1p0.y + j*dy;
            h1pt1.x = xmid + ampl * cosf(da*j);
            
            
            [_drawNode drawSegmentFrom:h1pt0 to:h1pt1 radius:5 color:[CCColor whiteColor]];
            h1pt0=h1pt1;
        }
    }

And here's the result!
<img class="img-responsive" src="http://www.wilsonzhao.com/img/Terrain_2.png">
{% include JB/setup %}
