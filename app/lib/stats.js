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

function get_dtformat(group_level, style) {
	var formats = {
		'chronoscope': 'yyyy-M-d-H-m',
		'gnuplot': '%Y-%m-%d-%H-%M'
	}
	var fmt = formats[style || 'chronoscope'];
	if (group_level == 6) {
		return {
			f_key: function(key) {
				return [ key[0], key[1], key[2], key[3], key[5] ].join('-')
			},
			dtformat: fmt			
		}
	}
	else if (group_level == 5) {
		return {
			f_key: function(key) {
				return [ key[0], key[1], key[2], key[3], key[4]*5 ].join('-')
			},
			dtformat: fmt
		}
	}
	else if (group_level < 5) {
		return {
			f_key: function(key) {
				return key.join('-');
			},
			dtformat: fmt.split('-').slice(0,parseInt(req.query.group_level)).join('-')
		}
	}
}

function app_root(current_path) {
	for(var idx=0; idx<current_path.length; idx++) {
		if (current_path[idx] == '_design') {
			return '/' + current_path.slice(0,idx+2).join('/') + '/';
		}
	}
}

function build_group_view(req) {
		var level = parseInt(req.query.group_level, 10);
	 	var path = '/' + req.path.join('/');
	 	var urls = [];
	 	var level_names = ['year', 'month', 'day', 'hour', '5 minutes', 'minute'];
		for (var lvl=1; lvl<=6; lvl++) {
			if (lvl == level) continue;
			urls.push({
				url: path + '?group_level=' + lvl,
				caption: level_names[lvl-1],
				title: 'switch to data by' + level_names[lvl-1]				
			});
		}
		var current_view = level_names[level-1];
		
		return {current: current_view, links: urls};
	}