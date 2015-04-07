---
layout: post
title: "Hyde Jekyll Hyde: The transformation"
description: ""
category:  Programming
tags: []
published: true
---

{% include JB/setup %}
### I was (and am) hosting all my sites on a nifty service called Nearly Free Speech

You can check them out [here](https://www.nearlyfreespeech.net/). They host an extremely affordable server platform in which I use to host my websites (this one and [my company website](http://www.innogenstudios.com)), but with a few interesting caveats:

- NFS charges the host by usage--that is, the amount of bandwidth that their websites attract--at a **very** fair price. 
- Domains are also extremely cheap, about 10 dollars per year.
- They specifically market themselves as user unfriendly (it's a feature, not a bug!)
- They are designed exclusively for people who know their way around (aka not me at the time)
- In other words, no GUI, just command line

My task was, as probably evinced by the previous bullet points, was to find my way around this enigmatic service and somehow implement the Jekyll site generator and link it with the servers. 


### My guiding stars

[Major Ursa ](http://www.majorursa.net/content/using-jekyll-nearlyfreespeechnet) published a fairly detailed guide on how to properly integrate jekyll into unix hosting platforms. But there was one glaring problem with this guide: it was wrong. 

Now that was a pretty harsh evaluation, and the creator of the guide probably didn't have ill intentions and probably wrote the guide when its functions still weren't deprecated, but nontheless I had to figure things out the hard way --**on my own.**

First off, I barely had any unix command shell experience, so this was all totally foriegn me. The extent of my limited unix knowledge only included 
	cd ls mkdir rm 
but I was eager to learn and dove into it immediately. 


**Step 1: SSH Alias**
>The first thing to do is set up an ssh alias in your .bashrc file. 

It lost me at "thing." I had to ssh into the NFS servers, and just finding the server name took me about 30 minutes, much less researching what the words "alias" and "ssh" meant. To summarize, it created a shortcut in the bash files to the NFS servers so I don't have to type the server address every single time I want to access them.

**Step 2: The three folders**

There are private, protected, and a public folders within the /home directory of the NFS site. Jekyll goes into the private folder safe from prying eyes, and we want the published static site to go into the public folder.

**Step 3: Git init**
>Once you are ssh'd into nfsn, cd into /home/private and create a directory for your git repositories and create a bare git repository for your site.

I knew some of these words! I did this pretty basically, and without any problems.

**Step 4: Custom Shell Script**
>Now you have a bare git repository for your jekyll site. The following script will create a git post-receive hook, that will run every time you push to your git repository.

	#!/bin/sh

    REPONAME=mysite.git
    GIT_REPO=$HOME/git/$REPONAME
    TMP_GIT_CLONE=$HOME/git/tmp_deploy/$REPONAME
    PUBLIC_WWW=/home/public
    
    # clone the git repo into the tmp_deploy directory.
    git clone $GIT_REPO $TMP_GIT_CLONE
    # jekyll-ify the site and place html files in /home/public
    jekyll --no-auto $TMP_GIT_CLONE $PUBLIC_WWW
    
    rm -Rf $HOME/git/tmp_deploy/$REPONAME/.git/objects
    rm -Rf $HOME/git/tmp_deploy/$REPONAME/.git
    rm -Rf $HOME/git/tmp_deploy/$REPONAME
    
    exit

Huh? I was oh so extremely confused. I tried so hard to get this to work when I realized it was outdated and wrong--this will be covered later. 

**Step 5: Set Git Remote**
>Back on your home computer or wherever you are building your jekyll site, you need to create a git remote for your nsfn git repository.
  
    cd ~/projects/mysite.git
    #substitute in your username, sitename and nfsn hostname
    git remote add nfsn ssh:nsfnusername-									sitename@sshhostname.nearlyfreespeech.net/home/private/git/mysite.git

Fairly straight forward. You're pushing your local repository into a remote other than github--the NFS private folder. 

I did everything the guide said but nothing happened.