---
layout: post
title: Installing Sibernetics and libNeuroML on OSX
description: ""
category: Programming
tags: []
published: true
---

{% include JB/setup %}

### To get started on OpenWorm, I had to install these two libraries
### Sibernetics
Sibernetics was a contractile matter simulation platform.libNeuroML was the library for computationally modeling neurons physciologically and their connections.

1) I found a minor bug with the Sibernetics installation. The makefile
`make all -f makefile.OSX" 
didn't define `$BINARYTESTDIR` and thus crashed every single time. After some more contextual debugging and analysis I isolated the problem and the team fixed it.

2) It worked, but it didn't generate a worm like the pictures showed. It seems that I had to change a line in `owPhysicsConstant.h` and change the line 
    `#define generateWormBodyConfiguration 0` to
    `#define generateWormBodyConfiguration 1`.
    
3) This, much to my dismay, crashed the program. It was because I did not set the PYTHONPATH for `pyramidalSimulation.cpp`, and it couldn't find the file `main_sim.py`. A simple `export PYTHONPATH=$PYTHONPATH` and `export PYTHONPATH=./build/` did the trick, and I copy pasted the `main_sim.py` into the `/build` folder. 

4) I tried running it again and it said it couldn't load the module `numpy`. A quick `pip install numpy` did the job.

5) It ran at a whopping 2.3 fps!
    <img src="http://www.dropbox.com/s/h1wms9u37x7yyxh/Screenshot%202014-07-25%2013.21.16.png">


###NeuroML

NeuroML was an absolute nightmare

I first started by installing Brew for the sake of an effecient package manager, and to install python. However, whenever I used `pip install insertmodulehere` it would go into the wrong directory and python could not autodetect the module. Thus, I had to `cp` the directories into the valid python module location to solve that problem.

Next I had to install a bunch of modules:

1) XLRD was an XML parsing module. I tried `pip install XLRD` but the thing was, it always crashed because it returned an error because it could not import `libXML.h`. After some scouring online the solution was to install libXML and export it, which resulted in `brew install libXML2`

2) It worked after I ran some tests by going into the `neuroml` folder and running `python run_all.py`

