---
layout: post
title: How to use Jekyll with NFS
description: ""
category: Guides
tags: []
published: true
---

{% include JB/setup %}

### Jekyll is powerful website parser specialized for blogs

And NearlyFreeSpeech is an amazing web hosting service for people who (should) know their way around. By that, I mean it markets itself as being specifically user unfriendly. 
It charges the uploader by bandwidth at a very affordable price, and that's why Jekyll--a static site parser-- is perfect for this type of site. 

Jekyll is a popular blog "parser" that many people use to automatically push and update to github pages: I'm going to show you how to do the same with NearlyFreeSpeech and other command-shell services. 

### **1. Get Jekyll Running**
[In my somehow future guide. ](http://wilsonzhao.com/2014/07/02/installing-jekyll-on-nfs/)
### **2. Set an alias**
An alias isn't required, but allows easy access so you don't have to type out the whole domain name every time you want to ssh:
    alias sshnfsn='ssh username_sitename@ssh.yourhostname.nearlyfreespeech.net'

### **3. Create a bare repository**
SSH into your repository and enter the password (which should be your member password for NFS)
	sshnfsn
    
You should be in the public folder--that's not good. Let's go into the private directory and create a folder for a git repo.
	cd../private     
    mkdir git 
    cd ./git
    mkdir yourwebsitename.com.git 
    cd yourwebsitename.com.git
    git init --bare
    
Why `git init --bare`? A bare init means that the repository would only be used for pushing or pulling, and would not have any directed edits.
    
### **4. Create a post-update hook**

Jekyll is a static site generator, means it generates a whole site under `/_site` that contains all the elements for a functional HTML page. We want Jekyll to generate a whole new site into `/public` from the `/private/git/.....` template. 

This is possible by hooks: scripts called within the git folder when an event happens. We're going to use a `post-update` hook, which means that it is called after we push to the site. Inside the git folder there should be a `/hooks` subdirectory. Inside that directory should be a file called `post-update.sample`

First remove the `.sample` extension. Open the script with your favorite text editor and copy paste:
	#!/bin/sh
    
    REPONAME=sitename.com # substitute the appropriate name for your site
    GIT_REPO=$HOME/git/$REPONAME.git 
    TMP_GIT_CLONE=$HOME/tmp_deploy/$REPONAME
    PUBLIC_WWW=/home/public
    rm -rRf $TMP_GIT_CLONE/*
    rm -rRf $TMP_GIT_CLONE/
    git clone $GIT_REPO $TMP_GIT_CLONE
    jekyll build -s $TMP_GIT_CLONE -d $PUBLIC_WWW

	exit

Double check if the file is executable.

### **5. Push and see results!**

Now set the git folder as a remote:

	cd ~/projects/mysite.git
	# substitute in your username, sitename and nfsn hostname
	git remote add nfsn ssh://nsfnusername-sitename@ssh.								hostname.git file path

Now you can just run

	git push nfsn master
    
Every time you commit to the changes automatically update on your site.
Remember to create a post/page you can just use

	rake post title="Hello world?"
	rake file name="Hello world!"