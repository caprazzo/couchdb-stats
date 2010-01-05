/**
	Emits a 6-level extended time key and a value object with the collective
	response time and the number of completed requests. [this is not convincing and needs review]
	(object attributes starting with _ will be ignored when rendering)
	
	<pre>emit([2010, 1, 1, 20, 30, 0, 4], {_time:1200, _requests:500})</pre>
	
	@name views.request_time.map
*/
function(doc) {
	// !code lib/stats.js
	
	if (!doc.timestamp) return;
	
	emit(
		extended_time_key_from_json_date(doc.timestamp.replace(/-/g,'/')),
		{
			_time: (doc.couchdb.request_time.sum) ? doc.couchdb.request_time.sum : 0,
			_requests: (doc.httpd.requests.sum) ? doc.httpd.requests.sum : 0
		}
	);
}