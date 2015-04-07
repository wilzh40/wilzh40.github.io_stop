---
layout: post
title: Getting started with SparkCore
description: ""
category: Programming
tags: []
published: true
---

{% include JB/setup %}

## It's 12:48 AM and I promised my buddy

Alfred that I would hardware hack with him. With what?
With [this.](http://spark.io)

### Step 1 Installing
I had to download an iPhone app so it would sync the wifi with the core...quite amazing. It connects to the Spark Cloud in which I can execute commands

### Step 2 CLI
I wanted to use Command line tools since I hate being dependent on the web IDE.
A simple
	
    npm install -g spark-cli
    
After a very tedious setup process through `spark setup` I finally got the center LED of sparkcore to flash rainbow...a sign that it works!

### Step 3 Compiling manually

Our Github repo: [link](https://github.com/wilzh40/StrobeSpark).

It uses some weird scripting language that converts an `.ipo` file into a firmware binary. So I had to kind of learn a new langugage.

### Step 4 Events
Here's the STROBE BPM

    Spark.publish("getBPM", NULL, 600, PUBLIC);

and using POSTMAN I can send a "GET" request to 

		curl https://api.spark.io/v1/devices/54ff72066667515141081567/getBPM \  -d access_token={SECRET_TOKEN} \ -d "args="300"
    
to set the BPM to 150.



