function(head, req) {
	// !json templates
	// !code lib/mustache.js
	// 
 	start({"headers":{"Content-Type" : "text/html"}});

	send(Mustache.to_html(templates.chronoscope_table.head, {}));
	
	while(row = getRow()) {
		var key = [
			row.key[0],
			row.key[1],
			row.key[2],
			row.key[3],
			row.key[5]
		].join('-');
		send(Mustache.to_html(templates.chronoscope_table.item, {
			key: key,
			value: row.value
		}));
	}
	send(Mustache.to_html(templates.chronoscope_table.foot, {}));
}