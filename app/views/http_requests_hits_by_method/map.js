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