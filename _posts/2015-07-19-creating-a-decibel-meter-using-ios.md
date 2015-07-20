---
layout: post
title: Creating a Decibel Meter using iOS
description: ""
category: null
tags: []
published: true
---


{% include JB/setup %}

## At the Outside Lands hackathon I made an app called Decimate

### Background
On the way to the hackathon, I struggled to come up with a useful idea for an application that would prove useful to the general music-loving/festival-going population. Just as I was running out of brain juice, and just when BART drew closer to Montgomery station, a small a-ha moment hit me. Recently, I heard that [Rob Swire lost his hearing](http://www.edmtunes.com/2015/07/rob-swire-loses-hearing-deaf/), and I was positively heartbroken (even though, as I found out later, it was because of vaping). This caught my attention, as I personally experienced hearing pain after prolonged exposure to harmful decibel levels, a problem that would be exacerbated at festivals. I did some additional research and found that ["in a survey of 2,711 festival-goers in 2008, 84% said they experienced dullness of hearing or ringing in the ears after listening to loud music."](http://www.nhs.uk/Livewell/Festivalhealth/Pages/Protectyourears.aspx). I had found a real problem. Hearing loss occurs at all levels, and I want to help people enjoy music today..and tomorrow. Or that's how my pitch went. 

### Challenges
I made this a lot harder than I should have. Why didn't I just use the simple `AVRecorder` and their builtin decibel metering? That's boring. That's simple. That's inaccurate. More importantly, that wasn't fun. The real answer was that I wanted to learn how to manipulate raw buffer data, and learn I did. Sortof.

I made the foolish mistake of working in Swift. The problem was I was using the [Momu Toolkit](http://momu.stanford.edu/toolkit/) to interface with the low-level audio capture and storing the results into a buffer. Momu Toolkit was a C++ library that used C, and was built for a time before Swift. Appending a `.mm` to an Objective-C `.m` class will allow it to use C++ methods and functions. Thats when the real problem came in. I had to manage between THREE languages at once. I used a bridging header to call Objective-C which had built-in directives to C. 




