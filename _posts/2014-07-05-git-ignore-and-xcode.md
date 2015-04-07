---
layout: post
title: "Git Ignore and Xcode"
description: ""
category: "Guides"
tags: []
---
{% include JB/setup %}

###Sometimes you have a bunch of fluff files 

And you don't want to share them in your git repository. I'm sure everyone has this problem: for me, it was the variety personal configuration settings in xcode, the breakpoints, and the "published-iOS" folder for spriteBuilder.

This is where a `.gitignore` file does its job. It just tells git to not consider any files of that extension in the staging area, so it wouldn't clutter up your space if you do a `git status` or accident stage files for a commit using `git commit -am`.

I've had really bad experiences with using the terminal to create files (check out my vim fiascaos in my previous attempt to set up Jekyll) so I decided to use textEdit. There was a problem though: I couldn't see invisible files, and all .git related files were invisible!


    defaults write com.apple.finder AppleShowAllFiles -bool true

did the trick. Just enter the files or file extensions (`.xuserstate` or `.DS_Store1`) and when you commit the .gitignore file it'll do the trick! 

