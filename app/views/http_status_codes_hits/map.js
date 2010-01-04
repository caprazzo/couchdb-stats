/**
	Emits a 6-level extended time key and an object that counts
	httpd responses for each status code
	<pre>emit([2010, 1, 1, 20, 30, 0, 4], { 200: 1, 500: 2, ...})</pre>
	
	@name views.http_status_codes_hits.map
*/
function(doc) {
	// !code lib/stats.js
	if (!doc.timestamp) return;
	var key = extended_time_key_from_json_date(doc.timestamp.replace(/-/g,'/'));
	var ret = {};
	for(var CODE in doc.httpd_status_codes) {
		var sum = doc.httpd_status_codes[CODE].sum;		
		ret[CODE] = ((sum) ? sum : 0);		
	}
	emit(key, ret);
}