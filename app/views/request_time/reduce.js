/**
	Takes multple value objects
	<pre>[{_time:1200, _requests:500}, {_time:55, _requests:2000}]</pre>
	
	sums times and requests and calcs the average
	
	<pre>{_time:1255, _requests:2500, avg_response_time: 0.502}</pre>

	@name views.request_time.reduce
	
*/
function(keys, values, rereduce) {
	var rt = {_time:0, _requests: 0};
	values.forEach(function(value) {
		rt._time += value._time;
		rt._requests += value._requests;
	});
	rt.avg_response_time = rt._time / rt._requests;
	return rt;
}