/**
	Emits one integer for each document: sum of all http requests for each document.
	
	@name views.all_http_requests.map
 */
function(doc) {
	// !code lib/stats.js
	
	if (!doc.timestamp) return;
	
	emit(
		extended_time_key_from_json_date(doc.timestamp.replace(/-/g,'/')),
		Math.floor((doc.httpd.requests.sum) ? doc.httpd.requests.sum : 0)
	);
}