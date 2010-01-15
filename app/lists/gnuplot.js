/**
	<p>Given a view where the key is a 6-level date and value an integer,
	renders an list of date<space>hits row.</p>

	<p>This is useful for integration with external tools, such as gnuplot</p>
	
	MANDATORY group_level 1-6 to control grouping<br/>
	
	@name lists.text
*/
function(head, req) {	
	// !code lib/stats.js
 	start({"headers":{"Content-Type" : "text/plain"}});
	var dt = get_dtformat(parseInt(req.query.group_level), 'gnuplot');
	var title = req.path[req.path.length-1] + ' group by ' + req.query.group_level;
	if (req.query.png) {
		var h = parseInt(req.query.h) || 300;
		var w = parseInt(req.query.w) || Math.floor(h*1.618);
		send('set terminal png size '+w+', '+h+'\n');
	}
	send('set xdata time\n')
	send('set timefmt "'+ dt.dtformat +'"\n');
	send('plot "-" using 1:2 t "'+title+'" with lines\n')
	while(row = getRow()) {
		send(dt.f_key(row.key));
		send(' ' + row.value + '\n');
	}
	send('e\n');
}