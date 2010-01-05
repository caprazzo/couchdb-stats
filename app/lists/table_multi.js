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
	// !json templates
	// !code lib/mustache.js
	// !code lib/stats.js
	
 	start({"headers":{"Content-Type" : "text/html"}});
	
	// group_level 6
	// key is rebuilt skipping element 4 as it's a 5-minutes span and
	// is not understood by chronoscope dtformat (better done in the template?)
	
	var dt = get_dtformat(parseInt(req.query.group_level));
	var table_only = (req.query.table_only && req.query.table_only=='true');
	
	if (!table_only) {
		send(Mustache.to_html(templates.app_head, {root:app_root(req.path)}));
	}	
	send(Mustache.to_html(templates.groups_links, build_group_view(req)));
	
	var keys = null;	
	while(row = getRow()) {		
		if (keys == null) {
			keys = [];
			for (var key in row.value) {
				keys.push(key);
			}
			keys.sort();
			send(Mustache.to_html(templates.chronoscope.table_head_multi, {keys: keys, dtformat: dt.dtformat}));
		}
		var values = [];
		keys.forEach(function(k) {
			values.push(row.value[k]);
		});
		send(Mustache.to_html(templates.chronoscope.table_item_multi, {
			key: dt.f_key(row.key),
			value: values
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