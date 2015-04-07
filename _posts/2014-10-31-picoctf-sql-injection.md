---
layout: post
title: PicoCTF SQL Injection
description: ""
category: "Problem Set"
tags: []
published: true
---

{% include JB/setup %}
### SQL Injection Problem 2

[The problem.](http://web2014.picoctf.com/injection2/)

I first enabled debugging (rightclick->inspect element)to display by username, password, and query.
I thought I had to create a fake row, but I kept on returning a syntax error.
I tried many variants

	a'; INSERT INTO users (username,password) VALUE ('a','b')
    admin'; INSERT INTO USERNAMES (username,password) VALUE ("a,b")

Until I failed miserably after two hours of bashing my keyboard and checking syntax on stackoverflow. I finally messaged the moderator the of PicoCtf and he stated the obvious; `SQL_QUERY` only executed one line of code. And I was making multiple lines.

I then realized I can use `UNION SELECT` to create a new query, and I did so accordingly...but the columns didn't match! I kept on incrementing

	'ORDER BY 1
    'ORDER BY 2
    ...
    'ORDER BY N
until it broke...when n=6. It had five columns.

	1339'UNION SELECT 1338,1338,1338,1338,1338#
    
and the password was 1338 to fulfill the if statement row["user_level"]>1337



    