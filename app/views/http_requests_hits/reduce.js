/**
	simply sum(values)

	@name views.http_requests_hits
*/
function(keys, values, rereduce) {
	return sum(values);
}