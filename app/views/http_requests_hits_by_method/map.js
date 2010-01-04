/**
	Emits a 6-level extended time key and an object that counts
	httpd hits for each method
	<pre>emit([2010, 1, 1, 20, 30, 0, 4], { POST: 1, GET: 2, ...})</pre>
	
	@name views.http_requests_hits_by_method.map
*/
function(doc) {
	// !code lib/stats.js
	if (!doc.timestamp) return;
	var key = extended_time_key_from_json_date(doc.timestamp.replace(/-/g,'/'));
	var ret = {};
	for(var METHOD in doc.httpd_request_methods) {
		var sum = doc.httpd_request_methods[METHOD].sum;		
		ret[METHOD] = ((sum) ? sum : 0);		
	}
	emit(key, ret);
}