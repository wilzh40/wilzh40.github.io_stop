---
layout: post
title: Git Submodulation
description: ""
category: Programming
tags: []
published: true
---

{% include JB/setup %}

### Git submodules are nifty

[Cocos2d v3.2](http://forum.cocos2d-swift.org/t/cocos2d-3-2-beta-available-add-stunning-effects-to-your-game/14558/29) was coming out and I thought it an apt time to include submodules into my projects. Git submodules are for including libraries that are also git other git projects so they will sync once commits are made. In this case, I already had a bleeding-edge version of cocos2d, but I wanted it to update dynamically (no copy pasting) everytime a new commit rolled out, especially with the buggy feature of CCEffects.

I first had to remove the local copy of cocos2d-iphone, so I tried

	git submodule
	rm -rf ./Source/libs/cocos2d-iphone/
    git submodule add -b develop https://github.com/cocos2d/cocos2d-iphone.git
    
But it didn't work! 
It said that the index already existed.
After a while, I realized even though the folder was nuked, its reference in the `.git` file wasn't, so

	git rm -rf ./Source/libs/cocos2d-iphone

did the trick.

However, my submodule wasn't compiling, because the submodule needed _further_ submodules! (In this case, it was the Chipmunk physics library).

	git submodule update --recursive
    git submodule update --init --recursive
    
These two lines did the trick.

