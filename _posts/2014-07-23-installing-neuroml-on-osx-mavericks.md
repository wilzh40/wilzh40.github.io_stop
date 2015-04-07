---
layout: post
title: "Installing jNeuroML on OSX Mavericks"
description: ""
category: "Guide"
tags: []
---
{% include JB/setup %}

I think I witnessed one of the amazing things about automation. 
I wanted to install a preliminary jNeuroML test to parse XML Neuron information according to the NeuroML2 protcol, so I checked out their github page.


    git clone git://github.com/NeuroML/jNeuroML.git neuroml_dev/jNeuroML
    cd neuroml_dev/jNeuroML
    python getNeuroML.py development

It returned an error because I didn't have Maven, a compiler for java. 

    brew install maven
    
And for 15 minutes straight lines of automated code ran down my computer, compiling all the development branches of 11 different github repos, and codeinjecting and minimizing everything into a single java binary. 

Amazing. 

