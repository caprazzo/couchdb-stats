/**
	Emits one integer for each document: sum of all http requests for each document.
	
	@name views.all_http_requests.map
 */
function(doc) {
	// !code lib/stats.js
	
	if (!doc.timestamp) return;
	
	var count = 0;
	var last_current = 0;
	for (var m in doc.httpd_request_methods) {
		var method = doc.httpd_request_methods[m];

		// _stats api as of 0.11 trunk, sum is the count in the period
		if (method.sum) count += method.sum;
		
	}
	
	emit(extended_time_key_from_json_date(doc.timestamp.replace(/-/g,'/')), count);
}