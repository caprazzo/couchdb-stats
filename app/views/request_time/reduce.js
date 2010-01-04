function(keys, values, rereduce) {
	var rt = {time:0, requests: 0};
	values.forEach(function(value) {
		rt.time += value.time;
		rt.requests += value.requests;
	});
	rt.avg = rt.time / rt.requests;
	return rt;
}