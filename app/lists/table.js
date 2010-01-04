/**
	Given a view where the key is a 6-level date and value an integer,
	renders an html table conformant to the timepedia chronoscope microformat
	(http://timepedia.org/chronoscope/docs/microformats/).
	<br/><br/>
	MANDATORY group_level 1-6 to control grouping<br/>
	OPTIONAL table_only [true|false] to disable/enable chronoscope (default enabled)
	
	@name lists.table
*/
function(head, req) {
	// !json templates
	// !code lib/mustache.js
	// !code lib/stats.js
	
 	start({"headers":{"Content-Type" : "text/html"}});
	
	var dt = get_dtformat(parseInt(req.query.group_level));
	var table_only = (req.query.table_only && req.query.table_only=='true');
	var title = req.path[req.path.length-1] + ' group by ' + req.query.group_level;
	if (!table_only) {
		send(Mustache.to_html(templates.app_head, {root:app_root(req.path), title:title}));
	}

	send(Mustache.to_html(templates.chronoscope.table_head, {dtformat:dt.dtformat}));
	while(row = getRow()) {		
		send(Mustache.to_html(templates.chronoscope.table_item, {
			key: dt.f_key(row.key),
			value: row.value
		}));
		send('\n');
	}
	send(Mustache.to_html(templates.chronoscope.table_foot));

	if (!table_only) {
		send(Mustache.to_html(templates.script, {url:'http://api.timepedia.org/widget/'}));
		send(Mustache.to_html(templates.stylesheet, {href: 'http://api.timepedia.org/widget/Chronoscope.css'}));
		send(Mustache.to_html(templates.app_foot));
	}

}