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