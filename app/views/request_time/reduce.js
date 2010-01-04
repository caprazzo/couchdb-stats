/**
	Takes multple value objects
	<pre>[{time:1200, requests:500}, {time:55, requests:2000}]</pre>
	
	sums times and requests and calcs the average
	
	<pre>{time:1255, requests:2500, avg: 0.502}</pre>

	@name views.request_time.reduce
	
*/
function(keys, values, rereduce) {
	var rt = {time:0, requests: 0};
	values.forEach(function(value) {
		rt.time += value.time;
		rt.requests += value.requests;
	});
	rt.avg = rt.time / rt.requests;
	return rt;
}