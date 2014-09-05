if(!Session.get("DocumentTitle")){
	Session.set("DocumentTitle","Single");
}
Deps.autorun(function(){
	document.title = Session.get("DocumentTitle");
})