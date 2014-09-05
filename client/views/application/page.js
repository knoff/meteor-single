var pathparts = function(){
		var regex = /\/([^\/]*)+/g;
		var res = [];
		var path = Router.current().path;
		var n=true;
		while(n=regex.exec(path)){
			//n=regex.exec(path);
			res.push(n[1]);
		}
		return res
	};
var breadcrumbs = function(){
		var parts = pathparts();
		var items = [];
		var par=[null];
		fullUrl = "";
		for(var i=0;i<parts.length;i++){
			item=Items.find({url:parts[i],parents:{$in:par}});
			if(item.count()>0){
				item = item.fetch()[0];
				items.push(item);
				fullUrl+="/"+item.url;
				item.fullUrl = fullUrl;
				item.helpers = {};
				par = [item._id];
			}
		}
		//Session.set("CurrentPage",items[items.length-1]);
		return items;
	};
var childs = function(){
	var current = breadcrumbs();
	current = current[current.length-1];
	var childs = [];
	if(current){
		childs = Items.find({parents:{$in:[current._id]}}).fetch();
		for(var i=0; i<childs.length; i++){
			childs[i].fullUrl = current.fullUrl+"/"+childs[i].url;
		}
	}
	return childs;
};
Template.page.helpers({
	pathparts: pathparts,
	breadcrumbs: breadcrumbs,
	fullbreads: (pathparts.length==breadcrumbs.length),
	childs:childs,
	currentPage:Session.get("CurrentPage")
})