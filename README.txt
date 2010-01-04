stats visualization for couchdb
===============================

Setup stats tracker
-------------------

python stats_copy.py <server_to_track> <target_server> <target_database> <stats range>
To store localhost couchdb stats each minute on localhost/stats use
$ python stats_copy.py localhost localhost stats 60 &disown

To stop, kill the process.

Install couchapp app/ in the same database where the stats are being collected.

Views
=====

_list/table/all_requests_hits
-----------------------------

Displays a chronoscope view of all http requests 

MANDATORY group_level 1-6
OPTIONAL table_only [true|false] to enable/disable chronoscope

group_level
	1 BY YEAR
	2 BY MONTH
	3 BY DAY
	4 BY HOUR
	5 BY 5-MINUTES
	6 BY MINUTE
	
Standard couchdb range queries can be used to limit the results

Examples
Chronoscope view by the hour:
http://caprazzi.net:5984/stats/_design/app/_list/table/all_requests_hits?group_level=4

Table view by the day:
http://caprazzi.net:5984/stats/_design/app/_list/table/all_requests_hits?group_level=3&table_only=true

	