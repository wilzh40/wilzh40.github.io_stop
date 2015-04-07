---
layout: post
title: Git Rebase and Me
description: ""
category: null
tags: []
published: true
---

{% include JB/setup %}
### Today I used Git rebase for the first time

> And then there’s `git rebase --interactive`, which is a bit like 
`git commit --amend` hopped up on acid and holding a chainsaw–completely insane and quite dangerous but capable of exposing entirely new states of mind."

-Ryan Tomayko, The Thing About Git, April 2008

`Git rebase --interactive`, in a nutshell, is one of the most confusing and awe-inspiring I have found in my history of programming, and today I decided I tried to use it. It helps squash, merge, and destroy previous commits, and has immense functionality. It fundamentaly changed the way I viewed git; and I used this [guide](http://feeding.cloud.geek.nz/posts/combining-multiple-commits-into-one/) to help me do it.

I wanted to combine multiple edits of readme.md in [prose.io](http://prose.io) to this blog into one single and clean commit, and fix the damage I did while "test-commiting" to test the git hook. 

In essence, I had to check out the commits I made by using

	git log --oneline
    
and then start using `git rebase` by picking a commit and then squashing it. 
The squashed commit would adopt the name of the picked commit, resulting in one final commit. This totally blew me mind, the person who created git must be a programming wizard.