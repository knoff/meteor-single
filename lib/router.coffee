@Single = @Single or {}
getCurrentPage = (path) =>
	res = {}
	regex = /\/([^\/]*)+/g
	res.pathParts = [""]
	n=yes
	while n = regex.exec path
		if n[1] isnt ""
			res.pathParts.push n[1]
	items = []
	par = null
	fullUrl = ""
	res.all = yes
	for part in res.pathParts
		item = SingleItems.documents.findOne({"relations._id":par,"relations.url":part,"relations.type":"parent"})
		if item
			items.push item
			item.clientData = {}
			for relation in item.relations
				if relation._id is par
					item.clientData.url = relation.url
			fullUrl+="/#{item.clientData.url}"
			item.clientData.fullUrl = fullUrl.replace "//", "/"
			par = item._id
	res.breadcrumbs = items
	res.item = items[items.length-1]
	res


if Meteor.isServer
	Meteor.publish "single-pages", (path)=>
		current = getCurrentPage "/#{path}"
		ids = Single.Utils.getDescendantProp current.breadcrumbs, "_id"
		ids = for _id in ids
			res = {_id}
			res
		if ids.length>0
			return SingleItems.documents.find {$or:ids}
		else
			return null


Router.map ()->
	this.route 'single-page',{
		path: "/*"
		waitOn: ()=>
			Meteor.subscribe "single-pages", Router._currentController.path
		onAfterAction: ()->
			CurrentPage = getCurrentPage this.path
			if Meteor.isClient
				Single.CurrentPage = CurrentPage;
			#Session.set "CurrentPage", CurrentPage
		data: ()=>
			{
				CurrentPage: Single.CurrentPage
			}
	}