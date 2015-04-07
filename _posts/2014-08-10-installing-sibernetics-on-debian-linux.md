---
layout: post
title: "Installing Sibernetics on Debian Linux"
description: ""
category: 
tags: []
---
{% include JB/setup %}

### Today I spent my entire morning

trying to install nVidia drivers on my Lenovo Y570 laptop.
I just partitioned and created a fresh volume of the [CrunchBang distro](http://crunchbang.org/), a simple and unbloated linux distro. And that's where everything starts going downhill.

I first started by installing the AMD graphics driver and SDK that included OpenCL, OpenGL, and a variety of things. Of course, this is all after I ran some scripts that installed the latest versions of python, yada yada, other unimportant packages.

But the GPU wasn't being detected, my GeForce 555M didn't appear.
So I installed the nVidia drivers, apt-getting a motley of diffrent nVidia packages, and ran it. 
I run `nvidia-xconfig` that changed the `.conf` files for the X server, rebooted, and it turns out that my graphical interface no longer worked. After a couple hours of troubleshooting I figured out just removing the `.conf` files restored it back.

Now what? I did some intensive googling, and it turns out many other Crunchbang users had the same problem. In fact, it turns out my GPU is an OPTIMUM gpu, a special type of GPU that requires [Bumblebee](http://bumblebee-project.org/), another linux package to run. So lo and behold, I did another `apt-get install` but no cigar.

The installation package, more specifically `bbswitch` couldn't detect the GPU. It turns out through some cruel turn of events, **out of the thousands and thousands of laptop models in existence, mine, the Lenovo Y570 is the only one where the install is bugged**. I almost cried. But fear not, through the [dirtiest hack of my life](https://github.com/Bumblebee-Project/bbswitch/issues/2#issuecomment-3797568) I patched the kernel through some voodoo magic (I don't even know what the kernel specifically does, or why we had to) and it worked.

When I tried to clone sibernetics, and ran the `makefile`. I kept on getting an error. Apparently ALL OF THE PREDEFINED FUNCTIONS AND HEADERS in `/usr/include/CL` were not defined, even though `apt-get install opencl-headers`, the precompiled package for opencl headers, was completely up to date. It turned out that I had to roll back a version by manually `rm -rf /usr/include/CL` and `wget` all of the header files from the 1.1 library (the current version is 1.2) from the official website on [khronos.org](http://www.khronos.org/registry/cl/). 

And it ran. I cried. Finally, all the hard work would be worth it.

Nope. Running it with `optirun` on the GPU had a performance increase of...
2 fps.

There goes my morning. 
Next step: running the simulation overnight and screencapture it. 
