/**
	Execute of a view with the extended time key as key and integers as values,
	builds an html table conformant to the timepedia chronoscope microformat
	(http://timepedia.org/chronoscope/docs/microformats/).
	
	Invoke with ?version=0.10.x if stats generated from a 0.10.x couchdb server
*/
function(head, req) {
	// !json templates
	// !code lib/mustache.js
	
 	start({"headers":{"Content-Type" : "text/html"}});
	
	
	// group_level 6
	// key is rebuilt skipping element 4 as it's a 5-minutes span and
	// is not understood by chronoscope dtformat (better done in the template?)
	
	
	var f_key = function(key) {
		return [ key[0], key[1], key[2], key[3], key[5] ].join('-')
	}
	var dtformat = 'yyyy-M-d-H-m'
	if (req.query.group_level == 5) {
		f_key = function(key) {
			return [ key[0], key[1], key[2], key[3], key[4]*5 ].join('-')
		}
	}
	else if (parseInt(req.query.group_level) < 5) {
		f_key = function(key) {
			return key.join('-');
		}
		dtformat = 'yyyy-M-d-H-m'.split('-').slice(0,parseInt(req.query.group_level)).join('-');
	}
	if (!req.query.table_only)
		send(Mustache.to_html(templates.chronoscope.html_head));
		
	send(Mustache.to_html(templates.chronoscope.table_head, {dtformat:dtformat}));
	while(row = getRow()) {		
		send(Mustache.to_html(templates.chronoscope.table_item, {
			key: f_key(row.key),
			value: row.value
		}));
		send('\n');
	}
	send(Mustache.to_html(templates.chronoscope.table_foot));
	
	if (!req.query.table_only)
		send(Mustache.to_html(templates.chronoscope.html_foot));
}