---
layout: post
title: "Terrain Generation Part 6"
description: ""
category: "Programming"
tags: []
---
{% include JB/setup %}

###I'm almost done with Terrain Generation

The hardest part was getting everything to draw properly, to fill up the hills with color and textures. I did prototype run by doing 

     [_drawNode drawPolyWithVerts:_h1ff count:[_h1fftemp count]+3 fillColor:[CCColor blackColor] borderWidth:1.f borderColor:[CCColor whiteColor]];
    //   [_drawNode drawPolyWithVerts:_h2ff count:[_h2fftemp count]+3 fillColor:[CCColor blackColor] borderWidth:1.f borderColor:[CCColor whiteColor]];

I used the native CCDrawNode to fill in the vertices but the thing is, it didn't work too well. I had to use builtin shaders.

There are three parts:

1) Enqueueing the renderer for the amount of triangles

2) Converting all the `CGPoint`s to be drawn into `CCVertexes`. 

3) Setting the vertices within the render buffer.

Easy right? 
This took me about two whole weeks to pull off. 

Here's the magnificient masterpiece of code that pulled it off:

    -(void) draw:(CCRenderer *)renderer transform:(const GLKMatrix4 *)transform
    {
        // This function is called automatically; I'm overwriting the parent classes draw function.
        
        // If the vertices are not filled, then abort the mission
        if (_h1Vertices==false || _h2Vertices==false)
            return;

        CCRenderBuffer buffer1 = [renderer enqueueTriangles:2*_h1vc andVertexes:2*_h1vc withState:self.renderState globalSortOrder:0];
        
        const GLKVector2 zero2 = {{frandom_range(0, 1), frandom_range(0, 1)}};
        const GLKVector4 zero4 = {{1, 1, 1, 1.0}};
        for(int i=0, j=_h1vc-1; i<_h1vc; j=i, i++){
            // Creates a CCVertex with 4 parameters, its position (x,y,z-order,and w-magnitude), tex coordinates 1 and tex coordinates 2, and its color (r,g,b,a)
            CCVertex v = (CCVertex){GLKVector4Make(_h1ff[i].x, _h1ff[i].y, 0.0f, 1.0f), zero2, zero2, zero4};
            CCRenderBufferSetVertex(buffer1, 2*i + 0, CCVertexApplyTransform(v, transform));
            // End drawn towards one side of the screen
            v.position.x = -500;
            CCRenderBufferSetVertex(buffer1, 2*i + 1, CCVertexApplyTransform(v, transform));
            // Enters the vertices into the triangle buffer with some black magic ninja code
            CCRenderBufferSetTriangle(buffer1, 2*i + 0, 2*i + 0, 2*i + 1, 2*j + 0);
            CCRenderBufferSetTriangle(buffer1, 2*i + 1, 2*j + 1, 2*j + 0, 2*i + 1);
        }
        CCRenderBuffer buffer2 = [renderer enqueueTriangles:2*_h2vc andVertexes:2*_h2vc withState:self.renderState globalSortOrder:0];
        
        for(int i=0, j=_h2vc-1; i<_h2vc; j=i, i++){
            CCVertex v = (CCVertex){GLKVector4Make(_h2ff[i].x, _h2ff[i].y, 0.0f, 1.0f), zero2, zero2, zero4};
            
            CCRenderBufferSetVertex(buffer2, 2*i + 0, CCVertexApplyTransform(v, transform));
            // End drawn towards the other side of the screen
            v.position.x = 500;
            CCRenderBufferSetVertex(buffer2, 2*i + 1, CCVertexApplyTransform(v, transform));
            
            CCRenderBufferSetTriangle(buffer2, 2*i + 0, 2*i + 0, 2*i + 1, 2*j + 0);
            CCRenderBufferSetTriangle(buffer2, 2*i + 1, 2*j + 1, 2*j + 0, 2*i + 1);
        }

        
    }

###The triangles as shown by the GL Debug screen
<img class="img-responsive" src="http://www.wilsonzhao.com/img/Terrain_5.png">

###The actual result
<img class="img-responive" src="http://www.wilsonzhao.com/img/Terrain_4.png">

