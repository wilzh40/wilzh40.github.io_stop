---
layout: post
title: Keybase Alpha tester
description: ""
category: Programming
tags: []
published: true
---

{% include JB/setup %}

### Keybase is a new product for public key verfication

And thanks to my connections @ hs hackers, I got an alpha key. (It's not even beta yet...)

What's so special about it? It ties public keys and verifies them with social profiles so each entity has a confirmed and true key, so you can communicate with them using encryption/decryption and even bitcoin.

Link:
[Keybase](https://keybase.io/)

I had some trouble installing the CLI though...
1. My node.js was out of date, so I had to get a new version
	sudo npm cache clean -f
    sudo npm install -g n
    sudo n stable
2. I needed the GPG Suite for encryption/decryption methods
Easy, just install off the website: [link](https://gpgtools.org/)
3. Running `keybase-installer` under sudo did the trick.
4. It pulled the secret key from keybase after verifying all my social media accounts (github, reddit, twitter) 


