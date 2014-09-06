Router.map(function(){
		this.route('single-page',{
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
				var par=[{
					_id: null,
					type: "parent"
				}];
				fullUrl = "";
				for(var i=0;i<CurrentPage.pathParts.length;i++){
					console.log(Items.find().fetch());
					item=Items.find({relations:{$in:par}});
					console.log(item.fetch());
					if(item.count()>0){
						item = item.fetch()[0];
						items.push(item);
						for(var k=0; k<item.relations.length; k++){
							if(item.relations[k]._id===par[0]._id){
								item.url = item.relations[k].url;
							}
						}
						fullUrl+="/"+item.url;
						item.fullUrl = fullUrl;
						par = [
							{
								_id:item._id,
								type: "parent"
							}
						];
					}
				}
				CurrentPage.breadcrumbs = items;
				Session.set("CurrentPage",CurrentPage);
			}
		})
});