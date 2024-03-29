---
layout: post
title: Creating a Decibel Meter using iOS
description: ""
category: null
tags: []
published: true
---



{% include JB/setup %}

### At the Outside Lands hackathon I made an app called Decimate

![]({{site.baseurl}}img/outsidelands.png)

### Results
Here's proof that I made in on the [Outside Hacks Instagram.](https://instagram.com/p/5DjKroj4fy/?taken-by=outsidelandshackathon)
Here's the [Github Repo.](https://github.com/wilzh40/Deci-mate)

### Background
On the way to the hackathon, I struggled to come up with a useful idea for an application that would prove useful to the general music-loving/festival-going population. Just as I was running out of brain juice, and just when BART drew closer to Montgomery station, a small a-ha moment hit me. Recently, I heard that [Rob Swire lost his hearing](http://www.edmtunes.com/2015/07/rob-swire-loses-hearing-deaf/), and I was positively heartbroken (even though, as I found out later, it was because of vaping). This caught my attention, as I personally experienced hearing pain after prolonged exposure to harmful decibel levels, a problem that would be exacerbated at festivals. I did some additional research and found that ["in a survey of 2,711 festival-goers in 2008, 84% said they experienced dullness of hearing or ringing in the ears after listening to loud music."](http://www.nhs.uk/Livewell/Festivalhealth/Pages/Protectyourears.aspx). 
Since decibels are on a logarithmic scale, at 120dB it can over 64x the times the intensity of normal conversation at 60dB.
I had found a real problem. Hearing loss occurs at all levels, and I want to help people enjoy music today..and tomorrow. Or that's how my pitch went. 

I used OSHA standard levels to find the PEL (Preferable Exposure Limit) at each decibel level, calculated using this algorithm `t = 2((94−SPL)/3)`. I then calculated the weighted averages contiually taken at each decibel level, and fitted it into a percentage scale, decrimenting each 0.10 seconds until hearing damage will occur. 

![]({{site.baseurl}}img/noisecurve.gif)


### Challenges
I made this a lot harder than I should have. Why didn't I just use the simple `AVRecorder` and their builtin decibel metering? That's boring. That's simple. That's inaccurate. More importantly, that wasn't fun. The real answer was that I wanted to learn how to manipulate raw buffer data, and learn I did. Sortof.

How to convert raw buffer data to meaningful values? It's actually as simple as a Fast Fourier Transform, which converts that data into an array of amplitudes given each frequency window. However, the builtin Apple APIs were unintelligble, so I resorted to using [Aubio](http://aubio.org/doc/latest/src_2spectral_2test-fft_8c-example.html), a framework for real-time audio processing. So that's what I did, I converted it, took the average of all the data, and sent it to the array. After some calibration with an actual decibel reader it was good to go. 

		uint_t win_s = frameSize; // window size
        fvec_t * in = new_fvec (win_s); // input buffer
        cvec_t * fftgrain = new_cvec (win_s); // fft norm and phase
        fvec_t * out = new_fvec (win_s); // output buffer
        // create fft object
        aubio_fft_t * fft = new_aubio_fft(win_s);
        // fill input with some data
        
        in -> data = buffer;
        fvec_print(in);
        // execute stft
        aubio_fft_do (fft,in,fftgrain);
        cvec_print(fftgrain);
        Float32 sum = 0.0;
        for (int i = 0; i < frameSize; i++) {
            Float32 amplitude = fftgrain -> norm[i];
            sum += amplitude/frameSize;
        }


I made the foolish mistake of working in Swift. The problem was I was using the [Momu Toolkit](http://momu.stanford.edu/toolkit/) to interface with the low-level audio capture and storing the results into a buffer. Momu Toolkit was a C++ library that used C, and was built for a time before Swift. Appending a `.mm` to an Objective-C `.m` class will allow it to use C++ methods and functions. Thats when the real problem came in. I had to manage between THREE languages at once. I used a bridging header to call Objective-C which had built-in directives to C. 

How Momu works is that it provides a C-level audio callback, like most audio engines out there. Included in that parameter is the raw buffer data, a pointer array of `Float32`s. The way I set it up was that my `AudioMeter.mm` class that contained the callback would have its delegate set to my Swift ViewController class. Now the problem was to communicate and use that protocol/delegate method to update the decibel value. Normally, you can call a method in the C scope by using the same Objective-C syntax (and vice versa) by doing `[instance method]`, but there was an error! Apparently the `self` directive (is it one?) used by Objective-C is some compiler magic trickery and does not exist for C, and I had to use it especially because I was restrained to the scope of a callback. But fear not! My intensive googling skills gave me an answer, and the dirtiest piece of code I ever wrote. 

On a global scope, I declared

    // Reference to self
    id thisClass;

And in my method I set it equal to self
	
    -(void) initAudioMeter {
        thisClass = self;       
        bool result = false;
        result = MoAudio::init( SAMPLE_RATE, FRAMESIZE, NUMCHANNELS, false);
        if (!result) { NSLog(@" MoAudio init ERROR"); }
        result = MoAudio::start( AudioCallback, NULL );
        if (!result) { NSLog(@" MoAudio start ERROR"); }
    }

So then I can access it on the main thread by doing

	      dispatch_async(dispatch_get_main_queue(), ^{ 
            [thisClass pushToDelegate: sum];
        });
        
And since I had no way of doing `thisClass.delegate` I had to make another method that essentially did the same thing.
        
    -(void) pushToDelegate: (Float32)value {
        [self.delegate newDataValue:value];
    }


In the end I had a pretty straightforward app, and it was a great learning experience. Hopefully I'll apply what I learned into hacking an LED light to glow to the beat of music (my next project). 
