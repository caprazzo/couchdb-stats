/**
	Given a view where the key is a 6-level date and value is an object,
	renders an html table conformant to the timepedia chronoscope microformat
	(http://timepedia.org/chronoscope/docs/microformats/).
	<br/><br/>
	MANDATORY group_level 1-6 to control grouping<br/>
	OPTIONAL table_only [true|false] to disable/enable chronoscope (default enabled)
	
	@name lists.table_multi
*/
function(head, req) {
	// !code lib/stats.js
	
 	start({"headers":{"Content-Type" : "text/html"}});
	
	var dt = get_dtformat(parseInt(req.query.group_level));
	
	var keys = null;	
	while(row = getRow()) {		
		if (keys == null) {
			keys = [];
			for (var key in row.value) {
				if (key[0] != '_')
					keys.push(key);
			}
			keys.sort();
		}
		var values = [];
		keys.forEach(function(k) {
			values.push(row.value[k]);
		});
		send(dt.f_key(row.key) + ' ' + values.join(' ') + '\n');
	}
}