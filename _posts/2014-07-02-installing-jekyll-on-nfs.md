---
layout: post
title: Installing Jekyll on NFS
description: ""
category: null
tags: []
published: true
---

{% include JB/setup %}

I screwed up pretty badly. This blog was returning an ASCII byte conversion error in
`jekyll build` ironically when I was pushing my guide on how to integrate Jekyll with NFS, so I tried troubleshooting the problem, using [this](http://jekyllrb.com/docs/troubleshooting/) as my guide. 

> On NearlyFreeSpeech you need to run the following commands before installing Jekyll:
	export GEM_HOME=/home/private/gems
	export GEM_PATH=/home/private/gems:/usr/local/lib/ruby/gems/1.8/
	export PATH=$PATH:/home/private/gems/bin
	export RB_USER_INSTALL='true'
    
And that broke the site, so I had to delete the site from NFS and make a new one from scratch. There were a few more hoops I had to jump through; I can't install Jekyll because I don't have access to the sudo command (with good reason), but turning on `USER_INSTALL` me to install the gems in a regular folder. Also, the export path to Gems was actually 1.9, the guide was outdated, so I had to change it to 

	export GEM_HOME=/home/private/gems
	export GEM_PATH=/home/private/gems:/usr/local/lib/ruby/gems/1.9/
	export PATH=$PATH:/home/private/gems/bin
	export RB_USER_INSTALL='true'

And then I ran 
	
    gem install jekyll

But it still returned an error when I tried `jekyll build`! Something something javascript runtime wasn't found on the server. Luckily stackoverflow had a solution: 
	
    gem install therubyracer
    
Which is a java runtime packaged in a ruby gem. Hope that helps any confused souls out there!
    
    
    