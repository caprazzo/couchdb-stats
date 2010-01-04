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