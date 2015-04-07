---
layout: post
title: Shirts.io hackathon
description: ""
category: Event
tags: []
published: true
---

{% include JB/setup %}

2:14 PM Day 2
I spend 3 goddamn hours trying to get the shirts.io api to run. Apparently, the data encoding doesn't need to create a json to post, just in the format of parsing a NSDictionary into "KEY=VALUE&KEY=VALUE...."

4:30
Added an image picker, our current plan is to use an HTTP GET request to get a picture and then superimpose a random clipart on openclipart.com onto a shirt. Let's see if this works. 

5:21

I added and converted code that saved images from the internet into local files...let's see how it works!

8:55

It works. I used a dirty method (it is hackathon after all) 
	 var randomNumber = arc4random()%200000
        var randomImage:UIImage = singleton.getImageFromUrl("https://openclipart.org/image/200px/svg_to_png/\(randomNumber)/write2.png")
    
        while (randomImage == nil ){
            //If its lower
            var randomNumber = arc4random()%200000
            randomImage = singleton.getImageFromUrl("https://openclipart.org/image/200px/svg_to_png/\(randomNumber)/write2.png")
        }
        imgFromUrl.image = randomImage
        
10:30 Adding in sexy UI

3:15 Retiring to sleep for 3 hours

6:15 Finish storyboard segues and connect @IBActions and @IBOutlets

9:40 Working prototype + presented!

10:12 Posted to hackerbracket [here](http://challengepost.com/software/shirprize)

12:27 Finally presented "ShirPrize" Looks sexy, clean interface, even though crashed once in the demo.

1:23 My boy Ariel is taking me home, best filipino bro 2014

The final github project!

[ShirPrize-Me](https://github.com/wilzh40/ShirPrize-Me/tree/master)