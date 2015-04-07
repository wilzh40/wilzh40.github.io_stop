---
layout: post
title: "Hyde Jekyll Hyde: Scripted"
description: ""
category: Programming
tags: []
published: true
---

{% include JB/setup %}
###I had to create and implement a server-side script that ran everytime I pushed to the remote in wilsonzhao.com

The problem was that I had no idea how to accomplish this, and that the guide didn't really have instructions. 

My first step was to figure out what the word "script" meant. From the back of my mind, I knew that it was a series of unix shell commands that could be run by calling "./scriptname." But how do I create one? To solve that, I turned to my trusty friend google and stumbled upon the [Bash Guide for Beginners](http://www.tldp.org/LDP/Bash-Beginners-Guide/html/sect_02_01.html). 

###Vim

>To create a shell script, open a new empty file in your editor. Any text editor will do: vim, emacs, gedit, dtpad et cetera are all valid. You might want to chose a more advanced editor like vim or emacs, however, because these can be configured to recognize shell and Bash syntax and can be a great help in preventing those errors that beginners frequently make, such as forgetting brackets and semi-colons.

Vim, I later found out, was the de-facto text-editor of the days past. I gave it a try and entered "Vim" in the command and line, and was presented with a bunch of tildes and blank spaces. However, I couldn't type: none of my keyboard strokes were inputting into the buffer!

After some frantic troubleshooting I realized I needed to throw my whole conventional knowledge about text editors away when I read [A Beginner's Guide to Vim](https://www.linux.com/learn/tutorials/228600-vim-101-a-beginners-guide-to-vim). 

There were two separate modes: control mode and input mode. Unlike Microsoft Word, the end user could only interact with the document by using keyboard commands in control mode, and had to switch to input mode to input text by pressing "i." Control mode had a bunch of functions that were mapped completely differently from their modern counterparts.

For example:
- "gg" in control mode moves to the beginning of the file
- You had to move the cursor using the keys h,j,k,l, and 0.
- All meta commands such as saving and quitting had to be preceded by a colon in control mode
- You can't tell what mode you are in so the best bet is to hit the esc key three times to ensure you are in contorl mode.

I tried to command-C command-V the script text into the Vim editor but the process failed because it wasn't part of the builtin clipboard buffer. Later on, I resorted to entering the script line by line manually until I accidnetally deleted the whole thing in command mode. I subsequently quit using Vim in frustration. 

###The Script

I did the rest by using a GUI FTP interface and copy pasting the script every time I made a change to it...why didn't I think of that earlier? I edited the script using Mac's simple and user-friendy textEdit. Anyways the next step of the guide was:
>Now, every time you "git push" into nfsn this post-receive hook will auto-regenerate your jekyll site.

I named the script post-recieve and dragged it into the private folder.
I pushed to the remote.

**It didn't work.**

I realized that it was still a .txt file and not a script, so I renamed it .sh 

**It still didn't work.**

I then realized that nothing happened when I pushed it, so I troubleshooted the problem by snooping around the script's properties. Lo and behold, it wasn't executable, so even if everything went right the script couldn't be run by the server.

	chmod ug+x /home/private/git/wilsonzhao.com.git/post-recieve.sh

That should do the trick.

**And...crickets.**

The problem then must be the fact that the script wasn't getting called in the first place. I opened the git directory and found a folder called "hooks"--maybe it would work if it was in the correct directory!

**Not today.**

In the "hooks" directory there were a variety of files that were named "pre-commit"
"post-update" "update" with a .sample file extension. I opened one up using textEdit and realized that they were example scripts that would become functional without the .sample extension. However, not one of those .sample hooks matched "post-receive." The most logically analogous script was "post-update" so I copy pasted the script text into that file and removed the .sample extension. I then verified it by running natively in bash.

**So close!**

It ran, but no cigar: the shell returned an error in which it stated that the jekyll function was breaking somewhere...that there was no such option as "-no--auto" as stated by the guide. I checked out its manual and changed

	jekyll --no-auto $TMP_GIT_CLONE $PUBLIC_WWW
    
to

	jekyll -s $TMP_GIT_CLONE -b $PUBLIC_WWW

**And it worked!**

It published a complete directory into the /public folder when I ran 

	git push wilsonzhao.com master
    
But it didn't work a second time: this was because the command

	rm -Rf $HOME/git/tmp_deploy/$REPONAME
    
didn't remove the directory for some reason, but it worked out in the end when I placed in the beginning of the file.

This process of trial and error took me about 6 hours, and about 20 1-line-changed commits to test the post-update hook.