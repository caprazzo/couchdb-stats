function(doc) {

	if (!doc.timestamp) return;
	var count = 0;
	var date = new Date(doc.timestamp.replace(/-/g,'/'));

	for (var m in doc.httpd_request_methods) {
		var method = doc.httpd_request_methods[m];
		if (method.sum) count += method.sum;
	}
	
	emit([
		date.getUTCFullYear(),
		date.getUTCMonth() + 1,
		date.getUTCDate(),
		date.getUTCHours(),
		// 5 minutes step
		Math.floor(date.getUTCMinutes() / 5),
		date.getUTCMinutes()
	], count);
}