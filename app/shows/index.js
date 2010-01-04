/**
	Bogus index show<br/><br/>
	
	used only to reuse templates, must be called with an existing id
	(use current design doc id to be sure)
	
	@name shows.index
*/
function(doc, req) {  
	// !json templates
	// !code lib/mustache.js
	// !code lib/stats.js

	return	Mustache.to_html(templates.app_head, {root:app_root(req.path)})
			+ Mustache.to_html(templates.index, {root:app_root(req.path)})
			+ Mustache.to_html(templates.app_foot);
}