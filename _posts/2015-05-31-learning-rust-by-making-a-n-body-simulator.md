---
layout: post
title: "Learning Rust by making an N-body simulator"
description: ""
category: Programming
tags: []
published: true
---

{% include JB/setup %}

### I've been hearing a lot of great things about Rust lately


When I staying at Zach's place after the Stupid Hackathon in San Francisco, we discussed the various new languages popping up on the horizon. Rust was basically "Go but more awesome" and after taking a quick look at its capabilities, it sounded like the next big thing; my supposition was supported by the various HackerNews articles that praised its coming and the [v1.0.0 release](http://blog.rust-lang.org/2014/12/12/1.0-Timeline.html). I was ready to take the plunge. 
Fortunately, an opportunity presented itself; I had to make a computer simulation for a physics project, and an n-body-simulation sounded like an easy goal to aim for. Furthermore, after learning the basics of t-mux and vim, I was ready to become a "true programmer" and got rid of my mouse. It was just me and my trusty keyboard. 

### Piston-2d

Rust's standard library is extremely lacking, so developers have to rely on the [Cargo package manager](https://crates.io/) to build anything worth showing off. I needed to find a library that created a graphical interface written with a Rust implementation. After some scourging on Github, I found [Piston](http://www.piston.rs/), a "user-friendly open source game engine written in Rust."
 It was an interesting journey to traverse the experimental territory of Rust to find a suitable starting point. I found the framework by searching up "graphics" and "rust" on Github, so I only stumbled upon a single module of the framework called [graphics](https://github.com/PistonDevelopers/graphics), and I miserably failed trying to get started. Where's the documentation? Where are the tutorials? I spent an hour trying to decipher how to get started, gave up, and found another project called [glutin](https://github.com/tomaka/glutin), a "Pure Rust alternative to GLFW." I had a basic screen running, but guess what? To add more functionality, more searching pointed me full circle back to Piston2D-core, which extended glutin. Nonetheless, Piston2D was a game engine that had its own implementation of a graphics window and could run on any graphics backend, and had some bare-bones event detection. I was convinced.

### Getting started

I found one measly [tutorial](https://github.com/PistonDevelopers/Piston-Tutorials/tree/master/getting-started) to help me to my feet, and it was slightly comprehensible. After meticulously retyping the code out (copy-pasting tutorials is against my mantra), I managed to get a black square spinning against a white background. To create my gravity simulator, my first line of thought is that there has to be user interactivity, so a beginner level checkpoint would be to add that. My first impression was that the imports (`extern crate`) and bringing those imports into scope (`use library::module??`) is exceedingly confusing. This simple tutorial, with nothing more than a spinning square, took 4 separate imports.

Bringing input events into scope did not help, and I ended up with 7 lines dedicated to that task. To detect a mouse click, I used `InputEvent` rather than `Input`, and an out of scope error drove me crazy until I realized I was using the wrong version of the documentation.
 
       for e in window.events() {
        match e {            
            Event::InputEvent(i) => {
                app.handleInput(i.clone());
            }
            
Another interesting tidbit about Rust is that you have to use references most of the time...calling a variable directly (`for b in self.bodies`) would create a borrowing error, as that statement takes ownership of the vector and its element. To iterate through the physic bodies, one has to use `for b in &self.bodies`.

I ran into the same problem trying to reference `self` in a closure. 

        self.gl.draw(args.viewport(), |c, gl| {
            for b in &self.bodies { //Render stuff here}
        }
Returned an error because the `closure requires unique access to "self"`. My solution was to move the iterator outside the closure, like so.
     for b in &self.bodies {
            // Iterate through all the bodies

            self.gl.draw(args.viewport(), |c, gl| {
                let circle = rectangle::square(b.position.0, b.position.1, b.radius);                             
                ellipse(BLACK, circle, c.transform, gl);
            }
      }
      
 But I realized that I was missing a clear function, and after placing 
 
         self.gl.draw(args.viewport(), |c, gl| {
            // Clear the scene after all bodies are drawn
            clear(WHITE, gl);
        });
 AFTER every loop, refactoring the code 20 times, I finally realized that the best place for it was indeed before. 
    
    
### Gravity

The hardest part was having a nested iterator to go through `self.bodies` twice and apply a Newtonian force to each of them. This is another instance of Rust "locking" an instance variable so we can't borrow twice. I tried multiple combinations of the following snippet to no avail. 

      for a in &mut self.bodies{
            for b in &self.bodies{
            }
      }
I had a brilliant idea...what if I clone the `vec!`?? However, there seemed to be a problem, since the coreutil for cloning was not implemented for `Vec<Body>`. After intensive googling, placing the compiler flag `#[derive(Clone)]` before the Body struct did the trick.

      for a in self.bodies.clone(){
            for b in &mut self.bodies{
            }
      }
      
 But...it still didn't work. I needed to reverse the order of the loops so I can summate the total acceleration and I got hit with another error...that `self.bodies.clone()` was a `moved value` and I'm a bad person. I did what any lazy programmer would do. If I can't clone something once, can I clone it twice? I'm a genius and a horrible person.
 
      let clone = self.bodies.clone();
        for a in &mut self.bodies{
            for b in clone.clone(){
            .....

Lastly, the code managed to compile, but there was a certain problem...if the bodies become close enough they will instantly accelerate out of the screen. 

        let displacement = (b.position.0 - a.position.0, b.position.1 - a.position.1);
        let angle = displacement.1.atan2(displacement.0);
        let distance = (displacement.0.powf(2.0) + displacement.1.powf(2.0)).powf(0.5);
        let accel_magnitude = G * m2 / (distance * distance) ; 
         let acceleration = (angle.cos() * accel_magnitude, angle.sin() * accel_magnitude);

When they became close enough, distance approached zero, and the magnitude approached infinite. After researching some simulators online, I found a damping constant did the trick. 

    let eps = 1.5e1; //dampening parameter to avoid infinites  
    let accel_magnitude = G * m2 / (distance * distance + eps * eps) ; 
    

Last minute thoughts:

- Looping through vecs and doing things with those vecs are extremely painful
- Kind of annoying to type annotate when you can't divide a `f64` by an integer...you have to divide by `2.0` not just `2`
- Writing functions for closures looks pretty hard. Heck, even understanding what they do is pretty hard.
- It runs pretty fast!
- Managing imports is a huge pain
- That being said, the packaging system is pretty easy to setup, but hard to keep track of.


You can check out the final GitHub project [here](https://github.com/wilzh40/GravitySim-Rust).
            
            
