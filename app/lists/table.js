/**
	Execute of a view with the extended time key as key and integers as values,
	builds an html table conformant to the timepedia chronoscope microformat
	(http://timepedia.org/chronoscope/docs/microformats/).
	
	MANDATORY group_level 1-6 to control grouping
	OPTIONAL table_only [true|false] to disable/enable chronoscope (default enabled)
*/
function(head, req) {
	// !json templates
	// !code lib/mustache.js
	// !code lib/stats.js
	
 	start({"headers":{"Content-Type" : "text/html"}});
	
	var dt = get_dtformat(parseInt(req.query.group_level));
	var table_only = (req.query.table_only && req.query.table_only=='true');
	
	if (!table_only)
		send(Mustache.to_html(templates.chronoscope.html_head));
	
	send(Mustache.to_html(templates.app_head, {root:app_root(req.path)}));
	send(Mustache.to_html(templates.chronoscope.table_head, {dtformat:dt.dtformat}));
	while(row = getRow()) {		
		send(Mustache.to_html(templates.chronoscope.table_item, {
			key: dt.f_key(row.key),
			value: row.value
		}));
		send('\n');
	}
	send(Mustache.to_html(templates.chronoscope.table_foot));
	send(Mustache.to_html(templates.app_foot));
	if (!table_only)
		send(Mustache.to_html(templates.chronoscope.html_foot));
}