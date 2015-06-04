---
layout: post
title: Learning Rust by making a n body simulator
description: ""
category: Programming
tags: []
published: true
---

{% include JB/setup %}

### I've been hearing a lot of great things about Rust lately


When I staying at Zach's place after the Stupid Hackathon in San Francisco, we discussed the various new languages popping up on the horizon. Rust was basically "Go but more awesome" and after taking a quick look at its capabilities, it sounded like the next big thing; my suppostion was supported by the various HackerNews articles that praised its coming and the [v1.0.0 release](http://blog.rust-lang.org/2014/12/12/1.0-Timeline.html). I was ready to take the plunge. 
Fortunately, an opportunity presented itself; I had to make a computer simulation for a physics project, and an n-body-simulation sounded like a easy goal to aim for.

### Piston-2d

Rust's standard library is extremely lacking, so developers have to rely on the [Cargo package manager](https://crates.io/) to build anything worth showing off. I needed to find a library that created a graphical interface written with a Rust implementation. After some scourging on Github, I found [Piston](http://www.piston.rs/), a "user friendly open source game engine written in Rust."
 It was in interesting journey to traverse the experimental territory of Rust to find a suitable starting point. I found the framework by searching up "graphics" and "rust" on Github, so I only stumbled upon a single module of the framework called [graphics](https://github.com/PistonDevelopers/graphics), and I miserably failed trying to get started. Where's the documentation? Where are the tutorials? I spent an hour trying to decipher how to get started, gave up, and found another project called [glutin](https://github.com/tomaka/glutin), a "Pure Rust alternative to GLFW." I had a basic screen running, but guess what? To add more functionality, more searching pointed me full circle back to Piston2D-core, which extended glutin. Nonetheless, Piston2D was a game engine that had its own implementation of a graphics window and could run on any graphics backend, and had some bare-bones event detection. I was convinced.

### Getting started

I found one measly [tutorial](https://github.com/PistonDevelopers/Piston-Tutorials/tree/master/getting-started) to help me to my feet, and it was slightly comprehensible. After meticulously retyping the code out (copy-pasting tutorials is against my mantra) I managed to get a black square spinning against a white background. To create my gravity simulator, my first line of thought is that there has to be user interactivity, so a beginner level checkpoint would be to add that. My first impression was that the imports (`extern crate`) and bringing those imports into scope (`use library::module??`) is exceedingly confusing. This simple tutorial, with nothing more than a spinning square, took 4 separate imports.

Bringing input events into scope did not help, and I ended up with 7 lines dedicated to that task. To detect a mouse click, I used `InputEvent` rather than `Input`, and an out of scope error drove me crazy until I realized I was using the wrong version of the documentation.
 
 	  for e in window.events() {
        match e {            
            Event::InputEvent(i) => {
                app.handleInput(i.clone());
            }
            
Another interesting tidbit about Rust is that you have to use references most of the time...calling a variable directly (`for b in self.bodies`) would create a borrowing error, as that statement takes ownership of the vector and its element. To iterate through the physic bodies one has to use `for b in &self.bodies`.

	
            
        
            
            
