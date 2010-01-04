stats visualization for couchdb
===============================

Setup stats tracker
-------------------

python stats_copy.py <server_to_track> <target_server> <target_database> <stats range>
To store localhost couchdb stats each minute on localhost/stats use
$ python stats_copy.py localhost localhost stats 60 &disown

I suggest to use range 900 (15 minutes) in production, more than that is almost certainly overkill. 
But you get to choose your poison.

To stop, kill the process.

Install couchapp app/ in the same database where the stats are being collected.

Views
=====

    * All http requests (grouped by hours)
    http://caprazzi.net:5984/stats/_design/app/_list/table/http_requests_hits?group_level=4
    
    * Http requests by method (grouped by hours)
    http://caprazzi.net:5984/stats/_design/app/_list/table_multi/http_requests_hits_by_method?group_level=4
    
    * Status codes hits (grouped by hours)
    http://caprazzi.net:5984/stats/_design/app/_list/table_multi/http_status_codes_hits?group_level=4
    
    * Requests with cumulative and avg time (grouped by hours)
    http://caprazzi.net:5984/stats/_design/app/_list/table_multi/request_time?group_level=4
