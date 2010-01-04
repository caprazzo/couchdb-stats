/**
	Takes multiple value objects <pre>{ 200: 1, 500: 2, ...}</pre>
	amd sums the properties together.

	@name views.http_status_codes_hits.reduce
*/
function(keys, values, rereduce) {
	var ret = {};
	values.forEach(function(value) {
		for (var CODE in value) {
			if (!ret[CODE]) ret[CODE] = 0;
			ret[CODE] += value[CODE];
		}
	});
	return ret;
}