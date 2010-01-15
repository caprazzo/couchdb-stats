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
	var dt = get_dtformat(parseInt(req.query.group_level));
	while(row = getRow()) {		
		dt.f_key(row.key)
		send(row.key.join('-'));
		send(' ' + row.value + '\n');
	}
}