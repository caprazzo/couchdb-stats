function(doc) {
	// !code lib/stats.js
	
	if (!doc.timestamp) return;
	
	emit(
		extended_time_key_from_json_date(doc.timestamp.replace(/-/g,'/')),
		{
			time: (doc.couchdb.request_time.sum) ? doc.couchdb.request_time.sum : 0,
			requests: (doc.httpd.requests.sum) ? doc.httpd.requests.sum : 0
		}
	);
}