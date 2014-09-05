Router.configure({
	layoutTemplate: 'main-layout'
});
Router.map(function(){
	this.route('home', {path: "/"});
	this.route('new', {path: "/*/-new"});
	this.route('edit', {path: "/*/-edit"});
	this.route('page', {
		path: "/*",
		waitOn:function(){
			return Meteor.subscribe("pages",this.params);
		},
		onRun:function(){
			var CurrentPage = {};
			var regex = /\/([^\/]*)+/g;
			CurrentPage.pathParts = [];
			CurrentPage.back = Session.get("CurrentPage")||{};
			CurrentPage.back.back=null;
			var n=true;
			while(n=regex.exec(this.path)){
				CurrentPage.pathParts.push(n[1]);
			}
			var items = [];
			var par=[null];
			fullUrl = "";
			for(var i=0;i<CurrentPage.pathParts.length;i++){
				console.log("!");
				item=Items.find({url:CurrentPage.pathParts[i],parents:{$in:par}});
				if(item.count()>0){
					item = item.fetch()[0];
					items.push(item);
					fullUrl+="/"+item.url;
					item.fullUrl = fullUrl;
					item.helpers = {};
					par = [item._id];
				}
			}
			CurrentPage.breadcrumbs = items;
			Session.set("CurrentPage",CurrentPage);
		}
	});
})