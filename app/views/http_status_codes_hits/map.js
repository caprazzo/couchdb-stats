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