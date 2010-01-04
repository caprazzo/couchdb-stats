/**
	Emits a 6-level extended time key and doc.httpd.requests.sum
	<pre>emit([2010, 1, 1, 20, 30, 0, 4], 33)</pre>
	
	@name views.http_requests_hits.map
 */
function(doc) {
	// !code lib/stats.js
	
	if (!doc.timestamp) return;
	
	emit(
		extended_time_key_from_json_date(doc.timestamp.replace(/-/g,'/')),
		Math.floor((doc.httpd.requests.sum) ? doc.httpd.requests.sum : 0)
	);
}