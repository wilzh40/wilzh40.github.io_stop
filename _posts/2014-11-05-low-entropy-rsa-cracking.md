---
layout: post
title: "Low Entropy RSA Cracking"
description: ""
category: "Problem Set"
tags: []
---
{% include JB/setup %}

### The problem

There's a server that generates an RSA public key when you ping it by
	`nc vuln2014.picoctf.com 51818`, with exponent 65537. Low entropy states that the keys were only generated from a pool of 30 primes....try and decrypt the message from the intercepted .pcap file.


### Step 1 Getting a list of keys

A didn't know basic shell commands, but quick stackoverflow search returned the answer:
	
   repeat 1000 {nc vuln2014.picoctf.com 51818 | cat >> keys.txt 

This pinged the keygen server 1000 times, and stored all the keys by appending it to a file called keys.txt in my PicoCTF folder. I then sorted it just for the sake of clarity

	sort keys.txt | cat >> skeys.txt

### Step 2 Sanitizing the key list

I opened up python and wanted to access the file, easily accomplished with the `f.open` command. 

	with open('skeys.txt') as f:
		content = f.readlines()

But there was a problem: I was getting \n, newlines included into the keys. I solved it by

	    content = [x.strip('\n') for x in f.readlines()]

However there was plaintext: The message prepending the key...so I had to get rid of that. Also opening the intercepted .pcap file with Wireshark I was able to access the intercepted public key as well as message. 

		pubkeys = []
		deckeys = []
		primes = [] 
		privatekeys = []
		key1 = 0xc20a1d8b3903e1864d14a4d1f32ce57e4665fc5683960d2f7c0f30d5d247f5fa264fa66b49e801943ab68be3d9a4b393ae22963888bf145f07101616e62e0db2b04644524516c966d8923acf12af049a1d9d6fe3e786763613ee9b8f541291dcf8f0ac9dccc5d47565ef332d466bc80dc5763f1b1139f14d3c0bae072725815f
		msg1 = 0x49f573321bdb3ad0a78f0e0c7cd4f4aa2a6d5911c90540ddbbaf067c6aabaccde78c8ff70c5a4abe7d4efa19074a5249b2e6525a0168c0c49535bc993efb7e2c221f4f349a014477d4134f03413fd7241303e634499313034dbb4ac96606faed5de01e784f2706e85bf3e814f5f88027b8aeccf18c928821c9d2d830b5050a1e
		returntext = 'Welcome to the Daedalus Corp Spies RSA Key Generation Service. The public modulus you should use to send your updates is below. Remember to use exponent 65537.'
		with open('skeys.txt') as f:
		    content = [x.strip('\n') for x in f.readlines()]
		for x in content:
			if x != returntext:
				pubkeys.append(x)
		for x in pubkeys:
			deckeys.append(int(x,16))
		deckeys = list(OrderedDict.fromkeys(deckeys))
		print deckeys
		print len(deckeys)

### Step 3 Finding the primes

The code below was messy, but it had to be this way. Simple factoring wouldn't work, so I just went down the list and used gcd, a faster method.


	for x in deckeys:
		for y in deckeys:
			if x != y:
				gcd = ln.gcd(x,y)
				a = x/gcd
				b = y/gcd
				if gcd != 1 and gcd not in primes:
					print gcd
					primes.append(gcd)
					if a != 1 and a not in primes:
						print a
						primes.append(a)
					if b != 1 and b not in primes:
						print b
						primes.append(b)

	primes = list(OrderedDict.fromkeys(primes))
	print (len(primes))

Perfect. `len(primes)` returned 30. Each prime was about 300 bytes long...

### Step 4 Finding the private key exponents

This step took a lot of wikipedia and math. Knowing `p` and `q`, we were able to calculate the totient prime and find the modular multiplciative inverse `d`, which is the private key. 

	for x in primes:
		totient = 0
		d = 0
		for y in primes:
			if x != y:
				totient = (x-1)*(y-1)
				d = ln.invmod(65537,totient)
				privatekeys.append(d)

	print len(privatekeys)

### Step 5 Decryption

The compiler kept on returning an error on `.decode('hex')`: It wouldn't process because of the byte-length of the string was in fact odd! I had to use various combinations of `str()`, `strip()`, and `hex` to finally get it to work without returning an error.
		
	plaintexts = []
	for x in list(OrderedDict.fromkeys(privatekeys)):
		plainhex = str(hex((pow(msg1,x,key1)))).strip('0x').strip('L')
		
		if len(plainhex) % 2 == 0:
			plaintext = plainhex.decode('hex')
			filtered_string = filter(lambda x: x in string.printable,plaintext) 
			plaintexts.append(plaintext)
			print(filtered_string)

	print(plaintexts)
    
    
### Step 6 Flag getting

Searching the word "flag" from the input gave the asnwer.


