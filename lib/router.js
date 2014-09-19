var getCurrentPage=function(path){
	var res = {};
	var regex = /\/([^\/]*)+/g;
	res.pathParts = [""];
	var n = true;
	while(n=regex.exec(path)){
		if(n[1]!=""){
			res.pathParts.push(n[1]);
		}
	}
	var items = [];
	var par=null;
	fullUrl = "",
	res.all=true;
  for(var i=0;i<res.pathParts.length;i++){
		item=SingleItems.documents.find({"relations._id":par,"relations.url":res.pathParts[i],"relations.type":"parent"});
		if(item.count()>0){
			item = item.fetch()[0];
			items.push(item);
			for(var k=0; k<item.relations.length; k++){
				if(item.relations[k]._id===par){
					item.url = item.relations[k].url;
				}
			}
			item.helperData = {};
			fullUrl+="/"+item.helperData.url;
			item.helperData.fullUrl = fullUrl.replace("//","/");
			par = item._id;
		}else if(SingleItems.documents.find().count()>0){
			res.all=false;
		}
	}
	res.breadcrumbs = items;
	res.item = items[items.length-1];
	return res;
}
if(Meteor.isServer){
	Meteor.publish("single-pages",function(path){
		var current = getCurrentPage("/"+path);
		var ids = Single.Utils.getDescendantProp(current.breadcrumbs,"_id");
		ids = _.map(ids,function(val){
			var res = {};
			res._id=val
			return res;
		});
		if(ids.length>0){
			return SingleItems.documents.find({$or:ids});
		}else{
			return null;
		}
	});
}

Router.map(function(){
		this.route('single-page',{
			path: "/*",
			waitOn:function(){
				return Meteor.subscribe("single-pages",this.params);
			},
			onAfterAction:function(){
				var CurrentPage = getCurrentPage(this.path);
				if(!CurrentPage.all){
					if(Template["404"]){
						this.render("404");
					}else{
						this.render("single-404");
					}
				}
				Session.set("CurrentPage",CurrentPage);
			},
			data:function(){
				return {
					CurrentPage:Session.get("CurrentPage")
				}
			}
		})
});