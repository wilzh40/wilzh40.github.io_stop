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

Luckily, for me, I now have the funds and the technical know-how to accomplish such a task, because before I had no idea what the terms ssh, and public keys meant. But now, I just found a 50 dollar credit coupon from digital ocean, and I can now have my own VPN!

### First I created a public key 

1. I tried using `ssh` into the server, but it didn't work because I kept on getting a connection reset by peer
2. I ran using `-vvv` as an options and I thought it was an RSA1 error, so I regnerated my keys
3. I gave up, thinking that problem is probably in the `hosts.deny` file in the school server, so in that case I gave up and went back home.
4. I installed openVPN in in the droplet after successfulling sshing into the remote server
5. Configured the admin panel and had it permanently up. 
6. Was still confused on how to use the VPN, then realized I could use [TunnelBlick](https://code.google.com/p/tunnelblick/), an opensource connection interface for the mac for OpenVPN.
7. It didn't work..we'll try next time. 