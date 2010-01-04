/**
	Generates a UTC dates array suitable for emission as 6-level key in a map function.
	The array is in the form [year, month, day, hour, 5-minutes-period, minute]
	
	5-minute-period is useful to group by 5-minutes:
	minute 0,1,2,3,4 --> period 0
	minute 5,6,7,8,9 --> period 1
	...
	
	group_level=6 and group_level=5 will only be different if
	stats are collected each minute
		
	@name stats.extended_time_key_from_json_date
 */
function extended_time_key_from_json_date(str_timestamp) {	
	var date = new Date(str_timestamp);
	return [
		date.getUTCFullYear(),
		date.getUTCMonth() + 1,
		date.getUTCDate(),
		date.getUTCHours(),
		// 5 minutes step
		Math.floor(date.getUTCMinutes() / 5),
		date.getUTCMinutes()
	];
}