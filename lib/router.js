Router.map(function(){
		this.route('single-page',{
			path: "/*",
			waitOn:function(){
				return Meteor.subscribe("single-pages",this.params);
			},
			onAfterAction:function(){
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
				var par=null;
				fullUrl = "";
				for(var i=0;i<CurrentPage.pathParts.length;i++){
					item=SingleItems.find({"relations._id":par,"relations.url":CurrentPage.pathParts[i],"relations.type":"parent"});
					if(item.count()>0){
						item = item.fetch()[0];
						items.push(item);
						for(var k=0; k<item.relations.length; k++){
							if(item.relations[k]._id===par){
								item.url = item.relations[k].url;
							}
						}
						fullUrl+="/"+item.url;
						item.fullUrl = fullUrl;
						par = item._id;
					}else if(SingleItems.find().count()>0){
						console.log(this);
						if(Template["404"]){
							this.render("404");
						}else{
							this.render("single-404");
						}
					}
				}
				CurrentPage.breadcrumbs = items;
				CurrentPage.item = items[items.length-1];
				Session.set("CurrentPage",CurrentPage);
			},
			data:function(){
				return {
					CurrentPage:Session.get("CurrentPage")
				}
			}
		})
});