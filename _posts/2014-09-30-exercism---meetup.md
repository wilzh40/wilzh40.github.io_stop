---
layout: post
title: "Exercism   Meetup"
description: ""
category: "Programming"
tags: []
---
{% include JB/setup %}

## The devil is in the details.

I recently started partaking in this coding academy-style program. But it's different from codecademy, udemy, treehouse, in that there are no video lectures, no online command shells, no friend to hold your hand. This is [Exercism](http://www.exercism.io), a relatively new coding website that downloads exercises to your computer, and makes you build programs that pass a rigorous set of tests. 

One recent example I struggled with (after breezing through 5 easy exercises, ranging from calculating a gigasecond to lepapyears to making a simple feisty teenager response) was Meetup.

What was the problem?

    # Meetup

    Calculate the date of meetups.

    Typically meetups happen on the same day of the week.

    Examples are

    - the first Monday
    - the third Tuesday
    - the Wednesteenth
    - the last Thursday

    There are exactly 7 days that end in '-teenth'. Therefore, one is
    guaranteed that each day of the week will have a '-teenth' in every
    month.

So I had to use metaprogrmaming to calculate when the date was given a lexical weekday and a modifier.
What a headache.
After much experimentation I came up with this gem: a combined effort over one hour and trial and error:

    from datetime import date
    import datetime
    days = {
    "Monday" : 1,
    "Tuesday" : 2,
    "Wednesday" : 3,
    "Thursday" : 4,
    "Friday" : 5,
    "Saturday" : 6,
    "Sunday" : 7
    }
    mods = {
    #Placeholder Teenth
    'teenth': 0,
    'last' : 5,
    '1st' : 1,
    '2nd' : 2,
    '3rd' : 3,
    '4th' : 4,
    }

    def meetup_day(year,month,day,mod):
        firstDay = date(year,month,1).weekday()
        modifier = 0

        # If the month starts after the day
        if firstDay < days[day]:
            modifier = (mods[mod]-1)*7
        if firstDay >= days[day]:
            modifier = (mods[mod])*7


        print(firstDay)
        indexShift = days[day] - firstDay


        if mod == "teenth":
        # Dirty hackathon code right here
            if 14 + indexShift > 12 and 14 + indexShift < 20:
                modifier = 14

        modded_day = indexShift + modifier

        #return(modded_day)
        return datetime.date(year,month,modded_day)

Easy. I used a built in function to calculate what weekday it was the first day of the month, found the difference in days between that and that given numerical date of the input, translated the lexical modifier to a multiple of 7 (depending on whether the weekday was before or after the first day of the month).
That took a while. 

