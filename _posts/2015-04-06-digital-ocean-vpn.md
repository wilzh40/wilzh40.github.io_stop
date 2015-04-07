---
layout: post
title: Digital Ocean VPN
description: ""
category: Programming
tags: []
published: true
---

{% include JB/setup %}

### I wanted to create a VPN to circumvent school filters

I wanted to browse facebook and reddit, because the teachers were finally smart enough to change their logins, I can't access those sites anymore. And I don't want to crack any passwords because that's [multiple felonies](http://www.cga.ct.gov/2012/rpt/2012-R-0254.htm). Thankfully I now have the funds and the technical know-how to setup a VPN, because before I had no idea what the terms ssh, and public keys meant. A couple of days ago, I just found a 50 dollar credit coupon from Digital Ocean lying around from the TechCrunch Disrupt Hackathon I went to a while ago.

### My first attempt /usr/local/lib/ruby/gems/2.0 


1. I tried using `ssh` into the server at school, but it didn't work because I kept on getting a connection reset by peer
2. I ran using `-vvv` as an options and I thought it was an RSA1 error, so I regnerated my keys
3. I gave up, thinking that problem is probably in the `hosts.deny` file in the school server, so in that case I gave up and went back home.
4. I installed openVPN in in the droplet after successfulling sshing into the remote server
5. Configured the admin panel and had it permanently up. 
6. Installed [TunnelBlick](https://code.google.com/p/tunnelblick/), an opensource connection interface for the mac for OpenVPN.

### My second attempt

1. I started anew last week by following this [guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-an-openvpn-server-on-ubuntu-14-04) to the word, and copied the `.opvn` profile to my local computer
2. It worked like a charm at home after fiddling with the settings (including sending ALL network traffic through the VPN)
3. However, at school, it failed miserably. It couldn't even reach the server.
4. After much googling the culprit was probably because they blocked all the VPN ports locally, specifically the OpenVPN port 1143, UDP. A quick `netcat` confirmed my suspicions.
5. I changed the server config and client config to access the server through the HTTP/SSL port 443, and a connection was made...however
6. Past the authorizing stage it returned another error 

    	OpenVPN error: write UDPv4: Can't assign requested address (code=49)

7. It turns out that changing routers midconnection would jumble the wireless recievers, so a manual reset would work

    	sudo ifconfig en0 down
    	sudo route flush
    	sudo ifconfig en0 up

8. And I had access to all my favorite sites again. 
