/**
	Takes multiple value objects <pre>{ POST: 1, GET: 2, ...}</pre>
	amd sums the properties together.

	@name views.http_requests_hits_by_method.reduce
*/
function(keys, values, rereduce) {
	var ret = {};
	values.forEach(function(value) {
		for (var METHOD in value) {
			if (!ret[METHOD]) ret[METHOD] = 0;
			ret[METHOD] += value[METHOD];
		}
	});
	return ret;
}